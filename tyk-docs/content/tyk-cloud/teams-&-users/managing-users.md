---
title: "Managing Users"
date: 2020-04-15
menu:
  main:
    parent: "Teams & Users"
weight: 3
url: /tyk-cloud/teams-&-users/managing-users
---

## Introduction

The following [user roles]({{< ref "/content/tyk-cloud/teams-&-users/user-roles.md" >}}) can perform existing User Admin tasks:

* [Organisation Admin]({{< ref "/content/tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) - Can manage all users in the organisation they are a member of.
* [Team Admin]({{< ref "/content/tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) - Can only manage the users of the team they are a member of.

{{< note success >}}
**Note**

Organisation Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organisation hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can also [add users to the Tyk Dashboard]({{ ref "basic-config-and-security/security/dashboard/create-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs. 
{{< /note >}}

### Invite a new user to your team

1. From the Teams screen, select the team name.
2. Click **Invite User**.
3. Complete the form for the new user.

### Editing Existing Users

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. You can change the following details
   * Change the team they are a member of.
   * Change the user role assigned to them.
4. Click Save to update the user info.

### Delete a User

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. Click **Delete**
4. You'll be asked to confirm the deletion. Click **Delete User** from the pop-up box to confirm, or click **Cancel**.
