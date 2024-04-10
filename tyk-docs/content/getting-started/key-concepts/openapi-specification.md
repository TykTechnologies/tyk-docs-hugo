---
title: "Introduction to Tyk OAS"
date: 2022-07-05
tags: ["API", "OAS", "OpenAPI Specification", "OAS API definition", "API definition", "Tyk OAS", "Tyk OAS API", "Concepts","Introduction"]
description: "An introduction to OpenAPI concepts with Tyk OAS APIs"
aliases:
  - /getting-started/key-concepts/oas-api-definitions/
  - /getting-started/key-concepts/low-level-concepts/
---

Tyk has always had a proprietary specification for defining APIs. From Tyk v4.1 Tyk has supported API definitions that embed the [OpenAPI Specification v3.0.x](https://spec.openapis.org/oas/v3.0.3) (OAS) format, which can offer significant time and complexity savings if you are already using it to design and document your APIs.

If you can’t wait to get started, head on over to our [guide]({{< ref "getting-started/key-concepts/high-level-concepts" >}}) to using OAS API Definitions for some tutorials.

### What does a Tyk OAS API Definition look like?

As part of a Tyk OAS Definition, there are a number of vendor specific fields that need to be configured. These fall into these categories:

- Info - information about your New API; its name and whether it should be active for example
- Upstream - where should Tyk forward requests to?
- Server - what URL should users be using to call the API served by the Tyk Gateway.

You can also optionally define:

- Middleware - add additional logic to your API flow, for example allow/block lists or request/response validation.
- [Servers]({{< ref "getting-started/key-concepts/servers" >}}) - find out how Tyk integrates neatly between your clients and upstream services, automatically configuring where it will proxy requests
- [Authentication]({{< ref "getting-started/key-concepts/authentication" >}}) - with Tyk's OpenAPI implementation you have the option of delegating authentication to the upstream service, or handling it on the Tyk Gateway
- [Mock Responses]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) - Tyk can automatically configure mock response middleware using the configuration included in your OAS document; this allows you to test your APIs without connecting to the upstream services
- [Request Validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}})  - Tyk can protect your APIs by automatically validating the request parameters and payload against a schema that defines what it *should* look like
- [Paths]({{< ref "getting-started/key-concepts/paths" >}}) - this is a section within the OAS definition that instructs Tyk which API paths (also referred to as endpoints) should be configured; Tyk uses this information to determine which middleware should be enabled for each
- [Versioning]({{< ref "getting-started/key-concepts/oas-versioning" >}}) - API versioning, a crucial API gateway capability, allows you to update and improve your APIs without breaking existing clients or services
