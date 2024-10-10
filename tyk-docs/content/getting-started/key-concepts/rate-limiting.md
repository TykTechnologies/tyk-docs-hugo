---
title: Rate Limiting in Tyk
date: 2021-02-04
tags:
  - Rate Limit
  - Rate Limiting
  - Rate Limit Algorithms
  - Distributed Rate Limiter
  - Redis Rate Limiter
  - Fixed Window
  - Spike Arrest
  - Rate Limit Scope
description: Overview of Rate Limiting with the Tyk Gateway
---

API rate limiting is a technique that allows you to control the rate at which clients can consume your APIs and is one of the fundamental aspects of managing traffic to your services. It serves as a safeguard against abuse, overloading, and denial-of-service attacks by limiting the rate at which an API can be accessed. By implementing rate limiting, you can ensure fair usage, prevent resource exhaustion, and maintain system performance and stability, even under high traffic loads.

## What is rate limiting?

Rate limiting involves setting thresholds for the maximum number of requests that can be made within a specific time window, such as requests per second, per minute, or per day. Once a client exceeds the defined rate limit, subsequent requests may be delayed, throttled, or blocked until the rate limit resets or additional capacity becomes available.

## When might you want to use rate limiting?

Rate limiting may be used as an extra line of defense around attempted denial of service attacks. For instance, if you have load-tested your current system and established a performance threshold that you would not want to exceed to ensure system availability and/or performance then you may want to set a global rate limit as a defense to ensure it hasn't exceeded.

Rate limiting can also be used to ensure that one particular user or system accessing the API is not exceeding a determined rate. This makes sense in a scenario such as APIs which are associated with a monetization scheme where you may allow so many requests per second based on the tier in which that consumer is subscribed or paying for.

Of course, there are plenty of other scenarios where applying a rate limit may be beneficial to your APIs and the systems that your APIs leverage behind the scenes.

## How does rate limiting work?

At a basic level, when rate limiting is in use, Tyk Gateway will compare the incoming request rate against the configured limit and will block requests that arrive at a higher rate. For example, let’s say you only want to allow a client to call the API a maximum of 10 times per minute. In this case, you would apply a rate limit to the API expressed as "10 requests per 60 seconds". This means that the client will be able to successfully call the API up to 10 times within any 60 second interval (or window) and after for any further requests within that window, the user will get an [HTTP 429 (Rate Limit Exceeded)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) error response stating the rate limit has been exceeded.

Tyk's rate limiter is configured using two variables:
- `rate` which is the maximum number of requests that will be permitted during the interval (window)
- `per` which is the length of the interval (window) in seconds

So for this example you would configure `rate` to 10 (requests) and `per` to 60 (seconds).

### Rate limiting scopes: API-level vs key-level

Rate limiting can be applied at different scopes to control API traffic effectively. This section covers the two primary scopes - API-level rate limiting and key-level rate limiting. Understanding the distinctions between these scopes will help you configure appropriate rate limiting policies based on your specific requirements.

#### API-level rate limiting

API-level rate limiting aggregates the traffic coming into an API from all sources and ensures that the overall rate limit is not exceeded. Overwhelming an endpoint with traffic is an easy and efficient way to execute a denial of service attack. By using a API-level rate limit you can easily ensure that all incoming requests are within a specific limit so excess requests are rejected by Tyk and do not reach your service. You can calculate the rate limit to set by something as simple as having a good idea of the maximum number of requests you could expect from users of your API during a period. You could alternatively apply a more scientific and precise approach by considering the rate of requests your system can handle while still performing at a high-level. This limit may be easily determined with some performance testing of your service under load.

#### Key-level rate limiting

Key-level rate limiting is more focused on controlling traffic from individual sources and making sure that users are staying within their prescribed limits. This approach to rate limiting allows you to configure a policy to rate limit in two ways:

- **key-level global limit** limiting the rate of calls the user of a key can make to all APIs authorized by that key
- **key-level per-API limit** limiting the rate of calls the user of a key can make to specific individual APIs
- **key-level per-endpoint limit** limiting the rate of calls the user of a key can make to specific individual endpoints of an API
 
These guides include explanation of how to configure key-level rate limits when using [API Keys]({{< ref "getting-started/create-api-key" >}}) and [Security Policies]({{< ref "getting-started/create-security-policy" >}}).

#### Which scope should I use?

The simplest way to figure out which level of rate limiting you’d like to apply can be determined by asking a few questions:

- do you want to protect your service against denial of service attacks or overwhelming amounts of traffic from **all users** of the API? **You’ll want to use an API-level rate limit!**
- do you have a health endpoint that consumes very little resource on your service and can handle significantly more requests than your other endpoints? **You'll want to use an API-level per-endpoint rate limit!**
- do you want to limit the number of requests a specific user can make to **all APIs** they have access to? **You’ll want to use a key-level global rate limit!**
- do you want to limit the number of requests a specific user can make to **specific APIs** they have access to? **You’ll want to use a key-level per-API rate limit.**
- do you want to limit the number of requests a specific user can make to a **specific endpoint of an API** they have access to? **You’ll want to use a key-level per-endpoint rate limit.**

### Applying multiple rate limits

When multiple rate limits are configured, they are assessed in this order (if applied):

1. API-level per-endpoint rate limit (configured in API definition)
2. API-level rate limit (configured in API definition)
3. Key-level per-endpoint rate limit (configured in access key)
4. Key-level per-API rate limit (configured in access key)
5. Key-level global rate limit (configured in access key)

### Combining multiple policies configuring rate limits

If more than one policy defining a rate limit is applied to a key then Tyk will apply the highest request rate permitted by any of the policies that defines a rate limit.

If `rate` and `per` are configured in multiple policies applied to the same key then the Gateway will determine the effective rate limit configured for each policy and apply the highest to the key.

Given, policy A with `rate` set to 90 and `per` set to 30 seconds (3rps) and policy B with `rate` set to 100 and `per` set to 10 seconds (10rps). If both are applied to a key, Tyk will take the rate limit from policy B as it results in a higher effective request rate (10rps).

{{< note success >}}
**Note**  

Prior to Tyk 5.4.0 there was a long-standing bug in the calculation of the effective rate limit applied to the key where Tyk would combine the highest `rate` and highest `per` from the policies applied to the key, so for the example above the key would have `rate` set to 100 and `per` set to 30 giving an effective rate limit of 3.33rps. This has now been corrected.
{{< /note >}}

## Rate limiting algorithms

Different rate limiting algorithms are employed to cater to varying requirements, use cases and gateway deployments. A one-size-fits-all approach may not be suitable, as APIs can have diverse traffic patterns, resource constraints, and service level objectives. Some algorithms are more suited to protecting the upstream service from overload whilst others are suitable for per-client limiting to manage and control fair access to a shared resource.

Tyk offers the following rate limiting algorithms:

1. [Distributed Rate Limiter]({{< ref "#distributed-rate-limiter" >}}): recommended for most use cases, implements the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket)
2. [Redis Rate Limiter]({{< ref "#redis-rate-limiter" >}}): implements the [sliding window log algorithm](https://developer.redis.com/develop/dotnet/aspnetcore/rate-limiting/sliding-window)
3. [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}): implements the [fixed window algorithm](https://redis.io/learn/develop/dotnet/aspnetcore/rate-limiting/fixed-window)

When the rate limits are reached, Tyk will block requests with an [HTTP 429 (Rate Limit Exceeded)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) response.

{{< note success >}}
**Note**  

Tyk supports selection of the rate limit algorithm at the Gateway level, so the same algorithm will be applied to all APIs.
It can be configured to switch dynamically between two algorithms depending on the request rate, as explained [here]({{< ref "#dynamic-algorithm-selection-based-on-request-rate" >}}).
{{< /note >}}

### Distributed Rate Limiter

The Distributed Rate Limiter (DRL) is the default rate limiting mechanism in Tyk Gateway. It is
implemented using a token bucket implementation that does not use Redis.
In effect, it divides the configured rate limit between the number of
addressable gateway instances.

The characteristics of DRL are:

- a rate limit of 100 requests/min with 2 gateways yields 50 requests/min per gateway
- unreliable at low rate limits where requests are not fairly balanced

DRL can face challenges in scenarios where traffic is not evenly
distributed across gateways, such as with sticky sessions or keepalive
connections. These conditions can lead to certain gateways becoming
overloaded while others remain underutilized, compromising the
effectiveness of configured rate limiting. This imbalance is particularly
problematic in smaller environments or when traffic inherently favors
certain gateways, leading to premature rate limits on some nodes and
excess capacity on others.

DRL will be used automatically unless one of the other rate limit
algorithms are explicitly enabled via configuration.

It's important to note that this algorithm will yield approximate results due to the nature of the local
rate limiting, where the total allowable request rate is split between the gateways; uneven distribution
of requests could lead to exhaustion of the limit on some gateways before others.

### Redis Rate Limiter

This algorithm implements a sliding window log algorithm and can be enabled via the [enable_redis_rolling_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_redis_rolling_limiter" >}}) configuration option.

The characteristics of the Redis Rate Limiter (RRL) are:

- using Redis lets any gateway respect a cluster-wide rate limit (shared counter)
- a record of each request, including blocked requests that return `HTTP 429`, is written to the sliding log in Redis
- the log is constantly trimmed to the duration of the defined window
- requests are blocked if the count in the log exceeds the configured rate limit

An important behavior of this rate limiting algorithm is that it blocks
access to the API when the rate exceeds the rate limit and does not let
further API calls through until the rate drops below the specified rate
limit. For example, if the configured rate limit is 3000 requests/minute the call rate would
have to be reduced below 3000 requests/minute for a whole minute before the `HTTP 429`
responses stop and traffic is resumed. This behavior is called **spike arrest**.

The complete request log is stored in Redis so resource usage when using this rate limiter is high.
This algorithm will use significant resources on Redis even when blocking requests, as it must
maintain the request log, mostly impacting CPU usage. Redis resource
usage increases with traffic therefore shorter `per` values are recommended to
limit the amount of data being stored in Redis.

If you wish to avoid spike arrest behavior but the DRL is not suitable, you might use the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) algorithm.

You can configure [Rate Limit Smoothing]({{< ref "#rate-limit-smoothing" >}}) to manage the traffic spike, allowing time to increase upstream capacity if required.

The [Redis Sentinel Rate Limiter]({{< ref "#redis-sentinel-rate-limiter" >}}) reduces latency for clients, however increases resource usage on Redis and Tyk Gateway.

#### Rate Limit Smoothing

Rate Limit Smoothing is an optional mechanism of the RRL that dynamically adjusts the request
rate limit based on the current traffic patterns. It helps in managing
request spikes by gradually increasing or decreasing the rate limit
instead of making abrupt changes or blocking requests excessively.

This mechanism uses the concept of an intermediate *current allowance* (rate limit) that moves between an initial lower 
bound (`threshold`) and the maximum configured request rate (`rate`). As the request rate approaches the current 
*current allowance*, Tyk will emit an event to notify you that smoothing has been triggered. When the event is emitted, 
the *current allowance* will be increased by a defined increment (`step`). A hold-off counter (`delay`) must expire 
before another event is emitted and the *current allowance* further increased. If the request rate exceeds the 
*current allowance* then the rate limiter will block further requests, returning `HTTP 429` as usual.

As the request rate falls following the spike, the *current allowance* will gradually reduce back to the lower bound (`threshold`).

Events are emitted and adjustments made to the *current allowance* based on the following calculations:

- when the request rate rises above `current allowance - (step * trigger)`,
  a `RateLimitSmoothingUp` event is emitted and *current allowance* increases by `step`.
- when the request rate falls below `allowance - (step * (1 + trigger))`,
  a `RateLimitSmoothingDown` event is emitted and *current allowance* decreases by `step`.

##### Configuring rate limit smoothing

When Redis Rate Limiter is in use, rate limit smoothing is configured with the following options within the `smoothing` object alongside the standard `rate` and `per` parameters:

- `enabled` (boolean) to enable or disable rate limit smoothing
- `threshold` is the initial rate limit (*current allowance*) beyond which smoothing will be applied
- `step` is the increment by which the *current allowance* will be increased or decreased each time a smoothing event is emitted
- `trigger` is a fraction (typically in the range 0.1-1.0) of the `step` at which point a smoothing event will be emitted as the request rate approaches the *current allowance*
- `delay` is a hold-off between smoothing events and controls how frequently the current allowance will step up or down (in seconds).

Rate Limit Smoothing is configured using the `smoothing` object within access keys and policies. For API-level rate limiting, this configuration is within the `access_rights[*].limit` object.

An example configuration would be as follows:

```yaml
    "smoothing": {
      "enabled": true,
      "threshold": 5,
      "trigger": 0.5,
      "step": 5,
      "delay": 30
    }
```

#### Redis Sentinel Rate Limiter

The Redis Sentinel Rate Limiter option will:

- write a sentinel key into Redis when the request limit is reached
- use the sentinel key to block requests immediately for `per` duration
- requests, including blocked requests, are written to the sliding log in a background thread

This optimizes the latency for connecting clients, as they don't have to
wait for the sliding log write to complete. This algorithm exhibits spike
arrest behavior the same as the basic Redis Rate Limiter, however recovery may take longer as the blocking is in
effect for a minimum of the configured window duration (`per`). Gateway and Redis
resource usage is increased with this option.

This option can be enabled using the following configuration option
[enable_sentinel_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_sentinel_rate_limiter" >}}).

To optimize performance, you may configure your rate limits with shorter
window duration values (`per`), as that will cause Redis to hold less
data at any given moment.

Performance can be improved by enabling the [enable_non_transactional_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_non_transactional_rate_limiter" >}}). This leverages Redis Pipelining to enhance the performance of the Redis operations. Please consult the [Redis documentation](https://redis.io/docs/manual/pipelining/) for more information.

Please consider the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) algorithm as an alternative, if Redis performance is an issue.

### Fixed Window Rate Limiter

The Fixed Window Rate Limiter will limit the number of requests in a
particular window in time. Once the defined rate limit has been reached,
the requests will be blocked for the remainder of the configured window
duration. After the window expires, the counters restart and again allow
requests through.

- the implementation uses a single counter value in Redis
- the counter expires after every configured window (`per`) duration.

The implementation does not smooth out traffic bursts within a window. For any
given `rate` in a window, the requests are processed without delay, until
the rate limit is reached and requests are blocked for the remainder of the
window duration.

When using this option, resource usage for rate limiting does not
increase with traffic. A simple counter with expiry is created for every
window and removed when the window elapses. Regardless of the traffic
received, Redis is not impacted in a negative way, resource usage remains
constant.

This algorithm can be enabled using the following configuration option [enable_fixed_window_rate_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_fixed_window_rate_limiter" >}}).

If you need spike arrest behavior, the [Redis Rate Limiter]({{< ref "#redis-rate-limiter" >}}) should be used.

### Dynamic algorithm selection based on request rate

The Distributed Rate Limiter (DRL) works by distributing the
rate allowance equally among all gateways in the cluster. For example,
with a rate limit of 1000 requests per second and 5 gateways, each
gateway can handle 200 requests per second. This distribution allows for
high performance as gateways do not need to synchronize counters for each
request.

DRL assumes an evenly load-balanced environment, which is typically
achieved at a larger scale with sufficient requests. In scenarios with
lower request rates, DRL may generate false positives for rate limits due
to uneven distribution by the load balancer. For instance, with a rate of
10 requests per second across 5 gateways, each gateway would handle only
2 requests per second, making equal distribution unlikely.

It's possible to configure Tyk to switch automatically between the Distributed Rate Limiter
and the Redis Rate Limiter by setting the `drl_threshold` configuration.

This threshold value is used to dynamically switch the rate-limiting
algorithm based on the volume of requests. This option sets a
minimum number of requests per gateway that triggers the Redis Rate
Limiter. For example, if `drl_threshold` is set to 2, and there are 5
gateways, the DRL algorithm will be used if the rate limit exceeds 10
requests per second. If it is 10 or fewer, the system will fall back to
the Redis Rate Limiter.

See [DRL Threshold]({{< ref "/tyk-oss-gateway/configuration.md#drl_threshold" >}}) for details on how to configure this feature.
