---
title: "Manage Catalogues"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Managing Access"
weight: 1
---

{{< note success >}}
**This version of our Portal is in Beta**

This documentation is for the new Tyk Enterprise Portal currently in private beta. If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Catalogues are a way for you to tailor the audience for API products and Plans. You can, for example create a Partner Catalogue, with a specific API product tailored to them and a preferential plan not available in your public portal.

In this section, you will learn about how catalogues work and how to create a new catalogue to expose your API products and plans.

## Prerequisites

- Connect to a provider [Tyk Self-Managed]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/with-tyk-self-managed-as-provider.md" >}})
- Create [policies with enforced access right]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/create-api-product-and-plan.md" >}}) (API Product in the Portal)
- Create one or more [policies with enforced rate limit and quota]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/create-api-product-and-plan.md" >}}) (Plan in the Portal)

## Create a new catalogue

1. Navigate to the **Catalogue section** section

{{< img src="/img/dashboard/portal-management/enterprise-portal/catalogue-menu.png" alt="Catalogue menu" >}}

2. Click Create a new catalogue

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-managing-access-create-catalogue.png" alt="Create a new catalogue" >}}

3. Enter Name and Path URL

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-managing-access-add-name.png" alt="Name the new catalogue" >}}

4. Set the access required for the catalogue e.g. Public, Private or Custom
  - Public: External developers can access the catalogue
  - Private: The catalogue is only visible to developers that are logged in
  - Custom: Only selected teams can access this catalogue

5.  [If creating a custom catalogue] Under Audience, select one or multiple teams that you want to have access to this catalogue.

{{< note success >}}
**Note**

For this audience to apply, the visibility needs to be set to custom.

{{< /note >}}

6. Select the catalogue content in terms of which API Products and plans this catalogue should contain.