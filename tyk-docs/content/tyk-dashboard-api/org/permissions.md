---
date: 2017-03-27T12:13:12+01:00
title: Additional Permissions API
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 5 
aliases: /tyk-apis/tyk-dashboard-api/org/permissions
---
{{< note success >}}
**Note**  

This API helps you to add and delete (CRUD) a list of additional (custom) permissions for your Dashboard users.
Once created, a custom permission will be added to standard list of user permissions.
<br/>
Only Admin Dashboard users will be authorised to use this API.
{{< /note >}}


### List Additional Permissions
This API returns by default the initial set of additional permissions defined in your Tyk Dashboard configuration, under [security.additional_permissions]({{< ref "tyk-dashboard/configuration#securityadditional_permissions" >}}).

Once you update the permissions via the API, they will be stored at organisation level.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/api/org/permissions`|
| Method       | GET                   |
| Type         | None                  |
| Body         | None                  |
| Param        | None                  |

#### Sample Request

```{.copyWrapper}
GET /api/org/permissions HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "additional_permissions": {
    "api_developer": "API Developer",
    "api_manager": "API Manager"
  }
}
```
### Add/Delete/Update Additional Permission

{{< note success >}}
**Note**  

Whenever you want to add/update/delete an additional permission, just send back the updated list of permissions, through a PUT request to the API.
{{< /note >}}


| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/org/permission`    |
| Method       | PUT                      |
| Type         | None                     |
| Body         | Permissions Object       |
| Param        | None                     |

#### Sample Request

Let's imagine we have already defined two additional permissions: `api_developer` and `api_manager`. In order to add a new permission to this list, just send 
an updated list of permissions by appending the values you want. In this example we will add a `custom_permission` permission.

```{.copyWrapper}
PUT /api/org/permissions HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "additional_permissions": {
    "api_developer": "API Developer",
    "api_manager": "API Manager",
    "custom_permission": "Custom Permission"
  }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Additional Permissions updated in org level",
  "Meta": null
}
```