---
title: Using the URL Rewrite middleware with Tyk OAS APIs
date: 2024-01-17
description: "Using the URL Rewrite middleware with Tyk OAS APIs"
tags: ["URL rewrite", "middleware", "per-endpoint", "Tyk OAS"]
---

Tyk's [URL rewriter]({{< ref "transform-traffic/url-rewriting" >}}) uses the concepts of triggers and rules to determine if the request (target) URL should be modified. These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

URL rewrite triggers and rules are explained in detail [here]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

When working with Tyk OAS APIs the rules and triggers are configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}); this can be done manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you're using the legacy Tyk Classic APIs, then check out [this]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic" >}}) page.

## Configuring the URL rewriter in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The URl rewrite middleware can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

### Using the basic trigger

For the **basic trigger**, you only need to enable the middleware (set `enabled:true`) and then configure the `pattern` and the `rewriteTo` (target) URL. The design of the Tyk OAS API Definition takes advantage of the `operationID` defined in the OpenAPI Document that declares both the path and method required by the basic trigger.

```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
  "info": {
    "title": "example-url-rewrite",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/example-url-rewrite/"
    }
  ],
  "security": [],
  "paths": {
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-url-rewrite",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "operations": {
        "jsonget": {
          "urlRewrite": {
            "enabled": true,
            "pattern": "/(\\w+)/(\\w+)",
            "rewriteTo": "anything?value1=$1&value2=$2"
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-url-rewrite/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```

In this example the basic trigger has been configured to match the path for a request to the `GET /json` endpoint against the regex `/(\w+)/(\w+)`. This is looking for two word groups in the path (after the API listen path) which, if found, will store the first string in context variable `$1` and the second in `$2`. The request (target) URL will then be rewritten to `anything?value1=$1&value2=$2`.

If you send a request to `GET http://localhost:8181/example-url-rewrite/json/hello`

```bash  {hl_lines=["1"],linenos=true, linenostart=1}
GET /example-url-rewrite/json/hello HTTP/1.1
User-Agent: PostmanRuntime/7.36.3
Accept: */*
Postman-Token: 1a84a792-f0c4-4c40-932a-795485cdd252
Host: localhost:8181
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

The URL rewrite middleware will match the pattern:
`/json/hello` -> `/(\w+)/(\w+)` -> `$1` will take the value `json` and `$2` will take the value `hello`

It will then rewrite the target URL to `/anything?value1=json&value2=hello` and `httpbin.org` will respond with:

```bash  {hl_lines=["13-16", "31"],linenos=true, linenostart=1}
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Length: 536
Content-Type: application/json
Date: Mon, 18 Mar 2024 17:37:40 GMT
Server: gunicorn/19.9.0
X-Ratelimit-Limit: 0
X-Ratelimit-Remaining: 0
X-Ratelimit-Reset: 0
 
{
"args": {
"value1": "json",
"value2": "hello"
},
"data": "",
"files": {},
"form": {},
"headers": {
"Accept": "*/*",
"Accept-Encoding": "gzip, deflate, br",
"Host": "httpbin.org",
"Postman-Token": "1a84a792-f0c4-4c40-932a-795485cdd252",
"User-Agent": "PostmanRuntime/7.36.3",
"X-Amzn-Trace-Id": "Root=1-65f87be4-18c50d554886f46f6b73d42b"
},
"json": null,
"method": "GET",
"origin": "::1, 85.9.213.196",
"url": "http://httpbin.org/anything?value1=json&value2=hello"
}
```
The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the URL rewrite middleware.

### Using advanced triggers

You can add **advanced triggers** to your URL rewriter configuration by adding the `triggers` element within the `urlRewrite` middleware configuration for the operation.

The `triggers` element is an array, with one entry per advanced trigger. For each of those triggers you configure:
- `condition` to set the logical condition to be applied to the rules (`any` or `all`)
- `rules` a list of rules for the trigger
- `rewriteTo` the address to which the (target) URL should be rewritten if the trigger fires

The rules are defined using this format:
```yaml
{
    "in": key_location,
    "name": key_name,
    "pattern": pattern,
    "negate": true/false //set to true to trigger if pattern does not match
}
```

Key locations are encoded as follows:
- `header` - request header parameter
- `query` - query parameter
- `path` - path parameter (i.e. components of the path itself)
- `sessionMetadata` - session metadata
- `requestBody`- request body
- `requestContext`- request context

For example:

```json {hl_lines=["31-67"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-url-rewrite2",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/json": {
            "get": {
                "operationId": "jsonget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "components": {},   
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-url-rewrite2",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "middleware": {
            "operations": {
                "jsonget": {
                    "urlRewrite": {
                        "enabled": true,
                        "pattern": "/(\\w+)/(\\w+)",
                        "rewriteTo": "anything?value1=$1&value2=$2",
                        "triggers": [
                            {
                                "condition": "all",
                                "rewriteTo": "anything?value1=$1&query=$tyk_context.trigger-0-numBytes-0",
                                "rules": [
                                    {
                                        "in": "query",
                                        "pattern": "[0-9]+",
                                        "negate": false,
                                        "name": "numBytes"
                                    },
                                    {
                                        "in": "header",
                                        "pattern": "true",
                                        "negate": true,
                                        "name": "x-bytes"
                                    }
                                ]
                            },
                            {
                                "condition": "any",
                                "rewriteTo": "bytes/$tyk_context.trigger-1-numBytes-0",
                                "rules": [
                                    {
                                        "in": "query",
                                        "pattern": "[0-9]+",
                                        "negate": false,
                                        "name": "numBytes"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-url-rewrite2/"
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        } 
    }
}
```
In this example, the basic trigger is configured as before, but two advanced triggers have been added.

The first advanced trigger will fire if the request has this configuration:
- query parameter `numBytes` is provided with a numeric value, AND
- header parameter `x-bytes` is *not* set to `true` (note that `negate` is set to `true` in this rule)

Such a request will be redirected to `/anything` passing two query parameters
- `value1` with the first string matched in the basic trigger (i.e. `json`)
- `query` with the value provided in the `numBytes` query parameter

The second advanced trigger will fire if the first doesn't and if this condition is met:
- query parameter `numBytes` is provided with a numeric value

Such a request will be redirected to `/bytes/{numBytes}`, which will return `numBytes` random bytes from `httpbin.org`.

If neither advanced trigger fires, then the basic trigger will redirect the request to `/anything?value1=json&value2=hello` as before.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the URL rewrite middleware.

## Configuring the URL rewriter in the API Designer

Adding and configuring the URL rewrite feature to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the URL Rewrite middleware

Select **ADD MIDDLEWARE** and choose the **URL Rewrite** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-add-url-rewrite.png" alt="Adding the URL Rewrite middleware" >}}

#### Step 3: Configure the basic trigger

Add the match pattern and the new URL to configure the basic trigger rule.

{{< img src="/img/dashboard/api-designer/tyk-oas-url-rewrite-basic.png" alt="Configuring the rewrite rule for the Basic Trigger" >}}

#### Step 4: Optionally configure advanced triggers

You can optionally apply advanced triggers by selecting **ADD TRIGGER** for each trigger you wish to configure. For each advanced trigger you can add one or more rules, selecting **ADD RULE** to add the second, third, etc.

{{< img src="/img/dashboard/api-designer/tyk-oas-url-rewrite-advanced.png" alt="Configuring the rewrite rules for Advanced Triggers" >}}

#### Step 5: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.
