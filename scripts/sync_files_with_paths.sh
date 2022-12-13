#!/bin/bash

rm -rf content.md
rm -rf ./content
git checkout -- content

# Read each line from the JSONLine file
#grep "/docs/tyk-oss-gateway" ./public/urlcheck.json | while read -r line; do
cat ./public/urlcheck.json | jq -c 'select(.alias | not)' | while read -r line; do
  # Parse the line to get the values of the "path" and "file" fields
  path=$(echo $line | jq -r '.path' | sed -E "s|^/docs|./content|" | sed -E "s|/$||" | sed 's|$|.md|' | xargs)
  file=$(echo $line | jq -r '.file' | xargs)
  
#  if [[ "$file" != "./content/tyk-oss-gateway.md" ]]; then
#    continue
#  fi

  # Check if the "path" structure matches the "file" structure
  if [[ "$path" != "$file" ]]; then
    # Create the directories in the "path" structure if they don't exist
#    echo $path $file
    mkdir -p $(dirname $path)
    # Move the file to the path that matches the "path" structure
    mv -i "$file" "$path"

    echo "creating new file |$path|"

    #grep -v "^url:" "$path" > "$path" || true
  
    file_without_content=$(echo $file | sed 's|\./content/||g')
    new_file_without_content=$(echo $path | sed 's|\./content/||g')

    rg -l "$file_without_content" ./content | awk '{print "\"" $0 "\""}' | xargs sed -i "" -E "s|$file_without_content|$new_file_without_content|g"
  fi
done 
