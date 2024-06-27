---
title: Tyk Enterprise Developer Portal v1.10.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.10.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.10.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 27 Jun 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn’t introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

## Release Highlights
The 1.10.0 addresses twenty high-priority bugs and vulnerabilities and introduces three new features:
- OAS APIs support.
- Theme cache. 
- Configuration options for database connections.

#### Upgrade instructions
If you are on 1.9.0 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

## Download
- [Docker image v1.10.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.10.0)
  - ```bash
    docker pull tykio/portal:v1.10.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.10.0)

## Changelog
#### Added
- Added OAS APIs support. 
- Added an assets cache for improved performance on database-backed themes. This speeds up the portal's pages loading time by 30%. It's enabled by default and you can disable using [PORTAL_ASSETS_CACHE_DISABLE]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_assets_cache_disable" >}}).
- Added three new configuration options to manage database connections lifecycle: [PORTAL_DATABASE_MAX_OPEN_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_open_connections" >}}), [PORTAL_DATABASE_MAX_IDLE_CONNECTIONS]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_max_idle_connections" >}}), and [PORTAL_DATABASE_CONNECTION_MAX_LIFETIME]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_database_connection_max_lifetime" >}}).

#### Fixed
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

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
