---
title: API Versioning
menu:
  main:
    parent: "Key Concepts"
weight: 60
---

## Why Version your APIs?
Tyk enables full version life-cycle management for your APIs. It includes the ability to define different configurations for different versions of an API and have Tyk manage route and middleware configurations on the same listen path of any given API. By default, Tyk expects to find version information in a header key, a query parameter or the first part of a URL.

## Dashboard Settings

In the Tyk API Designer, versioning is not enabled by default. This creates a "Default" version which can store any path-related data and settings. Versions are set by a unique version name that matches the version tag you use to identify the version in a request, this can either be as a header field or as an URL parameter.

![No version screenshot]({{< ref "img/2.10/no_versioning.png" >}})

Clear the **Do not use versioning** option from the **Versions** tab to display the versioning options.

![version options]({{< ref "img/2.10/versioning.png" >}})

The versions fields define the value that Tyk expects to find either in the versions headers or query parameter, so if your version name is v1 then Tyk will look for a header key that matches v1 exactly on the key that you specify (default version).

The target override field will replace the target path that was set in the base configuration for the version. This is not compatible with Service Discovery or Load Balanced settings.

{{< note success >}}
**Note**  

You can also use the target override field to redirect to a different hostname or domain if required.
{{< /note >}}


## Versioning Mechanisms

There are pros and cons for the various methods for versioning your API. We are not recommending one method over another, we have just added ways of supporting the following methods.
### Header

The format is:

`X-API-Version:<version>`

For Example:

`X-API-Version:2`

### First URL Element

The format is:

`/<version>/<method>`

For Example:

`/v2/users/create`

### URL or Form Parameter

The format is:

`/<method>?version=<version>`

For Example:

`/users/create?version=1`

## Sunsetting API Versions 

All versions can have an expiry date set in the **Expires** field. Leave this field blank for the version to never expire.

### Use case: Using Mocks in Versioned APIs

When sunsetting API versions, you may have endpoints that become deprecated. It can be more user friendly to retain those endpoints but return an error instead of just returning a 404 not found.

With versioning, it is very useful to take the endpoint that is deprecated in v1, and add it to v2 as a mock with a forced response body that indicates the request has in fact been deprecated with a meaningful message as to where to go.

Alternatively, you could return a 302 header and redirect the user to the new endpoint. Both options would be more user friendly than a 404 error.

## Versioned APIs and Policies

Tyk's access control model supports very granular permissions. If you are versioning APIs, you can explicitly grant access to that version by adding it to a policy. This would mean that all API tokens that have access to a previous version, that are assigned to this policy, also get access to the new version in one go.

## Versioned APIs and Keys

The same applies as for versioned APIs and policies, except that the versioning will apply to a single key.

## Set up Versioning via the API Definition

### From the API

Versioning an API with Tyk is straightforward and should integrate easily with how your API definition is set up.

#### Step 1

To activate versioning in an API, create a version entry in the `version_data.versions` section of the API Definition:

```{.copyWrapper}
{
  "version-1": {
    "name": "version-1",
    "expires": "",            
    "use_extended_paths": true,
    "extended_paths": {
      "ignored": [
        {
          "path": "/v1/ignored/noregex",
          "method_actions": {
            "GET": {
              "action": "no_action",
              "code": 200,
              "data": "",
              "headers": {
                "x-tyk-override-test": "tyk-override",
                "x-tyk-override-test-2": "tyk-override-2"
              }
            }
          }
        }
      ],
      "white_list": [
        {
          "path": "v1/allowed/whitelist/literal",
          "method_actions": {
            "GET": {
              "action": "no_action",
              "code": 200,
              "data": "",
              "headers": {
                "x-tyk-override-test": "tyk-override",
                "x-tyk-override-test-2": "tyk-override-2"
              }
            }
          }
        },
          {
            "path": "v1/allowed/whitelist/reply/{id}",
            "method_actions": {
              "GET": {
                "action": "reply",
                "code": 200,
                "data": "flump",
                "headers": {
                  "x-tyk-override-test": "tyk-override",
                  "x-tyk-override-test-2": "tyk-override-2"
                }
              }
            }
          },
          {
            "path": "v1/allowed/whitelist/{id}",
            "method_actions": {
              "GET": {
                "action": "no_action",
                "code": 200,
                "data": "",
                "headers": {
                  "x-tyk-override-test": "tyk-override",
                  "x-tyk-override-test-2": "tyk-override-2"
              }
            }
          }
        }
      ],
      "black_list": [
        {
          "path": "v1/disallowed/blacklist/literal",
          "method_actions": {
            "GET": {
              "action": "no_action",
              "code": 200,
              "data": "",
              "headers": {
                "x-tyk-override-test": "tyk-override",
                "x-tyk-override-test-2": "tyk-override-2"
              }
            }
          }
        }
      ]
    }
  }
}
```

#### Step 2

Ensure that the definition section of the API Definition file/object is set up to find the version data:

```{.copyWrapper}
"definition": {
  "location": "header",
  "key": "x-api-version"
}
```

In this section you can either set the location to **Header**, **First URL Element** or **URL/Form Parameter**. This will tell Tyk where to try and find version information for the request. When `url-param` is set, Tyk will check query parameters or url-form-encoded parameters for the version key (so `GET`, `POST`, `PUT`, and `DELETE` methods can be used with data encoded in the query string or in the body of the request).

When the key is extracted from the request, the current token session is checked to see whether the user has access to the version. This is checked by attempting to match the version name against the key value. this is case sensitive.

#### Step 3

Finally, ensure that the API is actually set to allow versioning, this is done by setting the `version_data.not_versioned` value to false.

### A few notes on versioning and allowing access

*   Version expiry is applied to all keys
*   Version ignored / white-listing / black listing is applied to all keys
*   Version access control is only applied to keys which have access-control parameters applied to them. If a key has no access_rights data in the session key, then the request will be allowed through to the underlying API.

#### Step 4

By default, Tyk require version information in a header key, a query parameter or the first part of a URL. Optionally, you can set default API version using `version_data.default_version`, which will be used, if version info not specified in request.


### Targeting a Different API Host Per API Version with Tyk

In many cases a versioned API will have different upstream back-end servers. In order to make it possible to target those servers when a new version flag is detected, you can use the `override_target` option in the version definition to set it to the host you would like to target for the specified version.

See  [API Definition Object Details]({{< ref "tyk-gateway-api/api-definition-objects/" >}}) for details of the the available keys in the API Definition.
