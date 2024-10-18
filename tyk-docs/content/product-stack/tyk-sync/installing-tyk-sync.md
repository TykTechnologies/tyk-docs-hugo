---
date: 2017-03-23T13:19:38Z
title: Installing and running Tyk Sync
description: "Learn about Tyk Sync's prerequisites, installation steps via Docker and Packagecloud, and detailed guides for using Tyk Sync locally or integrating it with Git in a CI/CD pipeline."
tags: [ "Tyk Sync" ]
---

### Pre-requisites
- Access to a Git repository or local file system for storing configurations
- Licensed Tyk Dashboard

{{< note success >}}
**Compatible Tyk Version**

<br>Tyk Sync manages API definition and require an update whenever the API definition schema has changed. Please check the "Compatibility Matrix For Tyk Components" section in [Tyk Dashboard]({{< ref "product-stack/tyk-dashboard/release-notes/overview">}})'s release notes to select the correct version of Tyk Sync.
{{< /note >}}

{{< note success >}}
**Gateway and Dashboard Configuration**

<br>Tyk Sync tries to be clever about what APIs and Policies to update and which to create, it will actually base all ID matching on the API ID and the masked Policy ID, so it can identify the same object across installations. Tyk has a tendency to generate fresh IDs for all new Objects, so Tyk Sync gets around this by using portable IDs and ensuring the necessary portable IDs are set when using the `dump` command.
<br>
<br>In order for policy ID matching to work correctly, your Dashboard must have [allow_explicit_policy_id]({{<ref "tyk-dashboard/configuration#allow_explicit_policy_id">}}) and [enable_duplicate_slugs]({{<ref "tyk-dashboard/configuration#enable_duplicate_slugs">}}) set to `true` and your Gateway must have [policies.allow_explicit_policy_id]({{<ref "tyk-oss-gateway/configuration#policiesallow_explicit_policy_id">}}) set to `true`.
{{< /note >}}

## Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

### Docker

To install Tyk Sync using Docker, follow these steps:

##### 1. Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v2.0.0, use the following command:

```bash
SYNC_VERSION=v2.0.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All docker images are available on the [Tyk Sync Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags) page.

##### 2. Run Tyk Sync

```bash
SYNC_VERSION=v2.0.0
docker run tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```

If you want to dump your API configurations to the local file system or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```bash
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```
Replace [command] with the specific Tyk Sync command you want to execute.

## Command usage

The following flags can be passed to tyk-sync commands to specify how to connect to the target Tyk installation and where the source API configurations are stored.

### Check version

To check the version of Tyk Sync installed, use the `version` command. This command displays the current version of Tyk Sync that is installed on your system.

```bash
tyk-sync version
```

This will output the version information, helping you ensure that you have the correct version installed for your needs.

### Getting help

To display usage options please do:
```bash
tyk-sync help
```

You can also get help with any commands with `-h` or `--help` flag.
```bash
tyk-sync [command] --help
```

### Specifying target Tyk installation

#### Tyk Dashboard
Dashboard users can provide the necessary connection details using the `--dashboard` and `--secret` options.

```bash
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to the API access key use to access your Dashboard API. For dashboard users, you can get it from the “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

### Specifying source API configurations
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