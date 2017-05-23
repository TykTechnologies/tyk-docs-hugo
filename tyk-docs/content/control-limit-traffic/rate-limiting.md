---
date: 2017-03-23T17:08:35Z
title: Rate Limiting
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 1 
---

## <a name="rate-limiting-overview"></a>Rate Limiting Overview

Also known as throttling, Tyk API will actively only allow a key to make `x` requests per `y` time period. This is very useful if you want to ensure your API does not get flooded with requests.

### How do rate limits work?

There are two rate limiters in Tyk as of v2.3: The hard-synchronised rate limiter (the rate limiter used in v2.2) and the distributed rate limiter (also referred to as the DRL in future). Both rate limiters come with different benefits and trade-offs, and in v2.3 we have opted to make the DRL the default rate limiter.

### Hard-synchronised rate limiter

Here the limit is enforced using a pseudo "leaky bucket" mechanism: Tyk will record each request in a timestamped list in Redis, at the same time it will count the number of requests that fall between the current time, and the maximum time in the past that encompasses the rate limit (and remove these from the list). If this count exceeds the number of requests over the period, the request is blocked.

This approach means that rate limits are applied across all Gateway instances equally and near-instantaneously and also that the actual limit is a "moving window" so that there is no fixed point in time to flood the limiter or execute more requests than is permitted by any one client.

The downside of this rate limiter is that it puts a high amount of traffic to and from Redis, which can cause Redis itself to become a bottleneck in high-traffic situations.

### Distributed Rate Limiter (DRL)

The distributed rate limiter operates on an eventual-consistency basis, it too is a "leaky bucket" algorithm, but the rate limiter is not synchronised explicitly via Redis across all instances. Instead, the rate limiter is entirely in-memory to the instance servicing the request, and the "size" of the token value is determined by a quorum established between Tyk instances that share a common zone or tag group.

This approach means that Tyk will continually measure load on each instance that is running, and then use the load across all instances to calculate a value by which to normalise the rate limiter leaky buckets across all instances - this happens eventually (within a second or so) and is entirely dynamic. If a new instance joins the cluster, or an instance leaves the cluster, the token bucket value is recalculated and rate limits rebalance.

The benefit of this approach is scalability and speed - the DRL is much more performant and puts much less pressure on Redis, meaning smaller deployments and higher availability.

### Can I disable the rate limiter?

Yes, the rate limiter can be disabled for an API Definition by checking **Disable Rate Limits** in your API Designer, or by setting the value of `disable_rate_limit` to `true` in your API definition.

### Can I rate limit by IP address?

Not yet, though IP-based rate limiting is possible using custom pre-processor middleware JavaScript that generates tokens based on IP addresses.

## <a name="with-dashboard"></a> Set a rate limit with the Dashboard

1.  Visit the key creation screen by browsing to "System Management" -> "Keys" -> "Add Key".

2.  Ensure the new key has access to the APIs you wish it work with by selecting the API from the "Access Rights" -> "Add Access Rule" and clicking the "add" button.

3.  Under the "Rate Limit" section of the page, select the rate (number of requests) and the "per" period. If the period is not available in the drop down, you can set it to a custom value using the Dashboard REST API.
    
![Tyk API Gateway Rate Limits][1]

4.  Save the token, it will be created instantly.

## <a name="rate-limit-using-session-object"></a> Set a rate limit on the session object (API)

All actions on the session object must be done via the Dashboard or Gateway REST API.

1. Ensure that allowance and rate are set to the same value, this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.

2. Ensure that per is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 per 5 seconds, set this value to 5 etc.



 [1]: /docs/img/dashboard/system-management/rateLimit.png

