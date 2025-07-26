---
title: "Getting Started with Tyk Sync"
tags: ["Tyk Sync", "Installation", "Docker", "API Management"]
description: "Learn how to install Tyk Sync using Docker or Packagecloud"
---


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


