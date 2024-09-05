---
title: Using the Enforced Timeout middleware with Tyk Classic APIs
date: 2024-01-19
description: "Using the Enforced Timeout with Tyk Classic APIs"
tags: ["Enforced Timeouts", "middleware", "per-endpoint", "Tyk Classic"]
---

Tyk's [enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) middleware is configured at the endpoint level, where it sets a limit on the response time from the upstream service. If the upstream takes too long to respond to a request, Tyk will terminate the request and return `504 Gateway Timeout` to the client.

When working with Tyk Classic APIs the enforced timeout is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring an enforced timeout in Tyk Operator](#tyk-operator) section below.

## Configuring an enforced timeout in the Tyk Classic API Definition {#tyk-classic}

To configure an enforced timeout you must add a new `hard_timeouts` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `timeout`: the duration of the upstream request timer

For example:
```json
{
    "hard_timeouts": [
        {
            "path": "/status/200",
            "method": "GET",
            "timeout": 3
        }
    ]
}
```

In this example the enforced timeout has been configured to monitor requests to the `GET /status/200` endpoint. It will configure a timer that will expire (`timeout`) 3 seconds after the request is proxied to the upstream service.

If the upstream response is not received before the expiry of the timer, that request will be terminated and Tyk will return `504 Gateway Timeout` to the client.

## Configuring an enforced timeout in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the enforced timeout middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the Enforced Timeout plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to deploy the enforced timeout. Select the **Enforced timeout** plugin.

{{< img src="/img/2.10/enforced_breakout.png" alt="Plugin dropdown" >}}

#### Step 2: Configure the timeout

Then enter the timeout to be enforced for the endpoint (in seconds):

{{< img src="/img/2.10/enforced_timeouts_settings.png" alt="Enforced timeout configuration" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring an enforced timeout in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring an enforced timeout in the Tyk Classic API Definition](#tyk-classic). It is possible to configure an enforced timeout using the `hard_timeouts` object within the `extended_paths` section of the API Definition.

The example API Definition below configures an API to listen on path `/httpbin-timeout-breaker` and forwards requests upstream to http://httpbin.org. A hard timeout value of 2 seconds is configured for path `/delay/{delay_seconds}`. This will return a `504 Gateway Timeout` response to the client if the upstream response is not received before expiry of the timer.

```yaml {linenos=true, linenostart=1, hl_lines=["26-29"]}
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
              threshold_percent: "0.5" # Tyk Dashboard API doesn't support strings.
```

We can test the example using the curl command as shown below:

```bash
curl http://localhost:8081/httpbin-timeout/delay/3 -i
    HTTP/1.1 504 Gateway Timeout
Content-Type: application/json
X-Generator: tyk.io
Date: Fri, 09 Aug 2024 07:43:48 GMT
Content-Length: 57

{
    "error": "Upstream service reached hard timeout."
}
```