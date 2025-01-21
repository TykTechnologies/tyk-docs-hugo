---
title: Tyk Dashboard Release Notes
date: 2024-10-08T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.6.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.6", "5.6.0", "5.6", "changelog"]
aliases:
  - /product-stack/tyk-dashboard/release-notes/overview
  - /product-stack/tyk-dashboard/release-notes/version-3.0
  - /product-stack/tyk-dashboard/release-notes/version-3.1
  - /product-stack/tyk-dashboard/release-notes/version-3.2
  - /product-stack/tyk-dashboard/release-notes/version-4.0
  - /product-stack/tyk-dashboard/release-notes/version-4.1
  - /product-stack/tyk-dashboard/release-notes/version-4.2
  - /product-stack/tyk-dashboard/release-notes/version-4.3
  - /product-stack/tyk-dashboard/release-notes/version-5.0
  - /product-stack/tyk-dashboard/release-notes/version-5.1
  - /product-stack/tyk-dashboard/release-notes/version-5.2
  - /product-stack/tyk-dashboard/release-notes/version-5.3
  - /product-stack/tyk-dashboard/release-notes/version-5.4
  - /product-stack/tyk-dashboard/release-notes/version-5.5
  - /product-stack/tyk-dashboard/release-notes/version-5.6
  - /product-stack/tyk-dashboard/release-notes/version-5.7
---
<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for Dashboard displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.7 Release Notes

### 5.7.1 Release Notes

#### Release Date 31 December 2024

#### Release Highlights

This release focuses mainly on bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.1" >}}) below.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.7.1}

##### Compatibility Matrix For Tyk Components

| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.7.1 | MDCB v2.7.2     | MDCB v2.5.1 |
|         | Operator v1.1.0  | Operator v0.17 |
|         | Sync v2.0.1    | Sync v1.4.3 |
|         | Helm Chart v2.2  | Helm all versions |
| | EDP v1.12 | EDP all versions |
| | Pump v1.11.1 | Pump all versions |
| | TIB (if using standalone) v1.6.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.7.1}

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.22       | 1.22       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.22 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

#### Deprecations

We have deprecated the obsolescent `http_server_options.prefer_server_ciphers` configuration option. This legacy control no longer has any effect on the underlying library and users are advised to remove this setting from their configurations.

#### Upgrade instructions {#upgrade-5.7.1}
If you are upgrading to 5.7.1, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.7.1)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.7.1
    ```
- Helm charts
  - [tyk-charts v2.2.0]({{< ref "developer-support/release-notes/helm-chart#220-release-notes" >}})

#### Changelog {#Changelog-v5.7.1}
##### Fixed

<ul>
<li>
<details>
<summary>Fixed Issue with Restore Zooming in API Activity Dashboard</summary>

Resolved a bug where clicking "Restore zooming to initial state" in the API Activity Dashboard would cause the graph to show blank instead of resetting to the initial zoom level. This fix ensures that users can now correctly restore the default zoom state in all charts on the Dashboard.
</details>
</li>
<li>
<details>
<summary>Deprecation of http_server_options.prefer_server_ciphers</summary>
This option has been marked as deprecated due to its obsolescence in the underlying library functions used by Tyk. Users are advised to remove this configuration from their setups as it no longer has any effect.
</details>
</li>
</ul>

---

### 5.7.0 Release Notes

#### Release Date 03 December 2024

#### Release Highlights

We are thrilled to announce new updates and improvements in Tyk 5.7.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.7.0" >}}) below.

##### Tyk Streams can be configured through Tyk Dashboard

With this release we are adding a possibility for users to configure their Stream & Events APIs using Tyk Dashboard. 
The new API designer leads users step-by-step to create a new Stream configuration easily. Pre-filled stream configurations for different inputs and outputs make it easy to make sure that the Stream is configured correctly.

##### Improved Audit Log Management

Tyk 5.7.0 enhances Audit Log management with new features designed for efficiency and security. Users can now store Dashboard Audit Logs in a database for persistent retention and access them via the new /audit-logs API, which supports advanced filtering by attributes like action, IP, status, and user. Additionally, a dedicated Audit Log RBAC group ensures secure access to sensitive log data. These improvements simplify monitoring and compliance workflows, particularly in containerized environments.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.7.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->
##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.7.0}
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

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
In 5.7.0, we have deprecated the dedicated [External OAuth]({{< ref "basic-config-and-security/security/authentication-authorization/ext-oauth-middleware" >}})  (Tyk Classic: `external_oauth`, Tyk OAS: `server.authentication.securitySchemes.externalOAuth`) and [OpenID Connect]({{< ref "api-management/client-authentication#integrate-with-openid-connect-deprecated" >}})  (Tyk Classic: `auth_configs.oidc`, Tyk OAS: `server.authentication.oidc`) authentication methods. We advise users to switch to [JWT Authentication]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}).

Additionally, SQLite has reached its End of Life in this release, enabling a fully static, CGO-free Tyk Dashboard optimised for RHEL8. Sqlite was previously recommended only to be used in basic proofs of concept. Now, for such scenarios and for production, we recommend migrating to PostgreSQL or MongoDB for better scalability and support.
<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->
#### Upgrade instructions {#upgrade-5.7.0}
If you are upgrading to 5.7.0, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.7.0)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.7.0
    ```
- Helm charts
  - [tyk-charts v2.2.0]({{< ref "developer-support/release-notes/helm-chart#220-release-notes" >}})

#### Changelog {#Changelog-v5.7.0}

##### Added

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

##### Changed

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

##### Fixed

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




## 5.6 Release Notes

### 5.6.1 Release Notes

#### Release Date 18 October 2024

#### Release Highlights

This is a version bump to align with Gateway v5.6.1, no changes have been implemented in this release.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.6.1}

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.6.1 | MDCB v2.7.1     | MDCB v2.5.1 |
|         | Operator v1.0.0  | Operator v0.17 |
|         | Sync v2.0    | Sync v1.4.3 |
|         | Helm Chart v2.1  | Helm all versions |
| | EDP v1.11 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.6.1}
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

#### Deprecations

There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.6.1}

If you are upgrading to 5.6.1, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.6.1)
- ```bash
  docker pull tykio/tyk-dashboard:v5.6.1
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})

#### Changelog {#Changelog-v5.6.1}

No changes in this release.


---
### 5.6.0 Release Notes

#### Release Date 10 October 2024

#### Release Highlights

We are thrilled to announce new updates and improvements in Tyk 5.6.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.6.0">}}) below.

##### Per endpoint Rate Limiting for clients

Now you can configure rate limits at the [endpoint level per client]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}), using new configuration options in the access key. Use Tyk's powerful [security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) to create templates to set appropriate rate limits for your different categories of user.

##### Go upgrade to 1.22

We’ve upgraded the Tyk Dashboard to Golang 1.22, bringing improved performance, better security, and enhanced stability to the core system.

#####  Strengthened Role-Based Access Controls (RBAC) to combat privilege escalation risks

We’ve tightened up the rules that govern a user's ability to create admin users and to reset other users' passwords when using Tyk's RBAC function. Now, only super-admins can create new admins, admin roles can't be assigned to user groups, and only admin users can reset another user's password (and only within their Tyk organization).

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
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.6.0 | MDCB v2.7.1     | MDCB v2.5.1 |
|         | Operator v1.0.0  | Operator v0.17 |
|         | Sync v2.0    | Sync v1.4.3 |
|         | Helm Chart v2.1  | Helm all versions |
| | EDP v1.11 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.6.0}
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

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->

We are deprecating support for SQLite, External OAuth Middleware, and OpenID Connect (OIDC) Middleware in Tyk Dashboard to simplify the platform and enhance overall performance. These changes will take effect from 5.7.0.

#### Why the Change?

#### SQLite

While useful for testing, SQLite is not designed for production environments. By focusing on PostgreSQL and MongoDB, we can provide users with more scalable and reliable options.

#### External OAuth Middleware

This feature serves a similar purpose to our JWT Authentication and may lead to confusion. We recommend transitioning to JWT Authentication for a more streamlined experience.

#### OpenID Connect (OIDC) Middleware 

The low adoption of this option, along with its functional overlap with other supported authentication methods, prompts us to deprecate OIDC middleware to reduce complexity within the platform. We recommend users transition to JWT Authentication.


We encourage users to switch to the recommended alternatives. For more detailed information, please refer to the [Documentation](https://tyk.io/docs//api-management/client-authentication#integrate-with-openid-connect-deprecated/)


<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ###### Future deprecations
-->
#### Upgrade instructions {#upgrade-5.6.0}
If you are upgrading to 5.6.0, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.6.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.6.0
  ```
- Helm charts
  - [tyk-charts v2.1.0]({{<ref "developer-support/release-notes/helm-chart#210-release-notes">}})

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
<summary>Per endpoint client rate limiting</summary>

Building on the [per-endpoint upstream rate limits]({{< ref "getting-started/key-concepts/rate-limiting#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have now added [per-endpoint client rate limits]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}). This new feature allows for more granular control over client consumption of API resources by associating the rate limit with the access key, enabling you to manage and optimize API usage more effectively.
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

The Tyk Dashboard has been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance, strengthened security, and access to the latest features available in the new Golang release.
</details>
</li>
<li>
<details>
<summary>Improved documentation and schema for Tyk Dashboard API</summary>

We have updated the swagger.yml schema for Tyk Dashboard API to reflect the latest changes in product endpoints, payloads, and responses. This update includes new fields and endpoints, improved examples, documentation adjustments, and fixes for schema issues. These enhancements aim to improve usability and ensure that the documentation accurately represents the current code state.
</details>
</li>

<li>
<details>
<summary>Renamed GraphQL "Playground" tab to "Playgrounds"</summary>

The "Playground" tab in the GraphQL API Designer has been renamed to "Playgrounds." This change consolidates access to both internal and external playgrounds within a single section, offering a more streamlined and intuitive experience for API design and testing.
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
<summary>Addressed some display issues in Dashboard Analytics and Classic Portal when using PostgreSQL storage</summary>

- Resolved an issue where HTTP 429 status codes were not being displayed on the Activity Overview page.
- Fixed portal graphs by adding a default "day" grouping resolution to the query.
- Corrected issues with the Error Breakdown related to date parameters, ensuring accurate date handling and display.

</details>
</li>

<li>
<details>
<summary>Dashboard didn't display correctly if more than 10 policies assigned to a key</summary>

We have resolved an issue where the Keys page would display a blank screen if a key was associated with more than 10 policies. The UI has been fixed to display the page properly, regardless of the number of policies attached to a key.

</details>
</li>

<li>
<details>
<summary>Dashboard UI did not prevent multiple versions of a Tyk Classic API from being assigned to a policy</summary>

When working with Tyk Classic APIs, you cannot permit access to multiple versions of the same API from a single policy. We have fixed an issue in the Dashboard UI where users were able to attach multiple versions to a policy leading to an unusable policy. The UI now correctly prevents the addition of multiple versions of an API to a single policy.

</details>
</li>

<li>
<details>
<summary>Dashboard didn't correctly record scope to policy mappings for JWTs</summary>

We have fixed an issue in the Dashboard UI when assigning multiple claim to policy mappings while configuring JWT auth for an API. The scope name was incorrectly recorded instead of the policy ID for the second and subsequent JWT scope mappings. The UI now correctly associates the defined claim with the appropriate policy, ensuring accurate JWT scope to policy mappings.

</details>
</li>

<li>
<details>
<summary>Gateway logs page not displaying correctly</summary>

We have fixed an issue in the Monitoring section of the Dashboard UI where the *Gateway logs* page was not displaying correctly. The page is now rendered properly, ensuring users with appropriate permissions can view and manage *Gateway logs* as expected.

</details>
</li>

</ul>

---

## 5.5 Release Notes

### 5.5.2 Release Notes

#### Release Date 03 October 2024

#### Release Highlights

This release replaces Tyk Dashboard 5.5.1 which was accidentally released as a non-distroless image.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.5.2}

##### Compatibility Matrix For Tyk Components

| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.2 | MDCB v2.7     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.2}

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

#### Deprecations

There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.5.2}

If you are upgrading to 5.5.2, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.2)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.2
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})

#### Changelog {#Changelog-v5.5.2}

No changes in this release.

---

### 5.5.1 Release Notes

#### Release Date 26 September 2024

#### Release Highlights

This is a version bump to align with Gateway v5.5.1, no changes have been implemented in this release.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.5.1}

##### Compatibility Matrix For Tyk Components

| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.5.1 | MDCB v2.7     | MDCB v2.5.1 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v2.0.0 | Helm all versions |
| | EDP v1.10 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.1}

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

#### Deprecations

There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.5.1}

If you are upgrading to 5.5.1, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.1)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.1
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})

#### Changelog {#Changelog-v5.5.1}

No changes in this release.

---

### 5.5.0 Release Notes

#### Release Date 12 August 2024

#### Release Highlights

We are excited to announce Tyk Dashboard 5.5, featuring a brand-new dashboard identity, advanced rate-limiting capabilities, and enhanced security options. For a comprehensive list of changes, please refer to the [changelog]({{< ref "#Changelog-v5.5.0">}}) below.

##### New Tyk brand identity

Experience a refreshed and modern look with our updated brand identity. The new design enhances usability and provides a cleaner, more intuitive interface for managing your APIs.

##### Per Endpoint Rate Limiting

Now configure rate limits at the endpoint level for both [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-oas" >}}) and [Tyk Classic APIs]({{< ref "product-stack/tyk-gateway/middleware/endpoint-rate-limit-classic" >}}), providing granular protection for upstream services against overloading and abuse.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.5.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->
##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.5.0}
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
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.5.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.5.0
  ```
- Helm charts
  - [tyk-charts v1.6]({{< ref "/developer-support/release-notes/helm-chart#160-release-notes" >}})

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

##### Changed

<ul>
<li>
<details>
<summary>Updated NPM packages dependencies</summary>

Updated npm package dependencies of Dashboard, to address security vulnerabilities.
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

Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:
- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>

---

## 5.4 Release Notes
### 5.4.0 Release Notes
#### Release Date 2 July 2024
#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**
There are no breaking changes in this release.

#### Dependencies {#dependencies-5.4.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->
##### Compatibility Matrix For Tyk Components
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

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.4.0}
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

We're thrilled to introduce exciting enhancements in Tyk Dashboard 5.4, aimed at improving your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the change log below.

#### Event handling for Tyk OAS APIs

We’ve added support for you to register webhooks with your Tyk OAS APIs so that you can handle events triggered by the Gateway, including circuit breaker and quota expiry. You can also assign webhooks to be fired when using the new smoothing rate limiter to notify your systems of ongoing traffic spikes. For more details see the [documentation]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}).

#### Enhanced Header Handling in GraphQL APIs

Introduced a features object in API definitions for GQL APIs, including the `use_immutable_headers` attribute. This allows advanced header control, enabling users to add new headers, rewrite existing ones, and selectively remove specific headers. Existing APIs will have this attribute set to `false` by default, ensuring no change in behavior. For new APIs, this attribute is true by default, facilitating smoother migration and maintaining backward compatibility.

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.4.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.4.0
  ```
- Helm charts
  - [tyk-charts v1.5]({{< ref "/developer-support/release-notes/helm-chart#150-release-notes" >}})

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
<summary>Fixed template inheritance issue in API Designer</summary>

Resolved a bug in the API Designer where certain properties, such as `use_immutable_headers`, were not correctly inherited from the new API template. This fix ensures all default settings from the template are properly applied when creating a new API.
</details>
</li>
<li>
<details>
<summary>Corrected assignment issue for API Templates in Tyk organizations</summary>

Fixed an issue where API Templates were not correctly assigned to Tyk Organizations, preventing potential accidental sharing of secret data between Organizations through the use of incorrect templates.
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
Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:
- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>

---
<!--

-->


## 5.3 Release Notes

### 5.3.9 Release Notes

#### Release Date 31 December 2024

#### Release Highlights
This release contains bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.9">}}) below.

#### Breaking Changes

This release has no breaking changes.

#### Dependencies {#dependencies-5.3.9}

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.9 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.9}
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

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
We have deprecated the obsolescent `http_server_options.prefer_server_ciphers` configuration option. This legacy control no longer has any effect on the underlying library and users are advised to remove this setting from their configurations.

#### Upgrade Instructions
If you are upgrading to 5.3.9, please follow the detailed [upgrade instructions](#upgrading-tyk).

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.9)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.3.9
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "developer-support/release-notes/helm-chart#200-release-notes" >}})

#### Changelog {#Changelog-v5.3.9}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>
<li>
<details>
<summary>Fixed Issue with Restore Zooming in API Activity Dashboard</summary>

Resolved a bug where clicking "Restore zooming to initial state" in the API Activity Dashboard would cause the graph to show blank instead of resetting to the initial zoom level. This fix ensures that users can now correctly restore the default zoom state in all charts on the Dashboard.
</details>
</li>
<li>
<details>
<summary>Deprecation of http_server_options.prefer_server_ciphers</summary>

This option has been marked as deprecated due to its obsolescence in the underlying library functions used by Tyk. Users are advised to remove this configuration from their setups as it no longer has any effect.
</details>
</li>
<li>
<details>
<summary>CVE-2020-8911 resolved in Tyk Dashboard</summary>

Resolved CVE-2020-8911 by updating the Tyk Dashboard's email driver to use AWS SDK v2, addressing a medium-severity security vulnerability identified in version 5.3.8. This update ensures enhanced security for the Dashboard while maintaining functionality.
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

#### Dependencies {#dependencies-5.3.8}

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.8 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.8}
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

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

This is an advanced notice that the dedicated External OAuth, OpenID Connect (OIDC) authentication options, and SQLite support will be deprecated starting in version 5.7.0. We recommend that users of the [External OAuth]({{< ref "/api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}}) and [OpenID Connect]({{< ref "/api-management/client-authentication#integrate-with-openid-connect-deprecated" >}}) methods migrate to Tyk's dedicated [JWT Auth]({{< ref "/api-management/client-authentication#use-json-web-tokens-jwt" >}}) method. Please review your API configurations, as the Gateway logs will provide notifications for any APIs utilizing these methods.

#### Upgrade Instructions
If you are upgrading to 5.3.8, please follow the detailed [upgrade instructions](#upgrading-tyk).


#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.8)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.3.8
    ```
- Helm charts
  - [tyk-charts v2.0.0]({{< ref "developer-support/release-notes/helm-chart#200-release-notes" >}})

#### Changelog {#Changelog-v5.3.8}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->
##### Added

<ul>
<li>
<details>
<summary>Advanced notice of deprecation of dedicated External OAuth and OpenID Connect auth options</summary>

The UI now displays a deprecation notice for the dedicated [External OAuth]({{< ref "/api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}}) and [OpenID Connect (OIDC)]({{< ref "api-management/client-authentication#integrate-with-openid-connect-deprecated" >}}) authentication mechanisms. This provides advanced notification that these authentication options will be deprecated in version 5.7.0. Users are advised to migrate to the [JWT Auth]({{< ref "/api-management/client-authentication#use-json-web-tokens-jwt" >}}) method, which supports integration with both OAuth and OIDC providers, in preparation for future upgrade.
</details>
</li>
</ul>

##### Fixed
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>User Group dropdown limitations in Dashboard</summary>

Fixed an issue with the user group dropdown in the Dashboard UI, ensuring that all available user groups are displayed when creating a new user.
</details>
</li>
<li>
<details>
<summary>Rate Limiting settings not saved when Upstream Certificates enabled for Tyk OAS API</summary>

Fixed an issue in the Tyk OAS API Designer where Rate Limiting settings were not saved when Upstream Certificates were enabled. This fix ensures that both Rate Limits and Upstream Certificates configurations can now be saved together
</details>
</li>
</ul>

---
### 5.3.7 Release Notes

#### Release Date 22 October 2024

#### Release Highlights

This is a version bump to align with Gateway v5.3.7, no changes have been implemented in this release.

#### Breaking Changes

There are no breaking changes in this release.

#### Dependencies {#dependencies-5.3.7}

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.7 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.7}
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

#### Deprecations

There are no deprecations in this release.

#### Upgrade instructions {#upgrade-5.3.7}

If you are upgrading to 5.3.7, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.7)
- ```bash
  docker pull tykio/tyk-dashboard:v5.3.7
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})

#### Changelog {#Changelog-v5.3.7}

No changes in this release.

---

### 5.3.6 Release Notes

#### Release Date 04 October 2024

#### Release Highlights

This release primarily focuses on bug fixes. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.6">}}) below.

#### Breaking Changes
**Attention**: Please read this section carefully.
Docker images are now based on [distroless](https://github.com/GoogleContainerTools/distroless). No shell is shipped in the image.  

If moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
When upgrading to 5.3.6, please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Dependencies {#dependencies-5.3.6}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.6).


With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.6).


##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.6 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.6}
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

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.6)
 - ```bash
   docker pull tykio/tyk-dashboard:v5.3.6
   ```
- Helm charts
 - [tyk-charts v2.0]({{< ref "developer-support/release-notes/helm-chart#200-release-notes" >}})

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
<summary>Upgrade to Go 1.22 for Tyk Dashboard</summary>
The Tyk Dashboard has been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance, strengthened security, and access to the latest features available in the new Golang release.
</details>
</li>
<li>
 <details>
 <summary>Introducing Distroless Containers for Tyk Dashboard (2024 LTS)</summary>
 
 In this release, we've enhanced the security of the Tyk Dashboard image by changing the build process to support [distroless](https://github.com/GoogleContainerTools/distroless) containers. This significant update addresses critical CVEs associated with Debian, ensuring a more secure and minimal runtime environment. Distroless containers reduce the attack surface by eliminating unnecessary packages, which bolsters the security of your deployments.
 </details>
 </li>
</ul>

##### Fixed
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Gateway secret could be exposed in debug logs
</summary>

Resolved an issue where the Gateway secret was inadvertently included in the log generated by the Dashboard for a call to the `/api/keys` endpoint when in debug mode. This issue has been fixed to prevent sensitive information from appearing in system logs.
</details>
</li>

<li>
<details>
<summary>Dashboard didn't display correctly if more than 10 policies assigned to a key
</summary>

We have resolved an issue where the Keys page would display a blank screen if a key was associated with more than 10 policies. The UI has been fixed to display the page properly, regardless of the number of policies attached to a key.
</details>
</li>

<li>
<details>
<summary>Dashboard UI did not prevent multiple versions of a Tyk Classic API from being assigned to a policy</summary>

When working with Tyk Classic APIs, you cannot permit access to multiple versions of the same API from a single policy. We have fixed an issue in the Dashboard UI where users were able to attach multiple versions to a policy leading to an unusable policy. The UI now correctly prevents the addition of multiple versions of an API to a single policy.
</details>
</li>

<li>
<details>
<summary>Dashboard didn't correctly record scope to policy mappings for JWTs
</summary>

We have fixed an issue in the Dashboard UI when assigning multiple claim to policy mappings while configuring JWT auth for an API. The scope name was incorrectly recorded instead of the policy ID for the second and subsequent JWT scope mappings. The UI now correctly associates the defined claim with the appropriate policy, ensuring accurate JWT scope to policy mappings.
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

Fixed the following high-priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:
- [CVE-2024-6104](https://nvd.nist.gov/vuln/detail/CVE-2024-6104)
</details>
</li>
   
</ul>

---

### 5.3.5 Release Notes


#### Release Date 26 September 2024


#### Release Highlights

This is a version bump to align with Gateway v5.3.5, no changes have been implemented in this release.

#### Breaking Changes

**Attention**: Please read this section carefully.

There are no breaking changes in this release, however, if moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).


#### Deprecations

There are no deprecations in this release.


#### Upgrade Instructions

When upgrading to 5.3.5, please follow the [detailed upgrade instructions](#upgrading-tyk).


#### Dependencies {#dependencies-5.3.5}

<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.5).


With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.5).


##### Compatibility Matrix For Tyk Components

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.5| MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v2.0.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.5}

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

#### Downloads

- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.5)
 - ```bash
   docker pull tykio/tyk-dashboard:v5.3.5
   ```
- Helm charts
 - [tyk-charts v2.0.0]({{<ref "developer-support/release-notes/helm-chart#200-release-notes">}})

#### Changelog {#Changelog-v5.3.5}

 No changes in this release.

---

### 5.3.4 Release Notes

#### Release Date August 26 2024

#### Breaking Changes
**Attention**: Please read this section carefully.
There are no breaking changes in this release, however, if moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
When upgrading to 5.3.4 please follow the [detailed upgrade instructions](#upgrading-tyk).


#### Release Highlights
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.4">}}) below.

#### Dependencies {#dependencies-5.3.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.3).


With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.3).


##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.4 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.4}
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

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.4)
 - ```bash
   docker pull tykio/tyk-dashboard:v5.3.4
   ```
- Helm charts
 - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})

#### Changelog {#Changelog-v5.3.4}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Fixed display issue for API stats</summary>

Fixed API’s stats not being shown when adding 2 or more tags in the Activity page and using Postgres
</details>
</li>

<li>
<details>
<summary>Fixed display issue of 429 status codes on the Activity page</summary>

Fixed 429 status codes not being shown on the Activity page when using Postgres
</details>
</li>

<li>
<details>
<summary>Fixed display of graphs and requests counter on Portal</summary>

Fixed wrong graphs and incorrect requests counter on Portal when using Postgres
</details>
</li>

<li>
<details>
<summary>Fixed Error Breakdown display issues with dates</summary>

Fixed Error Breakdown issues with dates (it was showing errors that happened on different dates than the one that was actually displayed)
</details>
</li>
</ul>
   
---
### 5.3.3 Release Notes

#### Release Date August 2nd 2024

#### Breaking Changes
**Attention**: Please read this section carefully.
There are no breaking changes in this release, however, if moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
When upgrading to 5.3.3 please follow the [detailed upgrade instructions](#upgrading-tyk).

#### Release Highlights

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.3">}}) below.

#### Dependencies {#dependencies-5.3.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:
Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.3).


With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.3).


##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.3 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.3}
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

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.3)
 - ```bash
   docker pull tykio/tyk-dashboard:v5.3.3
   ```
- Helm charts
 - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})

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
<summary>Corrected ordering of Tyk OAS API paths to prevent Middleware misapplication</summary>

Fixed an issue where nested API endpoints, such as '/test' and '/test/abc', might incorrectly apply middleware from the parent path to the nested path. The fix ensures that API endpoint definitions are correctly ordered, preventing this middleware misapplication and ensuring both the HTTP method and URL match accurately.
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
<summary>Save API button now visible for all users</summary>

Addressed an issue in SSO where user permissions were not correctly applied, ensuring the Save API button is visible to all users in the Dashboard UI.
</details>
</li>
<li>
<details>
<summary>Dashboard blank page issue when retrieving key for API with mTLS and dynamic JWT Auth fixed</summary>

Resolved a bug causing the Dashboard UI to display a blank page when creating a key for an API using static mTLS with dynamic JWT authentication. 
</details>
</li>
<li>
<details>
<summary>Empty Endpoint popularity page issue resolved in version 5.3.1</summary>

Addressed an issue where the Dashboard displayed an empty page when accessing Activity by Endpoint information after upgrading to Tyk 5.3.1. Users can now see all necessary information.             
</details>
</li>
</ul>

---

### 5.3.2 Release Notes


#### Release Date 5th June 2024 


#### Breaking Changes
**Attention**: Please read this section carefully.


There are no breaking changes in this release, however if moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).


#### Deprecations
There are no deprecations in this release.


#### Upgrade Instructions
When upgrading to 5.3.2 please follow the [detailed upgrade instructions](#upgrading-tyk).


#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.2">}}) below.


#### Dependencies {#dependencies-5.3.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:


Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.


3rd party dependencies and tools -->


With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.2).

With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.2).

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.2 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.4.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |


##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.2}
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


#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.2)
  - ```bash
    docker pull tykio/tyk-dashboard:v5.3.2
    ```
- Helm charts
  - [tyk-charts v1.4]({{< ref "developer-support/release-notes/helm-chart#140-release-notes" >}})


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
<summary>Fixed Dashboard Analytics for PostgreSQL</summary>

Resolved an issue in the `api/usage` endpoint where the Dashboard with PostgreSQL integration returned unfiltered results when one valid tag was used. Corrected the need for duplicating the same parameter as a workaround for filtering by multiple tags. Results are now properly filtered as expected, improving the accuracy and reliability of analytics data.
</details>
</li>
<li>
<details>
<summary>Enhanced Password Reset security</summary>

Modified default OPA rules to prevent unauthorized admins from modifying other admins' passwords, mitigating potential 'rogue admin' behavior. Tyk Dashboard clients using custom OPA rules should update their rule set accordingly. Contact your assigned Tyk representative for assistance.
</details>
</li>
<li>
<details>
<summary>Fixed Universal Data Graph Schema Editor Import Issue</summary>

Resolved an issue in the GQL schema editor for Data Graphs, where users couldn't utilize the 'Import Schema' button. Now, it's possible to import files containing GQL schemas into the Dashboard.
</details>
</li>
<li>
<details>
<summary>Enhanced Dashboard UI language</summary>

Adjusted wording in Tyk's Dashboard UI to ensure inclusivity and clarity, removing any potentially oppressive language.
</details>
</li>
<li>
<details>
<summary>API Template not associated with Tyk Organization</summary>

Fixed an issue where API Templates were not correctly assigned to Tyk Organizations allowing the potential for accidental sharing of secret data between Organizations through use of the incorrect template.
</details>
</li>
<li>
<details>
<summary>Added control over access to context variables from middleware when using Tyk OAS APIs</summary>

Addressed a potential issue when working with Tyk OAS APIs where request context variables are automatically made available to relevant Tyk and custom middleware. We have introduced a control in the Tyk OAS API definition to disable this access if required.
</details>
</li>
<li>
<details>
<summary>Resolved PostgreSQL Dashboard Analytics issue</summary>

Fixed an issue in the api/usage endpoint where Dashboard+Postgres returned unfiltered results with one valid tag, requiring duplication of the parameter as a workaround for multiple tags. Analytics now correctly filter results as expected.
</details>
</li>
</ul>

---

### 5.3.1 Release Notes

#### Release Date 24 April 2024

#### Breaking Changes
**Attention**: Please read this section carefully.

There are no breaking changes in this release, however if moving from a version of Tyk older than 5.3.0 please read the explanation provided with [5.3.0 release]({{< ref "#TykOAS-v5.3.0">}}).

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
When upgrading to 5.3.1, please follow the [detailed upgrade instructions](#upgrading-tyk).


#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.3.1">}}) below.

#### Dependencies {#dependencies-5.3.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database. If you are [using MongoDB]({{< ref "tyk-self-managed#mongodb" >}}) we recommend that you upgrade to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.1).

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.1 | MDCB v2.5.1     | MDCB v2.5.1 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.1}
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.1)
- ```bash
  docker pull tykio/tyk-dashboard:v5.3.1
  ```
- Helm charts
  - [tyk-charts v1.3]({{< ref "developer-support/release-notes/helm-chart#130-release-notes" >}})

#### Changelog {#Changelog-v5.3.1}

##### Fixed

<ul>
<li>
<details>
<summary>Improved security: user search method transitioned to POST</summary>

Improved the behavior of the Dashboard when searching for users to avoid transmitting sensitive information (user email addresses) in the request query parameters. Deprecated the `GET` method for the `/api/users/search` endpoint in favor of a `POST` method with the same logic but with parameters supplied in the request body.
</details>
</li>
<li>
<details>
<summary>Improved security: removal of Access-Control-Allow-Credentials header</summary>

As Tyk Dashboard and Tyk Classic Portal do not accept cross origin requests we have removed the `Access-Control-Allow-Credentials` header from Dashboard API responses to prevent any potential misuse of the header by attackers. This allows simplification of the web application's security configuration.
</details>
</li>
<li>
<details>
<summary>Improved security: mitigation against brute force attacks based on login response time analysis</summary>

Implemented a randomised delay to obscure login response times, mitigating brute force attacks that rely on response time analysis.
</details>
</li>
<li>
<details>
<summary>Improved security: now unable to log into deleted Orgs</summary>

Fixed a bug where a user was still able to log into an Organization on the Tyk Dashboard after that Organization had been deleted. Now, when an Organization is deleted, it will not be offered as an option when logging in.
</details>
</li>
<li>
<details>
<summary>Improved security: suppressed accidental exposure of access keys to stdout</summary>

Fixed an issue where access keys could accidentally also be printed to the Dashboard's stdout when a call was made to `/api/keys` to retrieve the keys. This has now been suppressed.
</details>
</li>
<li>
<details>
<summary>Endpoint Designer does not handle wildcards in GraphQL policy allow/block lists</summary>

The Endpoint Designer did not correctly display a GraphQL policy's allow or block list if a wildcard character (`*`) was used in the list's definition. This has been fixed and now, if the wildcard (`*`) is present in the allow/block list definition, the UI correctly displays the list of allowed/blocked fields.
</details>
</li>
<li>
<details>
<summary>Open Policy Agent editor fails to open on Windows platform</summary>

Fixed an issue that was preventing the OPA editor from being visible using the keyboard shortcut when using Microsoft Windows.
</details>
</li>
<li>
<details>
<summary>Common keyboard shortcuts not working with UDG URL field in Data Graph Designer</summary>

Fixed an issue where common keyboard shortcuts (Cmd + X, A, C, V) were not working correctly when configuring the URL field for a UDG data source.
</details>
</li>
<li>
<details>
<summary>Unexplained HTTP 400 error reported in Tyk OAS API Designer</summary>

Fixed an issue in the Tyk OAS API Designer where there was no input validation of the OAuth Introspection URL. The Gateway reported an HTTP 400 error when attempting to save an API with an illegal value, however the API Designer did not guide the user to the source of the error. Now there is automatic validation of the text entered in the Introspection URL field.
</details>
</li>
<li>
<details>
<summary>Replaced the text editor used in Tyk Dashboard to address cursor issues</summary>

Fixed an issue with the text editor in the Tyk OAS API Designer where the cursor was misaligned with where characters would be entered. We have replaced the text editor module throughout the Tyk Dashboard to use a more modern, supported library.
</details>
</li>
<li>
<details>
<summary>Activity by Graph chart sometimes had display issues</summary>

The 'Top 5 Errors by Graph' bar chart in the Activity by Graph dashboard experienced display issues with long graph names and sometimes showed empty bars. This has been resolved, and the chart now displays accurately.
</details>
</li>
<li>
<details>
<summary>Analytics screens fail when too many requests are aggregated</summary>

Fixed a bug where some Tyk Dashboard analytics screens stopped working when the analytics aggregates collection grew too large.
</details>
</li>
<li>
<details>
<summary>Unable to delete APIs from DocumentDB storage</summary>

In [Tyk 5.2.2]({{< ref "#Changelog-v5.2.2" >}}) we fixed an issue when using MongoDB and Tyk Security Policies where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This introduced an unintended side-effect for users of DocumentDB such that they were unable to delete APIs from the persistent storage. We identified that this was due to the use of the `$expr` operator in the solution - and discovered that this is supported by MongoDB but not by DocumentDB. We have now reimplemented the fix and removed the limitation introduced for DocumentDB users.
</details>
</li>
<li>
<details>
<summary>Unable to clear the API cache in distributed data plane Gateways from the control plane Dashboard</summary>

Addressed a bug where clearing the API cache from the Tyk Dashboard failed to invalidate the cache in distributed data plane gateways.
</details>
</li>
</ul>

---

### 5.3.0 Release Notes

#### Release Date 5 April 2024

#### Deployment Options for Tyk Dashboard

##### Tyk Cloud
Tyk Dashboard 5.3.0 is available on Tyk Cloud since 5th April 2024.

##### Self-Managed
This release is ready for installation on your own infrastructure.

#### Breaking Changes

**Attention: Please read this section carefully.**

##### Tyk OAS APIs Compatibility Caveats {#TykOAS-v5.3.0}

This upgrade transitions Tyk OAS APIs out of [Early Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}).

- **Out of Early access**
  - This means that from now on, all Tyk OAS APIs will be backwards compatible and in case of a downgrade from 5.3.X to 5.3.0, the Tyk OAS API definitions will always work.
- **Not Backwards Compatible**
  - Tyk OAS APIs in Tyk Dashboard v5.3.0 are not [backwards compatible](https://tinyurl.com/3xy966xn). This means that the new Tyk OAS API format used by Tyk Gateway/Dashboard v5.3.X does not work with older versions of Tyk Gateway/Dashboard, i.e. you cannot export these API definitions from a v5.3.X Tyk Dashboard and import to an earlier version.
  - The upgrade of Tyk OAS API definitions is **not reversible**, i.e. you cannot use version 5.3.X Tyk OAS API definitions with an older version of Tyk Dashboard.
  - This means that if you wish to downgrade or revert to your previous version of Tyk, you will need to restore these API definitions from a backup. Please go to the [backup]({{< ref "#upgrade-instructions" >}}) section for detailed instructions on backup before upgrading to v5.3.0.
  - When using MongoDB as your persistent data store, Tyk OAS APIs from v5.3.0 require a minimum version of MongoDB 5.0.
  - If you are not using Tyk OAS APIs, Tyk will maintain backward compatibility standards.
- **Not Forward Compatible**
  - Tyk OAS API Definitions prior to v5.3.0 are not [forward compatible](https://tinyurl.com/t3zz88ep) with Tyk Gateway v5.3.X.
  - This means that any Tyk OAS APIs created in any previous release (4.1.0-5.2.x) cannot work with the new Tyk Dashboard v5.3.X without being migrated to its [latest format]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}).
- **MDCB deployment and Tyk OAS APIs**
  - Tyk OAS APIs created in Tyk v5.3.0 will not be loaded by the data plane gateways if you are using MDCB v2.4 or older. This means that MDCB users already working with Tyk OAS APIs **must wait for the release of MDCB v2.5** before upgrading Tyk Gateway and Dashboard to v5.3.0. 
  - Tyk Dashboard v5.3.0 managing Tyk OAS APIs requires Tyk Gateway v5.3.0 and MDCB v2.5.X for proper functionality. Older versions of Tyk Gateway may experience compatibility issues with Tyk OAS API definitions from v5.3.0.
- **After upgrade (the good news)**
  - If you had a Tyk OAS API prior to v5.3.0 then Tyk Dashboard will automatically update the API definition to [latest format]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}).
  - This means that you do not have to do anything to make your Tyk OAS APIs compatible with the new 5.3.0 release as Tyk Dashboard will take care of that during start-up.
  - As mentioned above, this upgrade of Tyk OAS API definitions is irreversible.
  
**Important:** Please go to the [backup]({{< ref "#upgrade-instructions" >}}) section for essential instructions on how to backup before upgrading to v5.3.0
 
#### Dependencies {#dependencies-5.3.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

With MongoDB 4.4 reaching [EOL](https://www.mongodb.com/legal/support-policy/lifecycles) in February 2024, we can no longer guarantee full compatibility with this version of the database and recommend upgrading to a version that we have tested with, as indicated [below](#3rdPartyTools-v5.3.0).

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.0 | MDCB v2.5     | MDCB v2.5 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

##### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.3.0}
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions {#upgrade-5.3.0}

**The following steps are essential to follow before upgrading**

1. For Self Managed deployments - Backup Your environment using the [usual guidance]({{<ref "developer-support/upgrading#tyk-upgrade-guides-for-different-deployment-models">}}) documented with every release (this includes backup config file and database).
2. For all deployments - Backup all your API definitions (Tyk OAS API and Classic Definitions):
   - For Tyk Cloud deployments - To perform the backup please use our guide for [exporting APIs and policies]({{<ref "developer-support/upgrading#backup-apis-and-policies">}}).
   - For Self-Managed deployments -  To perform the backup please use [Tyk Sync]({{<ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}).
4. Performing the upgrade - For all deployments, follow the instructions in the [upgrade guide](#upgrading-tyk) when upgrading Tyk.

#### Release Highlights

We are excited to announce the release of 5.3.0, packed with new features, improvements and bug fixes to enhance your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.3.0) below.

##### Tyk OAS Feature Maturity

Tyk OAS is now out of [Early Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}) as we have reached feature maturity. You are now able to make use of the majority of Tyk's features from your Tyk OAS APIs, so they are a credible alternative to the legacy Tyk Classic APIs.
From Tyk 5.3.0 we support the following features when using Tyk OAS APIs with Tyk Dashboard:
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
    - API Categories
    - API Ownership

##### API Templates

Exclusively for Tyk OAS APIs, we are pleased to announce the introduction of API Templates: an API governance feature provided to streamline the process of creating APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition. With templates you can standardize configuration of your APIs more easily, combining your service-specific OpenAPI descriptions with enterprise requirements such as health endpoints, caching and authorization.

##### Enhanced User Permissions

 Introducing allow list in field-based permissions via the Dashboard specifically tailored for GraphQL APIs. Users can now define granular access control for API key holders based on types and fields from a GraphQL schema. This feature enhances security and flexibility in managing API access, providing a more tailored and secure experience for users.

 ##### Global Header Management 

 We've introduced global header management specifically for UDG, simplifying header configuration across all data sources. Users can now effortlessly add, adjust, and delete multiple global headers, ensuring consistency and efficiency throughout API management, ultimately saving developers time and effort

##### GraphQL focused analytics
We have made the first step towards bringing our users GraphQL-focused monitoring capabilities. Users can now gain valuable insights into error trends and usage patterns for GraphQL APIs, when storing graph analytics in SQL databases. With the addition of popularity and error bar charts, users can delve deeper into their data, facilitating optimization and troubleshooting efforts.

##### Redis v7.x Compatibility
We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

##### MongoDB v7.0.x Compatibility
We have upgraded `mongo-go` driver to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that both Tyk 5.0.x+ and Tyk 5.3 are compatible with MongoDB v7.0.x.

#### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.3.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.3.0
  ```
- Helm charts
  - [tyk-charts GH Repo](https://github.com/TykTechnologies/tyk-charts/releases)

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
<summary>Additional features now supported in Tyk OAS API Designer when working with Tyk OAS APIs</summary>

The following features have been added in 5.3.0 to bring Tyk OAS to feature maturity:
  - Detailed log recording (include payload in the logs)
  - Enable Open Telemetry tracing
  - API-level header transforms (request and response)
  - Endpoint-level cache
  - Circuit breakers
  - Track endpoint logs for inclusion in Dashboard aggregated data
  - Do-not-track endpoint
  - Enforced upstream timeouts
  - Configure endpoint as Internal (not available externally)
  - URL rewrite
  - Per-endpoint request size limit
  - Request transformation - method, header
  - Response transformation - header
  - Custom domain certificates
</details>
</li>
<li>
<details>
<summary>Implemented Design Elements for GraphQL Permissions</summary>

Support for field-based permissions allow list has been added in the Dashboard. Users can now define which types and fields from a GraphQL schema an API key holder can access by simply putting a tick next to them in the policy/key definition screens.
</details>
</li>
<li>
<details>
<summary>Added API Categories support for Tyk OAS APIs</summary>

In this update, we've added support for API Categories for Tyk OAS APIs in the Tyk Dashboard, enhancing portfolio management by enabling efficient categorization and organization of APIs.
</details>
</li>
<li>
<details>
<summary>Added API Ownership support for Tyk OAS APIs</summary>

We’ve extended the API ownership capabilities of Tyk Dashboard to Tyk OAS APIs. This feature allows you to manage visibility of APIs deployed on the Dashboard, streamlining governance processes and enhancing internal security.
</details>
</li>
<li>
<details>
<summary>Added API Templates for Tyk OAS APIs</summary>

Extended Tyk Dashboard API to support CRUD operations on API Templates, enabling users to create, apply, and manage templates programmatically.

Added Dashboard UI functionality for creation and management of API Templates, including the ability to create templates from existing Tyk OAS APIs. You can apply templates during API creation, including when importing OpenAPI documents. Access to API templates is controlled through the introduction of a new user permission.
</details>
</li>
<li>
<details>
<summary>Import OpenAPI Documents from File or URL</summary>

Now you can import the OpenAPI description from a file or URL when creating or updating your Tyk OAS APIs.
</details>
</li>
<li>
<details>
<summary>Introduced Global Header Management for GraphQL </summary>

Access the new Global Header Management feature directly through the Headers Management tab. Swiftly add and configure multiple global headers or remove them with a single click, ensuring they're forwarded to all GraphQL data sources. This enhancement streamlines header management, providing a more user-friendly experience.
</details>
</li>
<li>
<details>
<summary>Added monitoring capabilities for GraphQL APIs in the Dashboard</summary>

We’ve enabled basic Graph monitoring in the Dashboard. Due to the specificity of GQL APIs, monitoring them as you would REST, is not enough. One endpoint vs multiple endpoints, multiple queries/mutations vs HTTP methods, errors that happen not only in HTTP layer but also come back in response body - that all makes monitoring GQL slightly more complex than just looking at request and error rates.

A new section of the Dashboard offers the following information:
- top 5 most popular graphs and operations requested within them within a specified period of time
- top 5 graphs with errors within a specified period of time
- summary of number of requests, number of successful responses, number of errors, average latency and last access date within a specified period of time for all graphs
</details>
</li>

<li>
<details>
<summary>Support MongoDB v7.0.x</summary>

Tyk 5.3 integrates with [storage v1.2.2](https://github.com/TykTechnologies/storage), which updated mongo-go driver we use from v1.11.2 to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that Tyk 5.0.x+ is compatible with MongoDB v7.0.x 
</details>
</li>

<li>
<details>
<summary>Support Redis v7.0.x</summary>
 
Tyk 5.3 refactors Redis connection logic by using [storage v1.2.2](https://github.com/TykTechnologies/storage/releases/tag/v1.2.2), which integrates with [go-redis](https://github.com/redis/go-redis) v9. Subsequently, support now exists for Redis v7.0.x.
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
<summary>Enhanced Dashboard Navigation: Introducing Favorite Screens</summary>

Every Dashboard menu item can now be flagged as a favorite so that it is pinned to the top of the menu navigation bar for easier access. We've also made a few changes in styling, so that the navigation menu is nicer to look at.
</details>
</li>
<li>
<details>
<summary>Improved UI for GraphQL Data Source Headers Management</summary>

We have moved data source header management to a separate tab, so that it is easy to configure global headers that will be forwarded to all data sources by default. The data source configuration screen displays all headers that will be sent with the upstream request in read-only mode now and changes can be made by switching to Headers Management tab.
</details>
</li>
<li>
<details>
<summary>Go 1.21 upgrade for Dashboard</summary>

We have updated Tyk Dashboard to use Go 1.21, matching the upgrade in Tyk Gateway 1.21. Remember to recompile any custom Go plugins with the matching version of Go to avoid incompatibility problems.
</details>
</li>
<li>
<details>
<summary>The internal TIB session secret defaults to admin_secret if it is not set explicitly</summary>

If internal TIB is enabled in Dashboard and the TYK_IB_SESSION_SECRET environment variable is not set, it will be default to Dashboard admin_secret. It provides better security and user experience because SSO flow would not work if TYK_IB_SESSION_SECRET is not set.
</details>
</li>
<li>
<details>
<summary>Set default MongoDB driver to mongo-go</summary>

Tyk uses `mongo-go` as the default MongoDB driver from v5.3. This provides support for MongoDB 4.4.x, 5.0.x, 6.0.x and 7.0.x. If you are using older MongoDB versions e.g. 3.x, please set MongoDB driver to `mgo`. The [MongoDB supported versions](https://tyk.io/docs/tyk-self-managed#supported-versions) page provides details on how to configure MongoDB drivers in Tyk.
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
<summary>Resolved OPA rule restriction on UDG OAS import endpoint</summary>

We fixed an issue where OPA rules were preventing users from importing an OpenAPI document as a UDG data source using the /api/data-graphs/data-sources/import endpoint. The endpoint has now been included into the correct user permission group and will be accessible for users who have `api:write` permissions.
</details>
</li>
<li>
<details>
<summary>Optimized Policy Creation Endpoint</summary>

Fixed an issue where applying security policies to large numbers of APIs took a long time. We’ve implemented bulk processing in the validation step at the api/portal/policies/POLICY_ID endpoint, resulting in an 80% reduction in the time taken to apply a policy to 2000 APIs.
</details>
</li>
<li>
<details>
<summary>Improved Security for Classic Portal</summary>

Moved all HTML inline scripts to their own script files, to accommodate the content security policies that have been enabled, to increase security.
</details>
</li>
<li>
<details>
<summary>Errors importing larger OpenAPI Documents</summary>

Fixed an issue when importing reasonably large OpenAPI documents via the Dashboard would fail due to MongoDB storage limitation of 16 MB per document.
</details>
</li>
<li>
<details>
<summary>Removed the need for a Description to be provided in the OpenAPI schema when autogenerating a Tyk OAS mock response</summary>

Relaxed the strict validation for mock response so that the `Description` field is now optional for `response`, `responses` and `schema` within the OpenAPI description. Automatically configuring mock responses when using [Tyk OAS APIs]({{< ref "product-stack/tyk-gateway/middleware/mock-response-openapi" >}}) is now even easier.
</details>
</li>
<li>
<details>
<summary>Fixed SSO flow for Classic Developer Portal</summary>

For Classic Portal cookies and Dashboard, use `SameSite = SameSiteLaxMode` so that SSO flows can be performed
</details>
</li>
<li>
<details>
<summary>Remove unnecessary warning output from `tyk-dashboard --version`</summary>
   
Remove the following unnecessary warning output when users use the `tyk-dashboard --version` command to check dashboard version. 
> `WARN toth/tothic: no TYK_IB_SESSION_SECRET environment variable is set. The default cookie store is not available and any calls will fail. Ignore this warning if you are using a different store.`
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
   
Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:
- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>



---

<!--

-->




## 5.2 Release Notes 
### 5.2.5 Release Notes 

**Release Date 19 Dec 2023**

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
Dashboard 5.2.5 was version bumped only, to align with Gateway 5.2.5. Subsequently, no changes were encountered in release 5.2.5. Gateway 5.2.5 was a critical patch release. For further information please see the release notes for Gateway [v5.2.5]({{< ref "developer-support/release-notes/gateway.md" >}}) 

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.5/images/sha256-c09cb03dd491e18bb84a0d9d4e71177eb1396cd5debef694f1c86962dbee10c6?context=explore)

#### Changelog {#Changelog-v5.2.5}
Since this release was version bumped only to align with Gateway v5.2.5, no changes were encountered in this release.

---



---

### 5.2.4 Release Notes 

**Release Date 7 Dec 2023**

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.4">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.4/images/sha256-8862e98c6ffd67d47b496275b228f4f8faae4359b9c8e42bcd8bd8a47d0c45e4?context=explore)

#### Changelog {#Changelog-v5.2.4}

##### Fixed

<ul>
 <li>
 <details>
 <summary>Poor experience when using the Open Policy Agent (OPA) editor</summary>

 Fixed two UI issues with the [OPA editor]({{< ref "tyk-dashboard/open-policy-agent#using-the-open-policy-agent-in-the-dashboard" >}}) in the Tyk Dashboard to improve experience when using this feature. Scrolling beyond the end of the OPA window does not now start to scroll the API Designer window, and minimizing then re-expanding the OPA editor no longer limits the text to one line.
 </details>
 </li>
 <li>
 <details>
 <summary>Annoying bugs when setting Dashboard user access controls</summary>

 Fixed minor issues in the Dashboard UI when configuring the user access controls for the Identity Management (TIB) and Real Time Notifications permissions.
 </details>
 </li>
 <li>
 <details>
 <summary>Unable to select Mutual TLS version 1.3 from the API Designer dropdown</summary>

 Fixed an issue where TLS 1.3 was not offered as an option in the "Minimum TLS version" dropdown in the API Designer. Also we gave better (human readable) names to the options, like TLS 1.0, TLS 1.1 etc. instead of their corresponding numbers 769, 770 etc.
 </details>
 </li>
 <li>
 <details>
 <summary>Tyk Dashboard panic when using mongo-go driver</summary>

 Fixed a situation where Tyk Dashboard could panic when using the mongo-go driver.
 </details>
 </li>
 <li>
 <details>
 <summary>Confusing error message if user tries to modify Tyk OAS API using a Tyk Classic API endpoint/summary>

 Improved the error message that is returned when user tries to update a Tyk OAS API using a Tyk Classic API endpoint when `allow_unsafe_oas` is not enabled.
 </details>
 </li>
</ul>

##### Added

<ul>
 <li>
 <details>
 <summary>Implemented a `tyk version` command that provides more details about the Tyk Dashboard build</summary>

 This prints the release version, git commit, Go version used, architecture and other build details.
 </details>
 </li>
</ul>

---

### 5.2.3 Release Notes 

**Release Date 21 Nov 2023**

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.3">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.3/images/sha256-7d61ed3ee3f03ff0e2f91be71a9113b90ef6637b1cef1f30d4c3e04ead09fa6a?context=explore)

#### Changelog {#Changelog-v5.2.3}

##### Fixed

<ul>
<li>
<details>
<summary>Unable to resize OPA editor in Tyk Dashboard</summary>

Fixed an issue where the [OPA editor]({{< ref "tyk-dashboard/open-policy-agent#using-the-open-policy-agent-in-the-dashboard" >}}) was not resizable. The fix ensures the floating OPA editor is now resizable and the resizing operation is smooth, improving user experience.
</details>
</li>
<li>
<details>
<summary>User Search not working unless you enter the full email address</summary>

Fixed an issue where the [User Search]({{< ref "basic-config-and-security/security/dashboard/search-users" >}}) was not working unless the full email address was entered. The fix restores the functionality of showing suggestions for names as they are typed in, improving user experience and search efficiency.
</details>
</li>
<li>
<details>
<summary>Dashboard 4.1.0+ cannot retrieve certificates from downrev gateways</summary>

Fixed an issue where Dashboard 4.1.0+ was unable to retrieve certificates from a Tyk Gateway with a version lower than 4.1.0. This was due to a change made in the 4.1 versions relating to the way certificate details are retrieved in the dashboard; in the newer versions, we can view more details of the certificates. Now you can use Tyk Dashboard with any version of the Tyk Gateway and still retrieve and view certificate details; the fix ensures smooth staged upgrades and prevents potential issues for customers who have weeks or months between upgrading components.
</details>
</li>
<li>
<details>
<summary>Authentication Mode changes after changing API Protocol in API Designer</summary>

Fixed an issue in the Tyk Classic API Designer where if you changed the protocol for an API (for example from HTTP to HTTPS) then the authentication mechanism would be automatically set to Authentication Token.
</details>
</li>
<li>
<details>
<summary>Unable to configure external OAuth flow using Raw API editor</summary>

Fixed an issue in the Classic API Designer where the 'use_standard_auth' value was constantly reverting to 'true' when editing an API with an [external OAuth flow]({{< ref "/api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}}). This fix ensures the 'use_standard_auth' value remains consistent, enabling the use of external OAuth via the Raw API editor.
</details>
</li>
<li>
<details>
<summary>If the GraphQL subscription upstream disconnects, the UI is unaware of the reconnection event</summary> 

Fixed an issue with failed GraphQL subscriptions between the upstream and the Dashboard. When an upstream subscription was disconnected and later reconnected, the UI did not update to reflect the reconnection, preventing the seamless consumption of messages. Now the Dashboard can continue consuming messages after upstream reconnects.
</details>
</li>
</ul>

---

### 5.2.2 Release Notes 

**Release Date 31 Oct 2023**

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.2">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.2/images/sha256-c6e701e270ebb2fed815483723375c454d0479ae41b5be2e1a6198b8d1e1a154?context=explore)

#### Changelog {#Changelog-v5.2.2}

##### Added

<ul>
<li>
<details>
<summary>Added new Dashboard configuration option `allow_unsafe_oas`</summary>

Added a new Dashboard configuration option `allow_unsafe_oas`. This permits the modification of Tyk OAS APIs via the Tyk Classic API endpoints. This is not a recommended action due to the risk of inconsistent behavior and potential for breaking changes while Tyk OAS is in [Early Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}). This is provided for early adopters and will be deprecated later, once Tyk OAS reaches full maturity.
</summary>
</details>
</li>
</ul>

##### Fixed
<ul>
<li>
<details>
<summary>Fixed security policy grant permissions issue encountered with MongoDB</summary>

Fixed an issue when using MongoDB and [Tyk Security Policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This was due to the policy cleaning operation that is triggered when an API is deleted from a policy in a MongoDB installation. With this fix, the policy cleaning operation will not remove the final (deleted) API from the policy; Tyk recognizes that the API record is invalid and denies granting access rights to the key.
</details>
</li>
<li>
<details>
<summary>User might not correctly inherit all permissions from their user group</summary>

Fixed an issue in the Tyk Dashboard where a user might not correctly inherit all permissions from their user group, and could incorrectly be granted visibility of Identity Management.
</details>
<li>
<details>
<summary>Tyk would not store Policy ID in the API Definition for a policy that did not exist</summary>

Fixed an issue where Tyk would not store the *Policy Id* in the *API Definition* for a policy that did not exist. When using *JWT Authentication*, the *JWT Default Policy Id* is stored in the *API Definition*. If this policy had not been created in Tyk at the time the *API Definition* was created, Tyk Dashboard would invalidate the field in the *API Definition*. When the policy was later created, there would be no reference to it from the *API Definition*. This was a particular issue when using *Tyk Operator* to manage the creation of assets on Tyk.
</details>
</li>
<li>
<details>
<summary>Service Uptime page did not report the number of success hits correctly</summary>

Fixed an issue in the Dashboard *Service Uptime* page where the number of success hits was being incorrectly reported as the total number of hits, inclusive of failures. After this fix, the *Success Column* displays only the number of success hits.
</details>
</li>
<li>
<details>
<summary>High priority CVEs fixed</summary>

Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:

- [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
- [CVE-2022-28946](https://nvd.nist.gov/vuln/detail/CVE-2022-28946)
- [CVE-2021-23409](https://nvd.nist.gov/vuln/detail/CVE-2021-23409)
- [CVE-2021-23351](https://nvd.nist.gov/vuln/detail/CVE-2021-23351)
- [CVE-2023-28119](https://nvd.nist.gov/vuln/detail/CVE-2023-28119)
- [CVE-2022-21698](https://nvd.nist.gov/vuln/detail/CVE-2022-21698)
- [CVE-2020-26160](https://nvd.nist.gov/vuln/detail/CVE-2020-26160)
- [CVE-2019-19794](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)
- [CVE-2010-0928](https://nvd.nist.gov/vuln/detail/CVE-2010-0928)
- [CVE-2007-6755](https://nvd.nist.gov/vuln/detail/CVE-2007-6755)
- [CVE-2018-5709](https://nvd.nist.gov/vuln/detail/CVE-2018-5709)
</details>
</li>
<li>
<details>
<summary>Azure SAML2.0 Identity Provider was preventing users from authenticating</summary>

Fixed an issue encountered with *Azure SAML2.0 Identity Provider* that was preventing users from authenticating.
</details>
</li>
<li>
<details>
<summary>Fields defined in Uptime_Tests.Check_List were not correctly handled in API Designer</summary>

Fixed an issue encountered with the *API Designer* where fields defined in *Uptime_Tests.Check_List* were not correctly handled. Uptime tests can now be configured for *Tyk Classic APIs* using the *Raw API Definition* editor.
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard API security vulnerability</summary>

Fixed a security vulnerability with the Tyk Dashboard API where the `api_version` and `api_id` query parameters were potential targets for SQL injection attack.
</details>
</li>
</ul>

##### Updated

<ul>
<li>
<details>
<summary>Renamed License Limit to License Entitlement on Tyk Dashboard's Licensing Statistics screen</summary>

On Tyk Dashboard's Licensing Statistics screen, we have renamed the License Limit to License Entitlement. We've also improved the experience when there is no limit in the license by hiding the License Entitlement line if no limit is set.
</details>
</li>
</ul>

---

### 5.2.1 Release Notes 

**Release Date 10 Oct 2023**

#### Breaking Changes

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible result in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
If you are on a 5.2.0 we advise you to upgrade ASAP and if you are on an older version skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.1/images/sha256-2f9d8af0e57f7fe4afb618dcf34772c001104dc0ec62a27541d12dc9ae90d5c8?context=explore)

#### Changelog {#Changelog-v5.2.1}

##### Added

<ul>
<li>
<details>
<summary>Support added to Tyk Dashboard API for Tyk Sync to fully support OAS API Definitions</summary>

Added support to Tyk Dashboard API so that Tyk Sync can fully support Tyk OAS API Definitions; this will be enabled from Tyk Sync version 1.4.1.
</details>
</li>
</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Pagination in APIs screen was breaking for API of type GraphQL/UDG</summary>

Fixed a bug in the *Tyk Dashboard* UI where pagination in the APIs screen was breaking for API of type GraphQL/UDG. This resulted in the page failing to load data and displaying a 'No data to display' message.
</details>
</li>

<li>
<details>
<summary>Unable to disable Add Graph Operation checkbox in the GraphQL data source configuration screen</summary>

Fixed an issue where the 'Add GraphQL Operation' checkbox in the GraphQL data source configuration screen couldn't be disabled, even when no operation was added. Now, its state can be adjusted based on the presence of GraphQL operations and variables.
</details>
</li>
</ul>

---

### 5.2.0 Release Notes 

**Release Date 29 Sep 2023**

#### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

#### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/release-notes/special-releases#early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

Configure Caching Timeouts Per API Endpoint and Enable Advanced Caching Options From Within Dashboard

We’ve added the ability to [configure]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services. While doing this, we’ve also fixed a longstanding issue within the *Tyk Dashboard* so that you can configure more of the [advanced caching]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-api-designer" >}}) options from within the UI.

##### Added Body Transform Middleware to Tyk OAS API Definition

With this release, we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) *Body Transformations* and - as a *Tyk Dashboard* user - you’ll be able to do so from within our simple and elegant API Designer tool. Visually test and preview *Body Transformations* from within the API Designer.

##### Track Usage Of License APIs, Gateways And Distributed Data Planes Over Time

Within the Dashboard UI, we’ve enhanced the *Licensing* information page, so that you can visualise your usage of licensed APIs, *Gateways* and distributed *Data Planes* over time. This allows the visualisation of deployed and active APIs using a range of different types of interactive charts.


#### Downloads

Tyk Dashboard 5.2 - [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.0/images/sha256-28ff62e1e1208d02fec44cf84c279a5f780207ccbb7c3bdef23d1bf8fc6af3b8?context=explore)


#### API Changes

The following is a list of API changes in this release. Please visit our [Postman collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) for further information on our APIs.

<ul>
<li>
<details>
<summary>Added <em>/system/stats</em> endpoint to provide statistics for total and active APIs deployed</summary>

Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.
</details>
</li>
</ul>


#### Changelog {#Changelog-v5.2.0}

##### Added

<ul>
<li>
<details>
<summary>Configure request and response body transformations</summary>

Added support for API developers to easily [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) both request and response *Body Transformations* for more precise data management when working with *Tyk OAS* APIs. Define input data, craft transformation templates and test them against specific inputs for reliable customization.
</details>
</li>
<li>
<details>
<summary>Adding a new data source is simpler when working with UDG</summary>

Adding a new [data source]({{< ref "universal-data-graph/udg-getting-started/connect-datasource#3-configure-datasource-details" >}}) is simpler when working with *UDG*. The default value for the *data source name* is pre-filled, saving time. The *data source name* is pre-filled in the format *fieldName_typeName*, with *typeName* being the name of any GraphQL type.
</details>
</li>
<li>
<details>
<summary>Added <em>/system/stats</em> endpoint to provide statistics for total and active APIs deployed</summary>

Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.
</details>
</li>
</ul>

##### Changed
<ul>
<li>
<details>
<summary>Saving operation is simpler when creating an API within the API Designer</summary>

Improved the flow when creating an API within the *API Designer* so that you remain on the same screen after saving. This means you can continue editing without having to navigate back to the screen to make subsequent changes.
</details>
</li>
<li>
<details>
<summary>Saving a UDG data source is simpler and quicker</summary>

Updated the [screen]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource" >}}) for configuring and saving *UDG* data sources. The *Save* button has been replaced with *Save & Update API* button and users no longer need to click *Update* at the top of the screen to persist changes. Saving a *UDG* data source is now simpler and quicker.
</details>
</li>
<li>
<details>
<summary>Enhanced API usage monitoring added to Dashboard</summary>

Updated the *Dashboard* with enhanced API usage monitoring. Users now benefit from an insightful chart on the *Licensing Statistics* page, detailing: maximum, minimum and average counts of created and active APIs. Flexible date filtering, license limit reference lines and the ability to toggle between line and bar graphs empower users to monitor usage effortlessly, ensuring license adherence.
</details>
</li>
<li>
<details>
<summary>New chart introduced on License Statistics page to show number of deployed Data Planes</summary>

A new chart has been introduced on the *License Statistics* page that presents the number of deployed *Data Planes*. This addition enables users to easily monitor their *Data Plane* usage and nearness to their contract limits.
</details>
</li>
</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Advanced cache config data was absent in the Raw Editor</summary>

Fixed an issue where *advanced_cache_config* data was absent in the *Raw Editor*. This fix now ensures that *advanced_cache_config* can be configured. Furthermore, API modifications in the *Designer* no longer lead to data loss, safeguarding cache configuration consistency. The UI now offers a clear view of advanced cache settings, including the new *Timeout* field and *Cache* response codes fields.
</details>
</li>
<li>
<details>
<summary>403 errors were raised with JWT claim names containing spaces</summary>

Fixed an issue with *JWT claim names* containing spaces. Previously 403 errors were raised when using tokens containing such claims.
</details>
</li>
<li>
<details>
<summary>Popular endpoints were not displayed in Tyk Dashboard when SQL aggregated analytics was enabled</summary>

Fixed an issue where *popular endpoints* data was not displayed in *Tyk Dashboard* with *SQL aggregated analytics* enabled. Users can now view *popular endpoints* when viewing *Traffic Activity* per API or filtering by API with *SQL aggregated analytics* enabled.
</details>
</li>
<li>
<details>
<summary>Fixed security issue with expired certificates</summary>

Fixed a potential security vulnerability where *static* or *dynamic mTLS* requests with expired certificates could be proxied upstream.
</details>
</li>
<li>
<details>
<summary>Users were unable to view request analytics for a specific date in the API Activity dashboard</summary>

Fixed an issue in the *API Activity* dashboard where users were unable to view request analytics for a specific date. Subsequently, users can now make informed decisions based on access to this data. 
</details>
</li>
<li>
<details>
<summary>Enforced timeout configuration parameter for an API endpoint was not validated</summary>

Fixed an issue where the [Enforced Timeout]({{< ref "tyk-self-managed#enforced-timeouts" >}}) configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.
</details>
</li>
<li>
<details>
<summary>Duplicate APIs could be created when click save button multiple times in API Designer</summary>

Fixed an issue in *Tyk Dashboard* where duplicate APIs could be created with the same names and listen paths if you clicked multiple times on the *save* button in the API Designer. Now, this is not possible anymore and there is no risk of creating multiple APIs with the same name.
</li>
</details>
<li>
<details>
<summary>Connection issues were encountered with MongoDB connection strings</summary>

Fixed an issue with *MongoDB* connection strings. To ensure consistent compatibility with both *mgo* and *mongo-go* drivers, users should now utilize URL-encoded values within the *MongoDB* connection string's username and password fields when they contain characters like "?", "@". This resolves the need for different handling across *MongoDB* drivers.
</details>
</li>
</ul>

---

## 5.1 Release Notes
### 5.1.0 Release Notes

#### Release Date 23 June 2023

#### Breaking Changes
**Attention warning*: Please read carefully this section. We have two topics to report:
 
###### Golang Version upgrade
Our Dashboard is using [Golang 1.19](https://tip.golang.org/doc/go1.19) programming language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#upgrading-your-tyk-gateway" >}}) these to maintain compatibility with the latest Gateway.

###### Tyk OAS APIs
To provide a superior experience with OAS APIs, we have made some changes which include various security fixes, improved validation etc. Upgrading to v5.1 from v4.x.x may be irreversible, rollback to v4.x.x could break your OAS API definitions. For this reason, we recommend making a database backup so you can always restore from the backup (of v4.X.X) in case you encounter a problem during the upgrade. Please refer to our guides for detailed information on [upgrading Tyk]({{<ref "developer-support/upgrading">}}) and [how to back up tyk]({{<ref "developer-support/faq#tyk-configuration">}})

#### Deprecation
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights

##### Dashboard Analytics for API Ownership

When we implemented Role Based Access Control and API Ownership in Tyk
Dashboard, we unlocked great flexibility for you to assign different roles to
different users and user groups with visibility and control over different
collections of APIs on your Gateway. Well, from 5.1 we have added a new Role,
which layers on top of the existing “Analytics” role and can be used to restrict
a user’s access, within the Dashboard Analytics screens, to view only the
statistics from APIs that they own; we’ve called this “Owned Analytics”. Due to
the way the analytics data are aggregated (to optimize storage), a user granted
this role will not have access to the full range of charts. Take a look at the
documentation for a full description of this new [user role]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}).

##### Import API examples from within the Dashboard

In 5.0 we introduced the possibility to import API examples manually or via
[_Tyk Sync_]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}). We have now extended this feature and it is now possible to do this without
leaving the Dashboard. When having an empty “Data Graphs” section you will be
presented with 3 icon buttons with one of them offering you to import an Example
API.

If you already have Data Graphs in your Dashboard you can either click on
the “Import” button or click on the “Add Data Graph“ button and select “Use
example data graph“ on the next screen. The examples UI will present you with a
list of available examples. You can navigate to the details page for every
example and import it as well from the same page.

##### Improved nested GraphQL stitching

Before this release, it was only possible to implement nested GraphQL stitching
(GraphQL data source inside another data source) by using a REST data source and
providing the GraphQL body manually. We have now extended the GraphQL data source so
that you can provide a custom operation and therefore access arguments or object
data from parent data sources.

To use this feature you will only need to check the “Add GraphQL operation“ checkbox when creating a GraphQL data source.

##### Import UDG API from OAS 3.0.0

We added a [Dashboard API Endpoint]({{< ref "universal-data-graph/datasources/rest#automatically-creating-rest-udg-configuration-based-on-oas-specification" >}}) that is capable of taking an OAS 3.0.0 document and converting it into a UDG API.

This will generate the full schema as well as the data sources that are defined inside the OAS document.

##### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

#### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.1/images/sha256-8cde3c6408b9a34daa508a570539ca6cd9fcb8ee5c4790abe907eaecddc1bd9b?context=explore)


#### Changelog

##### Added

- Added two endpoints to the dashboard to support the retrieval of example API definitions. One for fetching all examples and another for fetching a single example.
- Added a way to display UDG examples from the [tyk-examples](https://github.com/TykTechnologies/tyk-examples) repository in the Dashboard UI
- Added screens in Dashboard New Graph flow, that allows users to choose between creating a graph from scratch or importing one of our example graphs
- Added a screen to display details of a UDG example API
- Added a feature to display a full [_Tyk Sync_]({{<ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) command that will allow a user to import an example UDG into their Dashboard
- Added `/examples` endpoint to Dashboard API that returns a list of available API examples that can later be imported into the Dashboard `GET /api/examples`
- Added `/data-graphs/data-sources/import` endpoint to Dashboard API that transforms an OpenAPI document into UDG config and publishes it in Dashboard `POST /api/data-graphs/data-sources/import`
- Added query param `apidef=true` to example detail endpoint in Dashboard API to retrieve the API definition of an example
- Added new `owned_analytics` user permission which restricts the user's access only to analytics relating to APIs they own. These are the _API Activity Dashboard Requests_ and _Average Errors Over Time_ charts in the Tyk Dashboard. Note that it is not currently possible to respect API Ownership in other aggregated charts

##### Changed

- Tyk Dashboard updated to Go 1.19
- Updated npm package dependencies of Dashboard, to address critical and high CVEs
- Changed the field mapping tickbox description in GUI to be 'Use default field mapping'

##### Fixed

- Fixed an issue when using custom authentication with multiple authentication methods. Custom authentication could not be selected to provide the base identity
- Fixed an issue where the login URL was displayed as undefined when creating a TIB Profile using LDAP as a provider
- Fixed an issue where it was not possible to download Activity by API or Activity by Key from the Dashboard when using PostgreSQL for the analytics store
- Fixed an issue where a new user could be stuck in a password reset loop in the dashboard if TYK_DB_SECURITY_FORCEFIRSTLOGINPWRESET was enabled
- Fixed an issue where the `ssl_force_common_name_check` flag was disappearing. The flag was disappearing after being updated via dashboard UI raw API editor and a subsequent page reload. It was also disappearing when updating the API Definition via the GW/DB API.
- Fixed an issue where a user could update their email address to match that of another user within the same organization
- Fixed an issue where users without `user:write` permission were able to update their permissions through manipulation of Dashboard API calls
- Fixed an issue where the versions endpoint returned APIs that were not owned by the logged-in user
- Fixed an issue where the log browser showed analytics for APIs not owned by the logged-in user
- Fixed an issue that prevented non-admin users from seeing _Endpoint Popularity_ data in the Tyk Dashboard
- Fixed an issue where additional data was returned when requesting analytics with p=-1 query when using SQL for the analytics store
- Fixed an issue so that filtering by API now respects API Ownership in three Dashboard charts.

  - Gateway Dashboard - API Activity Dashboard - Requests
  - Activity by API - Traffic Activity per API
  - Errors - Average Errors Over Time

- Fixed an issue so that the Log Browser now respects API Ownership. A user will now only be able to see logs for the APIs that they are authorized to view
- Fixed filters for the Log Browser, Errors - Average Errors Over Time and API Activity Dashboard - Requests so that a user can only select from versions of APIs for which they have visibility
- Fixed UI bug so that data graphs created with multiple words are [sluggified](https://www.w3schools.com/django/ref_filters_slugify.php#:~:text=Definition%20and%20Usage,ASCII%20characters%20and%20hyphens%20(%2D).), i.e. spaces are replaced with a hyphen `-`
- Fixed an issue with routing, which was sending the user to a blank screen while creating a new Data Graph or importing an example API

## 5.0 Release Notes
### 5.0.15 Release Notes

#### Release Date 24 October 2024

#### Release Highlights

This is a version bump to align with Gateway v5.0.15, no changes have been implemented in this release.

#### Breaking Changes

There are no breaking changes in this release.

#### Upgrade instructions {#upgrade-5.0.15}

If you are upgrading to 5.0.15, please follow the detailed [upgrade instructions](#upgrading-tyk). 

#### Changelog {#Changelog-v5.0.15}

No changes in this release.


---

### 5.0.14 Release Notes {#rn-v5.0.14}

#### Release Date 18th September 2024

#### Upgrade Instructions

This release is not tightly coupled with Tyk Gateway v5.0.14, so you do not have to upgrade both together.


Go to the [Upgrading Tyk](https://tyk.io/docs/developer-support/release-notes/gateway#upgrading-tyk) section for detailed upgrade instructions.


#### Release Highlights

This release fixes some display issues in Tyk Dashboard and Tyk Classic Portal when using PostgreSQL.

#### Changelog {#Changelog-v5.0.14}

##### Fixed

<ul>
<li>
<details>
<summary>Tyk Dashboard UI: Fixed display issue for API statistics</summary>

Fixed an issue where API statistics were not being shown when using PostgreSQL and adding two or more tags in the Activity page
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI:  Fixed issue with display of HTTP 429 status codes on the Activity page</summary>

Fixed an issue where HTTP 429 status codes were not being shown on the Activity page when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Classic Portal UI: Fixed display of graphs and requests counter</summary>

Fixed wrong graphs and incorrect requests counter on Tyk Classic Portal when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI: fixed issues with the Error Breakdown display, specifically related to date handling</summary>

Fixed Error Breakdown issue showing errors that happened on different dates than selected date
</details>
</li>
</ul>

---

### 5.0.13 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.13)

---

### 5.0.12 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12)

---

### 5.0.11 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11)

---

### 5.0.10 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10)

---

### 5.0.9 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9)

---

### 5.0.8 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8)

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

##### Release Date 29 May 2023

##### Release Highlights

###### Support for MongoDB 5 and 6
From Tyk 5.0.2, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set new Dashboard config option driver to *mongo-go*. 
The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
- [mgo](https://github.com/go-mgo/mgo) (default): Uses the *mgo* driver. This driver supports MongoDB versions <= v4.x (lower or equal to v4.x). You can get more information about this driver in the [mgo](https://github.com/go-mgo/mgo) GH repository. To allow users more time for migration, we will update our default driver to the new driver, *mongo-go*, in next major release.
- [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports MongoDB versions >= v4.x (greater or equal to v4.x). You can get more information about this driver in [mongo-go-driver](https://github.com/mongodb/mongo-go-driver) GH repository.

See how to [Choose a MongoDB driver]({{< ref "tyk-self-managed#choose-a-mongodb-driver" >}})

**Note: Tyk Pump 1.8.0 and MDCB 2.2 releases have been updated to support the new driver option**

##### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0.2/images/sha256-fe3009c14ff9096771d10995a399a494389321707e951a3c46f944afd28d18cd?context=explore)


##### Changelog {#Changelog-v5.0.2}

###### Fixed
- Fixed a bug on migration of a portal catalog with deleted policy to SQL
- Fixed: Redirect unregistered user to new page when SSOOnlyForRegisteredUsers is set to true

---

### 5.0.1 Release Notes

##### Release Date 25 Apr 2023

##### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.1">}}) below.

##### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0.1/images/sha256-013d971fc826507702f7226fa3f00e1c7e9d390fc0fb268bed42e410b126e89d?context=explore)

##### Changelog {#Changelog-v5.0.1}

###### Added
- Improved security for people using the Dashboard by adding the Referrer-Policy header with the value `no-referrer`
- Added ability to select the plugin driver within the Tyk OAS API Designer

###### Changed
- When creating a new API in the Tyk OAS API Designer, caching is now disabled by default

###### Fixed
- Fixed a bug where a call to the `/hello` endpoint would unnecessarily log `http: superfluous response.WriteHeader call`
- Fixed a bug where the Dashboard was showing *Average usage over time* for all Developers, rather than just those relevant to the logged in developer
- Fixed a bug where logged in users could see Identity Management pages, even if they didn't have the rights to use these features
- Fixed a bug that prevented Tyk Dashboard users from resetting their own passwords
- Fixed issue with GraphQL proxy headers added via UI
- Fixed a bug where the Dashboard would not allow access to any screens if a logged in user didn’t have access to the APIs resource regardless of other access rights
- Fixed a bug on the key management page where searching by `key_id` did not work - you can now initiate the search by pressing enter after typing in the `key_id`
- Fixed a bug where Dashboard API could incorrectly return HTTP 400 when deleting an API
- Fixed UDG UI bug that caused duplicate data source creation on renaming
- Fixed schema validation for custom domain in Tyk OAS API definition
- Fixed a bug where the left menu did not change when Dashboard language was changed
- Fixed a bug that caused the Dashboard to report errors when decoding multiple APIs associated with a policy
- Fixed a bug where it was not possible to disable the Use Scope Claim option when using JWT authentication
- Fixed a bug in the default OPA rule that prevented users from resetting their own password
- Fixed a bug where authToken data was incorrectly stored in the JWT section of the authentication config when a new API was created

---

### 5.0.0 Release Notes

#### Release Date 28 Mar 2023

#### Release Highlights

##### Improved OpenAPI support

Tyk Dashboard has been enhanced with **all the custom middleware options** for Tyk OAS APIs, so **for the first time** you can configure your custom middleware from the Dashboard; this covers the full suite of custom middleware from pre- to post- and response plugins. We’ve got support for middleware bundles, Go plugins and Tyk Virtual Endpoints, all within the new and improved Tyk Dashboard UI.

[Versioning your Tyk OAS APIs]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) is easier than ever, with the Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve also added a new endpoint on the Tyk API that will return details of the versions for a given API.

Tyk Dashboard hasn’t been left out, we’ve implemented a brand new version management UI for Tyk OAS APIs, to make it as easy as possible for you to manage those API versions as you develop and extend your API products with Tyk.

We’ve improved support for [OAS Mock Responses]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}), with the Tyk OAS API definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing flexibility.

Another new feature in the Tyk OAS API Designer is that you can now update (PATCH) your existing Tyk OAS APIs through the Dashboard API without having to resort to curl. That should make life just that little bit easier.
Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the best way for you to create and manage your APIs.

##### GraphQL and Universal Data Graph improvements

This release is all about making things easier for our users with GraphQL and Universal Data Graph.

In order to get our users up and running with a working Universal Data Graph quickly, we’ve created a repository of examples that anyone can import into their Dashboard or Gateway and see what Universal Data Graph is capable of. Import can be done in two ways:
- manually, by simply copying a Tyk API definition from GitHub - [TykTechnologies/tyk-examples](https://TykTechnologies/tyk-examples): A repository containing example API definitions and policies for Tyk products. 
- via command line [using tyk-sync]({{< ref "universal-data-graph/udg-examples" >}})

To make it easier for our users to find their way to Universal Data Graph, we’ve also given it its own space in the Dashboard. From now on you can find UDG under Data Graphs section of the menu.

It also got a lot easier to turn a Kafka topic into a GraphQL subscription. Using our new Dashboard API endpoint, users will be able to transform their AsyncAPI documentation into Universal Data Graph definition with a single click. Support for OAS coming soon as well!

With this release we are also giving our users [improved headers for GQL APIs]({{< ref "graphql/gql-headers" >}}). It is now possible to use context variables in request headers and persist headers needed for introspection separately for improved security.

Additionally we’ve added Dashboard support for introspection control on policy and key level. It is now possible to allow or block certain consumers from being able to introspect any graph while creating a policy or key via Dashboard.

#### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0/images/sha256-3d736b06b023e23f406b1591f4915b3cb15a417fcb953d380eb8b4d71829f20f?tab=vulnerabilities)

#### Changelog {#Changelog-v5.0.0}

##### Added
- Numerous UX improvements
- New UI for custom middleware for Tyk OAS APIs
- Significantly improved Tyk OAS API versioning user experience
- It now possible to use PATCH method to modify Tyk OAS APIs via the Dashboard API
- Now you can turn a Kafka topic into a GraphQL subscription by simply [importing your AsyncAPI definition]({{< ref "tyk-apis/tyk-dashboard-api/data-graphs-api" >}})
- Way to control access to introspection on policy and key level

##### Changed
- Universal Data Graph moved to a separate dashboard section

---

## 4.3 Release Notes
### 4.3.0 Release Notes

#### Release Highlights

##### Tyk OAS APIs - Versioning via the Dashboard

Tyk v4.3 adds API versioning to the Dashboard UI, including:

- Performing CRUD operations over API versions
- Navigate seamlessly between versions
- A dedicated manage versions screen
- easily identify the default version and the base API.

##### Importing OAS v3 via the Dashboard

Importing OpenAPI v3 documents in order to generate Tyk OAS API definition is now fully supported in our Dashboard UI. Our UI automatically detects the version of your OpenAPI Document, and will suggest options that you can pass or allow Tyk to read from the provided document, in order to configure the Tyk OAS API Definition. Such as: 

- custom upstream URL
- custom listen path
- authentication mechanism
- validation request rules and limit access only to the defined paths.

[Importing OAS v3 via the Dashboard]({{< ref "/content/getting-started/using-oas-definitions/import-an-oas-api.md#tutorial-7-using-the-tyk-dashboard-ui" >}})

##### Updated the Tyk Dashboard version of Golang, to 1.16.

**Our Dashboard is using Golang 1.16 version starting with 4.3 release. This version of the Golang release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.


#### Changelog

##### Added

- Added an option for using multiple header/value pairs when configuring GraphQL API with a protected upstream and persisting those headers for future use.
- Added documentation on how edge endpoints Dashboard configuration can be used by users to add tags for their API Gateways.
- When retrieving the Tyk OAS API Definition of a versioned API, the base API ID is passed on the GET request as a header: `x-tyk-base-api-id`.
- If Edge Endpoints Dashboard configuration is present, when users add segment/tags to the Tyk OAS API Definition, their corresponding URLs are populated in the servers section of the OAS document.
- Listen path field is now hidden from the API Designer UI, when the screen presents a versioned or internal API.

##### Changed

- Extended existing `x-tyk-gateway` OAS documentation and improved the markdown generator to produce a better-formatted documentation for `x-tyk-gateway` schema.
- Complete change of Universal Data Graph configuration UI. New UI is now fully functional and allows configuration of all existing datasources (REST, GraphQL and Kafka).
- Changed look & feel of request logs for GraphQL Playground. It is now possible to filter the logs and display only the information the user is interested in.

##### Fixed

- Fixed: OAS API definition showing management gateway URL even if segment tags are present in cloud. From now on OAS servers section would be filled with edge endpoint URLs if configured.
- Adding a path that contains a path parameter, doesn’t throw an error anymore on the Dashboard UI, and creates default path parameter description in the OAS.

#### Updated Versions

Tyk Dashboard 4.3 ([docker images](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=1&name=4.3.0))

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**  

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to 4.3 version of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "/content/plugins/supported-languages/golang.md" >}}).
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

##### Added
- Added support for Kafka as a data source in Universal Data Graph.
- Added support for the Request Body Transform middleware for OAS based APIs

##### Changed
- Improved GraphQL Dashboard UI error messages
- Changed GUI in Universal Data Graph
- Changed look & feel of request logs in Playground tab for GraphQL APIs.

##### Fixed
- Fixed an issue with key lookup where keys were not being found when using the search field
- Fixed an issue with object types dropdown in Universal Data Graph config, where it wasn’t working correctly when object type UNION was chosen
- Fixed an issue in Universal Data Graph which prevented users from injecting an argument value or parameter value in the domain part of the defined data source upstream URL

#### Updated Versions

Tyk Dashboard 4.2


#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

## 4.1 Release Notes
### 4.1.0 Release Notes

#### Release Highlights

##### OpenAPI as a native API definition format
Tyk has always had a proprietary specification for defining APIs. From Tyk v4.1 we now support defining APIs using the Open API Specification (OAS) as well, which can offer significant time and complexity savings. [This is an early access capability]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}).

As we extend our OAS support, we would very much like your feedback on how we can extend and update to best meet your needs: .

This capability is available in both the open source and paid versions of Tyk. See our [High Level Concepts]({{< ref "getting-started/key-concepts/high-level-concepts" >}}) for more details, or jump to [OAS Getting Started documentation]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}).


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

##### Added
- Added support for new OAS api definition format, and new API creation screens
- Dashboard boostrap instalation script extended to support SQL databases
- Added `TYK_DB_OMITCONFIGFILE` option for Tyk Dashboard to ignore the values in the config file and load its configuration only from environment variables and default values
- Added a new config option `identity_broker.ssl_insecure_skip_verify` that will allow customers using the embedded TIB to use IDPs exposed with a self signed certificate. Not intended to be used in production, only for testing and POC purposes.
- Added option to configure certificates for Tyk Dashboard using [environment variables](https://tyk.io/docs/tyk-dashboard/configuration/#http_server_optionscertificates).

##### Changed
- Detailed information about certificates can be viewed from certificates listing page
- Dashboard APIs GQL Playground now shows additional information about certificates
- Dashboard will now use default version of GraphiQL Playground which can switch between light and dark modes for more accessibility
- Banner for resyncing GraphQL schema has been given a new, more accessible look in line with the rest of Dashboard design

##### Fixed
- Fixed an issue with key lookup where keys were not being found when using the search field
- Fixed an issue with object types dropdown in Universal Data Graph config, where it wasn’t working correctly when object type UNION was chosen
- Fixed an issue in Universal Data Graph which prevented users from injecting an argument value or parameter value in the domain part of the defined data source upstream URL

#### Updated Versions
Tyk Dashboard 4.1
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

[Federation docs]({{< ref "/content/getting-started/key-concepts/graphql-federation.md" >}})

[Subgraphs and Supergraphs docs]({{< ref "/content/getting-started/key-concepts/graphql-federation.md#subgraphs-and-supergraphs" >}})

##### GraphQL subscriptions

Subscriptions are a way to push data from the server to the clients that choose to listen to real-time messages from the server, using the WebSocket protocol. There is no need to enable subscriptions separately; Tyk supports them alongside GraphQL as standard.

With release 4.0, users can federate GraphQL APIs that support subscriptions. Federating subscriptions means that events pushed to consumers can be enriched with information from other federated graphs.

[Subscriptions docs]({{< ref "/content/getting-started/key-concepts/graphql-subscriptions.md" >}})

##### SQL database support
The other major capability in Tyk 4.0 is that the Tyk Dashboard can store its data in a SQL  relational database. 

Until now, Tyk Dashboard has used MongoDB for storing everything from data such as APIs, policies and users through to analytics and logs. MongoDB is still a great storage choice for most projects. However, not all users have MongoDB as part of their tech stack. Some are in heavily regulated industries which means adding it would be a pain. For others, the document storage type and lack of proper ACID transaction support may not be the best solution. These users can now choose a SQL database solution instead. 

From version 4.0, Tyk Dashboard and Tyk Pump will support four data storage layers, which can be configured separately, each with a different officially supported database solution (if needed). All data stored in SQL databases will provide the same information in the Dashboard that MongoDB did.

While SQL support for Tyk products does not depend on specific database features, with this release, we will provide official support for [PostgreSQL DB for production purposes]({{< ref "tyk-self-managed#postgresql" >}}), and SQLite for development and PoC environments. Note that SQL support is available for self-managed setups only.

As part of SQL support we are also providing tooling to perform seamless migration of your Dashboard data from Mongo to SQL. However, at the moment migration of analytics data is not supported.
[MongoDB to SQL migration docs]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}})

#### Changelog
- Now it is possible to configure GraphQL upstream authentification, in order for Tyk to work with its schema
- JWT scopes now support arrray and comma delimeters
- Go plugins can be attached on per-endpoint level, similar to virtual endpoints

#### Updated Versions
Tyk Dashboard 4.0
Tyk Pump 1.5

#### Upgrade process

Follow the [standard upgrade guide]({{< ref "developer-support/upgrading" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
## 3.2 Release Notes
### 3.2.0 Release Notes

#### Release Notes

##### Bring your own Identity Provider - Dynamic Client Registration now available!

DCR is a protocol of the Internet Engineering Task Force put in place to set standards in the dynamic registration of clients with authorization servers. This feature is a way for you to integrate your Tyk Developer Portal with an external identity provider such as Keycloak, Gluu, Auth0 or Okta. 
The portal developer won't notice a difference. However, when they create the app via Tyk Developer portal, Tyk will dynamically register that client on your authorization server. This means that it is the Authorization Server that will issue the Client ID and Client Secret for the app.

Check our DCR docs [here]({{< ref "/tyk-developer-portal/tyk-portal-classic/dynamic-client-registration" >}})

We also took this opportunity to give a refresh to the portal settings UI so let us know if you like it! 

##### GraphQL and UDG improvements

We've updated the GraphQL functionality of our [Universal Data Graph]({{< ref "universal-data-graph" >}}). You’re now able to deeply nest GraphQL & REST APIs and stitch them together in any possible way.

Queries are now possible via WebSockets and Subscriptions are coming in the next Release (3.3.0).

You're also able to configure [upstream Headers dynamically]({{< ref "universal-data-graph/udg-getting-started/header-forwarding" >}}), that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to acccess protected upstreams. 

We've added an easy to use URL-Builder to make it easier for you to inject object fields into REST API URLs when stitching REST APIs within UDG.

Query-depth limits can now be configured on a per-field level.

If you’re using GraphQL upstream services with UDG, you’re now able to forward upstream error objects through UDG so that they can be exposed to the client.


##### Extendable Tyk Dashboard permissions system

The Tyk Dashboard permission system can now be extended by writing custom rules using an Open Policy Agent (OPA). The rule engine works on top of the Tyk Dashboard API, which means you can control not only access rules, but also the behavior of all Dashboard APIs (except your public developer portal). You can find more details about OPA [here]({{< ref "/content/tyk-dashboard/open-policy-agent.md" >}}).

In addition, you can now create your own custom permissions using the Additional Permissions API or by updating `security.additional_permissions` map in the Tyk Dashboard config, and writing Opa rule containing logic for the new permission.

#### Changelog

In addition to the above, version 3.2 includes all the fixes that are part of 3.0.5
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.5

#### Updated Versions
Tyk Dashboard 3.2

#### Upgrade process
If you already have GraphQL or UDG APIs you need to follow this upgrade guide https://tyk.io/docs/graphql/migration-guide/

## 3.1 Release Notes
### 3.1.0 Release Notes

#### Release Highlights

##### Identity Management UX and SAML support
You will notice that the experience for creating a new profile in the Identity management section of the dashboard was changed to a ‘wizard’ approach which reduces the time it takes to get started and configure a profile. 
In addition, users are now able to use SAML for the dashboard and portal login, whether you use TIB(Tyk Identity Broker) internally or externally of the dashboard.

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
- Tyk Dashboard 3.1

## 3.0 Release Notes
### 3.0.0 Release Notes

#### Release Highlights

##### Version changes and LTS releases

We have bumped our major Tyk Gateway version from 2 to 3, a long overdue change as we’ve been on version 2 for 3 years. We have also changed our Tyk Dashboard major version from 1 to 3, and from now on it will always be aligned with the Tyk Gateway for major and minor releases. The Tyk Pump has also now updated to 1.0, so we can better indicate major changes in future. 

Importantly, such a big change in versions does not mean that we going to break backward compatibility. More-over we are restructuring our internal release strategy to guarantee more stability and to allow us to deliver all Tyk products at a faster pace. We aim to bring more clarity to our users on the stability criteria they can expect, based on the version number.
Additionally we are introducing Long Term Releases (also known as LTS).

Read more about this changes in our blogpost: https://tyk.io/introducing-long-term-support-some-changes-to-our-release-process-product-versioning/

##### New Look and Feel

We have a brand new look to our Tyk Dashboard. About half a year ago, we made some changes to our visual branding to better express our love for creativity and great UX. Those changes started with our website and now we are also incorporating these visual changes into the UI of our products. We do this to keep our brand consistent across the whole Tyk experience and to enhance your experience using our products. 

See our updated [Tutorials]({{< ref "getting-started/installation" >}}) section.

##### Universal Data Graph and GraphQL

Tyk now supports GraphQL **natively**. This means Tyk doesn’t have to use any external services or process for any GraphQL middleware. You can securely expose existing GraphQL APIs using our GraphQL core functionality.

In addition to this you can also use Tyk’s integrated GraphQL engine to build a Universal Data Graph. The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

All this without even have to build your own GraphQL server. If you have existing REST APIs all you have to do is configure the UDG and Tyk has done the work for you.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs. In addition to this, the UDG benefits from all existing solutions that already come with your Tyk installation. That is, your Data Graph will be secure from the start and there’s a large array of out of the box middlewares you can build on to power your Graph.

Read more about the [GraphQL]({{< ref "graphql" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}})


##### Policies and Keys UX changes 

We have a lot to update you on with our UX & UI revamp, but one thing we want to highlight here are the updates to the policies and keys Dashboard pages. We know there was confusion in the way we set policies and keys up in the Tyk Dashboard, so we redesigned the UI workflow to make it less error-prone, simpler and more intuitive when you create, view and edit security policies and keys.

When you create, view or edit a key the steps are in a more logical order. We’ve removed the long form that needed to be filled out and replaced it with tabs so you can find and enter information easily. We’ve also grouped all information within each API so you know the exact set up of each of your access rights without any confusion. The new workflow should allow tasks to be completed faster and more efficiently.

See updated tutorials on how to [create a policy]({{< ref "getting-started/create-security-policy" >}}) and [keys]({{< ref "getting-started/create-api-key" >}})

We also have a [blog post](https://tyk.io/the-transformation-of-policies-and-keys/) that explains what we've done, and why we did it.


##### Tyk Identity broker now built-in to the Dashboard

Previously you had to run a separate process to setup SSO (single sign on). Now this functionality is built-in to the dashboard and got UI revamp. So now you can just start the dashboard, and via UI, create a SSO flow, without installing 3-rd party components. Including SSO via social logins, OpenID Connect and LDAP (with SAML coming very soon!) including integration with the Dashboards RBAC and your Identity Provider.

See [updated flow details]({{< ref "tyk-identity-broker" >}})


##### Using external secret management services

Want to reference secrets from a KV store in your API definitions? We now have native Vault & Consul integration. You can even pull from a tyk.conf dictionary or environment variable file.

[Read more]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}})


##### Co-Process Response Plugins

We added a new middleware hook allowing middleware to modify the response from the upstream. Using response middleware you can transform, inspect or obfuscate parts of the response body or response headers, or fire an event or webhook based on information received by the upstream service.

At the moment the Response hook is supported for [Python and gRPC plugins]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).


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

##### Weight-Based Load Balancing

The Tyk Dashboard now allows you to control weighting of the upstreams, when using load balancing functionality. For example now you can configure Tyk to send 20% of traffic to one upstream, with 80% to another upstream service.

This enables you to perform Canary or A/B tests of their APIs and services. Similarly, if caches require warming, then we can send a low % of traffic to these services, and when confident that they can handle the load, start incrementally sending a higher % of traffic to these services.

[Read More]({{< ref "tyk-self-managed#configure-load-balancing-and-weighting-via-the-dashboard" >}})

##### Ability to shard analytics to different data-sinks

In a multi-org deployment, each organization, team, or environment might have their preferred analytics tooling. At present, when sending analytics to the Tyk Pump, we do not discriminate analytics by org - meaning that we have to send all analytics to the same database - e.g. MongoDB. Now the Tyk Pump can be configured to send analytics for different organizations to different places. E.g. Org A can send their analytics to MongoDB + DataDog. But Org B can send their analytics to DataDog + expose the Prometheus metrics endpoint.

It also becomes possible to put a {{<fn>}}blocklist{{</fn>}} in-place, meaning that some data sinks can receive information for all orgs, whereas others will not receive OrgA’s analytics if blocked.

This change requires updating to new Tyk Pump 1.0

[Read More]({{< ref "tyk-pump/configuration" >}})

##### 404 Error logging - unmatched paths

Concerned that client’s are getting a 404 response? Could it be that the API definition or URL rewrites have been misconfigured? Telling Tyk to track 404 logs, will cause the Tyk Gateway to produce error logs showing that a particular resource has not been found. 

The feature can be enabled by setting the config `track_404_logs` to `true` in the gateway's config file.


#### Changelog
- Fixed the bug when tokens created with non empty quota, and quota expiration set to `Never`, were treated as having unlimited quota. Now such tokens will stop working, once initial quota is reached. 

#### Updated Versions

- Tyk Dashboard 3.0
- Tyk Pump 1.0

#### Upgrading From Version 2.9

No specific actions required.
If you are upgrading from version 2.8, pls [read this guide]({{< ref "developer-support/release-notes/archived#upgrading-from-version-28" >}})


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
- [OpenAPI Document]({{<ref "tyk-dashboard-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ

Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.



