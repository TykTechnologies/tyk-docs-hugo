---
date: 2017-03-24T13:27:30Z
title: gRPC Plugins and Tyk
menu:
  main:
    parent: "gRPC"
weight: 0 
---

Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS (see ["gRPC by language"](http://www.grpc.io/docs/)).

[Protocol Buffers](https://developers.google.com/protocol-buffers/) are used for dispatching and exchanging requests between Tyk and your gRPC plugins. Protocol Buffers can be versioned using the conventions outlined [here](http://h22208.www2.hpe.com/eginfolib/networking/docs/sdn/sdnc2_7/5200-0910prog/content/s_sdnc-app-ha-versioning-GPB.html) The **protocol definitions** provided by Tyk should be used in order for the communication to be successful. You may find these definitions [here](https://github.com/TykTechnologies/tyk-protobuf).

You may re-use the bindings that were generated for our samples. In case you find it necessary, or you don't find a sample that uses your target language, you may generate the bindings yourself. The Protocol Buffers and gRPC documentation provide specific requirements and instructions for each language, we suggest you check them.

See [this tutorial](/docs/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api/) for instructions on how to create a gRPC plugin.
