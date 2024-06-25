---
title: "Managing Multiple Organisations with Tyk Operator CRDs"
date: 2024-06-25
tags: ["Tyk Operator", "Organisations", "Kubernetes"]
description: "Learn how to use Tyk Operator Custom Resource Definitions (CRDs) to manage multiple organisations within Tyk. This guide explains how to leverage OperatorContext to efficiently manage resources for different teams. Examples and best practices are included for effective multi-tenant API management."
---

This guide explains how to efficiently manage multiple organisations within Tyk using Tyk Operator Custom Resource Definitions (CRDs).

Please consult the [key concepts for Tyk Operator]({{< ref "/product-stack/tyk-operator/key-concepts/key-concepts" >}}) documentation for an overview of the the fundamental concepts of organisations in Tyk, the role of Tyk Operator and the use of OperatorContext to manage resources for different teams effectively.

The guide includes practical examples and best practices for multi-tenant API management. Key topics include defining OperatorContext for connecting and authenticating with a Tyk Dashboard, and using `contextRef` in API Definition objects to ensure configurations are applied within specific organisations. The provided YAML examples illustrate how to set up these configurations.

## Defining OperatorContext

An [OperatorContext]({{< ref "/product-stack/tyk-operator/key-concepts/key-concepts#operatorcontext" >}}) specifies the parameters for connecting and authenticating with a Tyk Dashboard. Below is an example of how to define an `OperatorContext`:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
spec:
  env:
    mode: pro
    auth: foo
    org: alpha
    url: http://dashboard.tyk.svc.cluster.local:3000
    insecureSkipVerify: true
    ingress:
      httpPort: 8000
      httpsPort: 8443
    user_owners:
    - a1b2c3d4e5f6
    user_group_owners:
    - 1a2b3c4d5e6f
```

## Using contextRef in API Definitions

Once an `OperatorContext` is defined, you can reference it in your API Definition objects using `contextRef`. Below is an example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-alpha
spec:
  contextRef:
    name: team-alpha
    namespace: default
  name: httpbin-alpha
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-alpha
    strip_listen_path: true
```

In this example, the `ApiDefinition` object references the `team-alpha` context, ensuring that the configuration is applied within the `alpha` organisation.
