---
date: 2017-03-27T12:17:32+01:00
title: Basic Authentication
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 5 
---

Basic Auth users are essentially a form of API token, just with a customised, pre-set organisation-specific ID instead of a generated one. To interact with basic auth users, you can use the API Token API calls (list, get delete etc.)

### Create a user

| **Property** | **Description**                   |
| ------------ | --------------------------------- |
| Resource URL | `/api/apis/keys/basic/{username}` |
| Method       | POST                              |
| Type         | None                              |
| Body         | Session Object                    |
| Param        | None                              |

#### Sample Request

```{.copyWrapper}
POST /api/apis/keys/basic/test-user HTTP/1.1
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
  },
  "basic_auth_data": {
    "password": "test123"
  }
}
```

#### Sample Response

```
{
  "api_model": {},
  "key_id": "54b53d3aeba6db5c3500000test-user",
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