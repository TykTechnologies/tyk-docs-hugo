---
title: Tyk Gateway 5.6 Release Notes
date: 2024-03-27T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.6.X series."
tags: ["Tyk Gateway", "Release notes", "v5.6", "5.6.0", "5.6", "changelog"]
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

## 5.6.0 Release Notes

### Release Date xxx

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
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.6.0 | MDCB v2.7 - TBP    | MDCB v2.4.2 |
|         | Operator v0.18 - TBP | Operator v0.17 |
|         | Sync v1.5 - TBP   | Sync v1.4.3 |
|         | Helm Chart v1.6 - TBP | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.22  |  1.22  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.22 | 
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

### Upgrade instructions {#upgrade-5.6.0}
If you are upgrading to 5.6.0, please follow the detailed [upgrade instructions](#upgrading-tyk).


### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are thrilled to announce new updates and improvements in Tyk 5.6.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.6.0">}}) below.

#### Per endpoint Rate Limiting for clients

Now you can configure rate limits at the [endpoint level per client]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}), using new configuration options in the access key. Use Tyk's powerful [security policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) to create templates to set appropriate rate limits for your different categories of user.

#### Gateway logs in JSON format

You can now output Tyk Gateway system logs in JSON format. This allows for easier integration with logging systems and more structured log data.

#### Go upgrade to 1.22

We’ve upgraded the Tyk Gateway to Golang 1.22, bringing improved performance, better security, and enhanced stability to the core system.

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.6.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.6.0
    ``` 
- Helm charts
  TBP (To Be Published separately after the release) 
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

Building on the [per-endpoint upstream rate limits]({{< ref "getting-started/key-concepts/rate-limiting#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have now added [per-endpoint client rate limits]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}). This new feature allows for more granular control over client consumption of API resources by associating the rate limit with the access key, enabling you to manage and optimize API usage more effectively.
</details>
</li>
<li>
<details>
<summary>New option to generate Gateway system logs in JSON format</summary>

The Tyk Gateway now supports logging in JSON format. To enable this feature, set the environment variable `TYK_GW_LOGFORMAT` to `json`. If a different value is provided, the logs will default to the standard format. This enhancement allows for improved log processing and integration with various monitoring tools.
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

The Tyk Gateway and Tyk Dashboard have been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance, strengthened security, and access to the latest features available in the new Golang release.
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
<summary>Improved Gateway Synchronization with MDCB for Policies and APIs</summary>

We have enhanced the Tyk Gateway's synchronization with MDCB to ensure more reliable loading of policies and APIs. A synchronous initialization process has been implemented to prevent startup failures and reduce the risk of service disruptions caused by asynchronous operations. This update ensures smoother and more consistent syncing of policies and APIs from MDCB.
</details>
</li>
<li>
<details>
<summary>uota wasn't respected under extreme load</summary>

We have fixed an issue where the quota limit was not being consistently respected during request spikes, especially in deployments with multiple gateways. The problem occurred when multiple gateways cached the current and remaining quota counters at the end of quota periods. To address this, a distributed lock mechanism has been implemented, ensuring coordinated quota resets and preventing discrepancies across gateways.
</details>
</li>

<li>
<details>
<summary>Restored key creation performance to Gateway 4.0.12/4.3.3 levels</summary>

We have addressed a performance regression in gateway versions 4.0.13 and later, where key creation for policies with a large number of APIs (100+) became significantly slower. The operation, which previously took around 1.5 seconds in versions 4.0.0 to 4.0.12, was taking over 20 seconds in versions 4.0.13 and beyond. This issue has been resolved by optimizing Redis operations during key creation, restoring the process to its expected speed of approximately 1.5 seconds, even with a large number of APIs in the policy.
</details>
</li>
</ul>


<!-- #### Security Fixes -->
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
<summary>Add a new CVE list</summary>

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security vulnerabilities:
- [CVE to add](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
</details>
</li>
</ul> -->

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
