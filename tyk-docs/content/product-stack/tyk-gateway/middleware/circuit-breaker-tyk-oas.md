---
title: Using the Circuit Breaker middleware with Tyk OAS APIs
date: 2024-01-19
description: "Using the Circuit Breaker with Tyk OAS APIs"
tags: ["circuit breaker", "middleware", "per-endpoint", "Tyk OAS"]
---

Tyk's [circuit breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk OAS APIs the circuit breaker is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic" >}}) page.

## Configuring the Circuit Breaker in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The circuit breaker middleware (`circuitBreaker`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `circuitBreaker` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `threshold`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `sampleSize`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `coolDownPeriod`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `halfOpenStateEnabled`: if set to `true` then the circuit breaker will operate in [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) once it has been tripped

```json {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-breaker",
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
            "name": "example-breaker",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-breaker/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "circuitBreaker": {
                        "enabled": true,
                        "threshold": 0.5,
                        "sampleSize": 10,
                        "coolDownPeriod": 60,
                        "halfOpenStateEnabled": true
                    }
                }
            }
        }
    }
}
```

In this example Tyk OAS API Definition the circuit breaker has been configured to monitor requests to the `GET /status/200` endpoint.

It will configure the circuit breaker so that if a minimum of 10 requests (`sampleSize`) to this endpoint are received during the [rolling sampling window]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#how-the-circuit-breaker-works" >}}) then it will calculate the ratio of failed requests (those returning `HTTP 500` or above) within that window.
- if the ratio of failed requests exceeds 50% (`threshold = 0.5`) then the breaker will be tripped
- after it has tripped, the circuit breaker will remain _open_ for 60 seconds (`coolDownPeriod`)
- further requests to `GET /status/200` will return `HTTP 503 Service temporarily unavailable`
- the circuit breaker will operate in _half-open_ mode (`halfOpenStateEnabled = true`) so when the threshold has been reached and the breaker is tripped, Tyk will periodically poll the upstream service to test if it has become available again

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the circuit breaker.

## Configuring the Circuit Breaker in the API Designer

Adding the circuit breaker to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Circuit Breaker middleware

Select **ADD MIDDLEWARE** and choose the **Circuit Breaker** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker.png" alt="Adding the Circuit Breaker middleware" >}}

#### Step 3: Configure the middleware

Set the circuit breaker configuration parameters so that Tyk can protect your upstream service if it experiences failure:
- threshold failure rate for the proportion of requests that can error before the breaker is tripped (a value between 0.0 and 1.0)
- the minimum number of requests that must be received during the [rolling sampling window]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#how-the-circuit-breaker-works" >}}) before the circuit breaker can trip
- the cooldown period for which the breaker will remain _open_ after being tripped before returning to service (in seconds)
- optionally enable [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) for upstream services with variable recovery times

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker-config.png" alt="Configuring the circuit breaker for the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.
