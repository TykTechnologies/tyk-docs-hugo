---
date: 2017-03-23T13:19:38Z
title: Dump Command
description: "Learn about the usage and flags for tyk-sync dump command"
tags: [ "Tyk Sync", "GitOps" ]
---

The tyk-sync `dump` command is used to export API definitions, policies, and templates from your Tyk Dashboard to local files. This command helps in creating backups or migrating configurations. It will also generate an index file `.tyk.json` that can be used for `sync`, `update`, and `publish` command.

## Usage

```bash
tyk-sync dump -d DASHBOARD_URL [-s SECRET] [-t PATH]
```

## Flags
* `-d, --dashboard DASHBOARD_URL`: Specify the fully qualified URL of the Tyk Dashboard.
* `-h, --help`: Help for the `dump` command.
* `-t, --target PATH`: Target directory for the output files. Default to current directory if not provided (optional).
* `-s, --secret SECRET`: Your API secret for accessing Dashboard API (optional).

## Flags for specifying resources to dump (Optional)
* `--apis IDS`: Specify API IDs to dump. Use this to selectively dump specific APIs. It can be a single ID or an array of string such as "id1,id2".
* `--oas-apis IDS`: Specify OAS API IDs to dump. Use this to selectively dump specific OAS APIs. It can be a single ID or an array of string such as "id1,id2".
* `--policies IDS`: Specify policy IDs to dump. Use this to selectively dump specific policies. It can be a single ID or an array of string such as "id1,id2".
* `--templates IDS`: Specify template IDs to dump. Use this to selectively dump specific API templates. It can be a single ID or an array of string such as "id1,id2".

## Examples
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