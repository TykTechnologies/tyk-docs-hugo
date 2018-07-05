---
date: 2017-03-23T14:45:17Z
title: User Roles
menu:
  main:
    parent: "Dashboard"
weight: 4 
---

## User API Roles

The Tyk Dashboard allows multi-tenant and granular user access. Users can be assigned specific permissions to ensure that they only have very specific access to the dashboard pages, and to the underlying API.

It is important to note that all user roles are defined and enforced at the API level, and the UI is merely reactive.

User permissions can be set in the user detail view:

![Admin accounta][1]

Selecting the **Account is Admin** checkbox from the Dashboard gives the user full access (the same as the `IsAdmin` property).

#### The Permissions Object

The permissions object, when fully set as an API entry or in MongoDB, looks like this:

```{.copyWrapper}
    "user_permissions": {
        "analytics": "read",
        "apis": "write",
        "hooks": "write",
        "idm": "write",
        "keys": "write",
        "policy": "write",
        "portal": "write",
        "system": "write",
        "users": "write",
        "group_id": "write"
     }
```

The way the permissions object works is that:

*   If it contains no properties, the user is assumed to be an admin.
*   If it contains even just one property, it acts as a white list, and only that one property is allowed.
*   Any non-listed properties are denied.
*   Values for each section are: `read` or `write`, remove the property altogether to deny access.

Permissions are enforced **at the Dashboard API level**.

Each of the object categories will also have an effect on the dashboard navigation, however side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.

From v2.7 you can now assign users to a user group if you are an admin user or have the **User Group** permission assigned to you. See [Create User Groups](https://tyk.io/docs/security/dashboard/create-user-groups/) for more details.

[1]: /docs/img/dashboard/system-management/user_roles2.7.png

