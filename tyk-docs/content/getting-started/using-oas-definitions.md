---
title: "Get Started with Tyk OAS APIs"
date: 2022-07-08
tags: ["Tyk Tutorials", "Getting Started", "First API", "Using OAS definitions"]
description: "Getting started with Tyk OAS APIs"
menu:
  main:
    parent: "Getting Started"
weight: 7
---


### Introduction

The OpenAPI Specification (OAS) is a ‘vendor neutral’ open standard specification for APIs supported by a large number of tools that will help you design and create APIs for your services. You can even generate them from your source code. Tyk supports you to work with APIs that you've designed to the OpenAPI Specification, making it even easier to get your API up and running.

There's lots of detail on how Tyk works with OAS APIs in the dedicated [section]({{< ref "/getting-started/key-concepts/high-level-concepts" >}}) in the docs, but here we offer a series of tutorials that will get you up to speed with using this powerful and flexible feature.

We'll show you how to:
- [Create a Tyk OAS API]({{< ref "/getting-started/using-oas-definitions/create-an-oas-api" >}})
- [Import a Tyk OAS API]({{< ref "/getting-started/using-oas-definitions/import-an-oas-api" >}})
- [Update a Tyk OAS API]({{< ref "/getting-started/using-oas-definitions/update-an-oas-api" >}})
- [Extend your Tyk OAS APIs with Tyk Middleware]({{< ref "/api-management/manage-apis/tyk-oas-api-definition/tyk-oas-middleware" >}})
- [Use versioning with Tyk OAS APIs]({{< ref "/getting-started/using-oas-definitions/versioning-an-oas-api" >}})
- [Export a Tyk OAS API]({{< ref "/getting-started/using-oas-definitions/export-an-oas-api" >}})

{{< note success >}}
**Note**  

Tyk OAS API support is currently in [Early Access]({{< ref "/frequently-asked-questions/using-early-access-features" >}}) and some Tyk features are not yet supported. We are working towards parity with the Tyk Classic API so that you will be able to use this exciting new feature for all use cases. You can see the status of what is and isn't yet supported [here]({{< ref "/getting-started/using-oas-definitions/oas-reference" >}}). 
{{< /note >}}

### Schemas

We have a schema that will allow you to use a 3rd party editor and IDEs when creating a Tyk OAS API Definition. It is available from our [Tyk Schemas GitHub repo](https://raw.githubusercontent.com/TykTechnologies/tyk-schemas/main/JSON/draft-04/schema_TykOasApiDef_3.0.x.json).

### Visual Studio Code Extension
We have published a Tyk VS Code extension that provides Tyk API schema validation and auto-completion (both OAS and other schemas) in the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=TykTechnologiesLimited.tyk-schemas). You can use it to create Tyk objects in your IDE (Tyk API definitions, Key and Tyk config file).

### Community Feedback

We have created an [OAS Category](https://community.tyk.io/c/oas/21) in our [Community Forum](https://community.tyk.io/). Please feel free to start conversations in there and we will help you out.
