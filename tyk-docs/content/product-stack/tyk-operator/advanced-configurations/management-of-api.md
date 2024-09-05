---
title: "Management of APIs"
date: 2024-06-25
tags: ["Tyk", "Kubernetes", "API Management", "CRD", "DevOps", "API Gateway Configuration"]
description: "This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator. It includes detailed instructions and examples for setting API name, status, category, ID, path, ownership, and versioning within the ApiDefinition Custom Resource Definition (CRD). The guide ensures that users can manage their Tyk API Gateway configurations effectively within a Kubernetes environment."
keywords: ["Tyk Operator", "Kubernetes", "API Gateway", "API Configuration", "API Metadata", "ApiDefinition CRD", "Tyk Dashboard", "API Status", "API Category", "API ID", "API Path", "API Ownership", "API Versioning"]
---

This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator.

## API Name

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

An API can be configured as internal so that external requests are not processed. This is achieved by setting the `spec.internal`configuration parameter as shown in the example below.


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

## API Category

For a Tyk Classic API, you can specify the category name using the `spec.name` field with a `#` qualifier. This will categorize the API in the Tyk Dashboard.

Example

```yaml  {linenos=true, linenostart=1, hl_lines=["6-6"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: categorized-api
spec:
  name: "my-classic-api #global #staging"
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://categorized.example.com
    listen_path: /categorized
    strip_listen_path: true
```

## API ID

### Creating a new API

If you're creating a new API using Tyk Operator, you don't need to specify the ID in the manifest. The API ID will be generated in a deterministic way. You can inspect `status.api_id` field to get the generated API ID.

Example

```yaml  {linenos=true, linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: order
  namespace: shop
spec:
  name: Order API
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://order.example.com
    listen_path: /order
    strip_listen_path: true
```

Run the following command to inspect generated API ID.

```bash
% kubectl get apidefinition order --namespace shop -o yaml | grep api_id -B 1
status:
  api_id: c2hvcC9vcmRlcg
```

### Updating an existing API

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

## API Ownership

To configure API ownership, ensure Tyk Operator is also an owner of the API. This can be done using Operator Context. For details, refer to Tyk [Operator API Ownership]({{< ref "product-stack/tyk-operator/getting-started/tyk-operator-api-ownership">}}).

## API Versioning

For details on how to configure API versions, refer to [configuring API versioning in Tyk Operator]({{< ref "getting-started/key-concepts/versioning#tyk-operator" >}})