---
date: 2017-03-23T17:46:28Z
title: Request Header Transformation
tags: ["Request Transform", "Header Transform", "transform"]
aliases:
  - /advanced-configuration/transform-traffic/request-headers/
description: "How to transform the headers for an API Request"
---

Tyk allows you to modify the headers of incoming requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

With the header transform middleware you can append or delete any number of headers to ensure that the request contains the information required by your upstream service. You can enrich the request by adding contextual data that is held by Tyk but not included in the original request from the client.

This middleware changes only the headers and not the method or payload. You can, however, combine this with the [Request Method Transform]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) and [Request Body Tranform]({{< ref "transform-traffic/request-body" >}}) to apply more complex transformation to requests.

There are related [Response Header Transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware (at API-level and endpoint-level) that provide the same functionality on the response from your upstream, prior to it being returned to the client.

## When to use request header transformation

#### Adding Custom Headers

A common use of this feature is to add custom headers to requests, such as adding a secure header to all upstream requests (to verify that traffic is coming from the gateway), or adding a timestamp for tracking purposes.

#### Modifying Headers for Compatibility

You could use the request header transform middleware to modify headers for compatibility with a downstream system, such as changing the Content-Type header from "application/json" to "application/xml" for an API that only accepts XML requests while using the [Request Body Tranform]({{< ref "transform-traffic/request-body" >}}) to transform the payload.

#### Prefixing or Suffixing Headers

Upstream systems or corporate policies might mandate that a prefix or suffix is added to header names, such as adding a "Bearer" prefix to all Authorization headers for easier identification internally, without modifying the externally published API consumed by the client applications.

#### Adding multi-user access to a service

You can add multi-user access to an upstream API that has a single authentication key and you want to add multi-user access to it without modifying it or adding clunky authentication methods to it to support new users.

## How the request header transform works

The request header transform can be applied per-API or per-endpoint; each has a separate entry in the API definition so that you can configure both API-level and endpoint-level transforms for a single API.

The middleware is configured with a list of headers to delete from the request and a list of headers to add to the request. Each header to be added to the request is configured as a key:value pair.

The "delete header" functionality is intended to ensure that any header in the delete list is not present once the middleware completes - so if a header is not originally present in the request but is on the list to be deleted, the middleware will ignore its omission.

The "add header" functionality will capitalize any header name provided, for example if you configure the middleware to append `x-request-id` it will be added to the request as `X-Request-Id`.

In the request middleware chain, the API-level transform is applied before the endpoint-level transform so if both middleware are enabled, the endpoint-level transform will operate on the headers that have been added by the API-level transform (and will not receive those that have been deleted by it).

#### Injecting dynamic data into headers

You can enrich the request headers by injecting data from context variables or session objects into the headers.
- [context variables]({{< ref "context-variables" >}}) are extracted from the request at the start of the middleware chain and can be injected into added headers using the `$tyk_context.` namespace
- [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into added headers using the `$tyk_meta.` namespace
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into added headers using the notation appropriate to the location of the KV store

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Request Header Transform middleware summary
  - The Request Header Transform is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Header Transform can be configured at the per-endpoint or per-API level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
