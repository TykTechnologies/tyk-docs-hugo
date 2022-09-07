---
date: 2017-03-24T16:39:31Z
title: Tyk Multi Data Centre Bridge
weight: 15
menu:
    main:
        parent: "Tyk Stack"
url: "/tyk-multi-data-centre"
aliases:
    - /tyk-configuration-reference/mdcb-configuration-options/
    - /getting-started/tyk-components/mdcb/
---

## Introduction
Tyk Multi Data Centre Bridge (MDCB) acts as a broker between Tyk Gateway Instances that are isolated from one another and typically have their own Redis DB.

In order to manage physically separate Tyk Gateway clusters from a centralised location, Tyk MDCB needs to be used to provide a remote "back-end" for token and configuration queries.

MDCB is a separately licensed product that allows you to set up Tyk in the above manner.

### How Tyk MDCB Works

Tyk MDCB creates a bridge between a configuration source (MongoDB and a centralised Redis DB) and multiple Tyk Gateway instances, this bridge provides API Definitions, Policy definitions and Organization (Tenant) rate limits, as well as acting as a data sink for all analytics data gathered by workers Tyk Gateways.

The communication between instances works through a compressed RPC TCP tunnel between the gateway and MDCB, it is incredibly fast and can handle 10,000's of transactions per second.

## MDCB Logical Architecture

The Tyk MDCB logical architecture consists of:

1.  A master Tyk cluster, this can be active or inactive, what is important is that the master Tyk installation is not tagged or sharded or zoned in any way, it stores configurations for all valid APIs (this is to facilitate key creation).
2.  MDCB instances to handle the RPC connections.
3.  The Tyk worker clusters, these consist of Tyk Nodes and an isolated Redis DB.

{{< note success >}}
**Note**  

If setting up MDCB locally for a Proof of Concept, your Redis instances for the master and the workers MUST be different.
{{< /note >}}


![Tyk Open Source API Gateway Multi-Data Center Deployment][4]

### The Master Data Centre

Tyk instances connected to MDCB are workers, and so actually only ever have a locally cached set of key and policy data, so in order to first get workers clusters set up, you must have a master data centre. The master can be an existing Tyk Gateway setup, it does not need to be separately created, but bear in mind that the key store for this set up will hold a copy of ALL tokens across ALL zones.

The Master Data Centre need to consist of:

1.  A Dashboard instance
2.  A Master Tyk Gateway instance(s) (will load and be aware of all configurations, it is important to ensure this is not public facing)
3.  A primary Redis DB
4.  A MongoDB replica set for the dashboard and MDCB
5.  One or more MDCB instances, load balanced with port 9091 open for TCP connections

### The Workers Data Centres

The Workers Data Centres are essentially local caches that run all validation and rate limiting operations locally instead of against a remote master that could cause latency.

When a request comes into a Worker Data Centre, the following set of actions occur:

1.  Request arrives
2.  Auth header and API identified
3.  Local cache is checked for token, if it doesn't exist, attempt to copy token from RPC master node (MDCB)
4.  If token is found in master, copy to local cache and use
5.  If it is found in the local cache, no remote call is made and rate limiting and validation happen on the worker copy

{{< note success >}}
**Note**  

Cached versions do not get synchronised back to the master data centre, setting a short TTL is important to ensure a regular lifetime
{{< /note >}}

A Worker Data Centre consists of the following configuration:

1.  One or more Tyk Gateway instance(s) configured as workers
2.  A Redis DB

### MDCB Keys Synchroniser

From MDCB v2.0.0 you can enable the synchronisation of:

* API Keys
* Certificates
* OAuth2.0 Clients
This synchronisation is performed whenever a new group of worker is connected, making the nodes less dependant on the MDCB layer. For more information about how to configure this feature, see [the MDCB keys synchronizer configuration options](/docs/tyk-multi-data-centre/mdcb-configuration-options#sync_worker_config)

## Use Case 

You are company ABC with the following Data Centre Locations:

* Chicago
* New York
* San Francisco

You want to have your Master Data Centre installation based in Chicago, with further Tyk Gateway installations in New York and San Francisco.


## Benefits of Using MDBC

### Better Uptime if Master Failover

1. Gateways "stash" an encrypted version of their API and Policy configuration in the local redis
2. Gateways that are coming online during a scaling event can detect master MDCB downtime and will use the "last good" configuration found in Redis
3. Since running Gateways have already been caching tokens that are in the active traffic flow from MDCB up until the downtime event, all Gateways can service existing traffic, only new tokens will be rejected (and this can be mitigated by injecting those directly into the gateways using the local worker gateway API)
4. Once master is restored, the gateways will all hot-reload to fetch new configurations and resume normal operations
5. Gateways will only record a buffered window of analytics so as not to overwhelm redis or flood MDCB when it comes back online

### Latency Reduction

Because the Gateways cache keys and all operations locally, all operations can be geographically localised. This means that traffic to and from one location will all have rate limiting and checks applied within the same DC and round trip time is massively reduced.
Also, the lookup to MDCB is via a resilient compressed RPC channel that is designed to handle ongoing and unreliable connectivity, it is also encrypted, and so safer to use over the open internet or inter-DC links.

### Organisational Benefits

MDCB-worker gateways are tied to a single organisation in the Dashboard. This means that you can set up different teams as organisations in the Dashboard, and each team can run it's own set of Gateways that are logically isolated.
This can be achieved with a Dashboard-only setup, but requires Gateway sharding (tagging) and behavioural policy on the user's side to ensure that all APIs are tagged correctly, otherwise they do not load.
With an MDCB setup you get the ability to do both - segment out teams with their own Gateway clusters, and also sub-segment those Gateways with tagging.


[1]: /docs/tyk-multi-data-centre/multi-data-centre-bridge/#how-tyk-mdcb-works
[2]: /docs/tyk-multi-data-centre/multi-data-centre-bridge/#logical-architecture
[3]: /docs/tyk-multi-data-centre/multi-data-center-bridge/mdcb-setup/
[4]: /docs/img/diagrams/mdcb_v2.png


