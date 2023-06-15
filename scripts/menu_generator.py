import csv
import sys
import json
from typing import Any


#
# Usage:
# python3 scripts/menu_generator.py path-to-data-bank.csv path-to-pages-list-3.csv ./tyk-docs/public/urlcheck.json > tyk-docs/data/menu.yaml
#
# sys.argv[0] script name
# sys.argv[1] data-bank.csv path
# sys.argv[2] pages-list.csv path
# sys.argv[3] path to urlcheck.json file
#
# Purpose:
# This will output a list of files with:
# - unknown urls
# - redirects
# - orphans
# - pages that are candidates for deletion
# - pages that do not exist
# - tyk-docs/data/menu.yml file with proposed new menu structure
#
#
# Issues:
# Aliases have no title in urlcheck. Currently, for each alias an empty menu
# item is added. There are ~2000 of these.
#
#
# Function to remove a menu item from not used map
#
def remove_pages_to_process(
    menu_item_path: str, pages_to_process: dict[str, Any], out_file=sys.stdout
) -> None:
    """
    Remove the menu item path from a pages to process map
    If the page is not in the map then output the page path to console

    @param menu_item_path (str) The menu item to process
    @param pages_to_process (map) Dictionary containing pages to process
    """

    key = menu_item_path.replace("/", "")

    try:
        del pages_to_process[key]
    except:
        print(
            f"Failed trying to delete a page path from the pages to process : path={key}",
            file=out_file,
        )
        pass


tree = []

if len(sys.argv) < 4:
    print("Not enough arguments to run ", sys.argv[0], " (just ", len(sys.argv), ")")
    exit()

urlcheck_path = sys.argv[3]

outputFileName = "check-pages"
if len(sys.argv) == 5:
    outputFileName = sys.argv[4]

# Set output file names
fileUnknownUrl = outputFileName + "-unknownUrl.txt"
fileNeedsRedirect = outputFileName + "-needsRedirect.txt"
fileOrphan = outputFileName + "-orphan.txt"
fileMaybeDelete = outputFileName + "-maybeDelete.txt"
fileDoesntExists = outputFileName + "-doesntExists.txt"
fileUrlCheckNoTitle = outputFileName + "-urlcheck-noTitle.txt"
fileUrlCheckAliases = outputFileName + "-urlcheck-aliases.txt"
fileFailedDelete = outputFileName + "-urlcheck-failedDelete.txt"
fileMenu = "./tyk-docs/data/menu.yaml"

# Open the output files
openUnknownUrlFile = open(fileUnknownUrl, "w")
openNeedsRedirectFile = open(fileNeedsRedirect, "w")
openOrphanFile = open(fileOrphan, "w")
openMaybeDelete = open(fileMaybeDelete, "w")
openDoesntExists = open(fileDoesntExists, "w")
openFileMenu = open(fileMenu, "w")
openUrlCheckNoTitle = open(fileUrlCheckNoTitle, "w")
openUrlCheckAliases = open(fileUrlCheckAliases, "w")
openFailedDelete = open(fileFailedDelete, "w")

#
# Mapping of paths in urlcheck to title
# The url is written to yaml
title_map = {}

#
# Mapping of paths in urlcheck that do not have aliases
#
not_used_map = {}

#
# Read urlcheck.json
# Populate title_map and not_used_map stripping trailing / in paths
#
with open(urlcheck_path, "r") as file:
    lines = file.readlines()

    for row, line in enumerate(lines):
        if line.isspace():
            continue
        obj = json.loads(line)
        alias = obj.get("alias")
        if alias is not None and alias == True:
            print(f"alias url: {line.strip()}", file=openUrlCheckAliases)
            continue

        title = obj.get("title")

        # if title and link title are empty
        # log to file and continue to next row in urlcheck.json
        # if only title is empty then title = linktitle and
        # replace trailing slash
        if title is None or title == "":
            print(
                f"no title, check for linktitle. {line.strip()}, ",
                file=openUrlCheckNoTitle,
            )

            linktitle = obj.get("linktitle")
            if linktitle is None:
                print(f"Error: no title or linktitle for {line.strip()}, ")
                continue
            title = linktitle

        if title == "/" or title == "\\":
            raise ValueError(f"An empty title {line.strip()}")

        title_map[obj["path"].replace("/", "")] = title

        if "alias" not in obj:
            not_used_map[obj["path"].replace("/", "")] = obj["path"]

categories_path = sys.argv[1]


#
# Read the data-bank.csv file
with open(categories_path, "r") as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Iterate over rows in the CSV file
    counter = 0
    for row in reader:
        if counter < 5:
            counter += 1
            continue

        # ignore the first 2 columns in data-bank.csv
        # continue until reach end of the list marker
        data = row[3:]
        if "End of the list" in data[0]:
            break

        #
        # split the mapping path by --> For example:
        # Product Stack --> Tyk Pump --> Release notes
        #
        # Read the category from data-bank row and if it is NA skip
        #
        parts = data[0].split(" --> ")
        category = data[1]
        current_level = tree

        if category == "NA":
            continue

        #
        # Read the navigation category for current row of data-bank
        #
        for i, name in enumerate(parts):
            found = False

            #
            # Try and find the category in the tree
            # If it is found then, move down a level to the child nodes
            for node in current_level:
                if node["name"] == name:
                    current_level = node["children"]

                    found = True
                    break

            #
            # If name not found then and category is a Tab
            # create a new node and add to default url
            #
            # Add a new node if name not blank
            # A node has:
            # - name: set to the name of parts in mapping path
            #   ,e.g. Product Stack --> Tyk Pump --> Release notes
            # - category
            # - children list
            # - url: optional
            #
            # Tab categories are mapped to a fixed url
            # For example Developer Support is mapped to
            #    frequently-asked-questions
            #
            if not found:
                tabURLs = {
                    "Home": "/",
                    "Deployment and Operations": "/apim",
                    "Managing APIs": "/getting-started",
                    "Product Stack": "/tyk-stack",
                    "Developer Support": "/frequently-asked-questions/faq",
                    "APIM Best Practice": "/getting-started/key-concepts",
                    "Orphan": "/orphan",
                }

                if name.isspace():
                    continue

                new_node = {"name": name, "category": category, "children": []}
                if category == "Tab":
                    new_node["url"] = tabURLs[name]

                # if category == "Page":
                #   filename1 = new_node["name"].replace(" ", "-")
                #   filename1 = filename1.replace("/", "-")
                #   filename1 += ".txt"
                #   filePlaceHolder = open(filename1, 'w')
                #   print("Place holder page", file=filePlaceHolder)
                #   filePlaceHolder.close()

                current_level.append(new_node)

                # update current level to empty list, e.g. new_node["children"]
                current_level = new_node["children"]


#
# Read the pages csv file
#
pages_path = sys.argv[2]

#
# Read each row in the pages csv ignore first 2 review columns
# Output to file those columns marked as:
# - Delete Page
# - Maybe Delete Page
# - Page does not exist
#
# An additional requirement raised to remove pages marked as Delete Page
# and Maybe Delete page. These are to be removed from the not_used_map.
# The not_used_map is a bucket of pages to process. It contains pages
# in urlcheck.json that have no alias.
#
# Ouput to file orphan pages i.e. path not found in mapping path
#
with open(pages_path, "r") as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    orphans = []

    # Iterate over rows in the CSV file
    counter = 0
    for row in reader:
        if counter < 1:
            counter += 1
            continue
        data = row[3:]

        if data[2] == "Delete Page":
            print("Delete Page, needs redirect: " + data[0], file=openNeedsRedirectFile)
            remove_pages_to_process(data[0], not_used_map, out_file=openFailedDelete)
            continue

        if data[2] == "Maybe Delete Page":
            print("Maybe Delete Page: " + data[0], file=openMaybeDelete)
            remove_pages_to_process(data[0], not_used_map, out_file=openFailedDelete)
            continue

        if data[2] == "Page doesn't exists":
            print("Page doesn't exists: " + data[0], file=openDoesntExists)
            continue

        if data[2] == "Other":
            print("Probably an alias: " + data[0])
            continue

        data[0] = data[0].replace("https://tyk.io/docs", "")

        # Set current_level to children of the node that matches the first part
        # in the mapping path, e.g.:
        # Product Stack-->Tyk Gateway-->Basic Config and Security-->Security-->Overview
        #
        parts = data[2].split(" --> ")
        current_level = tree
        found = True
        for i, part in enumerate(parts):
            found = False
            for node in current_level:
                if node["name"] == part:
                    current_level = node["children"]
                    found = True
                    break

        if found:
            current_level.append(
                {"url": data[0], "name": "", "category": "Page", "children": []}
            )
        else:
            orphans.append(data)

        # remove page from not_used_map, if fails it will remain in not used
        # map and will be adding to last node in tree struct with a blank name
        remove_pages_to_process(data[0], not_used_map, out_file=openFailedDelete)
        # try:
        #     del not_used_map[data[0].replace("/", "")]
        # except:
        #     pass

    if len(orphans) > 0:
        # tree.append({"name": "Orphan", "url": "orphan", "category": "Directory", "children": []})
        for orphan in orphans:
            print("orphan: " + orphan[0], file=openOrphanFile)
            # tree[-1]["children"].append({"url": orphan[0], "name": "", "category": "Page", "children": []})

for key, value in not_used_map.items():
    tree[-1]["children"].append(
        {"url": value, "name": "", "category": "Page", "children": []}
    )


#
# Function that writes to yaml recursively
#
def print_tree_as_yaml(tree, level=1):
    yaml_string = ""
    for node in tree:
        title = node["name"]

        if "url" in node and node["category"] != "Tab":
            try:
                title = title_map[node["url"].replace("/", "")]
            except:
                title = "Unknown url: " + node["url"]
                # print(f"node[url] = {'https://tyk.io/docs' + node['url']},  node['name'] = {node['name']}")
                print(
                    "Unknown menu url:" " https://tyk.io/docs" + node["url"],
                    file=openUnknownUrlFile,
                )
                continue
            title = title.replace('"', '\\"')

        yaml_string += "  " * level + '- title: "' + title + '"\n'

        yaml_string += (
            "  " * level + "  path: " + node["url"] + "\n" if "url" in node else ""
        )
        yaml_string += "  " * level + "  category: " + node["category"] + "\n"
        if node["category"] != "Page":
            yaml_string += "  " * level + "  menu:\n"
            yaml_string += print_tree_as_yaml(node["children"], level + 1)
    return yaml_string


yaml_string = "menu:\n"
yaml_string += print_tree_as_yaml(tree)

print(yaml_string, file=openFileMenu)


# Close the files
openUnknownUrlFile.close()
openNeedsRedirectFile.close()
openOrphanFile.close()
openMaybeDelete.close()
openFailedDelete.close()
openFileMenu.close()
openUrlCheckNoTitle.close()
