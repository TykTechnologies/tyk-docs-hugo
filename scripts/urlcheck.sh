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
NEW_URLS=$(cat /tmp/urlcheck.new.json | jq -r '.path')
PREV_URLS=$(cat /tmp/urlcheck.prev.json | jq -r '.path')
BROKEN_URLS=$(comm -3 -1 <(echo $NEW_URLS | sort) <(echo $PREV_URLS | sort))

if [ -n "$BROKEN_URLS" ]; then
  echo "The following links are broken"
  echo $BROKEN_URLS
  exit 1
fi
