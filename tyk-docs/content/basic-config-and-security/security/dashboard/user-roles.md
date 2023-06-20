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

```{json}
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

- If it contains no properties, the user is assumed to be an admin.
- If it contains even just one property, it acts as a white list, and only that one property is allowed.
- Any non-listed properties are denied.
- Values for each section are: `read` or `write`, remove the property altogether to deny access.

Permissions are enforced **at the Dashboard API level**.

Each of the object categories will also have an effect on the dashboard navigation, however side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.

#### User Owned Analytics

In Tyk Dashboard v5.1 (and LTS patches v4.0.14 and v5.0.3) we introduced a new user permission (`owned_analytics`) that can be assigned to a user to restrict their access to analytics data generated for APIs that they do not own. This facility is provided to avoid data leakage amongst different users and teams.

This permission is only relevant if RBAC and [API Ownership]({{< ref "tyk-dashboard/rbac#multi-team-setup-using-api-ownership" >}}) are enabled for your Dashboard.

- `owned_analytics` can be added to the `user_permissions` object and can can take one of two values: `read` or `deny`
- When `analytics=read` and `owned_analytics=read` the user will only have access to analytics that can be filtered by API (currently only API Usage and Error Counts); no other analytics (e.g. Endpoint Popularity) will be available to them. These restrictions are noted on the appropriate pages in the [Analytics documentation]({{< ref "tyk-dashboard-analytics" >}}) .
- When `analytics=read` and `owned_analytics=deny` the user will have full visibility to analytics for all APIs, exactly as they would if they were granted `analytics=read` permission without `enable_ownership` configured. This is equivalent to disabling the owned analytics feature.

{{< note success >}}
**Note**

`owned_analytics` is only considered when

- the RBAC claim is included in your Dashboard license
- `enabled_ownership` is configured in the Dashboard config
- the `analytics` permission is set to `read` in the user permissions
  {{< /note >}}

For example, to configure the user permissions for an analytics only user who should have visibility only of their allocated APIs, you might configure:

```{json}
"user_permissions": {
  "analytics": "read",
  "owned_analytics": "read",
 }
```

In the Dashboard UI, the control for `owned_analytics` is implemented as a drop-down option (`all` or `owned`) on the `analytics` permission.

{{< img src="/img/dashboard/analytics/owned_analytics.png" alt="Permissions with API Ownership" >}}
