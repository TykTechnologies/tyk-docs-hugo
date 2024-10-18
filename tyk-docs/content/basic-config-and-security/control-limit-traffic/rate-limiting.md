---
date: 2017-03-23T17:08:35Z
title: Rate Limiting
tags: ["Rate Limiting", "Global limits", "Per API limits"]
description: "How to use request rate limiting with Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 1 
aliases:
  - /control-limit-traffic/rate-limiting/
---

## Rate Limiting Overview

You can protect your upstream services from being flooded with requests by configuring rate limiting in Tyk Gateway. Rate limits in Tyk are configured using two parameters: allow `rate` requests in any `per` time period (given in seconds).

As explained in the [Rate Limiting Concepts]({{< ref "getting-started/key-concepts/rate-limiting" >}}) section, Tyk supports configuration of rate limits at both the API-Level and Key-Level for different use cases.

The API-Level rate limit takes precedence over Key-Level, if both are configured for a given API, since this is intended to protect your upstream service from becoming overloaded. The Key-Level rate limits provide more granular control for managing access by your API clients.

## Configuring the rate limiter at the API-Level

If you want to protect your service with an absolute limit on the rate of requests, you can configure an API-level rate limit. You can do this from the API Designer in Tyk Dashboard as follows:

1. Navigate to the API for which you want to set the rate limit
2. From the **Core Settings** tab, navigate to the **Rate Limiting and Quotas** section
3. Ensure that **Disable rate limiting** is not selected
4. Enter in your **Rate** and **Per (seconds)** values
5. **Save/Update** your changes

Tyk will now accept a maximum of **Rate** requests in any **Per** period to the API and will reject further requests with an `HTTP 429 Too Many Requests` error.

Check out the following video to see this being done.

{{< youtube ETI7nOd3DNc >}}

## Configuring the rate limiter at the Key-Level

If you want to restrict an API client to a certain rate of requests to your APIs, you can configure a Key-Level rate limit via a [Security Policy]({{< ref "basic-config-and-security/security/security-policies" >}}). The allowance that you configure in the policy will be consumed by any requests made to APIs using a key generated from the policy. Thus, if a policy grants access to three APIs with `rate=15 per=60` then a client using a key generated from that policy will be able to make a total of 15 requests - to any combination of those APIs - in any 60 second period before receiving the `HTTP 429 Too Many Requests` error. 

{{< note success >}}
**Note**  

 It is assumed that the APIs being protected with a rate limit are using our [Authentication token]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens" >}}) Authentication mode and have policies already created
{{< /note >}}

You can configure this rate limit from the API Designer in Tyk Dashboard as follows:

1. Navigate to the Tyk policy for which you want to set the rate limit
2. Ensure that API(s) that you want to apply rate limits to are selected
3. Under **Global Limits and Quota**, make sure that **Disable rate limiting** is not selected and enter your **Rate** and **Per (seconds)** values
4. **Save/Update** the policy

## Setting up a Key-Level Per-API rate limit

If you want to restrict API clients to a certain rate of requests for a specific API you will also configure the rate limiter via the security policy. However this time you'll assign per-API limits. The allowance that you configure in the policy will be consumed by any requests made to that specific API using a key generated from that policy. Thus, if a policy grants access to an API with `rate=5 per=60` then three clients using keys generated from that policy will each independently be able to make 5 requests in any 60 second period before receiving the `HTTP 429 Too Many Requests` error. 

{{< note success >}}
**Note**  

 It is assumed that the APIs being protected with a rate limit are using our [Authentication token]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens" >}}) Authentication mode and have policies already created
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

## Setting up a key-level per-endpoint rate limit

To restrict the request rate for specific API clients on particular endpoints, you can use the security policy to assign per-endpoint rate limits. These limits are set within the policy and will be #enforced for any requests made to that endpoint by clients using keys generated from that policy.

Each key will have its own independent rate limit allowance. For example, if a policy grants access to an endpoint with a rate limit of 5 requests per 60 seconds, each client with a key from that policy can make 5 requests to the endpoint in any 60-second period. Once the limit is reached, the client will receive an HTTP `429 Too Many Requests` error.

If no per-endpoint rate limit is defined, the endpoint will inherit the key-level per-API rate limit or the global rate limit, depending on what is configured.

{{< note success >}}
**Note**  
The following assumptions are made:
 - The [ignore authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware should not be enabled for the relevant endpoints.
 - If [path-based permissions]({{< ref "getting-started/create-security-policy#path-based-permissions" >}}) are configured, they must grant access to these endpoints for keys generated from the policies.
{{< /note >}}

You can configure per-endpoint rate limits from the API Designer in Tyk Dashboard as follows:

1. Navigate to the Tyk policy for which you want to set the rate limit
2. Ensure that API that you want to apply rate limits to is selected
3. Under **API Access** -> **Set endpoint-level usage limits** click on **Add Rate Limit** to configure the rate limit. You will need to provide the rate limit and the endpoint path and method.
4. **Save/Update** the policy


## Setting Rate Limits in the Tyk Community Edition Gateway (CE)

### Configuring the rate limiter at the (Global) API-Level

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

## Configuring the rate limiter on the session object

All actions on the session object must be done via the Gateway API.

1. Ensure that `allowance` and `rate` are set to the same value: this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.

2. Ensure that `per` is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 requests per 5 seconds, set this value to 5.

### Can I disable the rate limiter?

Yes, the rate limiter can be disabled for an API Definition by selecting **Disable Rate Limits** in the API Designer, or by setting the value of `disable_rate_limit` to `true` in your API definition.

Alternatively, you could also set the values of `Rate` and `Per (Seconds)` to be 0 in the API Designer.

{{< note success >}}
**Note**  

Disabling the rate limiter at the API-Level does not disable rate limiting at the Key-Level. Tyk will enforce the Key-Level rate limit even if the API-Level limit is not set.
{{< /note >}}

### Can I set rate limits by IP address?

Not yet, though IP-based rate limiting is possible using custom pre-processor middleware JavaScript that generates tokens based on IP addresses. See our [Middleware Scripting Guide]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}}) for more details.
