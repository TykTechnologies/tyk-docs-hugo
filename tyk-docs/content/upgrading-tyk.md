---
title: Upgrading Tyk
description: Guide for upgrading Tyk components
weight: 251
menu:
    main:
        parent: "FAQ"
---

Before proceeding with any Tyk component upgrades, please read this guide thoroughly.

This page provides guidance for upgrading your Tyk installation. When upgrading Tyk, you need to consider each component (e.g. Gateway, Pump, Dashboard) separately, taking into account the deployment style you've implemented. We have structured this guide by deployment type (e.g. Cloud, Self-Managed, etc.) to keep all the information you need in one place.

## Important to know

All our components adhere to a few common standards:

- We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
- Check our [versioning and long-term-support policies]({{< ref "developer-support/long-term-support-releases" >}}) for more details on the way we release major and minor features, patches and the support dates for each release.
- Make sure you follow our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}}) before starting the upgrade.
- Make sure you have considered the [upgrade prerequisites]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}) before starting the upgrade.
- If you experience any issues with the new version you pulled, please contact Tyk Support or [Tyk community forum](https://community.tyk.io/).


## Upgrade Tyk components in Tyk Cloud 
Tyk Cloud users manage Tyk deployments via the Tyk Cloud Console. You can upgrade Tyk Dashboard and the Gateways in the Cloud Data Planes using this console. Please consult our upgrade guides for [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/cloud/cloud-saas/" >}}) and [Hybrid SaaS]({{< ref "developer-support/upgrading-tyk/cloud/hybrid/" >}}) to learn more!

---

## Tyk Gateway Upgrade - Used in Licensed and Open Source Deployments

This section applies to all self-managed components, including licensed and open-source.

All our components share a few common standards:
- Upgrades do not overwrite your configuration files. However, it is a good practice to back up these files routinely (using git or another tool). We strongly recommend taking a backup before upgrading Tyk. The upgrade will deploy new copies of startup scripts, so any customizations should be saved in advance
- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).
- Upgrading is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes, or Helm. It essentially means pulling the new images from public directories. You can find the list of all our releases in the following links:
  - Docker & Kubernetes - [Docker Hub - https://hub.docker.com/u/tykio](https://hub.docker.com/u/tykio)
  - Helm install - [Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm](https://artifacthub.io/packages/search?repo=tyk-helm)
  - Linux - [Packagecloud - https://packagecloud.io/tyk](https://packagecloud.io/tyk)
- The above repositories will be updated when new versions are released

The sections below explain how to upgrade Tyk Gateway on:
- [Docker](#docker)
- [Kubernetes](#k8s)
- [Linux](#linux)

### Linux Upgrade {#linux}

Please consult our guides for upgrading Tyk Gateway in a self managed environment for [RHEL (CentOS)]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm" >}}) and [Debian]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb" >}}) Linux distributions.

---

### Docker Upgrade {#docker}

#### Development environment
In a development environment where you can simply restart your gateways, follow these steps:

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

For full details, check the usual [installation page]({{< ref "tyk-oss/ce-docker" >}}) under *Docker standalone* tab.

#### Docker compose upgrade in a simple environment
When upgrading a non-production environment where it's okay to have a brief downtime and you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the `docker-compose.yaml` file. 
   <br>
   For example, this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4) has this line `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want to use.
3. Restart the gateway (or stop and start it)
```console
$ docker compose restart 
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
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/)
3. Check the log to see that the new version is used and if the gateway is up and running
4. Check that the gateway is healthy

---

### Kubernetes Upgrade{#k8s}

#### Simple Kubernetes environment upgrade

When upgrading a non-production environment where it's okay to have a brief downtime and you can simply restart your gateways, the upgrade is trivial as with any other image you want to upgrade in Kubernetes:

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
$ kubectl describe pods <gateway pod name>
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

### Helm charts{#helm#}

Instructions for upgrading Tyk gateway. You should follow the same flow for Tyk Dashboard, Tyk Pump and MDCB.

1. Backup your gateway config file (`tyk.conf` or the name you chose for it).
2. Update the image version in your values.yaml
   <br>
   For example, in this [values.yaml](https://github.com/TykTechnologies/tyk-charts/blob/83de0a184014cd027ec6294b77d034d6dcaa2a10/components/tyk-gateway/values.yaml#L142) change the version of the tag `tag: v5.1` to the version you want.
3. Run `Helm upgrade` with your relevant `values.yaml` file/s. 
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.

---

## Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

---

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)
