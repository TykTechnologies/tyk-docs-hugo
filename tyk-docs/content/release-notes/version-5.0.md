---
title: Tyk v5.0
menu:
  main:
    parent: "Release Notes"
weight: 1
---

## v5.0.2

### Support for MongoDB 5 and 6
From Tyk 5.0.2, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set new Dashboard config option driver to mongo-go. 
The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
- [mgo](https://github.com/go-mgo/mgo) (default): Uses the mgo driver. This driver supports Mongo versions lower or equal to v4. You can get more information about this driver [here](https://github.com/go-mgo/mgo)
- [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports Mongo versions greater or equal to v4. You can get more information about this driver [here](https://github.com/mongodb/mongo-go-driver).

Tyk Pump 1.8.0 and MDCB 2.2 also support new driver option

### Tyk Dashboard

#### Fixed
Fixed a bug on migration of a portal catalogue with deleted policy to SQL
- Fixed: Redirect unregistered user to new page when SSOOnlyForRegisteredUsers is set to true

### Tyk Gateway

#### Updated
- Internal refactoring and making storage related parts more stable, and less affected to potential race issues


## v5.0.1

### Tyk Gateway

#### Added
- Added a new `enable_distributed_tracing` to the NewRelic config to enable support for Distributed Tracer

#### Fixed
- Fixed  panic when JWK method was used for JWT authentication and the token didn't include kid
Fixed an issue where failure to load GoPlugin middleware didn’t prevent the API from proxying traffic to the upstream; now Gateway logs an error when the plugin fails to load (during API creation/update) and responds with HTTP 500 if the API is called. At the moment fixed only for file based plugins
- Fixed MutualTLS issue causing leak of allowed CAs during TLS handshake when there are multiple mTLS APIs
- Fixed a bug during hot reload of Tyk Gateway where APIs with JSVM plugins stored in filesystem were not reloaded
- Fixed a bug where the gateway would remove the trailing `/`at the end of a URL
- Fixed a bug where nested field-mappings in UDG weren't working as intended
- Fixed a bug when using Tyk OAuth 2.0 flow on Tyk Cloud where a request for an Authorization Code would fail with a 404 error
- Fixed a bug where mTLS negotiation could fail when there are a large number of certificates and CAs; added an option (http_server_options.skip_client_ca_announcement) to use the alternative method for certificate transfer
- Fixed CVE issue with go.uuid package
- Fixed a bug where rate limits were not correctly applied when policies are partitioned to separate access rights and rate limits into different scopes.

### Tyk Dashboard

#### Added
- Improved security for people using the Dashboard by adding the Referrer-Policy header with the value `no-referrer`.
- Added ability to select the plugin driver within the Tyk OAS API Designer.

#### Changed
- When creating a new API in the Tyk OAS API Designer, caching is now disabled by default

#### Fixed
- Fixed a bug where a call to the `/hello` endpoint would unnecessarily log `http: superfluous response.WriteHeader call`.
- Fixed a bug where the Dashboard was showing *Average usage over time* for all Developers, rather than just those relevant to the logged in developer.
- Fixed a bug where logged in users could see Identity Management pages, even if they didn't have the rights to use these features
- Fixed a bug that prevented Tyk Dashboard users from resetting their own passwords
- Fixed issue with GraphQL proxy headers added via UI
- Fixed a bug where the Dashboard would not allow access to any screens if a logged in user didn’t have access to the APIs resource regardless of other access rights
- Fixed a bug on the key management page where searching by key_id did not work - you can now initiate the search by pressing enter after typing in the key_id
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
- Tyk Gateway no longer natively support **LetsEncrypt** integration. You still can use LetsEncrypt CLI tooling to generate certificates, and use them with Tyk.

#### Added
- Support for OpenAPI request validation (including query params, headers and the rest of OAS rules)
- Transform request/response middleware for OpenAPI apis
- Custom middleware for OpenAPI apis
- Added a new API endpoint to manage versions for OpenAPI apis
- Improved Mock API plugin for OpenAPI
- Universal Data Graph and GraphQL APIs now support using context variables in request headers, allowing passing information it to your subgraphs
- Now you can control access to introspection on policy and key level

#### Changed

#### Fixed
- Fixed potential race when using distributed rate limiter

### Tyk Dashboard

#### Added
- Numerous UX improvements
- New UI for custom middleware for OpenAPI apis
- Significantly improved OpenAPI versioning user experience
- It now possible to use PATCH method to modify OpenAPI apis via Dashboard API
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
