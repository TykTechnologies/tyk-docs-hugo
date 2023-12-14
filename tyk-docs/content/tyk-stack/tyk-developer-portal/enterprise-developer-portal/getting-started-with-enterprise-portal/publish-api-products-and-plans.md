---
title: "Publish API Products and Plans"
date: 2022-02-08
tags: [""]
description: ""
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section, you will learn how to publish the API products and plans to the public-facing portal so that API Consumers can access them.

{{< youtube 9CA1iY-VTjo >}}

## Prerequisites

- A Tyk Self-Managed [installation]({{< ref "/content/tyk-self-managed/install.md" >}})
- Tyk Self-Managed [added as a provider]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/with-tyk-self-managed-as-provider" >}})
- [Created and imported API Products and Plans from Tyk]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/create-api-product-and-plan" >}})

## Part 1 - Publish an API product

Follow these steps below how to publish an API Product to a catalogue:

1. From the **API Product** section, Click an API product to open the details.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-publish-product.png" alt="Edit the API Product's metadata" >}}

2. Edit the metadata as needed.

| Field                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Catalogue display name   | This is the name that will be displayed in the external catalogue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Featured API Product | Tick this option if you want the API Product to appear on the homepage under “Featured products”.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Description                      | Short description about what this API Product is.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Content              | This section appears on the API Product overview page, the rich text editor enables you to add more information about the API Product e.g. use cases, features, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Image                   | An image can be added to the API Product. Supported formats are JPG and PNG.                              |
| Organisation ID          | The org id is required in order to connect to Tyk as a provider. It can be found in the user profile within the Tyk Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Catalogues           | Select an existing catalogue that this product  should be available from. |
| App registration configs           | An experimental feature, it works only for oAuth2.0-enabled APIs |
| API resources           | This section lists all APIs available within this product, you can add OAS documentation for each API. |

3. Select a catalogue to publish the API product. If you want to create a custom catalogue.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-select-catalogue-for-api-product.png" alt="Edit the API Product's metadata" >}}

4. Navigate to **Catalogues** to view the available catalogue.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-available-catalogues.png" alt="Edit the API Product's metadata" >}}s

## Part 2 - Publish a plan

In order for developers to be able to request access to an API Product and retrieve credentials, a minimum of one plan needs to be available within the same catalogue as the API Product.

Follow these steps below to knowhow to publish a plan:

1. From the **Plans** section, select a plan to open the details.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-select-a-plan.png" alt="Edit the plan's metadata" >}}


2. Edit the metadata as needed

| Field                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Catalogue display name   | This is the name that will be displayed in the external catalogue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Plan allowance | This section describes what quota and limit is set for this plan. These values can be updated within the ‘policy section’ in the Tyk dashboard.                                                                                                                                                                                                                                                                                      |
| Catalogues                      | Select an existing catalogue that this product  should be available from.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Auto-approve provisioning request              | Under plan settings, you can choose to select this option which means whenever an API-consumer requests access to an API product(s) using this plan, it will be approved automatically.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| JWT Scope                   | An experimental feature, it works only for oAuth2.0 enabled APIs                              |

3. Click **Save changes**. The plan will now be available within selected catalogue(s).