---
date: 2017-03-24T16:39:31Z
title: Sample HTTP Proxy
tags: ["Tyk Operator", "Sample", "Kubernetes"]
description: "Tyk Operator manifest example"
---

This page provides some sample manifests for creating different types of HTTP proxy APIs. Follow these examples to learn how to configure your APIs.

## HTTP Proxy

This example creates a basic API definition that routes requests to listen path `/httpbin` to target URL `http://httpbin.org`.

Traffic routing can be configured under `spec.proxy`:
- `target_url` defines the upstream address (or target URL) to which requests should be proxied.
- `listen_path` is the base path on Tyk to which requests for this API should be sent. Tyk listens out for any requests coming into the host at this path, on the port that Tyk is configured to run on and processes these accordingly. For example, `/api/` or `/` or `/httpbin/`.
- `strip_listen_path` removes the inbound listen path (as accessed by the client) when generating the outbound request for the upstream service. For example, consider the scenario where the Tyk base address is `http://acme.com/`, the listen path is `example/` and the upstream URL is `http://httpbin.org/`: If the client application sends a request to `http://acme.com/example/get` then the request will be proxied to `http://httpbin.org/example/get`

```yaml {hl_lines=["10-13"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

## HTTP Host-based Proxy

`spec.domain` is the domain to bind this API to. This enforces domain matching for client requests.

In this example, requests to `httpbin.tyk.io` will be proxied to upstream URL `http://httpbin.org`

```yaml {hl_lines=["10-10"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  domain: httpbin.tyk.io
  proxy:
    target_url: http://httpbin.org
    listen_path: /
    strip_listen_path: true
```

## HTTPS Proxy

This example creates a API definition that routes requests to a http://httpbin.org via port 8443.

```yaml {hl_lines=["35-38"],linenos=false}
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: { }
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-test-cert
spec:
  secretName: my-test-tls
  dnsNames:
    - foo.com
    - bar.com
  privateKey:
    rotationPolicy: Always
  issuerRef:
    name: selfsigned-issuer
    # We can reference ClusterIssuers by changing the kind here.
    # The default value is Issuer (i.e. a locally namespaced Issuer)
    kind: Issuer
    # This is optional since cert-manager will default to this value however
    # if you are using an external issuer, change this to that issuer group.
    group: cert-manager.io
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: https
  listen_port: 8443
  certificate_secret_names:
    - my-test-tls
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```