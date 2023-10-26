---
title: Tyk Enterprise Developer Portal v1.3.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.3.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.3.0"]
menu:
main:
parent: "Release Notes"
weight: 3
---

# Release Highlights
## API Analytics UI for developers
We added new **API Analytics UI** for developers which extends self-service capabilities for developers with an ability to analyze performance of the APIs which they consume as we well as traffic composition for their apps. 
The **API Analytics UI** has four tabs that help developers to navigate between different analytical views available for them:
- **The overview tab** provides overarching view on the API Products consumed by a developer. This tab has all information that’s need to quickly digest the current state of API Products, including total traffic, number of errors, error breakdown by response code, and top APIs by error code;
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-overview.png" width="500px" alt="API Analytics UI - Overview tab">}}
- **The Total API Calls tab** enables developers to analyze traffic from their application to the APIs they consume and how it’s changing over time;
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-total-calls.png" width="500px" alt="API Analytics UI - Total API Calls tab">}}
- **The Errors tab** makes the information about total errors and error rate available for developers. Here developers can identify any issue with the APIs which they consume without filling any support tickets. Developers can switch between the total number of error and error rate;
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-errors.png" width="500px" alt="API Analytics UI - Errors tab">}}
- **The Latency tab** helps developers to analyze response time of the APIs they consume so that they can factor for it in their applications.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.3.0-analytics-for-api-consumers-latency.png" width="500px" alt="API Analytics UI - Latency tab">}}

## Theme management API
The theme management API enables SDLC for the theme management in the portal. Admin users can leverage this API to programmatically:
- Create new themes;
- Update existing themes;
- Select the currently active theme.

## Better error logging for the DCR and SSO flows
We introduced more verbose error logging for the DCR flow and for Single Sign-On to help customers set up the SSO and DCR faster. This is especially important for complex environments with highly customized or non-standard IdPs.



# Changelog
## Added
- Added API Consumer Analytics to digest summary analytics for developers' applications so that developers can analyze performance of the APIs which they consume.
- Added better error logging in all places where the DCR flow is used and provides a log structure including status code from an IdP to help API Providers to debug DCR integrations.
- Added better error logging to the SSO flow which makes setting up SSO much easier task.
- Added the Theme management API to enable API Providers to update themes using CI/CD pipelines. 

## Fixed
- Fixed grammar in the Provider menu Ui.
- Fixed the link to the Access requests menu item in the portal admin dashboard.
- Fixes to the shopping cart flow:
  - Fixes the 'Add to cart' button in the API Product page; 
  - Add form validation in the checkout flow;
- Fixes the API Product page to show only catalogues available to a developer.