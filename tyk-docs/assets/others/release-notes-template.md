<!--

This is a Markdown template that serves to provide guidance for compiling consistently structured release notes.
For each specific release if there is additional miscellaneous information or announcements that will be helpful to the customer then squads
should add additional sections to their release notes.
-->

---
title: Tyk <Dashboard|Gateway|Pump|etc.> <X.Y> Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk <Dashboard/Gateway/Pump> versions within the <X.Y.Z> series."
tags: ["Tyk Dashboard", "Release notes", "changelog", "vX.Y", "X.Y.0", "X.Y", "X.Y.Z"]
---

<!-- oss or licensed. Choose one of the following:
    **Licensed Protected Product** 
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for version 5.2.X displayed in a reverse chronological order**

### Support Lifetime
<!-- replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. This would be <vX.Y+1> scheduled in Q<1-4> if this goes ahead as planned. If not, X.Y will remain in support until our next LTS version comes out in March 2024.

---

## X.Y.Z Release Notes 

##### Release Date DD Mon YYYY <<update>>

#### Breaking Changes
<!-- Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

#### Future Breaking Changes (Optional)
<!-- Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc. -->

#### 3rd Party Dependencies & Tools
<!-- Third party dependencies encompasses tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release. 

Additionally, a disclaimer statement should be added for customers to check that the third party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatibile Versions information will require discussion with relevant squads and QA.
-->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    |
| ---------------------------------------------------------- | ---------------------- | ---------------------- |
| [GoLang](https://go.dev/dl/)                               | 1.19, 1.20, 1.21       | 1.19, 1.20, 1.21       |
| [MongoDB](https://www.mongodb.com/try/download/community)  | 4.4.x, 5.0.x and 6.0.x | 4.4.x, 5.0.x and 6.0.x |
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.


#### Dependencies (Optional)
<!-- Announce compatible related dependencies, e.g Dahsboard and MDCB -->
This release of Tyk Dashboard is compatible with MDCB version x.y.z 

#### Deprecations
<!-- Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

#### Upgrade instructions
<!-- For patches release use this: 
If you are on a X.Y.0 we advise you to upgrade ASAP and if you are on an older version skip X.Y.0 and upgrade directly to this release. 
-->

#### Release Highlights
<!-- Use similar ToV to previous release notes. For example for a patch release:
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
<!-- The change log should include the following ordered set of sections below that briefly summarise the features, updates and 
fixed issues of the release.

Here it is important explain the benefit of each changelog item. As mentioned by James in a previous slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that"
-->

##### Added
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarise the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below.
-->
<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
</ul>

  
##### Changed
<!--
This should be a bullet point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarise the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below.
-->
<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
</ul>
  
##### Fixed
<!-- 
This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:

- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarise the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below.
-->
<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise links will not be rendered.
</details>
</li>
</ul>

#### Security Fixes
<!--
This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to made as follows:
1. Dependency tracked CVEs - External tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->

##### Comunity Contributions
<!--
This section should thank external contributors and include a linked reference to their GitHub username with a brief summary of their contribution.

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

<!-- use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->
---

<!--
Repeat release notes seection above for every patch here
-->


<!--
Footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs.
-->
## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation
<!-- Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection 

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?				
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
-->
- [OpenAPI Document]({{<ref "blabla" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/<collection-id>)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

### Miscellaneous (Optional)
<!-- 
For each specific release if there is additional miscellaneous information or announcements that will be helpful to the customer then squads
should add additional sections to their release notes.
-->
