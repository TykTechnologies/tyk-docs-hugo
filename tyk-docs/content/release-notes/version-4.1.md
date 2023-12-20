---
title: Tyk v4.1
menu:
  main:
    parent: "Release Notes"
weight: 3
---

## Major features

#### OpenAPI as a native API definition format
Tyk has always had a proprietary specification for defining APIs. From Tyk v4.1 we now support defining APIs using the Open API Specification (OAS) as well, which can offer significant time and complexity savings. [This is an early access capability]({{< ref "frequently-asked-questions/using-early-access-features" >}}).

As we extend our OAS support, we would very much like your feedback on how we can extend and update to best meet your needs: .

This capability is available in both the open source and paid versions of Tyk. See our [High Level Concepts]({{< ref "getting-started/key-concepts/high-level-concepts" >}}) for more details, or jump to [OAS Getting Started documentation]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}).



#### MDCB Synchroniser
Tyk Gateway v4.1 enables an improved synchroniser functionality within Multi Data Centre Bridge (MDCB) v2.0. Prior to this release, the API keys, certificates and OAuth clients required by worker Gateways were synchronised from the controller Gateway on-demand. With Gateway v4.1 and MDCB v2.0 we introduce proactive synchronisation of these resources to the worker Gateways when they start up.
 
This change improves resilience in case the MDCB link or controller Gateway is unavailable, because the worker Gateways can continue to operate independently using the resources stored locally. There is also a performance improvement, with the worker Gateways not having to retrieve resources from the controller Gateway when an API is first called.
 
Changes to keys, certificates and OAuth clients are still synchronised to the worker Gateways from the controller when there are changes and following any failure in the MDCB link.

#### Go Plugin Loader
When upgrading your Tyk Installation you need to re-compile your plugin with the new version. At the moment of loading a plugin, the Gateway will try to find a plugin with the name provided in the API definition. If none is found then it will fallback to search the plugin file with the name: `{plugin-name}_{Gw-version}_{OS}_{arch}.so`

From v4.1.0 the plugin compiler automatically names plugins with the above naming convention. It enables you to have one directory with different versions of the same plugin. For example:

- `plugin_v4.1.0_linux_amd64.so`
- `plugin_v4.2.0_linux_amd64.so`

So, if you upgrade from Tyk v4.1.0 to v4.2.0 you only need to have the plugins compiled for v4.2.0 before performing the upgrade.

## Changelog

### Tyk Gateway
#### Added
- Added support for new OAS API definition format
- Added support for headers on subgraph level for federated GraphQL APIs
- Added support for interfaces implementing interfaces in GQL schema editor
- Added support for passing authorisation header in GQL API Playgrounds for subscription APIs
- Added TYK_GW_OMITCONFIGFILE option for Tyk Gateway to ignore the values in the config file and load its configuration only from environment variables and default values
- Added a way to modify Tyk analytics record via Go plugins [configurable with API definition](https://tyk.io/docs/plugins/analytics-plugins/). Can be used to sanitise analytics data. 
- Added new policy API REST endpoints
- Added option to configure certificates for Tyk Gateway using [environment variable](https://tyk.io/docs/tyk-oss-gateway/configuration/#http_server_optionscertificates)
- Added support for Python 3.9 plugins
- Added support for headers on subgraph level for federated GraphQL APIs
- Added support for introspecting schemas with interfaces implementing interfaces for proxy only GQL
- Added support for input coercion in lists for GraphQL
- Added support for repeatable directives for GraphQL
#### Changed
- Generate API ID when API ID is not provided while creating API. 
- Updated the Go plugin loader to load the most appropriate plugin bundle, honouring Tyk version, architecture and OS
- When a GraphQL query with a @skip directive is sent to the upstream it will no longer return “null” for the skipped field, but remove the field completely from the response
#### Fixed
- Fixed a bug where the MDCB worker Gateway could become unresponsive when a certificate is added in the Tyk Dashboard
- Fixed an issue with the calculation of TTL for keys in an MDCB deployment such that TTL could be different between worker and controller Gateways
- Fixed a bug when using Open ID where quota was not tracked correctly
- Fixed multiple issues with schema merging in GraphQL federation. Federation subgraphs with the same name shared types like objects, interfaces, inputs, enums, unions and scalars will no longer cause errors when users are merging schemas into a federated supergraph.
- Fixed an issue where schema merging in GraphQL federation could fail depending on the order or resolving subgraph schemas and only first instance of a type and its extension would be valid. Subgraphs are now individually normalised before a merge is attempted and all extensions that are possible in the federated schema are applied.
- Fixed an issue with accessing child properties of an object query variable for GraphQL where query {{.arguments.arg.foo}} would return "{ "foo":"123456" }" instead of "123456"

### Tyk Dashboard
#### Added
- Added support for new OAS api definition format, and new API creation screens
- Dashboard boostrap instalation script extended to support SQL databases
- Added `TYK_DB_OMITCONFIGFILE` option for Tyk Dashboard to ignore the values in the config file and load its configuration only from environment variables and default values
- Added a new config option `identity_broker.ssl_insecure_skip_verify` that will allow customers using the embedded TIB to use IDPs exposed with a self signed certificate. Not intended to be used in production, only for testing and POC purposes.
- Added option to configure certificates for Tyk Dashboard using [environment variables](https://tyk.io/docs/tyk-dashboard/configuration/#http_server_optionscertificates).
#### Changed
- Detailed information about certificates can be viewed from certificates listing page
- Dashboard APIs GQL Playground now shows additional information about certificates
- Dashboard will now use default version of GraphiQL Playground which can switch between light and dark modes for more accessibility
- Banner for resyncing GraphQL schema has been given a new, more accessible look in line with the rest of Dashboard design
#### Fixed
- Fixed an issue with key lookup where keys were not being found when using the search field
- Fixed an issue with object types dropdown in Universal Data Graph config, where it wasn’t working correctly when object type UNION was chosen
- Fixed an issue in Universal Data Graph which prevented users from injecting an argument value or parameter value in the domain part of the defined data source upstream URL


## Updated Versions
Tyk Gateway 4.1
Tyk Dashboard 4.1
Tyk MDCB 2.0.1

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk/upgrading-tyk" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
