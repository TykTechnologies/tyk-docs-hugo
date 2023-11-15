---
title: Get Started with Self Managed Plugins
description: Explains how to configure Tyk Plugins for Self Managed Plugins
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
---

## Introduction

This quick start explains how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) repository within Tyk Dashboard.

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
2. We've sent an API request to the Gateway and modified the API request in-flight using the Custom Go Plugin.

We can make changes to the custom Go Plugin and run `make build` in order to test the new changes.