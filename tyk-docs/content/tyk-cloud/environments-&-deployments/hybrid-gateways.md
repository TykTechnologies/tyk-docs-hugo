---
title: "Managing Hybrid Gateways"
date: 2021-03-29
tags: ["Tyk Cloud", "Hybrid", "Gateways"]
description: "How to configure Hybrid Gateways with our 14 Day Free Trial or Enterprise Global plans"
menu:
  main:
    parent: "Environments & Deployments"
weight: 5
---

## Introduction

Hybrid Gateways are available on our [14 Day Free Trial](/docs/tyk-cloud/account-billing/plans/#14-day-trial) and [Enterprise Global](/docs/tyk-cloud/account-billing/plans/#enterprise-global-plan) plans. Below is a sample Tyk Hybrid Gateway configuration file.

### Sample Hybrid Gateway Configuration File

```.json
{
    "listen_port": 8081,
    "template_path": "./templates",
    "tyk_js_path": "./js/tyk.js",
    "middleware_path": "./middleware",
    "use_db_app_configs": false,
    "app_path": "./apps/",
    "storage": {
        "type": "redis",
        "host": "localhost",
        "port": 6379,
        "enable_cluster": false,
        "username": "",
        "password": "",
        "database": 0,
        "optimisation_max_idle": 1000
    },
    "enable_analytics": true,
    "analytics_config": {
        "type": "rpc",
        "csv_dir": "/tmp",
        "mongo_url": "",
        "mongo_db_name": "",
        "mongo_collection": "",
        "purge_delay": -1,
        "ignored_ips": []
    },
    "auth_override": {
        "force_auth_provider": true,
        "auth_provider": {
            "name": "",
            "storage_engine": "rpc",
            "meta": {}
        }
    },
    "slave_options": {
        "use_rpc": true,
        "rpc_key": "your org id",
        "api_key": "your api key",
        "connection_string": "your endpoint here",
        "use_ssl": true,
        "ssl_insecure_skip_verify": true,
        "rpc_pool_size": 20,
        "enable_rpc_cache": true,
        "bind_to_slugs": false
    },
    "health_check": {
        "enable_health_checks": false,
        "health_check_value_timeouts": 60
    },
    "optimisations_use_async_session_write": true,
    "enable_non_transactional_rate_limiter": true,
    "enable_sentinel_rate_limiter": false,
    "allow_master_keys": false,
    "policies": {
        "policy_source": "rpc",
        "policy_record_name": "tyk_policies"
    },
    "hash_keys": true,
    "hash_key_function": "murmur128",
    "close_connections": false,
    "http_server_options": {
        "enable_websockets": true,
        "use_ssl": false,
        "server_name": "*",
        "min_version": 771,
        "certificates": [{
            "domain_name": "*",
            "cert_file": "/etc/certs/cert.pem",
            "key_file": "/etc/certs/key.pem"
        }]
    },
    "allow_insecure_configs": true,
    "enable_jsvm": true,
    "enable_context_vars": true,
    "coprocess_options": {
        "enable_coprocess": true,
        "coprocess_grpc_server": ""
    },
    "enable_bundle_downloader": false,
    "bundle_base_url": "",
    "global_session_lifetime": 100,
    "force_global_session_lifetime": false,
    "max_idle_connections_per_host": 500,
    "enable_custom_domains": true
}
```

## Hybrid Gateways in a Kubernetes Cluster
This Helm Chart provides a method of adding Hybrid Gateways into your Kubernetes cluster.
The Hybrid Gateways can be connected to *Tyk Cloud* or to a *Tyk Self managed Control plane* (a.k.a *MDCB*/*Tyk Multi Data Centre Bridge (MDCB)*).

### Prerequisites
Redis - required for all Tyk installations and must be installed in the cluster or
        reachable from inside K8s. You can find instructions for a simple Redis installation below.

### Installation

This is Tyk's official Helm Charts repository `https://helm.tyk.io/public/helm/charts/`.
*Tyk Hybrid* Helm Chart is under the name `tyk-helm/tyk-hybrid`
You can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid" data-theme="light" data-header="true" data-responsive="true"><blockquote><p lang="en" dir="ltr"><b>tyk-hybrid</b>: This chart deploys the open source Tyk Gateway with a Hybrid setup that connects to a management control plan. Tyk is a fully open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols. Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organisations and businesses around the world to protect, secure, and process APIs and well as review and audit the consumed apis.</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid">Artifact Hub</a></blockquote></div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-hybrid)

#### Add Tyk official Helm repo
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

#### Create namespace for tyk deployment
```bash
kubectl create namespace tyk
```

#### Installing Redis
If you have an external SaaS Redis you can skip this section.

For Redis you can use these rather excellent chart provided by Bitnami:

```bash
helm install tyk-redis bitnami/redis -n tyk
```
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


{{< note success >}}
**Note**

If you a simple password-less version of redis, please check (these instructions)[/tyk-oss/ce-helm-chart/#installing-redis]
{{< /note >}}

#### Getting values.yaml
Before we proceed with installation of the chart you need to set some custom values.
To see what options are configurable on a chart and save that options to a custom `values.yaml` file run:
 ```bash
helm show values tyk-helm/tyk-hybrid > values.yaml
```

#### Setting values.yaml
1. To allow the *Tyk Hybrid Gateway* to connect to *Tyk control plane* (*MDCB* management layer), add your connection
string in the `gateway.rpc.connString`. On the Tyk Cloud Console find this value in the endpoints panel for your control plane deployment.
2. For *Tyk Gateway* to identify itself against *Tyk control plane*, add your Dashboard users API key in the `gateway.rpc.apiKey` field.
3. Add your Dashboard users organisation ID in the `gateway.rpc.rpcKey` field.

Check this (doc)[/tyk-multi-data-centre/setup-slave-data-centres/] for detailed explanation of the hybrid/worker Gateway settings.

#### Installing Tyk Open Source Gateway as a hybrid gateway
Now run the following command from the root of the repository:
```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```
