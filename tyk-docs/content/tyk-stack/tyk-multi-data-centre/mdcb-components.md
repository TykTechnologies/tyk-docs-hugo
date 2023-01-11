---
date: 2023-01-10
title: MDCB Components
menu:
    main:
        parent: "Tyk Multi Data Centre Bridge"
weight: 3
tags: ["components", "MDCB","MDCB components","worker"]
description: "components that are required to deploy a MDCB environment."
---

## Overview

Here we will give an overview of the main elements of a Tyk Multi Data Centre (distributed) solution, clarifying the terminology used by Tyk.
<<link to image stored in /assets>>

### Tyk Gateway 
- The workhorse of any deployment, Tyk’s lightweight Open Source API gateway that exposes your APIs for consumption by your users. It is a reverse proxy that secures your APIs, manages session and policies, monitors, caches and manipulates requests/responses when needed before/after it proxies them to and from the upstream.

### Tyk Dashboard
- Tyk’s management platform used to control the creation of API configurations, policies and keys in a persistent manner. It provides analytic information on the traffic the Gateways have processed which includes aggregated API usage and detailed information per transaction.

### Tyk Multi Data Centre Bridge (MDCB)
- The backbone of the distributed Tyk deployment, connecting the different Worker Clusters back to the Control Plane.

### Tyk Pump
- Tyk’s open source analytics purger that can be used to export transaction logs from the Tyk deployment to the visualisation tool or other data store of your choice

### Tyk Developer Portal
- The access point for your API Consumers where you publish your API catalogue(s) and they obtain API keys.

### Redis
- An in-memory data store used as a database, cache and message broker. We use it as pub/sub broker for inter-Gateway communication, and as a cache for API configurations, keys, certificates, and temporary store for analytics records.

### MongoDB/SQL
- A persistent data store for API configurations, policies, analytics and aggregated analytics, Dashboard organisations, configurations, dashboard users, portal developers and configuration.


## Control Plane
<<link to image stored in /assets>>

The Control Plane must consist of the following elements:
- **Tyk Dashboard** (used to configure and control the whole Tyk installation)
- **Tyk Gateway** (used for creation of keys and certificates, this does not service API requests; it is important to ensure there is no public access to it and it must not be shared (tagged) as it "belongs" to the whole Tyk installation)
- **Tyk MDCB**
- **Redis** (high availability Redis data store that should be backed up in case of failure; this [document]("https://redis.io/docs/management/persistence/") gives recommendation on Redis persistency)
- **MongoDB or SQL** (a persistent data store that should be deployed and set up for redundancy and high availability)

To improve resilience and availability, multiple instances of each Tyk component should be deployed and load balanced within the cluster.

### Optional Components
- One or more **Tyk Pumps** can be deployed within the Control Plane to export analytics data (request/response logs) to your [data sink of choice]({{< ref "/tyk-stack/tyk-pump/other-data-stores/" >}}) for further analytics and visualisation.
- A **Tyk Developer Portal** can be added to enhance the end-user experience when accessing your APIs.
 
## Worker Cluster
<<link to image stored in /assets>>

Each Worker Cluster must consist of the following elements:
- **Tyk Gateway** (one or more Gateways specifically configured as a Worker)
- **Redis** (a single Redis data store shared by all Gateways in the cluster)

To provide resilience and availability, multiple Gateways should be deployed and load balanced within the cluster.
If you want this cluster to be resilient, available, and independent from the Control Plane during a disconnection event, it is advised to make the Redis data store persistent.
  
### Optional Components
- A **Tyk Pump** specifically configured as a [Hybrid Pump]({{< ref "/release-notes/version-2.8/#custom-analytics-storage-engines-for-multi-cloud--enterprise-mdcb-users" >}}) can be deployed within the Worker Cluster to export analytics data (request/response logs) from this cluster to your [data sink of choice]({{< ref "/tyk-stack/tyk-pump/other-data-stores/" >}}) for further analytics and visualisation.
  
## Next Steps
 - [Run an MDCB Proof of Concept]({{< ref "/tyk-stack/tyk-multi-data-centre/mdcb-example-minimising-latency.md" >}})
 - [Advanced MDCB]({{< ref "/tyk-stack/tyk-multi-data-centre/advanced-mdcb/advanced-mdcb.md" >}})
 - [MDCB reference guide]({{< ref "/tyk-stack/tyk-multi-data-centre/mdcb-configuration-options.md" >}})
