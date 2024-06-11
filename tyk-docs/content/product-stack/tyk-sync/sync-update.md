---
date: 2017-03-23T13:19:38Z
title: Update Command
description: "Learn about the usage and flags for tyk-sync update command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `update` command updates existing API definitions, policies, and templates from source in a file system or GitHub repository to Tyk Gateway or Dashboard. This command will identify matching APIs or Policies and update them accordingly. It will not create new resources; for creating new ones, use the `publish` or `sync` commands.

API teams can use this command to make changes to API configurations declaratively and then synchronise the Dashboard or Gateway with the latest configurations, ensuring consistency and version control across their API management infrastructure.

### Usage

```bash
tyk-sync update [flags]
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

When updating from Git, the location of the Git repository should be provided as the first argument after the command. Either the Git repository argument or `-p, --path` flag is required but not both.
{{< /note >}}

#### Flags for specifying source [file directory]({{<ref "product-stack/tyk-sync/installing-tyk-sync#working-with-the-local-file-system">}}) (Optional):
* **`-p, --path [Path]`**: Specify the source file directory where API configuration files are located (optional).

{{< note success >}}
**Notes**

`-p, --path` flag is required if Git repository is not provided in the argument.
{{< /note >}}

#### Flags for specifying resources to update (Optional):
* **`--apis [ApiIDs]`**: Specify API IDs to update.
* **`--policies [PolicyIDs]`**: Specify policy IDs to update.
* **`--templates [TemplateIDs]`**: Specify template IDs to update.

#### Other options:
* **`-h, --help`**: Help for the `update` command.
* **`--test`**: Use test publisher, output results to stdio.

### Examples
#### Update API configurations from local file system

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