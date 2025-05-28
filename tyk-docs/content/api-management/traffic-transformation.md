---
title: "Transform Traffic by using Tyk Middlewares"
date: 2025-02-10
tags: ["Overview", "Allow List", "Block List", "Ignore Authentication", "Internal Endpoint", "Request Method ", "Request Body ", "Request Headers ", "Response Body", "Response Headers", "Request Validation", "Mock Response", "Virtual Endpoints", "Go Templates", "JQ Transforms", "Request Context Variables"]
description: ""
keywords: ["Overview", "Allow List", "Block List", "Ignore Authentication", "Internal Endpoint", "Request Method ", "Request Body ", "Request Headers ", "Response Body", "Response Headers", "Request Validation", "Mock Response", "Virtual Endpoints", "Go Templates", "JQ Transforms", "Request Context Variables"]
aliases:
  - /concepts/middleware-execution-order
  - /advanced-configuration/transform-traffic
  - /api-management/manage-apis/tyk-oas-api-definition/tyk-oas-middleware
  - /advanced-configuration/compose-apis/sample-batch-funtion
  - /advanced-configuration/compose-apis
  - /advanced-configuration/transform-traffic/validate-json
  - /transform-traffic/validate-json
  - /transform-traffic/endpoint-designer
  - /advanced-configuration
---

## Overview

When you configure an API on Tyk, the Gateway will proxy all requests received at the listen path that you have defined through to the upstream (target) URL configured in the API definition. Responses from the upstream are likewise proxied on to the originating client. Requests and responses are processed through a powerful [chain of middleware]({{< ref "api-management/traffic-transformation#request-middleware-chain" >}}) that perform security and processing functions.

Within that chain are a highly configurable set of optional middleware that can, on a per-endpint basis:
- apply processing to [API requests](#middleware-applied-to-the-api-request) before they are proxied to the upstream service
- apply customization to the [API response](#middleware-applied-to-the-api-response) prior to it being proxied back to the client

Tyk also supports a powerful custom plugin feature that enables you to add custom processing at different stages in the processing chains. For more details on custom plugins please see the [dedicated guide]({{< ref "api-management/plugins/overview#" >}}).

### Middleware applied to the API Request

The following standard middleware can optionally be applied to API requests on a per-endpoint basis.

#### Allow list

The [Allow List]({{< ref "api-management/traffic-transformation/allow-list" >}}) middleware is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorized access to endpoints that are not explicitly permitted.

Enabling the allow list will cause the entire API to become blocked other than for endpoints that have this middleware enabled. This is great if you wish to have very strict access rules for your services, limiting access to specific published endpoints.

#### Block list

The [Block List]({{< ref "api-management/traffic-transformation/block-list" >}})  middleware is a feature designed to prevent access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

#### Cache

Tyk's [API-level cache]({{< ref "api-management/response-caching#basic-caching" >}}) does not discriminate between endpoints and will usually be configured to cache all safe requests. You can use the granular [Endpoint Cache]({{< ref "api-management/response-caching#endpoint-caching" >}}) to ensure finer control over which API responses are cached by Tyk.

#### Circuit Breaker

The [Circuit Breaker]({{< ref "tyk-self-managed#circuit-breakers" >}}) is a protective mechanism that helps to maintain system stability by preventing repeated failures and overloading of services that are erroring. When a network or service failure occurs, the circuit breaker prevents further calls to that service, allowing the affected service time to recover while ensuring that the overall system remains functional.

#### Do Not Track Endpoint

If [traffic logging]({{< ref "api-management/logs-metrics#api-traffic-logs" >}}) is enabled for your Tyk Gateway, then it will create transaction logs for all API requests (and responses) to deployed APIs. You can use the [Do-Not-Track]({{< ref "api-management/traffic-transformation/do-not-track" >}}) middleware to suppress creation of transaction records for specific endpoints.

#### Enforced Timeout

Tyk’s [Enforced Timeout]({{< ref "tyk-self-managed#circuit-breakers" >}}) middleware can be used to apply a maximum time that the Gateway will wait for a response before it terminates (or times out) the request. This helps to maintain system stability and prevents unresponsive or long-running tasks from affecting the overall performance of the system.

#### Ignore Authentication

Adding the [Ignore Authentication]({{< ref "api-management/traffic-transformation/ignore-authentication" >}}) middleware means that Tyk Gateway will not perform authentication checks on requests to that endpoint. This plugin can be very useful if you have a specific endpoint (such as a ping) that you don't need to secure.

#### Internal Endpoint

The [Internal Endpoint]({{< ref "api-management/traffic-transformation/internal-endpoint" >}}) middleware instructs Tyk Gateway not to expose the endpoint externally. Tyk Gateway will then ignore external requests to that endpoint while continuing to process internal requests from other APIs; this is often used with the [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) functionality.

#### Method Transformation

The [Method Transformation]({{< ref "api-management/traffic-transformation/request-method" >}}) middleware allows you to change the HTTP method of a request.

#### Mock Response

A [Mock Response]({{< ref "api-management/traffic-transformation/mock-response" >}}) is a simulated API response that can be returned by the API gateway without actually sending the request to the backend API. Mock responses are an integral feature for API development, enabling developers to emulate API behavior without the need for upstream execution.

#### Request Body Transform

The [Request Body Transform]({{< ref "api-management/traffic-transformation/request-body" >}}) middleware allows you to perform modification to the body (payload) of the API request to ensure that it meets the requirements of your upstream service.

#### Request Header Transform

The [Request Header Transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware allows you to modify the header information provided in the request before it leaves the Gateway and is passed to your upstream API.

#### Request Size Limit

Tyk Gateway offers a flexible tiered system of limiting request sizes ranging from globally applied limits across all APIs deployed on the gateway down to specific size limits for individual API endpoints. The [Request Size Limit]({{< ref "api-management/traffic-transformation/request-size-limits" >}}) middleware provides the most granular control over request size by enabling you to set different limits for individual endpoints.

#### Request Validation

Tyk’s [Request Validation]({{< ref "api-management/traffic-transformation/request-validation" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

When working with Tyk OAS APIs, the request validation covers both headers and body (payload); with the older Tyk Classic API style we can validate only the request body (payload).

#### Track Endpoint

If you do not want to include all endpoints in your [Activity by Endpoint]({{< ref "api-management/dashboard-configuration#activity-by-endpoint" >}}) statistics in Tyk Dashboard, you can enable this middleware for the endpoints to be included. 

#### URL Rewrite

[URL Rewriting]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) in Tyk is a powerful feature that enables the modification of incoming API request paths to match the expected endpoint format of your backend services. This allows you to translate an outbound API interface to the internal structure of your services. It is a key capability used in [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}})

#### Virtual Endpoint

Tyk’s [Virtual Endpoints]({{< ref "api-management/traffic-transformation/virtual-endpoints" >}}) is a programmable middleware component that allows you to perform complex interactions with your upstream service(s) that cannot be handled by one of the other middleware components.

### Middleware applied to the API Response

The following transformations can be applied to the response recieved from the upstream to ensure that it contains the correct data and format expected by your clients.

#### Response Body Transform

The [Response Body Transform]({{< ref "api-management/traffic-transformation/response-body" >}}) middleware allows you to perform modification to the body (payload) of the response received from the upstream service to ensure that it meets the expectations of the client.

#### Response Header Transform

The [Response Header Transform]({{< ref "api-management/traffic-transformation/response-headers" >}}) middleware allows you to modify the header information provided in the response before it leaves the Gateway and is passed to the client.
### Request Middleware Chain

{{< img src="/img/diagrams/middleware-execution-order@3x.png" alt="Middleware execution flow" >}}
