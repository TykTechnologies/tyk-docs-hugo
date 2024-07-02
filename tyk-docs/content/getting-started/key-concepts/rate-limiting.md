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

<<<<<<< HEAD
Rate limits are calculated in Requests Per Second (RPS). For example, let’s say a developer only wants to allow a client to call the API a maximum of 10 times per minute. In this case the developer would apply a rate limit to their API expressed as "10 requests per 60 seconds". This means that the client will be able to successfully call the API up to 10 times within any 60 second interval and after that the user will get an error stating their rate limit has been exceeded if they call it an 11th time within that time frame.
=======
## When might you want to use rate limiting?

Rate limiting may be used as an extra line of defence around attempted denial of service attacks. For instance, if you have load-tested your current system and established a performance threshold that you would not want to exceed to ensure system availability and/or performance then you may want to set a global rate limit as a defence to ensure it hasn't exceeded.

Rate limiting can also be used to ensure that one particular user or system accessing the API is not exceeding a determined rate. This makes sense in a scenario such as APIs which are associated with a monetisation scheme where you may allow so many requests per second based on the tier in which that consumer is subscribed or paying for.

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
 
These guides include explanation of how to configure key-level rate limits when using [API Keys]({{< ref "getting-started/create-api-key" >}}) and [Security Policies]({{< ref "getting-started/create-security-policy" >}}).

#### Which scope should I use?

The simplest way to figure out which level of rate limiting you’d like to apply can be determined by asking a few questions:

- do you want to protect your service against denial of service attacks or overwhelming amounts of traffic from **all users** of the API? **You’ll want to use an API-level rate limit!**
- do you want to limit the number of requests a specific user can make to **all APIs** they have access to? **You’ll want to use a key-level global rate limit!**
- do you want to limit the number of requests a specific user can make to **specific APIs** they have access to? **You’ll want to use a key-level per-API rate limit.**

### Applying multiple rate limits

When multiple rate limits are configured, they are assessed in this order (if applied):

1. API-level global rate limit
2. Key-level global rate limit
3. Key-level per-API rate limit

## Rate limiting algorithms

Different rate limiting algorithms are employed to cater to varying requirements, use cases and gateway deployments. A one-size-fits-all approach may not be suitable, as APIs can have diverse traffic patterns, resource constraints, and service level objectives. Some algorithms are more suited to protecting the upstream service from overload whilst others are suitable for per-client limiting to manage and control fair access to a shared resource.

Tyk offers the following rate limiting algorithms:

1. [Distributed Rate Limiter]({{< ref "#distributed-rate-limiter" >}}): recommended for most use cases, implements the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket)
2. [Redis Rate Limiter]({{< ref "#redis-rate-limiter" >}}): implements the [sliding window log algorithm](https://developer.redis.com/develop/dotnet/aspnetcore/rate-limiting/sliding-window)
3. [Fixed Window Rate Limiter]({{< ref "#fixed-window-rate-limiter" >}}): implements the [fixed window algorithm](https://redis.io/learn/develop/dotnet/aspnetcore/rate-limiting/fixed-window)
>>>>>>> 2c00eb4af... [DX-1437] authorise --> authorize (#4941)

## Types Of Rate Limiting

Tyk offers the following rate limiting algorithms to protect your APIs:

1. Distributed Rate Limiter. Most performant, not 100% accurate. Recommended for most use cases. Implements the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket).
2. Redis Rate Limiter. Less performant, 100% perfect accuracy. Implements the [sliding window log algorithm](https://developer.redis.com/develop/dotnet/aspnetcore/rate-limiting/sliding-window/).

### Distributed Rate Limiter (DRL)

This is the default rate limiter in Tyk. It is the most performant but has a trade-off that the limit applied is approximate, not exact. To use a less performant, exact rate limiter, review the Redis rate limiter below.

The Distributed Rate Limiter will be used automatically unless one of the other rate limit algorithms are explicitly enabled via configuration.

With the DRL, the configured rate limit is split (distributed) evenly across all the gateways in the cluster (a cluster of gateway shares the same Redis). These gateways store the running rate in memory and return [429 (Rate Limit Exceeded)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) when their share is used up.

This relies on having a fair load balancer since it assumes a well distributed load between all the gateways.

The DRL implements a token bucket algorithm. In this case if the request rate is higher than the rate limit it will attempt to let through requests at the specified rate limit. It's important to note that this is the only rate limit method that uses this algorithm and that it will yield approximate results.

### Redis Rate Limiter

This uses Redis to track and limit the rate of incoming API calls. An important behaviour of this method is that it blocks access to the API when the rate exceeds the rate limit and does not let further API calls through until the rate drops below the specified rate limit. For example, if the rate limit is 3000/minute the call rate would have to be reduced below 3000 for a whole minute before the HTTP 429 responses stop.
For example, you can slow your connection throughput to regain entry into your rate limit. This is more of a “throttle” than a “block”.

This algorithm can be managed using the following configuration option [enable_redis_rolling_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_redis_rolling_limiter" >}}).

##### Redis Sentinel Rate Limiter

As explained above, when using the Redis rate limiter, when a throttling action is triggered, requests are required to cool-down for the period of the rate limit.

The default behaviour with the Redis rate limiter is that the rate-limit calculations are performed on-thread.

The optional Redis Sentinel rate limiter delivers a smoother performance curve as rate-limit calculations happen off-thread, with a stricter time-out based cool-down for clients. 

This option can be enabled using the following configuration option [enable_sentinel_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_sentinel_rate_limiter" >}}).

##### Performance

The Redis limiter is indeed slower than the DRL, but that performance can be improved by enabling the [enable_non_transactional_rate_limiter]({{< ref "/tyk-oss-gateway/configuration.md#enable_non_transactional_rate_limiter" >}}). This leverages Redis Pipelining to enhance the performance of the Redis operations. Here are the [Redis documentation](https://redis.io/docs/manual/pipelining/) for more information.

##### DRL Threshold

`TYK_GW_DRLTHRESHOLD`

Optionally, you can use both rate limit options simultaneously. This is suitable for hard-syncing rate limits for lower thresholds, ie for more expensive APIs, and using the more performant Rate Limiter for the higher traffic APIs.

Tyk switches between these two modes using the `drl_threshold`. If the rate limit is more than the drl_threshold (per gateway) then the DRL is used. If it's below the DRL threshold the redis rate limiter is used.

Read more [about DRL Threshold here]({{< ref "/tyk-oss-gateway/configuration.md#drl_threshold" >}})

The Redis rate limiter provides 100% accuracy, however instead of using the token bucket algorithm it uses the sliding window log algorithm. This means that if there is a user who abuses the rate limit, this user's requests will be limited until they start respecting the rate limit. In other words, requests that return 429 will count towards their rate limit counter.

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
