---
title: "Installation Options for Tyk Gateway"
description: "This page serves as a comprehensive guide to installing Tyk Gateway Open Source"
tags: ["installation", "migration", "open source"]
aliases:
  - /tyk-oss/ce-centos
  - /tyk-oss/ce-debian-ubuntu
  - /tyk-oss/ce-kubernetes-ingress
  - /tyk-oss/ce-redhat
  - /tyk-oss/ce-redhat-rhel-centos
  - /tyk-oss/ce-ubuntu
  - /tyk-oss/ce-helm-chart-new
  - /tyk-oss/ce-ansible
  - /tyk-oss/ce-docker
  - /tyk-oss/ce-github
  - /tyk-oss/ce-helm-chart
  - /tyk-oss/ce-kubernetes
  - /apim/open-source/getting-started
  - /getting-started/installation
  - /try-out-tyk/tutorials/tutorials
---


## Introduction

The backbone of all our products is our open source Gateway. You can install our Open Source / Community Edition on the following platforms:

{{< grid >}}

{{< badge read="10 mins" href="apim/open-source/installation#install-tyk-gateway-with-docker" image="/img/docker.png" alt="Docker install">}}
Install with Docker. 
{{< /badge >}}

{{< badge read="10 mins" href="apim/open-source/installation#install-tyk-gateway-with-kubernetes" image="/img/k8s.png" alt="Kubernetes Install">}}
Install with K8s. 
{{< /badge >}}

{{< badge read="10 mins" href="apim/open-source/installation#install-tyk-gateway-with-ansible" image="/img/ansible.png" alt="Ansible install">}}
Install with Ansible. 
{{< /badge >}}

{{< badge read="10 mins" href="apim/open-source/installation#install-tyk-gateway-on-red-hat-rhel--centos" image="/img/redhat-logo2.png" alt="Redhat / CentOS install">}}
Install on RHEL / CentOS. 
{{< /badge >}}

{{< badge read="10 mins" href="apim/open-source/installation#install-tyk-gateway-with-ubuntu" image="/img/debian-nd-753.png" alt="Debian / Ubuntu install">}}
Install on Debian / Ubuntu. 
{{< /badge >}}

{{< badge read="10 mins" href="https://github.com/TykTechnologies/tyk" image="/img/GitHub-Mark-64px.png" alt="Tyk Gateway GitHub Repo">}}
Visit our Gateway GitHub Repo. 
{{< /badge >}}

{{< /grid >}}

## Install Tyk Gateway with Docker

We will show you two methods of installing our Community Edition Gateway on Docker.
The quickest way to get started is using docker-compose. Visit our [Dockerhub](https://hub.docker.com/u/tykio/) to view the official images.

### Prerequisites

The following are required for a Tyk OSS installation:
 - Redis   - Required for all Tyk installations.
             Simple Redis installation instructions are included below.
 - MongoDB - Required only if you chose to use the Tyk Pump with your Tyk OSS installation. Same goes with any [other pump data stores]({{< ref "api-management/tyk-pump#external-data-stores" >}}) you choose to use.

### Steps for Installation

1. **Create a network**

```bash
docker network create tyk
```

2. **Deploy Redis into the network, with the `6379` port open**

```bash
docker run -itd --rm --name tyk-redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
```

3. **Next, let's download a JSON `tyk.conf` configuration file**

```bash
wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
```

4. **Run the Gateway, mounting the conf file into the container**

```bash
docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```


### Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by making a network request to the 'hello' endpoint:

```curl
curl localhost:8080/hello
```

Output should be similar to that shown below:
```json
{"status":"pass","version":"v3.2.1","description":"Tyk GW"}
```


## Install Tyk Gateway with Kubernetes

The main way to install the Open Source *Tyk Gateway* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the community forum if you have questions, requests or suggestions for improvements.

Get started with our [Quick Start guide]({{< ref "#quick-start-with-helm-chart" >}}) or go to [Tyk Open Source helm chart]({{< ref "product-stack/tyk-charts/tyk-oss-chart" >}}) for detailed installation instructions and configuration options.

### Quick Start with Helm Chart

At the end of this quick start, Tyk Gateway should be accessible through the service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 
The following guides provide instructions to install Redis and Tyk Open Source with default configurations. It is intended for a quick start only. For production, you should install and configure Redis separately. 

#### Prerequisites

1. [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
2. [Helm 3+](https://helm.sh/docs/intro/install/)

#### Steps for Installation

1. **Install Redis and Tyk**

```bash
NAMESPACE=tyk-oss
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade tyk-oss tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

2. **Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 

You are now ready to [create an API]({{< ref "api-management/gateway-config-managing-classic#create-an-api" >}}).

For the complete installation guide and configuration options, please see [Tyk OSS Helm Chart]({{< ref "product-stack/tyk-charts/tyk-oss-chart" >}}).

### Configure Legacy Tyk Headless Helm Chart
{{< warning success >}}
**Warning**

`tyk-headless` chart is deprecated. Please use our Tyk Chart for Tyk Open Source at [tyk-oss]({{< ref "#quick-start-with-helm-chart" >}}) instead. 

We recommend all users migrate to the `tyk-oss` Chart. Please review the [Configuration]({{< ref "#quick-start-with-helm-chart" >}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

This is the preferred (and easiest) way to install the Tyk OSS Gateway on Kubernetes.
It will install Tyk gateway in your Kubernetes cluster where you can add and manage APIs directly or via the *Tyk Operator*.

#### Prerequisites

The following are required for a Tyk OSS installation:
1. Redis   - required for all the Tyk installations and must be installed in the cluster or reachable from inside K8s.
             You can find instructions for a simple Redis installation below.
2. MongoDB/SQL - Required only if you choose to use the MongoDB/SQL Tyk pump with your Tyk OSS installation. The same goes for any
             [other pump]({{< ref "api-management/tyk-pump#external-data-stores" >}}) you choose to use.
3. Helm - Tyk Helm supports the Helm 3+ version.

#### Steps for Installation

As well as our official OSS Helm repo, you can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-headless).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless" data-theme="light"
data-header="true" data-responsive="true"><blockquote><p lang="{{ .Site.LanguageCode }}" dir="ltr">
<b>tyk-headless</b>: This chart deploys the open-source Tyk Gateway. Tyk Gateway is a fully open-source Enterprise API Gateway, supporting REST, GraphQL, TCP, and gRPC protocols. Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organizations and businesses around the world to protect, secure, and process APIs as well as review and audit the consumed APIs.
</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless">Artifact Hub</a></blockquote>
</div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs, or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-headless)

1. **Add Tyk official Helm repo**

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

2. **Create a namespace for Tyk deployment**

```bash
kubectl create namespace tyk
```

3. **Getting values.yaml**

Before we proceed with installation of the chart you may need to set some custom values.
To see what options are configurable on a chart and save those options to a custom `values.yaml` file run:

```bash
helm show values tyk-helm/tyk-headless > values.yaml
```

Some of the necessary configuration parameters will be explained in the next steps.

4. **Installing Redis**

* Recommended: via *Bitnami* chart - For Redis, you can use these rather excellent chart provided by Bitnami.
Copy the following commands to add it: 

  ```bash
  helm repo add bitnami https://charts.bitnami.com/bitnami
  helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
  ```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get a list of [supported versions]({{< ref "tyk-configuration-reference/redis-cluster-sentinel#supported-versions" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password.

```
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk.svc.cluster.local:6379`
You can update them in your local `values.yaml` file under `redis.addrs` and `redis.pass`
Alternatively, you can use `--set` flag to set it in the Tyk installation. For example  `--set redis.pass=$REDIS_PASSWORD`

**For evaluation only: Use *simple-redis* chart**

{{< warning  success >}}
**Warning**

Another option for Redis, to get started quickly, is to use our *simple-redis* chart.
Please note that these provided charts must never be used in production or for anything
but a quick start evaluation only. Use Bitnami Redis or Official Redis Helm chart in any other case.
We provide this chart, so you can quickly deploy *Tyk gateway*, but it is not meant for long-term storage of data.

{{< /warning >}}

```bash
helm install redis tyk-helm/simple-redis -n tyk
```

5. **Installing Tyk Open Source Gateway**

```bash
helm install tyk-ce tyk-helm/tyk-headless -f values.yaml -n tyk
 ```

Please note that by default, Gateway runs as `Deployment` with `ReplicaCount` as 1. You should not update this part because multiple instances of OSS gateways won't sync the API Definition.

#### Installation Video

See our short video on how to install the Tyk Open Source Gateway.
Please note that this video shows the use of the Github repository since it was recorded before the official repo was available, However,
it's very similar to the above commands.

{{< youtube mkyl38sBAF0 >}}

#### Pump Installation
By default pump installation is disabled. You can enable it by setting `pump.enabled` to `true` in `values.yaml` file.
Alternatively, you can use `--set pump.enabled=true` while doing Helm install.

**Quick Pump configuration(Supported from tyk helm v0.10.0)**
*1. Mongo Pump*

To configure the Mongo pump, make the following changes in `values.yaml` file:
1. Set `backend` to `mongo`.
2. Set connection string in `mongo.mongoURL`.

*2. Postgres Pump*

To configure the Postgres pump, make the following changes in `values.yaml` file:
1. Set `backend` to `postgres`.
2. Set connection string parameters in `postgres` section.

#### Optional - Using TLS
You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway
listen on port 443 and load up a dummy certificate.
You can set your own default certificate by replacing the file in the `certs/` folder.

#### Optional - Mounting Files
To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component.

For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

#### Optional - Tyk Ingress
To set up an ingress for your Tyk Gateways see our [Tyk Operator GitHub repository](https://github.com/TykTechnologies/tyk-operator).


## Install Tyk Gateway with Ansible

### Prerequisites

1. [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands.
2. Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

### Steps for Installation
1. Clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run the init script to initialize the environment

```bash
$ sh scripts/init.sh
```

4. Modify the `hosts.yml` file to update SSH variables to your server(s). For more information about the host file, visit the [Ansible inventory documentation] (https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-ce`

```bash
$ ansible-playbook playbook.yaml -t tyk-ce -t redis
```

You can choose to not install Redis by removing the `-t redis`. However, Redis is a requirement and needs to be installed for the gateway to run.

### Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

### Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the host url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if Redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if Redis connection is secured with SSL |
| gateway.service.host | | Gateway server host if different than the host url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

## Install Tyk Gateway with Ubuntu

The Tyk Gateway can be installed following different installation methods including *Ansible* and *Shell*. Please select by clicking the tab with the installation path most suitable for you.

### Install Tyk Gateway On Ubuntu Through Shell

#### 

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 11 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

#### Prerequisites

1. Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

#### Steps for Installation

1. **Install Redis**

```console
$ sudo apt-get install -y redis-server
```

2. **First import the public key as required by Ubuntu APT**

```console
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

3. **Run Installation Scripts via our PackageCloud Repositories**

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your Ubuntu version. We have packages for the following:
 * Xenial
 * Trusty
 * Precise

* Via Quick Installation Instructions. You can use: 
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-deb)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

4. **Configure The Gateway**

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.
{{< /note >}}


```console
$ sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What you've done here is tell the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, you don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

5. **Starting Tyk**

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```console
$ sudo service tyk-gateway start
```

### Install Tyk Gateway On Ubuntu Through Ansible

#### Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 11 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

#### Prerequisites

Before you begin the installation process, make sure you have the following:
- [Git](https://git-scm.com/download/linux) - required for getting the installation files.
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. 
- Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

#### Steps for Installation

1. **Clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository**

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. **`cd` into the directory**
```bash
$ cd tyk-ansible
```

3. **Run initalisation script to initialise environment**

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. **Run ansible-playbook to install `tyk-gateway-ce`**

```bash
$ ansible-playbook playbook.yaml -t tyk-gateway-ce -t redis
```
{{< note success >}}
**Note**

Installation flavors can be specified by using the -t {tag} at the end of the ansible-playbook command. In this case we are using:
-`tyk-gateway-ce`: Tyk Gateway with CE config
-`redis`: Redis database as Tyk Gateway dependency
{{< /note >}}

#### Variables

- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the hosts url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if redis connection is secured with SSL |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).


## Install Tyk Gateway on Red Hat (RHEL / CentOS)

The Tyk Gateway can be installed following different installation methods including *Shell* and *Ansible*. Please select by clicking the tab with the installation path most suitable for you.

### Install Tyk Gateway Through Shell

#### Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

#### Prerequisites

Before you begin the installation process, make sure you have the following:

*   Ensure port `8080` is open for Gateway traffic (the API traffic to be proxied).
*   The Tyk Gateway has a [dependency]({{< ref "tyk-configuration-reference/redis-cluster-sentinel#supported-versions" >}}) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

#### Steps for Installation 
1. **Create Tyk Gateway Repository Configuration**

Create a file named `/etc/yum.repos.d/tyk_tyk-gateway.repo` that contains the repository configuration settings for YUM repositories `tyk_tyk-gateway` and `tyk_tyk-gateway-source` used to download packages from the specified URLs. This includes GPG key verification and SSL settings, on a Linux system.

Make sure to replace `el` and `8` in the config below with your Linux distribution and version:
```bash
[tyk_tyk-gateway]
name=tyk_tyk-gateway
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/8/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

[tyk_tyk-gateway-source]
name=tyk_tyk-gateway-source
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/8/SRPMS
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

Update your local yum cache by running:
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway'
```

2. **Install Tyk Gateway**

Install the Tyk Gateway using yum:
```bash
sudo yum install -y tyk-gateway
```
{{< note success >}}
**Note**

You may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue.
{{< /note >}}

3. **Start Redis**

If Redis is not running then start it using the following command:
```bash
sudo service redis start
```
4. **Configuring The Gateway**

You can set up the core settings for the Tyk Gateway with a single setup script, however for more complex deployments you will want to provide your own configuration file.

{{< note success >}}
**Note**

Replace `<hostname>` in `--redishost=<hostname>` with your own value to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What you've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, you don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

5. **Start the Tyk Gateway**

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```

### Install Tyk Gateway Through Ansible

#### Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

#### Prerequisites
Before you begin the installation process, make sure you have the following:

1. [Git](https://git-scm.com/download/linux) - required for getting the installation files.
2. [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below.
3. Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

#### Steps for Installation

1. **Clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository**

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. **`cd` into the directory**
```bash
$ cd tyk-ansible
```

3. **Run the initalisation script to initialise your environment**

```bash
$ sh scripts/init.sh
```

4. Modify the `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. **Run ansible-playbook to install `tyk-gateway-ce`**

```bash
$ ansible-playbook playbook.yaml -t tyk-gateway-ce -t redis
```
{{< note success >}}
**Note**  

Installation flavors can be specified by using the -t {tag} at the end of the ansible-playbook command. In this case we are using:
  -`tyk-gateway-ce`: Tyk Gateway with CE config
  -`redis`: Redis database as Tyk Gateway dependency
{{< /note >}}

#### Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the hosts url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if redis connection is secured with SSL |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

## Install Tyk Gateway on Killercoda

[Killercoda](https://killercoda.com/about) gives you instant access to a real Linux or Kubernetes command-line environment via your browser. 
You can try this [Killercoda Tyk scenario](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose) to walk through the installation of our Open Source Gateway using Docker Compose (the exact same flow shown above).

