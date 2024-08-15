---
title: Internal Looping
date: 2024-08-07
description: "Using the Response Header Transform middleware with Tyk Classic APIs"
tags: ["Internal Looping", "Tyk Operator", "internal looping","per-API", "Tyk Classic"]
---

Tyk Operator simplifies the management and transformation of API traffic within Kubernetes environments. The concept of [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) allows you to use URL Rewriting to redirect your URL to *another API endpoint* or to *another API* in the Gateway. This reduces latency since the redirection is handled internally within Tyk avoiding an external network request.

In Tyk, looping is generally targeted using the `tyk://<API_ID>/<path>` scheme, which requires prior knowledge of the `API_ID`. Tyk Operator abstracts this by treating APIs as objects, managing them and dynamically assigning `API_ID`s. Typed APIs enable you to refer to other APIs by name without explicitly knowing their `API_ID`s.

With Tyk Operator, looping URLs are automatically generated, enabling efficient inter-API communication without manual intervention.

## Configuration

Tyk Operator has a powerful feature that enables dynamic URL Rewriting for API requests. This configuration allows you to redirect incoming requests to different internal API endpoints managed by the Tyk Gateway, facilitating seamless interaction between various services and enhancing the modularity of your API infrastructure.

The `rewrite_to_internal` object is used to define how incoming API requests should be redirected to internal API resources. This mechanism is essential for routing traffic within a microservices architecture or when managing APIs across different namespaces in Kubernetes. Using this object you can effectively manage and optimize API traffic within your Tyk Gateway.

This setup supports complex routing scenarios and enables efficient inter-service communication, via configuring the following properties:

```yaml
rewrite_to_internal:
  description: RewriteToInternal defines options that construct a URL referring to an API loaded into the gateway.
  properties:
    path:
      description: "The path on the target, excluding query parameters. Example: /myendpoint"
      type: string
    query:
      description: "The query string to add to the target URL. Example: check_limits=true"
      type: string
    target:
      description: "The API resource being targeted, specified by namespace and name."
      properties:
        name:
          type: string
        namespace:
          type: string
      required:
      - name
      - namespace
```

- **Path**: The `path` property specifies the endpoint on the target API where the request should be directed. This is the portion of the URL that follows the domain and is crucial for ensuring that the request reaches the correct resource. For example, setting a value of `"/myendpoint"` means that the request will be forwarded to the `/myendpoint` path on the target API.

- **Query**: The `query` property allows you to append additional query parameters to the target URL. These parameters can be used to modify the behavior of the target API or to pass along specific request information. For instance, setting `query: "check_limits=true"` will include this query string in the redirected request, potentially triggering special handling by the target API.

- **Target**: The `target` property identifies the API resource to which the request should be routed. It consists of two components: `name` and `namespace`. The `name` is the identifier of the target API, while the `namespace` specifies the Kubernetes namespace where the API resource resides. Together, these elements ensure that Tyk Operator accurately locates and routes the request to the intended API. For example, `name: "proxy-api"` and `namespace: "default"` direct the request to the `proxy-api` resource in the `default` namespace.

## Examples

Looping can configured within Tyk Operator for [URL Rewrites](#url-rewrite-triggers), [URL Rewrite Triggers](#url-rewrite-triggers) and within a [Proxy](#proxy-to-internal-apis).

### URL Rewrites {#url-rewrites}

Assume that we wish to redirect incoming `GET /basic/` requests to the API in the Gateway represented by name `proxy-api` in the `default` namespace. We want the `/basic/` prefix to be stripped from the request path and the redirected path should be of the format `/proxy/$1`, where the context variable `$1` is substituted with the remainder of the path request. For example `GET /basic/456` should become `GET /proxy/456`.

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

In the above example an incoming request of `/basic/456` would be matched by the `match_pattern` rule `/basic/(.*)` for `GET` requests specified in the `method` field. The `456` part of the URL will be captured and replaces `{id}` in the `path` field. Tyk Operator will use the `rewrite_to_internal` configuration to generate the URL rewrite for the API named `proxy-api` in the `default` namespace:

```yaml
url_rewrites:
- match_pattern: /basic/(.*)
  method: GET
  path: /{id}
  rewrite_to: tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1
```

Here we can see that the `rewrite_to` field has been generated with the value `tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1` where `ZGVmYXVsdC9wcm94eS1hcGk` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice also that path `proxy/$1` is appended to the base URL `tyk://ZGVmYXVsdC9wcm94eS1hcGk` and contains the context variable `$1`. This will be substituted with the value of `{id}` in the `path` configuration parameter.

### URL Rewrite Triggers {#url-rewrite-triggers}

Triggers in Tyk Operator are configurations that specify actions based on certain conditions. These conditions can be based on:

- HTTP headers
- Query parameters
- Path parameters
- Session metadata
- Request body
- Request context

Triggers are essential for executing specific actions when particular criteria are met, such as modifying requests, logging or rewriting URLs. They are useful for automating actions based on real-time data received in requests. For example, you might use triggers to:

- Redirect users based on their authentication status.
- Modify headers for security or compliance reasons.
- Enforce business rules by redirecting requests based on certain parameters.

Assume that for all Basic Authentication requests we wish to instruct Tyk Operator to redirect to the API identified by `basic-auth-internal` within the `default` namespace. Subsequently, we can use a `rewrite_to_internal` object within the triggers configuration as follows:

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

In the example above we can see that a trigger is configured for all requests that include an `Authorization` header that contains `Basic` in the header value. A `rewrite_to_internal` configuration object is used to instruct Tyk Operator to generate a redirect to the API identified by the `basic-auth-internal` API resource in the `default` namespace. The redirect path will be prefixed with `basic`. For example, a basic authentication request to path `/` will be redirected to `/basic`.

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

### Proxy to Internal APIs {#proxy-to-internal-apis}

The proxy object’s `target_internal` field references other API resources. This field shares the same properties as those described for `rewrite_to_internal`, ensuring consistent configuration.
