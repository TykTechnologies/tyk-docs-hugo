---
date: 2024-06-25T12:59:42Z
title: Source Files Configuration On Tyk Dashboard
description: "This section explains ehow to configure APIs for plugins deployed on the Gateway file system using Tyk Dashboard"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

This section explains how to configure Plugins for an API using Tyk Dashboard. It specifically covers the use case where the source files of your plugins are deployed on the Tyk Gateway file system. 

---

## Tyk Classic APIs

To configure plugins for Tyk Classic APIs, click on the APIs item in the *API Management* menu of Dashboard and select your API to display the API editor screen.

{{< img src="/img/plugins/plugins_classic_api_source_config.png" alt="Plugins Classic API screen" >}}

Click on the *View Raw Definition* button to display a config editor for editing the Tyk Classic Api Definition. Scroll down until the *Plugin Options* section is displayed.

{{< img src="/img/plugins/plugins_classic_api_definition_editor.png" alt="Plugins Classic API Definition editor screen" >}}

Enter the relative path of the plugin zip file in the *Plugin ID* field that Tyk Gateway should download from the web server hosting plugin bundles.

{{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Plugins Classic API Bundle Field" >}}

---

## Tyk OAS APIs 

Click on the APIs menu item in the *API Management* menu of Dashboard and select your OAS API to display the OAS API editor screen.

Scroll down until the *Plugins Configuraion* section is displayed with the option to configure a plugin driver and a list of plugin types, e.g. *Pre Plugin*, *Post Plugin* etc. 

{{< img src="/img/plugins/plugins_oas_api_driver_options.png" alt="OAS API Plugins Driver Config" >}}

Select the implementation language of your plugins.

For each type of plugin to configure, click on the *Add Plugin* button to display a plugin configuration section:

{{< img src="/img/plugins/plugins_oas_api_source_config.png" alt="OAS Plugins Config Section" >}}

Complete the following fields:

- **Function Name**: Enter the function name that implements the required behaviour for your plugin.
- **Path**: Enter the path to the source file that contains the function that implements your plugin.
- **Raw Body Only**: Optionally, toggle the *Raw Body Only* switch to true when you do not wish to fill body in request or response object for your plugins.

---
