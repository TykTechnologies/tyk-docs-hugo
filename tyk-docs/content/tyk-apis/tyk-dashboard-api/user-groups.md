---
date: 2017-03-27T12:22:13+01:00
title: User Groups
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 6 
---

### List User Groups

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/usergroups`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
GET /api/usergroups HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "groups": [
    {
      "org_id": "54b53d3aeba6db5c35000002",
      "id": "54b53d4bf25b920f09361526",
      "name": "Analytics team",
      "description": "Only access to analytics pages",
      "active": true,
      "user_permissions": { "analytics": "read" }
    },
    {
      "org_id": "54b53d3aeba6db5c35000003",
      "id": "54b53d4bf25b920f09361527",
      "name": "Certificates team",
      "description": "Team to manage certificates",
      "active": true,
      "user_permissions": { "certificates": "write" }
    }
  ],
  "pages": 0
}
```

### Get User Group

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/usergroups/{user_group-id}`  |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
GET /api/usergroups/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "org_id": "54b53d3aeba6db5c35000002",
  "id": "54b53d4bf25b920f09361526",
  "name": "Certificates team",
  "description": "Team to manage certificates",
  "active": true,
  "user_permissions": { "certificates": "write" }  
}
```

### Add User Group



| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/usergroups`    |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
POST /api/usergroups HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "name": "Logs team",
  "description": "Logs team description",
  "user_permissions": { "logs": "read" }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User group created",
  "Meta": ""
}
```



### Update User Group

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/usergroups/{user_group-id}` |
| Method       | PUT                    |
| Type         | None                   |
| Body         | User Group Object            |
| Param        | None                   |

#### Sample Request

```{.copyWrapper}
PUT /api/usergroups/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "name": "Certificates Team 2",
  "description": "Another certificates team",
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User group updated",
  "Meta": null
}
```

### Delete User Group

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/usergroups/{user_group-id}` |
| Method       | DELETE                 |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

#### Sample Request

```{.copyWrapper}
DELETE /api/usergroups/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "User group deleted",
  "Meta": ""
}
```
