---
title: "Configure Provisioning Request"
date: 2025-02-10
tags: ["Developer Portal", "Tyk", "Dynamic Client Registration"]
keywords: ["Developer Portal", "Tyk", "Dynamic Client Registration"]
description: "How to configure Provisioning Request in Tyk developer portal"
---

## Approve or Reject Provisioning Request

When an external developer is looking to access a specific API(s) as a part of an API Product, they will request access via the public facing portal.

**Prerequisites**

- A Tyk Enterprise portal installation
- A portal admin app login
- Log in to a provisioning request sent by an external API consumer

**Step by step instructions**

1. Log in to the portal admin app
2. Navigate to **Provisioning Requests**
3. Select which request you want to approve
4. Click the **more** symbol and select either **approve** or **reject**

{{< img src="/img/dashboard/portal-management/enterprise-portal/approve-request.png" alt="Approve or reject an API provisioning request" >}}

## Configure Auto Approval

You can auto approve provisioning requests. From the **Plans** section of the admin app, edit a plan and select **Auto-approve provisioning request** from the **Plan Settings**. By default this setting is not selected, requiring manual approval of each request. Click **Save Changes** to enable this setting.

{{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-requests.png" alt="Auto Approve API provisioning requests" >}}

