---
date: 2017-03-24T13:19:52Z
title: gRPC
menu:
  main:
    parent: "Rich Plugins"
weight: 0
url: "/customise-tyk/plugins/rich-plugins/grpc"
---
### What is gRPC?
From the [gRPC documentation][1]:

> gRPC is a modern, open source remote procedure call (RPC) framework that can run anywhere. It enables client and server applications to communicate transparently, and makes it easier to build connected systems.

### gRPC Plugins and Tyk
Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS (see ["gRPC by language"][2]).

[Protocol Buffers][3] are used for dispatching and exchanging requests between Tyk and your gRPC plugins. The **protocol definitions** provided by Tyk should be used in order for the communication to be successful. You may find these definitions [here][4].

You may re-use the bindings that were generated for our samples. In case you find it necessary, or you don't find a sample that uses your target language, you may generate the bindings yourself. The Protocol Buffers and gRPC documentation provide specific requirements and instructions for each language, we suggest you check them.

See [this tutorial][5] for instructions on how to create a gRPC plugin.

 [1]: http://www.grpc.io/faq/ 
 [2]: http://www.grpc.io/docs/
 [3]: https://developers.google.com/protocol-buffers/
 [4]: https://github.com/TykTechnologies/tyk-protobuf
 [5]: /docs/customise-tyk/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api/