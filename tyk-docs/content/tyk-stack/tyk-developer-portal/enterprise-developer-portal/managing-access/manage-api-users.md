---
title: "Manage API Users"
date: 2022-02-09
tags: ["Tyk Developer Portal","Enterprise Portal","Managing access","API Consumers"]
description: "How to manage internal and external API Consumers"
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

2. In the **Add user** dialog, enter **First** and **Last** names, and **Email**.
3. Select an organisation to which to register your user.
4. You can also set a password for a user by typing it in the **Set password** field. Check the **User must change password at the next login** if you wish your developer to change their password at next login.
Please note, that you can either send the invite email or set the password yourself, but you cannot use both methods. 

{{< img src="/img/dashboard/portal-management/enterprise-portal/add-users.png" alt="Add API Users dialog" width="600">}}

5. Click **Save** to add your user.
6. To generate the invite email, click **More Options** in the Overview section and then **Send invite**.
The user will receive an email with a link to the registration form. This option is only available if you didn't set the password before.
To customize the invite email, please refer to the [Email customization section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization.md" >}}) for guidance.

{{< img src="/img/dashboard/portal-management/enterprise-portal/users-send-invite.png" alt="Users Send invite dialog" >}}