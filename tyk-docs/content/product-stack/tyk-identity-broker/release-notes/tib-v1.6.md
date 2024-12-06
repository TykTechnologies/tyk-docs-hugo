---
title: Tyk Identity Broker 1.6 Release Notes
date: 2024-10-27T15:49:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Identity Broker versions within the 1.6.x series."
tags: ["Tyk Identity Broker", "Release notes", "changelog", "v1.6", "1.6.1"]
---
****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 1.6.x displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 1.6.1 Release Notes

### Release Date 5 Nov 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
##### Enhanced Security with JWE Support for OIDC SSO
This release introduces JSON Web Encryption (JWE) support for OpenID Connect (OIDC) Single Sign-On (SSO) in the Tyk Identity Broker (TIB). With this enhancement, organizations can achieve greater security for token handling during authentication flows. JWE token validation and processing are now seamlessly integrated, offering configurable private key support for decryption.


### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention ALL changes in our application log messages in the changelog section. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log, etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates, etc. -->
<!-- #### Planned Breaking Changes -->

### Dependencies
<!-- Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->
      
#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [GoLang](https://go.dev/dl/)                               | 1.21       | 1.21       | All our binaries |
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.x, 6.x, 7.0 | 4.4.x, 5.x, 6.x and 7.0.x | Used by Tyk Identity Broker |
| [Redis](https://redis.io/download/)         | 6.x - 7.0        | 6.x - 7.0            | Used by Tyk Identity Broker |

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
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.6.0, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version 1.6.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.


### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-identity-broker/tags?name=1.6.1)
  ```
  docker pull tykio/tyk-identity-broker:v1.6.1
  ```
- source code tarball for oss projects - [TIB v1.6.1](https://github.com/TykTechnologies/tyk-identity-broker/releases/tag/v1.6.1)

### Changelog {#Changelog-v1.6.1}
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
<summary>Support for JSON Web Encryption (JWE) in OIDC SSO with TIB</summary>

This release adds support for JSON Web Encryption (JWE) in OIDC Single Sign-On (SSO) with TIB, providing enhanced security for token handling in authentication flows. This feature enables processing and validation of JWE tokens, with configuration options for setting the private key required for decryption.

For more details, refer to the [OIDC SSO with JWE]({{<ref "/tyk-stack/tyk-identity-broker/about-profiles#social-profile-fields">}}) documentation.
</details>
</li>

</ul>

---

<!--
Repeat the release notes section above for every patch here
-->


<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
