---
title: Per-Endpoint Custom Plugins
date: 2024-03-04
description: "Detail of the per-endpoint custom plugin"
tags: ["custom plugin", "golang", "go plugin", "middleware", "per-endpoint"]
---

Tyk's custom plugin architecture allows you to deploy custom logic that will be invoked at certain points in the [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) as Tyk processes requests to your APIs.

At the API-level, there are several points in the processing flow where custom plugins can be "hooked", as explained [here]({{< ref "plugins/plugin-types/plugintypes" >}}). Each of these will be invoked for calls to any endpoint on an API. If you want to perform custom logic only for specific endpoints, you must include selective processing logic within the plugin.

At the endpoint-level, Tyk provides the facility to attach a custom Golang plugin at the end of the request processing chain (immediately before the API-level post-plugin is executed).

## When to use the per-endpoint custom plugin

#### Aggregating data from multiple services

From a custom plugin, you can make calls out to other internal and upstream APIs. You can then aggregate and process the responses, returning a single response object to the originating client. This allows you to configure a single externally facing API to simplify interaction with multiple internal services, leaving the heavy lifting to Tyk rather than standing up an aggregation service within your stack.

#### Enforcing custom policies

Tyk provides a very flexible middleware chain where you can combine functions to implement the access controls you require to protect your upstream services. Of course, not all scenarios can be covered by Tyk’s standard middleware functions, but you can use a custom plugin to apply whatever custom logic you require to optimize your API experience.

#### Dynamic Routing

With a custom plugin you can implement complex dynamic routing of requests made to a single external endpoint on to different upstream services. The flexibility of the virtual endpoint gives access to data within the request (including the key session) and also the ability to make calls to other APIs to make decisions on the routing of the request. It can operate as a super-powered URL rewrite middleware.

## How the per-endpoint custom plugin works

Tyk Gateway is written using Golang. This has a flexible plugin architecture which allows for custom code to be compiled separately from the gateway and then invoked natively by the gateway. When registering a custom Go plugin in the API definition, you must provide the location of the compiled plugin and also the name of the function to be invoked within that package. 

Go plugins must therefore be [compiled]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler" >}}) and [loaded]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins" >}}) into the Gateway in order that the function named in the plugin configuration in the API definition can be located and executed at the appropriate stage in the request middleware processing chain.

The custom code within the plugin has access to contextual data such as the session object and API definition. If required, it can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) and hence can provide a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware). This can then act as a high-performance replacement for the JavaScript virtual endpoints or for cases when you want to make use of external libraries.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the per-endpoint custom plugin [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the per-endpoint custom plugin [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Ignore Authentication middleware summary
  - The Per-Endpoint Custom Plugin is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Per-Endpoint Custom Plugin can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
