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

Setting the "IsAdmin" property will give a user full access.

#### The Permissions Object

The permissions object, when fully set as an API entry or in MongoDB, looks like this:

```
    "user_permissions": {
        "analytics": "read",
        "apis": "write",
        "hooks": "write",
        "idm": "write",
        "keys": "write",
        "policy": "write",
        "portal": "write",
        "system": "write",
        "users": "write"
     }
```

The way the permissions object works is that:

*   If it contains no properties, the user is assumed to be an admin.
*   If it contains even just one property, it acts as a white list, and only that one property is allowed.
*   Any non-listed properties are denied.
*   Values for each section are: `read` or `write`, remove the property altogether to deny access.

Permissions are enforced *at the dashboard API level*.

Each of the object categories will also have an effect on the dashboard navigation, however side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.

[1]: /docs/img/dashboard/system-management/adminAccount.png

