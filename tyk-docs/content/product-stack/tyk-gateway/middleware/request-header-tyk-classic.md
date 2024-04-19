---
title: Using the Request Header Transform with Tyk Classic APIs
date: 2024-01-20
description: "Using the Request Header Transform middleware with Tyk Classic APIs"
tags: ["Request Header Transform", "middleware", "per-endpoint","per-API", "Tyk Classic"]
---

Tyk's [request header transform]({{< ref "transform-traffic/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas" >}}) page.

## Configuring the Request Header Transform in the Tyk Classic API Definition

The API-level and endpoint-level request header transforms have a common configuration but are configured in different sections of the API definition.

#### API-level transform

To **append** headers to all requests to your API (i.e. for all endpoints) you must add a new `global_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to requests.

To **delete** headers from all requests to your API, you must add a new `global_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from requests.

For example:
```json  {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "version_data": {
        "versions": {
            "Default": {
                "global_headers": {
                    "X-Static": "foobar",
                    "X-Request-ID":"$tyk_context.request_id",
                    "X-User-ID": "$tyk_meta.uid"
                },
                "global_headers_remove": [
                    "Auth_Id"
                ]
            }
        }
    },
}
```

This configuration will add three new headers to each request:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

It will also delete one header (if present) from each request:
- `Auth_Id`

#### Endpoint-level transform

To configure a transformation of the request header for a specific endpoint you must add a new `transform_headers` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `delete_headers`: A list of the headers that should be deleted from the request
- `add_headers`: A list of headers, in key:value pairs, that should be added to the request

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json
{
    "transform_headers": [
        {
            "path": "status/200",
            "method": "GET",
            "delete_headers": ["X-Static"],
            "add_headers": {"X-Secret": "the-secret-key-is-secret"}
        }
    ]
}
```

In this example the Request Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any request received to that endpoint will have the `X-Static` header removed and the `X-Secret` header added, with the value set to `the-secret-key-is-secret`.

#### Combining API-level and Endpoint-level transforms

If the API-level transform in the previous [example]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Secret`

and to remove one:
- `Auth_Id` 

## Configuring the Request Header Transform in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request header transform middleware for your Tyk Classic API by following these steps.

### API-level transform

Configuring the API-level request header transform middleware is very simple when using the Tyk Dashboard.

In the Endpoint Designer you should select the **Global Version Settings** and ensure that you have selected the **Request Headers** tab:

{{< img src="/img/2.10/global_settings_modify_headers.png" alt="Global version settings" >}}

Note that you must click **ADD** to add a header to the list (for appending or deletion).

### Endpoint-level transform

##### Step 1: Add an endpoint for the path and select the Header Transform plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Modify Headers** plugin.

{{< img src="/img/2.10/modify_headers.png" alt="Endpoint designer" >}}

##### Step 2: Select the "Request" tab

This ensures that this will only be applied to inbound requests.

{{< img src="/img/2.10/modify_headers1.png" alt="Request tab" >}}

##### Step 3: Declare the headers to be modified

Select the headers to delete and insert using the provided fields. You need to click **ADD** to ensure they are added to the list.

{{< img src="/img/2.10/modify_headers2.png" alt="Header transforms" >}}

##### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.


