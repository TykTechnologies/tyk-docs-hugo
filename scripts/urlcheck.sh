set -e

CURRENT_COMMIT=$(git rev-parse HEAD)
hugo
cp ./public/urlcheck.json /tmp/urlcheck.new.json
rm -rf public/*
git checkout $1
hugo
cp ./public/urlcheck.json /tmp/urlcheck.prev.json
rm -rf public/*
git checkout -

export LC_COLLATE=POSIX

cat /tmp/urlcheck.new.json | jq -r '.path' | sed -E "s|/nightly||g" | sort | uniq > /tmp/urlcheck.new
cat /tmp/urlcheck.prev.json | jq -r '.path' | sed -E "s|/nightly||g" | sort | uniq > /tmp/urlcheck.prev
BROKEN_URLS=$(comm -3 -1 /tmp/urlcheck.new /tmp/urlcheck.prev)

if [ -n "$BROKEN_URLS" ]; then
  echo "The following links are broken"
  echo $BROKEN_URLS
  exit 1
fi
