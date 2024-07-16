---
title: "Tyk Classic API versioning"
date: 2024-07-11
tags: ["API versioning", "version", "Tyk Classic"]
description: "Versioning your Tyk Classic APIs"
aliases:
  - /tyk-apis/tyk-gateway-api/api-definition-objects/versioning-endpoint/
---

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

When working with Tyk Classic APIs, all versions of an API are configured from a single API definition. This means that they share many features with a subset available to be configured differently between versions.

API versioning is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "getting-started/key-concepts/oas-versioning" >}}) page.

### Controlling access to Tyk Classic API versions

You can explicitly grant access to specific version(s) of an API by specifying only those version(s) in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "basic-config-and-security/security/authentication-authorization/bearer-tokens" >}})).

When using Tyk Classic APIs there are some subtleties to the propagation of access control between versions of an API due to the sharing of one API definition for all versions:
- if an API is converted into a versioned API, then any pre-existing *keys* will lose access and will need to be re-issued
- if a *key* is granted access to the `default` version of an API, then it will inherit access to all other versions of the API (including new versions as they are created)
- if the `default` version is changed (e.g. from `v1` to `v2` as you deprecate the original) then only *keys* with explicit access to the new `default` (e.g. `v2`) will now inherit access to all other versions; any *key* that had explicit access only to the previous `default` (e.g. `v1`) will lose access to all other versions, including the new `default`

## Configuring API versioning in the Tyk Classic API Definition

The configuration for a new version of a Tyk Classic API is contained in the `version_data` section within the API definition.

This has the following configuration:
- `not_versioned`: set to `true` to treat this as a versioned API
- `default_version`: this must contain the `name` of the version that shall be treated as `default` (for [access control](#controlling-access-to-tyk-classic-api-versions) and [default fallback]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}}))
- `versions`: a list of objects that describe the versions of the API; there must be at least one (default) version defined for any API (even non-versioned APIs)

To add an API version, you must add a new entry in the `versions` list:
- `name`: an identifier for this version of the API, for example `default` or `v1`
- `expires`: an optional expiry date for the API after which Tyk will reject any access request
- `paths`: location for configuration of endpoint [ignore]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}), [allow]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) and [block]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) lists
- `use_extended_paths`: set to `true` to enable the `extended_paths` config
- `extended_paths`: location for configuration of additional [endpoint-level middleware]({{< ref "advanced-configuration/transform-traffic" >}})
- `global_*`: configuration of [API-level middleware]({{< ref "advanced-configuration/transform-traffic" >}}) 
- `override_target`: alternative upstream (target) URL that should be used for this version, overriding the `target_url` configured in the `proxy` [section]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings#proxytarget_url" >}}) of the API definition; this can be used to redirect to a different hostname or domain if required

There is also some API-level configuration for versioning, which is located in the `definition` section of the Tyk Classic API definition:

The `definition` section has the following fields:
- `default`: not used by versioning
- `enabled`: not used by versioning
- `name`: not used by versioning
- `strip_path`: not used by versioning
- `location`: used to configure where the versioning identifier should be provided: `header`, `url`, `url-param`
- `strip_versioning_data`: set to `true` for Tyk to [remove the versioning identifier]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-version-identifier" >}}) prior to creating the upstream (target) URL)
- `fallback_to_default`: set to `true` for Tyk to [invoke the default version]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#fallback-to-default" >}}) if an invalid version is requested
- `url_versioning_pattern`: configure this with a regex that matches the format that you use for the versioning identifier (`versions.name`) if you are using `strip_versioning_data` and `fallback_to_default` with `location=url` [with Tyk 5.5.0 or later]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-url-path-version-and-default-fallback" >}})
- `versions`: not used
- `key`: the versioning identifier key used if `location` is set to `header` or `url-param`

When you first create an API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single `Default` version created in the `version_data` section of the API definition.

Here's an example of a minimal configuration for an API with two versions:

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
    "default": "",
    "enabled": false,
    "name": "",
    "strip_path": false,
    "location": "header",
    "strip_versioning_data": false,
    "fallback_to_default": true,
    "url_versioning_pattern": "",
    "versions": {},
    "key": "x-api-version"
  }
}
```

In this example, there are two versions of the API
- the version identifier is provided in a request header `x-api-version`
- the versions are named `v1` and `v2`
- the only difference between `v1` and `v2` is that `v2` will proxy the request to a different upstream via the configured `override_target`
- the default version (`default_version`) is `v1`
- if the request header contains an invalid version named (e.g. `v3`), it will be directed to the default (`fallback_to_default:true`)

## Configuring API versioning in the API Designer

When you first create a Tyk Classic API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single `Default` version created in the `version_data` section of the API definition (for explanation of these fields, please see [above](#configuring-api-versioning-in-the-tyk-classic-api-definition)).

### Creating a versioned API

You can use the API Designer in the Tyk Dashboard to add versions for your API by following these steps.

##### Step 1: enable versioning

In the API Designer, navigate to the **VERSIONS** tab.

{{< img src="/img/2.10/no_versioning.png" alt="Enabling versioning for a Tyk Classic API" >}}

Deselect the **Do not use versioning** checkbox to enable versioning and display the options.

##### Step 2: configure the versioning identifier

Choose from the drop-down where the version identifier will be located and, if applicable, provide the key name (for query parameter or request header locations).

{{< img src="/img/2.10/versioning.png" alt="Configuring the versioning identifier" >}}

##### Step 3: add a new version

You will see the existing (`Default`) version of your API in the **Versions List**. You can add a new version by providing a version name (which will be the value your clients will need to provide in the version location when calling the API).

You can optionally configure an **Override target host** that will replace the target path that was set in the base configuration for the version. Note that this is not compatible with Service Discovery or Load Balanced settings.

Select **ADD** to create this new version for your API.

//**Image to be added**//

##### Step 4: set the default version

You can choose any of your API versions to act as the [default]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}}).

//**Image to be added**//

Select **UPDATE** to save the changes to your API.

### Configuring an API version

As [explained]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#comparison-between-tyk-oas-and-tyk-classic-api-versioning" >}}) much of the Tyk Classic API definition is shared between the different versions, but some middleware can be configured differently.

From the **Endpoint Designer** tab, you can select the version that you wish to configure from the **Edit Version** dropdown.

//**Image to be added**//

Select **UPDATE** to save the changes to your API.