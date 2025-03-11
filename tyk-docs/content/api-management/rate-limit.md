---
title: "Rate Limiting"
date: 2025-01-10
tags: ["Rate Limit", "Rate Limiting", "Rate Limit Algorithms", "Distributed Rate Limiter", "Redis Rate Limiter", "Fixed Window", "Spike Arrest", "Rate Limit Scope", "Local", "Local rate Limits", "Request Throttling", "Quotas", "Tyk Classic", "Tyk Classic API", "Tyk OAS", "Tyk OAS API", "Rate Limiting", "Global limits", "Per API limits", "Request Throttling", "Request Quotas"]
description: Overview of Rate Limiting with the Tyk Gateway
keywords: ["Rate Limit", "Rate Limiting", "Rate Limit Algorithms", "Distributed Rate Limiter", "Redis Rate Limiter", "Fixed Window", "Spike Arrest", "Rate Limit Scope", "Local", "Local rate Limits", "Request Throttling", "Quotas", "Tyk Classic", "Tyk Classic API", "Tyk OAS", "Tyk OAS API", "Rate Limiting", "Global limits", "Per API limits", "Request Throttling", "Request Quotas"]
aliases:
  - /control-limit-traffic/request-quotas
  - /control-limit-traffic/rate-limiting
  - /basic-config-and-security/control-limit-traffic
  - /getting-started/key-concepts/rate-limiting
  - /basic-config-and-security/control-limit-traffic/rate-limiting
  - /product-stack/tyk-gateway/middleware/endpoint-rate-limit-oas
  - /product-stack/tyk-gateway/middleware/endpoint-rate-limit-classic
  - /basic-config-and-security/control-limit-traffic/request-quotas
  - /basic-config-and-security/control-limit-traffic/request-throttling
  - /product-stack/tyk-streaming/configuration/rate-limits/overview
  - /product-stack/tyk-streaming/configuration/rate-limits/local
---

## Introduction

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
 
These guides include explanation of how to configure key-level rate limits when using [API Keys]({{< ref "api-management/gateway-config-managing-classic#access-an-api" >}}) and [Security Policies]({{< ref "api-management/gateway-config-managing-classic#secure-an-api" >}}).

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
[enable_sentinel_rate_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_sentinel_rate_limiter" >}}).

To optimize performance, you may configure your rate limits with shorter
window duration values (`per`), as that will cause Redis to hold less
data at any given moment.

Performance can be improved by enabling the [enable_non_transactional_rate_limiter]({{< ref "tyk-oss-gateway/configuration.md#enable_non_transactional_rate_limiter" >}}). This leverages Redis Pipelining to enhance the performance of the Redis operations. Please consult the [Redis documentation](https://redis.io/docs/manual/pipelining/) for more information.

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

See [DRL Threshold]({{< ref "tyk-oss-gateway/configuration.md#drl_threshold" >}}) for details on how to configure this feature.


## Rate Limiting Layers

You can protect your upstream services from being flooded with requests by configuring rate limiting in Tyk Gateway. Rate limits in Tyk are configured using two parameters: allow `rate` requests in any `per` time period (given in seconds).

As explained in the [Rate Limiting Concepts]({{< ref "api-management/rate-limit#introduction" >}}) section, Tyk supports configuration of rate limits at both the API-Level and Key-Level for different use cases.

The API-Level rate limit takes precedence over Key-Level, if both are configured for a given API, since this is intended to protect your upstream service from becoming overloaded. The Key-Level rate limits provide more granular control for managing access by your API clients.

### Configuring the rate limiter at the API-Level

If you want to protect your service with an absolute limit on the rate of requests, you can configure an API-level rate limit. You can do this from the API Designer in Tyk Dashboard as follows:

1. Navigate to the API for which you want to set the rate limit
2. From the **Core Settings** tab, navigate to the **Rate Limiting and Quotas** section
3. Ensure that **Disable rate limiting** is not selected
4. Enter in your **Rate** and **Per (seconds)** values
5. **Save/Update** your changes

Tyk will now accept a maximum of **Rate** requests in any **Per** period to the API and will reject further requests with an `HTTP 429 Too Many Requests` error.

Check out the following video to see this being done.

{{< youtube ETI7nOd3DNc >}}

### Configuring the rate limiter at the Key-Level

If you want to restrict an API client to a certain rate of requests to your APIs, you can configure a Key-Level rate limit via a [Security Policy]({{< ref "api-management/policies" >}}). The allowance that you configure in the policy will be consumed by any requests made to APIs using a key generated from the policy. Thus, if a policy grants access to three APIs with `rate=15 per=60` then a client using a key generated from that policy will be able to make a total of 15 requests - to any combination of those APIs - in any 60 second period before receiving the `HTTP 429 Too Many Requests` error. 

{{< note success >}}
**Note**  

It is assumed that the APIs being protected with a rate limit are using the [auth token]({{< ref "api-management/client-authentication#use-auth-tokens" >}}) client authentication method and policies have already been created.
{{< /note >}}

You can configure this rate limit from the API Designer in Tyk Dashboard as follows:

1. Navigate to the Tyk policy for which you want to set the rate limit
2. Ensure that API(s) that you want to apply rate limits to are selected
3. Under **Global Limits and Quota**, make sure that **Disable rate limiting** is not selected and enter your **Rate** and **Per (seconds)** values
4. **Save/Update** the policy

### Setting up a Key-Level Per-API rate limit

If you want to restrict API clients to a certain rate of requests for a specific API you will also configure the rate limiter via the security policy. However this time you'll assign per-API limits. The allowance that you configure in the policy will be consumed by any requests made to that specific API using a key generated from that policy. Thus, if a policy grants access to an API with `rate=5 per=60` then three clients using keys generated from that policy will each independently be able to make 5 requests in any 60 second period before receiving the `HTTP 429 Too Many Requests` error. 

{{< note success >}}
**Note**  

It is assumed that the APIs being protected with a rate limit are using the [auth token]({{< ref "api-management/client-authentication#use-auth-tokens" >}}) client authentication method and policies have already been created.
{{< /note >}}

You can configure this rate limit from the API Designer in Tyk Dashboard as follows:

1. Navigate to the Tyk policy for which you want to set the rate limit
2. Ensure that API that you want to apply rate limits to is selected
3. Under **API Access**, turn on **Set per API Limits and Quota**
4. You may be prompted with "Are you sure you want to disable partitioning for this policy?". Click **CONFIRM** to proceed
5. Under **Rate Limiting**, make sure that **Disable rate limiting** is not selected and enter your **Rate** and **Per (seconds)** values
6. **Save/Update** the policy

Check out the following video to see this being done.

{{< youtube n7jbmuWgPsw >}}

### Setting up a key-level per-endpoint rate limit

To restrict the request rate for specific API clients on particular endpoints, you can use the security policy to assign per-endpoint rate limits. These limits are set within the policy and will be #enforced for any requests made to that endpoint by clients using keys generated from that policy.

Each key will have its own independent rate limit allowance. For example, if a policy grants access to an endpoint with a rate limit of 5 requests per 60 seconds, each client with a key from that policy can make 5 requests to the endpoint in any 60-second period. Once the limit is reached, the client will receive an HTTP `429 Too Many Requests` error.

If no per-endpoint rate limit is defined, the endpoint will inherit the key-level per-API rate limit or the global rate limit, depending on what is configured.

{{< note success >}}
**Note**  
The following assumptions are made:
 - The [ignore authentication]({{< ref "api-management/traffic-transformation#ignore-authentication-overview" >}}) middleware should not be enabled for the relevant endpoints.
 - If [path-based permissions]({{< ref "api-management/gateway-config-managing-classic#path-based-permissions" >}}) are configured, they must grant access to these endpoints for keys generated from the policies.
{{< /note >}}

You can configure per-endpoint rate limits from the API Designer in Tyk Dashboard as follows:

1. Navigate to the Tyk policy for which you want to set the rate limit
2. Ensure that API that you want to apply rate limits to is selected
3. Under **API Access** -> **Set endpoint-level usage limits** click on **Add Rate Limit** to configure the rate limit. You will need to provide the rate limit and the endpoint path and method.
4. **Save/Update** the policy


### Setting Rate Limits in the Tyk Community Edition Gateway (CE)

#### Configuring the rate limiter at the (Global) API-Level

Using the `global_rate_limit` field in the API definition you can specify the API-level rate limit in the following format: `{"rate": 10, "per": 60}`.

An equivalent example using Tyk Operator is given below:

```yaml {linenos=table,hl_lines=["14-17"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-rate-limit
spec:
  name: httpbin-global-rate-limit
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  # setting a global rate-limit for the API of 10 requests per 60 seconds
  global_rate_limit:
    rate: 10
    per: 60
```

### Configuring the rate limiter on the session object

All actions on the session object must be done via the Gateway API.

1. Ensure that `allowance` and `rate` are set to the same value: this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.

2. Ensure that `per` is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 requests per 5 seconds, set this value to 5.

#### Can I disable the rate limiter?

Yes, the rate limiter can be disabled for an API Definition by selecting **Disable Rate Limits** in the API Designer, or by setting the value of `disable_rate_limit` to `true` in your API definition.

Alternatively, you could also set the values of `Rate` and `Per (Seconds)` to be 0 in the API Designer.

{{< note success >}}
**Note**  

Disabling the rate limiter at the API-Level does not disable rate limiting at the Key-Level. Tyk will enforce the Key-Level rate limit even if the API-Level limit is not set.
{{< /note >}}

#### Can I set rate limits by IP address?

Not yet, though IP-based rate limiting is possible using custom pre-processor middleware JavaScript that generates tokens based on IP addresses. See our [Middleware Scripting Guide]({{< ref "api-management/plugins/javascript#using-javascript-with-tyk" >}}) for more details.

## Rate Limiting by API

### Tyk Classic API Definition

The per-endpoint rate limit middleware allows you to enforce rate limits on specific endpoints. This middleware is configured in the Tyk Classic API Definition, either via the Tyk Dashboard API or in the API Designer.

To enable the middleware, add a new `rate_limit` object to the `extended_paths` section of your API definition.

The `rate_limit` object has the following configuration:

- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `enabled`: boolean to enable or disable the rate limit
- `rate`: the maximum number of requests that will be permitted during the interval (window)
- `per`: the length of the interval (window) in seconds

You can set different rate limits for various endpoints by specifying multiple `rate_limit` objects.

#### Simple endpoint rate limit

For example:

```json  {linenos=true, linenostart=1}
{
    "use_extended_paths": true,
    "extended_paths": {
        "rate_limit": [
            {
                "path": "/anything",
                "method": "GET",
                "enabled": true,
                "rate": 60,
                "per": 1
            }
        ]
    }
}
```

In this example, the rate limit middleware has been configured for HTTP
`GET` requests to the `/anything` endpoint, limiting requests to 60 per
second.

#### Advanced endpoint rate limit

For more complex scenarios, you can configure rate limits for multiple
paths. The order of evaluation matches the order defined in the
`rate_limit` array. For example, if you wanted to limit the rate of
`POST` requests to your API allowing a higher rate to one specific
endpoint you could configure the API definition as follows: 

```json  {linenos=true, linenostart=1}
{
    "use_extended_paths": true,
    "extended_paths": {
        "rate_limit": [
            {
                "path": "/user/login",
                "method": "POST",
                "enabled": true,
                "rate": 100,
                "per": 1
            },
            {
                "path": "/.*",
                "method": "POST",
                "enabled": true,
                "rate": 60,
                "per": 1
            }
        ]
    }
}
```

In this example, the first rule limits `POST` requests to `/user/login`
to 100 requests per second (rps). Any other `POST` request matching the
regex pattern `/.*` will be limited to 60 requests per second. The order
of evaluation ensures that the specific `/user/login` endpoint is matched
and evaluated before the regex pattern.

The per-endpoint rate limit middleware allows you to enforce rate limits on specific endpoints. This middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}), either via the Tyk Dashboard API or in the API Designer.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/rate-limit#tyk-classic-api-definition" >}}) page.

### Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the
`operationId` defined in the OpenAPI Document that declares both the path
and method for which the middleware should be added. Endpoint `paths`
entries (and the associated `operationId`) can contain wildcards in the
form of any string bracketed by curly braces, for example
`/status/{code}`. These wildcards are so they are human-readable and do
not translate to variable names. Under the hood, a wildcard translates to
the “match everything” regex of: `(.*)`.

The rate limit middleware (`rateLimit`) can be added to the `operations` section of the
Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition
for the appropriate `operationId` (as configured in the `paths` section
of your OpenAPI Document).

The `rateLimit` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `rate`: the maximum number of requests that will be permitted during the interval (window)
- `per`: the length of the interval (window) in time duration notation (e.g. 10s)

#### Simple endpoint rate limit

For example:

```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-rate-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-rate-limit",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-rate-limit/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 60,
                        "per": "1s"
                    }
                }
            }
        }
    }
}
```

In this example, a rate limit has been configured for the `GET
/status/200` endpoint, limiting requests to 60 per second.

The configuration above is a complete and valid Tyk OAS API Definition
that you can import into Tyk to try out the Per-endpoint Rate Limiter
middleware.

#### Advanced endpoint rate limit

For more complex scenarios, you can configure rate limits for multiple
paths. The order of evaluation matches the order that endpoints are
defined in the `paths` section of the OpenAPI description. For example,
if you wanted to limit the rate of `POST` requests to your API allowing a
higher rate to one specific endpoint you could configure the API
definition as follows: 

```json {hl_lines=["49-53", "56-60"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "advanced-rate-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/user/login": {
            "post": {
                "operationId": "user/loginpost",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/{any}": {
            "post": {
                "operationId": "anypost",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "advanced-rate-limit",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/advanced-rate-limit/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "user/loginpost": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 100,
                        "per": "1s"
                    }
                },
                "anypost": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 60,
                        "per": "1s"
                    }
                }
            }
        }
    }
}
```

In this example, the first rule limits requests to the `POST /user/login`
endpoint to 100 requests per second (rps). Any other `POST` request to an
endpoint path that matches the regex pattern `/{any}` will be limited to
60 rps. The order of evaluation ensures that the specific `POST
/user/login` endpoint is matched and evaluated before the regex pattern.

The configuration above is a complete and valid Tyk OAS API Definition
that you can import into Tyk to try out the Per-endpoint Rate Limiter
middleware.

### Configuring the middleware in the API Designer

Configuring per-endpoint rate limits for your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Rate Limit middleware**

    Select **ADD MIDDLEWARE** and choose **Rate Limit** from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-rate-limit.png" alt="Adding the Rate Limit middleware" >}}

3. **Configure the middleware**

    You must provide the path to the compiled plugin and the name of the Go function that should be invoked by Tyk Gateway when the middleware is triggered.

    {{< img src="/img/dashboard/api-designer/tyk-oas-rate-limit-config.png" alt="Configuring the per-endpoint custom plugin" >}}

4. **Save the API**

    Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

## Rate Limiting with Tyk Streams

A rate limit is a strategy for limiting the usage of a shared resource across parallel components in a Tyk Streams instance, or potentially across multiple instances. They are configured as a resource:

```yaml
rate_limit_resources:
  - label: foobar
    local:
      count: 500
      interval: 1s
```

And most components that hit external services have a field `rate_limit` for specifying a rate limit resource to use. For example, if we wanted to use our `foobar` rate limit with a HTTP request:

```yaml
input:
  http_client:
    url: TODO
    verb: GET
    rate_limit: foobar
```

By using a rate limit in this way we can guarantee that our input will only poll our HTTP source at the rate of 500 requests per second.

<!-- TODO: when rate-limit processor supported:
Some components don't have a `rate_limit` field but we might still wish to throttle them by a rate limit, in which case we can use the rate_limit processor that applies back pressure to a processing pipeline when the limit is reached. For example:

```yaml
input:
  http_server:
    path: /post
output:
  http_server:
    ws_path: /subscribe
pipeline:
  processors:
    - rate_limit:
        resource: example_rate_limit
rate_limit_resources:
  - label: example_rate_limit
    local:
      count: 3
      interval: 20s
```
-->


### Local

The local rate limit is a simple X every Y type rate limit that can be shared across any number of components within the pipeline but does not support distributed rate limits across multiple running instances of Tyk Streams.

```yml
# Config fields, showing default values
label: ""
local:
  count: 1000
  interval: 1s
```

**Configuration Fields**

**count**

The maximum number of requests to allow for a given period of time.


Type: `int`  
Default: `1000`  

**interval**

The time window to limit requests by.


Type: `string`  
Default: `"1s"`  

## Request Quotas

A quota is similar to a rate limit, as it allows a certain number of requests through in a time period. However traditionally these periods are much longer, For example, if you would like to have a user only have 10,000 requests to the API per month, you can create a key that has no rate limiting but will disallow access once the quota is empty. Tyk will automatically reset the quota if the time limit on reset has been exceeded.

### How do Quotas Work?

Quotas in Tyk use a decrementing counter in the token's session object to measure when to block inbound requests.

### How do Quotas Renew?

In Tyk, most things are event-driven, the same goes for quotas. Since all quotas have a reset time limit, they do not "reset" on a specific date (e.g. 1st of the month), instead they "reset" on or after a date has passed, and only when the key is actively being used. This means that the period can "move" if the token is only partially active.

### Why is the Quota System Like This?

In a system with 1,000,000 tokens, managing timers to watch and monitor each token is extremely expensive and inefficient. So in order to keep quotas sane and not clutter up the DB with unnecessary timers, quotas are event-driven.

It is possible to have monthly quotas that set on a specific date, using the Tyk Gateway API it is possible to reset known token quotas periodically using an external timer.

### Can I Disable Quotas?

Yes you can - to disable the quota middleware in an API definition, select the **Disable Quotas** option in the API designer, or set the value of `disable_quota` to `true` in your API Definition.

### Set a Quota with the Dashboard

1.  Add a Key from the **System Management > Keys** menu.

2.  Ensure the new key has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Choose API**. Turn the **Set per API Limits and Quota** options on.

3.  From the **Usage Quotas** section, set the **Max Requests per period** - this is the maximum number of requests that are allowed to pass through the proxy during the period.

4.  Set the **Quota resets every** drop down to the period you would like the quota to be active for. If the pre-sets do not meet your requirements, the quota period can be set using the session object method and the REST API.

5.  The **Remaining requests for period** field displays how many more times the API can be requested for the quota set.
    
{{< img src="/img/2.10/api_rate_limits_keys.png" alt="Tyk API Gateway Quotas" >}}

1.  Save the token, it will be created instantly.

### Set a Quota with the Session Object

In order to set a quota for a token:

1. Ensure that `quota_max` is set to the maximum amount of requests that a user is allowed to make in a time period.
2. Ensure `quota_remaining` is set to the same value as `quota_max`, this is the value that will decrement on each request (failed or successful).
3. Set the `quota_renewal_rate` to the value, in seconds, of when the quota should renew. For example, if you would like it to renew every 30 days, you would have `2592000` seconds `(((60*60) * 24) * 30 = 2592000)`.

{{< note success >}}
**Note**  

To set an unlimited quota, set `quota_max` to `-1`.
{{< /note >}}

[1]: /img/dashboard/system-management/usage_quotas_2.5.png

## Request Throttling

### Controlling and Limiting Traffic

Tyk supports controlling and limiting traffic for throttling and spike arrest use cases. Spike arrest sets a limit on the number of requests that can be processed within a specified time interval. If the incoming request rate exceeds this limit, then excess requests are throttled to ensure availability of the API server. 

From v2.8, when hitting quota or rate limits, the Gateway can automatically queue and auto-retry client requests. 

Throttling can be configured at a *key* or *policy* level via the following two fields: 

1. `throttle_interval`: Interval (in seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.


#### Can I disable Request Throttling?

Yes, you can. If you set `throttle_interval` and `throttle_retry_limit` values to smaller than `0`, the feature will not work. The default value is `-1` and means it is disabled by default.    

### Set Request Throttling with the Dashboard

1.  At the key level: From **System Management** > **Keys** > **Add Key** or open an existing key.
    Or
    At the policy level: From **System Management** > **Policies** > **Add Policy** or open an existing policy.
    
2.  Ensure the new key or policy has access to the APIs you wish it work with by selecting the API from **Access Rights** > **Add Access Rule** and click **Add**.

3.  From the **Throttling** section, select the **Throttle interval** and the **Throttle retry limit** values.
    
{{< img src="/img/dashboard/system-management/throttling_update.png" alt="Tyk API Gateway Throttling" >}}

4.  Save the token/policy.

### Set Request Throttling in the object

Get the policy object with `GET /api/portal/policies/` or the key's session object via `GET /api/apis/{API-ID}/keys/` and then  set two fields, `throttle_interval` and `throttle_retry_limit` in the object and create a new object or update the exsiting one.

