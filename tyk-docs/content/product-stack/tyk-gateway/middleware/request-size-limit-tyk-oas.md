---
title: Using the Request Size Limit middleware with Tyk OAS APIs
date: 2024-03-04
description: "Using the Request Size Limit middleware with Tyk OAS APIs"
tags: ["request size limit", "size limit", "security", "middleware", "per-endpoint", "per-API", "Tyk OAS", "Tyk OAS API"]
---

The [request size limit]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) middleware enables you to apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from excessive memory usage or brute force attacks.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

There are three different levels of granularity that can be used when configuring a request size limit.
- [system-wide]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits#applying-a-system-level-size-limit" >}}): affecting all APIs deployed on the gateway
- [API-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas#applying-a-size-limit-for-a-specific-api" >}}): affecting all endpoints for an API
- [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas#applying-a-size-limit-for-a-specific-endpoint" >}}): affecting a single API endpoint

### Applying a size limit for a specific API

The API-level size limit has not yet been implemented for Tyk OAS APIs.

You can work around this by implementing a combination of endpoint-level size limits and [allow]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) or [block]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) lists.

### Applying a size limit for a specific endpoint

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The virtual endpoint middleware (`requestSizeLimit`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `requestSizeLimit` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `value`: the maximum size permitted for a request to the endpoint (in bytes) 

For example:
```json {hl_lines=["39-44"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-size-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "post": {
                "operationId": "anythingpost",
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
            "name": "example-request-size-limit",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-request-size-limit/",                
                "strip": true
            }
        },      
        "middleware": {
            "operations": {
                "anythingpost": {
                    "requestSizeLimit": {
                        "enabled": true,
                        "value": 100
                    }
                }
            }
        }
    }
}
```

In this example the endpoint-level Request Size Limit middleware has been configured for HTTP `POST` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will check the size of the payload (Request body) and, if it is larger than 100 bytes, will reject the request, returning `HTTP 400 Request is too large`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the virtual endpoint middleware.

## Configuring the middleware in the API Designer

Adding the Request Size Limit middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint for the path

From the **API Designer** add an endpoint that matches the path for you want to limit the size of requests.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Request Size Limit middleware

Select **ADD MIDDLEWARE** and choose the **Request Size Limit** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-size-limit.png" alt="Adding the Request Size Limit middleware" >}}

#### Step 3: Configure the middleware

Now you can set the **size limit** that the middleware should enforce - remember that this is given in bytes.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-size-limit-config.png" alt="Setting the size limit that should be enforced" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes to your API.
