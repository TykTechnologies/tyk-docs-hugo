---
title: "Install Tyk Self Managed"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk Self Managed"
tags: ["installation", "migration", "self managed"]
aliases:
  - /get-started/with-tyk-on-premise/installation
  - /getting-started/installation/with-tyk-on-premises
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-demo
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-demo-windows
  - /getting-started/installation/with-tyk-on-premises/docker/docker-pro-demo/docker-pro-wsl
  - /tyk-configuration-reference/kv-store
  - /tyk-self-managed/istio
  - /tyk-on-premises/docker/docker-pro-demo
  - /tyk-on-premises/docker/docker-pro-demo/docker-pro-demo-windows
  - /tyk-on-premises/docker/docker-pro-demo/docker-pro-wsl
  - /getting-started/quick-start/tyk-demo
  - /getting-started/quick-start/tyk-k8s-demo
  - /getting-started/quick-start
  - /tyk-self-managed/install
  - /get-started/with-tyk-on-premise
  - /get-started/with-tyk-on-premise/installation/on-aws
  - /get-started/with-tyk-on-premise/installation/on-ubuntu/gateway
  - /get-started/with-tyk-on-premise/installation/redhat-rhel-centos/dashboard
  - /getting-started/installation/tyk-on-premises/on-ubuntu
  - /getting-started/installation/with-tyk-on-premises/bootstrapper-cli
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/analytics-pump
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/dashboard
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/gateway
  - /getting-started/installation/with-tyk-on-premises/install-tyk-google-cloud
  - /getting-started/installation/with-tyk-on-premises/install-tyk-microsoft-azure
  - /getting-started/installation/with-tyk-on-premises/kubernetes
  - /getting-started/installation/with-tyk-on-premises/kubernetes/k8s-docker-pro-wsl
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/analytics-pump
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/dashboard
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/gateway
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/analytics-pump
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/dashboard
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/gateway
  - /getting-started/with-tyk-on-premises/installation/on-aws
  - /getting-started/with-tyk-on-premises/installation/on-aws/ec2
  - /getting-started/with-tyk-on-premises/installation/on-heroku
  - /tyk-on-premises
  - /tyk-on-premises/aws
  - /tyk-on-premises/debian-ubuntu
  - /tyk-on-premises/debian-ubuntu/analytics-pump
  - /tyk-on-premises/debian-ubuntu/dashboard
  - /tyk-on-premises/debian-ubuntu/gateway
  - /tyk-on-premises/getting-started
  - /tyk-on-premises/google-cloud
  - /tyk-on-premises/heroku
  - /tyk-on-premises/kubernetes
  - /tyk-on-premises/licensing
  - /tyk-on-premises/microsoft-azure
  - /tyk-on-premises/on-aws/ec2
  - /tyk-on-premises/on-ubuntu
  - /tyk-on-premises/redhat-rhel-centos
  - /get-started/with-tyk-on-premise/installation/docker
  - /get-started/with-tyk-on-premise/installation/docker/docker-quickstart
  - /getting-started/installation/with-tyk-on-premises/docker
  - /getting-started/installation/with-tyk-on-premises/kubernetes/tyk-kubernetes-ingress-controller
  - /tyk-on-premises/ansible
  - /tyk-on-premises/bootstrapper-cli
  - /tyk-on-premises/docker
  - /tyk-on-premises/installation/on-aws
  - /tyk-on-premises/installation/on-heroku
  - /planning-for-production/redis-mongodb
  - /planning-for-production/redis-mongodb-sizing
  - /planning-for-production/redis-sizing
  - /planning-for-production/benchmarks
  - /planning-for-production/ensure-high-availability
  - /planning-for-production/ensure-high-availability/load-balancing
  - /planning-for-production/ensure-high-availability/service-discovery
  - /planning-for-production/ensure-high-availability/service-discovery/examples
  - /planning-for-production/ensure-high-availability/uptime-tests
  - /planning-for-production/redis
  - /tyk-on-prem/installation/redhat-rhel-centos/analytics-pump
  - /tyk-on-prem/installation/redhat-rhel-centos/dashboard
  - /tyk-on-prem/installation/redhat-rhel-centos/gateway
  - /tyk-on-prem/kubernetes-on-windows
  - /tyk-on-prem/installation/on-aws
  - /tyk-on-prem/kubernetes-ingress
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-mongodb
  - /deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql
  - /deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview
  - /tyk-self-managed/tyk-helm-chart

  - /ensure-high-availability/load-balancing
  - /tyk-api-gateway-v-2-0/installation-options-setup/install-tyk-pro-edition-on-red-hat
  - /tyk-api-gateway-v1-9/setup/install-tyk-on-ubuntu
  - /analytics-and-reporting/redis-mongodb-sizing
  - /deploy-tyk-premise-production
  - /getting-started/licensing
  - /analyse/redis-mongodb-sizing
  - /getting-started/licencing
  - /tyk-stack/tyk-gateway/kv-store
---

## What is Tyk Self-Managed

Tyk Self-Managed allows you to easily install our Full Lifecycle API Management solution in your own infrastructure. There is no calling home, and there are no usage limits.  You have full control.

### What Does Tyk Self-Managed Include?
The full Tyk Self-Managed system consists of:

* [Tyk Gateway]({{< ref "tyk-oss-gateway" >}}):  Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It is an open source enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols, that protects, secures and processes your APIs.
* [Tyk Dashboard]({{< ref "tyk-dashboard" >}}): The management Dashboard and integration API manage a cluster of Tyk Gateways and also show analytics and features of the [Developer portal]({{< ref "tyk-developer-portal" >}}). The Dashboard also provides the API Developer Portal, a customizable developer portal for your API documentation, developer auto-enrollment and usage tracking.
* [Tyk Pump]({{< ref "tyk-pump" >}}): Tyk Pump handles moving analytics data between your gateways and your Dashboard (amongst other data sinks). The Tyk Pump is an open source analytics purger that moves the data generated by your Tyk nodes to any back-end.
* [Tyk Identity Broker]({{< ref "api-management/external-service-integration#what-is-tyk-identity-broker-tib" >}}) (Optional): Tyk Identify Broker handles integrations with third-party IDP's. It (TIB) is a component providing a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub) or Basic Authentication providers, to your Tyk installation.
* [Tyk Multi-Data Center Bridge]({{< ref "tyk-multi-data-centre" >}}) (Optional, add-on): Tyk Multi-Data Center Bridge allows for the configuration of a Tyk ecosystem that spans many data centers and clouds. It also (MDCB) acts as a broker between Tyk Gateway Instances that are isolated from one another and typically have their own Redis DB.

{{< img src="/img/diagrams/diagram_docs_pump-data-flow@2x.png" alt="Tyk Self-Managed Archtecture" >}}

### Tyk Self Managed Pricing

Refer the [pricing page](https://tyk.io/pricing/)

### Tyk Dependencies and Database Support

#### MongoDB / PostgreSQL

Tyk Dashboard requires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. See [Database Options]({{< ref "api-management/dashboard-configuration#supported-database" >}}) for a list of versions and drop-in replacements we support.

#### Redis

Tyk Gateway requires Redis for its operations. Here is the list of supported versions:

**Supported Versions**
- Tyk 5.3 supports Redis 6.2.x, 7.0.x, and 7.2.x
- Tyk 5.2.x and earlier supports Redis 6.0.x and Redis 6.2.x only.

Visit the [Gateway page]({{< ref "tyk-oss-gateway" >}}) for more info.

#### Tyk Gateway Architecture

The Tyk Gateway can run completely independently, requiring only a Redis database, and can scale horizontally:

{{< img src="/img/diagrams/oss-architecture.png" alt="Open Source Architecture" >}}


#### Init Systems

Tyk packages support SysVinit Linux init systems, [systemd](https://www.freedesktop.org/wiki/Software/systemd/) and Upstart (both 0.6.x and 1.x, [FYI - Ubuntu stopped supporting Upstart] upstart(https://askubuntu.com/questions/1024120/will-ubuntu-18-04-lts-still-support-upstart-or-do-we-have-to-change-to-systemd)).
During package installation only one is chosen depending on the operating system support, e.g.:

*   CentOS 6, RHEL 6, Amazon Linux ship with Upstart 0.6.x
*   Ubuntu 14.04, Debian Jessie with Upstart 1.x
*   CentOS 7, RHEL 7, Ubuntu 16.04, Debian Stretch are running with systemd
*   Certain older distros may only provide SysVinit but all of them typically provide compatibility with its scripts

Note that any init scripts of your choosing can be used instead of automatically detected ones by copying them from the `install/inits` directory inside the package directory.

This init system variance implies there are different ways to manage the services and collect service logs.

##### Upstart
For Upstart, service management can be performed through the `initctl` or a set of `start`, `stop`, `restart` and `status` commands. Upstart 1.x also works with the `service` command.

##### systemd
For systemd, either `systemctl` or `service` commands may be utilized.

The `service` command can usually be used with SysVinit scripts, as well as invoking them directly.

{{< note success >}}
**Note**
*   Upstart 0.6.x and SysVinit: log files are located in `/var/logs` for every respective service, e.g. `/var/logs/tyk-gateway.stderr` and `/var/logs/tyk-gateway.stdout`
*   Upstart 1.x: by default everything is stored in `/var/logs/upstart` directory, e.g. `/var/logs/upstart/tyk-gateway.log`
*   systemd utilizes its own logging mechanism called journald, which is usable via the `journalctl` command, e.g. `journalctl -u tyk-gateway`


Please consult with respective init system documentation for more details on how to use and configure it.

{{< /note >}}

## Getting Started with Tyk Self-Managed

Tyk Self-Managed consists of multiple components, as described above. While the OSS Gateway and Pump are available without a license, the remaining components require one. To experience the full capabilities of our Full Lifecycle API Management solution within your own infrastructure, please obtain a license by contacting our support team.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

If you prefer guided support, we recommend exploring our [Tyk Technical PoC Guide](https://tyk.io/customer-engineering/poc/technical-guide/).

Once you have obtained your license, you can proceed with the installation options provided below.

##### **Tyk Demo - The Perfect PoC Experience**
Head over to our **Tyk Demo** guides in [Kubernetes]({{< ref "tyk-self-managed#kubernetes-demo" >}}) or [Docker]({{< ref "tyk-self-managed#docker-demo" >}}). These guides, with zero to none effort, will spin up the full Tyk infrastructure (Tyk stack) with examples of Tyk's capabilities and integrations out-of-the-box.

## Installation Options for Tyk Self-Managed

{{< grid >}}

{{< badge read="10 mins" href="tyk-self-managed#install-with-docker" image="/img/docker.png" alt="Docker install">}}
Install with Docker 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-on-kubernetes" image="/img/k8s.png" alt="Kubernetes install">}}
Install on K8s 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-with-ansible" image="/img/ansible.png" alt="Ansible install">}}
Install with Ansible 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-tyk-on-redhat-rhel-centos" image="/img/redhat-logo2.png" alt="Red Hat install">}}
Install on Red Hat 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-tyk-on-debian-or-ubuntu" image="/img/debian-nd-753.png" alt="Ubuntu install">}}
Install on Ubuntu 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-on-aws-marketplace" image="/img/aws.png" alt="Amazon AWS install">}}
Install on Amazon AWS 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-on-heroku" image="/img/heroku-logo.png" alt="Heroku install">}}
Install Tyk on Heroku 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-self-managed#install-on-microsoft-azure" image="/img/azure-2.png" alt="Azure install">}}
Install on Microsoft Azure 
{{< /badge >}}

{{< /grid >}}

### Install on Kubernetes

The main way to install *Tyk Self-Managed* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.

Get started with one of our quick start guides:

- [Quick Start with PostgreSQL]({{< ref "#install-tyk-stack-with-helm-chart-postgresql" >}})
- [Quick Start with MongoDB]({{< ref "tyk-self-managed#install-tyk-stack-with-helm-chart-mongodb" >}})

Or go to [Tyk Stack helm chart]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}) for detailed installation instructions and configuration options.

#### Install Tyk Stack with Helm Chart (PostgreSQL)

The following guides provide instructions to install Redis, PostgreSQL, and Tyk stack with default configurations. It is intended for quick start only. For production, you should install and configure Redis and PostgreSQL separately.

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

**Quick Start**

The following quick start guide explains how to use the Tyk Stack Helm chart to configure a Dashboard that includes:
- Redis for key storage
- PostgreSQL for app config
- Tyk Pump to send analytics to PostgreSQL. It also opens a metrics endpoint where Prometheus (if available) can scrape from.

At the end of this quickstart Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

**1. Setup required credentials**

First, you need to provide Tyk license, admin email and password, and API keys. We recommend to store them in secrets.

```bash
NAMESPACE=tyk
REDIS_BITNAMI_CHART_VERSION=19.0.2
POSTGRES_BITNAMI_CHART_VERSION=12.12.10

API_SECRET=changeit
ADMIN_KEY=changeit
TYK_LICENSE=changeit
ADMIN_EMAIL=admin@default.com
ADMIN_PASSWORD=changeit

kubectl create namespace $NAMESPACE

kubectl create secret generic my-secrets -n $NAMESPACE \
    --from-literal=APISecret=$API_SECRET \
    --from-literal=AdminSecret=$ADMIN_KEY \
    --from-literal=DashLicense=$TYK_LICENSE

kubectl create secret generic admin-secrets -n $NAMESPACE \
    --from-literal=adminUserFirstName=Admin \
    --from-literal=adminUserLastName=User \
    --from-literal=adminUserEmail=$ADMIN_EMAIL \
    --from-literal=adminUserPassword=$ADMIN_PASSWORD
```

**2. Install Redis (if you don't already have Redis installed)**

If you do not already have Redis installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version $REDIS_BITNAMI_CHART_VERSION
```
Follow the notes from the installation output to get connection details and password. The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk.svc:6379` (Tyk needs the name including the port) 

The Bitnami chart also creates a secret `tyk-redis` which stores the connection password in `redis-password`. We will make use of this secret in installation later.

**3. Install PostgreSQL (if you don't already have PostgreSQL installed)**

If you do not already have PostgreSQL installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-postgres oci://registry-1.docker.io/bitnamicharts/postgresql --set "auth.database=tyk_analytics" -n $NAMESPACE --install --version $POSTGRES_BITNAMI_CHART_VERSION
```

Follow the notes from the installation output to get connection details.

We require the PostgreSQL connection string for Tyk installation. This can be stored in a secret and will be used in installation later.

```bash
POSTGRESQLURL=host=tyk-postgres-postgresql.$NAMESPACE.svc\ port=5432\ user=postgres\ password=$(kubectl get secret --namespace $NAMESPACE tyk-postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)\ database=tyk_analytics\ sslmode=disable

kubectl create secret generic postgres-secrets  -n $NAMESPACE --from-literal=postgresUrl="$POSTGRESQLURL"
```


{{< note >}}
**Note**

Ensure that you are installing PostgreSQL versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "api-management/dashboard-configuration#supported-database" >}}) that are compatible with Tyk.
{{< /note >}}

**4. Install Tyk**
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/

helm repo update

helm upgrade tyk tyk-helm/tyk-stack -n $NAMESPACE \
  --install \
  --set global.adminUser.useSecretName=admin-secrets \
  --set global.secrets.useSecretName=my-secrets \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.postgres.connectionStringSecret.name=postgres-secrets \
  --set global.postgres.connectionStringSecret.keyName=postgresUrl
```

**5. Done!**

Now Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

You are now ready to [create an API]({{< ref "api-management/gateway-config-managing-classic#create-an-api" >}}).

For the complete installation guide and configuration options, please see [Tyk Stack Helm Chart]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}).

#### Install Tyk Stack with Helm Chart (MongoDB)

The following guides provide instructions to install Redis, MongoDB, and Tyk stack with default configurations. It is intended for quick start only. For production, you should install and configure Redis and MongoDB separately.

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

{{< note success >}}
**Note**

If you want to enable Tyk Enterprise Developer Portal, please use [PostgreSQL]({{< ref "#install-tyk-stack-with-helm-chart-postgresql" >}}). MongoDB is not supported in Developer Portal.
{{< /note >}}

**Quick Start**

The following quick start guide explains how to use the Tyk Stack Helm chart to configure a Dashboard that includes:
- Redis for key storage
- MongoDB for app config
- Tyk Pump to send analytics to MongoDB. It also opens a metrics endpoint where Prometheus (if available) can scrape from.

At the end of this quickstart Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

**1. Setup required credentials**

First, you need to provide Tyk license, admin email and password, and API keys. We recommend to store them in secrets.
```bash
NAMESPACE=tyk
REDIS_BITNAMI_CHART_VERSION=19.0.2
MONGO_BITNAMI_CHART_VERSION=15.1.3

API_SECRET=changeit
ADMIN_KEY=changeit
TYK_LICENSE=changeit
ADMIN_EMAIL=admin@default.com
ADMIN_PASSWORD=changeit

kubectl create namespace $NAMESPACE

kubectl create secret generic my-secrets -n $NAMESPACE \
    --from-literal=APISecret=$API_SECRET \
    --from-literal=AdminSecret=$ADMIN_KEY \
    --from-literal=DashLicense=$TYK_LICENSE

kubectl create secret generic admin-secrets -n $NAMESPACE \
    --from-literal=adminUserFirstName=Admin \
    --from-literal=adminUserLastName=User \
    --from-literal=adminUserEmail=$ADMIN_EMAIL \
    --from-literal=adminUserPassword=$ADMIN_PASSWORD
```

**2. Install Redis (if you don't have a Redis instance)**

If you do not already have Redis installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version $REDIS_BITNAMI_CHART_VERSION
```
Follow the notes from the installation output to get connection details and password. The DNS name of your Redis as set by Bitnami is 
`tyk-redis-master.tyk.svc:6379` (Tyk needs the name including the port) 

The Bitnami chart also creates a secret `tyk-redis` which stores the connection password in `redis-password`. We will make use of this secret in installation later.

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "#redis-1" >}}).
{{< /note >}}

**3. Install MongoDB (if you don't have a MongoDB instance)**

If you do not already have MongoDB installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-mongo oci://registry-1.docker.io/bitnamicharts/mongodb -n $NAMESPACE --install --version $MONGO_BITNAMI_CHART_VERSION
```

{{< note success >}}
**Note**

Please make sure you are installing MongoDB versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "api-management/dashboard-configuration#supported-database" >}}).
{{< /note >}}

{{< note >}}
**Note**

Bitnami MongoDB image is not supported on darwin/arm64 architecture.
{{< /note >}}

We require the MongoDB connection string for Tyk installation. You can store it in a secret and provide the secret in installation later.

```bash
MONGOURL=mongodb://root:$(kubectl get secret --namespace $NAMESPACE tyk-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)@tyk-mongo-mongodb.$NAMESPACE.svc:27017/tyk_analytics?authSource=admin

kubectl create secret generic mongourl-secrets --from-literal=mongoUrl=$MONGOURL -n $NAMESPACE
```


{{< note >}}
**Note**

Ensure that you are installing MongoDB versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "api-management/dashboard-configuration#supported-database" >}}) that are compatible with Tyk.
{{< /note >}}

**4. Install Tyk**
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/

helm repo update

helm upgrade tyk tyk-helm/tyk-stack -n $NAMESPACE \
  --install \
  --set global.adminUser.useSecretName=admin-secrets \
  --set global.secrets.useSecretName=my-secrets \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.mongo.driver=mongo-go \
  --set global.mongo.connectionURLSecret.name=mongourl-secrets \
  --set global.mongo.connectionURLSecret.keyName=mongoUrl \
  --set global.storageType=mongo \
  --set tyk-pump.pump.backend='{prometheus,mongo}' 
```

**5. Done!**

Now Tyk Dashboard should be accessible through service `dashboard-svc-tyk-tyk-dashboard` at port `3000`. You can login to Dashboard using the admin email and password to start managing APIs. Tyk Gateway will be accessible through service `gateway-svc-tyk-tyk-gateway.tyk.svc` at port `8080`.

You are now ready to [create an API]({{< ref "api-management/gateway-config-managing-classic#create-an-api" >}}).

For the complete installation guide and configuration options, please see [Tyk Stack Helm Chart]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}).


#### Install Tyk Stack on Windows with Helm


{{< note success >}}
**Note**
  
Installing Tyk on Kubernetes requires a multi-node Tyk license. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary license.
{{< /note >}}

{{< warning success >}}
**Warning**  

This deployment is NOT designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [Self-Managed]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}}) solution, which includes our Gateway, Dashboard and analytics processing pipeline. 

This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and either MongoDB or one of our supported [SQL databases]({{< ref "api-management/dashboard-configuration#supported-database" >}}).

This demo is great for proof of concept and demo purposes, but if you want to test performance, you need to move each component to a separate machine.
{{< /warning >}}

{{< note success >}}
**Note**  

You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.
{{< /note >}}

**Prerequisites**

- MS Windows 10 Pro
- [Tyk Helm Chart](https://github.com/TykTechnologies/tyk-helm-chart)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://github.com/helm/helm/releases)
- Git for Windows
- [Python for Windows](https://www.python.org/downloads/windows/)
- PowerShell running as administrator
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk Self-Managed [Developer license](https://tyk.io/sign-up)

Ensure that kubectl and helm prerequisites are configured on your Windows path environment variable

This demo installation was tested with the following tools/versions:

* Microsoft Windows 10 Pro v1909 VM on Azure (Standard D2 v3 size)
* Docker Desktop for Windows 2.2.0.0 (Docker engine v19.03.5)
* helm v3.0.3
* minikube v1.7.1 (k8s v 1.17.2)
* kubectl v 1.17.0 (Note that kubectl is packaged with Docker Desktop for Windows, but the version may be incompatible with k8s)

**Installation**

Now you have your prerequisites, follow the instructions from our [Tyk Helm Chart]({{< ref "#use-legacy-helm-chart" >}}) page.

#### Use Legacy Helm Chart

{{< warning success >}}
**Warning**

`tyk-pro` chart is deprecated. Please use our [Tyk Stack helm chart]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}) instead. 

We recommend all users migrate to the `tyk-stack` Chart. Please review the [Configuration]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

**Introduction**

Tyk Helm chart is the preferred (and easiest) way to install **Tyk Self-Managed** on Kubernetes.
The helm chart `tyk-helm/tyk-pro` will install full Tyk platform with **Tyk Manager**, **Tyk Gateways** and **Tyk Pump** into your Kubernetes cluster. You can also choose to enable the installation of **Tyk Operator** (to manage your APIs in a declarative way).

**Prerequisites**

1. **Tyk License**

    If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain a temporary license.

2. **Data stores**

    The following are required for a Tyk Self-Managed installation:
    - Redis   - Should be installed in the cluster or reachable from inside the cluster (for SaaS option).
                You can find instructions for a simple Redis installation bellow.
    - MongoDB or SQL - Should be installed in the cluster or be reachable by the **Tyk Manager** (for SaaS option).

    You can find supported MongoDB and SQL versions [here]({{< ref "#database-management" >}}).

    Installation instructions for Redis and MongoDB/SQL are detailed below.

3. **Helm**

    Installed [Helm 3](https://helm.sh/)
    Tyk Helm Chart is using Helm v3 version (i.e. not Helm v2).

**Installation**

As well as our official Helm repo, you can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-pro).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-pro" data-theme="light" data-header="true" data-responsive="true"><blockquote><p lang="en" dir="ltr"><b>tyk-pro</b>: This chart deploys our full Tyk platform. The Tyk Gateway is a fully open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols. The Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organizations and businesses around the world to protect, secure, and process APIs and well as review and audit the consumed apis.</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-pro">Artifact Hub</a></blockquote></div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-pro)
or contact us in [Tyk Community forum](https://community.tyk.io/) or through our sales team.


1. **Add Tyk official Helm repo to your local Helm repository**

    ```bash
    helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
    helm repo update
    ```

2. **Create namespace for your Tyk deployment**

    ```bash
    kubectl create namespace tyk
    ```

3. **Getting the values.yaml of the chart**

    Before we proceed with installation of the chart you need to set some custom values.
    To see what options are configurable on a chart and save that options to a custom values.yaml file run:

    ```bash
    helm show values tyk-helm/tyk-pro > values.yaml
    ```

**Installing the data stores**

For Redis, MongoDB or SQL you can use these rather excellent charts provided by Bitnami

{{< tabs_start >}}
{{< tab_start "Redis" >}}
<br />

**Redis**
```bash
helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "#redis-1" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password.

```console
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk.svc.cluster.local:6379` (Tyk needs the name including the port)
You can update them in your local `values.yaml` file under `redis.addrs` and `redis.pass`
Alternatively, you can use `--set` flag to set it in Tyk installation. For example  `--set redis.pass=$REDIS_PASSWORD`
{{< tab_end >}}
{{< tab_start "MongoDB" >}}
<br />

**MongoDB**
```bash
helm install tyk-mongo bitnami/mongodb --set "replicaSet.enabled=true" -n tyk --version 15.1.3
```
{{< note success >}}
**Note**

Bitnami MongoDB images is not supported on darwin/arm64 architecture.
{{< /note >}}

Follow the notes from the installation output to get connection details and password. The DNS name of your MongoDB as set with Bitnami is `tyk-mongo-mongodb.tyk.svc.cluster.local` and you also need to set the `authSource` parameter to `admin`. The full `mongoURL` should be similar to `mongoURL: mongodb://root:pass@tyk-mongo-mongodb.tyk.svc.cluster.local:27017/tyk_analytics?authSource=admin`. You can update them in your local `values.yaml` file under `mongo.mongoURL` Alternatively, you can use `--set` flag to set it in your Tyk installation.

{{< note success >}}
**Important Note regarding MongoDB**

This Helm chart enables the *PodDisruptionBudget* for MongoDB with an arbiter replica-count of 1. If you intend to perform
system maintenance on the node where the MongoDB pod is running and this maintenance requires for the node to be drained,
this action will be prevented due the replica count being 1. Increase the replica count in the helm chart deployment to
a minimum of 2 to remedy this issue.

{{< /note >}}

{{< tab_end >}}
{{< tab_start "SQL" >}}
<br />

**Postgres**
```bash
helm install tyk-postgres bitnami/postgresql --set "auth.database=tyk_analytics" -n tyk --version 12.12.10
```

{{< note success >}}
**Note**

Please make sure you are installing PostgreSQL versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "api-management/dashboard-configuration#supported-database" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password. The DNS name of your Postgres service as set by Bitnami is `tyk-postgres-postgresql.tyk.svc.cluster.local`.
You can update connection details in `values.yaml` file under `postgres`.
{{< tab_end >}}
{{< tabs_end >}}

---

**Quick Redis and MongoDB PoC installation**
{{< warning  success >}}
**Warning**

Another option for Redis and MongoDB, to get started quickly, is to use our **simple-redis** and **simple-mongodb** charts.
Please note that these provided charts must not ever be used in production and for anything
but a quick start evaluation only. Use external redis or Official Redis Helm chart in any other case.
We provide this chart, so you can quickly get up and running, however it is not meant for long term storage of data for example.

```bash
helm install redis tyk-helm/simple-redis -n tyk
helm install mongo tyk-helm/simple-mongodb -n tyk
```
{{< /warning >}}

**License setting**

For the **Tyk Self-Managed** chart we need to set the license key in your custom `values.yaml` file under `dash.license` field
or use `--set dash.license={YOUR-LICENSE_KEY}` with the `helm install` command.


Tyk Self-Managed licensing allow for different numbers of Gateway nodes to connect to a single Dashboard instance.
To ensure that your Gateway pods will not scale beyond your license allowance, please ensure that the Gateway's resource kind is `Deployment`
and the replica count to your license node limit. By default, the chart is configured to work with a single node license: `gateway.kind=Deployment` and `gateway.replicaCount=1`.

{{< note success >}}
**Please Note**

There may be intermittent issues on the new pods during the rolling update process, when the total number of online
gateway pods is more than the license limit with lower amounts of Licensed nodes.

{{< /note >}}

**Installing Tyk Self managed**

Now we can install the chart using our custom values:

```bash
helm install tyk-pro tyk-helm/tyk-pro -f ./values.yaml -n tyk --wait
```

{{< note success >}}
**Important Note regarding MongoDB**

The `--wait` argument is important to successfully complete the bootstrap of your **Tyk Manager**.

{{< /note >}}

**Pump Installation**

By default pump installation is disabled. You can enable it by setting `pump.enabled` to `true` in `values.yaml` file.
Alternatively, you can use `--set pump.enabled=true` while doing helm install.

**Quick Pump configuration(Supported from tyk helm v0.10.0)**

*1. Mongo Pump*

To configure mongo pump, do following changings in `values.yaml` file:
1. Set `backend` to `mongo`.
2. Set connection string in `mongo.mongoURL`.

*2. Postgres Pump*

To configure postgres pump, do following changings in `values.yaml` file:
1. Set `backend` to `postgres`.
2. Set connection string parameters in `postgres` section.

**Tyk Developer Portal**

You can disable the bootstrapping of the Developer Portal by the `portal.bootstrap: false` in your local `values.yaml` file.

**Using TLS**

You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway
listen on port 443 and load up a dummy certificate. You can set your own default certificate by replacing the file in the `certs/` folder.

**Mounting Files**

To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component.
For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

**Sharding APIs**

Sharding is the ability for you to decide which of your APIs are loaded on which of your Tyk Gateways. This option is
turned off by default, however, you can turn it on by updating the `gateway.sharding.enabled` option. Once you do that you
will also need to set the `gateway.sharding.tags` field with the tags that you want that particular Gateway to load. (ex. tags: "external,ingress".)
You can then add those tags to your APIs in the API Designer, under the **Advanced Options** tab, and
the **Segment Tags (Node Segmentation)** section in your Tyk Dashboard.
Check [Tyk Gateway Sharding]({{< ref "api-management/multiple-environments#what-is-api-sharding-" >}}) for more details.


#### Install More Tyk Components

**Installing Tyk Enterprise Developer Portal**

If you are deploying the **Tyk Enterprise Developer Portal**, set the appropriate values under the `enterprisePortal` section in your `values.yaml`. Please visit [Tyk Enterprise Developer Portal installation]({{< ref "portal/install#using-legacy-helm-chart" >}}) for a step by step guide.

>**Note**: Helm chart supports Enterprise Portal v1.2.0+

**Installing Tyk Self-managed Control Plane**

If you are deploying the **Tyk Control plane**, a.k.a **MDCB**, for a **Tyk Multi Data Center Bridge** deployment then you set
the `mdcb.enabled: true` option in the local `values.yaml` to add of the **MDCB** component to your installation.
Check [Tyk Control plane]({{< ref "tyk-multi-data-centre" >}}) for more configuration details.

This setting enables multi-cluster, multi Data-Center API management from a single dashboard.


**Tyk Identity Broker (TIB)**

The **Tyk Identity Broker** (TIB) is a micro-service portal that provides a bridge between various Identity Management Systems
such as LDAP, OpenID Connect providers and legacy Basic Authentication providers, to your Tyk installation.
See [TIB]({{< ref "api-management/external-service-integration#installing-tyk-identity-broker-tib" >}}) for more details.

For SSO to **Tyk Manager** and **Tyk developer portal** purposes you do not need to install **TIB**, as its functionality is now
part of the **Tyk Manager**. However, if you want to run it separately (as you used to before this merge) or if you need it
 as a broker for the **Tyk Gateway** you can do so.

Once you have installed your **Tyk Gateway** and **Tyk Manager**, you can configure **TIB** by adding its configuration environment variables
under the `tib.extraEnvs` section and updating the `profile.json` in your `configs` folder.
See our [TIB GitHub repo](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib).
Once you complete your modifications you can run the following command from the root of the repository to update your helm chart.

```bash
helm upgrade tyk-pro values.yaml -n tyk
```

This chart implies there's a **ConfigMap** with a `profiles.json` definition in it. Please use `tib.configMap.profiles` value
to set the name of this **ConfigMap** (`tyk-tib-profiles-conf` by default).



**Tyk Operator and Ingress**

For a GitOps workflow used with a **Tyk Self-Managed** installation or setting the Tyk Gateway as a Kubernetes ingress controller, Tyk Operator enables you to manage API definitions, security policies and other Tyk features using Kubernetes manifest files.
To get started go to [Tyk Operator]({{< ref "api-management/automations/operator" >}}).

### Install on AWS Marketplace


Tyk offers a flexible and powerful API management solution through **Tyk Cloud** on the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-pboluroscnqro). Tyk Cloud is an end-to-end managed API platform where both the control plane and gateways are installed on AWS for a seamless, fully cloud-hosted experience.

For those who need more deployment flexibility, Tyk Cloud also supports a [Hybrid Gateway]({{< ref "tyk-cloud#deploy-hybrid-gateways" >}}) option. In this setup, the control plane remains hosted and managed by Tyk on AWS, while the gateways can be deployed on your preferred cloud provider or on-premises environment—allowing you to meet data locality and compliance needs without sacrificing control.

**Available AWS Deployment Regions**

You can deploy Tyk Cloud in the following AWS regions:

- **Singapore**: `aws-ap-southeast-1`
- **Frankfurt, Germany**: `aws-eu-central-1`
- **London, UK**: `aws-eu-west-2`
- **N. Virginia, USA**: `aws-us-east-1`
- **Oregon, USA**: `aws-us-west-2`
- **Australia**: `aws-ap-southeast-2`

Getting started with Tyk Cloud via the AWS Marketplace is quick and easy. Sign up today to access Tyk’s comprehensive API management tools designed to scale with your needs.

**Install Tyk on AWS EC2**
  

1. Spin up an [EC2 instance](https://aws.amazon.com/ec2/instance-types/), AWS Linux2 preferably, T2.Medium is fine
   - add a public IP
   - open up SG access to: 
     - 3000 for the Tyk Dashboard
     - 8080 for the Tyk Gateway
     - 22 TCP for SSH

2. SSH into the instance
`ssh -i mykey.pem ec2-user@public-ec2-ip`

3. Install Git, Docker, & Docker Compose
Feel free to copy paste these
```.sh
sudo yum update -y
sudo yum install git -y
sudo yum install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user
sudo su
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker ps
```

4. Clone the Tyk Pro Docker repo

```.bash
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo
cd tyk-pro-docker-demo/
```

5. Add the license key to `confs/tyk_analytics.conf` into the `license_key variable` using "vi" or "nano", etc

**This is the most common place to have problems.**

**Look for extra spaces between quotes ("") and the license key.  It will not work if there are any.**

Inside `tyk_analytics.conf`, `license_key` should look something like this, with a real license however:

`
"license_key": "eyJhbGciOiJSUzI1NiIsInR5cCI...WQ",
`

6. Run the containers via `docker-compose`

```.bash
docker-compose up -d
```

7. Visit

```
http://<public-ec2-ip>:3000
```
and fill out the Bootstrap form!
**If you see any page besides the Bootstrap page, you have pasted the license key incorrectly**

**Enable SSL for the Gateway & Dashboard**

1. Add the following to `confs/tyk.conf`

```.json
"policies.policy_connection_string": "https://tyk-dashboard:3000"
"db_app_conf_options.connection_string": "https://tyk-dashboard:3000"
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ],
  "ssl_insecure_skip_verify": true   ### YOU ONLY NEED THIS IF YOU ARE USING SELF SIGNED CERTS
}
```

2. Add the following to `confs/tyk_analytics.conf`

```.json
"tyk_api_config.Host": "https://tyk-gateway"
"http_server_options": {
  "use_ssl": true,
  "certificates": [
    {
      "domain_name": "*.yoursite.com",
      "cert_file": "./new.cert.cert",
      "key_file": "./new.cert.key"
    }
  ]
}
```

3. Generate self-signed Certs: (Or bring your own CA signed)

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

4. Mount your certs to containers through `docker-compose.yml`

```.yaml
tyk-dashboard:
    ...
    volumes: 
    - ./cert.pem:/opt/tyk-dashboard/new.cert.cert
    - ./key.pem:/opt/tyk-dashboard/new.cert.key
tyk-gateway:
    ...
    volumes: 
    - ./cert.pem:/opt/tyk-gateway/new.cert.cert
    - ./key.pem:/opt/tyk-gateway/new.cert.key
```

5. Restart your containers with the mounted files

```
docker-compose up -d tyk-dashboard tyk-gateway
```

6. Download the bootstrap script onto EC2 machine

```
wget https://raw.githubusercontent.com/sedkis/tyk/master/scripts/bootstrap-ssl.sh
```

7. Apply execute permissions to file:

```chmod +x bootstrap.sh```

8. Run the bootstrap script

```./bootstrap.sh localhost```

9. Done! use the generated user and password to log into The Tyk Dashboard


### Install with Ansible

{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. 
{{< /note >}}

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

    ```bash
    $ git clone https://github.com/TykTechnologies/tyk-ansible
    ```

2. `cd` into the directory

    ```.bash
    $ cd tyk-ansible
    ```

3. Run initialisation script to initialise environment

    ```bash
    $ sh scripts/init.sh
    ```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install the following:

    - Redis
    - MongoDB or PostgreSQL
    - Tyk Dashboard
    - Tyk Gateway
    - Tyk Pump

    ```bash
    $ ansible-playbook playbook.yaml -t tyk-pro -t redis -t `mongodb` or `pgsql`
    ```

    You can choose to not install Redis, MongoDB or PostgreSQL by removing the `-t redis` or `-t mongodb` or `-t pgsql` However Redis and MongoDB or PostgreSQL are a requirement and need to be installed for the Tyk Pro installation to run.

{{< note success >}}
**Note**  

For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "#planning-for-production" >}}) For more details.
{{< /note >}}

**Supported Distributions**

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

**Variables**

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
| mongo.host |  | MongoDB server host if different than the hosts url |
| mongo.port | `27017` | MongoDB server listening port  |
| mongo.tls | `false` | Enable if mongo connection is secured with SSL |
| pgsql.host |  | PGSQL server host if different than the hosts url |
| pgsql.port | `5432` | PGSQL server listening port  |
| pgsql.tls | `false` | Enable if pgsql connection is secured with SSL |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organization ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorize the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in. The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

- `vars/mongodb.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| bind_ip | `0.0.0.0` | Binding address of MongoDB |
| mongodb_version | `4.4` | MongoDB version |

Read more about MongoDB configuration [here](https://github.com/ansible-collections/community.mongodb).

- `vars/pgsql.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| postgresql_databases[] | `[]` | Array of DBs to be created |
| postgresql_databases[].name | `tyk_analytics` | Database name |
| postgresql_users[] | `[]` | Array of users to be created |
| postgresql_users[`0`].name | `default` | User name |
| postgresql_users[`0`].password | `topsecretpassword` | User password |
| postgresql_global_config_options[] | `[]` | Postgres service config options |
| postgresql_global_config_options[`1`].option | `listen_addresses` | Listen address binding for the service |
| postgresql_global_config_options[`1`].value | `*` | Default value to listen to all addresses |
| postgresql_hba_entries[] | `[]` | Host based authenticaiton list|
| postgresql_hba_entries[`4`].type | `host` | Entry type |
| postgresql_hba_entries[`4`].database | `tyk_analytics` | Which database this entry will give access to |
| postgresql_hba_entries[`4`].user | `default` | What users this gain access from this entry |
| postgresql_hba_entries[`4`].address | `0.0.0.0/0` | What addresses this gain access from this entry |
| postgresql_hba_entries[`4`].auth_method | `md5` | What authentication method to to use for the users |

Read more about PostgreSQL configuration [here](https://github.com/geerlingguy/ansible-role-postgresql).


### Install using Bootstrap CLI
  
To list the available flags, execute `tyk-analytics bootstrap -h`:

```
   usage: tyk-analytics bootstrap [<flags>]
   
   Bootstrap the Dashboard.
   
   Flags:
     -h, --help                 Show context-sensitive help (also try --help-long and --help-man).
         --version              Show application version.
         --conf="tyk_analytics.conf"  
                                Load a named configuration file.
         --create-org           Create a new organisation.
         --reuse-org=REUSE-ORG  Reuse the organisation with given ID.
         --drop-org=DROP-ORG    Drop the organisation with given ID.
```


**Description**

The `bootstrap` command makes bootstrapping easier. It helps you to create organizations and users. The command needs a
 config file path. By default, it looks at `tyk_analytics.conf` in the directory where the `tyk-analytics` binary is located.
 For example:
 
 ```tyk-analytics bootstrap```
 
 You can also give the path of a custom config file with the `--conf` flag. For example:
 
 ```tyk-analytics bootstrap --conf some-directory/custom.conf```
 
 The tool can work in both auto and interactive modes. You can use the flags while running the command or you can just run
  it without flags and use interactive mode. 


**Environment Variables**

You can override the config values by environment variables. See [how to configure an environment variable]({{< ref "tyk-oss-gateway/configuration" >}}). 

For example, you can override hostname, port, mongo url, redis host and redis port values by exporting the following variables:

- **TYK_DB_HOSTCONFIG_HOSTNAME**
- **TYK_DB_LISTENPORT**
- **TYK_DB_MONGOURL**
- **TYK_DB_REDISHOST**
- **TYK_DB_REDISPORT**


### Install with Docker


Tyk has three containers that are available to set up a Docker installation:

* [The Tyk Gateway container](https://hub.docker.com/r/tykio/tyk-gateway/)
* [The Tyk Dashboard container](https://hub.docker.com/r/tykio/tyk-dashboard/)
* [The Tyk Pump container](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/)

All three are required for a full deployment. We recommend that each container is installed on a separate machine for optimum performance.

From v5.5.0 onwards, these images are based on [distroless](https://github.com/GoogleContainerTools/distroless). This means that you will not be able to obtain a shell with `docker run --rm -it tykio/tyk-gateway:v5.5.0 sh`. The image can be inspected with tools like [dive](https://github.com/wagoodman/dive) or [Docker Desktop](https://www.docker.com/products/docker-desktop/).

We also have a [Docker Tyk Pro Demo]({{< ref "#docker-compose-setup" >}}), which installs our full Self-Managed solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine.


### Install on Heroku
  
**Install Tyk API Gateway on Heroku**

A full Tyk Self-Managed installation can be deployed to Heroku dynos and workers using [Heroku Container Registry and Runtime](https://devcenter.heroku.com/articles/) functionality. This guide will utilize [Tyk Docker images](https://hub.docker.com/u/tykio/) with a small amount of customization as well as an external MongoDB service.


**Prerequisites**

1. Docker daemon installed and running locally
2. [Heroku account](https://www.heroku.com/), the free plan is sufficient for a basic PoC but not recommended for production usage
3. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
4. MongoDB service (such as [Atlas](https://www.mongodb.com/cloud/atlas), [mLab](https://elements.heroku.com/addons/mongolab), or your own deployment), this guide is based on MongoDB Atlas but others should work as well
5. [Tyk License](https://tyk.io/pricing/on-premise/) (note that in case of running multiple gateway dynos, license type must match)
6. Checkout the [Tyk quickstart repository](https://github.com/TykTechnologies/tyk-pro-heroku) from GitHub
7. Python 2 or 3 in order to execute the bootstrap script

**Creating Heroku Apps**

We will create two Heroku apps, one for the Tyk Gateway (with [Redis add-on](https://devcenter.heroku.com/articles/heroku-redis) attached to it) and another for the Dashboard and Pump.

Given Heroku CLI is installed and your Heroku account is available, log into it:
```bash
heroku login
```

Now create the Gateway app and note down its name:
```bash
heroku create
```
```
Creating app... done, ⬢ infinite-plains-14949
https://infinite-plains-14949.herokuapp.com/ | https://git.heroku.com/infinite-plains-14949.git
```
{{< note success >}}
**Note**  

`--space` flag must be added to the command if the app is being created in a private space, see more details in the section on Heroku private spaces (below).
{{< /note >}}

Provision a Redis add-on (we'll use a `hobby-dev` plan for demonstration purposes but that's not suitable for production), replacing the app name with your own:
```bash
heroku addons:create heroku-redis:hobby-dev -a infinite-plains-14949
```
```
Creating heroku-redis:hobby-dev on ⬢ infinite-plains-14949... free
Your add-on should be available in a few minutes.
! WARNING: Data stored in hobby plans on Heroku Redis are not persisted.
redis-infinite-35445 is being created in the background. The app will restart when complete...
Use heroku addons:info redis-infinite-35445 to check creation progress
Use heroku addons:docs heroku-redis to view documentation
```

Once add-on provisioning is done, the info command (replacing the add-on name with your own) will show the following output:
```bash
heroku addons:info redis-infinite-35445
```
```
=== redis-infinite-35445
Attachments:  infinite-plains-14949::REDIS
Installed at: Sun May 18 2018 14:23:21 GMT+0300 (EEST)
Owning app:   infinite-plains-14949
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Time to create the Dashboard app and note down its name as well:
```bash
heroku create
```
```
Creating app... done, ⬢ evening-beach-40625
https://evening-beach-40625.herokuapp.com/ | https://git.heroku.com/evening-beach-40625.git
```

Since the Dashboard and Pump need access to the same Redis instance as the gateway, we'll need to share the Gateway app's add-on with this new app:
```bash
heroku addons:attach infinite-plains-14949::REDIS -a evening-beach-40625
```
```
Attaching redis-infinite-35445 to ⬢ evening-beach-40625... done
Setting REDIS config vars and restarting ⬢ evening-beach-40625... done, v3
```

To check that both apps have access to the same Redis add-on, we can utilize the `heroku config` command and check for the Redis endpoint:
```bash
heroku config -a infinite-plains-14949 | grep REDIS_URL
heroku config -a evening-beach-40625 | grep REDIS_URL
```

Their outputs should match.

**Deploy the Dashboard**

It's recommended to start with the Dashboard so in your Heroku quickstart clone run:
```bash
cd analytics
ls dashboard
```
```
bootstrap.sh  Dockerfile.web  entrypoint.sh  tyk_analytics.conf
```

You will find it contains a `Dockerfile.web` for the web dyno, a config file for the Dashboard, entrypoint script for the Docker container and a bootstrap script for seeding the dashboard instance with sample data. All these files are editable for your purposes but have sane defaults for a PoC.

{{< note success >}}
**Note**  

You can use the `FROM` statement in `Dockerfile.web` to use specific dashboard version and upgrade when needed instead of relying on the `latest` tag.
{{< /note >}}


The [Dashboard configuration]({{< ref "tyk-dashboard/configuration" >}}) can be changed by either editing the `tyk_analytics.conf` file or injecting them as [environment variables]({{< ref "tyk-oss-gateway/configuration" >}}) via `heroku config`. In this guide we'll use the latter for simplicity of demonstration but there is merit to both methods.

First let's set the license key:
```bash
heroku config:set TYK_DB_LICENSEKEY="your license key here" -a evening-beach-40625
```
```
Setting TYK_DB_LICENSEKEY and restarting ⬢ evening-beach-40625... done, v4
TYK_DB_LICENSEKEY: should show your license key here
```

Now the MongoDB endpoint (replacing with your actual endpoint):
```bash
heroku config:set TYK_DB_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOURL and restarting ⬢ evening-beach-40625... done, v5
TYK_DB_MONGOURL: mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017
```

And enable SSL for it if your service supports/requires this:
```bash
heroku config:set TYK_DB_MONGOUSESSL="true" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOUSESSL and restarting ⬢ evening-beach-40625... done, v6
TYK_DB_MONGOUSESSL: true
```

Since the Tyk Dashboard needs to access gateways sometimes, we'll need to specify the Gateway endpoint too, which is the Gateway app's URL:
```bash
heroku config:set TYK_DB_TYKAPI_HOST="https://infinite-plains-14949.herokuapp.com" -a evening-beach-40625
heroku config:set TYK_DB_TYKAPI_PORT="443" -a evening-beach-40625
```
```
Setting TYK_DB_TYKAPI_HOST and restarting ⬢ evening-beach-40625... done, v7
TYK_DB_TYKAPI_HOST: https://infinite-plains-14949.herokuapp.com
Setting TYK_DB_TYKAPI_PORT and restarting ⬢ evening-beach-40625... done, v8
TYK_DB_TYKAPI_PORT: 443
```

This is enough for a basic Dashboard setup but we recommend also changing at least node and admin secrets with strong random values, as well as exploring other config options.

Since the Tyk Pump is also a part of this application (as a worker process), we'll need to configure it too.

```bash
ls pump
```
```
Dockerfile.pump  entrypoint.sh  pump.conf
```

Same principles apply here as well. Here we'll need to configure MongoDB endpoints for all the Pumps (this can also be done in the `pump.conf` file):
```bash
heroku config:set PMP_MONGO_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGO_MONGOUSESSL="true"

heroku config:set PMP_MONGOAGG_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGOAGG_MONGOUSESSL="true"
```

With the configuration in place it's finally time to deploy our app to Heroku.

First, make sure CLI is logged in to Heroku containers registry:
```bash
heroku container:login
```
```
Login Succeeded
```

Provided you're currently in `analytics` directory of the quickstart repo:
```bash
heroku container:push --recursive -a evening-beach-40625
```
```
=== Building web (/tyk-heroku-docker/analytics/dashboard/Dockerfile.web)
Sending build context to Docker daemon  8.192kB
Step 1/5 : FROM tykio/tyk-dashboard:v1.6.1
 ---> fdbc67b43139
Step 2/5 : COPY tyk_analytics.conf /opt/tyk-dashboard/tyk_analytics.conf
 ---> 89be9913798b
Step 3/5 : COPY entrypoint.sh /opt/tyk-dashboard/entrypoint.sh
 ---> c256152bff29
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in bc9fe7a569c0
Removing intermediate container bc9fe7a569c0
 ---> f40e6b259230
Step 5/5 : CMD ["/opt/tyk-dashboard/entrypoint.sh"]
 ---> Running in 705273810eea
Removing intermediate container 705273810eea
 ---> abe9f10e8b21
Successfully built abe9f10e8b21
Successfully tagged registry.heroku.com/evening-beach-40625/web:latest
=== Building pump (/tyk-heroku-docker/analytics/pump/Dockerfile.pump)
Sending build context to Docker daemon   5.12kB
Step 1/5 : FROM tykio/tyk-pump-docker-pub:v0.5.2
 ---> 247c6b5795a9
Step 2/5 : COPY pump.conf /opt/tyk-pump/pump.conf
 ---> 1befeab8f092
Step 3/5 : COPY entrypoint.sh /opt/tyk-pump/entrypoint.sh
 ---> f8ad0681aa70
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in 0c30d35b9e2b
Removing intermediate container 0c30d35b9e2b
 ---> b17bd6a8ed44
Step 5/5 : CMD ["/opt/tyk-pump/entrypoint.sh"]
 ---> Running in a16acb453b62
Removing intermediate container a16acb453b62
 ---> 47ac9f221d8d
Successfully built 47ac9f221d8d
Successfully tagged registry.heroku.com/evening-beach-40625/pump:latest
=== Pushing web (/tyk-heroku-docker/analytics/dashboard/Dockerfile.web)
The push refers to repository [registry.heroku.com/evening-beach-40625/web]
c60cf00e6e9b: Pushed 
11d074829795: Pushed 
8b72aa2b2acc: Pushed 
ca2feecf234c: Pushed 
803aafd71223: Pushed 
43efe85a991c: Pushed 
latest: digest: sha256:b857afaa69154597558afb2462896275ab667b729072fac224487f140427fa73 size: 1574
=== Pushing pump (/tyk-heroku-docker/analytics/pump/Dockerfile.pump)
The push refers to repository [registry.heroku.com/evening-beach-40625/pump]
eeddc94b8282: Pushed 
37f3b3ce56ab: Pushed 
4b61531ec7dc: Pushed 
eca9efd615d9: Pushed 
0f700064c5a1: Pushed 
43efe85a991c: Mounted from evening-beach-40625/web 
latest: digest: sha256:f45acaefa3b47a126dd784a888c89e420814ad3031d3d4d4885e340a59aec31c size: 1573
```

This has built Docker images for both dashboard and pump, as well as pushed them to Heroku registry and automatically deployed to the application.

Provided everything went well (and if not, inspect the application logs), you should be seeing the Dashboard login page at your app URL (e.g "https://evening-beach-40625.herokuapp.com/").

However, it doesn't yet have any accounts. It order to populate it please run the `dashboard/bootstrap.sh` script:
```bash
dashboard/bootstrap.sh evening-beach-40625.herokuapp.com
```
```
Creating Organization
ORGID: 5b016ca530867500050b9e90
Adding new user
USER AUTH: a0f7c1e878634a60599dc037489a880f
NEW ID: 5b016ca6dcd0056d702dc40e
Setting password

DONE
====
Login at https://evening-beach-40625.herokuapp.com/
User: c7ze82m8k3@default.com
Pass: test123
```

It will generate a default organization with random admin username and a specified password. The bootstrap script can be edited to suit your needs as well as just editing the user info in the dashboard.

If this was successful, you should be able to log into your dashboard now.

The last step in this app is to start the Pump worker dyno since by default only the web dyno is enabled:
```bash
heroku dyno:scale pump=1 -a evening-beach-40625
```
```
Scaling dynos... done, now running pump at 1:Free
```

At that point the dyno formation should look like this:
```bash
heroku dyno:scale -a evening-beach-40625
```
```
pump=1:Free web=1:Free
```

**Deploy the Gateway**

The process is very similar for the Tyk Gateway, except it doesn't have a worker process and doesn't need access to MongoDB.

```bash
cd ../gateway
ls
```
```
Dockerfile.web  entrypoint.sh  tyk.conf
```

All these files serve the same purpose as with the Dasboard and the Pump. [Configuration]({{< ref "tyk-oss-gateway/configuration" >}}) can either be edited in `tyk.conf` or [injected]({{< ref "tyk-oss-gateway/configuration" >}}) with `heroku config`.

To get things going we'll need to set following options for the Dashboard endpoint (substituting the actual endpoint and the app name, now for the gateway app):
```bash
heroku config:set TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING="https://evening-beach-40625.herokuapp.com" -a infinite-plains-14949
heroku config:set TYK_GW_POLICIES_POLICYCONNECTIONSTRING="https://evening-beach-40625.herokuapp.com" -a infinite-plains-14949
```
```
Setting TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING and restarting ⬢ infinite-plains-14949... done, v4
TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING: https://evening-beach-40625.herokuapp.com
Setting TYK_GW_POLICIES_POLICYCONNECTIONSTRING and restarting ⬢ infinite-plains-14949... done, v5
TYK_GW_POLICIES_POLICYCONNECTIONSTRING: https://evening-beach-40625.herokuapp.com
```

Since the Redis configuration will be automatically discovered (it's already injected by Heroku), we're ready to deploy:
```bash
heroku container:push --recursive -a infinite-plains-14949
```
```
=== Building web (/tyk-heroku-docker/gateway/Dockerfile.web)
Sending build context to Docker daemon  6.144kB
Step 1/5 : FROM tykio/tyk-gateway:v2.6.1
 ---> f1201002e0b7
Step 2/5 : COPY tyk.conf /opt/tyk-gateway/tyk.conf
 ---> b118611dc36b
Step 3/5 : COPY entrypoint.sh /opt/tyk-gateway/entrypoint.sh
 ---> 68ad364030cd
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in 859f4c15a0d2
Removing intermediate container 859f4c15a0d2
 ---> 5f8c0d1b378a
Step 5/5 : CMD ["/opt/tyk-gateway/entrypoint.sh"]
 ---> Running in 44c5e4c87708
Removing intermediate container 44c5e4c87708
 ---> 86a9eb509968
Successfully built 86a9eb509968
Successfully tagged registry.heroku.com/infinite-plains-14949/web:latest
=== Pushing web (/tyk-heroku-docker/gateway/Dockerfile.web)
The push refers to repository [registry.heroku.com/infinite-plains-14949/web]
b8a4c3e3f93c: Pushed 
0b7bae5497cd: Pushed 
e8964f363bf4: Pushed 
379aae48d347: Pushed 
ab2b28b92877: Pushed 
021ee50b0983: Pushed 
43efe85a991c: Mounted from evening-beach-40625/pump 
latest: digest: sha256:d67b8f55d729bb56e06fe38e17c2016a36f2edcd4f01760c0e62a13bb3c9ed38 size: 1781
```

Inspect the logs (`heroku logs -a infinite-plains-14949`) to check that deployment was successful, also the node should be registered by the Dashboard in "System Management" -> "Nodes and Licenses" section.

You're ready to follow the guide on [creating and managing your APIs]({{< ref "api-management/gateway-config-managing-classic#create-an-api" >}}) with this Heroku deployment.

{{< note success >}}
**Note**  

To use the [geographic log distribution]({{< ref "api-management/dashboard-configuration#activity-by-location" >}}) feature in the Dashboard please supply the GeoLite2 DB in the `gateway` directory, uncomment the marked line in `Dockerfile.web` and set the `analytics_config.enable_geo_ip` setting (or `TYK_GW_ANALYTICSCONFIG_ENABLEGEOIP` env var) to `true`.
{{< /note >}}

**Heroku Private Spaces**

Most instructions are valid for [Heroku Private Spaces runtime](https://devcenter.heroku.com/articles/private-spaces). However there are several differences to keep in mind.

Heroku app creation commands must include the private space name in the `--space` flag, e.g.:
```bash
heroku create --space test-space-virginia
```

When deploying to the app, the container must be released manually after pushing the image to the app:
```bash
heroku container:push --recursive -a analytics-app-name
heroku container:release web -a analytics-app-name
heroku container:release pump -a analytics-app-name
```

Similarly, the Gateway:
```bash
heroku container:push --recursive -a gateway-app-name
heroku container:release web -a gateway-app-name
```

Please allow several minutes for the first deployment to start as additional infrastructure is being created for it. Next deployments are faster.

Private spaces maintain stable set of IPs that can be used for allowing fixed set of IPs on your upstream side (e.g. on an external database service). Find them using the following command:
```bash
heroku spaces:info --space test-space-virginia
```

Alternatively VPC peering can be used with the private spaces if external service supports it. This way exposure to external network can be avoided. For instance, see [MongoDB Atlas guide](https://www.mongodb.com/blog/post/integrating-mongodb-atlas-with-heroku-private-spaces) for setting this up.

The minimal Heroku Redis add-on plan that installs into your private space is currently `private-7`. Please refer to [Heroku's Redis with private spaces guide](https://devcenter.heroku.com/articles/heroku-redis-and-private-spaces) for more information.

Apps in private spaces don't enable SSL/TLS by default. It needs to be configured in the app settings along with the domain name for it. If it's not enabled, please make sure that configs that refer to corresponding hosts are using HTTP instead of HTTPS and related ports (80 for HTTP).

**Gateway Plugins**

In order to enable [rich plugins]({{< ref "api-management/plugins/rich-plugins#" >}}) for the Gateway, please set the following Heroku config option to either `python` or `lua` depending on the type of plugins used:
```bash
heroku config:set TYK_PLUGINS="python" -a infinite-plains-14949
```
```
Setting TYK_PLUGINS and restarting ⬢ infinite-plains-14949... done, v9
TYK_PLUGINS: python
```

After re-starting the Gateway, the logs should be showing something similar to this:
```
2018-05-18T13:13:50.272511+00:00 app[web.1]: Tyk will be using python plugins
2018-05-18T13:13:50.311510+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Setting PYTHONPATH to 'coprocess/python:middleware/python:event_handlers:coprocess/python/proto'"
2018-05-18T13:13:50.311544+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Initializing interpreter, Py_Initialize()"
2018-05-18T13:13:50.497815+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Initializing dispatcher"
```

Set this variable back to an empty value in order to revert back to the default behavior.

**Upgrading or Customizing Tyk**

Since this deployment is based on Docker images and containers, upgrading or making changes to the deployment is as easy as building a new image and pushing it to the registry.

Specifically, upgrading version of any Tyk components is done by editing the corresponding `Dockerfile` and replacing the base image version tag. E.g. changing `FROM tykio/tyk-gateway:v2.5.4` to `FROM tykio/tyk-gateway:v2.6.1` will pull the Tyk gateway 2.6.1. We highly recommend specifying concrete version tags instead of `latest` for better house keeping.

Once these changes have been made just run `heroku container:push --recursive -a app_name` on the corresponding directory as shown previously in this guide. This will do all the building and pushing as well as gracefully deploying on your Heroku app.


Please refer to [Heroku documentation on containers and registry](https://devcenter.heroku.com/articles/container-registry-and-runtime) for more information.


### Install on Microsoft Azure
  
[Azure](https://azure.microsoft.com/en-us/explore/) is Microsoft's cloud services platform. It supports both the running of [Ubuntu Servers](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/canonical.0001-com-ubuntu-server-focal?tab=overview), as well as [Docker](https://learn.microsoft.com/en-us/previous-versions/azure/virtual-machines/linux/docker-machine) and [Docker-Compose](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/docker-compose-quickstart).

For more details, see the [Azure Documentation](https://docs.microsoft.com/en-us/azure/).

**Tyk Installation Options for Azure **

Azure allows you to install Tyk in the following ways:

**On-Premises**

1. Via our [Ubuntu Setup]({{< ref "tyk-self-managed#debian-ubuntu-install-gateway" >}}) on an installed Ubuntu Server on Azure.
2. Via our [Docker Installation]({{< ref "#docker-compose-setup" >}}) using Azure's Docker support.

See our video for installing Tyk on Ubuntu via Azure:

{{< youtube -Q9Lox-DyTU >}}

We also have a [blog post](https://tyk.io/blog/getting-started-with-tyk-on-microsoft-azure-and-ubuntu/) that walks you through installing Tyk on Azure.


### Install to Google Cloud

[GCP](https://cloud.google.com/) is Google's Cloud services platform. It supports both the running of [Ubuntu Servers](https://console.cloud.google.com/marketplace/browse?q=ubuntu%2020.04) and [Docker](https://cloud.google.com/build/docs/cloud-builders).

For more details, see the [Google Cloud Documentation](https://cloud.google.com/docs).

**Tyk Installation Options for Google CLoud **

Google Cloud allows you to install Tyk in the following ways:

**On-Premises**

1. Via our [Ubuntu Setup]({{< ref "tyk-self-managed#debian-ubuntu-install-gateway" >}}) on an installed Ubuntu Server within Google Cloud.
2. Via our [Docker Installation]({{< ref "#docker-compose-setup" >}}) using Google Cloud's Docker support.

**Tyk Pump on GCP**

When running Tyk Pump in GCP using [Cloud Run](https://cloud.google.com/run/docs/overview/what-is-cloud-run) it is available 24/7. However, since it is serverless you also need to ensure that the _CPU always allocated_ option is configured to ensure availability of the analytics. Otherwise, for each request there will be a lag between the Tyk Pump container starting up and having the CPU allocated. Subsequently, the analytics would only be available during this time.

1. Configure Cloud Run to have the [CPU always allocated](https://cloud.google.com/run/docs/configuring/cpu-allocation#setting) option enabled. Otherwise, the Tyk Pump container needs to warm up, which takes approximately 1 min. Subsequently, by this time the stats are removed from Redis.

2. Update the Tyk Gateway [configuration]({{< ref "tyk-oss-gateway/configuration#analytics_configstorage_expiration_time" >}}) to keep the stats for 3 mins to allow Tyk Pump to process them. This value should be greater than the Pump [purge delay]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#purge_delay" >}}) to ensure the analytics data exists long enough in Redis to be processed by the Pump. 


### Install Tyk on Red Hat (RHEL / CentOS) {#install-tyk-on-redhat-rhel-centos}

Select the preferred way of installing Tyk by selecting **Shell** or **Ansible** tab for instructions.
There are 4 components which needs to be installed. Each can be installed via shell or ansible

#### Install Database

##### Using Shell

**Supported Distributions**
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 7 | ✅ |
| RHEL | 9 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |


**Install and Configure Dependencies**
<br>

**Redis**

Tyk Gateway has a [dependency]({{< ref "#redis-1" >}}) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

**Storage Database**

Tyk Dashboard has a dependency on a storage database that can be [PostgreSQL]({{< ref "tyk-self-managed#postgresql" >}}) or [MongoDB]({{< ref "#mongodb-sizing-guidelines" >}}).
  

**Option 1: Install PostgreSQL**

Check the PostgreSQL supported [versions]({{< ref "tyk-self-managed#postgresql" >}}). Follow the steps provided by [PostgreSQL](https://www.postgresql.org/download/linux/redhat/) to install it.

Configure PostgreSQL

Create a new role/user
```console
sudo -u postgres createuser --interactive
```
The name of the role can be "tyk" and say yes to make it a superuser

Create a matching DB with the same name. Postgres authentication system assumes by default that for any role used to log in, that role will have a database with the same name which it can access.
```console
sudo -u postgres createdb tyk
```
Add another user to be used to log into your operating system

```console
sudo adduser tyk
```
Log in to your Database
```console
sudo -u tyk psql
```
Update the user “tyk” to have a password
```console
ALTER ROLE tyk with PASSWORD '123456';
```
Create a DB (my example is tyk_analytics)
```console
sudo -u tyk createdb tyk_analytics
```
**Option 2: Install MongoDB**
<br>
Check the MongoDB supported [versions]({{< ref "#mongodb-sizing-guidelines" >}}). Follow the steps provided by [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/) to install it.

Optionally initialize the database and enable automatic start:
```console
# Optionally ensure that MongoDB will start following a system reboot
sudo systemctl enable mongod
# start MongoDB server
sudo systemctl start mongod
```

##### Using Ansible
You can install Tyk on RHEL or CentOS using our YUM repositories. Follow the guides and tutorials in this section to have Tyk up and running in no time.

The order is to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard]({{< ref "#install-dashboard" >}})
- [Pump]({{< ref "#install-pump" >}})
- [Gateway]({{< ref "#install-gateway" >}})

{{< note success >}}
**Note**  

For a production environment, we recommend that the Tyk Gateway, Tyk Dashboard and Tyk Pump are installed on separate machines. If installing multiple Tyk Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "#planning-for-production" >}}) for more details.
{{< /note >}}

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |


**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below. 

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

    ```console
    $ git clone https://github.com/TykTechnologies/tyk-ansible
    ```

2. `cd` into the directory

  ```console
  $ cd tyk-ansible
  ```

3. Run initialisation script to initialise environment

    ```console
    $ sh scripts/init.sh
    ```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install the following:

    - Redis
    - MongoDB or PostgreSQL
    - Tyk Dashboard
    - Tyk Gateway
    - Tyk Pump

    ```console
    $ ansible-playbook playbook.yaml -t tyk-pro -t redis -t `mongodb` or `pgsql`
    ```

    You can choose to not install Redis, MongoDB or PostgreSQL by removing the `-t redis` or `-t mongodb` or `-t pgsql` However Redis and MongoDB or PostgreSQL are a requirement and need to be installed for the Tyk Pro installation to run.

**Variables**

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
| mongo.host |  | MongoDB server host if different than the hosts url |
| mongo.port | `27017` | MongoDB server listening port  |
| mongo.tls | `false` | Enable if mongo connection is secured with SSL |
| pgsql.host |  | PGSQL server host if different than the hosts url |
| pgsql.port | `5432` | PGSQL server listening port  |
| pgsql.tls | `false` | Enable if pgsql connection is secured with SSL |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organization ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorize the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in. The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

- `vars/mongodb.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| bind_ip | `0.0.0.0` | Binding address of MongoDB |
| mongodb_version | `4.4` | MongoDB version |

Read more about MongoDB configuration [here](https://github.com/ansible-collections/community.mongodb).

- `vars/pgsql.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| postgresql_databases[] | `[]` | Array of DBs to be created |
| postgresql_databases[].name | `tyk_analytics` | Database name |
| postgresql_users[] | `[]` | Array of users to be created |
| postgresql_users[`0`].name | `default` | User name |
| postgresql_users[`0`].password | `topsecretpassword` | User password |
| postgresql_global_config_options[] | `[]` | Postgres service config options |
| postgresql_global_config_options[`1`].option | `listen_addresses` | Listen address binding for the service |
| postgresql_global_config_options[`1`].value | `*` | Default value to listen to all addresses |
| postgresql_hba_entries[] | `[]` | Host based authenticaiton list|
| postgresql_hba_entries[`4`].type | `host` | Entry type |
| postgresql_hba_entries[`4`].database | `tyk_analytics` | Which database this entry will give access to |
| postgresql_hba_entries[`4`].user | `default` | What users this gain access from this entry |
| postgresql_hba_entries[`4`].address | `0.0.0.0/0` | What addresses this gain access from this entry |
| postgresql_hba_entries[`4`].auth_method | `md5` | What authentication method to to use for the users |

Read more about PostgreSQL configuration [here](https://github.com/geerlingguy/ansible-role-postgresql).


#### Install Dashboard

##### Using Shell

Tyk has its own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk/tyk-dashboard/install#manual-rpm), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This configuration should also work (with some tweaks) for CentOS.

**Prerequisites**

*   Ensure port `3000` is open: This is used by the Dashboard to provide the GUI and the Classic Developer Portal.
*   Follow the steps provided in this link [Getting started on Red Hat (RHEL / CentOS)]({{< ref "#install-tyk-on-redhat-rhel-centos" >}}) to install and configure Tyk dependencies.

1. **Set up YUM Repositories**

    First, install two package management utilities `yum-utils` and a file downloading tool `wget`:
    ```bash
    sudo yum install yum-utils wget
    ```
    Then install Python:
    ```bash
    sudo yum install python3
    ```

2. **Configure and Install the Tyk Dashboard**

    Create a file named `/etc/yum.repos.d/tyk_tyk-dashboard.repo` that contains the repository configuration settings for YUM repositories `tyk_tyk-dashboard` and `tyk_tyk-dashboard-source` used to download packages from the specified URLs, including GPG key verification and SSL settings, on a Linux system.

    Make sure to replace `el` and `8` in the config below with your Linux distribution and version:
    ```bash
    [tyk_tyk-dashboard]
    name=tyk_tyk-dashboard
    baseurl=https://packagecloud.io/tyk/tyk-dashboard/el/8/$basearch
    repo_gpgcheck=1
    gpgcheck=0
    enabled=1
    gpgkey=https://packagecloud.io/tyk/tyk-dashboard/gpgkey
    sslverify=1
    sslcacert=/etc/pki/tls/certs/ca-bundle.crt
    metadata_expire=300

    [tyk_tyk-dashboard-source]
    name=tyk_tyk-dashboard-source
    baseurl=https://packagecloud.io/tyk/tyk-dashboard/el/8/SRPMS
    repo_gpgcheck=1
    gpgcheck=0
    enabled=1
    gpgkey=https://packagecloud.io/tyk/tyk-dashboard/gpgkey
    sslverify=1
    sslcacert=/etc/pki/tls/certs/ca-bundle.crt
    metadata_expire=300
    ```

    We'll need to update the YUM package manager's local cache, enabling only the `tyk_tyk-dashboard` repository while disabling all other repositories `--disablerepo='*' --enablerepo='tyk_tyk-dashboard'`, and confirm all prompts `-y`.
    ```bash
    sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
    ```

    Install Tyk dashboard:
    ```bash
    sudo yum install -y tyk-dashboard
    ```

3. **Confirm Redis and MongoDB or PostgreSQL are running**

    Start Redis since it is always required by the Dashboard.
    ```bash
    sudo service redis start
    ```
    Then start either MongoDB or PostgreSQL depending on which one you are using.
    ```bash
    sudo systemctl start mongod
    ```
    ```bash
    sudo systemctl start postgresql-13
    ```

4. **Configure Tyk Dashboard**

We can set the Dashboard up with a similar setup command, the script below will get the Dashboard set up for the local instance.
Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<Redis Hostname> --redisport=6379 --mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

Replace `<Redis Hostname>`, `<Mongo IP Address>` and `<Mongo Port>` with your own values to run this script.

{{< tab_end >}}
{{< tab_start "SQL" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<Redis Hostname> --redisport=6379 --storage=postgres --connection_string=postgresql://<User>:<Password>@<PostgreSQL Hostname>:<PostgreSQL Port>/<PostgreSQL DB> --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

Replace `<Redis Hostname>`,`<PostgreSQL Hostname>`,`<PostgreSQL Port>`, `<PostgreSQL User>`, `<PostgreSQL Password>` and `<PostgreSQL DB>` with your own values to run the script.

{{< tab_end >}}
{{< tabs_end >}}

With these values your are configuring the following:

*   `--listenport=3000`: Tyk Dashboard (and Portal) to listen on port `3000`.
*   `--redishost=<hostname>`: Tyk Dashboard should use the local Redis instance.
*   `--redisport=6379`: The Tyk Dashboard should use the default port.
*   `--domain="XXX.XXX.XXX.XXX"`: Bind the Dashboard to the IP or DNS hostname of this instance (required).
*   `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics`: Use the local MongoDB (should always be the same as the Gateway).
*   `--storage=postgres`: In case, your preferred storage Database is PostgreSQL, use storage type "postgres" and specify connection string.
*   `--connection_string=postgresql://<User>:<Password>@<PostgreSQL Host Name>:<PostgreSQL Port>/<PostgreSQL DB>`: Use the PostgreSQL instance provided in the connection string (should always be the same as the gateway).
*   `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
*   `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
*   `--tyk_node_port=8080`: Tell the Dashboard that the Tyk node it should communicate with is on port 8080.
*   `--portal_root=/portal`: We want the Portal to be shown on /portal of whichever domain we set for the Portal.

5. **Start Tyk Dashboard**

    ```bash
    sudo service tyk-dashboard start
    ```
    {{< note success >}}
**Note**  

To check the logs from the deployment run:
```bash
sudo journalctl -u tyk-dashboard 
```
    {{< /note >}}

    Notice how we haven't actually started the gateway yet, because this is a Dashboard install, we need to enter a license first.

    {{< note success >}}
**Note**  

When using PostgreSQL you may receive the error: `"failed SASL auth (FATAL: password authentication failed for user...)"`, follow these steps to address the issue:
1. Open the terminal or command prompt on your PostgreSQL server.
2. Navigate to the location of the `pg_hba.conf` file. This file is typically located at `/var/lib/pgsql/13/data/pg_hba.conf`.
3. Open the `pg_hba.conf` file using a text manipulation tool.
4. In the  `pg_hba.conf` file, locate the entry corresponding to the user encountering the authentication error. This entry might resemble the following:
```bash
host    all    all    <IP_address>/<netmask>    scram-sha-256
```
5. In the entry, find the METHOD column. It currently has the value scram-sha-256.
6. Replace scram-sha-256 with md5, so the modified entry looks like this:
```bash
host    all    all    <IP_address>/<netmask>    md5
```
7. Save the changes you made to the `pg_hba.conf` file.
8. Restart the PostgreSQL service to apply the modifications:
```bash
sudo systemctl restart postgresql-13
```
 {{< /note >}}

6. **Enter Dashboard license**

    Add your license in `/var/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

    If all is going well, you will be taken to a Dashboard setup screen - we'll get to that soon.

7. **Restart the Dashboard process**

    Because we've just entered a license via the UI, we need to make sure that these changes get picked up, so to make sure things run smoothly, we restart the Dashboard process (you only need to do this once) and (if you have it installed) then start the gateway:
    ```bash
    sudo service tyk-dashboard restart 
    ```

8. **Go to the Tyk Dashboard URL**

    Go to the following URL to access to the Tyk Dashboard:

    ```bash
    127.0.0.1:3000
    ```

    You should get to the Tyk Dashboard Setup screen:

    {{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

9. **Create your Organization and Default User**

    You need to enter the following:

    * Your **Organization Name**
    * Your **Organization Slug**
    * Your User **Email Address**
    * Your User **First and Last Name**
    * A **Password** for your User
    * **Re-enter** your user **Password**


    {{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case letters.
    {{< /note >}}


    Click **Bootstrap** to save the details.

10. **Login to the Dashboard**

    You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

    **Configure your Developer Portal**

    To set up your [Developer Portal]({{< ref "tyk-developer-portal" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "getting-started/tutorials/publish-api" >}}).

##### Using Ansible

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-dashboard`

```bash
$ ansible-playbook playbook.yaml -t tyk-dashboard
```

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

**Variables**

- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |



#### Install Pump

##### Using Shell

Tyk has it's own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io](https://packagecloud.io), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS](http://aws.amazon.com) *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Pump with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

**Prerequisites**

We are assuming that Redis and either MongoDB or SQL are installed (these are installed as part of the Tyk Gateway and Dashboard installation guides)

**Step 1: Set up YUM Repositories**

First, we need to install some software that allows us to use signed packages:
```bash
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

Create a file named `/etc/yum.repos.d/tyk_tyk-pump.repo` that contains the repository configuration below: 

Make sure to replace `el` and `7` in the config below with your Linux distribution and version:
```bash
[tyk_tyk-pump]
name=tyk_tyk-pump
baseurl=https://packagecloud.io/tyk/tyk-pump/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-pump/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

Finally we'll need to update our local cache, so run:
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'
```

**Step 2: Install Packages**

We're ready to go, you can now install the relevant packages using yum:
```bash
sudo yum install -y tyk-pump
```

**(You may be asked to accept the GPG key for our repos and when the package installs, hit yes to continue.)**
<br>

**Step 3: Configure Tyk Pump**

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly.


**Configure Tyk Pump for MongoDB**
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Mongo IP Address>`, `<Mongo Port>`  for `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/` with your own values to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>:<Mongo Port>/tyk_analytics
```
**Configure Tyk Pump for SQL**
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`,`<Port>`, `<User>`, `<Password>`, `<DB>` for `--postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.
{{< /note >}}
```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"
```


**Step 4: Start Tyk Pump**

```bash
sudo service tyk-pump start
```

That's it, the Pump should now be up and running.

You can verify if Tyk Pump is running and working by accessing the logs:
```bash
sudo journalctl -u tyk-pump
```



##### Using Ansible

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-pump`

```bash
$ ansible-playbook playbook.yaml -t tyk-pump
```

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |



#### Install Gateway

##### Using Shell

Tyk has it's own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk/tyk-dashboard/install#manual-rpm), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS](http://aws.amazon.com) *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Gateway with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

**Prerequisites**

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (API traffic to be proxied)
*   EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn’t a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis. Install EPEL using the instructions here.

**Step 1: Set up YUM Repositories**

First, we need to install some software that allows us to use signed packages:
```bash
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

**Step 2: Create Tyk Gateway Repository Configuration**

Create a file named `/etc/yum.repos.d/tyk_tyk-gateway.repo` that contains the repository configuration below https://packagecloud.io/tyk/tyk-gateway/install#manual-rpm:
```bash
[tyk_tyk-gateway]
name=tyk_tyk-gateway
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

**Step 3: Install Packages**

We're ready to go, you can now install the relevant packages using yum:
```bash
sudo yum install -y redis tyk-gateway
```

*(you may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue)*

**Step 4: Start Redis**

In many cases Redis will not be running, so let's start those:
```bash
sudo service redis start
```

When Tyk is finished installing, it will have installed some init scripts, but it will not be running yet. The next step will be to setup the Gateway – thankfully this can be done with three very simple commands.



##### Using Ansible

**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below. Use the **Shell** tab for instructions to install Tyk from a shell.

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway`

```bash
$ ansible-playbook playbook.yaml -t `tyk-gateway-pro` or `tyk-gateway-hybrid`
```

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

**Variables**

- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organization ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorize the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in. The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |
###### Configure Tyk Gateway with the Dashboard

**Prerequisites**

This configuration assumes that you have already installed Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

**Set up Tyk Gateway with Quick Start Script**

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`with your own value to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-gateway/install/setup.sh --dashboard=1 --listenport=8080 --redishost=<hostname> --redisport=6379
```

What we've done here is told the setup script that:

*   `--dashboard=1`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the Dashboard service, as of v2.3 Tyk will auto-detect the location of the dashboard, we only need to specify that we should use this mode.
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=<hostname>`: Use Redis on the hostname: localhost.
*   `--redisport=6379`: Use the default Redis port.

**Starting Tyk**

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```

**Pro Tip: Domains with Tyk Gateway**

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.

### Install Tyk on Debian or Ubuntu

#### Install Database

##### Using Shell

**Requirements**

Before installing the Tyk components in the order below, you need to first install Redis and MongoDB/SQL.

**Getting Started**

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}
**Install MongoDB 4.0**

You should follow the [online tutorial for installing MongoDb](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-ubuntu/). We will be using version 4.0. As part of the Mongo installation you need to perform the following:

1. Import the public key
2. Create a list file
3. Reload the package database
4. Install the MongoDB packages
5. Start MongoDB
6. Check the `mongod` service is running

{{< tab_end >}}
{{< tab_start "SQL" >}}

**Install SQL**

You should follow the [online tutorial for installing PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/). We will be using version 13. As part of the PostgreSQL installation you need to perform the following:

1. Create the file repository configuration
2. Import the repository signing key
3. Update the package lists
4. Install the PostgreSQL packages
5. Start PostgreSQL
6. Check the `postgresql` service is running

See [SQL configuration]({{< ref "tyk-self-managed#postgresql" >}}) for details on installing SQL in a production environment.
{{< tab_end >}}
{{< tabs_end >}}

**Install Redis**

```console
$ sudo apt-get install -y redis-server
```

**Install Tyk Pro on Ubuntu**

Installing Tyk on Ubuntu is very straightforward using our APT repositories, follow the guides and tutorials in this section to have Tyk up and running in no time.

The suggested order would be to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard]({{< ref "tyk-self-managed#Debian-Ubuntu-install-dashboard" >}})
- [Pump]({{< ref "tyk-self-managed#Debian-Ubuntu-install-pump" >}})
- [Gateway]({{< ref "tyk-self-managed#debian-ubuntu-install-gateway" >}})

{{< note success >}}
**Note**  

For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "tyk-self-managed#planning-for-production" >}}) For more details.
{{< /note >}}


##### Using Ansible

**Requirements**


[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below. Use the **Shell** tab for instructions to install Tyk from a shell.

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```console
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```console
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```console
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install the following:
- Redis
- MongoDB or PostgreSQL
- Tyk Dashboard
- Tyk Gateway
- Tyk Pump

```console
$ ansible-playbook playbook.yaml -t tyk-pro -t redis -t `mongodb` or `pgsql`
```

You can choose to not install Redis, MongoDB or PostgreSQL by removing the `-t redis` or `-t mongodb` or `-t pgsql` However Redis and MongoDB or PostgreSQL are a requirement and need to be installed for the Tyk Pro installation to run.

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

**Variables**

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
| mongo.host |  | MongoDB server host if different than the hosts url |
| mongo.port | `27017` | MongoDB server listening port  |
| mongo.tls | `false` | Enable if mongo connection is secured with SSL |
| pgsql.host |  | PGSQL server host if different than the hosts url |
| pgsql.port | `5432` | PGSQL server listening port  |
| pgsql.tls | `false` | Enable if pgsql connection is secured with SSL |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organization ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorize the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in. The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

- `vars/mongodb.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| bind_ip | `0.0.0.0` | Binding address of MongoDB |
| mongodb_version | `4.4` | MongoDB version |

Read more about MongoDB configuration [here](https://github.com/ansible-collections/community.mongodb).

- `vars/pgsql.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| postgresql_databases[] | `[]` | Array of DBs to be created |
| postgresql_databases[].name | `tyk_analytics` | Database name |
| postgresql_users[] | `[]` | Array of users to be created |
| postgresql_users[`0`].name | `default` | User name |
| postgresql_users[`0`].password | `topsecretpassword` | User password |
| postgresql_global_config_options[] | `[]` | Postgres service config options |
| postgresql_global_config_options[`1`].option | `listen_addresses` | Listen address binding for the service |
| postgresql_global_config_options[`1`].value | `*` | Default value to listen to all addresses |
| postgresql_hba_entries[] | `[]` | Host based authenticaiton list|
| postgresql_hba_entries[`4`].type | `host` | Entry type |
| postgresql_hba_entries[`4`].database | `tyk_analytics` | Which database this entry will give access to |
| postgresql_hba_entries[`4`].user | `default` | What users this gain access from this entry |
| postgresql_hba_entries[`4`].address | `0.0.0.0/0` | What addresses this gain access from this entry |
| postgresql_hba_entries[`4`].auth_method | `md5` | What authentication method to to use for the users |

Read more about PostgreSQL configuration [here](https://github.com/geerlingguy/ansible-role-postgresql).

#### Install Dashboard {#Debian-Ubuntu-install-dashboard}

##### Using Shell

Tyk has its own APT repositories hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial has been tested on Ubuntu 16.04 & 18.04 with few if any modifications. We will install the Tyk Dashboard with all dependencies locally.

**Prerequisites**
- Have MongoDB/SQL and Redis installed - follow the guide for [installing databases on Debian/Ubuntu]({{< ref "#install-tyk-on-debian-or-ubuntu" >}}).
- Ensure port `3000` is available. This is used by the Tyk Dashboard to provide the GUI and the Developer Portal.

**Step 1: Set up our APT Repositories**

First, add our GPG key which signs our binaries:

```bash
curl -L https://packagecloud.io/tyk/tyk-dashboard/gpgkey | sudo apt-key add -
```

Run update:

```bash
sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:

```bash
sudo apt-get install -y apt-transport-https
```

Now lets add the required repos and update again (notice the `-a` flag in the second Tyk commands - this is important!):

```bash
echo "deb https://packagecloud.io/tyk/tyk-dashboard/ubuntu/ bionic main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-dashboard.list

echo "deb-src https://packagecloud.io/tyk/tyk-dashboard/ubuntu/ bionic main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-dashboard.list

sudo apt-get update
```

{{< note success >}}

**Note**  

`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://releases.ubuntu.com/), e.g. `focal`.

{{< /note >}}

**What we've done here is:**

- Added the Tyk Dashboard repository
- Updated our package list

**Step 2: Install the Tyk Dashboard**

We're now ready to install the Tyk Dashboard. To install run:

```bash
sudo apt-get install -y tyk-dashboard
```

What we've done here is instructed `apt-get` to install the Tyk Dashboard without prompting. Wait for the downloads to complete.

When the Tyk Dashboard has finished installing, it will have installed some `init` scripts, but it will not be running yet. The next step will be to setup each application - thankfully this can be done with three very simple commands.

**Verify the origin key (optional)**

Debian packages are signed with the repository keys. These keys are verified at the time of fetching the package and is taken care of by the `apt` infrastructure. These keys are controlled by PackageCloud, our repository provider. For an additional guarantee, it is possible to verify that the package was indeed created by Tyk by verifying the `origin` certificate that is attached to the package.

First, you have to fetch Tyk's signing key and import it.

```bash
wget https://keyserver.tyk.io/tyk.io.deb.signing.key
gpg --import tyk.io.deb.signing.key
```

Then, you have to either,
- sign the key with your ultimately trusted key
- trust this key ultimately

The downloaded package will be available in `/var/cache/apt/archives`. Assuming you found the file `tyk-gateway-2.9.4_amd64.deb` there, you can verify the origin signature.

```bash
gpg --verify d.deb
gpg: Signature made Wed 04 Mar 2020 03:05:00 IST
gpg:                using RSA key F3781522A858A2C43D3BC997CA041CD1466FA2F8
gpg: Good signature from "Team Tyk (package signing) <team@tyk.io>" [ultimate]
```

###### **Configure Tyk Dashboard**

**Prerequisites for MongoDB**

You need to ensure the MongoDB and Redis services are running before proceeding.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<IP Address>` for `--mongo=mongodb://<IP Address>/` with your own values to run this script.
{{< /note >}}


You can set your Tyk Dashboard up with a helper setup command script. This will get the Dashboard set up for the local instance:

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>/tyk_analytics --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

{{< note success >}}
**Note**  

Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.
{{< /note >}}


What we have done here is:

- `--listenport=3000`: Told the Tyk Dashboard (and Portal) to listen on port 3000.
- `--redishost=<hostname>`: The Tyk Dashboard should use the local Redis instance.
- `--redisport=6379`: The Tyk Dashboard should use the default port.
- `--domain="XXX.XXX.XXX.XXX"`: Bind the Tyk Dashboard to the IP or DNS hostname of this instance (required).
- `--mongo=mongodb://<IP Address>/tyk_analytics`: Use the local MongoDB (should always be the same as the gateway).
- `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
- `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
- `--tyk_node_port=8080`: Tell the Tyk Dashboard that the Tyk node it should communicate with is on port 8080.
- `--portal_root=/portal`: We want the portal to be shown on `/portal` of whichever domain we set for the portal.

**Prerequisites for SQL**

You need to ensure the PostgreSQL and Redis services are running before proceeding.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`, `<Port>`, `<User>`, `<Password>`, `<DB>` for `--connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.
{{< /note >}}


You can set the Tyk Dashboard up with a helper setup command script. This will get the Dashboard set up for the local instance:

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --storage=postgres --connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>" --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

{{< note success >}}
**Note**  

Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.
{{< /note >}}


What we have done here is:

- `--listenport=3000`: Told the Tyk Dashboard (and Portal) to listen on port 3000.
- `--redishost=<hostname>`: The Tyk Dashboard should use the local Redis instance.
- `--redisport=6379`: The Tyk Dashboard should use the default port.
- `--domain="XXX.XXX.XXX.XXX"`: Bind the dashboard to the IP or DNS hostname of this instance (required).
- `--storage=postgres`: Use storage type postgres.
- `--connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"`: Use the postgres instance provided in the connection string(should always be the same as the gateway).
- `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
- `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
- `--tyk_node_port=8080`: Tell the dashboard that the Tyk node it should communicate with is on port 8080.
- `--portal_root=/portal`: We want the portal to be shown on `/portal` of whichever domain we set for the portal.


**Step 1: Enter your Tyk Dashboard License**

Add your license in `/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

**Step 2: Start the Tyk Dashboard**

Start the dashboard service, and ensure it will start automatically on system boot.

```bash
sudo systemctl start tyk-dashboard
sudo systemctl enable tyk-dashboard
```

**Step 3: Install your Tyk Gateway**

Follow the [Gateway installation instructions]({{< ref "#using-shell-7" >}}) to connect to your Dashboard instance before you continue on to step 4.

**Step 4: Bootstrap the Tyk Dashboard with an initial User and Organization**

Go to:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

**Step 5 - Create your Organization and Default User**

You need to enter the following:

- Your **Organization Name**
- Your **Organization Slug**
- Your User **Email Address**
- Your User **First and Last Name**
- A **Password** for your User
- **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}

Click **Bootstrap** to save the details.

**Step 6 - Login to the Tyk Dashboard**

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

###### **Configure your Developer Portal**

To set up your [Developer Portal]({{< ref "tyk-developer-portal" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "getting-started/tutorials/publish-api" >}}).

##### Using Ansible

**Getting Started**

1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-dashboard`

```bash
$ ansible-playbook playbook.yaml -t tyk-dashboard
```

**Supported Distributions**

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

**Variables**

- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |

#### Install Pump {#Debian-Ubuntu-install-pump}

##### Using Shell

This tutorial has been tested Ubuntu 16.04 & 18.04 with few if any modifications.

**Prerequisites**

- You have installed Redis and either MongoDB or SQL.
- You have installed the Tyk Dashboard.

**Step 1: Set up our APT repositories**

First, add our GPG key which signs our binaries:

```bash
curl -L https://packagecloud.io/tyk/tyk-pump/gpgkey | sudo apt-key add -
```

Run update:

```bash
sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:

```bash
sudo apt-get install -y apt-transport-https
```

Now lets add the required repos and update again (notice the `-a` flag in the second Tyk commands - this is important!):

```bash
echo "deb https://packagecloud.io/tyk/tyk-pump/ubuntu/ bionic main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-pump.list

echo "deb-src https://packagecloud.io/tyk/tyk-pump/ubuntu/ bionic main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-pump.list

sudo apt-get update
```

{{< note success >}}

**Note**  

`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://releases.ubuntu.com/), e.g. `focal`.

{{< /note >}}

**What you've done here is:**

- Added the Tyk Pump repository
- Updated our package list

**Step 2: Install the Tyk Pump**

You're now ready to install the Tyk Pump. To install it, run:

```bash
sudo apt-get install -y tyk-pump
```

What you've done here is instructed `apt-get` to install Tyk Pump without prompting. Wait for the downloads to complete.

When Tyk Pump has finished installing, it will have installed some `init` scripts, but it will not be running yet. The next step will be to setup each application using three very simple commands.

**Verify the origin key (optional)**

Debian packages are signed with the repository keys. These keys are verified at the time of fetching the package and is taken care of by the `apt` infrastructure. These keys are controlled by PackageCloud, our repository provider. For an additional guarantee, it is possible to verify that the package was indeed created by Tyk by verifying the `origin` certificate that is attached to the package.

First, you have to fetch Tyk's signing key and import it.

```bash
wget https://keyserver.tyk.io/tyk.io.deb.signing.key
gpg --import tyk.io.deb.signing.key
```

Then, you have to either,
- sign the key with your ultimately trusted key
- trust this key ultimately

The downloaded package will be available in `/var/cache/apt/archives`. Assuming you found the file `tyk-gateway-2.9.3_amd64.deb` there, you can verify the origin signature.

```bash
gpg --verify d.deb
gpg: Signature made Wed 04 Mar 2020 03:05:00 IST
gpg:                using RSA key F3781522A858A2C43D3BC997CA041CD1466FA2F8
gpg: Good signature from "Team Tyk (package signing) <team@tyk.io>" [ultimate]
```

**Step 3: Configure Tyk Pump**

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly.

**Option 1: Configure Tyk Pump for MongoDB**
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<IP Address>` for `--mongo=mongodb://<IP Address>/` with your own values to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>/tyk_analytics
```

**Option 2: Configure Tyk Pump for SQL**
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`,`<Port>`, `<User>`, `<Password>`, `<DB>` for `--postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"
```

**Step 4: Start Tyk Pump**

```bash
sudo service tyk-pump start
sudo service tyk-pump enable
```

You can verify if Tyk Pump is running and working by tailing the log file:

```bash
sudo tail -f /var/log/upstart/tyk-pump.log
```

##### Using Ansible

**Install Tyk Pump Through Ansible**

**Getting Started**
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-pump`

```bash
$ ansible-playbook playbook.yaml -t tyk-pump
```

**Supported Distributions**
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

#### Install Gateway {#debian-ubuntu-install-gateway}

##### Using Shell

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial has been tested on Ubuntu 16.04 & 18.04 with few if any modifications.

Please note however, that should you wish to write your own plugins in Python, we currently have a Python version dependency of 3.4. Python-3.4 ships with Ubuntu 14.04, however you may need to explicitly install it on newer Ubuntu Operating System releases.

**Prerequisites**

*   Ensure port `8080` is available. This is used in this guide for Gateway traffic (API traffic to be proxied).
*   You have MongoDB and Redis installed.
*   You have installed firstly the Tyk Dashboard, then the Tyk Pump.

**Step 1: Set up our APT Repositories**

First, add our GPG key which signs our binaries:

```bash
curl -L https://packagecloud.io/tyk/tyk-gateway/gpgkey | sudo apt-key add -
```

Run update:
```bash
sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:
```bash
sudo apt-get install -y apt-transport-https 
```

Create a file `/etc/apt/sources.list.d/tyk_tyk-gateway.list` with the following contents:
```bash
deb https://packagecloud.io/tyk/tyk-gateway/ubuntu/ bionic main
deb-src https://packagecloud.io/tyk/tyk-gateway/ubuntu/ bionic main
```
{{< note success >}}

**Note**



`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://releases.ubuntu.com/), e.g. `focal`.

{{< /note >}}

Now you can refresh the list of packages with:
```bash
sudo apt-get update
```

**What we've done here is:**

*   Added the Tyk Gateway repository
*   Updated our package list

**Step 2: Install the Tyk Gateway**

We're now ready to install the Tyk Gateway. To install it, run:

```bash
sudo apt-get install -y tyk-gateway
```
What we've done here is instructed apt-get to install the Tyk Gateway without prompting, wait for the downloads to complete.

When Tyk has finished installing, it will have installed some init scripts, but will not be running yet. The next step will be to set up the Gateway - thankfully this can be done with three very simple commands, however it does depend on whether you are configuring Tyk Gateway for use with the Dashboard or without (the Community Edition).

**Verify the origin key (optional)**

Debian packages are signed with the repository keys. These keys are verified at the time of fetching the package and is taken care of by the `apt` infrastructure. These keys are controlled by PackageCloud, our repository provider. For an additional guarantee, it is possible to verify that the package was indeed created by Tyk by verifying the `origin` certificate that is attached to the package.

First, you have to fetch Tyk's signing key and import it.

```bash
wget https://keyserver.tyk.io/tyk.io.deb.signing.key
gpg --import tyk.io.deb.signing.key
```

Then, you have to either,
- sign the key with your ultimately trusted key
- trust this key ultimately

The downloaded package will be available in `/var/cache/apt/archives`. Assuming you found the file `tyk-gateway-2.9.4_amd64.deb` there, you can verify the origin signature.

```bash
gpg --verify d.deb
gpg: Signature made Wed 04 Mar 2020 03:05:00 IST
gpg:                using RSA key F3781522A858A2C43D3BC997CA041CD1466FA2F8
gpg: Good signature from "Team Tyk (package signing) <team@tyk.io>" [ultimate]
```

**Configure Tyk Gateway with Dashboard**

**Prerequisites**

This configuration assumes that you have already installed the Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

**Set up Tyk**

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`with your own value to run this script.
{{< /note >}}


```bash
sudo /opt/tyk-gateway/install/setup.sh --dashboard=1 --listenport=8080 --redishost=<hostname> --redisport=6379
```

What we've done here is told the setup script that:

*   `--dashboard=1`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the Dashboard service, as of v2.3 Tyk will auto-detect the location of the dashboard, we only need to specify that we should use this mode.
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=<hostname>`: Use Redis on your hostname.
*   `--redisport=6379`: Use the default Redis port.

**Starting Tyk**

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
sudo service tyk-gateway enable
```

**Pro Tip: Domains with Tyk Gateway**

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.

[1]: https://packagecloud.io/tyk


##### Using Ansible

**Getting Started**
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway`

```bash
$ ansible-playbook playbook.yaml -t `tyk-gateway-pro` or `tyk-gateway-hybrid`
```

**Supported Distributions**
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

**Variables**
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organization ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorize the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in. The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |


## Explore Demos and Proof of Concepts

### Kubernetes Demo

The [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) repository allows you to start up an entire Tyk Stack
with all its dependencies as well as other tools that can integrate with Tyk.
The repository will spin up everything in Kubernetes using `helm` and bash magic
to get you started.

**Purpose**
Minimize the amount of effort needed to start up the Tyk infrastructure and
show examples of how Tyk can be set up in k8s using different deployment
architectures as well as different integrations.

#### Prerequisites

##### Required Packages

You will need the following tools to be able to run this project.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/) - CLI tool for controlling Kubernetes clusters
- [Helm](https://helm.sh/docs/intro/install/) - Helps manage Kubernetes applications through Helm charts
- [jq](https://stedolan.github.io/jq/download/) - CLI for working with JSON output and manipulating it 
- [git](https://git-scm.com/downloads) - CLI used to obtain the project from GitHub
- [Terraform](https://www.terraform.io/) (only when using `--cloud` flag)

Tested on Linux/Unix based systems on AMD64 and ARM architectures

##### License Requirements
- **Tyk OSS**: No license required as it is open-source.

- **Licensed Products**: Sign up [here](https://tyk.io/sign-up) using the button below, and choose "Get in touch" to receive a guided evaluation of the Tyk Dashboard and your temporary license. 
{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Get started" >}}


**How to use the license key**

Once you obtained the license key, create a `.env` file using the [example provided](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/.env.example) and update it with your licenses as follows:

```bash
git clone https://github.com/TykTechnologies/tyk-k8s-demo.git
cd tyk-k8s-demo
cp .env.example .env
```

Depending on the deployments you would like to install set values of the `LICENSE`, `MDCB_LICENSE`, and `PORTAL_LICENSE`
inside the `.env` file.

##### Minikube
If you are deploying this demo on [Minikube](https://minikube.sigs.k8s.io/docs/start), 
you will need to enable the [ingress addon](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/#enable-the-ingress-controller). 
You can do so by running the following commands:

```bash
minikube start
minikube addons enable ingress
```

#### Quick Start
```bash
./up.sh --deployments portal,operator-httpbin tyk-stack
```
This quick start command will start up the entire Tyk stack along with the
Tyk Enterprise Portal, Tyk Operator, and httpbin CRD example.

#### Possible deployments
- `tyk-stack`: A comprehensive Tyk Self Managed setup for a single region
- `tyk-cp`: Tyk control plane in a multi-region Tyk deployment
- `tyk-dp`: Data plane of hybrid gateways that connect to either Tyk Cloud or a Tyk Control Plane, facilitating scalable deployments
- `tyk-gateway`: Open Source Software (OSS) version of Tyk, self-managed and suitable for single-region deployments

 
#### Dependencies Options

**Redis Options**
- `redis`: Bitnami Redis deployment
- `redis-cluster`: Bitnami Redis Cluster deployment
- `redis-sentinel`: Bitnami Redis Sentinel deployment

**Storage Options**
- `mongo`: [Bitnami Mongo](https://artifacthub.io/packages/helm/bitnami/mongodb) database deployment as a Tyk backend
- `postgres`: [Bitnami Postgres](https://artifacthub.io/packages/helm/bitnami/postgresql) database deployment as a Tyk backend

**Supplementary Deployments**
Please see this [page](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/docs/FEATURES_MATRIX.md) for Tyk deployments compatibility charts.
- [cert-manager](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/cert-manager): deploys cert-manager.
- [datadog](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/datadog): deploys Datadog agent 
and starts up Tyk Pump to push analytics data from the Tyk platform to Datadog. It will also create a Datadog dashboard
for you to view the analytics.
- [elasticsearch](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/elasticsearch): deploys 
Elasticsearch and starts up Tyk pump to push analytics data from the Tyk platform to Elasticsearch.
  - [elasticsearch-kibana](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/elasticsearch-kibana): deploys the Elasticsearch deployment as well as a Kibana deployment and creates a Kibana dashboard for you to view the analytics.
- [Jaeger](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/jaeger): deploys the Jaeger operator, a Jaeger instance, and the OpenTelemetry collector and configures the Tyk deployment to send telemetry data to Jaeger through the OpenTelemetry collector.
- [k6](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/k6): deploys a Grafana K6 Operator.
  - [k6-slo-traffic](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/k6-slo-traffic): deploys a k6 CRD to generate a load of traffic to seed analytics data.
- [keycloak](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/keycloak): deploys the Keycloak Operator and a Keycloak instance.
  - [keycloak-dcr](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/keycloak-dcr): starts up a Keycloak Dynamic Client Registration example.
  - [keycloak-jwt](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/keycloak-jwt): starts up a Keycloak JWT Authentication example with Tyk.
  - [keycloak-sso](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/keycloak-sso): starts up a Keycloak SSO example with the Tyk Dashboard.
- [newrelic](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/newrelic): deploys New Relic and starts up a Tyk Pump to push analytics data from the Tyk platform to New Relic.
- [opa](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/opa): enables Open Policy Agent to allow for Dashboard APIs governance.
- [opensearch](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/opensearch): deploys OpenSearch and starts up Tyk Pump to push analytics data from the Tyk platform to OpenSearch.
- [operator](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator): deploys the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) and its dependency [cert-manager](https://github.com/jetstack/cert-manager).
  - [operator-federation](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator-federation): starts up Federation v1 API examples using the tyk-operator.
  - [operator-graphql](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator-graphql): starts up GraphQL API examples using the tyk-operator.
  - [operator-httpbin](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator-httpbin): starts up an API examples using the tyk-operator.
  - [operator-jwt-hmac](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator-jwt-hmac): starts up API examples using the tyk-operator to demonstrate JWT HMAC auth.
  - [operator-udg](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/operator-udg): starts up Universal Data Graph API examples using the tyk-operator.
- [portal](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/portal): deploys the [Tyk Enterprise Developer Portal]({{< ref "portal/overview/intro" >}}) as well as its dependency PostgreSQL.
- [prometheus](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/prometheus): deploys Prometheus and starts up Tyk Pump to push analytics data from the Tyk platform to Prometheus.
  - [prometheus-grafana](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/prometheus-grafana): deploys the Prometheus deployment as well as a Grafana deployment and creates a Grafana dashboard for you to view the analytics.
- [vault](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/vault): deploys Vault Operator and a Vault instance.

If you are running a POC and would like an example of how to integrate a
specific tool, you are welcome to submit a [feature request](https://github.com/TykTechnologies/tyk-k8s-demo/issues/new/choose)

**Example**
```bash
./up.sh \
  --storage postgres \
  --deployments prometheus-grafana,k6-slo-traffic \
  tyk-stack
```

The deployment process takes approximately 10 minutes, as the installation is sequential and some dependencies take 
time to initialize. Once the installation is complete, the script will output a list of all the services that were 
started, along with instructions on how to access them. Afterward, the k6 job will begin running in the background, 
generating traffic for 15 minutes. To monitor live traffic, you can use the credentials provided by the script to 
access Grafana or the Tyk Dashboard

#### Bash Script Usage
<br>

##### Start Tyk deployment
Create and start up the deployments

```bash
Usage:
  ./up.sh [flags] [command]

Available Commands:
  tyk-stack
  tyk-cp
  tyk-dp
  tyk-gateway

Flags:
  -v, --verbose         bool     set log level to debug
      --dry-run         bool     set the execution mode to dry run. This will dump the kubectl and helm commands rather than execute them
  -n, --namespace       string   namespace the tyk stack will be installed in, defaults to 'tyk'
  -f, --flavor          enum     k8s environment flavor. This option can be set 'openshift' and defaults to 'vanilla'
  -e, --expose          enum     set this option to 'port-forward' to expose the services as port-forwards or to 'load-balancer' to expose the services as load balancers or 'ingress' which exposes services as a k8s ingress object
  -r, --redis           enum     the redis mode that tyk stack will use. This option can be set 'redis', 'redis-sentinel' and defaults to 'redis-cluster'
  -s, --storage         enum     database the tyk stack will use. This option can be set 'mongo' (amd only) and defaults to 'postgres'
  -d, --deployments     string   comma separated list of deployments to launch
  -c, --cloud           enum     stand up k8s infrastructure in 'aws', 'gcp' or 'azure'. This will require Terraform and the CLIs associate with the cloud of choice
  -l, --ssl             bool     enable ssl on deployments
```

##### Stop Tyk deployment
Shutdown deployment

```bash
Usage:
  ./down.sh [flags]

Flags:
  -v, --verbose         bool     set log level to debug
  -n, --namespace       string   namespace the tyk stack will be installed in, defaults to 'tyk'
  -p, --ports           bool     disconnect port connections only
  -c, --cloud           enum     tear down k8s cluster stood up
```

**Clusters**
You can get the repository to create demo clusters for you on AWS, GCP, or Azure. That can be set using the `--cloud` flag
and requires the respective cloud CLI to be installed and authorized on your system. You will also need to specify the
`CLUSTER_LOCATION`, `CLUSTER_MACHINE_TYPE`, `CLUSTER_NODE_COUNT`, and `GCP_PROJECT` (for GCP only) parameters in the .env file.

You can find examples of .env files here:
- [AWS](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/clouds/aws/.env.example)
- [GCP](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/clouds/gcp/.env.example)
- [Azure](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/clouds/azure/.env.example)

For more information about cloud CLIs:
- AWS:
  - [aws](https://aws.amazon.com/cli/)
- GCP:
  - [gcloud](https://cloud.google.com/sdk/gcloud)
  - `GOOGLE_APPLICATION_CREDENTIALS` environment variable per [documentation from Google](https://cloud.google.com/docs/authentication/application-default-credentials)
- Azure:
  - [az](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

#### Customization
This repository can also act as a guide to help you get set up with Tyk. If you just want to know how to set up a specific
tool with Tyk, you can run the repository with the `--dry-run` and `--verbose` flags. This will output all the commands that
the repository will run to stand up any installation. This can help debug as well as figure out what
configuration options are required to set these tools up.

Furthermore, you can also add any Tyk environment variables to your `.env` file and those variables will be mapped to
their respective Tyk deployments.

Example:
```env
...
TYK_MDCB_SYNCWORKER_ENABLED=true
TYK_MDCB_SYNCWORKER_HASHKEYS=true
TYK_GW_SLAVEOPTIONS_SYNCHRONISERENABLED=true
```

#### Variables
The script has defaults for minimal settings in [this env file](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/.env.example),
and it will give errors if something is missing.
You can also add or change any Tyk environment variables in the `.env` file,
and they will be mapped to the respective `extraEnvs` section in the helm charts.

| Variable                             |        Default        | Comments                                                                                                        |
|--------------------------------------|:---------------------:|-----------------------------------------------------------------------------------------------------------------|
| DASHBOARD_VERSION                    |        `v5.5`         | Dashboard version                                                                                               |
| GATEWAY_VERSION                      |        `v5.5`         | Gateway version                                                                                                 |
| MDCB_VERSION                         |        `v2.7`         | MDCB version                                                                                                    |
| PUMP_VERSION                         |        `v1.11`        | Pump version                                                                                                    |
| PORTAL_VERSION                       |        `v1.10`        | Portal version                                                                                                  |
| TYK_HELM_CHART_PATH                  |      `tyk-helm`       | Path to charts, can be a local directory or a helm repo                                                         |
| TYK_USERNAME                         | `default@example.com` | Default password for all the services deployed                                                                  |
| TYK_PASSWORD                         |  `topsecretpassword`  | Default password for all the services deployed                                                                  |
| LICENSE                              |                       | Dashboard license                                                                                               |
| MDCB_LICENSE                         |                       | MDCB license                                                                                                    |
| PORTAL_LICENSE                       |                       | Portal license                                                                                                  |
| TYK_WORKER_CONNECTIONSTRING          |                       | MDCB URL for worker connection                                                                                  |
| TYK_WORKER_ORGID                     |                       | Org ID of dashboard user                                                                                        |
| TYK_WORKER_AUTHTOKEN                 |                       | Auth token of dashboard user                                                                                    |
| TYK_WORKER_USESSL                    |        `true`         | Set to `true` when the MDCB is serving on a TLS connection                                                      |
| TYK_WORKER_SHARDING_ENABLED          |        `false`        | Set to `true` to enable API Sharding                                                                            |
| TYK_WORKER_SHARDING_TAGS             |                       | API Gateway segmentation tags                                                                                   |
| TYK_WORKER_GW_PORT                   |        `8081`         | Set the gateway service port to use                                                                             |
| TYK_WORKER_OPERATOR_CONNECTIONSTRING |                       | Set the dashboard URL for the operator to be able to manage APIs and Policies                                   |
| DATADOG_APIKEY                       |                       | Datadog API key                                                                                                 |
| DATADOG_APPKEY                       |                       | Datadog Application key. This is used to create a dashboard and create a pipeline for the Tyk logs              |
| DATADOG_SITE                         |    `datadoghq.com`    | Datadog site. Change to `datadoghq.eu` if using the European site                                               |
| GCP_PROJECT                          |                       | The GCP project for terraform authentication on GCP                                                             |
| CLUSTER_LOCATION                     |                       | Cluster location that will be created on AKS, EKS, or GKE                                                       |
| CLUSTER_MACHINE_TYPE                 |                       | Machine type for the cluster that will be created on AKS, EKS, or GKE                                           |
| CLUSTER_NODE_COUNT                   |                       | Number of nodes for the cluster that will be created on AKS, EKS, or GKE                                        |
| INGRESS_CLASSNAME                    |        `nginx`        | The ingress classname to be used to associate the k8s ingress objects with the ingress controller/load balancer |


### Docker Demo

#### Purpose

With *tyk-demo* repository, using docker-compose, you can set up quickly a **complete** Tyk stack, including
dependencies and integrations.

Minimize the amount of effort needed to start up the Tyk infrastructure and show end-to-end complete examples of how to set up various capabilities in Tyk as well as different integrations.

#### Key Features

- Full Tyk stack deployment
- Pre-configured demo APIs
- Analytics and monitoring tools
- Integration with common third-party services

Watch the video *What Is Tyk Demo* for an overview and learn about the key features from our experts -

{{< youtube-seo id="MqVPyWg1YZM" title="Overview of Tyk Demo and its features" >}}

#### Prerequisites

1. Docker compose
Make sure you have [docker compose](https://docs.docker.com/compose/install/) and that docker is running on your machine.

2. License key
This Demo deploys and runs the full Tyk platform which is a licensed product. Please sign up using the button below, to obtain a license key. In the link, choose "Get in touch" to get a guided evaluation of the Tyk Dashboard and receive your temporary license. 

{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Get started" >}}

#### Quick Start

The following steps will enable you to quickly get started:

1. **Clone the repository**:
```bash
git clone https://github.com/TykTechnologies/tyk-demo.git
```

2. **Navigate to the directory**:
```bash
cd tyk-demo
```

3. **Add license key to .env file**:
```bash
DASHBOARD_LICENCE=<your license key>
```

4. **Run the setup script**:
```bash
./up.sh
```

5. **Access Tyk Dashboard**:  [http://localhost:3000](http://localhost:3000)

To complete the instruction above we have a tutorial video of tyk demo that covers:
- Downloading and starting tyk-demo
- Setting up your license
- Logging in to Tyk Dashboard

{{< youtube-seo id="bm0XZGYJa0w" title="Step-by-step guide to spin up Tyk Demo" >}}


### Docker Compose Setup

#### Who is this page for?
This is the guide we recommend for a easy quick start. The instructions are the ones shared with you when you register to a [free trial](https://tyk.io/sign-up/).

You can also use this guide for your PoC since it spins up a full Tyk Self Managed stack for you using our project *Docker Pro Demo*, however, if you are interested in learning Tyk, there's an option for [Tyk Demo]({{< ref "tyk-self-managed#explore-demos-and-proof-of-concepts" >}}) which is a project that spins up full Tyk stack that includes a prepopulate API definitions of all kinds, with various middleware options and can also spin up supporting tools such as Prometheus, Keycloak (IDP) etc.

#### What's included?
The *Tyk Pro Docker Demo* is our [Self-Managed]({{< ref "tyk-self-managed" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**

This demo is NOT intended for production use or performance testing, since it uses docker compose and the configuration files are not specifically tuned for performance testing or high loads. Please visit the [Planning for Production]({{< ref "tyk-self-managed#planning-for-production" >}}) page to learn how to configure settings for optimal performance.

{{< /warning >}}
{{< note success >}}
**Note**  

The Tyk Pro Docker demo does not provide access to the [Developer Portal]({{< ref "portal/overview/intro" >}}).
{{< /note >}}

#### Prerequisites

* Our [Tyk Pro Docker demo on GitHub](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A Tyk Pro [trial license](https://tyk.io/sign-up/)

#### Steps for Installation

1. **Clone the GitHub repo**

Clone the Docker demo repo from GitHub to a location on your machine.

2. **Edit your hosts file**

You need to add the following to your hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

3. **Add your developer license**

From your installation folder:

Create an `.env` file - `cp .env.example .env.` Then add your license string to `TYK_DB_LICENSEKEY`.

4. **Initialise the Docker containers**

**With MongoDB**

Run the following command from your installation folder:

```docker
docker-compose up
```

**With PostgreSQL**

Run the following command from your installation folder:

```docker
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml up
```

This will will download and setup the five Docker containers. This may take some time and will run in non-daemonised mode so you can see all the output.

5. **Bootstrap the Tyk installation**

Go to [http://localhost:3000](http://localhost:3000) in your browser. You will be presented with the Bootstrap UI to create your first organization and admin user.

{{< img src="/img/dashboard/system-management/tyk-bootstrap.png" alt="Tyk Bootstrap sceen" width="768">}}


6. **Create your organization and default user**

You need to enter the following:

* Your **Organization Name**
* Your **Organization Slug**
* Your User **Email Address**
* Your User **First and Last Name**
* A **Password** for your User
* **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}


Click **Bootstrap** to save the details.

7. **log in to the Tyk Dashboard**

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard
Setup screen.

#### Removing the demo installation

To delete all containers as well as remove all volumes from your host:

**With MongoDB**

```bash
docker-compose down -v
```
**With PostgreSQL:**

```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml down -v
```

### Using Windows

#### Tyk Pro on Windows using Docker Desktop

The Tyk Pro Docker demo is our full [On-Premises](https://tyk.io/api-gateway/on-premise/) Pro solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed Pro on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing. 
{{< /warning >}}

{{< note success >}}
**Note**  

You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.
{{< /note >}}

**Prerequisites**

- MS Windows 10 Pro
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- Git for Windows
- PowerShell running as administrator
- Postman for [Windows](https://www.getpostman.com/downloads/)
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk Self-Managed [Developer license](https://tyk.io/sign-up/)

**Step 1 - Clone the Repo**

Clone the repo above to a location on your machine.

**Step 2 - Edit your hosts file**

You need to add the following to your Windows hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

**Step 3 - Add your Developer License**

You should have received your free developer license via email. Copy the license key in the following location from your `\confs\tyk_analytics.conf` file:

```yaml
{
  ...
  "license_key": "<LICENSE-KEY>"
  ...
}
```

**Step 4 - Run the Docker Compose File**

From PowerShell, run the following command from your installation folder:

```bash
docker-compose up
```

This will will download and setup the five Docker containers. This may take some time and will display all output.

**Step 5 - Test the Tyk Dashboard URL**

Go to:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

**Step 6 - Create your Organization and Default User**

You need to enter the following:

- Your **Organization Name**
- Your **Organization Slug**
- Your User **Email Address**
- Your User **First and Last Name**
- A **Password** for your User
- **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}

Click **Bootstrap** to save the details.

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

**Step 7 - Set up a Portal Catalog**

This creates a portal catalog for your developer portal. For the `Authorization` Header, the Value you need to enter is the `access_key` value from the create user request. In the body add the `org_id` value created in **Step One**.

- **Request**: POST
- **URL**: `127.0.0.1:3000/api/portal/catalogue`
- **Header**: Key `Authorzation` Value `SECRET_VALUE`
- **Body** (raw set to application/json):

*Sample Request*

```json
{ "org_id": "5d07b4b0661ea80001b3d40d" }
```

*Sample Response*

```json
{
  "Status": "OK",
  "Message": "5d07b4b0661ea80001b3d40d",
  "Meta": null
}
```

**Step 8 - Create your default Portal Pages**

This creates the default home page for your developer portal. For the `Authorization` Header, the Value you need to enter is the `access_key` value from the create user request.

- **Request**: POST
- **URL**: `127.0.0.1:3000/api/portal/catalogue`
- **Header**: Key `Authorzation` Value `SECRET_VALUE`
- **Body** (raw set to application/json):

*Sample Request*

```json
{
  "fields": {
    "JumboCTALink": "#cta",
    "JumboCTALinkTitle": "Your awesome APIs, hosted with Tyk!",
    "JumboCTATitle": "Tyk Developer Portal",
    "PanelOneContent": "Panel 1 content.",
    "PanelOneLink": "#panel1",
    "PanelOneLinkTitle": "Panel 1 Button",
    "PanelOneTitle": "Panel 1 Title",
    "PanelThereeContent": "",
    "PanelThreeContent": "Panel 3 content.",
    "PanelThreeLink": "#panel3",
    "PanelThreeLinkTitle": "Panel 3 Button",
    "PanelThreeTitle": "Panel 3 Title",
    "PanelTwoContent": "Panel 2 content.",
    "PanelTwoLink": "#panel2",
    "PanelTwoLinkTitle": "Panel 2 Button",
    "PanelTwoTitle": "Panel 2 Title",
    "SubHeading": "Sub Header"
  },
  "is_homepage": true,
  "slug": "home",
  "template_name": "",
  "title": "Tyk Developer Portal"
}
```

*Sample Response*

```json
{
  "Status": "OK",
  "Message": "5d07b4b0661ea80001b3d40d",
  "Meta": null
}
```

**Step 9 - Setup the Portal URL**

This creates the developer portal URL. For the `Authorization` Header, the Value you need to enter is the `secret` value from your `/confs/tyk_analytics.conf`.

- **Request**: POST
- **URL**: `127.0.0.1:3000/api/portal/configuration`
- **Header**: Key `Authorzation` Value `SECRET_VALUE`
- **Body** (raw set to application/json):

*Sample Request*

```yaml
{SECRET_VALUE}
```

*Sample Response*

```json
{
  "Status": "OK",
  "Message": "5d07b4b0661ea80001b3d40d",
  "Meta": null
}
```

#### Tyk Pro on Windows using WSL

The Tyk Pro Docker demo is our full [Self-Managed]({{< ref "#docker-demo" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**  

This demo is NOT designed for production use or performance testing. 
{{< /warning >}}

{{< note success >}}
**Note**  

You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.
{{< /note >}}


**Prerequisites**

- MS Windows 10 Pro with [Windows Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) enabled
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- Git for Windows
- PowerShell running as administrator
- Postman for [Windows](https://www.getpostman.com/downloads/)
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk Self-Managed [Developer license](https://tyk.io/sign-up/)
- Optional: Ubuntu on Windows

**Step 1 - Clone the Repo**

Clone the repo above to a location on your machine.

**Step 2 - Edit your hosts file**

You need to add the following to your Windows hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

**Step 3 - Configure file permissions**
In order to mount the files, you need to allow Docker engine has access to your Drive. 
You can do that by going to the Docker settings, Shared Drives view, and manage the access. 
If after all you will get issue regarding path permissions, you will need to create a separate user specifically for the docker according to this instructions https://github.com/docker/for-win/issues/3385#issuecomment-571267988


**Step 4 - Add your Developer License**

You should have received your free developer license via email. Copy the license key in the following location from your `\confs\tyk_analytics.conf` file:

```
"license_key": ""
```

**Step 5 - Run the Docker Compose File**

From PowerShell, run the following command from your installation folder:

```console
docker-compose up
```

This will will download and setup the five Docker containers. This may take some time and will display all output.

**NOTE**
If you are getting issues related to errors when mounting files, you may need to modify 
`docker-compose.yml` file, and change configs paths from related to absolute, and from linux format to windows format, like this:
```
volumes:
  - C:\Tyk\confs\tyk_analytics.conf:/opt/tyk-dashboard/tyk_analytics.conf
```

**Step 6 - Got to the Dashboard URL**

Go to:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

**Step 7 - Create your Organization and Default User**

You need to enter the following:

- Your **Organization Name**
- Your **Organization Slug**
- Your User **Email Address**
- Your User **First and Last Name**
- A **Password** for your User
- **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}

Click **Bootstrap** to save the details.

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

**Configure your Developer Portal**

To set up your [Developer Portal]({{< ref "tyk-developer-portal" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "getting-started/tutorials/publish-api" >}}).

## Planning for Production
### Ensure High Availability

Ensuring high availability is essential for delivering a reliable API experience, especially when maintaining service level agreements (SLAs) for your clients. Whether it involves limiting round-trip times, guaranteeing timely responses, creating self-healing architectures, or isolating failing services, high availability measures ensure that your infrastructure remains resilient under pressure.

Tyk provides a comprehensive suite of features to help you achieve these goals. Circuit breakers allow you to detect and mitigate failures before they cascade, while enforced timeouts ensure that slow requests do not compromise overall system performance. With tailored configurations for both OAS and Classic deployments, Tyk empowers you to build robust, fail-safe API environments that prioritize uptime and enforce SLA requirements.

## Manage Multi-Environment and Distributed Setups

### Store Configuration with Key-Value Store
#### Using external Key Value storage with Tyk


With Tyk Gateway you can store configuration data (typically authentication secrets or upstream server locations) in Key-Value (KV) systems such as [Vault]({{< ref "#vault" >}}), and [Consul]({{< ref "#consul" >}}) and then reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway.

#### When to use external Key-Value storage

##### Simplify migration of APIs between environments

Easily manage and update secrets and other configuration across multiple environments (e.g., development, staging, production) without modifying the configuration files.

##### Ensure separation of concerns

Securely store sensitive information like API keys, passwords, and certificates in a centralised location. Not everybody needs access to these secrets: authorized people can maintain them and just pass along the reference used to access them from the KV store.

##### Support per-machine variables

Storing local settings within the Tyk Gateway's configuration file allows you to have per instance variables, such as a machine ID, and inject these into API requests and responses using [transformation middleware]({{< ref "api-management/traffic-transformation" >}}).

#### How external Key-Value storage works

There are two parts to external Key-Value storage - the KV store and the Tyk configuration object (API definition or Tyk Gateway config file).

1. The key-value data that you wish to reference should be added to the storage
2. References should be included within the Tyk configuration object that identify the location (KV store) and Key
3. When Tyk Gateway initialises it will resolve any external KV references in its configuration, retrieving and applying the values from those references
4. When Tyk Gateway loads (or reloads) APIs it will resolve any external KV references in the API definitions, retrieving and applying the values from those references

Most Key-Value references are only retrieved when the configuration object (Gateway or API) is loaded, as explained above: changes to the externally stored value will not be detected until a subsequent gateway hot-reload.

The exception to this is for specific [transformation middleware]({{< ref "#store-configuration-with-key-value-store" >}}) where the value will be retrieved for each call to the API, during the processing of the API request or response.

{{< note success >}}
**Note**  

If Tyk Gateway cannot communicate with the KV store, it will log an error and will treat the referenced key value as empty, continuing to load the Gateway or API, or to process the transformation middleware as appropriate.
{{< /note >}}

#### Supported storage options

Tyk Gateway supports the following locations for storage of key-value data, providing flexibility to choose the most suitable approach for your deployment and the data you are storing:

##### Consul

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centers.
- to retrieve the value assigned to a `KEY` in Consul you will use `consul://KEY` or `$secret_consul.KEY` notation depending on the [location]({{< ref "#store-configuration-with-key-value-store" >}}) of the reference

##### Vault

[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.
- to retrieve the value assigned to a `KEY` in Vault you will use `vault://KEY` or `$secret_vault.KEY` notation depending on the [location]({{< ref "#store-configuration-with-key-value-store" >}}) of the reference

**Tyk Gateway config file**

The `secrets` section in the [Tyk Gateway configuration file]({{< ref "tyk-oss-gateway/configuration#secrets" >}}) allows you to store settings that are specific to a single Tyk Gateway instance. This is useful for storing instance-specific configuration to be injected into API middleware or if you prefer using configuration files.
- to retrieve the value assigned to a `KEY` in the `secrets` config you will use `secrets://KEY` or `$secret_conf.KEY` notation depending on the [location]({{< ref "#store-configuration-with-key-value-store" >}}) of the reference

**Environment variables**

Tyk Gateway can access data declared in environment variables. This is a simple and straightforward way to manage secrets, especially in containerised environments like Docker or Kubernetes.
- if you want to set the local "secrets" section (equivalent to the `secrets` section in the [Gateway config file]({{< ref "#store-configuration-with-key-value-store" >}})) using environment variables, you should use the following notation: `TYK_GW_SECRETS=key:value,key2:value2`
- if you’re using a different key value secret store not explicitly supported by Tyk but can map it to `TYK_GW_SECRETS`
then this will allow you to access those KV data
- to retrieve the value assigned to an environment variable `VAR_NAME` you will use `env://VAR_NAME` or `$secret_env.VAR_NAME` notation depending on the [location]({{< ref "#store-configuration-with-key-value-store" >}}) of the reference

#### How to access the externally stored data

You can configure Tyk Gateway to retrieve values from KV stores in the following places:
- Tyk Gateway configuration file (`tyk.conf`)
- API definitions

{{< note success >}}
**Note**  

You can use keys from different KV stores (e.g. Consul and environment variables) in the same configuration object (Gateway config or API definition).
{{< /note >}}

##### From the Tyk Gateway configuration file

In Tyk Gateway's configuration file (`tyk.conf`), you can retrieve values from KV stores for the following [fields]({{< ref "tyk-oss-gateway/configuration" >}}):
- `secret`
- `node_secret`
- `storage.password`
- `cache_storage.password`
- `security.private_certificate_encoding_secret`
- `db_app_conf_options.connection_string`
- `policies.policy_connection_string`
- `slave_options.api_key`

To reference the *Value* assigned to a *Key* in one of the KV stores from the Gateway configuration file use the following notation:
- Consul: `consul://path/to/key`
- Vault: `vault://path/to/secret.key`
- `tyk.conf` secrets: `secrets://key`
- Environment variables: `env://key`

For example, if you create a Key-Value pair in [Vault]({{< ref "#vault" >}}) with the *key* `shared-secret` in *secret* `gateway-dashboard` within directory `tyk-secrets/` then you could use the *Value* as the `node_secret` in your Gateway config by including the following in your `tyk.conf` file:
``` .json
{
  "node_secret":"vault://tyk-secrets/gateway-dashboard.shared-secret"
}
```
When the Gateway starts, Tyk will read the *Value* from Vault and use this as the `node_secret`, which is used to [secure connection to the Tyk Dashboard]({{< ref "tyk-oss-gateway/configuration#node_secret" >}}).

Note that all of these references are read (and replaced with the values read from the KV location) on Gateway start when loading the `tyk.conf` file.

##### From API Definitions

From Tyk Gateway v5.3.0 onwards, you can store [any string field]({{< ref "#store-configuration-with-key-value-store" >}}) from the API definition in any of the supported KV storage options; for earlier versions of Tyk Gateway only the [Target URL and Listen Path]({{< ref "#store-configuration-with-key-value-store" >}}) fields and [certain transformation middleware]({{< ref "#store-configuration-with-key-value-store" >}}) configurations were supported. 

**Target URL and Listen Path**

To reference the *Value* assigned to a *Key* in one of the KV stores for **Target URL** or **Listen Path** use the following notation:
- Consul: `consul://path/to/key`
- Vault: `vault://path/to/secret.key`
- Tyk config secrets: `secrets://key`
- Environment variables: `env://key`

These references are read (and replaced with the values read from the KV location) when the API is loaded to the Gateway (either when Gateway restarts or when there is a hot-reload).

For example, if you define an environment variable (*Key*) `UPSTREAM_SERVER_URL` with the *Value* `http://httpbin.org/` then within your API definition you could use the *Value* for the Target URL for your Tyk OAS API as follows:
```json
{
  "x-tyk-api-gateway": {
    "upstream": {
      "url": "env://UPSTREAM_SERVER_URL"
    }
  }
}
```

When the Gateway starts, Tyk will read the *Value* from the environment variable and use this as the [Target URL]({{< ref "api-management/gateway-config-tyk-oas#upstream" >}}).

{{< note success >}}
**Note** 

Prior to Tyk Gateway v5.3.0, **environment variables** used for the Target URL or Listen Path had to be named `TYK_SECRET_{KEY_NAME}`. They were referred to in the API definition using `env://{KEY_NAME}` excluding the `TYK_SECRET_` prefix.
<br><br>
From v5.3.0 onward, environment variables can have any `KEY_NAME`, and the full name should be provided in the API definition reference. The pre-v5.3.0 naming convention is still supported for backward compatibility, but only for these two fields.

{{< /note >}}

###### Transformation middleware

Key-value references can be included in the following middleware, with the values retrieved dynamically when the middleware is called (during processing of an API request or response):
- [request body transform]({{< ref "api-management/traffic-transformation/request-body" >}})
- [request header transform]({{< ref "api-management/traffic-transformation/request-headers" >}})
- [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}})
- [response body transform]({{< ref "api-management/traffic-transformation/response-body" >}})
- [response header transform]({{< ref "api-management/traffic-transformation/response-headers" >}})

To reference the *Value* assigned to a *Key* in one of the KV stores from these middleware use the following notation:
- Consul: `$secret_consul.key`
- Vault: `$secret_vault.key`
- Tyk config secrets: `$secret_conf.key`
- Environment variables: `$secret_env.key` or `env://key` (see [here]({{< ref "#store-configuration-with-key-value-store" >}}))

This notation is used to avoid ambiguity in the middleware parsing (for example where a KV secret is used in a URL rewrite path).

For example, if you create a Key-Value pair in Consul with the *Key* `user_id` then you could use the *Value* in the `rewriteTo` upstream address in the URL rewrite middleware for your Tyk OAS API by including the following in your API definition:
```json
{
  "x-tyk-api-gateway": {
      "middleware": {
          "operations": {
              "anythingget": {
                  "urlRewrite": {
                      "enabled": true,
                      "pattern": ".*",
                      "rewriteTo": "/api/v1/users/$secret_consul.user_id",
                  }
              }
          }
      }
  }
}
```

When a call is made to `GET /anything`, Tyk will retrieve the *Value* assigned to the `user_id` *Key* in Consul and rewrite the Target URL for the request to `/api/v1/users/{user_id}`.

These references are read (and replaced with the values read from the KV location) during the processing of the API request or response.

**Using environment variables with transformation middleware**

There are some subtleties with the use of environment variables as KV storage for the transformation middleware.

- **Request and Response Body Transforms** support only the `$secret_env.{KEY_NAME}` format.
- **Request and Response Header Transforms** support both `env://{KEY_NAME}` and `$secret_env.{KEY_NAME}` formats.
- **URL Rewrite** supports the `env://{KEY_NAME}` format for both the `pattern` and `rewriteTo` fields. The `rewriteTo` field also supports `$secret_env.{KEY_NAME}` format.

{{< note success >}}
**Notes**  

Due to the way that Tyk Gateway processes the API definition, when you use transformation middleware with the `$secret_env` format, it expects the environment variable to be named `TYK_SECRET_{KEY_NAME}` and to be referenced from the API definition using `$secret_env.{KEY_NAME}`.
<br><br>
For example, if you create a Gateway environment variable `TYK_SECRET_NEW_UPSTREAM=http://new.upstream.com`, then in a request body transform middleware, you would reference it as follows:

```json
{
  "custom_url": "$secret_env.NEW_UPSTREAM"
}
```

To configure the URL rewrite `rewriteTo` field using this variable you could use either:

````json
{
  "rewriteTo": "env://TYK_SECRET_NEW_UPSTREAM"
}
````
or
````json
{
  "rewriteTo": "$secret_env.NEW_UPSTREAM"
}
````
{{< /note >}}

**Other `string` fields**

To reference the *Value* assigned to a *Key* in one of the KV stores from the API Definition use the following notation:
- Consul: `consul://key`
- Vault: `vault://secret.key`
- Tyk config secrets: `secrets://key`
- Environment variables: `env://key`

These references are read (and replaced with the values read from the KV location) when the API is loaded to the Gateway (either when Gateway restarts or when there is a hot-reload).

{{< note success >}}
**Notes**  

When accessing KV references from the `/tyk-apis` directory on Consul or Vault, you should not provide the `path/to/` the key except for Target URL and Listen Path (as described [above]({{< ref "#store-configuration-with-key-value-store" >}})).
{{< /note >}}

For example, if you create a Key-Value pair in the `secrets` section of the `tyk.conf` file with the *Key* `auth_header_name`:
```json
{
  "secrets": {
    "auth_header_name": "Authorization"
  }
}
```

Then within your API definition you could use the *Value* for the authentication header name as follows:
```json
{
  "x-tyk-api-gateway": {
    "components": {
      "securitySchemes": {
        "authToken": {
          "type": "apiKey",
          "in": "header",
          "name": "secrets://auth_header_name"
        }
      }
    }
  }
}
```

When the Gateway starts, Tyk will read the *Value* from the `secrets` section in the Gateway config file and use this to identify the header where Tyk Gateway should look for the [Authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication" >}}) token in requests to your Tyk OAS API.

#### Using Consul as a KV store

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value (KV) store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centers.

##### How to configure Tyk to access Consul

Configuring Tyk Gateway to read values from Consul is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

```json
{
    "kv": {
        "consul": {
            "address": "localhost:8025",
            "scheme": "http",
            "datacenter": "dc-1",
            "http_auth": {
                "username": "",
                "password": ""
            },
            "wait_time": 10,
            "token": "",
            "tls_config": {
                "address": "",
                "ca_path": "",
                "ca_file": "",
                "cert_file": "",
                "key_file": "",
                "insecure_skip_verify": false
            }
        }
    }
}
```

| Key        | Description                                                                                                 |
|------------|-------------------------------------------------------------------------------------------------------------|
| address    | The location of the Consul server                                                                           |
| scheme     | The URI scheme for the Consul server, e.g. `http`                                                          |
| datacenter | Consul datacenter (agent) identifier                                                                       |
| http_auth  | Username and password for Tyk to log into Consul using HTTP Basic Auth (if required by your Consul service) |
| wait_time  | Limits how long a [watch will block](https://developer.hashicorp.com/consul/api-docs/features/blocking) in milliseconds (if enabled in your Consul service) |
| token      | Used to provide a per-request access token to Consul (if required by your Consul service)                   |
| tls_config | Configuration for TLS connection to Consul (if enabled in your Consul service)                              |

Alternatively, you can configure it using the equivalent [environment variables]({{< ref "tyk-oss-gateway/configuration#kvconsuladdress" >}}).

##### Where to store data in Consul

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your KV pairs wherever you like within the Consul KV store. You can provide the Consul path to the key in the reference using the notation appropriate to the calling [location]({{< ref "#consul" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Consul KV store and store all keys in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in `tyk-apis` in Consul, you would reference this from the API definition using `consul://foo`.

##### How to access data stored in Consul

The notation used to refer to a KV pair stored in Consul depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "#store-configuration-with-key-value-store" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Consul using the following notation:
- `consul://path/to/KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Consul KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Consul by providing the directory path within Consul KV using the following notation:
- `consul://path/to/KEY`

For [certain transformation middleware]({{< ref "#store-configuration-with-key-value-store" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Consul:
- `$secret_consul.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Consul KV store. You can retrieve these values from Consul, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `consul://KEY`


#### Using Vault as a KV store


[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.

##### How to configure Tyk to access Vault

Configuring Tyk Gateway to read values from Vault is straightforward - you simply configure the connection in your Tyk Gateway config file (`tyk.conf`) by adding the `kv` section as follows:

```json
{
    "kv": {
        "vault": {
            "address": "http://localhost:1023",
            "agent_address": "",
            "max_retries": 3,
            "timeout": 30,
            "token": "",
            "kv_version": 2
        }
    }
}
```

| Key          | Description                                                                                            |
|--------------|--------------------------------------------------------------------------------------------------------|
| address      | The address of the Vault server, which must be a complete URL such as `http://www.vault.example.com`   |
| agent_address | The address of the local Vault agent, if different from the Vault server, must be a complete URL       |
| max_retries  | The maximum number of attempts Tyk will make to retrieve the value if Vault returns an error           |
| timeout      | The maximum time that Tyk will wait for a response from Vault (in nanoseconds, if set to 0 (default) will be interpreted as 60 seconds)                                         |
| token        | The Vault root access token                                                                            |
| kv_version   | The version number of Vault, usually defaults to 2                                                     |

Alternatively, you can configure it using the equivalent [environment variables]({{< ref "tyk-oss-gateway/configuration#kvvaulttoken" >}}).

##### How key-value data is stored in Vault

In traditional systems secrets are typically stored individually, each with their own unique key. Vault, however, allows for a more flexible approach where multiple *keys* can be grouped together and stored under a single *secret*. This grouping allows for better organization and management of related secrets, making it easier to retrieve and manage them collectively.

When retrieving data from Vault, you use the dot notation (`secret.key`) to access the *value* from a specific *key* within a *secret*.

**Example of storing key value data in Vault**

If you want to store a *secret* named `tyk` with a *key* `gw` and *value* `123` in Vault then, from the command line, you would:
1. Enable the `kv` secrets engine in Vault under the path `my-secret` using:  
   `vault secrets enable -version=2 -path=my-secret kv`  
2. Create a secret `tyk` with the key `gw` and value `123` in Vault:  
   `vault kv put my-secret/tyk gw=123` 

To retrieve the secret from Vault using the command line you would use the following command (there is no need to append `/data` to the secret path):
```curl
curl \
  --header "X-Vault-Token: <your_vault_token>" \
  --request GET \
  https://vault-server.example.com/v1/my-secret/tyk?lease=true
```

This would return a response along these lines, note that the response contains all the keys stored in the secret (here there are also keys called `excited` and `foo`):
```yaml
{
   "request_id": "0c7e44e1-b71d-2102-5349-b5c60c13fb02",
   "lease_id": "",
   "lease_duration": 0,
   "renewable": false,
   "data": {
      "gw": "123",
      "excited": "yes",
      "foo": "world",
   },
   "metadata":{
      "created_time": "2019-08-28T14:18:44.477126Z",
      "deletion_time": "",
      "destroyed": false,
      "version": 1
   },
   "auth": ...
}
```

As explained [below]({{< ref "#vault" >}}), you could retrieve this value from within your Tyk Gateway config file using: 
   `TYK_GW_SECRET=vault://my-secret/tyk.gw`

##### Where to store data in Vault

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your Vault *secrets* wherever you like within the KV store. You can provide the Vault path to the key in the reference using the notation appropriate to the calling [location]({{< ref "#vault" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Vault KV store and store all *secrets* in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in a secret named `my-secret` in `/tyk-apis` in Vault, you would reference this from the API definition using `vault://my-secret.foo`.

##### How to access data stored in Vault

The notation used to refer to a key-value pair stored in Vault depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "#store-configuration-with-key-value-store" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Vault using the following notation:
- `vault://path/to/secret.KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Vault KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Vault by providing the directory path within Consul KV using the following notation:
- `vault://path/to/secret.KEY`

For [certain transformation middleware]({{< ref "#store-configuration-with-key-value-store" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Vault:
- `$secret_vault.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Vault KV store. You can retrieve these values from Vault, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `vault://KEY`
