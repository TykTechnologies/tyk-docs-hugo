---
title: Upstream Authentication
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - OAuth
    - mTLS
    - Basic Auth
description: Authenticating Tyk Gateway with upstream services
date: "2024-11-18"
aliases:
  - security/certificate-pinning
---

## Introduction

Tyk Gateway sits between your clients and your services, securely routing requests and responses. For each API proxy that you expose on Tyk, you can configure a range of different methods that clients must use to identify (authenticate) themselves to Tyk Gateway. These are described in detail in the [Client Authentication]({{< ref "api-management/client-authentication" >}}) section.

In the same way as you use Client Authentication to securely confirm the identity of the API clients, your upstream services probably need to securely confirm the identity of their client - namely Tyk. This is where Tyk's flexible **Upstream Authentication** capability comes in.

When using Tyk, you can choose from a range of authentication methods for each upstream API:
- [Mutual TLS]({{< ref "api-management/upstream-authentication#mutual-tls-mtls" >}})
- [Token-based authentication]({{< ref "api-management/upstream-authentication#token-based-authentication" >}})
- [Request signing]({{< ref "api-management/upstream-authentication#request-signing" >}})
- [Basic Authentication]({{< ref "api-management/upstream-authentication#basic-authentication" >}})
- [OAuth 2.0]({{< ref "api-management/upstream-authentication#upstream-oauth-20" >}})
    - [OAuth 2.0 Client Credentials]({{< ref "api-management/upstream-authentication#oauth-client-credentials" >}})
    - [OAuth 2.0 Password Grant]({{< ref "api-management/upstream-authentication#oauth-resource-owner-password-credentials" >}})

{{< note success >}}
**Note**  

Note that OAuth 2.0 Password Grant is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported by Tyk for use with legacy upstream services.
{{< /note >}}


## Mutual TLS (mTLS)

If your upstream API is protected with [mutual TLS]({{< ref "api-management/client-authentication#use-mutual-tls" >}}) then Tyk must provide a certificate when connecting to the upstream service and also will need to verify the certificate presented by the upstream. This ensures secure communication between Tyk and your upstream services.

When Tyk performs an mTLS handshake with an upstream, it needs to know:

- which client certificate Tyk should use to identify itself
- which public key (certificate) that Tyk should use to verify the identity of the upstream

We use a system of [mapping certificates]({{< ref "api-management/upstream-authentication#mapping-certificates-to-domains" >}}) to upstreams based on their host domain. This is used for both the [client certificate]({{< ref "api-management/upstream-authentication#upstream-client-certificates" >}}) and, optionally, for the [upstream public key]({{< ref "api-management/upstream-authentication#upstream-server-certificates" >}}) if we want to use specific certificates to protect against compromised certificate authorities (CAs).

#### Upstream mTLS for Tyk middleware and plugins

If upstream mTLS certificates are configured for an API, they will not be used for direct proxies to the upstream and will also automatically be used for any HTTP requests made from the [JavaScript Virtual Endpoint]({{< ref "api-management/traffic-transformation#virtual-endpoints" >}}) middleware. They will **not** be used for HTTP requests from custom plugins.


#### Upstream mTLS for Tyk Cloud

All Tyk Cloud users can secure their upstream services with mTLS 

### Mapping certificates to domains

Tyk maintains mappings of certificates to domains (which can include the port if a non-standard HTTP port is used). Separate maps can be declared globally, to be applied to all APIs, and at the API level for more granular control. The granular API level mapping takes precedence if both are configured. Within each mapping, both default and specific maps can be defined, giving ultimate flexibility.

When Tyk performs an mTLS handshake with an upstream, it will check if there are certificates mapped to the domain:

- first it will check in the API definition for a specific certificate
- then it will check in the API definition if there is a default certificate
- then it will check at the Gateway level for a specific certificate
- then it will check at the Gateway level for a default certificate

Certificates are identified in the mapping using the [Certificate Id]({{< ref "api-management/certificates#certificate-management" >}}) assigned by the Tyk Certificate Store, for example: `{"<domain>": "<cert-id>"}`.

When mapping a certificate to a domain:

- do not include the protocol (e.g. `https://`)
- include the port if a non-standard HTTP port is in use
- you can use the `*` wildcard - either in place of the whole domain or as part of the domain name

For example, to map a certificate with Id `certId` to an upstream service located at `https://api.production.myservice.com:8443` you could map the certificate as:

- `{"api.production.myservice.com:8443": "certId"}`
- `{"*.production.myservice.com:8443": "certId"}`
- `{"api.*.myservice.com:8443": "certId"}`

Note that when using the wildcard (`*`) to replace part of the domain name, it can only represent one fragment so, using our example, you would not achieve the same mapping using `{"*.myservice.com:8443": "certId"}`.


A *default* certificate to be used for all upstream requests can be mapped by replacing the specific domain with the wildcard, for example `{"*", "certId"}`.


### Upstream client certificates

Tyk can be configured to proxy requests to a single API on to different upstream hosts (for example via load balancing, API versions or URL rewrite middleware). You can configure Tyk to present specific client certificates to specific hosts, and you can specify a default certificate to be usedfor all upstream hosts.

The upstream service uses the public key (from the certificate presented by Tyk) to verify the signed data, confirming that Tyk possesses the corresponding private key.

All certificates are retrieved from the [Tyk Certificate Store]({{< ref "api-management/certificates#certificate-management" >}}) when the proxy occurs.

#### Mapping client certificates at the Gateway level

You can map certificates to domains using the [security.certificates.upstream]({{< ref "tyk-oss-gateway/configuration#securitycertificatesupstream" >}}) field in your Gateway configuration file.

Mapping a certificate to domain `*` will ensure that this certificate will be used in all upstream requests where no other certificate is mapped (at Gateway or API level).

#### Mapping client certificates at the API level

You can map certificates to domains using the [upstream.mutualTLS]({{< ref "api-management/gateway-config-tyk-oas#mutualtls" >}}) object (Tyk Classic: `upstream_certificates`) in your API definition.

Mapping a certificate to domain `*` will ensure that this certificate will be used in all upstream requests where no other certificate is mapped in the API definition.


### Upstream server certificates

Tyk will verify the certificate received from the upstream by performing the following checks:

- Check that it's issued by a trusted CA
- Check that the certificate hasn't expired
- Verify the certificate's digital signature using the public key from the certificate

{{< note success >}}
**Note**  

Tyk will look in the system trust store for the server that is running Tyk Gateway (typically `/etc/ssl/certs`). If you are using self-signed certificates, store them here so that Tyk can verify the upstream service.
{{< /note >}}

If you want to restrict the public keys that can be used by the upstream service, then you can use [certificate pinning]({{< ref "api-management/upstream-authentication#certificate-pinning" >}}) to store a list of certificates that Tyk will use to verify the upstream.

#### Certificate Pinning

Tyk provides the facility to allow only certificates generated from specific public keys to be accepted from the upstream services during the mTLS exchange. This is called "certificate pinning" because you *pin* a specific public certificate to an upstream service (domain) and Tyk will only use this to verify connections to that domain. This helps to protect against compromised certificate authorities. You can pin one or more public keys per domain.

The public keys must be stored in PEM format in the [Tyk Certificate Store]({{< ref "api-management/certificates#certificate-management" >}}).

##### Configuring Certificate Pinning at the Gateway level

If you want to lock down the public certificates that can be used in mTLS handshakes for specific upstream domains across all APIs, you can pin public certificates to domains using the [security.pinned_public_keys]({{< ref "tyk-oss-gateway/configuration#securitypinned_public_keys" >}}) field in your Gateway configuration file.

This accepts a map of domain addresses to certificates in the same way as for the client certificates. Wildcards are supported in the domain addresses. Pinning one or more certificates to domain `*` will ensure that only these certificates will be used to verify the upstream service during the mTLS handshake. 

##### Configuring Certificate Pinning at the API level

Restricting the certificates that can be used by the upstream for specific APIs is simply a matter of registering a map of domain addresses to certificates in the [upstream.certificatePinning]({{< ref "api-management/gateway-config-tyk-oas#certificatepinning" >}}) object in the API definition (Tyk Classic: `pinned_public_keys`).


### Overriding mTLS for non-production environments

When you are developing or testing an API, your upstream might not have the correct certificates that are deployed for your production service. This could cause problems when integrating with Tyk.

You can use the [proxy.transport.insecureSkipVerify]({{< ref "api-management/gateway-config-tyk-oas#tlstransport" >}}) option in the API definition (Tyk Classic: `proxy.transport.ssl_insecure_skip_verify`) to instruct Tyk to ignore the certificate verification stage for a specific API.

If you want to ignore upstream certificate verification for all APIs deployed on Tyk, you can use the [proxy_ssl_insecure_skip_verify]({{< ref "tyk-oss-gateway/configuration#proxy_ssl_insecure_skip_verify" >}}) option in the Tyk Gateway configuration.

These are labelled *insecure* with good reason and should never be configured in production.


### Using Tyk Dashboard to configure upstream mTLS

Using the Tyk Dashboard, you can enable upstream mTLS from the **Upstream** section in the API Designer:

{{< img src="/img/dashboard/api-designer/tyk-oas-upstream-mtls-client.png" alt="Enable upstream mTLS" >}}

Click on **Attach Certificate** to open the certificate attachment window:

{{< img src="/img/dashboard/api-designer/tyk-oas-certificate-attach.png" alt="Attach a certificate to an API" >}}

This is where you can define the upstream **Domain Name** and either select an existing certificate from the Tyk Certificate Store, or upload a new certificate to the store.

If you want to [pin the public certificates]({{< ref "api-management/upstream-authentication#certificate-pinning" >}}) that can be used by Tyk when verifying the upstream service, then you should enable **Public certificates** and attach certificates in the same manner as for the client certificates:

{{< img src="/img/dashboard/api-designer/tyk-oas-upstream-mtls-public.png" alt="Enable public key pinning" >}}

For details on managing certificates with Tyk, please see the [certificate management]({{< ref "api-management/certificates#certificate-management" >}}) documentation.

For Tyk Classic APIs, the **Upstream Certificates** controls are on the **Advanced Options** tab of the Tyk Classic API Designer.


### Using Tyk Operator to configure mTLS

{{< tabs_start >}}
{{< tab_start "Upstream Client Certificates" >}}

Configure upstream mTLS client certificates using the `mutualTLS` field in the `TykOasApiDefinition` object when using Tyk Operator, for example:

```yaml{hl_lines=["12-18"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
 kind: TykOasApiDefinition
 metadata:
   name: petstore
   namespace: default
 spec:
   tykOAS:
     configmapRef:
       name: petstore
       namespace: default
       keyName: petstore.json
   mutualTLS:
     enabled: true
     domainToCertificateMapping:
       - domain: "petstore.com"
         certificateRef: petstore-domain
       - domain: "petstore.co.uk"
         certificateRef: petstore-uk-domain
```

{{< tab_end >}}
{{< tab_start "Certificate Pinning" >}}

Tyk Operator supports certificate pinning in the Tyk OAS custom resource, allowing you to secure your API by pinning a public key stored in a secret to a specific domain.

Example of public keys pinning

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm
  namespace: default
data:
  test_oas.json: |-
    {
      "info": {
        "title": "httpbin with certificate pinning",
        "version": "1.0.0"
      },
      "openapi": "3.0.3",
      "components": {},
      "paths": {},
      "x-tyk-api-gateway": {
        "info": {
          "name": "httpbin with certificate pinning",
          "state": {
            "active": true
          }
        },
        "upstream": {
          "url": "https://httpbin.org/"
        },
        "server": {
          "listenPath": {
            "value": "/httpbin/",
            "strip": true
          }
        }
      }
    }
---
apiVersion: v1
kind: Secret
metadata:
  name: domain-secret
type: kubernetes.io/tls # The secret needs to be a type of kubernetes.io/tls
data:
  tls.crt: <PUBLIC_KEY>
  tls.key: ""
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: "oas-pinned-public-keys"
spec:
  tykOAS:
    configmapRef:
      keyName: test_oas.json
      name: cm
  certificatePinning:
    enabled: true
    domainToPublicKeysMapping:
      - domain: "httpbin.org"
        publicKeyRefs:
          - domain-secret
```

This example demonstrates how to enable certificate pinning for the domain `httpbin.org` using a public key stored in a Kubernetes secret (`domain-secret`).

{{< tab_end >}}
{{< tabs_end >}}

### Using Tyk Operator to configure mTLS for Tyk Classic APIs

{{< tabs_start >}}
{{< tab_start "Upstream Client Certificates" >}}
When using Tyk Classic APIs with Tyk Operator, you can configure upstream client certificates for mTLS using one of the following fields within the ApiDefinition object:

- **upstream_certificate_refs**: Configure using certificates stored within Kubernetes secret objects.
- **upstream_certificates**: Configure using certificates stored within Tyk Dashboard's certificate store.

**upstream_certificate_refs**

The `upstream_certificate_refs` field can be used to configure certificates for different domains. References can be held to multiple secrets which are used for the domain mentioned in the key. Currently "*" is used as a wildcard for all the domains

The example listed below shows that the certificate in the secret, *my-test-tls*, is used for all domains.

```yaml
# First apply this manifest using the command
# "kubectl apply -f config/samples/httpbin_upstream_cert.yaml"
#
# The operator will try to create the ApiDefinition and will succeed but will log an error that a certificate is missing
# in the cluster for an upstream
#
# Generate your public-private key pair , for test you can use the following command to obtain one fast:
# "openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out tls.crt -keyout tls.key"
#
# Run the following command to obtain the values that must be put inside the yaml that contians the secret resource:
# "kubectl create secret tls my-test-tls --key="tls.key" --cert="tls.crt" -n default -o yaml --dry-run=client"
#
# Apply your TLS certificate using the following command: (we already have an example one in our repo)
# "kubectl apply -f config/sample/simple_tls_secret.yaml"
#
# NOTE: the upstream_certificate_refs can hold references to multiple secrets which are used for the domain
# mentioned in the key (currently "*" is used as a wildcard for all the domains)
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  upstream_certificate_refs:
    "*": my-test-tls
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
```

A secret can be created and output in yaml format using the following command:

```bash
kubectl create secret tls my-test-tls --key="keyfile.key" --cert="certfile.crt" -n default -o yaml --dry-run=client
kubectl apply -f path/to/your/tls_secret.yaml
```

**upstream_certificates**

The `upstream_certificates` field allows certificates uploaded to the certificate store in Tyk Dashboard to be referenced in the Api Definition:

```yaml
# Skip the concatenation and .pem file creation if you already have a certificate in the correct format

# First generate your public-private key pair , for test use you can use the following command to obtain one fast:
# "openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out tls.crt -keyout tls.key"

# Concatenate the above files to obtain a .pem file which we will upload using the dashboard UI
# "cat tls.crt tls.key > cert.pem"

# Upload it to the tyk certificate store using the dashboard

# Fill in the manifest with the certificate id (the long hash) that you see is given to it in the dashboard
# (in place of "INSERT UPLOADED CERTIFICATE NAME FROM DASHBOARD HERE")
# Optional: Change the domain from "*" to something more specific if you need to use different
# upstream certificates for different domains

# Then apply this manifest using the command
# "kubectl apply -f config/samples/httpbin_upstream_cert_manual.yaml"

# The operator will try create the ApiDefinition and will succeed and it will have the requested domain upstream certificate
# in the cluster for an upstream

# NOTE: the upstream_certificate can hold multiple domain-certificateName pairs
# (currently "*" is used as a wildcard for all the domains)

apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  upstream_certificates:
    "*": #INSERT UPLOADED CERTIFICATE NAME FROM DASHBOARD HERE#
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
```

{{< tab_end >}}
{{< tab_start "Certificate Pinning" >}}

When using Tyk Classic APIs with Tyk Operator you can configure certificate pinning using one of the following fields within the ApiDefinition object:

- **pinned_public_keys**: Use public keys uploaded via the Certificate API.
- **pinned_public_keys_refs**: Uses public keys configured from Kubernetes secret objects.

###### pinned_public_keys

Use the `pinned_public_keys` mapping to pin public keys to specific domains, referencing public keys that have been uploaded to Tyk Certificate storage via the Certificate API.  

```yaml
pinned_public_keys:
  "foo.com": "<key_id>",
  "*": "<key_id-1>,<key_id-2>"
```

Each `key-id` value should be set to the ID returned from uploading the public key via the Certificate API. Multiple public keys can be specified by separating their IDs by a comma.

<br>

###### pinned_public_keys_refs

The `pinned_public_keys_refs` mapping should be used to configure pinning of public keys sourced from Kubernetes secret objects for different domains.

Each key should be set to the name of the domain and the value should refer to the name of a Kuberenetes secret object that holds the corresponding public key for that domain.

Wildcard domains are supported and "*" can be used to denote all domains.

{{< warning >}}
**Caveats**

- Only *kubernetes.io/tls* secret objects are allowed.
- Please use the *tls.crt* field for the public key.
- The secret that includes a public key must be in the same namespace as the ApiDefinition object.
{{< /warning >}}

The example below illustrates a scenario where the public key from the Kubernetes secret object, *httpbin-secret*, is used for all domains, denoted by the wildcard character '*'. In this example the *tls.crt* field of the secret is set to the actual public key of *httpbin.org*. Subsequently, if you any URL other than https://httpbin.org is targetted (e.g. https://github.com/) a *public key pinning error* will be raised for that particular domain. This is because the public key of *httpbin.org* has been configured for all domains.

```yaml
# ApiDefinition object 'pinned_public_keys_refs' field uses the following format:
#  spec:
#   pinned_public_keys_refs:
#    "domain.org": <secret_name> # the name of the Kubernetes Secret Object that holds the public key for the 'domain.org'.
#
# In this way, you can refer to Kubernetes Secret Objects through 'pinned_public_keys_refs' field.
#
# In this example, we have an HTTPS upstream target as `https://httpbin.org`. The public key of httpbin.org is obtained
# with the following command:
#   $ openssl s_client -connect httpbin.org:443 -servername httpbin.org 2>/dev/null | openssl x509 -pubkey -noout
#
# Note: Please set tls.crt field of your secret to actual public key of httpbin.org.
#
# We are creating a secret called 'httpbin-secret'. In the 'tls.crt' field of the secret, we are specifying the public key of the
#  httpbin.org obtained through above `openssl` command, in the decoded manner.
#
apiVersion: v1
kind: Secret
metadata:
  name: httpbin-secret
type: kubernetes.io/tls
data:
  tls.crt: <PUBLIC_KEY> # Use tls.crt field for the public key.
  tls.key: ""
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-certificate-pinning
spec:
  name: httpbin - Certificate Pinning
  use_keyless: true
  protocol: http
  active: true
  pinned_public_keys_refs:
    "*": httpbin-secret
  proxy:
    target_url: https://httpbin.org
    listen_path: /pinning
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
```
{{< tab_end >}}
{{< tabs_end >}}

<hr>

## Token-based authentication

Token-based authentication (also referred to as Auth Token) is a method whereby the client is identified and authenticated by the server based on a key/token they present as a credential with each request. Typically the token is issued by the server to a specific client.

The server determines how the key should be provided - typically in a request header, cookie or query parameter.

Tyk supports [Auth Token]({{< ref "api-management/client-authentication#use-auth-tokens" >}}) as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to generate access *keys* for an Auth Token protected API as explained in the [documentation]({{< ref "api-management/client-authentication#enable-auth-bearer-tokens-in-your-api-definition-with-the-dashboard" >}}). The client must then provide the *key* in the appropriate parameter for each request.

If your **upstream service** is protected using Auth Token then similarly, Tyk will need to provide a token, issued by the upstream, in the request.

### How to use Upstream Token-based Authentication
Typically Auth Token uses the `Authorization` header to pass the token in the request.

Tyk's [Request Header Transform]({{< ref "api-management/traffic-transformation#request-headers-overview" >}}) middleware can be configured to add this header to the request prior to it being proxied to the upstream. To enhance security by restricting visibility of the access token, the key/token can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only the reference included in the middleware configuration.


## Request signing

Request Signing is an access token method that adds another level of security where the client generates a unique signature that identifies the request temporally to ensure that the request is from the requesting user, using a secret key that is never broadcast over the wire.

Tyk can apply either the symmetric Hash-Based Message Authentication Code (HMAC) or asymmetric Rivest-Shamir-Adleman (RSA) algorithms when generating the signature for a request to be sent upstream. For HMAC, Tyk supports different options for the hash length. 

The following algorithms are supported:

| Hashing algorithm | Tyk identifier used in API definition |
|-------------------|---------------------------------------|
| HMAC SHA1         | `hmac-sha1`                           |
| HMAC SHA256       | `hmac-sha256`                         |
| HMAC SHA384       | `hmac-sha384`                         |
| HMAC SHA512       | `hmac-sha512`                         |
| RSA SHA256        | `hmac-sha256`                         |

This feature is implemented using [Draft 10](https://tools.ietf.org/html/draft-cavage-http-signatures-10) RFC. The signatures generated according to this standard are temporal - that is, they include a time stamp. If there is no `Date` header in the request that is to be proxied to the upstream, Tyk will add one.

### Configuring Request Signing in the API derfinition
Upstream Authentication is configured per-API in the Tyk Vendor Extension by adding the authentication section within the `upstream` section.

For Request Signing, you must configure [upstream.authentication.upstreamRequestSigning]({{< ref "api-management/gateway-config-tyk-oas#upstreamrequestsigning" >}}), providing the following settings:

- the `signatureHeader` in which the signature should be sent (typically `Authorization`)
- the `algorithm` to be used to generate the signature (from the table above)
- the `secret` to be used in the encryption operation
- optional `headers` that Tyk should include in the string that is encrypted to generate the signature
- the `keyId` that the upstream will use to identify Tyk as the client (used for HMAC encryption)
- the `certificateId` that the upstream will use to identify Tyk as the client (used for RSA encryption) 

The Tyk Classic equivalent is [request_signing]({{< ref "api-management/gateway-config-tyk-classic#upstream-authentication" >}}).


<hr>

## Basic Authentication

Basic Authentication is a standard authentication mechanism implemented by HTTP servers, clients and web browsers. This makes it an excellent access control method for smaller APIs.

An API request made using Basic Authentication will have an `Authorization` header that contains the client's credentials in the form: `Basic <credentials>`.

The `<credentials>` are a base64 encoded concatenation of a client username and password, joined by a single colon `:`.

Tyk supports Basic Authentication as a method for authenticating **clients** with the **Gateway** - you can use Tyk Gateway or Dashboard to create Basic Auth users, as explained in the [documentation]({{< ref "api-management/client-authentication#protect-your-api-with-basic-authentication" >}}).

If your **upstream service** is protected using Basic Authentication then similarly, Tyk will need to provide user credentials, registered with the upstream, in the request.

### How to use Upstream Basic Authentication

If your upstream service requires that Tyk authenticates using Basic Authentication, you will first need to obtain a valid username and password from the server. To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only references included in the API definition.

If the incoming request from the client already has credentials in the `Authorization` header, then Tyk will replace those with the basic auth credentials before proxying onwards to the upstream.

Sometimes a non-standard upstream server might require the authentication credentials to be provided in a different header (i.e. not `Authorization`). With Tyk, you can easily configure a custom header to be used for the credentials if required.

Upstream Basic Authentication is only supported by Tyk OAS APIs. If you are using Tyk Classic APIs, you could create the client credential offline and add the `Authorization` header using the [Request Header Transform]({{< ref "api-management/traffic-transformation#request-headers-overview" >}}) middleware.

#### Configuring Upstream Basic Auth in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For Basic Authentication, you will need to add the `basicAuth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream basic authentication
- `username` is the username to be used in the request *credentials*
- `password` is the password to be used in the request *credentials*
- `header.enabled` must be set to `true` if your upstream expects the *credentials* to be in a custom header, otherwise it can be omitted to use `Authorization` header 
- `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-54"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-basic-auth",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-basic-auth/"
        }
    ],
    "security": [],
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-upstream-basic-auth",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-basic-auth/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/basic-auth/myUsername/mySecret",
            "authentication": {
                "enabled": true,
                "basicAuth": {
                    "password": "mySecret",
                    "username": "myUsername",
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

In this example upstream authentication has been enabled (line 44). Requests will be proxied to the `GET /basic-auth` endpoint at httpbin.org using the credentials in lines 46 and 47 (username: myUsername, password: mySecret). These credentials will be combined, base64 encoded and then provided in the `Authorization` header, as required by the httpbin.org [documentation](https://httpbin.org/#/Auth/get_basic_auth__user___passwd_").

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream Basic Authentication feature.

#### Configuring Upstream Basic Auth using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **Basic Auth** from the choice in the **Authentication Method** drop-down, then you can provide the client credentials and header name.

{{< img src="/img/dashboard/api-designer/upstream-basic-auth.png" alt="Tyk OAS API Designer showing Upstream Basic Auth configuration options" >}}

<hr>

## Upstream OAuth 2.0

OAuth 2.0 is an open standard authorization protocol that allows services to provide delegated and regulated access to their APIs; critically the user credentials are not shared with the upstream service, instead the client authenticates with a separate Authentication Server which issues a time-limited token that the client can then present to the upstream (Resource Server). The upstream service validates the token against the Authentication Server before granting access to the client.

The Authentication Server (auth server) has the concept of an OAuth Client - this is equivalent to the client's account on the auth server. There are different ways that a client can authenticate with the auth server, each with their own advantages and disadvantages for different use cases.

The auth server is often managed by a trusted third party Identity Provider (IdP) such as Okta or Auth0.

Tyk supports OAuth 2.0 as a method for authenticating **clients** with the **Gateway** - you can use Tyk's own auth server functionality via the [Tyk OAuth 2.0]({{< ref "api-management/client-authentication#use-tyk-as-an-oauth-20-authorization-server" >}}) auth method or obtain the access token via a third party auth server and use the [JWT Auth]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}) method.

If your **upstream service** is protected using OAuth 2.0 then similarly, Tyk will need to obtain a valid access token to provide in the request to the upstream.

Tyk supports two different OAuth grant types for connecting to upstream services:
- [Client credentials](#oauth-client-credentials)
- [Resource owner password credentials](#oauth-resource-owner-password-credentials)

#### OAuth client credentials

The client credentials grant relies upon the client providing an id and secret (the *client credentials*) to the auth server. These are checked against the list of OAuth Clients that it holds and, if there is a match, it will issue an access token that instructs the Resource Server which resources that client is authorized to access. For details on configuring Tyk to use Upstream Client Credentials see [below](#configuring-upstream-oauth-20-client-credentials-in-the-tyk-oas-api-definition).

#### OAuth resource owner password credentials

The resource owner password credentials grant (also known simply as **Password Grant**) is a flow where the client must provide both their own credentials (client Id and secret) and a username and password identifying the resource owner to the auth server to obtain an access token. Thus the (upstream) resource owner must share credentials directly with the client. This method is considered unsafe and is prohibited in the [OAuth 2.0 Security Best Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-13#section-3.4") but is supported by Tyk for use with legacy upstream services. For details on configuring Tyk to use Upstream Password Grant see [below](#configuring-upstream-oauth-20-password-grant-in-the-tyk-oas-api-definition).

### How to use Upstream OAuth 2.0 for Authentication

If your upstream service requires that Tyk authenticates via an OAuth auth server, you will first need to obtain credentials for the OAuth Client created in the auth server. You select which grant type to use and provide the required credentials in the API definition.

To enhance security by restricting visibility of the credentials, these can be stored in a [key-value store]({{< ref "tyk-self-managed#from-api-definitions" >}}), with only references included in the API definition.

Some auth servers will return *additional metadata* with the access token (for example, the URL of the upstream server that should be addressed using the token if this can vary per client). Tyk can accommodate this using the optional `extraMetadata` field in the API definition. The response from the auth server will be parsed for any fields defined in `extraMetadata`; any matches will be saved to the request context where they can be accessed from other middleware (for our example, the [URL rewrite]({{< ref "transform-traffic/url-rewriting#url-rewrite-middleware" >}}) middleware could be used to modify the upstream target URL).

#### Configuring Upstream OAuth 2.0 Client Credentials in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For OAuth 2.0 Client Credentials, you will need to add the `oauth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream OAuth authentication
- `allowedAuthorizeTypes` should include the value `clientCredentials`
- `clientCredentials` should be configured with:
    - `tokenUrl` is the URL of the `/token` endpoint on the *auth server*
    - `clientId` is the client ID to be provided to the *auth server*
    - `clientSecret` is the client secret to be provided to the *auth server*
    - `scopes` is an optional array of authorization scopes to be requested
    - `extraMetadata` is an optional array of additional fields to be extracted from the *auth server* response
    - `header.enabled` must be set to `true` if your upstream expects the credentials to be in a custom header, otherwise it can be omitted to use `Authorization` header 
    - `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-62"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-client-credentials",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-client-credentials/"
        }
    ],
    "security": [],
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-upstream-client-credentials",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-client-credentials/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/",
            "authentication": {
                "enabled": true,
                "oauth": {
                    "enabled": true,
                    "allowedAuthorizeTypes": [
                        "clientCredentials"
                    ],
                    "clientCredentials": {
                        "header": {
                            "enabled": true,
                            "name": "Authorization"
                        },
                        "tokenUrl": "http://<my-auth-server>/token",
                        "clientId": "client123",
                        "clientSecret": "secret123",
                        "scopes": ["scope1"],
                        "extraMetadata": ["instance_url"]
                    }
                }
            }
        }
    }
}
```

In this example upstream authentication has been enabled (line 44). The authentication method to be used is indicated in lines 46 (OAuth) and 48 (client credentials). When a request is made to the API, Tyk will request an access token from the *authorization server* at `http://<my-auth-server>` providing client credentials and the scope `scope1`.

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation#request-context-variables" >}})).

On receipt of an access token from the *authorization server*, Tyk will proxy the original request to the upstream server (`https://httpbin.org/`) passing the access token in the `Authorization` header.

If you replace the `upstream.url` and *authorization server* details with valid details, then the configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream OAuth 2.0 Client Credentials feature.

#### Configuring Upstream OAuth 2.0 Client Credentials using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **OAuth** from the choice in the **Authentication Method** drop-down, then you can provide the header name, authorization server token URL and select **Client Credentials** to reveal the configuration for the credentials to be passed to the auth server.

{{< img src="/img/dashboard/api-designer/upstream-oauth-client-credentials.png" alt="Tyk OAS API Designer showing Upstream OAuth client credentials configuration options" >}}

#### Configuring Upstream OAuth 2.0 Password Grant in the Tyk OAS API definition

Upstream Authentication is configured per-API in the Tyk extension (`x-tyk-api-gateway`) within the Tyk OAS API definition by adding the `authentication` section within the `upstream` section.

Set `upstream.authentication.enabled` to `true` to enable upstream authentication.

For OAuth 2.0 Resource Owner Password Credentials (*Password Grant*), you will need to add the `oauth` section within `upstream.authentication`.

This has the following parameters:
- `enabled` set this to `true` to enable upstream OAuth authentication
- `allowedAuthorizeTypes` should include the value `password`
- `password` should be configured with:
    - `tokenUrl` is the URL of the `/token` endpoint on the *auth server*
    - `clientId` is the client ID to be provided to the *auth server*
    - `clientSecret` is the client secret to be provided to the *auth server*
    - `username` is the Resource Owner username to be provided to the *auth server*
    - `password` is the Resource Owner password to be provided to the *auth server*
    - `scopes` is an optional array of authorization scopes to be requested
    - `extraMetadata` is an optional array of additional fields to be extracted from the *auth server* response
    - `header.enabled` must be set to `true` if your upstream expects the credentials to be in a custom header, otherwise it can be omitted to use `Authorization` header 
    - `header.name` is the custom header to be used if `header.enabled` is set to `true`

Note that if you use the [Tyk API Designer](#configuring-upstream-basic-auth-using-the-api-designer) in Tyk Dashboard it will always configure the `header` parameter - even if you are using the default `Authorization` value.

For example:

```json {hl_lines=["43-64"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-upstream-password-grant",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-upstream-password-grant/"
        }
    ],
    "security": [],
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-upstream-password-grant",
            "state": {
                "active": true
            }
        },
        "server": {
            "listenPath": {
                "strip": true,
                "value": "/example-upstream-password-grant/"
            }
        },
        "upstream": {
            "url": "https://httpbin.org/",
            "authentication": {
                "enabled": true,
                "oauth": {
                    "enabled": true,
                    "allowedAuthorizeTypes": [
                        "password"
                    ],
                    "password": {
                        "header": {
                            "enabled": true,
                            "name": "Authorization"
                        },
                        "tokenUrl": "http://<my-auth-server>/token",
                        "clientId": "client123",
                        "clientSecret": "secret123",
                        "username": "user123",
                        "password": "pass123",
                        "scopes": ["scope1"],
                        "extraMetadata": ["instance_url"]
                    }
                }
            }
        }
    }
}
```

In this example upstream authentication has been enabled (line 44). The authentication method to be used is indicated in lines 46 (OAuth) and 48 (password grant). When a request is made to the API, Tyk will request an access token from the *authorization server* at `http://<my-auth-server>` providing client credentials, resource owner credentials and the scope `scope1`.

Tyk will parse the response from the *authorization server* for the key `instance_url`, storing any value found in the *request context* were it can be accessed by other middleware as `$tyk_context.instance_url` (note the rules on accessing [request context variables from middleware]({{< ref "api-management/traffic-transformation#request-context-variables" >}})).

On receipt of an access token from the *authorization server*, Tyk will proxy the original request to the upstream server (`https://httpbin.org/`) passing the access token in the `Authorization` header.

If you replace the `upstream.url` and *authorization server* details with valid details, then the configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Upstream OAuth 2.0 Password Grant feature.

#### Configuring Upstream OAuth 2.0 Password Grant using the API Designer

Upstream Authentication is configured from the **Settings** tab of the Tyk OAS API Designer, where there is a dedicated section within the **Upstream** section.

Select **OAuth** from the choice in the **Authentication Method** drop-down, then you can provide the header name, authorization server token URL and select **Resource Owner Password Credentials** to reveal the configuration for the credentials to be passed to the auth server.

{{< img src="/img/dashboard/api-designer/upstream-oauth-password-grant.png" alt="Tyk OAS API Designer showing Upstream OAuth password grant configuration options" >}}
