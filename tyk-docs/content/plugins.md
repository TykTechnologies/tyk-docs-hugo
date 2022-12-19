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

Plugins can be executed inside the following areas of the API Request Lifecycle:

*   [Authentication Plugins]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}})
*   [Request Plugins]({{< ref "plugins/plugin-types/request-plugins" >}})
*   [Response Plugins]({{< ref "plugins/plugin-types/response-plugins" >}})

### Plugin Caveats

*   They must run as a single process.
*   The plugins used *must* be specified in an API definition and are not global across APIs.
*   They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.

### Language Support

Tyk recommends using Go plugins for performance, flexibility, and nativity reasons (All Tyk components are written in Go).

The following languages are supported for custom plugins:
*   [Python, Lua, gRPC (Rich Plugins)]({{< ref "plugins/supported-languages/rich-plugins" >}})
*   [JavaScript Plugins]({{< ref "plugins/supported-languages/javascript-middleware" >}}) (JSVM Middleware)
*   [Golang native plugins]({{< ref "plugins/supported-languages/golang" >}})