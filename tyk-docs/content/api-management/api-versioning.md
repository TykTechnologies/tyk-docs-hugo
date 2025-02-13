---
title: API Versioning
date: 2025-01-01
tags: ["API versioning", "version", "Tyk Classic", "Tyk OAS", "API", "versioning"]
description: Tyk Tools that help with automating deployment and API Management operations
keywords: ["API versioning", "version", "Tyk Classic", "Tyk OAS", "API", "versioning"]
aliases:
  - /advanced-configuration/integrate
  - /advanced-configuration/integrate/api-auth-mode
  - /tyk-apis/tyk-gateway-api/api-definition-objects/versioning-endpoint
  - /getting-started/key-concepts/oas-versioning
  - /getting-started/key-concepts/versioning
  - /product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning
---

## Introduction

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

API versioning is important for several reasons:
- flexibility: it allows you to improve and expand your API without disrupting existing users
- stability: clients can continue using a specific version of the API, ensuring their applications remain functional
- transition management: you can gradually phase out older versions while giving clients time to migrate to newer ones
- documentation: each version can have its own documentation, making it easier for developers to understand the specific capabilities and limitations of the version they're using

## When to use API versioning
There are many occasions when you might use versioning with your APIs, here are just a few examples.

### Adding new features

Imagine you're running an e-commerce API, and you want to introduce a new recommendation engine. Instead of modifying the existing endpoint and potentially breaking current integrations, you could create a new version of the API that includes this feature. This allows you to roll out the enhancement to interested clients while others continue using the previous version without disruption.

### Changing response formats

Let's say you have a weather API that currently returns temperatures in Fahrenheit. You decide to switch to Celsius for international standardization. By creating a new API version with this change, you can transition to the new format without affecting existing users who expect Fahrenheit readings. This gives clients time to adapt their applications to handle the new response format.

### Deprecating outdated functionality

If your financial API includes a legacy payment processing method that you plan to phase out, versioning allows you to create a new version without this feature. You can then encourage users to migrate to the new version over time, eventually deprecating the old version containing the outdated functionality.

### Optimizing performance

You might discover a more efficient way to structure your API requests and responses. By introducing these optimizations in a new version, you can offer improved performance to clients who are ready to upgrade, while maintaining the existing version for those who aren't prepared to make changes yet.

## How API versioning works with Tyk

API versioning was originally implemented for the legacy Tyk Classic API. We took lessons from this and, for Tyk OAS, introduced a more flexible approach.

### Tyk OAS API versioning
With Tyk OAS APIs you're essentially creating distinct iterations of your API, each with its own API definition file, allowing almost complete differentiation of configuration between your API versions.


### Tyk Classic API versioning
With Tyk Classic APIs all versions of an API are configured from a single API definition. This means that they share many features with only a subset available to be configured differently between versions.

### Comparison between Tyk OAS and Tyk Classic API versioning

Here's a comparison of some of the features that can be configured per-version (✅) or only per-API (❌️) between Tyk OAS and Tyk Classic APIs. Note that this is not a comprehensive list - to see all the options that can be configured differently for Tyk Classic API versions please review the [Tyk Classic versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) section.

| Feature | Configurable in Tyk OAS versioning | Configurable in Tyk Classic versioning |
|---------|------------------------------------|----------------------------------------|
| Client-Gateway security | ✅ | ❌️ |
| Request authentication method | ✅ | ❌️ |
| API-level header transform | ✅ | ✅ |
| API-level request size limit | ✅ | ✅ |
| API-level rate limiting | ✅ | ❌️ |
| API-level caching | ✅ | ❌️ |
| Endpoints | ✅ | ✅ |
| Per-endpoint middleware | ✅ | ✅ |
| Context and config data for middleware | ✅ | ❌️ |
| Custom plugin bundle | ✅ | ❌️ |
| Upstream target URL | ✅ | ✅ |
| Gateway-Upstream security | ✅ | ❌️ |
| Traffic log config | ✅ | ❌️ |
| API segment tags | ✅ | ❌️ |

## Version identifiers

Tyk supports three different locations where the client can indicate which version of an API they wish to invoke with their request:
- [URL path](#request-url-path)
- [Query parameter](#query-parameter)
- [Request header](#request-header)

When choosing a version identifier location, consider your API design philosophy, infrastructure requirements, client needs, caching strategy, and backward compatibility concerns. Whichever method you choose, aim for consistency across your API portfolio to provide a uniform experience for your API consumers.

### Request URL (path)

Including the version identifier in the path (for example `/my-api/v1/users`) is a widely used approach recognized in many API designs. The version identifier is clearly visible in the request and, with the unique URL, can simplify documentation of the different versions. Tyk can support the version identifier as the **first URL fragment** after the listen path, such that the request will take the format: `<listenPath>/<version>/<endpointPath>`.

### Query parameter

Defining a query parameter that must be provided with the request (for example `/my-api/users?version=v1`) is easy to implement and understand. The version identifier is clearly visible in the request and can be easily omitted to target a default version. Many analytics tools can parse query parameters, making this a very analytics-friendly approach to versioning.

### Request header

Defining a specific header that must be provided with the request (for example `x-api-version:v1`) keeps the URL *clean*, which can be aesthetically pleasing and easier to read. It works well with RESTful design principles, treating the version as metadata about the request and allows for flexibility and the ability to make changes to the versioning scheme without modifying the URL structure. Headers are less visible to users than the request path and parameters, providing some security advantage. Be aware that some proxies or caches might not consider headers for routing, which could bring issues with this method.

## Default API version

When multiple versions are defined for an API, one must be declared as the **default version**. If a request is made to the API without providing the version identifier, then this will automatically be treated as a request to the *default* version. This has been implemented to support future versioning of an originally unversioned API, as you can continue to support legacy clients with the default version.

The API definition (and Tyk Dashboard's API Designer) makes it easy for you to specify - and change - the *default* version for your APIs, as explained in the appropriate section for [Tyk OAS APIs]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) and [Tyk Classic APIs]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}).

#### Fallback to default

The standard behaviour of Tyk, if an invalid version is requested in the version identifier, is to reject the request returning `HTTP 404 Not Found`. Optionally, Tyk can be configured to redirect these requests to the *default* version by configuring the `fallbackToDefault` option in the API definition (`fallback_to_default` for Tyk Classic APIs).

## Stripping version identifier

Typically Tyk will pass all request headers and parameters to the upstream service when proxying the request. For a versioned API, the version identifier (which may be in the form of a header, path parameter or URL fragment) will be included in this scope and passed to the upstream.

The upstream (target) URL will be constructed by combining the configured `upstream.url` (`target_url` for Tyk Classic APIs) with the full request path unless configured otherwise (for example, by using the [strip listen path]({{< ref "api-management/gateway-config-tyk-oas#listenpath" >}}) feature).

If the version identifier is in the request URL then it will be included in the upstream (target) URL. If you don't want to include this identifier, then you can set `stripVersioningData` (`strip_versioning_data` for Tyk Classic APIs) and Tyk will remove it prior to proxying the request.

#### Stripping URL path version and default fallback

When using the [Request URL](#request-url-path) for the versioning identifier, if Tyk is configured to strip the versioning identifier then the first URL fragment after the `listenPath` (`listen_path` for Tyk Classic APIs) will be deleted prior to creating the proxy URL. If the request does not include a versioning identifier and Tyk is configured to [fallback to default](#fallback-to-default), this may lead to undesired behaviour as the first URL fragment of the endpoint will be deleted.

In Tyk 5.5.0 we implemented a new *URL versioning pattern* configuration option where you can set a regex that Tyk will use to determine whether the first URL fragment after the `listenPath` is a version identifier. If the first URL fragment does not match the regex, it will not be stripped and the unaltered URL will be used to create the upstream URL.

## Sunsetting API versions

API sunsetting is the process of phasing out or retiring an older version of an API or an entire API. It's a planned, gradual approach to ending support for an API or API version. To aid with the automation of this process, all Tyk API versions can be configured with an optional expiry date, after which the API will no longer be available. If this is left blank then the API version will never expire.

When sunsetting API versions, you may have endpoints that become deprecated between versions. It can be more user friendly to retain those endpoints but return a helpful error, instead of just returning `HTTP 404 not found`.

This is easy to do with Tyk. You can include the deprecated endpoint in the new version of the API and configure the [mock response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware to provide your clients with relevant information and instruction. Alternatively, you could return a 302 header and redirect the user to the new endpoint.

## Authorizing access to versioned APIs

Tyk's access control model supports very granular permissions to versioned APIs.

You can explicitly grant access to specific version(s) of an API by specifying only those version(s) in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "api-management/client-authentication#use-auth-tokens" >}})).

<br>
{{< note success >}}
**Note**  

API tokens (keys) created from a [Security Policy]({{< ref "api-management/policies" >}}) will be granted access to the APIs named in the policy, so whilst we have discussed access keys here, the same rules apply to the policies from which keys might have been created.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details of how to use versioning [here]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}).

If you're using Tyk Classic APIs, then you can find details of how to use versioning [here]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}).

## Tyk OAS API versioning

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

When working with Tyk OAS APIs, each version of an API has its own API definition. This means that there is complete flexibility to configure each version differently from the others.

API versioning is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API (by creating/updating the API definition via the /apis/oas POST handler) or in the API Designer. 

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) page.

### Controlling access to Tyk OAS API versions

You can explicitly grant access to specific version(s) of an API by specifying the individual API definitions for each version in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "api-management/client-authentication#use-auth-tokens" >}})).

When using Tyk OAS APIs there are some subtleties to the propagation of access control between versions of an API:
- each version of an API is treated individually by Tyk Gateway, so access must be explicity granted for each version
- an existing *key* will continue to work with a Tyk OAS API that is converted into a versioned API
- existing *keys* will not automatically be granted access to new versions
- a *key* will only have access to the `default` version if it explicitly has access to that version (e.g. if `v2` is set as default, a *key* must have access to `v2` to be able to fallback to the default if the versioning identifier is not correctly provided)

This means that you could limit access to the [Base API](#base-and-child-apis) (which provides routing to the different versions) to the API owner, while allowing developers to create and test new versions independently. These will only be added to the "routing table" in the Base API when the API owner is ready. 

### Base and child APIs

Tyk OAS introduces the concept of a **Base API**, which acts as a "parent" API version that routes requests to the different versions of the API. The Base API definition stores the information required for Tyk Gateway to locate and route requests to the appropriate "child" API version.

The "child" versions do not have any reference back to the "parent" and so can operate completely independently if required. Typically, and we recommend, the "child" versions should be configured as [Internal APIs]({{< ref "api-management/gateway-config-tyk-oas#state" >}}) that are not directly reachable by clients outside Tyk.

The Base API is a working version of the API and is usually the only one configured as an *External API*, so that client requests are handled (and routed) according to the configuration set in the Base API (via the version identifier included in the header, url or query parameter).

Note that any version (including the Base API) can be set as *default* for [access control](#controlling-access-to-tyk-oas-api-versions) and [default fallback]({{< ref "api-management/api-versioning#default-api-version" >}}).

### Configuring API versioning in the Tyk OAS API Definition

You can configure a Tyk OAS API as a [Base API](#base-and-child-apis) by adding the `versioning` object to the `info` section in the Tyk extension section, `x-tyk-api-gateway`.

The `versioning` [object]({{< ref "api-management/gateway-config-tyk-oas#versioning" >}}) has the following configuration:
- `enabled`: enable versioning
- `name`: an identifier for this version of the API, for example `default` or `v1`
- `default`: the `name` of the API definition that shall be treated as *default* (for [access control](#controlling-access-to-tyk-oas-api-versions) and [default fallback]({{< ref "api-management/api-versioning#default-api-version" >}})); if the base API is to be used as the default then you can instead use the value `self` in this field
- `location`: used to configure where the versioning identifier should be provided: `header`, `url`, `url-param`
- `key`: the versioning identifier key used if `location` is set to `header` or `url-param`
- `versions`: a list of key-value pairs storing details of the *child APIs*; for example `[{"id": "08062e93127843ca76add614e766b0e4", "name": "exampleVersion"}]`
- `fallbackToDefault`: set to `true` for Tyk to [invoke the default version]({{< ref "api-management/api-versioning#fallback-to-default" >}}) if an invalid version is requested
- `stripVersioningData`: set to `true` for Tyk to [remove the versioning identifier]({{< ref "api-management/api-versioning#stripping-version-identifier" >}}) prior to creating the upstream (target) URL
- `urlVersioningPattern`: configure this with a regex that matches the format that you use for the versioning identifier (`name`) if you are using `stripVersioningData` and `fallBackToDefault` with `location=url` [with Tyk 5.5.0 or later]({{< ref "api-management/api-versioning#stripping-url-path-version-and-default-fallback" >}})

The `versions` map contains, for each *child API*:
- `id`: the unique API Id (`id`) assigned to the API (either automatically by Tyk or user-defined during API creation)
- `name`: an identifier for this version of the API, for example `v2`

#### Child API version

The *child API* version does not require any modification, it has a standard Tyk OAS API definition. The important thing is that its API Id (`x-tyk-api-gateway.info.id`) must be added to the `versions` list in the *Base API* definition.

The following configuration is strongly recommended:
- `state.internal` should be set to `true` so that the *child API* can only be accessed via the *base API*

#### Expiry date

If an API definition (base or child API) is to be configured with an expiry date, the following must be added to the `info` section in the Tyk extension section, `x-tyk-api-gateway`:
- `expiration`: expiry date for this API version (in standard ISO 8601 format)

#### Example Base API

In the following example, we configure a *Base API*:

```json {hl_lines=["11-27"],linenos=true, linenostart=1}
{
  "info": {
    "title": "example-base-api",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {},
  "components": {},
  "x-tyk-api-gateway": {
    "info": {
      "versioning": {
        "default": "v1",
        "enabled": true,
        "key": "x-api-version",
        "location": "header",
        "name": "v1",
        "versions": [
          {
            "id": "<child-api-id>",
            "name": "v2"
          }
        ],
        "fallbackToDefault": true,
        "stripVersioningData": false,
        "urlVersioningPattern": ""
      },
      "expiration": "2030-01-01 00:00",
      "name": "example-base-api",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-base-api/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```

This API definition will configure Tyk Gateway to expect the `x-api-version` header to be provided and will invoke a version of the API as follows:
- if the header key has the value `v1` then the Base API will be processed
- if it is `v2` then the request will be forwarded internally to the API with API Id `<child-api-id>`
- if any other value is provided in the header, then the `default` version will be used (in this instance, the Base API) because `fallbackToDefault` has been configured
- if the header is not provided, then the request will be handled by the `default` version (in this instance the Base API)

This API version will automatically expire on the 1st January 2030 and stop accepting requests.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out API versioning - though it requires a valid API Id to be used in place of `<child-api-id>`.

### Configuring API versioning in the API Designer

You can use the API Designer in the Tyk Dashboard to add and manage versions for your Tyk OAS APIs.

#### Create a new API version

Starting from a Tyk OAS API (either newly created or an existing non-versioned API) you can easily add a new version by following these steps.

1. **Create the new version**

Select **Create A New Version** from the **Actions** menu.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-menu-create-new.png" alt="Creating a new version of a Tyk OAS API from the Actions menu" >}}

This will bring up the *Create new API version* pop-up.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-modal-create-new.png" alt="Choosing the version name for a new version of a Tyk OAS API" >}}

Assign your existing version a *version name* (e.g. v1), then assign a *name* for the new version (e.g. v2). You should then select one of these to use as the *default* version.

Select **Create Version**

2. **Configure the new version**

You'll be taken to the API designer view for the new version - remember that this will be a completely separate Tyk OAS API Definition for the new version. By default, Tyk Dashboard will have given this API the same name as the original, appending the *version name* that you assigned in **step 1**.

Tyk will have set the *Access* to *Internal*, so that this version cannot be directly accessed by clients, only via the original (base) API.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-created.png" alt="New version of Tyk OAS API has been created" >}}

Configure the API definition as required, then select **Save API**

By default, Tyk will have configured the versioning identifier location as Request Header, with the key `x-api-version`. You can modify this by following the steps [here](#configure-versioning-settings), but if you're happy with this then that's it - your new API version is ready for use.

#### Managing API versions

When you have a versioned API the *Base API* will appear in the **Created APIs** list, with an expansion icon that you can select to reveal the versions.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-list.png" alt="Versioned API shows in the Created APIs list" >}}

You can see that the *base* and *default* versions are indicated graphically. You can reach the API Designer for each version in the usual way, by selecting the API name in the list (or from the **Actions** menu for the API)/

##### Switch between API versions

When you are in the API Designer for a versioned API, you can switch between versions using the drop-down next to the API name.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-designer.png" alt="Choose between API versions in the API designer" >}}

There is a new option in the **Actions** menu: **Manage Versions**.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-menu-manage.png" alt="New menu option to manage versions" >}}

This takes you to the version management screen for the API where you can:
- delete an API version from its **Actions** menu
- select a new *default* version from its **Actions** menu

{{< img src="/img/dashboard/api-designer/tyk-oas-version-manage.png" alt="Manage the different versions of your API" >}}

##### Configure versioning settings

If you select **Edit Settings** you will open a pop-up that allows you to:
- change the versioning identifier (location and/or key)
- set the [versioning identifier pattern]({{< ref "api-management/api-versioning#stripping-url-path-version-and-default-fallback" >}}) (optional, if using URL path location)
- configure [fallback to default behaviour]({{< ref "api-management/api-versioning#fallback-to-default" >}})
- configure [version identifier stripping]({{< ref "api-management/api-versioning#stripping-version-identifier" >}})

In this example, the version identifier location is set to *Header* allowing configuration of the *Key name*:

{{< img src="/img/dashboard/api-designer/tyk-oas-version-settings.png" alt="Configure the versioning settings for your API" >}}

## Tyk Classic API versioning

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

When working with Tyk Classic APIs, all versions of an API are configured from a single API definition. This means that they share many features with a subset available to be configured differently between versions.

API versioning is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) page.

If you're using Tyk Operator then check out the [configuring API versioning in Tyk Operator](#tyk-operator) section below.

### Controlling access to Tyk Classic API versions

You can explicitly grant access to specific version(s) of an API by specifying only those version(s) in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "api-management/client-authentication#use-auth-tokens" >}})).

### Configuring API versioning in the Tyk Classic API Definition

The configuration for a new version of a Tyk Classic API is contained in the `version_data` section within the API definition.

This has the following configuration:
- `not_versioned`: set to `false` to treat this as a versioned API
- `default_version`: this must contain the `name` of the version that shall be treated as `default` (for [access control](#controlling-access-to-tyk-classic-api-versions) and [default fallback]({{< ref "api-management/api-versioning#default-api-version" >}}))
- `versions`: a list of objects that describe the versions of the API; there must be at least one (default) version defined for any API (even non-versioned APIs)

To add an API version, you must add a new entry in the `versions` list:
- `name`: an identifier for this version of the API, for example `default` or `v1`
- `expires`: an optional expiry date for the API after which Tyk will reject any access request; accepted format is `2006-01-02 15:04`
- `paths`: location for configuration of endpoint [ignore]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}), [allow]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) and [block]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) lists
- `use_extended_paths`: set to `true` to enable the `extended_paths` config
- `extended_paths`: location for configuration of additional [endpoint-level middleware]({{< ref "advanced-configuration/transform-traffic" >}})
- `global_*`: configuration of [API-level middleware]({{< ref "advanced-configuration/transform-traffic" >}}). The wildcard can be replaced by any of the API-level settings e.g. `global_size_limit`
- `override_target`: alternative upstream (target) URL that should be used for this version, overriding the `target_url` configured in the `proxy` [section]({{< ref "api-management/gateway-config-tyk-classic#proxytarget_url" >}}) of the API definition; this can be used to redirect to a different hostname or domain if required

There is also some API-level configuration for versioning, which is located in the `definition` section of the Tyk Classic API definition:

The `definition` section has the following fields:
- `location`: used to configure where the versioning identifier should be provided: `header`, `url`, `url-param`
- `key`: the versioning identifier key used if `location` is set to `header` or `url-param`
- `strip_versioning_data`: set this to `true` to [remove the versioning identifier]({{< ref "api-management/api-versioning#stripping-version-identifier" >}}) prior to creating the upstream (target) URL)
- `fallback_to_default`: set this to `true` to [invoke the default version]({{< ref "api-management/api-versioning#fallback-to-default" >}}) if an invalid version is requested
- `url_versioning_pattern`: if you are using `strip_versioning_data` and `fallback_to_default` with `location=url` [with Tyk 5.5.0 or later]({{< ref "api-management/api-versioning#stripping-url-path-version-and-default-fallback" >}}) you can configure this with a regex that matches the format that you use for the versioning identifier (`versions.name`)

The following fields in `definition` are either deprecated or otherwise not used for Tyk Classic API versioning and should be left with their default values:
- `enabled`: defaults to `false`
- `default`: defaults to an empty string `""`
- `name`: defaults to an empty string `""`
- `strip_path`: deprecated field; defaults to `false`
- `versions`: defaults to an empty array `{}`

When you first create an API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single `Default` version created in the `version_data` section of the API definition.

Here's an example of the minimal configuration that would need to be added to the API definition for an API with two versions:

```json  {linenos=true, linenostart=1}
{
  "version_data": {
    "not_versioned": false,
    "default_version": "v1",
    "versions": {
      "v1": {
        "name": "v1",
        "expires": "",
        "paths": {
          "ignored": [],
          "white_list": [],
          "black_list": []
        },
        "use_extended_paths": true,
        "extended_paths": {
          "ignored": [],
          "white_list": [],
          "black_list": [],
          "transform": [],
          "transform_response": [],
          "transform_jq": [],
          "transform_jq_response": [],
          "transform_headers": [],
          "transform_response_headers": [],
          "hard_timeouts": [],
          "circuit_breakers": [],
          "url_rewrites": [],
          "virtual": [],
          "size_limits": [],
          "method_transforms": [],
          "track_endpoints": [],
          "do_not_track_endpoints": [],
          "validate_json": [],
          "internal": [],
          "persist_graphql": []
        },
        "global_headers": {},
        "global_headers_remove": [],
        "global_headers_disabled": false,
        "global_response_headers": {},
        "global_response_headers_remove": [],
        "global_response_headers_disabled": false,
        "ignore_endpoint_case": false,
        "global_size_limit": 0,
        "override_target": ""
      },
      "v2": {
        "name": "v2",
        "expires": "",
        "paths": {
          "ignored": [],
          "white_list": [],
          "black_list": []
        },
        "use_extended_paths": true,
        "extended_paths": {
          "ignored": [],
          "white_list": [],
          "black_list": [],
          "transform": [],
          "transform_response": [],
          "transform_jq": [],
          "transform_jq_response": [],
          "transform_headers": [],
          "transform_response_headers": [],
          "hard_timeouts": [],
          "circuit_breakers": [],
          "url_rewrites": [],
          "virtual": [],
          "size_limits": [],
          "method_transforms": [],
          "track_endpoints": [],
          "do_not_track_endpoints": [],
          "validate_json": [],
          "internal": [],
          "persist_graphql": []
        },
        "global_headers": {},
        "global_headers_remove": [],
        "global_headers_disabled": false,
        "global_response_headers": {},
        "global_response_headers_remove": [],
        "global_response_headers_disabled": false,
        "ignore_endpoint_case": false,
        "global_size_limit": 0,
        "override_target": "http://httpbin.org/ip"
      }
    }
  },
  "definition": {
    "location": "header",
    "key": "x-api-version",
    "strip_versioning_data": false,
    "fallback_to_default": true,
    "url_versioning_pattern": ""
  }
}
```

In this example, there are two versions of the API
- the version identifier is provided in a request header `x-api-version`
- the versions are named `v1` and `v2`
- the only difference between `v1` and `v2` is that `v2` will proxy the request to a different upstream via the configured `override_target`
- the default version (`default_version`) is `v1`
- if the request header contains an invalid version named (e.g. `v3`), it will be directed to the default (`fallback_to_default:true`)

### Configuring API versioning in the API Designer

When you first create a Tyk Classic API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single `Default` version created in the `version_data` section of the API definition (for explanation of these fields, please see [above](#configuring-api-versioning-in-the-tyk-classic-api-definition)). The statement above holds only when designing an API "from scratch" as when importing an OAS API the versioning functionality is enabled by default.

#### Creating a versioned API

You can use the API Designer in the Tyk Dashboard to add versions for your API by following these steps.

1. **enable versioning**

    In the API Designer, navigate to the **Versions** tab.

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-no-versioning.png" alt="Enabling versioning for a Tyk Classic API" >}}

    Deselect the **Do not use versioning** checkbox to enable versioning and display the options.

2. **configure the versioning identifier**

    Choose from the drop-down where the version identifier will be located and, if applicable, provide the key name (for query parameter or request header locations).

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-start.png" alt="Configuring the versioning identifier" >}}

    <br>
    {{< note success >}}
**Note**  

The Tyk Classic API Designer does not have support to configure `url_versioning_pattern` from this screen, however it is easy to add in the Raw Definition editor.
    {{< /note >}}

3. **add a new version**

    You will see the existing (`Default`) version of your API in the **Versions List**. You can add a new version by providing a version name (which will be the value your clients will need to provide in the version location when calling the API).

    You can optionally configure an **Override target host** that will replace the target path that was set in the base configuration for the version. Note that this is not compatible with Service Discovery or Load Balanced settings.

    Select **Add** to create this new version for your API.

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-add.png" alt="Adding a new version to your API" >}}

4. **set the default version**

    You can choose any of your API versions to act as the [default]({{< ref "api-management/api-versioning#default-api-version" >}}).

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-set-default.png" alt="Choosing the default version for your API" >}}

    Select **Update** to save the changes to your API.

### Configuring an API version

As [explained]({{< ref "api-management/api-versioning#comparison-between-tyk-oas-and-tyk-classic-api-versioning" >}}) much of the Tyk Classic API definition is shared between the different versions, but some middleware can be configured differently.

From the **Endpoint Designer** tab, you can select the version that you wish to configure from the **Edit Version** dropdown.

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-endpoint.png" alt="Choosing the API version for which to configure endpoint middleware" >}}

Select **Update** to save the changes to your API.

### Configuring API versioning in Tyk Operator {#tyk-operator}

The process for configuring API versioning is similar to that defined in section [Configuring API versioning in the Tyk Classic API Definition](#configuring-api-versioning-in-the-tyk-classic-api-definition).

We can see in the example below that one version is configured for the API within `spec.version_data`:

- the version name is `v1`
- the default version (`default_version`) is `v1`
- the `definition` configuration block contains a `location` field set to `header` and has an accompanying `key` field set to `x-api-version`. Subsequently, the version identifier for the API will be retrieved from the `x-api-version` header. The comments provide examples for how to configure the version identifier to be retrieved from URL or a named URL parameter
- an allow list, black list and ignore authentication middleware have been configured for version `v1`
- an alternative upstream URL (`override_target`) is configured for `v1` to send requests to `http://test.org`

```yaml {linenos=table,hl_lines=["14-17", "25-27", "29-82"], linenostart=1}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: versioned-api
spec:
  name: Versioned API
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://version-api.example.com
    listen_path: /version-api
    strip_listen_path: true
  definition:
  # Tyk should find version data in Header
    location: header
    key: x-api-version

  # Tyk should find version data in First URL Element
    #location: url

  # Tyk should find version data in URL/Form Parameter
    #location: url-param
    #key: api-version
  version_data:
    default_version: v1
    not_versioned: false
    versions:
      v1:
        name: v1
        expires: ""
        override_target: "http://test.org"
        use_extended_paths: true
        extended_paths:
          ignored:
            - path: /v1/ignored/noregex
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
          white_list:
            - path: v1/allowed/allowlist/literal
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
            - path: v1/allowed/allowlist/reply/{id}
              method_actions:
                GET:
                  action: reply
                  code: 200
                  data: flump
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
            - path: v1/allowed/allowlist/{id}
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
          black_list:
            - path: v1/disallowed/blocklist/literal
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
```
