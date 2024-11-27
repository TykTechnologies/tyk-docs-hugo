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

If you're using Tyk Operator then check out the [configuring API versioning in Tyk Operator](#tyk-operator) section below.

### Controlling access to Tyk Classic API versions

You can explicitly grant access to specific version(s) of an API by specifying only those version(s) in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "/api-management/authentication-authorization#use-bearer-tokens" >}})).

## Configuring API versioning in the Tyk Classic API Definition

The configuration for a new version of a Tyk Classic API is contained in the `version_data` section within the API definition.

This has the following configuration:
- `not_versioned`: set to `false` to treat this as a versioned API
- `default_version`: this must contain the `name` of the version that shall be treated as `default` (for [access control](#controlling-access-to-tyk-classic-api-versions) and [default fallback]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}}))
- `versions`: a list of objects that describe the versions of the API; there must be at least one (default) version defined for any API (even non-versioned APIs)

To add an API version, you must add a new entry in the `versions` list:
- `name`: an identifier for this version of the API, for example `default` or `v1`
- `expires`: an optional expiry date for the API after which Tyk will reject any access request; accepted format is `2006-01-02 15:04`
- `paths`: location for configuration of endpoint [ignore]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}), [allow]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) and [block]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) lists
- `use_extended_paths`: set to `true` to enable the `extended_paths` config
- `extended_paths`: location for configuration of additional [endpoint-level middleware]({{< ref "advanced-configuration/transform-traffic" >}})
- `global_*`: configuration of [API-level middleware]({{< ref "advanced-configuration/transform-traffic" >}}). The wildcard can be replaced by any of the API-level settings e.g. `global_size_limit`
- `override_target`: alternative upstream (target) URL that should be used for this version, overriding the `target_url` configured in the `proxy` [section]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings#proxytarget_url" >}}) of the API definition; this can be used to redirect to a different hostname or domain if required

There is also some API-level configuration for versioning, which is located in the `definition` section of the Tyk Classic API definition:

The `definition` section has the following fields:
- `location`: used to configure where the versioning identifier should be provided: `header`, `url`, `url-param`
- `key`: the versioning identifier key used if `location` is set to `header` or `url-param`
- `strip_versioning_data`: set this to `true` to [remove the versioning identifier]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-version-identifier" >}}) prior to creating the upstream (target) URL)
- `fallback_to_default`: set this to `true` to [invoke the default version]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#fallback-to-default" >}}) if an invalid version is requested
- `url_versioning_pattern`: if you are using `strip_versioning_data` and `fallback_to_default` with `location=url` [with Tyk 5.5.0 or later]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-url-path-version-and-default-fallback" >}}) you can configure this with a regex that matches the format that you use for the versioning identifier (`versions.name`)

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

## Configuring API versioning in the API Designer

When you first create a Tyk Classic API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single `Default` version created in the `version_data` section of the API definition (for explanation of these fields, please see [above](#configuring-api-versioning-in-the-tyk-classic-api-definition)). The statement above holds only when designing an API "from scratch" as when importing an OAS API the versioning functionality is enabled by default.

### Creating a versioned API

You can use the API Designer in the Tyk Dashboard to add versions for your API by following these steps.

##### Step 1: enable versioning

In the API Designer, navigate to the **Versions** tab.

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-no-versioning.png" alt="Enabling versioning for a Tyk Classic API" >}}

Deselect the **Do not use versioning** checkbox to enable versioning and display the options.

##### Step 2: configure the versioning identifier

Choose from the drop-down where the version identifier will be located and, if applicable, provide the key name (for query parameter or request header locations).

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-start.png" alt="Configuring the versioning identifier" >}}

<br>
{{< note success >}}
**Note**  

The Tyk Classic API Designer does not have support to configure `url_versioning_pattern` from this screen, however it is easy to add in the Raw Definition editor.
{{< /note >}}


##### Step 3: add a new version

You will see the existing (`Default`) version of your API in the **Versions List**. You can add a new version by providing a version name (which will be the value your clients will need to provide in the version location when calling the API).

You can optionally configure an **Override target host** that will replace the target path that was set in the base configuration for the version. Note that this is not compatible with Service Discovery or Load Balanced settings.

Select **Add** to create this new version for your API.

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-add.png" alt="Adding a new version to your API" >}}

##### Step 4: set the default version

You can choose any of your API versions to act as the [default]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}}).

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-set-default.png" alt="Choosing the default version for your API" >}}

Select **Update** to save the changes to your API.

### Configuring an API version

As [explained]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#comparison-between-tyk-oas-and-tyk-classic-api-versioning" >}}) much of the Tyk Classic API definition is shared between the different versions, but some middleware can be configured differently.

From the **Endpoint Designer** tab, you can select the version that you wish to configure from the **Edit Version** dropdown.

{{< img src="/img/dashboard/endpoint-designer/tyk-classic-version-endpoint.png" alt="Choosing the API version for which to configure endpoint middleware" >}}

Select **Update** to save the changes to your API.

## Configuring API versioning in Tyk Operator {#tyk-operator}

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
