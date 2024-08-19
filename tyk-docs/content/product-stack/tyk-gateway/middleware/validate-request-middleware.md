---
title: Request Validation middleware
date: 2024-02-02
description: "Detail of the Request Validation middleware"
tags: ["request validation", "validate request", "security", "middleware", "per-endpoint"]
aliases:
  - /transform-traffic/validate-json/
  - /getting-started/key-concepts/request-validation/
---

Requests to your upstream services should meet the contract that you have defined for those APIs. Checking the content and format of incoming requests before they are passed to the upstream APIs can avoid unexpected errors and provide additional security to those services. Tyk's request validation middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

Request validation enables cleaner backend APIs, better standardization across consumers, easier API evolution and reduced failure risk leading to higher end-to-end reliability.

## When to use the Request Validation middleware

#### Improving security of upstream services

Validating incoming requests against a defined schema protects services from unintended consequences arising from bad input, such as SQL injection or buffer overflow errors, or other unintended failures caused by missing parameters or invalid data types. Offloading this security check to the API Gateway provides an early line of defense as potentially bad requests are not proxied to your upstream services.

#### Offloading contract enforcement

You can ensure that client requests adhere to a defined contract specifying mandatory headers or parameters before sending requests upstream. Performing these validation checks in the API Gateway allows API developers to focus on core domain logic.

#### Supporting data transformation

Validation goes hand-in-hand with request [header]({{< ref "transform-traffic/request-headers" >}}) and [body]({{< ref "transform-traffic/request-body" >}}) transformation by ensuring that a request complies with the expected schema prior to transformation. For example, you could validate that a date parameter is present, then transform it into a different date format as required by your upstream API dynamically on each request.

## How request validation works

The incoming request is compared with a defined schema, which is a structured description of the expected format for requests to the endpoint. This request schema defines the required and optional elements such as headers, path/query parameters, payloads and their data types. It acts as a contract for clients.

If the incoming request does not match the schema, it will be rejected with an `HTTP 422 Unprocessable Entity` error. This error code can be customized if required.

When using [Tyk OAS APIs]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}), request validation is performed by the `Validate Request` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the OpenAPI description of the endpoint. All elements of the request can have a `schema` defined in the OpenAPI description so requests to Tyk OAS APIs can be validated for headers, path/query parameters and body (payload).

When using the legacy [Tyk Classic APIs]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}), request validation is performed by the `Validate JSON` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the middleware configuration and is limited to the request body (payload). Request headers and path/query parameters cannot be validated when using Tyk Classic APIs.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request validation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request validation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Validate Request middleware summary
  - The Validate Request middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Validate Request middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
 