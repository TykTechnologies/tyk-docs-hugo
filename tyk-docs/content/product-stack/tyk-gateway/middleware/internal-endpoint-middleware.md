---
title: Internal Endpoint middleware
date: 2024-01-26
description: "Detail of the Internal Endpoint middleware"
tags: ["internal endpoint", "internal", "middleware", "per-endpoint"]
---

The Internal Endpoint middleware instructs Tyk Gateway to ignore external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

## When to use the Internal Endpoint middleware

#### Internal routing decisions

Internal endpoints are frequently used to make complex routing decisions that cannot be handled by the standard routing features. A single externally published endpoint can receive requests and then, based on inspection of the requests, the [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware can route them to different internal endpoints and on to the appropriate upstream services.

## How internal endpoints work

When the Internal Endpoint middleware is configured for a specific endpoint, it instructs the Gateway to ignore requests to the endpoint that originate from outside Tyk.

An internal endpoint can be targeted from another API deployed on Tyk using the `tyk://` prefix instead of `http://`.

For example, if `GET /status/200` is configured to be an Internal Endpoint on the listen path `http://my-tyk-install.org/my-api/` then external calls to this endpoint will be rejected with `HTTP 403 Forbidden`. Other APIs on Tyk will be able to direct traffic to this endpoint by setting their `target_url` to `tyk://my-api/status/200`.

#### Addressing an internal endpoint

An internal endpoint can be addressed using three different identifiers in the format `tyk://{identifier}/{endpoint}`.

The options for the `identifier` are:
- `self` (only if the endpoint is in the same API)
- `api_id` (the unique API Identifier assigned to the API within Tyk)
- listen path (the listen path defined for the API)

For example, let's say you have two APIs:

| api_id | listen path | Endpoint 1   | Endpoint 2 (with internal endpoint middleware) |
|--------|-------------|--------------|------------------------------------------------|
| f1c63fa5177de2719  | `/api1`    | `endpoint1_ext` | `endpoint1_int`     |
| 2e90b33a879945918  | `/api2`    | `endpoint2_ext` | `endpoint2_int`     |

An external request directed at `/api1/endpoint1_int` will be rejected with `HTTP 403 Forbidden`, since this is an internal endpoint.

This endpoint could, however, be called from within either endpoint in `/api2` as either:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`

Or from within `/api1/endpoint1_ext` as:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`
- `tyk://self/endpoint1_int`

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the Internal Endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the Internal Endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Internal Endpoint middleware summary
  - The Internal Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Internal Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

