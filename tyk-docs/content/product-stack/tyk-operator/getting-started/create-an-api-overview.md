---
title: "Overview"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Create an API"]
description: ""
---

The Tyk Operator is a Kubernetes Operator that simplifies and automates the management of API configurations on Tyk Gateway. It allows users to declaratively define, configure, and manage their Tyk APIs using Kubernetes-native tools. With the introduction of Tyk Operator v1.0, users can now choose between two different custom resources for defining their APIs: `ApiDefinition` and `TykOasApiDefinition`.

## Tyk Operator and API Custom Resources

Tyk Operator manages two custom resources to help users create and maintain their API configurations:

1. **TykOasApiDefinition**: Available from Tyk Operator v1.0. It represents a [Tyk OAS API configuration]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}). Tyk OAS API is based on the OpenAPI specification (OAS) and is the recommended format for standard HTTP APIs. Tyk Operator supports all [Tyk OAS API feature]({{<ref "getting-started/using-oas-definitions/oas-reference">}}) as they become available on the Gateway.

2. **ApiDefinition**: Available on all versions of Tyk Operator. It represents a [Tyk Classic API configuration]({{<ref "tyk-gateway-api/api-definition-objects">}}). Tyk Classic API is the traditional format used for defining all APIs in Tyk, and now the recommended format for non-HTTP APIs such as TCP, GraphQL, and Universal Data Graph (UDG). Tyk Operator supports the major features of Tyk Classic API and the feature support details can be tracked at our [reference]({{<ref "product-stack/tyk-operator/reference/api-definition">}}) page.

These custom resources enable users to leverage Kubernetes' declarative configuration management to define, modify, and version their APIs, seamlessly integrating with other Kubernetes-based workflows and tools.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to create and configure APIs with Tyk Operator [here]({{< ref "product-stack/tyk-operator/getting-started/create-an-oas-api" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to create and configure APIs with Tyk Operator [here]({{< ref "tyk-stack/tyk-operator/create-an-api" >}}).