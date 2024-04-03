---
date: 2017-03-23T17:45:01Z
title: Request Method Transformation
tags: ["Request Transform", "Method Transform", "transform"]
description: "How to transform the HTTP Method for an API Request"
---

Tyk's Request Method Transform middleware allows you to modify the HTTP method of incoming requests to an API endpoint prior to the request being proxied to the upstream service. You might use this to map `POST` requests from clients to upstream services that support only `PUT` and `DELETE` operations, providing a modern interface to your users. It is a simple middleware that changes only the method and not the payload or headers. You can, however, combine this with the [Request Header Transform]({{< ref "transform-traffic/request-headers" >}}) and [Request Body Tranform]({{< ref "transform-traffic/request-body" >}}) to apply more complex transformation to requests.

## When to use request method transformation

#### Simplifying API consumption

In cases where an upstream API requires different methods (e.g. `PUT` or `DELETE`) for different functionality but you want to wrap this in a single client-facing API, you can provide a simple interface offering a single method (e.g. `POST`) and then use the method transform middleware to map requests to correct upstream method.

#### Enforcing API governance and standardisation

You can use the transform middleware to ensure that all requests to a service are made using the same HTTP method, regardless of the original method used by the client. This can help maintain consistency across different client applications accessing the same upstream API.

#### Error Handling and Redirection

You can use the method transformation middleware to handle errors and redirect requests to different endpoints, such as changing a DELETE request to a GET request when a specific resource is no longer available, allowing for graceful error handling and redirection.

#### Testing and debugging

Request method transformation can be useful when testing or debugging API endpoints; temporarily changing the request method can help to identify issues or test specific functionalities.

## How the request method transform works

This is a very simple middleware that is assigned to an endpoint and configured with the HTTP method to which the request should be modified. The Request Method Transform middleware modifies the request method for the entire request flow, not just for the specific upstream request, so all subsequent middleware in the processing chain will use the new (transformed) method.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request method transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-method-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request method transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-method-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Request Method Transform middleware summary
  - The Request Method Transform is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Method Transform is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->