---
title: "Tyk Self-Managed Upgrade Guide"
date: 2024-06-17
tags: ["Upgrade Tyk self managed", "upgrading"]
description: "Overview page for upgrading Tyk Self-Managed in various installation types"
aliases:
    - developer-support/upgrading-tyk/deployment-model/self-managed/mdcb
---

This section includes upgrade guides for Tyk Self-Managed.

## Preparations
Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [upgrade guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}).
Once you have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this
specified order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

## Upgrade order
In a production environment where the Dashboard, Gateway, and Pump are installed on separate machines, you should always
upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump


### Upgrade order with Multi Data Centre Bridge (MDCB) {#upgrade-mdcb}
For Enterprise customers, the Tyk control plane contains all the standard components of a Self-Managed installation with
the addition of the [Multi Data Centre Bridge]({{< ref "tyk-multi-data-centre" >}}) (MDCB).

Our recommended sequence for upgrading a self-managed MDCB installation is as follows:

Stage #1: Upgrade the components of the **Tyk control plane** in this order:

1. MDCB
2. Tyk Pump (if applicable)
3. Tyk Dashboard
4. Tyk Gateway

Stage #2: Next, upgrade the components in **Tyk data planes**, in this order:

1. Go Plugins (if applicable)
2. Tyk Pump (if applicable)
3. Tyk Gateway

This sequence of control plane first and data plane second ensures:
1. Forward compatibility - ensures that we don't have [forward-compatibility](https://en.wikipedia.org/wiki/Forward_compatibility#:~:text=Forward%20compatibility%20for%20the%20older,format%20of%20the%20older%20system.)
issues of new Gateway using old MDCB.
2. Connectivity issues - It's extremely fast to see if there are connectivity issues and gateways (in Hybrid mode) will
continue to function even if disconnected from their control plane.

---

## Upgrade guides
We provide upgrade guides for Linux, Docker, Helm and K8S. To continue the upgrade process, please refer to the relevant
installation guide under this section.

---
