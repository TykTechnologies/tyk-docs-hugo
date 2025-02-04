---
title: Using the Internal Endpoint middleware with Tyk OAS APIs
date: 2024-01-26
description: "Using the Internal Endpoint middleware with Tyk OAS APIs"
tags: ["internal endpoint", "internal", "middleware", "per-endpoint", "Tyk OAS"]
---

The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk OAS APIs, the middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

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
- the [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware has been configured for requests to the `GET /redirect` endpoint
 
Any calls made directly to `GET /example-internal-endpoint/anything` will be rejected, with Tyk returning `HTTP 403 Forbidden`, since the `/anything` endpoint is internal.

Any calls made to `GET /example-internal-endpoint/redirect` will be redirected to `GET /example-internal-endpoint/anything`. These will be proxied to the upstream because they originate from within Tyk Gateway (i.e. they are internal requests) - so the response from `GET http://httpbin.org/anything` will be returned.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the internal endpoint middleware.

## Configuring the middleware in the API Designer

Adding the Internal Endpoint middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Internal Endpoint middleware

Select **ADD MIDDLEWARE** and choose the **Internal** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-internal.png" alt="Adding the Internal Endpoint middleware" >}}

#### Step 3: Save the API

Select **SAVE API** to apply the changes to your API.
