---
title: Tyk Gateway 5.6 Release Notes
date: 2024-10-08T15:51:11Z
description:
  "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.6.X series."
tags: ["Tyk Gateway", "Release notes", "v5.6", "5.6.0", "5.6.1", "5.6", "changelog"]
---

<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.6.X displayed in a reverse chronological order**

## Support Lifetime

<!-- Required. replace X.Y with this release and set the correct quarter of the year -->

Our minor releases are supported until our next minor comes out.

---

## 5.6.1 Release Notes

### Release Date 15 October 2024

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

## <!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

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

## <!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

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

Please visit our [Developer Support]({{< ref "/frequently-asked-questions/faq" >}}) page for further information relating
to reporting bugs, upgrading Tyk, technical support and how to contribute.
