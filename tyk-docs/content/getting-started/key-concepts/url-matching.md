# URL Matching Explained

This document explains how user inputs are converted into regular
expressions for URL matching. The conversion is crucial for routing and
matching patterns within URLs in our system. We have grouped the patterns
into three logical sections: Basic Path Matching, Named Route Parameters,
and Advanced Pattern Matching. These sections highlight the transformation
process and the flexibility of named route parameters.

## Errata

The following documentation applies to 5.3.5 or 5.6.0 or later releases.

The behaviour or url matching before these versions was in essence a
wildcard match. If the pattern `/user` was provided, it would effectively
match `.*/user.*`, also matching deeper URLs. This may have lead to
misconfigurations where a more permissive pattern was in effect than what
was actually intended.

Previous versions did not match mux-style parameter paths as documented
below. Mux supports named parameters, which are typically also documented
in OpenAPI schemas as such, and while the gateway supported named
parameters in areas like listen path and api endpoints, URL matching was
historically just implemented as the wildcard match described above.

---

## 1. Basic Path Matching

This section covers straightforward path matching without any dynamic
parameters. These are useful for static routes where the path does not
change.

| **User Input**    | **Converted Regular Expression**                | **Description**                                      |
|-------------------|-------------------------------------------------|------------------------------------------------------|
| `/users`:         | `^/users`                                       | Matches paths that start with `/users`.              |
| `users`:          | `^.*users`                                      | Matches any path containing the string `users`.      |
| `/users$`:        | `^/users$`                                      | Matches request paths exactly equalling `/users`. |
| `/users/.*`:      | `^/users/.*`                                    | Matches any path that starts with `/users/` and can have anything after it. |

Please see errata for recent behaviour changes.

The input has full go regex (RE2) support.

For a demonstation, if user input provides a pattern like `/users*.`, it
will be converted to `^/users*.`, nothing is appended or amended within
the provided input and the regular expression remains as is.

The pattern is a bit complex however as it can match:

- `/users` (not matching, missing `.`)
- `/users/`
- `/usera` (`s*` matches any number of s, including 0, `.` matches `a`)
- `/userssssb` (`s*` is greedy, still need a `b` to match `.`)

This only serves for regexp demonstration purposes, and the regular
expression is a bit exaggerated for this purpose demonstrating a fairly
complex ruleset one can express.

---

## 2. Named Route Parameters

Named route parameters allow for dynamic segments in paths, where
specific parts can be variable and populated from the OpenAPI
definitions. These parameters are commonly used in APIs and dynamic
routing.

| **User Input**                          | **Converted Regular Expression**                             | **Description**                                      |
|-----------------------------------------|--------------------------------------------------------------|------------------------------------------------------|
| `/users/{id}`                           | `^/users/(?P<v0>[^/]+)`                                      | Matches paths like `/users/123`, where `id` is dynamic. |
| `/static/{path}/assets/{file}`          | `^/static/(?P<v0>[^/]+)/assets/(?P<v1>[^/]+)`                | Matches paths like `/static/images/assets/logo.png`, where `path` and `file` are dynamic. |
| `/orders/{orderId}/items/{itemId}`      | `^/orders/(?P<v0>[^/]+)/items/(?P<v1>[^/]+)`                 | Matches paths like `/orders/456/items/789`, where `orderId` and `itemId` are dynamic. |

> **Note:** The `{id}`, `{path}`, `{file}`, `{orderId}`, and `{itemId}` in the
> user input correspond to dynamic path segments that are converted into named
> capturing groups in the regular expression (`(?P<v0>...)`, `(?P<v1>...)`).

---

## 3. Advanced Pattern Matching

This section demonstrates more advanced pattern matching, which includes
complex named route parameters, wildcard characters, and specific segment
constraints.

| **User Input**                              | **Converted Regular Expression**                                | **Description**                                      |
|---------------------------------------------|-----------------------------------------------------------------|------------------------------------------------------|
| `/users/{id}/profile/{type:[a-zA-Z]+}`      | `^/users/(?P<v0>[^/]+)/profile/(?P<v1>[a-zA-Z]+)`              | Matches paths where `id` is dynamic, and `type` only includes alphabetic characters. |
| `/items/{itemID:[0-9]+}/details/{detail}`   | `^/items/(?P<v0>[0-9]+)/details/(?P<v1>[^/]+)`                 | Matches paths like `/items/45/details/overview`, where `itemID` is a number and `detail` is dynamic. |
| `/products/{productId}/reviews/{rating:\d+}`| `^/products/(?P<v0>[^/]+)/reviews/(?P<v1>\d+)$`                | Matches paths like `/products/987/reviews/5`, where `productId` is dynamic and `rating` must be a digit. |

---

## Usage

URL matching as described above is used in (TODO: collecting references for backlinks):

- Granular access middlware
- Per endpoint rate limits
- ...
