---
title: "API Categories"
date: 2024-09-12
tags: ["Tyk", "Kubernetes", "API Category"]
description: "This documentation provides a comprehensive guide on configuring API category within the ApiDefinition Custom Resource Definition (CRD) using Tyk Operator."
keywords: ["Tyk Operator", "Kubernetes", "API Category"]
---

[API categories]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories">}}) are configured differently for Tyk OAS APIs and Tyk Classic APIs. Please see below for examples.

##### Tyk OAS API

API categories can be specified through `categories` field in `TykOasApiDefinition` CRD.

Here's an example:

```yaml  {linenos=true, linenostart=1, hl_lines=["7-9"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: oas-api-with-categories
  namespace: tyk
spec:
  categories:
  - category 1
  - category 2
  tykOAS:
    configmapRef:
      keyName: oas-api-definition.json
      name: tyk-oas-api-config
      namespace: tyk
```

##### Tyk Classic API

For a Tyk Classic API, you can specify the category name using the `name` field with a `#` qualifier. This will categorize the API in the Tyk Dashboard. See [How API categories work]({{<ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#tyk-classic-apis">}}) to learn about limitations on API names.

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