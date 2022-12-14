---
date: 2017-03-24T13:28:45Z
title: Create Custom Authentication Plugin with NodeJS
menu:
  main:
    parent: "gRPC"
weight: 3 
aliases: 
  - "/plugins/rich-plugins/grpc/custom-auth-nodejs"
---

## Introduction

This tutorial will guide you through the creation of a custom authentication plugin for Tyk with a gRPC based plugin written in NodeJS.

For additional information about gRPC, check the official documentation [here](https://grpc.io/docs/guides/index.html).

## Requirements

* Tyk Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here](https://tyk.io/docs/get-started/with-tyk-on-premise/installation/) for more installation options.
* The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli](https://github.com/TykTechnologies/tyk-cli)
* In Tyk 2.8 and upwards the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
* * NodeJS v6.x.x [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 


## What is gRPC?

gRPC is a very powerful framework for RPC communication across different languages. It was created by Google and makes heavy use of HTTP2 capabilities and the Protocol Buffers serialisation mechanism.

## Why Use it for Plugins?
When it comes to built-in plugins, we have been able to integrate several languages like Python, JavaScript & Lua in a native way: this means the middleware you write using any of these languages runs in the same process. For supporting additional languages we have decided to integrate gRPC connections and perform the middleware operations outside of the Tyk process. The flow of this approach is as follows: 

* Tyk receives a HTTP request.
* Your gRPC server performs the middleware operations (for example, any modification of the request object).
* Your gRPC server sends the request back to Tyk.
* Tyk proxies the request to your upstream API.

The sample code that we'll use implements a very simple authentication layer using NodeJS and the proper gRPC bindings generated from our Protocol Buffers definition files.

![gRPC Auth Diagram][5]

## Create the Plugin

### Setting up the NodeJS Project

We will use the NPM tool to initialize our project, follow the steps provided by the `init` command:

```{.copyWrapper}
cd ~
mkdir tyk-plugin
cd tyk-plugin
npm init
```

Now we'll add the gRPC package for this project:

```{.copyWrapper}
npm install --save grpc
```

### gRPC Tools and Bindings Generation

Typically to use gRPC and Protocol Buffers you need to use a code generator and generate bindings for the target language that you're using. For this tutorial we'll skip this step and use the dynamic loader that's provided by the NodeJS gRPC library, this mechanism allows a program to load Protocol Buffers definitions directly from `.proto` files, see [this section](https://grpc.io/docs/tutorials/basic/node.html#loading-service-descriptors-from-proto-files) in the gRPC documentation for more details.

To fetch the required `.proto` files, you may use a official repository where we keep the Tyk Protocol Buffers definition files:

```{.copyWrapper}
cd ~/tyk-plugin
git clone https://github.com/TykTechnologies/tyk-protobuf
```


### Server Implementation

Now we're ready to implement our gRPC server, create a file called `main.js` in the project's directory

Add the following code to `main.js`.

```{.copyWrapper}
const grpc = require('grpc'),
  resolve = require('path').resolve

const tyk = grpc.load({
  file: 'coprocess_object.proto',
  root: resolve(__dirname, 'tyk-protobuf/proto')
}).coprocess

const listenAddr = '127.0.0.1:5555',
    authHeader = 'Authorization'
    validToken = '71f6ac3385ce284152a64208521c592b'

// The dispatch function is called for every hook:
const dispatch = (call, callback) => {
  var obj = call.request
  // We dispatch the request based on the hook name, we pass obj.request which is the coprocess.Object:
  switch (obj.hook_name) {
    case 'MyPreMiddleware':
      preMiddleware(obj, callback)
      break
    case 'MyAuthMiddleware':
      authMiddleware(obj, callback)
      break
    default:
      callback(null, obj)
      break
  }
}

const preMiddleware = (obj, callback) => {
  var req = obj.request

  // req is the coprocess.MiniRequestObject, we inject a header using the "set_headers" field:
  req.set_headers = {
    'mycustomheader': 'mycustomvalue'
  }

  // Use this callback to finish the operation, sending back the modified object:
  callback(null, obj)
}

const authMiddleware = (obj, callback) => {
  var req = obj.request

  // We take the value from the "Authorization" header:
  var token = req.headers[authHeader]

  // The token should be attached to the object metadata, this is used internally for key management:
  obj.metadata = {
    token: token
  }

  // If the request token doesn't match the  "validToken" constant we return the call:
  if (token != validToken) {
    callback(null, obj)
    return
  }

  // At this point the token is valid and a session state object is initialized and attached to the coprocess.Object:
  var session = new tyk.SessionState()
  session.id_extractor_deadline = Date.now() + 100000000000
  obj.session = session
  callback(null, obj)
}

main = function() {
  server = new grpc.Server()
  server.addService(tyk.Dispatcher.service, {
      dispatch: dispatch
  })
  server.bind(listenAddr, grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
```


To run the gRPC server run:

```{.copyWrapper}
node main.js
```

The gRPC server will listen on port `5555` (see the `listenAddr` constant). In the next steps we'll setup the plugin bundle and modify Tyk to connect to our gRPC server.


## Setting up the Plugin Bundle

We need to create a manifest file within the `tyk-plugin` directory. This file contains information about our plugin and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to contain the following:

```{.copyWrapper}
{
  "custom_middleware": {
    "driver": "grpc",
    "auth_check": {
      "name": "MyAuthMiddleware",
      "path": "",
      "raw_body_only": false,
      "require_session": false
    }
  }
}
```

* The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `auth_check` hook for this tutorial. For other hooks see [here]({{ ref "plugins/supported-languages/rich-pluginsrich-plugins-work#coprocess-dispatcher---hooks" >}}).
* The `name` field references the name of the function that we implement in our plugin code - `MyAuthMiddleware`. The implemented dispatcher uses a switch statement to handle this hook, and calls the `authMiddleware` function in `main.js`.
* The `path` field is the path to the middleware component.
* The `raw_body_only` field 
* The `require_session` field, if set to `true` gives you access to the session object. It will be supplied as a session variable to your middleware processor function

To bundle our plugin run the following command in the `tyk-plugin` directory. Check your tyk-cli install path first:

```{.copyWrapper}
/opt/tyk-gateway/utils/tyk-cli bundle build -y
```

For Tyk 2.8 use:
```{.copyWrapper}
/opt/tyk-gateway/bin/tyk bundle build -y
```

A plugin bundle is a packaged version of the plugin. It may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. 

For more information on the Tyk CLI tool, see [here]({{ ref "plugins/supported-languages/rich-pluginsplugin-bundles#using-the-bundler-tool" >}}).

You should now have a `bundle.zip` file in the `tyk-plugin` directory.

## Publish the Plugin

To publish the plugin, copy or upload `bundle.zip` to a local web server like Nginx, Apache or storage like Amazon S3. For this tutorial we'll assume you have a web server listening on `localhost` and accessible through `http://localhost`.

{{< include "grpc-include" >}}


## What's Next?

In this tutorial we learned how Tyk gRPC plugins work. For a production-level setup we suggest the following:

* Configure an appropriate web server and path to serve your plugin bundles.











[1]: https://tyk.io/docs/get-started/with-tyk-on-premise/installation/
[2]: https://github.com/TykTechnologies/tyk-cli
[3]: /img/dashboard/system-management/plugin_options.png
[4]: /img/dashboard/system-management/plugin_auth_mode.png
[5]: /img/dashboard/system-management/custom_grpc_authentication.png





