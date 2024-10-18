---
title: Tyk Dashboard 5.5 Release Notes
date: 2024-03-27T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.5.X series."
tags: ["Tyk Dashboard", "Release notes", "changelog", "v5.5", "5.5", "5.5.0", "5.5.1", "5.5.2"]
---

**This page contains all release notes for version 5.5.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.5.2 Release Notes

### Release Date 03 October 2024

### Release Highlights

This release replaces Tyk Dashboard 5.5.1 which was accidentally released as a non-distroless image.

### Breaking Changes

There are no breaking changes in this release.

### Dependencies {#dependencies-5.5.2}

#### Compatibility Matrix For Tyk Components

| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.2 | MDCB v2.7     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.2}

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

### Deprecations

There are no deprecations in this release.

### Upgrade instructions {#upgrade-5.5.2}

If you are upgrading to 5.5.2, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.2)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.2
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})

### Changelog {#Changelog-v5.5.2}

No changes in this release.

---

## 5.5.1 Release Notes

### Release Date 26 September 2024

### Release Highlights

This is a version bump to align with Gateway v5.5.1, no changes have been implemented in this release.

### Breaking Changes

There are no breaking changes in this release.

### Dependencies {#dependencies-5.5.1}

#### Compatibility Matrix For Tyk Components

| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.1 | MDCB v2.7     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.1}

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

### Deprecations

There are no deprecations in this release.

### Upgrade instructions {#upgrade-5.5.1}

If you are upgrading to 5.5.1, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.1)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.1
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})

### Changelog {#Changelog-v5.5.1}

No changes in this release.

---

## 5.5.0 Release Notes

### Release Date 12 August 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are excited to announce Tyk Dashboard 5.5, featuring a brand-new dashboard identity, advanced rate-limiting capabilities, and enhanced security options. For a comprehensive list of changes, please refer to the [changelog]({{< ref "#Changelog-v5.5.0">}}) below.

#### New Tyk brand identity

Experience a refreshed and modern look with our updated brand identity. The new design enhances usability and provides a cleaner, more intuitive interface for managing your APIs.

#### Per Endpoint Rate Limiting

Now configure rate limits at the endpoint level for both [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-oas" >}}) and [Tyk Classic APIs]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-classic" >}}), providing granular protection for upstream services against overloading and abuse.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

### Dependencies {#dependencies-5.5.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->
#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.0 | MDCB v2.7     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v1.6 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.0}
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.
<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->
### Upgrade instructions {#upgrade-5.5.0}
If you are upgrading to 5.5.0, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.0
  ```
- Helm charts
  - [tyk-charts v1.6]({{< ref "/product-stack/tyk-charts/release-notes/version-1.6.md" >}})

### Changelog {#Changelog-v5.5.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->
#### Added
<!-- This section should be a bullet point list of new features. Explain:
- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Configure the new endpoint level rate limits in API Designer</summary>

Rate limits can now be configured at the endpoint level in Tyk OAS and Tyk Classic API definitions. Configure these new more granular controls from the API Designer. 
</details>
</li>
<li>
<details>
<summary>Improved handling of requests to non-existent versions of APIs when using URL path versioning</summary>

When configuring API versioning settings for Tyk OAS APIs, you can now set a *Version Identifier Pattern* when using the URL path to indicate the API version (for example `/v1/my-api`). This will be used to avoid accidentally stripping part of the target URL (and failed upstream proxy) if the client doesn't provide any version identifier. If you're using Tyk Classic APIs you can set the `url_versioning_pattern` field in the API definition using the raw API editor.
</details>
</li>
<li>
<details>
<summary>Improved schema editor functionality for GQL APIs</summary>

We've expanded the functionality of the schema editor for GQL APIs. Users can now easily import their schema from a file, export it, or quickly clean the entire editor if a mistake is made.
</details>
</li>
</ul>

#### Changed

<ul>
<li>
<details>
<summary>Updated NPM packages dependencies</summary>

Updated npm package dependencies of Dashboard, to address security vulnerabilities.
</details>
</li>
</ul>

#### Fixed
<!-- This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:
- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Resolved an issue seen when using reponse plugins with Tyk OAS APIs</summary>

Addressed a problem where Response Plugins were not being invoked for Tyk OAS APIs.
</details>
</li>
<li>
<details>
<summary>Save API button now visible for SSO users</summary>

Addressed an issue for SSO users where user permissions were not correctly applied. This led to the Save API button not being visible to all appropriate users in the API Designer.
</details>
</li>
<li>
<details>
<summary>Public playground schema exposure fixed with Introspection disabled</summary>

Resolved an issue where the Public GQL Playground displayed schema information despite introspection being turned off. Now, schema details are hidden unless valid authentication credentials are provided, ensuring a secure and consistent user experience.
</details>
</li>
<li>
 <details>
 <summary>Resolved issue with no analytics data showing on Endpoint Popularity page</summary>

Addressed an issue where the Dashboard displayed a blank pane when accessing the Activity by Endpoint page after upgrading to Tyk 5.3.1.
 </details>
 </li>
</ul>

#### Security Fixes
<!-- This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.
For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:
- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->
<ul>
<li>
<details>
<summary>High priority CVEs fixed</summary>

Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:
- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>
<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

---

<!--
Repeat the release notes section above for every patch here
-->
<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### API Documentation
<!-- Required. Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?				
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
-->
- [OpenAPI Document]({{<ref "tyk-dashboard-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.




