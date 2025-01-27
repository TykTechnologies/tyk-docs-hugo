---
title: "Tyk Sync - Synchronize Tyk Environment With GitHub"
date: 2025-01-10
tags: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
description: How to synchronize Tyk configuration with Github using Tyk Sync
keywords: ["Tyk API Management", "Tyk Sync", "Tyk Operator", "Github", "Kubernetes", "Automations"]
aliases:
  - /advanced-configuration/manage-multiple-environments/tyk-sync
  - /product-stack/tyk-sync/commands/sync-dump
  - /product-stack/tyk-sync/commands/sync-examples
  - /product-stack/tyk-sync/commands/sync-publish
  - /product-stack/tyk-sync/commands/sync-sync
  - /product-stack/tyk-sync/commands/sync-update
  - /product-stack/tyk-sync/installing-tyk-sync
  - /product-stack/tyk-sync/overview
  - /product-stack/tyk-sync/tutorials/tutorial-backup-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-synchronise-api-configurations
  - /product-stack/tyk-sync/tutorials/tutorial-update-api-configurations
  - /tyk-sync
---

## Introduction

Tyk Sync enables you to export and import Tyk configurations directly from Git, keeping environments aligned without manual configuration updates. This section covers the setup and use of Tyk Sync, providing steps to ensure consistent configurations across different environments.


## Tyk Sync Features
Tyk Sync works with *Tyk Dashboard* installation. With Tyk Dashboard, Tyk Sync supports managing API definitions, security policies, and API templates.

| Tyk Sync Feature                                                           | Tyk Dashboard (Licensed) |
| ---------------------------------------------------------------------------|--------------------------|
| <h4>Backup objects from Tyk to a directory</h4>If you want to backup your API definitions, policies and templates in Tyk, you can use the `dump` command. It allows you to save the objects in transportable files. You can use this command to backup important API configurations before upgrading Tyk, or to save API configurations from one Dashboard instance and then use `update`, `publish`, or `sync` commands to update the API configurations to another Dashboard instance. | ✅ |
| <h4>Synchronise objects from Git (or any VCS) to Tyk</h4>To implement GitOps for API management, store your API definitions, policies and templates in Git or any version control system. Use the `sync` command to synchronise those objects to Tyk. During this operation, Tyk Sync will delete any objects in the Dashboard that cannot be found in the VCS, and update those that can be found and create those that are missing. | ✅ |
| <h4>Update objects</h4>The `update` command will read from VCS or file system and will attempt to identify matching API definitions, policies and templates in the target Dashboard, and update them. Unmatched objects will not be created. | ✅ |
| <h4>Publish objects</h4>The `publish` command will read from VCS or file system and create API definitions, policies, and templates in target Dashboard. This will not update any existing objects. If it detects a collision, the command will stop. | ✅ |
| <h4>Show and import Tyk examples</h4>The `examples` command allow you to show and import [Tyk examples](https://github.com/TykTechnologies/tyk-examples). An easy way to load up your Tyk installation with some interesting examples!| ✅ |

**Working with OAS APIs**

Starting with Sync v1.5+ and Dashboard v5.3.2+, Tyk Sync supports both [Tyk OAS APIs]({{<ref "getting-started/key-concepts/high-level-concepts">}}) and [Tyk Classic APIs]({{<ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types">}}) when working with the Tyk Dashboard, without requiring special flags or configurations.

For Sync versions v1.4.1 to v1.4.3, enabling Tyk Sync for Tyk OAS APIs requires the [allow-unsafe-oas]({{<ref "tyk-dashboard/configuration#allow_unsafe_oas">}}) configuration in the Dashboard, along with the `--allow-unsafe-oas` flag when invoking Tyk Sync. Note that Tyk Sync versions v1.4.1 to 1.4.3 do not support API Category for Tyk OAS APIs.

**Working with Tyk Streams APIs**

Tyk Streams API support was introduced in Tyk Dashboard v5.7.0. Tyk Sync v2.0 and later is compatible with Tyk Streams APIs and manages them similarly to Tyk OAS APIs. With Tyk Sync, you can seamlessly sync, publish, update, and dump Tyk Streams APIs just like OAS APIs.

Note: The Streams API validator is not applied during these operations.

**Working with Open Source Gateway**

From Sync v2.0, compatibility with the Open Source Tyk Gateway has been removed, making Tyk Sync v2.0 compatible exclusively with licensed Tyk Dashboard. As a result, Tyk Sync is no longer usable with the Open Source (OSS) version of the Tyk Gateway.


## Set up Tyk Sync
### Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

### Docker

To install Tyk Sync using Docker, follow these steps:

#### Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v1.5.0, use the following command:

```bash
SYNC_VERSION=v1.5.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All docker images are available on the [Tyk Sync Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags) page.

#### Run Tyk Sync

```bash
SYNC_VERSION=v1.5.0
docker run tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```

If you want to dump your API configurations to the local file system or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```bash
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```
Replace [command] with the specific Tyk Sync command you want to execute.


### Specify target Tyk installation

#### Tyk Dashboard
For Dashboard users, you can provide the necessary connection details using the `--dashboard` and `--secret` options.

```bash
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to the API access key use to access your Dashboard API. For dashboard users, you can get it from the “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

#### Open Source Gateway
For open source Gateway users, you can provide the necessary connection details using the `--gateway` and `--secret` options.

```bash
tyk-sync --gateway <GATEWAY_URL> --secret <SECRET> [command] [flags]
```

GATEWAY_URL is the fully qualified gateway target URL (e.g. `http://localhost:8080`) and SECRET refers to the API secret (`secret` parameter in your tyk.conf file) used to access your Gateway API.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_GW_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_GW_SECRET=<SECRET>
tyk-sync --gateway <GATEWAY_URL> [command] [flags]
```

2. Export configurations from your development environment:

```bash
tyk-sync dump -d http://localhost:3000 -s <dashboard-secret> -t dev-backup
```

This command exports all configurations from your development Tyk Dashboard to a local directory named `dev-backup`.

3. Import configurations to your staging environment:

```bash
tyk-sync publish -d http://staging-dashboard:3000 -s <staging-secret> -p dev-backup
```

This command imports the configurations from the `dev-backup` directory to your staging Tyk Dashboard.

### Specify Source API Configurations
For the `sync`, `update`, and `publish` commands, you need to specify where Tyk Sync can get the source API configurations to update the target Tyk installation. You can store the source files either in a Git repository or the local file system.

#### Working with Git
For any Tyk Sync command that requires Git repository access, specify the Git repository as the first argument after the command. By default, Tyk Sync reads from the `master` branch. To specify a different branch, use the `--branch` or `-b` flag. If the Git repository requires connection using Secure Shell Protocol (SSH), you can specify SSH keys with `--key` or `-k` flag.

```bash
tyk-sync [command] https://github.com/your-repo --branch develop
```

#### Working with the local file system
To update API configurations from the local file system, use the `--path` or `-p` flag to specify the source directory for your API configuration files.

```bash
tyk-sync [command] --path /path/to/local/directory
```

#### Index File Requirement
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


## Automate API Configuration Management with Tyk Sync
By integrating GitHub Actions, teams can schedule backups to cloud storage, sync configurations from a Git repository, and update local API definitions directly to the Tyk Dashboard. These workflows ensure configurations are securely maintained, aligned across environments, and easily managed within the API lifecycle.


### Backup API Configurations with Github Actions
API platform teams can automate configuration backups using GitHub Actions. By setting up a scheduled GitHub Action, API configurations can be periodically exported and stored in cloud storage, like AWS S3. This approach ensures backups remain up-to-date, offering a reliable way to safeguard data and simplify restoration if needed.


#### Create a GitHub Action workflow

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

#### Set up secrets

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

#### Commit and push changes

Commit the `tyk-backup.yml` file and push it to the main branch of your repository.

#### Verify backups

The GitHub Action will run every day at midnight, dumping API configurations into a backup directory and uploading them to your specified S3 bucket.


### Synchronize API configurations with GitHub Actions
API platform teams can use GitHub Actions to sync API configurations, policies, and templates from a Git repository to Tyk. Triggered by repository changes, the action generates a .tyk.json file and applies updates with the sync command, keeping the Tyk setup aligned with the repository.

#### Setup GitHub repository
Organize your repository with the following structure:

- `/apis/` for API definition files.
- `/policies/` for security policy files.
- `/assets/` for API template files.

#### Create a GitHub Action workflow

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

#### Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use (e.g., v2.0.0).
4. Add the following secrets:
    - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
    - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.

#### Commit and push changes

Commit the `tyk-sync.yml` file and push it to the main branch of your repository.

#### Verify synchronisation

Each time there is a change in the repository, the GitHub Action will be triggered. It will create the `.tyk.json` file including all JSON files in the repository and use the `sync` command to update the Tyk installation.


### Update API Definitions locally
For API developers managing definitions locally, Tyk Sync's publish or update commands can upload local API definitions directly to the Tyk Dashboard, streamlining updates and keeping definitions in sync during development. Follow these steps to update your API definitions locally.

#### Prepare your API Definition

Create your API definition file and save it locally. For example, save it as *api1.json* in a directory structure of your choice.

#### Create a .tyk.json index file

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

#### Install Tyk Sync via Docker

If you haven't installed Tyk Sync, you can do so via Docker:

```bash
docker pull tykio/tyk-sync:v2.0.0
```

#### Publish API Definitions to Tyk

Use the `publish` command to upload your local API definitions to Tyk. Use Docker bind mounts to access your local files.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 publish \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

#### Update API Definitions to Tyk

Similarly, to update existing API definitions, use the update command.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 update \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

#### Verify the update

Log in to your Tyk Dashboard to verify that the API definitions have been published or updated successfully.


## Tyk Sync Commands

### Dump Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync dump`                                                                                       |
| **Usage**     | ```tyk-sync dump -d DASHBOARD_URL [-s SECRET] [-t PATH]```                                                 |
| **Flags**     | `-d, --dashboard DASHBOARD_URL`: Tyk Dashboard URL (required)<br>                                    `-h, --help`: Help for the dump command<br>                                   `-t, --target PATH`: Target directory for output files (optional)<br>                                    `-s, --secret SECRET`: API secret for Dashboard access (optional)<br>                                    `--apis IDS`: Specific API IDs to dump<br>                                    `--oas-apis IDS`: Specific OAS API IDs to dump<br>                                    `--policies IDS`: Specific policy IDs to dump<br>                                    `--templates IDS`: Specific template IDs to dump |
| **Example**   | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret ```|
| **Example** | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret --target /path/to/backup --apis c2ltcGxlLWdyYXBoLWRldi90eWthcGktc2NoZW1h,baa5d2b65f1b45385dac3aeb658fa04c ``` |

### Examples Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync examples`                                                                                   |
| **Usage**     | ```tyk-sync examples [flags]```<br>```tyk-sync examples [command]```                                           |
| **Subcommands**| `publish`: Publish a specific example<br> `show`: Show details of a specific example              |
| **Flags**     | `-h, --help`: Help for examples command                                                             |
| **Example**   | ```tyk-sync examples ```                                                                         |

### Examples Show Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples show```                                                                              |
| **Usage**     | ```tyk-sync examples show [flags]```                                                                      |
| **Flags**     | `-h, --help`: Help for show command<br> `-l, --location string`: Location of the example           |
| **Example**   | ```tyk-sync examples show --location="udg/vat-checker" ```                                       |

### Examples Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples publish```                                                                           |
| **Usage**     | ```tyk-sync examples publish [flags]```                                                                   |
| **Flags**     | `-b, --branch string`: Branch to use (default "refs/heads/main")<br> `-d, --dashboard string`: Dashboard target URL<br> `-g, --gateway string`: Gateway target URL<br> `-h, --help`: Help for publish command<br> `-k, --key string`: Key file location for auth<br> `-l, --location string`: Location of the example<br> `-s, --secret string`: API secret<br> `--test`: Use test publisher, output to stdio |
| **Example**   | ```tyk-sync examples publish -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -l="udg/vat-checker" ``` |

### Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync publish```                                                                                    |
| **Usage**     | ```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     |  `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for publish command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to publish<br> `--oas-apis IDS`: Specific OAS API IDs to publish<br> `--policies IDS`: Specific policy IDs to publish<br> `--templates IDS`: Specific template IDs to publish |
| **Example**   | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23 ```|
| **Example** | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

### Sync Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync sync`                                                                                       |
| **Usage**     | ```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for sync command<br> `-k, --key SSHKEY`: SSH key file location<br> `-o, --org ORG_ID`: Override organization ID<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to sync (to be deprecated)<br> `--policies IDS`: Specific policy IDs to sync (to be deprecated) |
| **Example**   | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo/your-apis ```|
| **Example** | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret -p /path/to/your/apis ``` |

### Update Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync update`                                                                                     |
| **Usage**     | ```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for update command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to update<br> `--oas-apis IDS`: Specific OAS API IDs to update<br> `--policies IDS`: Specific policy IDs to update<br> `--templates IDS`: Specific template IDs to update |
| **Example**   | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23```|
| **Example** | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

## Troubleshooting and FAQ

### How are Tyk configurations synchronized to Git?

Tyk Sync allows you to dump configurations to a local directory, which can then be committed to a Git repository. This enables version control and easy synchronization across environments.

For example:
1. Dump configurations: `tyk-sync dump -d http://dashboard:3000 -s secret -t ./configs`
2. Commit to Git: 
   ```
   cd configs
   git add .
   git commit -m "Update Tyk configurations"
   git push
   ```

### Can I sync multiple APIs to a single Git repository?

Yes, you can store multiple API definitions, policies, and other Tyk resources in a single Git repository. Tyk Sync and Tyk Operator can work with multiple resources in the same directory.

Your repository structure might look like this:
```
tyk-configs/
├── apis/
│   ├── api1.yaml
│   └── api2.yaml
├── policies/
│   ├── policy1.yaml
│   └── policy2.yaml
└── tyk-operator/
    └── operator-context.yaml
```

### How do I roll back changes made with Tyk Sync?

To roll back changes made with Tyk Sync:

1. If you're using Git, check out the previous version of your configurations:
   ```bash
   git checkout <previous-commit-hash>
   ```

2. Use Tyk Sync to publish the previous version:
   ```bash
   tyk-sync sync -d http://dashboard:3000 -s <secret> -p ./
   ```

It's a good practice to maintain separate branches or tags for different environments to make rollbacks easier.

