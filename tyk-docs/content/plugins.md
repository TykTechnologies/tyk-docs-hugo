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

You can write plugins in various languages. Check the [supported-languages]({{<ref "plugins/supported-languages">}}) page for specific details.