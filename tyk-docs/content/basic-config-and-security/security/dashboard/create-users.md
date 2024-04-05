---
date: 2017-03-23T14:59:47Z
title: Manage Tyk Dashboard Users
tags: ["Users", "role based access control", "RBAC", "access control", "Tyk Dashboard"]
description: "How to create users and set their permissions" 
menu:
  main:
    parent: "Dashboard"
weight: 2
---

Dashboard users have twofold access to the dashboard: they can access both the Dashboard API and the dashboard itself, it is possible to generate users that have read-only access to certain sections of the dashboard and the underlying API.

Dashboard users are not the same as developer portal users (a.k.a. [developers]({{< ref "tyk-developer-portal/tyk-portal-classic/portal-concepts#developers" >}})). The credentials are stored independently and have different mechanics relating to registration, management and access. For example, it is not possible to log into the developer portal using a dashboard account.

## Creating a Dashboard User

To create a dashboard user from the GUI:

### Step 1: Select "Users" from the "System Management" section

{{< img src="/img/2.10/users_menu.png" alt="Users menu" >}}

### Step 2: Click "ADD USER"

{{< img src="/img/2.10/add_user.png" alt="Add user button location" >}}

### Step 3: Add the user's basic details

{{< img src="/img/2.10/user_basic_details.png" alt="User form" >}}

In this section:

*   **First Name**: The user's first name.
*   **Last Name**: The user's last name.
*   **Email**: The email address of the user, this will also be their login username.
*   **Password**: The password to assign to the user, this will automatically be hashed and salted before storing in the database. **NOTE** you need to inform the user about the password you have created for them.
*   **Active**: Must be true for the user to have access to the dashboard or the dashboard API.

### Step 4: Set the user permissions

{{< img src="/img/2.10/user_permissions.png" alt="Admin checkbox location" >}}

You can be very specific with regards to which pages and segments of the Dashboard the user has access to. Some Dashboard pages require access to multiple parts of the API, and so you may get errors if certain related elements are disabled (e.g. APIs + Policies)

Permissions are set and enforced when they are set on this page. They can either be **read** or **write**. If  set to **deny** then the record is non-existent in the object (there is no explicit "deny"). This means that if you set **deny** on all options it looks as if they have not been written, but they will still be enforced so long as even one read or write option has been set.

### Step 5: Click "Save"

{{< img src="/img/2.10/users_save.png" alt="Save button location" >}}

The user will automatically be created, as will their API Access token, which you will be able to retrieve by opening the user listing page again and selecting the user's username.

## Creating a Dashboard User using the Dashboard API

To authenticate requests to the Tyk Dashboard API, you will need to provide an API Key in the `Authorization` header.

This is your **Tyk Dashboard API Access Credentials**, which can be found on the user detail page:

{{< img src="/img/2.10/user_credentials.png" alt="API key and RPC key locations" >}}

You can [create a user]({{< ref "tyk-dashboard-api/users#add-user" >}}) with a call to the `POST /api/users` endpoint, for example:

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

## Managing User Passwords
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
