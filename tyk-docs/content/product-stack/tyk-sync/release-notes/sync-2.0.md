---
title: Tyk Sync 2.0 Release Notes
tag: ["Tyk Sync", "Release notes", "v2.0", "2.0.0", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Sync versions within the 2.0.X series."
---
**Licensed Protected Product**

**This page contains all release notes for version 2.0.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 2.0.0 Release Notes

From Tyk Sync v2.0, Tyk Sync will be closed source and we will only support use of Tyk Sync with licensed Tyk Dashboard.

### Release Date 10 Oct 2024

### Release Highlights

Tyk Sync 2.0 has been updated to support API configurations from Tyk 5.6.0.

Please refer to the [changelog]({{< ref "#Changelog-v2.0.0">}}) below for detailed explanation.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
#### Deprecation of `--gateway` Flag

As of Tyk Sync v2.0, support for the **Open Source Tyk Gateway** has been removed. Tyk Sync v2.0 is now compatible exclusively with licensed Tyk Dashboard. This change means that Tyk Sync can no longer be used with the Open Source (OSS) version of the Tyk Gateway.

The `--gateway` flag, previously used to sync with the OSS Tyk Gateway, is **deprecated** and will be fully **removed in a future release**. Users should prepare to transition their Tyk Sync workflows to licensed Tyk Dashboard environments to ensure continued functionality.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
#### Future deprecations
As part of our ongoing efforts to streamline and improve Tyk Sync, we plan to deprecate the following options in future releases:

- `--apis` for the `tyk-sync sync` command.
- `--policies` for the `tyk-sync sync` command.

We recommend users update their workflows to use the `publish` and `update` commands for managing individual API and Policy IDs. To continue using the `sync` command, ensure all required resources are listed in the `.tyk.json` index file. This file will serve as the source of truth for API configuration states, and Tyk Sync will create or update all specified resources while removing any others from Tyk Dashboard.

### Upgrade instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Downloads
- [Docker image v2.0.0](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v2.0.0)
  - ```bash
    docker pull tykio/tyk-sync:v2.0.0
    ```
- [Source code](https://github.com/TykTechnologies/tyk-sync/releases/tag/v2.0.0)

### Changelog {#Changelog-v2.0.0}

#### Updated

<ul>
<li>
<details>
<summary>API definitions and policies supported up to Tyk Gateway v5.6.0 </summary>

Tyk Sync 2.0 supports API definitions and policies up to Tyk Gateway v5.6.0. This update ensures that Tyk Sync can manage API definitions and policies compatible with Tyk Gateway v5.6.0.
</details>
</li>

<li>
<details>
<summary>Deprecated --gateway flag </summary>

As of Tyk Sync v2.0, support for the **Open Source Tyk Gateway** has been removed. Tyk Sync v2.0 is now compatible exclusively with licensed Tyk Dashboard. This change means that Tyk Sync can no longer be used with the Open Source (OSS) version of the Tyk Gateway.

The `--gateway` flag, previously used to sync with the OSS Tyk Gateway, is **deprecated** and will be fully **removed in a future release**. Users should prepare to transition their Tyk Sync workflows to licensed Tyk Dashboard environments to ensure continued functionality.
</details>
</li>
</ul>

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

## Earlier Versions Release Notes
Release Notes for Tyk Sync v1.4.1 and earlier can we found in [Tyk Sync GitHub](https://github.com/TykTechnologies/tyk-sync/releases)