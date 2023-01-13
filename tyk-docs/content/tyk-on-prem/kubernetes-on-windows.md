---
publishdate: 2020-03-09
lastmod: 2023-01-13
title: Deploy Tyk Self managed On Windows Using Helm
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Helm", "Windows", "Tyk Self managed", "Tyk Pro", "API Management"]
description: "Guide to install Tyk Self managed on premise using Kubernetes on Windows" 
menu:
  main:
    parent: "Kubernetes "
weight: 3
aliases:
    - /getting-started/installation/with-tyk-on-premises/kubernetes/k8s-docker-pro-wsl/
---

{{< note success >}}
**Note**
  
Installing Tyk on Kubernetes requires a multi-node Tyk licence. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary licence.
{{< /note >}}

{{< warning success >}}
**Warning**  

This deployment is NOT designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [Self-Managed]({{< ref "/content/tyk-self-managed/install.md" >}}) solution, which includes our Gateway, Dashboard and analytics processing pipeline. 

This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and either MongoDB or one of our supported [Self-Managed]({{< ref "/content/tyk-self-managed/install.md" >}}) .

This demo is great for proof of concept and demo purposes, but if you want to test performance, you need to move each component to a separate machine.
{{< /warning >}}

{{< note success >}}
**Note**  

You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.
{{< /note >}}

## Prerequisites

- MS Windows 10 Pro
- [Tyk Helm Chart](https://github.com/TykTechnologies/tyk-helm-chart)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://github.com/helm/helm/releases)
- Git for Windows
- [Python for Windows](https://www.python.org/downloads/windows/)
- PowerShell running as administrator
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk On-Premises [Developer licence](https://tyk.io/product/tyk-on-premises-free-edition/)

Ensure that kubectl and helm prerequisites are configured on your Windows path environment variable

This demo installation was tested with the following tools/versions:

* Microsoft Windows 10 Pro v1909 VM on Azure (Standard D2 v3 size)
* Docker Desktop for Windows 2.2.0.0 (Docker engine v19.03.5)
* helm v3.0.3
* minikube v1.7.1 (k8s v 1.17.2)
* kubectl v 1.17.0 (Note that kubectl is packaged with Docker Desktop for Windows, but the version may be incompatible with k8s)

## Installation

Now you have your prerequisites, follow the instructions from our [Tyk Helm Chart]({{< ref "/content/tyk-self-managed/tyk-helm-chart.md#installation" >}}) page.
