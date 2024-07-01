---
date: 2017-03-23T17:29:19Z
title: Response Headers
menu:
  main:
    parent: "Transform Traffic"
weight: 2 
---

Tyk enables you to modify header information when a response is proxied back to the client. This can be very useful in cases where you have an upstream API that potentially exposes sensitive headers that you need to remove.

The response transform middleware works in the same way as the request transform middleware except that the settings are applied to the response section of the API Definition or Endpoint Designer. See [Request Header]({{< ref "transform-traffic/request-headers" >}}) injection documentation for details on what can be achieved.

### Editing the API Definition

Using Tyk, you would set up your API Definition with these additions to the extended_paths.transform_response_headers field:

```{.copyWrapper}
"extended_paths": {
  "ignored": [],
  "white_list": [],
  "black_list": [],
  "cache": ["get"],
  "transform": [],
  "transform_response_headers": [
    {
      "delete_headers": ["x-server-secret"],
      "add_headers": {"x-server-id": "this-is-important"},
      "path": "widgets{rest}",
      "method": "GET"
    }
  ]
}
```

### Required for Response Middleware

Response middleware must be *registered*, so one last step is required when editing the API Definition, and that is to add the response middleware to the processor like so:

```{.copyWrapper}
"response_processors":[{"name": "header_injector"}]
```

<<<<<<< HEAD
The Dashboard will do this for you if you are editing the API using the Endpoint Designer.
=======
#### Adding security headers

The response header transform allows you to add security headers to the response to protect against common attacks such as cross-site scripting (XSS) and cross-site request forgery (CSRF). Some security headers may be required for compliance with industry standards and, if not provided by the upstream, can be added by Tyk before forwarding the response to the client.

#### Adding metadata to response headers

Adding metadata to response headers can be useful for tracking and analyzing API usage, as well as for providing additional information to clients. For example, you may want to add a header that indicates the version of the API being used or the time taken to process the request.

#### Modifying response headers for dynamic performance optimisation

You can use response header transformation to dynamically optimise the performance of the API. For example, you may want to indicate to the client the maximum number of requests that they can make in a given time period. By doing so through the response headers, you can perform dynamic optimisation of the load on the upstream service without triggering the rate limiter and so avoiding errors being sent to the client.

## How the response header transform works

The response header transform can be applied per-API or per-endpoint; each has a separate entry in the API definition so that you can configure both API-level and endpoint-level transforms for a single API.

The middleware is configured with a list of headers to delete from the response and a list of headers to add to the response. Each header to be added to the response is configured as a key:value pair.
- the "delete header" functionality is intended to ensure that any header in the delete list is not present once the middleware completes. If a header in the delete list is not present in the upstream response, the middleware will ignore the omission
- the "add header" functionality will capitalise any header name provided. For example, if you configure the middleware to append `x-request-id` it will be added to the response as `X-Request-Id`

In the response middleware chain, the endpoint-level transform is applied before the API-level transform. Subsequently, if both middleware are enabled, the API-level transform will operate on the headers that have been added by the endpoint-level transform (and will not have access to those that have been deleted by it).

#### Injecting dynamic data into headers

You can enrich the response headers by injecting data from context variables or session objects into the headers.
- [context variables]({{< ref "context-variables" >}}), extracted from the request at the start of the middleware chain, can be injected into added headers using the `$tyk_context.` namespace
- [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into added headers using the `$tyk_meta.` namespace
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into added headers using the notation appropriate to the location of the KV store

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the response header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the response header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Response Header Transform middleware summary
  - The Response Header Transform is an optional stage in Tyk's API Response processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Response Header Transform can be configured at the per-endpoint or per-API level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
>>>>>>> 71fafe087...  [DX-1437] analyse --> analyze  (#4929)
