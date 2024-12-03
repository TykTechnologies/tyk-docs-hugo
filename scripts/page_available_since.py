import requests
import json

versions = [
    {
        "path": "/docs/",
        "name": "5.7 - Latest",
        "branch": "release-5.7"
    },
    {
        "path": "/docs/5.6",
        "name": "5.6",
        "branch": "release-5.6"
    },
    {
        "path": "/docs/5.5/",
        "name": "5.5",
        "branch": "release-5.5"
    },
    {
        "path": "/docs/5.4/",
        "name": "5.4",
        "branch": "release-5.4"
    }, 
    {
        "path": "/docs/5.3/",
        "name": "5.3 - LTS",
        "branch": "release-5.3"
    },
    {
        "path": "/docs/5.2/",
        "name": "5.2",
        "branch": "release-5.2"
    },
    {
        "path": "/docs/5.1/",
        "name": "5.1",
        "branch": "release-5.1"

    },
    {
        "path": "/docs/5.0/",
        "name": "5 - LTS",
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
        "name": "4 - LTS",
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
        "name": "3 - LTS",
        "branch": "release-3-lts"
    },

    {
        "path": "/docs/nightly/",
        "name": "Nightly",
        "branch": "master"
    }
]

filePath = "../tyk-docs/data/page_available_since.json"

aliases = set()


def process_and_write_to_file() -> None:
    available = get_and_process_urls()
    for page_url, version_mapping in available.items():
        available[page_url]["all_versions_are_similar_to_path"] = True
        for version in versions:
            path = version["path"]
            if path not in version_mapping:
                available[page_url]["all_versions_are_similar_to_path"] = False
                break
            elif version_mapping[path] != page_url:
                available[page_url]["all_versions_are_similar_to_path"] = False
                break
        if available[page_url]["all_versions_are_similar_to_path"] == True:
            available[page_url].clear()
            available[page_url]["all_versions_are_similar_to_path"] = True
        else:
            del available[page_url]["all_versions_are_similar_to_path"]
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
                if len(url.strip()) == 0:
                    continue
                url = page.get('path')
                if url:
                    if not url.startswith('/'):
                        url = '/' + url
                    if not url.endswith('/'):
                        url += '/'
                parent = page.get("parent")
                alternate_url = url
                if parent is not None:
                    alternate_url = parent
                    aliases.add(url)
                if url not in available_since:
                    available_since[url] = {}
                available_since[url][version["path"]] = alternate_url
    for alias_link in aliases:
        # links that are in the alias versions
        alias_version_links = available_since[alias_link]
        versions_with_similar_link_as_alias = {}
        versions_with_different_link_as_alias = {}
        # loop over the versions links and get those that are different
        # then for those that are different create an entry for them in the file
        for version_key, version_link in alias_version_links.items():
            if alias_link == version_link:
                # add  the version that are similar to this list
                versions_with_similar_link_as_alias[version_key] = version_link
            else:
                # add the versions that have different links here
                versions_with_different_link_as_alias[version_key] = version_link
        # loop over the list with different links and create an entry for them
        for diff_version, diff_version_value in versions_with_different_link_as_alias.items():
            for similar_version, similar_link in versions_with_similar_link_as_alias.items():
                if similar_version not in available_since[diff_version_value]:
                    available_since[diff_version_value][similar_version] = similar_link
    return dict(sorted(available_since.items()))


def fetch_file(url: str):
    print("Getting pagesurl.json for {url}".format(url=url))
    response = requests.get(url, headers={'user-agent': 'insomnia/2023.4.0'})
    response.raise_for_status()
    print("finished fetching for {url}".format(url=url))
    return response.json()


process_and_write_to_file()
