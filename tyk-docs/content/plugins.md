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

Plugins for an API are deployed as source code with an accompanying configuration file, *manifest.json*. This deployment artefact can be deployed:

- **Locally**: The source code and *manifest.json* file is located in the Tyk Gateway file system. The configuration references the source code file path and function name for each type of plugin. Consult the [plugin source code file configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-files" >}}) to learn how to configure plugins for [Tyk Classic APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-files#tyk-classic-apis" >}}) and [Tyk OAS APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-files#tyk-oas-apis" >}})
- **Remotely**: The source code and *manifrst.json* is [bundled]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) into a zip file and uploaded to an external remote web server. Tyk Gateway then downloads, caches, extracts and executes plugins in the bundle that was downloaded from this web server for your organisation's APIs. In this scenario the plugins for an API are configured with the name of the zip file bundle that should be downloaded from the remote web server. The zip file contains the plugin source code and *manifest.json* file. Please consult [bundle configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-bundles" >}}) to learn how to configure plugins for [Tyk Classic APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-bundles#tyk-classic-apis" >}}) and [Tyk OAS APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/source-bundles#tyk-oas-apis" >}}).


## API Configuration

So far we have seen that an API can have one or more plugins that are triggered to run at various phase of the API request lifecycle. We have also seen that the plugins associated with an API can be deployed locally on the Gateway's file system or downloaded and executed from a remote webserver.

This section explains how to configure plugins for your API endpoints on the local Gateway or remotely from an external secured web server.
