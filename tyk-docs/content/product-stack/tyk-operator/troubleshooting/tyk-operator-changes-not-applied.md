---
title: "API changes not applied"
date: 2023-07-19
tags: ["Tyk Operator", "Reconciliation", "Kubernetes"]
description: "How to troubleshoot API changes not applied"
weight: 30
menu:
   main:
      parent: "Tyk Operator"
---

If you experience issues with the behavior of the Tyk Operator (e.g. API changes not being applied), to investigate, you can check the logs of the tyk-operator-controller-manager Deployment's pod in your cluster with the following command:

```console
$ kubectl logs $TYK_CONTROLLER_MANAGER_POD_NAME -n $TYK_OPERATOR_NS manager
```

If the operator webhook cannot be reached, this internal error occurs:

```console
failed calling webhook "mapidefinition.kb.io": failed to call webhook: Post "https://tyk-operator-webhook-service.tyk.svc:443/mutate-tyk-tyk-io-v1alpha1-apidefinition?timeout=10s": context deadline exceeded
Solution:
```
This typically happens when the webhook does not have access to the operator manager service. This is typically due to connectivity issues or if the manager is not up.

Please refer to cert-manager [The Definitive Debugging Guide](https://cert-manager.io/docs/troubleshooting/webhook/#error-context-deadline-exceeded) for the cert-manager Webhook Pod documentation about possible solutions based on your environment (GKE, EKS, etc.)
