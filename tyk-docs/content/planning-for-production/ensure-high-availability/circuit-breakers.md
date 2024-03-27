---
date: 2017-03-24T11:02:59Z
title: Circuit Breakers
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Circuit Breaker"]
description: "How to configure the Tyk Circuit Breaker to manage failing requests"
aliases:
  - /ensure-high-availability/circuit-breakers/
---

A circuit breaker is a protective mechanism that helps to maintain system stability by preventing repeated failures and overloading of services that are erroring. When a network or service failure occurs, the circuit breaker prevents further calls to that service, allowing the affected service time to recover while ensuring that the overall system remains functional. It is a critical component in ensuring the resilience and reliability of a distributed system.

Tyk's circuit breaker can be configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

Tyk can trigger events when the circuit breaker trips and when it resets. These events can be used for monitoring, alerting, or automation of recovery processes.

{{< img src="/img/diagrams/diagram_docs_circuit-breakers@2x.png" alt="Circuit breaker example" >}}

## When to use a circuit breaker

#### Protection of critical API endpoints

Circuit breakers can be used to safeguard essential API endpoints from overloading, ensuring their availability and performance. By implementing circuit breakers, users can prevent these endpoints from being overwhelmed, maintaining their reliability and responsiveness.

#### Handling temporary issues

Circuit breakers can help handle temporary issues in the system, such as temporary outages or performance degradation, by opening and closing the circuit when conditions are unfavorable, allowing the system to recover and resume normal operation.

#### Implementing retry logic

Circuit breakers can be used to automatically manage the retry of failed requests after a hold-off period, increasing the chances of successful execution.

#### Implementing fallback mechanisms

Circuit breakers can trigger alternative workflows or fallback mechanisms when the primary system fails, ensuring uninterrupted service delivery despite system failures.

## How the circuit breaker works

Similarly to the circuit breaker in an electrical installation, Tyk's circuit breaker middleware monitors the flow and trips (breaks the connection) if it detects errors. Whilst the electrical circuit breaker monitors the flow of electricity and trips if it detects overcurrent (e.g. a short-circuit), Tyk's monitors the responses back from the upstream service and trips if it detects too many failures.

From the perspective of the circuit breaker middleware, a failure is considered any response with HTTP status code `500` or above.

The circuit breaker is rate-based, meaning that it counts the number of failure responses received in a rolling sample window and trips if the failure rate exceeds the configured threshold.

The rolling sample window is set to 10 seconds and the circuit breaker is designed to trip only if a user-configurable minimum number of samples (requests) fail within the window period, this is 

Thus, if the _sample size_ is set to 100 and the _failure rate_ is set to 0.5 (50%) then the circuit breaker will trip only when there have been a minimum of 100 requests made in the past 10 seconds or which at least 50 have failed (returned an `HTTP 500` or higher error).

Once the breaker has been tripped it will remain _open_, blocking calls to the endpoint until a configurable cooldown (or return-to-service) period has elapsed. While the breaker is _open_, requests to the endpoint will return `HTTP 503 Service temporarily unavailable`.

### Half-open mode

In some scenarios the upstream service might recover more quickly than the configured cooldown period. The middleware supports a _half-open_ mode that facilitates an early return-to-service so that your clients do not have to wait until the end of the cooldown before the circuit breaker is reset.

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

The circuit breaker automatically controls the flow of requests to the upstream services quickly and efficiently, but it is equally important to alert you to the fact that there is an issue and to confirm when traffic will recommence once the issue is resolved. Tyk's [Event]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) system provides the method by which the circuit breaker can alert you to these occurrences.

- When the circuit breaker trips (from closed to open), Tyk will generate a `BreakerTripped` event
- When the breaker resets (from open to closed), whether at the end of the cooldown period or if connection is restored while in _half-open_ mode, Tyk will generate a `BreakerReset` event
- In addition to these, whenever the circuit breaker changes state (from closed to open or vice versa), Tyk will generate a `BreakerTriggered` event
 
For the generic `BreakerTriggered` event, the state change will be indicated in the `Status` field in the webhook template as follows:
- when a breaker trips `CircuitEvent = 0`
- when a breaker resets `CircuitEvent = 1`

<!-- TODO >
Documentation of events - in particular circuit breaker events - needs improving
< -->

### API-level circuit breaker
Tyk does not have an API-level circuit breaker that can be applied across all endpoints. If you are using the Tyk Dashboard, however, then you are able to use an [Open Policy Agent]({{< ref "tyk-dashboard/open-policy-agent.md" >}}) to append a circuit breaker to every API/Service using the regex `.*` path.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the circuit breaker middleware [here]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the circuit breaker middleware [here]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Circuit Breaker middleware summary
  - The Circuit Breaker is an optional stage in Tyk's API Request processing chain, activated when the request is proxied to the upstream service.
  - The Circuit Breaker is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
