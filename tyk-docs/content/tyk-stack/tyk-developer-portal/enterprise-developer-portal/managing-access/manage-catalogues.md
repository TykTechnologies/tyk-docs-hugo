---
title: "Manage Catalogs"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Managing Access"
weight: 1
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Catalogs are a way for you to tailor the audience for API products and Plans. You can, for example create a Partner Catalog, with a specific API product tailored to them and a preferential plan not available in your public portal.

In this section, you will learn about how catalogs work and how to create a new catalog to expose your API products and plans.

## Prerequisites

- Connect to a provider [Tyk Self-Managed]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/with-tyk-self-managed-as-provider" >}})
- Create [policies with enforced access rights]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/create-api-product-and-plan" >}}) (API Product in the Portal)
- Create one or more [policies with enforced rate limit and quotas]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/create-api-product-and-plan.md" >}}) (Plan in the Portal)

## Create a new catalog

1. Navigate to the **Catalog section** section

{{< img src="/img/dashboard/portal-management/enterprise-portal/catalogue-menu.png" alt="Catalogue menu" >}}

2. Click Create a new catalog

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-managing-access-create-catalogue.png" alt="Create a new catalogue" >}}

3. Enter Name and Path URL

{{< img src="/img/dashboard/portal-management/enterprise-portal/portal-managing-access-add-name.png" alt="Name the new catalogue" >}}

4. Set the access required for the catalog e.g. Public, Private or Custom
  - Public: External developers can access the catalog
  - Private: The catalog is only visible to developers that are logged in
  - Custom: Only selected teams can access this catalog

5.  [If creating a custom catalog] Under Audience, select one or multiple teams that you want to have access to this catalog.

{{< note success >}}
**Note**

For this audience to apply, the visibility needs to be set to custom.

{{< /note >}}

6. Select the catalog content in terms of which API Products and plans this catalog should contain.