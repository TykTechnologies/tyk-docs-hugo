---
title: "OpenTelemetry Integration with Tyk Gateway"
date: 2023-08-29T10:28:52+03:00
tags: ["otel", "opentelemetry"]
description: Overview page to introduce OpenTelemetry in Tyk
---

Starting from Tyk Gateway version 5.2, you can leverage the power of OpenTelemetry, an open-source observability framework designed for cloud-native software. This enhances your API monitoring with end-to-end distributed tracing.

This documentation will guide you through the process of enabling and configuring OpenTelemetry in Tyk Gateway. You'll also learn how to customize trace detail levels to meet your monitoring requirements.

For further guidance on configuring your observability back-end, explore our guides for [Datadog]({{< ref "otel_datadog" >}}), [Dynatrace]({{< ref "otel_dynatrace" >}}), [Jaeger]({{< ref "otel_jaeger" >}}) and [New Relic]({{< ref "otel_new_relic" >}}).

## Enabling OpenTelemetry in Two Steps

### Step 1: Enable at Gateway Level

Begin by enabling OpenTelemetry in the Tyk Gateway. You can achieve this by editing the Tyk Gateway configuration file or by setting the corresponding environment variable (`TYK_GW_OPENTELEMETRY_ENABLED`).

Example Configuration:

```json
{
  "opentelemetry": {
    "enabled": true
  }
}
```

By default, OpenTelemetry spans are exported using the `gRPC` protocol to `localhost:4317`. For more configuration options and default values, refer to the [OpenTelemetry configuration details]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}). 

### Step 2: Enable Detailed Tracing at API Level (Optional)

After enabling OpenTelemetry at the gateway level, you have the option to activate detailed tracing for specific APIs. Edit the respective API definition and set the `detailed_tracing` option to either `true` or `false`. By default, this setting is `false`.

#### Which Spans Will Be Exported?

- When set to `false`:
  Detailed tracing set to `false` generates two spans encapsulating the entire request lifecycle. These spans include attributes and tags but lack fine-grained details. The parent span represents the total time from request reception to response and the child span represent the time spent in the upstream service.

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-false.png" alt="Detailed Tracing Disabled" width="800px" >}}

- When set to true:
  Detailed tracing set to `true` creates a span for each middleware involved in request processing. These spans offer detailed insights, including the time taken for each middleware execution and the sequence of invocations.

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-true.png" alt="Detailed Tracing Enabled" width="800px" >}}

By choosing the appropriate setting, you can customize the level of tracing detail to suit your monitoring needs.

## Understanding Your Traces

Tyk Gateway exposes a helpful set of *span attributes* and *resource attributes* with the generated spans. These attributes provide useful insights for analysing your API requests. A clear analysis can be obtained by observing the specific actions and associated context within each request/response. This is where span and resource attributes play a significant role.

### Span Attributes

A span is a named, timed operation that represents an operation. Multiple spans represent different parts of the workflow and are pieced together to create a trace. While each span includes a duration indicating how long the operation took, the span attributes provide additional contextual metadata.

Span attributes are key-value pairs that provide contextual metadata for individual spans. Tyk automatically sets the following span attributes:

- `tyk.api.name`: API name.
- `tyk.api.orgid`: Organization ID.
- `tyk.api.id`: API ID.
- `tyk.api.path`: API listen path.
- `tyk.api.tags`: If tagging is enabled in the API definition, the tags are added here.

### Resource Attributes

Resource attributes provide contextual information about the entity that produced the telemetry data. Tyk exposes following resource attributes:

#### Service Attributes

The service attributes supported by Tyk are:

| Attribute             | Type   | Description | 
| --------------------- | -------- | - | 
| `service.name`        | String | Service name for Tyk API Gateway:  `tyk-gateway`                                                                          |
| `service.instance.id` and `tyk.gw.id` | String | The Node ID assigned to the gateway. Example `solo-6b71c2de-5a3c-4ad3-4b54-d34d78c1f7a3` | 
| `service.version`     | String | Represents the service version. Example `v5.2.0`                                    |
| `tyk.gw.dataplane` | Bool     | Whether the Tyk Gateway is hybrid (`slave_options.use_rpc=true`)                                 | 
| `tyk.gw.group.id`  | String   | Represents the `slave_options.group_id` of the gateway. Populated only if the gateway is hybrid. | 
| `tyk.gw.tags`      | []String | Represents the gateway `segment_tags`. Populated only if the gateway is segmented.               | 

By understanding and using these resource attributes, you can gain better insights into the performance of your API Gateways.

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
