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

**This page contains all release notes for version 5.2.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. This would be <vX.Y+1> scheduled in Q<1-4> if this goes ahead as planned. If not, X.Y will remain in support until our next LTS version comes out in March 2024.

---

## X.Y.Z Release Notes

##### Release Date DD Mon YYYY <<update>>

#### Breaking Changes
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

#### Dependencies
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

##### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Compatibility | Backwards Compatibility |
|----    |---- |---- |
| 5.3 LTS | Helm v2.2     | Helm vX - vY |
|         | MDCB v2.5     | MDCB v1.7 - v2.4 |
|         | Operator v1.8 | Operator vX - vY |
|         | Sync v2.4.1   | Sync vX - vY |
| | | EDP vX - vY |
| | | Pump vX - vY |
| | | TIB vX - vY |

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.19, 1.20, 1.21       | 1.19, 1.20, 1.21       | All our binaries| 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 4.4.x, 5.0.x and 6.0.x | 4.4.x, 5.0.x and 6.0.x | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 
| OpenAPI JSON Schema  | v3.0.0...      | v3.0.0...          | Used by [Tyk OAS API definition](https://swagger.io/specification/)                | [3.0.3](https://spec.openapis.org/oas/v3.0.3)|

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this:
For users currently on vX.Y.Z, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version X.Y.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
##### Topic in The Release Highlights
Topic in The Release Highlights

##### Another Topic in The Release Highlights
Topic in The Release Highlights

#### Downloads
- <<[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/vX.Y.Z/images/blabla)>>
- <<Helm charts links>>
- <<source code tarball for oss projects>>

#### Changelog {#Changelog-vX.Y.Z}
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
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Add an option to enable detailed tracing for OAS API</summary>
 
By enabling [detailed tracing]({{<ref "/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview#step-2-enable-detailed-tracing-at-api-level-optional">}}), gateway will create a span for each middleware involved in request processing. These spans offer detailed insights, including the time taken for each middleware execution and the sequence of invocations.
</details>
</li>

<li>
<details>
<summary>Support Redis v7.0.x</summary>
 
Tyk 5.3 refactors Redis connection logic by using [storage v1.2.2](https://github.com/TykTechnologies/storage/releases/tag/v1.2.2), which integrates with [go-redis](https://github.com/redis/go-redis) v9 underneath which added support to Redis v7.0.x.
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
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>The internal TIB session secret defaults to admin_secret if it is not set explicitly</summary>

If internal TIB is enabled in Dashboard and TYK_IB_SESSION_SECRET environment variable is not set, it will be default to Dashboard admin_secret. It provides better security and user experience because SSO flow would not work if TYK_IB_SESSION_SECRET is not set.
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

Tyk uses `mongo-go` as the default MongoDB driver from v5.3. This provides support for MongoDB 4.4.x, 5.0.x, 6.0.x, 7.0.x. If you are using older MongoDB versions e.g. 3.x, please set MongoDB driver to `mgo`. [MongoDB supported versions](https://tyk.io/docs/planning-for-production/database-settings/mongodb/#supported-versions) page provides details on how to configure MongoDB drivers in Tyk.
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
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to the content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Fixed SSO flow for classic developer portal</summary>

For classic portal cookies and dashboard, use SameSite = SameSiteLaxMode so SSO flows can be performed
</details>
</li>
<li>
<details>
<summary>Remove unnecessary warning output from `tyk-dashboard --version`</summary>
   
Remove the following unnecessary warning output when user use `tyk-dashboard --version` command to check dashboard version. 
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

##### Comunity Contributions
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
- [OpenAPI Document]({{<ref "" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/<collection-id>)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

### Miscellaneous (Optional)
<!-- For each specific release if there is additional miscellaneous information or announcements that will be helpful to the customer then squads
should add additional sections to their release notes. -->
