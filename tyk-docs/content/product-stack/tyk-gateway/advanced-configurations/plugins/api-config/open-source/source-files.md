---
date: 2024-06-25T12:59:42Z
title: Source Files Configuration
description: "This section explains ehow to configure APIs for plugins deployed on the Gateway file system"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

An API can be configured so that one or more of its associated plugins can execute at different phases of the request life cycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request lifecycle stage.

## Tyk Classic APIs

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
- **disabled**: When true, disables the plugin.
- **raw_body_only**: When true, indicates that only the raw body should be processed.
- **require_session**: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.

---

## Tyk OAS APIs

The table below illustrates the Tyk OAS API configuration parameters that correspond to each phase of the API request lifecycle:

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Occurs before main request processing. | prePlugins |            
| Post Auth | Occurs after key authentication | postAuthenticationPlugins |
| Post | Occurs after the main request processing but bfore the response is sent. | postplugin |       
| Response | Occurs after the main request processing but before the response is sent. | responsePlugins |      
    
The example configuration below illustrates how to set up multiple plugins for different phases of the request lifecycle:

```json
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

We can see from the example above that the middleware section of the *x-tyk-api-gateway* configuration is used to configure plugins in a Tyk OAS API. The *pluginConfig* section contains the *driver* parameter that is used to configure the plugin implementation [language]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}).

Each plugin can have additional settings, such as:
- **enabled**: When true, enables the plugin.
- **rawBodyOnly**: When true, indicates that only the raw body should be processed.
- **requireSession**: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.