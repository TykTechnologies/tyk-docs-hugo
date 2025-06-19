---
title: "Tyk OAS"
date: 2025-01-10
tags: ["Gateway", "Configuration", "Tyk OAS", "Tyk OAS API Definition", "Tyk OAS API Definition Object",]
description: "How to configure Tyk OAS API Definition"
keywords: ["Gateway", "Configuration", "Tyk OAS", "Tyk OAS API Definition", "Tyk OAS API Definition Object",]
aliases:
  - /tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc
  - /getting-started/key-concepts/openapi-specification
  - /getting-started/key-concepts/oas-api-definitions
  - /getting-started/key-concepts/low-level-concepts
  - /getting-started/key-concepts/servers
  - /getting-started/key-concepts/authentication
  - /getting-started/key-concepts/paths
  - /getting-started/using-oas-definitions/oas-reference
  - /getting-started/using-oas-definitions/oas-glossary
---

## Introduction to Tyk OAS

The upstream service receives requests from Tyk to the *upstream API* after processing based on the configuration applied in the Tyk API definition. Crucially the upstream service remains unaware of Tyk Gateway's processing, responding to incoming requests as it would for direct client-to-service communication. The *API proxy* deployed on Tyk is typically designed to have the same API endpoints, resources and methods that are defined for the upstream service's API. The *upstream API* will often be described according to the industry standard OpenAPI Specification - and this is where Tyk OAS comes in.

### What is the OpenAPI Specification?

The *OpenAPI Specification* (OAS) is a standardized framework for describing RESTful APIs in a machine-readable format (typically JSON or YAML). It defines how APIs should be documented, including details about endpoints, request/response formats, authentication, and error codes. In short, OAS is a blueprint for your API—detailing how the API behaves and how users or services can interact with it. The *OpenAPI Description* (OAD) is the actual content that adheres to this specification, essentially an object that describes the specific functionality of an API. The *OpenAPI Document* refers to a file that contains an OpenAPI description, following the OAS format.

OpenAPI has become the de facto standard for API documentation because of its consistency, ease of use, and broad tooling support. It allows both developers and machines to interact with APIs more effectively, offering benefits like auto-generated client SDKs, server stubs, and up-to-date documentation. Tools such as Tyk also support validation, testing, and mock servers, which speeds up development and ensures consistency across API implementations.

Tyk supports [OpenAPI Specification v3.0.x](https://spec.openapis.org/oas/v3.0.3).

### What is a Tyk OAS API definition?

Not every feature of an advanced API management platform such as Tyk is covered by the OpenAPI Specification. The *API definition* must provide Tyk with everything it needs to receive and process requests on behalf of the upstream service - so the OpenAPI description of the upstream API is not enough on its own to configure the Gateway. This is where the *Tyk Vendor Extension* comes in, allowing you to configure all the powerful features of Tyk Gateway that are not covered by OAS.

The [Tyk Vendor Extension]({{< ref "#tyk-vendor-extension" >}}) follows the same architectural style as the OpenAPI Specification and is encapsulated in a single object that is appended to the OpenAPI description, creating a *Tyk OAS API definition*.

#### OpenAPI description

There are many great explanations of the features and capabilities of the OpenAPI Specification so we won't repeat it all here. A good place to start learning is from the maintainers of the specification: the [OpenAPI Initiative](https://learn.openapis.org/). The minimal set of elements that must be defined

Tyk treats the OpenAPI description as the source of truth for the data stored within it. This means that Tyk does not duplicate those data in the Tyk Vendor Extension but rather builds upon the basic configuration defined in the OAD.

#### Tyk Vendor Extension

The Tyk Vendor Extension is a JSON object (`x-tyk-api-gateway`) within the Tyk OAS API definition that encapsulates all of the Gateway configuration that is not contained within the OpenAPI description.

It is structured in four sections:

- `info` containing metadata used by Tyk to manage the API proxy, including name, identifiers, status, and version
- `server` contains configuration for the client-gateway integration, including listen path and authentication method
- `middleware` contains configuration for the gateway's middleware chain, split into API-level and endpoint-level settings
- `upstream` contains configuration for the gateway-upstream integration, including targets, load balancing and rate limits

The extension has been designed, as has OAS, to have minimal content so if a feature is not required for your API (for example, payload transformation) then this can be omitted from the API definition. Most features have an `enabled` flag which must be set for Tyk to apply that configuration. This can be used to include settings in the API definition and enable them only when required (useful during API development, testing and debug).

In the OpenAPI Specification *paths* define the API endpoints, while *operations* specify the HTTP methods (GET, POST, PUT, DELETE) and actions for each endpoint. They describe how the API handles requests, including parameters, request bodies, responses, and status codes, providing a clear structure for API interactions. Tyk interprets this information directly from the OpenAPI description and uses the `operationID` field to link the endpoint level middleware configuration within the Tyk Vendor Extension to the appropriate endpoint.

### Modifying the OpenAPI description

Tyk will only make additions or modifications to the OAD when the user makes certain changes in the Tyk API Designer and as follows:

- The URL on Tyk Gateway to which client requests should be sent will be added at the first location in the `servers` list
- The OpenAPI Specification declares `paths` which describe the available endpoints (paths) and the operations that can be performed on them (such as `GET`, `POST`, `PUT`, `DELETE`). Tyk will modify this list if changes are made using the Tyk API Designer, for example if an endpoint is added.

Where Tyk might modify the OpenAPI description, this is noted in the appropriate section of the documentation.

If changes are made via the Tyk API Designer that impact the OpenAPI description, we recommend that you export the OAD from Tyk to store in your source of truth repository. This ensures that your records outside Tyk accurately reflect the API that is consumed by your clients (for example, if you publish documentation from the OpenAPI Specification of your API).

Equally, if you make changes to your OpenAPI description outside Tyk, we provide a simple method to update (or patch) your Tyk API definition with the updated OAD. Alternatively you might prefer to create a new version of your API for the updated OpenAPI description, depending on the current stage of the API in its lifecycle.


{{< include "x-tyk-gateway" >}}

