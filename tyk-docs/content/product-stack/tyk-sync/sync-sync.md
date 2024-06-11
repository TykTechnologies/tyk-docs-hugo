---
date: 2017-03-23T13:19:38Z
title: Sync Command
description: "Learn about the usage and flags for tyk-sync sync command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `sync` command facilitates a GitOps approach for managing API configurations for Tyk. Users can store API configurations in Git repositories, enabling centralised management and version control. By integrating tyk-sync into CI/CD pipelines, organizations ensure that new or updated API configurations are automatically synchronised to the target Tyk instances. Moreover, when API configurations are removed from Git repositories, sync command ensures that corresponding resources are promptly deleted from the Tyk Gateway or Dashboard, maintaining consistency between the repository and runtime environments.

### Usage

```bash
tyk-sync sync [flags]
```

### Flags
#### Flags for specifying target Tyk installation:
* **`-d, --dashboard [DashboardUrl]`**: Specify the fully qualified URL of the Tyk Dashboard where configuration changes should be applied (optional).
* **`-g, --gateway [GatewayUrl]`**: Specify the fully qualified URL of the Tyk Gateway where configuration changes should be applied (optional).
* **`-s, --secret [Secret]`**: Your API secret for accessing Dashboard or Gateway API (optional).

{{< note success >}}
**Notes**

Either `-d, --dashboard` or `-g, --gateway` should be specified, but not both. This ensures that the command knows where to apply the synchronisation changes -- to either the Tyk Dashboard or the Tyk Gateway. See [Getting started]({{<ref "product-stack/tyk-sync/installing-tyk-sync#specifying-target-tyk-installation">}}) for more information.
{{< /note >}}

#### Flags for specifying source [Git repository]({{<ref "product-stack/tyk-sync/installing-tyk-sync#working-with-git">}}) (Optional):
* **`-b, --branch [BranchName]`**: Specify the branch of the GitHub repository to use. Defaults to `refs/heads/master` (optional).
* **`-k, --key [SSHKeyFile]`**: Provide the location of the SSH key file for authentication to Git (optional).

{{< note success >}}
**Notes**

When synchronising from Git, the location of the Git repository should be provided as the first argument after the command. Either the Git repository argument or `-p, --path` flag is required but not both.
{{< /note >}}

#### Flags for specifying source [file directory]({{<ref "product-stack/tyk-sync/installing-tyk-sync#working-with-the-local-file-system">}}) (Optional):
* **`-p, --path [Path]`**: Specify the source file directory where API configuration files are located (optional).

{{< note success >}}
**Notes**

`-p, --path` flag is required if Git repository is not provided in the argument.
{{< /note >}}

#### Flags for specifying resources to synchronise (Optional):
* **`--apis [ApiIDs]`**: Specify API IDs to synchronise. These APIs will be created or updated during synchronisation.
* **`--policies [PolicyIDs]`**: Specify policy IDs to synchronise. These policies will be created or updated during synchronisation.
* **`--templates [TemplateIDs]`**: Specify template IDs to synchronise. These templates will be created or updated during synchronisation.

{{< note success >}}
**Notes**

When `--apis`, `--policies`, or `--templates` flags are used, the `sync` command updates the target Tyk installation to match the state specified by these flags. This means that all unspecified resources, **including APIs, policies, and templates**, will be deleted from the Tyk Dashboard or Gateway. Users should exercise caution during synchronisation to avoid unintended deletions.
{{< /note >}}

#### Other options:
* **`-h, --help`**: Help for the `sync` command.
* **`-o, --org [OrganisationID]`**: Override the organization ID to use for the synchronisation process.
* **`--test`**: Use test publisher, output results to stdio.

### Examples
#### Synchronising API configurations from Git

```bash
tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo
```

The GitHub repository must contain a `.tyk.json` file in the root directory. This file serves as a configuration file for tyk-sync, providing necessary metadata and settings required for the synchronisation process.

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