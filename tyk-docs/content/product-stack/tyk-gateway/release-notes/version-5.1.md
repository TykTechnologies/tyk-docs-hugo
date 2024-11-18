---
title: Tyk Gateway 5.1 Release Notes
description: "Release notes 5.1 for Tyk Gateway"
tags: ["Release notes", "Gateway", "5.1"]
aliases:
  -  /release-notes/version-5.1/
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

### Support Lifetime
Minor releases are supported until our next minor comes out in Q3.

---

## 5.1 Release Notes

##### Release Date 23 June 2023

#### Breaking Changes

**Attention warning*: Please read carefully this section.

##### Golang Version upgrade
Our Gateway is using [Golang 1.19](https://tip.golang.org/doc/go1.19) programming language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#upgrading-your-tyk-gateway" >}}) these to maintain compatibility with the latest Gateway.

##### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backward-compatible. Downgrading to a previous version after upgrading may result in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights
 
##### Request Body Size Limits

We have introduced a new Gateway-level option to limit the size of requests made
to your APIs. You can use this as a first line of defense against overly large
requests that might affect your Tyk Gateways or upstream services. Of course,
being Tyk, we also provide the flexibility to configure API-level and
per-endpoint size limits so you can be as granular as you need to protect and
optimize your services. Check out our improved documentation for full
description of how to use these powerful [features]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}).

##### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.1/images/sha256-3d1e64722be1a983d4bc4be9321ca1cdad10af9bb3662fd6824901d5f22820f1?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.1.0)


#### Changelog

##### Added

- Added `HasOperation`, `Operation` and `Variables` to GraphQL data source API definition for easier nesting
- Added abstractions/interfaces for ExecutionEngineV2 and ExecutionEngine2Executor with respect to graphql-go-tools
- Added support for the `:authority` header when making GRPC requests. If the `:authority` header is not present then some GRPC servers return PROTOCOL_ERROR which prevents custom GRPC plugins from running. Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) from the Tyk Community for his contribution!

##### Changed

- Tyk Gateway updated to use Go 1.19
- Updated [_kin-openapi_](https://github.com/getkin/kin-openapi) dependency to the version [v0.114.0](https://github.com/getkin/kin-openapi/releases/tag/v0.114.0)
- Enhanced the UDG parser to comprehensively extract all necessary information for UDG configuration when users import to Tyk their OpenAPI document as an API definition
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

##### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behavior for OAuth is now the same as for other authorization methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!
- Fixed minor versioning, URL and field mapping issues when importing OpenAPI document as an API definition to UDG
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as an authorization mechanism

#### Tyk Classic Portal Changelog

##### Changed

- Improved performance when opening the Portal page by optimizing the pre-fetching of required data


## Community Contributions

Special thanks to the following members of the Tyk community for their contributions in this release:

- Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for fixing an issue where `global_size_limit` was not enabling request size limit middleware.

- Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) for adding support to the `:authority` header when making gRPC requests.

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-gateway-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-c23829a5-7b3c-454f-8dcb-a1c67249032b)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
