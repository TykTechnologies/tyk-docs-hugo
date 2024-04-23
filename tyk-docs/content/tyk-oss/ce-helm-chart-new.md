---
title: "Quick Start with Tyk OSS Helm Chart"
date: 2022-05-31
tags: ["OSS", "Gateways", "Kubernetes", "Helm Chart", "Quick Start"]
description: "How to deploy Tyk OSS on Kubernetes using new Helm Chart"
menu:
  main:
    parent: "Kubernetes"
weight: 1
---

The following guides provide instructions to install Redis and Tyk Open Source with default configurations. It is intended for quick start only. For production, you should install and configure Redis separately.

## Prerequisites

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

## Quick Start
The following quick start guide explains how to use the Tyk OSS Helm chart to configure the Tyk Gateway that includes:
- Redis for key storage

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 

**1. Install Redis and Tyk**

```bash
NAMESPACE=tyk-oss
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade tyk-oss tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

**2. Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 

You are now ready to [create an API]({{<ref "/getting-started/create-api">}}).

For the complete installation guide and configuration options, please see [Tyk OSS Helm Chart]({{<ref "/product-stack/tyk-charts/tyk-oss-chart">}}).