---
date: 2024-06-21T12:59:42Z
title: Custom Plugins
description: "This section explains everything you need to know about plugins. This page gives plugins overview and provides links to the appropriate documentation."
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behaviour of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client. 

These plugins can execute at different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}). Tyk supports a variety of different [plugin types]({{< ref "plugins/plugin-types/plugintypes" >}}) that developers can implement to enrich the behaviour of requests and/or responses for their APIs. Subsequently, plugins can be used to enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, loggin and monitoring etc.

---

## Supported Languages

Tyk Gateway offers language flexibility with support for a variety of languages for plugin development:

- [Go]({{< ref "" >}}) plugins are classed as *native* plugins, since they are implemented in the same language as Tyk Gateway.  
- [gRPC]({{< ref "" >}}) plugins are executed remotely on a gRPC server. Tyk Gateway supports plugin development for any gRPC supported language.
- [Javascript JVSM]({{< ref "/plugins/supported-languages/javascript-middleware" >}}) plugins are executed a JavaScript Virtual Machine (JSVM) that is ECMAScript5 compatible.
- [Python]({{< ref "/plugins/supported-languages/rich-plugins/python/python" >}}) plugins are embedded within the same process as Tyk Gateway.

Check the [supported-languages]({{< ref "plugins/supported-languages" >}}) page for specific details.

---

## How It Works

The diagram below illustrates a high level architectural overview for how Tyk Gateway interacts with plugins.

       +--------------+       +----------------+       +--------------+
       |              |       |                |       |              |
       |    Client    +<----->+      Tyk       +<----->+    Upstream  |
       |              |       |  API Gateway   |       |              |
       +--------------+       |                |       +--------------+
                              +--------+-------+
                                       ^
                                       v
                              +----------------+
                              |   Plugin(s)    |
                              +----------------+
                              |                |
                              |  (e.g., Auth,  |
                              | Transformation)|
                              +----------------+

This illustrates the following workflow:

- The client sends a request to an API served by Tyk Gateway.
- Tyk processes the request and forwards it to one or more plugins configured for that API.
- A plugin performs operations (e.g., custom authentication, data transformation).
- The processed request is then returned to Tyk Gateway, which forwards it upstream.
- Finally, the upstream response is sent back to the client.

---

## Plugin Types

Tyk allows different [plugin types]({{< ref "/plugins/plugin-types/plugintypes" >}}) to be executed in the **following order**  within the [API Request Lifecycle]({{< ref "/concepts/middleware-execution-order" >}}):

1. [Pre (Request) Plugin]({{< ref "/plugins/plugin-types/request-plugins" >}})
2. [Authentication Plugin]({{< ref "/plugins/plugin-types/auth-plugins/auth-plugins" >}})
3. [Post-Auth (Request) Plugin]({{< ref "/plugins/plugin-types/request-plugins" >}})
4. [Post (Request) Plugin]({{< ref "/plugins/plugin-types/request-plugins" >}})
5. [Response Plugin]({{< ref "/plugins/plugin-types/response-plugins" >}})
6. [Analytics Plugin]({{< ref "/plugins/plugin-types/analytics-plugins" >}})

Many plugins can be implemented for each plugin type, e.g one or more pre-request plugins can be developed.

## Deployment

Plugins for an API are deployed as source code with an accompanying configuration file, *manifest.json*. This deployment artefact can be deployed:

- **Locally**: Source code and configuration is located in the Tyk Gateway file system. The configuration references the source code file for each type of plugin. 
- **Remotely**: Source code and configuration is bundled into a zip file and uploaded to an external remote web server. Tyk Gateway then downloads, caches, extracts and executes plugin bundles from this web server for your organisation's APIs. In this scenario the plugins for an API are configured with the name of the zip file bundle that should be downloaded from the remote web server. Please consult [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}).

---

## Gateway Configuration

Plugins are enabled within the *coprocess_options* section of the Gateway configuration file, *tyk.conf*:

```json
{
    "coprocess_options": {
        "enable_coprocess": true
    }
}
```

Please consult our supporting documentation for further details relating to configuring plugins for [Javascript (JVSM)]({{< ref "plugins/supported-languages/javascript-middleware#enabling-the-javascript-virtual-machine-jsvm" >}}) and [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin#configure-tyk-gateway" >}}) plugins.

### Webserver (optional)

Optionally, Tyk Gateway can be [configured]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) with the base URL of the webserver that it should use to download plugins from.

---

## API Configuration

So far we have seen that an API can have one or more plugins that are triggered to run at various phase of the API request lifecycle. We have also seen that the plugins associated with an API can be deployed locally on the Gateway's file system or downloaded and executed from a remote webserver.

This section explains how to configure plugins for your API endpoints on the local Gateway or remotely from an external secured web server.

### Local

An API can be configured so that one or more of its associated plugins can execute at different phases of the request life cycle. The configuration serves to identify the plugin source file and the name of the corresponding functions that are triggered at each request lifecycle stage.

#### Tyk Classic APIs

In Tyk Classic APIs, the *custom_middleware* section of the Tyk Classic API Definition is where you configure plugins that will run at different points during the lifecycle of an API request.

The table below illustrates the Tyk OAS API configuration parameters that correspond to each phase of the API request lifecycle:

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Occurs before main request processing. | pre    |            
| Auth  | Custom authentication can be handled during this phase. | auth_check |  
| Post Auth | Occurs after key authentication | post_key_auth |
| Post | Occurs after the main request processing but bfore the response is sent. | post |       
| Response | Occurs after the main request processing but before the response is sent. | response |   

The example configuration below illustrates how to set up multiple plugins for different phases of the request lifecycle:

```json
{
    "custom_middleware": {
        "pre": [
            {
                "name": "PreHook1",
                "path": "/path/to/plugin1.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "auth_check": {
            "name": "AuthCheck",
            "path": "/path/to/plugin.so",
            "disabled": false,
            "require_session": false,
            "raw_body_only": false
        },
        "post_key_auth": [
            {
                "name": "PostKeyAuth",
                "path": "/path/to/plugin.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "post": [
            {
                "name": "PostHook1",
                "path": "/path/to/plugin1.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            },
            {
                "name": "PostHook2",
                "path": "/path/to/plugin2.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "response": [
            {
                "name": "ResponseHook",
                "path": "/path/to/plugin.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "driver": "goplugin"
    }
}
```

From the above example it can be seen that each plugin is configured with the specific function name and associated source file path of the file that contains the function. Furthermore, each lifecycle phase can have a list of plugins configured, allowing for complex processing workflows. For example, you might develop one plugin for logging and another for modifying the request in the pre request phase.

The *driver* configuration parameter describes the plugin implementation language. Please refer to the [supported languages]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}) section for list of supported plugin driver names.

Each plugin can have additional settings, such as:
- *disabled*: When true, disables the plugin.
- *raw_body_only*: When true, indicates that only the raw body should be processed.
- *require_session*: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.

#### Tyk OAS APIs

The table below illustrates the Tyk OAS API configuration parameters that correspond to each phase of the API request lifecycle:

<!-- TODO Where are custom auth plugins developed -->

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Occurs before main request processing. | prePlugins |            
| Post Auth | Occurs after key authentication | postAuthenticationPlugins |
| Post | Occurs after the main request processing but bfore the response is sent. | postplugin |       
| Response | Occurs after the main request processing but before the response is sent. | responsePlugins |      
    
The example configuration below illustrates how to set up multiple plugins for different phases of the request lifecycle:

```json
{
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "667962397f6de50001508ac4",
      "id": "b4d8ac6e5a274d7c7959d069b47dc206",
      "orgId": "6672f4377f6de50001508abf",
      "name": "OAS APIs Plugins",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "pluginConfig": {
          "driver": "goplugin"
        },
        "postAuthenticationPlugins": [
          {
            "enabled": true,
            "functionName": "post_authentication_func",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ],
        "postPlugins": [
          {
            "enabled": true,
            "functionName": "postplugin",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ],
        "prePlugins": [
          {
            "enabled": true,
            "functionName": "pre-plugin",
            "path": "/path/to/plugin1.so"
          }
        ],
        "responsePlugins": [
          {
            "enabled": true,
            "functionName": "Response",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ]
      }
    }
  }
}
```

We can see from the example above that the middleware section of the *x-tyk-api-gateway* configuration is used to configure plugins in a Tyk OAS API. The *pluginConfig* section contains the *driver* parameter that is used to configure the plugin implementation [language]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}).

Each plugin can have additional settings, such as:
- *enabled*: When true, enables the plugin.
- *rawBodyOnly*: When true, indicates that only the raw body should be processed.
- *requireSession*: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.


### Remote

For API plugins that are deployed as plugin bundles, the API should be configured with the name of the plugin bundle file to download from your remote web server.

#### Tyk Classic APIs

The configuration for an API to fetch the download of a plugin bundle from a remote server is encapsulated wihin the *custom_middleware_bundle* field of the Tyk Classic API Definition. An illustrative example is listed below:

```yaml
{
  "name": "Tyk Classic Bundle API",
  ...
  "custom_middleware_bundle": "bundle-latest.zip"
}
```

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for a further details.

#### Tyk OAS APIs

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

Please consult the [plugin bundles]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) documentation for a further details.

---

## Plugin Caveats

- They must run as a single process.
- To apply a custom plugin to an API you must modify the API definition and add the plugin information to one of the areas of the API Request Lifecycle mentioned above.
- They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.

## Whats Next?

Get started with your first custom plugin using our [tutorial]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).
