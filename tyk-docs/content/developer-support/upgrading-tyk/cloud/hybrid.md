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

## 2. Upgrade Go Plugins

Follow our guide for [deploying your custom Go plugins on Tyk Cloud]({{< ref "/developer-support/upgrading-tyk/cloud/deploy-go-plugins" >}}). Subsequently, follow the steps below according to the target upgrade version of the Gateway.


##### Gateway Versions < 4.1.0

1. Proceed with upgrading your [Tyk Data Plane Hybrid Gateways](#upgrading-data-plane-hybrid-gateways).

2. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgrade plugin.

3. Validate that your plugin is working per your expectations.

##### Gateway Versions >= 4.1.0

1. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgraded plugin.

2. Validate that your plugin is working per your expectations as at this stage, your Gateway will be running the plugin for your current version still.

  {{< note success >}}
  **Note**

  This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect.

  {{< / note>}}

3. Proceed with upgrading your [Tyk Data Plane Hybrid Gateways](#upgrading-data-plane-hybrid-gateways). Given that you loaded your target version plugin in step 1, this version will be loaded automatically once you upgrade.

4. Validate that your plugin is working per your expectations.

## 3. Upgrade your Tyk Data Plane Hybrid Gateway(s){#upgrading-data-plane-hybrid-gateways}

Follow the instructions for component deployment type:

- [Docker]({{< ref "/developer-support/upgrading-tyk/self-managed/docker" >}})
- [Helm]({{< ref "/developer-support/upgrading-tyk/self-managed/helm" >}})
- [Linux Debian]({{< ref "/developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb#upgrade-tyk-packages" >}})
- [Linux RHEL/CENTOS]({{< ref "/developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm#upgrade-tyk-packages" >}})

---

## Upgrade Guide Video

Please refer to our [video](https://tyk-1.wistia.com/medias/4nf9fggatz) for further supporting with upgrading Tyk Self-Managed (RPM).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/4nf9fggatz" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>
