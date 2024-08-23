---
date: 2024-06-25T12:59:42Z
title: Configuring Plugins for Tyk OAS APIs
description: "This section explains how to configure Tyk OAS APIs to use plugin bundles deployed on a remote web server"
tags: [ "Tyk OAS plugins" ]
---

An API can be configured so that one or more of its associated plugins can execute at different phases of the request life cycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request lifecycle stage.

This guide explains how to configure plugins for Tyk OAS APIs within the [Tyk OAS API definition](#tyk-oas-apidef) or via the [API designer](#tyk-oas-dashboard) in Tyk Dashboard.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/api-config/classic" >}}) page.

---

## Configuring plugins in the Tyk OAS API Definition {#tyk-oas-apidef}

The table below illustrates the Tyk OAS API configuration parameters that correspond to each phase of the API request lifecycle:

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Occurs before main request processing. | prePlugins |            
| Post Auth | Occurs after key authentication | postAuthenticationPlugins |
| Post | Occurs after the main request processing but bfore the response is sent. | postplugin |       
| Response | Occurs after the main request processing but before the response is sent. | responsePlugins |      
    
The example configuration below illustrates how to set up multiple plugins for different phases of the request lifecycle:

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

We can see from the example above that the `global` object within the `middleware` section of the `x-tyk-api-gateway` configuration is used to configure plugins in a Tyk OAS API. The `pluginConfig` section contains the `driver` parameter that is used to configure the plugin implementation [language]({{< ref "/plugins/supported-languages#plugin-driver-names" >}}).

In the example above we can see that there are Golang post authentication, post, pre and response plugins configured.

Each plugin can have additional settings, such as:
- `enabled`: When true, enables the plugin.
- `rawBodyOnly`: When true, indicates that only the raw body should be processed.
- `requireSession`: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.

---

## Configuring plugins in the API Designer {#tyk-oas-dashboard}

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
- `enabled`: When true, enables the plugin.
- `rawBodyOnly`: When true, indicates that only the raw body should be processed.
- `requireSession`: When true, indicates that the plugin requires an active session. This is applicable only for Post, Post Authentication and Response plugins.
