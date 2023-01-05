# set -e
# set -x

# hugo

echo "" > ../_redirects.new

while read -r line; do
  IFS=" "
  read -ra values <<< "$line"
  IFS=

  record=$(jq -r -e "select(.path == \"${values[1]}\")" public/urlcheck.json)

  if [ -z "$record" ]; then
    echo "Rewrite target not found! ${values[0]}"
    continue
  fi

  file=$(echo "$record" | jq -r '.file')
  
  if [ -z "$file" ]; then
    echo "Can't find file record! ${values[0]}"
    continue
  fi

  metadataEnd=$(awk '/---/{++n; if (n==2) { print NR; exit}}' "$file")

  if [ -z "$metadataEnd" ]; then
    echo "Can't find metadata! ${values[0]}"
    continue
  fi


  metadata=$(cat $file | head -n ${metadataEnd})
  markdown=$(sed 1,${metadataEnd}d "$file")

#  if [[ false && "$file" == "./content/basic-config-and-security/security/Authentication & Authorization/json-web-tokens.md" ]]; then
#    echo $markdown
#    exit 1
#  fi

  if [[ "$metadata" == *"aliases:"* ]]; then
    metadata=$(awk -v values="${values[0]}" '/aliases:/{print "aliases:\n  - " values; next}1' <<< "$metadata")
  else
    metadata=$(echo $metadata | tail -r | tail -n +2 | tail -r)
    aliases=$(printf "aliases:\n  - %s" ${values[0]})
    metadata=$(printf "%b\n%b\n---" $metadata $aliases)
  fi

  concat=$(printf "%b\n%b" $metadata $markdown)
  echo $concat > "$file"
  
  echo ${values[0]} >> ../_redirects.new
done < <(cat ../_redirects)
