---
title: "Introduction to Tyk Developer Portal"
date: 2025-02-10
tags: ["Developer Portal", "Tyk"]
keywords: ["Developer Portal", "Tyk"]
description: "Learn what the Tyk Developer Portal is, its key features, and how it supports API management."
aliases:
---


{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}


## What is Enterprise Developer Portal?

The Tyk Enterprise Developer Portal is the most flexible and straightforward way for API providers to publish, monetize and drive the adoption of APIs. It provides a full-fledged CMS-like system that enables you to serve all stages of API adoption: from customization the look and feel to exposing APIs and enabling third-party developers to register and use your APIs.

The Tyk Enterprise Developer Portal enables you to:

* Completely customize look and feel of the portal.
* Combine multiple APIs into API product and supply them with OpenAPI documentation and tutorials.
* Create multiple organizations and teams to segment your developer audience.
* Create multiple API catalogs to tailor visibility of API products and plans to different audiences.
* Integrate with the most popular Identity providers via Dynamic client registration.
* Fully control the flow of the developer sign-up and enrollment.

{{< youtube UMLkTKMzGXg >}}

## Where does it fit?

Tyk Developer Portal enables multiple instances of Tyk Manager, also referred to as a `Provider` because we will soon include other API Managers and Gateways! Each provider provides a list of Policies, APIs and Keys.
In turn, when the API consumer makes a request and it is approved, the Portal issues a provisioning request to the relevant control plane to issue a key.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-diagram-api-providers.png" alt="Developer portal and Tyk Manager relationship" >}}

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