---
title: "How it works"
date: 2024-04-25
tags: ["Tyk Cloud", "Monitoring"]
description: "Explains the metrics that are monitored"
menu:
  main:
    parent: "Environments & Deployments"
weight: 1
aliases:
  - /tyk-cloud/environments-deployments/monitoring/
  - /tyk-cloud/environments-&-deployments/monitoring
---

### Throughput metric.
Tyk Cloud keeps a counter of the total request/response sizes for traffic transferred through a deployment. We then calculate the difference between the throughput usage at the current time less the throughput at last midnight. That way, the throughput metrics that is displayed is the throughput for the current day.

External traffic is subject to billing, while internal traffic is exempt. The monitoring service aggregates traffic between different services:

### Billed traffic
 - Traffic between user → Control Plane
 - Traffic between user → Cloud Data Plane
 - Traffic between user → Enterprise Developer Portal
 - Traffic between user → Mserv (plugin upload)
 - Traffic between Control Plane → Cloud Data Plane cross region
 - Traffic between Cloud Data Plane → Mserv cross region
 - Traffic between Control Plane → Portal cross region

### Unbilled traffic
 - Hybrid traffic is currently not counted
 - Traffic between Control Plane → Cloud Data Plane in the same region
 - Traffic between Cloud Data Plane → Mserv in the same region
 - Traffic between Control Plane → Portal in the same region

{{< img src="/img/cloud/tyk-cloud-monitoring-priced-traffic.png" alt="Monitoring Traffic Pricing" >}}

### Storage metric.
When a client makes a request to a Tyk Gateway deployment, the details of the request and response are captured and [stored in Redis]({{< ref "tyk-dashboard-analytics/" >}}). Tyk Pump processes the records from Redis and forwards them to MongoDB. Finally, Tyk Cloud reads that data from MongoDB and displays it in the _Storage_ section of _Monitoring_. 
