---
title: "SSE Proxy"
date: 2021-09-28
tags: [""]
description: ""
menu: 
  main:
    parent: "Advanced Configuration"
url: "/advanced-configuration/sse-proxy"
weight: 6
---

## Using Tyk as a server-sent events (SSE) Proxy

Tyk Gateway supports SSE proxying over HTTP, enabling a client to receive a stream of updates from a server over a long running HTTP connection.

### Setup
- Enable SSE support on the Gateway: Set `http_server_options.enable_websockets` to `true` in your Tyk Gateway config file.
- To maintain an open connection between the API consumer and the Tyk Gateway, set `http_server_options.read_timeout` and `http_server_options.write_timeout` to appropriately high values (in milliseconds). For example, you could try setting both to `2000`, but this is for you to determine in your environment.
- Set `http_server_options.flush_interval` to an appropriate value, e.g. `1`, to force Tyk to stream the response to the client every `n` seconds.


### Example using Tyk as an SSE proxy
For this we will need:

* An SSE server.  For this example we will use [Golang HTML 5 SSE example](https://github.com/kljensen/golang-html5-sse-example)
* An instance of the Tyk Gateway and optionally the Tyk Dashboard

#### Steps:
* Ensure the Gateway configuration options detailed in the prerequisites are set.
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
