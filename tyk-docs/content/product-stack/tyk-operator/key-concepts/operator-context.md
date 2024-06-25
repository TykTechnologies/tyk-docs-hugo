---
title: "Operator Context"
date: 2024-06-25
tags: ["Tyk Operator", "Organisations", "Kubernetes"]
description: "Explains the key concepts for Tyk Operator"
---

## Multi-tenancy in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate [organisations]({{< ref "basic-config-and-security/security/dashboard/organisations">}}) for each team or department. Each organisation is a completely isolated unit with its own:

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
- Which organisation it belongs to
- Which user it is using
- Which environment it is working in

For example, if you have multiple organisations for different teams, each with its own set of users and API Definitions, you can create different `OperatorContext` objects for each team. These contexts are referenced in your API definition or security policy CRDs using `contextRef` field.

During reconciliation, Tyk Operator will use the identity defined in the referenced `OperatorContext` to make requests to the Tyk Dashboard.

{{< img src="/img/operator/tyk-operator-context.svg" alt="Multi-tenancy in Kubernetes Tyk Operator" width="600" >}}