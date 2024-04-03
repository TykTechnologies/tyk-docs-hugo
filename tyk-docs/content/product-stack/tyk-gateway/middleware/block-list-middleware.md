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

Tyk Gateway does not actually maintain a list of blocked endpoints but rather works on the model whereby if the _block list_ middleware is added to an endpoint then any request to that endpoint will be rejected, returning `HTTP 403 Forbidden`.

### Case sensitivity

By default the block list is case-sensitive. For example, if you have defined the endpoint `GET /userID` in your API definition then only calls to `GET /userID` will be blocked: calls to `GET /UserID` or `GET /userid` will be allowed. You can configure the middleware to be case insensitive at the endpoint level.

You can also set case sensitivity for the entire [gateway]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) in the Gateway configuration file `tyk.conf`. If case insensitivity is configured at the gateway level, this will override the endpoint-level setting.

### Endpoint parsing

When you define an endpoint in your API Definition (for example `GET /anything`), Tyk will also match for `GET /anything/somepath` and any other sub-path based on the `GET /anything` route.

You may not actually want Tyk to reject accesses to sub-paths (such as `GET /anything/somepath`) just to the specific endpoint.

If you add a `$` at the end of the `listen_path` (in our example `GET /anything$`) then Tyk's regular expression matching will be exact, and will not match endpoints with characters following the specified endpoint.

Thus, if you enable the middleware for `GET /anything$` then whilst `GET /anything` will be blocked, requests to  `GET /anything/somepath` will be allowed.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the block list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the block list middleware [here]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Block List middleware summary
  - The Block List is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Block List can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

