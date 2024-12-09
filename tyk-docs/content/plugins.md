---
date: 2024-06-21T12:59:42Z
title: Developing Plugins
description: "This section explains everything you need to know about developing your own plugins. This page gives an overview of plugins and provides links to the appropriate documentation."
tags: ["Plugins", "API Gateway middleware", "Custom middleware"]
aliases:
    - /customise-tyk/plugins/
---

Plugins can be used to customize and enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

When Tyk receives an API request, it works through a [chain]({{< ref "middleware-execution-order" >}}) of processing *middleware* that is configured using the API definition. There are a large number of built-in middleware in the processing chain that are dedicated to performing [client authentication]({{< ref "/api-management/authentication-authorization" >}}), [request transformation]({{< ref "advanced-configuration/transform-traffic" >}}), [caching]({{< ref "basic-config-and-security/reduce-latency/caching" >}}) and many other processes before proxying the request to the upstream.

Tyk's custom plugin facility provides a powerful and flexible way to extend the middleware chain. It allows API developers to write custom middleware, in various programming languages, that can perform additional processing of requests and responses.

For example, a custom authentication scheme can be implemented and executed on API requests, custom plugins can be used to provide integration with external services and databases, or additional processing can be performed on the response returned from the upstream.

There are several different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}) where custom plugins can be attached (or *hooked*) into the middleware chain allowing significant customization to meet your specific requirements.

Custom plugins are usually referred to by the location where they can be *hooked* into the middleware processing chain as follows:

1. [Pre (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
2. [Authentication]({{< ref "/plugins/plugin-types/auth-plugins/auth-plugins" >}})
3. [Post-Auth (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
4. [Post (Request)]({{< ref "/plugins/plugin-types/request-plugins" >}})
5. [Response]({{< ref "/plugins/plugin-types/response-plugins" >}})
6. [Analytics (Response)]({{< ref "/plugins/plugin-types/analytics-plugins" >}})


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

The plugin source code and associated configuration are bundled into a zip file and uploaded to a remote webserver. Multiple plugins can be stored in a single *plugin bundle*. Tyk Gateway will download the plugin bundle from the remote webserver and then extract, cache and execute plugins for each of the configured phases of the API request / response lifecycle. For further details on plugin bundles and how to configure them, please refer to the [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) page.

#### gRPC Plugins (Remote)

Custom plugins can be hosted on a remote server and executed from the Tyk Gateway middleware chain via gRPC. These plugins can be written in any language you prefer, as they are executed on the gRPC server. You'll configure your API definition so that Tyk Gateway will send requests to your gRPC server at the appropriate points in the API request / response lifecycle. For further details please consult our [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}) documentation.

### Tyk Gateway Configuration

#### Coprocess Plugins

In the context of Tyk, *coprocess* plugins refer to external plugins that run alongside the main Tyk Gateway process. These plugins allow for custom logic to be executed within the API lifecycle without modifying the core gateway. Essentially, *coprocess* plugins act as independent services that communicate with Tyk via APIs, enabling the integration of custom functionality written in various languages such as Python, or any other supported gRPC language.

To enable these coprocess plugins, Tyk Gateway needs to be configured accordingly. This is done in the `tyk.conf` file under the `coprocess_options` section, where the option `enable_coprocess` must be set to `true`:

```json
{
    "coprocess_options": {
        "enable_coprocess": true
    }
}
```

#### Plugin Bundles

If you're using [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#gateway-configuration" >}}) you'll need to configure Tyk Gateway with the URL of the webserver from which it should download the plugin bundles.

#### Javascript and gRPC Plugins

Please consult the supporting documentation for further details on configuring Tyk Gateway when using [Javascript]({{< ref "plugins/supported-languages/javascript-middleware#enabling-the-javascript-virtual-machine-jsvm" >}}) or [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin#configure-tyk-gateway" >}}) plugins.

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

  