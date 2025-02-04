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
  - /advanced-configuration/transform-traffic/endpoint-designer
  - /transform-traffic/endpoint-designer
## Traffic Analytics
  - /analyse
  - /tyk-stack/tyk-pump/tyk-dash-analytics
  - /tyk-dashboard-analytics
  - /analytics-and-reporting/traffic-overview
  - /tyk-dashboard-analytics/traffic-overview
  - /analytics-and-reporting/log-browser
  - /tyk-stack/tyk-manager/analytics/log-browser
  - /tyk-dashboard-analytics/traffic-per-api
  - /analytics-and-reporting/traffic-per-api
  - /tyk-dashboard-analytics/traffic-per-token
  - /analytics-and-reporting/traffic-per-token
  - /product-stack/tyk-dashboard/advanced-configurations/analytics/activity-by-endpoint
  - /tyk-stack/tyk-manager/analytics/geographic-distribution
  - /analytics-and-reporting/geographic-distribution
  - /analytics-and-reporting/error-overview
  - /tyk-dashboard-analytics/error-overview
  - /tyk-dashboard-analytics/traffic-per-oauth-client
  - /analytics-and-reporting/traffic-per-oauth-client
## API Governance
  - /product-stack/tyk-dashboard/advanced-configurations/templates/template-overview
  - /product-stack/tyk-dashboard/advanced-configurations/templates/template-designer
  - /product-stack/tyk-dashboard/advanced-configurations/templates/template-api
  - /product-stack/tyk-dashboard/advanced-configurations/api-categories
## Administration
  - /basic-config-and-security/security/dashboard/dashboard-api-security
  - /basic-config-and-security/security/dashboard/dashboard-admin-api
  - /basic-config-and-security/security/dashboard/organisations
  - /product-stack/tyk-dashboard/advanced-configurations/analytics/audit-log
  - /tyk-dashboard/database-options
  - /product-stack/tyk-dashboard/advanced-configurations/data-storage-configuration
---

## Introduction

{{< img src="/img/diagrams/tyk-selfmanaged-architecture-dashboard.png" alt="Tyk Dashboard diagram" >}}

The Tyk Dashboard is a powerful web-based interface that serves as the **central management hub for your API ecosystem**. It provides a user-friendly Graphical User Interface (GUI) for configuring, monitoring, and analyzing your APIs managed by Tyk. 

The Dashboard also exposes a **REST API**, allowing for programmatic control and integration with other tools and workflows.

This page introduces general features of dashboard and how to configure them. If you are looking for global configurations of the Dashboard deployment refer this [config file]({{< ref "tyk-dashboard/configuration" >}}).

We will delve into the following key topics:

1. **[Exploring the Dasbhoard UI]({{< ref "#exploring-the-dashboard-ui" >}})**: A tour of the Dashboard UI.

2. **[Exploring the Dasbhoard API]({{< ref "#exploring-the-dashboard-api" >}})**: Explore the Dashboard APIs, including their classification, authentication methods, and usage examples with Swagger and Postman collections.

3. **[API Management using API Endpoint Designer]({{< ref "#exploring-api-endpoint-designer" >}})**: A graphical environment for configuring your Tyk APIs.

4. **[Monitoring and Traffic Analytics]({{< ref "#traffic-analytics" >}})**: Exploration of Tyk's traffic analytics capabilities, including logging mechanisms, error tracking, endpoint analysis, and various activity type measurements.

5. **[API Governance using API Templates and API Categories]({{< ref "#governance-using-api-categories" >}})**

6. **[System Management]({{< ref "#system-administration" >}})**: Detailed overview of Tyk's system management capabilities, including Admin API functionalities, organization management and configuting audit logs.
  
7. **[Supported Database]({{< ref "#supported-database" >}})**: We will examine Dashboard's storage requirement, compatible database versions and how to configure them.

7. **[Exploring Data Storage Solution]({{< ref "#data-storage-solutions" >}})**: We will explore Dashboard's multi-layered storage architecture and understand how to configure each storage tier effectively.

## Exploring the Dashboard UI

To get a tour of the Dashboard UI, refer to this [document]({{< ref "getting-started/using-tyk-dashboard" >}}).

## Exploring the Dashboard API

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

## Dashboard API Resources and Usage

### Overview

The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) is a superset of the Tyk Gateway API, enabling (almost) all of the core features and adding many more. The Dashboard API is also more granular and supports [Role Based Access Control]({{< ref "api-management/user-management#" >}}) (RBAC) on both a multi-tenant, and user basis.

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

See [API Definition Objects]({{< ref "api-management/gateway-config-tyk-classic" >}}) section for an explanation of each field in the request & response.
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

`{id}` can either be the internal or public ID ( see `api_id` in the sample response )
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

You need to have the `users` [Permission object]({{< ref "api-management/user-management#user-permissions" >}}) set to write to use **Add User**.

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

You need to have the `users` [Permission object]({{< ref "api-management/user-management#user-permissions" >}}) set to **read** to use **Set User Password**.

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

You need to have the `users` [Permission object]({{< ref "api-management/user-management#user-permissions" >}}) set to write to use **Update User**.

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

You need to have the `users` [Permission object]({{< ref "api-management/user-management#user-permissions" >}}) set to write to use this call.

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

## Dashboard Admin API Resources and Usage

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

When you add a new user, they are created without a password being set. After adding a user, you need to use the [Set Password]({{< ref "#set-user-password" >}}) call to set a password using the `user-id` created.

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

You need to have the `users` [Permission object]({{< ref "api-management/user-management#user-permissions" >}}) set to write to use **Update User**.

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

The Dashboard Admin SSO API endpoint allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [Single Sign On]({{< ref "#single-sign-on-api-1" >}}) for more details.

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

To export APIs and Policies you should use the standard `GET APIS` endpoint and `GET POLICIES` list endpoints. The output from these endpoints can be used by the [Import API]({{< ref "#import-assets-api" >}}).

### Import Assets API

The import API enables you to add *Organizations*, *APIs* and *Policies* back into a Tyk installation while retaining their base IDs so that they work together.

{{< note success >}}
**Note**  

To enable this feature, the minimum required versions for the Gateway and Dashboard are v2.3 and v1.3.1.2, respectively.
{{< /note >}}

#### Import Organization

The [Organization object]({{<ref "#organizations" >}}) is the most fundamental object in a Tyk setup, all other ownership properties hang off the relationship between an Organization and its APIs, Policies and API Tokens.

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

## Exploring API Endpoint Designer

### Classic APIs

Tyk Dashboard's Endpoint Designer provides a graphical environment for the creation and update of your Tyk Classic APIs.

The Endpoint Designer allows to configure all elements of your Tyk Classic API and consists of several tabs, plus a **Raw Definition** view which allows you to directly edit the Tyk Classic API Definition (in JSON format). Note that 

### Core Settings

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-core.png" alt="The Tyk Classic Endpoint Designer - Core Settings tab" >}}

The **Core Settings** tab provides access to configure basic settings for the API:
- [Detailed logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#tyk-classic" >}})
- API Settings including
   - Listen path
   - [API Categories]({{< ref "#governance-using-api-categories" >}})
- Upstream settings including
   - Upstream service (target) URL
   - [Service Discovery]({{< ref "tyk-self-managed#service-discovery" >}})
- [API Ownership]({{< ref "api-management/user-management#api-ownership" >}})
- [API level rate limiting]({{< ref "api-management/rate-limit#configuring-the-rate-limiter-at-the-api-level" >}})
- [Authentication]({{< ref "/api-management/client-authentication" >}})

### Versions

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-versions.png" alt="The Tyk Classic Endpoint Designer - Versions tab" >}}

The **Versions** tab allows you to create and manage [API versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) for the API.

At the top of the Endpoint Designer, you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load its endpoint configuration into the editor.

### Endpoint Designer

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-endpoint.png" alt="The Tyk Classic Endpoint Designer - Endpoint Designer tab" >}}

The **Endpoint Designer** is where you can define endpoints for your API so that you can enable and configure Tyk middleware to [perform checks and transformations]({{< ref "advanced-configuration/transform-traffic" >}}) on the API traffic.

In some cases, you will want to set global settings that affect all paths that are managed by Tyk. The **Global Version Settings** section will enable you to configure API-level [request]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#tyk-classic-api" >}}) and [response]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#tyk-classic-api" >}}) header transformation.

### Advanced Options

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-advanced.png" alt="The Tyk Classic Endpoint Designer - Advanced Options tab" >}}

The **Advanced Options** tab is where you can configure Tyk's other powerful features including:
- Upstream certificate management
- [API-level caching]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache#configuring-the-cache-via-the-dashboard" >}}) including a button to invalidate (flush) the cache for the API
- [CORS]({{< ref "api-management/gateway-config-tyk-classic#cors" >}})
- Add custom attributes to the API definition as *config data* that can be accessed by middleware
- Enable [context variables]({{< ref "context-variables" >}}) so that they are extracted from requests and made available to middleware
- Manage *segment tags* if you are working with [sharded gateways]({{< ref "api-management/multiple-environments#gateway-sharding" >}})
- Manage client IP address [allow]({{< ref "api-management/gateway-config-tyk-classic#ip-allowlist-middleware" >}}) and [block]({{< ref "api-management/gateway-config-tyk-classic#ip-blocklist-middleware" >}}) lists
- Attach [webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will be triggered for different events

### Uptime Tests

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-uptime.png" alt="The Tyk Classic Endpoint Designer - Uptime Tests tab" >}}

In the **Uptime Tests** tab you can configure Tyk's [Uptime Test]({{< ref "api-management/gateway-config-tyk-classic#uptime-tests" >}}) functionality

### Debugging

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-debugging.png" alt="The Tyk Classic Endpoint Designer - Debugging tab" >}}

The **Debugging** tab allows you to test your endpoints before you publish or update them. You can also use it for testing any middleware plugins you have implemented. Any debugging you create will persist while still in the current API, enabling you to make changes in the rest of the API settings without losing the debugging scenario.

The Debugging tab consists of the following sections:

- Request
- Response
- Logs

##### Request

{{< img src="/img/2.10/debugging_request.png" alt="Debugging Request" >}}

In this section, you can enter the following information:

- Method - select the method for your test from the drop-down list
- Path - your endpoint to test
- Headers/Body - enter any header information, such as Authorization, etc. Enter any body information. For example, entering user information if creating/updating a user.

Once you have entered all the requested information, click **Run**. Debugging Response and Log information will be displayed:

##### Response

{{< img src="/img/2.10/debugging_results.png" alt="Debugging Response" >}}

The Response section shows the JSON response to your request.

##### Logs

{{< img src="/img/2.10/debugging_logs.png" alt="Debugging Logs" >}}

The debugging level is set to **debug** for the request. This outputs all logging information in the Endpoint Designer. In the Tyk Gateway logs you will see a single request. Any Error messages will be displayed at the bottom of the Logs output.

## Traffic Analytics

The Tyk Dashboard provides a full set of analytics functions and graphs that you can use to segment and view your API traffic and activity. The Dashboard offers a great way for you to debug your APIs and quickly pin down where errors might be cropping up and for which clients.

{{< note success >}}
**Note**

In Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) we introduced [User Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) which can be used to limit the visibility of aggregate statistics to users when API Ownership is enabled. Due to the way that the analytics data are aggregated, not all statistics can be filtered by API and so may be inaccessible to users with the Owned Analytics permission.
{{< /note >}}

### How does Tyk capture and process Traffic Analytics?
When a client makes a request to the Tyk Gateway, the details of the request and response are captured and stored in a temporary Redis list. This list is read (and then flushed) every 10 seconds by the [Tyk Pump]({{< ref "tyk-pump" >}}). The Pump processes the records that it has read from Redis and forwards them to the required data sinks using the pumps configured in your system. You can set up multiple pumps and configure them to send different analytics to different data sinks.

The Mongo Aggregate and SQL Aggregate pumps perform aggregation of the raw analytics records before storing the aggregated statistics in the MongoDB or SQL database respectively.

{{< note success >}}
**Note**

Note that you must [enable traffic analytics]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic">}}) in your Tyk Gateway so that it will generate analytics records.
{{< /note >}}

#### Minimal pump configuration for Tyk Dashboard analytics
For the Tyk Dashboard's analytics functionality to work, you must configure both per request and aggregated pumps for the database platform that you are using
 - if you are using MongoDB, you must configure `mongo` and `mongo_aggregate` pumps
 - if you are using SQL, you must configure `sql` and `sql_aggregate` pumps

#### Per-request (raw) analytics
The transaction records contain information about each request and response, such as path or status. The fields captured in each analytics record are included in the [Tyk Pump documentation]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields">}}).

It is also possible to enable [detailed request logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording">}}) in the Gateway so that Tyk will log the requests and responses (including payloads) in wire format as base64 encoded data.

These data are displayed in the Log Browser, on the [Activity logs]({{< ref "#activity-logs" >}}) screen in the Tyk Dashboard.

#### Aggregated analytics
The [Mongo Aggregate]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#2-mongo-aggregate-pump">}}) and [SQL Aggregate]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#2-sql-aggregate-pump">}}) pumps will collate statistics from the analytics records, aggregated by hour, for the following keys:

| Key            |  Analytics aggregated by         | Dashboard screen                                                                              |
|----------------|----------------------------------|-----------------------------------------------------------------------------------------------|
| `APIID`        | API                              | [Activity by API]({{< ref "#activity-by-api" >}})                      |
| `TrackPath`    | API endpoint                     | [Activity by endpoint]({{< ref "#activity-by-endpoint" >}}) |
| `ResponseCode` | HTTP status code (success/error) | [Activity by errors]({{< ref "#activity-by-error" >}})                    |
| `APIVersion`   | API version                      | n/a                                                                                              |
| `APIKey`       | Client access key/token          | [Activity by Key]({{< ref "#activity-by-key" >}})                    |
| `OauthID`      | OAuth client (if OAuth used)     | [Traffic per OAuth Client]({{< ref "#activity-by-oauth-client" >}})    |
| `Geo`          | Geographic location of client    | [Activity by location]({{< ref "#activity-by-location" >}}) |
| `Tags`         | Custom session context tags      | n/a                                                                                              |

## Analyzing API Traffic Activity

### API Activity Dashboard

The first screen (and main view) of the Tyk Dashboard will show you an overview of the aggregate usage of your APIs, this view includes the number of hits, the number of errors and the average latency over time for all of your APIs as an average:

{{< img src="/img/2.10/analytics_overview2.png" alt="API Activity Dashboard" >}}

You can toggle the graphs by clicking the circular toggles above the graph to isolate only the stats you want to see.

Use the Start and End dates to set the range of the graph, and the version drop-down to select the API and version you wish to see traffic for.

You can change the granularity of the data by selecting the granularity drop down (in the above screenshot: it is set to “Day”).

The filter by tag option, in a graph view, will enable you to see the graph filtered by any tags you add to the search.

Below the aggregate graph, you’ll see an error breakdown and endpoint popularity chart. These charts will show you the overall error type (and code) for your APIs as an aggregate and the popularity of the endpoints that are being targeted by your clients:

{{< img src="/img/2.10/error_breakdown.png" alt="Error Breakdown and Endpoints" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Error Breakdown and Endpoint Popularity charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

### Activity Logs

When you look through your Dashboard and your error breakdown statistics, you'll find that you will want to drill down to the root cause of the errors. This is what the Log Browser is for.

The Log Browser will isolate individual log lines in your analytics data set and allow you to filter them by:

* API Name
* Token ID (hashed)
* Errors Only
* By Status Code

You will be presented with a list of requests, and their metadata:

{{< img src="/img/2.10/log_browser.png" alt="Log Viewer" >}}

Click a request to view its details.

{{< img src="/img/2.10/log_browser_selected.png" alt="Log Viewer Details" >}}

#### Self-Managed Installations Option

In an Self-Managed installation, if you have request and response logging enabled, then you can also view the request payload and the response if it is available.
To enable request and response logging, please take a look at [useful debug modes]({{< ref "api-management/troubleshooting-debugging#capturing-detailed-logs" >}}) .

**A warning on detailed logging:** This mode generates a very large amount of data, and that data exponentially increases the size of your log data set, and may cause problems with delivering analytics in bulk to your MongoDB instances. This mode should only be used to debug your APIs for short periods of time.

{{< note success >}}
**Note**  

Detailed logging is not available for Tyk Cloud Classic customers.
{{< /note >}}

### Activity by API

To get a tabular view of how your API traffic is performing, you can select the **Activity by API** option in the navigation and see a tabular view of your APIs. This table will list out your APIs by their traffic volume and you'll be able to see when they were last accessed:

{{< img src="/img/2.10/traffic_api.png" alt="Activity per API" >}}

You can use the same range selectors as with the Dashboard view to modify how you see the data. However, granularity and tag views will not work since they do not apply to a tabulated view.

If you select an API name, you will be taken to the drill-down view for that specific API, here you will have a similar Dashboard as you do with the aggregate API Dashboard that you first visit on log in, but the whole view will be constrained to just the single API in question:

{{< img src="/img/2.10/average_use_api.png" alt="Traffic per API: CLosed graph" >}}

You will also see an error breakdown and the endpoint popularity stats for the API:

{{< img src="/img/2.10/error_breakdown_api.png" alt="API error breakdown pie chart" >}}

Tyk will try to normalize endpoint metrics by identifying IDs and UUIDs in a URL string and replacing them with normalized tags, this can help make your analytics more useful. It is possible to configure custom tags in the configuration file of your Tyk Self-Managed or Multi-Cloud installation.

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Error Breakdown and Endpoint Popularity charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

### Activity by Key

You will often want to see what individual keys are up to in Tyk, and you can do this with the **Activity per Key** section of your analytics Dashboard. This view will show a tabular layout of all keys that Tyk has seen in the range period and provide analytics for them:

{{< img src="/img/dashboard/usage-data/test_alias_key.png" alt="Activity per Token" >}}

You'll notice in the screenshot above that the keys look completely different to the ones you can generate in the key designer (or via the API), this is because, by default, Tyk will hash all keys once they are created in order for them to not be snooped should your key-store be breached.

This poses a problem though, and that is that the keys also no longer have any meaning as analytics entries. You'll notice in the screenshot above, one of the keys is appended by the text **TEST_ALIAS_KEY**. This is what we call an Alias, and you can add an alias to any key you generate and that information will be transposed into your analytics to make the information more human-readable.

The key `00000000` is an empty token, or an open-request. If you have an API that is open, or a request generates an error before we can identify the API key, then it will be automatically assigned this nil value.

If you select a key, you can get a drill down view of the activity of that key, and the errors and codes that the token has generated:

{{< img src="/img/2.10/traffic_by_key.png" alt="Traffic activity by key graph" >}}

{{< img src="/img/2.10/error_by_key.png" alt="Errors by Key" >}}

(The filters in this view will not be of any use except to filter by API Version).

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Traffic per Key</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

### Activity by endpoint

To get a tabular view of how your API traffic is performing at the endpoint level, you can select the Activity by Endpoint option in the navigation and see a tabular view of your API endpoints. This table will list your API endpoints by their traffic volume and you’ll be able to see when they were last accessed:

{{< img src="img/dashboard/analytics/endpoint_popularity.png" alt="Activity by endpoint" >}}

#### Controlling which endpoints appear in the analytics data

The aggregate pumps have an option to `track_all_paths` which will ensure that all analytics records generated by the Tyk Gateway will be included in the aggregated statistics on the Endpoint Popularity screen. Set this to `true` to capture all endpoints in the aggregated data and subsequently on the Dashboard page.

You can alternatively select only a subset of the endpoints to include in the aggregated data by setting `track_all_paths` to `false` and identifying specific endpoints to be "tracked". These are identified by the `TrackPath` [flag]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields#trackpath" >}}) being set to `true` in the record. In this configuration, the Pump will only include transaction records from "tracked" endpoints in the aggregated data.

Tyk Gateway will set `TrackPath` to `true` in transaction records generated for endpoints that have the track endpoint middleware enabled.

{{< note success >}}
**Note**  

The *track endpoint* middleware only affects the inclusion of endpoints in the per-endpoint aggregates, it does not have any impact on other [aggregated data]({{< ref "#aggregated-analytics" >}}) nor the [per-request data]({{< ref "#per-request-raw-analytics" >}}).
{{< /note >}}

#### Selecting Tyk OAS APIs endpoints to be tracked

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The track endpoint middleware (`trackEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `trackEndpoint` object has the following configuration:
 - `enabled`: enable the middleware for the endpoint

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-track-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-track-endpoint",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-track-endpoint/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "trackEndpoint": {
                        "enabled": true
                    }               
                }
            }
        }
    }
}
```

In this example the track endpoint middleware has been configured for requests to the `GET /anything` endpoint. These requests will appear in the Endpoint Popularity analytics screen, located within the API Usage section of Tyk Dashboard.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the track endpoint middleware.

##### Configuring the middleware in the API Designer

Adding the track endpoint middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Track Endpoint middleware**

    Select **ADD MIDDLEWARE** and choose the **Track Endpoint** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-track.png" alt="Adding the Track Endpoint middleware" >}}

3. **Save the API**

    Select **SAVE API** to apply the changes to your API.

#### Selecting Tyk Classic API endpoints to be tracked 
If you are working with Tyk Classic APIs then you must add a new `track_endpoints` object to the `extended_paths` section of your API definition.

The `track_endpoints` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "track_endpoints": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET",
            }
        ]
    }
}
```

In this example the track endpoint middleware has been configured for HTTP `GET` requests to the `/anything` endpoint.  These requests will appear in the Endpoint Popularity analytics screen, located within the API Usage section of Tyk Dashboard.

##### Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the track endpoint middleware for your Tyk Classic API by following these steps.

1. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to allow access. Select the **Track endpoint** plugin.

    {{< img src="img/dashboard/analytics/classic_track_endpoint.png" alt="Select the middleware" >}}

2. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware for the selected endpoint.

### Activity by Location

Tyk will attempt to record GeoIP based information based on your inbound traffic. This requires a MaxMind IP database to be available to Tyk and is limited to the accuracy of that database.

You can view the overview of what the traffic breakdown looks like per country, and then drill down into the per-country traffic view by selecting a country code from the list:

{{< img src="/img/2.10/geographic_dist.png" alt="Geographic Distribution" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Geographic Distribution</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

**MaxMind Settings**

To use a MaxMind database, see [MaxMind Database Settings]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_geo_ip" >}}) in the Tyk Gateway Configuration Options.

### Activity by Error

The error overview page limits the analytics down to errors only, and gives you a detailed look over the range of the number of errors that your APIs have generated. This view is very similar to the Dashboard, but will provide more detail on the error types:

{{< img src="/img/2.10/errors_overview.png" alt="Error Overview" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Errors by Category data will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

### Activity by Oauth Client

Traffic statistics are available on a per OAuth Client ID basis if you are using the OAuth mode for one of your APIs. To get a breakdown view of traffic aggregated to a Client ID, you will need to go to the **System Management -> APIs** section and then under the **OAuth API**, there will be a button called **OAuth API**. Selecting an OAuth client will then show its aggregate activity

{{< img src="/img/dashboard/system-management/oauthClientNav.png" alt="OAuth Client" >}}

In the API list view – an **OAuth Clients** button will appear for OAuth enabled APIs, use this to browse to the Client ID and the associated analytics for that client ID:

{{< img src="/img/dashboard/system-management/oauthClientAnalytics.png" alt="OAuth Client Analytics Data" >}}

You can view the analytics of individual tokens generated by this Client ID in the regular token view.

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Traffic per OAuth Client ID charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "api-management/user-management#user-permissions" >}}) permission.
{{< /note >}}

---

## Governance using API Categories

API categorization is a governance feature provided within the Tyk Dashboard that helps you to manage a portfolio of APIs. You can filter the list of APIs visible in the Dashboard UI or to be returned by the Dashboard API by category. You can assign an API to any number of categories and any number of APIs to a category. All category names are entirely user defined.

### When to use API categories
#### Managing a large portfolio of APIs
As a platform manager looking after a large portfolio of APIs, if I need to make changes to a sub-set of APIs, it's cumbersome having to identify which APIs they are and then to find them one-by-one in the list. If I have assigned categories to my APIs then I can filter quickly and easily to work with that sub-set. What's really powerful is that an API can appear in as many different categories as I like. 

#### Multi-tenant deployment
Multi-tenant deployments with [role-based access control]({{< ref "api-management/user-management#" >}}) enabled allows an admin user to give different users or groups access to a sub-set of the entire API portfolio. Categories can be aligned with the API ownership rules that you have deployed to allow filtering the list of APIs for those visible to each separate user group/team.

### How API categories work
API categories with Tyk are a very simple concept - you can define any string as a category and then tag the relevant APIs with that string.

Categories might refer to the API's general focus (e.g. 'weather' or 'share prices'); they might relate to geographic location (e.g. 'APAC' or 'EMEA'); they might refer to technical markers (e.g. 'dev', 'test'); or anything else you might need. It's completely up to you.

Categories can be defined, added to and removed from APIs without limitation.

#### Tyk OAS APIs
When a Tyk OAS API is assigned to a category, the category name (string) is appended to a list in the database object where the API definition is stored by Tyk Dashboard. No change is made to the API definition itself.

#### Tyk Classic APIs
When a Tyk Classic API is assigned to a category, the category name (string) is appended to the `name` field in the API definition using a `#` qualifier. For example, let's say you have an API with this (partial) API definition:
``` json
{
    "name": "my-classic-api"  
}
```
You can add it to the `global` and `staging` categories by updating the API definition to:
``` json
{
    "name": "my-classic-api #global #staging"  
}
```
When a Tyk Classic API is migrated from one environment to another using Tyk Sync, it will retain any category labels that it has been assigned.

{{< note success >}}
**Note**  

The use of the `#` qualifier to identify a category prevents the use of `#` in your API names; this is not an issue when working with Tyk OAS APIs.
{{< /note >}}

### Using API categories
API categories can be added and removed from APIs within the [API Designer]({{< ref "#api-designer" >}}), via the [Tyk Dashboard API]({{< ref "#tyk-dashboard-api" >}}), or via [Tyk Operator]({{< ref "/api-management/automations/operator#what-is-tyk-operator" >}}).

#### API Designer
The API Designer in the Tyk Dashboard UI provides a simple method for assigning APIs to categories, removing categories and filtering the API list by category.

##### Managing categories with Tyk OAS APIs
When working with Tyk OAS APIs, the API Designer has a separate **Access** tab where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-oas.png" alt="Tyk OAS API Designer" >}} 

You can choose existing categories from the drop-down or define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-oas-add.png" alt="Managing categories for a Tyk OAS API" >}}

##### Managing categories with Tyk Classic APIs
When working with Tyk Classic APIs, the API Designer has a box in the **API Settings** section where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-classic.png" alt="Tyk Classic API Designer" >}} 

You can choose existing categories from the list that appears when you click in the box or you can define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-classic-add.png" alt="Managing categories for a Tyk Classic API" >}}

##### Filtering the API list
When you have APIs assigned to categories, you can choose to view only the APIs in a specific category by using the **FILTER BY API CATEGORY** drop-down on the **Created APIs** screen.
{{< img src="/img/dashboard/endpoint-designer/categories-filter.png" alt="View APIs in a category" >}} 

#### Tyk Dashboard API
The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) provides endpoints to manage categories directly, if you are not using the API Designer.

When working with Tyk OAS APIs, you can manage categories for an API using these endpoints:

| Method | Endpoint path                        | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/oas/{apiID}/categories`   | Assign a list of categories to the specified API   
| `GET`  | `/api/apis/oas/{apiID}/categories`   | Retrieve the list of categories assigned to the specified API                          |

When working with Tyk Classic APIs, you manage categories for an API by modifying the `name` field in the API definition and then updating the API in Tyk with that using these endpoints:

| Method | Endpoint                             | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/{apiID}`                  | Update the API definition for the specified API - CRUD category tags in the `name` field |
| `GET`  | `/api/apis/{apiID}`                  | Retrieve the API definition for the specified API - category tags in `name` field      |

These endpoints will return information for categories across all APIs in the system (both Tyk OAS and Tyk Classic):

| Method | Endpoint path                        | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `GET`  | `/api/apis/categories`               | Retrieve a list of all categories defined in the system and the number of APIs in each |
| `GET`  | `/api/apis?category={category_name}` | Retrieve a list of all APIs assigned to the specified category                         |

#### Tyk Operator

You can manage categories using Tyk Operator custom resources. Please refer to [Tyk Operator]({{<ref "/api-management/automations/operator#api-categories">}}) documentation to see how to manage API categories for Tyk OAS APIs and Tyk Classic APIs.

## Governance using API Templates

API Templates are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The default template is a blank API definition; your custom templates will contain some configuration, for example cache configuration or default endpoints with pre-configured middleware. When you create a new API using a custom template, whether importing an OpenAPI document or building the API from scratch in the Tyk API Designer, those elements of the API configuration included in the template will be pre-configured for you.

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "api-management/gateway-config-introduction#api-definition-types" >}}) and can be managed via the Tyk Dashboard API or within the Tyk Dashboard UI.
{{< /note >}}

### When to use API templates
#### Gateway agnostic API design
When working with OpenAPI described upstream service APIs, your service developers do not need to learn about Tyk. You can create and maintain a suitable suite of templates that contain the Tyk-specific configuration (`x-tyk-api-gateway`) that you require for your externally published API portfolio. Creating an API on Tyk is as simple as importing the OpenAPI document and selecting the correct template. Tyk will combine the OpenAPI description with the template to produce a valid Tyk OAS API.

#### Standardizing API configuration
If you have specific requirements for your external facing APIs - for example authentication, caching or even a healthcheck endpoint - you can define the appropriate API templates so that when APIs are created on Tyk these fields are automatically and correctly configured.

### How API templating works
An API template is a blueprint from which you can build new APIs - it is an incomplete JSON representation of a Tyk OAS API definition that you can use as the starting point when creating a new API on Tyk. There is no limit to how much or how little of the API definition is pre-configured in the template (such that when you choose to create a new API without choosing a template, the blank API definition that you start from is itself a template).

Templates are used only during the creation of an API, they cannot be applied later. Before you can use a template as the basis for an API, you must register the template with Tyk Dashboard.

#### Structure of an API template
An API template asset has the following structure:
 - `id`: a unique string type identifier for the template
 - `kind`: the asset type, which is set to `oas-template`
 - `name`: human-readable name for the template
 - `description`: a short description of the template, that could be used for example to indicate the configuration held within the template
 - `data`: a Tyk OAS API definition, the content of which will be used for templating APIs
 - `_id`: a unique identifier assigned by Tyk when the template is registered in the Dashboard database

#### Creating an API from a template
When you use a template during the [creation]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}) of an API, the fields configured in `data` will be pre-set in your new API. You are able to modify these during and after creation of the template. No link is created between the API and the template, so changes made to the API will not impact the template.

#### Merging with an OpenAPI description or Tyk OAS API definition
When you use a template during the creation of an API where you [import]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) the OpenAPI document or a full Tyk OAS API definition, the template is combined with the imported OAS description. If the `x-tyk-api-gateway` extension exists in the template, it will be applied to the newly created API.

Where there are clashes between configuration in the OpenAPI description and the template:
 - for maps, such as `paths` and `components`, new keys will be added alongside any existing ones from the template
   - if a key in the OpenAPI description matches one in the template, the OpenAPI description takes precedence
 - for array properties, such as `servers` and `tags`, values in the OpenAPI description will replace those in the template

<hr>

If you're using the API Designer in the Tyk Dashboard UI, then you can find details and examples of how to work with API templates [here]({{< ref "#working-with-api-templates-using-the-template-designer" >}}).

If you're using the Tyk Dashboard API, then you can find details and examples of how to work with API templates [here]({{< ref "#working-with-api-templates-using-the-dashboard-api" >}}).

### Working with API Templates using the Template Designer

[API Templates]({{< ref "#governance-using-api-templates" >}}) are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The Tyk Dashboard UI provides the following functionality to support working with API templates:
 - Creating templates
   - [new template]({{< ref "#creating-a-new-api-template" >}})
   - [from an existing API]({{< ref "#creating-a-template-from-an-existing-api" >}})
 - Using templates
   - [when creating an API]({{< ref "#using-a-template-when-creating-a-new-api" >}})
   - [when importing an OpenAPI description or API definition]({{< ref "#using-a-template-when-importing-an-openapi-description-or-api-definition" >}})
 - [Managing templates]({{< ref "#managing-templates" >}})

API Templates can be found in the **API Templates** section of the **API Management** menu in the Tyk Dashboard. This screen lists all the templates currently registered with Tyk and displays their names and short descriptions. It also gives access to options to create and manage templates.

{{< img src="/img/dashboard/api-assets/api-templates/api-templates-menu.png" alt="API Templates" >}}

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "api-management/gateway-config-introduction#api-definition-types" >}}).
{{< /note >}}

#### Creating templates
API templates can be created starting from a blank template or from an existing API

##### Creating a new API template
To create a template, simply visit the **API Templates** section of the Tyk Dashboard and select **ADD TEMPLATE**.

This will take you to the **Create API Template** screen, where you can configure all aspects of the template.

The template does not need to be a complete or valid API definition however as a minimum:
 - you must give the template a **Name**
 - you must give the template a **Description**

In this example, we have configured just the Name, Description, Gateway Status and Access settings:

{{< img src="/img/dashboard/api-assets/api-templates/create-api-template.png" alt="Configure the template" >}}
 
When you have configured all of the API-level and endpoint-level settings you require, select **SAVE TEMPLATE** to create and register the template with Tyk.

Returning to the **API Template** screen you will see your new template has been added to the list and assigned a unique `id` that can be used to access the template from the [Tyk Dashboard API]({{< ref "#structure-of-an-api-template" >}}):

{{< img src="/img/dashboard/api-assets/api-templates/template-created.png" alt="Template has been successfully created" >}}

##### Creating a template from an existing API
You can use an existing API deployed on Tyk as the basis for a new API template - this is a great way to build up a portfolio of standardized APIs once you've got your first one correctly configured.

From the **Created APIs** screen within the **APIs** section of the Tyk Dashboard, select the API that you wish to use as your starting point. In the **ACTIONS** drop-down select the **CREATE API TEMPLATE** option.

{{< img src="/img/dashboard/api-assets/api-templates/create-from-api.png" alt="Select Create API Template" >}}

This will take you to the **Create API Template** screen, where you can configure all aspects of the template.

The template does not need to be a complete or valid API definition however as a minimum:
 - you must give the template a **Name**
 - you must give the template a **Description**

In this example, we have configured the Name and Description. The base API included response header transformation middleware on the `/anything` endpoint and API-level cache configuration, all of which will be configured within the template.

{{< img src="/img/dashboard/api-assets/api-templates/second-template.png" alt="Configure the template" >}}
{{< img src="/img/dashboard/api-assets/api-templates/second-template-cache.png" alt="Cache settings inherited from base API" >}}
{{< img src="/img/dashboard/api-assets/api-templates/second-template-endpoints.png" alt="Endpoint settings inherited from base API" >}}
 
When you have configured all of the API-level and endpoint-level settings you require, select **SAVE TEMPLATE** to create and register the template with Tyk.

Returning to the **API Template** screen you will see your new template has been added to the list and assigned a unique `id` that can be used to access the template from the [Tyk Dashboard API]({{< ref "#structure-of-an-api-template" >}}).

{{< img src="/img/dashboard/api-assets/api-templates/second-template-created.png" alt="Template has been successfully created" >}}

#### Using templates
API templates are used as the starting point during the creation of a new API. They can be applied in all of the methods supported by Tyk for creating new APIs.

##### Using a template when creating a new API
There are two ways to base a new API, created entirely within the Tyk Dashboard's API Designer, on a template that you've created and registered with Tyk.

You can go from the **API Template** screen - for the template you want to use, select **CREATE API FROM TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template.png" alt="Select Create API from template" >}}

Or, from the **Created APIs** screen, select **ADD NEW API** as normal and then select the template you want to use from the **API Template** section:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template2.png" alt="Select the template you want to use" >}}

Both of these routes will take you through to the API Designer, where the settings from your API template will be pre-configured.

In this example, we applied "My first template" that we created [here]({{< ref "#creating-a-new-api-template" >}}). You can see that the Gateway Status and Access fields have been configured:
{{< img src="/img/dashboard/api-assets/api-templates/created-api.png" alt="The API with template applied" >}}

##### Using a template when importing an OpenAPI description or API definition
From the **Import API** screen, if you select the OpenAPI **type** then you can create an API from an OpenAPI description or Tyk OAS API definition; choose the appropriate method to provide this to the Dashboard:
- paste the JSON into the text editor
- provide a plain text file containing the JSON
- provide a URL to the JSON
{{< img src="/img/dashboard/api-assets/api-templates/import-select-source.png" alt="Options when importing an OpenAPI description" >}} 

After pasting the JSON or locating the file, you can select the template you want to use from the **API Template** section:
{{< img src="/img/dashboard/api-assets/api-templates/import-select-template.png" alt="Select the template you want to use" >}} 

In this example we used this simple OpenAPI description and selected "My second template" that we created [here]({{< ref "#creating-a-template-from-an-existing-api" >}}):
``` json  {linenos=true, linenostart=1}
{
  "components": {},
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://httpbin.org"
    }
  ],
  "paths": {
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  }
}
```
The API that is created has both `/xml` and `/anything` endpoints defined, with API-level caching configured. You can see the API definition [here](https://gist.github.com/andyo-tyk/5d5cfeda404ce1ba498bbf4b9c105cf0).

#### Managing templates
The Dashboard UI allows you to edit and delete templates after they have been created and registered with the Tyk Dashboard

##### Editing a template
You can make changes to a template that has been registered with Tyk from the **API Templates** screen. For the template that you want to modify, simply select **EDIT TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

This will take you to the **API Template Details** screen where you can view the current template configuration. If you want to make changes, simply select **EDIT** to make the fields editable:
{{< img src="/img/dashboard/api-assets/api-templates/template-editor.png" alt="Modifying the API template" >}} 

Alternatively you can view and modify the raw JSON for the template by selecting **VIEW RAW TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/template-raw-editor.png" alt="Modifying the API template JSON" >}} 

You'll need to select **SAVE TEMPLATE** to apply your changes from either screen.

##### Deleting a template
You can delete a template from your Tyk Dashboard from the **API Template Details** screen. This screen can be accessed by selecting the template from the **API Templates** screen (either by clicking on the template name, or selecting **EDIT TEMPLATE** from the **ACTIONS** menu):
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

From the **API Template Details** screen you can select **DELETE TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/delete-template.png" alt="Deleting the API template" >}} 

{{< note success >}}
**Note**  

You will be asked to confirm the deletion, because this is irrevocable. Once confirmed, the template will be removed from the database and cannot be recovered.
{{< /note >}}

### Working with API Templates using the Dashboard API

[API Templates]({{< ref "#governance-using-api-templates" >}}) are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The Tyk Dashboard API provides the following functionality to support working with API templates:
 - [registering a template with Tyk Dashboard]({{< ref "#registering-a-template-with-tyk-dashboard" >}})
 - [applying a template when creating an API from an OpenAPI document]({{< ref "#applying-a-template-when-creating-an-api-from-an-openapi-document" >}})
 - [applying a template when creating an API from a Tyk OAS API definition]({{< ref "#applying-a-template-when-creating-an-api-from-a-tyk-oas-api-definition" >}})

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "api-management/gateway-config-introduction#api-definition-types" >}}).
{{< /note >}}

#### Structure of an API template
An API template asset has the following structure:
 - `id`: a unique string type identifier for the template
 - `kind`: the asset type, which is set to `oas-template`
 - `name`: human-readable name for the template
 - `description`: a short description of the template, that could be used for example to indicate the configuration held within the template
 - `data`: a Tyk OAS API definition, the content of which will be used for templating APIs
 - `_id`: a unique identifier assigned by Tyk when the template is registered in the Dashboard database

#### Registering a template with Tyk Dashboard
To register an API template with Tyk, you pass the asset in the body of a `POST` request to the dashboard's `/api/assets` endpoint.

For example, if you send this command to the endpoint:
``` bash {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/assets' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer d9957aff302b4f5e5596c86a685e63d8' \
--data '{
  "kind": "oas-template",
  "name": "my-template",
  "description": "My first template",
  "id": "my-unique-template-id",
  "data": {
    "info": {
      "title": "",
      "version": ""
    },
    "openapi": "3.0.3",
    "paths": {
      "/anything": {
        "post": {
          "operationId": "anythingpost",
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    },
    "x-tyk-api-gateway": {
      "middleware": {
        "global": {
          "cache": {
            "enabled": true,
            "timeout": 5,
            "cacheAllSafeRequests": true
          }
        },
        "operations": {
          "anythingpost": {
            "requestSizeLimit": {
              "enabled": true,
              "value": 100
            }
          }
        }
      }
    }
  }
}'
```

Tyk will respond with `HTTP 201 Created` and will provide this payload in response:
``` json
{
    "Status": "success",
    "Message": "asset created",
    "Meta": "65e8c352cb71918520ff660c",
    "ID": "my-unique-template-id"
}
```

Here `Meta` contains the database ID (where the asset has been registered in the persistent storage) and `ID` contains the unique identifier for the template. This unique identifier will be automatically generated by Tyk if none was provided in the `id` of the template asset provided in the `curl` request.

#### Applying a template when creating an API from an OpenAPI document
When creating an API on Tyk using an OpenAPI document describing your upstream service, you can use the `/apis/oas/import` endpoint to import the OpenAPI description and apply it to your API.

If you have a template registered with your Dashboard, you can use this as the starting point for your new API. Tyk will combine the OpenAPI document with the template, automating the configuration of any element in the Tyk OAS API definition as defined in your chosen template.

You'll need to identify the template to be used during the import. You can use either its unique `id` or the database ID that was assigned when the template was [registered with Tyk Dashboard]({{< ref "#registering-a-template-with-tyk-dashboard" >}}). You provide either the `id` or `_id ` in the `templateID` query parameter in the call to `/oapis/oas/import`.

For example:
``` bash  {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/apis/oas/import?templateID=my-unique-template-id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <DASHBOARD_SECRET>' \
--data '{
  "components": {},
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://httpbin.org"
    }
  ],
  "paths": {
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  }
}'
```
Tyk will respond with `HTTP 200 OK` and will provide this payload in response:
``` json
{
    "Status": "OK",
    "Message": "API created",
    "Meta": "65e8c4f4cb71918520ff660d",
    "ID": "970560005b564c4755f1db51ca5660e6"
}
```

Here `Meta` contains the database ID (where the API has been registered in the persistent storage) and `ID` contains the unique identifier for the API. This unique identifier will be automatically generated by Tyk as none was provided in the `id` field of the `x-tyk-api-gateway.info` field provided in the `curl` request.

The new Tyk OAS API will have this definition, combining the OpenAPI description provided in the body of the `curl` request with the template with Id `my-unique-template-id`:
``` json  {linenos=true, linenostart=1}
{
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/"
    },
    {
      "url": "http://httpbin.org"
    }
  ],
  "security": [],
  "paths": {
    "/anything": {
      "post": {
        "operationId": "anythingpost",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "65e8c4f4cb71918520ff660d",
      "id": "970560005b564c4755f1db51ca5660e6",
      "orgId": "65d635966ec69461e0e7ee52",
      "name": "my-open-api-document",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "cache": {
          "cacheResponseCodes": [],
          "cacheByHeaders": [],
          "timeout": 5,
          "cacheAllSafeRequests": true,
          "enabled": true
        }
      },
      "operations": {
        "anythingpost": {
          "requestSizeLimit": {
            "enabled": true,
            "value": 100
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org"
    }
  }
}
```
Note that the `GET /xml` endpoint from the OpenAPI description and the `POST /anything` endpoint from the template (complete with `requestSizeLimit` middleware) have both been defined in the API definition. API-level caching has been enabled, as configured in the template. Tyk has included the `server` entry from the OpenAPI description (which points to the upstream server) and added the API URL on Tyk Gateway ([as explained here]({{< ref "api-management/gateway-config-tyk-oas#import-oas-definition" >}})).

#### Applying a template when creating an API from a Tyk OAS API definition
When creating an API using a complete Tyk OAS API definition (which includes `x-tyk-api-gateway`), you can use the `/apis/oas` endpoint to import the API defintiion.

If you have a template registered with your Dashboard, you can use this as the starting point for your new API. Tyk will combine the API definition with the template, automating the configuration of any element defined in your chosen template.

You'll need to identify the template to be used during the import. You can use either its unique `id` or the database ID that was assigned when the template was [registered with Tyk Dashboard]({{< ref "#registering-a-template-with-tyk-dashboard" >}}). You provide either the `id` or `_id` in the `templateID` query parameter in the call to `/apis/oas`.

For example:
``` bash  {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/apis/oas?templateID=my-unique-template-id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <DASHBOARD_SECRET>' \
--data '{
  "components": {},  
  "info": {
    "title": "example-api",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-api",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-api/"
      }
    },    
    "middleware": {
      "operations": {
        "jsonget": {
          "transformResponseHeaders": {
            "enabled": true,
            "add": [
              {
                "name": "X-Foo",
                "value": "bar"
              }
            ]
          }
        }
      }
    }
  }
}'
```
Tyk will respond with `HTTP 200 OK` and will provide this payload in response:
``` json
{
    "Status": "OK",
    "Message": "API created",
    "Meta": "65e98ca5cb71918520ff6616",
    "ID": "b8b693c5e28a49154659232ca615a7e8"
}
```

Here `Meta` contains the database ID (where the API has been registered in the persistent storage) and `ID` contains the unique identifier for the API. This unique identifier will be automatically generated by Tyk as none was provided in the `id` field of the `x-tyk-api-gateway.info` field provided in the `curl` request.

The new Tyk OAS API will have this definition, combining the Tyk OAS API definition provided in the body of the `curl` request with the template with Id `my-unique-template-id`:

``` json  {linenos=true, linenostart=1}
{
  "info": {
    "title": "example-api",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/example-api/"
    }
  ],
  "security": [],
  "paths": {
    "/anything": {
      "post": {
        "operationId": "anythingpost",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "65e98ca5cb71918520ff6616",
      "id": "b8b693c5e28a49154659232ca615a7e8",
      "orgId": "65d635966ec69461e0e7ee52",
      "name": "example-api",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "cache": {
          "cacheResponseCodes": [],
          "cacheByHeaders": [],
          "timeout": 5,
          "cacheAllSafeRequests": true,
          "enabled": true
        }
      },
      "operations": {
        "anythingpost": {
          "requestSizeLimit": {
            "enabled": true,
            "value": 100
          }
        },
        "jsonget": {
          "transformResponseHeaders": {
            "enabled": true,
            "add": [
              {
                "name": "X-Foo",
                "value": "bar"
              }
            ]
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-api/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```
Note that the `GET /json` endpoint from the OpenAPI description and the `POST /anything` endpoint from the template (complete with `requestSizeLimit` middleware) have both been defined in the API definition. API-level caching has been enabled, as configured in the template.

## System Administration

The Tyk Dashboard Admin API provides the following administrator level functions:
 - Managing [organizations]({{< ref "#organizations" >}}).
 - Creating initial [users]({{< ref "api-management/dashboard-configuration#users-api-1" >}}) during boot-strapping of the system.
 - Forcing a [URL reload]({{< ref "api-management/dashboard-configuration#url-reload-api" >}}).
 - [Exporting]({{< ref "#export-assets-api" >}}) and [importing]({{< ref "#import-assets-api" >}}) Tyk assets (orgs, APIs, policies) for backup or when migrating between environments.
 - Setting up [SSO integration]({{< ref "#single-sign-on-api-1" >}}).

### Organizations

Many businesses have a complex structure, for example a lot of distinct departments where each department has its own teams. You might also need to deploy and manage multiple environments such as Production, Staging and QA for different stages in your product workflow. The Tyk Dashboard is multi-tenant capable which allows you to use a single Tyk Dashboard to host separate *organizations* for each team or environment.

An Organization is a completely isolated unit, and has its own:
 - API Definitions
 - API Keys
 - Users
 - Developers
 - Domain
 - Tyk Classic Portal 

When bootstrapping your Dashboard, the first thing the bootstrap script does is to create a new default Organization.

Additional organizations can be created and managed using the [Dashboard Admin API]({{< ref "#organizations-api" >}}).

#### Tyk Gateway and organizations
The concept of an organization does not exist within the Tyk Gateway. Gateways only proxy and validate the rules imposed on them by the definitions and keys that are being processed, however at their core there are some security checks within the Gateway that ensure organizational ownership of objects.

Tyk allows each organization to own its own set of Gateways, for example when you want to use different hosting providers you can segregate them in terms of resources, or just for security reasons.

Self-Managed users should use [API tagging]({{< ref "api-management/multiple-environments#api-tagging-with-on-premises" >}}) and enforce a tagging standard across all organizations.

All actions in a Self-Managed installation of Tyk must use a base Organization, and all actions should stem from a User owned by that organization.

{{< note success >}}
**Note**

A user that does not belong to an Organization is sometimes referred to as an *unbounded user*. These users have visibility across all Organizations, but should be granted read-only access.
{{< /note >}}

### Dashboard Audit Logs

The audit log system captures detailed records of all requests made to endpoints under the `/api` route. These audit logs can be stored either in files (in JSON or text format) or in the database, providing flexible options for log management and retrieval.

Subsequently, if hosting Tyk Dashboard within a Kubernetes cluster, please ensure that the configured log file path is valid and writeable.

The Tyk Dashboard config section contains an audit section for configuring audit logging behavior. An example is listed below.

```yaml
  ...
  "audit": {
    "enabled": true,
    "format": "json",
    "path": "/tmp/audit.log",
    "detailed_recording": false
  },
  ...
```

#### Configuration Parameters

| Parameter | Description                                                                                                                                                              | Default |
| ---- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| enabled | Enable audit logging. Setting `security.audit_log_path` also enables audit logging                                                                                       | true    |
| format | Specifies audit log file format. Valid values are `json` and `text`                                                                                                      | `text`  |
| path | Path to the audit log. Overwrites `security.audit_log_path` if it was set                                                                                                |         |
| detailed_recording | Enable detailed records in the audit log. If set to `true` then audit log records will contain the http-request (without body) and full http-response including the body | `false` |
| store_type | Specifies the storage in which audit logs will be written, valid values are `file` and `db`.                                                          | `file`  |

Please consult [Tyk Dashboard Configuration Options]({{< ref "tyk-dashboard/configuration#audit" >}}) for equivalent configuration with environment variables.

#### JSON File Format

Audit records the following fields for `json` format:

| Field | Description |
| ---- | ---- |
| req_id | Unique request ID |
| org_id | Organization ID |
| date   | Date in *RFC1123* format |
| timestamp | UNIX timestamp |
| ip | IP address the request originated from |
| user | Dashboard user who performed the request |
| action | Description of the action performed (e.g. Update User) |
| method | HTTP request method |
| url | URL of the request |
| status | HTTP response status of the request |
| diff | Provides a diff of changed fields (available only for PUT requests) |
| request_dump | HTTP request copy (available if `detailed_recording` is set to `true`) |
| response_dump | HTTP response copy (available if `detailed_recording` is set to `true`) |

#### Text File Format

The `text` format outputs all fields as plain text separated with a new line and provided in the same order as `json` format.

#### Database Storage Support

In addition to file storage, audit logs can be stored in the main database (MongoDB or Postgres), this feature has been available since Tyk 5.7.0. To enable database storage set `audit.store_type` to `db`:

```yaml
...
    "audit": {
      "enabled": true,
      "store_type": "db",
      "detailed_recording": false
    }
...
```

When `store_type` is set to `db`, audit logs will be stored in the main database storage instead of a file.

#### Retrieving Audit Logs via API

Since Tyk 5.7.0 a new API endpoint has been added to allow authorized users to retrieve audit logs from the database storage. To know more about the API specifications, check out the swagger [documentation]({{<ref "tyk-dashboard-api" >}}).
To access the audit logs through the API ensure that your user account or group has been granted the "Audit Logs" RBAC group. If you do not have the necessary permissions, please contact your system administrator.

## Supported Database

Tyk Dashboard requires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. 

### MongoDB Supported Versions

{{< include "mongodb-versions-include" >}}

#### Configuring MongoDB

Please check [here]({{< ref "tyk-self-managed#mongodb" >}}) for MongoDB driver and production configurations.

### PostgreSQL Supported Versions

{{< include "sql-versions-include" >}}

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

#### Configuring PostgreSQL

Please check [here]({{< ref "#configuring-postgresql" >}}) for production configurations.

See the following pages for configuring your SQL installation with Tyk:

* [Configuring Tyk Dashboard]({{< ref "#configuring-postgresql" >}})
* [Configuring Tyk Pumps]({{< ref "#configuring-postgresql" >}})

All data stored in SQL platforms will be identical to our existing MongoDB support.

### Which platform should you use?

{{< note success >}}
**Note** 

Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"tyk-self-managed#postgresql" >}}), [MongoDB]({{< ref "tyk-self-managed#mongodb" >}}), or one of the listed compatible alternatives.
{{< /note >}}

We recommend the following:

* For PoC installations, you can use PostgreSQL or MongoDB.
* For production installations, we **only** support MongoDB or PostgreSQL

## Data Storage Solutions

Tyk stores a variety of data in 4 separate data storage layers. You can configure each layer separately to use one of our supported database platforms. Alternatively a single platform can be used for all layers. The 4 data storage layers are as follows:
1. **Main**: Stores configurations of: APIs, Policies, Users and User Groups.
2. **Aggregate Analytics**: Data used to display Dashboard charts and [analytics]({{< ref "#traffic-analytics" >}}).
3. **Logs**: When [detailed logging]({{< ref "api-management/troubleshooting-debugging#capturing-detailed-logs" >}}) is enabled, request and response data is logged to storage. These logs can previewed in the Dashboard [log browser]({{< ref "#activity-logs" >}}).
4. **Uptime**: Uptime test analytics.

Being extensible, Tyk supports storing this data across different databases (MongoDB, MySQL and PostgreSQL etc.). For example, Tyk can be configured to store analytics in PostgreSQL, logs in MongoDB and uptime data in MySQL.

As illustrated below it can be seen that Tyk Pump writes to one or more external data sources via a Redis store. Conversely, Tyk Dashboard reads this data from the external data sources. 

{{< img src="/img/diagrams/diagram_docs_pump-open-source@2x.png"  alt="Tyk Dashboard Pump Architecture" >}}

The following details are required to manage this configuration:
- Data storage layer type
- Database engine
- Database connection string

The remainder of this document explains how to configure Tyk Dashboard and Tyk Pump to read and write from one or more data storage layers, respectively.

### Configure Dashboard to Read from a Data Storage Layer

Tyk Dashboard has configuration environment variables for each data storage layer in the following format:

```console
TYK_DB_STORAGE_<LAYER>_TYPE
TYK_DB_STORAGE_<LAYER>_CONNECTIONSTRING
```

where *LAYER* can be *ANALYTICS*, *LOGS* or *UPTIME*.

For example, to configure Tyk Dashboard to read logs from a mongo database, the following environment variables are required:

```console
TYK_DB_STORAGE_LOGS_TYPE=mongo
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING=mongodb://db_host_name:27017/tyk_analytics
```

The full set of environment variables are listed below:

```console
TYK_DB_STORAGE_MAIN_TYPE
TYK_DB_STORAGE_MAIN_CONNECTIONSTRING
TYK_DB_STORAGE_LOGS_TYPE
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING
TYK_DB_STORAGE_ANALYTICS_TYPE
TYK_DB_STORAGE_ANALYTICS_CONNECTIONSTRING
TYK_DB_STORAGE_UPTIME_TYPE
TYK_DB_STORAGE_UPTIME_CONNECTIONSTRING
```

It should be noted that Tyk will attempt to use the configuration for the *main* data storage layer when no corresponding configuration is available for logs, uptime or analytics.

Please refer to the [storage configuration]({{< ref "tyk-dashboard/configuration#storage" >}}) section to explore the parameters for configuring Tyk Dashboard to read from different storage layers.


### Configure Pump to Write to Data Storage Layers?

Please consult the Pump configuration [guide]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#3-sql-uptime-pump" >}}) for an explanation of how to configure Tyk Pump to write to different storage layers.

The remainder of this section explains the *environment variables* that can be used to configure Tyk Pump to write to the following data storage layers:
- Uptime
- Aggregated Analytics
- Logs

#### Write Uptime Data

Tyk Pump can be configured to write uptime data to SQL (Postgres and SQL Lite) and Mongo. The default behavior is to write to Mongo.

##### PostgreSQL Database

Tyk Pump can be configured to write to a PostgreSQL database, using the following environment variables:

- *TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE*: Set to *sql* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_UPTIMEPUMPCONFIG_TYPE*: Set to *postgres* to configure Pump to use a PostgreSQL database for uptime data.
- *TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING*: Set the connection string for the PostgreSQL database.

An example configuration is shown below:

```console
TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE=sql
TYK_PMP_UPTIMEPUMPCONFIG_TYPE=postgres
TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_analytics
```

Further details for configuring an uptime SQL database are available [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#uptime_pump_configuptime_type" >}})

##### Mongo Database

Tyk Pump can be configured to write to a Mongo database, using the following environment variables:

- *TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE*: Set to *mongo* to configure Pump to store logs in a Mongo database.
- *TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL*: Set to Mongo database connection string.
- *TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME*: Set to the name of the collection used to store uptime analytics.

```console
TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE=mongo
TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL=mongodb://db_host_name:27017/tyk_uptime_db
TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME=umptime_analytics
```

Further details for configuring a Tyk Mongo Pump are available [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#uptime_pump_config" >}})

#### Write Logs Data

Tyk Pump can be configured to write logs to Mongo or SQL based databases.

##### Mongo Database

Tyk Pump can be configured to write to a Mongo database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *mongo* to configure Pump to store logs in a Mongo database.
- *TYK_PMP_PUMPS_LOGS_META_MONGOURL*: Set the connection string for the Mongo database.
- *TYK_PMP_PUMPS_LOGS_META_COLLECTION_NAME*: Set the name of the collection that will store logs in the Mongo database.

An example is listed below:

```console
TYK_PMP_PUMPS_LOGS_TYPE=mongo
TYK_PMP_PUMPS_LOGS_META_MONGOURL=mongodb://tyk-mongo:27017/tyk_analytics
TYK_PMP_PUMPS_LOGS_META_COLLECTIONNAME=tyk_logs
```

##### PostgreSQL Database

Tyk Pump can be configured to write to a PostgreSQL database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *SQL* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_PUMPS_LOGS_META_TYPE*: Set to *postgres* to configure Pump to store logs in a PostgreSQL database.
- *TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING*: Set the name of the connection string for the PostgreSQL database.

```console
TYK_PMP_PUMPS_LOGS_TYPE=SQL
TYK_PMP_PUMPS_LOGS_META_TYPE=postgres
TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_analytics
```

##### MySQL Database

Tyk Pump can be configured to write to a MySQL database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *SQL* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_PUMPS_LOGS_META_TYPE*: Set to *mysql* to configure Pump to store logs in a MySQL database.
- *TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING*: Set the name of the connection string for the MySQL database.

```console
TYK_PMP_PUMPS_LOGS_TYPE=SQL
TYK_PMP_PUMPS_LOGS_META_TYPE=mysql
TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING=mysql://db_host_name:3306/tyk_logs_db
```

#### Write Aggregated Analytics Data

Aggregated analytics corresponds to data that is used for the display of charts and graphs in [dashboard]({{< ref "#traffic-analytics" >}}). Tyk Pump can be configured to write aggregated analytics data to SQL based databases or MongoDB.

##### SQL Database

{{< note success >}}
**Note** 

Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"tyk-self-managed#postgresql" >}}), [MongoDB]({{< ref "tyk-self-managed#mongodb" >}}), or one of the listed compatible alternatives.
{{< /note >}}

Storage of aggregated analytics data has been tested with PostgreSQL and SqlLite databases. The following environment variables can be used to manage this configuration:

- *TYK_PMP_PUMPS_SQLAGGREGATE_TYPE*: Set to *sql_aggregate* to configure Pump to store aggregated analytics data for charts and graphs in dashboard to a SQL based database.
- *TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE*: The database engine used to store aggregate analytics. Tested values are *postgres* or *sqlite*.
- *TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING*: The connection string for the database that will store the aggregated analytics.

The example below demonstrates how to configure Tyk Pump to write aggregated to a PostgreSQL database:

```console
TYK_PMP_PUMPS_SQLAGGREGATE_TYPE=SQL
TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE=postgres
TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_aggregated_analytics
```

##### Mongo Database

Tyk Pump can be configured to write aggregated analytics data to MongoDB. Aggregated analytics are written to a collection named *z_tyk_analyticz_aggregate_{ORG ID}*, where *ORG_ID* corresponds to the ID of your organization assigned by Tyk.

The following environment variables can be used as a minimum to manage this configuration:

- *TYK_PMP_PUMPS_MONGOAGGREGATE_TYPE*: Set to *mongo-pump-aggregate* to configure Pump to store aggregated analytics data in a MongoDB database.
- *TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOURL*: Mongo database connection URL.

An example is given below:

```console
- TYK_PMP_PUMPS_MONGOAGGREGATE_TYPE=mongo-pump-aggregate
- TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOURL=mongodb://db_host_name:27017/tyk_aggregated_analytics_db
```
