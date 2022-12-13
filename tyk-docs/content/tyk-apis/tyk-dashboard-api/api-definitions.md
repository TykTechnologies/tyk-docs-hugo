---
date: 2017-03-27T12:13:12+01:00
title: API Definitions
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

{{< note success >}}
**Note**  

See [API Definition Objects]({{< ref "tyk-gateway-api/api-definition-objects/" >}}) section for an explanation of each field in the request & response.
{{< /note >}}

### Get List of APIs

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/apis/`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

#### Sample Request

```{.copyWrapper}
GET /api/apis?p=0 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

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

### Search APIs by name

| **Property** | **Description**    |
| ------------ | ------------------ |
| Resource URL | `/api/apis/search` |
| Method       | GET                |
| Type         | None               |
| Body         | None               |
| Param        | None               |

#### Sample Request

```{.copyWrapper}
GET /api/apis?q=Some+Name HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

Similar to API list response

### Retrieve a single API by ID

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

#### Sample request

```{.copyWrapper}
GET /api/apis/54c24242eba6db1c9a000002 HTTP/1.1
Host: localhost
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

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

### Delete API by ID

#### Sample Request

```{.copyWrapper}
DELETE /api/apis/54c24242eba6db1c9a000002 HTTP/1.1
Host: localhost
Authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{"Status":"OK","Message":"API deleted","Meta":null}
```

### Create API Definition

Creating API definitions is slightly different to the core API, API definitions are wrapped inside an `api_definition` field and event handlers, such as webhooks are not embedded in the main `api_defintion` object (though they can be), webhooks are instead appended as references into the `hook_references` field, the API will embed the correct webhook data into the event handler interface.

Please note that ID's (both `id` and `api_id`) are auto-generated by Tyk and cannot be set by the user. In On-Premises installations `api_id` can be overwritten with a call to the Update API Definition endpoint, but this is currently not possible when the Dashboard resides in Tyk Cloud.

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/api/apis/`            |
| Method       | POST                    |
| Type         | None                    |
| Body         | Advanced API Definition |
| Param        | None                    |

#### Sample Request

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

#### Sample Response

```
{
  "Status": "OK",
  "Message": "API created",
  "Meta": "54c24242eba6db1c9a000002"
}
```

Please note that Tyk matches the Ignored paths in the order in which they are specified in the `ignored` array. Subpaths of a route are matched automatically and so should be placed above parent routes if they need to be matched individually.

### Update API Definition

APIs that are created using the advanced Dashboard API are referenced by their internal ID instead of their API-ID.

Please note that whilst `api_id` can be updated for On-Premises installations, this is currently not possible when the Dashboard resides in Tyk Cloud.  Updates to `api_id` in Tyk Cloud will be ignored.

| **Property** | **Description**                       |
| ------------ | ------------------------------------- |
| Resource URL | `/api/apis/{internal_or_external_id}` |
| Method       | PUT                                   |
| Type         | None                                  |
| Body         | Advanced API Definition               |
| Param        | None                                  |

#### Sample Request

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

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Api updated",
  "Meta": ""
}
```