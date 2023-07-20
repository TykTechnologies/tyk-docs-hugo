---
title: "Kubernetes"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install the open source Tyk Gateway using our Kubernetes Helm Chart and the Tyk Operator"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 2
---

### Tyk Helm Charts
The main way to install the Open Source *Tyk Gateway* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.
Go to [Tyk OSS Helm Charts]({{< ref "tyk-oss/ce-helm-chart" >}}) for detailed installation instructions.

### Tyk Operator and Ingress
For GitOps workflow used with the *Tyk Gateway* or setting it as a Kubernetes ingress controller, Tyk Operator enables you to manage API definitions, security policies and other Tyk features using Kubernetes manifest files. To get started go to [Tyk Operator]({{< ref "tyk-stack/tyk-operator/getting-started-tyk-operator.md" >}}).
