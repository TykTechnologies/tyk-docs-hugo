---
date: 2017-03-23T13:19:38Z
title: Dump Command
description: "Learn about the usage and flags for tyk-sync dump command"
tags: [ "Tyk Sync", "GitOps" ]
---

The `dump` command in Tyk Sync is used to export API definitions, policies, and templates from your Tyk Dashboard to local files. This command helps in creating backups or migrating configurations. It will also generate an index file `.tyk.json` that can be used for `sync`, `update`, and `publish` command.

{{< note success >}}
**Notes**

Dump command is available to Tyk Dashboard users only. Open source users can find API resource files in the file system, e.g. `/var/tyk-gateway/apps` (LINUX) or `/opt/tyk-gateway/apps` (Docker).
{{< /note >}}

### Usage

```bash
tyk-sync dump [flags]
```

### Flags
#### Flags for connecting to Tyk Dashboard:
* **`-d, --dashboard [DashboardUrl]`**: Fully qualified Tyk Dashboard target URL.
* **`-s, --secret [Secret]`**: Your API secret for accessing Dashboard API.

#### Flags for specifying target directory for the output files (Optional):
* **`-t, --target [Path]`**: Target directory for the output files.

#### Flags for specifying resources to dump (Optional):
* **`--apis [ApiIDs]`**: Specify API IDs to dump. Use this to selectively dump specific APIs.
* **`--policies [PolicyIDs]`**: Specify policy IDs to dump. Use this to selectively dump specific policies.
* **`--templates [TemplateIDs]`**: List of template IDs to dump. Use this to selectively dump specific API templates.

#### Other options:
* **`-h, --help`**: Help for the `dump` command.

### Examples
1. Dump all configurations

The simplest form of the `tyk-sync dump` command only requires specifying the Dashboard URL and secret via the `--dashboard` and `--secret` flags. It will dump all APIs, security policies, and templates in the target dashboard as files in the current directory of your file system.

```bash
tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret
```

2. Dump specific APIs

```bash
tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret \
  --target /path/to/backup \
  --apis c2ltcGxlLWdyYXBoLWRldi90eWthcGktc2NoZW1h,baa5d2b65f1b45385dac3aeb658fa04c
```

3. Dump specific policies

```bash
tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret \
  --target /path/to/backup \
  --policies 6667305de04e940001b09c9a
```

4. Dump specific templates

```bash
tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret \
  --target /path/to/backup \
  --templates eab07eea465d41ba8319428d42b3b796
```