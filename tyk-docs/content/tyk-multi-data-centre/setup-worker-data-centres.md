---
date: 2023-01-10
title: Setup MDCB Data Plane
menu:
    main:
        parent: "Tyk Multi Data Centre Bridge"
weight: 5
tags: ["MDCB", "Data Plane", "worker", "setup"]
description: "How to setup the MDCB Data Plane."
aliases:
  - /tyk-multi-data-centre/setup-slave-data-centres/
---

## Overview

You may configure an unlimited number of [Tyk Data Planes]({{< ref "tyk-multi-data-centre/mdcb-components#data-plane" >}}) containing Worker Gateways for ultimate High Availablity (HA). We recommend that you deploy your worker gateways as close to your upstream services as possible in order to reduce latency.

It is a requirement that all your Worker Gateways in a Data Plane data centre share the same Redis DB in order to take advantage of Tyk's DRL and quota features.
Your Data Plane can be in the same physical data centre as the Control Plane with just a logical network separation. If you have many Tyk Data Planes, they can be deployed in a private-cloud, public-cloud, or even on bare-metal.

## Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}) helm chart is pre-configured to install Tyk Gateway and Tyk Pump that connects to MDCB or Tyk Cloud, our SaaS MDCB Control Plane. After setting up Tyk Control Plane with Helm Chart, obtain the required connection details from installation output and configure data plane chart as below. For Tyk Cloud users, following [Tyk Cloud instructions]({{<ref "tyk-cloud/environments-deployments/hybrid-gateways">}}) to deploy your hybrid gateways.

### Prerequisites

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the tyk-control-plane installation output.

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Control Plane and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

### 1. Set connection details

Set the below environment variables and replace values with connection details to your MDCB control plane. See [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart#obtain-remote-control-plane-connection-details-from-tyk-control-plane-chart">}}) documentation on how to get the connection details.

```bash
USER_API_KEY=9d20907430e440655f15b851e4112345
ORG_ID=64cadf60173be90001712345
MDCB_CONNECTIONSTRING=mdcb-svc-tyk-control-plane-tyk-mdcb.tyk.svc:9091
GROUP_ID=your-group-id
MDCB_USESSL=false
```

### 2. Then use Helm to install Redis and Tyk

```bash
NAMESPACE=tyk-dp
APISecret=foo

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install

helm upgrade tyk-dp tyk-helm/tyk-data-plane -n $NAMESPACE --create-namespace \
  --install \
  --set global.remoteControlPlane.userApiKey=$USER_API_KEY \
  --set global.remoteControlPlane.orgId=$ORG_ID \
  --set global.remoteControlPlane.connectionString=$MDCB_CONNECTIONSTRING \
  --set global.remoteControlPlane.groupID=$GROUP_ID \
  --set global.remoteControlPlane.useSSL=$MDCB_USESSL \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

### 3. Done!

Now Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).


## Configuring an existing Tyk Gateway
If you have Redis and a working Tyk Gateway deployed, follow below steps to configure your gateways to work in RPC mode.

{{< note >}}
**Note**

If you have deployed Gateway with `tyk-data-plane` Chart, you don't need to go through following steps to configure Tyk Gateway. The necessary configurations has been set in `tyk-data-plane` chart templates.
{{< /note >}}

### Prerequisites
- Redis
- A working headless/open source Tyk Gateway deployed

### Worker Gateway Configuration

Modify the Tyk Gateway configuration (`tyk.conf`) as follows:
`"use_db_app_configs": false,`

Next, we need to ensure that the policy loader and analytics pump use the RPC driver:

```{.json}
"policies": {
  "policy_source": "rpc",
  "policy_record_name": "tyk_policies"
},
"analytics_config": {
  "type": "rpc",
  ... // remains the same
},
```

Lastly, we add the sections that enforce the Worker mechanism:

```{.json}
"slave_options": {
  "use_rpc": true,
  "rpc_key": "{ORGID}",
  "api_key": "{APIKEY}",
  "connection_string": "{MDCB_HOSTNAME:9091}",
  "enable_rpc_cache": true,
  "bind_to_slugs": false,
  "group_id": "{ny}",
  "use_ssl": false,
  "ssl_insecure_skip_verify": true
},
"auth_override": {
  "force_auth_provider": true,
  "auth_provider": {
    "name": "",
    "storage_engine": "rpc",
    "meta": {}
  }
}
```
{{< note success >}}
**Note**  

if you set `analytics_config.type` to `rpc` - make sure you don't have your Tyk Pump configured to send analytics via the `hybrid` Pump type.
{{< /note >}}


As an optional configuration you can use `key_space_sync_interval` to set the period's length in which the gateway will check for changes in the key space, if this value is not set then by default it will be 10 seconds.


The most important elements here are:

| Field         | Description    |
|---------------|----------------|
|`api_key`      |This the API key of a user used to authenticate and authorise the Gateway's access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce risk if compromised. The suggested security settings are `read` for `Real-time notifications` and the remaining options set to `deny`.|
|`group_id`    |This is the "zone" that this instance inhabits, e.g. the cluster/data centre the gateway lives in. The group ID must be the same across all the gateways of a data centre/cluster which are also sharing the same Redis instance. This id should also be unique per cluster (otherwise another gateway's cluster can pick up your keyspace events and your cluster will get zero updates).
|`connection_string`     |The MDCB instance or load balancer.|
|`bind_to_slugs` | For all Tyk installations except for Tyk Classic Cloud this should be set to false.|

Once this is complete, you can restart the Tyk Gateway in the Data Plane, and it will connect to the MDCB instance, load its API definitions, and is ready to proxy traffic.
