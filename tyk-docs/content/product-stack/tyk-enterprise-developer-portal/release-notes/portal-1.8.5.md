---
title: Tyk Enterprise Developer Portal v1.8.5
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.5
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.5", "CVE-2024-3094", "Security"]
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
Currently, there are no planned breaking changes.

#### Deprecations
There are no deprecations in this release.

## Release Highlights
The 1.8.5 release addresses [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) vulnerability that was introduced in the 1.8.4 release.
If you are not on v1.8.4 then there's no urgency in updating.

#### Upgrade instructions
If you are on 1.8.4 you should **upgrade ASAP** directly to this release. This release doesn't introduce any changes to the theme, so a theme upgrade is not required.

If you are on 1.8.3 or older version please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) to upgrade the portal's themes.

## Download
- [Docker image v1.8.5](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.8.5)
  - ```bash
    docker pull tykio/portal:v1.8.5
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.5)

## Changelog

#### Fixed
- Fixed [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) by replacing Debian base image.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
