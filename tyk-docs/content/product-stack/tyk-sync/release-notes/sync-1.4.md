---
title: Tyk Sync 1.4 Release Notes
tag: ["Tyk Sync", "Release notes", "v1.4", "1.4.0", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Sync versions within the 1.4.X series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 1.4 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out. 

## 1.4.3 Release Notes

##### Release date 5 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 1.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, **you should skip 1.4.0** and upgrade directly to this release.

#### Release Highlights
This release works with Tyk Dashboard and Tyk Gateway v5.3.0. As such it supports all Tyk API definitions (Tyk OAS APIs and Tyk Classic APIs) for [Tyk Gateway v5.3.0]({{< ref "product-stack/tyk-gateway/release-notes/version-5.3.md#compatibility-matrix-for-tyk-components" >}}) and [Tyk Dashboard]({{< ref "product-stack/tyk-dashboard/release-notes/version-5.3.md#compatibility-matrix-for-tyk-components" >}})
 
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
Tyk Sync: use the [--allow-unsafe-oas]({{<ref "/api-management/automations#synchronize-tyk-environment-with-github-repository">}}) when invoking the CLI

###### API Category is not yet supported
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

## 1.4.2 Release Notes

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
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

## Earlier Versions Release Notes
Release Notes for Tyk Sync v1.4.1 and earlier can we found in [Tyk Sync GitHub](https://github.com/TykTechnologies/tyk-sync/releases)
