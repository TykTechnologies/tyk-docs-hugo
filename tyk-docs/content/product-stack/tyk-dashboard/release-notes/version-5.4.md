---
title: Tyk Dashboard 5.4 Release Notes
date: 2024-03-27T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.4.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.4", "5.4.0", "5.4", "changelog"]
---
<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for version 5.4.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---
## 5.4.0 Release Notes
### Release Date 2 July 2024
### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**
There are no breaking changes in this release.

### Dependencies {#dependencies-5.4.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->
#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.4.0 | MDCB v2.6.0     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5.0   | Sync v1.4.3 |
|         | Helm Chart v1.5.0 | Helm all versions |
| | EDP v1.10.0 | EDP all versions |
| | Pump v1.10.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.4.0}
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
### Upgrade instructions {#upgrade-5.4.0}
If you are upgrading to 5.4.0, please follow the detailed [upgrade instructions](#upgrading-tyk).
Add upgrade steps here if necessary.

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We're thrilled to introduce exciting enhancements in Tyk Dashboard 5.4, aimed at improving your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the change log below.

### Event handling for Tyk OAS APIs

We’ve added support for you to register webhooks with your Tyk OAS APIs so that you can handle events triggered by the Gateway, including circuit breaker and quota expiry. You can also assign webhooks to be fired when using the new smoothing rate limiter to notify your systems of ongoing traffic spikes. For more details see the [documentation]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}).

### Enhanced Header Handling in GraphQL APIs

Introduced a features object in API definitions for GQL APIs, including the `use_immutable_headers` attribute. This allows advanced header control, enabling users to add new headers, rewrite existing ones, and selectively remove specific headers. Existing APIs will have this attribute set to `false` by default, ensuring no change in behaviour. For new APIs, this attribute is true by default, facilitating smoother migration and maintaining backward compatibility.

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.4.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.4.0
  ```
- Helm charts
  - [tyk-charts v1.5]({{< ref "/product-stack/tyk-charts/release-notes/version-1.5.md" >}})

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
<summary>Introduced Rate Limit Smoothing for Redis Rate Limiter</summary>

Implemented a [rate limit smoothing mechanism]({{< ref "getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) to gradually adjust the rate limit as the request rate increases and decreases between an intermediate threshold and the maximum rate limit. New `RateLimitSmoothingUp` and `RateLimitSmoothingDown` events will be triggered as this smoothing occurs, supporting auto-scaling of upstream capacity. The smoothing process gradually increases the rate, thereby unblocking clients that exceed the current request rate in a staggered manner.
</details>
</li>
<li>
<details>
<summary>Updated API designer toolbar for GraphQL and Universal Data Graph</summary>

Revamped the API designer toolbar for GraphQL and Universal Data Graph, consolidating all relevant actions for each API type under a single menu dropdown for improved usability.
</details>
</li>
<li>
<details>
<summary>Updated API designer toolbar for HTTP and TCP</summary>

Revamped the API designer toolbar for HTTP and TCP, consolidating all relevant actions for each API type under a single menu dropdown for improved usability.
</details>
</li>
<li>
<details>
<summary>New Tyk OAS features</summary>

We’ve added some more features to the Tyk OAS API, moving closer to full parity with Tyk Classic. In this release we’ve added controls that allow you: to enable or prevent generation of traffic logs at the API-level; to enable or prevent the availability of session context to middleware and to pin public key certificates to an API. We’ve also added the facility to register webhooks that will be fired in response to Gateway events.
</details>
</li>
<li>
<details>
<summary>New Dashboard API endpoints</summary>

We have added a new `/oas/dry-run` endpoint to the Tyk Dashboard API. This uses the Dashboard’s logic to create or update a Tyk OAS API definition using an OpenAPI document without instantiating the API on the Tyk platform.
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
<summary>Fixed template inheritance issue in API Designer</summary>

Resolved a bug in the API Designer where certain properties, such as `use_immutable_headers`, were not correctly inherited from the new API template. This fix ensures all default settings from the template are properly applied when creating a new API.
</details>
</li>
<li>
<details>
<summary>Corrected assignment issue for API Templates in Tyk organisations</summary>

Fixed an issue where API Templates were not correctly assigned to Tyk Organisations, preventing potential accidental sharing of secret data between Organisations through the use of incorrect templates.
</details>
</li>
<li>
<details>
<summary>Addressed keyboard shortcut issues in Universal Data Graph URL field configuration</summary>

Fixed an issue where common keyboard shortcuts (Cmd + X, A, C, V) were not functioning correctly when configuring the URL field for a UDG data source.
</details>
</li>
<li>
<details>
<summary>Streamlined data source import endpoint in Dashboard API</summary>

Improved the data source import endpoint in the Dashboard API by removing the need for users to convert OpenAPI/AsyncAPI documents into strings before submission. Users can now provide the documents directly, enhancing the overall user experience.
</details>
</li>
<li>
<details>
<summary>Enhanced password reset security</summary>

Modified default OPA rules to fix an issue where admins were unable to reset their own password. Tyk Dashboard clients using custom OPA rules should update their rule set accordingly. Contact your assigned Tyk representative for assistance.
</details>
</li>
<li>
<details>
<summary>Corrected filtering for Dashboard Analytics with PostgreSQL</summary>

Addressed an issue in the api/usage endpoint where Dashboard analytics with PostgreSQL returned unfiltered results. The endpoint now correctly filters results, eliminating the need for duplicating parameters to handle multiple tags.
</details>
</li>
<li>
<details>
<summary>Minor Dashboard UI fixes and improvements </summary>

We have made some improvements to the wording used in the Dashboard user interface and fixed some minor usability issues.
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




