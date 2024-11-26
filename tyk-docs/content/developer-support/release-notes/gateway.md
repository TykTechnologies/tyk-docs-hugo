---
title: Tyk Gateway 5.6 Release Notes
date: 2024-10-08T15:51:11Z
description:
  "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.6.X series."
tags: ["Tyk Gateway", "Release notes", "v5.6", "5.6.0", "5.6.1", "5.6", "changelog"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.6.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.6.1 Release Notes

### Release Date 18 October 2024

### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.6.1 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.6.1">}}) below.

### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

### Dependencies {#dependencies-5.6.1}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases             | Backwards Compatibility |
| --------------- | -------------------------------- | ----------------------- |
| 5.6.1           | MDCB v2.7.1                      | MDCB v2.4.2             |
|                 | Operator v1.0.0                  | Operator v0.17          |
|                 | Sync v2.0                        | Sync v1.4.3             |
|                 | Helm Chart v2.1                  | Helm all versions       |
|                 | EDP v1.11                        | EDP all versions        |
|                 | Pump v1.11                       | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1 | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                    |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                         |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.6.1}

If you are upgrading to 5.6.1, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.6.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.6.1
    ```
- Helm charts

  - [tyk-charts v2.1.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.1.md">}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.6.1}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

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
<summary>Resolved gateway panic on reconnecting to MDCB control plane or Tyk Cloud</summary>

In version 5.6.0, Tyk Gateway could encounter a panic when attempting to reconnect to the control plane after it was
restarted. This patch version has resolved this issue, ensuring stable connectivity between the gateway and control
plane following reconnections and reducing the need for manual intervention.

</details>
</li>
</ul>

<!--
#### Security Fixes
This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)


<ul>
<li>
<details>
<summary>High priority CVEs fixed</summary>

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security vulnerabilities:
- [CVE-2024-6104](https://nvd.nist.gov/vuln/detail/CVE-2024-6104)
</details>
</li>
</ul>
-->

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

## 5.6.0 Release Notes

### Release Date 10 October 2024

{{< note success >}} **Important Update**<br> <br> <b>Date</b>: 12 October 2024<br> <b>Topic</b>: Gateway panic when
reconnecting to MDCB control plane or Tyk Cloud<br> <b>Workaround</b>: Restart Gateway<br> <b>Affected Product</b>: Tyk
Gateway as an Edge Gateway<br> <b>Affected versions</b>: v5.6.0, v5.3.6, and v5.0.14<br> <b>Issue Description:</b><br>

<p>We have identified an issue affecting Tyk Gateway deployed as a data plane connecting to the Multi-Data Center Bridge (MDCB) control plane or Tyk Cloud. In the above mentioned Gateway versions a panic may occur when gateway reconnect to the control plane after the control plane is restarted.
<p>Our engineering team is actively working on a fix, and a patch (versions 5.6.1, 5.3.7, and 5.0.15) will be released soon.<br>
<b>Recommendations:</b><br>
<ul>
<li><b>For users on versions 5.5.0, 5.3.5, and 5.0.13</b><br>
We advise you to delay upgrading to the affected versions (5.6.0, 5.3.6, or 5.0.14) until the patch is available.

<li><b>For users who have already upgraded to 5.6.0, 5.3.6, or 5.0.14 and are experiencing a panic in the gateway:</b><br>
Restarting the gateway process will restore it to a healthy state. If you are operating in a *Kubernetes* environment, Tyk Gateway instance should automatically restart, which ultimately resolves the issue.<br>
</ul>
<p>We appreciate your understanding and patience as we work to resolve this. Please stay tuned for the upcoming patch release, which will address this issue.
{{< /note >}}

### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

We are thrilled to announce new updates and improvements in Tyk 5.6.0, bringing more control, flexibility, and
performance. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.6.0">}}) below.

#### Per endpoint Rate Limiting for clients

Building on the [per-endpoint upstream rate
limits]({{< ref "getting-started/key-concepts/rate-limiting#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have
now added [per-endpoint client
rate limits]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}). This new feature allows
for more granular control over client consumption of API resources by associating the rate limit with the access key,
enabling you to manage and optimize API usage more effectively.

#### Gateway logs in JSON format

You can now output Tyk Gateway system logs in JSON format. This allows for easier integration with logging systems and
more structured log data.

#### Go upgrade to 1.22

We’ve upgraded the Tyk Gateway to Golang 1.22, bringing improved performance, better security, and enhanced stability to
the core system.

### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

### Dependencies {#dependencies-5.6.0}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases             | Backwards Compatibility |
| --------------- | -------------------------------- | ----------------------- |
| 5.6.0           | MDCB v2.7.1                      | MDCB v2.4.2             |
|                 | Operator v1.0.0                  | Operator v0.17          |
|                 | Sync v2.0                        | Sync v1.4.3             |
|                 | Helm Chart v2.1                  | Helm all versions       |
|                 | EDP v1.11                        | EDP all versions        |
|                 | Pump v1.11                       | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1 | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                    |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                         |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.6.0}

If you are upgrading to 5.6.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.6.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.6.0
    ```
- Helm charts

  - [tyk-charts v2.1.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.1.md">}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.6.0}

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
<summary>Per endpoint client rate limiting </summary>

Building on the [per-endpoint upstream rate
limits]({{< ref "getting-started/key-concepts/rate-limiting#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have
added [per-endpoint client
rate limits]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}). This new feature
provided users with more precise control over API resource consumption by linking rate limits to access keys, allowing
for better management and optimization of API usage.

</details>
</li>
<li>
<details>
<summary>New option to generate Gateway system logs in JSON format</summary>

The Tyk Gateway now supports logging in JSON format. To enable this feature, set the environment variable
`TYK_GW_LOGFORMAT` to `json`. If a different value is provided, the logs will default to the standard format. This
enhancement allows for improved log processing and integration with various monitoring tools.

</details>
</li>
</ul>

#### Changed

<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Upgrade to Go 1.22 for Tyk Dashboard</summary>

The Tyk Gateway and Tyk Dashboard have been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance,
strengthened security, and access to the latest features available in the new Golang release.

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
<summary>Data plane gateways sometimes didn't synchronise policies and APIs on start-up</summary>

We have enhanced the initial synchronization of Data Plane gateways with the Control Plane to ensure more reliable
loading of policies and APIs on start-up. A synchronous initialization process has been implemented to avoid sync
failures and reduce the risk of service disruptions caused by failed loads. This update ensures smoother and more
consistent syncing of policies and APIs in distributed deployments.

</details>
</li>
<li>
<details>
<summary>Quota wasn't respected under extreme load</summary>

We have fixed an issue where the quota limit was not being consistently respected during request spikes, especially in
deployments with multiple gateways. The problem occurred when multiple gateways cached the current and remaining quota
counters at the end of quota periods. To address this, a distributed lock mechanism has been implemented, ensuring
coordinated quota resets and preventing discrepancies across gateways.

</details>
</li>
</details>
</li>
<li>
<details>
<summary>Rate limits were incorrectly combined when multiple policies were applied to a key</summary>

We have fixed an issue where API-level rate limits set in multiple policies were not correctly applied to the same key.
With this update, when multiple policies configure rate limits for a key, the key will now receive the highest rate
limit from the combined policies, ensuring proper enforcement of limits.

</details>
</li>
<li>
<details>
<summary>Restored key creation performance to Gateway 4.0.12/4.3.3 levels</summary>

We have addressed a performance regression where key creation for policies with a large number of APIs (100+) became
significantly slower in Tyk 4.0.13/5.0.1. The operation, which previously took around 1.5 seconds, has been taking over
20 seconds since versions 4.0.13/5.0.1. This issue has been resolved by optimizing Redis operations during key creation,
restoring the process to the previous duration, even with a large number of APIs in the policy.

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

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security
vulnerabilities:

- [CVE-2024-6104](https://nvd.nist.gov/vuln/detail/CVE-2024-6104)
</details>
</li>
</ul>

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

<!--
Repeat the release notes section above for every patch here
-->

<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->
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
## 5.4.0 Release Notes

### Release Date 2 July 2024

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**

We have fixed a bug in the way that Tyk calculates the [key-level rate limit]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}) when multiple policies are applied to the same key. This fix alters the logic used to calculate the effective rate limit and so may lead to a different rate limit being applied to keys generated from your existing policies. See the [change log](#fixed) for details of the change.

### Dependencies {#dependencies-5.4.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.4.0 | MDCB v2.6     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v1.5.0 | Helm all versions |
| | EDP v1.9 | EDP all versions |
| | Pump v1.10.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

The above table needs reviewing and updating if necessary

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.19 (GQL), 1.21 (GW)  | 1.19 (GQL), 1.21 (GW)  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

**The above table needs reviewing and updating if necessary**

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.4.0}
If you are upgrading to 5.4.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

Add upgrade steps here if necessary.

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We're thrilled to introduce exciting enhancements in Tyk Gateway 5.4, aimed at improving your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the change log below.

#### Enhanced Rate Limiting Strategies

We've introducing a [Rate Limit Smoothing]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) option for the spike arresting Redis Rate Limiter to give the upstream time to scale in response to increased request rates.

#### Fixed MDCB Issue Relating To Replication Of Custom Keys To Dataplanes

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

##### Action Required
Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the changelog for recommended actions.

#### Fixed Window Rate Limiter

Ideal for persistent connections with load-balanced gateways, the [Fixed Window Rate Limiter]({{< ref "/getting-started/key-concepts/rate-limiting#fixed-window-rate-limiter" >}}) algorithm mechanism ensures fair handling of requests by allowing only a predefined number to pass per rate limit window. It uses a simple shared counter in Redis so requests do not need to be evenly balanced across the gateways.

#### Event handling with Tyk OAS

We’ve added support for you to [register webhooks]({{< ref "/basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) with your Tyk OAS APIs so that you can handle events triggered by the Gateway, including circuit breaker and quota expiry. You can also assign webhooks to be fired when using the new [smoothing rate limiter]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) to notify your systems of ongoing traffic spikes.

#### Enhanced Header Handling in GraphQL APIs

Introduced a features object in API definitions for GQL APIs, including the `use_immutable_headers` attribute. This allows advanced header control, enabling users to add new headers, rewrite existing ones, and selectively remove specific headers. Existing APIs will have this attribute set to `false` by default, ensuring no change in behavior. For new APIs, this attribute is true by default, facilitating smoother migration and maintaining backward compatibility.

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.4.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.4.0
    ``` 
- Helm charts
  - [tyk-charts v1.5]({{< ref "/product-stack/tyk-charts/release-notes/version-1.5.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.4.0}
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
<summary>Implemented Fixed Window Rate Limiting for load balancers with keep-alives</summary>

Introduced a [Fixed Window Rate Limiting]({{< ref "/getting-started/key-concepts/rate-limiting#fixed-window-rate-limiter" >}}) mechanism to handle rate limiting for load balancers with keep-alives. This algorithm allows the defined number of requests to pass for every rate limit window and blocks any excess requests. It uses a simple shared counter in Redis to count requests. It is suitable for situations where traffic towards Gateways is not balanced fairly. To enable this rate limiter, set `enable_fixed_window_rate_limiter` in the gateway config or set the environment variable `TYK_GW_ENABLEFIXEDWINDOWRATELIMITER=true`.
</details>
</li>
<li>
<details>
<summary>Introduced Rate Limit Smoothing for scaling</summary>

Implemented [Rate Limit Smoothing]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) as an extension to the existing Redis Rate Limiter to gradually adjust the rate based on smoothing configuration. Two new Gateway events have been created  (`RateLimitSmoothingUp` and `RateLimitSmoothingDown`) which will be triggered as smoothing occurs. These can be used to assist with auto-scaling of upstream capacity during traffic spikes.
</details>
</li>
<li>
<details>
<summary>Introduced ‘use_immutable_headers’ for Advanced Header Control in GraphQL APIs</summary>

We've added the `use_immutable_headers` option to the GraphQL API configuration, offering advanced header transformation capabilities. When enabled, users can add new headers, rewrite existing ones, and selectively remove specific headers, allowing granular control without altering the original request. Existing APIs will default to `false`, maintaining current behavior until ready for upgrade.
</details>
</li>
<li>
<details>
<summary>Enhanced manual schema addition for GQL APIs</summary>

Introduced an option for users to manually provide GQL schemas when creating APIs in Tyk, eliminating the dependency on upstream introspection. This feature enables the creation and editing of GQL APIs in Tyk even when upstream introspection is unavailable, providing flexibility for schema management as upstream configurations evolve over time. 
</details>
</li>
<li>
<details>
<summary>Introduced Tyk v3 GraphQL Engine in Gateway</summary>

The new GraphQL engine, version 3-preview, is now available in Tyk Gateway. It can be used for any GQL API by using the following enum in raw API definition: *"version": "3-preview"*. This experimental version offers optimized GQL operation resolution, faster response times, and a more efficient data loader. It is currently not recommended for production use and will be stabilised in future releases, eventually becoming the default for new GQL APIs in Tyk. 
</details>
</li>
<li>
<details>
<summary>Introduced features Object in API Definition for GQL APIs</summary>

Enhanced request headers handling in API definitions for GQL APIs by introducing a *features* object. Users can now set the `use_immutable_headers` attribute, which defaults to false for existing APIs, ensuring no change in header behavior. For new APIs, this attribute is `true` by default, facilitating smoother migration and maintaining backwards compatibility.
</details>
</li>
<li>
<details>
<summary>New Tyk OAS features</summary>

We’ve added some more features to the Tyk OAS API, moving closer to full parity with Tyk Classic. In this release we’ve added controls that allow you: to enable or prevent generation of traffic logs at the API-level and to enable or prevent the availability of session context to middleware. We’ve also added the facility to register webhooks that will be fired in response to Gateway events. 
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
<summary>Resolved an issue where changes to custom keys were not properly replicated to dataplanes</summary>

Resolved a critical issue affecting MDCB environments, where changes to custom keys made via the dashboard were not properly replicated to dataplanes. This affected both the key data and associated quotas. This issue was present in versions:
- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

**Action Required**

Customers are advised to clear their edge Redis instances of any keys that might have been affected by this bug to ensure data consistency and proper synchronization across their environments. There are several methods available to address this issue:

1. **Specific Key Deletion via API**: To remove individual buggy keys, you can use the following API call:

```bash
curl --location --request DELETE 'http://tyk-gateway:{tyk-hybrid-port}/tyk/keys/my-custom-key' \ --header 'X-Tyk-Authorization: {dashboard-key}'
```

Replace `{tyk-hybrid-port}`, `my-custom-key` and `{dashboard-key}` with your specific configuration details. This method is safe and recommended for targeted removals without affecting other keys.

2. **Bulk Key Deletion Using Redis CLI**: For environments with numerous affected keys, you might consider using the Redis CLI to remove keys en masse:

```bash
redis-cli --scan --pattern 'apikey-*' | xargs -L 1 redis-cli del
redis-cli --scan --pattern 'quota-*' | xargs -L 1 redis-cli del
```

This method can temporarily impact the performance of the Redis server, so it should be executed during a maintenance window or when the impact on production traffic is minimal.

3. **Complete Redis Database Flush**: If feasible, flushing the entire Redis database offers a clean slate:

```bash
redis-cli FLUSHALL ASYNC
```

**Implications**
Regardless of the chosen method, be aware that quotas will be reset and will need to resynchronize across the system. This may temporarily affect reporting and rate limiting capabilities.
</details>
</li>
<li>
<details>
<summary>Resolved service discovery issue when using Consul</summary>

Addressed an issue with service discovery where an IP returned by Consul wasn't parsed correctly on the Gateway side, leading to unexpected errors when proxying requests to the service. Typically, service discovery returns valid domain names, which did not trigger the issue.
</details>
</li>
<li>
<details>
<summary>Corrected naming for semantic conventions attributes in GQL Spans</summary>

Fixed an issue where GQL Open Telemetry semantic conventions attribute names that lacked the 'graphql' prefix, deviating from the community standard. All attributes now have the correct prefix.
</details>
</li>
<li>
<details>
<summary>Fixed missing GraphQL OTel attributes in spans on request validation failure</summary>

Corrected an issue where GraphQL OTel attributes were missing from spans when request validation failed in cases where `detailed_tracing` was set to `false`. Traces now include GraphQL attributes (operation name, type, and document), improving debugging for users.
</details>
</li>
<li>
<details>
<summary>Resolved Gateway panic with Persist GraphQL Middleware</summary>

Fixed a gateway panic issue observed by users when using the *Persist GQL* middleware without defined arguments. The gateway will no longer throw panics in these cases.
</details>
</li>
<li>
<details>
<summary>Resolved issue with GraphQL APIs handling OPTIONS requests</summary>

Fixed an issue with GraphQL API's Cross-Origin Resource Sharing (CORS) configuration, which previously caused the API to fail in respecting CORS settings. This resulted in an inability to proxy requests to upstream servers and handle OPTIONS/CORS requests correctly. With this fix, users can now seamlessly make requests, including OPTIONS method requests, without encountering the previously reported error.
</details>
</li>
<li>
<details>
<summary>Resolved conflict with multiple APIs sharing listen path on different domains</summary>

Fixed an issue where the Gateway did not respect API domain settings when there was another API with the same listen path but no domain. This could lead to the custom domain API not functioning correctly, depending on the order in which APIs were loaded. APIs with custom domains are now prioritised before those without custom domains to ensure that the custom domain is not ignored.
</details>
</li>
<li>
<details>
<summary>Resolved nested field mapping issue in Universal Data Graph</summary>

Addressed a problem with nested field mapping in UDG for GraphQL (GQL) operations. Previously, querying a single nested field caused an error, while including another *normal* field from the same level allowed the query to succeed. This issue has been fixed to ensure consistent behavior regardless of the query composition.
</details>
</li>
<li>
<details>
<summary>Fixed an error in the calculation of effective rate limit from multiple policies</summary>

Fixed a long-standing bug in the algorithm used to determine the effective rate limit when multiple policies are applied to a key. If more than one policy is applied to a key then Tyk will apply the highest request rate permitted by any of the policies that defines a rate limit.

Rate limits in Tyk are defined using two elements: `rate`, which is the number of requests and `per`, which is the period over which those requests can be sent. So, if `rate` is 90 and `per` is 30 seconds for a key, Tyk will permit a maximum of 90 requests to be made using the key in a 30 second period, giving an effective maximum of 180 requests per minute (or 3 rps).

Previously, Tyk would take the highest `rate` and the highest `per` from the policies applied to a key when determining the effective rate limit. So, if policy A had `rate` set to 90 and `per` set to 30 seconds (3rps) while policy B had `rate` set to 100 and `per` set to 10 seconds (10rps) and both were applied to a key, the rate limit configured in the key would be: `rate = 100` and `per = 30` giving a rate of 3.33rps.

With the fix applied in Tyk 5.4.0, the Gateway will now apply the highest effective rate to the key - so in this example, the key would take the rate limit from policy B: `rate = 100` and `per = 10` (10rps).

Note that this corrected logic is applied when access keys are presented in API requests. If you are applying multiple policies to keys, there may be a change in the effective rate limit when using Tyk 5.4.0 compared with pre-5.4.0 versions.
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
## 5.3.8 Release Notes

### Release Date 07 November 2024

### Release Highlights

This release focuses mainly on bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.8">}}) below.

### Breaking Changes

This release has no breaking changes.

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.8           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      |  1.22 (GW)            |  1.22 (GW)            | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

This is an advanced notice that the dedicated External OAuth, OpenID Connect (OIDC) authentication options, and SQLite support will be deprecated starting in version 5.7.0. We recommend that users of the [External OAuth]({{< ref "/api-management/authentication-authorization#integrate-external-oauth-middleware" >}}) and [OpenID Connect]({{< ref "api-management/authentication-authorization#use-openid-connect" >}}) methods migrate to Tyk's dedicated [JWT Auth]({{< ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}}) method. Please review your API configurations, as the Gateway logs will provide notifications for any APIs utilizing these methods.


### Upgrade Instructions

If you are upgrading to 5.3.8, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.8)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.8
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.8}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

#### Added
<ul>
<li>
<details>
<summary>Deprecation notice of External OAuth and OpenID Connect options</summary>
A deprecation notice for External OAuth and OpenID Connect (OIDC) authentication mechanisms has been implemented in the Gateway logs starting from version 5.3.8. This provides advanced notification to users regarding any APIs configured with these authentication methods in preparation for future upgrades where these middleware options may be removed in version 5.7.0.
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Memory consumption reduced in Gateway for large payloads</summary>

This update fixes a bug that caused increased memory usage when proxying large response payloads that was introduced in version 5.3.1, restoring memory requirements to the levels seen in version 5.0.6. Users experiencing out-of-memory errors with 1GB+ file downloads will notice improved performance and reduced latency.
</details>
</li>
<li>
<details>
<summary>Path-based permissions in combined policies not preserved</summary>

We resolved an issue that caused path-based permissions in policies to be lost when policies were combined, potentially omitting URL values and restricting access based on the merge order. It ensures that all applicable policies merge their allowed URL access rights, regardless of the order in which they are applied.
</details>
</li>
<li>
<details>
<summary>Enhanced flexibility in Tyk OAS schema validation</summary>

A backwards compatibility issue in the way that the Gateway handles Tyk OAS API definitions has been addressed by reducing the strictness of validation against the expected schema. Since Tyk version 5.3, the Gateway has enforced strict validation, potentially causing problems for users downgrading from newer versions. With this change, Tyk customers can move between versions seamlessly, ensuring their APIs remain functional and avoiding system performance issues.
</details>
</li>
<li>
<details>
<summary>Fix for API key loss on worker Gateways due to keyspace sync interruption</summary>

This update resolves an issue where API keys could be lost if the [keyspace synchronization]({{<ref "product-stack/tyk-enterprise-mdcb/advanced-configurations/synchroniser">}}) between control and data planes was interrupted. The solution now enforces a resynchronization whenever a connection is re-established between MDCB and the data plane, ensuring key data integrity and seamless API access.
</details>
</li>
</ul>

---

## 5.3.7 Release Notes

### Release Date 22 October 2024

### Release Highlights

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.3.7 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.7">}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.7 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.7           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                   |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.7)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.7
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.7}

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
 <summary>Resolved gateway panic on reconnecting to MDCB control plane or Tyk Cloud</summary>
In version 5.3.6, Tyk Gateway could encounter a panic when attempting to reconnect to the control plane after it was restarted. This patch version has resolved this issue, ensuring stable connectivity between the gateway and control plane following reconnections and reducing the need for manual intervention.
 </details>
 </li>
 </ul>

<!--
#### Security Fixes
This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->

---

## 5.3.6 Release Notes

### Release Date 04 October 2024

{{< note success >}} **Important Update**<br> <br> <b>Date</b>: 12 October 2024<br> <b>Topic</b>: Gateway panic when
reconnecting to MDCB control plane or Tyk Cloud<br> <b>Workaround</b>: Restart Gateway<br> <b>Affected Product</b>: Tyk
Gateway as an Edge Gateway<br> <b>Affected versions</b>: v5.6.0, v5.3.6, and v5.0.14<br> <b>Issue Description:</b><br>

<p>We have identified an issue affecting Tyk Gateway deployed as a data plane connecting to the Multi-Data Center Bridge (MDCB) control plane or Tyk Cloud. In the above mentioned Gateway versions a panic may occur when gateway reconnect to the control plane after the control plane is restarted.
<p>Our engineering team is actively working on a fix, and a patch (versions 5.6.1, 5.3.7, and 5.0.15) will be released soon.<br>
<b>Recommendations:</b><br>
<ul>
<li><b>For users on versions 5.5.0, 5.3.5, and 5.0.13</b><br>
We advise you to delay upgrading to the affected versions (5.6.0, 5.3.6, or 5.0.14) until the patch is available.

<li><b>For users who have already upgraded to 5.6.0, 5.3.6, or 5.0.14 and are experiencing a panic in the gateway:</b><br>
Restarting the gateway process will restore it to a healthy state. If you are operating in a *Kubernetes* environment, Tyk Gateway instance should automatically restart, which ultimately resolves the issue.<br>
</ul>
<p>We appreciate your understanding and patience as we work to resolve this. Please stay tuned for the upcoming patch release, which will address this issue.
{{< /note >}}

### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.6">}}) below.

### Breaking Changes

Docker images are now based on [distroless](https://github.com/GoogleContainerTools/distroless). No shell is shipped in
the image.

If moving from an version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.6 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.6           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                   |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.6)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.6
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.6}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

#### Changed

<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Upgrade to Go 1.22 for Tyk Gateway</summary>

The Tyk Gateway has been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance, strengthened security,
and access to the latest features available in the new Golang release.

</details>
</li>

<li>
<details>
<summary>Introducing Distroless Containers for Tyk Gateway (2024 LTS)</summary>

In this release, we've enhanced the security of the Tyk Gateway image by changing the build process to support
[distroless](https://github.com/GoogleContainerTools/distroless) containers. This significant update addresses critical
CVEs associated with Debian, ensuring a more secure and minimal runtime environment. Distroless containers reduce the
attack surface by eliminating unnecessary packages, which bolsters the security of your deployments.

</details>
</li>

</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Custom Response Plugins not working for Tyk OAS APIs</summary>

We have resolved an issue where custom [response plugins]({{< ref "plugins/plugin-types/response-plugins" >}}) were not being
triggered for Tyk OAS APIs. This fix ensures that all [supported]({{< ref "getting-started/using-oas-definitions/oas-reference" >}})
custom plugins are invoked as expected when using Tyk OAS APIs.

</details>
</li>

<li>
<details>
<summary>Data plane gateways sometimes didn't synchronise policies and APIs on start-up</summary>

We have enhanced the initial synchronization of Data Plane gateways with the Control Plane to ensure more reliable
loading of policies and APIs on start-up. A synchronous initialization process has been implemented to avoid sync
failures and reduce the risk of service disruptions caused by failed loads. This update ensures smoother and more
consistent syncing of policies and APIs in distributed deployments.

</details>
</li>

<li>
<details>
<summary>Quota wasn't respected under extreme load</summary>

We have fixed an issue where the quota limit was not being consistently respected during request spikes, especially in
deployments with multiple gateways. The problem occurred when multiple gateways cached the current and remaining quota
counters at the end of quota periods. To address this, a distributed lock mechanism has been implemented, ensuring
coordinated quota resets and preventing discrepancies across gateways.

</details>
</li>

<li>
<details>
<summary>Restored Key Creation Speed in Gateway 4.0.13 and Later</summary>

We have addressed a performance regression identified in Tyk Gateway versions 4.0.13 and later, where key creation for
policies with a large number of APIs (100+) became significantly slower. The operation, which previously took around 1.5
seconds in versions 4.0.0 to 4.0.12, was taking over 20 seconds in versions 4.0.13 and beyond. This issue has been
resolved by optimizing Redis operations during key creation, restoring the process to its expected speed of
approximately 1.5 seconds, even with a large number of APIs in the policy.

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

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security
vulnerabilities:

- [CVE-2024-6104](https://nvd.nist.gov/vuln/detail/CVE-2024-6104)
</details>
</li>
</ul>

---

## 5.3.5 Release Notes

### Release Date 26 September 2024

### Release Highlights

This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway
configuration options to control path matching strictness. For a comprehensive list of changes, please refer to the
detailed [changelog]({{< ref "#Changelog-v5.3.5">}}) below.

### Breaking Changes

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.5 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.5           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.5)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.5
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.5}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

#### Added

<ul>
<li>
<details>
<summary>Implemented Gateway configuration options to set URL path matching strictness</summary>

We have introduced two new options in the `http_server_options` [Gateway
configuration]({{< ref "tyk-oss-gateway/configuration#http_server_options" >}}) that will enforce prefix and/or suffix matching
when Tyk performs checks on whether middleware or other logic should be applied to a request:

- `enable_path_prefix_matching` ensures that the start of the request path must match the path defined in the API
  definition
- `enable_path_suffix_matching` ensures that the end of the request path must match the path defined in the API
  definition
- combining `enable_path_prefix_matching` and `enable_path_suffix_matching` will ensure an exact (explicit) match is
  performed

These configuration options provide control to avoid unintended matching of paths from Tyk's default _wildcard_ match.
Use of regex special characters when declaring the endpoint path in the API definition will automatically override these
settings for that endpoint. Tyk recommends that exact matching is employed, but both options default to `false` to avoid
introducing a breaking change for existing users.

The example Gateway configuration file `tyk.conf.example` has been updated to set the recommended exact matching with:

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

Fixed an issue when using granular [Path-Based
Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) in access policies and keys that led to authorization
incorrectly being granted to endpoints if an invalid regular expression was configured in the key/policy. Also fixed an issue
where path-based parameters were not correctly handled by Path-Based Permissions. Now Tyk's authorization check correctly
handles both of these scenarios granting access only to the expected resources.

</details>
</li>
<li>
<details>
<summary>Missing path parameter could direct to the wrong endpoint</summary>

Fixed an issue where a parameterized endpoint URL (e.g. `/user/{id}`) would be invoked if a request is made that omits
the parameter. For example, a request to `/user/` will now be interpreted as a request to `/user` and not to
`/user/{id}`.

</details>
</li>
</ul>

---

## 5.3.4 Release Notes

### Release Date August 26th 2024

### Release Highlights

Gateway 5.3.4 was version bumped only, to align with Dashboard 5.3.4. Subsequently, no changes were encountered in
release 5.3.4. For further information please see the release notes for Dashboard
[v5.3.4]({{< ref "product-stack/tyk-dashboard/release-notes/version-5.3.md" >}})

### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.4 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.4           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.4)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.4
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "product-stack/tyk-charts/release-notes/version-1.4.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.4}

Since this release was version bumped only to align with Dashboard v5.3.4, no changes were encountered in this release.

---

## 5.3.3 Release Notes

### Release Date August 2nd 2024

### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.3 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Release Highlights

#### Bug Fixes

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.3">}}) below.

#### FIPS Compliance

Tyk Gateway now offers [FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) compliance. For further
details please consult [Tyk API Management
FIPS support]({{< ref "developer-support/special-releases-and-features/fips-release" >}}).

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.3           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.3)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.3
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "product-stack/tyk-charts/release-notes/version-1.4.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.3}

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
<summary>Added FIPS compliance</summary>

Added [FIPS compliance]({{< ref "developer-support/special-releases-and-features/fips-release" >}}) for Tyk Gateway.

</details>
</li>

<li>
<details>
<summary>Corrected ordering of Tyk OAS API paths to prevent middleware misapplication</summary>

Fixed an issue where nested API endpoints, such as '/test' and '/test/abc', might incorrectly apply middleware from the
parent path to the nested path. The fix ensures that API endpoint definitions are correctly ordered, preventing this
middleware misapplication and ensuring both the HTTP method and URL match accurately.

</details>
</li>
</ul>

---

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
 <summary>Optimised key creation to reduce redundant Redis commands</summary>

Addressed an issue where creating or resetting a key caused an exponential number of Redis DeleteRawKey commands.
Previously, the key creation sequence repeated for every API in the access list, leading to excessive deletion events,
especially problematic for access lists with over 100 entries. Now, the key creation sequence executes only once, and
redundant deletion of non-existent keys in Redis has been eliminated, significantly improving performance and stability
for larger access lists.

</details>
</li>
<li>
<details>
<summary>Resolved SSE streaming issue</summary>

Fixed a bug that caused Server Side Event (SSE) streaming responses to be considered for caching, which required
buffering the response and prevented SSE from being correctly proxied.

</details>
</li>
<li>
 <details>
 <summary>Fixed Analytics Latency Reporting for MDCB Setups</summary>

Resolved an issue where Host and Latency fields (Total and Upstream) were not correctly reported for edge gateways in
MDCB setups. The fix ensures accurate Host values and Latency measurements are now captured and displayed in analytics
data.

</details>
</li>
</ul>

---

## 5.3.2 Release Notes

### Release Date 5th June 2024

### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.2 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.2">}}) below.

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.2           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.2)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.2
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "product-stack/tyk-charts/release-notes/version-1.4.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.2}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

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
 <summary>Remove sensitive information leaked from OpenTelemetry traces</summary>

In Gateway version 5.2+ and 5.3+, we discovered a bug within the OpenTelemetry tracing feature that inadvertently
transmits sensitive information. Specifically, `tyk.api.apikey` and `tyk.api.oauthid` attributes were exposing API keys.
We have fixed the issue to ensure that only the hashed version of the API key is transmitted in traces.

 </details>
</li>
<li>
<details>
<summary>APIs with common listen paths but different custom domains</summary>

Addressed an issue where an API with a custom domain might not be invoked if another API with the same listen path but
no custom domain was also deployed on the Gateway. Now APIs with custom domain names are loaded first, so requests will
be checked against these first before falling back to APIs without custom domains.

</details>
</li>
<li>
<details>
<summary>Gateway service discovery issue with consul</summary>

Addressed an issue in service discovery where an IP:port returned by Consul wasn't parsed correctly on the Gateway side,
leading to errors when proxying requests to the service. The issue primarily occurred with IP:port responses, while
valid domain names were unaffected.

</details>
</li>
<li>
<details>
<summary>Resolved Universal Data Graph Nested Field Mapping Issue</summary>

Fixed an issue with nested field mapping in UDG when used with GraphQL (GQL) operations for a field's data source.
Previously, querying only the mentioned field resulted in an error, but querying alongside another 'normal' field from
the same level worked without issue.

</details>
</li>
<li>
<details>
<summary>Added control over access to context variables from middleware when using Tyk OAS APIs</summary>

Addressed a potential issue when working with Tyk OAS APIs where request context variables are automatically made
available to relevant Tyk and custom middleware. We have introduced a control in the Tyk OAS API definition to disable
this access if required.

</details>
</li>
</ul>

---

## 5.3.1 Release Notes

### Release Date 24 April 2024

### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

### Deprecations

There are no deprecations in this release.

### Upgrade Instructions

When upgrading to 5.3.1 please follow the [detailed upgrade instructions](#upgrading-tyk).

### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.1">}}) below.

### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.1           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.1
    ```
- Helm charts
  - [tyk-charts v1.3]({{< ref "product-stack/tyk-charts/release-notes/version-1.3.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.1}

#### Fixed

<ul>
<li>
<details>
<summary>Improved security: don't load APIs into Gateway if custom plugin bundle fails to load</summary>

Issues were addressed where Tyk failed to properly reject custom plugin bundles with signature verification failures,
allowing APIs to load without necessary plugins, potentially exposing upstream services. With the fix, if the plugin
bundle fails to load (for example, due to failed signature verification) the API will not be loaded and an error will be
logged in the Gateway.

</details>
</li>
<li>
<details>
<summary>Stability: fixed a Gateway panic that could occur when using custom JavaScript plugins with the Ignore Authentication middleware</summary>

Fixed a panic scenario that occurred when a custom JavaScript plugin that requests access to the session metadata
(`require_session:true`) is assigned to the same endpoint as the Ignore Authentication middleware. While the custom
plugin expects access to a valid session, the configuration flag doesn't guarantee its presence, only that it's passed
if available. As such, the custom plugin should be coded to verify that the session metadata is present before
attempting to use it.

</details>
</li>
<li>
<details>
<summary>Stability: Gateway could crash when custom Python plugins attempted to access storage</summary>

Fixed a bug where the Gateway could crash when using custom Python plugins that access the Redis storage. The Tyk Python
API methods `store_data` and `get_data` could fail due to connection issues with the Redis. With this fix, the Redis
connection will be created if required, avoiding the crash.

</details>
</li>
<li>
<details>
<summary>Stability: Gateway panics when arguments are missing in persist GraphQL endpoints</summary>

In some instances users were noticing gateway panics when using the **Persist GQL** middleware without arguments
defined. This issue has been fixed and the gateway will not throw panics in these cases anymore.

</details>
</li>
<li>
<details>
<summary>Missing GraphQL OTel attributes in spans when requests fail validation</summary>

In cases where `detailed_tracing` was set to `false` and the client was sending a malformed request to a GraphQL API,
the traces were missing GraphQL attributes (operation name, type and document). This has been corrected and debugging
GraphQL with OTel will be easier for users.

</details>
</li>
<li>
<details>
<summary>Incorrect naming for semantic conventions attributes in GQL spans</summary>

GQL Open Telemetry semantic conventions attribute names were missing `graphql` prefix and therefore were not in line
with the community standard. This has been fixed and all attributes have the correct prefix.

</details>
</li>
<li>
<details>
<summary>URL Rewrite middleware did not always correctly observe quotas for requests using keys created from policies</summary>

Fixed two bugs in the handling of usage quotas by the URL rewrite middleware when it was configured to rewrite to itself
(e.g. to `tyk://self`). Quota limits were not observed and the quota related response headers always contained `0`.

</details>
</li>
<li>
<details>
<summary>Tyk Dashboard License Statistics page could display incorrect number of data plane gateways</summary>

Resolved an issue in distributed deployments where the MDCB data plane gateway counter was inaccurately incremented when
a Gateway was stopped and restarted.

</details>
</li>
<li>
<details>
<summary>Unable to clear the API cache in distributed data plane Gateways from the control plane Dashboard</summary>

Addressed a bug where clearing the API cache from the Tyk Dashboard failed to invalidate the cache in distributed data
plane gateways. This fix requires MDCB 2.5.1.

</details>
</li>
<li>
<details>
<summary>Unable to load custom Go plugins compiled in RHEL 8</summary>

Fixed a bug where custom Go plugins compiled in RHEL8 environments were unable to load into Tyk Gateway due to a
discrepancy in base images between the Gateway and Plugin Compiler environments. This fix aligns the plugin compiler
base image with the gateway build environment, enabling seamless plugin functionality on RHEL8 environments.

</details>
</li>
<li>
<details>
<summary>Removed unused packages from plugin compiler image</summary>

Removed several unused packages from the plugin compiler image. The packages include: docker, buildkit, ruc, sqlite,
curl, wget, and other build tooling. The removal was done in order to address invalid CVE reporting, none of the removed
dependencies are used to provide plugin compiler functionality.

</details>
</li>
</ul>

---

## 5.3.0 Release Notes

### Release Date 5 April 2024

### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

**Attention: Please read this section carefully**

#### Tyk OAS APIs Compatibility Caveats - Tyk OSS {#TykOAS-v5.3.0}

This upgrade transitions Tyk OAS APIs out of [Early Access]({{< ref "developer-support/special-releases-and-features/early-access-features" >}}).

For licensed deployments (Tyk Cloud, Self Managed including MDCB), please refer to the [release notes of Tyk Dashboard 5.3.0]({{<ref "product-stack/tyk-dashboard/release-notes/version-5.3.md">}}).

- **Out of Early Access**
  - This means that from now on, all Tyk OAS APIs will be backwards compatible and in case of a downgrade from v5.3.X to
    v5.3.0, the Tyk OAS API definitions will always work.
- **Not Backwards Compatible**
  - Tyk OAS APIs in Tyk Gateway v5.3.0 are not [backwards compatible](https://tinyurl.com/3xy966xn). This means that the
    new Tyk OAS API format created by Tyk Gateway v5.3.X does not work with older versions of Tyk Gateway, i.e. you
    cannot export these API definitions from a v5.3.X Tyk Gateway and import them to an earlier version.
  - The upgrade is **not reversible**, i.e. you cannot use version 5.3.X Tyk OAS API definitions with an older version
    of Tyk Dashboard.
  - This means that if you wish to downgrade or revert to your previous version of Tyk, you will need to restore these
    API definitions from a backup. Please go to the [backup]({{< ref "#upgrade-instructions" >}}) section for detailed
    instructions on backup before upgrading to v5.3.0.
  - If you are not using Tyk OAS APIs, Tyk will maintain backward compatibility standards.
- **Not Forward Compatible**
  - Tyk OAS API Definitions prior to v5.3.0 are not [forward compatible](https://tinyurl.com/t3zz88ep) with Tyk Gateway
    v5.3.X.
  - This means that any Tyk OAS APIs created in any previous release (4.1.0-5.2.x) cannot work with the new Tyk Gateway
    v5.3.X without being migrated to its [latest format]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}).
- **After upgrade (the good news)**
  - Tyk OAS API definitions that are part of the file system **are not automatically converted** to the [new
    format]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}). Subsequently, users will have to manually update their
    OAS API Definitions to the new format.
  - If users upgrade to 5.3.0, create new Tyk OAS APIs and then decide to rollback then the upgrade is non-reversible.
    Reverting to your previous version requires restoring from a backup.

**Important:** Please go to the [backup]({{< ref "#upgrade-instructions" >}}) section for detailed instructions on
backup before upgrading to v5.3.0

#### Python plugin support

Starting from Tyk Gateway version v5.3.0, Python is no longer bundled with the official Tyk Gateway Docker image to
reduce exposure to security vulnerabilities in the Python libraries.

Whilst the Gateway still supports Python plugins, you must [extend
the image]({{< ref "plugins/supported-languages/rich-plugins/python/python#install-the-python-development-packages" >}})
to add the language support.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc. -->
<!-- #### Planned Breaking Changes -->

### Dependencies {#dependencies-5.3.0}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.0           | MDCB v2.5                                                          | MDCB v2.4.2             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

#### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

In 5.3.0, we have simplified the configuration of response transform middleware. We encourage users to embrace the
`global_headers` mechanism as the `response_processors.header_injector` is now an optional setting and will be removed
in a future release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.3.0}

If you are upgrading to 5.3.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

**The following steps are essential to follow before upgrading** Tyk Cloud (including Hybrid Gateways) and Self Managed
users - Please refer to the [release notes of Tyk Dashboard 5.3.0]({{<ref "product-stack/tyk-dashboard/release-notes/version-5.3.md">}}).

For OSS deployments -

1. Backup Your environment using the [usual guidance]({{<ref "upgrading-tyk">}}) documented with every release (this includes
   backup config file and database).
2. Backup all your API definitions (Tyk OAS API and Classic Definitions) by saving your API and policy files or by
   exporting them using the `GET /tyk/apis` and `Get /tyk/policies`
3. Performing the upgrade - follow the instructions in the [upgrade
   guide]({{<ref "upgrading-tyk">}}) when upgrading Tyk.

### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

We’re thrilled to announce the release of 5.3.0, an update packed with exciting features and significant fixes to
elevate your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed
[changelog](#Changelog-v5.3.0) below.

#### Tyk OAS Feature Maturity

Tyk OAS is now out of [Early
Access]({{< ref "developer-support/special-releases-and-features/early-access-features" >}}) as we have reached feature maturity.
You are now able to make use of the majority of Tyk Gateway's features from your Tyk OAS APIs, so they are a credible alternative
to the legacy Tyk Classic APIs.

From Tyk 5.3.0 we support the following features when using Tyk OAS APIs with Tyk Gateway:

- Security

  - All Tyk-supported client-gateway authentication methods including custom auth plugins
  - Automatic configuration of authentication from the OpenAPI description
  - Gateway-upstream mTLS
  - CORS

- API-level (global) middleware including:

  - Response caching
  - Custom plugins for PreAuth, Auth, PostAuth, Post and Response hooks
  - API-level rate limits
  - Request transformation - headers
  - Response transformation - headers
  - Service discovery
  - Internal API

- Endpoint-level (per-path) middleware including:

  - Request validation - headers and body (automatically configurable from the OpenAPI description)
  - Request transformation - method, headers and body
  - Response transformation - headers and body
  - URL rewrite and internal endpoints
  - Mock responses (automatically configurable from the OpenAPI description)
  - Response caching
  - Custom Go Post-Plugin
  - Request size limit
  - Virtual endpoint
  - Allow and block listing
  - Do-not-track
  - Circuit breakers
  - Enforced timeouts
  - Ignore authentication

- Observability

  - Open Telemetry tracing
  - Detailed log recording (include payload in the logs)
  - Do-not-track endpoint

- Governance
  - API Versioning

#### Enhanced KV storage of API Definition Fields

Tyk is able to store configuration data from the API definition in KV systems, such as Vault and Consul, and then
reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway. Previously this was
limited to the Target URL and Listen Path but from 5.3.0 you are able to store any `string` type field from your API
definition, unlocking the ability to store sensitive information in a centralised location. For full details check out
the [documentation]({{< ref "tyk-configuration-reference/kv-store" >}}) of this powerful feature.

#### Redis v7.x Compatibility

We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible
with Redis v7.x.

#### Gateway and Component Upgrades

We've raised the bar with significant upgrades to our Gateway and components. Leveraging the power and security of Go
1.21, upgrading Sarama to version 1.41.0 and enhancing the GQL engine with Go version 1.19, we ensure improved
functionality and performance to support your evolving needs seamlessly.

### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.0
    ```
- Helm charts
  - [tyk-charts v1.3]({{< ref "product-stack/tyk-charts/release-notes/version-1.3.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.3.0}

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
<summary>Additional features now supported when working with Tyk OAS APIs</summary>

The following features have been added in 5.3.0 to bring Tyk OAS to feature maturity:

- Detailed log recording (include payload in the logs)
- Enable Open Telemetry tracing
- Context variables available to middleware chain
- API-level header transforms (request and response)
- Endpoint-level cache
- Circuit breakers
- Track endpoint logs for inclusion in Dashboard aggregated data
- Do-not-track endpoint
- Enforced upstream timeouts
- Configure endpoint as Internal, not available externally
- URL rewrite
- Per-endpoint request size limit
- Request transformation - method, header
- Response transformation - header
- Custom domain certificates

</details>
</li>
<li>
<details>
<summary>Enhanced KV storage for API Definition fields</summary>

We have implemented support for all `string` type fields in the Tyk OAS and Tyk Classic API Definitions to be stored in
separate KV storage, including Hashicorp Consul and Vault.

</details>
</li>
<li>
<details>
<summary>Support for Redis v7.0.x</summary>

Tyk 5.3 refactors Redis connection logic by using
[storage v1.2.2](https://github.com/TykTechnologies/storage/releases/tag/v1.2.2), which integrates with
[go-redis](https://github.com/redis/go-redis) v9. Subsequently, Tyk 5.3 supports Redis v7.0.x.

</details>
</li>
<li>
<details>
<summary>Clearer error messages from GQL engine for invalid variables (JSON Schema)</summary>

Some of the error messages generated by the GQL engine were unclear for users, especially relating to variable
validation. The errors have been changed and are now much more clearer and helpful in cases where engine processing
fails.

</details>
</li>
<li>
<details>
<summary>Upgraded GQL Engine's Go version to 1.19</summary>

Upgraded Go version for GraphQL engine to [1.19](https://go.dev/doc/go1.19).

</details>
</li>
<li>
<details>
<summary>Enhanced semantic conventions for GraphQL spans in Gateway</summary>

We've added OpenTelemetry semantic conventions for GraphQL spans. Spans will now incorporate `<operation.type>`,
`<operation.name>` and `<document>` tags.

</details>
</li>
<li>
<details>
<summary>Added support for detailed_tracing to be configured via GQL API definitions</summary>

GraphQL APIs can now use the `detailed_tracing` setting in an API definition. With that property set to `true` any call
to a GraphQL API will create a span for each middleware involved in request processing. While it is set to `false`, only
two spans encapsulating the entire request lifecycle will be generated. This setting helps to reduce the size of traces,
which can get large for GraphQL APIs. Furthermore, this gives users an option to customize the level of tracing detail
to suit their monitoring needs.

</details>
</li>
<li>
<details>
<summary>Enhanced OpenTelemetry trace generation for UDG with mixed data sources</summary>

This release introduces an enhanced trace generation system for Universal Data Graph (UDG). It consolidates all spans
from both Tyk-managed and external data source executions into a single trace when used together. Furthermore, when UDG
solely utilizes Tyk-managed data sources, trace management is simplified and operational visibility is improved.

</details>
</li>
<li>
<details>
<summary>Disabled normalize and validate in GraphQL Engine</summary>

For GraphQL requests normalization and validation has been disabled in the GraphQL engine. Both of those actions were
performed in the Tyk Gateway and were unnecessary to be done again in the engine. This enhances performance slightly and
makes detailed OTel traces concise and easier to read.

</details>
</li>
<li>
<details>
<summary>Enhanced OAS-to-UDG converter handling of arrays of objects in OpenAPI Documents</summary>

The Tyk Dashboard API endpoint _/api/data-graphs/data-sources/import_ now handles OpenAPI schemas with arrays of
objects. This addition means users can now import more complex OpenAPI documents and transform them into UDG
configurations.

</details>
</li>
<li>
<details>
<summary>OAS-to-UDG converter support for allOf/anyOf/oneOf keywords</summary>

The OAS-to-UDG converter now seamlessly handles OpenAPI descriptions that utilize the _allOf_, _anyOf_ and _oneOf_
keywords, ensuring accurate and comprehensive conversion to a Tyk API definition. The feature expands the scope of
OpenAPI documents that the converter can handle and allows our users to import REST API data sources defined in OAS in
more complex cases.

</details>
</li>
<li>
<details>
<summary>Improved UDG's handling of unnamed object definitions in OpenAPI descriptions</summary>

The OAS-to-UDG converter can now create GraphQL types even if an object's definition doesn’t have an explicit name.

</details>
</li>
<li>
<details>
<summary>Refined handling of arrays of objects in endpoint responses by OAS-to-UDG Converter</summary>

The OAS-to-UDG converter was unable to handle a document properly if an object within the OpenAPI description had no
properties defined. This limitation resulted in unexpected behavior and errors during the conversion process. The tool
will now handle such cases seamlessly, ensuring a smoother and more predictable conversion process.

</details>
</li>
<li>
<details>
<summary>OAS-to-UDG converter support for enumerated types in OpenAPI descriptions</summary>

Previously OAS-to-UDG converter had limitations in handling enums from OpenAPI descriptions, leading to discrepancies
and incomplete conversions. With the inclusion of enum support, the OAS converter now seamlessly processes enums defined
in your OpenAPI descriptions, ensuring accurate and complete conversion to GraphQL schemas.

</details>
</li>
<li>
<details>
<summary>Expanded handling of HTTP Status Code ranges by OAS-to-GQL converter</summary>

OAS-to-UDG converter can now handle HTTP status code ranges that are defined by the OpenAPI Specification. This means
that code ranges defined as 1XX, 2XX, etc will be correctly converted by the tool.

</details>
</li>
<li>
<details>
<summary>Added support for custom rate limit keys</summary>

We have added the capability for users to define a [custom rate limit
key]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/configuring-custom-rate-limit-keys" >}})
within session metadata. This increases flexibility with rate limiting, as the rate limit can be assigned to different entities
identifiable from the session metadata (such as a client app or organization) and is particularly useful for users of Tyk's
Enterprise Developer Portal.

</details>
</li>
</ul>

#### Changed

<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Prefetch session expiry information from MDCB to reduce API call duration in case Gateway is temporarily disconnected from MDCB</summary>

Previously, when operating in a worker configuration (in the data plane), the Tyk Gateway fetched session expiry
information from the control plane the first time an API was accessed for a given organization. This approach led to a
significant issue: if the MDCB connection was lost, the next attempt to consume the API would incur a long response
time. This delay, typically around 30 seconds, was caused by the Gateway waiting for the session-fetching operation to
time out, as it tried to communicate with the now-inaccessible control plane.

<br>Now, the worker gateway fetches the session expiry information up front, while there is an active connection to
MDCB. This ensures that this data is already available locally in the event of an MDCB disconnection.

<br>This change significantly improves the API response time under MDCB disconnection scenarios by removing the need for
the Gateway to wait for a timeout when attempting to fetch session information from the control plane, avoiding the
previous 30-second delay. This optimization enhances the resilience and efficiency of Tyk Gateway in distributed
environments.

</details>
</li>
<li>
<details>
<summary>Changes to the Tyk OAS API Definition</summary>

We have made some changes to the Tyk OAS API Definition to provide a stable contract that will now be under
breaking-change control for future patches and releases as Tyk OAS moves out of Early Access. Changes include the
removal of the unnecessary `slug` field and simplification of the custom plugin contract.

</details>
</li>
<li>
<details>
<summary>Optimized Gateway memory usage and reduced network request payload with Redis Rate Limiter</summary>

We have optimized the allocation behavior of our sliding window log rate limiter implementation ([Redis
Rate Limiter]({{< ref "getting-started/key-concepts/rate-limiting#redis-rate-limiter" >}})). Previously the complete
request log would be retrieved from Redis. With this enhancement only the count of the requests in the window is
retrieved, optimizing the interaction with Redis and decreasing the Gateway memory usage.

</details>
</li>
</ul>
 
#### Fixed
<!-- This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:

- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been
  introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to
expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example
below. -->

<ul>
<li>
<details>
<summary>Improved OAuth token management in Redis</summary>

In this release, we fixed automated token trimming in Redis, ensuring efficient management of OAuth tokens by
implementing a new hourly job within the Gateway and providing a manual trigger endpoint.

</details>
</li>
<li>
<details>
<summary>Tyk Gateway now validates RFC3339 Date-Time Formats</summary>

We fixed a bug in the Tyk OAS Validate Request middleware where we were not correctly validating date-time format
schema, which could lead to invalid date-time values reaching the upstream services.

</details>
</li>
<li>
<details>
<summary>Inaccurate Distributed Rate Limiting (DRL) behavior on Gateway startup</summary>

Fixed an issue when using the Distributed Rate Limiter (DRL) where the Gateway did not apply any rate limit until a DRL
notification was received. Now the rate of requests will be limited at 100% of the configured rate limit until the DRL
notification is received, after which the limit will be reduced to an even share of the total (i.e. 100% divided by the
number of Gateways) per the rate limit algorithm design.

</details>
</li>
<li>
<details>
<summary>Duplicate fields added by OAS-to-UDG converter</summary>

Fixed an issue where the OAS-to-UDG converter was sometimes adding the same field to an object type many times. This
caused issues with the resulting GQL schema and made it non-compliant with GQL specification.

</details>
</li>
<li>
<details>
<summary>Gateway issue processing queries with GQL Engine</summary>

Fixed an issue where the Gateway attempted to execute a query with GQL engine version 1 (which lacks OTel support),
while simultaneously trying to validate the same query with the OpenTelemetry (OTel) supported engine. It caused the API
to fail with an error message "Error socket hang up". Right now with OTel enabled, the gateway will enforce GQL engine
to default to version 2, so that this problem doesn't occur anymore.

</details>
</li>
<li>
<details>
<summary>Handling arrays of objects in endpoint responses by OAS-to-UDG converter</summary>

The OAS-to-UDG converter now effectively handles array of objects within POST paths. Previously, there were instances
where the converter failed to accurately interpret and represent these structures in the generated UDG configuration.

</details>
</li>
<li>
<details>
<summary>GQL Playground issues related to encoding of request response</summary>

An issue was identified where the encoding from the GQL upstream cache was causing readability problems in the response
body. Specifically, the upstream GQL cache was utilizing brotli compression and not respecting the Accept-Encoding
header. Consequently, larger response bodies became increasingly unreadable for the GQL engine due to compression,
leading to usability issues for users accessing affected content. The issue has now been fixed by adding the brotli
encoder to the GQL engine.

</details>
</li>
<li>
<details>
<summary>OAS-to-UDG converter issue with "JSON" return type</summary>

OAS-to-UDG converter was unable to correctly process Tyk OAS API definitions where "JSON" was used as one of enum
values. This issue is now fixed and whenever "JSON" is used as one of enums in the OpenAPI description, it will get
correctly transformed into a custom scalar in GQL schema.

</details>
</li>
<li>
<details>
<summary>Gateway Panic during API Edit with Virtual Endpoint</summary>

Fixed an issue where the Gateway could panic while updating a Tyk OAS API with the Virtual Endpoint middleware
configured.

</details>
</li>
<li>
<details>
<summary>Gateway panics during API Reload with JavaScript middleware bundle</summary>

Fixed an issue where reloading a bundle containing JS plugins could cause the Gateway to panic.

</details>
</li>
<li>
<details>
<summary>GraphQL introspection issue when Allow/Block List enabled</summary>

Fixed an issue where the _Disable introspection_ setting was not working correctly in cases where field-based
permissions were set (allow or block list). It was not possible to introspect the GQL schema while introspection was
technically allowed but field-based permissions were enabled. Currently, Allow/Block list settings are ignored only for
introspection queries and introspection is only controlled by the _Disable introspection_ setting.

</details>
</li>
<li>
<details>
<summary>Handling of objects without properties in OAS-to-UDG converter</summary>

The OAS-to-UDG converter was unable to handle a document properly if an object within the OpenAPI description had no
properties defined. This limitation resulted in unexpected behavior and errors during the conversion process. The tool
will now handle such cases seamlessly, ensuring a smoother and more predictable conversion process

</details>
</li>
<li>
<details>
<summary>Fixed memory leak issue in Tyk Gateway v5.2.4</summary>

Addressed a memory leak issue in Tyk Gateway linked to a logger mutex change introduced in v5.2.4. Reverting these
changes has improved connection management and enhanced system performance.

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

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security
vulnerabilities:

- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

<!--
Repeat the release notes section above for every patch here
-->

<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->

## 5.2.5 Release Notes

### Release Date 19 Dec 2023

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
This release implements a bug fix.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.5">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.5/images/sha256-c09cb03dd491e18bb84a0d9d4e71177eb1396cd5debef694f1c86962dbee10c6?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.5)

### Changelog {#Changelog-v5.2.5}

#### Fixed
<ul>
 <li>
 <details>
 <summary>Long custom keys not maintained in distributed Data Planes</summary>

Fixed an issue where custom keys over 24 characters in length were deleted from Redis in the Data Plane when key update action signalled in distributed (MDCB) setups.
 </details>
 </li>
 </ul>

---

## 5.2.4 Release Notes

### Release Date 7 Dec 2023

### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
This release enhances security, stability, and performance.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.4">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.4/images/sha256-c0d9e91e4397bd09c85adf4df6bc401b530ed90c8774714bdafc55db395c9aa5?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.4)

### Changelog {#Changelog-v5.2.4}

#### Fixed
<ul>
 <li>
 <details>
 <summary>Output from Tyk OAS request validation schema failure is too verbose</summary>

Fixed an issue where the Validate Request middleware provided too much information when reporting a schema validation failure in a request to a Tyk OAS API.
 </details>
 </li>
 <li>
 <details>
 <summary>Gateway incorrectly applying policy Path-Based Permissions in certain circumstances</summary>

Fixed a bug where the gateway didn't correctly apply Path-Based Permissions from different policies when using the same `sub` claim but different scopes in each policy. Now the session will be correctly configured for the claims provided in the policy used for each API request.
 </details>
 </li>
 <li>
 <details>
 <summary>Plugin compiler not correctly supporting build_id to differentiate between different builds of the same plugin </summary>

Fixed a bug when using the build_id argument with the Tyk Plugin Compiler that prevents users from hot-reloading different versions of the same plugin compiled with different build_ids. The bug was introduced with the plugin module build change implemented in the upgrade to Go version 1.19 in Tyk 5.1.0.
 </details>
 </li>
 <li>
 <details>
 <summary>URL Rewrite fails to handle escaped character in query parameter</summary>

Fixed a bug that was introduced in the fix applied to the URL Rewrite middleware in Tyk 5.0.5/5.1.2. The previous fix did not correctly handle escaped characters in the query parameters. Now you can safely include escaped characters in your query parameters and Tyk will not modify them in the URL Rewrite middleware.
 </details>
 </li>
 </ul>

---

## 5.2.3 Release Notes

### Release Date 21 Nov 2023

### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
This release enhances security, stability, and performance.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.3">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.3/images/sha256-8a94658c8c52ddfe30f78c5438dd4308c4d019655d8af7773a33fdffda097992?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.3)

### Changelog {#Changelog-v5.2.3}

#### Fixed

<ul>
<li>
<details>
<summary>Python version not always correctly autodetected</summary>

Fixed an issue where Tyk was not autodetecting the installed Python version if it had multiple digits in the minor version (e.g. Python 3.11). The regular expression was updated to correctly identify Python versions 3.x and 3.xx, improving compatibility and functionality.
</details>
</li>
 <li>
 <details>
 <summary>Gateway blocked trying to retrieve keys via MDCB when using JWT auth</summary>

Improved the behavior when using JWTs and the MDCB (Multi Data Center Bridge) link is down; the Gateway will no longer be blocked attempting to fetch OAuth client info. We’ve also enhanced the error messages to specify which type of resource (API key, certificate, OAuth client) the data plane Gateway failed to retrieve due to a lost connection with the control plane.
 </details>
 </li>
 <li>
 <details>
 <summary>Custom Authentication Plugin not working correctly with policies</summary>

Fixed an issue where the session object generated when creating a Custom Key in a Go Plugin did not inherit parameters correctly from the Security Policy.
 </details>
 </li>
 <li>
 <details>
 <summary>Attaching a public key to an API definition for mTLS brings down the Gateway</summary>

Fixed an issue where uploading a public key instead of a certificate into the certificate store, and using that key for mTLS, caused all the Gateways that the APIs are published on to cease negotiating TLS. This fix improves the stability of the gateways and the successful negotiation of TLS.
 </details>
 </li>
 </ul>

#### Added

<ul>
<li>
<details>
<summary>Implemented a `tyk version` command that provides more details about the Tyk Gateway build</summary>

This prints the release version, git commit, Go version used, architecture and other build details.
</details>
</li>
<li>
<details>
<summary>Added option to fallback to default API version</summary>

Added new option for Tyk to use the default version of an API if the requested version does not exist. This is referred to as falling back to default and is enabled using a [configuration]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#versioning" >}}) flag in the API definition; for Tyk OAS APIs the flag is `fallbackToDefault`, for Tyk Classic APIs it is `fallback_to_default`.
</details>
</li>
<li>
<details>
<summary>Implemented a backoff limit for GraphQL subscription connection retry</summary>

Added a backoff limit for GraphQL subscription connection retry to prevent excessive error messages when the upstream stops working. The connection retries and linked error messages now occur in progressively longer intervals, improving error handling and user experience.
</details>
</li>
</ul>

#### Community Contributions

Special thanks to the following member of the Tyk community for their contribution to this release:

<ul>
<li>
<details>
<summary>Runtime log error incorrectly produced when using Go Plugin Virtual Endpoints</summary>

Fixed a minor issue with Go Plugin virtual endpoints where a runtime log error was produced from a request, even if the response was successful. Thanks to [uddmorningsun](https://github.com/uddmorningsun) for highlighting the [issue](https://github.com/TykTechnologies/tyk/issues/4197) and proposing a fix.
</details>
</li>
</ul>

---

## 5.2.2 Release Notes

### Release Date 31 Oct 2023

### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.2">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.2/images/sha256-84d9e083872c78d854d3b469734ce40b7e77b9963297fe7945e214a0e6ccc614?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.2)

### Changelog {#Changelog-v5.2.2}

#### Security

The following CVEs have been resolved in this release:

- [CVE-2022-40897](https://nvd.nist.gov/vuln/detail/CVE-2022-40897)
- [CVE-2022-1941](https://nvd.nist.gov/vuln/detail/CVE-2022-1941)
- [CVE-2021-23409](https://nvd.nist.gov/vuln/detail/CVE-2021-23409)
- [CVE-2021-23351](https://nvd.nist.gov/vuln/detail/CVE-2021-23351)
- [CVE-2019-19794](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)
- [CVE-2018-5709](https://nvd.nist.gov/vuln/detail/CVE-2018-5709)
- [CVE-2010-0928](https://nvd.nist.gov/vuln/detail/CVE-2010-0928)
- [CVE-2007-6755](https://nvd.nist.gov/vuln/detail/CVE-2007-6755)



#### Fixed

<ul>
<li>
<details>
<summary>Enforced timeouts were incorrect on a per-request basis</summary>

Fixed an issue where [enforced timeouts]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) values were incorrect on a per-request basis. Since we enforced timeouts only at the transport level and created the transport only once within the value set by [max_conn_time]({{< ref "tyk-oss-gateway/configuration#max_conn_time" >}}), the timeout in effect was not deterministic. Timeouts larger than 0 seconds are now enforced for each request.
</details>
</li>
<li>
<details>
<summary>Incorrect access privileges were granted in security policies</summary>

Fixed an issue when using MongoDB and [Tyk Security Policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This was due to the policy cleaning operation that is triggered when an API is deleted from a policy in a MongoDB installation. With this fix, the policy cleaning operation will not remove the final (deleted) API from the policy; Tyk recognizes that the API record is invalid and denies granting access rights to the key.
</details>
</li>
<li>
<details>
<summary>Logstash formatter timestamp was not in RFC3339 Nano format</summary>

The [Logstash]({{< ref "log-data#aggregated-logs-with-logstash" >}}) formatter timestamp is now in [RFC3339Nano](https://www.rfc-editor.org/rfc/rfc3339) format.
</details>
</li>
<li>
<details>
<summary>In high load scenarios the DRL Manager was not protected against concurrent read and write operations</summary>

Fixed a potential race condition where the *DRL Manager* was not properly protected against concurrent read/write operations in some high-load scenarios.
</details>
</li>
<li>
<details>
<summary>Performance issue encountered when Tyk Gateway retrieves a key via MDCB for a JWT API</summary>

Fixed a performance issue encountered when Tyk Gateway retrieves a key via MDCB for a JWT API. The token is now validated against [JWKS or the public key]({{<ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}}) in the API Definition.
</details>
</li>
<li>
<details>
<summary>JWT middleware introduced latency which reduced overall request/response throughput</summary>

Fixed a performance issue where JWT middleware introduced latency which significantly reduced the overall request/response throughput.
</details>
</li>
<li>
<details>
<summary>UDG examples were not displayed when Open Policy Agent (OPA) was enabled</summary>

Fixed an issue that prevented *UDG* examples from being displayed in the dashboard when the *Open Policy Agent(OPA)* is enabled.
</details>
</li>
<li>
<details>
<summary>Sensitive information logged when incorrect signature provided for APIs protected by HMAC authentication</summary>

Fixed an issue where the Tyk Gateway logs would include sensitive information when the incorrect signature is provided in a request to an API protected by HMAC authentication.
</details>
</li>
</ul>

#### Community Contributions

Special thanks to the following members of the Tyk community for their contributions to this release:

<ul>
<li>
<details>
<summary>ULID Normalization implemented</summary>
- Implemented *ULID Normalization*, replacing valid ULID identifiers in the URL with a `{ulid}` placeholder for analytics. This matches the existing UUID normalization. Thanks to [Mohammad Abdolirad](https://github.com/atkrad) for the contribution.
</details>
</li>
<li>
<details>
<summary>Duplicate error message incorrectly reported when a custom Go plugin returned an error</summary>

Fixed an issue where a duplicate error message was reported when a custom Go plugin returned an error. Thanks to [@PatrickTaibel](https://github.com/PatrickTaibel) for highlighting the issue and suggesting a fix.
</details>
</li>
</ul>


---

## 5.2.1 Release Notes

### Release Date 10 Oct 2023

### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are on a 5.2.0 we advise you to upgrade ASAP and if you are on an older version skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.1/images/sha256-47cfffda64ba492f79e8cad013a476f198011f5a97cef32464f1f47e1a9be9a2?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.2)

### Changelog {#Changelog-v5.2.1}

#### Changed

<ul>
<li>
<details>
<summary>Log messaging quality enhanced</summary>

Enhance log message quality by eliminating unnecessary messages
</details>
</li>
<li>
<details>
<summary>Configurable retry for resource loading introduced</summary>

Fixed a bug that occurs during Gateway reload where the Gateway would continue to load new API definitions even if policies failed to load. This led to a risk that an API could be invoked without the associated policies (for example, describing access control or rate limits) having been loaded. Now Tyk offers a configurable retry for resource loading, ensuring that a specified number of attempts will be made to load resources (APIs and policies). If a resource fails to load, an error will be logged and the Gateway reverts to its last working configuration.

We have introduced two new variables to configure this behavior:
- `resource_sync.retry_attempts` - defines the number of [retries]({{< ref "tyk-oss-gateway/configuration#resource_syncretry_attempts" >}}) that the Gateway should perform during a resource sync (APIs or policies), defaulting to zero which means no retries are attempted
- `resource_sync.interval` - setting the [fixed interval]({{< ref "tyk-oss-gateway/configuration#resource_syncinterval" >}}) between retry attempts (in seconds)
</details>
</li>
<li>
<details>
<summary>Added http.response.body.size and http.request.body.size for OpenTelemetry users</summary>

For OpenTelemetry users, we've included much-needed attributes, `http.response.body.size` and `http.request.body.size`, in both Tyk HTTP spans and upstream HTTP spans. This addition enables users to gain better insight into incoming/outgoing request/response sizes within their traces.
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Memory leak was encountered if OpenTelemetry enabled</summary>

Fixed a memory leak issue in Gateway 5.2.0 if [OpenTelemetry](https://opentelemetry.io/) (abbreviated "OTel") is [enabled](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview/#enabling-opentelemetry-in-two-steps). It was caused by multiple `otelhttp` handlers being created. We have updated the code to use a single instance of `otelhttp` handler in 5.2.1 to improve performance under high traffic load.
</details>
</li>
<li>
<details>
<summary>Memory leak encountered when enabling the strict routes option</summary>

Fixed a memory leak that occurred when enabling the [strict routes option]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_strict_routes" >}}) to change the routing to avoid nearest-neighbor requests on overlapping routes (`TYK_GW_HTTPSERVEROPTIONS_ENABLESTRICTROUTES`)
</details>
</li>
<li>
<details>
<summary>High rates of Tyk Gateway reloads were encountered</summary>

Fixed a potential performance issue related to high rates of *Tyk Gateway* reloads (when the Gateway is updated due to a change in APIs and/or policies). The gateway uses a timer that ensures there's at least one second between reloads, however in some scenarios this could lead to poor performance (for example overloading Redis). We have introduced a new [configuration option]({{< ref "tyk-oss-gateway/configuration#reload_interval" >}}), `reload_interval` (`TYK_GW_RELOADINTERVAL`), that can be used to adjust the duration between reloads and hence optimize the performance of your Tyk deployment.
</details>
</li>
<li>
<details>
<summary>Headers for GraphQL headers were not properly forwarded upstream for GQL/UDG subscriptions</summary>

Fixed an issue with GraphQL APIs, where [headers]({{< ref "graphql/gql-headers" >}}) were not properly forwarded upstream for [GQL/UDG subscriptions]({{< ref "getting-started/key-concepts/graphql-subscriptions" >}}).
</details>
</li>
<li>
<details>
<summary>Idle upstream connections were incorrectly closed</summary>

Fixed a bug where the Gateway did not correctly close idle upstream connections (sockets) when configured to generate a new connection after a configurable period of time (using the [max_conn_time]({{<ref "tyk-oss-gateway/configuration#max_conn_time" >}}) configuration option). This could lead to the Gateway eventually running out of sockets under heavy load, impacting performance.
</details>
</li>
<li>
<details>
<summary>Extra chunked transfer encoding was uncessarily added to rawResponse analytics</summary>

Removed the extra chunked transfer encoding that was added unnecessarily to `rawResponse` analytics
</details>
</li>
<li>
<details>
<summary>Reponse body transformation not execute when Persist GraphQL middleware used</summary>

Resolved a bug with HTTP GraphQL APIs where, when the [Persist GraphQL middleware]({{< ref "graphql/persisted-queries" >}}) was used in combination with [Response Body Transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}), the response's body transformation was not being executed.
{{< img src="img/bugs/bug-persistent-gql.png" width="400" alt="Bug in persistent gql and response body transform" title="The setup of graphQL middlewares">}}
</details>
</li>
<li>
<details>
<summary>Unable to modify a key that provides access to an inactive or draft API</summary>

Fixed a bug where, if you created a key which provided access to an inactive or draft API, you would be unable to subsequently modify that key (via the Tyk Dashboard UI, Tyk Dashboard API or Tyk Gateway API)
</details>
</li>
</ul>


#### Dependencies
- Updated TykTechnologies/gorm to v1.21 in Tyk Gateway

---

## 5.2.0 Release Notes

### Release Date 29 Sep 2023

### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

#### Added Body Transform Middleware to Tyk OAS API Definition

With this release, we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool.

#### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the *Tyk OAS API definition* from within your custom *Go Plugins*, bringing them up to standard alongside those you might use with a *Tyk Classic API*.

#### Configure Caching For Each API Endpoint

We’ve added the ability to [configure]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

#### Added Header Management in Universal Data Graph

With this release we are adding a concept of [header management]({{< ref "universal-data-graph/concepts/header_management" >}}) in *Universal Data Graph*. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All *Universal Data Graph* headers now have access to *request context* variables like *JWT claims*, *IP address* of the connecting client or *request ID*. This provides extensive configurability of customizable information that can be sent upstream.

#### Added Further Support For GraphQL WebSocket Protocols

Support for [WebSocket]({{< ref "/graphql/graphql-websockets" >}}) protocols between client and the *Gateway* has also been expanded. Instead of only supporting the *graphql-ws protocol*, which is becoming deprecated, we now also support [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) by setting the *Sec-WebSocket-Protocol* header to *graphql-transport-ws*.

#### Added OpenTelemetry Tracing

In this version, we're introducing the support for *OpenTelemetry Tracing*, the new [open standard](https://opentelemetry.io/) for exposing observability data. This addition gives you improved visibility into how API requests are processed, with no additional license required. It is designed to help you with monitoring and troubleshooting APIs, identify bottlenecks, latency issues and errors in your API calls. For detailed information and guidance, you can check out our [OpenTelemetry Tracing]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}) resource.

*OpenTelemetry* makes it possible to isolate faults within the request lifetime through inspecting API and Gateway meta-data. Additionally, performance bottlenecks can be identified within the request lifetime. API owners and developers can use this feature to understand how their APIs are being used or processed within the Gateway.

*OpenTelemetry* functionality is also available in [Go Plugins]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/otel-plugins" >}}). Developers can write code to add the ability to preview *OpenTelemetry* trace attributes, error status codes etc., for their Go Plugins.

We offer support for integrating *OpenTelemetry* traces with supported open source tools such [Jaeger]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_jaeger" >}}), [Dynatrace]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_dynatrace" >}}) or [New Relic]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_new_relic" >}}). This allows API owners and developers to gain troubleshooting and performance insights from error logs, response times etc.
You can also find a direct link to our docs in the official [OpenTelemetry Integration page](https://opentelemetry.io/ecosystem/integrations/)

{{< warning success >}}
**Warning**

*Tyk Gateway 5.2* now includes *OpenTelemetry Tracing*. Over the next year, we'll be deprecating *OpenTracing*. We recommend migrating to *OpenTelemetry* for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

{{< /warning >}}

### Downloads

- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.0/images/sha256-cf0c57619e8285b1985bd5e4bf86b8feb42abec56cbc241d315cc7f8c0d43025?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.0)

### Changelog {#Changelog-v5.2.0}

#### Added:

<ul>
<li>
<details>
<summary>Added support for configuring distributed tracing behavior</summary>

Added support for [configuring]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}) distributed tracing behavior of *Tyk Gateway*. This includes enabling tracing, configuring exporter types, setting the URL of the tracing backend to which data is to be sent, customizing headers, and specifying enhanced connectivity for *HTTP*, *HTTPS* and *gRPC*. Subsequently, users have precise control over tracing behavior in *Tyk Gateway*.
</details>
</li>
<li>
<details>
<summary>Added support for configuring OpenTelemetry</summary>

Added support to configure *OpenTelemetry* [sampling types and rates]({{< ref "tyk-oss-gateway/configuration#opentelemetrysampling" >}}) in the *Tyk Gateway*. This allows users to manage the need for collected detailed tracing information against performance and resource usage requirements.
</details>
</li>
<li>
<details>
<summary>Added span attributes to simplify identifying Tyk API and request meta-data per request</summary>

Added span attributes to simplify identifying Tyk API and request meta-data per request. Example span attributes include: *tyk.api.id*, *tyk.api.name*, *tyk.api.orgid*, *tyk.api.tags*, *tyk.api.path*, *tyk.api.version*, *tyk.api.apikey*, *tyk.api.apikey.alias* and *tyk.api.oauthid*. This allows users to use *OpenTelemetry* [semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) to filter and create metrics for increased insight and observability.
</details>
</li>
<li>
<details>
<summary>Add custom resource attributes to allow process information to be available in traces</summary>

Added custom resource attributes: *service.name*, *service.instance.id*, *service.version*, *tyk.gw.id*, *tyk.gw.dataplane*, *tyk.gw.group.id*, *tyk.gw.tags* to allow process information to be available in traces.
</details>
</li>
<li>
<details>
<summary>Allow clients to retrieve the trace ID from response headers when OpenTelemetry enabled</summary>

Added a new feature that allows clients to retrieve the trace ID from response headers. This feature is available when *OpenTelemetry* is [enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) and simplifies debugging API requests, empowering users to seamlessly correlate and analyze data for a specific trace in any *OpenTelemetry* backend like [Jaeger](https://www.jaegertracing.io/).
</details>
</li>
<li>
<details>
<summary>Allow detailed tracing to be enabled/disabled at API level</summary>

Added configuration parameter to enable/disable [detail_tracing]({{< ref "/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview#step-2-enable-detailed-tracing-at-api-level-optional" >}}) for *Tyk Classic API*.
</details>
</li>
<li>
<details>
<summary>Add OpenTelemetry support for GraphQL</summary>

Added *OpenTelemetry* support for GraphQL. This is activated by setting [opentelemetry.enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) to *true*. This integration enhances observability by enabling GQL traces in any OpenTelemetry backend, like [Jaeger](https://www.jaegertracing.io/), granting users comprehensive insights into the execution process, such as request times.
</details>
</li>
<li>
<details>
<summary>Add support to configure granual control over cache timeout at the endpoint level</summary>

Added a new [timeout option]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}), offering granular control over cache timeout at the endpoint level.
</details>
</li>
<li>
<details>
<summary>Enable request context variables in UDG global or data source headers</summary>

Added support for using [request context variables]({{< ref "context-variables#available-context-variables" >}}) in *UDG* global or data source headers. This feature enables much more advanced [header management]({{< ref "/universal-data-graph/concepts/header_management" >}}) for UDG and allows users to extract header information from an incoming request and pass it to upstream data sources.
</details>
</li>
<li>
<details>
<summary>Add support for configuration of global headers for any UDG</summary>

Added support for configuration of [global headers]({{< ref "/universal-data-graph/concepts/header_management" >}}) for any *UDG*. These headers will be forwarded to all data sources by default, enhancing control over data flow.
</details>
</li>
<li>
<details>
<summary>Add ability for Custom GoPlugin developers using Tyk OAS APIs to access the API Definition</summary>

Added the ability for Custom GoPlugin developers using *Tyk OAS APIs* to access the *API Definition* from within their plugin. The newly introduced *ctx.getOASDefinition* function provides read-only access to the *OAS API Definition* and enhances the flexibility of plugins.
</details>
</li>
<li>
<details>
<summary>Add support for graphql-transport-ws websocket protocol</summary>

Added support for the websocket protocol, *graphql-transport-ws protocol*, enhancing communication between the client and *Gateway*. Users [connecting]({{< ref "/graphql/graphql-websockets" >}}) with the header *Sec-WebSocket-Protocol* set to *graphql-transport-ws* can now utilize messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.
</details>
</li>
<li>
<details>
<summary>Developers using Tyk OAS API Definition can configure body transform middleware for API reponses</summary>

Added support for API Developers using *Tyk OAS API Definition* to [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customization at the per-endpoint level.
</details>
</li>
<li>
<details>
<summary>Enhanced Gateway usage reporting, allowing reporting of number of connected gateways and data planes</summary>
- Added support for enhanced *Gateway* usage reporting. *MDCB v2.4* and *Gateway v5.2* can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation are available in *Tyk Dashboard* for enhanced monitoring of your deployment.
</details>
</li>
</ul>

#### Changed:
<ul>
<li>
<details>
<summary>Response Body Transform middleware updated to remove unnecessary entries in Tyk Classic API Definition</summary>

Updated *Response Body Transform* middleware for *Tyk Classic APIs* to remove unnecessary entries in the *API definition*. The dependency on the *response_processor.response_body_transform* configuration has been removed to streamline middleware usage, simplifying API setup.
</details>
</li>
</ul>

#### Fixed:
<ul>
<li>
<details>
<summary>UDG was dropping array type parameter in certain circumstances from final request URL sent upstream</summary>

Fixed an issue with querying a *UDG* API containing a query parameter of array type in a REST data source. The *UDG* was dropping the array type parameter from the final request URL sent upstream.
</details>
</li>
<li>
<details>
<summary>Introspection of GraphQL schemas raised an error when dealing with some custom root types</summary>

Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than *Query*, *Mutation* or *Subscription*.
</details>
</li>
<li>
<details>
<summary>Enforced Timeout configuration parameter of an API endpoint was not validated</summary>

Fixed an issue where the [Enforced Timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.
</details>
</li>
<li>
<details>
<summary>allowedIPs validation failures were causing the loss of other error types reported</summary>

Fixed an issue where *allowedIPs* validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.
</details>
</li>
<li>
<details>
<summary>The Data Plane Gateway for versions < v5.1 crashed with panic error when creating a Tyk OAS API</summary>

Fixed a critical issue in MDCB v2.3 deployments, relating to *Data Plane* stability. The *Data Plane* Gateway with versions older than v5.1 was found to crash with a panic when creating a Tyk OAS API. The bug has been addressed, ensuring stability and reliability in such deployments.
</details>
</li>
</ul>


---

## 5.1 Release Notes

### Release Date 23 June 2023

#### Breaking Changes

**Attention warning*: Please read carefully this section.

##### Golang Version upgrade
Our Gateway is using [Golang 1.19](https://tip.golang.org/doc/go1.19) programming language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#upgrading-your-tyk-gateway" >}}) these to maintain compatibility with the latest Gateway.

##### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backward-compatible. Downgrading to a previous version after upgrading may result in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
 
##### Request Body Size Limits

We have introduced a new Gateway-level option to limit the size of requests made
to your APIs. You can use this as a first line of defense against overly large
requests that might affect your Tyk Gateways or upstream services. Of course,
being Tyk, we also provide the flexibility to configure API-level and
per-endpoint size limits so you can be as granular as you need to protect and
optimize your services. Check out our improved documentation for full
description of how to use these powerful [features]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}).

##### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.1/images/sha256-3d1e64722be1a983d4bc4be9321ca1cdad10af9bb3662fd6824901d5f22820f1?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.0)


#### Changelog

##### Added

- Added `HasOperation`, `Operation` and `Variables` to GraphQL data source API definition for easier nesting
- Added abstractions/interfaces for ExecutionEngineV2 and ExecutionEngine2Executor with respect to graphql-go-tools
- Added support for the `:authority` header when making GRPC requests. If the `:authority` header is not present then some GRPC servers return PROTOCOL_ERROR which prevents custom GRPC plugins from running. Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) from the Tyk Community for his contribution!

##### Changed

- Tyk Gateway updated to use Go 1.19
- Updated [_kin-openapi_](https://github.com/getkin/kin-openapi) dependency to the version [v0.114.0](https://github.com/getkin/kin-openapi/releases/tag/v0.114.0)
- Enhanced the UDG parser to comprehensively extract all necessary information for UDG configuration when users import to Tyk their OpenAPI document as an API definition
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

##### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behavior for OAuth is now the same as for other authorization methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!
- Fixed minor versioning, URL and field mapping issues when importing OpenAPI document as an API definition to UDG
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as an authorization mechanism

#### Tyk Classic Portal Changelog

##### Changed

- Improved performance when opening the Portal page by optimizing the pre-fetching of required data


## 5.0.15 Release Notes {#rn-v5.0.15}

### Release Date 24 October 2024

### Breaking Changes

There are no breaking changes in this release.

### Upgrade Instructions

Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk)
section for detailed upgrade instructions.

### Release Highlights

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.0.15 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.15">}}) below.

### Changelog {#Changelog-v5.0.15}

#### Fixed

<ul>
<li>
<details>
<summary>Resolved gateway panic on reconnecting to MDCB control plane or Tyk Cloud</summary>
In version 5.0.14, Tyk Gateway could encounter panic when attempting to reconnect to the control plane after it was restarted. This patch version has resolved this issue, ensuring stable connectivity between the gateway and control plane following reconnections and reducing the need for manual intervention.
</details>
</li>
</ul>

---

## 5.0.14 Release Notes {#rn-v5.0.14}

### Release Date 18th September 2024

{{< note success >}} **Important Update**<br> <br> <b>Date</b>: 12 October 2024<br> <b>Topic</b>: Gateway panic when
reconnecting to MDCB control plane or Tyk Cloud<br> <b>Workaround</b>: Restart Gateway<br> <b>Affected Product</b>: Tyk
Gateway as an Edge Gateway<br> <b>Affected versions</b>: v5.6.0, v5.3.6, and v5.0.14<br> <b>Issue Description:</b><br>

<p>We have identified an issue affecting Tyk Gateway deployed as a data plane connecting to the Multi-Data Center Bridge (MDCB) control plane or Tyk Cloud. In the above mentioned Gateway versions a panic may occur when gateway reconnect to the control plane after the control plane is restarted.
<p>Our engineering team is actively working on a fix, and a patch (versions 5.6.1, 5.3.7, and 5.0.15) will be released soon.<br>
<b>Recommendations:</b><br>
<ul>
<li><b>For users on versions 5.5.0, 5.3.5, and 5.0.13</b><br>
We advise you to delay upgrading to the affected versions (5.6.0, 5.3.6, or 5.0.14) until the patch is available.

<li><b>For users who have already upgraded to 5.6.0, 5.3.6, or 5.0.14 and are experiencing a panic in the gateway:</b><br>
Restarting the gateway process will restore it to a healthy state. If you are operating in a *Kubernetes* environment, Tyk Gateway instance should automatically restart, which ultimately resolves the issue.<br>
</ul>
<p>We appreciate your understanding and patience as we work to resolve this. Please stay tuned for the upcoming patch release, which will address this issue.
{{< /note >}}

### Breaking Changes

**Attention:** Please read this section carefully.

There are no breaking changes in this release.

### Upgrade Instructions

This release is not tightly coupled with Tyk Dashboard v5.0.14, so you do not have to upgrade both together.

Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk)
section for detailed upgrade instructions.

### Release Highlights

This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway
configuration options to control path matching strictness.

### Changelog {#Changelog-v5.0.14}

#### Added

<ul>
<li>
<details>
<summary>Implemented Gateway configuration options to set URL path matching strictness</summary>

We have introduced two new options in the `http_server_options` [Gateway
configuration]({{< ref "tyk-oss-gateway/configuration#http_server_options" >}}) that will enforce prefix and/or suffix matching
when Tyk performs checks on whether middleware or other logic should be applied to a request:

- `enable_path_prefix_matching` ensures that the start of the request path must match the path defined in the API
  definition
- `enable_path_suffix_matching` ensures that the end of the request path must match the path defined in the API
  definition
- combining `enable_path_prefix_matching` and `enable_path_suffix_matching` will ensure an exact (explicit) match is
  performed

These configuration options provide control to avoid unintended matching of paths from Tyk's default _wildcard_ match.
Use of regex special characters when declaring the endpoint path in the API definition will automatically override these
settings for that endpoint.

**Tyk recommends that exact matching is employed, but both options default to `false` to avoid introducing a breaking
change for existing users.**

</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based
Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) in access policies and keys that led to authorization
incorrectly being granted to endpoints if an invalid regular expression was configured in the key/policy. Also fixed an issue
where path-based parameters were not correctly handled by Path-Based Permissions. Now Tyk's authorization check correctly
handles both of these scenarios granting access only to the expected resources.

</details>
</li>
<li>
<details>
<summary>Missing path parameter can direct to the wrong endpoint</summary>

Fixed an issue where a parameterized endpoint URL (e.g. `/user/{id}`) would be invoked if a request is made that omits
the parameter. For example, a request to `/user/` will now be interpreted as a request to `/user` and not to
`/user/{id}`.

</details>
</li>

<li>
<details>
<summary>Improved Gateway Synchronization with MDCB for Policies and APIs</summary>

We have enhanced the Tyk Gateway's synchronization with MDCB to ensure more reliable loading of policies and APIs. A
synchronous initialization process has been implemented to prevent startup failures and reduce the risk of service
disruptions caused by asynchronous operations. This update ensures smoother and more consistent syncing of policies and
APIs from MDCB.

</details>
</li>
</ul>

---

## 5.0.13 Release Notes

### Release Date 4 July 2024

### Release Highlights

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly
replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

##### Action Required

Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and
ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the
changelog for recommended actions.

### Changelog {#Changelog-v5.0.13}

#### Fixed

<ul>
<li>
<details>
<summary>Resolved an issue where changes to custom keys were not properly replicated to dataplanes</summary>

Resolved a critical issue affecting MDCB environments, where changes to custom keys made via the dashboard were not
properly replicated to dataplanes. This affected both the key data and associated quotas. This issue was present in
versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

**Action Required**

Customers are advised to clear their edge Redis instances of any keys that might have been affected by this bug to
ensure data consistency and proper synchronization across their environments. There are several methods available to
address this issue:

1. **Specific Key Deletion via API**: To remove individual buggy keys, you can use the following API call:

```bash
curl --location --request DELETE 'http://tyk-gateway:{tyk-hybrid-port}/tyk/keys/my-custom-key' \ --header 'X-Tyk-Authorization: {dashboard-key}'
```

Replace `{tyk-hybrid-port}`, `my-custom-key` and `{dashboard-key}` with your specific configuration details. This method
is safe and recommended for targeted removals without affecting other keys.

2. **Bulk Key Deletion Using Redis CLI**: For environments with numerous affected keys, you might consider using the
   Redis CLI to remove keys en masse:

```bash
redis-cli --scan --pattern 'apikey-*' | xargs -L 1 redis-cli del
redis-cli --scan --pattern 'quota-*' | xargs -L 1 redis-cli del
```

This method can temporarily impact the performance of the Redis server, so it should be executed during a maintenance
window or when the impact on production traffic is minimal.

3. **Complete Redis Database Flush**: If feasible, flushing the entire Redis database offers a clean slate:

```bash
redis-cli FLUSHALL ASYNC
```

**Implications** Regardless of the chosen method, be aware that quotas will be reset and will need to resynchronize
across the system. This may temporarily affect reporting and rate limiting capabilities.

</details>
</li>
</ul>

---

## 5.0.12 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12).

---

## 5.0.11 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11).

---

## 5.0.10 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10).

---

## 5.0.9 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9).

---

## 5.0.8 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8).

---

## 5.0.7 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.7).

---

## 5.0.6 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.6).

---

## 5.0.5 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.5).

---

## 5.0.4 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.4).

---

## 5.0.3 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.3).

---

## 5.0.2 Release Notes

### Release Date 29 May 2023

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.0.2">}}) below.

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.2/images/sha256-5e126d64571989f9e4b746544cf7a4a53add036a68fe0df4502f1e62f29627a7?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.2)

#### Changelog {#Changelog-v5.0.2}

##### Updated

- Internal refactoring to make storage related parts more stable and less affected by potential race issues

---

## 5.0.1 Release Notes

### Release Date 25 Apr 2023

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.0.1">}}) below.

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.1/images/sha256-5fa7aa910d62a7ed2c1cfbc68c69a988b4b0e9420d7a52018f80f9a45cadb083?context=explore
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.1)

#### Changelog {#Changelog-v5.0.1}

##### Added

- Added a new `enable_distributed_tracing` option to the NewRelic config to enable support for Distributed Tracer

##### Fixed

- Fixed panic when JWK method was used for JWT authentication and the token didn't include kid
- Fixed an issue where failure to load GoPlugin middleware didn’t prevent the API from proxying traffic to the upstream:
  now Gateway logs an error when the plugin fails to load (during API creation/update) and responds with HTTP 500 if the
  API is called; at the moment this is fixed only for file based plugins
- Fixed MutualTLS issue causing leak of allowed CAs during TLS handshake when there are multiple mTLS APIs
- Fixed a bug during hot reload of Tyk Gateway where APIs with JSVM plugins stored in filesystem were not reloaded
- Fixed a bug where the gateway would remove the trailing `/`at the end of a URL
- Fixed a bug where nested field-mappings in UDG weren't working as intended
- Fixed a bug when using Tyk OAuth 2.0 flow on Tyk Cloud where a request for an Authorization Code would fail with a 404
  error
- Fixed a bug where mTLS negotiation could fail when there are a large number of certificates and CAs; added an option
  (`http_server_options.skip_client_ca_announcement`) to use the alternative method for certificate transfer
- Fixed CVE issue with go.uuid package
- Fixed a bug where rate limits were not correctly applied when policies are partitioned to separate access rights and
  rate limits into different scopes

---

## 5.0.0 Release Notes

### Release Date 28 Mar 2023

#### Deprecations

- Tyk Gateway no longer natively supports **LetsEncrypt** integration. You still can use LetsEncrypt CLI tooling to
  generate certificates and use them with Tyk.

#### Release Highlights

##### Improved OpenAPI support

We have added some great features to the Tyk OAS API definition bringing it closer to parity with our Tyk Classic API
and to make it easier to get on board with Tyk using your Open API workflows.

Tyk’s OSS users can now make use of extensive [custom middleware](https://tyk.io/docs/plugins/) options with your OAS
APIs, to transform API requests and responses, exposing your upstream services in the way that suits your users and
internal API governance rules. We’ve enhanced the Request Validation for Tyk OAS APIs to include parameter validation
(path, query, headers, cookie) as well as the body validation that was introduced in Tyk 4.1.

[Versioning your Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) is easier than ever, with the
Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve
also added a new endpoint on the Tyk API that will return details of the versions for a given API.

We’ve improved support for [OAS
Mock Responses]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}), with the Tyk OAS API
definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing
flexibility.

Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the
best way for you to create and manage your APIs.

Thanks to our community contributors [armujahid](https://github.com/armujahid),
[JordyBottelier](https://github.com/JordyBottelier) and [ls-michal-dabrowski](https://github.com/ls-michal-dabrowski)
for your PRs that further improve the quality of Tyk OSS Gateway!

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.0/images/sha256-196815adff2805ccc14c267b14032f23913321b24ea86c052b62a7b1568b6725?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.0)

#### Changelog {#Changelog-v5.0.0}

##### Added

- Support for request validation (including query params, headers and the rest of OAS rules) with Tyk OAS APIs
- Transform request/response middleware for Tyk OAS APIs
- Custom middleware for Tyk OAS APIs
- Added a new API endpoint to manage versions for Tyk OAS APIs
- Improved Mock API plugin for Tyk OAS APIs
- Universal Data Graph and GraphQL APIs now support using context variables in request headers, allowing passing
  information it to your subgraphs
- Now you can control access to introspection on policy and key level

#### Fixed

- Fixed potential race condition when using distributed rate limiter

---

