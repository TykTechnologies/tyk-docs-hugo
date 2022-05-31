---
title: "Invite Codes"
date: 2022-02-10
tags: [""]
description: ""
menu:
  main:
    parent: "Manage API Users"
weight: 5
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

Here you’ll learn about how to create invite codes to add a new external user to the developer portal. Invite codes can be used to simplify user onboarding. Using invite codes, users will be directly assigned to a team and organisation, giving them the same access rights as this team. For example you can use invite codes to:
- Run a promotional campaign like a Hackathon and give access to specific plans to the users.
- Onboard a partner company into the portal by giving them this code for anyone registering.

## Prerequisites

- A Tyk Enterprise portal installation
- A portal admin app login

## Step by step instructions

1. From the **API Consumers > Invite Codes** menu, click **Add**.

{{< img src="/img/dashboard/portal-management/enterprise-portal/invite-codes.png" alt="Invite Codes menu" >}}
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-invite-code.png" alt="Invite Codes dialog" >}}

2. Add the form details:
   - Set your desired **Quota**. Quota is the max number of slots available for your invite code. E.g. if set 100, this code can be used by the top 100 users.
   - Set an expiry date, this is the date on which the code will expire and no more users can sign up to it.
   - Set state to **Active** - this means the code is activated and developers can start using it.
   - Specify the team that any new users that register with this invite code will be added to.

{{< img src="/img/dashboard/portal-management/enterprise-portal/invite-code-dialog.png" alt="Invite Codes dialog" >}}

3. **Save** the invite code.
4. Share the invite codes. When the saving changes a new Invite code was created and can be viewed in the overview table. To share the invite code, copy it and send to your developer teams/users.

{{< img src="/img/dashboard/portal-management/enterprise-portal/share-invite-codes.png" alt="Share Invite Codes dialog" >}}
