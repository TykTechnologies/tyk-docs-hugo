---
title: "Security Policy"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Security Policy"]
description: "Support features of SecurityPolicy CRD"
---

The SecurityPolicy custom resource defines configuration of [Tyk Security Policy object]({{<ref "basic-config-and-security/security/security-policies">}}).
Here are the supported features:

| Feature                                                   | Supported                                                      |
|-----------------------------------------------------------|----------------------------------------------------------------|
| API Access                     | ✅ |
| Rate Limit, Throttling, Quotas | ✅ |
| Meta Data & Tags           | ✅ |
| Path based permissions     | ✅ |
| Partitions                 | ✅ |
| Per API limit              | ❌ |

Consult [Security Policy CRD]({{<ref "tyk-stack/tyk-operator/secure-an-api#securitypolicy-crd">}}) to see examples of setting these features.