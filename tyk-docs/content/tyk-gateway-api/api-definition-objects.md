---
title: Tyk Classic API Definition Object
description: "This page describes the Tyk classic API definition"
tags: ["Tyk API definition", "API definition", "api definition object"]
menu:
  main:
    parent: "Tyk Gateway API"
weight: 1
aliases:
  - /tyk-dashboard-v1-0/api-management/
  - /tyk-rest-api/api-management/
  - /tyk-rest-api/api-definition-object-details
  - /tyk-rest-api/api-definition-objects/
  - /tyk-apis/tyk-gateway-api/api-definition-objects/
---

Tyk stores API configurations as JSON objects called API Definitions. If you are using *Tyk Dashboard* to manage Tyk, then these are stored in either Postgres or MongoDB, as specified in the [database settings]({{< ref "planning-for-production/database-settings" >}}). On the other hand, if you are using *Tyk OSS*, these configurations are stored as files in the `/apps` directory of the Gateway which is located at the default path `/opt/tyk-gateway`.

An API Definition has many settings and middlewares that influence the way incoming requests are processed.

Below, you will find an example of a Tyk Classic API Definition.

```json
{
  "id": "5a4f1c029764510001dbc3f1",
  "name": "Sales Demo API",
  "slug": "sales-demo-api",
  "api_id": "6b6c9fc301614e607c591e4af785c465",
  "org_id": "580defdbe1d21e0001c67e5c",
  "use_keyless": false,
  "use_oauth2": false,
  "use_openid": false,
  "openid_options": {
    "providers": [],
    "segregate_by_client": false
  },
  "oauth_meta": {
    "allowed_access_types": [],
    "allowed_authorize_types": [],
    "auth_login_redirect": ""
  },
  "auth": {
    "use_param": false,
    "param_name": "",
    "use_cookie": false,
    "cookie_name": "",
    "auth_header_name": "Authorization",
    "use_certificate": false
  },
  "use_basic_auth": false,
  "use_mutual_tls_auth": false,
  "client_certificates": [],
  "upstream_certificates": {},
  "enable_jwt": false,
  "use_standard_auth": true,
  "enable_coprocess_auth": false,
  "jwt_signing_method": "",
  "jwt_source": "",
  "jwt_identity_base_field": "",
  "jwt_client_base_field": "",
  "jwt_policy_field_name": "",
  "notifications": {
    "shared_secret": "",
    "oauth_on_keychange_url": ""
  },
  "enable_signature_checking": false,
  "hmac_allowed_clock_skew": -1,
  "base_identity_provided_by": "",
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
          "extended_paths": {},
          "global_headers": {},
          "global_headers_remove": [],
          "ignore_endpoint_case": false,
          "global_size_limit": 0,
          "override_target": ""
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
        "target_path": "",
        "use_target_list": false,
        "cache_timeout": 60,
        "endpoint_returns_list": false
      },
      "recheck_wait": 0
    }
  },
  "proxy": {
    "preserve_host_header": false,
    "listen_path": "/6b6c9fc301614e607c591e4af785c465/",
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
      "target_path": "",
      "use_target_list": false,
      "cache_timeout": 0,
      "endpoint_returns_list": false
    },
    "transport": {
      "proxy_url": "http(s)://proxy.url:1234",
      "ssl_min_version": int,
      "ssl_ciphers": ["string"],
      "ssl_insecure_skip_verify": bool
    }
  },
  "disable_rate_limit": false,
  "disable_quota": false,
  "custom_middleware": {
    "pre": [],
    "post": [],
    "post_key_auth": [],
    "auth_check": {
      "name": "",
      "path": "",
      "require_session": false
    },
    "response": [],
    "driver": "",
    "id_extractor": {
      "extract_from": "",
      "extract_with": "",
      "extractor_config": {}
    }
  },
  "custom_middleware_bundle": "",
  "cache_options": {
    "cache_timeout": 60,
    "enable_cache": true,
    "cache_all_safe_requests": false,
    "cache_response_codes": [],
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
    "meta": {}
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
    "max_age": 24,
    "options_passthrough": false,
    "debug": false
  },
  "domain": "",
  "do_not_track": false,
  "tags": [],
  "enable_context_vars": false,
  "config_data": {},
  "tag_headers": [],
  "global_rate_limit": {
    "rate": 0,
    "per": 0
  },
  "strip_auth_data": false
}
```
