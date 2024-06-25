---
title: API Ownership
date: 2024-03-04
description: "Controlling access to APIs using Ownership"
tags: ["API ownership", "ownership", "governance", "API governance", "analytics", "user owned analytics"]
---

API Ownership is the concept of Role Based Access Control applied to the portfolio of APIs deployed on your Tyk Gateways and managed from your Tyk Dashboard. Each user or user group can be granted access to a subset of the portfolio and, for example, have no visibility of any other APIs deployed on the platform.

{{< note success >}}
**Note**  

The availability of this feature [depends on your license]({{< ref "tyk-dashboard/rbac" >}}).
{{< /note >}} 

## When to use API Ownership
#### Governing a multi-team API portfolio
API ownership is a key capability when you have multiple API development teams each working on their own suite of APIs. You can use API Ownership to simplify the experience of those developers when accessing Tyk by reducing the "clutter" of APIs that they are not working with, and also to avoid the risk of users accidentally or maliciously interfering with another team's APIs.

#### Avoiding data leakage between users
The [user owned analytics]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership#owned-analytics" >}}) feature allows you to prevent users from seeing the traffic to (and existence of) APIs for which they are not responsible. This reduces the opportunity for data leakage within your business.

## How API Ownership works
By default, APIs and associated objects (such as policies and Dashboard analytics) are visible to all Tyk Dashboard users.

A Dashboard User (or User Group) can be assigned as the *owner* of an API, granting that user (or user group) exclusive visibility of and - given appropriate permissions - the ability to manage all the Tyk objects relating to that API, such as policies, key requests and Dashboard analytics.

Once an API has been assigned an *owner*, all non-owning users will lose visibility of - and access to - that API in the Tyk Dashboard.

Where there is a conflict, for example when a policy is associated with multiple APIs and the user owns only one of those APIs, the user will have access to the object (though not the other APIs themselves). 

#### API Ownership example
Imagine that you have two APIs: API1, API2.
You have three teams which have different roles and responsibilities as follows:
- **TeamA** which must have access to configure API1 
- **TeamB** which must have access to configure API2
- **TeamAnalytics** which should only have access to view the analytics for both API1 and API2 

To implement this structure, you would create three user groups and assign [permissions]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) as indicated:
- **TeamA** requires `"apis": "write"` 
- **TeamB** requires `"apis": "write"` 
- **TeamAnalytics** requires `"analytics": "read"` 

Having configured the user groups, you can then assign API ownership as follows:
- API1 - **TeamA**, **TeamAnalytics** 
- API2 - **TeamB**, **TeamAnalytics**

Thus:
**TeamA** will have API `write` access only to API1
**TeamB** will have API `write` access only to API2
**TeamAnalytics** will have Analytics `read` access to both APIs

### Enabling API Ownership
API Ownership must be enabled in your Tyk Dashboard configuration, which you can do using either of the following approaches:
 - set `enable_ownership` to `true` in your `tyk_analytics.conf`
 - set the `TYK_DB_ENABLEOWNERSHIP` environment variable to `true`

### Owned Analytics
Access to Tyk Dashboard's [traffic analytics]({{< ref "tyk-dashboard-analytics" >}}) is controlled via the `analytics` permission in the user or user group access control configuration. The default behaviour of this control is to grant or restrict access to all traffic analytics and does not take into account API ownership.

The additional `owned_analytics` permission was added in Tyk Dashboard v5.1 (and LTS patches v4.0.14 and v5.0.3) to provide more granular access to traffic analytics. By configuring this permission, the user (or user group) will gain visibility only of those analytics that can be filtered by API (due to the method Tyk Pump uses to aggregate the analytics records).

Currently, only [API Usage]({{< ref "tyk-dashboard-analytics/traffic-per-api" >}}) and [Error Counts]({{< ref "tyk-dashboard-analytics/error-overview" >}}) are available to users with the `owned_analytics` permission.

Note that the `owned_analytics` permission depends upon the `analytics` permission being granted (set to `read`) - without this, the more granular control is ignored and the user will not have visibility of any Tyk Dashboard analytics.

In the Dashboard UI, the control for `owned_analytics` is implemented as a drop-down option (`all` or `owned`) on the `analytics` permission.
{{< img src="/img/dashboard/analytics/owned_analytics.png" alt="Permissions with API Ownership" >}}

## Managing API owners using the Dashboard UI
The Dashboard UI provides a simple method for managing *ownership* for your APIs, where you can select from the lists of users and user groups that have been created in the Dashboard. Users and user groups are managed in separate lists for ease of use.

#### Using Tyk OAS APIs
When using Tyk OAS APIs, the option to assign owner(s) to an API is provided on the **Access** tab in the API Designer. You simply select the owner (or owners) that you wish to assign to the API from the drop-down boxes:
{{< img src="/img/dashboard/endpoint-designer/ownership-oas.png" alt="API ownership section for Tyk OAS APIs" >}}

You can remove owners from the API by clicking on the `x` next to their name in the drop-down/selection box.

#### Using Tyk Classic APIs
When using Tyk Classic APIs, the option to assign owner(s) to an API is provided on the **Core Settings** tab in the API Designer. You simply select the owner (or owners) that you wish to assign to the API from the drop-down boxes:
{{< img src="/img/dashboard/system-management/api_ownership.png" alt="API ownership section for Tyk Classic APIs" >}}

You can remove owners from the API by deselecting them from the drop-down.

## Managing API owners using the Dashboard API
The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) provides endpoints to manage API ownership directly, if you are not using the API Designer.

#### Using Tyk OAS APIs
When working with Tyk OAS APIs, you can manage owners for an API using these endpoints:

| Method | Endpoint path           | Action                                                                                 |
|--------|-------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/apis/{apiID}/access`  | Assign a list of owners to the specified API                                           |
| `GET`  | `/apis/{apiID}/access`  | Retrieve the list of owners of the specified API                                       |

For each of these endpoints, the payload consists of two string lists: one for user IDs, the other for user group IDs.
```json
{
  "userIds": [
    "string"
  ],
  "userGroupIds": [
    "string"
  ]
}
```

#### Using Tyk Classic APIs
When working with Tyk Classic APIs, you manage owners for an API by modifying the `user_owners` and `user_group_owners` fields in the API definition and then updating the API in Tyk with that using these endpoints:

| Method | Endpoint            | Action                                                                                                                |
|--------|---------------------|-----------------------------------------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/{apiID}` | Update the API definition for the specified API - CRUD API owners in the `user_owners` and `user_group_owners` fields |
| `GET`  | `/api/apis/{apiID}` | Retrieve the API definition for the specified API - ownership details are included in `user_owners` and `user_group_owners` fields |
