---
date: 2024-03-04
title: Golang plugins
menu:
  main:
    parent: "Supported Languages"
weight: 0
aliases:
  - /plugins/golang-plugins/golang-plugins/
  - /customise-tyk/plugins/golang-plugins/golang-plugins/
  - /plugins/supported-languages/golang/
---

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk by attaching custom logic written in Go to [hooks]({{< ref "plugins/plugin-types/plugintypes" >}}) in the Tyk [middleware chain]({{< ref "concepts/middleware-execution-order" >}}).
The chain of middleware is specific to an API and gets created at API load time. When Tyk Gateway performs an API re-load it also loads any custom middleware and "injects" them into a chain to be called at different stages of the HTTP request life cycle.

For a quick-start guide to working with Go plugins, start [here]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

The [Go plugin writing guide]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins" >}}) provides details of how to access dynamic data (such as the key session object) from your Go functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

## Supported plugin types

All of Tyk's [custom middleware hooks]({{< ref "plugins/plugin-types/plugintypes" >}}) support Go plugins. They represent different stages in the request and response [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) where custom functionality can be added.

- **Pre** - supports an array of middlewares to be run before any others (i.e. before authentication)
- **Auth** - this middleware performs custom authentication and adds API key session info into the request context and can be used only if the API definition has both:
  - `"use_keyless": false`
  - `"use_go_plugin_auth": true`
- **Post-Auth** - supports an array of middleware to be run after authentication; at this point, we have authenticated the session API key for the given key (in the request context) so we can perform any extra checks. This can be used only if the API definition has both:
  - `"use_keyless": false`
  - an authentication method specified
- **Post** - supports an array of middlewares to be run at the very end of the middleware chain; at this point Tyk is about to request a round-trip to the upstream target
- **Response** - run only at the point the response has returned from a service upstream of the API Gateway; note that the [method signature for Response Go plugins]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#creating-a-custom-response-plugin" >}}) is slightly different from the other hook types

{{< note info >}}
**Note**

The `use_keyless` and `use_go_plugin_auth` fields are populated automatically with the correct values if you add a plugin to the **Auth** or **Post-Auth** hooks when using the Tyk Dashboard.
{{< /note >}}

## Upgrading your Tyk Gateway

When upgrading your Tyk Gateway deployment, you need to re-compile your plugin with the new version. At the moment of loading a plugin, the Gateway will try to find a plugin with the name provided in the API definition. If none is found then it will fall back to search the plugin file with the name: `{plugin-name}_{Gw-version}_{OS}_{arch}.so`.

Since Tyk v4.1.0, the compiler [automatically]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler#output-filename" >}}) creates plugin files following this convention so when you upgrade, say from Tyk v5.2.5 to v5.3.0 you only need to have the plugins compiled for v5.3.0 before performing the upgrade.

This diagram shows how every Tyk Gateway will search and load the plugin binary that it is compatible with.
{{< img src="/img/plugins/go-plugin-different-tyk-versions.png" alt="APIs Menu" >}}

## Using custom Go plugins with Tyk Cloud

The following supporting resources are provided for developing plugins on Tyk Cloud:

- [Enabling Plugins On The Control Plane](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/setup-control-plane/#what-do-i-need-to-do-to-use-plugins)
- [Uploading Your Plugin Bundle To S3 Bucket](https://tyk.io/docs/tyk-cloud#uploading-your-bundle)
