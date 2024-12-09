---
title: Tyk Gateway 5.7 Release Notes
date: 2024-10-08T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.6.X series."
tags: ["Tyk Gateway", "Release notes", "v5.7", "5.7.0", "5.7", "changelog"]
---

<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.7.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Minor releases are supported only until the next minor comes out.

---

## 5.7.0 Release Notes

### Release Date 03 December 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are thrilled to announce new updates and improvements in Tyk 5.7.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.0">}}) below.

#### Tyk Streams - asynchronous API management with Tyk

Tyk is now entering the asynchronous API management space with a bang by delivering Tyk Streams to our users!
Many API management solutions fail to fully support event-driven architectures, causing fragmented management, inconsistent security practices, and increased operational complexity. With event-driven architectures on the rise recently, keeping everything under control and enforcing standards at the organizational level has become a challenge.

**Tyk Streams** is an event streaming solution available within the Tyk API Management Platform, which applies proven API management principles to simplify event and streams handling. 
This release brings capabilities to stream data and events using Kafka, Websocket, SSE and HTTP protocols. It also becomes possible to mediate the message format between Avro and JSON on the fly.

- Merge together various sources of events to present to consumers as a unified stream.
- Apply authentication and authorization to streams of messages, just as you do for your RESTful APIs
- Expose async APIs via Tyk Portal, so that they are easily discoverable

All of this possible in self-managed and k8s deployments of Tyk!

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

### Dependencies {#dependencies-5.7.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.7.0 | MDCB v2.7.2     | MDCB v2.4.2 |
|         | Operator v1.1.0  | Operator v0.17 |
|         | Sync v2.0.1    | Sync v1.4.3 |
|         | Helm Chart v2.2  | Helm all versions |
| | EDP v1.12 | EDP all versions |
| | Pump v1.11.1 | Pump all versions |
| | TIB (if using standalone) v1.6.1 | TIB all versions |

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
In 5.7.0, we have deprecated the dedicated [External OAuth]({{< ref "basic-config-and-security/security/authentication-authorization/ext-oauth-middleware" >}})  (Tyk Classic: `external_oauth`, Tyk OAS: `server.authentication.securitySchemes.externalOAuth`) and [OpenID Connect]({{< ref "api-management/authentication-authorization#use-openid-connect" >}})  (Tyk Classic: `auth_configs.oidc`, Tyk OAS: `server.authentication.oidc`) authentication methods. We advise users to switch to [JWT Authentication]({{< ref "api-management/authentication-authorization#use-json-web-tokens-jwt" >}}).

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.7.0}
If you are upgrading to 5.7.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.7.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.7.0
    ``` 
- Helm charts
  - [tyk-charts v2.2.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.2.md" >}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.7.0}
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
<summary>Added Stream Analytics Error Handling</summary>

Added to Streams analytics capability to capture and report common error scenarios, including broker connectivity issues and standard HTTP errors, ensuring comprehensive request tracking for Streams-processed requests.
</details>
</li>
<li>
<details>
<summary>Integrated Streams Validator with Streams API</summary>

Connected the new OAS validator to the /streams endpoint, adding proper error handling and validation responses for invalid stream configurations.
</details>
</li>
<li>
<details>
<summary>Extended Streams Configuration Validation</summary>

Extended the OAS validator to include Streams configuration validation, enforcing allowlisted components and validating nested broker configurations while implementing schema validation for Streams configurations.
</details>
</li>
<li>
<details>
<summary>New Streams Configuration Validator</summary>

Introduced a new validator derived from the existing OAS schema, adapting it for Streams validation with modified requirements for upstreamURL and x-tyk-streaming fields. This validator is now used by both the Dashboard API streams endpoint and streams configuration validator.
</details>
</li>
<li>
<details>
<summary>Added Logging for Streams</summary>

Refined streams logging behavior to match Tyk's logging patterns, reducing unnecessary log output and improving log clarity.
</details>
</li>
<li>
<details>
<summary>Simplified Streams Configuration Support</summary>

Implemented allowlist-based validation for components in streams configurations, replacing the previous blocklist approach. Supported components now include Kafka, WebSocket, SSE, and HTTP for both inputs and outputs (including broker combinations), along with JSON-Avro bidirectional conversion processors, while other components like scanners, caches, and buffers are blocked by default. This validation is enforced consistently across Gateway, Dashboard API, and UI.
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
<summary>Resolved HTTP Input Timeout in Tyk Streams</summary>

When using Tyk Streams and sending input via http, the requests sometimes timed out causing a problem for the consumers. The issue has been fixed and now inputs via http for Tyk Streams work as intended.
</details>
</li>
<li>
<details>
<summary>Improved backwards compatibility when working with Tyk OAS APIs</summary>

Fixed a backwards compatibility issue with Tyk OAS API schema validation. When downgrading from a Tyk version, schema validation could fail if new fields had been added to the Tyk OAS API definition. This change relaxes the strictness of validation to allow additional properties.
</details>
</li>
<li>
<details>
<summary>Fixed Policy Merge Issue with Path-Based Permissions</summary>

Resolved a bug where path-based permissions in policies were not preserved when policies were combined, potentially omitting URL values and incorrectly restricting access. The updated behavior ensures that URL access rights from all applicable policies are merged, regardless of policy order, allowing seamless enforcement of combined permissions.
</details>
</li>
<li>
<details>
<summary>Optimized Gateway Handling for Large Payloads</summary>

Fixed an issue that caused increased memory consumption when proxying large response payloads. The Gateway now handles large payloads more efficiently in terms of speed and memory usage.
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
