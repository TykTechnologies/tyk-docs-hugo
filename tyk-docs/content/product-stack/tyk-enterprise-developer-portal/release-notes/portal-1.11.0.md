---
title: Tyk Enterprise Developer Portal v1.11.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.11.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.11.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 25 Sept 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn’t introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

## Release Highlights
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

#### Upgrade instructions
If you are on 1.10.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

## Download
- [Docker image v1.11.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.11.0)
  - ```bash
    docker pull tykio/portal:v1.11.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.11.0)

## Changelog
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
