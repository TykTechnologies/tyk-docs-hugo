---
date: 2017-03-24T11:07:33Z
title: Enforced Timeouts
tags: ["High Availability", "SLAs", "Uptime", "Monitoring", "Enforced Timeouts"]
description: "How to enforce timeouts to keep your Tyk installation responding"
---

In any system, a task or operation takes a certain period of time to complete. When a client makes a request to the Tyk Gateway, it will be dependent upon the responsiveness of the upstream service before it can continue. If the upstream service is suffering from resource overload or congestion the response may be returned too late leading to unacceptable experience for the end user or even to instability in the system.

Tyk's Enforced Timeout middleware can be used to apply a maximum time that the Gateway will wait for a response before it terminates (or times out) the request. If the timeout expires, then Tyk will notify the client with an `HTTP 504 Gateway Timeout` error.

This feature helps to maintain system stability and prevents unresponsive or long-running tasks from affecting the overall performance of the system. The enforced timeout can be customized and configured to suit specific requirements, providing control over resource allocation and ensuring optimal system functionality.

## When to use an enforced timeout

#### Resource management

The enforced timeout can be implemented to manage system resources efficiently, particularly in high-traffic environments, preventing long-running tasks from monopolising resources, ensuring fair distribution and optimal performance.

#### Task prioritization

Prioritizing critical tasks by setting timeouts based on their expected time-to-complete helps to ensure that essential tasks are completed by reducing the impact of non-responsive upstream services.

#### Security measures

Limiting task durations can help protect against potential security breaches or malicious activities by setting time constraints on user sessions or API requests.

#### Time-sensitive operations

For time-sensitive tasks, enforced timeouts can guarantee timely completion and avoid delays or missed deadlines.

## How the enforced timeout middleware works

The enforced timeout middleware is enabled and configured at the endpoint level.

The configuration is very simple, the only option being the duration of the timeout (which is declared in seconds) after which the upstream request will be terminated and an `HTTP 504 Gateway Timeout` error returned to the client.

{{< note success >}}
**Note**  

If you are using the Service Discovery option, if an enforced timeout is triggered, the service discovery module will refresh the host / host list.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the enforced timeout middleware [here]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the enforced timeout middleware [here]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Enforced Timeout middleware summary
  - The Enforced Timeout is an optional stage in Tyk's API Request processing chain, activated when the request is proxied to the upstream service.
  - The Enforced Timeout is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
