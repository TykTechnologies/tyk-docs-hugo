---
title: "Managing Multiple Organisations with Tyk Operator CRDs"
date: 2024-06-25
tags: ["Tyk Operator", "Organisations", "Kubernetes"]
description: "Learn how to use Tyk Operator Custom Resource Definitions (CRDs) to manage multiple organisations within Tyk. This guide covers the concepts of organisations in Tyk, the role of Tyk Operator, and how to leverage OperatorContext to efficiently manage resources for different teams. Includes examples and best practices for effective multi-tenant API management."
---

## Introduction
This guide explains how to use Tyk Operator Custom Resource Definitions (CRDs) to manage multiple organisations within Tyk. We'll cover the concepts of organisations in Tyk, the role of Tyk Operator, and how to leverage `OperatorContext` to efficiently manage resources for different teams.

## Concepts

### Organisations in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate organisations for each team or department. Each organisation is a completely isolated unit with its own:

- API Definitions
- API Keys
- Users
- Developers
- Domains

This structure is ideal for businesses with a complex hierarchy, where distinct departments operate independently but within the same overall infrastructure.

### Tyk Operator

Tyk Operator is a Kubernetes Controller that manages Tyk Custom Resources (CRs) such as API Definitions and Security Policies. Developers define these resources as CRDs, and Tyk Operator ensures that the desired state is reconciled with the Tyk Dashboard. This involves creating, updating, or deleting API configurations until the target state matches the desired state.

For the Tyk Dashboard, Tyk Operator functions as a system user, bound by Organisation and RBAC rules.

### OperatorContext

OperatorContext is a set of access parameters that define:

- Which Tyk Dashboard the Operator is interacting with
- Which organisation it belongs to
- Which user it is using
- Which environment it is working in

For example, if you have multiple organisations for different teams, each with its own set of users and API Definitions, you can create different `OperatorContext` objects for each team. These contexts are referenced in your API definition or security policy CRDs using `contextRef` field.

During reconciliation, Tyk Operator will use the identity defined in the referenced `OperatorContext` to make requests to the Tyk Dashboard.

## Step-by-Step Guide

### Defining OperatorContext

An `OperatorContext` specifies the parameters for connecting and authenticating with a Tyk Dashboard. Below is an example of how to define an `OperatorContext`:

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

### Using contextRef in API Definitions

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
