---
title: "Tyk Helm Chart "
date: 2021-07-01
tags: [""]
description: ""
menu:
  main:
    parent: "Kubernetes "
weight: 1
url: "/tyk-self-managed/tyk-helm-chart"
---

## Introduction

This is the preferred (and easiest) way to install *Tyk Self-Managed* on Kubernetes. 
It will install full Tyk platform with *Tyk manager*, *Tyk gateways* and *Tyk pumps* into your Kubernetes cluster where 
you can add and manage APIs via the *Tyk Operator*, and the *Tyk manager* (i.e *Tyk dashboard*).

### Prerequisites

#### 1. Tyk License
If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain a temporary licence.

Tyk Self-managed licensing allow for different numbers of Gateway nodes to connect to a single Dashboard instance. 
To ensure that your Gateway pods will not scale beyond your license allowance, change the Gateway's resource kind from *DaemonSet* to *Deployment*
and the replica count to your license node limit. For example, use the following options for a single node license: 
`--set gateway.kind=Deployment --set gateway.replicaCount=1` in your `values.yaml` file or in the Helm install command.

{{< warning >}}
**Please Note**  
There may be intermittent issues on the new pods during the rolling update process, when the total number of online gateway 
pods is more than the license limit with lower amounts of Licensed nodes.
{{< /warning >}}

#### 2. Data stores
The following are required for a Tyk Self-managed installation:
 - Redis - is required by all Tyk installations and must be installed in the cluster or reachable by the *Tyk Gateway*.
 - MongoDB - is required and must be installed in the cluster or must be reachable by the *Tyk Dashboard* 

 - Redis - required for all the Tyk installations and must be installed in the cluster or reachable from inside K8s.
           You can find instructions for a simple Redis installation bellow.
 - MongoDB - If you are using the MongoDB pumps with your open source installation you will also require MongoDB installed.

            
## Installation 
You can find the *Tyk Self managed* chart in our [GitHub repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-pro) 
or via [artifacthub](https://artifacthub.io/packages/helm/tyk-helm/tyk-pro)


### Add Tyk official Helm repo
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

### Create namespace for tyk deployment
```bash
kubectl create namespace tyk
```

### Getting and Setting values.yaml
Before we proceed with installation of the chart you need to set some custom values. 
To see what options are configurable on a chart and save that options to a custom values.yaml file run:

 ```bash
helm show values tyk-helm/tyk-pro > values.yaml
```

For *Tyk Self-managed* chart we need to set the license key in your custom `values.yaml` file under `dash.license` field
or use `--set dash.license={YOUR-LICENSE_KEY}` with the `helm install` command.

### Installing Redis and MongoDB
For Redis and MongoDB you can use these rather excellent charts provided by Bitnami

#### Redis
```bash
helm install tyk-redis bitnami/redis -n tyk
```
Follow the notes from the installation output to get connection details and update them in your local `values.yaml` file.
Alternatively, you can use `--set redis.pass=$REDIS_PASSWORD` flag to set it in Tyk installation.  

#### MongoDB
```bash
helm install tyk-mongo bitnami/mongodb --set "replicaSet.enabled=true" -n tyk
```
Follow notes from the installation output to get connection details and update them in `values.yaml` file.

{{< note success >}}
**Important Note regarding MongoDB**

This Helm chart enables the *PodDisruptionBudget* for MongoDB with an arbiter replica-count of 1. If you intend to perform 
system maintenance on the node where the MongoDB pod is running and this maintenance requires for the node to be drained, 
this action will be prevented due the replica count being 1. Increase the replica count in the helm chart deployment to 
a minimum of 2 to remedy this issue.

{{< /note >}}


#### Quick Redis and MongoDB PoC installation
{{< warning  success >}}
**Warning**

Another option for Redis and MongoDB, to get started quickly, is to use our *simple-redis* chart. 
Please note that these provided charts must not ever be used in production and for anything 
but a quick start evaluation only. Use external redis or Official Redis Helm chart in any other case. 
We provide this chart, so you can quickly have *Tyk gateway* running, however it is not meant for long term storage of data for example.

```bash
helm install redis tyk-helm/simple-redis -n tyk
helm install mongo tyk-helm/simple-mongo -n tyk
```
{{< /warning >}}


### Installing Tyk Self managed

Now we can install the chart using our custom values:

```bash
helm install tyk-pro tyk-helm/tyk-pro --version 0.9.1 -f values.yaml -n tyk --wait
```


Then, before you proceed with installation of the chart you need to set some custom values in your values.yaml file. Run:

```bash
helm show values tyk-helm/tyk-pro > values.yaml
```

Add your Tyk License to the `dash.license` option


Then run the following command from the root of the repository:

```bash
helm install tyk-pro tyk-helm/tyk-pro --version 0.9.0 -f values.yaml -n tyk --wait
```
Please note the `--wait` argument is important to successfully finish the bootstrap job of *Tyk Manager*.

#### Tyk Developer Portal
You can disable the bootstrapping of the Developer Portal by the `portal.bootstrap: false` in your local `values.yaml` file.

#### Using TLS
You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway 
listen on port 443 and load up a dummy certificate. You can set your own default certificate by replacing the file in the `certs/` folder.

#### Mounting Files
To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component. 
For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

#### Sharding APIs
Sharding is the ability for you to decide which of your APIs are loaded on which of your Tyk Gateways. This option is 
turned off by default, however, you can turn it on by updating the `gateway.sharding.enabled` option. Once you do that you 
will also need to set the `gateway.sharding.tags` field with the tags that you want that particular Gateway to load. (ex. tags: "external,ingress".) 
You can then add those tags to your APIs in the API Designer, under the *Advanced Options* tab, and 
the *Segment Tags (Node Segmentation)* section in your Tyk Dashboard. 
Check [Tyk Gateway Sharding]({{< ref "/content/advanced-configuration/manage-multiple-environments/manage-multiple-environments.md#api-sharding" >}}) for more details.

## Other Tyk Components

### Installing Tyk Self-managed Control Plane
If you are deploying the *Tyk Control plane*, a.k.a *MDCB*, for a *Tyk Multi data Centre* deployment then you set 
the `mdcb.enabled: true` option in the local `values.yaml` to add of the *MDCB* component to your installation. 
Check [Tyk Control plane](https://tyk.io/docs/tyk-multi-data-centre/) for more configuration details. 

This setting enables multi-cluster, multi Data-Centre API management from a single dashboard.

#### Secrets
Tyk *MDCB* registry is private and requires adding users to our organisation which you then define as a secret when pulling the *MDCB* image. 
Please contact your account manager to arrange this.

### Tyk Identity Broker (TIB)
The *Tyk Identity Broker* (TIB) is a micro-service portal that provides a bridge between various Identity Management Systems 
such as LDAP, OpenID Connect providers and legacy Basic Authentication providers, to your Tyk installation. 
See [TIB]({{< ref "/content/tyk-stack/tyk-identity-broker/getting-started.md" >}}) for more details.

For SSO to *Tyk Manager* and *Tyk developer portal* purposes you do not need to install *TIB*, as its functionality is now 
part of the *Tyk Manager*. However, if you want to run it separately (as you used to before this merge) or if you need it
 as a broker for the *Tyk gateway* you can do so.

Once you have installed *Tyk Gateway* and *Tyk Manager*, you can configure *TIB* by adding its configuration environment variables 
under the `tib.extraEnvs` section and updating the `profile.json` in your `configs` folder. 
See our [TIB GitHub repo](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib). 
Once you complete your modifications you can run the following command from the root of the repository to update your helm chart.

```bash
helm upgrade tyk-pro values.yaml -n tyk
```

This chart implies there's a *ConfigMap* with a `profiles.json` definition in it. Please use `tib.configMap.profiles` value 
to set the name of this *ConfigMap* (`tyk-tib-profiles-conf` by default).

### Tyk Ingress
To set up an ingress for your Tyk Gateways see our [Tyk Operator GitHub repository](https://github.com/TykTechnologies/tyk-operator). 

### Next Steps Tutorials

Follow the Tutorials on the **Self Managed** tabs for the following:

1. [Add an API]({{< ref "/content/getting-started/tutorials/create-api.md" >}})
2. [Create a Security Policy]({{< ref "/content/getting-started/tutorials/create-security-policy.md" >}})
3. [Create an API Key]({{< ref "/content/getting-started/tutorials/create-api-key.md" >}})
