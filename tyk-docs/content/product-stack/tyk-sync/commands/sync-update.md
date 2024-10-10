---
date: 2017-03-23T13:19:38Z
title: Update Command
description: "Learn about the usage and flags for tyk-sync update command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `update` command updates existing API definitions, policies, and templates from source in a file system or Git repository to Tyk. This command will identify matching APIs or Policies and update them accordingly. It will not create new resources; for creating new ones, use the `publish` or `sync` commands.

API teams can use this command to make changes to API configurations declaratively and then synchronise the Dashboard with the latest configurations, ensuring consistency and version control across their API management infrastructure.

## Usage

Update from Git repository:
```bash
tyk-sync update -d DASHBOARD_URL [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL
```

Update from file system:
```bash
tyk-sync update -d DASHBOARD_URL [-s SECRET] [-o ORG_ID] -p PATH
```

An index `.tyk.json` file is expected in the root directory of the Git repository or specified file path. An example index file is provided in the [example](#examples).

## Flags
* `-b, --branch BRANCH`: Specify the branch of the GitHub repository to use. Defaults to `refs/heads/master` (optional).
* `-d, --dashboard DASHBOARD_URL`: Specify the fully qualified URL of the Tyk Dashboard where configuration changes should be applied.
* `-h, --help`: Help for the `update` command.
* `-k, --key SSHKEY`: Provide the location of the SSH key file for authentication to Git (optional).
* `-p, --path PATH`: Specify the source file directory where API configuration files are located (Required for synchronising from file system).
* `-s, --secret SECRET`: Your API secret for accessing Dashboard API (optional).
* `--test`: Use test publisher, output results to stdio.

## Flags for specifying resources to update (Optional)
* `--apis IDS`: Specify API IDs to update. Use this to selectively update specific APIs. It can be a single ID or an array of string such as "id1,id2".
* `--oas-apis IDS`: Specify OAS API IDs to dump. Use this to selectively dump specific OAS APIs. It can be a single ID or an array of string such as "id1,id2".
* `--policies IDS`: Specify policy IDs to update. Use this to selectively update specific policies. It can be a single ID or an array of string such as "id1,id2".
* `--templates IDS`: Specify template IDs to update. Use this to selectively update specific API templates. It can be a single ID or an array of string such as "id1,id2".

## Examples
### Update API configurations from local file system

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

2. Then, run the following command to update only specific API with ID `726e705e6afc432742867e1bd898cb23` to Tyk Dashboard.

```bash
tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23
```