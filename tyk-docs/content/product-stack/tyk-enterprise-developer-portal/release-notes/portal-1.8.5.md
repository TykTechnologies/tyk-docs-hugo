---
title: Tyk Enterprise Developer Portal v1.8.5
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.5
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.5"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 5 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.4 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


## Release Highlights
The 1.8.5 release addresses high-priority vulnerabilities: CVE-2024-3094, CVE-2023-39325, and CVE-2023-45287.

## Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.4/images/sha256-4dd01c11b79f46a06934b0b0ea8d3bbb63835bd31953eccd896481aa4d9cfe56?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.5)

## Changelog
#### Changed
- Upgraded golang version to 1.21 to fix CVE-2023-39325 and CVE-2023-45287.

#### Fixed
- Fixed CVE-2024-3094 by replacing trixie-slim.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
