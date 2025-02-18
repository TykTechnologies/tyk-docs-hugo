---
date: 2017-03-23T17:18:54Z
title: Request Size Limits
description: "The key concepts for implementing request size limits with Tyk"
tags: ["request size limit", "size limit", "security", "middleware", "per-API", "per-endpoint"]

---

With Tyk, you can apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from excessive memory usage or brute force attacks.

Tyk Gateway offers a flexible tiered system of limiting request sizes ranging from globally applied limits across all APIs deployed on the gateway down to specific size limits for individual API endpoints.

## When to use the Request Size Limit middleware

#### Protecting the entire Tyk Gateway from DDoS attacks
You can configure a system-wide request size limit that protects all APIs managed by the Tyk Gateway from being overwhelmed by excessively large requests, which could be part of a DDoS attack, ensuring the stability and availability of the gateway.

#### Limiting request sizes for a lightweight microservice
You might expose an API for a microservice that is designed to handle lightweight, fast transactions and is not equipped to process large payloads. You can set an API-level size limit that ensures the microservice behind this API is not forced to handle requests larger than it is designed for, maintaining its performance and efficiency.

#### Controlling the size of GraphQL queries
A GraphQL API endpoint might be susceptible to complex queries that can lead to performance issues. By setting a request size limit for the GraphQL endpoint, you ensure that overly complex queries are blocked, protecting the backend services from potential abuse and ensuring a smooth operation.

#### Restricting upload size on a file upload endpoint
An API endpoint is designed to accept file uploads, but to prevent abuse, you want to limit the size of uploads to 1MB. To enforce this, you can enable the Request Size Limit middleware for this endpoint, configuring a size limit of 1MB. This prevents users from uploading excessively large files, protecting your storage and bandwidth resources.

## How request size limiting works

Tyk compares each incoming API request with the configured maximum size for each level of granularity in order of precedence and will reject any request that exceeds the size you have set at any level of granularity, returning an HTTP 4xx error as detailed below.

All size limits are stated in bytes and are applied only to the request _body_ (or payload), excluding the headers.

| Precedence | Granularity      | Error returned on failure      |
|------------|------------------|--------------------------------|
| 1st        | System (gateway) | `413 Request Entity Too Large` |
| 2nd        | API              | `400 Request is too large`     |
| 3rd        | Endpoint         | `400 Request is too large`     |

{{< note success >}}
**Note**

The system level request size limit is the only size limit applied to [TCP]({{< ref "api-management/non-http-protocols#tcp-proxy" >}}) and [Websocket]({{< ref "api-management/non-http-protocols#websockets" >}}) connections.
{{< /note >}}

<hr>

### Applying a system level size limit
You can configure a request size limit (in bytes) that will be applied to all APIs on your Tyk Gateway by adding `max_request_body_size` to the `http_server_options` [element]({{< ref "tyk-oss-gateway/configuration#http_server_optionsmax_request_body_size" >}}) of your `tyk.conf` Gateway configuration. For example:
```yaml
"max_request_body_size": 5000
```
A value of zero (default) means that no maximum is set and the system-wide size limit check will not be performed.

This limit will be evaluated before API-level or endpoint-level configurations. If this test fails, the Tyk Gateway will return an error `HTTP 413 Request Entity Too Large`.

{{< note success >}}
**Note**  

Tyk Cloud Classic enforces a strict request size limit of 1MB on all inbound requests via our cloud architecture. This limit does not apply to Tyk Cloud users.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure an API or endpoint-level request size limit [here]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure an API or endpoint-level request size limit [here]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Request Size Limit middleware summary
  - The Request Size Limit middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Size Limit middleware can be configured at the system level within the Gateway config, or per-API or per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
