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

Tyk supports gRPC pass though proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services). The only requirement is enabling HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting `http_server_options.enable_http2` and `proxy_enable_http2` to true in your Gateway config file.

You also need to set your `listen_path` in your API definitions.

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request. In the context of the API Gateway, we are intersted in the following:

- HTTP path follows the format `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger](/docs/transform-traffic/url-rewriting/#a-name-url-rewrite-with-endpoint-designer-a-rewrite-a-url-with-the-endpoint-designer).
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name.