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

This document explains an overview for how to develop Tyk gRPC plugins. The necessary steps are:

1. Implement a gRPC Server
2. Configure Tyk Gateway with the following details:

  1. gRPC server
  2. Plugins webserver from which plugin bundles are downloaded (optional)

3. Configure your API with the required plugin hooks implemented by your server    

## Implement gRPC Server

Implement a gRPC server in your preferred language. Refer to Tyk's protobuf and bindings for guidance. We have provided example tutorials that explain how to generate the protobuf bindings and implement a server for the following languages:
- [Java]({{< ref "" >}})
- [.NET]({{< ref "" >}})
- [NodeJS]({{< ref "" >}})

There are also examples available at the following Tyk GitHub repositories:
- [Ruby](https://github.com/TykTechnologies/tyk-plugin-demo-ruby)
- [C#/.NET](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet)

## Configure Tyk Gateway 

Configure Tyk Gateway to use your gRPC server and optionally specify the URL of the web server that will serve plugin bundles.

### gRPC Server

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

Coprocess options are configured under the `coprocess_options` key as follows:

- `enable_coprocess`: Enables the rich plugins feature.
- `coprocess_grpc_server`: Specifies the gRPC server URL, in this example we're using TCP. Tyk will attempt a connection on startup and keep reconnecting in case of failure.
- `grpc_recv_max_size`: Specifies the message size supported by the gateway gRPC client, for receiving gRPC responses.
- `grpc_send_max_size`: Specifies the message size supported by the gateway gRPC client for sending gRPC requests.
- `grpc_authority`: The `:authority` header value, defaults to `localhost` if omitted. Allows configuration according to [RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540#section-8.1.2.3).

When using gRPC plugins, Tyk acts as a gRPC client and dispatches requests to your gRPC server. gRPC libraries usually set a default maximum size, for example the official gRPC Java library establishes a 4
MB message size [https://jbrandhorst.com/post/grpc-binary-blob-stream/](https://jbrandhorst.com/post/grpc-binary-blob-stream/).

We've added flags for establishing a message size in both directions (send and receive). For most use cases and especially if you're dealing with multiple hooks, where the same request object is dispatched, it is recommended to set both values to the same size.

### Web server for hosting plugin bundles (optional)

Tyk allows plugin bundles to be downloaded from a web server. For further details related to the concept of bundling plugins please refer to []({{< ref "" >}})

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

In the example above, we have `test-bundle` specified in the API settings. Based on that, the following bundle URL would be constructed: https://my-bundle-server.com/bundles/test-bundle.

## Configure API

Plugin hooks can be configured for your APIs as bundled or unbundled.

### Unbundled Plugin Configuration

Define plugin hooks in the API Definition. 

</br>
{{< note success >}}
**Note**

Ensure the plugin driver is configured as grpc.
{{< /note >}}

An example snippet from a Tyk Classic API Definition is provided below:

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

{{< note success >}}
**Note**

Tyk will issue a request to your gRPC server for each plugin hook configured. 
{{< /note >}}


### Bundled Plugin Configuration (Optional)

A gRPC plugin is similar to the [standard bundling mechanism](({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})) that we use for the rest of our rich plugins. A standard rich plugin bundle contains the actual plugin source code, which will be executed by Tyk. Conversely, a gRPC plugin bundle contains only a custom middleware definition (manifest.json), with code execution being handled independently at the gRPC server.

Bundling a plugin requires the following steps:
- Create a manifest.json
- Build a zip file that bundles your plugin
- Upload the zip file to a webserver that hosts your plugin bundles
- Configure your API to download your plugin bundle

#### Create manifest.json

An example manifest.json is listed below:

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

#### Build plugin bundle

A plugin bundle can be built using the Tyk Gateway binary and should only contain the manifest.json file:

```bash
tyk bundle build -output mybundle.zip -key mykey.pem
```

The example above generates a zip file, name `mybundle.zip`. The zip file is signed with key `mykey.pem`.

The resulting bundle file should then be uploaded to the webserver that hosts your plugin bundles.

#### Configure API

To add a gRPC plugin to your API definition, you must specify the bundle file name (excluding the .zip suffix) from within the `custom_middleware_bundle` field:

```yaml
{
   "name": "Tyk Test API",
   ...
+  "custom_middleware_bundle": "mybundle"
}
```

The value of the field will be used in combination with the gateway settings to construct a bundle URL.
For example, if the Gateway was configured with a webserver base URL of https://my-bundle-server.com/bundles/ then an attempt would be made to download the bundle from https://my-bundle-server.com/bundles/mybundle.zip.


## Test your API Endpoint

Test the API endpoint using tools like curl. Ensure that your gRPC server is running and the gRPC plugin(s) are functioning.

```bash
curl -X GET http://localhost:8080/api/path
```

Replace `http://localhost:8080/api/path?` with the actual endpoint of your API.
