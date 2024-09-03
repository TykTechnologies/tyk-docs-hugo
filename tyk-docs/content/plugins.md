---
date: 2024-06-21T12:59:42Z
title: Developing Plugins
description: "This section explains everything you need to know about developing your own plugins. This page gives an overview of plugins and provides links to the appropriate documentation."
tags: ["Plugins", "API Gateway middleware", "Custom middleware"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behavior of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client.  These plugins can execute at different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}).

There are several different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}) where custom plugins can be attached (or *hooked*) into the middleware chain allowing significant customisation to meet your specific requirements.

Custom plugins are usually referred to by the location where they can be *hooked* into the middleware processing chain as follows:

1. [Pre (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
2. [Authentication]({{< ref "/plugins/plugin-types/auth-plugins/auth-plugins" >}})
3. [Post-Auth (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
4. [Post (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
5. [Response]({{< ref "/plugins/plugin-types/response-plugins" >}})
6. [Analytics (Response)]({{< ref "/plugins/plugin-types/analytics-plugins" >}})

Subsequently, plugins can be used to customize and enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

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

### Plugin Deployment

There are a variety of scenarios relating to the deployment of plugins for an API, concerning the location of the plugin source code and its associated configuration.

#### Local Plugins

The plugin source code and associated configuration are co-located with Tyk Gateway in the same file system. The configuration is located within the API Definition. For further details please consult [API configuration]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/overview" >}}).

#### Plugin Bundles (Remote)

The plugin source code and associated configuration is bundled into a zip file and uploaded to a remote webserver. These types of plugins are termed *plugin bundles*. Tyk Gateway will download, extract, cache and execute plugin bundles from the remote webserver for each of the configured phases of the API request / response lifecycle. For further details on plugin bundles and how to configure them, please refer to the [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) page.

#### gRPC Plugins (Remote)

It is possible to integrate Tyk Gateway with a gRPC server. Develop your gRPC server, using your preferred language, to handle requests from Tyk Gateway for each of the configured phases of the API request / response lifecycle. In this scenario the plugin source code is located at the gRPC server for remote execution with the associated configuration located within the API Definition at Tyk Gateway. For further details please consult our [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}) documentation.

### Tyk Gateway Configuration

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

  