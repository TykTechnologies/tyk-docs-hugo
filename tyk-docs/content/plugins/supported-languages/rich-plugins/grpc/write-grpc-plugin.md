---
date: 2017-03-24T13:32:12Z
title: How to write gRPC Plugins
menu:
  main:
    parent: "gRPC"
weight: 1 
aliases: 
  -  "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin"
  -  plugins/rich-plugins/grpc/write-grpc-plugin
---

This guide explains an overview of the process for developing and configuring gRPC plugins for Tyk Gateway.

## Overview

1. **Implement gRPC Server**: Use the [Tyk protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) to generate the bindings for your target language and implement a gRPC server that handles the [Dispatcher](https://github.com/TykTechnologies/tyk/blob/8ff2add67373d369efda193344ad342fc43ffea5/coprocess/proto/coprocess_object.proto#L28) service. The *Dispatcher* service handles a request issued by Tyk Gateway. 

2. **Configure Tyk Gateway**: Configure Tyk Gateway to integrate with your gRPC Server and an optional external secured webserver, from which API plugin configuration can be downloaded:
    1. **gRPC Server**
    Specify the endpoint of your gRPC server where Tyk Gateway will send requests for plugin execution. This ensures seamless integration between Tyk Gateway and your gRPC server.

    2. **Webserver (optional)**
    Optionally, configure a web server from which plugin bundles can be downloaded. For gRPC plugins, the bundle containing the manifest.json can be fetched remotely from a web server. Alternatively, plugin hooks can be configured directly within the Tyk API Definition's *custom_middleware* section. This flexibility allows for seamless integration of custom logic without the necessity of a dedicated web server, particularly beneficial for simpler setups.

3. **Configure API**: Configure your API to enable Tyk Gateway to issue requests to your gRPC server for a required set of plugin hooks:

    - You can configure your plugins directly within the `custom_middleware` section of your Tyk API Definition, or via Tyk Dashboard. 
    - Alternatively, your API configuration can be bundled in a zip file and hosted on an external webserver and download by Tyk Gateway. If you wish to bundle your plugin, ensure it contains only the `manifest.json` file, containing the configuration for the plugins that Tyk Gateway should request from the gRPC server. It does not include the source code for the plugins.
 
4. **Test API**
Test that the Gateway integrates with your gRPC server for the plugin hooks that you have configured for your API. It is crucial to ensure the security and reliability of your gRPC server. As the developer, it is your responsibility to verify that your gRPC server is secured and thoroughly tested with appropriate test coverage. Consider implementing unit tests, integration tests and other testing methodologies to ensure the robustness of your server's functionality and security measures. This step ensures that the Tyk Gateway properly communicates with your gRPC server and executes the custom logic defined by the plugin hooks.

---

## Implement gRPC server
Develop your gRPC server, using your preferred language, to handle requests from Tyk Gateway for each of the required plugin hooks. These hooks allow Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle.

### Install gRPC tools
TODO

### Generate Bindings
TODO

### Dispatcher service
Your gRPC server should implement the *Dispatcher* service to enable Tyk Gateway to integrate with your gRPC server. The Protocol Buffer Definition for the *Dispatcher* service is listed below:

```protobuf
service Dispatcher {
  rpc Dispatch (Object) returns (Object) {}
  rpc DispatchEvent (Event) returns (EventReply) {}
}
```

The *Dispatcher* service contains two RPC methods, *Dispatch* and *DispatchEvent*. Dispatch handles the requests made by Tyk Gateway for each plugin configured in your API. DispatchEvent receives notification of an event.

Your *Dispatch* RPC should inspect the request made by Tyk Gateway and implement handlers for the required plugin hooks. These hooks allow Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle, such as Pre, PostAuth, Post request etc. Tyk Protocol Buffers define the [HookType](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/coprocess_common.proto) enumeration to inspect the type of the intended gRPC plugin associated with the request. This is accessible as an attribute on the *Object* message, e.g. *object_message_instance.hook_type*.

### Developer resources

Refer to the [Tyk Protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto))protobuf and bindings for guidance. Example tutorials are available that explain how to generate the protobuf bindings and implement a server for the following languages:
- [Java]({{< ref "plugins/supported-languages/rich-plugins/grpc/request-transformation-java" >}})
- [.NET]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-dot-net" >}})
- [NodeJS]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-nodejs" >}})

There are also examples available at the following Tyk GitHub repositories:
- [Ruby](https://github.com/TykTechnologies/tyk-plugin-demo-ruby)
- [C#/.NET](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet)
 
---

## Configure Tyk Gateway

Configure Tyk Gateway to issue requests to your gRPC server and optionally, specify the URL of the web server that will serve plugin bundles.

### Configure gRPC server

Modify the root of your `tyk.conf` file to include the *coprocess_options* section, similar to that listed below:

```json
"coprocess_options": {
  "enable_coprocess": true,
  "coprocess_grpc_server": "tcp://127.0.0.1:5555",
  "grpc_authority": "localhost",
  "grpc_recv_max_size": 100000000,
  "grpc_send_max_size": 100000000
},
```

A gRPC server can configured under the `coprocess_options` setion as follows:

- `enable_coprocess`: Enables the rich plugins feature.
- `coprocess_grpc_server`: Specifies the gRPC server URL, in this example we're using TCP. Tyk will attempt a connection on startup and keep reconnecting in case of failure.
- `grpc_recv_max_size`: Specifies the message size supported by the gateway gRPC client, for receiving gRPC responses.
- `grpc_send_max_size`: Specifies the message size supported by the gateway gRPC client for sending gRPC requests.
- `grpc_authority`: The `:authority` header value, defaults to `localhost` if omitted. Allows configuration according to [RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540#section-8.1.2.3).

When using gRPC plugins, Tyk acts as a gRPC client and dispatches requests to your gRPC server. gRPC libraries usually set a default maximum size, for example the official gRPC Java library establishes a 4
MB message size [https://jbrandhorst.com/post/grpc-binary-blob-stream/](https://jbrandhorst.com/post/grpc-binary-blob-stream/).

Flags are available for establishing a message size in both directions (send and receive). For most use cases and especially if you're dealing with multiple hooks, where the same request object is dispatched, it is recommended to set both values to the same size.

### Configure Web server (optional)

Tyk Gateway can be configured to download the gRPC plugin configuration for an API from a web server. For further details related to the concept of bundling plugins please refer to [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

```json
"enable_bundle_downloader": true,
"bundle_base_url": "https://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

The following parameters can be configured: 
- `enable_bundle_downloader`: Enables the bundle downloader to download bundles from a webserver.
- `bundle_base_url`: Base URL from which to serve bundled plugins.
- `public_key_path`: Public key for bundle verification (optional)

The `public_key_path` value is used for verifying signed bundles, you may omit this if unsigned bundles are used.

---

## Configure API

Plugin hooks for your APIs in Tyk can be configured either by directly specifying them in a configuration file on the Gateway server or by hosting the configuration externally on a web server, allowing for flexible management and deployment. This section explains how to configure gRPC plugins for your API endpoints on the local Gateway or remotely from an external secured web server.

### Locally

For configurations directly embedded within the Tyk Gateway, plugin hooks can be defined within your API Definition. An example snippet from a Tyk Classic API Definition is provided below:

```json
"custom_middleware": {
    "pre": [
        {"name": "MyPreMiddleware"}
    ],
    "post": [
        {"name": "MyPostMiddleware"}
    ],
    "auth_check": {
        "name": "MyAuthCheck"
    },
    "driver": "grpc"
}
```

</br>
{{< note success >}}
**Note**

Ensure the plugin driver is configured as *grpc*. Tyk will issue a request to your gRPC server for each plugin hook that you have configured.
{{< /note >}}


### Remotely

It is possible to configure your API so that it downloads a bundled plugins configuration from an external webserver. The bundled plugin configuration is represented as a zip file.

A gRPC plugin bundle is similar to the [standard bundling mechanism](({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})). The standard bundling mechanism zips the configuration and  plugin source code, which will be executed by Tyk. Conversely, a gRPC plugin bundle contains only the configuration (manifest.json), with plugin code execution being handled independently at the gRPC server.

Bundling a gRPC plugin requires the following steps:
- Create a manifest.json
- Build a zip file that bundles your plugin
- Upload the zip file to an external secured webserver
- Configure your API to download your plugin bundle

#### Create manifest.json

The manifest.json file specifies the configuration for your gRPC plugins. An example manifest.json is listed below:

```json
{
    "file_list": [],
    "custom_middleware": {
        "pre": [{"name": "MyPreMiddleware"}],
        "post": [{"name": "MyPostMiddleware"}],
        "auth_check": {"name": "MyAuthCheck"},
        "driver": "grpc"
    },
    "checksum": "",
    "signature": ""
}
```

{{< note sucess >}}
**Note**

The source code files, *file_list*, are empty for gRPC plugins. Your gRPC server contains the source code for handling plugins.
{{< /note >}}

#### Build plugin bundle

A plugin bundle can be built using the Tyk Gateway binary and should only contain the manifest.json file:

```bash
tyk bundle build -output mybundle.zip -key mykey.pem
```

The example above generates a zip file, name `mybundle.zip`. The zip file is signed with key `mykey.pem`.

The resulting bundle file should then be uploaded to the webserver that hosts your plugin bundles.

#### Configure API

To add a gRPC plugin to your API definition, you must specify the bundle file name within the `custom_middleware_bundle` field:

```json
{
   "name": "Tyk Test API",
   ...
+  "custom_middleware_bundle": "mybundle.zip"
}
```

The value of the `custom_middleware_bundle` field will be used in combination with the gateway settings to construct a bundle URL. For example, if Tyk Gateway is configured with a webserver base URL of https://my-bundle-server.com/bundles/ then an attempt would be made to download the bundle from https://my-bundle-server.com/bundles/mybundle.zip.

---

## Test your API Endpoint

Test the API endpoint using tools like curl. Ensure that your gRPC server is running and the gRPC plugin(s) are functioning.

```bash
curl -X GET http://localhost:8080/api/path
```

Replace `http://localhost:8080/api/path?` with the actual endpoint of your API.
