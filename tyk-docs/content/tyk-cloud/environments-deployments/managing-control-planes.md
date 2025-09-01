---
title: "Managing Control Planes in Tyk Cloud"
tags: ["Control Planes", "Tyk Cloud", "Control Plane", "Cloud Data Plane", "Auto Upgrade"]
description: "Learn how to manage Control Planes in Tyk Cloud"
aliases:
  - /tyk-cloud/environments-&-deployments/managing-control-planes
  - /tyk-cloud/environments-deployments/managing-control-planes
---

## Introduction

Control Planes are situated in your Organization's home region and provide links to an instance of the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}) and the [Developer Portal]({{< ref "tyk-developer-portal" >}}). The Dashboard is where you perform all your API tasks. The developer portal allows your 3rd party developers access to your APIs. Cloud Data Planes are then connected to your Control Planes.

## Prerequisites

All [user roles]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organization Admin and the Team Admin can create or delete deployments.

## Adding a new Control Plane

Watch our video on setting up a Control Plane and a Cloud Data Plane.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Control Planes you can add is dependent on your [plan]({{< ref "tyk-cloud/account-billing#select-a-payment-plan" >}})
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
  
The use of custom domains is dependent on your [plan]({{< ref "tyk-cloud/account-billing#select-a-payment-plan" >}})
{{< /note >}}

To edit an existing Control Plane:

1. From the Deployments screen, click the **Control Plane Name** from the list
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Edit drop-down" >}}

## Upgrade Cloud Control Planes

There are two ways to upgrade a Control Plane.

### Manual Upgrade

To upgrade an existing Control Plane:

1. Go to the **Control Plane settings** using the _Edit Control Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deployed notification" >}}

### Auto Upgrade

The Auto Upgrade feature enables users to automatically upgrade their deployments to the latest version based on their selected bundle channel (E.g., Latest, LTS) without requiring manual intervention. This feature helps users stay on the latest features and security enhancements by automating the upgrade process according to a scheduled maintenance window.

#### Availability

Auto Upgrade is available for:
- Control Plane deployments
- When enabled on a Control Plane, it will automatically upgrade the corresponding data planes related to this control plane

#### How to Enable Auto Upgrade

You can enable Auto Upgrade when creating a new Control Plane or editing an existing Control Plane.

#### New Control Plane Deployments

1. Navigate to the "Add Deployment" page
2. Fill in the required deployment details
3. In the "Version" section, select your preferred Bundle Channel (Latest or LTS)
4. Select the desired Bundle Version
4. Toggle on the "Auto-upgrade" option
5. Schedule the maintenance window by selecting:
   - **Day**: Choose a day of the week (Monday-Sunday)
   - **Time**: Select an hour (0-23, in UTC timezone)

    {{< img src="/img/cloud/tyk-cloud-auto-upgrade.png" alt="Tyk Cloud Control Plane Auto Upgrade" >}}

6. Complete the deployment creation process

#### Existing Control Plane Deployments

1. Navigate to the deployment dashboard
2. Click "Edit" in the top-right corner
3. In the "Version" section, toggle on "Auto-upgrade"
4. Schedule the maintenance window by selecting the day and time
5. Click "Save and re-deploy"

#### Limitations and Considerations

- **Control Plane Only**: Auto Upgrade can only be enabled on Control Plane deployments
- **Plugin Compatibility**: Auto Upgrade cannot be enabled when plugins are enabled
- **Production Caution**: Not recommended for production environments without prior testing in lower environments
- **UTC Timezone**: All scheduled times are in UTC
- **Bundle Channel**: Upgrades will always follow the selected bundle channel (Latest or LTS)
- **Email Notifications**: Organization and team admins will receive email notifications when auto-upgrades occur
