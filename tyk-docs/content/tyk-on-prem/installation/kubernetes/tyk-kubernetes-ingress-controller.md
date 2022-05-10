---
title: As an Ingress Controller with Tyk Operator
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Ingress", "Service Mesh", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes Ingress Controller with the Tyk Operator" 
menu:
  main:
    parent: "Kubernetes "
weight: 2
url: "/tyk-on-prem/kubernetes-ingress"
aliases:
  - /getting-started/installation/with-tyk-on-premises/kubernetes/tyk-kubernetes-ingress-controller/
  - /tyk-on-prem/kubernetes-ingress/
---

Ingress is an API object that manages external access to the services in a cluster, typically HTTP (source [kubernetes.io - ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)).
**Tyk Operator** offers an Ingress Controller, which dynamically manages Tyk ApiDefinition resources as per the ingress spec. 
This way your **Tyk Gateway** is configured as a drop-in replacement for a standard Kubernetes Ingress. 

**Tyk Operator** is also the soon-to-be the preferred way to use Tyk for users who follow GitOps standards. It enables Tyk to be used for managing API Definitions, security policies and other Tyk features.


{{< note success >}}
**Note**

**Tyk Operator** is currently in BETA, and we welcome users to try it out and give us feedback in its [GitHub repository](https://github.com/TykTechnologies/tyk-operator) or via support channel for existing Tyk customers.

{{< /note >}}
