---
date: 2017-03-24T15:45:13Z
description: Explains purpose and how to use plugins to affect Tyk environment
title: Custom Plugins and Middleware
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
aliases:
    - /plugins/get-started-selfmanaged/deploy
    - /plugins/get-started-selfmanaged/get-started
    - /plugins/get-started-selfmanaged/run
    - /plugins/get-started-selfmanaged/test
    - /plugins/get-started-plugins
    - "/plugins/how-to-serve"
    - /plugins/rich-plugins/plugin-bundles
    - /plugins/how-to-serve/plugin-bundles
    - /plugins/request-plugins
    - "/plugins/auth-plugins"
    - /customise-tyk/plugins/rich-plugins/id-extractor/
    - /plugins/rich-plugins/id-extractor
    - /plugins/auth-plugins/id-extractor
    - plugins/response-plugins
    - /plugins/golang-plugins/golang-plugins/
    - /customise-tyk/plugins/golang-plugins/golang-plugins/
    - /plugins/supported-languages/golang/
    - /customise-tyk/plugins/javascript-middleware/
    - /customise-tyk/plugins/javascript-middleware/middleware-execution-order/
    - /plugins/javascript-middleware
    - /plugins/supported-languages/javascript-middleware/
    - /plugins/supported-languages/javascript-middleware/
    - /plugins/supported-languages/javascript-middleware/install-middleware/install-middleware
    - /plugins/javascript-middleware/install-middleware
    - /tyk-api-gateway-v1-9/javascript-plugins/middleware-scripting/
    - /plugins/javascript-middleware/middleware-scripting-guide
    - /customise-tyk/plugins/javascript-middleware/javascript-api/
    - /plugins/javascript-middleware/javascript-api
    - /plugins/javascript-middleware/install-middleware/tyk-pro
    - /plugins/javascript-middleware/install-middleware/tyk-hybrid
    - /plugins/javascript-middleware/install-middleware/tyk-ce
    - /plugins/rich-plugins
    - /plugins/supported-languages/rich-plugins/
    - /plugins/rich-plugins/rich-plugins-work
    - /plugins/rich-plugins/rich-plugins-data-structures
    - /customise-tyk/plugins/rich-plugins/rich-plugins-work/
    - /customise-tyk/plugins/rich-plugins/python/
    - /plugins/rich-plugins/python
    - /customise-tyk/plugins/rich-plugins/python/custom-auth-python-tutorial/
    - "plugins/supported-languages/rich-plugins/python/custom-auth-python-tutorial"
    - plugins/rich-plugins/python/custom-auth-python-tutorial
    - "plugins/supported-languages/rich-plugins/python/tutorial-add-demo-plugin-api"
    - plugins/rich-plugins/python/tutorial-add-demo-plugin-api
    - /customise-tyk/plugins/rich-plugins/python/tutorial-add-demo-plugin-api/
    - "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods"
    - plugins/rich-plugins/python/tyk-python-api-methods
    - "plugins/supported-languages/rich-plugins/python/performance"
    - plugins/rich-plugins/python/performance
    - /customise-tyk/plugins/rich-plugins/grpc/
    - /customise-tyk/plugins/rich-plugins/grpc/
    - /plugins/rich-plugins/grpc
    - /plugins/rich-plugins/grpc/grpc-plugins-tyk
    - /plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin
    - /plugins/rich-plugins/grpc/write-grpc-plugin
    - /plugins/supported-languages/rich-plugins/grpc/tutorial-add-grpc-plugin-api
    - /plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api
    - "/plugins/rich-plugins/grpc/performance"
    - "/plugins/rich-plugins/grpc/request-transformation-java"
    - /customise-tyk/plugins/rich-plugins/grpc/custom-auth-dot-net/
    - "/plugins/rich-plugins/grpc/custom-auth-dot-net"
    - "/plugins/rich-plugins/grpc/custom-auth-nodejs"
    - "plugins/supported-languages/rich-plugins/luajit"
    - plugins/rich-plugins/luajit
    - "plugins/supported-languages/rich-plugins/luajitrequirements"
    - plugins/rich-plugins/luajit/requirements
    - plugins/supported-languages/rich-plugins/luajittutorial-add-demo-plugin-api
    - plugins/rich-plugins/luajit/tutorial-add-demo-plugin-api
    - /developer-support/upgrading-tyk/deployment-model/self-managed/go-plugins
    - /getting-started/using-oas-definitions/mock-response/
    - /advanced-configuration/transform-traffic/request-body/
    - /advanced-configuration/transform-traffic/request-headers/
    - /advanced-configuration/transform-traffic/url-rewriting
    - /transform-traffic/validate-json/
    - /getting-started/key-concepts/request-validation/
    - /advanced-configuration/transform-traffic/validate-json
    - /advanced-configuration/compose-apis/sample-batch-funtion/
    - /compose-apis/virtual-endpoints/
    - /advanced-configuration/compose-apis
    - /transform-traffic/endpoint-designer/
    - /transform-traffic/endpoint-designer/
    - /concepts/context-variables/
    - /getting-started/key-concepts/context-variables/
---
This section provides detailed guidance on how to extend and customize Tyk's API gateway functionality using plugins and middleware. You'll learn how to create plugins in supported languages like Go, JavaScript, and Python, integrate with external tools like OpenTelemetry, and configure middleware for tasks such as transforming traffic or managing authentication.

The topics covered include quickstart tutorials for plugin development, a breakdown of available plugin types, instructions for deploying and packaging plugins, and advanced configurations for traffic handling. Whether you're building request-handling logic, integrating telemetry for monitoring, or modifying API responses, this section equips you with the knowledge to adapt Tyk to your unique requirements.


## Plugins Hub

<!-- Want to try and get a design layout setup for this that uses stylesheets from home page to offer similar layout -->

Welcome to the Tyk Plugins Hub, dedicated to providing you with a curated list of resources that showcase how to develop Tyk Plugins. 

[Tyk Plugins]({{< ref "plugins" >}}) are a powerful tool that allows you to develop custom middleware that can intercept requests at different stages of the request lifecycle, modifying/transforming headers and body content.

Tyk has extensive support for writing custom plugins using a wide range of languages, most notably: Go, Python, Javascript etc. In fact, plugins can be developed using most languages via *gRPC*.

### Blogs

Selected blogs for plugin development are included below. Further examples are available at the Tyk [website](https://tyk.io/?s=plugin).

#### 1. [Decoupling micro-services using Message-based RPC](https://medium.com/@asoorm/decoupling-micro-services-using-message-based-rpc-fa1c12409d8f)
- **Summary**: Explains how to write a plugin that intercepts an API request and forwards it to a gRPC server. The gRPC server processes the request and dispatches work to an RabbitMQ message queue. The source code is available in the accompanying [GitHub repository](https://github.com/asoorm/tyk-rmq-middleware)

#### 2. [How to configure a gRPC server using Tyk](https://tyk.io/blog/how-to-configure-a-grpc-server-using-tyk/)
- **Summary**: Explains how to configure a Python implementation of a gRPC server to add additional logic to API requests. During the request lifecycle, the Tyk-Gateway acts as a gRPC client that contacts the Python gRPC server, providing additional custom logic.

#### 3. [How to deploy Python plugins in Tyk running On Kubernetes](https://tyk.io/blog/how-to-deploy-python-plugins-in-tyk-running-on-kubernetes/)
- **Summary**: Explains how to deploy a custom Python plugin into a Tyk installation running on a Kubernetes cluster.

### GitHub Repositories

Here are some carefully selected GitHub repositories that will help you learn how to integrate and utilize Tyk Plugins in your development projects:

#### 1. [Tyk Awesome Plugins](https://github.com/TykTechnologies/tyk-awesome-plugins)
- **Description**: Index of plugins developed using a variety of languages.
- **Key Features Demonstrated**: A comprehensive index for a collection of plugins that can be used with the Tyk API Gateway in areas such as: rate limiting, authentication and request transformation. The examples are developed using a diverse array of languages, including but not limited to: Python, JavaScript and Go. This broad language support ensures that developers from different backgrounds and with various language preferences can seamlessly integrate these plugins with their Tyk API Gateway implementations.

#### 2. [Custom Plugin Examples](https://github.com/TykTechnologies/custom-plugin-examples/tree/master)
- **Description**: Index of examples for a range of plugin hooks (Pre, Post, Post-Auth and Response) developed using a variety of languages.
- **Key Features Demonstrated**: Specific examples include invoking an AWS lambda, inserting a new claim into a JWT, inject a signed JWT into authorization header, request header modification. A range of examples are available including Python, Java, Ruby, Javascript, NodeJS and Go.

#### 3. [Environment For Plugin Development](https://github.com/TykTechnologies/custom-go-plugin)
- **Description**: Provides a docker-compose environment for developing your own custom Go plugins.
- **Key Features Demonstrated**: Showcases support for bundling plugins, uploading plugins to AWS S3 storage, test coverage etc.


## Quickstarts

### Go Plugins Quickstart

This section takes you through the process of running and building a quickstart Go plugin, included within Tyk's [getting started](https://github.com/TykTechnologies/custom-go-plugin) repository. Go plugins are the recommended plugin type and suitable for most use cases.

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


#### Dashboard Plugins Quickstart

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

##### 1. Add your Tyk license

Create and edit the file `.env` with your Tyk Dashboard license key

```console
# Make a copy of the example .env file for the Tyk-Dashboard 
cp .env.example .env
```

##### 2. Bootstrap the getting started example

run the `make` command:

```bash
make
```

This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

##### 3. Log in to Tyk Dashboard

Log on to the Tyk Dashboard on `http://localhost:3000` using the following Bootstrapped credentials:
```
demo@tyk.io
```
and password:
```
topsecretpassword
```

Note: these are editable in `.env.example`

##### 4. View the pre-configured API

Once you're logged on to the Tyk Dashboard, navigate to the *APIs* screen.

You'll see a sample *Httpbin* API.  Let's click into it for more details.

Click on *VIEW RAW DEFINITION*.  Note the *custom_middleware* block is filled out, injecting the compiled example Go plugin into the API.

##### 5. Test the plugin

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

##### 6. View the analytics

Navigate to the Dashboard's various *API Usage Data* to view analytics on the API request!


#### Open-Source Plugins Quickstart



This quick start guide will explain how to run the [getting started](https://github.com/TykTechnologies/custom-go-plugin) Go plugin using the Tyk OSS Gateway.

##### 1. Bootstrap the getting started example

Please run the following command from within your newly cloned directory to run the Tyk Stack and compile the sample plugin.  This will take a few minutes as we have to download all the necessary dependencies and docker images.

```bash
make up-oss && make build
```

##### 2. Test the plugin

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


##### 3. View the analytics

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


### CICD Plugin Build

It's very important to automate the deployment of your infrastructure.  

Ideally, you store your configurations and code in version control, and then through a trigger, have the ability to deploy everything automatically into higher environments.

With custom plugins, this is no different.

To illustrate this, we can look at the GitHub Actions of the [example repo][0].

We see that upon every pull request, a section of steps are taken to "Build, [Bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}), Release Go Plugin".

Let's break down the [workflow file][1]:


#### 1. Compiling the Plugin

We can see the first few steps replicate our first task, bootstrapping the environment and compiling the plugin into a binary format.

```make
 steps:
    - uses: actions/checkout@v3
      
    - name: Copy Env Files
      run: cp tyk/confs/tyk_analytics.env.example tyk/confs/tyk_analytics.env

    - name: Build Go Plugin
      run: make go-build
```

We can look at the [Makefile][2] to further break down the last `go-build` command.

#### 2. Bundle The Plugin

The next step of the workflow is to "[bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})" the plugin.

```
- name: Bundle Go Plugin
      run: docker-compose run --rm --user=1000 --entrypoint "bundle/bundle-entrypoint.sh" tyk-gateway
```

This command generates a "bundle" from the sample Go plugin in the repo.

{{< note success >}}
**Note**  

For added security, please consider signing your [bundles]({{< ref "plugins/how-to-serve-plugins.md" >}}), especially if the connection between the Gateways and the Bundler server traverses the internet.

{{< /note >}}


Custom plugins can be "bundled", (zipped/compressed) into a standard format, and then uploaded to some server so that they can be downloaded by the Gateways in real time.

This process allows us to decouple the building of our custom plugins from the runtime of the Gateways.

In other words, Gateways can be scaled up and down, and pointed at different plugin repos very easily.  This makes it easier to deploy Custom plugins especially in containerized environments such as Kubernetes, where we don't have to worry about persistent volumes.

You can read more about plugin bundles [here][3].

#### 3. Deploy The Plugin

Next step of the workflow is to publish our bundle to a server that's reachable by the Gateways.

```make
- name: Upload Bundle
      uses: actions/upload-artifact@v3
      with:
        name: customgoplugin.zip
        path: tyk/bundle/bundle.zip

    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'   
        SOURCE_DIR: 'tyk/bundle'
```

This step uploads the Bundle to both GitHub and an AWS S3 bucket.  Obviously, your workflow will look slightly different here.

{{< note success >}}
**Note**  

For seamless deployments, take a look at multi-version [plugin support]({{< ref "plugins/supported-languages/golang.mdd#upgrading-your-tyk-gateway" >}}) to enable zero downtime deployments of your Tyk Gateway installs

{{< /note >}}

#### 4. Configure the Gateway

In order to instruct the Gateway to download the bundle, we need two things:

1. The root server - The server which all bundles will be downloaded from.  This is set globally in the Tyk conf file [here]({{< ref "tyk-oss-gateway/configuration#enable_bundle_downloader" >}}).

2. The name of the bundle - this is generated during your workflow usually.  This is defined at the API level (this is where you declare Custom plugins, as evident in task 2)

The field of the API Definition that needs to be set is `custom_middleware_bundle`.


[0]: https://github.com/TykTechnologies/custom-go-plugin/actions
[1]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/.github/workflows/makefile.yml
[2]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/Makefile#L59
[3]: https://github.com/TykTechnologies/custom-go-plugin#deploying-the-go-plugin
[4]: https://github.com/TykTechnologies/custom-plugin-examples



## Serving Plugins

### How To Serve Plugins

If you are using gRPC, [please visit the gRPC section]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}}), as you don't add plugin files to the Tyk Gateway for it to read, it will simply make a connection to your gRPC server.

**For everything else, there are two ways to add custom plugins:**

1.  Publish the plugin on an HTTP Server so the Gateway can download it. [This is called Bundling.]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})

2.  Mount your custom plugin on the Gateway's file system.  Find examples under your favorite  programming language under [Supported Languages](../supported-languages)

#### Approach #2 Examples

##### JavaScript pre plugin -  modify header
https://gist.github.com/asoorm/4dd9f4361ad92d2f7201141fc09cbcb1

##### GoLang auth plugin - check User credentials against AWS DynamoDB
https://github.com/TykTechnologies/native-go-auth-middleware

#### Plugin Bundles

For Tyk Gateway to execute local custom plugins during the processing of API requests and responses, the plugin source code must be loaded into the Gateway. The source is usually stored in files and the API definition is used to point the Gateway at the correct file for each [plugin type]({{< ref "plugins/plugin-types/plugintypes" >}}). To simplify the management of plugins, you can group (or *bundle*) multiple plugin files together in a ZIP file that is referred to as a *plugin bundle*.

##### When To Use Plugin Bundles

Plugin bundles are intended to simplify the process of attaching and loading custom middleware. Multiple API definitions can refer to the same plugin bundle (containing the source code and configuration) if required. Having this common, shared resource avoids you from having to duplicate plugin configuration for each of your APIs definitions. 

##### How Plugin Bundles Work

The source code and a [manifest file](#manifest) are bundled into a zip file and uploaded to an external remote web server. The manifest file references the source code file path and the function name within the code that should be invoked for each [plugin type]({{< ref "plugins/plugin-types/plugintypes" >}}). Within the API definition, custom plugins are configured simply using the name of the bundle (zip file). Tyk Gateway downloads, caches, extracts and executes plugins from the downloaded bundle according to the configuration in the manifest file. 

{{< img src= "/img/plugins/plugin-bundles-overview.png" alt="plugin bundles architectural overview" >}}

**Caching plugin bundles**

Tyk downloads a plugin bundle on startup based on the configuration in the API definition, e.g. `http://my-bundle-server.com/bundles/bundle-latest.zip`. The bundle contents will be cached so that, when a Tyk reload event occurs, the Gateway does not have to retrieve the bundle from the server again each time. If you want to use a different bundle then you must update your API to retrieve a different bundle filename and then trigger a reload. It is not sufficient simply to replace the bundle file on your server with an updated version with the same name - the caching ensures this will not be retrieved during a reload event.

As a suggestion, you may organize your plugin bundle files using a Git commit reference or version number, e.g. `bundle-e5e6044.zip`, `bundle-48714c8.zip`, `bundle-1.0.0.zip`, `bundle-1.0.1.zip`, etc.

Alternatively, you may delete the cached bundle from Tyk manually and then trigger a hot reload to tell Tyk to fetch a new one.  By default, Tyk will store downloaded bundles in this path:
`{ TYK_ROOT } / { CONFIG_MIDDLEWARE_PATH } / bundles`

**Gateway configuration**

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

Remember to set `"enable_coprocess": true` in your `tyk.conf` when using [rich plugins]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}})!
{{< /note >}}

**The manifest file**

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


##### Creating plugin bundles

Tyk provides the Bundle CLI tool as part of the `tyk` binary. For further details please visit the [Bundle CLI tool]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/bundles/bundle-cli" >}}) page.



### Monitor Plugin Performance with OpenTelemetry

#### OpenTelemetry Instrumentation in Go Plugins

By instrumenting your custom plugins with Tyk's *OpenTelemetry* library, you can gain additional insights into custom plugin behavior like time spent and exit status. Read on to see some examples of creating span and setting attributes for your custom plugins.

{{< note success >}}
**Note:**
Although this documentation is centered around Go plugins, the outlined principles are universally applicable to plugins written in other languages. Ensuring proper instrumentation and enabling detailed tracing will integrate the custom plugin span into the trace, regardless of the underlying programming language.
{{< /note >}}

##### Prerequisites

- Go v1.19 or higher
- Gateway instance with OpenTelemetry and DetailedTracing enabled:

Add this field within your [Gateway config file]({{< ref "tyk-oss-gateway/configuration" >}}):

```json
{
  "opentelemetry": {
    "enabled": true
  }
}
```

And this field within your [API definition]({{< ref "getting-started/key-concepts/what-is-an-api-definition" >}}):

```json
{
  "detailed_tracing": true
}
```

You can find more information about enabling OpenTelemetry [here]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}).

{{< note success >}}
**Note**

DetailedTracing must be enabled in the API definition to see the plugin spans in the traces.
{{< /note >}}

In order to instrument our plugins we will be using Tyk’s OpenTelemetry library implementation.
You can import it by running the following command:

```console
$ go get github.com/TykTechnologies/opentelemetry
```

</br>

{{< note success >}}
**Note**

In this case, we are using our own OpenTelemetry library for convenience. You can also use the [Official OpenTelemetry Go SDK](https://github.com/open-telemetry/opentelemetry-go)
{{< /note >}}

##### Create a new span from the request context

`trace.NewSpanFromContext()` is a function that helps you create a new span from the current request context. When called, it returns two values: a fresh context with the newly created span embedded inside it, and the span itself. This method is particularly useful for tracing the execution of a piece of code within a web request, allowing you to measure and analyze its performance over time.

The function takes three parameters:

1. `Context`: This is usually the current request’s context. However, you can also derive a new context from it, complete with timeouts and cancelations, to suit your specific needs.
2. `TracerName`: This is the identifier of the tracer that will be used to create the span. If you do not provide a name, the function will default to using the `tyk` tracer.
3. `SpanName`: This parameter is used to set an initial name for the child span that is created. This name can be helpful for later identifying and referencing the span.

Here's an example of how you can use this function to create a new span from the current request context:

```go
package main
import (
    "net/http"
    "github.com/TykTechnologies/opentelemetry/trace"
)
// AddFooBarHeader adds a custom header to the request.
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
    // We create a new span using the context from the incoming request.
    _, newSpan := trace.NewSpanFromContext(r.Context(), "", "GoPlugin_first-span")
    // Ensure that the span is properly ended when the function completes.
    defer newSpan.End()
    // Add a custom "Foo: Bar" header to the request.
    r.Header.Add("Foo", "Bar")
}
func main() {}
```

In your exporter (in this case, Jaeger) you should see something like this:

{{< img src="/img/plugins/span_from_context.png" alt="OTel Span from context" >}}

As you can see, the name we set is present: `GoPlugin_first-span` and it’s the first child of the `GoPluginMiddleware` span.

##### Modifying span name and set status

The span created using `trace.NewSpanFromContext()` can be further configured after its creation. You can modify its name and set its status:

```go
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	_, newSpan := trace.NewSpanFromContext(r.Context(), "", "GoPlugin_first-span")
	defer newSpan.End()

	// Set a new name for the span.
	newSpan.SetName("AddFooBarHeader Testing")

	// Set the status of the span.
	newSpan.SetStatus(trace.SPAN_STATUS_OK, "")

	r.Header.Add("Foo", "Bar")
}
```

This updated span will then appear in the traces as `AddFooBarHeader Testing` with an **OK Status**.

The second parameter of the `SetStatus` method can accept a description parameter that is valid for **ERROR** statuses.

The available span statuses in ascending hierarchical order are:

- `SPAN_STATUS_UNSET`

- `SPAN_STATUS_ERROR`

- `SPAN_STATUS_OK`

This order is important: a span with an **OK** status cannot be overridden with an **ERROR** status. However, the reverse is possible - a span initially marked as **UNSET** or **ERROR** can later be updated to **OK**.

{{< img src="/img/plugins/span_name_and_status.png" alt="OTel Span name and status" >}}

Now we can see the new name and the `otel.status_code` tag with the **OK** status.

##### Setting attributes

The `SetAttributes()` function allows you to set attributes on your spans, enriching each trace with additional, context-specific information.

The following example illustrates this functionality using the OpenTelemetry library's implementation by Tyk

```go
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	_, newSpan := trace.NewSpanFromContext(r.Context(), "", "GoPlugin_first-span")
	defer newSpan.End()

    // Set an attribute on the span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "1"))

	r.Header.Add("Foo", "Bar")
}
```

In the above code snippet, we set an attribute `go_plugin` with a value of `1` on the span. This is just a demonstration; in practice, you might want to set attributes that carry meaningful data relevant to your tracing needs.

Attributes are key-value pairs. The value isn't restricted to string data types; it can be any value, including numerical, boolean, or even complex data types, depending on your requirements. This provides flexibility and allows you to include rich, structured data within your spans.

The illustration below, shows how the `go_plugin` attribute looks in Jaeger:

{{< img src="/img/plugins/span_attributes.png" alt="OTel Span attributes" >}}

##### Multiple functions = Multiple spans

To effectively trace the execution of your plugin, you can create additional spans for each function execution. By using context propagation, you can link these spans, creating a detailed trace that covers multiple function calls. This allows you to better understand the sequence of operations, pinpoint performance bottlenecks, and analyze application behavior.

Here's how you can implement it:

```go
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	// Start a new span for this function.
	ctx, newSpan := trace.NewSpanFromContext(r.Context(), "", "GoPlugin_first-span")
	defer newSpan.End()

	// Set an attribute on this span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "1"))

	// Call another function, passing in the context (which includes the new span).
	NewFunc(ctx)

	// Add a custom "Foo: Bar" header to the request.
	r.Header.Add("Foo", "Bar")
}

func NewFunc(ctx context.Context) {
	// Start a new span for this function, using the context passed from the calling function.
	_, newSpan := trace.NewSpanFromContext(ctx, "", "GoPlugin_second-span")
	defer newSpan.End()

	// Simulate some processing time.
	time.Sleep(1 * time.Second)

	// Set an attribute on this span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "2"))
}
```

In this example, the `AddFooBarHeader` function creates a span and then calls `NewFunc`, passing the updated context. The `NewFunc` function starts a new span of its own, linked to the original through the context. It also simulates some processing time by sleeping for 1 second, then sets a new attribute on the second span. In a real-world scenario, the `NewFunc` would contain actual code logic to be executed.

The illustration below, shows how this new child looks in Jaeger:

{{< img src="/img/plugins/multiple_spans.png" alt="OTel Span attributes" >}}

##### Error handling

In OpenTelemetry, it's essential to understand the distinction between recording an error and setting the span status to error. The `RecordError()` function records an error as an exception span event. However, this alone doesn't change the span's status to error. To mark the span as error, you need to make an additional call to the `SetStatus()` function.

> RecordError will record err as an exception span event for this span. An additional call to SetStatus is required if the Status of the Span should be set to Error, as this method does not change the Span status. If this span is not being recorded or err is nil then this method does nothing.

Here's an illustrative example with function calls generating a new span, setting attributes, setting an error status, and recording an error:

```go
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	// Create a new span for this function.
	ctx, newSpan := trace.NewSpanFromContext(r.Context(), "", "GoPlugin_first-span")
	defer newSpan.End()

	// Set an attribute on the new span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "1"))

	// Call another function, passing in the updated context.
	NewFunc(ctx)

	// Add a custom header "Foo: Bar" to the request.
	r.Header.Add("Foo", "Bar")
}

func NewFunc(ctx context.Context) {
	// Create a new span using the context passed from the previous function.
	ctx, newSpan := trace.NewSpanFromContext(ctx, "", "GoPlugin_second-span")
	defer newSpan.End()

	// Simulate some processing time.
	time.Sleep(1 * time.Second)

	// Set an attribute on the new span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "2"))

	// Call a function that will record an error and set the span status to error.
	NewFuncWithError(ctx)
}

func NewFuncWithError(ctx context.Context) {
	// Start a new span using the context passed from the previous function.
	_, newSpan := trace.NewSpanFromContext(ctx, "", "GoPlugin_third-span")
	defer newSpan.End()

	// Set status to error.
	newSpan.SetStatus(trace.SPAN_STATUS_ERROR, "Error Description")

	// Set an attribute on the new span.
	newSpan.SetAttributes(trace.NewAttribute("go_plugin", "3"))

	// Record an error in the span.
	newSpan.RecordError(errors.New("this is an auto-generated error"))
}
```

In the above code, the `NewFuncWithError` function demonstrates error handling in OpenTelemetry. First, it creates a new span. Then it sets the status to error, and adds an attribute. Finally, it uses `RecordError()` to log an error event. This two-step process ensures that both the error event is recorded and the span status is set to reflect the error.

{{< img src="/img/plugins/span_error_handling.png" alt="OTel Span error handling" >}}




## Plugin Types


Custom Plugins enable users to execute custom code to complete tasks specific to their particular use case. This allows users to complete tasks that would not otherwise be possible using Tyk's standard middleware options. Tyk has a [pre-defined execution order]({{< ref "/concepts/middleware-execution-order" >}}) for the middleware which also includes seven hooks for the custom plugins. As such, users can execute, or "hook", their plugin in these phases of the API request/response lifecycle based on their specific use case.

#### Plugin and Hook Types
This table includes all the plugin types with the relevant hooks, their place in the execution chain, description and examples:

| Hook Type (in their execution order) | Plugin Type | HTTP Request/Response phase | Executed before/after reverse proxy to the upstream API | Details | Common Use Cases |  
|--------------------------|----|---|--------------|--------------------|---------
| Pre (Request) | Request Plugin |  HTTP request | Before | The first thing to be executed, before any middleware  | IP Rate Limit plugins,  API Request enrichment      |
| Authentication| Authentication Plugin |  HTTP request | Before | Replaces Tyk's authentication & authorization middleware with your own business logic |  When you need your a custom flow, for example, interfacing with legacy Auth database |
| Post-Auth (Request)| Authentication Plugin |  HTTP request | Before | Executed immediately after authentication middleware  | Additional special custom authentication is needed |
| Post (Request)| Request Plugin  |  HTTP request| Before | The final middleware to be executed during the *HTTP request* phase (see **Note** below)  | Update the request before it gets to the upstream, for example, adding a header that might override another header, so we add it at the end to ensure it doesn't get overridden |
| Response Plugin| Response Plugin |  HTTP Response | After | Executed after the reverse proxy to the upstream API | Executed straight after the reverse proxy returns from the upstream API to Tyk  |  Change the response before the user gets it, for example, change `Location` header from internal to an external URL |
| Analytics Plugin (Request+Response)| Analytics Plugin | HTTP request | After | The final middleware to be executed during the *HTTP response* phase  | Change analytics records, for example, obfuscating sensitive data such as the `Authorization` header |

{{< note success >}}
**Note**  

There are two different options for the <b>Post</b> Plugin that is executed at the end of the request processing chain. The API-level Post Plugin is applied to all requests, whilst the [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) custom Golang plugin is only applied to requests made to specific endpoints. If both are configured, the endpoint-level plugin will be executed first.
{{< /note >}}


### Request Plugins

There are 4 different phases in the [request lifecycle]({{< ref "concepts/middleware-execution-order" >}}) you can inject custom plugins, including [Authentication plugins]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}}).  There are performance advantages to picking the correct phase, and of course that depends on your use case and what functionality you need.

#### Hook Capabilities
| Functionality           |   Pre    |  Auth       | Post-Auth |    Post   |
|-------------------------|----------|-------------|-----------|-----------|
| Can modify the Header   | ✅       | ✅          | ✅       | ✅  
| Can modify the Body     | ✅       | ✅          | ✅       |✅
| Can modify Query Params | ✅       | ✅          | ✅       |✅
| Can view Session<sup>1</sup> Details (metadata, quota, context-vars, tags, etc)  |   ❌       | ✅          |✅          |✅
| Can modify Session<sup>1</sup> <sup>2</sup> |    ❌      | ✅          |    ❌      |❌
| Can Add More Than One<sup>3</sup> |    ✅      |        ❌   |✅          | ✅

[1] A [Session object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}) contains allowances and identity information that is unique to each requestor

[2] You can modify the session by using your programming language's SDK for Redis. Here is an [example](https://github.com/TykTechnologies/custom-plugins/blob/master/plugins/go-auth-multiple_hook_example/main.go#L135) of doing that in Golang.

[3] For select hook locations, you can add more than one plugin.  For example, in the same API request, you can have 3 Pre, 1 auth, 5 post-auth, and 2 post plugins.

#### Return Overrides / ReturnOverrides  
You can have your plugin finish the request lifecycle and return a response with custom  payload & headers to the requestor.

[Read more here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#returnoverrides" >}})

##### Python Example

```python
from tyk.decorators import *

@Hook
def MyCustomMiddleware(request, session, spec):
    print("my_middleware: MyCustomMiddleware")
    request.object.return_overrides.headers['content-type'] = 'application/json'
    request.object.return_overrides.response_code = 200
    request.object.return_overrides.response_error = "{\"key\": \"value\"}\n"
    return request, session
```

##### JavaScript Example
```javascript
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});

testJSVMData.NewProcessRequest(function(request, session, config) {
	request.ReturnOverrides.ResponseError = "Foobarbaz"
    request.ReturnOverrides.ResponseBody = "Foobar"
	request.ReturnOverrides.ResponseCode = 200
	request.ReturnOverrides.ResponseHeaders = {
		"X-Foo": "Bar",
		"X-Baz": "Qux"
	}
	return testJSVMData.ReturnData(request, {});
});
```

### Authentication Plugins

If you have unique authentication requirements, you can write a custom authentication plugin.

#### Session Authentication and Authorization

A very important thing to understand when using custom authentication plugins is that Tyk will continue to perform session authentication and authorization using the information returned by your plugin. Tyk will cache this Session information. **This is necessary in order to do things like rate limiting, access control, quotas, throttling, etc.**

Tyk will try to be clever about what to cache, but we need to help it. There are two ways to do that, with and without the `ID Extractor`.

##### The ID Extractor 

The ID Extractor is a caching mechanism that's used in combination with Tyk Plugins. It can be used specifically with plugins that implement custom authentication mechanisms. The ID Extractor works for all rich plugins: gRPC-based plugins, Python and Lua.

See [ID Extractor]({{< ref "plugins/plugin-types/auth-plugins/id-extractor" >}}) for more details.

##### Token Metadata

Tyk creates an in-memory object to track the rate limit, quotas, and more for each session. 

This is why we set the `token` metadata when using custom authentication middleware, in order to give Tyk a unique ID with which to track each session.

For backwards compatibility, even when using an ID Extractor, we need to continue to set the `token` metadata.  For example, when building a session object in GoLang custom middleware:

```{.copyWrapper}
object.Session = &coprocess.SessionState{
        LastUpdated: time.Now().String(),
        Rate: 5,
        Per:  10,
        QuotaMax:            int64(0),
        QuotaRenews:         time.Now().Unix(),
        IdExtractorDeadline: extractorDeadline,
        Metadata: map[string]string{
            "token": "my-unique-token",
        },
        ApplyPolicies: ["5d8929d8f56e1a138f628269"],
    }
```
[source](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt/blob/master/main.go#L102)

##### Without ID Extractor

When not using ID Extractor, Tyk will continue to cache authenticated sessions returned by custom auth plugins. We must set a unique `token` field in the Metadata (see above) that Tyk will use to cache.

#### Supported Languages 

The following languages are supported for custom authentication plugins:

- All Rich Plugins (gRPC, Python, Lua)
- GoLang

See the [supported languages]({{< ref "plugins/supported-languages" >}}) section for custom authentication plugin examples in a language of your choosing. There's also a [blog that walks you through setting up gRPC custom auth in Java](https://tyk.io/how-to-setup-custom-authentication-middleware-using-grpc-and-java/).

#### Tyk Operator

Please consult the Tyk Operator supporting documentation for examples of how to configure a Tyk Operator API to use:

- [Go custom authentication plugin]({{< ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-go" >}})
- [gRPC custom authentication plugin]({{< ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-grpc" >}})


### Authentication Plugin Caching - ID Extractor

The ID extractor is a caching mechanism that's used in combination with Tyk Plugins. It is used specifically with plugins that implement custom authentication mechanisms.

We use the term "ID" to describe any key that's used for authentication purposes.

When a custom authentication mechanism is used, every API call triggers a call to the associated middleware function, if you're using a gRPC-based plugin this translates into a gRPC call. If you're using a native plugin -like a Python plugin-, this involves a Python interpreter call.

The ID extractor works the following rich plugins: gRPC-based plugins, Python and Lua.

#### When to use the ID Extractor?

The main idea of the ID extractor is to reduce the number of calls made to your plugin and cache the API keys that have been already authorized by your authentication mechanism. This means that after a successful authentication event, subsequent calls will be handled by the Tyk Gateway and its Redis cache, resulting in a performance similar to the built-in authentication mechanisms that Tyk provides.

#### When does the ID Extractor Run?

When enabled, the ID extractor runs right before the authentication step, allowing it to take control of the flow and decide whether to call your authentication mechanism or not.

If my ID is cached by this mechanism and my plugin isn't longer called, how do I expire it?
When you implement your own authentication mechanism using plugins, you initialise the session object from your own code. The session object has a field that's used to configure the lifetime of a cached ID, this field is called `id_extractor_deadline`. See [Plugin Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) for more details. 
The value of this field should be a UNIX timestamp on which the cached ID will expire, like `1507268142958`. It's an integer.

For example, this snippet is used in a NodeJS plugin, inside a custom authentication function:

```
// Initialize a session state object
  var session = new tyk.SessionState()
  // Get the current UNIX timestamp
  var timestamp = Math.floor( new Date() / 1000 )
  // Based on the current timestamp, add 60 seconds:
  session.id_extractor_deadline = timestamp + 60
  // Finally inject our session object into the request object:
  Obj.session = session
```

If you already have a plugin that implements a custom authentication mechanism, appending the `id_extractor_deadline` and setting its value is enough to activate this feature.
In the above sample, Tyk will cache the key for 60 seconds. During that time any requests that use the cached ID won't call your plugin.

#### How to enable the ID Extractor

The ID extractor is configured on a per API basis.
The API should be a protected one and have the `enable_coprocess_auth` flag set to true, like the following definition:

```json
{
  "name": "Test API",
  "api_id": "my-api",
  "org_id": "my-org",
  "use_keyless": false,
  "auth": {
      "auth_header_name": "Authorization"
  },
  "proxy": {
      "listen_path": "/test-api/",
      "target_url": "http://httpbin.org/",
      "strip_listen_path": true
  },
  "enable_coprocess_auth": true,
  "custom_middleware_bundle": "bundle.zip"
}
```

If you're not using the Community Edition, check the API settings in the dashboard and make sure that "Custom Auth" is selected.

The second requirement is to append an additional configuration block to your plugin manifest file, using the `id_extractor` key:

```json
{
  "custom_middleware": {
    "auth_check": { "name": "MyAuthCheck" },
    "id_extractor": {
      "extract_from": "header",
      "extract_with": "value",
      "extractor_config": {
        "header_name": "Authorization"
      }
    },
    "driver": "grpc"
  }
}
```

*   `extract_from` specifies the source of the ID to extract.
*   `extract_with` specifies how to extract and parse the extracted ID.
*   `extractor_config` specifies additional parameters like the header name or the regular expression to use, this is different for every choice, see below for more details.


#### Available ID Extractor Sources

##### Header Source

Use this source to extract the key from a HTTP header. Only the name of the header is required:

```json
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "value",
    "extractor_config": {
      "header_name": "Authorization"
    }
  }
}
```

##### Form source

Use this source to extract the key from a submitted form, where `param_name` represents the key of the submitted parameter:


```json
{
  "id_extractor": {
    "extract_from": "form",
    "extract_with": "value",
    "extractor_config": {
      "param_name": "my_param"
    }
  }
}
```


#### Available ID Extractor Modes

##### Value Extractor

Use this to take the value as its present. This is commonly used in combination with the header source:

```json
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "value",
    "extractor_config": {
      "header_name": "Authorization"
    }
  }
}
```

##### Regular Expression Extractor

Use this to match the ID with a regular expression. This requires additional parameters like `regex_expression`, which represents the regular expression itself and `regex_match_index` which is the item index:

```json
{
  "id_extractor": {
    "extract_from": "header",
    "extract_with": "regex",
    "extractor_config": {
      "header_name": "Authorization",
      "regex_expression": "[^-]+$",
      "regex_match_index": 0
    }
  }
}
```

Using the example above, if we send a header like `prefix-d28e17f7`, given the regular expression we're using, the extracted ID value will be `d28e17f7`.

#### Example Session
Here's an example of a Session being built in GoLang custom middleware:
```{.copyWrapper}
extractorDeadline := time.Now().Add(time.Second * 5).Unix()
object.Session = &coprocess.SessionState{

        LastUpdated: time.Now().String(),
        Rate: 5,
        Per:  10,
        QuotaMax:            int64(0),
        QuotaRenews:         time.Now().Unix(),
        Metadata: map[string]string{
            "token": "my-unique-token",
        },
        ApplyPolicies: ["5d8929d8f56e1a138f628269"],
    }
```
[source](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt/blob/master/main.go#L102)

Note: When using an ID Extractor, you must set a `LastUpdated` or else token updates will not be applied.  If you don't set an ID Extractor, Tyk will store session information in the cache based off the `token` field that is set in the metadata.


### Response Plugins

Since Tyk 3.0 we have incorporated response hooks, this type of hook allows you to modify the response object returned by the upstream. The flow is follows:

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The request is received by Tyk and the response hook is triggered.
- Your plugin modifies the response and sends it back to Tyk.
- Tyk takes the modified response and is received by the client.

This snippet illustrates the hook function signature:

```python
@Hook
def ResponseHook(request, response, session, metadata, spec):
    tyk.log("ResponseHook is called", "info")
    # In this hook we have access to the response object, to inspect it, uncomment the following line:
    # print(response)
    tyk.log("ResponseHook: upstream returned {0}".format(response.status_code), "info")
    # Attach a new response header:
    response.headers["injectedkey"] = "injectedvalue"
    return response
```

If working with a Tyk Classic API, you would add this configuration to the API definition:

```
{
    "custom_middleware": {
        "response": [
            {
                "name": "ResponseHook",
                "path": "middleware/middleware.py"
            }
        ],
        "driver": "python"
    }
}
```

 - `driver`: set this to the appropriate value for the plugin type (e.g. `python`, `goplugin`)
 - `response`: this is the hook name. You use middleware with the `response` hook type because you want this custom middleware to process the request on its return leg of a round trip.
 - `response.name`: is your function name from the plugin file.
 - `response.path`: is the full or relative (to the Tyk binary) path to the plugin source file. Ensure Tyk has read access to this file.

Starting from versions 5.0.4 and 5.1.1+ for our Go, Python and Ruby users we have introduced the `multivalue_headers` field to facilitate more flexible and efficient management of headers, particularly for scenarios involving a single header key associated with multiple values.  The `multivalue_headers` field, similar to its predecessor, the `headers` field, is a key-value store. However, it can accommodate an array or list of string values for each key, instead of a single string value. This feature empowers you to represent multiple values for a single header key. Here's an example of how you might use `multivalue_headers`, using the Set-Cookie header which often has multiple values:

```
multivalue_headers = {
    "Set-Cookie": ["sessionToken=abc123; HttpOnly; Secure", "language=en-US; Secure"],
}
```

In this example, Set-Cookie header has two associated values: `"sessionToken=abc123; HttpOnly; Secure"` and `"language=en-US; Secure"`.  To help you understand this further, let's see how `multivalue_headers` can be used in a Tyk response plugin written in Python:

```python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def Del_ResponseHeader_Middleware(request, response, session, metadata, spec):
    # inject a new header with 2 values
    new_header = response.multivalue_headers.add()
    new_header.key = "Set-Cookie"
    new_header.values.extend("sessionToken=abc123; HttpOnly; Secure")
    new_header.values.extend("language=en-US; Secure")
    
    tyk.log(f"Headers content :\n {response.headers}\n----------", "info")
    tyk.log(f"Multivalue Headers updated :\n {response.multivalue_headers}\n----------", "info")
    
    return response
```

In this script, we add 2 values for the `Set-Cookie` header and then log both: the traditional `headers` and the new `multivalue_headers`. This is a great way to monitor your transition to `multivalue_headers` and ensure that everything is functioning as expected.

Please note, while the `headers` field will continue to be available and maintained for backward compatibility, we highly encourage the adoption of `multivalue_headers` for the added flexibility in handling multiple header values.

#### Go response plugins

[Go response plugins]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#creating-a-custom-response-plugin" >}}) have been available since Tyk v3.2.

#### Supported Response Plugin Languages

See [Supported Plugins]({{< ref "plugins/supported-languages" >}}) for details on which languages the response plugin is supported in.


Since Tyk 4.1.0 we have incorporated analytic plugins which enables editing or removal of all parts of analytics records and raw request and responses recorded by Tyk at the gateway level. This feature leverages existing Go plugin infrastructure.

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The response is received and analytics plugin function is triggered before recording the hit to redis.
- Your plugin modifies the analytics record and sends it back to Tyk.
- Tyk takes the modified analytics record and record the hit in redis.

Example analytics Go plugins can be found [here](https://github.com/TykTechnologies/tyk/blob/master/test/goplugins/test_goplugin.go#L149)


### Analytics Plugins

An analytics plugin is configured using the `analytics_plugin` configuration block within an API Definition. This contains the following configuration parameters:

- `enable`: Set to `true` to enable the plugin
- `func_name`: The name of the function representing the plugin
- `plugin_path`: The path to the source code file containing the function that implements the plugin

#### Set Up Analytics Plugin With Tyk Gateway

To enable the analytics rewriting functionality, adjust the following in API definition:

```json
{
    "analytics_plugin": {
        "enable": true,
        "func_name": "<function name>",
        "plugin_path": "<path>/analytics_plugin.so"
    }
}
```

#### Set Up Analytics Plugin With Tyk Operator

The example API Definition resource listed below listens on path */httpbin* and forwards requests upstream to *http://httpbin.org*. A Go Analytics Plugin is enabled for function *MaskAnalyticsData*, located within the */opt/tyk-gateway/plugins/example-plugin.so* shared object file.

```yaml {linenos=table,hl_lines=["15-18"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: analytics-plugin
spec:
  name: httpbin-analytics-plugin
  active: true
  protocol: http
  proxy:
    listen_path: /httpbin
    strip_listen_path: true
    target_url: http://httpbin.org
  use_keyless: true
  enable_detailed_recording: true
  analytics_plugin:
    enable: true
    func_name: MaskAnalyticsData # Replace it with function name of your plugin
    plugin_path: /opt/tyk-gateway/plugins/example-plugin.so  # Replace it with path of your plugin file
```


#### Per-Endpoint Custom Plugins

Tyk's custom plugin architecture allows you to deploy custom logic that will be invoked at certain points in the [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) as Tyk processes requests to your APIs.

At the API-level, there are several points in the processing flow where custom plugins can be "hooked", as explained [here]({{< ref "plugins/plugin-types/plugintypes" >}}). Each of these will be invoked for calls to any endpoint on an API. If you want to perform custom logic only for specific endpoints, you must include selective processing logic within the plugin.

At the endpoint-level, Tyk provides the facility to attach a custom Golang plugin at the end of the request processing chain (immediately before the API-level post-plugin is executed).

##### When to use the per-endpoint custom plugin

**Aggregating data from multiple services**

From a custom plugin, you can make calls out to other internal and upstream APIs. You can then aggregate and process the responses, returning a single response object to the originating client. This allows you to configure a single externally facing API to simplify interaction with multiple internal services, leaving the heavy lifting to Tyk rather than standing up an aggregation service within your stack.

**Enforcing custom policies**

Tyk provides a very flexible middleware chain where you can combine functions to implement the access controls you require to protect your upstream services. Of course, not all scenarios can be covered by Tyk’s standard middleware functions, but you can use a custom plugin to apply whatever custom logic you require to optimize your API experience.

**Dynamic Routing**

With a custom plugin you can implement complex dynamic routing of requests made to a single external endpoint on to different upstream services. The flexibility of the virtual endpoint gives access to data within the request (including the key session) and also the ability to make calls to other APIs to make decisions on the routing of the request. It can operate as a super-powered URL rewrite middleware.

##### How the per-endpoint custom plugin works

Tyk Gateway is written using Golang. This has a flexible plugin architecture which allows for custom code to be compiled separately from the gateway and then invoked natively by the gateway. When registering a custom Go plugin in the API definition, you must provide the location of the compiled plugin and also the name of the function to be invoked within that package. 

Go plugins must therefore be [compiled]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler" >}}) and [loaded]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins" >}}) into the Gateway in order that the function named in the plugin configuration in the API definition can be located and executed at the appropriate stage in the request middleware processing chain.

The custom code within the plugin has access to contextual data such as the session object and API definition. If required, it can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) and hence can provide a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware). This can then act as a high-performance replacement for the JavaScript virtual endpoints or for cases when you want to make use of external libraries.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the per-endpoint custom plugin [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the per-endpoint custom plugin [here]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Ignore Authentication middleware summary
  - The Per-Endpoint Custom Plugin is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Per-Endpoint Custom Plugin can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

##### Using the Per-Endpoint Plugin with Tyk OAS APIs

The [per-endpoint custom plugin]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) provides the facility to attach a custom Go plugin at the end of the request processing chain.
This plugin allows you to add custom logic to the processing flow for the specific endpoint without adding to the processing complexity of other endpoints.
It can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) if required,
and provides a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware).

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-classic" >}}) page.

**Configuring the middleware in the Tyk OAS API Definition**

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The endpoint plugin middleware (`postPlugins`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `postPlugins` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `functionName`: this is the name of the Go function that will be executed when the middleware is triggered
- `path`: the relative path to the source file containing the compiled Go code

You can chain multiple plugin functions in an array. Tyk will process them in the order they appear in the API definition.

For example:

```json {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-endpoint-plugin",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-endpoint-plugin",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-endpoint-plugin/",                
                "strip": true
            }
        },      
        "middleware": {
            "operations": {
                "anythingget": {
                    "postPlugins": [
                        {
                            "enabled": true,
                            "functionName": "myUniqueFunctionName",
                            "path": "/middleware/myPlugin.so"
                        }
                    ]
                }
            }
        }
    }
}
```

In this example the per-endpoint custom plugin middleware has been configured for HTTP `GET` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will invoke the function `myUniqueFunctionName` in the file located at `/middleware/myPlugin.so`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the per-endpoint custom plugin middleware.

**Configuring the middleware in the API Designer**

Adding a per-endpoint custom plugin to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

**Step 1: Add an endpoint**

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

**Step 2: Select the Go Post-Plugin middleware**

Select **ADD MIDDLEWARE** and choose **Go Post-Plugin** from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-go-plugin.png" alt="Adding the Go Post-Plugin middleware" >}}

**Step 3: Configure the middleware**

You must provide the path to the compiled plugin and the name of the Go function that should be invoked by Tyk Gateway when the middleware is triggered.

{{< img src="/img/dashboard/api-designer/tyk-oas-go-plugin-config.png" alt="Configuring the per-endpoint custom plugin" >}}

**Step 4: Save the API**

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

{{< note success >}}
**Note**  

You are only able to add one custom plugin to each endpoint when using the API Designer, however you can add more by editing the API definition directly in the Raw Definition editor.
{{< /note >}}


##### Using the Per-Endpoint Plugin with Tyk Classic APIs

The [per-endpoint custom plugin]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) provides the facility to attach a custom Golang plugin at the end of the request processing chain.
This plugin allows you to add custom logic to the processing flow for the specific endpoint without adding to the processing complexity of other endpoints.
It can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}), if required,
and hence can provide a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware).

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-oas" >}}) page.

**Configuring the middleware in the Tyk Classic API Definition**

To enable the middleware you must add a new `go_plugin` object to the `extended_paths` section of your API definition.

The `go_plugin` object has the following configuration:

- `path`: the endpoint path
- `method`: the endpoint HTTP method
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

**Configuring the middleware in the API Designer**

You can use the API Designer in the Tyk Dashboard to add the per-endpoint custom plugin middleware for your Tyk Classic API by following these steps.

**Step 1: Add an endpoint for the path and select the plugin**

From the **Endpoint Designer** add an endpoint that matches the path for which you want to trigger the custom plugin function. Select the **Go Plugin** plugin.

{{< img src="/img/dashboard/endpoint-designer/endpointplugin.png" alt="Selecting the middleware" >}}

**Step 2: Locate the middleware in the raw API definition**

Once you have selected the middleware for the endpoint, you need to switch to the *Raw Definition* view and then locate the `go_plugin` section (you can search within the text editor window).

{{< img src="/img/dashboard/endpoint-designer/endpointplugin_search.png" alt="Locating the middleware configuration" >}}

**Step 3: Configure the middleware**

Now you can directly edit the `plugin_path` and `func_name` to locate your compiled plugin function.

{{< img src="/img/dashboard/endpoint-designer/endpointplugin_config.png" alt="Configuring the middleware" >}}

**Step 4: Save the API**

Use the *save* or *create* buttons to save the changes and activate the middleware.


## Supported Languages

### Golang plugins

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk by attaching custom logic written in Go to [hooks]({{< ref "plugins/plugin-types/plugintypes" >}}) in the Tyk [middleware chain]({{< ref "concepts/middleware-execution-order" >}}).
The chain of middleware is specific to an API and gets created at API load time. When Tyk Gateway performs an API re-load it also loads any custom middleware and "injects" them into a chain to be called at different stages of the HTTP request life cycle.

For a quick-start guide to working with Go plugins, start [here]({{< ref "plugins/tutorials/quick-starts/go/quickstart" >}}).

The [Go plugin writing guide]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins" >}}) provides details of how to access dynamic data (such as the key session object) from your Go functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

## Supported plugin types

All of Tyk's [custom middleware hooks]({{< ref "plugins/plugin-types/plugintypes" >}}) support Go plugins. They represent different stages in the request and response [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) where custom functionality can be added.

- **Pre** - supports an array of middlewares to be run before any others (i.e. before authentication)
- **Auth** - this middleware performs custom authentication and adds API key session info into the request context and can be used only if the API definition has both:
  - `"use_keyless": false`
  - `"use_go_plugin_auth": true`
- **Post-Auth** - supports an array of middleware to be run after authentication; at this point, we have authenticated the session API key for the given key (in the request context) so we can perform any extra checks. This can be used only if the API definition has both:
  - `"use_keyless": false`
  - an authentication method specified
- **Post** - supports an array of middlewares to be run at the very end of the middleware chain; at this point Tyk is about to request a round-trip to the upstream target
- **Response** - run only at the point the response has returned from a service upstream of the API Gateway; note that the [method signature for Response Go plugins]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#creating-a-custom-response-plugin" >}}) is slightly different from the other hook types

{{< note info >}}
**Note**

The `use_keyless` and `use_go_plugin_auth` fields are populated automatically with the correct values if you add a plugin to the **Auth** or **Post-Auth** hooks when using the Tyk Dashboard.
{{< /note >}}

## Upgrading your Tyk Gateway

When upgrading your Tyk Gateway deployment, you need to re-compile your plugin with the new version. At the moment of loading a plugin, the Gateway will try to find a plugin with the name provided in the API definition. If none is found then it will fall back to search the plugin file with the name: `{plugin-name}_{Gw-version}_{OS}_{arch}.so`.

Since Tyk v4.1.0, the compiler [automatically]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler#output-filename" >}}) creates plugin files following this convention so when you upgrade, say from Tyk v5.2.5 to v5.3.0 you only need to have the plugins compiled for v5.3.0 before performing the upgrade.

This diagram shows how every Tyk Gateway will search and load the plugin binary that it is compatible with.
{{< img src="/img/plugins/go-plugin-different-tyk-versions.png" alt="APIs Menu" >}}

## Using custom Go plugins with Tyk Cloud

The following supporting resources are provided for developing plugins on Tyk Cloud:

- [Enabling Plugins On The Control Plane](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/setup-control-plane/#what-do-i-need-to-do-to-use-plugins)
- [Uploading Your Plugin Bundle To S3 Bucket](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/uploading-bundle/#how-do-i-upload-my-bundle-file-to-my-amazon-s3-bucket)



### Writing Custom Go Plugins

Tyk's custom Go plugin middleware is very powerful as it provides you with access to different data types and functionality as explained in this section.

Golang plugins are a very flexible and powerful way to extend the functionality of Tyk and uses the native Golang plugins API (see [go pkg/plugin docs](https://golang.org/pkg/plugin) for more details).

Custom Go plugins can access various data objects relating to the API request:

- [session]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#accessing-the-session-object" >}}): the key session object provided by the client when making the API request
- [API definition]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#accessing-the-api-definition" >}}): the Tyk OAS or Tyk Classic API definition for the requested API

Custom Go plugins can also [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) and stop further processing of the API request such that it is not sent to the upstream service.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "plugins/plugin-hub">}}).
To see an example of a Go plugin, please visit our [Go plugin examples]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples" >}}) page.

## Accessing the internal state of a custom plugin

A Golang plugin can be treated as a normal Golang package but:

- the package name is always `"main"` and this package cannot be imported
- this package loads at run-time by Tyk and loads after all other Golang packages
- this package has to have an empty `func main() {}`.

A Go plugin can have a declared `func init()` and it gets called only once (when Tyk loads this plugin for the first time for an API).

It is possible to create structures or open connections to 3d party services/storage and then share them within every call and export the function in your Golang plugin.

For example, here is an example of a Tyk Golang plugin with a simple hit counter:

```go  {linenos=true, linenostart=1}
package main

import (
  "encoding/json"
  "net/http"
  "sync"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/log"
  "github.com/TykTechnologies/tyk/user"
)

var logger = log.Get()

// plugin exported functionality
func MyProcessRequest(rw http.ResponseWriter, r *http.Request) {
  endPoint := r.Method + " " + r.URL.Path
  logger.Info("Custom middleware, new hit:", endPoint)

  hitCounter := recordHit(endPoint)
  logger.Debug("New hit counter value:", hitCounter)

  if hitCounter > 100 {
    logger.Warning("Hit counter to high")
  }

  reply := myReply{
    Session:    ctx.GetSession(r),
    Endpoint:   endPoint,
    HitCounter: hitCounter,
  }

  jsonData, err := json.Marshal(reply)
  if err != nil {
    logger.Error(err.Error())
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

// called once plugin is loaded, this is where we put all initialisation work for plugin
// i.e. setting exported functions, setting up connection pool to storage and etc.
func init() {
  hitCounter = make(map[string]uint64)
}

// plugin internal state and implementation
var (
  hitCounter   map[string]uint64
  hitCounterMu sync.Mutex
)

func recordHit(endpoint string) uint64 {
  hitCounterMu.Lock()
  defer hitCounterMu.Unlock()
  hitCounter[endpoint]++
  return hitCounter[endpoint]
}

type myReply struct {
  Session    *user.SessionState `json:"session"`
  Endpoint   string             `json:"endpoint"`
  HitCounter uint64             `json:"hit_counter"`
}

func main() {}
```

Here we see how the internal state of the Golang plugin is used by the exported function `MyProcessRequest` (the one we set in the API spec in the `"custom_middleware"` section). The map `hitCounter` is used to send internal state and count hits to different endpoints. Then our exported Golang plugin function sends an HTTP reply with endpoint hit statistics.

## Accessing the API definition

When Tyk passes a request to your plugin, the API definition is made available as part of the request context.

{{< note success >}}
**Note**  

The API definition is accessed differently for Tyk OAS APIs and Tyk Classic APIs, as indicated in the following sections. If you use the wrong call for your API type, it will return `nil`.
{{< /note >}}

### Working with Tyk OAS APIs

The API definition can be accessed as follows:

```go
package main

import (
  "fmt"
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
)

func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  oas := ctx.GetOASDefinition(r)
  fmt.Println("OAS doc title is", oas.Info.Title)
}

func main() {}
```

The invocation of `ctx.GetOASDefinition(r)` returns an `OAS` object containing the Tyk OAS API definition.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/apidef/oas/oas.go#L28).

### Working with Tyk Classic APIs

The API definition can be accessed as follows:

```go
package main

import (
  "fmt"
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
)

func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  apidef := ctx.GetDefinition(r)
  fmt.Println("API name is", apidef.Name)
}

func main() {}
```

The invocation of `ctx.GetDefinition(r)` returns an APIDefinition object containing the Tyk Classic API Definition.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L583).

## Accessing the session object

When Tyk passes a request to your plugin, the key session object is made available as part of the request context. This can be accessed as follows:

```go
package main
import (
  "fmt"
  "net/http"
  "github.com/TykTechnologies/tyk/ctx"
)
func main() {}
func MyPluginFunction(w http.ResponseWriter, r *http.Request) {
  session := ctx.GetSession(r)
  fmt.Println("Developer ID:", session.MetaData["tyk_developer_id"]
  fmt.Println("Developer Email:", session.MetaData["tyk_developer_email"]
}
```

The invocation of `ctx.GetSession(r)` returns an SessionState object.
The Go data structure can be found [here](https://github.com/TykTechnologies/tyk/blob/master/user/session.go#L106).

Here is an [example](https://github.com/TykTechnologies/custom-plugin-examples/blob/master/plugins/go-auth-multiple_hook_example/main.go#L135) custom Go plugin that makes use of the session object.

## Terminating the request

You can terminate the request within your custom Go plugin and provide an HTTP response to the originating client, such that the plugin behaves similarly to a [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}).

- the HTTP request processing is stopped and other middleware in the chain won't be used
- the HTTP request round-trip to the upstream target won't happen
- analytics records will still be created and sent to the analytics processing flow

This [example]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples#using-a-custom-go-plugin-as-a-virtual-endpoint" >}}) demonstrates a custom Go plugin configured as a virtual endpoint.

## Logging from a custom plugin

Your plugin can write log entries to Tyk's logging system.

To do so you just need to import the package `"github.com/TykTechnologies/tyk/log"` and use the exported public method `Get()`:

```go  {linenos=true, linenostart=1}
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/log"
)

var logger = log.Get()

// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
  logger.Info("Processing HTTP request in Golang plugin!!")
  r.Header.Add("Foo", "Bar")
}

func main() {}
```

### Monitoring instrumentation for custom plugins

All custom middleware implemented as Golang plugins support Tyk's current built in instrumentation.

The format for an event name with metadata is: `"GoPluginMiddleware:" + Path + ":" + SymbolName`,  e.g., for our example, the event name will be:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader"
```

The format for a metric with execution time (in nanoseconds) will have the same format but with the `.exec_time` suffix:

```text
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader.exec_time"
```

## Creating a custom response plugin

As explained [here]({{< ref "plugins/plugin-types/response-plugins" >}}), you can register a custom Go plugin to be triggered in the response middleware chain. You must configure the `driver` field to `goplugin` in the API definition when registering the plugin.

### Response plugin method signature

To write a response plugin in Go you need it to have a method signature as in the example below i.e. `func(http.ResponseWriter, *http.Response, *http.Request)`.
You can then access and modify any part of the request or response. User session and API definition data can be accessed as with other Go plugin hook types.

```go
package main

import (
  "bytes"
  "encoding/json"
  "io/ioutil"
  "net/http"

)

// MyPluginResponse intercepts response from upstream
func MyPluginResponse(rw http.ResponseWriter, res *http.Response, req *http.Request) {
        // add a header to our response object
  res.Header.Add("X-Response-Added", "resp-added")

        // overwrite our response body
  var buf bytes.Buffer
  buf.Write([]byte(`{"message":"Hi! I'm a response plugin"}`))
  res.Body = ioutil.NopCloser(&buf)

}

func main() {}
```

#### Custom Go plugin development flow

We recommend that you familiarize yourself with the following official Go documentation to help you work effectively with Go plugins:

- [The official plugin package documentation - Warnings](https://pkg.go.dev/plugin)
- [Tutorial: Getting started with multi-module workspaces](https://go.dev/doc/tutorial/workspaces)

{{< note success >}}
**Note**

Plugins are currently supported only on Linux, FreeBSD, and macOS, making them unsuitable for applications intended to be portable.
{{< /note >}}

Plugins need to be compiled to native shared object code, which can then be loaded by Tyk Gateway. It's important to understand the need for plugins to be compiled using exactly the same environment and build flags as the Gateway. To simplify this and minimise the risk of compatibility problems, we recommend the use of [Go workspaces](https://go.dev/blog/get-familiar-with-workspaces), to provide a consistent environment.

## Setting up your environment

To develop plugins, you'll need:

- Go (matching the version used in the Gateway, which you can determine using `go.mod`).
- Git to check out Tyk Gateway source code.
- A folder with the code that you want to build into plugins.

We recommend that you set up a *Go workspace*, which, at the end, is going to contain:

- `/tyk-release-x.y.z` - the Tyk Gateway source code
- `/plugins` - the plugins
- `/go.work` - the *Go workspace* file
- `/go.work.sum` - *Go workspace* package checksums

Using the *Go workspace* ensures build compatibility between the plugins and Gateway.

### 1. Checking out Tyk Gateway source code

```
git clone --branch release-5.3.6 https://github.com/TykTechnologies/tyk.git tyk-release-5.3.6 || true
```

This example uses a particular `release-5.3.6` branch, to match Tyk Gateway release 5.3.6. With newer `git` versions, you may pass `--branch v5.3.6` and it would use the tag. In case you want to use the tag it's also possible to navigate into the folder and issue `git checkout tags/v5.3.6`.

### 2. Preparing the Go workspace

Your Go workspace can be very simple:

1. Create a `.go` file containing the code for your plugin.
2. Create a `go.mod` file for the plugin.
3. Ensure the correct Go version is in use.

As an example, we can use the [CustomGoPlugin.go](https://github.com/TykTechnologies/custom-go-plugin/blob/master/go/src/CustomGoPlugin.go) sample as the source for our plugin as shown:

```
mkdir -p plugins
cd plugins
go mod init testplugin
go mod edit -go $(go mod edit -json go.mod | jq -r .Go)
wget -q https://raw.githubusercontent.com/TykTechnologies/custom-go-plugin/refs/heads/master/go/src/CustomGoPlugin.go
cd -
```

The following snippet provides you with a way to get the exact Go version used by Gateway from it's [go.mod](https://github.com/TykTechnologies/tyk/blob/release-5.3.6/go.mod#L3) file:

- `go mod edit -json go.mod | jq -r .Go` (e.g. `1.22.7`)

This should be used to ensure the version matches between gateway and the plugin.

To summarize what was done:

1. We created a plugins folder and initialzed a `go` project using `go mod` command.
2. Set the Go version of `go.mod` to match the one set in the Gateway.
3. Initialzied the project with sample plugin `go` code.

At this point, we don't have a *Go workspace* but we will create one next so that we can effectively share the Gateway dependency across Go modules.

### 3. Creating the Go workspace

To set up the Go workspace, start in the directory that contains the Gateway and the Plugins folder. You'll first, create the `go.work` file to set up your Go workspace, and include the `tyk-release-5.3.6` and `plugins` folders. Then, navigate to the plugins folder to fetch the Gateway dependency at the exact commit hash and run `go mod tidy` to ensure dependencies are up to date.

Follow these commands:

```
go work init ./tyk-release-5.3.6
go work use ./plugins
commit_hash=$(cd tyk-release-5.3.6 && git rev-parse HEAD)
cd plugins && go get github.com/TykTechnologies/tyk@${commit_hash} && go mod tidy && cd -
```

The following snippet provides you to get the commit hash exactly, so it can be used with `go get`.

- `git rev-parse HEAD`

The Go workspace file (`go.work`) should look like this:

```
go 1.22.7

use (
	./plugins
	./tyk-release-5.3.6
)
```

### 4. Building and validating the plugin

Now that your *Go workspace* is ready, you can build your plugin as follows:

```
cd tyk-release-5.3.6 && go build -tags=goplugin -trimpath . && cd -
cd plugins           && go build -trimpath -buildmode=plugin . && cd -
```

These steps build both the Gateway and the plugin.

You can use the Gateway binary that you just built to test that your new plugin loads into the Gateway without having to configure and then make a request to an API using this command:

```
./tyk-release-5.3.6/tyk plugin load -f plugins/testplugin.so -s AuthCheck
```

You should see an output similar to:

```
time="Oct 14 13:39:55" level=info msg="--- Go custom plugin init success! ---- "
[file=plugins/testplugin.so, symbol=AuthCheck] loaded ok, got 0x76e1aeb52140
```

The log shows that the plugin has correctly loaded into the Gateway and that its `init` function has been successfully invoked.

### 5. Summary

In the preceding steps we have put together an end-to-end build environment for both the Gateway and the plugin. Bear in mind that runtime environments may have additional restrictions beyond Go version and build flags to which the plugin developer must pay attention.

Compatibility in general is a big concern when working with Go plugins: as the plugins are tightly coupled to the Gateway, consideration must always be made for the build restrictions enforced by environment and configuration options.

Continue with [Loading Go Plugins into Tyk](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins/).


## Debugging Golang Plugins

Plugins are native Go code compiled to a binary shared object file. The code may depend on `cgo` and require libraries like `libc` provided by the runtime environment. The following are some debugging steps for diagnosing issues arising from using plugins.

### Warnings

The [Plugin package - Warnings](https://pkg.go.dev/plugin#hdr-Warnings) section in the Go documentation outlines several requirements which can't be ignored when working with plugins. The most important restriction is the following:

> Runtime crashes are likely to occur unless all parts of the program (the application and all its plugins) are compiled using exactly the same version of the toolchain, the same build tags, and the same values of certain flags and environment variables.

We provide the *Tyk Plugin Compiler* docker image, which we strongly recommend is used to build plugins compatible with the official Gateway releases. This tool provides the cross compilation toolchain, Go version used to build the release, and ensures that compatible flags are used when compiling plugins, like `-trimpath`, `CC`, `CGO_ENABLED`, `GOOS`, `GOARCH`.

The *Plugin Compiler* also works around known Go issues such as:

- https://github.com/golang/go/issues/19004
- https://www.reddit.com/r/golang/comments/qxghjv/plugin_already_loaded_when_a_plugin_is_loaded/

Supplying the argument `build_id` to the *Plugin Compiler* ensures the same plugin can be rebuilt. The *Plugin Compiler* does this by replacing the plugin `go.mod` module path.

Continue with [Tyk Plugin Compiler](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-compiler/).

### Using Incorrect Build Flags

When working with Go plugins, it's easy to miss the restriction that the plugin at the very least must be built with the same Go version, and the same flags (notably `-trimpath`) as the Tyk Gateway on which it is to be used.

If you miss an argument (for example `-trimpath`) when building the plugin, the Gateway will report an error when your API attempts to load the plugin, for example:

```
task: [test] cd tyk-release-5.3.6 && go build -tags=goplugin -trimpath .
task: [test] cd plugins && go build -buildmode=plugin .
task: [test] ./tyk-release-5.3.6/tyk plugin load -f plugins/testplugin.so -s AuthCheck
tyk: error: unexpected error: plugin.Open("plugins/testplugin"): plugin was built with a different version of package internal/goarch, try --help
```

Usually when the error hints at a standard library package, the build flags between the Gateway and plugin binaries don't match.

Other error messages may be reported, depending on what triggered the issue. For example, if you omitted `-race` in the plugin but the gateway was built with `-race`, the following error will be reported:

```
plugin was built with a different version of package runtime/internal/sys, try --help
```

Strictly speaking:

- Build flags like `-trimpath`, `-race` need to match.
- Go toolchain / build env needs to be exactly the same.
- For cross compilation you must use the same `CC` value for the build (CGO).
- `CGO_ENABLED=1`, `GOOS`, `GOARCH` must match with runtime.

When something is off, you can check what is different by using the `go version -m` command for the Gateway (`go version -m tyk`) and plugin (`go version -m plugin.so`). Inspecting and comparing the output of `build` tokens usually yields the difference that caused the compatibility issue.

### Plugin Compatibility Issues

Below are some common situations where dependencies might cause issues:

- The `Gateway` has a dependency without a `go.mod` file, but the plugin needs to use it.
- Both the `Gateway` and the plugin share a dependency. In this case, the plugin must use the exact same version as the `Gateway`.
- The plugin requires a different version of a shared dependency.

Here’s how to handle each case:

**Case 1: Gateway dependency lacks `go.mod`**

- The plugin depends on the `Gateway`, which uses dependency *A*.
- *A* doesn’t have a `go.mod` file, so a pseudo version is generated during the build.
- Result: The build completes, but the plugin fails to load due to a version mismatch.

**Solution:** Update the code to remove dependency *A*, or use a version of *A* that includes a `go.mod` file.

**Case 2: Shared dependency with version matching**

- The plugin and `Gateway` share a dependency, and this dependency includes a `go.mod` file.
- The version matches, and the dependency is promoted to *direct* in `go.mod`.
- Outcome: You’ll need to keep this dependency version in sync with the `Gateway`.

**Case 3: Plugin requires a different version of a shared dependency**

- The plugin and `Gateway` share a dependency, but the plugin needs a different version.
- If the other version is a major release (e.g., `/v4`), it’s treated as a separate package, allowing both versions to coexist.
- If it’s just a minor/patch difference, the plugin will likely fail to load due to a version conflict.

**Recommendation:** For best results, use Go package versions that follow the Go module versioning (metaversion). However, keep in mind that many `Gateway` dependencies use basic `v1` semantic versioning, which doesn’t always enforce strict versioned import paths. 

### List plugin symbols

Sometimes it's useful to list symbols from a plugin. For example, we can list the symbols as they are compiled into our testplugin:

```
# nm -gD testplugin.so | grep testplugin
00000000014db4b0 R go:link.pkghashbytes.testplugin
000000000170f7d0 D go:link.pkghash.testplugin
000000000130f5e0 T testplugin.AddFooBarHeader
000000000130f900 T testplugin.AddFooBarHeader.deferwrap1
000000000130f980 T testplugin.AuthCheck
0000000001310100 T testplugin.AuthCheck.deferwrap1
000000000130f540 T testplugin.init
0000000001310ce0 T testplugin.init.0
0000000001ce9580 D testplugin..inittask
0000000001310480 T testplugin.InjectConfigData
0000000001310180 T testplugin.InjectMetadata
0000000001d2a3e0 B testplugin.logger
0000000001310cc0 T testplugin.main
0000000001310820 T testplugin.MakeOutboundCall
0000000001310c40 T testplugin.MakeOutboundCall.deferwrap1
```

This command prints other symbols that are part of the binary. In the worst case, a build compatibility issue may cause a crash in the Gateway due to an unrecoverable error and this can be used to further debug the binaries produced.

A very basic check to ensure Gateway/plugin compatibility is using the built in `go version -m <file>`:

```
[output truncated]
	build	-buildmode=exe
	build	-compiler=gc
	build	-race=true
	build	-tags=goplugin
	build	-trimpath=true
	build	CGO_ENABLED=1
	build	GOARCH=amd64
	build	GOOS=linux
	build	GOAMD64=v1
	build	vcs=git
	build	vcs.revision=1db1935d899296c91a55ba528e7b653aec02883b
	build	vcs.time=2024-09-24T12:54:26Z
	build	vcs.modified=false
```

These options should match between the Gateway binary and the plugin. You can use the command for both binaries and then compare the outputs.



#### Plugin compiler

Tyk provides a Plugin Compiler tool that will create a file that can be [loaded into Tyk]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/loading-go-plugins" >}}) to implement your desired custom logic.

{{< note success >}}
**Note**  

The plugin compiler is not supported on Ubuntu 16.04 (Xenial Xerus) as it uses glibc 2.23 which is incompatible with our standard build environment. If you absolutely must have Go plugin support on Xenial, please contact Tyk support.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
{{< /note >}}

## Compiler options

Most of the following arguments are applied only to developer flows. These aid development and testing purposes, and support of these varies across releases, due to changes in the Go ecosystem.

The latest plugin compiler implements the following options:

- `plugin_name`: output root file name (for example `plugin.so`)
- `build_id`: [optional] provides build uniqueness
- `GOOS`: [optional] override of GOOS (add `-e GOOS=linux`)
- `GOARCH`: [optional] override of GOARCH (add `-e GOARCH=amd64`)

By default, if `build_id` is not provided, the gateway will not allow the plugin to be loaded twice. This is a restriction of the Go plugins standard library implementation. As long as the builds are made with a unique `build_id`, the same plugin can be loaded multiple times.

When you provide a unique `build_id` argument, that also enables hot-reload compatibility of your `.so` plugin build, so that you would not need to restart the gateway, only reload it.

- before 5.1: the plugin would be built in a filesystem path based on `build_id`
- since 5.2.4: the plugin compiler adjusts the Go module in use for the plugin.

As the plugins are built with `-trimpath`, to omit local filesystem path details and improve plugin compatibility, the plugin compiler relies on the Go module itself to ensure each plugin build is unique. It modifies the plugin build `go.mod` file and imports to ensure a unique build.

- [plugin package: Warnings](https://pkg.go.dev/plugin#hdr-Warnings)
- [golang#29525 - plugin: cannot open the same plugin with different names](https://github.com/golang/go/issues/29525)

## Output filename

Since v4.1.0 the plugin compiler has automatically added the following suffixes to the root filename provided in the `plugin_name` argument:

- `{Gw-version}`: the Tyk Gateway version, for example, `v5.3.0`
- `{OS}`: the target operating system, for example `linux`
- `{arch}`: the target CPU architecture, for example, `arm64`

Thus, if `plugin_name` is set to `plugin.so` then given these example values the output file will be: `plugin_v5.3.0_linux_arm64.so`.

This enables you to have one directory with multiple versions of the same plugin targeting different Gateway versions.

### Cross-compiling for different architectures and operating systems

The Tyk Go Plugin Compiler can generate output for different architectures and operating systems from the one in which the compiler is run (cross-compiling). When you do this, the output filename will be suffixed with the target OS and architecture.

You simply provide the target `GOOS` and `GOARCH` arguments to the plugin compiler, for example:

```yaml
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.1 plugin.so $build_id linux arm64
```

This command will cross-compile your plugin for a `linux/arm64` architecture. It will produce an output file named `plugin_v5.2.1_linux_arm64.so`.

{{< note success >}}
**Note**  

If you are using the plugin compiler on MacOS, the docker run argument `--platform=linux/amd64` is necessary. The plugin compiler is a cross-build environment implemented with `linux/amd64`.
{{< /note >}}

## Experimental options

The plugin compiler also supports a set of environment variables being passed:

- `DEBUG=1`: enables debug output from the plugin compiler process.
- `GO_TIDY=1`: runs go mod tidy to resolve possible dependency issues.
- `GO_GET=1`: invokes go get to retrieve the exact Tyk gateway dependency.

These environment options are only available in the latest gateway and plugin compiler versions.
They are unsupported and are provided to aid development and testing workflows.


### Loading Custom Go Plugins into Tyk


For development purposes, we are going to load the plugin from local file storage. For production, you can use [bundles](#loading-a-tyk-golang-plugin-from-a-bundle) to deploy plugins to multiple gateways.

In this example we are using a Tyk Classic API. In the API definition find the `custom_middleware` section and make it look similar to the snippet below. Tyk Dashboard users should use RAW API Editor to access this section.

```json
"custom_middleware": {
  "pre": [],
  "post_key_auth": [],
  "auth_check": {},
  "post": [
    {
      "name": "AddFooBarHeader",
      "path": "<path>/plugin.so"
    }
  ],
  "driver": "goplugin"
}
```

Here we have:

- `driver` - Set this to `goplugin` (no value created for this plugin) which says to Tyk that this custom middleware is a Golang native plugin.
- `post` - This is the hook name. We use middleware with hook type `post` because we want this custom middleware to process the request right before it is passed to the upstream target (we will look at other types later).
- `post.name` - is your function name from the Go plugin project.
- `post.path` - is the full or relative (to the Tyk binary) path to the built plugin file (`.so`). Make sure Tyk has read access to this file.

Also, let's set fields `"use_keyless": true` and `"target_url": "http://httpbin.org/"` - for testing purposes. We will test what request arrives to our upstream target and `httpbin.org` is a perfect fit for that.

The API needs to be reloaded after that change (this happens automatically when you save the updated API in the Dashboard).

Now your API with its Golang plugin is ready to process traffic:

```bash
# curl http://localhost:8181/my_api_name/get   
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Foo": "Bar",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
```

We see that the upstream target has received the header `"Foo": "Bar"` which was added by our custom middleware implemented as a native Golang plugin in Tyk.

### Updating the plugin

Loading an updated version of your plugin requires one of the following actions:

- An API reload with a NEW path or file name of your `.so` file with the plugin. You will need to update the API spec section `"custom_middleware"`, specifying a new value for the `"path"` field of the plugin you need to reload.
- Tyk main process reload. This will force a reload of all Golang plugins for all APIs.

If a plugin is loaded as a bundle and you need to update it you will need to update your API spec with a new `.zip` file name in the `"custom_middleware_bundle"` field. Make sure the new `.zip` file is uploaded and available via the bundle HTTP endpoint before you update your API spec.

### Loading a Tyk Golang plugin from a bundle

Currently we have loaded Golang plugins only directly from the file system. However, when you have multiple gateway instances, you need a more dynamic way to load plugins. Tyk offer bundle instrumentation [Plugin Bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}). Using the bundle command creates an archive with your plugin, which you can deploy to the HTTP server (or AWS S3) and then your plugins will be fetched and loaded from that HTTP endpoint.

You will need to set in `tyk.conf` these two fields:

- `"enable_bundle_downloader": true` - enables the plugin bundles downloader
- `"bundle_base_url": "http://mybundles:8000/abc"` - specifies the base URL with the HTTP server where you place your bundles with Golang plugins (this endpoint must be reachable by the gateway)

Also, you will need to specify the following field in your API spec:

`"custom_middleware_bundle"` - here you place your filename with the bundle (`.zip` archive) to be fetched from the HTTP endpoint you specified in your `tyk.conf` parameter `"bundle_base_url"`

To load a plugin, your API spec should set this field like so:

```json
"custom_middleware_bundle": "FooBarBundle.zip"
```

Let's look at `FooBarBundle.zip` contents. It is just a ZIP archive with two files archived inside:

- `AddFooBarHeader.so` - this is our Golang plugin
- `manifest.json` - this is a special file with meta information used by Tyk's bundle loader

The contents of `manifest.json`:

```yaml
{
  "file_list": [
    "AddFooBarHeader.so"
  ],
  "custom_middleware": {
    "post": [
      {
        "name": "AddFooBarHeader",
        "path": "AddFooBarHeader.so"
      }
    ],
    "driver": "goplugin"
  },

  ...
}
```

Here we see:

- field `"custom_middleware"` with exactly the same structure we used to specify `"custom_middleware"` in API spec without bundle
- field `"path"` in section `"post"` now contains just a file name without any path. This field specifies `.so` filename placed in a ZIP archive with the bundle (remember how we specified `"custom_middleware_bundle": "FooBarBundle.zip"`).


#### Example custom Go plugins


This document provides a working example for providing specific functionality with a custom Go plugin.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "plugins/plugin-hub">}}).

## Using a custom Go plugin as a virtual endpoint

It is possible to send a response from the Golang plugin custom middleware. In the case that the HTTP response was sent:

- The HTTP request processing is stopped and other middleware in the chain won't be used.
- The HTTP request round-trip to the upstream target won't happen
- Analytics records will still be created and sent to the analytics processing flow.

Let's look at an example of how to send an HTTP response from the Tyk Golang plugin. Imagine that we need middleware which would send JSON with the current time if the request contains the parameter `get_time=1` in the request query string:

```go
package main

import (
  "encoding/json"
  "net/http"
  "time"
)

func SendCurrentTime(rw http.ResponseWriter, r *http.Request) {
  // check if we don't need to send reply
  if r.URL.Query().Get("get_time") != "1" {
    // allow request to be processed and sent to upstream
        return
  }

  //Prepare data to send
  replyData := map[string]interface{}{
    "current_time": time.Now(),
  }

  jsonData, err := json.Marshal(replyData)
  if err != nil {
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  //Send HTTP response from the Golang plugin
  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

func main() {}
```

Let's build the plugin by running this command in the plugin project folder:

```bash
go build -trimpath -buildmode=plugin -o /tmp/SendCurrentTime.so
```

Then let's edit the API spec to use this custom middleware:

```json
"custom_middleware": {
  "pre": [
    {
       "name": "SendCurrentTime",
       "path": "/tmp/SendCurrentTime.so"
    }
  ],
  "post_key_auth": [],
  "auth_check": {},
  "post": [],
  "driver": "goplugin"
}
```

Let's check that we still perform a round trip to the upstream target if the request query string parameter `get_time` is not set:

```bash
# curl http://localhost:8181/my_api_name/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
```

Now let's check if our Golang plugin sends an HTTP 200 response (with JSON containing current time) when we set `get_time=1` query string parameter:

```bash
# curl http://localhost:8181/my_api_name/get?get_time=1
{"current_time":"2019-09-11T23:44:10.040878-04:00"}
```

Here we see that:

- We've got an HTTP 200 response code.
- The response body has a JSON payload with the current time.
- The upstream target was not reached. Our Tyk Golang plugin served this request and stopped processing after the response was sent.

## Performing custom authentication with a Golang plugin

You can implement your own authentication method, using a Golang plugin and custom `"auth_check"` middleware. Ensure you set the two fields in Post Authentication Hook.

Let's have a look at the code example. Imagine we need to implement a very trivial authentication method when only one key is supported (in the real world you would want to store your keys in some storage or have some more complex logic).

```go
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/headers"
  "github.com/TykTechnologies/tyk/user"
)

func getSessionByKey(key string) *user.SessionState {
  //Here goes our logic to check if the provided API key is valid and appropriate key session can be retrieved

  // perform auth (only one token "abc" is allowed)
  if key != "abc" {
    return nil
  }

  // return session
  return &user.SessionState{
    OrgID: "default",
    Alias: "abc-session",
  }
}

func MyPluginAuthCheck(rw http.ResponseWriter, r *http.Request) {
  //Try to get a session by API key
  key := r.Header.Get(headers.Authorization)
  session := getSessionByKey(key)
  if session == nil {
    // auth failed, reply with 403
    rw.WriteHeader(http.StatusForbidden)
    return
  }
  
  // auth was successful, add the session to the request's context so other middleware can use it
  ctx.SetSession(r, session, true)
  
  // if compiling on a version older than 4.0.1, use this instead
  // ctx.SetSession(r, session, key, true) 
}

func main() {}
```

A couple of notes about this code:

- the package `"github.com/TykTechnologies/tyk/ctx"` is used to set a session in the request context - this is something `"auth_check"`-type custom middleware is responsible for.
- the package `"github.com/TykTechnologies/tyk/user"` is used to operate with Tyk's key session structure.
- our Golang plugin sends a 403 HTTP response if authentication fails.
- our Golang plugin just adds a session to the request context and returns if authentication was successful.

Let's build the plugin by running the following command in the folder containing your plugin project:

```bash
go build -trimpath -buildmode=plugin -o /tmp/MyPluginAuthCheck.so
```

Now let's check if our custom authentication works as expected (only one key `"abc"` should work).

Authentication will fail with the wrong API key:

```bash
# curl -v -H "Authorization: xyz" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: xyz
>
< HTTP/1.1 403 Forbidden
< Date: Wed, 11 Sep 2019 04:31:34 GMT
< Content-Length: 0
<
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware replied with a 403 response and request processing was stopped at this point.

Authentication successful with the right API key:

```bash
# curl -v -H "Authorization: abc" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: abc
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 04:31:39 GMT
< Content-Length: 257
<
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "abc",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware successfully authenticated the request and we received a reply from the upstream target.



## Go Templates

Tyk's [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) body transform middleware use the [Go template language](https://golang.org/pkg/text/template/) to parse and modify the provided input.

Go templates are also used by Tyk's [webhook event handler]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) to produce the payload for the HTTP request sent to the target system.

In this section of the documentation, we provide some guidance and a few examples on the use of Go templating with Tyk.

### Data format conversion using helper functions
Tyk provides two helper functions to assist with data format translation between JSON and XML:
- `jsonMarshal` performs JSON style character escaping on an XML field and, for complex objects, serialises them to a JSON string ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}))
- `xmlMarshal` performs the equivalent conversion from JSON to XML ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}))

When creating these functions within your Go templates, please note:
- the use of `.` in the template refers to the entire input, whereas something like `.myField` refers to just the `myField` field of the input
- the pipe `|` joins together the things either side of it, which is typically input data on the left and a receiving command to process the data on the right, such as `jsonMarshal`

Hence `{{ . | jsonMarshal }}` will pass the entire input to the `jsonMarshal` helper function.

### Using functions within Go templates
You can define and use functions in the Go templates that are used for body transforms in Tyk. Functions allow you to abstract common template logic for cleaner code and to aid reusability. Breaking the template into functions improves readability of more complex tenplates.

Here is an example where we define a function called `myFunction` that accepts one parameter:
```go
{{- define "myFunction" }}
  Hello {{.}}!
{{- end}}
```

We can call that function and pass "world" as the parameter:
```go
{
  "message": {{ call . "myFunction" "world"}}
}
```

The output would be:
```json
{
  "message": "Hello world!" 
}
```

We have bundled the [Sprig Library (v3)](http://masterminds.github.io/sprig/) which provides over 70 pre-written functions for transformations to assist the creation of powerful Go templates to transform your API requests. 

### Additional resources
Here's a useful [blogpost](https://blog.gopheracademy.com/advent-2017/using-go-templates/) and [YouTube tutorial](https://www.youtube.com/watch?v=k5wJv4XO7a0) that can help you to learn about using Go templates. 

## Go templating examples
Here we provide worked examples for both [JSON]({{< ref "product-stack/tyk-gateway/references/go-templates#example-json-transformation-template" >}}) and [XML]({{< ref "product-stack/tyk-gateway/references/go-templates#example-xml-transformation-template" >}}) formatted inputs. We also explain examples using the [jsonMarshal]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}) and [xmlMarshal]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}) helper functions.

### Example JSON transformation template
Imagine you have a published API that accepts the request listed below, but your upstream service requires a few alterations, namely:
- swapping the values of parameters `value1` and `value2`
- renaming the `value_list` to `transformed_list`
- adding a `user-id` extracted from the session metadata
- adding a `client-ip` logging the client IP
- adding a `req-type` that logs the value provided in query parameter `type`

**Input**
- Session metadata `uid` = `user123`
- IP address of calling client = `192.0.0.1`
- Query parameter `type` = `strict`
```json
{
  "value1": "value-1",
  "value2": "value-2",
  "value_list": [
    "one",
    "two",
    "three"
  ]
}
```

**Template**
```go
{
  "value1": "{{.value2}}",
  "value2": "{{.value1}}",
  "transformed_list": [
    {{range $index, $element := index . "value_list"}}
    {{if $index}}, {{end}}
    "{{$element}}"
    {{end}}
  ],
  "user-id": "{{._tyk_meta.uid}}",
  "user-ip": "{{._tyk_context.remote_addr}}",
  "req-type": "{{ ._tyk_context.request_data.param.type }}" 
}
```
In this template:
- `.value1` accesses the "value1" field of the input JSON
- we swap value1 and value2
- we use the range function to loop through the "value_list" array
- `._tyk_meta.uid` injects the "uid" session metadata value
- `._tyk_context.remote_addr` injects the client IP address from the context
- `._tyk_context.request_data.param.type` injects query parameter "type"

**Output**
``` .json
{
  "value1": "value-2",
  "value2": "value-1",
  "transformed_list": [
    "one",
    "two",
    "three"
  ],
  "user-id": "user123"
  "user-ip": "192.0.0.1"
  "req-type": "strict"
}
```

### Example XML transformation template
XML cannot be as easily decoded into strict structures as JSON, so the syntax is a little different when working with an XML document. Here we are performing the reverse translation, starting with XML and converting to JSON.

**Input**
- Session metadata `uid` = `user123`
- IP address of calling client = `192.0.0.1`
- Query parameter `type` = `strict`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>value-1</value1>
    <value2>value-2</value2>
    <valueList>
      <item>one</item>
      <item>two</item>
      <item>three</item>
    </valueList>
  </body>
</data>
```

**Template**
``` .xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>{{ .data.body.value2 }}</value1>
    <value2>{{ .data.body.value1 }}</value2>
    <transformedList>
      {{range $index, $element := .data.body.valueList.item }}
      <item>{{$element}}</item>
      {{end}}
    </transformedList>
    <userId>{{ ._tyk_meta.uid }}</userId>
    <userIp>{{ ._tyk_context.remote_addr }}</userIp>
    <reqType>{{ ._tyk_context.request_data.param.type }}</reqType>
  </body>
</data>
```
In this template:
- `.data.body.value1` accesses the "value1" field of the input XML
- we swap value1 and value2
- we use the range function to loop through the "value_list" array
- `._tyk_meta.uid` injects the "uid" session metadata value
- `._tyk_context.remote_addr` injects the client IP address from the context
- `._tyk_context.request_data.param.type` injects query parameter "type"

**Output**
``` .xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>value-2</value1>
    <value2>value-1</value2>
    <transformedList>
      <item>one</item>
      <item>two</item>
      <item>three</item>
    </transformedList>
    <userId>user123</userId>
    <userIp>192.0.0.1</userIp>
    <reqType>strict</reqType>
  </body>
</data>
```

### XML to JSON conversion using jsonMarshal
The `jsonMarshal` function converts XML formatted input into JSON, for example:

**Input**
```xml
<hello>world</hello>
```

**Template**
```go
{{ . | jsonMarshal }}
```

**Output**
```json
{"hello":"world"}
```

Note that in this example, Go will step through the entire data structure provided to the template. When used in the [Request]({{< ref "transform-traffic/request-body#data-accessible-to-the-middleware" >}}) or [Response]({{< ref "advanced-configuration/transform-traffic/response-body#data-accessible-to-the-middleware" >}}) Body Transform middleware, this would include Context Variables and Session Metadata if provided to the middleware.

### JSON to XML conversion using xmlMarshal
The `xmlMarshal` function converts JSON formatted input into XML, for example:

**Input**
```json
{"hello":"world"}
```
**Template**
``` .go
{{ . | xmlMarshal }}
```

**Output**
```xml
<hello>world</hello>
```

Note that in this example, Go will step through the entire data structure provided to the template. When used in the [Request]({{< ref "transform-traffic/request-body#data-accessible-to-the-middleware" >}}) or [Response]({{< ref "advanced-configuration/transform-traffic/response-body#data-accessible-to-the-middleware" >}}) Body Transform middleware, this would include Context Variables and Session Metadata if provided to the middleware.




## Go Plugins Upgrade Guide

### "Go Plugin Upgrade Guide"


This guide shows you how to compile your custom Go plugins for upgrade.

The table below links you to the upgrade steps for the version of Tyk you are upgrading from and to:

| Upgrade process | Current Version | Target Version |
|-----------------|-----------------|----------------|
| [Path 1](#path-1)    | < 4.1.0         | < 4.1.0        |
| [Path 2](#path-2)    | < 4.1.0         | >= 4.1.0       |
| [Path 3](#path-3)    | >= 4.1.0        | >= 5.1.0       |

## Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0 {#path-1}
 1. Open a terminal/command prompt in the directory of your plugin source file(s)
 2. Run the following commands to initialise your plugin:

```bash
go get 
github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

# Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

go mod tidy
go mod vendor
```

## Path 2 - Current Version < 4.1.0 and Target Version >= 4.1.0 {#path-2}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialize your plugin:

- **Target Version <= v4.2.0**  
    ```bash
    go get github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5
    # Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
    go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca
    go mod tidy
    go mod vendor
    ```
- **Target Version > v4.2.0 and < v5.1**
    ```bash
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
- **Target Version >= v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```


## Path 3 - Current Version >= 4.1.0 and Target Version >= 5.1.0 {#path-3}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialise your plugin:

- **Target Version > v4.2.0 and < v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
    - **Target Version >= v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using
    # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```

## Compile the plugins

Download the plugin compiler for the target Gateway version you’re upgrading to (e.g. 5.2.5). Docker images for plugin compiler versions are available in the [Tyk Docker Hub](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags). 

```bash
docker pull tykio/tyk-plugin-compiler:v5.2.5
```

Recompile your plugin with this version

```bash
docker run --rm -v "$(pwd)":/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.5 plugin.so
```

Example:
{{< img src="/img/upgrade-guides/recompile_plugin.png" 
    alt="Recompile plugin example" width="600" height="auto">}}

You can remove the plugin complier images once your plugin has been successfully recompiled:

```bash
docker rmi plugin_compiler_image_name_or_id
```



### JavaScript Middleware

There are three middleware components that can be scripted with Tyk:

1. **Custom JavaScript plugins**: These execute either *pre* or *post* validation. A *pre* middleware component will execute before any session validation or token validation has taken place, while a *post* middleware component will execute after the request has been passed through all checks and is ready to be proxied upstream.

2. **Dynamic event handlers**: These components fire on certain API events (see the event handlers section), these are fired Async and do not have a cooldown timer. These are documented [here]({{< ref "/product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-oas#set-up-a-webhook-event-handler-in-the-tyk-oas-api-definition" >}}).

3. **Virtual endpoints**: These are powerful programmable middleware invoked towards the end of the request processing chain. Unlike the custom JavaScript plugins, the virtual endpoint terminates the request. These are documented [here]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}).

The JavaScript (JS) [scripting guide]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}}) provides details of how to access dynamic data (such as the key session object) from your JS functions. Combining these resources provides you with a powerful set of tools for shaping and structuring inbound traffic to your API.

### Declared plugin functions

JavaScript functions are available globally in the same namespace. So, if you include two or more JSVM plugins that call the same function, the last declared plugin implementation of the function will be returned.

## Enabling the JavaScript Virtual Machine (JSVM)

The JavaScript Virtual Machine (JSVM) provided in the Gateway is a traditional ECMAScript5 compatible environment.

Before you can use JavaScript customization in any component you will need to enable the JSVM.

You do this by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}).

## Installing JavaScript middleware

Installing middleware is different for different Tyk deployments, for example, in Tyk OSS it is possible to directly specify a path to a file in the API Definition, while in Tyk Self-Managed, we recommend using a directory-based loader.

We've provided the following guides:

- [Tyk OSS]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-ce" >}})
- [Tyk Self-Managed]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-pro" >}})
- [Tyk Hybrid]({{< ref "plugins/supported-languages/javascript-middleware/install-middleware/tyk-hybrid" >}})

{{< note success >}}
**Note**

Tyk Cloud Classic does not support custom middleware.
{{< /note >}}


### Using JavaScript with Tyk


Tyk's JavaScript Virtual Machine (JSVM) provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself. This can be accessed from [multiple locations]({{< ref "plugins/supported-languages/javascript-middleware" >}}) in the API processing chain and allows significant customization and optimization of your request handling.

In this guide we will cover the features and resources available to you when creating custom functions, highlighting where there are limitations for the different middleware stages.

## Scripting basics

Here we cover various facets that you need to be aware of when creating custom functions for Tyk.

### Accessing external and dynamic data

JS functions can be given access to external data objects relating to the API request. These allow for the modification of both the request itself and the session:

- `request`: an [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-request-object" >}}) describing the API request that invoked the middleware
- `session`: the key session [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-session-object" >}}) provided by the client when making the API request
- `config`: an [object]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#the-config-object" >}}) containing fields from the API definition

{{< note success >}}
**Note**

There are other ways of accessing and editing a session object using the [Tyk JavaScript API functions]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api#working-with-the-key-session-object" >}}).
{{< /note >}}

### Creating a middleware component

Tyk injects a `TykJS` namespace into the JSVM, which can be used to initialise a new middleware component. The JS for each middleware component should be in its own `*.js` file.

You create a middleware object by calling the `TykJS.TykMiddleware.NewMiddleware({})` constructor with an empty object and then initialising it with your function using the `NewProcessRequest()` closure syntax. This is where you expose the [external data objects]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#accessing-external-and-dynamic-data" >}}) to your custom function.

{{< note success >}}
**Note**

- For Custom JS plugins and Dynamic Event Handlers, the source code filename must match the function name
- Virtual Endpoints do not have this limitation
{{< /note >}}

### Returning from the middleware

When returning from the middleware, you provide specific return data depending upon the type of middleware.

#### Returning from Custom JS plugin

A custom JS plugin can modify fields in the API request and the session metadata, however this is not performed directly within the JSVM so the required updates must be passed out of the JSVM for Tyk to apply the changes. This is a requirement and omitting them can cause the middleware to fail.

The JS function must provide the `request` and `session.meta_data` objects in the `ReturnData` as follows:

```js
return sampleMiddleware.ReturnData(request, session.meta_data);
```

Custom JS plugins sit in the [middleware processing chain]({{< ref "concepts/middleware-execution-order" >}}) and pass the request onto the next middleware before it is proxied to the upstream. If required, however, a custom JS plugin can terminate the request and provide a custom response to the client if you configure the `ReturnOverrides` in the `request` object, as described [here]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#using-returnoverrides" >}}).

#### Returning from Virtual Endpoint

Unlike custom JS plugins, Virtual Endpoints always [terminate the request]({{< ref "advanced-configuration/compose-apis/virtual-endpoints#how-virtual-endpoints-work" >}}) so have a different method of returning from the JS function.

The function must return a `responseObject`. This is crucial as it determines the HTTP response that will be sent back to the client. The structure of this object is defined to ensure that the virtual endpoint can communicate the necessary response details back to the Tyk Gateway, which then forwards it to the client.

The `responseObject` has the following structure:

- `code`: an integer representing the HTTP status code of the response
- `headers`: an object containing key-value pairs representing the HTTP headers of the response
- `body`: a string that represents the body of the response which can be plain text, JSON, or XML, depending on what your API client expects to receive

You must provide the `responseObject` together with the `session.meta_data` as parameters in a call to `TykJsResponse` as follows:

```js
return TykJsResponse(responseObject, session.meta_data);
```

You can find some examples of how this works [here]({{< ref "advanced-configuration/compose-apis/demo-virtual-endpoint" >}}).

## JavaScript resources

JavaScript (JS) functions have access to a [system API]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api" >}}) and [library of functions]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#underscorejs-library" >}}). They can also be given access to certain Tyk data objects relating to the API request.

The system API provides access to resources outside of the JavaScript Virtual Machine sandbox, the ability to make outbound HTTP requests and access to the key management REST API functions.

### The `request` object

The `request` object provides a set of arrays that describe the API request. These can be manipulated and, when changed, will affect the request as it passes through the middleware pipeline. For [virtual endpoints]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) the request object has a [different structure](#VirtualEndpoint-Request).

The structure of the `request` object is:

```typesecript
class ReturnOverrides {
  ResponseCode: number = 200;
  ResponseBody: string = "";
  ResponseHeaders: string[] = [];
}

class Request {
  Headers: { [key: string]: string[] } = {};
  SetHeaders: { [key: string]: string } = {};
  DeleteHeaders: string[] = [];
  Body: string = "";
  URL: string = "";
  AddParams: { [key: string]: string } = {};
  DeleteParams: string[] = [];
  ReturnOverrides: ReturnOverrides = new ReturnOverrides();
  IgnoreBody: boolean = false;
  Method: string = "";
  RequestURI: string = "";
  Scheme: string = "";
}
```

<!--
```go
struct {
  Headers       map[string][]string
  SetHeaders    map[string]string
  DeleteHeaders []string
  Body          string
  URL           string
  AddParams     map[string]string
  DeleteParams  []string
  ReturnOverrides {
    ResponseCode: int
    ResponseBody: string
    ResponseHeaders []string
  }
  IgnoreBody    bool
  Method        string
  RequestURI    string
  Scheme        string
}
``` -->

- `Headers`: this is an object of string arrays, and represents the current state of the request header; this object cannot be modified directly, but can be used to read header data
- `SetHeaders`: this is a key-value map that will be set in the header when the middleware returns the object; existing headers will be overwritten and new headers will be added
- `DeleteHeaders`: any header name that is in this list will be deleted from the outgoing request; note that `DeleteHeaders` happens before `SetHeaders`
- `Body`: this represents the body of the request, if you modify this field it will overwrite the request
- `URL`: this represents the path portion of the outbound URL, you can modify this to redirect a URL to a different upstream path
- `AddParams`: you can add parameters to your request here, for example internal data headers that are only relevant to your network setup
- `DeleteParams`: these parameters will be removed from the request as they pass through the middleware; note `DeleteParams` happens before `AddParams`
- `ReturnOverrides`: values stored here are used to stop or halt middleware execution and return an error code
- `IgnoreBody`: if this parameter is set to `true`, the original request body will be used; if set to `false` the `Body` field will be used (`false` is the default behavior)
- `Method`: contains the HTTP method (`GET`, `POST`, etc.)
- `RequestURI`: contains the request URI, including the query string, e.g. `/path?key=value`
- `Scheme`: contains the URL scheme, e.g. `http`, `https`


#### Using `ReturnOverrides`

If you configure values in `request.ReturnOverrides` then Tyk will terminate the request and provide a response to the client when the function completes. The request will not be proxied to the upstream.

The response will use the parameters configured in `ReturnOverrides`:

- `ResponseCode`
- `ResponseBody`
- `ResponseHeaders`

In this example, if the condition is met, Tyk will return `HTTP 403 Access Denied` with the custom header `"X-Error":"the-condition"`:

```js
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});

testJSVMData.NewProcessRequest(function(request, session, config) {
  // Logic to determine if the request should be overridden
  if (someCondition) {
      request.ReturnOverrides.response_code = 403;
      request.ReturnOverrides.response_body = "Access Denied";
      request.ReturnOverrides.headers = {"X-Error": "the-condition"};
      // This stops the request from proceeding to the upstream
  }
	return testJSVMData.ReturnData(request, session.meta_data);
});
```

#### The virtual endpoint `request` object {#VirtualEndpoint-Request}

For [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) functions the structure of a Javascript `request` object is:

```typescript
class VirtualEndpointRequest {
  Body: string = "";
  Headers: { [key: string]: string[] } = {};
  Params: { [key: string]: string[] } = {};
  Scheme: string = "";
  URL: string = "";
}
```

- `Body`: HTTP request body, e.g. `""`
- `Headers`: HTTP request headers, e.g. `"Accept": ["*/*"]`
- `Params`: Decoded query and form parameters, e.g. `{ "confirm": ["true"], "userId": ["123"] }`
- `Scheme`: The scheme of the URL ( e.g. `http` or `https`)
- `URL`: The full URL of the request, e.g `/vendpoint/anything?user_id=123\u0026confirm=true`

</br>

{{< note success >}}
**Note**

Each query and form parameter within the request is stored as an array field in the `Params` field of the request object.

Repeated parameter assignments are appended to the corresponding array. For example, a request against `/vendpoint/anything?user_id[]=123&user_id[]=234` would result in a Javascript request object similar to that shown below:

```javascript
const httpRequest = {
  Headers: {
    "Accept": ["*/*"],
    "User-Agent": ["curl/8.1.2"]
  },
  Body: "",
  URL: "/vendpoint/anything?user_id[]=123\u0026user_id[]=234",
  Params: {
    "user_id[]": ["123", "234"]
  },
  Scheme: "http"
};
```
{{< /note >}}

### The `session` object

Tyk uses an internal [session object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}) to handle the quota, rate limits, access allowances and auth data of a specific key. JS middleware can be granted access to the session object but there is also the option to disable it as deserialising it into the JSVM is computationally expensive and can add latency. Other than the `meta_data` field, the session object itself cannot be directly edited as it is crucial to the correct functioning of Tyk.

#### Limitations

- Custom JS plugins at the [pre-]({{< ref "plugins/plugin-types/request-plugins" >}}) stage do not have access to the session object (as it has not been created yet)
- When scripting for Virtual Endpoints, the `session` data will only be available to the JS function if enabled in the middleware configuration.

#### Sharing data between middleware using the `session` object

For different middleware to be able to transfer data between each other, the session object makes available a `meta_data` key/value field that is written back to the session store (and can be retrieved by the middleware down the line) - this data is permanent, and can also be retrieved by the REST API from outside of Tyk using the `/tyk/keys/` method.

{{< note success >}}
**Note**

A new JSVM instance is created for *each* API that is managed. Consequently, inter-API communication is not possible via shared methods, since they have different bounds. However, it *is* possible using the session object if a key is shared across APIs.
{{< /note >}}

### The `config` object

The third Tyk data object that is made available to the script running in the JSVM contains data from the API Definition. This is read-only and cannot be modified by the JS function. The structure of this object is:

- `APIID`: the unique identifier for the API
- `OrgID`: the organization identifier
- `config_data`: custom attributes defined in the API description

#### Adding custom attributes to the API Definition

When working with Tyk OAS APIs, you can add custom attributes in the `data` object in the `x-tyk-api-gateway.middleware.global.pluginConfig` section of the API definition, for example:

```json {linenos=true, linenostart=1}
{
  "x-tyk-api-gateway": {  
    "middleware": {
      "global": {
        "pluginConfig": {
          "data": {
            "enabled": true,
            "value": {
              "foo": "bar"
            }
          }
        }
      }
    }
  }
}
```

When working with Tyk Classic APIs, you simply add the attributes in the `config_data` object in the root of the API definition:

```json {linenos=true, linenostart=1}
{
  "config_data": {
    "foo": "bar"
  }
}
```

### Underscore.js Library

In addition to our Tyk JavaScript API functions, you also have access to all the functions from the [underscore](http://underscorejs.org) library.

Underscore.js is a JavaScript library that provides a lot of useful functional programming helpers without extending any built-in objects. Underscore provides over 100 functions that support your favorite functional helpers:

- map
- filter
- invoke

There are also more specialized goodies, including:

- function binding
- JavaScript templating
- creating quick indexes
- deep equality testing

## Example

In this basic example, we show the creation and initialisation of a middleware object. Note how the three Tyk data objects (`request`, `session`, `config`) are made available to the function and the two objects that are returned from the function (in case the external objects need to be updated).

```js {linenos=true, linenostart=1}
/* --- sampleMiddleware.js --- */

// Create new middleware object
var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise the object with your functionality by passing a closure that accepts
// two objects into the NewProcessRequest() function:
sampleMiddleware.NewProcessRequest(function(request, session, config) {
    log("This middleware does nothing, but will print this to your terminal.")

    // You MUST return both the request and session metadata
    return sampleMiddleware.ReturnData(request, session.meta_data);
});
```


### JavaScript API

This system API provides access to resources outside of the JavaScript Virtual Machine sandbox, the ability to make outbound HTTP requests and access to the key management REST API functions.

Embedded JavaScript interpreters offer the bare bones of a scripting language, but not necessarily the functions that you would expect, especially with JavaScript, where objects such as `XMLHttpRequest()` are a given. However, those interfaces are actually provided by the browser / DOM that the script engine are executing in. In a similar vein, we have included a series of functions to the JSVM for convenience and give the interpreter more capability.

This list is regularly revised and any new suggestions should be made in our [Github issue tracker](https://github.com/TykTechnologies/tyk/issues).

Below is the list of functions currently provided by Tyk.

- `log(string)`: Calling `log("this message")` will cause Tyk to log the string to Tyk's default logger output in the form `JSVM Log: this message` as an INFO statement. This function is especially useful for debugging your scripts. It is recommended to put a `log()` call at the end of your middleware and event handler module definitions to indicate on load that they have been loaded successfully - see the [example scripts](https://github.com/TykTechnologies/tyk/tree/master/middleware) in your Tyk installation `middleware` directory for more details.
- `rawlog(string)`: Calling `rawlog("this message")` will cause Tyk to log the string to Tyk's default logger output without any additional formatting, like adding prefix or date. This function can be used if you want to have own log format, and parse it later with custom tooling.
- `b64enc` - Encode string to base64
- `b64dec` - Decode base64 string
- `TykBatchRequest` this function is similar to `TykMakeHttpRequest` but makes use of the Tyk Batch API. See the Batch Requests section of the [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) for more details.
- `TykMakeHttpRequest(JSON.stringify(requestObject))`: This method is used to make an HTTP request, requests are encoded as JSON for deserialisation in the min binary and translation to a system HTTP call. The request object has the following structure:

```js
newRequest = {
  "Method": "POST",
  "Body": JSON.stringify(event),
  "Headers": {},
  "Domain": "http://foo.com",
  "Resource": "/event/quotas",
  "FormData": {"field": "value"}
};
```

{{< note success >}}
**Note**

If you want to include querystring values, add them as part of the `Domain` property.
{{< /note >}}

Tyk passes a simplified response back which looks like this:

```go
type TykJSHttpResponse struct {
	Code    int
	Body    string
	Headers map[string][]string
}
```

The response is JSON string encoded, and so will need to be decoded again before it is usable:

```js
usableResponse = JSON.parse(response);
log("Response code: " + usableResponse.Code);
log("Response body: " + usableResponse.Body);
```

This method does not execute asynchronously, so execution will block until a response is received.

### Working with the key session object

To work with the key session object, two functions are provided: `TykGetKeyData` and `TykSetKeyData`:

- `TykGetKeyData(api_key, api_id)`: Use this method to retrieve a [session object]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}) for the key and the API provided:

  ```js
  // In an event handler, we can get the key idea from the event, and the API ID from the context variable.
  var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
  log("Expires: " + thisSession.expires)
  ```

- `TykSetKeyData(api_key, api_id)`: Use this method to write data back into the Tyk session store:

  ```js
  // You can modify the object just like with the REST API
  thisSession.expires = thisSession.expires + 1000;

  // Use TykSetKeyData to set the key data back in the session store
  TykSetKeyData(event.EventMetaData.Key, JSON.stringify(thisSession));
  ```

All of these methods are described in functional examples in the Tyk `middleware/` and `event_handlers/` folders.


#### Installing Middleware on Tyk Self-Managed


In some cases middleware references can't be directly embedded in API Definitions (for example, when using the Tyk Dashboard in an Self-Managed installation). However, there is an easy way to distribute and enable custom middleware for an API in a Tyk node by adding them as a directory structure.

Tyk will load the middleware plugins dynamically on host-reload without needing a direct reference to them in the API Definition.

The directory structure should look like this:

```text
middleware
  / {API Id}
    / pre
    / {middlewareObject1Name}.js
    /  {middlewareObject2Name}.js
    / post
      / {middlewareObject1Name}_with_session.js
      / {middlewareObject2Name}.js
```

Tyk will check for a folder that matches the `API Id` being loaded, and then load the `pre` and `post` middleware from the respective directories.

{{< note success >}}
**Note**

The filename MUST match the object to be loaded exactly.
{{< /note >}}

If your middleware requires session injection, then append `_with_session` to the filename.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM.

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.


#### Installing Middleware on Tyk Hybrid


In some cases middleware references can't be directly embedded in API Definitions (for example, when using the dashboard in a Hybrid install). However, there is an easy way to distribute and enable custom middleware for an API on a Tyk node.

A second method of loading API Definitions in Tyk nodes is to add them as a directory structure in the Tyk node. Tyk will load the middleware plugins dynamically on host-reload without needing a direct reference to them in the API Definition.

The directory structure looks as follows:

```text
middleware
  / {API Id}
    / pre
    / {middlewareObject1Name}.js
    /  {middlewareObject2Name}.js
    / post
      / {middlewareObject1Name}_with_session.js
      / {middlewareObject2Name}.js
```

Tyk will check for a folder that matches the `{API Id}` being loaded, and then load the `pre` and `post` middleware from the respective folders.

{{< note success >}}
**Note**

The filename MUST match the object to be loaded exactly.
{{< /note >}}

If your middleware requires session injection, then append `_with_session` to the filename.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.


#### Installing Middleware on Tyk OSS

In order to activate middleware when using Tyk OSS or when using a file-based setup, the middleware needs to be registered as part of your API Definition. Registration of middleware components is relatively simple.

{{< note success >}}
**Note**

It is important that your object names are unique.
{{< /note >}}

{{< note success >}}
**Note**

This functionality may change in subsequent releases.
{{< /note >}}

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

Adding the middleware plugin is as simple as adding it to your definition file in the middleware sections:

```json
...
"event_handlers": {},
"custom_middleware": {
  "pre": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ],
  "post": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ]
},
"enable_batch_request_support": false,
...
```

As you can see, the parameters are all dynamic, so you will need to ensure that the path to your middleware is correct. The configuration sections are as follows:

- `pre`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *before* any authentication information is extracted from the header or parameter list of the request. Use middleware in this section to pre-process a request before feeding it through the Tyk middleware.

- `pre[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:

  `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

- `pre[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

- `pre[].require_session`: Irrelevant for pre-processor middleware, since no auth data has been extracted by the authentication middleware, it cannot be made available to the middleware.

- `post`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *after* the authentication, validation, throttling, and quota-limiting middleware has been executed, just before the request is proxied upstream. Use middleware in this section to post-process a request before sending it to your upstream API.

- `post[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:

  `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

- `post[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

- `post[].require_session`: Defaults to `false`, if you require access to the session object, it will be supplied as a `session` variable to your middleware processor function.


#### WAF (OSS) ModSecurity Plugin example


### Use Case

Traditionally, a Web Application Firewall (WAF) would be the first layer requests would hit, before reaching the API  gateway.  This is not possible if the Gateway has to terminate SSL, for things such as mTLS.

So what do you do if you still want to run your requests through a WAF to automatically scan for malicious action?  We incorporate a WAF as part of the request lifecycle by using Tyk's plugin architecture.

### Prerequisites

* Already running Tyk -  Community Edition or Pro
* Docker, to run the WAF

### Disclaimer

This is NOT a production ready plugin because 

* The JavaScript plugin creates a new connection with the WAF for every request
* The request is not sent over SSL
* The WAF is only sent the query params for inspection.

For higher performance, the plugin could be written in Golang, and a connection pool would be opened and maintained over SSL

## Install Steps

### 1. Turn JSVM on your `tyk.conf` at the root level:

Turn on JSVM interpreter to allow Tyk to run JavaScript plugins.

```
"enable_jsvm": true
```

### 2. Place the JavaScript plugin on Tyk file system
Copy the JS Plugin as a local .js file to the Gateway's file system.  

From the Gateway root, this will download the plugin called `waf.js` into the `middleware` directory:
```
curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js
```

(Instructions)
If you are running Tyk in Docker, you can get into Tyk Gateway with `docker exec`
```
$ docker ps | grep gateway
670039a3e0b8        tykio/tyk-gateway:latest           "./entrypoint.sh"        14 minutes ago      Up 14 minutes       0.0.0.0:8080->8080/tcp             tyk-demo_tyk-gateway_1

## copy container name or ID 
$ docker exec -it 670039a3e0b8 bash

## Now SSH'd into Tyk Gateway container and can perform curl
root@670039a3e0b8:/opt/tyk-gateway# ls

apps	   entrypoint.sh   install  middleware	templates  tyk-gateway.pid  tyk.conf.example
coprocess  event_handlers  js	    policies	tyk	   tyk.conf	    utils

## Download the plugin
root@670039a3e0b8:/opt/tyk-gateway# curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1125  100  1125    0     0   3906      0 --:--:-- --:--:-- --:--:--  3975

```

[waf.js source](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js)

### 3. Import API definition into Tyk
Copy the following Tyk API definition and import it into your environment.

[API Definition JSON](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/apidef.json)

Here's the important section which adds the plugin to the request lifecycle for this API:
```{.json}
"custom_middleware": {
      "pre": [
        {
          "name": "Waf",
          "path": "./middleware/waf.js"
        }
      ],
```

##### How to Import?
[Tyk Pro](https://tyk.io/docs/tyk-configuration-reference/import-apis/#import-apis-via-the-dashboard)

[Tyk CE](https://tyk.io/docs/try-out-tyk/tutorials/create-api/)

### 4. Run WAF ModSecurity Using Docker

First run ModSecurity with the popular [Core RuleSet](https://coreruleset.org/) in Docker
```
$ docker run -ti -p 80:80 -e PARANOIA=1 --rm owasp/modsecurity-crs:v3.0
```

Open a second terminal and curl it
```
$ curl localhost

hello world
```

We should see the request show in the WAF server:

```
172.17.0.1 - - [30/Jun/2020:00:56:42 +0000] "GET / HTTP/1.1" 200 12
```

Now try a dirty payload:
```
$ curl 'localhost/?param="><script>alert(1);</script>'

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body>
<h1>Forbidden</h1>
<p>You don't have permission to access /
on this server.<br />
</p>
</body></html>
```

Our WAF catches the response and returns a `403`.


Now we try through Tyk.

```
## Clean requests, should get response from upstream's IP endpoint
$ curl localhost:8080/waf/ip

{
  "origin": "172.30.0.1, 147.253.129.30"
}

## WAF will detect malicious payload and instruct Tyk to deny
$ curl 'localhost:8080/waf/ip?param="><script>alert(1);</script>
{
    "error": "Bad request!"
}
```


### Rich Plugins


Rich plugins make it possible to write powerful middleware for Tyk. Tyk supports: 

*   [Python]({{< ref "plugins/supported-languages/rich-plugins/python/python" >}})
*   [gRPC]({{< ref "plugins/supported-languages/rich-plugins/grpc" >}})
*   [Lua]({{< ref "plugins/supported-languages/rich-plugins/luajit" >}})

gRPC provides the ability to write plugins using many languages including C++, Java, Ruby and C#.

The dynamically built Tyk binaries can expose and call Foreign Function Interfaces in guest languages that extend the functionality of a gateway process.

The plugins are able to directly call some Tyk API functions from within their guest language. They can also be configured so that they hook into various points along the standard middleware chain.

{{< note success >}}
**Note**  

When using Python plugins, the middleware function names are set globally. So, if you include two or more plugins that implement the same function, the last declared plugin implementation of the function will be returned. We plan to add namespaces in the future.
{{< /note >}}



### How do rich plugins work ?


### ID Extractor & Auth Plugins

The ID Extractor is a caching mechanism that's used in combination with Tyk Plugins. It can be used specifically with plugins that implement custom authentication mechanisms. The ID Extractor works for all rich plugins: gRPC-based plugins, Python and Lua.

See [ID Extractor]({{< ref "plugins/plugin-types/auth-plugins/id-extractor" >}}) for more details.

### Interoperability

This feature implements an in-process message passing mechanism, based on [Protocol Buffers](https://developers.google.com/protocol-buffers/), any supported languages should provide a function to receive, unmarshal and process this kind of messages.

The main interoperability task is achieved by using [cgo](https://golang.org/cmd/cgo/) as a bridge between a supported language -like Python- and the Go codebase.

Your C bridge function must accept and return a `CoProcessMessage` data structure like the one described in [`api.h`](https://github.com/TykTechnologies/tyk/blob/master/coprocess/api.h), where `p_data` is a pointer to the serialised data and `length` indicates the length of it.

```{.copyWrapper}
struct CoProcessMessage {
  void* p_data;
  int length;
};
```

The unpacked data will hold the actual `CoProcessObject` data structure.

- `HookType` - the hook type (see below)
- `Request`  - the HTTP request
- `Session`  - the [Tyk session object]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}).
- `Metadata`  - the metadata from the session data above (key/value string map).
- `Spec`     - the API specification data. Currently organization ID, API ID and config_data.

```{.copyWrapper}
type CoProcessObject struct {
  HookType string
  Request  CoProcessMiniRequestObject
  Session  SessionState
  Metadata map[string]string
  Spec     map[string]string
}
```

### Coprocess Dispatcher

`Coprocess.Dispatcher` describes a very simple interface for implementing the dispatcher logic, the required methods are: `Dispatch`, `DispatchEvent` and `Reload`.

`Dispatch` accepts a pointer to a `struct CoProcessObject` (as described above) and must return an object of the same type. This method will be called for every configured hook on every request. Traditionally this method will perform a single function call on the target language side (like `Python_DispatchHook` in `coprocess_python`), and the corresponding logic will be handled from there (mostly because different languages have different ways of loading, referencing or calling middlewares).

`DispatchEvent` provides a way of dispatching Tyk events to a target language. This method doesn't return any variables but does receive a JSON-encoded object containing the event data. For extensibility purposes, this method doesn't use Protocol Buffers, the input is a `[]byte`, the target language will take this (as a `char`) and perform the JSON decoding operation.

`Reload` is called when triggering a hot reload, this method could be useful for reloading scripts or modules in the target language.

### Coprocess Dispatcher - Hooks

This component is in charge of dispatching your HTTP requests to the custom middlewares. The list, from top to bottom, shows the order of execution. The dispatcher follows the standard middleware chain logic and provides a simple mechanism for "hooking" your custom middleware behavior, the supported hooks are:

*   **Pre**: gets executed before the request is sent to your upstream target and before any authentication information is extracted from the header or parameter list of the request. When enabled, this applies to both keyless and protected APIs.
*   **AuthCheck**: gets executed as a custom authentication middleware, instead of the standard ones provided by Tyk. Use this to provide your own authentication mechanism.
*   **PostKeyAuth**: gets executed right after the authentication process.
*   **Post**: gets executed after the authentication, validation, throttling, and quota-limiting middleware has been executed, just before the request is proxied upstream. Use this to post-process a request before sending it to your upstream API. This is only called when using protected APIs. If you want to call a hook after the authentication but before the validation, throttling and other middleware, see **PostKeyAuth**.
*   **Response**: gets executed after the upstream API replies. The arguments passed to this hook include both the request and response data. Use this to modify the HTTP response before it's sent to the client. This hook also receives the request object, the session object, the metadata and API definition associated with the request.

{{< note success >}}
**Note**  

Response hooks are not available for native Go plugins. Python and gRPC plugins are supported. 
{{< /note >}}


### Coprocess Gateway API

[`coprocess_api.go`](https://github.com/TykTechnologies/tyk/tree/master/coprocess) provides a bridge between the Gateway API and C. Any function that needs to be exported should have the `export` keyword:

```{.copyWrapper}
//export TykTriggerEvent
func TykTriggerEvent( CEventName *C.char, CPayload *C.char ) {
  eventName := C.GoString(CEventName)
  payload := C.GoString(CPayload)

  FireSystemEvent(tykcommon.TykEvent(eventName), EventMetaDefault{
    Message: payload,
  })
}
```

You should also expect a header file declaration of this function in [`api.h`](https://github.com/TykTechnologies/tyk/blob/master/coprocess/api.h), like this:

```{.copyWrapper}
#ifndef TYK_COPROCESS_API
#define TYK_COPROCESS_API
extern void TykTriggerEvent(char* event_name, char* payload);
#endif
```

The language binding will include this header file (or declare the function inline) and perform the necessary steps to call it with the appropriate arguments (like an FFI mechanism could do). As a reference, this is how this could be achieved if you're building a [Cython](http://cython.org/) module:

```{.copyWrapper}
cdef extern:
  void TykTriggerEvent(char* event_name, char* payload);

def call():
  event_name = 'my event'.encode('utf-8')
  payload = 'my payload'.encode('utf-8')
  TykTriggerEvent( event_name, payload )
```

### Basic usage

The intended way of using a Coprocess middleware is to specify it as part of an API Definition:

```{.json}
"custom_middleware": {
  "pre": [
    {
      "name": "MyPreMiddleware",
      "require_session": false
    },
    {
      "name": "AnotherPreMiddleware",
      "require_session": false
    }
  ],
  "post": [
    {
      "name": "MyPostMiddleware",
      "require_session": false
    }
  ],
  "post_key_auth": [
    {
      "name": "MyPostKeyAuthMiddleware",
      "require_session": true
    }
  ],
  "auth_check": {
    "name": "MyAuthCheck"
  },
  "driver": "python"
}
```
{{< note success >}}
**Note**  

All hook types support chaining except the custom auth check (`auth_check`).
{{< /note >}}


#### Rich Plugins Data Structures


This page describes the data structures used by Tyk rich plugins, for the following plugin drivers:

-   Python (built-in)
-   Lua (built-in)
-   gRPC (external, compatible with any supported [gRPC language](https://grpc.io/docs/))

The Tyk [Protocol Buffer definitions](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) are intended for users to generate their own bindings using the appropriate gRPC tools for the required target language.
The remainder of this document illustrates a class diagram and explins the attributes of the protobuf messages.

---

## Class Diagram

The class diagram below illustrates the structure of the [Object](#object) message, dispatched by Tyk to a gRPC server that handles custom plugins.

{{< img src="/img/grpc/grpc-class-diagram.svg" width="600" >}}

---

## Object

The `Coprocess.Object` data structure wraps a `Coprocess.MiniRequestObject` and `Coprocess.ResponseObject` It contains additional fields that are useful for users that implement their own request dispatchers, like the middleware hook type and name.
It also includes the session state object (`SessionState`), which holds information about the current key/user that's used for authentication.

```protobuf
message Object {
  HookType hook_type = 1;
  string hook_name = 2;
  MiniRequestObject request = 3;
  SessionState session = 4;
  map<string, string> metadata = 5;
  map<string, string> spec = 6;
  ResponseObject response = 7;
}
```

#### Field Descriptions

`hook_type`
Contains the middleware hook type: pre, post, custom auth.

`hook_name`
Contains the hook name.

`request`
Contains the request object, see `MiniRequestObject` for more details.

`session`
Contains the session object, see `SessionState` for more details.

`metadata`
Contains the metadata. This is a dynamic field.

`spec`
Contains information about API definition, including `APIID`, `OrgID` and `config_data`.

`response`
Contains information populated from the upstream HTTP response data, for response hooks. See [ResponseObject](#responseobject) for more details. All the field contents can be modified.

---

## MiniRequestObject

The `Coprocess.MiniRequestObject` is the main request data structure used by rich plugins. It's used for middleware calls and contains important fields like headers, parameters, body and URL. A `MiniRequestObject` is part of a `Coprocess.Object`.

```protobuf
message MiniRequestObject {
   map<string, string> headers = 1;
   map<string, string> set_headers = 2;
   repeated string delete_headers = 3;
   string body = 4;
   string url = 5;
   map<string, string> params = 6;
   map<string, string> add_params = 7;
   map<string, string> extended_params = 8;
   repeated string delete_params = 9;
   ReturnOverrides return_overrides = 10;
   string method = 11;
   string request_uri = 12;
   string scheme = 13;
   bytes raw_body = 14;
}
```

#### Field Descriptions

`headers`
A read-only field for reading headers injected by previous middleware. Modifying this field won't alter the request headers See `set_headers` and `delete_headers` for this.

`set_headers`
This field appends the given headers (keys and values) to the request.

`delete_headers`
This field contains an array of header names to be removed from the request.

`body`
Contains the request body. See `ReturnOverrides` for response body modifications.

`raw_body`
Contains the raw request body (bytes).

`url`
The request URL.

`params`
A read-only field that contains the request params. Modifying this value won't affect the request params.

`add_params`
Add paramaters to the request.

`delete_params`
This field contains an array of parameter keys to be removed from the request.

`return_overrides`
See `ReturnOverrides` for more information.

`method`
The request method, e.g. GET, POST, etc.

`request_uri`
Raw unprocessed URL which includes query string and fragments.

`scheme`
Contains the URL scheme, e.g. `http`, `https`.

---

## ResponseObject

The `ResponseObject` exists within an [object](#object) for response hooks. The fields are populated with the upstream HTTP response data. All the field contents can be modified.

```protobuf
syntax = "proto3";

package coprocess;

message ResponseObject {
  int32 status_code = 1;
  bytes raw_body = 2;
  string body = 3;
  map<string, string> headers = 4;
  repeated Header multivalue_headers = 5;
}

message Header {
  string key = 1;
  repeated string values = 2;
}
```

#### Field Descriptions

`status_code`
This field indicates the HTTP status code that was sent by the upstream.

`raw_body`
This field contains the HTTP response body (bytes). It's always populated.

`body`
This field contains the HTTP response body in string format. It's not populated if the `raw_body` contains invalid UTF-8 characters.

`headers`
A map that contains the headers sent by the upstream.

`multivalue_headers`
A list of headers, each header in this list is a structure that consists of two parts: a key and its corresponding values.
The key is a string that denotes the name of the header, the values are a list of strings that hold the content of the header, this is useful when the header has multiple associated values.
This field is available for Go, Python and Ruby since tyk v5.0.4 and  5.1.1+.

---

## ReturnOverrides

The `ReturnOverrides` object, when returned as part of a `Coprocess.Object`, overrides the response of a given HTTP request. It also stops the request flow and the HTTP request isn't passed upstream. The fields specified in the `ReturnOverrides` object are used as the HTTP response.
A sample usage for `ReturnOverrides` is when a rich plugin needs to return a custom error to the user.

```protobuf
syntax = "proto3";

package coprocess;

message ReturnOverrides {
  int32 response_code = 1;
  string response_error = 2;
  map<string, string> headers = 3;
  bool override_error = 4;
  string response_body = 5;
}
```

#### Field Descriptions

`response_code`
This field overrides the HTTP response code and can be used for error codes (403, 500, etc.) or for overriding the response.

`response_error`
This field overrides the HTTP response body.

`headers`
This field overrides response HTTP headers.

`override_error`
This setting provides enhanced customization for returning custom errors. It should be utilized alongside `response_body` for optimal effect.

`response_body`
This field serves as an alias for `response_erro`r and holds the HTTP response body.

---

## SessionState {#session-state}

A `SessionState` data structure is created for every authenticated request and stored in Redis. It's used to track the activity of a given key in different ways, mainly by the built-in Tyk middleware like the quota middleware or the rate limiter.
A rich plugin can create a `SessionState` object and store it in the same way built-in authentication mechanisms do. This is what a custom authentication middleware does. This is also part of a `Coprocess.Object`.
Returning a null session object from a custom authentication middleware is considered a failed authentication and the appropriate HTTP 403 error is returned by the gateway (this is the default behavior) and can be overridden by using `ReturnOverrides`.

#### Field Descriptions

`last_check`
No longer used.

`allowance`
No longer in use, should be the same as `rate`.

`rate` 
The number of requests that are allowed in the specified rate limiting window.

`per`
The number of seconds that the rate window should encompass.

`expires`
An epoch that defines when the key should expire.

`quota_max`
The maximum number of requests allowed during the quota period.

`quota_renews`
An epoch that defines when the quota renews.

`quota_remaining`
Indicates the remaining number of requests within the user's quota, which is independent of the rate limit.

`quota_renewal_rate`
The time in seconds during which the quota is valid. So for 1000 requests per hour, this value would be 3600 while `quota_max` and `quota_remaining` would be 1000.

`access_rights`
Defined as a `map<string, APIDefinition>` instance, that maps the session's API ID to an [AccessDefinition](#access-definition). The AccessDefinition defines the [access rights]({{< ref "security/security-policies/secure-apis-method-path#setting-granular-paths-on-a-per-key-basis" >}}) for the API in terms of allowed: versions and URLs(endpoints). Each URL (endpoint) has a list of allowed methods. For further details consult the tutorials for how to create a [security policy]({{< ref "getting-started/create-security-policy" >}}) for Tyk Cloud, Tyk Self Managed and Tyk OSS platforms.

`org_id`
The organization this user belongs to. This can be used in conjunction with the org_id setting in the API Definition object to have tokens "owned" by organizations.

`oauth_client_id`
This is set by Tyk if the token is generated by an OAuth client during an OAuth authorization flow.

`basic_auth_data`
This section contains a hashed representation of the basic auth password and the hashing method used.
For further details see [BasicAuthData](#basicauthdata).

`jwt_data`
Added to sessions where a Tyk key (embedding a shared secret) is used as the public key for signing the JWT. The JWT token's KID header value references the ID of a Tyk key. See [JWTData](#jwtdata) for an example.

`hmac_enabled`
When set to `true` this indicates generation of a [HMAC signature]({{< ref "basic-config-and-security/security/authentication-authorization/hmac-signatures#a-sample-signature-generation-snippet" >}}) using the secret provided in `hmac_secret`. If the generated signature matches the signature provided in the *Authorization* header then authentication of the request has passed.

`hmac_secret`
The value of the HMAC shared secret.

`is_inactive`
Set this value to true to deny access.

`apply_policy_id`
The policy ID that is bound to this token.

{{< note success >}}
**Note**  

Although `apply_policy_id` is still supported, it is now deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **[Multiple Policy]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies#partitioned-policy-functionality" >}})** feature introduced in the  **v2.4 - 1.4** release.
{{< /note >}}

`data_expires`
A value, in seconds, that defines when data generated by this token expires in the analytics DB (must be using Pro edition and MongoDB).

`monitor`
Defines a [quota monitor]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) containing a list of percentage threshold limits in descending order. These limits determine when webhook notifications are triggered for API users or an organization. Each threshold represents a percentage of the quota that, when reached, triggers a notification. See [Monitor](#monitor) for further details and an example.

`enable_detailed_recording`
Set this value to true to have Tyk store the inbound request and outbound response data in HTTP Wire format as part of the analytics data.

`metadata`
Metadata to be included as part of the session. This is a key/value string map that can be used in other middleware such as transforms and header injection to embed user-specific data into a request, or alternatively to query the providence of a key.

`tags`
Tags are embedded into analytics data when the request completes. If a policy has tags, those tags will supersede the ones carried by the token (they will be overwritten).

`alias`
As of v2.1, an Alias offers a way to identify a token in a more human-readable manner, add an Alias to a token in order to have the data transferred into Analytics later on so you can track both hashed and un-hashed tokens to a meaningful identifier that doesn't expose the security of the underlying token.

`last_updated`
A UNIX timestamp that represents the time the session was last updated. Applicable to *Post*, *PostAuth* and *Response* plugins. When developing *CustomAuth* plugins developers should add this to the SessionState instance.

`id_extractor_deadline`
This is a UNIX timestamp that signifies when a cached key or ID will expire. This relates to custom authentication, where authenticated keys can be cached to save repeated requests to the gRPC server. See [id_extractor]({{< ref "plugins/plugin-types/auth-plugins/id-extractor" >}}) and [Auth Plugins]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}}) for additional information.

`session_lifetime`
UNIX timestamp that denotes when the key will automatically expire. Any·subsequent API request made using the key will be rejected. Overrides the global session lifetime. See [Key Expiry and Deletion]({{< ref "basic-config-and-security/security/authentication-authorization/physical-key-expiry" >}}) for more information.

---

## AccessDefinition {#access-definition}

```protobuf
message AccessDefinition {
  string api_name = 1;
  string api_id = 2;
  repeated string versions = 3;
  repeated AccessSpec allowed_urls = 4;
}
```

Defined as an attribute within a [SessionState](#session-state) instance. Contains the allowed versions and URLs (endpoints) for the API that the session request relates to. Each URL (endpoint) specifies an associated list of allowed methods. See also [AccessSpec](#access-spec).

#### Field Descriptions

`api_name`
The name of the API that the session request relates to.

`api_id`
The ID of the API that the session request relates to.

`versions`
List of allowed API versions, e.g.  `"versions": [ "Default" ]`.

`allowed_urls` List of [AccessSpec](#access-spec) instances. Each instance defines a URL (endpoint) with an associated allowed list of methods. If all URLs (endpoints) are allowed then the attribute is not set.

---

## AccessSpec {#access-spec}

Defines an API's URL (endpoint) and associated list of allowed methods

```protobuf
message AccessSpec {
  string url = 1;
  repeated string methods = 2;
}
```

#### Field Descriptions 

`url`
A URL (endpoint) belonging to the API associated with the request session.

`methods`
List of allowed methods for the URL (endpoint), e.g. `"methods": [ "GET". "POST", "PUT", "PATCH" ]`.

---

## BasicAuthData

The `BasicAuthData` contains a hashed password and the name of the hashing algorithm used. This is represented by the `basic_auth_data` attribute in [SessionState](#session-state) message.

```yaml
"basicAuthData": {
    "password": <a_hashed_password_presentation>,
    "hash": <the_hashing_algorithm_used_to_hash_the_password>
}
```

#### Field Descriptions

`password`
A hashed password.

`hash`
Name of the [hashing algorithm]({{< ref "basic-config-and-security/security/key-hashing" >}}) used to hash the password.

---

## JWTData

Added to [sessions](#session-state) where a Tyk key (embedding a shared secret) is used as the public key for signing the JWT. This message contains the shared secret.

```yaml
"jwtData": {
  "secret": "the_secret"
}
```

#### Field Descriptions

`secret`
The shared secret.

---

## Monitor {#monitor}
Added to a [session](#session-state) when [monitor quota thresholds]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) are defined within the Tyk key. This message contains the quota percentage threshold limits, defined in descending order, that trigger webhook notification.

```yaml
message Monitor {
  repeated double trigger_limits = 1;
}
```

#### Field Descriptions

`trigger_limits`
List of trigger limits defined in descending order. Each limit represents the percentage of the quota that must be reached in order for the webhook notification to be triggered.

```yaml
"monitor": {
  "trigger_limits": [80.0, 60.0, 50.0]
}
```

---

</br>

##### Python

### Requirements

Since v2.9, Tyk supports any currently stable [Python 3.x version](https://www.python.org/downloads/). The main requirement is to have the Python shared libraries installed. These are available as `libpython3.x` in most Linux distributions.

* Python3-dev
* [Protobuf](https://pypi.org/project/protobuf/): provides [Protocol Buffers](https://developers.google.com/protocol-buffers/) support 
* [gRPC](https://pypi.org/project/grpcio/): provides [gRPC](http://www.grpc.io/) support

### Important Note Regarding Performance
Python plugins are [embedded](https://docs.python.org/3/extending/embedding.html) within the Tyk Gateway process. Tyk Gateway integrates with Python custom plugins via a [cgo](https://golang.org/cmd/cgo) bridge.

`Tyk Gateway` <-> CGO <-> `Python Custom Plugin`

In order to integrate with Python custom plugins, the *libpython3.x.so* shared object library is used to embed a Python interpreter directly in the Tyk Gateway. Further details can be found [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-gateway-api" >}})

This allows combining the strengths of both Python and Go in a single application. However, it's essential to be aware of the potential complexities and performance implications of mixing languages, as well as the need for careful memory management when working with Python objects from Go.

The Tyk Gateway process initialises the Python interpreter using [Py_initialize](https://docs.python.org/3/c-api/init.html#c.Py_Initialize). The Python [Global Interpreter Lock (GIL)](https://docs.python.org/3/glossary.html/#term-global-interpreter-lock) allows only one thread to execute Python bytecode at a time, ensuring thread safety and simplifying memory management. While the GIL simplifies these aspects, it can limit the scalability of multi-threaded applications, particularly those with CPU-bound tasks, as it restricts parallel execution of Python code.

In the context of custom Python plugins, API calls are queued and the Python interpreter handles requests sequentially, processing them one at a time. Subsequently, this would consume large amounts of memory, and network sockets would remain open and blocked until the API request is processed.


### Install the Python development packages

{{< tabs_start >}}

{{< tab_start "Docker" >}}
{{< note success >}}
**Note**  

Starting from Tyk Gateway version `v5.3.0`, Python is no longer bundled with the official Tyk Gateway Docker image by default, to address security vulnerabilities in the Python libraries highlighted by [Docker Scout](https://docs.docker.com/scout/).
<br>
Whilst Python plugins are still supported by Tyk Gateway, if you want to use them you must extend the image to add support for Python. For further details, please refer to the [release notes]({{< ref "product-stack/tyk-gateway/release-notes/version-5.3.md" >}}) for Tyk Gateway `v5.3.0`.
{{< /note >}}

If you wish to use Python plugins using Docker, you can extend the official Tyk Gateway Docker image by adding Python to it. 

This example Dockerfile extends the official Tyk Gateway image to support Python plugins by installing python and the required modules:

```dockerfile
ARG BASE_IMAGE
FROM ${BASE_IMAGE}

# For Python plugins
RUN apt-get install -y python3-setuptools libpython3-dev python3-dev python3-grpcio

EXPOSE 8080 80 443

ENV PORT=8080

WORKDIR /opt/tyk-gateway/

ENTRYPOINT ["/opt/tyk-gateway/tyk" ]
CMD [ "--conf=/opt/tyk-gateway/tyk.conf" ]
```

To use this, you simply run `docker build` with this Dockerfile, providing the Tyk Gateway image that you would like to extend as build argument `BASE_IMAGE`.
As an example, this command will extend Tyk Gateway `v5.3.0` to support Python plugins, generating the image `tyk-gateway-python:v5.3.0`:

```bash
docker build --build-arg BASE_IMAGE=tykio/tyk-gateway:v5.3.0 -t tyk-gateway-python:v5.3.0 .
```
{{< tab_end >}}

{{< tab_start "Ubuntu/Debian" >}}
```apt
apt install python3 python3-dev python3-pip build-essential
```

### Install the Required Python Modules

Make sure that "pip" is available in your system, it should be typically available as "pip", "pip3" or "pipX.X" (where X.X represents the Python version):

```pip3
pip3 install protobuf grpcio
```
{{< tab_end >}}

{{< tab_start "Red Hat or CentOS" >}}
```yum
yum install python3-devel python3-setuptools
python3 -m ensurepip
```

### Install the Required Python Modules

Make sure that "pip" is now available in your system, it should be typically available as "pip", "pip3" or "pipX.X" (where X.X represents the Python version):

```pip3
pip3 install protobuf grpcio
```
{{< tab_end >}}

{{< tabs_end >}}


### Python versions

Newer Tyk versions provide more flexibility when using Python plugins, allowing the users to set which Python version to use. By default, Tyk will try to use the latest version available.

To see the Python initialisation log, run the Tyk gateway in debug mode.

To use a specific Python version, set the `python_version` flag under `coprocess_options` in the Tyk Gateway configuration file (tyk.conf).

{{< note success >}}
**Note**  

Tyk doesn't support Python 2.x.
{{< /note >}}

### Troubleshooting

To verify that the required Python Protocol Buffers module is available:

```python3
python3 -c 'from google import protobuf'
```

No output is expected from this command on successful setups.

### How do I write Python Plugins?

We have created [a demo Python plugin repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).


The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}). A single Python script contains the code for it, see [middleware.py](https://github.com/TykTechnologies/tyk-plugin-demo-python/blob/master/middleware.py).


####  Custom Authentication Plugin Tutorial

## Introduction
This tutorial will guide you through the creation of a custom authentication plugin, written in Python.
A custom authentication plugin allows you to implement your own authentication logic and override the default Tyk authentication mechanism. The sample code implements a very simple key check; currently it supports a single, hard-coded key. It could serve as a starting point for your own authentication logic. We have tested this plugin with Ubuntu 14.

The code used in this tutorial is also available in [this GitHub repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).

## Requirements

* Tyk API Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here]({{< ref "tyk-self-managed/install" >}}) for more installation options.

### Dependencies

* The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli](https://github.com/TykTechnologies/tyk-cli)
* In Tyk 2.8 the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
* Python 3.4

## Create the Plugin
The first step is to create a new directory for your plugin file:

```bash
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

Next you need to create a manifest file. This file contains information about our plugin file structure and how you expect it to interact with the API that will load it.
This file should be named `manifest.json` and needs to contain the following content:

```json
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
* The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. You use the `auth_check` for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).
* The `name` field references the name of the function that you implement in your plugin code: `MyAuthMiddleware`.
* You add an additional file called `middleware.py`, this will contain the main implementation of our middleware.

{{< note success >}}
**Note**  

Your bundle should always contain a file named `middleware.py` as this is the entry point file.
{{< /note >}}

### Contents of middleware.py

You import decorators from the Tyk module as this gives you the `Hook` decorator, and you import [Tyk Python API helpers]({{< ref "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods" >}})

You implement a middleware function and register it as a hook, the input includes the request object, the session object, the API meta data and its specification:

```python
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

## Building the Plugin

A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

You will use the Dockerised version of the Tyk CLI tool to bundle our package.

First, export your Tyk Gateway version to a variable.
```bash
### THIS MUST MATCH YOUR TYK GATEWAY VERSION
$ IMAGETAG=v3.1.2
```

Then run the following commands to generate a `bundle.zip` in your current directory:
```docker
$ docker run \
  --rm -w "/tmp" -v $(pwd):/tmp \
  --entrypoint "/bin/sh" -it \
  tykio/tyk-gateway:$IMAGETAG \
  -c '/opt/tyk-gateway/tyk bundle build -y'
```

**Success!**

You should now have a `bundle.zip` file in the plugin directory.

## Publishing the Plugin

To allow Tyk access to the plugin bundle, you need to serve this file using a web server. For this tutorial we'll use the Python built-in HTTP server (check the official docs for additional information). This server listens on port 8000 by default. To start it use:

`python3 -m http.server`

When the server is started our current working directory is used as the web root path, this means that our `bundle.zip` file should be accessible from the following URL:

`http://<IP Address>:8000/bundle.zip`

The Tyk Gateway fetches and loads a plugin bundle during startup time and subsequent reloads. For updating plugins using the hot reload feature, you should use different plugin bundle names as you expect them to be used for versioning purposes, e.g. bundle-1, bundle-2, etc.
If a bundle already exists, Tyk will skip the download process and load the version that's already present.

## Configure Tyk

You will need to modify the Tyk global configuration file (`tyk.conf`) to use Python plugins. The following block should be present in this file:

```json
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
* `bundle_base_url`: This is a base URL that will be used to download the bundle. You should replace the `bundle_base_url` with the appropriate URL of the web server that's serving your plugin bundles. For now HTTP and HTTPS are supported but we plan to add more options in the future (like pulling directly from S3 buckets). You use the URL that's exposed by the test HTTP server in the previous step.
* `public_key_path`: Modify `public_key_path` in case you want to enforce the cryptographic check of the plugin bundle signatures. If the `public_key_path` isn't set, the verification process will be skipped and unsigned plugin bundles will be loaded normally.

## Configure an API Definition

There are two important parameters that you need to add or modify in the API definition.
The first one is `custom_middleware_bundle` which must match the name of the plugin bundle file. If we keep this with the default name that the Tyk CLI tool uses, it will be `bundle.zip`.

`"custom_middleware_bundle": "bundle.zip"`

The second parameter is specific to this tutorial, and should be used in combination with `use_keyless` to allow an API to authenticate against our plugin:

`"use_keyless": false`
`"enable_coprocess_auth": true`

`"enable_coprocess_auth"` will instruct the Tyk gateway to authenticate this API using the associated custom authentication function that's implemented by the plugin.

## Configuration via the Tyk Dashboard

To attach the plugin to an API, From the **Advanced Options** tab in the **API Designer** enter **bundle.zip** in the **Plugin Bundle ID** field.

{{< img src="/img/2.10/plugin_bundle_id.png" alt="Plugin Options" >}}

You also need to modify the authentication mechanism that's used by the API.
From the **Core Settings** tab in the **API Designer** select **Use Custom Authentication (Python, CoProcess, and JSVM plugins)** from the **Authentication - Authentication Mode** drop-down list. 

{{< img src="/img/2.10/custom_auth_python.png" alt="Advanced Options" >}}

## Testing the Plugin

Now you can simply make an API call against the API for which we've loaded the Python plugin.


### If Running Tyk Gateway from Source

At this point you have your test HTTP server ready to serve the plugin bundle and the configuration with all the required parameters.
The final step is to start or restart the **Tyk Gateway** (this may vary depending on how you setup Tyk).
A separate service is used to load the Tyk version that supports Python (`tyk-gateway-python`), so we need to stop the standard one first (`tyk-gateway`):

```service
service tyk-gateway stop
service tyk-gateway-python start
```

From now on you should use the following command to restart the service:

```service
service tyk-gateway-python restart
```

A cURL request will be enough for testing our custom authentication middleware.

This request will trigger a bad authentication:

```curl
curl http://<IP Address>:8080/my-api/my-path -H 'Authorization: badtoken'
```

This request will trigger a successful authentication. You are using the token that's set by your Python plugin:

```curl
curl http://<IP Address>:8080/my-api/my-path -H 'Authorization: 47a0c79c427728b3df4af62b9228c8ae'
```

## What's Next?

In this tutorial you learned how Tyk plugins work. For a production-level setup we suggest the following steps:

* Configure Tyk to use your own key so that you can enforce cryptographic signature checks when loading plugin bundles, and sign your plugin bundles!
* Configure an appropriate web server and path to serve your plugin bundles.


### Tutorial - Add Python Plugin To Your Gateway

## API settings

To add a Python plugin to your API, you must specify the bundle name using the `custom_middleware_bundle` field:

```{.json}
{
  "name": "Tyk Test API",
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
  "custom_middleware_bundle": "test-bundle"
}
```

## Global settings

To enable Python plugins you need to add the following block to `tyk.conf`:

```{.copyWrapper}
"coprocess_options": {
  "enable_coprocess": true,
  "python_path_prefix": "/opt/tyk-gateway"
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://dummy-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

`enable_coprocess`: enables the rich plugins feature.

`python_path_prefix`: Sets the path to built-in Tyk modules, this will be part of the Python module lookup path. The value used here is the default one for most installations.

`enable_bundle_downloader`: enables the bundle downloader.

`bundle_base_url`: is a base URL that will be used to download the bundle, in this example we have `test-bundle` specified in the API settings, Tyk will fetch the URL for your specified bundle server (in the above example): `dummy-bundle-server.com/bundles/test-bundle`. You need to create and then specify your own bundle server URL.

`public_key_path`: sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used. 


### Tyk Python API methods

Python plugins may call these Tyk API methods:

### store_data(key, value, ttl)

`store_data` sets a Redis `key` with the specified `value` and `ttl`.

### get_data(key)

`get_data` retrieves a Redis `key`.

### trigger_event(event_name, payload)

`trigger_event` triggers an internal Tyk event, the `payload` must be a JSON object.

### log(msg, level)

`log` will log a message (`msg`) using the specified `level`.

### log_error(*args)

`log_error` is a shortcut for `log`, it uses the error log level.


#### Python Performance

These are some benchmarks performed on Python plugins. Python plugins run in a standard Python interpreter, embedded inside Tyk.

{{< img src="/img/diagrams/pythonResponseTime.png" alt="Python Performance" >}}

{{< img src="/img/diagrams/pythonHitRate.png" alt="Python Performance" >}}


#### gRPC

gRPC is a very powerful framework for RPC communication across different [languages](https://www.grpc.io/docs). It was created by Google and makes heavy use of HTTP2 capabilities and the [Protocol Buffers](https://developers.google.com/protocol-buffers/) serialisation mechanism to dispatch and exchange requests between Tyk and your gRPC plugins.

When it comes to built-in plugins, we have been able to integrate several languages like Python, Javascript & Lua in a native way: this means the middleware you write using any of these languages runs in the same process. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS.

For supporting additional languages we have decided to integrate gRPC connections and perform the middleware operations within a gRPC server that is external to the Tyk process. Please contact us to learn more:

</br>

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. See [gRPC by language](http://www.grpc.io/docs/) for further details.

---

## Architectural overview

An example architecture is illustrated below.

{{< img src="/img/diagrams/diagram_docs_gRPC-plugins_why-use-it-for-plugins@2x.png" alt="Using gRPC for plugins" >}}

Here we can see that Tyk Gateway sends requests to an external Java gRPC server to handle authentication, via a CustomAuth plugin. The flow is as follows:

- Tyk receives a HTTP request.
- Tyk serialises the request and session into a protobuf message that is dispatched to your gRPC server. 
- The gRPC server performs custom middleware operations (for example, any modification of the request object). Each plugin (Pre, PostAuthKey, Post, Response etc.) is handled as separate gRPC request.
- The gRPC server sends the request back to Tyk.
- Tyk proxies the request to your upstream API.

---

## Use cases

Deploying an external gRPC server to handle plugins provides numerous technical advantages:

- Allows for independent scalability of the service from the Tyk Gateway.
- Utilizes a custom-designed server tailored to address specific security concerns, effectively mitigating various security risks associated with native plugins.

---

## Limitations

At the time of writing the following features are currently unsupported and unavailable in the serialised request:
- Client certificiates
- OAuth keys
- For graphQL APIs details concerning the *max_query_depth* is unavailable
- A request query parameter cannot be associated with multiple values

---

## Developer Resources

The [Protocol Buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto ) and [bindings](https://github.com/TykTechnologies/tyk/tree/master/coprocess/bindings) provided by Tyk should be used in order for successful ommunication between Tyk Gateway and your gRPC plugin server. Documentation for the protobuf messages is available in the [Rich Plugins Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) page.

You can generate supporting HTML documentation using the *docs* task in the [Taskfile](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/Taskfile.yml) file of the [Tyk repository](https://github.com/TykTechnologies/tyk). This documentation explains the protobuf messages and services that allow gRPC plugins to handle a request made to the Gateway. Please refer to the README file within the proto folder of the tyk repository for further details.

You may re-use the bindings that were generated for our samples or generate the bindings youself for Go, Python and Ruby, as implemented by the *generate* task in the [Taskfile](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/Taskfile.yml) file of the [Tyk repository](https://github.com/TykTechnologies/tyk).

If you wish to generate bindings for another target language you may generate the bindings yourself. The [Protocol Buffers](https://developers.google.com/protocol-buffers/) and [gRPC documentation](http://www.grpc.io/docs) provide specific requirements and instructions for each language.

---

## What's next?

See our [getting started]({{< ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin" >}}) guide for an explanation of how to write and configure gRPC plugins.

---


### Key Concepts

This document serves as a developer's guide for understanding the key concepts and practical steps for writing and configuring gRPC plugins for Tyk Gateway. It provides technical insights and practical guidance to seamlessly integrate Tyk plugins into your infrastructure through gRPC. The goal is to equip developers with the knowledge and tools needed to effectively utilize gRPC for enhancing Tyk Gateway functionalities.

This comprehensive guide covers essential tasks, including:

1. **Developing a gRPC Server:** Learn how to develop a gRPC server using [Tyk protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto). The gRPC server facilitates the execution of Tyk plugins, which offer custom middleware for various phases of the API request lifecycle. By integrating these plugins, developers can enable Tyk Gateway with enhanced control and flexibility in managing API requests, allowing for fine-grained customization and tailored processing at each stage of the request lifecycle.

2. **Configuring Tyk Gateway:** Set up Tyk Gateway to communicate with your gRPC Server and, optionally, an external secured web server hosting the gRPC plugin bundle for API configurations. Configure Tyk Gateway to fetch the bundle configured for an API from the web server, enabling seamless integration with gRPC plugins. Specify connection settings for streamlined integration.

3. **API Configuration:** Customize API settings within Tyk Gateway to configure gRPC plugin utilization. Define plugin hooks directly within the API Definition or remotely via an external web server for seamless request orchestration. Tyk plugins provide custom middleware for different phases of the API request lifecycle, enhancing control and flexibility.

4. **API Testing:** Test that Tyk Gateway integrates with your gRPC server for the plugins configured for your API. 

---

## Develop gRPC server

Develop your gRPC server, using your preferred language, to handle requests from Tyk Gateway for each of the required plugin hooks. These hooks allow Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle. 

### Prerequisites

The following prerequisites are necessary for developing a gRPC server that integrates with Tyk Gateway.

##### Tyk gRPC Protocol Buffers

A collection of [Protocol Buffer](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) messages are available in the Tyk Gateway repository to allow Tyk Gateway to integrate with your gRPC server, requesting execution of plugin code. These messages establish a standard set of data structures that are serialised between Tyk Gateway and your gRPC Server. Developers should consult the [Rich Plugins Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) page for further details.

##### Protocol Buffer Compiler

The protocol buffer compiler, `protoc`, should be installed to generate the service and data structures in your preferred language(s) from the [Tyk gRPC Protocol Buffer](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) files. Developers should consult the [installation](https://grpc.io/docs/protoc-installation/) documentation at [grpc.io](https://grpc.io/) for an explanation of how to install `protoc`.

### Generate Bindings

Generate the bindings (service and data structures) for your target language using the `protoc` compiler. Tutorials are available at [protobuf.dev](https://protobuf.dev/getting-started/) for your target language.

### Implement service

Your gRPC server should implement the *Dispatcher* service to enable Tyk Gateway to integrate with your gRPC server. The Protocol Buffer definition for the *Dispatcher* service is listed below:

```protobuf
service Dispatcher {
  rpc Dispatch (Object) returns (Object) {}
  rpc DispatchEvent (Event) returns (EventReply) {}
}
```

The *Dispatcher* service contains two RPC methods, *Dispatch* and *DispatchEvent*. Dispatch handles a requests made by Tyk Gateway for each plugin configured in your API. DispatchEvent receives notification of an event.

Your *Dispatch* RPC should handle the request made by Tyk Gateway, implementing custom middleware for the intended plugin hooks. Each plugin hook allows Tyk Gateway to communicate with your gRPC server to execute custom middleware at various stages of the API request lifecycle, such as Pre, PostAuth, Post, Response etc. The Tyk Protocol Buffers define the [HookType](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/coprocess_common.proto) enumeration to inspect the type of the intended gRPC plugin associated with the request. This is accessible as an attribute on the *Object* message, e.g. *object_message_instance.hook_type*.

### Developer resources

Consult the [Tyk protocol buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) for the definition of the service and data structures that enable integration of Tyk gateway with your gRPC server. Tyk provides pre-generated [bindings](https://github.com/TykTechnologies/tyk/tree/master/coprocess/bindings) for C++, Java, Python and Ruby.

Example tutorials are available that explain how to generate the protobuf bindings and implement a server for [Java]({{< ref "plugins/supported-languages/rich-plugins/grpc/request-transformation-java" >}}), [.NET]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-dot-net" >}}) and [NodeJS]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-nodejs" >}}).

Tyk Github repositories are also available with examples for [Ruby](https://github.com/TykTechnologies/tyk-plugin-demo-ruby) and [C#/.NET](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet)
 
---

## Configure Tyk Gateway

Configure Tyk Gateway to issue requests to your gRPC server and optionally, specify the URL of the web server that will serve plugin bundles.

### Configure gRPC server

Modify the root of your `tyk.conf` file to include the *coprocess_options* section, similar to that listed below:

```yaml
"coprocess_options": {
  "enable_coprocess": true,
  "coprocess_grpc_server": "tcp://127.0.0.1:5555",
  "grpc_authority": "localhost",
  "grpc_recv_max_size": 100000000,
  "grpc_send_max_size": 100000000
},
```

A gRPC server can configured under the `coprocess_options` section as follows:

- `enable_coprocess`: Enables the rich plugins feature.
- `coprocess_grpc_server`: Specifies the gRPC server URL, in this example we're using TCP. Tyk will attempt a connection on startup and keep reconnecting in case of failure.
- `grpc_recv_max_size`: Specifies the message size supported by the gateway gRPC client, for receiving gRPC responses.
- `grpc_send_max_size`: Specifies the message size supported by the gateway gRPC client for sending gRPC requests.
- `grpc_authority`: The `authority` header value, defaults to `localhost` if omitted. Allows configuration according to [RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540#section-8.1.2.3).

When using gRPC plugins, Tyk acts as a gRPC client and dispatches requests to your gRPC server. gRPC libraries usually set a default maximum size, for example, the official gRPC Java library establishes a 4
MB message size [https://jbrandhorst.com/post/grpc-binary-blob-stream/](https://jbrandhorst.com/post/grpc-binary-blob-stream/).

Configuration parameters are available for establishing a message size in both directions (send and receive). For most use cases and especially if you're dealing with multiple hooks, where the same request object is dispatched, it is recommended to set both values to the same size.

### Configure Web server (optional)

Tyk Gateway can be configured to download the gRPC plugin configuration for an API from a web server. For further details related to the concept of bundling plugins please refer to [plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

```yaml
"enable_bundle_downloader": true,
"bundle_base_url": "https://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

The following parameters can be configured: 
- `enable_bundle_downloader`: Enables the bundle downloader to download bundles from a webserver.
- `bundle_base_url`: Base URL from which to serve bundled plugins.
- `public_key_path`: Public key for bundle verification (optional)

The `public_key_path` value is used for verifying signed bundles, you may omit this if unsigned bundles are used.

---

## Configure API

Plugin hooks for your APIs in Tyk can be configured either by directly specifying them in a configuration file on the Gateway server or by hosting the configuration externally on a web server. This section explains how to configure gRPC plugins for your API endpoints on the local Gateway or remotely from an external secured web server.

### Local

This section provides examples for how to configure gRPC plugin hooks, locally within an API Definition. Examples are provided for Tyk Gateway and Tyk Operator.

#### Tyk Gateway

For configurations directly embedded within the Tyk Gateway, plugin hooks can be defined within your API Definition. An example snippet from a Tyk Classic API Definition is provided below:

```yaml
"custom_middleware": {
    "pre": [
        {"name": "MyPreMiddleware"}
    ],
    "post": [
        {"name": "MyPostMiddleware"}
    ],
    "auth_check": {
        "name": "MyAuthCheck"
    },
    "driver": "grpc"
}
```

For example, a Post request plugin hook has been configured with name `MyPostMiddleware`. Before the request is sent upstream Tyk Gateway will serialize the request into a [Object protobuf message]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#object" >}}) with the `hook_name` property set to `MyPostMiddleware` and the `hook_type` property set to `Post`. This message will then then be dispatched to the gRPC server for processing before the request is sent upstream.

</br>
{{< note success >}}
**Note**

Ensure the plugin driver is configured as type *grpc*. Tyk will issue a request to your gRPC server for each plugin hook that you have configured.
{{< /note >}}

#### Tyk Operator

The examples below illustrate how to configure plugin hooks for an API Definition within Tyk Operator.

Setting the `driver` configuring parameter to `gRPC` instructs Tyk Gateway to issue a request to your gRPC server for each plugin hook that you have configured.

**Pre plugin hook example**

In this example we can see that a `custom_middleware` configuration block has been used to configure a gRPC Pre request plugin hook with name `HelloFromPre`. Before any middleware is executed Tyk Gateway will serialize the request into a [Object protobuf message]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#object" >}}) with the `hook_name` property set to `HelloFromPre` and the `hook_type` property set to `Pre`. This message will then then be dispatched to the gRPC server.

```yaml {linenos=table,hl_lines=["14-18"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-grpc-pre
spec:
  name: httpbin-grpc-pre
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin-grpc-pre
    strip_listen_path: true
  custom_middleware:
    driver: grpc
    pre:
      - name: HelloFromPre
        path: ""
```

**Post plugin hook example**

In the example we can see that a `custom_middleware` configuration block has been used to configure a gRPC Post plugin with name `HelloFromPost`. 

Before the request is sent upstream Tyk Gateway will serialize the request and session details into a [Object protobuf message]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#object" >}}) with the `hook_name` property set to `HelloFromPost` and the `hook_type` property set to `Post`. This message will then then be dispatched to the gRPC server for processing before the request is sent upstream.

```yaml {linenos=table,hl_lines=["14-18"],linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-grpc-post
spec:
  name: httpbin-grpc-post
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin-grpc-post
    strip_listen_path: true
  custom_middleware:
    driver: grpc
    post:
      - name: HelloFromPost
        path: ""
```

### Remote

It is possible to configure your API so that it downloads a bundled configuration of your plugins from an external webserver. The bundled plugin configuration is contained within a zip file.

A gRPC plugin bundle is similar to the [standard bundling mechanism]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}). The standard bundling mechanism zips the configuration and plugin source code, which will be executed by Tyk. Conversely, a gRPC plugin bundle contains only the configuration (`manifest.json`), with plugin code execution being handled independently by the gRPC server.

Bundling a gRPC plugin requires the following steps:
- Create a `manifest.json` that contains the configuration of your plugins
- Build a zip file that bundles your plugin
- Upload the zip file to an external secured webserver
- Configure your API to download your plugin bundle

#### Create the manifest file

The `manifest.json` file specifies the configuration for your gRPC plugins. An example `manifest.json` is listed below:

```yaml
{
    "file_list": [],
    "custom_middleware": {
        "pre": [{"name": "MyPreMiddleware"}],
        "post": [{"name": "MyPostMiddleware"}],
        "auth_check": {"name": "MyAuthCheck"},
        "driver": "grpc"
    },
    "checksum": "",
    "signature": ""
}
```

{{< note sucess >}}
**Note**

The source code files, *file_list*, are empty for gRPC plugins. Your gRPC server contains the source code for handling plugins.
{{< /note >}}

#### Build plugin bundle

A plugin bundle can be built using the Tyk Gateway binary and should only contain the `manifest.json` file:

```bash
tyk bundle build -output mybundle.zip -key mykey.pem
```

The example above generates a zip file, name `mybundle.zip`. The zip file is signed with key `mykey.pem`.

The resulting bundle file should then be uploaded to the webserver that hosts your plugin bundles.

#### Configure API

##### Tyk Gateway

To add a gRPC plugin to your API definition, you must specify the bundle file name within the `custom_middleware_bundle` field:

```yaml
{
   "name": "Tyk Test API",
   ...
+  "custom_middleware_bundle": "mybundle.zip"
}
```

The value of the `custom_middleware_bundle` field will be used in combination with the gateway settings to construct a bundle URL. For example, if Tyk Gateway is configured with a webserver base URL of https://my-bundle-server.com/bundles/ then an attempt would be made to download the bundle from https://my-bundle-server.com/bundles/mybundle.zip.

##### Tyk Operator

 Currently this feature is not yet documented with a Tyk Operator example for configuring an API to use plugin bundles. For further details please reach out and contact us on the [community support forum](https://community.tyk.io).

---

## Test your API Endpoint

It is crucial to ensure the security and reliability of your gRPC server. As the developer, it is your responsibility to verify that your gRPC server is secured and thoroughly tested with appropriate test coverage. Consider implementing unit tests, integration tests and other testing methodologies to ensure the robustness of your server's functionality and security measures. This step ensures that the Tyk Gateway properly communicates with your gRPC server and executes the custom logic defined by the plugin hooks.

Test the API endpoint using tools like *Curl* or *Postman*. Ensure that your gRPC server is running and the gRPC plugin(s) are functioning. An example using *Curl* is listed below:

```bash
curl -X GET https://www.your-gateway-server.com:8080/api/path
```

Replace `https://www.your-gateway-server.com:8080/api/path` with the actual endpoint of your API.

---

## Summary

This guide has explained the key concepts and processes for writing gRPC plugins that integrate with Tyk Gateway. The following explanations have been given:

- Prerequisites for developing a gRPC server for your target language.
- The *Dispatcher* service interface.
- How to configure Tyk Gateway to integrate with your gRPC server.
- How to configure Tyk Gateway with an optional external web server for fetching plugin configuration.
- How to configure gRPC plugins for your APIs.
- How to test your API integration with your gRPC server using curl.

---

## What's Next?

- Consult the [Protocol Buffer messages]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) that Tyk Gateway uses when making a request to a gRPC server.
- Visit tutorial guides that explain how to implement a [Java]({{< ref "plugins/supported-languages/rich-plugins/grpc/request-transformation-java" >}}), [.NET]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-dot-net" >}}) and [NodeJS]({{< ref "plugins/supported-languages/rich-plugins/grpc/custom-auth-nodejs" >}}) gRPC server.
- Visit our [plugins hub]({{< ref "plugins/plugin-hub" >}}) to explore further gRPC development examples and resources.

---


### "Getting Started: Creating A Python gRPC Server"

In the realm of API integration, establishing seamless connections between services is paramount.

Understanding the fundamentals of gRPC server implementation is crucial, especially when integrating with a Gateway solution like Tyk. This guide aims to provide practical insights into this process, starting with the basic principles of how to implement a Python gRPC server that integrates with Tyk Gateway.

## Objectives

By the end of this guide, you will be able to implement a gRPC server that will integrate with Tyk Gateway, setting the stage for further exploration in subsequent parts:

- Establishing the necessary tools, Python libraries and gRPC service definition for implementing a gRPC server that integrates with Tyk Gateway.
- Developing a basic gRPC server that echoes the request payload to the console, showcasing the core principles of integration.
- Configuring Tyk Gateway to interact with our gRPC server, enabling seamless communication between the two services.

Before implementing our first gRPC server it is first necessary to understand the service interface that defines how Tyk Gateway integrates with a gRPC server.


## Tyk Dispatcher Service

The *Dispatcher* service, defined in the [coprocess_object.proto](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/coprocess_object.proto) file, contains the *Dispatch* RPC method, invoked by Tyk Gateway to request remote execution of gRPC plugins. Tyk Gateway dispatches accompanying data relating to the original client request and session. The service definition is listed below:

```protobuf
service Dispatcher {
  rpc Dispatch (Object) returns (Object) {}
  rpc DispatchEvent (Event) returns (EventReply) {}
}
```

On the server side, we will implement the *Dispatcher* service methods and a gRPC server to handle requests from Tyk Gateway. The gRPC infrastructure decodes incoming requests, executes service methods and encodes service responses.

Before we start developing our gRPC server we need to setup our development environment with the supporting libraries and tools.


## Prerequisites

Firstly, we need to download the [Tyk Protocol Buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) and install the Python protoc compiler.

We are going to use the *protoc* compiler to generate the supporting classes and data structures to implement the *Dispatcher* service.


### Tyk Protocol Buffers

Issue the following command to download and extract the Tyk Protocol Buffers from the Tyk GitHub repository:

```bash
curl -sL "https://github.com/TykTechnologies/tyk/archive/master.tar.gz " -o tyk.tar.gz && \
    mkdir tyk && \
    tar -xzvf tyk.tar.gz --strip-components=1 -C tyk && \
    mv tyk/coprocess/proto/* . && \
    rm -r tyk tyk.tar.gz
```

### Install Dependencies

We are going to setup a Python virtual environment and install some supporting dependencies. Assuming that you have Python [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) already installed, then issue the following commands to setup a Python virtual environment containing the grpcio and grpcio-tools libraries:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install –upgrade pip
pip install grpcio grpcio-tools grpcio-reflection
```

The [grpcio](https://pypi.org/project/grpcio/) library offers essential functionality to support core gRPC features such as message serialisation and deserialisation. The [grpcio-tools](https://pypi.org/project/grpcio-tools/) library provides the Python *protoc* compiler that we will use to generate the supporting classes and data structures to implement our gRPC server. The [grpcio-reflection](https://pypi.org/project/grpcio-reflection/) library allows clients to query information about the services and methods provided by a gRPC server at runtime. It enables clients to dynamically discover available services, their RPC methods, in addition to the message types and field names associated with those methods.


### Install grpcurl

Follow the [installation instructions](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#installation) to install grpcurl. We will use grpcurl to send test requests to our gRPC server.


### Generate Python Bindings

We are now able to generate the Python classes and data structures to allow us to implement our gRPC server. To accomplish this we will use the Python *protoc* command as listed below:

```bash
python -m grpc_tools.protoc --proto_path=. --python_out=. --grpc_python_out=. *.proto
```

This compiles the Protocol Buffer files (*.proto) from the current working directory and generates the Python classes representing the Protocol Buffer messages and services. A series of *.py* files should now exist in the current working directory. We are interested in the *coprocess_object_pb2_grpc.py* file, containing a default implementation of *Tyk’s Dispatcher* service.

Inspect the generated Python file, *coprocess_object_pb2_grpc.py*, containing the *DispatcherServicer* class:

```python
class DispatcherServicer(object):
    """ GRPC server interface, that must be implemented by the target language """
    def Dispatch(self, request, context):
        """ Accepts and returns an Object message """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')
    def DispatchEvent(self, request, context):
        """ Dispatches an event to the target language """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')
```

This superclass contains a default stub implementation for the **Dispatch** and **DispatchEvent** RPC methods, each defining request and context parameters:

The *request* parameter allows our server to access the message payload sent by Tyk Gateway. We can use this data, pertaining to the request and session, to process and generate a response.

The *context* parameter provides additional information and functionalities related to the RPC call, such as timeout limits, cancelation signals etc. This is a [grpc.ServicerContext](https://grpc.github.io/grpc/python/grpc.html#grpc.ServicerContext) or a [grpc.aio.ServicerContext](https://grpc.github.io/grpc/python/grpc_asyncio.html#grpc.aio.ServicerContext), object depending upon whether a synchronous or AsyncIO gRPC server is implemented.

In the next step we will implement a subclass that will handle requests made by Tyk Gateway for remote execution of custom plugins.


## Implement Dispatcher Service

We will now develop the *Dispatcher* service, adding implementations of the *Dispatch* and *DispatchEvent* methods, to allow our gRPC server to integrate with Tyk Gateway. Before we continue, create a file, *async_server.py*, within the same folder as the generated Protocol Buffer (.proto) files. 


### Dispatch

Our implementation of the Dispatch RPC method will deserialize the request payload and output to the console as JSON format. This serves as a useful development and debugging aid, allowing inspection of the request and session state dispatched by Tyk Gateway to our gRPC server.

Copy and paste the following source code into the *async_server.py* file. Notice that we have used type hinting to aid readability. The type hints are located within the type hint files (.pyi) we generated with the protoc compiler. 


```python
import asyncio
import grpc
import json
import signal
import logging
from google.protobuf.json_format import MessageToJson
from grpc_reflection.v1alpha import reflection
import coprocess_object_pb2_grpc
import coprocess_object_pb2
from coprocess_common_pb2 import HookType
from coprocess_session_state_pb2 import SessionState
class PythonDispatcher(coprocess_object_pb2_grpc.DispatcherServicer):
    async def Dispatch(
        self, object: coprocess_object_pb2.Object, context: grpc.aio.ServicerContext
    ) -> coprocess_object_pb2.Object:
        logging.info(f"STATE for {object.hook_name}\n{MessageToJson(object)}\n")
        if object.hook_type == HookType.Pre:
            logging.info(f"Pre plugin name: {object.hook_name}")
            logging.info(f"Activated Pre Request plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.CustomKeyCheck:
            logging.info(f"CustomAuth plugin: {object.hook_name}")
            logging.info(f"Activated CustomAuth plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.PostKeyAuth:
            logging.info(f"PostKeyAuth plugin name: {object.hook_name}")
            logging.info(f"Activated PostKeyAuth plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.Post:
            logging.info(f"Post plugin name: {object.hook_name}")
            logging.info(f"Activated Post plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.Response:
            logging.info(f"Response plugin name: {object.hook_name}")
            logging.info(f"Activated Response plugin from API: {object.spec.get('APIID')}")
            logging.info("--------\n")
        return object
```

Our *Dispatch* RPC method accepts the two parameters, *object* and *context*. The object parameter allows us to inspect the state and session of the request object dispatched by Tyk Gateway, via accessor methods. The *context* parameter can be used to set timeout limits etc. associated with the RPC call.

The important takeaways from the source code listing above are:

- The [MessageToJson](https://googleapis.dev/python/protobuf/latest/google/protobuf/json_format.html#google.protobuf.json_format.MessageToJson) function is used to deserialize the request payload as JSON.
- In the context of custom plugins we access the *hook_type* and *hook_name* attributes of the *Object* message to determine which plugin to execute.
- The ID of the API associated with the request is accessible from the spec dictionary, *object.spec.get('APIID')*.

An implementation of the *Dispatch* RPC method must return the object payload received from Tyk Gateway. The payload can be modified by the service implementation, for example to add or remove headers and query parameters before the request is sent upstream.


### DispatchEvent

Our implementation of the *DispatchEvent* RPC method will deserialize and output the event payload as JSON. Append the following source code to the *async_server.py* file:

```python
   async def DispatchEvent(
        self, event: coprocess_object_pb2.Event, context: grpc.aio.ServicerContext
    ) -> coprocess_object_pb2.EventReply:
        event = json.loads(event.payload)
        http://logging.info (f"RECEIVED EVENT: {event}")
        return coprocess_object_pb2.EventReply()
```

The *DispatchEvent* RPC method accepts the two parameters, *event* and *context*. The event parameter allows us to inspect the payload of the event dispatched by Tyk Gateway. The context parameter can be used to set timeout limits etc. associated with the RPC call.

The important takeaways from the source code listing above are:

- The event data is accessible from the *payload* attribute of the event parameter.
- An implementation of the *DispatchEvent* RPC method must return an instance of  *coprocess_object_pb2.EventReply*.


## Create gRPC Server

Finally, we will implement an AsyncIO gRPC server to handle requests from Tyk Gateway to the *Dispatcher* service. We will add functions to start and stop our gRPC server. Finally, we will use *grpcurl* to issue a test payload to our gRPC server to test that it is working.


### Develop gRPC Server

Append the following source code from the listing below to the *async_server.py* file:

```python
async def serve() -> None:
    server = grpc.aio.server()
    coprocess_object_pb2_grpc.add_DispatcherServicer_to_server(
        PythonDispatcher(), server
    )
   listen_addr = "[::]:50051"
    SERVICE_NAMES = (
        coprocess_object_pb2.DESCRIPTOR.services_by_name["Dispatcher"].full_name,
        reflection.SERVICE_NAME,
    )

    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port(listen_addr)

    logging.info ("Starting server on %s", listen_addr)

    await server.start()
    await server.wait_for_termination()

async def shutdown_server(server) -> None:
    http://logging.info ("Shutting down server...")
    await server.stop(None)
```

The *serve* function starts the gRPC server, listening for requests on port 50051 with reflection enabled.

Clients can use reflection to list available services, obtain their RPC methods and retrieve their message types and field names dynamically. This is particularly useful for tooling and debugging purposes, allowing clients to discover server capabilities without prior knowledge of the service definitions. 

{{< note success >}}

**note**

A descriptor is a data structure that describes the structure of the messages, services, enums and other elements defined in a .proto file. The purpose of the descriptor is primarily metadata: it provides information about the types and services defined in the protocol buffer definition. The *coprocess_object_pb2.py* file that we generated using *protoc* contains a DESCRIPTOR field that we can use to retrieve this metadata. For further details consult the documentation for the Google's protobuf [FileDescriptor](https://googleapis.dev/python/protobuf/latest/google/protobuf/descriptor.html#google.protobuf.descriptor.FileDescriptor.services_by_name) class. 

{{< /note >}}

The *shutdown_server* function stops the gRPC server via the *stop* method of the server instance. 

The key takeaways from the source code listing above are:

- An instance of a gRPC server is created using *grpc.aio.server()*.
- A service implementation should be registered with the gRPC server. We register our *PythonDispatcher* class via *coprocess_object_pb2_grpc.add_DispatcherServicer_to_server(PythonDispatcher(), server)*.
- Reflection can be enabled to allow clients to dynamically discover the services available at a gRPC server. We enabled our *Dispatcher* service to be discovered via *reflection.enable_server_reflection(SERVICE_NAMES, server)*. SERVICE_NAMES is a tuple containing the full names of two gRPC services: the *Dispatcher* service obtained by using the DESCRIPTOR field within the *coprocess_object_pb2* module and the other being the standard reflection service.
- The server instance should be started via invoking and awaiting the *start* and *wait_for_termination* methods of the server instance.
- A port may be configured for the server. In this example we configured an insecure port of 50051 on the server instance via the [add_insecure_port function](https://grpc.github.io/grpc/python/grpc.html#grpc.Server.add_insecure_port). It is also possible to add a secure port via the [add_secure_port](https://grpc.github.io/grpc/python/grpc.html#grpc.Server.add_secure_port) method of the server instance, which accepts the port number in addition to an SSL certificate and key to enable TLS encryption.
- The server instance can be stopped via its stop method.

Finally, we will allow our server to terminate upon receipt of SIGTERM and SIGINT signals. To achieve this, append the source code listed below to the *async_server.py* file.

```python
def handle_sigterm(sig, frame) -> None:
    asyncio.create_task(shutdown_server(server))

async def handle_sigint() -> None:
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, loop.stop)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    server = None
    signal.signal(signal.SIGTERM, handle_sigterm)
    try:
        asyncio.get_event_loop().run_until_complete(serve())
    except KeyboardInterrupt:
        pass
```


### Start gRPC Server

Issue the following command to start the gRPC server:

```bash
python3 -m async_server
```

A message should be output on the console, displaying the port number and confirming that the gRPC server has started.


### Test gRPC Server

To test our gRPC server is working, issue test requests to the *Dispatch* and *DispatchEvent* methods, using *grpcurl*.


##### Send Dispatch Request

Use the *grpcurl* command to send a test dispatch request to our gRPC server:

```bash
grpcurl -plaintext -d '{
  "hookType": "Pre",
  "hookName": "MyPreCustomPluginForBasicAuth",
  "request": {
    "headers": {
      "User-Agent": "curl/8.1.2",
      "Host": "tyk-gateway.localhost:8080",
      "Authorization": "Basic ZGV2QHR5ay5pbzpwYXN0cnk=",
      "Accept": "*/*"
    },
    "url": "/basic-authentication-valid/get",
    "returnOverrides": {
      "responseCode": -1
    },
    "method": "GET",
    "requestUri": "/basic-authentication-valid/get",
    "scheme": "https"
  },
  "spec": {
    "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
    "OrgID": "5e9d9544a1dcd60001d0ed20",
    "APIID": "04e911d3012646d97fcdd6c846fafc4b"
  }
}' localhost:50051 coprocess.Dispatcher/Dispatch
```

Inspect the console output of your gRPC server. It should echo the payload that you sent in the request.


##### Send DispatchEvent Request

Use the grpcurl command to send a test event payload to our gRPC server:

```bash
grpcurl -plaintext -d '{"payload": "{\"event\": \"test\"}"}' localhost:50051 coprocess.Dispatcher/DispatchEvent
```

Inspect the console output of your gRPC server. It should display a log similar to that shown below:

```bash
INFO:root:RECEIVED EVENT: {'event': 'test'}
```

The response received from the server should be an empty event reply, similar to that shown below:

```bash
grpcurl -plaintext -d '{"payload": "{\"event\": \"test\"}"}' localhost:50051 coprocess.Dispatcher/DispatchEvent
{}
```

At this point we have tested, independently of Tyk Gateway, that our gRPC Server can handle an example request payload for gRPC plugin execution. In the next section we will create a test environment for testing that Tyk Gateway integrates with our gRPC server for API requests.


## Configure Test Environment

Now that we have implemented and started a gRPC server, Tyk Gateway needs to be configured to integrate with it. To achieve this we will enable the coprocess feature and configure the URL of the gRPC server.

We will also create an API so that we can test that Tyk Gateway integrates with our gRPC server.


### Configure Tyk Gateway

Within the root of the *tyk.conf* file, add the following configuration, replacing host and port with values appropriate for your environment:

```yaml
"coprocess_options": {
  "enable_coprocess":   true,
  "coprocess_grpc_server": "tcp://host:port"
}
```

Alternatively, the following environment variables can be set in your .env file:

```bash
TYK_GW_COPROCESSOPTIONS_ENABLECOPROCESS=true
TYK_GW_COPROCESSOPTIONS_COPROCESSGRPCSERVER=tcp://host:port
```

Replace host and port with values appropriate for your environment.


### Configure API

Before testing our gRPC server we will create and configure an API with 2 plugins:

- **Pre Request**: Named *MyPreRequestPlugin*.
- **Response**: Named *MyResponsePlugin* and configured so that Tyk Gateway dispatches the session state with the request.

Each plugin will be configured to use the *grpc* plugin driver.

Tyk Gateway will forward details of an incoming request to the gRPC server, for each of the configured API plugins.


##### Tyk Classic API

gRPC plugins can be configured within the *custom_middleware* section of the Tyk Classic ApiDefinition, as shown in the listing below:

```yaml
{
  "created_at": "2024-03-231T12:49:52Z",
  "api_model": {},
  "api_definition": {
    ...
    ...
    "custom_middleware": {
      "pre": [
        {
          "disabled": false,
          "name": "MyPreRequestPlugin",
          "path": "",
          "require_session": false,
          "raw_body_only": false
        }
      ],
      "post": [],
      "post_key_auth": [],
      "auth_check": {
        "disabled": false,
        "name": "",
        "path": "",
        "require_session": false,
        "raw_body_only": false
      },
      "response": [
        {
          "disabled": false,
          "name": "MyResponsePlugin",
          "path": "",
          "require_session": true,
          "raw_body_only": false
        }
      ],
      "driver": "grpc",
      "id_extractor": {
        "disabled": false,
        "extract_from": "",
        "extract_with": "",
        "extractor_config": {}
      }
    }
}
```

In the above listing, the plugin driver parameter has been configured with a value of *grpc*. Two plugins are configured within the *custom_middleware* section: a *Pre Request* plugin and a *Response* plugin.

The *Response* plugin is configured with *require_session* enabled, so that Tyk Gateway will send details for the authenticated key / user with the gRPC request. Note, this is not configured for *Pre Request* plugins that are triggered before authentication in the request lifecycle.


##### Tyk OAS API

To quickly get started, a Tyk OAS API schema can be created by importing the infamous [pet store](https://petstore3.swagger.io/api/v3/openapi.json) OAS schema. Then the [findByStatus](https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available) endpoint can be used for testing.

The resulting Tyk OAS API Definition contains the OAS JSON schema with an *x-tyk-api-gateway* section appended, as listed below. gRPC plugins can be configured within the middleware section of the *x-tyk-api-gateway* that is appended at the end of the OAS schema:

```yaml
"x-tyk-api-gateway": {
  "info": {
    "id": "6e2ae9b858734ea37eb772c666517f55",
    "dbId": "65f457804773a600011af41d",
    "orgId": "5e9d9544a1dcd60001d0ed20",
    "name": "Swagger Petstore - OpenAPI 3.0 Custom Authentication",
    "state": {
      "active": true
    }
  },
  "upstream": {
    "url": "https://petstore3.swagger.io/api/v3/"
  },
  "server": {
    "listenPath": {
      "value": "/custom_auth",
      "strip": true
    },
    "authentication": {
      "enabled": true,
      "custom": {
        "enabled": true,
        "header": {
          "enabled": false,
          "name": "Authorization"
        }
      }
    }
  },
  "middleware": {
    "global": {
      "pluginConfig": {
        "driver": "grpc"
      }
    },
    "cors": {
      "enabled": false,
      "maxAge": 24,
      "allowedHeaders": [
        "Accept",
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Authorization"
      ],
      "allowedOrigins": [
        "*"
      ],
      "allowedMethods": [
        "GET",
        "HEAD",
        "POST"
      ]
    },
    "prePlugin": {
      "plugins": [
        {
          "enabled": true,
          "functionName": "MyPreRequestPlugin",
          "path": ""
        }
      ]
    },
    "responsePlugin": {
      "plugins": [
        {
          "enabled": true,
          "functionName": "MyResponsePlugin",
          "path": "",
          "requireSession": true
        }
      ]
    }
  }
}
```

In the above listing, the plugin driver parameter has been set to *grpc*. Two plugins are configured within the middleware section: a *Pre Request* plugin and a *Response* plugin.

The *Response* plugin is configured with *requireSession* enabled, so that Tyk Gateway will send details for the authenticated key / user with the gRPC request. Note, this is not configurable for *Pre Request* plugins that are triggered before authentication in the request lifecycle.

Tyk Gateway will forward details of an incoming request to the gRPC server, for each plugin.


## Test API

We have implemented and configured a gRPC server to integrate with Tyk Gateway. Furthermore, we have created an API that has been configured with two gRPC plugins: a *Pre Request* and *Response* plugin.

When we issue a request to our API and observe the console output of our gRPC server we should see a JSON representation of the request headers etc. echoed in the terminal.

Issue a request for your API in the terminal window. For example:

```bash
curl -L http://.localhost:8080/grpc-http-bin
```

Observe the console output of your gRPC server. Tyk Gateway should have dispatched two requests to your gRPC server; a request for the *Pre Request* plugin and a request for the *Response* plugin.  

The gRPC server we implemented echoes a JSON representation of the request payload dispatched by Tyk Gateway.

Note that this is a useful feature for learning how to develop gRPC plugins and understanding the structure of the request payload dispatched by Tyk Gateway to the gRPC server. However, in production environments care should be taken to avoid inadvertently exposing sensitive data such as secrets in the session. 


## Summary

In this guide, we've delved into the integration of a Python gRPC server with Tyk Gateway.

We have explained how to implement a Python gRPC server and equipped developers with the necessary tools, knowledge and capabilities to effectively utilize Tyk Gateway through gRPC services.

The following essential groundwork has been covered:

- Setting up tools, libraries and service definitions for the integration.
- Developing a basic gRPC server with functionality to echo the request payload, received from Tyk Gateway, in JSON format.
- Configuring Tyk Gateway for seamless communication with our gRPC server.


### gRPC Performance

These are some benchmarks performed on gRPC plugins.

gRPC plugins may use different transports, we've tested TCP and Unix Sockets.

## TCP

{{< img src="/img/diagrams/tcpResponseTime.png" alt="TCP Response Times" >}}

{{< img src="/img/diagrams/tcpHitRate.png" alt="TCP Hit Rate" >}}

## Unix Socket

{{< img src="/img/diagrams/unixResponseTime.png" alt="Unix Socket Response Times" >}}


{{< img src="/img/diagrams/unixHitRate.png" alt="Unix Socket Hit Rate" >}}


### Create a Request Transformation Plugin with Java

This tutorial will guide you through the creation of a gRPC-based Java plugin for Tyk.
Our plugin will inject a header into the request before it gets proxied upstream. For additional information about gRPC, check the official documentation [here](https://grpc.io/docs/guides/index.html).

The sample code that we'll use implements a request transformation plugin using Java and uses the proper gRPC bindings generated from our Protocol Buffers definition files.

## Requirements

- Tyk Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here][1] for more installation options.
- The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli][2].
- In Tyk 2.8 the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
- Gradle Build Tool: https://gradle.org/install/.
- gRPC tools: https://grpc.io/docs/quickstart/csharp.html#generate-grpc-code
- Java JDK 7 or higher.

## Create the Plugin

### Setting up the Java Project

We will use the Gradle build tool to generate the initial files for our project:

```bash
cd ~
mkdir tyk-plugin
cd tyk-plugin
gradle init
```

We now have a `tyk-plugin` directory containing the basic skeleton of our application.

Add the following to `build.gradle`

```{.copyWrapper}
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath 'com.google.protobuf:protobuf-gradle-plugin:0.8.1'
  }
}

plugins {
  id "com.google.protobuf" version "0.8.1"
  id "java"
  id "application"
  id "idea"
}

protobuf {
  protoc {
    artifact = "com.google.protobuf:protoc:3.3.0"
  }
  plugins {
    grpc {
      artifact = 'io.grpc:protoc-gen-grpc-java:1.5.0'
    }
  }
  generateProtoTasks {
    all()*.plugins {
      grpc {}
    }
  }
  generatedFilesBaseDir = "$projectDir/src/generated"
}

sourceCompatibility = 1.8
targetCompatibility = 1.8

mainClassName = "com.testorg.testplugin.PluginServer"

repositories {
  mavenCentral()
}

dependencies {
  compile 'io.grpc:grpc-all:1.5.0'
}

idea {
  module {
    sourceDirs += file("${projectDir}/src/generated/main/java");
    sourceDirs += file("${projectDir}/src/generated/main/grpc");
  }
}
```

### Create the Directory for the Server Class

```bash
cd ~/tyk-plugin
mkdir -p src/main/java/com/testorg/testplugin
```

### Install the gRPC Tools

We need to download the Tyk Protocol Buffers definition files, these files contains the data structures used by Tyk. See [Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) for more information:

```bash
cd ~/tyk-plugin
git clone https://github.com/TykTechnologies/tyk
mv tyk/coprocess/proto src/main/proto
```

### Generate the Bindings

To generate the Protocol Buffers bindings we use the Gradle build task:

```bash
gradle build
```

If you need to customize any setting related to the bindings generation step, check the `build.gradle` file.

### Implement Server

We need to implement two classes: one class will contain the request dispatcher logic and the actual middleware implementation. The other one will implement the gRPC server using our own dispatcher.

From the `~/tyk-plugin/src/main/java/com/testorg/testplugin` directory, create a file named `PluginDispatcher.java` with the following code:

```java
package com.testorg.testplugin;

import coprocess.DispatcherGrpc;
import coprocess.CoprocessObject;

public class PluginDispatcher extends DispatcherGrpc.DispatcherImplBase {

  @Override
  public void dispatch(CoprocessObject.Object request,
        io.grpc.stub.StreamObserver<CoprocessObject.Object> responseObserver) {
    CoprocessObject.Object modifiedRequest = null;

    switch (request.getHookName()) {
      case "MyPreMiddleware":
        modifiedRequest = MyPreHook(request);
      default:
      // Do nothing, the hook name isn't implemented!
    }

    // Return the modified request (if the transformation was done):
    if (modifiedRequest != null) {
      responseObserver.onNext(modifiedRequest);
    };

    responseObserver.onCompleted();
  }

  CoprocessObject.Object MyPreHook(CoprocessObject.Object request) {
    CoprocessObject.Object.Builder builder = request.toBuilder();
    builder.getRequestBuilder().putSetHeaders("customheader", "customvalue");
    return builder.build();
  }
}
```

In the same directory, create a file named `PluginServer.java` with the following code. This is the server implementation:

```java
package com.testorg.testplugin;

import coprocess.DispatcherGrpc;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PluginServer {

  private static final Logger logger = Logger.getLogger(PluginServer.class.getName());
  static Server server;
  static int port = 5555;

  public static void main(String[] args) throws IOException, InterruptedException {
    System.out.println("Initializing gRPC server.");

    // Our dispatcher is instantiated and attached to the server:
    server = ServerBuilder.forPort(port)
            .addService(new PluginDispatcher())
            .build()
            .start();

    blockUntilShutdown();

  }

  static void blockUntilShutdown() throws InterruptedException {
      if (server != null) {
          server.awaitTermination();
      }
  }
}
```

To run the gRPC server we can use the following command:

```bash
cd ~/tyk-plugin
gradle runServer
```

The gRPC server will listen on port 5555 (as defined in `Server.java`). In the next steps we'll setup the plugin bundle and modify Tyk to connect to our gRPC server.


## Bundle the Plugin

We need to create a manifest file within the `tyk-plugin` directory. This file contains information about our plugin and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to contain the following:

```json
{
  "custom_middleware": {
    "driver": "grpc",
    "pre": [{
        "name": "MyPreMiddleware"
    }]
  }
}
```

- The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `pre` hook for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).
- The `name` field references the name of the function that we implemented in our plugin code - `MyPreMiddleware`. This will be handled by our dispatcher gRPC method in `PluginServer.java`.

To bundle our plugin run the following command in the `tyk-plugin` directory. Check your tyk-cli install path first:

```bash
/opt/tyk-gateway/utils/tyk-cli bundle build -y
```

For Tyk 2.8 use:
```bash
/opt/tyk-gateway/bin/tyk bundle build -y
```

A plugin bundle is a packaged version of the plugin. It may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. 

For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

You should now have a `bundle.zip` file in the `tyk-plugin` directory.

## Publish the Plugin

To publish the plugin, copy or upload `bundle.zip` to a local web server like Nginx, or Apache or storage like Amazon S3. For this tutorial we'll assume you have a web server listening on `localhost` and accessible through `http://localhost`.

{{< include "grpc-include" >}}


## <a name="next"></a>What's Next?

In this tutorial we learned how Tyk gRPC plugins work. For a production-level setup we suggest the following:

- Configure an appropriate web server and path to serve your plugin bundles.

[1]: https://tyk.io/docs/get-started/with-tyk-on-premise/installation/
[2]: https://github.com/TykTechnologies/tyk-cli
[3]: /img/dashboard/system-management/api_settings.png
[4]: /img/dashboard/system-management/plugin_options.png


### Create Custom Authentication Plugin with .NET

This tutorial will guide you through the creation of a custom authentication plugin for Tyk with a gRPC based plugin with .NET and C#. For additional information check the official gRPC [documentation](https://grpc.io/docs/guides/index.html).

The sample code that we’ll use implements a very simple authentication layer using .NET and the proper gRPC bindings generated from our Protocol Buffers definition files.

{{< img src="/img/diagrams/diagram_docs_gRPC-plugins_why-use-it-for-plugins@2x.png" alt="Using gRPC for plugins" >}}

## Requirements

- Tyk Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here][1] for more installation options.
- The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli][2]
- In Tyk 2.8 the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
- .NET Core for your OS: https://www.microsoft.com/net/core
- gRPC tools: https://grpc.io/docs/quickstart/csharp.html#generate-grpc-code

## Create the Plugin

### Create .NET Project

We use the .NET CLI tool to generate the initial files for our project:

```bash
cd ~
dotnet new console -o tyk-plugin
```

We now have a `tyk-plugin` directory containing the basic skeleton of a .NET application.

From the `tyk-plugin` directory we need to install a few packages that the gRPC server requires:

```bash
dotnet add package Grpc --version 1.6.0
dotnet add package System.Threading.ThreadPool --version 4.3.0
dotnet add package Google.Protobuf --version 3.4.0
```

- The `Grpc` package provides base code for our server implementation.
- The `ThreadPool` package is used by `Grpc`.
- The `Protobuf` package will be used by our gRPC bindings.

### Install the gRPC Tools

We need to install the gRPC tools to generate the bindings. We recommended you follow the official guide here: https://grpc.io/docs/quickstart/csharp.html#generate-grpc-code.

Run the following Commands (both MacOS and Linux):

```bash
cd ~/tyk-plugin
temp_dir=packages/Grpc.Tools.1.6.x/tmp
curl_url=https://www.nuget.org/api/v2/package/Grpc.Tools/
mkdir -p $temp_dir && cd $temp_dir && curl -sL $curl_url > tmp.zip; unzip tmp.zip && cd .. && cp -r tmp/tools . && rm -rf tmp && cd ../..
chmod -Rf +x packages/Grpc.Tools.1.6.x/tools/
```

Then run the following, depending on your OS:

**MacOS (x64)**

```bash
export GRPC_TOOLS=packages/Grpc.Tools.1.6.x/tools/macosx_x64
```

**Linux (x64)**

```bash
export GRPC_TOOLS=packages/Grpc.Tools.1.6.x/tools/linux_x64
```

The `GRPC_TOOLS` environment variable will point to the appropriate GrpcTools path that matches our operating system and architecture. The last step is to export a variable for the `protoc` program; this is the main program used to generate bindings:

```bash
export GRPC_PROTOC=$GRPC_TOOLS/protoc
```

Now that we can safely run `protoc`, we can download the Tyk Protocol Buffers definition files. These files contain the data structures used by Tyk. See [Data Structures]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}}) for more information:

```bash
cd ~/tyk-plugin
git clone https://github.com/TykTechnologies/tyk
```

### Generate the bindings

To generate the bindings, we create an empty directory and run the `protoc` tool using the environment variable that was set before:

```bash
mkdir Coprocess
$GRPC_PROTOC -I=tyk/coprocess/proto --csharp_out=Coprocess --grpc_out=Coprocess --plugin=protoc-gen-grpc=$GRPC_TOOLS/grpc_csharp_plugin tyk/coprocess/proto/*.proto
```

Run the following command to check the binding directory:

```bash
ls Coprocess
```

The output will look like this:

```
CoprocessCommon.cs      CoprocessObject.cs      CoprocessReturnOverrides.cs
CoprocessMiniRequestObject.cs   CoprocessObjectGrpc.cs              CoprocessSessionState.cs
```

### Implement Server

Create a file called `Server.cs`.

Add the following code to `Server.cs`.

```c#
using System;
using System.Threading.Tasks;
using Grpc.Core;

using Coprocess;

class DispatcherImpl : Dispatcher.DispatcherBase
{
  public DispatcherImpl()
  {
    Console.WriteLine("Instantiating DispatcherImpl");
  }


  // The Dispatch method will be called by Tyk for every configured hook, we'll implement a very simple dispatcher here:
  public override Task<Coprocess.Object> Dispatch(Coprocess.Object thisObject, ServerCallContext context)
  {
    // thisObject is the request object:
    Console.WriteLine("Receiving object: " + thisObject.ToString());

    // hook contains the hook name, this will be defined in our plugin bundle and the implementation will be a method in this class (DispatcherImpl), we'll look it up:
    var hook = this.GetType().GetMethod(thisObject.HookName);

    // If hook is null then a handler method for this hook isn't implemented, we'll log this anyway:
    if (hook == null)
    {
      Console.WriteLine("Hook name: " + thisObject.HookName + " (not implemented!)");
      // We return the unmodified request object, so that Tyk can proxy this in the normal way.
      return Task.FromResult(thisObject);
    };

    // If there's a handler method, let's log it and proceed with our dispatch work:
    Console.WriteLine("Hook name: " + thisObject.HookName + " (implemented)");

    // This will dynamically invoke our hook method, and cast the returned object to the required Protocol Buffers data structure:
    var output = hook.Invoke(this, new object[] { thisObject, context });
    return (Task<Coprocess.Object>)output;
  }

  // MyPreMiddleware implements a PRE hook, it will be called before the request is proxied upstream and before the authentication step:
  public Task<Coprocess.Object> MyPreMiddleware(Coprocess.Object thisObject, ServerCallContext context)
  {
    Console.WriteLine("Calling MyPreMiddleware.");
    // We'll inject a header in this request:
    thisObject.Request.SetHeaders["my-header"] = "my-value";
    return Task.FromResult(thisObject);
  }

  // MyAuthCheck implements a custom authentication mechanism, it will initialize a session object if the token matches a certain value:
  public Task<Coprocess.Object> MyAuthCheck(Coprocess.Object thisObject, ServerCallContext context)
  {
    // Request.Headers contains all the request headers, we retrieve the authorization token:
    var token = thisObject.Request.Headers["Authorization"];
    Console.WriteLine("Calling MyAuthCheck with token = " + token);

    // We initialize a session object if the token matches "abc123":
    if (token == "abc123")
    {
      Console.WriteLine("Successful auth!");
      var session = new Coprocess.SessionState();
      session.Rate = 1000;
      session.Per = 10;
      session.QuotaMax = 60;
      session.QuotaRenews = 1479033599;
      session.QuotaRemaining = 0;
      session.QuotaRenewalRate = 120;
      session.Expires = 1479033599;

      session.LastUpdated = 1478033599.ToString();

      thisObject.Metadata["token"] = token;
      thisObject.Session = session;
      return Task.FromResult(thisObject);

    }

    // If the token isn't "abc123", we return the request object in the original state, without a session object, Tyk will reject this request:
    Console.WriteLine("Rejecting auth!");
    return Task.FromResult(thisObject);
  }
}
```

Create a file called `Program.cs` to instantiate our dispatcher implementation and start a gRPC server.

Add the following code to `Program.cs`. 

```bash
using System;
using Grpc.Core;

namespace tyk_plugin
{
  class Program
  {

    // Port to attach the gRPC server to:
    const int Port = 5555;

    static void Main(string[] args)
    {
      // We initialize a  Grpc.Core.Server and attach our dispatcher implementation to it:
      Server server = new Server
      {
          Services = { Coprocess.Dispatcher.BindService(new DispatcherImpl()) },
          Ports = { new ServerPort("localhost", Port, ServerCredentials.Insecure) }
      };
      server.Start();

      Console.WriteLine("gRPC server listening on " + Port);
      Console.WriteLine("Press any key to stop the server...");
      Console.ReadKey();

      server.ShutdownAsync().Wait();

    }
  }
}
```

To run the gRPC server use the following command from the plugin directory:

```bash
dotnet run
```

The gRPC server will listen on port 5555 (as defined in `Program.cs`). In the next steps we'll setup the plugin bundle and modify Tyk to connect to our gRPC server.

## Bundle the Plugin

We need to create a manifest file within the `tyk-plugin` directory. This file contains information about our plugin and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to contain the following:

```json
{
  "custom_middleware": {
    "driver": "grpc",
    "auth_check": {
      "name": "MyAuthMiddleware",
      "path": "",
      "raw_body_only": false,
      "require_session": false
    }
  }
}
```

- The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `auth_check` hook for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).
- The `name` field references the name of the function that we implement in our plugin code - `MyAuthMiddleware`. This will be handled by our dispatcher gRPC method (implemented in `Server.cs`).
- The `path` field is the path to the middleware component.
- The `raw_body_only` field 
- The `require_session` field, if set to `true` gives you access to the session object. It will be supplied as a session variable to your middleware processor function


To bundle our plugin run the following command in the `tyk-plugin` directory. Check your tyk-cli install path first:

```bash
/opt/tyk-gateway/utils/tyk-cli bundle build -y
```

From Tyk v2.8 upwards you can use:
```bash
/opt/tyk-gateway/bin/tyk bundle build -y
```

A plugin bundle is a packaged version of the plugin. It may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. 

For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

You should now have a `bundle.zip` file in the `tyk-plugin` directory.

## Publish the Plugin

To publish the plugin, copy or upload `bundle.zip` to a local web server like Nginx, or Apache or storage like Amazon S3. For this tutorial we'll assume you have a web server listening on `localhost` and accessible through `http://localhost`.

{{< include "grpc-include" >}}

## What's Next?

In this tutorial we learned how Tyk gRPC plugins work. For a production-level setup we suggest the following:

- Configure an appropriate web server and path to serve your plugin bundles.
- See the following [GitHub repo](https://github.com/TykTechnologies/tyk-plugin-demo-dotnet) for a gRPC based .NET plugin that incorporates authentication based on Microsoft SQL Server. 











[1]: https://tyk.io/docs/get-started/with-tyk-on-premise/installation/
[2]: https://github.com/TykTechnologies/tyk-cli
[3]: /img/dashboard/system-management/plugin_options.png
[4]: /img/dashboard/system-management/plugin_auth_mode.png


### Create Custom Authentication Plugin with NodeJS

This tutorial will guide you through the creation of a custom authentication plugin for Tyk with a gRPC based plugin written in NodeJS. For additional information about gRPC, check the official documentation [here](https://grpc.io/docs/guides/index.html).

The sample code that we'll use implements a very simple authentication layer using NodeJS and the proper gRPC bindings generated from our Protocol Buffers definition files.

{{< img src="/img/dashboard/system-management/custom_grpc_authentication.png" alt="gRPC Auth Diagram" >}}

## Requirements

- Tyk Gateway: This can be installed using standard package management tools like Yum or APT, or from source code. See [here](https://tyk.io/docs/get-started/with-tyk-on-premise/installation/) for more installation options.
- The Tyk CLI utility, which is bundled with our RPM and DEB packages, and can be installed separately from [https://github.com/TykTechnologies/tyk-cli](https://github.com/TykTechnologies/tyk-cli)
- In Tyk 2.8 and upwards the Tyk CLI is part of the gateway binary, you can find more information by running "tyk help bundle".
- NodeJS v6.x.x [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 

## Create the Plugin

### Create NodeJS Project

We will use the NPM tool to initialize our project, follow the steps provided by the `init` command:

```bash
cd ~
mkdir tyk-plugin
cd tyk-plugin
npm init
```

Now we'll add the gRPC package for this project:

```bash
npm install --save grpc
```

### Install gRPC Tools

Typically to use gRPC and Protocol Buffers you need to use a code generator and generate bindings for the target language that you're using. For this tutorial we'll skip this step and use the dynamic loader that's provided by the NodeJS gRPC library. This mechanism allows a program to load Protocol Buffers definitions directly from `.proto` files. See [this section](https://grpc.io/docs/tutorials/basic/node.html#loading-service-descriptors-from-proto-files) in the gRPC documentation for more details.

To fetch the required `.proto` files, you may use an official repository where we keep the Tyk Protocol Buffers definition files:

```bash
cd ~/tyk-plugin
git clone https://github.com/TykTechnologies/tyk
```

### Implement Server

Now we're ready to implement our gRPC server, create a file called `main.js` in the project's directory

Add the following code to `main.js`.

```nodejs
const grpc = require('grpc'),
  resolve = require('path').resolve

const tyk = grpc.load({
  file: 'coprocess_object.proto',
  root: resolve(__dirname, 'tyk/coprocess/proto')
}).coprocess

const listenAddr = '127.0.0.1:5555',
    authHeader = 'Authorization'
    validToken = '71f6ac3385ce284152a64208521c592b'

// The dispatch function is called for every hook:
const dispatch = (call, callback) => {
  var obj = call.request
  // We dispatch the request based on the hook name, we pass obj.request which is the coprocess.Object:
  switch (obj.hook_name) {
    case 'MyPreMiddleware':
      preMiddleware(obj, callback)
      break
    case 'MyAuthMiddleware':
      authMiddleware(obj, callback)
      break
    default:
      callback(null, obj)
      break
  }
}

const preMiddleware = (obj, callback) => {
  var req = obj.request

  // req is the coprocess.MiniRequestObject, we inject a header using the "set_headers" field:
  req.set_headers = {
    'mycustomheader': 'mycustomvalue'
  }

  // Use this callback to finish the operation, sending back the modified object:
  callback(null, obj)
}

const authMiddleware = (obj, callback) => {
  var req = obj.request

  // We take the value from the "Authorization" header:
  var token = req.headers[authHeader]

  // The token should be attached to the object metadata, this is used internally for key management:
  obj.metadata = {
    token: token
  }

  // If the request token doesn't match the  "validToken" constant we return the call:
  if (token != validToken) {
    callback(null, obj)
    return
  }

  // At this point the token is valid and a session state object is initialized and attached to the coprocess.Object:
  var session = new tyk.SessionState()
  session.id_extractor_deadline = Date.now() + 100000000000
  obj.session = session
  callback(null, obj)
}

main = function() {
  server = new grpc.Server()
  server.addService(tyk.Dispatcher.service, {
      dispatch: dispatch
  })
  server.bind(listenAddr, grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
```


To run the gRPC server run:

```bash
node main.js
```

The gRPC server will listen on port `5555` (see the `listenAddr` constant). In the next steps we'll setup the plugin bundle and modify Tyk to connect to our gRPC server.


## Bundle the Plugin

We need to create a manifest file within the `tyk-plugin` directory. This file contains information about our plugin and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to contain the following:

```json
{
  "custom_middleware": {
    "driver": "grpc",
    "auth_check": {
      "name": "MyAuthMiddleware",
      "path": "",
      "raw_body_only": false,
      "require_session": false
    }
  }
}
```

- The `custom_middleware` block contains the middleware settings like the plugin driver we want to use (`driver`) and the hooks that our plugin will expose. We use the `auth_check` hook for this tutorial. For other hooks see [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).
- The `name` field references the name of the function that we implement in our plugin code - `MyAuthMiddleware`. The implemented dispatcher uses a switch statement to handle this hook, and calls the `authMiddleware` function in `main.js`.
- The `path` field is the path to the middleware component.
- The `raw_body_only` field 
- The `require_session` field, if set to `true` gives you access to the session object. It will be supplied as a session variable to your middleware processor function

To bundle our plugin run the following command in the `tyk-plugin` directory. Check your tyk-cli install path first:

```bash
/opt/tyk-gateway/utils/tyk-cli bundle build -y
```

For Tyk 2.8 use:
```bash
/opt/tyk-gateway/bin/tyk bundle build -y
```

A plugin bundle is a packaged version of the plugin. It may also contain a cryptographic signature of its contents. The `-y` flag tells the Tyk CLI tool to skip the signing process in order to simplify the flow of this tutorial. 

For more information on the Tyk CLI tool, see [here]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}).

You should now have a `bundle.zip` file in the `tyk-plugin` directory.

## Publish the Plugin

To publish the plugin, copy or upload `bundle.zip` to a local web server like Nginx, Apache or storage like Amazon S3. For this tutorial we'll assume you have a web server listening on `localhost` and accessible through `http://localhost`.

{{< include "grpc-include" >}}


## What's Next?

In this tutorial we learned how Tyk gRPC plugins work. For a production-level setup we suggest the following:

- Configure an appropriate web server and path to serve your plugin bundles.











[1]: https://tyk.io/docs/get-started/with-tyk-on-premise/installation/
[2]: https://github.com/TykTechnologies/tyk-cli
[3]: /img/dashboard/system-management/plugin_options.png
[4]: /img/dashboard/system-management/plugin_auth_mode.png



### "Create Custom Authentication Plugin With Python"

In the realm of API security, HMAC-signed authentication serves as a foundational concept. In this developer-focused blog post, we'll use HMAC-signed authentication as the basis for learning how to write gRPC custom authentication plugins with Tyk Gateway. Why learn how to write Custom Authentication Plugins?

- **Foundational knowledge**: Writing custom authentication plugins provides foundational knowledge of Tyk's extensibility and customization capabilities.
- **Practical experience**: Gain hands-on experience in implementing custom authentication logic tailored to specific use cases, starting with HMAC-signed authentication.
- **Enhanced control**: Exercise greater control over authentication flows and response handling, empowering developers to implement advanced authentication mechanisms beyond built-in features.

While Tyk Gateway offers built-in support for HMAC-signed authentication, this tutorial serves as a practical guide for developers looking to extend Tyk's capabilities through custom authentication plugins. It extends the gRPC server that we developed in our [getting started guide]({{< ref "getting-started-python" >}}).

We will develop a basic gRPC server that implements the Tyk Dispatcher service with a custom authentication plugin to handle authentication keys, signed using the HMAC SHA512 algorithm. Subsequently, you will be able to make a request to your API with a HMAC signed authentication key in the *Authorization* header. Tyk Gateway will intercept the request and forward it to your Python gRPC server for HMAC signature and token verification.

Our plugin will only verify the key against an expected value. In a production environment it will be necessary to verify the key against Redis storage.

Before we continue ensure that you have:

- Read and completed our getting started guide that explains how to implement a basic Python gRPC server to echo the request payload received from Tyk Gateway. This tutorial extends the source code of the tyk_async_server.py file to implement a custom authentication plugin for a HMAC signed authentication key.
- Read our HMAC signatures documentation for an explanation of HMAC signed authentication  with Tyk Gateway. A brief summary is given in the HMAC Signed Authentication section below. 


## HMAC Signed Authentication

Before diving in further, we will give a brief overview of HMAC signed authentication using our custom authentication plugin.

- **Client request**: The journey begins with a client requesting access to a protected resource on the Tyk API.
- **HMAC signing**: Before dispatching the request, the client computes an HMAC signature using a secret key and request date, ensuring the payload's integrity.
- **Authorization header**: The HMAC signature, along with essential metadata such as the API key and HMAC algorithm, is embedded within the Authorization header.
- **Tyk Gateway verification**: Upon receipt, Tyk Gateway forwards the request to our gRPC server to execute the custom authentication plugin. This will validate the HMAC signature, ensuring the request's authenticity before proceeding with further processing.

Requests should be made to an API that uses our custom authentication plugin as follows. A HMAC signed key should be included in the *Authorization* header and a date/time string in the *Date* header. An example request is shown in the curl command below:

```bash
curl -v -H 'Date: Fri, 03 May 2024 12:00:42 GMT' \
-H 'Authorization: Signature keyId="eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==", \
algorithm="hmac-sha512",signature="9kwBK%2FyrjbSHJDI7INAhBmhHLTHRDkIe2uRWHEP8bgQFQvfXRksm6t2MHeLUyk9oosWDZyC17AbGeP8EFqrp%2BA%3D%3D"' \
http://localhost:8080/grpc-custom-auth/get
```

From the above example, it should be noted that:

- The *Date* header contains a date string formatted as follows: *Fri, 03 May 2024 11:06:00 GMT*.
- The *Authorization* header is formatted as *Signature keyId=”<keyId>”, algorithm=”<hmac-algorithm>”, signature=”<hmac signature>”* where:

    - **keyId** is a Tyk authentication key.
    - **algorithm** is the HMAC algorithm used to sign the signature, *hmac-sha512* or *hmac-sha256*. 
    - **signature** is the HAMC signature calculated with the date string from the *Date* header, signed with a base64 encoded secret value, using the specified HMAC algorithm. The HMAC signature is then encoded as base64.

## Prerequisites

Firstly, we need to create the following:

- An API configured to use a custom authentication plugin.
- A HMAC enabled key with a configured secret for signing.

This will enable us to issue a request to test that Tyk Gateway integrates with our custom authentication plugin on the gRPC server.

#### Create API

We will create an API served by Tyk Gateway, that will forward requests upstream to https://httpbin.org/. 

The API will have the following parameters configured:

- **Listen path**: Tyk Gateway will listen to API requests on */grpc-custom-auth/* and will strip the listen path for upstream requests.
- **Target URL**: The target URL will be configured to send requests to *http://httpbin/*.
- **Authentication Mode**: The authentication mode will be configured for custom authentication. This is used to trigger CoProcess (gRPC), Python or JSVM plugins to handle custom authentication.

You can use the following Tyk Classic API definition to get you started, replacing the *org_id* with the ID of your organization.

```json
{
    "api_definition": {
        "id": "662facb2f03e750001a03500",
        "api_id": "6c56dd4d3ad942a94474df6097df67ed",
        "org_id": "5e9d9544a1dcd60001d0ed20",
        "name": "Python gRPC Custom Auth",
        "enable_coprocess_auth": true,
        "auth": {
            "auth_header_name": "Authorization"
        },
        "proxy": {
            "preserve_host_header": false,
            "listen_path": "/grpc-custom-auth/",
            "disable_strip_slash": true,
            "strip_listen_path": true,
            "target_url": "http://httpbin/"
        },
        "version_data": {
            "not_versioned": false,
            "versions": {
                "Default": {
                    "name": "Default",
                    "expires": "",
                    "use_extended_paths": true,
                    "extended_paths": {
                        "ignored": [],
                        "white_list": [],
                        "black_list": []
                    }
                }
            },
            "default_version": "Default"
        },
        "active": true
    }
}
```

The Tyk API definition above can be imported via Tyk Dashboard. Alternatively, if using Tyk Gateway OSS, a POST request can be made to the *api/apis* endpoint of Tyk Gateway. Consult the [Tyk Gateway Open API Specification documentation]({{< ref "tyk-gateway-api" >}}) for usage.

An illustrative example using *curl* is given below. Please note that you will need to:

- Update the location to use the protocol scheme, host and port suitable for your environment.
- Replace the value in the *x-tyk-authorization* header with the secret value in your *tyk.conf* file.
- Replace the *org_id* with the ID of your organization.

```bash
curl -v \
	--header 'Content-Type: application/json' \
  	--header 'x-tyk-authorization: your Gateway admin secret' \
	--location http://localhost:8080/tyk/apis/ \
	--data '{\
		"api_definition": {\
			"id": "662facb2f03e750001a03502",\
			"api_id": "6c56dd4d3ad942a94474df6097df67ef",\
			"org_id": "5e9d9544a1dcd60001d0ed20",\
			"name": "Python gRPC Custom Auth",\
			"enable_coprocess_auth": true,\
			"auth": {\
				"auth_header_name": "Authorization"\
			},\
			"proxy": {\
				"preserve_host_header": false,\
				"listen_path": "/grpc-custom-auth-error/",\
				"disable_strip_slash": true,\
				"strip_listen_path": true,\
				"target_url": "http://httpbin/"\
			},\
			"version_data": {\
				"not_versioned": false,\
				"versions": {\
					"Default": {\
						"name": "Default",\
						"expires": "",\
						"use_extended_paths": true,\
						"extended_paths": {\
							"ignored": [],\
							"white_list": [],\
							"black_list": []\
						}\
					}\
				},\
				"default_version": "Default"\
			},\
			"active": true\
		}\
	}'
```

A response similar to that given below will be returned by Tyk Gateway:

```bash
{
    "key": "f97b748fde734b099001ca15f0346dfe",
    "status": "ok",
    "action": "added"
}
```

#### Create HMAC Key

We will create an key configured to use HMAC signing, with a secret of *secret*. The key will configured to have access to our test API.

You can use the following configuration below, replacing the value of the *org_id* with the ID of your organization.

```bash
{
    "quota_max": 1000,
    "quota_renews": 1596929526,
    "quota_remaining": 1000,
    "quota_reset": 1596843126,
    "quota_used": 0,
    "org_id": "5e9d9544a1dcd60001d0ed20",
    "access_rights": {
        "662facb2f03e750001a03500": {
            "api_id": "662facb2f03e750001a03500",
            "api_name": "Python gRPC Custom Auth",
            "versions": ["Default"],
            "allowed_urls": [],
            "limit": null,
            "quota_max": 1000,
            "quota_renews": 1596929526,
            "quota_remaining": 1000,
            "quota_reset": 1596843126,
            "quota_used": 0,
            "per": 1,
            "expires": -1
        }
    },
    "enable_detailed_recording": true,
    "hmac_enabled": true,
    "hmac_string": "secret",
    "meta_data": {}
}
```

You can use Tyk Gateway’s API to create the key by issuing a POST request to the *tyk/keys* endpoint. Consult the [Tyk Gateway Open API Specification documentation]({{< ref "tyk-gateway-api" >}}) for usage.

An illustrative example using *curl* is given below. Please note that you will need to:

- Update the location to use the protocol scheme, host and port suitable for your environment.
- Replace the value in the *x-tyk-authorization* header with the secret value in your *tyk.conf* file.

Replace the *org_id* with the ID of your organization.

```bash
curl --location 'http://localhost:8080/tyk/keys/grpc_hmac_key' \
--header 'x-tyk-authorization: your Gateay admin secret' \
--header 'Content-Type: application/json' \
--data '{\
    "alias": "grpc_hmac_key",\
    "quota_max": 1000,\
    "quota_renews": 1596929526,\
    "quota_remaining": 1000,\
    "quota_reset": 1596843126,\
    "quota_used": 0,\
    "org_id": "5e9d9544a1dcd60001d0ed20",\
    "access_rights": {\
        "662facb2f03e750001a03500": {\
            "api_id": "662facb2f03e750001a03500",\
            "api_name": "python-grpc-custom-auth",\
            "versions": ["Default"],\
            "allowed_urls": [],\
            "limit": null,\
            "quota_max": 1000,\
            "quota_renews": 1596929526,\
            "quota_remaining": 1000,\
            "quota_reset": 1596843126,\
            "quota_used": 0,\
            "per": 1,\
            "expires": -1\
        }\
    },\
    "enable_detailed_recording": true,\
    "hmac_enabled": true,\
    "hmac_string": "secret",\
    "meta_data": {}\
}\
'
```

A response similar to that given below should be returned by Tyk Gateway:

```json
{
    "key": "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==",
    "status": "ok",
    "action": "added",
    "key_hash": "a72fcdc09caa86b5"
}
```

{{< note success>}}

**Note**

Make a note of the key ID given in the response, since we will need this to test our API.
{{< /note >}}

## Implement Plugin

Our custom authentication plugin will perform the following tasks:

- Extract the *Authorization* and *Date* headers from the request object.
- Parse the *Authorization* header to extract the *keyId*, *algorithm* and *signature* attributes.
- Compute the HMAC signature using the specific algorithm and date included in the header.
- Verify that the computed HMAC signature matches the signature included in the *Authorization* header. A 401 error response will be returned if verification fails. Our plugin will only verify the key against an expected value. In a production environment it will be necessary to verify the key against Redis storage.
- Verify that the *keyId* matches an expected value (VALID_TOKEN). A 401 error response will be returned to Tyk Gateway if verification fails.
- If verification of the signature and key passes then update the session with HMAC enabled and set the HMAC secret. Furthermore, add the key to the *Object* metadata.

Return the request *Object* containing the updated session back to Tyk Gateway. When developing custom authentication plugins it is the responsibility of the developer to update the session state with the token, in addition to setting the appropriate response status code and error message when authentication fails.

### Import Python Modules

Ensure that the following Python modules are imported at the top of your *tyk_async_server.py* file:

```python
import asyncio
import base64
import hashlib
import hmac
import json
import re
import signal
import logging
import urllib.parse

import grpc
from google.protobuf.json_format import MessageToJson
from grpc_reflection.v1alpha import reflection
import coprocess_object_pb2_grpc
import coprocess_object_pb2
from coprocess_common_pb2 import HookType
from coprocess_session_state_pb2 import SessionState
```

### Add Constants

Add the following constants to the top of the *tyk_async_server.py* file, after the import statements:

```bash
SECRET = "c2VjcmV0"
VALID_TOKEN = "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ=="
```

- **SECRET** is a base64 representation of the secret used for HMAC signing.
- **VALID_TOKEN** is the key ID that we will authenticate against.

The values listed above are designed to align with the examples provided in the *Prerequisites* section, particularly those related to HMAC key generation. If you've made adjustments to the HMAC secret or you've modified the key alias referred to in the endpoint path (for instance, *grpc_hmac_key*), you'll need to update these constants accordingly.

### Extract headers

Add the following function to your *tyk_async_server.py* file to extract a dictionary of the key value pairs from the *Authorization* header. We will use a regular expression to extract the key value pairs.

```python
def parse_auth_header(auth_header: str) -> dict[str,str]:
    pattern = r'(\w+)\s*=\s*"([^"]+)"'

    matches = re.findall(pattern, auth_header)

    parsed_data = dict(matches)

    return parsed_data
```

### Compute HMAC Signature

Add the following function to your *tyk_async_server.py* to compute the HMAC signature.

```python
def generate_hmac_signature(algorithm: str, date_string: str, secret_key: str) -> str:

    if algorithm == "hmac-sha256":
        hash_algorithm = hashlib.sha256
    elif algorithm == "hmac-sha512":
        hash_algorithm = hashlib.sha512
    else:
        raise ValueError("Unsupported hash algorithm")

    base_string = f"date: {date_string}"

    logging.info(f"generating signature from: {base_string}")
    hmac_signature = hmac.new(secret_key.encode(), base_string.encode(), hash_algorithm)

    return base64.b64encode(hmac_signature.digest()).decode()
```

Our function accepts three parameters:

- **algorithm** is the HMAC algorithm to use for signing. We will use HMAC SHA256 or HMAC SHA512 in our custom authentication plugin
- **date_string** is the date extracted from the date header in the request sent by Tyk Gateway.
- **secret_key** is the value of the secret used for signing.

The function computes and returns the HMAC signature for a string formatted as *date: date_string*, where *date_string* corresponds to the value of the *date_string* parameter. The signature is computed using the secret value given in the *secret_key* parameter and the HMAC algorithm given in the *algorithm* parameter. A *ValueError* is raised if the hash algorithm is unrecognized. 

We use the following Python modules in our implementation:

- hmac Python module to compute the HMAC signature.
- base64 Python module to encode the result.

### Verify HMAC Signature

Add the following function to your *tyk_async_server.py* file to verify the HMAC signature provided by the client:

```python
def verify_hmac_signature(algorithm: str, signature: str, source_string) -> bool:

    expected_signature = generate_hmac_signature(algorithm, source_string, SECRET)
    received_signature = urllib.parse.unquote(signature)

    if expected_signature != received_signature:
        error = f"Signatures did not match\nreceived: {received_signature}\nexpected: {expected_signature}"
        logging.error(error)
    else:
        logging.info("Signatures matched!")

    return expected_signature == received_signature
```

Our function accepts three parameters:

- **algorithm** is the HMAC algorithm to use for signing. We will use hmac-sha256 or hmac-sha512 in our custom authentication plugin.
- **signature** is the signature string extracted from the *Authorization* header.
- **source_string** is the date extracted from the date header in the request sent by Tyk Gateway.
- **secret_key** is the value of the secret used for signing.

The function calls *generate_hmac_signature* to verify the signatures match. It returns true if the computed and client HMAC signatures match, otherwise false is returned.

### Set Error Response

Add the following helper function to *tyk_async_server.py* to allow us to set the response status and error message if authentication fails.

```python
def set_response_error(object: coprocess_object_pb2.Object, code: int, message: str) -> None:
    object.request.return_overrides.response_code = code
    object.request.return_overrides.response_error = message
```

Our function accepts the following three parameters:

- **object** is an instance of the [Object]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#object" >}}) message representing the payload sent by Tyk Gateway to the *Dispatcher* service in our gRPC server. For further details of the payload structure dispatched by Tyk Gateway to a gRPC server please consult our gRPC documentation.
- **code** is the HTTP status code to return in the response.
- **message** is the response message.

The function modifies the *return_overrides* attribute of the request, updating the response status code and error message. The *return_overrides* attribute is an instance of a [ReturnOverrides]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#returnoverrides" >}}) message that can be used to override the response of a given HTTP request. When this attribute is modified the request is terminated and is not sent upstream.

### Authenticate

Add the following to your *tyk_async_server.py* file to implement the main custom authentication function. This parses the headers to extract the signature and date from the request, in addition to verifying the HMAC signature and key:

```python
def authenticate(object: coprocess_object_pb2.Object) -> coprocess_object_pb2.Object:
    keys_to_check = ["keyId", "algorithm", "signature"]

    auth_header = object.request.headers.get("Authorization")
    date_header = object.request.headers.get("Date")

    parse_dict = parse_auth_header(auth_header)

    if not all(key in parse_dict for key in keys_to_check) or not all([auth_header, date_header]):
        set_response_error(object, 400, "Custom middleware: Bad request")
        return object

    try:
        signature_valid = verify_hmac_signature(
            parse_dict["algorithm"],
            parse_dict["signature"],
            date_header
        )
    except ValueError:
        set_response_error(object, 400, "Bad HMAC request, unsupported algorithm")
        return object

    if not signature_valid or parse_dict["keyId"] != VALID_TOKEN:
        set_response_error(object, 401, "Custom middleware: Not authorized")
    else:
        new_session = SessionState()
        new_session.hmac_enabled = True
        new_session.hmac_secret = SECRET

        object.metadata["token"] = VALID_TOKEN
        object.session.CopyFrom(new_session)

    return object
```

The *Object* payload received from the Gateway is updated and returned as a response from the *Dispatcher* service:

- If authentication fails then we set the error message and status code for the response accordingly, using our *set_response_error* function.
- If authentication passes then we update the session attribute in the *Object* payload to indicate that HMAC verification was performed and provide the secret used for signing. We also add the verified key to the meta data of the request payload.

Specifically, our function performs the following tasks:

- Extracts the *Date* and *Authorization* headers from the request and verifies that the *Authorization* header is structured correctly, using our *parse_auth_header* function. We store the extracted *Authorization* header fields in the *parse_dict* dictionary. If the structure is invalid then a 400 bad request response is returned to Tyk Gateway, using our *set_response_error* function.
- We use our *verify_hmac_signature* function to compute and verify the HMAC signature. A 400 bad request error is returned to the Gateway if HMAC signature verification fails, due to an unrecognized HMAC algorithm.
- A 401 unauthorized error response is returned to the Gateway under the following conditions:

    - The client HMAC signature and the computed HMAC signature do not match.
    - The extracted key ID does not match the expected key value in VALID_TOKEN.

- If HMAC signature verification passed and the key included in the *Authorization* header is valid then we update the *SessionState* instance to indicate that HMAC signature verification is enabled, i.e. *hmac_enabled* is set to true.  We also specify the HMAC secret used for signing in the *hmac_secret* field and include the valid token in the metadata dictionary.

### Integrate Plugin

Update the *Dispatch* method of the *PythonDispatcher* class in your *tyk_async_server.py* file so that our authenticate function is called when the a request is made by Tyk Gateway to execute a custom authentication (*HookType.CustomKeyCheck*) plugin.

```python
class PythonDispatcher(coprocess_object_pb2_grpc.DispatcherServicer):
    async def Dispatch(
        self, object: coprocess_object_pb2.Object, context: grpc.aio.ServicerContext
    ) -> coprocess_object_pb2.Object:
        
        logging.info(f"STATE for {object.hook_name}\n{MessageToJson(object)}\n")
        
        if object.hook_type == HookType.Pre:
            logging.info(f"Pre plugin name: {object.hook_name}")
            logging.info(f"Activated Pre Request plugin from API: {object.spec.get('APIID')}")
        
        elif object.hook_type == HookType.CustomKeyCheck:
            logging.info(f"CustomAuth plugin: {object.hook_name}")
            logging.info(f"Activated CustomAuth plugin from API: {object.spec.get('APIID')}")
            
            authenticate(object)

        elif object.hook_type == HookType.PostKeyAuth:
            logging.info(f"PostKeyAuth plugin name: {object.hook_name}")
            logging.info(f"Activated PostKeyAuth plugin from API: {object.spec.get('APIID')}")
        
        elif object.hook_type == HookType.Post:
            logging.info(f"Post plugin name: {object.hook_name}")
            logging.info(f"Activated Post plugin from API: {object.spec.get('APIID')}")
        
        elif object.hook_type == HookType.Response:
            logging.info(f"Response plugin name: {object.hook_name}")
            logging.info(f"Activated Response plugin from API: {object.spec.get('APIID')}")
            logging.info("--------\n")
        
        return object
```

## Test Plugin

Create the following bash script, *hmac.sh*, to issue a test request to an API served by Tyk Gateway. The script computes a HMAC signature and constructs the *Authorization* and *Date* headers for a specified API. The *Authorization* header contains the HMAC signature and key for authentication.

Replace the following constant values with values suitable for your environment:

- **KEY** represents the key ID for the HMAC signed key that you created at the beginning of this guide.
- **HMAC_SECRET** represents the base64 encoded value of the secret for your HMAC key that you created at the beginning of this guide.
- **BASE_URL** represents the base URL, containing the protocol scheme, host and port number that Tyk Gateway listens to for API requests.
- **ENDPOINT** represents the path of your API that uses HMAC signed authentication.

```bash
#!/bin/bash

BASE_URL=http://localhost:8080
ENDPOINT=/grpc-custom-auth/get
HMAC_ALGORITHM=hmac-sha512
HMAC_SECRET=c2VjcmV0
KEY=eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==
REQUEST_URL=${BASE_URL}${ENDPOINT}


function urlencode() {
  echo -n "$1" | perl -MURI::Escape -ne 'print uri_escape($_)' | sed "s/%20/+/g"
}

# Set date in expected format
date="$(LC_ALL=C date -u +"%a, %d %b %Y %H:%M:%S GMT")"

# Generate the signature using hmac algorithm with hmac secret from created Tyk key and
# then base64 encoded
signature=$(echo -n "date: ${date}" | openssl sha512 -binary -hmac "${HMAC_SECRET}" | base64)

# Ensure the signature is base64 encoded
url_encoded_signature=$(echo -n "${signature}" | perl -MURI::Escape -ne 'print uri_escape($_)' | sed "s/%20/+/g")

# Output the date, encoded date, signature and the url encoded signature
echo "request: ${REQUEST_URL}"
echo "date: $date"
echo "signature: $signature"
echo "url_encoded_signature: $url_encoded_signature"

# Make the curl request using headers
printf "\n\n----\n\nMaking request to  http://localhost:8080/grpc-custom-auth/get\n\n"
set -x
curl -v -H "Date: ${date}" \
    -H "Authorization: Signature keyId=\"${KEY}\",algorithm=\"${HMAC_ALGORITHM}\",signature=\"${url_encoded_signature}\"" \
    ${REQUEST_URL}
```

After creating and saving the script, ensure that it is executable by issuing the following command:

```bash
chmod +x hmac.sh
```

Issue a test request by running the script:

```bash
./hmac.sh
```

Observe the output of your gRPC server. You should see the request payload appear in the console output for the server and your custom authentication plugin should have been triggered. An illustrative example is given below:

```bash
2024-05-13 12:53:49 INFO:root:STATE for CustomHMACCheck
2024-05-13 12:53:49 {
2024-05-13 12:53:49   "hookType": "CustomKeyCheck",
2024-05-13 12:53:49   "hookName": "CustomHMACCheck",
2024-05-13 12:53:49   "request": {
2024-05-13 12:53:49     "headers": {
2024-05-13 12:53:49       "User-Agent": "curl/8.1.2",
2024-05-13 12:53:49       "Date": "Mon, 13 May 2024 11:53:49 GMT",
2024-05-13 12:53:49       "Host": "localhost:8080",
2024-05-13 12:53:49       "Authorization": "Signature keyId=\"eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==\",algorithm=\"hmac-sha512\",signature=\"e9OiifnTDgi3PW2EGJWfeQXCuhuhi6bGLiGhUTFpjEfgdKmX%2FQOFrePAQ%2FAoSFGU%2FzpP%2FCabmQi4zQDPdRh%2FZg%3D%3D\"",
2024-05-13 12:53:49       "Accept": "*/*"
2024-05-13 12:53:49     },
2024-05-13 12:53:49     "url": "/grpc-custom-auth/get",
2024-05-13 12:53:49     "returnOverrides": {
2024-05-13 12:53:49       "responseCode": -1
2024-05-13 12:53:49     },
2024-05-13 12:53:49     "method": "GET",
2024-05-13 12:53:49     "requestUri": "/grpc-custom-auth/get",
2024-05-13 12:53:49     "scheme": "http"
2024-05-13 12:53:49   },
2024-05-13 12:53:49   "spec": {
2024-05-13 12:53:49     "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
2024-05-13 12:53:49     "OrgID": "5e9d9544a1dcd60001d0ed20",
2024-05-13 12:53:49     "APIID": "6c56dd4d3ad942a94474df6097df67ed"
2024-05-13 12:53:49   }
2024-05-13 12:53:49 }
2024-05-13 12:53:49 
2024-05-13 12:53:49 INFO:root:CustomAuth plugin: CustomHMACCheck
2024-05-13 12:53:49 INFO:root:Activated CustomAuth plugin from API: 6c56dd4d3ad942a94474df6097df67ed
2024-05-13 12:53:49 INFO:root:generating signature from: date: Mon, 13 May 2024 11:53:49 GMT
2024-05-13 12:53:49 INFO:root:Signatures matched!
2024-05-13 12:53:49 INFO:root:--------
```

Try changing the SECRET and/or KEY constants with invalid values and observe the output of your gRPC server. You should notice that authentication fails. An illustrative example is given below:

```
2024-05-13 12:56:37 INFO:root:STATE for CustomHMACCheck
2024-05-13 12:56:37 {
2024-05-13 12:56:37   "hookType": "CustomKeyCheck",
2024-05-13 12:56:37   "hookName": "CustomHMACCheck",
2024-05-13 12:56:37   "request": {
2024-05-13 12:56:37     "headers": {
2024-05-13 12:56:37       "User-Agent": "curl/8.1.2",
2024-05-13 12:56:37       "Date": "Mon, 13 May 2024 11:56:37 GMT",
2024-05-13 12:56:37       "Host": "localhost:8080",
2024-05-13 12:56:37       "Authorization": "Signature keyId=\"eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==\",algorithm=\"hmac-sha512\",signature=\"KXhkWOS01nbxuFfK7wEBggkydXlKJswxbukiplboJ2n%2BU6JiYOil%2Bx4OE4edWipg4EcG9T49nvY%2Fc9G0XFJcfg%3D%3D\"",
2024-05-13 12:56:37       "Accept": "*/*"
2024-05-13 12:56:37     },
2024-05-13 12:56:37     "url": "/grpc-custom-auth/get",
2024-05-13 12:56:37     "returnOverrides": {
2024-05-13 12:56:37       "responseCode": -1
2024-05-13 12:56:37     },
2024-05-13 12:56:37     "method": "GET",
2024-05-13 12:56:37     "requestUri": "/grpc-custom-auth/get",
2024-05-13 12:56:37     "scheme": "http"
2024-05-13 12:56:37   },
2024-05-13 12:56:37   "spec": {
2024-05-13 12:56:37     "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
2024-05-13 12:56:37     "OrgID": "5e9d9544a1dcd60001d0ed20",
2024-05-13 12:56:37     "APIID": "6c56dd4d3ad942a94474df6097df67ed"
2024-05-13 12:56:37   }
2024-05-13 12:56:37 }
2024-05-13 12:56:37 
2024-05-13 12:56:37 INFO:root:CustomAuth plugin: CustomHMACCheck
2024-05-13 12:56:37 INFO:root:Activated CustomAuth plugin from API: 6c56dd4d3ad942a94474df6097df67ed
2024-05-13 12:56:37 INFO:root:generating signature from: date: Mon, 13 May 2024 11:56:37 GMT
2024-05-13 12:56:37 ERROR:root:Signatures did not match
2024-05-13 12:56:37 received: KXhkWOS01nbxuFfK7wEBggkydXlKJswxbukiplboJ2n+U6JiYOil+x4OE4edWipg4EcG9T49nvY/c9G0XFJcfg==
2024-05-13 12:56:37 expected: zT17C2tgDCYBJCgFFN/mknf6XydPaV98a5gMPNUHYxZyYwYedIPIhyDRQsMF9GTVFe8khCB1FhfyhpmzrUR2Lw==
```

## Summary

In this guide, we've explained how to write a Python gRPC custom authentication plugin for Tyk Gateway, using HMAC-signed authentication as a practical example. Through clear instructions and code examples, we've provided developers with insights into the process of creating custom authentication logic tailored to their specific API authentication needs.

While Tyk Gateway already supports HMAC-signed authentication out of the box, this guide goes beyond basic implementation by demonstrating how to extend its capabilities through custom plugins. By focusing on HMAC-signed authentication, developers have gained valuable experience in crafting custom authentication mechanisms that can be adapted and expanded to meet diverse authentication requirements.

It's important to note that the authentication mechanism implemented in this guide solely verifies the HMAC signature's validity and does not include access control checks against specific API resources. Developers should enhance this implementation by integrating access control logic to ensure authenticated requests have appropriate access permissions.

By mastering the techniques outlined in this guide, developers are better equipped to address complex authentication challenges and build robust API security architectures using Tyk Gateway's extensibility features. This guide serves as a foundation for further exploration and experimentation with custom authentication plugins, empowering developers to innovate and customize API authentication solutions according to their unique requirements.

---

</br>

### LuaJIT

### Requirements

Tyk uses [LuaJIT](http://luajit.org/). The main requirement is the LuaJIT shared library, you may find this as `libluajit-x` in most distros.

For Ubuntu 14.04 you may use:

`$ apt-get install libluajit-5.1-2
$ apt-get install luarocks`

The LuaJIT required modules are as follows:

*   [lua-cjson](https://github.com/mpx/lua-cjson): in case you have `luarocks`, run: `$ luarocks install lua-cjson`

### How to write LuaJIT Plugins

We have a demo plugin hosted in the repo [tyk-plugin-demo-lua](https://github.com/TykTechnologies/tyk-plugin-demo-lua). The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}})) and [mymiddleware.lua](https://github.com/TykTechnologies/tyk-plugin-demo-lua/blob/master/mymiddleware.lua).
### Lua Performance
Lua support is currently in beta stage. We are planning performance optimizations for future releases.
### Tyk Lua API Methods
Tyk Lua API methods aren’t currently supported.


#### Requirements

Tyk uses [LuaJIT](http://luajit.org/). The main requirement is the LuaJIT shared library, you may find this as `libluajit-x` in most distros.

For Ubuntu 14.04 you may use:

`$ apt-get install libluajit-5.1-2
$ apt-get install luarocks`

The LuaJIT required modules are as follows:

*   [lua-cjson](https://github.com/mpx/lua-cjson): in case you have `luarocks`, run: `$ luarocks install lua-cjson`
*   From v1.3.6 You can also use override response code, headers and body using ReturnOverrides. See the [Extend ReturnOverides](https://github.com/TykTechnologies/tyk/pull/763) sample for details.


#### Lua Plugin Tutorial

## Settings in the API Definition

To add a Lua plugin to your API, you must specify the bundle name using the `custom_middleware_bundle` field:

```json
{
  "name": "Tyk Test API",
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
  "custom_middleware_bundle": "test-bundle",
}
```

## Global settings

To enable Lua plugins you need to add the following block to `tyk.conf`:

```json
"coprocess_options": {
  "enable_coprocess": true,
},
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

`enable_coprocess` enables the rich plugins feature.

`enable_bundle_downloader` enables the bundle downloader.

`bundle_base_url` is a base URL that will be used to download the bundle, in this example we have "test-bundle" specified in the API settings, Tyk will fetch the following URL: `http://my-bundle-server.com/bundles/test-bundle`.

`public_key_path` sets a public key, this is used for verifying signed bundles, you may omit this if unsigned bundles are used.

## Running the Tyk Lua build

To use Tyk with Lua support you will need to use an alternative binary, it is provided in the standard Tyk package but it has a different service name.

Firstly stop the standard Tyk version:

```console
service tyk-gateway stop
```

and then start the Lua build:

```console
service tyk-gateway-lua start
```


## Middleware

### Middleware Execution Order

#### Request Middleware Chain


To aid the debugging of middleware transformations, below is a diagram that illustrates the flow of a request.

{{< img src="/img/diagrams/middleware-execution-order@3x.png" alt="Middleware execution flow" >}}



### Do-Not-Track middleware

When [transaction logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic" >}}) is enabled in the Tyk Gateway, a transaction record will be generated for every request made to an API endpoint deployed on the gateway. You can suppress the generation of transaction records for any API by enabling the do-not-track middleware. This provides granular control over request tracking.




## Context Variables

### Request Context Variables

Context variables are extracted from the request at the start of the middleware chain. These values can be very useful for later transformation of request data, for example, in converting a form POST request into a JSON PUT request or to capture an IP address as a header.

{{< note success >}}
**Note**  

When using Tyk Classic APIs, you must [enable]({{< ref "#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them. When using Tyk OAS APIs, the context variables are always available to the context-aware middleware.
{{< /note >}}


## Available context variables
*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object. For the header injector Tyk will format this data as `key:value1,value2,valueN;key:value1,value2` etc.
*   `path_parts`: The components of the path, split on `/`. These values should be in the format of a comma delimited list.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.
*   `request_id` Allows the injection of request correlation ID (for example X-Request-ID)
*   `jwt_claims_CLAIMNAME` - If JWT tokens are being used, then each claim in the JWT is available in this format to the context processor. `CLAIMNAME` is case sensitive so use the exact claim.
*   `cookies_COOKIENAME` - If there are cookies, then each cookie is available in context processor in this format. `COOKIENAME` is case sensitive so use the exact cookie name and replace any `-` in the cookie name with `_`.
*   `headers_HEADERNAME` - Headers are obviously exposed in context processor. You can access any header in the request using the following format: Convert the **first letter** in each word of an incoming header is to Capital Case. This is due to the way GoLang handles header parsing. You also need to replace any `-` in the `HEADERNAME` name with `_`.<br />
For example, to get the value stored in `test-header`, the syntax would be `$tyk_context.headers_Test_Header`.


## Middleware that can use context variables:
Context variables are exposed in three middleware plugins but are accessed differently depending on the caller as follows:

1.   URL Rewriter - Syntax is `$tyk_context.CONTEXTVARIABLES`. See [URL Rewriting]({{< ref "transform-traffic/url-rewriting" >}}) for more details.
2.   Modify Headers - Syntax is `$tyk_context.CONTEXTVARIABLES`. See [Request Headers]({{< ref "transform-traffic/request-headers" >}}) for more details.
3.   Body Transforms - Syntax is `{{ ._tyk_context.CONTEXTVARIABLES }}`. See [Body Transforms]({{< ref "transform-traffic/request-body" >}}) for more details.

{{< note success >}}
**Note**  

The Body Transform can fully iterate through list indices within context data so, for example, calling `{{ index ._tyk_context.path_parts 0 }}` in the Go Template in a Body Transform will expose the first entry in the `path_parts` list.

URL Rewriter and Header Transform middleware cannot iterate through list indices.
{{< /note >}}


## Example use of context variables

#### Examples of the syntax to use with all the available context varibles:
```
"x-remote-addr": "$tyk_context.remote_addr",
"x-token": "$tyk_context.token",
"x-jwt-sub": "$tyk_context.jwt_claims_sub",
"x-part-path": "$tyk_context.path_parts",
"x-jwt-pol": "$tyk_context.jwt_claims_pol",
"x-cookie": "$tyk_context.cookies_Cookie_Context_Var",
"x-cookie-sensitive": "$tyk_context.cookies_Cookie_Case_sensitive",
"x-my-header": "$tyk_context.headers_My_Header",
"x-path": "$tyk_context.path",
"x-request-data": "$tyk_context.request_data",
"x-req-id": "$tyk_context.request_id"
```
{{< img src="/img/dashboard/system-management/context_variables_ui.jpg" alt="Example of the syntax in the UI" >}}

#### The context variable values in the response:
```
"My-Header": "this-is-my-header",
"User-Agent": "PostmanRuntime/7.4.0",
"X-Cookie": "this-is-my-cookie",
"X-Cookie-Sensitive": "case-sensitive",
"X-Jwt-Pol": "5bca6a739afe6a00017eb267",
"X-Jwt-Sub": "john.doe@test.com",
"X-My-Header": "this-is-my-header",
"X-Part-Path": "context-var-example,anything",
"X-Path": "/context-var-example/anything",
"X-Remote-Addr": "127.0.0.1",
"X-Req-Id": "e3e99350-b87a-4d7d-a75f-58c1f89b2bf3",
"X-Request-Data": "key1:val1;key2:val2",
"X-Token": "5bb2c2abfb6add0001d65f699dd51f52658ce2d3944d3d6cb69f07a2"
```

## Enabling Context Variables for use with Tyk Classic APIs
1. In the your Tyk Dashboard, select `APIs` from the `System Management` menu 
2. Open the API you want to add Context Variable to
3. Click the `Advanced Options` tab and then select the `Enable context variables` option

{{< img src="/img/2.10/context_variables.png" alt="Context Variables" >}}

If not using a Tyk Dashboard, add the field `enable_context_vars` to your API definition file at root level and set it to `true`.

If you are using Tyk Operator, set the field `spec.enable_context_vars` to `true`.

The example API Definition below enabled context variable:

```yaml {linenos=true, linenostart=1, hl_lines=["10-10"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  enable_context_vars: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```




## When to use the do-not-track middleware

#### Compliance and privacy

Disabling tracking on endpoints that handle personal or sensitive information is crucial for adhering to privacy laws such as GDPR or HIPAA. This action prevents the storage and logging of sensitive data, ensuring compliance and safeguarding user privacy.

#### Optimizing performance

For endpoints experiencing high traffic, disabling tracking can mitigate the impact on the analytics processing pipeline and storage systems. Disabling tracking on endpoints used primarily for health checks or load balancing can prevent the analytics data from being cluttered with information that offers little insight. These optimizations help to maintain system responsiveness and efficiency by reducing unnecessary data load and help to ensure that analytics efforts are concentrated on more meaningful data. 

#### Cost Management

In scenarios where analytics data storage and processing incur significant costs, particularly in cloud-based deployments, disabling tracking for non-essential endpoints can be a cost-effective strategy. This approach allows for focusing resources on capturing valuable data from critical endpoints.

## How the do-not-track middleware works

When transaction logging is enabled, the gateway will automatically generate a transaction record for every request made to deployed APIs. 

You can enable the do-not-track middleware on whichever endpoints for which you do not want to generate logs. This will instruct the Gateway not to generate any transaction records for those endpoints or APIs. As no record of these transactions will be generated by the Gateway, there will be nothing created in Redis and hence nothing for the pumps to transfer to the persistent storage and these endpoints will not show traffic in the Dashboard's analytics screens.

{{< note success >}}
**Note**  

When working with Tyk Classic APIs, you can disable tracking at the API or endpoint-level. When working with Tyk OAS APIs, you can currently disable tracking only at the more granular endpoint-level.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the do-not-track middleware [here]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the do-not-track middleware [here]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Do-Not-Track middleware summary
  - The Do-Not-Track middleware is an optional stage in Tyk's API Request processing chain sitting between the [TBC]() and [TBC]() middleware.
  - The Do-Not-Track middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


# Using the Do-Not-Track middleware with Tyk Classic APIs

The [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) middleware provides the facility to disable generation of transaction records (which are used to track requests) at the API or endpoint level.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition either manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

You can prevent tracking for all endpoints of an API by configuring the `do_not_track` field in the root of your API definition.
- `true`: no transaction logs will be generated for requests to the API
- `false`: transaction logs will be generated for requests to the API
 
If you want to be more granular and disable tracking only for selected endpoints, then you must add a new `do_not_track_endpoints` object to the `extended_paths` section of your API definition.

The `do_not_track_endpoints` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "do_not_track_endpoints": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET"
            }
        ]
    }
}
```

In this example the do-not-track middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will not generate transaction records from the Gateway and so will not appear in the analytics.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the per-endpoint Do-Not-Track middleware for your Tyk Classic API by following these steps. Note that the API-level middleware can only be configured from the Raw Definition screen.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you do not want to generate records. Select the **Do not track endpoint** plugin.

{{< img src="img/gateway/middleware/classic_do_not_track.png" alt="Select the middleware" >}}

#### Step 2: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic).

It is possible to prevent tracking for all endpoints of an API by configuring the `do_not_track` field in the root of your API definition as follows:

- `true`: no transaction logs will be generated for requests to the API
- `false`: transaction logs will be generated for requests to the API

```yaml {linenos=true, linenostart=1, hl_lines=["10"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-do-not-track
spec:
  name: httpbin-do-not-track 
  use_keyless: true
  protocol: http
  active: true
  do_not_track: true
  proxy:
    target_url: http://example.com
    listen_path: /example
    strip_listen_path: true
```

If you want to disable tracking only for selected endpoints, then the process is similar to that defined in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic), i.e. you must add a new `do_not_track_endpoints` list to the extended_paths section of your API definition.
This should contain a list of objects representing each endpoint `path` and `method` that should have tracking disabled:

```yaml {linenos=true, linenostart=1, hl_lines=["31-33"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-endpoint-tracking
spec:
  name: httpbin - Endpoint Track
  use_keyless: true
  protocol: http
  active: true
  do_not_track: false
  proxy:
    target_url: http://httpbin.org/
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          track_endpoints:
            - method: GET
              path: "/get"
          do_not_track_endpoints:
            - method: GET
              path: "/headers"
```

In the example above we can see that the `do_not_track_endpoints` list is configured so that requests to `GET /headers` will have tracking disabled.


### Using the Do-Not-Track middleware with Tyk OAS APIs


The [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) middleware provides the facility to disable generation of transaction records (which are used to track requests to your APIs). When working with Tyk OAS APIs, you can currently disable tracking only at the endpoint-level.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}) either manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The do-not-track middleware (`doNotTrackEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `doNotTrackEndpoint` object has the following configuration:
- `enabled`: enable the middleware for the endpoint

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-do-not-track",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-do-not-track",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-do-not-track/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "doNotTrackEndpoint": {
                        "enabled": true
                    }               
                }
            }
        }
    }
}
```

In this example the do-not-track middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will not generate transaction records from the Gateway and so will not appear in the analytics.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the do-not-track middleware.

## Configuring the middleware in the API Designer

Adding do-not-track to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Do Not Track Endpoint middleware

Select **ADD MIDDLEWARE** and choose the **Do Not Track Endpoint** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-do-not-track.png" alt="Adding the Do Not Track middleware" >}}

#### Step 3: Save the API

Select **SAVE API** to apply the changes to your API.

##### Ignore Authentication middleware

The Ignore Authentication middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

## When to use the ignore authentication middleware

#### Health and liveness endpoints

This plugin can be very useful if you have an endpoint (such as a ping or health check) that you don’t need to secure.

## How ignore authentication works

When the Ignore Authentication middleware is configured for a specific endpoint, it instructs the gateway to bypass the client authentication process for requests made to that endpoint. If other (non-authentication) middleware are configured for the endpoint, they will still execute on the request.

It is important to exercise caution when using the Ignore Authentication middleware, as it effectively disables Tyk's security features for the ignored paths. Only endpoints that are designed to be public or have independent security mechanisms should be configured to bypass authentication in this way. When combining Ignore Authentication with response transformations be careful not to inadvertently expose sensitive data or rely on authentication or session data that is not present.

### Case sensitivity

By default the ignore authentication middleware is case-sensitive. If, for example, you have defined the endpoint `GET /ping` in your API definition then only calls to `GET /ping` will ignore the authentication step: calls to `GET /Ping` or `GET /PING` will require authentication. You can configure the middleware to be case insensitive at the endpoint level.

You can also set case sensitivity for the entire Tyk Gateway in its [configuration file]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) `tyk.conf`. If case insensitivity is configured at the gateway level, this will override the endpoint-level setting.

### Endpoint parsing

When using the ignore authentication middleware, we recommend that you familiarize yourself with Tyk's [URL matching]({{< ref "getting-started/key-concepts/url-matching" >}}) options.

<br>
{{< note success >}}
**Note**  

Tyk recommends that you use [exact]({{< ref "getting-started/key-concepts/url-matching#exact-match" >}}) matching for maximum security, though prefix and wildcard strategies might also apply for your particular deployment or use case.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the ignore authentication middleware [here]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the ignore authentication middleware [here]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Ignore Authentication middleware summary
  - The Ignore Authentication middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Ignore Authentication middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


# Using the Ignore Authentication middleware with Tyk Classic APIs

The [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `ignored` object to the `extended_paths` section of your API definition.

The `ignored` object has the following configuration:
- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: a shared object used to configure the [mock response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware#when-is-it-useful" >}}) middleware

The `method_actions` object should be configured as follows, with an entry created for each allowed method on the path:
- `action`: this should be set to `no_action`
- `code`: this should be set to `200`
- `headers` : this should be blank

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "ignored": [
            {
                "disabled": false,
                "path": "/status/200",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "no_action",
                        "code": 200,
                        "headers": {}
                    }          
                }
            }
        ]
    }
}
```

In this example the ignore authentication middleware has been configured for requests to the `GET /status/200` endpoint. Any such calls will skip the authentication step in the Tyk Gateway's processing chain.
- the middleware has been configured to be case sensitive, so calls to `GET /Status/200` will not skip authentication

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the Ignore Authentication middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to ignore authentication. Select the **Ignore** plugin.

{{< img src="/img/dashboard/endpoint-designer/ignore-authentication.png" alt="Adding the ignore authentication middleware to a Tyk Classic API endpoint" >}}

#### Step 2: Configure the middleware

Once you have selected the Ignore middleware for the endpoint, the only additional feature that you need to configure is whether to make it case-insensitive by selecting **Ignore Case**.

{{< img src="/img/2.10/ignore.png" alt="Ignore options" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic). It is possible to configure an enforced timeout using the `ignored` object within the `extended_paths` section of the API Definition.

In the example below the ignore authentication middleware has been configured for requests to the `GET /get` endpoint. Any such calls will skip the authentication step in the Tyk Gateway's processing chain.
- the middleware has been configured to be case insensitive, so calls to `GET /Get` will also skip authentication

```yaml {linenos=true, linenostart=1, hl_lines=["27-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-ignored
spec:
  name: httpbin-ignored
  use_keyless: false
  use_standard_auth: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org/
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          ignored:
            - ignore_case: true
              method_actions:
                GET:
                  action: "no_action"
                  code: 200
                  data: ""
                  headers: {}
              path: "/get"
```


### Using the Ignore Authentication middleware with Tyk OAS APIs

The [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The ignore authentication middleware (`ignoreAuthentication`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `ignoreAuthentication` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `ignoreCase`: if set to `true` then the path matching will be case insensitive

For example:
```json {hl_lines=["65-69"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-ignore-authentication",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-ignore-authentication/"
        }
    ], 
    "security": [
        {
            "authToken": []
        }
    ],     
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "components": {
        "securitySchemes": {
            "authToken": {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization"
            }
        }        
    },    
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-ignore-authentication",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "authentication": {
                "enabled": true,
                "securitySchemes": {
                    "authToken": {
                        "enabled": true
                    }
                }
            },
            "listenPath": {
                "strip": true,
                "value": "/example-ignore-authentication/"
            }        
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "ignoreAuthentication": {
                        "enabled": true
                    }
                }
            }
        }
    }
}
```

In this example the ignore authentication middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will skip the authentication step in the Tyk Gateway's processing chain.
- the middleware has been configured to be case sensitive, so calls to `GET /Anything` will not skip authentication

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Ignore Authentication middleware.

## Configuring the middleware in the API Designer

Adding and configuring the Ignore Authentication middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Ignore Authentication middleware

Select **ADD MIDDLEWARE** and choose the **Ignore Authentication** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-ignore.png" alt="Adding the Ignore Authentication middleware" >}}

##### Step 3: Optionally configure case-insensitivity

If you want to disable case-sensitivity for the path that you wish to skip authentication, then you must select **EDIT** on the Ignore Authentication icon.

{{< img src="/img/dashboard/api-designer/tyk-oas-ignore-added.png" alt="Ignore Authentication middleware added to endpoint - click through to edit the config" >}}

This takes you to the middleware configuration screen where you can alter the case sensitivity setting.
{{< img src="/img/dashboard/api-designer/tyk-oas-ignore-config.png" alt="Configuring case sensitivity for the path for which to ignore authentication" >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

##### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.


###### Internal Endpoint middleware


The Internal Endpoint middleware instructs Tyk Gateway to ignore external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

## When to use the Internal Endpoint middleware

#### Internal routing decisions

Internal endpoints are frequently used to make complex routing decisions that cannot be handled by the standard routing features. A single externally published endpoint can receive requests and then, based on inspection of the requests, the [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware can route them to different internal endpoints and on to the appropriate upstream services.

## How internal endpoints work

When the Internal Endpoint middleware is configured for a specific endpoint, it instructs the Gateway to ignore requests to the endpoint that originate from outside Tyk.

An internal endpoint can be targeted from another API deployed on Tyk using the `tyk://` prefix instead of `http://`.

For example, if `GET /status/200` is configured to be an Internal Endpoint on the listen path `http://my-tyk-install.org/my-api/` then external calls to this endpoint will be rejected with `HTTP 403 Forbidden`. Other APIs on Tyk will be able to direct traffic to this endpoint by setting their `target_url` to `tyk://my-api/status/200`.

#### Addressing an internal endpoint

An internal endpoint can be addressed using three different identifiers in the format `tyk://{identifier}/{endpoint}`.

The options for the `identifier` are:
- `self` (only if the endpoint is in the same API)
- `api_id` (the unique API Identifier assigned to the API within Tyk)
- listen path (the listen path defined for the API)

For example, let's say you have two APIs:

| api_id | listen path | Endpoint 1   | Endpoint 2 (with internal endpoint middleware) |
|--------|-------------|--------------|------------------------------------------------|
| f1c63fa5177de2719  | `/api1`    | `endpoint1_ext` | `endpoint1_int`     |
| 2e90b33a879945918  | `/api2`    | `endpoint2_ext` | `endpoint2_int`     |

An external request directed at `/api1/endpoint1_int` will be rejected with `HTTP 403 Forbidden`, since this is an internal endpoint.

This endpoint could, however, be called from within either endpoint in `/api2` as either:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`

Or from within `/api1/endpoint1_ext` as:
- `tyk://api1/endpoint1_int`
- `tyk://f1c63fa5177de2719/endpoint1_int`
- `tyk://self/endpoint1_int`

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the Internal Endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the Internal Endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Internal Endpoint middleware summary
  - The Internal Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Internal Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->



# Using the Internal Endpoint middleware with Tyk Classic APIs


The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk Classic APIs, the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `internal` object to the `extended_paths` section of your API definition.

The `internal` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "internal": [
            {
                "disabled": false,
                "path": "/status/200",
                "method": "GET"
            }
        ]
    }
}
```

In this example the internal endpoint middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any requests made to this endpoint that originate externally to Tyk will be rejected with `HTTP 403 Forbidden`. Conversely, the endpoint can be reached internally by another API at `tyk://<listen_path>/status/200`.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the internal endpoint middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path that you wish to set as internal. Select the **Internal** plugin.

{{< img src="/img/dashboard/endpoint-designer/internal-endpoint.png" alt="Adding the internal endpoint middleware to a Tyk Classic API endpoint" >}}

#### Step 2: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic). The middleware can be configured by adding a new `internal` object to the `extended_paths` section of your API definition.

In the example below the internal endpoint middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any requests made to this endpoint that originate externally to Tyk will be rejected with `HTTP 403 Forbidden`. Conversely, the endpoint can be reached internally by another API at `tyk://<listen_path>/status/200`.

```yaml {linenos=true, linenostart=1, hl_lines=["26-28"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-endpoint-internal
spec:
  name: httpbin - Endpoint Internal
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org/
    listen_path: /httpbin-internal
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          internal:
            - path: /status/200
              method: GET
```


### Using the Internal Endpoint middleware with Tyk OAS APIs


The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to process external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

When working with Tyk OAS APIs, the middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The internal endpoint middleware (`internal`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `internal` object has the following configuration:
- `enabled`: enable the middleware for the endpoint

For example:
```json {hl_lines=["49-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-internal-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/redirect": {
            "get": {
                "operationId": "redirectget",
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
            "name": "example-internal-endpoint",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-internal-endpoint/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "internal": {
                        "enabled": true
                    }
                },
                "redirectget": {
                    "urlRewrite": {
                        "enabled": true,
                        "pattern": ".*",
                        "rewriteTo": "tyk://self/anything"
                    }
                }
            }
        }
    }
}
```

In this example, two endpoints have been defined:
- the internal endpoint middleware has been configured for requests to the `GET /anything` endpoint
- the [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware has been configured for requests to the `GET /redirect` endpoint
 
Any calls made directly to `GET /example-internal-endpoint/anything` will be rejected, with Tyk returning `HTTP 403 Forbidden`, since the `/anything` endpoint is internal.

Any calls made to `GET /example-internal-endpoint/redirect` will be redirected to `GET /example-internal-endpoint/anything`. These will be proxied to the upstream because they originate from within Tyk Gateway (i.e. they are internal requests) - so the response from `GET http://httpbin.org/anything` will be returned.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the internal endpoint middleware.

## Configuring the middleware in the API Designer

Adding the Internal Endpoint middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Internal Endpoint middleware

Select **ADD MIDDLEWARE** and choose the **Internal** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-internal.png" alt="Adding the Internal Endpoint middleware" >}}

#### Step 3: Save the API

Select **SAVE API** to apply the changes to your API.


##### "Mock Response middleware"


A mock response is a simulated API response that can be returned by the API gateway without actually sending the request to the backend API service. Mock responses are an integral feature for API development, enabling developers to emulate API behavior without the need for upstream execution.

Tyk's mock response middleware offers this functionality by allowing the configuration of custom responses for designated endpoints. This capability is crucial for facilitating front-end development, conducting thorough testing, and managing unexpected scenarios or failures.

## When is it useful

### Rapid API Prototyping

Developers can create predefined static (mock) responses during early API prototyping phases to simulate responses without any backend. This is useful for several reasons:

- **Validate API Design Early**: It enables [trying an API before writing any code](https://tyk.io/blog/3-ways-to-try-out-your-api-design-before-you-build). API designers and product managers can validate concepts without waiting for full API implementations.
- **Enable Dependent Development**: Allows development of apps and tooling that depend on the upstream service to progress. For example, the front-end team can build their interface based on the mocked responses.
- **Support Test-Driven Development (TDD) and Behavior-Driven Development (BDD)**: Supports writing test cases for the API before implementation, enabling design and testing of the API without writing any backend code.

### Legacy System Migration

When migrating from a legacy system to new APIs, mock responses can be used to emulate the old system's outputs during the transitional phases. This provides continuity for client apps relying on the old system while new APIs are built that will eventually replace the legacy hooks.

### Disaster Recovery Testing

The ability for a gateway to return well-formed mocks when backend APIs are unavailable helps test disaster recovery plans. By intentionally taking APIs offline and verifying the mocks' surface instead, developers gain confidence in the gateway's fallback and business continuity capabilities

### Enhanced CI/CD pipeline

Test cases that rely on API interactions can mock those dependencies and provide virtual test data. This removes wait times for real API calls to complete during automated builds. Consumer testing can verify that provider APIs meet expected contracts using mocks in the CI pipeline. This ensures the contract remains intact across code changes before deployment. Front-end/client code can scale release cycles faster than backend APIs by using mocks to simulate planned API behaviors before they are ready.

## How mock responses work

When the Mock Response middleware is configured for a specific endpoint, it terminates requests to the endpoint and generates an HTTP response that will be returned to the client as if it had come from the upstream service. No request will be passed to the upstream. The mock response to an API request should be designed to emulate how the service would respond to requests. To enable this, the content of the response can be configured to match the API contract for the service: you can set the HTTP status code, body and headers for the response.

## Advanced mock responses with Tyk OAS

When working with Tyk OAS APIs, Tyk Gateway can parse the [examples and schema]({{< ref "product-stack/tyk-gateway/middleware/mock-response-openapi" >}}) in the OpenAPI description and use this to automatically generate responses using those examples. Where multiple examples are defined, for example for different response codes, Tyk enables you to [configure special headers]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#multiple-mock-responses-for-a-single-endpoint" >}}) in the request to select the desired mock response.

## Middleware execution order during request processing

### With **Tyk OAS APIs**

- the mock response middleware is executed at the **end** of the request processing chain, immediately prior to the request being proxied to the upstream
- all other request processing middleware (e.g. authentication, request transforms) will be executed prior to the mock response.

### With **Tyk Classic APIs**

- the mock response middleware is executed at the **start** of the request processing chain
- an endpoint with a mock response will not run any other middleware and will immediately return the mocked response for any request. As such, it is always an unauthenticated (keyless) call.

<hr>

If you’re using Tyk OAS APIs, then you can find details and examples of how to configure the mock response middleware [here]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas" >}}).

If you’re using Tyk Classic APIs, then you can find details and examples of how to configure the response body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Mock Response middleware summary
  - The Mock Response middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Mock Response middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


# "Mock Responses using OpenAPI Metadata - Key Concepts"


The [OpenAPI Specification](https://learn.openapis.org/specification/docs.html#adding-examples) provides metadata that can be used by automatic documentation generators to create comprehensive reference guides for APIs. Most objects in the specification include a `description` field that offers additional human-readable information for documentation. Alongside descriptions, some OpenAPI objects can include sample values in the OpenAPI Document, enhancing the generated documentation by providing representative content that the upstream service might return in responses.

Tyk leverages examples from your API documentation (in OpenAPI Spec format) to generate mock responses for the API exposed via the gateway. Based on this data, Tyk adds a new middleware named "Mock Response" and returns various mock responses according to your spec. Refer to the [Mock configuration guide]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#automatic-configuration-inferred-from-your-openapi-document" >}}) to learn how to do this.

The specification provides three methods for Tyk to deduce the mock response: `example`, `examples` and `schema`. 
1. `example`: A sample value that could be returned in a specific field in a response (see [below](#1-using-example-to-generate-a-mock-response))
2. `examples`: A map pairing an example name with an Example Object (see [below](#2-using-examples-to-generate-a-mock-response))
3. `schema`: JSON schema for the expected response body (see [below](#3-using-schema-to-generate-a-mock-response)

Note: 
- `example` and `examples` are mutually exclusive within the OpenAPI Document for a field in the `responses` object: the developer cannot provide both for the same object.
- The `content-type` (e.g. `application/json`, `text/plain`), per OpenAPI Specification, must be declared for each `example` or `examples` in the API description.

Let's see how to use each method:


### 1. Using `example` to generate a mock response

In the following extract from an OpenAPI description, a single `example` has been declared for a request to `GET /get` - the API developer indicates that such a call could return `HTTP 200` and the body value `Response body example` in plain text format.

```json {hl_lines=["9-11"],linenos=true, linenostart=1}
{
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
                "text/plain": {
                    "example": "Response body example"
                }
            },
            "description": "200 OK response for /get with a plain text"
          }
        }
      }
    }
  }
}
```

### 2. Using `examples` to generate a mock response

In this extract, the API developer also indicates that a call to `GET /get` could return `HTTP 200` but here provides two example body values `Response body from first-example` and `Response body from second-example`, again in plain text format.

``` json {hl_lines=["9-18"],linenos=true, linenostart=1}
{  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
              "text/plain": {
                "examples": {
                    "first-example": {
                        "value": "Response body from first-example"
                    },
                    "second-example": {
                        "value": "Response body from second-example"
                    }
                }
              }
            },
            "description": "This is a mock response example with 200OK"
          }
        }
      }
    }
  }
}
```

The `exampleNames` for these two values have been configured as `first-example` and `second-example` and can be used to [invoke the desired response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#multiple-mock-responses-for-a-single-endpoint" >}}) from a mocked endpoint.

### 3. Using `schema` to generate a mock response

If there is no `example` or `examples` defined for an endpoint, Tyk will try to find a `schema` for the response. If there is a schema, it will be used to generate a mock response. Tyk can extract values from referenced or nested schema objects when creating the mock response.

#### Response headers schema
Response headers do not have standalone `example` or `examples` attributes, however, they can have a `schema` - the Mock Response middleware will include these in the mock response if provided in the OpenAPI description.

The schema properties may have an `example` field, in which case they will be used to build a mock response. If there is no `example` value in the schema then default values are used to build a response as follows:
- `string` > `"string"`
- `integer` > `0`
- `boolean` > `true`

For example, below is a partial OpenAPI description, that defines a schema for the `GET /get` endpoint

```json {hl_lines=["10-13", "18-33"],linenos=true, linenostart=1}
{
    "paths": {
        "/get": {
            "get": {
                "operationId": "getget",
                "responses": {
                    "200": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "string",
                                    "example": "status-example"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "lastName": {
                                            "example": "Lastname-placeholder",
                                            "type": "string"
                                        },
                                        "firstname": {
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        },
                        "description": "This is a mock response example with 200OK"
                    }
                }
            }
        }
    }
}
```

Tyk Gateway could use the above to generate the following mock response:

```http
HTTP/1.1 200 OK
X-Status: status-example
Content-Type: application/json
 
{
    "lastName": "Lastname-placeholder",
    "firstname": "string",
    "id": 0
}
```
Notice that in the mock response above, `firstname` has the value `string` since there was no example for it in the OpenAP document so Tyk used the word `string` as the value for this field.


##### Using the Mock Response middleware with Tyk Classic APIs


The [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. This can be useful when creating a new API or making a development API available to an external team.

When working with Tyk Classic APIs, this middleware is executed at the start of the request processing chain. Thus an endpoint with the mock response middleware will not be authenticated, will not process other middleware configured for the API (neither API nor endpoint level) and will have no analytics created. It will simply return the configured response for any request made to that endpoint.

The middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API, the API Designer or in [Tyk Operator](#tyk-operator).

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

To enable mock response, you must first add the endpoint to a list - one of [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}), [block list]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) or [ignore authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}). This will add a new object to the `extended_paths` section of your API definition - `white_list`, `black_list` or `ignored`. The mock response can then be configured within the `method_actions` element within the new object.

The `white_list`, `black_list` and `ignored` objects all have the same structure and configuration as follows:

- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: the configuration of the mock response

The `method_actions` object should be configured as follows, with an entry created for each method on the path for which you wish to configure the mock response:

- `action`: this should be set to `reply`
- `code`: the HTTP status code to be provided with the response
- `headers`: the headers to inject with the response
- `data`: the payload to be returned as the body of the response

For example:

```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "white_list": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "reply",
                        "code": 200,
                        "data": "This is the mock response body",
                        "headers": {
                            "X-Example-Header": "foobar"
                        }
                    }          
                }
            }
        ]
    }
}
```

In this example the mock response middleware has been configured for requests to the `GET /anything` endpoint. The [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) middleware has been enabled for this endpoint and is case sensitive, so calls to `GET /Anything` will not return the mock response.

A call to `GET /anything` would return:

```
HTTP/1.1 200 OK
X-Example-Header: foobar
Date: Wed, 31 Jan 2024 16:21:05 GMT
Content-Length: 30
Content-Type: text/plain; charset=utf-8

This is the mock response body
```

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the Mock Response middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and configure a list plugin

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an allow list by [selecting]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) the **Whitelist** plugin.

#### Step 2: Add the mock response plugin

Now select the **Mock response** plugin.

{{< img src="/img/dashboard/endpoint-designer/mock-response.png" alt="Selecting the mock response middleware for a Tyk Classic API" >}}

#### Step 3: Configure the middleware

Once you have selected the Mock response middleware for the endpoint, you can configure the HTTP status code, headers and body to be included in the response. Remember to click **ADD**, to add each header to the response.

{{< img src="/img/dashboard/endpoint-designer/mock-response-config.png" alt="Configuring the mock response middleware for a Tyk Classic API" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

{{< note success >}}
**Note**

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas" >}}). If this isn't done, then the mock will not be saved when you save your API in the designer.
{{< /note >}}

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process of configuring a mock response is similar to that defined in the [configuring the middleware in Tyk Classic API definition](#tyk-classic) section.

To configure a mock response, you must first add a mock response configuration object to the `extended_paths` section, e.g. one of allow list (`white_list`), block list (`black_list`) or ignore authentication (`ignore`). The mock response configuration object has the following properties:

- path: the path of the endpoint, e.g `/foo`.
- ignore_case: when set to true the path matching is case insensitive.
- method_actions: a configuration object that allows the mock response to be configured for a given method, including the response body, response headers and status code. This object should also contain an `action` field with a value set to `reply`.

In the example below we can see that a mock response is configured to ignore authentication (`ignore`) for the `GET /foo` endpoint. When a request is made to the endpoint then authentication will be ignored and a mock response is returned with status code `200` and a response body payload of `{"foo": "bar"}`. The middleware has been configured to be case sensitive, so calls to `GET /Foo` will not ignore authentication.

```yaml {linenos=true, linenostart=1, hl_lines=["26-34"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  protocol: http
  active: true
  use_keyless: true
  proxy: 
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
            ignored:
              - ignore_case: false
                method_actions:
                  GET:
                    action: "reply"
                    code: 200
                    data: "{\"foo\": \"bar\"}"
                    headers: {}
                path: /foo
```


### Configuring and Using Tyk OAS Mock Response middleware

This tutorial is for Tyk OAS API definition users. If you're using the legacy Tyk Classic APIs, please refer to the [Tyk Classic Mock Response tutorial]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic" >}}).

The [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. 

When working with Tyk OAS APIs, this middleware is executed at the **end** of the request processing chain immediately prior to the upstream proxy stage. Thus, any other request processing middleware - including authentication - will be run before the request reaches the mock response.

The middleware is defined in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). To create this definition, you can use the Tyk Dashboard API or the API Designer in the Tyk Dashboard UI.

To configure or create a Mock Response middleware you have two modes, manual and automatic. Following please find detailed guidance for each mode.

## Manual configuration 

You can configure a mock response directly in the API definition, in the middleware object under the Tyk extension section, `x-tyk-api-gateway`. Once added, you need to update or import it to Tyk Dashboard using Tyk Dashboard API or via Tyk Dashboard UI. This is useful when you have already tested your API in dev environments and now you need to deploy it to staging or production in a declarative manner.

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added.

The mock response middleware (`mockResponse`) can be added to the `x-tyk-api-gateway.middleware.operations` section (Tyk OAS Extension) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

For basic operation, the `mockResponse` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `code`: the HTTP status code to be provided with the response (this defaults to `200` if not set)
- `body`: the payload to be returned as the body of the response
- `headers`: the headers to inject with the response

Please remember that this API definition needs to be updated in Tyk Dashboard. In the Dashboard UI it might be trivial but if you are doing it declaratively, you need to use the Tyk Dashboard API endpoint to update an existing API (PUT) or import as a new API (POST). Once updated, Tyk Gateway/s will return mock responses to all valid requests to the endpoint, depending on the [content of the request](#multiple-mock-responses-for-a-single-endpoint).

In the following example, we configure a mock response middleware for requests to the `GET /example-mock-response1/anything` endpoint:

```json {hl_lines=["39-49"],linenos=true, linenostart=1}
{
  "components": {},
  "info": {
    "title": "example-mock-response1",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {
    "/anything": {
      "get": {
        "operationId": "anythingget",
        "responses": {
          "200": {
            "description": "200OK for /anything using anythingget"
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-mock-response1",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    },
    "server": {
      "listenPath": {
        "value": "/example-mock-response1/",
        "strip": true
      }
    },
    "middleware": {
      "operations": {
        "anythingget": {
          "mockResponse": {
            "enabled": true,
            "code": 200,
            "body": "This is the mock response body",
            "headers": [
              {
                "name": "X-Mock-Example",
                "value": "mock-header-value"
              }
            ]
          }
        }
      }
    }
  }
}
```

Once this API definition is updated in Tyk Dashboard, a call to `GET /example-mock-response1/anything` would return:

```bash
HTTP/1.1 200 OK
X-Mock-Example: mock-header-value
Content-Type: text/plain; charset=utf-8
 
This is the mock response body
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Automatic configuration inferred from your OpenAPI Document

Tyk will parse the [examples and schema]({{< ref "product-stack/tyk-gateway/middleware/mock-response-openapi" >}}) in the OpenAPI document and use them to generate mock responses automatically.

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human-readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The mock response middleware (`mockResponse`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

For basic operation, the `mockResponse` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `fromOASExamples`: an object used to instruct Tyk Gateway to return a response from the OpenAPI description

The `fromOASExamples` object has the following configuration:
- `enabled`: enable the automatic configuration of mock response
- `code`: [optional] identifies which HTTP status code to be provided with the response (defaults to `200` if not set)
- `contentType`: [optional] identifies which response body type to use (defaults to `application/json` if not set)
- `exampleName`: [optional] the sample response to be returned from an `examples` list

The three optional fields (`code`, `contentType`, `exampleName`) are used to identify which sample response should be returned by the mock if multiple sample responses are declared in the OpenAPI description.

In the following example, the OpenAPI description declares three possible responses: two for HTTP 200 and one for HTTP 300. We have configured the Mock Response middleware to return the value defined for HTTP 200 (code) with `exampleName` set to "second-example". The JSON below shows the updated Tyk OAS API definition, after Tyk has generated and added the mock response middleware:

```json {hl_lines=["15-24", "29-33", "59-67"],linenos=true, linenostart=1}
{  
    "components": {},
    "info": {
        "title": "example-mock-response2",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "content": {
                            "text/plain": {
                                "examples": {
                                    "first-example": {
                                        "value": "My favorite is pasta"
                                    },
                                    "second-example": {
                                        "value": "My second favorite is pizza"
                                    }
                                }
                            }
                        },
                        "description": ""
                    },
                    "300": {
                        "content": {
                            "text/plain": {
                                "example": "There's too much choice"
                            }
                        },
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-mock-response2",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-mock-response2/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "mockResponse": {
                        "enabled": true,
                        "fromOASExamples": {
                            "enabled": true,
                            "code": 200,
                            "contentType": "text/plain",
                            "exampleName": "second-example"
                        }
                    }
                }
            }
        }
    }
}
```
Once this API definition is updated in Tyk Dashboard, a call to `GET /example-mock-response2/anything` would return:

```bash
HTTP/1.1 200 OK
Content-Type: text/plain
 
"My second favorite is pizza"
```

If you add `"code":300` in the `fromOASExamples` object, a call to `GET /example-mock-response2/anything` would instead respond as follows:

```bash
HTTP/1.1 300 Multiple Choices
Content-Type: text/plain
 
"There's too much choice"
```

{{< note success >}}
**Note**  

If multiple `examples` are defined in the OpenAPI description but no default `exampleName` is set in the middleware configuration `fromOASExamples` Tyk will select randomly from the multiple `examples`. Yes, that means the response may change with every request. You can [control which response](#multiple-mock-responses-for-a-single-endpoint) will be returned using special headers in the request.
{{< /note >}}

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Multiple mock responses for a single endpoint

When the mock response middleware in your Tyk OAS API is configured to return responses from the OpenAPI description within the API definition, you can invoke a specific response, overriding the defaults configured in the middleware, by providing specific headers in your request.

To invoke a non-default response from a mocked endpoint, you must add *one or more* special headers to the request:
- `Accept`: This standard HTTP header will override the response content type (e.g. `application/json`, `text/plain`)
- `X-Tyk-Accept-Example-Code`: This will select the HTTP response code for which to return the example response (e.g. `400`)
- `X-Tyk-Accept-Example-Name`: This identifies which example to select from an `examples` list

If an example response can’t be found for the configured `code`, `contentType` or `exampleName`, an HTTP 404 error will be returned to inform the client that there is no declared example for that configuration.

In the example below, the OpenAPI document declares two possible responses: one for HTTP 200 and one for HTTP 300. We have configured the Mock Response middleware to return the value defined for HTTP 200 for which the body (content) is in JSON format and a custom header `X-Status` which will take the default value of `true`.
```json {hl_lines=["15-19", "22-39", "45-50", "53-55", "82-89"],linenos=true, linenostart=1}
{  
    "components": {},
    "info": {
        "title": "example-mock-response3",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "lastName": {
                                            "example": "Bar",
                                            "type": "string"
                                        },
                                        "name": {
                                            "example": "Foo",
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        },
                        "description": ""
                    },
                    "300": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "boolean",
                                    "example": false
                                }
                            }
                        },
                        "content": {
                            "text/plain": {
                                "example": "Baz"
                            }
                    },
                    "description": ""
                    } 
               }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-mock-response3",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-mock-response3/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "mockResponse": {
                        "enabled": true,
                        "fromOASExamples": {
                            "enabled": true,
                            "code": 200,
                            "contentType": "application/json"
                        }
                    }
                }
            }
        }
    }
}
```

You can trigger the mock response for HTTP 300 by adding the following headers to your request:
- `X-Tyk-Accept-Example-Code`: 300
- `Accept`: text/plain

This would return a plain text body and the `X-Status` header set to `false`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Configuring mock response using Tyk Dashboard UI

Adding a mock response to your API endpoints is easy when using the API Designer in the Tyk Dashboard UI, simply follow the steps appropriate to the configuration method you wish to use:
- [manual configuration](#manual-configuration) of the middleware config
- [automatic configuration](#automatic-configuration) from the OpenAPI description

### Manual configuration

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Mock Response middleware

Select **ADD MIDDLEWARE** and choose **Mock Response** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock.png" alt="Adding the Mock Response middleware" >}}

#### Step 3: Configure the middleware

Select **Manually configure mock response**

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-mock-response.png" alt="Mock Response middleware added to endpoint - select the configuration method you require" >}}

This takes you to the middleware configuration screen where you can:
- choose the HTTP status code that you want Tyk Gateway to return
- select the content type
- add a description for your mock response
- define headers to be provided with the response
- define the body that will be returned in the response (note that this must be defined as a JSON schema)

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-mock-response-config.png" alt="Configuring the mock response" >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.

### Automatic configuration

#### Step 1: Import an OpenAPI Document containing sample responses or schema

Import your OpenAPI Document (from file, URL or by pasting the JSON into the text editor) configure the **upstream URL** and **listen path**, and select **Auto-generate middleware to deliver mock responses**.

Selecting this option will cause Tyk Dashboard to check for sample responses or schema in the OpenAPI description and will automatically add the Mock Response middleware for any endpoints that have suitable data.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock-auto-options.png" alt="Configuring the OpenAPI document import to create Mock Responses" >}}

#### Step 2: Edit the Mock Response middleware

Select **EDIT** and then the **Mock Response** middleware from the **Endpoints** tab. This will take you to the Edit Middleware screen. Note that *Use mock response from Open API Specification* has been selected.

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-step-2.png" alt="Editing the Mock Response middleware" >}}

#### Step 3: Configure the middleware

Tyk Dashboard will automatically select a valid HTTP response code from the drop-down. When you select a valid `content-type` for which a mock response is configured in the OpenAPI specification, the API Designer will display the associated response.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock-auto-select.png" alt="Mock Response middleware automatically configured from OpenAPI description" >}}

Here you can edit the mock response:
- modify, add or delete Response Body examples (note that this must follow the selected `content-type`)
- choose a default Response Body example that will be provided (unless [overridden in the request]({{< ref "#multiple-mock-responses-for-a-single-endpoint" >}}))
- add a description for your mock response
- define headers to be provided with the response (note that these must be defined as a JSON schema)
- add a schema

You can create and edit mock responses for multiple HTTP status codes by choosing a different status code from the drop-down.

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.

{{< note success >}}
**Note**  

Modifying the automatically configured Mock Response middleware will update the OpenAPI description part of your Tyk OAS API definition, as the detail of the mock response is not set in the `x-tyk-api-gateway` extension but is automatically generated in response to the particular request received to the endpoint.
{{< /note >}}



##### Request Body Transformation


Tyk enables you to modify the payload of API requests before they are proxied to the upstream. This makes it easy to transform between payload data formats or to expose legacy APIs using newer schema models without having to change any client implementations. This middleware is only applicable to HTTP methods that can support a request body (i.e. PUT, POST or PATCH).

With the body transform middleware you can modify XML or JSON formatted payloads to ensure that the response contains the information required by your upstream service. You can enrich the request by adding contextual data that is held by Tyk but not included in the original request from the client.

This middleware changes only the payload and not the headers. You can, however, combine this with the [Request Header Transform]({{< ref "transform-traffic/request-headers" >}}) middleware to apply more complex transformation to requests.

There is a closely related [Response Body Transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware that provides the same functionality on the response from the upstream, prior to it being returned to the client.

## When to use the Request Body Transformation middleware

#### Maintaining compatibility with legacy clients

Sometimes you might have a legacy API and need to migrate the transactions to a new upstream service but do not want to upgrade all the existing clients to the newer upstream API. Using request body transformation, you can convert the incoming legacy XML or JSON request structure into a newer, cleaner JSON format that your upstream services expect.

#### Shaping requests received from different devices

You can detect device types via headers or context variables and transform the request payload to optimize it for that particular device. For example, you might send extra metadata to the upstream for mobile apps.

#### SOAP to REST translation

A common use of the request body transform middleware is to surface a legacy SOAP service with a REST API. Full details of how to perform this conversion using Tyk are provided [here]({{< ref "advanced-configuration/transform-traffic/soap-rest" >}}).

## How body transformation works

Tyk's body transform middleware uses the [Go template language](https://golang.org/pkg/text/template/) to parse and modify the provided input. We have bundled the [Sprig Library (v3)](http://masterminds.github.io/sprig/) which provides over 70 pre-written functions for transformations to assist the creation of powerful Go templates to transform your API requests. 

The Go template can be defined within the API Definition or can be read from a file that is accessible to Tyk, for example alongside your [error templates]({{< ref "advanced-configuration/error-templates" >}}).

We have provided more detail, links to reference material and some examples of the use of Go templating [here]({{< ref "product-stack/tyk-gateway/references/go-templates" >}}).

{{< note success >}}
**Note**  

Tyk evaluates templates stored in files on startup, so if you make changes to a template you must remember to restart the gateway. 
{{< /note >}}

### Supported request body formats

The body transformation middleware can modify request payloads in the following formats:
- JSON
- XML

When working with JSON format data, the middleware will unmarshal the data into a data structure, and then make that data available to the template in dot-notation.

### Data accessible to the middleware

The middleware has direct access to the request body and also to dynamic data as follows:
 - [context variables]({{< ref "context-variables" >}}), extracted from the request at the start of the middleware chain, can be injected into the template using the `._tyk_context.KEYNAME` namespace
 - [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into the template using the `._tyk_meta.KEYNAME` namespace 
 - inbound form or query data can be accessed through the `._tyk_context.request_data` namespace where it will be available in as a `key:[]value` map
 - values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into the template using the notation appropriate to the location of the KV store
 
The request body transform middleware can iterate through list indices in dynamic data so, for example, calling `{{ index ._tyk_context.request_data.variablename 0 }}` in a template will expose the first entry in the `request_data.variablename` key/value array.

{{< note success >}}
**Note**  

As explained in the [documentation](https://pkg.go.dev/text/template), templates are executed by applying them to a data structure. The template receives the decoded JSON or XML of the request body. If session variables or meta data are enabled, additional fields will be provided: `_tyk_context` and `_tyk_meta` respectively.
{{< /note >}}

### Automatic XML <-> JSON Transformation

A very common transformation that is applied in the API Gateway is to convert between XML and JSON formatted body content.

The Request Body Transform supports two helper functions that you can use in your Go templates to facilitate this:
 - `jsonMarshal` performs JSON style character escaping on an XML field and, for complex objects, serialises them to a JSON string ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}))
 - `xmlMarshal` performs the equivalent conversion from JSON to XML ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}))

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-body-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-body-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Request Body Transform middleware summary
  - The Request Body Transform middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Body Transform middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
  - Request Body Transform can access both [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}) and [request context variables]({{< ref "context-variables" >}}).
 -->


# Using the Request Body Transform middleware with Tyk Classic APIs


The [request body transform]({{< ref "transform-traffic/request-body" >}}) middleware provides a way to modify the payload of API requests before they are proxied to the upstream.

This middleware is configured in the Tyk Classic API Definition at the endpoint level. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-body-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [Configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `transform` object to the `extended_paths` section of your API definition.

The `transform` object has the following configuration:
- `path`: the path to match on
- `method`: this method to match on
- `template_data`: details of the Go template to be applied for the transformation of the request body
 
The Go template is described in the `template_data` object by the following fields:
- `input_type`: the format of input data the parser should expect (either `xml` or `json`)
- `enable_session`: set this to `true` to make session metadata available to the transform template
- `template_mode`: instructs the middleware to look for the template either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded template) is provided in `template_source`
- `template_source`: if `template_mode` is set to `file`, this will be the path to the text file containing the template; if `template_mode` is set to `blob`, this will be a `base64` encoded representation of your template

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "transform": [
            {
                "path": "/anything",
                "method": "POST",
                "template_data": {
                    "template_mode": "file",
                    "template_source": "./templates/transform_test.tmpl",
                    "input_type": "json",
                    "enable_session": true
                }
            }
        ]
    }
}
```

In this example, the Request Body Transform middleware is directed to use the template located in the `file` at location `./templates/transform_test.tmpl`. The input (pre-transformation) request payload will be `json` format and session metadata will be available for use in the transformation.

{{< note success >}}

**Note**  

Tyk will load and evaluate the template file when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request body transform middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Body Transforms** plugin.

{{< img src="/img/2.10/body_transforms.png" alt="Endpoint designer" >}}

#### Step 2: Configure the middleware

Ensure that you have selected the `REQUEST` tab, then select your input type, and then add the template you would like to use to the **Template** input box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-request.png" alt="Setting the body request transform" >}}

#### Step 3: Test the Transform

If sample input data is available, you can use the Input box to add it, and then test it using the **Test** button. You will see the effect of the template on the sample input displayed in the Output box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-test.png" alt="Testing the body transform function" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the Request Body Transform middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring a request body transform is similar to that defined in section [Configuring the middleware in the Tyk Classic API Definition](#tyk-classic). Tyk Operator allows you to configure a request body transform by adding a `transform` object to the `extended_paths` section of your API definition.

In the example below the Request Body middleware (`transform`) has been configured for `HTTP POST` requests to the `/anything` endpoint. The Request Body Transform middleware is directed to use the template located in the blob included in the `template_source` field. The input (pre-transformation) request payload will be json format and session metadata will be available for use in the transformation.

```yaml {linenos=true, linenostart=1, hl_lines=["32-40"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  response_processors:
    - name: response_body_transform
    - name: header_injector
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```


### Using the Request Body Transform middleware with Tyk OAS APIs


The [request body transform]({{< ref "transform-traffic/request-body" >}}) middleware provides a way to modify the payload of API requests before they are proxied to the upstream.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-body-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The request body transformation middleware (`transformRequestBody`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `transformRequestBody` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `format`: the format of input data the parser should expect (either `xml` or `json`)
- `body`: [see note] this is a `base64` encoded representation of your template
- `path`: [see note] this is the path to the text file containing the template

{{< note success >}}
**Note**  

You should configure only one of `body` or `path` to indicate whether you are embedding the template within the middleware or storing it in a text file. The middleware will automatically select the correct source based on which of these fields you complete. If both are provided, then `body` will take precedence and `path` will be ignored.
{{< /note >}}

For example:
```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-body-transform",
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
            "name": "example-request-body-transform",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-body-transform/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingput": {
                    "transformRequestBody": {
                        "enabled": true,
                        "format": "json",
                        "body": "ewogICJ2YWx1ZTEiOiAie3sudmFsdWUyfX0iLAogICJ2YWx1ZTIiOiAie3sudmFsdWUxfX0iLAogICJyZXEtaGVhZGVyIjogInt7Ll90eWtfY29udGV4dC5oZWFkZXJzX1hfSGVhZGVyfX0iLAogICJyZXEtcGFyYW0iOiAie3suX3R5a19jb250ZXh0LnJlcXVlc3RfZGF0YS5wYXJhbX19Igp9"
                    }
                }
            }
        }
    }
}
```

In this example the request body transform middleware has been configured for  requests to the `PUT /anything` endpoint. The `body` contains a base64 encoded Go template (which you can check by pasting the value into a service such as [base64decode.org](https://www.base64decode.org)).

Decoded, this template is:
```json
{
  "value1": "{{.value2}}",
  "value2": "{{.value1}}",
  "req-header": "{{._tyk_context.headers_X_Header}}",
  "req-param": "{{._tyk_context.request_data.param}}"
}
```

So if you make a request to `PUT /anything?param=foo` as follows:
```bash
PUT /anything?param=foo
HTTP/1.1
Host: my-gateway.host
X-Header: bar

{
    "value1": "world",
    "value2": "hello"
}
```

You will receive a response from the upstream with this payload: 
```json
{
    "req-header": "bar",
    "req-param": "[foo]",
    "value1": "hello",
    "value2": "world"
}
```

The `/anything` endpoint returns the details of the request that was received by httpbin.org. You can see that Tyk has swapped `value1` and `value2` and embedded the `X-Header` header and `param` query values into the body of the request.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

{{< note success >}}

**Note**  

If using a template in a file (i.e. you configure `path` in the `transformRequestBody` object), remember that Tyk will load and evaluate the template when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

## Configuring the middleware in the API Designer

Adding Request Body Transformation to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow the following steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Request Body Transform middleware

Select **ADD MIDDLEWARE** and choose the **Request Body Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-body.png" alt="Adding the Request Body Transform middleware" >}}

#### Step 3: Configure the middleware

Now you can select the request body format (JSON or XML) and add either a path to the file containing the template, or directly enter the transformation template in the text box.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-body-config.png" alt="Configuring the Request Body Transform middleware" >}}

The **Test with data** control will allow you to test your body transformation function by providing an example request body and generating the output from the transform. It is not possible to configure headers, other request parameters, context or session metadata to this template test so if you are using these data sources in your transform it will not provide a complete output, for example:

{{< img src="/img/dashboard/api-designer/tyk-oas-body-transform-test.png" alt="Testing the Request Body Transform" >}}

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.


##### Request Header Transformation


Tyk allows you to modify the headers of incoming requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

With the header transform middleware you can append or delete any number of headers to ensure that the request contains the information required by your upstream service. You can enrich the request by adding contextual data that is held by Tyk but not included in the original request from the client.

This middleware changes only the headers and not the method or payload. You can, however, combine this with the [Request Method Transform]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) and [Request Body Tranform]({{< ref "transform-traffic/request-body" >}}) to apply more complex transformation to requests.

There are related [Response Header Transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware (at API-level and endpoint-level) that provide the same functionality on the response from your upstream, prior to it being returned to the client.

## When to use request header transformation

#### Adding Custom Headers

A common use of this feature is to add custom headers to requests, such as adding a secure header to all upstream requests (to verify that traffic is coming from the gateway), or adding a timestamp for tracking purposes.

#### Modifying Headers for Compatibility

You could use the request header transform middleware to modify headers for compatibility with a downstream system, such as changing the Content-Type header from "application/json" to "application/xml" for an API that only accepts XML requests while using the [Request Body Tranform]({{< ref "transform-traffic/request-body" >}}) to transform the payload.

#### Prefixing or Suffixing Headers

Upstream systems or corporate policies might mandate that a prefix or suffix is added to header names, such as adding a "Bearer" prefix to all Authorization headers for easier identification internally, without modifying the externally published API consumed by the client applications.

#### Adding multi-user access to a service

You can add multi-user access to an upstream API that has a single authentication key and you want to add multi-user access to it without modifying it or adding clunky authentication methods to it to support new users.

## How the request header transform works

The request header transform can be applied per-API or per-endpoint; each has a separate entry in the API definition so that you can configure both API-level and endpoint-level transforms for a single API.

The middleware is configured with a list of headers to delete from the request and a list of headers to add to the request. Each header to be added to the request is configured as a key:value pair.

The "delete header" functionality is intended to ensure that any header in the delete list is not present once the middleware completes - so if a header is not originally present in the request but is on the list to be deleted, the middleware will ignore its omission.

The "add header" functionality will capitalize any header name provided, for example if you configure the middleware to append `x-request-id` it will be added to the request as `X-Request-Id`.

In the request middleware chain, the API-level transform is applied before the endpoint-level transform so if both middleware are enabled, the endpoint-level transform will operate on the headers that have been added by the API-level transform (and will not receive those that have been deleted by it).

#### Injecting dynamic data into headers

You can enrich the request headers by injecting data from context variables or session objects into the headers.
- [context variables]({{< ref "context-variables" >}}) are extracted from the request at the start of the middleware chain and can be injected into added headers using the `$tyk_context.` namespace
- [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into added headers using the `$tyk_meta.` namespace
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into added headers using the notation appropriate to the location of the KV store

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request header transform middleware [here]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Request Header Transform middleware summary
  - The Request Header Transform is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Header Transform can be configured at the per-endpoint or per-API level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


# Using the Request Header Transform with Tyk Classic APIs


Tyk's [request header transform]({{< ref "transform-traffic/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the Request Header Transform in Tyk Operator](#tyk-operator) section below.

## Configuring the Request Header Transform in the Tyk Classic API Definition {#tyk-classic}

The API-level and endpoint-level request header transforms have a common configuration but are configured in different sections of the API definition.

#### API-level transform {#tyk-classic-api}

To **append** headers to all requests to your API (i.e. for all endpoints) you must add a new `global_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to requests.

To **delete** headers from all requests to your API, you must add a new `global_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from requests.

For example:
```json  {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "version_data": {
        "versions": {
            "Default": {
                "global_headers": {
                    "X-Static": "foobar",
                    "X-Request-ID":"$tyk_context.request_id",
                    "X-User-ID": "$tyk_meta.uid"
                },
                "global_headers_remove": [
                    "Auth_Id"
                ]
            }
        }
    },
}
```

This configuration will add three new headers to each request:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each request:
- `Auth_Id`

#### Endpoint-level transform {#tyk-classic-endpoint}

To configure a transformation of the request header for a specific endpoint you must add a new `transform_headers` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `delete_headers`: A list of the headers that should be deleted from the request
- `add_headers`: A list of headers, in key:value pairs, that should be added to the request

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json
{
    "transform_headers": [
        {
            "path": "status/200",
            "method": "GET",
            "delete_headers": ["X-Static"],
            "add_headers": {"X-Secret": "the-secret-key-is-secret"}
        }
    ]
}
```

In this example the Request Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any request received to that endpoint will have the `X-Static` header removed and the `X-Secret` header added, with the value set to `the-secret-key-is-secret`.

#### Combining API-level and Endpoint-level transforms

If the API-level transform in the previous [example]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Secret`

and to remove one:
- `Auth_Id` 

## Configuring the Request Header Transform in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request header transform middleware for your Tyk Classic API by following these steps.

### API-level transform

Configuring the API-level request header transform middleware is very simple when using the Tyk Dashboard.

In the Endpoint Designer you should select the **Global Version Settings** and ensure that you have selected the **Request Headers** tab:

{{< img src="/img/2.10/global_settings_modify_headers.png" alt="Global version settings" >}}

Note that you must click **ADD** to add a header to the list (for appending or deletion).

### Endpoint-level transform

##### Step 1: Add an endpoint for the path and select the Header Transform plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Modify Headers** plugin.

{{< img src="/img/2.10/modify_headers.png" alt="Endpoint designer" >}}

##### Step 2: Select the "Request" tab

This ensures that this will only be applied to inbound requests.

{{< img src="/img/2.10/modify_headers1.png" alt="Request tab" >}}

##### Step 3: Declare the headers to be modified

Select the headers to delete and insert using the provided fields. You need to click **ADD** to ensure they are added to the list.

{{< img src="/img/2.10/modify_headers2.png" alt="Header transforms" >}}

##### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the Request Header Transform in Tyk Operator {#tyk-operator}

The process for configuring a request header transform is similar to that defined in section [Configuring the Request Header Transform in the Tyk Classic API Definition](#tyk-classic). Tyk Operator allows you to configure a request size limit for [all endpoints of an API](#tyk-operator-api) or for a [specific API endpoint](#tyk-operator-endpoint).

### API-level transform {#tyk-operator-api}

Request headers can be removed and inserted using the following fields within an `ApiDefinition`:

- `global_headers`: Mapping of key values corresponding to headers to add to API requests.
- `global_headers_remove`: List containing the name of headers to remove from API requests.

The example below shows an `ApiDefinition` custom resource that adds *foo-req* and *bar-req* headers to the request before it is sent upstream. The *foo-req* header has a value of *foo-val* and the *bar-req* header has a value of *bar-val*. Furthermore, the *hello* header is removed from the request before it is sent upstream.

```yaml {linenos=true, linenostart=1, hl_lines=["25-29"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-headers
spec:
  name: httpbin-global-headers
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-global-headers
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        global_headers:
          foo-req: my-foo
          bar-req: my-bar
        global_headers_remove:
          - hello
```

### Endpoint-level transform {#tyk-operator-endpoint}

The process of configuring a transformation of a request header for a specific endpoint is similar to that defined in section [Endpoint-level transform](#tyk-classic-endpoint). To configure a transformation of the request header for a specific endpoint you must add a new `transform_headers` object to the `extended_paths` section of your API definition.

In the example below the Request Header Transform middleware (`transform_headers`) has been configured for HTTP `POST` requests to the `/anything` endpoint. Any request received to that endpoint will have the `remove_this` header removed and the `foo` header added, with the value set to `bar`.

```yaml {linenos=true, linenostart=1, hl_lines=["41-47"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  response_processors:
    - name: response_body_transform
    - name: header_injector
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```


#### Using the Request Header Transform with Tyk OAS APIs


Tyk's [request header transform]({{< ref "transform-traffic/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic" >}}) page.

## Configuring the Request Header Transform in the Tyk OAS API Definition

The API-level and endpoint-level request header transforms are configured in different sections of the API definition, though have a common configuration.

### API-level transform

To append headers to, or delete headers from, all requests to your API (i.e. for all endpoints) you must add a new `transformRequestHeaders` object to the `middleware.global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["38-56"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-header",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-request-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-header/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
                "transformRequestHeaders": {
                    "enabled": true,
                    "remove": [
                        "Auth_Id"
                    ],
                    "add": [
                        {
                            "name": "X-Static",
                            "value": "foobar"
                        },
                        {
                            "name": "X-Request-ID",
                            "value": "$tyk_context.request_id"
                        },
                        {
                            "name": "X-User-ID",
                            "value": "$tyk_meta.uid"
                        }
                    ]
                }
            }
        }
    }
}
```

This configuration will add three new headers to each request:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each request:
- `Auth_Id`

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the API-level request header transform.

### Endpoint-level transform

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The request header transform middleware (`transformRequestHeaders`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `transformRequestHeaders` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `add`: a list of headers, in key:value pairs, to be appended to the request
- `remove`: a list of headers to be deleted from the request (if present) 

For example:
```json {hl_lines=["39-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-header",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-request-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-header/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "transformRequestHeaders": {
                        "enabled": true,
                        "remove": [
                            "X-Static"
                        ],
                        "add": [
                            {
                                "name": "X-Secret",
                                "value": "the-secret-key-is-secret"
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

In this example the Request Header Transform middleware has been configured for requests to the `GET /status/200` endpoint. Any request received to that endpoint will have the `X-Static` header removed and the `X-Secret` header added, with the value set to `the-secret-key-is-secret`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint-level request header transform.

### Combining API-level and Endpoint-level transforms

If the API-level transform in the previous [example]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
 - `X-Request-ID`
 - `X-User-ID`
 - `X-Secret`

and to remove one:
 - `Auth_Id` 

## Configuring the Request Header Transform in the API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform request headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-level.png" alt="Tyk OAS API Designer showing API-level Request Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API requests. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-new-header.png" alt="Configuring the API-level Request Header Transform in Tyk OAS API Designer" >}}

### Adding an endpoint level transform

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

##### Step 2: Select the Request Header Transform middleware

Select **ADD MIDDLEWARE** and choose the **Request Header Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header.png" alt="Adding the Request Header Transform middleware" >}}

##### Step 3: Configure header transformation

Select **NEW HEADER** to configure a header to be added to or removed from the request.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-added.png" alt="Configuring the Request Header transformation" >}}

You can add multiple headers to either list by selecting **NEW HEADER** again.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-new.png" alt="Adding another header to the transformation" >}}

##### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

**Error:** Content for /Users/davidrollins/Documents/DevDocs/Tyk/tyk-docs/tyk-docs/content/transform-traffic/request-method-transform.md not found.


###### Using the Request Method Transform with Tyk Classic APIs

Tyk's [request method transform]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) middleware is configured at the endpoint level, where it modifies the HTTP method used in the request to a configured value.

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-method-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring a Request Method Transform in Tyk Operator](#tyk-operator) section below.

## Configuring a Request Method Transform in the Tyk Classic API Definition {#tyk-classic}

To configure a transformation of the request method you must add a new `method_transforms` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `to_method`: The new HTTP method to which the request should be transformed

All standard HTTP methods are supported: `GET`, `PUT`, `POST`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

For example:
```json
{
    "method_transforms": [
        {
            "path": "/status/200",
            "method": "GET",
            "to_method": "POST"
        }
    ]
}
```

In this example the Request Method Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any request received to that endpoint will be modified to `POST /status/200`.

## Configuring a Request Method Transform in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request method transform middleware for your Tyk Classic API by following these steps.

### Using the Dashboard

#### Step 1: Add an endpoint for the path and select the Method Transform plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Method Transform** plugin.

{{< img src="/img/2.10/method_transform.png" alt="Method Transform" >}}

#### Step 2: Configure the transform

Then select the HTTP method to which you wish to transform the request.

{{< img src="/img/2.10/method_transform2.png" alt="Method Path" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring a Request Method Transform in Tyk Operator {#tyk-operator}

The process for configuring a request method transform for an endpoint in Tyk Operator is similar to that defined in section [configuring a Request Method Transform in the Tyk Classic API Definition](#tyk-classic).

To configure a transformation of the request method you must add a new `method_transforms` object to the `extended_paths` section of your API definition:

```yaml {linenos=true, linenostart=1, hl_lines=["26-29"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /transform
    strip_listen_path: true
  version_data:
    default_version: v1
    not_versioned: true
    versions:
      v1:
        name: v1
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          method_transforms:
            - path: /anything
              method: GET
              to_method: POST
```

The example API Definition above configures an API to listen on path `/transform` and forwards requests upstream to http://httpbin.org.

In this example the Request Method Transform middleware has been configured for `HTTP GET` requests to the `/anything` endpoint. Any request received to that endpoint will be modified to `POST /anything`.


### Using the Request Method Transform with Tyk OAS APIs

Tyk's [request method transform]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) middleware is configured at the endpoint level, where it modifies the HTTP method used in the request to a configured value.

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-method-tyk-classic" >}}) page.

## Configuring the Request Method Transform in the Tyk OAS API Definition

The request method transform middleware (`transformRequestMethod`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document). Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

You only need to enable the middleware (set `enabled:true`) and then configure `toMethod` as the new HTTP method to which the request should be transformed. The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the method should be transformed.

All standard HTTP methods are supported: `GET`, `PUT`, `POST`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-method",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-request-method",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-method/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "transformRequestMethod": {
                        "enabled": true,
                        "toMethod": "POST"
                    }
                }
            }
        }
    }
}
```

In this example the Request Method Transform middleware has been configured for requests to the `GET /status/200` endpoint. Any request received to that endpoint will be modified to `POST /status/200`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the request method transform.

## Configuring the Request Method Transform in the API Designer

Adding the transform to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Method Transform middleware

Select **ADD MIDDLEWARE** and choose the **Method Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-method-transform.png" alt="Adding the Request Method Transform middleware" >}}

#### Step 3: Configure the middleware

Select the new HTTP method to which requests to this endpoint should be transformed

{{< img src="/img/dashboard/api-designer/tyk-oas-method-transform-config.png" alt="Selecting the new HTTP method for requests to the endpoint" >}}

Select **ADD MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.


**Error:** Content for /Users/davidrollins/Documents/DevDocs/Tyk/tyk-docs/tyk-docs/content/transform-traffic/looping.md not found.


##### Using the Request Size Limit middleware with Tyk Classic APIs


The [request size limit]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) middleware enables you to apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from excessive memory usage or brute force attacks.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

There are three different levels of granularity that can be used when configuring a request size limit.
- [system-wide]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits#applying-a-system-level-size-limit" >}}): affecting all APIs deployed on the gateway
- [API-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic#tyk-classic-api" >}}): affecting all endpoints for an API
- [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic#tyk-classic-endpoint" >}}): affecting a single API endpoint

### Applying a size limit for a specific API {#tyk-classic-api}

You can configure a request size limit (in bytes) to an API by configuring the `global_size_limit` within the `version` element of the API Definition, for example:
```
"global_size_limit": 2500 
```

A value of zero (default) means that no maximum is set and the API-level size limit check will not be performed.

This limit is applied for all endpoints within an API. It is evaluated after the Gateway-wide size limit and before any endpoint-specific size limit. If this test fails, the Tyk Gateway will report `HTTP 400 Request is too large`.

### Applying a size limit for a specific endpoint {#tyk-classic-endpoint}

The most granular control over request sizes is provided by the endpoint-level configuration. This limit will be applied after any Gateway-level or API-level size limits and is given in bytes. If this test fails, the Tyk Gateway will report `HTTP 400 Request is too large`.

To enable the middleware you must add a new `size_limits` object to the `extended_paths` section of your API definition.

The `size_limits` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `size_limit`: the maximum size permitted for a request to the endpoint (in bytes)

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "size_limits": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "POST",
                "size_limit": 100
            }
        ]
    }
}
```

In this example the endpoint-level Request Size Limit middleware has been configured for HTTP `POST` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will check the size of the payload (Request body) and, if it is larger than 100 bytes, will reject the request, returning `HTTP 400 Request is too large`.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure a request size limit for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to limit the size of requests. Select the **Request size limit** plugin.

{{< img src="/img/2.10/request_size_limit.png" alt="Select middleware" >}}

#### Step 2: Configure the middleware

Set the request size limit, in bytes.
    
{{< img src="/img/2.10/request_size_settings.png" alt="Configure limit" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

{{< note success >}}
**Note**  

The Tyk Classic API Designer does not provide an option to configure `global_size_limit`, but you can do this from the Raw Definition editor.
{{< /note >}}

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring a request size limit is similar to that defined in section [configuring the middleware in the Tyk Classic API Definition](#tyk-classic). Tyk Operator allows you to configure a request size limit for [all endpoints of an API](#tyk-operator-api) or for a [specific API endpoint](#tyk-operator-endpoint).

### Applying a size limit for a specific API {#tyk-operator-api}

<!-- Need an example -->
The process for configuring the request size_limits middleware for a specific API is similar to that explained in [applying a size limit for a specific API](#tyk-classic-api).

You can configure a request size limit (in bytes) for all endpoints within an API by configuring the `global_size_limit` within the `version` element of the API Definition, for example:

```yaml {linenos=true, linenostart=1, hl_lines=["19"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-limit
spec:
  name: httpbin-global-limit
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-global-limit
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        global_size_limit: 5
        name: Default
```

The example API Definition above configures an API to listen on path `/httpbin-global-limit` and forwards requests upstream to http://httpbin.org.

In this example the request size limit is set to 5 bytes. If the limit is exceeded then the Tyk Gateway will report `HTTP 400 Request is too large`.

### Applying a size limit for a specific endpoint {#tyk-operator-endpoint}

The process for configuring the request size_limits middleware for a specific endpoint is similar to that explained in [applying a size limit for a specific endpoint](#tyk-classic-endpoint).

To configure the request size_limits middleware you must add a new `size_limits` object to the `extended_paths` section of your API definition, for example:

```yaml {linenos=true, linenostart=1, hl_lines=["22-25"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-limit
spec:
  name: httpbin-limit
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-limit
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          size_limits:
            - method: POST
              path: /post
              size_limit: 5
```

The example API Definition above configures an API to listen on path `/httpbin-limit` and forwards requests upstream to http://httpbin.org.

In this example the endpoint-level Request Size Limit middleware has been configured for `HTTP POST` requests to the `/post` endpoint. For any call made to this endpoint, Tyk will check the size of the payload (Request body) and, if it is larger than 5 bytes, will reject the request, returning `HTTP 400 Request is too large`.


#### Using the Request Size Limit middleware with Tyk OAS APIs


The [request size limit]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) middleware enables you to apply limits to the size of requests made to your HTTP APIs. You might use this feature to protect your Tyk Gateway or upstream services from excessive memory usage or brute force attacks.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

There are three different levels of granularity that can be used when configuring a request size limit.
- [system-wide]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits#applying-a-system-level-size-limit" >}}): affecting all APIs deployed on the gateway
- [API-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas#applying-a-size-limit-for-a-specific-api" >}}): affecting all endpoints for an API
- [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-oas#applying-a-size-limit-for-a-specific-endpoint" >}}): affecting a single API endpoint

### Applying a size limit for a specific API

The API-level size limit has not yet been implemented for Tyk OAS APIs.

You can work around this by implementing a combination of endpoint-level size limits and [allow]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) or [block]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) lists.

### Applying a size limit for a specific endpoint

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The virtual endpoint middleware (`requestSizeLimit`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `requestSizeLimit` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `value`: the maximum size permitted for a request to the endpoint (in bytes) 

For example:
```json {hl_lines=["39-44"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-size-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "post": {
                "operationId": "anythingpost",
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
            "name": "example-request-size-limit",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-request-size-limit/",                
                "strip": true
            }
        },      
        "middleware": {
            "operations": {
                "anythingpost": {
                    "requestSizeLimit": {
                        "enabled": true,
                        "value": 100
                    }
                }
            }
        }
    }
}
```

In this example the endpoint-level Request Size Limit middleware has been configured for HTTP `POST` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will check the size of the payload (Request body) and, if it is larger than 100 bytes, will reject the request, returning `HTTP 400 Request is too large`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the virtual endpoint middleware.

## Configuring the middleware in the API Designer

Adding the Request Size Limit middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint for the path

From the **API Designer** add an endpoint that matches the path for you want to limit the size of requests.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Request Size Limit middleware

Select **ADD MIDDLEWARE** and choose the **Request Size Limit** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-size-limit.png" alt="Adding the Request Size Limit middleware" >}}

#### Step 3: Configure the middleware

Now you can set the **size limit** that the middleware should enforce - remember that this is given in bytes.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-size-limit-config.png" alt="Setting the size limit that should be enforced" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes to your API.


**Error:** Content for /Users/davidrollins/Documents/DevDocs/Tyk/tyk-docs/tyk-docs/content/transform-traffic/response-body.md not found.


##### Using the Response Body Transform middleware with Tyk Classic APIs


The [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware provides a way to modify the payload of API responses before they are returned to the client.

This middleware is configured in the Tyk Classic API Definition at the endpoint level. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `transform_response` object to the `extended_paths` section of your API definition.

The `transform_response` object has the following configuration:
- `path`: the path to match on
- `method`: this method to match on
- `template_data`: details of the Go template to be applied for the transformation of the response body
 
The Go template is described in the `template_data` object by the following fields:
- `input_type`: the format of input data the parser should expect (either `xml` or `json`)
- `enable_session`: set this to `true` to make session metadata available to the transform template
- `template_mode`: instructs the middleware to look for the template either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded template) is provided in `template_source`
- `template_source`: if `template_mode` is set to `file`, this will be the path to the text file containing the template; if `template_mode` is set to `blob`, this will be a `base64` encoded representation of your template

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "transform_response": [
            {
                "path": "/anything",
                "method": "POST",
                "template_data": {
                    "template_mode": "file",
                    "template_source": "./templates/transform_test.tmpl",
                    "input_type": "json",
                    "enable_session": true 
                }
            }
        ]
    }
}
```

In this example, the Response Body Transform middleware is directed to use the template located in the `file` at location `./templates/transform_test.tmpl`. The input (pre-transformation) response payload will be `json` format and session metadata will be available for use in the transformation.

{{< note success >}}

**Note**  

Tyk will load and evaluate the template file when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

{{< note success >}}

**Note**  
Prior to Tyk 5.3, there was an additional step to enable response body transformation. You would need to add the following to the Tyk Classic API definition:

```json
{
    "response_processors":[
        {"name": "response_body_transform"}
    ]
}
```

If using the Endpoint Designer in the Tyk Dashboard, this would be added automatically.

We removed the need to configure the `response_processors` element in Tyk 5.3.0.
{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the response body transform middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Body Transforms** plugin.

{{< img src="/img/2.10/body_transforms.png" alt="Endpoint designer" >}}

#### Step 2: Configure the middleware

Ensure that you have selected the `RESPONSE` tab, then select your input type, and then add the template you would like to use to the **Template** input box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-response.png" alt="Setting the body response transform" >}}

#### Step 3: Test the Transform

If you have sample input data, you can use the Input box to add it, and then test it using the **Test** button. You will see the effect of the template on the sample input in the Output box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-test.png" alt="Testing the body transform function" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the Response Body Transform middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process of configuring a transformation of a response body for a specific endpoint is similar to that defined in section [configuring the middleware in the Tyk Classic API Definition](#tyk-classic) for the Tyk Classic API definition. To enable the middleware you must add a new `transform_response` object to the `extended_paths` section of your API definition.

In the examples below, the Response Body Transform middleware (`transform_response`) is directed to use the template located in the `template_source`, decoding the xml in the base64 encoded string. The input (pre-transformation) response payload will be `xml` format and there is no session metadata provided for use in the transformation.

### Example

```yaml {linenos=true, linenostart=1, hl_lines=["45-53"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```

### Tyk Gateway < 5.3.0 Example {#gw-lt-5-3-example}

If using Tyk Gateway < v5.3.0 then a `response_processor` object must be added to the API definition containing a `response_body_transform` item, as highlighted below:

```yaml {linenos=true, linenostart=1, hl_lines=["17-18", "48-56"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  response_processors:
    - name: response_body_transform
    - name: header_injector
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```

#### Using the Response Body Transform middleware with Tyk OAS APIs


The [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware provides a way to modify the payload of API responses before they are returned to the client.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The response body transformation middleware (`transformResponseBody`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `transformResponseBody` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `format`: the format of input data the parser should expect (either `xml` or `json`)
- `body`: [see note] this is a `base64` encoded representation of your template
- `path`: [see note] this is the path to the text file containing the template

{{< note success >}}
**Note**  

You should configure only one of `body` or `path` to indicate whether you are embedding the template within the middleware or storing it in a text file. The middleware will automatically select the correct source based on which of these fields you complete. If both are provided, then `body` will take precedence and `path` will be ignored.
{{< /note >}}

For example:
```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-body-transform",
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
            "name": "example-response-body-transform",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-body-transform/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingput": {
                    "transformResponseBody": {
                        "enabled": true,
                        "format": "json",
                        "body": "ewogICJ2YWx1ZTEiOiAie3sudmFsdWUyfX0iLAogICJ2YWx1ZTIiOiAie3sudmFsdWUxfX0iLAogICJyZXEtaGVhZGVyIjogInt7Ll90eWtfY29udGV4dC5oZWFkZXJzX1hfSGVhZGVyfX0iLAogICJyZXEtcGFyYW0iOiAie3suX3R5a19jb250ZXh0LnJlcXVlc3RfZGF0YS5wYXJhbX19Igp9"
                    }
                }
            }
        }
    }
}
```

In this example the response body transform middleware has been configured for requests to the `PUT /anything` endpoint. The `body` contains a base64 encoded Go template (which you can check by pasting the value into a service such as [base64decode.org](https://www.base64decode.org)).

Decoded, this template is:
```go
{
    "value1": "{{.value2}}",
    "value2": "{{.value1}}",
    "req-header": "{{._tyk_context.headers_X_Header}}",
    "req-param": "{{._tyk_context.request_data.param}}"
}
```

So if you make a request to `PUT /anything?param=foo`, configuring a header `X-Header`:`bar` and providing this payload:
```json
{
    "value1": "world",
    "value2": "hello"
}
```

httpbin.org will respond with the original payload in the response and, if you do not have the response body transform middleware enabled, the response from Tyk will include:
```json
{
    "value1": "world",
    "value2": "hello"
}
```

If, however, you enable the response body transform middleware, Tyk will modify the response to include this content:
```json
{
    "req-header": "bar",
    "req-param": "[foo]",
    "value1": "hello",
    "value2": "world"
}
```

You can see that Tyk has swapped `value1` and `value2` and embedded the `X-Header` header and `param` query values from the request into the body of the response.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

{{< note success >}}

**Note**  

If using a template in a file (i.e. you configure `path` in the `transformResponseBody` object), remember that Tyk will load and evaluate the template when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

## Configuring the middleware in the API Designer

Adding Response Body Transformation to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow the following steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Response Body Transform middleware

Select **ADD MIDDLEWARE** and choose the **Response Body Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-body.png" alt="Adding the Response Body Transform middleware" >}}

#### Step 3: Configure the middleware

Now you can select the response body format (JSON or XML) and add either a path to the file containing the template, or directly enter the transformation template in the text box.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-body-config.png" alt="Configuring the Response Body Transform middleware" >}}

The **Test with data** control will allow you to test your body transformation function by providing an example response body and generating the output from the transform. It is not possible to configure headers, other request parameters, context or session metadata to this template test so if you are using these data sources in your transform it will not provide a complete output, for example:

{{< img src="/img/dashboard/api-designer/tyk-oas-body-transform-test.png" alt="Testing the Response Body Transform" >}}

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.





**Error:** Content for /Users/davidrollins/Documents/DevDocs/Tyk/tyk-docs/tyk-docs/content/transform-traffic/response-headers.md not found.


##### Using the Response Header Transform with Tyk Classic APIs

Tyk's [response header transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware enables you to append or delete headers on responses received from the upstream service before sending them to the client.

There are two options for this:
- API-level modification that is applied to all responses for the API
- endpoint-level modification that is applied only to responses from a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the endpoint-level transformation will be applied first.
{{< /note >}}

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the response header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the Response Header Transform in Tyk Operator](#tyk-operator) section below.

## Configuring the Response Header Transform in the Tyk Classic API Definition {#tyk-classic}

The API-level and endpoint-level response header transforms have a common configuration but are configured in different sections of the API definition.
{{< note success >}}

**Note**  
Prior to Tyk 5.3.0, there was an additional step to enable response header transforms (both API-level and endpoint-level). You would need to add the following to the Tyk Classic API definition:

```json
{
    "response_processors":[
        {"name": "header_injector"}
    ]
}
```

If using the Endpoint Designer in the Tyk Dashboard, this would be added automatically.

We removed the need to configure the `response_processors` element in Tyk 5.3.0.
{{< /note >}}

#### API-level transform {#tyk-classic-api}

To **append** headers to all responses from your API (i.e. for all endpoints) you must add a new `global_response_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to responses.

To **delete** headers from all responses from your API (i.e. for all endpoints), you must add a new `global_response_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from responses.

For example:
```json  {linenos=true, linenostart=1}
{
    "version_data": {
        "versions": {
            "Default": {
                "global_response_headers": {
                    "X-Static": "foobar",
                    "X-Request-ID":"$tyk_context.request_id",
                    "X-User-ID": "$tyk_meta.uid"
                },
                "global_response_headers_remove": [
                    "X-Secret"
                ]
            }
        }
    },
}
```

This configuration will add three new headers to each response:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each response:
 - `X-Secret`

#### Endpoint-level transform {#tyk-classic-endpoint}

To configure response header transformation for a specific endpoint you must add a new `transform_response_headers` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `delete_headers`: a list of the headers that should be deleted from the response
- `add_headers`: a list of headers, in key:value pairs, that should be added to the response

For example:
```json  {linenos=true, linenostart=1}
{
    "transform_response_headers": [
        {
            "path": "status/200",
            "method": "GET",
            "delete_headers": ["X-Static"],
            "add_headers": [
                {"X-Secret": "the-secret-key-is-secret"},
                {"X-New": "another-header"}
            ],
        }
    ]
}
```

In this example the Response Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any response received from the upstream service following a request to that endpoint will have the `X-Static` header removed and the `X-Secret` and `X-New` headers added (with values set to `the-secret-key-is-secret` and `another-header`).

#### Combining API-level and Endpoint-level transforms

If the example [API-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#api-level-transform" >}}) and [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#endpoint-level-transform" >}}) transforms are applied to the same API, then the `X-Secret` header will be added (by the endpoint-level transform first) and then removed (by the API-level transform). Subsequently, the result of the two transforms for a call to `GET /status/200` would be to add four headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Static`
- `X-New`

### Fixing response headers that leak upstream server data

A middleware called `header_transform` was added in Tyk 2.1 specfically to allow you to ensure that headers such as `Location` and `Link` reflect the outward facade of your API Gateway and also align with the expected response location to be terminated at the gateway, not the hidden upstream proxy.

This is configured by adding a new `rev_proxy_header_cleanup` object to the `response_processors` section of your API definition.

It has the following configuration:
- `headers`: a list of headers in the response that should be modified
- `target_host`: the value to which the listed headers should be updated
 
For example:
```json
{
    "response_processors": [
        {
            "name": "header_transform",
            "options": {
                "rev_proxy_header_cleanup": {
                    "headers": ["Link", "Location"],
                    "target_host": "http://TykHost:TykPort"
                }
            }
        }
    ]
}
```

In this example, the `Link` and `Location` headers will be modified from the server-generated response, with the protocol, domain and port of the value set in `target_host`.

This feature is rarely used and has not been implemented in the Tyk Dashboard UI, nor in the [Tyk OAS API]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas" >}}).

## Configuring the Response Header Transform in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the response header transform middleware for your Tyk Classic API by following these steps.

### API-level transform

Configuring the API-level response header transform middleware is very simple when using the Tyk Dashboard.

In the Endpoint Designer you should select the **Global Version Settings** and ensure that you have selected the **Response Headers** tab:

{{< img src="/img/dashboard/endpoint-designer/response-header-global.png" alt="Configuring the API-level response header transform" >}}

Note that you must click **ADD** to add a header to the list (for appending or deletion).

### Endpoint-level transform

##### Step 1: Add an endpoint for the path and select the Header Transform plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Modify Headers** plugin.

{{< img src="/img/dashboard/endpoint-designer/modify-headers-plugin.png" alt="Adding the Modify Headers plugin to an endpoint" >}}

##### Step 2: Select the "Response" tab

This ensures that the transform will be applied to responses prior to them being sent to the client.

{{< img src="/img/dashboard/endpoint-designer/response-header-added.png" alt="Selecting the response header transform" >}}

##### Step 3: Declare the headers to be modified

Select the headers to delete and insert using the provided fields. You need to click **ADD** to ensure they are added to the list.

{{< img src="/img/dashboard/endpoint-designer/response-header-details.png" alt="Configuring the response header transform" >}}

##### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the Response Header Transform in Tyk Operator {#tyk-operator}

The process for configuring a response header transform in Tyk Operator is similar to that defined in section [configuring the Response Header Transform in the Tyk Classic API Definition](#tyk-classic). Tyk Operator allows you to configure a response header transformation for [all endpoints of an API](#tyk-operator-endpoint) or for a [specific API endpoint](#tyk-operator-api).

### API-level transform {#tyk-operator-api}

The process of configuring transformation of response headers for a specific API in Tyk Operator is similar to that defined in section [API-level transform](#tyk-classic-api) for the Tyk Classic API definition. 

To **append** headers to all responses from your API (i.e. for all endpoints) you must add a new `global_response_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to responses.

To **delete** headers from all responses from your API (i.e. for all endpoints), you must add a new `global_response_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from responses.

An example is listed below:

```yaml {linenos=true, linenostart=1, hl_lines=["25-30"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-header
spec:
  name: httpbin-global-header
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-global-header
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        global_response_headers:
          X-Static: foobar
          X-Request-ID: "$tyk_context.request_id"
          X-User-ID: "$tyk_meta.uid"
        global_response_headers_remove:
          - X-Secret
```

The example API Definition above configures an API to listen on path `/httpbin-global-header` and forwards requests upstream to http://httpbin.org.

This configuration will add three new headers to each response:

- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each response:

- `X-Secret`


### Endpoint-level transform {#tyk-operator-endpoint}

The process of configuring a transformation of a response header for a specific endpoint in Tyk Operator is similar to that defined in section [endpoint-level transform](#tyk-classic-endpoint) for the Tyk Classic API definition. To configure a transformation of the response headers for a specific endpoint you must add a new `transform_response_headers` object to the `extended_paths` section of your API definition.

In this example the Response Header Transform middleware (`transform_response_headers`) has been configured for HTTP `GET` requests to the `/xml` endpoint. Any response received from the upstream service following a request to that endpoint will have the `Content-Type` header added with a value set to `application/json`.

##### Example

```yaml {linenos=true, linenostart=1, hl_lines=["54-60"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```

##### Tyk Gateway < 5.3.0 Example

If using Tyk Gateway < v5.3.0 then a `response_processor` object must be added to the API definition containing a `header_injector` item, as highlighted below:

```yaml  {linenos=true, linenostart=1, hl_lines=["17", "19", "57-63"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  response_processors:
    - name: response_body_transform
    - name: header_injector
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```


###### Using the Response Header Transform with Tyk OAS APIs

Tyk's [response header transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware enables you to append or delete headers on responses received from the upstream service before sending them to the client.

There are two options for this:
- API-level modification that is applied to all responses for the API
- endpoint-level modification that is applied only to responses from a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the endpoint-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic" >}}) page.

## Configuring the Response Header Transform in the Tyk OAS API Definition

The API-level and endpoint-level response header transforms have a common configuration but are configured in different sections of the API definition.

#### API-level transform

To append headers to, or delete headers from, responses from all endpoints defined for your API you must add a new `transformResponseHeaders` object to the `middleware.global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["38-57"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-header",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-response-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-header/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
                "transformResponseHeaders": {
                    "enabled": true,
                    "remove": [
                        "X-Secret"
                    ],
                    "add": [
                        {
                            "name": "X-Static",
                            "value": "foobar"
                        },
                        {
                            "name": "X-Request-ID",
                            "value": "$tyk_context.request_id"
                        },
                        {
                            "name": "X-User-ID",
                            "value": "$tyk_meta.uid"
                        }
                    ]
                }
            }
        }
    }
}
```

This configuration will add three new headers to each response:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each response:
- `X-Secret`

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the API-level response header transform.

#### Endpoint-level transform

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The response header transform middleware (`transformResponseMethod`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["39-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-method",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-response-method",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-method/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "transformResponseHeaders": {
                        "enabled": true,
                        "remove": [
                            "X-Static"
                        ],
                        "add": [
                            {
                                "name": "X-Secret",
                                "value": "the-secret-key-is-secret"
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

In this example the Response Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any response received from the upstream service following a request to that endpoint will have the `X-Static` header removed and the `X-Secret` and `X-New` headers added (with values set to `the-secret-key-is-secret` and `another-header`).

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint-level response header transform.

#### Combining API-level and Endpoint-level transforms

If the example [API-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas#api-level-transform" >}}) and [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas#endpoint-level-transform" >}}) transforms are applied to the same API, then the `X-Secret` header will be added (by the endpoint-level transform first) and then removed (by the API-level transform). Subsequently, the result of the two transforms for a call to `GET /status/200` would be to add four headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Static`
- `X-New`

## Configuring the Response Method Transform in the API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform response headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-level.png" alt="Tyk OAS API Designer showing API-level Response Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API responses. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-new-header.png" alt="Configuring the API-level Response Header Transform in Tyk OAS API Designer" >}}

### Adding an endpoint level transform

##### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.
{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

##### Step 2: Select the Response Header Transform middleware

Select **ADD MIDDLEWARE** and choose the **Response Header Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-add-response-header.png" alt="Adding the URL Rewrite middleware" >}}

##### Step 3: Configure header transformation

Select **NEW HEADER** to configure a header to be added to or removed from the response, you can add multiple headers to either list by selecting **NEW HEADER** again.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-header.png" alt="Configuring the rewrite rules for Advanced Triggers" >}}
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-new.png" alt="Configuring the Response Header Transform" >}}

##### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.


###### URL Rewriting


## Overview of URL Rewriting

URL rewriting in Tyk is a powerful feature that enables the modification of incoming API request paths to match the expected endpoint format of your backend services. This process is accomplished by using regular expressions (regexes) to identify and capture specific segments of the request URL, which can then be rearranged or augmented to construct the desired endpoint URL.

The flexibility of Tyk's URL rewriting mechanism allows for conditional rewrites based on the presence of certain parameters within the request, ensuring that the rewrite logic is applied only when appropriate. This allows for granular redirection of requests, for example to direct certain users to a beta service while others are sent to the production version.

By employing URL rewriting, Tyk facilitates seamless communication between client applications and backend services, ensuring that API requests are efficiently routed and processed. This feature is instrumental in maintaining a clean and organized API architecture, while also providing the adaptability required to handle evolving backend systems.

## When to use URL Rewriting

#### Internal Looping

API requests can be redirected to other endpoints or APIs deployed on Tyk using the URL rewrite functionality. This allows requests to be redirected to internal APIs that are not directly exposed on the Gateway (for example to reduce complexity of the external interface or to perform additional processing or security checks before reaching sensitive upstream APIs). We refer to this practice as [looping]({{< ref "/advanced-configuration/transform-traffic/looping" >}}). By performing the looping internally using the URL rewrite middleware, latency is reduced because the redirection is handled entirely within Tyk with no unnecessary external network calls.

#### Improved Performance Optimization

You can use URL rewriting to route traffic intelligently to particular API endpoints, distributing the processing burden evenly across your system and minimizing load on your backend resources. This reduces the chances of overwhelming individual nodes and ensures consistent performance levels throughout the entire infrastructure.

#### Enhanced Scalability

As your API portfolio scales, you may find yourself dealing with an ever-increasing array of unique URLs. Instead of creating separate endpoints for every permutation, URL rewriting allows you to consolidate those disparate routes into a centralised location. This simplification makes it easier to monitor and manage the overall system, ultimately enhancing its resilience and stability.

#### Better User Experiences

With URL rewriting, you can design cleaner, more straightforward navigation structures for your APIs, making it simpler for consumers to locate and interact with the information they require.

## How URL Rewriting works

Tyk's URL rewrite middleware uses the concepts of [triggers]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-triggers" >}}) and [rules]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-rules" >}}). These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

A rule is a simple pattern match - you identify the location of a `key` and define a regex (called the `pattern`). Tyk will examine the API request and compare the `key` with the `pattern`. If there is a match, the rule will pass.

A trigger combines one or more rules with a target (or `rewriteTo`) URL. If the logical combination of the rules results in a pass outcome, then the trigger is considered to have been fired and the target URL for the request will be rewritten.

More detail on URL Rewrite triggers and rules can be found [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the URL rewrite middleware [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the URL rewrite middleware [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page

## URL Rewrite middleware summary
 - The URL Rewrite middleware is an optional stage in Tyk's API Request processing chain, sitting between the [Request Header Transform]({{< ref "/transform-traffic/request-headers" >}}) and [Response Caching]({{< ref "/basic-config-and-security/reduce-latency/caching" >}}) middleware.
 - URL Rewrite is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard.
 - URL Rewrite can access both [session metadata]({{< ref "/getting-started/key-concepts/session-meta-data" >}}) and [request context variables]({{< ref "/context-variables" >}}).
 
-->


### Using the URL Rewrite middleware with Tyk Classic APIs

Tyk's [URL rewriter]({{< ref "/transform-traffic/url-rewriting" >}}) uses the concepts of triggers and rules to determine if the request (target) URL should be modified. These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

URL rewrite triggers and rules are explained in detail [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

When working with Tyk Classic APIs the rules and triggers are configured in the Tyk Classic API Definition; this can be done manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out [this]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the URL rewriter in Tyk Operator](#tyk-operator) section below.

## Configuring the URL rewriter in the Tyk Classic API Definition {#tyk-classic}

To configure the URL rewriter you must add a new `url_rewrites` object to the `extended_paths` section of your API definition, for example:

```json
{
    "url_rewrites": [
        {
            "path": "books/author",
            "method": "GET",
            "match_pattern": "(\w+)/(\w+)",
            "rewrite_to": "library/service?value1=$1&value2=$2"
        }
    ]
}
```

In this example the basic trigger has been configured to match the path for a request to the `GET /books/author` endpoint against the pure regex `(\w+)/(\w+)`. This is looking for two word groups in the path which, if found, will store the first string (`books`) in context variable `$1` and the second (`author`) in `$2`. The request (target) URL will then be rewritten to `library/service?value1=books&value2=author` ready for processing by the next middleware in the chain.

You can add advanced triggers to your URL rewriter configuration by adding the `triggers` element within the `url_rewrites` object.

The `triggers` element is an array, with one entry per advanced trigger. For each of those triggers you configure:
- `on` to set the logical condition to be applied to the rules (`any` or `all`)
- `options` a list of rules for the trigger
- `rewrite_to` the address to which the (target) URL should be rewritten if the trigger fires

The rules are defined using this format:
```yaml
{
    key_location: {
        key_name: {
            "match_rx": pattern
            "reverse": true/false (set to true to trigger if pattern does not match)
        }
    }
}

Key locations are encoded as follows:
- `header_matches` - request header parameter
- `query_val_matches` - query parameter
- `path_part_matches` - path parameter (i.e. components of the path itself)
- `session_meta_matches` - session metadata
- `payload_matches`- request body
- `request_context_matches`- request context

For example:

```json
{
    "url_rewrites": [
        {
            "path": "books/author",
            "method": "GET",
            "match_pattern": "(\w+)/(\w+)",
            "rewrite_to": "library/service?value1=$1&value2=$2",
            "triggers": [
                {
                    "on": "any",
                    "options": {
                        "query_val_matches": {
                            "genre": {
                                "match_rx": "fiction",
                                "reverse": false
                            }
                        }
                    },
                    "rewrite_to": "library/service/author?genre=$tyk_context.trigger-0-genre-0"
                },
                {
                    "on": "all",
                    "options": {
                        "header_matches": {
                            "X-Enable-Beta": {
                                "match_rx": "true",
                                "reverse": false
                            }
                        },
                        "session_meta_matches": {
                            "beta_enabled": {
                                "match_rx": "true",
                                "reverse": false
                            }
                        }
                    },
                    "rewrite_to": "https://beta.library.com/books/author"
                }
            ]
        }
    ]
}
```

In this example, the basic trigger is configured as before, but two advanced triggers have been added.

The first advanced trigger has this configuration:
- key location is query parameter
- key name is genre
- pattern is fiction

So if a `GET` request is made to `/books/author?genre=fiction` the advanced trigger will fire and the URL will be rewritten to `library/service/author?genre=fiction`.

The second advanced trigger has this configuration:
- rule condition: ALL
- rule 1
    - key location is header parameter
    - key name is `X-Enable-Beta`
    - pattern is `true``
- rule 2
    - key location is session metadata
    - key name is `beta_enabled`
    - pattern is `true`

So if a request is made to `GET /books/author` with a header `"X-Enable-Beta":"true"` and, within the session metadata, `"beta_enabled":"true"` the second advanced trigger will fire and the URL will be written to `https://beta.library.com/books/author` taking the request to a different upstream host entirely.

## Configuring the URL rewriter in the API Designer

You can use the API Designer in the Tyk Designer to configure the URL rewrite middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the URL rewrite plugin

From the **Endpoint Designer** add an endpoint that matches the path you want to rewrite. Select the **URL Rewrite** plugin.

{{< img src="/img/2.10/url_rewrite.png" alt="Endpoint designer" >}}

#### Step 2: Configure the basic trigger

Add the regex capture groups and the new URL to the relevant sections.

{{< img src="/img/2.10/url_rewrite_settings.png" alt="URL rewrite configuration" >}}

#### Step 3: Configure an advanced trigger

You can optionally configure advanced triggers by using the **Create Advanced Trigger** option from the **URL Rewriter** plugin.

You will see a screen like this:

{{< img src="/img/2.10/url_re-write_advanced.png" alt="URL rewrite add trigger" >}}

When triggers are added, you can edit or remove them inside the **Advanced URL rewrite** section:

{{< img src="/img/2.10/url_rewrite-advanced-edit.png" alt="URL rewrite list trigger" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the URL rewriter in Tyk Operator {#tyk-operator}

The process for configuring the URL rewriter in Tyk Operator is similar to that explained in [configuring the URL rewriter in the Tyk Classic API Definition](#tyk-classic). To configure the URL rewriter you must add a new `url_rewrites` object to the `extended_paths` section of your API definition.

The example API Definition provides the corresponding custom resource configuration for the [Tyk Classic API Definition example](#tyk-classic), configuring an API to listen on path `/url-rewrite` and forward requests upstream to http://httpbin.org. The URL rewrites middleware would match the path for a request to the `GET /anything/books/author` endpoint against the pure regex `/anything/(\w+)/(\w+)`. The request (target) URL will then be rewritten to `/anything/library/service?value1=$1&value2=$2`.

```yaml {linenos=true, linenostart=1, hl_lines=["26-31"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: url-rewrite
spec:
  name: URL Rewrite
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /url-rewrite
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          url_rewrites:
            - path: /anything/books/author
              match_pattern: /anything/(\w+)/(\w+)
              method: GET
              rewrite_to: /anything/library/service?value1=$1&value2=$2
              triggers: []
```

URL Rewrite Triggers can be specified in a similar way. The Tyk Operator example below is the equivalent for the advanced triggers example included in the [configuring the URL rewriter in the Tyk Classic API Definition](#tyk-classic) section above.

```yaml {linenos=true, linenostart=1, hl_lines=["26-49"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: url-rewrite-advanced
spec:
  name: URL Rewrite Advanced
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /url-rewrite
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          url_rewrites:
            - path: /anything/books/author
              match_pattern: /anything/(\w+)/(\w+)
              method: GET
              rewrite_to: /anything/library/service?value1=$1&value2=$2
              triggers: 
                - "on": "any"
                  "rewrite_to": "library/service/author?genre=$tyk_context.trigger-0-genre-0"
                  "options":
                    "query_val_matches": 
                      "genre": 
                          "match_rx": "fiction"
                          "reverse": false
                - "on": "all"
                  "options": 
                    "header_matches": 
                        "X-Enable-Beta": 
                            "match_rx": "true"
                            "reverse": false
                    "session_meta_matches": 
                        "beta_enabled": 
                            "match_rx": "true"
                            "reverse": false
                  "rewrite_to": "https://beta.library.com/books/author"
```

For further examples check out the [internal looping]({{< ref "/product-stack/tyk-operator/advanced-configurations/internal-looping" >}}) page.


### Using the URL Rewrite middleware with Tyk OAS APIs


Tyk's [URL rewriter]({{< ref "/transform-traffic/url-rewriting" >}}) uses the concepts of triggers and rules to determine if the request (target) URL should be modified. These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

URL rewrite triggers and rules are explained in detail [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

When working with Tyk OAS APIs the rules and triggers are configured in the [Tyk OAS API Definition]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}); this can be done manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the legacy Tyk Classic APIs, then check out [this]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic" >}}) page.

## Configuring the URL rewriter in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The URl rewrite middleware can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

### Using the basic trigger

For the **basic trigger**, you only need to enable the middleware (set `enabled:true`) and then configure the `pattern` and the `rewriteTo` (target) URL. The design of the Tyk OAS API Definition takes advantage of the `operationID` defined in the OpenAPI Document that declares both the path and method required by the basic trigger.

```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
  "info": {
    "title": "example-url-rewrite",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/example-url-rewrite/"
    }
  ],
  "security": [],
  "paths": {
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-url-rewrite",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "operations": {
        "jsonget": {
          "urlRewrite": {
            "enabled": true,
            "pattern": "/(\\w+)/(\\w+)",
            "rewriteTo": "anything?value1=$1&value2=$2"
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-url-rewrite/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```

In this example the basic trigger has been configured to match the path for a request to the `GET /json` endpoint against the regex `/(\w+)/(\w+)`. This is looking for two word groups in the path (after the API listen path) which, if found, will store the first string in context variable `$1` and the second in `$2`. The request (target) URL will then be rewritten to `anything?value1=$1&value2=$2`.

If you send a request to `GET http://localhost:8181/example-url-rewrite/json/hello`

```bash  {hl_lines=["1"],linenos=true, linenostart=1}
GET /example-url-rewrite/json/hello HTTP/1.1
User-Agent: PostmanRuntime/7.36.3
Accept: */*
Postman-Token: 1a84a792-f0c4-4c40-932a-795485cdd252
Host: localhost:8181
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

The URL rewrite middleware will match the pattern:
`/json/hello` -> `/(\w+)/(\w+)` -> `$1` will take the value `json` and `$2` will take the value `hello`

It will then rewrite the target URL to `/anything?value1=json&value2=hello` and `httpbin.org` will respond with:

```bash  {hl_lines=["13-16", "31"],linenos=true, linenostart=1}
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Length: 536
Content-Type: application/json
Date: Mon, 18 Mar 2024 17:37:40 GMT
Server: gunicorn/19.9.0
X-Ratelimit-Limit: 0
X-Ratelimit-Remaining: 0
X-Ratelimit-Reset: 0
 
{
"args": {
"value1": "json",
"value2": "hello"
},
"data": "",
"files": {},
"form": {},
"headers": {
"Accept": "*/*",
"Accept-Encoding": "gzip, deflate, br",
"Host": "httpbin.org",
"Postman-Token": "1a84a792-f0c4-4c40-932a-795485cdd252",
"User-Agent": "PostmanRuntime/7.36.3",
"X-Amzn-Trace-Id": "Root=1-65f87be4-18c50d554886f46f6b73d42b"
},
"json": null,
"method": "GET",
"origin": "::1, 85.9.213.196",
"url": "http://httpbin.org/anything?value1=json&value2=hello"
}
```
The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the URL rewrite middleware.

### Using advanced triggers

You can add **advanced triggers** to your URL rewriter configuration by adding the `triggers` element within the `urlRewrite` middleware configuration for the operation.

The `triggers` element is an array, with one entry per advanced trigger. For each of those triggers you configure:
- `condition` to set the logical condition to be applied to the rules (`any` or `all`)
- `rules` a list of rules for the trigger
- `rewriteTo` the address to which the (target) URL should be rewritten if the trigger fires

The rules are defined using this format:
```yaml
{
    "in": key_location,
    "name": key_name,
    "pattern": pattern,
    "negate": true/false //set to true to trigger if pattern does not match
}
```

Key locations are encoded as follows:
- `header` - request header parameter
- `query` - query parameter
- `path` - path parameter (i.e. components of the path itself)
- `sessionMetadata` - session metadata
- `requestBody`- request body
- `requestContext`- request context

For example:

```json {hl_lines=["31-67"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-url-rewrite2",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/json": {
            "get": {
                "operationId": "jsonget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "components": {},   
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-url-rewrite2",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "middleware": {
            "operations": {
                "jsonget": {
                    "urlRewrite": {
                        "enabled": true,
                        "pattern": "/(\\w+)/(\\w+)",
                        "rewriteTo": "anything?value1=$1&value2=$2",
                        "triggers": [
                            {
                                "condition": "all",
                                "rewriteTo": "anything?value1=$1&query=$tyk_context.trigger-0-numBytes-0",
                                "rules": [
                                    {
                                        "in": "query",
                                        "pattern": "[0-9]+",
                                        "negate": false,
                                        "name": "numBytes"
                                    },
                                    {
                                        "in": "header",
                                        "pattern": "true",
                                        "negate": true,
                                        "name": "x-bytes"
                                    }
                                ]
                            },
                            {
                                "condition": "any",
                                "rewriteTo": "bytes/$tyk_context.trigger-1-numBytes-0",
                                "rules": [
                                    {
                                        "in": "query",
                                        "pattern": "[0-9]+",
                                        "negate": false,
                                        "name": "numBytes"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-url-rewrite2/"
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        } 
    }
}
```
In this example, the basic trigger is configured as before, but two advanced triggers have been added.

The first advanced trigger will fire if the request has this configuration:
- query parameter `numBytes` is provided with a numeric value, AND
- header parameter `x-bytes` is *not* set to `true` (note that `negate` is set to `true` in this rule)

Such a request will be redirected to `/anything` passing two query parameters
- `value1` with the first string matched in the basic trigger (i.e. `json`)
- `query` with the value provided in the `numBytes` query parameter

The second advanced trigger will fire if the first doesn't and if this condition is met:
- query parameter `numBytes` is provided with a numeric value

Such a request will be redirected to `/bytes/{numBytes}`, which will return `numBytes` random bytes from `httpbin.org`.

If neither advanced trigger fires, then the basic trigger will redirect the request to `/anything?value1=json&value2=hello` as before.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the URL rewrite middleware.

## Configuring the URL rewriter in the API Designer

Adding and configuring the URL rewrite feature to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the URL Rewrite middleware

Select **ADD MIDDLEWARE** and choose the **URL Rewrite** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-add-url-rewrite.png" alt="Adding the URL Rewrite middleware" >}}

#### Step 3: Configure the basic trigger

Add the match pattern and the new URL to configure the basic trigger rule.

{{< img src="/img/dashboard/api-designer/tyk-oas-url-rewrite-basic.png" alt="Configuring the rewrite rule for the Basic Trigger" >}}

#### Step 4: Optionally configure advanced triggers

You can optionally apply advanced triggers by selecting **ADD TRIGGER** for each trigger you wish to configure. For each advanced trigger you can add one or more rules, selecting **ADD RULE** to add the second, third, etc.

{{< img src="/img/dashboard/api-designer/tyk-oas-url-rewrite-advanced.png" alt="Configuring the rewrite rules for Advanced Triggers" >}}

#### Step 5: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.


##### Request Validation middleware


Requests to your upstream services should meet the contract that you have defined for those APIs. Checking the content and format of incoming requests before they are passed to the upstream APIs can avoid unexpected errors and provide additional security to those services. Tyk's request validation middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

Request validation enables cleaner backend APIs, better standardization across consumers, easier API evolution and reduced failure risk leading to higher end-to-end reliability.

## When to use the Request Validation middleware

#### Improving security of upstream services

Validating incoming requests against a defined schema protects services from unintended consequences arising from bad input, such as SQL injection or buffer overflow errors, or other unintended failures caused by missing parameters or invalid data types. Offloading this security check to the API Gateway provides an early line of defense as potentially bad requests are not proxied to your upstream services.

#### Offloading contract enforcement

You can ensure that client requests adhere to a defined contract specifying mandatory headers or parameters before sending requests upstream. Performing these validation checks in the API Gateway allows API developers to focus on core domain logic.

#### Supporting data transformation

Validation goes hand-in-hand with request [header]({{< ref "transform-traffic/request-headers" >}}) and [body]({{< ref "transform-traffic/request-body" >}}) transformation by ensuring that a request complies with the expected schema prior to transformation. For example, you could validate that a date parameter is present, then transform it into a different date format as required by your upstream API dynamically on each request.

## How request validation works

The incoming request is compared with a defined schema, which is a structured description of the expected format for requests to the endpoint. This request schema defines the required and optional elements such as headers, path/query parameters, payloads and their data types. It acts as a contract for clients.

If the incoming request does not match the schema, it will be rejected with an `HTTP 422 Unprocessable Entity` error. This error code can be customized if required.

When using [Tyk OAS APIs]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}), request validation is performed by the `Validate Request` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the OpenAPI description of the endpoint. All elements of the request can have a `schema` defined in the OpenAPI description so requests to Tyk OAS APIs can be validated for headers, path/query parameters and body (payload).

When using the legacy [Tyk Classic APIs]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}), request validation is performed by the `Validate JSON` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the middleware configuration and is limited to the request body (payload). Request headers and path/query parameters cannot be validated when using Tyk Classic APIs.

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the request validation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the request validation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Validate Request middleware summary
  - The Validate Request middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Validate Request middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->
 

# Using the Request Validation middleware with Tyk Classic APIs

The [request validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

When working with legacy Tyk Classic APIs, request validation is performed by the `Validate JSON` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the middleware configuration and is limited to the request body (payload). Request headers and path/query parameters cannot be validated when using Tyk Classic APIs.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `validate_json` object to the `extended_paths` section of your API definition.

The `validate_json` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `schema`: the [JSON schema](https://json-schema.org/understanding-json-schema/basics) against which the request body will be compared
- `error_response_code`: the HTTP status code that will be returned if validation fails (defaults to `422 Unprocessable Entity`)

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "validate_json": [
            {
                "disabled": false,
                "path": "/register",
                "method": "POST",
                "schema": {
                    "type": "object",
                    "properties": {
                        "firstname": {
                            "type": "string",
                            "description": "The person's first name"
                        },
                        "lastname": {
                            "type": "string",
                            "description": "The person's last name"
                        }
                    }
                },
                "error_response_code": 422
            }
        ]
    }
}
```

In this example the Validate JSON middleware has been configured for requests to the `POST /register` endpoint. For any call made to this endpoint, Tyk will compare the request body with the schema and, if it does not match, the request will be rejected with the error code `HTTP 422 Unprocessable Entity`.

{{< note success >}}

**Note**  

The Validate JSON middleware supports JSON Schema `draft-04`. Using another version will return an `unsupported schema error, unable to validate` error in the Tyk Gateway logs.

{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request validation middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to validate the request payload. Select the **Validate JSON** plugin.

{{< img src="/img/2.10/validate_json.png" alt="validate json plugin" >}}

#### Step 2: Configure the middleware

Once you have selected the request validation middleware for the endpoint, you can select an error code from the drop-down list (if you don't want to use the default `422 Unprocessable Entity`) and enter your JSON schema in the editor.

{{< img src="/img/dashboard/endpoint-designer/validate-json-schema.png" alt="Adding schema to the Validate JSON middleware" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic). To configure the request validation middleware you must add a new `validate_json` object to the `extended_paths` section of your API definition, for example:

The example API Definition below configures an API to listen on path `/httpbin` and forwards requests upstream to http://httpbin.org.

In this example, the Validate JSON middleware has been configured for requests to the `GET /get` endpoint. For any call made to this endpoint, Tyk will compare the request body with the schema and, if it does not match, the request will be rejected with the error code `HTTP 422 Unprocessable Entity`.

```yaml  {linenos=true, linenostart=1, hl_lines=["26-41"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-json-schema-validation
spec:
  name: httpbin-json-schema-validation
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          validate_json:
            - error_response_code: 422
              disabled: false
              path: /get
              method: GET
              schema:
                properties:
                  userName:
                    type: string
                    minLength: 2
                  age:
                    type: integer
                    minimum: 1
                required:
                  - userName
                type: object
```



### Using the Request Validation middleware with Tyk OAS APIs


The [request validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints. If the incoming request fails validation, the Tyk Gateway will reject the request with an `HTTP 422 Unprocessable Entity` response. Tyk can be [configured](#configuring-the-request-validation-middleware) to return a different HTTP status code if required. 

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) page.

## Request schema in OpenAPI Specification

The OpenAPI Specification supports the definition of a [schema](https://learn.openapis.org/specification/content.html#the-schema-object) to describe and limit the content of any field in an API request or response.

Tyk's request validation middleware automatically parses the schema for the request in the OpenAPI description part of the Tyk OAS API Definition and uses this to compare against the incoming request.

An OpenAPI schema can reference other schemas defined elsewhere, letting you write complex validations very efficiently since you don’t need to re-define the validation for a particular object every time you wish to refer to it. Tyk only supports local references to schemas (within the same OpenAPI document).

As explained in the OpenAPI [documentation](https://learn.openapis.org/specification/parameters.html), the structure of an API request is described by two components:
- parameters (headers, query parameters, path parameters)
- request body (payload)

### Request parameters

The `parameters` field in the OpenAPI description is an array of [parameter objects](https://swagger.io/docs/specification/describing-parameters/) that each describe one variable element in the request. Each `parameter` has two mandatory fields:
- `in`: the location of the parameter (`path`, `query`, `header`)
- `name`: a unique identifier within that location (i.e. no duplicate header names for a given operation/endpoint)

There are also optional `description` and `required` fields.

For each parameter, a schema can be declared that defines the `type` of data that can be stored (e.g. `boolean`, `string`) and any `example` or `default` values. 

#### Operation (endpoint-level) parameters

An operation is a combination of HTTP method and path or, as Tyk calls it, an endpoint - for example `GET /users`. Operation, or endpoint-level parameters can be defined in the OpenAPI description and will apply only to that operation within the API. These can be added or modified within Tyk Dashboard's [API designer](#configuring-the-middleware-in-the-api-designer).

#### Common (path-level) parameters

[Common parameters](https://swagger.io/docs/specification/v3_0/describing-parameters/#common-parameters), that apply to all operations within a path, can be defined at the path level within the OpenAPI description. Tyk refers to these as path-level parameters and displays them as read-only fields in the Dashboard's API designer. If you need to add or modify common parameters you must use the *Raw Definition* editor, or edit your OpenAPI document outside Tyk and [update]({{< ref "/getting-started/using-oas-definitions/update-an-oas-api" >}}) the API.

### Request body

The `requestBody` field in the OpenAPI description is a [Request Body Object](https://swagger.io/docs/specification/describing-request-body/). This has two optional fields (`description` and `required`) plus the `content` section which allows you to define a schema for the expected payload. Different schemas can be declared for different media types that are identified by content-type (e.g. `application/json`, `application/xml` and `text/plain`).

## Configuring the request validation middleware

When working with Tyk OAS APIs, the request validation middleware automatically determines the validation rules based on the API schema. The only configurable option for the middleware is to set the desired HTTP status code that will be returned if a request fails validation. The default response will be `HTTP 422 Unprocessable Entity` unless otherwise configured.

## Enabling the request validation middleware

If the middleware is enabled for an endpoint, then Tyk will automatically validate requests made to that endpoint against the schema defined in the API definition.

When you create a Tyk OAS API by importing your OpenAPI description, you can instruct Tyk to enable request validation [automatically](#automatically-enabling-the-request-validation-middleware) for all endpoints with defined schemas.

If you are creating your API without import, or if you only want to enable request validation for some endpoints, you can [manually enable](#manually-enabling-the-request-validation-middleware) the middleware in the Tyk OAS API definition.

### Automatically enabling the request validation middleware

The request validation middleware can be enabled for all endpoints that have defined schemas when [importing]({{< ref "getting-started/using-oas-definitions/import-an-oas-api#tutorial-5-create-an-api-that-validates-the-request-payload" >}}) an OpenAPI Document to create a Tyk OAS API.
- if you are using the `POST /apis/oas/import` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) or [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) then you can do this by setting the `validateRequest=true` query parameter
- if you are using the API Designer, select the **Auto-generate middleware to validate requests** option on the **Import API** screen

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-import.png" alt="Select the option during OpenAPI import to validate requests" >}}

As noted, the automatic application of request validation during import will apply the middleware to all endpoints declared in your OpenAPI description. If you want to adjust this configuration, for example to remove validation from specific endpoints or to change the HTTP status code returned on error, you can update the Tyk OAS API definition as described [here](#manually-enabling-the-request-validation-middleware).

### Manually enabling the request validation middleware

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The request validation middleware (`validateRequest`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId`. The `operationId` for an endpoint can be found within the `paths` section of your [OpenAPI specification](https://swagger.io/docs/specification/paths-and-operations/?sbsearch=operationIds).

The `validateRequest` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `errorResponseCode`: [optional] the HTTP status code to be returned if validation fails (this defaults to `HTTP 422 Unprocessable Entity` if not set)

For example:
```json {hl_lines=["69-72"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-validate-request",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "parameters": [
                    {
                        "in": "header",
                        "name": "X-Security",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],                
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "firstname": {
                                        "description": "The person's first name",
                                        "type": "string"
                                    },
                                    "lastname": {
                                        "description": "The person's last name",
                                        "type": "string"
                                    }
                                },
                            "type": "object"
                            }
                        }
                    }
                },
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
            "name": "example-validate-request",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-validate-request/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "validateRequest": {
                        "enabled": true,
                        "errorResponseCode": 400
                    }
                }
            }
        }
    }
}
```

In this example the request validation middleware has been configured for requests to the `GET /anything` endpoint. The middleware will check for the existence of a header named `X-Security` and the request body will be validated against the declared schema. If there is no match, the request will be rejected and Tyk will return `HTTP 400` (as configured in `errorResponseCode`).

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the request validation middleware.

## Configuring the middleware in the API Designer

Adding and configuring Request Validation for your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Validate Request middleware

Select **ADD MIDDLEWARE** and choose **Validate Request** from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request.png" alt="Adding the Validate Request middleware" >}}

The API Designer will show you the request body and request parameters schema detected in the OpenAPI description of the endpoint.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-added.png" alt="Validate Request middleware schema is automatically populated" >}}

#### Step 3: Configure the middleware

If required, you can select an alternative HTTP status code that will be returned if request validation fails.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-config.png" alt="Configuring the Request Validation error response" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.


##### Virtual Endpoint examples


Here we offer some examples to demonstrate valid use of JavaScript within Virtual Endpoints. You can either copy and paste the JavaScript code into the code editor in the Tyk Dashboard API Designer, or create a file and place it in a subdirectory of the Tyk configuration environment (for example under the `middleware` folder in your Tyk installation).

For instruction on how to configure the Virtual Endpoint middleware for your APIs, please see the appropriate documentation for the format of API that you are using:
- [Tyk OAS API]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}})
- [Tyk Classic API]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}})

## Example 1: Accessing Tyk data objects

In this example, we demonstrate how you can access different [external Tyk objects]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#accessing-external-and-dynamic-data" >}}) (API request, session key, API definition).

1. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```javascript
function myFirstVirtualHandler (request, session, config) {
  log("Virtual Test running")
  
  log("Request Body: " + request.Body)
  log("Session: " + JSON.stringify(session.allowance))
  log("Config: " + JSON.stringify(config.APIID))
  log("param-1: " + request.Params["param1"]) // case sensitive
  log("auth Header: " + request.Headers["Authorization"]) // case sensitive
  
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #1",
    Headers: {
      "x-test": "virtual-header",
      "x-test-2": "virtual-header-2"
    },
    Code: 200
  }
  
  return TykJsResponse(responseObject, session.meta_data)   
}
log("Virtual Test initialised")
```

2. Make a call to your API endpoint passing a request body, a value in the `Authorization` header and a query parameter `param1`.

3. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:39:00 GMT
Server: tyk
X-Test: virtual-header
X-Test-2: virtual-header-2
Content-Length: 27
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #1
```

4. The gateway logs will include:

```text
time="" level=info msg="Virtual Test running" prefix=jsvm type=log-msg
time="" level=info msg="Request Body: <your-request-body>" prefix=jsvm type=log-msg
time="" level=info msg="Session: <allowance-from-your-session-key>" prefix=jsvm type=log-msg
time="" level=info msg="Config: <your-APIID>" prefix=jsvm type=log-msg
time="" level=info msg="param-1: <your_query_parameter>" prefix=jsvm type=log-msg
time="" level=info msg="auth Header: <your-auth-header>" prefix=jsvm type=log-msg
```

## Example 2: Accessing custom attributes in the API Definition

You can add [custom attributes]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide#adding-custom-attributes-to-the-api-definition" >}}) to the API definition and access these from within your Virtual Endpoint.

1. Add the following custom attributes to your API definition:

```json
{
  "string": "string",
  "map": {
    " key": 3
  },
  "num": 4
}
```

2. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```js
function mySecondVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #2",
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
      Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

3. Make a call to your API endpoint.

4. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:29:12 GMT
Foo-Header: bar
Map-Header: {" key":3}
Num-Header: 4
Server: tyk
String-Header: string
Content-Length: 26
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #2
```

## Example 3: Advanced example

In this example, every line in the script gives an example of a functionality usage, including:

- how to get form param
- how to get to a specific key inside a JSON variable
- the structure of the request object
- using `TykMakeHttpRequest` to make an HTTP request from within the virtual endpoint, and the json it returns - `.Code` and `.Body`.

```js
function myVirtualHandlerGetHeaders (request, session, config) {
  rawlog("Virtual Test running")
    
  //Usage examples:
  log("Request Session: " + JSON.stringify(session))
  log("API Config:" + JSON.stringify(config))
 
  log("Request object: " + JSON.stringify(request))   
  log("Request Body: " + JSON.stringify(request.Body))
  log("Request Headers:" + JSON.stringify(request.Headers))
  log("param-1:" + request.Params["param1"])
    
  log("Request header type:" + typeof JSON.stringify(request.Headers))
  log("Request header:" + JSON.stringify(request.Headers.Location))
    

  //Make api call to upstream target
  newRequest = {
    "Method": "GET",
    "Body": "",
    "Headers": {"location":JSON.stringify(request.Headers.Location)},
    "Domain": "http://httpbin.org",
    "Resource": "/headers",
    "FormData": {}
  };
  rawlog("--- before get to upstream ---")
  response = TykMakeHttpRequest(JSON.stringify(newRequest));
  rawlog("--- After get to upstream ---")
  log("response type: " + typeof response);
  log("response: " + response);
  usableResponse = JSON.parse(response);
  var bodyObject = JSON.parse(usableResponse.Body);
    
  var responseObject = {
    //Body: "THIS IS A VIRTUAL RESPONSE",
    Body: "yo yo",
    Headers: {
      "test": "virtual",
      "test-2": "virtual",
      "location" : bodyObject.headers.Location
    },
    Code: usableResponse.Code
  }
    
  rawlog("Virtual Test ended")
  return TykJsResponse(responseObject, session.meta_data)   
}
```

#### Running the Advanced example

You can find a Tyk Classic API definition [here](https://gist.github.com/letzya/5b5edb3f9f59ab8e0c3c614219c40747) that includes the advanced example, with the JS encoded `inline` within the middleware config for the `GET /headers` endpoint.

Create a new Tyk Classic API using that API definition and then run the following command to send a request to the API endpoint:

```bash
curl http://tyk-gateway:8080/testvirtualendpoint2/headers -H "location: /get" -v
```

This should return the following:

```bash
Trying 127.0.0.1...
TCP_NODELAY set
Connected to tyk-gateway (127.0.0.1) port 8080 (#0)
GET /testvirtualendpoint2/headers HTTP/1.1
Host: tyk-gateway:8080
User-Agent: curl/7.54.0
Accept: */*
location: /get

HTTP/1.1 200 OK
Date: Fri, 08 Jun 2018 21:53:57 GMT
**Location: /get**
Server: tyk
Test: virtual
Test-2: virtual
Content-Length: 5
Content-Type: text/plain; charset=utf-8

Connection #0 to host tyk-gateway left intact
yo yo
```

#### Checking the Tyk Gateway Logs

The `log` and `rawlog` commands in the JS function write to the Tyk Gateway logs. If you check the logs you should see the following:

```text
[Jun 13 14:45:21] DEBUG jsvm: Running: myVirtualHandlerGetHeaders
Virtual Test running
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Session: {"access_rights":null,"alias":"","allowance":0,"apply_policies":null,"apply_policy_id":"","basic_auth_data":{"hash_type":"","password":""},"certificate":"","data_expires":0,"enable_detail_recording":false,"expires":0,"hmac_enabled":false,"hmac_string":"","id_extractor_deadline":0,"is_inactive":false,"jwt_data":{"secret":""},"last_check":0,"last_updated":"","meta_data":null,"monitor":{"trigger_limits":null},"oauth_client_id":"","oauth_keys":null,"org_id":"","per":0,"quota_max":0,"quota_remaining":0,"quota_renewal_rate":0,"quota_renews":0,"rate":0,"session_lifetime":0,"tags":null} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: API Config:{"APIID":"57d72796c5de45e649f22da390d7df43","OrgID":"5afad3a0de0dc60001ffdd07","config_data":{"bar":{"y":3},"foo":4}} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request object: {"Body":"","Headers":{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]},"Params":{"param1":["I-am-param-1"]},"URL":"/testvirtualendpoint2/headers"} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Body: "" type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Headers:{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: param-1:I-am-param-1 type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header type:[object Object] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header: ["/get"] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: object type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: string type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location: /get type=log-msg
--- before get to upstream ---
--- After get to upstream ---
[Jun 13 14:45:22]  INFO jsvm-logmsg: response type: string type=log-msg
[Jun 13 14:45:22]  INFO jsvm-logmsg: response: {"Code":200,"Body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","Headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]},"code":200,"body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]}} type=log-msg
Virtual Test ended
[Jun 13 14:45:22] DEBUG JSVM Virtual Endpoint execution took: (ns) 191031553
```

## Example 4: Aggregating upstream calls using batch processing

One of the most common use cases for virtual endpoints is to provide some form of aggregate data to your users, combining the responses from multiple upstream service calls. This virtual endpoint function will do just that using the batch processing function from the [JavaScript API]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api" >}})

```js
function batchTest(request, session, config) {
  // Set up a response object
  var response = {
    Body: "",
    Headers: {
      "test": "virtual-header-1",
      "test-2": "virtual-header-2",
      "content-type": "application/json"
    },
    Code: 200
  }
    
  // Batch request
  var batch = {
    "requests": [
      {
        "method": "GET",
        "headers": {
          "x-tyk-test": "1",
          "x-tyk-version": "1.2",
          "authorization": "1dbc83b9c431649d7698faa9797e2900f"
        },
        "body": "",
        "relative_url": "http://httpbin.org/get"
      },
      {
        "method": "GET",
        "headers": {},
        "body": "",
        "relative_url": "http://httpbin.org/user-agent"
      }
    ],
    "suppress_parallel_execution": false
  }
    
  log("[Virtual Test] Making Upstream Batch Request")
  var newBody = TykBatchRequest(JSON.stringify(batch))
    
  // We know that the requests return JSON in their body, lets flatten it
  var asJS = JSON.parse(newBody)
  for (var i in asJS) {
    asJS[i].body = JSON.parse(asJS[i].body)
  }
    
  // We need to send a string object back to Tyk to embed in the response
  response.Body = JSON.stringify(asJS)
    
  return TykJsResponse(response, session.meta_data)
    
}
log("Batch Test initialised")                
```


### Tyk Virtual Endpoints

Tyk's Virtual Endpoint is a programmable middleware component that is invoked towards the end of the request processing chain. It can be enabled at the per-endpoint level and can perform complex interactions with your upstream service(s) that cannot be handled by one of the other middleware components.

Virtual endpoint middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The Virtual Endpoint is an extremely powerful feature that is unique to Tyk and provides exceptional flexibility to your APIs.

## When to use virtual endpoints

#### Aggregating data from multiple services

From a virtual endpoint, you can make calls out to other internal and upstream APIs. You can then aggregate and process the responses, returning a single response object to the originating client. This allows you to configure a single externally facing API to simplify interaction with multiple internal services, leaving the heavy lifting to Tyk rather than starting up an aggregation service within your stack.

#### Enforcing custom policies

Tyk provides a very flexible [middleware chain]({{< ref "concepts/middleware-execution-order" >}}) where you can combine functions to implement the access controls you require to protect your upstream services. Of course, not all scenarios can be covered by Tyk's standard middleware functions, but you can use a virtual endpoint to apply whatever custom logic you require to optimize your API experience.

#### Dynamic Routing

With a virtual endpoint you can implement complex dynamic routing of requests made to a single external endpoint on to different upstream services. The flexibility of the virtual endpoint gives access to data within the request (including the key session) and also the ability to make calls to other APIs to make decisions on the routing of the request. It can operate as a super-powered [URL rewrite]({{< ref "transform-traffic/url-rewriting" >}}) middleware.

## How virtual endpoints work

The virtual endpoint middleware provides a JavaScript engine that runs the custom code that you provide either inline within the API definition or in a source code file accessible to the Gateway. The JavaScript Virtual Machine (JSVM) provided in the middleware is a traditional ECMAScript5 compatible environment which does not offer the more expressive power of something like Node.js.

The virtual endpoint terminates the request, so the JavaScript function must provide the response to be passed to the client. When a request hits a virtual endpoint, the JSVM executes the JavaScript code which can modify the request, make calls to other APIs or upstream services, process data, and ultimately determines the response returned to the client.

{{< note success >}}
**Note**

You will need to enable Tyk's JavaScript Virtual Machine by setting `enable_jsvm` to `true` in your `tyk.conf` [file]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}) for your virtual endpoints to work.
{{< /note >}}

## Scripting virtual endpoint functions

The [middleware scripting guide]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}}) provides guidance on writing JS functions for your virtual endpoints, including how to access key session data and custom attributes from the API definition.

#### Function naming

The virtual endpoint middleware will invoke a named function within the JS code that you provide (either inline or in a file). Both the filename and function name are configurable per endpoint, but note that function names must be unique across your API portfolio because all plugins run in the same virtual machine. This means that you can share a single function definition across multiple endpoints and APIs but you cannot have two different functions with the same name (this applies across all [JavaScript middleware components]({{< ref "plugins/supported-languages/javascript-middleware" >}})).

Inline mode is mainly used by the dashboard to make code injection easier on multiple node deployments.

## Virtual endpoint library

We have put together a [library](https://github.com/TykTechnologies/custom-plugins#virtual-endpoints) of JS functions that you could use in your virtual endpoints. We welcome submissions from the Tyk community so if you've created a function that you think would be useful to other users, please open an issue in the Github repository and we can discuss bringing it into the library.

{{< note success >}}
**Note**

Virtual endpoints are not available in Tyk Cloud Classic.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the virtual endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the virtual endpoint middleware [here]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Virtual Endpoint middleware summary
  - The Virtual Endpoint middleware is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Virtual Endpoint middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->


# Using the Virtual Endpoint middleware with Tyk Classic APIs


The [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

If you want to use Virtual Endpoints, you must [enable Tyk's JavaScript Virtual Machine]({{< ref "tyk-oss-gateway/configuration#enable_jsvm" >}}) by setting `enable_jsvm` to `true` in your `tyk.conf` file.

To enable the middleware you must add a new `virtual` object to the `extended_paths` section of your API definition.

The `virtual` object has the following configuration:

- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `response_function_name`: this is the name of the JavaScript function that will be executed when the virtual endpoint is triggered
- `function_source_type`: instructs the middleware to look for the JavaScript code either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded code) is provided in `function_source_uri`
- `function_source_uri`: if `function_source_type` is set to `file`, this will be the relative path to the source file containing the JavaScript code; if `function_source_type` if set to `blob`, this will be a `base64` encoded string containing the JavaScript code
- `use_session`: a boolean that indicates whether the virtual endpoint should have access to the session object; if `true` then the key session data will be provided to the function as the `session` variable
- `proxy_on_error`: a boolean that determines the behavior of the gateway if an error occurs during the execution of the virtual endpoint's function; if set to `true` the request will be proxied to upstream if the function errors, if set to `false` the request will not be proxied and Tyk will return an error response

For example:

```json {linenos=true, linenostart=1}
{
    "extended_paths": {
        "virtual": [
            {
                "response_function_name": "myUniqueFunctionName",
                "function_source_type": "blob",
                "function_source_uri": "ZnVuY3Rpb24gbXlVbmlxdWVGdW5jdGlvbk5hbWUocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7CiB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IAogIEJvZHk6ICJUSElTIElTIEEgVklSVFVBTCBSRVNQT05TRSIsIAogIENvZGU6IDIwMCAKIH0KIHJldHVybiBUeWtKc1Jlc3BvbnNlKHJlc3BvbnNlT2JqZWN0LCBzZXNzaW9uLm1ldGFfZGF0YSkKfQ==",
                "path": "/anything",
                "method": "GET",
                "use_session": false,
                "proxy_on_error": false
            }
        ]
    }
}
```

In this example the Virtual Endpoint middleware has been configured for requests to the `GET /anything` endpoint. For any call made to this endpoint, Tyk will invoke the function `myUniqueFunctionName` that is `base64` encoded in the `function_source_uri` field. This virtual endpoint does not require access to the session data and will not proxy the request on to the upstream if there is an error when processing the `myUniqueFunctionName` function.

Decoding the value in `function_source_uri` we can see that the JavaScript code is:

```js {linenos=true, linenostart=1}
function myUniqueFunctionName(request, session, config) {
 var responseObject = { 
  Body: "THIS IS A VIRTUAL RESPONSE", 
  Code: 200 
 }
 return TykJsResponse(responseObject, session.meta_data)
}
```

This function will terminate the request without proxying it to the upstream returning `HTTP 200` as follows:

```bash
HTTP/1.1 200 OK
Date: Wed, 28 Feb 2024 20:52:30 GMT
Server: tyk
Content-Type: text/plain; charset=utf-8
Content-Length: 26
 
THIS IS A VIRTUAL RESPONSE
```

If, however, we introduce an error to the JavaScript, such that Tyk fails to process the function, we will receive an `HTTP 500 Internal Server Error` as follows:

```bash
HTTP/1.1 500 Internal Server Error
Date: Wed, 28 Feb 2024 20:55:27 GMT
Server: tyk
Content-Type: application/json
Content-Length: 99
 
{
"error": "Error during virtual endpoint execution. Contact Administrator for more details."
}
```

If we set `proxy_on_error` to `true` and keep the error in the Javascript, the request will be forwarded to the upstream and Tyk will return the response received from that service.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure a virtual endpoint for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to trigger the virtual endpoint. Select the **Virtual Endpoint** plugin.

{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-middleware.png" alt="Selecting the middleware" >}}

#### Step 2: Configure the middleware

Once you have selected the virtual endpoint middleware for the endpoint, you need to supply:

- JS function to call
- Source type (`file` or `inline`)

If you select source type `file` you must provide the path to the file:
{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-file.png" alt="Configuring file based JS code" >}}

If you select `inline` you can enter the JavaScript code in the Code Editor window.
{{< img src="/img/dashboard/endpoint-designer/virtual-endpoint-inline.png" alt="Configuring inline JS code" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the Virtual Endpoint middleware.

{{< note success >}}
**Note**

The Tyk Classic API Designer does not provide options to configure `use_session` or `proxy_on_error`, but you can do this from the Raw Definition editor.
{{< /note >}}

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring a virtual endpoint using Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic)

The example API Definition below configures an API to listen on path `/httpbin` and forwards requests upstream to `http://httpbin.org`. The Virtual Endpoint middleware has been configured for requests to the `GET /virtual` endpoint. For any call made to this endpoint, Tyk will invoke the function `myVirtualHandler` that is base64 encoded in the `function_source_uri` field. This virtual endpoint does not require access to the session data and will not proxy the request on to the upstream if there is an error when processing the `myVirtualHandler` function.

```yaml {linenos=true, linenostart=1, hl_lines=["23-35"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: test-config-data-test
spec:
  name: test-config-data-test
  protocol: http
  proxy:
    listen_path: /httpbin/
    target_url: http://httpbin.org
    strip_listen_path: true
  active: true
  use_keyless: true
  enable_context_vars: true
  version_data:
    default_version: Default
    not_versioned: false
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          virtual:
            - function_source_type: blob
              response_function_name: myVirtualHandler
              function_source_uri: "ZnVuY3Rpb24gbXlWaXJ0dWFsSGFuZGxlciAocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7ICAgICAgCiAgdmFyIHJlc3BvbnNlT2JqZWN0ID0gewogICAgQm9keTogIlRISVMgSVMgQSAgVklSVFVBTCBSRVNQT05TRSIsCiAgICBIZWFkZXJzOiB7CiAgICAgICJmb28taGVhZGVyIjogImJhciIsCiAgICAgICJtYXAtaGVhZGVyIjogSlNPTi5zdHJpbmdpZnkoY29uZmlnLmNvbmZpZ19kYXRhLm1hcCksCiAgICAgICJzdHJpbmctaGVhZGVyIjogY29uZmlnLmNvbmZpZ19kYXRhLnN0cmluZywKICAgICAgIm51bS1oZWFkZXIiOiBKU09OLnN0cmluZ2lmeShjb25maWcuY29uZmlnX2RhdGEubnVtKQogICAgfSwKICAgICAgQ29kZTogMjAwCiAgfQogIHJldHVybiBUeWtKc1Jlc3BvbnNlKHJlc3BvbnNlT2JqZWN0LCBzZXNzaW9uLm1ldGFfZGF0YSkKfQ=="
              path: /virtual
              method: GET
              use_session: false
              proxy_on_error: false
  config_data:
    string: "string"
    map:
      key: 3
    num: 4
```

Decoding the value in `function_source_uri` we can see that the JavaScript code is:

```javascript
function myVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "THIS IS A  VIRTUAL RESPONSE",
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
    Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

This function will terminate the request without proxying it to the upstream, returning HTTP 200 as follows:

```bash
HTTP/1.1 200 OK
Date: Wed, 14 Aug 2024 15:37:46 GMT
Foo-Header: bar
Map-Header: {"key":3}
Num-Header: 4
Server: tyk
String-Header: string
Content-Length: 27
Content-Type: text/plain; charset=utf-8
 
THIS IS A VIRTUAL RESPONSE
```

If, however, we introduce an error to the JavaScript, such that Tyk fails to process the function, we will receive an HTTP 500 Internal Server Error as follows:

```bash
HTTP/1.1 500 Internal Server Error
Date: Wed, 14 Aug 2024 15:37:46 GMT
Server: tyk
Content-Type: application/json
Content-Length: 99
 
{
"error": "Error during virtual endpoint execution. Contact Administrator for more details."
}
```

If we set `proxy_on_error` to `true` and keep the error in the Javascript, the request will be forwarded to the upstream and Tyk will return the response received from that service.


### Using the Virtual Endpoint middleware with Tyk OAS APIs

The [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The virtual endpoint middleware (`virtualEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `virtualEndpoint` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `functionName`: the name of the JavaScript function that will be executed when the virtual endpoint is triggered
- `body`: [optional] a `base64` encoded string containing the JavaScript code
- `path`: [optional] the relative path to the source file containing the JavaScript code
- `proxyOnError`: [optional, defaults to `false`] a boolean that determines the behavior of the gateway if an error occurs during the execution of the virtual endpoint's function; if set to `true` the request will be proxied to upstream if the function errors, if set to `false` the request will not be proxied and Tyk will return an error response 
- `requireSession`: [optional defaults to `false`] a boolean that indicates whether the virtual endpoint should have access to the session object; if `true` then the key session data will be provided to the function as the `session` variable

{{< note success >}}
**Note**

One of either `path` or `body` must be provided, depending on whether you are providing the JavaScript code in a file or inline within the API definition. If both are provided then `body` will take precedence.
{{< /note >}}

For example:

```json {hl_lines=["39-50", "54-58"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-virtual-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-virtual-endpoint",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-virtual-endpoint/",                
                "strip": true
            }
        },      
        "middleware": {
            "global": {
                "pluginConfig": {
                    "data": {
                        "enabled": true,
                        "value": {
                            "map": {
                                "key": 3
                            },
                        "num": 4,
                        "string": "example"
                        }
                    }
                }
            },
            "operations": {
                "anythingget": {
                    "virtualEndpoint": {
                        "enabled": true,
                        "functionName": "myVirtualHandler",
                        "body": "ZnVuY3Rpb24gbXlWaXJ0dWFsSGFuZGxlciAocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7ICAgICAgCiAgdmFyIHJlc3BvbnNlT2JqZWN0ID0gewogICAgQm9keTogIlZpcnR1YWwgRW5kcG9pbnQgIitjb25maWcuY29uZmlnX2RhdGEuc3RyaW5nLAogICAgSGVhZGVyczogewogICAgICAiZm9vLWhlYWRlciI6ICJiYXIiLAogICAgICAibWFwLWhlYWRlciI6IEpTT04uc3RyaW5naWZ5KGNvbmZpZy5jb25maWdfZGF0YS5tYXApLAogICAgICAic3RyaW5nLWhlYWRlciI6IGNvbmZpZy5jb25maWdfZGF0YS5zdHJpbmcsCiAgICAgICJudW0taGVhZGVyIjogSlNPTi5zdHJpbmdpZnkoY29uZmlnLmNvbmZpZ19kYXRhLm51bSkKICAgIH0sCiAgICBDb2RlOiAyMDAKICB9CiAgcmV0dXJuIFR5a0pzUmVzcG9uc2UocmVzcG9uc2VPYmplY3QsIHNlc3Npb24ubWV0YV9kYXRhKQp9"
                    }
                }
            }
        }
    }
}
```

In this example the virtual endpoint middleware has been configured for requests to the `GET /anything` endpoint. We have also configured the following custom attributes in the `pluginConfig` section of the API definition:

```json
{
    "map": {
        "key": 3
    },
    "num": 4,
    "string": "example"
}
```

The `body` field value is a `base64` encoded string containing this JavaScript code, which will be invoked by the virtual endpoint middleware:

```js
function myVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "Virtual Endpoint "+config.config_data.string,
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
    Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

A call to the `GET /anything` endpoint returns:

```bash
HTTP/1.1 200 OK
Date: Fri, 01 Mar 2024 12:14:36 GMT
Foo-Header: bar
Map-Header: {"key":3}
Num-Header: 4
Server: tyk
String-Header: example
Content-Length: 24
Content-Type: text/plain; charset=utf-8
 
Virtual Endpoint example
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the virtual endpoint middleware.

## Configuring the middleware in the API Designer

Adding a Virtual Endpoint to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Virtual Endpoint middleware

Select **ADD MIDDLEWARE** and choose **Virtual Endpoint** from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-virtual-endpoint.png" alt="Adding the Virtual Endpoint middleware" >}}

#### Step 3: Configure the middleware

Now you can provide either the path to a file containing the JavaScript function to be run by the middleare, or you can directly enter the JavaScript in the code editor.

For both sources, you must provide the **function name** that should be called when the middleware executes.

You can also optionally configure the behavior required if the function should return an error and also indicate to Tyk whether the virtual middleware requires access to the key session metadata.

{{< img src="/img/dashboard/api-designer/tyk-oas-virtual-endpoint-config.png" alt="Configuring the Virtual Endpoint middleware" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.


## Transform Traffic

### Request and response middleware


When you configure an API on Tyk, the Gateway will proxy all requests received at the listen path that you have defined through to the upstream (target) URL configured in the API definition. Responses from the upstream are likewise proxied on to the originating client. Requests and responses are processed through a powerful [chain of middleware]({{< ref "concepts/middleware-execution-order" >}}) that perform security and processing functions.

Within that chain are a highly configurable set of optional middleware that can, on a per-endpint basis:
- apply processing to [API requests](#middleware-applied-to-the-api-request) before they are proxied to the upstream service
- apply customization to the [API response](#middleware-applied-to-the-api-response) prior to it being proxied back to the client

Tyk also supports a powerful custom plugin feature that enables you to add custom processing at different stages in the processing chains. For more details on custom plugins please see the [dedicated guide]({{< ref "plugins" >}}).

## Middleware applied to the API Request

The following standard middleware can optionally be applied to API requests on a per-endpoint basis.

### Allow list

The [Allow List]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) middleware is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorized access to endpoints that are not explicitly permitted.

Enabling the allow list will cause the entire API to become blocked other than for endpoints that have this middleware enabled. This is great if you wish to have very strict access rules for your services, limiting access to specific published endpoints.

### Block list

The [Block List]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}})  middleware is a feature designed to prevent access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

### Cache

Tyk's [API-level cache]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache" >}}) does not discriminate between endpoints and will usually be configured to cache all safe requests. You can use the granular [Endpoint Cache]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache" >}}) to ensure finer control over which API responses are cached by Tyk.

### Circuit Breaker

The [Circuit Breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) is a protective mechanism that helps to maintain system stability by preventing repeated failures and overloading of services that are erroring. When a network or service failure occurs, the circuit breaker prevents further calls to that service, allowing the affected service time to recover while ensuring that the overall system remains functional.

### Do Not Track Endpoint

If [traffic logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic" >}}) is enabled for your Tyk Gateway, then it will create transaction logs for all API requests (and responses) to deployed APIs. You can use the [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) middleware to suppress creation of transaction records for specific endpoints.

### Enforced Timeout

Tyk’s [Enforced Timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) middleware can be used to apply a maximum time that the Gateway will wait for a response before it terminates (or times out) the request. This helps to maintain system stability and prevents unresponsive or long-running tasks from affecting the overall performance of the system.

### Ignore Authentication

Adding the [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware means that Tyk Gateway will not perform authentication checks on requests to that endpoint. This plugin can be very useful if you have a specific endpoint (such as a ping) that you don't need to secure.

### Internal Endpoint

The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway not to expose the endpoint externally. Tyk Gateway will then ignore external requests to that endpoint while continuing to process internal requests from other APIs; this is often used with the [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) functionality.

### Method Transformation

The [Method Transformation]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) middleware allows you to change the HTTP method of a request.

### Mock Response

A [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) is a simulated API response that can be returned by the API gateway without actually sending the request to the backend API. Mock responses are an integral feature for API development, enabling developers to emulate API behavior without the need for upstream execution.

### Request Body Transform

The [Request Body Transform]({{< ref "transform-traffic/request-body" >}}) middleware allows you to perform modification to the body (payload) of the API request to ensure that it meets the requirements of your upstream service.

### Request Header Transform

The [Request Header Transform]({{< ref "transform-traffic/request-headers" >}}) middleware allows you to modify the header information provided in the request before it leaves the Gateway and is passed to your upstream API.

### Request Size Limit

Tyk Gateway offers a flexible tiered system of limiting request sizes ranging from globally applied limits across all APIs deployed on the gateway down to specific size limits for individual API endpoints. The [Request Size Limit]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) middleware provides the most granular control over request size by enabling you to set different limits for individual endpoints.

### Request Validation

Tyk’s [Request Validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

When working with Tyk OAS APIs, the request validation covers both headers and body (payload); with the older Tyk Classic API style we can validate only the request body (payload).

### Track Endpoint

If you do not want to include all endpoints in your [Activity by Endpoint]({{< ref "product-stack/tyk-dashboard/advanced-configurations/analytics/activity-by-endpoint" >}}) statistics in Tyk Dashboard, you can enable this middleware for the endpoints to be included. 

### URL Rewrite

[URL Rewriting]({{< ref "transform-traffic/url-rewriting" >}}) in Tyk is a powerful feature that enables the modification of incoming API request paths to match the expected endpoint format of your backend services. This allows you to translate an outbound API interface to the internal structure of your services. It is a key capability used in [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}})

### Virtual Endpoint

Tyk’s [Virtual Endpoints]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) is a programmable middleware component that allows you to perform complex interactions with your upstream service(s) that cannot be handled by one of the other middleware components.

## Middleware applied to the API Response

The following transformations can be applied to the response recieved from the upstream to ensure that it contains the correct data and format expected by your clients.

### Response Body Transform

The [Response Body Transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware allows you to perform modification to the body (payload) of the response received from the upstream service to ensure that it meets the expectations of the client.

### Response Header Transform

The [Response Header Transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware allows you to modify the header information provided in the response before it leaves the Gateway and is passed to the client.


#### Tyk Classic API Endpoint Designer


Tyk Dashboard's Endpoint Designer provides a graphical environment for the creation and update of your Tyk Classic APIs.

The Endpoint Designer allows to configure all elements of your Tyk Classic API and consists of several tabs, plus a **Raw Definition** view which allows you to directly edit the Tyk Classic API Definition (in JSON format). Note that 

## Core Settings

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-core.png" alt="The Tyk Classic Endpoint Designer - Core Settings tab" >}}

The **Core Settings** tab provides access to configure basic settings for the API:
- [Detailed logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#tyk-classic" >}})
- API Settings including
   - Listen path
   - [API Categories]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories" >}})
- Upstream settings including
   - Upstream service (target) URL
   - [Service Discovery]({{< ref "planning-for-production/ensure-high-availability/service-discovery" >}})
- [API Ownership]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership" >}})
- [API level rate limiting]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting#configuring-the-rate-limiter-at-the-api-level" >}})
- [Authentication]({{< ref "basic-config-and-security/security/authentication-&-authorization" >}})

## Versions

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-versions.png" alt="The Tyk Classic Endpoint Designer - Versions tab" >}}

The **Versions** tab allows you to create and manage [API versioning]({{< ref "getting-started/key-concepts/versioning" >}}) for the API.

At the top of the Endpoint Designer, you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load its endpoint configuration into the editor.

## Endpoint Designer

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-endpoint.png" alt="The Tyk Classic Endpoint Designer - Endpoint Designer tab" >}}

The **Endpoint Designer** is where you can define endpoints for your API so that you can enable and configure Tyk middleware to [perform checks and transformations]({{< ref "advanced-configuration/transform-traffic" >}}) on the API traffic.

In some cases, you will want to set global settings that affect all paths that are managed by Tyk. The **Global Version Settings** section will enable you to configure API-level [request]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#tyk-classic-api" >}}) and [response]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#tyk-classic-api" >}}) header transformation.

## Advanced Options

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-advanced.png" alt="The Tyk Classic Endpoint Designer - Advanced Options tab" >}}

The **Advanced Options** tab is where you can configure Tyk's other powerful features including:
- Upstream certificate management
- [API-level caching]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache#configuring-the-cache-via-the-dashboard" >}}) including a button to invalidate (flush) the cache for the API
- [CORS]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}})
- Add custom attributes to the API definition as *config data* that can be accessed by middleware
- Enable [context variables]({{< ref "context-variables" >}}) so that they are extracted from requests and made available to middleware
- Manage *segment tags* if you are working with [sharded gateways]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud" >}})
- Manage client IP address [allow]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting" >}}) and [block]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting" >}}) lists
- Attach [webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will be triggered for different events

## Uptime Tests

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-uptime.png" alt="The Tyk Classic Endpoint Designer - Uptime Tests tab" >}}

In the **Uptime Tests** tab you can configure Tyk's [Uptime Test]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests" >}}) functionality

## Debugging

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-debugging.png" alt="The Tyk Classic Endpoint Designer - Debugging tab" >}}

The **Debugging** tab allows you to test your endpoints before you publish or update them. You can also use it for testing any middleware plugins you have implemented. Any debugging you create will persist while still in the current API, enabling you to make changes in the rest of the API settings without losing the debugging scenario.

The Debugging tab consists of the following sections:

- Request
- Response
- Logs

#### Request

{{< img src="/img/2.10/debugging_request.png" alt="Debugging Request" >}}

In this section, you can enter the following information:

- Method - select the method for your test from the drop-down list
- Path - your endpoint to test
- Headers/Body - enter any header information, such as Authorization, etc. Enter any body information. For example, entering user information if creating/updating a user.

Once you have entered all the requested information, click **Run**. Debugging Response and Log information will be displayed:

#### Response

{{< img src="/img/2.10/debugging_results.png" alt="Debugging Response" >}}

The Response section shows the JSON response to your request.

#### Logs

{{< img src="/img/2.10/debugging_logs.png" alt="Debugging Logs" >}}

The debugging level is set to **debug** for the request. This outputs all logging information in the Endpoint Designer. In the Tyk Gateway logs you will see a single request. Any Error messages will be displayed at the bottom of the Logs output.


##### "Transformation Use Case: SOAP To REST"


## Introduction

You can transform an existing SOAP service to a JSON REST service. This can be done from the Tyk Dashboard with no coding involved and should take around 10 minutes to perform the transform.

We also have a video which walks you through the SOAP to REST transform.

{{< youtube jeNXLzpKCaA >}}

## Prerequisites

An existing SOAP service and the WSDL definition. For this example, we will use:

- Upstream Target - [https://www.dataaccess.com/webservicesserver/numberconversion.wso](https://www.dataaccess.com/webservicesserver/numberconversion.wso)
- The WSDL definition from - [https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL](https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL)
- Postman Client (or other endpoint testing tool)

## Step 1: Import the WSDL API

1. Select APIs from the System Management menu

{{< img src="/img/2.10/apis_menu.png" alt="APIs Menu" >}}

2. Click Import API

{{< img src="/img/2.10/import_api_button.png" alt="Import API" >}}

3. Select **From WSDL** from the Import an API Definition window
4. In the **Upstream Target** field, enter `https://www.dataaccess.com/webservicesserver/numberconversion.wso` as listed in the Prerequisites.
5. Paste the WSDL definition from the link in Prerequisites
6. Click **Generate API**. You should now have an API named `NumberConversion` in your API list

{{< img src="/img/2.10/numberservice_api.png" alt="NumberService API" >}}

## Step 2: Add the transforms to an Endpoint

1. From the API list, select Edit from the Actions menu for the `NumberConversion` API
2. Select the **Endpoint Designer** tab. You should see 2 POST endpoints that were imported. We will apply the transforms to the `NumberToWords` endpoint.

{{< img src="/img/2.10/numberservice_endpoints.png" alt="Endpoints" >}}

3. Expand the `NumberToWords` endpoint. The following plugins should have been added as part of the import process.
  - URL rewrite
  - Track endpoint

{{< note success >}}
**Note**  

To make the URL a little friendlier, we're going to amend the Relative Path to just `/NumberToWords`. Update your API after doing this.
{{< /note >}}
4. Add the following plugins from the **Plugins** drop-down list:
  - Body transform
  - Modify headers

## Step 3: Modify the Body Transform Plugin

### Set up the Request

We use the `{{.FieldName}}` Golang template syntax to access the JSON request. For this template we will use `{{.numberToConvert}}`.

1. Expand the Body transform plugin. From the Request tab, copy the following into the Template section:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>{{.numberToConvert}}</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```

2. In the Input field, enter the following:

```json
{
    "numberToConvert": 35
}
```
{{< note success >}}
**Note**  

The '35' integer can be any number you want to convert
{{< /note >}}


1. Click **Test**. You should get the following in the Output field:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>35</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```
### Set up the Response

Again, for the response, we will be using the `{{.FieldName}}` syntax as the following `{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}`

1. For the Input Type, select XML

{{< img src="/img/2.10/body_trans_response_input.png" alt="Response Input Type" >}}

2. In the Template section enter:

```yaml
{
    "convertedNumber": "{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}"
}
```
3. Enter the following into the input field:

```xml
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <NumberToDollarsResponse xmlns="http://www.dataaccess.com/webservicesserver/">
      <NumberToDollarsResult>thirty five dollars</NumberToDollarsResult>
    </NumberToDollarsResponse>
  </soap12:Body>
</soap12:Envelope>
```
4. Click Test. You should get the following in the Output field:

```json
{
    "convertedNumber": "thirty five dollars"
}
```
## Step 5: Change the Content-Type Header

We now need to change the `content-type` header to allow the SOAP service to receive the payload in XML. We do this by using the **Modify header** plugin

1. Expand the Modify Header plugin
2. From the **Request** tab enter the following in the **Add this header** section
  - Header Name: `content-type`
  - Header Value: `text/xml`
3. Click Add 

{{< img src="/img/2.10/add_header_type.png" alt="Modify Header Request" >}}

4. From the **Response** tab enter the following in the **Add this header** section
  - Header Name: `content-type`
  - Header Value: `application/json`

{{< img src="/img/2.10/modify-header-response.png" alt="Modify Header Response" >}}

1. Click **Add**
2. Click **Update**

{{< img src="/img/2.10/update_number_conversion.png" alt="Update API" >}}

## Testing the Endpoint

You now need to test the endpoint. We are going to use Postman.

{{< note success >}}
**Note**  

We have not set up any Authentication for this API, it has defaulted to `Open (Keyless)`.
{{< /note >}}


1. Copy the URL for your NumberConversion API with the NumberToWords endpoint - `https://tyk-url/numberconversion/NumberToWords/`
2. Paste it as a POST URL in the Postman URL Request field
3. Enter the following as a raw Body request

```json
{
    "numberToConvert": 35
}
```
Your Postman request should look similar to below (apart from the URL used)

{{< img src="/img/2.10/postman_soap_rest.png" alt="Postman" >}}
