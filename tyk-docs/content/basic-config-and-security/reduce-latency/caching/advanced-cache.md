---
title: "Advanced Caching"
date: 2023-06-08
tags: ["Caching", "Dynamic Cache", "Configuration", "Cache", "Endpoint", "Advanced"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 2
---

On this page we describe how to configure Tyk's API response cache per endpoint within an API. For details on the API level (Global) cache you should refer to the [global-cache]({{< ref "/basic-config-and-security/reduce-latency/caching/global-cache">}}) configuration page.

By default Tyk maintains a cache entry for each combination of request method, request path (endpoint) and API key (if authentication is enabled) for an API.

You can optionally choose to cache more selectively so that only a subset of endpoints within the API will be cached.

## Configuring the endpoint-level cache
Within the [API Definition]({{< ref "tyk-gateway-api/api-definition-objects">}}), the per-endpoint cache controls are grouped within the `extended_paths` section.

There are two elements within `extended_paths` that are used to configure this granular cache:
 - `cache`: Used to cache all safe requests to specific endpoints
 - `advance_cache_config`: Used for more granular caching and advanced features

### Caching by endpoint (all safe requests)
If caching is enabled then, by default, Tyk will create separate cache entries for every endpoint (path) of your API. This may be unnecessary for your particular API, so Tyk provides a facility to cache only specific endpoint(s).

To configure endpoint-selective caching, you must:
 - ensure that `enable_cache` is set to `true`
 - ensure that `cache_all_safe_requests` is set to `false`
 - add a list of the endpoint(s) to be cached in the `cache` list within the `extended_paths` section of the API definition

{{< note success >}}
**Note**  

You must disable `cache_all_safe_requests` in the [basic (API-wide) caching configuration]({{< ref "/basic-config-and-security/reduce-latency/caching#global-cache-safe-requests">}}) for per-endpoint caching to work, otherwise requests to <i>all</i> endpoints within the API will be cached.
{{< /note >}}

For example, if you want to cache only the `/widget`, `/badger` and `/fish` endpoints of your API, with a 60 second TTL you would set the following in the API definition:

```
"cache_options": {
  "enable_cache": true,
  "cache_timeout": 60,
  "cache_all_safe_requests": false,
  "extended_paths": {
     "cache": [
        "widget",
        "badger",
        "fish"
     ]
   }
}
```

### Advanced caching by endpoint
For ultimate control over what Tyk caches, you should use the advanced configuration options for the per-endpoint cache. You can separately configure, for each HTTP method for an endpoint:
 - an individual TTL (timeout) define
  - a list of HTTP response codes that should be cached
  -  a pattern match to cache only requests containing specific data (this is explained [here](#selective-caching-by-body-value))

To use this most granular functionality of Tyk's cache, you must not enable safe request caching at either the API-level (`cache_all_safe_requests`) or endpoint-level (`cache[]`).

The fields within `advance_cache_config` provide Tyk with the precise details of how you wish to cache calls to that endpoint (combination of HTTP method and path).
 - `method` - HTTP method to be cached (typically `GET`)
 - `path`: Must match an endpoint/path provided in the `cache` list.
 - `timeout`: Given in seconds (if not provided, the timeout configured in `cache_timeout` will be used)
 - `cache_response_codes`: HTTP responses codes to be cached (for example `200`)
 - `cache_key_regex`: Pattern match for selective caching by body value

For example, if you want to cache the `/widget`, `/badger` and `/fish` endpoints of your API with different timeouts (TTL) and for different response codes you might set the following in the API definition:

```
"cache_options": {
  "enable_cache": true,
  "cache_all_safe_requests": false,
     "advance_cache_config": {
      {
        "method":"GET"
        "path":"widget"
        "timeout":30
        "cache_response_codes": [200]
      }
      {
        "method":"GET"
        "path":"badger"
        "timeout":20
        "cache_response_codes": [200, 201]
      }
      {
        "method":"GET"
        "path":"fish"
        "timeout":60
        "cache_response_codes": [200]
      }
    }
   }
}
```

#### Selective caching by body value
You can configure Tyk's cache to create a separate cache entry for each response where the request matches a specific combination of method, path and body content.

Body value caching is configured within the `extended_paths.advance_cache_config` section in your API definition.

The string you provide in `cache_key_regex` will be compared with the request body and, if there's a match anywhere in the body, the response will be cached.

For example, to create a cache entry for each response to a `POST` request to your API's `addBooks` endpoint that contains the string `my_match_pattern` in the body of the request, you would set:
```
"cache_options": {
  "extended_paths": {
    "advance_cache_config": [
      {
        "method":"POST",
        "path":"addBooks",
        "cache_key_regex": "my_match_pattern",
        "timeout": 60
      }
    ]
}
```

## Configuring endpoint caching in the Dashboard

### Caching all safe requests by endpoint in the Dashboard
In the Tyk Dashboard you can configure caching per endpoint for your APIs by assigning the cache middleware to the desired combinations of endpoint and HTTP method.

**Step 1**: configure the API level caching options from the **Advanced Options** tab in the Endpoint Designer
  1. **Enable caching** to enable the cache middleware
  2. **Cache timeout** to configure the timeout (in seconds) for cached requests
 **Cache only these status codes** is where you list which HTTP status codes should be cached. Remember to click **Add** after entering a code to add it to the list.
  4. **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached.

{{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}

**Step 2**: go into the Endpoint Designer tab and for the path(s) you want to cache, select the Cache plugin from the drop-down list.

{{< img src="/img/2.10/cache_plugin.png" alt="Dropdown list showing Cache plugin" >}}

### Advanced caching by endpoint in the Dashboard
Similarly, you can configure caching per endpoint for your APIs by assigning the advanced_cache middleware to the desired combinations of endpoint and HTTP method.

**Step 1**: configure the API level caching options from the **Advanced Options** tab in the Endpoint Designer as follows
  1. **Enable caching** to enable the cache middleware
  2. **Cache timeout** to configure the default timeout (in seconds) for any endpoints for which you don't want to configure individual timeouts
  3. **Cache only these status codes** leave this blank
  4. **Cache all safe requests** ensure that this is **not** selected, otherwise the responses from all endpoints for the API will be cached.

**Step 2**: go into the Endpoint Designer tab and for the path(s) you want to cache, select the Advanced Cache plugin from the drop-down list.

**Step 3**: Configure the Advanced Cache (timeout and HTTP response codes) for each combination of path and method as required. If you don't need to set a specific timeout for an endpoint you can leave this blank and Tyk will use the cache timeout configured previously.

{{< img src="/img/dashboard/endpoint-designer/advanced-cache-config.png" alt="Endpoint cache configuration" >}}

{{< note success >}}
**Note**  

Body value match caching is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}




