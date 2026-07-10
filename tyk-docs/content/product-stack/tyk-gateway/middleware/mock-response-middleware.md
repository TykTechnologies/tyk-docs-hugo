---
title: "Mock Response middleware"
date: 2024-01-31
description: "Explains the Mock Response middleware"
tags: ["mock response", "mock", "middleware", "per-endpoint"]
aliases:
  - /getting-started/using-oas-definitions/mock-response/
---

A mock response is a simulated API response that can be returned by the API gateway without actually sending the request to the backend API service. Mock responses are an integral feature for API development, enabling developers to emulate API behavior without the need for upstream execution.

Tyk's mock response middleware offers this functionality by allowing the configuration of custom responses for designated endpoints. This capability is crucial for facilitating front-end development, conducting thorough testing, and managing unexpected scenarios or failures.

## When is it useful

### Rapid API Prototyping

Developers can create predefined static (mock) responses during early API prototyping phases to simulate responses without any backend. This is useful for several reasons:

- **Validate API Design Early**: It enables [trying an API before writing any code](https://tyk.io/blog/3-ways-to-try-out-your-api-design-before-you-build). API designers and product managers can validate concepts without waiting for full API implementations.
- **Enable Dependent Development**: Allows development of apps and tooling that depend on the upstream service to progress. For example, the front-end team can build their interface based on the mocked responses.
- **Support Test-Driven Development (TDD) and Behavior-Driven Development (BDD)**: Supports writing test cases for the API before implementation, enabling design and testing of the API without writing any backend code.

### Legacy System Migration

When migrating from a legacy system to new APIs, mock responses can be used to emulate the old system's outputs during the transitional phases. This provides continuity for client apps relying on the old system while new APIs are built that will eventually replace the legacy hooks.

### Disaster Recovery Testing

The ability for a gateway to return well-formed mocks when backend APIs are unavailable helps test disaster recovery plans. By intentionally taking APIs offline and verifying the mocks' surface instead, developers gain confidence in the gateway's fallback and business continuity capabilities

### Enhanced CI/CD pipeline

Test cases that rely on API interactions can mock those dependencies and provide virtual test data. This removes wait times for real API calls to complete during automated builds. Consumer testing can verify that provider APIs meet expected contracts using mocks in the CI pipeline. This ensures the contract remains intact across code changes before deployment. Front-end/client code can scale release cycles faster than backend APIs by using mocks to simulate planned API behaviors before they are ready.

## How mock responses work

When the Mock Response middleware is configured for a specific endpoint, it terminates requests to the endpoint and generates an HTTP response that will be returned to the client as if it had come from the upstream service. No request will be passed to the upstream. The mock response to an API request should be designed to emulate how the service would respond to requests. To enable this, the content of the response can be configured to match the API contract for the service: you can set the HTTP status code, body and headers for the response.

## Advanced mock responses with Tyk OAS

When working with Tyk OAS APIs, Tyk Gateway can parse the [examples and schema]({{< ref "product-stack/tyk-gateway/middleware/mock-response-openapi" >}}) in the OpenAPI description and use this to automatically generate responses using those examples. Where multiple examples are defined, for example for different response codes, Tyk enables you to [configure special headers]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#multiple-mock-responses-for-a-single-endpoint" >}}) in the request to select the desired mock response.

## Middleware execution order during request processing

### With **Tyk OAS APIs**

- the mock response middleware is executed at the **end** of the request processing chain, immediately prior to the request being proxied to the upstream
- all other request processing middleware (e.g. authentication, request transforms) will be executed prior to the mock response.

### With **Tyk Classic APIs**

- the mock response middleware is executed at the **start** of the request processing chain
- an endpoint with a mock response will not run any other middleware and will immediately return the mocked response for any request. As such, it is always an unauthenticated (keyless) call.

<hr>

If you’re using Tyk OAS APIs, then you can find details and examples of how to configure the mock response middleware [here]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas" >}}).

If you’re using Tyk Classic APIs, then you can find details and examples of how to configure the response body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Mock Response middleware summary
  - The Mock Response middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Mock Response middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
