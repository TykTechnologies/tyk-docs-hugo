#!/usr/bin/env python3
"""
Build canonical_map.json for v5.4 by resolving each sitemap URL's
old-formula canonical to its final 200 OK destination.

Map key:   relative path after /docs/5.4/
Map value: final resolved canonical URL
"""

import json
import sys
import time
import urllib.request
import urllib.error
import concurrent.futures
from pathlib import Path
from xml.etree import ElementTree

SITEMAP_URL    = "https://tyk.io/docs/5.4/sitemap.xml"
V55_PREFIX     = "https://tyk.io/docs/5.4/"
OLD_BASE       = "https://tyk.io/docs/"
OUTPUT_PATH    = Path(__file__).parent.parent / "tyk-docs" / "data" / "canonical_map.json"
ERRORS_PATH    = Path(__file__).parent.parent / "tyk-docs" / "data" / "canonical_map_errors.json"
DOCS_JSON_PATH = Path("/Users/sharad/Documents/tyk-repos/tyk-docs/docs.json")
MAX_WORKERS    = 15
REQUEST_TIMEOUT = 15
HEADERS        = {"User-Agent": "Mozilla/5.0 (compatible; tyk-canonical-mapper/1.0)"}


def fetch_sitemap_urls(sitemap_url):
    req = urllib.request.Request(sitemap_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml = resp.read()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ElementTree.fromstring(xml)
    return [loc.text.strip() for loc in root.findall(".//sm:loc", ns) if loc.text.strip().startswith(V55_PREFIX)]


def load_docs_json():
    with open(DOCS_JSON_PATH) as f:
        return json.load(f)


def _extract_nav_pages_recursive(obj, pages):
    if isinstance(obj, list):
        for item in obj:
            if isinstance(item, str):
                pages.add(item.strip("/"))
            else:
                _extract_nav_pages_recursive(item, pages)
    elif isinstance(obj, dict):
        for key in ("pages", "tabs", "groups"):
            if key in obj:
                _extract_nav_pages_recursive(obj[key], pages)


def extract_nav_pages(docs):
    pages = set()
    _extract_nav_pages_recursive(docs.get("navigation", {}), pages)
    return pages


def build_redirect_map(docs):
    rmap = {}
    for rule in docs.get("redirects", []):
        src = rule.get("source", "").strip("/").removeprefix("docs/")
        dst = rule.get("destination", "").strip("/").removeprefix("docs/")
        if src and dst:
            rmap[src] = dst
    return rmap


def resolve_via_docs_json(path, redirect_map, nav_pages, max_hops=10):
    visited = set()
    current = path.strip("/")
    for _ in range(max_hops):
        if current in visited:
            return None
        visited.add(current)
        if current in redirect_map:
            current = redirect_map[current].strip("/")
        elif current in nav_pages:
            return f"https://tyk.io/docs/{current}"
        else:
            return None
    return None


def resolve_url(v55_url, redirect_map, nav_pages):
    map_key = v55_url[len(V55_PREFIX):]
    old_url = OLD_BASE + map_key
    try:
        req = urllib.request.Request(old_url, headers=HEADERS, method="HEAD")
        resp = urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT)
        return map_key, resp.url, resp.status, False
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:
        print(f"  WARNING: {old_url} -> {e}", file=sys.stderr)
        status = 0
    resolved = resolve_via_docs_json(map_key.rstrip("/"), redirect_map, nav_pages)
    if resolved:
        return map_key, resolved, 200, True
    return map_key, OLD_BASE + map_key.rstrip("/"), status, False


def main():
    print(f"Loading docs.json from {DOCS_JSON_PATH}")
    docs = load_docs_json()
    redirect_map = build_redirect_map(docs)
    nav_pages = extract_nav_pages(docs)
    print(f"  {len(redirect_map)} redirect rules, {len(nav_pages)} nav pages loaded")

    print(f"\nFetching sitemap: {SITEMAP_URL}")
    urls = fetch_sitemap_urls(SITEMAP_URL)
    print(f"Found {len(urls)} URLs in sitemap")

    canonical_map, errors, docs_json_resolved = {}, [], []
    start = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(resolve_url, url, redirect_map, nav_pages): url for url in urls}
        done = 0
        for future in concurrent.futures.as_completed(futures):
            map_key, final_url, status, used_fallback = future.result()
            done += 1
            if done % 50 == 0 or done == len(urls):
                print(f"  {done}/{len(urls)} resolved ({time.time()-start:.0f}s)", file=sys.stderr)
            if status == 200:
                canonical_map[map_key] = final_url
                if used_fallback:
                    docs_json_resolved.append((map_key, final_url))
            else:
                # Unresolvable — skip; baseof.html formula fallback handles these.
                # They are logged to canonical_map_errors.json for manual resolution.
                errors.append((map_key, final_url, status))

    print(f"\nResolved {len(urls)} URLs in {time.time()-start:.1f}s")
    print(f"\n{len(docs_json_resolved)} URLs resolved via docs.json fallback:")
    for key, url in docs_json_resolved[:10]:
        print(f"  {key} -> {url}")
    if len(docs_json_resolved) > 10:
        print(f"  ... and {len(docs_json_resolved) - 10} more")
    if errors:
        print(f"\n{len(errors)} URLs still unresolvable:")
        for key, url, code in errors[:20]:
            print(f"  [{code}] {url}")
    else:
        print("\nNo unresolvable URLs — canonical_map_errors.json will be empty.")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(canonical_map, f, indent=2, sort_keys=True)
    print(f"\nWrote {len(canonical_map)} entries to {OUTPUT_PATH}")
    errors_list = [{"key": k, "resolved_url": u, "status": c} for k, u, c in errors]
    with open(ERRORS_PATH, "w") as f:
        json.dump(errors_list, f, indent=2)
    print(f"Wrote {len(errors_list)} error entries to {ERRORS_PATH}")


if __name__ == "__main__":
    main()
