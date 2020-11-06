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

Tyk supports gRPC passthrough proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services).
However, 
You also need to set your `listen_path` in your API definition and a specific port where the service will be exposed.

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request. In the context of the API Gateway, we are interested in the following:

- HTTP path follows the format `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger](/docs/transform-traffic/url-rewriting/#a-name-url-rewrite-with-endpoint-designer-a-rewrite-a-url-with-the-endpoint-designer).
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name. 

#### Prerequisites
- Enable  HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting `http_server_options.enable_http2` to true in your Gateway config file.
- Set `disable_ports_whitelist` to true, so the gateway can use additional ports to expose the service.

#### Secure gRPC Proxy
Tyk Supports secure gRPC proxy connections, in order to do so you only need to attach a certificate to the API that you want to expose just as you do for regular apis, after that you can consume the service via https.

#### Insecure gRPC Proxy (H2C)
For those scenarios that you want to connect 2 services that call each other or just ned an insecure connection you can use h2c (that is the non-TLS version of HTTP/2). Tyk supports h2c, this can be enabled at api level by setting `h2c` as protocol in the address of the grpc server (`target_url`) e.g: `h2c://mygrpcserver.com`.

#### About streaming
For gRPC streaming is recommended to set a low value in the gateway config `http_server_options.flush_interval` (this value is in milliseconds)

### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/) to configure Mutual Authentication in Tyk. 

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](/docs/basic-config-and-security/security/authentication-authorization/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](/docs/basic-config-and-security/security/authentication-authorization/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.
