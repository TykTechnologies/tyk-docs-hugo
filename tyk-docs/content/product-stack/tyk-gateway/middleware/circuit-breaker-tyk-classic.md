---
title: Using the Circuit Breaker middleware with Tyk Classic APIs
date: 2024-01-19
description: "Using the Circuit Breaker with Tyk Classic APIs"
tags: ["circuit breaker", "middleware", "per-endpoint", "Tyk Classic"]
---

Tyk's [circuit breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk Classic APIs the circuit breaker is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [confguring the Circuit Breaker in Tyk Operator](#tyk-operator) section below.

## Configuring the Circuit Breaker in the Tyk Classic API Definition {#tyk-classic}

To configure the circuit breaker you must add a new `circuit_breakers` object to the `extended_paths` section of your API definition, with the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `threshold_percent`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `samples`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `return_to_service_after`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `disable_half_open_state`: by default the Tyk circuit breaker will operate in [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) when working with Tyk Classic APIs, set this to `true` if you want Tyk to wait the full cooldown period before closing the circuit
 
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

#### Step 1: Add an endpoint for the path and select the Circuit Breaker plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to deploy the circuit breaker. Select the **Circuit Breaker** plugin.

{{< img src="/img/2.10/circuit_breaker.png" alt="Plugin dropdown list" >}}

#### Step 2: Configure the circuit breaker

You can set up the various configurations options for the breaker in the drawer by clicking on it:

{{< img src="/img/2.10/ciruit_breaker_settings.png" alt="Circuit breaker configuration form" >}}

- **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- **Sample size (requests)**: The number of samples to take for a circuit breaker window
- **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds)

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

#### Step 4: Optionally configure webhooks to respond to the circuit breaker events

The Dashboard supports the separate `BreakerTripped` and `BreakerReset` events, but not the combined `BreakerTriggered` [event type]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}). You should use **API Designer > Advanced Options** to add a Webhook plugin to your endpoint for each event.

{{< img src="/img/dashboard/system-management/webhook-breaker.png" alt="Webhook events" >}}

## Confguring the Circuit Breaker in Tyk Operator {#tyk-operator}

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