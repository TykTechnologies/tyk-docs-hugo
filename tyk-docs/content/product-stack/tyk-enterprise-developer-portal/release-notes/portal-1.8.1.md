---
title: Tyk Enterprise Developer Portal v1.8.1
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.1
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.1"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

### Support Lifetime
We strive to avoid any long-term support arrangements for our enterprise portal. We run a regular 6-week release cadence which delivers new capability, extension of existing capability, and bug fixes. Our policy is that we aim to avoid any breaking changes, so in effect, the entire enterprise portal is supported. Here we'd increment our version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

Occasionally, we may see a need to issue a critical fix if there is a system down or a critical security defect. Here we would release this as soon as is physically possible and the semantic versioning would reflect a patch (1.3.1, 1.4.1 etc).

The only exception to this policy is if we ever need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After six months, the previous major version falls out of support.

##### Release Date 5 Dec 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.0 or an older version we advise you to upgrade ASAP directly to this release.
Unlike 1.8.0, 1.8.1 fixes the broken backward compatability for the default visual theme. Therefore, the upgrade path from earlier versions are straightforward. It is enough to just pull the latest version of the portal's container.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


# Release Highlights
The 1.8.1 release addresses multiple high-priority bugs:
- Restored backward compatibility for the default visual theme which was broken in the previous release.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where the collapsible components in the admin application of the portal didn't open.
- Fixed the bug where the client type wasn't a required field when creating OAuth2.0 clients via the DCR flow.
- Fixed the bug where CPU usage unexpectedly increased in Kubernetes without external traffic.
- Fixed the bug where admin users were not able to approve access requests in Kubernetes environment.
- Fixed the bug where the usage analytics didn't show in the Developer Dashboard.
- Upgraded the version of Stoplight to the latest available version in the default theme.

# Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.1/images/sha256-3b7ef4572cad8f6f5cddfa921514a07b43ba46bacf5eb89b735c45863863f13f?context=explore)
- [The default theme package](https://raw.githubusercontent.com/TykTechnologies/portal-themes/main/v1.8.1/default.zip)

# Changelog

## Added
- Add a [config option]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_enable_http_profiler" >}}) to expose the Golang profiling information which allows for debugging issues related to resource consumption.

## Changed
- Upgraded the version of Stoplight to the latest available version in the default theme.

## Fixed
- Restored backward compatibility for the default visual theme which was broken in the previous release.
- Fixed the bug where CPU usage unexpectedly increased in Kubernetes without external traffic.
- Fixed the bug where admin users were not able to approve access requests in Kubernetes environment.
- Fixed the bug where the usage analytics didn't show in the Developer Dashboard.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where the collapsible components in the admin application of the portal didn't open.
- Fixed the bug where the client type wasn't a required field when creating OAuth2.0 clients via the DCR flow.

# Further Information

## Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

## FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
