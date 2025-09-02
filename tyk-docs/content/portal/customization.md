---
title: "Developer Portal Customization"
date: 2025-07-26
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "Customization", "Webhook", "Email", "Themes", "Templates", "Pages", "Menus", "Branding", "User Model"]
keywords: ["Developer Portal", "Tyk", "Customization", "Webhook", "Email", "Themes", "Templates", "Pages", "Menus", "Branding", "User Model"]
description: "Customization options for enterprise developer portal"
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/quick-customisation
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts
  - /product-stack/tyk-enterprise-developer-portal/getting-started/customize-products-and-plans
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/customise-enterprise-portal
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Portal Customization Overview

The Tyk Enterprise Developer Portal uses themes for customizing the live portal. We provide an out of the box theme that is using our own branding, it’s called the `default` theme. You are welcome to use it and modify it for your needs, yet if you want to start with a blank page, you can also create a completely new theme.

This section provides a complete guide to full customization from the developer's point of view.

## Workflows for Portal Management

These workflows are designed to help organizations streamline collaboration between developers and content managers in managing the Tyk Developer Portal.

### Developer Workflow

For organizations with developers customizing pages layout and other technical aspects of the portal pages, we are recommending the following workflow.

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-fe-develop-flow.png" alt="Developer workflow" >}}

### Content Manager Workflow

For organizations with content manager(s) managing the developer portal content, we are recommending the following workflow.

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-content-manager-flow.png" alt="Content manager workflow" >}}

The Tyk Developer portal supports the workflow of content managers who're responsible for editing and managing page content.
The purpose of highlighting this flow is to give recommendations on how to organize effective workflows between front end engineers and content managers. Where front end engineers are building page templates and content managers are managing the pages and the content.