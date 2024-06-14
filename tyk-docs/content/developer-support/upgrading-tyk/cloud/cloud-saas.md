---
title: "Upgrading Tyk On Cloud SaaS"
date: 2024-02-6
tags: ["Upgrade plugins", "Tyk plugins", "SaaS", "Cloud"]
description: "Explains how to upgrade Go Plugins on Cloud SaaS"
aliases:
  - /developer-support/cloud-saas/
---

After reviewing guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}), follow the instructions below to upgrade your Tyk components and plugins. 


## 1. Upgrade Control Plane

Follow our guide for [upgrading Cloud Control Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-control-planes#upgrade-control-planes" >}}).

## 2. Upgrade Go Plugins

Follow our guide for [deploying your custom Go plugins on Tyk Cloud]({{< ref "/developer-support/upgrading-tyk/cloud/deploy-go-plugins" >}}). Subsequently, follow the steps below according to the target upgrade version of the Gateway.

##### Gateway Versions < 4.1.0.

1. Proceed with [upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes)
2. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgrade plugin.
3. Validate that your plugin is working per your expectations.

##### Gateway Versions >= 4.1.0

1. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#per-api--local-parameters" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgraded plugin.

2. Validate that your plugin is working per your expectations as at this stage, your Gateway will be running the plugin for your current version still.

  {{< note success >}}
  **Note**

  This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect.

  {{< /note >}}

3. Proceed with [upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes). Given that you loaded your target version plugin in step 1, this version will be loaded automatically once you upgrade.

4. Validate that your plugin is working per your expectations, as the Gateway now should have loaded the plugin for the target version automatically.

## 3. Upgrade Cloud Data Plane {#upgrading-cloud-data-planes}

Follow our guide for [upgrading Cloud Data Planes]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways#upgrade-cloud-data-planes" >}}).

---

## Upgrade Guide Video

Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/t0oamm63ae) below for visual guidance:

<div>
<iframe src="https://fast.wistia.net/embed/iframe/t0oamm63ae" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>