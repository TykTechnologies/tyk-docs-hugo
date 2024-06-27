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

Click on the *View Raw Definition* button to display an editor for the Tyk Classic API Definition.

{{< img src="/img/plugins/plugins_classic_api_definition_editor.png" alt="Plugins Classic API Definition editor screen" >}}

Use the editor to edit the *custom_middleware* section of the [Tyk Classic API Definition]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-files#tyk-classic-apis" >}}) and click the *Update* button to save your changes.

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
