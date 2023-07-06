---
title: "Upstream Cache Control"
date: 2023-06-08
tags: ["Caching", "Configuring Cache", "Configuration", "Cache", "Upstream Cache Control"]
description: ""
menu:
  main:
    parent: "Caching"
weight: 4
---

Upstream cache control refers to the caching of API responses based on instructions provided by the upstream service. This allows the upstream service to have control over which responses are cached and for how long and can be used to perform caching of traditionally "non-safe" requests. The upstream service controls the cache using parameters in the response header.

This approach gives the most granular control as it will also only cache responses based on the request method.

For example, if you only want to cache requests made with the `OPTIONS` method, you can configure the upstream cache control accordingly and return cache control headers only in those responses. With this configuration, Tyk will cache only those responses, not those for other methods for the same path.

Upstream cache control is configured on a per-API and per-endpoint basis, giving maximum flexibility. All configuration is performed within the API definition.

### Enabling upstream cache control for an API
To set up upstream cache control, you must configure a the `cache_options` in the API definition as follows:
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

The upstream server also controls the duration that Tyk should cache the response (Time-To-Live or TTL).

Tyk looks for the header `x-tyk-cache-action-set-ttl` in the response:
 - if this is found and has a positive integer value, the Gateway will cache the response for that many seconds
 - if the header is not present, Tyk falls back to the value specified in `cache_options.cache_timeout`

By configuring these headers in the responses from your services, you can have precise control over caching behaviour.

#### Using a custom TTL header key
If you wish to use a different header value to indicate the TTL you can do so by adding the `cache_control_ttl_header` option to the API definition.

For example, if you configure:
 ```
 "cache_options": {
     "cache_control_ttl_header": "x-expire"
 }
 ```

and also send `x-expire: 30` in the response header, Tyk will cache that specific response for 30 seconds.



