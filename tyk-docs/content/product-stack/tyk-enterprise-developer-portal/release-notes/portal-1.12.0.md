---
title: Tyk Enterprise Developer Portal v1.12.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.12.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.12.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

## 1.12.0 Release Notes

### Release Date 13 Nov 2024

### Release Highlights
The v1.12.0 release includes the following new features and improvements:
- Embedded Tyk Identity Broker. From this release, you don't need to deploy a separate Tyk Identity Broker to SSO into the portal.
- Now admins can create Apps and Credentials for developers directly from the portal admin UI.
- Credentials notifications. Now admins can configure email notifications for credential expiration and credential expiration warnings.
- Stronger passwords. Now admins can configure the password policy from the portal admin UI.
- Security: 3 new high CVEs fixed.
- Bugfixes: 4 bugs fixed.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v1.12.0) below.

### Breaking Changes
This release has no breaking changes.


### Deprecations
There are no deprecations in this release.


### Upgrade instructions
If you are on 1.11.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

### Download
- [Docker image v1.12.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.12.0)
  - ```bash
    docker pull tykio/portal:v1.12.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.12.0)

### Changelog {#Changelog-v1.12.0}

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
<summary>Embedded Tyk Identity Broker</summary>

From this release, you can configure the portal to serve an internal Tyk Identity Broker. This means that you don't need to deploy a separate Tyk Identity Broker service to SSO into the portal.
This enables a new section under the portal admin UI where admins can manage SSO profiles for admins and developers.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.12.0-embedded-tib.png" width=500px alt="SSO profiles">}}

We support out of the box integration with the following SSO providers type:
- Open ID Connect: Support for OpenID Connect (OIDC) Identity Tokens provided by any standards compliant OIDC provider such as Auth0.
- LDAP: Bind users to an LDAP server such as Azure Active Directory, using their username and password.
- Social: The social provider should provide seamless integration with Google+ Github, Facebook, Salesforce, Digital Ocean and more.

You can read more about the supported SSO providers [here]({{< ref "/tyk-identity-broker" >}}).

</details>
</li>
<li>
<details>
<summary>Creation of Apps and Credentials</summary>

Admins now have enhanced control over application and credential creation in the portal, streamlining the onboarding process and reducing the need for API-based setups. With this update, admins can create applications and assign them to specific users, making it easier to onboard developers who aren’t using self-service options.

For custom authorization scenarios —like when using an external OAuth2.0 provider— admins can now issue credentials directly in the portal. These credentials are stored as key-value pairs that developers can view, providing a more seamless alternative to manual credential sharing.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.12.0-non-tyk-managed-credential.png" width=500px alt="Non-Tyk managed credential">}}


Admins can also generate auth token credentials, with added flexibility to define custom token values if needed for compatibility with other systems. Additionally, OAuth2.0 credentials can now be created within the portal, ensuring stable, secure access for developers with the added benefit of immutability after creation.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.12.0-custom-credential.png" width=500px alt="Custom credential">}}

Overall, these improvements simplify the process for managing applications and credentials, offering a more streamlined experience for admins and developers alike.

</details>
</li>
<li>
<details>
<summary>Password policy</summary>

Admins can now configure the password policy from the portal admin UI. This includes setting the minimum password length, reused passwords, multi case, and more.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.12.0-password-policy.png" width=500px alt="Password policy">}}

</details>
</li>
<li>
<details>
<summary>Credentials notifications</summary>

Admins can now configure two types of notifications:
- Credential expiration: This notification is sent to developers when their credentials expire. You can modify the email template in the `keyexpired.tmpl` file included in the theme package.
- Credential expiration warnings: This notification is sent to developers when their credentials are about to expire. Admins can set the number of days before the expiration in the portal admin UI. You can modify the email template in the `keytoexpire.tmpl` file included in the theme package.

{{< img src="/img/dashboard/portal-management/enterprise-portal/1.12.0-credential-expiration.png" width=500px alt="Credentials notifications">}}


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
<summary>Upgrade to Go 1.22 </summary>

The Enterprise Developer Portal has been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance,
strengthened security, and access to the latest features available in the new Golang release.

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
<summary>Fixed a bug where values of dropdown custom attributes weren't removed correctly</summary>

Fixed a bug where values of dropdown custom attributes weren't removed correctly preventing admins from updating User custom attributes.

</details>
</li>
<li>
<details>
<summary>Fixed a certificate upload issue in Kubernetes environments</summary>

Fixed an issue that was causing certificate uploads to fail when the file size exceeded 2KB in Kubernetes environments.

</details>
</li>
</details>
</li>
<li>
<details>
<summary>Fixed a bug that prevented to load OAS files from S3 storage</summary>

We have addressed a bug that was causing the portal to fail loading OAS files from S3 storage.

</details>
</li>
<li>
<details>
<summary>Fixed typos in email subjects</summary>

We have fixed typos in email subjects that were causing notifications to be sent with incorrect information.

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

Fixed the following high priority CVEs identified in the Tyk Enterprise Developer Portal, providing increased protection against security
vulnerabilities:

- [CVE-2024-34158](https://nvd.nist.gov/vuln/detail/CVE-2024-34158)
- [CVE-2024-34156](https://nvd.nist.gov/vuln/detail/CVE-2024-34156)
- [CVE-2022-30635](https://nvd.nist.gov/vuln/detail/CVE-2022-30635)

</details>
</li>
</ul>

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->

<!--
Repeat the release notes section above for every patch here
-->

<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
