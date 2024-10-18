---
date: 2017-03-23T17:01:35Z
title: Certificate Pinning
tags: ["Certificates", "Pinning"]
description: "How to use Certificate pinning with Tyk"
menu:
  main:
    parent: "Security"
weight: 7 
aliases:
  - /basic-config-and-security/security/certificate-pinning/
---

Certificate pinning is a feature which allows you to allow only specific public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

Using Tyk you can allow one or multiple public keys per domain. Wildcard domains are also supported.

Public keys are stored inside the Tyk certificate storage, so you can use Certificate API to manage them.

## Define via Gateway Config file or API Definition

You can define them globally, from the Tyk Gateway configuration file - `tyk.conf` using the `security.pinned_public_keys` option, or via an API definition `pinned_public_keys` field, using the following format:
```
{
  "example.com": "<key-id>",
  "foo.com": "/path/to/pub.pem",
  "*.wild.com": "<key-id>,<key-id-2>"
}
```

For `key-id` you should set the ID returned after you upload the public key using the Certificate API. Additionally, you can just set path to the public key located on your server. You can specify multiple public keys by separating their IDs by a comma.

{{< note success >}}
**Note**  

Only public keys in PEM format are supported.
{{< /note >}}

If public keys are not provided by your upstream, you can extract them
by yourself using the following command:
```{.copyWrapper}
openssl s_client -connect httpbin.org:443 -servername httpbin.org 2>/dev/null | openssl x509 -pubkey -noout
```
If you already have a certificate, and just need to get its public key, you can do it using the following command:
```{.copyWrapper}
openssl x509 -pubkey -noout -in cert.pem
```

{{< note success >}}
**Note**  

Upstream certificates now also have wildcard domain support.
{{< /note >}}


## Define with the Dashboard

You can define certificate public key pinning from the **Advanced** tab of the API Designer.

{{< img src="/img/2.10/cert_public_key_pinning.png" alt="Certificate Pinning" >}}

1. Click **Attach Certificate**
{{< img src="/img/2.10/add_public_keys.png" alt="Pinning Options" >}}
1. From the **Add upstream certificates** options add the domain details and then add a new certificate ID or the server path to a certificate, or select from any certificates you have added previously.
2. Click **Add**

## Define via Tyk Operator (Tyk Classic){#tyk-operator-classic}

Tyk Operator supports configuring certificate pinning using one of the following fields within the ApiDefinition object:

- **pinned_public_keys**: Use public keys uploaded via the Certificate API.
- **pinned_public_keys_refs**: Uses public keys configured from Kubernetes secret objects.

### pinned_public_keys

Use the `pinned_public_keys` mapping to pin public keys to specific domains, referencing public keys that have been uploaded to Tyk Certificate storage via the Certificate API.  

```yaml
pinned_public_keys:
  "foo.com": "<key_id>",
  "*": "<key_id-1>,<key_id-2>"
```

Each `key-id` value should be set to the ID returned from uploading the public key via the Certificate API. Multiple public keys can be specified by separating their IDs by a comma.

### pinned_public_keys_refs

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

## Define via Tyk Operator (Tyk OAS){#tyk-operator-oas}

Tyk Operator supports certificate pinning in Tyk OAS custom resource, allowing you to secure your API by pinning a public key stored in a secret to a specific domain.

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