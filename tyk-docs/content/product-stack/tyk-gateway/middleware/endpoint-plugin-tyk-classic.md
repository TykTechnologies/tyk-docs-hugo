---
title: Using the Per-Endpoint Plugin with Tyk Classic APIs
date: 2024-03-04
description: "Using the per-endpoint custom plugin with Tyk Classic APIs"
tags: ["custom plugin", "golang", "go plugin", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The [per-endpoint custom plugin]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) provides the facility to attach a custom Golang plugin at the end of the request processing chain.
This plugin allows you to add custom logic to the processing flow for the specific endpoint without adding to the processing complexity of other endpoints.
It can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}), if required,
and hence can provide a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware).

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

To enable the middleware you must add a new `go_plugin` object to the `extended_paths` section of your API definition.

The `go_plugin` object has the following configuration:

- `path`: the path to match on
- `method`: the method to match on
- `func_name`: this is the "symbol" or function name you are calling in your Go plugin once loaded - a function can be called by one or more APIs
- `plugin_path`: the relative path of the shared object containing the function you wish to call, one or many `.so` files can be called

You can register multiple plugin functions for a single endpoint. Tyk will process them in the order they appear in the API definition.

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "go_plugin": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET",
                "plugin_path": "/middleware/myPlugin.so",
                "func_name": "myUniqueFunctionName"
            }
        ]
    }
}
```

In this example the per-endpoint custom plugin middleware has been configured for HTTP `GET` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will invoke the function `myUniqueFunctionName` in the file located at `/middleware/myPlugin.so`.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to add the per-endpoint custom plugin middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to trigger the virtual endpoint. Select the **Go Plugin** plugin.

{{< img src="/img/dashboard/endpoint-designer/endpointplugin.png" alt="Selecting the middleware" >}}

#### Step 2: Locate the middleware in the raw API definition

Once you have selected the middleware for the endpoint, you need to switch to the *Raw Definition* view and then locate the `go_plugin` section (you can search within the text editor window).

{{< img src="/img/dashboard/endpoint-designer/endpointplugin_search.png" alt="Locating the middleware configuration" >}}

#### Step 3: Configure the middleware

Now you can directly edit the `plugin_path` and `func_name` to locate your compiled plugin function.

{{< img src="/img/dashboard/endpoint-designer/endpointplugin_config.png" alt="Configuring the middleware" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
