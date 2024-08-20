---
title: Using the Internal Endpoint middleware with Tyk Classic APIs
date: 2024-01-26
description: "Using the Internal Endpoint middleware with Tyk Classic APIs"
tags: ["internal endpoint", "internal", "middleware", "per-endpoint", "Tyk Classic"]
---

The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk Classic APIs, the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

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

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic). The middleware can be configured by adding a new `internal` object to the `extended_paths` section of your API definition.

In the example below the internal endpoint middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any requests made to this endpoint that originate externally to Tyk will be rejected with `HTTP 403 Forbidden`. Conversely, the endpoint can be reached internally by another API at `tyk://<listen_path>/status/200`.

```yaml {linenos=true, linenostart=1, hl_lines=["26-28"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-endpoint-internal
spec:
  name: httpbin - Endpoint Internal
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org/
    listen_path: /httpbin-internal
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          internal:
            - path: /status/200
              method: GET
```
