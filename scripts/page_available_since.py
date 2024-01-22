import requests
import json

versions = [
    {
        "path": "/docs/",
        "name": "Latest - 5.2",
        "branch": "release-5.2"
    },
    {
        "path": "/docs/5.1/",
        "name": "5.1",
        "branch": "release-5.1"

    },
    {
        "path": "/docs/5.0/",
        "name": "5 LTS",
        "branch": "release-5"
    },
    {
        "path": "/docs/4.3/",
        "name": "4.3",
        "branch": "release-4.3"
    },
    {
        "path": "/docs/4.2/",
        "name": "4.2",
        "branch": "release-4.2"
    },
    {
        "path": "/docs/4.1/",
        "name": "4.1",
        "branch": "release-4.1"
    },
    {
        "path": "/docs/4.0/",
        "name": "4 LTS",
        "branch": "release-4"
    },
    {
        "path": "/docs/3.2/",
        "name": "3.2",
        "branch": "release-3.2"
    },
    {
        "path": "/docs/3.1/",
        "name": "3.1",
        "branch": "release-3.1"
    },
    {
        "path": "/docs/3-lts/",
        "name": "3 LTS",
        "branch": "release-3-lts"
    },

    {"path": "/docs/nightly/",
     "name": "Nightly",
     "branch": "master"
     }
]

filePath = "../tyk-docs/data/page_available_since.json"

aliases = set()


def process_and_write_to_file() -> None:
    available = get_and_process_urls()
    data_file = {"versions": versions, "pages": available}
    with open(filePath, 'w') as file:
        json.dump(data_file, file, indent=4)


def get_and_process_urls():
    available_since = {}
    for version in versions:
        url = "https://tyk.io{version}pagesurl.json".format(version=version["path"])
        data = fetch_file(url)
        if 'pages' in data:
            pages = sorted(data['pages'], key=lambda x: x['path'])
            for page in pages:
                url = page.get('path')
                if url:
                    if not url.startswith('/'):
                        url = '/' + url
                    if not url.endswith('/'):
                        url += '/'
                parent = page.get("parent")
                alt_url = url
                if parent is not None:
                    alt_url = parent
                    aliases.add(url)
                if url not in available_since:
                    available_since[url] = {}
                available_since[url][version["path"]] = alt_url
    for link in aliases:
        ns = available_since[link]
        similar = {}
        diff = {}
        for key, value in ns.items():
            if link == value:
                similar[key] = value
            else:
                diff[key] = value
        for dk, dv in diff.items():
            for sk, sv in similar.items():
                if sk not in available_since[dv]:
                    available_since[dv][sk] = sv
    return dict(sorted(available_since.items()))


def fetch_file(url: str):
    print("Getting pagesurl.json for {url}".format(url=url))
    response = requests.get(url, headers={'user-agent': 'insomnia/2023.4.0'})
    if response.status_code != 200:
        raise Exception("unable to fetch the pagesurl.json")
    response.raise_for_status()
    print("finished fetching for {url}".format(url=url))
    return response.json()


process_and_write_to_file()
