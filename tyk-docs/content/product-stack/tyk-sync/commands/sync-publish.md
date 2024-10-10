---
date: 2017-03-23T13:19:38Z
title: Publish Command
description: "Learn about the usage and flags for tyk-sync publish command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `publish` command publishes API definitions, policies and templates from source in a file system or version control system to Tyk Dashboard. Unlike the `sync` command, `publish` will not update existing APIs, and if it detects a collision, the operation will stop. It allows you to publish new API configurations to the target Dashboard without deleting or updating existing resources.

## Usage

Publish from Git repository:
```bash
tyk-sync publish -d DASHBOARD_URL [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL
```

Publish from file system:
```bash
tyk-sync publish -d DASHBOARD_URL [-s SECRET] [-o ORG_ID] -p PATH
```

An index `.tyk.json` file is expected in the root directory of the Git repository or specified file path. An example index file is provided in the [example](#examples).

## Flags
* `-b, --branch BRANCH`: Specify the branch of the GitHub repository to use. Defaults to `refs/heads/master` (optional).
* `-d, --dashboard DASHBOARD_URL`: Specify the fully qualified URL of the Tyk Dashboard where configuration changes should be applied.
* `-h, --help`: Help for the `publish` command.
* `-k, --key SSHKEY`: Provide the location of the SSH key file for authentication to Git (optional).
* `-p, --path PATH`: Specify the source file directory where API configuration files are located (Required for synchronising from file system).
* `-s, --secret SECRET`: Your API secret for accessing Dashboard API (optional).
* `--test`: Use test publisher, output results to stdio.

## Flags for specifying resources to publish (Optional)
* `--apis IDS`: Specify API IDs to publish. Use this to selectively publish specific APIs. It can be a single ID or an array of string such as "id1,id2".
* `--oas-apis IDS`: Specify OAS API IDs to dump. Use this to selectively dump specific OAS APIs. It can be a single ID or an array of string such as "id1,id2".
* `--policies IDS`: Specify policy IDs to publish. Use this to selectively publish specific policies. It can be a single ID or an array of string such as "id1,id2".
* `--templates IDS`: Specify template IDs to publish. Use this to selectively publish specific API templates. It can be a single ID or an array of string such as "id1,id2".

## Examples
### Publish an API from local file system

1. First, prepare a `.tyk.json` file. This file serves as a configuration file for tyk-sync, providing necessary metadata and settings required for the synchronisation process.

A basic `.tyk.json` file looks like this:

```json
{
  "type": "apidef",
  "files": [
    {
      "file": "api-726e705e6afc432742867e1bd898cb23.json"
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

2. Then, run the following command to publish only specific API with ID `726e705e6afc432742867e1bd898cb23` to Tyk Dashboard.

```bash
tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23
```