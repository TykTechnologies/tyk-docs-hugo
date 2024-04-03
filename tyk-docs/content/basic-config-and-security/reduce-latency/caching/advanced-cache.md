---
title: "Endpoint Caching"
date: 2023-06-08
tags: ["Caching", "Cache", "Endpoint Cache", "selective caching", "middleware", "per-endpoint"]
description: "Detail of the Endpoint Caching middleware"
---

On this page we describe how to configure Tyk's API response cache per endpoint within an API. This gives granular control over which paths are cached and allows you to vary cache configuration across API versions. For details on the API level (Global) cache you should refer to the [global-cache]({{< ref "/basic-config-and-security/reduce-latency/caching/global-cache">}}) configuration page.

When you use the API-level cache, Tyk will maintain a cache entry for each combination of request method, request path (endpoint) and API key (if authentication is enabled) for an API. The Endpoint Caching middleware gives you granular control over which paths are cached and allows you to vary cache configuration across API versions.

For details on the API-level cache you should refer to the [API-level cache]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache">}}) configuration page.

## When to use the Endpoint Caching middleware
#### API with multiple endpoints
When your API has more than one endpoint the upstream data could have different degrees of freshness, for example the data returned by one endpoint might refresh only once every five minutes (and so should be suitably cached) whilst another might give real-time data and so should not be cached. The endpoint cache allows you to optimise the caching of each endpoint to meet your requirements.

#### Request based caching
If you have an API that's providing search capability (for example into a catalogue of products) and want to optimise the performance for the most frequently requested search terms, you could use the endpoint cache's [request-selective](#request-selective-cache-control) capability to cache only a subset of all requests to an endpoint.

## How the endpoint cache works
If caching is enabled then, by default, Tyk will create separate cache entries for every endpoint (path) of your API. This may be unnecessary for your particular API, so Tyk provides a facility to cache only specific endpoint(s).

The endpoint-level cache relies upon the API-level cache being enabled but then allows you to enable the middleware for the specific endpoints that you wish to cache. No other endpoint requests will be cached.

For each endpoint in your API with endpoint caching middleware enabled, you can configure which response codes should be cached (for example, you might not want to cache error responses) and also the refresh interval - or timeout - for the cache entries.

{{< note success >}}
**Note** 

It's important to note that the [cache all safe requests]({{< ref "/basic-config-and-security/reduce-latency/caching#global-cache-safe-requests">}}) feature of the API-level cache will overrule the per-endpoint configuration so you must ensure that both are not enabled for the same API.
{{< /note >}}

#### Request-selective cache control
For ultimate control over what Tyk caches, you can optionally configure the endpoint cache middleware to look for specific content in the request body. Tyk will then create a separate cache entry for each response where the request matches the specific combination of method, path and body content.

You define a regex pattern and, if Tyk finds a match for this anywhere in the request body, the response will be cached.  

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the Endpoint Caching middleware [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the Endpoint Caching middleware [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Internal Endpoint middleware summary
  - The Endpoint Cache middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Endpoint Cache middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
