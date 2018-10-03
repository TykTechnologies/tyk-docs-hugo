---
title: Setup Master Data Centre
weight: 1
menu:
    main: 
        parent: "Tyk Multi Data Centre"

---

## <a name="introduction"></a>Introduction
The Master Data Centre (DC) will contain all the standard components of a standard on-premises installation with the addition of one additional component, the multi-data-centre-bridge.
### Prerequisites
We will assume that your account manager has provided you with a valid MDCB and Dashboard License.
We will assume that the following components are up and running in your master DC:

* MongoDB 3.0 / 3.2 (Higher versions not tested)
* Redis
* Dashboard
* Gateway / Gateway Cluster
* Working Tyk-Pro On Premises installation - https://tyk.io/docs/get-started/with-tyk-on-premise/

### Default Ports

| Application             | Port           |
|-------------------------|----------------|
|MongoDB                  |      27017     |
|Redis                    |      6379      |
|**Tyk Dashboard**        |                |
|Developer Portal         |      3000      |
|Admin Dashboard          |      3000      |
|Admin Dashboard API      |      3000      |
|Websockets/Notifications |      5000      |
|**Tyk Gateway**          |                |
|Management API           |      8080      |
|**MDCB**                 |                |
|RPC Listen               |      9091      |
|Healthcheck              |      8181      |

## <a name="MDCB Component Installation"></a>MDCB Component Installation
The MDCB component will only need to be able to connect to Redis and MongoDB directly from within the master DC. It does not require access to the Tyk Gateway(s) or Dashboard application.
The MDCB component will however by default expose an RPC service on port 9090, which slave DCs will need connectivity to.
You should also have received a command to run containing a token to download the relevant MDCB package from PackageCloud.

```{.copyWrapper}
curl -s https://TOKEN:@packagecloud.io/install/repositories/tyk/tyk-mdcb/script.deb.sh | sudo bash
```

```{.copyWrapper}
curl -s https://TOKEN:@packagecloud.io/install/repositories/tyk/tyk-mdcb/script.rpm.sh | sudo bash
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

## <a name="configuration"></a>Configuration

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
    "enabled_cluster": false
  },
  "security": {
    "private_certificate_encoding_secret": "<gateway-secret>"
  },
  "hash_keys": true,
  "forward_analytics_to_pump": false,
  "aggregates_ignore_tags": [
    
  ],
  "analytics": {
    "mongo_url": "mongodb://localhost/tyk_analytics"
  },
  "license": "MDCB_LICENSE_KEY"
}
```

### Configuration Reference

| Field                        | Field Type     |       Description         |
|------------------------------|----------------|---------------------------|
|`listen_port`                 |      int       |The rpc port which slave gateways will connect to. Open this port to accept connections via your firewall.<br>If this value is not set, the MDCB application will apply a default value of 9091.|
|`healthcheck_port`            |      int       |This port lets MDCB allow standard health checks.<br>If this value is not set, the MDCB component will apply a default value of 8181.|
|`server_options.use_ssl`      |      bool       |If use_ssl is set to true, you need to enter the cert_file and key_file path names for certificate.|
|`server_options.min_version`  |      int        |The `min_version` setting should be the minimum TLS protocol version required from the client.<br> For TLS 1.0 use 769<br>For TLS 1.1 use 770<br>For TLS 1.2 use 771|
|`server_options.certificate.cert_file` |   string  |Filesystem location for pem encoded certificate|
|`server_options.certificate.key_file` |   string  |Filesystem location for pem encoded private key|
|`storage` |   object  |This section describes your centralised Redis DB. This will act as your master key store for all of your clusters.|
|`storage.type` |   string  |Currently, the only storage type supported is Redis.|
|`storage.host` |   string  |Hostname of your Redis server|
|`storage.port` |   int  |The port the Redis server is listening on.|
|`storage.password` |   string  |Optional auth password for Redis db|
|`storage.database` |   int  |By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.|
|`storage.optimisation_max_idle` |   int  |MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.|
|`storage.optimisation_max_active` |   int  |In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.|
|`storage.enable_cluster` |   bool  |If you are using Redis cluster, enable it here to enable the slots mode.|
|`storage.hosts` |   object  |Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}` |
|`storage.redis_use_ssl` |   bool  |If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)|
|`redis_ssl_insecure_skip_verify` |   bool  |Allows usage of self-signed certificates when connecting to an encrypted Redis database.|
|`security` |   object  ||
|`security.private_certificate_encoding_secret` |   string  |Allows MDCB to use Mutual TLS. This requires that `server_options.use_ssl` is set to true. See [Mutual TLS](https://tyk.io/docs/security/tls-and-ssl/mutual-tls/#mdcb) for more details.|
|`hash_keys` |   bool  |Set to true if you are using a hashed configuration installation of Tyk, otherwise set to false.|
|`session_timeout` |   int  |Number of seconds before the gateways are forced to re-login. Default is 86400 (24 hours).|
|`forward_analytics_to_pump` |   bool  |Instead of sending analytics directly to MongoDB, MDCB can send analytics to Redis. This will allow [tyk-pump] (https://github.com/TykTechnologies/tyk-pump) to pull analytics from Redis and send to your own data sinks.|
|`aggregates_ignore_tags` |   String Array  |If custom analytics tags are used. You may disable generating aggregate analytics for these tags. E.g.<br>`[`<br>`"Request-Id",`<br>`"Secret-Key"`<br>`]`|
|`analytics` |   object  ||
|`analytics.mongo_url` |   string  |Connection string for MongoDB.|
|`License` |     |Enter your license in this section so MDCB can start.|


You should now be able to start the MDCB service, check that it is up and running and ensure that the service starts on system boot:

```{.copyWrapper}
sudo systemctl start mdcb
```


```{.copyWrapper}
sudo systemctl enable mdcb
```

## <a name="healthcheck"></a>Health check

It is possible to perform a health check on the MDCB service. This allows you to determine if the service is running, so is useful when using MDCB with load balancers.

MDCB uses a specific port for health checks. This is defined by the `healthcheck_port` configuration setting, and defaults to `8181`. Do **not** use the standard MDCB listen port (`listen_port`) for MDCB health checks.

To use the health check service, call the `/health` endpoint i.e. `http://my-mdcb-host:8181/health`. This will return a `HTTP 200 OK` response if the service is running.

## <a name="troubleshooting"></a>Troubleshooting

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

#### Check that MDCB is listening on port 9090

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
> sudo journalctl -u tyk-sink (add the -f flag to follow)
```

Should Return:

```
-- Logs begin at Thu 2018-05-03 09:30:56 UTC, end at Mon 2018-05-07 08:58:23 UTC. --
May 06 11:50:37 master tyk-sink[1798]: time="2018-05-06T11:50:37Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
May 06 11:50:38 master tyk-sink[1798]: time="2018-05-06T11:50:38Z" level=info msg="RPC Stats:{\"RPCCalls\":0,\"RPCTime\":0,\"Byte
...
May 06 11:50:42 master tyk-sink[1798]: time="2018-05-06T11:50:42Z" level=info msg="Ping!"
```

## <a name="app config"></a>Application Configuration

Before a slave node can connect to MDCB, it is important to enable the organisation that owns all the APIs to be distributed to be allowed to utilise Tyk MDCB. To do this, the organisation record needs to be modified with a few new flags using the [Tyk Dashboard Admin API](https://tyk.io/docs/dashboard-admin-api/).

To make things easier, we will first set a few [environment variables](https://tyk.io/docs/configure/dashboard-env-variables/):

`export DASH_API_KEY=<YOUR_KEY>`

tyk_analytics.conf file under `admin_secret` or `TYK_DB_ADMINSECRET` environment variable.

`export DASH_URL=<YOUR_DASH_URL>`

The URL you use to access the Dashboard (including the port if not using the default port).

`export ORG_ID=<YOUR_ORG_ID>`

You can obtain this from the Dashboard, under your user account.

![Org ID][1]

Send a GET request to the Dashboard API to `/admin/organisations/$ORG_ID` to retrieve the organisation object. In the example below, we are redirecting the output json to a file `myorg.json` for easy editing.

```{.copyWrapper}
curl $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_API_KEY" | python -mjson.tool > myorg.json
```

Edit `myorg.json` in your favourite text editor, add the following fields as follows. New fields are between the `...` .

```{.json}
{
  "_id": "55780af69b23c30001000049",
  "owner_slug": "portal-test",
  ...
  "hybrid_enabled": true,
  "event_options": {
    "key_event": {
      "redis": true
    },
    "hashed_key_event": {
      "redis": true
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

`hybrid_enabled:`

Allows a slave to login as an organisation member into MDCB

`event_options:`

Enables key events such as updates and deletes, to be propagated to the various instance zones. API Definitions and Policies will be propagated by default.

### Update Your Tyk Organisation

You will now need to update the organisation within Tyk. Send a PUT request to the same endpoint, but this time, passing in your modified `myorg.json` file.

```{.copywrapper}
curl -X PUT $DASH_URL/admin/organisations/$ORG_ID -H "Admin-Auth: $DASH_API_KEY" -d @myorg.json
```

This should return:

```
{"Status":"OK","Message":"Org updated","Meta":null}
```


[1]: /docs/img/dashboard/system-management/user_orgid.png
 

