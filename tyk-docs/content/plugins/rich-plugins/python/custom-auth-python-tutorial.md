---
date: 2017-03-24T13:16:21Z
title: Custom Authentication With a Python Plugin
menu:
  main:
    parent: "Python"
weight: 1 
---

## <a name="introduction"></a>Introduction
This tutorial will guide you through the creation of a custom authentication plugin, written in Python.
A custom authentication plugin allows you to implement your own authentication logic and override the default Tyk authentication mechanism. The sample code implements a very simple key check; currently it supports a single, hard-coded key. It could serve as a starting point for your own authentication logic. We have tested this plugin with Ubuntu 14.

The code used in this tutorial is also available in [this GitHub repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).

## <a name="requirements"></a>Requirements

* Tyk API Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here](/docs/getting-started/installation/with-tyk-on-premises/) for more installation options.

### Dependencies

* The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli][3]
* In Tyk 2.8 the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
* Python 3.4

## <a name="create-plugin"></a>Create the Plugin
The first step is to create a new directory for our plugin file:

```{.copyWrapper}
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

Next we need to create a manifest file. This file contains information about our plugin file structure and how we expect it to interact with the API that will load it.
This file should be named "manifest.json" and needs to have the following contents:

```{.json}
{
  "file_list": [
    "middleware.py"
  ],
  "custom_middleware": {
    "driver": "python",
    "auth_check": {
      "name": "MyAuthMiddleware"
    }
  }
}
```

* The `file_list` block contains the list of files to be included in the bundle, the CLI tool expects to find these files in the current working directory.
* The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `auth_check` for this tutorial. For other hooks see [here][5].
* The `name` field references the name of the function that we implement in our plugin code: `MyAuthMiddleware`.
* We add an additional file called `middleware.py`, this will contain the main implementation of our middleware.

### Contents of middleware.py

We import decorators from the Tyk module this gives us the `Hook` decorator, and we import [Tyk Python API helpers](/docs/plugins/rich-plugins/python/tyk-python-api-methods/)

We implement a middleware function and register it as a hook, the input includes the request object, the session object, the API meta data and its specification:

```
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def MyAuthMiddleware(request, session, metadata, spec):
  auth_header = request.get_header('Authorization')
  if auth_header == '47a0c79c427728b3df4af62b9228c8ae':
    tyk.log("I'm logged!", "info")
    tyk.log("Request body" + request.object.body, "info")
    tyk.log("API config_data" + spec['config_data'], "info")
    session.rate = 1000.0
    session.per = 1.0
    metadata["token"] = "47a0c79c427728b3df4af62b9228c8ae"
  return request, session, metadata
```


You can modify the `manifest.json` to add as many files as you want. Files that aren't listed in the `manifest.json` file will be ignored when building the plugin bundle.

## <a name="building"></a>Building the Plugin

To bundle our plugin we run the following command in the working directory. Check your `tyk-cli` install path first:

`/opt/tyk-gateway/utils/tyk-cli bundle build -y`

For Tyk 2.8 use:

`/opt/tyk-gateway/bin/tyk bundle build -y`

A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. For more information on the Tyk CLI tool, see [here](docs/plugins/rich-plugins/plugin-bundles/#using-the-bundler-tool).

You should now have a `bundle.zip` file in the plugin directory.

## <a name="publish"></a>Publishing the Plugin

To allow Tyk access to the plugin bundle, we need to serve this file using a web server. For this tutorial we'll use the Python built-in HTTP server (check the official docs for additional information). This server listens on port 8000 by default. To start it use:

`python3 -m http.server`

When the server is started our current working directory is used as the web root path, this means that our `bundle.zip` file should be accessible from the following URL:

`http://<IP Address>:8000/bundle.zip`

The Tyk Gateway fetches and loads a plugin bundle during startup time and subsequent reloads. For updating plugins using the hot reload feature, you should use different plugin bundle names as we expect them to be used for versioning purposes, e.g. bundle-1, bundle-2, etc.
If a bundle already exists, Tyk will skip the download process and load the version that's already present.

## <a name="configure"></a>Configuring Tyk

You will need to modify the Tyk global configuration file (`tyk.conf`) to use Python plugins. The following block should be present in this file:

```{.copyWrapper}
"coprocess_options": {
    "enable_coprocess": true,
    "python_path_prefix": "/opt/tyk-gateway"
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://dummy-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey"
```

### Options

* `enable_coprocess`: This enables the plugin
* `python_path_prefix`: Sets the path to built-in Tyk modules, this will be part of the Python module lookup path. The value used here is the default one for most installations.
* `enable_bundle_downloader`: This enables the bundle downloader
* `bundle_base_url`: This is a base URL that will be used to download the bundle. You should replace the `bundle_base_url` with the appropriate URL of the web server that's serving your plugin bundles. For now HTTP and HTTPS are supported but we plan to add more options in the future (like pulling directly from S3 buckets). We use the URL that's exposed by the test HTTP server in the previous step.
* `public_key_path`: Modify `public_key_path` in case you want to enforce the cryptographic check of the plugin bundle signatures. If the `public_key_path` isn't set, the verification process will be skipped and unsigned plugin bundles will be loaded normally.

## <a name="configure-api"></a>Configuring the API

There are two important parameters that we need to add or modify in the API definition.
The first one is `custom_middleware_bundle` which must match the name of the plugin bundle file. If we keep this with the default name that the Tyk CLI tool uses, it will be `bundle.zip`.

`"custom_middleware_bundle": "bundle.zip"`

The second parameter is specific to this tutorial, and should be used in combination with `use_keyless` to allow an API to authenticate against our plugin:

`"use_keyless": false`
`"enable_coprocess_auth": true`

`"enable_coprocess_auth"` will instruct the Tyk gateway to authenticate this API using the associated custom authentication function that's implemented by the plugin.

## <a name="dashboard"></a>Dashboard Configuration Options

To attach the plugin to an API, From the **Advanced Options** tab in the **API Designer** enter **bundle.zip** in the **Plugin Bundle ID** field.

![Plugin Options](/docs/img/dashboard/system-management/plugin_options_2.5.png)

We also need to modify the authentication mechanism that's used by the API.
From the **Core Settings** tab in the **API Designer** select **Use Custom Auth (plugin)** from the **Authentication - Authentication Mode** drop-down list. 

![Advanced Options](/docs/img/dashboard/system-management/plugin_auth_mode_2.5.png)


## <a name="testing"></a>Testing the Plugin

At this point we have our test HTTP server ready to serve the plugin bundle and the configuration with all the required parameters.
The final step is to start or restart the **Tyk Gateway** (this may vary depending on how you setup Tyk).
A separate service is used to load the Tyk version that supports Python (tyk-gateway-python), so we need to stop the standard one first (tyk-gateway):

```{.copyWrapper}
service tyk-gateway stop
service tyk-gateway-python start
```

From now on you should use the following command to restart the service:

```{.copyWrapper}
service tyk-gateway-python restart
```

A simple CURL request will be enough for testing our custom authentication middleware.

This request will trigger a bad authentication:

```{.copyWrapper}
curl http://<IP Address>:8080/my-api/my-path -H 'Authorization: badtoken'
```

This request will trigger a successful authentication. We are using the token that's set by our Python plugin:

```{.copyWrapper}
curl http://<IP Address>:8080/my-api/my-path -H 'Authorization: 47a0c79c427728b3df4af62b9228c8ae'
```


## <a name="next"></a>What's Next?

In this tutorial we learned how Tyk plugins work. For a production-level setup we suggest the following steps:

* Configure Tyk to use your own key so that you can enforce cryptographic signature checks when loading plugin bundles, and sign your plugin bundles!
* Configure an appropriate web server and path to serve your plugin bundles.