---
title: "Deploy Hybrid Data Plane using Legacy Helm Chart"
date: 2022-03-14
tags: ["Tyk Cloud", "Hybrid", "Gateways", "data plane", "Kubernetes", "MDCB"]
description: "How to deploy Hybrid Data Plane on Kubernetes using legacy Helm Chart"
menu:
  main:
    parent: "Deploy Hybrid Gateways"
weight: 5
---


{{< warning success >}}
**Warning**

`tyk-hybrid` chart is deprecated. Please use our [Tyk Data Plane helm chart]({{<ref "tyk-cloud/environments-deployments/hybrid-gateways#deploy-in-kubernetes-with-helm-chart">}}) instead. 

We recommend that all users to migrate to the `tyk-data-plane` Chart. Please review the [Configuration]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart#configuration">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

### 1. Add the Tyk official Helm repo `tyk-helm` to your local Helm repository

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

The helm charts are also available on [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid).

### 2. Then create a new namespace that will be hosting the Tyk Gateways

```bash
kubectl create namespace tyk
```

### 3. Get the default values.yaml for configuration

Before proceeding with installation of the chart we need to set some custom values. First save the full original values.yaml to a local copy:

```bash
helm show values tyk-helm/tyk-hybrid > values.yaml
```

### 4. Configure Tyk Gateway and its connection to Tyk Cloud

You need to modify the following values in your custom `values.yaml` file:

* `gateway.rpc.apiKey` - Tyk Dashboard API Access Credentials of the user created earlier
* `gateway.rpc.rpcKey` - Organisation ID
* `gateway.rpc.connString` - MDCB connection string
* `gateway.rpc.group_id`*(optional)*  - if you have multiple data plane (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belong. The data planes in the same group share one Redis instance.
* `gateway.sharding.enabled` and `gateway.sharding.tags`*(optional)*  - you can enable sharding to selectively load APIs to specific gateways, using tags. By default, sharding is disabled and the gateway will load all APIs.

### 5. Configure the connection to Redis

You can connect the gateway to any Redis instance already deployed (as DBaaS or hosted in your private infrastructure).

In case you don't have a Redis instance yet, here's how to deploy Redis in Kubernetes using Bitnami Helm charts.

```bash
helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password.

```bash
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

You need to modify the following values in your custom `values.yaml` file:

* `redis.addrs`: the name of the Redis instance including the port as set by Bitnami `tyk-redis-master.tyk.svc.cluster.local:6379`
* `redis.pass`: password set in redis (`$REDIS_PASSWORD`). Alternatively, you can use --set flag to set it during helm installation. For example `--set redis.pass=$REDIS_PASSWORD`.


### 6. Install Hybrid data plane

Install the chart using the configured custom values file:

```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```

You should see the prompt:

```bash
At this point, Tyk Hybrid is fully installed and should be accessible.
```


### 7. Check that the installation was successful

The hybrid data planes are not yet visible in Tyk Cloud (coming soon!). Here is how you can check that the deployment was successful.

Run this command in your terminal to check that all pods in the `tyk` namespace are running:

```bash
kubectl get pods -n tyk
````

**Expected result:**

```bash
NAME                                  READY   STATUS    RESTARTS   AGE
gateway-tyk-hybrid-54b6c498f6-2xjvx   1/1     Running   0          4m27s
tyk-redis-master-0                    1/1     Running   0          47m
tyk-redis-replicas-0                  1/1     Running   0          47m
tyk-redis-replicas-1                  1/1     Running   0          46m
tyk-redis-replicas-2                  1/1     Running   0          46m
```

Note: if you are using a Redis instance hosted somewhere else, then no Redis pods will appear here.

Run this command in your terminal to check that the services were correctly created:

```bash
kubectl get service -n tyk
````

**Expected result:**

```bash
NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
gateway-svc-tyk-hybrid   NodePort    10.96.232.123    <none>        443:32668/TCP   44m
tyk-redis-headless       ClusterIP   None             <none>        6379/TCP        47m
tyk-redis-master         ClusterIP   10.109.203.244   <none>        6379/TCP        47m
tyk-redis-replicas       ClusterIP   10.98.206.202    <none>        6379/TCP        47m
```

Note: IP adresses might differ on your system.


Finally, from your terminal, send an HTTP call to the /hello endpoint of the gateway `gateway-svc-tyk-hybrid`:

Note: you may need to port forward if you're testing on a local machine, e.g. `kubectl port-forward service/gateway-svc-tyk-hybrid -n tyk 8080:443`

```bash
curl http://hostname:8080/hello -i
```

**Expected result:**

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 17 Mar 2023 10:35:35 GMT
Content-Length: 234

{
  "status":"pass",
  "version":"4.3.3",
  "description":"Tyk GW",
  "details":{
    "redis": {"status":"pass","componentType":"datastore","time":"2023-03-15T11:39:10Z"},
    "rpc": {"status":"pass","componentType":"system","time":"2023-03-15T11:39:10Z"}}
}
```


## Next steps

Now it is time to publish a new API [Task 5 - Deploy your Cloud Data Plane and add your first API]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api.md" >}})
