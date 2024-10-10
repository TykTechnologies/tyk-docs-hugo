---
title: "Security Policy"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Security Policy"]
description: "Support features of SecurityPolicy CRD"
---

The SecurityPolicy custom resource defines configuration of [Tyk Security Policy object]({{<ref "basic-config-and-security/security/security-policies">}}).

Here are the supported features:

| Features                       | Support   | Supported From | Example |
|--------------------------------|-----------|----------------|---------|
| API Access                     | ✅        | v0.1           | [API Access]({{<ref "tyk-stack/tyk-operator/secure-an-api#security-policy-manifest">}})        |
| Rate Limit, Throttling, Quotas | ✅        | v0.1           | [Rate Limit, Throttling, Quotas]({{<ref "tyk-stack/tyk-operator/secure-an-api#security-policy-manifest">}})        |
| Meta Data & Tags               | ✅        | v0.1           | [Tags and Meta-data]({{<ref "tyk-stack/tyk-operator/secure-an-api#security-policy-manifest">}})        |
| Path and Method based permissions | ✅     | v0.1           | [Path based permission]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#path-based-permissions">}})        |
| Partitions                     | ✅        | v0.1           | [Partitioned policies]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#partitioned-policies">}})       |
| Per API limit                  | ✅        | v1.0           | [Per API Limit]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#per-api-limit">}})        |
| Per-Endpoint limit             | ✅        | v1.0           | [Per Endpoint Limit]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#per-api-limit">}})        |

Consult [Protect an API with a Security Policy]({{<ref "tyk-stack/tyk-operator/secure-an-api">}}) and [Security Policy example]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example">}}) to see examples of setting these features.