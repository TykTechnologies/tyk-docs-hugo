---
title: "Authentication with Tyk OAS"
date: 2022-07-06
tags: ["API", "OAS", "OpenAPI Specification", "Servers", "Tyk OAS authentication"]
description:  "Explain low-level concepts around authentication in Tyk OAS"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 2
---

### Introduction

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

### Authentication Token

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

### Advanced Configuration

#### Multiple locations for the authentication token

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

#### Dynamic Client mTLS

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

### Basic Authentication

Having the `http` type as the `securityScheme` defined in OAS API Definition, with the schema field set to basic, means that the *Tyk Gateway* uses basic authentication as the protection mechanism. It expects an access key in the same way as any other access method. For more information see the [Basic Authentication documentation]({{< ref "/api-management/authentication-authorization#use-basic-authentication" >}}).

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
            "name": "Authorization"
          }
        }
      }
    }
  }
}
```

### Json Web Token (JWT)

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
            "name": "Authorization"
          }
        }
      }
    }
  }
}
```

All you need to do in the Tyk configuration is to enable the authentication and specify the header details.

For more configuration options check the [JWT documentation]({{< ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}}).

### OAuth

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

All you need to do in the Tyk configuration is to enable OAuth and specify the header details. See [OAuth documentation]({{< ref "/api-management/authentication-authorization#set-up-oauth-20-authorization" >}}) for more details.

### Multiple Authentication mechanisms

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
Please observe the presence of the `baseIdentityProvider` field, as this is required when enabling multiple authentication mechanisms at the same time. See [Multiple Auth documentation]({{< ref "/api-management/authentication-authorization#multiple-chained-authentication" >}}) for more details.

### Other Authentication mechanisms

For now, the only authentication mechanisms enabled with OAS API Definition configuration are: 
- Authentication Token
- Basic Authentication
- JSON Web Token (JWT)
- Oauth.

If you’re interested in protecting your APIs using a different mechanism such as HMAC or OpenID Connect, see [Authentication and Authorization]({{< ref "/api-management/authentication-authorization" >}}) for more details.

### Automatically protecting OAS API Definition APIs

All the Authentication mechanisms documented above can be automatically configured by Tyk at the time of import if the request is followed by the `authentication=true` query parameter. (Import task link)
