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

By default Tyk maintains a cache entry for each combination of request method, request path (endpoint) and API key (if authentication is enabled) for an API.

You can optionally choose to cache more selectively so that only a subset of endpoints within the API will be cached.

## Configuring the endpoint-level cache 
Within the [API Definition]({{< ref "tyk-gateway-api/api-definition-objects">}}), the per-endpoint cache controls are grouped within the `extended_paths` section.

There are two elements within `extended_paths` that are used to configure this granular cache:
 - `cache`: a list of endpoints (paths) to be cached
 - `advance_cache_config`: an optional array of configuration options, one per endpoint in the `cache` list

### Selectively caching by endpoint
If caching is enabled then, by default, Tyk will create separate cache entries for every endpoint (path) of your API. This may be unnecessary for your particular API, so Tyk provides a facility to cache only specific endpoint(s). Note that you *must* disable global (API-wide) caching for selective caching to work, otherwise all safe requests to the API will be cached.

To configure endpoint-selective caching, you must:
 - ensure that `cache_all_safe_requests` is set to `false`
 - add a list of the endpoint(s) to be cached in the `cache` list within the `extended_paths` section of the API definition
 
For example, if you want to cache only the `/widget`, `/badger` and `/fish` endpoints of your API you would set the following in the API definition:

```
"cache_options": {
  "enable_cache": true,
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
The additional options in the `advance_cache_config` field allow for more advanced and selective configuration of the endpoint-selective cache.

For each endpoint that you provide in the `cache` list within `extended_paths`, you can optionally add one or more entries within `advance_cache_config`.

The fields within `advance_cache_config` provide Tyk with the precise details of how you wish to cache calls to that endpoint (combination of HTTP method and path).

You can configure an individual TTL (timeout) for each cache entry, define a list of HTTP response codes that should be cached and even provide a pattern match to cache only requests containing specific data (this is explained [here](#selective-caching-by-body-value)).

 - `method` - HTTP method to be cached (typically `GET`)
 - `path` - must match an endpoint/path provided in the `cache` list
 - `timeout` - given in seconds (if not provided, the timeout configured in `cache_timeout` will be used)
 - `cache_response_codes` - HTTP responses codes to be cached (for example `200`)
 - `cache_key_regex` - pattern match for selective caching by body value

For example, if you want to cache the `/widget`, `/badger` and `/fish` endpoints of your API with different timeouts (TTL) and for different response codes you would set the following in the API definition:

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
        "cache_key_regex": "my_match_pattern"
      }
    ]
}
```

## Configuring endpoint caching in the Dashboard

In the Tyk Dashboard you can configure caching per endpoint for your APIs by assigning the cache middleware to the desired combinations of endpoint and HTTP method.

**Step 1**: configure the API level caching options from the **Advanced Options** tab in the Endpoint Designer as follows
1. **Enable caching** to enable the cache middleware
2.  **Cache timeout** to configure the timeout (in seconds) for cached requests
3.  **Cache only these status codes** is where you list which HTTP status codes should be cached (remember to click **Add** after entering a code to add it to the list)
4.  **Cache all safe requests** ensure that this is **not** selected

{{< img src="/img/dashboard/endpoint-designer/cache-options.png" alt="Cache Options" >}}


**Step 2**: go into the Endpoint Designer tab and for the path(s) you want to cache, select the Cache plugin from the drop-down list.

{{< img src="/img/2.10/cache_plugin.png" alt="Plugin dropdown list" >}}

{{< note success >}}
**Note**  

The `advance_cache_config` configuration is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}




