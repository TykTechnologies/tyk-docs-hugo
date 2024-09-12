---
title: Using the Do-Not-Track middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Do-Not-Track middleware with Tyk Classic APIs"
tags: ["do-not-track", "endpoint tracking", "analytics", "transaction logging", "middleware", "per-endpoint", "per-API", "Tyk Classic"]
---

The [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) middleware provides the facility to disable generation of transaction records (which are used to track requests) at the API or endpoint level.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition either manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

You can prevent tracking for all endpoints of an API by configuring the `do_not_track` field in the root of your API definition.
- `true`: no transaction logs will be generated for requests to the API
- `false`: transaction logs will be generated for requests to the API
 
If you want to be more granular and disable tracking only for selected endpoints, then you must add a new `do_not_track_endpoints` object to the `extended_paths` section of your API definition.

The `do_not_track_endpoints` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "do_not_track_endpoints": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET"
            }
        ]
    }
}
```

In this example the do-not-track middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will not generate transaction records from the Gateway and so will not appear in the analytics.

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the per-endpoint Do-Not-Track middleware for your Tyk Classic API by following these steps. Note that the API-level middleware can only be configured from the Raw Definition screen.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you do not want to generate records. Select the **Do not track endpoint** plugin.

{{< img src="img/gateway/middleware/classic_do_not_track.png" alt="Select the middleware" >}}

#### Step 2: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring the middleware in Tyk Operator is similar to that explained in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic).

It is possible to prevent tracking for all endpoints of an API by configuring the `do_not_track` field in the root of your API definition as follows:

- `true`: no transaction logs will be generated for requests to the API
- `false`: transaction logs will be generated for requests to the API

```yaml {linenos=true, linenostart=1, hl_lines=["10"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-do-not-track
spec:
  name: httpbin-do-not-track 
  use_keyless: true
  protocol: http
  active: true
  do_not_track: true
  proxy:
    target_url: http://example.com
    listen_path: /example
    strip_listen_path: true
```

If you want to disable tracking only for selected endpoints, then the process is similar to that defined in [configuring the middleware in the Tyk Classic API Definition](#tyk-classic), i.e. you must add a new `do_not_track_endpoints` list to the extended_paths section of your API definition.
This should contain a list of objects representing each endpoint `path` and `method` that should have tracking disabled:

```yaml {linenos=true, linenostart=1, hl_lines=["31-33"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-endpoint-tracking
spec:
  name: httpbin - Endpoint Track
  use_keyless: true
  protocol: http
  active: true
  do_not_track: false
  proxy:
    target_url: http://httpbin.org/
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          track_endpoints:
            - method: GET
              path: "/get"
          do_not_track_endpoints:
            - method: GET
              path: "/headers"
```

In the example above we can see that the `do_not_track_endpoints` list is configured so that requests to `GET /headers` will have tracking disabled.
