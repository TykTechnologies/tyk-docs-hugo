---
title: URL matching in Tyk
date: 2024-08-30
tags:
  - URL matching
  - Regular expressions
  - Allow requests
  - Block requests
  - Mock responses
description: Overview of URL matching with the Tyk Gateway
---

This document explains how user inputs are converted into regular
expressions for URL matching. The conversion is crucial for routing and
matching patterns within URLs in our system. We have grouped the patterns
into three logical sections: Basic Path Matching, Named Route Parameters,
and Advanced Pattern Matching. These sections highlight the transformation
process and the flexibility of named route parameters.

## Usage

URL matching is used in:

- [Secure Your APIs by Method and Path](https://tyk.io/docs/security/security-policies/secure-apis-method-path/)
- [Allow List Middleware](https://tyk.io/docs/product-stack/tyk-gateway/middleware/allow-list-middleware/)
- [Block List Middleware](https://tyk.io/docs/product-stack/tyk-gateway/middleware/block-list-middleware/)
- [Mock Response for Tyk Classic](https://tyk.io/docs/product-stack/tyk-gateway/middleware/mock-response-tyk-classic/)

URL matching supports:

- Prefix based matching, the default if URL starts with `/`
- Wildcard based matching, if the URL doesn't start with `/`
- Explicit based matching, if you add `$` at the end of your URLs
- Named parameter matching, if you use `/users/{id}`
- Custom regular expressions, inline and as named parameters

The behaviour of the URL matching is to match the request by prefix. For
a path like `/json`, it means that the URL matching will not match
`/path/json`. However, `json` would. For more examples on how to
configure URLs, see documentation below.

### Migration notes

Before version 5.6.0 and LTS release 5.3.5, the implicit behaviour was a
wildcard match. If the URL defined was just `/json`, any path containing
that string would match. Additionally, the full request URL was matched.

To achieve a prefix match for older versions, you must add the listen path
to the url, and use a regex as `^/listen-path/users`, and consider using the
ending `$` expression to achieve prefix matches. Wildcard matches, if desired,
are still available in recent versions, by either omitting the `/` prefix
in the input URL, or by defining a full regular expression.

Misconfiguration is possible so special care should be taken to ensure
that your regular expressions are valid; an invalid regular expression
would have caused undesired behaviour in older versions.

## 1. Basic Path Matching

This section covers straightforward path matching without any dynamic
parameters. These are useful for static routes where the path does not
change.

| **User Input** | **Converted Regular Expression** | **Description**                                                             |
|----------------|----------------------------------|-----------------------------------------------------------------------------|
| `/users`:      | `^/users`                        | Matches paths that start with `/users`.                                     |
| `users`:       | `^.*users`                       | Matches any path containing the string `users`.                             |
| `/users$`:     | `^/users$`                       | Matches request paths exactly equalling `/users`.                           |
| `/users/.*`:   | `^/users/.*`                     | Matches any path that starts with `/users/` and can have anything after it. |

The input has full go regex (RE2) support. See
[pkg.go.dev/regexp](https://pkg.go.dev/regexp) for details.

For a non-trivial example of regex pattern matching, one can configure a
complex expression to match [ULID](https://github.com/ulid/spec) values.

- `/users/(?i)[0-7][0-9A-HJKMNP-TV-Z]{25}$`

The explicit behaviour of the pattern match is to match the pattern by
prefix all the way to the end of the defined pattern.

---

## 2. Named Route Parameters

Named route parameters allow for dynamic segments in paths, where
specific parts can be variable and populated from the OpenAPI
definitions. These parameters are commonly used in APIs and dynamic
routing.

| **User Input**                     | **Converted Regular Expression**              | **Description**                                                                           |
|------------------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `/users/{id}`                      | `^/users/(?P<v0>[^/]+)`                       | Matches paths like `/users/123`, where `id` is dynamic.                                   |
| `/static/{path}/assets/{file}`     | `^/static/(?P<v0>[^/]+)/assets/(?P<v1>[^/]+)` | Matches paths like `/static/images/assets/logo.png`, where `path` and `file` are dynamic. |
| `/orders/{orderId}/items/{itemId}` | `^/orders/(?P<v0>[^/]+)/items/(?P<v1>[^/]+)`  | Matches paths like `/orders/456/items/789`, where `orderId` and `itemId` are dynamic.     |

> **Note:** The `{id}`, `{path}`, `{file}`, `{orderId}`, and `{itemId}` in the
> user input correspond to dynamic path segments that are converted into named
> capturing groups in the regular expression (`(?P<v0>...)`, `(?P<v1>...)`).

---

## 3. Advanced Pattern Matching

This section demonstrates more advanced pattern matching, which includes
complex named route parameters, wildcard characters, and specific segment
constraints.

| **User Input**                               | **Converted Regular Expression**                  | **Description**                                                                                          |
|----------------------------------------------|---------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `/users/{id}/profile/{type:[a-zA-Z]+}`       | `^/users/(?P<v0>[^/]+)/profile/(?P<v1>[a-zA-Z]+)` | Matches paths where `id` is dynamic, and `type` only includes alphabetic characters.                     |
| `/items/{itemID:[0-9]+}/details/{detail}`    | `^/items/(?P<v0>[0-9]+)/details/(?P<v1>[^/]+)`    | Matches paths like `/items/45/details/overview`, where `itemID` is a number and `detail` is dynamic.     |
| `/products/{productId}/reviews/{rating:\d+}` | `^/products/(?P<v0>[^/]+)/reviews/(?P<v1>\d+)$`   | Matches paths like `/products/987/reviews/5`, where `productId` is dynamic and `rating` must be a digit. |

---
