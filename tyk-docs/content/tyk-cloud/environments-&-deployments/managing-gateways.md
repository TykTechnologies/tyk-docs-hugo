---
title: "Managing Gateways"
date: 2020-08-21T14:58:21+01:00
menu:
  main:
    parent: "Environments & Deployments"
weight: 4
url: "/tyk-cloud/environments-&-deployments/managing-gateways"
---

## Introduction

Edge Gateways do all the heavy lifting of actually managing your requests: traffic proxying, access control, data transformation, logging and more.


## Prerequisites

The following [user roles](/docs/tyk-cloud/reference-docs/user-roles/) can perform Edge Gateway Admin tasks:

* Org Admin
* Team Admin

## Adding a new Edge Gateway

{{< note success >}}
**Note**
  
The number of Gateways you can add is dependent on your [plan](/docs/tyk-cloud/account-billing/plans/)
{{< /note >}}

1. From the Environments screen click **Add Deployment**
2. Enter a name for the new Gateway
3. Select Edge Gateway from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain](/docs/tyk-cloud/using-custom-domains/) if required
6. (Optional) Enable [plugins](/docs/tyk-cloud/using-plugins/) if required

## Edit Edge Gateways

You can edit the following Control Plane settings:
* Change the Gateway name
* Add a [custom domain](/docs/tyk-cloud/using-custom-domains/)
* Change the Bundle Channel and Bundle Version
* Enable [plugins](/docs/tyk-cloud/using-plugins/)

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan](/docs/tyk-cloud/account-billing/plans/)
{{< /note >}}

To edit an existing Gateway:

1. From the Overview screen, click the **Control Plane Name** from the list
2. Click the **Edge Gateway** name from the list
3. Select **Edit** from the Deployed drop-down list

![Edge drop-down](/docs/img/admin/cp-edit.png)