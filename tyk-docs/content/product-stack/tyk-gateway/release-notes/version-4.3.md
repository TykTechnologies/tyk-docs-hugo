---
title: Tyk Gateway v4.3
description: "Tyk Gateway 4.3 release notes"
tags: ["release notes", "Tyk Gateway", "v4.3"]
aliases:
    - /release-notes/version-4.3/
---

## Release Highlights

#### Mock Responses with Tyk OAS API Definitions

Does your Tyk OAS API Definition define examples or a schema for your path responses? If so, starting with Tyk v4.3, Tyk can use those configurations to mock your API responses, enabling your teams to integrate easily without being immediately dependent on each other. Check it out! [Mock Responses Documentation]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}})

#### External OAuth - 3rd party OAuth IDP integration

If you’re using a 3rd party IDP to generate tokens for your OAuth applications, Tyk can now validate the generated tokens by either performing JWT validation or by communicating with the authorization server and executing token introspection. 

This can be achieved by configuring the new External OAuth authentication mechanism. Find out more here [External OAuth Integration]({{< ref "/api-management/authentication-authorization#integrate-external-oauth-middleware" >}})

#### Updated the Tyk Gateway version of Golang, to 1.16.

**Our Gateway is using Golang 1.16 version starting with 4.3 release. This version of the Golang release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.

#### Improved GQL security

4.3 adds two important features that improve security settings for GraphQL APIs in Tyk.

1. Ability to turn on/off introspection - this feature allows much more control over what consumers are able to do when interacting with a GraphQL API. In cases where introspection is not desirable, API managers can now disallow it. The setting is done on API key level, which means API providers will have very granular control over who can and who cannot introspect the API.
2. Support for allow list in field-based permissions - so far Tyk was offering field-based permissions as a “block list” only. That meant that any new field/query added to a graph was by default accessible for all consumers until API manager explicitly blocked it on key/policy level. Adding support for “allow list” gives APi managers much more control over changing schemas and reduces the risk of unintentionally exposing part of the graph that are not ready for usage. See [Introspection]({{< ref "graphql/introspection" >}}) for more details.


## Changelog

#### Tyk Gateway

##### Added
- Minor modifications to the Gateway needed for enabling support for Graph Mongo Pump.
- Added header `X-Tyk-Sub-Request-Id` to each request dispatched by federated supergraph and Universal Data Graph, so that those requests can be distinguished from requests directly sent by consumers.
- Added a functionality that allows to block introspection for any GraphQL API, federated supergraph and Universal Data Graph (currently only supported via Gateway, UI support coming in the next release).
- Added an option to use allow list in field-based permissions. Implemented for full types and individual fields. (currently only supported via Gateway, UI support coming in the next release)
- Added new middleware that can be used with HTTP APIs to set up persisted queries for GraphQL upstreams.
- Added support for two additional subscription protocols for GraphQL subscriptions. Default protocol used between the gateway and upstream remains to be `graphql-ws`, two additional protocols are possible to configure and use: `graphql-transport-ws` and `SSE`.

##### Changed

Updated the Tyk Gateway version of Golang, to 1.16. 

**SECURITY: The release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.

##### Fixed

- Fixed an issue where introspection query was returning a wrong response in cases where introspection query had additional objects.
- Fixed an issue where gateway was crashing when a subscription was started while no datasource was connected to it.
- Fixed a problem with missing configuration in the GraphQL config adapter that caused issues with batching requests to subgraphs in GraphQL API federation setting.
- A HTTP OAS API version lifetime respects now the date value of the expiration field from Tyk OAS API Definition.
- Now it is possible to proxy traffic from a HTTP API (using Tyk Classic API Definition) to a HTTP OAS API (using Tyk OAS API Definition) and vice versa.


## Updated Versions

Tyk Gateway 4.3 ([docker images](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=1&name=4.3.0)

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "planning-for-production/database-settings/postgresql#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**  

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to 4.3 version of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "/content/plugins/supported-languages/golang.md" >}}).
{{< /note >}}
