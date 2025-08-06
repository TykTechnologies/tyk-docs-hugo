---
title: "Publish your first API Catalog"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Getting Started"]
keywords: ["Developer Portal", "Tyk", "Getting Started", "API Product", "Plan", "Catalog"]
description: "Build an API Catalog on the Tyk Developer Portal."
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/create-api-product-and-plan
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/publish-api-products-and-plans
  - /product-stack/tyk-enterprise-developer-portal/getting-started/create-orgs-and-catalogs
  - /product-stack/tyk-enterprise-developer-portal/getting-started/create-api-product-and-plan
---

## Introduction

After installing your Developer Portal and configuring your organizational structure, the next step is to create an API catalog with products and plans. This is where you'll package your APIs into consumable products and define how developers can access them.

In this guide, you'll learn how to create a catalog, add API products, and define access plans - the essential components that enable developers to discover and consume your APIs.

### Prerequisites

Before you begin, ensure you have:

- [Installed]({{< ref "portal/install" >}}) the Developer Portal
- [Connected]({{< ref "portal/overview/getting-started#configuring-the-provider" >}}) to a Provider (Tyk Dashboard)
- [Configured]({{< ref "portal/overview/getting-started#create-an-organizational-structure" >}}) at least one Organisation and Team
- [Created]({{< ref "getting-started/configure-first-api#set-up-your-api" >}}) at least one API in Tyk Dashboard that you will make available to your API consumers, for this tutorial we assume this is secured with the [Auth Token]({{< ref "api-management/authentication/bearer-token" >}}) authentication method

## Step 1: Create the API Catalog

[Catalogs]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues" >}}) determine which API products and plans are visible to different developer audiences. You'll need to create a catalog and then later you'll create content to publish to its audience.

1. Log in to the Developer Portal using your API Owner credentials
    - this will take you to the Admin Portal view, Navigate to Catalogs
2. Navigate to **Developer Portal > Catalogues**
  {{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-catalogues.png" alt="Navigate the to catalogues menu" >}}
3. Click **Add new catalogue**
  {{< img src="/img/dashboard/portal-management/enterprise-portal/specify-name-of-catalogue.png" alt="Create a catalogue" >}}
4. Enter the following details:
    - Name: A descriptive name (e.g., "First APIs")
    - Path URL: select **Sync URL with Name** to auto-complete this field
    - Visibility: Choose **Private** from the drop-down to restrict access only to selected audience
    - Audience: Select the team you created [previously]({{< ref "portal/overview/getting-started#step-2-create-a-team-within-the-organisation" >}})
    - Catalogue content: Leave this blank for now, as we don't have any API Products or Plans to publish
5. Click **Save Changes**


## Step 2: Create an API Product

[API Products]({{< ref "portal/api-products" >}}) bundle one or more APIs into a package that delivers value to developers. When you create an API Product in the Developer Portal, a corresponding [access policy]({{< ref "api-management/policies#partitioned-policies" >}}) will be created in the Tyk Dashboard (Provider) that configures the access controls that will be applied to API Consumer access credentials created from the Product.

1. Navigate to **Developer Portal > API Products**
2. Click **Add new API Product**
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-api-product.png" alt="Add an API Product" >}}
3. On the **Details** tab enter the basic product information:
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-details.png" alt="Configure API Product details" >}}
    - Product name: A unique product name (e.g., "Test product") which will be used by the Provider (Tyk Dashboard) when naming the access policy
    - Catalogue display name: (optional) Descriptive name that will be used on the Live Portal
    - Description: (optional) A short summary of the product to engage API consumers
    - Publish API product to catalogue: Select the catalog you created [previously]({{< ref "portal/publish-api-catalog#step-1-create-the-api-catalog" >}})
    - you can leave the other fields empty for now
4. On the **APIs** tab identify which APIs should be accessible via this Product:
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-apis.png" alt="Add APIs" >}}
    - Choose a provider: Select your provider from the dropdown
    - Choose Authentication method: Select the **Authentication Token** option from the dropdown (or the appropriate [authentication method]({{< ref "api-management/client-authentication" >}}) you've used for your API created in Tyk Dashboard)
    - Select APIs: Choose at least one API to include in the Product
5. On the **Documentation** tab optionally upload OpenAPI documentation for the API(s) included in the Product
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-api-specs.png" alt="Add API Specifications" >}}
6. On the **"Getting Started" guides** tab optionally create Product Guides
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-guides.png" alt="Add Product Guides" >}}
7. Click **Save Changes**


## Step 3: Create an API Plan

[Plans]({{< ref "portal/api-plans" >}}) define the terms under which developers can access your API products. When you create an API Plan in the Developer Portal, a corresponding [limits policy]({{< ref "api-management/policies#partitioned-policies" >}}) will be created in the Tyk Dashboard (Provider) that configures quotas and rate limits that will be applied to API Consumer access credentials created from the Plan.

1. Navigate to **Developer Portal > Plans**
2. Click **Add new Plan**
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-plan.png" alt="Add a Plan" >}}
3. Enter the basic plan information:
    - Provider: Select your provider from the dropdown
    - Plan name: A unique plan name (e.g., "Free tier") which will be used by the Provider (Tyk Dashboard) when naming the access policy
    - Catalogue display name: (optional) Descriptive name that will be used on the Live Portal
    - Plan description: (optional) A short summary of the plan that will be displayed in the Live Portal
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-details.png" alt="Add Plan Details" >}}
4. Configure the consumption rules (limits) that will be applied to Developer Apps using the plan:
    - Usage quota: Set a total volume of requests that an App will be permitted to make in a time period, for example 25 requests per hour 
    - Rate limit: Set a maximum frequency of requests that an App will be permitted to make, for example 3 requests per 10 seconds
    - Key expires after: for this tutorial leave this as **Key never expires**
    {{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-limits.png" alt="Add Plan Limits" >}}
5. For this tutorial, select **Auto approve access request**
6. In the **Accessible in the following catalogues** dropdown, select the catalog you created [previously]({{< ref "portal/publish-api-catalog#step-1-create-the-api-catalog" >}})
6. Click **Save Changes**


## Step 4: Verify the Catalog

You can now go back to your Catalog to check that the API Product and Plan have been successfully added, ready for your API Consumers to gain access to your service.

1. Navigate to **Developer Portal > Catalogue**
2. Select the Catalog that you created [previously]({{< ref "portal/publish-api-catalog#step-1-create-the-api-catalog" >}})
3. Find the **Catalogue content** section and confirm that your Product and Plan are listed
4. Click **Cancel** or **Save Changes**


## What's Next?

**Congratulations**

You have successfully created an API Product and a Plan and included them in a private Catalog that will only be available to a selected audience in your Developer Portal. Now you're ready to experience the API Consumer side.

It's time to [create your first Developer App]({{< ref "portal/request-access" >}}).

### Best Practices

- **Start simple**: Begin with one catalog, a few products, and basic plans
- **Use clear naming**: Make product and plan names descriptive and intuitive
- **Provide complete documentation**: Include comprehensive API documentation for each product
- **Test the developer experience**: Go through the subscription process as a developer would
- **Gather feedback**: Ask test users about the clarity and usability of your catalog
