---
---

## Configure Tyk

You will need to modify the Tyk global configuration file `tyk.conf` to use gRPC plugins. The following block should be present in this file:

```{.copyWrapper}
"coprocess_options": {
    "enable_coprocess": true,
    "coprocess_grpc_server": "tcp://localhost:5555"
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://localhost/bundles/",
"public_key_path": ""
```


### tyk.conf Options

* `enable_coprocess`: This enables the plugin.
* `coprocess_grpc_server`: This is the URL of our gRPC server.
* `enable_bundle_downloader`: This enables the bundle downloader.
* `bundle_base_url`: This is a base URL that will be used to download the bundle. You should replace the bundle_base_url with the appropriate URL of the web server that's serving your plugin bundles. For now HTTP and HTTPS are supported but we plan to add more options in the future (like pulling directly from S3 buckets).
* `public_key_path`: Modify `public_key_path` in case you want to enforce the cryptographic check of the plugin bundle signatures. If the `public_key_path` isn't set, the verification process will be skipped and unsigned plugin bundles will be loaded normally.


### Configure an API Definition

There are two important parameters that we need to add or modify in the API definition.
The first one is `custom_middleware_bundle` which must match the name of the plugin bundle file. If we keep this with the default name that the Tyk CLI tool uses, it will be `bundle.zip`:

```{.copyWrapper}
"custom_middleware_bundle": "bundle.zip"
```

Assuming the `bundle_base_url` is `http://localhost/bundles/`, Tyk will use the following URL to download our file:

`http://localhost/bundles/bundle.zip`

The second parameter is specific to this tutorial, and should be used in combination with `use_keyless` to allow an API to authenticate against our plugin:

```{.copyWrapper}
"use_keyless": false,
"enable_coprocess_auth": true
```


`enable_coprocess_auth` will instruct the Tyk gateway to authenticate this API using the associated custom authentication function that's implemented by our plugin.

### Configuration via the Tyk Dashboard

To attach the plugin to an API, from the **Advanced Options** tab in the **API Designer** enter `bundle.zip` in the **Plugin Bundle ID** field.

![Plugin Options](/img/2.10/plugin_bundle_id.png)

We also need to modify the authentication mechanism that's used by the API.
From the **Core Settings** tab in the **API Designer** select **Use Custom Authentication (Python, CoProcess, and JSVM plugins)** from the **Target Details - Authentication Mode** drop-down list. 

![Advanced Options](/img/2.10/custom_auth_python.png)

## Testing the Plugin


At this point we have our test HTTP server ready to serve the plugin bundle and the configuration with all the required parameters.
The final step is to start or restart the **Tyk Gateway** (this may vary depending on how you set up Tyk):

```{.copyWrapper}
service tyk-gateway start
```


A simple CURL request will be enough for testing our custom authentication middleware.

This request will trigger an authentication error:

```{.copyWrapper}
curl http://localhost:8080/my-api/my-path -H 'Authorization: badtoken'
```

This will trigger a successful authentication. We're using the token that's specified in our server implementation (see line 57 in `Server.cs`):


```{.copyWrapper}
curl http://localhost:8080/my-api/my-path -H 'Authorization: abc123'
```

We also have a [GitHub repository](https://github.com/TykTechnologies/tyk-plugin-demo-java/tree/maven) that includes tests and authentication middleware.

[3]: /img/dashboard/system-management/plugin_options_2.5.png
[4]: /img/dashboard/system-management/plugin_auth_mode_2.5.png