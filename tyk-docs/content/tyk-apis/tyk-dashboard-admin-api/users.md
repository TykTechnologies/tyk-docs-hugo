---
date: 2017-03-27T12:43:59+01:00
title: Dashboard Admin API Users
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 2 
---


{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
{{< /warning >}}

### Get User

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/admin/users/{USER_ID}` |
| Method       | GET                       |
| Type         | None                      |
| Body         | None                      |
| Param        | None                      |

#### Sample Request

```{.copyWrapper}
GET /admin/users/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```
{
  "api_model": {},
  "first_name": "Test",
  "last_name": "User",
  "email_address": "banana@test.com",
  "password": "",
  "org_id": "54b53d3aeba6db5c35000002",
  "active": true,
  "id": "54bd0ad9ff4329b88985aafb",
  "access_key": "f81ee6f0c8f2467d539c132c8a422346"
}
```

### Add user

When you add a new user, they are created without a password being set. After adding a user, you need to use the [Set Password]({{< ref "tyk-dashboard-api/users#set-user-password" >}}) call to set a password using the `user-id` created.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/admin/users`  |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
POST /admin/users HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "org_id": "5d15d3068ba30a0001621bfe",
  "first_name": "Jason",
  "last_name": "Jasonson",
  "email_address": "jason@jasonsonson.com",
  "active": true,
  "user_permissions": { "IsAdmin": "admin" }
}
```

{{< note success >}}
**Note**  

You can also create a user without an `org_id`. This will create a "Super User", who has global access to all APIs, Policies, etc, for all organizations created within Tyk.
{{< /note >}}


#### Sample Response

```
{
  "Status": "OK",
  "Message": "e5485fa02e12425974e1220e1636e4d0",
  "Meta": {
    "api_model": {},
    "first_name": "Jason",
    "last_name": "user",
    "email_address": "jason@jasonsonson.com",
    "org_id": "",
    "active": true,
    "id": "5d55378edd4b9e9c308e87da",
    "access_key": "e5485fa02e12425974e1220e1636e4d0",
    "user_permissions": {
      "IsAdmin": "admin"
    },
    "group_id": "",
    "password_max_days": 0,
    "password_updated": "0001-01-01T00:00:00Z",
    "PWHistory": [],
    "created_at": "2019-08-15T10:44:30.784Z"
  }
}
```


### Update User

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Update User**.

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/admin/users/{USER_ID}` |
| Method       | PUT                      |
| Type         | None                     |
| Body         | User Object              |
| Param        | None                     |


#### Sample Request

```{.copyWrapper}
PUT /admin/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "access_key": "3a8c1cea90af485575bb5455c2e9fb68",
  "first_name": "Jason",
  "last_name": "File",
  "email_address": "jason.file@jasonsonson.com",
  "active": true,
  "password": "plaintext_password",
  "user_permissions": { "IsAdmin": "admin" }
}
```

{{< note success >}}
**Note**  

If you are modifying a user password, you will need to include an access_key in the body of your request. This can be obtained from doing a GET to the same Resource URL.
{{< /note >}}

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": ""
}
```
