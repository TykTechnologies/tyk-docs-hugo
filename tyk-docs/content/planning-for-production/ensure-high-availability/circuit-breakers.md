---
date: 2017-03-24T11:02:59Z
title: Circuit Breakers
menu:
  main:
    parent: "Ensure High Availability"
weight: 3 
---

## <a name="overview"></a>Overview

![Circuit Breaker Example](/docs/img/dashboard/system-management/circuit-breaker-diagram.png)

Tyk has a built-in circuit breaker pattern as a path-based option. Our circuit breaker is threshold-based, so if a sample size `x` of `y%` requests fail, the breaker will trip. The Gateway will stop **all** inbound requests to that service for a pre-defined period of time (a recovery time-period). You configure this time period using the `return_to_service_after` option in your API definition, or setup via the Dashboard. See [Configure with the API Definition](#with-api) or [Configure with the Dashboard] (#with-dashboard). This also triggers an event which you can hook into to perform corrective or logging action. When a circuit breaker is tripped, it will return a 503 "Service temporarily unavailable" error.

The circuit breaker works across hosts (i.e. if you have multiple targets for an API, the sample is across **all** upstream requests).

Circuit breakers are individual on a single host, they do not centralise or pool back-end data. This is for speed purposes. This means that in a load balanced environment where multiple Tyk nodes are used, some traffic can spill through as other nodes reach the sampling rate limit.

#### Events

When a circuit breaker trips, it will fire a `BreakerTriggered` event which you can define actions for in the `event_handlers` section (see [Event Data](/docs/basic-config-and-security/report-monitor-trigger-events/event-data/) and [Event Types](/docs/basic-config-and-security/report-monitor-trigger-events/event-types/) for more information):

```{.copyWrapper}
event_handlers: {
  events: {
    BreakerTriggered: [
      {
        handler_name: "eh_web_hook_handler",
        handler_meta: {
          method: "POST",
          target_path: "http://posttestserver.com/post.php?dir=tyk-breaker",
          template_path: "templates/breaker_webhook.json",
          header_map: {
            "X-Tyk-Test-Header": "Tyk v1.BANANA"
          },
          event_timeout: 10
        }
      }
    ]
   }
 },
```

The status codes returned to the template are:

```
// BreakerTripped is sent when a breaker trips
BreakerTripped = 0

// BreakerReset is sent when a breaker resets
BreakerReset = 1
```

> **NOTE**: If you are using the service discovery module, every time the breaker trips, Tyk will attempt to refresh the node list.

## <a name="with-api"></a>Configure with the API Definition

To enable the breaker in your API Definition, you will need to add a new section to your versions' `extended_paths` list:

```{.copyWrapper}
"circuit_breakers": [
  {
    "path": "get",
    "method": "GET",
    "threshold_percent": 0.5,
    "samples": 5,
    "return_to_service_after": 60
  }
]
```

*   `path`: The path to match on.
*   `method`: The method to match on.
*   `threshold_percent`: The percentage of requests that can error before the breaker is tripped. This must be a value between 0.0 and 1.0.
*   `samples`: The number of samples to take for a circuit breaker window.
*   `return_to_service_after`: The cool-down period of the breaker to return to service (seconds).

## <a name="with-dashboard"></a>Configure with the Dashboard

To set up a circuit breaker on a path for your API, add a new Endpoint in the **Endpoint Designer** section of your API and then select the **Circuit Breaker** plugin:

![Plugin dropdown list](/docs/img/dashboard/system-management/circuit_breaker_designer_2.5.png)

Once the plugin is active, you can set up the various configurations options for the breaker in the drawer by clicking on it:

![Circuit breaker configuration form](/docs/img/dashboard/system-management/circuit_breaker_config_2.5.png)

*   **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0.
*   **Sample size (requests)**: The number of samples to take for a circuit breaker window.
*   **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds).