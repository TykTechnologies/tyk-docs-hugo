---
title: Allow List middleware
date: 2024-01-24
description: "Detail of the Allow List middleware"
tags: ["allow list", "middleware", "per-endpoint"]
---

The Allow List middleware is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorized access to endpoints that are not explicitly permitted.

Note that this is not the same as Tyk's [IP allow list]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting" >}}) feature, which is used to restrict access to APIs based upon the IP of the requestor.

## When to use the allow list

#### Restricting access to private endpoints

If you have a service that exposes endpoints or supports methods that you do not want to be available to clients, you should use the allow list to perform strict restriction to a subset of methods and paths. If the allow list is not enabled, requests to endpoints that are not explicitly defined in Tyk will be proxied to the upstream service and may lead to unexpected behaviour.

## How the allow list works

Tyk Gateway does not actually maintain a list of allowed endpoints but rather works on the model whereby if the _allow list_ middleware is added to an endpoint then this will automatically block all other endpoints.

Tyk Gateway will subsequently return `HTTP 403 Forbidden` to any requested endpoint that doesn't have the _allow list_ middleware enabled, even if the endpoint is defined and configured in the API definition.

{{< note success >}}
**Note**  

If you enable the allow list feature by adding the middleware to any endpoint, ensure that you also add the middleware to any other endpoint for which you wish to accept requests.
{{< /note >}}

### Case sensitivity

By default the allow list is case-sensitive, so for example if you have defined the endpoint `GET /userID` in your API definition then only calls to `GET /userID` will be allowed: calls to `GET /UserID` or `GET /userid` will be rejected. You can configure the middleware to be case-insensitive at the endpoint level.

You can also set case sensitivity for the entire [gateway]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) in the Gateway configuration file `tyk.conf`. If case insensitivity is configured at the gateway level, this will override the endpoint-level setting.

### Endpoint parsing

When you define an endpoint in your API Definition (for example `GET /anything`), Tyk will also match for `GET /anything/somepath` and any other sub-path based on the `GET /anything` route.

You will typically configure the _allow list_ middleware to restrict access to only specific paths, so you may not want Tyk to match `GET /anything/somepath`.

If you add a `$` at the end of the `listen_path` (in our example `GET /anything$`) then Tyk's regular expression matching will be exact, and will not match endpoints with characters following the specified endpoint.

Thus, if you enable the middleware for `GET /anything$` then `GET /anything/somepath` will be blocked unless explicitly added to the API definition with the _allow list_ middleware enabled for that endpoint.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the allow list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the allow list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Allow List middleware summary
  - The Allow List is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Allow List can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

