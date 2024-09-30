---
title: URL Path Matching
tags:
    - URL path matching
    - Regular expressions
    - Secure access
    - Middleware
    - Routing
    - Endpoint
    - Listen path
description: Overview of URL path matching with the Tyk Gateway
date: "2024-08-30"
---

When a request is made to an API hosted on Tyk Gateway, the gateway matches the incoming URL path against routes (patterns) defined in the API definition. Matching the request path against the *listen path* of an API exposed on the gateway is the first step for Tyk determining how to handle the request. Tyk provides a very flexible and configurable approach to URL path matching to support a wide range of use cases.
 
Understanding this process is crucial because it directly impacts how URLs are routed and matched, influencing both API behavior and security controls.


## What is URL path matching?

URL path matching defines the rules for how request URLs are compared to
predefined patterns, determining whether they should trigger certain
routes, middleware, or security policies. This is especially important
for developers configuring APIs and middleware to control which endpoints
are exposed, restricted, or protected.

When configuring APIs, precise URL path matching helps developers:

1. **Control Access to Endpoints**: By using strict or flexible URL path matching patterns, you can fine-tune which routes are exposed to users or external systems.
2. **Simplify Routing Logic**: Instead of defining individual routes for each endpoint, URL path matching lets you group similar routes using patterns, reducing complexity.
3. **Enhance Security**: Properly defined URL path matching patterns are essential for enforcing security policies, like blocking or allowing access to specific resources.

URL path matching is fundamental to the behavior of various Tyk middleware, including:

- [Granular access control]({{< ref "security/security-policies/secure-apis-method-path" >}})
- [Allow List]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}})
- [Block List]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}})
- [Request and Response transformation]({{< ref "advanced-configuration/transform-traffic" >}})

{{< note success >}}
**Note**  

The [URL Rewriting]({{< ref "transform-traffic/url-rewriting#how-url-rewriting-works" >}}) middleware's
rule check implements regular expression matching only: it does not apply URL path matching logic and is not
affected by the configurations described in this section
{{< /note >}}


## When might you want to control URL path matching?

Understanding the Gateway's URL path matching behavior is essential in scenarios such as:

- **API Versioning**: You may want to allow different versions of an API, such as `/v1/users` and `/v2/users`, while still matching certain common paths or endpoints.
- **Middleware Control**: Middleware often relies on URL path matching to determine when specific behaviors, such as rate limiting or authentication, should be applied.
- **Security Policies**: URL path matching ensures that security policies, such as allow or block lists, are enforced for the correct paths without mistakenly leaving critical routes unprotected.

By fine-tuning these configurations, developers can create robust,
secure, and maintainable routing rules tailored to their specific use
cases.


## Structure of the API request

When a client makes a request to an API hosted on Tyk Gateway, they provide an HTTP method and *request path*. This *request path* will comprise the host (or domain) name for the Gateway, the API *listen path* and then (optionally) the *endpoint path*.

The *listen path* is a mandatory field defined in the API definition loaded onto the Gateway. Tyk will compare the incoming *request path* (after stripping off the host name) against all registered *listen paths* to identify the API definition (and hence Gateway configuration) that should be used to handle the request. If no match is found, then Tyk will reject the request with `HTTP 404 Not Found`.

If a match is found, Tyk will then handle the request according to the configuration in the matching API definition. The *endpoint path* will be compared against any endpoints defined in the API definition to determine which endpoint-level configuration (such as transformation middleware) should be applied to the request.

### Listen path

Tyk treats the *listen path* configured in the API definition as a regex, allowing advanced users to perform complex listen path matching by setting a regex in the API definition.

The [TYK_GW_HTTPSERVEROPTIONS_ENABLESTRICTROUTES]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_strict_routes" >}}) option in the Tyk Gateway configuration is provided to avoid nearest-neighbour requests on overlapping routes. If this is set to `true` then Tyk will perform an exact match of the request against the configured *listen path* including the trailing `/` used to mark the end of the *listen path*. For example:
- with strict routes enabled, an API with *listen path* set to `/app` will match requests to `/app`, `/app/` and `/app/*` but will not match `/app1/*` or `/apple/`
- without strict routes, all of the above requests would match to the API with *listen path* set to `/app`

<br>
{{< note success >}}
**Note**  

Tyk is acting as a secure proxy between the client and upstream service, so when proxying the request upstream, it will replace the Gateway's *host name* with the *target URL* configured in the API definition.
<br>
Thus a request to `<gateway-address>/<listen-path>/<version-identifier>/<endpoint-path>` will be proxied to `<target-url>/<listen-path>/<version-identifier>/<endpoint-path>`.
<br>
The [strip listen path]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#listenpath" >}}) option in the API definition is provided to remove the *listen path* from the upstream request; this allows differentiation between the publicly exposed API and private upstream API, for example to provide a cleaner, user-friendly facade to a legacy upstream service.
{{< /note >}}

### Versioning identifier

If [URL path versioning]({{< ref "product-stack/tyk-gateway/advanced-configurations/api-versioning/api-versioning#request-url-path" >}}) is in use for an API, Tyk will perform a match of the first fragment after the *listen path* to identify which version of the API should be invoked.

### Endpoint path

The remainder of the *request path* after any version identifier is considered to be the *endpoint path* (which may be simply `/`). When performing a match against endpoints configured in the API definition, Tyk treats the configured patterns as regular expressions, allowing advanced users to perform complex endpoint path matching by use of regexes in their API definitions.


## Pattern matching 

Tyk supports a wide range of patterns when defining *listen path* and *endpoint paths* in API definitions, through the interpretation of the configured pattern as a regular expression during the matching operation. It's easiest to consider three categories of patterns of increasing complexity:

### 1. **Basic matching**

Basic path matching involves the direct comparison of a path against a fixed pattern, for example setting the *listen path* pattern to `/users`.

### 2. **Dynamic path parameter matching**

The use of path parameters in the pattern allow for dynamic segments in requests, commonly used for dynamic routing. This is particularly useful for APIs where resource identifiers or user-specific endpoints need to be handled.

For example, the pattern `/users/{id}` would match any URL of the form `/users/123`, where `123` is treated as a dynamic segment.

Tyk converts dynamic path segments in the configured pattern into capturing groups in the regular expression (`([^/]+)`)as follows (note that these examples include the `^` and `$` that are added when [exact matching](#exact-match) is in use):

|   | **Path pattern**                   | **Regular Expression used in match** |
|---|------------------------------------|--------------------------------------|
| 1 | `/users/{id}`                      | `^/users/([^/]+)$`                   |
| 2 | `/static/{path}/assets/{file}`     | `^/static/([^/]+)/assets/[^/]+)$`    |
| 3 | `/orders/{orderId}/items/{itemId}` | `^/orders/([^/]+)/items/([^/]+)$`    |
| 4 | `/orders/{orderId}/items/{itemId}` | `^/orders/([^/]+)/items/([^/]+)$`    |

1. Matches `/users/123`, where `id` is dynamic.
2. Matches `/static/images/assets/logo.png`, where `path` and `file` are dynamic.
3. Matches `/orders/456/items/789`, where `orderId` and `itemId` are dynamic.
4. Matches `/orders/456/items/789`, where `orderId` and `itemId` are dynamic.

You can replace any dynamic path segment with a `*` (wildcard) (or `{*}` in older versions) to take advantage of unnamed parameters, for example: taking example (3) from above, you can define the pattern as `/orders/*/items/*` and Tyk will interpret this as the same regular expression (`^/orders/([^/]+)/items/([^/]+)$`).

### 3. **Advanced pattern matching**

Advanced pattern matching involves the use of more complex regular expressions in the configured patterns, enabling developers to define granular rules that handle varied use cases such as versioning, optional parameters, and multiple route patterns.

You can include regular expressions as dynamic path segments in the *listen path* pattern. Tyk will automatically convert these into capturing groups as follows (note that these examples include the `^` and `$` that are added when [exact matching](#exact-match) is in use):

|   | **Listen path pattern**                      | **Regular Expression used in match**      |
|---|----------------------------------------------|-------------------------------------------|
| 1 | `/users/{id}/profile/{type:[a-zA-Z]+}`       | `^/users/([^/]+)/profile/([a-zA-Z]+)$`    |
| 2 | `/items/{itemID:[0-9]+}/details/{detail}`    | `^/items/([0-9]+)/details/([^/]+)$`       |
| 3 | `/products/{productId}/reviews/{rating:\d+}` | `^/products/([^/]+)/reviews/(\d+)$`       |

1. Matches paths where `id` is dynamic, and `type` only includes alphabetic characters.
2. Matches paths like `/items/45/details/overview`, where `itemID` is a number and `detail` is dynamic.
3. Matches paths like `/products/987/reviews/5`, where `productId` is dynamic and `rating` must be a digit.

With *endpoint path* patterns, however, the logic is more limited. The conversion will be as follows, matching any path segment but not using the regular expression defined in the named parameter (again note that these examples include the `^` and `$` that are added when [exact matching](#exact-match) is in use):

|   | **User Input**                               | **Converted Regular Expression**     |
|---|----------------------------------------------|--------------------------------------|
| 1 | `/users/{id}/profile/{type:[a-zA-Z]+}`       | `^/users/([^/]+)/profile/([^/]+)$`    |
| 2 | `/items/{itemID:[0-9]+}/details/{detail}`    | `^/items/([^/]+)/details/([^/]+)$`    |
| 3 | `/products/{productId}/reviews/{rating:\d+}` | `^/products/([^/]+)/reviews/([^/]+)$` |

##### Example - ULID validation for a route

For a non-trivial example of regex pattern matching, one can configure a
complex expression to match [ULID](https://github.com/ulid/spec) values:

- `^/users/(?i)[0-7][0-9A-HJKMNP-TV-Z]{25}$`
- [Go playground test example](https://go.dev/play/p/nlLUQmVxKsp)
- Using `(?i)` makes the particular matching case-insensitive

The explicit behavior of the pattern match is to match the pattern by
prefix all the way to the end of the defined pattern.

The input has full go regex (RE2) support. See
[pkg.go.dev/regexp](https://pkg.go.dev/regexp) for details.


## Path matching modes

Tyk Gateway can be configured to perform path matching in one of four modes:

- [wildcard](#wildcard-match) which matches the pattern to any part of the path
- [prefix](#prefix-match) which matches the pattern against the start of the path
- [suffix](#suffix-match) which matches the pattern against the end of the path
- [exact](#exact-match) which combines prefix and suffix matches

This configuration can be set in the Gateway config file (`tyk.conf`) or using the equivalent environment variables, as described below.

The default behavior of Tyk Gateway is *wildcard* matching as both prefix and suffix controls default to `false`; the introduction of these controls does not change the behavior of any existing API definitions unless either is set to `true` to enforce a different path matching mode.

**Tyk recommends the use of exact path matching with [strict routes](#listen-path) for most use cases**

### Wildcard match

If neither [prefix](#prefix-match) nor [suffix](#suffix-match) configuration options is set to `true`, Tyk will perform wildcard matching. In this mode, Tyk will attempt to match the pattern with any part of the URL path.

For example, the pattern `/user` will match all of the following URLs:

- `/my-api/user`
- `/my-api/users`
- `/my-api/v2/user/12345`
- `/my-api/groups/12/username/abc`

### Prefix match

When [TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHSUFFIXMATCHING]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_path_prefix_matching" >}}) is enabled, the Gateway switches to prefix matching where it treats the configured pattern as a prefix which will only match against the beginning of the path. For example, a pattern such as `/json` will only match request URLs that begin with `/json`, rather than matching any URL containing `/json`.

The gateway checks the request URL against several variations depending on whether path versioning is enabled:

- Full path (listen path + version + endpoint): `/listen-path/v4/json`
- Non-versioned full path (listen path + endpoint): `/listen-path/json`
- Path without version (endpoint only): `/json`

The logic behind prefix matching is that it prepends the start of string symbol (`^`) if the URL begins with a `/`, to ensure that the URL begins with the specified pattern. For example, `/json` would be evaluated as `^/json`.

For patterns that already start with `^`, the gateway will already perform prefix matching so `TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHSUFFIXMATCHING` will have no impact.

This option allows for more specific and controlled routing of API requests, potentially reducing unintended matches. Note that you may need to adjust existing route definitions when enabling this option.

Example:

- with wildcard matching, `/json` might match `/api/v1/data/json`.
- with prefix matching, `/json` would not match `/api/v1/data/json`, but would match `/json/data`.

### Suffix match

When [TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHSUFFIXMATCHING]({{< ref "tyk-oss-gateway/configuration#http_server_optionsenable_path_suffix_matching" >}}) is enabled, the Gateway switches to suffix matching where it treats the configured pattern as a suffix which will only match against the end of the path. For example, a pattern such as `/json` will only match request URLs that end with `/json`, rather than matching any URL containing `/json`.

The gateway checks the request URL against several variations depending on whether path versioning is enabled:
- Full path (listen path + version + endpoint): `/listen-path/v4/json`
- Non-versioned full path (listen path + endpoint): `/listen-path/json`
- Path without version (endpoint only): `/json`

The logic behind prefix matching is that it appends the end of string symbol (`$`), to ensure that the URL ends with the specified pattern. For example, `/json` would be evaluated as `/json$`.

For patterns that already end with `$`, the gateway will already perform suffix matching so `TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHSUFFIXMATCHING` will have no impact.

This option allows for more specific and controlled routing of API requests, potentially reducing unintended matches. Note that you may need to adjust existing route definitions when enabling this option.

Example:

- with wildcard matching, `/json` might match `/api/v1/json/data`.
- with suffic matching, `/json` would not match `/api/v1/json/data`, but would match `/data/json`.

### Exact match

Exact URL path matching combines [prefix](#prefix-match) and [suffix](#suffix-match) matching, to ensure that the URL exactly matches the required pattern.

For example, enabling both flags would result in `/json` being treated as `^/json$`, ensuring the URL exactly matches `/json` with no additional characters before or after it. This allows matching against any of the matching paths explicitly:

- `/listen-path/v4/json` - targeting API by listen path and version
- `/v4/json` - only targeting the version for any API
- `/json` - only targeting the endpoint

When we consider that keys and policies may apply access rights over multiple APIs, exact matching allows for fine-grained access policies targeting individual APIs, versions or endpoints.

### Overriding the configured matching mode

The Gateway-wide configuration of prefix and/or suffix matching can be overridden for an API or endpoint by manual addition of the control characters (`^` and `$`) or by omission of the `/` prefix from the pattern as follows:

- if you include `^` at the start of the listen path/endpoint definition the Gateway will apply prefix matching when checking against this pattern
- if you include `$` at the end of the listen path/endpoint definition the Gateway will apply prefix matching when checking against this pattern
- if you omit the leading `/` from the listen path/endpoint definition then *prefix* matching will *not* be applied even if set in the Gateway config

Note that if suffix matching is configured in the Gateway config this cannot be overridden using control characters in the pattern, though wildcard matches can be achieved by defining a full regular expression that starts with `^/` and ends with a `$`

##### Summary of the effect of control characters with Gateway settings

The following table indicates the matching that will be performed by the Gateway for different combinations of prefix and suffix modes with different patterns, demonstrating how the use of the `^` and `$` symbols in your *listen path* and *endpoint path* patterns will interact with the configured matching mode.

| Prefix mode | Suffix mode | Pattern | Effective matching mode |
|--------|--------|------|--------|
| ❌️ | ❌️ | `/my-api/my-endpoint/{my-param}` | wildcard |
| ✅  | ❌️ | `/my-api/my-endpoint/{my-param}` | prefix |
| ❌️ | ✅  | `/my-api/my-endpoint/{my-param}` | suffix |
| ✅  | ✅  | `/my-api/my-endpoint/{my-param}` | exact |
| ❌️ | ❌️ | `^/my-api/my-endpoint/{my-param}` | prefix |
| ✅  | ❌️ | `^/my-api/my-endpoint/{my-param}` | prefix |
| ❌️ | ✅  | `^/my-api/my-endpoint/{my-param}` | exact |
| ✅  | ✅  | `^/my-api/my-endpoint/{my-param}` | exact |
| ❌️ | ❌️ | `/my-api/my-endpoint/{my-param}$` | suffix |
| ✅  | ❌️ | `/my-api/my-endpoint/{my-param}$` | exact |
| ❌️ | ✅  | `/my-api/my-endpoint/{my-param}$` | suffix |
| ✅  | ❌️ | `/my-api/my-endpoint/{my-param}$` | exact |
| ❌️ | ❌️ | `^/my-api/my-endpoint/{my-param}$` | exact |
| ✅  | ❌️ | `^/my-api/my-endpoint/{my-param}$` | exact |
| ❌️ | ✅  | `^/my-api/my-endpoint/{my-param}$` | exact |
| ✅  | ✅  | `^/my-api/my-endpoint/{my-param}$` | exact |
| ❌️ | ❌️ | `my-api/my-endpoint/{my-param}` | wildcard |
| ✅  | ❌️ | `my-api/my-endpoint/{my-param}` | wildcard |
| ❌️ | ✅  | `my-api/my-endpoint/{my-param}` | suffix |
| ✅  | ✅  | `my-api/my-endpoint/{my-param}` | suffix |
| ❌️ | ❌️ | `/my-api/my-endpoint/*` | wildcard |
| ✅  | ❌️ | `/my-api/my-endpoint/*` | prefix |
| ❌️ | ✅  | `/my-api/my-endpoint/*` | wildcard |
| ✅  | ✅  | `/my-api/my-endpoint/*` | prefix |
| ❌️ | ❌️ | `my-api/my-endpoint/*` | wildcard |
| ✅  | ❌️ | `my-api/my-endpoint/*` | wildcard |
| ❌️ | ✅  | `my-api/my-endpoint/*` | wildcard |
| ✅  | ✅  | `my-api/my-endpoint/*` | wildcard |

## URL path matching without the Gateway configuration options

Gateway level configuration of URL path matching behavior was released in:

- Tyk Gateway 5.0.14
- Tyk Gateway 5.3.5
- Tyk Gateway 5.5.1

In those versions, we added support for named parameters to the granular access middleware, extending the regular expressions to a wider set of supported patterns.

Prior to these versions, path matching was done against the full request
path, `/listen-path/v4/json` in [wildcard](#wildcard-match) mode. To achieve prefix or
suffix matching in older versions, consider that the input is a regular
expression. Depending on your setup, you could use `[^/]+` for any of
the path segments or finer grained regular expressions.

- `^/[^/]+/v4/json$` - exact match for any listen path, `/v4/json` below
- `^/{listenPath}/{version}/json$`, exact match with named parameters
- `^/{*}/json`, prefix match (omits the `$`).

You can achieve a [prefix match](#prefix-match) for older versions by adding the listen
path to the URL, and using a regex such as `^/listen-path/users`. You might consider
using the ending `$` expression to achieve [exact matching](#exact-match).

{{< warning success >}}
**Warning**  

Misconfiguration is possible so special care should be taken to ensure
that your regular expressions are valid; an invalid regular expression
would have caused undesired behaviour in older versions.
{{< /warning >}}
