---
title: "Create a Python Code Bundle"
date: 2020-05-15
tags: ["Tyk Cloud", "Configuration", "Plugins", "Python"]
description: "Creating a Python plugin code bundle for Tyk Cloud"
menu:
  main:
    parent: "Python Custom Authentication" 
weight: 5
aliases:
    - /python-custom-auth-plugin/python-code-bundle/
---

## Introduction

This page demonstrates how to create a Python code bundle as part of the custom authentication process for Tyk Cloud, so that you can ensure your API management solution is as effective as possible.


## What do I need to do to create my Plugin?

* You need to create the Python code bundle on your locally installed Gateway (not an Tyk Cloud Cloud Data Plane stack).
* You will create 2 files, a manifest file (`manifest.json`) and the python file (`middleware.py`)
* You then create a zipped bundle via our Tyk CLI tool that is built in to your local Gateway instance.
  
## Creating the Plugin bundle

### Step 1: Create your working directory

The first step is to create a directory for your plugin bundle files:

```.copyWrapper
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

### Step 2: Creating the Manifest File

The manifest file contains information about your plugin file structure and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to have the following contents:

```.json
{
  "custom_middleware": {
    "auth_check": {
      "name": "MyAuthMiddleware"
    },
    "pre": [
      {
        "name": "MyAuthMiddleware"
      }
    ],
    "driver": "python"
  },
  "file_list": [
    "middleware.py"
  ]
}
```
#### File description

| File              | Description                                                                                                                                                                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom_middleware | contains the middleware settings like the plugin driver you want to use (driver) and the hooks that your plugin will expose. We use the   **auth_check** for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}). |
| file_list         | contains the list of files to be included in the bundle. The CLI tool expects to find these files in the current working directory.                                                                                                                                                               |
| name              | references the name of the function that you implement in your plugin code: **MyAuthMiddleware**                                                                                                                                                                                                  |
| middleware.py     | an additional file that contains the main implementation of our middleware.                                                                                                                                                                                                                       |

### Step 3: Creating the middleware.py file

* You import decorators from the Tyk module that gives us the Hook decorator, and we import [Tyk Python API helpers]({{< ref "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods" >}})

* You implement a middleware function and register it as a hook. The input includes the request object, the session object, the API meta data and its specification. The hook checks the authorization header for a specified value. In this tutorial we have called it `Authorization`.

```.python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def MyAuthMiddleware(request, session, metadata, spec):
    auth = request.get_header('Authorization')
    if not auth:
        auth = request.object.params.get('authorization', None)

    if auth == '47a0c79c427728b3df4af62b9228c8ae':
        session.rate = 1000.0
        session.per = 1.0
        metadata["token"] = auth
    return request, session, metadata

@Hook
def MyPostMiddleware(request, session, spec):
    tyk.log("This is my post middleware", "info")
    request.object.set_headers["x-tyk-request"] = "something"
    return request, session
  ```

#### File description

| File                      | Description                                                                    |
|---------------------------|--------------------------------------------------------------------------------|
| `MyAuthMiddleware`  @hook | checks for a value. If it is found it is treated as your authentication token. |
| `MyPostMiddleware`  @hook | adds a header to the request. In this tutorial  `something`                    |                                                                             |

### Step 4: Create the Plugin Bundle

* You create a bundle to cater for a number of plugins connected to the one API, and using a bundle makes this more manageable.

* To bundle your plugin we run the following command in your working directory where your manifest.json and plugin code is.

```.bash
docker run \
  --rm \
  -v $(pwd):/cloudplugin \
  --entrypoint "/bin/sh" -it \
  -w "/cloudplugin" \
  tykio/tyk-gateway:v3.1.2 \
  -c '/opt/tyk-gateway/tyk bundle build -y'
```

* A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The -y flag tells the Tyk CLI tool to skip the signing process in order to simplify this tutorial. For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles.md" >}}).
* You should now have a `bundle.zip` file in the plugin working directory.
* Next you will configure [uploading your plugin bundle file]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}) to your Amazon S3 bucket.
