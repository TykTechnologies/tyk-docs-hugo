---
title: Tyk v5.0
menu:
  main:
    parent: "Release Notes"
weight: 1
---

## Major features

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
