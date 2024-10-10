---
title: Upstream mTLS
tags: ["mTLS"]
description: "How to send upstream requests with a mTLS protected API"
menu:
  main:
    parent: "Mutual TLS"
weight: 2
---

If your upstream API is protected with mutual TLS you can configure Tyk to send requests with the specified client certificate. 

- You can specify one certificate per host and define a default certificate. 
- Upstream certificates can be defined on API definition level or globally (via Gateway configuration file). 
- Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware. 


## How To Set Up

### Via API Definition

Inside your API definition you should set the `upstream_certificates` field to the following format:
`{"example.com": "<cert-id>"}`. Defining on a global level looks the same, but should be specified via the `security.certificates.upstream` field in your Gateway configuration file.


### Via Dashboard

To do the same via the Tyk Dashboard, go to the **API Designer** > **Advanced Options** panel > **Upstream certificates** section.

{{< img src="/img/2.10/attach_upstream_cert.png" alt="upstream_cert" >}}

### Via Tyk Operator using the Tyk Classic API Definition{#tyk-operator-classic}

Tyk Operator supports configuring upstream mTLS using one of the following fields within the ApiDefinition object:

- **upstream_certificate_refs**: Configure using certificates stored within Kubernetes secret objects.
- **upstream_certificates**: Configure using certificates stored within Tyk Dashboard's certificate store.

#### upstream_certificate_refs

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

#### upstream_certificates

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

### Via Tyk Operator using Tyk OAS API Definition{#tyk-operator-oas}
Tyk Operator supports configuring upstream mTLS using the `mutualTLS` field in `TykOasApiDefinition` object:

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

## Domain

Do **NOT** include the protocol or Tyk will not match your certificates to the correct domain.   

 For example: 
 
 ❌ `https://api.production.myupstream.com` 

 ✅ `api.production.myupstream.com`

 You need to include the port if the request is made via a non-standard HTTP port.

 ✅ `api.production.myupstream.com:8443`


## Wild Cards

You may use wild cards in combination with text to match the domain, but it only works one level deep.

Example, if your domain is `api.production.myupstream.com`

 ✅ `*.production.myupstream.com`  
 
 ❌ `*.myupstream.com`

#### Default Upstream Cert

To set a default client certificate, use `*` instead of domain name: `{"*": "<cert-id>"}`
