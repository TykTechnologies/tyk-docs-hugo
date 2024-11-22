---
title: "Migration to Tyk"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk"
tags: ["Migration"]
aliases:
  - /apim/open-source/getting-started
  - /tyk-on-premises/on-ubuntu
  - /tyk-oss/ce-ubuntu
  - /tyk-oss/ce-centos
  - /tyk-oss/ce-redhat
  - /tyk-configuration-reference/redis-cluster-sentinel
  - /tyk-configuration-reference/import-apis
  - /getting-started/installation/with-tyk-multi-cloud/create-an-account
  - /tyk-cloud/create-account
  - /tyk-cloud/setup-org
  - /tyk-cloud/setup-team
  - /tyk-cloud/create-environment
  - /tyk-cloud/first-api
  - /tyk-cloud/test-api
  - /tyk-cloud/view-analytics
  - /tyk-cloud/what-we-covered
  - /tyk-cloud/environments-&-deployments
  - /tyk-cloud/configuration-options
  - /tyk-cloud/environments-&-deployments/managing-organisations
  - tyk-cloud/environments-&-deployments/managing-environments
  - /tyk-cloud/environments-deployments/managing-environments
  - /tyk-cloud/environments-deployments/managing-control-planes
  - /tyk-cloud/environments-&-deployments/managing-control-planes
  - /tyk-cloud/environments-&-deployments/managing-gateways
  - tyk-cloud/environments-&-deployments/managing-apis
  - /tyk-cloud/environments-deployments/managing-apis
  - /tyk-cloud/environments-&-deployments/hybrid-gateways
  - /tyk-cloud/environments--deployments/hybrid-gateways
  - /deployment-and-operations/tyk-open-source-api-gateway/setup-multiple-gateways
  - /frequently-asked-questions/custom-domain-for-portal-cloud-multi-cloud
  - /tyk-cloud/environments-deployments/monitoring
  - /tyk-cloud/environments-&-deployments/monitoring
  - /tyk-cloud/environments-deployments/monitoring
  - /tyk-cloud/environments-&-deployments/monitoring
  - /tyk-cloud/teams-&-users
  - /tyk-cloud/teams-users
  - tyk-cloud/teams-&-users/managing-teams
  - /tyk-cloud/teams-users/managing-teams
  - tyk-cloud/teams-&-users/managing-users
  - /tyk-cloud/teams-users/managing-users
  - /tyk-cloud/reference-docs/user-roles
  - /tyk-cloud/teams-&-users/user-roles
  - /tyk-cloud/teams-users/user-roles
  - /tyk-cloud/account-and-billing/our-plans
  - /tyk-cloud/account-&-billing/plans
  - /tyk-cloud/account--billing/plans
  - /tyk-cloud/account-and-billing/add-payment-method
  - /tyk-cloud/account-and-billing/upgrade-free-trial
  - /tyk-cloud/account-billing/managing-billing-admins
  - /tyk-cloud/account-and-billing/retirement
  - /tyk-cloud/account--billing/retirement
  - /python-custom-auth-plugin/setup-control-plane
  - /python-custom-auth-plugin/uploading-bundle
  - /python-custom-auth-plugin/api-middleware-test
  - /python-custom-auth-plugin/python-code-bundle
  - /using-plugins/python-custom-auth-plugin
  - getting-started/licensing
  - /getting-started/installation/with-tyk-on-premises/kubernetes
  - /tyk-on-premises/kubernetes
  - /getting-started/installation/with-tyk-on-premises/kubernetes/tyk-kubernetes-ingress-controller
  - /tyk-on-prem/kubernetes-ingress
  - /tyk-oss/ce-kubernetes-ingress
  - /getting-started/installation/with-tyk-on-premises/kubernetes/k8s-docker-pro-wsl
  - /tyk-api-gateway-v-2-0/installation-options-setup/install-tyk-pro-edition-on-red-hat
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos
  - /get-started/with-tyk-on-premise/installation/redhat-rhel-centos/dashboard
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/dashboard
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/analytics-pump
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/gateway
  - /tyk-api-gateway-v1-9/setup/install-tyk-on-ubuntu
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu
  - /getting-started/installation/tyk-on-premises/on-ubuntu
  - /tyk-on-premises/debian-ubuntu
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/dashboard
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/dashboard
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/analytics-pump
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/analytics-pump
  - /get-started/with-tyk-on-premise/installation/on-ubuntu/gateway
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/gateway
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/gateway
  - /get-started/with-tyk-multi-cloud/tutorials/installation-on-aws
  - /get-started/with-tyk-on-premise/installation/on-aws
  - /getting-started/installation/with-tyk-multi-cloud/installation-on-aws
  - /getting-started/with-tyk-on-premises/installation/on-aws
  - /tyk-on-premises/installation/on-aws
  - /tyk-on-premises/aws
  - /getting-started/with-tyk-on-premises/installation/on-aws/ec2
  - /getting-started/installation/with-tyk-on-premises/bootstrapper-cli
  - /get-started/with-tyk-on-premise/installation/docker
  - /get-started/with-tyk-on-premise/installation/docker/docker-quickstart
  - /getting-started/installation/with-tyk-on-premises/docker
  - /getting-started/with-tyk-on-premises/installation/on-heroku
  - /tyk-on-premises/installation/on-heroku
  - /tyk-on-premises/heroku
  - /getting-started/installation/with-tyk-on-premises/install-tyk-microsoft-azure
  - /getting-started/installation/with-tyk-on-premises/install-tyk-google-cloud
  - /analyse/redis-mongodb-sizing
  - /analytics-and-reporting/redis-mongodb-sizing
  - /planning-for-production/redis-mongodb
  - /planning-for-production/redis-mongodb-sizing
  - /analytics-and-reporting/redis-mongodb-sizing
  - /analyse/redis-mongodb-sizing
  - /planning-for-production/database-settings/sql
  - /ensure-high-availability/circuit-breakers
  - /tyk-rest-api/health-checking
  - /ensure-high-availability/load-balancing
  - /tyk-stack/tyk-gateway/kv-store
  - /tyk-configuration-reference/mdcb-configuration-options
  - /getting-started/tyk-components/mdcb
  - /tyk-multi-data-centre/setup-master-data-centre
  - /tyk-multi-data-centre/setup-slave-data-centres
  - /get-started/with-tyk-hybrid
---

Transitioning to Tyk’s API management platform is a strategic step toward optimizing your API infrastructure. Whether you're exploring Tyk for the first time or scaling your current environment, this guide simplifies the migration process for both Tyk Open Source and Tyk Cloud.

You'll find step-by-step instructions for deploying Tyk in various environments—Docker, Kubernetes, and more—as well as strategies for managing APIs, teams, and billing. Learn how to integrate seamlessly with Tyk Cloud’s advanced capabilities, such as hybrid gateways, custom domains, and analytics.

Whether you're running self-managed setups or moving to the cloud, this guide empowers you to configure Tyk to meet your specific needs, ensuring a smooth transition with minimal downtime. Explore best practices, deployment options, and production-ready configurations to harness the full potential of Tyk.

## Overview 

### Best Practices 

  In today's digital landscape, the efficient and secure exchange of data and functionality between applications is crucial for business growth. API Management serves as the backbone of digital ecosystems, enhancing security and operational efficiency to secure digital assets and streamline operations.

#### Security: Safeguarding Your Digital Assets

APIs are the gateways that allow information to flow between applications, partners and customers. While APIs offer unparalleled opportunities, they also bring security concerns. API Management offers crucial security measures to protect businesses:

- Authentication and Authorization
- Encryption
- Rate Limiting
- API Key Management

#### Operations: Streamlining API Creation and Deployment

API Management isn't just about security; it also streamlines the creation and deployment of APIs, ensuring they operate seamlessly:

- Portals to to simplify API creation, documentation and management
- Version Control
- Scalability
- Monitoring and Analytics
- Documentation

In conclusion, API Management is the cornerstone of modern business success, enhancing both security and operational efficiency. By securing digital assets and streamlining the processes of creating and deploying APIs, API Management paves the way for innovation, growth and seamless connectivity in the digital era. Embracing API Management is not just a strategic decision; it's an imperative one for businesses looking to thrive in today's interconnected world.

The aim of this is to evolve with content that targets best practices for API management, targeting security and operations.

### Tyk Open Source

Open source is at the heart of what we do. Anything that is API Gateway-related, lives in the Gateway, or is critical for the Gateway to work is open and freely available via our [Github](https://github.com/TykTechnologies/).

Our commitment to open source also delivers a host of benefits for our users: signup for free with Tyk, receive securely packaged open source packages, getting started guides, access to our community and all of the latest open source information.

If you are new to Tyk API Gateway or just want to quickly take it for a spin in just 3 steps, head over to our [quick start guide]({{< ref "deployment-and-operations/tyk-open-source-api-gateway/quick-start" >}}). If you want to deploy it in a specific platform check our [installation options]({{< ref "apim/open-source/installation" >}}) page.


Please show your support for the Gateway by clicking the GitHub link, then adding your star.
{{< github_star_button "TykTechnologies" "tyk" "true" >}}


{{< img src="/img/diagrams/oss-flow.png" alt="OSS-Guide" >}}


#### Get Started

To Get started, simply install [Tyk Open Source]({{< ref "apim/open-source/installation" >}}), and then create your first API!


#### What is Tyk On-Premises / Self-Managed

Tyk Self-Managed allows you to easily install our Full Lifecycle API Management solution in your own infrastructure. There is no calling home, and there are no usage limits.  You have full control.

#### Tyk Components
The full Tyk Self-Managed system consists of:

* [Tyk Gateway]({{< ref "tyk-oss-gateway" >}}):  Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It is an open source enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols, that protects, secures and processes your APIs.
* [Tyk Dashboard]({{< ref "tyk-dashboard" >}}): The management Dashboard and integration API manage a cluster of Tyk Gateways and also show analytics and features of the [Developer portal]({{< ref "tyk-developer-portal" >}}). The Dashboard also provides the API Developer Portal, a customizable developer portal for your API documentation, developer auto-enrollment and usage tracking.
* [Tyk Pump]({{< ref "tyk-pump" >}}): Tyk Pump handles moving analytics data between your gateways and your Dashboard (amongst other data sinks). The Tyk Pump is an open source analytics purger that moves the data generated by your Tyk nodes to any back-end.
* [Tyk Identity Broker]({{< ref "tyk-identity-broker" >}}) (Optional): Tyk Identify Broker handles integrations with third-party IDP's. It (TIB) is a component providing a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub) or Basic Authentication providers, to your Tyk installation.
* [Tyk Multi-Data Center Bridge]({{< ref "tyk-multi-data-centre" >}}) (Optional, add-on): Tyk Multi-Data Center Bridge allows for the configuration of a Tyk ecosystem that spans many data centers and clouds. It also (MDCB) acts as a broker between Tyk Gateway Instances that are isolated from one another and typically have their own Redis DB.

#### Architecture
{{< img src="/img/diagrams/diagram_docs_pump-data-flow@2x.png" alt="Tyk Self-Managed Archtecture" >}}

#### Dependencies & Database Support

##### MongoDB / PostgreSQL

Tyk Dashboard requires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. See [Database Options]({{< ref "tyk-dashboard/database-options.md" >}}) for a list of versions and drop-in replacements we support.

##### Redis

Tyk Gateway requires Redis for its operations. See [supported Redis versions]({{< ref "planning-for-production/redis#supported-versions">}}) for the list of releases.

Visit the [Gateway page]({{< ref "tyk-oss-gateway" >}}) for more info.


#### Init Systems

Tyk packages support [systemd](https://www.freedesktop.org/wiki/Software/systemd/), [Upstart](http://upstart.ubuntu.com/cookbook/) (both 0.6.x and 1.x) and SysVinit Linux init systems. During package installation only one is chosen depending on the operating system support, e.g.:

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

#### Service logs availability

*   Upstart 0.6.x and SysVinit: log files are located in `/var/logs` for every respective service, e.g. `/var/logs/tyk-gateway.stderr` and `/var/logs/tyk-gateway.stdout`
*   Upstart 1.x: by default everything is stored in `/var/logs/upstart` directory, e.g. `/var/logs/upstart/tyk-gateway.log`
*   systemd utilizes its own logging mechanism called journald, which is usable via the `journalctl` command, e.g. `journalctl -u tyk-gateway`


Please consult with respective init system documentation for more details on how to use and configure it.


#### Free Trial

Sign up for a free trial to test it out:

{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Try for free" >}}


#### Installing Tyk Self-Managed
Please visit our [Self-Managed installation]({{< ref "tyk-self-managed/install" >}}) page to get started.


#### Licensing

Read more about licensing [here]({{< ref "tyk-on-premises/licensing" >}}).


### Tyk Cloud

Tyk cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}}).

- **No need to wrestle with infrastructure:** You can be up and running within a few clicks. No need for complex deployments or large infrastructure teams.
- **Flexible deployment options:** Whether you're a startup or a large enterprise, Tyk Cloud has deployment options to suit your needs. You can scale and manage your API ecosystem easily and efficiently. The control plane is hosted by Tyk in the cloud, in one of the 5 regions available. Meanwhile, the data planes, composed of Tyk Gateways and Redis for temporary storage, can be either hosted by Tyk or managed by you on your infrastructure.
- **Geographical freedom:** Tyk Cloud allows you to select your preferred AWS location as your home region, ensuring your data and Tyk Gateways are live and secured in the region that suits you best.
- **Designed for platform teams:** With Tyk Cloud, you can use [role-based access control (RBAC)](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/) to manage your team structure, as well as [multiple environments and multiple organizations](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/). 


Start using Tyk on our servers. Nothing to install:

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Free trial" >}}



#### Tyk Cloud Overview

This page explains what Tyk Cloud is and how the Tyk SaaS solution makes it easy for you to optimize your platforms in just a few clicks, so that you can manage your APIs seamlessly.  

{{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="Cloud free trial" >}}

##### What is Tyk Cloud?

Tyk Cloud is a full SaaS service that enables you to run and operate Tyk using your chosen cloud provider, in whichever region you like. This powerful solution includes use of the Tyk API Gateway, Tyk Dashboard, Tyk Developer Portal, Universal Data Graph and more. All without having to manage an infrastructure.

##### Where is Tyk Cloud hosted?

Tyk Cloud is currently available to auto-deploy on AWS.
Paid plans and Enterprise trials allow users to select one of 6 AWS locations as their home region as well as the locations of their Cloud Data Planes. The 6 AWS regions to choose from are:
- aws-ap-southeast-1, Singapore
- aws-eu-central-1, Frankfurt, Germany
- aws-eu-west-2, London, UK
- aws-us-east-1, N. Virginia, USA
- aws-us-west-2, Oregon, USA
- aws-ap-southeast-2, Australia


##### Why Tyk Cloud?

**Next Level SaaS**

Tyk is cloud native and has always been a true multi-cloud product and now we’re taking it to the next level with our next level SaaS platform, Tyk Cloud.

Now you don’t need to worry about vendor lock-in, or complex deployments, you can benefit from being able to optimize your platforms across and between a myriad of providers such as AWS, Google Cloud etc.

**Quick deployments Wherever you need them**

Want to handle Govt API traffic in Singapore? With just a few clicks your data and Tyk Gateways are live and secured in the AWS Gov cloud. Want to add local Gateways in Australia to improve performance and resilience? It’s just a click away. Want to deploy your management layer to your own hosted servers rather than a cloud provider? We make it simple.

The new Tyk Cloud platform allows you to quickly setup the full Tyk Enterprise API Management platform, simply choosing the regions where you wish to locate your gateways and where you wish your data to reside, resulting in immediate and secure data sovereignty.

Seamlessly wire your environments between cloud providers, and your own infrastructure, anywhere in the world at the click of a button, not only eliminating lock-in but making it possible to expand your platform to cater for the changing needs of your clients.

**Designed for Enterprises**

Tyk Cloud is designed for Enterprises who may have multi-organizations and multi-teams, so you can combine or isolate your platform and the underlying providers, the choice is completely yours!

To make it even simpler, Tyk Cloud is pre-configured so you can be up and running within a few clicks, no laborious tasks for your internal teams and best practice configuration and security is delivered out of the box.

#### Quickstarts

{{< grid >}}

{{< badge read="5 mins" href="/deployment-and-operations/tyk-cloud-platform/quick-start/" image="/img/tyk-cloud.svg" alt="Quick Start">}}
Quick Start
{{< /badge >}}

{{< /grid >}}

#### Feature setups

{{< grid >}}

{{< badge title="Configuration" href="tyk-cloud/configuration-options/using-plugins/python-custom-auth/" >}}

**Python custom plugins**

Implement your own custom logic with Python based plugins
{{< /badge >}}

{{< badge title="Configuration" href="tyk-cloud/using-custom-domains/" >}}

**Using custom domains**

Configure custom domain for your Dashboard and Developer Portal
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/environments-deployments/managing-environments" >}}

**Manage environments**

Create and manage multiple environments within your Tyk Cloud organization
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/environments-deployments/managing-control-planes" >}}

**Manage deployments**

Create and manage your Cloud Control Plane and Cloud Data Plane deployments
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud/teams-users/" >}}

**Manage teams & users**

Create teams in your organization, define roles and manage user access
{{< /badge >}}

{{< badge title="Account" href="tyk-cloud/account-billing/" >}}

**Manage billing**

Upgrade your subscription, billing details or card information
{{< /badge >}}

{{< /grid >}}



## Prepare for your Migration


### Get Started with Tyk Open Source
New to Tyk Gateway? In this page you'll get started with the basics - install Tyk and test it live in less than 2 minutes.

We recommend [Tyk Gateway docker compose](https://github.com/TykTechnologies/tyk-gateway-docker) as the quickest way to get started. Later, you can move to one of our other supported distributions if you prefer.

**Step 1 - Clone the docker-compose repository**
```
git clone https://github.com/TykTechnologies/tyk-gateway-docker
```

**Step 2 - Change to the new directory**
```
cd tyk-gateway-docker
```

**Step 3 - Deploy Tyk Gateway and Redis**
```
docker-compose up
```

You can also run this in detached mode using the _-d_ flag:

```
docker-compose up -d
```

Congratulations, you’re done!!!

#### Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by checking against the ‘hello’ endpoint:

```curl
curl localhost:8080/hello
```

The output should be similar to that shown below:
```json
{"status": "pass", "version": "v5.1", "description": "Tyk GW"}
```

##### Virtual Deployment
[Killercoda](https://killercoda.com/about) gives you instant access to a real Linux or Kubernetes command-line environment via your browser. 
You can try this [Killercoda Tyk scenario](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose) to walk through the installation of our Open Source Gateway using Docker Compose (the exact same flow shown above).

#### Kubernetes

This pages has shown the fasted way to get up and running with Tyk Open Source. If you are interested in deploying Tyk stack on a Kubernetes cluster please use our [Helm Charts]{{< ref "tyk-oss/ce-helm-chart-new">}}


### Install Gateway on your Setup

The backbone of all our products is our open source Gateway. You can install our Open Source / Community Edition on the following platforms:

{{< grid >}}

{{< badge read="10 mins" href="tyk-oss/ce-docker/" image="/img/docker.png" alt="Docker install">}}
Install with Docker. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-kubernetes/" image="/img/k8s.png" alt="Kubernetes Install">}}
Install with K8s. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-ansible/" image="/img/ansible.png" alt="Ansible install">}}
Install with Ansible. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-redhat-rhel-centos/" image="/img/redhat-logo2.png" alt="Redhat / CentOS install">}}
Install on RHEL / CentOS. 
{{< /badge >}}

{{< badge read="10 mins" href="tyk-oss/ce-debian-ubuntu/" image="/img/debian-nd-753.png" alt="Debian / Ubuntu install">}}
Install on Debian / Ubuntu. 
{{< /badge >}}

{{< badge read="10 mins" href="https://github.com/TykTechnologies/tyk" image="/img/GitHub-Mark-64px.png" alt="Tyk Gateway GitHub Repo">}}
Visit our Gateway GitHub Repo. 
{{< /badge >}}

{{< /grid >}}


#### Architecture

The Tyk Gateway can run completely independently, requiring only a Redis database, and can scale horizontally:

{{< img src="/img/diagrams/oss-architecture.png" alt="Open Source Architecture" >}}


#### Other Tyk Open Source components

Combine with the other [Tyk OSS products]({{< ref "tyk-stack" >}}) For even more power, such as analytics exporting, version control integration, and more.

{{< img src="/img/diagrams/oss-flow.png" alt="Open Source Components" >}}

#### Install with Docker


We will show you two methods of installing our Community Edition Gateway on Docker.
The quickest way to get started is using docker-compose. Visit our [Dockerhub](https://hub.docker.com/u/tykio/) to view the official images.

##### Prerequisites

The following are required for a Tyk OSS installation:
 - Redis   - Required for all Tyk installations.
             Simple Redis installation instructions are included below.
 - MongoDB - Required only if you chose to use the MongoDB Tyk Pump with your Tyk OSS installation. Same goes with any [other pump data stores]({{< ref "tyk-stack/tyk-pump/other-data-stores.md" >}}) you choose to use.

##### How To Install?

**Step 1 - Create a network**

```bash
docker network create tyk
```

**Step 2 - Deploy Redis into the network, with the `6379` port open**

```bash
docker run -itd --rm --name tyk-redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
```

**Step 3 - Next, let's download a JSON `tyk.conf` configuration file**

```bash
wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
```

**Step 4 - Run the Gateway, mounting the conf file into the container**

```bash
docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:latest
```


##### Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by making a network request to the 'hello' endpoint:

```console
curl localhost:8080/hello
```

Output should be similar to that shown below:
```json
{"status":"pass","version":"v3.2.1","description":"Tyk GW"}
```


#### Deploy with Kubernetes


**Tyk Helm Charts**
The main way to install the Open Source *Tyk Gateway* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.

Get started with our [Quick Start guide]({{<ref "tyk-oss/ce-helm-chart-new">}}) or go to [Tyk Open Source helm chart]({{<ref "product-stack/tyk-charts/tyk-oss-chart">}}) for detailed installation instructions and configuration options.

##### Quick Start with Helm Chart

The following guides provide instructions to install Redis and Tyk Open Source with default configurations. It is intended for quick start only. For production, you should install and configure Redis separately.

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

**Quick Start**
The following quick start guide explains how to use the Tyk OSS Helm chart to configure the Tyk Gateway that includes:
- Redis for key storage

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 

**1. Install Redis and Tyk**

```bash
NAMESPACE=tyk-oss
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade tyk-oss tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

**2. Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-tyk-oss-tyk-gateway` at port `8080`. 

You are now ready to [create an API]({{<ref "/getting-started/create-api">}}).

For the complete installation guide and configuration options, please see [Tyk OSS Helm Chart]({{<ref "/product-stack/tyk-charts/tyk-oss-chart">}}).

##### Configure Legacy Tyk Headless Helm Chart
{{< warning success >}}
**Warning**

`tyk-headless` chart is deprecated. Please use our Tyk Chart for Tyk Open Source at [tyk-oss]({{<ref "tyk-oss/ce-helm-chart-new">}}) instead. 

We recommend all users migrate to the `tyk-oss` Chart. Please review the [Configuration]({{<ref "tyk-oss/ce-helm-chart-new">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}


**Introduction**

This is the preferred (and easiest) way to install the Tyk OSS Gateway on Kubernetes.
It will install Tyk gateway in your Kubernetes cluster where you can add and manage APIs directly or via the *Tyk Operator*.

**Prerequisites**

The following are required for a Tyk OSS installation:
 - Redis   - required for all the Tyk installations and must be installed in the cluster or reachable from inside K8s.
             You can find instructions for a simple Redis installation bellow.
 - MongoDB/SQL - Required only if you chose to use the MongoDB/SQL Tyk pump with your Tyk OSS installation. Same goes with any
             [other pump]({{< ref "tyk-stack/tyk-pump/other-data-stores" >}}) you choose to use.
 - Helm - Tyk Helm supports the Helm 3+ version.

**Installation**

As well as our official OSS Helm repo, you can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-headless).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless" data-theme="light"
data-header="true" data-responsive="true"><blockquote><p lang="{{ .Site.LanguageCode }}" dir="ltr">
<b>tyk-headless</b>: This chart deploys the open source Tyk Gateway. Tyk Gateway is a fully open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols. Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organizations and businesses around the world to protect, secure, and process APIs and well as review and audit the consumed apis.
</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-headless">Artifact Hub</a></blockquote>
</div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-headless)

**Step 1 - Add Tyk official Helm repo**

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

**Step 2 - Create namespace for Tyk deployment**

```bash
kubectl create namespace tyk
```

**Step 3 - Getting values.yaml**

Before we proceed with installation of the chart you may need to set some custom values.
To see what options are configurable on a chart and save those options to a custom values.yaml file run:

```bash
helm show values tyk-helm/tyk-headless > values.yaml
```

Some of the necessary configration parameters will be explained in the next steps.

**Step 4 - Installing Redis**

* Recommended: via *Bitnami* chart

For Redis you can use these rather excellent chart provided by Bitnami.
Copy the following commands to add it: 

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
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
Alternatively, you can use `--set` flag to set it in Tyk installation. For example  `--set redis.pass=$REDIS_PASSWORD`

**Evaluation only: via *simple-redis* chart**

{{< warning  success >}}
**Warning**

Another option for Redis, to get started quickly, is to use our *simple-redis* chart.
Please note that these provided charts must never be used in production or for anything
but a quick start evaluation only. Use Bitnami redis or Official Redis Helm chart in any other case.
We provide this chart, so you can quickly deploy *Tyk gateway*, but it is not meant for long term storage of data.

{{< /warning >}}

```bash
helm install redis tyk-helm/simple-redis -n tyk
```

**Step 5 - Installing Tyk Open Source Gateway**

```bash
helm install tyk-ce tyk-helm/tyk-headless -f values.yaml -n tyk
 ```

Please note that by default, Gateway runs as `Deployment` with `ReplicaCount` is 1. You should not update this part because multiple instances of OSS gateways won't sync the API Definition.

**Installation Video**

See our short video on how to install the Tyk Open Source Gateway.
Please note that this video shows the use of GH repo, since it recorded before the official repo was available, However,
it's very similar to the above commands.

{{< youtube mkyl38sBAF0 >}}

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

**Optional - Using TLS**
You can turn on the TLS option under the gateway section in your local `values.yaml` file which will make your Gateway
listen on port 443 and load up a dummy certificate.
You can set your own default certificate by replacing the file in the `certs/` folder.

**Optional - Mounting Files**
To mount files to any of the Tyk stack components, add the following to the mounts array in the section of that component.

For example:
 ```bash
 - name: aws-mongo-ssl-cert
  filename: rds-combined-ca-bundle.pem
  mountPath: /etc/certs
```

**Optional - Tyk Ingress**
To set up an ingress for your Tyk Gateways see our [Tyk Operator GitHub repository](https://github.com/TykTechnologies/tyk-operator).


### Automate with Ansible

{{< note >}}
**Requirements**

*   [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk CE with shell is in the <b>Shell</b> tab.
*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
{{< /note >}}

#### Getting Started
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

5. Run ansible-playbook to install `tyk-ce`

```bash
$ ansible-playbook playbook.yaml -t tyk-ce -t redis
```

You can choose to not install Redis by removing the `-t redis`. However Redis is a requirment and needs to be installed for the gateway to run.

#### Supported Distributions
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

### Set Up Tyk Gateway on Debian or Ubuntu

The Tyk Gateway can be installed following different installation methods including *Ansible* and *Shell*. Please select by clicking the tab with the installation path most suitable for you.

#### Install Tyk Gateway Through Shell

##### Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 11 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

##### Requirements

- Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

**Install Redis**

```console
$ sudo apt-get install -y redis-server
```

##### Installation

First import the public key as required by Ubuntu APT

```console
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

**1. Run Installation Scripts via our PackageCloud Repositories**

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

**2. Configure The Gateway**

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.
{{< /note >}}


```console
$ sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What you've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, you don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

**3. Starting Tyk**

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```console
$ sudo service tyk-gateway start
```

#### Install Tyk Gateway Through Ansible

##### Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 11 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

##### Requirements
Before you begin the installation process, make sure you have the following:
- [Git](https://git-scm.com/download/linux) - required for getting the installation files.
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk CE with shell is in the <b>Shell</b> tab.
- Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

##### Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```console
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initalisation script to initialise environment

```console
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway-ce`

```console
$ ansible-playbook playbook.yaml -t tyk-gateway-ce -t redis
```
{{< note success >}}
**Note**

Installation flavors can be specified by using the -t {tag} at the end of the ansible-playbook command. In this case we are using:
-`tyk-gateway-ce`: Tyk Gateway with CE config
-`redis`: Redis database as Tyk Gateway dependency
{{< /note >}}

##### Variables
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


### Install Tyk Gateway on Red Hat (RHEL / CentOS)

The Tyk Gateway can be installed following different installation methods including *Shell* and *Ansible*. Please select by clicking the tab with the installation path most suitable for you.

#### Install Tyk Gateway Through Shell

##### Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

##### Requirements

Before you begin the installation process, make sure you have the following:

*   Ensure port `8080` is open for Gateway traffic (the API traffic to be proxied).
*   The Tyk Gateway has a [dependency](https://tyk.io/docs/planning-for-production/redis/#supported-versions) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

##### Step 1: Create Tyk Gateway Repository Configuration

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

##### Step 2: Install Tyk Gateway

Install the Tyk Gateway using yum:
```bash
sudo yum install -y tyk-gateway
```
{{< note success >}}
**Note**

You may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue.
{{< /note >}}

##### Step 3: Start Redis

If Redis is not running then start it using the following command:
```bash
sudo service redis start
```
##### Step 4: Configuring The Gateway

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

##### Step 5: Start the Tyk Gateway

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```

#### Install Tyk Gateway Through Ansible

##### Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

##### Requirements
Before you begin the installation process, make sure you have the following:

- [Git](https://git-scm.com/download/linux) - required for getting the installation files.
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below.
- Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

##### Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository

```console
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```console
$ cd tyk-ansible
```

3. Run the initalisation script to initialise your environment

```console
$ sh scripts/init.sh
```

4. Modify the `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway-ce`

```console
$ ansible-playbook playbook.yaml -t tyk-gateway-ce -t redis
```
{{< note success >}}
**Note**  

Installation flavors can be specified by using the -t {tag} at the end of the ansible-playbook command. In this case we are using:
  -`tyk-gateway-ce`: Tyk Gateway with CE config
  -`redis`: Redis database as Tyk Gateway dependency
{{< /note >}}

##### Variables
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


### Configure Redis Cluster

Our Gateway, Dashboard and Pump all support integration with Redis Cluster. Redis Cluster allows data to be automatically sharded across multiple Redis Nodes. To setup Redis Cluster correctly, we recommend you read the [Redis Cluster Tutorial](https://redis.io/topics/cluster-tutorial). You must use the same settings across the Gateway, Dashboard and Pump.

{{< note success >}}
**Note**  

Redis Cluster operates differently from a Redis setup where one instance serves as the primary and others as replicas.
{{< /note >}}

{{< redis-versions >}}


#### Redis Cluster & Tyk Gateway 

To configure the Tyk Gateway to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `addrs` in your `tyk.conf` file.

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated. 
{{< /note >}}

If you are using TLS for Redis connections, set `use_ssl` to `true`.

```json
"storage": {
  "type": "redis",
  "enable_cluster": true,
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  "use_ssl": false
},
```

#### Redis Cluster & Tyk Dashboard

{{< note success >}}
**Note**  

`redis_addrs` is new in v1.9.3 for the Dashboard, and replaces `hosts` which is now deprecated. 
{{< /note >}}


```json
"redis_addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
"redis_use_ssl": true,
"enable_cluster": true
```
To configure the Tyk Dashboard to work with your Redis Cluster, add the Redis address information to your `tyk_analytics.conf` file:


#### Redis Cluster & Tyk Pump

To configure the Tyk Pump to work with your Redis Cluster, set `enable_cluster` to `true` and list your servers under `addrs` in your `pump.conf` file.

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated. 
{{< /note >}}


```json
"analytics_storage_config": {
  "type": "redis",
  "enable_cluster": true,
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 100,
  "use_ssl": false
},
```

#### Redis Cluster with Docker

For Redis clustered mode to work with Tyk using Docker and Amazon ElastiCache, follow these two steps:

**Step 1: Make sure cluster mode is enabled**

Set the environment variable `TYK_GW_STORAGE_ENABLECLUSTER` to `true`.

**Step 2: Add all cluster endpoints to the config**

Add all the Redis Cluster endpoints into Tyk, not just the primary. If Tyk can't see the whole cluster, then it will not work.

For ElastiCache Redis, you can bypass having to list all your nodes, and instead just use the *configuration endpoint*,
this allows read and write operations and the endpoint will determine the correct node to target.

If this does not work, you can still list out the hosts using an environment variable. To do so, set the environment variable:

```{.copyWrapper}
TYK_GW_STORAGE_ADDRS="redis_primary1:port,redis_replica1:port,redis_primary2:port,redis_replica2:port,redis_primary3:port,redis_replica3:port"
```

It is important that Tyk can connect to all primary and replica instances.

It is recommended to ensure that the connection pool is big enough. To do so, set the following environment variables:

```{.copyWrapper}
TYK_GW_STORAGE_MAXIDLE=6000
TYK_GW_STORAGE_MAXACTIVE=10000
```
{{< note success >}}
**Note**  

These are suggested settings, please verify them by load testing.
{{< /note >}}

**Redis Cluster with TLS**
If you are using TLS for Redis connections, set `use_ssl` to `true` for Gateway and Pump, and `redis_use_ssl` to `true` for the dashboard.
Redis supports [SSL/TLS encryption](https://redis.io/topics/encryption) from version 6 as an optional feature, enhancing the security of data in transit. Similarly, Amazon ElastiCache offers encryption in transit and at rest. To configure TLS or mTLS connections between an application and Redis, consider the following settings in Tyk's configuration files:

- `storage.use_ssl`: Set this to true to enable TLS encryption for the connection.

- `storage.ssl_secure_skip_verify`: A flag that, when set to true, instructs the application not to verify the Redis server's TLS certificate. This is not recommended for production due to the risk of `man-in-the-middle` attacks.

From **Tyk 5.3**, additional options are available for more granular control:

- `storage.ca_file`: Path to the Certificate Authority (CA) file for verifying the Redis server's certificate.

- `storage.cert_file` and `storage.key_file`: Paths to your application's certificate and private key files, necessary for mTLS where both parties verify each other's identity.

- `storage.max_version` and `storage.min_version`: Define the acceptable range of TLS versions, enhancing security by restricting connections to secure TLS protocols (1.2 or 1.3).

**Setting up an Insecure TLS Connection**
- **Enable TLS**: By setting `"use_ssl": true`, you encrypt the connection.
- **Skip Certificate Verification**: Setting `"ssl_secure_skip_verify": true` bypasses the server's certificate verification, suitable only for non-production environments.

**Setting up a Secure TLS Connection**
- Ensure `use_ssl` is set to `true`.
- Set `ssl_secure_skip_verify` to `false` to enforce certificate verification against the CA specified in `ca_file`.
- Specify the path to the CA file in `ca_file` for server certificate verification.
- Adjust `min_version` and `max_version` to secure TLS versions, ideally 1.2 and 1.3.

**Setting up a Mutual TLS (mTLS) Connection**
- Follow the steps for a secure TLS connection.
- Provide paths for `cert_file` and `key_file` for your application's TLS certificate and private key, enabling Redis server to verify your application's identity.

**Example Gateway Configuration**
```json
"storage": {
  "type": "redis",
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "use_ssl": true,
  "ssl_secure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2",
  "enable_cluster": true,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000
}
```

##### Troubleshooting Redis Cluster

If you find that Tyk components fail to initialise when using Redis clustering, for example the application does not start and the last log file entry shows a message such as `Using clustered mode`, try setting the environment variable `REDIGOCLUSTER_SHARDCOUNT` to `128` on all hosts which connect to the Redis Cluster i.e. Gateway, Dashboard, Pump, MDCB. E.g.

`REDIGOCLUSTER_SHARDCOUNT=128`

If setting to `128` does not resolve the issue, try `256` instead.


### Set Up Redis Sentinel

From v2.9.3 Redis Sentinel is supported.

Similar to Redis Cluster, our Gateway, Dashboard and Pump all support integration with Redis Sentinel.

To configure Tyk to work with Redis Sentinel, list your servers under `addrs` and set the master name in your Gateway, Dashboard, Pump and MDCB config. Unlike Redis Cluster, `enable_cluster` should **not** be set.  Indicative config snippets as follows:

{{< redis-versions >}}

#### Gateway

```json
"storage": {
  "type": "redis",
  "addrs": [
    "server1:26379",
    "server2:26379",
    "server3:26379"
  ],
  "master_name": "mymaster",
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  "use_ssl": false
},
```

##### Dashboard

```json
"redis_addrs": [
  "server1:26379",
  "server2:26379",
  "server3:26379"
],
"redis_master_name": "mymaster"
```

#### Pump

```json
"analytics_storage_config": {
  "type": "redis",
  "addrs": [
    "server1:26379",
    "server2:26379",
    "server3:26379"
  ],
  "master_name": "mymaster",
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 100,
  "use_ssl": false
},
```

{{< warning success >}}
**Warning**

When using Bitnami charts to install Redis Sentinel in k8s, a Redis service is exposed, which means that standard Redis config is required instead of the above setup, i.e. a single server in `addrs` and `master_name` is not required.

{{< /warning >}}

#### Support for Redis Sentinel AUTH

To support the use of Redis Sentinel AUTH (introduced in Redis 5.0.1) we have added the following global config settings in Tyk v3.0.2:

* In the Tyk Gateway config file - `sentinel_password`
* In the Tyk Dashboard config file - `redis_sentinel_password`
* In the Tyk Pump config file - `sentinel_password`
* In the Tyk Identity Broker config file - `SentinelPassword`
* In the Tyk Synk config file - `sentinel_password`

These settings allow you to support Sentinel password-only authentication in Redis version 5.0.1 and above.

See the Redis and Sentinel authentication section of the [Redis Sentinel docs](https://redis.io/topics/sentinel) for more details.

#### Redis Encryption
Redis supports [SSL/TLS encryption](https://redis.io/topics/encryption) from version 6 as an optional feature, enhancing the security of data in transit. To configure TLS or mTLS connections between an application and Redis, consider the following settings in Tyk's configuration files:

- `storage.use_ssl`: Set this to true to enable TLS encryption for the connection.

- `storage.ssl_secure_skip_verify`: A flag that, when set to true, instructs the application not to verify the Redis server's TLS certificate. This is not recommended for production due to the risk of `man-in-the-middle` attacks.

From **Tyk 5.3**, additional options are available for more granular control:

- `storage.ca_file`: Path to the Certificate Authority (CA) file for verifying the Redis server's certificate.

- `storage.cert_file` and `storage.key_file`: Paths to your application's certificate and private key files, necessary for mTLS where both parties verify each other's identity.

- `storage.max_version` and `storage.min_version`: Define the acceptable range of TLS versions, enhancing security by restricting connections to secure TLS protocols (1.2 or 1.3).

**Setting up an Insecure TLS Connection**
- **Enable TLS**: By setting `"use_ssl": true`, you encrypt the connection.
- **Skip Certificate Verification**: Setting `"ssl_secure_skip_verify": true` bypasses the server's certificate verification, suitable only for non-production environments.

**Setting up a Secure TLS Connection**
- Ensure `use_ssl` is set to `true`.
- Set `ssl_secure_skip_verify` to `false` to enforce certificate verification against the CA specified in `ca_file`.
- Specify the path to the CA file in `ca_file` for server certificate verification.
- Adjust `min_version` and `max_version` to secure TLS versions, ideally 1.2 and 1.3.

**Setting up a Mutual TLS (mTLS) Connection**
- Follow the steps for a secure TLS connection.
- Provide paths for `cert_file` and `key_file` for your application's TLS certificate and private key, enabling Redis server to verify your application's identity.

**Example Gateway Configuration**
```json
"storage": {
  "type": "redis",
  "addrs": [
    "server1:6379",
    "server2:6380",
    "server3:6381"
  ],
  "use_ssl": true,
  "ssl_secure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2",
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000
}
```

### Access Code on GitHub
The Tyk Gateway is fully open-source.  It's all the same Gateway that's used by you (the community!), by our enterprise products, as well as our SaaS.

Do you want to contribute to or run the product from source?

Visit our [GitHub repo](https://github.com/TykTechnologies/tyk) for more details:


## Transition to Tyk Cloud

This page explains what Tyk Cloud is and how the Tyk SaaS solution makes it easy for you to optimize your platforms in just a few clicks, so that you can manage your APIs seamlessly.  

{{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="Cloud free trial" >}}


### Understand Tyk Cloud

#### What is Tyk Cloud?

Tyk Cloud is a full SaaS service that enables you to run and operate Tyk using your chosen cloud provider, in whichever region you like. This powerful solution includes use of the Tyk API Gateway, Tyk Dashboard, Tyk Developer Portal, Universal Data Graph and more. All without having to manage an infrastructure.

#### Where is Tyk Cloud hosted?

Tyk Cloud is currently available to auto-deploy on AWS.
Paid plans and Enterprise trials allow users to select one of 6 AWS locations as their home region as well as the locations of their Cloud Data Planes. The 6 AWS regions to choose from are:
- aws-ap-southeast-1, Singapore
- aws-eu-central-1, Frankfurt, Germany
- aws-eu-west-2, London, UK
- aws-us-east-1, N. Virginia, USA
- aws-us-west-2, Oregon, USA
- aws-ap-southeast-2, Australia


### Why Tyk Cloud?

#### Next Level SaaS

Tyk is cloud native and has always been a true multi-cloud product and now we’re taking it to the next level with our next level SaaS platform, Tyk Cloud.

Now you don’t need to worry about vendor lock-in, or complex deployments, you can benefit from being able to optimize your platforms across and between a myriad of providers such as AWS, Google Cloud etc.

#### Quick deployments Wherever you need them

Want to handle Govt API traffic in Singapore? With just a few clicks your data and Tyk Gateways are live and secured in the AWS Gov cloud. Want to add local Gateways in Australia to improve performance and resilience? It’s just a click away. Want to deploy your management layer to your own hosted servers rather than a cloud provider? We make it simple.

The new Tyk Cloud platform allows you to quickly setup the full Tyk Enterprise API Management platform, simply choosing the regions where you wish to locate your gateways and where you wish your data to reside, resulting in immediate and secure data sovereignty.

Seamlessly wire your environments between cloud providers, and your own infrastructure, anywhere in the world at the click of a button, not only eliminating lock-in but making it possible to expand your platform to cater for the changing needs of your clients.

#### Designed for Enterprises

Tyk Cloud is designed for Enterprises who may have multi-organizations and multi-teams, so you can combine or isolate your platform and the underlying providers, the choice is completely yours!

To make it even simpler, Tyk Cloud is pre-configured so you can be up and running within a few clicks, no laborious tasks for your internal teams and best practice configuration and security is delivered out of the box.


### Start a Free Trial

{{< note trial >}}
**Note**

The Tyk Cloud trial is limited to 48 hours. After this period, your data will be deleted.
The Tyk Cloud trial does not include access to [Hybrid deployments]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}}) or the [Developer Portal]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal" >}}).
To try out these capabilities, please get in touch for a [guided evaluation](https://tyk.io/guided-evaluation/) with our team.
{{< /note >}}

Welcome to the [Tyk Cloud Platform]({{< ref "tyk-cloud" >}})!
This guide will lead you through the following steps:
1. Signing up with [Tyk Cloud ]({{< ref "tyk-cloud" >}}).
2. Creating your first [API]({{< ref "getting-started/key-concepts/what-is-an-api-definition" >}}) using the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}).
3. Setting up a [Policy]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) and Key to secure your APIs.

No installation required!

#### Step 1: Sign Up for Tyk Cloud

To begin your Tyk Cloud journey, follow these simple steps to sign up for an account:

* Navigate to the [Tyk Cloud sign up form](https://tyk.io/sign-up/).
* Fill in the required information and click on "Next step: Create your password".
* Choose a robust password for your account.
* Select your home region, where your data will be securely stored and click on "Create Account".
* Wait a couple of minutes and congratulations, your API platform was deployed!

All the necessary infrastructure has been reserved for you for the next 48 hours, and you can now access the Tyk Dashboard to start creating your first API.

#### Step 2: Get started with your first API with Tyk Dashboard

* Click on "Add API" to access the Tyk Dashboard directly. If you closed your window in the meantime, simply log in to your Tyk Cloud account and you will be redirected to the Tyk Dashboard.

{{< img src="/img/cloud/tyk-cloud-tyk-trial-dashboard.png" alt="Accessing Tyk Dashboard from Tyk Cloud" >}}

* Click the "Design from scratch" button to start the API definition creation process.

{{< img src="/img/cloud/tyk-cloud-create-api.png" alt="Accessing Creating an API" >}}

* Give your API a name - We’ll use “httpbin” for the rest of this quick start.
* In the "Type" section, please select "HTTP".
* In the "API Type" section, please select "OpenAPI".
* Keep https://httpbin.org/ as the upstream URL.

* Finally, click on the button "CONFIGURE API".
{{< img src="/img/cloud/create-api-tyk-cloud.png" alt="Designing an API" >}}

* Select to which gateway you want to deploy this API, select the "edge" tags to deploy to the cloud data plane.

{{< img src="/img/cloud/tyk-cloud-select-cloud-gateway.png" alt="Selecting Cloud Data Planes for an API" width="500px" >}}

* Select "Active" in the "Gateway Status" section.
* Select "External" in the "Access" section.

{{< img src="/img/cloud/tyk-cloud-save-api.png" alt="Saving an API" >}}

* Enable "Authentication" and select "Auth Token" in the dropdown.
* Tick the "Use header value" checkbox and add "Authorization" as the header name.
* Customize your API settings, including authentication, rate limits, and caching, as per your requirements.

{{< img src="/img/cloud/tyk-cloud-api-auth.png" alt="Authenticating an API" >}}

* Click "Save" to create your API. Congratulations! You've just set up your first API.

#### Step 3: Set up a Policy and Key

In this step, we will guide you through the process of creating a policy and key system to secure your APIs.

##### Create a Policy:

* Click on "Policies" under the "API Security" section on the left-hand side.
* Click on the button "ADD POLICY".

{{< img src="/img/cloud/tyk-cloud-add-policy.png" alt="Policy section" >}}

* In the "Access Rights" section, please select "httpbin".

{{< img src="/img/cloud/tyk-cloud-policy-access-rights.png" alt="Add policy access rights" >}}

* Go to the "Configurations" section and add a Policy Name (e.g., 'Default Policy httpbin').
* Under the "Settings" section, add an expiry date (e.g., '2 weeks').
* Click on the button "Create Policy".
{{< img src="/img/cloud/tyk-cloud-policy-configurations.png" alt="Policy configuration" >}}

##### Create a Key:

* Click on "Keys" under the "API Security" section on the left-hand side.
* Click on the button "ADD KEY".

{{< img src="/img/cloud/tyk-cloud-add-key.png" alt="Key section" >}}

* In the "Access Rights" section, please select the previously created Policy (e.g., 'Default Policy httpbin').

{{< img src="/img/cloud/tyk-cloud-key-access-rights.png" alt="Add key access rights" >}}

* Go to the "Configurations" section and give your key an alias (e.g., 'platform_team').
* Click on the button "Create Key".

{{< img src="/img/cloud/tyk-cloud-key-configurations.png" alt="Key configuration" >}}

Congratulations! Your key has now been created!

{{< img src="/img/cloud/tyk-cloud-copy-key-url.png" alt="Copy Key ID" width="500px" >}}

<b>Note:</b> Please copy the "Key ID" as it will be necessary when testing the API.

Now that your API is created, you can explore and manage it through the Tyk Dashboard.

#### Step 4: Send a test API request to the secured endpoint

##### Postman

After creating a Policy and a Key, proceed to "Postman" to test and interact with the API you've just created.

* Click on "APIs" under the "API Management" section on the left-hand side.
* Select the previously created API (e.g., 'httpbin').
* Copy the API URL.

{{< img src="/img/cloud/tyk-cloud-save-api.png" alt="API section" >}}

* In Postman, choose "Send an API request".

{{< img src="/img/cloud/tyk-cloud-postman-send-api-request.png" alt="Postman section" >}}

* Enter the copied URL and add "https://" at the beginning.

{{< img src="/img/cloud/tyk-cloud-postman-enter-url.png" alt="Postman section" >}}

* In the Tyk Gateway Dashboard, navigate to "Keys" under the "System Management" section on the left-hand side.
* Copy the previously created "Key ID".

{{< img src="/img/cloud/tyk-cloud-copy-key-url.png" alt="Copy key ID" width="500px" >}}

* On Postman, navigate to the "Authorization" tab.
* Change the authentication type from "Inherit auth from parent" to "API Key".
* Paste the "Key ID" into the "Value" field.
* Click the "Send" button to submit the request.

{{< img src="/img/cloud/tyk-cloud-postman-authorization.png" alt="Key section" >}}

##### Curl

To test and interact with the API, you can also use the curl command:

```
curl -X GET "${API URL}" -H "Authorization: ${KEY ID}"
```

**Example:**

```
'curl -X GET "https://corporate-bakery-gw.aws-euw2.cloud-ara.tyk.io/httpbin/" -H "Authorization: eyJvcmciOiI2NWIxMmYxMWJkZjg0YTAwMDEzY2UzZDkiLCJpZCI6IjRmYzM2OTc4NDg1MzQ3NzRiMDhhZ
mEyNTVkNzIxM2NkIiwiaCI6Im11cm11cjEyOCJ9"'
```

{{< img src="/img/cloud/tyk-cloud-cmd-example.png" alt="Key section" >}}

### Import Existing APIs

Tyk supports importing both API Blueprint and Swagger (OpenAPI) JSON definitions from either the Gateway or the Dashboard. Tyk will output the converted file to to `stdout`. Below are the commands you can use to get Tyk to switch to command mode and generate the respective API definitions for both API Blueprint and Swagger files.

#### API Blueprint is being deprecated

Our support for API Blueprint is being deprecated. We have been packaging [aglio](https://github.com/danielgtaylor/aglio) in our Docker images for the Dashboard which enables rendering API Blueprint Format in the portal. This module is no longer maintained and is not compatible with newer NodeJS. If you wish to continue using this feature, you can do so by installing the module yourself in your Dockerfile. The imapct of this change is that our Docker images will no longer contain this functionality.

As a work around, you can do the following:

* Create API Blueprint in JSON format using the Apiary [Drafter](https://github.com/apiaryio/drafter) tool
* Convert API Blueprint to OpenAPI (Swagger) using the Apiary [API Elements CLI](https://github.com/apiaryio/api-elements.js/tree/master/packages/cli) tool.

#### Import APIs via the Gateway

##### Using API Blueprint

{{< note success >}}
**Note**  

See [note](#api-blueprint-is-being-deprecated) above regarding deprecation of support for API Blueprint.
{{< /note >}}

Tyk supports an easy way to import Apiary API Blueprints in JSON format using the command line.

Blueprints can be imported and turned into standalone API definitions (for new APIs) and also imported as versions into existing APIs.

It is possible to import APIs and generate mocks or to generate Allow Lists that pass-through to an upstream URL.

All imported Blueprints must be in the JSON representation of Blueprint's markdown documents. This can be created using Apiary's [Snow Crash tool](https://github.com/apiaryio/snowcrash).

Tyk outputs all new API definitions to `stdout`, so redirecting the output to a file is advised in order to generate new definitions to use in a real configuration.

**Importing a Blueprint as a new API:**

Create a new definition from the Blueprint:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```

**Importing a definition as a version in an existing API:**

Add a version to a definition:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --for-api=<path> --as-version="version_number"
```

**Creating your API versions as a mock**

As the API Blueprint definition allows for example responses to be embedded, these examples can be imported as forced replies, in effect mocking out the API. To enable this mode, when generating a new API or importing as a version, simply add the `--as-mock` parameter.

##### Using Swagger (OpenAPI)

Tyk supports importing Swagger documents to create API definitions and API versions. Swagger imports do not support mocking though, so sample data and replies will need to be added manually later.

**Importing a Swagger document as a new API**

Create a new definition from Swagger:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```
{{< note success >}}
**Note**  

When creating a new definition from an OAS 3.0 spec, you will have to manually add the listen path after the API is created.
{{< /note >}}


**Importing a Swagger document as a version into an existing API**

Add a version to a definition:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --for-api=<path> --as-version="version_number"
```

**Mocks**

Tyk supports API mocking using our versioning `use_extended_paths` setup, adding mocked URL data to one of the three list types (white_list, black_list or ignored). In order to handle a mocked path, use an entry that has `action` set to `reply`:

```json
"ignored": [
  {
    "path": "/v1/ignored/with_id/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Hello World",
        "headers": {
          "x-tyk-override": "tyk-override"
        }
      }
    }
  }
],
```

See [Versioning]({{< ref "getting-started/key-concepts/versioning" >}}) for more details.

#### Import APIs via the Dashboard API

{{% include "import-api-include" %}}

#### Import APIs via the Dashboard UI

##### Step 1: Select "APIs" from the "System Management" section

{{< img src="/img/2.10/apis_menu.png" alt="API listing" >}}

##### Step 2: Click "IMPORT API"

{{< img src="/img/2.10/import_api_button.png" alt="Add API button location" >}}

Tyk supports the following import options:

1. From an Existing Tyk API definition
2. From a Apiary Blueprint (JSON) file
3. From a Swagger/OpenAPI (JSON only) file
4. From a SOAP WSDL definition file (new from v1.9)

To import a Tyk Definition, just copy and paste the definition into the code editor.

For Apiary Blueprint and Swagger/OpenAPI, the process is the same. For example:

Click the "From Swagger (JSON)" option from the pop-up

{{< img src="/img/2.10/import_api_json.png" alt="Import popup" >}}

For WSDL:

{{< img src="/img/2.10/import_api_wsdl.png" alt="Import WSDL" >}}

##### Step 3: Enter API Information

You need to enter the following information:

* Your **Upstream Target**
* A **Version Name** (optional)
* An optional **Service Name** and **Port** (WSDL only)
* Copy code into the editor

##### Step 4: Click "Generate API"

Your API will appear in your APIs list. If you select **EDIT** from the **ACTIONS** drop-down list, you can see the endpoints (from the [Endpoint Designer](https://tyk.io/docs/transform-traffic/endpoint-designer/)) that have been created as part of the import process.

#### Creating a new API Version by importing an API Definition using Tyk Dashboard

As well as importing new APIs, with Tyk, you can also use import to create a new version of an existing Tyk Classic API.

1. Open the API Designer page and select Import Version from the **Options** drop-down.

{{< img src="/img/oas/import-api-version.png" alt="Import API Version Drop-Down" >}}

2. Select either OpenAPI (v2.0 or 3.0) or WSDL/XML as your source API

3. You need to add a new **API Version Name**. **Upstream URL** is optional.

{{< img src="/img/oas/import-api-version-config.png" alt="Import API Version Configuration" >}}

4. Click **Import API**.

{{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

5. Select the **Versions** tab and your new version will be available.
6. Open the **Endpoint Designer** for your API and select your new version from **Edit Version**.
7. You will see all the endpoints are saved for your new version.

{{< img src="/img/oas/version-endpoints.png" alt="Version Endpoints" >}}


### Begin with Tyk Cloud

This section walks you through how to start using Tyk Cloud, creating organization, environment and users before creating an API. If you are in a hurry, try the [Quick Start guide]({{< ref "../deployment-and-operations/tyk-cloud-platform/quick-start.md" >}}) for a 5 min version of this tutorial. 

* Creating your Tyk Cloud account
* Your first Organization
* Creating your first Team and Environment
* Configuring and deploying your Control Plane and creating your Cloud Data Plane
* Adding and testing your first API

At the end of this process you will have a simple API set up via a Tyk Dashboard and you'll see analytics for this API on the Tyk Activity Dashboard.

Depending on your initial requirements in terms of Environments, Teams and Users, the setup process should take between 15 to 30 minutes.

#### Hierarchy

This diagram shows how _Organization, Teams, Environments, Control Planes and Cloud Data Planes_ fit in with each other and which object contains which:

{{< img src="/img/cloud/Onboarding_Diagram_2-1_Ara.png" alt="Hierarchy of Organization, Teams, Environments, Control Planes and Cloud Data Planes" >}}

#### Prerequisites

The following information would be useful so you can set up Tyk Cloud as quickly as possible:

* Team member information including their email address and the role you plan to assign to them.
* We have some specific terminology used within Tyk Cloud. It would be useful to checkout our [Glossary]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md" >}}) so you understand what we are referring to.


### Complete Cloud Setup Tasks


#### Create an Account

You can use Tyk Cloud to manage your APIs effectively and with minimal effort. This page explains how to create an account, in order to start doing so.

##### What happens when you create your Tyk Cloud account?

When you create your Tyk Cloud account, we do the following for you:

* Assign the account creator as a [Billing admin]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) for the Organization. This user role allows you to manage the billing and plans for your org. You can also add other billing admins as required.
* Assign the new account to our [48 hours free trial plan](https://tyk.io/sign-up/#cloud)

##### Creating your first account

[Start here](https://tyk.io/sign-up/#cloud).

* To create your account, you will have to fill in first-level details like your first name, last name and email.
* Then, set up a password for your Tyk Cloud account.
* Following that check the box at the bottom of the page to confirm that you have read and accepted our [Terms and Conditions](https://tyk.io/software-as-a-service-agreement/).
* Finally, click **Create new account**
* After completing the Account Creation form, click **Start Organization Setup**.


#### Set Up Your Organisation

Now that you have created the new Tyk Cloud account with your basic details, it is time to set up your organization. This page will tell you how to set up your organization and also about the two ways of setting it up.

##### What is an organization?

* An organization is the main entity for all your data (Environments, APIs, Users, etc)
* An Organization is connected to a single region and once connected, cannot be changed.
  
##### Steps to set up your organization  

* **Step 1 - Name your Organization:** Give your organization a name. This is up to you, but most users use their company name.

* **Step 2 - Select a Home Region:** Select a region from the drop-down list where your [Control Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) will be deployed and your data stored. The number of regions available will depend on your license. Further regions can be added as an upgrade option.

{{< note success >}}
**Note**
  
Tyk Cloud can currently be deployed across 2 AWS regions in the USA plus UK, Germany and Singapore. If you have any concerns about Brexit impacting the way you store data you should read [AWS regularly updated Brexit statement](https://aws.amazon.com/compliance/gdpr-center/brexit/).
{{< /note >}}

##### Types of Setups

You can now select how to configure your deployment.

**Option 1: Demo Setup**

Our demo setup will quickly configure your first deployment setup automatically, creating your first team, Cloud Control Plane and Cloud Data Plane.

**Option 2: Manual Setup**

This setup option gives you full control on creating the following:

* Teams
* Environments
* Configuration and deployment of Control Planes and Cloud Data Planes

For a manual setup you'll get started by [setting up your first team]({{< ref "/tyk-cloud/getting-started-tyk-cloud/setup-team.md" >}}).

#### Create Your First Team

Following organization setup, you will have to set up your team(s) on Tyk Cloud. This page will tell you all about the process.

##### What is a team?

* A team is a sub-grouping inside an organization. 
* Inside a team, you can define users(team members) and roles(permissions that can be applied to a user or a team of users).

##### Steps to set up your team

After creating your Organization you'll land on the success screen. Click **Get Started**.

* **Step 1 - Name your Team:** Give your [Team]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#team" >}}) a name. You may find it useful to reflect the names used within your organization.

* **Step Two - Invite your Users:** Invite your [users]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#user" >}}) to your team. You'll only need their email address and which of the available [roles]({{< ref "tyk-cloud/troubleshooting-&-support/glossary#role" >}}) you want to assign to them. This step is optional and can be completed within the dashboard later.

##### User Roles in Tyk Cloud

Out of the box, the following roles are setup:

* **Team member:** They can manage deployment activity for the team they are added to.
* **Team admin:** They can manage deployment activity and users for the team they are added to.
* **Organization admin:** They can manage deployment activity and users for a single organization.

Next you'll create an [Environment]({{< ref "tyk-cloud/getting-started-tyk-cloud/setup-environment" >}}).

#### Configure Environment and Deployments

An Environment allows you to group deployments together. In this step we will create an Environment and configure our first Control Plane and Cloud Data Plane deployments.

##### What is an environment?

An environment is a grouping of ‘deployments’ that can have multiple Control Planes and Cloud Data Planes.

##### Steps to set up your environment

* **Step 1 - Name your Environment:** Give your [Environment]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#environment" >}}) a name. You may find it useful to reflect the names used within your organization such as Development, Production etc.
  
* **Step 2 - Name your Control Plane:** Give your [Control Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) a name. Again, this is up to you and you may already have an infrastructure you want to re-create in Tyk Cloud.
  
* **Step 3 - Configure your first Cloud Data Plane:** Select the region you want to locate your [Cloud Data Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#cloud-data-plane" >}}) in from the drop-down list. Your Cloud Data Plane is not confined to the same region as your Organization and Control Plane but the amount of regions you have to choose from can be limited depending on your subscription plan. Give your Cloud Data Plane a name. 

{{< note success >}}
**Note**
  
You need to have at least one Cloud Data Plane with a *Deployed* status connected to your Control Plane.
{{< /note >}}

* **Step 4 - Deployment:**

1. Click [Deploy Control Plane and Create a Cloud Data Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#deploy" >}}). You can watch your Control Plane being deployed and your Cloud Data Plane being created. You will then be taken to the Control Plane overview screen within the Tyk Cloud dashboard.
2. From your Control Plane overview you will see the Cloud Data Plane is in a **Not Deployed** state. Click on your Cloud Data Plane to open its overview.
3. In the top right of your Cloud Data Plane overview, click **Not Deployed** and choose **Deploy** from the drop-down.
4. With your Cloud Data Plane successfully deployed, make a note of the tags assigned to your Cloud Data Plane. One tag is "edge" and the other is the location of your Cloud Data Plane. You'll add a tag when creating your API.

Here's a video on how to set up your Tyk Cloud Environment.

{{< youtube DxoLm0vgsP8 >}}

Next you'll [set up your first API]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}) from the Tyk Dashboard.

#### Deploy and Add Your First API

Your onboarding is now complete! The next step will be to setup a very basic API to demonstrate how APIs are managed within Tyk Cloud.

{{< warning success >}}

Warning

In Tyk Gateway release 5.3.0, Tyk OAS APIs gained feature maturity. Tyk Dashboard will automatically migrate any pre-5.3.0 Tyk OAS APIs to the feature mature standard when you upgrade to 5.3.0 or later. Feature mature Tyk OAS APIs may not work with pre-5.3.0 versions of Tyk Gateway.

It is not possible to rollback to previous versions of Tyk components with Tyk OAS APIs created in 5.3.0.

For further details, please refer to the [release notes]({{< ref "product-stack/tyk-gateway/release-notes/version-5.3.md" >}}) for Tyk Gateway v5.3.0.
{{< /warning >}}

##### Steps to add an API in Tyk Cloud

* **Step 1 - Access the Dashboard:** Go to the Control Plane overview and click the dashboard link in the Ingress list. You'll be redirected to the Tyk Dashboard for your [Control Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}).
* **Step 2 - Add a New API:** Click the APIs menu item and then click **Add New API**.
* **Step 3 - Core Settings:**

  1. Give Your API a name - We'll use "my app" for the rest of this Getting Started journey.
  2. Scroll down to the **Target URL** setting and use the URL https://httpbin.org/
  3. Then scroll down to the Authentication section and select **Open(Keyless)** to keep things simple for this demo.

{{< warning success >}}
**Warning**
  
Ensure you configure a valid API Listen path.  Root ("/") listen paths are **not** supported on Tyk Cloud deployments prior to version v3.2.0.
{{< /warning >}}

* **Step 4 - Advanced Options:**

  1. Click the **Advanced Options** tab of the API Designer.
  2. Scroll to the **Segment Tags (Node Segmentation)** setting and add the cloud data plane tag (edge) you saw when creating the Cloud Data Plane.

{{< img src="/img/cloud/edge_segment_tags.png" alt="Segment Tags" >}}

{{< note success >}}
**Note:**

**How Segment Tags work in Tyk Cloud?**

When a Cloud Data Plane is deployed, the tag 'edge' and a location tag are automatically generated for the Cloud Data Plane. You use these tags to connect your API to the appropriate Cloud Data Plane. It works as follows:

1. Add the **edge** tag to your API to connect it to all Cloud Data Planes within the Control Plane.
2. Add the location tag to your API to connect it to only Cloud Data Planes with that location within the Control Plane.
{{< /note >}}

{{< warning success >}}
**Warning**
  
All APIs must be connected to a Cloud Data Plane by adding the appropriate tag in the *Segment Tags (Node Segmentation)* in the API Designer.
{{< /warning >}}

* **Step 5 - Save Your API:** Click **Save** from the API Designer. Your API will now be added to the APIs list and as the next step you'll access your API from the Gateway Ingress.

Watch our video on Adding an API to your Tyk Cloud Dashboard.

{{< youtube OtQMNKwfXwo >}}

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}


#### Test Your API

Your first API has been added. What's next? Testing it! This page shows how you can test an API that you have added to Tyk Cloud, to ensure that it’s functioning correctly. You'll now access the API you setup in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}) from the Cloud Data Plane within Tyk Cloud.

##### Steps to test your API

* **Step 1 - Access the Gateway Ingress:** From the Cloud Data Plane overview, copy the Ingress link and open it in a browser tab. You will get a 404 error.
  
* **Step 2 - Append the URL with your API:** You created a API named **my app** in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}). Add `/my-app/` to the end of the URL. You should be taken to [https://httpbin.org/](https://httpbin.org/), which you added as the **Target URL** for the API in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api#steps-to-add-an-api-in-tyk-cloud" >}}). 


Next you'll [view the analytics]({{< ref "tyk-cloud/getting-started-tyk-cloud/view-analytics" >}}) for your API in the Dashboard.

#### View Analytics

We have now created and tested our API. How do we know that they are performing well? This page walks you through how to then view your API analytics so that you can ensure your APIs are performing perfectly. 

##### Steps to check your API analytics

* **Step 1 - Access the Dashboard:** You'll now look at the analytics for the API you created in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}).If you're not still in the Tyk Dashboard for your Control Plane, click the dashboard link in the Control Plane Ingress list. Click the Gateway Dashboard menu item and you can see the successful calls made to your API from the Cloud Data Plane you created.
  
* **Step 2 - Create an Error:** From the Cloud Data Plane, make a call that will throw an error. For example, use `me-app` instead of `my-app`. You should see the error displayed in the Analytics.


#### Review Your Setup

This summary page explains the steps required to implement Tyk Cloud, which enables you to manage your APIs seamlessly. 

We've covered the following to get you started with the Tyk Cloud way of managing Tyk deployments:

* We've created a new Organization
* We've added a Team
* We've added an Environment, including a Control Plane and an associated Cloud Data Plane and deployed them
* We've added a very simple API to the Control Plane Dashboard and tested it via the first Cloud Data Plane
* We've seen the data from the Gateways displayed in the Analytics section of the Control Plane Dashboard

We have actually only scratched the surface of what is possible with Tyk Cloud.

What to go through next:

* Managing your Deployments
* Adding [Plugins and Middleware]({{< ref "tyk-cloud/using-plugins" >}}) to your Control Plane


### Additional Cloud Configuration

#### Configure Initial Portal

After deploying your Control Plane, you need to perform some initial configuration for the Developer Portal to prevent seeing any `Page Not Found` errors when trying to access the portal. You need to set up a Home page from the Control Plane Dashboard.

Watch our video on configuring your Tyk Cloud Developer Portal.

{{< youtube 8_SPUake84w >}}

1. From the Control Plane Dashboard, select **Pages** from the **Portal Management** menu
2. Click **Add Page**

{{< img src="/img/2.10/portal-home-page-add.png" alt="Add Portal Page" >}}

3. In the Settings, give your page a name and slug. Below we've called it Home
4. Select **Check to make this page the Home page**
5. Select **Default Home page template** from the Page type drop-down list
6. You can leave the Registered Fields sections for now

{{< img src="/img/2.10/portal-home-page-settings.png" alt="Portal Home page settings" >}}

7. Click **Save**.

You should now be able to access your Portal from **Open Your Portal** from the **Your Developer Portal** menu.

{{< img src="/img/2.10/portal_menu.png" alt="Portal Menu" >}}

##### Further Portal Configuration

Our Developer Portal is completely customizable. See [Portal Customization]({{< ref "tyk-developer-portal/customise" >}}) for more details.

This section covers the administration of the various components of your Tyk Cloud installation:

* [Managing Organizations]({{< ref "tyk-cloud/environments-&-deployments/managing-organisations.md" >}})
* [Managing Environments]({{< ref "tyk-cloud/environments-&-deployments/managing-environments.md" >}})
* [Managing Control Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-control-planes.md" >}})
* [Managing Cloud Data Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways.md" >}})

It also covers links to how to start [managing your APIs]({{< ref "tyk-cloud/environments-&-deployments/managing-apis.md" >}}) via the Tyk Dashboard, accessible from your Control Plane.

#### Manage Environments and Deployments

##### Set Up Organisations

Your Organization is your "container" for all your Environments, Control Planes and Cloud Data Planes. When you setup your Organization when [creating your account]({{< ref "tyk-cloud/getting-started-tyk-cloud/create-account" >}}), you assign it to a Home Region where all your data is stored. You cannot change this home region after creating your organization.

**Organization Overview Screen**

If you are an Organization Admin, when you log in you will see the Overview screen for the Organization you are connected to. If you are a team admin or team member you will see the Team Overview Screen. The Organization Overview screen displays the following info:

* Quick Stats
* All Teams
* All Deployments
* All Environments


**Quick Stats**

{{< img src="/img/admin/tyk-cloud-org-overview.png" alt="Quick Stats" >}}

This section gives you an "at a glance" overview of your organization. This section is designed to show what your plan entitles your organization to and how much of your entitlement is currently used in relation to Teams, Control Planes, Cloud Data Plane Deployments and the distribution of those deployments across the available entitlement regions.

**Teams**

{{< img src="/img/admin/tyk-cloud-org-teams.png" alt="Teams" >}}

This section shows the number of teams created within the organization, the number of environments the team is assigned to, and the Control Plane and Deployed Cloud Data Planes within those environments.

**Deployments**

The default view for this section is Group by Control Plane and shows all deployments across all teams.

{{< img src="/img/admin/tyk-cloud-org-deployments.png" alt="Deployments Grouped by Control Plane" >}}

**Environments**

The Environments section shows the environments created within your organization, the team they belong to and active deployments within each environment.

{{< img src="/img/admin/org_admin_environments.png" alt="Environments" >}}

##### Adjust Environments

Environments are used to group your [Control Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) and [Cloud Data Planes]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#cloud-data-plane" >}}) into logical groups. For example you may want to create environments that reflect different departments of your organization.

{{< note success >}}
**Note**

The number of Environments you can create is determined by your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

**Prerequisites**

The following [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles" >}}) can perform Environment Admin tasks:

- Org Admin
- Team Admin

You should also have created a team to assign to any new environment.

##### Adding a New Environment

1. From the Environments screen, click **Add Environment**
2. Select the team you want to assign to the Environment
3. Give your new Environment a name
4. Click **Create**

##### Editing an Existing Environment

An Org Admin can perform the following:

- Rename an Environment
- Delete an Environment

1. Click the environment Name from your list

{{< img src="/img/admin/tyk-cloud-edit-env.png" alt="Edit Environment Name" >}}

2. Click Edit

{{< img src="/img/admin/tyk-cloud-env-screen.png" alt="Env Edit Screen" >}}

3. You can now rename the environment, or delete it from your organization

{{< img src="/img/admin/tyk-cloud-rename-delete.png" alt="Delete or Rename Env" >}}

{{< warning success >}}
**Warning**

Deleting an environment will also delete all the Control Planes and Cloud Data Planes associated with it
{{< /warning >}}

##### Control Planes

Control Planes are situated in your Organization's home region and provide links to an instance of the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}) and the [Developer Portal]({{< ref "tyk-developer-portal" >}}). The Dashboard is where you perform all your API tasks. The developer portal allows your 3rd party developers access to your APIs. Cloud Data Planes are then connected to your Control Planes.


**Prerequisites**

All [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organization Admin and the Team Admin can create or delete deployments.

**Adding a new Control Plane**

Watch our video on setting up a Control Plane and a Cloud Data Plane.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Control Planes you can add is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

1. From the Deployments screen click **Add Deployment** (you can also add a Deployment from within an Environment overview)
2. Enter a name for the new Control Plane
3. Select Control Plane from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}}) if required
6. (Optional) Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}}) if required

**Edit Control Planes**

You can edit the following Control Plane settings:
* Change the Control Plane name
* Add a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}})
* Change the Bundle Channel and Bundle Version
* Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}})

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

To edit an existing Control Plane:

1. From the Deployments screen, click the **Control Plane Name** from the list
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Edit drop-down" >}}

**Upgrade Control Planes**

To upgrade an existing Control Plane:

1. Go to the **Control Plane settings** using the _Edit Control Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deployed notification" >}}

##### Gateways Configuration

Cloud Data Planes do all the heavy lifting of actually managing your requests: traffic proxying, access control, data transformation, logging and more.


**Prerequisites**

All [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organization Admin and the Team Admin can create or delete deployments.


**Adding a new Cloud Data Plane**

Watch our video on setting up a Control Plane and a Cloud Data Plane.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Cloud Data Planes you can add is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

1. From the Deployments screen click **Add Deployment**
2. Enter a name for the new Gateway
3. Select Cloud Data Plane from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}}) if required
6. (Optional) Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}}) if required

**Edit Cloud Data Planes**

You can edit the following Control Plane settings:
* Change the Gateway name
* Add a [custom domain]({{< ref "tyk-cloud/using-custom-domains" >}})
* Change the Bundle Channel and Bundle Version
* Enable [plugins]({{< ref "tyk-cloud/using-plugins" >}})

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan]({{< ref "tyk-cloud/account-billing/plans" >}})
{{< /note >}}

To edit an existing Cloud Data Plane:

1. On the Deployments screen, expand the Control Plane and click on the Cloud Data Plane to access the Cloud Data Plane overview screen.
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Cloud Data Plane drop-down" >}}


**Upgrade Cloud Data Planes**

To upgrade an existing Cloud Data Plane:

1. Go to the **Cloud Data Plane settings** using the _Edit Cloud Data Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deployed notification" >}}

##### Manage APIs

You can manage your APIs in *Tyk Dashboard* UI. To access it, click on your desired Control Plane name in the [Deployments](https://dashboard.cloud-ara.tyk.io/deployments) screen and then on the *MANAGE APIS* button

From there you have access to the full scope of Tyk API management functionality, including:

* [Adding APIs]({{< ref "getting-started/create-api" >}}) to Tyk, including REST and GraphQL APIs
* Applying Quotas and Rate limits via [Security Policies]({{< ref "getting-started/create-security-policy" >}}) and [Keys]({{< ref "getting-started/create-api-key" >}})
* [Securing]({{< ref "basic-config-and-security/security" >}}) your APIs
* Viewing granular [Analytics]({{< ref "tyk-dashboard-analytics" >}}) for your Tyk managed APIs
* [Transform traffic]({{< ref "advanced-configuration/transform-traffic" >}}) with the Tyk API Designer
* Add integration options such as [SSO]({{< ref "advanced-configuration/integrate/sso" >}}) and [3rd Party IdentityProviders]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}})
* [Adding Segment Tags]({{< ref "tyk-cloud/troubleshooting-&-support/faqs.md#q8-how-do-segment-tags-work-with-tyk-cloud" >}})


##### Deploy Hybrid Gateways

[Tyk Cloud](https://tyk.io/cloud/) hosts and manages the control planes for you. You can deploy the data planes across multiple locations:

- as [Cloud Gateways]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways" >}}): Deployed and managed in *Tyk Cloud*, in any of our available regions. These are SaaS gateways, so there are no deployment or operational concerns.
- as Hybrid Gateways: This is a self-managed data plane, deployed in your infrastructure and managed by yourself. Your infrastructure can be a public or private cloud, or even your own data center.

This page describes the deployment of hybrid data planes and how to connect them to Tyk Cloud, in both Kubernetes and Docker environments.

**Prerequisites**

* Tyk Cloud Account, register here if you don't have one yet: {{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="free trial" >}}
* A Redis instance for each data plane, used as ephemeral storage for distributed rate limiting, token storage and analytics. You will find instructions for a simple Redis installation in the steps below.
* No incoming firewall rules are needed, as the connection between Tyk Hybrid Gateways and Tyk Cloud is always initiated from the Gateways, not from Tyk Cloud.

**Tyk Hybrid Gateway configuration**

The hybrid gateways in the data plane connect to the control plane in Tyk Cloud using the *Tyk Dashboard* API Access Credentials. Follow the guides below to create the configuration that we will be used in later sections to create a deployment:

Login to your Tyk Cloud account deployments section and click on `ADD HYBRID DATA PLANE`

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-configuration-home.png" alt="Tyk Cloud hybrid configuration home" >}}

Fill in the details and then click _SAVE DATA PLANE CONFIG_

  {{< img src="/img/hybrid-gateway/tyk-cloud-save-hybrid-configuration.png" alt="Save Tyk Cloud hybrid configuration home" >}}

This will open up a page with the data plane configuration details that we need.

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


**Deploy with Docker**

**1. In your terminal, clone the demo application [Tyk Gateway Docker](https://github.com/TykTechnologies/tyk-gateway-docker) repository**

```bash
git clone https://github.com/TykTechnologies/tyk-gateway-docker.git
```


**2. Configure Tyk Gateway and its connection to Tyk Cloud**

You need to modify the following values in [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) configuration file:

* `rpc_key` - Organization ID
* `api_key` - Tyk Dashboard API Access Credentials of the user created earlier
* `connection_string`: MDCB connection string
* `group_id`*(optional)* - if you have multiple data planes (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belongs. The data planes in the same group share one Redis.


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

**3. Configure the connection to Redis**

This example comes with a Redis instance pre-configured and deployed with Docker compose. If you want to use another Redis instance, make sure to update the `storage` section in [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid):

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

**4. Update docker compose file**

Edit the <docker-compose.yml> file to use the [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) that you have just configured.

From:

```yml
- ./tyk.standalone.conf:/opt/tyk-gateway/tyk.conf
```
To:

```yml
- ./tyk.hybrid.conf:/opt/tyk-gateway/tyk.conf
```

**5. Run docker compose**

Run the following:

```bash
docker compose up -d
```

You should now have two running containers, a Gateway and a Redis.

**6. Check that the gateway is up and running**

Call the /hello endpoint using curl from your terminal (or any other HTTP client):

```bash
curl http://localhost:8080/hello -i
````

Expected result:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 17 Mar 2023 12:41:11 GMT
Content-Length: 59

{"status":"pass","version":"4.3.3","description":"Tyk GW"}
```

**Deploy in Kubernetes with Helm Chart**
<br>
**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the above [section](#deploy-hybrid-gateways).

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Cloud and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

**1. Set connection details**

Set the below environment variables and replace values with connection details to your Tyk Cloud remote control plane. See the above [section](#deploy-hybrid-gateways) on how to get the connection details.

```bash
MDCB_UserKey=9d20907430e440655f15b851e4112345
MDCB_OrgId=64cadf60173be90001712345
MDCB_ConnString=mere-xxxxxxx-hyb.aws-euw2.cloud-ara.tyk.io:443
MDCB_GroupId=your-group-id
```

**2. Then use Helm to install Redis and Tyk**

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

**3. Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).


**Remove hybrid data plane configuration**
<br>
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

##### Secure Your APIs

If you decide to use Tyk Cloud to protect your APIs, you need to make APIs accessible to your Tyk Cloud Data Planes so that Tyk can connect your clients to them. A common question that arises is, “how do I secure my APIs (backend services)?”.

Here are the most popular ways to secure your APIs.

**1. Mutual TLS or Client authorization**

- This is the most secure method to protect your APIs. With Client  authorization, you need to add your Tyk Gateway certificates to an allow-list in all your backends and they will then accept access requests only from clients that present these pre authorized certificates. There are a few limitations with this approach:
  
    a. Depending on your setup, you might need to add it to every backend service. If you have a Load Balancer (LB), then it can be set at the LB level.
    
    b. Sometimes the LBs (like Application Load Balancers) do not support mTLS and then you need to find other solutions, like Request Signing (below).  Another option that might be possible, is to front your services or your LB with an L7 API Gateway (Like Tyk!) to do mTLS with the Tyk Cloud Data Planes on Tyk Cloud.

- You need to be able to update the list in case certificates expire or get revoked.

**2. Request Signing**

Tyk can [sign the request with HMAC or RSA]({{< ref "product-stack/tyk-gateway/release-notes/archived-releases/version-2.9.md#hmac-request-signing" >}}), before sending it to the API target. This is an implementation of an [RFC Signing HTTP Messages(draft 10)](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-10). This RFC was designed to provide authenticity of the digital signature of the client. In our flow, the Tyk Cloud Data Planes, as the client, using a certificate private key, will add a header signature to the request. The API, using a pre-agreed public key (based on a meaningful keyId identifier) will verify the authenticity of the request coming from your Tyk Cloud Data Plane.
 A limitation is that the APIs or LB need to implement this signature verification and be able to update the certificates as mentioned in Mutual TLS or Client authorization (above).

**3. IP Whitelisting**

 Each Tyk Cloud organization is dedicated to an IP range which is unique to them. This allows you to restrict access to your APIs to only API requests coming from your Tyk Cloud organization.  

IP Whitelisting is susceptible to IP Spoofing, and it is recommended to be combined with an API Key in secure environments.

In order to find your organization’s IP range, please open a support ticket with our support team, which is available to all paying customers.

**4. Post plugin with OAuth flow**

The custom plugin approach is mentioned last because it involves writing a bit of code. However, if your appetite allows for it, custom plugins offer the most flexibility of all these solutions.  You can use Tyk’s custom plugins to execute an OAuth flow, for example, between Tyk (as the client) and your authorization server, and inject a Bearer token into the request. The backend service will need to validate the bearer as usual. You can write [custom plugins]({{< ref "tyk-cloud/using-plugins.md" >}}) in a variety of languages.

**Where to Authenticate?**

No matter which option or combination of options you choose, it is best to keep this authentication layer outside your application logic. This glue code should be placed in your ingress, whatever that might be. By keeping this logic outside your application, you keep a separation between the business logic and the boilerplate code.  You can even use the Tyk Open Source API Gateway as an ingress to protect your APIs, and it is compatible with all the methods mentioned above.

#### Use Custom Domains

You can set up Tyk Cloud to use a custom domain. Using custom domains is available on our free trial and all our paid [plans](https://tyk.io/price-comparison/). You can use a custom domain for both your **Control Planes** and **Cloud Data Planes**.

{{< note success >}}
**note**

Wild cards are not supported by Tyk Cloud in custom domain certificates
{{< /note >}}

**Custom Domains with Control Planes**

* Currently, you can only use **one custom domain** per Control Plane deployment.
* The custom domain in this case ties to a **Tyk Developer Portal**. Please set up a **CNAME DNS** record such that it points to the "Portal" ingress as displayed on your Control Plane deployment page.
  
**Custom Domains with Cloud Data Planes**

You can set multiple custom domains on a Cloud Data Plane. In this instance please set up your CNAME DNS records such that they point to the only ingress displayed on your Cloud Data Plane deployment page.

Note: While you can set multiple custom domains for a Cloud Data Plane, a single custom domain cannot be used for multiple Cloud Data Planes.

**How to set up a Custom Domain**

In this example we are going to set up a custom domain called `Cloud Data Plane.corp.com` for a Cloud Data Plane deployment.

1. Create a CNAME DNS record `edge.corp.com` that points to your Cloud Data Plane ingress (e.g. `something-something.aws-euw2.cloud-ara.tyk.io`).
2. From your Cloud Data Plane deployment, select **Edit** from the Status drop-down.

{{< img src="/img/2.10/edge-dropdown.png" alt="Cloud Data Plane drop-down" >}}

3. Enter `edge.corp.com` in the Custom Domains field.

{{< img src="/img/2.10/edge_custom_domain.png" alt="Cloud Data Plane Custom Domain" >}}

4. Click **Save and Re-deploy**.

{{< img src="/img/2.10/save_redeploy.png" alt="Save and Re-Deploy" >}}

**How our Custom Domain functionality works**

When you point your custom domain to your deployment, we use [Let\'s Encrypt\'s](https://letsencrypt.org/docs/challenge-types/#http-01-challenge) **HTTP01 ACME**  challenge type, which verifies ownership by accessing your custom CNAME on your Control Plane or Cloud Data Plane deployment. For example - `something-something.aws-euw2.cloud-ara.tyk.io` above.

#### Deploy Legacy Hybrid Gateways

{{< warning success >}}
**Warning**

`tyk-hybrid` chart is deprecated. Please use our [Tyk Data Plane helm chart]({{<ref "tyk-cloud/environments-deployments/hybrid-gateways#deploy-in-kubernetes-with-helm-chart">}}) instead. 

We recommend that all users to migrate to the `tyk-data-plane` Chart. Please review the [Configuration]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart#configuration">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

##### 1. Add the Tyk official Helm repo `tyk-helm` to your local Helm repository

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

The helm charts are also available on [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid).

##### 2. Then create a new namespace that will be hosting the Tyk Gateways

```bash
kubectl create namespace tyk
```

##### 3. Get the default values.yaml for configuration

Before proceeding with installation of the chart we need to set some custom values. First save the full original values.yaml to a local copy:

```bash
helm show values tyk-helm/tyk-hybrid > values.yaml
```

##### 4. Configure Tyk Gateway and its connection to Tyk Cloud

You need to modify the following values in your custom `values.yaml` file:

* `gateway.rpc.apiKey` - Tyk Dashboard API Access Credentials of the user created earlier
* `gateway.rpc.rpcKey` - Organization ID
* `gateway.rpc.connString` - MDCB connection string
* `gateway.rpc.group_id`*(optional)*  - if you have multiple data plane (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belong. The data planes in the same group share one Redis instance.
* `gateway.sharding.enabled` and `gateway.sharding.tags`*(optional)*  - you can enable sharding to selectively load APIs to specific gateways, using tags. By default, sharding is disabled and the gateway will load all APIs.

##### 5. Configure the connection to Redis

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


##### 6. Install Hybrid data plane

Install the chart using the configured custom values file:

```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```

You should see the prompt:

```bash
At this point, Tyk Hybrid is fully installed and should be accessible.
```


##### 7. Check that the installation was successful

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

#### Monitor Key Metrics

This section explains the various metrics that are monitored by Tyk Cloud.

##### Throughput
Tyk Cloud counts the total request/response sizes for traffic transferred through a deployment. Throughput metrics are displayed for the current day. These are calculated as the difference between the throughput usage at the current time and the throughput at last midnight.

External traffic is subject to billing, while internal traffic is exempt. The monitoring service aggregates traffic between different services:

{{< img src="/img/cloud/tyk-cloud-monitoring-priced-traffic.png" alt="Monitoring Traffic Pricing" >}}

**Billed traffic**
 - Traffic between user → Control Plane
 - Traffic between user → Cloud Data Plane
 - Traffic between user → Enterprise Developer Portal
 - Traffic between user → Mserv (plugin upload)
 - Traffic between Control Plane → Cloud Data Plane cross region
 - Traffic between Cloud Data Plane → Mserv cross region
 - Traffic between Control Plane → Portal cross region

**Unbilled traffic**
 - Hybrid traffic is currently not counted
 - Traffic between Control Plane → Cloud Data Plane in the same region
 - Traffic between Cloud Data Plane → Mserv in the same region
 - Traffic between Control Plane → Portal in the same region

##### Storage
When a client makes a request to a Tyk Gateway deployment, the details of the request and response are captured and [stored in Redis]({{< ref "tyk-dashboard-analytics/" >}}). Tyk Pump processes the records from Redis and forwards them to MongoDB. Finally, Tyk Cloud reads that data from MongoDB and displays its size(bytes) in the _Storage_ section of _Monitoring_. 


#### Track Usage

##### How to check metrics
Login to Tyk Cloud and click on *Monitoring* within the *Operations* menu. Enable *Throughput* to display throughput metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-throughput.png" alt="Monitoring Throughput" >}}

Enable *Storage* to display storage metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-storage.png" alt="Monitoring Storage" >}}

You can also optionally filter for metrics by date.

{{< img src="/img/cloud/tyk-cloud-monitoring-filtering-by-date.png" alt="Monitoring Metric Filtering" >}}

Here you can see the metrics broken down per environment and a list of the top 5 control and cloud data planes.

{{< img src="/img/cloud/tyk-cloud-monitoring-break-down.png" alt="Monitoring Metric break down" >}}

### Manage Teams and Users

This section covers the following:

- [Managing Teams]({{< ref "tyk-cloud/teams-&-users/managing-teams.md" >}})
- [Managing Users]({{< ref "tyk-cloud/teams-&-users/managing-users.md" >}})
- Available Tyk Cloud [User Roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}})
- [Tyk Cloud Single Sign-On (SSO)]({{< ref "tyk-cloud/teams-&-users/single-sign-on.md" >}})

#### Organise Teams

The following [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) can perform existing Team Admin tasks:

* Organization Admin - Can manage all teams in the organization they are a member of.
* Team Admin - Can only manage the team they are a member of.

For an existing team, you can:

* Change the team name
* Create or delete a team (Organization Admin only)
* Invite and manage users in a team
  
##### Change the team name

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Change the existing name for the team.
4. Click **Save**.

##### Create a new Team

You need to be a [Organization Admin]({{< ref "tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) to create a new team.

1. From the Admin > Teams screen, click **Add Team**.
2. Enter a name for the new team that will be added to the organization.
3. Click **Create**.

##### Delete a team 

You need to be a [Organization Admin]({{< ref "tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) to delete a team.

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Click **Delete Team**.
4. You'll be asked to confirm the deletion. Click **Delete Team** from the dialog box to confirm, or click **Cancel**.

You can now invite users to your new team. See [Managing Users]({{< ref "tyk-cloud/teams-&-users/managing-users.md" >}}) for more details.


### Add and Manage Users

The following [user roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) can perform existing User Admin tasks:

* [Organization Admin]({{< ref "tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) - Can manage all users in the organization they are a member of.
* [Team Admin]({{< ref "tyk-cloud/teams-&-users/user-roles.md#user-roles-within-tyk-cloud" >}}) - Can only manage the users of the team they are a member of.

{{< note success >}}
**Note**

Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can also [add users to the Tyk Dashboard]({{< ref "basic-config-and-security/security/dashboard/create-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs. 
{{< /note >}}

#### Invite a new user to your team

1. From the Teams screen, select the team name.
2. Click **Invite User**.
3. Complete the form for the new user.

#### Editing Existing Users

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. You can change the following details
   * Change the team they are a member of.
   * Change the user role assigned to them.
4. Click Save to update the user info.

#### Delete a User

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. Click **Delete**
4. You'll be asked to confirm the deletion. Click **Delete User** from the pop-up box to confirm, or click **Cancel**.


### Assign User Roles

This section defines the different user roles within Tyk Cloud, so that you can see at a glance what each role does and manage your account accordingly.

#### User Roles within Tyk Cloud

We have the following user roles defined in Tyk Cloud for your team members

* Billing Admin
* Organization Admin
* Team Admin
* Team Member

Billing Admins are responsible for the billing management of the Tyk Cloud account. Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can [add users to the Tyk Dashboard]({{< ref "basic-config-and-security/security/dashboard/create-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs.   

#### Use Case Matrix

The following table shows the scope for each user role.


| Use Case                                          | Billing Admin | Org Admin | Team Admin | Team Members |
|---------------------------------------------------|---------------|-----------|------------|--------------|
| Create a new account                              | X             |           |            |              |
| Create a new organization                         | X             |           |            |              |
| Managing a new account                            | X             |           |            |              |
| Managing an organization entitlement              | X             |           |            |              |
| Ability to create other billing admins            | X             |           |            |              |
| Editing organization name                         | X             | X         |            |              |
| Create team / delete                              |               | X         |            |              |
| Future - Edit team entitlements                   |               | X         |            |              |
| Invite, delete, edit org admins and team admins   |               | X         |            |              |
| Invite, delete, edit team members                 |               | X         | X          |              |
| Create new environments                           |               | X         | X          |              |
| Delete / change environments                      |               | X         | X          |              |
| View environments                                 |               | X         | X          | X            |
| Create and delete cloud data planes               |               | X         | X          |              |
| Create and delete control planes                  |               | X         | X          |              |
| View deployments                                  |               | X         | X          | X            |
| Deploy, undeploy, redeploy, restart a deployment. |               | X         | X          | X            |
| Create and manage basic SSO                       |               | X         | X          |              |
| Upload plugins to the File Server                 |               | X         | X          | X            |
| Delete plugins from File Server                   |               | X         | X          | X            |
| Viewing Analytics                                 |               | X         | X          | X            |

#### Initial Tyk Cloud Account Roles

The user who signs up for the initial Tyk Cloud account is uniquely assigned to two roles:

1. Org admin of the organization
2. Billing admin of the account

This is the only occasion where a user can be assigned to 2 roles. So, for example, if you invite a user to be a Team Admin, that is the only role (and team) they can belong to. For a user to be invited as a Billing admin, they can't have an existing Tyk Cloud account.

{{< note success >}}
**Note**
  
This functionality may change in subsequent releases.
{{< /note >}}

#### Tyk System Integration User (do not delete)

When you click your Control Plane Dashboard link from your Tyk Cloud Deployments Overview screen, you are automatically logged in to your Dashboard. This is due to a default Tyk Integration user that is created as part of the Control Plane deployment process. This user has a first name of `Tyk System Integration` and a last name of `User (do not delete)`. As the last name infers, you should not delete this user or your access to the Dashboard will be broken from your Tyk Cloud Installation.


### Configure Single Sign-On (SSO)

#### What is SSO?
Single Sign-On (SSO) is an authentication process that empowers users to access various services and applications using a single set of credentials. This streamlines the login experience by eliminating the need to remember multiple usernames and passwords for different platforms.

These credentials are securely stored with an Identity Provider(IdP). An Identity Provider (IdP) is a service that stores and manages digital identities. Companies can use these services to allow their employees or users to connect with the resources they need. 

#### Pre-requisites
{{< note success >}}
**Note**

This functionality is a preview feature and may change in subsequent releases.

To be able to configure Single Sign-On authentication, an SSO entitlement needs to be enabled in the subscription plan. 
If you are interested in getting access, contact your account manager or reach out to our [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Cloud Single sign on>)
{{< /note >}}

#### Add new SSO profile
To add a new SSO profile, login to Tyk Cloud, navigate to the _Profile_ list and click on the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-profile-list.png" alt="Tyk Cloud SSO profile list" >}}

Populate the form with all the mandatory fields and click the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-add-profile-form.png" alt="Tyk Cloud SSO add profile form" >}}

The table below explains the fields that should be completed:
| Field name             | Explanation                                                                                                                     |
|----------------------  |---------------------------------------------------------------------------------------------------------------------------------|
| Provider name          | Used to distinguish between different SSO providers.                                                                      |
| Client ID              | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration. |
| Client Secret          | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration.     |
| Discovery URL          | Used to read your IdP's openid configuration. This URL can be found in your chosen IdP provider's configuration.  |
| Default User Group ID  | The ID of the user group that new users are allocated to by default upon registration.                                                                       |
| Only registered users  | A check-box that defines which users are allowed to use SSO. If checked, only users who are already registered in Tyk Cloud are allowed to login with SSO. If un-checked, new users will be added to Tyk Cloud in the _Default_ user group upon successful registration. |


As illustrated below an authentication and callback URL will be generated, once the new profile has been added. You need to add these URLs to the configuration of your chosen IdP provider.
The Auth URL is your custom URL that can be used to start the SSO login flow whereas Callback URL is the URL that the SSO provider will callback to confirm successful authentication.

  {{< img src="/img/cloud/cloud-sso-add-config-details.png" alt="Tyk Cloud SSO example of filled form" >}}

#### Edit SSO profile
To update/re-configure SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile that you would like to update.
  
  {{< img src="/img/cloud/cloud-sso-edit-select.png" alt="Tyk Cloud SSO edit selection" >}}

Edit the fields you would like to change and then click on the _SAVE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-save-edit.png" alt="Tyk Cloud SSO save edit selection" >}}

#### Delete SSO profile
{{< warning success >}}
**Warning**

Please note the action of deleting an SSO profile cannot be undone.

To delete an SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile you would like to remove.
{{< /warning >}}

  {{< img src="/img/cloud/cloud-sso-delete-select.png" alt="Tyk Cloud SSO delete selection" >}}

On the profile page, click on the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-click.png" alt="Tyk Cloud SSO delete accept" >}}

On the confirmation window, confirm by clicking the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-confirm.png" alt="Tyk Cloud SSO delete confirm" >}}

After profile deletion, the authentication URL will not be available anymore. 


### Manage Accounts and Billing
This section covers the following:

* The available [Tyk Cloud Plans]({{< ref "tyk-cloud/account-billing/plans" >}}) and [Addons]({{< ref "tyk-cloud/account-billing/plans#available-add-ons" >}})
* Adding [Payment Methods]({{< ref "tyk-cloud/account-billing/add-payment-method" >}})
* How to [upgrade from the free trial plan]({{< ref "tyk-cloud/account-billing/upgrade-free-trial" >}})
* [Managing Billing Admins]({{< ref "tyk-cloud/account-billing/managing-billing-admins" >}}) on your account
* What to do if your account goes into [retirement]({{< ref "tyk-cloud/account-billing/retirement" >}})

### Select a Payment Plan

Our plans cover every use case scenario, from a free trial, to a global enterprise ready plan. You can also purchase addons to increase your functionality. For details on our available plans and pricing go to [Tyk Cloud Pricing](https://tyk.io/price-comparison/).

Here's an overview of all of the available plans:

| **Plan**          | **Who's it for?**                                                                   | **About**                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48 hours free trial <p>[Free Support SLA]({{< ref "frequently-asked-questions/sla-policies" >}})</p> | This is for POC’s and those testing the Tyk platform. | Tyk Cloud has 48 hours free trial. You can always request a longer trial period or talk to support if you need help. |
| Starter <p>[Standard Support SLA]({{< ref "frequently-asked-questions/sla-policies" >}})</p> | For single teams with low traffic, mostly small businesses that manage few APIs. | This plan includes all of the features of the Tyk Stack. You can have **[custom domains]({{< ref "tyk-cloud/using-custom-domains" >}})** and **[plugins]({{< ref "tyk-cloud/using-plugins" >}})**, along with management of upto 5 APIs. Standard support is provided.|
| Launch <p>[Standard Support SLA]({{< ref "frequently-asked-questions/sla-policies" >}})</p> | For single teams with low traffic, mostly small businesses. | This plan includes all of the features of the Tyk Stack. You can have **[custom domains]({{< ref "tyk-cloud/using-custom-domains" >}})** and **[plugins]({{< ref "tyk-cloud/using-plugins" >}})** along with management of unlimited APIs. Standard support is provided. |
| Grow <p>[Standard Support SLA]({{< ref "frequently-asked-questions/sla-policies" >}})</p> | For single teams with high traffic. | This plan includes all of the features of the Tyk Stack. In this plan, you have **[Hybrid Gateways]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}})** as an add on, along with standard support. |
| Scale <p>[Enhanced Support SLA]({{< ref "frequently-asked-questions/sla-policies" >}})</p> | For global organizations with multiple teams, requiring gateway deployments in multiple locations. | This plan includes all of the features of the Tyk Stack. **Enhanced(silver) support** will be provided. |


{{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="Get started with Cloud free trial" >}}

#### Available add ons

You can purchase the following addons, depending on your plan.

- Additional Control Planes
- Additional Cloud Data Planes
- Additional Users
- Additional Teams
- Additional Gateway Region (Enterprise Plans only)
- SLA support (varies according to your plan)

#### Boostable Overages

Your selected plan comes with limited throughput per month. Overages allow your consumption to go over the monthly limit, which can be an easy way to deal with for example seasonal or unexpected spikes in traffic. The overage level will be automatically charged based on your throughput on a monthly basis.

| Launch          | Entitlement $1,800 | Overage 1 $2,700 | Overage 2 $3,240 | Overage 3 $3,780 | Overage 4 $4,320 |
| --------------- | :----------------: | :--------------: | :--------------: | :--------------: | :--------------: |
| Calls (at 10kb) |        15m         |      18.75m      |      22.5m       |      26.5m       |       30m        |
| Throughput      |       150GB        |     187.5GB      |      225GB       |     262.5GB      |      300GB       |

| Grow            | Entitlement $3,800 | Overage 1 $5,700 | Overage 2 $6,840 | Overage 3 $7,980 | Overage 4 $9,120 |
| --------------- | :----------------: | :--------------: | :--------------: | :--------------: | :--------------: |
| Calls (at 10kb) |        100m        |       125m       |       150m       |       175m       |       200m       |
| Throughput      |        1TB         |      1.25TB      |      1.5TB       |      1.75TB      |       2TB        |

| Scale           | Entitlement $6,800 | Overage 1 $10,200 | Overage 2 $12,240 | Overage 3 $14,280 | Overage 4 $16,320 |
| --------------- | :----------------: | :---------------: | :---------------: | :---------------: | :---------------: |
| Calls (at 10kb) |         1b         |       1.25b       |       1.5b        |       1.75b       |        2tb        |
| Throughput      |        10TB        |      12.5TB       |       15TB        |      17.5TB       |       20TB        |

#### Changing plans

You can upgrade or downgrade your current plan at any point in your billing cycle and your payment will be pro-rata'd to reflect the new payment.

#### Downgrading plan requirements

If you downgrade your plan, the new plan may have less entitlements than your current plan. You will need to restructure your organization to comply with the new plan entitlements before the downgraded billing starts.

#### Checking the Tyk Cloud status

If you want to check if there are issues with the environments and any upcoming down times, you can go to the [Tyk Status](https://status.tyk.io/) page.


### Add Payment Methods

This section provides a step-by-step guide on how to add a payment method to your Tyk Cloud account, ensuring uninterrupted access to your API management services.

#### Adding a payment method to your account

**Note:** You must have *Billing Admin* user rights to add a payment method. 

Follow these steps:

1. Ensure you are logged in to *Tyk Cloud UI* as a Billing Admin user.
2. Navigate to <a href="https://account.cloud-ara.tyk.io/payment-method" class="external-links" target="_blank" rel="noopener">ACCOUNT & BILLING --> Payment Method</a>. If you lack the necessary user rights, you will be directed to the main [OPERATIONS](https://dashboard.cloud-ara.tyk.io/) screen (the main login page).
3. Enter your card details and click *Save*.
4. You'll see a confirmation that the payment method was successfully added.

{{< note success >}}
**Note about card payments**
  
Currently, *Tyk Cloud* exclusively supports card payments. For alternative payment methods, please [contact us](https://tyk.io/contact/).
{{< /note >}}

#### Payment Method Maintenance

As a *Billing Admin* user, you have the ability to edit or delete an existing payment method. Deleting a payment method without adding a new one will result in your plan going into [retirement]({{< ref "tyk-cloud/account-billing/retirement" >}}) at the end of your current billing cycle.

### Upgrade Your Free Trial

This section explains how you can upgrade your free trial of Tyk Cloud to a full account, to continue enjoying the benefits of Tyk Cloud.

#### My free trial is coming to an end. What are my options?

Every new Tyk Cloud account is assigned to a 48 hour free trial. You have the following options:

* Upgrade to a paid plan at any stage of the free trial period.
* Use the free trial period and upgrade after it expires

#### What happens if my free trial expires?

If your free trial ends without you upgrading, your account enters what we call [retirement]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#retirement" >}}).

#### What does upgrading a free trial account involve?

To upgrade your free trial, you (as a Billing Admin) need to:
* Add a [payment method]({{< ref "tyk-cloud/account-billing/add-payment-method" >}}) to your organization
* Select a new [plan]({{< ref "tyk-cloud/account-billing/plans" >}}) from our list

#### I've trialled more than what my desired paid plan allows.

During the free trial we give you the same access as our Enterprise Global plan. When you come to the end of your free trial, you may want to subscribe to a plan such as 'Proof of Concept' which only allows 1 Environment, Cloud Control Plane and Cloud Data Plane. If you had an excess of these set up during your free trial, you would need to remove the appropriate amount of Environments etc from your Organization in order to start the paid plan. But don't worry, we'll let you know what you need to remove when you go to purchase a plan. 


### Managing Billing Admin

This page explains what a Tyk Cloud billing admin can do as part of your API management process, giving you complete control over your API management.

As a Billing Admin you can perform the following:

* Add, edit and delete [payment methods]({{< ref "tyk-cloud/account-billing/add-payment-method" >}})
* Add further users as Billing Admins
* Upgrade or downgrade plans

#### Adding a new Billing Admin

{{< note success >}}
**Note**
  
To be added as a Billing Admin, a user cannot have an existing Tyk Cloud account.
{{< /note >}}

##### Prerequisites

To add a new Billing Admin team member requires you to have one of the following roles:

* Be an existing Billing Admin
* Be the account creator Organization Admin (this user also has the Billing Admin role assigned to them)

1. Select **Account & Billing** from the Admin menu (if you only have Billing Admin permissions you will automatically be logged into the Account and Billing area).

{{< img src="/img/admin/tyk-cloud-account-billing-menu.png" alt="Account & Billing menu" >}}

2. Select **Billing Admins** from the Accounts & Billing menu

{{< img src="/img/admin/billing-admins.png" alt="Billing Admins menu" >}}

3. Click **Invite Billing Admin**

{{< img src="/img/admin/invite-billing-admin.png" alt="Invite Billing Admin" >}}

4. Complete the Billing Admin form and click **Send Invite**

#### Removing Billing Admin Access

For this release, removing a billing Admin is not allowed. We can remove a Billing Admin manually, so contact your Account Manager if you need to remove a Billing Admin user.

### Retire Your Account

This section explains what it means when your Tyk Cloud account goes into retirement and what your options are when it does, from account reinstatement to closure.

Your plan will go into [retirement]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#retirement" >}}) in the following scenarios:

* Your subscription is manually canceled by a Billing Admin.
* Your periodic subscription payment fails.
* You are on a Free Trial (5 weeks) and have not signed up to a plan before the expiration of the Free Trial.

#### What does retirement mean?

When a plan goes into retirement, it means your Organization, Teams and any Environmenmts and APIs you manage are suspended for a grace period of up to 30 days and you won't be able to add or edit, only remove.

#### How can I end retirement?

Your Billing Admin needs to do one of the following:

* Renew a subscription that was manually canceled.
* Update your payment details and any outstanding payments are cleared.
* Update a Free Trial to a paid plan, and payment is successful.

#### What happens at the end of the 30 day retirement period?

At the end of the 30 day retirement period if you have not restored or created a relevant subscription, all your data will be deleted.


### Using Plugins

This section explains that you can use plugins with Tyk Cloud and links to details of Python, JSVM and Golang based plugins.

Tyk Cloud allows you to take advantage of Tyk's plugin architecture that allows you to write powerful middleware. For this version of Tyk Cloud, we support the use of Python, JavaScript Middleware and Golang based plugins.

For more details, see: 
* [Python Plugins]({{< ref "plugins/supported-languages/rich-plugins/python/python" >}})
* [JSVM]({{< ref "plugins/supported-languages/javascript-middleware" >}})
* [Golang]({{< ref "plugins/supported-languages/golang" >}})

Next you'll set up an Tyk Cloud Control Plane to use a Python Authentication Plugin.

#### Setup Control Plane


This page explains how to set up a control plane with plugins to customize it on Tyk Cloud, so that you can ensure your API management solution is as effective as possible. 

##### What do I need to do to use Plugins?

{{< img src="/img/plugins/plugins_enable.png" alt="Plugins Settings" >}}

1. You need to enable Plugins on a Control Plane and on a Cloud Data Plane.
2. You need to enter Provider details to enable you to store and access your plugins. For this version of Tyk Cloud, we are supporting Amazon AWS S3. If you haven't got an AWS S3 account, go to [https://aws.amazon.com/s3/](https://aws.amazon.com/s3/) and set one up. You will need the following details to configure SW3 within your Control Plane:
   * Your AWS Key ID
   * Your AWS Secret
   * Your AWS Region

{{< note success >}}
**Note**

For this release of Tyk Cloud, you need to enter your AWS Region manually. You also need to consider that uploading a custom plugin bundle to Tyk Cloud results in a new bucket being created for each bundle uploaded.  It also requires that Tyk Cloud has permissions in the form of an AWS IAM policy to have create rights on AWS.
{{< /note >}}

##### AWS IAM Policy

**What is an IAM Policy?**

- A policy is an entity that, when attached to an identity or resource, defines their permissions. IAM policies define permissions for an action regardless of the method that you use to perform the operation.

- We have included a sample IAM policy that you need to create in AWS to allow the plugin bundle to work. For more information on creating IAM policies, see the [AWS Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html).

{{< warning success >}}
**Warning**
  
We recommend you restrict your IAM user as much as possible before sharing the credentials with any 3rd party, including Tyk Cloud. See [IAM User Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html) for more details.
{{< /warning >}}

```.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:DeleteBucket"
            ],
            "Resource": "arn:aws:s3:::mserv-plugin-*"
        },
        {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::mserv-plugin-*/*"
        }
    ]
}
```

Next you'll [set up the Python authentication code bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/python-code-bundle/).


### Uploading your Bundle

This section walks you through uploading your bundle as part of the process of Python custom authentication on Tyk Cloud, so that you can ensure your API management solution is as effective as possible.

#### How do I upload my bundle file to my Amazon S3 bucket?

We are going to use a Tyk CLI tool called **mservctl**. This acts as a file server for our plugins. You use it to push your plugin bundle to your S3 bucket. Your Tyk Cloud Tyk Gateway will use **MServ** to retrieve your bundle, instead of connecting directly into S3.

#### Prerequisites

1. You need to install the mserv binary according to your local environment from the following repo - https://github.com/TykTechnologies/mserv/releases. Linux and MacOS are supported.

2. From your Control Plane you need the following settings.

{{< img src="/img/plugins/fileserver_settings.png" alt="File Server Settings" >}}

   * Your Tyk Cloud Control Plane Ingress File Server Endpoint (1)
   * Your File Server API Key (2)

#### How does mservctl work?

You create a config file (in YAML) that contains your Control Plane settings that connects to your S3 bucket. You then use a `push` command to upload your `bundle.zip` file to your bucket.

##### mservctl settings - Mac

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.macos.amd64
```
##### mservctl settings - Linux

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.linux.amd64
```

The help for mservctl will be displayed. We will be using the config file options for this tutorial.

```.bash
$ mservctl help
mservctl is a CLI application that enables listing and operating middleware in an Mserv instance.
Use a config file (by default at $HOME/.mservctl.yaml) in order to configure the Mserv to use with the CLI.
Alternatively pass the values with command line arguments, e.g.:
$ mservctl list -e https://remote.mserv:8989
Set TYK_MSERV_LOGLEVEL="debug" environment variable to see raw API requests and responses.
Usage:
  mservctl [command]
Available Commands:
  delete      Deletes a middleware from mserv
  fetch       Fetches a middleware record from mserv
  help        Help about any command
  list        List middleware in mserv
  push        Pushes a middleware to mserv
Flags:
      --config string     config file (default is $HOME/.mservctl.yaml)
  -e, --endpoint string   mserv endpoint
  -h, --help              help for mservctl
  -t, --token string      mserv security token
Use "mservctl [command] --help" for more information about a command.
```

{{< note success >}}
**Note**
  
You may have to change the CHMOD settings on the binary to make it executable. (`chmod +x <filename>`). On MacOS you may also need to change your security settings to allow the binary to run.
{{< /note >}}

#### Creating the mserv config file

1. Create a file (we'll call it `python-demo.mservctl.yaml`)
2. Copy your Control Plane File Server endpoint URL and use it for your `endpoint` flag. Remember to prepend it with `https://`.
3. Copy your File Server API Key and use it for your `token` flag

Your `python-demo.mservctl.yaml` config file should now look like this:

```.yaml
endpoint: https://agreeable-native-mgw.usw2.ara-staging.tyk.technology/mserv
token: eyJvcmciOiI1ZWIyOGUwY2M3ZDc4YzAwMDFlZGQ4ZmYiLCJpZCI6ImVmMTZiNGM3Y2QwMDQ3Y2JhMTAxNWIyOTUzZGRkOWRmIiwiaCI6Im11cm11cjEyOCJ9
```

##### Uploading To Your S3 Bucket

1. We are going to use the MacOS binary here, just substitute the binary name for the Linx version if using that OS. Note we have our YAML config file in the same directory as our bundle.zip file. Run the following mserv `push` command:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml push ~/my-tyk-plugin/bundle.zip
```
2. You should get confirmation that your middleware has been uploaded to your S3 bucket.

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
Middleware uploaded successfully, ID: 9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b
```
3. You will notice that the middleware uploaded has been given an ID. We are going to use that ID with an API that allows you to specify specific middlware. You can also check the contents of the middleware you have just uploaded using the mservctl `list` command. Run:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list
```

4. You will see the list of middleware you have pushed to your S3 Bucket

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  ```
5. If you use the -f flag with the list command, you will see the functions within your middleware listed:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list -f
```
6. As you can see, the 2 middleware hooks specified within your `manifest.json` are returned:

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE               FUNCTION          TYPE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  MyPostMiddleware  Post
  MyAuthMiddleware  CustomKeyCheck
```

Next you will [create an API]({{< ref "tyk-cloud/configuration-options/using-plugins/api-test" >}}) from our Control Plane and see our middleware in action.

### Test Middleware

This section explains how to test out your Python custom authentication on Tyk Cloud, to ensure that it’s working properly. 

#### Testing our middleware with an API

You now have your middleware uploaded to your S3 bucket. We are now going to create an API from our Control Plane Dashboard and test it via Postman

##### Prerequisites

* A Postman API Client from https://www.postman.com/product/api-client/
* Your mserv middleware ID
* The `auth` value token from your `middleware.py` code

##### Create your API

1. From your Control Plane in Tyk Cloud, click the *Ingress > Dashboard link*

{{< img src="/img/plugins/control_plane_dashboard_link.png" alt="Dashboard Link" >}}

2. From the Dashboard screen, click **APIs** from the System Management menu

{{< img src="/img/plugins/apis_menu.png" alt="APIs Menu" >}}

3. Click **Add New API**
4. From the API Designer, enter the following in the **Core Settings** tab:
   * From the API Settings section, give your API a name. We'll name this example "test"
   * Scroll down to the Authentication section and select **Custom authentication (Python, CoProcess and JSVM plugins)** from the drop-down menu
   * Select the **Allow query parameter as well as header** option
5. From the Advanced Settings tab enter the following:
   * In the Plugin Options, enter the **Plugin Bundle ID** as returned by mservctl. In our example `9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b`
   * To propagate your API to all your Cloud Data Plane Tyk Gateways connected to your Control Plane, you need to add the tag **edge** in the **API Segment Tags section**
6. Click **Save**.

You now have an API called "test" which has as its target the httpbin test site.

#### Testing Your API

You now need to test your API to show how the Python Authorization middleware works. We are going to use the Postman client for our testing.

1. First, a quick test. Copy the URL of your Cloud Data Plane (Note the "edge" tag in the tags column) and paste it in a browser tab. You should get a **404 page not found error**.
2. Then add the "test" endpoint to the URL in your browser tab, so in our example `uptight-paddle-gw.usw2.ara.app/test/`. You should now see a **403 "error: "forbidden"**. This is because your API has Authentication enabled and you haven't provided the credentials yet.
3. Open up your Postman client:
   * Paste your Gateway URL with the API appended to the request - (`uptight-paddle-gw.usw2.ara.app/test/`)
   * Click **Send**. You'll see the **403 "error: "forbidden response"** again
   * In the Headers section in Postman, select **Authorization** from the Key column. Add some random text in the Value field and click **Send**. You should again see the **403 error**.
   * Now replace the random text with the `auth` value from your Python code. In our example `47a0c79c427728b3df4af62b9228c8ae` and click **Send** again.
   * You should now see the **HTTPB** in test page

{{< img src="/img/plugins/postman_success.png" alt="Postman Success" >}}

4. As a further test of your plugin, you can add `get` to your API request in Postman. So in our example `uptight-paddle-gw.usw2.ara.app/test/get`. Click **Send**. This will return all the get requests, including headers. You should see the `x-tyk-request: "something"` which is the post middleware hook you set up in the Python code.

{{< img src="/img/plugins/postman_all_get_requests.png" alt="Postman All Get Requests" >}}

##### What we have covered

* You've created a middleware Authorization plugin with Python
* You've uploaded this to your Control Plane Amazon S3 bucket using our mservctl tool
* You've created an API in your Control Plane Dashboard with your middleware bundle ID using our custom autherntication method and tagged it so it is accessable from the Cloud Data Plane Tyk Gateways connected to your Control Plane
* You've tested that the authentication works by using the Postman REST API client.

### Create a Python Code Bundle

This section demonstrates how to create a Python code bundle as part of the custom authentication process for Tyk Cloud, so that you can ensure your API management solution is as effective as possible.


#### What do I need to do to create my Plugin?

* You need to create the Python code bundle on your locally installed Gateway (not an Tyk Cloud Cloud Data Plane stack).
* You will create 2 files, a manifest file (`manifest.json`) and the python file (`middleware.py`)
* You then create a zipped bundle via our Tyk CLI tool that is built in to your local Gateway instance.
  
#### Creating the Plugin bundle

##### Step 1: Create your working directory

The first step is to create a directory for your plugin bundle files:

```.copyWrapper
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

##### Step 2: Creating the Manifest File

The manifest file contains information about your plugin file structure and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to have the following contents:

```.json
{
  "custom_middleware": {
    "auth_check": {
      "name": "MyAuthMiddleware"
    },
    "pre": [
      {
        "name": "MyAuthMiddleware"
      }
    ],
    "driver": "python"
  },
  "file_list": [
    "middleware.py"
  ]
}
```
**File description**

| File              | Description                                                                                                                                                                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom_middleware | contains the middleware settings like the plugin driver you want to use (driver) and the hooks that your plugin will expose. We use the   **auth_check** for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}). |
| file_list         | contains the list of files to be included in the bundle. The CLI tool expects to find these files in the current working directory.                                                                                                                                                               |
| name              | references the name of the function that you implement in your plugin code: **MyAuthMiddleware**                                                                                                                                                                                                  |
| middleware.py     | an additional file that contains the main implementation of our middleware.                                                                                                                                                                                                                       |

##### Step 3: Creating the middleware.py file

* You import decorators from the Tyk module that gives us the Hook decorator, and we import [Tyk Python API helpers]({{< ref "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods" >}})

* You implement a middleware function and register it as a hook. The input includes the request object, the session object, the API meta data and its specification. The hook checks the authorization header for a specified value. In this tutorial we have called it `Authorization`.

```.python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def MyAuthMiddleware(request, session, metadata, spec):
    auth = request.get_header('Authorization')
    if not auth:
        auth = request.object.params.get('authorization', None)

    if auth == '47a0c79c427728b3df4af62b9228c8ae':
        session.rate = 1000.0
        session.per = 1.0
        metadata["token"] = auth
    return request, session, metadata

@Hook
def MyPostMiddleware(request, session, spec):
    tyk.log("This is my post middleware", "info")
    request.object.set_headers["x-tyk-request"] = "something"
    return request, session
  ```

**File description**

| File                      | Description                                                                    |
|---------------------------|--------------------------------------------------------------------------------|
| `MyAuthMiddleware`  @hook | checks for a value. If it is found it is treated as your authentication token. |
| `MyPostMiddleware`  @hook | adds a header to the request. In this tutorial  `something`                    |                                                                             |

##### Step 4: Create the Plugin Bundle

* You create a bundle to cater for a number of plugins connected to the one API, and using a bundle makes this more manageable.

* To bundle your plugin we run the following command in your working directory where your manifest.json and plugin code is.

```.bash
docker run \
  --rm \
  -v $(pwd):/cloudplugin \
  --entrypoint "/bin/sh" -it \
  -w "/cloudplugin" \
  tykio/tyk-gateway:v3.1.2 \
  -c '/opt/tyk-gateway/tyk bundle build -y'
```

* A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The -y flag tells the Tyk CLI tool to skip the signing process in order to simplify this tutorial. For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#how-plugin-bundles-work" >}}).
* You should now have a `bundle.zip` file in the plugin working directory.
* Next you will configure [uploading your plugin bundle file]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your Amazon S3 bucket.


### Add Custom Authentication

This section introduces the process of configuring a custom authentication plugin, so that you can override the default Tyk authentication mechanism with your own authentication logic. 

#### What are we going to do?

We are going to configure an Tyk Cloud Control Plane to use a custom authentication plugin built in Python.

#### What do I need to configure the Tyk Cloud Control Plane?

Here are the requirements:

1. Firstly you will need a local Tyk Gateway installation that allows you to create your Python plugin bundle. We recommend [installing our Self-Managed version on Ubuntu Bionic 18.04]({{< ref "tyk-on-premises/debian-ubuntu" >}}).
2. Ensure you have a currently stable [Python 3.x version](https://www.python.org/downloads/) installed 
3. You need install the build tools `apt-get install -y build-essential`
4. Install our required modules:

```{.copyWrapper}
apt install python3 python3-dev python3-pip
pip3 install protobuf grpcio
```

### Access Troubleshooting Resources

#### FAQs

##### Q1: Is a Cloud Data Plane Deployment considered highly available? Do I need to deploy multiple Cloud Data Planes to a single Data Center?

A: On a Production plan and higher there are at least two Gateway instances at all times, usually in different
availability zones within a single region (in cloud provider terms).

##### Q2: What are the performance benchmarks of a single Cloud Data Plane?

A: In Phase 2 we plan to allow users to choose from a pool of "runtimes" that provide different performance targets, so
they'll be able to have a Tyk Cloud environment with Cloud Data Planes that can sustain more load and then another environment
(e.g. for testing) that sustains less.

##### Q3: How can I geo-load balance across multiple Cloud Data Planes? Why should I want to?

A: The use case to deploy multiple Cloud Data Planes is either segregating regional traffic and/or segregating APIs.
This doesn't necessarily concern High Availability.

The number of actual Gateway instances within a single Cloud Data Plane deployment varies, auto-scales and load balances depending
on the plan.

If you deploy several Cloud Data Planes and want to use it to e.g. geo-load balance it's currently your responsibility to put such
a system into place, but we have plans to help with this in later phases.

##### Q4: What instance sizes/VMs does a Gateway run on?

A: You won't need to worry. We abstract all the resources and only provide performance "targets". See Q2.

##### Q5: Can I connect my own Hybrid Gateways?

A: Yes. The MDCB Ingress URL is given in the Control Plane details page, which allows for connecting a Hybrid Gateway.

##### Q6: Can we use SSO in the Dashboard and/or Portal?

A: Yes, as of v3.0.0, TIB is integrated into Tyk Dashboard, meaning that once a Control Plane is deployed, a user can
go into the Identity Management section of Tyk Dashboard and setup SSO with their IdP for both the Dashboard and
Developer Portal.

##### Q7: How do I view Gateway/Dashboard logs for troubleshooting?

A: This will be exposed in later phases per deployment.

##### Q8: How do Segment tags work with Tyk Cloud?

A: When a Cloud Data Plane is deployed, the tag 'edge' and a location tag are automatically generated for the Cloud Data Plane. You use these tags to connect your API to the appropriate Cloud Data Plane. It works as follows:

* Add the **edge** tag to your API to connect it to all Cloud Data Planes within the Control Plane.
* Add the location tag to your API to connect it to only Cloud Data Planes with that location within the Control Plane.

To add either of the tags, see [Adding an API](#steps-to-add-an-api-in-tyk-cloud) in the Getting Started section.

{{< warning success >}}
**Warning**
  
You must add one of the above tags to any API you add to your Control Plane Dashboard.
{{< /warning >}}

#### Glossary

##### Account Terms

**Account**

The highest level container for one or more Organizations.

**Organization**

The main entity for all your data (Environments, APIs, Users, etc). An Organization is connected to a single region and once connected, cannot be changed.

**Team** 

A sub-grouping within an Organization.

**User**

A person who is a member of a Team with a set of permissions.

**Role**

A set of data and access permissions that can be applied to a user or team of users. See [User Roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) for more details.

**Profile**

The place that holds personal information for a user.

**Subscription**

A set of allowances assigned to an Organization (made up of plan+addons+settings).

**Plan**

A portion of allowances (without add-ons) that feed into the main subscription.

**Operations**

The place to manage all deployments for an Organization or Team. 

**Environment**

A grouping of 'deployments' that can have multiple Control Planes and Cloud Data Planes.

**Stack**

The high level name for the set of configurations making up different types of deployments.

**Control Plane**

A deployment type: A single management layer for data in one region (where all the data lives).

**Cloud Data Plane**

A deployment type: Additional workers with varying functionality that are linked to the main control plane and can be deployed in a different region from the Control Plane.

**Instance**

Used to control traffic and scale in a Tyk Gateway.

**Dashboard**

The Tyk Analytics Dashboard to manage APIs and services.

**Retirement**

Where an Organization has expired due to either a subscription failure or cancelation and is now within a "retirement" period of 30 days, during which an [Billing Admin]({{< ref "tyk-cloud/teams-&-users/user-roles#user-roles-within-tyk-cloud" >}}) can reinstate full functionality by updating or creating a new subscription.

##### Action Terms

**Deploy**

Deploy a not yet deployed state (a first time deployment).

**Undeploy**

Temporarily remove a deployed status but keep all data and configuration.

**Redeploy**

Redeploy from a deployed state. Used for troubleshooting.

**Destroy**

Permenantly remove a deployment and all associated data and configurations.

**Create**

Date and time of time a deployment was initially created.

**Add**

Add a new 'user' or 'team' etc.

**Remove**

Remove things that have been added e.g. users and teams.

**Update**

Saving a change to a configuration.

**Edit**

Changing configuration or information on any of the deployments or other resources such as users or teams.

##### State Terms

**Deployed**

A deployment that is currently deployed.

**Undeployed**

A deployment that was deployed but has been undeployed.

**Not Deployed**

A deployment that has never been deployed.

**Destroyed**

A deployment that has been permenantly deleted and will not be visible in the operations console.

**Unsuccessful**

When there has been an error in the deployment process.

**Deploying**

When a deployment is being deployed.

**Undeploying**

When a deployment is being undeployed.

##### Roles and Permissions

See [User Roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) for more details

**Super Administrator**

Can do everything across all organizations

**Organization Admin**

Can do everything within the scope of the one organization they have access to.

**Team Admin**

Can do everything within the scope of the one team they have access to.

**Team Member**

Can only view and manage the overview, environments and deployments.



## Configure Tyk Self-Managed

### Quick Start

New to *Tyk Self Managed*? Click the button below to kickstart your journey with the basics.

**Important note:** Upon clicking, you will need to sign up. Take advantage of a free guided evaluation of the *Tyk Dashboard & Developer Portal*, and receive your temporary license along with installation instructions during the process. Alternatively, to get started quickly, get a 48 hour trial of Tyk Cloud and get access to all features and capabilities of Tyk without the need to install. 


{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Get started" >}}

#### What’s Included in the Quick Start?
- View an example API secured through the Tyk Gateway, configured with rate limiting.
- Login to Tyk Dashboard to view API analytics and update the configuration of the API (e.g. with further authentication options).
- Update rate limits for the example API.

#### Trial Prerequisites
The recommended way to start your evaluation is via *Docker*. Follow the [instructions](https://docs.docker.com/get-docker/) to install *Docker*.


#### Next Step - Proof of Concept (PoC)

You have completed the quick start guide above and wonder what's next, please read below.

##### PoC Guide 
To find out more, visit our [Tyk Technical PoC Guide](https://tyk.io/customer-engineering/poc/technical-guide/).

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}


##### Tyk Demo - The Perfect PoC Experience
Head over to our **Tyk Demo** guides in [Kubernetes]({{<ref "getting-started/quick-start/tyk-k8s-demo">}}) or [Docker]({{<ref "getting-started/quick-start/tyk-demo">}}). These guides, with zero to none effort, will spin up the full Tyk infrastructure (Tyk stack) with examples of Tyk's capabilities and integrations out-of-the-box.


### Understand Licensing and Deployment Models

Tyk Self-Managed is the easiest way to install Tyk Full Lifecycle API Management solution in your infrastructure. There is no calling home, and there are no usage limits. You have full control. 

When selecting a Tyk Self-managed license [(see the pricing page to compare the licenses)](https://tyk.io/price-comparison), you can choose between three deployment models: [Launch]({{< ref "licensing.md#launch---perfect-to-get-started" >}}), [Flex]({{< ref "licensing.md#flex---for-multiple-teams-within-a-single-data-center-or-cloud" >}}) and [Global Multi-team]({{< ref "licensing.md#global-multi-team---for-the-largest-global-enterprises-at-scale" >}}). Read below to learn which model fits best for your scenario. 

Are you still figuring out your requirements for your deployment around performance, resilience, availability, latency, or multi-region deployment? Look at our [API management architectural and deployment patterns 101](https://tyk.io/blog/res-api-management-architectural-and-deployment-patterns-101/) post to learn more. 

#### 3 questions to ask yourself to select your deployment model

##### 1. How many environments do you manage?

An environment is a single grouping of a control plane and multiple gateways, representing your development lifecycle. For example, staging and production would be 2 environments. 

If you have teams working on two different projects, deployed in different environments, you might have 4 different environments (staging and prod for project number 1, staging and prod for project number 2). Or, you can leverage multi-tenancy with RBAC to onboard multiple teams onto the same environment to be more cost effective. You can read more about that scenario in the blog post [How to manage multiple teams with Tyk Self-Managed](https://tyk.io/blog/easy-api-management-with-tyk-self-managed/).

You get extra developer licenses (a single control plane with 1 connected gateway for local testing on a developer's workstation) for development and testing on local computers. 

##### 2. How many gateways do you need per environment?

We recommend a minimum of 2 gateways per environment for redundancy & fail over. Rolling updates or blue green deployment might require additional gateways to ensure high availability during deployments.

You might also need more depending on your average load or to handle seasonal peak traffic. See [Planning for Production]({{< ref "planning-for-production.md" >}}) to learn more. 

##### 3. Are you deploying your software stack in multiple regions or datacenter?

Do you need support for centrally managing your APIs while deploying edge gateways into multiple regions or datacenter? Do you want to ensure [data sovereignty](https://tyk.io/blog/strategies-for-dealing-with-data-sovereignty-at-scale/) in each of the regions you are deploying your APIs?

#### Launch - perfect to get started

✅ For single teams just getting started

{{< img src="/img/diagrams/tyk-selfmanaged-launch.png" alt="Tyk Self-managed Launch">}}

#### Flex - for multiple teams within a single data center or cloud 

✅ For multiple teams that require high availability and horizontal scaling <br/>
✅ For Kubernetes-based deployment within one cluster / region 

{{< img src="/img/diagrams/tyk-selfmanaged-flex.png" alt="Tyk Self-managed Flex">}}

#### Global Multi-team - for the largest global enterprises at scale

✅ For managing your APIs centrally while deploying edge gateways in independent clusters / regions <br />
✅ For the highest availability across data centers <br />
✅ For Kubernetes-based deployment in multiple cluster / multiple regions <br />
✅ For larger organizations [with multiple teams]({{< ref "tyk-multi-data-centre.md" >}}) and [data sovereignty](https://tyk.io/blog/strategies-for-dealing-with-data-sovereignty-at-scale/) requirements <br />

The license starts with 3 environments and 2 regions, can be extended to more environments and regions as needed.

{{< img src="/img/diagrams/tyk-selfmanaged-multiteam.png" alt="Tyk Self-managed Global Multi-team">}}


#### Don't see what you need?

[Contact us](https://tyk.io/contact/) to discuss custom or enterprise deployments.


### Choose Installation Type for Tyk Self-Managed

#### Use Kubernetes

The main way to install *Tyk Self-Managed* in a Kubernetes cluster is via Helm charts. 
We are actively working to add flexibility and more user flows to our chart. Please reach out
to our teams on support or the cummunity forum if you have questions, requests or suggestions for improvements.

Get started with one of our quick start guides:

- [Quick Start with PostgreSQL]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql">}})
- [Quick Start with MongoDB]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-mongodb">}})

Or go to [Tyk Stack helm chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}) for detailed installation instructions and configuration options.

##### Tyk Operator and Ingress 
For a GitOps workflow used with a **Tyk Self-Managed** installation or setting the Tyk Gateway as a Kubernetes ingress controller, Tyk Operator enables you to manage API definitions, security policies and other Tyk features using Kubernetes manifest files.
To get started go to [Tyk Operator]({{< ref "/tyk-operator#what-is-tyk-operator" >}}).


##### Install Tyk Stack with Helm Chart (PostgreSQL)

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

Ensure that you are installing PostgreSQL versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}) that are compatible with Tyk.
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

You are now ready to [create an API]({{<ref "getting-started/create-api">}}).

For the complete installation guide and configuration options, please see [Tyk Stack Helm Chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}).

##### Install Tyk Stack with Helm Chart (MongoDB)

The following guides provide instructions to install Redis, MongoDB, and Tyk stack with default configurations. It is intended for quick start only. For production, you should install and configure Redis and MongoDB separately.

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)

{{< note success >}}
**Note**

If you want to enable Tyk Enterprise Developer Portal, please use [PostgreSQL]({{<ref "/deployment-and-operations/tyk-self-managed/deployment-lifecycle/installations/kubernetes/tyk-helm-tyk-stack-postgresql">}}). MongoDB is not supported in Developer Portal.
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

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

**3. Install MongoDB (if you don't have a MongoDB instance)**

If you do not already have MongoDB installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-mongo oci://registry-1.docker.io/bitnamicharts/mongodb -n $NAMESPACE --install --version $MONGO_BITNAMI_CHART_VERSION
```

{{< note success >}}
**Note**

Please make sure you are installing MongoDB versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}).
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

Ensure that you are installing MongoDB versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}) that are compatible with Tyk.
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

You are now ready to [create an API]({{<ref "getting-started/create-api">}}).

For the complete installation guide and configuration options, please see [Tyk Stack Helm Chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}).


##### Install Tyk Stack on Windows with Helm


{{< note success >}}
**Note**
  
Installing Tyk on Kubernetes requires a multi-node Tyk license. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary license.
{{< /note >}}

{{< warning success >}}
**Warning**  

This deployment is NOT designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [Self-Managed]({{< ref "/content/tyk-self-managed/install.md" >}}) solution, which includes our Gateway, Dashboard and analytics processing pipeline. 

This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and either MongoDB or one of our supported [SQL databases]({{< ref "/content/tyk-dashboard/database-options.md" >}}).

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
- A free Tyk Self-Managed [Developer license](https://tyk.io/product/tyk-on-premises-free-edition/)

Ensure that kubectl and helm prerequisites are configured on your Windows path environment variable

This demo installation was tested with the following tools/versions:

* Microsoft Windows 10 Pro v1909 VM on Azure (Standard D2 v3 size)
* Docker Desktop for Windows 2.2.0.0 (Docker engine v19.03.5)
* helm v3.0.3
* minikube v1.7.1 (k8s v 1.17.2)
* kubectl v 1.17.0 (Note that kubectl is packaged with Docker Desktop for Windows, but the version may be incompatible with k8s)

**Installation**

Now you have your prerequisites, follow the instructions from our [Tyk Helm Chart]({{< ref "/tyk-self-managed/tyk-helm-chart#installation" >}}) page.

##### Use Legacy Helm Chart

{{< warning success >}}
**Warning**

`tyk-pro` chart is deprecated. Please use our [Tyk Stack helm chart]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}) instead. 

We recommend all users migrate to the `tyk-stack` Chart. Please review the [Configuration]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

**Introduction**

Tyk Helm chart is the preferred (and easiest) way to install **Tyk Self-Managed** on Kubernetes.
The helm chart `tyk-helm/tyk-pro` will install full Tyk platform with **Tyk Manager**, **Tyk Gateways** and **Tyk Pump** into your Kubernetes cluster. You can also choose to enable the installation of **Tyk Operator** (to manage your APIs in a declarative way).

**Prerequisites**
<br>
**1. Tyk License**
If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain a temporary license.

**2. Data stores**
The following are required for a Tyk Self-Managed installation:
 - Redis   - Should be installed in the cluster or reachable from inside the cluster (for SaaS option).
             You can find instructions for a simple Redis installation bellow.
 - MongoDB or SQL - Should be installed in the cluster or be reachable by the **Tyk Manager** (for SaaS option).

You can find supported MongoDB and SQL versions [here]({{< ref "planning-for-production/database-settings" >}}).

Installation instructions for Redis and MongoDB/SQL are detailed below.

**3. Helm**
Installed [Helm 3](https://helm.sh/)
Tyk Helm Chart is using Helm v3 version (i.e. not Helm v2).


**Installation**

As well as our official Helm repo, you can also find it in [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-pro).
<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/tyk-helm/tyk-pro" data-theme="light" data-header="true" data-responsive="true"><blockquote><p lang="en" dir="ltr"><b>tyk-pro</b>: This chart deploys our full Tyk platform. The Tyk Gateway is a fully open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols. The Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. It enables organizations and businesses around the world to protect, secure, and process APIs and well as review and audit the consumed apis.</p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/tyk-helm/tyk-pro">Artifact Hub</a></blockquote></div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

If you are interested in contributing to our charts, suggesting changes, creating PRs or any other way,
please use [GitHub Tyk-helm-chart repo](https://github.com/TykTechnologies/tyk-helm-chart/tree/master/tyk-pro)
or contact us in [Tyk Community forum](https://community.tyk.io/) or through our sales team.


**Add Tyk official Helm repo to your local Helm repository**
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

**Create namespace for your Tyk deployment**
```bash
kubectl create namespace tyk
```

**Getting the values.yaml of the chart**
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

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
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

Please make sure you are installing PostgreSQL versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password. The DNS name of your Postgres service as set by Bitnami is `tyk-postgres-postgresql.tyk.svc.cluster.local`.
You can update connection details in `values.yaml` file under `postgres`.
{{< tab_end >}}
{{< tabs_end >}}

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
Check [Tyk Gateway Sharding]({{< ref "/content/advanced-configuration/manage-multiple-environments.md#api-sharding" >}}) for more details.


##### Other Tyk Components

**Installing Tyk Enterprise Developer Portal**
If you are deploying the **Tyk Enterprise Developer Portal**, set the appropriate values under the `enterprisePortal` section in your `values.yaml`. Please visit [Tyk Enterprise Developer Portal installation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-helm" >}}) for a step by step guide.

>**Note**: Helm chart supports Enterprise Portal v1.2.0+

**Installing Tyk Self-managed Control Plane**
If you are deploying the **Tyk Control plane**, a.k.a **MDCB**, for a **Tyk Multi Data Center Bridge** deployment then you set
the `mdcb.enabled: true` option in the local `values.yaml` to add of the **MDCB** component to your installation.
Check [Tyk Control plane]({{< ref "tyk-multi-data-centre" >}}) for more configuration details.

This setting enables multi-cluster, multi Data-Center API management from a single dashboard.


**Tyk Identity Broker (TIB)**
The **Tyk Identity Broker** (TIB) is a micro-service portal that provides a bridge between various Identity Management Systems
such as LDAP, OpenID Connect providers and legacy Basic Authentication providers, to your Tyk installation.
See [TIB]({{< ref "tyk-identity-broker/getting-started" >}}) for more details.

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


#### Explore Demos and Proof of Concepts


##### Kubernetes Demo

The [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) repository allows you to start up an entire Tyk Stack
with all its dependencies as well as other tools that can integrate with Tyk.
The repository will spin up everything in Kubernetes using `helm` and bash magic
to get you started.

**Purpose**
Minimize the amount of effort needed to start up the Tyk infrastructure and
show examples of how Tyk can be set up in k8s using different deployment
architectures as well as different integrations.

**Prerequisites**
<br>

**Required Packages**

You will need the following tools to be able to run this project.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/) - CLI tool for controlling Kubernetes clusters
- [Helm](https://helm.sh/docs/intro/install/) - Helps manage Kubernetes applications through Helm charts
- [jq](https://stedolan.github.io/jq/download/) - CLI for working with JSON output and manipulating it 
- [git](https://git-scm.com/downloads) - CLI used to obtain the project from GitHub
- [Terraform](https://www.terraform.io/) (only when using `--cloud` flag)

Tested on Linux/Unix based systems on AMD64 and ARM architectures

**License Requirements**
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

**Minikube**
If you are deploying this demo on [Minikube](https://minikube.sigs.k8s.io/docs/start), 
you will need to enable the [ingress addon](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/#enable-the-ingress-controller). 
You can do so by running the following commands:

```bash
minikube start
minikube addons enable ingress
```

**Quick Start**
```bash
./up.sh --deployments portal,operator-httpbin tyk-stack
```
This quick start command will start up the entire Tyk stack along with the
Tyk Enterprise Portal, Tyk Operator, and httpbin CRD example.

**Possible deployments**
- `tyk-stack`: A comprehensive Tyk Self Managed setup for a single region
- `tyk-cp`: Tyk control plane in a multi-region Tyk deployment
- `tyk-dp`: Data plane of hybrid gateways that connect to either Tyk Cloud or a Tyk Control Plane, facilitating scalable deployments
- `tyk-gateway`: Open Source Software (OSS) version of Tyk, self-managed and suitable for single-region deployments

 
**Dependencies Options**
<br>

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
- [portal](https://github.com/TykTechnologies/tyk-k8s-demo/tree/main/src/deployments/portal): deploys the [Tyk Enterprise Developer Portal](https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/) as well as its dependency PostgreSQL.
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

**Usage**
<br>

**Start Tyk deployment**
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

**Stop Tyk deployment**
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

**Customization**
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

**Variables**
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


##### Docker Demo

[Tyk-demo](https://github.com/TykTechnologies/tyk-demo) is a repository that enables you to start up locally an entire Tyk stack with all its dependencies and integrations such as
[SLIs and SLOs with Prometheus and Grafana](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/slo-prometheus-grafana)
or [OpenTelemetry with Jaeger](https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/otel-jaeger).


**Purpose**

With *tyk-demo* repository, using docker-compose, you can set up quickly a **complete** Tyk stack, including
dependencies and integrations.

Minimize the amount of effort needed to start up the Tyk infrastructure and show end-to-end complete examples of how to set up various capabilities in Tyk as well as different integrations.

**Key Features**

- Full Tyk stack deployment
- Pre-configured demo APIs
- Analytics and monitoring tools
- Integration with common third-party services

Watch the video *What Is Tyk Demo* for an overview and learn about the key features from our experts -

{{< youtube-seo id="MqVPyWg1YZM" title="Overview of Tyk Demo and its features" >}}

**Prerequisites**
<br>

**1. Docker compose**
Make sure you have [docker compose](https://docs.docker.com/compose/install/) and that docker is running on your machine.

**2. License key**
This Demo deploys and runs the full Tyk platform which is a licensed product. Please sign up using the button below, to obtain a license key. In the link, choose "Get in touch" to get a guided evaluation of the Tyk Dashboard and receive your temporary license. 

{{< button_left href="https://tyk.io/sign-up#self" color="green" content="Get started" >}}

**Quick Start**

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


##### Docker Compose Setup

This page outlines how to run Tyk Stack using Docker Compose.

**Who is this page for?**
This is the guide we recommend for a easy quick start. The instructions are the ones shared with you when you register to a [free trial]({{< ref "getting-started/quick-start" >}}).

You can also use this guide for your PoC since it spins up a full Tyk Self Managed stack for you using our project *Docker Pro Demo*, however, if you are interested in learning Tyk, there's an option for [Tyk Demo]({{< ref "deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview" >}}) which is a project that spins up full Tyk stack that includes a prepopulate API definitions of all kinds, with various middleware options and can also spin up supporting tools such as Prometheus, Keycloak (IDP) etc.

**What's included?**
The *Tyk Pro Docker Demo* is our [Self-Managed]({{< ref "tyk-on-premises" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

{{< warning success >}}
**Warning**

This demo is NOT intended for production use or performance testing, since it uses docker compose and the configuration files are not specifically tuned for performance testing or high loads. Please visit the [Planning for Production]({{<ref "planning-for-production/">}}) page to learn how to configure settings for optimal performance.

{{< /warning >}}
{{< note success >}}
**Note**  

The Tyk Pro Docker demo does not provide access to the [Developer Portal]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal" >}}).
{{< /note >}}

**Prerequisites**

* Our [Tyk Pro Docker demo on GitHub](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A Tyk Pro [trial license](https://pages.tyk.io/get-started-with-tyk)

**Step #1 - Clone the GitHub repo**

Clone the Docker demo repo from GitHub to a location on your machine.

**Step #2 - Edit your hosts file**

You need to add the following to your hosts file:

```bash
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

**Step #3 - Add your developer license**

From your installation folder:

Create an `.env` file - `cp .env.example .env.` Then add your license string to `TYK_DB_LICENSEKEY`.

**Step #4 - Initialise the Docker containers**

*With MongoDB*

Run the following command from your installation folder:

```docker
docker-compose up
```

*With PostgreSQL*

Run the following command from your installation folder:

```docker
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml up
```

This will will download and setup the five Docker containers. This may take some time and will run in non-daemonised mode so you can see all the output.

**Step #5 - Bootstrap the Tyk installation**

Go to [http://localhost:3000](http://localhost:3000) in your browser. You will be presented with the Bootstrap UI to create your first organization and admin user.

{{< img src="/img/dashboard/system-management/tyk-bootstrap.png" alt="Tyk Bootstrap sceen" width="768">}}


**Step #6 - Create your organization and default user**

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

**Step #7 - log in to the Tyk Dashboard**

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard
Setup screen.

**Removing the demo installation**

To delete all containers as well as remove all volumes from your host:

**With MongoDB**

```bash
docker-compose down -v
```
**With PostgreSQL**

```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.postgres.yml down -v
```

**Using Windows**


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
- A free Tyk Self-Managed [Developer license](https://tyk.io/product/tyk-on-premises-free-edition/)

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

**Using WSL**

The Tyk Pro Docker demo is our full [Self-Managed]({{< ref "/content/tyk-on-premises.md" >}}) solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB. This demo is great for proof of concept and demo purposes, but if you want to test performance, you will need to move each component to a separate machine.

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
- A free Tyk Self-Managed [Developer license](https://tyk.io/product/tyk-on-premises-free-edition/)
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

##### Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).

#### Install Tyk Self Managed on Red Hat (RHEL / CentOS)

Select the preferred way of installing Tyk by selecting **Shell** or **Ansible** tab for instructions.

##### Install Tyk Self Managed Through Shell

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

Tyk Gateway has a [dependency]({{< ref "/planning-for-production/redis#supported-versions" >}}) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

**Storage Database**

Tyk Dashboard has a dependency on a storage database that can be [PostgreSQL]({{< ref "/planning-for-production/database-settings/postgresql" >}}) or [MongoDB]({{< ref "/planning-for-production/database-settings/mongodb" >}}).
  

**Option 1: Install PostgreSQL**

Check the PostgreSQL supported [versions]({{< ref "/planning-for-production/database-settings/postgresql" >}}). Follow the steps provided by [PostgreSQL](https://www.postgresql.org/download/linux/redhat/) to install it.

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
Check the MongoDB supported [versions]({{< ref "/planning-for-production/database-settings/mongodb" >}}). Follow the steps provided by [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/) to install it.

Optionally initialize the database and enable automatic start:
```console
# Optionally ensure that MongoDB will start following a system reboot
sudo systemctl enable mongod
# start MongoDB server
sudo systemctl start mongod
```

##### Install Tyk Self Managed Through Ansible
You can install Tyk on RHEL or CentOS using our YUM repositories. Follow the guides and tutorials in this section to have Tyk up and running in no time.

The order is to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/dashboard" >}})
- [Pump]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/analytics-pump" >}})
- [Gateway]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/gateway" >}})

{{< note success >}}
**Note**  

For a production environment, we recommend that the Tyk Gateway, Tyk Dashboard and Tyk Pump are installed on separate machines. If installing multiple Tyk Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "planning-for-production" >}}) for more details.
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


#### Install Dashboard on Red Hat (RHEL) / CentOS

##### Install Dashboard Through Ansible
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Dashboard with shell is in the <b>Shell</b> tab.
{{< /note >}}

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


##### Install Tyk Dashboard Through Shell

Tyk has its own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk/tyk-dashboard/install#manual-rpm), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This configuration should also work (with some tweaks) for CentOS.

**Prerequisites**

*   Ensure port `3000` is open: This is used by the Dashboard to provide the GUI and the Classic Developer Portal.
*   Follow the steps provided in this link [Getting started on Red Hat (RHEL / CentOS)]({{< ref "tyk-on-premises/redhat-rhel-centos.md" >}}) to install and configure Tyk dependencies.

**Step 1: Set up YUM Repositories**

First, install two package management utilities `yum-utils` and a file downloading tool `wget`:
```bash
sudo yum install yum-utils wget
```
Then install Python:
```bash
sudo yum install python3
```

**Step 2: Configure and Install the Tyk Dashboard**

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

**Step 3: Confirm Redis and MongoDB or PostgreSQL are running**
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
**Step 4: Configure Tyk Dashboard**

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

**Step 5: Start Tyk Dashboard**
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

**Step 6: Enter Dashboard license**

Add your license in `/var/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

If all is going well, you will be taken to a Dashboard setup screen - we'll get to that soon.

**Step 7: Restart the Dashboard process**

Because we've just entered a license via the UI, we need to make sure that these changes get picked up, so to make sure things run smoothly, we restart the Dashboard process (you only need to do this once) and (if you have it installed) then start the gateway:
```bash
sudo service tyk-dashboard restart 
```

**Step 8 - Go to the Tyk Dashboard URL**

Go to the following URL to access to the Tyk Dashboard:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

**Step 9 - Create your Organization and Default User**

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

**Step 10 - Login to the Dashboard**

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

##### Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).


#### Install Tyk Pump on Red Hat (RHEL) / CentOS

##### Install Tyk Pump Through Ansible
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Pump with shell is in the <b>Shell</b> tab.
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


##### Configure Tyk Pump Through Shell

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

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Mongo IP Address>`, `<Mongo Port>` ` for `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/` with your own values to run this script.
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


#### Deploy Tyk Gateway on Red Hat (RHEL) / CentOS

##### Install Tyk Gateway Through Ansible

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

##### Install Tyk Gateway Through Shell

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

##### Configure Tyk Gateway with the Dashboard

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


#### Install Tyk on Debian or Ubuntu
 

##### Install Tyk through Ansible

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


##### Install Tyk Through Shell 

**Requirements**

Before installing the Tyk components in the order below, you need to first install Redis and MongoDB/SQL.

**Option 1: Install MongoDB 4.0**

You should follow the [online tutorial for installing MongoDb](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-ubuntu/). We will be using version 4.0. As part of the Mongo installation you need to perform the following:

1. Import the public key
2. Create a list file
3. Reload the package database
4. Install the MongoDB packages
5. Start MongoDB
6. Check the `mongod` service is running


**Option 2: Install SQL**

You should follow the [online tutorial for installing PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/). We will be using version 13. As part of the PostgreSQL installation you need to perform the following:

1. Create the file repository configuration
2. Import the repository signing key
3. Update the package lists
4. Install the PostgreSQL packages
5. Start PostgreSQL
6. Check the `postgresql` service is running

See [SQL configuration]({{< ref "/content/planning-for-production/database-settings/postgresql.md" >}}) for details on installing SQL in a production environment.

**Install Redis**

```console
$ sudo apt-get install -y redis-server
```

##### Install Tyk Pro on Ubuntu

Installing Tyk on Ubuntu is very straightforward using our APT repositories, follow the guides and tutorials in this section to have Tyk up and running in no time.

The suggested order would be to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard]({{< ref "tyk-on-premises/debian-ubuntu/dashboard" >}})
- [Pump]({{< ref "tyk-on-premises/debian-ubuntu/analytics-pump" >}})
- [Gateway]({{< ref "tyk-on-premises/debian-ubuntu/gateway" >}})

{{< note success >}}
**Note**  

For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "planning-for-production" >}}) For more details.
{{< /note >}}


##### Install and Configure Tyk Dashboard on Ubuntu

  
**Install Tyk Dashboard Through Ansible**
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Dashboard with shell is in the <b>Shell</b> tab.
{{< /note >}}

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


**Install Tyk Dashboard Through Shell**

Tyk has its own APT repositories hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial has been tested on Ubuntu 16.04 & 18.04 with few if any modifications. We will install the Tyk Dashboard with all dependencies locally.

**Prerequisites**

- Have MongoDB/SQL and Redis installed - see [here](https://tyk.io/getting-started/installation/with-tyk-on-premises/on-ubuntu/#prerequisites) for details.
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

`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://wiki.ubuntu.com/Releases), e.g. `focal`.

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

##### Configure Tyk Dashboard

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

Follow the [Gateway installation instructions]({{< ref "tyk-on-premises/debian-ubuntu/gateway" >}}) to connect to your Dashboard instance before you continue on to step 4.

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

##### Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).


##### Install and Configure Tyk Pump for Analytics


**What is Tyk Pump?**

Tyk Pump is responsible for moving analytics between the API Gateway and the Dashboard database, it can also send data to other sinks such as ElasticSearch, StatsD and InfluxDB.

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk), which makes it easy, safe and secure to install a trusted distribution of the Tyk Pump application.


**Install Tyk Pump Through Ansible**
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Pump with shell is in the <b>Shell</b> tab.
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


##### Install Tyk Pump Through Shell

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

`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://wiki.ubuntu.com/Releases), e.g. `focal`.

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


##### Install Tyk Gateway on Ubuntu

**Install Tyk Gateway Through Ansible**
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Gateway with shell is in the <b>Shell</b> tab.
{{< /note >}}

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


**Install Tyk Gateway Through Shell**

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io](https://packagecloud.io/tyk), which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

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

`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://wiki.ubuntu.com/Releases), e.g. `focal`.

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

##### Configure Tyk Gateway On The Dashboard

**Prerequisites**

This configuration assumes that you have already installed the Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

**Set up Tyk On The Dashboard**

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

{{<note success>}}
Pro Tip: Domains with Tyk Gateway

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.

{{</note>}}

#### Deployment Options


##### Deploy via AWS Marketplace


Tyk offers a flexible and powerful API management solution through **Tyk Cloud** on the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-pboluroscnqro). Tyk Cloud is an end-to-end managed API platform where both the control plane and gateways are installed on AWS for a seamless, fully cloud-hosted experience.

For those who need more deployment flexibility, Tyk Cloud also supports a [Hybrid Gateway]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}}) option. In this setup, the control plane remains hosted and managed by Tyk on AWS, while the gateways can be deployed on your preferred cloud provider or on-premises environment—allowing you to meet data locality and compliance needs without sacrificing control.

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


##### Deploy via Ansible

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

For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "planning-for-production" >}}) For more details.
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


##### Deploy via Bootstrap
  
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

You can override the config values by environment variables. See [how to configure an environment variable]({{< ref "tyk-environment-variables" >}}). 

For example, you can override hostname, port, mongo url, redis host and redis port values by exporting the following variables:

- **TYK_DB_HOSTCONFIG_HOSTNAME**
- **TYK_DB_LISTENPORT**
- **TYK_DB_MONGOURL**
- **TYK_DB_REDISHOST**
- **TYK_DB_REDISPORT**


##### Deploy with Docker


Tyk has three containers that are available to set up a Docker installation:

* [The Tyk Gateway container](https://hub.docker.com/r/tykio/tyk-gateway/)
* [The Tyk Dashboard container](https://hub.docker.com/r/tykio/tyk-dashboard/)
* [The Tyk Pump container](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/)

All three are required for a full deployment. We recommend that each container is installed on a separate machine for optimum performance.

From v5.5.0 onwards, these images are based on [distroless](https://github.com/GoogleContainerTools/distroless). This means that you will not be able to obtain a shell with `docker run --rm -it tykio/tyk-gateway:v5.5.0 sh`. The image can be inspected with tools like [dive](https://github.com/wagoodman/dive) or [Docker Desktop](https://www.docker.com/products/docker-desktop/).

We also have a [Docker Tyk Pro Demo]({{< ref "tyk-on-premises/docker/docker-pro-demo" >}}), which installs our full Self-Managed solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine.


##### Deploy with Heroku
  
**Install Tyk API Gateway on Heroku**

A full Tyk Self-Managed installation can be deployed to Heroku dynos and workers using [Heroku Container Registry and Runtime](https://devcenter.heroku.com/articles/) functionality. This guide will utilize [Tyk Docker images](https://hub.docker.com/u/tykio/) with a small amount of customization as well as an external MongoDB service.


**Prerequisites**

1. Docker daemon installed and running locally
2. [Heroku account](https://www.heroku.com/), the free plan is sufficient for a basic PoC but not recommended for production usage
3. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
4. MongoDB service (such as [Atlas](https://www.mongodb.com/cloud/atlas), [mLab](https://elements.heroku.com/addons/mongolab), [Compose](https://www.compose.com/) or your own deployment), this guide is based on MongoDB Atlas but others should work as well
5. [Tyk License](https://tyk.io/pricing/on-premise/) (note that in case of running multiple gateway dynos, license type must match)
6. Checkout the [Tyk quickstart repository](https://github.com/TykTechnologies/tyk-pro-heroku) from GitHub
7. Python 2 or 3 in order to execute the bootstrap script

**Creating Heroku Apps**

We will create two Heroku apps, one for the Tyk Gateway (with [Redis add-on](https://devcenter.heroku.com/articles/heroku-redis) attached to it) and another for the Dashboard and Pump.

Given Heroku CLI is installed and your Heroku account is available, log into it:
```{.copyWrapper}
heroku login
```

Now create the Gateway app and note down its name:
```{.copyWrapper}
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
```{.copyWrapper}
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
```{.copyWrapper}
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

Time to create the Dasboard app and note down its name as well:
```{.copyWrapper}
heroku create
```
```
Creating app... done, ⬢ evening-beach-40625
https://evening-beach-40625.herokuapp.com/ | https://git.heroku.com/evening-beach-40625.git
```

Since the Dashboard and Pump need access to the same Redis instance as the gateway, we'll need to share the Gateway app's add-on with this new app:
```{.copyWrapper}
heroku addons:attach infinite-plains-14949::REDIS -a evening-beach-40625
```
```
Attaching redis-infinite-35445 to ⬢ evening-beach-40625... done
Setting REDIS config vars and restarting ⬢ evening-beach-40625... done, v3
```

To check that both apps have access to the same Redis add-on, we can utilize the `heroku config` command and check for the Redis endpoint:
```{.copyWrapper}
heroku config -a infinite-plains-14949 | grep REDIS_URL
heroku config -a evening-beach-40625 | grep REDIS_URL
```

Their outputs should match.

**Deploy the Dashboard**

It's recommended to start with the Dashboard so in your Heroku quickstart clone run:
```{.copyWrapper}
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


The [Dashboard configuration]({{< ref "tyk-dashboard/configuration" >}}) can be changed by either editing the `tyk_analytics.conf` file or injecting them as [environment variables]({{< ref "tyk-environment-variables" >}}) via `heroku config`. In this guide we'll use the latter for simplicity of demonstration but there is merit to both methods.

First let's set the license key:
```{.copyWrapper}
heroku config:set TYK_DB_LICENSEKEY="your license key here" -a evening-beach-40625
```
```
Setting TYK_DB_LICENSEKEY and restarting ⬢ evening-beach-40625... done, v4
TYK_DB_LICENSEKEY: should show your license key here
```

Now the MongoDB endpoint (replacing with your actual endpoint):
```{.copyWrapper}
heroku config:set TYK_DB_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOURL and restarting ⬢ evening-beach-40625... done, v5
TYK_DB_MONGOURL: mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017
```

And enable SSL for it if your service supports/requires this:
```{.copyWrapper}
heroku config:set TYK_DB_MONGOUSESSL="true" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOUSESSL and restarting ⬢ evening-beach-40625... done, v6
TYK_DB_MONGOUSESSL: true
```

Since the Tyk Dashboard needs to access gateways sometimes, we'll need to specify the Gateway endpoint too, which is the Gateway app's URL:
```{.copyWrapper}
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

```{.copyWrapper}
ls pump
```
```
Dockerfile.pump  entrypoint.sh  pump.conf
```

Same principles apply here as well. Here we'll need to configure MongoDB endpoints for all the Pumps (this can also be done in the `pump.conf` file):
```{.copyWrapper}
heroku config:set PMP_MONGO_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGO_MONGOUSESSL="true"

heroku config:set PMP_MONGOAGG_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGOAGG_MONGOUSESSL="true"
```

With the configuration in place it's finally time to deploy our app to Heroku.

First, make sure CLI is logged in to Heroku containers registry:
```{.copyWrapper}
heroku container:login
```
```
Login Succeeded
```

Provided you're currently in `analytics` directory of the quickstart repo:
```{.copyWrapper}
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
```{.copyWrapper}
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
```{.copyWrapper}
heroku dyno:scale pump=1 -a evening-beach-40625
```
```
Scaling dynos... done, now running pump at 1:Free
```

At that point the dyno formation should look like this:
```{.copyWrapper}
heroku dyno:scale -a evening-beach-40625
```
```
pump=1:Free web=1:Free
```

**Deploy the Gateway**

The process is very similar for the Tyk Gateway, except it doesn't have a worker process and doesn't need access to MongoDB.

```{.copyWrapper}
cd ../gateway
ls
```
```
Dockerfile.web  entrypoint.sh  tyk.conf
```

All these files serve the same purpose as with the Dasboard and the Pump. [Configuration]({{< ref "tyk-oss-gateway/configuration" >}}) can either be edited in `tyk.conf` or [injected]({{< ref "tyk-environment-variables" >}}) with `heroku config`.

To get things going we'll need to set following options for the Dashboard endpoint (substituting the actual endpoint and the app name, now for the gateway app):
```{.copyWrapper}
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
```{.copyWrapper}
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

You're ready to follow the guide on [creating and managing your APIs]({{< ref "getting-started/create-api" >}}) with this Heroku deployment.

{{< note success >}}
**Note**  

To use the [geographic log distribution]({{< ref "tyk-stack/tyk-manager/analytics/geographic-distribution" >}}) feature in the Dashboard please supply the GeoLite2 DB in the `gateway` directory, uncomment the marked line in `Dockerfile.web` and set the `analytics_config.enable_geo_ip` setting (or `TYK_GW_ANALYTICSCONFIG_ENABLEGEOIP` env var) to `true`.
{{< /note >}}

**Heroku Private Spaces**

Most instructions are valid for [Heroku Private Spaces runtime](https://devcenter.heroku.com/articles/private-spaces). However there are several differences to keep in mind.

Heroku app creation commands must include the private space name in the `--space` flag, e.g.:
```{.copyWrapper}
heroku create --space test-space-virginia
```

When deploying to the app, the container must be released manually after pushing the image to the app:
```{.copyWrapper}
heroku container:push --recursive -a analytics-app-name
heroku container:release web -a analytics-app-name
heroku container:release pump -a analytics-app-name
```

Similarly, the Gateway:
```{.copyWrapper}
heroku container:push --recursive -a gateway-app-name
heroku container:release web -a gateway-app-name
```

Please allow several minutes for the first deployment to start as additional infrastructure is being created for it. Next deployments are faster.

Private spaces maintain stable set of IPs that can be used for allowing fixed set of IPs on your upstream side (e.g. on an external database service). Find them using the following command:
```{.copyWrapper}
heroku spaces:info --space test-space-virginia
```

Alternatively VPC peering can be used with the private spaces if external service supports it. This way exposure to external network can be avoided. For instance, see [MongoDB Atlas guide](https://www.mongodb.com/blog/post/integrating-mongodb-atlas-with-heroku-private-spaces) for setting this up.

The minimal Heroku Redis add-on plan that installs into your private space is currently `private-7`. Please refer to [Heroku's Redis with private spaces guide](https://devcenter.heroku.com/articles/heroku-redis-and-private-spaces) for more information.

Apps in private spaces don't enable SSL/TLS by default. It needs to be configured in the app settings along with the domain name for it. If it's not enabled, please make sure that configs that refer to corresponding hosts are using HTTP instead of HTTPS and related ports (80 for HTTP).

**Gateway Plugins**

In order to enable [rich plugins]({{< ref "plugins/supported-languages/rich-plugins" >}}) for the Gateway, please set the following Heroku config option to either `python` or `lua` depending on the type of plugins used:
```{.copyWrapper}
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


#### Deploy with Microsoft Azure
  
##### Introduction
[Azure](https://azure.microsoft.com/en-us/overview/what-is-azure/) is Microsoft's cloud services platform. It supports both the running of [Ubuntu Servers](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/Canonical.UbuntuServer?tab=Overview), as well as [Docker](https://www.docker.com/docker-azure) and [Docker-Compose](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/docker-compose-quickstart).

For more details, see the [Azure Documentation](https://docs.microsoft.com/en-us/azure/).

##### Tyk Installation Options for Azure 

Azure allows you to install Tyk in the following ways:

**On-Premises**

1. Via our [Ubuntu Setup]({{< ref "tyk-on-premises/debian-ubuntu" >}}) on an installed Ubuntu Server on Azure.
2. Via our [Docker Installation]({{< ref "tyk-on-premises/docker" >}}) using Azure's Docker support.

See our video for installing Tyk on Ubuntu via Azure:

{{< youtube -Q9Lox-DyTU >}}

We also have a [blog post](https://tyk.io/getting-started-with-tyk-on-microsoft-azure-and-ubuntu/) that walks you through installing Tyk on Azure.


#### Deploy to Google Cloud
  
##### Introduction

[GCP](https://cloud.google.com/) is Google's Cloud services platform. It supports both the running of [Ubuntu Servers](https://console.cloud.google.com/marketplace/browse?q=ubuntu%2020.04) and [Docker](https://cloud.google.com/build/docs/cloud-builders).

For more details, see the [Google Cloud Documentation](https://cloud.google.com/docs).

##### Tyk Installation Options for Google CLoud 

Google Cloud allows you to install Tyk in the following ways:

**On-Premises**

1. Via our [Ubuntu Setup]({{< ref "tyk-on-premises/debian-ubuntu" >}}) on an installed Ubuntu Server within Google Cloud.
2. Via our [Docker Installation]({{< ref "tyk-on-premises/docker" >}}) using Google Cloud's Docker support.

**Tyk Pump on GCP**

When running Tyk Pump in GCP using [Cloud Run](https://cloud.google.com/run/docs/overview/what-is-cloud-run) it is available 24/7. However, since it is serverless you also need to ensure that the _CPU always allocated_ option is configured to ensure availability of the analytics. Otherwise, for each request there will be a lag between the Tyk Pump container starting up and having the CPU allocated. Subsequently, the analytics would only be available during this time.

1. Configure Cloud Run to have the [CPU always allocated](https://cloud.google.com/run/docs/configuring/cpu-allocation#setting) option enabled. Otherwise, the Tyk Pump container needs to warm up, which takes approximately 1 min. Subsequently, by this time the stats are removed from Redis.

2. Update the Tyk Gateway [configuration]({{< ref "tyk-oss-gateway/configuration#analytics_configstorage_expiration_time" >}}) to keep the stats for 3 mins to allow Tyk Pump to process them. This value should be greater than the Pump [purge delay]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#purge_delay" >}}) to ensure the analytics data exists long enough in Redis to be processed by the Pump. 


## Planning for Production

Preparing Tyk for production involves setting up an API infrastructure that can handle high performance and ensure reliability. This section provides detailed guidance on evaluating performance, optimizing configurations, and implementing strategies to maintain availability in demanding environments.

Start by assessing performance benchmarks to understand how your system can handle traffic under different conditions. Then, dive into Redis configuration and database optimization to ensure efficient caching, data storage, and retrieval. The section also covers critical practices for high availability, including setting up circuit breakers, configuring enforced timeouts, performing health checks, and implementing load balancing. These steps are essential for preventing downtime and ensuring seamless operation.

Each topic is designed to address specific production needs, making it easy to focus on the areas most relevant to your deployment. Whether you’re scaling your setup, enhancing reliability, or optimizing performance, this section equips you with the practical knowledge needed for success.


### Evaluate Performance Benchmarks

As an API Gateway introduces an extra hop and is also the single point of entry into the ecosystem, it needs to be super performant.  Tyk was designed to be performant from day one, which is also why it is written in GO.

1. [Tyk Performance Benchmarks](https://tyk.io/blog/performance-benchmarks)

What are the performance benchmarks for Tyk Gateway across:
- The Tyk feature set
- Multiple Clouds
- CPU scalability
- Compared to competitors


2. [Performance tuning your Gateway](https://tyk.io/performance-tuning-your-tyk-api-gateway/)

Step by step process to performance tuning your Gateway for that squeeze.

3. [Manual performance testing on AWS](https://tyk.io/a-manual-for-simple-performance-testing-with-tyk-on-aws/)

Best practice guide for setting up a manual performance test on AWS .


#### Database Management

Visit the following pages to see how to configure the Database for Production:
* [Redis]({{< ref "planning-for-production/redis.md" >}})
* [MongoDB]({{< ref "planning-for-production/database-settings/mongodb.md" >}})
* [PostgreSQL]({{< ref "planning-for-production/database-settings/postgresql.md" >}})

Please consult the [data storage configuration]({{< ref "product-stack/tyk-dashboard/advanced-configurations/data-storage-configuration" >}}) guide for further information relating to how to configure Tyk's data storage across different database engines.


##### Redis
{{< redis-versions >}}

**Split out Your Databases**

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB/PostgreSQL live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB or PostgreSQL cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions

If you are making use of the Tyk Caching feature, then it is possible to use a secondary Redis server or Redis cluster to store cache data. This can be very useful in high-traffic APIs where latency is at a premium.


**Make sure you have enough Redis connections**

Tyk makes heavy use of Redis in order to provide a fast and reliable service, in order to do so effectively, it keeps a passive connection pool ready. For high-performance setups, this pool needs to be expanded to handle more simultaneous connections, otherwise you may run out of Redis connections.

Tyk also lets you set a maximum number of open connections, so that you don't over-commit connections to the server.

To set your maximums and minimums, edit your `tyk.conf` and `tyk_analytics.conf` files to include:

```{.copyWrapper}
"storage": {
  ...
  "optimisation_max_idle": 2000,
  "optimisation_max_active": 4000,
  ...
},
```
    

Set the `max_idle` value to something large, we usually leave it at around `2000` for HA deployments, and then set your `max_active` to your upper limit (as in, how many additional connections over the idle pool should be used).

**Protection of Redis data**

Tyk uses Redis to store API tokens and OAuth clients, so it is advisable to *not* treat Redis instances as ephemeral. The exception to this is when you are using Tyk Multi Data Center Bridge, but you will still need to retain the master Redis instance.

You must ensure that Redis is persisted, or at least in a configuration where it is easy to restore or failover. So, for example, with Elasticache, making sure there are many read-replicas and regular snapshots can ensure that your data survives a failure.

**Redis Encryption**

Redis supports [SSL/TLS encryption](https://redis.io/topics/encryption) from version 6 as an optional feature, enhancing the security of data in transit. To configure TLS or mTLS connections between an application and Redis, consider the following settings in Tyk's configuration files:

- `storage.use_ssl`: Set this to true to enable TLS encryption for the connection.

- `storage.ssl_secure_skip_verify`: A flag that, when set to true, instructs the application not to verify the Redis server's TLS certificate. This is not recommended for production due to the risk of `man-in-the-middle` attacks.

From **Tyk 5.3**, additional options are available for more granular control:

- `storage.ca_file`: Path to the Certificate Authority (CA) file for verifying the Redis server's certificate.

- `storage.cert_file` and `storage.key_file`: Paths to your application's certificate and private key files, necessary for mTLS where both parties verify each other's identity.

- `storage.max_version` and `storage.min_version`: Define the acceptable range of TLS versions, enhancing security by restricting connections to secure TLS protocols (1.2 or 1.3).

**Setting up an Insecure TLS Connection**
- **Enable TLS**: By setting `"use_ssl": true`, you encrypt the connection.
- **Skip Certificate Verification**: Setting `"ssl_secure_skip_verify": true` bypasses the server's certificate verification, suitable only for non-production environments.

**Setting up a Secure TLS Connection**
- Ensure `use_ssl` is set to `true`.
- Set `ssl_secure_skip_verify` to `false` to enforce certificate verification against the CA specified in `ca_file`.
- Specify the path to the CA file in `ca_file` for server certificate verification.
- Adjust `min_version` and `max_version` to secure TLS versions, ideally 1.2 and 1.3.

**Setting up a Mutual TLS (mTLS) Connection**
- Follow the steps for a secure TLS connection.
- Provide paths for `cert_file` and `key_file` for your application's TLS certificate and private key, enabling Redis server to verify your application's identity.

**Example Gateway Configuration**
```json
"storage": {
  "type": "redis",
  "host": "server1",
  "port": 6379,
  "use_ssl": true,
  "ssl_secure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2"
}
```

**Capping Analytics**
Tyk Gateways can generate a lot of analytics data. Be sure to read about [capping your Dashboard analytics]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}})


**Redis Sizing Guidelines**

The average single request analytics record (without detailed logging turned on) is around 1KB.

In terms of Redis, in addition to key storage itself, it should be able to hold the last 10 seconds of analytics data, preferably more, in the case of a Tyk Pump failure. So if you have 100 requests per second, you will need approximately 6MB for storing 60 seconds of data. Be aware that if detailed logging is turned on, this can grow by a magnitude of 10. 

{{< note success >}}
**Note**  

MDCB and Multi-Cloud clients - the Gateways write the data to a temporary Redis list and periodically send the analytics directly to the MDCB server, which, similar to Pump, processes them for purging to MongoDB or PostgreSQL.
{{< /note >}}

**Redis RAM Calculator**
You can calculate your Redis RAM requirements by entering your known values in the middle section of the calculator settings below:

{{< redis-calculator >}}


##### MongoDB Sizing

The aggregate record size depends on the number of APIs and Keys you have. Each counter size ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

**MongoDB Working Data**

Working data in terms of MongoDB is the data you query most often. The graphs displayed on the Tyk Dashboard, except for the Log browser, use aggregated data. 

So if you rely only on this kind of analytic data, you will not experience issues with working data and memory issues. It is literally hundreds of MBs. 

Even if you use the Log browser, its usage access is usually quite random, and it is unlikely that you check requests for every request. So it can't be called working data. And it is ok to store it on disk, and allow MongoDB to do the disk lookups to fetch the data. 

Note, that in order to do fast queries, even from the disk, MongoDB uses indexes. MongoDB recommends that indexes should fit into memory, and be considered working data, but only the part of the index which is commonly used. For example the last month of data. 

For an aggregate collection, the average index size is 6% from the overall collection. For requests stats it is around 30%. 


**MongoDB Sizing Example**
If you serve 1 million requests per day, and require fast access to the last seven days of request logs (usually way less, and the performance of the log viewer is not a concern), with 3 months of aggregated logs, the memory requirements for MongoDB can be as follows:

Request_logs_index ( 30% * (1GB * 7) ) + aggregated(3month * 30MB) ~= 2.1GB + 90MB = ~ 2.2GB

In addition to storing working data in memory, MongoDB also requires space for some internal data structures. In general multiplying the resulting number by 2x should be enough. In the above example, your MongoDB server should have around 4.4GB of available memory.

**MongoDB Database Storage Calculator**
You can calculate your MongoDB storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}

**Supported Versions**

{{< include "mongodb-versions-include" >}}

**Choose a MongoDB driver**

From Tyk 5.0.2, we added an option to use the official MongoDB Go driver to connect to MongoDB. 

We recommend using the mongo-go driver if you are using MongoDB 4.4.x+. For MongoDB versions prior to 4.4, please use the mgo driver.

With the mongo-go driver, we support the latest versions of MongoDB (5.0.x, v6.0.x, and v7.0.x) and also features such as the "+srv" connection string and SCRAM-SHA-256. For more details, visit the MongoDB doc:
* [Connection Guide](https://www.mongodb.com/docs/drivers/go/v1.11/fundamentals/connection/)
* [Authentication Mechanisms](https://www.mongodb.com/docs/drivers/go/v1.11/fundamentals/auth/)

You can configure which driver to use with the MongoDB driver option:
* [Configure Dashboard MongoDB driver]({{< ref "tyk-dashboard/configuration#mongo_driver" >}})
* [Configure MDCB MongoDB driver]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#analyticsdriver" >}})
* [Configure Pump MongoDB driver](https://github.com/TykTechnologies/tyk-pump#driver-type)

**Split out your DB**

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB/PostgreSQL live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB or PostgreSQL cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions

**Special notes for DocumentDB**
{{< note success >}} 
**Note** 

If you are using [DocumentDB](https://aws.amazon.com/documentdb/), [capped collections]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}}) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details. 
{{< /note >}} 

**Special notes for MongoDB Atlas**
In order to integrate with [MongoDB Atlas](https://www.mongodb.com/atlas/database), make sure the IP firewall connections are whitelisted on the Atlas side, and then use the following Tyk Dashboard configurations to connect: 
``` 
- TYK_DB_MONGOURL=mongodb://admin:password@tykdb-shard-00-00.h42pp.mongodb.net:27017,tykdb-shard-00-01.h42pp.mongodb.net:27017,tykdb-shard-00-02.h42pp.mongodb.net:27017/tyk_analytics?authSource=admin - TYK_DB_ENABLECLUSTER=false - TYK_DB_MONGOUSESSL=true 
``` 

More information on these configuration variables [here]({{< ref "tyk-dashboard/configuration" >}}). 


##### Configuring PostgreSQL

How you configure your PostgreSQL installation depends on whether you are installing Tyk from fresh using PostgreSQL, or are migrating from an existing MongoDB instance.

**Supported Versions**

{{< include "sql-versions-include" >}}

**Migrating from an existing MongoDB instance**

For v4.0 we have provided a migration command that will help you migrate all data from the main storage layer (APIs, Policies, Users, UserGroups, Webhooks, Certificates, Portal Settings, Portal Catalogs, Portal Pages, Portal CSS etc.).

{{< note success >}}
**Note**  

The migration tool will not migrate any Logs, Analytics or Uptime analytics data.
{{< /note >}}

1. Make sure your new SQL platform and the existing MongoDB instance are both running
2. Configure the `main` part of  `storage` section of your `tyk-analytics.conf`:

```yaml
{
...
  "storage": {
    ...
    "main": {
      "type": "postgres",
      "connection_string": "user=root password=admin database=tyk-demo-db host=tyk-db port=5432"
    }
  }
} 
```
3. Run the following command:

```console
./tyk-analytics migrate-sql
```
You will see output listing the transfer of each database table. For example: `Migrating 'tyk_apis' collection. Records found: 7`.

4. You can now remove your `mongo_url` (or `TYK_DB_MONGOURL` environment variable) from your `tyk-analytics.conf`
5. Restart your Tyk Dashboard

**PostgreSQL sizing**

The aggregate record size depends on the number of APIs and Keys you have. Each counter size ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

**PostgreSQL Database Storage Calculator**
You can calculate your PostgreSQL storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}


### Ensure High Availability

Ensuring high availability is essential for delivering a reliable API experience, especially when maintaining service level agreements (SLAs) for your clients. Whether it involves limiting round-trip times, guaranteeing timely responses, creating self-healing architectures, or isolating failing services, high availability measures ensure that your infrastructure remains resilient under pressure.

Tyk provides a comprehensive suite of features to help you achieve these goals. Circuit breakers allow you to detect and mitigate failures before they cascade, while enforced timeouts ensure that slow requests do not compromise overall system performance. With tailored configurations for both OAS and Classic deployments, Tyk empowers you to build robust, fail-safe API environments that prioritize uptime and enforce SLA requirements.


#### Circuit Breakers


A circuit breaker is a protective mechanism that helps to maintain system stability by preventing repeated failures and overloading of services that are erroring. When a network or service failure occurs, the circuit breaker prevents further calls to that service, allowing the affected service time to recover while ensuring that the overall system remains functional. It is a critical component in ensuring the resilience and reliability of a distributed system.

Tyk's circuit breaker can be configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

Tyk can trigger events when the circuit breaker trips and when it resets. These events can be used for monitoring, alerting, or automation of recovery processes.

{{< img src="/img/diagrams/diagram_docs_circuit-breakers@2x.png" alt="Circuit breaker example" >}}

##### When to use a circuit breaker

**Protection of critical API endpoints**

Circuit breakers can be used to safeguard essential API endpoints from overloading, ensuring their availability and performance. By implementing circuit breakers, users can prevent these endpoints from being overwhelmed, maintaining their reliability and responsiveness.

**Handling temporary issues**

Circuit breakers can help handle temporary issues in the system, such as temporary outages or performance degradation, by opening and closing the circuit when conditions are unfavorable, allowing the system to recover and resume normal operation.

**Implementing retry logic**

Circuit breakers can be used to automatically manage the retry of failed requests after a hold-off period, increasing the chances of successful execution.

**Implementing fallback mechanisms**

Circuit breakers can trigger alternative workflows or fallback mechanisms when the primary system fails, ensuring uninterrupted service delivery despite system failures.

##### How the circuit breaker works

Similarly to the circuit breaker in an electrical installation, Tyk's circuit breaker middleware monitors the flow and trips (breaks the connection) if it detects errors. Whilst the electrical circuit breaker monitors the flow of electricity and trips if it detects overcurrent (e.g. a short-circuit), Tyk's monitors the responses back from the upstream service and trips if it detects too many failures.

From the perspective of the circuit breaker middleware, a failure is considered any response with HTTP status code `500` or above.

The circuit breaker is rate-based, meaning that it counts the number of failure responses received in a rolling sample window and trips if the failure rate exceeds the configured threshold.

The rolling sample window is set to 10 seconds and the circuit breaker is designed to trip only if a user-configurable minimum number of samples (requests) fail within the window period.

Thus, if the _sample size_ is set to 100 and the _failure rate_ is set to 0.5 (50%) then the circuit breaker will trip only when there have been a minimum of 100 requests made in the past 10 seconds of which at least 50 have failed (returned an `HTTP 500` or higher error).

Once the breaker has been tripped it will remain _open_, blocking calls to the endpoint until a configurable cooldown (or return-to-service) period has elapsed. While the breaker is _open_, requests to the endpoint will return `HTTP 503 Service temporarily unavailable`.

**Half-open mode**

In some scenarios the upstream service might recover more quickly than the configured cooldown period. The middleware supports a _half-open_ mode that facilitates an early return-to-service so that API clients do not have to wait until the end of the cooldown before the circuit breaker is reset.

In the _half-open_ mode, Tyk will periodically issue requests to the upstream service to check whether the path has been restored (while continuing to block client requests). If the Gateway detects that the path has been reconnected, the circuit breaker will be automatically reset (following the electrical circuit analogy, the circuit breaker is _closed_) and requests will be passed to the upstream again.

**Configuring the circuit breaker**

The circuit breaker is configured using only three parameters:
- sample size
- error rate threshold
- cooldown period

The threshold is a ratio of the number of failures received in the sample window. For example, if the sample window size is 100 requests and you wish to trip the circuit breaker if there are 15 failures in any 100 requests, the threshold should be set to `15/100 = 0.15`.

The cooldown period is the time that the circuit breaker will remain _open_ after the error rate threshold has been met and the breaker has been tripped.

There is also an option to enable or disable the _half-open_ state if this would be damaging to your system.

{{< note success >}}
**Note**  

If you are using the Service Discovery module, every time the breaker trips, Tyk will attempt to refresh the Gateway list.
{{< /note >}}

**Using the circuit breaker with multiple upstream hosts**

The circuit breaker works at the endpoint level independent of the number of upstream hosts are servicing the requests. Thus, if you have multiple upstream targets for an API, the sample and failure counts are accumulated across **all** upstream requests. If the failure rate exceeds the threshold, the circuit breaker will trip even if only some of your upstream hosts are failing. Operating in _half-open_ mode will of course cause the breaker to reset if a responsive upstream receives a request, but the `BreakerTripped` (or `BreakerTriggered`) event should alert you to the fact that at least one host is failing.

**Using the circuit breaker with multiple Tyk Gateways**

Circuit breakers operate on a single Tyk Gateway, they do not centralise or pool back-end data. This ensures optimum speed of response and resilience to Gateway failure. Subsequently, in a load balanced environment where multiple Tyk Gateways are used, some traffic can spill through even after the circuit breaker has tripped on one Gateway as other Gateways continue to serve traffic to the upstream before their own breakers trip.

**Circuit breaker events**

The circuit breaker automatically controls the flow of requests to the upstream services quickly and efficiently, but it is equally important to alert you to the fact that there is an issue and to confirm when traffic will recommence once the issue is resolved. Tyk's [Event]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) system provides the method by which the circuit breaker can alert you to these occurrences.

- When the circuit breaker trips (from closed to open), Tyk will generate a `BreakerTripped` event
- When the breaker resets (from open to closed), whether at the end of the cooldown period or if connection is restored while in _half-open_ mode, Tyk will generate a `BreakerReset` event
- In addition to these, whenever the circuit breaker changes state (from closed to open or vice versa), Tyk will generate a `BreakerTriggered` event
 
For the generic `BreakerTriggered` event, the state change will be indicated in the `Status` field in the webhook template as follows:
- when a breaker trips `CircuitEvent = 0`
- when a breaker resets `CircuitEvent = 1`

**API-level circuit breaker**

Tyk does not have an API-level circuit breaker that can be applied across all endpoints. If you are using the Tyk Dashboard, however, then you are able to use an [Open Policy Agent]({{< ref "tyk-dashboard/open-policy-agent.md" >}}) to append a circuit breaker to every API/Service using the regex `.*` path.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the circuit breaker middleware [here]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the circuit breaker middleware [here]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Circuit Breaker middleware summary
  - The Circuit Breaker is an optional stage in Tyk's API Request processing chain, activated when the request is proxied to the upstream service.
  - The Circuit Breaker is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


**Using the Circuit Breaker middleware with Tyk OAS APIs**


Tyk's [circuit breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk OAS APIs the circuit breaker is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic" >}}) page.

##### Configuring the Circuit Breaker in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The circuit breaker middleware (`circuitBreaker`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `circuitBreaker` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `threshold`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `sampleSize`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `coolDownPeriod`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `halfOpenStateEnabled`: if set to `true` then the circuit breaker will operate in [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) once it has been tripped

```json {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-breaker",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-breaker",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-breaker/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "circuitBreaker": {
                        "enabled": true,
                        "threshold": 0.5,
                        "sampleSize": 10,
                        "coolDownPeriod": 60,
                        "halfOpenStateEnabled": true
                    }
                }
            }
        }
    }
}
```

In this example Tyk OAS API Definition the circuit breaker has been configured to monitor requests to the `GET /status/200` endpoint.

It will configure the circuit breaker so that if a minimum of 10 requests (`sampleSize`) to this endpoint are received during the [rolling sampling window]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#how-the-circuit-breaker-works" >}}) then it will calculate the ratio of failed requests (those returning `HTTP 500` or above) within that window.
- if the ratio of failed requests exceeds 50% (`threshold = 0.5`) then the breaker will be tripped
- after it has tripped, the circuit breaker will remain _open_ for 60 seconds (`coolDownPeriod`)
- further requests to `GET /status/200` will return `HTTP 503 Service temporarily unavailable`
- the circuit breaker will operate in _half-open_ mode (`halfOpenStateEnabled = true`) so when the threshold has been reached and the breaker is tripped, Tyk will periodically poll the upstream service to test if it has become available again

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the circuit breaker.

##### Configuring the Circuit Breaker in the API Designer

Adding the circuit breaker to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

**Step 1: Add an endpoint**

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

**Step 2: Select the Circuit Breaker middleware**

Select **ADD MIDDLEWARE** and choose the **Circuit Breaker** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker.png" alt="Adding the Circuit Breaker middleware" >}}

**Step 3: Configure the middleware**

Set the circuit breaker configuration parameters so that Tyk can protect your upstream service if it experiences failure:
- threshold failure rate for the proportion of requests that can error before the breaker is tripped (a value between 0.0 and 1.0)
- the minimum number of requests that must be received during the [rolling sampling window]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#how-the-circuit-breaker-works" >}}) before the circuit breaker can trip
- the cooldown period for which the breaker will remain _open_ after being tripped before returning to service (in seconds)
- optionally enable [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) for upstream services with variable recovery times

{{< img src="/img/dashboard/api-designer/tyk-oas-circuit-breaker-config.png" alt="Configuring the circuit breaker for the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

**Step 4: Save the API**

Select **SAVE API** to apply the changes to your API.


##### Using the Circuit Breaker middleware with Tyk Classic APIs


Tyk's [circuit breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) middleware is configured at the endpoint level, where it monitors the rate of failure responses (HTTP 500 or higher) received from the upstream service. If that failure rate exceeds the configured threshold, the circuit breaker will trip and Tyk will block further requests to that endpoint (returning `HTTP 503 Service temporarily unavailable`) until the end of a recovery (cooldown) time period.

When working with Tyk Classic APIs the circuit breaker is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the Circuit Breaker in Tyk Operator](#configuring-the-circuit-breaker-in-tyk-operator) section below.

##### Configuring the Circuit Breaker in the Tyk Classic API Definition

To configure the circuit breaker you must add a new `circuit_breakers` object to the `extended_paths` section of your API definition, with the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `threshold_percent`: the proportion of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- `samples`: the minimum number of requests that must be received during the rolling sampling window before the circuit breaker can trip
- `return_to_service_after`: the period for which the breaker will remain _open_ after being tripped before returning to service (seconds)
- `disable_half_open_state`: by default the Tyk circuit breaker will operate in [half-open mode]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers#half-open-mode" >}}) when working with Tyk Classic APIs, set this to `true` if you want Tyk to wait the full cooldown period before closing the circuit
 
For example:
```json  {linenos=true, linenostart=1}
{
    "circuit_breakers": [
        {
            "path": "status/200",
            "method": "GET",
            "threshold_percent": 0.5,
            "samples": 10,
            "return_to_service_after": 60,
            "disable_half_open_state": false
        }
    ]
}
```
In this example the circuit breaker has been configured to monitor HTTP `GET` requests to the `/status/200` endpoint. It will configure a sampling window (`samples`) of 10 requests and calculate the ratio of failed requests (those returning HTTP 500 or above) within that window. If the ratio of failed requests exceeds 50% (`threshold_percent = 0.5`) then the breaker will be tripped. After it has tripped, the circuit breaker will remain _open_ for 60 seconds (`return_to_service_after`). The circuit breaker will operate in _half-open_ mode (`disable_half_open_state = false`) so when _open_, Tyk will periodically poll the upstream service to test if it has become available again.

When the breaker has tripped, it will return `HTTP 503 Service temporarily unavailable` in response to any calls to `GET /status/200`.

##### Configuring the Circuit Breaker in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the circuit breaker middleware for your Tyk Classic API by following these steps.

**Step 1: Add an endpoint for the path and select the Circuit Breaker plugin**

From the **Endpoint Designer** add an endpoint that matches the path for which you want to deploy the circuit breaker. Select the **Circuit Breaker** plugin.

{{< img src="/img/2.10/circuit_breaker.png" alt="Plugin dropdown list" >}}

**Step 2: Configure the circuit breaker**

You can set up the various configurations options for the breaker in the drawer by clicking on it:

{{< img src="/img/2.10/ciruit_breaker_settings.png" alt="Circuit breaker configuration form" >}}

- **Trigger threshold percentage**: The percentage of requests that can error before the breaker is tripped, this must be a value between 0.0 and 1.0
- **Sample size (requests)**: The number of samples to take for a circuit breaker window
- **Return to service in (s)**: The cool-down period of the breaker to return to service (seconds)

**Step 3: Save the API**

Use the *save* or *create* buttons to save the changes and activate the middleware.

**Step 4: Optionally configure webhooks to respond to the circuit breaker events**

The Dashboard supports the separate `BreakerTripped` and `BreakerReset` events, but not the combined `BreakerTriggered` [event type]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}). You should use **API Designer > Advanced Options** to add a Webhook plugin to your endpoint for each event.

{{< img src="/img/dashboard/system-management/webhook-breaker.png" alt="Webhook events" >}}

##### Configuring the Circuit Breaker in Tyk Operator

The example API Definition below configures an API to listen on path `/httpbin-timeout-breaker` and forwards requests upstream to http://httpbin.org. A hard timeout value of 2 seconds is configured for path `/delay/{delay_seconds}`. This will return a `504 Gateway Timeout` response to the client if the upstream response is not received before expiry of the timer.

```yaml {linenos=true, linenostart=1, hl_lines=["30-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-timeout-breaker
spec:
  name: httpbin-timeout-breaker
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-timeout-breaker
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          hard_timeouts:
            - method: GET
              path: /delay/{delay_seconds}
              timeout: 2
          circuit_breakers:
            - method: GET
              path: /status/500
              return_to_service_after: 10
              samples: 4
              threshold_percent: "0.5"
```

A circuit breaker has been configured to monitor `HTTP GET` requests to the `/status/500` endpoint. It will configure a sampling window (samples) of 4 requests and calculate the ratio of failed requests (those returning HTTP 500 or above) within that window. If the ratio of failed requests exceeds 50% (threshold_percent = 0.5) then the breaker will be tripped. After it has tripped, the circuit breaker will remain open for 10 seconds (return_to_service_after). The circuit breaker will operate using the default half-open mode so when open, Tyk will periodically poll the upstream service to test if it has become available again.

When the breaker has tripped, it will return HTTP 503 Service temporarily unavailable in response to any calls to GET /status/500.

#### Enforced Timeouts


In any system, a task or operation takes a certain period of time to complete. When a client makes a request to the Tyk Gateway, it will be dependent upon the responsiveness of the upstream service before it can continue. If the upstream service is suffering from resource overload or congestion the response may be returned too late leading to unacceptable experience for the end user or even to instability in the system.

Tyk's Enforced Timeout middleware can be used to apply a maximum time that the Gateway will wait for a response before it terminates (or times out) the request. If the timeout expires, then Tyk will notify the client with an `HTTP 504 Gateway Timeout` error.

This feature helps to maintain system stability and prevents unresponsive or long-running tasks from affecting the overall performance of the system. The enforced timeout can be customized and configured to suit specific requirements, providing control over resource allocation and ensuring optimal system functionality.

##### When to use an enforced timeout

**Resource management**

The enforced timeout can be implemented to manage system resources efficiently, particularly in high-traffic environments, preventing long-running tasks from monopolising resources, ensuring fair distribution and optimal performance.

**Task prioritization**

Prioritizing critical tasks by setting timeouts based on their expected time-to-complete helps to ensure that essential tasks are completed by reducing the impact of non-responsive upstream services.

**Security measures**

Limiting task durations can help protect against potential security breaches or malicious activities by setting time constraints on user sessions or API requests.

**Time-sensitive operations**

For time-sensitive tasks, enforced timeouts can guarantee timely completion and avoid delays or missed deadlines.

##### How the enforced timeout middleware works

The enforced timeout middleware is enabled and configured at the endpoint level.

The configuration is very simple, the only option being the duration of the timeout (which is declared in seconds) after which the upstream request will be terminated and an `HTTP 504 Gateway Timeout` error returned to the client.

{{< note success >}}
**Note**  

If you are using the Service Discovery option, if an enforced timeout is triggered, the service discovery module will refresh the host / host list.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the enforced timeout middleware [here]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the enforced timeout middleware [here]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Enforced Timeout middleware summary
  - The Enforced Timeout is an optional stage in Tyk's API Request processing chain, activated when the request is proxied to the upstream service.
  - The Enforced Timeout is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


##### Using the Enforced Timeout middleware with Tyk OAS APIs


Tyk's [enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) middleware is configured at the endpoint level, where it sets a limit on the response time from the upstream service. If the upstream takes too long to respond to a request, Tyk will terminate the request and return `504 Gateway Timeout` to the client.

When working with Tyk OAS APIs the enforced timeout is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic" >}}) page.

**Configuring an enforced timeout in the Tyk OAS API Definition**

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The enforced timeout middleware (`enforceTimeout`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `enforceTimeout` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `value`: the duration of the upstream request timer

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-timeout",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-timeout",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-timeout/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "enforceTimeout": {
                        "enabled": true,
                        "value": 3
                    }
                }
            }
        }
    }
}
 ```

In this example Tyk OAS API definition, the enforced timeout has been configured to monitor requests to the `GET /status/200` endpoint. It will configure a timer that will expire (`timeout`) 3 seconds after the request is proxied to the upstream service. If the upstream response is not received before the expiry of the timer, that request will be terminated and Tyk will return `504 Gateway Timeout` to the client.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the enforced timeout.

**Configuring an enforced timeout in the API Designer**

Adding the enforced timeout to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

**Step 1: Add an endpoint**

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

**Step 2: Select the Enforce Timeout middleware**

Select **ADD MIDDLEWARE** and choose the **Enforce Timeout** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-enforce-timeout.png" alt="Adding the Enforce Timeout middleware" >}}

**Step 3: Configure the middleware**

Set the timeout duration that you wish to enforce for requests to the endpoint.

{{< img src="/img/dashboard/api-designer/tyk-oas-enforce-timeout-config.png" alt="Configuring the enforced timeout for the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

**Step 4: Save the API**

Select **SAVE API** to apply the changes to your API.


##### Using the Enforced Timeout middleware with Tyk Classic APIs


Tyk's [enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) middleware is configured at the endpoint level, where it sets a limit on the response time from the upstream service. If the upstream takes too long to respond to a request, Tyk will terminate the request and return `504 Gateway Timeout` to the client.

When working with Tyk Classic APIs the enforced timeout is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring an enforced timeout in Tyk Operator](#configuring-an-enforced-timeout-in-tyk-operator) section below.

**Configuring an enforced timeout in the Tyk Classic API Definition**

To configure an enforced timeout you must add a new `hard_timeouts` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `timeout`: the duration of the upstream request timer

For example:
```json
{
    "hard_timeouts": [
        {
            "path": "/status/200",
            "method": "GET",
            "timeout": 3
        }
    ]
}
```

In this example the enforced timeout has been configured to monitor requests to the `GET /status/200` endpoint. It will configure a timer that will expire (`timeout`) 3 seconds after the request is proxied to the upstream service.

If the upstream response is not received before the expiry of the timer, that request will be terminated and Tyk will return `504 Gateway Timeout` to the client.

**Configuring an enforced timeout in the API Designer**

You can use the API Designer in the Tyk Dashboard to configure the enforced timeout middleware for your Tyk Classic API by following these steps.

**Step 1: Add an endpoint for the path and select the Enforced Timeout plugin**

From the **Endpoint Designer** add an endpoint that matches the path for which you want to deploy the enforced timeout. Select the **Enforced timeout** plugin.

{{< img src="/img/2.10/enforced_breakout.png" alt="Plugin dropdown" >}}

**Step 2: Configure the timeout**

Then enter the timeout to be enforced for the endpoint (in seconds):

{{< img src="/img/2.10/enforced_timeouts_settings.png" alt="Enforced timeout configuration" >}}

**Step 3: Save the API**

Use the *save* or *create* buttons to save the changes and activate the middleware.

##### Configuring an enforced timeout in Tyk Operator

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring an enforced timeout in the Tyk Classic API Definition](#using-the-enforced-timeout-middleware-with-tyk-classic-apis). It is possible to configure an enforced timeout using the `hard_timeouts` object within the `extended_paths` section of the API Definition.

The example API Definition below configures an API to listen on path `/httpbin-timeout-breaker` and forwards requests upstream to http://httpbin.org. A hard timeout value of 2 seconds is configured for path `/delay/{delay_seconds}`. This will return a `504 Gateway Timeout` response to the client if the upstream response is not received before expiry of the timer.

```yaml {linenos=true, linenostart=1, hl_lines=["26-29"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-timeout-breaker
spec:
  name: httpbin-timeout-breaker
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-timeout-breaker
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          hard_timeouts:
            - method: GET
              path: /delay/{delay_seconds}
              timeout: 2
          circuit_breakers:
            - method: GET
              path: /status/500
              return_to_service_after: 10
              samples: 4
              threshold_percent: "0.5" # Tyk Dashboard API doesn't support strings.
```

We can test the example using the curl command as shown below:

```bash
curl http://localhost:8081/httpbin-timeout/delay/3 -i
    HTTP/1.1 504 Gateway Timeout
Content-Type: application/json
X-Generator: tyk.io
Date: Fri, 09 Aug 2024 07:43:48 GMT
Content-Length: 57

{
    "error": "Upstream service reached hard timeout."
}
```

#### Set Up Liveness Health Checks

Health checks are extremely important in determining the status of an
application - in this instance, the Tyk Gateway. Without them, it can be hard to
know the actual state of the Gateway.

Depending on your configuration, the Gateway could be using a few components:

- The Tyk Dashboard.
- RPC
- Redis (compulsory).

Any of these components could go down at any given point and it is useful to
know if the Gateway is currently usable or not. A good usage of the health
check endpoint is for the configuration of a load balancer to multiple instances of the Gateway or
as a Kubernetes liveness probe.

The following component status will not be returned:

* MongDB or SQL
* Tyk Pump

{{< note success >}}
**Note**  

Health check is implemented as per the [Health Check Response Format for HTTP APIs](https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html) RFC
{{< /note >}}

An example of the response from this API is as follows:


```{.copyWrapper}
{
  "status": "pass",
  "version": "v3.1.1",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "dashboard": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    },
    "rpc": {
      "status": "pass",
      "componentType": "system",
      "time": "2020-05-19T03:42:55+01:00"
    }
  }
}
```

##### Status Levels

The following status levels can be returned in the JSON response.

- **pass**: Indicates that all components required for the Gateway to work 100% are available, and there is no impact on your traffic.

- **warn**: Indicates that one of the components is having an outage but your Gateway is able to keep processing traffic. The impact is medium (i.e. no quotas are applied, no analytics, no RPC connection to MDCB).

- **fail**: Indicates that Redis AND the Tyk Dashboard are unavailable, and can and indicate other failures. The impact is high (i.e. no configuration changes are available for API/policies/keys, no quotas are applied, and no analytics).

##### Configure health check

By default, the liveness health check runs on the `/hello` path. But
it can be configured to run on any path you want to set. For example:


```{.copyWrapper}
health_check_endpoint_name: "status"
```

This configures the health check to run on `/status` instead of `/hello`.

**Refresh Interval**

The Health check endpoint will refresh every 10 seconds.

**HTTP error code**
The Health check endpoint will always return a `HTTP 200 OK` response if the polled health check endpoint is available on your Tyk Gateway. If `HTTP 200 OK` is not returned, your Tyk Gateway is in an error state.


For MDCB installations the `/hello` endpoint can be polled in either your Management or Worker Gateways. It is recommended to use the `/hello` endpoint behind a load balancer for HA purposes.

**Health check examples**

The following examples show how the Health check endpoint returns


**Pass Status**

The following is returned for a `pass` status level for the Open Source Gateway:

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 156
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:36:09 GMT

{
  "description": "Tyk GW",
  "details": {
    "redis": {
      "componentType": "datastore",
      "status": "pass",
      "time": "2021-04-14T17:36:03Z"
    }
  },
  "status": "pass",
  "version": "v3.1.1"
}
```

**Redis outage**

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 303
Content-Type: application/json
Date: Wed, 14 Apr 2021 14:58:06 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "status": "pass",
      "time": "2021-04-14T14:58:03Z"
    },
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T14:58:03Z"
    }
  },
  "status": "warn",
  "version": "v3.1.2"
}
```

**Dashboard outage**

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 292
Content-Type: application/json
Date: Wed, 14 Apr 2021 15:52:47 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "output": "dashboard is down? Heartbeat is failing",
      "status": "fail",
      "time": "2021-04-14T15:52:43Z"
    },
    "redis": {
      "componentType": "datastore",
      "status": "pass",
      "time": "2021-04-14T15:52:43Z"
    }
  },
  "status": "warn",
  "version": "v3.1.2"
}
```
**Dashboard and Redis outage**

```
$ http :8080/hello
HTTP/1.1 200 OK
Content-Length: 354
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:53:33 GMT

{
  "description": "Tyk GW",
  "details": {
    "dashboard": {
      "componentType": "system",
      "output": "dashboard is down? Heartbeat is failing",
      "status": "fail",
      "time": "2021-04-14T17:53:33Z"
    },
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T17:53:33Z"
    }
  },
  "status": "fail",
  "version": "v3.1.2"
}
```


**MDCB Worker Gateway RPC outage**

```
$  http :8080/hello
HTTP/1.1 200 OK
Content-Length: 333
Content-Type: application/json
Date: Wed, 14 Apr 2021 17:21:24 GMT

{
  "description": "Tyk GW",
  "details": {
    "redis": {
      "componentType": "datastore",
      "output": "storage: Redis is either down or was not configured",
      "status": "fail",
      "time": "2021-04-14T17:21:16Z"
    },
    "rpc": {
      "componentType": "system",
      "output": "Could not connect to RPC",
      "status": "fail",
      "time": "2021-04-14T17:21:16Z"
    }
  },
  "status": "fail",
  "version": "v3.1.2"
}
```

#### Load Balancing


Tyk supports native round-robin load-balancing in its proxy. This means that Tyk will rotate requests through a list of target hosts as requests come in. This can be very useful in microservice architectures where clusters of specialized services are launched for high availability.

Setting up load balancing is done on a per API basis, and is defined in the API Definition file/object:

*   `proxy.enable_load_balancing`: Set this value to `true` to have a Tyk node distribute traffic across a list of servers.

*   `proxy.target_list`: A list of upstream targets (can be one or many hosts):

```{.copyWrapper}
"target_list": [
  "http://10.0.0.1",
  "http://10.0.0.2",
  "http://10.0.0.3",
  "http://10.0.0.4"
]
```
{{< note success >}}
**Note**  

You must fill in the `target_list` section.
{{< /note >}}


See [Service Discovery]({{< ref "planning-for-production/ensure-high-availability/service-discovery" >}}) to see how you can integrate a service discovery system such as Consul or etcd with Tyk and enable dynamic load balancing support.

##### Configure load balancing and weighting via the Dashboard

To set up load balancing via the Dashboard, from the **Core Settings** tab in the **API Designer** select **Enable round-robin load balancing** from the **API Settings** options:

{{< img src="/img/2.10/round_robin.png" alt="Dashboard load balancing configuration" >}}

You can now add your Load Balancing **Upstream targets** and apply weighting to it. For example, for testing purposes, you can send 10% (set weighting to `1`) of traffic to a beta environment, and 90% (set weighting to `9`)to the production environment.

{{< note success >}}
**Note**  

Weighting is new from v1.10 of the Dashboard
{{< /note >}}

##### Configure load balancing via Tyk Operator

Load balancing is configured within Tyk Operator, using the following configuration parameters within the proxy configuration block:

- `enable_load_balancing`: Set to `true` to activate load balancing
- `target_list`: Specifies a list of upstream targets

An example is shown below:

```yaml {linenos=table,hl_lines=["14-17"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: enable-load-balancing-rr
spec:
  name: enable-load-balancing-rr
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
    enable_load_balancing: true
    target_list: 
        - "httpbin.org"
        - "httpbingo.org"
```

##### gRPC load balancing

You can also perform [gRPC Load balancing]({{< ref "key-concepts/grpc-proxy#grpc-load-balancing" >}}).


#### Service Discovery

Service Discovery is a very useful feature for when you have a dynamically changing upstream service set.

For example, you have ten Docker containers that are running the same service, and you are load balancing between them, if one or more fail, a new service will spawn but probably on a different IP address.

Now the Gateway would need to either be manually reconfigured, or, more appropriately, detect the failure and reconfigure itself.

This is what the service discovery module does.

We recommend using the SD module in conjunction with the circuit breaker features, as this makes detection and discovery of failures at the gateway level much more dynamic and responsive.

##### Service Discovery: Dashboard

The Service Discovery settings are located in the Core tab from the API Designer.

{{< img src="/img/2.10/service_discovery_settings.png" alt="Service discovery" >}}

**Configuring Service Discovery via the Dashboard**

Select **Enable service discovery** to enable the discovery module.

Once enabled, you will have all the options to configure your Service Discovery endpoints:

{{< img src="/img/2.10/service_discovery_settings2.png" alt="Service discovery configuration" >}}

The settings are as follows:

*   **Service discovery options**: New Functionality

*   **Query endpoint**: The endpoint to call, this would probably be your Consul, etcd or Eureka K/V store.

*   **Target path**: Use this setting to set a target path to append to the discovered endpoint, since many SD services only provide host and port data, it is important to be able to target a specific resource on that host, setting this value will enable that.

*   **Data path**: The namespace of the data path, so for example if your service responds with:

```
{ 
  "action": "get", 
  "node": { 
    "key": "/services/single", 
    "value": "http://httpbin.org:6000", 
    "modifiedIndex": 6, 
    "createdIndex": 6 
  } 
}
```
    
    Then your namespace would be `node.value`.

*   **Are the values nested?**: Sometimes the data you are retrieving is nested in another JSON object, e.g. this is how etcd responds with a JSON object as a value key:

```
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "{"hostname": "http://httpbin.org", "port": "80"}",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```
    
In this case, the data actually lives within this string-encoded JSON object, so in this case, you set the value to `checked`, and use a combination of the **data path** and **parent data path** (below).

*   **Parent data path**: This is the namespace of the where to find the nested value, in the above example, it would be `node.value`. You would then change the **data path** setting to be `hostname`, since this is where the hostname data resides in the JSON string. Tyk automatically assumes that the data_path in this case is in a string-encoded JSON object and will try to deserialise it.
    
Tyk will decode the JSON string and then apply the **data path** namespace to that object in order to find the value.

*   **Port data path**: In the above nested example, we can see that there is a separate `port` value for the service in the nested JSON. In this case you can set the **port data path** value and Tyk will treat **data path** as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier such as `/widgets/`).
    
In the above example, the **port data path** would be `port`.

*  **Is port information separate from the hostname?**: New Functionality

*   **Does the endpoint provide a target list?**: If you are using load balancing, set this value to true and Tyk will treat the data path as a list and inject it into the target list of your API Definition.

*   **Cache timeout**: Tyk caches target data from a discovery service, in order to make this dynamic you can set a cache value when the data expires and new data is loaded. Setting it too low will cause Tyk to call the SD service too often, setting it too high could mean that failures are not recovered from quickly enough.


##### Service Discovery Config: API Definition

Service discovery is configured on a per-API basis, and is set up in the API Object under the `proxy` section of your API Definition:

```{.copyWrapper}
enable_load_balancing: true,
service_discovery: {
  use_discovery_service: true,
  query_endpoint: "http://127.0.0.1:4001/v2/keys/services/multiobj",
  use_nested_query: true,
  parent_data_path: "node.value",
  data_path: "array.hostname",
  port_data_path: "array.port",
  use_target_list: true,
  cache_timeout: 10,
  target_path: "/append-this-api-path/"
},
```

Settings are as follows:

*   `service_discovery.use_discovery_service`: Set this to `true` to enable the discovery module.
*   `service_discovery.query_endpoint`: The endpoint to call, this would probably be your Consul, etcd or Eureka K/V store.
*   `service_discovery.data_path`: The namespace of the data path so, for example, if your service responds with:

```
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "http://httpbin.org:6000",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```
    
Then your namespace would be `node.value`.

*   `service_discovery.use_nested_query`: Sometimes the data you are retrieving is nested in another JSON object, e.g. this is how etcd responds with a JSON object as a value key:

```
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "{"hostname": "http://httpbin.org", "port": "80"}",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```
In this case, the data actually lives within this string-encoded JSON object, so in this case, you set the `use_nested_query` to `true`, and use a combination of the `data_path` and `parent_data_path` (below)

*   `service_discovery.parent_data_path`: This is the namespace of the where to find the nested value, in the above example, it would be `node.value`. You would then change the `data_path` setting to be `hostname`, since this is where the host name data resides in the JSON string. Tyk automatically assumes that the `data_path` in this case is in a string-encoded JSON object and will try to deserialise it.
    
Tyk will decode the JSON string and then apply the `data_path` namespace to that object in order to find the value.

*   `service_discovery.port_data_path`: In the above nested example, we can see that there is a separate `port` value for the service in the nested JSON. In this case you can set the `port_data_path` value and Tyk will treat `data_path` as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier such as `/widgets/`).
    
In the above example, the `port_data_path` would be `port`.

*   `service_discovery.use_target_list`: If you are using load balancing, set this value to `true` and Tyk will treat the data path as a list and inject it into the target list of your API Definition.

*   `service_discovery.cache_timeout`: Tyk caches target data from a discovery service, in order to make this dynamic you can set a cache value when the data expires and new data is loaded. Setting it too low will cause Tyk to call the SD service too often, setting it too high could mean that failures are not recovered from quickly enough.

*   `service_discovery.target_path`: Use this setting to set a target path to append to the discovered endpoint, since many SD services only provide host and port data, it is important to be able to target a specific resource on that host, setting this value will enable that.

##### Service Discovery Examples

**Mesosphere Example**

For integrating service discovery with Mesosphere, you can use the following configuration parameters:

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = false
  portSeperate = true
  dataPath = "host"
  parentPath = "tasks"
  portPath = "ports"
```

**Eureka Example**

For integrating service discovery with Eureka, you can use the following configuration parameters (this assumes that the endpoint will return JSON and not XML, this is achieved by creating an API Definition that injects the header that requests the data type and using this API Definition as the endpoint):

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = false
  portSeperate = true
  dataPath = "hostName"
  parentPath = "application.instance"
  portPath = "port.$"
```

**Etcd Example**

For integrating with etcd, you can use the following configurations:

```{.copyWrapper}
  isNested = false
  isTargetList = false
  endpointReturnsList = false
  portSeperate = false
  dataPath = "node.value"
  parentPath = ""
  portPath = ""
```

**Zookeeper Example**

For this, you need to spin up a REST server that communicates with the Zookeeper instance.
Here is one open source project, ZooREST, that does just that: https://github.com/Difrex/zoorest

With Zookeeper and ZooREST running, test the query endpoint. Don't forget the `+json`:
```{.copyWrapper}
$ curl http://zoorest:8889/v1/get/zk_tyk+json
{
  "data": {
      "path": "httpbin.org"
  },
  "error": "",
  "path": "/zk_tyk",
  "state": "OK",
  "zkstat": {}
}
```

Then, you can use the following Tyk SD configurations:
```{.copyWrapper}
  isNested = false
  isTargetList = false
  endpointReturnsList = false
  portSeperate = false
  dataPath = "data.path"
  parentPath = ""
  portPath = ""
```

**Consul Example**

For integrating service discovery with Consul, you can use the following configuration parameters:

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = true
  portSeperate = true
  dataPath = "Address"
  parentPath = ""
  portPath = "ServicePort"
```

**Linkerd Example**

{{< note success >}}
**Note**  

This configuration is a Tyk Community Contribution.
{{< /note >}}

To integrate Tyk with Linkerd perform the following:

**Configure Linkerd**

For integrating with Linkerd, you need to add the following configuration to your `linkerd.yaml` file, located in the `config/` directory:

```{.copyWrapper}
  routers:
  - protocol: http
    identifier:
      kind: io.l5d.header.token
      header: Custom-Header
```

Then, in your Tyk Dashboard:

1. Select your API from the **System Management > APIs** section and click **Edit**.

2. From the **Core Settings** tab, set the **Target URL** to the Linkerd http server `host:port` address.

3. From the **Endpoint Designer** tab click **Global Version Settings** enter `Custom-Header` in the **Add this header**: field and the value of the Linkerd `app-id` in the **Header value** field.

4. Click **Update** to save your changes.

This is needed since Tyk appends a "Host" header when proxying the request and the "Host" header is also the default header expected by Linkerd.

**For further Linkerd information, see:**

[Linkerd - HTTP proxy documentation](https://linkerd.io/features/http-proxy/ ) (Alternatives Section)

[Linkered - Header Token Identifier documentation](https://linkerd.io/config/0.9.1/linkerd/index.html#header-token-identifier)

[The original Community Contribution](https://community.tyk.io/t/using-tyk-gateway-with-linkerd/1568)

#### Conduct Uptime Tests


As of v1.9 Tyk supports a kind of built-in "uptime awareness" of the underlying services and hosts that it is managing traffic for by actively polling user-defined endpoints at set intervals.

Tyk uptime awareness is not meant to replace traditional uptime monitoring tools, in fact, it is designed to supplement them by offering a way to bypass unhealthy nodes when they are down as part of Tyk's role as an API Gateway.

##### Compatibility 

Uptime tests is only available for Tyk Self-Managed users. It is not available on Tyk Cloud.

##### How do the uptime tests work?

When uptime tests are added into a Tyk cluster, a single Gateway will elect itself as primary. Gateways remain as primary using a dead man's switch, by keeping a key active in Redis. Primaries are re-elected or confirmed every few seconds. If one Gateway stops or fails, another can detect the failure and elect itself as the primary.

The primary Gateway will then run the uptime tests allocated to the cluster (shard group).

The Gateway running the uptime test will have a worker pool defined so that it can execute tests simultaneously every few seconds determined by a Gateway-configurable interval loop. Depending on how many uptime tests are being run, this worker pool should be increased or decreased as needed.


##### Initial configuration

To configure uptime tests, add the relevant section to your `tyk.conf`:

```{.copyWrapper}
"uptime_tests": {
  "disable": false, // disable uptime tests on the node completely
  "poller_group":"",
  "config": {
    "enable_uptime_analytics": true,
    "failure_trigger_sample_size": 3,
    "time_wait": 300,
    "checker_pool_size": 50
  }
}
```

*   `disable`: When set to `false` this tells Tyk to run uptime tests, if you do not want any uptime tests to run on a Gateway, set it to `true` and they will be disabled on those Gateways (this could be useful if you are running uptime tests in a separate group of Tyk instances).
*   `poller_group`: This field is used to define a different group of uptime tests. All the gateways that have the same `poller_group`, will be candidate to be elected as the primary Gateway of its group. This could be useful if you are running uptime tests in a segmented or sharded group of Tyk instances.
*   `enable_uptime_analytics`: Tyk supports the recording of the data that is generated by the uptime tests, these can then be tabulated in the dashboard. Set to `true` to enable uptime analytics. However, since uptime tests run constantly, they can generate large amounts of data, for some users who do not wish to manage this data, they can disable it by setting this value to `false`.
*   `failure_trigger_sample_size`: Here we tell Tyk to trigger a `HostDown` or `HostUp` event after the test has failed or passed a set number of times; `3` in this example. Setting the number to higher values can protect against false positives, but can increase lead incident time due to the verification.
*   `time_wait`: The number of seconds between running tests. In this example it is set to `300` seconds.
*   `checker_pool_size`: The worker pool for uptime tests. In this example we have configured Tyk to keep `50` idle workers in memory to send tests to, in other words, with this configuration, you are pretty much guaranteed asynchronous testing for up to 50 tests.

##### Configure with the API Definition

Uptime test check lists sit within API configurations, so in your API Definition add a section for the tests:

```{.copyWrapper}
uptime_tests: {
  check_list: [
    {
      "url": "http://google.com/"
    },
    {
      "url": "http://posttestserver.com/post.php?dir=uptime-checker",
      "method": "POST",
      "headers": {
        "this": "that",
        "more": "beans"
      },
      "body": "VEhJUyBJUyBBIEJPRFkgT0JKRUNUIFRFWFQNCg0KTW9yZSBzdHVmZiBoZXJl"
    }
  ]
},
```

Uptime tests are not versioned.

In the above example there are two forms for the Uptime test, a "quick" form, which assumes a GET request:

```
{
  "url": "http://google.com/"
}
```

Or a long form, which allows for a full request to be checked or mocked:

```
{
  "url": "http://posttestserver.com/post.php?dir=tyk-checker-target-test&beep=boop",
  "method": "POST",
  "headers": {
    "this": "that",
    "more": "beans"
  },
  "body": "VEhJUyBJUyBBIEJPRFkgT0JKRUNUIFRFWFQNCg0KTW9yZSBzdHVmZiBoZXJl",
  "timeout": 1000
}
```

*   `body`: The `body` is Base64 encoded.
*   `timeout`: The `timeout` in milli seconds.


##### Configure with the Dashboard

To add an uptime test using the dashboard is very simple. Make sure that you have fulfilled the prerequisite configuration in your Gateway to enable the tester.

**Step 1: Select the Uptime Tests tab**

From the API Designer select the **Uptime Tests** tab:

{{< img src="/img/2.10/uptime_tests.png" alt="Uptime tests tab location" >}}

**Step 2: Click Add**

Click **Add** to add a test:

{{< img src="/img/2.10/uptime_test_add.png" alt="Add button location" >}}

**Step 3: Enter Path Details**

From the **Path Details** pop-up, complete the details and click **Add** to add the test:

{{< img src="/img/2.10/uptime_test_path_details.png" alt="Test details form and add button location" >}}

##### Events

**Uptime and downtime events**

When Tyk detects downtime on a test, it will trigger a system event called `HostDown`, when that host returns to service, it will trigger `HostUp`. These events are triggered in the same event system as other Tyk Events, and therefore can have any kind of action performed:

*   A logger action
*   A web hook to a notification URL
*   A custom JS script for complex API interactions

Please see the section on the event system on how to add event handlers to your API Definition.

Since tests are on a URL-by-URL basis, you could potentially see multiple `HostDown` events for a single host where multiple endpoints are being tested.

##### Load balancing and Service Discovery

**Downtime detection and service availability**

If you have configured Tyk to use round-robin load balancing, you can enable an option in the `proxy` section of your API Definition that will check the hostname of the outbound Tyk request (to your service) against the downtime list to see if the server is active, if the host is marked as "down" Tyk will skip to the next host in its list before making the request:

Note, the fully qualified host, including the port, needs to be exactly the same between the uptime test config and the RRLB entry in order for Tyk to link the two together.

ie: `www.myapi.com:3000`

```
...
"proxy": {
  ...
  "check_host_against_uptime_tests": true,
  ...
}
...
```


## Manage Multi-Environment and Distributed Setups

### Store Configuration with Key-Value Store
#### Using external Key Value storage with Tyk


With Tyk Gateway you can store configuration data (typically authentication secrets or upstream server locations) in Key-Value (KV) systems such as [Vault]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault">}}), and [Consul]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul">}}) and then reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway.

#### When to use external Key-Value storage

##### Simplify migration of APIs between environments

Easily manage and update secrets and other configuration across multiple environments (e.g., development, staging, production) without modifying the configuration files.

##### Ensure separation of concerns

Securely store sensitive information like API keys, passwords, and certificates in a centralised location. Not everybody needs access to these secrets: authorized people can maintain them and just pass along the reference used to access them from the KV store.

##### Support per-machine variables

Storing local settings within the Tyk Gateway's configuration file allows you to have per instance variables, such as a machine ID, and inject these into API requests and responses using [transformation middleware]({{< ref "advanced-configuration/transform-traffic" >}}).

#### How external Key-Value storage works

There are two parts to external Key-Value storage - the KV store and the Tyk configuration object (API definition or Tyk Gateway config file).

1. The key-value data that you wish to reference should be added to the storage
2. References should be included within the Tyk configuration object that identify the location (KV store) and Key
3. When Tyk Gateway initialises it will resolve any external KV references in its configuration, retrieving and applying the values from those references
4. When Tyk Gateway loads (or reloads) APIs it will resolve any external KV references in the API definitions, retrieving and applying the values from those references

Most Key-Value references are only retrieved when the configuration object (Gateway or API) is loaded, as explained above: changes to the externally stored value will not be detected until a subsequent gateway hot-reload.

The exception to this is for specific [transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) where the value will be retrieved for each call to the API, during the processing of the API request or response.

{{< note success >}}
**Note**  

If Tyk Gateway cannot communicate with the KV store, it will log an error and will treat the referenced key value as empty, continuing to load the Gateway or API, or to process the transformation middleware as appropriate.
{{< /note >}}

#### Supported storage options

Tyk Gateway supports the following locations for storage of key-value data, providing flexibility to choose the most suitable approach for your deployment and the data you are storing:

##### Consul

HashiCorp [Consul](https://www.consul.io) is a service networking solution that is used to connect and configure applications across dynamic, distributed infrastructure. Consul KV is a simple Key-Value store provided as a core feature of Consul that can be used to store and retrieve Tyk Gateway configuration across multiple data centers.
- to retrieve the value assigned to a `KEY` in Consul you will use `consul://KEY` or `$secret_consul.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#how-to-access-the-externally-stored-data" >}}) of the reference

##### Vault

[Vault](https://vaultproject.io) from Hashicorp is a tool for securely accessing secrets. It provides a unified interface to any secret while providing tight access control and recording a detailed audit log. Tyk Gateway can use Vault to manage and retrieve sensitive secrets such as API keys and passwords.
- to retrieve the value assigned to a `KEY` in Vault you will use `vault://KEY` or `$secret_vault.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#how-to-access-the-externally-stored-data" >}}) of the reference

##### Tyk Gateway config file

The `secrets` section in the [Tyk Gateway configuration file]({{< ref "tyk-oss-gateway/configuration#secrets" >}}) allows you to store settings that are specific to a single Tyk Gateway instance. This is useful for storing instance-specific configuration to be injected into API middleware or if you prefer using configuration files.
- to retrieve the value assigned to a `KEY` in the `secrets` config you will use `secrets://KEY` or `$secret_conf.KEY` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#how-to-access-the-externally-stored-data" >}}) of the reference

##### Environment variables

Tyk Gateway can access data declared in environment variables. This is a simple and straightforward way to manage secrets, especially in containerised environments like Docker or Kubernetes.
- if you want to set the local "secrets" section (equivalent to the `secrets` section in the [Gateway config file]({{< ref "tyk-configuration-reference/kv-store#tyk-gateway-config-file" >}})) using environment variables, you should use the following notation: `TYK_GW_SECRETS=key:value,key2:value2`
- if you’re using a different key value secret store not explicitly supported by Tyk but can map it to `TYK_GW_SECRETS`
then this will allow you to access those KV data
- to retrieve the value assigned to an environment variable `VAR_NAME` you will use `env://VAR_NAME` or `$secret_env.VAR_NAME` notation depending on the [location]({{< ref "tyk-configuration-reference/kv-store#how-to-access-the-externally-stored-data" >}}) of the reference

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

To reference the *Value* assigned to a *Key* in one of the KV stores from the Gateway configuration file use the following notation:
- Consul: `consul://path/to/key`
- Vault: `vault://path/to/secret.key`
- `tyk.conf` secrets: `secrets://key`
- Environment variables: `env://key`

For example, if you create a Key-Value pair in [Vault]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault#how-key-value-data-is-stored-in-vault" >}}) with the *key* `shared-secret` in *secret* `gateway-dashboard` within directory `tyk-secrets/` then you could use the *Value* as the `node_secret` in your Gateway config by including the following in your `tyk.conf` file:
``` .json
{
  "node_secret":"vault://tyk-secrets/gateway-dashboard.shared-secret"
}
```
When the Gateway starts, Tyk will read the *Value* from Vault and use this as the `node_secret`, which is used to [secure connection to the Tyk Dashboard]({{< ref "tyk-oss-gateway/configuration#node_secret" >}}).

Note that all of these references are read (and replaced with the values read from the KV location) on Gateway start when loading the `tyk.conf` file.

##### From API Definitions

From Tyk Gateway v5.3.0 onwards, you can store [any string field]({{< ref "tyk-configuration-reference/kv-store#other-string-fields" >}}) from the API definition in any of the supported KV storage options; for earlier versions of Tyk Gateway only the [Target URL and Listen Path]({{< ref "tyk-configuration-reference/kv-store#target-url-and-listen-path" >}}) fields and [certain transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) configurations were supported. 

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

When the Gateway starts, Tyk will read the *Value* from the environment variable and use this as the [Target URL]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#upstream" >}}).

{{< note success >}}
**Note** 

Prior to Tyk Gateway v5.3.0, **environment variables** used for the Target URL or Listen Path had to be named `TYK_SECRET_{KEY_NAME}`. They were referred to in the API definition using `env://{KEY_NAME}` excluding the `TYK_SECRET_` prefix.
<br><br>
From v5.3.0 onward, environment variables can have any `KEY_NAME`, and the full name should be provided in the API definition reference. The pre-v5.3.0 naming convention is still supported for backward compatibility, but only for these two fields.

{{< /note >}}

**Transformation middleware**

Key-value references can be included in the following middleware, with the values retrieved dynamically when the middleware is called (during processing of an API request or response):
- [request body transform]({{< ref "transform-traffic/request-body" >}})
- [request header transform]({{< ref "transform-traffic/request-headers" >}})
- [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}})
- [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}})
- [response header transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}})

To reference the *Value* assigned to a *Key* in one of the KV stores from these middleware use the following notation:
- Consul: `$secret_consul.key`
- Vault: `$secret_vault.key`
- Tyk config secrets: `$secret_conf.key`
- Environment variables: `$secret_env.key` or `env://key` (see [here]({{< ref "tyk-configuration-reference/kv-store#using-environment-variables-with-transformation-middleware" >}}))

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

When accessing KV references from the `/tyk-apis` directory on Consul or Vault, you should not provide the `path/to/` the key except for Target URL and Listen Path (as described [above]({{< ref "tyk-configuration-reference/kv-store#target-url-and-listen-path" >}})).
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

When the Gateway starts, Tyk will read the *Value* from the `secrets` section in the Gateway config file and use this to identify the header where Tyk Gateway should look for the [Authentication]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#authentication" >}}) token in requests to your Tyk OAS API.

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

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your KV pairs wherever you like within the Consul KV store. You can provide the Consul path to the key in the reference using the notation appropriate to the calling [location]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul#how-to-access-data-stored-in-consul" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Consul KV store and store all keys in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in `tyk-apis` in Consul, you would reference this from the API definition using `consul://foo`.

##### How to access data stored in Consul

The notation used to refer to a KV pair stored in Consul depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "tyk-configuration-reference/kv-store#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Consul using the following notation:
- `consul://path/to/KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Consul KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Consul by providing the directory path within Consul KV using the following notation:
- `consul://path/to/KEY`

For [certain transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Consul:
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

As explained [below]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault#tyk-gateway-configuration-file" >}}), you could retrieve this value from within your Tyk Gateway config file using: 
   `TYK_GW_SECRET=vault://my-secret/tyk.gw`

##### Where to store data in Vault

When you want to reference KV data from Tyk Gateway config or transform middleware, you can store your Vault *secrets* wherever you like within the KV store. You can provide the Vault path to the key in the reference using the notation appropriate to the calling [location]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault#how-to-access-data-stored-in-vault" >}}).

From Tyk Gateway 5.3.0, you can reference KV data from any `string` field in the API definition. For these you should create a folder named `tyk-apis` in the root of your Vault KV store and store all *secrets* in a flat structure there (sub-directories not currently supported). You should not include the `tyk-apis` path in the reference so, for example, given a key-value pair `"foo":"bar"` stored in a secret named `my-secret` in `/tyk-apis` in Vault, you would reference this from the API definition using `vault://my-secret.foo`.

##### How to access data stored in Vault

The notation used to refer to a key-value pair stored in Vault depends upon the location of the reference as follows.

**Tyk Gateway configuration file**

As described [here]({{< ref "tyk-configuration-reference/kv-store#from-the-tyk-gateway-configuration-file" >}}), from Tyk Gateway's configuration file (`tyk.conf`) you can retrieve values from Vault using the following notation:
- `vault://path/to/secret.KEY`

**API definition**

The **Target URL** and **Listen Path** key-value pairs can be stored in any directory in the Vault KV store as they are accessed using a different mechanism than other fields in the API definition. If storing these in a sub-directory, you can retrieve the values from Vault by providing the directory path within Consul KV using the following notation:
- `vault://path/to/secret.KEY`

For [certain transformation middleware]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) because the secret resolution happens during the request context, a different notation is used to retrieve values from Vault:
- `$secret_vault.KEY`

From Tyk Gateway v5.3.0 onwards, you can store KV pairs to be used in **any `string` field** in the API definition in the Vault KV store. You can retrieve these values from Vault, noting that you do not provide the directory path (`/tyk-apis`) when accessing data for *these* fields, using the following notation:
- `vault://KEY`


### Implement Multi-Data Centre Setup
    

Tyk’s Multi Data Center Bridge (MDCB) is a separately licensed extension to the Tyk control plane that performs management and synchronisation of logically or geographically distributed clusters of Tyk API Gateways. We use it ourselves to support our Tyk Cloud offering.

#### Challenges of managing APIs in a distributed environment

When your users are spread geographically and want to access your APIs from different parts of the world you can optimize the performance, value and utility of your APIs by deploying API Gateways in data centers local to them.

{{< img src="/img/mdcb/mdcb-intro1.png" width="800" height="975" alt="Single API gateway" >}}

Having localised gateways offers benefits to you and your users, such as:

- Reduced latency (roundtrip time) for users by accessing a local data center
- Deployment close to backend services, reducing interconnect costs and latencies
- Increased availability across your estate - if one region goes offline the rest will continue to serve users
- Compliance with data residency and sovereignty regulations

{{< img src="/img/mdcb/mdcb-intro2.png" width="800" height="975" alt="Distributed API gateways" >}}

This distributed architecture, however, introduces challenges for you in terms of managing the configuration, synchronisation and resilience of the Gateways in each data center.

- How do you configure each of the Tyk API Gateways to ensure that a user can access only their authorized APIs, but from any location?
- How can you ensure that the correct APIs are deployed to the right Gateways - and kept current as they are updated?

As the complexity of your architecture increases, this maintenance becomes an increasingly difficult and expensive manual task.

This is where Tyk’s Multi Data Center Bridge (MDCB) comes in.

##### How does Tyk Multi Data Center Bridge help manage your APIs in a distributed environment?

The Tyk MDCB makes it possible to manage federated global deployments easily, from a central Dashboard: you can confidently deploy a multi-data center, geographically isolated set of Tyk Gateway clusters for maximum redundancy, failover, latency optimization, and uptime.

Combining Tyk Dashboard with MDCB, you are provided with a “single pane of glass” or control plane that allows you to centrally manage multiple Tyk Gateway clusters. This has many advantages over having separate gateways and corresponding dashboard/portals, which would require manual synchronisation to roll out any changes (e.g. new APIs) across all the individual gateways. 

By deploying MDCB, API Management with Tyk becomes a service that can be easily offered to multiple teams from a centralised location.

{{< img src="/img/mdcb/mdcb-intro3.png" width="800" height="975" alt="Distributed API Gateways with MDCB" >}}

##### How does MDCB work?

MDCB acts as a broker between the Tyk Gateway instances that you deploy in data centers around the world. A single Control Plane (Management) Gateway is used as reference: you configure APIs, keys and quotas in one central location; MDCB looks after the propagation of these to the Data Plane (or Worker) Gateways, ensuring the synchronisation of changes.

MDCB is extremely flexible, supporting clusters of Tyk Gateways within or across data centers - so for example two clusters within the same data center could run different configurations of APIs, users etc.

MDCB keeps your Tyk API Gateways highly available because all the Worker Gateways, where your users access your APIs, can be configured and run independently. If the MDCB link back to the Management Gateway goes down, the Workers will continue to service API requests; when the link is back up, MDCB will automatically refresh the Workers with any changes they missed.

{{< img src="/img/mdcb/mdcb-intro4.png" width="800" height="975" alt="Multi Data Center Bridge is down" >}}

What happens if the worst happens and Worker Gateways fail while the link to the Control Plane is down? We’ve thought of that: Tyk will automatically configure the new Workers that spin up using the last known set of API resources in the worker’s cluster, minimizing the impact on availability of your services.

##### When might you deploy MDCB?

**Managing geographically distributed gateways to minimize latency and protect data sovereignty**

Consider Acme Global Bank: they have customers in the USA and the EU. Due to compliance, security and performance requirements they need to deploy their Tyk API Gateways locally in each of those regions. They need to manage the deployment and synchronisation of APIs and associated resources (e.g. keys, policies and certificates) between the data centers to ensure global service for their customers.

{{< img src="/img/mdcb/mdcb-acme-global-bank1.png" width="600" height="750" alt="Acme Global Bank without MDCB" >}}

Tyk MDCB enables Acme Global Bank to power this architecture by creating a primary data center with all the Tyk Control Plane components and secondary (worker) data centers that act as local caches to run validation and rate limiting operations to optimize latency and performance.

{{< img src="/img/mdcb/mdcb-acme-global-bank2.png" width="600" height="750" alt="Acme Global Bank with MDCB" >}}

**Managing a complex deployment of services with internal and externally facing APIs**

Consider Acme Telecoms: they have a large nationally distributed workforce and complex self-hosted IT systems; are using Tyk API Gateways to deploy internal and external APIs; and have different teams managing and consuming different sets of APIs across multiple sites. They need to ensure data segregation, availability, and access for internal and external users and partners.

{{< img src="/img/mdcb/mdcb-acme-telecoms1.png" width="600" height="750" alt="Acme Telecoms without MDCB" >}}

Combining Tyk’s built-in multi-tenancy capability with MDCB enables Acme Telecoms to set up dedicated logical gateways for different user groups and different physical gateways to guarantee data segregation, with a single management layer for operational simplicity.

{{< img src="/img/mdcb/mdcb-acme-telecoms2.png" width="600" height="750" alt="Acme Telecoms with MDCB" >}}

##### There are many reasons why MDCB may be just what you need

Beyond the two usage scenarios described here, there are many others where MDCB will provide you with the power and flexibility you need to manage your own particular situation.

Here are some examples of the benefits that deploying Tyk MDCB can bring:

**Flexible architecture**

- You can control geographic distribution of traffic, restricting traffic to data centers/regions of your choice.
- You can put your Tyk API Gateways close to users, but still have a single management layer.
- You have a single, simple, point of access for configuration of your complex API infrastructure and yet deploy multiple Developer Portals, if required, to provide access to different user groups (e.g. Internal and External).
- You can physically [segment teams and environments]({{< ref "/advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud.md" >}}) within a single physical data center, giving each team full control of its own API gateway and server resources without the noisy neighbors you might experience in a standard self-managed deployment.
- You can deploy gateways with whichever mix of cloud vendors you wish.
- You can mix and match cloud and on premises data centers.

**Improved resiliency, security and uptime**

- Each Data Plane (Worker) Gateway operates autonomously using a locally stored copy of the API resources it needs.
- The Control Plane (Management) Gateway maintains synchronisation of these configurations across your Tyk deployment via the MDCB backbone link.
- If the Management Gateway or MDCB backbone fails, the Workers will continue to handle API requests, rejecting only new authorization tokens created on other Gateways. When connectivity is restored, the Worker Gateways will hot-reload to fetch any updated configurations (e.g. new authorization tokens) from the Control Plane.
- If a Worker Gateway fails, this does not impact the operation of the others: when it comes back online, if it is unable to contact the Control Plane, it will retrieve the “last good” configuration held locally.
- The MDCB backbone runs on a resilient compressed RPC channel that is designed to handle ongoing and unreliable connectivity; all traffic on the backbone is encrypted and so safer to use over the open internet or inter-data center links.
- Improved data security through separation of traffic into completely separate clusters within your network.

**Reduced latency**

- Deploying Data Plane (Worker) Gateways close to your geographically distributed API consumers helps reduce their perceived request latency.
- Deploying Worker Gateways close to your backend services will minimize round trip time servicing API requests.
- The Worker Gateways cache keys and other configuration locally, so all operations can be geographically localised.
- All traffic to and from one Gateway cluster will have rate limiting, authentication and authorization performed within the data center rather than “calling home” to a central control point; this reduces the  API request round trip time.

**Improved Infrastructure Management**

- Due to the shared control plane, all Worker Gateways report into a single Tyk Dashboard. This provides a simple, consistent place to manage your APIM deployment.
- This allows a shared infra team to offer API management and API Gateways as a service, globally, across multiple clouds and Self-Managed regions, from a single pane of glass.


#### MDCB Components

Here we will give an overview of the main elements of a Tyk Multi Data Center (distributed) solution, clarifying the terminology used by Tyk.
{{< img src="/img/mdcb/mdcb-components.png" width="800" height="975" alt="A Tyk Multi Data Center Bridge deployment" >}}

##### Tyk Gateway 
- The workhorse of any deployment, Tyk’s lightweight Open Source API gateway that exposes your APIs for consumption by your users. It is a reverse proxy that secures your APIs, manages session and policies, monitors, caches and manipulates requests/responses when needed before/after it proxies them to and from the upstream.

##### Tyk Dashboard
- Tyk’s management platform used to control the creation of API configurations, policies and keys in a persistent manner. It provides analytic information on the traffic the Gateways have processed which includes aggregated API usage and detailed information per transaction.

##### Tyk Multi Data Center Bridge (MDCB)
- The backbone of the distributed Tyk deployment, connecting the distributed Data Plane deployments back to the Control Plane.

##### Tyk Pump
- Tyk’s open source analytics purger that can be used to export transaction logs from the Tyk deployment to the visualisation tool or other data store of your choice

##### Tyk Developer Portal
- The access point for your API Consumers where you publish your API catalog(s) and they obtain API keys.

##### Redis
- An in-memory data store used as a database, cache and message broker. We use it as pub/sub broker for inter-Gateway communication, and as a cache for API configurations, keys, certificates, and temporary store for analytics records.

##### MongoDB/SQL
- A persistent data store for API configurations, policies, analytics and aggregated analytics, Dashboard organizations, configurations, dashboard users, portal developers and configuration.


#### Control Plane
{{< img src="/img/mdcb/mdcb-control-plane.png" width="800" height="975" alt="The Tyk Control Plane" >}}

The Control Plane must consist of the following elements:
- **Tyk Dashboard** (used to configure and control the whole Tyk installation)
- **Tyk Gateway** (used for creation of keys and certificates, this does not service API requests; it is important to ensure there is no public access to it and it must not be sharded (tagged) as it "belongs" to the whole Tyk installation)
- **Tyk MDCB**
- **Redis** (high availability Redis data store that should be backed up in case of failure; this [document](https://redis.io/docs/management/persistence/) gives recommendation on Redis persistency)
- **MongoDB or SQL** (a persistent data store that should be deployed and set up for redundancy and high availability)

To improve resilience and availability, multiple instances of each Tyk component should be deployed and load balanced within the Control Plane.

##### Optional Components
- One or more **Tyk Pumps** can be deployed within the Control Plane to export analytics data (request/response logs) to your [data sink of choice]({{< ref "tyk-stack/tyk-pump/other-data-stores" >}}) for further analytics and visualisation.
- A **Tyk Developer Portal** can be added to enhance the end-user experience when accessing your APIs.
 
#### Data Plane
{{< img src="/img/mdcb/mdcb-data-plane.png" width="800" height="975"  alt="The Tyk Data Plane" >}}

The Data Plane deployment must consist of the following elements:
- **Tyk Gateway** (one or more Gateways specifically configured as Workers)
- **Redis** (a single Redis data store shared by all Gateways in the cluster)

To provide resilience and availability, multiple Gateways should be deployed and load balanced within the cluster.
If you want this Data Plane deployment to be resilient, available, and independent from the Control Plane during a disconnection event, it is advised to make the Redis data store persistent.
  
##### Optional Components
- A **Tyk Pump** specifically configured as a [Hybrid Pump]({{< ref "product-stack/tyk-charts/tyk-data-plane-chart#hybrid-pump" >}}) can be deployed with the Data Plane gateways to export analytics data (request/response logs) to your [data sink of choice]({{< ref "tyk-stack/tyk-pump/other-data-stores" >}}) for further analytics and visualisation.
 

#### Minimizing latency with MDCB

As described [previously]({{< ref "/tyk-multi-data-centre.md#managing-geographically-distributed-gateways-to-minimize-latency-and-protect-data-sovereignty" >}}), Acme Global Bank has operations and customers in both the EU and USA.

To decrease the latency in response from their systems and to ensure that data remains in the same legal jurisdiction as the customers (data residency), they have deployed backend (or, from the perspective of the API gateway, “upstream”) services in two data centers: one in the US, the other in the EU.

Without a dedicated solution for this multi-region use case, Acme Global Bank would deploy a Tyk Gateway cluster in each data center and then have the operational inconvenience of maintaining two separate instances of Tyk Dashboard to configure, secure and publish the APIs.

By using Tyk's Multi-Data Center Bridge (MDCB), however, they are able to centralise the management of their API Gateways and gain resilience against failure of different elements of the deployment - data or control plane - improving the availability of their public APIs.

In this example we will show you how to create the Acme Global Bank deployment using our example Helm charts.

{{< img src="/img/mdcb/mdcb_poc1_overview.png" width="600" height="750" alt="MDCB Proof of Concept - Acme Global Bank" >}}

---

##### Step-by-step instructions to deploy the Acme Global Bank scenario with Kubernetes in a public cloud (here we’ve used Google Cloud Platform):

**Pre-requisites and configuration**

1. What you need to install/set-up
    - Tyk Pro license (Dashboard and MDCB keys - obtained from Tyk)
    - Access to a cloud account of your choice, e.g. GCP
    - You need to grab this Tyk Demo repository: [GitHub - TykTechnologies/tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo)
    - You need to install `helm`, `jq`, `kubectl` and `watch`

2. To configure GCP
    - Create a GCP cluster
    - Install the Google Cloud SDK
       - install `gcloud`
       - `./google-cloud-sdk/install.sh`
    - Configure the Google Cloud SDK to access your cluster
       - `gcloud auth login`
       - `gcloud components install gke-gcloud-auth-plugin`
       - `gcloud container clusters get-credentials <<gcp_cluster_name>> —zone <<zone_from_gcp_cluster>>—project <<gcp_project_name>>`
    - Verify that everything is connected using `kubectl`
       - `kubectl get nodes`

3. You need to configure the Tyk build
    - Create a `.env` file within tyk-k8s-demo based on the provided `.env.example` file
    - Add the Tyk license keys to your `.env`:
       - `LICENSE=<dashboard_license>`
       - `MDCB_LICENSE=<mdcb_license>`

**Deploy Tyk Stack to create the Control and Data Planes**

1. Create the Tyk Control Plane
     - `./up.sh -r redis-cluster -e load-balancer tyk-cp`

*Deploying the Tyk Control Plane*
{{< img src="/img/mdcb/mdcb-poc1-screenshot1.png" alt="Tyk Control Plane Deployed" >}}

2. Create two logically-separate Tyk Data Planes (Workers) to represent Acme Global Bank’s US and EU operations using the command provided in the output from the `./up.sh` script:
    - `TYK_WORKER_CONNECTIONSTRING=<MDCB-exposure-address:port> TYK_WORKER_ORGID=<org_id> TYK_WORKER_AUTHTOKEN=<mdcb_auth_token> TYK_WORKER_USESSL=false ./up.sh --namespace <worker-namespace> tyk-worker`

Note that you need to run the same command twice, once setting `<worker-namespace>` to `tyk-worker-us`, the other to `tyk-worker-eu` (or namespaces of your choice)

*Deploying the `tyk-worker-us` namespace (Data Plane #1)*
{{< img src="/img/mdcb/mdcb-poc1-screenshot2.png" alt="Deploying the tyk-worker-us namespace" >}}  

*Deploying the `tyk-worker-eu` namespace (Data Plane #2)*
{{< img src="/img/mdcb/mdcb-poc1-screenshot3.png" alt="Deploying the tyk-worker-eu namespace" >}}

3. Verify and observe the Tyk Control and Data Planes
    - Use `curl` to verify that the gateways are alive by calling their `/hello` endpoints

{{< img src="/img/mdcb/mdcb-poc1-screenshot4.png" alt="observe Tyk K8s namespace console output">}}

    - You can use `watch` to observe each of the Kubernetes namespaces

*`tyk-cp` (Control Plane)*
{{< img src="/img/mdcb/mdcb-poc1-screenshot5.png" alt="Control Plane" >}}  

*`tyk-worker-us` (Data Plane #1)*
{{< img src="/img/mdcb/mdcb-poc1-screenshot6.png" alt= "Data Plane #1" >}} 

*`tyk-worker-eu` (Data Plane #2)*
{{< img src="/img/mdcb/mdcb-poc1-screenshot7.png" alt="Data Plane #2" >}}

**Testing the deployment to prove the concept**
As you know, the Tyk Multi Data Center Bridge provides a link from the Control Plane to the Data Plane (worker) gateways, so that we can control all the remote gateways from a single dashboard.

1. Access Tyk Dashboard
    - You can log into the dashboard at the external IP address reported in the watch window for the Control Plane - in this example it was at `34.136.51.227:3000`, so just enter this in your browser
    - The user name and password are provided in the `./up.sh` output:
      - username: `default@example.com`
      - password: `topsecretpassword` (or whatever you’ve configured in the `.env` file)
      
{{< img src="/img/mdcb/mdcb-poc1-screenshot8.png" alt="Tyk Dashboard login" >}}

2. Create an API in the dashboard, but don’t secure it (set it to `Open - keyless`); for simplicity we suggest a simple pass-through proxy to `httbin.org`.
3. MDCB will propagate this API through to the workers - so try hitting that endpoint on the two Data Plane gateways (their addresses are given in the watch windows: for example `34.173.240.149:8081` for my `tyk-worker-us` gateway above).
4. Now secure the API from the dashboard using the Authentication Token option. You’ll need to set a policy for the API and create a key.
5. If you try to hit the API again from the workers, you’ll find that the request is now rejected because MDCB has propagated out the change in authentication rules. Go ahead and add the Authentication key to the request header… and now you reach `httpbin.org` again. You can see in the Dashboard’s API Usage Data section that there will have been success and error requests to the API.
6. OK, so that’s pretty basic stuff, let’s show what MDCB is actually doing for you… reset the API authentication to be `Open - keyless` and confirm that you can hit the endpoint without the Authentication key from both workers.
7. Next we’re going to experience an MDCB outage - by deleting its deployment in Kubernetes:
<br>`kubectl delete deployment.apps/mdcb-tyk-cp-tyk-pro -n tyk`
8. Now there's no connection from the data placne to the control plane, but try hitting the API endpoint on either worker and you’ll see that they continue serving your users' requests regardless of their isolation from the Control Plane.
9. Back on the Tyk Dashboard make some changes - for example, re-enable Authentication on your API, add a second API. Verify that these changes **do not** propagate through to the workers.
10. Now we’ll bring MDCB back online with this command:
<br>`./up.sh -r redis-cluster -e load-balancer tyk-cp`
11. Now try hitting the original API endpoint from the workers - you’ll find that you need the Authorization key again because MDCB has updated the Data Planes with the new config from the Control Plane.
12. Now try hitting the new API endpoint - this will also have automatically been propagated out to the workers when MDCB came back up and so is now available for your users to consume.

Pretty cool, huh?

There’s a lot more that you could do - for example by deploying real APIs (after all, this is a real Tyk deployment) and configuring different Organization Ids for each Data Plane to control which APIs propagate to which workers (allowing you to ensure data localisation, as required by the Acme Global Bank).

**Closing everything down**
We’ve provided a simple script to tear down the demo as follows:
1. `./down.sh -n tyk-worker-us`
2. `./down.sh -n tyk-worker-eu`
3. `./down.sh`

**Don’t forget to tear down your clusters in GCP if you no longer need them!**


#### Setup MDCB Control Plane

The [Tyk control plane]({{< ref "tyk-multi-data-centre/mdcb-components.md#control-plane" >}}) contains all the
standard components of a standard Tyk Self-Managed installation with the addition of the Multi Data Center Bridge (MDCB).

##### Installing MDCB Component On Linux
The MDCB component must be able to connect to Redis and MongoDB/PostgreSQL directly from within the Control Plane deployment. It does not require access to the Tyk Gateway(s) or Dashboard application.

The MDCB component will however, by default, expose an RPC service on port 9091, to which the [Tyk Data Plane]({{< ref "tyk-multi-data-centre/mdcb-components.md#data-plane" >}}) data centers, i.e. the worker gateway(s) that serves API traffic, will need connectivity.

**Prerequisites**
We will assume that your account manager has provided you with a valid MDCB and Dashboard License and the command to enable you to download the MDCB package.
We will assume that the following components are up and running in your Controller DC:

* MongoDB or SQL (check [supported versions]({{< ref "planning-for-production/database-settings" >}}))
* Redis (check [supported versions]({{< ref "planning-for-production/redis" >}}))
* Tyk Dashboard
* Tyk Gateway / Gateways Cluster
* Working Tyk-Pro [Self-Managed installation]({{< ref "tyk-self-managed/install" >}})

{{< note success >}}
**Note**  

When using SQL rather than MongoDB in a production environment, we only support PostgreSQL.
{{< /note >}}

**Installing using RPM and Debian packages**
To download the relevant MDCB package from PackageCloud:

```curl
curl -s https://packagecloud.io/install/repositories/tyk/tyk-mdcb-stable/script.deb.sh | sudo bash
```

```curl
curl -s https://packagecloud.io/install/repositories/tyk/tyk-mdcb-stable/script.rpm.sh | sudo bash
```

After the relevant script for your distribution has run, the script will let you know it has finished with the following message:

`The repository is setup! You can now install packages.`

You will now be able to install MDCB as follows:

```curl
sudo apt-get install tyk-sink
```

Or

```curl
sudo yum install tyk-sink
```

##### Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Control Plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}) helm chart is pre-configured to install Tyk control plane for multi data center API management from a single Dashboard with the MDCB component.

Below is a concise instruction on how to set up an MDCB Control Plane with Redis and PostgreSQL.

To access the comprehensive installation instructions and configuration options, please see [Tyk Control Plane Helm Chart]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}).

**Prerequisites**
- [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
- [Helm 3+](https://helm.sh/docs/intro/install/)
- MDCB and Dashboard license

**Quick Start**
<br>

**Step 1 - Setup required credentials**

First, you need to provide Tyk Dashboard and MDCB license, admin email and password, and API keys. We recommend to store them in secrets.

```bash
NAMESPACE=tyk-cp

API_SECRET=changeit
ADMIN_KEY=changeit
ADMIN_EMAIL=admin@default.com
ADMIN_PASSWORD=changeit
DASHBOARD_LICENSE=changeit
MDCB_LICENSE=changeit
SECURITY_SECRET=changeit
OPERATOR_LICENSE=changeit

kubectl create namespace $NAMESPACE

kubectl create secret generic my-secrets -n $NAMESPACE \
    --from-literal=APISecret=$API_SECRET \
    --from-literal=AdminSecret=$ADMIN_KEY \
    --from-literal=DashLicense=$DASHBOARD_LICENSE \
    --from-literal=OperatorLicense=$OPERATOR_LICENSE

kubectl create secret generic mdcb-secrets -n $NAMESPACE \
    --from-literal=MDCBLicense=$MDCB_LICENSE \
    --from-literal=securitySecret=$SECURITY_SECRET

kubectl create secret generic admin-secrets -n $NAMESPACE \
    --from-literal=adminUserFirstName=Admin \
    --from-literal=adminUserLastName=User \
    --from-literal=adminUserEmail=$ADMIN_EMAIL \
    --from-literal=adminUserPassword=$ADMIN_PASSWORD
```

**Step 2 - Install Redis (if you don't already have Redis installed)**

If you do not already have Redis installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version 19.0.2
```
Follow the notes from the installation output to get connection details and password. The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk-cp.svc:6379` (Tyk needs the name including the port) 

The Bitnami chart also creates a secret `tyk-redis` which stores the connection password in `redis-password`. We will make use of this secret in installation later.

{{< note >}}
**Note**

Ensure that you are installing Redis versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "planning-for-production/redis#supported-versions" >}}) that are compatible with Tyk.
{{< /note >}}

**Step 3 - Install PostgreSQL (if you don't already have PostgreSQL installed)**

If you do not already have PostgreSQL installed, you may use these charts provided by Bitnami.

```bash
helm upgrade tyk-postgres oci://registry-1.docker.io/bitnamicharts/postgresql --set "auth.database=tyk_analytics" -n $NAMESPACE --install --version 14.2.4
```

Follow the notes from the installation output to get connection details.

We require the PostgreSQL connection string for Tyk installation. This can be stored in a secret and will be used in installation later.

```bash
POSTGRESQLURL=host=tyk-postgres-postgresql.$NAMESPACE.svc\ port=5432\ user=postgres\ password=$(kubectl get secret --namespace $NAMESPACE tyk-postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)\ database=tyk_analytics\ sslmode=disable

kubectl create secret generic postgres-secrets  -n $NAMESPACE --from-literal=postgresUrl="$POSTGRESQLURL"
```


{{< note >}}
**Note**

Ensure that you are installing PostgreSQL versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "tyk-dashboard/database-options" >}}) that are compatible with Tyk.
{{< /note >}}

**Step 4 - Install Tyk Control Plane**
```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/

helm repo update

helm upgrade tyk-cp tyk-helm/tyk-control-plane -n $NAMESPACE \
  --install \
  --set global.adminUser.useSecretName=admin-secrets \
  --set global.secrets.useSecretName=my-secrets \
  --set tyk-mdcb.mdcb.useSecretName=mdcb-secrets \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.postgres.connectionStringSecret.name=postgres-secrets \
  --set global.postgres.connectionStringSecret.keyName=postgresUrl
```

**Step 5 - Done!**

Now Tyk Dashboard and Tyk MDCB should be accessible through service `dashboard-svc-tyk-cp-tyk-dashboard` at port `3000` and `mdcb-svc-tyk-cp-tyk-mdcb` at port `9091` respectively. You can login to Dashboard using the admin email and password to start managing APIs.

You can use the MDCB connection details included in the installation output, to install the [MDCB Data Plane]({{<ref "tyk-multi-data-centre/setup-worker-data-centres">}}).

#### Configuration
If you install MDCB component with package, modify your `/opt/tyk-sink/tyk_sink.conf` file as follows:

##### Configuration Example
```json
{
  "listen_port": 9091,
  "healthcheck_port": 8181,
  "server_options": {
    "use_ssl": false,
    "certificate": {
      "cert_file": "<path>",
      "key_file": "<path>"
    },
    "min_version": 771
  },
  "storage": {
    "type": "redis",
    "host": "localhost",
    "port": 6379,
    "username": "",
    "password": "",
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false
  },
  "basic-config-and-security/security": {
    "private_certificate_encoding_secret": "<gateway-secret>"
  },
  "hash_keys": true,
  "forward_analytics_to_pump": true,
  "ignore_tag_prefix_list": [
    
  ],
  "analytics": {
    "mongo_url": "mongodb://localhost/tyk_analytics",
    "mongo_use_ssl": false,
    "mongo_ssl_insecure_skip_verify": false
  },
  "license": "MDCB_LICENSE_KEY"
}
```

{{< note success >}}
**Note**  

From MDCB 2.0+, you can choose between Mongo or SQL databases to setup your `analytics` storage. In order to setup your PostgreSQL storage, you can use the same configuration from your [Tyk Dashboard main storage]({{< ref "/content/planning-for-production/database-settings/postgresql.md" >}}).

For example, to set up a `postgres` storage the `analytics` configurations would be:

```json
{
...
  ...
  "analytics": {
      "type": "postgres",
      "connection_string": "user=postgres_user password=postgres_password database=dbname host=potgres_host port=postgres_port",
      "table_sharding": false
  },
} 
```
This storage will work for fetching your organization data (APIs, Policies, etc) and for analytics.
{{< /note >}}

You should now be able to start the MDCB service, check that it is up and running and ensure that the service starts on system boot:

```console
sudo systemctl start tyk-sink
```


```console
sudo systemctl enable tyk-sink
```

#### Use MDCB For Health Checks

It is possible to perform a health check on the MDCB service. This allows you to determine if the service is running, so is useful when using MDCB with load balancers.

Health checks are available via the HTTP port. This is defined by `http_port` configuration setting and defaults to `8181`. Do **not** use the standard MDCB listen port (`listen_port`) for MDCB health checks.

From MDCB v2.7.0, there are 2 health check services available:
1. `/liveness` endpoint returns a `HTTP 200 OK` response when the service is operational.
2. `/readiness` endpoint returns a `HTTP 200 OK` response when MDCB is ready to accept requests. It ensures that dependent components such as Redis and data store are connected, and the gRPC server is ready for connection.

See [MDCB API]({{<ref "tyk-mdcb-api">}}) for details of the endpoints.

In MDCB v2.6.0 or earlier, MDCB only offers one health check endpoint at `/health` via the port defined by the `healthcheck_port` configuration setting. The default port is `8181`. The `/health` endpoint is also available on v2.7.0 or later for backward compatibility.

To use the health check service, call the `/health` endpoint i.e. `http://my-mdcb-host:8181/health`. This will return a `HTTP 200 OK` response if the service is running.

Please note that an HTTP 200 OK response from the `/health` endpoint merely indicates that the MDCB service is operational. However, it is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Data store) or if they are offline. Upgrade to v2.7.0 and later to have more accurate health checking.

#### Troubleshooting

##### Check that the MDCB service is running 

```console
sudo systemctl status tyk-sink
```

Should Return:

```console
tyk-sink.service - Multi Data Center Bridge for the Tyk API Gateway

  Loaded: loaded (/usr/lib/systemd/system/tyk-sink.service; enabled; vendor preset: disabled)

  Active: active (running) since Thu 2018-05-03 09:39:37 UTC; 3 days ago
  Main PID: 1798 (tyk-sink)

  CGroup: /system.slice/tyk-sink.service

      └─1798 /opt/tyk-sink/tyk-sink -c /opt/tyk-sink/tyk_sink.conf
```

##### Check that MDCB is listening on port 9091

```console
sudo netstat -tlnp
```

Should Return:

```
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
...
tcp6       0      0 :::9091                 :::*                    LISTEN      1798/tyk-sink
```

##### Check the logs for MDCB

```{.copyWrapper}
> sudo journalctl -u tyk-sink 
```

Add the `-f` flag to follow the log. The command should return output similar to this:

```console
-- Logs begin at Thu 2018-05-03 09:30:56 UTC, end at Mon 2018-05-07 08:58:23 UTC. --
May 06 11:50:37 master tyk-sink[1798]: time="2018-05-06T11:50:37Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
May 06 11:50:38 master tyk-sink[1798]: time="2018-05-06T11:50:38Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
...
May 06 11:50:42 master tyk-sink[1798]: time="2018-05-06T11:50:42Z" level=info msg="Ping!"
```

##### Check MDCB configurations

From MDCB v2.7.0, a secured HTTP endpoint `/config` can be enabled that allows you to query configuration of MDCB.

To enable the secured HTTP endpoint, make sure you have the following in your `/opt/tyk-sink/tyk_sink.conf` config file.

```json
{
  "security": {
    "enable_http_secure_endpoints": true,
    "secret": "<secured-endpoint-secret>"
  },
  "http_server_options": {
    "use_ssl": true,
    "certificate": {
      "cert_file": ...,
      "key_file": ...,
      "min_version": ...
    }
  }
}
```

Subsequently, you can issue a request to the `/config` endpoint to return a json representation of your MDCB config:

```bash
curl -H "x-tyk-authorization: <secured-endpoint-secret>" https://my-mdcb-host:8181/config
```

Alternatively, you can issue a request to the `/env` endpoint to return your MDCB config in the form of environment variables settings:

```bash
curl -H "x-tyk-authorization: <secured-endpoint-secret>" https://my-mdcb-host:8181/env
```

#### Gateway configuration

Before a worker gateway can connect to MDCB, it is important to enable the organization that owns all the APIs to be distributed to be allowed to utilize Tyk MDCB. To do this, the organization record needs to be modified with two flags using the [Tyk Dashboard Admin API](https://tyk.io/docs/dashboard-admin-api/).

To make things easier, we will first set a few [environment variables]({{< ref "tyk-environment-variables" >}}):

1. `export DASH_ADMIN_SECRET=<YOUR_ADMIN_SECRET>`

You can find <YOUR_ADMIN_SECRET> in `tyk_analytics.conf` file under `admin_secret` field or `TYK_DB_ADMINSECRET` environment variable.

2. `export DASH_URL=<YOUR_DASH_URL>`

This is the URL you use to access the Dashboard (including the port if not using the default port).

3. `export ORG_ID=<YOUR_ORG_ID>`

You can find your organization id in the Dashboard, under your user account details.

{{< img src="/img/2.10/user_api_id.png" alt="Org ID" >}}

4. Send a GET request to the Dashboard API to `/admin/organisations/$ORG_ID` to retrieve the organization object. In the example below, we are redirecting the output json to a file `myorg.json` for easy editing.

```curl
curl $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_ADMIN_SECRET" | python -mjson.tool > myorg.json
```
5. Open `myorg.json` in your favorite text editor and add the following fields as follows.
New fields are between the `...` .

```json {linenos=table,hl_lines=["5-12"],linenostart=1}
{
  "_id": "55780af69b23c30001000049",
  "owner_slug": "portal-test",
  ...
  "hybrid_enabled": true,
  "event_options": {
    "key_event": {
         "webhook": "https://example.com/webhook",
         "email": "user@example.com",
         "redis": true
    },
  },
  ...
  "apis": [
    {
      "api_human_name": "HttpBin (again)",
      "api_id": "2fdd8512a856434a61f080da67a88851"
    }
  ]
}
```

In the example above it can be seen that the `hybrid_enabled` and `event_options` configuration fields have been added:

- `hybrid_enabled:` Allows a worker gateway to login as an organization member into MDCB.
- `event_options:` The `event_options` object is optional. By default the update and removal of Redis keys (hashed and unhashed), API Definitions and policies are propagated to various instance zones. The `event_options` object contains a `key_event` object that allows configuration of the following additional features:

  - event notification mechanism for all Redis key (hashed and unhashed) events. Events can be notified via webhook by setting the `webhook` property to the value of the webhook URL. Similarly, events can be notified via email by setting the `email` property to the value of the target email address.
  - enable propagation of events for when an OAuth token is revoked from Dashboard by setting the `redis` property to `true`.
  
  The `event_options` in the example above enables the following functionality:

  - events are propagated when OAuth tokens are revoked from Dashboard since `redis` is `true`
  - events associated with Redis keys (hashed and unhashed) and revoking OAuth tokens via Dashboard are sent to webhook `https://example.com/webhook` and email address `user@example.com`

6. Update your organization with a PUT request to the same endpoint, but this time, passing in your modified `myorg.json` file.

```curl
curl -X PUT $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_ADMIN_SECRET" -d @myorg.json
```

This should return:

```json
{"Status":"OK","Message":"Org updated","Meta":null}
```
 

#### Setup MDCB Data Plane

You may configure an unlimited number of [Tyk Data Planes]({{< ref "tyk-multi-data-centre/mdcb-components#data-plane" >}}) containing Worker Gateways for ultimate High Availablity (HA). We recommend that you deploy your worker gateways as close to your upstream services as possible in order to reduce latency.

It is a requirement that all your Worker Gateways in a Data Plane data center share the same Redis DB in order to take advantage of Tyk's DRL and quota features.
Your Data Plane can be in the same physical data center as the Control Plane with just a logical network separation. If you have many Tyk Data Planes, they can be deployed in a private-cloud, public-cloud, or even on bare-metal.

##### Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}) helm chart is pre-configured to install Tyk Gateway and Tyk Pump that connects to MDCB or Tyk Cloud, our SaaS MDCB Control Plane. After setting up Tyk Control Plane with Helm Chart, obtain the required connection details from installation output and configure data plane chart as below. For Tyk Cloud users, following [Tyk Cloud instructions]({{<ref "tyk-cloud/environments-deployments/hybrid-gateways">}}) to deploy your hybrid gateways.

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the tyk-control-plane installation output.

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "/product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Control Plane and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

**1. Set connection details**

Set the below environment variables and replace values with connection details to your MDCB control plane. See [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart#obtain-remote-control-plane-connection-details-from-tyk-control-plane-chart">}}) documentation on how to get the connection details.

```bash
USER_API_KEY=9d20907430e440655f15b851e4112345
ORG_ID=64cadf60173be90001712345
MDCB_CONNECTIONSTRING=mdcb-svc-tyk-cp-tyk-mdcb.tyk-cp.svc:9091
GROUP_ID=your-group-id
MDCB_USESSL=false
```

**2. Then use Helm to install Redis and Tyk**

```bash
NAMESPACE=tyk-dp
APISecret=foo

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install

helm upgrade tyk-dp tyk-helm/tyk-data-plane -n $NAMESPACE --create-namespace \
  --install \
  --set global.remoteControlPlane.userApiKey=$USER_API_KEY \
  --set global.remoteControlPlane.orgId=$ORG_ID \
  --set global.remoteControlPlane.connectionString=$MDCB_CONNECTIONSTRING \
  --set global.remoteControlPlane.groupID=$GROUP_ID \
  --set global.remoteControlPlane.useSSL=$MDCB_USESSL \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

**3. Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).


##### Configuring an existing Tyk Gateway
If you have Redis and a working Tyk Gateway deployed, follow below steps to configure your gateways to work in RPC mode.

{{< note >}}
**Note**

If you have deployed Gateway with `tyk-data-plane` Chart, you don't need to go through following steps to configure Tyk Gateway. The necessary configurations has been set in `tyk-data-plane` chart templates.
{{< /note >}}

**Prerequisites**
- Redis
- A working headless/open source Tyk Gateway deployed

**Worker Gateway Configuration**

Modify the Tyk Gateway configuration (`tyk.conf`) as follows:
`"use_db_app_configs": false,`

Next, we need to ensure that the policy loader and analytics pump use the RPC driver:

```{.json}
"policies": {
  "policy_source": "rpc",
  "policy_record_name": "tyk_policies"
},
"analytics_config": {
  "type": "rpc",
  ... // remains the same
},
```

Lastly, we add the sections that enforce the Worker mechanism:

```{.json}
"slave_options": {
  "use_rpc": true,
  "rpc_key": "{ORGID}",
  "api_key": "{APIKEY}",
  "connection_string": "{MDCB_HOSTNAME:9091}",
  "enable_rpc_cache": true,
  "bind_to_slugs": false,
  "group_id": "{ny}",
  "use_ssl": false,
  "ssl_insecure_skip_verify": true
},
"auth_override": {
  "force_auth_provider": true,
  "auth_provider": {
    "name": "",
    "storage_engine": "rpc",
    "meta": {}
  }
}
```
{{< note success >}}
**Note**  

if you set `analytics_config.type` to `rpc` - make sure you don't have your Tyk Pump configured to send analytics via the `hybrid` Pump type.
{{< /note >}}


As an optional configuration you can use `key_space_sync_interval` to set the period's length in which the gateway will check for changes in the key space, if this value is not set then by default it will be 10 seconds.


The most important elements here are:

| Field         | Description    |
|---------------|----------------|
|`api_key`      |This the API key of a user used to authenticate and authorize the Gateway's access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce risk if compromised. The suggested security settings are `read` for `Real-time notifications` and the remaining options set to `deny`.|
|`group_id`    |This is the "zone" that this instance inhabits, e.g. the cluster/data center the gateway lives in. The group ID must be the same across all the gateways of a data center/cluster which are also sharing the same Redis instance. This id should also be unique per cluster (otherwise another gateway's cluster can pick up your keyspace events and your cluster will get zero updates).
|`connection_string`     |The MDCB instance or load balancer.|
|`bind_to_slugs` | For all Tyk installations except for Tyk Classic Cloud this should be set to false.|

Once this is complete, you can restart the Tyk Gateway in the Data Plane, and it will connect to the MDCB instance, load its API definitions, and is ready to proxy traffic.


## Monitor and Observe Your Setup

A common question that gets asked is how to monitor the Tyk components.

### Tyk Gateway

The Gateway & Redis are the only components that will have a high on-demand performance requirement, which needs to scale with your API traffic.

#### Tyk Gateway CPU Utilization

Tyk Gateway is CPU bound. It will have better performance the more cores you throw at Tyk. Tyk will automatically spread itself across all available cores to handle the traffic. Be sure to limit the cores in a Kubernetes deployment otherwise, the Gateway will attempt to consume all cores in a node.

Performance benchmarks on how Tyk performs across different CPU architectures, environments and sizes [here](https://tyk.io/performance-benchmarks/).

A healthy and performant Tyk Gateway should have a CPU utilization of under 60%. If the average CPU utilization is above 60%, then we recommend you scale your Tyk Gateway services. A higher figure than 60% introduces risk because if one Gateway fails, the traffic spillover to healthy nodes might be overwhelming and result in a cascading failure.

#### Liveness Health Check

Health checks are extremely important in determining the status of our Tyk Components. Depending on your setup and configuration, the statuses of the following components will be returned: **Gateway**, **Dashboard**, **Redis** and **RPC**. 

The health check endpoint is an expensive operation and can throttle throughput so it's important to find an optimal plan if you want to take advantage of this endpoint. The endpoint refreshes every 10 seconds and does not return statuses on the primary database (MongoDB or PostgreSQL) and the Tyk Pump component.


```yaml
curl -X GET "http://localhost:8080/hello"

{
   "status": "pass",
   "version": "4.2.3",
   "description": "Tyk GW",
   "details": {
       "dashboard": {
           "status": "pass",
           "componentType": "system",
           "time": "2022-11-21T20:03:44Z"
       },
       "redis": {
           "status": "pass",
           "componentType": "datastore",
           "time": "2022-11-21T20:03:44Z"
       },
       "rpc": {
           "status": "pass",
           "componentType": "system",
           "time": "2022-11-21T20:03:44Z"
       }
   }
}
```

For information about our health check endpoint, please visit our [Liveness Health Check]({{< ref "planning-for-production/ensure-high-availability/health-check" >}}) documentation.

### Tyk Dashboard & Tyk MDCB

These other Tyk components won’t see load proportional to your API requests.  However, the Dashboard (and MDCB on Global deployments) synchronise the Gateways and need to be given enough resources to manage this process.

The Tyk Dashboard liveness health check endpoint can be configured [here]({{< ref "tyk-dashboard/configuration#health_check_endpoint_name" >}}). 

The Tyk MDCB liveness health check endpoint can be configured [here]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#health-check" >}}). 

Currently, Tyk Dashboard and MDCB liveness endpoints only report whether the service is operational. It is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Datastore) or if they are offline.

### Tyk Pump

The Tyk Pump component offers a built-in Liveness Health Check endpoint [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#health-check" >}}). 

Currently, the receipt of an HTTP 200 OK response merely indicates that the Pump service is operational. However, it is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Datastore) or if they are offline.

#### Database Sizing

Based on the Tyk recommended approach for setting up your databases, our team has built tools that will help engineers better understand and plan their infrastructure around their use case:

* [Redis Sizing](https://tyk.io/docs/planning-for-production/redis-sizing/)
* [PostgreSQL Sizing](https://tyk.io/docs/planning-for-production/database-settings/postgresql/#postgresql-sizing)
* [MongoDB Sizing](https://tyk.io/docs/planning-for-production/database-settings/mongodb-sizing/)


#### Database Monitoring

Monitoring guides from our partner:

**Redis**
1. [How to monitor Redis performance metrics](https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics/)
2. [How to collect Redis Metrics](https://www.datadoghq.com/blog/how-to-collect-redis-metrics/)
3. [Monitor Redis using Datadog](https://www.datadoghq.com/blog/monitor-redis-using-datadog/)


**Postgres**
1. [Key metrics for PostgreSQL monitoring](https://www.datadoghq.com/blog/postgresql-monitoring/)
2. [Collecting metrics with PostgreSQL monitoring tools](https://www.datadoghq.com/blog/postgresql-monitoring-tools/)
3. [How to collect and monitor PostgreSQL data with Datadog](https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog/)


**Mongo**

1. [Monitoring MongoDB performance metrics (WiredTiger)](https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger/)
2. [Collecting MongoDB metrics and statistics](https://www.datadoghq.com/blog/collecting-mongodb-metrics-and-statistics/)
3. [How to monitor MongoDB performance with Datadog](https://www.datadoghq.com/blog/monitor-mongodb-performance-with-datadog/)
