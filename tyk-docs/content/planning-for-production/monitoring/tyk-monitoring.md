---
date: 2017-03-24T10:10:41Z
title: Monitoring
tags: ["Monitoring", "Observability", "SLO", "infrastructure"]
description: "How to set up monitoring and observability of your API kingdom"
weight: 1
menu:
  main:
    parent: "Planning for Production"
url: "/planning-for-production/monitoring"
---


# What is API Infrastructure Monitoring?

Infrastructure monitoring is the process of tracking and collecting system health, error counts and types, hardware resource data from our IT infrastructure (servers, virtual machines, containers, databases and other backend components) and other processes. 

The infrastructure and engineering team can take advantage of real-time quantitative data by using monitoring tools to help identify trends, set alerts when a system is broken, determine the root cause of the problem and mitigate the issue. 

There are two main questions that your monitoring system should address: _what’s broken (symptom)_, and _why (cause)_? Successful monitoring and alerting systems should identify areas to scale, backend issues that impact users, and drive value across the organisation to improve business performance.


### Why monitor your infrastructure?



* **Troubleshoot performance issues**→ Determine which hosts, containers, or other backend components are failing or experiencing latency issues during an incident.
    * Engineers have the data to determine which instance or backend service is responsible for an outage.
    * This helps cross-functional teams resolve support tickets and address customer-facing issues.
* **Optimise & Plan Infrastructure sizing**→ Statistics and data is used to lower infrastructure costs.
    * For example, balance your infrastructure usage by directing requests from under provisioned hosts to overprovisioned hosts.
    * Size appropriately - Know if you’re over provisioned resources given your consumption to cut costs
* **Global Health Insight**→ Have a global insight into the overall health of your systems so you are notified about them instantly, before your end users, in order to react quickly.


### In API Management, Monitoring falls under three main categories:



#### 1. API Management Components Health

This is not different from the health of your APIs and would generally flow into the same dashboards, but we’re going to break this up to focus on the Tyk components.

Please [go here](/docs/planning-for-production/monitoring/tyk-components/) to read about this.


#### 2. Infrastructure sizing & scaling

Though the Tyk Gateway is the [most performant Gateway][0] in the market, you want to avoid over/underprovisioning the hardware based on your traffic requirements.

Infrastructure sizing, benchmarks, and scaling are covered under [this section][1].


#### 3. API Health, SLOs, and Monitoring:

Which metrics to monitor, how to retrieve them, which tools to use for dashboarding and when to alert?

Please read about this in more detail [here][2].


[0]: https://tyk.io/performance-benchmarks/
[1]: /docs/planning-for-production/benchmarks/
[2]: https://tyk.io/blog/service-level-objectives-for-your-apis-with-tyk-prometheus-and-grafana/