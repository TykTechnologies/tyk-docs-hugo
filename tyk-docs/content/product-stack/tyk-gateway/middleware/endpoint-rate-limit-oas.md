---
title: Using the Rate Limit Middleware with Tyk OAS APIs
date: 2024-07-18
description: "Using the per-endpoint rate limit middleware with Tyk OAS APIs"
tags: ["rate limit", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

The per-endpoint rate limit middleware allows you to enforce rate limits
on specific endpoints. This middleware is configured in the Tyk OAS API
Definition, either via the Tyk Dashboard API or in the API Designer.

## Configuring a Rate Limit in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the
`operationId` defined in the OpenAPI Document that declares both the path
and method for which the middleware should be added. Endpoint `paths`
entries (and the associated `operationId`) can contain wildcards in the
form of any string bracketed by curly braces, for example
`/status/{code}`. These wildcards are so they are human-readable and do
not translate to variable names. Under the hood, a wildcard translates to
the “match everything” regex of: `(.*)`.

The rate limit middleware can be added to the `operations` section of the
Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition
for the appropriate `operationId` (as configured in the `paths` section
of your OpenAPI Document).

The `rate_limit` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `rate`: the number of requests allowed
- `per`: the time period in seconds

#### Simple endpoint rate limit

For example:

~~~
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
                    "rate_limit": {
                        "enabled": true,
                        "rate": 60,
                        "per": 1
                    }
                }
            }
        }
    }
}
~~~

In this example Tyk OAS API definition, the rate limit has been
configured for the `GET /status/200` endpoint, limiting requests to 60
per second.

#### Advanced endpoint rate limit

For more complex scenarios, you can configure rate limits for multiple
paths. The order of evaluation matches the order defined in the
`rate_limit` array. For example, to limit POST requests to `/user/login`
to 100 requests per second and apply a regex pattern for other endpoints:

~~~
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
            "get": {
                "operationId": "anyget",
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
                    "rate_limit": {
                        "enabled": true,
                        "rate": 100,
                        "per": 1
                    }
                },
                "anyget": {
                    "rate_limit": {
                        "enabled": true,
                        "rate": 60,
                        "per": 1
                    }
                }
            }
        }
    }
}
~~~

In this advanced example, the first rule limits POST requests to
`/user/login` to 100 requests per second. Any other GET request matching
the regex pattern `/{any}` will be limited to 60 requests per second. The
order of evaluation ensures that the specific `/user/login` endpoint is
matched and evaluated before the regex pattern.
