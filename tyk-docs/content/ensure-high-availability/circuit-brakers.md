---
date: 2017-03-24T11:02:59Z
title: Circuit Brakers
menu:
  main:
    parent: "Ensure High Availability"
weight: 3 
---

## <a name="overview"></a>Circuit Brakers Overview

Tyk has a built-in circuit breaker pattern as a path-based option. Our circuit breaker is threshold-based, so if x% of requests are failing then the circuit is tripped. When the circuit is tripped, the gateway stops *all* inbound requests to that service for a pre-defined period of time (a recovery time-period).

The circuit breaker will also emit an event which you can hook into to perform some corrective or logging action.

Circuit breakers use a threshhold-breaker pattern, so out of sample size `x` if `y%` of requests fail, the breaker will trip. When the breaker trips, the service is taken offline for the `return_to_service_after` period and an event is triggered.

The circuit breaker works across hosts (i.e. if you have multiple targets for an API, the sample is across *all* upstream requests).

Circuit breakers are individual on a single host, they do not centralise or pool back-end data, this is for speed purposes. This means that in a load balanced environment where multiple Tyk nodes are used, some traffic can spill through as other nodes reach the sampling rate limit.

#### Events

When a circuit breaker trips, it will fire a `BreakerTriggered` event which you can define actions for in the `event_handlers` section (see the event handlers section of the documentations for more information on this feature):

```
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

> **Note**: If you are using the service discovery module, every time the breaker trips, Tyk will attempt to refresh the node list.

## <a name="config-with-api"></a>Circuit Brakers Config: API Definition

To enable the breaker in your API Definition, you will need to add a new section to your versions' `extended_paths` list:

```
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

## <a name="config-with-dashboard"></a>Circuit Brakers Config: Dashboard

To set up a circuit breaker on a path for your API, add a new Endpoint in the *Endpoint Designer* section of your API and then select the *Circuit Breaker* plugin:

![Plugin dropdown list][1]

Once the plugin is active, you can set up the various configurations options for the breaker in the drawer by clicking on it:

![Circuit breaker configuration form][2]

*   **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0.
*   **Sample size (requests)**: The number of samples to take for a circuit breaker window.
*   **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds).

 [1]: /docs/img/dashboard/system-management/circuitBrakerDesigner.png
 [2]: /docs/img/dashboard/system-management/circuitBrakerConfig.png


