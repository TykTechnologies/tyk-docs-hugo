---
title: Upgrading Tyk
description: Guide for upgrading Tyk components
weight: 251
menu:
    main:
        parent: "FAQ"
---

## Introduction

Please read this through before upgrading any of your Tyk components.

This page provides guidance for upgrading your Tyk installation. When upgrading Tyk, you need to consider every component (e.g. Gateway, Pump, Dashboard) separately taking into consideration the style of deployment you've implemented. 
We have structured this guide by deployment type (e.g. Cloud, Self-Managed etc.) to keep all the information you need in one place.

## Important to know
All our components share a few common standards:
- We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
- Check our [versioning and long-term-support policies]({{< ref "frequently-asked-questions/long-term-support-releases/" >}}) for more details on the way we release major and minor features, patches and the support dates for each release.
- If you experience any issues with the new version you pulled, please contact Tyk Support for assistance at support@tyk.io


## Tyk Cloud Upgrade
Tyk Cloud users manage Tyk deployments via the Tyk Cloud Console. 
Using this console you can upgrade Tyk manager and the data plane gateways in their regions.
Please read about [editing control planes]({{< ref "tyk-cloud/environments--deployments/managing-control-planes#edit-control-planes" >}}) to learn more!


## Tyk Gateway Self-managed Upgrade - used in Licensed and Open source deployments

This section applies to all self-managed users, both licensed and Open source users.

All our components share a few common standards:
- Upgrade does not overwrite your configuration files, however, it is good practice to back these files up routinely (using git or another tool); we strongly recommend you take a backup before upgrading Tyk.
- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).
- Upgrade is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes or Helm and essentially means pulling the new images from public directories. Using the following links you can find the list of all our releases:
  - Docker & Kubernetes - [Docker Hub - https://hub.docker.com/u/tykio](https://hub.docker.com/u/tykio)
  - Helm install - [Artifact Hub - https://artifacthub.io/packages/helm/tyk-helm](https://artifacthub.io/packages/helm/tyk-helm/)
  - Linux - [Packagecloud - https://packagecloud.io/tyk](https://packagecloud.io/tyk)
- The above repositories will be updated when new versions are released

#### Production Environment Upgrade
Regardless of your deployment of choice (Linux, Docker, Kubernetes), we recommend you do the upgrade in the following way:
 1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
 2. Get/update the latest binary (i.e. update the docker image name in the command, Kubernetes manifest or values.yaml of Helm chart or get the latest packages with `apt-get update`)
 3. Use deployment's best practices for a rolling update (in local, non-shared, non-production environments simply restart the gateway)
 4. Check the log to see that the new version is used and that the gateway is up and running
 5. Check that the gateway is healthy using the open `/hello` API.

### Docker Upgrade

#### Development environment
In a development environment, in which you can simply restart your gateways, do the following:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the following command to `v5.1` and run it as follows:

```console
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.1
```
   For full details, check the usual [installation page]({{< ref "tyk-oss/ce-docker" >}} under *Docker standalone* tab.

#### Docker compose upgrade in simple environment

When upgrading a non-production environment, in which it's okay to have a brief downtime and you can simply restart your gateways, do the following:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the `docker-compose.yaml` file. 
   <br>
   For example, this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4) has this line `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want to use.
3. Restart the gateway (or stop and start it)
```console
docker compose restart 
```
4. Check the log to see that the new version is used and if the gateway is up and running
5. Check that the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.1.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

#### Production Environment Upgrade
1. Backup your gateway config file
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/]
3. Check the log to see that the new version is used and if the gateway is up and running
4. Check that the gateway is healthy


### Kubernetes Upgrade

#### Simple Kubernetes environment upgrade

When upgrading a non-production environment, in which it's okay to have a brief downtime and you can simply restart your gateways, the upgrade is trivial as with any other image you want to upgrade in Kubernetes:

In a similar way to docker:
1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the manifest file.
3. Apply the file/s using kubectl

```console
$ kubectl apply -f .
``` 
You will see that the deployment has changed.

Now you can check the gateway pod to see the latest events (do `kubectl get pods` to get the pod name):
    
```console
kubectl describe pods <gateway pod name>
```
You should see that the image was pulled, the container got created and the gateway started running again, similar to the following output:

```console
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  118s  default-scheduler  Successfully assigned tyk/tyk-gtw-89dc9f554-5487c to docker-desktop
  Normal  Pulling    117s  kubelet            Pulling image "tykio/tyk-gateway:v5.0"
  Normal  Pulled     70s   kubelet            Successfully pulled image "tykio/tyk-gateway:v5.0" in 47.245940479s
  Normal  Created    70s   kubelet            Created container tyk-gtw
  Normal  Started    70s   kubelet            Started container tyk-gtw
```

4. Check the log to see that the new version is used and if the gateway is up and running
```console
$ kubectl logs service/gateway-svc-tyk-gateway-tyk-headless --tail=100 --follow 
Defaulted container "gateway-tyk-headless" out of: gateway-tyk-headless, setup-directories (init)
time="Jul 17 20:58:27" level=info msg="Tyk API Gateway 5.1.0" prefix=main
...
```
5. Check the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.1.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

#### Upgrade Tyk K8S Demo deployment

1. In the [Tyk k8s Demo](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/README.md) repo, change the version in [.env file](https://github.com/TykTechnologies/tyk-k8s-demo/blob/893ce2ac8b13b4de600003cfb1d3d8d1625125c3/.env.example#L2), `GATEWAY_VERSION=v5.1` to the version you want
2. Restart the deployment
3. Check the log file 

### Helm charts

Instructions for upgrading Tyk gateway. You should follow the same flow for Tyk manager, Tyk Pump and MDCB.

1. Backup your gateway config file (`tyk.conf` or the name you chose for it).
2. Update the image version in your values.yaml
   <br>
   For example this in [values.yaml](https://github.com/TykTechnologies/tyk-charts/blob/83de0a184014cd027ec6294b77d034d6dcaa2a10/components/tyk-gateway/values.yaml#L142) change the version of the tag `tag: v5.1` to the version you want.
3. Run `Helm upgrade` with your relevant `values.yaml` file/s. 
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.

### Other installation choices
Look up your installation type in the [installation options page]({{< ref "apim/open-source/installation/" >}}) and do the same as explained above for [production environment upgrade](#Production-Environment-Upgrade)

## Tyk Hybrid Gateway Upgrade
This gateway is your gateway data plane and is used to connect to the *Tyk Cloud Control Plane* or to your self-managed control plane (MDCB).
Tyk hybrid gateway is the same binary as Tyk Gateway just with a different setting in the config file. Follow the above instructions based on your installation type. 


## Tyk Self-Managed

### Components installation order in a production environment
In a production environment, where we recommend installing the Dashboard, Gateway and Pump on separate machines, you should upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

Tyk is compatible with a blue-green or rolling update strategy.

For a single-machine installation, you should follow the instructions below for your operating system.

### Ubuntu Upgrade

```console
sudo apt-get update && sudo apt-get upgrade
```

### RHEL Upgrade
```console
sudo yum update
```

## Tyk Self-Managed Multi Data Centre Bridge (MDCB) Upgrade

Our recommended sequence for upgrading an MDCB installation is as follows:

First, install the components of Tyk Control Plane in the following order:
1. MDCB
2. Tyk Pump (if in use)
3. Tyk Manager
4. Tyk Gateway

Then the components in Tyk Data Planes in the following order:

1. Tyk Pump (if in use)
2. Tyk Gateway

We do this to be backwards compatible and upgrade the *MDCB* component first, followed by the other component in the control plane and then the data plane to ensure that:

1. It's extremely fast to see if there are connectivity issues, but the way Gateways in Hybrid mode work means they keep working even if disconnected
2. It ensures that we don't have forward compatibility issues (new Gateway -> old MDCB)

Tyk is compatible with a blue-green or rolling update strategy.

## Tyk Go Plugins

We release a new version of our Tyk Go plugin compiler binary with each release. You will need to rebuild your Go plugins when updating to a new release. See [Rebuilding Go Plugins]({{< ref "plugins/supported-languages/golang#when-upgrading-your-tyk-installation" >}}) for more details.

## Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)
