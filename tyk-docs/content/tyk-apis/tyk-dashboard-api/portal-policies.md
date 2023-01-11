---
date: 2017-03-27T12:28:24+01:00
title: Portal Policies
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 2
---

### Get List of Policies

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/portal/policies/` |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
GET /api/portal/policies/ HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data": [
    {
      "_id": "56b9fed54e86e40001000002",
      "access_rights": {
        "35447b1469df4e846894b1e87372f6d7": {
          "allowed_urls": [
            {
              "methods": [
                "GET"
              ],
              "url": "/some_resources"
            },
            {
              "methods": [
                "POST"
              ],
              "url": "/some_resource/(.*)"
            }
          ],
          "apiid": "35447b1269df4e846894b7e87312f6d7",
          "apiname": "My API",
          "versions": [
            "Default"
          ]
        }
      },
      "active": true,
      "date_created": "0001-01-01T00:00:00Z",
      "hmac_enabled": false,
      "is_inactive": false,
      "key_expires_in": 0,
      "name": "My Policy",
      "org_id": "5629ca78eebd180001000001",
      "per": 1,
      "quota_max": -1,
      "quota_renewal_rate": 60,
      "rate": 1000,
      "tags": []
    }
  ],
  "Pages": 0
}
```

Notice that the `apiid` field is different than the rest of the policy definitions! (See [GitHub issue 192][1])

### Search list of Policies

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/portal/policies/search` |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
GET /api/portal/policies/search?q=Policy+name HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

Similar to Policies list endpoint

### Retrieve a single policy by ID

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/portal/policies/{id}` |
| Method       | GET                         |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample request

```{.copyWrapper}
GET /api/portal/policies/56b9fed54e86e40001000002 HTTP/1.1
Host: localhost
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "_id": "56b9fed54e86e40001000002",
  "access_rights": {
    "35447b1469df4e846894b1e87372f6d7": {
      "allowed_urls": [
        {
          "methods": [
            "GET",
          ],
          "url": "/some_resources"
        },
        {
          "methods": [
            "POST"
          ],
          "url": "/some_resource/(.*)"
        },
      ],
      "apiid": "35447b1269df4e846894b7e87312f6d7",
      "apiname": "My API",
      "versions": [
        "Default"
      ]
    }
  },
  "active": true,
  "date_created": "0001-01-01T00:00:00Z",
  "hmac_enabled": false,
  "is_inactive": false,
  "key_expires_in": 0,
  "name": "My Policy",
  "org_id": "5629ca78eebd180001000001",
  "per": 1,
  "quota_max": -1,
  "quota_renewal_rate": 60,
  "rate": 1000,
  "tags": []
}
```

### Create Policy Definition

Creating policy definitions is slightly different to the core API, API definitions are wrapped inside an `api_definition` field and event handlers, such as webhooks are not embedded in the main `api_defintion` object (though they can be), webhooks are instead appended as references into the `hook_references` field, the API will embed the correct webhook data into the event handler interface.

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/policies/`    |
| Method       | POST                       |
| Type         | None                       |
| Body         | Advanced Policy Definition |
| Param        | None                       |

#### Sample Request

```{.copyWrapper}
POST /api/portal/policies/ HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Type: application/json
Content-Length: <body length>
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "last_updated": "0001-01-01T00:00:00Z",
  "rate": 1000,
  "per": 60,
  "quota_max": -1,
  "quota_renews": 1481546970,
  "quota_remaining": 0,
  "quota_renewal_rate": 60,
  "access_rights": {
    "35447b1469df4e846894b1e87372f6d7": {
      "apiid": "35447b1469df4e846894b1e87372f6d7",
      "api_name": "My API",
      "versions": ["Default"]
    }
  },
  "name": "My Policy",
  "active": true
}    
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "56b9fed54e86e40001000002",
  "Meta": "null"
}
```

### Update Policy Definition

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/portal/policies/{id}` |
| Method       | PUT                         |
| Type         | None                        |
| Body         | Advanced Policy Definition  |
| Param        | None                        |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/policies/56b9fed54e86e40001000002 HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Type: application/json
Content-Length: <body length>
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "_id": "56b9fed54e86e40001000002",
  "id": "",
  "org_id": "589b4be9dbd34702ee2ed8c5",
  "rate": 1000,
  "per": 60,
  "quota_max": -1,
  "quota_renewal_rate": 60,
  "access_rights": {
    "35447b1469df4e846894b1e87372f6d7": {
      "apiid": "35447b1469df4e846894b1e87372f6d7",
      "api_name": "My API",
      "versions": ["Default"],
      "allowed_urls": []
    }
  },
  "hmac_enabled": false,
  "active": true,
  "name": "My Updated Policy",
  "is_inactive": false,
  "date_created": "0001-01-01T00:00:00Z",
  "tags": [],
  "key_expires_in": 0,
  "partitions": {
    "quota": false,
    "rate_limit": false,
    "acl": false
  },
  "last_updated": "0001-01-01T00:00:00Z"
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Data updated",
  "Meta": ""
}
```

### Delete Policy Definition

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/portal/policies/{id}` |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```{.copyWrapper}
DELETE /api/portal/policies/56b9fed54e86e40001000002 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Data deleted",
  "Meta": null
}
```

### Graphql API

Presently, the Tyk Dashboard uses the GraphQL API for policies.

| **Method** | **URL**  | **Description**             |
| ---------- | ------------- | --------------------------- |
| POST       | `/graphql`    | GraphQL query endpoint      |
| GET        | `/playground` | Dashboard Graphql Playground - where you could see docs and run queries |


 [1]: https://github.com/TykTechnologies/tyk/issues/192