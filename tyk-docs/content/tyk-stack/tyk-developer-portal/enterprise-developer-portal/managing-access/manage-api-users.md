---
title: "Manage API Users"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Managing Access"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Here you’ll learn about how to add and invite a new external user to the developer portal.

## Prerequisites

- A Tyk portal installation
- Log in to the portal admin app

## Invite a new user

1. From the **API Consumers > Users** menu Click **Add new user**.

{{< img src="/img/dashboard/portal-management/enterprise-portal/users-menu.png" alt="Portal API Users menu" >}}

2. Add the metadata and select an organisation. Make sure **Activate developer** is selected.

{{< note success >}}
**Note**

The default organisation is automatically set up to access the public catalogue


{{< /note >}}

{{< img src="/img/dashboard/portal-management/enterprise-portal/add-users.png" alt="Add API Users dialog" >}}

3. Click **Save** to add your user.
4. To generate the invite email, click **More Options** in the Overview section and then **Send invite**. The user will receive an email with a link to the registration form.

{{< img src="/img/dashboard/portal-management/enterprise-portal/users-send-invite.png" alt="Users Send invite dialog" >}}