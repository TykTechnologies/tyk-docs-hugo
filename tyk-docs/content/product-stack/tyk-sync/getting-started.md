---
date: 2017-03-23T13:19:38Z
title: Getting Started
description: "Learn about Tyk Sync's prerequisites, installation steps via Docker and Packagecloud, and detailed guides for using Tyk Sync locally or integrating it with Git in a CI/CD pipeline."
tags: [ "Tyk Sync" ]
---

## Pre-requisites
- Access to a Git repository or local filesystem for storing configurations
- Tyk Gateway or Tyk Dashboard

{{< note success >}}
**Gateway and Dashboard Version**

<br>Tyk Sync manages API definition and require an update whenever the API definition schema has changed in Gateway or Dashboard. Please check the "Compatibility Matrix For Tyk Components" section in [Tyk Gateway]({{<ref "product-stack/tyk-gateway/release-notes/overview">}}) and [Dashboard]({{< ref "product-stack/tyk-dashboard/release-notes/overview">}})'s release notes to select the correct version of Tyk Sync.
{{< /note >}}

{{< note success >}}
**Gateway and Dashboard Configuration**

<br>Tyk Sync tries to be clever about what APIs and Policies to update and which to create, it will actually base all ID matching on the API ID and the masked Policy ID, so it can identify the same object across installations. Tyk has a tendency to generate fresh IDs for all new Objects, so Tyk Sync gets around this by using portable IDs and ensuring the necessary portable IDs are set when using the `dump` command.
<br>
<br>In order for policy ID matching to work correctly, your Dashboard must have [allow_explicit_policy_id]({{<ref "tyk-dashboard/configuration#allow_explicit_policy_id">}}) and [enable_duplicate_slugs]({{<ref "tyk-dashboard/configuration#enable_duplicate_slugs">}}) set to `true` and your Gateway must have [policies.allow_explicit_policy_id]({{<ref "tyk-oss-gateway/configuration#policiesallow_explicit_policy_id">}}) set to `true`.
{{< /note >}}

## Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

### Installing Tyk Sync via Docker

To install Tyk Sync using Docker, follow these steps:

#### 1. Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v1.5.0, use the following command:

```{.copyWrapper}
SYNC_VERSION=v1.5.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All available versions could be found on the Tyk Sync Docker Hub page here: https://hub.docker.com/r/tykio/tyk-sync/tags

#### 2. Run Tyk Sync

```{.copyWrapper}
docker run tykio/tyk-sync:$SYNC_VERSION [command]
```

If you want to dump your API configurations to the local filesystem or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```{.copyWrapper}
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command]
```
Replace [command] with the specific Tyk Sync command you want to execute.

### Checking the Installed Version

To check the version of Tyk Sync installed, use the `version` command. This command displays the current version of Tyk Sync that is installed on your system.

```{.copyWrapper}
tyk-sync version
```

This will output the version information, helping you ensure that you have the correct version installed for your needs.

### Getting help

To display usage options please do:
```{.copyWrapper}
tyk-sync help
```

You can also get help with any commands with `-h` or `--help` flag.
```{.copyWrapper}
tyk-sync [command] --help
```

## Specifying target Dashboard installation
For Dashboard users, you can provide the necessary connection details using the `--dashboard` and `--secret` options.

```{.copyWrapper}
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

where DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to API access key use to access your Dashboard API. For dashboard users, you can get it from “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```{.copyWrapper}
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

## Specifying target Gateway installation
For open source Gateway users, you can provide the necessary connection details using the `--gateway` and `--secret` options.

```{.copyWrapper}
tyk-sync --gateway <GATEWAY_URL> --secret <SECRET> [command] [flags]
```

where GATEWAY_URL is the fully qualified gateway target URL (e.g. `http://localhost:8080`) and SECRET refers to API secret (`secret` parameter in your tyk.conf file) use to access your Gateway API.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_GW_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```{.copyWrapper}
export TYKGIT_GW_SECRET=<SECRET>
tyk-sync --gateway <GATEWAY_URL> [command] [flags]
```

## Specifying Source API Configurations
For the `sync`, `update`, and `publish` commands, you need to specify where Tyk Sync can get the source API configurations to update the target Tyk installation. You can store the source files either in a Git repository or the local filesystem.

### Working with Git
For any Tyk Sync command that requires Git repository access, specify the Git repository as the first argument after the command. By default, Tyk Sync reads from the `master` branch. To specify a different branch, use the `--branch` or `-b` flag.

```{.copyWrapper}
tyk-sync [command] https://github.com/your-repo --branch develop
```

### Working with Local File System
To update API configurations from the local filesystem, use the `--path` or `-p` flag to specify the source directory for your API configuration files.

```{.copyWrapper}
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
      "file": "asset1.json"
    }
  ]
}
```

## Tutorial 1: Keeping and Updating API Definitions Locally
<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Step 1. Prepare Your API Definition

Create your API definition file and save it locally. For example, save it as api1.json in a directory structure of your choice.

#### Step 2: Create a .tyk.json Index File

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

#### Step 3: Install Tyk Sync via Docker

If you haven't installed Tyk Sync, you can do so via Docker:

```{.copyWrapper}
docker pull tykio/tyk-sync:v1.5.0
```

#### Step 4: Publish API Definitions to Tyk

Use the `publish` command to upload your local API definitions to Tyk. Use Docker bind mounts to access your local files.

```{.copyWrapper}
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v1.5.0 publish \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

#### Step 5: Update API Definitions to Tyk

Similarly, to update existing API definitions, use the update command.

```{.copyWrapper}
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v1.5.0 update \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

#### Step 6: Verify the Update

Log in to your Tyk Dashboard to verify that the API definitions have been published or updated successfully.

</details>

## Tutorial 2: Synchronizing API configurations with GitHub Actions
<details>
  <summary>
    Click to expand tutorial
  </summary>

### Step 1: Setup GitHub Repository
Organize your repository with the following structure:

- `/apis/` for API definition files.
- `/policies/` for security policy files.
- `/assets/` for API template files.

### Step 2: Create a GitHub Action Workflow

1. In your repository, create a new file `.github/workflows/tyk-sync.yml`.
2. Add the following content to the `tyk-sync.yml` file:

```
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

    - name: Install Docker
      run: |
        sudo apt-get update
        sudo apt-get install -y docker.io

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

    - name: Sync with Tyk
      run: |
        echo 'Running tyk-sync version'
        docker run tykio/tyk-sync:${TYK_SYNC_VERSION} version
        docker run -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} sync --path /app/data --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}
```

### Step 3: Set Up Secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v1.5.0).
4. Add the following secrets:
    - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
    - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

### Step 4: Commit and Push Changes

Commit the `tyk-sync.yml` file and push it to the main branch of your repository.

### Step 5: Verify Synchronization

Each time there is a change in the repository, the GitHub Action will be triggered. It will create the `.tyk.json` file including all JSON files in the repository and use the `sync` command to update the Tyk installation.

</details>

## Tutorial 3: Periodically Backing Up API Configurations with GitHub Actions
<details>
  <summary>
    Click to expand tutorial
  </summary>

### Step 1: Create a GitHub Action Workflow

1. In your repository, create a new file `.github/workflows/tyk-backup.yml`.
2. Add the following content to the `tyk-backup.yml` file:

```
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

    - name: Install Docker
      run: |
        sudo apt-get update
        sudo apt-get install -y docker.io

    - name: Create Backup Directory
      run: |
        BACKUP_DIR="backup/$(date +%Y-%m-%d)"
        mkdir -p $BACKUP_DIR
        export BACKUP_DIR

    - name: Dump API Configurations
      run: |
        echo 'Running tyk-sync version'
        docker run tykio/tyk-sync:${TYK_SYNC_VERSION} version
        docker run -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} dump --target /app/data/$BACKUP_DIR --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}

    - name: Commit and Push Backup
      run: |
        git config --global user.name 'github-actions'
        git config --global user.email 'github-actions@github.com'
        git add backup/
        git commit -m "Backup on $(date +%Y-%m-%d)"
        git push
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Step 2: Set Up Secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v1.5.0).
4. Add the following secrets:
   - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
   - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

### Step 3: Commit and Push Changes

Commit the `tyk-backup.yml` file and push it to the main branch of your repository.

Step 4: Verify Backups

The GitHub Action will run every day at midnight, dumping API configurations into the `/backup/[date]` folder and committing these backups to the repository.

</details>