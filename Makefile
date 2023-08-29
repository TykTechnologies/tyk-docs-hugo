gen-menu: hugo
	python3 scripts/menu_generator.py data-bank.csv pages-list.csv tyk-docs/public/urlcheck.json

hugo:
	cd tyk-docs && hugo

run:
	cd tyk-docs && hugo server --theme=tykio --buildDrafts --enableGitInfo

