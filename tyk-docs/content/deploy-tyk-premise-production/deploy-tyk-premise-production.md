---
date: 2017-03-24T17:49:59Z
title: Deploy Tyk On-Premises to Production
weight: 180
menu: "main"
url: "/deploy-tyk-premise-production"
---

So you want to deploy Tyk to production?

There's a few things worth noting that can ensure your the performance of your Tyk Gateway nodes. Here's some of the basic things we do for load testing to make sure machines don't run out of resources.

### What to expect

With the optimisations outlined below, and using our distributed rate limiter, we can get a single 2-core/2GB Digital Ocean Gateway node to easily handle ~2,000 requests per second with analytics, key authentication, and quota checks enabled.

In the results below, Tyk is evaluating each request through its access control list, rate limiter, quota evaluator, and analytics recorder across a single test token and still retains a latency firmly under 80 milliseconds:

![Tyk 2.3 performance][1]

#### Performance changes based on use case

A popular use case for Tyk we've seen crop up is as an interstitial API Gateway for microservices that are making service-to-service calls. Now with these APIs, usually rate limiting and quotas are not needed, only authentication and analytics. If we run the same tests again with rate limits disabled, and quotas disabled, then we see a different performance graph:

![Tyk 2.3 performance][2]

Here we have pushed the test to 3,000 requests per second, and we can see that Tyk copes just fine - a with a few spikes past the 100ms line, we can clearly see solid performance right up to 3,000 requests per second with acceptable latency.

#### Vanilla Tyk

Now if you were to just test Tyk as a pass-through auth proxy, we can see that 3k requests per second is easily handled:

![Tyk 2.3 performance][3]

This configuration has analytics recording disabled, but we are still authenticating the inbound request. As we can see we easily handle the 3k request per second mark, and we can go further with some more optimisations.

*(These tests were produced with [Blitz.io][4] with a test running from `0` to `2000` users and from `0` to `3000` users in `2` minutes respectively with 20 sample access tokens), the Redis DB was not running on the same server*

### Change all the shared secrets

Tyk uses many shared secrets between services, and some of these are defaults in the configurations files, **make sure that these are changed before deploying to production**. The main secrets to consider are:

#### `tyk.conf`:

*   `secret`
*   `node_secret`

#### `tyk_analytics.conf`:

*   `admin_secret`
*   `node_secret`

#### Use the public/private key message security!

Tyk makes use of public-key message verification when it comes to messages that are sent from the Dashboard to the Gateways, these messages can include:

*   Zeroconfig Dashboard auto-discovery details
*   Cluster reload messages
*   Cluster configuration getters/setters for individual Gateways in a cluster 

These keys are also used for plugin security, so it is important to use them if you are deploying code to your Gateway. The public key that ships with your Gateways is used to verify the manifest and files that come with any plugin bundle that gets downloaded by the bundle downloader.

### Split out your DB

This is a no-brainer, but keep Redis and MongoDB off the system running the Gateway, they both use lots of RAM, and with Redis and the Gateway constantly communicating you will be facing resource contention on the CPU for a marginal decrease in latency.

So in our setup, we recommend that Redis and MongoDB live on their own systems, separate from your Tyk Gateway. If you like, run them together on the same box, that's up to you.

The network topology we like to use is:

*   Two or more Tyk Gateway nodes (load balanced, each Gateway installed on separate machines).
*   A separate MongoDB cluster
*   A separate Redis server with fail-over or cluster
*   One Tyk Dashboard node installed on a separate machine
*   One Tyk Pump node installed on a separate machine that handles data transitions

If you are making use of the Tyk Caching feature, then it is possible to use a secondary Redis server or Redis cluster to store cache data. This can be very useful in high-traffic APIs where latency is at a premium.

### Connecting multiple gateways to a single dashboard

Please note that for an on-premises installation, the number of gateway nodes you may register with your dashboard concurrently will be subject to the kind of license you have.

Each gateway node will need to be configured in the same way, with the exception being if you want to shard your gateways. Each gateway node in the cluster will need connectivity to the same redis server & database.

### Make sure you have enough Redis connections

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

### Protection of Redis data

Tyk uses Redis to store API tokens and OAuth clients, so it is advisable to *not* treat Redis instances as ephemeral. The exception to this is when you are using Tyk Multi Data Center Bridge, but you will still need to retain the master Redis instance.

You must ensure that Redis is persisted, or at least in a configuration where it is easy to restore or failover. So, for example, with Elasticache, making sure there are many read-replicas and regular snapshots can ensure that your data survives a failure.

### Capping analytics data

Tyk Gateways can generate a lot of analytics data. A guideline is that for every 3 million requests that your Gateway processes it will generate roughly 1GB of data.

If you have Tyk Pump set up with the aggregate pump as well as the regular MongoDB pump, then you can make the `tyk_analytics` collection a [capped collection][5]. Capping a collection guarantees that analytics data is rolling within a size limit, acting like a FIFO buffer which means that when it reaches a specific size, instead of continuing to grow, it will replace old records with new ones.

The `tyk_analytics` collection contains granular log data, which is why it can grow rapidly. The aggregate pump will convert this data into a aggregate format and store it in a separate collection. The aggregate collection is used for processing reporting requests as it is much more efficient.

If you've got an existing collection which you want to convert to be capped you can use the `convertToCapped` [MongoDB command][6].

If you wish to configure the pump to cap the collections for you upon creating the collection, you may add the following
configurations to your `uptime_pump_config` and / or `mongo.meta` objects in `pump.conf`.

```
"collection_cap_max_size_bytes": 1048577,
"collection_cap_enable": true
```

`collection_cap_max_size_bytes` sets the maximum size of the capped collection.
`collection_cap_enable` enables capped collections.

If capped collections are enabled and a max size is not set, a default cap size of `5Gib` is applied. 
Existing collections will never be modified.

### Health checks are expensive

In order to keep real-time health-check data and make it available to the Health-check API, Tyk needs to record information for every request, in a rolling window - this is an expensive operation and can limit throughput - you have two options: switch it off, or get a box with more cores.

### Use the optimisation settings

Tyk has an asynchronous rate limiter that can provide a smoother performance curve to the default transaction based one, this rate limiter will be switched on by default in future versions.

To enable this rate limiter, make sure the settings below are set in your `tyk.conf`:

```{.copyWrapper}
    "close_connections": true,
    "enforce_org_quotas": false, // only true if multi-tenant
    "enforce_org_data_detail_logging": false,
    "experimental_process_org_off_thread": true,
    "enable_non_transactional_rate_limiter": true,
    "enable_sentinel_rate_limiter": false,
    "local_session_cache": {
        "disable_cached_session_state": false
    },
```

The above settings will ensure connections are closed (no TCP re-use), removes a transaction from the middleware run that enforces org-level rules, enables the new rate limiter and sets Tyk up to use an in-memory cache for session-state data to save a round-trip to Redis for some other transactions.

### Use the right hardware

Tyk is CPU-bound, you will get exponentially better performance the more cores you throw at Tyk - it's that simple. Tyk will automatically spread itself across all cores to handle traffic, but if expensive operations like health-checks are enabled, then those can cause keyspace contention, so again, while it helps, health-checks do throttle throughput.

### Resource limits

Make sure your system has resource limits set to handle lots of inbound traffic.

#### File handles

One thing that happens to systems that are under heavy strain is the likelihood of running out of file descriptors, so we need to make sure that this is set up properly.

Set the global file limits like this:

In the file `/etc/sysctl.conf` add:

`fs.file-max=80000`

For the file: `/etc/security/limits.conf`, add:

```{.copyWrapper}
    *          soft     nproc          80000
    *          hard     nproc          80000
    *          soft     nofile         80000
    *          hard     nofile         80000
    root       soft     nproc          80000
    root       hard     nproc          80000
    root       soft     nofile         80000
    root       hard     nofile         80000
```

The above is a catch-all! On some systems and init systems the wildcard limit doesn't always work.

If you are using `systemd` and you see the message `http: proxy error: dial tcp xxx.xxx.xxx.xxx:9086: socket: too many open files` in the log, try adding `LimitNOFILE=80000` to the `/usr/lib/systemd/system/tyk-gateway.service` file.

**Ubuntu and Upstart**

If you are using Upstart, then you'll need to set the file handle limits in the init script (`/etc/init/tyk-gateway.conf`):

`limit nofile 50000 80000`

#### TCP connection recycling

Use this at your own peril - it's not always recommended and you need to be sure it fits your use case, but you can squeeze a bit more performance out of a Gateway install by running this on the command line:

```{.copyWrapper}
    sysctl -w net.ipv4.tcp_tw_recycle=1
```

Careful with it though, it could lead to unterminated connections.

### File modification at runtime

Understanding what files are created or modified by the Dashboard and Gateway during runtime can be important if you are running infrastructure orchestration systems such as Puppet, which may erroneously see such changes as problems which need correcting.

*   Both the Gateway and Dashboard will create a default configuration file if one is not found.
*   Dashboard will write the licence into the configuration file if you add it via the UI.
*   From v2.3 onwards it is possible for a Dashboard to remotely change the config of a Gateway, which will cause the Gateway's configuration file to update.

 [1]: /docs/img/diagrams/deployGraph.jpg
 [2]: /docs/img/diagrams/deployGraphNoRateLimitQuota.jpg
 [3]: /docs/img/diagrams/deployGraphVanilla.jpg
 [4]: http://blitz.io
 [5]: https://docs.mongodb.com/manual/core/capped-collections/
 [6]: https://docs.mongodb.com/manual/reference/command/convertToCapped/

