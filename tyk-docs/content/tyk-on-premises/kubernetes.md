---
date: 2017-03-22T16:57:26Z
title: "Kubernetes "
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 2
aliases:
  - /getting-started/installation/with-tyk-on-premises/kubernetes
  - /tyk-on-premises/kubernetes
---

The main way to install *Tyk Self-Managed* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.
<<<<<<< HEAD
Go to [Tyk Helm Charts]({{< ref "/content/tyk-self-managed/tyk-helm-chart.md" >}}) for detailed installation instructions.
=======

Get started with one of our quick start guides:

- [Quick Start with PostgreSQL]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql">}})
- [Quick Start with MongoDB]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-mongodb">}})

Or go to [Tyk Stack helm chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}) for detailed installation instructions and configuration options.
>>>>>>> 3bf25a74... [DX-1015,DX-1036] Create Tyk Charts Product Stack Section (Creates new helm chart structure in Product Stack section) (#4076)

## Tyk Operator and Ingress 
For a GitOps workflow used with a **Tyk Self-Managed** installation or setting the Tyk Gateway as a Kubernetes ingress controller, Tyk Operator enables you to manage API definitions, security policies and other Tyk features using Kubernetes manifest files.
To get started go to [Tyk Operator]({{< ref "tyk-stack/tyk-operator/getting-started-tyk-operator.md" >}}).
