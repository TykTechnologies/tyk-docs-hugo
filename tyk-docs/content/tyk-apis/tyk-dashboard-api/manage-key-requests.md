---
date: 2017-03-27T12:30:22+01:00
title: Manage Key Requests
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 9 
---

### List key requests

| **Property** | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| Resource URL | `/api/portal/requests`                               |
| Method       | GET                                                  |
| Type         | None                                                 |
| Body         | None                                                 |
| Param        | `p={page-num}` (optional, set to `-1` for no paging) |
| Param        | `approved={true or false}` (optional, returns `false` for Pending Key Requests, or `true` for Approved Key Requests) |



### Sample Request

```{.copyWrapper}
GET /api/portal/requests?p=0 HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data": [{
    "id": "5ad097c87af3f40001b27f40",
    "org_id": "xxxxxxxxxxxxxxxxxxxxx",
    "for_plan": "5a9847db3602190001f44427", // deprecated
    "apply_policies": ["5a9847db3602190001f44427"],
    "by_user": "5a9ea3a019efc400011107ae",
    "fields": {},
    "approved": false,
    "date_created": "2018-04-13T11:43:04.698Z",
    "version": "v2",
    "jwt_secret": "",
    "portal_developer": {
        "id": "5a9ea3a019efc400011107ae",
        "email": "xxx@zzz.io",
        "date_created": "2018-03-06T14:20:16.876Z",
        "inactive": false,
        "org_id": "57ecd735f467ac0001000003",
        "keys": {
            "<key-id>": ["<policy-id>"],
        },
        "subscriptions": {
            "<policy-id>": "<key-id>",
        },
        "fields": {},
        "nonce": "",
        "sso_key": ""
    },
    "catalogue_entry": {
        "name": "New catalogue",
        "short_description": "",
        "long_description": "",
        "show": true,
        "api_id": "",
        "policy_id": "5a9847db3602190001f44427",
        "documentation": "5acd2f1b4242d10001ab2cbc",
        "version": "v2",
        "config": {
          "id": "",
          "org_id": "",
          "signup_fields": [],
          "key_request_fields": [],
          "require_key_approval": false,
          "redirect_on_key_request": false,
          "redirect_to": "",
          "disable_login": false,
          "disable_signup": false,
          "disable_auto_login": false,
          "catalogue_login_only": false,
          "mail_options": {
            "mail_from_name": "",
            "mail_from_email": "",
            "email_copy": {
              "welcome_email": {
                "enabled": false,
                "subject": "",
                "body": "",
                "sign_off": "",
                "hide_token_data": false
              },
              "key_email": {
                "enabled": false,
                "subject": "",
                "body": "",
                "sign_off": "",
                "hide_token_data": false
              }
            }
          },
          "override": false
      }
    }

  }],
  "Pages": 0
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

```{.copyWrapper}
GET /api/portal/requests/554c789030c55e4ca0000002 HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id": "554c789030c55e4ca0000002",
  "org_id": "53ac07777cbb8c2d53000002",
  "by_user": "554c733a30c55e4b16000002",
  "fields": {},
  "approved": true,
  "date_created": "2015-05-08T04:49:20.992-04:00",
  "version": "v2",
  "for_plan": "554c789030c55e4ca0101002", // deprecated
  "apply_policies": ["554c789030c55e4ca0101002"]
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

```{.copyWrapper}
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

```{.copyWrapper}
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
  "for_plan": "554c789030c55e4ca0101002", // deprecated
  "apply_policies": ["554c789030c55e4ca0101002"],
  "version": "v2"
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

```{.copyWrapper}
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
