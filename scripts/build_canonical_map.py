#!/usr/bin/env python3
"""
Build canonical_map.json for v5.5 by resolving each sitemap URL's
old-formula canonical to its final 200 OK destination.

Usage:
    python3 scripts/build_canonical_map.py

Output:
    tyk-docs/data/canonical_map.json
    tyk-docs/data/canonical_map_errors.json  (only truly unresolvable entries)

Map key:   relative path after /docs/5.5/  e.g. "getting-started/key-concepts/"
Map value: final resolved canonical URL    e.g. "https://tyk.io/docs/api-management/gateway-config-introduction"
"""

import json
import re
import sys
import time
import urllib.request
import urllib.error
import concurrent.futures
from pathlib import Path
from xml.etree import ElementTree

SITEMAP_URL    = "https://tyk.io/docs/5.5/sitemap.xml"
V55_PREFIX     = "https://tyk.io/docs/5.5/"  # strip this to get the map key
OLD_BASE       = "https://tyk.io/docs/"       # prepend to get the URL to resolve
OUTPUT_PATH    = Path(__file__).parent.parent / "tyk-docs" / "data" / "canonical_map.json"
ERRORS_PATH    = Path(__file__).parent.parent / "tyk-docs" / "data" / "canonical_map_errors.json"
DOCS_JSON_PATH = Path("/Users/sharad/Documents/tyk-repos/tyk-docs/docs.json")
MAX_WORKERS    = 15
REQUEST_TIMEOUT = 15  # seconds per URL
HEADERS        = {"User-Agent": "Mozilla/5.0 (compatible; tyk-canonical-mapper/1.0)"}


def fetch_sitemap_urls(sitemap_url: str) -> list[str]:
    req = urllib.request.Request(sitemap_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml = resp.read()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ElementTree.fromstring(xml)
    urls = []
    for loc in root.findall(".//sm:loc", ns):
        text = loc.text.strip()
        if text.startswith(V55_PREFIX):
            urls.append(text)
    return urls


def load_docs_json() -> dict:
    with open(DOCS_JSON_PATH) as f:
        return json.load(f)


def _extract_nav_pages_recursive(obj, pages: set):
    """Recursively walk the navigation tree and collect only page paths.

    The docs.json navigation tree is structured as nested dicts with three
    meaningful shapes:
      - Top-level: {"tabs": [...]}
      - Tab node:  {"tab": "<name>", "pages": [...]} or
                   {"tab": "<name>", "groups": [...]}
      - Group node: {"group": "<name>", "pages": [...]}

    Pages arrays contain either plain strings (page paths) or nested group
    dicts for sub-groups.  Only string values found inside a "pages" array
    are actual page paths.

    Other fields — "tab", "group", "openapi", "anchor", etc. — are ignored
    so that swagger file references, group labels, and similar metadata are
    never mistaken for doc page paths.
    """
    if isinstance(obj, list):
        for item in obj:
            if isinstance(item, str):
                # Direct string in a pages/tabs/groups array — this is a page path.
                pages.add(item.strip("/"))
            else:
                _extract_nav_pages_recursive(item, pages)
    elif isinstance(obj, dict):
        # Descend only into structural container keys; skip "tab", "group",
        # "openapi", "anchor", and any other metadata fields.
        for key in ("pages", "tabs", "groups"):
            if key in obj:
                _extract_nav_pages_recursive(obj[key], pages)


def extract_nav_pages(docs: dict) -> set[str]:
    """Extract all page paths from the navigation tree.

    Only paths from 'pages' arrays are collected.  Group/tab names,
    openapi file references, anchor targets, and redirect sources are
    explicitly excluded.
    """
    pages: set[str] = set()
    _extract_nav_pages_recursive(docs.get("navigation", {}), pages)
    return pages


def build_redirect_map(docs: dict) -> dict[str, str]:
    """Build a flat map of source -> destination from docs.json redirects."""
    rmap: dict[str, str] = {}
    for rule in docs.get("redirects", []):
        src = rule.get("source", "").strip("/")
        dst = rule.get("destination", "").strip("/")
        if src and dst:
            # Remove /docs/ prefix if present
            src = src.removeprefix("docs/")
            dst = dst.removeprefix("docs/")
            rmap[src] = dst
    return rmap


def resolve_via_docs_json(
    path: str,
    redirect_map: dict[str, str],
    nav_pages: set[str],
    max_hops: int = 10,
) -> str | None:
    """
    Try to resolve a path using docs.json redirects + nav tree.
    Returns the final canonical URL string, or None if unresolvable.
    """
    visited: set[str] = set()
    current = path.strip("/")
    for _ in range(max_hops):
        if current in visited:
            return None  # redirect loop
        visited.add(current)
        if current in redirect_map:
            current = redirect_map[current].strip("/")
        elif current in nav_pages:
            return f"https://tyk.io/docs/{current}"
        else:
            return None  # not in redirects and not in nav
    return None  # exceeded max hops


def resolve_url(
    v55_url: str,
    redirect_map: dict[str, str],
    nav_pages: set[str],
) -> tuple[str, str, int, bool]:
    """
    Returns (map_key, final_url, http_status, used_docs_json_fallback).
    map_key  = path after /docs/5.5/   e.g. "getting-started/key-concepts/"
    final_url = resolved canonical      e.g. "https://tyk.io/docs/api-management/..."
    """
    map_key = v55_url[len(V55_PREFIX):]  # e.g. "getting-started/key-concepts/"
    old_url = OLD_BASE + map_key         # e.g. "https://tyk.io/docs/getting-started/key-concepts/"

    try:
        req = urllib.request.Request(old_url, headers=HEADERS, method="HEAD")
        resp = urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT)
        return map_key, resp.url, resp.status, False
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:
        print(f"  WARNING: {old_url} -> {e}", file=sys.stderr)
        status = 0

    # HTTP failed — try docs.json fallback
    path = map_key.rstrip("/")
    resolved = resolve_via_docs_json(path, redirect_map, nav_pages)
    if resolved:
        return map_key, resolved, 200, True  # resolved via docs.json

    # Nothing worked — record as error with the old-formula fallback URL
    fallback = OLD_BASE + map_key.rstrip("/")
    return map_key, fallback, status, False


def main():
    print(f"Loading docs.json from {DOCS_JSON_PATH}")
    docs = load_docs_json()
    redirect_map = build_redirect_map(docs)
    nav_pages = extract_nav_pages(docs)
    print(f"  {len(redirect_map)} redirect rules, {len(nav_pages)} nav pages loaded")

    print(f"\nFetching sitemap: {SITEMAP_URL}")
    urls = fetch_sitemap_urls(SITEMAP_URL)
    print(f"Found {len(urls)} URLs in sitemap")

    canonical_map: dict[str, str] = {}
    errors: list[tuple[str, str, int]] = []
    docs_json_resolved: list[tuple[str, str]] = []

    start = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(resolve_url, url, redirect_map, nav_pages): url
            for url in urls
        }
        done = 0
        for future in concurrent.futures.as_completed(futures):
            map_key, final_url, status, used_fallback = future.result()
            done += 1
            if done % 50 == 0 or done == len(urls):
                elapsed = time.time() - start
                print(f"  {done}/{len(urls)} resolved ({elapsed:.0f}s)", file=sys.stderr)
            if status == 200:
                canonical_map[map_key] = final_url
                if used_fallback:
                    docs_json_resolved.append((map_key, final_url))
            else:
                # Still unresolvable — keep old-formula fallback in the map
                # (strip trailing slash to be consistent with Netlify normalization)
                fallback = OLD_BASE + map_key.rstrip("/")
                canonical_map[map_key] = fallback
                errors.append((map_key, final_url, status))

    elapsed = time.time() - start
    print(f"\nResolved {len(urls)} URLs in {elapsed:.1f}s")

    # --- Report ---
    print(f"\n{len(docs_json_resolved)} URLs resolved via docs.json fallback (previously HTTP errors):")
    for key, url in docs_json_resolved[:10]:
        print(f"  {key} -> {url}")
    if len(docs_json_resolved) > 10:
        print(f"  ... and {len(docs_json_resolved) - 10} more")

    if errors:
        print(f"\n{len(errors)} URLs still unresolvable (HTTP failed + docs.json fallback failed):")
        for key, url, code in errors[:20]:
            print(f"  [{code}] {url}")
        if len(errors) > 20:
            print(f"  ... and {len(errors) - 20} more")
    else:
        print("\nNo unresolvable URLs — canonical_map_errors.json will be empty.")

    # --- Write outputs ---
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(canonical_map, f, indent=2, sort_keys=True)
    print(f"\nWrote {len(canonical_map)} entries to {OUTPUT_PATH}")

    errors_list = [
        {"key": key, "resolved_url": url, "status": code}
        for key, url, code in errors
    ]
    with open(ERRORS_PATH, "w") as f:
        json.dump(errors_list, f, indent=2)
    print(f"Wrote {len(errors_list)} error entries to {ERRORS_PATH}")


if __name__ == "__main__":
    main()
