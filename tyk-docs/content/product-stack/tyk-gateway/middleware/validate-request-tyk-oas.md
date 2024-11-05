---
title: Using the Request Validation middleware with Tyk OAS APIs
date: 2024-02-02
description: "Using the Request Validation middleware with Tyk OAS APIs"
tags: ["request validation", "validate request", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

The [request validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) middleware provides a way to validate the presence, correctness and conformity of HTTP requests to make sure they meet the expected format required by the upstream API endpoints. If the incoming request fails validation, the Tyk Gateway will reject the request with an `HTTP 422 Unprocessable Entity` response. Tyk can be [configured](#configuring-the-request-validation-middleware) to return a different HTTP status code if required. 

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) page.

## Request schema in OpenAPI Specification

The OpenAPI Specification supports the definition of a [schema](https://learn.openapis.org/specification/content.html#the-schema-object) to describe and limit the content of any field in an API request or response.

Tyk's request validation middleware automatically parses the schema for the request in the OpenAPI description part of the Tyk OAS API Definition and uses this to compare against the incoming request.

An OpenAPI schema can reference other schemas defined elsewhere, letting you write complex validations very efficiently since you don’t need to re-define the validation for a particular object every time you wish to refer to it. Tyk only supports local references to schemas (within the same OpenAPI document).

As explained in the OpenAPI [documentation](https://learn.openapis.org/specification/parameters.html), the structure of an API request is described by two components:
- parameters (headers, query parameters, path parameters)
- request body (payload)

### Request parameters

The `parameters` field in the OpenAPI description is an array of [parameter objects](https://swagger.io/docs/specification/describing-parameters/) that each describe one variable element in the request. Each `parameter` has two mandatory fields:
- `in`: the location of the parameter (`path`, `query`, `header`)
- `name`: a unique identifier within that location (i.e. no duplicate header names for a given operation/endpoint)

There are also optional `description` and `required` fields.

For each parameter, a schema can be declared that defines the `type` of data that can be stored (e.g. `boolean`, `string`) and any `example` or `default` values. 

#### Operation (endpoint-level) parameters

An operation is a combination of HTTP method and path or, as Tyk calls it, an endpoint - for example `GET /users`. Operation, or endpoint-level parameters can be defined in the OpenAPI description and will apply only to that operation within the API. These can be added or modified within Tyk Dashboard's [API designer](#configuring-the-middleware-in-the-api-designer).

#### Common (path-level) parameters

[Common parameters](https://swagger.io/docs/specification/v3_0/describing-parameters/#common-parameters), that apply to all operations within a path, can be defined at the path level within the OpenAPI description. Tyk refers to these as path-level parameters and displays them as read-only fields in the Dashboard's API designer. If you need to add or modify common parameters you must use the *Raw Definition* editor, or edit your OpenAPI document outside Tyk and [update]({{< ref "/getting-started/using-oas-definitions/update-an-oas-api" >}}) the API.

### Request body

The `requestBody` field in the OpenAPI description is a [Request Body Object](https://swagger.io/docs/specification/describing-request-body/). This has two optional fields (`description` and `required`) plus the `content` section which allows you to define a schema for the expected payload. Different schemas can be declared for different media types that are identified by content-type (e.g. `application/json`, `application/xml` and `text/plain`).

## Configuring the request validation middleware

When working with Tyk OAS APIs, the request validation middleware automatically determines the validation rules based on the API schema. The only configurable option for the middleware is to set the desired HTTP status code that will be returned if a request fails validation. The default response will be `HTTP 422 Unprocessable Entity` unless otherwise configured.

## Enabling the request validation middleware

If the middleware is enabled for an endpoint, then Tyk will automatically validate requests made to that endpoint against the schema defined in the API definition.

When you create a Tyk OAS API by importing your OpenAPI description, you can instruct Tyk to enable request validation [automatically](#automatically-enabling-the-request-validation-middleware) for all endpoints with defined schemas.

If you are creating your API without import, or if you only want to enable request validation for some endpoints, you can [manually enable](#manually-enabling-the-request-validation-middleware) the middleware in the Tyk OAS API definition.

### Automatically enabling the request validation middleware

The request validation middleware can be enabled for all endpoints that have defined schemas when [importing]({{< ref "getting-started/using-oas-definitions/import-an-oas-api#tutorial-5-create-an-api-that-validates-the-request-payload" >}}) an OpenAPI Document to create a Tyk OAS API.
- if you are using the `POST /apis/oas/import` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) or [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}) then you can do this by setting the `validateRequest=true` query parameter
- if you are using the API Designer, select the **Auto-generate middleware to validate requests** option on the **Import API** screen

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-import.png" alt="Select the option during OpenAPI import to validate requests" >}}

As noted, the automatic application of request validation during import will apply the middleware to all endpoints declared in your OpenAPI description. If you want to adjust this configuration, for example to remove validation from specific endpoints or to change the HTTP status code returned on error, you can update the Tyk OAS API definition as described [here](#manually-enabling-the-request-validation-middleware).

### Manually enabling the request validation middleware

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The request validation middleware (`validateRequest`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId`. The `operationId` for an endpoint can be found within the `paths` section of your [OpenAPI specification](https://swagger.io/docs/specification/paths-and-operations/?sbsearch=operationIds).

The `validateRequest` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `errorResponseCode`: [optional] the HTTP status code to be returned if validation fails (this defaults to `HTTP 422 Unprocessable Entity` if not set)

For example:
```json {hl_lines=["69-72"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-validate-request",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "parameters": [
                    {
                        "in": "header",
                        "name": "X-Security",
                        "required": true,
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],                
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "firstname": {
                                        "description": "The person's first name",
                                        "type": "string"
                                    },
                                    "lastname": {
                                        "description": "The person's last name",
                                        "type": "string"
                                    }
                                },
                            "type": "object"
                            }
                        }
                    }
                },
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
            "name": "example-validate-request",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-validate-request/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "validateRequest": {
                        "enabled": true,
                        "errorResponseCode": 400
                    }
                }
            }
        }
    }
}
```

In this example the request validation middleware has been configured for requests to the `GET /anything` endpoint. The middleware will check for the existence of a header named `X-Security` and the request body will be validated against the declared schema. If there is no match, the request will be rejected and Tyk will return `HTTP 400` (as configured in `errorResponseCode`).

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the request validation middleware.

## Configuring the middleware in the API Designer

Adding and configuring Request Validation for your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Validate Request middleware

Select **ADD MIDDLEWARE** and choose **Validate Request** from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request.png" alt="Adding the Validate Request middleware" >}}

The API Designer will show you the request body and request parameters schema detected in the OpenAPI description of the endpoint.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-added.png" alt="Validate Request middleware schema is automatically populated" >}}

#### Step 3: Configure the middleware

If required, you can select an alternative HTTP status code that will be returned if request validation fails.

{{< img src="/img/dashboard/api-designer/tyk-oas-validate-request-config.png" alt="Configuring the Request Validation error response" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.
