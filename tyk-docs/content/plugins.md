---
date: 2024-06-21T12:59:42Z
title: Custom Plugins
description: "This section explains everything you need to know about plugins. This page gives plugins overview and provides links to the appropriate documentation."
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
aliases:
    - /customise-tyk/plugins/
---

Plugins are custom middleware that can modify the behaviour of a request or response. For example, the body, headers and/or query parameters can be extended or modified before a request is sent upstream, or a response is returned from the client. 

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

<!-- 
TODO Table goes here to highlight these stages and the corresponding names for Tyk Classic 
and Tyk OAS
-->

## Configuration Concepts

This will give an overview of configuration process, specifically relating to:

- Configuring the Gateway for plugins.
- Configuring APIs for Plugins.

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

### Plugin Configuration

Plugins can be configured to trigger at the following stages of the request lifecycle for your APIs. Each request lifecycle stage that a plugin can be triggered at is termed a plugin hook.

The configuration serves to identify the plugin source files and the names of the corresponding functions that are triggered at each request lifecycle stage. This concept is explained in the subsequent sections for Tyk Classic APIs and Tyk OAS APIs.

A plugin can be configured to execute from the local Gateway file server or from an external webserver. Furthermore, there are different configuration concepts depending on whether your API is Tyk Classic API or Tyk OAS API.


## Whats Next

Get started with your first custom plugin using our [tutorial]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

### Plugin Caveats

- They must run as a single process.
- To apply a custom plugin to an API you must modify the API definition and add the plugin information to one of the areas of the API Request Lifecycle mentioned above.
- They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.
