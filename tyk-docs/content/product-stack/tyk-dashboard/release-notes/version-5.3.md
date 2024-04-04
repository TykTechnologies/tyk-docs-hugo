---
title: Tyk Dashboard 5.3 Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates enhancements, and changes for Tyk Dashboard versions within the 5.3.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.3", "5.3.0", "5.3", "changelog"]
---

<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for version 5.3.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 5.3.0 Release Notes

### Release Date DD Mon YYYY <<update>>

### Deployment Options for Tyk Dashboard

#### Tyk Cloud
Tyk 5.3.0 will be available on Tyk Cloud in the coming weeks. We'll update this page once it's ready.

#### Self-Managed
This release is ready for installation on your own infrastructure.

### Breaking Changes

**Attention: Please read this section carefully.**

#### Tyk OAS APIs are not backwards-compatible

This upgrade transitions Tyk OAS APIs out of [Early Access]({{< ref "frequently-asked-questions/using-early-access-features" >}}). 

- **Out of Early access**
  - This means that from now on, all Tyk OAS APIs will be backwards compatible and in case of a downgrade from 5.3.X to 5.3.0, the Tyk OAS API definitions will always work.
- **Not Backwards Compatibility**
  - Tyk OAS APIs in Tyk Dashboard v5.3.0 are not [backwards compatible](https://tinyurl.com/3xy966xn). This means that the new Tyk OAS API format created by Tyk Gateway/Dashboard v5.3.X does not work with older versions of Tyk Gateway/Dashboard, i.e. you cannot export these API definitions from a v5.3.X Tyk Dashboard and import to an earlier version.
  - The upgrade is **not reversible**, i.e. you cannot use version 5.3.X Tyk OAS API definitions with an older version of Tyk Dashboard.
  - This means that if you wish to downgrade or revert to your previous version of Tyk, you will need to restore these API definitions from a backup. Please use our guidance documentation for how to [backup Tyk APIs and Policies]({{ < ref "" >}})
  - If you are not using Tyk OAS APIs, Tyk will maintain backward compatibility standards.
- **Historic Tyk OAS API Definition Compatibility**
  - Tyk OAS API Definitions prior to v5.3.0 are not compatible with Tyk Gateway v5.3.X.
  - This means that any Tyk OAS APIs created in any previous release (4.1.0-5.2.x) cannot work with the new Tyk Dashboard without being migrated to the new format.
- **After upgrade (the good news)**
  - If you had a Tyk OAS API prior to v5.3.0 then Tyk Dashboard will automatically update the API definition to [latest format]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}).
  - This means that you do not have to do anything to make your Tyk OAS APIs compatible with the new 5.3.0 release as Tyk Dashboard will take care of that during start-up.
- **MDCB deployment and Tyk OAS APIs**
  - MDCB users utilising Tyk OAS APIs **should wait for the release of MDCB v2.5** before upgrading Tyk Gateway and Dashboard to v5.3.0. This means Tyk OAS APIs will not be loaded with MDCB v2.4 or older.
  - For MDCB users using Tyk OAS APIs, Tyk Dashboard 5.3.0 will only work with Tyk Gateway v5.3.0 and MDCB v2.5.X. Older versions of Tyk Gateway may not function correctly with v5.3.0 Tyk OAS API definitions.
 
**Important**
Please go to the [backup]({{ < ref "#essential-steps-before-upgrade" >}}) section for detailed instructions on backup before upgrading to v5.3.0
 
### Dependencies
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.0 | MDCB v2.5     | MDCB v2.4.2 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 4.4.x, 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) | v3.0.x      | v3.0.x          | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})|

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions

**The following steps are essential to follow before upgrading**

1. Backup Your Environment (this is the [usual guidance]({{<ref "upgrading-tyk#tyk-self-managed">}}) with every release)
2. Backup all your API definitions (Tyk OAS API and Classic Definitions). To do the backup please refer to our guide [exporting APIs and policies]({{<ref "developer-support/backups/backup-apis-and-policies">}})
With Tyk OAS leaving Early Access in this release, the Tyk Dashboard will migrate your Tyk OAS APIs in the database to v5.3.0 Tyk OAS API definitions at which point they will no longer work with older versions of Tyk Dashboard (<v5.3.0). We advise you to backup your Tyk OAS API definitions before upgrading Tyk Dashboard in case you later need to rollback to an earlier Tyk version.
     
#### Upgrade process

Users are strongly advised to follow the instructions in the [upgrade guide](#upgrading-tyk) when upgrading Tyk.


### Release Highlights

We are excited to announce the release of 5.3.0, packed with new features, improvements and bug fixes to enhance your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.3.0) below.

#### Tyk OAS Feature Maturity

Tyk OAS is now out of [Early Access]({{< ref "frequently-asked-questions/using-early-access-features" >}}) as we have reached feature maturity. You are now able to make use of the majority of Tyk's features from your Tyk OAS APIs, so they are a credible alternative to the legacy Tyk Classic APIs.
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

#### API Templates

Exclusively for Tyk OAS APIs, we are pleased to announce the introduction of API Templates: an API governance feature provided to streamline the process of creating APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition. With templates you can standardise configuration of your APIs more easily, combining your service-specific OpenAPI descriptions with enterprise requirements such as health endpoints, caching and authorisation.

#### Enhanced User Permissions

 Introducing allow list in field-based permissions via the Dashboard specifically tailored for GraphQL APIs. Users can now define granular access control for API key holders based on types and fields from a GraphQL schema. This feature enhances security and flexibility in managing API access, providing a more tailored and secure experience for users.

 #### Global Header Management 

 We've introduced global header management specifically for UDG, simplifying header configuration across all data sources. Users can now effortlessly add, adjust, and delete multiple global headers, ensuring consistency and efficiency throughout API management, ultimately saving developers time and effort

#### GraphQL focused analytics
We have made the first step towards bringing our users GraphQL-focused monitoring capabilities. Users can now gain valuable insights into error trends and usage patterns for GraphQL APIs, when storing graph analytics in SQL databases. With the addition of popularity and error bar charts, users can delve deeper into their data, facilitating optimization and troubleshooting efforts.

#### Redis v7.x Compatibility
We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

#### MongoDB v7.0.x Compatibility
We have upgraded `mongo-go` driver to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that both Tyk 5.0.x+ and Tyk 5.3 are compatible with MongoDB v7.0.x.

### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/vX.Y.Z/images/blabla)
- <<Helm charts links>>
- [source code tarball for oss projects]()

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

In this update, we've added support for API Categories for Tyk OAS APIs in the Tyk Dashboard, enhancing portfolio management by enabling efficient categorization and organisation of APIs.
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

New section of the Dashboard offers the following information:
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
<summary>Enhanced Dashboard Navigation: Introducing Favourite Screens</summary>

Every Dashboard menu item can now be flagged as a favourite so that it is pinned to the top of the menu navigation bar for easier access. We've also made a few changes in styling, so that the navigation menu is nicer to look at.
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

Tyk uses `mongo-go` as the default MongoDB driver from v5.3. This provides support for MongoDB 4.4.x, 5.0.x, 6.0.x and 7.0.x. If you are using older MongoDB versions e.g. 3.x, please set MongoDB driver to `mgo`. The [MongoDB supported versions](https://tyk.io/docs/planning-for-production/database-settings/mongodb/#supported-versions) page provides details on how to configure MongoDB drivers in Tyk.
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
<summary>Resolved OPA rule restriction on UDG OAS import endpoint</summary>

We fixed an issue where OPA rules were preventing users from importing an OpenAPI document as a UDG data source using the /api/data-graphs/data-sources/import endpoint. The endpoint has now been included into the correct user permission group and will be accessible for users who have `api:write` permissions.
</details>
</li>
<li>
<details>
<summary>Optimised Policy Creation Endpoint</summary>

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
