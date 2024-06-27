---
date: 2024-06-25T12:59:42Z
title: Bundle Configuration On Tyk Dashboard
description: "This section explains ehow to configure APIs to use plugin bundles deployed on a remote web server"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

This section explains how to use Tyk Dashboard to configure your API to download a [plugin bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) from a secured web server managed by your organisation.

---

## Tyk Classic APIs

To configure plugin bundles for Tyk Classic APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the API editor screen.

Click on the *Advanced Options* tab and scroll down until the *Plugin Options* section is displayed.

{{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Tyk Classic Plugin Options section" >}}

Enter the relative path of the plugin zip file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server hosting plugin bundles.

---

## Tyk OAS APIs 

To configure plugin bundles for Tyk OAS APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your OAS API to display the OAS API editor screen.

Scroll down until the *Enable Plugin* section is displayed.

{{< img src="/img/plugins/plugins_oas_api_bundles_config.png" alt="Tyk OAS API Bundle section" >}}

Enable a plugin bundle for your API by activating the toggle switch. Subsequently, enter the relative path of the plugin zip file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server that hosts your plugin bundles.

---
