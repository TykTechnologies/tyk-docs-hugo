---
title: "Authentication examples"
date: 2024-06-25
tags: ["Tyk", "Kubernetes", "API Management", "CRD", "DevOps", "API Gateway Configuration"]
description: "This documentation provides a comprehensive guide on configuring API versioning within the ApiDefinition Custom Resource Definition (CRD)."
keywords: ["Tyk Operator", "Kubernetes", "API Versioning"]
---

Client to Gateway Authentication in Tyk ensures secure communication between clients and the Tyk Gateway. Tyk supports various authentication methods to authenticate and authorize clients before they can access your APIs. These methods include API keys, Static Bearer Tokens, JWT, mTLS, Basic Authentication, and more. This document provides example manifests for each authentication method supported by Tyk.

## Keyless (Open)

This configuration allows [keyless (open)]({{<ref "basic-config-and-security/security/authentication-authorization/open-keyless">}}) access to the API without any authentication.

```yaml {hl_lines=["7-7"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-keyless
spec:
  name: httpbin-keyless
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

## Auth Token (Bearer Token)

This setup requires a [bearer token]({{<ref "basic-config-and-security/security/authentication-authorization/bearer-tokens">}}) for access.

In the below example, the authentication token is set by default to the `Authorization` header of the request. You can customize this behavior by configuring the following fields:

- `use_cookie`: Set to true to use a cookie value for the token.
- `cookie_name`: Specify the name of the cookie if use_cookie is enabled.
- `use_param`: Set to true to allow the token to be passed as a query parameter.
- `param_name`: Specify the parameter name if use_param is enabled.
- `use_certificate`: Enable client certificate. This allows you to create dynamic keys based on certificates.
- `validate_signature`: Enable [signature validation]({{<ref "basic-config-and-security/security/authentication-authorization/bearer-tokens#signature-validation">}}).

```yaml {hl_lines=["13-35"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-auth-token
spec:
  name: httpbin-auth-token
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  use_standard_auth: true
  auth_configs:
    authToken:
      # Auth Key Header Name
      auth_header_name: Authorization
      # Use cookie value
      use_cookie: false
      # Cookie name
      cookie_name: ""
      # Allow query parameter as well as header
      use_param: false
      # Parameter name
      param_name: ""
      # Enable client certificate
      use_certificate: false
      # Enable Signature validation
      validate_signature: false
      signature:
        algorithm: ""
        header: ""
        secret: ""
        allowed_clock_skew: 0
        error_code: 0
```

## JWT

This configuration uses [JWT tokens]({{<ref "basic-config-and-security/security/authentication-authorization/json-web-tokens">}}) for authentication.

Users can configure JWT authentication by defining the following fields:

- `jwt_signing_method`: Specify the method used to sign the JWT. Refer to [JWT Signing Method]({{<ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#jwt-signing-method">}}) for supported methods.
- `jwt_source`: Specify the public key used for verifying the JWT.
- `jwt_identity_base_field`: Define the identity source, typically set to `sub` (subject), which uniquely identifies the user or entity.
- `jwt_policy_field_name`: Specify the claim within the JWT payload that indicates the policy ID to apply.
- `jwt_default_policies` (Optional): Define default policies to apply if no policy claim is found in the JWT payload.

The following example configures an API to use JWT authentication. It specifies the ECDSA signing method and public key, sets the `sub` claim as the identity source, uses the `pol` claim for policy ID, and assigns a default policy (`jwt-policy` SecurityPolicy in `default` namespace) if no policy is specified in the token.

```yaml {hl_lines=["13-22"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-jwt1
spec:
  name: httpbin-jwt1
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-jwt1
    strip_listen_path: true
  enable_jwt: true
  strip_auth_data: true
  jwt_signing_method: ecdsa
  # ecdsa pvt: LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JR0hBZ0VBTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEJHMHdhd0lCQVFRZ2V2WnpMMWdkQUZyODhoYjIKT0YvMk54QXBKQ3pHQ0VEZGZTcDZWUU8zMGh5aFJBTkNBQVFSV3oram42NUJ0T012ZHlIS2N2akJlQlNEWkgycgoxUlR3am1ZU2k5Ui96cEJudVE0RWlNbkNxZk1QV2lacUI0UWRiQWQwRTdvSDUwVnB1WjFQMDg3RwotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0t
  # ecdsa pub: LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRVZzL281K3VRYlRqTDNjaHluTDR3WGdVZzJSOQpxOVVVOEk1bUVvdlVmODZRWjdrT0JJakp3cW56RDFvbWFnZUVIV3dIZEJPNkIrZEZhYm1kVDlQT3hnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t
  jwt_source: LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRVZzL281K3VRYlRqTDNjaHluTDR3WGdVZzJSOQpxOVVVOEk1bUVvdlVmODZRWjdrT0JJakp3cW56RDFvbWFnZUVIV3dIZEJPNkIrZEZhYm1kVDlQT3hnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t
  jwt_identity_base_field: sub
  jwt_policy_field_name: pol
  jwt_default_policies:
    - default/jwt-policy
---
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: jwt-policy
spec:
  access_rights_array:
    - name: httpbin-jwt1
      namespace: default
      versions:
        - Default
  active: true
  name: jwt-policy
  state: active
```

You can verify the API is properly authenticated with following command:

1. JWT with default policy
```bash
curl http://localhost:8080/httpbin-jwt1/get -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyfQ.rgPyrCJYs2im7zG6im5XUqsf_oAf_Kqk-F6IlLb3yzZCSZvrQObhBnkLKgfmVTbhQ5El7Q6KskXPal5-eZFuTQ'
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "Traceparent": "00-d2b93d763ca27f29181c8e508b5ac0c9-a446afa3bd053617-01",
    "User-Agent": "curl/8.6.0",
    "X-Amzn-Trace-Id": "Root=1-6696f0bf-1d9e532c6a2eb3a709e7086b"
  },
  "origin": "127.0.0.1, 178.128.43.98",
  "url": "http://httpbin.org/get"
}
```

2. JWT with explicit policy
```bash
curl http://localhost:8080/httpbin-jwt1/get -H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyLCJwb2wiOiJaR1ZtWVhWc2RDOXFkM1F0Y0c5c2FXTjUifQ.7nY9TvYgsAZqIHLhJdUPqZtzqU_5T-dcNtCt4zt8YPyUj893Z_NopL6Q8PlF8TlMdxUq1Ff8rt4-p8gVboIqlA'
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "Traceparent": "00-002adf6632ec20377cb7ccf6c3037e78-3c4cb97c70d790cb-01",
    "User-Agent": "curl/8.6.0",
    "X-Amzn-Trace-Id": "Root=1-6696f1dd-7f9de5f947c8c73279f7cca6"
  },
  "origin": "127.0.0.1, 178.128.43.98",
  "url": "http://httpbin.org/get"
}
```

## Basic Authentication

This configuration uses [Basic Authentication]({{<ref "basic-config-and-security/security/authentication-authorization/basic-auth">}}), requiring a username and password for access.

```yaml {hl_lines=["13-13"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-basic-auth
spec:
  name: Httpbin Basic Authentication
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  use_basic_auth: true
```

## Custom Plugin Auth (go)

This configuration uses a [Golang plugin]({{<ref "plugins/supported-languages/golang">}}) for custom authentication. The following example shows how to create an API definition with a Golang custom plugin for `httpbin-go-auth`.

For an example of Golang authentication middleware, see [Performing custom authentication with a Golang plugin]({{<ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/go-plugin-examples#performing-custom-authentication-with-a-golang-plugin">}}).

```yaml {hl_lines=["7-7", "14-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-go-auth
spec:
  name: httpbin-go-auth
  use_go_plugin_auth: true # Turn on GO auth
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  custom_middleware:
    driver: goplugin
    pre:
      - name: "AddFooBarHeader"
        path: "/mnt/tyk-gateway/example-go-plugin.so"
    auth_check:
        name: "MyPluginCustomAuthCheck"
        path: "/mnt/tyk-gateway/example-go-plugin.so"
```

## Custom Plugin Auth (gRPC)

This configuration uses a [gRPC plugin]({{<ref "plugins/supported-languages/golang">}}) for custom authentication. The following example shows how to create an API definition with a gRPC custom plugin for `httpbin-grpc-auth`.

For a detailed walkthrough on setting up Tyk with gRPC authentication plugins, refer to [Extending Tyk with gRPC Authentication Plugins](https://tyk.io/blog/how-to-setup-custom-authentication-middleware-using-grpc-and-java/).

```yaml {hl_lines=["9-9", "14-26"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-grpc-auth
spec:
  name: httpbin-grpc-auth
  protocol: http
  active: true
  enable_coprocess_auth: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin-grpc-auth
    strip_listen_path: true
  custom_middleware:
    driver: grpc
    post_key_auth:
      - name: "HelloFromPostKeyAuth"
        path: ""
    auth_check:
      name: foo
      path: ""
    id_extractor:
      extract_from: header
      extract_with: value
      extractor_config:
        header_name: Authorization
```

## Multiple (Chained) Auth

This setup allows for [multiple authentication]({{<ref "basic-config-and-security/security/authentication-authorization/multiple-auth">}}) methods to be chained together, requiring clients to pass through each specified authentication provider.

To enable multiple (chained) auth, you should set `base_identity_provided_by` field to one of the supported chained enums. Consult [Enable Multi (Chained) Authentication in your API Definition]({{<ref "basic-config-and-security/security/authentication-authorization/multiple-auth#enable-multi-chained-authentication-in-your-api-definition">}}) for the supported auths.

In this example, we are creating an API definition with basic authentication and mTLS with basic authentication as base identity for `httpbin-multiple-authentications`.

```yaml {hl_lines=["19-21"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-multiple-authentications
spec:
  name: Httpbin Multiple Authentications
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  base_identity_provided_by: basic_auth_user
  use_basic_auth: true
  use_mutual_tls_auth: true
```

## IP Allowlist

To enable [IP Allowlist]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting">}}), set the following fields:

* `enable_ip_whitelisting`: Enables IPs allowlist. When set to `true`, only requests coming from the explicit list of IP addresses defined in (`allowed_ips`) are allowed through.
* `allowed_ips`: A list of strings that defines the IP addresses (in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) notation) that are allowed access via Tyk.

In this example, only requests coming from 127.0.0.2 is allowed.

```yaml {hl_lines=["10-12"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  enable_ip_whitelisting: true
  allowed_ips:
    - 127.0.0.2
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```

## IP Blocklist

To enable [IP Blocklist]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting">}}), set the following fields:

* `enable_ip_blacklisting`: Enables IPs blocklist. If set to `true`, requests coming from the explicit list of IP addresses (blacklisted_ips) are not allowed through.
* `blacklisted_ips`: A list of strings that defines the IP addresses (in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) notation) that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. 

In this example, requests coming from 127.0.0.2 will be forbidden (`403`).

```yaml {hl_lines=["10-12"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  enable_ip_blacklisting: true
  blacklisted_ips:
    - 127.0.0.2
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```