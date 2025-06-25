---
title: "Configuring Tyk Gateway"
date: 2025-01-10
tags: ["API Definition", "API Definition Object", "API Definition Location"]
description: "Explain the concept of Tyk API definition and the different types Tyk offers"
keywords: ["Gateway", "Configuration", "API Definition", "API Definition Object", "API Definition Location"]
aliases:
  - /getting-started/key-concepts/what-is-an-api-definition
  - /concepts/gateway-api
  - /getting-started/key-concepts/gateway-api
  - /basic-config-and-security/security/gateway
  - /getting-started/key-concepts
---

## Introduction

Tyk API Gateway is a [reverse-proxy](https://en.wikipedia.org/wiki/Reverse_proxy) that serves as an intermediary managing API traffic between clients and the upstream API service. It consists of a series of middleware blocks that process API requests received from clients. These middleware perform various checks and transformations of and to the request preparing it to be routed to the upstream. The upstream API service executes core business logic and returns responses to Tyk Gateway. The response is similarly passed through a series of middleware blocks before being returned to the client.

Each of these middleware can be configured so that it will only allow the specific requests that you want to reach your upstream, and in the correct form. The request middleware chain encompasses functionality that includes:

- listening for requests
- authentication and authorization of the client
- rate and quota limiting
- checking that the request is valid
- applying transformations to the payload and headers
- triggering event handlers that can notify external systems of certain events
- checking availability of the upstream service
- ... and finally routing to the correct target applying load balancing between multiple upstreams if required

You can even create custom middleware (plugins) that will perform non-standard checks and transformations. As you can imagine Tyk has a lot of configuration options to implement all of this!


## Configuring the Gateway

Tyk Gateway is configurable at three levels of granularity:

- *Gateway level* settings that apply to all API proxies hosted on Tyk
- *API level* settings that apply to a specific API proxy
- *Endpoint level* settings that apply to specific endpoints (operations consisting of HTTP method and path) within an API proxy

Some features can be configured at multiple levels. Where this is the case, specific precedence rules apply and are described in the relevant section of the documentation.

### Gateway level settings

Gateway level settings are stored in a file (typically `tyk.conf`) that is applied when the Gateway starts up, affecting all API proxies deployed on Tyk. They can also be configured using the equivalent environment variables. The Gateway level settings are documented [here]({{< ref "tyk-oss-gateway/configuration" >}}).

If you are using a config file you can store settings, typically secrets, in environment variables or an external key-value store and provide references to the stored keys within the configuration file. This is explained [here]({{< ref "tyk-configuration-reference/kv-store" >}}).

### API and endpoint level settings

API and endpoint level settings are configured using an *API definition*.

This is a structured JSON object that encapsulates all of the details that apply specifically to that API, including the listen path, upstream target details, valid endpoints and operations, rate limits, authentication, versioning, and both built-in and custom middleware.

You can store settings, typically secrets, in environment variables or an external key-value store and provide references to the stored keys within the API definition. This is explained [here]({{< ref "tyk-configuration-reference/kv-store" >}}).

API definition objects can be compact for a basic pass-through API, and can become very complex and large for APIs that require significant processing to be completed both before the request is proxied to the upstream service and once the response is received.


## API Definitions

An *API definition* is the specification for an API proxy, providing Tyk with everything it needs to receive and process requests. Using Tyk's mock response, virtual endpoint and custom plugin functionality, you don't even need an upstream service - with a single API definition you can emulate a service entirely within Tyk, providing a [mock response]({{< ref "api-management/traffic-transformation/mock-response" >}}).

Tyk supports two types of API definition depending on the type of service that you are looking to proxy:

- [Tyk OAS API definitions]({{< ref "api-management/gateway-config-tyk-oas" >}}) are used for REST and streaming use cases
- [Tyk Classic API definitions]({{< ref "api-management/gateway-config-tyk-classic" >}}) are used for GraphQL, XML/SOAP and TCP services

{{< note success >}}
**Note**  

For versions of Tyk prior to 5.8 not all Gateway features can be configured using the Tyk OAS API definition, for edge cases you might need to use Tyk Classic for REST APIs, though we recommend updating to Tyk 5.8 and adopting Tyk OAS.
{{< /note >}}


### Migrating to Tyk OAS

In Tyk 4.1, we introduced the Tyk OAS API definition but initially it supported only a subset of the Gateway configuration options offered by Tyk Classic. Since then we have gradually added support until finally, with the launch of Tyk 5.8, we have reached effective parity with Tyk Classic and now recommend that Tyk OAS is used exclusively for REST use cases.

**Tyk 5.8 continues to support Tyk Classic for REST, but we will not be adding support for new features to this API definition style and strongly recommend migrating to Tyk OAS.**

For Tyk Dashboard users with an existing portfolio of Tyk Classic API definitions, we provide a [migration tool]({{< ref "api-management/migrate-from-tyk-classic" >}}), available via the Dashboard API and UI.

### Storing API definitions

For Tyk Open Source users, API definitions should be stored in `.json` files in the following location accessible by the Tyk Gateway:
- `/var/tyk-gateway/apps` (Linux)
- `/opt/tyk-gateway/apps` (Docker)

For Tyk Dashboard users, API definitions will be kept in your [main storage]({{< ref "api-management/dashboard-configuration#data-storage-solutions" >}}).

### A note on terminology

It's important not to confuse the *API proxy* with the API for the upstream service. Typically we refer to *API proxy* or *API* when refering to the endpoints exposed on Tyk Gateway and *upstream* or *upstream API* for the service that you develop and deploy to perform your business logic and data handling.


