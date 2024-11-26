
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

## 1.11.0 Release Notes

### Release Date 25 Sept 2024

### Breaking Changes
This release has no breaking changes.

### Future breaking changes
This release doesn’t introduce future breaking changes.

### Deprecations
There are no deprecations in this release.

### Release Highlights
The v1.11.0 release includes the following new features and improvements:
- New Portal admin UI.
- Closer to API Parity: APIs for Tags, Blogposts, Product images, Webhooks, and rotate credentials. A total of 23 new endpoints. 
- [22 bugs fixed](#fixed)
- [19 CVEs fixed](#fixed)
- CSRF protection, new TLS configuration and better recovery link security.


#### Performance Optimizations
To improve stability under high loads, we conducted performance testing and identified that improper database configurations can cause unexpected portal restarts. To prevent this and ensure optimal performance, we recommend the following database settings:

**Recommended Configuration:**
- [PORTAL_DATABASE_MAX_OPEN_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_open_connections" >}}): Set this value based on your database’s maximum connection limit divided by the number of portal instances. For example, if your database allows 200 connections and you are running 4 portal instances, set PORTAL_DATABASE_MAX_OPEN_CONNECTIONS to 50 per instance. This ensures that all instances can share the available connections without exceeding the database's limit, which could otherwise lead to performance degradation or errors.
- [PORTAL_DATABASE_MAX_IDLE_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_idle_connections" >}}): Set to 15 or a lower value based on your expected load. This setting keeps a reasonable number of connections readily available without tying up resources unnecessarily.

For reference, with 2 portal instances, `PORTAL_DATABASE_MAX_OPEN_CONNECTIONS` set to 30 and `PORTAL_DATABASE_MAX_IDLE_CONNECTIONS` set to 15, we could handle 90 active users.

### Upgrade instructions
If you are on 1.10.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

### Download
- [Docker image v1.11.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.11.0)
  - ```bash
    docker pull tykio/portal:v1.11.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.11.0)

### Changelog

#### Added
- New Portal admin UI.
- Added CRUD APIs for Tags.
- Added CRUD APIs for Webhooks.
- Added CRUD APIs for Product images.
- Added APIs to manage blog posts along with their tags and categories.
- Added a new API endpoint that allows the rotation of API credentials.
- UI and API for themes soft delete. Soft deleted themes are not shown in the UI and API, but are kept in the database for future reference.
- Added new TLS variables to set MinVersion ([portal_tls_min_version]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_tls_min_version" >}}), MaxVersion ([PORTAL_TLSCONFIG_MAXVERSION]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_tls_max_version" >}}), and CipherSuites ([PORTAL_TLS_CIPHER_SUITES]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_tls_cipher_suites" >}}).
- Added a new configuration to manage the idle timeout of the portal's session ([PORTAL_SESSION_IDLE_TIMEOUT]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_session_idle_timeout" >}}).
- Added CSRF protection injection to portal's form. Now you don't need to add it manually to your templates.

#### Changed
- Changed passwordrecovery links to be valid for 24 hours.
- Changed password recovery links to be unique and valid for one use only.
- Changed the default value of [PORTAL_DATABASE_CONNECTION_MAX_LIFETIME]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_connection_max_lifetime" >}}) to 1800000 milliseconds.
- Changed session token queries for better performance.
- Introduced new indexes for better performance.

#### Fixed
- Fixed sensitive information leak on password recovery links.
- Fixed the wrong permission list for super admin in the external portal dashboard.
- Fixed deletion of related APIDetail records when a Product is deleted.
- Fixed a bug that caused the portal to panic when users sent a PUT request to the/API/pages/ endpoint without a template.
- Fixed a bug where markdown content wasn't adding IDs attribute automatically to sections.
- Fixed an issue where the OAS file was not attached to the API resource associated with an API product when multiple API resources were linked.
- Fixed SSO issues when SameSite Header is set to Strict.
- Fixed issues where certain files might not have been unpacked correctly due to conflicts or incorrect path resolution, particularly when themes with similar names were involved.
- Fixed an issue with how PostgreSQL connection strings, specifically the sslmode configuration, were being handled. Portal now fully conforms to PostgreSQL documentation and standards, ensuring that SSL certificates are correctly utilized without causing connection errors.
- Fixed a bug where sessions were expiring independently if users were active or not.
- Fixed distroless image bootstrapping issue.
- Fixed an issue where fetching a theme by its ID returned empty field values due to whitespace characters being stripped from the ID.
- Fixed deleting and rotating shared credentials within an organization. 
- Fixed a rendering error while deleting credentials. Now, it shows an error page instead of a blank page.
- Fixed a bug where product content was truncated after 255 characters in MySQL and MariaDB. This update ensures that full-length product content is now stored and displayed without truncation.
- Fixed the portal API behavior to handle cases where the "Accept" header is absent. Previously, such requests resulted in a 500 Internal Server Error with no response body, causing the portal to panic.
- Fixed a duplicated 404 error page when there is a not found error.
- Fixed credential revocation error when OAuth2.0 provider is deleted. 
- Fixed an issue where credentials weren’t deleted with OAuth2.0 provider removal.
- Fixed an issue where the graph only displayed the peak value of 100, even when the average error rate was below 100.
- Fixed several errors in the portal API specification.
- Fixed the 19 CVEs, among which are:
    - CVE-2024-28834
    - CVE-2024-28835
    - CVE-2023-5678
    - CVE-2023-6129
    - CVE-2023-6237
    - CVE-2024-0727
    - CVE-2023-50387
    - CVE-2023-50868
    - CVE-2023-5678
    - CVE-2023-6129
    - CVE-2023-6237
    - CVE-2024-0727
    - CVE-2024-24792
    - CVE-2023-45288
    - CVE-2023-5678
    - CVE-2023-6129
    - CVE-2023-6237
    - CVE-2024-0727
    - CVE-2024-24792
    - CVE-2023-45288




## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
