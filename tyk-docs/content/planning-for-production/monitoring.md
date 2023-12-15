---
date: 2017-03-24T10:10:41Z
title: Observability & Monitoring
tags: ["Monitoring", "Observability", "SLO", "infrastructure"]
description: "How to set up monitoring and observability of your API kingdom"
weight: 1
menu:
  main:
    parent: "Planning for Production"
---


## What is API Infrastructure Monitoring?

Infrastructure monitoring is the process of tracking and collecting system health, error counts and types, hardware resource data from our IT infrastructure (servers, virtual machines, containers, databases and other backend components) and other processes. 

The infrastructure and engineering team can take advantage of real-time quantitative data by using monitoring tools to help identify trends, set alerts when a system breaks, determine the root cause of the problem and mitigate the issue. 

The two main questions that your monitoring system should address: _what’s broken (symptom)_, and _why (cause)_? Successful monitoring and alerting systems should identify areas to scale, backend issues that impact users, and drive value across the organisation to improve business performance.


### Why is it important?


* **Global Health Insight**→ Have a global insight into the overall health and instant notifications of issues, before your end users.
* **Troubleshoot performance issues**→ Determine which hosts, containers, or other backend components are failing or experiencing latency issues during an incident.
    * Engineers have the data to determine which instance or backend service caused an outage.
    * This helps cross-functional teams resolve support tickets and address customer-facing issues.
* **Optimise & Plan Infrastructure sizing**→ Statistics and data is used to lower infrastructure costs.
    * For example, balance your infrastructure usage by directing requests from under provisioned hosts to overprovisioned hosts.
    * Size appropriately - Know if you’re over provisioned resources given your consumption to cut costs


### In API Management, Monitoring falls under three main categories:



#### 1. API Monitoring

Monitoring encompasses the deep insight into the health of individual components.  Monitoring encompasses health statistics and instrumentations of servers as well as the software itself, APIs and Tyk components.

Please [click here]({{< ref "/content/planning-for-production/monitoring/tyk-components.md" >}}) to read more about Tyk component monitoring and how to set it up.


#### 2. Infrastructure sizing & scaling

Though the Tyk Gateway is the [most performant Gateway][0] in the market, you want to avoid over/underprovisioning the hardware based on your traffic requirements.

Infrastructure sizing, benchmarks, and scaling will be explained in [this section]({{< ref "/content/planning-for-production/benchmarks.md" >}}).


#### 3. API Observability

API Observability is the practice of monitoring holistic health of your APIs.  
- Are you APIs behaving as intended? 
- Are you committed to your SLOs?
- Which metrics to monitor, how to retrieve them, which tools to use for dashboarding and when to alert?

Please read about this in more detail [here][2].


[0]: https://tyk.io/performance-benchmarks/
[2]: https://tyk.io/blog/service-level-objectives-for-your-apis-with-tyk-prometheus-and-grafana/
