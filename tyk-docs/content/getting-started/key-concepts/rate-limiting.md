---
title: "Rate Limiting in Tyk"
date: 2021-02-04
tags: ["Rate Limit", "Rate Limiting", "Rate Limit Algorithms", "DRL"]
description: "Overview of Rate Limiting with the Tyk Gateway"
menu:
  main:
    parent: "Key Concepts"
weight: 65
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

### Distributed Rate Limiter (DRL)

This is the default rate limiter in Tyk. It is the most performant but has a trade-off that the limit applied is approximate, not exact. To use a less performant, exact rate limiter, review the Redis Rate Limiter below.

The Distributed Rate Limiter will be used automatically unless one of the other rate limit algorithms are explicitly enabled via configuration.

With the DRL, the configured rate limit is split (distributed) evenly across all the gateways in the cluster (a cluster of gateway shares the same Redis). These gateways store the running rate in memory and return [429 (Rate Limit Exceeded)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) when their share is used up.

This relies on having a fair load balancer since it assumes a well distributed load between all the gateways.

The DRL implements a token bucket algorithm. In this case if the request rate is higher than the rate limit it will attempt to let through requests at the specified rate limit. It's important to note that this is the only rate limit method that uses this algorithm and that it will yield approximate results.

### Redis Rate Limiter

The Redis Rate Limiter implements a sliding log:

- Using Redis lets any gateways respect a cluster-wide rate limit
- Each request gets written into a sliding log in redis, including blocked requests
- The log is always trimmed to the duration of the defined window

An important behaviour of this rate limiting method is that it blocks
access to the API when the rate exceeds the rate limit and does not let
further API calls through until the rate drops below the specified rate
limit. For example, if the rate limit is 3000/minute the call rate would
have to be reduced below 3000 for a whole minute before the HTTP 429
responses stop and normal traffic resumes.

This behaviour is called spike arrest. As the complete request log is
stored in Redis, resource usage when using this rate limiter is high.
Even during traffic blocking, redis will use significant resources to
maintain the request log, mostly impacting CPU usage. Redis resource
usage increases with traffic, and shorter `per` values are recommended to
limit the amount of data being stored in redis.

This algorithm can be enabled using the following configuration option [enable_redis_rolling_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_redis_rolling_limiter" >}}).

Please see the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) if you don't want spike arrest behaviour.

##### Redis Sentinel Rate Limiter

The Redis Sentinel Rate Limiter option will enable:

- Writing a sentinel key into redis when the request limit is reached
- Using the sentinel key to block requests immediately for `per` duration
- Each request for the sliding log is written in background, including blocked requests

This optimizes the latency for connecting clients, as they don't have to
wait for the sliding log write to complete. The behaviour still has spike
arrest behaviour, however recovery may take longer as the blocking is in
effect for a minimum of the configured `per` duration.

The option will increase Gateway and Redis resource usage, as another key
is maintained, more redis commands are issued for every request, and the
sliding log is written in a background routine. The option provides
better performance for clients as a trade-off.

This option can be enabled using the following configuration option
[enable_sentinel_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_sentinel_rate_limiter" >}}).

To optimize performance, you may configure your rate limits with shorter
window duration values (`per`), as that will cause Redis to hold less
data at any given moment.

Performance can be improved by enabling the [enable_non_transactional_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_non_transactional_rate_limiter" >}}). This leverages Redis Pipelining to enhance the performance of the Redis operations. Here are the [Redis documentation](https://redis.io/docs/manual/pipelining/) for more information.

Please see the [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}) as an alternative, if Redis performance is an issue.

##### DRL Threshold

It's possible to switch between the DRL behaviour and the Redis Rate
Limit behaviour with configuration. Tyk switches between these two modes
using the `drl_threshold` configuration. If the effective rate is more
than the configured value (per gateway), then DRL is used. If it's below
the configured value, then the Redis Rate Limiter is used.

This is suitable for hard-syncing rate limits for lower thresholds, for
example for higher latency APIs, and using the more performant Rate
Limiter for the low latency / higher traffic APIs.

See configuration for [DRL Threshold]({{< ref "/tyk-oss-gateway/configuration.md#drl_threshold" >}}) on how to configure it.

### Fixed Window Rate Limiter

The Fixed Window Rate Limiter will limit the number of requests in a
particular window in time. Once the defined rate limit has been reached,
the requests will be blocked for the remainder of the configured window
duration. After the window expires, the counters restart and again allow
requests through.

- The implementation uses a single counter value in Redis
- The counter expires every configured `per` duration.

The implementation does not handle traffic busts within a window. For any
given `rate` in a window, the requests are processed without delay, until
the rate limit is reached and requests blocked for the remainder of the
window.

When using this option, resource usage for rate limiting does not
increase with traffic. A simple counter with expiry is created for every
window, and removed when the window elapses. Regardless of the traffic
received, Redis is not impacted in a negative way, resource usage remains
constant.

This algorithm can be enabled using the following configuration option [enable_fixed_window_rate_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_fixed_window_rate_limiter" >}}).

If you need spike arrest behaviour, the [Redis Rate Limiter]({{< ref "#redis-rate-limiter" >}}) should be used.

## Rate limiting levels

Tyk has two approaches to rate limiting:

### Key-level rate limiting

Key-level rate limiting is more focused on controlling traffic from individual sources and making sure that users are staying within their prescribed limits. This approach to rate limiting allows you to configure a policy to rate limit in two possible ways: limiting the rate of calls the user of a key can make to all available APIs, another form of global rate limiting just from one specific user, and limiting the rate of calls to specific individual APIs, also known as a “per API rate limit”.

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
