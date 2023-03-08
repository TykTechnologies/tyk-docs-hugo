---
date: 2017-03-24T10:10:41Z
title: Tyk Components
tags: ["Monitoring", "Observability", "SLO", "infrastructure"]
description: "How to set up monitoring and observability of your API kingdom"
weight: 1
menu:
  main:
    parent: "Observability & Monitoring"
---



# Monitoring Tyk Components

A common question that gets asked is how to monitor the Tyk components.



## Tyk Gateway

The Gateway & Redis are the only components that will have a high on-demand performance requirement, which needs to scale with your API traffic.

### Tyk Gateway CPU Utilisation

Tyk Gateway is CPU bound. It will have better performance the more cores you throw at Tyk. Tyk will automatically spread itself across all available cores to handle traffic. Be sure to limit the cores in a Kubernetes deployment otherwise the Gateway will attempt to consume all cores in a node.

Performance benchmarks on how Tyk performs across different CPU architectures, environments and sizes [here](https://tyk.io/performance-benchmarks/).

A healthy and performant Tyk Gateway should have a CPU utilisation of under 60%. If the average CPU utilisation is above 60%, then we recommend you scale your Tyk Gateway services. A higher figure than 60% introduces risk, because if one Gateway fails, the traffic spillover to healthy nodes might be overwhelming and result in cascading failure.


### Liveness Health Check

Health checks are extremely important in determining the status of our Tyk Components. Depending on your setup and configuration, the statuses of the following components will be returned: **Gateway**, **Dashboard**, **Redis** and **RPC**. 

The health check endpoint is an expensive operation and can throttle throughput so it's important to find an optimal plan if you want to take advantage of this endpoint. The endpoint refreshes every 10 seconds and does not return statuses on the primary database (MongoDB or PostgreSQL) and the Tyk Pump component.


```console
curl -X GET "http://localhost:8080/hello"

{
   "status": "pass",
   "version": "4.2.3",
   "description": "Tyk GW",
   "details": {
       "dashboard": {
           "status": "pass",
           "componentType": "system",
           "time": "2022-11-21T20:03:44Z"
       },
       "redis": {
           "status": "pass",
           "componentType": "datastore",
           "time": "2022-11-21T20:03:44Z"
       },
       "rpc": {
           "status": "pass",
           "componentType": "system",
           "time": "2022-11-21T20:03:44Z"
       }
   }
}
```

For information around our health check endpoint, please visit our [Liveness Health Check]({{< ref "planning-for-production/ensure-high-availability/health-check" >}}) documentation.

## Tyk Dashboard & Tyk MDCB

These other Tyk components won’t see load proportional to your API requests.  However, the Dashboard (and MDCB on Global deployments) synchronise the Gateways and need to be given enough resources to manage this process.

The Tyk Dashboard liveness health check endpoint can be configured [here]({{< ref "tyk-dashboard/configuration/#health_check_endpoint_name" >}}). 

The Tyk MDCB liveness health check endpoint can be configured [here]({{< ref "tyk-multi-data-centre/setup-controller-data-centre/#health-check" >}}). 

Currently, Tyk Dashboard and MDCB liveness endpoints only report whether the service is operational. It is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Data store) or if they are offline.

## Tyk Pump

The Tyk Pump component offers a built-in Liveness Health Check endpoint [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#health-check" >}}). 

Currently, the receipt of an HTTP 200 OK response merely indicates that the Pump service is operational. However, it is important to note that the service may not yet be ready for use if it is unable to establish a connection with its dependent components (such as Redis and Data store) or if they are offline.

### Database Sizing

Based on the Tyk recommended approach for setting up your databases, our team has built tools that will help engineers better understand and plan their infrastructure around their use case:



* [Redis Sizing](https://tyk.io/docs/planning-for-production/redis-sizing/)
* [PostgreSQL Sizing](https://tyk.io/docs/planning-for-production/database-settings/postgresql/#postgresql-sizing)
* [MongoDB Sizing](https://tyk.io/docs/planning-for-production/database-settings/mongodb-sizing/)


### Database Monitoring

Monitoring guides from our partner:

**Redis**
1. [How to monitor Redis performance metrics](https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics/)
2. [How to collect Redis Metrics](https://www.datadoghq.com/blog/how-to-collect-redis-metrics/)
3. [Monitor Redis using Datadog](https://www.datadoghq.com/blog/monitor-redis-using-datadog/)


**Postgres**
1. [Key metrics for PostgreSQL monitoring](https://www.datadoghq.com/blog/postgresql-monitoring/)
2. [Collecting metrics with PostgreSQL monitoring tools](https://www.datadoghq.com/blog/postgresql-monitoring-tools/)
3. [How to collect and monitor PostgreSQL data with Datadog](https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog/)


**Mongo**

1. [Monitoring MongoDB performance metrics (WiredTiger)](https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger/)
2. [Collecting MongoDB metrics and statistics](https://www.datadoghq.com/blog/collecting-mongodb-metrics-and-statistics/)
3. [How to monitor MongoDB performance with Datadog](https://www.datadoghq.com/blog/monitor-mongodb-performance-with-datadog/)
