# read the file line by line
jq -c "select(.alias)" public/urlcheck.json | while read -r line; do
  # parse the JSON line
  path=$(echo $line | jq -r '.path')
  file=$(echo $line | jq -r '.file')

  original=$(jq -c "select(.alias == null and .file == \"${file}\")" public/urlcheck.json)
  original_path=$(echo $original | jq -r '.file' | sed -E "s|./content/||" | sed -E "s|.md||")

  path=$(echo $path | sed -E "s|^/||" | sed -e "s|/$||")

  rg -l "$path" ./content | awk '{print "\"" $0 "\""}' | xargs sed -i "" -E "s|\"\/?$path\/?([\"\#]?)|\"$original_path\1|g"
done
