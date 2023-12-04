---
title: "Deploy Hybrid Gateways"
date: 2022-03-14
tags: ["Tyk Cloud", "Hybrid", "Gateways", "data plane", "Kubernetes", "docker"]
description: "How to deploy Hybrid Gateways on Kubernetes and Docker"
menu:
  main:
    parent: "Environments & Deployments"
weight: 5
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

## Deploy in Kubernetes with Helm

Tyk is working to provide a new set of Helm charts, and will progressively roll them out at [tyk-charts](https://github.com/TykTechnologies/tyk-charts). It will provide component charts for all Tyk Components, as well as umbrella charts as reference configurations for open source and Tyk Self Managed users.

### Status of the New Charts

| Umbrella Charts | Description | Status |
|-----------------|-------------|--------|
| tyk-oss            | Tyk Open Source                       | Stable              |
| tyk-stack          | Tyk Self Managed (Single Data Center) | Stable              |
| tyk-control-plane  | Tyk Self Managed (Distributed) Control Plane | Coming Soon     |
| tyk-data-plane     | Tyk Self Managed (Distributed) Data Plane <br> Tyk Hybrid Data Plane | Stable              |

To deploy hybrid data planes using the new Helm chart, please use [tyk-data-plane](https://github.com/TykTechnologies/tyk-charts/tree/main/tyk-data-plane) chart.

## Tyk Data Plane

`tyk-data-plane` provides the default deployment of a Tyk data plane for Tyk Self Managed MDCB or Tyk Cloud users. It will deploy the data plane components that remotely connect to a MDCB control plane.

It includes the Tyk Gateway, an open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols; and Tyk Pump, an analytics purger that moves the data generated by your Tyk gateways to any back-end. Furthermore, it has all the required modifications to easily connect to Tyk Cloud or Multi Data Center (MDCB) control plane.

[Supported MDCB versions]({{< ref "tyk-cloud/troubleshooting-&-support/tyk-cloud-mdcb-supported-versions.md" >}})

## Introduction

By default, this chart installs following components as subcharts on a [Kubernetes](https://kubernetes.io/) cluster using the [Helm](https://helm.sh/) package manager.

| Component | Enabled by Default | Flag |
| --------- | ------------------ | ---- |
|Tyk Gateway |true  | n/a                    |
|Tyk Pump    |true | global.components.pump |

To enable or disable each component, change the corresponding enabled flag.

Also, you can set the version of each component through `image.tag`. You could find the list of version tags available from [Docker hub](https://hub.docker.com/u/tykio).

## Prerequisites

* Kubernetes 1.19+
* Helm 3+
* Redis should already be installed or accessible by the gateway. For Redis installations instruction, follow the [Redis installation](#set-redis-connection-details-required) guide below.
* Connection details to remote control plane. See the [section](#obtain-your-remote-control-plane-connection-details) below for how to obtain them from Tyk Cloud.

## Quick Start
The following quick start guide explains how to use the Tyk Data Plane Helm chart to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to PostgreSQL and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

```bash
NAMESPACE=tyk
APISecret=foo
MDCB_UserKey=9d20907430e440655f15b851e4112345
MDCB_OrgId=64cadf60173be90001712345
MDCB_ConnString=mere-xxxxxxx-hyb.aws-euw2.cloud-ara.tyk.io:443
MDCB_GroupId=dc-uk-south

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --set image.tag=6.2.13

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

### Obtain your Remote Control Plane Connection Details

You can easily obtain your remote control plane connection details on Tyk Cloud.

1. Go to Deployment tab and create a Hybrid data plane configuration. You can also select from an existing one.
2. Copy Key, Org ID, and Data Planes Connection String (MDCB) as `global.remoteControlPlane`'s `userApiKey`, `orgId`, and `connectionString` respectively.

{{< img src="/img/tyk-charts/tyk-cloud-deployment.png" alt="tyk-cloud-deployment" >}}

## Installing the Chart

To install the chart from the Helm repository in namespace `tyk` with the release name `tyk-data-plane`:

```bash
    helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
    helm repo update
    helm show values tyk-helm/tyk-data-plane > values.yaml
```

See [Configuration](#configuration) section for the available config options and modify your local `values.yaml` file accordingly. Then install the chart:

```bash
    helm install tyk-data-plane tyk-helm/tyk-data-plane -n tyk --create-namespace -f values.yaml
```

## Uninstalling the Chart

```bash
helm uninstall tyk-data-plane -n tyk
```

This removes all the Kubernetes components associated with the chart and deletes the release.

## Upgrading Chart

```bash
helm upgrade tyk-data-plane tyk-helm/tyk-data-plane -n tyk
```

{{< note success >}}
**Note**

*tyk-hybrid chart users*

If you were using `tyk-hybrid` chart for existing release, you cannot upgrade directly. Please modify the `values.yaml` base on your requirements and install using the new `tyk-data-plane` chart.
{{< /note >}}

## Configuration

To get all configurable options with detailed comments:

```bash
helm show values tyk-helm/tyk-data-plane > values.yaml
```

You can update any value in your local `values.yaml` file and use `-f [filename]` flag to override default values during installation. 
Alternatively, you can use `--set` flag to set it in Tyk installation.

### Set Redis Connection Details (Required)

Tyk uses Redis for distributed rate-limiting and token storage. You may use the Bitnami chart to install or Tyk's `simple-redis` chart for POC purpose.

Set the following values after installing Redis:

| Name | Description | 
|------|-------------|
| `global.redis.addrs` | Redis addresses |
| `global.redis.pass` | Redis password in plain text |
| `global.redis.passSecret.name` | If global.redis.pass is not provided, you can store it in a secret and provide the secret name here |
| `global.redis.passSecret.keyName` | key name to retrieve redis password from the secret |

#### Recommended: via *Bitnami* chart

For Redis you can use these rather excellent charts provided by [Bitnami](https://github.com/bitnami/charts/tree/main/bitnami/redis).
Copy the following commands to add it:

```bash
helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n tyk --create-namespace --install --set image.tag=6.2.13
```

Follow the notes from the installation output to get connection details and password.

```
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

The Redis address as set by Bitnami is `tyk-redis-master.tyk.svc.cluster.local:6379`

You can reference the password secret generated by Bitnami chart by  `--set global.redis.passSecret.name=tyk-redis` and `--set global.redis.passSecret.keyName=redis-password`, or just set `global.redis.pass=$REDIS_PASSWORD`

#### Evaluation only: via *simple-redis* chart

Another option for Redis, to get started quickly, is to use our [simple-redis](https://artifacthub.io/packages/helm/tyk-helm/simple-redis) chart.

{{< warning  success >}}
**Warning**

Please note that these provided charts must never be used in production or for anything
but a quick start evaluation only. Use Bitnami Redis or Official Redis Helm chart in any other case.
We provide this chart, so you can quickly deploy *Tyk gateway*, but it is not meant for long term storage of data.

{{< /warning >}}

```bash
helm install redis tyk-helm/simple-redis -n tyk
```

The Tyk Helm Chart can connect to `simple-redis` in the same namespace by default. You do not need to set Redis address and password in `values.yaml`.

### Protect Confidential Fields with Kubernetes Secrets

In the `values.yaml` file, some fields are considered confidential, such as `APISecret`, connection strings, etc.
Declaring values for such fields as plain text might not be desired for all use cases. Instead, for certain fields,
Kubernetes secrets can be referenced, and the chart will 
[define container environment variables using Secret data](https://tyktech.atlassian.net/wiki/spaces/EN/pages/2224029808/Platform+Squad+Releases+2024).

This section describes how to use Kubernetes secrets to declare confidential fields.

#### APISecret

The `global.secrets.APISecret` field configures a [header value]({{ref "tyk-oss-gateway/configuration#secret"}}) used in every interaction with Tyk Gateway API.

It can be configured via `global.secrets.APISecret` as a plain text or Kubernetes secret which includes `APISecret` key
in it. Then, this secret must be referenced via `global.secrets.useSecretName`.

```yaml
global:
    secrets:
        APISecret: CHANGEME
        useSecretName: "mysecret" # where mysecret includes `APISecret` key with the desired value.
```

#### Remote Control Plane Configuration

All configurations regarding remote control plane (`orgId`, `userApiKey`, and `groupID`) can be set via
Kubernetes secret.

Instead of explicitly setting them in the values file, just create a Kubernetes secret including `orgId`, `userApiKey`
and `groupID` keys and refer to it in `global.remoteControlPlane.useSecretName`.

```yaml
global:
  remoteControlPlane:
    useSecretName: "foo-secret"
```

where `foo-secret` should contain `orgId`, `userApiKey` and `groupID` keys in it.

#### Redis Password

Redis password can also be provided via a secret. Store Redis password in Kubernetes secret and refer to this secret
via `global.redis.passSecret.name` and `global.redis.passSecret.keyName` field, as follows:

```yaml
global:  
  redis:
     passSecret:
       name: "yourSecret"
       keyName: "redisPassKey"
```

### Gateway Configurations

Configure below inside `tyk-gateway` section.

#### Update Tyk Gateway Version
Set version of gateway at `tyk-gateway.gateway.image.tag`. You can find the list of version tags available from [Docker hub](https://hub.docker.com/u/tykio). Please check [Tyk Release notes]({{<ref "/release-notes">}}) carefully while upgrading or downgrading.

#### Enabling TLS

*Enable TLS*

We have provided an easy way to enable TLS via the `global.tls.gateway` flag. Setting this value to true will
automatically enable TLS using the certificate provided under tyk-gateway/certs/.

*Configure TLS secret*

If you want to use your own key/cert pair, please follow the following steps:
1. Create a TLS secret using your cert and key pair.
2. Set `global.tls.gateway` to true.
3. Set `tyk-gateway.gateway.tls.useDefaultTykCertificate` to false.
4. Set `tyk-gateway.gateway.tls.secretName` to the name of the newly created secret.

*Add Custom Certificates*

To add your custom Certificate Authority(CA) to your containers, you can mount your CA certificate directly into /etc/ssl/certs folder.

```yaml
   extraVolumes: 
     - name: self-signed-ca
       secret:
         secretName: self-signed-ca-secret
   extraVolumeMounts: 
     - name: self-signed-ca
       mountPath: "/etc/ssl/certs/myCA.pem"
       subPath: myCA.pem
```

#### Enabling gateway autoscaling
You can enable autoscaling of the gateway by `--set tyk-gateway.gateway.autoscaling.enabled=true`. By default, it will enable `Horizontal Pod Autoscaler` resource with target average CPU utilisation at 60%, scaling between 1 and 3 instances. To customize those values you can modify below section of `values.yaml`:

```yaml
tyk-gateway:
  gateway:
    autoscaling:
      enabled: true
      minReplicas: 3
      maxReplicas: 30
```

Built-in rules include `tyk-gateway.gateway.autoscaling.averageCpuUtilization` for CPU utilization (set by default at 60%) and `tyk-gateway.gateway.autoscaling.averageMemoryUtilization` for memory (disabled by default). In addition to that you can define rules for custom metrics using `tyk-gateway.gateway.autoscaling.autoscalingTemplate` list:

```yaml
tyk-gateway:
  gateway:
    autoscaling:
      autoscalingTemplate:
        - type: Pods
          pods:
            metric:
              name: nginx_ingress_controller_nginx_process_requests_total
            target:
              type: AverageValue
              averageValue: 10000m
```

#### Accessing Gateway

*Service port*

Default service port of gateway is 8080. You can change this at `global.servicePorts.gateway`.

*Ingress*

An Ingress resource is created if `tyk-gateway.gateway.ingress.enabled` is set to true.

```yaml
    ingress:
      # if enabled, creates an ingress resource for the gateway
      enabled: true

      # specify ingress controller class name
      className: ""

      # annotations for ingress
      annotations: {}

      # ingress rules
      hosts:
        - host: tyk-gw.local
          paths:
            - path: /
              pathType: ImplementationSpecific

      # tls configuration for ingress
      #  - secretName: chart-example-tls
      #    hosts:
      #      - chart-example.local
      tls: []
```

*Control Port*

Set `tyk-gateway.gateway.control.enabled` to true will allow you to run the [Gateway API]({{<ref "/tyk-gateway-api">}}) on a separate port and protect it behind a firewall if needed.

#### Sharding

Configure the gateways to load APIs with specific tags only by enabling `tyk-gateway.gateway.sharding.enabled`, and set `tags` to comma separated lists of matching tags.

```yaml
    # Sharding gateway allows you to selectively load APIs to specific gateways.
    # If enabled make sure you have at least one gateway that is not sharded.
    # Also be sure to match API segmentation tags with the tags selected below.
    sharding:
      enabled: true
      tags: "edge,dc1,product"
```

#### Setting Environment Variable

You can add environment variables for Tyk Gateway under `extraEnvs`. This can be used to override any default settings in the chart, e.g.

```yaml
    extraEnvs:
      - name: TYK_GW_HASHKEYS
        value: "false"
```

Here is a reference of all [Tyk Gateway Configuration Options]({{<ref "/tyk-oss-gateway/configuration">}}).

### Pump Configurations

To enable Pump, set `global.components.pump` to true, and configure below inside `tyk-pump` section.

| Pump                      | Configuration                                                                                              |
|---------------------------|------------------------------------------------------------------------------------------------------------| 
| Prometheus Pump (Default) | Add `prometheus` to `tyk-pump.pump.backend`, and add connection details for prometheus under `tyk-pump.pump.prometheusPump`. |
| Hybrid Pump (Default)     | Add `hybrid` to `tyk-pump.pump.backend`, and add remoteControlPlane details under `global.remoteControlPlane`. |
| Other Pumps               | Add the required environment variables in `tyk-pump.pump.extraEnvs`                                                |

#### Prometheus Pump
Add `prometheus` to `tyk-pump.pump.backend`, and add connection details for prometheus under `tyk-pump.pump.prometheusPump`. 

We also support monitoring using Prometheus Operator. All you have to do is set `tyk-pump.pump.prometheusPump.prometheusOperator.enabled` to true.
This will create a *PodMonitor* resource for your Pump instance.

#### Hybrid Pump
Add `hybrid` to `tyk-pump.pump.backend`, and add remoteControlPlane details under `global.remoteControlPlane`.

```yaml
  # Set remoteControlPlane connection details if you want to configure hybrid pump.
  remoteControlPlane:
      # connection string used to connect to an MDCB deployment. For Tyk Cloud users, you can get it from Tyk Cloud Console and retrieve the MDCB connection string.
      connectionString: ""
      # orgID of your dashboard user
      orgId: ""
      # API key of your dashboard user
      userApiKey: ""
      # needed in case you want to have multiple data-planes connected to the same redis instance
      groupID: ""
      # enable/disable ssl
      useSSL: true
      # Disables SSL certificate verification
      sslInsecureSkipVerify: true
```

```yaml
  # hybridPump configures Tyk Pump to forward Tyk metrics to a Tyk Control Plane.
  # Please add "hybrid" to .Values.pump.backend in order to enable Hybrid Pump.
  hybridPump: 
    # Specify the frequency of the aggregation in minutes or simply turn it on by setting it to true
    enableAggregateAnalytics: true
    # Hybrid pump RPC calls timeout in seconds.
    callTimeout: 10
    # Hybrid pump connection pool size.
    poolSize: 5
```

#### Other Pumps
To setup other backends for pump, refer to this [document](https://github.com/TykTechnologies/tyk-pump/blob/master/README.md#pumps--back-ends-supported) and add the required environment variables in `tyk-pump.pump.extraEnvs`


### Remove hybrid data plane configuration
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

