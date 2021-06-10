---
publishdate: 2020-03-09
lastmod: 2020-03-09
title: Kubernetes Docker Pro Demo on Windows
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart"]
description: "How to install Tyk in a self-managed environment using Kubernetes on Windows" 
menu:
  main:
    parent: "With Kubernetes"
weight: 3
url: "/tyk-on-prem/kubernetes-on-windows"
aliases:
    - /getting-started/installation/with-tyk-on-premises/with-kubernetes/k8s-docker-pro-wsl/
---

{{< note success >}}
**Note**
  
Installing Tyk on Kubernetes requires a multi-node Tyk licence. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary licence.
{{< /note >}}

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [On-Premises](https://tyk.io/api-gateway/on-premise/) solution, which includes our Gateway, Dashboard and analytics processing pipeline. 

This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. 

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



## Step One - Clone the Repo

Clone the repo above to a location on your machine.

```{.copyWrapper}
git clone https://github.com/TykTechnologies/tyk-helm-chart.git
cd tyk-helm-chart
```

## Step Two - Start the minikube cluster

```{.copyWrapper}
minikube start
```

{{< note success >}}
**Note**  

You may need to include `vm-driver` option, e.g. `minikube start --vm-driver=hyperv`.  See: https://minikube.sigs.k8s.io/docs/start/windows/ for more details
{{< /note >}}



## Step Three - View your running pods

```{.copyWrapper}
kubectl get pods --all-namespaces
```

## Step Four - Update Helm

```{.copyWrapper}
helm repo add stable https://charts.helm.sh/stable
helm repo update
```

## Step Five - Create tyk namespace

```{.copyWrapper}
kubectl create namespace tyk-ingress
```

## Step Six - Install MongoDB

```{.copyWrapper}
helm install tyk-mongo stable/mongodb --set "replicaSet.enabled=true" -n tyk-ingress
(follow notes from the installation output to get connection details)

export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace tyk-ingress tyk-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)
```

## Step Seven - Install Redis

```{.copyWrapper}
helm install tyk-redis stable/redis -n tyk-ingress
(follow notes from the installation output to get connection details)

export REDIS_PASSWORD=$(kubectl get secret --namespace tyk-ingress tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

## Step Eight - Amend your Tyk Pro settings

In the tyk-helm-chart directory created previously, modify the `values.yaml` file to ensure the Redis host, Redis pass, and MongoDB URL correspond with the helm install output you ran previously:

e.g.
```
redis:
    shardCount: 128
    host: "tyk-redis-master.tyk-ingress.svc.cluster.local"
    port: 6379
    useSSL: false
    pass: "<REDIS_PASSWORD>"

mongo:
    mongoURL: "mongodb://root:<MONGODB_ROOT_PASSWORD>@tyk-mongo-mongodb.tyk-ingress.svc.cluster.local:27017/tyk-dashboard?authSource=admin"
    useSSL: false
```
Then add your license to the same `values.yaml` file

## Step Nine - Install Tyk Pro

```{.copyWrapper}
helm install tyk-pro -f ./values.yaml ./tyk-pro -n tyk-ingress
```

The installation will bring up some detailed notes, these enable the installation of the actual Tyk K8s controller.  We'll walk through these commands below but please note these are samples only:

```{.copyWrapper}
export NODE_PORT=$(kubectl get --namespace tyk-ingress -o jsonpath="{.spec.ports[0].nodePort}" services dashboard-svc-tyk-pro)
export NODE_IP=$(minikube ip)
export DASH_URL="$NODE_IP:$NODE_PORT"
export DASH_HTTPS=""
```

## Step Ten - Check that all your pods are running

```{.copyWrapper}
kubectl get pods --all-namespaces
```

## Step Eleven - Bootstrap the Dashboard

```{.copyWrapper}
./tyk-pro/scripts/bootstrap_k8s.sh $DASH_URL 12345 tyk-ingress $DASH_HTTPS
```

This command will bootstrap the dashboard, since you do not have an initial username, password or organisation. The command will output all you need, make sure to retain the information!

This command will also generate a secret which the controller needs in order to install and run properly, we move it using the next command:

At this point, Tyk Pro is fully installed and should be accessible, proceed in case you want to install the Tyk ingress controller.

## Step Twelve - Move secrets to controller helm chart

```{.copyWrapper}
mv ./tyk-pro/scripts/secrets.yaml ./tyk-k8s/templates
```

## Step Thirteen - Install the Ingress controller

```{.copyWrapper}
helm install tyk-controller -f ./values.yaml ./tyk-k8s -n tyk-ingress
```