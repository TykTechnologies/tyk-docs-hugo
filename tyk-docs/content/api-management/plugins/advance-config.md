---
title: "Custom Plugins Advance Configuration"
date: 2025-01-10
tags: []
description: ""
keywords: []
aliases:
  - /plugins/get-started-selfmanaged/deploy-plugins
  - /product-stack/tyk-gateway/advanced-configurations/plugins/otel-plugins
---

## CICD - Automating Your Plugin Builds

It's very important to automate the deployment of your infrastructure.  

Ideally, you store your configurations and code in version control, and then through a trigger, have the ability to deploy everything automatically into higher environments.

With custom plugins, this is no different.

To illustrate this, we can look at the GitHub Actions of the [example repo][0].

We see that upon every pull request, a section of steps are taken to "Build, [Bundle]({{< ref "api-management/plugins/overview#plugin-bundles" >}}), Release Go Plugin".

Let's break down the [workflow file][1]:


### Compiling the Plugin

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

### Bundle The Plugin

The next step of the workflow is to "[bundle]({{< ref "api-management/plugins/overview#plugin-bundles" >}})" the plugin.

```
- name: Bundle Go Plugin
      run: docker-compose run --rm --user=1000 --entrypoint "bundle/bundle-entrypoint.sh" tyk-gateway
```

This command generates a "bundle" from the sample Go plugin in the repo.

{{< note success >}}
**Note**  

For added security, please consider signing your [bundles]({{< ref "api-management/plugins/overview#plugin-deployment-types" >}}), especially if the connection between the Gateways and the Bundler server traverses the internet.

{{< /note >}}


Custom plugins can be "bundled", (zipped/compressed) into a standard format, and then uploaded to some server so that they can be downloaded by the Gateways in real time.

This process allows us to decouple the building of our custom plugins from the runtime of the Gateways.

In other words, Gateways can be scaled up and down, and pointed at different plugin repos very easily.  This makes it easier to deploy Custom plugins especially in containerized environments such as Kubernetes, where we don't have to worry about persistent volumes.

You can read more about plugin bundles [here][3].

### Deploy The Plugin

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

For seamless deployments, take a look at multi-version [plugin support]({{< ref "tyk-cloud#configure-plugins" >}}) to enable zero downtime deployments of your Tyk Gateway installs

{{< /note >}}

### Configure the Gateway

In order to instruct the Gateway to download the bundle, we need two things:

1. The root server - The server which all bundles will be downloaded from.  This is set globally in the Tyk conf file [here]({{< ref "tyk-oss-gateway/configuration#enable_bundle_downloader" >}}).

2. The name of the bundle - this is generated during your workflow usually.  This is defined at the API level (this is where you declare Custom plugins, as evident in task 2)

The field of the API Definition that needs to be set is `custom_middleware_bundle`.

### Summary

That's it!  

We've set up our dev environment, built, compiled, a Custom Go plugin, loaded onto a Tyk Gateway, and tested it by sending an API request.  Finally, we've talked about deploying a Bundle in a production grade set up.

Have a look at our [examples repo][4] for more inspiration.

[0]: https://github.com/TykTechnologies/custom-go-plugin/actions
[1]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/.github/workflows/makefile.yml
[2]: https://github.com/TykTechnologies/custom-go-plugin/blob/master/Makefile#L59
[3]: https://github.com/TykTechnologies/custom-go-plugin#deploying-the-go-plugin
[4]: https://github.com/TykTechnologies/custom-plugin-examples

## Instrumenting Plugins with OpenTelemetry

By instrumenting your custom plugins with Tyk's *OpenTelemetry* library, you can gain additional insights into custom plugin behavior like time spent and exit status. Read on to see some examples of creating span and setting attributes for your custom plugins.

{{< note success >}}
**Note:**
Although this documentation is centered around Go plugins, the outlined principles are universally applicable to plugins written in other languages. Ensuring proper instrumentation and enabling detailed tracing will integrate the custom plugin span into the trace, regardless of the underlying programming language.
{{< /note >}}

### Prerequisites

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

And this field within your [API definition]({{< ref "api-management/gateway-config-introduction" >}}):

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

### Create a new span from the request context

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

### Modifying span name and set status

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

### Setting attributes

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

### Multiple functions = Multiple spans

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

### Error handling

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




