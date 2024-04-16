---
title: "OAS Glossary"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "OAS Glossary"]
description: "OAS glossary of terms"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 7
---

### OpenAPI Specification (OAS)

The [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) is an open standard specification managed by the [OpenAPI Initiative](https://www.openapis.org) that describes a language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. 

### OpenAPI Description

An [OpenAPI Description](https://learn.openapis.org/specification/structure.html) is an instance of the OpenAPI Specification that describes a service. This is vendor (i.e. API Gateway) agnostic and so, on its own, is not sufficient to configure an API Gateway such as Tyk. Typically you would ‘import’ this into Tyk to convert it into a Tyk OAS API definition by addition of the Tyk vendor fields. You could also add the appropriate fields manually in your editor of choice.

### OpenAPI Document

A file (usually in JSON or YAML format) containing an OpenAPI Description. There is an option to export a Tyk OAS API Definition from Tyk as an OpenAPI Document. This provides all the information a developer needs to use the API, without the Tyk configuration fields they don’t need to know about.

### Tyk OAS API definition

An API definition that combines an OpenAPI Description with the Tyk vendor fields (`x-tyk-api-gateway`) that provide the instructions on how Tyk should be configured to resolve calls made to the API that is described in the OAS part. The structure of the Tyk OAS API definition is documented [here]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}).

### Tyk Classic API definition

An API definition written in Tyk’s proprietary API Specification format. This fully describes how Tyk should be configured to resolve calls made to the API. An example of the structure of the Tyk Classic API definition is provided [here]({{< ref "tyk-gateway-api/api-definition-objects" >}}).