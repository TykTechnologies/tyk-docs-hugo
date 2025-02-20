---
title: Tyk Sync Release Notes
tag: ["Tyk Sync", "Release notes", "v2.0", "2.0.0", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Sync versions within the 2.0.X series."
aliases:
  - /product-stack/tyk-sync/release-notes/sync-1.4
  - /product-stack/tyk-sync/release-notes/sync-1.5
  - /product-stack/tyk-sync/release-notes/sync-2.0
---
**Licensed Protected Product**

**This page contains all release notes for Sync displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 2.0 Release Notes

### 2.0.4 Release Notes

#### Release Date 14 February 2025

#### Release Highlights

Tyk Sync 2.0.4 has been updated to fix a critical security vulnerability.

Please refer to the [changelog]({{< ref "#Changelog-v2.0.4">}}) below for detailed explanation.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
For users currently on v2.0.0, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version 2.0.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker image v2.0.4](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v2.0.4)
  - ```bash
    docker pull tykio/tyk-sync:v2.0.4
    ```

#### Changelog {#Changelog-v2.0.4}

##### Fixed

<ul>
<li>
<details>
<summary>CVE-2025-21613 resolved in Tyk Sync</summary>

Resolved CVE-2025-21613 by updating the go-git library to v5.13.2. go-git is a highly extensible git implementation library written in pure Go. An argument injection vulnerability was discovered in go-git versions prior to v5.13. Successful exploitation of this vulnerability could allow an attacker to set arbitrary values to git-upload-pack flags. This only happens when the file transport protocol is being used, as that is the only protocol that shells out to git binaries. This vulnerability is fixed in 5.13.0.
</details>
</li>
</ul>

### 2.0.1 Release Notes

#### Release Date 05 December 2024

#### Release Highlights

Tyk Sync 2.0.1 has been updated to support API configurations from Tyk 5.7.0.

Please refer to the [changelog]({{< ref "#Changelog-v2.0.1">}}) below for detailed explanation.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
For users currently on v2.0.0, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version 2.0.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker image v2.0.1](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v2.0.1)
  - ```bash
    docker pull tykio/tyk-sync:v2.0.1
    ```

#### Changelog {#Changelog-v2.0.1}

###### Changed

<ul>
<li>
<details>
<summary>API definitions and policies supported up to Tyk Gateway v5.7.0 </summary>

Tyk Sync 2.0.1 supports API definitions and policies up to Tyk Gateway v5.7.0. This update ensures that Tyk Sync can manage API definitions and policies compatible with Tyk Gateway v5.7.0.
</details>
</li>
</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Improved Error Handling for Invalid MongoDB Object IDs in Tyk Sync </summary>

Addressed an issue where Tyk Sync did not properly validate MongoDB Object IDs during API synchronization. Previously, invalid IDs would result in silent failures, causing APIs to remain unpublished without error logs, creating confusion for users. Tyk Sync now logs meaningful error messages and exits with an error if invalid IDs are detected. This fix enhances the reliability and transparency of the synchronization process, ensuring consistent behavior with the Tyk Dashboard API.
</details>
</li>
</ul>

---

### 2.0.0 Release Notes

From Tyk Sync v2.0, Tyk Sync will be closed source and we will only support use of Tyk Sync with licensed Tyk Dashboard.

#### Release Date 10 Oct 2024

#### Release Highlights

Tyk Sync 2.0 has been updated to support API configurations from Tyk 5.6.0.

Please refer to the [changelog]({{< ref "#Changelog-v2.0.0">}}) below for detailed explanation.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
##### Deprecation of `--gateway` Flag

As of Tyk Sync v2.0, support for the **Open Source Tyk Gateway** has been removed. Tyk Sync v2.0 is now compatible exclusively with licensed Tyk Dashboard. This change means that Tyk Sync can no longer be used with the Open Source (OSS) version of the Tyk Gateway.

The `--gateway` flag, previously used to sync with the OSS Tyk Gateway, is **deprecated** and will be fully **removed in a future release**. Users should prepare to transition their Tyk Sync workflows to licensed Tyk Dashboard environments to ensure continued functionality.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
##### Future deprecations
As part of our ongoing efforts to streamline and improve Tyk Sync, we plan to deprecate the following options in future releases:

- `--apis` for the `tyk-sync sync` command.
- `--policies` for the `tyk-sync sync` command.

We recommend users update their workflows to use the `publish` and `update` commands for managing individual API and Policy IDs. To continue using the `sync` command, ensure all required resources are listed in the `.tyk.json` index file. This file will serve as the source of truth for API configuration states, and Tyk Sync will create or update all specified resources while removing any others from Tyk Dashboard.

#### Upgrade instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker image v2.0.0](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v2.0.0)
  - ```bash
    docker pull tykio/tyk-sync:v2.0.0
    ```

#### Changelog {#Changelog-v2.0.0}

##### Updated

<ul>
<li>
<details>
<summary>API definitions and policies supported up to Tyk Gateway v5.6.0 </summary>

Tyk Sync 2.0.0 supports API definitions and policies up to Tyk Gateway v5.6.0. This update ensures that Tyk Sync can manage API definitions and policies compatible with Tyk Gateway v5.6.0.
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


## 1.5 Release Notes

### 1.5.1 Release Notes

#### Release date 13 August 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker image v1.5.1](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v1.5.1)
  - ```bash
    docker pull tykio/tyk-sync:v1.5.1
    ```

#### Changelog {#Changelog-v1.5.1}

##### Fixed

<ul>
<li>
<details>
<summary>Fixed problem in synchronizing APIs with duplicate slugs</summary>

In previous versions, the `sync` command in Tyk Sync checked for duplicate slugs among APIs. As slugs are now deprecated and APIs will have identical slugs by default starting from Tyk v5.3, this check became problematic. To resolve this, the checks for duplicate slugs have been removed in this version, ensuring compatibility with both Tyk Cloud and Tyk v5.3+.
</details>
</li>

</ul>

##### Changed

<ul>
<li>
<details>
<summary>API definitions supported up to Tyk Gateway v5.5.0 </summary>

Tyk Sync 1.5.1 supports API definitions up to Tyk Gateway v5.5.0. This update ensures that Tyk Sync can manage API definitions compatible with Tyk Gateway v5.5.0.
</details>
</li>
</ul>

### 1.5.0 Release Notes

#### Release date 4 July 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
##### Removed --allow-unsafe-oas flag

With native support of Tyk OAS APIs in Sync v1.5, we have removed the `--allow-unsafe-oas` flag from all commands as this flag is no longer required. Users can manage OAS APIs with Tyk Gateway and Dashboard (v5.3.2+) without specifying this flag or setting configurations in the Dashboard. The synchronisation of OAS API Definitions with the Dashboard is now safer and more straightforward.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
##### Future deprecations
As part of our ongoing efforts to streamline and improve Tyk Sync, we plan to deprecate the following options in future releases:

- `--apis` for the `tyk-sync sync` command.
- `--policies` for the `tyk-sync sync` command.

We recommend users update their workflows to use the `publish` and `update` commands for managing individual API and Policy IDs. To continue using the `sync` command, ensure all required resources are listed in the `.tyk.json` index file. This file will serve as the source of truth for API configuration states, and Tyk Sync will create or update all specified resources while removing any others from the Gateway or Dashboard.

#### Upgrade instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
##### Full support for OAS APIs and API templates
Tyk Sync 1.5 now fully supports Tyk OpenAPI Specification (OAS) APIs and API Templates. This release is compatible with Tyk Gateway or Dashboard version 5.4.0 and above, enabling seamless management of OAS APIs and API templates, and also supports all Tyk API definitions (Tyk OAS APIs and Tyk Classic APIs) for Tyk Gateway and Tyk Dashboard v5.4.0.

For Tyk Gateway v5.4.1+ make sure to use the latest Tyk Sync available and also check Tyk Gateway release notes in the section "Compatibility Matrix For Tyk Components" for further instructions.

Please refer to the [changelog]({{< ref "#Changelog-v1.5.0">}}) below for detailed explanation.

#### Downloads
- [Docker image v1.5.0](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v1.5.0)
  - ```bash
    docker pull tykio/tyk-sync:v1.5.0
    ```
- [Source code](https://github.com/TykTechnologies/tyk-sync/releases/tag/v1.5.0)

#### Changelog {#Changelog-v1.5.0}

##### Added

<ul>
<li>
<details>
<summary>Support for OAS APIs </summary>

Added native support for OAS APIs. Tyk Sync 1.5 now fully supports OpenAPI Specification (OAS) APIs and API Templates. This release is compatible with Tyk Gateway or Dashboard version 5.3.2 and above, enabling seamless management of OAS APIs and API templates. The `--allow-unsafe-oas` flag is not required anymore for managing OAS APIs.
</details>
</li>

<li>
<details>
<summary>Support for API Templates </summary>

Added support for API templates in `dump`, `sync`, `update`, and `publish` commands. Tyk Sync now supports managing API template resources in Tyk dashboard. Users can use these commands to manage API templates effectively.
</details>
</li>

<li>
<details>
<summary>Support for API Categories of OAS APIs </summary>

Added support for API categories in OAS APIs. Users can now include API Category in the API Definition file. Tyk Sync will update the categories of the API accordingly. It improved organization and categorization of APIs, making management more intuitive.
</details>
</li>
</ul>

##### Updated

<ul>
<li>
<details>
<summary>API definitions supported up to Tyk Gateway v5.4.0 </summary>

Tyk Sync 1.5 supports API definitions up to Tyk Gateway v5.4.0. This update ensures that Tyk Sync can manage API definitions compatible with Tyk Gateway v5.4.0.
</details>
</li>

<li>
<details>
<summary>Removed --allow-unsafe-oas flag </summary>

With native support of Tyk OAS APIs in Sync v1.5, we have removed the `--allow-unsafe-oas` flag from all commands as this flag is no longer required. Users can manage OAS APIs with Tyk Gateway and Dashboard (v5.3.2+) without specifying this flag or setting configurations in the Dashboard. The synchronisation of OAS API Definitions with the Dashboard is now safer and more straightforward.
</details>
</li>
</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Improved CI/CD integration by returning non-zero exit codes on failure</summary>

Previously, users had to parse `stdout` to detect failures, making it difficult to integrate with CI/CD tools. This fix ensures that failure cases return non-zero exit codes, allowing CI/CD pipeline tools to automatically detect and flag errors. This change will streamline CI/CD workflows and improved error detection and handling.
</details>
</li>

<li>
<details>
<summary>Fixed endpoint issue in update command</summary>

Fixed an issue with the `update` command where extra slashes in the endpoint caused PUT requests to be misinterpreted as GET requests. Due to extra slashes at the end of the endpoint, PUT calls were being converted to GET calls, resulting in a 200 OK response without actual updates. This issue occurred when the gateway URL was provided instead of the dashboard URL for `sync` and `update` commands. The fix now ensured accurate updates and improved reliability of the `update` command.
</details>
</li>
</ul>

## 1.4 Release Notes

### 1.4.3 Release Notes

#### Release date 5 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 1.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, **you should skip 1.4.0** and upgrade directly to this release.

#### Release Highlights
This release works with Tyk Dashboard and Tyk Gateway v5.3.0. As such it supports all Tyk API definitions (Tyk OAS APIs and Tyk Classic APIs) for [Tyk Gateway v5.3.0]({{< ref "developer-support/release-notes/gateway#compatibility-matrix-for-tyk-components-14" >}}) and [Tyk Dashboard]({{< ref "developer-support/release-notes/dashboard#compatibility-matrix-for-tyk-components-14" >}})
 
For Tyk Gateway v5.3.1+ make sure to use the latest Tyk Sync available and also check Tyk Gateway release notes in the section "Compatibility Matrix For Tyk Components" for further instructions.

Please refer to the [changelog]({{< ref "#Changelog-v1.4.3">}}) below for detailed explanation.

#### Downloads
- [Docker image v1.4.3](https://hub.docker.com/r/tykio/tyk-sync/tags?page=&page_size=&ordering=-name&name=v1.4.3)
  - ```bash
    docker pull tykio/tyk-sync:v1.4.3
    ```
- [Source code](https://github.com/TykTechnologies/tyk-sync/releases/tag/v1.4.3)

#### Changelog {#Changelog-v1.4.3}

##### Updated

<ul>
<li>
<details>
<summary>API definitions supported up to Tyk Gateway v5.3.0 </summary>

Tyk Sync supports both Tyk OAS APIs and Tyk Classic APIs when working with Tyk Dashboard. However, to use Tyk Sync to migrate Tyk OAS APIs you would need to set a special config field in Tyk Dashboard and an argument for Tyk Sync. This is a temporary measure provided for early adopters and will be **deprecated** later when Tyk Sync is updated in a future release to bring you the full Tyk OAS API experience as soon as possible.

Recommended usage:
Tyk Dashboard setting: [allow-unsafe-oas]({{<ref "tyk-dashboard/configuration#allow_unsafe_oas">}})
Tyk Sync: use the [--allow-unsafe-oas]({{<ref "api-management/automations/sync">}}) when invoking the CLI

####### API Category is not yet supported
API Categories are a new capability with v5.3.0 of Tyk Dashboard. API Categories are currently not supported in Tyk Sync for Tyk OAS APIs. This means that Tyk Sync will not be able to save the category definition set for the Tyk OAS API. Until we update Tyk Sync you would need to manually recreate the categories in the new environment.
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Tyk Sync updated to use [Golang 1.21](https://tip.golang.org/doc/go1.21) </summary>
Tyk Sync is using Golang 1.21 Programming Language starting with the 1.4.3 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. 
</details>
</li>
</ul>

##### Security

The following CVEs have been resolved in this release:

- [CVE-2023-48795](https://nvd.nist.gov/vuln/detail/CVE-2023-48795)
- [CVE-2023-49569](https://nvd.nist.gov/vuln/detail/CVE-2023-49569)
- [GHSA-9763-4f94-gfch](https://github.com/advisories/GHSA-9763-4f94-gfch)

---

### 1.4.2 Release Notes

##### Release date 07 Dec 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 1.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, **you should skip 1.4.0** and upgrade directly to this release.

#### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v1.4.2">}}) below.

#### Downloads
- [Docker image v1.4.2](https://hub.docker.com/layers/tykio/tyk-sync/v1.4.2/images/sha256-3a6473aedeb4963bc19b218b52c4649fffc6ad46113799e9c1055004d5dc754a?context=explore)
  - ```bash
    docker pull tykio/tyk-sync:v1.4.2
    ```
- [Source code](https://github.com/TykTechnologies/tyk-sync/releases/tag/v1.4.2)

#### Changelog {#Changelog-v1.4.2}

##### Updated

<ul>
<li>
<details>
<summary>API definitions supported up to Tyk Gateway v5.2.3 </summary>

Tyk Sync supports Tyk API definitions up to Tyk Gateway v5.2.3. Please use this version with Tyk Gateway v5.2.0+.
</details>
</li>
</ul>



## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

## Earlier Versions Release Notes
Release Notes for Tyk Sync v1.4.1 and earlier can we found in [Tyk Sync GitHub](https://github.com/TykTechnologies/tyk-sync/releases)
