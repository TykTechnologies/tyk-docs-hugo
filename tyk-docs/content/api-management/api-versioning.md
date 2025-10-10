---
title: API Versioning
date: 2025-10-10
tags: ["API versioning", "version", "Tyk Classic", "Tyk OAS", "API", "versioning"]
description: Create and manage multiple versions of an API
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
- **Flexibility**: It allows you to improve and expand your API without disrupting existing users.
- **Stability**: Clients can continue using a specific version of the API, ensuring their applications remain functional.
- **Transition management**: You can gradually phase out older versions while giving clients time to migrate to newer ones.
- **Documentation**: Each version can have its own documentation, making it easier for developers to understand the specific capabilities and limitations of the version they're using.

---

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

## Sunsetting API versions

API sunsetting is the process of phasing out or retiring an older version of an API or an entire API. It's a planned, gradual approach to ending support for an API or API version. To aid with the automation of this process, all Tyk API versions can be configured with an optional expiry date `expiration` (`expires` for Tyk Classic APIs), after which the API will no longer be available. If this is left blank then the API version will never expire. This is configured in standard ISO 8601 format.

When sunsetting API versions, you may have endpoints that become deprecated between versions. It can be more user friendly to retain those endpoints but return a helpful error, instead of just returning `HTTP 404 Not Found`.

This is easy to do with Tyk. You could, for example, include the deprecated endpoint in the new version of the API and configure the [mock response]({{< ref "api-management/traffic-transformation/mock-response" >}}) middleware to provide your clients with relevant information and instruction. Alternatively, you could return a `HTTP 302 Found` header and redirect the user to the new endpoint.

---

## How API versioning works with Tyk

API versioning is supported for all APIs that can be deployed on Tyk, both Tyk OAS APIs (for REST and Streaming services) and Tyk Classic APIs (used for GraphQL and TCP services). There are differences in the approach and options available when using the two API formats:

- With Tyk OAS APIs you're essentially creating distinct iterations of your API, each with its own API definition file, allowing almost complete differentiation of configuration between your API versions.
- With Tyk Classic APIs all versions of an API are configured from a single API definition. This means that they share many features with only a subset available to be configured differently between versions.

For more details, see [this comparison]({{< ref "#comparison-between-tyk-oas-and-tyk-classic-api-versioning" >}}).

Some key concepts that are important to understand when versioning your APIs are:

- [Version identifiers]({{< ref "api-management/api-versioning#version-identifiers" >}})
- [Default version]({{< ref "api-management/api-versioning#default-version" >}})
- [Base and child versions]({{< ref "api-management/api-versioning#base-and-child-apis" >}})
- [Controlling access to versions]({{< ref "api-management/api-versioning#controlling-access-to-versioned-apis" >}})

### Version Identifiers

The version identifier is the method by which the API client specifies which version of an API it is addressing with each request. Tyk supports multiple [locations]({{< ref "api-management/api-versioning#version-identifier-location" >}}) within the request where this identifier can be placed. Typically the value assigned in the version identifier will be matched to the list of versions defined for the API and, assuming that the client is [authorized to access]({{< ref "api-management/api-versioning#controlling-access-to-versioned-apis" >}}) that version, Tyk will apply the version specific processing to the request.

#### Version identifier location

Tyk supports three different locations where the client can indicate which version of an API they wish to invoke with their request:

- [Request URL (path)]({{< ref "api-management/api-versioning#request-url-path" >}})
- [Query parameter]({{< ref "api-management/api-versioning#query-parameter" >}})
- [Request header]({{< ref "api-management/api-versioning#request-header" >}})

When choosing a version identifier location, consider your API design philosophy, infrastructure requirements, client needs, caching strategy, and backward compatibility concerns. Whichever method you choose, aim for consistency across your API portfolio to provide a uniform experience for your API consumers.

##### Request URL (path)

Including the version identifier in the path (for example `/my-api/v1/users`) is a widely used approach recognized in many API designs. The version identifier is clearly visible in the request and, with the unique URL, can simplify documentation of the different versions. Tyk can support the version identifier as the **first URL fragment** after the listen path, such that the request will take the form `<listenPath>/<versionIdentifier>/<endpointPath>`.

##### Query parameter

Defining a query parameter that must be provided with the request (for example `/my-api/users?version=v1`) is easy to implement and understand. The version identifier is clearly visible in the request and can be easily omitted to target a default version. Many analytics tools can parse query parameters, making this a very analytics-friendly approach to versioning.

##### Request header

Defining a specific header that must be provided with the request (for example `x-api-version:v1`) keeps the URL *clean*, which can be aesthetically pleasing and easier to read. It works well with RESTful design principles, treating the version as metadata about the request and allows for flexibility and the ability to make changes to the versioning scheme without modifying the URL structure. Headers are less visible to users than the request path and parameters, providing some security advantage. Be aware that other proxies or caches might not consider headers for routing, which could bring issues with this method.

#### Stripping version identifier

Typically Tyk will pass all request headers and parameters to the upstream service when proxying the request. For a versioned API, the version identifier (which may be in the form of a header, path parameter or URL fragment) will be included in this scope and passed to the upstream.

The upstream (target) URL will be constructed by combining the configured `upstream.url` (`target_url` for Tyk Classic APIs) with the full request path unless configured otherwise (for example, by using the [strip listen path]({{< ref "api-management/gateway-config-tyk-oas#listenpath" >}}) feature).

If the version identifier is in the request URL then it will be included in the upstream (target) URL. If you don't want to include this identifier, then you can set `stripVersioningData` (`strip_versioning_data` for Tyk Classic APIs) and Tyk will remove it prior to proxying the request.

#### Version identifier pattern

When using the [Request URL]({{< ref "api-management/api-versioning#request-url-path" >}}) for the versioning identifier, if Tyk is configured to strip the versioning identifier then the first URL fragment after the `listenPath` (`listen_path` for Tyk Classic APIs) will be deleted prior to creating the proxy URL. If the request does not include a versioning identifier and Tyk is configured to [fallback to default]({{< ref "api-management/api-versioning#fallback-to-default" >}}), this may lead to undesired behaviour as the first URL fragment of the endpoint will be deleted.

In Tyk 5.5.0 we implemented a new configuration option `urlVersioningPattern` (`url_versioning_pattern` for Tyk Classic APIs) to the API definition where you can set a regex that Tyk will use to determine whether the first URL fragment after the `listenPath` is a version identifier. If the first URL fragment does not match the regex, it will not be stripped and the unaltered URL will be used to create the upstream URL.

### Default version

When multiple versions are defined for an API, one must be declared as the **default version**. If a request is made to the API without providing the version identifier, then this will automatically be treated as a request to the *default* version. This has been implemented to support future versioning of an originally unversioned API, as you can continue to support legacy clients with the default version.

Tyk makes it easy for you to specify - and change - the *default* version for your APIs.

#### Fallback to default

The standard behaviour of Tyk, if an invalid version is requested in the version identifier, is to reject the request returning `HTTP 404 This API version does not seem to exist`. Optionally, Tyk can be configured to redirect these requests to the *default* version by configuring the `fallbackToDefault` option in the API definition (`fallback_to_default` for Tyk Classic APIs).


### Base and child APIs

Tyk OAS introduces the concept of a **Base API**, which acts as a *parent* that routes requests to the different *child* versions of the API. The Base API stores the information required for Tyk Gateway to locate and route requests to the appropriate *child* APIs.

The *child* APIs do not have any reference back to the *parent* and so can operate completely independently if required. Typically, and we recommend, the *child* versions should be configured as Internal APIs that are not directly reachable by clients outside Tyk.

The Base API is a working version of the API and is usually the only one configured as an *External API*, so that client requests are handled (and routed) according to the configuration set in the Base API (via the version identifier included in the header, url or query parameter).

You can configure a Tyk OAS API as a *Base* API by adding the `versioning` object to the `info` section in the Tyk Vendor Extension. This is where you will configure all the settings for the versioned API. The *child* APIs do not contain this information.

Note that any version (*child* or *Base*) can be set as the [default version]({{< ref "api-management/api-versioning#default-version" >}}).

Tyk Classic APIs do not have the base and child concept because all versions share an API definition.

### Controlling access to versioned APIs

Tyk's access control model supports very granular permissions to versioned APIs using the `access_rights` assigned in the [access keys/tokens]({{< ref "api-management/policies#what-is-a-session-object" >}}) or [security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) that are applied to keys.

This means that you could restrict client access to only the [Base API]({{< ref "api-management/api-versioning#base-and-child-apis" >}}), while allowing developers to create and test new versions independently. These will only be added to the "routing table" in the Base API when the API owner is ready and access keys could then be updated to grant access to the new version(s).

Note that an access key will only have access to the `default` version if it explicitly has access to that version (e.g. if `v2` is set as default, a key must have access to `v2` to be able to [fallback to the default]({{< ref "api-management/api-versioning#fallback-to-default" >}}) if the versioning identifier is not correctly provided in the request.

When using Tyk OAS APIs each version of the API has a unique [API Id]({{< ref "api-management/gateway-config-tyk-oas#info" >}}), so you simply need to identify the specific versions in the `access_rights` list in the key in the same way that you would add multiple different APIs to a single key.

{{< note success >}}
**Note**  

Creating a new version of a Tyk OAS API will not affect its API Id, so any access keys that grant access to the API will continue to do so, however they will not automatically be granted access to the new version (which will have a new API Id).
{{< /note >}}

When using Tyk Classic APIs you can explicitly grant access to specific versions of an API by specifying only those versions in the `versions` list in the key within the single entry for the API in the `access_rights` list.

### Comparison between Tyk OAS and Tyk Classic API versioning

As explained, there are differences between the way that versioning works for Tyk OAS and Tyk Classic APIs.

These are largely due to the fact that a separate API definition is generated for each version of a Tyk OAS API, with one designated as the [base]({{< ref "api-management/api-versioning#base-and-child-apis" >}}) version (which should be exposed on Tyk Gateway with the other (child) versions set to [internal]({{< ref "api-management/traffic-transformation/internal-endpoint" >}}) visibility) whereas all versions of a Tyk Classic API are described by a single API definition.

The Tyk Classic approach limits the range of features that can differ between versions.

This table gives an indication of some of the features that can be configured per-version (✅) or only per-API (❌️) for Tyk OAS and Tyk Classic APIs.

| Feature | Configurable in Tyk OAS versioning | Configurable in Tyk Classic versioning |
|---------|------------------------------------|----------------------------------------|
| Client-Gateway security                | ✅ | ❌️ |
| Request authentication method          | ✅ | ❌️ |
| API-level header transform             | ✅ | ✅ |
| API-level request size limit           | ✅ | ✅ |
| API-level rate limiting                | ✅ | ❌️ |
| API-level caching                      | ✅ | ❌️ |
| Endpoints (method and path)            | ✅ | ✅ |
| Per-endpoint middleware                | ✅ | ✅ |
| Context and config data for middleware | ✅ | ❌️ |
| Custom plugin bundle                   | ✅ | ❌️ |
| Upstream target URL                    | ✅ | ✅ |
| Gateway-Upstream security              | ✅ | ❌️ |
| Traffic log config                     | ✅ | ❌️ |
| API segment tags                       | ✅ | ❌️ |

---

## Configuring API versioning in the API definition

You can configure a Tyk OAS API as a [Base API]({{< ref "api-management/api-versioning#base-and-child-apis" >}}) by adding the `info.versioning` [object]({{< ref "api-management/gateway-config-tyk-oas#versioning" >}}) to the [Tyk Vendor Extension]({{< ref "api-management/gateway-config-tyk-oas#tyk-vendor-extension" >}}).

Some notes on this:

- if the *base* version is to be used as the *default* then you can use the value `self` as the identifier in the `default` field
- in the `versions` field you must provide a list of key-value pairs containing details of the *child* versions:
  - `id`: the unique API Id (`x-tyk-api-gateway.info.id`) assigned to the API (either automatically by Tyk or user-defined during API creation)
  - `name`: an identifier for this version of the API, for example `v2`

The *child API* does not require any modification to its API definition. The important thing is that its API Id must be added to the `versions` list in the *base API* definition. We strongly recommend, however, that you configure `info.state.internal` to `true` for all child APIs so that they can only be accessed via the *base API*.

{{< note success >}}
**Note**  

If you are using Tyk Classic APIs, please see [this section]({{< ref "api-management/api-versioning#versioning-with-tyk-classic-apis" >}}).
{{< /note >}}

### Example Tyk OAS Base API

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

---

## API versioning in the Tyk Dashboard API Designer

You can use the API Designer in the Tyk Dashboard to add and manage versions for your APIs.

### Configure versioning

From Tyk 5.10, you can pre-configure the versioning metadata for an API before you've created the first child API.

1. Choose the API for which you want to create a new version (this can be an unversioned or versioned API) and go to the **Versions** tab

    {{< img src="/img/dashboard/api-designer/tyk-oas-version-empty.png" alt="An unversioned Tyk OAS API in the API Designer" >}}

2. Select **Edit** and you can pre-fill the following metadata:

    - [Version identifier location]({{< ref "api-management/api-versioning#version-identifier-location" >}})
    - Version identifier name (or [pattern]({{< ref "api-management/api-versioning#version-identifier-pattern" >}}) for URL versioning)
    - Version name for the base API
    - [Stripping identifier from upstream request]({{< ref "api-management/api-versioning#stripping-version-identifier" >}})
    - [Default fallback behaviour]({{< ref "api-management/api-versioning#fallback-to-default" >}})

3. Don't forget to select **Save API** when you are ready.

### Create a new child version

You can easily add a new version in the Tyk Dashboard's API Designer by following these steps.

1. Choose the API for which you want to create a new version (this can be an unversioned or versioned API) and go to the **Versions** tab

2. Select **Add New Version** to open the version creation wizard.

    {{< img src="/img/dashboard/api-designer/tyk-oas-version-create-new.png" alt="Creating a new version of a Tyk OAS API using the version creation wizard" >}}

    Choose whether to start from an existing API configuration or to start from a blank API template. If there's already at least one child version, you can select which version (child or base) you wish to use as the template for your new API.

3. If you have not already [configured]({{< ref "api-management/api-versioning#configure-versioning" >}}) the versioning for this API you will prompted to complete this information.

    {{< img src="/img/dashboard/api-designer/tyk-oas-version-modal-configure-identifier.png" alt="Configuring the version identifier from the version creation wizard" >}}

    If you've already done this, then you'll just need to provide a unique identifier name for your new child API and choose whether to make the new version the default choice.

    {{< img src="/img/dashboard/api-designer/tyk-oas-version-modal-identifier-configured.png" alt="Configuring the version identifier from the version creation wizard" >}}


4. The final step is to choose whether to publish your new version straight away or to keep it in draft until you've completed configuring it. You can also optionally choose to make the API externally accessible, which will allow direct calls to the child API not just via the base API.

    {{< img src="/img/dashboard/api-designer/tyk-oas-version-modal-set-status.png" alt="Configuring the version identifier from the version creation wizard" >}}

5. Select **Create Version** to complete the wizard. Your new API will be created and you can now adjust the configuration as required.


### Working with versioned APIs

When you have a versioned API the *Base API* will appear in the **Created APIs** list, with an expansion icon that you can select to reveal the versions.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-list.png" alt="Versioned API shows in the Created APIs list" >}}

Note that the *base* and *default* versions are highlighted with appropriate labels. You can reach the API Designer for each version in the usual way, by selecting the API name in the list (or from the **Actions** menu for the API).

#### Switch between API versions

When you are in the API Designer for a versioned API, you can switch between versions using the drop-down next to the API name.

{{< img src="/img/dashboard/api-designer/tyk-oas-switch-version.png" alt="Choose between API versions in the API designer" >}}

#### Manage version settings

You can manage all versions of your API from the **Versions** tab

{{< img src="/img/dashboard/api-designer/tyk-oas-version-manage.png" alt="Manage the different versions of your API" >}}

- You can see the versioning metadata
  - enter **Edit** mode to make changes
  - note that the common metadata can only be edited from the base API.
- You can see a list of all versions for the API and, from the **Actions** menu:
  - go directly to that version
  - delete that version
  - set the *default* version

---

## Versioning with Tyk Classic APIs

All configuration for versioning of Tyk Classic APIs is documented [here]({{< ref "api-management/gateway-config-tyk-classic#tyk-classic-api-versioning" >}}).

### Example versioned Tyk Classic API

Here's an example of the minimal configuration that would need to be added to the API definition for a Tyk Classic API with two versions (`v1` and `v2`):

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
- the version identifier is expected in a request header `x-api-version`
- the versions are named `v1` and `v2`
- the only difference between `v1` and `v2` is that `v2` will proxy the request to a different upstream via the configured `override_target`
- the default version (`default_version`) is `v1`
- if the request header contains an invalid version named (e.g. `v3`), it will be directed to the default (`fallback_to_default:true`)

### Tyk Classic API versioning in the API Designer

You can use the API Designer in the Tyk Dashboard to add and manage versions for your Tyk Classic APIs.

#### Create a versioned API

1. **Enable versioning**

    In the API Designer, navigate to the **Versions** tab.

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-no-versioning.png" alt="Enabling versioning for a Tyk Classic API" >}}

    Deselect the **Do not use versioning** checkbox to enable versioning and display the options.

2. **Configure the versioning identifier**

    Choose from the drop-down where the version identifier will be located and, if applicable, provide the key name (for query parameter or request header locations).

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-start.png" alt="Configuring the versioning identifier" >}}

3. **Add a new version**

    You will see the existing (`Default`) version of your API in the **Versions List**. You can add a new version by providing a version name (which will be the value your clients will need to provide in the version location when calling the API).

    You can optionally configure an **Override target host** that will replace the target path that was set in the base configuration for the version. Note that this is not compatible with Service Discovery or Load Balanced settings.

    Select **Add** to create this new version for your API.

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-add.png" alt="Adding a new version to your API" >}}

4. **Set the default version**

    You can choose any of your API versions to act as the [default]({{< ref "api-management/api-versioning#default-version" >}}).

    {{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-set-default.png" alt="Choosing the default version for your API" >}}

    Select **Update** to save the changes to your API.

#### Switch between versions of a Tyk Classic API

When you are in the API Designer for a versioned Tyk Classic API, you can switch between versions from the **Edit Version** dropdown in the **Endpoint Designer** tab.

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-endpoint.png" alt="Choosing the API version for which to configure endpoint middleware" >}}

Remember to select **Update** to save the changes to your API.

### Configuring Tyk Classic API versioning in Tyk Operator {#tyk-operator}

When using Tyk Operator, you can configure versioning for a Tyk Classic API within `spec.definition` and `spec.version_data`.

In the following example:

- the version identifier is a header with the name `x-api-version` (comments demonstrate how to configure the alternative version identifier locations)
- the API has one version with the name `v1`
- the default version is set to `v1`
- an allow list, block list and ignore authentication middleware have been configured for version `v1`
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

## Creating Versioned APIs via the Tyk Dashboard and Gateway APIs

As explained, you can directly [configure the version settings]({{< ref "api-management/api-versioning#configuring-api-versioning-in-the-api-definition" >}}) within the Tyk OAS API definition using the `info.versioning` section of the Tyk Vendor Extension.

Alternatively, Tyk can look after the linking of base and child versions if you are using the Tyk Dashboard API or Tyk Gateway API to manage your Tyk OAS APIs.

If you are using Tyk Classic, then you should configure versioning within the API definition prior to creating the API.

### Creating Base Version

When creating the [base version]({{< ref "api-management/api-versioning#base-and-child-apis" >}}) of your API, you do not need to do anything special - the version details will be added when you later create the first child version.

### Creating Child Versions

When you want to create a [child version]({{< ref "api-management/api-versioning#base-and-child-apis" >}}) for an existing API using the Tyk Dashboard API or Tyk Gateway API, you must provide additional query parameters to link the child and base APIs.

These parameters are common to the `POST /api/apis/oas` and `POST /tyk/apis/oas` endpoints:

- `base_api_id`: The API ID of the Base API to which the new version will be linked.
- `base_api_version_name`: The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override the base API version name.
- `new_version_name`: The version name of the created version.
- `set_default`: If true, the new version is set as default version.

These options are also available when [updating an existing API definition]({{< ref "api-management/gateway-config-managing-oas#updating-an-api" >}}) using the `PATCH /api/apis/oas` or `PATCH /tyk/apis/oas` endpoints.

#### Version Settings

When using the Tyk Gateway API or Tyk Dashboard API to create new child versions, the default versioning settings will be:

- versioning identifier location: header
- versioning identifier key: `x-tyk-version`

If you need to change these, you should do so within the `info.versioning` section of the API definition for the base version as explained [previously]({{< ref "api-management/api-versioning#configuring-api-versioning-in-the-api-definition" >}}).
