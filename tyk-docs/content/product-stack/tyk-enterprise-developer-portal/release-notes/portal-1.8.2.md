---
title: Tyk Enterprise Developer Portal v1.8.2
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.2
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.2"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 22 Dec 2023

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
The 1.8.2 release addresses multiple high-priority bugs:
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.
- Fixed the bug where an API Consumer could bypass the access request rate limit by creating additional applications.
- Fixed the bug where the page rendering fails if the page refers to a template that has no template/layout pair definition in the theme manifest.
- Fixed the bug where creating new content blocks in non-default themes led to duplication of those content blocks in the admin UI.
- Fixed the bug where `.Markdown` content blocks where not shown.

## Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.2/images/sha256-944b6fd5bead39b77cbfa50706098d52ce4c003b483b1f5e20456c65ede40fb2?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.2)

## Changelog

#### Fixed
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.
- Fixed the bug where an API Consumer could bypass the access request rate limit by creating additional applications.
- Fixed the bug where the page rendering fails if the page refers to a template that has no template/layout pair definition in the theme manifest.
- Fixed the bug where creating new content blocks in non-default themes led to duplication of those content blocks in the admin UI.
- Fixed the bug where `.Markdown` content blocks where not shown.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
