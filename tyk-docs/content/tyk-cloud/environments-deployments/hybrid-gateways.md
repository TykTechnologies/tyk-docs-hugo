---
title: "Deploy Hybrid Gateways"
date: 2022-03-14
tags: ["Tyk Cloud", "Hybrid", "Gateways", "data plane", "Kubernetes", "docker"]
description: "How to deploy Hybrid Gateways on Kubernetes and Docker"
menu:
  main:
    parent: "Environments & Deployments"
weight: 5
aliases:
  - /tyk-cloud/environments-&-deployments/hybrid-gateways
  - /tyk-cloud/environments--deployments/hybrid-gateways
  - /deployment-and-operations/tyk-open-source-api-gateway/setup-multiple-gateways
---

[Tyk Cloud](https://tyk.io/cloud/) hosts and manages the control planes for you. You can deploy the data planes across multiple locations:
* as [Cloud Gateways]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways.md" >}}): deployed and managed in Tyk Cloud, in any of 5 regions available. No need to care about deployment and operational concerns.
* as Hybrid Gateways: deployed locally and managed by you: in your own data centre, public or private cloud or even on your own machine

This page describes the deployment of hybrid data planes and how to connect them to Tyk Cloud, in both Kubernetes and Docker environments.

## Pre-requisites

* Tyk Cloud Account, register here if you don't have one yet: {{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="free trial" >}}
* A Redis instance for each data plane, used as temporary storage for distributed rate limiting, token storage and analytics. You will find instructions for a simple Redis installation in the steps below.
* No incoming firewalls rules are needed, as the connection between Hybrid Gateways and Tyk Cloud is always initiated from the Gateways, not from Tyk Cloud.

## Create hybrid data plane configuration

The hybrid data plane can connect to control plane in Tyk Cloud by using the Tyk Dashboard API Access Credentials. Follow the guides below to create the configuration that we will be used in later sections to create a deployment:

Login to your Tyk Cloud account deployments section and click on `ADD HYBRID DATA PLANE`

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-configuration-home.png" alt="Tyk Cloud hybrid configuration home" >}}

Fill in the details and then click _SAVE DATA PLANE CONFIG_

  {{< img src="/img/hybrid-gateway/tyk-cloud-save-hybrid-configuration.png" alt="Save Tyk Cloud hybrid configuration home" >}}

This will open up a page that has the data plane configuration details that we need.

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-masked-details.png" alt="Save Tyk Cloud hybrid configuration masked details" >}}

Those details are:
|                                      | Docker            | Helm                   |
|--------------------------------------|-------------------|------------------------|
| key                                  | api_key           | gateway.rpc.apiKey     |
| org_id                               | rpc_key           | gateway.rpc.rpcKey     |
| data_planes_connection_string (mdcb) | connection_string | gateway.rpc.connString |

You can also click on _OPEN DETAILS_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-open-details.png" alt="Tyk Cloud hybrid open for details" >}}

This will reveal instructions that you can use to connect your hybrid data plane to Tyk Cloud.

{{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-revealed-instructions.png" alt="Tyk Cloud hybrid detailed instructions" >}}


## Deploy with Docker

### 1. In your terminal, clone the demo application [Tyk Gateway Docker](https://github.com/TykTechnologies/tyk-gateway-docker) repository

```bash
git clone https://github.com/TykTechnologies/tyk-gateway-docker.git
```


### 2. Configure Tyk Gateway and its connection to Tyk Cloud

You need to modify the following values in [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) configuration file:

* `rpc_key` - Organisation ID
* `api_key` - Tyk Dashboard API Access Credentials of the user created earlier
* `connection_string`: MDCB connection string
* `group_id`*(optional)* - if you have multiple data plane (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belongs. The data planes in the same group share one Redis.


```json
{
"rpc_key": "<ORG_ID>",
"api_key": "<API-KEY>",
"connection_string": "<MDCB-INGRESS>:443",
"group_id": "dataplane-europe",
}
```

* *(optional)* you can enable sharding to selectively load APIs to specific gateways, using the following:

```json
{
  "db_app_conf_options": {
    "node_is_segmented": true,
    "tags": ["qa", "uat"]
  }
}
```

### 3. Configure the connection to redis

This example comes with a redis instance pre-configured and deployed with Docker compose. If you want to use another redis instance, you will have to update the `storage` part of [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid):

```json
{
  "storage": {
        "type": "redis",
        "host": "tyk-redis",
        "port": 6379,
        "username": "",
        "password": "",
        "database": 0,
        "optimisation_max_idle": 2000,
        "optimisation_max_active": 4000
    }
}
```

### 4. Update docker compose file

Edit the <docker-compose.yml> file to use the [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) that you have just configured.

From:

```yml
- ./tyk.standalone.conf:/opt/tyk-gateway/tyk.conf
```
To:

```yml
- ./tyk.hybrid.conf:/opt/tyk-gateway/tyk.conf
```

### 5. Run docker compose

Run the following:

```bash
docker compose up -d
```

You should now have two running containers, a Gateway and a Redis.

### 6. Check that the gateway is up and running

Call the /hello endpoint using curl from your terminal (or any other HTTP client):

```bash
curl http://localhost:8080/hello -i
````

Expected result:

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 17 Mar 2023 12:41:11 GMT
Content-Length: 59

{"status":"pass","version":"4.3.3","description":"Tyk GW"}
```

## Deploy in Kubernetes with Helm Chart
### Prerequisites

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the above [section](#create-hybrid-data-plane-configuration).

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Cloud and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

### 1. Set connection details

Set the below environment variables and replace values with connection details to your Tyk Cloud remote control plane. See the above [section](#create-hybrid-data-plane-configuration) on how to get the connection details.

```bash
MDCB_UserKey=9d20907430e440655f15b851e4112345
MDCB_OrgId=64cadf60173be90001712345
MDCB_ConnString=mere-xxxxxxx-hyb.aws-euw2.cloud-ara.tyk.io:443
MDCB_GroupId=your-group-id
```

### 2. Then use Helm to install Redis and Tyk

```bash
NAMESPACE=tyk
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade hybrid-dp tyk-helm/tyk-data-plane -n $NAMESPACE --create-namespace \
  --install \
  --set global.remoteControlPlane.userApiKey=$MDCB_UserKey \
  --set global.remoteControlPlane.orgId=$MDCB_OrgId \
  --set global.remoteControlPlane.connectionString=$MDCB_ConnString \
  --set global.remoteControlPlane.groupID=$MDCB_GroupId \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

### 3. Done!

Now Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).


## Remove hybrid data plane configuration
{{< warning success >}}
**Warning**

Please note the action of removing a hybrid data plane configuration cannot be undone.

To remove the hybrid data plane configuration, navigate to the page of the hybrid data plane you want to remove and click _OPEN DETAILS_

{{< /warning >}}


  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-open-details.png" alt="Tyk Cloud hybrid open for details" >}}

Then click on _REMOVE DATA PLANE CONFIGS_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-remove-configs.png" alt="Tyk Cloud hybrid remove configs" >}}

Confirm the removal by clicking _DELETE HYBRID DATA PLANE_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-confirm-config-removal.png" alt="Tyk Cloud hybrid confirm removal of configs" >}}

