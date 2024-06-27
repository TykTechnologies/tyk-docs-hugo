---
date: 2024-06-21T12:59:42Z
title: Custom Plugins
description: "This section explains everything you need to know about plugins. This page gives plugins overview and provides links to the appropriate documentation."
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behaviour of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client. 

These plugins can execute at different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}). Tyk supports a variety of different [plugin types]({{< ref "plugins/plugin-types/plugintypes" >}}) that developers can implement to enrich the behaviour of requests and/or responses for their APIs. Subsequently, plugins can be used to enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

---

## Supported Languages

Tyk Gateway offers language flexibility with support for a variety of languages for plugin development:

- [Go]({{< ref "/plugins/supported-languages/golang" >}}) plugins are classed as *native* plugins, since they are implemented in the same language as Tyk Gateway.  
- [gRPC]({{< ref "/plugins/supported-languages/rich-plugins/grpc" >}}) plugins are executed remotely on a gRPC server. Tyk Gateway supports plugin development for any gRPC supported language.
- [Javascript JVSM]({{< ref "/plugins/supported-languages/javascript-middleware" >}}) plugins are executed within a JavaScript Virtual Machine (JSVM) that is ECMAScript5 compatible.
- [Python]({{< ref "/plugins/supported-languages/rich-plugins/python/python" >}}) plugins are embedded within the same process as Tyk Gateway.

Check the [supported-languages]({{< ref "/plugins/supported-languages" >}}) page for further details.

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

From the above illustration it can be seen that:

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

## Plugins Configuration

Tyk Gateway must be configured to enable plugins. Furthermore each API should be configured to reference the plugin source code for each plugin type that has been developed.

### Gateway

Plugins are enabled within the *coprocess_options* section of the Gateway configuration file, *tyk.conf*:

```json
{
    "coprocess_options": {
        "enable_coprocess": true
    }
}
```

Please consult our supporting documentation for further details relating to configuring plugins for [Javascript (JVSM)]({{< ref "plugins/supported-languages/javascript-middleware#enabling-the-javascript-virtual-machine-jsvm" >}}) and [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin#configure-tyk-gateway" >}}) plugins.

#### Webserver (optional)

Optionally, Tyk Gateway can be [configured]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) with the base URL of the webserver that it should use to download plugins from.

### API

So far we have seen that an API can have one or more plugins that are triggered to run at various phases of the API request lifecycle. Plugins for an API are deployed as source code with an accompanying configuration file, *manifest.json*. This deployment artefact can be deployed:

- **Locally**: The source code is located at the Tyk Gateway file system. The Api Definition allows the source file path and function name to be configured for each type of plugin. Consult [plugin source code file configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-files" >}}) to learn how to configure plugins for [Tyk Classic APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-files#tyk-classic-apis" >}}) and [Tyk OAS APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-files#tyk-oas-apis" >}}).
- **Remotely**: The source code and a *manifest.json* is [bundled]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) into a zip file and uploaded to an external remote web server. The *manifest.json* file references the source code file path and the function name for each type of plugin. Tyk Gateway downloads, caches, extracts and executes plugins from the bundle that was downloaded from the configured web server for your organisation's APIs. In this scenario the plugins for an API are configured with the name of the zip file bundle that should be downloaded from the remote web server. Please consult [bundle configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-bundles" >}}) to learn how to configure plugins for [Tyk Classic APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-bundles#tyk-classic-apis/" >}}) and [Tyk OAS APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-bundles#tyk-oas-apis" >}}).

---

## Plugin Caveats

- They must run as a single process.
- They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.
- To apply a custom plugin to an API you must modify the API definition and configure the plugin for one of the phases of the API Request Lifecycle as mentioned above.
- Javascript plugins only support Pre and Post Request phases of the  API Request Lifecycle.

---

## Whats Next?

- Get started with your first Go custom plugin using our [tutorial]({{< ref "/plugins/tutorials/quick-starts/go/quickstart" >}}).
- Browse our [supported languages]({{< ref "/plugins/supported-languages" >}}) section for language specific tutorials.
- Browse our [plugins hub]({{< ref "/plugins/plugin-hub" >}}) for resources that showcase how to develop Tyk Plugins.

  