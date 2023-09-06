# Tyk Gateway 5.2 Release Notes

**Open Source**

## Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#changelog">}}) below.

#### Added Configurable Middleware For Body Transformations For Tyk OAS APIs

With this release we are adding the much requested Body Transformations to Tyk OAS. You can now configure middleware for both request and response body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool. 

#### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the Tyk OAS API definition from within your custom Go Plugins, bringing them up to standard alongside those you might use with a Tyk Classic API.

#### Configure Caching For Each API Endpoint

We’ve added the ability to configure per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

#### Added Header Management in Universal Data Graph

With this release we are adding a concept of header management in Universal Data Graph. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All Universal Data Graph headers now have access to request context variables like JWT claims, IP address of the connecting client or request ID.

#### Added Further Support For GraphQL WebSocket Protocols

Support for WebSocket protocols between client and the Gateway has also been expanded. Instead of only supporting the _graphql-ws protocol_, which is becoming deprecated, we now also support _graphql-transport-ws_.

#### Added OpenTelemetry Tracing

In this version, we're introducing the support for _OpenTelemetry Tracing_. This addition gives you improved visibility into how API requests are processed. It is designed to help you with monitoring and troubleshooting APIs, identify bottlenecks, latency issues and errors in your API calls. For detailed information and guidance, you can check out our _OpenTelemetry Tracing_ resource.

{{< warning success >}}
**Warning**

With the release of _Tyk Gateway 5.2_, we're introducing a powerful new feature: _OpenTelemetry Tracing_. Over the next year, we'll be deprecating _OpenTracing_. We recommend migrating to _OpenTelemetry_ for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

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

- Added support for [configuring]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}) distributed tracing behaviour of _Tyk Gateway_. This includes enabling tracing, configuring exporter types, setting the URL of the tracing backend to which data is to be sent, customising headers, and specifying enhanced connectivity for _HTTP_, _HTTPS_ and _gRPC_. Subsequently, users have precise control over tracing behaviour in _Tyk Gateway_.

- Added support to configure _OpenTelemetry_ [sampling types and rates]({{< ref "tyk-oss-gateway/configuration#opentelemetrysampling" >}}) in the _Tyk Gateway_. This allows users to manage the need for collected detailed tracing information against performance and resource usage requirements.

- Added span attributes to simplify identifying Tyk API and request meta-data per request. Example span attributes include: _tyk.api.id_, _tyk.api.name_, _tyk.api.orgid_, _tyk.api.tags_, _tyk.api.path_, _tyk.api.version_, _tyk.api.apikey_, _tyk.api.apikey.alias_ and _tyk.api.oauthid_. This allows users to use _OpenTelemetry_ [semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) to filter and create metrics for increased insight and observability.

- Added custom resource attributes: _service.name_, _service.instance.id_, _service.version_, _tyk.gw.id_, _tyk.gw.dataplane_, _tyk.gw.group.id_, _tyk.gw.tags_ to allow process information to be available in traces.

- Added a new feature that allows clients to retrieve the trace ID from response headers. This feature is available when _OpenTelemetry_ is [enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) and simplifies debugging API requests, empowering users to seamlessly correlate and analyse data for a specific trace in any _OpenTelemetry_ backend like [Jaeger](https://www.jaegertracing.io/).

- Added configuration parameter to enable/disable [detail_tracing]({{< ref "advanced-configuration/opentracing#step-2-enable-at-api-level" >}}) for _Tyk Classic API_.

- Added OpenTelemetry support for GraphQL. This is activated by setting [opentelemetry.enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) to _true_. This integration enhances observability by enabling GQL traces in any OpenTelemetry backend, like [Jaeger](https://www.jaegertracing.io/), granting users comprehensive insights into the execution process, such as request times.

- Added a new [timeout option]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}), offering granular control over cache timeout at the endpoint level.

- Added support for using [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in _UDG_ global or data source headers. This feature enables much more advanced header management for UDG and allows users to extract header information from an incoming request and pass it to upstream data sources.

- Added support for configuration of global headers for any _UDG_. These headers will be forwarded to all data sources by default, enhancing control over data flow.

- Added the ability for Custom GoPlugin developers using _Tyk OAS APIs_ to access the _API Definition_ from within their plugin. The newly introduced _ctx.getOASDefinition_ function provides read-only access to the _OAS API Definition_ and enhances the flexibility of plugins.

- Added support for the websocket protocol, _graphql-transport-ws protocol_, enhancing communication between the client and _Gateway_. Users connecting with the header _Sec-WebSocket-Protocol_ set to _graphql-transport-ws_ can now utilise messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.

- Added support for API Developers using _Tyk OAS APIs_ to configure a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customisation at the per-endpoint level.

- Added support for enhanced _Gateway_ usage reporting. _MDCB v2.4_ and _Gateway v5.2_ can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation is available in Dashboard for enhanced monitoring of your deployment.


#### Changed:
- Updated _Response Body Transform_ middleware for _Tyk Classic APIs_ to remove unnecessary entries in the _API definition_. The dependency on the _response_processor.response_body_transform_ configuration has been removed to streamline middleware usage, simplifying API setup.


#### Fixed:
- Fixed an issue with querying a _UDG_ API containing a query parameter of array type in a REST data source. The UDG was dropping the array type parameter from the final request URL sent upstream.

- Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than _Query_, _Mutation_, or _Subscription_.

- Fixed an issue where the _enforced timeout_ configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue where _allowedIPs_ validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.

- Fixed a critical issue in MDCB deployments, relating to _Control Plane_ stability. The _Control Plane_ _Gateway_ was found to crash with a panic when creating a _Tyk OAS API_. The bug has been addressed, ensuring stability and reliability in such deployments.

## Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.