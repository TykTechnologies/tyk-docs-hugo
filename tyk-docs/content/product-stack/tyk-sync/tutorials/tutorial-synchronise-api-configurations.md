---
date: 2017-03-23T13:19:38Z
title: Synchronising API configurations with GitHub Actions
description: "Learn about how API platform teams can automate the synchronisation of API configurations, policies, and templates from a Git repository to a Tyk installation using GitHub Actions. Triggered by changes in the repository, the GitHub Action generates a `.tyk.json` file and uses the `sync` command to apply updates."
tags: [ "Tyk Sync" ]
---

This tutorial demonstrates how API platform teams can automate the synchronisation of API configurations, policies, and templates from a Git repository to a Tyk installation using GitHub Actions. Triggered by changes in the repository, the GitHub Action generates a `.tyk.json` file and uses the `sync` command to apply updates. The expected outcome is an automated, continuous integration process that keeps the Tyk setup in sync with the repository.

### Step 1: Setup GitHub repository
Organize your repository with the following structure:

- `/apis/` for API definition files.
- `/policies/` for security policy files.
- `/assets/` for API template files.

### Step 2: Create a GitHub Action workflow

1. In your repository, create a new file `.github/workflows/tyk-sync.yml`.
2. Add the following content to the `tyk-sync.yml` file:

```yaml
name: Tyk Sync

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Create .tyk.json
      run: |
        echo '{' > .tyk.json
        echo '  "type": "apidef",' >> .tyk.json
        echo '  "files": [' >> .tyk.json
        find . -type f -name '*.json' -path './apis/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ],' >> .tyk.json
        echo '  "policies": [' >> .tyk.json
        find . -type f -name '*.json' -path './policies/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ],' >> .tyk.json
        echo '  "assets": [' >> .tyk.json
        find . -type f -name '*.json' -path './assets/*' -exec echo '    {"file": "{}"},' \; | sed '$ s/,$//' >> .tyk.json
        echo '  ]' >> .tyk.json
        echo '}' >> .tyk.json
        cat .tyk.json

    - name: Sync with Tyk
      run: |
        docker run tykio/tyk-sync:${TYK_SYNC_VERSION} version
        docker run -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} sync --path /app/data --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}
```

### Step 3: Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v2.0.0).
4. Add the following secrets:
    - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
    - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

### Step 4: Commit and push changes

Commit the `tyk-sync.yml` file and push it to the main branch of your repository.

### Step 5: Verify synchronisation

Each time there is a change in the repository, the GitHub Action will be triggered. It will create the `.tyk.json` file including all JSON files in the repository and use the `sync` command to update the Tyk installation.