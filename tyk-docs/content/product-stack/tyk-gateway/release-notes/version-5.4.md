---
title: Tyk Gateway 5.4 Release Notes
date: 2024-03-27T15:51:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Gateway versions within the 5.4.X series."
tags: ["Tyk Gateway", "Release notes", "v5.4", "5.4.0", "5.4", "changelog"]
---

<!-- Required. oss or licensed. Choose one of the following:
    **Licensed Protected Product**
    Or
    ****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**
-->

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.4.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 5.4.0 Release Notes

### Release Date 2 July 2024

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
**Attention: Please read this section carefully**

There are no breaking changes in this release.

### Dependencies {#dependencies-5.4.0}
<!--Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

#### Compatibility Matrix For Tyk Components
<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. -->
| Gateway Version | Recommended Releases | Backwards Compatibility |
|----    |---- |---- |
| 5.4.0 | MDCB v2.6     | MDCB v2.4.2 |
|         | Operator v0.18 | Operator v0.17 |
|         | Sync v1.5   | Sync v1.4.3 |
|         | Helm Chart v1.5.0 | Helm all versions |
| | EDP v1.9 | EDP all versions |
| | Pump v1.10.0 | Pump all versions |
| | TIB (if using standalone) v1.5.1 | TIB all versions |

The above table needs reviewing and updating if necessary

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                       | Tested Versions        | Compatible Versions    | Comments | 
| ------------------------------------------------------------ | ---------------------- | ---------------------- | -------- | 
| [Go](https://go.dev/dl/)                                     | 1.19 (GQL), 1.21 (GW)  | 1.19 (GQL), 1.21 (GW)  | [Go plugins]({{< ref "/plugins/supported-languages/golang" >}}) must be built using Go 1.21 | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by Tyk Gateway | 
| [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)| v3.0.x                 | v3.0.x                 | Supported by [Tyk OAS]({{< ref "/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc" >}}) |

Given the potential time difference between your upgrade and the release of this version, we recommend users verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

**The above table needs reviewing and updating if necessary**

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
Deprecations should be announced here

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions {#upgrade-5.4.0}
If you are upgrading to 5.4.0, please follow the detailed [upgrade instructions](#upgrading-tyk).

Add upgrade steps here if necessary.

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
We're thrilled to introduce exciting enhancements in Tyk Gateway 5.4, aimed at improving your experience with Tyk Gateway. For a comprehensive list of changes, please refer to the change log below.

#### Enhanced Rate Limiting Strategies

We've introducing a [Rate Limit Smoothing]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) option for the spike arresting Redis Rate Limiter to give the upstream time to scale in response to increased request rates.

#### Fixed MDCB Issue Relating To Replication Of Custom Keys To Dataplanes

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:

- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

##### Action Required
Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the changelog for recommended actions.

#### Fixed Window Rate Limiter

Ideal for persistent connections with load-balanced gateways, the [Fixed Window Rate Limiter]({{< ref "/getting-started/key-concepts/rate-limiting#fixed-window-rate-limiter" >}}) algorithm mechanism ensures fair handling of requests by allowing only a predefined number to pass per rate limit window. It uses a simple shared counter in Redis so requests do not need to be evenly balanced across the gateways.

#### Event handling with Tyk OAS

We’ve added support for you to [register webhooks]({{< ref "/basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) with your Tyk OAS APIs so that you can handle events triggered by the Gateway, including circuit breaker and quota expiry. You can also assign webhooks to be fired when using the new [smoothing rate limiter]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) to notify your systems of ongoing traffic spikes.

#### Enhanced Header Handling in GraphQL APIs

Introduced a features object in API definitions for GQL APIs, including the `use_immutable_headers` attribute. This allows advanced header control, enabling users to add new headers, rewrite existing ones, and selectively remove specific headers. Existing APIs will have this attribute set to `false` by default, ensuring no change in behavior. For new APIs, this attribute is true by default, facilitating smoother migration and maintaining backward compatibility.

### Downloads
- [Docker image to pull](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=v5.4.0)
  - ```bash
    docker pull tykio/tyk-gateway:v5.4.0
    ``` 
- Helm charts
  - [tyk-charts v1.5]({{< ref "/product-stack/tyk-charts/release-notes/version-1.5.md" >}})
- [Source code tarball for OSS projects](https://github.com/TykTechnologies/tyk/releases)

### Changelog {#Changelog-v5.4.0}
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
<summary>Implemented Fixed Window Rate Limiting for load balancers with keep-alives</summary>

Introduced a [Fixed Window Rate Limiting]({{< ref "/getting-started/key-concepts/rate-limiting#fixed-window-rate-limiter" >}}) mechanism to handle rate limiting for load balancers with keep-alives. This algorithm allows the defined number of requests to pass for every rate limit window and blocks any excess requests. It uses a simple shared counter in Redis to count requests. It is suitable for situations where traffic towards Gateways is not balanced fairly. To enable this rate limiter, set `enable_fixed_window_rate_limiter` in the gateway config or set the environment variable `TYK_GW_ENABLEFIXEDWINDOWRATELIMITER=true`.
</details>
</li>
<li>
<details>
<summary>Introduced Rate Limit Smoothing for scaling</summary>

Implemented [Rate Limit Smoothing]({{< ref "/getting-started/key-concepts/rate-limiting#rate-limit-smoothing" >}}) as an extension to the existing Redis Rate Limiter to gradually adjust the rate based on smoothing configuration. Two new Gateway events have been created  (`RateLimitSmoothingUp` and `RateLimitSmoothingDown`) which will be triggered as smoothing occurs. These can be used to assist with auto-scaling of upstream capacity during traffic spikes.
</details>
</li>
<li>
<details>
<summary>Introduced ‘use_immutable_headers’ for Advanced Header Control in GraphQL APIs</summary>

We've added the `use_immutable_headers` option to the GraphQL API configuration, offering advanced header transformation capabilities. When enabled, users can add new headers, rewrite existing ones, and selectively remove specific headers, allowing granular control without altering the original request. Existing APIs will default to `false`, maintaining current behavior until ready for upgrade.
</details>
</li>
<li>
<details>
<summary>Enhanced manual schema addition for GQL APIs</summary>

Introduced an option for users to manually provide GQL schemas when creating APIs in Tyk, eliminating the dependency on upstream introspection. This feature enables the creation and editing of GQL APIs in Tyk even when upstream introspection is unavailable, providing flexibility for schema management as upstream configurations evolve over time. 
</details>
</li>
<li>
<details>
<summary>Introduced Tyk v3 GraphQL Engine in Gateway</summary>

The new GraphQL engine, version 3-preview, is now available in Tyk Gateway. It can be used for any GQL API by using the following enum in raw API definition: *"version": "3-preview"*. This experimental version offers optimised GQL operation resolution, faster response times, and a more efficient data loader. It is currently not recommended for production use and will be stabilised in future releases, eventually becoming the default for new GQL APIs in Tyk. 
</details>
</li>
<li>
<details>
<summary>Introduced features Object in API Definition for GQL APIs</summary>

Enhanced request headers handling in API definitions for GQL APIs by introducing a *features* object. Users can now set the `use_immutable_headers` attribute, which defaults to false for existing APIs, ensuring no change in header behavior. For new APIs, this attribute is `true` by default, facilitating smoother migration and maintaining backwards compatibility.
</details>
</li>
<li>
<details>
<summary>New Tyk OAS features</summary>

We’ve added some more features to the Tyk OAS API, moving closer to full parity with Tyk Classic. In this release we’ve added controls that allow you: to enable or prevent generation of traffic logs at the API-level and to enable or prevent the availability of session context to middleware. We’ve also added the facility to register webhooks that will be fired in response to Gateway events. 
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
<summary>Resolved an issue where changes to custom keys were not properly replicated to dataplanes</summary>

Resolved a critical issue affecting MDCB environments, where changes to custom keys made via the dashboard were not properly replicated to dataplanes. This affected both the key data and associated quotas. This issue was present in versions:
- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

**Action Required**

Customers are advised to clear their edge Redis instances of any keys that might have been affected by this bug to ensure data consistency and proper synchronization across their environments. There are several methods available to address this issue:

1. **Specific Key Deletion via API**: To remove individual buggy keys, you can use the following API call:

```bash
curl --location --request DELETE 'http://tyk-gateway:{tyk-hybrid-port}/tyk/keys/my-custom-key' \ --header 'X-Tyk-Authorization: {dashboard-key}'
```

Replace `{tyk-hybrid-port}`, `my-custom-key` and `{dashboard-key}` with your specific configuration details. This method is safe and recommended for targeted removals without affecting other keys.

2. **Bulk Key Deletion Using Redis CLI**: For environments with numerous affected keys, you might consider using the Redis CLI to remove keys en masse:

```bash
redis-cli --scan --pattern 'apikey-*' | xargs -L 1 redis-cli del
redis-cli --scan --pattern 'quota-*' | xargs -L 1 redis-cli del
```

This method can temporarily impact the performance of the Redis server, so it should be executed during a maintenance window or when the impact on production traffic is minimal.

3. **Complete Redis Database Flush**: If feasible, flushing the entire Redis database offers a clean slate:

```bash
redis-cli FLUSHALL ASYNC
```

**Implications**
Regardless of the chosen method, be aware that quotas will be reset and will need to resynchronize across the system. This may temporarily affect reporting and rate limiting capabilities.
</details>
</li>
<li>
<details>
<summary>Resolved service discovery issue when using Consul</summary>

Addressed an issue with service discovery where an IP returned by Consul wasn't parsed correctly on the Gateway side, leading to unexpected errors when proxying requests to the service. Typically, service discovery returns valid domain names, which did not trigger the issue.
</details>
</li>
<li>
<details>
<summary>Corrected naming for semantic conventions attributes in GQL Spans</summary>

Fixed an issue where GQL Open Telemetry semantic conventions attribute names that lacked the 'graphql' prefix, deviating from the community standard. All attributes now have the correct prefix.
</details>
</li>
<li>
<details>
<summary>Fixed missing GraphQL OTel attributes in spans on request validation failure</summary>

Corrected an issue where GraphQL OTel attributes were missing from spans when request validation failed in cases where `detailed_tracing` was set to `false`. Traces now include GraphQL attributes (operation name, type, and document), improving debugging for users.
</details>
</li>
<li>
<details>
<summary>Resolved Gateway panic with Persist GraphQL Middleware</summary>

Fixed a gateway panic issue observed by users when using the *Persist GQL* middleware without defined arguments. The gateway will no longer throw panics in these cases.
</details>
</li>
<li>
<details>
<summary>Resolved issue with GraphQL APIs handling OPTIONS requests</summary>

Fixed an issue with GraphQL API's Cross-Origin Resource Sharing (CORS) configuration, which previously caused the API to fail in respecting CORS settings. This resulted in an inability to proxy requests to upstream servers and handle OPTIONS/CORS requests correctly. With this fix, users can now seamlessly make requests, including OPTIONS method requests, without encountering the previously reported error.
</details>
</li>
<li>
<details>
<summary>Resolved conflict with multiple APIs sharing listen path on different domains</summary>

Fixed an issue where the Gateway did not respect API domain settings when there was another API with the same listen path but no domain. This could lead to the custom domain API not functioning correctly, depending on the order in which APIs were loaded. APIs with custom domains are now prioritised before those without custom domains to ensure that the custom domain is not ignored.
</details>
</li>
<li>
<details>
<summary>Resolved nested field mapping issue in Universal Data Graph</summary>

Addressed a problem with nested field mapping in UDG for GraphQL (GQL) operations. Previously, querying a single nested field caused an error, while including another *normal* field from the same level allowed the query to succeed. This issue has been fixed to ensure consistent behavior regardless of the query composition.
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
Please visit our [Developer Support]({{< ref "/frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
