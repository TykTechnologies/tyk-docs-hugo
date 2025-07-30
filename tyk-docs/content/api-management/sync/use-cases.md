---
title: "Automate API Configuration Management with Tyk Sync"
tags: ["Tyk Sync", "GitHub Actions", "API Management", "Automations"]
description: "Learn how to automate API configuration management using Tyk Sync and GitHub Actions."
aliases:
  - /product-stack/tyk-sync/tutorials/tutorial-backup-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-synchronise-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-update-api-configurations
---

By integrating GitHub Actions, teams can schedule backups to cloud storage, sync configurations from a Git repository, and update local API definitions directly to the Tyk Dashboard. These workflows ensure configurations are securely maintained, aligned across environments, and easily managed within the API lifecycle.

## Backup API Configurations with Github Actions
API platform teams can automate configuration backups using GitHub Actions. By setting up a scheduled GitHub Action, API configurations can be periodically exported and stored in cloud storage, like AWS S3. This approach ensures backups remain up-to-date, offering a reliable way to safeguard data and simplify restoration if needed.


### Create a GitHub Action workflow

1. In your repository, create a new file `.github/workflows/tyk-backup.yml`.
2. Add the following content to the `tyk-backup.yml` file:

```yaml
name: Tyk Backup

on:
  schedule:
    - cron: '0 0 * * *'  # Runs every day at midnight

jobs:
  backup:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Create Backup Directory
      run: |
        BACKUP_DIR="backup/$(date +%Y-%m-%d)"
        mkdir -p $BACKUP_DIR
        echo "BACKUP_DIR=$BACKUP_DIR" >> $GITHUB_ENV

    - name: Set Permissions for Backup Directory
      run: |
        sudo chown -R 1001:1001 ${{ github.workspace }}/backup

    - name: Dump API Configurations
      run: |
        docker run --user 1001:1001 -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} dump --target /app/data/${{ env.BACKUP_DIR }} --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}

    - name: Upload to S3
      uses: jakejarvis/s3-sync-action@v0.5.1
      with:
        args: --acl private --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'  # Change to your region
        SOURCE_DIR: ${{ env.BACKUP_DIR }}
```

### Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use.
4. Add the following secrets:
   - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
   - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.
   - `AWS_S3_BUCKET`: The name of your AWS S3 bucket.
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

### Commit and push changes

Commit the `tyk-backup.yml` file and push it to the main branch of your repository.

### Verify backups

The GitHub Action will run every day at midnight, dumping API configurations into a backup directory and uploading them to your specified S3 bucket.


## Synchronize API configurations with GitHub Actions
API platform teams can use GitHub Actions to sync API configurations, policies, and templates from a Git repository to Tyk. Triggered by repository changes, the action generates a .tyk.json file and applies updates with the sync command, keeping the Tyk setup aligned with the repository.

### Setup GitHub repository
Organize your repository with the following structure:

- `/apis/` for API definition files.
- `/policies/` for security policy files.
- `/assets/` for API template files.

### Create a GitHub Action workflow

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

### Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v2.0.0).
4. Add the following secrets:
    - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
    - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

### Commit and push changes

Commit the `tyk-sync.yml` file and push it to the main branch of your repository.

### Verify synchronisation

Each time there is a change in the repository, the GitHub Action will be triggered. It will create the `.tyk.json` file including all JSON files in the repository and use the `sync` command to update the Tyk installation.


## Update API Definitions locally
For API developers managing definitions locally, Tyk Sync's publish or update commands can upload local API definitions directly to the Tyk Dashboard, streamlining updates and keeping definitions in sync during development. Follow these steps to update your API definitions locally.

### Prepare your API Definition

Create your API definition file and save it locally. For example, save it as *api1.json* in a directory structure of your choice.

### Create a .tyk.json index file

In the root directory of your API definitions, create a `.tyk.json` file to list all API definition files that Tyk Sync should process.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    { 
        "file": "api1.json" 
    }
  ]
}
```

### Install Tyk Sync via Docker

If you haven't installed Tyk Sync, you can do so via Docker:

```bash
docker pull tykio/tyk-sync:v2.0.0
```

### Publish API Definitions to Tyk

Use the `publish` command to upload your local API definitions to Tyk. Use Docker bind mounts to access your local files.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 publish \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

### Update API Definitions to Tyk

Similarly, to update existing API definitions, use the update command.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 update \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

### Verify the update

Log in to your Tyk Dashboard to verify that the API definitions have been published or updated successfully.


## Specify Source API Configurations
For the `sync`, `update`, and `publish` commands, you need to specify where Tyk Sync can get the source API configurations to update the target Tyk installation. You can store the source files either in a Git repository or the local file system.

### Working with Git
For any Tyk Sync command that requires Git repository access, specify the Git repository as the first argument after the command. By default, Tyk Sync reads from the `master` branch. To specify a different branch, use the `--branch` or `-b` flag. If the Git repository requires connection using Secure Shell Protocol (SSH), you can specify SSH keys with `--key` or `-k` flag.

```bash
tyk-sync [command] https://github.com/your-repo --branch develop
```

### Working with the local file system
To update API configurations from the local file system, use the `--path` or `-p` flag to specify the source directory for your API configuration files.

```bash
tyk-sync [command] --path /path/to/local/directory
```

### Index File Requirement
A `.tyk.json` index file is required at the root of the source Git repository or the specified path. This `.tyk.json` file lists all the files that should be processed by Tyk Sync.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    {
      "file": "api1/api1.json"
    },
    {
      "file": "api2/api2.json"
    },
    {
      "file": "api3.json"
    }
  ],
  "policies": [
    {
      "file": "policy1.json"
    }
  ],
  "assets": [
    {
      "file": "template1.json"
    }
  ]
}
```


