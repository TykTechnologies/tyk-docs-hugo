---
title: "gRPC Proxy"
date: 2019-09-23T10:28:52+03:00
weight: 12
menu:
  main:
    parent: "Key Concepts"
---

### Using Tyk as a gRPC Proxy

Tyk supports gRPC passthrough proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services).

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request, for more information [see](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md). In the context of the API Gateway, we are interested in the following:

- You can target specific methods of the gRPC service using the format: `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger]({{< ref "transform-traffic/url-rewriting" >}}). 
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name. 

You can also perform [gRPC load balancing](#grpc-load-balancing).

#### Prerequisites
- Enable  HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting `http_server_options.enable_http2` and `proxy_enable_http2` to true in your `tyk.conf` Gateway config file.
- The `listen path` of the Api should be the same as the gRPC service name, so tyk can route it correctly.
- Ensure that `strip_listen_path` is set to false in your API, so the route of the gRPC service method is build correctly following the standard: `{service_name}/{service_method}`.

#### Secure gRPC Proxy
Tyk Supports secure gRPC proxy connections, in order to do so you only need to attach a certificate to the API that you want to expose just as you do for regular APIs, after that you can consume the service via HTTPS.

#### Insecure gRPC Proxy (H2C)
For scenarios where you want to connect two services calling each other or just need an insecure connection you can use h2c (that is the non-TLS version of HTTP/2). Tyk supports h2c, this can be enabled at api level by setting `h2c` as protocol in the address of the gRPC server (`target_url`) e.g: `h2c://my-grpc-server.com`.

#### gRPC streaming
Tyk supports all kinds of gRPC streaming (client streaming, server streaming and bidirectional streaming). It requires you to set a low value for `flush_interval`, this is required in order to forward data to the downstream target as soon as the upstream target replies. A high flush interval will delay this communication. We recommend the lowest possible value: 1 (1 millisecond). You set this value in your `tyk.conf` file in the `http_server_options.flush_interval` option.

### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) to configure Mutual Authentication in Tyk. 

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication]({{< ref "basic-config-and-security/security/authentication-authorization/basic-auth" >}}) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens" >}}) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.

### gRPC load balancing

Tyk is able to perform load balancing on gRPC traffic using an approach similar to our native [Load Balancing]({{< ref "planning-for-production/ensure-high-availability/load-balancing" >}}) functionality.

For both secure and insecure gRPC scenarios, the steps above serve as a starting point.

#### In a secure gRPC scenario

For configuring multiple upstream targets in a secure gRPC scenario, follow these additional steps:

* Check the "Enable round-robin load balancing" flag in the "Core Settings" section of your API.
* Define each target as `https://grpc.test.example.com:10000`, `https://grpc.test.example.com:10001` and so on.

#### In an insecure scenario (H2C)

Use the same approach but use the H2C scheme instead: `h2c://grpc.test.example.com:10000`, `h2c://grpc.test.example.com:10001`, etc. 


### Example of gRPC proxy using H2C
This is the simplest way to have a working gRPC proxy setup. You will need:

* A gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/helloworld)
* A gRPC client. You can use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC
* An instance of the Tyk Gateway and Dashboard

#### Steps:
* Execute the gRPC server (for this example you can expose it at port `:50051`)
* Create the API via the Tyk dashboard with the following configuration:
    * Set HTTP as protocol
    * Uncheck `strip listen path` in the api
    * Set listen path: `/helloworld.Greeter`
    * Now set the `target_url`. In order for Tyk to detect that you will use `h2c` for this API we will need to write the URL with the prefix `h2c://`. For this example the URL can be `h2c://localhost:50051`
    * Hit save, and once the Gateway finishes reloading you can test the solution
* From the command line you can consume the service via the Tyk Gateway. To test it, enter `grpcurl -plaintext -proto helloworld.proto -d '{"name": "joe"}' tyk-gateway:8080 helloworld.Greeter/SayHello` and you should get as a response: `{"message": "Hello joe"}` which means that everything is working as it should.

### Example of gRPC proxy using HTTPS

#### Prerequisites:
* a gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/route_guide) as this example already supports TLS.
* A gRPC client. You can use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC (or you can use the client application)
* A certificate to expose the API via HTTPS
* An instance of Tyk Gateway and Dashboard

#### Steps:
1. Execute the gRPC server (for this example we can expose it at port `:10000`), the `route_guide` application receives a flag to use TLS (`go run server.go -tls=true`). It's exposed in `grpc.test.example.com:10000`
2. Create the API via dashboard with the next configuration:
    * Set HTTPS as protocol
    * Uncheck `Strip listen path` in the api
    * Add the certificate 
    * Set a custom domain, for this example use `tyk`
    * Set as listen path: `/routeguide.RouteGuide`
    * Now in the target URL set the location of the service: `https://grpc.test.example.com:10000`
    * Click Save
3. At this point you're ready to test the solution, so, from the command line type: `grpcurl -proto route_guide.proto -d '{"latitude": 1, "longitude":2}' tyk:8080 routeguide.RouteGuide/GetFeature` and you should get a successful response. Note that you are not sending the flag `-plaintext` as the desire is to connect via HTTPS.


### Example of bidirectional data streaming using a gRPC service exposed via HTTPS but communicating Tyk to service via H2C

In this example you will expose a gRPC service via HTTPS using Tyk, but Tyk will consume the upstream via h2c. This situation is very common when using Kubernetes, where the internet traffic going through Tyk are TLS encrypted, but traffic in the inner cluster are in plain HTTP (h2c).

#### Prerequisites
* a gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/route_guide).
* a client application. You can use [this client](https://github.com/grpc/grpc-go/tree/master/examples/route_guide/client).
* A certificate to expose the API via HTTPS
* An instance of the Tyk Gateway and Dashboard.

#### Steps:
* Execute the gRPC server (for this example expose it at port `:10000`), the `route_guide` application receives a flag to enable/disable TLS (`go run server.go -tls=false`). It's available in `locahost:10000`
* In the Tyk Gateway config file set `"http_server_options.flush_interval": 1`  and run the Gateway (for this example will be running it in port 8000).
* Create the API via the Tyk Dashboard with the following configuration:
    * Set HTTPS as the protocol
    * Add the certificate 
    * Set a custom domain, for this example `tyk`
    * Set as listen path: `/routeguide.RouteGuide`. For testing purposes we will use the `RouteChat` service as this is a bidirectional service.
    * Now in the target URL set the location of the service: `h2c://localhost:10000`. This way Tyk will communicate with the upstream using h2c
    * Click Save
* Ensure that the client application has the server address pointing to Tyk, for this example: `https://tyk.com:8000`.
* Now you are ready to test the solution. Run the client application and it should send and receive data simultaneously.

Currently load balancing is not supported for gRPC.

