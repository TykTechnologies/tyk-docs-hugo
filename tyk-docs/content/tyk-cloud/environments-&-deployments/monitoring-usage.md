---
title: "Usage"
date: 2021-06-18
tags: ["Tyk Cloud", "Getting Started", "Monitoring"]
description: "How to quickly view your throughput and storage usage in your Tyk Cloud installation"
menu:
  main:
    parent: "Environments & Deployments"
weight: 0
aliases:
  - /tyk-cloud/environments-deployments/monitoring/
  - /tyk-cloud/environments-&-deployments/monitoring
---

### What is monitored?
Tyk Cloud keeps track of two metrics;     
(a) Throughput: This is the total amount of data that has been transfered(ingress/egress) through a deployment.     
(b) Storage: This is the total amount of data stored as [analytics by Tyk Dashboard]({{< ref "tyk-dashboard-analytics/" >}}). An example is per request statistics containing information about each request, like path or status.

### How to check metrics?
Login to Tyk Cloud and click on the _Monitoring_. Toggle on _Throughput_ to see throughput metrics

{{< img src="/img/cloud/tyk-cloud-monitoring-throughput.png" alt="Monitoring Throughput" >}}

Toggle on _Storage_ to see throughput metrics

{{< img src="/img/cloud/tyk-cloud-monitoring-storage.png" alt="Monitoring Storage" >}}

You can also optionally filter for metrics by date

{{< img src="/img/cloud/tyk-cloud-monitoring-filtering-by-date.png" alt="Monitoring Metric Filtering" >}}

And you can see the metrics broken down per environment & a list of the top 5 control and cloud data planes

{{< img src="/img/cloud/tyk-cloud-monitoring-break-down.png" alt="Monitoring Metric break down" >}}
