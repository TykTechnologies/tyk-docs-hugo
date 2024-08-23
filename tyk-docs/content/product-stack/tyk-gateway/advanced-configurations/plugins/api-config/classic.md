---
date: 2024-06-25T12:59:42Z
title: Configuring Plugins for Tyk Classic APIs
description: "This section explains how to configure Tyk Classic APIs to use plugin bundles deployed on a remote web server"
tags: [ "Tyk Classic plugins" ]
---

An API can be configured so that one or more of its associated plugins can execute at different phases of the request life cycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request lifecycle stage.

This guide explains how to configure plugins for Tyk Classic APIs within the [Tyk Classic API definition](#tyk-classic-apidef) or via the [API designer](#tyk-classic-dashboard) in Tyk Dashboard.

If you’re using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/oas" >}}) page.

---

## Configuring plugins in the Tyk Classic API Definition {#tyk-classic-apidef}

In Tyk Classic APIs, the *custom_middleware* section of the Tyk Classic API Definition is where you configure plugins that will run at different points during the lifecycle of an API request.

The table below illustrates the Tyk OAS API configuration parameters that correspond to each phase of the API request lifecycle:

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Occurs before main request processing. | pre    |            
| Auth  | Custom authentication can be handled during this phase. | auth_check |  
| Post Auth | Occurs after key authentication | post_key_auth |
| Post | Occurs after the main request processing but bfore the response is sent. | post |       
| Response | Occurs after the main request processing but before the response is sent. | response |   

The example configuration below illustrates how to set up multiple plugins for different phases of the request lifecycle:

```json
{
    "custom_middleware": {
        "pre": [
            {
                "name": "PreHook1",
                "path": "/path/to/plugin1.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "auth_check": {
            "name": "AuthCheck",
            "path": "/path/to/plugin.so",
            "disabled": false,
            "require_session": false,
            "raw_body_only": false
        },
        "post_key_auth": [
            {
                "name": "PostKeyAuth",
                "path": "/path/to/plugin.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "post": [
            {
                "name": "PostHook1",
                "path": "/path/to/plugin1.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            },
            {
                "name": "PostHook2",
                "path": "/path/to/plugin2.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "response": [
            {
                "name": "ResponseHook",
                "path": "/path/to/plugin.so",
                "disabled": false,
                "require_session": false,
                "raw_body_only": false
            }
        ],
        "driver": "goplugin"
    }
}
```

From the above example it can be seen that each plugin is configured with the specific function name and associated source file path of the file that contains the function. Furthermore, each lifecycle phase can have a list of plugins configured, allowing for complex processing workflows. For example, you might develop one plugin for logging and another for modifying the request in the pre request phase.

The *driver* configuration parameter describes the plugin implementation language. Please refer to the [supported languages]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}) section for list of supported plugin driver names.

Each plugin can have additional settings, such as:
- `disabled`: When true, disables the plugin.
- `raw_body_only`: When true, indicates that only the raw body should be processed.
- `require_session`: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.

---

## Configuring plugins in the API Designer {#tyk-classic-dashboard}

This section explains how to configure Plugins for a Tyk Classic API using Tyk Dashboard. It specifically covers the use case where the source files of your plugins are deployed on the Tyk Gateway file system. 

To configure plugins for Tyk Classic APIs, click on the APIs item in the *API Management* menu of Dashboard and select your API to display the API editor screen.

{{< img src="/img/plugins/plugins_classic_api_source_config.png" alt="Plugins Classic API screen" >}}

Click on the *View Raw Definition* button to display an editor for the Tyk Classic API Definition.

{{< img src="/img/plugins/plugins_classic_api_definition_editor.png" alt="Plugins Classic API Definition editor screen" >}}

Use the editor to edit the *custom_middleware* section of the [Tyk Classic API Definition]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/api-config/open-source/source-files#tyk-classic-apis" >}}) and click the *Update* button to save your changes.

{{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Plugins Classic API Bundle Field" >}}
