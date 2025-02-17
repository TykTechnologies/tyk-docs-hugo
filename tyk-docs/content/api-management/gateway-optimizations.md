---
title: "Gateway Optimizations - Caching Responses"
date: 2025-02-10
tags: ["Caching", "Gateway Optimization", "Optimization", "Endpoint Caching", "Configuration"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Caching", "Gateway Optimization", "Optimization", "Endpoint Caching", "Configuration"]
aliases:
  - /basic-config-and-security/reduce-latency
  - /basic-config-and-security/reduce-latency/caching
  - /basic-config-and-security/reduce-latency/caching/advanced-cache
  - /basic-config-and-security/reduce-latency/caching/global-cache
  - /basic-config-and-security/reduce-latency/caching/invalidate-cache
  - /basic-config-and-security/reduce-latency/caching/optimise-cache
  - /basic-config-and-security/reduce-latency/caching/upstream-controlled-cache
  - /product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic
  - /product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas
---

## Overview

The Tyk Gateway can cache responses from your upstream services.

API Clients which make subsequent requests to a cached endpoint will receive the cached response directly from the Gateway, which:
 - reduces load on the upstream service
 - provides a quicker response to the API Client (reduces latency)
 - reduces concurrent load on the API Gateway

Caching is best used on endpoints where responses infrequently change and are computationally expensive for the upstream service to generate.

### Caching with Tyk

Tyk uses Redis to store the cached responses and, as you'd expect from Tyk, there is lots of flexibility in how you configure caching so that you can optimize the performance of your system.

There are two approaches to configure caching for an API deployed with Tyk:

 - [Basic]({{< ref "api-management/gateway-optimizations#basic-caching">}}) or [Safe Request]({{< ref "api-management/gateway-optimizations#global-cache-safe-requests" >}}) caching is applied at the API level for all requests for which it is safe to do so.
 - [Advanced]({{< ref "api-management/gateway-optimizations#endpoint-caching">}}) caching options can be applied at the endpoint level.

Tyk's advanced caching options allow you to selectively cache the responses to all requests, only those from specific paths or only responses with specific status codes returned by the API. You can even cache dynamically based upon instruction from the upstream service received within the response.

Caching is enabled by default at the Gateway level, but no caching will happen until the API Definition is configured to do so.

### Cache Terminology and Features

#### Cache Key
Cache keys are used to differentiate cached responses, such that slight variations in the request can generate different cache keys. This enables you to configure the cache so that different API Clients receive different cached responses when accessing the same API endpoint.

This makes for a very granular cache, which may result in duplication of cached responses. This is preferable to the cache not being granular enough and therefore rendering it unsuitable for use, such that two API Clients receive the same cached response when this is not desired.

The cache key is calculated using many factors:
 - request HTTP method
 - request URL (API path/endpoint)
 - keys and values of any headers specified by `cache_by_headers` property
 - hash of the request body
 - API Id of the requested API
 - value of the authorization header, if present, or if not, the API Client IP address

#### Cache Value
The value stored in the cache is a base64 encoded string of the response body. When a subsequent request matches the cache key (a **cache hit**), Tyk decodes the cache value and  returns this to the API Client that made the request.

#### Indicating a Cached Response
When a request causes a cache hit, the Gateway will add a special header to indicate that the response being received is from a cache:
 - `X-Tyk-Cached-Response` is added to the response header with the value `1`

The API Client can use this to identify cached responses from non-cached responses.

#### Global Cache (Safe Requests)  
We define a <b>safe request</b> as any category of API request that is considered cacheable without causing any undesired side effects or security concerns. These are requests made using the HTTP methods `GET`, `HEAD` or `OPTIONS` that do not modify data and can be safely cached for performance gains (i.e. they should be idempotent and so are good candidates for caching). If these methods are not idempotent for your API, then you should not use safe request caching.

Safe request caching at the API level is enabled by setting the `cache_all_safe_requests` option to `true`, or by checking the equivalent checkbox in the Dashboard UI. This will enable safe request caching on all endpoints for an API.

This mode of operation is referred to as Global Caching because it is applied globally within the scope of a single API. Picking this approach will override any per-endpoint (per-path) caching configuration, so it’s not suitable if granular control is required.

Tyk does support safe request caching at the more granular, per-endpoint level, as described [here]({{< ref "api-management/gateway-optimizations#request-selective-cache-control">}}) - but `cache_all_safe_requests` must be set to `false` in that scenario.

#### Cache Timeout
The cache timeout (Time-To-Live or TTL) value can be configured per API and is the maximum age for which Tyk will consider a cache entry to be valid. You should use this to optimize the tradeoff between reducing calls to your upstream service and potential for changes to the upstream data.

If the timeout has been exceeded when a request is made to a cached API, that request will be passed to the upstream and the response will (if appropriate) be used to refresh the cache.

The timeout is configured in seconds.

#### Cache Response Codes
You can configure Tyk to cache only responses with certain HTTP status codes (e.g. 200 OK), for example to save caching error responses. You can configure multiple status codes that will be cached for an API, but note that this applies only to APIs that return with an HTTP status code in the response.

#### Dynamic Caching
By default Tyk maintains its response cache with a separate entry for each combination of API key (if authorization is enabled), request method and request path. Dynamic caching is a more flexible method of caching API responses based on header or body content rather than just the request method and path. This allows for more granular caching control and maintainance of separate caches for different users or request properties.

#### Upstream Cache Control
Upstream cache control refers to caching API responses based on instructions provided by the upstream service within the response headers. This allows the upstream service to have more control over which responses are cached and for how long.

## Basic Caching

_On this page we describe the use of Tyk's API response cache at the API level (Global); for details on the more advanced Endpoint level cache you should refer to [this]({{< ref "api-management/gateway-optimizations#endpoint-caching">}}) page._

Caching is configured separately for each API according to values you set within the API definition. Subsequently, the caching scope is restricted to an API definition, rather than being applied across the portfolio of APIs deployed in the Gateway.

If you are using the Tyk Dashboard you can set these options from the Dashboard UI, otherwise you will need to edit the raw API definition.

### Configuring Tyk's API-level cache 
Within the API Definition, the cache controls are grouped within the `cache_options` section.

The main configuration options are:
 - `enable_cache`: Set to `true` to enable caching for the API
 - `cache_timeout`: Number of seconds to cache a response for, after which the next new response will be cached
 - `cache_response_codes`: The HTTP status codes a response must have in order to be cached
 - `cache_all_safe_requests`: Set to `true` to apply the caching rules to all requests using `GET`, `HEAD` and `OPTIONS` HTTP methods

For more advanced use of the API-level cache we also have:
 - `cache_by_headers`: used to create multiple cache entries based on the value of a [header value](#selective-caching-by-header-value) of your choice
 - `enable_upstream_cache`: used to allow your [upstream service]({{< ref "api-management/gateway-optimizations#upstream-cache-control-1">}}) to identify the responses to be cached
 - `cache_control_ttl_headers`: used with `enable_upstream_cache`

#### An example of basic caching 
To enable global caching for all safe requests to an API, only storing HTTP 200 responses, with a 10 second time-to-live (TTL), you would set:
```
"cache_options": {
  "enable_cache": true,
  "cache_timeout": 10,
  "cache_all_safe_requests": true,
  "cache_response_codes": [200]
}
```

{{< note success >}}
**Note**  

If you set `cache_all_safe_requests` to true, then the cache will be global and *all* inbound requests made to the API will be evaluated by the caching middleware. This is great for simple APIs, but for most, a finer-grained control is required. This control will over-ride any per-endpoint cache configuration.
{{< /note >}}

#### Selective caching by header value
To create a separate cache entry for each response that has a different value in a specific HTTP header you would configure the `cache_option.cache_by_headers` option with a list of the headers to be cached.

For example, to cache each value in the custom `Unique-User-Id` header of your API response separately you would set:
```
  "cache_options": {
   "cache_by_headers": ["Unique-User-Id"]
}
```

{{< note success >}}
**Note**  

The `cache_by_headers` configuration is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}

### Configuring the Cache via the Dashboard
Follow these simple steps to enable and configure basic API caching via the Dashboard.

**Steps for Configuration:**

1. **Go to the Advanced Options**

    From the API Designer, select the **Advanced Options** tab:

    {{< img src="/img/2.10/advanced_options_designer.png" alt="Advanced options tab location" >}}

2. **Set the Cache Options for the Global Cache**

    {{< img src="/img/2.10/cache_options.png" alt="Cache settings" >}}

    Here you must set:

    1.  **Enable caching** to enable the cache middleware
    2.  **Cache timeout** to set the [TTL]({{< ref "api-management/gateway-optimizations#cache-timeout">}}) (in seconds) for cached requests
    3.  **Cache only these status codes** to set which [response codes]({{< ref "api-management/gateway-optimizations#cache-response-codes">}}) to cache (ensure that you click **ADD** after entering each response code so that it is added to the list)
    4.  **Cache all safe requests** to enable the [global cache]({{< ref "api-management/gateway-optimizations#global-cache-safe-requests">}})

## Endpoint Caching

### Overview

On this page we describe how to configure Tyk's API response cache per endpoint within an API. This gives granular control over which paths are cached and allows you to vary cache configuration across API versions. For details on the API level (Global) cache you should refer to the [global-cache]({{< ref "api-management/gateway-optimizations#basic-caching">}}) configuration page.

When you use the API-level cache, Tyk will maintain a cache entry for each combination of request method, request path (endpoint) and API key (if authentication is enabled) for an API. The Endpoint Caching middleware gives you granular control over which paths are cached and allows you to vary cache configuration across API versions.

For details on the API-level cache you should refer to the [API-level cache]({{< ref "api-management/gateway-optimizations#basic-caching">}}) configuration page.

#### When to use the Endpoint Caching middleware

##### API with multiple endpoints
When your API has more than one endpoint the upstream data could have different degrees of freshness, for example the data returned by one endpoint might refresh only once every five minutes (and so should be suitably cached) whilst another might give real-time data and so should not be cached. The endpoint cache allows you to optimize the caching of each endpoint to meet your requirements.

##### Request based caching
If you have an API that's providing search capability (for example into a catalog of products) and want to optimize the performance for the most frequently requested search terms, you could use the endpoint cache's [request-selective](#request-selective-cache-control) capability to cache only a subset of all requests to an endpoint.

#### How the endpoint cache works
If caching is enabled then, by default, Tyk will create separate cache entries for every endpoint (path) of your API. This may be unnecessary for your particular API, so Tyk provides a facility to cache only specific endpoint(s).

The endpoint-level cache relies upon the API-level cache being enabled but then allows you to enable the middleware for the specific endpoints that you wish to cache. No other endpoint requests will be cached.

For each endpoint in your API with endpoint caching middleware enabled, you can configure which response codes should be cached (for example, you might not want to cache error responses) and also the refresh interval - or timeout - for the cache entries.

{{< note success >}}
**Note** 

It's important to note that the [cache all safe requests]({{< ref "api-management/gateway-optimizations#global-cache-safe-requests">}}) feature of the API-level cache will overrule the per-endpoint configuration so you must ensure that both are not enabled for the same API.
{{< /note >}}

##### Request-selective cache control
For ultimate control over what Tyk caches, you can optionally configure the endpoint cache middleware to look for specific content in the request body. Tyk will then create a separate cache entry for each response where the request matches the specific combination of method, path and body content.

You define a regex pattern and, if Tyk finds a match for this anywhere in the request body, the response will be cached.  

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the Endpoint Caching middleware [here]({{< ref "api-management/gateway-optimizations#using-tyk-oas-api" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the Endpoint Caching middleware [here]({{< ref "api-management/gateway-optimizations#using-classic-api" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Internal Endpoint middleware summary
  - The Endpoint Cache middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Endpoint Cache middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


### Using Tyk OAS API

The [Endpoint Caching]({{< ref "api-management/gateway-optimizations#endpoint-caching" >}}) middleware allows you to perform selective caching for specific endpoints rather than for the entire API, giving you granular control over which paths are cached.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/gateway-optimizations#using-classic-api" >}}) page.

#### Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

**Configuring the endpoint cache is performed in two parts:**

1. **Enable Tyk's caching function**

    The caching function is enabled by adding the `cache` object to the `global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API.

    This object has the following configuration:
    - `enabled`: enable the cache for the API
    - `timeout`: set as the default cache refresh period for any endpoints for which you don't want to configure individual timeouts (in seconds) 

2. **Enable and configure the middleware for the specific endpoint**

    The endpoint caching middleware (`cache`) should then be added to the `operations` section of `x-tyk-api-gateway` for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

    The `cache` object has the following configuration:
    - `enabled`: enable the middleware for the endpoint
    - `timeout`: set to the refresh period for the cache (in seconds)
    - `cacheResponseCodes`: HTTP responses codes to be cached (for example `200`)
    - `cacheByRegex`: Pattern match for [selective caching by body value]({{< ref "api-management/gateway-optimizations#request-selective-cache-control" >}})

    For example:
    ```json {hl_lines=["37-40", "45-51"],linenos=true, linenostart=1}
    {
        "components": {},
        "info": {
            "title": "example-endpoint-cache",
            "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "paths": {
            "/delay/5": {
                "post": {
                    "operationId": "delay/5post",
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
                "name": "example-endpoint-cache",
                "state": {
                    "active": true
                }
            },
            "upstream": {
                "url": "http://httpbin.org/"
            },
            "server": {
                "listenPath": {
                    "value": "/example-endpoint-cache/",
                    "strip": true
                }
            },
            "global": {
                "cache": {
                    "enabled": true,
                    "timeout": 60
                }
            },
            "middleware": {
                "operations": {
                    "delay/5post": {
                        "cache": {
                            "enabled": true,
                            "cacheResponseCodes": [
                                200
                            ],
                            "timeout": 5
                        }
                    }
                }
            }
        }
    }
    ```

    In this example the endpoint cache middleware has been configured to cache `HTTP 200` responses to requests to the `POST /delay/5` endpoint. The cache will refresh after 5 seconds. Note that requests to other endpoints will also be cached, with a default cache timeout of 60 seconds according to the configuration in lines 37-40.

    The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint caching.

#### Configuring the middleware in the API Designer

Adding endpoint caching to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Endpoint Cache middleware**

    Select **ADD MIDDLEWARE** and choose the **Cache** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-cache.png" alt="Adding the Endpoint Cache middleware" >}}

3. **Configure the middleware**

    Set the timeout and HTTP response codes for the endpoint. You can remove a response code from the list by clicking on the `x` next to it.

    {{< img src="/img/dashboard/api-designer/tyk-oas-cache-config.png" alt="Configuring the endpoint cache middleware for a Tyk OAS API" >}}

    {{< note success >}}
**Note**  

Body value match or [request selective]({{< ref "api-management/gateway-optimizations#request-selective-cache-control" >}}) caching is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
    {{< /note >}}

    Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

4. **Save the API**

    Select **SAVE API** to apply the changes to your API.

### Using Classic API

The [Endpoint Caching]({{< ref "api-management/gateway-optimizations#endpoint-caching" >}}) middleware allows you to perform selective caching for specific endpoints rather than for the entire API, giving you granular control over which paths are cached.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "api-management/gateway-optimizations#using-tyk-oas-api" >}}) page.

If using Tyk Operator please refer to section [configuring the middleware in the Tyk Operator](#tyk-operator).

#### Configuring the middleware in the Tyk Classic API Definition

When using the Tyk Classic API Definition, there are two options for endpoint caching - simple and advanced.

The [simple](#simple-endpoint-cache) option works with the API-level cache and allows you to select which endpoints are cached, but relies upon the cache timeout (refresh) configured at the API-level. It will cache all responses received from the endpoint regardless of the HTTP response code for all [safe requests]({{< ref "api-management/gateway-optimizations#global-cache-safe-requests">}}).

The [advanced](#advanced-endpoint-cache) option allows you to cache more selectively, giving control over the HTTP response codes to be cached, a per-endpoint cache timeout and also the possibility of caching responses only to requests containing specific data in the request body.

##### Simple endpoint cache

To enable the simple middleware you must add a new `cache` object to the `extended_paths` section of your API definition. The `cache` object is a list of endpoints for which you wish to cache all safe requests.

In the API-level `cache_options` you must enable caching and configure the timeout whilst ensuring that the option to cache all safe requests is disabled.

The `cache_options` object has the following configuration:
- `enable_cache`: set to `true` to enable caching for this API
- `cache_all_safe_requests`: set to `false` to allow selective caching per-endpoint
- `cache_timeout`: set to the refresh period for the cache (in seconds)

For example:
```json  {linenos=true, linenostart=1}
{
    "cache_options": {
        "enable_cache": true,
        "cache_timeout": 60,
        "cache_all_safe_requests": false
    },

    "extended_paths": {
        "cache": [
            {
                "/widget",
                "/fish"
            }
        ]
    }
}
```

In this example, the endpoint caching middleware has been configured to cache all safe requests to two endpoints (`/widget` and `/fish`) with a cache refresh period of 60 seconds.

##### Advanced endpoint cache {#tyk-classic-advanced-caching}

For ultimate control over what Tyk caches, you should use the advanced configuration options for the per-endpoint cache. You can separately configure, for each HTTP method for an endpoint:
- an individual cache refresh (timeout)
- a list of HTTP response codes that should be cached
- a pattern match to cache only requests containing specific data in the [request body]({{< ref "api-management/gateway-optimizations#request-selective-cache-control" >}})

To enable the advanced middleware you must add a new `advance_cache_config` object to the `extended_paths` section of your API definition.

In the API-level `cache_options` you must enable caching and ensure that the option to cache all safe requests is disabled. The timeout that you set here will be used as a default  for any endpoints for which you don't want to configure individual timeouts.

The `advance_cache_config` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint method
- `timeout`: set to the refresh period for the cache (in seconds)
- `cache_response_codes`: HTTP response codes to be cached (for example `200`)
- `cache_key_regex`: pattern match for selective caching by body value

For example:
```json  {linenos=true, linenostart=1}
{
    "cache_options": {
        "enable_cache": true,
        "cache_timeout": 60,
        "cache_all_safe_requests": false
    },

    "extended_paths": {
        "advance_cache_config": [
            {
                "disabled": false,
                "method": "POST",
                "path": "/widget",
                "cache_key_regex": "",
                "cache_response_codes": [
                    200
                ],
                "timeout": 10
            }, 
            {
                "disabled": false,
                "method": "GET",
                "path": "/fish",
                "cache_key_regex": "^shark$",
                "cache_response_codes": [
                    200, 300
                ],
                "timeout": 0
            } 
        ]
    }
}
```

In this example the endpoint caching middleware has been configured to cache requests to two endpoints (`/widget` and `/fish`) as follows:

| endpoint | HTTP response codes to cache | cache refresh timeout | body value regex |
|----------|------------------------------|-----------------------|------------------|
| `POST /widget` | 200 | 10 seconds | none |
| `GET /fish` | 200, 300 | 60 seconds (taken from `cache_options`) | `shark` |

#### Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the endpoint caching middleware for your Tyk Classic API by following these steps.

##### Simple endpoint cache

To enable and configure the simple endpoint cache, follow these instructions:

1. **Configure the API level caching options**

    From the **Advanced Options** tab configure the cache as follows:
    - **Enable caching** to enable the cache middleware
    - **Cache timeout** to configure the timeout (in seconds) for cached requests
    - **Cache only these status codes** is a list of HTTP status codes that should be cached, remember to click **Add** after entering each code to add it to the list 
    - **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached

    {{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}

2. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to cache responses. Select the **Cache** plugin.

    {{< img src="/img/2.10/cache_plugin.png" alt="Dropdown list showing Cache plugin" >}}

3. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

##### Advanced endpoint cache

To enable and configure the advanced endpoint cache, follow these instructions:

1. **Configure the API level caching options**

    From the **Advanced Options** tab configure the cache as follows:
    - **Enable caching** to enable the cache middleware
    - **Cache timeout** to configure the default timeout (in seconds) for any endpoints for which you don't want to configure individual timeouts
    - **Cache only these status codes** leave this blank
    - **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached

    {{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}

2. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to cache responses. Select the **Advanced Cache** plugin.

    {{< img src="/img/dashboard/endpoint-designer/advanced-cache.png" alt="Selecting the Advanced Cache plugin for a Tyk Classic API" >}}

3. **Configure the Advanced Cache plugin**

    Set the timeout and HTTP response codes for the endpoint. If you don't need to set a specific timeout for an endpoint you can leave this blank and Tyk will use the cache timeout configured at the API level.

    {{< img src="/img/dashboard/endpoint-designer/advanced-cache-config.png" alt="Endpoint cache configuration for Tyk Classic API" >}}

    {{< note success >}}
    **Note**  

    Body value match or [request selective]({{< ref "api-management/gateway-optimizations#request-selective-cache-control" >}}) caching is not currently exposed in the Dashboard UI, so it must be configured through either the raw API editor or the Dashboard API. 
    {{< /note >}}

4. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

#### Configuring the middleware in the Tyk Operator {#tyk-operator}

You can use Tyk Operator to configure the endpoint caching middleware for your Tyk Classic API by following these steps.

##### Simple endpoint cache

Configuring simple endpoint caching in Tyk Operator is similar to the process for a Tyk Classic API Definition. A list of endpoints for which you wish to cache safe requests should be configured within the `cache` list in the `extended_paths` section.

In the API-level `cache_options` object, you must enable caching by setting `enable_cache` to true and configure the cache refresh period by setting a value for the `cache_timeout` in seconds. To allow selective caching per endpoint you should also set `cache_all_safe_requests`to `false`.

```yaml {linenos=true, linenostart=1, hl_lines=["26-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-cache
spec:
  name: httpbin-cache
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-cache
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          cache:
            - /get
            - /anything
  cache_options:
    cache_all_safe_requests: false
#    cache_by_headers: []
    cache_timeout: 10
    cache_response_codes:
      - 400
    enable_cache: true
```

##### Advanced endpoint cache

Advanced caching with Tyk Operator is a similar process to that for configuring the [advanced caching middleware in the Tyk Classic API Definition](#tyk-classic-advanced-caching).

To enable the advanced middleware you must add a new `advance_cache_config` object to the `extended_paths` section of your API definition.

This allows you to configure caching per endpoint. For each endpoint, it is possible to specify the endpoint path, method, list of response codes to cache, cache timeout and a cache key regular expression. The cache key regular expression represents a pattern match to cache only requests containing specific data in the [request body]({{< ref "api-management/gateway-optimizations#request-selective-cache-control" >}})

For example:

```yaml {linenos=true, linenostart=1, hl_lines=["26-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-advance-cache
spec:
  name: httpbin-advance-cache
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-advance-cache
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          advance_cache_config:
          - path: /anything 
            method: GET
            cache_key_regex: ""
            cache_response_codes: [200]
  cache_options:
    cache_timeout: 30
    enable_cache: true
```

In this example the endpoint caching middleware has been configured to cache requests for the `/anything` endpoint as follows:

| endpoint | HTTP response codes to cache | cache refresh timeout | body value regex |
|----------|------------------------------|-----------------------|------------------|
| `GET /anything` | 200 | 30 seconds (taken from `cache_options`) | none |

## Upstream Cache Control

Upstream cache control refers to the caching of API responses based on instructions provided by the upstream service. This allows the upstream service to have control over which responses are cached and for how long and can be used to perform caching of traditionally "non-safe" requests. The upstream service controls the cache using parameters in the response header.

This approach gives the most granular control as it will also only cache responses based on the request method.

For example, if you only want to cache requests made with the `OPTIONS` method, you can configure the upstream cache control accordingly and return cache control headers only in those responses. With this configuration, Tyk will cache only those responses, not those for other methods for the same path.

Upstream cache control is configured on a per-API and per-endpoint basis, giving maximum flexibility. All configuration is performed within the API definition.

### Enabling upstream cache control for an API

To set up upstream cache control, you must configure `cache_options` in the API definition as follows:
 - first enable the Tyk cache (using `enable_cache`)
 - ensure that global/safe request caching is disabled (`cache_all_safe_requests` is set to `false`)
 - set `enable_upstream_cache_control` to `true`
 - add the endpoints to be cached to the list in `extended_paths.cache`

For example, to enable upstream cache control for the `/ip` endpoint (path) of your API you would add the following to the API definition:

```
"cache_options": {
  "enable_cache": true,
  "cache_all_safe_requests": false,
  "enable_upstream_cache_control": true,
  "extended_paths": {
     "cache": [
         "ip"
     ]
  }
}
```

If you are using Tyk Dashboard, you can configure these settings within the Advanced Settings section of the API Designer. You should select **Enable upstream cache control** and deselect **Global cache**, then follow the steps for per-path caching.

### Operating cache control from the upstream server

When upstream cache control is configured, the Gateway will check the response from the upstream server for the header `x-tyk-cache-action-set`:
 - if this is provided in the response header and is set to `1` or `true` then the response will be stored in the cache
 - if the header is empty or absent, Tyk follows its default behavior, which typically involves not caching the request, or caching only valid response codes (`cache_response_codes`)

The upstream server also controls the length of time that Tyk should cache the response (Time-To-Live or TTL).

Tyk looks for the header `x-tyk-cache-action-set-ttl` in the response:
 - if this is found and has a positive integer value, the Gateway will cache the response for that many seconds
 - if the header is not present, Tyk falls back to the value specified in `cache_options.cache_timeout`

By configuring these headers in the responses from your services, you can have precise control over caching behavior.

#### Using a custom TTL header key
If you wish to use a different header value to indicate the TTL you can do so by adding the `cache_control_ttl_header` option to the API definition.

For example, if you configure:
 ```
 "cache_options": {
     "cache_control_ttl_header": "x-expire"
 }
 ```

and also send `x-expire: 30` in the response header, Tyk will cache that specific response for 30 seconds.



## Invalidating the Cache

The cache for an API can be invalidated (or flushed) to force the creation of a new cache entry before the cache’s normal expiry.

This is achieved by calling one of the dedicated cache invalidation API endpoints. There is a cache invalidation endpoint in both the Tyk Dashboard API and Tyk Gateway API; the URLs differ slightly, but they have the same effect.

For Dashboard-managed deployments, it’s recommended to call the Dashboard API version, as this will handle the delivery of the message to all Gateways in the cluster.

Caches are cleared on per-API basis, so the request to the invalidation endpoint must include the ID of the API in the path.

For example, with the Tyk Gateway API:

```
DELETE /tyk/cache/{api-id}
```

and with the Tyk Dashboard API:

```
DELETE /api/cache/{api-id}
```

Note that prior to Tyk version 3.0.9 and 4.0, this was not supported on MDCB Data Plane gateways.

{{< note success >}}
**Note**  

Cache invalidation is performed at the API level, so all cache entries for the API will be flushed.
{{< /note >}}

## Optimizing the Cache Storage

Tyk creates the API cache in Redis, as it gives high performance and low latency. By default, the cache will use the same database that is used to store the API keys, minimizing the deployment footprint.

For [multi-data center]({{< ref "tyk-multi-data-centre/mdcb-components#redis">}}) deployments, the Data Planes have a locally deployed Redis. This enables them to have a localised cache close to the traffic-serving Gateways.

The [cache key]({{< ref "api-management/gateway-optimizations#cache-key">}}) is used as the Redis key, for quick lookups.

For high-traffic systems that make heavy use of caching, it can make sense to use separate Redis databases for cache storage and for API keys, at the expense of increased deployment footprint.

### Configuring a separate cache
To enable a separate cache server, you must deploy additional Redis instance(s) and apply additional configuration within your Tyk Gateway's `tyk.conf` configuration file.

You must
 - set `enable_separate_cache_store` to `true`
 - provide additional Redis connection information in the `cache_storage` section

For example:
```json
{
"enable_separate_cache_store": true,
"cache_storage": {
  "type": "redis",
  "host": "",
  "port": 0,
  "addrs": [
      "localhost:6379"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 3000,
  "optimisation_max_active": 5000,
  "enable_cluster": false
  }
}
```

The configuration of the separate Redis Cache is the same (and uses the same underlying driver) as the regular configuration, so [Redis Cluster]({{< ref "tyk-open-source#configure-redis-cluster" >}}) is fully supported. If you set `enable_cluster` to `false`, you only need to set one entry in `addrs`.

{{< note success >}}
**Note**  

Prior to Tyk Gateway v2.9.3, `hosts` was used instead of `addrs`; since v2.9.3 `hosts` has been deprecated.
{{< /note >}}

