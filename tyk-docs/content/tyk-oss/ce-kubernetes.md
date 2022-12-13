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

## Installing Tyk
The main ways to install the Open Source *Tyk Gateway* in a Kubernetes cluster are via Helm charts or via Kubernetes manifest files. 

### Tyk Helm Charts
This is the preferred way to install Tyk Self-Managed Pro on Kubernetes. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.
Go to [Tyk OSS Helm Charts]({{ ref "tyk-oss-gatewayce-helm-chart" >}}) for detailed installation instructions.

### Kubernetes manifest files

This is not the main support way to install Tyk but we do offer instruction on this installation choice in the repo
 [tyk-oss-k8s-deployment GitHub repo](https://github.com/TykTechnologies/tyk-oss-k8s-deployment).  
For advice and help, reach out via the usual channels, our support team or the [Tyk community forum](https://community.tyk.io/).

### Tyk Operator and Ingress
For GitOps workflow used with the *Tyk Gateway* or setting it as a Kubernetes ingress controller, Tyk Operator enables you to manage API definitions, security policies and other Tyk features using Kubernetes manifest files. 
