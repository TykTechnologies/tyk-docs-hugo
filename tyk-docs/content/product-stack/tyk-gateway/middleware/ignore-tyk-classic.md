---
title: Using the Ignore Authentication middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Ignore Authentication middleware with Tyk Classic APIs"
tags: ["ignore authentication", "ignore", "ignore auth", "authentication", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic APIs"]
---

The [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

To enable the middleware you must add a new `ignored` object to the `extended_paths` section of your API definition.

The `ignored` object has the following configuration:
- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: a shared object used to configure the [mock response]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#mock-response" >}}) middleware

The `method_actions` object should be configured as follows, with an entry created for each allowed method on the path:
- `action`: this should be set to `no_action`
- `code`: this should be set to `200`
- `headers` : this should be blank

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "ignored": [
            {
                "disabled": false,
                "path": "/status/200",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "no_action",
                        "code": 200,
                        "headers": {}
                    }          
                }
            }
        ]
    }
}
```

In this example the ignore authentication middleware has been configured for requests to the `GET /status/200` endpoint. Any such calls will skip the authentication step in the Tyk Gateway's processing chain.
- the middleware has been configured to be case sensitive, so calls to `GET /Status/200` will not skip authentication

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the Ignore Authentication middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to ignore authentication. Select the **Ignore** plugin.

{{< img src="/img/dashboard/endpoint-designer/ignore-authentication.png" alt="Adding the ignore authentication middleware to a Tyk Classic API endpoint" >}}

#### Step 2: Configure the middleware

Once you have selected the Ignore middleware for the endpoint, the only additional feature that you need to configure is whether to make it case-insensitive by selecting **Ignore Case**.

{{< img src="/img/2.10/ignore.png" alt="Ignore options" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
