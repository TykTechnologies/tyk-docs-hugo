import json
import argparse


def read_versions_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


def update_version_file(next_release):
    file_path = "versions.json"
    versions_data = read_versions_file(file_path)
    previous_latest_index = next((i for i, version in enumerate(versions_data) if version['path'] == "/docs/"), None)
    if previous_latest_index is None:
        raise ValueError(
            "No old 'Latest' version found.(At-least one item in your version.json should have /docs/ as path")
    old_branch = versions_data[previous_latest_index]["branch"]
    version_old_latest_number = old_branch.replace("release-", "")
    old_latest_version = {
        "path": f"/docs/{version_old_latest_number}/",
        "name": version_old_latest_number,
        "branch": old_branch
    }
    versions_data[previous_latest_index] = old_latest_version
    index = next((i for i, version in enumerate(versions_data) if version['branch'] == next_release), None)
    if index is not None:
        raise ValueError("The branch you want to create already exists")
    version_number = next_release.replace("release-", "")
    new_version = {
        "path": "/docs/",
        "name": f"{version_number} - Latest",
        "branch": next_release
    }
    versions_data.insert(0, new_version)
    with open(file_path, 'w') as file:
        json.dump(versions_data, file, indent=4)
    print(old_branch)


parser = argparse.ArgumentParser(description="Update versions.json file with current and next releases.")
parser.add_argument("--next_release", required=True, help="The next release branch (e.g., release-5.8)")
args = parser.parse_args()
update_version_file(args.next_release)
