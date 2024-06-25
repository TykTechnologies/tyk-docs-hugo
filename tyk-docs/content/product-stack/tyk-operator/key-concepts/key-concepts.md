---
title: "Key Concepts"
date: 2024-06-25
tags: ["Tyk Operator", "Organisations", "Kubernetes"]
description: "Explains the key concepts for Tyk Operator"
---

To effectively navigate and utilize the Tyk ecosystem, understanding some fundamental concepts is essential.

This section provides an overview of the essential terminology and concepts used throughout the Tyk Operator documentation.

## Organisations in Tyk

Tyk Dashboard is multi-tenant capable, which means you can use a single Tyk Dashboard instance to host separate organisations for each team or department. Each organisation is a completely isolated unit with its own:

- API Definitions
- API Keys
- Users
- Developers
- Domains

This structure is ideal for businesses with a complex hierarchy, where distinct departments operate independently but within the same overall infrastructure.

## Tyk Operator

Tyk Operator is a Kubernetes Controller that manages Tyk Custom Resources (CRs) such as API Definitions and Security Policies. Developers define these resources as CRDs, and Tyk Operator ensures that the desired state is reconciled with the Tyk Dashboard. This involves creating, updating, or deleting API configurations until the target state matches the desired state.

For the Tyk Dashboard, Tyk Operator functions as a system user, bound by Organisation and RBAC rules.

## OperatorContext

OperatorContext is a set of access parameters that define:

- Which Tyk Dashboard the Operator is interacting with
- Which organisation it belongs to
- Which user it is using
- Which environment it is working in

For example, if you have multiple organisations for different teams, each with its own set of users and API Definitions, you can create different `OperatorContext` objects for each team. These contexts are referenced in your API definition or security policy CRDs using `contextRef` field.

During reconciliation, Tyk Operator will use the identity defined in the referenced `OperatorContext` to make requests to the Tyk Dashboard.
