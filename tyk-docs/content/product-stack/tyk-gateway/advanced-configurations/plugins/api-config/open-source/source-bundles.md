---
date: 2024-06-25T12:59:42Z
title: Bundle Configuration
description: "This section explains ehow to configure APIs to use plugin bundles deployed on a remote web server"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

For API plugins that are deployed as plugin bundles, the API should be configured with the name of the plugin bundle file to download from your remote web server.

---

## Tyk Classic APIs

The configuration for an API to fetch the download of a plugin bundle from a remote server is encapsulated wihin the *custom_middleware_bundle* field of the Tyk Classic API Definition. An illustrative example is listed below:

```yaml
{
  "name": "Tyk Classic Bundle API",
  ...
  "custom_middleware_bundle": "bundle-latest.zip"
}
```

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for further details.

---

## Tyk OAS APIs

The configuration for an API to fetch the download of a plugin bundle from a remote web server is encapsulated within the *middleware* configuration section of the *x-tyk-api-gateway* part of a Tyk OAS API Definition. An illustrative example is listed below:

```yaml
{
  ...
  "x-tyk-api-gateway": {
      "info": {
        "dbId": "667acea17f6de50001508aca",
        "id": "ff17f20282b44c2f6d646b35dd5a5ad6",
        "orgId": "6672f4377f6de50001508abf",
        "name": "API With Plugin Bundles",
        "state": {
          "active": true,
          "internal": false
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
      },
      "server": {
        "listenPath": {
          "strip": true,
          "value": "/api-with-plugin-bundle-config/"
        }
      },
      "upstream": {
        "url": "http://httpbin.org/"
      }
    }
}
```

In the example above we can see that the *pluginConfig* section contains a *bundle* JSON entity that contains the following configuration parameters:

- **enabled**: When `true`, enables the plugin.
- **path**: The relative path of the zip file in relation to the base URL configured on the remote webserver that hosts plugin bundles.

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for  further details.
