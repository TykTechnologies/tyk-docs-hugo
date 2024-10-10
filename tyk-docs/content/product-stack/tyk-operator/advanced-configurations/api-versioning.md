---
title: "API Versioning"
date: 2024-09-12
tags: ["Tyk", "Kubernetes", "API Versioning"]
description: "This documentation provides a comprehensive guide on configuring API versioning within the ApiDefinition custom resource definition (CRD) using Tyk Operator."
keywords: ["Tyk Operator", "Kubernetes", "API Versioning"]
---

[API versioning]({{<ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning">}}) are configured differently for [Tyk OAS APIs](#tyk-oas-api) and [Tyk Classic APIs](#tyk-classic-api). Please see below for examples.

## Configuring API Version in Tyk OAS API Definition{#tyk-oas-api}

In the [Tyk OAS API Definition]({{<ref "getting-started/key-concepts/oas-versioning#configuring-api-versioning-in-the-tyk-oas-api-definition">}}), versioning can be configured via `x-tyk-api-gateway.versioning` object of the Base API, where the child API's IDs are specified. In the Kubernetes environment with Tyk Operator, where we reference API resources through its Kubernetes name and namespace, this is not desired. Therefore, we add support for versioning configurations through the field `versioning` in `TykOasApiDefinition` custom resource definition (CRD).

Here's an example:

```yaml{linenos=true, linenostart=1, hl_lines=["12-24"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: order-api
  namespace: default
spec:
  tykOAS:
    configmapRef:
      namespace: default
      name: order-api
      keyName: order-api-definition-v1.json
  versioning:
    enabled: true
    location: header
    key: x-api-version
    name: v1
    default: v1
    fallbackToDefault: true
    stripVersioningData: true
    versions:
      - name: v2
        tykOasApiDefinitionRef:
          name: order-api-v2
          namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: order-api-v2
  namespace: default
spec:
  tykOAS:
    configmapRef:
      namespace: default
      name: order-api-v2
      keyName: order-api-definition-v2.json
```

In this example, two different versions of an API are defined: `order-api` (v1) and `order-api-v2` (v2).

`versioning` is configured at `order-api` (v1), the Base API, and it has similiar structure as [Tyk OAS API Definition]({{<ref "getting-started/key-concepts/oas-versioning#configuring-api-versioning-in-the-tyk-oas-api-definition">}}):

- `versioning`: This object configures API versioning for the `order-api`.
    - `enabled`: Set to true to enable versioning.
    - `name`: an identifier for this version of the API (v1).
    - `default`: Specifies the default version (v1), which will be used if no version is specified in the request.
    - `location`: Specifies where the version key is expected (in this case, in the header). It can be set to `header` or `url-param`.
    - `key`: Specifies the versioning identifier key (`x-api-version`) to identify the version. In this example, the version is determined by an HTTP header named `x-api-version`.
    - `fallbackToDefault`: When set to true, if an unspecified or invalid version is requested, the default version (v1) will be used.
    - `stripVersioningData`: When true, removes versioning identifier (like headers or query parameters) from the upstream request to avoid exposing internal versioning details.
    - `urlVersioningPattern`: Specifies a regex that matches the format that you use for the versioning identifier (name) if you are using stripVersioningData and fallBackToDefault with location=url with Tyk 5.5.0 or later
    - `versions`: Defines the list of API versions available:
        - `name`: an identifier for this version of the API (v2).
        - `tykOasApiDefinitionRef`: Refers to a separate TykOasApiDefinition resource that represent a new API version.
          - `name`: Kubernetes metadata name of the resource (`order-api-v2`).
          - `namespace`: Kubernetes metadata namespace of the resource (`default`).

With Tyk Operator, you can easily associate different versions of your APIs using their Kubernetes names. This eliminates the need to include versioning information directly within the base API's definition (`x-tyk-api-gateway.versioning` object), which typically requires referencing specific API IDs. Instead, the Operator allows you to manage versioning declaratively in the `TykOasApiDefinition` CRD, using the `versioning` field to specify versions and their Kubernetes references (names and namespaces).

When using the CRD for versioning configuration, you don't have to worry about knowing or managing the unique API IDs within Tyk. The Tyk Operator handles the actual API definition configuration behind the scenes, reducing the complexity of version management.

In case if there is original versioning information in the base API Definition, the versioning information will be kept and be merged with what is specified in CRD. If there are conflicts between the OAS API Definition and CRD, we will make use of CRD values as the final configuration. 

Tyk Operator would also protect you from accidentally deleting a version of an API that is being referenced by another API, maintaining your API integrity.

## Configuring API Version in Tyk Classic API Definition{#tyk-classic-api}

For Tyk Classic API, versioning can be configured via `ApiDefinition` custom resource definition (CRD). See [Tyk Classic versioning]({{<ref "getting-started/key-concepts/versioning">}}) for a comprehensive example of configuring API versioning for Tyk Classic API with Tyk Operator.
