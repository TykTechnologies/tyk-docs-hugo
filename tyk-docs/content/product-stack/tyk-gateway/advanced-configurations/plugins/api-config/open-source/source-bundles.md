---
date: 2024-06-25T12:59:42Z
title: Bundle Configuration
description: "This section explains how to configure APIs to use plugin bundles deployed on a remote web server"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

For API plugins that are deployed as plugin bundles, the API should be configured with the name of the plugin bundle file to download from your remote web server.

---

## Tyk Classic APIs

The configuration for an API to fetch the download of a plugin bundle from a remote server is encapsulated wihin the *custom_middleware_bundle* field of the Tyk Classic API Definition. An illustrative example is listed below:

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

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for further details.

---

## Tyk OAS APIs

The configuration for an API to fetch the download of a plugin bundle from a remote web server is encapsulated within the *middleware* configuration section of the *x-tyk-api-gateway* part of a Tyk OAS API Definition. An illustrative example is listed below:

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

In the example above we can see that the *pluginConfig* section contains a *bundle* JSON entity that contains the following configuration parameters:

- **enabled**: When `true`, enables the plugin.
- **path**: The relative path of the zip file in relation to the base URL configured on the remote webserver that hosts plugin bundles.

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for further details.
