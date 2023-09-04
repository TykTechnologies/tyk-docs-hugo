# Tyk Gateway (Open-Source) 5.2 Release Notes

### Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience of Tyk Gateway.

### New Middleware Supports Request/Response Body Transformations

With this release we are adding the much requested Body Transformations to Tyk OAS. You can now configure middleware for both request and response body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool. 

### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the Tyk OAS API definition from within your custom Go Plugins, bringing them up to standard alongside those you might use with a Tyk Classic API.

### Configure Caching For Each API Endpoint

We’ve added the ability to configure per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

### Added Header Management in Universal Data Graph

With this release we are adding a concept of header management in Universal Data Graph. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All Universal Data Graph headers now have access to request context variables like JWT claims, IP address of the connecting client or request ID.

### Added Further Support For GraphQL WebSocket Protocols

Support for WebSocket protocols between client and the Gateway has also been expanded. Instead of only supporting the _graphql-ws protocol_, which is becoming deprecated, we now also support _graphql-transport-ws_.

### Added OpenTelemetry Tracing

In this version, we're introducing a new feature called OpenTelemetry Tracing. This addition gives you improved visibility into how API requests are processed. It's designed to help with plugin development, improve performance, detect errors, and facilitate troubleshooting. For detailed information and guidance, you can check out our OpenTelemetry Tracing resource.

```
{{< warning success >}}
**Warning**

With the release of Tyk Gateway 5.2, we're introducing a powerful new feature: OpenTelemetry Tracing. Over the next year, we'll be deprecating OpenTracing. We recommend migrating to OpenTelemetry for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

{{< /warning >}}
```

## Support Lifetime

Full support for this release ends on May 2024. Extended support ends on May 2025.

## Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.2)

## Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "/upgrading-tyk" >}}) page for further guidance with respect to upgrade strategy.

## Changelog

### Added:

- Added support for [configuring]({{< ref "tyk-oss-gateway/configuration#opentelemetry" >}}) distributed tracing behaviour of Tyk Gateway. This includes enabling tracing, configuring exporter types, customising headers, specifying enhanced connectivity for HTTP, HTTPS and gRPC and setting the backend tracing URL. Subsequently, users have precise control over tracing behaviour in Tyk Gateway.

- Added support to configure OpenTelemetry [sampling types]({{< ref "tyk-oss-gateway/configuration#opentelemetrysampling" >}}) (probabilistic, rate limiting, and adaptive) in the Tyk Gateway. This allows users to manage the need for collected detailed tracing information against performance and resource usage requirements.

- Added trace and span attributes to simplify identifying Tyk API and request meta-data per request. Example span attributes include: _tyk.api.id_, _tyk.api.name_, _tyk.api.orgid_, _tyk.api.tags_, _tyk.api.path_, _tyk.api.version_, _tyk.api.apikey_, _tyk.api.apikey.alias_ and _tyk.api.oauthid_. This allows users to use OpenTelemetry [semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) to filter and create metrics for increased insight and observability.

- Added custom resource attributes: service.name, service.instance.id, service.version, tyk.gw.id, tyk.gw.dataplane, tyk.gw.group.id, tyk.gw.tags to allow process information to be available in traces.

- Added a new feature that allows clients to retrieve the trace ID from response headers. This feature is available when OpenTelemetry is [enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) and simplifies debugging API requests, empowering users to seamlessly correlate and analyse data for a specific trace in any OpenTelemetry backend like [Jaeger](https://www.jaegertracing.io/).

- Added configuration parameter to enable/disable [detail_tracing]({{< ref "advanced-configuration/opentracing#step-2-enable-at-api-level" >}}) for Tyk Classic API.

- Added an optimised query execution engine for GraphQL, activated by setting [opentelemetry.enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) to _true_. This integration enhances observability by enabling GQL traces in [Jaeger](https://www.jaegertracing.io/), granting users comprehensive insights into the execution process, including request times.

- Added a new [timeout option]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}), offering granular control over cache timeout at the endpoint level.

- Added support for using [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG global or data source headers. This feature enables much more advanced header management for UDG and allows users to extract header information from an incoming request and pass it to upstream data sources.

- Added support for configuration of global headers for any UDG. These headers will be forwarded to all data sources by default, enhancing control over data flow.

- Added the ability for Custom GoPlugin developers using Tyk OAS APIs to access the API Definition from within their plugin. The newly introduced _ctx.getOASDefinition_ function provides read-only access to the OAS API Definition and enhances the flexibility of plugins.

- Added support for the websocket protocol, _graphql-transport-ws protocol_, enhancing communication between the client and Gateway. Users connecting with the header _Sec-WebSocket-Protocol_ set to _graphql-transport-ws_ can now utilise messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.

- Added support for API Developers using Tyk OAS APIs to configure a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customisation at the per-endpoint level.

- Added support for enhanced Gateway usage reporting. MDCB v2.4 and Gateway v5.2 can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation is available in Dashboard for enhanced monitoring of your deployment.


### Changed:
- Updated _Response Body Transform_ middleware for Tyk Classic APIs to remove unnecessary entries in the API definition. The dependency on the _response_processor.response_body_transform_ configuration has been removed to streamline middleware usage, simplifying API setup.


### Fixed:
- Fixed an issue with querying a UDG API containing a query parameter of array type in a REST data source. The UDG was dropping the array type parameter from the final request URL sent upstream.

- Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than _Query_, _Mutation_, or _Subscription_.

- Fixed an issue where the _enforced timeout_ configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue where _allowedIPs_ validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.

### Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.