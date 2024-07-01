---
date: 2017-03-27T12:28:24+01:00
title: Portal Developers
menu:
  main:
    parent: "Tyk Portal API"
weight: 3
aliases:
  - /tyk-dashboard-api/portal-developers/
---

### List Developers

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
      "keys": {
        "<key-id>": ["<policy-id>"]
      },
      "date_created": "2015-05-08T04:26:34.287-04:00",
      "email": "test@test.com",
      "fields": {
        "Name": "Mondgo Brtian",
        "custom1": "Test",
        "custom2": "Test"
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002"
    },
    {
      "_id": "5555ec63a8b6b60001000001",
      "keys": {},
      "date_created": "2015-05-15T08:53:54.873-04:00",
      "email": "foo@bar.com",
      "fields": {
        "Name": "Tes",
        "custom1": "",
        "custom2": ""
      },
      "inactive": false,
      "org_id": "53ac07777cbb8c2d53000002"
    },
    ...
  ],
  "Pages": 1
}
```

### Retrieve a developer object by ID

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/developers/{id}` |
| Method       | GET                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
GET /api/portal/developers/5e397e714ea461ef1d474efa HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id": "5e397e714ea461ef1d474efa",
  "email": "blip@blop.com",
  "date_created": "2020-02-04T16:23:44.936+02:00",
  "inactive": false,
  "org_id": "5a79019d4ea461cdd0c77480",
  "keys": {},
  "subscriptions": {},
  "fields": {},
  "nonce": "",
  "sso_key": "",
  "oauth_clients": {
    "5e397e804ea461ef1d474efb": [
      {
        "client_id": "bf27562a806d4ee1976c11b69e154a88",
        "secret": "NzNiY2M0NWYtNmIwMi00ZjE4LWJhODMtNTc3YzlhMmQyY2I3",
        "redirect_uri": "http://my_redirect_url",
        "app_description": "My App",
        "use_case": "My use case",
        "date_created": "2020-02-04T16:24:21.939+02:00"
      }
    ]
  },
  "password_max_days": 0,
  "password_updated": "2020-02-04T16:23:45.014+02:00",
  "PWHistory": [],
  "last_login_date": "2020-02-04T16:23:00Z"
}
```

### Add a Developer Record

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/developers` |
| Method       | POST                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
POST /api/portal/developers HTTP/1.1
Host: localhost
Authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
    
{
  "email": "blip@blop.com",
  "password": "$2a$10$hlG1ujAHWUpnM37k.l1RhO6RrxkCpXki2yrGhufnDs1IBiUo4Kzqy",
  "date_created": "2015-05-15T08:56:13.257-04:00",
  "inactive": false,
  "org_id": "53ac07777cbb8c2d53000002",
  "keys": {
    "<api-key>": ["<policy-id>"]
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
  "Message":"<developer-id>",
  "Meta":""
}
```



### Update a Developer Record

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/developers/{id}` |
| Method       | PUT                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/developers/5555eceda8b6b60001000004 HTTP/1.1
Host: localhost
Authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
    
{
  "id": "5555eceda8b6b60001000004",
  "email": "blip@blop.com",
  "password": "$2a$10$hlG1ujAHWUpnM37k.l1RhO6RrxkCpXki2yrGhufnDs1IBiUo4Kzqy",
  "date_created": "2015-05-15T08:56:13.257-04:00",
  "inactive": false,
  "org_id": "53ac07777cbb8c2d53000002",
  "keys": {
    "<key-id>": ["<policy-id>"]
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

### Delete a Developer

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
| Resource URL | `/api/portal/developers/password/:Id`      |
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

{{% include "portal-developer-analytics" %}}

### Add Key To Developer

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:Id/subscriptions` |
| Method       | POST                           |
| Type         | None                          |
| Body         | Subscription Object           |
| Param        | None                          |


#### Sample Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/:Id/keys \
-X POST \
-H "authorization: $TYK_API_KEY" \
-d \
'{
  "apply_policies": ["<pol-id>"],
  "fields": {
      "foo": "bar"
  },
  "oauth_info": {
    "redirect_uri": "..."
  }
}'
```

### Change Developer Key Policy

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:developerId/keys/:keyId` |
| Method       | PUT                           |
| Type         | None                          |
| Body         | Policy change Object          |
| Param        | None                          |


#### Sample Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/:developerId/keys/:keyId \
-X PUT \
-H "authorization: $TYK_API_KEY" \
-d \
'{
  "apply_policies": ["<pol-id>"]
}'
```

### Revoke Developer Key

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:developerId/keys/:keyID` |
| Method       | DELETE                        |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

### Reset Developer Key Quota

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:developerId/keys/:keyID/reset_quota` |
| Method       | POST                          |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

### Delete OAuth app

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/oauth/:appId` |
| Method       | DELETE                        |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |


### Revoke a Single OAuth Client Token

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/oauth-clients/{oauthClientId}/revoke`       |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                                  |
| Param        | None                                           |

#### Sample Request

```{.json}
POST /oauth-clients/411f0800957c4a3e81fe181141dbc22a/revoke
Host: tyk-portal:3000
Authorization: CSRF token
Body: {
  "token":"eyJvcmciOiI1ZTIwOTFjNGQ0YWVmY2U2MGMwNGZiOTIiLCJpZCI6ImZiMGFmNWQ4ZGY1MzQ3MjY4YmYxNTE5MmJjN2YzN2QyIiwiaCI6Im11cm11cjY0In0=",
  "token_type_hint":"access_token"
}
```
#### Sample Response

```{.json}
{
  "Status": "OK",
  "Message": "token revoked successfully",
  "Meta": null
}
```

### Revoke all OAuth Client Tokens

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/oauth-clients/{oauthClientId}/revoke_all`    |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                                  |
| Param        | None                                           |

#### Sample Request

```{.json}
POST /oauth-clients/411f0800957c4a3e81fe181141dbc22a/revoke_all
Host: tyk-portal:3000
Authorization: CSRF token
Body: {
  "client_secret":"MzUyNDliNzItMDhlNy00MzM3LTk1NWUtMWQyODMyMjkwZTc0"
  }
```
#### Sample Response

```{.json}
{
  "Status": "OK",
  "Message": "tokens revoked successfully",
  "Meta": null
}
```

## Deprecated APIS

### Add Subscription To Developer

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:Id/subscriptions` |
| Method       | POST                           |
| Type         | None                          |
| Body         | Subscription Object           |
| Param        | None                          |


#### Sample Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api//portal/developers/:Id/subscriptions \
-X POST \
-H "authorization: $TYK_API_KEY" \
-d \
'{
  "policy_id": "<pol-id>",
  "fields": {
      "foo": "bar"
  },
  "oauth_info": {
    "redirect_uri": "..."
  }
}'
```

### Change Developer Key Policy

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/:developerId/:keyId/:policyId` |
| Method       | GET                           |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

### Revoke Developer Key

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/key/:apiID/:keyID/:Id` |
| Method       | DELETE                        |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

### Reset Developer Key Quota

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/key/:apiID/:keyID/:Id/reset_quota` |
| Method       | POST                          |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |

### Delete OAuth app

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/portal/developers/oauth/:apiId/:appId` |
| Method       | DELETE                        |
| Type         | None                          |
| Body         | None                          |
| Param        | None                          |
