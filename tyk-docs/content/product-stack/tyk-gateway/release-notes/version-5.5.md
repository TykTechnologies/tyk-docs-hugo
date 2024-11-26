---
title: Tyk Gateway 5.5 Release Notes
date: 2024-03-27T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.5.X series."
tags: ["Tyk Gateway", "Release notes", "changelog", "v5.5", "5.5", "5.5.0", "5.5.1", "5.5.2"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.5.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.5.2 Release Notes

### Release Date 03 October 2024

### Release Highlights
This release replaces Tyk Gateway 5.5.1 which was accidentally released as a non-distroless image.


### Breaking Changes

There are no breaking changes in this release.

### Dependencies {#dependencies-5.5.2}

#### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.2 | MDCB v2.7     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

### Upgrade instructions {#upgrade-5.5.2}
If you are upgrading to 5.5.2, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.2)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.2
    ``` 
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "product-stack/tyk-charts/release-notes/version-2.0.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

---

## 5.5.1 Release Notes

### Release Date 26 September 2024

### Release Highlights
This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway configuration options to control path matching strictness.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.5.1) below.

### Breaking Changes

There are no breaking changes in this release.

### Dependencies {#dependencies-5.5.1}

#### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.1 | MDCB v2.7     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

### Upgrade instructions {#upgrade-5.5.1}
If you are upgrading to 5.5.1, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.1
    ``` 
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "product-stack/tyk-charts/release-notes/version-2.0.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.5.1}

#### Added

<ul>
<li>
<details>
<summary>Implemented Gateway configuration options to set URL path matching strictness</summary>

We have introduced two new options in the `http_server_options` [Gateway configuration]({{< ref "tyk-oss-gateway/configuration#http_server_options" >}}) that will enforce prefix and/or suffix matching when Tyk performs checks on whether middleware or other logic should be applied to a request:

- `enable_path_prefix_matching` ensures that the start of the request path must match the path defined in the API definition
- `enable_path_suffix_matching` ensures that the end of the request path must match the path defined in the API definition
- combining `enable_path_prefix_matching` and `enable_path_suffix_matching` will ensure an exact (explicit) match is performed

These configuration options provide control to avoid unintended matching of paths from Tyk's default *wildcard* match. Use of regex special characters when declaring the endpoint path in the API definition will automatically override these settings for that endpoint.

Tyk recommends that exact matching is employed, but both options default to `false` to avoid introducing a breaking change for existing users.

The example Gateway configuration file `tyk.conf.example` has been updated to set the recommended *exact matching* with:

 - `http_server_options.enable_path_prefix_matching = true`
 - `http_server_options.enable_path_suffix_matching = true`
 - `http_server_options.enable_strict_routes = true`
 </details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) in access policies and keys that led to authorization incorrectly being granted to endpoints if an invalid regular expression was configured in the key/policy. Also fixed an issue where path-based parameters were not correctly handled by Path-Based Permissions. Now Tyk's authorization check correctly handles both of these scenarios granting access only to the expected resources.
</details>
</li>
<li>
<details>
<summary>Missing path parameter can direct to the wrong endpoint</summary>

Fixed an issue where a parameterized endpoint URL (e.g. `/user/{id}`) would be invoked if a request is made that omits the parameter. For example, a request to `/user/` will now be interpreted as a request to `/user` and not to `/user/{id}`.
</details>
</li>
</ul>

---

## 5.5.0 Release Notes

### Release Date 12 August 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are thrilled to introduce Tyk Gateway 5.5, bringing advanced rate-limiting capabilities, enhanced certificate authentication, and performance optimizations. For a comprehensive list of changes, please refer to the [changelog]({{< ref "#Changelog-v5.5.0">}}) below.

#### Per Endpoint Rate Limiting

Now configure rate limits at the endpoint level for both [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-oas" >}}) and [Tyk Classic APIs]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-classic" >}}), providing granular protection for upstream services against overloading and abuse.

#### Root CA Support for Client Certificates

Simplify certificate management with support for root Certificate Authority (CA) certificates, enabling clients to authenticate using certificates signed by the [configured root CA]({{< ref "/api-management/authentication-authorization#faq" >}}).

#### Optimised AST Document Handling

Experience improved performance with optimised creation and usage of Abstract Syntax Tree (AST) documents in our GQL library, reducing memory usage and enhancing efficiency.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
Docker images are now based on [distroless](https://github.com/GoogleContainerTools/distroless). No shell is shipped in the image.

### Dependencies {#dependencies-5.5.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.0 | MDCB v2.7     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v1.6 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

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
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.0
    ``` 
- Helm charts
  - [tyk-charts v1.6]({{< ref "/product-stack/tyk-charts/release-notes/version-1.6.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

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
<summary>Added root CA support for client certificate authentication</summary>

We've added support for you to register Certificate Authority (CA) certificates in your API definitions when using static mutual TLS (mTLS). Tyk can now authenticate clients presenting certificates signed by the registered root CA, simplifying certificate management for multiple clients sharing a common CA.
</details>
</li>
<li>
<details>
<summary>Optimised creation and usage of AST documents in GQL library</summary>

Optimised the creation and usage of AST documents in our GQL library to reduce significant memory allocations caused by pre-allocations during initial creation. These optimizations free up resources more efficiently, minimising performance penalties with increased requests to the Gateway.
</details>
</li>
<li>
<details>
<summary>Implemented upstream endpoint rate limits</summary>
 
Introduced new more granular controls for request rate limiting. Rate limits can now be configured at the endpoint level in Tyk OAS and Tyk Classic API definitions.
</details>
</li>
<li>
<details>
<summary>Improved handling of requests to non-existent versions of APIs when using URL path versioning</summary>
 
When using the URL path to indicate the API version (for example `/v1/my-api`) it is common to strip the version identifier (e.g. `/v1`) from the path before proxying the request to the upstream. If the client doesn't provide any version identifier this could lead to an invalid target URL and failed requests, rather than correctly redirecting to the default version. We have introduced an optional configuration `url_versioning_pattern` where you can specify a regex that Tyk will use to identify if the URL contains a version identifier and avoiding the accidental stripping of valid upstream path.
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
<summary>Fixed an issue where transformation middleware could incorrectly be applied to Tyk OAS API endpoints with nested paths</summary>

Fixed an issue when using Tyk OAS APIs where nested API endpoints, such as '/test' and '/test/abc', might incorrectly apply middleware from the parent path to the nested path. The fix ensures that API endpoint definitions are correctly ordered so that the standard behaviour of Tyk is followed, whereby path matching is performed starting from the longest path, preventing middleware misapplication and ensuring both the HTTP method and URL match accurately.
</details>
</li>
<li>
<details>
<summary>Optimised key creation process to avoid unnecessary Redis `DeleteRawKey` commands</summary>

Previously, key creation or reset led to an exponential number of Redis `DeleteRawKey` commands; this was especially problematic for access lists with over 100 entries. The key creation sequence now runs only once, eliminating redundant deletion of non-existent keys in Redis. This optimization significantly reduces deletion events, enhancing performance and stability for larger access lists.
</details>
</li>
<li>
<details>
<summary>Resolved SSE streaming issue</summary>

Addressed a bug that caused Server Side Event (SSE) streaming responses to be considered for caching, which required buffering the response and prevented SSE from being correctly proxied.
</details>
</li>
<li>
<details>
<summary>Fixed analytics latency reporting for MDCB setups</summary>

 Resolved an issue where Host and Latency fields (Total and Upstream) were not correctly reported for Tyk Gateways in MDCB data planes. The fix ensures accurate Host values and Latency measurements are now captured and displayed in the generated traffic logs.
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

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security vulnerabilities:
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
- [Tyk Gateway API]({{<ref "tyk-gateway-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ

Please visit our [Developer Support]({{< ref "/frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
