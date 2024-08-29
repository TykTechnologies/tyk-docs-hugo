---
date: 2024-08-28
title: Overview
description: "This section explains an overview for how to configure plugins for APIs"
tags: [ "plugins" ]
---

An API can be configured with plugins for the following [hooks]({{< ref "plugins/plugin-types/plugintypes#plugin-and-hook-types" >}}): Pre, Authentication, Post, Post Authentication and Response. Each plugin hook can have zero or more plugins configured.

There are three scenarios for configuring plugins for an API:

1. Plugins are implemented by a gRPC server with the associated configuration specified with the API definition. For further details, please refer to the [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}) section.
2. The plugin source code and configuration is bundled into a zip file that is served by a remote web server. For further details, checkout the [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) page.
3. Plugins are implemented by functions within source code files located on the Gateway's file system. The API Definition allows the source code file path and function name to be configured for each plugin. For further details read on.

## Plugin configuration

Each plugin for an API can be configured within the API Definition with the following details:

| Property | Description |
|-------|-------------|
| `Enabled` | When true, the plugin is activated |
| `Name` | A name used to identify the plugin |
| `Path` | The path to the source code file on the Tyk Gateway file system |
| `Function name` | The name of the function that implements the plugin. The function should exist within the source code file referenced in `path` |
| `Raw body only` | When set to true, this flag indicates that only the raw request body should be processed |
| `Require session state`| When set to true, Tyk Gateway will serialize the request session state and pass it as an argument to the function that implements the plugin in the target language. This is applicable to Post, Response, and Authentication hooks only |

---

## Language configuration

All plugins for an API should be implemented using **one** of the [supported target languages]({{< ref "plugins/supported-languages" >}}). We configure the plugin implementation language for an API by specifying a [plugin driver]({{< ref "plugins/supported-languages#plugin-driver-names" >}}).

{{< note >}}
**Note**

For a given API it is not possible to mix the implementation language of its associated plugins. For example, it is not possible to implement a pre request plugin in *Go* and also implement a post request plugin in *Python* for the same API.

{{< /note >}}

---

## Next steps

If you’re using the legacy Tyk Classic APIs, then check out the [configuring plugins for Tyk Classic APIs]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/classic" >}}) page for further details.

If you’re using the newer Tyk OAS APIs, then check out the [configuring plugins for Tyk OAS APis]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/oas" >}}) page for further details.
