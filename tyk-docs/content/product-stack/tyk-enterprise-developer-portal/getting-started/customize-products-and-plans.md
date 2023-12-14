---
title: "Customize visual appearance of API Products and Plans"
date: 2023-11-30
tags: ["Tyk Developer Portal","Enterprise Portal","API Product","Customization"]
description: "Make your API Products standout by customising their visual appearance"
menu:
  main:
    parent: "Get Started"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section, you will learn how to customise the visual appearance of API Products and plans with the Tyk Enterprise Developer Portal. That includes:
- The display name for API Products and plans.
- The description and logo of API Products that will be displayed on the API Product catalogue page.
- Tags for API Products to match them with related blog posts.

## Customize API Products
To customise the visual appearance of API Products:
1. Navigate to the **API Products** menu, select the product that you want to customise (the Payment API in example below). In this menu you can customise the following aspects of API Products:
- **Catalogue display name**: This is the name that will be displayed in the external catalogue.
- **Featured API Product**: Tick this option for the API Product to appear on the home page under the **Featured products** section.
- **Description**: A short description about what this API Product is. It is displayed in the catalogue and on the API Product page.
- **Content**: A long text description that appears on the API Product overview page, the rich text editor enables you to add more information about the API Product e.g. use cases, features, etc.
- **Image**: An API Product logo that is displayed on the catalogue and on the API Product pages.
- **Tags**: The tags are used to match the API Product with the related blog posts that have the same tags in common.
 
From that page you can also manage [OAuth2.0 settings]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration.md" >}}) and add [Get started guides]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/manage-get-started-guides-for-api-products" >}}) to your API Products, which is covered in the relevant sections.
{{< img src="img/dashboard/portal-management/enterprise-portal/customize-product.png" alt="Customize visual appearance of an API Product" >}}

2. Save changes by clicking on the **Save** button. You should now be able to preview how the API Product will be displayed in the catalogue:
{{< img src="img/dashboard/portal-management/enterprise-portal/product-live-portal.png" alt="View the API Product in the catalogue" >}}

Customise plans
1. To customise visual appearance of plans, open the **Plans** menu and select the plan you want to customise. You can customise the following settings:
- **Catalogue display name**: The name of the catalogue that will be displayed in the API Product page.
- **Scope**: Scope for the [OAuth2.0 settings]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration.md" >}}). Please refer to the [OAuth2.0 documentation]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration" >}}) for further guidance.
- **Catalogues**: The catalogues in which this plan is available. Catalogues and organisation are [covered]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/create-orgs-and-catalogs" >}}) later within this getting started guide.
- **Auto-approve settings for access requests**: Determines if access requests for this plan should be approved automatically.
- **Access request frequency**: Defines how often developers can request access to a specific plan. This way the admins can prevent developers from creating too many keys and abusing their automatically approved plans.

{{< img src="img/dashboard/portal-management/enterprise-portal/customize-plan.png" alt="Customize visual appearance of a plan" >}}

2. Customise the plan's visual appearance as required and then click on the **Save** button. Now you can view the plan in the API Product page: 
{{< img src="img/dashboard/portal-management/enterprise-portal/plan-live-portal.png" alt="Customize visual appearance of a plan" >}}

{{< note success >}}
**Congratulations**

You have now customised the visual appearance of your API Product and plan. By following the above steps you can customise visual appearance of your other API Products and plans. 
{{< /note >}}

## Next step

Visit the [create API Consumer organisations and catalogues]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/create-orgs-and-catalogs" >}}) section to learn how to create API consumer organisations and catalogues.