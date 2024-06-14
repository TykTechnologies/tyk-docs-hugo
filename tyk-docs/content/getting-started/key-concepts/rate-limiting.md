---
weight: 65
title: Rate Limiting in Tyk
tags:
    - Rate Limit
    - Rate Limiting
    - Rate Limit Algorithms
    - DRL
menu:
    main:
        parent: Key Concepts
description: Overview of Rate Limiting with the Tyk Gateway
date: "2021-02-04"
---

In the realm of API management, rate limiting is one of the fundamental aspects of managing traffic to your APIs. Rate limiting can easily become one of the easiest and most efficient ways to control traffic to your APIs.

Rate limiting can help with API overuse caused by accidental issues within client code which results in the API being overwhelmed with requests. On the malicious side, a denial of service attack meant to overwhelm the API resources can also be easily executed without rate limits in place.

## What is rate limiting and how does it work?

Rate limits are calculated in Requests Per Second (RPS). For example, let’s say a developer only wants to allow a client to call the API a maximum of 10 times per minute. In this case the developer would apply a rate limit to their API expressed as "10 requests per 60 seconds". This means that the client will be able to successfully call the API up to 10 times within any 60 second interval and after that the user will get an error stating their rate limit has been exceeded if they call it an 11th time within that time frame.

## Types Of Rate Limiting

Tyk offers the following rate limiting algorithms to protect your APIs:

1. Distributed Rate Limiter. Recommended for most use cases. Implements the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket).
2. Redis Rate Limiter. Implements the [sliding window log algorithm](https://developer.redis.com/develop/dotnet/aspnetcore/rate-limiting/sliding-window).
3. Fixed Window Rate Limiter. Implements the [fixed window algorithm](https://redis.io/learn/develop/dotnet/aspnetcore/rate-limiting/fixed-window).

When the rate limits are reached, Tyk will block request with a [429 (Rate Limit Exceeded)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) response.

### Distributed Rate Limiter (DRL)

This is the default rate limiting mechanism in Tyk Gateway. It's
implemented using a token bucket implementation that does not use Redis.
In effect, it divides the configured rate limit between the number of
addressable gateway instances. It's characteristics are:

- A rate limit of 100/min with 2 gateways yields 50/min rate per gateway
- Unreliable at low rate limits where requests are not fairly balanced

DRL can face challenges in scenarios where traffic is not evenly
distributed across gateways, such as with sticky sessions or keepalive
connections. These conditions can lead to certain gateways becoming
overloaded while others remain underutilized, compromising the
effectiveness of configured rate limiting. This imbalance is particularly
problematic in smaller environments or when traffic inherently favors
certain gateways, leading to premature rate limits on some nodes and
excess capacity on others.

DRL will be used automatically unless one of the other rate limit
algorithms is explicitly enabled via configuration.

The DRL implements a token bucket algorithm. It's important to note that
this algorithm will yield approximate results due to the nature of local
rate limiting.

### Redis Rate Limiter

This algorithm can be enabled via the [enable_redis_rolling_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_redis_rolling_limiter" >}}) configuration option.

This rate limiter implements a sliding window log algorithm:

- Using Redis lets any gateway respect a cluster-wide rate limit
- A record of each request, including blocked requests that return `HTTP 429`, is written to the sliding log in Redis
- The log is constantly trimmed to the duration of the defined window
- Requests are blocked if the count in the log exceeds the configured rate limit

An important behaviour of this rate limiting method is that it blocks
access to the API when the rate exceeds the rate limit and does not let
further API calls through until the rate drops below the specified rate
limit. For example, if the configured rate limit is 3000 requests/minute the call rate would
have to be reduced below 3000 requests/minute for a whole minute before the `HTTP 429`
responses stop and traffic is resumed.

This behaviour is called spike arrest. As the complete request log is
stored in Redis, resource usage when using this rate limiter is high.
This algorithm will use significant resources on Redis even when blocking requests, as it must
maintain the request log, mostly impacting CPU usage. Redis resource
usage increases with traffic therefore shorter `per` values are recommended to
limit the amount of data being stored in Redis.

If you wish to avoid spike arrest behaviour, you may:

- use the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) instead of Redis Rate Limiter.
- configure [Rate Limit Smoothing]({{< ref "#rate-limit-smoothing" >}}) to gradually adjust limits.

##### Rate Limit Smoothing

Rate Limit Smoothing is a mechanism to dynamically adjust the request
rate limits based on the current traffic patterns. It helps in managing
request spikes by gradually increasing or decreasing the rate limit
instead of making abrupt changes or blocking requests excessively.

When Redis Rate Limiter is in use, rate limit smoothing may be configured
on a key level, policy level, or per-API with the following options:

- `enabled` (boolean) to enable or disable rate limit smoothing
- `threshold` after which to apply smoothing (minimum rate for window)
- `trigger` configures at which fraction of a step a smoothing event is emitted
- `step` is the value by which the rate allowance will get adjusted
- `delay` is the amount of seconds between smoothing updates

Rate Limit Smoothing is configured using:

- API Keys, under `.smoothing.*`
- Policies, under `.smoothing.*`
- Per-API, via Keys and Policies under `.access_rights[<api_id>].limit.smoothing.*`

An example configuration would be as follows:

```json
"smoothing": {
  "enabled": true,
  "threshold": 5,
  "trigger": 0.5,
  "step": 5,
  "delay": 30
}
```

This is used to compute a request allowance. The request allowance will
be smoothed between `threshold`, and the defined rate limits (maximum).
The request allowance will be updated internally every `delay` seconds.

Events are emitted based on the following calculations:

- When the request rate rises above `allowance - (step * trigger)`,
  a RateLimitSmoothingUp event is emitted and allowance increases by `step`.
- When the request rate falls below `allowance - (step + step * trigger)`,
  a RateLimitSmoothingDown event is emitted and allowance decreases by `step`.

Please consult the following guides for an explanation of how to configure the value on keys or policies:

- [Create API Key]({{< ref "getting-started/create-api-key" >}})
- [Create Security Policy]({{< ref "getting-started/create-security-policy" >}})

##### Redis Sentinel Rate Limiter

The Redis Sentinel Rate Limiter option will enable:

- Writing a sentinel key into Redis when the request limit is reached
- Using the sentinel key to block requests immediately for `per` duration
- Requests, including blocked requests, are written to the sliding log in a background thread

This optimizes the latency for connecting clients, as they don't have to
wait for the sliding log write to complete. This algorithm exhibits spike
arrest behaviour the same as the basic Redis Rate Limiter, however recovery may take longer as the blocking is in
effect for a minimum of the configured window duration (`per`). Gateway and Redis
resource usage is increased with this option.

This option can be enabled using the following configuration option
[enable_sentinel_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_sentinel_rate_limiter" >}}).

To optimize performance, you may configure your rate limits with shorter
window duration values (`per`), as that will cause Redis to hold less
data at any given moment.

Performance can be improved by enabling the [enable_non_transactional_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_non_transactional_rate_limiter" >}}). This leverages Redis Pipelining to enhance the performance of the Redis operations. Here are the [Redis documentation](https://redis.io/docs/manual/pipelining/) for more information.

Please consider the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) algorithm as an alternative, if Redis performance is an issue.

### Distributed Rate Limiter Threshold

It's possible to switch between the DRL behaviour and the Redis Rate
Limiter behaviour with configuration. Tyk switches between these two
modes using the `drl_threshold` configuration.

The threshold value is used to dynamically switch the rate-limiting
algorithm based on the volume of requests. DRL works by distributing the
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

To address this, the `drl_threshold` option allows the system to switch
from DRL to a Redis Rate Limiter for smaller rates. This option sets a
minimum number of requests per gateway that triggers the Redis Rate
Limiter. For example, if `drl_threshold` is set to 2, and there are 5
gateways, the DRL algorithm will be used if the rate limit exceeds 10
requests per second. If it is 10 or fewer, the system will fall back to
the Redis Rate Limiter.

See configuration for [DRL Threshold]({{< ref "/tyk-oss-gateway/configuration.md#drl_threshold" >}}) on how to configure it.

### Fixed Window Rate Limiter

The Fixed Window Rate Limiter will limit the number of requests in a
particular window in time. Once the defined rate limit has been reached,
the requests will be blocked for the remainder of the configured window
duration. After the window expires, the counters restart and again allow
requests through.

- The implementation uses a single counter value in Redis
- The counter expires after every configured window (`per`) duration.

The implementation does not handle traffic bursts within a window. For any
given `rate` in a window, the requests are processed without delay, until
the rate limit is reached and requests are blocked for the remainder of the
window duration.

When using this option, resource usage for rate limiting does not
increase with traffic. A simple counter with expiry is created for every
window and removed when the window elapses. Regardless of the traffic
received, Redis is not impacted in a negative way, resource usage remains
constant.

This algorithm can be enabled using the following configuration option [enable_fixed_window_rate_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_fixed_window_rate_limiter" >}}).

If you need spike arrest behaviour, the [Redis Rate Limiter]({{< ref "#redis-rate-limiter" >}}) should be used.

## Rate limiting levels

Tyk has two approaches to rate limiting:

### Key-level rate limiting

Key-level rate limiting is more focused on controlling traffic from individual sources and making sure that users are staying within their prescribed limits. This approach to rate limiting allows you to configure a policy to rate limit in two possible ways: limiting the rate of calls the user of a key can make to all available APIs, another form of global rate limiting just from one specific user and limiting the rate of calls to specific individual APIs, also known as a “per API rate limit”.

### API-level rate limiting

API-level rate limiting assesses all traffic coming into an API from all sources and ensures that the overall rate limit is not exceeded. Overwhelming an endpoint with traffic is an easy and efficient way to execute a denial of service attack. By using a global rate limit you can easily ensure that all incoming requests are within a specific limit. This limit may be calculated by something as simple as having a good idea of the maximum amount of requests you could expect from users of your API. It may also be something more scientific and precise like the amount of requests your system can handle while still performing at a high-level. This may be easily uncovered with some performance testing in order to establish this threshold.

When rate limiting measures are put in place, they are assessed in this order (if applied):

1. API-level global rate limit
2. Key-level global rate limit
3. Key-level per-API rate limit

## When might you want to use rate limiting?

For key-level rate limiting you will be aiming to ensure that one particular user or system accessing the API is not exceeding a determined rate. This makes sense in a scenario such as APIs which are associated with a monetisation scheme where you may allow so many requests per second based on the tier in which that consumer is subscribed or paying for.

An API-level global rate limit may be used as an extra line of defence around attempted denial of service attacks. For instance, if you have load tested your current system and established a performance threshold that you would not want to exceed to ensure system availability and/or performance then you may want to set a global rate limit as a defence to make sure that it is not exceeded.

Of course, there are plenty of other scenarios where applying a rate limit may be beneficial to your APIs and the systems that your APIs leverage behind the scenes. The simplest way to figure out which type of rate limiting you’d like to apply can be determined by asking a few questions:

Do you want to protect against denial of service attacks or overwhelming amounts of traffic from **all users** of the API? **You’ll want to use an API-level global rate limit!**

Do you want to limit the number of requests a specific user can make to **all APIs** they have access to? **You’ll want to use a key-level global rate limit!**

Do you want to limit the number of requests a specific user can make to **specific APIs** they have access to? **You’ll want to use a key-level per-API rate limit.**
