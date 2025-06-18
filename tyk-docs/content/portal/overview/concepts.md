---
title: "Core Concepts of Developer Portal"
date: 2025-02-10
tags: ["Developer Portal", "Tyk"]
keywords: ["Developer Portal", "Tyk"]
description: "Understand the fundamental concepts behind the Tyk Developer Portal, including APIs, access control, and customisation."
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/enterprise-portal-concepts
  - /concepts/tyk-components/developer-portal
---

This section provides an overview of the most common concepts for the Developer Portal. When starting out with the Developer Portal, we recommend reading this through, ensuring you have a basic understanding of what these terms refer to.

{{< youtube 0xlJDXKrbSw >}}

### API Products

An API product is usually a grouping of API resources which have a value proposition to the API consumer. For example a 'Weather API' might bundle current weather with historical and forecasted weather APIs.

### API Plans

A plan is a way for API providers to create multiple quotas and/or rate limiting options for API consumers. It could be based on price, or commercial agreements with the API consumer.

### Provisioning Request

When an external api-consumer requests access to subscribe to a plan, a provisioning request will be sent to the portal admin, to either approve it or reject it.

### Apps

An app can be viewed as a simple wrapper for one or more sets of access credentials issued to an API-consumer. Multiple requests can be added into one single app. Users can manage those credentials (e.g. rotate keys) from this app section.

### Access Credentials

This is the unified naming for any API Keys, Tokens or Secrets provisioned for a specific app.

### API Consumers

API consumers are all external portal users/developers that are consuming and requesting access to APIs.

This section includes:
- **Users**: Individual external API consumers
- **Teams**: Groups of API consumers
- **Organizations**: Grouping teams of API consumers

Here is a potential set-up

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-org-team-user-example.png" alt="A sample org set-up" >}}

### Catalogs

Catalogs enable the publishing API products and plans based on visibility and access requirements. The catalog can be set to public or private. As an admin you can customize the audience of a private catalog at a team level, allowing you to create completely custom catalogs if needed.

Here’s an example of how you could set up catalogs for the users above:

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-catalogue-sample-set-up.png" alt="A sample catalogue set-up" >}}

### Admin users

The internal users of the admin app.

### Developer Portal

When referring to the Developer Portal, we’re referring to the portal website in which external developers (what we refer to as API-consumers) can browse, view and request access to APIs.

#### Using a policy in Tyk Self-Managed to create your API product

To create an API Product you need to create a policy which enforces only Access rights.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-import-policy-as-product.png" alt="Using policy to create an API Product" >}}


#### Using a policy in Tyk Self-Managed to create your plan

To create an API Product you need to create a policy which enforces only quota and rate limit.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-import-policy-as-product.png" alt="Using policy to create a plan" >}}
