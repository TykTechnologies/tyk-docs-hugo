---
title: Ignore Authentication middleware
date: 2024-01-24
description: "Detail of the Ignore Authentication middleware"
tags: ["ignore authentication", "ignore", "ignore auth", "authentication", "middleware", "per-endpoint"]
---

The Ignore Authentication middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

## When to use the ignore authentication middleware

#### Health and liveness endpoints

This plugin can be very useful if you have an endpoint (such as a ping or health check) that you don’t need to secure.

## How ignore authentication works

When the Ignore Authentication middleware is configured for a specific endpoint, it instructs the gateway to bypass the client authentication process for requests made to that endpoint. If other (non-authentication) middleware are configured for the endpoint, they will still execute on the request.

It is important to exercise caution when using the Ignore Authentication middleware, as it effectively disables Tyk's security features for the ignored paths. Only endpoints that are designed to be public or have independent security mechanisms should be configured to bypass authentication in this way. When combining Ignore Authentication with response transformations be careful not to inadvertently expose sensitive data or rely on authentication or session data that is not present.

### Case sensitivity

By default the ignore authentication middleware is case-sensitive. If, for example, you have defined the endpoint `GET /ping` in your API definition then only calls to `GET /ping` will ignore the authentication step: calls to `GET /Ping` or `GET /PING` will require authentication. You can configure the middleware to be case insensitive at the endpoint level.

You can also set case sensitivity for the entire Tyk Gateway in its [configuration file]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) `tyk.conf`. If case insensitivity is configured at the gateway level, this will override the endpoint-level setting.

### Endpoint parsing

When using the ignore authentication middleware, we recommend that you familiarize yourself with Tyk's [URL matching]({{< ref "getting-started/key-concepts/url-matching" >}}) options.

<br>
{{< note success >}}
**Note**  

Tyk recommends that you use [exact]({{< ref "getting-started/key-concepts/url-matching#exact-match" >}}) matching for maximum security, though prefix and wildcard strategies might also apply for your particular deployment or use case.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the ignore authentication middleware [here]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the ignore authentication middleware [here]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Ignore Authentication middleware summary
  - The Ignore Authentication middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Ignore Authentication middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
