---
title: "Advanced Caching"
date: 2023-06-08
tags: ["Caching", "Dynamic Cache", "Configuration", "Cache", "Endpoint", "Advanced"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 2
draft: true
---

By default Tyk maintains a cache entry for each combination of request method, request path (endpoint) and API key (if authentication is enabled) for an API.

You can optionally choose to cache more selectively so that only a subset of endpoints within the API will be cached. Alternatively you can cache more granularly so that a separate entry will be created for each response matching different parameters, for example specific header or body content values.

### Selective caching by header value
To create a separate cache entry for each response that has a different value in a specific HTTP header you must set the `cache_option.cache_by_headers` option.

For example, to cache each value in the `Unique-User-Id` header of your API response separately you would set:
```
  "cache_options": {
   "cache_by_headers": ["Unique-User-Id"]
}
```

{{< note success >}}
**Note**  

The `cache_by_headers` configuration is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}

### Selective caching by body value
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
}
```

{{< note success >}}
**Note**  

The `advance_cache_config` configuration is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}

### Selective caching by endpoint
By default, if caching is enabled, Tyk will create a separate cache entry for responses returned from every endpoint (path) of your API. This may be unnecessary for your particular API, so Tyk provides a facility to cache only specific endpoint(s). Note that you must disable global (API-wide) caching for selective caching to work, otherwise all safe requests to the API will be cached.

To configure endpoint selective (or per-path) caching, you must:
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
```

### Configuring endpoint caching in the Dashboard

In the Tyk Dashboard you can configure caching per endpoint for your APIs by assigning the cache middleware to the desired combinations of endpoint and HTTP method.

**Step 1**: configure the API level caching options as follows
1.  **Caching middleware**: select this to enable the cache middleware
2.  **Cache timeout**: configure the timeout (in seconds) for cached requests
3.  **Cache only these status codes**: decide which HTTP status codes should be cached (remember to click **Add** after entering a code to add it to the list)
4.  **Cache all safe requests**: ensure that this is not selected

<<<<<<<<< IMAGE >>>>>>>>>

**Step 2**: go into the Endpoint Designer tab and for the path(s) you want to cache, select the Cache plugin from the drop-down list.

{{< img src="/img/2.10/cache_plugin.png" alt="Plugin dropdown list" >}}


