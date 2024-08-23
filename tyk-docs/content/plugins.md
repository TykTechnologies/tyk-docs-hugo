---
date: 2024-06-21T12:59:42Z
title: Developing Plugins
description: "This section explains everything you need to know about developing your own plugins. This page gives an overview of plugins and provides links to the appropriate documentation."
tags: ["Plugins", "API Gateway middleware", "Custom middleware"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behaviour of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client. 

These plugins can execute at different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}). Tyk supports a variety of different [plugin types]({{< ref "plugins/plugin-types/plugintypes" >}}) that developers can implement to enrich the behavior of requests and/or responses for their APIs. Subsequently, plugins can be used to enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

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

{{< img src="/img/plugins/plugins_overview.svg" width="500px" alt="plugins overview" >}}

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

Please consult our supporting documentation for further details relating to configuring [Javascript]({{< ref "plugins/supported-languages/javascript-middleware#enabling-the-javascript-virtual-machine-jsvm" >}}) plugins and [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin#configure-tyk-gateway" >}}) plugins.

#### Webserver (optional)

Optionally, Tyk Gateway can be [configured]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) with the base URL of the webserver that it should use to download plugins from.

### API

Here we want to link to the API configuration and plugin bundles

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

  