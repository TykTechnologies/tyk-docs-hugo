---
title: "Circuit Breakers"
date: 2025-02-10
keywords: ["circuit breaker", "circuit breakers", "middleware", "API management", "resilience", "reliability"]
description: "How to configure Tyk's circuit breaker middleware to protect your upstream services from repeated failures and overloading."
aliases:
  - /product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic
  - /product-stack/tyk-gateway/middleware/circuit-breaker-tyk-oas
  - /ensure-high-availability/circuit-breakers
---

## Introduction

A circuit breaker is a protective mechanism that helps to maintain system stability by preventing repeated failures and overloading of services that are erroring. When a network or service failure occurs, the circuit breaker prevents further calls to that service, allowing the affected service time to recover while ensuring that the overall system remains functional. It is a critical component in ensuring the resilience and reliability of a distributed system.

Tyk's circuit breaker can be configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

Tyk can trigger events when the circuit breaker trips and when it resets. These events can be used for monitoring, alerting, or automation of recovery processes.

{{< img src="/img/diagrams/diagram_docs_circuit-breakers@2x.png" alt="Circuit breaker example" >}}

## When to use a circuit breaker

**Protection of critical API endpoints**

Circuit breakers can be used to safeguard essential API endpoints from overloading, ensuring their availability and performance. By implementing circuit breakers, users can prevent these endpoints from being overwhelmed, maintaining their reliability and responsiveness.

**Handling temporary issues**

Circuit breakers can help handle temporary issues in the system, such as temporary outages or performance degradation, by opening and closing the circuit when conditions are unfavorable, allowing the system to recover and resume normal operation.

**Implementing retry logic**

Circuit breakers can be used to automatically manage the retry of failed requests after a hold-off period, increasing the chances of successful execution.

**Implementing fallback mechanisms**

Circuit breakers can trigger alternative workflows or fallback mechanisms when the primary system fails, ensuring uninterrupted service delivery despite system failures.

## How the circuit breaker works

Similarly to the circuit breaker in an electrical installation, Tyk's circuit breaker middleware monitors the flow and trips (breaks the connection) if it detects errors. Whilst the electrical circuit breaker monitors the flow of electricity and trips if it detects overcurrent (e.g. a short-circuit), Tyk's monitors the responses back from the upstream service and trips if it detects too many failures.

From the perspective of the circuit breaker middleware, a failure is considered any response with HTTP status code `500` or above.

The circuit breaker is rate-based, meaning that it counts the number of failure responses received in a rolling sample window and trips if the failure rate exceeds the configured threshold.

The rolling sample window is set to 10 seconds and the circuit breaker is designed to trip only if a user-configurable minimum number of samples (requests) fail within the window period.

Thus, if the _sample size_ is set to 100 and the _failure rate_ is set to 0.5 (50%) then the circuit breaker will trip only when there have been a minimum of 100 requests made in the past 10 seconds of which at least 50 have failed (returned an `HTTP 500` or higher error).

Once the breaker has been tripped it will remain _open_, blocking calls to the endpoint until a configurable cooldown (or return-to-service) period has elapsed. While the breaker is _open_, requests to the endpoint will return `HTTP 503 Service temporarily unavailable`.

### Half-open mode

In some scenarios the upstream service might recover more quickly than the configured cooldown period. The middleware supports a _half-open_ mode that facilitates an early return-to-service so that API clients do not have to wait until the end of the cooldown before the circuit breaker is reset.

In the _half-open_ mode, Tyk will periodically issue requests to the upstream service to check whether the path has been restored (while continuing to block client requests). If the Gateway detects that the path has been reconnected, the circuit breaker will be automatically reset (following the electrical circuit analogy, the circuit breaker is _closed_) and requests will be passed to the upstream again.

### Configuring the circuit breaker

The circuit breaker is configured using only three parameters:
- sample size
- error rate threshold
- cooldown period

The threshold is a ratio of the number of failures received in the sample window. For example, if the sample window size is 100 requests and you wish to trip the circuit breaker if there are 15 failures in any 100 requests, the threshold should be set to `15/100 = 0.15`.

The cooldown period is the time that the circuit breaker will remain _open_ after the error rate threshold has been met and the breaker has been tripped.

There is also an option to enable or disable the _half-open_ state if this would be damaging to your system.

{{< note success >}}
**Note**  

If you are using the Service Discovery module, every time the breaker trips, Tyk will attempt to refresh the Gateway list.
{{< /note >}}

### Using the circuit breaker with multiple upstream hosts

The circuit breaker works at the endpoint level independent of the number of upstream hosts are servicing the requests. Thus, if you have multiple upstream targets for an API, the sample and failure counts are accumulated across **all** upstream requests. If the failure rate exceeds the threshold, the circuit breaker will trip even if only some of your upstream hosts are failing. Operating in _half-open_ mode will of course cause the breaker to reset if a responsive upstream receives a request, but the `BreakerTripped` (or `BreakerTriggered`) event should alert you to the fact that at least one host is failing.

### Using the circuit breaker with multiple Tyk Gateways

Circuit breakers operate on a single Tyk Gateway, they do not centralise or pool back-end data. This ensures optimum speed of response and resilience to Gateway failure. Subsequently, in a load balanced environment where multiple Tyk Gateways are used, some traffic can spill through even after the circuit breaker has tripped on one Gateway as other Gateways continue to serve traffic to the upstream before their own breakers trip.

### Circuit breaker events

The circuit breaker automatically controls the flow of requests to the upstream services quickly and efficiently, but it is equally important to alert you to the fact that there is an issue and to confirm when traffic will recommence once the issue is resolved. Tyk's [Event]({{< ref "api-management/gateway-events#event-categories" >}}) system provides the method by which the circuit breaker can alert you to these occurrences.

- When the circuit breaker trips (from closed to open), Tyk will generate a `BreakerTripped` event
- When the breaker resets (from open to closed), whether at the end of the cooldown period or if connection is restored while in _half-open_ mode, Tyk will generate a `BreakerReset` event
- In addition to these, whenever the circuit breaker changes state (from closed to open or vice versa), Tyk will generate a `BreakerTriggered` event
 
For the generic `BreakerTriggered` event, the state change will be indicated in the `Status` field in the webhook template as follows:
- when a breaker trips `CircuitEvent = 0`
- when a breaker resets `CircuitEvent = 1`

### API-level circuit breaker

Tyk does not have an API-level circuit breaker that can be applied across all endpoints. If you are using the Tyk Dashboard, however, then you are able to use an [Open Policy Agent]({{< ref "api-management/dashboard-configuration#extend-permissions-using-open-policy-agent-opa" >}}) to append a circuit breaker to every API/Service using the regex `.*` path.

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Circuit Breaker middleware summary
  - The Circuit Breaker is an optional stage in Tyk's API Request processing chain, activated when the request is proxied to the upstream service.
  - The Circuit Breaker is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


**Using the Circuit Breaker middleware with Tyk OAS APIs**


Tyk's circuit breaker middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk OAS APIs the circuit breaker is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#configuring-the-circuit-breaker-in-the-tyk-classic-api-definition" >}}) page.

## Configuring the Circuit Breaker in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human-readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The circuit breaker middleware (`circuitBreaker`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `circuitBreaker` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `threshold`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `sampleSize`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `coolDownPeriod`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `halfOpenStateEnabled`: if set to `true` then the circuit breaker will operate in [half-open mode]({{< ref "#half-open-mode" >}}) once it has been tripped

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

It will configure the circuit breaker so that if a minimum of 10 requests (`sampleSize`) to this endpoint are received during the [rolling sampling window]({{< ref "#how-the-circuit-breaker-works" >}}) then it will calculate the ratio of failed requests (those returning `HTTP 500` or above) within that window.
- if the ratio of failed requests exceeds 50% (`threshold = 0.5`) then the breaker will be tripped
- after it has tripped, the circuit breaker will remain _open_ for 60 seconds (`coolDownPeriod`)
- further requests to `GET /status/200` will return `HTTP 503 Service temporarily unavailable`
- the circuit breaker will operate in _half-open_ mode (`halfOpenStateEnabled = true`) so when the threshold has been reached and the breaker is tripped, Tyk will periodically poll the upstream service to test if it has become available again

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the circuit breaker.

## Configuring the Circuit Breaker in the API Designer

Adding the circuit breaker to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

**Step 1: Add an endpoint**

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

**Step 2: Select the Circuit Breaker middleware**

Select **ADD MIDDLEWARE** and choose the **Circuit Breaker** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker.png" alt="Adding the Circuit Breaker middleware" >}}

**Step 3: Configure the middleware**

Set the circuit breaker configuration parameters so that Tyk can protect your upstream service if it experiences failure:
- threshold failure rate for the proportion of requests that can error before the breaker is tripped (a value between 0.0 and 1.0)
- the minimum number of requests that must be received during the [rolling sampling window]({{< ref "#how-the-circuit-breaker-works" >}}) before the circuit breaker can trip
- the cooldown period for which the breaker will remain _open_ after being tripped before returning to service (in seconds)
- optionally enable [half-open mode]({{< ref "#half-open-mode" >}}) for upstream services with variable recovery times

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker-config.png" alt="Configuring the circuit breaker for the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

**Step 4: Save the API**

Select **SAVE API** to apply the changes to your API.


## Using the Circuit Breaker middleware with Tyk Classic APIs


Tyk's circuit breaker middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk Classic APIs the circuit breaker is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#configuring-the-circuit-breaker-in-the-tyk-oas-api-definition" >}}) page.

If you're using Tyk Operator then check out the [configuring the Circuit Breaker in Tyk Operator](#configuring-the-circuit-breaker-in-tyk-operator) section below.

## Configuring the Circuit Breaker in the Tyk Classic API Definition

To configure the circuit breaker you must add a new `circuit_breakers` object to the `extended_paths` section of your API definition, with the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `threshold_percent`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `samples`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `return_to_service_after`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `disable_half_open_state`: by default the Tyk circuit breaker will operate in [half-open mode]({{< ref "#half-open-mode" >}}) when working with Tyk Classic APIs, set this to `true` if you want Tyk to wait the full cooldown period before closing the circuit
 
For example:
```json  {linenos=true, linenostart=1}
{
    "circuit_breakers": [
        {
            "path": "status/200",
            "method": "GET",
            "threshold_percent": 0.5,
            "samples": 10,
            "return_to_service_after": 60,
            "disable_half_open_state": false
        }
    ]
}
```
In this example the circuit breaker has been configured to monitor HTTP `GET` requests to the `/status/200` endpoint. It will configure a sampling window (`samples`) of 10 requests and calculate the ratio of failed requests (those returning HTTP 500 or above) within that window. If the ratio of failed requests exceeds 50% (`threshold_percent = 0.5`) then the breaker will be tripped. After it has tripped, the circuit breaker will remain _open_ for 60 seconds (`return_to_service_after`). The circuit breaker will operate in _half-open_ mode (`disable_half_open_state = false`) so when _open_, Tyk will periodically poll the upstream service to test if it has become available again.

When the breaker has tripped, it will return `HTTP 503 Service temporarily unavailable` in response to any calls to `GET /status/200`.

## Configuring the Circuit Breaker in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the circuit breaker middleware for your Tyk Classic API by following these steps.

**Step 1: Add an endpoint for the path and select the Circuit Breaker plugin**

From the **Endpoint Designer** add an endpoint that matches the path for which you want to deploy the circuit breaker. Select the **Circuit Breaker** plugin.

{{< img src="/img/2.10/circuit_breaker.png" alt="Plugin dropdown list" >}}

**Step 2: Configure the circuit breaker**

You can set up the various configurations options for the breaker in the drawer by clicking on it:

{{< img src="/img/2.10/ciruit_breaker_settings.png" alt="Circuit breaker configuration form" >}}

- **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- **Sample size (requests)**: The number of samples to take for a circuit breaker window
- **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds)

**Step 3: Save the API**

Use the *save* or *create* buttons to save the changes and activate the middleware.

**Step 4: Optionally configure webhooks to respond to the circuit breaker events**

The Dashboard supports the separate `BreakerTripped` and `BreakerReset` events, but not the combined `BreakerTriggered` [event type]({{< ref "api-management/gateway-events#event-types" >}}). You should use **API Designer > Advanced Options** to add a Webhook plugin to your endpoint for each event.

{{< img src="/img/dashboard/system-management/webhook-breaker.png" alt="Webhook events" >}}

## Configuring the Circuit Breaker in Tyk Operator

The example API Definition below configures an API to listen on path `/httpbin-timeout-breaker` and forwards requests upstream to http://httpbin.org. A hard timeout value of 2 seconds is configured for path `/delay/{delay_seconds}`. This will return a `504 Gateway Timeout` response to the client if the upstream response is not received before expiry of the timer.

```yaml {linenos=true, linenostart=1, hl_lines=["30-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-timeout-breaker
spec:
  name: httpbin-timeout-breaker
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-timeout-breaker
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
          hard_timeouts:
            - method: GET
              path: /delay/{delay_seconds}
              timeout: 2
          circuit_breakers:
            - method: GET
              path: /status/500
              return_to_service_after: 10
              samples: 4
              threshold_percent: "0.5"
```

A circuit breaker has been configured to monitor `HTTP GET` requests to the `/status/500` endpoint. It will configure a sampling window (samples) of 4 requests and calculate the ratio of failed requests (those returning HTTP 500 or above) within that window. If the ratio of failed requests exceeds 50% (threshold_percent = 0.5) then the breaker will be tripped. After it has tripped, the circuit breaker will remain open for 10 seconds (return_to_service_after). The circuit breaker will operate using the default half-open mode so when open, Tyk will periodically poll the upstream service to test if it has become available again.

When the breaker has tripped, it will return HTTP 503 Service temporarily unavailable in response to any calls to GET /status/500.

