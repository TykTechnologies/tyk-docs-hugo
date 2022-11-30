## Overview

Here we will give an overview of the main elements of an MDCB solution, clarifying the terminology used by Tyk.

<image - Tyk MDCB highlevel (controller + workers)>

**Tyk Gateway** 
- the workhorse of any deployment, Tyk’s lightweight Open Source API gateway that exposes your APIs for consumption by your users. It is a reverse proxy that secures your APIs, manages session and policies, monitors, caches and manipulates requests/responses when needed before/after it proxies them to and from the upstream.

**Redis**
- an in-memory data store used as a database, cache and message broker. We use it as pub/sub broker for inter-Gateway communication, and as a cache for API configurations, keys, certificates, and temporary store for analytics records.

**MongoDB/SQL**
- a persistent data store for API configurations, policies, analytics and aggregated analytics, Dashboard organisations, configurations, dashboard users, portal developers and configuration

**Multi Data Centre Bridge (MDCB)**
- the backbone of the distributed Tyk deployment, connecting the different Gateway clusters back to the management cluster

**Tyk Dashboard**
- Tyk’s management platform used to control the creation of API configurations, policies and keys in a persistent manner. It provides analytic information on the traffic the Gateways have processed which includes aggregated API usage and detailed information per transaction

**Tyk Pump**
- Tyk’s open source analytics purger that can be used to export transaction logs from the Tyk deployment to the visualisation tool or other data store of your choice

**Developer Portal**
- Access point for your API Consumers where you publish your API catalogue(s) and they obtain API keys


## Tyk Controller

The Controller cluster is where the components required to create MDCB’s shared control plane are located and must consist of the following elements:
- Tyk Dashboard (used to configure and control the whole Tyk installation)
- Tyk Gateway (this is refered to as the Management/Controller GW and will not service API transactions; it is important to ensure this is not public facing)
- Tyk MDCB
- High availability Redis data store (used as primary reference for the deployment)
- A high availability persistent data store (e.g. MongoDB or SQL replica set)
To improve resilience and availability, multiple instances of each Tyk component should be deployed and load balanced within the cluster.

<image - controller cluster>
  
### Optional Components
- One or more Tyk Pumps can be deployed within the controller cluster to export transaction logs to your choice of external data sinks for further analytics and visualisation.
- A Tyk Developer Portal should be deployed within the controller cluster to enhance the end user experience when accessing your APIs; multiple Developer Portals can be deployed - for example for internal and external consumers.
 
## Tyk Worker
Each Worker Cluster must consist of the following elements:
- One or more Tyk Gateway instance(s) specifically configured as Workers
- A single Redis data store shared by all Gateways in the cluster
To improve resilience and availability, multiple instances of each Tyk component should be deployed and load balanced within the cluster.

<image - worker cluster>
  
### Optional Components
- One or more Tyk Pumps can be deployed within the worker cluster to export transaction logs to your choice of external data sinks for further analytics and visualisation.
  
## Next Steps
- [Run an MDCB Proof of Concept](/docs/tyk-multi-data-centre/mdcb-example)
- [Advanced MDCB](/docs/tyk-multi-data-centre/advanced-mdcb)
- [MDCB reference guide](/docs/tyk-multi-data-centre/mdcb-reference)
