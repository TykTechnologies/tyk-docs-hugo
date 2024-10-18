---
date: 2024-06-25T12:59:42Z
title: Tyk Classic API Configuring Plugin Bundles
description: "This section explains how to configure Tyk Classic APIs to use plugin bundles deployed on a remote web server"
tags: ["Tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request", "Tyk Classic API"]
---

For custom plugins that are deployed as [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}), the API should be configured with the name of the plugin bundle file to download from your remote web server. Furthermore, the Gateway should be [configured]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#gateway-configuration" >}}) to enable downloading plugin bundles.

You can configure your API with the name of the plugin bundle file to download within the Tyk Classic API definition or API Designer.

If you’re using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/oas" >}}) page.

## Configuring Plugin Bundles in the Tyk Classic API Definition

The configuration for an API to fetch and download a plugin bundle from a remote server is encapsulated within the `custom_middleware_bundle` field of the Tyk Classic API Definition. An illustrative example is listed below:

```json {hl_lines=["33"], linenos=true, linenostart=1}
{
  "name": "Tyk Classic Bundle API",
  "api_id": "1",
  "org_id": "default",
  "definition": {
    "location": "header",
    "key": "version"
  },
  "auth": {
    "auth_header_name": "authorization"
  },
  "use_keyless": true,
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "expires": "3000-01-02 15:04",
        "use_extended_paths": true,
        "extended_paths": {
          "ignored": [],
          "white_list": [],
          "black_list": []
        }
      }
    }
  },
  "proxy": {
    "listen_path": "/quickstart/",
    "target_url": "http://httpbin.org",
    "strip_listen_path": true
  },
  "custom_middleware_bundle": "bundle-latest.zip"
}
```

With the configuration given in the example above, calls to the API will invoke the custom plugins defined in the `manifest.json` file contained within `bundle-latest.zip` uploaded to your remote webserver, e.g. `http://your-example-plugin-server.com/plugins`.

Tyk Gateway should be configured for downloading plugin bundles from a secured web server. Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for further details.

---

## Configuring plugin bundles in the API Designer

To configure plugin bundles for Tyk Classic APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the API editor screen. Subsequently, follow the steps below:

##### Step 1: Access plugin options

Click on the *Advanced Options* tab and scroll down until the *Plugin Options* section is displayed.

{{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Tyk Classic Plugin Options section" >}}

##### Step 2: Enter relative path to bundle file

Enter the relative path of the plugin bundle file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server hosting plugin bundles.

##### Step 3: Save the API

Select the **save** or **update** button to apply the changes to your API.
