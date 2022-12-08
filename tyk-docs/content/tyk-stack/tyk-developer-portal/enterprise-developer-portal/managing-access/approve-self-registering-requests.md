---
title: "Approve Self Registering Requests"
date: 2022-02-10
tags: [""]
description: ""
menu:
  main:
    parent: "Manage API Users"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

This section explains how to approve/reject external users self-registering requests to the developer portal. Follow the step-by-step guide.

## Prerequisites

A Tyk Enterprise portal installation

## Step by step instructions

1. Click *Users* from the **API Consumers** menu

{{< img src="/img/dashboard/portal-management/enterprise-portal/users-menu.png" alt="Portal API Users menu" >}}

2. When a new user has self-registered to access the developer portal,  their user profile will be added to the overview in the **Users** section.

{{< img src="/img/dashboard/portal-management/enterprise-portal/approve-users1.png" alt="List of Users for your portal app" >}}

3. To approve a user, click on an **inactive** user. Select **Activate developer** from the dialog.

{{< img src="/img/dashboard/portal-management/enterprise-portal/activate-user.png" alt="Select Activate developer" >}}

## Automatically approve user registrations

If you want all Users to be automatically approved this setting can be changed under **Settings > General**. Select **Auto approve developer regestering requests**.

{{< img src="/img/dashboard/portal-management/enterprise-portal/auto-approve-users.png" alt="Setting to automatically approve user registrations" >}}
