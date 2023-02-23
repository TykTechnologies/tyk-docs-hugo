---
date: 2017-03-24T15:45:13Z
title: Task 2 - Test Your Go Plugin
tags: ["Test Plugin", "Test Custom Plugin", "Tyk plugin", "Plugin", "Go plugin"]
menu:
  main:
    parent: "Get Started with Custom Plugins"
weight: 10
---

{{< tabs_start >}}
{{< tab_start "Self-Managed" >}}

### 1.  Log In

Log on to the Tyk Dashboard on `http://localhost:3000` using the following Bootstrapped credentials:
```
demo@tyk.io
```
and password:
```
topsecretpassword
```

Note: these are editable in `.env.example`


### 2. See the API

Once you're logged on to the Tyk Dashboard, navigate to the "APIs" screen.

You'll see a sample `Httpbin` API.

Click on "VIEW RAW DEFINITION".  Note the `custom_middleware` block is filled out, injecting the compiled Custom go plugin into the API.

### 3. Send an API Request to the API

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

Note, we see a "Foo:Bar" HTTP Header was injected by our Go plugin and echo'd back to use by the Httpbin mock server.

### 4. View Analytics!


Navigate to the Dashboard's various "API Usage Data" to view analytics on the API request!


### Summary

1. We've bootstrapped our Tyk organization.
2. We've sent an API request to the Gateway, and modified the API request in-flight using the Custom Go Plugin.

We can make changes to the custom Go Plugin and run `make build` in order to test the new changes.

{{< tab_end >}}
{{< tab_start "Open Source" >}}

Coming soon.

{{< tab_end >}}
{{< tabs_end >}}

### Down

Please run ```make down```  to bring down the stack.