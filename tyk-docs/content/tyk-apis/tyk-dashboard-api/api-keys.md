---
date: 2017-03-27T12:15:19+01:00
title: API Key Management
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 3
aliases:
  - /docs/tyk-dashboard-api/api-tokens/
---
{{< note success >}}
**Note**  

`{api-id}` can either be the internal or external API id.
{{< /note >}}

### Get a list of Keys

**Note:** This will not work with a hashed key set.

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/apis/{api-id}/keys` |
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


### Create a custom key

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/keys/{custom-key-id}`     |
| Method       | POST            |
| Type         | None            |
| Body         | Session Object  |
| Param        | None            |

##### Sample Request

```{.copyWrapper}
POST /api/keys/my-custom-key HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
    "apply_policies": ["5ecc0b91081ac40001ed261c"],
    "org_id" : "5eb06f441fe4c4000147476e",
    
    // Below gets overwritten by the Policy, required nonetheless
    "expires": 0,
    "allowance": 0,
    "per": 0,
    "quota_max": 0,
    "rate": 0,
    "access_rights": {
        "b742100081764ff06b00f75733145614": {
            "api_name": "",
            "api_id": "b742100081764ff06b00f75733145614",
            "versions": [
                "Default"
            ]
        }
    }
}
```

You might be wondering why `access_rights` is necessary, as we are adding a security policy and inheriting the access rights from there.  That's because of legacy functionality.  We need to add any APIs `api_id` to the key of the access_rights map, as well as the `api_id` value of that key.  This will all get overwritten by the policy, but we need to add it.

##### Sample Response:


```
{
    "api_model": {},
    "key_id": "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImhlbGxvLXdvcmxkIiwiaCI6Im11cm11cjY0In0=",
    "data": {
       ...
    },
    "key_hash": "567b9a5419c3a9ef"
}
```

You can now use `my-custom-key` as a key to access the API.  Furthermore, you can use it to lookup the key in the Dashboard as well as the generated `key_hash` in the response.

Let's try curling it:
```
$ curl localhost:8080/my-api/users/1 --header "Authorization: my-custom-key"
{
  "response" : "hello world"
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

### Graphql API

Presently, the Tyk Dashboard uses the GraphQL API for keys.

| **Method** | **URL**  | **Description**             |
| ---------- | ------------- | --------------------------- |
| POST       | `/graphql`    | GraphQL query endpoint      |
| GET        | `/playground` | Dashboard Graphql Playground - where you could see docs and run queries |
