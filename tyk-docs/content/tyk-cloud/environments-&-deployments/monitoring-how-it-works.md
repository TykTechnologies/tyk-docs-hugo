---
title: "What metrics are monitored?"
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

This section explains the various metrics that are monitored by Tyk Cloud.

## Throughput
Tyk Cloud counts the total request/response sizes for traffic transferred through a deployment. Throughput metrics are displayed for the current day. These are calculated as the difference between the throughput usage at the current time and the throughput at last midnight.

External traffic is subject to billing, while internal traffic is exempt. The monitoring service aggregates traffic between different services:

{{< img src="/img/cloud/tyk-cloud-monitoring-priced-traffic.png" alt="Monitoring Traffic Pricing" >}}

#### Billed traffic
 - Traffic between user → Control Plane
 - Traffic between user → Cloud Data Plane
 - Traffic between user → Enterprise Developer Portal
 - Traffic between user → Mserv (plugin upload)
 - Traffic between Control Plane → Cloud Data Plane cross region
 - Traffic between Cloud Data Plane → Mserv cross region
 - Traffic between Control Plane → Portal cross region

#### Unbilled traffic
 - Hybrid traffic is currently not counted
 - Traffic between Control Plane → Cloud Data Plane in the same region
 - Traffic between Cloud Data Plane → Mserv in the same region
 - Traffic between Control Plane → Portal in the same region

## Storage
When a client makes a request to a Tyk Gateway deployment, the details of the request and response are captured and [stored in Redis]({{< ref "tyk-dashboard-analytics/" >}}). Tyk Pump processes the records from Redis and forwards them to MongoDB. Finally, Tyk Cloud reads that data from MongoDB and displays its size(bytes) in the _Storage_ section of _Monitoring_. 
