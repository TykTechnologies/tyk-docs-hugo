---
date: 2024-06-21T12:59:42Z
title: Custom Plugins
description: "This section explains everything you need to know about plugins. This page gives plugins overview and provides links to the appropriate documentation."
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
aliases:
    - /customise-tyk/plugins/
---

Plugins provide a powerful and flexible way to extend Tyk’s API Gateway capabilities. They allow API developers to write custom middleware, in various programming languages, that can modify the behaviour of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client. 

These plugins can execute at different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}). Tyk supports a variety of different [plugin types]({{< ref "plugins/plugin-types/plugintypes" >}}) that developers can implement to enrich the behaviour of requests and/or responses for their APIs. Subsequently, plugins offer language flexibility and can be used to enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, authentication etc.

## Use Cases

- **Custom Authentication**: Implement unique authentication mechanisms using external identity providers.
- **Data Transformation**: Modify request and response payloads on the fly to match specific formats required by your backend services.
- **Logging and Monitoring**: Integrate with custom logging and monitoring solutions to capture detailed API usage metrics.

## How It Works

1. **Request Handling**: An API request is received by Tyk.
2. **Coprocess Invocation**: Tyk invokes the coprocess plugin through gRPC.
3. **Processing**: The coprocess plugin performs the necessary operations (e.g., authentication, transformation) and sends the result back to Tyk.
4. **Response Handling**: Tyk processes the result and forwards the response to the client.

The diagram below illustrates a high level architectural overview for how Tyk interacts with plugins.

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

The diagram above illustrates the plugin flow as follows:

- The client sends a request to an API served by Tyk Gateway.
- Tyk processes the request and forwards it to one or more plugins.
- A plugin performs operations (e.g., custom authentication, data transformation).
- The processed request or response is then returned to Tyk Gateway, which forwards it upstream.
- Finally, the upstream response is sent back to the client.


## Supported Languages

Plugins can be implemented natively using GoLang and using the following languages:

- Javascript (JVSM)
- Python

Support for other languages is provided using a gRPC message passing mechanism with protobuf payloads.

These plugins are currently collectively termed, Rich Plugins and require a co-process with Tyk Gateway. Currently, Tyk Gateway supports only one co-process.

Check the [supported-languages]({{<ref "plugins/supported-languages">}}) page for specific details.


## Plugin Lifecycle

**This section will include an overview of plugins lifecycle and hook names for Tyk Classic and Tyk OAS**

Plugins can be executed in the **following order** inside the following areas of the [API Request Lifecycle]({{< ref "concepts/middleware-execution-order" >}}):

- [Pre (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Authentication Plugin]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}})
- [Post-Auth (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Post (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Response Plugin]({{< ref "plugins/plugin-types/response-plugins" >}})
- [Analytics Plugin]({{< ref "plugins/plugin-types/analytics-plugins" >}})

For further details see [here]({{< ref "/plugins/plugin-types/plugintypes" >}}).

<!-- 
TODO Table goes here to highlight these stages and the corresponding names for Tyk Classic 
and Tyk OAS
-->

## Configuration Concepts

This will give an overview of configuration process, specifically relating to:

- Configuring the Gateway for plugins.
- Configuring your APIs Plugins.

### Configuring Gateway

Tyk Gateway can be configured to enable coprocess in addition to bundling of plugins.

#### Coprocess

When using Rich Plugins Tyk Gateway needs to be configured with co-processing enabled in tyk.conf:

```json
{
    "enable_coprocess": true
}
```

Furthermore, Rich Plugins written using Javascript require an additional configuration parameter to be added to tyk.conf, enable_jvsm:


```json
{
    "enable_jvsm": true
}
```

#### Bundling

The concept of bundling is explained here and then linked to in the docs.

### Configuring APIs

Plugins can be configured to trigger at the following stages of the request lifecycle for your APIs. Each request lifecycle stage that a plugin can be triggered at is termed a plugin hook.

The configuration serves to identify the plugin source files and the names of the corresponding functions that are triggered at each request lifecycle stage. This concept is explained in the subsequent sections for Tyk Classic APIs and Tyk OAS APIs.

A plugin can be configured to execute from the local Gateway file server or from an external webserver. Furthermore, there are different configuration concepts depending on whether your API is Tyk Classic API or Tyk OAS API.

## Whats Next

Get started with your first custom plugin using our [tutorial]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

### Plugin Caveats

- They must run as a single process.
- To apply a custom plugin to an API you must modify the API definition and add the plugin information to one of the areas of the API Request Lifecycle mentioned above.
- They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.
