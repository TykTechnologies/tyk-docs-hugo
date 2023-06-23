---
title: Tyk v5.1
menu:
  main:
    parent: "Release Notes"
weight: 1
---

# What’s Changed?

### Tyk Gateway and Dashboard updated to Golang version 1.19

Our Dashboard and Gateway are using [Golang 1.19](https://tip.golang.org/doc/go1.19) Programming Language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#initialise-plugin-for-gateway-51" >}}) these to maintain compatibility with the latest Gateway.

### Request Body Size Limits

We have introduced a new Gateway-level option to limit the size of requests made
to your APIs. You can use this as a first line of defence against overly large
requests that might affect your Tyk Gateways or upstream services. Of course,
being Tyk, we also provide the flexibility to configure API-level and
per-endpoint size limits so you can be as granular as you need to protect and
optimise your services. Check out our improved documentation for full
description of how to use these powerful [features]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}).

### Dashboard Analytics for API Ownership

When we implemented Role Based Access Control and API Ownership in Tyk
Dashboard, we unlocked great flexibility for you to assign different roles to
different users and user groups with visibility and control over different
collections of APIs on your Gateway. Well, from 5.1 we have added a new Role,
which layers on top of the existing “Analytics” role and can be used to restrict
a user’s access, within the Dashboard Analytics screens, to view only the
statistics from APIs that they own; we’ve called this “Owned Analytics”. Due to
the way the analytics data are aggregated (to optimise storage), a user granted
this role will not have access to the full range of charts. Take a look at the
documentation for a full description of this new [user role]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}).

### Import API examples from within the Dashboard

In 5.0 we introduced the possibility to import API examples manually or via
[_Tyk Sync_]({{<ref "tyk-sync" >}}). We have now extended this feature and it is now possible to do this without
leaving the Dashboard. When having an empty “Data Graphs” section you will be
presented with 3 icon buttons with one of them offering you to import an Example
API.

If you already have Data Graphs in your Dashboard you can either click on
the “Import” button or click on the “Add Data Graph“ button and select “Use
example data graph“ on the next screen. The examples UI will present you with a
list of available examples. You can navigate to the details page for every
example and import it as well from the same page.

### Improved nested GraphQL stitching

Before this release, it was only possible to implement nested GraphQL stitching
(GraphQL data source inside another data source) by using a REST data source and
providing the GraphQL body manually. We have now extended the GraphQL data source so
that you can provide a custom operation and therefore access arguments or object
data from parent data sources.

To use this feature you will only need to check the “Add GraphQL operation“ checkbox when creating a GraphQL data source.

### Import UDG API from OAS 3.0

We added a [Dashboard API Endpoint]({{< ref "universal-data-graph/datasources/rest#automatically-creating-rest-udg-configuration-based-on-oas-specification" >}}) that is capable of taking an OAS 3.0 document and converting it into a UDG API.

This will generate the full schema as well as the data sources that are defined inside the OAS document.

### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

## Changelog

### Tyk Gateway

#### Added

- Added `HasOperation`, `Operation` and `Variables` to GraphQL data source API definition for easier nesting
- Added abstractions/interfaces for ExecutionEngineV2 and ExecutionEngine2Executor with respect to graphql-go-tools
- Added support for the `:authority` header when making GRPC requests. If the `:authority` header is not present then some GRPC servers return PROTOCOL_ERROR which prevents custom GRPC plugins from running. Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) from the Tyk Community for his contribution!

#### Changed

- Tyk Gateway updated to use Go 1.19
- Updated [_kin-openapi_]({{<ref "https://github.com/getkin/kin-openapi" >}}) dependency to the version [v0.114.0]({{<ref "https://github.com/getkin/kin-openapi/releases/tag/v0.114.0" >}})
- Enhanced the UDG parser to comprehensively extract all necessary information for UDG configuration when users import to Tyk their OpenAPI document as an API definition
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

#### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behaviour for OAuth is now the same as for other authorisation methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!
- Fixed minor versioning, URL and field mapping issues when importing OpenAPI document as an API definition to UDG
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as an authorization mechanism

### Tyk Dashboard

#### Added

- Added two endpoints to the dashboard to support the retrieval of example API definitions. One for fetching all examples and another for fetching a single example.
- Added a way to display UDG examples from the [tyk-examples](https://github.com/TykTechnologies/tyk-examples) repository in the Dashboard UI
- Added screens in Dashboard New Graph flow, that allows users to choose between creating a graph from scratch or importing one of our example graphs
- Added a screen to display details of a UDG example API
- Added a feature to display a full [_Tyk Sync_]({{<ref "tyk-sync" >}}) command that will allow a user to import an example UDG into their Dashboard
- Added `/examples` endpoint to Dashboard API that returns a list of available API examples that can later be imported into the Dashboard `GET /api/examples`
- Added `/data-graphs/data-sources/import` endpoint to Dashboard API that transforms an OpenAPI document into UDG config and publishes it in Dashboard `POST /api/data-graphs/data-sources/import`
- Added query param `apidef=true` to example detail endpoint in Dashboard API to retrieve the API definition of an example
- Added new `owned_analytics` user permission which restricts the user's access only to analytics relating to APIs they own. These are the _API Activity Dashboard Requests_ and _Average Errors Over Time_ charts in the Tyk Dashboard. Note that it is not currently possible to respect API Ownership in other aggregated charts

#### Changed

- Tyk Dashboard updated to Go 1.19
- Updated npm package dependencies of Dashboard, to address critical and high CVEs
- Changed the field mapping tickbox description in GUI to be 'Use default field mapping'

#### Fixed

- Fixed an issue when using custom authentication with multiple authentication methods. Custom authentication could not be selected to provide the base identity
- Fixed an issue where the login URL was displayed as undefined when creating a TIB Profile using LDAP as a provider
- Fixed an issue where it was not possible to download Activity by API or Activity by Key from the Dashboard when using PostgreSQL for the analytics store
- Fixed an issue where a new user could be stuck in a password reset loop in the dashboard if TYK_DB_SECURITY_FORCEFIRSTLOGINPWRESET was enabled
- Fixed an issue where the `ssl_force_common_name_check` flag was disappearing. The flag was disappearing after being updated via dashboard UI raw API editor and a subsequent page reload. It was also disappearing when updating the API Definition via the GW/DB API.
- Fixed an issue where a user could update their email address to match that of another user within the same organisation
- Fixed an issue where users without `user:write` permission were able to update their permissions through manipulation of Dashboard API calls
- Fixed an issue where the versions endpoint returned APIs that were not owned by the logged-in user
- Fixed an issue where the log browser showed analytics for APIs not owned by the logged-in user
- Fixed an issue that prevented non-admin users from seeing _Endpoint Popularity_ data in the Tyk Dashboard
- Fixed an issue where additional data was returned when requesting analytics with p=-1 query when using SQL for the analytics store
- Fixed an issue so that filtering by API now respects API Ownership in three Dashboard charts.

  - Gateway Dashboard - API Activity Dashboard - Requests
  - Activity by API - Traffic Activity per API
  - Errors - Average Errors Over Time

- Fixed an issue so that the Log Browser now respects API Ownership. A user will now only be able to see logs for the APIs that they are authorised to view
- Fixed filters for the Log Browser, Errors - Average Errors Over Time and API Activity Dashboard - Requests so that a user can only select from versions of APIs for which they have visibility
- Fixed UI bug so that data graphs created with multiple words are [sluggified](https://www.w3schools.com/django/ref_filters_slugify.php#:~:text=Definition%20and%20Usage,ASCII%20characters%20and%20hyphens%20(%2D).), i.e. spaces are replaced with a hyphen `-`
- Fixed an issue with routing, which was sending the user to a blank screen while creating a new Data Graph or importing an example API

### Tyk Classic Portal

#### Changed

- Improved performance when opening the Portal page by optimising the pre-fetching of required data

## Updated Versions

Tyk Gateway 5.1 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.1.0/images/sha256-bde71eeb83aeefce2e711b33a1deb620377728a7b8bde364b5891ea6058c0649?context=repo)

Tyk Dashboard 5.1 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.1.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)

## Contributors

Special thanks to the following members of the Tyk community for their contributions in this release:

Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for fixing an issue where `global_size_limit` was not enabling request size limit middleware.

Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) for adding support to the `:authority` header when making gRPC requests.

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk" >}}), there are no breaking changes in this release.

In case you want to switch from MongoDB to SQL, you can [use our migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**

Please remember that the upgrade to the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to v5.1 of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "plugins/supported-languages/golang#upgrading-tyk" >}}).
{{< /note >}}
