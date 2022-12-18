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

### Other Languages

Tyk supports the use of the following plugins to extend Tyk functionality:

*   [Python, Lua, gRPC (Rich Plugins)]({{< ref "plugins/supported-languages/rich-plugins" >}})
*   [JavaScript Plugins]({{< ref "plugins/supported-languages/javascript-middleware" >}}) (JSVM Middleware)
*   [Golang native plugins]({{< ref "plugins/supported-languages/golang" >}})