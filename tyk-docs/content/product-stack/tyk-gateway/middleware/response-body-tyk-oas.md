---
title: Using the Response Body Transform middleware with Tyk OAS APIs
date: 2024-02-07
description: "Using the Response Body Transform middleware with Tyk OAS APIs"
tags: ["response transform", "body transform", "transform", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

The [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware provides a way to modify the payload of API responses before they are returned to the client.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The response body transformation middleware (`transformResponseBody`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `transformResponseBody` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `format`: the format of input data the parser should expect (either `xml` or `json`)
- `body`: [see note] this is a `base64` encoded representation of your template
- `path`: [see note] this is the path to the text file containing the template

{{< note success >}}
**Note**  

You should configure only one of `body` or `path` to indicate whether you are embedding the template within the middleware or storing it in a text file. The middleware will automatically select the correct source based on which of these fields you complete. If both are provided, then `body` will take precedence and `path` will be ignored.
{{< /note >}}

For example:
```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-body-transform",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "put": {
                "operationId": "anythingput",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-response-body-transform",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-body-transform/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingput": {
                    "transformResponseBody": {
                        "enabled": true,
                        "format": "json",
                        "body": "ewogICJ2YWx1ZTEiOiAie3sudmFsdWUyfX0iLAogICJ2YWx1ZTIiOiAie3sudmFsdWUxfX0iLAogICJyZXEtaGVhZGVyIjogInt7Ll90eWtfY29udGV4dC5oZWFkZXJzX1hfSGVhZGVyfX0iLAogICJyZXEtcGFyYW0iOiAie3suX3R5a19jb250ZXh0LnJlcXVlc3RfZGF0YS5wYXJhbX19Igp9"
                    }
                }
            }
        }
    }
}
```

In this example the response body transform middleware has been configured for requests to the `PUT /anything` endpoint. The `body` contains a base64 encoded Go template (which you can check by pasting the value into a service such as [base64decode.org](https://www.base64decode.org)).

Decoded, this template is:
```go
{
    "value1": "{{.value2}}",
    "value2": "{{.value1}}",
    "req-header": "{{._tyk_context.headers_X_Header}}",
    "req-param": "{{._tyk_context.request_data.param}}"
}
```

So if you make a request to `PUT /anything?param=foo`, configuring a header `X-Header`:`bar` and providing this payload:
```json
{
    "value1": "world",
    "value2": "hello"
}
```

httpbin.org will respond with the original payload in the response and, if you do not have the response body transform middleware enabled, the response from Tyk will include:
```json
{
    "value1": "world",
    "value2": "hello"
}
```

If, however, you enable the response body transform middleware, Tyk will modify the response to include this content:
```json
{
    "req-header": "bar",
    "req-param": "[foo]",
    "value1": "hello",
    "value2": "world"
}
```

You can see that Tyk has swapped `value1` and `value2` and embedded the `X-Header` header and `param` query values from the request into the body of the response.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

{{< note success >}}

**Note**  

If using a template in a file (i.e. you configure `path` in the `transformResponseBody` object), remember that Tyk will load and evaluate the template when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

## Configuring the middleware in the API Designer

Adding Response Body Transformation to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow the following steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Response Body Transform middleware

Select **ADD MIDDLEWARE** and choose the **Response Body Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-body.png" alt="Adding the Response Body Transform middleware" >}}

#### Step 3: Configure the middleware

Now you can select the response body format (JSON or XML) and add either a path to the file containing the template, or directly enter the transformation template in the text box.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-body-config.png" alt="Configuring the Response Body Transform middleware" >}}

The **Test with data** control will allow you to test your body transformation function by providing an example response body and generating the output from the transform. It is not possible to configure headers, other request parameters, context or session metadata to this template test so if you are using these data sources in your transform it will not provide a complete output, for example:

{{< img src="/img/dashboard/api-designer/tyk-oas-body-transform-test.png" alt="Testing the Response Body Transform" >}}

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.



