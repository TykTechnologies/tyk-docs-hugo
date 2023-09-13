# Tyk Gateway 5.2 Release Notes

**Open Source**

## Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#changelog">}}) below.

#### Added Configurable Middleware For Body Transformations For OAS APIs Managed By Tyk Gateway

With this release we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< "advanced-configuration/transform-traffic/response-body/" >}}) body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool. 

#### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the *Tyk OAS API definition* from within your custom *Go Plugins*, bringing them up to standard alongside those you might use with a *Tyk Classic API*.

#### Configure Caching For Each API Endpoint

We’ve added the ability to [configure]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

#### Added Header Management in Universal Data Graph

With this release we are adding a concept of [header management]({{< ref "universal-data-graph/concepts/header_management/" >}}) in *Universal Data Graph*. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All *Universal Data Graph* headers now have access to *request context* variables like *JWT claims*, *IP address* of the connecting client or *request ID*. This provides extensive configurability of customisable information that can be sent upstream.

#### Added Further Support For GraphQL WebSocket Protocols

Support for [WebSocket]({{< ref "/graphql/graphql-websockets" >}}) protocols between client and the *Gateway* has also been expanded. Instead of only supporting the *graphql-ws protocol*, which is becoming deprecated, we now also support [*graphql-transport-ws*](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) by setting the *Sec-WebSocket-Protocol* header to *graphql-transport-ws*.

#### Added OpenTelemetry Tracing

In this version, we're introducing the support for *OpenTelemetry Tracing*, the new [open standard](https://opentelemetry.io/) for exposing observability data. This addition gives you improved visibility into how API requests are processed, with no additional license required. It is designed to help you with monitoring and troubleshooting APIs, identify bottlenecks, latency issues and errors in your API calls. For detailed information and guidance, you can check out our [*OpenTelemetry Tracing*]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}) resource.

*OpenTelemetry* makes it possible to isolate faults within the request lifetime through inspecting API and Gateway meta-data. Additionally, performance bottlenecks can be identified within the request lifetime. API owners and developers can use this feature to understand how their APIs are being used or processed within the Gateway.

*OpenTelemetry* functionality is also available in [Go Plugins]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/otel-plugins" >}}). Developers can write code to add the ability to preview *OpenTelemetry* trace attributes, error status codes etc., for their Go Plugins.

We offer support for integrating *OpenTelemetry* traces with supported open source tools such [Jaeger]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_jaeger" >}}), [Dynatrace]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_dynatrace" >}}) or [New Relic]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_new_relic" >}}). This allows API owners and developers to gain troubleshooting and performance insights from error logs, reponse times etc.

{{< warning success >}}
**Warning**

*Tyk Gateway 5.2* now includes *OpenTelemetry Tracing*. Over the next year, we'll be deprecating *OpenTracing*. We recommend migrating to *OpenTelemetry* for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

{{< /warning >}}


## Support Lifetime

Full support for this release ends on May 2024. Extended support ends on May 2025.

## Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.2)

## Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "/upgrading-tyk" >}}) page for further guidance with respect to upgrade strategy.

## Changelog

#### Added:

- Added support for [configuring]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}) distributed tracing behaviour of *Tyk Gateway*. This includes enabling tracing, configuring exporter types, setting the URL of the tracing backend to which data is to be sent, customising headers, and specifying enhanced connectivity for *HTTP*, *HTTPS* and *gRPC*. Subsequently, users have precise control over tracing behaviour in *Tyk Gateway*.

- Added support to configure *OpenTelemetry* [sampling types and rates]({{< ref "tyk-oss-gateway/configuration#opentelemetrysampling" >}}) in the *Tyk Gateway*. This allows users to manage the need for collected detailed tracing information against performance and resource usage requirements.

- Added span attributes to simplify identifying Tyk API and request meta-data per request. Example span attributes include: *tyk.api.id*, *tyk.api.name*, *tyk.api.orgid*, *tyk.api.tags*, *tyk.api.path*, *tyk.api.version*, *tyk.api.apikey*, *tyk.api.apikey.alias* and *tyk.api.oauthid*. This allows users to use *OpenTelemetry* [semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) to filter and create metrics for increased insight and observability.

- Added custom resource attributes: *service.name*, *service.instance.id*, *service.version*, *tyk.gw.id*, *tyk.gw.dataplane*, *tyk.gw.group.id*, *tyk.gw.tags* to allow process information to be available in traces.

- Added a new feature that allows clients to retrieve the trace ID from response headers. This feature is available when *OpenTelemetry* is [enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) and simplifies debugging API requests, empowering users to seamlessly correlate and analyse data for a specific trace in any *OpenTelemetry* backend like [Jaeger](https://www.jaegertracing.io/).

- Added configuration parameter to enable/disable [detail_tracing]({{< ref "/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview#step-2-enable-detailed-tracing-at-api-level-optional" >}}) for *Tyk Classic API*.

- Added *OpenTelemetry* support for GraphQL. This is activated by setting [opentelemetry.enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) to *true*. This integration enhances observability by enabling GQL traces in any OpenTelemetry backend, like [Jaeger](https://www.jaegertracing.io/), granting users comprehensive insights into the execution process, such as request times.

- Added a new [timeout option]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}), offering granular control over cache timeout at the endpoint level.

- Added support for using [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in *UDG* global or data source headers. This feature enables much more advanced [header management]({{< ref "/universal-data-graph/concepts/header_management" >}}) for UDG and allows users to extract header information from an incoming request and pass it to upstream data sources.

- Added support for configuration of [global headers]({{< ref "/universal-data-graph/concepts/header_management" >}}) for any *UDG*. These headers will be forwarded to all data sources by default, enhancing control over data flow.

- Added the ability for Custom GoPlugin developers using *Tyk OAS APIs* to access the *API Definition* from within their plugin. The newly introduced *ctx.getOASDefinition* function provides read-only access to the *OAS API Definition* and enhances the flexibility of plugins.

- Added support for the websocket protocol, *graphql-transport-ws protocol*, enhancing communication between the client and *Gateway*. Users [connecting]({{< ref "/graphql/graphql-websockets" >}}) with the header *Sec-WebSocket-Protocol* set to *graphql-transport-ws* can now utilise messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.

- Added support for API Developers using *Tyk OAS APIs* to [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customisation at the per-endpoint level.

- Added support for enhanced *Gateway* usage reporting. *MDCB v2.4* and *Gateway v5.2* can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation is available in Dashboard for enhanced monitoring of your deployment.


#### Changed:
- Updated *Response Body Transform* middleware for *Tyk Classic APIs* to remove unnecessary entries in the *API definition*. The dependency on the *response_processor.response_body_transform* configuration has been removed to streamline middleware usage, simplifying API setup.


#### Fixed:
- Fixed an issue with querying a *UDG* API containing a query parameter of array type in a REST data source. The *UDG* was dropping the array type parameter from the final request URL sent upstream.

- Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than *Query*, *Mutation*, or *Subscription*.

- Fixed an issue where the *enforced timeout* configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue where *allowedIPs* validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.

- Fixed a critical issue in MDCB v2.3 deployments, relating to *Data Plane* stability. The *Data Plane* Gateway with versions older than v5.1 was found to crash with a panic when creating a Tyk OAS API. The bug has been addressed, ensuring stability and reliability in such deployments.

## Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.
