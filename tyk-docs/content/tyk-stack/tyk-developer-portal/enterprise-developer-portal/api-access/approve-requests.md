---
title: "Approve or reject provisioning requests"
date: 2022-02-11
tags: [""]
description: ""
menu:
  main:
    parent: "API Access"
weight: 5
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

When an external developer is looking to access a specific API(s) as a part of an API Product, they will request access via the public facing portal.

## Prerequisites

- A Tyk Enterprise portal installation
- A portal admin app login
- Log in to a provisioning request sent by an external API consumer

## Step by step instructions

1. Log in to the portal admin app
2. Navigate to **Provisioning Requests**
3. Select which request you want to approve
4. Click the **more** symbol and select either **approve** or **reject**

{{< img src="/img/dashboard/portal-management/enterprise-portal/approve-request.png" alt="Approve or reject an API provisioning request" >}}

## Configure auto approval

You can auto approve provisioning requests. From the **Plans** section of the admin app, edit a plan and select **Auto-approve provisioning request** from the **Plan Settings**. By default this setting is not selected, requiring manual approval of each request. Click **Save Changes** to enable this setting.

{{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-requests.png" alt="Auto Approve API provisioning requests" >}}