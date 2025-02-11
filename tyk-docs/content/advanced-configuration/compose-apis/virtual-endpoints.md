---
title: Tyk Virtual Endpoints
tags:
    - virtual endpoint
    - middleware
    - per-endpoint
    - JavaScript
    - JS
description: Virtual Endpoint middleware
date: "2017-03-23T18:08:16Z"
aliases:
    - /compose-apis/virtual-endpoints/
    - /advanced-configuration/compose-apis
---

Tyk's Virtual Endpoint is a programmable middleware component that is invoked towards the end of the request processing chain. It can be enabled at the per-endpoint level and can perform complex interactions with your upstream service(s) that cannot be handled by one of the other middleware components.

Virtual endpoint middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The Virtual Endpoint is an extremely powerful feature that is unique to Tyk and provides exceptional flexibility to your APIs.

## When to use virtual endpoints

#### Aggregating data from multiple services

From a virtual endpoint, you can make calls out to other internal and upstream APIs. You can then aggregate and process the responses, returning a single response object to the originating client. This allows you to configure a single externally facing API to simplify interaction with multiple internal services, leaving the heavy lifting to Tyk rather than starting up an aggregation service within your stack.

#### Enforcing custom policies

Tyk provides a very flexible [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) where you can combine functions to implement the access controls you require to protect your upstream services. Of course, not all scenarios can be covered by Tyk's standard middleware functions, but you can use a virtual endpoint to apply whatever custom logic you require to optimize your API experience.

#### Dynamic Routing

With a virtual endpoint you can implement complex dynamic routing of requests made to a single external endpoint on to different upstream services. The flexibility of the virtual endpoint gives access to data within the request (including the key session) and also the ability to make calls to other APIs to make decisions on the routing of the request. It can operate as a super-powered [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware.

## How virtual endpoints work

The virtual endpoint middleware provides a JavaScript engine that runs the custom code that you provide either inline within the API definition or in a source code file accessible to the Gateway. The JavaScript Virtual Machine (JSVM) provided in the middleware is a traditional ECMAScript5 compatible environment which does not offer the more expressive power of something like Node.js.

The virtual endpoint terminates the request, so the JavaScript function must provide the response to be passed to the client. When a request hits a virtual endpoint, the JSVM executes the JavaScript code which can modify the request, make calls to other APIs or upstream services, process data, and ultimately determines the response returned to the client.

{{< note success >}}
**Note**

You will need to enable Tyk's JavaScript Virtual Machine by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}) for your virtual endpoints to work.
{{< /note >}}

## Scripting virtual endpoint functions

The [middleware scripting guide]({{< ref "api-management/plugins/javascript#using-javascript-with-tyk" >}}) provides guidance on writing JS functions for your virtual endpoints, including how to access key session data and custom attributes from the API definition.

#### Function naming

The virtual endpoint middleware will invoke a named function within the JS code that you provide (either inline or in a file). Both the filename and function name are configurable per endpoint, but note that function names must be unique across your API portfolio because all plugins run in the same virtual machine. This means that you can share a single function definition across multiple endpoints and APIs but you cannot have two different functions with the same name (this applies across all [JavaScript middleware components]({{< ref "api-management/plugins/javascript#" >}})).

Inline mode is mainly used by the dashboard to make code injection easier on multiple node deployments.

## Virtual endpoint library

We have put together a [library](https://github.com/TykTechnologies/custom-plugins#virtual-endpoints) of JS functions that you could use in your virtual endpoints. We welcome submissions from the Tyk community so if you've created a function that you think would be useful to other users, please open an issue in the Github repository and we can discuss bringing it into the library.

{{< note success >}}
**Note**

Virtual endpoints are not available in Tyk Cloud Classic.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the virtual endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the virtual endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Virtual Endpoint middleware summary
  - The Virtual Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Virtual Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
