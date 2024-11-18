---
title: Using the Endpoint Caching middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Endpoint Caching middleware with Tyk Classic APIs"
tags: ["Caching", "Cache", "Endpoint Cache", "selective caching", "middleware", "per-endpoint", "Tyk Classic"]
---

The [Endpoint Caching]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache" >}}) middleware allows you to perform selective caching for specific endpoints rather than for the entire API, giving you granular control over which paths are cached.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas" >}}) page.

If using Tyk Operator please refer to section [configuring the middleware in the Tyk Operator](#tyk-operator).

## Configuring the middleware in the Tyk Classic API Definition

When using the Tyk Classic API Definition, there are two options for endpoint caching - simple and advanced.

The [simple](#simple-endpoint-cache) option works with the API-level cache and allows you to select which endpoints are cached, but relies upon the cache timeout (refresh) configured at the API-level. It will cache all responses received from the endpoint regardless of the HTTP response code for all [safe requests]({{< ref "basic-config-and-security/reduce-latency/caching#global-cache-safe-requests">}}).

The [advanced](#advanced-endpoint-cache) option allows you to cache more selectively, giving control over the HTTP response codes to be cached, a per-endpoint cache timeout and also the possibility of caching responses only to requests containing specific data in the request body.

#### Simple endpoint cache

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

#### Advanced endpoint cache {#tyk-classic-advanced-caching}

For ultimate control over what Tyk caches, you should use the advanced configuration options for the per-endpoint cache. You can separately configure, for each HTTP method for an endpoint:
- an individual cache refresh (timeout)
- a list of HTTP response codes that should be cached
- a pattern match to cache only requests containing specific data in the [request body]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#request-selective-cache-control" >}})

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

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the endpoint caching middleware for your Tyk Classic API by following these steps.

### Simple endpoint cache

To enable and configure the simple endpoint cache, follow these instructions:

##### Step 1: Configure the API level caching options

From the **Advanced Options** tab configure the cache as follows:
- **Enable caching** to enable the cache middleware
- **Cache timeout** to configure the timeout (in seconds) for cached requests
- **Cache only these status codes** is a list of HTTP status codes that should be cached, remember to click **Add** after entering each code to add it to the list 
- **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached

{{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}

##### Step 2: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to cache responses. Select the **Cache** plugin.

{{< img src="/img/2.10/cache_plugin.png" alt="Dropdown list showing Cache plugin" >}}

##### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

### Advanced endpoint cache

To enable and configure the advanced endpoint cache, follow these instructions:

##### Step 1: Configure the API level caching options

From the **Advanced Options** tab configure the cache as follows:
- **Enable caching** to enable the cache middleware
- **Cache timeout** to configure the default timeout (in seconds) for any endpoints for which you don't want to configure individual timeouts
- **Cache only these status codes** leave this blank
- **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached

{{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}

##### Step 2: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to cache responses. Select the **Advanced Cache** plugin.

{{< img src="/img/dashboard/endpoint-designer/advanced-cache.png" alt="Selecting the Advanced Cache plugin for a Tyk Classic API" >}}

##### Step 3: Configure the Advanced Cache plugin

Set the timeout and HTTP response codes for the endpoint. If you don't need to set a specific timeout for an endpoint you can leave this blank and Tyk will use the cache timeout configured at the API level.

{{< img src="/img/dashboard/endpoint-designer/advanced-cache-config.png" alt="Endpoint cache configuration for Tyk Classic API" >}}

{{< note success >}}
**Note**  

Body value match or [request selective]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#request-selective-cache-control" >}}) caching is not currently exposed in the Dashboard UI, so it must be configured through either the raw API editor or the Dashboard API. 
{{< /note >}}

##### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in the Tyk Operator {#tyk-operator}

You can use Tyk Operator to configure the endpoint caching middleware for your Tyk Classic API by following these steps.

### Simple endpoint cache

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

### Advanced endpoint cache

Advanced caching with Tyk Operator is a similar process to that for configuring the [advanced caching middleware in the Tyk Classic API Definition](#tyk-classic-advanced-caching).

To enable the advanced middleware you must add a new `advance_cache_config` object to the `extended_paths` section of your API definition.

This allows you to configure caching per endpoint. For each endpoint, it is possible to specify the endpoint path, method, list of response codes to cache, cache timeout and a cache key regular expression. The cache key regular expression represents a pattern match to cache only requests containing specific data in the [request body]({{< ref " basic-config-and-security/reduce-latency/caching/advanced-cache#request-selective-cache-control" >}})

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
