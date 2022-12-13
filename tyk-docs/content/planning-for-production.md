---
date: 2017-03-24T17:49:59Z
title: Planning for Production
tags: ["Production", "Performance", "Security", "Tyk Self-Managed", "Tyk Open Source"]
description: "How to deploy Tyk in a production environment"
menu:
    main:
        parent: "Getting Started"
url: "/planning-for-production"
weight: 13
aliases:
  - /deploy-tyk-premise-production/
---

So you want to deploy Tyk to production?

There's a few things worth noting that can ensure your the performance of your Tyk Gateway nodes. Here's some of the basic things we do for load testing to make sure machines don't run out of resources.

### Performance Expectations

Our performance testing plan focused on replicating setup of our customers, and try not to optimise for "benchmarks": so no supercomputers and no sub-millisecond inner DC latency. Instead, we were testing on super-low performance 2 CPU Linode machine, with 50ms latency between Tyk and upstream. For testing, we used Tyk Gateway in Multi-Cloud mode, with default config. Test runner was using [Locust][2] framework and [Boomer][3] for load generation.

With the optimisations outlined below, and using our distributed rate limiter, we can easily handle ~3,000 requests per second with analytics, key authentication, and quota checks enabled.

In the test below, Tyk is evaluating each request through its access control list, rate limiter, quota evaluator, and analytics recorder across a single test token and still retains a latency firmly under 70 milliseconds:

![Tyk 2.7 performance](/img/diagrams/deployGraph.png)

#### Performance changes based on use case

A popular use case for Tyk we've seen crop up is as an interstitial API Gateway for microservices that are making service-to-service calls. Now with these APIs, usually rate limiting and quotas are not needed, only authentication and analytics. If we run the same tests again with rate limits disabled, and quotas disabled, then we see a different performance graph:

![Tyk 2.7 performance](/img/diagrams/deployGraphNoRateLimitQuota.png)

Here we have pushed the test to 3,000 requests per second, and we can see that Tyk copes just fine - a with a few spikes past the 100ms line, we can clearly see solid performance right up to 3,000 requests per second with acceptable latency.

#### Vanilla Tyk

Now if you were to just test Tyk as a pass-through auth proxy, we can see that 4k requests per second is easily handled:

![Tyk 2.7 performance](/img/diagrams/deployGraphVanilla.png)

This configuration has analytics recording disabled, but we are still authenticating the inbound request. As we can see we easily handle the 4k request per second mark, and we can go further with some more optimisations.

### Change all the shared secrets

Ensure that these are changed before deploying to production. The main secrets to consider are:

#### `tyk.conf`:

*   `secret`
*   `node_secret`

#### `tyk_analytics.conf`:

*   `admin_secret`
*   `shared_node_secret`
*   `typ_api_config.secret`

GW `secret` and DB `tyk_api_config.secret` must match

GW `node_secret` and DB `shared_node_secret` must match


#### Use the public/private key message security!

Tyk makes use of public-key message verification when it comes to messages that are sent from the Dashboard to the Gateways, these messages can include:

*   Zeroconfig Dashboard auto-discovery details
*   Cluster reload messages
*   Cluster configuration getters/setters for individual Gateways in a cluster

These keys are also used for plugin security, so it is important to use them if you are deploying code to your Gateway. The public key that ships with your Gateways is used to verify the manifest and files that come with any plugin bundle that gets downloaded by the bundle downloader.

### Change your Control Port

To secure your Tyk installation, you can configure the following settings in your [tyk.conf](/tyk-configuration-reference/tyk-gateway-configuration-options/):

`control_api_hostname` - Set the hostname to bind the REST API to.

`control_api_port` - This allows you to run the Gateway Control API on a separate port, and protect it behind a firewall if needed.

If you change this values, you need to update the two fields in the dashboard conf file `tyk_analytics.conf`, `tyk_api_config.Host`  and `tyk_api_config.Port`


### Connecting multiple gateways to a single dashboard

Please note that for an on-premises installation, the number of gateway nodes you may register with your dashboard concurrently will be subject to the kind of license you have.

Each gateway node will need to be configured in the same way, with the exception being if you want to shard your gateways. Each gateway node in the cluster will need connectivity to the same redis server & database.

### Other Dashboard Security Considerations

As well as changing the default secrets - see [Change all the shared secrets](/planning-for-production/#change-all-the-shared-secrets), if you change the Control API port (see [Change your Control Port](/planning-for-production/#change-your-control-port)), you also need to change the connection string settings in your `tyk_analytics.conf` file.


### Health checks are expensive

In order to keep real-time health-check data and make it available to the Health-check API, Tyk needs to record information for every request, in a rolling window - this is an expensive operation and can limit throughput - you have two options: switch it off, or get a box with more cores.

### Use the optimisation settings
The below settings will ensure connections are effectively re-used, removes a transaction from the middleware run that enforces org-level rules, enables the new rate limiter (by disabling sentinel rate limiter) and sets Tyk up to use an in-memory cache for session-state data to save a round-trip to Redis for some other transactions.

Most of the changed below should be already in your `tyk.conf` by default:

```{.copyWrapper}
"close_connections": false,
"proxy_close_connections": false,
"enforce_org_quotas": false,
"enforce_org_data_detail_logging": false,
"experimental_process_org_off_thread": true,
"enable_sentinel_rate_limiter": false,
"local_session_cache": {
  "disable_cached_session_state": false
},
"max_idle_connections_per_host": 500
```

In v2.7 we optimized the connection pool between Tyk and your Upstream. In previous releases `max_idle_connections_per_host` option, was capped by 100. For v2.7 you can set it to any value.

`max_idle_connections_per_host` by itself controls an amount of keep-alive connections between clients and Tyk. If you set this value too low, then Tyk will not re-use connections and you will have to open a lot of new connections to your upstream.

If you set this value too high, you may encounter issues when slow clients occupy your connection and you may reach OS limits.

You can calculate the right value using a straightforward formula:

if the latency between Tyk and your Upstream is around 50ms, then a single connection can handle 1s / 50s = 20 requests. So if you plan to handle 2000 requests per second using Tyk, the size of your connection pool should be at least 2000 / 20 = 100. For example, on low-latency environments (like 5ms), a connection pool of 100 connections will be enough for 20k RPS.

### Protect Redis from overgrowing
Please read carefully through this [doc](/basic-config-and-security/security/authentication-authorization/physical-token-expiry/) to make an *aware decision* about the expiration of your keys in Redis, after which they will be removed from Redis. If you don't set the lifetime, a zero default means that keys will stay in Redis till you manually delete them, which is no issue if you have a process outside Tyk Gateway to handle it. If you don't and especially in scenarios that your flow creates many keys or access tokens for every user or even per call you Redis can quickly get cluttered with obsolete tokens and eventually affect the performences of the Tyk Gateway.

### Use the right hardware

Tyk is CPU-bound, you will get exponentially better performance the more cores you throw at Tyk - it's that simple. Tyk will automatically spread itself across all cores to handle traffic, but if expensive operations like health-checks are enabled, then those can cause keyspace contention, so again, while it helps, health-checks do throttle throughput.

### Resource limits

Make sure your host operating system has resource limits set to handle an appropriate number of connections.

You can increase the maximum number of files available to the kernel by modifying `/etc/sysctl.conf`.

```{.copyWrapper}
fs.file-max=160000
```

Please note that a single file, with associated inode & dcache consumes approximately 1KB ram. As such, setting
`fs.file-max=160000` will consume a maximum of 160MB ram.

The changes will apply after a system reboot, but if you do not wish to reboot quite yet, you can apply the change
for the current session using `echo 160000 > /proc/sys/fs/file-max`.

### File Handles / File Descriptors
Now we need to configure the file handles available to your Tyk services.

#### systemd
Override your `systemd` unit files for each of the Tyk services using `systemctl edit {service_name}`.

* Gateway `systemctl edit tyk-gateway.service`
* Dashboard `systemctl edit tyk-dashboard.service`
* Pump `systemctl edit tyk-pump.service`
* Multi Data-Centre Bridge `systemctl edit tyk-sink.service`

You may then add `LimitNOFILE=80000` to the `[Service]` directive as follows:

```{.copyWrapper}
[Service]
LimitNOFILE=80000
```

After making these changes, you will need to restart your service, for example:

```{.copyWrapper}
systemctl restart tyk-gateway.service
```

#### Docker

You may set ulimits in a container using the `--ulimit` option. See
<a href="https://docs.docker.com/engine/reference/commandline/run/#set-ulimits-in-container---ulimit" target="_blank">Docker documentation</a> for setting ulimits.

```{.copyWrapper}
docker run --ulimit nofile=80000:80000 \
  -it --name tyk-gateway \
  tykio/tyk-gateway:latest
```

#### Other

If you are not using systemd or Docker, please consult your Operating System documentation for controlling the Number of
File Descriptors available for your process.

### File modification at runtime

Understanding what files are created or modified by the Dashboard and Gateway during runtime can be important if you are running infrastructure orchestration systems such as Puppet, which may erroneously see such changes as problems which need correcting.

*   Both the Gateway and Dashboard will create a default configuration file if one is not found.
*   Dashboard will write the licence into the configuration file if you add it via the UI.
*   From v2.3 onwards it is possible for a Dashboard to remotely change the config of a Gateway, which will cause the Gateway's configuration file to update.

 [1]: /img/diagrams/deployGraph.png
 [2]: /img/diagrams/deployGraphNoRateLimitQuota.png
 [3]: /img/diagrams/deployGraphVanilla.png
 [5]: https://docs.mongodb.com/manual/core/capped-collections/
 [6]: https://docs.mongodb.com/manual/reference/command/convertToCapped/
