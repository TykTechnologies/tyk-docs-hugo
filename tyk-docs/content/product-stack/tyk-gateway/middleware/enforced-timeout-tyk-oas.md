---
title: Using the Enforced Timeout middleware with Tyk OAS APIs
date: 2024-01-19
description: "Using the Enforced Timeout with Tyk OAS APIs"
tags: ["Enforced Timeouts", "middleware", "per-endpoint", "Tyk OAS"]
---

Tyk's [enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) middleware is configured at the endpoint level, where it sets a limit on the response time from the upstream service. If the upstream takes too long to respond to a request, Tyk will terminate the request and return `504 Gateway Timeout` to the client.

When working with Tyk OAS APIs the enforced timeout is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic" >}}) page.

## Configuring an enforced timeout in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The enforced timeout middleware (`enforceTimeout`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `enforceTimeout` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `value`: the duration of the upstream request timer

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-timeout",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-timeout",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-timeout/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "enforceTimeout": {
                        "enabled": true,
                        "value": 3
                    }
                }
            }
        }
    }
}
 ```

In this example Tyk OAS API definition, the enforced timeout has been configured to monitor requests to the `GET /status/200` endpoint. It will configure a timer that will expire (`timeout`) 3 seconds after the request is proxied to the upstream service. If the upstream response is not received before the expiry of the timer, that request will be terminated and Tyk will return `504 Gateway Timeout` to the client.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the enforced timeout.

## Configuring an enforced timeout in the API Designer

Adding the enforced timeout to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Enforce Timeout middleware

Select **ADD MIDDLEWARE** and choose the **Enforce Timeout** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-enforce-timeout.png" alt="Adding the Enforce Timeout middleware" >}}

#### Step 3: Configure the middleware

Set the timeout duration that you wish to enforce for requests to the endpoint.

{{< img src="/img/dashboard/api-designer/tyk-oas-enforce-timeout-config.png" alt="Configuring the enforced timeout for the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.
