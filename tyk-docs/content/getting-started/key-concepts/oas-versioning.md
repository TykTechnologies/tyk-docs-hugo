---
title: "Tyk OAS API versioning"
date: 2024-07-16
tags: ["API versioning", "version", "Tyk OAS"]
description: "Versioning your Tyk OAS APIs"
---

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

When working with Tyk OAS APIs, each version of an API has its own API definition. This means that there is complete flexibility to configure each version differently from the others.

API versioning is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API (by creating/updating the API definition via the /apis/oas POST handler) or in the API Designer. 

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "getting-started/key-concepts/versioning" >}}) page.

### Controlling access to Tyk OAS API versions

You can explicitly grant access to specific version(s) of an API by specifying the individual API definitions for each version in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "/api-management/authentication-authorization#use-bearer-tokens" >}})).

When using Tyk OAS APIs there are some subtleties to the propagation of access control between versions of an API:
- each version of an API is treated individually by Tyk Gateway, so access must be explicity granted for each version
- an existing *key* will continue to work with a Tyk OAS API that is converted into a versioned API
- existing *keys* will not automatically be granted access to new versions
- a *key* will only have access to the `default` version if it explicitly has access to that version (e.g. if `v2` is set as default, a *key* must have access to `v2` to be able to fallback to the default if the versioning identifier is not correctly provided)

This means that you could limit access to the [Base API](#base-and-child-apis) (which provides routing to the different versions) to the API owner, while allowing developers to create and test new versions independently. These will only be added to the "routing table" in the Base API when the API owner is ready. 

### Base and child APIs

Tyk OAS introduces the concept of a **Base API**, which acts as a "parent" API version that routes requests to the different versions of the API. The Base API definition stores the information required for Tyk Gateway to locate and route requests to the appropriate "child" API version.

The "child" versions do not have any reference back to the "parent" and so can operate completely independently if required. Typically, and we recommend, the "child" versions should be configured as [Internal APIs]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#state" >}}) that are not directly reachable by clients outside Tyk.

The Base API is a working version of the API and is usually the only one configured as an *External API*, so that client requests are handled (and routed) according to the configuration set in the Base API (via the version identifier included in the header, url or query parameter).

Note that any version (including the Base API) can be set as *default* for [access control](#controlling-access-to-tyk-oas-api-versions) and [default fallback]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}}).

## Configuring API versioning in the Tyk OAS API Definition

You can configure a Tyk OAS API as a [Base API](#base-and-child-apis) by adding the `versioning` object to the `info` section in the Tyk extension section, `x-tyk-api-gateway`.

The `versioning` [object]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#versioning" >}}) has the following configuration:
- `enabled`: enable versioning
- `name`: an identifier for this version of the API, for example `default` or `v1`
- `default`: the `name` of the API definition that shall be treated as *default* (for [access control](#controlling-access-to-tyk-oas-api-versions) and [default fallback]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#default-api-version" >}})); if the base API is to be used as the default then you can instead use the value `self` in this field
- `location`: used to configure where the versioning identifier should be provided: `header`, `url`, `url-param`
- `key`: the versioning identifier key used if `location` is set to `header` or `url-param`
- `versions`: a list of key-value pairs storing details of the *child APIs*; for example `[{"id": "08062e93127843ca76add614e766b0e4", "name": "exampleVersion"}]`
- `fallbackToDefault`: set to `true` for Tyk to [invoke the default version]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#fallback-to-default" >}}) if an invalid version is requested
- `stripVersioningData`: set to `true` for Tyk to [remove the versioning identifier]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-version-identifier" >}}) prior to creating the upstream (target) URL
- `urlVersioningPattern`: configure this with a regex that matches the format that you use for the versioning identifier (`name`) if you are using `stripVersioningData` and `fallBackToDefault` with `location=url` [with Tyk 5.5.0 or later]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-url-path-version-and-default-fallback" >}})

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

## Configuring API versioning in the API Designer

You can use the API Designer in the Tyk Dashboard to add and manage versions for your Tyk OAS APIs.

### Create a new API version

Starting from a Tyk OAS API (either newly created or an existing non-versioned API) you can easily add a new version by following these steps.

##### Step 1: Create the new version

Select **Create A New Version** from the **Actions** menu.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-menu-create-new.png" alt="Creating a new version of a Tyk OAS API from the Actions menu" >}}

This will bring up the *Create new API version* pop-up.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-modal-create-new.png" alt="Choosing the version name for a new version of a Tyk OAS API" >}}

Assign your existing version a *version name* (e.g. v1), then assign a *name* for the new version (e.g. v2). You should then select one of these to use as the *default* version.

Select **Create Version**

##### Step 2: Configure the new version

You'll be taken to the API designer view for the new version - remember that this will be a completely separate Tyk OAS API Definition for the new version. By default, Tyk Dashboard will have given this API the same name as the original, appending the *version name* that you assigned in [step 1](#step-1-create-the-new-version).

Tyk will have set the *Access* to *Internal*, so that this version cannot be directly accessed by clients, only via the original (base) API.

{{< img src="/img/dashboard/api-designer/tyk-oas-version-created.png" alt="New version of Tyk OAS API has been created" >}}

Configure the API definition as required, then select **Save API**

By default, Tyk will have configured the versioning identifier location as Request Header, with the key `x-api-version`. You can modify this by following the steps [here](#configure-versioning-settings), but if you're happy with this then that's it - your new API version is ready for use.

### Managing API versions

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
- set the [versioning identifier pattern]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-url-path-version-and-default-fallback" >}}) (optional, if using URL path location)
- configure [fallback to default behaviour]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#fallback-to-default" >}})
- configure [version identifier stripping]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#stripping-version-identifier" >}})

In this example, the version identifier location is set to *Header* allowing configuration of the *Key name*:

{{< img src="/img/dashboard/api-designer/tyk-oas-version-settings.png" alt="Configure the versioning settings for your API" >}}
