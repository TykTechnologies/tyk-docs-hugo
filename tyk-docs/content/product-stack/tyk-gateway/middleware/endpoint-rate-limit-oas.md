---
title: Using the Rate Limit middleware with Tyk OAS APIs
date: 2024-07-18
description: "Using the per-endpoint rate limit middleware with Tyk OAS APIs"
tags: ["rate limit", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

The per-endpoint rate limit middleware allows you to enforce rate limits
on specific endpoints. This middleware is configured in the [Tyk OAS API
Definition](https://tyk.io/docs/tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc/#operation), either via the Tyk Dashboard API or in the API Designer.

## Configuring a rate limit in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the
`operationId` defined in the OpenAPI Document that declares both the path
and method for which the middleware should be added. Endpoint `paths`
entries (and the associated `operationId`) can contain wildcards in the
form of any string bracketed by curly braces, for example
`/status/{code}`. These wildcards are so they are human-readable and do
not translate to variable names. Under the hood, a wildcard translates to
the “match everything” regex of: `(.*)`.

The rate limit middleware (`rateLimit`) can be added to the `operations` section of the
Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition
for the appropriate `operationId` (as configured in the `paths` section
of your OpenAPI Document).

The `rateLimit` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `rate`: the maximum number of requests that will be permitted during the interval (window)
- `per`: the length of the interval (window) in time duration notation (e.g. 10s)

#### Simple endpoint rate limit

For example:

```json {hl_lines=["39-43"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-rate-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-rate-limit",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-rate-limit/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 60,
                        "per": "1s"
                    }
                }
            }
        }
    }
}

In this example, a rate limit has been
configured for the `GET /status/200` endpoint, limiting requests to 60
per second.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Per-endpoint Rate Limiter middleware.
#### Advanced endpoint rate limit

For more complex scenarios, you can configure rate limits for multiple
paths. The order of evaluation matches the order that endpoints are defined in the
`paths` section of the OpenAPI description. For example, if you wanted to limit the rate of `POST` requests to your API allowing a higher rate to one specific endpoint you could configure the API definition as follows: 

```json {hl_lines=["47-51", "54-58"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "advanced-rate-limit",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/user/login": {
            "post": {
                "operationId": "user/loginget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/{any}": {
            "post": {
                "operationId": "anypost",
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
            "name": "advanced-rate-limit",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/advanced-rate-limit/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "user/loginget": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 100,
                        "per": "1s"
                    }
                },
                "anypost": {
                    "rateLimit": {
                        "enabled": true,
                        "rate": 60,
                        "per": "1s"
                    }
                }
            }
        }
    }
}
~~~

In this example, the first rule limits requests to the
`POST /user/login` endpoint to 100 requests per second (rps). Any other `POST` request to an endpoint path that matches
the regex pattern `/{any}` will be limited to 60 rps. The
order of evaluation ensures that the specific `POST /user/login` endpoint is
matched and evaluated before the regex pattern.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Per-endpoint Rate Limiter middleware.
