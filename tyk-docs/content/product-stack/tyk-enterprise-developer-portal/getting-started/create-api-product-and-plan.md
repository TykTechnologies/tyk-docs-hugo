---
title: "Create API Products and Plans"
date: 2022-02-08
tags: ["Tyk Developer Portal","Enterprise Portal","API Products"]
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/create-api-product-and-plan
description: "Create API Products and plans to monetize your APIs"
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction
There are two ways of creating API Products and Plans in the Developer Portal:

1. [Automatically create an API Product or Plan]({{< ref "#import-api-product-and-plan" >}}) in the Developer Portal by importing it from Tyk when synchronising the provider.
2. [Manually create an API Product or Plan]({{< ref "#manually-create-api-product-and-plan" >}}) in the Developer Portal. (Only from version 1.13.0)

### Prerequisites
- A Tyk Self-Managed [installation]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}}).
- Tyk Self-Managed [added as a provider]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/with-tyk-self-managed-as-provider" >}}).
- Have APIs [created in your Tyk installation]({{< ref "getting-started/create-api" >}}).

## Import API Product and Plan

When integrating with Tyk, the Tyk policies will be imported into the Developer Portal. Depending on the configuration that's been set in the policy section, the policy will either be imported as an API Product or a Plan. For further details check the [portal key concepts]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/enterprise-portal-concepts" >}}) document.

### Create and import an API Product from Tyk

{{< youtube rIGnIQ235As >}}

API Products are partitioned policies that provide an ACL but not quota/rate limits.
The following steps explain how to create and import an API product from Tyk, assuming you have one or more APIs already created:

1. From your Tyk Self-Managed installation, go to **Policies** and click **Add policy**.
2. Select which APIs you want to add to your API product.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-policy.png" alt="Create a policy" >}}

3. From the **Access Rights** drop-down list, select one or more APIs to include in your policy.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-select-api-to-include-into-policy.png" alt="Add an API into the policy" >}}

4. Under **Global limits and Quota**, select **Enforce access rights**. Ensure **Enforce usage quota** and **Enforce rate limit** are **not** selected.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-enforce-access-rights.png" alt="Enforce access rights" >}}

5. From the **Configurations** tab, add the information needed under name and settings.
6. From the **Tags** tab, a tag can be added to tell the portal this should be imported. If you have specified a specific label in the Provider section within the Developer portal when adding Tyk, the way the portal would know which Policies to import can be specified here.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-tags.png" alt="Add tags to the policy" >}}

7. To import the API Products into the Developer portal, from the Tyk Portal admin app, click **Synchronise**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-sync-with-dashboard.png" alt="Sync with the Tyk Pro" >}}


### Create and import plans from Tyk

{{< youtube XYlaqy3UuNg >}}

Plans are policies that implement rate limit or quota, or both, but do **NOT** include the ACL.
To create a Plan for the developer portal, follow the same steps as for creating an API Product. However, within the Global limits and quota in the Policies, configure the policy as follows:

1. From your Tyk Self-Managed installation, go to **Policies** and click **Add policy**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-policy.png" alt="Create a policy" >}}

2. Select an API. Please note that this a required field. The purpose of the policy explained in this guide is to control allowance, so you can select any API here.
3.  Under **Global limits and Quota**, select **Enforce usage quota** and **Enforce rate limit**. Ensure **Disable rate-limiting** and **Unlimited requests** are **not** selected so you can set these limits.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-enforce-quota.png" alt="Enforce quota and rate limit" >}}

4.  Click **Synchronise** to import the plans into the Developer portal, from the Tyk Portal admin app.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-sync-with-dashboard.png" alt="Sync with the Tyk Pro" >}}

## Manually Create API Product and Plan

From version 1.13.0, the Developer Portal allows you to create API Products and Plans from the portal dashboard for admins. When manually creating an API Product or Plan, the corresponding policy will be created in the Tyk Self-Managed selected provider.

### Create API Product

When creating an API Product in the Developer Portal, a partitioned policy that provides an ACL but not quota/rate limits will be created in the Tyk Self-Managed selected provider. The following steps explain how to create an API Product in the Developer Portal:

1. From the Tyk Portal admin app, go to **API Products** and click **Add new API Product**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-api-product.png" alt="Add an API Product" >}}

2. Select a unique name for the API Product and complete the [product details for customization]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/customize-products-and-plans" >}}) in the **Details** tab. The product name will be the name assigned to the created policy in the Tyk Self-Managed selected provider
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-details.png" alt="Add an API Product" >}}

3. Select **Provider**, **Authentication**, and **APIS** in the **API's** tab.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-apis.png" alt="Add APIs" >}}

4. Add API specifications in the **Documentation** tab.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-api-specs.png" alt="Add API Specifications" >}}

5. Add Product Guides in the **"Getting Started" guides** tab.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-guides.png" alt="Add Product Guides" >}}

6. Complete DCR settings in the **Dynamic Client Registration** tab (Only for JWT selected APIs).
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-product-dcr.png" alt="Add DCR settings" >}}

7. Save changes.

{{< note >}}
**Note:**

If no APIs are selected, you can still add api specifications, and guides creating a documentation only product. Documentation only products are Developer Portal products that do not have any APIs associated with them and thus no policies will be created in the Tyk Self-Managed selected provider. Documentation only products are useful for creating documentation for APIs that are not yet created or published. Specs and guides will be shown in the external portal as a regular product and the selected `Specification Alias` will be used as the reference for each spec.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-doc-only-product.png" alt="Add a Documentation only Product" >}}
{{< /note >}}

### Create Plan

When creating a Plan in the Developer Portal, a partitioned policy that implements rate limit or quota, or both, but do **NOT** include the ACL will be created in the Tyk Self-Managed selected provider. The following steps explain how to create a Plan in the Developer Portal:

1. From the Tyk Portal admin app, go to **Plans** and click **Add new Plan**.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-add-plan.png" alt="Add a Plan" >}}

2. Choose a **Provider** and a unique **Name** for the plan. The plan name will be the name assigned to the created policy in the Tyk Self-Managed selected provider.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-details.png" alt="Add Plan Details" >}}

3. Complete Plan limits. Select **Usage quota**, **Rate limit**, and **Key expiration** for the plan.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-limits.png" alt="Add Plan Limits" >}}

4. Complete Advanced settings (optional). Set **Scopes** (for DCR), **Access Request Frequency**, and **Credential metadata** for the plan.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-plan-advanced-settings.png" alt="Add Plan Advanced Settings" >}}

5. Save changes.


## Next step

Visit [Customize visual appearance of API Products and Plans]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/customize-products-and-plans" >}}) to learn how to customize the visual appearance of API Products and plans.
