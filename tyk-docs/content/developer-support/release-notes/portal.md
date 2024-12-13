---
title: Tyk Enterprise Developer Portal Release Notes
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.12.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.12.0"]
menu:
main:
parent: "Release Notes"
weight: 7
aliases:
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.1.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.10.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.11.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.12.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.2.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.3.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.4.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.5.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.6.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.0
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.1
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.2
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.3
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.4
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.8.5
  - /product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.9.0
---

**Licensed Protected Product**

**This page contains all release notes for Enterprise Developer Portal displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 1.12 Release Notes
### 1.12.0 Release Notes

#### Release Date 13 Nov 2024

#### Release Highlights
The v1.12.0 release includes the following new features and improvements:
- Embedded Tyk Identity Broker. From this release, you don't need to deploy a separate Tyk Identity Broker to SSO into the portal.
- Now admins can create Apps and Credentials for developers directly from the portal admin UI.
- Credentials notifications. Now admins can configure email notifications for credential expiration and credential expiration warnings.
- Stronger passwords. Now admins can configure the password policy from the portal admin UI.
- Security: 3 new high CVEs fixed.
- Bugfixes: 4 bugs fixed.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v1.12.0) below.

#### Breaking Changes
This release has no breaking changes.


#### Deprecations
There are no deprecations in this release.


#### Upgrade instructions
If you are on 1.11.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

#### Download
- [Docker image v1.12.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.12.0)
  - ```bash
    docker pull tykio/portal:v1.12.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.12.0)

#### Changelog {#Changelog-v1.12.0}

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
<summary>Upgrade to Go 1.22 </summary>

The Enterprise Developer Portal has been upgraded from Golang 1.21 to Golang 1.22, bringing enhanced performance,
strengthened security, and access to the latest features available in the new Golang release.

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

## 1.11 Release Notes
### 1.11.0 Release Notes

#### Release Date 25 Sept 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn’t introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights
The v1.11.0 release includes the following new features and improvements:
- New Portal admin UI.
- Closer to API Parity: APIs for Tags, Blogposts, Product images, Webhooks, and rotate credentials. A total of 23 new endpoints. 
- [22 bugs fixed](#fixed)
- [19 CVEs fixed](#fixed)
- CSRF protection, new TLS configuration and better recovery link security.


##### Performance Optimizations
To improve stability under high loads, we conducted performance testing and identified that improper database configurations can cause unexpected portal restarts. To prevent this and ensure optimal performance, we recommend the following database settings:

**Recommended Configuration:**
- [PORTAL_DATABASE_MAX_OPEN_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_open_connections" >}}): Set this value based on your database’s maximum connection limit divided by the number of portal instances. For example, if your database allows 200 connections and you are running 4 portal instances, set PORTAL_DATABASE_MAX_OPEN_CONNECTIONS to 50 per instance. This ensures that all instances can share the available connections without exceeding the database's limit, which could otherwise lead to performance degradation or errors.
- [PORTAL_DATABASE_MAX_IDLE_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_idle_connections" >}}): Set to 15 or a lower value based on your expected load. This setting keeps a reasonable number of connections readily available without tying up resources unnecessarily.

For reference, with 2 portal instances, `PORTAL_DATABASE_MAX_OPEN_CONNECTIONS` set to 30 and `PORTAL_DATABASE_MAX_IDLE_CONNECTIONS` set to 15, we could handle 90 active users.

#### Upgrade instructions
If you are on 1.10.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

#### Download
- [Docker image v1.11.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.11.0)
  - ```bash
    docker pull tykio/portal:v1.11.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.11.0)

#### Changelog

##### Added
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

##### Changed
- Changed passwordrecovery links to be valid for 24 hours.
- Changed password recovery links to be unique and valid for one use only.
- Changed the default value of [PORTAL_DATABASE_CONNECTION_MAX_LIFETIME]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_connection_max_lifetime" >}}) to 1800000 milliseconds.
- Changed session token queries for better performance.
- Introduced new indexes for better performance.

##### Fixed
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

## 1.10 Release Notes
### 1.10.0 Release Notes

#### Release Date 27 Jun 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn’t introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights
The 1.10.0 addresses twenty high-priority bugs and vulnerabilities and introduces three new features:
- OAS APIs support.
- Theme cache. 
- Configuration options for database connections.

#### Upgrade instructions
If you are on 1.9.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

#### Download
- [Docker image v1.10.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.10.0)
  - ```bash
    docker pull tykio/portal:v1.10.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.10.0)

#### Changelog
##### Added
- Added OAS APIs support. 
- Added an assets cache for improved performance on database-backed themes. This speeds up the portal's pages loading time by 30%. It's enabled by default and you can disable using [PORTAL_ASSETS_CACHE_DISABLE]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_assets_cache_disable" >}}).
- Added three new configuration options to manage database connections lifecycle: [PORTAL_DATABASE_MAX_OPEN_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_open_connections" >}}), [PORTAL_DATABASE_MAX_IDLE_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_idle_connections" >}}), and [PORTAL_DATABASE_CONNECTION_MAX_LIFETIME]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_connection_max_lifetime" >}}).

##### Fixed
- Fixed the bug where `PORTAL_SESSION_LIFETIME` was calculated in minutes instead of seconds.
- Fixed the bug where access requests were not removed when an application is deleted.
- Fixed the bug where stoplight library was blocking the portal's startup if it's not available.
- Fixed the bug where browsing into API Product throws an error when Baseline URL is provided in provider section.
- Fixed the bug where it was possible to create new access requests from the admin dashboard.
- Fixed the bug where the portal was not displaying the quota renewal rate when a custom renewal rate was set in a policy.
- Fixed the bug where the first user is always created under Organization 0 when the `/portal-api/users` endpoint is invoked for the first time.
- Fixed the bug where the portal `/ready` probe was not taking into consideration the bootstrap and tables automigration process.
- Fixed the bug where sometimes, the plan added to the cart was not updated after a product change.
- Fixed the bug where it was not possible to delete an application that was provisioned with an access request created through the API.
- Fixed the bug where users where not able to submit the cart from parallel submission (two different tabs or browsers). 
- Fixed the bug where creating an app was not possible when there was no DCR scope specified for the Product but there was a scope specified for the Plan.
- Fixed the bug where the portal logout was not clearing browser user data and logging the user out completely.
- Fixed the bug where it was not possible to delete non authToken apps from the developer portal when approved products and plans are removed.
- Fixed the bug where it was not possible to download the theme without adding an extra `/` to the URL.
- Fixed the bug where carts submissions where emptying other users carts if they have the same content in it.
- Fixed the bug where it was not possible to delete an application after making an API call to update it and associate it to a different user.
- Fixed the bug where the portal was exposing technical details on error messages on the `Forgot password` page.
- Fixed the bug where sometimes, content blocks where not being displayed correctly on the portal admin page.
- Fixed the bug where stoplight was not rendered correctly in mobile devices.
- Fixed the bug where editing current developer password was causing a panic.

## 1.9 Release Notes
### 1.9.0 Release Notes

#### Release Date 27 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
In 2.0.0 release (the next after the next release) we will introduce the capability to create products and plans in the portal instead of creating policies for products and plans in the dashboard.

To achieve that, we will need to change the plans and products architecture. The main change is that plans will include access rights to APIs and endpoint.

As a result of this, 2.0.0 won't be backwards compatible with the previous versions. We will provide migration scripts and instructions before that release.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights
The 1.9.0 release addresses several security vulnerability and bugs and introduces two new capabilities:
- [Webhooks]({{< ref "product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks.md" >}}) for events that happen in the portal.
- [Admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for OAuth2.0 configuration. 

#### Upgrade instructions
If you are on 1.8.5 or an older version we advise you to upgrade ASAP directly to this release.

This release doesn't introduce any changes to the theme, so a theme upgrade is not required.

#### Download
- [Docker image v1.9.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.9.0)
  - ```bash
    docker pull tykio/portal:v1.9.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.5)

#### Changelog
##### Added
- Added [the webhooks]({{< ref "product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks.md" >}}) capability that  enable real-time, automated data updates between the portal and 3rd party applications.
- Added [admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing OAuth2.0 configuration. 

##### Fixed
- Fixed the error where the admin APIs returned 500 instead of 422 when an incorrectly formatted json is passed in the request body.
- Fixed the error where missing DCR registration access token caused crash during DCR client revocation.
- Fixed the error where API-created Access Requests were always auto-approved.
- Fixed the following vulnerabilities related to Go 1.19 by upgrading Go version to 1.21:
  - [CVE-2023-45287](https://scout.docker.com/vulnerabilities/id/CVE-2023-45287).
  - [CVE-2023-39325](https://scout.docker.com/vulnerabilities/id/CVE-2023-39325).
  - [CVE-2023-39319](https://scout.docker.com/vulnerabilities/id/CVE-2023-39319).
  - [CVE-2023-39318](https://scout.docker.com/vulnerabilities/id/CVE-2023-39318).
  - [CVE-2023-45284](https://scout.docker.com/vulnerabilities/id/CVE-2023-45284).
  - [CVE-2023-48795](https://scout.docker.com/vulnerabilities/id/CVE-2023-48795).
  - [CVE-2023-39326](https://scout.docker.com/vulnerabilities/id/CVE-2023-39326).
  - [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094).

## 1.8 Release Notes
### 1.8.5 Release Notes

#### Release Date 5 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
Currently, there are no planned breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights
The 1.8.5 release addresses [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) vulnerability that was introduced in the 1.8.4 release.
If you are not on v1.8.4 then there's no urgency in updating.

#### Upgrade instructions
If you are on 1.8.4 you should **upgrade ASAP** directly to this release. This release doesn't introduce any changes to the theme, so a theme upgrade is not required.

If you are on 1.8.3 or older version please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) to upgrade the portal's themes.

#### Download
- [Docker image v1.8.5](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.8.5)
  - ```bash
    docker pull tykio/portal:v1.8.5
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.5)

#### Changelog

##### Fixed
- Fixed [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) by replacing Debian base image.

### 1.8.4 Release Notes

#### Release Date 5 Mar 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


#### Release Highlights
The 1.8.4 release addresses ten high-priority bugs and vulnerabilities, and introduces multiple improvements to experience of admins in the portal's admin app.

#### Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.4/images/sha256-4dd01c11b79f46a06934b0b0ea8d3bbb63835bd31953eccd896481aa4d9cfe56?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.4)

#### Changelog
##### Added
- Added [new configuration option]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for setting the `SameSite` attribute on the portal's cookie.
- Added [new welcome email for admin users]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) that is sent when new admin account is created.
- Added [new welcome email for developers]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) that is sent when new developer account is created.
- Added a fallback mechanism for referencing assets. This searches for assets, such as images, referenced in the rich text editor or markdown editor. It searches the container's filesystem whenever the portal can't find the referenced asset in the `PORTAL_STORAGE`.

##### Changed
- Changed the title for the subject of the new developer registration request from "Registering email - subject" in the settings UI to "Developer Registration Approval Request - Subject" to better reflect the context in which this email is used.
- Adjusted the portal's behavior for saving pages through the admin API or the Pages UI. Now, if a content block referenced in a template is absent in the page using that template, the portal will ignore this issue instead of preventing the page from being saved. When rendering the respective page, any missing content blocks will be filled with empty strings.
- Changed title for the portal's private pages for better SEO performance:

| URL                          | Page title             |
|------------------------------|------------------------|
| /portal/private/analytics    | Analytics              |
| /portal/private/dashboard    | Dashboard              |
| /portal/private/apps/        | Create an application  |
| /portal/private/apps/:id     | Applications           |
| /portal/private/users        | Users                  |
| /portal/private/organisation | Create an organization |
| /portal/private/users/invite | Invite a user          |
| /portal/private/users        | Users                  |
| /portal/private/users/:id    | Users                  |
| /portal/private/profile      | Profile                |
| /auth/password/login         | Developer portal login |
| /auth/password/new           | Password reset         |
- Changed the credential provisioning flow to automatically include DeveloperID, OrganizationID, ApplicationID, and TeamIDs in [the credential metadata]({{< ref "/product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model#default-attributes" >}}).
- Added warning regarding potential PII exposure to the [custom attributes menu]({{< ref "/product-stack/tyk-enterprise-developer-portal/portal-customisation/customise-user-model#default-attributes" >}}).
- Changed the behavior of the portal for 404 errors. Now whenever a user requests non-existing page both private (e.i. requiring sign-in to access) or public, the portal now always renders the `not_found.tmpl` template.
- Changed the behavior of the `Secure` cookie attribute that is set by [PORTAL_SESSION_SECURE]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_session_secure" >}}) so that the `Secure` attribute is always add to the `Set-Cookie` header whenever `PORTAL_SESSION_SECURE` is set to `true` or when TLS is enabled.
- Changed the behavior of removing a developer profile within the developers UI in the admin app. Now, when an admin tries to remove a developer profile and some of their credentials have been removed from the credentials provider, or if the provider itself is down or unreachable, the portal asks the admin if they still want to remove the developer profile by displaying a modal window.
- Extended the `DELETE /users/:id` API endpoint by adding the [?force]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) query parameter to force removal of a user even if some of their credentials have been removed from the credentials provider, or if the provider itself is down or unreachable.
- Extended the `GET /pages/:id/content-blocks/:id:` API endpoint by adding additional fields in the response body: `Content`, `MarkdownContent`, `MarkdownEnabled`, `Name`, and `PageID`.
- Extended [filesize limit]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-1-create-a-new-theme" >}}) for individual files in themes to 5 MB.
- Made the organization invite email's subject configurable via [the emails settings section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization#list-of-email-notifications" >}}).

##### Fixed
- Fixed the bug where it was impossible to create an ordered list in the rich text editor in the admin app due to CSS issues.
- Fixed the bug where it was possible to copy the 'portal-session' cookie and use it with different IP address or browser.
- Fixed the bug where the audit log didn't reflect some actions initiated by admin users and developers.
- Fixed the bug where sensitive data such as hashed API tokens and passwords were exposed in the audit log.
- Fixed the bug where menu items were still persistent after deletion.
- Fixed the bug where admin users couldn't edit custom attributes created after a user profile is created.
- Fixed the bug where the UI errors when uploading theme were not consistent with the API error messages.
- Fixed the bug where scroll appeared in the API description box in the API Product page when the API description was longer than 50 symbols.

### 1.8.3 Release Notes

#### Release Date 22 Jan 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


#### Release Highlights
The 1.8.3 release addresses ten high-priority bugs and introduces new admin APIs for managing tags and OAuth2.0 client types attached to API Products.

#### Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.3/images/sha256-3693065546348105a693a1ed5402c93bfecd480c900e1efea4a6dea674263df3?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.3)

#### Changelog
##### Added
- Added [new admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing tags attached to API Products.
- Added [new admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing OAuth2.0 client types attached to API Products.

##### Fixed
- Fixed the bug where the search bar in the My Apps section of the Developer dashboard didn't search for an application.
- Fixed the bug where it was possible to update read-only details of an API Product via an API call.
- Fixed the bug where deleting an access request credentials also deleted the access request.
- Fixed the bug where the button to save a link when editing a hyperlink in the admin UI in the text editor wasn't displayed.
- Fixed the bug where the Exports function didn't export analytics to a CSV file under the Error rate(average) tab in the developer Dashboard.
- Fixed the bug where the portal did not accept themes with names containing dots and displayed a not found error when uploading a theme with a dot in its name.
- Fixed the bug in a multi-pod deployment where, when a theme is uploaded, only the pod that uploaded it updates its theme list, while the other pods remain unaware of the new theme.
- Fixed the bug where the Portal allowed pages to be created with duplicate content block names. Subsequently, only the last content block with the duplicate name was displayed.
- Fixed the bug where the portal's page renderer ignored content-blocks under the `if` statement with references to multiple content-blocks (e.g. `{{ if and .blocks.Block1.Content .blocks.Block2.Content .blocks.Block3.Content }}`). Subsequently, content that depended on these conditional blocks would not be rendered.
- Fixed the bug where the product auth type is removed after a product is updated.

### 1.8.2 Release Notes

#### Release Date 22 Dec 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


#### Release Highlights
The 1.8.2 release addresses multiple high-priority bugs:
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.
- Fixed the bug where an API Consumer could bypass the access request rate limit by creating additional applications.
- Fixed the bug where the page rendering fails if the page refers to a template that has no template/layout pair definition in the theme manifest.
- Fixed the bug where creating new content blocks in non-default themes led to duplication of those content blocks in the admin UI.
- Fixed the bug where `.Markdown` content blocks where not shown.

#### Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.2/images/sha256-944b6fd5bead39b77cbfa50706098d52ce4c003b483b1f5e20456c65ede40fb2?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.2)

#### Changelog

##### Fixed
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.
- Fixed the bug where an API Consumer could bypass the access request rate limit by creating additional applications.
- Fixed the bug where the page rendering fails if the page refers to a template that has no template/layout pair definition in the theme manifest.
- Fixed the bug where creating new content blocks in non-default themes led to duplication of those content blocks in the admin UI.
- Fixed the bug where `.Markdown` content blocks where not shown.

### 1.8.1 Release Notes

#### Release Date 5 Dec 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.0 or an older version we advise you to upgrade ASAP directly to this release.
Unlike 1.8.0, 1.8.1 fixes the broken backward compatability for the default visual theme. Therefore, the upgrade path from earlier versions are straightforward. It is enough to just pull the latest version of the portal's container.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


#### Release Highlights
The 1.8.1 release addresses multiple high-priority bugs:
- Restored backward compatibility for the default visual theme which was broken in the previous release.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where the collapsible components in the admin application of the portal didn't open.
- Fixed the bug where the client type wasn't a required field when creating OAuth2.0 clients via the DCR flow.
- Fixed the bug where CPU usage unexpectedly increased in Kubernetes without external traffic.
- Fixed the bug where admin users were not able to approve access requests in Kubernetes environment.
- Fixed the bug where the usage analytics didn't show in the Developer Dashboard.
- Upgraded the version of Stoplight to the latest available version in the default theme.

#### Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.1/images/sha256-3b7ef4572cad8f6f5cddfa921514a07b43ba46bacf5eb89b735c45863863f13f?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.1)

#### Changelog

##### Added
- Add a [config option]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_enable_http_profiler" >}}) to expose the Golang profiling information which allows for debugging issues related to resource consumption.

##### Changed
- Upgraded the version of Stoplight to the latest available version in the default theme.

##### Fixed
- Restored backward compatibility for the default visual theme which was broken in the previous release.
- Fixed the bug where CPU usage unexpectedly increased in Kubernetes without external traffic.
- Fixed the bug where admin users were not able to approve access requests in Kubernetes environment.
- Fixed the bug where the usage analytics didn't show in the Developer Dashboard.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where the collapsible components in the admin application of the portal didn't open.
- Fixed the bug where the client type wasn't a required field when creating OAuth2.0 clients via the DCR flow.

### 1.8.0 Release Notes

#### Release Date 24 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.7.0 or an older version we advise you to upgrade ASAP directly to this release.
When upgrading from 1.6.0 or earlier versions, customers may experience problems when starting the portal. One of the possible issues is the following:
- When the portal theme [manifest]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#manifest-file" >}}) has a reference to a template that is not present in the theme then the theme won't be loaded. This check that prevents admin users from uploading themes with potential errors was introduced in version [1.7.0]({{< ref "#content-blocks-validation" >}}).
- At the same time, the default theme in version 1.6.0 of the portal had a reference in the theme manifest to the `portal_home` template that didn't exist in the theme.
- The portal doesn't update the theme automatically because in that case any customer-made changes will be lost. Subsequently, upgrading from 1.6.0 to 1.8.0 may result in the following error when loading the theme:
```yaml
{"level":"info","time":"2023-11-23T12:25:35.646Z","caller":"application/themes.go:121","message":"Failed to initialize theme '/themes/default': loading theme templates code references: getting template portal_home: portal_home.tmpl not found"}
{"level":"info","time":"2023-11-23T12:25:35.646Z","caller":"application/themes.go:135","message":"0 themes loaded."}
panic: theme 'default' not found
```
- Moreover, when there was a single theme in the portal, it wouldn't start because it didn't recognize the theme as valid.

To overcome the issue, please follow our upgrade instructions for your storage type as outlined in the sections below.

The following instructions explain the easiest way to upgrade the default theme when upgrading from 1.6.0 to 1.8.0.

In order to upgrade the theme, you will need to remove the existing default theme and let the portal unpack the current default theme that is compatible with v1.8.0 release. Therefore, the update is performed in four steps:
1. (Optionally) Save a copy of the current default theme if there are any changes to it that you want to save.
2. Remove the existing default theme that prevents the portal from starting.
3. Start the portal so that it will unpack the compatible theme.
4. (Optionally) Apply changes from the saved theme.

In later releases, we will publish the theme within a public git repository. This way you can apply git-flow when upgrading the theme.

{{< note >}}
**Note**

If your current active theme is not the default theme, downgrade to v1.6.0 and activate the default theme first before implementing the below steps.
{{< /note >}}

###### Upgrade default theme within filesystem storage type
To upgrade the default theme that is stored in a filesystem (fileSystem mounted by localhost or PVC or csi-driver) you will need a shell to access that specific file system. Execute the following steps to upgrade the theme:
1. **Navigate to the theme directory**. Locate the theming directory used for the portal application defined by `Theming.Path` in the portal config file or `PORTAL_THEMING_PATH` environment variable. By default, the theming path is `./themes`. So, it will be placed in the `themes` directory relative to wherever the portal app is run from.
2. *(Optional)* Save a copy of the current default theme if there are changes that you want to keep. 
3. **Remove the default theme**. To remove the existing version of the default theme from a filesystem, navigate to the theme directory and remove the default theme:
```shell
rm -rf ./default
```
4. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again, and it will start with the upgraded default theme.
5. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 2.

###### Upgrade default theme within S3 storage type
To upgrade the default theme that is stored in an S3 bucket you will access to the S3 console with read-write rights. Execute the following steps to upgrade the theme:

1. **Navigate to the S3 bucket that is used to store themes**. This bucket is defined by `S3.Bucket` in the portal config file or `PORTAL_S3_BUCKET` environment variable. The default theme should be present in the theming directory that is defined by `Theming.Path` in the portal config or `PORTAL_THEMING_PATH` environment variable. By default, the theming path is set to `/themes`.
2. *(Optional)* Save a copy of the current default theme if there are changes that you want to keep. 
3. **Remove the default theme** by deleting the default directory from the theming directory.
4. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again and it will start with the upgraded default theme.
5. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 2.

###### Upgrade default theme within DB storage type
To upgrade the default theme that is stored in a database bucket (the `db` storage type) you should be able to run SQL commands on the database that the portal is using. Execute the following steps to upgrade the theme:
1. *(Optional)* If you need to save changes to the existing default theme, downgrade to 1.6.0, start the portal and download the theme either via the UI or the admin APIs.
2. **Remove the default theme**. The portal stores its themes in the `Assets` table. Run the following SQL command to remove the default theme from the database:
```sql
delete from assets where path like "%<theming-path>/default%";
```
Before executing the command be sure to replace the `<theming-path>` with the path defined by `Theming.Path` in the portal config or `PORTAL_THEMING_PATH` environment variable. By default, it is `/themes`, so if you have not explicitly changed this, your command should be as follows:
```sql
delete from assets where path like "%/themes/default%";
```
3. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again and it will start with the upgraded default theme.
4. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 1.

{{< note >}}
**Note**

For PVC, if you are stuck with a crashing issue on a newer portal release (version > v1.7.0) running in k8s with PVC storage that contains an older theme (from version < v1.7.0), roll back to v1.6.0 or start a temporary pod with the same PVC mounted to it. Then delete all the existing themes as stated above and deploy the new release.
{{< /note >}}


#### Release Highlights
##### Custom attributes for the User model and the sign-up form customization
We added the capability to add additional data fields to the User model and set their behavior. This way API Providers can:
Extend the User model with additional fields of one of four types:
  - String
  - Number
  - List of strings
  - Boolean
- Configure the behavior of these fields:
  - Add the new data fields to the user sign-up form
  - Force the portal to add the fields to the key metadata to make them available to custom plugins during API calls
  - Make the fields required or optional and lock them once a user profile is created
- Set visibility and access rights for the custom data fields:
  - Determine if developers can view the fields or are they restricted to only admin users?
  - Can developers edit the fields?

All settings are available via the [admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api.md" >}}) and the UI.

To create a custom attribute, define it in the custom attributes menu:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-create-custom-attribute.png" width=500px alt="Create a custom attribute for the User model">}}

This is how it looks like in the user sign-up form:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-sign-up-form.png" width=500px alt="The user sign-up form with the custom attribute">}}

##### CORS settings
In this release, we introduced the config options to set up CORS settings such as:
- Allowed origins
- Allowed headers
- Allowed methods
- Are credentials (cookie or client-side certificates) allowed?
- max-age of the preflight request cache

These settings are useful when the portal sits behind a proxy or a CDN and the portal admin needs to configure the CORS settings on the portal side so that the incoming call from a third-party origin (e.g. a CDN or a proxy) are not rejected by the browser.
To set the CORS configuration please refer to the Portal's [configuration documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#cors-settings" >}}).

##### Connection testing to OAuth2.0 Identity providers
We enhanced our OAuth2.0 support by adding the capability to test connections to OAuth2.0 Identity providers (IdPs) when setting up OAuth2.0 with the Tyk Enterprise Developer Portal.
This way, you can make sure the Portal has connectivity with the IdP before saving the OAuth2.0 settings and creating the first OAuth2.0 client.

{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-test-idp-connectivity.png" width=500px alt="Test connectivity to an IdP">}}

##### Verbose logs for the DCR flow
In addition to the new connection testing functionality, we added one more tool to help customers resolve complex integration issues when integrating with OAuth2.0 providers.
Now when the [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) environment variable is set to `true`, the portal will output not only the status and status code of the request to the IdP, but also actual payload returned by the IdP: 
```yaml
{"level":"error","time":"2023-10-10T17:02:27.484+0200","caller":"client/dcr-helpers.go:152","message":"IdPResponse: {\"error\":\"insufficient_scope\",\"error_description\":\"Policy 'Allowed Client Scopes' rejected request to client-registration service. Details: Not permitted to use specified clientScope\"}
```

#### Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.0/images/sha256-d93fcfbbcc4a72d3f6abf49ce65f234e6e65915a43cca3a30d5376e5fab2d644?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.0)

#### Changelog

##### Added
- Added the custom attributes to the User model so that the portal admins can extend the data stored in the user profile and customize the user sign-up form.
- Added the capability to test the connection to OAuth2.0 Identity providers menu to help the portal admin troubleshoot connectivity issues when configuring OAuth2.0 with the portal.
- Added the config options for configuring the CORS settings.

##### Changed
- Display an actual item title instead of a generic iterative name in the Pages and the Providers UI (e.g. "HeaderButtonLabel" instead of "ContentBlock 1" in the Pages menu).
- When [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) is enabled the portal now returns not only the status and status code of the request to the IdP but also actual payload returned by the IdP

##### Fixed
- Fixed the bug where the database credentials were printed in the logs when bootstrapping the portal.
- Fixed the bug where the session cookie was disclosing the username and role.
- Fixed the bug where the [Forgot Password page]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/reset-password.md#introduction" >}}) did not reflect the current theme.
- Fixed the bug where the DCR flow failed to create a client with policies managed by Tyk Operator.
- Fixed the bug where an admin user couldn't upload a new theme file in Kubernetes environment.
- Fixed the bug where the portal application went down after running for several hours in Kubernetes environment.
- Fixed the bug where it was possible to remove the default organization which resulted in the portal being non-operational.
- Fixed the bug where the portal panicked when an IdP was not available while creating a new OAuth2.0 client.
- Fixed the bug where a developer could access API Products regardless of the access rights set by catalogs.
- Fixed the bug where it wasn't possible to change a team for a user.
- Fixed the bug where the error wasn't displayed to an admin user when the theme validation failed while uploading a theme package.
- Fixed the bug where the rich text editor added extra `<p>` tags to the text.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where it wasn't possible to remove an API from an API Product.


## 1.7 Release Notes
### 1.7.0 Release Notes

#### Release Date 6 Oct 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.6.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
##### Content blocks validation
We added validation to the content pages. Now when an admin user tries to delete a content block that is necessary to render the page, the portal won’t let them to save the page.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-content-block-validation.png" width=500px alt="Content-block validation">}}

##### Audit log capability 
We added capability to enable audit log for any action that changes state of the portal or queries data from the portal. When the audit log is enabled, every action of admin users or developers performed via the UI or an API (only for admin users) will be noted in the audit log. 
To enable the audit log, just specify path to the audit log file and enable it.

To configure the audit log with environment variables, use PORTAL_AUDIT_LOG_ENABLE to enable the audit log and PORTAL_AUDIT_LOG_PATH to specify path to the audit log file:
```shell
PORTAL_AUDIT_LOG_ENABLE=true
PORTAL_AUDIT_LOG_PATH=./audit.log
```

To configure the audit log with the config file, use AuditLog.Enable to enable the audit log and AuditLog.Path to specify path to the audit log file:
```json
  "AuditLog": {
    "Enable": true,
    "Path": "./audit"
  }
```

When specifying path ot the audit file make sure it's mapped to a file on the host machine.

##### Capability to limit frequency of access requests
Now admin users can specify how often developers can request access to a specific plan. This way the admins can prevent developers from creating too many keys and abusing their free plan.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.7.0-rate-limit-for-access-requests.png" width=500px alt="Access requests frequency limit">}}

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.7.0/images/sha256-1204c9f2d53ac8cbf7230f7c73bd2edb117b33ec11547d595c58264301c9172b?context=explore)

#### Changelog

##### Added
- Added content blocks validation for content pages to avoid changes to content pages that result in page render errors.
- Added the audit log capability to track any action that changes state of the portal or queries data from the portal.
- Added the capability to limit frequency of access requests to block any abuse of free plans. 

##### Changed
- Disable autocomplete for passwords in the default theme to prevent the access credentials from being stored on the local computer. The stored credentials can be captured by an attacker who gains control over the user's computer.

##### Fixed
- Fixed the bug where developers could get access to applications of other developers if they know the app ID.
- Fixed the bug where developers and apps of an organization were not deleted when the organization was deleted.
- Fixed the bug where it was possible to remove the default organization with resulted in the portal being non-operational.

## 1.6 Release Notes
### 1.6.0 Release Notes

#### Release Date 5 Sep 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.5.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
##### OAuth2.0 flow now supports multiple identity providers
Now the Tyk Enterprise Developer portal can use multiple identity providers (IdPs) for OAuth2.0 via the Dynamic Client Registration flow. If your company has multiple OAuth2.0 providers now you can utilize them all for OAuth2.0 authentication. For instance, if your company uses different IdPs for different products (e.g. one for the U.S. and another for the EU) you can now achieve that with Tyk.

Just create multiple IdPs in the App registration menu:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-multiple-idps-index.png" width=500px alt="OAuth2.0 providers page">}}

And then use them to enable OAuth2.0 authentication for API Products:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-multiple-idps-edit.png" width=500px alt="OAuth2.0 provider overview">}}

##### New Admin API for all content-blocks 
You can download all CMS content with just one API call with the brand new API endpoint *GET* */pages/all/content-blocks* that returns all content blocks for all pages. Now migration between environments and deployment is much easier.

##### Support for Mutual TLS
For customers who need extra security for their APIs such financial institutions and payment providers we introduced an ability for the portal to surface Mutual TLS APIs. Now you can configure API Key and OAuth2.0 API to support Mutual TLS. Just create an API that supports multiple authentication mechanisms in the Dashboard and publish it to the portal:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-mtl-support-dashboard.png" width=500px alt="Mutual TLS auth API in the Tyk Dashboard">}}

Now your developers can discover and request access to them in the portal:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-mtl-support-published.png" width=500px alt="Mutual TLS auth API Product is published in the portal">}}

{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-mtl-support-checkout.png" width=500px alt="Mutual TLS auth API Product in the checkout flow">}}

##### Display-only support for API Products with custom authentication
This new capability allows you to display on the portal the APIs that use your own custom authentication mechanisms. We appreciate that many customer use their own auth mechanisms and even though at the moment we cannot create credentials for custom authentication schemas, we still want to support customers using these.

To display API Products that support custom authentication, you need simply to create an API Product that include APIs with custom authentication and synchronize it to the portal:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-display-custom-auth-apis.png" width=500px alt="Custom auth API Product is published in the portal">}}

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.6.0/images/sha256-5a7ada35df1817f9b44c5f725c77cd8548a4e094505ba0f0d4ed611f85edad7f?context=explore)

#### Changelog

##### Added
- Added support for multiple IdPs of the OAuth2.0 flow. If a customer has multiple OAuth2.0 providers now they can utilize them all for OAuth2.0 authentication with Tyk.
- Added new admins APIs for querying all content-blocks to improve data migration capabilities of the portal. 
- Added support for API Products that use Mutual TLS. Now API Providers can surface their API Products that use Mutual TLS authentication on the portal and developer can request access to them.
- Added display-only support for API Products with custom authentication. This allows API Providers to expose on the portal their APIs that use custom authentication for documentation purposes. 

##### Changed
- Simplified the connection settings to the portal assets storage (where all images, themes, and other CMS files are stored) to help our customers get up to speed quicker. We are well aware that installing and configuring on-premise software can be tricky, especially when it comes to infrastructure, storage and databases. Hence, we have decided to ease this burden for you:
  - By default, the portal uses the `db` [storage type]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_storage" >}}) for storing its themes and other CMS assets and it doesn’t require any additional configuration. This means, you can start the portal right away without specifying any additional setting for the assets storage.
  - We also simplified setting up S3 storage: now you need only to configure connection settings to the bucket and the portal will handle the rest.


##### Fixed
- In 1.6.0 multiple important security bugs are fixed:
  - Added the ability to disable the theme upload capability. Since we don’t validate the theme content it might have viruses and other malicious software. So, to provide super secure environments, we added a setting to disable the theme upload via the UI and API:
    {{< img src="/img/dashboard/portal-management/enterprise-portal/1.6.0-theme-upload-is-disabled.png" width=500px alt="Mutual TLS auth API Product in the checkout flow">}}
  - Fixed the bug where the session is not invalidated after a user logs out.
  - Fixed the role permission issue where a provider-admin can deactivate and delete a super-admin.
  - Fixed the Users API resource which allowed any value to be entered into the Provider and Role fields.
- In addition to the security fixes, several bugs related to the theme management are fixed:
  - The list of available templates is now automatically updated when a new theme is loaded.
 - Fixed the bug where theme unpacking required unnecessary write permission to the */tmp* folder.
  - Fixed icon alignment in the UI on the main page of the default theme.

## 1.5 Release Notes
### 1.5.0 Release Notes

#### Release Date 17 Jul 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.4.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
##### Improved API Providers page
Now the API Provider page has the Status and Last synced columns that help to digest the current status of an API Provider (Up, Down, or Unknown) and the last time it was synchronized. Now it’s much easier to digest the current status of API Providers connected to the portal.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-provider-page.png" alt="Improved provider page">}}

##### Add the SSL insecure skip verify flag for API Providers
With this new option, Tyk Enterprise Developer portal can be configured to use untrusted certificates when connecting the Tyk Dashboard which helps run local PoCs, quickly and easily.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-skip-ssl-verify.png" alt="SSL skip verify">}}

##### New admin APIs
In 1.5.0 we introduced the following APIs:
- CRUD API for Get started guides.
- CRUD API for OpenAPI Spec for APIs included in API products.
- CRUD API for API Providers.

##### Better OAuth2.0 flow without the scope to policy mapping
{{< note >}}
This feature requires a patch to the gateway. In the 1.3.0 version of the portal, it's disabled. Once the 5.2 version of the gateway is released, we can confirm that the feature is fully functional. Stay tuned for updates!
{{< /note >}}
The improved OAuth2.0 allows API Providers to configure OAuth2.0 with scope to policy mapping and default No-Operation policies reducing the number of steps configure OAuth2.0 product in the Dashboard in the IdP by 17 steps from 19 to just 2 actions.

It also allows adding access to API Products to existing credentials. This way, if an API Consumer wants to add a new API Product to an existing credential, they can simply do it without the need to recreate them from scratch.

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.5.0/images/sha256-169ba9584bc31add666cebb1b9231a47f5d9f78ccb086adf7d0ff8810c611a67?context=explore)

#### Changelog
##### Added
- Added the Status and Last synced columns to the API Provider page to make easier to digest status of each API Provider.
- Added the Skip SSL Verify flag for the API Providers. It's now possible to use self-signed certificates for PoCs.
- Added new admin APIs for the Get started guides, Open API Specifications and API Providers to enable migration of configurations between different environments of the portal. 
- Added improved OAuth2.0 flow without the scope to policy mapping which makes it much easier to configure OAuth2.0 with Tyk.
- Enable API Providers to set security response headers in the portal config to make API Providers flexible in configuring their UI security settings.

##### Fixed
- In 1.5.0 multiple important security bugs are fixed:
  - Add secure and httpOnly flags to enhance the security of session cookies.
  - Fixed the bug with the role permission issue when a provider-admin can deactivate and delete a super-admin.
  - Fixed the bug with the Users API resource where it was possible to enter any value in the Provider and Role fields.
- In addition to the security fixes, several bugs related to the theme management are fixed:
  - The list of available templates is now automatically updated when a new theme is loaded.
  - The issue encountered with theme unpacking requiring write permission to the /tmp folder is now resolved. Write permission is no longer required.
  - Fixed the icon issue alignment on the main page of the default theme.

## 1.4 Release Notes
### 1.4.0 Release Notes

#### Release Date 2 June 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.3.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
##### SQL support for the portal’s assets
Until recently, SQL storage was not supported for the portal’s assets: OAS files, themes, images, etc. Therefore, customers had to use at least two types of storage:
- SQL for the portal’s metadata (users, products, access requests, etc).
- Filesystem or S3 for assets (pictures, themes, etc).

This is especially inconvenient in Kubernetes environment when customers had to use persistent volumes.
With this new feature, customers can simply use the same SQL database (MySQL, MariaDB and PostgreSQL) for both assets and metadata. To use the `db` [storage type]({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_storage" >}}) just set the `PORTAL_STORAGE=db` for environment variables or `"Storage": "db"` in a config file and you are good to go!

##### Response status code added to API analytics filters
API Consumers now can filter API analytics by response status codes. This allows them to analyze traffic and error rate for specific response code for their API Products.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.4.0-response-code-filters.png" width="500px" alt="API Analytics UI - Response code filters">}}

##### Displaying Basic Auth APIs
We introduced display-only support for basic APIs. That means API Providers can publish documentation for the basic auth APIs. However, developers cannot use the portal to get access to the basic auth APIs.

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.4.0/images/sha256-11af93300ae91962e9af84ecec0e78b6cf5972521f0655273b48a7e551df3c84?context=explore)

#### Changelog
##### Added
- Added SQL support for the portal's assets to simplify the storage configuration. Now our customers can store all data in one database.
- Added response status code filters in the API analytics for developers to enhance self-service capabilities for developers.
- Added displaying Basic Auth APIs so that API Providers can expose on the portal their APIs that use basic auth for documentation purposes.
- Added input validation for organization name to prevent organization with empty names from being created.

##### Fixed
- Fixed typo in the name of the demo user.
- Rewritten labels for Auth token credentials to remove customers' confusion with opaque names of fields.

#### Security Fixes
- [ZipSlip vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2023-27475) in the theme upload flow is now resolved.
- Added input validation for preventing XSS attacks for catalogs and organizations in the admin app.

## 1.3 Release Notes
### 1.3.0 Release Notes

#### Release Date 17 Apr 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.2.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
##### API Analytics UI for developers
We added the new **API Analytics UI** which extends self-service capabilities for developers. This provides developers with an ability to analyze performance of the APIs which they consume, in addition to traffic composition for their apps. 
The **API Analytics UI** has four tabs that help developers to navigate different analytical views:
- **The overview tab** provides an overarching view on the API Products consumed by a developer. This tab has all information needed to quickly digest the current state of API Products, including: total traffic, number of errors, error breakdown by response code and top APIs by error code.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-overview.png" width="500px" alt="API Analytics UI - Overview tab">}}
- **The Total API Calls** tab enables developers to analyze traffic from their application to the APIs they consume and how it’s changing over time.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-total-calls.png" width="500px" alt="API Analytics UI - Total API Calls tab">}}
- **The Errors** tab provides developers with information relating to total errors and error rates. Here developers can identify any issues with the APIs which they consume without filling any support tickets. Developers can switch between the total number of error and error rates.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-errors.png" width="500px" alt="API Analytics UI - Errors tab">}}
- **The Latency tab** helps developers to analyze response time of the APIs they consume so that they can factor for it in their applications.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-latency.png" width="500px" alt="API Analytics UI - Latency tab">}}

##### Theme management API
The theme management API enables SDLC for the theme management in the portal. Admin users can leverage this API to programmatically:
- Create new themes.
- Update existing themes.
- Select the currently active theme.

##### Enhanced error logging for DCR and SSO flows
We introduced more verbose error logging for the DCR flow and for Single Sign-On to help customers set up the SSO and DCR faster. This is especially important for complex environments with highly customized or non-standard IdPs.

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.3.0/images/sha256-87bc071b93e2fa4970e5ec512a4b0601f139ac9cbb73baf35662d4b5f3a0f290?context=explore)

#### Changelog
##### Added
- Added API Consumer Analytics to digest summary analytics for developers' applications so that developers can analyze performance of the APIs which they consume.
- Added enhanced error logging in all places where the DCR flow is used. A log structure is now provided, including the status code from an IdP to help API Providers to debug DCR integrations.
- Added enhanced error logging to the SSO flow to facilitate setting up SSO.
- Added the Theme management API to enable API Providers to update themes using CI/CD pipelines. 

##### Fixed
- Fixed grammar in the Provider menu UI.
- Fixed broken link to the Access requests menu item in the portal admin dashboard.
- Fixes to the shopping cart flow were made as follows:
  - Fixed the bug where the 'Add to cart' button in the API Product page were not clickable; 
  - Added form validation in the checkout flow.
- Fixed the API Product page to show only catalogs available to a developer.

## 1.2 Release Notes
### 1.2.0 Release Notes

#### Release Date 21 Mar 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.1.0 or an older version we advise you to upgrade ASAP directly to this release.

#### Release Highlights
This release is primarily focused on improved deployment support for Kubernetes and a variety of features to achieve better developer experience.

##### Full Kubernetes support
The Tyk Enterprise Developer Portal is now available in Kubernetes and customer can launch it using our [helm charts]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-helm">}}). This feature makes the portal Kubernetes friendly by adding liveness, readiness probes, graceful shutdown and changing the portal lifecycle so that it’s possible to set an initial user and bootstrap the portal via APIs.

##### SSO for API Consumers and admins
API Providers can [configure Single Sign-on]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso">}}) for the Enterprise developer portal so that it’s possible to login developers and admins to the portal user 3rd party IdP.

##### API Analytics for API Consumers
This capability enables API Providers to get aggregated statistics about consumption of their APIs using Tyk Pump. In 1.2.0, we enabled the portal to attach the following tags to API Keys and oAuth clients:
- Application (app-XXX, where XXX is the app ID); 
- Organization (org-XXX, where XXX is the org ID).

##### Admin API for API Products
This feature provides an API to make it easier for admin users to manage their API Products:
- List available API Products.
- Change the content and description.
- Add link to Open API specification for APIs.

##### Add TLS support
This feature enables API Provides to secure the portal with [HTTPs]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_tls_enable" >}}).

##### Add enhanced logging configuration
This new setting allows API Providers to set the logging [level]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_log_level" >}}) and [format]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_log_format" >}}). This offers API Providers more control over the logging behavior of their APIs.

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.2.0/images/sha256-1dda1c17a9acc5bc51a9650dc22c6116156b8eb302d8cba7f7e2b31dea570d27?context=explore)

#### Changelog

##### Added
- Added Kubernetes support and [helm charts]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-helm" >}}).
- Added [Single Sign-on]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso">}}) for API Consumers and admin users so that they can use their IdPs for managing admin users and developers.
- Added organization and application metadata to auth tokens and OAuth2.0 clients so that API Providers can use Tyk Pump to create aggregated reports based on the metadata from tokens and OAuth2.0 clients.
- Added Admin APIs for API Products to enable API Providers to update API Products using CI/CD pipelines.
- Added [TLS]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_tls_enable" >}}) support for the portal's UI.
- Added config options to set the logging [level]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_log_level" >}}) and [format]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_log_format" >}}). This offers API Providers more control over the logging behavior of their APIs.


##### Fixed
- Fixed grammar in the copy section of the admin application on the Application page.
- Fixes an issue with DCR that was encountered when a developer deletes an app with two DCR products from different catalogs.  In that case, the client was deleted from IdP but the app was not deleted from the Portal.

## 1.1 Release Notes
### 1.1.0 Release Notes

#### Release Date 20 Jan 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
We advise you to upgrade ASAP directly to this release.
 
#### Release Highlights
This release introduce a variety of features to improve developer experience. Additionally, we've included support for the S3 storage type as well as some bug fixes.

##### Organization management for API Consumers
Now API Consumers can [create organizations]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations">}}) and securely share credentials between their teammates. In greater detail:
- API Consumers can request to upgrade their account to an organizational account.
- API Consumers can invite teammates to their organization and manage their roles.
- API Consumers in the same organization share access credentials so that the API Consumer team will still have access to API credentials even if an admin user is on vacation or left the organization.
- API Providers can configure whether they allow API consumers to request an upgrade to their accounts for an organizational account. 
- API Providers can manually accept, reject or configure to accept all such request to accepted by default.
 
##### Get started guides
API Providers can add [Get started guides]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products">}}) to API Products for better developer experiences:
- API Providers can add the **Get started guides** to API Products to speed-up onboarding of API Consumers.
- API Providers can use HTML or Markdown editors for authoring content for API Consumers such as the Get started guides and blog posts.

##### Tags for API Products and blog posts
API Providers can select which blogs posts to display on an API Product page using [the tags feature]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products#step-4-add-tags-to-blogs-and-api-products">}}). To achieve that, an API Provider can specify tags for both API Products and blog posts. Blog posts that match tags with an API Product are displayed in the 'Related blog content' section in the API Product page. This offers API Providers greater control over what blog posts to display on their API Product page.

##### S3 support
We added [S3 support]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_storage">}}) for the portal assets storage (themes, images, OAS files). This update enhances the extensibility of our platform, allowing you to choose different storage solutions to better align with your specific needs.

#### Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.1/images/sha256-a5ef5360f5bea6433a3c6675707470a2e380257804c2cb033305da3b04c28ae7?context=explore)

#### Changelog

##### Added
- Added the [organization management capability]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations">}}) for API Consumers to safely share API access credentials between team members.
- Added the [Get started guides]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products">}}) for API Products so that admins can explain to their consumers how use their API Products.
- Added support for [S3 storage]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_storage">}}) for the portal's assets storage. Now our customers can use `s3` storage in addition to the filesystem which is especially important in Kubernetes environments.
- Added [tags]({{<ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products#step-4-add-tags-to-blogs-and-api-products">}}) for API Products and blog posts so that API Providers have greater control over which blog posts to display on their API Product page.


##### Fixed
- Fixed a bug in the DCR flow where scopes from an API Product were not assigned to the OAuth2.0 client when creating a new OAuth2.0 client.
- Fixed a bug with the bootstrap process to print _JWT_ instead of the portal’s internal auth token when bootstrapping the portal.
- Fixed a bug where plans and products were not removed for Tyk Dashboard instances that were disconnected from the portal instance. Subsequently, after this fix plans and products are only displayed for available Tyk Dashboard instances.



## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
