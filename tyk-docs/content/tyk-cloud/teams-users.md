---
title: "Manage Teams and Users in Tyk Cloud"
tags: ["Teams", "Users", "Tyk Cloud", "User Management", "User Roles"]
description: "Learn how to manage teams and users in Tyk Cloud, including user roles, team management, and single sign-on (SSO) configuration."
aliases:
  - /tyk-cloud/setup-team
  - /tyk-cloud/teams-&-users/managing-teams
  - /tyk-cloud/teams-&-users/managing-users
  - /tyk-cloud/teams-&-users/user-roles
  - /tyk-cloud/teams-users/managing-teams
  - /tyk-cloud/teams-users/managing-users
  - /tyk-cloud/teams-users/user-roles
  - /tyk-cloud/teams-&-users
  - /tyk-cloud/getting-started-tyk-cloud/setup-team
---

## Introduction

This section covers the following:

- [Managing Teams]({{< ref "#managing-teams" >}})
- [Managing Users]({{< ref "tyk-cloud/teams-users" >}})
- Available Tyk Cloud [User Roles]({{< ref "tyk-cloud/teams-users#user-roles-within-tyk-cloud" >}})
- [Tyk Cloud Single Sign-On (SSO)]({{< ref "tyk-cloud/teams-users/single-sign-on" >}})

## Managing Teams 

The following [user roles]({{< ref "tyk-cloud/teams-users#user-roles-within-tyk-cloud" >}}) can perform existing Team Admin tasks:

* Organization Admin - Can manage all teams in the organization they are a member of.
* Team Admin - Can only manage the team they are a member of.

For an existing team, you can:

* Change the team name
* Create or delete a team (Organization Admin only)
* Invite and manage users in a team
  
### Change the Team Name

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Change the existing name for the team.
4. Click **Save**.

### Create a New Team

You need to be a [Organization Admin]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) to create a new team.

1. From the Admin > Teams screen, click **Add Team**.
2. Enter a name for the new team that will be added to the organization.
3. Click **Create**.

### Delete a Team

You need to be a [Organization Admin]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) to delete a team.

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Click **Delete Team**.
4. You'll be asked to confirm the deletion. Click **Delete Team** from the dialog box to confirm, or click **Cancel**.

You can now invite users to your new team. See [Managing Users]({{< ref "tyk-cloud/teams-users" >}}) for more details.


## Managing Users

The following [user roles]({{< ref "tyk-cloud/teams-users#user-roles-within-tyk-cloud" >}}) can perform existing User Admin tasks:

* [Organization Admin]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) - Can manage all users in the organization they are a member of.
* [Team Admin]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) - Can only manage the users of the team they are a member of.

{{< note success >}}
**Note**

Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can also [add users to the Tyk Dashboard]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs. 
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


## Assign User Roles

This section defines the different user roles within Tyk Cloud, so that you can see at a glance what each role does and manage your account accordingly.

### User Roles within Tyk Cloud

We have the following user roles defined in Tyk Cloud for your team members

* Billing Admin
* Organization Admin
* Team Admin
* Team Member

Billing Admins are responsible for the billing management of the Tyk Cloud account. Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can [add users to the Tyk Dashboard]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs.   

### Use Case Matrix

The following table shows the scope for each user role.


| Use Case                                          | Billing Admin | Org Admin | Team Admin | Team Members |
|---------------------------------------------------|---------------|-----------|------------|--------------|
| Create a new account                              | X             |           |            |              |
| Create a new organization                         | X             |           |            |              |
| Managing a new account                            | X             |           |            |              |
| Managing an organization entitlement              | X             |           |            |              |
| Ability to create other billing admins            | X             |           |            |              |
| Editing organization name                         | X             | X         |            |              |
| Create team / delete                              |               | X         |            |              |
| Future - Edit team entitlements                   |               | X         |            |              |
| Invite, delete, edit org admins and team admins   |               | X         |            |              |
| Invite, delete, edit team members                 |               | X         | X          |              |
| Create new environments                           |               | X         | X          |              |
| Delete / change environments                      |               | X         | X          |              |
| View environments                                 |               | X         | X          | X            |
| Create and delete cloud data planes               |               | X         | X          |              |
| Create and delete control planes                  |               | X         | X          |              |
| View deployments                                  |               | X         | X          | X            |
| Deploy, undeploy, redeploy, restart a deployment. |               | X         | X          | X            |
| Create and manage basic SSO                       |               | X         | X          |              |
| Upload plugins to the File Server                 |               | X         | X          | X            |
| Delete plugins from File Server                   |               | X         | X          | X            |
| Viewing Analytics                                 |               | X         | X          | X            |

### Initial Tyk Cloud Account Roles

The user who signs up for the initial Tyk Cloud account is uniquely assigned to two roles:

1. Org admin of the organization
2. Billing admin of the account

This is the only occasion where a user can be assigned to 2 roles. So, for example, if you invite a user to be a Team Admin, that is the only role (and team) they can belong to. For a user to be invited as a Billing admin, they can't have an existing Tyk Cloud account.

{{< note success >}}
**Note**
  
This functionality may change in subsequent releases.
{{< /note >}}

**Tyk System Integration User (do not delete)**

When you click your Control Plane Dashboard link from your Tyk Cloud Deployments Overview screen, you are automatically logged in to your Dashboard. This is due to a default Tyk Integration user that is created as part of the Control Plane deployment process. This user has a first name of `Tyk System Integration` and a last name of `User (do not delete)`. As the last name infers, you should not delete this user or your access to the Dashboard will be broken from your Tyk Cloud Installation.

