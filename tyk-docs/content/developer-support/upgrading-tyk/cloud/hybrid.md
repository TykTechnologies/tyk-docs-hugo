---
title: "Upgrading Tyk On Hybrid SaaS"
date: 2024-02-6
tags: ["Upgrade Go Plugins", "Tyk plugins", "Hybrid", "Self Managed"]
description: "Explains how to upgrade Go Plugins on Self Managed (Hybrid)"
---

A Hybrid SaaS deployment is a shared responsibility model where Tyk is responsible for hosting the Control Plane while the client is responsible hosting their Data Plane, be it hosted on a public cloud provider or on their own infrastructure.

The Control Plane includes the following components:
- Tyk Dashboard
- MongoDB 
- Redis (Master Instance)
- Control Plane
- MDCB

The Data Plane includes the following components: 
- Hybrid Gateway(s) 
- Redis instance 
- Tyk Pump (optional)

After the guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}), follow the instructions below to upgrade your Tyk components and plugins.


## Strategy

Upgrade the Control Plane followed by your Data Plane.  When upgrading your Data Plane, upgrade your components in the following order:
1. Go Plugins (if applicable)
2. Hybrid Pump (if applicable)
3. Hybrid Gateway(s)

---

## 1. Upgrade your Control Plane

See Tyk Guide for how to [upgrade Control Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-control-planes#upgrade-control-planes" >}})

## 2. Upgrade your Go Plugins

Follow our guide for [deploying your custom Go plugins on Tyk Cloud]({{< ref "/developer-support/upgrading-tyk/cloud/deploy-go-plugins" >}})

---

## Upgrade Guide Video

Please refer to our [video](https://tyk-1.wistia.com/medias/4nf9fggatz) for further supporting with upgrading Tyk Self-Managed (RPM).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/4nf9fggatz" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>
