---
date: 2017-03-22T16:57:26Z
title: Kubernetes Quickstart
menu:
  main:
    parent: "With Docker"
weight: 3
url: "/getting-started/installation/with-tyk-on-premises/docker/with-kubernetes"
---

There are two main ways to install Tyk on Kubernetes: Via our Helm chart, or manually.

> **NOTE**: Installing Tyk on Kubernetes requires a multi-node Tyk licence. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary licence.

## Prerequisites

### Helm / Tiller

If you are deploying dependency databases or Tyk components via Helm Charts, you will need to ensure that Helm is
installed on your host / bastion machine, and Tiller service account has been created.

Install Tiller (Quickstart)

```
kubectl -n kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account=tiller
```

Uninstall Tiller

```
kubectl -n kube-system delete deployment tiller-deploy
kubectl delete clusterrolebinding tiller
kubectl -n kube-system delete serviceaccount tiller
```

### Redis

Redis needs to be installed inside the Kubernetes cluster, or reachable from inside Kubernetes. To get started quickly, you may use
the following Helm Chart

```
helm repo add tc http://trusted-charts.stackpoint.io
helm repo update
helm install tc/redis --name redis --namespace=redis --set usePassword=false
```

#### GKE allow connection to MemoryStore

MemoryStore is a GCP service for Redis and is alternative to installing to K8s via Helm above.

```
git clone https://github.com/bowei/k8s-custom-iptables.git
cd k8s-custom-iptables/
TARGETS="IP_RANGE_OF_MEMORYSTORE_REDIS" ./install.sh
```

### MongoDB

If you are deploying a Pro or Enterprise version of Tyk (With Dashboard and or MDCB component), you will need to have
a MongoDB installation installed within the Kubernetes cluster, or reachable from inside Kubernetes. To get started quickly, you can
use the following Helm Chart.

```
helm repo add tc http://trusted-charts.stackpoint.io
helm repo update
helm install tc/mongodb-replicaset --name mongodb --namespace=mongodb
```

---

## Tyk Helm Chart

This is the preferred (and easiest) way to install Tyk Pro on Kubernetes, it will install Tyk as an ingress to your K8s cluster, where you can then add new APIs to manage via Tyk Dashboard, or via k8s ingress specifications.

The full instructions on how to [install Tyk via the Helm chart are in the Github Respository](https://github.com/TykTechnologies/tyk-helm-chart)

> The helm chart installs Tyk as a "sharded" deployment, this means that all APIs that get exposed to the outside of the cluster are tagged with the `ingress` tag. If an API is not tagged, it does not get loaded and you may experience `404s`.
> You can set a tag for your exposed services in the API Designer, under the "Advanced Options" tab, the section called `Segment Tags (Node Segmentation)`, this allows you to add new tags. To make an API public, simply add `ingress` to this section, click the "Add" button, and save the API.
>
> If you are using an Ingress spec, then the Tyk K8s controller will do this for you.

## Installing Tyk on Kubernetes Manually

To install Tyk manually, please see the [guide to setting up Tyk on Kubernetes](https://github.com/TykTechnologies/tyk-kubernetes) on Github.

## Tyk Kubernetes Ingress and Service Mesh Controller

We provide a Kubernetes controller that enables Tyk to be used as both a native Ingress controller (expose services using an Ingress specification), and as a service mesh sidecar injector. See [installing and configuring our Ingress and Service Mesh Controller](/docs/get-started/with-tyk-on-premise/installation/docker/with-kubernetes/tyk-kubernetes-ingress-controller/) for more details. The source code for the controller can be seen in our Github repository:

https://github.com/TykTechnologies/tyk-helm-chart#using-the-ingress-controller

## Tyk as a Service Mesh

See [using Tyk as a Service Mesh sidecar injector](/docs/get-started/with-tyk-on-premise/installation/docker/with-kubernetes/tyk-kubernetes-ingress-controller/#using-tyk-for-your-service-mesh) for more details.
