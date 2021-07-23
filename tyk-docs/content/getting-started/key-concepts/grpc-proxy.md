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
You also need to set your `listen_path` in your API definition and a specific port where the service will be exposed.

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request, for more information [see](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md). In the context of the API Gateway, we are interested in the following:

- You can target specific methods of the gRPC service using the format: `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger](/docs/transform-traffic/url-rewriting/#a-name-url-rewrite-with-endpoint-designer-a-rewrite-a-url-with-the-endpoint-designer). 
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name. 

You can also perform [gRPC load balancing](#grpc-load-balancing).

#### Prerequisites
- Enable  HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting `http_server_options.enable_http2` and `proxy_enable_http2` to true in your Gateway config file.
- Set `disable_ports_whitelist` to true, so the gateway can use additional ports to expose the service.

#### Secure gRPC Proxy
Tyk Supports secure gRPC proxy connections, in order to do so you only need to attach a certificate to the API that you want to expose just as you do for regular apis, after that you can consume the service via https.

#### Insecure gRPC Proxy (H2C)
For those scenarios that you want to connect 2 services that call each other or just need an insecure connection you can use h2c (that is the non-TLS version of HTTP/2). Tyk supports h2c, this can be enabled at api level by setting `h2c` as protocol in the address of the gRPC server (`target_url`) e.g: `h2c://my-grpc-server.com`.

#### gRPC streaming
Tyk supports gRPC streaming, it only requires to set a low value for `flush_interval`, a low flush interval is required in order to forward data to the downstream as soon as the upstream replies. A high flush interval would delay the communication. We recommend the lowest possible value: 1 (1 millisecond), you can set this value in the gateway config `http_server_options.flush_interval`

### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/) to configure Mutual Authentication in Tyk. 

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](/docs/basic-config-and-security/security/authentication-authorization/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](/docs/basic-config-and-security/security/authentication-authorization/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.

### Example of gRPC proxy using H2C
This is the simplest way to have a working gRPC proxy setup, in order to do so we will need:

* A gRPC server, for this example we will use [this server](https://github.com/grpc/grpc-go/tree/master/examples/helloworld)
* A gRPC client, we will use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC
* An instance of Tyk gateway and dashboard

#### Steps:
* Execute the gRPC server (for this example we will expose it at port `:50051`)
* Create the API via dashboard with the next configuration:
    * Set HTTP as protocol
    * Set a custom port to expose the api. Let's use `12345`
    * Set listen path: `/`
    * Now, let's set the `target_url`, in order to tyk to detect that we will use `h2c` for this api we will need to write the url with the prefix `h2c://`, so for this example the value is `h2c://localhost:50051`
    * Hit save, and once the gateway finish the reload we can test the solution
* From the command line we can consume the service via tyk gateway, just type `grpcurl -plaintext -proto helloworld.proto -d '{"name": "joe"}' tyk-gateway:12345 helloworld.Greeter/SayHello` and we get as response: `{"message": "Hello joe"}` which means that everything went as it should.

### Example of gRPC proxy using HTTPS

#### Prerequisites:
* a gRPC server, for this example we will use [this server](https://github.com/grpc/grpc-go/tree/master/examples/route_guide) as this example already supports TLS.
* A gRPC client, we will use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC (or you can use the client application)
* A certificate to expose the API via HTTPS
* An instance of Tyk gateway and dashboard

#### Steps:
* Execute the gRPC server (for this example we will expose it at port `:10000`), the `route_guide` application receives a flag to use TLS (`go run server.go -tls=true`). It's exposed in `grpc.test.example.com:10000`
* Create the API via dashboard with the next configuration:
    * Set HTTPS as protocol
    * Set a custom port to expose the api. Let's use `4444`
    * Add the certificate 
    * Set a custom domain, for this example will set `tyk`
    * Set as listen path: `/`
    * Now in target URL we will set the location of the service: `https://grpc.test.example.com:10000`
    * Hit save
* At this point we're ready to test the solution, so, from the command line will type: `grpcurl -proto route_guide.proto -d '{"latitude": 1, "longitude":2}' tyk:4444 routeguide.RouteGuide/GetFeature` and we should get a successful response, note that we are not sending the flag `-plaintext` as our desire is to connect via HTTPS.

### gRPC load balancing

Currently load balancing is not supported for gRPC.
