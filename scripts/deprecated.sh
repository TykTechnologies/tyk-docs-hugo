#!/bin/bash

filePath="../tyk-docs/data/menu.yaml"

function getDeprecatedPaths() {
    local menuItems=("$@")
    local paths=()

    for menu in "${menuItems[@]}"; do
        for item in "${menu[@].Menu[@]}"; do
            paths+=("$item.Path")
            echo "$item.Path"
        done
    done
    echo "${paths[@]}"
}

function findMenuItemsWithTitle() {
    local menu=("$1[@]")
    local title="$2"
    local result=()

    for menuItem in "${menu[@]}"; do
        if [ "${menuItem.Title,,}" = "${title,,}" ]; then
            result+=("$menuItem")
        fi
        if [ ! -z "${menuItem.Menu}" ]; then
            subItems=($(findMenuItemsWithTitle "${menuItem.Menu[@]}" "$title"))
            result+=("${subItems[@]}")
        fi
    done

    echo "${result[@]}"
}

data=$(cat "$filePath")

IFS=$'\n' read -rd '' -a menuItems < <(yq eval '.menu[] | select(.title == "Deprecated pages")' <<< "$data")

getDeprecatedPaths "${menuItems[@]}" | wc -l
