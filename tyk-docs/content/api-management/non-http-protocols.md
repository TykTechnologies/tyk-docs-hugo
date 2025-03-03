---
title: "Non HTTP Protocol"
date: 2024-12-21
tags: ["gRPC", "TCP", "SSE", "Websocket", "Non HTTP Protocol"]
description: "How to configure Non HTTP Protocols"
keywords: ["gRPC", "TCP", "SSE", "Websocket", "Non HTTP Protocol"]
aliases:
  - /advanced-configuration/other-protocols
  - /key-concepts/grpc-proxy
  - /key-concepts/tcp-proxy
  - /advanced-configuration/websockets
  - /advanced-configuration/sse-proxy
---

## Overview

Tyk primarily focuses on the HTTP/HTTPS protocol for handling and modeling traffic. However, with the growing popularity of WebSocket- and gRPC-based APIs, Tyk also supports transparent proxying for both TLS and non-TLS connections.

## gRPC Proxy

### Using Tyk as a gRPC Proxy

Tyk supports gRPC passthrough proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services).

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request, for more information [see](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md). In the context of the API Gateway, we are interested in the following:

- You can target specific methods of the gRPC service using the format: `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use URL rewrite plugins in our [Endpoint Desiger]({{< ref "api-management/traffic-transformation#url-rewrite-middleware" >}}). 
- HTTP method is always `POST`.
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name. 

You can also perform [gRPC load balancing](#grpc-load-balancing).

**Prerequisites**
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
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS]({{< ref "/api-management/client-authentication#use-mutual-tls" >}}) to configure Mutual Authentication in Tyk. 

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication]({{< ref "/api-management/client-authentication#use-basic-authentication" >}}) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens]({{< ref "/api-management/client-authentication#use-auth-tokens" >}}) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.

### gRPC load balancing

Tyk is able to perform load balancing on gRPC traffic using an approach similar to our native [Load Balancing]({{< ref "tyk-self-managed#load-balancing" >}}) functionality.

For both secure and insecure gRPC scenarios, the steps above serve as a starting point.

**In a secure gRPC scenario**

For configuring multiple upstream targets in a secure gRPC scenario, follow these additional steps:

* Check the "Enable round-robin load balancing" flag in the "Core Settings" section of your API.
* Define each target as `https://grpc.test.example.com:10000`, `https://grpc.test.example.com:10001` and so on.

**In an insecure scenario (H2C)**

Use the same approach but use the H2C scheme instead: `h2c://grpc.test.example.com:10000`, `h2c://grpc.test.example.com:10001`, etc. 

### Example of gRPC proxy using H2C
This is the simplest way to have a working gRPC proxy setup. You will need:

* A gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/helloworld)
* A gRPC client. You can use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC
* An instance of the Tyk Gateway and Dashboard

**Steps for Configuration:**

* Execute the gRPC server (for this example you can expose it at port `:50051`)
* Create the API via the Tyk dashboard with the following configuration:
    * Set HTTP as protocol
    * Uncheck `strip listen path` in the api
    * Set listen path: `/helloworld.Greeter`
    * Now set the `target_url`. In order for Tyk to detect that you will use `h2c` for this API we will need to write the URL with the prefix `h2c://`. For this example the URL can be `h2c://localhost:50051`
    * Hit save, and once the Gateway finishes reloading you can test the solution
* From the command line you can consume the service via the Tyk Gateway. To test it, enter `grpcurl -plaintext -proto helloworld.proto -d '{"name": "joe"}' tyk-gateway:8080 helloworld.Greeter/SayHello` and you should get as a response: `{"message": "Hello joe"}` which means that everything is working as it should.

### Example of gRPC proxy using HTTPS

**Prerequisites:**

* a gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/route_guide) as this example already supports TLS.
* A gRPC client. You can use [grpcurl](https://github.com/fullstorydev/grpcurl) which is basically curl but for gRPC (or you can use the client application)
* A certificate to expose the API via HTTPS
* An instance of Tyk Gateway and Dashboard

**Steps for Configuration:**

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

**Prerequisites**
* a gRPC server. For this example you can use [this server](https://github.com/grpc/grpc-go/tree/master/examples/route_guide).
* a client application. You can use [this client](https://github.com/grpc/grpc-go/tree/master/examples/route_guide/client).
* A certificate to expose the API via HTTPS
* An instance of the Tyk Gateway and Dashboard.

**Steps for Configuration:**

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

## TCP Proxy

### Using Tyk as a TCP Proxy

Tyk can be used as a reverse proxy for your TCP services. It means that you can put Tyk not only on top of your APIs but on top of **any** network application, like databases, services using custom protocols etc.

#### Set via your API

To enable TCP proxying, set the `protocol` field either to `tcp` or `tls`. In the case of TLS, you can also specify a `certificate` field with a certificate ID or path to it.

Similar to the above, the proxy target scheme should be set to `tcp://` or `tls://`, depending if your upstream is secured by TLS or not.

The simplest TCP API definition looks like this:

```yaml
{
  "listen_port": 30001,
  "protocol": "tls",
  "certificate": ["<cert-id>"],
  "proxy": {
    "target_url": "tls://upstream:9191"
  }
}
```

#### Set via your Dashboard

From the **API Designer > Core Settings** tab, select the appropriate protocol from the Protocol field drop-down list.

Enter the network port number in the **Port** field.

If using TLS you can also add a PEM formatted SSL certificate in the **Upstream Certificates** section from the **Advanced Options** tab.

{{< img src="/img/2.10/protocol_and_port.png" alt="Protocol" >}}

Tyk supports multiplexing based on certificate SNI information, which means that you can have multiple TCP services on the **same port**, served on different domains. Additionally, all services on the same port should share the same protocol: either `tcp`, `tls`, `http` or `https`.

If Tyk sits behind another proxy, which has  the PROXY protocol enabled, you can set `enable_proxy_protocol` to `true`. 

As for features such as load balancing, service discovery, Mutual TLS (both authorization and communication with upstream), certificate pinning, etc. All work exactly the same way as for your HTTP APIs. 

### Allowing specific ports

By default, you will not be able to run a service on a custom port, until you allow the required ports. 
Since TCP services can be configured via the Dashboard, you should be careful who can create such services, and which ports they can use. Below is an example of allowing ports in `tyk.conf`:

```
{
  ...
  "ports_whitelist": {
    "https": {
      "ranges": [
        {
          "from": 8000,
          "to": 9000
        }
      ]
    },
    "tls": {
      "ports": [
        6000,
        6015
      ]
    }
  }
  ...
}
```

As you can see, you can use either `ranges` or `ports` directives (or combine them). 

You can also disable this behavior and allow any TCP port by setting `disable_ports_whitelist` to `true`.


### Health checks

TCP health checks are configured the same way as HTTP ones.
The main difference is that instead of specifying HTTP requests, you should specify a list of commands, which send data or expect some data in response. 

A simple health check which verifies only connectivity (e.g. if a port is open), can be: 

```yaml
{
...
	"uptime_tests": {
	  "check_list": [
	    { "url": "127.0.0.1:6379" },
        "commands": []
	  ]
	}
...
}
```

#### Complex example

Here is quite a complex example of using health checks, which shows a Redis Sentinel setup. In this configuration, we put a TCP proxy, e.g. Tyk, on top of two or more Redis nodes, and the role of the proxy will always direct the user to Redis master. To do that we will need to perform health checks against each Redis node, to detect if it is a master or not. In other words, Redis clients who communicate with Redis through the proxy will be always directed to the master, even in case of failover.

```yaml
{
   "name": "Redis Sentinel",
   "listen_port": 6379,
   "protocol": "tcp",
   "enable_load_balancing": true,
   "proxy": {
	   "target_list": ["192.168.10.1:6379", "192.168.10.2:6379"]
	},
   "check_host_against_uptime_tests": true,
   "uptime_tests": {
       "check_list": [
          {
			"url": "192.168.10.1:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          },
          {
			"url": "192.168.10.2:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          }
       ]
   }
}
```

At the moment Tyk supports only 2 commands:
 - `send`  send string to server
- `expect`  expect string from the server


[1]: /img/dashboard/system-management/api-protocol.png

## SSE Proxy

[Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) (SSE) is a server push technology enabling a subscribed client to receive automatic updates from a server via a long running HTTP connection. 
Unlike WebSockets, SSE is a one-way communication of server to clients (WebSockets is a bidirectional communication between server and client). 
As such, if you only need clients to receive data from a server, and don't require them sending messagess back, SSE could be a simpler way to make that happen. An online stock quotes, or notifications and feeds are good examples for applications that use SSE.

### Using Tyk as a server-sent events (SSE) Proxy

Tyk Gateway supports SSE proxying over HTTP, and can sit in the middle between the client and the SSE server and support the server sending updates to the client.

#### Setup
- Enable SSE support on the Gateway: Set `http_server_options.enable_websockets` to `true` in your Tyk Gateway config file.
- To maintain an open connection between the API consumer and the Tyk Gateway, set `http_server_options.read_timeout` and `http_server_options.write_timeout` to appropriately high values (in milliseconds). For example, you could try setting both to `2000`, but this is for you to determine in your environment.
- Set `http_server_options.flush_interval` to an appropriate value, e.g. `1`, to force Tyk to stream the response to the client every `n` seconds.


#### Example using Tyk as an SSE proxy
For this we will need:

* An SSE server.  For this example we will use [Golang HTML 5 SSE example](https://github.com/kljensen/golang-html5-sse-example)
* An instance of the Tyk Gateway and optionally the Tyk Dashboard

**Steps for Configuration:**
* Ensure the Gateway configurations detailed in the Setup section are set.
* Run the SSE server as per the example instructions. By default this runs on port `8000`.
```
go run ./server.go
```
* Publish an API with the following configuration:
    1. Set an appropriate listen path, e.g. `"listen_path": "/sse"`
    2. Strip the listen path, e.g. `"strip_listen_path": true,`
    3. Set the target url as the SSE server, e.g. the example SSE server:`"target_url": "http://host.docker.internal:8000"`
    4. Click Save, and wait for the Gateway to reload the API before testing it
* To test the protected SSE service via the API in the Tyk Gateway run:
```bash 
curl http://localhost:8080/sse/events/
```
You should see a stream of updates from the server. In this example, you will see:

```bash
Message: 20 - the time is 2013-03-08 21:08:01.260967 -0500 EST
Message: 21 - the time is 2013-03-08 21:08:06.262034 -0500 EST
Message: 22 - the time is 2013-03-08 21:08:11.262608 -0500 EST
```

## WebSockets

As from Tyk gateway v2.2, Tyk supports transparent WebSocket connection upgrades. To enable this feature, set the `enable_websockets` value to `true` in your `tyk.conf` file.

WebSocket proxying is transparent, Tyk will not modify the frames that are sent between client and host, and rate limits are on a per-connection, not per-frame basis.

The WebSocket upgrade is the last middleware to fire in a Tyk request cycle, and so can make use of HA capabilities such as circuit breakers and enforced timeouts.

Tyk needs to decrypt the inbound and re-encrypt the outbound for the copy operations to work, Tyk does not just pass through the WebSocket. When the target is on default SSL port you must explicitly specify the target url for the API:

```{.copyWrapper}
https://target:443/
```

### WebSocket Example

We are going to set up Tyk with a WebSocket proxy using our [Tyk Pro Docker Demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) installation.

We will be using the [Postman WebSocket Echo Service](https://blog.postman.com/introducing-postman-websocket-echo-service/) to test the connection.

**Steps for Configuration**

1. **Setup the API in Tyk**

    Create a new API in Tyk. For this demo we are going to select Open (Keyless) as the **Authentication mode**.

    Set the **Target URL** to `wss://ws.postman-echo.com/raw`

2. **Test the Connection**

    1. From Postman, select **File > New > WebSocket Request** (or from **Workspace > New > WebSocket Request** if using the web based version).

    {{< img src="/img/dashboard/system-management/postman-websocket-request.png" alt="Postman WebSocket Request" >}}

    2. Enter your Tyk API URL in the **Enter server URL** field (minus the protocol).
    3. Enter some text in the **New Message** field and click **Send**.
    4. You will see a successful connection.

    {{< img src="/img/dashboard/system-management/postman-websocket-test.png" alt="Postman WebSocket Connection Result" >}}

{{< note success >}}
**Note**  

If your API uses an Authentication mode other than Open (Keyless), add the details in the Header tab. 
{{< /note >}}

An example Header configuration for using an Authentication Token with an API:

{{< img src="/img/dashboard/system-management/websocket-auth-token.png" alt="Postman WebSocket Connection Result with Authorization token" >}}

See the [Access an API]({{< ref "api-management/gateway-config-managing-classic#access-an-api" >}}) tutorial for details on adding an Authentication Token to your APIs.

