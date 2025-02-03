---
title: "Tyk Classic API Definition"
date: 2025-01-10
tags: ["Gateway", "Configuration", "Tyk Classic", "Tyk Classic API Definition", "Tyk Classic API Definition Object",]
description: "How to configure Tyk Classic API Definition"
keywords: ["Gateway", "Configuration", "Tyk Classic", "Tyk Classic API Definition", "Tyk Classic API Definition Object",]
aliases:
  - /tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting
  - /tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting
  - /tyk-apis/tyk-gateway-api/api-definition-objects/authentication
  - /tyk-apis/tyk-gateway-api/api-definition-objects/cors
  - /tyk-rest-api/api-definition-objects/custom-analytics
  - /tyk-apis/tyk-gateway-api/api-definition-objects/custom-analytics
  - /tyk-apis/tyk-gateway-api/api-definition-objects/events
  - /tyk-apis/tyk-gateway-api/api-definition-objects/graphql
  - /tyk-apis/tyk-gateway-api/api-definition-objects/jwt
  - /tyk-apis/tyk-gateway-api/api-definition-objects/other-root-objects
  - /tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings
  - /tyk-apis/tyk-gateway-api/api-definition-objects/rate-limits
  - /tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests
  - /tyk-gateway-api/api-definition-objects
  - /tyk-dashboard-v1-0/api-management
  - /tyk-rest-api/api-management
  - /tyk-rest-api/api-definition-object-details
  - /tyk-rest-api/api-definition-objects
  - /tyk-apis/tyk-gateway-api/api-definition-objects
---

## Introduction Tyk Classic API

Tyk stores API configurations as JSON objects called API Definitions. If you are using *Tyk Dashboard* to manage Tyk, then these are stored in either Postgres or MongoDB, as specified in the [database settings]({{< ref "tyk-self-managed#database-management" >}}). On the other hand, if you are using *Tyk OSS*, these configurations are stored as files in the `/apps` directory of the Gateway which is located at the default path `/opt/tyk-gateway`.

An API Definition has many settings and middlewares that influence the way incoming requests are processed.

Below, you will find an example of a Tyk Classic API Definition.

```yaml
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

## Authentication Type Flags

{{< include "api-def-authentication" >}}

## CORS

It is possible to enable CORS for certain APIs so users can make browser-based requests. The `CORS` section is added to an API definition as listed in the examples below for Tyk Gateway and Tyk Operator.

---

### Examples

{{< tabs_start >}}
{{< tab_start "Gateway API Definition" >}}
```json
"CORS": {
  "enable": true,
  "allowed_origins": [
    "http://foo.com"
  ],
  "allowed_methods": [],
  "allowed_headers": [],
  "exposed_headers": [],
  "allow_credentials": false,
  "max_age": 24,
  "options_passthrough": false,
  "debug": false
}
```
{{< tab_end >}}
{{< tab_start "Tyk Operator API Definition" >}}
```yaml {linenos=true, linenostart=1, hl_lines=["14-24"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-cors-sample
spec:
  name: httpbin-cors-sample
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /cors
    strip_listen_path: true
  CORS:
    enable: true
    allowed_origins:
      - "http://foo.com"
    allowed_methods: null
    allowed_headers: null
    exposed_headers: null
    allow_credentials: false
    max_age: 24
    options_passthrough: false
    debug: false
```
{{< tab_end >}}
{{< tabs_end >}}

---

### Configuration

The CORS middleware has the following options:

* `CORS.allowed_origins`: A list of origin domains to allow access from. Wildcards are also supported, e.g. `http://*.foo.com`

* `CORS.allowed_methods`: A list of methods to allow access via.

* `CORS.allowed_headers`: Headers that are allowed within a request.

* `CORS.exposed_headers`: Headers that are exposed back in the response.

* `CORS.allow_credentials`: Whether credentials (cookies) should be allowed.

* `CORS.max_age`: Maximum age of credentials.

* `CORS.options_passthrough`: allow CORS OPTIONS preflight request to be proxied directly to upstream, without authentication and rest of checks. This means that pre-flight requests generated by web-clients such as SwaggerUI or 
the Tyk Portal documentation system will be able to test the API using trial keys. If your service handles CORS natively, then enable this option.

* `debug`: If set to `true`, this option produces log files for the CORS middleware.

### Fallback values

Always keep in mind that empty arrays will fallback to some sensible defaults. If you want to avoid this, you will have to provide explicit values.
 * Fallback values for `CORS.allowed_origins`: `["*"]`
 * Fallback values for `CORS.allowed_methods`: `["GET", "POST", "HEAD"]`
 * Fallback values for `CORS.allowed_headers`: `["Origin", "Accept", "Content-Type", "X-Requested-With"]`

## Custom Analytics Tags using HTTP Headers

`tag_headers` is a string array of HTTP headers that can be extracted and transformed into [analytic tags]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}})(statistics aggregated by tag, per hour).

For example if you include `X-test-header` header in the `tag_headers` array, then, for each incoming request Tyk will add a `x-test-header-<header_value>` tag to the list of tags in the request analytic record.

If you are using Tyk Operator please refer to [how to setup tag headers with Tyk Operator](#tyk-operator).

### When is it useful?

Example use cases are:

- You need to record additional information from the request into the analytics. When enabling [detailed logging]({{<ref "tyk-oss-gateway/configuration#analytics_configenable_detailed_recording">}}), Tyk Gateway records the full request and response objects which consumes a lot of space. Using this config will save you this space and only record this header.

- You wish to track a group of API requests. For example:

  - Show me all API requests where `tenant-id=123`
  - Show me all API requests where `user-group=abc`

### Tags and aggregated analytics

Tyk Gateway, by default, creates aggregations points for all the tags it records. Since we are making the header name that is recorded part of the tag value, Tyk, will also add an aggregation point for that tag value in the aggregated analytics, i.e. `x-test-header-<header_value>`.

#### How to avoid the creation of aggregation analytics?

If you don't want or need aggregated analytics for the headers you record with `tag_headers`, it is possible to set Tyk to ignore them, by creating a list of tags to ignore.
This is done while writing the recorded *aggregated analytics* to the data stores. Configure a list of tags that are ignored when writing *aggregated analytics* to MongoDB. This can be configured for Tyk Pump and MDCB.

##### Ignore list in Tyk pump
In Tyk Pump config field (`tyk_sink.conf` or whatever name you chose to use), add the tags you want to ignore, or their prefixes to the `ignore_tag_prefix_list` field, (root level).

##### Ignore list in Tyk MDCB
In MDCB deployment, if you use the MDCB component to write the *aggregated analytics* to the data stores, you need to define the ignore list of headers or their prefixes, in MDCB config field (`tyk_sink.conf` or whatever name you chose to use), under `ignore_tag_prefix_list` field, (root level).

Note: the field above is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated.

{{< warning success >}}
**Warning**

If you add to the tags list headers that are **unique** per request, like timestamp or [X-Request-Id]({{<ref "context-variables#available-context-variables" >}}), then Tyk Gateway will essentially create an aggregation point _per request_ and the number of these tags in an hour will be equal to the number of requests.
<br/>
Since there's no real value in aggregating something that has a total of 1 and also the hourly aggregation documents can grow very quickly, we recommend to always add the header name to the ignore list as follows:

    "ignore_tag_prefix_list": [ "x-request-id" ]

{{< /warning >}}

### How to set up and test tag headers in the dashboard?

1. Open: In the Dashboard, with an API configured, open your API and click on "Advanced Options".
2. Set up: Navigate down to the Tag Headers section and add `X-Team-Name` to the list.

{{< img src="/img/custom-analytics-tags/tag-headers.png" alt="Tag Headers" >}}

3. Test: Using your preferred HTTP client, make a request that includes the `X-Team-Name` header. For example, with curl run the following:

```bash
curl http://tyk-gateway.localhost:8080/basic-open-api/get -H "X-Team-Name: devops-us-1" -vv
```

4. Check: Navigate back to the Dashboard and select the "Log Browser" option to view the logged requests. Open the request record and in the "Gateway Metadata" section (on the right), you can find the "Tags" attached to our request. There you should see the header and value you sent in the request. You should also see that Tyk Gateway recorded it as a `tag`.

{{< img src="/img/custom-analytics-tags/log-browser.png" alt="Log Browser" >}}

#### We can now have Tyk track API requests which contain our business logic!!!


### How to setup tag headers with Tyk Operator {#tyk-operator}

To setup tag headers with Tyk Operator add the list of headers to tag to the `tag_headers` object within the `spec` field of the API definition resource. An example is given below:

```yaml {linenos=true, linenostart=1, hl_lines=["10-12"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-tag-headers
spec:
  name: httpbin-tag-headers
  use_keyless: true
  protocol: http
  active: true
  tag_headers:
  - Host
  - User-Agent
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-tag-headers
    strip_listen_path: true
```

In this example we can see that the `Host` and `User-Agent` headers exist within the `tag_headers` array. For each incoming request Tyk will add a `host-<header_value>` and `user-agent-<header_value>` tags to the list of tags in the request analytic record.

## Events

{{< include "api-def-events" >}}

## API Definition GraphQL

{{< include "api-def-graphql" >}}

## JSON Web Tokens (JWT)


* `enable_jwt`: Set JWT as the access method for this API.

* `jwt_signing_method`: Either HMAC or RSA - HMAC requires a shared secret while RSA requires a public key to use to verify against. Please see the section on JSON web tokens for more details on how to generate these.

* `jwt_source`: Must either be a base64 encoded valid RSA/HMAC key or a url to a resource serving JWK, this key will then be used to validate inbound JWT and throttle them according to the centralised JWT options and fields set in the configuration. See [Dynamic public key rotation using public JWKs URL]({{< ref "/api-management/client-authentication#use-json-web-tokens-jwt" >}}) for more details on JWKs.

* `jwt_identity_base_field`: Identifies the user or identity to be used in the Claims of the JWT. This will fallback to `sub` if not found. This field forms the basis of a new "virtual" token that gets used after validation. It means policy attributes are carried forward through Tyk for attribution purposes.
    
Centralised JWTs add a `TykJWTSessionID` to the session metadata on create to enable upstream hosts to work with the internalised token should things need changing.

* `jwt_policy_field_name`: The policy ID to apply to the virtual token generated for a JWT.

### Clock Skew

Due to the nature of distrusted systems it is expected that despite best efforts you can end up in a situation with clock skew between the issuing party (An OpenID/OAuth provider) and the validating party (Tyk).  

This means that in certain circumstances Tyk would reject requests to an API endpoint secured with JWT with the "Token is not valid yet" error . This occurs due to the clock on the Tyk server being behind the clock on the Identity Provider server even with all servers ntp sync'd from the same ntp server.

You can disable the validation check on 3 claims `IssueAt`, `ExpireAt` and `NotBefore` by adding the following boolean fields to your API definition:

```{.copyWrapper}
  "enable_jwt": true,
  "jwt_disable_issued_at_validation": true,
  "jwt_disable_expires_at_validation": true,
  "jwt_disable_not_before_validation": true
```

See [JSON Web Tokens](/api-management/client-authentication#use-json-web-tokens-jwt) for more details.

## Other Root Objects

{{< include "api-def-common" >}}

## Proxy Transport Settings

The `proxy` section outlines the API proxying functionality. You can define where Tyk should listen, and where Tyk should proxy traffic to.

### `proxy.preserve_host_header` 
Set to `true` to preserve the host header. If `proxy.preserve_host_header` is set to `true` in an API definition then the host header in the outbound request is retained to be the inbound hostname of the proxy.

### `proxy.listen_path`
The path to listen on, e.g. `/api` or `/`. Any requests coming into the host, on the port that Tyk is configured to run on, that go to this path will have the rules defined in the API Definition applied. Versioning assumes that different versions of an API will live on the same URL structure. If you are using URL-based versioning (e.g. `/v1/function`, `/v2/function/`) then it is recommended to set up a separate non-versioned definition for each version as they are essentially separate APIs.
    
Proxied requests are literal, no re-writing takes place, for example, if a request is sent to the listen path of: `/listen-path/widgets/new` and the URL to proxy to is `http://your.api.com/api/` then the *actual* request that will land at your service will be: `http://your.api.com/api/listen-path/widgets/new`.
    
This behavior can be circumvented so that the `listen_path` is stripped from the outgoing request. See the section on `strip_listen_path` below.

### `proxy.target_url`
This defines the target URL that the request should be proxied to if it passes all checks in Tyk.

### `proxy.strip_listen_path`
By setting this to `true`, Tyk will attempt to replace the `listen-path` in the outgoing request with an empty string. This means that in the above scenario where `/listen-path/widgets/new` and the URL to proxy to is `http://your.api.com/api/` becomes `http://your.api.com/api/listen-path/widgets/new`, actually changes the outgoing request to be: `http://your.api.com/api/widgets/new`.

###  `proxy.enable_load_balancing`
Set this value to `true` to have a Tyk node distribute traffic across a list of servers. **Required: ** You must fill in the `target_list` section.

### `proxy.target_list`
A list of upstream targets (can be one or many hosts).

### `proxy.check_host_against_uptime_tests`
If uptime tests are enabled, Tyk will check the hostname of the outbound request against the downtime list generated by the host checker. If the host is found, then it is skipped.

### `proxy.service_discovery`
The service discovery section tells Tyk where to find information about the host to proxy to. In a clustered environment this is useful if servers are coming online and offline dynamically with new IP addresses. The service discovery module can pull out the required host data from any service discovery tool that exposes a RESTful endpoint that outputs a JSON object.

```json
{
  "enable_load_balancing": true,
  "service_discovery": {
    "use_discovery_service": true,
    "query_endpoint": "http://127.0.0.1:4001/v2/keys/services/multiobj",
    "use_nested_query": true,
    "parent_data_path": "node.value",
    "data_path": "array.hostname",
    "port_data_path": "array.port",
    "use_target_list": true,
    "cache_timeout": 10
  },
}
```
        

### `proxy.service_discovery.use_discovery_service`
Set this to `true` to enable the discovery module.

### `proxy.service_discovery.query_endpoint`
The endpoint to call.

### `proxy.service_discovery.data_path`
The namespace of the data path. For example, if your service responds with:

```json
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "http://httpbin.org:6000",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```

Then your name space would be `node.value`.

### `proxy.service_discovery.use_nested_query`
Sometimes the data you are retrieving is nested in another JSON object. For example, this is how Etcd responds with a JSON object as a value key:

```json
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "{\"hostname\": \"http://httpbin.org\", \"port\": \"80\"}",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```


In this case, the data actually lives within this string-encoded JSON object. So in this case, you set the `use_nested_query` to `true`, and use a combination of the `data_path` and `parent_data_path` (below)

### `proxy.service_discovery.parent_data_path`
This is the namespace of where to find the nested value In the above example, it would be `node.value`.
    
You would then change the `data_path` setting to be `hostname`.
    
Tyk will decode the JSON string and then apply the `data_path` namespace to that object in order to find the value.

### `proxy.service_discovery.port_data_path`
In the above nested example, we can see that there is a separate PORT value for the service in the nested JSON. In this case you can set the `port_data_path` value and Tyk will treat `data_path` as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier such as `/widgets/`).
    
In the above example, the `port_data_path` would be `port`.

### `proxy.service_discovery.target_path`
The target path to append to the host:port combination provided by the service discovery engine.

### `proxy.service_discovery.use_target_list`
If you are using load_balancing, set this value to `true` and Tyk will treat the data path as a list and inject it into the target list of your API definition.

### `proxy.service_discovery.cache_timeout`
Tyk caches target data from a discovery service. In order to make this dynamic you can set a cache value when the data expires and new data is loaded.

### `proxy.disable_strip_slash`
This boolean option allows you to add a way to disable the stripping of the slash suffix from a URL.

### Internal proxy setup

The transport section allows you to specify a custom proxy and set the minimum TLS versions and any SSL ciphers.

This is an example of `proxy.transport` definition followed by explanations for every field.
```json
{
  "transport": {
    "proxy_url": "http(s)://proxy.url:1234",
    "ssl_min_version": 771,
    "ssl_ciphers": [
      "TLS_RSA_WITH_AES_128_GCM_SHA256", 
      "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
    ],
    "ssl_insecure_skip_verify": true,
    "ssl_force_common_name_check": false
  }
}
```
#### `proxy.transport.proxy_url`
Use this setting to specify your custom forward proxy and port.

#### `proxy.transport.ssl_min_version`
Use this setting to specify your minimum TLS version:

&nbsp;&nbsp;You need to use the following values for this setting:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

#### `proxy.transport.ssl_ciphers`
You can add `ssl_ciphers` which takes an array of strings as its value. Each string must be one of the allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants

#### `proxy.transport.ssl_insecure_skip_verify`
Boolean flag to control at the API definition whether it is possible to use self-signed certs for some APIs, and actual certs for others. This also works for `TykMakeHttpRequest` & `TykMakeBatchRequest` in virtual endpoints.

#### `proxy.transport.ssl_force_common_name_check`
Use this setting to force the validation of a hostname against the certificate Common Name.

## API Level Rate Limits

* `global_rate_limit`: This specifies a global API rate limit in the following format: `{"rate": 10, "per": 1}`, similar to policies or keys.


The API rate limit is an aggregate value across all users, which works in parallel with user rate limits, but has higher priority.

* `disable_rate_limit`: Is set to `true`, rate limits are disabled for the specified API.

See [Rate Limiting]({{< ref "api-management/rate-limit#rate-limiting-layers" >}}) for more details including setting via the Dashboard.

## Uptime Tests

{{< include "api-def-uptime" >}}

## IP Allowlist (Middleware)

* `enable_ip_whitelisting`: Enables IPs {{<fn>}}allowlist{{</fn>}}. When set to `true`, only requests coming from the explicit list of IP addresses defined in (`allowed_ips`) are allowed through.

* `allowed_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are allowed access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```json
{
...
"enable_ip_whitelisting": true,
"allowed_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
}
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

### Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [configure an IP allow list]({{< ref "/api-management/automations/operator#ip-allowlist" >}}) with Tyk Operator.

## IP Blocklist (Middleware)

* `enable_ip_blacklisting`: Enables IPs {{<fn>}}blocklist{{</fn>}}. If set to `true`, requests coming from the explicit list of IP addresses (`blacklisted_ips`) are not allowed through.

* `blacklisted_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```{.json}
...
"enable_ip_blacklisting": true,
"blacklisted_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

<p style="display: none;">{{<fn blocklist>}}{{</fn>}}</p>

### Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [configure an IP block list]({{< ref "/api-management/automations/operator#ip-blocklist" >}}) with Tyk Operator.
