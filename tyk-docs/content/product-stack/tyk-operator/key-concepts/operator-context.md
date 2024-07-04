---
title: "Operator Context"
date: 2024-06-25
tags: ["Tyk Operator", "Organizations", "Kubernetes"]
description: "Explains the key concepts for Tyk Operator"
---

## Multi-tenancy in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate [organizations]({{< ref "basic-config-and-security/security/dashboard/organisations">}}) for each team or department. Each organization is a completely isolated unit with its own:

- API Definitions
- API Keys
- Users
- Developers
- Domain
- Tyk Classic Portal

This structure is ideal for businesses with a complex hierarchy, where distinct departments operate independently but within the same overall infrastructure.

{{< img src="/img/operator/tyk-organisations.svg" alt="Multi-tenancy in Tyk Dashboard" width="600" >}}

## OperatorContext

OperatorContext is a set of access parameters that define:

- Which Tyk Dashboard the Operator is interacting with
- Which organization it belongs to
- Which user it is using
- Which environment it is working in

For example, if you have multiple organizations for different teams, each with its own set of users and API Definitions, you can create different `OperatorContext` objects for each team. These contexts are referenced in your API definition or security policy CRDs using `contextRef` field.

During reconciliation, Tyk Operator will use the identity defined in the referenced `OperatorContext` to make requests to the Tyk Dashboard.

{{< img src="/img/operator/tyk-operator-context.svg" alt="Multi-tenancy in Kubernetes Tyk Operator" width="600" >}}

## Example scenarios

With OperatorContext, you can define different sets of credentials and configuration parameters for different teams or departments, enabling isolated management of API configurations within the same Tyk Operator instance.

Here are some example scenarios that explain what happens:

1. No OperatorContext defined
    - Tyk Operator uses default credentials from the `tyk-operator-conf` secret or environment variables. All API operations are performed under the default system user's credentials.

2. OperatorContext defined but not referenced
    - Tyk Operator still uses default credentials from `tyk-operator-conf` for API operations. The defined OperatorContext is ignored, and operations are conducted using default credentials.

3. OperatorContext defined and referenced
    - Tyk Operator uses the credentials and parameters from the specified OperatorContext for each API. Each API is managed according to its referenced OperatorContext, allowing isolated management.