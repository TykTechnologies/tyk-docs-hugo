---
title: "User management with Tyk Dashboard"
date: 2020-04-17
description: "User management and Role Based Access Control"
tags: ["user management", "users", "user groups", "API governance", "role base access control", "RBAC", "Tyk Dashboard"]
aliases:
  - getting-started/key-concepts/rbac

---

When you start the Tyk Dashboard the first time, the bootstrap process creates an initial "user" for you with admin permissions, which allows them access to control and configure everything in the Dashboard (via the UI or Tyk Dashboard API).

You can create additional "users" for your colleagues who need to access Dashboard features. These additional users can be assigned [granular permissions]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) so that they only have access to the Dashboard pages (and corresponding Dashboard API endpoints) that they require. For each permission (or "role") you can "deny access", make it "read only", or allow "write access".

For example you might have a colleague who only needs to be able to access the Analytics, or another who only needs to be able to view API configurations, but not to modify them.

{{< note success >}}
**Note**  

The availability of some features described in this section depends on your license.
<br>
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}} 

## Managing Tyk Dashboard users
If you are working on a small project or only have a few people who access your Tyk Dashboard it is straightforward to [manage these users]({{< ref "basic-config-and-security/security/dashboard/create-users" >}}) individually. **This functionality is available with all Tyk licenses.**

## Managing groups of Tyk Dashboard users
If, however, you have multiple users who require the same set of permissions and you have the appropriate option in your Tyk license, you can create a *user group* to apply and [manage user permissions for multiple users]({{< ref "basic-config-and-security/security/dashboard/create-user-groups" >}}) from the same place. If you update the permissions of the user group, all the users assigned to it will automatically get those updated permissions. Additionally, if you deactivate the user group, all users in it will be disabled as well. **This functionality requires a specific Tyk license.**

## Multi-team setup using API Ownership
If you have multiple teams, where each team maintains its own APIs and you want to limit access of the dashboard to the team level, you should use our [API ownership]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership" >}}) feature. For each API, you can assign owners, where an owner can be either an individual user or user group. Only owners have access to these APIs, and objects created based on them like policies or analytics. **This functionality requires a specific Tyk license.**

## Managing Tyk Dashboard users in multi-org deployments
If you have deployed multiple [Tyk Organisations]({{< ref "basic-config-and-security/security/dashboard/organisations" >}}), you may have users that need access to more than one Organisation (known as a "multi-org user"). **This functionality requires a specific Tyk license.**

To support multi-org users, you must first enable the feature in your Dashboard configuration by setting either of the following to `true`:
 - `"enable_multi_org_users"` in `tyk_analytics.conf`
 - `TYK_DB_ENABLEMULTIORGUSERS` environment variable

You then must create users in both Organisations with identical credentials.

During the login flow the user will see an additional page asking them to pick which available Organisation they wish to log into. Once logged in, the user will have an additional drop-down in the top right navigation menu allowing them to switch between Organisations quickly. 

{{< note success >}}
**Note**

A user that does not belong to an Organisation is sometimes referred to as an *unbounded user*. These users have visibility across all Organisations, but should be granted read-only access.
{{< /note >}}

## Single Sign-On integration
You can integrate your existing identity management server with the Tyk Dashboard, as explained in our detailed [Single Sign-On (SSO) guide]({{< ref "advanced-configuration/integrate/sso" >}}). **This functionality is available with all Tyk licenses except Tyk Classic Cloud.**

By default all users who login via SSO are granted admin permissions. You can change this behaviour by setting either default permissions for *[users]({{< ref "basic-config-and-security/security/dashboard/create-users" >}})* or by creating a default *[user group]({{< ref "basic-config-and-security/security/dashboard/create-user-groups" >}})* to which all new users are assigned. With some IDPs you can automatically assign different SSO users to different *user groups* by dynamically mapping the IDP's user groups, for example with [Azure AD]({{< ref "tyk-stack/tyk-manager/sso/dashboard-login-azure-sso#user-group-mapping" >}}).

If you want to maintain an individual set of permissions for your SSO users, you must first enable SSO user lookup in your Dashboard configuration by setting either of the following to `true`:
 - `"sso_enable_user_lookup"` in `tyk_analytics.conf`
 - `TYK_DB_SSOENABLEUSERLOOKUP` environment variable 

You must then create a *user* in the Dashboard with the required permissions and matching email address. During the SSO login flow, if a user with the same email address is found in the existing organisation, their permissions are applied. 


