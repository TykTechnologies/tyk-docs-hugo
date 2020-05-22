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
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](/docs/basic-config-and-security/security/authentication-authorization/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](/docs/basic-config-and-security/security/authentication-authorization/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.