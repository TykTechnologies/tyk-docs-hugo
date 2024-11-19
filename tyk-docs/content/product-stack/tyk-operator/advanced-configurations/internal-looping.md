---
title: Internal Looping
date: 2024-08-07
description: "Using internal looping with Tyk Operator"
tags: ["Internal Looping", "Tyk Operator", "internal looping","per-API", "Tyk Classic"]
---

The concept of [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) allows you to use URL Rewriting to redirect your URL to *another API endpoint* or to *another API* in the Gateway. In Tyk, looping is generally targeted using the `tyk://<API_ID>/<path>` scheme, which requires prior knowledge of the `API_ID`. Tyk Operator simplifies the management and transformation of API traffic within Kubernetes environments by abstracting APIs as objects, managing them and dynamically assigning `API_ID`s by its Kubernetes metedata name and namespace.

---

## Configuring looping to internal ApiDefinition resources

Looping can be configured within Tyk Operator for [URL Rewrites](#url-rewrites), [URL Rewrite Triggers](#url-rewrite-triggers) and [Proxy to internal APIs](#proxy-to-internal-apis) by configuring the `rewrite_to_internal` in `url_rewrite`, `rewrite_to_internal` in `triggers`, and `proxy.target_internal` fields respectively with these properties:

- **Path**: The `path` property specifies the endpoint on the target API where the request should be directed. This is the portion of the URL that follows the domain and is crucial for ensuring that the request reaches the correct resource. For example, setting a value of `"/myendpoint"` means that the request will be forwarded to the `/myendpoint` path on the target API.

- **Query**: The `query` property allows you to append additional query parameters to the target URL. These parameters can be used to modify the behavior of the target API or to pass along specific request information. For instance, setting `query: "check_limits=true"` will include this query string in the redirected request, potentially triggering special handling by the target API.

- **Target**: The `target` property identifies the API resource to which the request should be routed. It consists of two components: `name` and `namespace`. The `name` is the identifier of the target API, while the `namespace` specifies the Kubernetes namespace where the API resource resides. Together, these elements ensure that Tyk Operator accurately locates and routes the request to the intended API. For example, `name: "proxy-api"` and `namespace: "default"` direct the request to the `proxy-api` resource in the `default` namespace.

Tyk Operator would dynamically update the API definition by generating internal looping URL in the form of `tyk://<API_ID>/<path>`. This mechanism is essential for routing traffic within a microservices architecture or when managing APIs across different namespaces in Kubernetes. Using this object you can effectively manage and optimize API traffic within your Tyk Gateway.

---

## URL Rewrites {#url-rewrites}

[URL rewriting]({{< ref "transform-traffic/url-rewriting" >}}) in Tyk enables the alteration of incoming API request paths to align with the expected endpoint format of your backend services.

Assume that we wish to redirect incoming `GET /basic/` requests to an API defined by an ApiDefinition object named `proxy-api` in the `default` namespace. We want the `/basic/` prefix to be stripped from the request path and the redirected path should be of the format `/proxy/$1`, where the context variable `$1` is substituted with the remainder of the path request. For example `GET /basic/456` should become `GET /proxy/456`.

In this case we can use a `rewrite_to_internal` object to instruct Tyk Operator to automatically generate the API rewrite URL on our behalf for the API identified by name `proxy-api` in the `default` namespace:

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

In the above example an incoming request of `/basic/456` would be matched by the `match_pattern` rule `/basic/(.*)` for `GET` requests specified in the `method` field. The `456` part of the URL will be captured and replaces `{id}` in the `path` field. Tyk Operator will use the `rewrite_to_internal` configuration to generate the URL rewrite for the API named `proxy-api` in the `default` namespace, and update the `rewrite_to` field accordingly:

```yaml
url_rewrites:
- match_pattern: /basic/(.*)
  method: GET
  path: /{id}
  rewrite_to: tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1
```

Here we can see that the `rewrite_to` field has been generated with the value `tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1` where `ZGVmYXVsdC9wcm94eS1hcGk` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice also that path `proxy/$1` is appended to the base URL `tyk://ZGVmYXVsdC9wcm94eS1hcGk` and contains the context variable `$1`. This will be substituted with the value of `{id}` in the `path` configuration parameter.

## URL Rewrite Triggers {#url-rewrite-triggers}

[Triggers]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-triggers" >}}) are configurations that specify actions based on certain conditions present in HTTP headers, query parameters, path parameters etc.

Triggers are essential for executing specific actions when particular criteria are met, such as rewriting URLs. They are useful for automating actions based on real-time data received in requests. For example, you might use triggers to:

- Redirect users to different APIs in the Gateway based on their authentication status.
- Enforce business rules by redirecting requests to different APIs in the Gateway based on certain parameters.

The process for configuring internal looping in triggers to is similar to that explained in section [URL Rewrites](#url-rewrites).

Assume that we wish to instruct Tyk Operator to redirect all *Basic Authentication* requests to the API identified by `basic-auth-internal` within the `default` namespace. Subsequently, we can use a `rewrite_to_internal` object as follows:

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

Here we we can see that a trigger is configured for all requests that include an `Authorization` header containing `Basic` in the header value.

A `rewrite_to_internal` configuration object is used to instruct Tyk Operator to generate a redirect to the API identified by the `basic-auth-internal` API resource in the `default` namespace. The redirect path will be prefixed with `basic`. For example, a basic authentication request to path `/` will be redirected to `/basic/`.

Tyk Operator will automatically generate a URL Rewrite (`rewrite_to`) to redirect the request to the API identified by `basic-auth-internal` within the `default` namespace as follows:

```yaml
triggers:
- "on": all
  options:
    header_matches:
      Authorization:
        match_rx: ^Basic
  rewrite_to: tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/basic/$2
```

Here we can see that the `rewrite_to` field has been generated with the value `tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/proxy/$1` where `ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice also that path `basic/$2` is appended to the base URL `tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs` and contains the context variable `$2`. This will be substituted with the remainder of the request path.

## Proxy to Internal APIs {#proxy-to-internal-apis}

Internal looping can also be used for [proxying to internal APIs]({{< ref "advanced-configuration/transform-traffic/looping" >}}).

Assume that we wish to redirect all incoming requests on listen path `/users` to an API defined by an ApiDefinition object named `users-internal-api` in the `default` namespace.

In this case we can use a `proxy.target_internal` field to instruct Tyk Operator to automatically generate the target URL on our behalf for the API identified by name `users-internal-api` in the `default` namespace:

```yaml {linenos=true, linenostart=1, hl_lines=["12-15"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: users
spec:
  name: Users API
  protocol: http
  active: true
  use_keyless: true
  proxy:
    target_url: ""
    target_internal:
      target:
        name: users-internal-api
        namespace: default
    listen_path: /users
    strip_listen_path: true
```

The proxy object’s `target_internal` field references other API resources. This field shares the same properties as those described for `rewrite_to_internal`, ensuring consistent configuration.

Tyk Operator will automatically generate the target URL to redirect the request to the API identified by `users-internal-api` within the `default` namespace as follows:

```yaml
  target_url: "tyk://ZGVmYXVsdC91c2Vycy1pbnRlcm5hbC1hcGk"
```

---

## Example

Assume a business has legacy customers who authenticate with a service using *Basic Authentication*. The business also wants to support API Keys, enabling both client types to access the same ingress.

To facilitate this, Tyk must be configured for dynamic authentication, accommodating both *Basic Authentication* and *Auth Token* methods.

This setup requires configuring four API Definitions within Tyk:

1. Entry Point API
2. BasicAuth Internal API
3. AuthToken Internal API
4. Proxy Internal API

When a request arrives at the ingress route, a URL rewrite can direct it to either the *BasicAuth Internal* or *AuthToken Internal* API, depending on the authentication method used.

These internal APIs will authenticate the requests. Assuming successful authentication (the happy path), they will forward the requests to the *Proxy Internal API*, which handles the proxying to the underlying service.

</br>

{{< note success >}}
**Note**

There are no actual HTTP redirects in this scenario, meaning that there is no performance penalty in performing any of these *Internal Redirects*.

{{< /note >}}

### Entry Point API

The *Entry Point* API is the first point of entry for a client request. It inspects the header to determine if the incoming client request requires authentication using *Basic Authentication* or *Auth Token*. Consequently, it then redirects the request to the *BasicAuth Internal* or *AuthToken Internal* API depending upon the header included in the client request.

The API definition resource for the *Entry Point* API is listed below. It is configured to listen for requests on the `/entry` path and forward requests upstream to `http://example.com`

We can see that there is a URL Rewrite rule (`url_rewrites`) with two triggers configured to match Basic Authentication and Auth Token requests:

- **Basic Authentication trigger**: Activated for incoming client requests that include an *Authorization* header containing a value starting with *Basic*. In this case a `rewrite_to_internal` configuration object is used to instruct Tyk Operator to redirect the request to the *BasicAuthInternal* API, identified by name `basic-auth-internal` in the `default` namespace. The request URL is rewritten, modifying the path to `/basic/<path>`.
- **Auth Token trigger**: Activated for incoming client requests that include an *Authorization* header containing a value starting with *Bearer*. In this case a `rewrite_to_internal` configuration object is used to instruct Tyk Operator to redirect the request to the *AuthTokenInternal* API, identified by name `auth-token-internal` in the `default` namespace. The request URL is rewritten, modifying the path to `/token/<path>`.

 ```yaml {linenos=true, linenostart=1, hl_lines=["21-45"]}
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
```

### BasicAuth Internal API

The *BasicAuth Internal* API listens to requests on path `/basic` and forwards them upstream to `http://example.com`.

The API is configured with a URL rewrite rule in `url_rewrites` to redirect incoming `GET /basic/` requests to the API in the Gateway represented by name `proxy-api` in the `default` namespace. The `/basic/` prefix will be stripped from the request URL and the URL will be rewritten with the format `/proxy/$1`. The context variable `$1` is substituted with the remainder of the path request. For example `GET /basic/456` will become `GET /proxy/456`.

Furthermore, a header transform rule is configured within `transform_headers` to add the header `x-transform-api` with value `basic-auth`, to the request.

```yaml {linenos=true, linenostart=1, hl_lines=["21-35"]}
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
```

### AuthToken Internal API

The *AuthToken Internal* API listens to requests on path `/token` and forwards them upstream to `http://example.com`.

The API is configured with a URL rewrite rule in `url_rewrites` to redirect incoming `GET /token/` requests to the API in the Gateway represented by name `proxy-api` in the `default` namespace. The `/token/` prefix will be stripped from the request URL and the URL will be rewritten to the format `/proxy/$1`. The context variable `$1` is substituted with the remainder of the path request. For example `GET /token/456` will become `GET /proxy/456`.

Furthermore, a header transform rule is configured within `transform_headers` to add the header `x-transform-api` with value `token-auth`, to the request.

```yaml {linenos=true, linenostart=1, hl_lines=["21-35"]}
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
```

### Proxy Internal API

The *Proxy Internal* API is keyless and responsible for listening to requests on path `/proxy` and forwarding upstream to `http://httpbin.org`. The listen path is stripped from the request before it is sent upstream.

This API receives requests forwarded from the internal *AuthToken Internal* and *BasicAuth Internal APIs*. Requests will contain the header `x-transform-api` with value `token-auth` or `basic-auth`, depending upon which internal API the request originated from.

```yaml {linenos=true, linenostart=1, hl_lines=["10-13"]}
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
```