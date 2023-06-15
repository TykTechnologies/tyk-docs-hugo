---
title: "Basic (Global) Caching"
date: 2023-06-08
tags: ["Caching", "Configure Cache", "Configuration", "Cache"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 1
draft: true
---

Caching is configured separately for each API according to values you set within the API definition.

If you are using the Tyk Dashboard you can set these options from the Dashboard UI, otherwise you will need to edit the raw API definition.

## Configuring the API-level (global) cache 
Within the API Definition, the cache controls are grouped within the `cache_options` section.

The main settings are:
 - `enable_cache`: Set to `true` to enable caching for the API
 - `cache_timeout`: Number of seconds to cache a response for, after which a new response will be cached
 - `cache_response_codes`: The HTTP status codes a response must have in order to be cached
 - `cache_all_safe_requests`: Set to `true` to apply the caching rules to all requests using GET, HEAD and OPTIONS HTTP methods and overrides any per-endpoint configuration for this API
 
For example, to enable the global cache only for HTTP 200 responses you would set:
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

If you set `cache_all_safe_requests` to true, then the cache will be global and *all* inbound requests will be evaluated by the caching middleware. This is great for simple APIs, but for most a finer-grained control is required.
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
2.  **Cache timeout** to set the [TTL]({{< ref "caching#cache-timeout">}}) (in seconds) for cached requests
3.  **Cache only these status codes** to set which [response codes]({{< ref "caching#cache-response-codes">}}) to cache (remember to click **Add** after entering a response code)
4.  **Cache all safe requests** to enable the [global cache]({{< ref "caching#global-cache-safe-requests">}})

