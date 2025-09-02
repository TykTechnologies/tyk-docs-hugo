---
title: "Database Management"
date: 2025-02-10
keywords: ["Database", "Tyk Gateway", "Tyk Dashboard", "Tyk Pump", "Redis", "MongoDB", "PostgreSQL"]
description: "How to configure Tyk's data storage for production"
aliases:
  - /planning-for-production/database-settings/postgresql
  - /planning-for-production/database-settings/sql
  - /planning-for-production/database-settings/mongodb
  - /planning-for-production/database-settings/mongodb-sizing
  - /planning-for-production/redis-mongodb
  - /planning-for-production/redis-mongodb-sizing
  - /planning-for-production/redis-sizing
  - /analyse/redis-mongodb-sizing
  - /planning-for-production/redis
  - /analytics-and-reporting/redis-mongodb-sizing
---


A

Visit the following sections to see how to configure the Database for Production:
* [Redis]({{< ref "planning-for-production/database-settings#redis" >}})
* [MongoDB]({{< ref "planning-for-production/database-settings#mongodb-sizing-guidelines" >}})
* [PostgreSQL]({{< ref "planning-for-production/database-settings#postgresql" >}})

Please consult the [data storage configuration]({{< ref "api-management/dashboard-configuration#data-storage-solutions" >}}) guide for further information relating to how to configure Tyk's data storage across different database engines.

## Redis

**Supported Versions**
- Tyk 5.3 supports Redis 6.2.x, 7.0.x, and 7.2.x
- Tyk 5.2.x and earlier supports Redis 6.0.x and Redis 6.2.x only.


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

Tyk also lets you set a maximum number of open connections so that you don't over-commit connections to the server.

To set your maximums and minimums, edit your `tyk.conf` and `tyk_analytics.conf` files to include:

```yaml
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

- `storage.ssl_insecure_skip_verify`: A flag that, when set to true, instructs the application not to verify the Redis server's TLS certificate. This is not recommended for production due to the risk of `man-in-the-middle` attacks.

From **Tyk 5.3**, additional options are available for more granular control:

- `storage.ca_file`: Path to the Certificate Authority (CA) file for verifying the Redis server's certificate.

- `storage.cert_file` and `storage.key_file`: Paths to your application's certificate and private key files, necessary for mTLS where both parties verify each other's identity.

- `storage.max_version` and `storage.min_version`: Define the acceptable range of TLS versions, enhancing security by restricting connections to secure TLS protocols (1.2 or 1.3).

**Setting up an Insecure TLS Connection**
- **Enable TLS**: By setting `"use_ssl": true`, you encrypt the connection.
- **Skip Certificate Verification**: Setting `"ssl_insecure_skip_verify": true` bypasses the server's certificate verification, suitable only for non-production environments.

**Setting up a Secure TLS Connection**
- Ensure `use_ssl` is set to `true`.
- Set `ssl_insecure_skip_verify` to `false` to enforce certificate verification against the CA specified in `ca_file`.
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
  "ssl_insecure_skip_verify": false,
  "ca_file": "/path/to/ca.crt",
  "cert_file": "/path/to/client.crt",
  "key_file": "/path/to/client.key",
  "max_version": "1.3",
  "min_version": "1.2"
}
```

**Capping Analytics**
Tyk Gateways can generate a lot of analytics data. Be sure to read about [capping your Dashboard analytics]({{< ref "api-management/tyk-pump#tyk-pump-capping-analytics-data-storage" >}})


### Redis Sizing Guidelines

The average single request analytics record (without detailed logging turned on) is around 1KB.

In terms of Redis, in addition to key storage itself, it should be able to hold the last 10 seconds of analytics data, preferably more, in the case of a Tyk Pump failure. So if you have 100 requests per second, you will need approximately 6MB for storing 60 seconds of data. Be aware that if detailed logging is turned on, this can grow by a magnitude of 10. 

{{< note success >}}
**Note**  

MDCB and Multi-Cloud clients - the Gateways write the data to a temporary Redis list and periodically send the analytics directly to the MDCB server, which, similar to Pump, processes them for purging to MongoDB or PostgreSQL.
{{< /note >}}

**Redis RAM Calculator**
You can calculate your Redis RAM requirements by entering your known values in the middle section of the calculator settings below:

{{< redis-calculator >}}


## MongoDB

### Supported Versions

{{< include "mongodb-versions-include" >}}

### Choose a MongoDB driver

From Tyk 5.0.2, we added an option to use the official MongoDB Go driver to connect to MongoDB. 

We recommend using the *mongo-go* driver if you are using MongoDB 4.4.x+. For MongoDB versions prior to 4.4, please use the *mgo* driver.

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

If you are using [DocumentDB](https://aws.amazon.com/documentdb/), [capped collections]({{< ref "api-management/tyk-pump#tyk-pump-capping-analytics-data-storage" >}}) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details. 
{{< /note >}} 

**Special notes for MongoDB Atlas**
To integrate with [MongoDB Atlas](https://www.mongodb.com/atlas/database), make sure the IP firewall connections are whitelisted on the Atlas side, and then use the following Tyk Dashboard configurations to connect: 
``` 
- TYK_DB_MONGOURL=mongodb://admin:password@tykdb-shard-00-00.h42pp.mongodb.net:27017,tykdb-shard-00-01.h42pp.mongodb.net:27017,tykdb-shard-00-02.h42pp.mongodb.net:27017/tyk_analytics?authSource=admin - TYK_DB_ENABLECLUSTER=false - TYK_DB_MONGOUSESSL=true 
``` 

More information on these configuration variables [here]({{< ref "tyk-dashboard/configuration" >}}). 


### MongoDB Sizing Guidelines

The aggregate record size depends on the number of APIs and Keys you have. Each counter size is ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

**MongoDB Working Data**

Working data in terms of MongoDB is the data you query most often. The graphs displayed on the Tyk Dashboard, except for the Log browser, use aggregated data. 

So if you rely only on this kind of analytic data, you will not experience issues with working data and memory issues. It is literally hundreds of MBs. 

Even if you use the Log browser, its usage access is usually quite random, and it is unlikely that you check requests for every request. So it can't be called working data. And it is ok to store it on disk and allow MongoDB to do the disk lookups to fetch the data. 

Note, that in order to do fast queries, even from the disk, MongoDB uses indexes. MongoDB recommends that indexes should fit into memory, and be considered working data, but only the part of the index which is commonly used. For example the last month of data. 

For an aggregate collection, the average index size is 6% of the overall collection. For requests stats, it is around 30%. 


**MongoDB Sizing Example**
If you serve 1 million requests per day, and require fast access to the last seven days of request logs (usually way less, and the performance of the log viewer is not a concern), with 3 months of aggregated logs, the memory requirements for MongoDB can be as follows:

Request_logs_index ( 30% * (1GB * 7) ) + aggregated(3month * 30MB) ~= 2.1GB + 90MB = ~ 2.2GB

In addition to storing working data in memory, MongoDB also requires space for some internal data structures. In general, multiplying the resulting number by 2x should be enough. In the above example, your MongoDB server should have around 4.4GB of available memory.

**Audit Log storage**

From Tyk Dashboard v5.7+,the  audit log can be configured to be stored in the database. If you choose to store the audit logs in the database, you need to account for additional storage for audit logs in the database setup. The size of this table will depend on the number of operations recorded, with each record averaging 1350 to 1450 bytes.

**Audit Log Considerations**

- **Data Generation**: The total size of the audit log table will depend on the number of API operations, administrative actions, and system events that are being logged.
- **Daily Estimate**: For example, logging 100,000 operations per day results in 135MB to 145MB of additional data daily.
- **Storage Growth**: Over time, this can significantly impact your storage requirements, especially in high-traffic environments or systems with comprehensive logging enabled.

**Recommendations for Housekeeping the Audit Log Table**

1. **Implement Data Retention Policies:**
  Define a clear retention period based on business and regulatory requirements, such as 30, 90, or 180 days. Remove older logs that exceed the retention policy to prevent excessive storage growth.

2. **Archive Older Logs:**
  For long-term storage or compliance purposes, move older logs to external systems such as a data lake, object storage (e.g., S3), or a data warehouse.

3. **Monitor Growth Trends:**
  Use monitoring tools to track the size and growth rate of the audit log table. Adjust retention policies or resources proactively based on observed trends.

4. **Plan for Resource Scaling:**
  Audit log storage can significantly impact overall database size, especially in high-traffic environments. Plan for storage and resource scaling based on daily log growth estimates.

**Example Calculation:**

- Daily Logs: 100,000 operations/day
- Average Record Size: 1400 bytes
- Storage Growth: 100,000 × 1400 bytes/day = 140MB/day 

For 90 days: 140MB × 90 = ~12.6GB

**MongoDB Database Storage Calculator**
You can calculate your MongoDB storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}


## PostgreSQL

How you configure your PostgreSQL installation depends on whether you are installing Tyk from fresh using PostgreSQL, or are migrating from an existing MongoDB instance.

**Supported Versions**

{{< include "sql-versions-include" >}}

### Migrating from an existing MongoDB instance

For v4.0 we have provided a migration command that will help you migrate all data from the main storage layer (APIs, Policies, Users, UserGroups, Webhooks, Certificates, Portal Settings, Portal Catalogs, Portal Pages, Portal CSS, etc.).

{{< note success >}}
**Note**  

The migration tool will not migrate any Logs, Analytics, or Uptime analytics data.
{{< /note >}}

1. Make sure your new SQL platform and the existing MongoDB instance are both running
2. Configure the `main` part of the  `storage` section of your `tyk-analytics.conf`:

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
You will see an output listing the transfer of each database table. For example: `Migrating 'tyk_apis' collection. Records found: 7`.

4. You can now remove your `mongo_url` (or `TYK_DB_MONGOURL` environment variable) from your `tyk-analytics.conf`
5. Restart your Tyk Dashboard

### PostgreSQL Sizing Guidelines

The aggregate record size depends on the number of APIs and Keys you have. Each counter size is ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

**PostgreSQL Database Storage Calculator**
You can calculate your PostgreSQL storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}


