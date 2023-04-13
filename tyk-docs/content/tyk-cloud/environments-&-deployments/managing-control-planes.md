---
title: "Managing Control Planes"
date: 2020-08-21T11:20:20+01:00
tags: ["Tyk Cloud", "Management"]
description: "How to manage your Tyk Cloud Control Planes"
menu:
  main:
    parent: "Environments & Deployments"
weight: 3
aliases:
  - /tyk-cloud/environments-deployments/managing-control-planes
  - /tyk-cloud/environments-&-deployments/managing-control-planes
---

## Introduction

Control Planes are situated in your Organisation's home region and provide links to an instance of the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}) and the [Developer Portal]({{< ref "tyk-developer-portal" >}}). The Dashboard is where you perform all your API tasks. The developer portal allows your 3rd party developers access to your APIs. Edge Gateways are then connected to your Control Planes.


## Prerequisites

All [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organisation Admin and the Team Admin can create or delete deployments.

## Adding a new Control Plane

Watch our video on setting up a Control Plane and an Edge Gateway.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Control Planes you can add is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

1. From the Deployments screen click **Add Deployment** (you can also add a Deployment from within an Environment overview)
2. Enter a name for the new Control Plane
3. Select Control Plane from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}}) if required
6. (Optional) Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}}) if required

## Edit Control Planes

You can edit the following Control Plane settings:
* Change the Control Plane name
* Add a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}})
* Change the Bundle Channel and Bundle Version
* Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}})

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

To edit an existing Control Plane:

1. From the Deployments screen, click the **Control Plane Name** from the list
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Edit drop-down" >}}

## Upgrade Control Planes

To upgrade an existing Control Plane:

1. Go to the **Control Plane settings** using the _Edit Control Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deploying notification" >}}