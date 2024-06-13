---
date: 2017-03-23T13:19:38Z
title: Publish Command
description: "Learn about the usage and flags for tyk-sync publish command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `publish` command publishes API definitions, policies and templates from source in a file system or version control system to Tyk Gateway or Dashboard. Unlike the `sync` command, `publish` will not update existing APIs, and if it detects a collision, the operation will stop. It allows you to publish new API configurations to the target Dashboard without deleting or updating existing resources.

### Usage

```bash
tyk-sync publish [flags]
```

### Flags
#### Flags for specifying target Tyk installation:
* **`-d, --dashboard [DashboardUrl]`**: Specify the fully qualified URL of the Tyk Dashboard where configuration changes should be applied (optional).
* **`-g, --gateway [GatewayUrl]`**: Specify the fully qualified URL of the Tyk Gateway where configuration changes should be applied (optional).
* **`-s, --secret [Secret]`**: Your API secret for accessing Dashboard or Gateway API (optional).

{{< note success >}}
**Notes**

Either `-d, --dashboard` or `-g, --gateway` should be specified, but not both. This ensures that the command knows where to publish the changes -- to either the Tyk Dashboard or the Tyk Gateway. See [Getting started]({{<ref "product-stack/tyk-sync/installing-tyk-sync#specifying-target-tyk-installation">}}) for more information.
{{< /note >}}

#### Flags for specifying source [Git repository]({{<ref "product-stack/tyk-sync/installing-tyk-sync#working-with-git">}}) (Optional):
* **`-b, --branch [BranchName]`**: Specify the branch of the GitHub repository to use. Defaults to `refs/heads/master` (optional).
* **`-k, --key [SSHKeyFile]`**: Provide the location of the SSH key file for authentication to Git (optional).

{{< note success >}}
**Notes**

When publishing from Git, the location of the Git repository should be provided as the first argument after the command. Either the Git repository argument or `-p, --path` flag is required but not both.
{{< /note >}}

#### Flags for specifying source [file directory]({{<ref "product-stack/tyk-sync/installing-tyk-sync#working-with-the-local-file-system">}}) (Optional):
* **`-p, --path [Path]`**: Specify the source file directory where API configuration files are located (optional).

{{< note success >}}
**Notes**

`-p, --path` flag is required if Git repository is not provided in the argument.
{{< /note >}}

#### Flags for specifying resources to publish (Optional):
* **`--apis [ApiIDs]`**: Specify API IDs to publish.
* **`--policies [PolicyIDs]`**: Specify policy IDs to publish.
* **`--templates [TemplateIDs]`**: Specify template IDs to publish.

#### Other options:
* **`-h, --help`**: Help for the `publish` command.
* **`--test`**: Use test publisher, output results to stdio.

### Examples
#### Publish an API from local file system

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