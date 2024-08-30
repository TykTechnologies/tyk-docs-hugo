---
title: Block List middleware
date: 2024-01-24
description: "Detail of the Block List middleware"
tags: ["block list", "middleware", "per-endpoint"]
---

The Block List middleware is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`.

Note that this is not the same as Tyk's [IP block list]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting" >}}) feature, which is used to restrict access to APIs based upon the IP of the requestor.

## When to use the block list

#### Prevent access to deprecated resources

If you are versioning your API and deprecating an endpoint then, instead of having to remove the functionality from your upstream service's API you can simply block access to it using the block list middleware.

## How the block list works

Tyk Gateway does not actually maintain a list of blocked endpoints but rather works on the model whereby if the *block list* middleware is added to an endpoint then any request to that endpoint will be rejected, returning `HTTP 403 Forbidden`.

## Configuring the block list

For detailed documentation on URL matching behavior, please refer to [URL Matching in Tyk]({{< ref "getting-started/key-concepts/url-matching" >}}).

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the block list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the block list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Block List middleware summary
  - The Block List is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Block List can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
