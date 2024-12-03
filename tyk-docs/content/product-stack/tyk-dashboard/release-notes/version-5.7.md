---
title: Tyk Dashboard 5.7 Release Notes
date: 2024-10-08T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.6.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.7", "5.7.0", "5.7", "changelog"]
---
<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for version 5.7.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---
## 5.7.0 Release Notes

### Release Date 03 December 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0" >}}) below.
-->
We are thrilled to announce new updates and improvements in Tyk 5.7.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.0" >}}) below.

#### Tyk Streams can be configured through Tyk Dashboard

With this release we are adding a possibility for users to configure their Stream & Events APIs using Tyk Dashboard. 
The new API designer leads users step-by-step to create a new Stream configuration easily. Pre-filled stream configurations for different inputs and outputs make it easy to make sure that the Stream is configured correctly.

#### Improved Audit Log Management

Tyk 5.7.0 enhances Audit Log management with new features designed for efficiency and security. Users can now store Dashboard Audit Logs in a database for persistent retention and access them via the new /audit-logs API, which supports advanced filtering by attributes like action, IP, status, and user. Additionally, a dedicated Audit Log RBAC group ensures secure access to sensitive log data. These improvements simplify monitoring and compliance workflows, particularly in containerized environments.

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
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.7.0 | MDCB v2.7.2     | MDCB v2.5.1 |
|         | Operator v1.1.0  | Operator v0.17 |
|         | Sync v2.0.1    | Sync v1.4.3 |
|         | Helm Chart v2.2  | Helm all versions |
| | EDP v1.12 | EDP all versions |
| | Pump v1.11.1 | Pump all versions |
| | TIB (if using standalone) v1.6.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.7.0}
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.22       | 1.22       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.22 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
In 5.7.0, we have deprecated the dedicated [External OAuth]({{< ref "basic-config-and-security/security/authentication-authorization/ext-oauth-middleware" >}})  (Tyk Classic: `external_oauth`, Tyk OAS: `server.authentication.securitySchemes.externalOAuth`) and [OpenID Connect]({{< ref "api-management/authentication-authorization#use-openid-connect" >}})  (Tyk Classic: `auth_configs.oidc`, Tyk OAS: `server.authentication.oidc`) authentication methods. We advise users to switch to [JWT Authentication]({{< ref "api-management/authentication-authorization#use-json-web-tokens-jwt" >}}).

Additionally, SQLite has reached its End of Life in this release, enabling a fully static, CGO-free Tyk Dashboard optimised for RHEL8. Sqlite was previously recommended only to be used in basic proofs of concept. Now, for such scenarios and for production, we recommend migrating to PostgreSQL or MongoDB for better scalability and support.
<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->
### Upgrade instructions {#upgrade-5.7.0}
If you are upgrading to 5.7.0, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.7.0)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.7.0
    ```
- Helm charts
  - [tyk-charts v2.2.0]({{< ref "product-stack/tyk-charts/release-notes/version-2.1.md" >}})

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
<summary>Added confirmation prompt for Stream deletion</summary>

Introduced a confirmation prompt when deleting a stream, notifying users that this action will stop all data streaming and cannot be undone. This change ensures users are fully aware of the impact before proceeding with deletion.
</details>
</li>
<li>
<details>
<summary>Displayed Streaming API in API overview table</summary>

Added "Streams" as an API type in the API Overview table, making it easier for API developers to identify APIs categorised as Streams & Events.
</details>
</li>
<li>
<details>
<summary>Implemented logic for config framework selection in Streaming API creation</summary>

Added logic for the Streaming API creation process, allowing users to select config frameworks for inputs, processors, and outputs. An 'Advanced' option is also available, which leaves the code editor empty while generating and displaying the YAML Bento config based on the user's selections.
</details>
</li>
<li>
<details>
<summary>Enhanced info messages for securing Streaming & Events APIs in policies & keys</summary>

Included new info messages and tooltips in the Policies & Keys section to guide users on securing Streaming & Events APIs. Updated messaging clarifies the combination of API types and revised copy in the Global Rate Limiting and Quota sections to better explain usage limits for keys and plans.
</details>
</li>
<li>
<details>
<summary>Enabled URL view and copy functionality in external playgrounds tab</summary>

Enabled URL view and copy functionality in the External Playgrounds tab, supporting scenarios with multiple organisations and URLs for playgrounds.
</details>
</li>
<li>
<details>
<summary>Introduced /streams endpoint to Tyk Dashboard API</summary>

Rolled out the `/streams` endpoint to the Tyk Dashboard API, dedicated to creating Stream and Events APIs in Tyk Streams. Documentation for the endpoint and its methods is available in the Tyk Docs.
</details>
</li>
<li>
<details>
<summary>Split Streaming API into new type in API designer</summary>

Separated Streaming API into its own type in the API Designer, introducing a new selection card for easier creation and configuration. Navigation enhancements, including a shortcut menu item, provide quicker access to the streaming configuration UI.
</details>
</li>
<li>
<details>
<summary>Integrated step-by-step UI for Config framework selection in Streaming API creation</summary>

Developed a step-by-step UI for Streaming API creation, enabling users to select a config framework for inputs, processors, and outputs. The dynamic wizard steps are integrated into the Tyk UI library to prefill configurations based on selections and prevent the combination of 'Custom' with other frameworks.
</details>
</li>
<li>
<details>
<summary>Easily contact Tyk Support during Tyk Cloud trial</summary>

Introduced a form on the Tyk Dashboard that allows users to easily contact Tyk support during their trial period.
</details>
</li>
<li>
<details>
<summary>Support for JWE in OIDC SSO</summary>

We have enhanced security for customers in highly regulated industries by introducing JSON Web Encryption (JWE) support for OIDC single sign-on (SSO). This ensures that tokens used in authentication flows are securely encrypted, providing an additional layer of protection.

[Setup guide for JWE OIDC SSO]({{< ref "tyk-stack/tyk-identity-broker/auth-user-for-api-access-github-oauth" >}})
</details>
</li>
<li>
<details>
<summary>Store Audit Logs in a Database</summary>

Users can now choose to store Dashboard Audit Logs directly in a database, enabling efficient and reliable log storage. This feature is particularly beneficial for organizations needing persistent audit log retention to meet compliance requirements or for forensic purposes.
</details>
</li>
<li>
<details>
<summary>Access Audit Logs via /audit-logs endpoint</summary>

A new API endpoint, `/audit-logs`, has been introduced to provide programmatic access to audit logs stored in database. This allows users to retrieve, filter, and analyze logs more effectively. The API supports filtering logs by key attributes like action, IP address, URL accessed, date range, user, and page number.

For detail usage of the `/audit-logs` endpoint, please see [Dashboard API documentation]({{< ref "tyk-dashboard-api" >}}).
</details>
</li>
<li>
<details>
<summary>New Role-Based Access Control (RBAC) for Audit Logs</summary>

To secure access to audit logs, we’ve added a new Audit Log RBAC group. This ensures that only authorized users can view or retrieve sensitive log information. Administrators can assign this permission as part of their security and compliance strategy.
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
<summary>Removed AJV validation for Streams config editor</summary>

Eliminated AJV validation in the Streams Config Editor to prevent false positives on valid YAML configurations. The frontend now solely checks the YAML structure, providing users with greater flexibility without enforcing strict Bento-specific schema rules
</details>
</li>
<li>
<details>
<summary>Hide unnecessary field from API Designer page for Streams</summary>

Removed an unnecessary field from the API Designer page under the Streams section to enhance clarity. This update impacts the Event Handlers, Detailed Activity Logs, Caching, and Endpoints tabs.
</details>
</li>
<li>
<details>
<summary>Automatic configuration of request validation for path-level parameters during import of OpenAPI description</summary>

Tyk will now detect path-level parameters in the OpenAPI description and can be set to enable and configure the [Request Validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}) middleware automatically for these. Previously this automatic detection only worked for method-level parameters in the OpenAPI description.
</details>
</li>
<li>
<details>
<summary>Deprecated SQLite support from Dashboard for RHEL8 compatibility</summary>

Removed SQLite support to enhance portability and security, ensuring the released binary can now be built statically and no longer relies on system libraries. This change supports continued compatibility with RHEL8.
</details>
</li>
<li>
<details>
<summary>Deprecated External OAuth and OpenID Connect Options in Tyk Dashboard</summary>

The External OAuth and OpenID Connect authentication options have been deprecated in the Tyk Dashboard. Users are advised to utilize JWT Auth with external IDPs for a more complete integration, while existing functionality remains operational to avoid breaking changes.
</details>
</li>
<li>
<details>
<summary>Updated NPM package dependencies</summary>

Updated NPM package dependencies of Dashboard, to address security vulnerabilities.
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
<summary>Fixed navigation issue with "Back to APIs Page" Button on Streams API page</summary>

Resolved an issue where the "Back to APIs Page" button was unresponsive on the Streams API page. The button now correctly redirects users to the main APIs page for all API types.
</details>
</li>
<li>
<details>
<summary>Resolved search box limitation on Tyk OAS and Streams API pages</summary>

Corrected an issue where the search box on the Tyk OAS and Streams API pages only accepted a single character. Users can now input complete search terms, allowing for more accurate searches.
</details>
</li>
<li>
<details>
<summary>Unable to see all *user groups* in Dashboard dropdown</summary>

Fixed an issue with the *user group* dropdown in the Dashboard UI, ensuring that all available user groups are displayed when creating a new user.
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
- [OpenAPI Document]({{< ref "tyk-dashboard-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.


