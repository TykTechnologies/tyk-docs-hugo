---
title: Basic Authentication
description: How to configure basic authentication in Tyk?
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "Basic Authentication"]
aliases:
  - /basic-config-and-security/security/authentication-authorization/basic-auth
---

## What is Basic Authentication?

Basic Authentication is a straightforward authentication method where the user's credentials (username and password) are  sent to the server, usually in a standard HTTP header.

## How does Basic Authentication Work?

The user credentials are combined and encoded in this form:

```
Basic base64Encode(username:password)
```

A real request could look something like:

```
GET /api/widgets/12345 HTTP/1.1
Host: localhost:8080
Authorization: Basic am9obkBzbWl0aC5jb206MTIzNDU2Nw==
Cache-Control: no-cache
```

In this example the username is `john@smith.com` and the password is `1234567` (see [base64encode.org](https://www.base64encode.org))

### The Problem with Basic Authentication

With Basic Authentication, the authentication credentials are transferred from client to server as encoded plain text. This is not a particularly secure way to transfer the credentials as it is highly susceptible to intercept; as the security of user authentication is usually of critical importance to API owners, Tyk recommends that Basic Authentication should only ever be used in conjunction with additional measures, such as [mTLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#why-use-mutual-tls" >}}).

## Configuring your API to use Basic Authentication

The OpenAPI Specification indicates the use of [Basic Authentication](https://swagger.io/docs/specification/v3_0/authentication/basic-authentication/) in the `components.securitySchemes` object using the `type: http` and `scheme: basic`:

```yaml
components:
  securitySchemes:
    myAuthScheme:
      type: http
      scheme: basic

security:
  - myAuthScheme: []
```

With this configuration provided by the OpenAPI description, all that is left to be configured in the Tyk Vendor Extension is to enable authentication, to select this security scheme and to indicate where Tyk should look for the credentials. Usually the credentials will be provided in the `Authorization` header, but Tyk is configurable, via the Tyk Vendor Extension, to support custom header keys and credential passing via query parameter or cookie.

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
```

Note that URL query parameter keys and cookie names are case sensitive, whereas header names are case insensitive.

You can optionally [strip the user credentials]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) from the request prior to proxying to the upstream using the `authentication.stripAuthorizationData` field (Tyk Classic: `strip_auth_data`).

### Multiple User Credential Locations

The OpenAPI Specification's `securitySchemes` mechanism allows only one location for the user credentials, but in some scenarios an API might need to support multiple potential locations to support different clients.

The Tyk Vendor Extension supports this by allowing configuration of alternative locations in the basic auth entry in `server.authentication.securitySchemes`. Building on the previous example, we can add optional query and cookie locations as follows:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
          header:
            enabled: true
            name: Authorization
          query:
            enabled: true
            name: query-auth
          cookie:
            enabled: true
            name: cookie-auth
```

### Extract Credentials from the Request Payload

In some cases, for example when dealing with SOAP, user credentials can be passed within the request body rather in the standard Basic Authentication format. You can configure Tyk to handle this situation by extracting the username and password from the body using regular expression matching (regexps).

You must instruct Tyk to check the request body by adding the `extractCredentialsFromBody` field to the basic auth entry in `server.authentication.securitySchemes`, for example:

```yaml
x-tyk-api-gateway:
  server:
    authentication:
      enabled: true
      securitySchemes:
        myAuthScheme:
          enabled: true
        extractCredentialsFromBody:
          enabled: true
          userRegexp: '<User>(.*)</User>'
          passwordRegexp: '<Password>(.*)</Password>'          
```

Note that each regexp should contain only one match group, which must point to the actual values of the user credentials.

### Caching User Credentials

The default behaviour of Tyk's Basic Authentication middleware is to cache user credentials, improving the performance of the authentication step when a client makes frequent requests on behalf of the same user.

When a request is received, it presents credentials which are checked against the users registered in Tyk. When a match occurs and the request is authorized, the matching credentials are stored in a cache with a configurable refresh period. When future requests are received, Tyk will check the presented credentials against those in the cache first, before checking the full list of registered users.

The cache will refresh after `cacheTTL` seconds (Tyk Classic: `basic_auth.cache_ttl`).

If you do not want to cache user credentials, you can turn this off using `disableCaching` in the basic auth entry in `server.authentication.securitySchemes` (Tyk Classic: `basic_auth.disable_caching`).

### Using Tyk Classic APIs

As noted in the Tyk Classic API [documentation]({{< ref "api-management/gateway-config-tyk-classic#configuring-authentication-for-tyk-classic-apis" >}}), you can select Basic Authentication using the `use_basic_auth` option. This will default to expect the user credentials in the `Authorization` header.


## Using Tyk Dashboard to Configure Basic Authentication

Using the Tyk Dashboard, you can configure the Basic Authentication method from the Server section in the API Designer by enabling **Authentication** and selecting **Basic Authentication** from the drop-down:

{{< img src="/img/api-management/security/basic-auth-api-setup.png" alt="Target Details: Basic Auth" >}}

- select the location(s) where Tyk should look for the token
- provide the key name for each location (we prefill the default `Authorization` for the *header* location, but you can replace this if required)
- optionally select [strip authorization data]({{< ref "api-management/client-authentication#managing-authorization-data" >}}) to remove the auth token locations from the request prior to proxying to the upstream
- optionally configure the [basic authentication cache]({{< ref "api-management/authentication/basic-authentication#caching-user-credentials" >}})
- optionally configure [extraction of credentials from the request body]({{< ref "#extract-credentials-from-the-request-payload" >}})

## Registering Basic Authentication User Credentials with Tyk

When using Basic Authentication, the API key used to access the API is not generated by the Tyk system, instead you need to create and register the credentials of your users with Tyk. Tyk will compare the credentials provided in the request against the list of users you have created.

The way that this is implemented is through the creation of a key that grants access to the API (as you would for an API protected by [auth token]({{< ref "api-management/authentication/bearer-token" >}})), however for this key you will provide a username and password.

When calling the API, users would never use the key itself as a token, instead their client must provide the Basic Auth credentials formed from the registered username and password, as [described previously]({{< ref "#how-does-basic-authentication-work" >}}).


### Using Tyk Dashboard UI

You can use the Tyk Dashboard to register a user's Basic Authentication credentials that can then be used to access your API.

Navigate to the **Keys** screen and select **Add Key**.

Follow the instructions in the [access key guide]({{< ref "api-management/gateway-config-managing-classic#access-an-api" >}}) and you'll notice that, when you select the Basic Auth protected API, a new **Authentication** tab appears:

Note that the **Authentication** tab will also be displayed if you create a key from a policy that grants access to a Basic Auth protected API.

Complete the user's credentials on this tab and create the key as normal. The key that is created in Tyk Dashboard is not in itself an access token (that is, it cannot be used directly to gain access to the API) but is used by Tyk to validate the credentials provided in the request and to determine the appropriate authorization, including expiry of authorization.

### Using the Tyk Dashboard API

You can register user credentials using the `POST /api/apis/keys/basic/{username}` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}). The request payload is a [Tyk Session Object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key).

- the user's *username* is provided as a path parameter
- the user's *password* is provided as `basic_auth_data.password` within the request payload

You use the `POST` method to create a new user and `PUT` to update an existing entry.

{{< note success >}}
**Note**  

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}

### Using the Tyk Gateway API

You can register user credentials using the `POST /tyk/keys/{username}` endpoint in the [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}). The request payload is a [Tyk Session Object]({{< ref "api-management/policies#what-is-a-session-object" >}}) (access key).

- the user's *username* is provided as a path parameter
- the user's *password* is provided as `basic_auth_data.password` within the request payload

You use the `POST` method to create a new user and `PUT` to update an existing entry.

{{< note success >}}
**Note**  

Be careful to ensure that the `org_id` is set correctly and consistently so that the Basic Authentication user is created in the correct organization.
{{< /note >}}


