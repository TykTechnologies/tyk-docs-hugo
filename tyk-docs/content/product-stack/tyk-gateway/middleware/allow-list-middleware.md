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

If you have a service that exposes endpoints or supports methods that you do not want to be available to clients, you should use the allow list to perform strict restriction to a subset of methods and paths. If the allow list is not enabled, requests to endpoints that are not explicitly defined in Tyk will be proxied to the upstream service and may lead to unexpected behavior.

## How the allow list works

Tyk Gateway does not actually maintain a list of allowed endpoints but rather works on the model whereby if the *allow list* middleware is added to an endpoint then this will automatically block all other endpoints.

Tyk Gateway will subsequently return `HTTP 403 Forbidden` to any requested endpoint that doesn't have the *allow list* middleware enabled, even if the endpoint is defined and configured in the API definition.

{{< note success >}}
**Note**

If you enable the allow list feature by adding the middleware to any endpoint, ensure that you also add the middleware to any other endpoint for which you wish to accept requests.
{{< /note >}}

## Configuring the allow list

For detailed documentation on URL matching behavior, please refer to [URL Matching in Tyk]({{< ref "getting-started/key-concepts/url-matching" >}}).

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the allow list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the allow list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Allow List middleware summary
  - The Allow List is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Allow List can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
