---
title: "Overview"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Secure an API"]
description: ""
---

One of the critical aspects of API management is securing your APIs with authentication and authorization. This section provides an understanding of how to use Tyk Operator to secure your Tyk OAS APIs or Tyk Classic APIs.

## Securing APIs using Tyk Operator

Tyk Operator supports configuration of Tyk OAS APIs and Tyk Classic APIs with 2 different custom resources definition (CRD):

1. **TykOasApiDefinition**: For Tyk OAS APIs, the `TykOasApiDefinition` CRD is used to manage and configure the API. To secure an Tyk OAS API with authentication, you need to update the referenced Tyk OAS API Definition, which is stored in a ConfigMap in JSON format, as illustrated in the [Getting started tutorial]({{< ref "product-stack/tyk-operator/getting-started/secure-an-oas-api" >}}).

    Tyk Operator can support [all authentication types]({{<ref "getting-started/key-concepts/authentication">}}) of a Tyk OAS API.

2. **ApiDefinition**: For APIs defined using the Classic format, the `ApiDefinition` CRD is used. Unlike the OAS API format, the `ApiDefinition` CRD is a strongly-typed custom resource that directly exposes fields for configuring different types of authentication methods supported by Tyk.

    In the Secure Tyk Classic API section, we have included a [step by step guide]({{< ref "tyk-stack/tyk-operator/access-an-api" >}}), and [example manifests for different authentication types]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication">}}).

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to secure APIs with Tyk Operator [here]({{< ref "product-stack/tyk-operator/getting-started/secure-an-oas-api" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to secure APIs with Tyk Operator [here]({{< ref "tyk-stack/tyk-operator/access-an-api" >}}).