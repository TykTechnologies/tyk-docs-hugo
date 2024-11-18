---
title: "Configure Tyk Operator as Ingress Controller "
tags: ["Tyk Operator", "Kubernetes", "Ingress", "Ingress Controller"]
description: "Configure Tyk Operator as Ingress Controller"
aliases: 
  - "/tyk-oss/ce-kubernetes-ingress"
---

In a Kubernetes environment, networking is essential for managing how external traffic accesses services within a cluster. Kubernetes provides an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource to manage these incoming connections. An Ingress is an API object that defines the rules for routing external HTTP and HTTPS traffic to services within the Kubernetes cluster, based on the domain name, path, or other HTTP headers.

To implement these routing rules, Kubernetes relies on an [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). The Ingress Controller is a component that reads the Ingress resources' configurations and provisions the necessary underlying network infrastructure to handle traffic according to these rules. Traditional Ingress Controllers like NGINX or HAProxy offer basic traffic management features, such as SSL termination and simple load balancing, but they often lack more advanced API management functionalities.

**Tyk Operator** provides a seamless migration path for organizations that are already using Kubernetes Ingress resources. It allows you to reuse existing Ingress definitions while enhancing them with powerful API management features offered by Tyk. By adopting Tyk Operator as your Ingress Controller, you can retain your current Ingress configurations and gain access to a robust suite of API management tools, including authentication, rate limiting, request transformation, monitoring, and analytics.

This approach ensures minimal disruption to your existing setup while allowing you to leverage Tyk’s advanced capabilities, thereby providing both ingress traffic management and API gateway functions within a unified solution.

## How Tyk Operator Works as an Ingress Controller

When you use Tyk Operator as an Ingress Controller, each "path" defined in your existing Ingress resource is treated as an "API" within Tyk. 

Using this Ingress spec as example:

```yaml{hl_lines=["6-8", "13-13", "15-24"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # Specify Tyk as Ingress Controller
    tyk.io/template: myapideftemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: ApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
spec:
  tls:
    - hosts:
        - myingress.do.poc.tyk.technology
      secretName: httpbin-ingress-tls
  rules:
  - host: myingress.do.poc.tyk.technology
    http:
      paths:
      - path: /httpbin             # Corresponds to API listen path
        pathType: Prefix
        backend:                   # Corresponds to upstream URL
          service:
            name: httpbin
            port:
              number: 8000
```

Here's how it works:

- **Path Mapping**: Tyk Operator will automatically create APIs in Tyk for each path for a specific rule defined in Ingress resource. Just as with traditional Ingress, incoming requests are routed to the correct backend service within the cluster based on the host and paths defined in the Ingress rules.

  In the given example, Tyk Operator is designated as the Ingress Controller for this Ingress resource. Tyk Operator reads this Ingress definition and automatically creates a corresponding API in the Tyk Gateway. The API will have:
    
    - A **custom domain** set to `myingress.do.poc.tyk.technology`, as defined by the `host` field in the Ingress rule.
    - The TLS certificate from secret `httpbin-ingress-tls` uploaded to Tyk and **certificates** field set to the resulting certificate ID.
    - A **listen path** set to `/httpbin`, which is defined by the `path` field in the Ingress rule.
    - An **upstream URL** set to `http://httpbin.default.svc:8000`, which corresponds to the backend service defined in the Ingress (`httpbin` service running on port `8000`).

- **API Management Through Tyk**: At the same time, Tyk allows you to apply API management features by referencing a configuration template. This template is defined using either an `ApiDefinition` or `TykOasApiDefinition` resource. These resources provide a reference configuration that includes details on how the API should be managed, such as security policies, traffic controls, and transformations.

  In the given example, there are two important annotations in the Ingress metadata:

  ```yaml
    annotations:
      tyk.io/template: myapideftemplate
      tyk.io/template-kind: ApiDefinition
  ```

  These annotations specify that Tyk Operator should use a resource named `myapideftemplate` in the same namespace as the reference for API configuration. The `tyk.io/template-kind` annotation indicates that this reference is of type `ApiDefinition`. Alternatively, it could be a `TykOasApiDefinition`, depending on the user's choice. Tyk Operator detects these annotations and looks for the specified resource in the same namespace. For each path defined in the Ingress, Tyk Operator creates a corresponding API in Tyk by copying the specification from `myapideftemplate` resource (such as authentication type, rate limiting, etc.) and then updates only the relevant fields like custom domain, certificates, listen path, and upstream URL based on the Ingress spec.

  Note that `ApiDefinition` or `TykOasApiDefinition` created for use as a template for Ingress resources should have a special label set so that Tyk Operator would not manage it as ordinary APIs. Here is the required label for `ApiDefinition` and `TykOasApiDefinition` respectively:

  Label for `ApiDefinition` indicating it is a resource template.

  ```yaml
    labels:
      template: "true"
  ```

  Label for `TykOasApiDefinition` indicating it is a resource template.

  ```yaml
    labels:
      tyk.io/ingress-template: "true"
  ```

- **Automated Resource Handling**: Tyk Operator handles the automatic discovery and management of existing Ingress resources, eliminating the need for manual migration of all Ingress rules into API definitions. You can simply define an API configuration template as a `TykOasApiDefinition` resource or `ApiDefinition` resource and then let Tyk Operator creates all the APIs from your existing Ingress rules using the referenced resource as template, streamlining the transition process.

  Additionally, the Tyk Operator also handles any changes to the Ingress resources it manages. If an Ingress resource is updated — whether through the addition, removal, or modification of paths in the Ingress rules — Tyk Operator automatically reconfigures the corresponding Tyk APIs to ensure they remain in sync with the updated Ingress configuration. This dynamic updating capability ensures that your API management remains consistent and up-to-date with the latest changes in your Kubernetes environment.

This approach enables you to quickly and easily integrate advanced API management functionalities into your existing Kubernetes environment without needing to change your current configurations significantly.

## Configuration Examples

To configure Tyk Operator to handle Ingress resources, first create a `ApiDefinition` or `TykOasApiDefinition` resource template. The template provides default API configurations. Next, specify ingress class as `tyk` in the Ingress resource. This allows Tyk Operator to read the Ingress resource and create API Definition resources
based on ingress path and referenced template.

The following sections shows some example of Tyk `ApiDefinition` or `TykOasApiTemplate` template and Ingress specification.

### HTTP host based and/or path based routing

<details>
  <summary>Click to expand</summary>

```yaml {hl_lines=["6-7", "10-48"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
spec:
  rules:
    - host: httpbin.ahmet
      http:
        paths:
          - path: / # host routing: http://httpbin.ahmet/
            pathType: Prefix
            backend:
              service:
                name: httpbin1
                port:
                  number: 8000
          - path: /httpbin # host + path routing: http://httpbin.ahmet/httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin2
                port:
                  number: 8000
    - http:
        paths:
          - path: /pathonly  # path only routing: http://IPADDRESS/pathonly
            pathType: Prefix
            backend:
              service:
                name: httpbin3
                port:
                  number: 8000
    - host: "*.foo.com" # wildcard
      # curl http://bar.foo.com/httpbin/get === OK Matches based on shared suffix
      # curl http://baz.bar.foo.com/httpbin/get === NOK No match, wildcard only covers a single DNS label
      # curl http://foo.com/httpbin/get === NOK No match, wildcard only covers a single DNS label
      http:
        paths:
          - path: /httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin4
                port:
                  number: 8000
```

In this example, 4 APIs will be created by Tyk Operator. It illustrates how different Ingress rules: host based routing, path based routing, host + path based routing, and wildcard hosts are handled by Tyk Operator.

| API Name | Custom Domain | Listen Path | Target URL | Example request that would be handled by this API |
|----------|---------------|-------------|------------|---------------------------------------------------|
| default-httpbin-ingress-a1863f096         |  httpbin.ahmet |  /          |  http://httpbin1.default.svc.cluster.local:8000 | http://httpbin.ahmet/  |
| default-httpbin-ingress-d33713b8b |  httpbin.ahmet |  /httpbin   |  http://httpbin2.default.svc.cluster.local:8000 | http://httpbin.ahmet/httpbin |
| default-httpbin-ingress-00254eeb0             |                |  /pathonly  |  http://httpbin3.default.svc.cluster.local:8000 | http://IPADDRESS/pathonly |
| default-httpbin-ingress-3af1fef04 |  {?:[^.]+}.foo.com  | /httpbin | http://httpbin4.default.svc:8000 | http://bar.foo.com/httpbin |

</details>

### HTTPS with cert-manager integration

<details>
  <summary>Click to expand</summary>

```yaml {hl_lines=["7-7", "13-13", "15-24", "58-58"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-ingress-tls
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    cert-manager.io/cluster-issuer: "letsencrypt-staging" # this annotation indicates the issuer to use.
    acme.cert-manager.io/http01-edit-in-place: "true"
spec:
  tls: 
    - hosts: # < placing a host in the TLS config will determine what ends up in the cert's subjectAltNames
        - myingress.do.poc.tyk.technology
      secretName: httpbin-ingress-tls-secret # < cert-manager will store the created certificate in this secret.
  rules:
    - host: myingress.do.poc.tyk.technology
      http:
        paths:
          - path: /httpbin
            pathType: Prefix
            backend:
              service:
                name: httpbin
                port:
                  number: 8000
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: ahmet@tyk.io
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
      - http01:
          ingress:
            class: tyk
---
apiVersion: v1
kind: Service
metadata:
  name: ingress-gateway
  namespace: tyk
spec:
  ports:
    - name: http
      targetPort: 8000
      port: 80
      protocol: TCP
    - name: https
      targetPort: 443
      port: 443
      protocol: TCP
  selector:
    app: gateway-tyk-stack-tyk-gateway
  type: LoadBalancer
  externalTrafficPolicy: Local
```

A common use-case for [cert-manager](https://cert-manager.io/docs/usage/ingress/) is requesting TLS signed certificates to secure your ingress resources. This can be done by simply adding [annotations](https://cert-manager.io/docs/usage/ingress/#supported-annotations), such as `cert-manager.io/cluster-issuer`, to your Ingress resources and cert-manager will facilitate creating the `Certificate` resource for you. 

In this example, cert-manager watches the ingress resource `httpbin-ingress-tls` and ensures a TLS secret named `httpbin-ingress-tls-secret` (provided by the `tls.secretName` field) in the same namespace will be created and configured as described on the Ingress. This example also exposes Tyk Gateway as a `LoadBalancer` service with the `ingress-gateway` resource. This is essential for completing the ACME challenge from [Let\'s Encrypt](https://letsencrypt.org).

With this configuration, Tyk Gateway can serve HTTPS requests via port 443, with a TLS certificate provisioned by cert-manager. An API is created by Tyk Operator to serve the ingress traffic at https://myingress.do.poc.tyk.technology/httpbin, and forwards the request to http://httpbin.default.svc:8000 within the cluster.

</details>

### ApiDefinition Template

<details>
  <summary>Click to expand</summary>

```yaml{hl_lines=["5-6"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
 name: myapideftemplate
 labels:
  template: "true" # Instructs Tyk Operator to skip reconciliation for this resource
spec:
 name: foo
 protocol: http
 use_keyless: true
 proxy:
  target_url: http://example.com
```

This example defines an `ApiDefinition` resource that can be used as configuration template for APIs created for Ingresses. It has a label `template: "true"` which let Tyk Operator knows that it is not a real resource, and hence does not require reconciliation. This will allow the ApiDefinition to be stored inside Kubernetes as a resource, but will not reconcile the ApiDefinition inside Tyk. All mandatory fields inside the ApiDefinition spec are still mandatory, but can be replaced with placeholders as they will be overwritten by the Ingress reconciler.

```yaml{hl_lines=["7-8"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    tyk.io/template: myapideftemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: ApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
...
```

To make use of the ApiDefinition template, make sure to add annotations `tyk.io/template` and `tyk.io/template-kind` to your Ingress resource. Here, we specify that the template to be used is named "myapideftemplate", and the resource represents a Tyk Classic API "ApiDefinition".

</details>

### TykOasApiDefinition Template

<details>
  <summary>Click to expand</summary>

```yaml{hl_lines=["39-40"],linenos=true}
apiVersion: v1
data:
  test_oas.json: |-
    {
        "info": {
          "title": "OAS Template",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "OAS Template",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "http://example"
          },
          "server": {
            "listenPath": {
              "value": "/example/",
              "strip": true
            }
          }
        }
      }
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: oasapitemplate
  labels:
    tyk.io/ingress-template: "true"
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

Here provides a minimum template as `TykOasApiDefinition`. The `TykOasApiDefinition` must have a label `tyk.io/ingress-template: "true"` so that Tyk Operator will not reconcile it with Tyk.

```yaml{hl_lines=["7-8"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
    tyk.io/template: oasapitemplate # The metadata name of the ApiDefinition or TykOasApiDefinition resource in the same namespace
    tyk.io/template-kind: TykOasApiDefinition # Can be "ApiDefinition" (Default) or "TykOasApiDefinition"
...
```

To make use of the TykOasApiDefinition template, make sure to add annotations `tyk.io/template` and `tyk.io/template-kind` to your Ingress resource. Here, we specify that the template to be used is named "oasapitemplate", and the resource represents a Tyk OAS API "TykOasApiDefinition".

</details>

## Ingress Class

The value of the `kubernetes.io/ingress.class` annotation identifies the IngressClass that will process Ingress objects.

Tyk Operator by default looks for the value `tyk` and will ignore all other ingress classes. If you wish to override this default behavior,
 you may do so by setting the environment variable `WATCH_INGRESS_CLASS` in the operator manager deployment. [See Installing Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) for further information.

## API name

Tyk Ingress Controller will create APIs in Tyk for each path defined for a specific rule in Ingress resource. Each API created inside Tyk will follow a special naming convention as follows:

```
<ingress_namespace>-<ingress_name>-<hash(Host + Path)>
```

For example, the following ingress resource will create an ApiDefinition called `default-httpbin-ingress-78acd160d` inside Tyk's Gateway.
ApiDefinition's name comes from:

- `default`: The namespace of this Ingress resource,
- `httpbin-ingress`: The name of this Ingress resource,
- `78acd160d`: Short hash (first 9 characters) of Host (`""`) and Path (`/httpbin`). The hash algorithm is SHA256.

```yaml{hl_lines=["4-4"],linenos=true}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
 name: httpbin-ingress
 annotations:
  kubernetes.io/ingress.class: tyk # <----------------- REFERENCES TYK INGRESS CONTROLLER
  tyk.io/template: myapideftemplate # <---------------- REFERENCE TO APIDEFINITION IN SAME NAMESPACE
spec:
 rules:
  - http:
     paths:
      - path: /httpbin
        pathType: Prefix
        backend:
         service:
          name: httpbin
          port:
           number: 8000
```

## Ingress Path Types

Each path in an Ingress must have its own particular path type. Kubernetes offers three types of path types: `ImplementationSpecific`, `Exact`, and `Prefix`. Currently, not all path types are supported. The below table shows the unsupported path types for sample HTTP Ingress Resource based on the examples in the [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/#examples).

| Kind   | Path(s)   | Request path(s) | Expected to match?               | Works as Expected                       |
|--------|-----------|-----------------|----------------------------------|-----------------------------------------|
| Exact  | /foo      | /foo/           | No                               | No.                                     |
| Prefix | /foo/     | /foo, /foo/     | Yes                              | No, /foo/ matches, /foo does not match. |
| Prefix | /aaa/bb   | /aaa/bbb        | No                               | No, the request forwarded to service.   |
| Prefix | /aaa/bbb/ | /aaa/bbb        | Yes, ignores trailing slash      | No, /aaa/bbb does not match.            |
| Prefix | /aaa/bbb  | /aaa/bbbxyz     | No, does not match string prefix | No, the request forwarded to service.   |

Please bear in mind that if `proxy.strip_listen_path` is set to true on API Definition, Tyk strips the listen-path (for example, the listen-path for the Ingress under sample HTTP Ingress Resource is /httpbin) with an empty string.

The following table shows an example of path matching if the listen-path is set to `/httpbin` or `/httpbin/`.

| Kind                   | Path(s)   | Request path(s)           | Matches?                                              |
|------------------------|-----------|---------------------------|-------------------------------------------------------|
| Exact                  | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    |
| Prefix                 | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    | 
| ImplementationSpecific | /httpbin  | /httpbin, /httpbin/       | Yes. The request forwarded as `/` to your service.    |
| Exact                  | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. |
| Prefix                 | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. | 
| ImplementationSpecific | /httpbin  | /httpbinget, /httpbin/get | Yes. The request forwarded as `/get` to your service. |
| Exact                  | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. |
| Prefix                 | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. | 
| ImplementationSpecific | /httpbin/ | /httpbin/,  /httpbin/get  | Yes. The request forwarded as `/get` to your service. |
| Exact                  | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           |
| Prefix                 | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           |  
| ImplementationSpecific | /httpbin/ | /httpbin                  | No. Ingress cannot find referenced service.           | 
