---
date: 2017-03-24T13:19:52Z
title: gRPC
menu:
  main:
    parent: "Rich Plugins"
weight: 5
url: "/plugins/supported-languages/rich-plugins/grpc"
aliases:
  - /customise-tyk/plugins/rich-plugins/grpc/
  - /customise-tyk/plugins/rich-plugins/grpc/
  - /plugins/rich-plugins/grpc
  - /plugins/rich-plugins/grpc/grpc-plugins-tyk
---
Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS. See [gRPC by language](http://www.grpc.io/docs/) for more details.

[Protocol Buffers](https://developers.google.com/protocol-buffers/) are used for dispatching and exchanging requests between Tyk and your gRPC plugins. Protocol Buffers can be versioned using the conventions outlined [here](http://h22208.www2.hpe.com/eginfolib/networking/docs/sdn/sdnc2_7/5200-0910prog/content/s_sdnc-app-ha-versioning-GPB.html). The [protocol definitions](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto ) and [bindings](https://github.com/TykTechnologies/tyk/tree/master/coprocess/bindings) provided by Tyk should be used in order for the communication to be successful.

You may re-use the bindings that were generated for our samples. In case you find it necessary, or you don't find a sample that uses your target language, you may generate the bindings yourself. The Protocol Buffers and gRPC documentation provide specific requirements and instructions for each language.

See [this tutorial]({{< ref "plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api/" >}}) for instructions on how to create a gRPC plugin.
