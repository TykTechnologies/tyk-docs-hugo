---
title: Tyk Gateway 5.2 Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.2.X series."
tags: ["Tyk Gateway", "Release notes", "v5.2", "5.2.0", "5.2", "changelog", "5.2.1", "5.2.2", "5.2.3"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.2.X displayed in reverse chronological order**

### Support Lifetime
Minor releases are supported until our next minor comes out. There is no 5.3 scheduled in Q4. Subsequently, 5.2 will remain in support until our next LTS version comes out in March 2024.

---

## 5.2.3 Release Notes 

##### Release Date 21 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release.

#### Release Highlights
This release enhances security, stability, and performance.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.3">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.3/images/sha256-8a94658c8c52ddfe30f78c5438dd4308c4d019655d8af7773a33fdffda097992?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.3)

#### Changelog {#Changelog-v5.2.3}

#### Fixed

<ul>
<li>
<details>
<summary>Python version not always correctly autodetected</summary>

Fixed an issue where Tyk was not autodetecting the installed Python version if it had multiple digits in the minor version (e.g. Python 3.11). The regular expression was updated to correctly identify Python versions 3.x and 3.xx, improving compatibility and functionality.
</details>
</li>
 <li>
 <details>
 <summary>Gateway blocked trying to retrieve keys via MDCB when using JWT auth</summary>
 
 Improved the behaviour when using JWTs and the MDCB (Multi Data Centre Bridge) link is down; the Gateway will no longer be blocked attempting to fetch OAuth client info. We’ve also enhanced the error messages to specify which type of resource (API key, certificate, OAuth client) the data plane Gateway failed to retrieve due to a lost connection with the control plane.
 </details>
 </li>
 <li>
 <details>
 <summary>Custom Authentication Plugin not working correctly with policies</summary>
 
 Fixed an issue where the session object generated when creating a Custom Key in a Go Plugin did not inherit parameters correctly from the Security Policy.
 </details>
 </li>
 <li>
 <details>
 <summary>Attaching a public key to an API definition for mTLS brings down the Gateway</summary>
 
 Fixed an issue where uploading a public key instead of a certificate into the certificate store, and using that key for mTLS, caused all the Gateways that the APIs are published on to cease negotiating TLS. This fix improves the stability of the gateways and the successful negotiation of TLS.
 </details>
 </li>
 </ul>

#### Added

<ul>
<li>
<details>
<summary>Implemented a `tyk version` command that provides more details about the Tyk Gateway build</summary>

This prints the release version, git commit, Go version used, architecture and other build details.
</details>
</li>
 <li>
 <details>
 <summary>Added option to fallback to default API version</summary>

 Added new option for Tyk to use the default version of an API if the requested version does not exist. This is referred to as falling back to default and is enabled using a configuration flag in the API defintion; for Tyk OAS APIs the flag is `fallbackToDefault`, for Tyk Classic APIs it is `fallback_to_default`.
 </details>
 </li>
 <li>
 <details>
 <summary>Implemented a backoff limit for GraphQL subscription connection retry</summary>

 Added a backoff limit for GraphQL subscription connection retry to prevent excessive error messages when the upstream stops working. The connection retries and linked error messages now occur in progressively longer intervals, improving error handling and user experience.
 </details>
 </li>
 </ul>
 
#### Community Contributions

Special thanks to the following member of the Tyk community for their contribution to this release:

<ul>
<li>
<details>
<summary>Runtime log error incorrectly produced when using Go Plugin Virtual Endpoints</summary>

Fixed a minor issue with Go Plugin virtual endpoints where a runtime log error was produced from a request, even if the response was successful. Thanks to [uddmorningsun](https://github.com/uddmorningsun) for highlighting the [issue](https://github.com/TykTechnologies/tyk/issues/4197) and proposing a fix.
</details>
</li>
</ul>

---

## 5.2.2 Release Notes 

##### Release Date 31 Oct 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release.

#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.2">}}) below.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.2/images/sha256-84d9e083872c78d854d3b469734ce40b7e77b9963297fe7945e214a0e6ccc614?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.2)

#### Changelog {#Changelog-v5.2.2}

#### Security

The following CVEs have been resolved in this release:
 <ul>
   <li>[CVE-2022-40897](https://nvd.nist.gov/vuln/detail/CVE-2022-40897)</li>
   <li>[CVE-2022-1941](https://nvd.nist.gov/vuln/detail/CVE-2022-1941)</li>
   <li>[CVE-2021-23409](https://nvd.nist.gov/vuln/detail/CVE-2021-23409)</li>
   <li>[CVE-2021-23351](https://nvd.nist.gov/vuln/detail/CVE-2021-23351)</li>
   <li>[CVE-2019-19794](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)</li>
   <li>[CVE-2018-5709](https://nvd.nist.gov/vuln/detail/CVE-2018-5709)</li>
   <li>[CVE-2010-0928](https://nvd.nist.gov/vuln/detail/CVE-2010-0928)</li>
   <li>[CVE-2007-6755](https://nvd.nist.gov/vuln/detail/CVE-2007-6755)</li>
 </ul>
 
 #### Fixed

- Fixed an issue where [enforced timeouts]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) values were incorrect on a per-request basis. Since we enforced timeouts only at the transport level and created the transport only once within the value set by [max_conn_time]({{< ref "tyk-oss-gateway/configuration#max_conn_time" >}}), the timeout in effect was not deterministic. Timeouts larger than 0 seconds are now enforced for each request.

- Fixed an issue when using MongoDB and [Tyk Security Policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This was due to the policy cleaning operation that is triggered when an API is deleted from a policy in a MongoDB installation. With this fix, the policy cleaning operation will not remove the final (deleted) API from the policy; Tyk recognises that the API record is invalid and denies granting access rights to the key.

- The [Logstash]({{< ref "log-data#aggregated-logs-with-logstash" >}}) formatter timestamp is now in [RFC3339Nano](https://www.rfc-editor.org/rfc/rfc3339) format.

- Fixed a potential race condition where the *DRL Manager* was not properly protected against concurrent read/write operations in some high-load scenarios.

- Fixed a performance issue encountered when Tyk Gateway retrieves a key via MDCB for a JWT API. The token is now validated against [JWKS or the public key]({{<ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#dynamic-public-key-rotation-using-public-jwks-url" >}}) in the API Definition.

- Fixed a performance issue where JWT middleware introduced latency which significantly reduced the overall request/response throughput.

- Fixed an issue that prevented *UDG* examples from being displayed in the dashboard when the *Open Policy Agent(OPA)* is enabled.

- Fixed an issue where the Tyk Gateway logs would include sensitive information when the incorrect signature is provided in a request to an API protected by HMAC authentication.

#### Community Contributions

Special thanks to the following members of the Tyk community for their contributions to this release:

- Implemented *ULID Normalization*, replacing valid ULID identifiers in the URL with a `{ulid}` placeholder for analytics. This matches the existing UUID normalization. Thanks to [Mohammad Abdolirad](https://github.com/atkrad) for the contribution.

- Fixed an issue where a duplicate error message was reported when a custom Go plugin returned an error. Thanks to [@PatrickTaibel](https://github.com/PatrickTaibel) for highlighting the issue and suggesting a fix.

---

## 5.2.1 Release Notes 

##### Release Date 10 Oct 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 5.2.0 we advise you to upgrade ASAP and if you are on an older version skip 5.2.0 and upgrade directly to this release.

#### Release Highlights
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.1/images/sha256-47cfffda64ba492f79e8cad013a476f198011f5a97cef32464f1f47e1a9be9a2?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.2)

#### Changelog {#Changelog-v5.2.1}

##### Changed
- Enhance log message quality by eliminating unnecessary messages

- Fixed a bug that occurs during Gateway reload where the Gateway would continue to load new API definitions even if policies failed to load. This led to a risk that an API could be invoked without the associated policies (for example, describing access control or rate limits) having been loaded. Now Tyk offers a configurable retry for resource loading, ensuring that a specified number of attempts will be made to load resources (APIs and policies). If a resource fails to load, an error will be logged and the Gateway reverts to its last working configuration.
We have introduced two new variables to configure this behaviour:
  - `resource_sync.retry_attempts` - defines the number of [retries]({{< ref "tyk-oss-gateway/configuration#resource_syncretry_attempts" >}}) that the Gateway should perform during a resource sync (APIs or policies), defaulting to zero which means no retries are attempted
  - `resource_sync.interval` - setting the [fixed interval]({{< ref "tyk-oss-gateway/configuration#resource_syncinterval" >}}) between retry attempts (in seconds)

- For OpenTelemetry users, we've included much-needed attributes, `http.response.body.size` and `http.request.body.size`, in both Tyk HTTP spans and upstream HTTP spans. This addition enables users to gain better insight into incoming/outgoing request/response sizes within their traces.


##### Fixed

- Fixed a memory leak issue in Gateway 5.2.0 if [OpenTelemetry](https://opentelemetry.io/) (abbreviated "OTel") is [enabled](https://tyk.io/docs/product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview/#enabling-opentelemetry-in-two-steps). It was caused by multiple `otelhttp` handlers being created. We have updated the code to use a single instance of `otelhttp` handler in 5.2.1 to improve performance under high traffic load.

- Fixed a memory leak that occurred when enabling the [strict routes option]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_strict_routes" >}}) to change the routing to avoid nearest-neighbour requests on overlapping routes (`TYK_GW_HTTPSERVEROPTIONS_ENABLESTRICTROUTES`)

- Fixed a potential performance issue related to high rates of *Tyk Gateway* reloads (when the Gateway is updated due to a change in APIs and/or policies). The gateway uses a timer that ensures there's at least one second between reloads, however in some scenarios this could lead to poor performance (for example overloading Redis). We have introduced a new [configuration option]({{< ref "tyk-oss-gateway/configuration#reload_interval" >}}), `reload_interval` (`TYK_GW_RELOADINTERVAL`), that can be used to adjust the duration between reloads and hence optimise the performance of your Tyk deployment.

- Fixed an issue with GraphQL APIs, where [headers]({{< ref "graphql/gql-headers" >}}) were not properly forwarded upstream for [GQL/UDG subscriptions]({{< ref "getting-started/key-concepts/graphql-subscriptions" >}}).

- Fixed a bug where the Gateway did not correctly close idle upstream connections (sockets) when configured to generate a new connection after a configurable period of time (using the [max_conn_time]({{<ref "tyk-oss-gateway/configuration#max_conn_time" >}})
configuration option). This could lead to the Gateway eventually running out of sockets under heavy load, impacting performance.

- Removed the extra chunked transfer encoding that was added unnecessarily to `rawResponse` analytics

- Resolved a bug with HTTP GraphQL APIs where, when the [Persist GraphQL middleware]({{< ref "graphql/persisted-queries" >}}) was used in combination with [Response Body Transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}), the response's body transformation was not being executed.
{{< img src="img/bugs/bug-persistent-gql.png" width="400" alt="Bug in persistent gql and response body transform" title="The setup of graphQL middlewares">}}

- Fixed a bug where, if you created a key which provided access to an inactive or draft API, you would be unable to subsequently modify that key (via the Tyk Dashboard UI, Tyk Dashboard API or Tyk Gateway API)

##### Dependencies
- Updated TykTechnologies/gorm to v1.21 in Tyk Gateway 

---

## 5.2.0 Release Notes

##### Release Date 29 Sep 2023

#### Breaking Changes

This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

##### Added Body Transform Middleware to Tyk OAS API Definition

With this release, we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) body transformations and - as a Tyk Dashboard user - you’ll be able to do so from within our simple and elegant API Designer tool. 

##### Reference Tyk OAS API Definition From Within Your Custom Go Plugins

Reference the *Tyk OAS API definition* from within your custom *Go Plugins*, bringing them up to standard alongside those you might use with a *Tyk Classic API*.

##### Configure Caching For Each API Endpoint

We’ve added the ability to [configure]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services.

##### Added Header Management in Universal Data Graph

With this release we are adding a concept of [header management]({{< ref "universal-data-graph/concepts/header_management" >}}) in *Universal Data Graph*. With multiple upstream data sources, data graphs need to be sending the right headers upstream, so that our users can effectively track the usage and be able to enforce security rules at each stage. All *Universal Data Graph* headers now have access to *request context* variables like *JWT claims*, *IP address* of the connecting client or *request ID*. This provides extensive configurability of customisable information that can be sent upstream.

##### Added Further Support For GraphQL WebSocket Protocols

Support for [WebSocket]({{< ref "/graphql/graphql-websockets" >}}) protocols between client and the *Gateway* has also been expanded. Instead of only supporting the *graphql-ws protocol*, which is becoming deprecated, we now also support [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) by setting the *Sec-WebSocket-Protocol* header to *graphql-transport-ws*.

##### Added OpenTelemetry Tracing

In this version, we're introducing the support for *OpenTelemetry Tracing*, the new [open standard](https://opentelemetry.io/) for exposing observability data. This addition gives you improved visibility into how API requests are processed, with no additional license required. It is designed to help you with monitoring and troubleshooting APIs, identify bottlenecks, latency issues and errors in your API calls. For detailed information and guidance, you can check out our [OpenTelemetry Tracing]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}) resource.

*OpenTelemetry* makes it possible to isolate faults within the request lifetime through inspecting API and Gateway meta-data. Additionally, performance bottlenecks can be identified within the request lifetime. API owners and developers can use this feature to understand how their APIs are being used or processed within the Gateway.

*OpenTelemetry* functionality is also available in [Go Plugins]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/otel-plugins" >}}). Developers can write code to add the ability to preview *OpenTelemetry* trace attributes, error status codes etc., for their Go Plugins.

We offer support for integrating *OpenTelemetry* traces with supported open source tools such [Jaeger]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_jaeger" >}}), [Dynatrace]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_dynatrace" >}}) or [New Relic]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/otel_new_relic" >}}). This allows API owners and developers to gain troubleshooting and performance insights from error logs, response times etc.
You can also find a direct link to our docs in the official [OpenTelemetry Integration page](https://opentelemetry.io/ecosystem/integrations/)

{{< warning success >}}
**Warning**

*Tyk Gateway 5.2* now includes *OpenTelemetry Tracing*. Over the next year, we'll be deprecating *OpenTracing*. We recommend migrating to *OpenTelemetry* for better trace insights and more comprehensive support. This change will offer you significant advantages in managing your distributed tracing needs.

{{< /warning >}}

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.0/images/sha256-cf0c57619e8285b1985bd5e4bf86b8feb42abec56cbc241d315cc7f8c0d43025?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.0)

#### Changelog {#Changelog-v5.2.0}

##### Added:

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

- Added support for API Developers using *Tyk OAS API Definition* to [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) a body transform middleware that operates on API responses. This enhancement ensures streamlined and selective loading of the middleware based on configuration, enabling precise response data customisation at the per-endpoint level.

- Added support for enhanced *Gateway* usage reporting. *MDCB v2.4* and *Gateway v5.2* can now report the number of connected gateways and data planes. Features such as data plane gateway visualisation are available in *Tyk Dashboard* for enhanced monitoring of your deployment.


##### Changed:
- Updated *Response Body Transform* middleware for *Tyk Classic APIs* to remove unnecessary entries in the *API definition*. The dependency on the *response_processor.response_body_transform* configuration has been removed to streamline middleware usage, simplifying API setup.


##### Fixed:
- Fixed an issue with querying a *UDG* API containing a query parameter of array type in a REST data source. The *UDG* was dropping the array type parameter from the final request URL sent upstream.

- Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than *Query*, *Mutation* or *Subscription*.

- Fixed an issue where the [Enforced Timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue where *allowedIPs* validation failures replaced the reported errors list, causing the loss of other error types. This fix appends IP validation errors to the list, providing users with a comprehensive overview of encountered errors. Subsequently, this enhances the clarity and completeness of validation reporting.

- Fixed a critical issue in MDCB v2.3 deployments, relating to *Data Plane* stability. The *Data Plane* Gateway with versions older than v5.1 was found to crash with a panic when creating a Tyk OAS API. The bug has been addressed, ensuring stability and reliability in such deployments.

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-gateway-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-c23829a5-7b3c-454f-8dcb-a1c67249032b)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
