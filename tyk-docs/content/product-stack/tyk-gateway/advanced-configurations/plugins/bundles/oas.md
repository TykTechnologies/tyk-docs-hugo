---
date: 2024-08-20T12:59:42Z
title: Tyk OAS API Plugin Bundle Configuration
description: "This section explains how to configure Tyk OAS APIs to use plugin bundles"
tags: [ "Tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request", "Tyk OAS API" ]
---

For API plugins that are deployed as [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}), the API should be configured with the name of the plugin bundle file to download from your remote web server. Furthermore, the Gateway should be [configured]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles#gateway-configuration" >}}) to enable downloading plugin bundles.

You can configure your API with the name of the plugin bundle file to download within the Tyk OAS API definition or API Designer.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/classic" >}}) page.

## Configuring Plugin Bundles in the Tyk OAS API Definition

The configuration for a Tyk OAS API to fetch the download of a plugin bundle from a remote web server is encapsulated within the `pluginConfig` section within the `middleware.global` section of the `x-tyk-api-gateway` part of a Tyk OAS API Definition.

The `pluginConfig` section is structured as follows:

- `bundle`: A JSON entity that contains the following configuration parameters:
  - `enabled`: When `true`, enables the plugin.
  - `path`: The relative path of the zip file in relation to the base URL configured on the remote webserver that hosts plugin bundles.
- `driver`: Indicates the type of plugin, e.g. `golang`, `grpc`, `lua`, `otto` or `python`.

An illustrative example is listed below:

```json{hl_lines=["37-45"], linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-oas-plugin-configuration",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "put": {
                "operationId": "anythingput",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-oas-plugin-configuration",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-oas-plugin-configuration/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
              "pluginConfig": {
                "bundle": {
                  "enabled": true,
                  "path": "plugin.zip"
                },
                "driver": "goplugin"
              }
            } 
        }
    }
}
```

In this example we can see that bundle plugin has been configured within the `middleware.global.pluginConfig.bundle` object. The plugin is enabled and bundled within file `plugin.zip`. The plugin bundle is a Go plugin, i.e. `middleware.global.pluginConfig.driver` has been configured with value `goplugin`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out custom plugin bundles, assuming that you have provided a valid bundle file named `plugin.zip`.

## Configuring Plugin Bundles in the API Designer

To configure plugin bundles for Tyk OAS APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the editor screen. Subsequently, follow the steps below:

##### Step 1: Access plugin options

Scroll down until the *Enable Plugin* section is displayed.

{{< img src="/img/plugins/plugins_oas_api_bundles_config.png" alt="Tyk OAS API Bundle section" >}}

##### Step 2: Enable plugin bundle for you API

Enable a plugin bundle for your API by activating the toggle switch. 

##### Step 3: Enter relative path to plugin bundle file

Enter the relative path of the plugin bundle file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server that hosts your plugin bundles.

##### Step 4: Save the API

Select **Save API** to apply the changes to your API.