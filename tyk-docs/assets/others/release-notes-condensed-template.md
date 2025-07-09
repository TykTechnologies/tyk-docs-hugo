---
title: Tyk <Dashboard|Gateway|Pump|etc.> <X.Y> Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk <Dashboard/Gateway/Pump> versions within the <X.Y.Z> series."
tags: ["Tyk Dashboard", "Release notes", "changelog", "vX.Y", "X.Y.0", "X.Y", "X.Y.Z"]
---

**This page contains all release notes for version 5.2.X displayed in a reverse chronological order**

## Support Lifetime
<!--
Please add one of the following messagings to the release notes you are writing:

For non-LTS releases:
This release supersedes all previous non-LTS releases, which are no longer supported. The [current LTS release](https://tyk.io/docs/developer-support/release-types/long-term-support/#current-lts-releases-timeline) remains supported alongside this version. For more information about our release types and support policy, please refer to our [release support documentation](https://tyk.io/docs/developer-support/release-types/long-term-support/).

For LTS releases:
This is an **LTS release** and it's supported according to our [Long Term Support policy](https://tyk.io/docs/developer-support/release-types/long-term-support/). To view the currently supported LTS versions and their timelines, see the [current LTS releases](https://tyk.io/docs/developer-support/release-types/long-term-support/#current-lts-releases-timeline). For details explanations related to release types and our support commitments, see [LTS documentation](https://tyk.io/docs/developer-support/release-types/long-term-support/).

-->

---

## X.Y Release Notes

### X.Y.Z Release Notes

#### Release Date DD Mon YYYY <<update>>

#### Release Highlights

<Add Release Summary>

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-vX.Y.Z) below.

#### Breaking Changes
This release has no breaking changes.

#### Dependencies {#dependencies-X.Y.Z}

##### Compatibility Matrix For Tyk Components
| Gateway Version | Recommended Compatibility | Backwards Compatibility |
| --------------- | ------------------------- | ----------------------- |
| 5.3 LTS         | Helm v2.2 - TBP           | Helm vX - vY            |
|                 | MDCB v2.5 - TBP           | MDCB v1.7 - v2.4        |
|                 | Operator v1.8 - TBP       | Operator vX - vY        |
|                 | Sync v2.4.1 - TBP         | Sync vX - vY            |
|                 |                           | EDP vX - vY             |
|                 |                           | Pump vX - vY            |
|                 |                           | TIB vX - vY             |
      
##### 3rd Party Dependencies & Tools {#3rdPartyTools-vX.Y.Z}
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.19, 1.20, 1.21       | 1.19, 1.20, 1.21       | All our binaries| 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 4.4.x, 5.0.x and 6.0.x | 4.4.x, 5.0.x and 6.0.x | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| OpenAPI JSON Schema  | v3.0.0...      | v3.0.0...          | Used by [Tyk OAS API definition](https://swagger.io/specification/)                | [3.0.3](https://spec.openapis.org/oas/v3.0.3)|

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
For users currently on vX.Y.Z, we strongly recommend promptly upgrading to the latest release. 
- If you are working with an older version (lower major), it is advisable to bypass version X.Y.0 and proceed directly to this latest patch release.
- If you are on an older major version (e.g., vX-1.Y.Z), we recommend reading all the release notes between your current version and the one you’re upgrading to

<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-{dashboard|gateway}/vX.Y.Z/images/{sha-image})
- Helm chart - TBP (To Be Published separately after the release) 

#### Changelog {#Changelog-vX.Y.Z}

##### Added

<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
</ul>

  
##### Changed

<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
</ul>
 
##### Fixed

<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.

The line item should follow the below template.
*Fixed an issue where [describe the issue], which caused [describe the impact]. This has been resolved by [describe the fix].*
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to the content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
</ul>

##### Security Fixes
- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)

##### Community Contributions
Special thanks to the following member of the Tyk community for their contribution to this release:

<ul>
<li>
<details>
<summary>Runtime log error incorrectly produced when using Go Plugin Virtual Endpoints</summary>

Fixed a minor issue with Go Plugin virtual endpoints where a runtime log error was produced from a request, even if the response was successful. Thanks to ghub_user_tag_name for highlighting the issue and proposing a fix.
</details>
</li>
</ul>

---

<!--
Repeat the release notes section above for every patch here
-->

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance on the upgrade strategy.

### API Documentation
- [OpenAPI Document]({{< ref "" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/<collection-id>)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

### Miscellaneous (Optional)
