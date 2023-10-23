---
title: Tyk Enterprise Developer Portal v1.5.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.5.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.5.0"]
menu:
main:
parent: "Release Notes"
weight: 5
---

# Release Highlights
## Improved API Providers page
Now the API Provider page has the Status and Last synced columns that help to digest the current status of an API Provider (Up, Down, or Unknown) and the last time it was synchronized. Now it’s much easier to digest the current status of API Providers connected to the portal.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-provider-page.png" alt="Improved provider page">}}

## Add the SSL insecure skip verify flag for API Providers
With this new option, Tyk Enterprise Developer portal can be configured to use untrusted certificates when connecting the Tyk Dashboard which helps a lot to run local quick and easy PoC.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-skip-ssl-verify.png" alt="SSL skip verify">}}

## New admin APIs
In 1.5.0 we introduced the following APIs:
- CRUD API for Get started guides.
- CRUD API for OpenAPI Spec for APIs included in API products.
- CRUD API for API Providers.

## Better oAuth2.0 flow without the scope to policy mapping
{{< note >}}
This feature requires a patch to the gateway. In the 1.3.0 version of the portal, it's disabled. Once the 5.2 version of the gateway is released, we can confirm that the feature is fully functional. Stay tuned for updates!
{{< /note >}}
The improved oAuth2.0 allows API Providers to configure oAuth2.0 with scope to policy mapping and default No-Operation policies reducing the number of steps configure oAuth2.0 product in the Dashboard in the IdP by 17 steps from 19 to just 2 actions.

It also allows adding access API Products to existing credentials. This way, if an API Consumer wants to add a new API Product to an existing credential, they can simply do it without the need to recreate them from scratch.

# Changelog
## Added
- Improved the API Provider page.
- Added the Skip SSL Verify flag for the API Providers.
- Added new admins APIs. 
- Added improved oAuth2.0 flow without the scope to policy mapping.

## Fixed
- In 1.5.0 multiple important security bugs are fixed:
  - Add secure and httpOnly flags to session cookie.
  - Enable API Providers to set security response headers in the portal config.
  - Fixed the role permission issue when a provider-admin can deactivate and delete a super-admin.
  - We also fixed the Users API resource which allowed to enter any value into the Provider and Role fields.
- In addition to the security fixes, several bugs related to the theme management are fixed:
  - The list of available templates is now automatically updated when a new theme is loaded.
  - Issue when theme unpacking required write permission to the /tmp folder is now resolved.
  - Icon issue alignment on the main page of the default theme is now fixed.

