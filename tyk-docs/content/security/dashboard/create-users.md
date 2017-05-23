---
date: 2017-03-23T14:59:47Z
title: Create Users 
menu:
  main:
    parent: "Dashboard"
weight: 2 
---

Dashboard users have twofold access to the dashboard: they can access both the Dashboard API and the dashboard itself, it is possible to generate users that have read-only access to certain sections of the dashboard and the underlying API.

Dashboard users are not the same as developer portal users (“developers”), the user records are stored completely separately, and have different mechanics around user creation, management and access. For example, it is not possible to log into the developer portal using a dashboard account.

## <a name="with-dashboard"></a>Create a Dashboard User with the Dashboard

To create a dashboard user with the GUI is very easy:

### Step 1: Navigate to the users sections

![Users menu location][1]

### Step 2: Select *Add user*

![Add user button location][2]

### Step 3: Add the user's basic details

![User form][3]

In this section:

*   **First Name**: The user's first name.
*   **Last Name**: The user's last name.
*   **Email**: The email address of the user, this will also be their login username.
*   **Password**: The password to assign to the user, this will automatically be hashed and salted before storing in the database.
*   **Active**: Must be true for the user to have access to the dashboard or the dashboard API.

### Step 4: Select their permissions (admin)

![Admin checkbox location][4]

You can be very specific with regards to which pages and segments of the UI the user has access to. Some Dashboard pages require access to multiple parts of the API, and so you may get errors if certain related elements are disabled (e.g. APIs + Policies)

Permissions are set and enforced when they are set in this page, they can either be **read** or **write**, if they are set to **deny** then the record is non-existent in the object (there is no explicit "deny"). This means that if you set **deny** on all options it looks as if they have not been written, but they will still be enforced so long as even one read or write option has been set.

### Step 5: Save the user

![Save button location][5]

The user will automatically be created, as will their API Access token, which you will be able to retrieve by opening the user listing page again and selecting the user's username.

## <a name="with-api"></a>Create a Dashboard User with the API

To create a dashboard user with the API, we will first need some Dashboard API Credentials, these can be found in your user detail page, near the bottom of the page:

![API key and RPC key locations][6]

You will need the **API Key**.

Once you have your dashboard API Credentials, you can create a user very easily using the API, the following Curl command will generate a user:

```
    curl -H "Authorization: {YOUR-API-KEY}"
     -s
     -H "Content-Type: application/json"
     -X POST
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

The fields are quite self explanatory, in this case, we have given the user an Admin permission. To see a detailed breakdown of permission objects, please see below.

You will see the following response if all has gone to plan:

```
    {
        "Message": "User created",
        "Meta": null,
        "Status": "OK"
    }
```

The user is now active.

 [1]: /docs/img/dashboard/system-management/nav_users.png
 [2]: /docs/img/dashboard/system-management/addUserButton.png
 [3]: /docs/img/dashboard/system-management/userDetailsFields.png
 [4]: /docs/img/dashboard/system-management/adminAccount.png
 [5]: /docs/img/dashboard/system-management/saveUser.png
 [6]: /docs/img/dashboard/system-management/userCredentials.png
