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

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc. -->
<!-- #### Planned Breaking Changes -->

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
| [GoLang](https://go.dev/dl/)                               | 1.19, 1.20, 1.21       | 1.19, 1.20, 1.21       | All our binaries| 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x  | 4.4.x, 5.0.x, 6.0.x, 7.0.x  | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| OpenAPI JSON Schema  | v3.0.0...      | v3.0.0...          | Used by [Tyk OAS API definition](https://swagger.io/specification/)                | [3.0.3](https://spec.openapis.org/oas/v3.0.3)|

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions
<!-- Required. For patches release (Z>0) use this:
For users currently on vX.Y.Z, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version X.Y.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
If you are upgrading to 5.3.0, please follow the detailed [upgrade](#upgrading-tyk) instructions.

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are excited to announce the release of 5.3.0, packed with new features, improvements and bug fixes to enhance your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.3.0) below.

#### Field-Based Permissions
We have introduced field-based permissions allow list in the Dashboard. Users can now define granular access control for API key holders based on types and fields from a GraphQL schema. This feature enhances security and flexibility in managing API access, providing a more tailored and secure experience for users.

#### Global Header Management
We have implemented global header management, simplifying header configuration across all data sources. Users can now easily add, configure and remove multiple global headers that are forwarded to all data sources. This enhancement streamlines header management and ensures consistency across APIs, saving time and effort for developers.

#### Enhanced Analytics
We have expanded our analytics capabilities by extending APIs for fetching graph analytics from SQL databases. Users can now gain valuable insights into error trends and usage patterns for GraphQL APIs. With the addition of popularity and error bar charts, users can delve deeper into their data, facilitating optimization and troubleshooting efforts.

#### Redis v7.x Compatibility
We have upgraded redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

#### MongoDB v7.0.x Compatibility
We have upgraded mongo-go driver to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that both Tyk 5.0.x+ and Tyk 5.3 are compatible with MongoDB v7.0.x.

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
<summary>Implemented design elements in key screens with backend connection</summary>

Support for field-based permissions allow list has been added in the Dashboard. Users can now define which types and fields from a GraphQL schema an API key holder can access by simply putting a tick next to them in the policy/key definition screens.
</details>
</li>
<li>
<details>
<summary>Extended APIs for fetching Graph Analytics from SQL DBs for errors by Graph API chart</summary>

We've added an internal API endpoint that returns information regarding errors for GraphQL APIs. The top 5 graph names with the highest number of errors will be returned along with the exact number of those errors. This information will be displayed in Tyk Dashboard, so that GraphQL users can gain insight into how their graphs are used.
</details>
</li>
<li>
<details>
<summary>Introduced global header management in the Headers Management Tab</summary>

The Global Header Management feature, is now easily accessible via the Header Management tab. You can swiftly add and configure multiple global headers or remove them with a single click and they will be forwarded to all data sources. This enhancement simplifies header management, offering a more user-friendly experience.
</details>
</li>
<li>
<details>
<summary>Implemented backend/frontend connection for data source headers in the Headers Management Tab</summary>

Header management for all UDG data sources has been now moved into a new tab in the Dashboard. Users will be able to manage headers and their values in a more efficient way in a single place. All information about the data source is readily available in the new section.
</details>
</li>
<li>
<details>
<summary>Connected Backend/Frontend for Popularity and Errors Bar Charts</summary>

Popularity by Graph and Errors by Graph charts have been added to the Activity by Graph Dashboard. This feature empowers users with deeper insights into their data. The Popularity by Graph chart dynamically updates to reflect real-time data retrieved from SQL database and shows the top 5 popular Graphs over time, additionally showing the numbers of times operations have been requested from each graph. The Errors by Graph chart visualises the top 5 graphs with errors and offers a clear depiction of error trends over time, aiding in identifying and addressing potential issues promptly.
</details>
</li>
<li>
<details>
<summary>Enabled import of OpenAPI Document via file upload for Tyk OAS APIs</summary>

Allow the creation of Tyk OAS APIs by importing specification via file upload.
</details>
</li>
<li>
<details>
<summary>Expanded APIs for fetching graph analytics from SQL DBs - All Graph APIs Table</summary>

APIs that fetch analytics records from SQL databases, so that they can be displayed in the Dashboard, have been extended with a new endpoint that will feed analytics data for a new table. The new table will show all Graph APIs and information on: how many times they've been used, how many success responses were sent back, how many errors, the average latency and the last time it was used.
</details>
</li>
<li>
<details>
<summary>Added search capability for data sources in the new Headers Management Tab</summary>

Added search capability for data sources in the new headers management tab. In scenarios where a UDG contains many data sources, it is now easier for users to locate the data source(s) they require. 
</details>
</li>
<li>
<details>
<summary>Added support for CRUD operations on API Templates created in the Dashboard API</summary>

Extended Tyk Dashboard API to manage API Templates CRUD operations.
</details>
</li>
<li>
<details>
<summary>Added Dashboard UI for managing API Templates</summary>

Added Dashboard UI functionality for creating and applying OAS API Templates. 
This includes:
- possibility of creating an API template from OAS API Designer page
- applying API template for OAS API, within the Create API screen
- applying API template when importing an OpenAPI document in order to create an OAS API
- exposing new user permission for managing API templates
</details>
</li>
<li>
<details>
<summary>Add an option to enable detailed tracing for OAS API</summary>
 
By enabling [detailed tracing]({{<ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview#step-2-enable-detailed-tracing-at-api-level-optional">}}), gateway will create a span for each middleware involved in request processing. These spans offer detailed insights, including the time taken for each middleware execution and the sequence of invocations.
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
<summary>Enhanced dashboard navigation: introducing favourite pages</summary>

New GUI capability has been added, relating to favourite pages. Users can now mark the pages they use most often in the Dashboard as preferred. This action will rearrange the order of the menu navigation bar and pin the preferred pages to the top of it, so they are always at hand. We've also made a few changes in styling, so that the navigation menu is visually appealing.
</details>
</li>
<li>
<details>
<summary>Improved UI for data source headers management</summary>

We have moved data source header management to a separate tab, so that it is easy to configure global headers that will be forwarded to all data sources by default. The data source configuration screen displays all headers that will be sent with the upstream request in read-only mode now and changes can be made by switching to Headers Management tab.
</details>
</li>
<li>
<details>
<summary>Go 1.21 upgrade for Gateway and Dashboard</summary>

Updated Gateway and Dashboard to use Go 1.21.
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
<summary>Support MongoDB v7.0.x</summary>

Tyk 5.3 integrates with [storage v1.2.2](https://github.com/TykTechnologies/storage), which updated mongo-go driver we use from v1.11.2 to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that Tyk 5.0.x+ is compatible with MongoDB v7.0.x
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

We fixed an issue where OPA rules were preventing users from importing an OAS spec as a UDG data source using the /api/data-graphs/data-sources/import endpoint. The endpoint has now been included into the correct user permission group and will be accessible for users, who have permissions to create APIs in Tyk Gateway.
</details>
</li>
<li>
<details>
<summary>Optimised creation of policies via the api/portal/policies/POLICY_ID endpoint</summary>

Fixed an issue where Tyk Dashboard took a long time when applying security policies to large numbers of APIs by implementing bulk processing in the validation step. This fix provides an 80% reduction in the time taken to apply a policy to 2000 APIs.
</details>
</li>
<li>
<details>
<summary>Enhanced security: HTML inline script migration for Classic Portal with CSP rules</summary>

Moved all HTML inline scripts to their own script files, to accommodate the content security policies that have been enabled, to increase security.
</details>
</li>
<li>
<details>
<summary>Blank page issue with mock response in OAS import flow</summary>

Fixed small issue on preventing the page to break if not all fields are set on a mock response status code.
</details>
</li>
<li>
<details>
<summary>OAS panic during API Edit with Virtual Endpoint middleware configured</summary>

Fixed an issue where the Gateway could panic while updating a Tyk OAS API with the Virtual Endpoint middleware configured.
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
<summary>Editing headers in imported API with mock response</summary>

Enhanced the functionality for editing headers within the mock response middleware. Previously, there was an issue with headers defined in the components/headers section of the OAS and referenced in the path headers, where the UI failed to present and enable the modification of header values. This occurred specifically when the header was referenced using `{ $ref: "#components/headers"` instead of having a direct description and schema.
</details>
</li>
<li>
<details>
<summary>Error importing external OAuth APIs</summary>

Fix error creating OAS API with external OAuth authentication method.
</details>
</li>
<li>
<details>
<summary>Middleware tooltip descriptions improved in OAS API Designer</summary>

Improved tooltip description of endpoint middleware, in the OAS API Designer.
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

#### Comunity Contributions
<!-- This section should thank external contributors and include a linked reference to their GitHub username with a summary of their contribution.

Example

Special thanks to the following member of the Tyk community for their contribution to this release:

<ul>
<li>
<details>
<summary>Runtime log error incorrectly produced when using Go Plugin Virtual Endpoints</summary>

Fixed a minor issue with Go Plugin virtual endpoints where a runtime log error was produced from a request, even if the response was successful. Thanks to ghub_user_tag_name for highlighting the issue and proposing a fix.
</details>
</li>
</ul>
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
- [OpenAPI Document]({{<ref "tyk-dashboard-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
