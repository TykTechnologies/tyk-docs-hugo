---
title: "Tyk Helm Chart"
date: 2021-07-01
tags: [""]
description: ""
menu:
  main:
    parent: "Kubernetes"
weight: 1
url: "/tyk-oss/ce-helm-chart/"
---

## Introduction

This is the preferred (and easiest) way to install the Tyk OSS Gateway on Kubernetes. 
It will install Tyk gateway in your Kubernetes cluster where you can add and manage APIs directly or via the *Tyk Operator*.
 
## Prerequisites
The following are required for a Tyk OSS installation:
 - Redis   - required for all the Tyk installations and must be installed in the cluster or reachable from inside K8s.
             You can find instructions for a simple Redis installation bellow.
 - MongoDB - Required only if you chose to use the MongoDB Tyk pump with your Tyk OSS installation. Same goes with any 
             [other pump](/analytics-and-reporting/other-data-stores/) you choose to use.
             
## Installation 

This is our official Helm repository [https://helm.tyk.io/public/helm/charts/](https://helm.tyk.io/public/helm/charts/).
You can also find the *Tyk OSS* Helm chart in [artifacthub](https://artifacthub.io/packages/helm/tyk-helm/tyk-headless).

If you are interested in contributing, suggesting changes or creating PRs, please use our 
[GitHub repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-headless).

### Add Tyk official Helm repo

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

### Create namespace for Tyk deployment

```bash
kubectl create namespace tyk
```

### Getting values.yaml

Before we proceed with installation of the chart you need to set some custom values. 
To see what options are configurable on a chart and save that options to a custom values.yaml file run:

 ```bash
helm show values tyk-helm/tyk-headless > values.yaml
```

### Installing Redis

For Redis you can use these rather excellent chart provided by Bitnami.

```bash
helm install tyk-redis bitnami/redis -n tyk
```

Follow the notes from the installation output to get connection details and update them in your local `values.yaml` file.
Alternatively, you can use `--set redis.pass=$REDIS_PASSWORD` flag to set it in Tyk installation.  

{{< warning  success >}}
**Warning**

Another option for Redis, to get started quickly, is to use our *simple-redis* chart. 
Please note that these provided charts must not ever be used in production and for anything 
but a quick start evaluation only. Use external redis or Official Redis Helm chart in any other case. 
We provide this chart, so you can quickly have *Tyk gateway* running, however it is not meant for long term storage of data for example.
{{< /warning >}}

```bash
helm install redis tyk-helm/simple-redis -n tyk
```

### Installing Tyk Open Source Gateway

```bash
helm install tyk-ce tyk-helm/tyk-headless --version 0.9.1 -f values.yaml -n tyk
 ```

#### Installation Video 

See our short video on how to install the Tyk Open Source Gateway. 
Please note that this video shows the use of GH repo, since it recorded before the official repo was available, However, 
it's very similar to the above commands.

{{< youtube mkyl38sBAF0 >}}

#### Using TLS
You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway 
listen on port 443 and load up a dummy certificate. 
You can set your own default certificate by replacing the file in the `certs/` folder.

#### Mounting Files
To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component. 
For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

#### Tyk Ingress
To set up an ingress for your Tyk Gateways see our [Tyk Operator GitHub repository](https://github.com/TykTechnologies/tyk-operator). 

### Next Steps Tutorials
Follow the Tutorials on the Open Source tabs for the following:

1. [Add an API]({{< ref "/content/getting-started/tutorials/create-api.md" >}})
2. [Create a Security Policy]({{< ref "/content/getting-started/tutorials/create-security-policy.md" >}})
3. [Create an API Key]({{< ref "/content/getting-started/tutorials/create-api-key.md" >}})
