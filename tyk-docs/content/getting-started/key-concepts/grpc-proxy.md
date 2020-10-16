---
title: "gRPC Proxy"
date: 2019-09-23T10:28:52+03:00
weight: 12
menu:
  main:
    parent: "Key Concepts"
url: "/key-concepts/grpc-proxy"
---

### Using Tyk as a gRPC Proxy

Tyk supports gRPC passthrough proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services). The only requirement is enabling HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting `http_server_options.enable_http2` and `proxy_enable_http2` to true in your Gateway config file.
However, in the scenario that you want to secure the connection between 2 services that call each other then you can use h2c (that is the non-TLS version of HTTP/2), this can be done by enabling `proxy_enable_h2c` in the gateway config file.
You also need to set your `listen_path` in your API definitions.

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request. In the context of the API Gateway, we are intersted in the following:

- HTTP path follows the format `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger](/docs/transform-traffic/url-rewriting/#a-name-url-rewrite-with-endpoint-designer-a-rewrite-a-url-with-the-endpoint-designer).
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name.


### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/) to configure Mutual Authentication in Tyk. 

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](/docs/basic-config-and-security/security/authentication-authorization/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](/docs/basic-config-and-security/security/authentication-authorization/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.
