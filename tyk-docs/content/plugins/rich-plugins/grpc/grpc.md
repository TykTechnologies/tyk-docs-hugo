---
date: 2017-03-24T13:19:52Z
title: gRPC
menu:
  main:
    parent: "Rich Plugins"
weight: 5
url: "/plugins/rich-plugins/grpc"
---
## What is gRPC?
From the [gRPC documentation](http://www.grpc.io/faq/ ):

> gRPC is a modern, open source remote procedure call (RPC) framework that can run anywhere. It enables client and server applications to communicate transparently, and makes it easier to build connected systems.

### How can I use gRPC with Tyk?

Using Tyk with your gRPC client and server is very easy. Since gRPC uses HTTP/2, you need to enable it by setting `enable_http2=true` for `Downstream-Tyk` and `proxy_enable_http2=true` for `Tyk-Upstream` connections. You also need to set your `listen_path` in your API definitions. 

### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/) to configure Mutual Authentication in Tyk. Now, everything will be same as default Mutual Authentication.

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](/docs/basic-config-and-security/security/your-apis/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](/docs/basic-config-and-security/security/your-apis/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.

### gRPC Plugins and Tyk
Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS (see ["gRPC by language"](http://www.grpc.io/docs/)).

Protocol Buffers are used for dispatching and exchanging requests between Tyk and your gRPC plugins. Protocol buffers can be versioned using the conventions outlined [here](http://h22208.www2.hpe.com/eginfolib/networking/docs/sdn/sdnc2_7/5200-0910prog/content/s_sdnc-app-ha-versioning-GPB.html). The **protocol definitions** provided by Tyk should be used in order for the communication to be successful. You may find these definitions [here](https://github.com/TykTechnologies/tyk-protobuf).

You may re-use the bindings that were generated for our samples. In case you find it necessary, or you don't find a sample that uses your target language, you may generate the bindings yourself. The Protocol Buffers and gRPC documentation provide specific requirements and instructions for each language, we suggest you check them.

See [this tutorial](/docs/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api/) for instructions on how to create a gRPC plugin.