---
title: "Create API Consumer organisations and catalogues"
date: 2022-02-10
tags: ["Tyk Developer Portal","Enterprise Portal","Catalogue","Audience","Developers","Organisations"]
description: "Segment your developer audience with catalogues and organisations"
menu:
  main:
    parent: "Manage API Users"
weight: 4
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In the Tyk Enterprise Developer Portal, Organisations and Catalogues are used to segment the user base and make different APIs available to different user audiences according to the business model.
For example, assume the following scenario:

- Account Management API is available only to trusted partners
- Payment API is available to all developers

Subsequently, two catalogs can be created for these two APIs.

In the below example, an API Provider offers two API Products (the Accounts API and Payment API) with two plans (the Free plan and Enterprise plan) to their customers.
Customers subscribed to the enterprise plan can use both APIs, offering a higher user limit. Conversely, customers subscribed to the Free plan (individual developers or hobbyists) only have visibility of the Payment API.

To achieve that, the API Provider uses two catalogues to implement their business model so that they can offer different experiences for different customer audiences. This section explains how to achieve that using the Tyk Enterprise Developer Portal.
{{< img src="/img/dashboard/portal-management/enterprise-portal/org-catalogue-product-relation.png" alt="Relationship between catalogues, API Products, plans, teams, and organisations" >}}

## Create organisation and teams
The Tyk Enterprise Developer Portal uses Organisation and Catalogues to segment access to APIs and plans. Therefore, the first thing is to create an organisation for your customers. If you don't want to provision organisations manually, you can leverage the [Admin APIs]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api.md" >}}) or enable the [self-service organisation registration]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations.md" >}}).
In this guide, we will create the **B2B customer** organisation to fulfill the above business model:
1. To create an organisation for the **B2B customer**, navigate to the **Organisations** menu and click on the **Add new organisation** button.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-organisations.png" alt="Navigate to the Organisations menu" >}}

2. Enter the name of your new organisation and click on the **Save** button. A new default-team will be automatically created and associated with your new organisation.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/create-b2b-customer-org.png" alt="Add a new Organisation" >}}

{{< note success >}}
**Note**

You can edit the default team name by navigating to **Teams** and opening up the team associated with the organisation you created. This will allow you to edit the team name as required.

{{< /note >}}

## Create catalogues
1. To create catalogues, navigate to the catalogues menu in the Tyk Enterprise Developer Portal.

The default catalogues that are featured when the portal is [bootstrapped]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal.md" >}}) are:
- **Public** catalogues are available to all developers.
- **Private** catalogues are available only to logged in developers who have been assigned with access.

You can create new catalogues by clicking on the **Add new catalogue** button or use the default catalogues.

{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-catalogues.png" alt="Navigate the to catalogues menu" >}}

2. To add a new catalog, click on the **Add new catalogue** button. Then specify the name of the catalog and select its type: **Private** or **Public**.
   Since the public catalogue already exists, in this guide you need to create only an additional private catalogue called **Enterprise catalogue** for the **B2B customer** who will have extended access rights compared to other developers.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/specify-name-of-catalogue.png" alt="Create a catalogue" >}}

{{< note >}}
**Note**

While it is possible to create multiple public catalogues, we do not advise doing so. This is because multiple public catalogues will share the same level of access.
{{< /note >}}

3. Once the catalogue is created, add a developer audience to it by clicking on the **Add Team** button and selecting an appropriate developer team (**B2B customer All users** in this example).
   Finally, add plans and API Products to the created catalogue so that the selected developer teams can view them.
   {{< img src="/img/dashboard/portal-management/enterprise-portal/add-team-products-and-plans.png" alt="Add teams, products, and plans to the catalogue" >}}

You can achieve the same result by navigating to the **API Products** menu. Adding an API Product to a catalogue through the **Catalogues** and the **API Products** menus will produce the same result.
{{< img src="/img/dashboard/portal-management/enterprise-portal/publish-products-to-catalogues.png" alt="Adding a product to a catalogue through the API Products menu" >}}

{{< note >}}
**Congratulations**

You have successfully added a catalogue and associated a team with it. Furthermore, you have allocated plans and API products to this catalogue.
{{< /note >}}

Visit [Customise the sign-up form]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/customize-sign-up-form" >}}) for the user sign-up form customisation guide.