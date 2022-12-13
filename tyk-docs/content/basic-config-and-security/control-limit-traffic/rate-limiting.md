---
date: 2017-03-23T17:08:35Z
title: Rate Limiting
tags: ["Rate Limiting", "Global limits", "Per API limits"]
description: "How to use Global and per API rate limit throttling in Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 1 
aliases:
  - /control-limit-traffic/rate-limiting/
---

## Rate Limiting Overview

Also known as throttling, Tyk API will actively only allow a key to make `x` requests per `y` time period. This is very useful if you want to ensure your API does not get flooded with requests. See [Rate Limiting Concepts]({{< ref "getting-started/key-concepts/rate-limiting/" >}}) for more information.


## Setting up an API-Level Global Rate Limit

Adding an API-level global rate limit is what requires the least amount of effort and can be done as soon as you’ve created the API in Tyk. To apply a global rate limit you simply need to:

1. Navigate to the API you want to set the global rate limit on
2. From the **Core Settings** tab, navigate to the **Rate Limiting and Quotas** section
3. Ensure that **Disable rate limiting** is not selected
4. Enter in your **Rate** and **Per (seconds)** values
5. **Save/Update** your changes

Check out the following video to see this being done.

{{< youtube ETI7nOd3DNc >}}

## Setting up a Key-Level Global Rate Limit

{{< note success >}}
**Note**  

 It is assumed that the APIs being protected with a rate limit are using our [Authentication token]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens/" >}}) Authentication mode and have policies already created
{{< /note >}}

1. Navigate to the Tyk policy that you want to enforce rate limiting on
2. Ensure that API(s) that you want to apply rate limits to are selected
3. Under **Global Limits and Quota**, make sure that **Disable rate limiting** is not selected and enter your **Rate** and **Per (seconds)** values
4. **Save/Update** the policy

## Setting up a Key-Level Per-API Rate Limit

{{< note success >}}
**Note**  

 It is assumed that the APIs being protected with a rate limit are using our [Authentication token]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens/" >}}) Authentication mode and have policies already created
{{< /note >}}

1. Navigate to the Tyk policy that you want to enforce rate limiting on
2. Ensure that API(s) that you want to apply rate limits to are selected
3. Under **API Access**, turn on **Set per API Limits and Quota**
4. You may be prompted with "Are you sure you want to disable partitioning for this policy?". Click **CONFIRM** to proceed.
5. Under **Rate Limiting**, make sure that **Disable rate limiting** is not selected and enter your **Rate** and **Per (seconds)** values
6. **Save/Update** the policy

Check out the following video to see this being done.

{{< youtube n7jbmuWgPsw >}}

## Setting Rate Limits in the Tyk Community Edition Gateway (CE)

### Global Rate Limits

Using `global_rate_limit` API definition field you can specifies a global API rate limit in the following format: `{"rate": 10, "per": 60}` similar to policies or keys.

## Set a rate limit on the session object (API)

All actions on the session object must be done via the Gateway API.

1. Ensure that `allowance` and `rate` are set to the same value, this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.

2. Ensure that `per` is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 per 5 seconds, set this value to 5 etc.

### Can I disable the rate limiter?

Yes, the rate limiter can be disabled for an API Definition by checking **Disable Rate Limits** in your API Designer, or by setting the value of `disable_rate_limit` to `true` in your API definition.

Alternatively, you could also set the values of `Rate` and `Per (Seconds)` to be 0 in the API Designer.

{{< note success >}}
**Note**  

Disabling the rate limiter at the global level does not disable the rate limiting at the key level.  Tyk will enforce the rate limit at the key level regardless of this setting.
{{< /note >}}

### Can I set rate limits by IP address?

Not yet, though IP-based rate limiting is possible using custom pre-processor middleware JavaScript that generates tokens based on IP addresses. See our [Middleware Scripting Guide]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide/" >}}) for more details.
