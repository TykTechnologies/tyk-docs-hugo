---
date: 2017-03-24T13:28:45Z
title: Tutorial Add a gRPC plugin to your API
menu:
  main:
    parent: "gRPC"
weight: 0 
aliases: 
  -  "/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api"
  - "/plugins/supported-languages/rich-plugins/grpc/grpc-plugins-tyk/"
---

## API settings

To add a gRPC plugin to your API, you must specify the bundle name using the `custom_middleware_bundle` field:

```{.json}
{
  "name": "Tyk Test API",
  "api_id": "1",
  "org_id": "default",
  "definition": {
    "location": "header",
    "key": "version"
  },
  "auth": {
      "auth_header_name": "authorization"
  },
  "use_keyless": true,
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "expires": "3000-01-02 15:04",
        "use_extended_paths": true,
        "extended_paths": {
          "ignored": [],
          "white_list": [],
          "black_list": []
        }
      }
    }
  },
  "proxy": {
    "listen_path": "/quickstart/",
    "target_url": "http://httpbin.org",
    "strip_listen_path": true
  },
  "custom_middleware_bundle": "test-bundle"
}
```

## Global settings

To enable gRPC plugins you need to add the following block to `tyk.conf`:

```{.copyWrapper}
"coprocess_options": {
  "enable_coprocess": true,
  "coprocess_grpc_server": "tcp://127.0.0.1:5555",
  "grpc_recv_max_size": 100000000,
  "grpc_send_max_size": 100000000
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

`enable_coprocess` enables the rich plugins feature.

`coprocess_grpc_server` specifies the gRPC server URL, in this example we're using TCP. Tyk will attempt a connection on startup and keep reconnecting in case of failure.

`coprocess_options.grpc_recv_max_size` 
`coprocess_options.grpc_send_max_size`

When using gRPC plugins, Tyk acts as a gRPC client and dispatches requests to your gRPC server. gRPC libraries usually set a default maximum size, for example the official gRPC Java library establishes a 4 MB message size [https://jbrandhorst.com/post/grpc-binary-blob-stream/](https://jbrandhorst.com/post/grpc-binary-blob-stream/). We've added flags for establishing a message size in both directions (send and receive). For most use cases and especially if you're dealing with multiple hooks, where the same request object is passed through them, it's recommended to set both values to the same size."

`enable_bundle_downloader` enables the bundle downloader.

`bundle_base_url` is a base URL that will be used to download the bundle, in this example we have "test-bundle" specified in the API settings, Tyk will fetch the following URL: `http://my-bundle-server.com/bundles/test-bundle`.

`public_key_path` sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used.

## ReturnOverrides
From version 1.3.6, you can now  override response code, headers and body using ReturnOverrides. See the [Extend ReturnOverides](https://github.com/TykTechnologies/tyk/pull/763) sample for details.
