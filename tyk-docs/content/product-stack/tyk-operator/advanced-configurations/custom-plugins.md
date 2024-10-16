---
title: "Custom Plugins"
date: 2024-08-07
tags: ["Tyk", "Kubernetes", "Plugins", "Javascript Plugins", "API Gateway Configuration"]
description: "This documentation explains how to configure plugins using Tyk Operator"
keywords: ["Tyk Operator", "custom plugins", "plugins"]
---

This guide explains how to configure one or more custom plugins where the source code and associated configuration is
co-located on Tyk Gateway’s file system. The process is similar to that for configuring the API Definition of a Tyk
Classic API to use custom plugins.

---

## Overview

Using Tyk Classic APIs, developers can implement API-level custom plugins that can be optionally setup to execute for
each of the following [hooks]({{< ref "plugins/plugin-types/plugintypes#plugin-and-hook-types" >}}) in the API request
lifecycle: [Pre (Request)]({{< ref "plugins/plugin-types/request-plugins" >}}), [Authentication]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}}),
[Post (Request)]({{< ref "plugins/plugin-types/request-plugins" >}}), [Post
Authentication]({{< ref "plugins/plugin-types/request-plugins" >}}), [Response]({{< ref "plugins/plugin-types/response-plugins" >}})
and [Analytics]({{< ref "plugins/plugin-types/analytics-plugins" >}}). Subsequently, users can execute, or “hook”, their
plugin into these phases of the API request lifecycle based on their specific use case.

This document explains how to configure the following plugin types with different drivers (plugin languages):

- Pre (Request)
- Authentication
- Post-Auth (Request)
- Post (Request)
- Response

Please refer to [Analytics Plugins]({{< ref "plugins/plugin-types/analytics-plugins" >}}) to learn how to configure Analytics
plugins using Tyk Operator.

---

## How It Works {#tyk-classic}

In Tyk Classic APIs, the _custom_middleware_ section of the Tyk Classic API Definition is where you configure plugins
that will run at different points during the lifecycle of an API request.

The table below illustrates the Tyk Classic API configuration parameters that correspond to each phase of the API
request lifecycle:

| Phase     | Description                                                               | Config Value  |
| --------- | ------------------------------------------------------------------------- | ------------- |
| Pre       | Occurs before main request processing.                                    | pre           |
| Auth      | Custom authentication can be handled during this phase.                   | auth_check    |
| Post Auth | Occurs after key authentication                                           | post_key_auth |
| Post      | Occurs after the main request processing but before the response is sent. | post          |
| Response  | Occurs after the main request processing but before the response is sent. | response      |

The example configuration below illustrates how to set up multiple plugins for different phases of the request
lifecycle:

```json {linenos=true, linenostart=1}
{
  "custom_middleware": {
    "pre": [
      {
        "name": "PreHook1",
        "path": "/path/to/plugin1.so",
        "require_session": false,
        "raw_body_only": false
      }
    ],
    "auth_check": {
      "name": "AuthCheck",
      "path": "/path/to/plugin.so",
      "require_session": false,
      "raw_body_only": false
    },
    "post_key_auth": [
      {
        "name": "PostKeyAuth",
        "path": "/path/to/plugin.so",
        "require_session": false,
        "raw_body_only": false
      }
    ],
    "post": [
      {
        "name": "PostHook1",
        "path": "/path/to/plugin1.so",
        "require_session": false,
        "raw_body_only": false
      },
      {
        "name": "PostHook2",
        "path": "/path/to/plugin2.so",
        "require_session": false,
        "raw_body_only": false
      }
    ],
    "response": [
      {
        "name": "ResponseHook",
        "path": "/path/to/plugin.so",
        "require_session": false,
        "raw_body_only": false
      }
    ],
    "driver": "goplugin"
  }
}
```

In the `custom_middleware` section of the API definition above we can see that there are Golang custom authentication
(`auth_check`), post authentication (`post_key_auth`), post, pre and response plugins configured.

It can be seen that each plugin is configured with the specific function name and associated source file path of the
file that contains the function. Furthermore, each lifecycle phase can have a list of plugins configured, allowing for
complex processing workflows. For example, you might develop one plugin for logging and another for modifying the
request in the pre request phase.

The `driver` configuration parameter describes the plugin implementation language. Please refer to the [supported
languages]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}) section for list of supported plugin driver names.

Each plugin can have additional settings, such as:

- `raw_body_only`: When true, indicates that only the raw body should be processed.
- `require_session`: When true, indicates that session metadata will be available to the plugin. This is applicable only
  for post, post authentication and response plugins.

### Unsupported

##### Per-Endpoint Plugins

At the endpoint-level, Tyk provides the facility to attach a custom Golang plugin at the end of the request processing
chain (immediately before the API-level post-plugin is executed). Please note that
[per-endpoint]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) level plugins are not currently
supported by Tyk Operator.

---

## Example: Configure Custom Plugins (JavaScript) With Tyk Operator

In this example we will create a JavaScript plugin that will inject a request header _Hello_ with a value of _World_.
This will be configured as a pre request [hook]({{< ref "" >}}).

### 1. Implement Plugin

The first step is to create the plugin source code.

```javascript
var exampleJavaScriptMiddlewarePreHook = new TykJS.TykMiddleware.NewMiddleware({});

exampleJavaScriptMiddlewarePreHook.NewProcessRequest(function (request, session) {
  // You can log to Tyk console output by calling the built-in log() function:
  log("Hello from the Tyk JavaScript middleware pre hook function");

  // Add a request header
  request.SetHeaders["Hello"] = "World";

  // You must return both the request and session metadata
  return exampleJavaScriptMiddlewarePreHook.ReturnData(request, {});
});
```

Copy the source code above and save it to the following file on the Gateway file system at
`/opt/tyk-gateway/middleware/example-javascript-middleware.js`

### 2. Create API Definition Resource

The example API Definition resource listed below listens on path _/httpbin_ and forwards requests to upstream
*http://httpbin.org*.

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

At lines 14-18 we can see the _custom_middleware_ section contains the configuration for our plugin:

- The `driver` configuration parameter is set to `otto` at line 15, since our plugin is a Javascript plugin. For other
  valid values please refer to the [plugins driver page]({{< ref "plugins/supported-languages#plugin-driver-names" >}}).
- A plugin hook configuration block is specified at line 16, containing the `name` and `path` for our plugin. The plugin
  configuration block identifies the "hook" or phase in the API request lifecycle when Tyk Gateway will execute the
  plugin. In the example above the configuration block is for a `pre` request plugin that will be executed before any
  middleware. Valid values are the same as the [Tyk Classic API Definition]({{< ref "#tyk-classic" >}}) equivalent, i.e.
  `pre`, `auth_check`, `post`, `post-auth` and `response`. We can see that the following fields are set within the `pre`
  plugin hook configuration object:

  - The `name` field represents the name of the function that implements the plugin in your source code. For Javascript
    plugins this must match the name of the middleware object that was created. In the example above we created the
    middleware object, `exampleJavaScriptMiddlewarePreHook`, by calling
    `var exampleJavaScriptMiddlewarePreHook = new TykJS.TykMiddleware.NewMiddleware({});`.
  - The `path` field contains the path to the source file `middleware/example-javascript-middleware.js`, relative to the
    base installation folder, i.e `/opt/tyk-gateway`.

Save the API Definition to file and create the APIDefinition resource:

```bash
$ kubectl apply -f path_to_your_apidefinition.yaml
apidefinition.tyk.tyk.io/httpbin created
```

### 3. Test Plugin

We can test that our plugin injects a _Hello_ header with a corresponding value of _World_ by using the curl command:

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

---

## Example: Configure Custom Plugins (Python) using plugin bundles via Tyk Operator

Tyk Operator also supports configuring custom plugins using plugin bundles, where the source code and associated
configuration is packaged into a zip file and uploaded to a remote webserver. Tyk Gateway will then download, extract,
cache and execute the plugin bundles for each of the configured phases of the [API
request lifecycle]({{< ref "concepts/middleware-execution-order" >}}).

For a detailed guide, check out our blog post
[How to Deploy Python Plugins in Tyk Running on Kubernetes](https://tyk.io/blog/how-to-deploy-python-plugins-in-tyk-running-on-kubernetes/),
which walks you through all the steps required to create Python [plugin
bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}), load them into the Tyk Gateway, and configure an API
Definition to use them with the Tyk Operator.
