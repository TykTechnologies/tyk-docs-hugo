---
title: Tyk Enterprise Developer Portal v1.3.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.3.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.3.0"]
menu:
main:
parent: "Release Notes"
weight: 3
---

**Licensed Protected Product**

##### Release Date 17 Apr 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.2.0 or an older version we advise you to upgrade ASAP directly to this release.

## Release Highlights
#### API Analytics UI for developers
We added the new **API Analytics UI** which extends self-service capabilities for developers. This provides developers with an ability to analyze performance of the APIs which they consume, in addition to traffic composition for their apps. 
The **API Analytics UI** has four tabs that help developers to navigate different analytical views:
- **The overview tab** provides an overarching view on the API Products consumed by a developer. This tab has all information needed to quickly digest the current state of API Products, including: total traffic, number of errors, error breakdown by response code and top APIs by error code.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-overview.png" width="500px" alt="API Analytics UI - Overview tab">}}
- **The Total API Calls** tab enables developers to analyze traffic from their application to the APIs they consume and how it’s changing over time.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-total-calls.png" width="500px" alt="API Analytics UI - Total API Calls tab">}}
- **The Errors** tab provides developers with information relating to total errors and error rates. Here developers can identify any issues with the APIs which they consume without filling any support tickets. Developers can switch between the total number of error and error rates.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-errors.png" width="500px" alt="API Analytics UI - Errors tab">}}
- **The Latency tab** helps developers to analyze response time of the APIs they consume so that they can factor for it in their applications.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-latency.png" width="500px" alt="API Analytics UI - Latency tab">}}

#### Theme management API
The theme management API enables SDLC for the theme management in the portal. Admin users can leverage this API to programmatically:
- Create new themes.
- Update existing themes.
- Select the currently active theme.

#### Enhanced error logging for DCR and SSO flows
We introduced more verbose error logging for the DCR flow and for Single Sign-On to help customers set up the SSO and DCR faster. This is especially important for complex environments with highly customised or non-standard IdPs.

## Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.3.0/images/sha256-87bc071b93e2fa4970e5ec512a4b0601f139ac9cbb73baf35662d4b5f3a0f290?context=explore)

## Changelog
#### Added
- Added API Consumer Analytics to digest summary analytics for developers' applications so that developers can analyze performance of the APIs which they consume.
- Added enhanced error logging in all places where the DCR flow is used. A log structure is now provided, including the status code from an IdP to help API Providers to debug DCR integrations.
- Added enhanced error logging to the SSO flow to facilitate setting up SSO.
- Added the Theme management API to enable API Providers to update themes using CI/CD pipelines. 

#### Fixed
- Fixed grammar in the Provider menu UI.
- Fixed broken link to the Access requests menu item in the portal admin dashboard.
- Fixes to the shopping cart flow were made as follows:
  - Fixed the bug where the 'Add to cart' button in the API Product page were not clickable; 
  - Added form validation in the checkout flow.
- Fixed the API Product page to show only catalogs available to a developer.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.