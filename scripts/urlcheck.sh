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

NEW_URLS=$(cat /tmp/urlcheck.new.json | jq -r '.path' | sort)
PREV_URLS=$(cat /tmp/urlcheck.prev.json | jq -r '.path' | sort)
BROKEN_URLS=$(comm -3 -1 <(echo $NEW_URLS) <(echo $PREV_URLS))

if [ -n "$BROKEN_URLS" ]; then
  echo "The following links are broken"
  echo $BROKEN_URLS
  exit 1
fi
