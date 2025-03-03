---
title: "Tyk OAS API Definition"
date: 2025-01-10
tags: ["Gateway", "Configuration", "Tyk OAS", "Tyk OAS API Definition", "Tyk OAS API Definition Object",]
description: "How to configure Tyk OAS API Definition"
keywords: ["Gateway", "Configuration", "Tyk OAS", "Tyk OAS API Definition", "Tyk OAS API Definition Object",]
aliases:
  - /tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc
  - /getting-started/key-concepts/openapi-specification
  - /getting-started/key-concepts/oas-api-definitions
  - /getting-started/key-concepts/low-level-concepts
  - /getting-started/key-concepts/servers
  - /getting-started/key-concepts/authentication
  - /getting-started/key-concepts/paths
  - /getting-started/using-oas-definitions/oas-reference
  - /getting-started/using-oas-definitions/oas-glossary
---

## Introduction to Tyk OAS

Tyk has always had a proprietary specification for defining APIs. From Tyk v4.1 Tyk has supported API definitions that embed the [OpenAPI Specification v3.0.x](https://spec.openapis.org/oas/v3.0.3) (OAS) format, which can offer significant time and complexity savings if you are already using it to design and document your APIs.

If you can’t wait to get started, head on over to our [guide]({{< ref "getting-started/key-concepts/high-level-concepts" >}}) to using OAS API Definitions for some tutorials.

## What does a Tyk OAS API Definition look like?

As part of a Tyk OAS Definition, there are a number of vendor specific fields that need to be configured. These fall into these categories:

- Info - information about your New API; its name and whether it should be active for example
- Upstream - where should Tyk forward requests to?
- Server - what URL should users be using to call the API served by the Tyk Gateway.

You can also optionally define:

- Middleware - add additional logic to your API flow, for example allow/block lists or request/response validation.
- [Servers]({{< ref "api-management/gateway-config-tyk-oas#servers" >}}) - find out how Tyk integrates neatly between your clients and upstream services, automatically configuring where it will proxy requests
- [Authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication-with-tyk-oas" >}}) - with Tyk's OpenAPI implementation you have the option of delegating authentication to the upstream service, or handling it on the Tyk Gateway
- [Mock Responses]({{< ref "api-management/traffic-transformation#mock-response-overview" >}}) - Tyk can automatically configure mock response middleware using the configuration included in your OAS document; this allows you to test your APIs without connecting to the upstream services
- [Request Validation]({{< ref "api-management/traffic-transformation#request-validation-overview" >}})  - Tyk can protect your APIs by automatically validating the request parameters and payload against a schema that defines what it *should* look like
- [Paths]({{< ref "api-management/gateway-config-tyk-oas#paths" >}}) - this is a section within the OAS definition that instructs Tyk which API paths (also referred to as endpoints) should be configured; Tyk uses this information to determine which middleware should be enabled for each
- [Versioning]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) - API versioning, a crucial API gateway capability, allows you to update and improve your APIs without breaking existing clients or services

### Servers

These are the URLs you would use to access an API. Once an API is added to Tyk, you will be using a URL that points at the Tyk Gateway itself, plus optionally, an additional listen path on the end of the URL. As part of an import, where possible, Tyk will aim to take the current server in the OAS API Specification provided and make that the Upstream in the Tyk OAS API Specification that is created. That way, Tyk will forward requests to the same place a user would have sent requests to before a gateway was in place. At the same time, the Tyk Gateway will be made the Server. This has the effect of automatically inserting Tyk into your API flow.

#### Import OAS Definition

When you import an OAS API definition, Tyk analyzes the `servers` section of the definition so that it can automatically configure the upstream URL and the listen path for the Tyk API, as follows:

The servers section is analyzed only if there is no `upstreamUrl` query parameter used together with the import API. If an upstreamUrl was specified, that will be used as the upstream for the API and the servers section will be ignored.

The servers section may contain multiple upstream URLs. Currently, Tyk only analyzes the first entry in the list, and uses it as the upstream URL if it is valid. For example:

For the following imported OAS server section
```.json
{
  "servers": [
    {
      "url": "https://upstream-A.com"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
Tyk will read `https://upstream-A.com` and set it as the upstream URL for the newly created API.

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "upstream": {
      "url": "https://upstream-A.com"
    }
  }
}
```
Tyk will insert the API URL as the first entry in the servers section since all traffic will now travel through the Tyk Gateway.

```.json
{
  "servers": [
    {
      "url": {API-URL}
    },
    {
      "url": "https://upstream-A.com"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
If the first entry in the `servers` configuration contains a relative URL, or a format that Tyk can’t properly work with, the import will fail with an error. For example:
When importing the following `servers` configuration:

```.json
{
  "servers": [
    {
      "url": "/relative-url"
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```
Tyk will import API will error with the following message, asking for a valid URL format or upstreamUrl query parameter to be provided:
```.json
{
    "status": "error",
    "message": "error validating servers entry in OAS: Please update \"/relative-url\" to be a valid url or pass a valid url with upstreamURL query param"
}
```


Tyk supports [OpenAPI server variables](https://learn.openapis.org/specification/servers.html#server-variables), so if the first `servers` entry contains a parameterised URL, Tyk will fill in the parameters with the values provided in the `variables` associated with that entry. For example:

```.json
{
  "servers": [
    {
      "url": "https://upstream-A.com/{param1}"
      "variables": {
        "param1": {
          "default": "default-value"
        }
      }
    },
    {
      "url": "http://upstream-B.com"
    }
  ]
}
```

will result in Tyk importing the API with the following upstream URL:

```yaml
{
  ...
  "x-tyk-api-gateway": {
    ...
    "upstream": {
      "url": "https://upstream-A.com/default-value"
    }
  }
}
```


#### Create API

When creating an API, either using the Tyk Gateway or Dashboard API, Tyk analyzes the first entry URL value from the Tyk OAS API Definition `servers` configuration:
- it won't provide any change, if it already matches the API URL, OR
- it will insert a new first servers object containing the correct API URL value

This means that when you export this OAS API Definition to provide documentation for your developer portal, it will automatically tell your users the correct way to call the API now that Tyk is handling it.

#### Update API

Whenever a Tyk API gets updated using either the Tyk Gateway or Dashboard API, Tyk analyzes the first entry URL value from the Tyk OAS API Definition `servers` configuration:

- it won't provide any change, if it already matches the API URL, OR
- it will insert a new first servers object containing the correct API URL value, if the servers section doesn’t exist at all in the Tyk OAS API Definition.
- it updates the `url` value of the first entry in the servers section, if this is an outdated value of the API URL.

This means that when you export an OAS API Definition to provide documentation for your developer portal, it will automatically tell users the correct way to call the API now that Tyk is handling it.

### Authentication with Tyk OAS

OAS has the concept of `securitySchemes` which describes one way in which an API may be accessed, e.g. with a token. You can have multiple `securitySchemes` defined for an API. You decide which is actually active by declaring that in the security section. When hosting an API with Tyk, the only remaining question is which part of the flow does this security validation? If you do nothing more, then Tyk will pass the authentication to the upstream. However, if you do want Tyk to handle the authentication, then it is as simple as setting an authentication field in the `x-tyk-api-gateway` section of the Tyk OAS API Definition. 

The OAS SecurityScheme Object accepts by default just 4 types: 
- apiKey
- http
- oauth2
- openIdConnect

{{< note success >}}
**Note**  

The security section in the OAS API Definition can define a list of authentication mechanisms that the backend should use to authorize requests. For now, your Tyk Gateway will only take into consideration the first security item defined in the list. 
{{< /note >}}

Let’s go through the authentication mechanisms that Tyk supports and see how these can work together with OAS API Definition security schemes.

#### Authentication Token

When the `apiKey` securityScheme is configured in an OAS API Definition, this means that the authentication mechanism that can be configured in `x-tyk-api-gateway`, is an Authentication Token. 

Since the location and token key name are documented in the OAS API Definition `securityScheme`, you only need to turn this authentication on at the Tyk level to tell Tyk to handle the authentication by setting `enabled` to `true`.

Example:

```yaml
{
...
  securitySchemes: {
    petstore_auth: {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  ...
  },
  security: [
    {
      "petstore_auth": []
    }
  ],
  "x-tyk-api-gateway": {
  ...
  "server": {
      "authentication": {
        "securitySchemes": {
          "petstore_auth": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
{{< note success >}}
**Note**  

OAS does not allow for an API to have both cookie and query parameter based token authentication at the same time. Since Tyk does allow this, we have allowed for this combination through the vendor specific fields. You can see how to do this next.
{{< /note >}}

#### Advanced Configuration

##### Multiple locations for the authentication token

With Tyk's configuration, API developers can tell the Tyk Gateway that the authentication token can be found in multiple locations. Since this is not possible with OAS, Tyk provides this capability within its vendor specific fields.

Example:

```yaml
{
...
  securitySchemes: {
    petstore_auth: {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  ...
  },
  security: [
    {
      "petstore_auth": []
    }
  ],
  "x-tyk-api-gateway": {
  ...
  "server": {
      "authentication": {
        "securitySchemes": {
          "petstore_auth": {
            "enabled": true,
            "query": {
              "enabled": true,
              "name": "query-key"
            }
          }
        }
      }
    }
  }
}
```
In the above example, we can observe that, in `securitySchemes` the `header` location for the token is configured. In order to add another possible location for the token we can extend the Tyk configuration section.

##### Dynamic Client mTLS

Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Tyk keys.

The basic idea here is that you can create a key based on a provided certificate. You can then use this key or the cert for one or more users. For that user, you can enable the `enableClientCertificate` option.

```yaml
{
  ...
  "x-tyk-api-gateway": {
  ...
  "server": {
      "authentication": {
        "securitySchemes": {
          "petstore_auth": {
            "enabled": true,
            "enableClientCertificate": true
          }
        }
      }
    }
  }
}
```

#### Basic Authentication

Having the `http` type as the `securityScheme` defined in OAS API Definition, with the schema field set to basic, means that the *Tyk Gateway* uses basic authentication as the protection mechanism. It expects an access key in the same way as any other access method. For more information see the [Basic Authentication documentation]({{< ref "api-management/client-authentication#use-basic-authentication" >}}).

Example:

```yaml
{
...
securitySchemes: {
  petstore_auth: {
    "type": "http",
    "scheme": "basic"
  },
  security: [
    {
      "petstore_auth": []
    }
  ],
  "x-tyk-api-gateway": {
  ...
  "server": {
    "authentication": {
      "securitySchemes": {
        "petstore_auth": {
          "enabled": true,
          "header": {
            "enabled": true,
            "name": "Authorization"
          }
        }
      }
    }
  }
}
```

#### Json Web Token (JWT)

In order to configure a JWT authentication mechanism, the OAS API Definition `securitySchemes` section needs to define an `http` security type, but this time with a `bearer scheme` and with the `JWT bearerFormat`. On the Tyk configuration side, you just need to enable the authentication for the Tyk Gateway and specify the location where the token should be read from.

Example:

```yaml
{
...
securitySchemes: {
  petstore_auth: {
    "type": "http",
    "scheme": "bearer",
    "bearerFormat": "JWT"
  },
  security: [
    {
      "petstore_auth": []
    }
  ],
  "x-tyk-api-gateway": {
  ...
  "server": {
    "authentication": {
      "securitySchemes": {
        "petstore_auth": {
          "enabled": true,
          "header": {
            "enabled": true,
            "name": "Authorization"
          }
        }
      }
    }
  }
}
```

All you need to do in the Tyk configuration is to enable the authentication and specify the header details.

For more configuration options check the [JWT documentation]({{< ref "api-management/client-authentication#use-json-web-tokens-jwt" >}}).

#### OAuth

The `oauth2` `securityScheme` type tells your Tyk Gateway to expect an API with the OAuth authentication method configured. The OAuth authorization mechanism needs to be enabled on the Tyk configuration side with a few details.

Example:

```yaml
{
  ...
  securitySchemes: {
    petstore_auth: {
      "type": "oauth2",
      "flows": {
        "authorizationCode": {
          "authorizationUrl": "https://example.com/api/oauth/dialog",
          "tokenUrl": "https://example.com/api/oauth/token",
          "scopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
        }
      }
    }
  },
  security: [
    {
      "petstore_auth": []
    }
  ],
  "x-tyk-api-gateway": {
    ...
    "server": {
        "authentication": {
          "securitySchemes": {
            "petstore_auth": {
              "enabled": true,
              "header": {
                "enabled": true,
                "name": "Authorization"
              },
              "allowedAccessTypes": [
                "authorization_code"
              ],
              "allowedAuthorizeTypes": [
                "code"
              ],
              "authLoginRedirect": "https://example.com/api/oauth/dialog"
            },
          }
        }
      }
    }
  }
}
```

All you need to do in the Tyk configuration is to enable OAuth and specify the header details. See [OAuth documentation]({{< ref "api-management/client-authentication#use-tyk-as-an-oauth-20-authorization-server" >}}) for more details.

#### Multiple Authentication mechanisms

The `security` section in the OAS API Definition can define a list of security objects, and each security object can list a set of security schemes that the backend uses for authentication.

Tyk only takes into consideration the first security object in the security list. If this object contains multiple security schemes, the Tyk Gateway understands to protect requests with all of these authentication mechanisms.

Example:

```yaml
{
  ...
  securitySchemes: {
    "auth-A": {...},
    "auth-B": {...},
    "auth-C": {...},
    "auth-D": {...},
  },
  security: [
    {
      "auth-A": [],
      "auth-C": []
    },
    {
      "auth-B": []
    },
    {
      "auth-D": []
    }
  ]
}
```
For the above OAS configuration, Tyk looks at only the first `security` object:

```yaml
{      
  "auth-A": [],       
  "auth-C": []   
 },
 ```
 These authentication mechanisms are then enabled for Tyk as follows:

 ```yaml
 {
  ...
  "x-tyk-api-gateway": {
    ...
    "server": {
      "authentication": {
        "enabled": true,
        "baseIdentityProvider": "auth_token",
        "securitySchemes": {
          "auth-A": {
            "enabled": true,
            ...
          },
          "auth-C": {
            "enabled": true,
            ...
          }
        }
      }
    }
  }
}
```
Please observe the presence of the `baseIdentityProvider` field, as this is required when enabling multiple authentication mechanisms at the same time. See [Multiple Auth documentation]({{< ref "api-management/client-authentication#combine-authentication-methods" >}}) for more details.

#### Automatically protecting Tyk OAS APIs

All the Authentication mechanisms documented above can be automatically configured by Tyk at the time of import if the request is followed by the `authentication=true` query parameter. (Import task link)

### Paths

The OAS API Definition represents the source of truth for the Tyk APIs, therefore, the configuration of the `paths` section within that will tell Tyk which endpoints are available to configure.

Tyk can use information specified within the paths configuration object to perform validation or mocking for incoming requests. For validation, Tyk looks at the `requestBody` JSON schemas. For mocking it looks at the response examples that have been included. Where Tyk offers middleware capabilities that are not part of the OAS specification, Tyk makes use of the OAS `operationID` to extend the OAS API with additional capabilities.

#### Operation Id

OAS gives the ability to define an `operationID` in an OAS API Definition. This allows for different parts of the definition to refer to each other. For instance in a Tyk OAS API Definition, if you turn on validation for a particular endpoint, the `x-tyk-api-gateway` middleware section will use the `operationID` to link the enabled validation middleware to the particular endpoint. This is needed because the endpoint is defined within the main OAS API Definition, whereas the details of how Tyk handles the validation is not, since a developer does not need to see that.

#### Configuring API Middleware

Whenever a middleware needs to be enabled for a specific API path, you need to make sure that the `operationId` of that path, is equal with the one under the middleware.operations section within `x-tyk-api-gateway`.

```.json
{
  ...
  "paths": {
    ...
    "/pet": {
      "post": {
        ...
        operationId: "someOperationId"
      }
    }
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        ...
        "someOperationId": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
#### Configuring middleware when importing an OAS API Definition

When importing an OAS API Definition, if the request is accompanied by either `validateRequest` or `allowList` query params, Tyk traverses the entire paths section, and if there is an existing operationId setting already configured for a path, Tyk will copy that value and uses it as a key for the path middleware configuration, under `x-tyk-api-gateway.middleware.operations`.

For example: We want to explicitly allow access for paths when importing the following OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "addPet"
      }
    }
  }
}
```
The resulting Tyk OAS API Definition will use the `addPet` `operationId` to match the middleware configuration to the `/pet` `post` path and method. 

Tyk OAS API Definition

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "addPet"
      }
    }
  },
  "x-tyk-api-gateway": {
    "middleware": {
      "operations": {
        "addPet": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
If there is no existing `operationId` setting for a path, then Tyk will concatenate the path value with the method value, to generate an `operationId` unique value. Tyk uses that in the `x-tyk-api-gateway.middleware.operations` to link the middleware configuration back to the paths section

For example: When you want to explicitly allow access for the paths when importing the following OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
      }
    }
  }
}
```
The resulting Tyk OAS API Definition will generate the petpost `operationId`, and use this value in both paths `operationId` as well as in `middleware.operations`.

Tyk OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "petpost"
      }
    }
  },
  "x-tyk-api-gateway": {
    "middleware": {
      "operations": {
        "petpost": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
{{< note success >}}
**Note**  

The same logic for configuring middleware applies as well when updating a Tyk OAS API Definition by providing an updated OAS API Definition. 
{{< /note >}}

### Tyk OAS API Feature Status

Tyk Gateway is extremely flexible with a great many features that you can use to configure and optimize the handling of requests to your APIs. During the [Early Access]({{< ref "developer-support/release-notes/special-releases#early-access-features" >}}) phase, we gradually rolled out support for the configuration that is available through Tyk Classic API definitions into the new Tyk OAS API Definition format.

From Tyk Gateway and Dashboard v5.3.0 we have reached feature maturity, however there are still a few features to be added before we reach and surpass feature parity with Tyk Classic API.

In the tables below, *Implemented* means that the feature is available for use with Tyk OAS APIs while using the Tyk Gateway API or Tyk Dashboard API; the *API Designer* column shows the features that can be configured using the Tyk Dashboard UI.

If there's a feature you're looking to use that isn't yet implemented, let us know via our [community forum](https://community.tyk.io/t/oas-has-landed/5605) or your Tyk representative and help us to help you get started with Tyk OAS.


#### Management of APIs

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| API name                              | ✅               | ✅            |
| Status (draft/active)                 | ✅               | ✅            |
| API categories                        | ✅               | ✅            |
| API ID/API URL(s)                     | ✅               | ✅            |
| API ownership                         | ✅               | ✅            |
| API versioning                        | ✅               | ✅            |
| API segment tags                      | ✅               | ✅            |

#### Traffic Routing

| Feature                               | Implemented      | Api Designer  |
|---------------------------------------|------------------|---------------|
| Listen path                           | ✅               | ✅            |
| Target URL                            | ✅               | ✅            |
| Upstream load balancing               | ❌️               | ❌️            |
| Uptime tests                          | ❌️               | ❌️            |

#### Client to Gateway Authentication and Authorization

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Keyless                               | ✅               | ✅            |
| Auth Token                            | ✅               | ✅            |
| JWT                                   | ✅               | ✅            |
| OpenID Connect                        | ✅               | ✅            |
| OAuth 2                               | ✅               | ✅            |
| mTLS                                  | ✅               | ✅            |
| HMAC                                  | ✅               | ✅            |
| Basic authentication                  | ✅               | ✅            |
| Custom authentication plugin          | ✅               | ✅            |
| Multiple authentication               | ✅               | ✅            |
| IP access control                     | ❌️               | ❌️            |
| Client-GW request signing             | ❌️               | ❌️            |
| Access token expiration               | ❌️               | ❌️            |

#### Gateway to Upstream Authentication

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Upstream certificates (mTLS)          | ✅               | ✅            |
| Public Key certificate pinning        | ✅               | ✅            |
| GW-Upstream request signing           | ❌️               | ❌️            |

#### API-level (Global) Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Custom config data                    | ✅               | ✅            |
| Context variables                     | ✅               | ✅            |
| CORS                                  | ✅               | ✅            |
| Service discovery                     | ✅               | ✅            |
| Internal API (not exposed by Gateway) | ✅               | ✅            |
| Header Transform (API-level)          | ✅               | ✅            |
| API-level Rate Limit                  | ✅               | ✅            |
| Plugin Bundles                        | ✅               | ✅            |
| Custom request plugins (pre/preAuth/post) | ✅               | ✅            |
| Custom response plugin                    | ✅               | ✅            |
| Batch requests                        | ❌️               | ❌️            |
| Request size limit (API-level)        | ❌️               | ❌️            |
| Event handling: webhooks              | ✅               | ✅            |
| Event handling: custom handlers       | ❌️               | ❌️            |
| Preserve host header                  | ❌️               | ❌️            |

#### Traffic Logs

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Detailed recording (in Log Browser)   | ✅               | ✅            |
| Traffic log custom tags               | ❌️               | ❌️            |
| Set traffic log expiry                | ❌️               | ❌️            |
| Do not track (API-level)              | ✅               | ✅            |
| Custom Analytics Plugin               | ❌️               | ❌️            |


#### Endpoint-level Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Allow                                 | ✅               | ✅            |
| Block                                 | ✅               | ✅            |
| Cache                                 | ✅               | ✅            |
| Circuit breaker                       | ✅               | ✅            |
| Track endpoint                        | ✅               | ✅            |
| Do not track                          | ✅               | ✅            |
| Enforced timeout                      | ✅               | ✅            |
| Ignore authentication                 | ✅               | ✅            |
| Internal endpoint (not exposed by Gateway) | ✅               | ✅            |
| URL rewrite                           | ✅               | ✅            |
| Validate request                      | ✅               | ✅            |
| Request size limit                    | ✅               | ✅            |
| Request method transform              | ✅               | ✅            |
| Request header transform              | ✅               | ✅            |
| Request body transform                | ✅               | ✅            |
| Response header transform             | ✅               | ✅            |
| Response body transform               | ✅               | ✅            |
| Mock response                         | ✅               | ✅            |
| Virtual endpoint                      | ✅               | ✅            |

### OAS Glossary

#### OpenAPI Specification (OAS)

The [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3) is an open standard specification managed by the [OpenAPI Initiative](https://www.openapis.org) that describes a language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. 

#### OpenAPI Description

An [OpenAPI Description](https://learn.openapis.org/specification/structure.html) is an instance of the OpenAPI Specification that describes a service. This is vendor (i.e. API Gateway) agnostic and so, on its own, is not sufficient to configure an API Gateway such as Tyk. Typically you would ‘import’ this into Tyk to convert it into a Tyk OAS API definition by addition of the Tyk vendor fields. You could also add the appropriate fields manually in your editor of choice.

#### OpenAPI Document

A file (usually in JSON or YAML format) containing an OpenAPI Description. There is an option to export a Tyk OAS API Definition from Tyk as an OpenAPI Document. This provides all the information a developer needs to use the API, without the Tyk configuration fields they don’t need to know about.

#### Tyk OAS API definition

An API definition that combines an OpenAPI Description with the Tyk vendor fields (`x-tyk-api-gateway`) that provide the instructions on how Tyk should be configured to resolve calls made to the API that is described in the OAS part. The structure of the Tyk OAS API definition is documented [here]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition-object" >}}).

#### Tyk Classic API definition

An API definition written in Tyk’s proprietary API Specification format. This fully describes how Tyk should be configured to resolve calls made to the API. An example of the structure of the Tyk Classic API definition is provided [here]({{< ref "api-management/gateway-config-tyk-classic" >}}).

{{< include "x-tyk-gateway" >}}

