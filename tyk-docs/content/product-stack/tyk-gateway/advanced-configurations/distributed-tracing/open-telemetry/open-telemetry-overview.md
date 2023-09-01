---
title: "Open Telemetry"
date: 2023-08-29T10:28:52+03:00
tags: ["otel", "open telemetry"]
description: Overview page to introduce OpenTelemetry in Tyk
---

Since v5.2.+ Tyk now supports OpenTelemetry, a robust observability framework for cloud-native software. Enhance your API Gateway's monitoring capabilities with customizable traces and metrics.

## Enabling OpenTelemetry in Two Steps
### Step 1: Enable at Gateway Level
First, you need to enable OpenTelemetry in the Tyk Gateway. You can do this by editing the Tyk Gateway configuration file like so:

```json
{
"opentelemetry": {
  "enabled": true
  }
}
```

You can also enable OpenTelemetry by setting the corresponding environment variable: `TYK_GW_OPENTELEMETRY_ENABLED`.

### Step 2: Enable at API Level (Optional)
After enabling OpenTelemetry at the gateway level, you have the optional step of activating it for specific APIs you wish to monitor. If you choose to do this, edit the respective API definition and set the detailed_tracing option to either true or false. By default, this setting is set to false.

#### What trace details to expect
- When set to false:
Setting detailed_tracing to `false` will generate a single span that encapsulates the entire request lifecycle. This span will include attributes and tags but will lack finer details. Specifically, it will not show metrics like the time taken for individual middleware executions. The single span will represent the total time elapsed from when the gateway receives the request to when a response is sent back to the client. In this case the trace will look as:

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-false.png" alt="Detailed Tracing Disabled" width="800px" >}}

- When set to true:
With `detailed_tracing` set to `true`, OpenTelemetry will create a span for each middleware involved in the request processing. These spans will offer detailed insights such as the time each middleware took to execute and the sequence in which they were invoked. The spans are displayed in a waterfall model, revealing the hierarchy and sequence of middleware execution. This includes pre-middlewares, post-middlewares, the round trip to the upstream server, and the response middlewares. In this case the trace will look as:

{{< img src="/img/distributed-tracing/opentelemetry/detailed-tracing-true.png" alt="Detailed Tracing Enabled" width="800px" >}}

By selecting the appropriate setting, you can customize the level of tracing detail to suit your monitoring needs.

## Understanding your traces
Gaining a comprehensive understanding of your traces requires diving into both the specific operations being performed and the context in which they are executed. This is where attributes and tags come into play. To fully benefit from OpenTelemetry's capabilities, it's essential to grasp the two main types of attributes: **Span Attributes** and **Resource Attributes**.

#### Resource Attributes
In OpenTelemetry, resource attributes provide contextual information about the entity that produced the telemetry data. Unlike span attributes, which are specific to individual operations (e.g., requests in the case of a gateway), resource attributes are associated with the service or application as a whole.

#### Types of Resource Attributes

##### Service Attributes
The service attributes supported by Tyk are:

| Attribute           | Type   | Description                                     | Example                                              |
|---------------------|--------|-------------------------------------------------|------------------------------------------------------|
| `service.name`      | String | Represents the service name                     | `tyk-gateway`                                        |
| `service.instance.id` | String | Unique ID of the service instance (NodeID in the case of the gateway)  | `solo-6b71c2de-5a3c-4ad3-4b54-d34d78c1f7a3` |
| `service.version`   | String | Represents the service version                  | `v5.2.0`                                             |

##### Gateway Attributes
The attributes related to the Tyk Gateway are:

| Attribute          | Type     | Description                                                  | Context  |
|--------------------|----------|--------------------------------------------------------------|----------|
| `tyk.gw.id`        | String   | The Node ID assigned to the gateway                          | HTTP Span |
| `tyk.gw.dataplane` | Bool     | Whether the Tyk Gateway is hybrid (`slave_options.use_rpc=true`) | HTTP Span |
| `tyk.gw.group.id`  | String   | Represents the `slave_options.group_id` of the gateway. Populated only if the gateway is hybrid. | HTTP Span |
| `tyk.gw.tags`      | []String | Represents the gateway `segment_tags`. Populated only if the gateway is segmented. | HTTP Span |

By understanding and using these resource attributes, you can gain better insights into your Tyk Gateway and service instances.

### Span Attributes
Span attributes offer information about a specific operation within a trace, such as a single API request. They can include metrics like how long an individual middleware took to execute, the HTTP method used in a request, and much more. By scrutinizing the span attributes, you can deduce the particulars of each operation, making it easier to pinpoint bottlenecks, errors, or other issues.
Tyk sets specific span attributes automatically:

- `tyk.api.name`: API name.
- `tyk.api.orgid`: Organization ID.
- `tyk.api.id`: API ID.
- `tyk.api.path`: API listen path.
- `tyk.api.tags`: If tagging is enabled in the API definition, the tags are added here. 

#### Common HTTP Span Attributes
Tyk follows the OpenTelemetry semantic conventions for HTTP spans. You can find detailed information on common attributes [here](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

Some of these common attributes include:

- `http.method`: HTTP request method.
- `http.scheme`: URL scheme.
- `http.status_code`: HTTP response status code.
- `http.url`: Full HTTP request URL.

For the full list and details, refer to the official [OpenTelemetry Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

## Advanced OpenTelemetry Capabilities
### Context Propagation and Sampling
Tyk supports context propagation as well as configurable sampling strategies through the Sampling configuration structure. Below are the options you can customize:

#### Type
This option specifies the policy that OpenTelemetry will use to decide whether a particular trace should be sampled or not. The decision is made at the beginning of a trace and is then propagated through the trace. The default value is AlwaysOn. Valid values for this field are:

- **AlwaysOn:** Every trace is sampled.
- **AlwaysOff:** No traces are sampled.
- **TraceIDRatioBased:** A certain ratio of traces will be sampled.


#### Rate
The Rate field is relevant only when the Type is set to TraceIDRatioBased. It specifies the fraction of traces to be sampled and should be a value between 0.0 and 1.0. For example, a Rate of 0.5 means that OpenTelemetry aims to sample approximately 50% of traces. The default value for this option is 0.5.

#### ParentBased
The ParentBased option ensures that if a particular span is sampled, all of its child spans will also be sampled. This is especially useful for keeping entire transaction stories together. While this can be effective when using TraceIDRatioBased, setting ParentBased with AlwaysOn or AlwaysOff may not be as impactful, since either all spans are sampled or none are. The default for this field is false.

### Configuring Connection to OpenTelemetry Backend
Choose between HTTP and gRPC for the backend connection by configuring the `exporter` field to "http" or "grpc".

### Further Configuration Details
For more in-depth information on the configuration options available, please refer to our [OpenTelemetry Configuration Details Page](https://tyk.io/docs/tyk-oss-gateway/configuration/#opentelemetry).