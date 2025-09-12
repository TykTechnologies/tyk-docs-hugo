---
title: "Internal Endpoint"
date: 2025-01-10
description: "How to configure Internal Endpoint traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "Internal Endpoint"]
keywords: ["Traffic Transformation", "Internal Endpoint"]
aliases:
  - /product-stack/tyk-gateway/middleware/internal-endpoint-middleware
  - /product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas
  - /product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic
---

## Overview {#internal-endpoint-overview}

The Internal Endpoint middleware instructs Tyk Gateway to ignore external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

### Use Cases

#### Internal routing decisions

Internal endpoints are frequently used to make complex routing decisions that cannot be handled by the standard routing features. A single externally published endpoint can receive requests and then, based on inspection of the requests, the [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) middleware can route them to different internal endpoints and on to the appropriate upstream services.

### Working

When the Internal Endpoint middleware is configured for a specific endpoint, it instructs the Gateway to ignore requests to the endpoint that originate from outside Tyk.

An internal endpoint can be targeted from another API deployed on Tyk using the `tyk://` prefix instead of `http://`.

For example, if `GET /status/200` is configured to be an Internal Endpoint on the listen path `http://my-tyk-install.org/my-api/` then external calls to this endpoint will be rejected with `HTTP 403 Forbidden`. Other APIs on Tyk will be able to direct traffic to this endpoint by setting their `target_url` to `tyk://my-api/status/200`.

#### Addressing an internal endpoint

An internal endpoint can be addressed using three different identifiers in the format `tyk://{identifier}/{endpoint}`.

The options for the `identifier` are:
- `self` (only if the endpoint is in the same API)
- `api_id` (the unique API Identifier assigned to the API within Tyk)
- listen path (the listen path defined for the API)

For example, let's say you have two APIs:

| api_id | listen path | Endpoint 1   | Endpoint 2 (with internal endpoint middleware) |
|--------|-------------|--------------|------------------------------------------------|
| f1c63fa5177de2719  | `/api1`    | `endpoint1_ext` | `endpoint1_int`     |
| 2e90b33a879945918  | `/api2`    | `endpoint2_ext` | `endpoint2_int`     |

An external request directed at `/api1/endpoint1_int` will be rejected with `HTTP 403 Forbidden`, since this is an internal endpoint.

This endpoint could, however, be called from within either endpoint in `/api2` as either:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`

Or from within `/api1/endpoint1_ext` as:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`
- `tyk://self/endpoint1_int`

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 # Internal Endpoint middleware summary
  - The Internal Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Internal Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->



## Using Tyk OAS {#internal-endpoint-using-tyk-oas}

The [Internal Endpoint]({{< ref "#internal-endpoint-overview" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk OAS APIs, the middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#internal-endpoint-using-classic" >}}) page.

### API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The internal endpoint middleware (`internal`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `internal` object has the following configuration:
- `enabled`: enable the middleware for the endpoint

For example:
```json {hl_lines=["49-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-internal-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/redirect": {
            "get": {
                "operationId": "redirectget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-internal-endpoint",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-internal-endpoint/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "internal": {
                        "enabled": true
                    }
                },
                "redirectget": {
                    "urlRewrite": {
                        "enabled": true,
                        "pattern": ".*",
                        "rewriteTo": "tyk://self/anything"
                    }
                }
            }
        }
    }
}
```

In this example, two endpoints have been defined:
- the internal endpoint middleware has been configured for requests to the `GET /anything` endpoint
- the [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) middleware has been configured for requests to the `GET /redirect` endpoint
 
Any calls made directly to `GET /example-internal-endpoint/anything` will be rejected, with Tyk returning `HTTP 403 Forbidden`, since the `/anything` endpoint is internal.

Any calls made to `GET /example-internal-endpoint/redirect` will be redirected to `GET /example-internal-endpoint/anything`. These will be proxied to the upstream because they originate from within Tyk Gateway (i.e. they are internal requests) - so the response from `GET http://httpbin.org/anything` will be returned.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the internal endpoint middleware.

### API Designer

Adding the Internal Endpoint middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Internal Endpoint middleware**

    Select **ADD MIDDLEWARE** and choose the **Internal** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-internal.png" alt="Adding the Internal Endpoint middleware" >}}

3. **Save the API**

    Select **SAVE API** to apply the changes to your API.

## Using Classic {#internal-endpoint-using-classic}

The [Internal Endpoint]({{< ref "#internal-endpoint-overview" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk Classic APIs, the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#internal-endpoint-using-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

### API Definition

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

### API Designer

You can use the API Designer in the Tyk Dashboard to configure the internal endpoint middleware for your Tyk Classic API by following these steps.

1. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path that you wish to set as internal. Select the **Internal** plugin.

    {{< img src="/img/dashboard/endpoint-designer/internal-endpoint.png" alt="Adding the internal endpoint middleware to a Tyk Classic API endpoint" >}}

2. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

### Tyk Operator

The process for configuring the middleware in Tyk Operator is similar to that explained in configuring the middleware in the Tyk Classic API Definition. The middleware can be configured by adding a new `internal` object to the `extended_paths` section of your API definition.

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



