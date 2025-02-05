---
title: "User management with Tyk Dashboard"
date: 2025-01-10
tags: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
aliases:
  - /getting-started/key-concepts/rbac
  - /tyk-dashboard/rbac
  - /reference-docs/user-roles
  - /basic-config-and-security/security/dashboard/user-roles
  - /basic-config-and-security/security/dashboard/create-users
  - /basic-config-and-security/security/dashboard/create-user-groups
  - /basic-config-and-security/security/dashboard/search-users
  - /basic-config-and-security/security/password-policy
  - /product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership
---

## Introduction 

Tyk Dashboard provides you with the ability to manage Users, Teams and Permissions enabling organizations to maintain robust control over access and visibility. These capabilities empower teams to manage large-scale API portfolios, mitigate risks of unauthorized access, and reduce operational complexity.

In this section, we delve into the following key topics: 

1. **[Managing Users]({{< ref "#manage-tyk-dashboard-users" >}})**: 
    Streamlining user administration by creating, updating, and deactivating accounts within the Tyk Dashboard using both the UI and API.
2. **[Managing User Permissions]({{< ref "#user-permissions" >}})**: 
    Configuring and enforcing role-based access control for users within the Tyk Dashboard, using both the API and UI.  
3. **[Managing User Groups/Teams]({{< ref "#manage-tyk-dashboard-user-groups" >}})**: 
    Organizing users into groups or teams to simplify role assignment, permissions management, and collaborative workflows within the Tyk Dashboard.
4. **[Managing Passwords and Policy]({{< ref "#manage-user-passwords" >}})**: 
    Establishing and enforcing password policies, including complexity and expiration settings, to secure user accounts.  
5. **[Configuring API Ownership]({{< ref "#api-ownership" >}})**: 
    Applying role-based access control to APIs to govern visibility and manageability for specific teams or users.
6. **[Managing Users across Multiple Tyk Organizations]({{< ref "#manage-tyk-dashboard-users-in-multiple-organizations" >}})**: 
    Administering user access and roles across multiple organizations, ensuring consistent and secure management in multi-tenant setups.  
7. **[Single Sign-On]({{< ref "#single-sign-on-integration" >}})**: 
    Integrating and configuring Single Sign-On (SSO) solutions to streamline authentication and enhance security across the Tyk Dashboard.  

<br>
{{< note success >}}
**Note**  

The availability of some features described in this section depends on your license.
<br>
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}} 

## Understanding "User" in Tyk

In the context of Tyk, a User refers to an individual responsible for managing, configuring, and maintaining the Tyk API Gateway and its related components. These users interact with the Tyk Dashboard and API to control various aspects such as API management, user permissions, security policies, and organizational settings. This term does not refer to end-users or consumers of the APIs managed through Tyk but specifically to administrators and developers operating the Tyk ecosystem.

## Initial Admin User Creation

When you start the Tyk Dashboard the first time, the bootstrap process creates an initial "user" for you with admin permissions, which allows them access to control and configure everything in the Dashboard (via the UI or Tyk Dashboard API).

## Manage Tyk Dashboard Users

Dashboard users have twofold access to the dashboard: they can access both the Dashboard API and the dashboard itself, it is possible to generate users that have read-only access to certain sections of the dashboard and the underlying API.

Dashboard users are not the same as developer portal users (a.k.a. [developers]({{< ref "tyk-developer-portal/tyk-portal-classic/portal-concepts#developers" >}})). The credentials are stored independently and have different mechanics relating to registration, management and access. For example, it is not possible to log into the developer portal using a dashboard account.

### Using Dashboard UI

To create a dashboard user from the GUI:

1. **Select "Users" from the "System Management" section**

    {{< img src="/img/2.10/users_menu.png" alt="Users menu" >}}

2. **Click "ADD USER"**

    {{< img src="/img/2.10/add_user.png" alt="Add user button location" >}}

3. **Add the user's basic details**

    {{< img src="/img/2.10/user_basic_details.png" alt="User form" >}}

    In this section:

    *   **First Name**: The user's first name.
    *   **Last Name**: The user's last name.
    *   **Email**: The email address of the user, this will also be their login username.
    *   **Password**: The password to assign to the user, this will automatically be hashed and salted before storing in the database. **NOTE** you need to inform the user about the password you have created for them.
    *   **Active**: Must be true for the user to have access to the dashboard or the dashboard API.

4. **Set the user permissions**

    {{< img src="/img/2.10/user_permissions.png" alt="Admin checkbox location" >}}

    You can be very specific with regards to which pages and segments of the Dashboard the user has access to. Some Dashboard pages require access to multiple parts of the API, and so you may get errors if certain related elements are disabled (e.g. APIs + Policies)

    Permissions are set and enforced when they are set on this page. They can either be **read** or **write**. If  set to **deny** then the record is non-existent in the object (there is no explicit "deny"). This means that if you set **deny** on all options it looks as if they have not been written, but they will still be enforced so long as even one read or write option has been set.

5. **Click "Save"**

    {{< img src="/img/2.10/users_save.png" alt="Save button location" >}}

    The user will automatically be created, as will their API Access token, which you will be able to retrieve by opening the user listing page again and selecting the user's username.

### Using Dashboard API

To authenticate requests to the Tyk Dashboard API, you will need to provide an API Key in the `Authorization` header.

This is your **Tyk Dashboard API Access Credentials**, which can be found on the user detail page:

{{< img src="/img/2.10/user_credentials.png" alt="API key and RPC key locations" >}}

You can [create a user]({{< ref "api-management/dashboard-configuration#add-user" >}}) with a call to the `POST /api/users` endpoint, for example:

``` bash
curl -H "Authorization: {YOUR-TYK-DASHBOARD-API-ACCESS-CREDENTIALS}" \
 -s \
 -H "Content-Type: application/json" \
 -X POST \
 -d '{
  "first_name": "Test",
  "last_name": "User",
  "email_address": "test@testing.com",
  "active": true,
  "user_permissions": {
      "IsAdmin": "admin"
  },
  "password": "thisisatest"
 }' http://{your-dashboard-host}:{port}/api/users | python -mjson.tool
```

In this example, we have given the user Admin privileges. To see a detailed breakdown of permission objects, please see below.

You will see the following response to confirm that the user has been created:

```json
{
  "Message": "User created",
  "Meta": null,
  "Status": "OK"
}
```

The user is now active.

## Manage User Passwords
You can change your password in these circumstances:

*  If you have forgotten your password
*  If you wish to change your password

### Forgotten Your Password?
If you have forgotten your password, you can request a password reset email from the **Dashboard Login** screen:

{{< img src="/img/2.10/dashboard_login.png" alt="password reset email" >}}

Enter your login email address, and you will receive an email with a link that enables you to create a new password.

{{< note success >}}
**Note**

This link will only be valid for 1000 seconds
<br/>
You will need to configure your [outbound email settings]({{< ref "configure/outbound-email-configuration" >}}) to enable this feature.
{{< /note >}}

### Change Your Password
If you wish to change your current password, from the **System Management > Users** screen, select **Edit** for your Username.

{{< note success >}}
**Note**

You will not be able to change the password for other Dashboard users.
{{< /note >}}

From your user details, click **Reset Password**:

{{< img src="/img/2.10/user_reset_password.png" alt="reset password button" >}}
Enter your current and new password (and confirm it) in the dialog box that is displayed, and click **Reset Password**.
You will automatically be logged out of the Dashboard and will have to enter your username and new password to log back in.

## Manage Tyk Dashboard User Groups

Tyk has a flexible [user permissions]({{< ref "api-management/user-management#user-permissions" >}}) system that provides Role Based Access Control (RBAC) for your Tyk Dashboard.

When you have a large number of users and teams with different access requirements, instead of setting permissions per *user*, you can create a *user group* and configure the permissions for all users in the group. For example, if you only want certain *users* to access the Tyk Logs, you could create a "Logs Users" *user group*, then give those users the *Logs Read* permission and add them to your *Logs Users* group.

Note that **a user can only belong to one group**.

You must have either *admin* or *user groups* permission to be able to modify user groups.

This also works for Single Sign-On (SSO), as you can specify the user group ID when setting up SSO.

{{< note success >}}
**Note**

The availability of this feature depends on your license.
<br>
For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}}


### Using Dashboard UI

1. **Select "User Groups" from the "System Management" section**

    {{< img src="/img/2.10/user_groups_menu.png" alt="User group menu" >}}

2. **Click "ADD NEW USER GROUP"**

    {{< img src="/img/2.10/add_user_group.png" alt="Add user group location" >}}

3. **Add User Group Name**

    Enter the name for your User Group, and an optional Description.

    {{< img src="/img/2.10/user_group_details.png" alt="Add name" >}}

4. **Set User Group Permissions**

    Selet the User Group Permissions you want to apply.

    {{< img src="/img/2.10/user_group_permissions.png" alt="Add permissions" >}}

5. **Click "Save" to create the Group**

    {{< img src="/img/2.10/user_group_save.png" alt="Click Save" >}}

6. **Add Users to your Group**

    1. From the **Users** menu, select **Edit** from the **Actions** drop-down list for a user to add to the group.
    2. Select your group from the **User group** drop-down list.

    {{< img src="/img/2.10/user_select_group.png" alt="select user group" >}}

    Click Update to save the User details

    {{< img src="/img/2.10/user_reset_password.png" alt="update user" >}}

### Using Dashboard API

You can also manage User Groups via our [Dashboard API]({{< ref "api-management/dashboard-configuration#user-groups-api" >}}). The following functions are available:

* [List all User Groups]({{< ref "api-management/dashboard-configuration#list-user-groups" >}})
* [Get a User Group via the User Group ID]({{< ref "api-management/dashboard-configuration#get-user-group" >}})
* [Add a User Group]({{< ref "api-management/dashboard-configuration#add-user-group" >}})
* [Update a User Group]({{< ref "api-management/dashboard-configuration#update-user-group" >}})
* [Delete a User Group]({{< ref "api-management/dashboard-configuration#delete-user-group" >}})

## Search Users

You can search for a user (by email address) by entering the address in the search field. The user list will automatically refresh with that user being displayed.

{{< img src="/img/2.10/user_search.png" alt="User Profile Search" >}}

## Password Policy

Tyk allows you to control password requirements for Dashboard users, developers (i.e. users registered to the developer portal) and basic auth keys. 
Please note: This configuration is enforced by the Tyk-Dashboard and as such is not available in the Tyk Open Source Edition. Also, since it requires access to the Tyk Dashboard installation folder, it is *currently* not available for Tyk Cloud clients.

There are other security options available from the Dashboard config file. See the [security section]({{< ref "tyk-dashboard/configuration#security" >}}) for more details.

You can find the configuration files in the `schemas` directory of your Tyk Dashboard installation folder, as follows: 
- For Dashboard users you define policy in `schemas/password.json` 
- For developers you define policy in `schemas/developer_password.json`
- For basic auth keys you define policy in `./schemas/basic_auth.json`


The following validators are available:

*   `minLength` - sets minimum password length
*   `multiCase` - boolean, upper and lower case characters are required
*   `minNumeric` - minimum number of numeric characters
*   `minSpecial` - minimum number of special characters, like `@`, `$`, `%` etc.
*   `disableSequential` - boolean, disable passwords which include at least 3 sequential characters. For example: `abc`, `123`, `111`, `xxx` etc.

Below is an example of `password.json` file, with all options turned on:

```{.copyWrapper}
{
  "title": "User password schema",
  "type": "string",

  "minLength": 6,
  "multiCase": true,
  "minNumeric": 2,
  "minSpecial": 2,
  "disableSequential": true
}
```

## User Permissions

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

### User permissions in the Tyk Dashboard UI

User permissions are configured in the user detail view:

{{< img src="/img/2.10/user_permissions.png" alt="Admin account" >}}

The configuration of each property will affect the dashboard navigation, with `denied` sections or screens hidden or disabled. Note that some side-effects can occur if pages that make use of multiple APIs to fetch configuration data cross over e.g. policies and API Definition listings.

Selecting the **Account is Admin** checkbox from the Dashboard gives the user full access (it has the same [effect]({{< ref "api-management/user-management#admin-users" >}}) as the `IsAdmin` property).

### Custom User Permissions

You can create your own custom permissions for use with the [Open Policy Agent (OPA)]({{< ref "tyk-dashboard/open-policy-agent" >}}) using the [Additional Permissions]({{< ref "api-management/dashboard-configuration#additional-permissions-api" >}}) endpoint in the Tyk Dashboard Admin API. This allows you to add and delete (CRUD) a list of additional (custom) permissions for your Dashboard users. Once created, a custom permission will be added to standard list of user permissions. 

You can also configure these custom permissions in the `security.additional_permissions` [map]({{< ref "tyk-dashboard/configuration#securityadditional_permissions" >}}) in the Tyk Dashboard configuration file. 


## API Ownership

API Ownership is the concept of Role Based Access Control applied to the portfolio of APIs deployed on your Tyk Gateways and managed from your Tyk Dashboard. 

If you have multiple teams, where each team maintains its own APIs and you want to limit access of the dashboard to the team level. For each API, you can assign owners, where an owner can be either an individual user or user group. Only owners have access to these APIs, and objects created based on them like policies or analytics.

### Multi-team setup using API Ownership

{{< note success >}}
**Note**  

The availability of this feature [depends on your license]({{< ref "api-management/user-management#" >}}).
{{< /note >}} 

### When to use API Ownership
#### Governing a multi-team API portfolio
API ownership is a key capability when you have multiple API development teams each working on their own suite of APIs. You can use API Ownership to simplify the experience of those developers when accessing Tyk by reducing the "clutter" of APIs that they are not working with, and also to avoid the risk of users accidentally or maliciously interfering with another team's APIs.

#### Avoiding data leakage between users
The [user owned analytics]({{< ref "api-management/user-management#owned-analytics" >}}) feature allows you to prevent users from seeing the traffic to (and existence of) APIs for which they are not responsible. This reduces the opportunity for data leakage within your business.

### How API Ownership works
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

To implement this structure, you would create three user groups and assign [permissions]({{< ref "api-management/user-management#user-permissions" >}}) as indicated:
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

#### Enabling API Ownership
API Ownership must be enabled in your Tyk Dashboard configuration, which you can do using either of the following approaches:
 - set `enable_ownership` to `true` in your `tyk_analytics.conf`
 - set the `TYK_DB_ENABLEOWNERSHIP` environment variable to `true`

#### Owned Analytics
Access to Tyk Dashboard's [traffic analytics]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}}) is controlled via the `analytics` permission in the user or user group access control configuration. The default behavior of this control is to grant or restrict access to all traffic analytics and does not take into account API ownership.

The additional `owned_analytics` permission was added in Tyk Dashboard v5.1 (and LTS patches v4.0.14 and v5.0.3) to provide more granular access to traffic analytics. By configuring this permission, the user (or user group) will gain visibility only of those analytics that can be filtered by API (due to the method Tyk Pump uses to aggregate the analytics records).

Currently, only [API Usage]({{< ref "api-management/dashboard-configuration#activity-by-api" >}}) and [Error Counts]({{< ref "api-management/dashboard-configuration#activity-by-error" >}}) are available to users with the `owned_analytics` permission.

Note that the `owned_analytics` permission depends upon the `analytics` permission being granted (set to `read`) - without this, the more granular control is ignored and the user will not have visibility of any Tyk Dashboard analytics.

In the Dashboard UI, the control for `owned_analytics` is implemented as a drop-down option (`all` or `owned`) on the `analytics` permission.
{{< img src="/img/dashboard/analytics/owned_analytics.png" alt="Permissions with API Ownership" >}}

### Managing API owners using the Dashboard UI
The Dashboard UI provides a simple method for managing *ownership* for your APIs, where you can select from the lists of users and user groups that have been created in the Dashboard. Users and user groups are managed in separate lists for ease of use.

#### Using Tyk OAS APIs
When using Tyk OAS APIs, the option to assign owner(s) to an API is provided on the **Access** tab in the API Designer. You simply select the owner (or owners) that you wish to assign to the API from the drop-down boxes:
{{< img src="/img/dashboard/endpoint-designer/ownership-oas.png" alt="API ownership section for Tyk OAS APIs" >}}

You can remove owners from the API by clicking on the `x` next to their name in the drop-down/selection box.

#### Using Tyk Classic APIs
When using Tyk Classic APIs, the option to assign owner(s) to an API is provided on the **Core Settings** tab in the API Designer. You simply select the owner (or owners) that you wish to assign to the API from the drop-down boxes:
{{< img src="/img/dashboard/system-management/api_ownership.png" alt="API ownership section for Tyk Classic APIs" >}}

You can remove owners from the API by deselecting them from the drop-down.

### Managing API owners using the Dashboard API
The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) provides endpoints to manage API ownership directly, if you are not using the API Designer.

#### Using Tyk OAS APIs
When working with Tyk OAS APIs, you can manage owners for an API using these endpoints:

| Method | Endpoint path           | Action                                                                                 |
|--------|-------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/{apiID}/access`  | Assign a list of owners to the specified API                                           |
| `GET`  | `/api/apis/{apiID}/access`  | Retrieve the list of owners of the specified API                                       |

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

## Manage Tyk Dashboard Users in Multiple Organizations

If you have deployed multiple [Tyk Organizations]({{< ref "api-management/dashboard-configuration#organizations" >}}), you may have users that need access to more than one Organization (known as a "multi-org user"). **This functionality requires a specific Tyk license.**

To support multi-org users, you must first enable the feature in your Dashboard configuration by setting either of the following to `true`:
 - `"enable_multi_org_users"` in `tyk_analytics.conf`
 - `TYK_DB_ENABLEMULTIORGUSERS` environment variable

You then must create users in both Organizations with identical credentials.

During the login flow the user will see an additional page asking them to pick which available Organization they wish to log into. Once logged in, the user will have an additional drop-down in the top right navigation menu allowing them to switch between Organizations quickly. 

{{< note success >}}
**Note**

A user that does not belong to an Organization is sometimes referred to as an *unbounded user*. These users have visibility across all Organizations, but should be granted read-only access.
{{< /note >}}

## Single Sign-On integration
You can integrate your existing identity management server with the Tyk Dashboard, as explained in our detailed [Single Sign-On (SSO) guide]({{< ref "api-management/external-service-integration#single-sign-on-sso" >}}). **This functionality is available with all Tyk licenses except Tyk Classic Cloud.**

By default all users who login via SSO are granted admin permissions. You can change this behavior by setting either default permissions for *[users]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}})* or by creating a default *[user group]({{< ref "api-management/user-management#manage-tyk-dashboard-user-groups" >}})* to which all new users are assigned. With some IDPs you can automatically assign different SSO users to different *user groups* by dynamically mapping the IDP's user groups, for example with [Azure AD]({{< ref "api-management/external-service-integration#user-group-mapping" >}}).

If you want to maintain an individual set of permissions for your SSO users, you must first enable SSO user lookup in your Dashboard configuration by setting either of the following to `true`:
 - `"sso_enable_user_lookup"` in `tyk_analytics.conf`
 - `TYK_DB_SSOENABLEUSERLOOKUP` environment variable 

You must then create a *user* in the Dashboard with the required permissions and matching email address. During the SSO login flow, if a user with the same email address is found in the existing organization, their permissions are applied. 
