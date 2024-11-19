---
date: 2023-01-10
title: Setup MDCB Control Plane
menu:
    main:
        parent: "Tyk Multi Data Center Bridge"
weight: 4
tags: ["MDCB", "Control Plane","setup"]
description: "How to setup the MDCB Control Plane."
aliases:
   - /tyk-multi-data-centre/setup-master-data-centre/
---

## Introduction
The [Tyk control plane]({{< ref "tyk-multi-data-centre/mdcb-components.md#control-plane" >}}) contains all the
standard components of a standard Tyk Self-Managed installation with the addition of the Multi Data Center Bridge (MDCB).

## Installing MDCB Component On Linux
The MDCB component must be able to connect to Redis and MongoDB/PostgreSQL directly from within the Control Plane deployment. It does not require access to the Tyk Gateway(s) or Dashboard application.

The MDCB component will however, by default, expose an RPC service on port 9091, to which the [Tyk Data Plane]({{< ref "tyk-multi-data-centre/mdcb-components.md#data-plane" >}}) data centers, i.e. the worker gateway(s) that serves API traffic, will need connectivity.

### Prerequisites
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

### Installing using RPM and Debian packages
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

## Installing in a Kubernetes Cluster with our Helm Chart

The [Tyk Control Plane]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}) helm chart is pre-configured to install Tyk control plane for multi data center API management from a single Dashboard with the MDCB component.

Below is a concise instruction on how to set up an MDCB Control Plane with Redis and PostgreSQL.

To access the comprehensive installation instructions and configuration options, please see [Tyk Control Plane Helm Chart]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}).

### Prerequisites
- [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
- [Helm 3+](https://helm.sh/docs/intro/install/)
- MDCB and Dashboard license

### Quick Start

#### Step 1 - Setup required credentials

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

#### Step 2 - Install Redis (if you don't already have Redis installed)

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

#### Step 3 - Install PostgreSQL (if you don't already have PostgreSQL installed)

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

#### Step 4 - Install Tyk Control Plane
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

#### Step 5 - Done!

Now Tyk Dashboard and Tyk MDCB should be accessible through service `dashboard-svc-tyk-cp-tyk-dashboard` at port `3000` and `mdcb-svc-tyk-cp-tyk-mdcb` at port `9091` respectively. You can login to Dashboard using the admin email and password to start managing APIs.

You can use the MDCB connection details included in the installation output, to install the [MDCB Data Plane]({{<ref "tyk-multi-data-centre/setup-worker-data-centres">}}).

## Configuration
If you install MDCB component with package, modify your `/opt/tyk-sink/tyk_sink.conf` file as follows:

### Configuration Example
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

## Health check

It is possible to perform a health check on the MDCB service. This allows you to determine if the service is running, so is useful when using MDCB with load balancers.

Health checks are available via the HTTP port. This is defined by `http_port` configuration setting and defaults to `8181`. Do **not** use the standard MDCB listen port (`listen_port`) for MDCB health checks.

From MDCB v2.7.0, there are 2 health check services available:
1. `/liveness` endpoint returns a `HTTP 200 OK` response when the service is operational.
2. `/readiness` endpoint returns a `HTTP 200 OK` response when MDCB is ready to accept requests. It ensures that dependent components such as Redis and data store are connected, and the gRPC server is ready for connection.

See [MDCB API]({{<ref "tyk-mdcb-api">}}) for details of the endpoints.

In MDCB v2.6.0 or earlier, MDCB only offers one health check endpoint at `/health` via the port defined by the `healthcheck_port` configuration setting. The default port is `8181`. The `/health` endpoint is also available on v2.7.0 or later for backward compatibility.

To use the health check service, call the `/health` endpoint i.e. `http://my-mdcb-host:8181/health`. This will return a `HTTP 200 OK` response if the service is running.

Please note that an HTTP 200 OK response from the `/health` endpoint merely indicates that the MDCB service is operational. However, it is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Data store) or if they are offline. Upgrade to v2.7.0 and later to have more accurate health checking.

## Troubleshooting

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

## Gateway configuration

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
 
 
