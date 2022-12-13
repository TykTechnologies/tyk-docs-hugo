---
title: "Access an API Product"
date: 2022-02-14
tags: [""]
description: ""
menu:
  main:
    parent: "Developer - API Consumer Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

This section explains how to access API products as a registered portal developer

## Prerequisites

You need to have successfully registered for a portal.

## Step by step instructions

1. Login to the external developer portal
2. Go to **Catalogues** to view the available API products

{{< note success >}}
**Note**

Using the filter at the top, you can filter on the different created catalogues including different API Products, e.g. a custom catalogue that only you and a specific team can access.

{{< /note >}}

3. When selecting on a product, you can click **More info** to access the product overview page.
4. On the product overview page, you can view documentation for each API included in the API product. You can also view information about which catalogue the API product is part of. Each catalogue may have different plans available so you need to select a catalogue based on which plan you want to access.
5. Click **Add to cart**.

{{< note success >}}
**Note**

You can add multiple products to the cart. You can receive one set of access credentials for multiple products as long as they are part of the same cart. If you are adding two products to the cart, and they are part of different catalogues, e.g. Private and Public, you will need to go through two request flows, and you will get two different sets of credentials for each API Product.

{{< /note >}}

6. Add the details needed and select a subscription plan for your  API Product(s) chosen.
7. Create a new app or add to an existing one. If you already have an existing app created you can access it via the drop down or select **Create a new app** to add the credentials to an existing app.
8. Click **Request access**.
9. Navigate to My apps and view the app you created. Depending if the plan requires manual approval by an admin or not, you will either see that the request is pending or you can see the approved access credentials immediately you can start using them.

{{< note success >}}
**Note**

When sending a query, make sure to use the Base URL outlined in the overview of the API Product.

{{< /note >}}
