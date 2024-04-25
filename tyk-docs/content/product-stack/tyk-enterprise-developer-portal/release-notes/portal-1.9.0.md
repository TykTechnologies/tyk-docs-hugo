---
title: Tyk Enterprise Developer Portal v1.9.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.9.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.9.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 27 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
Currently, there are no planned breaking changes.

#### Deprecations
There are no deprecations in this release.

## Release Highlights
The 1.9.0 release addresses several security vulnerability and bugs and introduces two new capabilities:
- [Webhooks]({{< ref "product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks.md" >}}) for events that happen in the portal.
- [Admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for OAuth2.0 configuration. 

#### Upgrade instructions
If you are on 1.8.5 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.

## Download
- [Docker image v1.9.0](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.9.0)
    - ```bash
    docker pull tykio/portal:v1.9.0
    ```
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.9.0)

## Changelog
#### Added
- Added [the webhooks]({{< ref "product-stack/tyk-enterprise-developer-portal/portal-customisation/configure-webhooks.md" >}}) capability that  enable real-time, automated data updates between the portal and 3rd party applications.
- Added [admin APIs]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) for managing OAuth2.0 configuration. 

#### Fixed
- Fixed the error where the admin APIs returned 500 instead of 422 when an incorrectly formatted json is passed in the request body.
- Fixed the error where missing DCR registration access token caused crash during DCR client revocation.
- Fixed the error where API-created Access Requests were always auto-approved.
- Fixed the following vulnerabilities related to Go 1.19 upgrading Go version:
  - [CVE-2023-45287](https://scout.docker.com/vulnerabilities/id/CVE-2023-45287).
  - [CVE-2023-39325](https://scout.docker.com/vulnerabilities/id/CVE-2023-39325).
  - [CVE-2023-39319](https://scout.docker.com/vulnerabilities/id/CVE-2023-39319).
  - [CVE-2023-39318](https://scout.docker.com/vulnerabilities/id/CVE-2023-39318).
  - [CVE-2023-45284](https://scout.docker.com/vulnerabilities/id/CVE-2023-45284).

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
