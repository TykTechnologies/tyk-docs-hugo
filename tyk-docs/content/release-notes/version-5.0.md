---
title: Tyk v5.0
menu:
  main:
    parent: "Release Notes"
weight: 1
tags: ["release notes", "Tyk Gateway", "Tyk Dashboard", "v5.0", "5.0", "5.0.0", "5.0.1", "5.0.1", "5.0.2", "5.0.3", "5.0.4", "5.0.5", "5.0.6", "5.0.7", "5.0.8", "5.0.9"]
---

## 5.0.15 Release Notes {#rn-v5.0.15}

### Release Date 24 October 2024

### Tyk Gateway

### Breaking Changes

There are no breaking changes in this release.

### Upgrade Instructions

Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk)
section for detailed upgrade instructions.

### Release Highlights

This patch release for Tyk Gateway addresses critical stability issues for users running Tyk Gateway within the data
plane, connecting to the control plane or Tyk Hybrid. Affected users should upgrade immediately to version 5.0.15 to
avoid service interruptions and ensure reliable operations with the control plane or Tyk Hybrid.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.15">}}) below.

### Changelog {#Changelog-v5.0.15}

#### Fixed

<ul>
<li>
<details>
<summary>Resolved gateway panic on reconnecting to MDCB control plane or Tyk Cloud</summary>
In version 5.0.14, Tyk Gateway could encounter panic when attempting to reconnect to the control plane after it was restarted. This patch version has resolved this issue, ensuring stable connectivity between the gateway and control plane following reconnections and reducing the need for manual intervention.
</details>
</li>
</ul>

#### Security Fixes

<ul>
<li>
<details>
<summary>Strengthened RBAC password reset permissions</summary>
We have fixed a privilege escalation vulnerability where a user with certain permissions could potentially reset other users’ passwords, including admin accounts. The following changes have been made to tighten the behavior of the password reset permission:
- All users can reset their own passwords
- A specific permission is required to reset the password of another user within the same Tyk organization
- This permission can only be assigned by an admin or super-admin
- This permission can only be assigned to an admin and cannot be assigned to a user group
</details>
</li>
</ul>

### Tyk Dashboard

### Release Highlights

This is a version bump to align with Gateway v5.0.15, no changes have been implemented in this release.

### Breaking Changes

There are no breaking changes in this release.

### Upgrade instructions {#upgrade-5.0.15}

If you are upgrading to 5.0.15, please follow the detailed [upgrade instructions](#upgrading-tyk). 

### Changelog {#Changelog-v5.0.15}

No changes in this release.

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

### Tyk Dashboard

### Release Date 18th September 2024

### Upgrade Instructions

This release is not tightly coupled with Tyk Gateway v5.0.14, so you do not have to upgrade both together.


Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk) section for detailed upgrade instructions.


### Release Highlights

This release fixes some display issues in Tyk Dashboard and Tyk Classic Portal when using PostgreSQL.

### Changelog {#Changelog-v5.0.14}

#### Fixed

<ul>
<li>
<details>
<summary>Tyk Dashboard UI: Fixed display issue for API statistics</summary>

Fixed an issue where API statistics were not being shown when using PostgreSQL and adding two or more tags in the Activity page
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI:  Fixed issue with display of HTTP 429 status codes on the Activity page</summary>

Fixed an issue where HTTP 429 status codes were not being shown on the Activity page when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Classic Portal UI: Fixed display of graphs and requests counter</summary>

Fixed wrong graphs and incorrect requests counter on Tyk Classic Portal when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI: fixed issues with the Error Breakdown display, specifically related to date handling</summary>

Fixed Error Breakdown issue showing errors that happened on different dates than selected date
</details>
</li>
</ul>

### Tyk Gateway

### Breaking Changes

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

## 5.0.12
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12) for Tyk Gateway and Tyk Dashboard.

## 5.0.11
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11) for Tyk Gateway and Tyk Dashboard.

## 5.0.10
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10) for Tyk Gateway and Tyk Dashboard.

## v5.0.9
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9) for Tyk Gateway and Tyk Dashboard.

## v5.0.8
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8) for Tyk Gateway and Tyk Dashboard.

## v5.0.7
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.7) for Tyk Gateway and Tyk Dashboard.

## v5.0.6
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.6) for Tyk Gateway and Tyk Dashboard.

## v5.0.5
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.5) for Tyk Gateway and Tyk Dashboard.

## v5.0.4
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.4) for Tyk Gateway and Tyk Dashboard.

## v5.0.3
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.3) for Tyk Gateway and Tyk Dashboard.

## v5.0.2

### Support for MongoDB 5 and 6
From Tyk 5.0.2, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set new Dashboard config option driver to *mongo-go*. 
The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
- [mgo](https://github.com/go-mgo/mgo) (default): Uses the *mgo* driver. This driver supports MongoDB versions <= v4.x (lower or equal to v4.x). You can get more information about this driver in the [mgo](https://github.com/go-mgo/mgo) GH repository. To allow users more time for migration, we will update our default driver to the new driver, *mongo-go*, in next major release.
- [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports MongoDB versions >= v4.x (greater or equal to v4.x). You can get more information about this driver in [mongo-go-driver](https://github.com/mongodb/mongo-go-driver) GH repository.

See how to [Choose a MongoDB driver]({{< ref "planning-for-production/database-settings/mongodb#choose-a-mongodb-driver" >}})

**Note: Tyk Pump 1.8.0 and MDCB 2.2 releases have been updated to support the new driver option**


### Tyk Dashboard

#### Fixed
- Fixed a bug on migration of a portal catalogue with deleted policy to SQL
- Fixed: Redirect unregistered user to new page when SSOOnlyForRegisteredUsers is set to true

### Tyk Gateway

#### Updated
- Internal refactoring to make storage related parts more stable and less affected by potential race issues


## v5.0.1

### Tyk Gateway

#### Added
- Added a new `enable_distributed_tracing` option to the NewRelic config to enable support for Distributed Tracer

#### Fixed
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

### Tyk Dashboard

#### Added
- Improved security for people using the Dashboard by adding the Referrer-Policy header with the value `no-referrer`
- Added ability to select the plugin driver within the Tyk OAS API Designer

#### Changed
- When creating a new API in the Tyk OAS API Designer, caching is now disabled by default

#### Fixed
- Fixed a bug where a call to the `/hello` endpoint would unnecessarily log `http: superfluous response.WriteHeader call`
- Fixed a bug where the Dashboard was showing *Average usage over time* for all Developers, rather than just those relevant to the logged in developer
- Fixed a bug where logged in users could see Identity Management pages, even if they didn't have the rights to use these features
- Fixed a bug that prevented Tyk Dashboard users from resetting their own passwords
- Fixed issue with GraphQL proxy headers added via UI
- Fixed a bug where the Dashboard would not allow access to any screens if a logged in user didn’t have access to the APIs resource regardless of other access rights
- Fixed a bug on the key management page where searching by `key_id` did not work - you can now initiate the search by pressing enter after typing in the `key_id`
- Fixed a bug where Dashboard API could incorrectly return HTTP 400 when deleting an API
- Fixed UDG UI bug that caused duplicate data source creation on renaming
- Fixed schema validation for custom domain in Tyk OAS API definition
- Fixed a bug where the left menu did not change when Dashboard language was changed
- Fixed a bug that caused the Dashboard to report errors when decoding multiple APIs associated with a policy
- Fixed a bug where it was not possible to disable the Use Scope Claim option when using JWT authentication
- Fixed a bug in the default OPA rule that prevented users from resetting their own password
- Fixed a bug where authToken data was incorrectly stored in the JWT section of the authentication config when a new API was created





## v5.0.0 Major features

### Improved OpenAPI support

We have added some great features to the Tyk OAS API definition bringing it closer to parity with our Tyk Classic API and to make it easier to get on board with Tyk using your Open API workflows.

Tyk’s OSS users can now make use of extensive [custom middleware](https://tyk.io/docs/plugins/) options with your OAS APIs, to transform API requests and responses, exposing your upstream services in the way that suits your users and internal API governance rules. We’ve enhanced the Request Validation for Tyk OAS APIs to include parameter validation (path, query, headers, cookie) as well as the body validation that was introduced in Tyk 4.1.

Tyk Dashboard has been enhanced with **all the custom middleware options** for Tyk OAS APIs, so **for the first time** you can configure your custom middleware from the Dashboard; this covers the full suite of custom middleware from pre- to post- and response plugins. We’ve got support for middleware bundles, Go plugins and Tyk Virtual Endpoints, all within the new and improved Tyk Dashboard UI.

[Versioning your Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) is easier than ever, with the Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve also added a new endpoint on the Tyk API that will return details of the versions for a given API.

Tyk Dashboard hasn’t been left out, we’ve implemented a brand new version management UI for Tyk OAS APIs, to make it as easy as possible for you to manage those API versions as you develop and extend your API products with Tyk.

We’ve improved support for [OAS Mock Responses]({{< ref "getting-started/using-oas-definitions/mock-response" >}}), with the Tyk OAS API definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing flexibility.

Another new feature in the Tyk OAS API Designer is that you can now update (PATCH) your existing Tyk OAS APIs through the Dashboard API without having to resort to curl. That should make life just that little bit easier.
Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the best way for you to create and manage your APIs.

Thanks to our community contributors [armujahid](https://github.com/armujahid), [JordyBottelier](https://github.com/JordyBottelier) and [ls-michal-dabrowski](https://github.com/ls-michal-dabrowski) for your PRs that further improve the quality of Tyk OSS Gateway!


### GraphQL and Universal Data Graph improvements

This release is all about making things easier for our users with GraphQL and Universal Data Graph.

In order to get our users up and running with a working Universal Data Graph quickly, we’ve created a repository of examples that anyone can import into their Dashboard or Gateway and see what Universal Data Graph is capable of. Import can be done in two ways:
- manually, by simply copying a Tyk API definition from GitHub - [TykTechnologies/tyk-examples](https://TykTechnologies/tyk-examples): A repository containing example API definitions and policies for Tyk products. 
- via command line [using tyk-sync]({{< ref "universal-data-graph/udg-examples" >}})

To make it easier for our users to find their way to Universal Data Graph, we’ve also given it its own space in the Dashboard. From now on you can find UDG under Data Graphs section of the menu.

It also got a lot easier to turn a Kafka topic into a GraphQL subscription. Using our new Dashboard API endpoint, users will be able to transform their AsyncAPI documentation into Universal Data Graph definition with a single click. Support for OAS coming soon as well!

With this release we are also giving our users [improved headers for GQL APIs]({{< ref "graphql/gql-headers" >}}). It is now possible to use context variables in request headers and persist headers needed for introspection separately for improved security.

Additionally we’ve added Dashboard support for introspection control on policy and key level. It is now possible to allow or block certain consumers from being able to introspect any graph while creating a policy or key via Dashboard.

## Changelog

### Tyk Gateway

#### Deprecated
- Tyk Gateway no longer natively supports **LetsEncrypt** integration. You still can use LetsEncrypt CLI tooling to generate certificates, and use them with Tyk.

#### Added
- Support for request validation (including query params, headers and the rest of OAS rules) with Tyk OAS APIs
- Transform request/response middleware for Tyk OAS APIs
- Custom middleware for Tyk OAS APIs
- Added a new API endpoint to manage versions for Tyk OAS APIs
- Improved Mock API plugin for Tyk OAS APIs
- Universal Data Graph and GraphQL APIs now support using context variables in request headers, allowing passing information it to your subgraphs
- Now you can control access to introspection on policy and key level

#### Changed

#### Fixed
- Fixed potential race when using distributed rate limiter

### Tyk Dashboard

#### Added
- Numerous UX improvements
- New UI for custom middleware for Tyk OAS APIs
- Significantly improved Tyk OAS API versioning user experience
- It now possible to use PATCH method to modify Tyk OAS APIs via the Dashboard API
- Now you can turn a Kafka topic into a GraphQL subscription by simply [importing your AsyncAPI definition]({{< ref "tyk-apis/tyk-dashboard-api/data-graphs-api" >}})
- Way to control access to introspection on policy and key level

#### Changed
- Universal Data Graph moved to a separate dashboard section

## Updated Versions
Tyk Gateway 5.0 - [docker](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.0/images/sha256-196815adff2805ccc14c267b14032f23913321b24ea86c052b62a7b1568b6725?context=repo)

Tyk Dashboard 5.0 - [docker](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0/images/sha256-3d736b06b023e23f406b1591f4915b3cb15a417fcb953d380eb8b4d71829f20f?tab=vulnerabilities)

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk.md" >}}), there are no breaking changes in this release.

In case you want to switch from MongoDB to SQL, you can [use our migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**  

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to v5.0 of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "plugins/supported-languages/golang#upgrading-tyk" >}}).
{{< /note >}}