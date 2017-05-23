---
date: 2017-03-27T11:23:45+01:00
title: API Management
menu:
  main:
    parent: "Tyk Rest API"
weight: 3 
---

API Management with the Tyk REST API is very simple, each update only affects the underlying file, and this endpoint will only work with disk based installations, not Database-backed ones.

API's that are added this way are flushed to to disk into the `app_path` folder using the format: `{api-id}.json`, updating existing API's that use a different naming convention will cause those API's to be *added*, which could subsequently lead to a loading error and crash if they use the same `listen_path`.

These methods only work on a single API node, if updating a cluster, it is important to ensure that all nodes are updated before initiating a reload.

### Create new API Definitions

A single Tyk node can have its API Definitions queried, deleted and updated remotely. This functionality enables you to remotely update your Tyk definitions without having to manage the files manually.

This endpoint will only update the file-based configurations of a single node, if you are running multiple Tyk instances, each will need to be updated independently

New definitions are loaded, and then re-encoded onto disk to prevent false file writes to your app's directory, if you are running Tyk in its default configuration, please ensure that the user the node is running under has write permissions to the apps folder defined in your `tyk.conf` file.

Finally, any new definitions are not made live, they do not get loaded into the muxer, in order to load the APIs, a hot-reload request should be sent to the node, this will then force a re-read of the definitions and make the definition live.


| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/tyk/apis/`    |
| Method       | POST            |
| Type         | None            |
| Body         | API Definition  |
| Param        | None            |

#### Sample request

```
    POST /tyk/apis/ HTTP/1.1
    Host: localhost:8080
    Connection: keep-alive
    Content-Length: 739
    Pragma: no-cache
    Cache-Control: no-cache

    {
        "id": "55780c119b23c3000100004f",
        "name": "HttpBin",
        "slug": "httpbin",
        "api_id": "2fdd8512a856434a61f080da67a88851",
        "org_id": "55780af69b23c30001000000",
        "use_keyless": true,
        "use_oauth2": false,
        "oauth_meta": {
            "allowed_access_types": [],
            "allowed_authorize_types": [],
            "auth_login_redirect": ""
        },
        "auth": {
            "use_param": false,
            "use_cookie": false,
            "auth_header_name": ""
        },
        "use_basic_auth": false,
        "enable_jwt": false,
        "jwt_signing_method": "",
        "notifications": {
            "shared_secret": "",
            "oauth_on_keychange_url": ""
        },
        "enable_signature_checking": false,
        "hmac_allowed_clock_skew": -1,
        "definition": {
            "location": "header",
            "key": "x-api-version"
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
                        "ignored": [],
                        "white_list": [],
                        "black_list": [],
                        "cache": [],
                        "transform": [],
                        "transform_response": [],
                        "transform_headers": [],
                        "transform_response_headers": [],
                        "hard_timeouts": [],
                        "circuit_breakers": [],
                        "url_rewrites": [],
                        "virtual": [],
                        "size_limits": []
                    },
                    "global_headers": {},
                    "global_headers_remove": [],
                    "global_size_limit": 0
                }
            }
        },
        "uptime_tests": {
            "check_list": [],
            "config": {
                "expire_utime_after": 0,
                "service_discovery": {
                    "use_discovery_service": false,
                    "query_endpoint": "",
                    "use_nested_query": false,
                    "parent_data_path": "",
                    "data_path": "",
                    "port_data_path": "",
                    "use_target_list": false,
                    "cache_timeout": 0,
                    "endpoint_returns_list": false
                },
                "recheck_wait": 0
            }
        },
        "proxy": {
            "listen_path": "/test/",
            "target_url": "http://httpbin.org/",
            "strip_listen_path": true,
            "enable_load_balancing": false,
            "target_list": [],
            "check_host_against_uptime_tests": false,
            "service_discovery": {
                "use_discovery_service": false,
                "query_endpoint": "",
                "use_nested_query": false,
                "parent_data_path": "",
                "data_path": "",
                "port_data_path": "",
                "use_target_list": false,
                "cache_timeout": 0,
                "endpoint_returns_list": false
            }
        },
        "custom_middleware": {
            "pre": [],
            "post": [],
            "response": []
        },
        "cache_options": {
            "cache_timeout": 60,
            "enable_cache": true,
            "cache_all_safe_requests": false,
            "enable_upstream_cache_control": false
        },
        "session_lifetime": 0,
        "active": true,
        "auth_provider": {
            "name": "",
            "storage_engine": "",
            "meta": {}
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
        "dont_set_quota_on_create": false,
        "expire_analytics_after": 0,
        "response_processors": [],
        "CORS": {
            "enable": false,
            "allowed_origins": [],
            "allowed_methods": [],
            "allowed_headers": [],
            "exposed_headers": [],
            "allow_credentials": false,
            "max_age": 0,
            "options_passthrough": false,
            "debug": false
        },
        "domain": "",
        "tags": []
    }
```

#### Sample Response

```
    {
        "key": "987654321",
        "status": "ok",
        "action": "added"
    }
```

### Update API Definitions

Updating an API definition uses the same signature an object as a POST, however it will first ensure that the API ID that is being updated is the same as the one in the object being `PUT`.

Updating will completely replace the file descriptor and will not change an API Definition that has already been loaded, the hot-reload endpoint will need to be called to push the new definition to live.

| **Property** | **Description**      |
| ------------ | -------------------- |
| Resource URL | `/tyk/apis/{api-id}` |
| Method       | PUT                  |
| Type         | None                 |
| Body         | API Definition       |
| Param        | None                 |

#### Sample request

```
    PUT /tyk/apis/987654321 HTTP/1.1
    Host: localhost:8080
    Connection: keep-alive
    Content-Length: 739
    Pragma: no-cache
    Cache-Control: no-cache


    {
        "id": "55780c119b23c3000100004f",
        "name": "HttpBin",
        "slug": "httpbin",
        "api_id": "2fdd8512a856434a61f080da67a88851",
        "org_id": "55780af69b23c30001000000",
        "use_keyless": true,
        "use_oauth2": false,
        "oauth_meta": {
            "allowed_access_types": [],
            "allowed_authorize_types": [],
            "auth_login_redirect": ""
        },
        "auth": {
            "use_param": false,
            "use_cookie": false,
            "auth_header_name": ""
        },
        "use_basic_auth": false,
        "enable_jwt": false,
        "jwt_signing_method": "",
        "notifications": {
            "shared_secret": "",
            "oauth_on_keychange_url": ""
        },
        "enable_signature_checking": false,
        "hmac_allowed_clock_skew": -1,
        "definition": {
            "location": "header",
            "key": "x-api-version"
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
                        "ignored": [],
                        "white_list": [],
                        "black_list": [],
                        "cache": [],
                        "transform": [],
                        "transform_response": [],
                        "transform_headers": [],
                        "transform_response_headers": [],
                        "hard_timeouts": [],
                        "circuit_breakers": [],
                        "url_rewrites": [],
                        "virtual": [],
                        "size_limits": []
                    },
                    "global_headers": {},
                    "global_headers_remove": [],
                    "global_size_limit": 0
                }
            }
        },
        "uptime_tests": {
            "check_list": [],
            "config": {
                "expire_utime_after": 0,
                "service_discovery": {
                    "use_discovery_service": false,
                    "query_endpoint": "",
                    "use_nested_query": false,
                    "parent_data_path": "",
                    "data_path": "",
                    "port_data_path": "",
                    "use_target_list": false,
                    "cache_timeout": 0,
                    "endpoint_returns_list": false
                },
                "recheck_wait": 0
            }
        },
        "proxy": {
            "listen_path": "/test/",
            "target_url": "http://httpbin.org/",
            "strip_listen_path": true,
            "enable_load_balancing": false,
            "target_list": [],
            "check_host_against_uptime_tests": false,
            "service_discovery": {
                "use_discovery_service": false,
                "query_endpoint": "",
                "use_nested_query": false,
                "parent_data_path": "",
                "data_path": "",
                "port_data_path": "",
                "use_target_list": false,
                "cache_timeout": 0,
                "endpoint_returns_list": false
            }
        },
        "custom_middleware": {
            "pre": [],
            "post": [],
            "response": []
        },
        "cache_options": {
            "cache_timeout": 60,
            "enable_cache": true,
            "cache_all_safe_requests": false,
            "enable_upstream_cache_control": false
        },
        "session_lifetime": 0,
        "active": true,
        "auth_provider": {
            "name": "",
            "storage_engine": "",
            "meta": {}
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
        "dont_set_quota_on_create": false,
        "expire_analytics_after": 0,
        "response_processors": [],
        "CORS": {
            "enable": false,
            "allowed_origins": [],
            "allowed_methods": [],
            "allowed_headers": [],
            "exposed_headers": [],
            "allow_credentials": false,
            "max_age": 0,
            "options_passthrough": false,
            "debug": false
        },
        "domain": "",
        "tags": []
    }
```

#### Sample Response

```
    {
        "key": "987654321",
        "status": "ok",
        "action": "updated"
    }
```

### Delete API Definitions

Deleting an API definition will remove the file from the file store, the API definition will NOT be unloaded, a separate reload request will need to be made to disable the API endpoint.

| **Property** | **Description**      |
| ------------ | -------------------- |
| Resource URL | `/tyk/apis/{api-id}` |
| Method       | DELETE               |
| Type         | None                 |
| Body         | None                 |
| Param        | None                 |

#### Sample request

```
    DELETE /tyk/apis/987654321 HTTP/1.1
    Host: localhost:8080
    Connection: keep-alive
    Content-Length: 739
    Pragma: no-cache
    Cache-Control: no-cache
```

#### Sample Response

    {
        "key": "987654321",
        "status": "ok",
        "action": "deleted"
    }