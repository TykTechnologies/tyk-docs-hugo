---
title: Tyk Enterprise Developer Portal v1.8.3
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.3
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.3"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 22 Jan 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


## Release Highlights
The 1.8.3 release addresses ten high-priority bugs and introduces new admin APIs for managing tags and OAuth2.0 client types attached to API Products.

## Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.3/images/sha256-3693065546348105a693a1ed5402c93bfecd480c900e1efea4a6dea674263df3?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-themes/releases/tag/1.8.3)

## Changelog
#### Added
- Added [new admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing tags attached to API Products.
- Added [new admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing OAuth2.0 client types attached to API Products.

#### Fixed
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

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
