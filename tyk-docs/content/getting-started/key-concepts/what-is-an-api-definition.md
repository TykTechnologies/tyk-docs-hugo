---
date: 2017-03-23T12:53:47Z
Title: What is Tyk API Definition
description: "Explain the concept of Tyk API definiton"
tags: ["Tyk API definiton", "API definiton", "API definiton Object"]
menu:
  main:
    parent: "Key Concepts"
weight: 55
---

Tyk handles your API services through files/objects called *Tyk API Definitions*.

In Tyk, the *Tyk API Definition* is a pivotal configuration object used by the *Tyk API Gateway* to manage and process the inbound requests and outbound responses to and from your actual API service.
This object is a structured JSON that encapsulates essential details such as the API's name, the listen path (clients' URI for accessing the API via the Tyk Gateway), the target URL (where processed requests are directed, this is the user's API service), and settings for authentication, versioning, and Tyk's rich middleware offerings (out-of-the-box plugins) or custom-user plugins which *Tyk Gateway* can execute or enforce to manage the API traffic. All elements of an API configuration in Tyk are encapsulated in this object and according to it, the *Tyk Gateway* execute them for a certain listen path for request and response, per endpoint (of that listen path), method or globally on the all API endpoints.

For global configurations of the gateway that are not related to specific user's API, use the [config file]({{<ref "tyk-oss-gateway/configuration">}})

API Definition objects can be quite compact for a basic pass-through API, and can become very complex and large for APIs that require many operations to be completed before a request is proxied.

### Two Definition Types
*Tyk API Definitions* are written as JSON objects.

We have 2 main type of definitions -
- **Tyk OAS API definiton** - Our new format, complies with the OpenAPI Spec schema according to the OpenAPI Specification standard. It has a [Tyk OAS API definiton Schema](https://github.com/TykTechnologies/tyk-schemas/blob/main/JSON/draft-04) which you can use in your IDE.
- **Tyk Classic API definiton** - Tyk original format. It follows a [Tyk Clasic API Definition Schema](https://github.com/TykTechnologies/tyk-schemas/tree/main/JSON/draft-07) which you can use in your IDE.

### Object Location
- For *Tyk OSS*, which includes only *Tyk Gateway* they resied in `/var/tyk-gateway/apps` (LINUX) or `/opt/tyk-gateway/apps` (Docker).
- For *Tyk Self Managed*, the licensed product, they'll be kept in a MongoDB or PostgreSQL.

### Object Id
API Definitions are identified by their API ID, and Gateway REST calls make reference to this ID where they are used. However, in Dashboard REST calls, an internal ID is used to prevent collisions, and in Dashboard API calls, this API ID must be used when operating on API Configurations.

### Object Fields Documentation
- [Tyk OAS API Definition Objects]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}})
- [Tyk Classic API Definition Objects]({{< ref "tyk-gateway-api/api-definition-objects" >}})

### User's API Service and Tyk API Definition

In contrast to *Tyk API Definition*, the user's actual API service represents the backend service, developed and deployed by users, housing the core business logic and data handling. This service receives requests from the *Tyk API Gateway* after processing based on the *Tyk API Definition*. Crucially, the user's API service remains unaware of the Tyk Gateway's processing layer, responding to incoming requests as in direct client-to-service communication. It implements the API endpoints, resources, and methods providing the service's functionality. It can also have its own OpenAPI document to describe and document itself (which is essencially also another name for *API definition*)

To summarize, the Tyk API Gateway, as a [reverse-proxy](https://en.wikipedia.org/wiki/Reverse_proxy), serves as an intermediary managing API traffic between clients and the user's API service. *Tyk API Definition* guides the gateway in routing, securing, and manipulating API traffic, while the user's API service executes core business logic and returns responses, relayed back to clients by the Tyk API Gateway. This separation allows for clear delineation between the management of API traffic and the execution of core service functionality.