---
title: Tyk Gateway v5.1
menu:
  main:
    parent: "Release Notes"
weight: 1
---

# What’s Changed?

### Tyk Gateway updated to Golang version 1.19

Our Gateway is using [Golang 1.19](https://tip.golang.org/doc/go1.19) Programming Language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#initialise-plugin-for-gateway-51" >}}) these to maintain compatibility with the latest Gateway.

### Request Body Size Limits

We have introduced a new Gateway-level option to limit the size of requests made
to your APIs. You can use this as a first line of defence against overly large
requests that might affect your Tyk Gateways or upstream services. Of course,
being Tyk, we also provide the flexibility to configure API-level and
per-endpoint size limits so you can be as granular as you need to protect and
optimise your services. Check out our improved documentation for full
description of how to use these powerful [features]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}).

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
- Updated [_kin-openapi_](https://github.com/getkin/kin-openapi) dependency to the version [v0.114.0](https://github.com/getkin/kin-openapi/releases/tag/v0.114.0)
- Enhanced the UDG parser to comprehensively extract all necessary information for UDG configuration when users import to Tyk their OpenAPI document as an API definition
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

#### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behaviour for OAuth is now the same as for other authorisation methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!
- Fixed minor versioning, URL and field mapping issues when importing OpenAPI document as an API definition to UDG
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as an authorization mechanism

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
