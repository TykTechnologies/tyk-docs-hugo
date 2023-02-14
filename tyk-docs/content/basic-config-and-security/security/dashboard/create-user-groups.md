---
date: 2017-03-23T14:59:47Z
title: Create User Groups
tags: ["Users", "Groups"]
description: "How to create groups and add users to them"
menu:
  main:
    parent: "Dashboard"
weight: 5
---

## Introduction

Instead of setting permissions per user, you can create a group, and assign it to one or more users.

You can use User Groups to help with Role Based Access Control (RBAC) for your users. For example, if you only want certain users to access the Tyk Logs, you can create a Logs User Group, then give those users the Logs Read permission and add them to your Logs User Group. See [User Roles]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) for assigning permissions to users.

This also works for Single Sign On (SSO) as well, you can specify the group ID when setting up SSO.

This Role Based Access Control (RBAC) feature is available to all our SaaS users. For Self-Managed installations, this feature is available for customers with at least a 5-node license.

In order to manage user groups, ensure that you have either "admin" or "user groups" permission for your user, which can be enabled by your admin.

{{< note success >}}
**Note**

A user can only belong to one group.
{{< /note >}}

## Create a User Group with the Dashboard


### Step 1: Select "User Groups" from the "System Management" section

{{< img src="/img/2.10/user_groups_menu.png" alt="User group menu" >}}

### Step 2: Click "ADD NEW USER GROUP"

{{< img src="/img/2.10/add_user_group.png" alt="Add user group location" >}}

### Step 3: Add User Group Name

Enter the name for your User Group, and an optional Description.

{{< img src="/img/2.10/user_group_details.png" alt="Add name" >}}

### Set User Group Permissions

Selet the User Group Permissions you want to apply.

{{< img src="/img/2.10/user_group_permissions.png" alt="Add permissions" >}}

{{< note success >}}
**Note**

You can now create your own custom permissions using the [Additional Permissions API]({{< ref "tyk-dashboard-api/org/permissions" >}}) or by updating the [`security.additional_permissions`]({{< ref "tyk-dashboard/open-policy-agent#configuration" >}}) settings in your Tyk Dashboard `tyk_analytics.conf`.
<br/>
See [Open Policy Agent]({{< ref "tyk-dashboard/open-policy-agent" >}}) for more details.
{{< /note >}}


### Step 4: Click "Save" to create the Group

{{< img src="/img/2.10/user_group_save.png" alt="Click Save" >}}

### Step 5: Add Users to your Group

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