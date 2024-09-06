---
date: 2024-06-25T12:59:42Z
title: Configuring Plugins for Tyk OAS APIs
description: "This section explains how to configure Tyk OAS APIs to use plugin bundles deployed on a remote web server"
tags: [ "Tyk OAS plugins" ]
---

An API can be configured so that one or more of its associated plugins can execute at different phases of the request / response life cycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request / response lifecycle stage.

This guide explains how to configure plugins for Tyk OAS APIs within the [Tyk OAS API definition](#tyk-oas-apidef) or via the [API designer](#tyk-oas-dashboard) in Tyk Dashboard.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/api-config/classic" >}}) page.

---

## Configuring plugins in the Tyk OAS API Definition {#tyk-oas-apidef}

The `x-tyk-api-gateway.middleware.global` section is used to configure plugins in a Tyk OAS API. It contains a `pluginConfig` section and a list of plugins for each phase of the API request / response lifecycle. 

The `pluginConfig` section contains the `driver` parameter that is used to configure the plugin implementation [language]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}):

```yaml
"pluginConfig": {
  "driver": "goplugin"
}
```

Within the `x-tyk-api-gateway.middleware.global` section, keyed lists of plugins can be configured for each phase of the API request / response lifecycle described in the table below:

| Phase | Description       | Config Key  |
| ----- | ---               | ----   |
| Pre   | Executed at the start of the request processing chain | `prePlugins` |            
| Post Auth | Executed after the requester has been authenticated | `postAuthenticationPlugins` |
| Post | Executed at the end of the request processing chain | `postPlugins` |       
| Response | Occurs after the main request processing but before the response is sent. | `responsePlugins` | 

Each plugin configuration can have the following fields configured:

- `enabled`: When true, enables the plugin.
- `functionName`: The name of the function that implements the plugin within the source file.
- `path`: The path to the plugin source file. 
- `rawBodyOnly`: When true, indicates that only the raw body should be processed.
- `requireSession`: When true, indicates that session metadata will be available to the plugin. This is applicable only for post, post authentication and response plugins.

For example a Post Authentication plugin would be configured within a `postAuthenticationPlugins` list as shown below:

```yaml
"postAuthenticationPlugins": [
  {
    "enabled": true,
    "functionName": "post_authentication_func",
    "path": "/path/to/plugin1.so",
    "rawBodyOnly": true,
    "requireSession": true
  }
]
```

An full example is given below to illustrate how to set up plugins for different phases of the request / response lifecycle:

```json {linenos=true, linenostart=1, hl_lines=["15-52"]}
{
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "667962397f6de50001508ac4",
      "id": "b4d8ac6e5a274d7c7959d069b47dc206",
      "orgId": "6672f4377f6de50001508abf",
      "name": "OAS APIs Plugins",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "pluginConfig": {
          "driver": "goplugin"
        },
        "postAuthenticationPlugins": [
          {
            "enabled": true,
            "functionName": "post_authentication_func",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ],
        "postPlugins": [
          {
            "enabled": true,
            "functionName": "postplugin",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ],
        "prePlugins": [
          {
            "enabled": true,
            "functionName": "pre-plugin",
            "path": "/path/to/plugin1.so"
          }
        ],
        "responsePlugins": [
          {
            "enabled": true,
            "functionName": "Response",
            "path": "/path/to/plugin1.so",
            "rawBodyOnly": true,
            "requireSession": true
          }
        ]
      }
    }
  }
}
```

In this example we can see that the plugin driver has been configured by setting the `driver` field to `goplugin` within the `pluginConfig` object. This configuration instructs Tyk Gateway that our plugins are implemented using Golang.

We can also see that the following type of plugins are configured:

- **Pre**: A plugin is configured within the `prePlugins` list. The plugin is enabled and implemented by function `pre-plugin` within the source file located at path `/path/to/plugin1.so`.
- **Post Authentication**: A plugin is configured within the `postAuthenticationPlugins` list. The plugin is enabled and implemented by function `post_authentication_func` within the source file located at path `/path/to/plugin1.so`. The raw request body and session metadata is available to the plugin.
- **Post**: A plugin is configured within the `responsePlugins` list. The plugin is enabled and implemented by function `postplugin` within the source file located at path `/path/to/plugin1.so`. The raw request body and session metadata is available to the plugin.
- **Response**: A plugin is configured within the `postPlugins` list. The plugin is enabled and implemented by function `Response` within the source file located at path `/path/to/plugin1.so`. The raw request body and session metadata is available to the plugin.

The configuration above is a complete and valid Tyk OAS API Definition that you can use as a basis for trying out custom plugins. You will need to update the [driver]({{< ref "plugins/supported-languages#plugin-driver-names" >}}) parameter to reflect the target language type of your plugins. You will also need to update the `path` and `functionName` parameters for each plugin to reflect the source code.

---

## Configuring plugins in the API Designer {#tyk-oas-dashboard}

Select your API from the list of *Created APIs* to reach the API designer and then follow these steps:

#### Step 1: Configure plugin type and custom data

In the *Plugins Configuration* section, select the *Plugin Driver*, which tells Tyk which type of plugin to expect: Go, gRPC, JavaScript (OTTO), Lua or Python.

You can configure custom data that will be made available to your plugin function as a JSON formatted object in the *Config Data* option.

{{< img src="/img/plugins/plugins_oas_api_driver_options.png" alt="OAS API Plugins Driver Config" >}}


#### Step 2: Configure the custom plugins

For each plugin that you wish to register with the API, click on the **Add Plugin** button to display a plugin configuration section:

{{< img src="/img/plugins/plugins_oas_api_source_config.png" alt="OAS Plugins Config Section" >}}

Complete the following fields:

- `Function Name`: Enter the name of the function within your plugin code that Tyk should invoke.
- `Path`: Enter the path to the source file that contains the function that implements your plugin.
- `Raw Body Only`: Optionally, toggle the *Raw Body Only* switch to true when you do not wish to fill body in request or response object for your plugins.

#### Step 3: Save the API

Select **Save API** to apply the changes to your API.