---
date: 2017-03-27T12:28:24+01:00
title: Portal Developers
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 8 
---

### List developers

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/developers` |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/developers HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data": [
    {
      "_id": "554c733a30c55e4b16000002",
      "api_keys": {
        "b605a6f03cc14f8b74665452c263bf19": "90568dfa"
      },
      "date_created": "2015-05-08T04:26:34.287-04:00",
      "email": "test@test.com",
      "fields": {
        "Name": "Mondgo Brtian",
        "custom1": "Test",
        "custom2": "Test"
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002",
      "password": "$2a$10$ztUTWXmyrK6B5fdKoisohuhZlQ3P1weQZ2CBwR6HYw1rWyiBJ7ZSW"
    },
    {
      "_id": "5555ec63a8b6b60001000001",
      "api_keys": {},
      "date_created": "2015-05-15T08:53:54.873-04:00",
      "email": "foo@bar.com",
      "fields": {
        "Name": "Tes",
        "custom1": "",
        "custom2": ""
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002",
      "password": "$2a$10$8mGEdcow4dwVDAt4If.Sieps57oGZDwEVvwTNYq1J8FLba4fHw9Nu"
    },
    ...
  ],
  "Pages": 1
}
```

### List developers by API

| **Property** | **Description**                      |
| ------------ | ------------------------------------ |
| Resource URL | `/api/portal/developers/api/{apiID}` |
| Method       | GET                                  |
| Type         | None                                 |
| Body         | None                                 |
| Param        | None                                 |

#### Sample Request

```{.copyWrapper}
GET /api/portal/developers/api/ HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data": [
    {
      "_id": "554c733a30c55e4b16000002",
      "api_keys": {
        "b605a6f03cc14f8b74665452c263bf19": "9184c7d0"
      },
      "date_created": "2015-05-08T04:26:34.287-04:00",
      "email": "xxxx@xxxx.com",
      "fields": {
        "Name": "Mondgo Britain",
        "custom1": "Test",
        "custom2": "Test"
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002",
      "password": "$2a$10$ztUTWXmyrK6B5fdKoisohuhZlQ3P1weQZ2CBwR6HYw1rWyiBJ7ZSW"
    },
    {
      "_id": "5555ef2e24cb3e0001000001",
      "api_keys": {
        "b605a6f03cc14f8b74665452c263bf19": "90e670bc"
      },
      "date_created": "2015-05-15T09:05:50.675-04:00",
      "email": "xxxxxxx@yyyyy.io",
      "fields": {
        "Name": "Martin",
        "custom1": "test",
        "custom2": "test"
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002",
      "password": "$2a$10$MH.nxHBneFuuGTrVgfxeRecgmYNHVHm8Bo7DWVqY5o2anlPgJ2zWa"
    }
  ],
  "Pages": 0
}
```

### Update a developer record

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/developers/{id}` |
| Method       | PUT                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
GET /api/portal/developers/5555eceda8b6b60001000004 HTTP/1.1
Host: localhost
Authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
    
{
  "id": "5555eceda8b6b60001000004",
  "email": "blip@blop.com",
  "password": "$2a$10$hlG1ujAHWUpnM37k.l1RhO6RrxkCpXki2yrGhufnDs1IBiUo4Kzqy",
  "date_created": "2015-05-15T08:56:13.257-04:00",
  "inactive": false,
  "org_id": "53ac07777cbb8c2d53000002",
  "api_keys": {
    "b605a6f03cc14f8b74665452c263bf19":"90568dfa"
  },
  "fields": {
    "Name": "",
    "custom1": "",
    "custom2": ""
  }
}
```

#### Sample Response

```
{
  "Status":"OK",
  "Message":"Data updated",
  "Meta":""
}
```

### Delete a developer

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/developers/{id}` |
| Method       | DELETE                        |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
DELETE /api/portal/developers/554c733a30c55e4b16000002 HTTP/1.1
Host: localhost
Authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status":"OK",
  "Message":"Data deleted",
  "Meta":""
}
```

### Verify Developer Credentials

> **NOTE**: This functionality is available from v2.3.8 onwards

| **Property** | **Description**                             |
| ------------ | ------------------------------------------- |
| Resource URL | `/api/portal/developers/verify_credentials` |
| Method       | POST                                        |
| Type         | None                                        |
| Body         | None                                        |
| Param        | None                                        |

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/verify_credentials \
  -X POST \
  -H "authorization: $TYK_API_KEY" \
  -d \
  '{
     "username": "<developer-email>",
     "password": "<developer-password>"
   }'
```

If the user credentials are verified, the HTTP response code will be 200 (OK), otherwise credentials do match and a 401 error (Unauthorised) will be returned.

### Reset Developer Password

> **NOTE**: This functionality is available from v2.3.8 onwards

| **Property** | **Description**                             |
| ------------ | ------------------------------------------- |
| Resource URL | `/api//portal/developers/password/:Id`      |
| Method       | POST                                        |
| Type         | None                                        |
| Body         | None                                        |
| Param        | None                                        |

#### Sample Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/password/:Id \
-X POST \
-H "authorization: $TYK_API_KEY" \
-d \
'{
  "password": ""
}'
```

#### Sample Response - Password Changed

```
{
  "Message":"Password changed"
}
```

#### Sample Response - Incorrect Developer ID

```
{
  "Status": "Error", "Message":"Developer password validation failed."
}
```
