---
date: 2017-03-24T15:45:13Z
title: Task 2 - Test Your Go Plugin
menu:
  main:
    parent: "Get Started with Go Plugins - Tyk Open Source"
weight: 10
---


### 1.  Bootstrap the Dashboard

Log on to the Tyk Dashboard on `http://localhost:3000` and follow the set up menu to bootstrap the Tyk organization.


### 2. Create an API

Once you're logged on to the Tyk Dashboard, navigate to the "APIs" screen.

Next, create a Tyk REST API with the below settings:

- Leave the default target URL.
- Use whatever listen path, such as `httpbin`
- Turn off authentication for the API by setting the auth mode to "Keyless" at the bottom of the page `Core APIM settings`.

### 3. Send an API Request to the API

Using the Tyk Dashboard, we've created a keyless API Definition that's now been loaded on the Tyk Gateway.

Let's send an API request to the API Gateway so it can reverse proxy to our API.

```bash
### Use the listen path from step 2
$ curl localhost:8080/httpbin/get

{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "localhost:8000",
    "User-Agent": "curl/7.79.1"
  },
  "origin": "172.17.0.1",
  "url": "http://localhost:8000/get"
}
```

We've sent an API request to the Tyk Gateway,  it's reverse-proxied it to the Upstream API, `httpbin.org` to the `get` endpoint, which echo'd back the HTTP request to us.

We can check the Analytics of this API request in the Dashboard, under the Analytics section.

### 4. Add the Go Plugin

If we inspect the sample Go plugin in `go/src/CustomGoPlugin.go`, we can see the `AddFooBarHeader` function which adds a Header "foo:bar"

In order to execute this function, we have to add it to the API definition.

Navigate back to the API we created, click on "RAW API Definition", and replace the default value for `custom_middleware` with the following:

```json
    "custom_middleware": {
      "pre": [
        {
          "name": "AddFooBarHeader",
          "path": "/opt/tyk-gateway/middleware/CustomGoPlugin.so"
        }
      ],
      "driver": "goplugin"
    }
```

And then hit update!


### 5. Send the API request again

```bash
$ curl localhost:8080/httpbin/get

{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "localhost:8000",
    "User-Agent": "curl/7.79.1",
    "Foo": "Bar"
  },
  "origin": "172.17.0.1",
  "url": "http://localhost:8000/get"
}
```

Awesome!  Our Go plugin was executed, as evident in the echo response from our default API above.


### Summary

1. We've bootstrapped our Tyk organization
2. We created our API and added the Tyk custom plugin to it.
3. We've sent an API request to the Gateway, and modified the API request in-flight using the Custom Go Plugin 

We can make changes to the custom Go Plugin and run `make build` in order to test the new changes.

