---
title: "Manage API metadata"
date: 2024-06-25
tags: ["Tyk", "Kubernetes", "API Management", "CRD", "DevOps", "API Gateway Configuration"]
description: "This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator. It includes detailed instructions and examples for setting API name, status, category, ID, path, ownership, and versioning within the ApiDefinition Custom Resource Definition (CRD). The guide ensures that users can manage their Tyk API Gateway configurations effectively within a Kubernetes environment."
keywords: ["Tyk Operator", "Kubernetes", "API Gateway", "API Configuration", "API Metadata", "ApiDefinition CRD", "Tyk Dashboard", "API Status", "API Category", "API ID", "API Path", "API Ownership", "API Versioning"]
---

This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator.

## API Name

##### Tyk OAS API

API name can be set through `x-tyk-api-gateway.info.name` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

To set the name of an API in the `ApiDefinition`, use the `spec.name` string field. This name is displayed on the Tyk Dashboard and should concisely describe what the API represents.

Example:

```yaml {linenos=true, linenostart=1, hl_lines=["6-6"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: example-api # This is the metadata name of the Kubernetes resource
spec:
  name: Example API # This is the "API NAME" in Tyk
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://example.com
    listen_path: /example
    strip_listen_path: true
```

## API Status

### API Active Status

An active API will be loaded to the Gateway, while an inactive API will not, resulting in a 404 response when called.

##### Tyk OAS API

API active state can be set through `x-tyk-api-gateway.info.state.active` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

The active status of an API can be set by modifying the `spec.active` configuration parameter. When set to `true`, this enables the API so that Tyk will listen for and process requests made to the `listenPath`. 

```yaml {linenos=true, linenostart=1, hl_lines=["9-9"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: inactive-api
spec:
  name: Inactive API
  use_keyless: true
  protocol: http
  active: false
  proxy:
    target_url: http://inactive.example.com
    listen_path: /inactive
    strip_listen_path: true
```

### API Accessibility

An API can be configured as internal so that external requests are not processed. 

##### Tyk OAS API

API accessibility can be set through `x-tyk-api-gateway.info.state.internal` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

API accessibility can be set through the `spec.internal` configuration parameter as shown in the example below.

```yaml {linenos=true, linenostart=1, hl_lines=["10-10"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: inactive-api
spec:
  name: Inactive API
  use_keyless: true
  protocol: http
  active: true
  internal: true
  proxy:
    target_url: http://inactive.example.com
    listen_path: /inactive
    strip_listen_path: true
```

## API ID

### Creating a new API

If you're creating a new API using Tyk Operator, you don't need to specify the ID. The API ID will be generated in a deterministic way.

##### Tyk OAS API

The generated ID is stored in `status.id` field. Run the following command to inspect generated API ID of a Tyk OAS API.

```bash
% kubectl get tykoasapidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.id}'
ZGVmYXVsdC9wZXRzdG9yZQ
```

In this example, the generated API ID is `ZGVmYXVsdC9wZXRzdG9yZQ`.

##### Tyk Classic API

The generated ID is stored in `status.api_id` field. Run the following command to inspect generated API ID of a Tyk Classic API.

```bash
% kubectl get apidefinition [API_NAME] --namespace [NAMESPACE] -o jsonpath='{.status.api_id}'
ZGVmYXVsdC90ZXN0
```

In this example, the generated API ID is `ZGVmYXVsdC90ZXN0`.

### Updating an existing API

##### Tyk OAS API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `x-tyk-api-gateway.info.id` field in [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc">}}) object.

##### Tyk Classic API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `spec.api_id` field. This way, when you apply the manifest, Tyk Operator will not create a new API in the Dashboard. Instead, it will update the original API with the Kubernetes spec.

Example

```yaml  {linenos=true, linenostart=1, hl_lines=["8-8"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: existing-api
  namespace: default
spec:
  name: Existing API
  api_id: 12345
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://existing.example.com
    listen_path: /existing
    strip_listen_path: true
```

In this example, the API with ID `12345` will be updated according to the provided spec instead of creating a new API.

## API Category

For details on how to configure API category, refer to [Manage API category]({{< ref "product-stack/tyk-operator/advanced-configurations/api-categories" >}})

## API Ownership

To configure API ownership, ensure Tyk Operator is also an owner of the API. This can be done using Operator Context. For details, refer to Tyk Operator [API Ownership]({{< ref "product-stack/tyk-operator/getting-started/tyk-operator-api-ownership">}}).

## API Versioning

For details on how to configure API versions, refer to [configuring API versioning in Tyk Operator]({{< ref "product-stack/tyk-operator/advanced-configurations/api-versioning" >}})