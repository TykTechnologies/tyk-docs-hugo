hugo:
	cd tyk-docs && hugo

run:
	cd tyk-docs && hugo server --theme=tykio --buildDrafts --enableGitInfo

