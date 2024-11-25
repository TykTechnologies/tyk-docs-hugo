---
date: 2017-03-23T14:45:17Z
title: User Permissions
tags: ["User permissions", "permissions", "role based access control", "RBAC", "access control", "Tyk Dashboard"]
description: "How to work with user permissions with the Tyk Dashboard"
aliases:
  - /reference-docs/user-roles/
---

The Tyk Dashboard is multi-tenant capable and allows granular, role based user access. Users can be assigned specific permissions to ensure that they only have very specific access to the Dashboard pages, and to the underlying API.

It is important to note that all user roles are defined and enforced **at the Dashboard API level**, and the UI is merely reactive.

### Admin users
An *admin* user has full read/write access to all properties. The initial user created during the bootstrapping of the Dashboard is automatically assigned the *admin* role.

### User permissions in the Tyk Dashboard API
The permissions object, which is provided to the Dashboard API has this structure:

```json
"user_permissions": {
  "IsAdmin": "false",
  "analytics": "read",
  "apis": "write",
  "hooks": "write",
  "idm": "write",
  "keys": "write",
  "policy": "write",
  "portal": "write",
  "system": "write",
  "users": "write",
  "user_groups": "write",
  "audit_logs": "read"
 }
```

Note that the above list may not be complete as more features and flexibility are added to the Tyk Dashboard.

The way the permissions object works is that:
 - if it contains `"IsAdmin":"true"`, the user is an *admin*
 - if it contains no properties, the user is assumed to be an *admin*
 - if it contains even just one property, it acts as an allow-list: only the listed properties are allowed
 - any non-listed properties are denied
 - permissable values for each section (other than `IsAdmin`) are: `read` or `write`; to deny access to a property you must remove the property from the `user_permissions` object

An *admin* user can be identified either by setting `IsAdmin` to `true` or by setting no properties in the `user_permissions` object. 

### User permissions in the Tyk Dashboard API
User permissions are configured in the user detail view:

{{< img src="/img/2.10/user_permissions.png" alt="Admin account" >}}

The configuration of each property will affect the dashboard navigation, with `denied` sections or screens hidden or disabled. Note that some side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.

Selecting the **Account is Admin** checkbox from the Dashboard gives the user full access (it has the same [effect]({{< ref "basic-config-and-security/security/dashboard/user-roles#admin-users" >}}) as the `IsAdmin` property).

### Custom user permissions
You can create your own custom permissions for use with the [Open Policy Agent (OPA)]({{< ref "tyk-dashboard/open-policy-agent" >}}) using the [Additional Permissions]({{< ref "tyk-dashboard-api/org/permissions" >}}) endpoint in the Tyk Dashboard Admin API. This allows you to add and delete (CRUD) a list of additional (custom) permissions for your Dashboard users. Once created, a custom permission will be added to standard list of user permissions. 

You can also configure these custom permissions in the `security.additional_permissions` [map]({{< ref "tyk-dashboard/configuration#securityadditional_permissions" >}}) in the Tyk Dashboard configuration file. 