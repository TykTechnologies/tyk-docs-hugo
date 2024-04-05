---
title: Using the Do-Not-Track middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Do-Not-Track middleware with Tyk Classic APIs"
tags: ["do-not-track", "endpoint tracking", "analytics", "transaction logging", "middleware", "per-endpoint", "per-API", "Tyk Classic"]
---

The [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) middleware provides the facility to disable generation of transaction records (which are used to track requests) at the API or endpoint level.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition either manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

You can prevent tracking for all endpoints of an API by configuring the `do_not_track` field in the root of your API definition.
- `true`: no transaction logs will be generated for requests to the API
- `false`: transaction logs will be generated for requests to the API
 
If you want to be more granular and disable tracking only for selected endpoints, then you must add a new `do_not_track_endpoints` object to the `extended_paths` section of your API definition.

The `do_not_track_endpoints` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "do_not_track_endpoints": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET"
            }
        ]
    }
}
```

In this example the do-not-track middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will not generate transaction records from the Gateway and so will not appear in the analytics.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the per-endpoint Do-Not-Track middleware for your Tyk Classic API by following these steps. Note that the API-level middleware can only be configured from the Raw Definition screen.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you do not want to generate records. Select the **Do not track endpoint** plugin.

{{< img src="img/gateway/middleware/classic_do_not_track.png" alt="Select the middleware" >}}

#### Step 2: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
