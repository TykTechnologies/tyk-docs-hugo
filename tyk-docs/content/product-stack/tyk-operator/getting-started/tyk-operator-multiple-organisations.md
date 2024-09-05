---
title: "Managing Multiple Organizations with OperatorContext"
date: 2024-06-25
tags: ["Tyk Operator", "Environments", "Organizations", "Kubernetes"]
description: "Learn how to use Tyk Operator Custom Resource Definitions (CRDs) to manage multiple organizations within Tyk. This guide explains how to leverage OperatorContext to efficiently manage resources for different teams. Examples and best practices are included for effective multi-tenant API management."
---

This guide explains how to efficiently manage multiple organizations within Tyk using Tyk Operator Custom Resource Definitions (CRDs).

Please consult the [key concepts for Tyk Operator]({{< ref "/product-stack/tyk-operator/key-concepts/operator-context" >}}) documentation for an overview of the fundamental concepts of organizations in Tyk and the use of OperatorContext to manage resources for different teams effectively.

The guide includes practical examples and best practices for multi-tenant API management. Key topics include defining OperatorContext for connecting and authenticating with a Tyk Dashboard, and using `contextRef` in API Definition objects to ensure configurations are applied within specific organizations. The provided YAML examples illustrate how to set up these configurations.

## Defining OperatorContext

An [OperatorContext]({{< ref "/product-stack/tyk-operator/key-concepts/operator-context" >}}) specifies the parameters for connecting and authenticating with a Tyk Dashboard. Below is an example of how to define an `OperatorContext`:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
  namespace: default
spec:
  env:
    # The mode of the admin api
    # ce - community edition (open source gateway)
    # pro - dashboard (requires a license)
    mode: pro
    # Org ID to use
    org: *YOUR_ORGANIZATION_ID*
    # The authorization token this will be set in x-tyk-authorization header on the
    # client while talking to the admin api
    auth: *YOUR_API_ACCESS_KEY*
    # The url to the Tyk Dashboard API
    url: http://dashboard.tyk.svc.cluster.local:3000
    # Set this to true if you want to skip tls certificate and host name verification
    # this should only be used in testing
    insecureSkipVerify: true
    # For ingress the operator creates and manages ApiDefinition resources, use this to configure
    # which ports the ApiDefinition resources managed by the ingress controller binds to.
    # Use this to override default ingress http and https port
    ingress:
      httpPort: 8000
      httpsPort: 8443
```

## Using contextRef in API Definitions

Once an `OperatorContext` is defined, you can reference it in your API Definition objects using `contextRef`. Below is an example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
  namespace: alpha
spec:
  contextRef:
    name: team-alpha
    namespace: default
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

In this example, the `ApiDefinition` object references the `team-alpha` context, ensuring that the configuration is applied within the `alpha` organization.