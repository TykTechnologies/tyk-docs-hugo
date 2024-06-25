---
title: "Key Concepts"
date: 2024-06-25
tags: ["Tyk Operator", "Organisations", "Kubernetes"]
description: "Explains the key concepts for Tyk Operator"
---

To effectively navigate and utilize the Tyk ecosystem, understanding some fundamental concepts is essential.

This section provides an overview of the essential terminology and concepts used throughout the Tyk Operator documentation.

## Operator User

Tyk Operator is a Kubernetes Controller that manages Tyk Custom Resources (CRs) such as API Definitions and Security Policies. Developers define these resources as [Custom Resource Definitions (CRDs)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/), and Tyk Operator ensures that the desired state is reconciled with the Tyk Gateway or Dashboard. This involves creating, updating, or deleting API configurations until the target state matches the desired state.

For the Tyk Dashboard, Tyk Operator functions as a system user, bound by Organisation and RBAC rules.

During start up, Tyk Operator looks for these keys from `tyk-operator-conf` secret or from the environment variables and use these credentails to connect to Tyk.

| Key or Environment Variable | Description  |
|:-----|:-------------|
| `TYK_MODE` | “ce” for OSS or "pro" for licensed users |
| `TYK_URL` | URL of Tyk Gateway or Dashboard API |
| `TYK_ORG` | Organisation ID of Operator user |
| `TYK_AUTH` | API key of Operator user |