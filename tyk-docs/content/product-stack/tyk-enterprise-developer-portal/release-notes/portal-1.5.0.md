---
title: Tyk Enterprise Developer Portal v1.5.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.5.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.5.0"]
menu:
main:
parent: "Release Notes"
weight: 5
---

**Licensed Protected Product**

##### Release Date 17 Jul 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.4.0 or an older version we advise you to upgrade ASAP directly to this release.

## Release Highlights
#### Improved API Providers page
Now the API Provider page has the Status and Last synced columns that help to digest the current status of an API Provider (Up, Down, or Unknown) and the last time it was synchronized. Now it’s much easier to digest the current status of API Providers connected to the portal.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-provider-page.png" alt="Improved provider page">}}

#### Add the SSL insecure skip verify flag for API Providers
With this new option, Tyk Enterprise Developer portal can be configured to use untrusted certificates when connecting the Tyk Dashboard which helps run local PoCs, quickly and easily.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.5.0-skip-ssl-verify.png" alt="SSL skip verify">}}

#### New admin APIs
In 1.5.0 we introduced the following APIs:
- CRUD API for Get started guides.
- CRUD API for OpenAPI Spec for APIs included in API products.
- CRUD API for API Providers.

#### Better OAuth2.0 flow without the scope to policy mapping
{{< note >}}
This feature requires a patch to the gateway. In the 1.3.0 version of the portal, it's disabled. Once the 5.2 version of the gateway is released, we can confirm that the feature is fully functional. Stay tuned for updates!
{{< /note >}}
The improved OAuth2.0 allows API Providers to configure OAuth2.0 with scope to policy mapping and default No-Operation policies reducing the number of steps configure OAuth2.0 product in the Dashboard in the IdP by 17 steps from 19 to just 2 actions.

It also allows adding access to API Products to existing credentials. This way, if an API Consumer wants to add a new API Product to an existing credential, they can simply do it without the need to recreate them from scratch.

## Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.5.0/images/sha256-169ba9584bc31add666cebb1b9231a47f5d9f78ccb086adf7d0ff8810c611a67?context=explore)

## Changelog
#### Added
- Added the Status and Last synced columns to the API Provider page to make easier to digest status of each API Provider.
- Added the Skip SSL Verify flag for the API Providers. It's now possible to use self-signed certificates for PoCs.
- Added new admin APIs for the Get started guides, Open API Specifications and API Providers to enable migration of configurations between different environments of the portal. 
- Added improved OAuth2.0 flow without the scope to policy mapping which makes it much easier to configure OAuth2.0 with Tyk.
- Enable API Providers to set security response headers in the portal config to make API Providers flexible in configuring their UI security settings.

#### Fixed
- In 1.5.0 multiple important security bugs are fixed:
  - Add secure and httpOnly flags to enhance the security of session cookies.
  - Fixed the bug with the role permission issue when a provider-admin can deactivate and delete a super-admin.
  - Fixed the bug with the Users API resource where it was possible to enter any value in the Provider and Role fields.
- In addition to the security fixes, several bugs related to the theme management are fixed:
  - The list of available templates is now automatically updated when a new theme is loaded.
  - The issue encountered with theme unpacking requiring write permission to the /tmp folder is now resolved. Write permission is no longer required.
  - Fixed the icon issue alignment on the main page of the default theme.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.