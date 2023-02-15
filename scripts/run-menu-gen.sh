mv ~/Downloads/Doc-pages-navigation-update.xlsx\ -\ pages-list.csv ~/Downloads/Doc-pages-navigation-update-pages-list.csv
mv ~/Downloads/Doc-pages-navigation-update.xlsx\ -\ data-bank.csv ~/Downloads/Doc-pages-navigation-update-data-bank.csv
python3 scripts/menu_generator.py ~/Downloads/Doc-pages-navigation-update-data-bank.csv  ~/Downloads/Doc-pages-navigation-update-pages-list.csv ./tyk-docs/public/urlcheck.json > tyk-docs/data/menu.yaml
