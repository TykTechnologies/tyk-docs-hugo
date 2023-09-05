set -e

CURRENT_COMMIT=$(git rev-parse HEAD)
cp ./themes/tykio/layouts/_default/list.urlcheck.json /tmp/list.urlcheck.json
hugo
cp ./public/urlcheck.json /tmp/urlcheck.new.json
rm -rf public/*
git checkout $1
cp /tmp/list.urlcheck.json ./themes/tykio/layouts/_default/list.urlcheck.json
hugo
cp ./public/urlcheck.json /tmp/urlcheck.prev.json
rm -rf public/*
git checkout -- ./themes/tykio/layouts/_default/list.urlcheck.json
git checkout -

export LC_COLLATE=POSIX

cat /tmp/urlcheck.new.json | jq -r '.path' | sed -E "s|/nightly||g" | sed -E 's|/[0-9]+\.[0-9]+||g' | sed -E "s|/docs/docs||" | sed -E "s|/docs||" | sed -E "s|^/||" | sed -E "s|/$||" | sort | uniq > /tmp/urlcheck.new
cat /tmp/urlcheck.prev.json | jq -r '.path' | sed -E "s|/nightly||g" | sed -E 's|/[0-9]+\.[0-9]+||g' | sed -E "s|/docs/docs||" | sed -E "s|/docs||" | sed -E "s|^/||" | sed -E "s|/$||" | sort | uniq > /tmp/urlcheck.prev
BROKEN_URLS=$(comm -3 -1 /tmp/urlcheck.new /tmp/urlcheck.prev)

if [ -n "$BROKEN_URLS" ]; then
  echo "The following links are broken"
  echo $BROKEN_URLS
  exit 1
fi