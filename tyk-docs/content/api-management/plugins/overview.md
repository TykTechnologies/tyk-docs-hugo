---
title: "Custom Plugins"
date: 2025-01-10
tags: []
description: ""
keywords: []
aliases:
  - /plugins
  - /plugins/rich-plugins/plugin-bundles
  - /plugins/how-to-serve/plugin-bundles
  - /plugins/how-to-serve
  - /customise-tyk/plugins
  - /plugins/get-started-selfmanaged/deploy
  - /plugins/get-started-selfmanaged/get-started
  - /plugins/get-started-selfmanaged/run
  - /plugins/get-started-selfmanaged/test
  - /plugins/get-started-plugins
  - /plugins/tutorials/quick-starts/go/quickstart
  - /plugins/tutorials/quick-starts/go/dashboard
  - /plugins/tutorials/quick-starts/go/open-source
  - /plugins/plugin-hub
  - /product-stack/tyk-gateway/advanced-configurations/plugins/api-config/overview
  - /product-stack/tyk-gateway/advanced-configurations/plugins/api-config/oas
  - /product-stack/tyk-gateway/advanced-configurations/plugins/api-config/classic
  - /plugins/how-to-serve-plugins
  - /plugins/how-to-serve-plugins/plugin-bundles
  - /product-stack/tyk-gateway/advanced-configurations/plugins/bundles/oas
  - /product-stack/tyk-gateway/advanced-configurations/plugins/bundles/classic
  - /product-stack/tyk-gateway/advanced-configurations/plugins/bundles/bundle-cli
  - /plugins/supported-languages
---

## Introduction

Plugins can be used to customize and enhance the capabilities of your APIs through integration with external services and databases to perform operations such as data transformation, custom authentication, logging and monitoring etc.

When Tyk receives an API request, it works through a [chain]({{< ref "middleware-execution-order" >}}) of processing *middleware* that is configured using the API definition. There are a large number of built-in middleware in the processing chain that are dedicated to performing [client authentication]({{< ref "/api-management/client-authentication" >}}), [request transformation]({{< ref "advanced-configuration/transform-traffic" >}}), [caching]({{< ref "basic-config-and-security/reduce-latency/caching" >}}) and many other processes before proxying the request to the upstream.

Tyk's custom plugin facility provides a powerful and flexible way to extend the middleware chain. It allows API developers to write custom middleware, in various programming languages, that can perform additional processing of requests and responses.

For example, a custom authentication scheme can be implemented and executed on API requests, custom plugins can be used to provide integration with external services and databases, or additional processing can be performed on the response returned from the upstream.

There are several different stages of the [API request lifecycle]({{< ref "/concepts/middleware-execution-order" >}}) where custom plugins can be attached (or *hooked*) into the middleware chain allowing significant customization to meet your specific requirements.

Custom plugins are usually referred to by the location where they can be *hooked* into the middleware processing chain as follows:

1. [Pre (Request)]({{< ref "api-management/plugins/plugin-types#request-plugins" >}})
2. [Authentication]({{< ref "api-management/plugins/plugin-types#authentication-plugins" >}})
3. [Post-Auth (Request)]({{< ref "api-management/plugins/plugin-types#request-plugins" >}})
4. [Post (Request)]({{< ref "api-management/plugins/plugin-types#request-plugins" >}})
5. [Response]({{< ref "api-management/plugins/plugin-types#response-plugins" >}})
6. [Analytics (Response)]({{< ref "api-management/plugins/plugin-types#analytics-plugins" >}})

## How Plugin Works

The diagram below illustrates a high level architectural overview for how Tyk Gateway interacts with plugins.

{{< img src="/img/plugins/plugins_overview.svg" width="500px" alt="plugins overview" >}}

From the above illustration it can be seen that:

1. The client sends a request to an API served by Tyk Gateway.
2. Tyk processes the request and forwards it to one or more plugins implemented and configured for that API.
3. A plugin performs operations (e.g., custom authentication, data transformation).
4. The processed request is then returned to Tyk Gateway, which forwards it upstream.
5. Finally, the upstream response is sent back to the client.

## Types of Plugin

Tyk supports four types of plugins:

1. **[Request Plugin]({{< ref "" >}})**
2. **[Authentication Plugin]({{< ref "" >}})**
3. **[Response Plugin]({{< ref "" >}})**
4. **[Analytics Plugin]({{< ref "" >}})**

To know more about plugin types and it's advanced configuration, refer the following [docs]({{< ref "" >}}).

## Getting Started

This section takes you through the process of running and building a quickstart **Go plugin**, included within Tyk's [getting started](https://github.com/TykTechnologies/custom-go-plugin) repository. Go plugins are the recommended plugin type and suitable for most use cases.

##### Expected outcome

At the end of this process you should have a Tyk Gateway or Tyk Self-Managed environment running locally, with a simple Go plugin executing on each API request. For each reponse to an API request the example plugin will inject a *Foo* header, with a value of *Bar*.

##### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Tyk license](https://tyk.io/sign-up/#self) (if using Self-Managed Tyk, which will make the process easier via UI)
- [Make](https://www.gnu.org/software/make)
- OSX (Intel) -> Not a prerequisite, though these steps are tested on OSX Intel/ARM

##### Before you begin

Please clone the [getting started](https://github.com/TykTechnologies/custom-go-plugin) respository.

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
cd custom-go-plugin
```

##### Choose your environment

{{< grid >}}
{{< badge read="15 mins" imageStyle="object-fit:contain" href="plugins/tutorials/quick-starts/go/dashboard" image="/img/logos/tyk-logo-selfmanaged.svg" alt="Dashboard">}}
Dashboard Tutorial
{{< /badge >}}

{{< badge read="15 mins" imageStyle="object-fit:contain" href="plugins/tutorials/quick-starts/go/open-source" image="/img/logos/tyk-logo-selfmanaged.svg" alt="Tyk OSS Gateway">}}
Tyk OSS Gateway Tutorial
{{< /badge >}}
{{< /grid >}}


### Dashboard Plugins

This quick start explains how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) Go plugin within Tyk Dashboard.

**Estimated time**: 10-15 minutes

In this tutorial you will learn how to:

1. Add your Tyk license.
2. Bootstrap the Tyk Dashboard environment.
3. Login to Tyk Dashboard.
4. View the pre-configured API.
5. Test the plugin.
6. View the analytics.
7. Next steps.

**Steps for Configuration:**

1. **Add your Tyk license**

    Create and edit the file `.env` with your Tyk Dashboard license key

    ```console
    # Make a copy of the example .env file for the Tyk-Dashboard 
    cp .env.example .env
    ```

2. **Bootstrap the getting started example**

    run the `make` command:

    ```bash
    make
    ```

    This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

3. **Log in to Tyk Dashboard**

    Log on to the Tyk Dashboard on `http://localhost:3000` using the following Bootstrapped credentials:
    ```
    demo@tyk.io
    ```
    and password:
    ```
    topsecretpassword
    ```

    Note: these are editable in `.env.example`

4. **View the pre-configured API**

    Once you're logged on to the Tyk Dashboard, navigate to the *APIs* screen.

    You'll see a sample *Httpbin* API.  Let's click into it for more details.

    Click on *VIEW RAW DEFINITION*.  Note the *custom_middleware* block is filled out, injecting the compiled example Go plugin into the API.

5. **Test the plugin**

    Let's send an API request to the API Gateway so it can reverse proxy to our API.

    ```terminal
    curl localhost:8080/httpbin/get
    ```

    Yields the response:
    ```
    {
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip",
        "Foo": "Bar",
        "Host": "httpbin.org",
        "User-Agent": "curl/7.79.1",
        "X-Amzn-Trace-Id": "Root=1-63f78c47-51e22c5b57b8576b1225984a"
    },
    "origin": "172.26.0.1, 99.242.70.243",
    "url": "http://httpbin.org/get"
    }
    ```

    Note, we see a *Foo:Bar* HTTP Header was injected by our Go plugin and echoed back to us by the Httpbin mock server.

6. **View the analytics**

    Navigate to the Dashboard's various *API Usage Data* to view analytics on the API request!

### Open-Source Plugins

This quick start guide will explain how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) Go plugin using the Tyk OSS Gateway.

**Steps for Configuration:**

1. **Bootstrap the getting started example**

    Please run the following command from within your newly cloned directory to run the Tyk Stack and compile the sample plugin.  This will take a few minutes as we have to download all the necessary dependencies and docker images.

    ```bash
    make up-oss && make build
    ```

2. **Test the plugin**

    Let's test the plugin by sending an API request to the pre-configured API definition:

    ```
    curl localhost:8080/httpbin/get
    ```

    Response:
    ```
    {
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip",
        "Foo": "Bar",
        "Host": "httpbin.org",
        "User-Agent": "curl/7.79.1"
    },
    "origin": "172.28.0.1, 99.242.70.243",
    "url": "http://httpbin.org/get"
    }
    ```

    We've sent an API request to the Gateway. We can see that the sample custom plugin has injected an HTTP header with a value of *Foo:Bar*. This header was echoed back in the Response Body via the mock Httpbin server.

    The `./tyk/scripts/bootstrap-oss.sh` script creates an API definition that includes the custom plugin.

3. **View the analytics**

    We can see that Tyk Pump is running in the background. Let's check the logs after sending the API request:

    ```
    docker logs custom-go-plugin_tyk-pump_1 
    ```

    Output:
    ```
    time="Feb 23 16:29:27" level=info msg="Purged 1 records..." prefix=stdout-pump
    {"level":"info","msg":"","time":"0001-01-01T00:00:00Z","tyk-analytics-record":{"method":"GET","host":"httpbin.org","path":"/get","raw_path":"/get","content_length":0,"user_agent":"curl/7.79.1","day":23,"month":2,"year":2023,"hour":16,"response_code":200,"api_key":"00000000","timestamp":"2023-02-23T16:29:27.53328605Z","api_version":"Non Versioned","api_name":"httpbin","api_id":"845b8ed1ae964ea5a6eccab6abf3f3de","org_id":"","oauth_id":"","request_time":1128,"raw_request":"...","raw_response":"...","ip_address":"192.168.0.1","geo":{"country":{"iso_code":""},"city":{"geoname_id":0,"names":null},"location":{"latitude":0,"longitude":0,"time_zone":""}},"network":{"open_connections":0,"closed_connections":0,"bytes_in":0,"bytes_out":0},"latency":{"total":1128,"upstream":1111},"tags":["key-00000000","api-845b8ed1ae964ea5a6eccab6abf3f3de"],"alias":"","track_path":false,"expireAt":"2023-03-02T16:29:27.54271855Z","api_schema":""}}
    ```

    As we can see, when we send API requests, the Tyk Pump will scrape them from Redis and then send them to a persistent store as configured in the Tyk Pump env file. 

    In this example, we've configured a simple `STDOUT` Pump where the records will be printed to the Standard OUT (docker logs!)

## API Configuration

This page provides an overview on how to register one or more custom plugins to be executed at different stages or [hooks]({{< ref "api-management/plugins/plugin-types#plugin-and-hook-types" >}}) in the API request/response lifecycle. If you wish to learn how to register custom plugins to be executed on the traffic logs generated by the Gateway please refer to the [analytics plugins]({{< ref "api-management/plugins/plugin-types#analytics-plugins" >}}) page. 

If you need fine-grained control at the endpoint level then it is also possible to configure [per-endpoint plugins]({{< ref "api-management/plugins/plugin-types#per-endpoint-custom-plugins" >}}). These are custom Golang plugins that are triggered at the end of the request processing chain before API-level *Post* plugins are executed.

---

### Introduction

There are three locations where Tyk Gateway can find plugin functions:

1. **gRPC plugins**: Plugin functions are implemented by a gRPC server with the associated configuration specified with the API definition. For further details on how to configure gRPC plugins, please refer to our [gRPC]({{< ref "api-management/plugins/rich-plugins#overview-1" >}}) documentation.
2. **Local plugins**: Plugins are implemented by functions within source code files located on the Gateway's file system. The API Definition allows the source code file path and function name to be configured for each plugin. For further details read on.
3. **Plugin bundles**: The plugin source code and configuration are bundled into a zip file that is served by a remote web server. For further details see the [plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}) page.

### Plugin configuration

Each plugin for an API can be configured within the API Definition with the following details:

| Property | Description |
|-------|-------------|
| `Enabled` | When true, the plugin is activated |
| `Name` | A name used to identify the plugin |
| `Path` | The path to the source code file on the Tyk Gateway file system |
| `Function name` | The name of the function that implements the plugin. The function should exist within the source code file referenced in `path` |
| `Raw body only` | When set to true, this flag indicates that only the raw request body should be processed |
| `Require session state`| When set to true, Tyk Gateway will serialize the request session state and pass it as an argument to the function that implements the plugin in the target language. This is applicable to Post, Response, and Authentication hooks only |

---

### Language configuration

For local and bundle plugins a [plugin driver]({{< ref "api-management/plugins/overview#plugin-driver-names" >}}) is configured to specify the plugin implementation language. If using gRPC plugins a `grpc` plugin driver should be used to instruct Tyk to request execution of plugins from within a gRPC server that is external to the Tyk process. This offers additional language support since Tyk can integrate with a gRPC server that is implemented using any supported [gRPC language](https://grpc.io/docs/).

For a given API it is not possible to mix the implementation language for the plugin types: Pre, Authentication, Post, Post Authentication and Response plugins. For example, it is not possible to implement a pre request plugin in *Go* and also implement a post request plugin in *Python* for the same API.

### Tyk OAS APIs

An API can be configured so that one or more of its associated plugins can execute at different phases of the request / response life cycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request / response lifecycle stage.

This guide explains how to configure plugins for Tyk OAS APIs within the [Tyk OAS API definition](#tyk-oas-apidef) or via the [API designer](#tyk-oas-dashboard) in Tyk Dashboard.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/plugins/overview#tyk-classic-apis" >}}) page.

#### Using API Definition {#tyk-oas-apidef}

The `x-tyk-api-gateway.middleware.global` section is used to configure plugins in a Tyk OAS API. It contains a `pluginConfig` section and a list of plugins for each phase of the API request / response lifecycle. 

The `pluginConfig` section contains the `driver` parameter that is used to configure the plugin implementation [language]({{< ref "api-management/plugins/overview#plugin-driver-names" >}}):

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

The configuration above is a complete and valid Tyk OAS API Definition that you can use as a basis for trying out custom plugins. You will need to update the [driver]({{< ref "api-management/plugins/overview#plugin-driver-names" >}}) parameter to reflect the target language type of your plugins. You will also need to update the `path` and `functionName` parameters for each plugin to reflect the source code.

#### Using API Designer {#tyk-oas-dashboard}

Select your API from the list of *Created APIs* to reach the API designer and then follow these steps:

1. **Configure plugin type and custom data**

    In the *Plugins Configuration* section, select the *Plugin Driver*, which tells Tyk which type of plugin to expect: Go, gRPC, JavaScript (OTTO), Lua or Python.

    You can configure custom data that will be made available to your plugin function as a JSON formatted object in the *Config Data* option.

    {{< img src="/img/plugins/plugins_oas_api_driver_options.png" alt="OAS API Plugins Driver Config" >}}

2. **Configure the custom plugins**

    For each plugin that you wish to register with the API, click on the **Add Plugin** button to display a plugin configuration section:

    {{< img src="/img/plugins/plugins_oas_api_source_config.png" alt="OAS Plugins Config Section" >}}

    Complete the following fields:

    - `Function Name`: Enter the name of the function within your plugin code that Tyk should invoke.
    - `Path`: Enter the path to the source file that contains the function that implements your plugin.
    - `Raw Body Only`: Optionally, toggle the *Raw Body Only* switch to true when you do not wish to fill body in request or response object for your plugins.

3. **Save the API**

    Select **Save API** to apply the changes to your API.

### Tyk Classic APIs

An API can be configured so that one or more of its associated plugins can execute at different phases of the request / response lifecycle. Each plugin configuration serves to identify the plugin source file path and the name of the corresponding function, triggered at each request / response lifecycle stage.

This guide explains how to configure plugins for Tyk Classic APIs within the [Tyk Classic API definition](#tyk-classic-apidef) or via the [API designer](#tyk-classic-dashboard) in Tyk Dashboard.

If you’re using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "api-management/plugins/overview#tyk-oas-apis" >}}) page.

#### Using API Definition {#tyk-classic-apidef}

In Tyk Classic APIs, the *custom_middleware* section of the Tyk Classic API Definition is where you configure plugins that will run at different points during the lifecycle of an API request.

This table illustrates the different phases of the API request lifecycle where custom plugins can be executed:

| Phase | Description       | Config |
| ----- | ---               | ----   |
| Pre   | Executed at the start of the request processing chain | `pre`    |            
| Auth  | Executed during the authentication step | `auth_check` |  
| Post Auth | Executed after the requester has been authenticated | `post_key_auth` |
| Post | Executed at the end of the request processing chain | `post` |       
| Response | Executed on the response received from the upstream | `response` |   

This example configuration illustrates how to set up plugins for different phases of the request lifecycle:

```json  {linenos=true, linenostart=1}
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

In this example we can see that there are Golang custom authentication (`auth_check`), post authentication (`post_key_auth`), post, pre and response plugins configured.

It can be seen that each plugin is configured with the specific function name and associated source file path of the file that contains the function. Furthermore, each lifecycle phase (except `auth`) can have a list of plugins configured, allowing for complex processing workflows. For example, you might develop one plugin for logging and another for modifying the request in the pre request phase. When multiple plugins are configured for a phase they will be executed in the order that they appear in the API definition.

The `driver` configuration parameter describes the plugin implementation language. Please refer to the [supported languages]({{< ref "api-management/plugins/overview#plugin-driver-names" >}}) section for list of supported plugin driver names.

Each plugin can have additional settings, such as:
- `disabled`: When true, disables the plugin.
- `raw_body_only`: When true, indicates that only the raw body should be processed.
- `require_session`: When true, indicates that session metadata will be available to the plugin. This is applicable only for post, post authentication and response plugins.

#### Using API Designer {#tyk-classic-dashboard}

This section explains how to configure plugins for a Tyk Classic API using Tyk Dashboard. It specifically covers the use case where the source files of your plugins are deployed on the Tyk Gateway file system. 

Select your API from the list of *Created APIs* to reach the API designer and then follow these steps:

{{< img src="/img/plugins/plugins_classic_api_source_config.png" alt="Plugins Classic API screen" >}}

1. **Display the Tyk Classic API Definition editor**

    Click on the **View Raw Definition** button to display an editor for updating the Tyk Classic API Definition.

    {{< img src="/img/plugins/plugins_classic_api_definition_editor.png" alt="Plugins Classic API Definition editor screen" >}}

2. **Edit the Tyk Classic API Definition to configure plugins**

    Use the editor to edit the `custom_middleware` section of the [Tyk Classic API Definition]({{< ref "api-management/plugins/overview#tyk-classic-apis" >}}).

    {{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Plugins Classic API Bundle Field" >}}

3. **Save changes**

    Select the **Update** button to apply your changes to the Tyk Classic API Definition.

## Plugin Deployment Types

There are a variety of scenarios relating to the deployment of plugins for an API, concerning the location of the plugin source code and its associated configuration.

### Local Plugins

The plugin source code and associated configuration are co-located with Tyk Gateway in the same file system. The configuration is located within the API Definition. For further details please consult [API configuration]({{< ref "api-management/plugins/overview#api-configuration" >}}).

### Plugin Bundles (Remote)

The plugin source code and associated configuration are bundled into a zip file and uploaded to a remote webserver. Multiple plugins can be stored in a single *plugin bundle*. Tyk Gateway will download the plugin bundle from the remote webserver and then extract, cache and execute plugins for each of the configured phases of the API request / response lifecycle. For further details on plugin bundles and how to configure them, please refer to the [plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}) page.

### gRPC Plugins (Remote)

Custom plugins can be hosted on a remote server and executed from the Tyk Gateway middleware chain via gRPC. These plugins can be written in any language you prefer, as they are executed on the gRPC server. You'll configure your API definition so that Tyk Gateway will send requests to your gRPC server at the appropriate points in the API request / response lifecycle. For further details please consult our [gRPC]({{< ref "api-management/plugins/rich-plugins#overview-1" >}}) documentation.

## Plugin Bundles

For Tyk Gateway to execute local custom plugins during the processing of API requests and responses, the plugin source code must be loaded into the Gateway. The source is usually stored in files and the API definition is used to point the Gateway at the correct file for each [plugin type]({{< ref "api-management/plugins/plugin-types#plugin-types" >}}). To simplify the management of plugins, you can group (or *bundle*) multiple plugin files together in a ZIP file that is referred to as a *plugin bundle*.

### When To Use Plugin Bundles

Plugin bundles are intended to simplify the process of attaching and loading custom middleware. Multiple API definitions can refer to the same plugin bundle (containing the source code and configuration) if required. Having this common, shared resource avoids you from having to duplicate plugin configuration for each of your APIs definitions. 

### How Plugin Bundles Work

The source code and a [manifest file](#manifest) are bundled into a zip file and uploaded to an external remote web server. The manifest file references the source code file path and the function name within the code that should be invoked for each [plugin type]({{< ref "api-management/plugins/plugin-types#plugin-types" >}}). Within the API definition, custom plugins are configured simply using the name of the bundle (zip file). Tyk Gateway downloads, caches, extracts and executes plugins from the downloaded bundle according to the configuration in the manifest file. 

{{< img src= "/img/plugins/plugin-bundles-overview.png" alt="plugin bundles architectural overview" >}}

#### Caching plugin bundles

Tyk downloads a plugin bundle on startup based on the configuration in the API definition, e.g. `http://my-bundle-server.com/bundles/bundle-latest.zip`. The bundle contents will be cached so that, when a Tyk reload event occurs, the Gateway does not have to retrieve the bundle from the server again each time. If you want to use a different bundle then you must update your API to retrieve a different bundle filename and then trigger a reload. It is not sufficient simply to replace the bundle file on your server with an updated version with the same name - the caching ensures this will not be retrieved during a reload event.

As a suggestion, you may organize your plugin bundle files using a Git commit reference or version number, e.g. `bundle-e5e6044.zip`, `bundle-48714c8.zip`, `bundle-1.0.0.zip`, `bundle-1.0.1.zip`, etc.

Alternatively, you may delete the cached bundle from Tyk manually and then trigger a hot reload to tell Tyk to fetch a new one.  By default, Tyk will store downloaded bundles in this path:
`{ TYK_ROOT } / { CONFIG_MIDDLEWARE_PATH } / bundles`

#### Gateway configuration

To configure Tyk Gateway to load plugin bundles the following parameters must be specified in your `tyk.conf`:

```yaml
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

- `enable_bundle_downloader`: Enables the bundle downloader.
- `bundle_base_url`: A base URL that will be used to download the bundle. For example if we have `bundle-latest.zip` specified in the API definition, Tyk will fetch the following file: `http://my-bundle-server.com/bundles/bundle-latest.zip` (see the next section for details).
-  `public_key_path`: Sets a public key, used for verifying signed bundles. If unsigned bundles are used you may omit this.

{{< note success >}}
**Note**  

Remember to set `"enable_coprocess": true` in your `tyk.conf` when using [rich plugins]({{< ref "api-management/plugins/overview#plugin-bundles" >}})!
{{< /note >}}

#### The manifest file {#manifest}

A plugin bundle must include a manifest file (called `manifest.json`). The manifest file contains important information like the configuration block and the list of source code files that will be included as part of the bundle file. If a file isn't specified in the list, it won't be included in the resulting file, even if it's present in the current directory.

A sample manifest file looks like this:

```json
{
  "file_list": [
    "middleware.py",
    "mylib.py"
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "PreMiddleware"
      }
    ],
    "post": [
      {
        "name": "PostMiddleware"
      }
    ],
    "driver": "python"
  },
  "checksum": "",
  "signature": ""
}
```

You may leave the `checksum` and `signature` fields empty, the bundler tool will fill these during the build process.

The `custom_middleware` block follows the standard syntax we use for Tyk plugins. In Tyk Community Edition, where file-based API configuration is used by default, a `custom_middleware` block is located/added to the API configuration file.

#### Creating plugin bundles

Tyk provides the Bundle CLI tool as part of the `tyk` binary. For further details please visit the [Bundle CLI tool]({{< ref "api-management/plugins/overview#bundler-cli-tool" >}}) page.

### Tyk OAS API Configuration

For API plugins that are deployed as [plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}), the API should be configured with the name of the plugin bundle file to download from your remote web server. Furthermore, the Gateway should be [configured]({{< ref "api-management/plugins/overview#gateway-configuration" >}}) to enable downloading plugin bundles.

You can configure your API with the name of the plugin bundle file to download within the Tyk OAS API definition or API Designer.

If you’re using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/plugins/overview#tyk-classic-apis" >}}) page.

#### Using API Definition

The configuration for a Tyk OAS API to fetch the download of a plugin bundle from a remote web server is encapsulated within the `pluginConfig` section within the `middleware.global` section of the `x-tyk-api-gateway` part of a Tyk OAS API Definition.

The `pluginConfig` section is structured as follows:

- `bundle`: A JSON entity that contains the following configuration parameters:
  - `enabled`: When `true`, enables the plugin.
  - `path`: The relative path of the zip file in relation to the base URL configured on the remote webserver that hosts plugin bundles.
- `driver`: Indicates the type of plugin, e.g. `golang`, `grpc`, `lua`, `otto` or `python`.

An illustrative example is listed below:

```json{hl_lines=["37-45"], linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-oas-plugin-configuration",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "put": {
                "operationId": "anythingput",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-oas-plugin-configuration",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-oas-plugin-configuration/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
              "pluginConfig": {
                "bundle": {
                  "enabled": true,
                  "path": "plugin.zip"
                },
                "driver": "goplugin"
              }
            } 
        }
    }
}
```

In this example we can see that bundle plugin has been configured within the `middleware.global.pluginConfig.bundle` object. The plugin is enabled and bundled within file `plugin.zip`. The plugin bundle is a Go plugin, i.e. `middleware.global.pluginConfig.driver` has been configured with value `goplugin`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out custom plugin bundles, assuming that you have provided a valid bundle file named `plugin.zip`.

#### Using API Designer

To configure plugin bundles for Tyk OAS APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the editor screen. Subsequently, follow the steps below:

1. **Access plugin options**

    Scroll down until the *Enable Plugin* section is displayed.

    {{< img src="/img/plugins/plugins_oas_api_bundles_config.png" alt="Tyk OAS API Bundle section" >}}

2. **Enable plugin bundle for you API**

    Enable a plugin bundle for your API by activating the toggle switch. 

3. **Enter relative path to plugin bundle file**

    Enter the relative path of the plugin bundle file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server that hosts your plugin bundles.

4. **Save the API**

    Select **Save API** to apply the changes to your API.

### Tyk Classic API Configuration

For custom plugins that are deployed as [plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}), the API should be configured with the name of the plugin bundle file to download from your remote web server. Furthermore, the Gateway should be [configured]({{< ref "api-management/plugins/overview#gateway-configuration" >}}) to enable downloading plugin bundles.

You can configure your API with the name of the plugin bundle file to download within the Tyk Classic API definition or API Designer.

If you’re using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "api-management/plugins/overview#tyk-oas-api-configuration" >}}) page.

#### Using API Definition

The configuration for an API to fetch and download a plugin bundle from a remote server is encapsulated within the `custom_middleware_bundle` field of the Tyk Classic API Definition. An illustrative example is listed below:

```json {hl_lines=["33"], linenos=true, linenostart=1}
{
  "name": "Tyk Classic Bundle API",
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
  "custom_middleware_bundle": "bundle-latest.zip"
}
```

With the configuration given in the example above, calls to the API will invoke the custom plugins defined in the `manifest.json` file contained within `bundle-latest.zip` uploaded to your remote webserver, e.g. `http://your-example-plugin-server.com/plugins`.

Tyk Gateway should be configured for downloading plugin bundles from a secured web server. Please consult the [plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}) documentation for further details.

#### Using API Designer

To configure plugin bundles for Tyk Classic APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the API editor screen. Subsequently, follow the steps below:

1. **Access plugin options**

    Click on the *Advanced Options* tab and scroll down until the *Plugin Options* section is displayed.

    {{< img src="/img/plugins/plugins_classic_api_bundles_config.png" alt="Tyk Classic Plugin Options section" >}}

2. **Enter relative path to bundle file**

    Enter the relative path of the plugin bundle file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server hosting plugin bundles.

3. **Save the API**

    Select the **save** or **update** button to apply the changes to your API.

### Bundler CLI Tool

The bundler tool is a CLI service, provided by _Tyk Gateway_ as part of its binary since v2.8. This lets you generate
[plugin bundles]({{< ref "api-management/plugins/overview#plugin-bundles" >}}).

{{< note >}}
**Note**  
Generated plugin bundles must be served using your own web server.
{{< /note >}}

Issue the following command to see more details on the `bundle` command:

```bash
/opt/tyk-gateway/bin/tyk bundle -h
```

---

#### Prerequisites

To create plugin bundles you will need the following:

- **Manifest.json**: The [manifest.json]({{< ref "api-management/plugins/overview#manifest" >}}) file
  contains the paths to the plugin source files and the name of the function implementing each plugin. The
  _manifest.json_ file is mandatory and must exist on the Tyk Gateway file system. By default the bundle CLI looks for
  a file named _manifest.json_ in the current working directory where the bundle command is run from. The exact location
  can be specified using the `--manifest` command option.
- **Plugin source code files**: The plugin source code files should be contained relative to the directory in which the
  _manifest.json_ file is located. The _manifest.json_ should contain relative path references to source code files.

  {{< note >}}
  **Note**  
  Source code files are not required when creating a plugin bundle for gRPC plugins since the plugin
  source code is located at the gRPC server.
  {{< /note >}}

- **Certificate key**: Plugin bundles can optionally be signed with an RSA private key. The corresponding public key
  should be located in the file configured in environmental variable `TYK_GW_PUBLICKEYPATH` or the `public_key_path`
  parameter in `tyk.conf`:

```json
{
  "enable_bundle_downloader": true,
  "bundle_base_url": "http://my-bundle-server.com/bundles/",
  "public_key_path": "/path/to/my/pubkey.pem"
}
```

---

#### Directory Structure

A suggested directory structure is shown below for Golang, Javascript and Python bundles in the tabs below.

{{< note success >}}
**Note**  

Sub-directories (folders) are not supported inside the `bundle-directory` location.

{{< /note >}}

{{< tabs_start >}} {{< tab_start "Golang" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
└── plugin.so                   # Compiled Golang plugin
```

{{< tab_end >}} {{< tab_start "Javascript" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
├── plugin1.js                  # First JavaScript plugin source file
└── plugin2.js                  # Second JavaScript plugin source file
```

{{< tab_end >}}

{{< tab_start "Python" >}}

```bash
/bundle-directory
├── manifest.json               # Manifest file with plugin references
├── plugin1.py                  # First Python plugin source file
└── plugin2.py                  # Second Python plugin source file
```

{{< tab_end >}}

{{< tabs_end >}}

The `manifest.json` will reference the files located in the `bundle-directory`, ensure plugin source files are organized relative to the manifest. The Tyk Gateway will load and execute these plugins based on the paths defined in the `manifest.json` file.

Sample `manifest.json` is shown below for Golang, Javascript and Python bundles in the tabs below.

{{< tabs_start >}} {{< tab_start "Golang" >}}

```json
{
  "file_list": [
    "plugin.so"
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "PreMiddleware",
        "path": "./plugin.so"
      }
    ],
    "post": [
      {
        "name": "PostMiddleware",
        "path": "./plugin.so"
      }
    ],
    "driver": "goplugin"
  },
  "checksum": "",
  "signature": ""
}

```

{{< tab_end >}} {{< tab_start "Javascript" >}}

```json
{
  "file_list": [
    "plugin1.js",
    "plugin2.js"
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "PreMiddleware",
        "path": "./plugin1.js"
      }
    ],
    "post": [
      {
        "name": "PostMiddleware",
        "path": "./plugin2.js"
      }
    ],
    "driver": "otto"
  },
  "checksum": "",
  "signature": ""
}
```

{{< tab_end >}}

{{< tab_start "Python" >}}

```json
{
  "file_list": [
    "plugin1.py",
    "plugin2.py"
  ],
  "custom_middleware": {
    "pre": [
      {
        "name": "PreMiddleware",
        "path": "./plugin1.py"
      }
    ],
    "post": [
      {
        "name": "PostMiddleware",
        "path": "./plugin2.py"
      }
    ],
    "driver": "python"
  },
  "checksum": "",
  "signature": ""
}
```

{{< tab_end >}}

{{< tabs_end >}}

---

#### Creating a plugin bundle

Run the following command to create the bundle:

```bash
$ tyk bundle build
```

The resulting file will contain all your specified files and a modified `manifest.json` with the checksum and signature
(if required) applied, in ZIP format.

By default, Tyk will attempt to sign plugin bundles for improved security. If no private key is specified, the program
will prompt for a confirmation. Use `-y` to override this (see options below).

---

#### Command Options

Instructions on how to create plugin bundles is displayed by issuing the following command:

```bash
/opt/tyk-gateway/bin/tyk bundle build -h
```

The following options are supported:

- `--manifest`: Specifies the path to the manifest file. This defaults to `manifest.json` within the current working
  directory.
- `--output`: Specifies the name of the bundle file e.g. `--output bundle-latest.zip`. If this flag is not specified,
  `bundle.zip` will be used.
- `-y`: Force tool to create unsigned bundle without prompting e.g. `$ tyk bundle build --output bundle-latest.zip -y`.
- `--key`: Specifies the path to your private key which is used to generate signed bundle e.g.
  `$ tyk bundle build --output bundle-latest.zip --key=mykey.pem`.

---

#### Docker Example

Since v5.5 Tyk Gateway uses distroless docker images.

For Gateway version < v5.5 it is possible to use Docker to create plugin bundles as shown in the example below.

```bash
docker run --rm -it \
  --name bundler \
  -v `pwd`:/plugin-source \
  -v `pwd`/../../../confs/keys:/keys \
  -w /plugin-source \
  --entrypoint /bin/bash \
  tykio/tyk-gateway:v5.4.0 \
  -c 'export PATH="/opt/tyk-gateway:$$PATH"; tyk bundle build -o bundle.zip -k /keys/key.pem'
```

This Docker command runs a container using the `tykio/tyk-gateway:v5.4.0` image to build a Tyk plugin bundle. It mounts
the current directory from the host as `/plugin-source` and a directory containing keys as `/keys` inside the container.
The working directory within the container is set to `/plugin-source`, and the default entrypoint is overridden to use
`/bin/bash`. The command executed in the container exports a modified `PATH` to include the Tyk Gateway binaries, then
runs `tyk bundle build` to generate a plugin bundle named `bundle.zip`, using the specified key for authentication. The
container is automatically removed after the command completes, and the operation is conducted interactively.

## Supported Languages

The following languages are supported for custom plugins:
*   [Golang]({{< ref "api-management/plugins/golang#" >}}): A plugin written in Golang is called a **Native Plugin**. Tyk recommends using Go plugins for performance, flexibility, and nativity reasons (all Tyk components are written in Go).
*   [JavaScript]({{< ref "api-management/plugins/javascript#" >}}): A plugin written in Javascript uses JavaScript Virtual Machine (JSVM) interpreter.
*   [Rich Plugins]({{< ref "api-management/plugins/rich-plugins#" >}}) includes Python, Lua, gRPC - With gRPC, you can write plugins in Java, .NET, C++ / C#, PHP, and all other [gRPC supported languages](https://grpc.io/docs/languages/).
Rich plugins give ultimate flexibility in the language of implementation, however, there are some performance and management overheads when compared with native GoLang plugin.

**Common To All Plugin Languages:**

* Make Layer 4 (TCP) or Layer 7 (HTTP/REST/SOAP) calls
* Open Persistent Connections
* Modify the request in-flight
* Used to stop the request and return a [custom response]({{< ref "api-management/plugins/plugin-types#return-overrides--returnoverrides" >}})
* Be served using [Bundles]({{< ref "api-management/plugins/overview#plugin-deployment-types" >}}) or by files on the file system, except gRPC of course which by definition is served by some webserver in the language of your choosing

### Plugin Hook Types

Tyk provide 5 different phases, i.e. hooks to inject custom plugin throughout the [API execution lifecycle]({{< ref "concepts/middleware-execution-order" >}}).

Not all hooks are supported in every language. The following table shows you which plugin language support which phase/hook:

|            | Auth   |   Pre    | Post-Auth | Post | Response   
|------------|--------|----------|-----------|------|-----------|
| GoLang     | ✅     |✅	        |✅         |✅    |✅
| JavaScript | ❌		 |✅	        |❌	       |✅ 	 |❌
| gRPC       | ✅		 |✅	        |✅	       |✅	   |✅
| Python     | ✅		 |✅	        |✅	       |✅	   |✅
| Lua        | ✅	   |✅	        |✅	       |✅	   |❌

More reading on the [hook types]({{< ref "api-management/plugins/rich-plugins#coprocess-dispatcher---hooks" >}}) in rich plugins and explanation with common use case for each [hook type]({{<ref "api-management/plugins/plugin-types#plugin-types">}}) 


### Plugin Driver Names

We use the following Plugin driver names:

| Plugin     | Name      | 
| ---------- | --------- |
| GoLang     | goplugin  |
| JavaScript | otto      |
| gRPC       | grpc      |
| Python 		 | python    |
| Lua        | lua	     |

### Limitations

What are the limitations to using this programming Language?

|   | GoLang |   JavaScript     | gRPC      | Python    |  Lua   
|---|--------|------------------|-----------|-----------|-----------|
| Runs in Gateway process | ✅<br>Runs<br>natively | ✅<br>Built-In JSVM Interpreter | ❌<br>Standalone server	| ✅<br>Tyk talks with Python interpreter	|✅
| Built-in SDK | ✅<br>All Gateway Functionality | ✅<br>[Yes]({{< ref "api-management/plugins/javascript#javascript-api" >}})	| ❌	| ✅<br>[Yes]({{< ref "api-management/plugins/rich-plugins#tyk-python-api-methods" >}})	| ❌
| TCP Connections<p>(DBs, Redis, etc)</p> | ✅ | ❌<br>Very Limited | ✅ | ✅ | ✅ | 

### Custom Plugin Table

We have put together a [GitHub repo with a table of custom plugins](https://github.com/TykTechnologies/custom-plugins#custom-gateway-plugins) in various languages that you can experiment with. If you would like to submit one that you have developed, feel free to open an issue in the repo.

### Differences between Rich Plugins and JSVM middleware

#### JavaScript
The JavaScript Virtual Machine provides pluggable middleware that can modify a request on the fly and are designed to augment a running Tyk process, are easy to implement and run inside the Tyk process in a sandboxed *ECMAScript* interpreter. This is good, but there are some drawbacks with the JSVM:

*   **Performance**: JSVM is performant, but is not easy to optimize and is dependent on the [otto interpreter](https://github.com/robertkrimen/otto) - this is not ideal. The JSVM also requires a copy of the interpreter object for each request to be made, which can increase memory footprint.
*   **Extensibility**: JSVM is a limited interpreter, although it can use some NPM modules, it isn't NodeJS so writing interoperable code (especially with other DBs) is difficult.
*   **TCP Access**: The JSVM has no socket access so working with DB drivers and directly with Redis is not possible.

#### Rich Plugins
Rich Plugins can provide replacements for existing middleware functions (as opposed to augmentation) and are designed to be full-blown, optimized, highly capable services. They enable a full customized architecture to be built that integrates with a user's infrastructure.

Rich Plugins bring about the following improvements:

*   **Performance**: Run on STDIN (unix pipes), which are extremely fast and run in their own memory space, and so can be optimized for performance way beyond what the JSVM could offer.
*   **Extensibility**: By allowing any language to be used so long as GRPC is supported, the extensibility of a CPH is completely open.
*   **TCP Access**: Because a plugin is a separate process, it can have it's own low-level TCP connections opens to databases and services.

## Plugin Caveats

- Tyk Gateway manages plugins for each API within the same process.
- For [gRPC plugins]({{< ref "api-management/plugins/rich-plugins#overview-1" >}}), Tyk Gateway can only be configured to integrate with one gRPC server.
- Javascript plugins only allow Pre and Post Request hooks of the API Request Lifecycle.


## Plugins Hub

<!-- Want to try and get a design layout setup for this that uses stylesheets from home page to offer similar layout -->

Welcome to the Tyk Plugins Hub, dedicated to providing you with a curated list of resources that showcase how to develop Tyk Plugins. 

[Tyk Plugins]({{< ref "api-management/plugins/overview#" >}}) are a powerful tool that allows you to develop custom middleware that can intercept requests at different stages of the request lifecycle, modifying/transforming headers and body content.

Tyk has extensive support for writing custom plugins using a wide range of languages, most notably: Go, Python, Javascript etc. In fact, plugins can be developed using most languages via *gRPC*.

### Blogs

Selected blogs for plugin development are included below. Further examples are available at the Tyk [website](https://tyk.io/?s=plugin).

1. **[Decoupling micro-services using Message-based RPC](https://medium.com/@asoorm/decoupling-micro-services-using-message-based-rpc-fa1c12409d8f)**
    
    - **Summary**: Explains how to write a plugin that intercepts an API request and forwards it to a gRPC server. The gRPC server processes the request and dispatches work to an RabbitMQ message queue. The source code is available in the accompanying [GitHub repository](https://github.com/asoorm/tyk-rmq-middleware)

2. **[How to configure a gRPC server using Tyk](https://tyk.io/blog/how-to-configure-a-grpc-server-using-tyk/)**
    
    - **Summary**: Explains how to configure a Python implementation of a gRPC server to add additional logic to API requests. During the request lifecycle, the Tyk-Gateway acts as a gRPC client that contacts the Python gRPC server, providing additional custom logic.

3. **[How to deploy Python plugins in Tyk running On Kubernetes](https://tyk.io/blog/how-to-deploy-python-plugins-in-tyk-running-on-kubernetes/)**
    
    - **Summary**: Explains how to deploy a custom Python plugin into a Tyk installation running on a Kubernetes cluster.

### GitHub Repositories

Here are some carefully selected GitHub repositories that will help you learn how to integrate and utilize Tyk Plugins in your development projects:

1. **[Tyk Awesome Plugins](https://github.com/TykTechnologies/tyk-awesome-plugins)**

    - **Description**: Index of plugins developed using a variety of languages.
    - **Key Features Demonstrated**: A comprehensive index for a collection of plugins that can be used with the Tyk API Gateway in areas such as: rate limiting, authentication and request transformation. The examples are developed using a diverse array of languages, including but not limited to: Python, JavaScript and Go. This broad language support ensures that developers from different backgrounds and with various language preferences can seamlessly integrate these plugins with their Tyk API Gateway implementations.

2. **[Custom Plugin Examples](https://github.com/TykTechnologies/custom-plugin-examples/tree/master)**

    - **Description**: Index of examples for a range of plugin hooks (Pre, Post, Post-Auth and Response) developed using a variety of languages.
    - **Key Features Demonstrated**: Specific examples include invoking an AWS lambda, inserting a new claim into a JWT, inject a signed JWT into authorization header, request header modification. A range of examples are available including Python, Java, Ruby, Javascript, NodeJS and Go.

3. **[Environment For Plugin Development](https://github.com/TykTechnologies/custom-go-plugin)**

    - **Description**: Provides a docker-compose environment for developing your own custom Go plugins.
    - **Key Features Demonstrated**: Showcases support for bundling plugins, uploading plugins to AWS S3 storage, test coverage etc.


