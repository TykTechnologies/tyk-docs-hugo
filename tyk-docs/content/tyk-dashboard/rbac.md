---
title: "Role Based Access Control (RBAC)"
date: 2020-04-17
menu:
  main:
    parent: "Tyk Dashboard"
weight: 105
url: "/tyk-dashboard/rbac"
aliases:
  - getting-started/key-concepts/rbac
---

## Understanding the concept of users and permissions


When you start the Tyk Dashboard the first time, the initial bootstrap screen creates a user for you and gives them admin permissions, which allows them access to everything. When you create other users, they can be assigned certain permissions to ensure that they only have very specific access to the Dashboard pages and the underlying APIs. You can specify to either "deny access", make it "read only", or allow "write access". See [User Roles](/basic-config-and-security/security/dashboard/user-roles/) for more details.

For example, you can have a user who has access only to the Analytics, or only to viewing API configurations, but not to modify them. If you are working on a small project or only have a few people who access your Tyk Dashboard, managing single users is the simplest option. This functionality is available in all Tyk installations by default.

### Managing groups of users

If you have multiple people with the same permissions set, you can create a User Group, which essentially is a permissions template. When you create a user, instead of setting their permissions, you can instead assign them to a group. If you update the permissions of the user group, all the users assigned to it get those updated permissions. Additionally, if you deactivate the user group, all users in it will be disabled as well. This feature is enabled for all Tyk SaaS users. For On-Premises installations, this feature is available for customers with at least a 5-node or Cloud Native Unlimited-node license.

## Multi-team setup using API Ownership

If you have multiple teams inside your organisation, where each team maintains its own APIs and you want to limit access of the dashboard to the team level, you should use our API ownership feature. For each API, you can assign owners, where an owner can be either an individual user or user group. Only owners have access to these APIs, and objects created based on them like policies or analytics.

![User Groups](/img/dashboard/system-management/api_ownership.png)

Our API Ownership concept is implemented for most of the Dashboard functionally. For example, if a user is the owner of the API and has enough permissions, they can access all the policies which contain their APIs, see the developers who subscribed their policies, manage key requests only for their APIs, and so forth. 

When there is no owner assigned, APIs and objects using it are visible to all users. When there is a conflict, for example when a policy has multiple APIs, and the user owns only one of those APIs, they will have access to the object. 

### Enabling API Ownership

For On-Premises installations, API Ownership is available for customers with at least a 5-node or Cloud Native Unlimited-node license.

In order to enable API Ownership for On-Premises installations, you need to set `enable_ownership` to `true` in your `tyk_analytics.conf` or set the `TYK_DB_ENABLEOWNERSHIP` environment variable. 

API Ownership is enabled for all Tyk SaaS users.

### API Ownership setup example

Our goal is to have three teams:
 
- TeamA - which has access to configure API1 
- TeamB - which has access to configure API2
- TeamAnalytics - which should only have access to viewing analytics for both API1 and API2. 

To implement this structure, you need to create three user groups:

- TeamA - which requires API related permissions set to "write" mode. 
- TeamB - same permissions as TeamA 
- TeamAnalytics - Analytics permission should be set to "read" mode, the rest to "deny". 

After you need to assign the owner to your APIs: 

- For API1 - TeamA, TeamAnalytics 
- For API2 - TeamB, TeamAnalytics

## Multi-tenant environments 

An example of a multi-tenant platform is our own Tyk SaaS installation where there are many distinct organisations which should not share any data. Another example can be an organisation with a complex structure, like a lot of distinct departments, where each department has its own teams. Additionally, this approach can be useful if you need to manage multiple environments like Production, Staging, QA, etc, using a single Tyk Dashboard which is a common case with multidata center setup. 

To create multiple Organisations, you should use our [Tyk Dashboard Admin Organisations API](/tyk-apis/tyk-dashboard-admin-api/organisations/). Each organisation has its own set of resources, like users, APIs, etc. If the same user needs belongs to multiple organisations, you can create a user with the same credentials in both organisations and setting the `enable_multi_org_users` flag in `tyk_analytics.conf` or setting the `TYK_DB_ENABLEMULTIORGUSERS` environment variable. 

When this flag is enabled, during the login flow, the user will see an additional page asking them to pick an organisation. Additionally, in the top right navigation menu, a user will have an additional drop-down to switch between organisations quickly. 

Tyk allows each organisation to own its set of Gateways, for example when you want to use different hosting providers, segregate them in terms of resources, or just for security reasons. 

On-Premises users should use [API tagging](/advanced-configuration/manage-multiple-environments/with-tyk-on-premises/), and through internal communication enforce a tagging standard across all organisations. 

MDCB users do not need to use API tagging since each Gateway cluster connects to the MDCB layer using their credentials and loads only the resources owned by the organisation specified in the credentials. This feature is enabled for all Tyk SaaS users. For On-Premises installations, this feature is available for customers with at least a 5-node or Cloud Native Unlimited-node license.

## Single Sign-On integration

If you already have an identity management server inside your organisation, it is possible to integrate it with the Tyk Dashboard. See our detailed [SSO guide](/advanced-configuration/integrate/sso/) for more info. In the context of user permissions, by default, all users who login via SSO, get admin permissions. You can change this behaviour by setting either default permissions or [creating a default user group](/basic-config-and-security/security/dashboard/create-user-groups/) in the Tyk Dashboard config. It is possible to pick different user groups for different SSO users by dynamically mapping user scopes to the Dashboard user groups. See our [example configuration](#api-ownership-setup-example).

Additionally, if you want to maintain an individual set of permissions for your users, you can create a user manually in the Dashboard with the required permissions, so during the SSO login flow, if a user with the same email address is found in the existing organisation, their permissions are re-used. This behaviour is enabled by setting the `sso_enable_user_lookup` flag in `tyk_analytics.conf` or setting the `TYK_DB_SSOENABLEUSERLOOKUP` environment variable. 

For Tyk SaaS users SSO functionality is a separate paid for add-on. For On-Premises installations, SSO functionality is available for all license types.