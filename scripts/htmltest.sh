sed -i "" "s|//tyk.io/docs/nightly/|/|" config.toml
sed -i "" "s|//tyk.io/docs/|/|" config.toml
hugo
htmltest -s -c ../.htmltest.yml public
git checkout -- config.toml
