---
date: 2017-03-24T13:32:12Z
title: How to write gRPC Plugins
menu:
  main:
    parent: "gRPC"
weight: 1 
aliases: 
  -  "/plugins/rich-plugins/grpc/write-grpc-plugin"
---

## <a name="server"></a> The gRPC server

A gRPC server must be implemented in the language of your choice, we have prepared different tutorials for some of them:

*   [Ruby](https://github.com/TykTechnologies/tyk-plugin-demo-ruby)
*   [C#/.NET](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet)

## Serving
You can serve gRPC plugins by simply adding hooks to the `custom_middleware` in the API Definition, or by bundling.  Read more about bundles below.

API Definition example:
```{.copyWrapper}
"custom_middleware": {
    "pre": [
      {
        "name": "MyPreMiddleware"
      }
    ],
    "post": [
      {
        "name": "MyPostMiddleware"
      }
    ],
    "auth_check": {
      "name": "MyAuthCheck"
    },
    "driver": "grpc"
  },
  ```

  and in the root of your tyk.conf:
  ```
  "coprocess_options" : {
    "enable_coprocess":   true,
    "coprocess_grpc_server": "tcp://localhost:5555"
  },
  ```

  Now Tyk will fire 3 different hooks to your gRPC server hosted on `localhost:5555` in the same API request.

## <a name="bundle"></a> Bundle

[Bundle reading](/plugins/how-to-serve/plugin-bundles/)

A gRPC plugin can use the standard bundling mechanism that we use for the rest of our rich plugins. The essential difference with a standard rich plugin bundle is that the the bundle contains the actual code, which will be executed by Tyk, whereas a gRPC plugin bundle contains just a custom middleware definition, and you handle the execution of your code independently, e.g. a gRPC server, listening on port 8080.

This is what a manifest could look like:

```{.copyWrapper}
{
  "file_list": [
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "MyPreMiddleware"
      }
    ],
    "post": [
      {
        "name": "MyPostMiddleware"
      }
    ],
    "auth_check": {
      "name": "MyAuthCheck"
    },
    "driver": "grpc"
  },
  "checksum": "",
  "signature": ""
}
```

After saving this file as `manifest.json`, build it using [tyk-cli](https://github.com/TykTechnologies/tyk-cli):

```{.copyWrapper}
tyk-cli bundle build -output mybundle.zip -key mykey.pem
```

For Tyk 2.8 and upwards use the bundle functionaliy integrated as part of the Tyk Gateway binary, located in "/opt/tyk-gateway/bin/tyk` by default:
```{.copyWrapper}
tyk bundle build -output mybundle.zip -key mykey.pem
```