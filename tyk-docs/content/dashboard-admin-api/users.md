---
date: 2017-03-27T12:43:59+01:00
title: Admin API Users
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 2 
---


In order to make it easier to create and manage users in Tyk Dashboard, there is an Admin API version of the Users API that is not Organisation specific.

### Get User

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/admin/users/{user-id}}` |
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

If a user is created and the password is set to empty, it will be hashed. You need to have the `users` [Permission object](https://tyk.io/docs/security/dashboard/user-roles/#the-permissions-object) set to write to use **Add User**.

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
    "first_name": "Jason",
    "last_name": "Jasonson",
    "email_address": "jason@jasonsonson.com",
    "active": true,
    "password": "plaintext_password",
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

### Update User

> **Warning**: It is not possible to reset a user's password by updating the user record - please use the reset password functionality for this.

You need to have the `users` [Permission object](https://tyk.io/docs/security/dashboard/user-roles/#the-permissions-object) set to write to use **Update User**.

| **Property** | **Description**      |
| ------------ | -------------------- |
| Resource URL | `/admin/users/{uid}` |
| Method       | PUT                  |
| Type         | None                 |
| Body         | User Object          |
| Param        | None                 |


#### Sample Request

```{.copyWrapper}
PUT /admin/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
    "first_name": "Jason",
    "last_name": "File",
    "email_address": "jason.file@jasonsonson.com",
    "active": true,
    "password": "plaintext_password",
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