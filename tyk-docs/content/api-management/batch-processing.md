---
title: "Batch Processing"
date: 2025-02-10
tags: ["Request Optimization", "Optimization", "Batched Requests", "Batch", "Batch Processing"]
description: "Make multiple API requests in a single HTTP call using Batch Requests"
keywords: ["Request Optimization", "Optimization", "Batched Requests", "Batch", "Batch Processing"]
---

## Overview

Batch Requests is a powerful Tyk Gateway feature that allows clients to make multiple requests to an API in a single HTTP call. Instead of sending numerous individual requests to the API, clients can bundle these requests together, reducing network overhead and improving performance.

### What are Batch Requests?

Batch Requests act as an aggregator for multiple API calls. When a client sends a batch request to Tyk, the Gateway processes each request in the batch individually (applying all relevant middleware, authentication, and rate limiting) and returns a combined response containing the results of all requests. The scope of a batch request is limited to a single API deployed on Tyk, though can comprise requests to different endpoints (method and path) defined for that API.

### Key Benefits

- Reduced Network Overhead: Minimize the number of HTTP connections required for multiple related API operations
- Improved Client Performance: Decrease latency by eliminating multiple round-trips to the server
- Simplified Error Handling: Process success and failure responses for multiple operations in a single place
- Maintained Security: Each individual request within a batch still goes through Tyk's full security pipeline
- Flexible Execution: Choose between parallel or sequential execution of requests

### When to Use Batch Requests

Batch Requests are ideal for scenarios such as:

- Mobile applications that need to fetch data from multiple endpoints during startup
- Dashboard applications that need to populate multiple widgets with different API data
- Complex workflows that require data from several API endpoints to complete a single user action
- Integration scenarios where you need to synchronize operations across multiple services

### How Batch Requests Work

When Tyk receives a batch request, it:

- Validates the batch request format
- Processes each request in the batch individually (applying all middleware, authentication, and quotas)
- Collects all responses
- Returns a single combined response to the client

This process ensures that security is maintained while providing the performance benefits of batching.

## Using Batch Requests

### Configuration

Batch Requests are disabled by default, so you need to enable batch request support in your API definition by setting `server.batchProcessing.enabled` in the Tyk Vendor Extension (Tyk Classic: `enable_batch_request_support`).

### Batch Request Endpoint

When batch requests are enabled, Tyk automatically creates an additional logical endpoint on the subrouter for the API. This won't appear in the API definition and so will not be added to the OpenAPI description. This `/tyk/batch/` endpoint accepts requests in a specific "batch" format and processes them as described in the next section.

For example, if your API's listen path is `/myapi/` the batch request endpoint would be `/myapi/tyk/batch/`.

Note that the trailing slash `/` at the end of the URL is required when calling this endpoint.

### Batch Request Format

Batch requests must be sent as HTTP `POST` requests with a JSON payload that follows this structure:

```json
{
  "requests": [
    {
      "method": "GET",
      "headers": {
        "x-header-1": "value-1",
        "authorization": "your-auth-token"
      },
      "body": "",
      "relative_url": "resource/123"
    },
    {
      "method": "POST",
      "headers": {
        "x-header-2": "value-2",
        "authorization": "your-auth-token"
      },
      "body": "{\"property\": \"value\"}",
      "relative_url": "resource/create"
    },
    {
      "method": "GET",
      "headers": {
        "x-header-3": "value-3",
        "authorization": "your-auth-token"
      },
      "body": "",      
      "relative_url": "resource/invalid"
    }    
  ],
  "suppress_parallel_execution": false
}
```

Where:

- `requests`: An array of individual requests to be processed
  - `method`: The HTTP method for the individual request (`GET`, `POST`, `PUT`, `DELETE`, etc.)
  - `headers`: Any HTTP headers to include with the request
  - `body`: The request body (for `POST`, `PUT` requests) in the format prescribed by the API (e.g. JSON string)
  - `relative_url`: The endpoint for the request, which can include query parameters
- `suppress_parallel_execution`: A boolean flag to control whether requests should be processed in parallel (`false`) or sequentially in the order that they appear in the array (`true`)

In the example above, on receipt of a request to `POST /my-api/tyk/batch` with this payload, Tyk would process three requests in parallel:

- `GET /my-api/resource/123` passing `x-header-1` and `Authorization` headers
- `POST /my-api/resource/create` passing `x-header-2` and `Authorization` headers and the payload descrbied in `body`
- `GET /my-api/resource/invalid` passing `x-header-3` and `Authorization` headers

### Execution Order

Tyk will work through the requests in the batch in the order that they are declared in the `requests` array. The `suppress_parallel_execution` setting is used to determine whether Tyk should wait for each request to complete before starting the next (`true`), or if it should issue all of the requests in parallel (`false`).

If sequential execution is in use, Tyk will work through the entire `requests` array regardless of whether any requests return errors. All responses (success and failure) will be logged and returned to the client as described [below]({{< ref "api-management/batch-processing#batch-response-format" >}}).
 
### Batch Response Format

When you send a batch request to Tyk, each individual request within the batch is processed independently. This means that some requests in a batch may succeed while others fail. Tyk provides detailed response information for each request in the batch to help you identify and handle errors appropriately.

The response from a batch request is an array of response objects, each corresponding to one of the requests in the batch in the order that they appeared in the `requests` array:

```json
[
    {
        "relative_url": "resource/123",
        "code": 200,
        "headers": {
            "Content-Type": ["application/json"],
            "Date": ["Wed, 15 Mar 2023 12:34:56 GMT"]
        },
        "body": "{\"id\":\"123\",\"name\":\"Example Resource\"}"
    },
    {
        "relative_url": "resource/create",
        "code": 201,
        "headers": {
            "Content-Type": ["application/json"],
            "Date": ["Wed, 15 Mar 2023 12:34:56 GMT"]
        },
        "body": "{\"id\":\"456\",\"name\":\"New Resource\",\"status\":\"created\"}"
    },
    {
        "relative_url": "resource/invalid",
        "code": 404,
        "headers": {
            "Content-Type": ["application/json"],
            "Date": ["Wed, 15 Mar 2023 12:34:56 GMT"]            
            },
        "body": "{\"error\":\"Resource not found\"}"
    }   
]
```

Each response object contains:

- `relative_url`: The URL of the endpoint targeted by the request
- `code`: The HTTP status code returned from the individual request
- `headers`: The response headers
- `body`: The response body as a string

### Response Status Codes

The batch endpoint itself returns an `HTTP 200 OK` status code as long as the batch request was properly formatted and processed, regardless of whether individual requests within the batch succeeded or failed.

To determine the success or failure of individual requests, you need to examine the status code for each request in the response array.

In the previous example, we can see that the first two requests were successful, returning `HTTP 200 OK` and `HTTP 201 Created`, whereas the third failed returning `HTTP 404 Not found`.

## Invoking Batch Requests from Custom JavaScript Middleware

You can make requests to the logical batch request endpoint from within [custom JavaScript middleware]({{< ref "api-management/plugins/javascript" >}}) via the `TykBatchRequest` function that is included in Tyk's  [JavaScript API]({{< ref "api-management/plugins/javascript#javascript-api" >}}).

This integration enables you to:

- Create batch requests programmatically 
- Process batch responses with custom logic
- Implement advanced error handling specific to your use case

## Security Considerations

Requests to the `/tyk/batch/` endpoint do not require any authentication, however the requests within the batch (declared in the payload) do not bypass any security mechanisms.

As this endpoint is keyless, no rate limiting is applied to the requests to `/tyk/batch/`.

Each request in a batch is processed through Tyk's full security pipeline, including authentication and rate limiting, so API keys or other authentication credentials must be included in each individual request within the batch.

Rate limiting and quotas are applied to each request in the batch individually - so a batch containing three requests using the same API key will add three to their rate limit and quota counts. This could lead to one or more of the batched requests being rejected.

This means that, whilst anyone can make a request to the batch endpoint, they can only successfully execute requests within the batch by providing valid authentication credentials in those requests.

This means that the batch endpoint could potentially be used for reconnaissance, as attackers might determine which APIs exist based on responses. If this is a concern then you could consider:

- using IP allowlists to restrict access to your API
- using [Internal Looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) to put the batch request API behind a protected API
- disabling batch requests entirely if you don't need this feature

## Performance Considerations

- Setting `suppress_parallel_execution` to `false` provides better performance but doesn't guarantee response order.
- For large batches, consider the impact on your upstream services
- Tyk applies rate limiting to each request in the batch, which may cause some requests to be rejected if limits are exceeded

## Best Practices when using Tyk's Batch Request feature

We recommend that you consider the following best practice guidelines when using batch requests:

- Validate Before Sending: Perform client-side validation before including requests in a batch to minimize predictable errors.
- Implement Timeouts: Set appropriate timeouts for batch requests to prevent long-running operations from blocking your application.
- Log Detailed Errors: Log detailed error information for failed requests to facilitate debugging.
- Group Similar Requests: Group requests with similar authentication requirements and rate limits to minimize errors.
- Implement Circuit Breakers: Use circuit breaker patterns to prevent repeated failures when upstream services are experiencing issues.

## Troubleshooting

There are some common issues that can be encountered when using Tyk's batch requests feature.

### Missed trailing slash

When an API client makes a request to the logical `tyk/batch/` endpoint, it is essential that the trailing slash is included in the request, otherwise Tyk will return an `HTTP 404` error.

### Custom domains

Several specific issues can arise when using batch requests with custom domains:

**DNS Resolution**: The Tyk Gateway needs to be able to resolve the custom domain internally. If the Gateway can't resolve the custom domain name, batch requests will fail with connection errors, even though external requests to the same API work fine.
**Solution**: Ensure that the Tyk Gateway host can resolve the custom domain, either through proper DNS configuration or by adding entries to the host's `/etc/hosts` file.

**Internal vs. External Routing**: When a batch request is made to a custom domain, Tyk needs to route the individual requests within the batch correctly. If the custom domain is only configured for external access but not for internal routing, the batch requests may fail.
**Solution**: Configure your custom domain to work with both external and internal routing.

**Certificate Validation**: If your custom domain uses HTTPS, certificate validation issues can occur during the internal processing of batch requests.
**Solution**: Ensure that the certificates for your custom domain are properly configured and trusted by the Tyk Gateway.