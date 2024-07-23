---
title: Using the Rate Limit middleware with Tyk Classic APIs
date: 2024-07-18
description: "Using the per-endpoint rate limit middleware with Tyk Classic APIs"
tags: ["rate limit", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The per-endpoint rate limit middleware allows you to enforce rate limits on specific endpoints. This middleware is configured in the Tyk Classic API Definition, either via the Tyk Dashboard API or in the API Designer.

If you’re using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "/product-stack/tyk-gateway/middleware/endpoint-rate-limit-oas" >}}) page.

## Configuring a rate limit in the Tyk Classic API Definition

To enable the middleware, add a new `rate_limit` object to the `extended_paths` section of your API definition.

The `rate_limit` object has the following configuration:

- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `enabled`: boolean to enable or disable the rate limit
- `rate`: the maximum number of requests that will be permitted during the interval (window)
- `per`: the length of the interval (window) in seconds

You can set different rate limits for various endpoints by specifying multiple `rate_limit` objects.

#### Simple endpoint rate limit

For example:

```json  {linenos=true, linenostart=1}
{
    "use_extended_paths": true,
    "extended_paths": {
        "rate_limit": [
            {
                "path": "/anything",
                "method": "GET",
                "enabled": true,
                "rate": 60,
                "per": 1
            }
        ]
    }
}
```

In this example, the rate limit middleware has been configured for HTTP
`GET` requests to the `/anything` endpoint, limiting requests to 60 per
second.

#### Advanced endpoint rate limit

For more complex scenarios, you can configure rate limits for multiple
paths. The order of evaluation matches the order defined in the
`rate_limit` array. For example, if you wanted to limit the rate of
`POST` requests to your API allowing a higher rate to one specific
endpoint you could configure the API definition as follows: 

```json  {linenos=true, linenostart=1}
{
    "use_extended_paths": true,
    "extended_paths": {
        "rate_limit": [
            {
                "path": "/user/login",
                "method": "POST",
                "enabled": true,
                "rate": 100,
                "per": 1
            },
            {
                "path": "/.*",
                "method": "POST",
                "enabled": true,
                "rate": 60,
                "per": 1
            }
        ]
    }
}
```

In this example, the first rule limits `POST` requests to `/user/login`
to 100 requests per second (rps). Any other `POST` request matching the
regex pattern `/.*` will be limited to 60 requests per second. The order
of evaluation ensures that the specific `/user/login` endpoint is matched
and evaluated before the regex pattern.
