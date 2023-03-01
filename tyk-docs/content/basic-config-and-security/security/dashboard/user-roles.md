---
date: 2017-03-23T14:45:17Z
title: User Roles
tags: ["Users", "Roles"]
description: "How set user roles with the Tyk Dashboard"
menu:
  main:
    parent: "Dashboard"
weight: 4 
aliases:
  - /reference-docs/user-roles/
---

## User API Roles

The Tyk Dashboard is multi-tenant capable and allows granular, role based user access. Users can be assigned specific permissions to ensure that they only have very specific access to the Dashboard pages, and to the underlying API.

From v2.7 you can now assign users to a user group if you are an admin user or have the **User Group** permission assigned to you. See [User Groups]({{< ref "basic-config-and-security/security/dashboard/create-user-groups" >}}) for more details.

The availability of this feature varies depending on the license or subscription. 
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

It is important to note that all user roles are defined and enforced at the API level, and the UI is merely reactive.

User permissions can be set in the user detail view:

{{< img src="/img/2.10/user_permissions.png" alt="Admin account" >}}

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
  "user_groups": "write"
 }
```

The way the permissions object works is that:

*   If it contains no properties, the user is assumed to be an admin.
*   If it contains even just one property, it acts as a white list, and only that one property is allowed.
*   Any non-listed properties are denied.
*   Values for each section are: `read` or `write`, remove the property altogether to deny access.

Permissions are enforced **at the Dashboard API level**.

Each of the object categories will also have an effect on the dashboard navigation, however side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.
