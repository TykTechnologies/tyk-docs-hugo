---
date: 2020-06-24T12:59:42Z
title: Custom Plugins
menu:
    main:
        parent: Tyk Gateway
weight: 80
aliases:
    - /customise-tyk/plugins/
---

Tyk supports the use of custom plugins to extend Tyk functionality.

Plugins can be executed in the **following order** inside the following areas of the [API Request Lifecycle]({{< ref "concepts/middleware-execution-order" >}}):

*   [Pre (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
*   [Authentication Plugin]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}})
*   [Post-Auth (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
*   [Post (Request) Plugin]({{< ref "plugins/plugin-types/request-plugins" >}})
*   [Response Plugin]({{< ref "plugins/plugin-types/response-plugins" >}})
*   [Analytics Plugin]({{< ref "plugins/plugin-types/analytics-plugins" >}})

### Get Started
Get started with your first custom plugin using our [tutorial]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

### Plugin Caveats

*   They must run as a single process.
*   To apply a custom plugin to an API you must modify the API definition and add the plugin information to one of the areas of the API Request Lifecycle mentioned above.
*   They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.

### Language Support

Tyk recommends using Go plugins for performance, flexibility, and nativity reasons (All Tyk components are written in Go).

The following languages are supported for custom plugins:
*   [Golang native plugins]({{< ref "plugins/supported-languages/golang" >}}) - fast, native performance
*   [JavaScript Plugins]({{< ref "plugins/supported-languages/javascript-middleware" >}}) (JSVM Middleware) - simple with limited direct API when performance not important (same with Python / Lua)
*   [Python, Lua, gRPC (Rich Plugins)]({{< ref "plugins/supported-languages/rich-plugins" >}}) - ultimate flexibility in the language of implementation, however, there are some performance and management overheads when compared to native GoLang plugins
