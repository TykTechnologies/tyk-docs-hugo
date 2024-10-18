---
title: "Tyk OAS API Definition"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Tyk OAS API Definition"]
description: "Support features of TykOasApiDefinition CRD"
---

The TykOasApiDefinition Custom Resource Definition (CRD) manages [Tyk OAS API Definition object]({{<ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) within a Kubernetes environment. This CRD enables the integration and management of Tyk API definitions using Kubernetes-native tools, simplifying the process of deploying and managing OAS APIs on the Tyk Dashboard.

## TykOasApiDefinition Features

`TykOasApiDefinition` can support all [features of the Tyk OAS API]({{<ref "getting-started/using-oas-definitions/oas-reference">}}). You just need to provide the Tyk OAS API definition via a ConfigMap. In addition to managing the CRUD (Create, Read, Update, Delete) of Tyk OAS API resources, the Tyk Operator helps you better manage resources through object linking to Ingress, Security Policies, and certificates stored as Kubernetes secrets. See below for a list of Operator features and examples:

| Features | Support | Supported From | Comments | Example |
|----------|---------|-----------------|----------|--------|
| API Category | ✅      | v1.0 | - | [Manage API Categories]({{<ref "product-stack/tyk-operator/advanced-configurations/api-categories">}}) |
| API Version | ✅      | v1.0 | - | [Manage API versioning]({{<ref "product-stack/tyk-operator/advanced-configurations/api-versioning">}}) |
| API Ownership via OperatorContext | ✅      | v1.0 | - | [API Ownership]({{<ref "product-stack/tyk-operator/getting-started/tyk-operator-api-ownership">}}) |
| Client Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{<ref "product-stack/tyk-operator/advanced-configurations/tls-certificate">}}) |
| Custom Domain Certificates | ✅      | v1.0 | - | [Manage TLS certificate]({{<ref "product-stack/tyk-operator/advanced-configurations/tls-certificate">}}) |
| Public keys pinning | ✅      | v1.0 | - | [Manage TLS certificate]({{<ref "product-stack/tyk-operator/advanced-configurations/tls-certificate">}}) |
| Upstream mTLS | ✅      | v1.0 | - | [Manage TLS certificate]({{<ref "product-stack/tyk-operator/advanced-configurations/tls-certificate">}}) |
| Kubernetes Ingress | ✅      | v1.0 | - | [Kubernetes Ingress Controller]({{<ref "product-stack/tyk-operator/tyk-ingress-controller">}}) |
| Link with SecurityPolicy | ✅      | v1.0 | - | [Protect an API]({{<ref "tyk-stack/tyk-operator/secure-an-api">}}) |

<!--
## CRD Specification

### Group and Version

- **API Group**: `tyk.tyk.io`
- **Version**: `v1alpha1`

### Resource Naming

- **Kind**: `TykOasApiDefinition`
- **Plural**: `tykoasapidefinitions`
- **Singular**: `tykoasapidefinition`
- **Short Names**: `tykoas`

### Scope

- **Scope**: `Namespaced`

### Additional Printer Columns

- **Domain**: `.status.domain`
- **ListenPath**: `.status.listenPath`
- **Proxy.TargetURL**: `.status.targetURL`
- **Enabled**: `.status.enabled`
- **SyncStatus**: `.status.latestTransaction.status`
- **IngressTemplate**: `.status.ingressTemplate`

## CRD Schema

### TykOasApiDefinition Specification

The specification (`spec`) of a `TykOasApiDefinition` resource defines the desired state of the API definition.

- **categories** (`array` of `string`): Identifiers for API definitions that enable filtering based on these categories.
- **clientCertificate** (`object`):
  - **allowlist** (`array` of `string`): List of Kubernetes secret names for client certificates.
  - **enabled** (`boolean`): Activates mTLS for the API.
- **contextRef** (`object`): Reference to the OperatorContext used for reconciling this API Definition.
  - **kind** (`enum`): Can be `ApiDefinition` or `TykOasApiDefinition`.
  - **name** (`string`): Name of the Kubernetes resource.
  - **namespace** (`string`): Namespace of the targeted resource (optional).
- **customDomain** (`object`): Custom domain configuration.
  - **certificates** (`array` of `string`): Certificate IDs for dynamic loading.
  - **certificatesRef** (`array` of `string`): Kubernetes secrets for certificates.
  - **enabled** (`boolean`): Allows/disallows the usage of the domain.
  - **name** (`string`): Name of the domain.
- **tykOAS** (`object`): Storage information about Tyk OAS.
  - **configmapRef** (`object`):
    - **keyName** (`string`): Key of the ConfigMap where Tyk OAS doc is stored.
    - **name** (`string`): Name of the ConfigMap.
    - **namespace** (`string`): Namespace of the ConfigMap (optional).
- **versioning** (`object`): Versioning information about the OAS API.
  - **default** (`string`): Default version name if no version is specified.
  - **enabled** (`boolean`): Enables versioning of the API.
  - **fallbackToDefault** (`boolean`): Specifies that the default version should be used if the requested version does not exist.
  - **key** (`string`): Name of the key to check for versioning information.
  - **location** (`enum`): `header`, `url-param`, or `url`.
  - **name** (`string`): Name of the version.
  - **stripVersioningData** (`boolean`): Specifies that API responses will be stripped of versioning data.
  - **urlVersioningPattern** (`string`): Regex pattern for versioning identifier format in URLs.
  - **versions** (`array`): List of versions mapping to individual API IDs.

### TykOasApiDefinition Status

The status (`status`) of a `TykOasApiDefinition` resource provides the observed state of the API definition.

- **domain** (`string`): Custom domain used by the API.
- **enabled** (`boolean`): Indicates if the API is enabled.
- **id** (`string`): Unique identifier of the API within Tyk.
- **ingressTemplate** (`boolean`): Shows if this CR is used as an Ingress Template.
- **latestCRDSpecHash** (`string`): Hash of the TykOasApiDefinition CR created on Kubernetes.
- **latestConfigMapHash** (`string`): Hash of the ConfigMap used by TykOasApiDefinition.
- **latestTransaction** (`object`):
  - **error** (`string`): Error occurred at the Tyk API level, if any.
  - **status** (`string`): Status of the last transaction.
  - **time** (`date-time`): Time of the last transaction.
- **latestTykSpecHash** (`string`): Hash of the OAS API Definition created on Tyk.
- **linkedByPolicies** (`array`): List of policies referencing this OAS API Definition.
- **listenPath** (`string`): Base path on Tyk for API requests.
- **name** (`string`): Name of the OAS API within Tyk.
- **targetURL** (`string`): Upstream address for proxying requests.
- **versioningStatus** (`object`): Status of a Versioned TykOasAPIDefinition.
-->