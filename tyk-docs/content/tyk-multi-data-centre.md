---
date: 2023-01-10
title: Tyk Multi Data Centre Bridge
weight: 15
menu:
    main:
        parent: "Tyk Stack"
aliases:
    - /tyk-configuration-reference/mdcb-configuration-options/
    - /getting-started/tyk-components/mdcb/
tags: ["MDCB", "distributed","setup""]
description: "overview of MDCB"
---

---
menu:
main:
parent: "Tyk Multi Data Centre Bridge"
weight: 2

---

## Introduction

Tyk’s Multi Data Centre Bridge (MDCB) is a separately licensed extension to the Tyk control plane that performs management and synchronisation of logically or geographically distributed clusters of Tyk API Gateways. We use it ourselves to support our Tyk Cloud offering.

## Challenges of managing APIs in a distributed environment

When your users are spread geographically and want to access your APIs from different parts of the world you can optimise the performance, value and utility of your APIs by deploying API Gateways in data centres local to them.

<img width="1920" alt="MDCB-Globe-Diagram1" src="https://user-images.githubusercontent.com/99968932/204763637-968d44cb-3479-4a5c-95e3-7ac0799e59e1.png">

Having localised gateways offers benefits to you and your users, such as:

- Reduced latency (roundtrip time) for users by accessing a local data centre
- Deployment close to backend services, reducing interconnect costs and latencies
- Increased availability across your estate - if one region goes offline the rest will continue to serve users
- Compliance with data residency and sovereignty regulations

<img width="1920" alt="MDCB-Globe-Diagram2" src="https://user-images.githubusercontent.com/99968932/204763702-1a5d5b2b-4a48-4c4c-bfc4-406d479f2112.png">

This distributed architecture, however, introduces challenges for you in terms of managing the configuration, synchronisation and resilience of the Gateways in each data centre.

- How do you configure each of the Tyk API Gateways to ensure that a user can access only their authorised APIs, but from any location?
- How can you ensure that the correct APIs are deployed to the right Gateways - and kept current as they are updated?

As the complexity of your architecture increases, this maintenance becomes an increasingly difficult and expensive manual task.

This is where Tyk’s Multi Data Centre Bridge (MDCB) comes in.

## How does Tyk Multi Data Centre Bridge help manage your APIs in a distributed environment?

The Tyk MDCB makes it possible to manage federated global deployments easily, from a central Dashboard: you can confidently deploy a multi-data centre, geographically isolated set of Tyk Gateway clusters for maximum redundancy, failover, latency optimisation, and uptime.

Combining Tyk Dashboard with MDCB, you are provided with a “single pane of glass” or control plane that allows you to centrally manage multiple Tyk Gateway clusters. This has many advantages over having separate gateways and corresponding dashboard/portals, which would require manual synchronisation to roll out any changes (e.g. new APIs) across all the individual gateways. 

By deploying MDCB, API Management with Tyk becomes a service that can be easily offered to multiple teams from a centralised location.

{{< img src="https://user-images.githubusercontent.com/99968932/204763793-864ecb8e-879a-4e63-83b3-f0a26f09d97e.png" alt="Tyk Open Source API Gateway Multi-Data Center Deployment" >}}

## How does MDCB work?

MDCB acts as a broker between the Tyk Gateway instances that you deploy in data centres around the world. A single Controller (management) Gateway is used as reference: you configure APIs, keys and quotas in one central location; MDCB looks after the propagation of these to the Worker (edge) Gateways, ensuring the  synchronisation of changes.

MDCB is extremely flexible, supporting clusters of Tyk Gateways within or across data centres - so for example two clusters within the same data centre could run different configurations of APIs, users etc.

MDCB keeps your Tyk API Gateways highly available because all the Worker Gateways, where your users access your APIs, can be configured and run independently. If the control plane link back to the Controller Gateway goes down, the Workers will continue to service API requests; when the link is back up, MDCB will automatically refresh the Workers with any changes they missed.

<img width="1920" alt="MDCB-Globe-Diagram4" src="https://user-images.githubusercontent.com/99968932/204763849-ef7c137a-8f94-4bdb-b82b-70509671cb39.png">

What happens if the worst happens and Worker Gateways fail while the link to the controller data centre is down? We’ve thought of that: Tyk will automatically configure the new Workers that spin up using the last known set of API resources in the worker’s cluster, minimising the impact on availability of your services.

## When might you deploy MDCB?

### Managing geographically distributed gateways to minimise latency and protect data sovereignty

Consider Acme Global Bank: they have customers in the USA and the EU. Due to compliance, security and performance requirements they need to deploy their Tyk API Gateways locally in each of those regions. They need to manage the deployment and synchronisation of APIs and associated resources (e.g. keys, policies and certificates) between the data centres to ensure global service for their customers.

![MDCB-Acme-Global-Bank-1](https://user-images.githubusercontent.com/99968932/204764094-856e7a6e-f3d7-41cf-81ec-4c68c2d5d063.png)

Tyk MDCB enables Acme Global Bank to power this architecture by creating a primary (controller) data centre with all the Tyk components and secondary (worker) data centres that act as local caches to run validation and rate limiting operations to optimise latency and performance.

<img width="1080" alt="MDCB-Acme-Global-Bank-2" src="https://user-images.githubusercontent.com/99968932/204764012-0137e130-4aa3-4b64-8212-80504a5311d8.png">

### Managing a complex deployment of services with internal and externally facing APIs

Consider Acme Telecoms: they have a large nationally distributed workforce and complex self-hosted IT systems; are using Tyk API Gateways to deploy internal and external APIs; and have different teams managing and consuming different sets of APIs across multiple sites. They need to ensure data segregation, availability, and access for internal and external users and partners.

{{<img src="https://user-images.githubusercontent.com/99968932/204764142-c20994eb-d8e8-4b17-aa22-04ebe1945aae.png" alt="MDCB-Acme-Telecoms-1" >}}

Combining Tyk’s built-in multi-tenancy capability with MDCB enables Acme Telecoms to set up dedicated logical gateways for different user groups and different physical gateways to guarantee data segregation, with a single management layer for operational simplicity.

<img width="1500" alt="MDCB-Acme-Telecoms-2" src="https://user-images.githubusercontent.com/99968932/204764170-69ffffc0-5d04-4523-8a2f-b23f4cc5b27f.png">

## There are many reasons why MDCB may be just what you need!

Beyond the two usage scenarios described here, there are many others where MDCB will provide you with the power and flexibility you need to manage your own particular situation.

Here are some examples of the benefits that deploying Tyk MDCB can bring:

### Flexible architecture

- You can control geographic distribution of traffic, restricting traffic to data centres/regions of your choice.
- You can put your Tyk API Gateways close to users, but still have a single management layer.
- You have a single, simple, point of access for configuration of your complex API infrastructure and yet deploy multiple Developer Portals, if required, to provide access to different user groups (e.g. Internal and External).
- You can physically [segment teams and environments]({{< ref "/advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud.md" >}}) within a single data centre, giving each team full control of its own cluster and server resources without the noisy neighbours you might experience in a standard self-managed deployment.
- You can deploy gateways with whichever mix of cloud vendors you wish.
- You can mix and match cloud and on premises data centres.

### Improved resiliency, security and uptime

- Each Worker Gateway operates autonomously using a locally stored copy of the API resources it needs.
- The Controller Gateway maintains synchronisation of these configurations across your Tyk deployment via the MDCB backbone link.
- If the Controller Gateway or MDCB backbone fails, the Workers will continue to handle API requests, rejecting only new authorisation tokens created on other Gateways. When connectivity is restored, the Worker Gateways will hot-reload to fetch any updated configurations (e.g. new authorisation tokens) from the Controller Gateway.
- If a Worker Gateway fails, this does not impact the operation of the others: when it comes back online, if it is unable to contact the Controller Gateway, it will retrieve the “last good” configuration held locally.
- The MDCB backbone runs on a resilient compressed RPC channel that is designed to handle ongoing and unreliable connectivity; all traffic on the backbone is encrypted and so safer to use over the open internet or inter-data centre links.
- Improved data security through separation of traffic into completely separate clusters within your network.

### Reduced latency

- Deploying Worker Gateways close to your geographically distributed API consumers helps reduce their perceived request latency.
- Deploying Worker Gateways close to your backend services will minimise round trip time servicing API requests.
- The Worker Gateways cache keys and other configuration locally, so all operations can be geographically localised.
- All traffic to and from one Gateway cluster will have rate limiting, authentication and authorisation performed within the data centre rather than “calling home” to a central control point; this reduces the  API request round trip time.

### Improved Infrastructure Management

- Due to the shared control plane, all Worker Gateways report into a single Tyk Dashboard. This provides a simple, consistent place to manage your APIM deployment.
- This allows a shared infra team to offer API management and API Gateways as a service, globally, across multiple clouds and on-premises regions, from a single pane of glass.

### Next Steps

- [The components of an MDCB deployment]({{< ref "/mdcb-components.md" >}})
- [Run an MDCB Proof of Concept]({{< ref "/mdcb-example-minimising-latency.md" >}})
- [Advanced MDCB]({{< ref "/tyk-stack/tyk-multi-data-centre/advanced-mdcb/advanced-mdcb.md" >}})
- [MDCB reference guide]({{< ref "/tyk-multi-data-centre/mdcb-configuration-options.md" >}})

