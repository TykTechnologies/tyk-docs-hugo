---
title: Upstream Authentication using Mutual TLS
tags:
    - security
    - upstream authentication
    - gateway to upstream
    - mTLS
    - mutual tls
description: How to authenticate upstream service using mutual tls
date: "2025-04-15"
aliases:
  - /basic-config-and-security/security/mutual-tls/upstream-mtls
---

## Mutual TLS (mTLS)

If your upstream API is protected with [mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls/client-mtls#why-use-mutual-tls" >}}) then Tyk must provide a certificate when connecting to the upstream service and also will need to verify the certificate presented by the upstream. This ensures secure communication between Tyk and your upstream services.

When Tyk performs an mTLS handshake with an upstream, it needs to know:

- which client certificate Tyk should use to identify itself
- which public key (certificate) that Tyk should use to verify the identity of the upstream

We use a system of [mapping certificates]({{< ref "#mapping-certificates-to-domains" >}}) to upstreams based on their host domain. This is used for both the [client certificate]({{< ref "#upstream-client-certificates" >}}) and, optionally, for the [upstream public key]({{< ref "#upstream-server-certificates" >}}) if we want to use specific certificates to protect against compromised certificate authorities (CAs).

#### Upstream mTLS for Tyk middleware and plugins

If upstream mTLS certificates are configured for an API, they will not be used for direct proxies to the upstream and will also automatically be used for any HTTP requests made from the [JavaScript Virtual Endpoint]({{< ref "api-management/traffic-transformation/virtual-endpoints" >}}) middleware. They will **not** be used for HTTP requests from custom plugins.


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

If you want to restrict the public keys that can be used by the upstream service, then you can use [certificate pinning]({{< ref "api-management/upstream-authentication/mtls#certificate-pinning" >}}) to store a list of certificates that Tyk will use to verify the upstream.

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

If you want to [pin the public certificates]({{< ref "api-management/upstream-authentication/mtls#certificate-pinning" >}}) that can be used by Tyk when verifying the upstream service, then you should enable **Public certificates** and attach certificates in the same manner as for the client certificates:

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

