---
title: "Basic Caching"
date: 2023-06-08
tags: ["Caching", "Configure Cache", "Configuration", "Cache"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 1
---

_On this page we describe the use of Tyk's API response cache at the API level (Global); for details on the more advanced Endpoint level cache you should refer to [this]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache">}}) page._

Caching is configured separately for each API according to values you set within the API definition.

If you are using the Tyk Dashboard you can set these options from the Dashboard UI, otherwise you will need to edit the raw API definition.

## Configuring Tyk's API-level cache 
Within the API Definition, the cache controls are grouped within the `cache_options` section.

The main configuration options are:
 - `enable_cache`: Set to `true` to enable caching for the API
 - `cache_timeout`: Number of seconds to cache a response for, after which the next new response will be cached
 - `cache_response_codes`: The HTTP status codes a response must have in order to be cached
 - `cache_all_safe_requests`: Set to `true` to apply the caching rules to all requests using `GET`, `HEAD` and `OPTIONS` HTTP methods

For more advanced use of the API-level cache we also have:
 - `cache_by_headers`: used to create multiple cache entries based on the value of a [header value](#selective-caching-by-header-value) of your choice
 - `enable_upstream_cache`: used to allow your [upstream service]({{< ref "basic-config-and-security/reduce-latency/caching/upstream-controlled-cache">}}) to identify the responses to be cached
 - `cache_control_ttl_headers`: used with `enable_upstream_cache`

### An example of basic caching 
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

### Selective caching by header value
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

## Configuring the Cache via the Dashboard
Follow these simple steps to enable and configure basic API caching via the Dashboard.

#### Step 1: Go to the Advanced Options
From the API Designer, select the **Advanced Options** tab:

{{< img src="/img/2.10/advanced_options_designer.png" alt="Advanced options tab location" >}}

#### Step 2: Set the Cache Options for the Global Cache
{{< img src="/img/2.10/cache_options.png" alt="Cache settings" >}}

Here you must set:

1.  **Enable caching** to enable the cache middleware
2.  **Cache timeout** to set the [TTL]({{< ref "basic-config-and-security/reduce-latency/caching#cache-timeout">}}) (in seconds) for cached requests
3.  **Cache only these status codes** to set which [response codes]({{< ref "basic-config-and-security/reduce-latency/caching#cache-response-codes">}}) to cache (ensure that you click **ADD** after entering each response code so that it is added to the list)
4.  **Cache all safe requests** to enable the [global cache]({{< ref "basic-config-and-security/reduce-latency/caching#global-cache-safe-requests">}})
