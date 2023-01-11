---
title: "Tyk Enterprise Portal Concepts"
date: 2022-02-07
tags: ["Tyk Developer Portal","Enterprise Portal",]
description: ""
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 1

---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

This page provides an overview of the most common concepts for the Developer Portal. When starting out with the Developer Portal, we recommend reading this through, ensuring you have a basic understanding of what these terms refer to.

{{< youtube 0xlJDXKrbSw >}}

### What is our Developer Portal? Where does it fit?


Tyk Developer Portal enables multiple instances of Tyk Manager, also referred to as a ‘Provider’ because we will soon include other API Managers and Gateways! Each provider provides a list of Policies, APIs and Keys.
In turn, when the API consumer makes a request and it is approved, the Portal issues a provisioning request to the relevant control plane to issue a key.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-diagram-api-providers.png" alt="Developer portal and Tyk Manager relationship" >}}


### Developer Portal

When referring to the Developer Portal, we’re referring to the portal website in which external developers (what we refer to as API-consumers) can browse, view and request access to APIs.

#### Using a policy in Tyk Self-Managed to create your API product

To create an API Product you need to create a policy which enforces only Access rights.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-import-policy-as-product.png" alt="Using policy to create an API Product" >}}


#### Using a policy in Tyk Self-Managed to create your plan

To create an API Product you need to create a policy which enforces only quota and rate limit.

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-import-policy-as-product.png" alt="Using policy to create a plan" >}}

### API products

An API product is usually a grouping of API resources which have a value proposition to the API consumer. For example a 'Weather API' might bundle current weather with historical and forecasted weather APIs.

### API plans

A plan is a way for API providers to create multiple quotas and/or rate limiting options for API consumers. It could be based on price, or commercial agreements with the API consumer.

### Provisioning request

When an external api-consumer requests access to subscribe to a plan, a provisioning request will be sent to the portal admin, to either approve it or reject it.

### Apps

An app can be viewed as a simple wrapper for one or more sets of access credentials issued to an API-consumer. Multiple requests can be added into one single app. Users can manage those credentials (e.g. rotate keys) from this app section.

### Access credentials

This is the unified naming for any API Keys, Tokens or Secrets provisioned for a specific app.

### API consumers

API consumers are all external portal users/developers that are consuming and requesting access to APIs.

This section includes:
- **Users**: Individual external API consumers
- **Teams**: Groups of API consumers
- **Organisations**: Grouping teams of API consumers

Here is a potential set-up

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-org-team-user-example.png" alt="A sample org set-up" >}}

### Catalogues

Catalogues enable the publishing API products and plans based on visibility and access requirements. The catalogue can be set to public or private. As an admin you can customise the audience of a private catalogue at a team level, allowing you to create completely custom catalogues if needed.

Here’s an example of how you could set up catalogues for the users above:

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-catalogue-sample-set-up.png" alt="A sample catalogue set-up" >}}

### Admin users

The internal users of the admin app.
