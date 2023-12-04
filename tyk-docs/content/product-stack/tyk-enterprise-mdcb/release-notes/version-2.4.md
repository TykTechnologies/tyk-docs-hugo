---
title: Tyk MDCB v2.4 Release Notes
description: "Tyk Multi Data-Centre v2.4 release notes. Focusing on compatibility with Tyk API Definitions from Tyk Gateway v5.2 and enables better visualization in Tyk Dashboard"
tags: ["release notes", "MDCB", "Tyk Multi Data-Centre", "Tyk Multi Data-Center", "v2.4", "2.4"]
aliases:
  - /release-notes/mdcb-2.4/
---

Licensed Protected Product

*This page contains all release notes for version 2.4 displayed in reverse chronological order*

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 2.4.1 Release Notes

##### Release date 21 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v2.4.1">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.1/images/sha256-2debf08c95c46a4662a00b2193ee142998826ed7c5e2bb4a4633737c0a4de2e3?context=explore)

#### Changelog {#Changelog-v2.4.1}

##### Changed
- Update for compatibility with API definitions for Tyk v5.2.3

---

## 2.4.0 Release Notes

##### Release Date 14 November 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
MDCB 2.4.0 is an update for compatibility for synchronisation with Tyk v5.2 API Definitions. It also enables gateway information visualisation on Tyk Dashboard v5.2+. Please refer to the [changelog]({{< ref "#Changelog-v2.4.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.0/images/sha256-b5fad5b4c1c8b912999816ab51ff51e62fdd733fc43256187f22e1218b287f26?context=explore)

#### Changelog {#Changelog-v2.4.0}

##### Added
- Track number of connected gateways and gateway info. The connection statistics can be queried from Tyk Dashboard v5.2+. This allow greater visibility for Operation teams on the number of gateways they are using.

##### Updated
- Update for compatibility with API definitions for Tyk v5.1

---

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
