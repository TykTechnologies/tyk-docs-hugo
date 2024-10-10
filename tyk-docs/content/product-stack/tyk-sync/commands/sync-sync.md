---
date: 2017-03-23T13:19:38Z
title: Sync Command
description: "Learn about the usage and flags for tyk-sync sync command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `sync` command synchronises Tyk with the contents of a Git repository or file system. The sync is one-way: from the repository to Dashboard, and it will not write back to the repository. This command will delete any objects in the dashboard that it cannot find in the Git repository or file system, update those that it can find, and create those that are missing. This allows for a streamlined and automated way to manage API configurations declaratively.

API developers can use this command in the CI/CD pipeline to achieve GitOps for API configurations, managing the API configurations for each Tyk environment in Git. By maintaining an up-to-date index file `.tyk.json` in their Git repository, developers can ensure that Tyk Dashboard reflects the desired state of their API configurations.

## Usage

Synchronise from Git repository:
```bash
tyk-sync sync -d DASHBOARD_URL [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL
```

Synchronise from file system:
```bash
tyk-sync sync -d DASHBOARD_URL [-s SECRET] [-o ORG_ID] -p PATH
```

An index `.tyk.json` file is expected in the root directory of the Git repository or specified file path. An example index file is provided in the [example](#examples).

## Flags
* `-b, --branch BRANCH`: Specify the branch of the GitHub repository to use. Defaults to `refs/heads/master` (optional).
* `-d, --dashboard DASHBOARD_URL`: Specify the fully qualified URL of the Tyk Dashboard where configuration changes should be applied.
* `-h, --help`: Help for the `sync` command.
* `-k, --key SSHKEY`: Provide the location of the SSH key file for authentication to Git (optional).
* `-o, --org ORG_ID`: Override the organization ID to use for the synchronisation process (optional).
* `-p, --path PATH`: Specify the source file directory where API configuration files are located (Required for synchronising from file system).
* `-s, --secret SECRET`: Your API secret for accessing Dashboard API (optional).
* `--test`: Use test publisher, output results to stdio.

### Flags for specifying resources to synchronise (Optional, to be deprecated)
The options `--apis` and `--policies` will be deprecated. If you want to create or update individual IDs, it is recommended to use the `publish` and `update` commands respectively.
* `--apis IDS`: Specify API IDs to synchronise. These APIs will be created or updated during synchronisation. Other resources will be deleted.
* `--policies IDS`: Specify policy IDs to synchronise. These policies will be created or updated during synchronisation. Other resources will be deleted.

## Examples
### Synchronising API configurations from Git

```bash
tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo
```

The Git repository must contain a `.tyk.json` file in the root directory. This file serves as a configuration file for tyk-sync, providing necessary metadata and settings required for the synchronisation process.

A basic `.tyk.json` file looks like this:

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
