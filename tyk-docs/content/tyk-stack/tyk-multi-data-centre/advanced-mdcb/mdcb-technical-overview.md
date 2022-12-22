## Introduction
API resources (such as API definitions, policy definitions and API keys) are mastered in the Management Cluster’s Redis and persistent data store (MongoDB or SQL). These data may be created using the Tyk Dashboard or Tyk Operator, or through direct manipulation of the Tyk API.

Tyk Multi Data Centre Bridge creates a bridge between these configuration sources and multiple Tyk Gateway instances in the Worker clusters; it manages the synchronisation of API resources to those Worker clusters and also acts as a data sink for all API transaction (analytics) data gathered by the Tyk Gateways, bringing the logs back to the Management cluster for storage and visualisation.

The communication between instances works through a compressed RPC TCP tunnel between each Gateway and the MDCB; this tunnel is incredibly fast and can handle 10,000’s of transactions per second.

### Logical Architecture
The Tyk MDCB logical architecture consists of:
 - A single Management Cluster with the master record stores (persistent and Redis), Dashboard for configuration/control, MDCB instance and a Tyk Gateway used to facilitate key creation; this Gateway *must not* be tagged or sharded as it stores configurations for all valid APIs.
 - One or more Worker Clusters, each of which consist of Tyk Gateways and an isolated Redis DB (shared between all Gateways in the cluster and used as a local cache for key and policy data). Each Worker Cluster is identified by a unique `group_id` that is assigned to all of its Gateways; this can, for example, be used to segregate APIs for different departments.
 
<Note> If setting up MDCB locally for a Proof of Concept, your Redis instances for the Management Cluster and the Workers MUST be different. </Note>  
<Note> Each Worker Cluster MUST be allocated a unique group_id which is then assigned to all of its Tyk Gateways. </Note>

### Data Storage
The Redis in the Management Cluster acts as the primary key store and holds a copy of ALL tokens across ALL zones.

The Worker Data Centres are essentially local caches that run all validation and rate limiting operations locally instead of against a remote controller that could cause latency.

API transaction (request/response) logs, also known as analytics logs, are created in the Gateway handling the transaction. These are stored temporarily in the local Redis before being transferred to persistent storage in the Management cluster (via the MDCB) and optionally to an external data sink (via a Hybrid Pump).

The persistent storage in the Management Cluster also stores the master record for API definitions and policies.


![image](https://user-images.githubusercontent.com/99968932/209181027-49b6d2c6-bdfc-4d37-afcd-9b0d6559133c.png)  
*Table content needs to be confirmed and then added properly in markdown*

### Operation of the Gateway in the Worker Clusters
When an API request comes into a Tyk Gateway deployed in a Worker Cluster, the following actions occur:
1. Request arrives
2. Auth header and API identified
3. Local cache (Redis) is checked for the token; if it doesn’t exist, the Gateway will attempt to copy the token through the MDCB
4. If the token is found in the Management Redis, it is copied to the local cache (Redis) and used
5. If it is found in the local cache, no remote call is made and rate limiting and validation happen on the worker copy

![MDCB_request_flow](https://user-images.githubusercontent.com/99968932/209180948-9ec8a416-e985-4340-88c2-8265b3ee0bc2.png)  
*Diagram needs to be confirmed and then converted to Tyk style*

### Operation of MDCB in response to a change in the master data record

<Note> Prior to MDCB 2.0, these resources were not proactively sent from the Management Cluster out to the Worker Clusters, instead they were pulled through only when the new client made an API request. This reduced MDCB traffic, but could lead to problems if there was a communication issue between the Worker and Management clusters at the time of that first API request.
The MDCB Synchroniser introduced in MDCB 2.0 avoids this risk by proactively synchronising changes in the master record out to the relevant Worker Clusters. </Note>

#### API definition, policy or key change
When a new API is created or an API policy is updated in the Management Cluster, this needs to be propagated out to the impacted Worker Clusters.  
When there is a Create/Update/Delete event for an API definition or policy in the master record then MDCB sends a `reload` signal to all Gateways with the relevant `group_id`s. On receipt of this signal, each Gateway will synchronise all API definitions and policies with the master record. It will then refresh its router, in case of any change to the APIs (e.g. changed `listen_path` or new proxies).

<Note> Note that the reload signal is sent to all the Worker Clusters that belong to the same Organisation as the API or API policy that triggered the event, even if they do not have a value set in the `group_id` config; please refer to [Tyk Gateway Configuration Options](https://tyk.io/docs/tyk-oss-gateway/configuration/#slave_optionsgroup_id) for more details.  </Note>

#### API key, certificate, OAuth client change
When a new API key is created for a new API client, this needs to be propagated out to thre impacted Worker Clusters so that they can handle requests from that new client.  
When there is a Create/Update/Delete event for an API key, certificate or OAuth client in the master record then MDCB emits a signal to the relevant Worker Clusters. This signal indicates the type (`apikey`, `oauthClient`, `Certificate`) and unique `resource_id` of the object that has changed. One gateway in each Worker Cluster will pull the updated object to the local Redis via the MDCB link. The other Gateways in the cluster will automatically access this updated object from the Redis when required.

### Operation of MDCB when a Gateway is newly deployed in a Worker Cluster
When a Tyk Gateway is deployed into a Worker Cluster, it will connect to the MDCB and local Redis.  
The MDCB will ensure that the following are automatically synchronised from the Management Cluster out to the Worker so that it can handle API requests:
 - API definitions
 - Policy definitions
 
From MDCB v2.0 onwards, when used with a compatible Tyk Gateway (v4.1 onwards), a feature called the MDCB Synchroniser will also proactively push the following out to the new Gateway:
 - API Keys
 - Certificates
 - OAuth2.0 Clients
 
The advantage of the MDCB Synchroniser is that it enables Gateways to handle first-time requests from clients even if the MDCB link has subsequently failed. For more information about how to configure this feature, see the [MDCB keys synchroniser configuration options](https://tyk.io/docs/tyk-multi-data-centre/mdcb-configuration-options/#sync_worker_config).

<Note>Cached versions do not get synchronised back to the Management Cluster, so we advise setting a short TTL to ensure the local data in the Worker Cluster is regularly refreshed.</Note>
