---
title: Upgrading Tyk
weight: 251
menu:
    main:
        parent: "FAQ"
---

## Introduction

Please read this through before upgrading any of your Tyk components.

This page provides guidance for upgrading your Tyk installation. When upgrading Tyk, you need to consider every component (e.g. Gateway, Pump, Dashboard) separately taking into consideration the style of deployment you've implemented. We have structured this guide by deployment type (e.g. Self-Managed, Multi-DC) to keep all the information you need in one place.

All our components share a few common standards:
- We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
- Upgrade does not overwrite your configuration files, however, it is good practice to back these files up routinely (using git or another tool); we strongly recommend you take a backup before upgrading Tyk.
- Upgrading essentially means pulling the new images from https://hub.docker.com/u/tykio, and linux packages from https://packagecloud.io/tyk/ 
- Upgrade is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes or Helm.
- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).
- Check our [versioning and long-term-support policies]({{< ref "frequently-asked-questions/long-term-support-releases/" >}}) for more details on the way we release major and minor features, patches and how long we support each release.
- If you experience any issues with the new version you pulled, please contact Tyk Support for assistance at support@tyk.io

## Tyk OSS Gateway

### List of releases

To get the list of image releases for containerised deployments, such as Docker and Kubernetes, please visit [docker hub](https://hub.docker.com/r/tykio/tyk-gateway/tags)

### Docker

#### Simple environment or a Dev environment
In a development environment, in which you can simply restart your gateways, do the following:

1. Backup your gateway config file
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the follwing command to `v5.0` and run it as follows:
```bash
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.0
```
   For full details, check the usual [installation page]({{< ref "tyk-oss/ce-docker" >}} under *Docker standalone* tab.

#### Production environment
1. Backup your gateway config file
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/]

### Docker compose

#### Simple environment or a Dev environment
In a simple environment or a development environment, in which you can simple restart your gateways, do the follwing:

In a similar way to docker:
1. Backup your gateway config file (`tyk.conf` or the name you chose for it).

2. Update the image version in the `docker-compose.yaml` file. 
   <br>
   For example this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4) has this line `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want and Docker will pull (unless it has already been pulled before).
    
3. Restart the gateway (or stop and start it)
```bash
docker compose restart 
```

### Kubernetes
#### Simple environment or a Dev environment
In a simple environment or a development environment, in which you can simple restart your gateways, the upgrade is trivial as with any other image you want to upgrade in Kubernetes:

In a similar way to docker:
1. Backup your gateway config file (`tyk.conf` or the name you chose for it).

2. Update the image version in the manifest file.
   <br>For example, in the demo repo [tyk-oss-k8s-deployment], change [this line](https://github.com/TykTechnologies/tyk-oss-k8s-deployment/blob/a676f5895422a02a33111d4cba65d86f013aa6f0/gw-deploy.yaml#L19) in the gateway Deployment manifest, `image: "tykio/tyk-gateway:v3.1.0"` to the version you want 
 3. Apply the file/s using kubectl

```
$ kubectl apply -f .
``` 

You will see that the deployment has changed:

```
configmap/tyk-gateway-conf unchanged
deployment.apps/tyk-gtw configured
service/tyk-svc unchanged
deployment.apps/redis configured
service/redis unchanged
```

Now you can check the gateway pod to see the latest events (do `kubectl get pods` to get the pod name):
    
```console
kubectl describe pods <gateway pod name>
```
You should see that the image was pulled, container got created and the gateway started running again, similar to the following output:

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

### Helm charts
1. Backup your gateway config file (`tyk.conf` or the name you chose for it).

2. Update the image version in your values.yaml
   <br>
   For example this in [this Deployment manifest](https://github.com/TykTechnologies/tyk-oss-k8s-deployment/blob/a676f5895422a02a33111d4cba65d86f013aa6f0/gw-deploy.yaml#L19) change the version in the line `image: "tykio/tyk-gateway:v3.1.0"` to the version you want.
    
3. Run `Helm upgrade` with your relevant `values.yaml` file/s. 
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.

### Other installation choices
Check this [instalaltion page]({{< ref "apim/open-source/installation/" >}}) for your installation types and in a similar way - 
1. Update your gateway config file 
2. Use the official upgrade best practices of your installation of choice.

# AAAAAAAAA WIP from here AAAAAAAA
## Tyk Multi-Cloud / Hybrid Gateway
This gateway is used to connect to the control plan of *Tyk Cloud* or to your self managed control plane (MDCB).

Regarless of the deployment choice (Linux, docker, Kubernetes), we recommend you do the upgrade in the following way:

 1. Backup your gateway config file (`tyk.conf` or the name you chose for it). This is important if you have modified your Docker Container in your current version.
 2. Get/update the latest binary (i.e. update the docker image name inthe command, Kubernetes manifest or Helm chart or get the latest packages with `apt-get update`)
 2. Re-run the gateway deployment (i.e. rerun the docker container which will pull the latest image, helm upgrade or `apt-get upgrade`)
 

### For Docker users

```bash
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```
From a Terminal:

```bash
curl "https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh" -o "start.sh"
chmod +x start.sh
./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```
### For Linux Users
```{.copyWrapper}
wget https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh
chmod +x start.sh
sudo ./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```

This command will start the Docker container and be ready to proxy traffic (you will need to check the logs of the container to make sure the login was successful).

#### Parameters:
*   `PORT`: The port for Tyk to listen on (usually 8080).
*   `TYK-SECRET`: The secret key to use so you can interact with your Tyk node via the REST API.
*   `RPC-CREDENTIALS`: Your **Organisation ID**. This can be found from the System Management > Users section from the Dashboard. Click **Edit** on a User to view the Organisation ID.
*   `API-CREDENTIALS`: Your **Tyk Dashboard API Access Credentials**. This can be found from the System Management > Users section from the Dashboard. Click **Edit** on a User to view the Tyk Dashboard API Access Credentials. {{< img src="/img/dashboard/system-management/api_access_cred_2.5.png" alt="API key location" >}}

#### Check everything is working

To check if the node has connected and logged in, use the following command:
```{.copyWrapper}
sudo docker logs --tail=100 --follow tyk_hybrid
```

  
This will show you the log output of the Multi-Cloud container, if you don't see any connectivity errors, and the log output ends something like this:
```
time="Jul  7 08:15:03" level=info msg="Gateway started (vx.x.x.x)"
time="Jul  7 08:15:03" level=info msg="--> Listening on port: 8080"
```

Then the Gateway has successfully re-started.

## Tyk Self-Managed

### List of releases

To get the list of image releases, for containerised deployments such as Docker and Kubernetes use [docker hub](https://hub.docker.com/r/tykio/tyk-dashboard/tags)

In a production environment, where we recommend installing the Dashboard, Gateway and Pump on separate machines, you should upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

Tyk is compatible with a blue-green or rolling update strategy.

For a single machine installation, you should follow the instructions below for your operating system.

Our repositories will be updated at [https://packagecloud.io/tyk](https://packagecloud.io/tyk) when new versions are released. As you set up these repositories when installing Tyk to upgrade all Tyk components  you can run:

### For Ubuntu

```{.copyWrapper}
sudo apt-get update && sudo apt-get upgrade
```

### For RHEL
```{.copyWrapper}
sudo yum update
```
{{< note success >}}
**Note**  

For the Tyk Gateway before v2.5 and Tyk Dashboard before v1.5 there's a known Red Hat bug with init scripts being removed on package upgrade. In order to work around it, it's required to force reinstall the packages, e.g.:
`sudo yum reinstall tyk-gateway tyk-dashboard`
{{< /note >}}

## Tyk Self-Managed Multi Data Centre Bridge (MDCB)

Our recommended sequence for upgrading a MDCB installation is as follows:

Master DC first in the following order:

1. MDCB
2. Pump (if in use)
3. Dashboard
4. Gateway

Then your worker DC Gateways in the following order:

1. Pump (if in use)
2. Gateway

We do this to be backwards compatible and upgrading MDCB first followed by the master DC then worker DC Gateways ensures that:

1. It's extremely fast to see if there are connectivity issues, but the way Gateways in worker mode work means they keep working even if disconnected
2. It ensures that we don't have forward compatibility issues (new Gateway -> old MDCB)

Tyk is compatible with a blue-green or rolling update strategy.

## Tyk Go Plugins

We release a new version of our Tyk Go plugin compiler binary with each release. You will need to rebuild your Go plugins when updating to a new release. See [Rebuilding Go Plugins]({{< ref "plugins/supported-languages/golang#when-upgrading-your-tyk-installation" >}}) for more details.

## Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)
