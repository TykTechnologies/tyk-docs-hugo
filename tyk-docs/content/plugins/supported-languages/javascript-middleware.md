---
title: JavaScript Middleware
tags:
    - JavaScript
    - JS
    - middleware
    - scripting
    - JSVM
    - plugins
    - virtual endpoint
    - JSVM
    - JavaScript Virtual Machine
    - dynamic event handler
description: Using JavaScript with Tyk
date: "2017-03-24T14:45:20Z"
aliases:
    - /customise-tyk/plugins/javascript-middleware/
    - /customise-tyk/plugins/javascript-middleware/middleware-execution-order/
    - /plugins/javascript-middleware
    - /plugins/supported-languages/javascript-middleware/
    - /plugins/supported-languages/javascript-middleware/
    - /plugins/supported-languages/javascript-middleware/install-middleware/install-middleware
    - /plugins/javascript-middleware/install-middleware
---

There are three middleware components that can be scripted with Tyk:

1. **Custom JavaScript plugins**: These execute either *pre* or *post* validation. A *pre* middleware component will execute before any session validation or token validation has taken place, while a *post* middleware component will execute after the request has been passed through all checks and is ready to be proxied upstream.

2. **Dynamic event handlers**: These components fire on certain API events (see the event handlers section), these are fired Async and do not have a cooldown timer. These are documented [here]({{< ref "/product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-oas#set-up-a-webhook-event-handler-in-the-tyk-oas-api-definition" >}}).

3. **Virtual endpoints**: These are powerful programmable middleware invoked towards the end of the request processing chain. Unlike the custom JavaScript plugins, the virtual endpoint terminates the request. These are documented [here]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}).

The JavaScript (JS) [scripting guide]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}}) provides details of how to access dynamic data (such as the key session object) from your JS functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

### Declared plugin functions

JavaScript functions are available globally in the same namespace. So, if you include two or more JSVM plugins that call the same function, the last declared plugin implementation of the function will be returned.

## Enabling the JavaScript Virtual Machine (JSVM)

The JavaScript Virtual Machine (JSVM) provided in the Gateway is a traditional ECMAScript5 compatible environment.

Before you can use JavaScript customization in any component you will need to enable the JSVM.

You do this by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}).

## Installing JavaScript middleware

Installing middleware is different for different Tyk deployments, for example, in Tyk OSS it is possible to directly specify a path to a file in the API Definition, while in Tyk Self-Managed, we recommend using a directory-based loader.

We've provided the following guides:

- [Tyk OSS]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-ce" >}})
- [Tyk Self-Managed]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-pro" >}})
- [Tyk Hybrid]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-hybrid" >}})

{{< note success >}}
**Note**

Tyk Cloud Classic does not support custom middleware.
{{< /note >}}
