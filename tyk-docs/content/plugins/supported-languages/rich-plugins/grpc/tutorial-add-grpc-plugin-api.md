---
date: 2017-03-24T13:28:45Z
title: Tutorial Add a gRPC plugin to your API
menu:
  main:
    parent: "gRPC"
weight: 0 
aliases: 
  - "/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api"
---

## API settings

To add a gRPC plugin to your API definition, you must specify the bundle name using the `custom_middleware_bundle` field:

```diff
{
   "name": "Tyk Test API",
   ...
+  "custom_middleware_bundle": "test-bundle"
}
```

The value of the field will be used in combination with the gateway settings to construct a bundle URL.

## Global settings

To enable gRPC plugins you need to add the following block to `tyk.conf`:

```{.copyWrapper}
"coprocess_options": {
  "enable_coprocess": true,
  "coprocess_grpc_server": "tcp://127.0.0.1:5555",
  "grpc_authority": "localhost",
  "grpc_recv_max_size": 100000000,
  "grpc_send_max_size": 100000000
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

Coprocess options are configured under the `coprocess_options` key as follows:

- `enable_coprocess` - enables the rich plugins feature.
- `coprocess_grpc_server` - specifies the gRPC server URL, in this example we're using TCP. Tyk will attempt a connection on startup and keep reconnecting in case of failure.
- `grpc_recv_max_size` - specifies the message size supported by the gateway gRPC client, for receiving gRPC responses,
- `grpc_send_max_size` - specifies the message size supported by the gateway gRPC client for sending gRPC requests,
- `grpc_authority` - The `:authority` header value, defaults to `localhost` if omitted. Allows configuration as per [RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540#section-8.1.2.3).

When using gRPC plugins, Tyk acts as a gRPC client and dispatches
requests to your gRPC server. gRPC libraries usually set a default
maximum size, for example the official gRPC Java library establishes a 4
MB message size
[https://jbrandhorst.com/post/grpc-binary-blob-stream/](https://jbrandhorst.com/post/grpc-binary-blob-stream/).

We've added flags for establishing a message size in both directions
(send and receive). For most use cases and especially if you're dealing
with multiple hooks, where the same request object is passed through
them, it's recommended to set both values to the same size.

The remaining options are related to the bundle downloader:

- `enable_bundle_downloader` - enables the bundle downloader.
- `bundle_base_url` - is a base URL that will be used to download the bundle
- `public_key_path` - sets a public key for bundle verification (optional)

The `public_key_path` value is used for verifying signed bundles, you may omit this if unsigned bundles are used.

In the example above, we have `test-bundle` specified in the API settings. Based on that, the following bundle
URL would be constructed: `http://my-bundle-server.com/bundles/test-bundle`.

## ReturnOverrides

From version 1.3.6, you can now  override response code, headers and body using ReturnOverrides. See the [Extend ReturnOverides](https://github.com/TykTechnologies/tyk/pull/763) sample for details.
