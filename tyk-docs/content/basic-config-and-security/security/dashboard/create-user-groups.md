---
date: 2017-03-23T14:59:47Z
title: Create User Groups 
menu:
  main:
    parent: "Dashboard"
weight: 5 
---

## <a name="introduction"></a>Introduction

Instead of setting permissions per user, you can create a group, and assign it to one or more users. 

You can use User Groups to help with Role Based Access Control (RBAC) for your users. For example, if you only want certain users to access the Tyk Logs, you can create a Logs User Group, then give those users the Logs Read permission and add them to your Logs User Group. See [User Roles](/docs/basic-config-and-security/security/dashboard/user-roles/) for assigning permissions to users.

This also works for Single Sign On (SSO) as well, you can specify the group ID when setting up SSO. 

This Role Based Access Control (RBAC) feature is available to all our SaaS users. For On-Premises installations, this feature is available for customers with at least a 5-node or Cloud Native Unlimited-node license.

In order to manage user groups, ensure that you have either "admin" or "user groups" permission for your user, which can be enabled by your admin.

> **NOTE:** A user can only belong to one group.

## Create a User Group with the Dashboard


### Step 1: Select "User Groups" from the "System Management" section

![User group menu location](/docs/img/dashboard/system-management/user_groups2.7.png)

### Step 2: Click "ADD NEW USER GROUP"

![Add user group location](/docs/img/dashboard/system-management/add-new-user-group2.7.png)

### Step 3: Add User Group Name

Enter the name for your User Group, and an optional Description.

![Add name](/docs/img/dashboard/system-management/user_group_name.png)

### Step 4: Click "Save" to create the Group

![Click Save](/docs/img/dashboard/system-management/api_save_2.5.png)

### Step 5: Add Users to your Group

 1. From the **Users** menu, select **Edit** from the **Actions** drop-down list for a user to add to the group.
 2. Select your group from the **User group** drop-down list.

![select user group](/docs/img/dashboard/system-management/user_group_dropdown.png)

Click Update to save the User details

![update user](/docs/img/dashboard/system-management/user_update_buttons.png)

## Managing User Groups with the Dashboard API

You can also manage User Groups via our [Dashboard API](/docs/tyk-apis/tyk-dashboard-api/user-groups/). The following functions are available:

* [List all User Groups](/docs/tyk-apis/tyk-dashboard-api/user-groups/#list-user-groups)
* [Get a User Group via the User Group ID](/docs/tyk-apis/tyk-dashboard-api/user-groups/#get-user-group)
* [Add a User Group](/docs/tyk-apis/tyk-dashboard-api/user-groups/#add-user-group)
* [Update a User Group](/docs/tyk-apis/tyk-dashboard-api/user-groups/#update-user-group)
* [Delete a User Group](/docs/tyk-apis/tyk-dashboard-api/user-groups/#delete-user-group)