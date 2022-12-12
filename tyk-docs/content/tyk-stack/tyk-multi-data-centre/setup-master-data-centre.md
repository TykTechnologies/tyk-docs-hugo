---
title: Setup Controller Data Centre
weight: 1
menu:
    main: 
        parent: "Tyk Multi Data Centre Bridge"
url: /tyk-multi-data-centre/setup-controller-data-centre/
aliases:
  - /docs/tyk-multi-data-centre/setup-master-data-centre/
---

## Introduction
The Controller Data Centre (DC) will contain all the standard components of a standard on-premises installation with the addition of one additional component, the Multi Data Centre Bridge (MDCB).
### Prerequisites
We will assume that your account manager has provided you with a valid MDCB and Dashboard License and the command to enable you to download the MDCB package.
We will assume that the following components are up and running in your Controller DC:

* MongoDB or SQL (check [supported versions](/docs/planning-for-production/database-settings/))
* Redis (check [supported versions](/docs/planning-for-production/redis/))
* Dashboard
* Gateway / Gateway Cluster
* Working Tyk-Pro [Self-Managed installation](/docs/tyk-self-managed/install/)

{{< note success >}}
**Note**  

In a production environment, we only support PostgreSQL.
{{< /note >}}

## MDCB Component Installation
The MDCB component will only need to be able to connect to Redis and MongoDB/PostgreSQL directly from within the Controller DC. It does not require access to the Tyk Gateway(s) or Dashboard application.
The MDCB component will however by default expose an RPC service on port 9091, which worker DCs will need connectivity to.
To download the relevant MDCB package from PackageCloud.

```{.copyWrapper}
curl -s https://packagecloud.io/install/repositories/tyk/tyk-mdcb-stable/script.deb.sh | sudo bash
```

```{.copyWrapper}
curl -s https://packagecloud.io/install/repositories/tyk/tyk-mdcb-stable/script.rpm.sh | sudo bash
```

After the relevant script for your distribution has run, the script will let you know it has finished with the following message:

`The repository is setup! You can now install packages.`

You will now be able to install MDCB as follows:

```{.copyWrapper}
sudo apt-get install tyk-sink
```

Or

```{.copyWrapper}
sudo yum install tyk-sink
```
## Installing in a Kubernetes Cluster with our Helm Chart

If you are deploying the Controller Data Centre in an **MDCB** deployment then you can set the `mdcb.enabled` option in your `values.yaml` to true to add the MDCB component to your cluster.

This enables multi-cluster, multi data centre API management from a single Dashboard.

## Configuration


### Configuration Example
Once installed, modify your `/opt/tyk-sink/tyk_sink.conf` file as follows:

```{.json}
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
  "security": {
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

```
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
This storage will work for fetching your organisation data (APIs, Policies, etc) and for analytics.
{{< /note >}}



You should now be able to start the MDCB service, check that it is up and running and ensure that the service starts on system boot:

```{.copyWrapper}
sudo systemctl start tyk-sink
```


```{.copyWrapper}
sudo systemctl enable tyk-sink
```

## Health check

It is possible to perform a health check on the MDCB service. This allows you to determine if the service is running, so is useful when using MDCB with load balancers.

MDCB uses a specific port for health checks. This is defined by the `healthcheck_port` configuration setting, and defaults to `8181`. Do **not** use the standard MDCB listen port (`listen_port`) for MDCB health checks.

To use the health check service, call the `/health` endpoint i.e. `http://my-mdcb-host:8181/health`. This will return a `HTTP 200 OK` response if the service is running.

## Troubleshooting

#### Check that the MDCB service is running 

```{.copyWrapper}
> sudo systemctl status tyk-sink
```

Should Return:

```
tyk-sink.service - Multi Data Centre Bridge for the Tyk API Gateway

  Loaded: loaded (/usr/lib/systemd/system/tyk-sink.service; enabled; vendor preset: disabled)

  Active: active (running) since Thu 2018-05-03 09:39:37 UTC; 3 days ago
  Main PID: 1798 (tyk-sink)

  CGroup: /system.slice/tyk-sink.service

      └─1798 /opt/tyk-sink/tyk-sink -c /opt/tyk-sink/tyk_sink.conf
```

#### Check that MDCB is listening on port 9091

```{.copyWrapper}
> sudo netstat -tlnp
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

```
-- Logs begin at Thu 2018-05-03 09:30:56 UTC, end at Mon 2018-05-07 08:58:23 UTC. --
May 06 11:50:37 master tyk-sink[1798]: time="2018-05-06T11:50:37Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
May 06 11:50:38 master tyk-sink[1798]: time="2018-05-06T11:50:38Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
...
May 06 11:50:42 master tyk-sink[1798]: time="2018-05-06T11:50:42Z" level=info msg="Ping!"
```

## Gateway configuration

Before a worker node can connect to MDCB, it is important to enable the organisation that owns all the APIs to be distributed to be allowed to utilise Tyk MDCB. To do this, the organisation record needs to be modified with two flags using the [Tyk Dashboard Admin API](https://tyk.io/docs/dashboard-admin-api/).

To make things easier, we will first set a few [environment variables](/docs/tyk-configuration-reference/environment-variables/):

1. `export DASH_ADMIN_SECRET=<YOUR_ADMIN_SECRET>`

You can find <YOUR_ADMIN_SECRET> in `tyk_analytics.conf` file under `admin_secret` field or `TYK_DB_ADMINSECRET` environment variable.

2. `export DASH_URL=<YOUR_DASH_URL>`

This is the URL you use to access the Dashboard (including the port if not using the default port).

3. `export ORG_ID=<YOUR_ORG_ID>`

You can find your organisation id in the Dashboard, under your user account details.

![Org ID](/docs/img/2.10/user_api_id.png)

4. Send a GET request to the Dashboard API to `/admin/organisations/$ORG_ID` to retrieve the organisation object. In the example below, we are redirecting the output json to a file `myorg.json` for easy editing.

```{.copyWrapper}
curl $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_ADMIN_SECRET" | python -mjson.tool > myorg.json
```

5. Open `myorg.json` in your favourite text editor and add the following fields as follows. 
New fields are between the `...` .

```{.json}
{
  "_id": "55780af69b23c30001000049",
  "owner_slug": "portal-test",
  ...
  "hybrid_enabled": true,
  "event_options": {
    "key_event": {
      "email": "test@test.com"
    },
    "hashed_key_event": {
      "email": "test@test.com"
    }
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

### Field Reference

`hybrid_enabled:` Allows a worker to login as an organisation member into MDCB

`event_options:` Enables key events such as updates and deletes, to be propagated to the various instance zones. API Definitions and Policies will be propagated by default, as well as the Redis key events, meaning that hashed and not hashed key events will be propagated by default in Redis and any config related to `hashed_key_event.redis` or `key_event.redis` will not be taken into consideration.


6. Update your organisation with a PUT request to the same endpoint, but this time, passing in your modified `myorg.json` file.

```{.copywrapper}
curl -X PUT $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_ADMIN_SECRET" -d @myorg.json
```

This should return:

```
{"Status":"OK","Message":"Org updated","Meta":null}
```
 
 
