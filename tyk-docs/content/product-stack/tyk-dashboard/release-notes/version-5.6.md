---
title: Tyk Dashboard 5.6 Release Notes
date: 2024-10-08T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.6.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.6", "5.6.0", "5.6", "changelog"]
---
<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**This page contains all release notes for version 5.6.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 5.6.1 Release Notes

### Release Date 18 October 2024

### Release Highlights

This is a version bump to align with Gateway v5.6.1, no changes have been implemented in this release.

### Breaking Changes

There are no breaking changes in this release.

### Dependencies {#dependencies-5.6.1}

#### Compatibility Matrix For Tyk Components
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

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.6.1}
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

There are no deprecations in this release.

### Upgrade instructions {#upgrade-5.6.1}

If you are upgrading to 5.6.1, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.6.1)
- ```bash
  docker pull tykio/tyk-dashboard:v5.6.1
  ```
- Helm charts
  - [Tyk Charts v2.0.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.0.md">}})

### Changelog {#Changelog-v5.6.1}

No changes in this release.


---
## 5.6.0 Release Notes

### Release Date 10 October 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We are thrilled to announce new updates and improvements in Tyk 5.6.0, bringing more control, flexibility, and performance.  For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.6.0">}}) below.

#### Per endpoint Rate Limiting for clients

Now you can configure rate limits at the [endpoint level per client]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}), using new configuration options in the access key. Use Tyk's powerful [security policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) to create templates to set appropriate rate limits for your different categories of user.

#### Go upgrade to 1.22

We’ve upgraded the Tyk Dashboard to Golang 1.22, bringing improved performance, better security, and enhanced stability to the core system.

####  Strengthened Role-Based Access Controls (RBAC) to combat privilege escalation risks

We’ve tightened up the rules that govern a user's ability to create admin users and to reset other users' passwords when using Tyk's RBAC function. Now, only super-admins can create new admins, admin roles can't be assigned to user groups, and only admin users can reset another user's password (and only within their Tyk organization).

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
| Dashboard Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.6.0 | MDCB v2.7.1     | MDCB v2.5.1 |
|         | Operator v1.0.0  | Operator v0.17 |
|         | Sync v2.0    | Sync v1.4.3 |
|         | Helm Chart v2.1  | Helm all versions |
| | EDP v1.11 | EDP all versions |
| | Pump v1.11 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools {#3rdPartyTools-v5.6.0}
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
There are no deprecations in this release.
<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc.
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->
### Upgrade instructions {#upgrade-5.6.0}
If you are upgrading to 5.6.0, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Downloads
- [Docker Image to pull](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=v5.6.0)
- ```bash
  docker pull tykio/tyk-dashboard:v5.6.0
  ```
- Helm charts
  - [tyk-charts v2.1.0]({{<ref "product-stack/tyk-charts/release-notes/version-2.1.md">}})

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
<summary>Per endpoint client rate limiting</summary>

Building on the [per-endpoint upstream rate limits]({{< ref "getting-started/key-concepts/rate-limiting#api-level-rate-limiting" >}}) introduced in Tyk 5.5.0 we have now added [per-endpoint client rate limits]({{< ref "getting-started/key-concepts/rate-limiting#key-level-rate-limiting" >}}). This new feature allows for more granular control over client consumption of API resources by associating the rate limit with the access key, enabling you to manage and optimize API usage more effectively.
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



