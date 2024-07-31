---
title: Tyk Sync 1.5 Release Notes
tag: ["Tyk Sync", "Release notes", "v1.5", "1.5.0", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Sync versions within the 1.5.X series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 1.5 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out. 

## 1.5.0 Release Notes

##### Release date 4 July 2024

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

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

## Earlier Versions Release Notes
Release Notes for Tyk Sync v1.4.1 and earlier can we found in [Tyk Sync GitHub](https://github.com/TykTechnologies/tyk-sync/releases)
