---
title: "Tyk Multi Data Center Bridge (MDCB): Centralized API Governance Across Distributed Environments"
date: 2025-01-10
tags: ["MDCB", "Multi Data Center Bridge", "Control Plane", "Data Plane", "Synchroniser"]
description: "How to configure Multi Data Center Bridge"
keywords: ["MDCB", "Multi Data Center Bridge", "Control Plane", "Data Plane", "Synchroniser"]
aliases:
  - /tyk-multi-data-centre
  - /tyk-multi-data-centre/mdcb-components
  - /tyk-multi-data-centre/mdcb-example-minimising-latency
  - /tyk-multi-data-centre/setup-controller-data-centre
  - /tyk-multi-data-centre/setup-worker-data-centres
  - /product-stack/tyk-enterprise-mdcb/advanced-configurations/synchroniser

  - /tyk-multi-data-centre/setup-slave-data-centres
  - /tyk-multi-data-centre/setup-master-data-centre
  - /tyk-configuration-reference/mdcb-configuration-options
  - /getting-started/tyk-components/mdcb
  - /getting-started/tyk-components/mdcb
  - /product-stack/tyk-enterprise-mdcb/advanced-configurations/synchroniser
  - /tyk-configuration-reference/mdcb-configuration-options
  - /tyk-multi-data-centre
  - /tyk-multi-data-centre/mdcb-components
  - /tyk-multi-data-centre/mdcb-example-minimising-latency
  - /tyk-multi-data-centre/setup-controller-data-centre
  - /tyk-multi-data-centre/setup-master-data-centre
  - /tyk-multi-data-centre/setup-slave-data-centres
  - /tyk-multi-data-centre/setup-worker-data-centres
---

## Overview

Tyk’s Multi Data Center Bridge (MDCB) is a separately licensed extension to the Tyk control plane that performs management and synchronisation of logically or geographically distributed clusters of Tyk API Gateways. We use it ourselves to support our Tyk Cloud offering.

### Challenges in Distributed Environment

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

### How does Tyk Multi Data Center Bridge help?

The Tyk MDCB makes it possible to manage federated global deployments easily, from a central Dashboard: you can confidently deploy a multi-data center, geographically isolated set of Tyk Gateway clusters for maximum redundancy, failover, latency optimization, and uptime.

Combining Tyk Dashboard with MDCB, you are provided with a “single pane of glass” or control plane that allows you to centrally manage multiple Tyk Gateway clusters. This has many advantages over having separate gateways and corresponding dashboard/portals, which would require manual synchronisation to roll out any changes (e.g. new APIs) across all the individual gateways. 

By deploying MDCB, API Management with Tyk becomes a service that can be easily offered to multiple teams from a centralised location.

{{< img src="/img/mdcb/mdcb-intro3.png" width="800" height="975" alt="Distributed API Gateways with MDCB" >}}

### How does MDCB work?

MDCB acts as a broker between the Tyk Gateway instances that you deploy in data centers around the world. A single Control Plane (Management) Gateway is used as reference: you configure APIs, keys and quotas in one central location; MDCB looks after the propagation of these to the Data Plane (or Worker) Gateways, ensuring the synchronisation of changes.

MDCB is extremely flexible, supporting clusters of Tyk Gateways within or across data centers - so for example two clusters within the same data center could run different configurations of APIs, users etc.

MDCB keeps your Tyk API Gateways highly available because all the Worker Gateways, where your users access your APIs, can be configured and run independently. If the MDCB link back to the Management Gateway goes down, the Workers will continue to service API requests; when the link is back up, MDCB will automatically refresh the Workers with any changes they missed.

{{< img src="/img/mdcb/mdcb-intro4.png" width="800" height="975" alt="Multi Data Center Bridge is down" >}}

What happens if the worst happens and Worker Gateways fail while the link to the Control Plane is down? We’ve thought of that: Tyk will automatically configure the new Workers that spin up using the last known set of API resources in the worker’s cluster, minimizing the impact on availability of your services.

### When might you deploy MDCB?

#### Managing geographically distributed gateways to minimize latency and protect data sovereignty

Consider Acme Global Bank: they have customers in the USA and the EU. Due to compliance, security and performance requirements they need to deploy their Tyk API Gateways locally in each of those regions. They need to manage the deployment and synchronisation of APIs and associated resources (e.g. keys, policies and certificates) between the data centers to ensure global service for their customers.

{{< img src="/img/mdcb/mdcb-acme-global-bank1.png" width="600" height="750" alt="Acme Global Bank without MDCB" >}}

Tyk MDCB enables Acme Global Bank to power this architecture by creating a primary data center with all the Tyk Control Plane components and secondary (worker) data centers that act as local caches to run validation and rate limiting operations to optimize latency and performance.

{{< img src="/img/mdcb/mdcb-acme-global-bank2.png" width="600" height="750" alt="Acme Global Bank with MDCB" >}}

#### Managing a complex deployment of services with internal and externally facing APIs

Consider Acme Telecoms: they have a large nationally distributed workforce and complex self-hosted IT systems; are using Tyk API Gateways to deploy internal and external APIs; and have different teams managing and consuming different sets of APIs across multiple sites. They need to ensure data segregation, availability, and access for internal and external users and partners.

{{< img src="/img/mdcb/mdcb-acme-telecoms1.png" width="600" height="750" alt="Acme Telecoms without MDCB" >}}

Combining Tyk’s built-in multi-tenancy capability with MDCB enables Acme Telecoms to set up dedicated logical gateways for different user groups and different physical gateways to guarantee data segregation, with a single management layer for operational simplicity.

{{< img src="/img/mdcb/mdcb-acme-telecoms2.png" width="600" height="750" alt="Acme Telecoms with MDCB" >}}

### Why Choose MDCB for Your API Infrastructure?

Beyond the two usage scenarios described here, there are many others where MDCB will provide you with the power and flexibility you need to manage your own particular situation.

Here are some examples of the benefits that deploying Tyk MDCB can bring:

#### Flexible architecture

- You can control geographic distribution of traffic, restricting traffic to data centers/regions of your choice.
- You can put your Tyk API Gateways close to users, but still have a single management layer.
- You have a single, simple, point of access for configuration of your complex API infrastructure and yet deploy multiple Developer Portals, if required, to provide access to different user groups (e.g. Internal and External).
- You can physically [segment teams and environments]({{< ref "api-management/multiple-environments#gateway-sharding" >}}) within a single physical data center, giving each team full control of its own API gateway and server resources without the noisy neighbors you might experience in a standard self-managed deployment.
- You can deploy gateways with whichever mix of cloud vendors you wish.
- You can mix and match cloud and on premises data centers.

#### Improved resiliency, security and uptime

- Each Data Plane (Worker) Gateway operates autonomously using a locally stored copy of the API resources it needs.
- The Control Plane (Management) Gateway maintains synchronisation of these configurations across your Tyk deployment via the MDCB backbone link.
- If the Management Gateway or MDCB backbone fails, the Workers will continue to handle API requests, rejecting only new authorization tokens created on other Gateways. When connectivity is restored, the Worker Gateways will hot-reload to fetch any updated configurations (e.g. new authorization tokens) from the Control Plane.
- If a Worker Gateway fails, this does not impact the operation of the others: when it comes back online, if it is unable to contact the Control Plane, it will retrieve the “last good” configuration held locally.
- The MDCB backbone runs on a resilient compressed RPC channel that is designed to handle ongoing and unreliable connectivity; all traffic on the backbone is encrypted and so safer to use over the open internet or inter-data center links.
- Improved data security through separation of traffic into completely separate clusters within your network.

#### Reduced latency

- Deploying Data Plane (Worker) Gateways close to your geographically distributed API consumers helps reduce their perceived request latency.
- Deploying Worker Gateways close to your backend services will minimize round trip time servicing API requests.
- The Worker Gateways cache keys and other configuration locally, so all operations can be geographically localised.
- All traffic to and from one Gateway cluster will have rate limiting, authentication and authorization performed within the data center rather than “calling home” to a central control point; this reduces the  API request round trip time.

#### Improved Infrastructure Management

- Due to the shared control plane, all Worker Gateways report into a single Tyk Dashboard. This provides a simple, consistent place to manage your APIM deployment.
- This allows a shared infra team to offer API management and API Gateways as a service, globally, across multiple clouds and Self-Managed regions, from a single pane of glass.

#### Next Steps

- [The components of an MDCB deployment]({{< ref "api-management/mdcb#mdcb-components" >}})
- [Run an MDCB Proof of Concept]({{< ref "api-management/mdcb#minimizing-latency-with-mdcb" >}})
- [MDCB reference guide]({{< ref "tyk-multi-data-centre/mdcb-configuration-options" >}})

## MDCB Components

### Overview

Here we will give an overview of the main elements of a Tyk Multi Data Center (distributed) solution, clarifying the terminology used by Tyk.
{{< img src="/img/mdcb/mdcb-components.png" width="800" height="975" alt="A Tyk Multi Data Center Bridge deployment" >}}

#### Tyk Gateway 
- The workhorse of any deployment, Tyk’s lightweight Open Source API gateway that exposes your APIs for consumption by your users. It is a reverse proxy that secures your APIs, manages session and policies, monitors, caches and manipulates requests/responses when needed before/after it proxies them to and from the upstream.

#### Tyk Dashboard
- Tyk’s management platform used to control the creation of API configurations, policies and keys in a persistent manner. It provides analytic information on the traffic the Gateways have processed which includes aggregated API usage and detailed information per transaction.

#### Tyk Multi Data Center Bridge (MDCB)
- The backbone of the distributed Tyk deployment, connecting the distributed Data Plane deployments back to the Control Plane.

#### Tyk Pump
- Tyk’s open source analytics purger that can be used to export transaction logs from the Tyk deployment to the visualisation tool or other data store of your choice

#### Tyk Developer Portal
- The access point for your API Consumers where you publish your API catalog(s) and they obtain API keys.

#### Redis
- An in-memory data store used as a database, cache and message broker. We use it as pub/sub broker for inter-Gateway communication, and as a cache for API configurations, keys, certificates, and temporary store for analytics records.

#### MongoDB/SQL
- A persistent data store for API configurations, policies, analytics and aggregated analytics, Dashboard organizations, configurations, dashboard users, portal developers and configuration.


### Control Plane
{{< img src="/img/mdcb/mdcb-control-plane.png" width="800" height="975" alt="The Tyk Control Plane" >}}

The Control Plane must consist of the following elements:
- **Tyk Dashboard** (used to configure and control the whole Tyk installation)
- **Tyk Gateway** (used for creation of keys and certificates, this does not service API requests; it is important to ensure there is no public access to it and it must not be sharded (tagged) as it "belongs" to the whole Tyk installation)
- **Tyk MDCB**
- **Redis** (high availability Redis data store that should be backed up in case of failure; this [document](https://redis.io/docs/management/persistence/) gives recommendation on Redis persistency)
- **MongoDB or SQL** (a persistent data store that should be deployed and set up for redundancy and high availability)

To improve resilience and availability, multiple instances of each Tyk component should be deployed and load balanced within the Control Plane.

#### Optional Components
- One or more **Tyk Pumps** can be deployed within the Control Plane to export analytics data (request/response logs) to your [data sink of choice]({{< ref "api-management/tyk-pump#external-data-stores" >}}) for further analytics and visualisation.
- A **Tyk Developer Portal** can be added to enhance the end-user experience when accessing your APIs.
 
### Data Plane
{{< img src="/img/mdcb/mdcb-data-plane.png" width="800" height="975"  alt="The Tyk Data Plane" >}}

The Data Plane deployment must consist of the following elements:
- **Tyk Gateway** (one or more Gateways specifically configured as Workers)
- **Redis** (a single Redis data store shared by all Gateways in the cluster)

To provide resilience and availability, multiple Gateways should be deployed and load balanced within the cluster.
If you want this Data Plane deployment to be resilient, available, and independent from the Control Plane during a disconnection event, it is advised to make the Redis data store persistent.
  
#### Optional Components
- A **Tyk Pump** specifically configured as a [Hybrid Pump]({{< ref "product-stack/tyk-charts/tyk-data-plane-chart#hybrid-pump" >}}) can be deployed with the Data Plane gateways to export analytics data (request/response logs) to your [data sink of choice]({{< ref "api-management/tyk-pump#external-data-stores" >}}) for further analytics and visualisation.

## Setup MDCB Control Plane

The [Tyk control plane]({{< ref "api-management/mdcb#control-plane" >}}) contains all the
standard components of a standard Tyk Self-Managed installation with the addition of the Multi Data Center Bridge (MDCB).

### Installing MDCB Component On Linux
The MDCB component must be able to connect to Redis and MongoDB/PostgreSQL directly from within the Control Plane deployment. It does not require access to the Tyk Gateway(s) or Dashboard application.

The MDCB component will however, by default, expose an RPC service on port 9091, to which the [Tyk Data Plane]({{< ref "api-management/mdcb#data-plane" >}}) data centers, i.e. the worker gateway(s) that serves API traffic, will need connectivity.

#### Prerequisites
We will assume that your account manager has provided you with a valid MDCB and Dashboard License and the command to enable you to download the MDCB package.
We will assume that the following components are up and running in your Controller DC:

* MongoDB or SQL (check [supported versions]({{< ref "tyk-self-managed#database-management" >}}))
* Redis (check [supported versions]({{< ref "tyk-self-managed#redis-1" >}}))
* Tyk Dashboard
* Tyk Gateway / Gateways Cluster
* Working Tyk-Pro [Self-Managed installation]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}})

{{< note success >}}
**Note**  

When using SQL rather than MongoDB in a production environment, we only support PostgreSQL.
{{< /note >}}

#### Installing using RPM and Debian packages
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

### Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Control Plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}) helm chart is pre-configured to install Tyk control plane for multi data center API management from a single Dashboard with the MDCB component.

Below is a concise instruction on how to set up an MDCB Control Plane with Redis and PostgreSQL.

To access the comprehensive installation instructions and configuration options, please see [Tyk Control Plane Helm Chart]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}).

#### Prerequisites
- [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
- [Helm 3+](https://helm.sh/docs/intro/install/)
- MDCB and Dashboard license

#### Quick Start

1. **Setup required credentials**

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

2. **Install Redis (if you don't already have Redis installed)**

    If you do not already have Redis installed, you may use these charts provided by Bitnami.

    ```bash
    helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --install --version 19.0.2
    ```
    Follow the notes from the installation output to get connection details and password. The DNS name of your Redis as set by Bitnami is `tyk-redis-master.tyk-cp.svc:6379` (Tyk needs the name including the port) 

    The Bitnami chart also creates a secret `tyk-redis` which stores the connection password in `redis-password`. We will make use of this secret in installation later.

    {{< note >}}
**Note**

Ensure that you are installing Redis versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "tyk-self-managed#redis-1" >}}) that are compatible with Tyk.
    {{< /note >}}

3. **Install PostgreSQL (if you don't already have PostgreSQL installed)**

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

Ensure that you are installing PostgreSQL versions that are supported by Tyk. Please consult the list of [supported versions]({{< ref "api-management/dashboard-configuration#supported-database" >}}) that are compatible with Tyk.
    {{< /note >}}

4. **Install Tyk Control Plane**

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

5. **Done!**

    Now Tyk Dashboard and Tyk MDCB should be accessible through service `dashboard-svc-tyk-cp-tyk-dashboard` at port `3000` and `mdcb-svc-tyk-cp-tyk-mdcb` at port `9091` respectively. You can login to Dashboard using the admin email and password to start managing APIs.

    You can use the MDCB connection details included in the installation output, to install the [MDCB Data Plane]({{<ref "api-management/mdcb#setup-mdcb-data-plane">}}).

### Configuration
If you install MDCB component with package, modify your `/opt/tyk-sink/tyk_sink.conf` file as follows:

#### Configuration Example
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

From MDCB 2.0+, you can choose between Mongo or SQL databases to setup your `analytics` storage. In order to setup your PostgreSQL storage, you can use the same configuration from your [Tyk Dashboard main storage]({{< ref "tyk-self-managed#postgresql" >}}).

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

### Health check

It is possible to perform a health check on the MDCB service. This allows you to determine if the service is running, so is useful when using MDCB with load balancers.

Health checks are available via the HTTP port. This is defined by `http_port` configuration setting and defaults to `8181`. Do **not** use the standard MDCB listen port (`listen_port`) for MDCB health checks.

From MDCB v2.7.0, there are 2 health check services available:
1. `/liveness` endpoint returns a `HTTP 200 OK` response when the service is operational.
2. `/readiness` endpoint returns a `HTTP 200 OK` response when MDCB is ready to accept requests. It ensures that dependent components such as Redis and data store are connected, and the gRPC server is ready for connection.

See [MDCB API]({{<ref "tyk-mdcb-api">}}) for details of the endpoints.

In MDCB v2.6.0 or earlier, MDCB only offers one health check endpoint at `/health` via the port defined by the `healthcheck_port` configuration setting. The default port is `8181`. The `/health` endpoint is also available on v2.7.0 or later for backward compatibility.

To use the health check service, call the `/health` endpoint i.e. `http://my-mdcb-host:8181/health`. This will return a `HTTP 200 OK` response if the service is running.

Please note that an HTTP 200 OK response from the `/health` endpoint merely indicates that the MDCB service is operational. However, it is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Data store) or if they are offline. Upgrade to v2.7.0 and later to have more accurate health checking.

### Troubleshooting

#### Check that the MDCB service is running 

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

#### Check that MDCB is listening on port 9091

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

#### Check the logs for MDCB

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

#### Check MDCB configurations

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

### Enabling MDCB on Organization Object on Tyk Dashboard

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

## Setup MDCB Data Plane

You may configure an unlimited number of [Tyk Data Planes]({{< ref "api-management/mdcb#data-plane" >}}) containing Worker Gateways for ultimate High Availablity (HA). We recommend that you deploy your worker gateways as close to your upstream services as possible in order to reduce latency.

It is a requirement that all your Worker Gateways in a Data Plane data center share the same Redis DB in order to take advantage of Tyk's DRL and quota features.
Your Data Plane can be in the same physical data center as the Control Plane with just a logical network separation. If you have many Tyk Data Planes, they can be deployed in a private-cloud, public-cloud, or even on bare-metal.

### Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}) helm chart is pre-configured to install Tyk Gateway and Tyk Pump that connects to MDCB or Tyk Cloud, our SaaS MDCB Control Plane. After setting up Tyk Control Plane with Helm Chart, obtain the required connection details from installation output and configure data plane chart as below. For Tyk Cloud users, following [Tyk Cloud instructions]({{<ref "tyk-cloud#deploy-hybrid-gateways">}}) to deploy your hybrid gateways.

#### Prerequisites

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the tyk-control-plane installation output.

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Control Plane and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

1. **Set connection details**

    Set the below environment variables and replace values with connection details to your MDCB control plane. See [Tyk Data Plane]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart#obtain-remote-control-plane-connection-details-from-tyk-control-plane-chart">}}) documentation on how to get the connection details.

    ```bash
    USER_API_KEY=9d20907430e440655f15b851e4112345
    ORG_ID=64cadf60173be90001712345
    MDCB_CONNECTIONSTRING=mdcb-svc-tyk-cp-tyk-mdcb.tyk-cp.svc:9091
    GROUP_ID=your-group-id
    MDCB_USESSL=false
    ```

2. **Then use Helm to install Redis and Tyk**

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

3. **Done!**

    Now Tyk Gateway should be accessible through service `gateway-svc-tyk-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to MDCB, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

    For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).

### Configuring an existing Tyk Gateway
If you have Redis and a working Tyk Gateway deployed, follow below steps to configure your gateways to work in RPC mode.

{{< note >}}
**Note**

If you have deployed Gateway with `tyk-data-plane` Chart, you don't need to go through following steps to configure Tyk Gateway. The necessary configurations has been set in `tyk-data-plane` chart templates.
{{< /note >}}

#### Prerequisites
- Redis
- A working headless/open source Tyk Gateway deployed

#### Worker Gateway Configuration

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

## Minimizing latency with MDCB

### Overview

As described [previously]({{< ref "api-management/mdcb#managing-geographically-distributed-gateways-to-minimize-latency-and-protect-data-sovereignty" >}}), Acme Global Bank has operations and customers in both the EU and USA.

To decrease the latency in response from their systems and to ensure that data remains in the same legal jurisdiction as the customers (data residency), they have deployed backend (or, from the perspective of the API gateway, “upstream”) services in two data centers: one in the US, the other in the EU.

Without a dedicated solution for this multi-region use case, Acme Global Bank would deploy a Tyk Gateway cluster in each data center and then have the operational inconvenience of maintaining two separate instances of Tyk Dashboard to configure, secure and publish the APIs.

By using Tyk's Multi-Data Center Bridge (MDCB), however, they are able to centralise the management of their API Gateways and gain resilience against failure of different elements of the deployment - data or control plane - improving the availability of their public APIs.

In this example we will show you how to create the Acme Global Bank deployment using our example Helm charts.

{{< img src="/img/mdcb/mdcb_poc1_overview.png" width="600" height="750" alt="MDCB Proof of Concept - Acme Global Bank" >}}

**Step-by-step instructions to deploy the Acme Global Bank scenario with Kubernetes in a public cloud (here we’ve used Google Cloud Platform):**

### Pre-requisites and configuration

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

### Deploy Tyk Stack to create the Control and Data Planes

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

### Testing the deployment to prove the concept
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

### Closing everything down
We’ve provided a simple script to tear down the demo as follows:
1. `./down.sh -n tyk-worker-us`
2. `./down.sh -n tyk-worker-eu`
3. `./down.sh`

**Don’t forget to tear down your clusters in GCP if you no longer need them!**

## Synchroniser feature with MDCB

### Overview

In order to process API requests the worker Gateways need resources such as API keys, certificates, and OAuth clients. To ensure high availability these resources need to be synchronised in worker Gateways.

Prior to Tyk Gateway v4.1, the API keys, certificates and OAuth clients required by worker Gateways were synchronised from the controller Gateway on-demand. With Gateway v4.1 and MDCB v2.0.3 we introduced a new configurable option that user may choose to have proactive synchronisation of these resources to the worker Gateways when they start up.

This change improves resilience in case the MDCB link or controller Gateway is unavailable, because the worker Gateways can continue to operate independently using the resources stored locally. There is also a performance improvement, with the worker Gateways not having to retrieve resources from the controller Gateway when an API is first called.

Changes to keys, certificates and OAuth clients are still synchronised to the worker Gateways from the controller when there are changes and following any failure in the MDCB link.

### How does worker Gateways get resources from MDCB control plane?

**Without Synchroniser**

If [Synchroniser]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configenabled" >}}) is disabled, the resources were pulled by the worker Gateways on-demand and not in advance. It means that first it checks if the resource lives in the local Redis and if it doesn’t exist then it tries to pull it from the control plane to store it locally.

Every time that a key is updated or removed the control plane emits a signal to all the cluster gateways to update the key accordingly.

Considerations:
This introduces a single point of failure. When the MDCB or controller Gateway in the control plane fails then the worker Gateways are also affected.

{{< img src="/img/mdcb/synchroniser-before.gif" alt="Without Synchroniser" width="1000" >}}

**With Synchroniser**

If [Synchroniser]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configenabled" >}}) is enabled, API keys, certificates and OAuth clients are synchronised and stored in the local redis server in advance. When one of those resources is created, modified or deleted, a signal will be emitted which allows the worker Gateways to respond accordingly. The transmitted information includes type of resource, action (create, update, delete), if hashed (in the case of keys), and resource ID so the changes are applied in the worker Gateways accordingly.

Considerations: 
- Size of local Redis storage: If there are a lot of keys / resources to be synchronised this will increase the size of local Redis storage. The data stored in Redis, including keys, OAuth clients, and certificates, is passed to the Redis instance of each data plane. This is a characteristic of the synchronisation mechanism and occurs regardless of whether these elements are being actively used on a given data plane. Keep in mind that even if certain resources are not being utilized in a specific data plane, they are still stored and maintained in sync by the Multi Data Center Bridge (MDCB). Therefore, if your system has a large volume of keys, OAuth clients, and certificates, this could increase the storage requirements and network traffic between your data planes. It's essential to consider these factors when designing and scaling your system.
- Data residency: The synchronization of resources does not support the application of this feature to specific groups. Instead, all keys, oauth-clients, etc. will be propagated to all Redis instances in the worker Gateways, without any differentiation based on groups. This should be considered for those customers who have a single control plane but multiple clusters of worker Gateways connected. In this scenario, all Redis instances in the Worker Gateways will receive all the keys. This aspect should be taken into account if you have specific data residency requirements.

{{< img src="/img/mdcb/synchroniser-after.gif" alt="With Synchroniser" width="1000" >}}

### Configuring the Synchroniser for Tyk Self Managed

{{< note success >}}**Note**

The synchroniser feature is disabled by default. To enable it, please configure both the worker Gateways and MDCB control plane accordingly.
{{< /note >}}

1. **Worker Gateway configuration**

    First, configure the worker Gateway to enable synchroniser:

    `"slave_options":{ "synchroniser_enabled":true }`

    Please see [Gateway configuration options]({{< ref "tyk-oss-gateway/configuration#slave_optionssynchroniser_enabled" >}}) for reference.

    To configure how often the worker Gateways read signals from MDCB control plane:

    `"slave_options":{ "key_space_sync_interval": 10 }`

    It configures the interval (in seconds) that the worker Gateway will take to check if there are any changes. If this value is not set then it will default to 10 seconds.

    Please see [Gateway configuration options]({{< ref "tyk-oss-gateway/configuration#slave_optionskey_space_sync_interval" >}}) for reference.

    If you are running a cluster of Gateways, you must have a _GroupID_ configured for synchronisation to work properly and propagate keys.

    `"slave_options":{ "group_id": "FOOBAR" }`


    Please see [Gateway configuration options]({{< ref "tyk-oss-gateway/configuration#slave_optionsgroup_id" >}}) for reference

2. **Control Plane configuration**

    Secondly, configure the control plane. The most simple configuration to enable this feature in the MDCB config file is:

    - MDCB:

    `"sync_worker_config":{ "enabled":true }`

    Please see [MDCB configuration options]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#sync_worker_config" >}}) for reference.

    If API keys were used and hash key is disabled, please also set these additional configurations for the following components:

    - MDCB:

    `"sync_worker_config":{ "enabled":true, "hash_keys": false }, "hash_keys": false` 

    - Dashboard:

    `"hash_keys": false` 

    - Controller Gateway:

    `"hash_keys": false` 

    If certificates were used, please also set these additional configurations:

    - MDCB

    Set `"security.private_certificate_encoding_secret"` with the certificate encoding secret. This is required because MDCB would decode the certificate first before propagating it to worker gateways. The worker Gateways could encode the certificate with their own secret.

    Please see [MDCB configuration options](https://tyk.io/docs/tyk-multi-data-centre/mdcb-configuration-options/#securityprivate_certificate_encoding_secret) for reference

### Configuring the Synchroniser for Tyk Cloud

Please [submit a support ticket](https://support.tyk.io/hc/en-gb) to us if you want to enable Synchroniser for your Tyk Cloud deployment.

### Troubleshooting

1. **How do I know when synchronisation happened?**

    You could check the MDCB log message to know about when synchronisation started and finished:

    ```
    Starting oauth clients sync worker for orgID...
    Starting keys sync worker for orgID...
    Starting keys sync worker for orgID...
    
    Sync APIKeys worker for orgID:...
    Sync Certs worker for orgID:...
    Sync oauth worker for orgID:...
    ```

2. **Can I trigger a re-synchronisation?**

    Synchronisation will be triggered once the Time To Live (TTL) of a worker Gateway has expired. The default expiry duration is 3 minutes. The Time To Live (TTL) value can be set via [sync_worker_config.group_key_ttl]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configgroup_key_ttl" >}})
