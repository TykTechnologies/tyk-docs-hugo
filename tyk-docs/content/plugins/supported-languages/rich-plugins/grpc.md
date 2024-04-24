---
date: 2017-03-24T13:19:52Z
title: gRPC
menu:
  main:
    parent: "Rich Plugins"
weight: 5
aliases:
  - /customise-tyk/plugins/rich-plugins/grpc/
  - /customise-tyk/plugins/rich-plugins/grpc/
  - /plugins/rich-plugins/grpc
  - /plugins/rich-plugins/grpc/grpc-plugins-tyk
---

gRPC is a very powerful framework for RPC communication across different [languages](http://www.grpc.io/docs). It was created by Google and makes heavy use of HTTP2 capabilities and the [Protocol Buffers](https://developers.google.com/protocol-buffers/) serialisation mechanism to dispatch and exchange requests between Tyk and your gRPC plugins.

When it comes to built-in plugins, we have been able to integrate several languages like Python, Javascript & Lua in a native way: this means the middleware you write using any of these languages runs in the same process. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS.

For supporting additional languages we have decided to integrate gRPC connections and perform the middleware operations within a gRPC server that is external to the Tyk process. Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. See [gRPC by language](http://www.grpc.io/docs/) for more details.

An example architecture is illustrated below.

{{< img src="/img/diagrams/diagram_docs_gRPC-plugins_why-use-it-for-plugins@2x.png" alt="Using gRPC for plugins" >}}

Here we can see that Tyk Gateway sends requests to an external Java gRPC server to handle authentication, via a CustomAutg plugin. The flow is as follows:

- Tyk receives a HTTP request.
- Tyk serialises the request and session into a protobuf message that is dispatched to your gRPC server. 
- The gRPC server performs custom middleware operations (for example, any modification of the request object). Each plugin (Pre, PostAuthKey, Post, Response etc.) is handled as separate gRPC request.
- The gRPC server sends the request back to Tyk.
- Tyk proxies the request to your upstream API.

## What are the use cases?

Deploying an external gRPC server to handle plugins provides numerous technical advantages:

- Allows for independent scalability of the service from the Tyk Gateway.
- Utilises a custom-designed server tailored to address specific security concerns, effectively mitigating various security risks associated with native plugins.

## What are the limitations?

At the time of writing the following features are currently unsupported and unavailable in the serialised request:
- Client certificiates
- OAuth keys
- For graphQL APIs details concerning the *max_query_depth* is unavailable
- A request query parameter cannot be associated with multiple values

## Developer Resources

The [protocol definitions](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto ) and [bindings](https://github.com/TykTechnologies/tyk/tree/master/coprocess/bindings) provided by Tyk should be used in order for the communication to be successful.

You can generate supporting HTML documentation using the *docs* task in the [Taskfile](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/Taskfile.yml) file of the [Tyk repository](https://github.com/TykTechnologies/tyk). This documentation explains the protobuf messages and services that allow gRPC plugins to handle a request made to the Gateway. Please refer to the README file within the proto folder of the tyk repository for further details.

You may re-use the bindings that were generated for our samples or generate the bindings youself for Go, Python and Ruby, as implemented by the *generate* task in the [Taskfile](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/Taskfile.yml) file of the [Tyk repository](https://github.com/TykTechnologies/tyk).

If you wish to generate bindings for another target language you may generate the bindings yourself. The [Protocol Buffers](https://developers.google.com/protocol-buffers/) and [gRPC documentation](http://www.grpc.io/docs) provide specific requirements and instructions for each language.


## Getting Started

See [this tutorial]({{< ref "plugins/supported-languages/rich-plugins/grpc/tutorial-add-grpc-plugin-api" >}}) for instructions on how to create a gRPC plugin.
