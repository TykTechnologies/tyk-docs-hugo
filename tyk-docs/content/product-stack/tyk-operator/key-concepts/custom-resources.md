---
title: "Kubernetes Custom Resources"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Operator User"]
description: "Explains the key concepts for Tyk Operator"
---

In Kubernetes, a [Custom Resource (CR)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) is an extension of the Kubernetes API that allows you to introduce custom objects in your cluster. Custom Resources enable you to define and manage custom configurations and settings specific to your applications, making Kubernetes highly extensible. These custom objects are defined using Custom Resource Definitions (CRDs), which specify the schema and structure of the resource.

## Custom Resources in Tyk

Tyk supports several custom resources to help manage and configure API gateways within Kubernetes. These custom resources allow you to declaratively manage Tyk API configurations, security policies, and more.

### API Definition and Security Policy

The following custom resources can be used to configure APIs and policies at [Tyk Gateway]({{<ref "tyk-oss-gateway">}}) or [Tyk Dashboard]({{<ref "tyk-dashboard">}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| TykOasApiDefinition| tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk OAS API Definition object]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}})                                 |
| ApiDefinition      | tyk.tyk.io  | v1alpha1  | Defines configuration of [Tyk Classic API Definition object]({{<ref "tyk-gateway-api/api-definition-objects">}})                                 |
| SecurityPolicy     | tyk.tyk.io  | v1alpha1  | Defines configuration of [security policies]({{<ref "getting-started/key-concepts/what-is-a-security-policy">}}). Operator supports linking ApiDefinition custom resources in SecurityPolicy's access list so that API IDs do not need to be hardcoded in the resource manifest.        |
| SubGraph           | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation subgraph]({{<ref "getting-started/key-concepts/graphql-federation#subgraphs-and-supergraphs">}}).                                           |
| SuperGraph         | tyk.tyk.io  | v1alpha1  | Defines a [GraphQL federation supergraph]({{<ref "getting-started/key-concepts/graphql-federation#subgraphs-and-supergraphs">}}).                                        |
| OperatorContext    | tyk.tyk.io  | v1alpha1  | Manages the context in which the Tyk Operator operates, affecting its overall behavior and environment. See [Operator Context]({{<ref "product-stack/tyk-operator/key-concepts/operator-context">}}) for details. |

### Tyk Classic Developer Portal

The following custom resources can be used to configure [Tyk Classic Developer Portal]({{<ref "tyk-developer-portal/tyk-portal-classic">}}).

| Kind               | Group       | Version   | Description                                                                                       |
|--------------------|-------------|-----------|---------------------------------------------------------------------------------------------------|
| APIDescription     | tyk.tyk.io  | v1alpha1  | Configures [Portal Documentation]({{<ref "tyk-apis/tyk-portal-api/portal-documentation">}}). |
| PortalAPICatalogue | tyk.tyk.io  | v1alpha1  | Configures [Portal API Catalogue]({{<ref "getting-started/key-concepts/api-catalogue">}}). |
| PortalConfig       | tyk.tyk.io  | v1alpha1  | Configures [Portal Configuration]({{<ref "tyk-apis/tyk-portal-api/portal-configuration">}}). |

## CRD Versioning

Tyk follows standard practices for naming and versioning custom resources as outlined by the Kubernetes Custom Resource Definition [versioning guidelines](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/). Although we are currently on the `v1alpha1` version, no breaking changes will be introduced to existing Custom Resources without a version bump. This means that any significant changes or updates that could impact existing resources will result in a new version (e.g., `v1beta1` or `v1`) and Operator will continue supporting all CRD versions for a reasonable time before deprecating an older version. This ensures a smooth transition and compatibility, allowing you to upgrade without disrupting your current configurations and workflows.

For more details on Kubernetes CRD versioning practices, refer to the Kubernetes Custom Resource Definition [Versioning documentation](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/).
