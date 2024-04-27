---
date: 2017-03-24T13:32:12Z
title: Writing gRPC Plugins
menu:
  main:
    parent: "gRPC"
weight: 1 
aliases: 
  - /plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin
  - /plugins/supported-languages/rich-plugins/grpc/tutorial-add-grpc-plugin-api
  - /plugins/rich-plugins/grpc/write-grpc-plugin
---

This document serves as a developer's guide for understanding the key concepts and practical steps for writing and configuring gRPC plugins for Tyk Gateway. It provides technical insights and practical guidance to seamlessly integrate Tyk plugins into your infrastructure through gRPC. The goal is to equip developers with the knowledge and tools needed to effectively utilise gRPC for enhancing Tyk Gateway functionalities.

This comprehensive guide covers essential tasks, including:

1. **Developing a gRPC Server:** Learn how to develop a gRPC server using [Tyk protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto). The gRPC server facilitates the execution of Tyk plugins, which offer custom middleware for various phases of the API request lifecycle. By integrating these plugins, developers can enable Tyk Gateway with enhanced control and flexibility in managing API requests, allowing for fine-grained customisation and tailored processing at each stage of the request lifecycle.

2. **Configuring Tyk Gateway:** Set up Tyk Gateway to communicate with your gRPC Server and, optionally, an external secured web server hosting the gRPC plugin bundle for API configurations. Configure Tyk Gateway to fetch the bundle configured for an API from the web server, enabling seamless integration with gRPC plugins. Specify connection settings for streamlined integration.

3. **API Configuration:** Customise API settings within Tyk Gateway to configure gRPC plugin utilisation. Define plugin hooks directly within the API Definition or remotely via an external web server for seamless request orchestration. Tyk plugins provide custom middleware for different phases of the API request lifecycle, enhancing control and flexibility.

4. **API Testing:** Test that Tyk Gateway integrates with your gRPC server for the plugins configured for your API. 

---

## Develop gRPC server

Develop your gRPC server, using your preferred language, to handle requests from Tyk Gateway for each of the required plugin hooks. These hooks allow Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle. 

### Prerequisites

The following prerequisites are necessary for developing a gRPC server that integrates with Tyk Gateway.

##### Tyk gRPC Protocol Buffers

A collection of [Protocol Buffer](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) messages are available in the Tyk Gateway repository to allow Tyk Gateway to integrate with your gRPC server, requesting execution of plugin code. These messages establish a standard set of data structures that are serialised between Tyk Gateway and your gRPC Server. Developers should consult the [Rich Plugins Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) page for further details.

##### Protocol Buffer Compiler

The protocol buffer compiler, `protoc`, should be installed to generate the service and data structures in your preferred language(s) from the [Tyk gRPC Protocol Buffer](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) files. Developers should consult the [installation](https://grpc.io/docs/protoc-installation/) documentation at [grpc.io](https://grpc.io/) for an explanation of how to install `protoc`.

### Generate Bindings

Generate the bindings (service and data structures) for your target language using the `protoc` compiler. Tutorials are available at [protobuf.dev](https://protobuf.dev/getting-started/) for your target language.

### Implement service

Your gRPC server should implement the *Dispatcher* service to enable Tyk Gateway to integrate with your gRPC server. The Protocol Buffer definition for the *Dispatcher* service is listed below:

```protobuf
service Dispatcher {
  rpc Dispatch (Object) returns (Object) {}
  rpc DispatchEvent (Event) returns (EventReply) {}
}
```

The *Dispatcher* service contains two RPC methods, *Dispatch* and *DispatchEvent*. Dispatch handles a requests made by Tyk Gateway for each plugin configured in your API. DispatchEvent receives notification of an event.

Your *Dispatch* RPC should handle the request made by Tyk Gateway, implementing custom middleware for the intended plugin hooks. Each plugin hook allows Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle, such as Pre, PostAuth, Post, Response etc. The Tyk Protocol Buffers define the [HookType](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/coprocess_common.proto) enumeration to inspect the type of the intended gRPC plugin associated with the request. This is accessible as an attribute on the *Object* message, e.g. *object_message_instance.hook_type*.

### Developer resources

Consult the [Tyk protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) for the definition of the service and data structures that enable integration of Tyk gateway with your gRPC server. Tyk provides pre-generated [bindings](https://github.com/TykTechnologies/tyk/tree/master/coprocess/bindings) for C++, Java, Python and Ruby.

Example tutorials are available that explain how to generate the protobuf bindings and implement a server for [Java]({{< ref "plugins/supported-languages/rich-plugins/grpc/request-transformation-java" >}}), [.NET]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-dot-net" >}}) and [NodeJS]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-nodejs" >}}).

Tyk Github repositories are also available with examples for [Ruby](https://github.com/TykTechnologies/tyk-plugin-demo-ruby) and [C#/.NET](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet)
 
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

Configuration parameters are available for establishing a message size in both directions (send and receive). For most use cases and especially if you're dealing with multiple hooks, where the same request object is dispatched, it is recommended to set both values to the same size.

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

Plugin hooks for your APIs in Tyk can be configured either by directly specifying them in a configuration file on the Gateway server or by hosting the configuration externally on a web server. This section explains how to configure gRPC plugins for your API endpoints on the local Gateway or remotely from an external secured web server.

### Local

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


### Remote

It is possible to configure your API so that it downloads a bundled configuration of your plugins from an external webserver. The bundled plugin configuration is contained within a zip file.

A gRPC plugin bundle is similar to the [standard bundling mechanism](({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})). The standard bundling mechanism zips the configuration and plugin source code, which will be executed by Tyk. Conversely, a gRPC plugin bundle contains only the configuration (manifest.json), with plugin code execution being handled independently by the gRPC server.

Bundling a gRPC plugin requires the following steps:
- Create a manifest.json thst contains the configuration of your plugins
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

It is crucial to ensure the security and reliability of your gRPC server. As the developer, it is your responsibility to verify that your gRPC server is secured and thoroughly tested with appropriate test coverage. Consider implementing unit tests, integration tests and other testing methodologies to ensure the robustness of your server's functionality and security measures. This step ensures that the Tyk Gateway properly communicates with your gRPC server and executes the custom logic defined by the plugin hooks.

Test the API endpoint using tools like *Curl* or *Postman*. Ensure that your gRPC server is running and the gRPC plugin(s) are functioning. An example using *Curl* is listed below:

```bash
curl -X GET https://www.your-gateway-server.com:8080/api/path
```

Replace `https://www.your-gateway-server.com:8080/api/path` with the actual endpoint of your API.

---

## Summary

This guide has explained the key concepts and process for writing gRPC plugins that integrate with Tyk Gateway. The following explanations have been given:

- Prerequisites for developing a gRPC server for your target language.
- The *Dispatcher* service interface.
- How to configure Tyk Gateway to integrate with your gRPC server.
- How to configure Tyk Gateway with an optional external web server for fetching plugins configuration.
- How to configure gRPC plugins for your APIs.
- How to test your API integrates with your gRPC server using curl.

---

## Whats Next?

- Consult the [Protocol Buffer messages]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) that Tyk Gateway uses when making a request to a gRPC server.
- Visit tutorial guides that explain how to implement a [Java]({{< ref "plugins/supported-languages/rich-plugins/grpc/request-transformation-java" >}}), [.NET]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-dot-net" >}}) and [NodeJS]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-nodejs" >}}) gRPC server.
- Visit our [plugins hub]({{< ref "plugins/plugin-hub" >}}) to explore further gRPC development examples and resources.

---