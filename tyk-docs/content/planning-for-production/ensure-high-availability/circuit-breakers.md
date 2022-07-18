---
date: 2017-03-24T11:02:59Z
title: Circuit Breakers
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Circuit Breaker"]
description: "How to configure the Tyk Circuit Breaker to manage failing requests"
menu:
  main:
    parent: "Ensure High Availability"
weight: 3 
---

## Overview

{{< img src="/img/diagrams/diagram_docs_circuit-breakers@2x.png" alt="Circuit breaker example" >}}

Tyk has a built-in circuit breaker pattern as a path-based option. Our circuit breaker is rate-based, so if a sample size `x` of `y%` requests fail, the breaker will trip.  This triggers an event which you can hook into to perform corrective or logging action. 

The Gateway will stop **all** inbound requests to that service for a pre-defined period of time (a recovery time-period). You can configure this recovery time-period using the `return_to_service_after` option in your API definition, or via the Dashboard.

Once a circuit breaker has been tripped, the Tyk Gateway will return a 503 "Service temporarily unavailable" error for any calls to the API until the end of the recovery time-period.

During the recovery time-period, the Tyk Gateway will periodically issue requests to the upstream service to check whether the path has been restored. If the gateway detects that the path has been reconnected, the circuit breaker will be automatically reset and the 'BreakerReset' event will be generated.

This behaviour is described as the circuit breaker being "half-open"; if the desired behaviour is to enforce the full recovery time period (i.e. to unblock the path only after the `return_to_service_after` time period) then you can disable the half-open operation by setting `disable_half_open_state` to `true`.

See [Configure with the API Definition](#configure-with-the-api-definition) or [Configure with the Dashboard](#configure-with-the-dashboard).

The circuit breaker works across hosts (i.e. if you have multiple targets for an API, the sample is across **all** upstream requests).

Circuit breakers are individual on a single host, they do not centralise or pool back-end data. This is for speed purposes. This means that in a load balanced environment where multiple Tyk nodes are used, some traffic can spill through as other nodes reach the sampling rate limit.

#### Events

When a circuit breaker trips, it can fire a `BreakerTriggered` [event type]({{< ref "/content/basic-config-and-security/report-monitor-trigger-events/event-types.md" >}}) which you can define actions for in the `event_handlers` section (see [Event Data](/docs/basic-config-and-security/report-monitor-trigger-events/event-data/) and [Event Types](/docs/basic-config-and-security/report-monitor-trigger-events/event-types/) for more information).

{{< note success >}}
**Note**  

The Dashboard supports the separate `BreakerTripped` and `BreakerReset` events, but not the combined `BreakerTrigger` event. See [Configure with the Dashboard](#configure-with-the-dashboard) for more details.
{{< /note >}}

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

{{< note success >}}
**Note**  

If you are using the service discovery module, every time the breaker trips, Tyk will attempt to refresh the node list.
{{< /note >}}



## Configure with the API Definition

To enable the breaker in your API Definition, you will need to add a new section to your versions' `extended_paths` list:

```{.copyWrapper}
"circuit_breakers": [
  {
    "path": "get",
    "method": "GET",
    "threshold_percent": 0.5,
    "samples": 5,
    "return_to_service_after": 60,
    "disable_half_open_state": false
  }
]
```

*   `path`: The path to match on.
*   `method`: The method to match on.
*   `threshold_percent`: The percentage of requests that can error before the breaker is tripped. This must be a value between 0.0 and 1.0.
*   `samples`: The number of samples to take for a circuit breaker window.
*   `return_to_service_after`: The cool-down period of the breaker to return to service (seconds).
*   `disable_half_open_state`: By default the Tyk circuit breaker has enabled the half-open state, if the desired behavior is to only check after the time configured in `return_to_service_after` is consumed then you can disable this by this option to `true`.

## Configure with the Dashboard

To set up a circuit breaker on a path for your API, add a new Endpoint in the **Endpoint Designer** section of your API and then select the **Circuit Breaker** plugin:

![Plugin dropdown list](/docs/img/2.10/circuit_breaker.png)

Once the plugin is active, you can set up the various configurations options for the breaker in the drawer by clicking on it:

![Circuit breaker configuration form](/docs/img/2.10/ciruit_breaker_settings.png)

*   **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0.
*   **Sample size (requests)**: The number of samples to take for a circuit breaker window.
*   **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds).

The Dashboard supports the separate `BreakerTripped` and `BreakerReset` events, but not the combined `BreakerTrigger` [event type]({{< ref "/content/basic-config-and-security/report-monitor-trigger-events/event-types.md" >}}). You should use **API Designer > Advanced Options** to add a Webhook plugin to your endpoint for each event.

{{< img src="/img/dashboard/system-management/webhook-breaker.png" alt="Webhook events" >}}
