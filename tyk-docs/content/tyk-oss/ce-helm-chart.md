---
title: "Legacy Tyk Headless Helm Chart"
date: 2021-07-01
tags: [""]
description: ""
menu:
  main:
    parent: "Tyk Helm Chart"
weight: 1
---

{{< warning success >}}
**Warning**

`tyk-headless` chart is deprecated. Please use our Tyk Chart for Tyk Open Source at [tyk-oss]({{<ref "tyk-oss/ce-helm-chart-new">}}) instead. 

We recommend all users migrate to the `tyk-oss` Chart. Please review the [Configuration]({{<ref "tyk-oss/ce-helm-chart-new">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

## Introduction

This is the preferred (and easiest) way to install the Tyk OSS Gateway on Kubernetes.
It will install Tyk gateway in your Kubernetes cluster where you can add and manage APIs directly or via the *Tyk Operator*.

## Prerequisites

The following are required for a Tyk OSS installation:
 - Redis   - required for all the Tyk installations and must be installed in the cluster or reachable from inside K8s.
             You can find instructions for a simple Redis installation bellow.
 - MongoDB/SQL - Required only if you chose to use the MongoDB/SQL Tyk pump with your Tyk OSS installation. Same goes with any
             [other pump]({{< ref "tyk-stack/tyk-pump/other-data-stores" >}}) you choose to use.
 - Helm - Tyk Helm supports the Helm 3+ version.

## Installation

As well as our official OSS Helm repo, you can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-headless).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless" data-theme="light" data-header="true" data-responsive="true"><blockquote><p lang="en" dir="ltr"><b>tyk-headless</b>: This chart deploys the open source Tyk Gateway. Tyk Gateway is a fully open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols. Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organisations and businesses around the world to protect, secure, and process APIs and well as review and audit the consumed apis.</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless">Artifact Hub</a></blockquote></div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-headless)

### Step 1 - Add Tyk official Helm repo

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

### Step 2 - Create namespace for Tyk deployment

```bash
kubectl create namespace tyk
```

### Step 3 - Getting values.yaml

Before we proceed with installation of the chart you may need to set some custom values.
To see what options are configurable on a chart and save those options to a custom values.yaml file run:

```bash
helm show values tyk-helm/tyk-headless > values.yaml
```

Some of the necessary configration parameters will be explained in the next steps.

### Step 4 - Installing Redis

#### Recommended: via *Bitnami* chart

For Redis you can use these rather excellent chart provided by Bitnami.
Copy the following commands to add it: 

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password.

```
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk.svc.cluster.local:6379`
You can update them in your local `values.yaml` file under `redis.addrs` and `redis.pass`
Alternatively, you can use `--set` flag to set it in Tyk installation. For example  `--set redis.pass=$REDIS_PASSWORD`

#### Evaluation only: via *simple-redis* chart

{{< warning  success >}}
**Warning**

Another option for Redis, to get started quickly, is to use our *simple-redis* chart.
Please note that these provided charts must never be used in production or for anything
but a quick start evaluation only. Use Bitnami redis or Official Redis Helm chart in any other case.
We provide this chart, so you can quickly deploy *Tyk gateway*, but it is not meant for long term storage of data.

{{< /warning >}}

```bash
helm install redis tyk-helm/simple-redis -n tyk
```

### Step 5 - Installing Tyk Open Source Gateway

```bash
helm install tyk-ce tyk-helm/tyk-headless -f values.yaml -n tyk
 ```

Please note that by default, Gateway runs as `Deployment` with `ReplicaCount` is 1. You should not update this part because multiple instances of OSS gateways won't sync the API Definition.

#### Installation Video

See our short video on how to install the Tyk Open Source Gateway.
Please note that this video shows the use of GH repo, since it recorded before the official repo was available, However,
it's very similar to the above commands.

{{< youtube mkyl38sBAF0 >}}

#### Pump Installation
By default pump installation is disabled. You can enable it by setting `pump.enabled` to `true` in `values.yaml` file.
Alternatively, you can use `--set pump.enabled=true` while doing helm install.

#### Quick Pump configuration(Supported from tyk helm v0.10.0)
*1. Mongo Pump*

To configure mongo pump, do following changings in `values.yaml` file:
1. Set `backend` to `mongo`.
2. Set connection string in `mongo.mongoURL`.

*2. Postgres Pump*

To configure postgres pump, do following changings in `values.yaml` file:
1. Set `backend` to `postgres`.
2. Set connection string parameters in `postgres` section.

#### Optional - Using TLS
You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway
listen on port 443 and load up a dummy certificate.
You can set your own default certificate by replacing the file in the `certs/` folder.

#### Optional - Mounting Files
To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component.

For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

#### Optional - Tyk Ingress
To set up an ingress for your Tyk Gateways see our [Tyk Operator GitHub repository](https://github.com/TykTechnologies/tyk-operator).

### Next Steps
Follow the Tutorials on the Open Source tabs for the following:

1. [Add an API]({{< ref "getting-started/create-api.md" >}})
2. [Create a Security Policy]({{< ref "getting-started/create-security-policy.md" >}})
3. [Create an API Key]({{< ref "getting-started/create-api-key.md" >}})
