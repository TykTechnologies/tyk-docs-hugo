---
title: Tyk Gateway Release Notes
date: 2024-10-08T15:51:11Z
description:
  "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.6.X series."
tags: ["Tyk Gateway", "Release notes", "v5.6", "5.6.0", "5.6.1", "5.6", "changelog"]
aliases:
  - /product-stack/tyk-gateway/release-notes/overview
  - /product-stack/tyk-gateway/release-notes/version-3.0
  - /product-stack/tyk-gateway/release-notes/version-3.1
  - /product-stack/tyk-gateway/release-notes/version-3.2
  - /product-stack/tyk-gateway/release-notes/version-4.0
  - /product-stack/tyk-gateway/release-notes/version-4.1
  - /product-stack/tyk-gateway/release-notes/version-4.2
  - /product-stack/tyk-gateway/release-notes/version-4.3
  - /product-stack/tyk-gateway/release-notes/version-5.0
  - /product-stack/tyk-gateway/release-notes/version-5.1
  - /product-stack/tyk-gateway/release-notes/version-5.2
  - /product-stack/tyk-gateway/release-notes/version-5.3
  - /product-stack/tyk-gateway/release-notes/version-5.4
  - /product-stack/tyk-gateway/release-notes/version-5.5
  - /product-stack/tyk-gateway/release-notes/version-5.6
  - /product-stack/tyk-gateway/release-notes/version-5.7
  - /release-notes/version-3.0
  - /release-notes/version-3.1
  - /release-notes/version-3.2
  - /release-notes/version-4.0
  - /release-notes/version-4.1
  - /release-notes/version-4.2
  - /release-notes/version-4.3
  - /release-notes/version-5.0
  - /release-notes/version-5.1
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for Gateway displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.7 Release Notes

### 5.7.2 Release Notes

#### Release Date 19 February 2025

#### Release Highlights

Gateway 5.7.2 was version bumped only to align with Dashboard 5.7.2. Subsequently, no changes were made in this release. For further information, please see the release notes for [Dashboard v5.7.2]({{< ref "developer-support/release-notes/dashboard#572-release-notes" >}})

#### Breaking Changes
There are no breaking changes in this release.

#### Dependencies {#dependencies-5.7.2}


##### Compatibility Matrix For Tyk Components
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.7.2 | MDCB v2.7.2     | MDCB v2.4.2 |
|         | Operator v1.1.0  | Operator v0.17 |
|         | Sync v2.0.2    | Sync v1.4.3 |
|         | Helm Chart v2.2  | Helm all versions |
| | EDP v1.12 | EDP all versions |
| | Pump v1.11.1 | Pump all versions |
| | TIB (if using standalone) v1.6.1 | TIB all versions |

##### 3rd Party Dependencies & Tools


| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.23  |  1.23  | [Go plugins]({{< ref "api-management/plugins/golang" >}}) must be built using Go 1.23 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.


#### Upgrade instructions {#upgrade-5.7.1}
If you are upgrading to 5.7.2, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.7.2)
  - ```bash
    docker pull tykio/tyk-gateway:v5.7.2
    ``` 
- Helm charts
  - [tyk-charts v2.2.0]({{<ref "developer-support/release-notes/helm-chart#220-release-notes" >}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.7.2} 

Since this release was version bumped only to align with Dashboard v5.7.2, no changes were made in this release.

---

### 5.7.1 Release Notes

#### Release Date 31 December 2024

#### Release Highlights

This release focuses mainly on bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.1">}}) below.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.7.1}


##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.7.1 | MDCB v2.7.2     | MDCB v2.4.2 |
|         | Operator v1.1.0  | Operator v0.17 |
|         | Sync v2.0.1    | Sync v1.4.3 |
|         | Helm Chart v2.2  | Helm all versions |
| | EDP v1.12 | EDP all versions |
| | Pump v1.11.1 | Pump all versions |
| | TIB (if using standalone) v1.6.1 | TIB all versions |

##### 3rd Party Dependencies & Tools


| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.22  |  1.22  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.


#### Upgrade instructions {#upgrade-5.7.1}
If you are upgrading to 5.7.1, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.7.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.7.1
    ``` 
- Helm charts
  - [tyk-charts v2.2.0]({{<ref "developer-support/release-notes/helm-chart#220-release-notes" >}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.7.1} 
##### Fixed

<ul>
<li>
<details>
<summary>Incomplete traffic logs generated if custom response plugin adjusts the payload length</summary>

Resolved an issue where the response body could be only partially recorded in the traffic log if a custom response plugin modified the payload. This was due to Tyk using the original, rather than the modified, content-length of the response when identifying the data to include in the traffic log.
</details>
</li>
<li>
<details>
<summary>Fixed OAuth client creation issue for custom plugin APIs in multi-data plane deployments</summary>

Fixed a bug that prevented the control plane Gateway from loading APIs that use custom plugin bundles. The control plane Gateway is used to register OAuth clients and generate access tokens so this could result in an API being loaded to the data plane Gateways but clients unable to obtain access tokens. This issue was introduced in v5.3.1 as a side-effect of a change to address a potential security issue where APIs could be loaded without their custom plugins.
</details>
</li>
<li>
<details>
<summary>Accurate debug logging restored for middleware</summary>

Addressed an issue where shared loggers caused debug logs to misidentify the middleware source, complicating debugging. Log entries now correctly indicate which middleware generated the log, ensuring clearer and more reliable diagnostics
</details>
</li>
<li>
<details>
<summary>Improved Stability for APIs with Malformed Listen Paths</summary>

Fixed an issue where a malformed listen path could cause the Gateway to crash. Now, such listen paths are properly validated, and if validation fails, an error is logged, and the API is skipped—preventing Gateway instability.
</details>
</li>
<li>
<details>
<summary>Fixed Gateway panic and SSE streaming issue with OpenTelemetry</summary>

Resolved a bug that prevented upstream server-sent events (SSE) from being sent when OpenTelemetry was enabled, and fixed a gateway panic that occurred when detailed recording was active while SSE was in use. This ensures stable SSE streaming in configurations with OpenTelemetry.
</details>
</li>
<li>
<details>
<summary>API Keys remain active after all linked partitioned policies are deleted</summary>

Resolved an issue where API access keys remained valid even if all associated policies were deleted. The Gateway now attempts to apply all linked policies to the key when it is presented with a request. Warning logs are generated if any policies cannot be applied (for example, if they are missing). If no linked policy can be applied, the Gateway will reject the key to ensure no unauthorized access.
</details>
</li>
<li>
<details>
<summary>Fixed Payload Issue with Transfer-Encoding: chunked Header</summary>

Resolved an issue where APIs using the Transfer-Encoding: chunked header alongside URL Rewrite or Validate Request middleware would lose the response payload body. The payload now processes correctly, ensuring seamless functionality regardless of header configuration.
</details>
</li>
<li>
<details>
<summary>Fixed an issue where OAuth 2.0 access tokens would not be issued if the data plane was disconnected from the control plane</summary>

OAuth 2.0 access tokens can now be issued even when data plane gateways are disconnected from the control plane. This is achieved by saving OAuth clients locally within the data plane when they are pulled from RPC.
</details>
</li>
<li>
<details>
<summary>Tyk Now Supports RSA-PSS Signed JWTs</summary>

Tyk now supports RSA-PSS signed JWTs (PS256, PS384, PS512), enhancing security while maintaining backward compatibility with RS256. No configuration changes are needed—just use RSA public keys, and Tyk will validate both algorithms seamlessly.
</details>
</li>
<li>
<details>
<summary>Request size limit middleware would block any request without a payload (for example GET, DELETE)</summary>


Resolved a problem in the request size limit middleware that caused GET and DELETE requests to fail validation.The middleware incorrectly expected a request body (payload) for these methods and blocked them when none was present.
</details>
</li>
<li>
<details>
<summary>Resolved Variable Input Handling for Custom Scalars in GraphQL Queries</summary>

Fixed an issue where GraphQL queries using variables for custom scalar types, such as UUID, failed due to incorrect input handling. Previously, the query would return an error when a variable was used but worked when the value was directly embedded in the query. This update ensures that variables for custom scalar types are correctly inferred and processed, enabling seamless query execution.
</details>
</li>
</ul>

---

### 5.7.0 Release Notes

#### Release Date 03 December 2024

#### Release Highlights

We are thrilled to announce new updates and improvements in Tyk 5.7.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.0">}}) below.

##### Tyk Streams - asynchronous API management with Tyk

Tyk is now entering the asynchronous API management space with a bang by delivering Tyk Streams to our users!
Many API management solutions fail to fully support event-driven architectures, causing fragmented management, inconsistent security practices, and increased operational complexity. With event-driven architectures on the rise recently, keeping everything under control and enforcing standards at the organizational level has become a challenge.

**Tyk Streams** is an event streaming solution available within the Tyk API Management Platform, which applies proven API management principles to simplify event and streams handling. 
This release brings capabilities to stream data and events using Kafka, Websocket, SSE and HTTP protocols. It also becomes possible to mediate the message format between Avro and JSON on the fly.

- Merge together various sources of events to present to consumers as a unified stream.
- Apply authentication and authorization to streams of messages, just as you do for your RESTful APIs
- Expose async APIs via Tyk Portal, so that they are easily discoverable

All of this possible in self-managed and k8s deployments of Tyk!

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.7.0}


##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools


| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.22  |  1.22  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
In 5.7.0, we have deprecated the dedicated [External OAuth]({{< ref "basic-config-and-security/security/authentication-authorization/ext-oauth-middleware" >}})  (Tyk Classic: `external_oauth`, Tyk OAS: `server.authentication.securitySchemes.externalOAuth`) and [OpenID Connect]({{< ref "api-management/client-authentication#integrate-with-openid-connect-deprecated" >}})  (Tyk Classic: `auth_configs.oidc`, Tyk OAS: `server.authentication.oidc`) authentication methods. We advise users to switch to [JWT Authentication]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}).


#### Upgrade instructions {#upgrade-5.7.0}
If you are upgrading to 5.7.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.7.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.7.0
    ``` 
- Helm charts
  - [tyk-charts v2.2.0]({{<ref "developer-support/release-notes/helm-chart#220-release-notes" >}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.7.0}


##### Added

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

##### Fixed

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
<summary>Resolved API Routing Issue with Trailing Slashes and Overlapping Listen Paths</summary>

Fixed a routing issue that caused incorrect API matching when dealing with APIs that lacked a trailing slash, used custom domains, or had similar listen path patterns. Previously, the router prioritized APIs with longer subdomains and shorter listen paths, leading to incorrect matches when listen paths shared prefixes. This fix ensures accurate API matching, even when subdomains and listen paths overlap.
</details>
</li>
<li>
<details>
<summary>Optimized Gateway Handling for Large Payloads</summary>

Fixed an issue that caused increased memory consumption when proxying large response payloads. The Gateway now handles large payloads more efficiently in terms of speed and memory usage.
</details>
</li>
</ul>

## 5.6 Release Notes

### 5.6.1 Release Notes

#### Release Date 18 October 2024

#### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.6.1 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.6.1">}}) below.

#### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.6.1}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                    |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                         |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->

#### Upgrade instructions {#upgrade-5.6.1}

If you are upgrading to 5.6.1, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.6.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.6.1
    ```
- Helm charts

  - [tyk-charts v2.1.0]({{<ref "developer-support/release-notes/helm-chart#210-release-notes">}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.6.1}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed

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
##### Security Fixes
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

### 5.6.0 Release Notes

#### Release Date 10 October 2024

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

#### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

We are thrilled to announce new updates and improvements in Tyk 5.6.0, bringing more control, flexibility, and
performance. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.6.0">}}) below.

##### Per endpoint Rate Limiting for clients

Building on the [per-endpoint upstream rate
limits]({{< ref "api-management/rate-limit#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have
now added [per-endpoint client
rate limits]({{< ref "api-management/rate-limit#key-level-rate-limiting" >}}). This new feature allows
for more granular control over client consumption of API resources by associating the rate limit with the access key,
enabling you to manage and optimize API usage more effectively.

##### Gateway logs in JSON format

You can now output Tyk Gateway system logs in JSON format. This allows for easier integration with logging systems and
more structured log data.

##### Go upgrade to 1.22

We’ve upgraded the Tyk Gateway to Golang 1.22, bringing improved performance, better security, and enhanced stability to
the core system.

#### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.6.0}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                    |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                         |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->

#### Upgrade instructions {#upgrade-5.6.0}

If you are upgrading to 5.6.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.6.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.6.0
    ```
- Helm charts

  - [tyk-charts v2.1.0]({{<ref "developer-support/release-notes/helm-chart#210-release-notes">}})

- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.6.0}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added

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
limits]({{< ref "api-management/rate-limit#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have
added [per-endpoint client
rate limits]({{< ref "api-management/rate-limit#key-level-rate-limiting" >}}). This new feature
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

##### Changed

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

##### Fixed

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

##### Security Fixes

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

## 5.5 Release Notes

### 5.5.2 Release Notes

#### Release Date 03 October 2024

#### Release Highlights
This release replaces Tyk Gateway 5.5.1 which was accidentally released as a non-distroless image.


#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.5.2}

##### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.2 | MDCB v2.7     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.5.2}
If you are upgrading to 5.5.2, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.2)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.2
    ``` 
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "developer-support/release-notes/helm-chart#200-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

---

### 5.5.1 Release Notes

#### Release Date 26 September 2024

#### Release Highlights
This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway configuration options to control path matching strictness.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.5.1) below.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.5.1}

##### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.1 | MDCB v2.7     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.5.1}
If you are upgrading to 5.5.1, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.1
    ``` 
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "developer-support/release-notes/helm-chart#200-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.5.1}

##### Added

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

##### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based Permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}) in access policies and keys that led to authorization incorrectly being granted to endpoints if an invalid regular expression was configured in the key/policy. Also fixed an issue where path-based parameters were not correctly handled by Path-Based Permissions. Now Tyk's authorization check correctly handles both of these scenarios granting access only to the expected resources.
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

### 5.5.0 Release Notes

#### Release Date 12 August 2024

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are thrilled to introduce Tyk Gateway 5.5, bringing advanced rate-limiting capabilities, enhanced certificate authentication, and performance optimizations. For a comprehensive list of changes, please refer to the [changelog]({{< ref "#Changelog-v5.5.0">}}) below.

##### Per Endpoint Rate Limiting

Now configure rate limits at the endpoint level for both [Tyk OAS]({{< ref "api-management/rate-limit#tyk-oas-api-definition" >}}) and [Tyk Classic APIs]({{< ref "api-management/rate-limit#tyk-classic-api-definition" >}}), providing granular protection for upstream services against overloading and abuse.

##### Root CA Support for Client Certificates

Simplify certificate management with support for root Certificate Authority (CA) certificates, enabling clients to authenticate using certificates signed by the [configured root CA]({{< ref "api-management/client-authentication#faq" >}}).

##### Optimised AST Document Handling

Experience improved performance with optimised creation and usage of Abstract Syntax Tree (AST) documents in our GQL library, reducing memory usage and enhancing efficiency.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
Docker images are now based on [distroless](https://github.com/GoogleContainerTools/distroless). No shell is shipped in the image.

#### Dependencies {#dependencies-5.5.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.21  |  1.21  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->

#### Upgrade instructions {#upgrade-5.5.0}
If you are upgrading to 5.5.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.5.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.5.0
    ``` 
- Helm charts
  - [tyk-charts v1.6]({{< ref "developer-support/release-notes/helm-chart#160-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.5.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added
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

##### Fixed
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


##### Security Fixes
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
## 5.4 Release Notes
### 5.4.0 Release Notes

#### Release Date 2 July 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**

We have fixed a bug in the way that Tyk calculates the [key-level rate limit]({{< ref "api-management/rate-limit#key-level-rate-limiting" >}}) when multiple policies are applied to the same key. This fix alters the logic used to calculate the effective rate limit and so may lead to a different rate limit being applied to keys generated from your existing policies. See the [change log](#fixed) for details of the change.

#### Dependencies {#dependencies-5.4.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.19 (GQL), 1.21 (GW)  | 1.19 (GQL), 1.21 (GW)  | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

**The above table needs reviewing and updating if necessary**

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->

#### Upgrade instructions {#upgrade-5.4.0}
If you are upgrading to 5.4.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

Add upgrade steps here if necessary.

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We're thrilled to introduce exciting enhancements in Tyk Gateway 5.4, aimed at improving your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the change log below.

##### Enhanced Rate Limiting Strategies

We've introducing a [Rate Limit Smoothing]({{< ref "api-management/rate-limit#rate-limit-smoothing" >}}) option for the spike arresting Redis Rate Limiter to give the upstream time to scale in response to increased request rates.

##### Fixed MDCB Issue Relating To Replication Of Custom Keys To Dataplanes

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

###### Action Required
Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the changelog for recommended actions.

##### Fixed Window Rate Limiter

Ideal for persistent connections with load-balanced gateways, the [Fixed Window Rate Limiter]({{< ref "api-management/rate-limit#fixed-window-rate-limiter" >}}) algorithm mechanism ensures fair handling of requests by allowing only a predefined number to pass per rate limit window. It uses a simple shared counter in Redis so requests do not need to be evenly balanced across the gateways.

##### Event handling with Tyk OAS

We’ve added support for you to [register webhooks]({{< ref "api-management/gateway-events#event-handling-with-webhooks" >}}) with your Tyk OAS APIs so that you can handle events triggered by the Gateway, including circuit breaker and quota expiry. You can also assign webhooks to be fired when using the new [smoothing rate limiter]({{< ref "api-management/rate-limit#rate-limit-smoothing" >}}) to notify your systems of ongoing traffic spikes.

##### Enhanced Header Handling in GraphQL APIs

Introduced a features object in API definitions for GQL APIs, including the `use_immutable_headers` attribute. This allows advanced header control, enabling users to add new headers, rewrite existing ones, and selectively remove specific headers. Existing APIs will have this attribute set to `false` by default, ensuring no change in behavior. For new APIs, this attribute is true by default, facilitating smoother migration and maintaining backward compatibility.

#### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.4.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.4.0
    ``` 
- Helm charts
  - [tyk-charts v1.5]({{< ref "developer-support/release-notes/helm-chart#150-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.4.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added
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

Introduced a [Fixed Window Rate Limiting]({{< ref "api-management/rate-limit#fixed-window-rate-limiter" >}}) mechanism to handle rate limiting for load balancers with keep-alives. This algorithm allows the defined number of requests to pass for every rate limit window and blocks any excess requests. It uses a simple shared counter in Redis to count requests. It is suitable for situations where traffic towards Gateways is not balanced fairly. To enable this rate limiter, set `enable_fixed_window_rate_limiter` in the gateway config or set the environment variable `TYK_GW_ENABLEFIXEDWINDOWRATELIMITER=true`.
</details>
</li>
<li>
<details>
<summary>Introduced Rate Limit Smoothing for scaling</summary>

Implemented [Rate Limit Smoothing]({{< ref "api-management/rate-limit#rate-limit-smoothing" >}}) as an extension to the existing Redis Rate Limiter to gradually adjust the rate based on smoothing configuration. Two new Gateway events have been created  (`RateLimitSmoothingUp` and `RateLimitSmoothingDown`) which will be triggered as smoothing occurs. These can be used to assist with auto-scaling of upstream capacity during traffic spikes.
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

##### Fixed
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


##### Security Fixes
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

## 5.3 Release Notes

### 5.3.10 Release Notes

#### Release Date 19 February 2025

#### Release Highlights

In this release, we upgraded the Golang version to `v1.23` for security enhancement and fixed an API authentication issue with redirects. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.10">}}) below.

#### Breaking Changes

This release has no breaking changes.

#### Dependencies

##### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.10           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

##### 3rd Party Dependencies & Tools

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      |  1.23 (GW)            |  1.23 (GW)            | [Go plugins]({{< ref "api-management/plugins/golang" >}}) must be built using Go 1.23 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

There are no deprecations in this release 

#### Upgrade Instructions

If you are upgrading to 5.3.10, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.10)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.10
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.10}

##### Fixed

<ul>
<li>
<details>
<summary>Resolved gateway not entering "emergency" mode</summary>

Fixed an issue where the gateway stopped processing traffic when restarted while MDCB was unavailable. Instead of entering "emergency" mode and loading APIs and policies from the Redis backup, the gateway remained unresponsive, continuously attempting to reconnect.
With this fix, the gateway detects connection failure and enters `emergency` mode, ensuring traffic processing resumes even when MDCB is down.
</details>
</li>
<li>
<details>
<summary>Upgraded to Golang 1.23</summary>

Tyk Gateway now runs on Golang 1.23, bringing security and performance improvements. Key changes include unbuffered Timer/Ticker channels, removal of 3DES cipher suites, and updates to X509KeyPair handling. Users may need to adjust their setup for compatibility.
</details>
</li>
<li>
<details>
<summary>Resolved API authentication issue while handling redirects using "tyk://" Scheme</summary>

This fix ensures that when API A redirects to API B using the tyk:// scheme, API B will now correctly authenticate using its own credentials, improving access control and preventing access denials. Users can now rely on the expected authentication flow without workarounds, providing a smoother experience when integrating APIs.
</details>
</li>
</ul>

### 5.3.9 Release Notes

#### Release Date 31 December 2024

#### Release Highlights

This release contains bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.9">}}) below.

#### Breaking Changes

This release has no breaking changes.

#### Dependencies

##### Compatibility Matrix For Tyk Components

| Gateway Version | Recommended Releases                                               | Backwards Compatibility |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| 5.3.9           | MDCB v2.5.1                                                        | MDCB v2.5.1             |
|                 | Operator v0.17                                                     | Operator v0.16          |
|                 | Sync v1.4.3                                                        | Sync v1.4.3             |
|                 | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions       |
|                 | EDP v1.8.3                                                         | EDP all versions        |
|                 | Pump v1.9.0                                                        | Pump all versions       |
|                 | TIB (if using standalone) v1.5.1                                   | TIB all versions        |

##### 3rd Party Dependencies & Tools


| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      |  1.22 (GW)            |  1.22 (GW)            | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

There are no deprecations in this release 

#### Upgrade Instructions

If you are upgrading to 5.3.9, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.9)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.9
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.9}

##### Fixed

<ul>
<li>
<details>
<summary>Incomplete traffic logs generated if custom response plugin adjusts the payload length</summary>

Resolved an issue where the response body could be only partially recorded in the traffic log if a custom response plugin modified the payload. This was due to Tyk using the original, rather than the modified, content-length of the response when identifying the data to include in the traffic log.
</details>
</li>
<li>
<details>
<summary>Fixed OAuth client creation issue for custom plugin APIs in multi-data plane deployments</summary>

Fixed a bug that prevented the control plane Gateway from loading APIs that use custom plugin bundles. The control plane Gateway is used to register OAuth clients and generate access tokens so this could result in an API being loaded to the data plane Gateways but clients unable to obtain access tokens. This issue was introduced in v5.3.1 as a side-effect of a change to address a potential security issue where APIs could be loaded without their custom plugins.
</details>
</li>
<li>
<details>
<summary>Accurate debug logging restored for middleware</summary>

Addressed an issue where shared loggers caused debug logs to misidentify the middleware source, complicating debugging. Log entries now correctly indicate which middleware generated the log, ensuring clearer and more reliable diagnostics
</details>
</li>
<li>
<details>
<summary>Fixed Payload Issue with Transfer-Encoding: chunked Header</summary>

Resolved an issue where APIs using the Transfer-Encoding: chunked header alongside URL Rewrite or Validate Request middleware would lose the response payload body. The payload now processes correctly, ensuring seamless functionality regardless of header configuration.
</details>
</li>
<li>
<details>
<summary>API Keys remain active after all linked partitioned policies are deleted</summary>

Resolved an issue where API access keys remained valid even if all associated policies were deleted. The Gateway now attempts to apply all linked policies to the key when it is presented with a request. Warning logs are generated if any policies cannot be applied (for example, if they are missing). If no linked policy can be applied, the Gateway will reject the key to ensure no unauthorized access.
</details>
</li>
<li>
<details>
<summary>Resolved API routing issue with trailing slashes and overlapping listen paths</summary>

Fixed a routing issue that caused incorrect API matching when dealing with APIs that lacked a trailing slash, used custom domains, or had similar listen path patterns. Previously, the router prioritized APIs with longer subdomains and shorter listen paths, leading to incorrect matches when listen paths shared prefixes. This fix ensures accurate API matching, even when subdomains and listen paths overlap.
</details>
</li>
<li>
<details>
<summary>Improved Stability for APIs with Malformed Listen Paths</summary>

Fixed an issue where a malformed listen path could cause the Gateway to crash. Now, such listen paths are properly validated, and if validation fails, an error is logged, and the API is skipped—preventing Gateway instability.
</details>
</li>
<li>
<details>
<summary>Resolved Variable Input Handling for Custom Scalars in GraphQL Queries</summary>

Fixed an issue where GraphQL queries using variables for custom scalar types, such as UUID, failed due to incorrect input handling. Previously, the query would return an error when a variable was used but worked when the value was directly embedded in the query. This update ensures that variables for custom scalar types are correctly inferred and processed, enabling seamless query execution.
</details>
</li>
<li>
<details>
<summary>Fixed Gateway panic and SSE streaming issue with OpenTelemetry</summary>

Resolved a bug that prevented upstream server-sent events (SSE) from being sent when OpenTelemetry was enabled, and fixed a gateway panic that occurred when detailed recording was active while SSE was in use. This ensures stable SSE streaming in configurations with OpenTelemetry.
</details>
</li>
<li>
<details>
<summary>Fixed an issue where OAuth 2.0 access tokens would not be issued if the data plane was disconnected from the control plane</summary>

OAuth 2.0 access tokens can now be issued even when data plane gateways are disconnected from the control plane. This is achieved by saving OAuth clients locally within the data plane when they are pulled from RPC.
</details>
</li>
<li>
<details>
<summary>Tyk Now Supports RSA-PSS Signed JWTs</summary>

Tyk now supports RSA-PSS signed JWTs (PS256, PS384, PS512), enhancing security while maintaining backward compatibility with RS256. No configuration changes are needed—just use RSA public keys, and Tyk will validate both algorithms seamlessly.
</details>
</li>
<li>
<details>
<summary>Request size limit middleware would block any request without a payload (for example GET, DELETE)</summary>

Resolved a problem in the request size limit middleware that caused GET and DELETE requests to fail validation.The middleware incorrectly expected a request body (payload) for these methods and blocked them when none was present.
</details>
</li>
</ul>

---

### 5.3.8 Release Notes

#### Release Date 07 November 2024

#### Release Highlights

This release focuses mainly on bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.8">}}) below.

#### Breaking Changes

This release has no breaking changes.

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      |  1.22 (GW)            |  1.22 (GW)            | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

This is an advanced notice that the dedicated External OAuth, OpenID Connect (OIDC) authentication options, and SQLite support will be deprecated starting in version 5.7.0. We recommend that users of the [External OAuth]({{< ref "api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}}) and [OpenID Connect]({{< ref "api-management/client-authentication#integrate-with-openid-connect-deprecated" >}}) methods migrate to Tyk's dedicated [JWT Auth]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}) method. Please review your API configurations, as the Gateway logs will provide notifications for any APIs utilizing these methods.


#### Upgrade Instructions

If you are upgrading to 5.3.8, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.8)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.8
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.8}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added
<ul>
<li>
<details>
<summary>Deprecation notice of External OAuth and OpenID Connect options</summary>
A deprecation notice for External OAuth and OpenID Connect (OIDC) authentication mechanisms has been implemented in the Gateway logs starting from version 5.3.8. This provides advanced notification to users regarding any APIs configured with these authentication methods in preparation for future upgrades where these middleware options may be removed in version 5.7.0.
</details>
</li>
</ul>

##### Fixed

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

This update resolves an issue where API keys could be lost if the [keyspace synchronization]({{<ref "api-management/mdcb#synchroniser-feature-with-mdcb">}}) between control and data planes was interrupted. The solution now enforces a resynchronization whenever a connection is re-established between MDCB and the data plane, ensuring key data integrity and seamless API access.
</details>
</li>
</ul>

---

### 5.3.7 Release Notes

#### Release Date 22 October 2024

#### Release Highlights

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.3.7 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.7">}}) below.

#### Breaking Changes

There are no breaking changes in this release.

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.7 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                   |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.7)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.7
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.7}

##### Fixed

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
##### Security Fixes
This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->

---

### 5.3.6 Release Notes

#### Release Date 04 October 2024

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

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.6">}}) below.

#### Breaking Changes

Docker images are now based on [distroless](https://github.com/GoogleContainerTools/distroless). No shell is shipped in
the image.

If moving from an version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.6 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions | Compatible Versions | Comments                                                                                   |
| ------------------------------------------------------------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.22            | 1.22                | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.22 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x      | 6.2.x, 7.x          | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x          | v3.0.x              | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.6)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.6
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.6}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Changed

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

##### Fixed

<ul>
<li>
<details>
<summary>Custom Response Plugins not working for Tyk OAS APIs</summary>

We have resolved an issue where custom [response plugins]({{< ref "api-management/plugins/plugin-types#response-plugins" >}}) were not being
triggered for Tyk OAS APIs. This fix ensures that all [supported]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-feature-status" >}})
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

##### Security Fixes

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

### 5.3.5 Release Notes

#### Release Date 26 September 2024

#### Release Highlights

This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway
configuration options to control path matching strictness. For a comprehensive list of changes, please refer to the
detailed [changelog]({{< ref "#Changelog-v5.3.5">}}) below.

#### Breaking Changes

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.5 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.5)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.5
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.5}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added

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

##### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based
Permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}) in access policies and keys that led to authorization
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

### 5.3.4 Release Notes

#### Release Date August 26th 2024

#### Release Highlights

Gateway 5.3.4 was version bumped only, to align with Dashboard 5.3.4. Subsequently, no changes were encountered in
release 5.3.4. For further information please see the release notes for Dashboard
[v5.3.4]({{< ref "developer-support/release-notes/dashboard#530-release-notes" >}})

#### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.4 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.4)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.4
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.4}

Since this release was version bumped only to align with Dashboard v5.3.4, no changes were encountered in this release.

---

### 5.3.3 Release Notes

#### Release Date August 2nd 2024

#### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.3 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Release Highlights

##### Bug Fixes

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.3">}}) below.

##### FIPS Compliance

Tyk Gateway now offers [FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) compliance. For further
details please consult [Tyk API Management
FIPS support]({{< ref "developer-support/release-notes/special-releases#fips-releases" >}}).

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.3)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.3
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.3}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added

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

Added [FIPS compliance]({{< ref "developer-support/release-notes/special-releases#fips-releases" >}}) for Tyk Gateway.

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

##### Fixed

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

### 5.3.2 Release Notes

#### Release Date 5th June 2024

#### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.2 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.2">}}) below.

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.2)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.2
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.2}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed

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

### 5.3.1 Release Notes

#### Release Date 24 April 2024

#### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from an version of Tyk older than 5.3.0 please read the
explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations

There are no deprecations in this release.

#### Upgrade Instructions

When upgrading to 5.3.1 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed
[changelog]({{< ref "#Changelog-v5.3.1">}}) below.

#### Dependencies

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.1)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.1
    ```
- Helm charts
  - [tyk-charts v1.3]({{< ref "developer-support/release-notes/helm-chart#130-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.1}

##### Fixed

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

### 5.3.0 Release Notes

#### Release Date 5 April 2024

#### Breaking Changes

<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

**Attention: Please read this section carefully**

##### Tyk OAS APIs Compatibility Caveats - Tyk OSS {#TykOAS-v5.3.0}

This upgrade transitions Tyk OAS APIs out of [Early Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}).

For licensed deployments (Tyk Cloud, Self Managed including MDCB), please refer to the [release notes of Tyk Dashboard 5.3.0]({{<ref "developer-support/release-notes/dashboard#530-release-notes">}}).

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
    v5.3.X without being migrated to its [latest format]({{<ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object">}}).
- **After upgrade (the good news)**
  - Tyk OAS API definitions that are part of the file system **are not automatically converted** to the [new
    format]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}). Subsequently, users will have to manually update their
    OAS API Definitions to the new format.
  - If users upgrade to 5.3.0, create new Tyk OAS APIs and then decide to rollback then the upgrade is non-reversible.
    Reverting to your previous version requires restoring from a backup.

**Important:** Please go to the [backup]({{< ref "#upgrade-instructions" >}}) section for detailed instructions on
backup before upgrading to v5.3.0

##### Python plugin support

Starting from Tyk Gateway version v5.3.0, Python is no longer bundled with the official Tyk Gateway Docker image to
reduce exposure to security vulnerabilities in the Python libraries.

Whilst the Gateway still supports Python plugins, you must [extend
the image]({{< ref "api-management/plugins/rich-plugins#install-the-python-development-packages" >}})
to add the language support.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc. -->
<!-- ##### Planned Breaking Changes -->

#### Dependencies {#dependencies-5.3.0}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components

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

##### 3rd Party Dependencies & Tools

<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                        | Tested Versions       | Compatible Versions   | Comments                                                                                   |
| ------------------------------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| [Go](https://go.dev/dl/)                                      | 1.19 (GQL), 1.21 (GW) | 1.19 (GQL), 1.21 (GW) | [Go plugins]({{< ref "api-management/plugins/golang#" >}}) must be built using Go 1.21 |
| [Redis](https://redis.io/download/)                           | 6.2.x, 7.x            | 6.2.x, 7.x            | Used by Tyk Gateway                                                                        |
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x                | v3.0.x                | Supported by [Tyk OAS]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}})           |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the
ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

In 5.3.0, we have simplified the configuration of response transform middleware. We encourage users to embrace the
`global_headers` mechanism as the `response_processors.header_injector` is now an optional setting and will be removed
in a future release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->

#### Upgrade instructions {#upgrade-5.3.0}

If you are upgrading to 5.3.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

**The following steps are essential to follow before upgrading** Tyk Cloud (including Hybrid Gateways) and Self Managed
users - Please refer to the [release notes of Tyk Dashboard 5.3.0]({{<ref "developer-support/release-notes/dashboard#530-release-notes">}}).

For OSS deployments -

1. Backup Your environment using the [usual guidance]({{<ref "developer-support/upgrading">}}) documented with every release (this includes
   backup config file and database).
2. Backup all your API definitions (Tyk OAS API and Classic Definitions) by saving your API and policy files or by
   exporting them using the `GET /tyk/apis` and `Get /tyk/policies`
3. Performing the upgrade - follow the instructions in the [upgrade
   guide]({{<ref "developer-support/upgrading">}}) when upgrading Tyk.

#### Release Highlights

<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->

We’re thrilled to announce the release of 5.3.0, an update packed with exciting features and significant fixes to
elevate your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed
[changelog](#Changelog-v5.3.0) below.

##### Tyk OAS Feature Maturity

Tyk OAS is now out of [Early
Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}) as we have reached feature maturity.
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

##### Enhanced KV storage of API Definition Fields

Tyk is able to store configuration data from the API definition in KV systems, such as Vault and Consul, and then
reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway. Previously this was
limited to the Target URL and Listen Path but from 5.3.0 you are able to store any `string` type field from your API
definition, unlocking the ability to store sensitive information in a centralised location. For full details check out
the [documentation]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}}) of this powerful feature.

##### Redis v7.x Compatibility

We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible
with Redis v7.x.

##### Gateway and Component Upgrades

We've raised the bar with significant upgrades to our Gateway and components. Leveraging the power and security of Go
1.21, upgrading Sarama to version 1.41.0 and enhancing the GQL engine with Go version 1.19, we ensure improved
functionality and performance to support your evolving needs seamlessly.

#### Downloads

- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.3.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.3.0
    ```
- Helm charts
  - [tyk-charts v1.3]({{< ref "developer-support/release-notes/helm-chart#130-release-notes" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

#### Changelog {#Changelog-v5.3.0}

<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added

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
key]({{< ref "portal/api-provider#configure-rate-limits" >}})
within session metadata. This increases flexibility with rate limiting, as the rate limit can be assigned to different entities
identifiable from the session metadata (such as a client app or organization) and is particularly useful for users of Tyk's
Enterprise Developer Portal.

</details>
</li>
</ul>

##### Changed

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
Rate Limiter]({{< ref "api-management/rate-limit#redis-rate-limiter" >}})). Previously the complete
request log would be retrieved from Redis. With this enhancement only the count of the requests in the window is
retrieved, optimizing the interaction with Redis and decreasing the Gateway memory usage.

</details>
</li>
</ul>
 
##### Fixed
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

##### Security Fixes

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

## 5.2 Release Notes

### 5.2.5 Release Notes

#### Release Date 19 Dec 2023

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
This release implements a bug fix.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.5">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.5/images/sha256-c09cb03dd491e18bb84a0d9d4e71177eb1396cd5debef694f1c86962dbee10c6?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.5)

#### Changelog {#Changelog-v5.2.5}

##### Fixed
<ul>
 <li>
 <details>
 <summary>Long custom keys not maintained in distributed Data Planes</summary>

Fixed an issue where custom keys over 24 characters in length were deleted from Redis in the Data Plane when key update action signalled in distributed (MDCB) setups.
 </details>
 </li>
 </ul>

---

### 5.2.4 Release Notes

#### Release Date 7 Dec 2023

#### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
This release enhances security, stability, and performance.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.4">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.4/images/sha256-c0d9e91e4397bd09c85adf4df6bc401b530ed90c8774714bdafc55db395c9aa5?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.4)

#### Changelog {#Changelog-v5.2.4}

##### Fixed
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

### 5.2.3 Release Notes

#### Release Date 21 Nov 2023

#### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
This release enhances security, stability, and performance.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.3">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.3/images/sha256-8a94658c8c52ddfe30f78c5438dd4308c4d019655d8af7773a33fdffda097992?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.3)

#### Changelog {#Changelog-v5.2.3}

##### Fixed

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

##### Added

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

Added new option for Tyk to use the default version of an API if the requested version does not exist. This is referred to as falling back to default and is enabled using a [configuration]({{< ref "api-management/gateway-config-tyk-oas#versioning" >}}) flag in the API definition; for Tyk OAS APIs the flag is `fallbackToDefault`, for Tyk Classic APIs it is `fallback_to_default`.
</details>
</li>
<li>
<details>
<summary>Implemented a backoff limit for GraphQL subscription connection retry</summary>

Added a backoff limit for GraphQL subscription connection retry to prevent excessive error messages when the upstream stops working. The connection retries and linked error messages now occur in progressively longer intervals, improving error handling and user experience.
</details>
</li>
</ul>

##### Community Contributions

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

### 5.2.2 Release Notes

#### Release Date 31 Oct 2023

#### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.2">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.2/images/sha256-84d9e083872c78d854d3b469734ce40b7e77b9963297fe7945e214a0e6ccc614?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.2)

#### Changelog {#Changelog-v5.2.2}

##### Security

The following CVEs have been resolved in this release:

- [CVE-2022-40897](https://nvd.nist.gov/vuln/detail/CVE-2022-40897)
- [CVE-2022-1941](https://nvd.nist.gov/vuln/detail/CVE-2022-1941)
- [CVE-2021-23409](https://nvd.nist.gov/vuln/detail/CVE-2021-23409)
- [CVE-2021-23351](https://nvd.nist.gov/vuln/detail/CVE-2021-23351)
- [CVE-2019-19794](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)
- [CVE-2018-5709](https://nvd.nist.gov/vuln/detail/CVE-2018-5709)
- [CVE-2010-0928](https://nvd.nist.gov/vuln/detail/CVE-2010-0928)
- [CVE-2007-6755](https://nvd.nist.gov/vuln/detail/CVE-2007-6755)



##### Fixed

<ul>
<li>
<details>
<summary>Enforced timeouts were incorrect on a per-request basis</summary>

Fixed an issue where [enforced timeouts]({{< ref "tyk-self-managed#enforced-timeouts" >}}) values were incorrect on a per-request basis. Since we enforced timeouts only at the transport level and created the transport only once within the value set by [max_conn_time]({{< ref "tyk-oss-gateway/configuration#max_conn_time" >}}), the timeout in effect was not deterministic. Timeouts larger than 0 seconds are now enforced for each request.
</details>
</li>
<li>
<details>
<summary>Incorrect access privileges were granted in security policies</summary>

Fixed an issue when using MongoDB and [Tyk Security Policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This was due to the policy cleaning operation that is triggered when an API is deleted from a policy in a MongoDB installation. With this fix, the policy cleaning operation will not remove the final (deleted) API from the policy; Tyk recognizes that the API record is invalid and denies granting access rights to the key.
</details>
</li>
<li>
<details>
<summary>Logstash formatter timestamp was not in RFC3339 Nano format</summary>

The [Logstash]({{< ref "api-management/logs-metrics#logstash" >}}) formatter timestamp is now in [RFC3339Nano](https://www.rfc-editor.org/rfc/rfc3339) format.
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

Fixed a performance issue encountered when Tyk Gateway retrieves a key via MDCB for a JWT API. The token is now validated against [JWKS or the public key]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}) in the API Definition.
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

##### Community Contributions

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

### 5.2.1 Release Notes

#### Release Date 10 Oct 2023

#### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are on a 5.2.0 we advise you to upgrade ASAP and if you are on an older version skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.1/images/sha256-47cfffda64ba492f79e8cad013a476f198011f5a97cef32464f1f47e1a9be9a2?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.2)

#### Changelog {#Changelog-v5.2.1}

##### Changed

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

##### Fixed

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

Fixed an issue with GraphQL APIs, where [headers]({{< ref "api-management/graphql#graphql-apis-headers" >}}) were not properly forwarded upstream for [GQL/UDG subscriptions]({{< ref "api-management/graphql#graphql-subscriptions" >}}).
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

Resolved a bug with HTTP GraphQL APIs where, when the [Persist GraphQL middleware]({{< ref "api-management/graphql#persisting-graphql-queries" >}}) was used in combination with [Response Body Transform]({{< ref "api-management/traffic-transformation#response-body-overview" >}}), the response's body transformation was not being executed.
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


##### Dependencies
- Updated TykTechnologies/gorm to v1.21 in Tyk Gateway

---

### 5.2.0 Release Notes

#### Release Date 29 Sep 2023

#### Breaking Changes
**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

##### Added Body Transform Middleware to Tyk OAS API Definition

With this release, we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "api-management/gateway-config-tyk-oas#transformbody" >}}) middleware for both [request]({{< ref "api-management/traffic-transformation#request-body-overview" >}}) and [response]({{< ref "api-management/traffic-transformation#response-body-overview" >}}) body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool.

##### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the *Tyk OAS API definition* from within your custom *Go Plugins*, bringing them up to standard alongside those you might use with a *Tyk Classic API*.

##### Configure Caching For Each API Endpoint

We’ve added the ability to [configure]({{< ref "api-management/gateway-optimizations#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

##### Added Header Management in Universal Data Graph

With this release we are adding a concept of [header management]({{< ref "api-management/data-graph#header-management" >}}) in *Universal Data Graph*. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All *Universal Data Graph* headers now have access to *request context* variables like *JWT claims*, *IP address* of the connecting client or *request ID*. This provides extensive configurability of customizable information that can be sent upstream.

##### Added Further Support For GraphQL WebSocket Protocols

Support for [WebSocket]({{< ref "api-management/graphql#graphql-websockets" >}}) protocols between client and the *Gateway* has also been expanded. Instead of only supporting the *graphql-ws protocol*, which is becoming deprecated, we now also support [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) by setting the *Sec-WebSocket-Protocol* header to *graphql-transport-ws*.

##### Added OpenTelemetry Tracing

In this version, we're introducing the support for *OpenTelemetry Tracing*, the new [open standard](https://opentelemetry.io/) for exposing observability data. This addition gives you improved visibility into how API requests are processed, with no additional license required. It is designed to help you with monitoring and troubleshooting APIs, identify bottlenecks, latency issues and errors in your API calls. For detailed information and guidance, you can check out our [OpenTelemetry Tracing]({{< ref "api-management/logs-metrics#opentelemetry" >}}) resource.

*OpenTelemetry* makes it possible to isolate faults within the request lifetime through inspecting API and Gateway meta-data. Additionally, performance bottlenecks can be identified within the request lifetime. API owners and developers can use this feature to understand how their APIs are being used or processed within the Gateway.

*OpenTelemetry* functionality is also available in [Go Plugins]({{< ref "api-management/plugins/advance-config#instrumenting-plugins-with-opentelemetry" >}}). Developers can write code to add the ability to preview *OpenTelemetry* trace attributes, error status codes etc., for their Go Plugins.

We offer support for integrating *OpenTelemetry* traces with supported open source tools such [Jaeger]({{< ref "api-management/logs-metrics#using-docker" >}}), [Dynatrace]({{< ref "api-management/logs-metrics#dynatrace" >}}) or [New Relic]({{< ref "api-management/logs-metrics#new-relic" >}}). This allows API owners and developers to gain troubleshooting and performance insights from error logs, response times etc.
You can also find a direct link to our docs in the official [OpenTelemetry Integration page](https://opentelemetry.io/ecosystem/integrations/)

{{< warning success >}}
**Warning**

*Tyk Gateway 5.2* now includes *OpenTelemetry Tracing*. Over the next year, we'll be deprecating *OpenTracing*. We recommend migrating to *OpenTelemetry* for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

{{< /warning >}}

#### Downloads

- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.0/images/sha256-cf0c57619e8285b1985bd5e4bf86b8feb42abec56cbc241d315cc7f8c0d43025?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.0)

#### Changelog {#Changelog-v5.2.0}

##### Added:

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

Added configuration parameter to enable/disable [detail_tracing]({{< ref "api-management/logs-metrics#enable-detailed-tracing-at-api-level-optional" >}}) for *Tyk Classic API*.
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

Added a new [timeout option]({{< ref "api-management/gateway-optimizations#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}), offering granular control over cache timeout at the endpoint level.
</details>
</li>
<li>
<details>
<summary>Enable request context variables in UDG global or data source headers</summary>

Added support for using [request context variables]({{< ref "api-management/traffic-transformation#available-context-variables" >}}) in *UDG* global or data source headers. This feature enables much more advanced [header management]({{< ref "api-management/data-graph#header-management" >}}) for UDG and allows users to extract header information from an incoming request and pass it to upstream data sources.
</details>
</li>
<li>
<details>
<summary>Add support for configuration of global headers for any UDG</summary>

Added support for configuration of [global headers]({{< ref "api-management/data-graph#header-management" >}}) for any *UDG*. These headers will be forwarded to all data sources by default, enhancing control over data flow.
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

Added support for the websocket protocol, *graphql-transport-ws protocol*, enhancing communication between the client and *Gateway*. Users [connecting]({{< ref "api-management/graphql#graphql-websockets" >}}) with the header *Sec-WebSocket-Protocol* set to *graphql-transport-ws* can now utilize messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.
</details>
</li>
<li>
<details>
<summary>Developers using Tyk OAS API Definition can configure body transform middleware for API reponses</summary>

Added support for API Developers using *Tyk OAS API Definition* to [configure]({{< ref "api-management/gateway-config-tyk-oas#transformbody" >}}) a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customization at the per-endpoint level.
</details>
</li>
<li>
<details>
<summary>Enhanced Gateway usage reporting, allowing reporting of number of connected gateways and data planes</summary>
- Added support for enhanced *Gateway* usage reporting. *MDCB v2.4* and *Gateway v5.2* can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation are available in *Tyk Dashboard* for enhanced monitoring of your deployment.
</details>
</li>
</ul>

##### Changed:
<ul>
<li>
<details>
<summary>Response Body Transform middleware updated to remove unnecessary entries in Tyk Classic API Definition</summary>

Updated *Response Body Transform* middleware for *Tyk Classic APIs* to remove unnecessary entries in the *API definition*. The dependency on the *response_processor.response_body_transform* configuration has been removed to streamline middleware usage, simplifying API setup.
</details>
</li>
</ul>

##### Fixed:
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

Fixed an issue where the [Enforced Timeout]({{< ref "tyk-self-managed#enforced-timeouts" >}}) configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.
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

### Breaking Changes

**Attention warning*: Please read carefully this section.

#### Golang Version upgrade
Our Gateway is using [Golang 1.19](https://tip.golang.org/doc/go1.19) programming language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "api-management/plugins/golang#upgrading-your-tyk-gateway" >}}) these to maintain compatibility with the latest Gateway.

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backward-compatible. Downgrading to a previous version after upgrading may result in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights
 
#### Request Body Size Limits

We have introduced a new Gateway-level option to limit the size of requests made
to your APIs. You can use this as a first line of defense against overly large
requests that might affect your Tyk Gateways or upstream services. Of course,
being Tyk, we also provide the flexibility to configure API-level and
per-endpoint size limits so you can be as granular as you need to protect and
optimize your services. Check out our improved documentation for full
description of how to use these powerful [features]({{< ref "api-management/traffic-transformation#request-size-limits-overview" >}}).

#### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.1/images/sha256-3d1e64722be1a983d4bc4be9321ca1cdad10af9bb3662fd6824901d5f22820f1?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.0)


### Changelog

#### Added

- Added `HasOperation`, `Operation` and `Variables` to GraphQL data source API definition for easier nesting
- Added abstractions/interfaces for ExecutionEngineV2 and ExecutionEngine2Executor with respect to graphql-go-tools
- Added support for the `:authority` header when making GRPC requests. If the `:authority` header is not present then some GRPC servers return PROTOCOL_ERROR which prevents custom GRPC plugins from running. Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) from the Tyk Community for his contribution!

#### Changed

- Tyk Gateway updated to use Go 1.19
- Updated [_kin-openapi_](https://github.com/getkin/kin-openapi) dependency to the version [v0.114.0](https://github.com/getkin/kin-openapi/releases/tag/v0.114.0)
- Enhanced the UDG parser to comprehensively extract all necessary information for UDG configuration when users import to Tyk their OpenAPI document as an API definition
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

#### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behavior for OAuth is now the same as for other authorization methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!
- Fixed minor versioning, URL and field mapping issues when importing OpenAPI document as an API definition to UDG
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as an authorization mechanism

### Tyk Classic Portal Changelog

#### Changed

- Improved performance when opening the Portal page by optimizing the pre-fetching of required data



## 5.0 Release Notes

### 5.0.15 Release Notes {#rn-v5.0.15}

#### Release Date 24 October 2024

#### Breaking Changes

There are no breaking changes in this release.

#### Upgrade Instructions

Go to the [Upgrading Tyk](https://tyk.io/docs/developer-support/release-notes/gateway#upgrading-tyk)
section for detailed upgrade instructions.

#### Release Highlights

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.0.15 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.15">}}) below.

#### Changelog {#Changelog-v5.0.15}

##### Fixed

<ul>
<li>
<details>
<summary>Resolved gateway panic on reconnecting to MDCB control plane or Tyk Cloud</summary>
In version 5.0.14, Tyk Gateway could encounter panic when attempting to reconnect to the control plane after it was restarted. This patch version has resolved this issue, ensuring stable connectivity between the gateway and control plane following reconnections and reducing the need for manual intervention.
</details>
</li>
</ul>

---

### 5.0.14 Release Notes {#rn-v5.0.14}

#### Release Date 18th September 2024

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

#### Breaking Changes

**Attention:** Please read this section carefully.

There are no breaking changes in this release.

#### Upgrade Instructions

This release is not tightly coupled with Tyk Dashboard v5.0.14, so you do not have to upgrade both together.

Go to the [Upgrading Tyk](https://tyk.io/docs/developer-support/release-notes/gateway#upgrading-tyk)
section for detailed upgrade instructions.

#### Release Highlights

This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway
configuration options to control path matching strictness.

#### Changelog {#Changelog-v5.0.14}

##### Added

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

##### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based
Permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}) in access policies and keys that led to authorization
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

### 5.0.13 Release Notes

#### Release Date 4 July 2024

#### Release Highlights

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly
replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

###### Action Required

Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and
ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the
changelog for recommended actions.

#### Changelog {#Changelog-v5.0.13}

##### Fixed

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

### 5.0.12 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12).

---

### 5.0.11 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11).

---

### 5.0.10 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10).

---

### 5.0.9 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9).

---

### 5.0.8 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8).

---

### 5.0.7 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.7).

---

### 5.0.6 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.6).

---

### 5.0.5 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.5).

---

### 5.0.4 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.4).

---

### 5.0.3 Release Notes

Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.3).

---

### 5.0.2 Release Notes

#### Release Date 29 May 2023

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

### 5.0.1 Release Notes

#### Release Date 25 Apr 2023

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

### 5.0.0 Release Notes

#### Release Date 28 Mar 2023

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

[Versioning your Tyk OAS APIs]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) is easier than ever, with the
Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve
also added a new endpoint on the Tyk API that will return details of the versions for a given API.

We’ve improved support for [OAS
Mock Responses]({{< ref "api-management/traffic-transformation#mock-response-overview" >}}), with the Tyk OAS API
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

## 4.3 Release Notes

### 4.3.0 Release Notes

#### Release Highlights

##### Mock Responses with Tyk OAS API Definitions

Does your Tyk OAS API Definition define examples or a schema for your path responses? If so, starting with Tyk v4.3, Tyk can use those configurations to mock your API responses, enabling your teams to integrate easily without being immediately dependent on each other. Check it out! [Mock Responses Documentation]({{< ref "api-management/traffic-transformation#mock-response-overview" >}})

##### External OAuth - 3rd party OAuth IDP integration

If you’re using a 3rd party IDP to generate tokens for your OAuth applications, Tyk can now validate the generated tokens by either performing JWT validation or by communicating with the authorization server and executing token introspection. 

This can be achieved by configuring the new External OAuth authentication mechanism. Find out more here [External OAuth Integration]({{< ref "api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}})

##### Updated the Tyk Gateway version of Golang, to 1.16.

**Our Gateway is using Golang 1.16 version starting with 4.3 release. This version of the Golang release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.

##### Improved GQL security

4.3 adds two important features that improve security settings for GraphQL APIs in Tyk.

1. Ability to turn on/off introspection - this feature allows much more control over what consumers are able to do when interacting with a GraphQL API. In cases where introspection is not desirable, API managers can now disallow it. The setting is done on API key level, which means API providers will have very granular control over who can and who cannot introspect the API.
2. Support for allow list in field-based permissions - so far Tyk was offering field-based permissions as a “block list” only. That meant that any new field/query added to a graph was by default accessible for all consumers until API manager explicitly blocked it on key/policy level. Adding support for “allow list” gives APi managers much more control over changing schemas and reduces the risk of unintentionally exposing part of the graph that are not ready for usage. See [Introspection]({{< ref "api-management/graphql#introspection" >}}) for more details.


#### Changelog

##### Tyk Gateway

###### Added
- Minor modifications to the Gateway needed for enabling support for Graph Mongo Pump.
- Added header `X-Tyk-Sub-Request-Id` to each request dispatched by federated supergraph and Universal Data Graph, so that those requests can be distinguished from requests directly sent by consumers.
- Added a functionality that allows to block introspection for any GraphQL API, federated supergraph and Universal Data Graph (currently only supported via Gateway, UI support coming in the next release).
- Added an option to use allow list in field-based permissions. Implemented for full types and individual fields. (currently only supported via Gateway, UI support coming in the next release)
- Added new middleware that can be used with HTTP APIs to set up persisted queries for GraphQL upstreams.
- Added support for two additional subscription protocols for GraphQL subscriptions. Default protocol used between the gateway and upstream remains to be `graphql-ws`, two additional protocols are possible to configure and use: `graphql-transport-ws` and `SSE`.

###### Changed

Updated the Tyk Gateway version of Golang, to 1.16. 

**SECURITY: The release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.

###### Fixed

- Fixed an issue where introspection query was returning a wrong response in cases where introspection query had additional objects.
- Fixed an issue where gateway was crashing when a subscription was started while no datasource was connected to it.
- Fixed a problem with missing configuration in the GraphQL config adapter that caused issues with batching requests to subgraphs in GraphQL API federation setting.
- A HTTP OAS API version lifetime respects now the date value of the expiration field from Tyk OAS API Definition.
- Now it is possible to proxy traffic from a HTTP API (using Tyk Classic API Definition) to a HTTP OAS API (using Tyk OAS API Definition) and vice versa.


#### Updated Versions

Tyk Gateway 4.3 ([docker images](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=1&name=4.3.0)

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**  

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to 4.3 version of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "api-management/plugins/golang" >}}).
{{< /note >}}

## 4.2 Release Notes

### 4.2.0 Release Notes

#### Release Highlights

##### GraphQL Federation improvements

###### Changed GUI in Universal Data Graph configuration section.

A new GUI introduces enhancements to the user experience and more consistent user journey for UDG. 
This change does not yet cover all possible use cases and is released with a feature flag. To enable the new GUI, analytics.conf needs the following setting:

```
"ui": {
  "dev": true
}
```

What’s possible with this change:
- Importing GraphQL schema created outside of Tyk (formats accepted .json, .graphql, .grahqls)
- Creating GraphQL schema in Tyk using schema editor
- Hide/Unhide schema editor to focus on graphical representation of the schema
- Resizing schema editor to adjust workspace look & feel to user preferences
- Improved search in schema editor (search and search & replace available)
- Quick link to UDG documentation from schema editor

> Note: Full configuration of new Universal Data Graph is not yet possible in the GUI, however any UDGs created earlier will not be broken and will work as previously. 

##### Changes to federation entities
###### Defining the base entity
Entities must be defined with the `@key` directive. The fields argument must reference a field by which the entity can be uniquely identified. Multiple primary keys are possible. For example:

Subgraph 1 (base entity):
```
type MyEntity @key(fields: "id") @key(fields: "name") {
  id: ID!
  name: String!
}
```
 Attempting to extend a non-entity with an extension that includes the @key directive or attempting to extend a base entity with an extension that does not include the @key directive will both result in errors.

###### Entity stubs

Entities cannot be shared types (be defined in more than one single subgraph).
If one subgraph references a base entity (an entity defined in another subgraph), that reference must be declared as a stub (stubs look like an extension without any new fields in federation v1). This stub would contain the minimal amount of information to identify the entity (referencing exactly one of the primary keys on the base entity regardless of whether there are multiple primary keys on the base entity). For example, a stub for MyEntity from Subgraph 1 (defined above):

Subgraph 2 (stub)
```
extend type MyEntity @key(fields: "id") {
  id: ID! @external
}
```

###### Supergraph extension orphans
It is now possible to define an extension for a type in a subgraph that does not define the base type.
However, if an extension is unresolved (an extension orphan) after an attempted federation, the federation will fail and produce an error.

###### Improved Dashboard UI and error messages
GraphQL-related (for example when federating subgraphs into a supergraph) errors in the Dashboard UI will show a lean error message with no irrelevant prefixes or suffixes.

Changed the look & feel of request logs in Playground tab for GraphQL APIs. New component presents all logs in a clearer way and is easier to read for the user

###### Shared types
Types of the same name can be defined in more than one subgraph (a shared type). This will no longer produce an error if each definition is identical.
Shared types cannot be extended outside of the current subgraph, and the resolved extension must be identical to the resolved extension of the shared type in all other subgraphs (see subgraph normalization notes). Attempting to extend a shared type will result in an error.
The federated supergraph will include a single definition of a shared type, regardless of how many times it has been identically defined in its subgraphs.

###### Subgraph normalization before federation
Extensions of types whose base type is defined in the same subgraph will be resolved before an attempt at federation. A valid example involving a shared type:

Subgraph 1:
```
enum Example {
  A,
  B
}

extend enum Example {
  C  
}
```

Subgraph 2:
```
enum Example {
  A,
  B,
  C
}
```
 
The enum named “Example” defined in Subgraph 1 would resolve to be identical to the same-named enum defined in Subgraph 2 before federation takes place. The resulting supergraph would include a single definition of this enum.

###### Validation
Union members must be both unique and defined.
Types must have bodies, e.g., enums must contain at least one value; inputs, interfaces, or objects must contain at least one field

##### OpenAPI 
Added support for the Request Body Transform middleware, for new Tyk OAS API Definitions.

##### Universal Data Graph

Added support for Kafka as a data source in Universal Data Graph. Configuration allows the user to provide multiple topics and broker addresses.

#### Changelog

##### Tyk Gateway
###### Added
- Added support for Kafka as a data source in Universal Data Graph.
- Adding a way to defining the base GraphQL entity via @key directive
- It is now possible to define an extension for a type in a subgraph that does not define the base type.
- Added support for the Request Body Transform middleware, for the new Tyk OAS API Definition
- Session lifetime now can be controled by Key expiration, e.g. key removed when it is expired. Enabled by setting `session_lifetime_respects_key_expiration` to `true`
###### Changed
- Generate API ID when API ID is not provided while creating API. 
- Updated the Go plugin loader to load the most appropriate plugin bundle, honoring the Tyk version, architecture and OS
- When GraphQL query with a @skip directive is sent to the upstream it will no longer return “null” for the skipped field, but remove the field completely from the response
- Added validation to Union members - must be both unique and defined.
###### Fixed
- Fixed an issue where the Gateway would not create the circuit breaker events (BreakerTripped and BreakerReset) for which the Tyk Dashboard offers webhooks.
- Types of the same name can be defined in more than one subgraph (a shared type). This will no longer produce an error if each definition is exactly identical.
- Apply Federation Subgraph normalization do avoid merge errors. Extensions of types whose base type is defined in the same subgraph will be resolved before an attempt at federation.

#### Updated Versions
Tyk Gateway 4.2

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

## 4.1 Release Notes

### 4.1.0 Release Notes

#### Release Highlights

##### OpenAPI as a native API definition format
Tyk has always had a proprietary specification for defining APIs. From Tyk v4.1 we now support defining APIs using the Open API Specification (OAS) as well, which can offer significant time and complexity savings. [This is an early access capability]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}).

As we extend our OAS support, we would very much like your feedback on how we can extend and update to best meet your needs: .

This capability is available in both the open source and paid versions of Tyk. See our [High Level Concepts]({{< ref "api-management/gateway-config-managing-oas#" >}}) for more details, or jump to [OAS Getting Started documentation]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}).


##### MDCB Synchroniser

Tyk Gateway v4.1 enables an improved synchroniser functionality within Multi Data Center Bridge (MDCB) v2.0. Prior to this release, the API keys, certificates and OAuth clients required by worker Gateways were synchronised from the controller Gateway on-demand. With Gateway v4.1 and MDCB v2.0 we introduce proactive synchronisation of these resources to the worker Gateways when they start up.
 
This change improves resilience in case the MDCB link or controller Gateway is unavailable, because the worker Gateways can continue to operate independently using the resources stored locally. There is also a performance improvement, with the worker Gateways not having to retrieve resources from the controller Gateway when an API is first called.
 
Changes to keys, certificates and OAuth clients are still synchronised to the worker Gateways from the controller when there are changes and following any failure in the MDCB link.

##### Go Plugin Loader
When upgrading your Tyk Installation you need to re-compile your plugin with the new version. At the moment of loading a plugin, the Gateway will try to find a plugin with the name provided in the API definition. If none is found then it will fallback to search the plugin file with the name: `{plugin-name}_{Gw-version}_{OS}_{arch}.so`

From v4.1.0 the plugin compiler automatically names plugins with the above naming convention. It enables you to have one directory with different versions of the same plugin. For example:

- `plugin_v4.1.0_linux_amd64.so`
- `plugin_v4.2.0_linux_amd64.so`

So, if you upgrade from Tyk v4.1.0 to v4.2.0 you only need to have the plugins compiled for v4.2.0 before performing the upgrade.

#### Changelog

##### Tyk Gateway
###### Added
- Added support for new OAS API definition format
- Added support for headers on subgraph level for federated GraphQL APIs
- Added support for interfaces implementing interfaces in GQL schema editor
- Added support for passing authorization header in GQL API Playgrounds for subscription APIs
- Added TYK_GW_OMITCONFIGFILE option for Tyk Gateway to ignore the values in the config file and load its configuration only from environment variables and default values
- Added a way to modify Tyk analytics record via Go plugins [configurable with API definition](https://tyk.io/docs/plugins/analytics-plugins/). Can be used to sanitise analytics data. 
- Added new policy API REST endpoints
- Added option to configure certificates for Tyk Gateway using [environment variable](https://tyk.io/docs/tyk-oss-gateway/configuration/#http_server_optionscertificates)
- Added support for Python 3.9 plugins
- Added support for headers on subgraph level for federated GraphQL APIs
- Added support for introspecting schemas with interfaces implementing interfaces for proxy only GQL
- Added support for input coercion in lists for GraphQL
- Added support for repeatable directives for GraphQL
###### Changed
- Generate API ID when API ID is not provided while creating API. 
- Updated the Go plugin loader to load the most appropriate plugin bundle, honoring Tyk version, architecture and OS
- When a GraphQL query with a @skip directive is sent to the upstream it will no longer return “null” for the skipped field, but remove the field completely from the response
###### Fixed
- Fixed a bug where the MDCB worker Gateway could become unresponsive when a certificate is added in the Tyk Dashboard
- Fixed an issue with the calculation of TTL for keys in an MDCB deployment such that TTL could be different between worker and controller Gateways
- Fixed a bug when using Open ID where quota was not tracked correctly
- Fixed multiple issues with schema merging in GraphQL federation. Federation subgraphs with the same name shared types like objects, interfaces, inputs, enums, unions and scalars will no longer cause errors when users are merging schemas into a federated supergraph.
- Fixed an issue where schema merging in GraphQL federation could fail depending on the order or resolving subgraph schemas and only first instance of a type and its extension would be valid. Subgraphs are now individually normalized before a merge is attempted and all extensions that are possible in the federated schema are applied.
- Fixed an issue with accessing child properties of an object query variable for GraphQL where query {{.arguments.arg.foo}} would return "{ "foo":"123456" }" instead of "123456"

#### Updated Versions
Tyk Gateway 4.1
Tyk MDCB 2.0.1

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
## 4.0 Release Notes

### 4.0.0 Release Notes

#### Release Highlights

##### GraphQL federation

As we know, ease-of-use is an important factor when adopting GraphQL. Modern enterprises have dozens of backend services and need a way to provide a unified interface for querying them. Building a single, monolithic GraphQL server is not the best option. It is hard to maintain and leads to a lot of dependencies and over-complication.

To remedy this, Tyk 4.0 offers GraphQL federation that allows the division of GraphQL implementation across multiple backend services, while still exposing them all as a single graph for the consumers. Subgraphs represent backend services and define a distinct GraphQL schema. A subgraph can be queried directly, as a separate service or federated in the Tyk Gateway into a larger schema of a supergraph – a composition of several subgraphs that allows execution of a query across multiple services in the backend.

[Federation docs]({{< ref "api-management/graphql#overview-1" >}})

[Subgraphs and Supergraphs docs]({{< ref "api-management/graphql#subgraphs-and-supergraphs" >}})

##### GraphQL subscriptions

Subscriptions are a way to push data from the server to the clients that choose to listen to real-time messages from the server, using the WebSocket protocol. There is no need to enable subscriptions separately; Tyk supports them alongside GraphQL as standard.

With release 4.0, users can federate GraphQL APIs that support subscriptions. Federating subscriptions means that events pushed to consumers can be enriched with information from other federated graphs.

[Subscriptions docs]({{< ref "api-management/graphql#graphql-subscriptions" >}})

#### Changelog

- Now it is possible to configure GraphQL upstream authentification, in order for Tyk to work with its schema
- JWT scopes now support array and comma delimeters
- Go plugins can be attached on per-endpoint level, similar to virtual endpoints

#### Updated Versions

Tyk Gateway 4.0
Tyk Pump 1.5

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
## 3.2 Release Notes

### 3.2.0 Release Notes

#### Release Highlights

##### GraphQL and UDG improvements

We've updated the GraphQL functionality of our [Universal Data Graph]({{< ref "api-management/data-graph#overview" >}}). You’re now able to deeply nest GraphQL & REST APIs and stitch them together in any possible way.

Queries are now possible via WebSockets and Subscriptions are coming in the next Release (3.3.0).

You're also able to configure [upstream Headers dynamically]({{< ref "api-management/data-graph#header-forwarding" >}}), that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to acccess protected upstreams. 

We've added an easy to use URL-Builder to make it easier for you to inject object fields into REST API URLs when stitching REST APIs within UDG.

Query-depth limits can now be configured on a per-field level.

If you’re using GraphQL upstream services with UDG, you’re now able to forward upstream error objects through UDG so that they can be exposed to the client.

##### Go response plugins

With Go response plugins you are now able to modify and create a full request round trip made through the Tyk Gateway. 
Find out more about [plugins]({{< ref "api-management/plugins/overview#" >}}) and how to write [Go response plugins]({{< ref "api-management/plugins/golang#creating-a-custom-response-plugin" >}}).

#### Changelog

In addition to the above, version 3.2 includes all the fixes that are part of 3.0.5
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.5

#### Updated Versions
Tyk Gateway 3.2

#### Upgrade process
If you already have GraphQL or UDG APIs you need to follow this upgrade guide https://tyk.io/docs/graphql/migration-guide/

## 3.1 Release Notes

### 3.1.0 Release Notes

#### Release Highlights

##### Identity Management UX and SAML support
You will notice that the experience for creating a new profile in the Identity management section of the dashboard was changed to a ‘wizard’ approach which reduces the time it takes to get started and configure a profile. 
In addition, users are now able to use SAML for the dashboard and portal login, whether you use TIB(Tyk Identity Broker) internally or externally of the dashboard.

This follows the recent changes that we have made to embed TIB (Tyk Identity Broker)in the dashboard. See 3.[release notes](https://tyk.io/docs/release-notes/version-3.0/) fo more information 
regarding this. 
This follows the recent changes that we have made to embed TIB (Tyk Identity Broker)in the dashboard. See 3.0 [release notes](https://tyk.io/docs/release-notes/version-3.0/) for more information regarding this. 

To learn more [see the documentation](https://tyk.io/docs/getting-started/tyk-components/identity-broker/)

##### UDG (Universal Data Graph) & GraphQL
###### Schema Validation

For any GraphQL API that is created via Dashboard or through our API, the GraphQL schema is now validated before saving the definition. Instant feedback is returned in case of error.

###### Sync / Update schema with upstream API (Proxy Only Mode)

If you’ve configured just a proxy GraphQL API, you can now keep in sync the upstream schema with the one from the API definition, just by clicking on the `Get latest version` button on the `Schema` tab from API Designer

Docs [here](https://tyk.io/docs/graphql/syncing-schema/)

###### Debug logs

You can now see what responses are being returned by the data sources used while configuring a UDG (universal data graph). These can be seen by calling the `/api/debug` API or using the playground tab within API designer.

The data that will be displayed will show information on the query before and after the request to a data source happens, as follows:

Before the request is sent:

Example log message: "Query.countries: preSendHttpHook executed”. Along with this message, the log entry will contain the following set of fields: Typename, Fieldname and Upstream url;


After the request is sent:

Example log message: "Query.countries: postReceiveHttpHook executed”. Along with this message, the log entry will contain the following set of fields: Typename, Filename, response body, status code.

Example: 

```{"typename": "Query", "fielname": "countries", "response_body": "{\"data\":{}}", "status_code": 200}```

Docs [here](https://tyk.io/docs/graphql/graphql-playground/)

##### Portal
###### GraphQL Documentation

Documentation for the GraphQL APIs that you are exposing to the portal is available now through a GraphQL Playground UI component, same as on the playground tab of API Designer.

Also to overcome the CORS issues that you might encounter while testing documentation pages on the portal, we have pre-filled the CORS settings section in API Designer with explicit values from the start. All you need to do is to check the “Enable CORS” option.

###### Portal - API key is hidden in email
You now have the option to hide the API key in the email generated after you approve the key request for a developer.

[Docs here](https://tyk.io/docs/tyk-developer-portal/key-requests/)


#### Changelog
The 3.1 version includes the fixes that are part of 3.0.1. 
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.1


#### Updated Versions

- Tyk Gateway 3.1

## 3.0 Release Notes

### 3.0.0 Release Notes

#### Release Highlights

##### Version changes and LTS releases

We have bumped our major Tyk Gateway version from 2 to 3, a long overdue change as we’ve been on version 2 for 3 years. We have also changed our Tyk Dashboard major version from 1 to 3, and from now on it will always be aligned with the Tyk Gateway for major and minor releases. The Tyk Pump has also now updated to 1.0, so we can better indicate major changes in future. 

Importantly, such a big change in versions does not mean that we going to break backward compatibility. More-over we are restructuring our internal release strategy to guarantee more stability and to allow us to deliver all Tyk products at a faster pace. We aim to bring more clarity to our users on the stability criteria they can expect, based on the version number.
Additionally we are introducing Long Term Releases (also known as LTS).

Read more about this changes in our blogpost: https://tyk.io/introducing-long-term-support-some-changes-to-our-release-process-product-versioning/


##### Universal Data Graph and GraphQL

Tyk now supports GraphQL **natively**. This means Tyk doesn’t have to use any external services or process for any GraphQL middleware. You can securely expose existing GraphQL APIs using our GraphQL core functionality.

In addition to this you can also use Tyk’s integrated GraphQL engine to build a Universal Data Graph. The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

All this without even have to build your own GraphQL server. If you have existing REST APIs all you have to do is configure the UDG and Tyk has done the work for you.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs. In addition to this, the UDG benefits from all existing solutions that already come with your Tyk installation. That is, your Data Graph will be secure from the start and there’s a large array of out of the box middlewares you can build on to power your Graph.

Read more about the [GraphQL]({{< ref "api-management/graphql" >}}) and [Universal Data Graph]({{< ref "api-management/data-graph#overview" >}})

##### Using external secret management services

Want to reference secrets from a KV store in your API definitions? We now have native Vault & Consul integration. You can even pull from a tyk.conf dictionary or environment variable file.

[Read more]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}})

##### Co-Process Response Plugins

We added a new middleware hook allowing middleware to modify the response from the upstream. Using response middleware you can transform, inspect or obfuscate parts of the response body or response headers, or fire an event or webhook based on information received by the upstream service.

At the moment the Response hook is supported for [Python and gRPC plugins]({{< ref "api-management/plugins/rich-plugins#coprocess-dispatcher---hooks" >}}).


##### Enhanced Gateway health check API

Now the standard Health Check API response include information about health of the dashboard, redis and mdcb connections.
You can configure notifications or load balancer rules, based on new data. For example, you can be notified if your Tyk Gateway can’t connect to the Dashboard (or even if it was working correctly with the last known configuration).

[Read More]({{< ref "tyk-self-managed#set-up-liveness-health-checks" >}})

##### Enhanced Detailed logging
Detailed logging is used in a lot of the cases for debugging issues. Now as well as enabling detailed logging globally (which can cause a huge overhead with lots of traffic), you can enable it for a single key, or specific APIs. 

New detailed logging changes are available only to our Self-Managed customers currently.

[Read More]({{< ref "api-management/troubleshooting-debugging#capturing-detailed-logs" >}})

##### Better Redis failover

Now, if Redis is not available, Tyk will be more gracefully handle this scenario, and instead of simply timing out the Redis connection, will dynamically disable functionality which depends on redis, like rate limits or quotas, and will re-enable it back once Redis is available. The Tyk Gateway can even be started without Redis, which makes possible scenarios, such as when the Gateway proxies Redis though itself, like in a Redis Sentinel setup.

##### Ability to shard analytics to different data-sinks

In a multi-org deployment, each organization, team, or environment might have their preferred analytics tooling. At present, when sending analytics to the Tyk Pump, we do not discriminate analytics by org - meaning that we have to send all analytics to the same database - e.g. MongoDB. Now the Tyk Pump can be configured to send analytics for different organizations to different places. E.g. Org A can send their analytics to MongoDB + DataDog. But Org B can send their analytics to DataDog + expose the Prometheus metrics endpoint.

It also becomes possible to put a {{<fn>}}blocklist{{</fn>}} in-place, meaning that some data sinks can receive information for all orgs, whereas others will not receive OrgA’s analytics if blocked.

This change requires updating to new Tyk Pump 1.0

[Read More]({{< ref "api-management/tyk-pump#tyk-pump-configuration" >}})

##### 404 Error logging - unmatched paths

Concerned that client’s are getting a 404 response? Could it be that the API definition or URL rewrites have been misconfigured? Telling Tyk to track 404 logs, will cause the Tyk Gateway to produce error logs showing that a particular resource has not been found. 

The feature can be enabled by setting the config `track_404_logs` to `true` in the gateway's config file.

#### Changelog

##### Fixes

- Fixed the bug when tokens created with non empty quota, and quota expiration set to `Never`, were treated as having unlimited quota. Now such tokens will stop working, once initial quota is reached. 

#### Updated Versions

- Tyk Gateway 3.0
- Tyk Pump 1.0

#### Upgrading From Version 2.9

No specific actions required.
If you are upgrading from version 2.8, pls [read this guide]({{< ref "developer-support/release-notes/archived#290-release-notes" >}})

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance on the upgrade strategy.

### API Documentation
<!-- Required. Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?				
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
-->
- [OpenAPI Document]({{<ref "tyk-dashboard-api" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ

Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
