---
title: "Quick Start with Helm Chart and MongoDB"
date: 2022-07-10
tags: ["Tyk Self Managed", "Tyk Stacks", "Kubernetes", "Quick Start", "MongoDB", "Installation", "Helm Chart"]
description: "How to deploy Tyk Self Managed on Kubernetes using new Helm Chart"
---

The following guides provide instructions to install Redis, MongoDB, and Tyk stack with default configurations. It is intended for quick start only. For production, you should install and configure Redis and MongoDB separately.

## Prerequisites

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

{{< note success >}}
**Note**

If you want to enable Tyk Enterprise Developer Portal, please use [PostgreSQL]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql">}}). MongoDB is not supported in Developer Portal.
{{< /note >}}

## Quick Start with MongoDB

The following quick start guide explains how to use the Tyk Stack Helm chart to configure a Dashboard that includes:
- Redis for key storage
- MongoDB for app config
- Tyk Pump to send analytics to MongoDB. It also opens a metrics endpoint where Prometheus (if available) can scrape from.

At the end of this quickstart Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

**1. Setup required credentials**

First, you need to provide Tyk license, admin email and password, and API keys. We recommend to store them in secrets.
```bash
NAMESPACE=tyk
REDIS_BITNAMI_CHART_VERSION=19.0.2
MONGO_BITNAMI_CHART_VERSION=15.1.2

API_SECRET=changeit
ADMIN_KEY=changeit
TYK_LICENSE=changeit
ADMIN_EMAIL=admin@default.com
ADMIN_PASSWORD=changeit

kubectl create namespace $NAMESPACE

kubectl create secret generic my-secrets -n $NAMESPACE \
    --from-literal=APISecret=$API_SECRET \
    --from-literal=AdminSecret=$ADMIN_KEY \
    --from-literal=DashLicense=$TYK_LICENSE

kubectl create secret generic admin-secrets -n $NAMESPACE \
    --from-literal=adminUserFirstName=Admin \
    --from-literal=adminUserLastName=User \
    --from-literal=adminUserEmail=$ADMIN_EMAIL \
    --from-literal=adminUserPassword=$ADMIN_PASSWORD
```

**2. Install Redis (if you don't have a Redis instance)**

If you do not already have Redis installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version $REDIS_BITNAMI_CHART_VERSION
```
Follow the notes from the installation output to get connection details and password. The DNS name of your Redis as set by Bitnami is 
`tyk-redis-master.tyk.svc:6379` (Tyk needs the name including the port) 

The Bitnami chart also creates a secret `tyk-redis` which stores the connection password in `redis-password`. We will make use of this secret in installation later.

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

**3. Install MongoDB (if you don't have a MongoDB instance)**

If you do not already have MongoDB installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-mongo oci://registry-1.docker.io/bitnamicharts/mongodb -n $NAMESPACE --install --version $MONGO_BITNAMI_CHART_VERSION
```

{{< note success >}}
**Note**

Please make sure you are installing MongoDB versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}).
{{< /note >}}

{{< note >}}
**Note**

Bitnami MongoDB image is not supported on darwin/arm64 architecture.
{{< /note >}}

We require the MongoDB connection string for Tyk installation. You can store it in a secret and provide the secret in installation later.

```bash
MONGOURL=mongodb://root:$(kubectl get secret --namespace $NAMESPACE tyk-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)@tyk-mongo-mongodb.$NAMESPACE.svc:27017/tyk_analytics?authSource=admin

kubectl create secret generic mongourl-secrets --from-literal=mongoUrl=$MONGOURL -n $NAMESPACE
```


{{< note >}}
**Note**

Ensure that you are installing MongoDB versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}) that are compatible with Tyk.
{{< /note >}}

**4. Install Tyk**
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/

helm repo update

helm upgrade tyk tyk-helm/tyk-stack -n $NAMESPACE \
  --install \
  --set global.adminUser.useSecretName=admin-secrets \
  --set global.secrets.useSecretName=my-secrets \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.mongo.driver=mongo-go \
  --set global.mongo.connectionURLSecret.name=mongourl-secrets \
  --set global.mongo.connectionURLSecret.keyName=mongoUrl \
  --set global.storageType=mongo \
  --set tyk-pump.pump.backend='{prometheus,mongo}' 
```

**5. Done!**

Now Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

You are now ready to [create an API]({{<ref "getting-started/create-api">}}).

For the complete installation guide and configuration options, please see [Tyk Stack Helm Chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}).