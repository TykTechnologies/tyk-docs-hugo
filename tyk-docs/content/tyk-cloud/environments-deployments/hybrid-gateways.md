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

[Tyk Cloud]({{< ref "tyk-cloud" >}}) hosts and manages the control planes for you. The data planes can be deployed across multiple locations: 
* as [Cloud Gateways]({{< ref "/content/tyk-cloud/environments-&-deployments/managing-gateways.md" >}}): in Tyk Cloud, in any of 5 regions available, fully managed by Tyk - so that you don’t have to care about deployment and operational concerns. 
* as Hybrid Gateways: deployed locally and managed by you: in your own data centre, public or private cloud or even on your own machine

This page describes how to deploy hybrid data planes that connects to Tyk Cloud, in both Kubernetes and Docker environments.  

## Pre-requisites

* Tyk Cloud Account, register here if you don't have one yet: {{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="free trial" >}}
* A redis instance for each data plane, used as temporay storage for distributed rate limiting, token storage and analytics. 
* No incoming firewalls rules are needed, as the connection between Hybrid Gateways and Tyk Cloud is always initiated from the Gateways, not from Tyk Cloud.

## Get the connection details to the control plane

Before deploying your data plane, you will need to prepare the connection details to the control plane:
* **Tyk Dashboard API Access Credentials**: `gateway.rpc.apiKey` setting in helm
* **Organisation ID**: `gateway.rpc.rpcKey` setting in helm
* **MDCB connection string**: `gateway.rpc.connString` setting in helm

You need first to create a user that will be able to connect to the control plane. Go to the API Manager Dashboard. 

  {{< img src="/img/hybrid-gateway/tyk-cloud-dashboard-api-manager.png" alt="API Manager Dashboard" >}}

  - Within the API Manager Dashboard, select or create a user to be used as the login from your Hybrid gateways with the following permissions: **TBD**

  {{< img src="/img/hybrid-gateway/tyk-cloud-dashboard-api-manager-user.png" alt="API Manager Dashboard" >}}

  - Copy the **Tyk Dashboard API Access Credentials** for later use (`gateway.rpc.apiKey` setting in helm)
  - Copy the **Organisation ID** for later use (`gateway.rpc.rpcKey` setting in helm)

  {{< img src="/img/hybrid-gateway/tyk-cloud-dashboard-api-manager-user-key.png" alt="API Manager Dashboard" >}}

Then retrieve the MDCB connection string for the gateways to connect to your control plane. You can find it on the control plane page in Tyk Cloud: 

{{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-connection-control-plane.png" alt="MDCB connection string for the gateways to connect to your control plane" >}}

Copy this **MDCB connection string** for later use (`gateway.rpc.connString` setting in helm).


## Deploy with Docker


## Deploy in Kubernetes with Helm

**1. Add the Tyk official Helm repo `tyk-helm` to your local Helm registry**

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

The helm charts are also available on [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid).

**2. Then create a new namespace that will be hosting the Tyk Gateways**

```bash
kubectl create namespace tyk
```

**3. Get the template yaml for configuration**

Before proceeding with installation of the chart we need to set some custom values. First save the full original values.yaml to a local copy:

```bash
helm show values tyk-helm/tyk-hybrid > values.yaml
```

**4. Configure Tyk Gateway and its connection to Tyk Cloud**

You need to modify the following values in your custom `values.yaml` file: 

* `gateway.rpc.apiKey`: Tyk Dashboard API Access Credentials of the user created ealier
* `gateway.rpc.rpcKey`: Organisation ID 
* `gateway.rpc.connString`: MDCB connection string
* *(optional)* `gateway.rpc.groupId`: if you have multiple data plane (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belong
* *(optional)* `gateway.sharding.enabled` and `gateway.sharding.tags`: you can enable sharding to selectively load APIs to specific gateways, using tags
* `image.tag`: `v4.3` (or any other version available in [dockerhub](https://hub.docker.com/r/tykio/tyk-gateway/tags))

**5. Configure the connection to redis**

You can connect the gateway to any Redis instance already deployed (as DBaaS or hosted in your private infrastructure). 

In case you don't have a Redis instance yet, here's how to deploy Redis in Kubernetes using Bitnami Helm charts.

```bash
helm install tyk-redis bitnami/redis -n tyk
```

Follow the notes from the installation output to get connection details and password.

```console
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

You need to modify the following values in your custom `values.yaml` file: 

* `redis.addrs`: the name of the redis instance including the port as set by Bitnami `tyk-redis-master.tyk.svc.cluster.local:6379` 
* `redis.pass`: password set in redis (`$REDIS_PASSWORD`)


**6. Install the helm chart**

Install the chart using the configured custom values file:

```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```

You should see the prompt:

```console
At this point, Tyk Hybrid is fully installed and should be accessible.
```


**7. Check that the installation was successful**

The hybrid data planes are not yet visible in Tyk Cloud (coming soon!). Here is how you can check that the deployment was successfull.

Run this command in your terminal to check that all pods in the tyk namespace are running:

```console
kubectl get pods -n tyk
````

**Expected result:**

```console
NAME                                  READY   STATUS    RESTARTS   AGE
gateway-tyk-hybrid-54b6c498f6-2xjvx   1/1     Running   0          4m27s
tyk-redis-master-0                    1/1     Running   0          47m
tyk-redis-replicas-0                  1/1     Running   0          47m
tyk-redis-replicas-1                  1/1     Running   0          46m
tyk-redis-replicas-2                  1/1     Running   0          46m
```

Note: if you are using a redis instance hosted somewhere else, then no redis pods will appear here. 

Run this command in your terminal to check that the services were correctly created:

```console
kubectl get service -n tyk
````

**Expected result:**

```console
NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
gateway-svc-tyk-hybrid   NodePort    10.96.232.123    <none>        443:32668/TCP   44m
tyk-redis-headless       ClusterIP   None             <none>        6379/TCP        47m
tyk-redis-master         ClusterIP   10.109.203.244   <none>        6379/TCP        47m
tyk-redis-replicas       ClusterIP   10.98.206.202    <none>        6379/TCP        47m
```

Note: IP adresses might differ on your system. 


Finally, send a HTTP call to the /hello endpoint of the service `gateway-svc-tyk-hybrid`:

```console
kubectl get service -n tyk
````

**Expected result:**

```json
{
  "status":"pass",
  "version":"4.3.3",
  "description":"Tyk GW",
  "details":{
    "redis": {"status":"pass","componentType":"datastore","time":"2023-03-15T11:39:10Z"},
    "rpc": {"status":"pass","componentType":"system","time":"2023-03-15T11:39:10Z"}}
}
```





#### Installation






#### Installing Tyk Open Source Gateway as a hybrid gateway
Now run the following command from the root of the repository:
```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```
## Hybrid Gateways using Docker

{{< note success >}}
**Note**

Although these instructions are for our containerized Gateway, the required configuration changes are the same regardless of how you’re running your Gateways (Bare metal, VM, etc.), you should update the <tyk.conf> for your Gateway install instead of <tyk.hybrid.conf>

{{< /note >}}

### Installation
### Requirements

* **Redis** - This is required for all Tyk installations. You can find instructions for a simple Redis installation in the Docker repo mentioned below.
* Set up a [Tyk Cloud account](https://tyk.io/docs/tyk-cloud/getting-started/) (With CP deployment set-up)
* [Docker Repo](https://github.com/TykTechnologies/tyk-gateway-docker)


### Steps for installation

1. Firstly, clone all repo files.

{{< img src="/img/hybrid-gateway/image3-35.png" alt="Clone repo files" >}}

2. Follow the docs in the repo, there's a [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) file that needs to be configured with the appropriate configuration items. To change these, head to your Tyk Cloud account. You need to change the following three values in **<tyk.hybrid.conf>**

```json
"slave_options": {
"rpc_key": "<ORG_ID>",
"api_key": "<API-KEY>",
"connection_string": "<MDCB-INGRESS>:443",
``` 

3. For the **MDCB-INGRESS**, choose the correct deployment and copy the MDCB URL.

{{< img src="/img/hybrid-gateway/image4-37.png" alt="Deployment" >}}

4. Next, we need an **ORG ID** and **API key** from the Tyk Cloud account.


5. Launch the API Manager Dashboard.

{{< img src="/img/hybrid-gateway/image6-39.png" alt="API Manager Dashboard" >}}   

Within the API Manager Dashboard select your Hybrid user. Under that user, copy the API key and add it. Then copy and paste the Org ID and save.

{{< img src="/img/hybrid-gateway/image2-33.jpeg" alt="API credentials" >}}

6 . Finally, edit the <docker-compose.yml> file to swap over the standalone config file to use the hybrid config file that was just configured.

From:

```yml
- ./tyk.standalone.conf:/opt/tyk-gateway/tyk.conf
```
To:

```yml
- ./tyk.hybrid.conf:/opt/tyk-gateway/tyk.conf
```

In this compose file, we've now got our gateway image, we've got Redis and we have some volume mappings.
Run the followng:

```bash
docker compose up -d
```

You should now have two running containers, a Gateway and a Redis.

Now it is time to publish a new API [Task 5 - Deploy your Edge Gateway and add your first API]({{< ref "/content/tyk-cloud/getting-started-tyk-cloud/first-api.md" >}})
