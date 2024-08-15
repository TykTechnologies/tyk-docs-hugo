---
title: Internal Looping
date: 2024-08-07
description: "Using the Response Header Transform middleware with Tyk Classic APIs"
tags: ["Internal Looping", "Tyk Operator", "internal looping","per-API", "Tyk Classic"]
---

Tyk Operator simplifies the management and transformation of API traffic within Kubernetes environments. The concept of [Internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) allows you to use URL Rewriting to redirect your URL to another API endpoint or to another API in the Gateway. This reduces latency since the redirection is handled internally within Tyk avoiding an external network request.

In Tyk, looping is generally targeted using the `tyk://<API_ID>/<path>` scheme, which requires prior knowledge of the `API_ID`. Tyk Operator abstracts this by treating APIs as objects, managing them and dynamically assigning `API_ID`s. Typed APIs enable you to refer to other APIs without explicitly knowing their `API_ID`s.

With Tyk Operator, these URLs are automatically generated, enabling efficient inter-API communication without manual intervention.

<!-- 
For more detailed configuration examples, refer to the [Full Sample File](../../config/samples/looping/dynamic_auth.yaml).
-->

## URL Rewriting

Tyk Operator has a powerful feature that enables dynamic URL Rewriting for API requests. This configuration allows you to redirect incoming requests to different internal API endpoints managed by the Tyk Gateway, facilitating seamless interaction between various services and enhancing the modularity of your API infrastructure.

### Configuration

The `rewrite_to_internal` object is used to define how incoming API requests should be redirected to internal API resources. This mechanism is essential for routing traffic within a microservices architecture or when managing APIs across different namespaces in Kubernetes. Using this object you can effectively manage and optimize API traffic within your Tyk Gateway.

This setup supports complex routing scenarios and enables efficient inter-service communication, via configuring the following properties:

- **Path**: The `path` property specifies the endpoint on the target API where the request should be directed. This is the portion of the URL that follows the domain and is crucial for ensuring that the request reaches the correct resource. For example, setting a value of `"/myendpoint"` means that the request will be forwarded to the `/myendpoint` path on the target API.

- **Query**: The `query` property allows you to append additional query parameters to the target URL. These parameters can be used to modify the behavior of the target API or to pass along specific request information. For instance, setting `query: "check_limits=true"` will include this query string in the redirected request, potentially triggering special handling by the target API.

- **Target**: The `target` property identifies the API resource to which the request should be routed. It consists of two components: `name` and `namespace`. The `name` is the identifier of the target API, while the `namespace` specifies the Kubernetes namespace where the API resource resides. Together, these elements ensure that Tyk Operator accurately locates and routes the request to the intended API. For example, `name: "proxy-api"` and `namespace: "default"` direct the request to the `proxy-api` resource in the `default` namespace.

The schema for the `rewrite_to_internal` configuration object is summarised below:

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

### Example

An example configuration for URL rewriting is listed below that uses `rewrite_to_internal` to redirect the request to another API in the Gateway:

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

In this example the `rewrite_to_internal` object targets an `ApiDefinition` resource named `proxy-api` in the `default` namespace. The `path` is configured as `proxy/$1`. Tyk Operator will use this to automatically generate a URL to target a request to the `proxy-api` API in the `default` namespace:

```yaml
url_rewrites:
- match_pattern: /basic/(.*)
  method: GET
  path: /{id}
  rewrite_to: tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1
```

The `rewrite_to` field is generated by Tyk Operator as `tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/$1` where `ZGVmYXVsdC9wcm94eS1hcGk` represents the API ID for the `proxy-api` API resource in the `default` namespace. Notice that path `proxy/$1` is appended to the base URL `tyk://ZGVmYXVsdC9wcm94eS1hcGk` and contains the context variable `$1`. This will be substituted with the value of `{id}` in the path configuration parameter.

Subsequently, in this example an incoming `GET` request to `/basic/456` will be matched by the `match_pattern` rule `/basic/(.*)`. The `456` part of the URL is captured and replaces `{id}` in the path field. The request will then be redirected to URL `tyk://ZGVmYXVsdC9wcm94eS1hcGk/proxy/456` obtained from the `rewrite_to` field that Tyk Operator generated for us, with the context variable `$1` substituted with the `456`.

Triggers
Triggers in Tyk Operator are configurations that specify actions based on certain conditions. These conditions can be HTTP headers, query parameters, or other request attributes. Triggers are essential for executing specific actions when particular criteria are met, such as modifying requests, logging, or rewriting URLs.

Use Case for Triggers
Triggers are used to automate actions based on real-time data received in requests. For example, you might use triggers to:

Redirect users based on their authentication status.
Modify headers for security or compliance reasons.
Enforce business rules by redirecting requests based on certain parameters.

Triggers Configuration Example
Here’s how to configure a trigger that rewrites a URL based on the presence of a specific HTTP header:

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

The Operator will transform this into:

```yaml
triggers:
- "on": all
  options:
    header_matches:
      Authorization:
        match_rx: ^Basic
  rewrite_to: tyk://ZGVmYXVsdC9iYXNpYy1hdXRoLWludGVybmFs/basic/$2
```

Proxy to Internal APIs
The proxy object’s target_internal field references other API resources. This field shares the same properties as those described for rewrite_to_internal, ensuring consistent configuration.
