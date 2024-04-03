---
title: Using the Request Validation middleware with Tyk Classic APIs
date: 2024-02-02
description: "Using the Request Validation middleware with Tyk Classic APIs"
tags: ["request validation", "validate JSON", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
aliases:
  - /advanced-configuration/transform-traffic/validate-json
---

The [request validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints.

When working with legacy Tyk Classic APIs, request validation is performed by the `Validate JSON` middleware which can be enabled per-endpoint. The schema against which requests are compared is defined in the middleware configuration and is limited to the request body (payload). Request headers and path/query parameters cannot be validated when using Tyk Classic APIs.

This middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

To enable the middleware you must add a new `validate_json` object to the `extended_paths` section of your API definition.

The `validate_json` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `schema`: the [JSON schema](https://json-schema.org/understanding-json-schema/basics) against which the request body will be compared
- `error_response_code`: the HTTP status code that will be returned if validation fails (defaults to `422 Unprocessable Entity`)

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "validate_json": [
            {
                "disabled": false,
                "path": "/register",
                "method": "POST",
                "schema": {
                    "type": "object",
                    "properties": {
                        "firstname": {
                            "type": "string",
                            "description": "The person's first name"
                        },
                        "lastname": {
                            "type": "string",
                            "description": "The person's last name"
                        }
                    }
                },
                "error_response_code": 422
            }
        ]
    }
}
```

In this example the Validate JSON middleware has been configured for requests to the `POST /register` endpoint. For any call made to this endpoint, Tyk will compare the request body with the schema and, if it does not match, the request will be rejected with the error code `HTTP 422 Unprocessable Entity`.

{{< note success >}}

**Note**  

The Validate JSON middleware supports JSON Schema `draft-04`. Using another version will return an `unsupported schema error, unable to validate` error in the Tyk Gateway logs.

{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request validation middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to validate the request payload. Select the **Validate JSON** plugin.

{{< img src="/img/2.10/validate_json.png" alt="validate json plugin" >}}

#### Step 2: Configure the middleware

Once you have selected the request validation middleware for the endpoint, you can select an error code from the drop-down list (if you don't want to use the default `422 Unprocessable Entity`) and enter your JSON schema in the editor.

{{< img src="/img/dashboard/endpoint-designer/validate-json-schema.png" alt="Adding schema to the Validate JSON middleware" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
