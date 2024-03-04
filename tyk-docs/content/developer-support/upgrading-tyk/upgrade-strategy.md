---
title: "Upgrading Strategy"
date: 2024-03-1
tags: ["Upgrade Strategy" ]
description: "Explains rolling and blue-green upgrade strategies"
---

Tyk is compatible with rolling or blue-green upgrade strategies.

## Rolling Upgrade
Rather than updating all servers simultaneously, the organisation will install the updated software package on one server or subset of servers at a time. A rolling deployment helps reduce application downtime and prevent unforeseen consequences or errors in software updates.


For this strategy, it is important to have redundancy by deploying two instances of each Tyk component that needs upgrading. A load balancer should be used to distribute traffic for the Dashboard and Gateway components, ensuring seamless availability during the upgrade process. Pump, however, operates with one-way traffic and doesn't require load balancing.

Ensure the load balancer directs traffic to one instance while the other is undergoing an upgrade process. Then, switch the traffic to the upgraded instance while the other is being upgraded. Once both instances have been successfully upgraded, the load balancer can route traffic to both instances simultaneously.

## Blue-Green Upgrade
In a typical blue-green deployment, there are two identical production environments, labelled blue and green. At any given time, only one of these environments is live and serving traffic, while the other environment is inactive. For example, if the blue environment is live, the green environment will be inactive, and vice versa.

For this strategy, you will need to replicate the entire environment onto a separate environment. The load balancer or DNS will route traffic to the green environment which is the current production environment while the blue environment will go through the upgrade process. A VM snapshot is a good way to replicate the environment but you may use other methods such as a new deployment process or the blue environment. If the latter is your choice, you may skip this manual and follow the deployment instructions on our documentation - https://tyk.io/docs
