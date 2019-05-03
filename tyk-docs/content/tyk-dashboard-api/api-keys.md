---
date: 2017-03-27T12:15:19+01:00
title: API Key Management
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 2
---

> Please note that `{api-id}` can either be the internal or external API id.

### Get a list of Keys

**Note:** This will not work with a hashed key set.

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/apis/{api-id}}/keys` |
| Method       | GET                        |
| Type         | None                       |
| Body         | None                       |
| Param        | None                       |

#### Sample Request:

```{.copyWrapper}
GET /api/apis/39d2c98be05c424371c600bd8b3e2242/keys HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
{
  "data": {
    "keys": [
      "54b53d3aeba6db5c3500000289a8fbc2bbba4ebc4934bb113588c792",
      "54b53d3aeba6db5c3500000230459d8568ec4bbf675bda2ff05e9293",
      "54b53d3aeba6db5c35000002ec9a2b1aca7b495771273a0895cb3627",
      "54b53d3aeba6db5c3500000272d97a10538248e9523ca09e425090b8",
      "54b53d3aeba6db5c3500000252b5c56c61ad42fe765101f6d70cf9c6"
    ]
  },
  "pages": 0
}
```

### Get a specific key

| **Property** | **Description**                     |
| ------------ | ----------------------------------- |
| Resource URL | `/api/apis/{api-id}/keys/{key-id}` |
| Method       | GET                                 |
| Type         | None                                |
| Body         | None                                |
| Param        | None                                |

#### Sample Request

```{.copyWrapper}
GET /api/apis/39d2c98be05c424371c600bd8b3e2242/keys/54b53d3aeba6db5c3500000289a8fbc2bbba4ebc4934bb113588c792 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
{
  "api_model": {},
  "key_id": "54b53d3aeba6db5c3500000289a8fbc2bbba4ebc4934bb113588c792",
  "data": {
    "last_check": 1421674410,
    "allowance": 1000,
    "rate": 1000,
    "per": 60,
    "expires": 1423684135,
    "quota_max": -1,
    "quota_renews": 1421164189,
    "quota_remaining": -1,
    "quota_renewal_rate": 60,
    "access_rights": {
      "39d2c98be05c424371c600bd8b3e2242": {
        "api_name": "Nitrous Test",
        "api_id": "39d2c98be05c424371c600bd8b3e2242",
        "versions": [
          "Default"
        ]
      }
    },
    "org_id": "54b53d3aeba6db5c35000002",
    "oauth_client_id": "",
    "basic_auth_data": {
      "password": ""
    },
    "hmac_enabled": true,
    "hmac_string": ""
  }
}
```

### Generate a key

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/keys`     |
| Method       | POST            |
| Type         | None            |
| Body         | Session Object  |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
POST /api/keys HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "last_check": 0,
  "allowance": 1000,
  "rate": 1000,
  "per": 60,
  "expires": 0,
  "quota_max": 10000,
  "quota_renews": 1424543479,
  "quota_remaining": 10000,
  "quota_renewal_rate": 2520000,
  "access_rights": {
    "bc2f8cfb7ab241504d9f3574fe407499": {
      "api_id": "bc2f8cfb7ab241504d9f3574fe407499",
      "api_name": "Test",
      "versions": [
        "Default"
      ]
    }
  }
}
```

#### Sample Response:

```
{
  "api_model": {},
  "key_id": "54b53d3aeba6db5c3500000216d056646b4b4ffe4e54f5b07d658f8a",
  "data": {
    "last_check": 0,
    "allowance": 1000,
    "rate": 1000,
    "per": 60,
    "expires": 0,
    "quota_max": 10000,
    "quota_renews": 1424543479,
    "quota_remaining": 10000,
    "quota_renewal_rate": 2520000,
    "access_rights": {
      "bc2f8cfb7ab241504d9f3574fe407499": {
        "api_name": "Test",
        "api_id": "bc2f8cfb7ab241504d9f3574fe407499",
        "versions": [
          "Default"
        ]
      }
    },
    "org_id": "54b53d3aeba6db5c35000002",
    "oauth_client_id": "",
    "basic_auth_data": {
      "password": ""
    },
    "hmac_enabled": false,
    "hmac_string": ""
  }
}
```

### Update a key

| **Property** | **Description**                      |
| ------------ | ------------------------------------ |
| Resource URL | `/api/apis/{api-id}/keys/{keyId}` |
| Method       | PUT                                  |
| Type         | None                                 |
| Body         | Session Object                       |
| Param        | None                                 |

#### Sample Request

```{.copyWrapper}
PUT /api/apis/39d2c98be05c424371c600bd8b3e2242/keys/54b53d3aeba6db5c3500000272d97a10538248e9523ca09e425090b8 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "last_check": 0,
  "allowance": 1000,
  "rate": 1000,
  "per": 60,
  "expires": 1422113671,
  "quota_max": -1,
  "quota_renews": 1421675253,
  "quota_remaining": -1,
  "quota_renewal_rate": 60,
  "access_rights": {
    "39d2c98be05c424371c600bd8b3e2242": {
      "api_id": "39d2c98be05c424371c600bd8b3e2242",
      "api_name": "Nitrous Test",
      "versions": [
        "Default"
      ]
    }
  },
  "org_id": "54b53d3aeba6db5c35000002",
  "oauth_client_id": "",
  "basic_auth_data": {
    "password": ""
  },
  "hmac_enabled": false,
  "hmac_string": ""
}
```

#### Sample Response:

```
{
  "Status": "OK",
  "Message": "Key updated",
  "Meta": ""
}
```

### Delete a key

| **Property** | **Description**                   |
| ------------ | --------------------------------- |
| Resource URL | `/api/apis/{api-id}/keys/{keyId}` |
| Method       | DELETE                            |
| Type         | None                              |
| Body         | None                              |
| Param        | None                              |

#### Sample Request

```{.copyWrapper}
DELETE /api/apis/39d2c98be05c424371c600bd8b3e2242/keys/54b53d3aeba6db5c3500000272d97a10538248e9523ca09e425090b8 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
{
  "Status": "OK",
  "Message": "Key deleted succesfully",
  "Meta": ""
}
```
