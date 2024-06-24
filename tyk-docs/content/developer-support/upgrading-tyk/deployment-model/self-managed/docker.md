---
title: "Upgrade Tyk on Docker"
date: 2024-05-13
tags: ["Upgrade Docker", "Docker"]
description: "Explains how to upgrade Tyk Self managed in Docker"
---

After reviewing guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**
Please note that upgrade order is as explained in the upgrade [overview]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/overview" >}})


## 1. Upgrade Tyk Dashboard
Upgrading *Tyk Dashboard* is the same as *Tyk Gateway* just with the name of the docker image of tyk dashboard
`tykio/tyk-dashboard`. Please check the instruction for Tyk Gateway in the next section.

## 2. Upgrade Tyk Gateway and Tyk Pump
Follow our [Tyk OSS guide]({{< ref "developer-support/upgrading-tyk/go-plugins" >}}) for upgrading Tyk Gateway and Tyk Pump