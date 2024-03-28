---
title: Tyk Gateway 5.3 Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.3.X series."
tags: ["Tyk Gateway", "Release notes", "v5.3", "5.3.0", "5.3", "changelog"]
---

<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.3.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 5.3.0 Release Notes

### Release Date DD Mon YYYY <<update>>

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**

#### Tyk OAS APIs not backward compatible with pre-5.3.0 Gateways

As [Tyk OAS APIs]({{< ref "getting-started/key-concepts/high-level-concepts">}}) transitions out of [Early Access]({{< ref "frequently-asked-questions/using-early-access-features" >}}), we cannot guarantee backward compatibility for versions pre-5.3.0. When upgrading to 5.3.0, Tyk will automatically migrate existing Tyk OAS APIs to the [latest API definition format]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}).

Tyk OAS APIs using the 5.3.0 API definition may not work with pre-5.3.0 versions of Tyk Gateway and doing so could provoke unpredictable behaviour including potential crashes. We recommend retaining copies of existing Tyk OAS API definitions before upgrading in case you choose to downgrade later.

Users are strongly advised to follow the recommended [upgrade instructions](#upgrading-tyk) provided by Tyk before applying any updates.

#### Python plugin support

Starting from Tyk Gateway version v5.3.0, Python is no longer bundled with the official Tyk Gateway Docker image to reduce exposure to security vulnerabilities in the Python libraries.

Whilst the Gateway still supports Python plugins, you must [extend the image]({{< ref "plugins/supported-languages/rich-plugins/python/python#install-the-python-development-packages" >}}) to add the language support.
<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc. -->
<!-- #### Planned Breaking Changes -->

### Dependencies
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.3.0 | MDCB v2.5     | MDCB v2.4.2 |
|         | Operator v0.17 | Operator v0.16 |
|         | Sync v1.4.3   | Sync v1.4.3 |
|         | Helm Chart (tyk-stack, tyk-oss, tyk-dashboard, tyk-gateway) v1.3.0 | Helm all versions |
| | EDP v1.8.3 | EDP all versions |
| | Pump v1.9.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.19 (GQL), 1.21 (GW)  | 1.19 (GQL), 1.21 (GW)  | [Go plugins]({{< ref "plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
In 5.3.0, we have simplified the configuration of response transform middleware. We encourage users to embrace the `global_headers` mechanism as the `response_processors.header_injector` is now an optional setting and will be removed in a future release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions
<!-- Required. For patches release (Z>0) use this:
For users currently on vX.Y.Z, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version X.Y.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
If you are upgrading to 5.3.0, please follow the detailed [upgrade instructions](#upgrading-tyk).


### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We’re thrilled to announce the release of 5.3.0, an update packed with exciting features and significant fixes to elevate your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v5.3.0) below.


#### Tyk OAS Feature Maturity
Tyk OAS is now out of [Early Access]({{< ref "frequently-asked-questions/using-early-access-features" >}}) as we have reached feature maturity. You are now able to make use of the majority of Tyk Gateway's features from your Tyk OAS APIs, so they are a credible alternative to the legacy Tyk Classic APIs.

From Tyk 5.3.0 we support the following features when using Tyk OAS APIs with Tyk Gateway:

- Security
    - All Tyk-supported client-gateway authentication methods including custom auth plugins
    - Automatic configuration of authentication from the OpenAPI description
    - Gateway-upstream mTLS
    - CORS    

- API-level (global) middleware including:
    - Response caching
    - Custom plugins for PreAuth, Auth, PostAuth, Post and Response hooks
    - API-level rate limits
    - Request transformation - headers
    - Response transformation - headers
    - Service discovery
    - Internal API

- Endpoint-level (per-path) middleware including:
    - Request validation - headers and body (automatically configurable from the OpenAPI description)
    - Request transformation - method, headers and body
    - Response transformation - headers and body
    - URL rewrite and internal endpoints
    - Mock responses (automatically configurable from the OpenAPI description)
    - Response caching
    - Custom Go Post-Plugin
    - Request size limit
    - Virtual endpoint
    - Allow and block listing
    - Do-not-track
    - Circuit breakers
    - Enforced timeouts
    - Ignore authentication

- Observability
    - Open Telemetry tracing
    - Detailed log recording (include payload in the logs)
    - Do-not-track endpoint

- Governance
    - API Versioning


#### Enhanced KV storage of API Definition Fields
Tyk is able to store configuration data from the API definition in KV systems, such as Vault and Consul, and then reference these values during configuration of the Tyk Gateway or APIs deployed on the Gateway. Previously this was limited to the Target URL and Listen Path but from 5.3.0 you are able to store any `string` type field from your API definition, unlocking the ability to store sensitive information in a centralised location. For full details check out the [documentation]({{< ref "tyk-configuration-reference/kv-store" >}}) of this powerful feature.

#### Redis v7.x Compatibility
We have upgraded redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

#### Gateway and Component Upgrades
We've raised the bar with significant upgrades to our Gateway and components. Leveraging the power and security of Go 1.21, upgrading Sarama to version 1.41.0 and enhancing the GQL engine with Go version 1.19, we ensure improved functionality and performance to support your evolving needs seamlessly.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/vX.Y.Z/images/blabla)
- <<Helm charts links>>
- [source code tarball for OSS projects]()

### Changelog {#Changelog-v5.3.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

#### Added
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Additional features now supported when working with Tyk OAS APIs</summary>

The following features have been added in 5.3.0 to bring Tyk OAS to feature maturity:
 - Detailed log recording (include payload in the logs)
 - Enable Open Telemetry tracing
 - Context variables available to middleware chain
 - API-level header transforms (request and response)
 - Endpoint-level cache
 - Circuit breakers
 - Track endpoint logs for inclusion in Dashboard aggregated data
 - Do-not-track endpoint
 - Enforced upstream timeouts
 - Configure endpoint as Internal, not available externally
 - URL rewrite
 - Per-endpoint request size limit
 - Request transformation - method, header
 - Response transformation - header
 - Custom domain certificates

</details>
</li>
<li>
<details>
<summary>Enhanced KV storage for API Definition fields</summary>

We have implemented support for all `string` type fields in the Tyk OAS and Tyk Classic API Definitions to be stored in separate KV storage, including Hashicorp Consul and Vault.
</details>
</li>
<li>
<details>
<summary>Support for Redis v7.0.x</summary>

Tyk 5.3 refactors Redis connection logic by using [storage v1.2.2](https://github.com/TykTechnologies/storage/releases/tag/v1.2.2), which integrates with [go-redis](https://github.com/redis/go-redis) v9. Subsequently, Tyk 5.3 supports Redis v7.0.x.
</details>
</li>
<li>
<details>
<summary>Clearer error messages from GQL engine for invalid variables (JSON Schema)</summary>

Some of the error messages generated by the GQL engine were unclear for users, especially relating to variable validation. The errors have been changed and are now much more clearer and helpful in cases where engine processing fails.
</details>
</li>
<li>
<details>
<summary>Upgraded GQL Engine's Go version to 1.19</summary>

Upgraded Go version for GraphQL engine to [1.19](https://go.dev/doc/go1.19).
</details>
</li>
<li>
<details>
<summary>Enhanced semantic conventions for GraphQL spans in Gateway</summary>

We've added OpenTelemetry semantic conventions for GraphQL spans. Spans will now incorporate `<operation.type>`, `<operation.name>` and `<document>` tags.
</details>
</li>
<li>
<details>
<summary>Added support for detailed_tracing to be configured via GQL API definitions</summary>

GraphQL APIs can now use the `detailed_tracing` setting in an API definition. With that property set to `true` any call to a GraphQL API will create a span for each middleware involved in request processing. While it is set to `false`, only two spans encapsulating the entire request lifecycle will be generated. This setting helps to reduce the size of traces, which can get large for GraphQL APIs. Furthermore, this gives users an option to customise the level of tracing detail to suit their monitoring needs.
</details>
</li>
<li>
<details>
<summary>Enhanced OpenTelemetry trace generation for UDG with mixed data sources</summary>

This release introduces an enhanced trace generation system for Universal Data Graph (UDG). It consolidates all spans from both Tyk-managed and external data source executions into a single trace when used together. Furthermore, when UDG solely utilises Tyk-managed data sources, trace management is simplified and operational visibility is improved.
</details>
</li>
<li>
<details>
<summary>Disabled normalise and validate in GraphQL Engine</summary>

For GraphQL requests normalisation and validation has been disabled in the GraphQL engine. Both of those actions were performed in the Tyk Gateway and were unnecessary to be done again in the engine. This enhances performance slightly and makes detailed OTel traces concise and easier to read.
</details>
</li>
<li>
<details>
<summary>Added introspection_config to Tyk Classic API definition</summary>

Added a new set of settings in the API definition called *introspection_config*. This enables users to have more control over introspection on a single GQL API level.
</details>
</li>
<li>
<details>
<summary>Enhanced UDG's handling of arrays of objects in OpenAPI Documents</summary>

The Tyk Dashboard API endpoint */api/data-graphs/data-sources/import* now handles OpenAPI schemas with arrays of objects. This addition means users can now import more complex OpenAPI documents and transform them into UDG configurations.
</details>
</li>
<li>
<details>
<summary>OAS-to-UDG converter support for allOf/anyOf/oneOf keywords</summary>

The OAS-to-UDG converter now seamlessly handles OpenAPI descriptions that utilise the *allOf*, *anyOf* and *oneOf* keywords, ensuring accurate and comprehensive conversion to a Tyk API definition. The feature expands the scope of OpenAPI documents that the converter can handle and allows our users to import REST API data sources defined in OAS in more complex cases.
</details>
</li>
<li>
<details>
<summary>Improved UDG's handling of unnamed object definitions in OpenAPI descriptions</summary>

The OAS-to-UDG converter can now create GraphQL types even if an object's definition doesn’t have an explicit name.
</details>
</li>
<li>
<details>
<summary>Refined handling of arrays of objects in endpoint responses by OAS-to-UDG Converter</summary>

The OAS-to-UDG converter was unable to handle a document properly if an object within the OpenAPI description had no properties defined. This limitation resulted in unexpected behaviour and errors during the conversion process. The tool will now handle such cases seamlessly, ensuring a smoother and more predictable conversion process.
</details>
</li>
<li>
<details>
<summary>OAS-to-UDG converter support for enumerated types in OpenAPI descriptions</summary>

Previously OAS-to-UDG converter had limitations in handling enums from OpenAPI descriptions, leading to discrepancies and incomplete conversions. With the inclusion of enum support, the OAS converter now seamlessly processes enums defined in your OpenAPI descriptions, ensuring accurate and complete conversion to GraphQL schemas.
</details>
</li>
<li>
<details>
<summary>Expanded handling of HTTP Status Code ranges by OAS-to-GQL converter</summary>

OAS-to-UDG converter can now handle HTTP status code ranges that are defined by the OpenAPI Specification. This means that code ranges defined as 1XX, 2XX, etc will be correctly converted by the tool.
</details>
</li>
</ul>

#### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Prefetch session expiry information from MDCB to reduce API call duration in case Gateway is temporarily disconnected from MDCB</summary>

Previously, when operating in a worker configuration (in the data plane), the Tyk Gateway fetched session expiry information from the control plane the first time an API was accessed for a given organisation. This approach led to a significant issue: if the MDCB connection was lost, the next attempt to consume the API would incur a long response time. This delay, typically around 30 seconds, was caused by the Gateway waiting for the session-fetching operation to time out, as it tried to communicate with the now-inaccessible control plane.

<br>Now, the worker gateway fetches the session expiry information up front, while there is an active connection to MDCB. This ensures that this data is already available locally in the event of an MDCB disconnection.

<br>This change significantly improves the API response time under MDCB disconnection scenarios by removing the need for the Gateway to wait for a timeout when attempting to fetch session information from the control plane, avoiding the previous 30-second delay. This optimisation enhances the resilience and efficiency of Tyk Gateway in distributed environments.
</details>
</li>
<li>
<details>
<summary>Changes to the Tyk OAS API Definition</summary>

We have made some changes to the Tyk OAS API Definition to provide a stable contract that will now be under breaking-change control for future patches and releases as Tyk OAS moves out of Early Access. Changes include the removal of the unnecessary `slug` field and simplification of the custom plugin contract.

</details>
</li>
</ul>
 
#### Fixed
<!-- This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:

- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Improved OAuth token management in Redis</summary>

In this release, we fixed automated token trimming in Redis, ensuring efficient management of OAuth tokens by implementing a new hourly job within the Gateway and providing a manual trigger endpoint. 
</details>
</li>
<li>
<details>
<summary>Tyk Gateway now validates RFC3339 Date-Time Formats</summary>

We fixed a bug in the Tyk OAS Validate Request middleware where we were not correctly validating date-time format schema, which could lead to invalid date-time values reaching the upstream services.
</details>
</li>
<li>
<details>
<summary>Inaccurate Distributed Rate Limiting (DRL) behavior on Gateway startup</summary>

Fixed an issue when using the Distributed Rate Limiter (DRL) where the Gateway did not apply any rate limit until a DRL notification was received. Now the rate of requests will be limited at 100% of the configured rate limit until the DRL notification is received, after which the limit will be reduced to an even share of the total (i.e. 100% divided by the number of Gateways) per the rate limit algorithm design.
</details>
</li>
<li>
<details>
<summary>Duplicate fields added by OAS-to-UDG translator</summary>

Fixed an issue where the OAS-to-UDG converter was sometimes adding the same field to an object type many times. This caused issues with the resulting GQL schema and made it non-compliant with GQL specification.
</details>
</li>
<li>
<details>
<summary>Gateway issue processing queries with GQL Engine</summary>

Fixed an issue where the Gateway attempted to execute a query with GQL engine version 1 (which lacks OTel support), while simultaneously trying to validate the same query with the OpenTelemetry (OTel) supported engine. It caused the API to fail with an error message "Error socket hang up". Right now with OTel enabled, the gateway will enforce GQL engine to default to version 2, so that this problem doesn't occur anymore.
</details>
</li>
<li>
<details>
<summary>Handling arrays of objects in endpoint responses by OAS-to-UDG converter</summary>

The OAS-to-UDG converter now effectively handles array of objects within POST paths. Previously, there were instances where the converter failed to accurately interpret and represent these structures in the generated UDG configuration.
</details>
</li>
<li>
<details>
<summary>Playground issues in Cloud/K8s deployments</summary>

An issue was identified where the encoding from the GQL upstream cache was causing readability problems in the response body. Specifically, the upstream GQL cache was utilizing brotli compression and not respecting the Accept-Encoding header. Consequently, larger response bodies became increasingly unreadable for the GQL engine due to compression, leading to usability issues for users accessing affected content. The issue has now been fixed by adding the brotli encoder to the GQL engine.
</details>
</li>
<li>
<details>
<summary>OAS-to-UDG Converter issue with "json" Return Type</summary>

OAS-to-UDG converter was unable to correctly process Tyk OAS API definitions where "json" was used as one of enum values. This issue is now fixed and whenever "json" is used as one of enums in the OpenAPI description, it will get correctly transformed into a custom scalar in GQL schema.
</details>
</li>
<li>
<details>
<summary>Gateway Panic during API Edit with Virtual Endpoint</summary>

Fixed an issue where the Gateway could panic while updating a Tyk OAS API with the Virtual Endpoint middleware configured.
</details>
</li>
<li>
<details>
<summary>Gateway panics during API Reload with JavaScript middleware bundle</summary>

Fixed an issue where reloading a bundle containing JS plugins could cause the Gateway to panic.
</details>
</li>
<li>
<details>
<summary>GraphQL introspection issue with Allow List</summary>

Fixed an issue where the *Disable introspection* setting was not working correctly in cases where field-based permissions were set (allow or block list). It was not possible to introspect the GQL schema while introspection was technically allowed but field-based permissions were enabled. Currently, Allow/Block list settings are ignored only for introspection queries and introspection is only controlled by the *Disable introspection* setting.
</details>
</li>
<li>
<details>
<summary>Handling of objects without properties in OAS-to-UDG converter</summary>

The OAS-to-UDG converter was unable to handle a document properly if an object within the OpenAPI description had no properties defined. This limitation resulted in unexpected behavior and errors during the conversion process. The tool will now handle such cases seamlessly, ensuring a smoother and more predictable conversion process
</details>
</li>
<li>
<details>
<summary>Fixed memory leak issue in Tyk Gateway v5.2.4</summary>

Addressed a memory leak issue in Tyk Gateway linked to a logger mutex change introduced in v5.2.4. Reverting these changes has improved connection management and enhanced system performance.
</details>
</li>

</ul>


#### Security Fixes
<!-- This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->

<ul>
<li>
<details>
<summary>High priority CVEs fixed</summary>

Fixed the following high priority CVEs identified in the Tyk Gateway, providing increased protection against security vulnerabilities:
- [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
- [CVE-2023-45283](https://nvd.nist.gov/vuln/detail/CVE-2023-45283)
</details>
</li>
</ul>

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->
---

<!--
Repeat the release notes section above for every patch here
-->


<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->
## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### API Documentation
<!-- Required. Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?             
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
-->
- [Tyk Gateway API]({{<ref "tyk-gateway-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
