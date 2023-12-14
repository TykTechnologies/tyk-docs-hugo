---
title: Tyk Dashboard v4.1
description: "Tyk Dashboard 4.1 release notes"
tags: ["release notes", "Tyk Dashboard", "v4.1", "4.1"]
---

## Release Highlights

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
Tyk Dashboard 4.1
Tyk MDCB 2.0.1

## Upgrade process

Follow the [standard upgrade guide]({{< ref "/content/upgrading-tyk.md" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
