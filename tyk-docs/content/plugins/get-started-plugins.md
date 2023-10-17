---
date: 2017-03-24T15:45:13Z
title: Get Started with Custom Go Plugins
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
menu:
  main:
    parent: "Custom Plugins"
aliases:
  - /plugins/get-started-selfmanaged/deploy
  - /plugins/get-started-selfmanaged/get-started
  - /plugins/get-started-selfmanaged/run
  - /plugins/get-started-selfmanaged/test
weight: 10
---

This section takes you through the development process of creating a Custom Go Plugin.

At the end of this process you will have a Tyk environment running locally and a simple Go plugin executing on each API request.

Go plugins are the recommended plugin type and suitable for most use cases.
## Prerequisites

* docker & docker-compose
* [A Tyk license](https://tyk.io/sign-up/#self) (if using Self-Managed Tyk, which will make the process easier via UI)
* Make
* OSX (Intel)  -> Not a prerequisite, though these steps are tested on OSX Intel/ARM

This tutorial will take between 10-15 minutes.

We'll be using Tyk's [getting started repo](https://github.com/TykTechnologies/custom-go-plugin), to get you up and running with a fully working Tyk custom go plugin.

Note - for more advanced Custom Go Plugin tutorials, go [here]({{< ref "plugins/supported-languages/golang.md" >}})

-------


{{< tabs_start >}}
{{< tab_start "Self-Managed" >}}


## 1.  Clone the getting started repo

Please clone the [getting started repo](https://github.com/TykTechnologies/custom-go-plugin).

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
```

### 2. Add your Tyk License


Create and edit the file `.env` with your Tyk-Dashboard license key

```shell
# Make a copy of the example .env file for the Tyk-Dashboard 
cp .env.example .env
```

### 3. Run the Stack

run the `make` command:

```bash
make
```

This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

### 4.  Log In

Log on to the Tyk Dashboard on `http://localhost:3000` using the following Bootstrapped credentials:
```
demo@tyk.io
```
and password:
```
topsecretpassword
```

Note: these are editable in `.env.example`


### 5. Examine the pre-configured API

Once you're logged on to the Tyk Dashboard, navigate to the "APIs" screen.

You'll see a sample `Httpbin` API.  Let's click into it for more details.

Click on "VIEW RAW DEFINITION".  Note the `custom_middleware` block is filled out, injecting the compiled Custom go plugin into the API.

### 6. Send an API Request to the API

Let's send an API request to the API Gateway so it can reverse proxy to our API.

```terminal
curl localhost:8080/httpbin/get
```

Yields the response:
```
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Foo": "Bar",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-63f78c47-51e22c5b57b8576b1225984a"
  },
  "origin": "172.26.0.1, 99.242.70.243",
  "url": "http://httpbin.org/get"
}
```

Note, we see a "Foo:Bar" HTTP Header was injected by our Go plugin and echoed back to use by the Httpbin mock server.

### 7. View Analytics!


Navigate to the Dashboard's various "API Usage Data" to view analytics on the API request!


### Summary

1. We've bootstrapped our Tyk environment.
2. The included scripts compiled the Custom Go Plugin and loaded it in a pre-configured API.
2. We've sent an API request to the Gateway, and modified the API request in-flight using the Custom Go Plugin.

We can make changes to the custom Go Plugin and run `make build` in order to test the new changes.

{{< tab_end >}}
{{< tab_start "Open Source" >}}


### 1.  Clone the getting started repo

Please clone and move into the [getting started repo](https://github.com/TykTechnologies/custom-go-plugin).

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
cd custom-go-plugin
```

### 2. Run the stack

Please run the following command in your newly cloned directory to run the Tyk Stack and Compile the sample plugin.  This will take a few minutes as we have to download all the necessary dependencies and docker images.

```bash
make up-oss && make build
```

### 3. Test the plugin!

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

We've sent an API request to the Gateway.   We can see that the sample custom plugin has injected an HTTP Header with a value of "Foo:Bar".  This header was echo'd back to us in the Response Body by the mock Httpbin server.

The `./tyk/scripts/bootstrap-oss.sh` script creates an API definition including the custom plugin.


### 4. Analytics

We can see that Tyk Pump is running in the background.  Let's check the logs after sending the API request:

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

### 5. Go Plugin Development

Once you've made changes to the sample plugin, please run `make build` to compile the plugin & reload the gateway with the changes.

## Summary

We've run the Tyk stack, and compiled the sample custom go plugin.  Then, we loaded the custom plugin into the Gateway via Tyk Gateway's APIs using the bootstrap script.

We tested the API definition and have seen Tyk execute the Custom Go Plugin and inject an HTTP Header in the API request.

{{< tab_end >}}
{{< tabs_end >}}

### Down

Please run ```make down```  to bring down the stack.