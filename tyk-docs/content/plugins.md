---
date: 2024-06-21T12:59:42Z
title: Developing Plugins
description: "This section explains everything you need to know about developing your own plugins. This page gives an overview of plugins and provides links to the appropriate documentation."
tags: ["Plugins", "API Gateway middleware", "Custom middleware"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behavior of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client.  These plugins can execute at different stages of the [API request / response lifecycle]({{< ref "/concepts/middleware-execution-order" >}}).

Tyk supports a variety of different [plugin types]({{< ref "plugins/plugin-types/plugintypes" >}}) that developers can implement to enrich the behavior of requests and/or responses for their APIs. Subsequently, plugins can be used to enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

--- 

## Supported Languages

A variety of languages are supported for plugin development:

- [Go]({{< ref "/plugins/supported-languages/golang" >}}) plugins are classed as *native* plugins, since they are implemented in the same language as Tyk Gateway.  
- [gRPC]({{< ref "/plugins/supported-languages/rich-plugins/grpc" >}}) plugins are executed remotely on a gRPC server. Tyk Gateway supports plugin development for any gRPC supported language.
- [Javascript JVSM]({{< ref "/plugins/supported-languages/javascript-middleware" >}}) plugins are executed within a JavaScript Virtual Machine (JSVM) that is ECMAScript5 compatible.
- [Python]({{< ref "/plugins/supported-languages/rich-plugins/python/python" >}}) plugins are embedded within the same process as Tyk Gateway.

Check the [supported-languages]({{< ref "/plugins/supported-languages" >}}) page for further details.

---

## How It Works

The diagram below illustrates a high level architectural overview for how Tyk Gateway interacts with plugins.

{{< img src="/img/plugins/plugins_overview.svg" width="500px" alt="plugins overview" >}}

From the above illustration it can be seen that:

- The client sends a request to an API served by Tyk Gateway.
- Tyk processes the request and forwards it to one or more plugins implemented and configured for that API.
- A plugin performs operations (e.g., custom authentication, data transformation).
- The processed request is then returned to Tyk Gateway, which forwards it upstream.
- Finally, the upstream response is sent back to the client.

There are a variety of scenarios relating to the location of the plugin source code for an API and its associated configuration:

### Local Plugins

The plugin source code and associated configuration is co-located on Tyk Gateway's file system. The configuration is located within the API Definition. For further details please consult [API configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/overview" >}}).

### Plugin Bundles (Remote)

The plugin source code and associated configuration is bundled into a zip file and uploaded to a remote webserver. These types of plugins are termed *plugin bundles*. Tyk Gateway will download, extract, cache and execute plugin bundles from the remote webserver for each of the configured phases of the API request / response lifecycle. For further details on plugin bundles and how to configure them, please refer to the [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) page.

### gRPC Plugins (Remote)

It is possible to integrate Tyk Gateway with a gRPC server. Develop your gRPC server, using your preferred language, to handle requests from Tyk Gateway for each of the configured phases of the API request / response lifecycle. In this scenario the plugin source code is located at the gRPC server for remote execution with the associated configuration located within the API Definition at Tyk Gateway. For further details please consult our [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}) documentation.

---

## Tyk Gateway Configuration

Tyk Gateway must be configured to enable plugins. Plugins are enabled within the *coprocess_options* section of the Gateway configuration file, *tyk.conf*:

```json
{
    "coprocess_options": {
        "enable_coprocess": true
    }
}
```

Optionally, Tyk Gateway can also be configured with the URL of the webserver that it should download plugin bundles from. For further details please consult the [Gateway configuration]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#gateway-configuration" >}}) section of the plugin bundles page.

Please consult our supporting documentation for further details relating to configuring Tyk Gateway for [Javascript]({{< ref "plugins/supported-languages/javascript-middleware#enabling-the-javascript-virtual-machine-jsvm" >}}) plugins and [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin#configure-tyk-gateway" >}}) plugins.

---

## Plugin Caveats

- Tyk Gateway manages plugins for each API within the same process.
- For [gRPC plugins]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}), Tyk Gateway can only be configured to integrate with one gRPC server.
- Javascript plugins only allow Pre and Post Request hooks of the API Request Lifecycle.

---

## Supporting Resources

- Get started with developing first Go plugin using our [tutorial]({{< ref "/plugins/tutorials/quick-starts/go/quickstart" >}}).
- Browse our [supported languages]({{< ref "/plugins/supported-languages" >}}) section for language specific tutorials.
- Browse our [plugins hub]({{< ref "/plugins/plugin-hub" >}}) for resources that showcase how to develop plugins.

  