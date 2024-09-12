---
title: URL matching in Tyk
tags:
    - URL matching
    - Regular expressions
    - Granular access
    - Allow requests
    - Block requests
    - Mock responses
    - Secure access
    - Middleware
    - Routing
description: Overview of URL matching with the Tyk Gateway
date: "2024-08-30"
---

This document aims to explain the underlying mechanism by which user
inputs are converted into regular expressions for URL matching.
Understanding this process is crucial because it directly impacts how
URLs are routed and matched within our system, influencing both API
behavior and security controls.

URL matching defines the rules for how incoming URLs are compared to
predefined patterns, determining whether they should trigger certain
routes, middleware, or security policies. This is especially important
for developers configuring APIs and middleware to control which endpoints
are exposed, restricted, or protected.

### Why URL Matching Matters

When configuring APIs, precise URL matching helps developers:

1. **Control Access to Endpoints**: By using strict or flexible URL matching patterns, you can fine-tune which routes are exposed to users or external systems.
2. **Simplify Routing Logic**: Instead of defining individual routes for each endpoint, URL matching lets you group similar routes using patterns, reducing complexity.
3. **Enhance Security**: Properly defined URL matching patterns are essential for enforcing security policies, like blocking or allowing access to specific resources.

URL matching is fundamental to many components of the system, including:

- [Securing APIs by Method and Path](https://tyk.io/docs/security/security-policies/secure-apis-method-path/)
- [Allow List Middleware](https://tyk.io/docs/product-stack/tyk-gateway/middleware/allow-list-middleware/)
- [Block List Middleware](https://tyk.io/docs/product-stack/tyk-gateway/middleware/block-list-middleware/)
- [Request and Response Middleware](https://tyk.io/docs/advanced-configuration/transform-traffic/)

Some components, like [URL Rewriting](https://tyk.io/docs/transform-traffic/url-rewriting/),
implement regular expression matching only, and do not apply path matching logic.

### Pattern Matching Overview

We've divided URL matching into three logical categories:

#### 1. **Basic Path Matching**

Basic path matching involves the direct comparison of a URL against
predefined patterns. The system can operate in either wildcard or
prefix/suffix modes (explained further below), allowing for flexible or
strict matches based on the desired configuration.

#### 2. **Named Route Parameters**

Named parameters within routes allow for dynamic URL matching. For
example, a route like `/users/{id}` would match any URL of the form
`/users/123`, where `123` is treated as a dynamic segment. This is
particularly useful for APIs where resource identifiers or user-specific
endpoints need to be handled. One can use `*` for an unnamed segment,
for example `/users/*/info`.

#### 3. **Advanced Pattern Matching**

Advanced matching supports more complex regular expressions, enabling
developers to define granular rules that handle varied use cases like
versioning, optional parameters, and multiple route patterns.

### Configuration Parameters for Matching Behavior

Several configuration flags are available to control URL matching
behavior. Here's a detailed explanation of how these flags influence
matching:

#### `EnablePathPrefixMatching`

By enabling this flag, URL matching switches from a wildcard mode to
prefix matching. This means that a URL pattern like `/json` is
interpreted as a prefix, matching any URL that starts with `/json`. In
prefix mode, the system will perform matches as follows:

- regular expression `^/json` will match against:
  - `/listen-path/v4/json`
  - `/v4/json`
  - `/json` (match)

The logic behind prefix matching is that it prepends the start of string
symbol (`^`) if the URL begins with a `/`, to ensure that the URL begins
with the specified path. For example, `/json` would be evaluated as
`^/json`. If you're aiming for exact matches, you can combine this with
the suffix matching option (see below).

#### `EnablePathSuffixMatching`

This flag adjusts the behavior to match URLs by their suffix. When suffix
matching is enabled, a pattern like `/json` is treated as ending with a
`$` symbol, ensuring that it only matches URLs that terminate in `/json`.
Example matches include:

- regular expression `/json$` will match:
  - `/listen-path/v4/json` (match)
  - `/v4/json`
  - `/json`

If the input pattern already ends with `$` (e.g., `/json$`), the system
will not modify it, treating it as a strict match for URLs that end
precisely with the provided pattern.

#### Combining Prefix and Suffix Matching

For exact URL matching, you can combine both prefix and suffix matching.
For example, enabling both flags would result in `/json` being matched as
`^/json$`, ensuring the URL exactly matches `/json` with no additional
characters before or after it. This allows matching against any of the
matching paths explicitly:

- `/listen-path/v4/json` - targeting API by listen path and version,
- `/v4/json` - only targeting the version, any API
- `/json` - only targeting the endpoint

When we consider that keys and policies may apply access rights over
multiple APIs, exact matching allows for fine-grained access policies
targeting individual APIs, versions or endpoints.

---

### Practical Use Cases for URL Matching

Understanding these behaviors is essential in scenarios where:

- **API Versioning**: You may want to allow different versions of an API, like `/v1/users` and `/v2/users`, while still matching certain common paths or endpoints.
- **Middleware Control**: Middleware often relies on URL matching to determine when specific behaviors, like rate limiting or authentication, should be applied.
- **Security Policies**: URL matching ensures that security policies, such as allow or block lists, are enforced for the correct paths without mistakenly leaving critical routes unprotected.

By fine-tuning these configurations, developers can create robust,
secure, and maintainable routing rules tailored to their specific use
cases.

### Migration notes

Configuration of URL matching behaviour was released on:

- 5.0.14
- 5.3.5
- 5.5.1
- 5.6.0

In those versions, granular access middleware adds support for named
parameters, extending the regular expressions to a wider set of supported
patterns.

Before these versions, the matching is done against the full request
path, `/listen-path/v4/json` in wildcard mode. To achieve prefix or
suffix matching in older versions, consider that the input is a regular
expression. Depending on your setup, you could use the `[^/]+` for any of
the path segments or finer grained regular expressions.

- `^/[^/]+/v4/json$` - exact match for any listen path, `/v4/json` below
- `^/{listenPath}/{version}/json$`, exact match with named parameters
- `^/{*}/json`, prefix match (omits the `$`).

To achieve a prefix match for older versions, you must add the listen
path to the url, and use a regex as `^/listen-path/users`, and consider
using the ending `$` expression to achieve exact matches. Wildcard
matches, if desired, are still available in recent versions, by either
omitting the `/` prefix in the input URL, or by defining a full regular
expression that starts with `^/` and ends with a `$`.

Misconfiguration is possible so special care should be taken to ensure
that your regular expressions are valid; an invalid regular expression
would have caused undesired behaviour in older versions.

### Advanced examples

#### ULID validation for a route

For a non-trivial example of regex pattern matching, one can configure a
complex expression to match [ULID](https://github.com/ulid/spec) values:

- `^/users/(?i)[0-7][0-9A-HJKMNP-TV-Z]{25}$`
- [Go playground test example](https://go.dev/play/p/nlLUQmVxKsp)
- Using `(?i)` makes the particular matching case-insensitive

The explicit behaviour of the pattern match is to match the pattern by
prefix all the way to the end of the defined pattern.

The input has full go regex (RE2) support. See
[pkg.go.dev/regexp](https://pkg.go.dev/regexp) for details.

---

#### Named And Unnamed Route Parameters

Named route parameters allow for dynamic segments in paths, where
specific parts can be variable and populated from the OpenAPI
definitions. These parameters are commonly used in APIs and dynamic
routing.

| **User Input**                     | **Converted Regular Expression** |
|------------------------------------|----------------------------------|
| `/users/{id}`                      | `^/users/([^/]+)`                |
| `/static/{path}/assets/{file}`     | `^/static/([^/]+)/assets/[^/]+)` |
| `/orders/{orderId}/items/{itemId}` | `^/orders/([^/]+)/items/([^/]+)` |
| `/orders/{orderId}/items/{itemId}` | `^/orders/([^/]+)/items/([^/]+)` |

1. Matches paths like `/users/123`, where `id` is dynamic.
2. Matches paths like `/static/images/assets/logo.png`, where `path` and `file` are dynamic.
3. Matches paths like `/orders/456/items/789`, where `orderId` and `itemId` are dynamic.
4. Matches paths like `/orders/456/items/789`, where `orderId` and `itemId` are dynamic.

> **Note:** The `{id}`, `{path}`, `{file}`, `{orderId}`, and `{itemId}` in the
> user input correspond to dynamic path segments that are converted into capturing
> groups in the regular expression (`([^/]+)`).

To take advantage of unnamed parameters, you may replace any dynamic path
segment with a `*` (wildcard), or `{*}` in older versions.

| **User Input**       | **Converted Regular Expression** |
|----------------------|----------------------------------|
| `/users/*`           | `^/users/([^/]+)`                |
| `/static/*/assets/*` | `^/static/([^/]+)/assets/[^/]+)` |
| `/orders/*/items/*`  | `^/orders/([^/]+)/items/([^/]+)` |
| `/orders/*/items/*`  | `^/orders/([^/]+)/items/([^/]+)` |

---

#### Advanced Pattern Matching

Named parameters support specifying a regular expression to match. This
is in use with API listen paths and endpoints.

| **User Input**                               | **Converted Regular Expression**      |
|----------------------------------------------|---------------------------------------|
| `/users/{id}/profile/{type:[a-zA-Z]+}`       | `^/users/([^/]+)/profile/([a-zA-Z]+)` |
| `/items/{itemID:[0-9]+}/details/{detail}`    | `^/items/([0-9]+)/details/([^/]+)`    |
| `/products/{productId}/reviews/{rating:\d+}` | `^/products/([^/]+)/reviews/(\d+)`    |

1. Matches paths where `id` is dynamic, and `type` only includes alphabetic characters.
2. Matches paths like `/items/45/details/overview`, where `itemID` is a number and `detail` is dynamic.
3. Matches paths like `/products/987/reviews/5`, where `productId` is dynamic and `rating` must be a digit.

Patterns like these only work on listen paths and endpoints.

In URL matching for the purposes as described above, the regular
expressions will be as follows, matching any path segment, but not using
the regular expression defined in the named parameter.

| **User Input**                               | **Converted Regular Expression**     |
|----------------------------------------------|--------------------------------------|
| `/users/{id}/profile/{type:[a-zA-Z]+}`       | `^/users/([^/]+)/profile/([^/]+)`    |
| `/items/{itemID:[0-9]+}/details/{detail}`    | `^/items/([^/]+)/details/([^/]+)`    |
| `/products/{productId}/reviews/{rating:\d+}` | `^/products/([^/]+)/reviews/([^/]+)` |
