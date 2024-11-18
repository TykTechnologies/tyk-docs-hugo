---
date: 2017-03-27T12:22:13+01:00
title: Users
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 5 
aliases: /tyk-apis/tyk-dashboard-api/users/
---
{{< note success >}}
**Note**  

`USER_ID` is a placeholder for your User ID value.
{{< /note >}}


### List Users

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/users`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
GET /api/users HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "users": [
    {
      "api_model": {},
      "first_name": "John",
      "last_name": "Smith",
      "email_address": "john@jive.ly",
      "password": "$2a$10$mRVfrAf72N66anVNhA1KVuYaOwOrXhFzxyg6bwgZemUeVo2MNOpIa",
      "org_id": "54b53d3aeba6db5c35000002",
      "active": true,
      "id": "54b53d4bf25b920f09361526",
      "access_key": "0cf5e6c37add465a406f19807c081765",
      "user_permissions": {
                "IsAdmin": "admin",
                "ResetPassword": "admin"
      }
    },
    {
      "api_model": {},
      "first_name": "Test",
      "last_name": "User",
      "email_address": "banana@test.com",
      "password": "",
      "org_id": "54b53d3aeba6db5c35000002",
      "active": true,
      "id": "54bd0ad9ff4329b88985aafb",
      "access_key": "f81ee6f0c8f2467d539c132c8a422346",
      "user_permissions": {
                "user_groups": "read",
                "users": "read"
      }
    }
  ],
  "pages": 0
}
```

### Get User

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/users/{USER_ID}`  |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
GET /api/users/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
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

### Add User

{{< note success >}}
**Note**  

You can add a user via the API without a password by leaving out the `password` field. You then use [Set User Password](#set-user-password) request to add a password.
{{< /note >}}

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Add User**.

If you do set a password, you need to keep a record of it, to enable the password to be reset in the future.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/users`    |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
POST /api/users HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "first_name": "Jason",
  "last_name": "Jasonson",
  "email_address": "jason@jasonsonson.com",
  "active": true,
  "password": "thisisatest",
  "user_permissions": { "IsAdmin": "admin" }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User created",
  "Meta": ""
}
```

### Set User Password

If a user is created with a blank password, you will need to add a password in a second API call to set a password. In this scenario, the `current_password` field is not required. To change an current password, you need to know the existing password set in **Add User**.

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to **read** to use **Set User Password**.

| **Property** | **Description**                      |
| ------------ | -------------------------------------|
| Resource URL | `/api/users/{USER_ID}/actions/reset` |
| Method       | POST                                 |
| Type         | None                                 |
| Body         | Password Object                      |
| Param        | None                                 |

#### Sample Request

```{.copyWrapper}
POST /api/users/54c25e845d932847067402e2/actions/reset HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "current_password": "12345",
  "new_password":"test123456",
  "user_permissions": { "IsAdmin": "admin" }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User password updated",
  "Meta": ""
}
```

### Allow Reset Password

| **Property** | **Description**                                       |
| ------------ | ------------------------------------------------------|
| Resource URL | `/admin/users/{USER_ID}/actions/allow_reset_passwords`|
| Method       | PUT                                                   |
| Type         | None                                                  |
| Body         | None                                                  |
| Param        | None                                                  |

#### Sample Request
```{.copyWrapper}
PUT -H "admin-auth: <your secret>" http://<dashboard>/admin/users/{USER_ID}/actions/allow_reset_passwords
```

#### Sample Response
```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": 
    { …user object payload …}
}
```

### Disallow Reset Password

| **Property** | **Description**                                           |
| ------------ | ----------------------------------------------------------|
| Resource URL | `/admin/users/{USER_ID}/actions/disallow_reset_passwords` |
| Method       | PUT                                                       |
| Type         | None                                                      |
| Body         | None                                                      |
| Param        | None                                                      |

#### Sample Request
```{.copyWrapper}
PUT -H "admin-auth: <your secret>" http://<dashboard>/admin/users/{USER_ID}/actions/disallow_reset_passwords
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": 
    { …user object payload …}
}
```

### Update User

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Update User**.

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/users/{USER_ID}` |
| Method       | PUT                    |
| Type         | None                   |
| Body         | User Object            |
| Param        | None                   |

#### Sample Request

```{.copyWrapper}
PUT /api/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "first_name": "Jason",
  "last_name": "File",
  "email_address": "jason.file@jasonsonson.com",
  "active": true,
  "user_permissions": { "IsAdmin": "admin" }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": null
}
```

#### Reset User Session

This call allows you to reset a user's current Dashboard session.

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use this call.

{{< note success >}}
**Note**  

This also resets the user's Dashboard API credentials. 
{{< /note >}}

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/users/{USER_ID}/actions/key/reset`   |
| Method       | PUT                                        |
| Type         | None                                       |
| Body         | {"userId":"{USER_ID}"}                     |
| Param        | None                                       |

#### Sample Request

```{.copyWrapper}
PUT /api/users/54c25e845d932847067402e2/actions/key/reset HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "userId":"{USER_ID}"
}
```

#### Sample Response

```{.copyWrapper}
{
  "Status":"OK",
  "Message":"User session renewed",
  "Meta":null
}
```

### Delete User

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/users/{USER_ID}` |
| Method       | DELETE                 |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

#### Sample Request

```{.copyWrapper}
DELETE /api/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User deleted",
  "Meta": ""
}
```