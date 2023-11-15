---
title: Tutorial: Running the Getting Started Go Plugin in Tyk Gateway
description: Explains how to build and run the getting started example using Tyk OSS Gateway
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
---


This quick start guide will explain how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) Go plugin using the Tyk OSS Gateway.

In this tutorial you will learn how to:

1. Bootstrap the getting started example.
2. Test the plugin.
3. View the analytics.
4. Next steps.


### 1. Bootstrap the getting started example

Please run the following command from within your newly cloned directory to run the Tyk Stack and compile the sample plugin.  This will take a few minutes as we have to download all the necessary dependencies and docker images.

```bash
make up-oss && make build
```

### 2. Test the plugin

Let's test the plugin by sending an API request to the pre-configured API definition:

```
curl localhost:8080/httpbin/get
```

Response:
```
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Foo": "Bar",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1"
  },
  "origin": "172.28.0.1, 99.242.70.243",
  "url": "http://httpbin.org/get"
}
```

We've sent an API request to the Gateway. We can see that the sample custom plugin has injected an HTTP header with a value of *Foo:Bar*. This header was echoed back in the Response Body via the mock Httpbin server.

The `./tyk/scripts/bootstrap-oss.sh` script creates an API definition that includes the custom plugin.


### 3. View the analytics

We can see that Tyk Pump is running in the background. Let's check the logs after sending the API request:

```
docker logs custom-go-plugin_tyk-pump_1 
```

Output:
```
time="Feb 23 16:29:27" level=info msg="Purged 1 records..." prefix=stdout-pump
{"level":"info","msg":"","time":"0001-01-01T00:00:00Z","tyk-analytics-record":{"method":"GET","host":"httpbin.org","path":"/get","raw_path":"/get","content_length":0,"user_agent":"curl/7.79.1","day":23,"month":2,"year":2023,"hour":16,"response_code":200,"api_key":"00000000","timestamp":"2023-02-23T16:29:27.53328605Z","api_version":"Non Versioned","api_name":"httpbin","api_id":"845b8ed1ae964ea5a6eccab6abf3f3de","org_id":"","oauth_id":"","request_time":1128,"raw_request":"...","raw_response":"...","ip_address":"192.168.0.1","geo":{"country":{"iso_code":""},"city":{"geoname_id":0,"names":null},"location":{"latitude":0,"longitude":0,"time_zone":""}},"network":{"open_connections":0,"closed_connections":0,"bytes_in":0,"bytes_out":0},"latency":{"total":1128,"upstream":1111},"tags":["key-00000000","api-845b8ed1ae964ea5a6eccab6abf3f3de"],"alias":"","track_path":false,"expireAt":"2023-03-02T16:29:27.54271855Z","api_schema":""}}
```

As we can see, when we send API requests, the Tyk Pump will scrape them from Redis and then send them to a persistent store as configured in the Tyk Pump env file. 

In this example, we've configured a simple `STDOUT` Pump where the records will be printed to the Standard OUT (docker logs!)

### 4. Next steps

Try updating the code of the plugin and experimenting. Once you've made changes to the example plugin, please run `make build` to compile the plugin and reload the gateway with the changes.

When finished, please run `make down` to bring down the stack.


## Summary

This tutorial has explained how to:
1. Bootstrap the getting started example plugin in Tyk Gateway environment.
2. Test the example plugin.
3. View the analytics.
4. Next steps.

We've run the Tyk stack and compiled the example Go plugin. Then, we loaded the plugin into the Gateway via Tyk Gateway's APIs, using the bootstrap script.

We tested the API definition and saw Tyk execute the example Go Plugin and inject an HTTP Header in the API request.
