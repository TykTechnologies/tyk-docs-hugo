---
title: "Operator User"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Operator User"]
description: "Explains the key concepts for Tyk Operator"
---

Tyk Operator is a Kubernetes Controller that manages Tyk Custom Resources (CRs) such as API Definitions and Security Policies. Developers define these resources as [Custom Resource (CRs)]({{<ref "product-stack/tyk-operator/key-concepts/custom-resources">}}), and Tyk Operator ensures that the desired state is reconciled with the Tyk Gateway or Dashboard. This involves creating, updating, or deleting API configurations until the target state matches the desired state.

For the Tyk Dashboard, Tyk Operator functions as a system user, bound by Organization and RBAC rules.

During start up, Tyk Operator looks for these keys from `tyk-operator-conf` secret or from the environment variables (listed in the table below).

| Key or Environment Variable | Description  |
|:-----|:-------------|
| `TYK_MODE` | "ce" for OSS or "pro" for licensed users |
| `TYK_URL` | URL of Tyk Gateway or Dashboard API |
| `TYK_ORG` | Organization ID of Operator user |
| `TYK_AUTH` | API key of Operator user |

These would be the default credentials Tyk Operator uses to connect to Tyk.

## Multi-tenancy in Tyk Operator

Tyk Operator is a cluster resource, and it is not safe to run multiple Tyk Operator deployments in a single cluster. However, this raises the question of how to handle scenarios where multiple teams or departments need to manage their own API configurations using different credentials.

While you cannot run multiple instances of Tyk Operator in a single cluster, you can achieve multi-tenancy by leveraging OperatorContext. OperatorContext allows you to define different sets of credentials and configuration parameters for different teams or departments, enabling isolated management of API configurations within the same Tyk Operator instance. Check [Operator Context]({{< ref "product-stack/tyk-operator/key-concepts/operator-context" >}}) for more information.