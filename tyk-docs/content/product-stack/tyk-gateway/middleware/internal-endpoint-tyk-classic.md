---
title: Using the Internal Endpoint middleware with Tyk Classic APIs
date: 2024-01-26
description: "Using the Internal Endpoint middleware with Tyk Classic APIs"
tags: ["internal endpoint", "internal", "middleware", "per-endpoint", "Tyk Classic"]
---

The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk Classic APIs, the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

To enable the middleware you must add a new `internal` object to the `extended_paths` section of your API definition.

The `internal` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "internal": [
            {
                "disabled": false,
                "path": "/status/200",
                "method": "GET"
            }
        ]
    }
}
```

In this example the internal endpoint middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any requests made to this endpoint that originate externally to Tyk will be rejected with `HTTP 403 Forbidden`. Conversely, the endpoint can be reached internally by another API at `tyk://<listen_path>/status/200`.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the internal endpoint middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path that you wish to set as internal. Select the **Internal** plugin.

{{< img src="/img/dashboard/endpoint-designer/internal-endpoint.png" alt="Adding the internal endpoint middleware to a Tyk Classic API endpoint" >}}

#### Step 2: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
