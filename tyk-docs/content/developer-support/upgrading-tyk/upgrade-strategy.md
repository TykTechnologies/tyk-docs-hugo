---
title: "Upgrading Strategy"
date: 2024-03-1
tags: ["Upgrade Strategy" ]
description: "Explains rolling and blue-green upgrade strategies"
---

Tyk is compatible with both rolling and blue-green upgrade strategies.

## Rolling Upgrade
A rolling upgrade updates servers incrementally rather than simultaneously. This approach helps reduce application downtime and mitigates the risk of unforeseen consequences or errors during software updates.

### Steps for Rolling Upgrade:
Redundancy: Ensure there are at least two instances of each Tyk component that needs upgrading.
Load Balancer: Use a load balancer to distribute traffic for the Dashboard and Gateway components, ensuring continuous availability during the upgrade process. Note that the Pump operates with one-way traffic and does not require load balancing.
Upgrade Process:
Direct traffic to one instance while upgrading the other.
Once the first instance is upgraded, switch traffic to it and upgrade the remaining instance.
After both instances are upgraded, configure the load balancer to route traffic to both instances simultaneously.

## Blue-Green Upgrade
A blue-green deployment involves two identical production environments, labeled blue and green. At any time, only one environment is live and serving traffic, while the other is inactive. For example, if the blue environment is live, the green environment will be inactive, and vice versa.

### Steps for Blue-Green Upgrade:
Replication: Replicate the entire environment into a separate environment.
Traffic Routing: Use a load balancer or DNS to route traffic to the green environment (current production) while the blue environment undergoes the upgrade.
Upgrade Process:
A VM snapshot is a recommended method for replication, but other methods such as a new deployment process can also be used.
If using a new deployment process, follow the [deployment instructions]({{< ref "getting-started/installation" >}}) appropriate for your platform.
Switch Environments: Once the upgrade is complete, switch the traffic to the upgraded environment.
