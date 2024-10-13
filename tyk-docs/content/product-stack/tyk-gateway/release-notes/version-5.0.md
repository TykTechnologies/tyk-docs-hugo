---
title: Tyk Gateway 5.0 Release Notes
description: Tyk Gateway v5.0 release notes
tags: ["release notes", "Tyk Gateway", "v5.0", "5.0", "5.0.0", "5.0.1", "5.0.1", "5.0.2", "5.0.3", "5.0.4", "5.0.5", "5.0.6", "5.0.7", "5.0.8", "5.0.9", "5.0.10", "5.0.11", "5.0.13", "5.0.14"]
aliases:
    - /release-notes/version-5.0/
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.0.X displayed in reverse chronological order**

---

## 5.0.14 Release Notes {#rn-v5.0.14}

### Release Date 18th September 2024

{{< note success >}}
**Important Update**<br>
<br>
<b>Date</b>: 12 October 2024<br>
<b>Topic</b>: Gateway panic when reconnecting to MDCB control plane or Tyk Cloud<br>
<b>Workaround</b>: Restart Gateway<br>
<b>Affected Product</b>: Tyk Gateway as an Edge Gateway<br>
<b>Affected versions</b>: v5.6.0, v5.3.6, and v5.0.14<br>
<b>Issue Description:</b><br>
<p>We have identified an issue affecting Tyk Gateway deployed as a data plane connecting to the Multi-Data Center Bridge (MDCB) control plane or Tyk Cloud. In the above mentioned Gateway versions a panic may occur when gateway reconnect to the control plane after the control plane is restarted.
<p>Our engineering team is actively working on a fix, and a patch (versions 5.6.1, 5.3.7, and 5.0.15) will be released soon.<br>
<b>Recommendations:</b><br>
<ul>
<li><b>For users on versions 5.5.0, 5.3.5, and 5.0.13</b><br>
We advise you to delay upgrading to the affected versions (5.6.0, 5.3.6, or 5.0.14) until the patch is available.

<li><b>For users who have already upgraded to 5.6.0, 5.3.6, or 5.0.14 and are experiencing a panic in the gateway:</b><br>
Restarting the gateway process will restore it to a healthy state. If you are operating in a *Kubernetes* environment, Tyk Gateway instance should automatically restart, which ultimately resolves the issue.<br>
</ul>
<p>We appreciate your understanding and patience as we work to resolve this. Please stay tuned for the upcoming patch release, which will address this issue.
{{< /note >}}

### Breaking Changes
**Attention:** Please read this section carefully.

There are no breaking changes in this release.

### Upgrade Instructions

This release is not tightly coupled with Tyk Dashboard v5.0.14, so you do not have to upgrade both together.


Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk) section for detailed upgrade instructions.

### Release Highlights

This release fixes some issues related to the way that Tyk performs URL path matching, introducing two new Gateway configuration options to control path matching strictness.

### Changelog {#Changelog-v5.0.14}

#### Added

<ul>
<li>
<details>
<summary>Implemented Gateway configuration options to set URL path matching strictness</summary>

We have introduced two new options in the `http_server_options` [Gateway configuration]({{< ref "tyk-oss-gateway/configuration#http_server_options" >}}) that will enforce prefix and/or suffix matching when Tyk performs checks on whether middleware or other logic should be applied to a request:

- `enable_path_prefix_matching` ensures that the start of the request path must match the path defined in the API definition
- `enable_path_suffix_matching` ensures that the end of the request path must match the path defined in the API definition
- combining `enable_path_prefix_matching` and `enable_path_suffix_matching` will ensure an exact (explicit) match is performed

These configuration options provide control to avoid unintended matching of paths from Tyk's default *wildcard* match. Use of regex special characters when declaring the endpoint path in the API definition will automatically override these settings for that endpoint.

**Tyk recommends that exact matching is employed, but both options default to `false` to avoid introducing a breaking change for existing users.**
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Incorrectly configured regex in policy affected Path-Based Permissions authorization</summary>

Fixed an issue when using granular [Path-Based Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) in access policies and keys that led to authorization incorrectly being granted to endpoints if an invalid regular expression was configured in the key/policy. Also fixed an issue where path-based parameters were not correctly handled by Path-Based Permissions. Now Tyk's authorization check correctly handles both of these scenarios granting access only to the expected resources.
</details>
</li>
<li>
<details>
<summary>Missing path parameter can direct to the wrong endpoint</summary>

Fixed an issue where a parameterized endpoint URL (e.g. `/user/{id}`) would be invoked if a request is made that omits the parameter. For example, a request to `/user/` will now be interpreted as a request to `/user` and not to `/user/{id}`.
</details>
</li>

<li>
<details>
<summary>Improved Gateway Synchronization with MDCB for Policies and APIs</summary>

We have enhanced the Tyk Gateway's synchronization with MDCB to ensure more reliable loading of policies and APIs. A synchronous initialization process has been implemented to prevent startup failures and reduce the risk of service disruptions caused by asynchronous operations. This update ensures smoother and more consistent syncing of policies and APIs from MDCB.
</details>
</li>
</ul>

---

## 5.0.13 Release Notes

### Release Date 4 July 2024

### Release Highlights

Resolved an issue encountered in MDCB environments where changes to custom keys made via the Dashboard were not properly replicated to dataplanes. The issue impacted both key data and associated quotas, in the following versions:
- 5.0.4 to 5.0.12
- 5.1.1 and 5.1.2
- 5.2.0 to 5.2.6
- 5.3.0 to 5.3.2

##### Action Required
Customers should clear their edge Redis instances of any potentially affected keys to maintain data consistency and ensure proper synchronization across their environments. Please refer to the item in the [fixed](#fixed) section of the changelog for recommended actions.

### Changelog {#Changelog-v5.0.13}

#### Fixed

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
</ul>

---

## 5.0.12 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12).

---

## 5.0.11 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11).

---

## 5.0.10 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10).

---

## 5.0.9 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9).

---

## 5.0.8 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8).

---

## 5.0.7 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.7).

---

## 5.0.6 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.6).

---

## 5.0.5 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.5).

---

## 5.0.4 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.4).

---

## 5.0.3 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.3).

---

## 5.0.2 Release Notes

##### Release Date 29 May 2023

#### Release Highlights

This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.2">}}) below.

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.2/images/sha256-5e126d64571989f9e4b746544cf7a4a53add036a68fe0df4502f1e62f29627a7?context=explore) 
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.2)

#### Changelog {#Changelog-v5.0.2}

##### Updated
- Internal refactoring to make storage related parts more stable and less affected by potential race issues

---

## 5.0.1 Release Notes

##### Release Date 25 Apr 2023

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.1">}}) below.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.1/images/sha256-5fa7aa910d62a7ed2c1cfbc68c69a988b4b0e9420d7a52018f80f9a45cadb083?context=explore
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.1)

#### Changelog {#Changelog-v5.0.1}

##### Added
- Added a new `enable_distributed_tracing` option to the NewRelic config to enable support for Distributed Tracer

##### Fixed
- Fixed  panic when JWK method was used for JWT authentication and the token didn't include kid
- Fixed an issue where failure to load GoPlugin middleware didn’t prevent the API from proxying traffic to the upstream: now Gateway logs an error when the plugin fails to load (during API creation/update) and responds with HTTP 500 if the API is called; at the moment this is fixed only for file based plugins
- Fixed MutualTLS issue causing leak of allowed CAs during TLS handshake when there are multiple mTLS APIs
- Fixed a bug during hot reload of Tyk Gateway where APIs with JSVM plugins stored in filesystem were not reloaded
- Fixed a bug where the gateway would remove the trailing `/`at the end of a URL
- Fixed a bug where nested field-mappings in UDG weren't working as intended
- Fixed a bug when using Tyk OAuth 2.0 flow on Tyk Cloud where a request for an Authorization Code would fail with a 404 error
- Fixed a bug where mTLS negotiation could fail when there are a large number of certificates and CAs; added an option (`http_server_options.skip_client_ca_announcement`) to use the alternative method for certificate transfer
- Fixed CVE issue with go.uuid package
- Fixed a bug where rate limits were not correctly applied when policies are partitioned to separate access rights and rate limits into different scopes

---

## 5.0.0 Release Notes

##### Release Date 28 Mar 2023

#### Deprecations
- Tyk Gateway no longer natively supports **LetsEncrypt** integration. You still can use LetsEncrypt CLI tooling to generate certificates and use them with Tyk.

#### Release Highlights

##### Improved OpenAPI support

We have added some great features to the Tyk OAS API definition bringing it closer to parity with our Tyk Classic API and to make it easier to get on board with Tyk using your Open API workflows.

Tyk’s OSS users can now make use of extensive [custom middleware](https://tyk.io/docs/plugins/) options with your OAS APIs, to transform API requests and responses, exposing your upstream services in the way that suits your users and internal API governance rules. We’ve enhanced the Request Validation for Tyk OAS APIs to include parameter validation (path, query, headers, cookie) as well as the body validation that was introduced in Tyk 4.1.

[Versioning your Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) is easier than ever, with the Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve also added a new endpoint on the Tyk API that will return details of the versions for a given API.

We’ve improved support for [OAS Mock Responses]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}), with the Tyk OAS API definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing flexibility.

Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the best way for you to create and manage your APIs.

Thanks to our community contributors [armujahid](https://github.com/armujahid), [JordyBottelier](https://github.com/JordyBottelier) and [ls-michal-dabrowski](https://github.com/ls-michal-dabrowski) for your PRs that further improve the quality of Tyk OSS Gateway!

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.0/images/sha256-196815adff2805ccc14c267b14032f23913321b24ea86c052b62a7b1568b6725?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.0)

#### Changelog {#Changelog-v5.0.0}

##### Added
- Support for request validation (including query params, headers and the rest of OAS rules) with Tyk OAS APIs
- Transform request/response middleware for Tyk OAS APIs
- Custom middleware for Tyk OAS APIs
- Added a new API endpoint to manage versions for Tyk OAS APIs
- Improved Mock API plugin for Tyk OAS APIs
- Universal Data Graph and GraphQL APIs now support using context variables in request headers, allowing passing information it to your subgraphs
- Now you can control access to introspection on policy and key level

#### Fixed
- Fixed potential race condition when using distributed rate limiter

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-dashboard-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-374cc3d0-f16d-4620-a435-68c53553ca40)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
