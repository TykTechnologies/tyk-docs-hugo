---
title: Understanding Tyk OAS
date: 2025-04-17
tags: ["Tyk OAS API", "Create", "Update", "Import", "Export", "Versioning", "API Key", "Security Policy"] 
description: CONCEPT GUIDE - This page explains what Tyk OAS is and how it works
---


## Introduction

Tyk OAS is Tyk's implementation of the *OpenAPI Specification* (OAS), providing a standardized way to define, deploy, and manage APIs within the Tyk API Management platform. This approach allows you to leverage industry-standard API descriptions while taking advantage of Tyk's powerful API management capabilities.

This guide explains the core concepts of Tyk OAS, how it relates to the OpenAPI Specification, and how Tyk extends OAS to provide comprehensive API management features.

## What is the OpenAPI Specification?

The OpenAPI Specification (OAS) is a standardized framework for describing RESTful APIs in a machine-readable format, typically using JSON or YAML. It defines how APIs should be documented, including details about:

- Endpoints and operations
- Request/response formats
- Authentication methods
- Error codes and responses

In essence, OAS provides a blueprint for your API—detailing how it behaves and how users or services can interact with it.

### Key Components of OpenAPI

An OpenAPI description consists of several key components:

- **Info**: Metadata about the API (title, version, description)
- **Servers**: Base URLs where the API can be accessed
- **Paths**: API endpoints and their operations (GET, POST, PUT, DELETE)
- **Components**: Reusable schemas, parameters, responses, and security definitions
- **Security**: Authentication and authorization requirements

OpenAPI has become the de facto standard for API documentation because of its consistency, ease of use, and broad tooling support. It allows both developers and machines to interact with APIs more effectively, offering benefits like auto-generated client SDKs, server stubs, and up-to-date documentation.

Tyk supports [OpenAPI Specification v3.0.x](https://spec.openapis.org/oas/v3.0.3).

## How Tyk Implements OAS

While the OpenAPI Specification provides an excellent framework for describing APIs, it doesn't cover all the features needed for comprehensive API management. This is where Tyk OAS comes in.

### The Tyk OAS Approach

Tyk treats the OpenAPI description as the source of truth for the data stored within it. Rather than duplicating this information, Tyk builds upon it by adding a vendor extension that provides additional configuration options for API management.

This approach offers several advantages:

- **Maintain standards compliance**: Your API description remains OAS-compliant
- **Seamless integration**: Work with existing OpenAPI descriptions
- **Single source of truth**: Avoid duplication and inconsistencies
- **Workflow flexibility**: Integrate with your existing development processes

## What is a Tyk OAS API Definition?

A Tyk OAS API definition combines two key elements:

1. **OpenAPI Description**: The standard OAS document describing your API
2. **Tyk Vendor Extension**: A JSON object that extends OAS with Tyk-specific configuration

### OpenAPI Description

The OpenAPI description defines the fundamental aspects of your API:

- API endpoints and operations
- Request and response formats
- Data schemas and models
- Basic security requirements

Tyk interprets this information directly from the OpenAPI description and uses it as the foundation for configuring the API proxy.

### Tyk Vendor Extension

The Tyk Vendor Extension is a JSON object (`x-tyk-api-gateway`) within the Tyk OAS API definition that encapsulates all of the Gateway configuration that is not contained within the OpenAPI description.

It is structured in four main sections:

1. **Info**: Metadata used by Tyk to manage the API proxy, including name, identifiers, status, and version
2. **Server**: Configuration for the client-gateway integration, including listen path and authentication method
3. **Middleware**: Configuration for the gateway's middleware chain, split into API-level and endpoint-level settings
4. **Upstream**: Configuration for the gateway-upstream integration, including targets, load balancing and rate limits

The extension has been designed to have minimal required content. If a feature is not needed for your API (for example, payload transformation), it can be omitted from the API definition. Most features have an `enabled` flag which must be set for Tyk to apply that configuration.

## How Tyk OAS Works

When you deploy a Tyk OAS API, here's what happens:

1. **API Definition Processing**: Tyk reads the combined OpenAPI description and Tyk Vendor Extension
2. **Gateway Configuration**: Tyk configures the API Gateway based on this definition
3. **Request Handling**: When a client makes a request to the API:
   - The Gateway receives the request at the configured listen path
   - Tyk processes the request through its middleware chain
   - The request is forwarded to the upstream service
   - The upstream service responds
   - Tyk processes the response through its middleware chain
   - The Gateway returns the response to the client

The upstream service remains unaware of Tyk Gateway's processing, responding to incoming requests as it would for direct client-to-service communication.

## Tyk OAS vs. Tyk Classic

Tyk supports two API definition formats:

1. **Tyk OAS**: Based on the OpenAPI Specification with Tyk extensions
2. **Tyk Classic**: Tyk's original API definition format

Tyk OAS is recommended for new API development as it offers:

- Standards compliance with OpenAPI
- Better integration with existing API development workflows
- Clearer separation of API description and gateway configuration
- Improved support for modern API development practices

## Next Steps

Now that you understand the core concepts of Tyk OAS, you can:

- [Get started with Tyk OAS](link-to-getting-started) - Create your first Tyk OAS API
- [Learn about working with Tyk OAS](link-to-working-with) - Explore advanced usage scenarios
- [View the Tyk OAS API Definition Reference](link-to-reference) in Developer Support - Access complete technical specifications

---

**Related Resources:**
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) - Official OAS documentation
- [Tyk Gateway Documentation](link-to-gateway-docs) - Learn about Tyk Gateway features
- [API Management Best Practices](link-to-best-practices) - Recommendations for API design and management
