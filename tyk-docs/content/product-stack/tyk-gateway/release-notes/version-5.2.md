# Tyk Gateway (Open-Source) 5.2 Release Notes

### Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience of Tyk Gateway.

**PMs summary paragraph is included here**

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

- Added support to configure OpenTelemetry [sampling types]({{< ref "tyk-oss-gateway/configuration/#opentelemetrysampling" >}}) (probabilistic, rate limiting, and adaptive) in the Tyk Gateway. This allows users to manage the need for collected detailed tracing information against performance and resource usage requirements.

- Added trace and span attributes to simplify identifying Tyk API and request meta-data per request. Example span attributes include: _tyk.api.id_, _tyk.api.name_, _tyk.api.orgid_, _tyk.api.tags_, _tyk.api.path_, _tyk.api.version_, _tyk.api.apikey_, _tyk.api.apikey.alias_ and _tyk.api.oauthid_. This allows users to use OpenTelemetry [semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) to filter and create metrics for increased insight and observability.

- Added custom resource attributes: service.name, service.instance.id, service.version, tyk.gw.id, tyk.gw.dataplane, tyk.gw.group.id, tyk.gw.tags to allow process information to be available in traces.

- Added a new feature that allows clients to retrieve the trace ID from response headers. This feature is available when OpenTelemetry is [enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) and simplifies debugging API requests, empowering users to seamlessly correlate and analyse data for a specific trace in [Jaeger](https://www.jaegertracing.io/).

- Added configuration parameter to enable/disable [detail_tracing]({{< ref: "advanced-configuration/opentracing#step-2-enable-at-api-level" >}}) for Tyk Classic API.

- Added an optimised query execution engine for GraphQL, activated by setting [opentelemetry.enabled]({{< ref "tyk-oss-gateway/configuration#opentelemetryenabled" >}}) to _true_. This integration enhances observability by enabling GQL traces in [Jaeger](https://www.jaegertracing.io/), granting users comprehensive insights into the execution process, including request times.

- Added a new [timeout option]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}), offering granular control over cache timeout at the endpoint level.

- Added support for using [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG global or data source headers. This feature enables customising request data transformations, such as converting a form-based POST into a JSON-based PUT.

- Added support for simpler configuration of global headers for any UDG. These headers will be forwarded to all data sources by default, enhancing control over data flow.

- Added the ability for Custom Plugin developers to access the OAS API Definition through the newly introduced _ctx.getOASDefinition_ function. This enhancement simplifies development, without permitting modifications to the OAS API Definition.

- Added support for the websocket protocol, _graphql-transport-ws protocol_, enhancing communication between the client and Gateway. Users connecting with the header _Sec-WebSocket-Protocol_ set to _graphql-transport-ws_ can now utilise messages from this [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) for more versatile interaction.

- Added support for API Developers to effortlessly configure the Body response transform middleware for specific OAS API endpoints using the operationID of an OAS Path. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customization.

- Added support for improved gateway visibility. MDCB now helps monitor connected gateways and groups. This facilitates smoother operations and ensures accurate setup. Features such as edge gateway visualisation and enhanced licensing management are provided for further control.


### Changed:
- Updated _Response Body Transform_ middleware for Tyk Classic APIs to remove unnecessary entries in the API definition. The dependency on the _response_processor.response_body_transform_ configuration has been removed to streamline middleware usage, simplifying API setup.


### Fixed:
- Fixed an issue with querying a UDG API containing a query parameter of array type in a REST data source. The UDG was dropping the array type parameter from the final request URL sent upstream.

- Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than _Query_, _Mutation_, or _Subscription_.

- Fixed an issue in where duplicate API names and listen paths could be created. Configurations are now unique.

- Fixed an issue where the _enforced timeout_ configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue where _allowedIPs_ validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.


### Community Contributions

Special thanks to the following members of the Tyk community for their contributions in this release:

**Example**

Thanks to PatrickTaibel for fixing an issue where global_size_limit was not enabling request size limit middleware.

### Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.