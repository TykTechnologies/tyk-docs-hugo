---
date: 2017-03-27T12:30:22+01:00
title: Manage Key Requests
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 8 
---

### List key requests

| **Property** | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| Resource URL | `/api/portal/requests`                               |
| Method       | GET                                                  |
| Type         | None                                                 |
| Body         | None                                                 |
| Param        | `p={page-num}` (optional, set to `-1` for no paging) |

### Sample Request

```
    GET /api/portal/requests?p=0 HTTP/1.1
    Host: localhost
    authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
    {
        "Data": [
            {
                "_id": "554c789030c55e4ca0000002",
                "approved": true,
                "by_user": "554c733a30c55e4b16000002",
                "date_created": "2015-05-08T04:49:20.992-04:00",
                "fields": {
                    "custom1": "sdf",
                    "custom2": "sdf"
                },
                "for_api": "",
                "org_id": "53ac07777cbb8c2d53000002",
                "version: "v2",
                "for_plan": "554c789030c55e4ca0101002"
            },
            {
                "_id": "5527e9ef30c55e7a2c000005",
                "approved": true,
                "by_user": "5527e9e430c55e7a2c000004",
                "date_created": "2015-04-10T11:19:11.77-04:00",
                "fields": {
                    "custom1": "sdf",
                    "custom2": "sdf"
                },
                "for_api": "b605a6f03cc14f8b74665452c263bf19",
                "org_id": "53ac07777cbb8c2d53000002",
                "version: ""
            },
            ...],
        "Pages": 2
    }
```

### Get a specific key request

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/portal/requests/{id}` |
| Method       | GET                         |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```
    GET /api/portal/requests/554c789030c55e4ca0000002 HTTP/1.1
    Host: localhost
    authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
    {
        "id": "554c789030c55e4ca0000002",
        "org_id": "53ac07777cbb8c2d53000002",
        "for_api": "",
        "by_user": "554c733a30c55e4b16000002",
        "fields": {},
        "approved": true,
        "date_created": "2015-05-08T04:49:20.992-04:00"
        "version: "v2",
        "for_plan": "554c789030c55e4ca0101002"
    }
```

### Approve a key request

| **Property** | **Description**                     |
| ------------ | ----------------------------------- |
| Resource URL | `/api/portal/requests/approve/{id}` |
| Method       | PUT                                 |
| Type         | None                                |
| Body         | None                                |
| Param        | None                                |

#### Sample Request

```
    PUT /api/portal/requests/approve/554c789030c55e4ca0000002 HTTP/1.1
    Host: localhost
    authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
    {
        "RawKey":"53ac07777cbb8c2d5300000215811f02c21540dd5257eb68d3d73f35"
    }
```

### Create a key request

Key requests are an easy way to associate developer accounts with new policies, they do not need to be linked to API Catalogue entries, they represent an instruction to Tyk to combine a generate a token with a specific policy ID, and to associate the token and policy with a specific developer account.

**It is now required to pass a version parameter of `v2` and `for_plan` if you wish to associate a key request with a policy ID** legacy key requests will continue to work, but could cause issues as this version is deprecated in future releases.

By default, all key requests created for new catalogue entries will be version 2.

| **Property** | **Description**        |
| ------------ | ---------------------- |
| Resource URL | `/api/portal/requests` |
| Method       | POST                   |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

#### Sample Request

```
    POST /api/portal/requests HTTP/1.1
    Host: localhost
    authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
    
    {
        "by_user": "554c733a30c55e4b16000002",
        "date_created": "2015-05-08T04:49:20.992-04:00",
        "fields": {
            "custom1": "sdf",
            "custom2": "sdf"
        },
        "for_plan": "554c789030c55e4ca0101002"
        "version: "v2"
    }
```

#### Sample Response

```
    {
        "Status":"OK",
        "Message":"554c789030c55e4ca0000002",
        "Meta":""
    }
```

### Delete a specific key request

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/portal/requests/{id}` |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```
    DELETE /api/portal/requests/554c789030c55e4ca0000002 HTTP/1.1
    Host: localhost
    authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
    {
        "Status":"OK",
        "Message":"Data deleted",
        "Meta":""
    }
```

