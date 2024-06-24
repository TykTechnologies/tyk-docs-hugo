---
title: "Tyk Self-Managed Upgrade Guide"
date: 2024-06-17
tags: ["Upgrade Tyk self managed", "upgrading"]
description: "Overview page for upgrading Tyk Self-Managed in various installation types"
---

This section includes upgrade guides for Tyk Self-Managed.

## Preparations
Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [upgrade guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}).
Once you have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this
specified order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

## Upgrade order
In a production environment, where we recommend installing the Dashboard, Gateway, and Pump on separate machines, you
should always upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

## Upgrading
We provide upgrade guides for Linux, Docker, Helm and K8S. To continue the upgrade process, please go to the relevant
installation under this section.