---
title: Dashboard Plugins Quickstart
description: Explains how to build and run the getting started example within Tyk Dashboard
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
---


This quick start explains how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) Go plugin within Tyk Dashboard.

In this tutorial you will learn how to:

1. Add your Tyk license.
2. Bootstrap the Tyk Dashboard environment.
3. Login to Tyk Dashboard.
4. View the pre-configured API.
5. Test the plugin.
6. View the analytics.
7. Next steps.

## 1. Add your Tyk license

Create and edit the file `.env` with your Tyk Dashboard license key

```console
# Make a copy of the example .env file for the Tyk-Dashboard 
cp .env.example .env
```

## 2. Bootstrap the getting started example

run the `make` command:

```bash
make
```

This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

## 3. Log in to Tyk Dashboard

Log on to the Tyk Dashboard on `http://localhost:3000` using the following Bootstrapped credentials:
```
demo@tyk.io
```
and password:
```
topsecretpassword
```

Note: these are editable in `.env.example`

## 4. View the pre-configured API

Once you're logged on to the Tyk Dashboard, navigate to the *APIs* screen.

You'll see a sample *Httpbin* API.  Let's click into it for more details.

Click on *VIEW RAW DEFINITION*.  Note the *custom_middleware* block is filled out, injecting the compiled example Go plugin into the API.

## 5. Test the plugin

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

Note, we see a *Foo:Bar* HTTP Header was injected by our Go plugin and echoed back to us by the Httpbin mock server.

## 6. View the analytics

Navigate to the Dashboard's various *API Usage Data* to view analytics on the API request!

## 7. Next steps

Try updating the code of the plugin and experimenting. Once you've made changes to the example plugin, please run `make build` to compile the plugin and reload the gateway with the changes.

When finished, please run `make down` to bring down the stack.

## Summary

This tutorial has explained how to:
1. Add your Tyk license.
2. Bootstrap the Tyk Dashboard environment.
3. Login to Tyk Dashboard.
4. View the pre-configured API.
5. Test the plugin.
6. View the analytics.
7. Next steps.

We've bootstrapped our Tyk Dashboard environment. The included scripts compiled the example Go Plugin and loaded it into a pre-configured API.

We then tested the example plugin by sending an API request to the Gateway. We saw that the example plugin modified our API request in-flight and added the *Foo* response header with a value of *bar*.