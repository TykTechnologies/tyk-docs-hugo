---
title: Internal Looping
date: 2024-08-07
description: "Using the Response Header Transform middleware with Tyk Classic APIs"
tags: ["Internal Looping", "Tyk Operator", "internal looping","per-API", "Tyk Classic"]
---

In Tyk you target api's by `tyk://<API_ID>/<path>` scheme.
This requires prior knowledge of the *API_ID*. Since Tyk Operator treats API's as objects and manages them by assigning an `API_ID`, we introduce a typed API to refer to other APIs.

Tyk Operator will automatically generate the correct URL before sending it to the Gateway.


```yaml
---
# Dynamic Auth

# In this example, we have a bunch of legacy customers who authenticate with our service using Basic Authentication.
# We want to be able to support API Keys also, where both types of clients hit the same ingress.
# As such, Tyk needs to decide whether to perform Basic Authentication or Auth Token auth check.
#
# In order to achieve this, we need to configure 4 API Definitions inside Tyk.
# 1. EntryPoint API
# 2. BasicAuthInternal API
# 3. AuthTokenInternal API
# 4. ProxyInternal API
#
# When the request hits the ingress route, we configure a URL rewrite to pass the request to either the internal
# BasicAuth api or the AuthToken API.
# the internal APIs will then authenticate request, and assuming the happy path, proxy to the ProxyInternal API.
# The ProxyInternal API is responsible for proxying to the underlying service.
#
# It is worth noting that there are no actual http redirect happening here, meaning that there is no performance penalty
# in performing any of these "Internal Redirects".

apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: entrypoint-api
spec:
  name: Entrypoint API
  protocol: http
  active: true
  proxy:
    listen_path: /entry
    target_url: http://example.com
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/(.*)/(.*)"
              method: GET
              triggers:
                - "on": "all"
                  options:
                    header_matches:
                      "Authorization":
                        match_rx: "^Basic"
                  rewrite_to_internal:
                    target:
                      name: basic-auth-internal
                      namespace: default
                    path: "basic/$2"
                - "on": "all"
                  options:
                    header_matches:
                      "Authorization":
                        match_rx: "^Bearer"
                  rewrite_to_internal:
                    target:
                      name: auth-token-internal
                      namespace: default
                    path: "token/$2"
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: basic-auth-internal
spec:
  name: BasicAuth Internal API
  protocol: http
  proxy:
    listen_path: "/basic"
    target_url: http://example.com
  active: true
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/basic/(.*)"
              method: GET
              rewrite_to_internal:
                target:
                  name: proxy-api
                  namespace: default
                path: proxy/$1
          transform_headers:
            - add_headers:
                x-transform-api: "basic-auth"
              method: GET
              path: "/{id}"
              delete_headers: []
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: auth-token-internal
spec:
  name: AuthToken Internal API
  protocol: http
  proxy:
    listen_path: "/token"
    target_url: http://example.com
  active: true
  use_keyless: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        extended_paths:
          url_rewrites:
            - path: "/{id}"
              match_pattern: "/token/(.*)"
              method: GET
              rewrite_to_internal:
                target:
                  name: proxy-api
                  namespace: default
                path: proxy/$1
          transform_headers:
            - add_headers:
                x-transform-api: "token-auth"
              method: GET
              path: "/{id}"
              delete_headers: []
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: proxy-api
spec:
  name: Proxy API
  protocol: http
  active: true
  internal: true
  proxy:
    listen_path: "/proxy"
    target_url: http://httpbin.org
    strip_listen_path: true
  use_keyless: true
---
```


## URL Rewriting

A `rewrite_to_internal` field is used to target other api resources.

```yaml
rewrite_to_internal:
  description: RewriteToInternal defines options that constructs a url that refers to an api that is loaded into the gateway.
  properties:
    path:
      description: "Path path on target , this does not include query parameters. \texample /myendpoint"
      type: string
    query:
      description: "Query url query string to add to target \texample check_limits=true"
      type: string
    target:
      description: API a namespaced/name to the api definition resource that you are targetting
      properties:
        name:
          type: string
        namespace:
          type: string
      required:
      - name
      - namespace
``` 

usage 

```yaml
url_rewrites:
  - path: "/{id}"
    match_pattern: "/basic/(.*)"
    method: GET
    rewrite_to_internal:
      target:
        name: proxy-api
        namespace: default
      path: proxy/$1
```

This api is targeting an ApiDefinition resource `proxy-api` in `default` namespace. The operator will take care of transforming this into something like this

```yaml
url_rewrites:
- match_pattern: /basic/(.*)
  method: GET
  path: /{id}
  rewrite_to: tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1
```

# URL Rewriting triggers

A `rewrite_to_internal` used to target other api resources in `triggers`.
For example

```yaml
triggers:
  - "on": "all"
    options:
      header_matches:
        "Authorization":
          match_rx: "^Basic"
    rewrite_to_internal:
      target:
        name: basic-auth-internal
        namespace: default
      path: "basic/$2"
```
The operator  transform that into something like this

```yaml
triggers:
- "on": all
  options:
    header_matches:
      Authorization:
        match_rx: ^Basic
  rewrite_to: tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/basic/$2
```

# Proxy to internal apis

A `target_internal` field on `proxy` object is used to target other api resources. This field properties are the same as the ones described for `rewrite_to_internal`.
