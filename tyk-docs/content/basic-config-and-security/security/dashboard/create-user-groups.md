---
date: 2017-03-23T14:59:47Z
title: Manage Tyk Dashboard User Groups
tags: ["User Groups", "role based access control", "RBAC", "access control", "Tyk Dashboard"]
description: "How to create user groups and add users to them"
menu:
  main:
    parent: "Dashboard"
weight: 5
---

Tyk has a flexible [user permissions]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) system that provides Role Based Access Control (RBAC) for your Tyk Dashboard.

When you have a large number of users and teams with different access requirements, instead of setting permissions per *user*, you can create a *user group* and configure the permissions for all users in the group. For example, if you only want certain *users* to access the Tyk Logs, you could create a "Logs Users" *user group*, then give those users the *Logs Read* permission and add them to your *Logs Users* group.

Note that **a user can only belong to one group**.

You must have either *admin* or *user groups* permission to be able to modify user groups.

This also works for Single Sign-On (SSO), as you can specify the user group ID when setting up SSO.

{{< note success >}}
**Note**

The availability of this feature depends on your license.
<br>
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}}


## Creating a User Group with the Dashboard

### Step 1: Select "User Groups" from the "System Management" section

{{< img src="/img/2.10/user_groups_menu.png" alt="User group menu" >}}

### Step 2: Click "ADD NEW USER GROUP"

{{< img src="/img/2.10/add_user_group.png" alt="Add user group location" >}}

### Step 3: Add User Group Name

Enter the name for your User Group, and an optional Description.

{{< img src="/img/2.10/user_group_details.png" alt="Add name" >}}

### Step 4: Set User Group Permissions

Selet the User Group Permissions you want to apply.

{{< img src="/img/2.10/user_group_permissions.png" alt="Add permissions" >}}

### Step 5: Click "Save" to create the Group

{{< img src="/img/2.10/user_group_save.png" alt="Click Save" >}}

### Step 6: Add Users to your Group

 1. From the **Users** menu, select **Edit** from the **Actions** drop-down list for a user to add to the group.
 2. Select your group from the **User group** drop-down list.

{{< img src="/img/2.10/user_select_group.png" alt="select user group" >}}

Click Update to save the User details

{{< img src="/img/2.10/user_reset_password.png" alt="update user" >}}

## Managing User Groups with the Dashboard API

You can also manage User Groups via our [Dashboard API]({{< ref "tyk-apis/tyk-dashboard-api/user-groups" >}}). The following functions are available:

* [List all User Groups]({{< ref "tyk-apis/tyk-dashboard-api/user-groups#list-user-groups" >}})
* [Get a User Group via the User Group ID]({{< ref "tyk-apis/tyk-dashboard-api/user-groups#get-user-group" >}})
* [Add a User Group]({{< ref "tyk-apis/tyk-dashboard-api/user-groups#add-user-group" >}})
* [Update a User Group]({{< ref "tyk-apis/tyk-dashboard-api/user-groups#update-user-group" >}})
* [Delete a User Group]({{< ref "tyk-apis/tyk-dashboard-api/user-groups#delete-user-group" >}})
