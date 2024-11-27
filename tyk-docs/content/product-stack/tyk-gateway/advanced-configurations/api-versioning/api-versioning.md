---
title: "API versioning"
date: 2024-07-11
tags: ["API", "versioning", "version", "Introduction"]
description: "An introduction to API versioning"
---

API versioning is a crucial practice in API development and management that allows you to evolve your API over time while maintaining backward compatibility for existing clients. As your API grows and changes, versioning provides a structured way to introduce new features, modify existing functionality, or deprecate outdated elements without breaking integrations for users who rely on previous versions.

API versioning is important for several reasons:
- flexibility: it allows you to improve and expand your API without disrupting existing users
- stability: clients can continue using a specific version of the API, ensuring their applications remain functional
- transition management: you can gradually phase out older versions while giving clients time to migrate to newer ones
- documentation: each version can have its own documentation, making it easier for developers to understand the specific capabilities and limitations of the version they're using

## When to use API versioning
There are many occasions when you might use versioning with your APIs, here are just a few examples.

#### Adding new features

Imagine you're running an e-commerce API, and you want to introduce a new recommendation engine. Instead of modifying the existing endpoint and potentially breaking current integrations, you could create a new version of the API that includes this feature. This allows you to roll out the enhancement to interested clients while others continue using the previous version without disruption.

#### Changing response formats

Let's say you have a weather API that currently returns temperatures in Fahrenheit. You decide to switch to Celsius for international standardization. By creating a new API version with this change, you can transition to the new format without affecting existing users who expect Fahrenheit readings. This gives clients time to adapt their applications to handle the new response format.

#### Deprecating outdated functionality

If your financial API includes a legacy payment processing method that you plan to phase out, versioning allows you to create a new version without this feature. You can then encourage users to migrate to the new version over time, eventually deprecating the old version containing the outdated functionality.

#### Optimizing performance

You might discover a more efficient way to structure your API requests and responses. By introducing these optimizations in a new version, you can offer improved performance to clients who are ready to upgrade, while maintaining the existing version for those who aren't prepared to make changes yet.

## How API versioning works with Tyk

API versioning was originally implemented for the legacy Tyk Classic API. We took lessons from this and, for Tyk OAS, introduced a more flexible approach.

#### Tyk OAS API versioning
With Tyk OAS APIs you're essentially creating distinct iterations of your API, each with its own API definition file, allowing almost complete differentiation of configuration between your API versions.


#### Tyk Classic API versioning
With Tyk Classic APIs all versions of an API are configured from a single API definition. This means that they share many features with only a subset available to be configured differently between versions.

#### Comparison between Tyk OAS and Tyk Classic API versioning

Here's a comparison of some of the features that can be configured per-version (✅) or only per-API (❌️) between Tyk OAS and Tyk Classic APIs. Note that this is not a comprehensive list - to see all the options that can be configured differently for Tyk Classic API versions please review the [Tyk Classic versioning]({{< ref "getting-started/key-concepts/versioning" >}}) section.

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

### Version identifiers

Tyk supports three different locations where the client can indicate which version of an API they wish to invoke with their request:
- [URL path](#request-url-path)
- [Query parameter](#query-parameter)
- [Request header](#request-header)

When choosing a version identifier location, consider your API design philosophy, infrastructure requirements, client needs, caching strategy, and backward compatibility concerns. Whichever method you choose, aim for consistency across your API portfolio to provide a uniform experience for your API consumers.

#### Request URL (path)

Including the version identifier in the path (for example `/my-api/v1/users`) is a widely used approach recognized in many API designs. The version identifier is clearly visible in the request and, with the unique URL, can simplify documentation of the different versions. Tyk can support the version identifier as the **first URL fragment** after the listen path, such that the request will take the format: `<listenPath>/<version>/<endpointPath>`.

#### Query parameter

Defining a query parameter that must be provided with the request (for example `/my-api/users?version=v1`) is easy to implement and understand. The version identifier is clearly visible in the request and can be easily omitted to target a default version. Many analytics tools can parse query parameters, making this a very analytics-friendly approach to versioning.

#### Request header

Defining a specific header that must be provided with the request (for example `x-api-version:v1`) keeps the URL *clean*, which can be aesthetically pleasing and easier to read. It works well with RESTful design principles, treating the version as metadata about the request and allows for flexibility and the ability to make changes to the versioning scheme without modifying the URL structure. Headers are less visible to users than the request path and parameters, providing some security advantage. Be aware that some proxies or caches might not consider headers for routing, which could bring issues with this method.

### Default API version

When multiple versions are defined for an API, one must be declared as the **default version**. If a request is made to the API without providing the version identifier, then this will automatically be treated as a request to the *default* version. This has been implemented to support future versioning of an originally unversioned API, as you can continue to support legacy clients with the default version.

The API definition (and Tyk Dashboard's API Designer) makes it easy for you to specify - and change - the *default* version for your APIs, as explained in the appropriate section for [Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) and [Tyk Classic APIs]({{< ref "getting-started/key-concepts/versioning" >}}).

##### Fallback to default

The standard behaviour of Tyk, if an invalid version is requested in the version identifier, is to reject the request returning `HTTP 404 Not Found`. Optionally, Tyk can be configured to redirect these requests to the *default* version by configuring the `fallbackToDefault` option in the API definition (`fallback_to_default` for Tyk Classic APIs).

### Stripping version identifier

Typically Tyk will pass all request headers and parameters to the upstream service when proxying the request. For a versioned API, the version identifier (which may be in the form of a header, path parameter or URL fragment) will be included in this scope and passed to the upstream.

The upstream (target) URL will be constructed by combining the configured `upstream.url` (`target_url` for Tyk Classic APIs) with the full request path unless configured otherwise (for example, by using the [strip listen path]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#listenpath" >}}) feature).

If the version identifier is in the request URL then it will be included in the upstream (target) URL. If you don't want to include this identifier, then you can set `stripVersioningData` (`strip_versioning_data` for Tyk Classic APIs) and Tyk will remove it prior to proxying the request.

##### Stripping URL path version and default fallback

When using the [Request URL](#request-url-path) for the versioning identifier, if Tyk is configured to strip the versioning identifier then the first URL fragment after the `listenPath` (`listen_path` for Tyk Classic APIs) will be deleted prior to creating the proxy URL. If the request does not include a versioning identifier and Tyk is configured to [fallback to default](#fallback-to-default), this may lead to undesired behaviour as the first URL fragment of the endpoint will be deleted.

In Tyk 5.5.0 we implemented a new *URL versioning pattern* configuration option where you can set a regex that Tyk will use to determine whether the first URL fragment after the `listenPath` is a version identifier. If the first URL fragment does not match the regex, it will not be stripped and the unaltered URL will be used to create the upstream URL.

## Sunsetting API versions

API sunsetting is the process of phasing out or retiring an older version of an API or an entire API. It's a planned, gradual approach to ending support for an API or API version. To aid with the automation of this process, all Tyk API versions can be configured with an optional expiry date, after which the API will no longer be available. If this is left blank then the API version will never expire.

When sunsetting API versions, you may have endpoints that become deprecated between versions. It can be more user friendly to retain those endpoints but return a helpful error, instead of just returning `HTTP 404 not found`.

This is easy to do with Tyk. You can include the deprecated endpoint in the new version of the API and configure the [mock response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware to provide your clients with relevant information and instruction. Alternatively, you could return a 302 header and redirect the user to the new endpoint.

## Authorizing access to versioned APIs

Tyk's access control model supports very granular permissions to versioned APIs.

You can explicitly grant access to specific version(s) of an API by specifying only those version(s) in the [key]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}) (also known as an *authorization token*, *bearer token*, *access token*, *API token* or *token session object* - see [here]({{< ref "/api-management/authentication-authorization#use-bearer-tokens" >}})).

<br>
{{< note success >}}
**Note**  

API tokens (keys) created from a [Security Policy]({{< ref "basic-config-and-security/security/security-policies" >}}) will be granted access to the APIs named in the policy, so whilst we have discussed access keys here, the same rules apply to the policies from which keys might have been created.
{{< /note >}}

<hr>

If you're using Tyk OAS APIs, then you can find details of how to use versioning [here]({{< ref "getting-started/key-concepts/oas-versioning" >}}).

If you're using Tyk Classic APIs, then you can find details of how to use versioning [here]({{< ref "getting-started/key-concepts/versioning" >}}).
