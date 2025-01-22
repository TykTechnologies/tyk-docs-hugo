---
title: "Dashboard Configuration"
date: 2025-01-10
tags: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
aliases:
  - /concepts/tyk-components/dashboard
  - /getting-started/tyk-components/dashboard
  - /tyk-dashboard
  - /getting-started/key-concepts/dashboard-api
  - /tyk-apis/tyk-dashboard-api/pagination
  - /tyk-apis/tyk-dashboard-api/api-definitions
  - /tyk-apis/tyk-dashboard-api/data-graphs-api
  - /tyk-apis/tyk-dashboard-api/analytics
  - /tyk-dashboard-api/users
  - /tyk-apis/tyk-dashboard-api/users
  - /tyk-apis/tyk-dashboard-api/user-groups
  - /tyk-dashboard-api/org/permissions
  - /tyk-apis/tyk-dashboard-api/org/permissions
  - /tyk-apis/tyk-dashboard-api/api-keys
  - /tyk-dashboard-api/api-tokens
  - /tyk-apis/tyk-dashboard-api/basic-authentication
  - /tyk-apis/tyk-dashboard-api/oauth-key-management
  - /tyk-apis/tyk-dashboard-api/sso
  - /tyk-apis/tyk-dashboard-api/web-hooks
  - /tyk-dashboard-api/org/opa
  - /tyk-apis/tyk-dashboard-api/org/opa
  - /tyk-apis/tyk-dashboard-admin-api/organisations
  - /dashboard-admin-api/organisations
  - /tyk-apis/tyk-dashboard-admin-api/users
  - /tyk-apis/tyk-dashboard-admin-api/sso
  - /tyk-apis/tyk-dashboard-api/dashboard-url-reload
  - /tyk-apis/tyk-dashboard-admin-api/export
  - /tyk-apis/tyk-dashboard-admin-api/import
---

## Introduction

The Tyk Dashboard is the GUI and analytics platform for Tyk. It provides an easy-to-use management interface for managing a Tyk installation.

{{< img src="/img/diagrams/tyk-selfmanaged-architecture-dashboard.png" alt="Tyk Dashboard diagram" >}}

The Dashboard also provides the [API Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}), a customizable developer portal for your API documentation, developer auto-enrollment and usage tracking.

The Dashboard also exposes the Developer Portal as a separate component of the application. This means it can either be deployed as an internet-facing application or as a purely admin application depending on how it is being used:

- A
- Administration
- User Management

## Dashboard System Configuration

For global configurations of the gateway that are not related to specific user’s API, use the config file

## Understanding the Dashboard UI

Refer the following [docs]({{< ref "getting-started/using-tyk-dashboard" >}}).

## Understanding the Dashboard API

The Dashboard is a large, granular REST API with a thin-client web front-end, and if being deployed as part of a Tyk install, serves as the main integration point instead of the Gateway API.

{{< img src="/img/diagrams/dashboardapi2.png" alt="API Overview" >}}

**The Dashboard API is a superset of the Gateway API**, providing the same functionality, with additional features (anything that can be done in the Dashboard has an API endpoint), and offers some additional advantages:
 - The Dashboard API has a granular structure, you can create separate clients easily.
 - The API features read/write permissions on a per-endpoint level to have extra control over integrations.
 - The API enforces a schema that can be modified and hardened depending on your usage requirements.

### Types of Dashboard API

The Dashboard exposes two APIs:
 - **Dashboard API**: Is used for operational management of Tyk resources (APIs, policies, keys, etc.). This API offers granular permissions based on user roles.
    
    To know more about Dashboard APIs, refer the following documents:
    - [Postman / Swagger / Open API specification]({{< ref "tyk-dashboard-api" >}})
    - [Dashboard API Usage Examples]({{< ref "" >}})

 - **Dashboard Admin API**: Is used for system-level administration and initial setup tasks like managing organizations, initial user creation, backups/migrations and SSO setup. 

    To know more about Dashboard Admin APIs, refer the following documents:
    - [Postman / Swagger / Open API specification]({{< ref "dashboard-admin-api" >}})
    - [Dashboard Admin API Usage Examples]({{< ref "" >}})

### Authenticating with Dashboard APIs

**Dashboard API**

The [Tyk Dashboard API]({{< ref "tyk-dashboard-api.md" >}}) is secured using an `Authorization` header that must be added to each request that is made. The **Tyk Dashboard API Access Credentials** `Authorization` key can be found within the Dashboard UI at the bottom of the **Edit User** section for a user.

**Dashboard Admin API**

The Tyk Dashboard Admin API is secured using a shared secret that is set in the `tyk_analytics.conf` file. Calls to the Admin API require the `admin-auth` header to be provided, to differentiate the call from a regular Dashboard API call.

## Using Dashboard API

### Overview

The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports [Role Based Access Control]({{< ref "tyk-dashboard/rbac" >}}) (RBAC) on both a multi-tenant, and user basis.

Using the Dashboard API it is possible to set Read / Write / ReadWrite / Deny access to sections of the API on a user by user basis, and also segregate User / Key / API Ownership by organization.

The availability of RBAC varies depending on the license or subscription. For further information, please check our [price comparison](https://tyk.io/price-comparison/) or consult our sales and expert engineers {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

{{< note success >}}
**Note**  

For optimal results, it is advisable to exclusively employ the Tyk Dashboard API (avoiding direct calls to the Tyk Gateway API) within a Self-Managed setup, enabling the Dashboard to manage the Tyk API gateways cluster.
{{< /note >}}


{{< img src="/img/diagrams/diagram_docs_dashboard-API-security-and-concepts@2x.png" alt="Tyk Dashboard API security" >}}

### Pagination

Selected Dashboard APIs can be paginated.

You can select the number of result pages to return by adding a parameter `p` which starts at `1`. At the default page size, this returns items 1-10. Setting `p` to `2` returns items 11-20 and so on. Alternatively, passing `0` or lower as a parameter will return all items.

The default page size is 10. You can overwrite the default page size in your `tyk_analytics.conf` using the `page_size` key. It's suggested you do not modify it as it will affect the performance of the Dashboard.

**Sample Request:**

```{.copyWrapper}
GET /api/apis/?p=1 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response:**

```
{
  "apis": [
    { ... },
    { ... },
    { ... }
  ],
  "pages": 1
}
```

### Manage APIs - API Definition

{{< note success >}}
**Note**  

See [API Definition Objects]({{< ref "tyk-gateway-api/api-definition-objects" >}}) section for an explanation of each field in the request & response.
{{< /note >}}

#### Get List of APIs

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/apis/`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
GET /api/apis?p=0 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "apis": [
    {
      "api_model": {},
      "api_definition": {
        "id": "54b53e47eba6db5c70000002",
        "name": "Nitrous Test",
        "api_id": "39d2c98be05c424371c600bd8b3e2242",
        "org_id": "54b53d3aeba6db5c35000002",
        "use_keyless": false,
        "use_oauth2": false,
        "oauth_meta": {
          "allowed_access_types": [],
          "allowed_authorize_types": [
            "token"
          ],
            "auth_login_redirect": ""
        },
        "auth": {
          "auth_header_name": "authorization"
        },
        "use_basic_auth": false,
        "notifications": {
          "shared_secret": "",
          "oauth_on_keychange_url": ""
        },
        "enable_signature_checking": false,
        "definition": {
          "location": "header",
          "key": ""
        },
        "version_data": {
          "not_versioned": true,
          "versions": {
            "Default": {
              "name": "Default",
              "expires": "",
              "paths": {
                "ignored": [],
                "white_list": [],
                "black_list": []
              },
              "use_extended_paths": false,
              "extended_paths": {
                "ignored": [],
                "white_list": [],
                "black_list": []
              }
            }
          }
        },
        "proxy": {
          "listen_path": "/39d2c98be05c424371c600bd8b3e2242/",
          "target_url": "http://tyk.io",
          "strip_listen_path": true
        },
        "custom_middleware": {
          "pre": null,
          "post": null
        },
        "session_lifetime": 0,
        "active": true,
        "auth_provider": {
          "name": "",
          "storage_engine": "",
          "meta": null
        },
        "session_provider": {
          "name": "",
          "storage_engine": "",
          "meta": null
        },
        "event_handlers": {
          "events": {}
        },
        "enable_batch_request_support": false,
        "enable_ip_whitelisting": false,
        "allowed_ips": [],
        "expire_analytics_after": 0
      },
      "hook_references": []
    }
    ...
  ],
  "pages": 0
}
```

#### Search APIs by name

| **Property** | **Description**    |
| ------------ | ------------------ |
| Resource URL | `/api/apis/search` |
| Method       | GET                |
| Type         | None               |
| Body         | None               |
| Param        | None               |

**Sample Request**

```{.copyWrapper}
GET /api/apis?q=Some+Name HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

Similar to API list response

#### Retrieve a single API by ID

| **Property** | **Description**  |
| ------------ | ---------------- |
| Resource URL | `/api/apis/{id}` |
| Method       | GET              |
| Type         | None             |
| Body         | None             |
| Param        | None             |

{{< note success >}}
**Note**  

`{id}` can either be the internal or public ID ( see `api_id` in the [sample response](#sample-response-1) )
{{< /note >}}

**Sample request**

```{.copyWrapper}
GET /api/apis/54c24242eba6db1c9a000002 HTTP/1.1
Host: localhost
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "api_model": {},
  "api_definition": {
    "id": "54c24242eba6db1c9a000002",
    "name": "Test",
    "api_id": "bc2f8cfb7ab241504d9f3574fe407499",
    "org_id": "54b53d3aeba6db5c35000002",
    "use_keyless": false,
    "use_oauth2": false,
    "oauth_meta": {
      "allowed_access_types": [],
      "allowed_authorize_types": [
          "token"
      ],
      "auth_login_redirect": ""
    },
    "auth": {
      "auth_header_name": "authorization"
    },
    "use_basic_auth": false,
    "notifications": {
      "shared_secret": "",
      "oauth_on_keychange_url": ""
    },
    "enable_signature_checking": false,
    "definition": {
      "location": "header",
      "key": ""
    },
    "version_data": {
        "not_versioned": true,
        "versions": {
          "Default": {
            "name": "Default",
            "expires": "",
            "paths": {
              "ignored": [],
              "white_list": [],
              "black_list": []
            },
            "use_extended_paths": true,
            "extended_paths": {
              "ignored": [
                  {
                    "path": "/test-path/",
                    "method_actions": {
                      "GET": {
                        "action": "no_action",
                        "code": 200,
                        "data": "",
                        "headers": {}
                      }
                    }
                  },
                  {
                    "path": "/test-path/reply",
                    "method_actions": {
                      "GET": {
                        "action": "reply",
                        "code": 200,
                        "data": "{\"foo\":\"bar\"}",
                        "headers": {
                          "x-test": "test"
                        }
                      }
                    }
                  }
              ],
              "white_list": [],
              "black_list": []
            }
          }
        }
      },
      "proxy": {
        "listen_path": "/bc2f8cfb7ab241504d9f3574fe407499/",
        "target_url": "http://httpbin.org/",
        "strip_listen_path": true
      },
      "custom_middleware": {
        "pre": [],
        "post": []
      },
      "session_lifetime": 0,
      "active": true,
      "auth_provider": {
        "name": "",
        "storage_engine": "",
        "meta": null
      },
      "session_provider": {
        "name": "",
        "storage_engine": "",
        "meta": null
      },
      "event_handlers": {
        "events": {
          "QuotaExceeded": [
            {
              "handler_name": "eh_web_hook_handler",
              "handler_meta": {
                "_id": "54be6c0beba6db07a6000002",
                "event_timeout": 60,
                "header_map": {
                    "x-tyk-test": "123456"
                },
                "method": "POST",
                "name": "Test Post",
                "org_id": "54b53d3aeba6db5c35000002",
                "target_path": "http://httpbin.org/post",
                "template_path": ""
              }
            }
          ]
        }
      },
      "enable_batch_request_support": true,
      "enable_ip_whitelisting": true,
      "allowed_ips": [
        "127.0.0.1"
      ],
      "expire_analytics_after": 0
  },
  "hook_references": [
    {
        "event_name": "QuotaExceeded",
        "event_timeout": 60,
        "hook": {
          "api_model": {},
          "id": "54be6c0beba6db07a6000002",
          "org_id": "54b53d3aeba6db5c35000002",
          "name": "Test Post",
          "method": "POST",
          "target_path": "http://httpbin.org/post",
          "template_path": "",
          "header_map": {
            "x-tyk-test": "123456"
          },
          "event_timeout": 0
      }
    }
  ]
}
```

#### Delete API by ID

**Sample Request**

```{.copyWrapper}
DELETE /api/apis/54c24242eba6db1c9a000002 HTTP/1.1
Host: localhost
Authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{"Status":"OK","Message":"API deleted","Meta":null}
```

#### Create API Definition

Creating API definitions is slightly different to the core API, API definitions are wrapped inside an `api_definition` field and event handlers, such as webhooks are not embedded in the main `api_defintion` object (though they can be), webhooks are instead appended as references into the `hook_references` field, the API will embed the correct webhook data into the event handler interface.

Please note that ID's (both `id` and `api_id`) are auto-generated by Tyk and cannot be set by the user. In Self-Managed installations `api_id` can be overwritten with a call to the Update API Definition endpoint, but this is currently not possible when the Dashboard resides in Tyk Cloud.

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/apis/`            |
| Method       | POST                    |
| Type         | None                    |
| Body         | Advanced API Definition |
| Param        | None                    |

**Sample Request**

```{.copyWrapper}
POST /api/apis HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Type: application/json
Content-Length: 1356
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "api_definition": {
      "name": "Test",
      "auth": {
          "auth_header_name": "authorization"
      },
      "definition": {
          "location": "header",
          "key": ""
      },
      "proxy": {
          "target_url": "http://httpbin.org/"
      },
      "version_data": {
        "use_extended_paths": true,
        "not_versioned": true,
        "versions": {
          "Default": {
              "expires": "",
              "name": "Default",
              "paths": {
                "ignored": [],
                "white_list": [],
                "black_list": []
              },
              "extended_paths": {
                "ignored": [
                  {
                    "path": "/test-path/",
                    "method_actions": {
                      "GET": {
                        "action": "no_action",
                        "code": 200,
                        "data": "",
                        "headers": {}
                      }
                    }
                  },
                    {
                      "path": "/test-path/reply",
                      "method_actions": {
                        "GET": {
                          "action": "reply",
                          "code": 200,
                          "data": "{\"foo\":\"bar\"}",
                          "headers": {
                            "x-test": "test"
                          }
                        }
                      }
                    }
                ],
                  "white_list": [],
                  "black_list": []
              },
              "use_extended_paths": true
          }
        }
      },
      "use_oauth2": false,
      "oauth_meta": {
        "auth_login_redirect": "",
        "allowed_access_types": [],
        "allowed_authorize_types": [
          "token"
        ]
      },
      "notifications": {
        "shared_secret": "",
        "oauth_on_keychange_url": ""
      },
      "enable_ip_whitelisting": true,
      "allowed_ips": [
        "127.0.0.1"
      ],
      "use_keyless": false,
      "enable_signature_checking": false,
      "use_basic_auth": false,
      "active": true,
      "enable_batch_request_support": true
  },
  "hook_references": [
    {
      "event_name": "QuotaExceeded",
      "hook": {
        "api_model": {},
        "id": "54be6c0beba6db07a6000002",
        "org_id": "54b53d3aeba6db5c35000002",
        "name": "Test Post",
        "method": "POST",
        "target_path": "http://httpbin.org/post",
        "template_path": "",
        "header_map": {
          "x-tyk-test": "123456"
        },
        "event_timeout": 0
      },
      "event_timeout": 60
    }
  ]
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "API created",
  "Meta": "54c24242eba6db1c9a000002"
}
```

Please note that Tyk matches the Ignored paths in the order in which they are specified in the `ignored` array. Subpaths of a route are matched automatically and so should be placed above parent routes if they need to be matched individually.

#### Update API Definition

APIs that are created using the advanced Dashboard API are referenced by their internal ID instead of their API-ID.

Please note that whilst `api_id` can be updated for Self-Managed installations, this is currently not possible when the Dashboard resides in Tyk Cloud.  Updates to `api_id` in Tyk Cloud will be ignored.

| **Property** | **Description**                       |
| ------------ | ------------------------------------- |
| Resource URL | `/api/apis/{internal_or_external_id}` |
| Method       | PUT                                   |
| Type         | None                                  |
| Body         | Advanced API Definition               |
| Param        | None                                  |

**Sample Request**

```{.copyWrapper}
PUT /api/apis/54c24242eba6db1c9a000002 HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Type: application/json
Content-Length: 1356
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "api_definition": {
      "id": "54c24242eba6db1c9a000002",
      "api_id": "bc2f8cfb7ab241504d9f3574fe407499",
      "name": "Test",
      "auth": {
        "auth_header_name": "authorization"
      },
      "definition": {
        "location": "header",
        "key": ""
      },
      "proxy": {
          "target_url": "http://httpbin.org/"
      },
      "version_data": {
        "use_extended_paths": true,
        "not_versioned": true,
        "versions": {
          "Default": {
            "expires": "",
            "name": "Default",
            "paths": {
              "ignored": [],
              "white_list": [],
              "black_list": []
            },
            "extended_paths": {
              "ignored": [
                  {
                    "path": "/test-path/",
                    "method_actions": {
                      "GET": {
                        "action": "no_action",
                        "code": 200,
                        "data": "",
                        "headers": {}
                      }
                    }
                  },
                  {
                    "path": "/test-path/reply",
                    "method_actions": {
                      "GET": {
                        "action": "reply",
                        "code": 200,
                        "data": "{\"foo\":\"bar\"}",
                        "headers": {
                            "x-test": "test"
                        }
                      }
                    }
                  }
              ],
              "white_list": [],
              "black_list": []
              },
            "use_extended_paths": true
          }
        }
      },
        "use_oauth2": false,
        "oauth_meta": {
          "auth_login_redirect": "",
          "allowed_access_types": [],
          "allowed_authorize_types": [
            "token"
          ]
        },
        "notifications": {
          "shared_secret": "",
          "oauth_on_keychange_url": ""
        },
        "enable_ip_whitelisting": true,
        "allowed_ips": [
          "127.0.0.1"
        ],
        "use_keyless": false,
        "enable_signature_checking": false,
        "use_basic_auth": false,
        "active": true,
        "enable_batch_request_support": true
    },
    "hook_references": [
      {
        "event_name": "QuotaExceeded",
        "hook": {
          "api_model": {},
          "id": "54be6c0beba6db07a6000002",
          "org_id": "54b53d3aeba6db5c35000002",
          "name": "Test Post",
          "method": "POST",
          "target_path": "http://httpbin.org/post",
          "template_path": "",
          "header_map": {
            "x-tyk-test": "123456"
          },
          "event_timeout": 0
        },
        "event_timeout": 60
      }
    ]
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "Api updated",
  "Meta": ""
}
```

### Data Graphs API

Currently `/api/data-graphs/` has only one endpoint called `/data-sources` with only a `POST` HTTP method.

The Dashboard exposes the `/api/data-graphs/data-sources/import` endpoint which allows you to import an [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or [OpenAPI](https://swagger.io/specification/) document.

#### Supported AsyncAPI versions
* 2.0.0
* 2.1.0
* 2.2.0
* 2.3.0
* 2.4.0

#### Supported OpenAPI versions
* 3.0.0

#### Import a document from a remote resource

| **Property** | **Description**                            |
|--------------|--------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`     |
| Method       | `POST`                                     |
| Content-Type  | `application/json`                        |
| Body         | `{`<br/>` "url": "resource URL" `<br/>`}`  |

The fetched document can be an OpenAPI or AsyncAPI document. The format will be detected automatically. The data source import API only checks the fetched data and tries to determine the document format, the status codes are ignored. 
It returns an error if it fails to determine the format and the document type. HTTP 500 is returned if a programming or network error occurs. If the fetched request body is malformed then HTTP 400 is returned.

#### Import an OpenAPI document

The data source import API supports importing OpenAPI documents. The document can be used as a request body.

| **Property** | **Description**                           |
|--------------|-------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`    |
| Method       | `POST`                                    |
| Content-Type  | `application/vnd.tyk.udg.v2.openapi`     |
| Body         | `<OpenAPI Document>`                   |


The document can be in JSON or YAML format. The import API can determine the type and parse it.

#### Import an AsyncAPI document

The data source import API supports importing AsyncAPI documents. The document can be used as a request body.

| **Property** | **Description**                        |
|--------------|----------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import` |
| Method       | `POST`                                 |
| Content-Type | `application/vnd.tyk.udg.v2.asyncapi`  |
| Body         | `<AsyncAPI Document>`                  |

The document can be in JSON or YAML format. The import API can determine the type and parse it.

#### Response Structure

The response structure is consistent with other endpoints, as shown in the table below:

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Status       | `Error` or `OK`                                       |
| Message      | Verbal explanation                                    |
| Meta         | API ID for success and `null` with error (not in use) |

**Sample Response**

```json
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```

### Analytics API

{{< note success >}}
**Note**  
Below APIs returns data only if you have Pump 1.7.0
{{< /note >}}

#### Analytics of API Key
| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/activity/keys/endpoint/{keyHash}/{startDay}/{startMonth}/{startYear}/{EndDay}/{EndMonth}/{EndYear}`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

It returns analytics of the endpoints of all APIs called using KEY between start and end date.

**Sample Request**
To get analytics of all endpoints called using the key `7f3c3ca87376cabe` between October 13th 2020 and October 14th 2020, make the following call:

```{.copyWrapper}
GET api/activity/keys/endpoint/7f3c3ca87376cabe/13/10/2020/14/10/2020 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**
```
{
    "data": [
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/anything",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "41351a6a94094da05f75146a695a16f6",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T13:22:49.667+05:30",
            "request_time": 0,
            "latency": 217,
            "upstream_latency": 217,
            "max_upstream_latency": 217,
            "min_upstream_latency": 217,
            "max_latency": 217,
            "min_latency": 217
        },
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/anything",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "1793db2cbb724ad54da582ce3191d383",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T13:22:20.534+05:30",
            "request_time": 568,
            "latency": 568,
            "upstream_latency": 568,
            "max_upstream_latency": 568,
            "min_upstream_latency": 568,
            "max_latency": 568,
            "min_latency": 568
        },
    ],
    "pages": 1
}
```

#### Analytics of OAuth Client
| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/activity/oauthid/endpoint/{OAuthClientID}/{startDay}/{startMonth}/{startYear}/{EndDay}/{EndMonth}/{EndYear}`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

It returns analytics of the all endpoints called using the given OAuth Client ID.

**Sample Request**
To get activity of all endpoints which used OAuth client `27b35a9ed46e429eb2361e440cc4005c` between October 13th 2020 and October 14th 2020, make the following call:

```{.copyWrapper}
GET /api/activity/oauthid/endpoint/27b35a9ed46e429eb2361e440cc4005c/13/10/2020/14/10/2020 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**
```
{
    "data": [
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/get",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "79fc7cb80df940cc5089772200bd4926",
                "api_name": ""
            },
            "hits": 2,
            "success": 1,
            "error": 1,
            "last_hit": "2020-10-13T14:48:51.582+05:30",
            "request_time": 498,
            "latency": 498,
            "upstream_latency": 497.5,
            "max_upstream_latency": 747,
            "min_upstream_latency": 248,
            "max_latency": 748,
            "min_latency": 248
        },
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/post",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "79fc7cb80df940cc5089772200bd4926",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T14:49:31.541+05:30",
            "request_time": 0,
            "latency": 241,
            "upstream_latency": 239,
            "max_upstream_latency": 239,
            "min_upstream_latency": 239,
            "max_latency": 241,
            "min_latency": 241
        }
    ],
    "pages": 1
}
```

### Users API

{{< note success >}}
**Note**  

`USER_ID` is a placeholder for your User ID value.
{{< /note >}}


#### List Users

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/users`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
GET /api/users HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "users": [
    {
      "api_model": {},
      "first_name": "John",
      "last_name": "Smith",
      "email_address": "john@jive.ly",
      "password": "$2a$10$mRVfrAf72N66anVNhA1KVuYaOwOrXhFzxyg6bwgZemUeVo2MNOpIa",
      "org_id": "54b53d3aeba6db5c35000002",
      "active": true,
      "id": "54b53d4bf25b920f09361526",
      "access_key": "0cf5e6c37add465a406f19807c081765",
      "user_permissions": {
                "IsAdmin": "admin",
                "ResetPassword": "admin"
      }
    },
    {
      "api_model": {},
      "first_name": "Test",
      "last_name": "User",
      "email_address": "banana@test.com",
      "password": "",
      "org_id": "54b53d3aeba6db5c35000002",
      "active": true,
      "id": "54bd0ad9ff4329b88985aafb",
      "access_key": "f81ee6f0c8f2467d539c132c8a422346",
      "user_permissions": {
                "user_groups": "read",
                "users": "read"
      }
    }
  ],
  "pages": 0
}
```

#### Get User

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/users/{USER_ID}`  |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

**Sample Request**

```{.copyWrapper}
GET /api/users/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "api_model": {},
  "first_name": "Test",
  "last_name": "User",
  "email_address": "banana@test.com",
  "password": "",
  "org_id": "54b53d3aeba6db5c35000002",
  "active": true,
  "id": "54bd0ad9ff4329b88985aafb",
  "access_key": "f81ee6f0c8f2467d539c132c8a422346"
}
```

#### Add User

{{< note success >}}
**Note**  

You can add a user via the API without a password by leaving out the `password` field. You then use [Set User Password](#set-user-password) request to add a password.
{{< /note >}}

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Add User**.

If you do set a password, you need to keep a record of it, to enable the password to be reset in the future.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/users`    |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
POST /api/users HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "first_name": "Jason",
  "last_name": "Jasonson",
  "email_address": "jason@jasonsonson.com",
  "active": true,
  "password": "thisisatest",
  "user_permissions": { "IsAdmin": "admin" }
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User created",
  "Meta": ""
}
```

#### Set User Password

If a user is created with a blank password, you will need to add a password in a second API call to set a password. In this scenario, the `current_password` field is not required. To change an current password, you need to know the existing password set in **Add User**.

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to **read** to use **Set User Password**.

| **Property** | **Description**                      |
| ------------ | -------------------------------------|
| Resource URL | `/api/users/{USER_ID}/actions/reset` |
| Method       | POST                                 |
| Type         | None                                 |
| Body         | Password Object                      |
| Param        | None                                 |

**Sample Request**

```{.copyWrapper}
POST /api/users/54c25e845d932847067402e2/actions/reset HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "current_password": "12345",
  "new_password":"test123456",
  "user_permissions": { "IsAdmin": "admin" }
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User password updated",
  "Meta": ""
}
```

#### Allow Reset Password

| **Property** | **Description**                                       |
| ------------ | ------------------------------------------------------|
| Resource URL | `/admin/users/{USER_ID}/actions/allow_reset_passwords`|
| Method       | PUT                                                   |
| Type         | None                                                  |
| Body         | None                                                  |
| Param        | None                                                  |

**Sample Request**
```{.copyWrapper}
PUT -H "admin-auth: <your secret>" http://<dashboard>/admin/users/{USER_ID}/actions/allow_reset_passwords
```

**Sample Response**
```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": 
    { …user object payload …}
}
```

#### Disallow Reset Password

| **Property** | **Description**                                           |
| ------------ | ----------------------------------------------------------|
| Resource URL | `/admin/users/{USER_ID}/actions/disallow_reset_passwords` |
| Method       | PUT                                                       |
| Type         | None                                                      |
| Body         | None                                                      |
| Param        | None                                                      |

**Sample Request**
```{.copyWrapper}
PUT -H "admin-auth: <your secret>" http://<dashboard>/admin/users/{USER_ID}/actions/disallow_reset_passwords
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": 
    { …user object payload …}
}
```

#### Update User

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Update User**.

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/users/{USER_ID}` |
| Method       | PUT                    |
| Type         | None                   |
| Body         | User Object            |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
PUT /api/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "first_name": "Jason",
  "last_name": "File",
  "email_address": "jason.file@jasonsonson.com",
  "active": true,
  "user_permissions": { "IsAdmin": "admin" }
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": null
}
```

##### Reset User Session

This call allows you to reset a user's current Dashboard session.

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use this call.

{{< note success >}}
**Note**  

This also resets the user's Dashboard API credentials. 
{{< /note >}}

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/users/{USER_ID}/actions/key/reset`   |
| Method       | PUT                                        |
| Type         | None                                       |
| Body         | {"userId":"{USER_ID}"}                     |
| Param        | None                                       |

**Sample Request**

```{.copyWrapper}
PUT /api/users/54c25e845d932847067402e2/actions/key/reset HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "userId":"{USER_ID}"
}
```

**Sample Response**

```{.copyWrapper}
{
  "Status":"OK",
  "Message":"User session renewed",
  "Meta":null
}
```

#### Delete User

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/users/{USER_ID}` |
| Method       | DELETE                 |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
DELETE /api/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User deleted",
  "Meta": ""
}
```

### User Groups API

#### List User Groups

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/usergroups`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
GET /api/usergroups HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

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

#### Get User Group

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/usergroups/{user_group-id}`  |
| Method       | GET                     |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

**Sample Request**

```{.copyWrapper}
GET /api/usergroups/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

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

#### Add User Group



| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/usergroups`    |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

**Sample Request**

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

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User group created",
  "Meta": ""
}
```



#### Update User Group

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/usergroups/{user_group-id}` |
| Method       | PUT                    |
| Type         | None                   |
| Body         | User Group Object            |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
PUT /api/usergroups/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "name": "Certificates Team 2",
  "description": "Another certificates team",
}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User group updated",
  "Meta": null
}
```

#### Delete User Group

| **Property** | **Description**        |
| ------------ | -----------------------|
| Resource URL | `/api/usergroups/{user_group-id}` |
| Method       | DELETE                 |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
DELETE /api/usergroups/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "User group deleted",
  "Meta": ""
}
```

### Additional Permissions API

{{< note success >}}
**Note**  

This API helps you to add and delete (CRUD) a list of additional (custom) permissions for your Dashboard users.
Once created, a custom permission will be added to standard list of user permissions.
<br/>
Only Admin Dashboard users will be authorized to use this API.
{{< /note >}}



#### List Additional Permissions

This API returns by default the initial set of additional permissions defined in your Tyk Dashboard configuration, under [security.additional_permissions]({{< ref "tyk-dashboard/configuration#securityadditional_permissions" >}}).

Once you update the permissions via the API, they will be stored at organization level.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/api/org/permissions`|
| Method       | GET                   |
| Type         | None                  |
| Body         | None                  |
| Param        | None                  |

**Sample Request**

```{.copyWrapper}
GET /api/org/permissions HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "additional_permissions": {
    "api_developer": "API Developer",
    "api_manager": "API Manager"
  }
}
```

#### Add/Delete/Update Additional Permission

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

**Sample Request**

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

**Sample Response**

```
{
  "Status": "OK",
  "Message": "Additional Permissions updated in org level",
  "Meta": null
}
```

### Access Keys Management API

{{< note success >}}
**Note**  

`{api-id}` can either be the internal or external API id.
{{< /note >}}

#### Get a list of Keys

**Note:** This will not work with a hashed key set.

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/apis/{api-id}/keys` |
| Method       | GET                        |
| Type         | None                       |
| Body         | None                       |
| Param        | None                       |

**Sample Request:**

```{.copyWrapper}
GET /api/apis/39d2c98be05c424371c600bd8b3e2242/keys HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response:**

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

#### Get a specific key

| **Property** | **Description**                     |
| ------------ | ----------------------------------- |
| Resource URL | `/api/apis/{api-id}/keys/{key-id}` |
| Method       | GET                                 |
| Type         | None                                |
| Body         | None                                |
| Param        | None                                |

**Sample Request**

```{.copyWrapper}
GET /api/apis/39d2c98be05c424371c600bd8b3e2242/keys/54b53d3aeba6db5c3500000289a8fbc2bbba4ebc4934bb113588c792 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response:**

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


#### Create a custom key

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/keys/{custom-key-id}`     |
| Method       | POST            |
| Type         | None            |
| Body         | Session Object  |
| Param        | None            |

**Sample Request**

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

**Sample Response:**


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

#### Generate a key

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/keys`     |
| Method       | POST            |
| Type         | None            |
| Body         | Session Object  |
| Param        | None            |

**Sample Request**

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

**Sample Response:**

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

#### Update a key

| **Property** | **Description**                      |
| ------------ | ------------------------------------ |
| Resource URL | `/api/apis/{api-id}/keys/{keyId}` |
| Method       | PUT                                  |
| Type         | None                                 |
| Body         | Session Object                       |
| Param        | None                                 |

**Sample Request**

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

**Sample Response:**

```
{
  "Status": "OK",
  "Message": "Key updated",
  "Meta": ""
}
```

#### Delete a key

| **Property** | **Description**                   |
| ------------ | --------------------------------- |
| Resource URL | `/api/apis/{api-id}/keys/{keyId}` |
| Method       | DELETE                            |
| Type         | None                              |
| Body         | None                              |
| Param        | None                              |

**Sample Request**

```{.copyWrapper}
DELETE /api/apis/39d2c98be05c424371c600bd8b3e2242/keys/54b53d3aeba6db5c3500000272d97a10538248e9523ca09e425090b8 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response:**

```
{
  "Status": "OK",
  "Message": "Key deleted succesfully",
  "Meta": ""
}
```

#### Graphql API

Presently, the Tyk Dashboard uses the GraphQL API for keys.

| **Method** | **URL**  | **Description**             |
| ---------- | ------------- | --------------------------- |
| POST       | `/graphql`    | GraphQL query endpoint      |
| GET        | `/playground` | Dashboard Graphql Playground - where you could see docs and run queries |


### Basic Authentication API

Basic Auth users are essentially a form of API token, just with a customized, pre-set organization-specific ID instead of a generated one. To interact with basic auth users, you can use the API Token API calls (list, get delete etc.)

#### Create a user

| **Property** | **Description**                   |
| ------------ | --------------------------------- |
| Resource URL | `/api/apis/keys/basic/{username}` |
| Method       | POST                              |
| Type         | None                              |
| Body         | Session Object                    |
| Param        | None                              |

**Sample Request**

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

**Sample Response**

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

### OAuth Key Management API

#### Create a new OAuth2.0 Client

Any OAuth keys must be generated under an API in the Dashboard. Any POST requests made should contain the API's ID in the URL.

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/apis/oauth/{{api-id}}` |
| Method       | POST                         |
| Type         | JSON                         |
| Body         | Client Object                |


**Sample Request**

```{.copyWrapper}
  curl -vX POST -H "Authorization: {{API Access Credentials}}" \
    -H "Content-Type: application/json" \
    -d '{"redirect_uri": "", "policy_id": "{{policy_id}}"}' http://{{dasboard-hostname}}/api/apis/oauth/{{api-id}}
```

**Sample Response**

```
{
  "client_id": "72083e90e9b044c57e2667d49effff78",
  "secret": "YWUxZTM2ODItOTJjYS00MmIyLTQxZGEtZTE0M2MzNmYwMDI2",
  "redirect_uri": "",
  "policy_id": "57f7b07647e0800001aa2320"
}
```

#### List OAuth Clients

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/apis/oauth/{{api-id}}` |
| Method       | GET                          |
| Type         | JSON                         |
| Body         | NONE                         |


**Sample Request**

```{.copyWrapper}
curl -vX GET -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}
```

**Sample Response**

```
{
  "apps": [
    {
     "client_id": "7dce7fc297424fd65596b51c214666a4",
     "secret":"Yzg0ZDRjZTctMzUxNy00YmQ5LTRkM2UtMDdmODQ3MTNjNWM5",
     "redirect_uri": "/cats",
     "policy_id": "57f7b07647e0800001aa2320"
   },
   {
     "client_id": "72083e90e9b044c57e2667d49effff78",
     "secret": "YWUxZTM2ODItOTJjYS00MmIyLTQxZGEtZTE0M2MzNmYwMDI2",
     "redirect_uri": "",
     "policy_id": "57f7b07647e0800001aa2320"
    }
  ],
  "pages":0
}
```

#### Get an OAuth2.0 Client

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/apis/oauth/{{api-id}}/{{client_id}}` |
| Method       | GET                                        |
| Type         | JSON                                       |
| Body         | NONE                                       |


**Sample Request**

```{.copyWrapper}
curl -vX GET -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/apis/oauth/{{api-id}}/{{client_id}}
```

**Sample Response**

```
{
  "client_id": "7dce7fc297424fd65596b51c214666a4",
  "secret": "Yzg0ZDRjZTctMzUxNy00YmQ5LTRkM2UtMDdmODQ3MTNjNWM5",
  "redirect_uri": "/cats",
  "policy_id": "57f7b07647e0800001aa2320"
}
```

#### Delete OAuth Client

You can delete an OAuth client using a simple DELETE method. Please note that tokens issued with the client ID will still be valid until they expire.

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/apis/oauth/{{api-id}}/{{client_id}}` |
| Method       | DELETE                                     |
| Type         | JSON                                       |
| Body         | NONE                                       |


**Sample Request**

```{.copyWrapper}
curl -vX DELETE -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}/{{client_id}}
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "OAuth Client deleted successfully",
  "Meta":null
}
```

#### Retrieve All Current Tokens for Specified OAuth2.0 Client

This endpoint allows you to retrieve a list of all current tokens and their expiry date for a provided API ID and OAuth-client ID in the following format. This endpoint will work only for newly created tokens.

{{< note success >}}
**Note**  

This option is available from v2.6.0 onwards.
{{< /note >}}


| **Property** | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| Resource URL | `/api/apis/oauth/{apiID}/{oauthClientId}/tokens` |
| Method       | GET                                                  |
| Type         |                                                      |
| Body         | NONE                                                 |

**Sample Request**
```{.copyWrapper}
GET /api/apis/oauth/528a67c1ac9940964f9a41ae79235fcc/25348e8cf157409b52e39357fd9578f1/tokens HTTP/1.1
Host: localhost:3000
Authorization: {{API Access Credentials}}
Cache-Control: no-cache
```

**Sample Response**
```
[
  {
    "code": "5a7d110be6355b0c071cc339327563cb45174ae387f52f87a80d2496",
    "expires": 1518158407
  },
  {
    "code": "5a7d110be6355b0c071cc33988884222b0cf436eba7979c6c51d6dbd",
    "expires": 1518158594
  },
  {
    "code": "5a7d110be6355b0c071cc33990bac8b5261041c5a7d585bff291fec4",
    "expires": 1518158638
  },
  {
    "code": "5a7d110be6355b0c071cc339a66afe75521f49388065a106ef45af54",
    "expires": 1518159792
  }
]
```

You can control how long you want to store expired tokens in this list using `oauth_token_expired_retain_period` which specifies retain period for expired tokens stored in Redis. By default expired token not get removed. See [here](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-oauth-token-expired-retain-period-a-oauth-token-expired-retain-period) for more details.

#### Revoke a Single OAuth Client Token

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{oauthClientId}/revoke`       |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                             |
| Param        | None                                           |


**Sample Request**

```{.json}
POST /api/apis/oauth/411f0800957c4a3e81fe181141dbc22a/revoke
Host: localhost
Authorization 64c8e662f6924c4f55e94a873d75e44d
Body: {
  "token":"eyJvcmciOiI1ZTIwOTFjNGQ0YWVmY2U2MGMwNGZiOTIiLCJpZCI6IjIyODQ1NmFjNmJlMjRiMzI5MTIyOTdlODQ5NTc4NjJhIiwiaCI6Im11cm11cjY0In0=",
  "token_type_hint":"access_token"
}
```
**Sample Response**

```{.json}
{
  "Status": "OK",
  "Message": "token revoked successfully",
  "Meta": null
}
```
#### Revoke all OAuth Client Tokens

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{oauthClientId}/revoke_all`   |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                                  |
| Param        | None                                           |

**Sample Request**

```{.json}
POST /api/apis/oauth/411f0800957c4a3e81fe181141dbc22a/revoke_all
Host: localhost
Authorization: 64c8e662f6924c4f55e94a873d75e44d
Body: {
  "client_secret":"MzUyNDliNzItMDhlNy00MzM3LTk1NWUtMWQyODMyMjkwZTc0"
}
```

**Sample Response**

```{.json}
{
  "Status": "OK",
  "Message": "tokens revoked successfully",
  "Meta": null
}
```

#### OAuth2.0 Authorization Code

This endpoint is used in the [Authorization Code Grant]({{< ref "api-management/client-authentication#using-the-authorization-code-grant" >}}) flow, generating an authorization code that can be used by the client to request an access token.

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{{api_id}}/authorize-client/` |
| Method       | POST                                           |
| Type         | Form-Encoded                                   |
| Body         | Fields (see below)                             |

* `api_id`: Unlike the other requests on this page, this must be the `api_id` value and **NOT** the API's `id` value. 
* `response_type`: Should be provided by requesting client as part of authorization request, this should be either `code` or `token` depending on the methods you have specified for the API.
* `client_id`: Should be provided by requesting client as part of authorization request. The Client ID that is making the request.
* `redirect_uri`: Should be provided by requesting client as part of authorization request. Must match with the record stored with Tyk.
* `key_rules`: A string representation of a Session Object (form-encoded). *This should be provided by your application in order to apply any quotas or rules to the key.*

Note that in the following example, the `policy_id` isn't included in the request as these are optional. OAuth2.0 Flow also supports callbacks which can be added to the `key_rules` in the payload in requests that don't include the `policy_id`.


**Sample Request**

```{.copyWrapper}
curl -vX POST -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'response_type=code&client_id={{client_id}}&redirect_uri=http%3A%2F%2Foauth.com%2Fredirect&key_rules=%7B+++++%22allowance%22%3A+999%2C+++++%22rate%22%3A+1000%2C+++++%22per%22%3A+60%2C+++++%22expires%22%3A+0%2C+++++%22quota_max%22%3A+-1%2C+++++%22quota_renews%22%3A+1406121006%2C+++++%22quota_remaining%22%3A+0%2C+++++%22quota_renewal_rate%22%3A+60%2C+++++%22access_rights%22%3A+%7B+++++++++%22528a67c1ac9940964f9a41ae79235fcc%22%3A+%7B+++++++++++++%22api_name%22%3A+%22{{api_name}}%22%2C+++++++++++++%22api_id%22%3A+%{{api_id}}%22%2C+++++++++++++%22versions%22%3A+%5B+++++++++++++++++%22Default%22+++++++++++++%5D+++++++++%7D+++++%7D%2C+++++%22org_id%22%3A+%22{{org_id}}%22+%7D'
http://{{dashboard-hostname}}/api/apis/oauth/{{api_id}}/authorize-client
```

**Sample Response**

```
{
  "code": "MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk",
  "redirect_to": "http://localhost:3000/oauth-redirect/?code=MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk"
}
```

### Single Sign On API

{{< note success >}}
**Note**  

This functionality is available from [v2.9.0](https://tyk.io/docs/release-notes/version-2.9/#single-sign-on-for-the-tyk-saas). If you have an older version please using the [admin api](https://tyk.io/docs/tyk-apis/tyk-dashboard-admin-api/sso/)
{{< /note >}}


The Dashboard SSO API allows you to implement custom authentication schemes for the Dashboard and Portal. 
Our Tyk Identity Broker (TIB) internally also uses this API.

#### Generate authentication token

The Dashboard exposes the `/api/sso` Dashboard API which allows you to generate a temporary authentication token, valid for 60 seconds. 

You should provide JSON payload with the following data:

* `ForSection` - scope with possible values of `"dashboard"` or `"portal"` only.
* `OrgID` - organization id 
* `EmailAddress` - user email
* `GroupID` - user group id ( it is the mongo id and you can can find it in the url when opening a user group via Tyk- Dashboard UI or if you call Tyk-Dashboard REST API `/api/usergroups` )


| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/sso` |
| Method       | POST                         |
| Body         | `{"ForSection":"<scope>", "OrgID": "<org-id>", "EmailAddress": "<email-address>", "GroupID": "<user-group-id>"}`  |

**Sample Request**

```{.copyWrapper}
POST /api/sso HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
    
{
  "ForSection": "dashboard",
  "OrgID": "588b4f0bb275ff0001cc7471",
  "EmailAddress": "name@somewhere.com",
  "GroupID": ""
}
```

**Sample Response:**
```{.copyWrapper}
{"Status":"OK","Message":"SSO Nonce created","Meta":"YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw"}
```

See [Single Sign On]({{< ref "advanced-configuration/integrate/sso" >}}) documentation for how to use this token and more details.

### Web Hooks API

#### List web hooks

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/hooks`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
GET /api/hooks HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "hooks": [
    {
      "api_model": {},
      "id": "54be6c0beba6db07a6000002",
      "org_id": "54b53d3aeba6db5c35000002",
      "name": "Test Post",
      "method": "POST",
      "target_path": "http://httpbin.org/post",
      "template_path": "",
      "header_map": {
        "x-tyk-test": "123456"
      },
      "event_timeout": 0
    }
  ],
  "pages": 0
}
```

#### Get single web hook

| **Property** | **Description**        |
| ------------ | ---------------------- |
| Resource URL | `/api/hooks/{hook-id}` |
| Method       | GET                    |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
GET /api/hooks/54be6c0beba6db07a6000002 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "api_model": {},
  "id": "54be6c0beba6db07a6000002",
  "org_id": "54b53d3aeba6db5c35000002",
  "name": "Test Post",
  "method": "POST",
  "target_path": "http://httpbin.org/post",
  "template_path": "",
  "header_map": {
    "x-tyk-test": "123456"
  },
  "event_timeout": 0
}
```

#### Add hook

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/hooks`    |
| Method       | POST            |
| Type         | None            |
| Body         | Hook object     |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
POST /api/hooks HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "name": "New Post Test",
  "method": "POST",
  "target_path": "http://httpbin.org/post",
  "header_map": {
    "x-test": "y-answer"
  }
}    
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "Webhook created",
  "Meta": ""
}
```

#### Update hook

| **Property** | **Description**        |
| ------------ | ---------------------- |
| Resource URL | `/api/hooks/{hook-id}` |
| Method       | PUT                    |
| Type         | None                   |
| Body         | Hook object            |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
PUT /api/hooks/54c2617aeba6db1edc000003 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "api_model": {},
  "id": "54c2617aeba6db1edc000003",
  "org_id": "54b53d3aeba6db5c35000002",
  "name": "New Post Test",
  "method": "PUT",
  "target_path": "http://httpbin.org/post",
  "template_path": "",
  "header_map": {
    "x-test": "y-answer"
  },
  "event_timeout": 0
} 
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "Webhook updated",
  "Meta": ""
}
```

#### Delete web hook

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/api/hooks/{hook-id}`    |
| Method       | DELETE                    |
| Type         | None                      |
| Body         | None                      |
| Param        | None                      |

**Sample Request**

```{.copyWrapper}
DELETE /api/hooks/54c2617aeba6db1edc000003 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "Status": "OK",
  "Message": "Webhook deleted",
  "Meta": ""
}
```

### Open Policy Agent API

{{< note success >}}
**Note**  

The Open Policy Agent API helps you to manage (CRUD) the OPA (Open Policy Agent) rules that are being applied to the Tyk Dashboard. You can also change the OPA settings, such as to enable/disable it or enable/disable the debug mode.

Only Admin role Dashboard users are authorized to use it.
{{< /note >}}

For more information on how to configure OPA see [Open Policy Agent]({{< ref "tyk-dashboard/open-policy-agent" >}}).
#### List OPA rules and settings

This endpoint returns by defaul the initial set of OPA rules defined in your Tyk Dashboard, which are located in [schema/dashboard.rego]({{< ref "tyk-dashboard/opa-rules" >}}) (accessible in Self-Managed installations).

Once you update the rules via the API, the OPA rules will be stored at the organization level.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/api/org/opa        `|
| Method       | GET                   |
| Type         | None                  |
| Body         | None                  |
| Param        | None                  |

**Sample Request**

```{.copyWrapper}
GET /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

**Sample Response**

```
{
  "open_policy": {
    "enabled": true,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```
#### Update OPA rules and settings

{{< note success >}}
**Note**  

Whenever you want to update OPA rules or its settings, send the updated value of the OPA rules or changed values for the settings (`enabled`) via a PUT request to the `permissions` endpoint.

{{< /note >}}


| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/org/permission`    |
| Method       | PUT                      |
| Type         | None                     |
| Body         | Permissions Object       |
| Param        | None                     |

**Sample Request**

```{.copyWrapper}
PUT /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

```
{
  "open_policy": {
    "enabled": false,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```

**Sample Response**

```
{
    "Status": "OK",
    "Message": "OPA rules has been updated on org level",
    "Meta": null
}
```

## Using Dashboard Admin API

### API Usage Instructions

{{< note success >}}

**Important Note on Spelling:**

While our documentation now uses American English [(en-us)](https://www.andiamo.co.uk/resources/iso-language-codes/), the product itself, including all user interfaces, configuration 
fields, environment variables, and APIs, continues to use British English spellings. When interacting with the product, 
please continue using the British English (en-gb) spellings as appear in the interface and API.  This change does not affect 
how you use the product; all functionality remains the same. 

<br>

**Example:** The API endpoint `/organisation` as shown throughout this page uses British spelling (with an 's' not 'z').
In all other instances, such as when describing or referring to this object in the documentation, we will use the
American spelling “organization” with a 'z'.

{{< /note >}}

{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth`
 header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
</br>
{{< /warning >}}

### Organizations API

#### Retrieve a single Organization

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisation/{org-id}`  |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organization Object             |
| Param        | None                            |

**Sample Request**

```http
GET /admin/organisations/{ORG_ID} HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

**Sample Response**

```json
{
    "id": "5cc03283d07e7f00019404b3",
    "owner_name": "TestOrg5 Ltd.",
    "owner_slug": "testorg",
    "cname_enabled": true,
    "cname": "www.tyk-portal-test.com",
    "apis": [
        {
            "api_human_name": "First API #Test",
            "api_id": "5508bd9429434d5768c423a04db259ea"
        }
    ],
    "developer_quota": 0,
    "developer_count": 0,
    "event_options": {},
    "hybrid_enabled": false,
    "ui": {
        "languages": {},
        "hide_help": false,
        "default_lang": "",
        "login_page": {},
        "nav": {},
        "uptime": {},
        "portal_section": {},
        "designer": {},
        "dont_show_admin_sockets": false,
        "dont_allow_license_management": false,
        "dont_allow_license_management_view": false,
        "cloud": false
    },
    "org_options_meta": {}
}
```


#### Retrieve all Organizations

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisation/'          |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organization Object             |
| Param        | None                            |

**Sample Request**

```http
GET /admin/organisations/ HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

**Sample Response**

```json
{
    "organisations": [
        {
            "id": "5cc03283d07e7f00019404b3",
            "owner_name": "TestOrg5 Ltd.",
            "owner_slug": "testorg",
            "cname_enabled": true,
            "cname": "www.tyk-portal-test.com",
            "apis": [
                {
                    "api_human_name": "First API #Test",
                    "api_id": "5508bd9429434d5768c423a04db259ea"
                }
            ],
            "developer_quota": 0,
            "developer_count": 0,
            "event_options": {},
            "hybrid_enabled": false,
            "ui": {
                "languages": {},
                "hide_help": false,
                "default_lang": "",
                "login_page": {},
                "nav": {},
                "uptime": {},
                "portal_section": {},
                "designer": {},
                "dont_show_admin_sockets": false,
                "dont_allow_license_management": false,
                "dont_allow_license_management_view": false,
                "cloud": false
            },
            "org_options_meta": {}
        },
        {
            "id": "5ccae84aa402ce00018b5435",
            "owner_name": "Jively",
            "owner_slug": "",
            "cname_enabled": true,
            "cname": "jive.ly",
            "apis": [],
            "developer_quota": 0,
            "developer_count": 0,
            "event_options": {},
            "hybrid_enabled": false,
            "ui": {
                "languages": {},
                "hide_help": false,
                "default_lang": "",
                "login_page": {},
                "nav": {},
                "uptime": {},
                "portal_section": {},
                "designer": {},
                "dont_show_admin_sockets": false,
                "dont_allow_license_management": false,
                "dont_allow_license_management_view": false,
                "cloud": false
            },
            "org_options_meta": {}
        }
    ],
    "pages": 0
}
```

#### Create an Organization

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/admin/organisation/`  |
| Method       | POST                    |
| Type         | None                    |
| Body         | Organization Object     |
| Param        | None                    |

**Sample Request**

```http
POST /admin/organisations/ HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "owner_name": "Jively",
  "cname": "jive.ly",
  "cname_enabled": true
}
```

**Sample response**

```json
{
  "Status":"OK",
  "Message":"Org created",
  "Meta":"54b53d3aeba6db5c35000002"
}
```

#### Update an Organization

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisation/{id}`  |
| Method       | PUT                         |
| Type         | None                        |
| Body         | Organization Object         |
| Param        | None                        |

**Sample Request**

```http
PUT /admin/organisations/54b53d3aeba6db5c35000002 HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "owner_name": "Jively",
  "cname": "jive.ly",
  "cname_enabled": true
}
```

**Sample Response**

```json
{
  "Status":"OK",
  "Message":"Org updated",
  "Meta":""
}
```

#### Delete an Organization

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisation/{id}`  |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

**Sample Request**

```http
DELETE /admin/organisation/54b53d3aeba6db5c35000002 HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

**Sample Response**

```json
{
  "Status":"OK",
  "Message":"Org deleted",
  "Meta":""
}
```

### Users API

#### Get User

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/admin/users/{USER_ID}` |
| Method       | GET                       |
| Type         | None                      |
| Body         | None                      |
| Param        | None                      |

**Sample Request**

```{.copyWrapper}
GET /admin/users/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

**Sample Response**


```
{
  "api_model": {},
  "first_name": "Test",
  "last_name": "User",
  "email_address": "banana@test.com",
  "password": "",
  "org_id": "54b53d3aeba6db5c35000002",
  "active": true,
  "id": "54bd0ad9ff4329b88985aafb",
  "access_key": "f81ee6f0c8f2467d539c132c8a422346"
}
```

#### Add user

When you add a new user, they are created without a password being set. After adding a user, you need to use the [Set Password]({{< ref "tyk-dashboard-api/users#set-user-password" >}}) call to set a password using the `user-id` created.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/admin/users`  |
| Method       | POST            |
| Type         | None            |
| Body         | User Object     |
| Param        | None            |

**Sample Request**

```{.copyWrapper}
POST /admin/users HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "org_id": "5d15d3068ba30a0001621bfe",
  "first_name": "Jason",
  "last_name": "Jasonson",
  "email_address": "jason@jasonsonson.com",
  "active": true,
  "user_permissions": { "IsAdmin": "admin" }
}
```

{{< note success >}}
**Note**  

You can also create a user without an `org_id`. This will create a "Super User", who has global access to all APIs, Policies, etc, for all organizations created within Tyk.
{{< /note >}}


**Sample Response**


```
{
  "Status": "OK",
  "Message": "e5485fa02e12425974e1220e1636e4d0",
  "Meta": {
    "api_model": {},
    "first_name": "Jason",
    "last_name": "user",
    "email_address": "jason@jasonsonson.com",
    "org_id": "",
    "active": true,
    "id": "5d55378edd4b9e9c308e87da",
    "access_key": "e5485fa02e12425974e1220e1636e4d0",
    "user_permissions": {
      "IsAdmin": "admin"
    },
    "group_id": "",
    "password_max_days": 0,
    "password_updated": "0001-01-01T00:00:00Z",
    "PWHistory": [],
    "created_at": "2019-08-15T10:44:30.784Z"
  }
}
```


#### Update User

You need to have the `users` [Permission object]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) set to write to use **Update User**.

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/admin/users/{USER_ID}` |
| Method       | PUT                      |
| Type         | None                     |
| Body         | User Object              |
| Param        | None                     |


**Sample Request**

```{.copyWrapper}
PUT /admin/users/54c25e845d932847067402e2 HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "access_key": "3a8c1cea90af485575bb5455c2e9fb68",
  "first_name": "Jason",
  "last_name": "File",
  "email_address": "jason.file@jasonsonson.com",
  "active": true,
  "password": "plaintext_password",
  "user_permissions": { "IsAdmin": "admin" }
}
```

{{< note success >}}
**Note**  

If you are modifying a user password, you will need to include an access_key in the body of your request. This can be obtained from doing a GET to the same Resource URL.
{{< /note >}}

**Sample Response**


```
{
  "Status": "OK",
  "Message": "User updated",
  "Meta": ""
}
```

### Single Sign On API

The Dashboard Admin SSO API endpoint allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [Single Sign On]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}}) for more details.

#### Generate authentication token

The Dashboard exposes the `/admin/sso` Admin API which allows you to generate a temporary authentication token, valid for 60 seconds. 

You should provide JSON payload with the following data:

* `ForSection` - scope with possible values of `"dashboard"` or `"portal"` 
* `OrgID` - with your organization id. 
* `GroupID` - the group id 
* `EmailAddress` - user email 


| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/admin/sso` |
| Method       | POST                         |
| Body         | `{"ForSection":"<scope>", "OrgID": "<org-id>", "GroupID": "<group-id>"}`  |

**Sample Request**

```{.copyWrapper}
POST /admin/sso HTTP/1.1
Host: localhost:3000
admin-auth: 12345
    
{
  "ForSection": "dashboard",
  "OrgID": "588b4f0bb275ff0001cc7471",
  "EmailAddress": "name@somewhere.com",
  "GroupID": ""
}
```

**Sample Response:**

```{.copyWrapper}
{"Status":"OK","Message":"SSO Nonce created","Meta":"YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw"}
```

See [Single Sign On]({{< ref "advanced-configuration/integrate/sso" >}}) documentation for how to use this token and more details.

### URL Reload API

Since the Dashboard can have multiple URLs associated with it. It is possible to force a URL reload by calling an API endpoint of the Dashboard API.

#### Reload the Dashboard URLs

| **Property** | **Description**        |
| ------------ | ---------------------- |
| Resource URL | `/admin/system/reload` |
| Method       | GET                    |
| Type         | None                   |
| Body         | None                   |
| Param        | None                   |

**Sample Request**

```{.copyWrapper}
GET /admin/system/reload HTTP/1.1
Host: localhost:3000
admin-auth:12345
```

**Sample Response**

```
{
  "status": "ok"
}
```

### Export Assets API

To make Tyk installations more portable, the Export API enables you to export key configuration objects required to back-up and re-deploy a basic Tyk Pro installation.

{{< note success >}}
**Note**  

To enable this feature, the minimum required versions for the Gateway and Dashboard are v2.3 and v1.3.1.2, respectively.
{{< /note >}}

#### Export Organizations

The organization object is the most fundamental object in a Tyk setup, all other ownership properties hang off the relationship between an organization and its APIs, Policies and API Tokens.

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisations/{ORG-ID}` |
| Method       | GET                             |
| Type         | None                            |
| Body         | None                            |
| Param        | None                            |

**Sample Request**

```{.copyWrapper}
GET /admin/organisations/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

**Sample Response**


```
{
  "id": "53ac07777cbb8c2d53000002",
  "owner_name": "Test",
  "owner_slug": "test",
  "cname_enabled": true,
  "cname": "my.domain.com",
  "apis": [{
    "api_human_name": "API 2",
    "api_id": "5fa2db834e07444f760b7ceb314209fb"
  }, {
    "api_human_name": "API 1",
    "api_id": "7a6ddeca9244448a4233866938a0d6e2"
  }, {
    "api_human_name": "API 3",
    "api_id": "109eacaa50b24b64651a1d4dce8ec385"
  }],
  "developer_quota": 123,
  "developer_count": 21,
  "event_options": {
    "key_event": {
      "webhook": "",
      "email": "",
      "redis": true
    },
    "key_request_event": {
      "webhook": "",
      "email": "",
      "redis": false
    }
  },
  "hybrid_enabled": false,
  "ui": {
    "languages": {},
    "hide_help": false,
    "default_lang": "",
    "login_page": {},
    "nav": {},
    "uptime": {},
    "portal_section": {},
    "designer": {},
    "dont_show_admin_sockets": false,
    "dont_allow_license_management": false,
    "dont_allow_license_management_view": false
  }
}
```

#### Export APIs and Policies

To export APIs and Policies you should use the standard `GET APIS` endpoint and `GET POLICIES` list endpoints. The output from these endpoints can be used by the [Import API]({{< ref "tyk-apis/tyk-dashboard-admin-api/import" >}}).

### Import Assets API

The import API enables you to add *Organizations*, *APIs* and *Policies* back into a Tyk installation while retaining their base IDs so that they work together.

{{< note success >}}
**Note**  

To enable this feature, the minimum required versions for the Gateway and Dashboard are v2.3 and v1.3.1.2, respectively.
{{< /note >}}

#### Import Organization

The [Organization object]({{<ref "basic-config-and-security/security/dashboard/organisations" >}}) is the most fundamental object in a Tyk setup, all other ownership properties hang off the relationship between an Organization and its APIs, Policies and API Tokens.

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `admin/organisations/import` |
| Method       | POST                         |
| Type         | None                         |
| Body         | None                         |
| Param        | None                         |

**Sample Request**

```{.copyWrapper}
POST /admin/organisations/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "id": "53ac07777cbb8c2d53000002",
  "owner_name": "Test",
  "owner_slug": "test",
  "cname_enabled": true,
  "cname": "my.domain.com",
  "apis": [{
    "api_human_name": "API 2",
    "api_id": "5fa2db834e07444f760b7ceb314209fb"
  }, {
    "api_human_name": "API 1",
    "api_id": "7a6ddeca9244448a4233866938a0d6e2"
  }, {
    "api_human_name": "API 3",
    "api_id": "109eacaa50b24b64651a1d4dce8ec385"
  }],
  "developer_quota": 123,
  "developer_count": 21,
  "event_options": {
    "key_event": {
      "webhook": "",
      "email": "",
      "redis": true
    },
      "key_request_event": {
        "webhook": "",
        "email": "",
        "redis": false
    }
  },
  "hybrid_enabled": false,
  "ui": {
    "languages": {},
    "hide_help": false,
    "default_lang": "",
    "login_page": {},
    "nav": {},
    "uptime": {},
    "portal_section": {},
    "designer": {},
    "dont_show_admin_sockets": false,
    "dont_allow_license_management": false,
    "dont_allow_license_management_view": false
  }
}
```

#### Import APIs

The import APIs operates on *lists* of APIs.

| **Property** | **Description**     |
| ------------ | ------------------- |
| Resource URL | `admin/apis/import` |
| Method       | POST                |
| Type         | None                |
| Body         | None                |
| Param        | None                |

**Sample Request**

```{.copyWrapper}
POST /admin/apis/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "apis": [{
    "api_model": {},
    "api_definition": {...},
    "hook_references": [],
    "is_site": false,
    "sort_by": 0
}, {
    "api_model": {},
    "api_definition": {...},
    "hook_references": [],
    "is_site": false,
    "sort_by": 0
}]
}
```

#### Import Policies

The import Policies operates on *lists* of Policies.

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `admin/policies/import` |
| Method       | POST                    |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

**Sample Request**

```{.copyWrapper}
POST /admin/policies/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "Data": [{
    "_id": "57ed12fc30c55e6b890d37d8",
    "access_rights": {
      "5fa2db834e07444f760b7ceb314209fb": {
        "allowed_urls": [],
        "api_id": "5fa2db834e07444f760b7ceb314209fb",
        "api_name": "New API 1",
        "versions": ["Default"]
      },
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API1",
        "versions": ["Default"]
      }
    },
      "active": true,
      "date_created": "0001-01-01T00:00:00Z",
      "hmac_enabled": false,
      "is_inactive": false,
      "key_expires_in": 0,
      "last_updated": "1478791603",
      "name": "Default",
      "org_id": "53ac07777cbb8c2d53000002",
      "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
      },
      "per": 60,
      "quota_max": -1,
      "quota_renewal_rate": 3600,
      "rate": 1000,
      "tags": []
  }, {
    "_id": "5824343b30c55e52d5e6cfde",
    "access_rights": {
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API 1",
        "versions": ["Default"]
      }
    },
      "active": true,
      "date_created": "0001-01-01T00:00:00Z",
      "hmac_enabled": false,
      "is_inactive": false,
      "key_expires_in": 0,
      "last_updated": "1478791761",
      "name": "Test Policy",
      "org_id": "53ac07777cbb8c2d53000002",
      "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
      },
      "per": 1,
      "quota_max": 100,
      "quota_renewal_rate": 90000,
      "rate": 10,
      "tags": []
  }, {
    "_id": "58172a2330c55e22afcd59af",
    "access_rights": {
      "109eacaa50b24b64651a1d4dce8ec385": {
        "allowed_urls": [],
        "api_id": "109eacaa50b24b64651a1d4dce8ec385",
        "api_name": "API 3",
        "versions": ["Default"]
      },
      "5fa2db834e07444f760b7ceb314209fb": {
        "allowed_urls": [],
        "api_id": "5fa2db834e07444f760b7ceb314209fb",
        "api_name": "API 2",
        "versions": ["Default"]
      },
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API 1",
        "versions": ["Default"]
      },
      "d023576f836a4e407153009e8d95cf73": {
        "allowed_urls": [],
        "api_id": "d023576f836a4e407153009e8d95cf73",
        "api_name": "Test API",
        "versions": ["Default"]
      }
  },
    "active": true,
    "date_created": "0001-01-01T00:00:00Z",
    "hmac_enabled": false,
    "is_inactive": false,
    "key_expires_in": 2592000,
    "last_updated": "1477913123",
    "name": "Big Policy",
    "org_id": "53ac07777cbb8c2d53000002",
    "partitions": {
      "acl": false,
      "quota": false,
      "rate_limit": false
  },
  "per": 1,
  "quota_max": 6000,
  "quota_renewal_rate": 3600,
  "rate": 10,
  "tags": ["TEST-1", "TEST-2"]
}],
  "Pages": 0
}
```
