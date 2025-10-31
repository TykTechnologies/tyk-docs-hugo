---
title: "How monitoring works in Tyk Cloud"
tags: ["Monitoring", "Tyk Cloud", "Control Plane", "Data Plane"]
description: "Learn how Tyk Cloud monitors throughput and storage metrics for your deployments."
aliases:
  - /tyk-cloud/environments-&-deployments/monitoring
  - /tyk-cloud/environments-&-deployments/monitoring-usage
  - /tyk-cloud/environments-deployments/monitoring
  - /tyk-cloud/environments-deployments/monitoring-usage
---

### Tyk Cloud Monitor Metrics

This section explains the various metrics that are monitored by Tyk Cloud.

#### Tyk Cloud Throughput
Tyk Cloud counts the total request/response sizes for traffic transferred through a deployment. Throughput metrics are displayed for the current day. These are calculated as the difference between the throughput usage at the current time and the throughput at last midnight.

External traffic is subject to billing, while internal traffic is exempt. The monitoring service aggregates traffic between different services:

{{< img src="/img/cloud/tyk-cloud-monitoring-priced-traffic.png" alt="Monitoring Traffic Pricing" >}}

**Billed traffic**
 - Traffic between user → Control Plane
 - Traffic between user → Cloud Data Plane
 - Traffic between user → Enterprise Developer Portal
 - Traffic between user → Mserv (plugin upload)
 - Traffic between Control Plane → Cloud Data Plane cross region
 - Traffic between Cloud Data Plane → Mserv cross region
 - Traffic between Control Plane → Portal cross region

**Unbilled traffic**
 - Hybrid traffic is currently not counted
 - Traffic between Control Plane → Cloud Data Plane in the same region
 - Traffic between Cloud Data Plane → Mserv in the same region
 - Traffic between Control Plane → Portal in the same region

#### Tyk Cloud Storage
When a client makes a request to a Tyk Gateway deployment, the details of the request and response are captured and [stored in Redis]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}}). Tyk Pump processes the records from Redis and forwards them to MongoDB. Finally, Tyk Cloud reads that data from MongoDB and displays its size(bytes) in the _Storage_ section of _Monitoring_. 



### Track Usage

##### How to check metrics
Login to Tyk Cloud and click on *Monitoring* within the *Operations* menu. Enable *Throughput* to display throughput metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-throughput.png" alt="Monitoring Throughput" >}}

Enable *Storage* to display storage metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-storage.png" alt="Monitoring Storage" >}}

You can also optionally filter for metrics by date.

{{< img src="/img/cloud/tyk-cloud-monitoring-filtering-by-date.png" alt="Monitoring Metric Filtering" >}}

Here you can see the metrics broken down per environment and a list of the top 5 control and cloud data planes.

{{< img src="/img/cloud/tyk-cloud-monitoring-break-down.png" alt="Monitoring Metric break down" >}}

