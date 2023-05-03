---
date: 2023-01-09
title: Licensing and deployment models
tags: ["Tyk Stack", "Self-Managed", "Installation", "Licensing"]
description: "Licensing and deployment models for Tyk Self-Managed"
linkTitle: Licensing and deployment models 
identifier: "tyk-on-premises-licensing"
weight: 1
menu: 
    main:
        parent: Tyk Self-Managed
aliases:
  - getting-started/licensing/
---


Tyk Self-Managed is the easiest way to install Tyk Full Lifecycle API Management solution in your infrastructure. There is no calling home, and there are no usage limits. You have full control. 

When selecting a Tyk Self-managed license [(see the pricing page to compare the licenses)](https://tyk.io/price-comparison), you can choose between three deployment models: [Launch]({{< ref "licensing.md#launch---perfect-to-get-started" >}}), [Flex]({{< ref "licensing.md#flex---for-multiple-teams-within-a-single-data-centre-or-cloud" >}}) and [Global Multi-team]({{< ref "licensing.md#global-multi-team---for-the-largest-global-enterprises-at-scale" >}}). Read below to learn which model fits best for your scenario. 

Are you still figuring out your requirements for your deployment around performance, resilience, availability, latency, or multi-region deployment? Look at our [API management architectural and deployment patterns 101](https://tyk.io/blog/res-api-management-architectural-and-deployment-patterns-101/) post to learn more. 

## 3 questions to ask yourself to select your deployment model

### 1. How many environments do you manage?

An environment is a single grouping of a control plane and multiple gateways, representing your development lifecycle. For example, staging and production would be 2 environments. 

If you have teams working on two different projects, deployed in different environments, you might have 4 different environments (staging and prod for project number 1, staging and prod for project number 2). Or, you can leverage multi-tenancy with RBAC to onboard multiple teams onto the same environment to be more cost effective. You can read more about that scenario in the blog post [How to manage multiple teams with Tyk Self-Managed](https://tyk.io/blog/easy-api-management-with-tyk-self-managed/).

You get extra developer licenses (a single control plane with 1 connected gateway for local testing on a developer's workstation) for development and testing on local computers. 

### 2. How many gateways do you need per environment?

We recommend a minimum of 2 gateways per environment for redundancy & fail over. Rolling updates or blue green deployment might require additional gateways to ensure high availability during deployments.

You might also need more depending on your average load or to handle seasonal peak traffic. See [Planning for Production]({{< ref "planning-for-production.md" >}}) to learn more. 

### 3. Are you deploying your software stack in multiple regions or datacenter?

Do you need support for centrally managing your APIs while deploying edge gateways into multiple regions or datacenter? Do you want to ensure [data sovereignty](https://tyk.io/blog/strategies-for-dealing-with-data-sovereignty-at-scale/) in each of the regions you are deploying your APIs?

## Launch - perfect to get started

✅ For single teams just getting started

{{< img src="/img/diagrams/tyk-selfmanaged-launch.png" alt="Tyk Self-managed Launch">}}

## Flex - for multiple teams within a single data centre or cloud 

✅ For multiple teams that require high availability and horizontal scaling <br/>
✅ For Kubernetes-based deployment within one cluster / region 

{{< img src="/img/diagrams/tyk-selfmanaged-flex.png" alt="Tyk Self-managed Flex">}}

## Global Multi-team - for the largest global enterprises at scale

✅ For managing your APIs centrally while deploying edge gateways in independent clusters / regions <br />
✅ For the highest availability across data centers <br />
✅ For Kubernetes-based deployment in multiple cluster / multiple regions <br />
✅ For larger organisations [with multiple teams]({{< ref "tyk-multi-data-centre.md" >}}) and [data sovereignty](https://tyk.io/blog/strategies-for-dealing-with-data-sovereignty-at-scale/) requirements <br />

The license starts with 3 environments and 2 regions, can be extended to more environments and regions as needed.

{{< img src="/img/diagrams/tyk-selfmanaged-multiteam.png" alt="Tyk Self-managed Global Multi-team">}}


##  Don't see what you need?

[Contact us](https://tyk.io/contact/) to discuss custom or enterprise deployments.
