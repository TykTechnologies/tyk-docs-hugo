---
date: 2020-06-24T12:59:42Z
title: Custom Plugins
description: "This section explains everything you need to know about plugins. This page gives plugins overview and provides links to the appropriate documentation."
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
menu:
    main:
        parent: Tyk Gateway
weight: 80
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


## Plugin Lifecycle

This section will include an overview of plgins lifecycle and hook names for Tyk Classic and Tyk OAS

## Configuration

This will give an overview of configuration process, specifically relating to:

- Source file and manifest
- Bundling principle to allow Gateway to fetch plugin code from remote server. Applies to Rich plugin languages
and coprocss languages.

## Coprocess

When using Rich Plugins Tyk Gateway needs to be configured with co-processing enabled:

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

## Plugin Configuration

Plugins can be configured to trigger at the following stages of the request lifecycle. Each request lifecycle stage that a plugin can be triggered at is termed a plugin hook.

Plugins can be executed in the **following order** inside the following areas of the [API Request Lifecycle]({{< ref "concepts/middleware-execution-order" >}}):

- [Pre (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Authentication Plugin]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}})
- [Post-Auth (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Post (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
- [Response Plugin]({{< ref "plugins/plugin-types/response-plugins" >}})
- [Analytics Plugin]({{< ref "plugins/plugin-types/analytics-plugins" >}})
     

Since the documentation was initially produced there is also an Analytics Plugin, that can be used for example to modify analytics data before the Tyk Gateway send it for storage in Redis.

The configuration serves to identify the plugin source files and the names of the corresponding functions that are triggered at each request lifecycle stage. This concept is explained in the subsequent sections for Tyk Classic APIs and Tyk OAS APIs.


Tyk supports the use of custom plugins to extend Tyk functionality.


### Get Started
Get started with your first custom plugin using our [tutorial]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

### Plugin Caveats

*   They must run as a single process.
*   To apply a custom plugin to an API you must modify the API definition and add the plugin information to one of the areas of the API Request Lifecycle mentioned above.
*   They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.

### Language Support

You can write plugins in various languages. Check the [supported-languages]({{<ref "plugins/supported-languages">}}) page for specific details.