---
title: "Custom Plugins"
date: 2024-08-07
tags: ["Tyk", "Kubernetes", "Plugins", "Javascript Plugins", "API Gateway Configuration"]
description: "This documentation explains how to configure plugins using Tyk Operator"
keywords: [ "Tyk Operator", "custom plugins", "plugins" ]
---

This guide explains how to configure a plugin within an API Definition. The souce code for the API Definition is located on the Gateway file system.

In this example we will create a JavaScript plugin that will inject a request header *Hello* with a value of *World*. This will be configured as a pre request hook.

## 1. Create source code file

The first step is to create the plugin source code. 

```javascript
var exampleJavaScriptMiddlewarePreHook = new TykJS.TykMiddleware.NewMiddleware({});

exampleJavaScriptMiddlewarePreHook.NewProcessRequest(function(request, session) {
    // You can log to Tyk console output by calling the built-in log() function:
    log("Hello from the Tyk JavaScript middleware pre hook function")
    
    // Add a request header
    request.SetHeaders["Hello"] = "World";

    // You must return both the request and session metadata 
    return exampleJavaScriptMiddlewarePreHook.ReturnData(request, {}  );
});
```

Copy the source code above and save it to the following file on the Gateway file system at `/opt/tyk-gateway/middleware/example-javascript-middleware.js`


## 2. Create API Definition Resource

The example API Definition resource listed below listens on path */httpbin* and forwards requests upstream to *http://httpbin.org*.

```yaml {linenos=table,hl_lines=["14-18"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  custom_middleware:
    driver: otto # Javascript driver name
    pre:
      - name: "exampleJavaScriptMiddlewarePreHook"
        path: "middleware/example-javascript-middleware.js"
```

At lines 14-18 we can see the *custom_middleware* section contains the configuration for our plugin:

- The *driver* configuration parameter is set to *otto* at line 15, since our plugin is a Javascript plugin.
- A *pre* plugin hook configuration block is specified at line 16, containing the *name* and *path* for our plugin. The name matches the name of the middleware variable in the source file. The path contains the path to the source file, relative to the base installation folder, i.e `/opt/tyk-gateway`.

Save the API Definition to file and create the APIDefinition resource:  

```bash
$ kubectl apply -f path_to_your_apidefinition.yaml
apidefinition.tyk.tyk.io/httpbin created
```

## 3. Test Plugin

We can test that our plugin injects a *Hello* header with a corresponding value of *World* by using the curl command:

```bash
$ curl http://localhost:8080/httpbin/headers
  {
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip",
      "Hello": "World",
      "Host": "httpbin.org"
    }
  }
```

The header `"Hello: World"` should be injected by the custom plugin.
