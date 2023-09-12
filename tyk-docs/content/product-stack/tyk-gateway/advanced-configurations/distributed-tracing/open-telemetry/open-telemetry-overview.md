---
title: "OpenTelemetry"
date: 2023-08-29T10:28:52+03:00
tags: ["otel", "opentelemetry"]
description: Overview page to introduce OpenTelemetry in Tyk
---

Since v5.2 of Tyk Gateway, you can now leverage the power of OpenTelemetry, a robust observability framework for cloud-native software. Enhance your API Gateway's monitoring capabilities with distributed tracing.

## Enabling OpenTelemetry in Two Steps

### Prerequisites

Before proceeding with the following steps, ensure that you have configured your OpenTelemetry backend as well as any necessary integrations. To configure your first integration with the OpenTelemetry collector go [here].

### Step 1: Enable at Gateway Level

First, enable OpenTelemetry in the Tyk Gateway. You can do this by editing the Tyk Gateway configuration file like so:

```json
{
  "opentelemetry": {
    "enabled": true
  }
}
```

You can also enable OpenTelemetry by setting the corresponding environment variable: `TYK_GW_OPENTELEMETRY_ENABLED`.

### Step 2: Enable detailed tracing at API Level (optional)

After enabling OpenTelemetry at the gateway level, you have the optional step of activating detailed tracing for specific APIs you wish to get more details from. If you choose to do this, edit the respective API definition and set the detailed_tracing option to either true or false. By default, this setting is set to false.

#### What trace details to expect

- When set to false:
  Setting `detailed_tracing` to `false` will generate a single span that encapsulates the entire request lifecycle. This span will include attributes and tags but will lack fine-grained details. Specifically, it will not show granular information like the time taken for individual middleware executions. The single span will represent the total time elapsed from when the gateway receives the request to when a response is sent back to the client. In this case, the trace will look as follows:

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-false.png" alt="Detailed Tracing Disabled" width="800px" >}}

- When set to true:
  With `detailed_tracing` set to `true`, OpenTelemetry will create a span for each middleware involved in the request processing. These spans will offer detailed insights such as the time each middleware took to execute and the sequence in which they were invoked. The spans are displayed in a waterfall model, revealing the hierarchy and sequence of middleware execution. This includes: pre-middlewares, post-middlewares, the round trip to the upstream server and the response middlewares. The illustration below shows an example trace:

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-true.png" alt="Detailed Tracing Enabled" width="800px" >}}

By selecting the appropriate setting, you can customize the level of tracing detail to suit your monitoring needs.

## Understanding your traces

Gaining a comprehensive understanding of your traces requires diving into both the specific operations being performed and the context in which they are executed. This is where attributes and tags come into play. To fully benefit from OpenTelemetry's capabilities, it's essential to grasp the two main types of attributes: **Span Attributes** and **Resource Attributes**.

### Span Attributes

A span is a named, timed operation that represents an operation. Multiple spans represent different parts of the workflow and are pieced together to create a trace. While each span includes a duration indicating how long the operation took, the span attributes provide additional contextual metadata.
Span attributes are key-value pairs that serve as metadata for individual spans. These attributes offer contextual information about the operations within a trace, such as the API involved, its organization ID, and more. Tyk automatically sets the following span attributes:

- `tyk.api.name`: API name.
- `tyk.api.orgid`: Organization ID.
- `tyk.api.id`: API ID.
- `tyk.api.path`: API listen path.
- `tyk.api.tags`: If tagging is enabled in the API definition, the tags are added here.

### Resource Attributes

In OpenTelemetry, resource attributes provide contextual information about the entity that produced the telemetry data. These are associated with the service or application as a whole. Conversely, span attributes are associated with specific operations, such as API requests.

#### Types of Resource Attributes

##### Service Attributes

The service attributes supported by Tyk are:

| Attribute             | Type   | Description                                                           | Example                                     |
| --------------------- | ------ | --------------------------------------------------------------------- | ------------------------------------------- |
| `service.name`        | String | Represents the service name                                           | `tyk-gateway`                               |
| `service.instance.id` | String | Unique ID of the service instance (NodeID in the case of the gateway) | `solo-6b71c2de-5a3c-4ad3-4b54-d34d78c1f7a3` |
| `service.version`     | String | Represents the service version                                        | `v5.2.0`                                    |

##### Gateway Attributes

The attributes related to the Tyk Gateway are:

| Attribute          | Type     | Description                                                                                      | Context   |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------ | --------- |
| `tyk.gw.id`        | String   | The Node ID assigned to the gateway                                                              | HTTP Span |
| `tyk.gw.dataplane` | Bool     | Whether the Tyk Gateway is hybrid (`slave_options.use_rpc=true`)                                 | HTTP Span |
| `tyk.gw.group.id`  | String   | Represents the `slave_options.group_id` of the gateway. Populated only if the gateway is hybrid. | HTTP Span |
| `tyk.gw.tags`      | []String | Represents the gateway `segment_tags`. Populated only if the gateway is segmented.               | HTTP Span |

By understanding and using these resource attributes, you can gain better insights into your Tyk Gateway and service instances.

#### Common HTTP Span Attributes

Tyk follows the OpenTelemetry semantic conventions for HTTP spans. You can find detailed information on common attributes [here](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

Some of these common attributes include:

- `http.method`: HTTP request method.
- `http.scheme`: URL scheme.
- `http.status_code`: HTTP response status code.
- `http.url`: Full HTTP request URL.

For the full list and details, refer to the official [OpenTelemetry Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

## Advanced OpenTelemetry Capabilities

### Context Propagation

This setting allows you to specify the type of context propagator to use for trace data. It's essential for ensuring compatibility and data integrity between different services in your architecture. The available options are:

- **tracecontext**: This option supports the [W3C Trace Context](https://www.w3.org/TR/trace-context/) format.
- **b3**: This option serializes `SpanContext` to/from the B3 multi Headers format. [Here](https://github.com/openzipkin/b3-propagation) you can find more information of this propagator.

The default setting is `tracecontext`. To configure this setting, you have two options:

- **Environment Variable**: Use `TYK_GW_OPENTELEMETRY_CONTEXTPROPAGATION` to specify the context propagator type.
- **Configuration File**: Navigate to the `opentelemetry.context_propagation` field in your configuration file to set your preferred option.

### Sampling Strategies

Tyk supports configuring the following sampling strategies via the Sampling configuration structure:

#### Sampling Type

This setting dictates the sampling policy that OpenTelemetry uses to decide if a trace should be sampled for analysis. The decision is made at the start of a trace and applies throughout its lifetime. By default, the setting is `AlwaysOn`.

To customize, you can either set the `TYK_GW_OPENTELEMETRY_SAMPLING_TYPE` environment variable or modify the `opentelemetry.sampling.type` field in the Tyk Gateway configuration file. Valid values for this setting are:

- **AlwaysOn**: All traces are sampled.
- **AlwaysOff**: No traces are sampled.
- **TraceIDRatioBased**: Samples traces based on a specified ratio.

#### Sampling Rate

This field is crucial when the `Type` is configured to `TraceIDRatioBased`. It defines the fraction of traces that OpenTelemetry will aim to sample, and accepts a value between 0.0 and 1.0. For example, a `Rate` set to 0.5 implies that approximately 50% of the traces will be sampled. The default value is 0.5. To configure this setting, you have the following options:

- **Environment Variable**: Use `TYK_GW_OPENTELEMETRY_SAMPLING_RATE`.
- **Configuration File**: Update the `opentelemetry.sampling.rate` field in the configuration file.

#### ParentBased Sampling

This option is useful for ensuring the sampling consistency between parent and child spans. Specifically, if a parent span is sampled, all it's child spans will be sampled as well. This setting is particularly effective when used with `TraceIDRatioBased`, as it helps to keep the entire transaction story together. Using `ParentBased` with `AlwaysOn` or `AlwaysOff` may not be as useful, since in these cases, either all or no spans are sampled. The default value is `false`. Configuration options include:

- **Environment Variable**: Use `TYK_GW_OPENTELEMETRY_SAMPLING_PARENTBASED`.
- **Configuration File**: Update the `opentelemetry.sampling.parent_based` field in the configuration file.

### Configuring Connection to OpenTelemetry Backend

Choose between HTTP and gRPC for the backend connection by configuring the `exporter` field to "http" or "grpc".

### Further Configuration Details

For more in-depth information on the configuration options available, please refer to our [OpenTelemetry Configuration Details Page]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}).
