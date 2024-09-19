---
description: Tyk Tools that help with automating deployment and API Management operations
linkTitle: Automation Tools
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Automation Tools
date: 2020-06-24
---


Tyk offers a powerful suite of tools and features to automate your API lifecycle management, enabling efficient, consistent, and secure API operations across multiple environments. This guide will walk you through automating various aspects of API management using Tyk's comprehensive toolset.

This page covers:
- Automating API management in Kubernetes environments with Tyk Operator
- Synchronizing Tyk configurations across different environments using Tyk Sync
- Programmatically managing Tyk resources via APIs
- Automating multi-environment deployments

Use Ctrl+F or the sidebar to quickly find specific topics. For example, search "Tyk Operator" for Kubernetes-based automation, "Tyk Sync" for configuration synchronization details.

## Prerequisites

Before diving into lifecycle automations with Tyk, ensure you have the following:

- A Tyk installation (Self-Managed or Cloud)
  - If you don't have Tyk installed, follow our [installation guide](https://tyk.io/docs/tyk-on-premises/installation/)
  - For Tyk Cloud, sign up [here](https://tyk.io/sign-up/)

- Access to a Kubernetes cluster (for Tyk Operator sections)
  - If you're new to Kubernetes, check out the official [Kubernetes documentation](https://kubernetes.io/docs/setup/)

- Helm (for installing Tyk Operator)
  - If you don't have Helm installed, follow the [official Helm installation guide](https://helm.sh/docs/intro/install/)
  - Verify your installation by running `helm version` in your terminal

- Tyk Dashboard access and API credentials
  - Learn how to set up the Tyk Dashboard [here](https://tyk.io/docs/tyk-dashboard/)
  - For API credentials, see our guide on [creating API tokens](https://tyk.io/docs/tyk-dashboard/managing-users/#create-an-api-token)

- Basic knowledge of Kubernetes, YAML, and API concepts
  - For Kubernetes, visit the [official tutorials](https://kubernetes.io/docs/tutorials/)
  - For YAML, check out this [YAML tutorial](https://yaml.org/spec/1.2/spec.html)
  - For API concepts, review our [API management basics](https://tyk.io/docs/getting-started/key-concepts/)

If you're missing any of these prerequisites, please follow the provided links to set up the necessary components before proceeding with the lifecycle automation steps.


## Getting Started

Before diving into the quick start guides for using the tyk-operator, take a look at these tables to get an overview of the API types, management features, authentication methods, and routing options supported by the Tyk Operator. This will help you understand which features are available, their supported versions, and how to implement them effectively in your setup.

### Tyk Operator Overview
Here is the continuation of the tables in markdown format with brief explanations:

#### API Types

| Type                           | Support | Supported From | Comments                     |
|--------------------------------|---------|----------------|------------------------------|
| HTTP                           | ✅      | v0.1           | Standard HTTP proxy for API requests. |
| HTTPS                          | ✅      | v0.4           | Secure HTTP proxy using SSL/TLS encryption. |
| TCP                            | ✅      | v0.1           | Handles raw TCP traffic, useful for non-HTTP APIs. |
| TLS                            | ✅      | v0.1           | Handles encrypted TLS traffic for secure communication. |
| GraphQL - Proxy                | ✅      | v0.1           | Proxy for GraphQL APIs, routing queries to the appropriate service. |
| Universal Data Graph v1        | ✅      | v0.1           | Supports Universal Data Graph v1 for unified data access. |
| Universal Data Graph v2        | ✅      | v0.12          | Supports the newer Universal Data Graph v2 for more advanced data handling. |
| GraphQL - Federation           | ✅      | v0.12          | Supports GraphQL Federation for querying multiple services as one API. |

#### Management of APIs

| Type                           | Support | Supported From | Comments                     |
|--------------------------------|---------|----------------|------------------------------|
| API Name                       | ✅      | v0.1           | Assign and manage names for your APIs. |
| API Status (inactive/active)   | ✅      | v0.2           | Toggle API status between active and inactive. |
| API Categories                 | ✅      | v0.1           | Categorize APIs for easier management. |
| API ID                         | ✅      | v0.1           | Assign unique IDs to APIs for tracking and management. |
| API Ownership                  | ✅      | v0.12          | Define ownership of APIs within teams or organizations. |
| API Versioning                 | ✅      | v0.1           | Enable version control for APIs. |

#### Traffic Routing

| Type                        | Supported | Supported From | Comments                     |
| --------------------------- | --------- | -------------- | ---------------------------- |
| Path-Based Proxy            | ✅        | v0.1           | Route traffic based on URL path. |
| Host-Based Proxy            | ✅        | v0.1           | Route traffic based on the request host. |
| Target URL                  | ✅        | v0.1           | Redirect traffic to a specific target URL. |

#### Client to Gateway Authentication and Authorization

| Type                          | Supported | Supported From | Comments                                        |
| ----------------------------- | --------- | -------------- | ----------------------------------------------- |
| Keyless                       | ✅        | v0.1           | No authentication required, open access.        |
| Auth Token                    | ✅        | v0.1           | Requires an authentication token (Bearer token).|
| JWT                           | ✅️        | v0.5           | Uses JSON Web Tokens for secure authentication. |
| OpenID Connect                | ❌        | -              | Recommended to use JWT for OIDC authentication. |
| OAuth2                        | ❌        | -              | OAuth2 not supported, JWT is recommended.       |
| Client mTLS                   | ✅        | v0.11          | Supports static client mutual TLS authentication. |
| HMAC                          | ❌        | -              | HMAC authentication is not implemented.         |
| Basic Authentication          | ✅        | v0.12          | Only supports enabling with default metadata.   |
| Custom Authentication Plugin (Go)   | ✅        | v0.11          | Custom authentication plugin written in Go.     |
| Custom Authentication Plugin (gRPC) | ✅        | v0.1           | Custom authentication plugin using gRPC.        |
| Multiple Authentication       | ✅        | v0.14          | Chain multiple authentication methods.          |
| IP Allowlist                  | ✅        | v0.5           | Allows access only from specific IP addresses.  |
| IP Blocklist                  | ✅        | v0.5           | Blocks access from specific IP addresses.       |

#### Gateway to Upstream Authentication

| Type                                            | Supported | Supported From | Comments                     |
|-------------------------------------------------|-----------|----------------|------------------------------|
| Upstream Certificates mTLS                      | ✅        | v0.9           | Mutual TLS authentication for upstream connections. |
| Public Key Certificate Pinning                  | ✅        | v0.9           | Ensures that the upstream certificate matches a known key. |
| Upstream Request Signing                        | ❌        | -              | Upstream request signing is not implemented. |

#### API-level (Global) Features

| Feature                              | Supported | Supported From | Comments                                                               |
|--------------------------------------|-----------|----------------|------------------------------------------------------------------------|
| Detailed recording (in Log Browser)  | ✅        | v0.4.0         | Records detailed API traffic logs for analysis. |
| Config Data                          | ✅        | v0.8.2         | Stores additional configuration data for APIs. |
| Context Variables                    | ✅        | v0.1           | Enables dynamic context-based variables in APIs. |
| Cross Origin Resource Sharing (CORS) | ✅        | v0.2           | Manages CORS settings for cross-domain requests. |
| Service Discovery                    | ⚠️         | -              | Service discovery is untested in this version. |
| Segment Tags                         | ✅        | v0.1           | Tags APIs for segmentation across environments. |
| Internal API (not exposed by Gateway)| ✅        | v0.6.0         | Internal APIs are not exposed via the Gateway. |
| Global (API-level) Header Transform  | ✅        | v0.1.0         | Transforms request and response headers at the API level. |
| Global (API-level) Rate Limit        | ✅        | v0.10          | Sets rate limits globally for APIs. |
| Custom Plugins                       | ✅        | v0.1           | Supports the use of custom plugins for API processing. |
| Analytics Plugin                     | ✅        | v0.16.0        | Integrates analytics plugins for API monitoring. |
| Batch Requests                       | ❌        | -              | Batch requests are not supported. |
| Custom Analytics Tags (Tag Headers)  | ✅        | v0.10.0        | Custom tags for API analytics data. |
| Expire Analytics After               | ❌        | -              | Not supported in this version. |
| Do not track Analytics (per API)     | ✅        | v0.1.0         | Disable analytics tracking on specific APIs. |
| Webhooks                             | ❌        | -              | Webhook support is not available. |
| Looping                              | ✅        | v0.6           | Enables internal looping of API requests. |
| Round Robin Load Balancing           | ✅        | -              | Supports round-robin load balancing across upstream servers. |

#### Endpoint-level Features

| Endpoint Middleware               | Supported | Supported From | Comments                                       |
|-----------------------------------|-----------|----------------|------------------------------------------------|
| Allow list                        | ✅️        | v0.8.2         | Allows requests only from approved sources.    |
| Block list                        | ✅️        | v0.8.2         | Blocks requests from disapproved sources.      |
| Cache                             | ✅        | v0.1           | Caches responses to reduce latency.            |
| Advance Cache                     | ✅        | v0.1           | Provides advanced caching capabilities.        |
| Circuit Breaker                   | ✅        | v0.5           | Prevents service overload by breaking circuits. |
| Track Endpoint                    | ✅        | v0.1           | Tracks API endpoint usage for analysis.        |
| Do Not Track Endpoint             | ✅        | v0.1           | Disables tracking for specific endpoints.      |
| Enforced Timeouts                 | ✅        | v0.1           | Ensures timeouts for long-running requests.    |
| Ignore Authentication             | ✅        | v0.8.2         | Bypasses authentication for selected endpoints.|
| Internal Endpoint                 | ✅        | v0.1           | Restricts access to internal services.         |
| URL Rewrite                       | ✅️        | v0.1           | Modifies request URLs before processing.       |
| Validate Request                  | ✅        | v0.8.2         | Validates incoming requests before forwarding. |
| Rate Limit                        | ❌        | -              | Rate limiting is not supported per endpoint.   |
| Request Size Limit                | ✅️        | v0.1           | Limits the size of requests to prevent overload.|
| Request Method Transform          | ✅        | v0.5           | Modifies HTTP methods for incoming requests.   |
| Request Header Transform          | ✅        | v0.1           | Transforms request headers.                    |
| Request Body Transform            | ✅        | v0.1           | Transforms request bodies for processing.      |
| Request Body JQ Transform         | ⚠️         | v0.1           | Requires JQ support on the Gateway Docker image.|
| Response Header Transform         | ✅        | v0.1           | Transforms response headers.                   |
| Response Body Transform           | ✅        | v0.1           | Transforms response bodies.                    |
| Response Body JQ Transform        | ⚠️         | v0.1           | Requires JQ support on the Gateway Docker image.|
| Mock Response                     | ✅        | v0.1           | Simulates API responses for testing.           |
| Virtual Endpoint                  | ✅        | v0.1           | Allows creation of dynamic virtual endpoints.  |
| Per-Endpoint Plugin               | ❌        | -              | Plugin support per endpoint is not available.  |
| Persist Graphql                   | ❌        | -              | Not supported in this version.                 |


### Set up Tyk Operator in your Kubernetes cluster

Tyk Operator extends Kubernetes with custom resources to manage Tyk APIs declaratively. Here's how to install it:

1. Install Tyk Operator using Helm:

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
helm install tyk-operator tyk-helm/tyk-operator
```

This command adds the Tyk Helm repository, updates it, and installs the Tyk Operator in your Kubernetes cluster.

2. Verify the installation:

```bash
kubectl get pods | grep tyk-operator
```

This command lists all pods in your cluster, filtering for the Tyk Operator pod. You should see the pod running.

### Create your first API using Tyk Operator

Creating an API takes the same approach whether you are using Tyk Open Source or Self Managed. First, specify the details of your API using the ApiDefinition CRD, then deploy it to create the corresponding Kubernetes resource. Tyk Operator will take control of the CRD and create the actual API in the Tyk data plane.


#### Create an ApiDefinition resource in YAML format
Create a file called `httpbin.yaml`, then add the following:

```yaml
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

You can also use other sample files from `our repository`.

#### Deploy the ApiDefinition resource
We are going to create an ApiDefinition from the httpbin.yaml file, by running the  following command:

```console
$ kubectl apply -f httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
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
EOF
```

The ApiDefinition resource is created. You can verify by the following command:

```console
$ kubectl get tykapis
NAME      DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
httpbin            /httpbin     http://httpbin.org   true
```

You can make a request to verify that your API is working:

```bash
$ curl -i localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-62161e8c-2a1ece436633f2e42129be2a"
  },
  "origin": "127.0.0.1, 176.88.45.17",
  "url": "http://httpbin.org/get"
}
```
## Automate API Management in Kubernetes Environments

Tyk Operator allows you to manage your entire API lifecycle using Kubernetes resources. This section covers declarative API management and automated security configuration.

### Declarative API Management

You might already have realized that our `httpbin` API is keyless. If you check the APIDefinition's specification, the `use_keyless` field is set to `true`.
Tyk keyless access represents completely open access for your API and causes Tyk to bypass any session-based middleware (middleware that requires access to token-related metadata). Keyless access will enable all requests through.
You can disable keyless access by setting `use_keyless` to false. 

#### Update your `httpbin.yaml` file

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: false
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

#### Apply yaml to your K8s Instance

```bash
kubectl apply -f httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
    name: httpbin
spec:
    name: httpbin
    use_keyless: false
    protocol: http
    active: true
    proxy:
        target_url: http://httpbin.org
        listen_path: /httpbin
        strip_listen_path: true
EOF
```

If you have set `use_keyless` to false, the default authentication mode is Authentication token.

Now, to access `httpbin` API, you need to include a key to the header. Otherwise, you will get a `HTTP 401 Unauthorized` response.


```curl
curl -i localhost:8080/httpbin/get
HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Thu, 03 Mar 2022 15:47:30 GMT
Content-Length: 46

{
    "error": "Authorization field missing"
}%
```

#### Create an API key

You need to generate a key to access the `httpbin` API now. Follow [this guide](https://tyk.io/docs/getting-started/create-api-key/) to see how to create an API key for your installation. If you’re using Tyk Open Source, you will need to obtain the API name and API ID that you grant the key access to first.

You can obtain the API name and API ID of our example `httpbin` API by following command:

```yaml
kubectl describe tykapis httpbin
Name:         httpbin
Namespace:    default
Labels:       <none>
Annotations:  <none>
API Version:  tyk.tyk.io/v1alpha1
Kind:         ApiDefinition
Metadata:
  ...
Spec:
  ...
  Name: httpbin
  ...
Status:
  api_id:  ZGVmYXVsdC9odHRwYmlu
Events:    <none>
```

You can obtain the API name and API ID from `name` and `status.api_id` field.

In our example, it is as follows:

- {API-NAME}: httpbin
- {API-ID}: ZGVmYXVsdC9odHRwYmlu

When you have successfully created a key, you can use it to access the `httpbin` API.

```curl
curl -H "Authorization: Bearer {Key ID}" localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "Bearer {Key ID}",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-6221de2a-01aa10dd56f6f13f420ba313"
  },
  "origin": "127.0.0.1, 176.42.143.200",
  "url": "http://httpbin.org/get"
}
```


### Automate API Security Configuration

In this section, you will Automate API security using Kubernetes CRDs and YAML files.
This involves:
* Creating a Policy resource in YAML format
* Deploy security policies with kubectl to enforce rate limits, quotas, and throttling.
* Manage access controls with path-based permissions.
* Streamline policy management using tags, metadata, and quick verification.


#### Create a SecurityPolicy resource in YAML format

Create a file called `ratelimit.yaml`, then add the following:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: httpbin
spec:
  name: Rate Limit, Quota and Throttling policy
  state: active
  active: true
  access_rights_array:
    - name: httpbin
      namespace: default
      versions:
        - Default
  quota_max: 10
  quota_renewal_rate: 60
  rate: 5
  per: 5
  throttle_interval: 2
  throttle_retry_limit: 2
```

You can link this Security Policy to any APIs you have defined in `access_rights_array`. In this example, the security policy is applied to `httpbin` API in `default` namespace.

#### Deploy the SecurityPolicy resource
You can do so by applying the above manifest:

```console
$ kubectl apply -f ratelimit.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin protected
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
  use_standard_auth: true
  auth_configs:
    authToken:
      auth_header_name: Authorization
---
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: httpbin
spec:
  name: Rate Limit, Quota and Throttling policy
  state: active
  active: true
  access_rights_array:
    - name: httpbin
      namespace: default
      versions:
        - Default
  quota_max: 10
  quota_renewal_rate: 60
  rate: 5
  per: 5
  throttle_interval: 2
  throttle_retry_limit: 2
EOF
```

To check that policy has been created, you can run the following command:

```console
$ kubectl get securitypolicy
NAME      AGE
httpbin   10s
```

You have successfully created the  `httpbin` security policy for your `httpbin` API. 

#### Security Policy CRD

You can use SecurityPolicy CRD to set access lists for API and versions, global usage quota, rate limits, and throttling, and also add tags and metadata:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy            # SecurityPolicy CRD
metadata:
  name: httpbin                 # Unique k8s name
spec:
  name: Httpbin Security Policy # Generic Name
  state: active                 # View securitypolicy_types for more info
  active: true                  # View securitypolicy_types for more info
  access_rights_array:          # Adding APIs to the Policy. More info just below
    - name: httpbin             # Metadata name of API
      namespace: default
      versions:
        - Default               # Mandatory, Default is created automatically
      allowed_urls:             # Path-based permissions
        - url: /get
          methods:
            - GET
  quota_max: 10
  quota_renewal_rate: 60
  rate: 5
  per: 5
  throttle_interval: 2
  throttle_retry_limit: 2
  tags:
    - Hello
    - World
  meta_data:
    key: value
    hello: world
```


Required fields in the policy:

- `name`: The name of the security policy.
- `active`: Marks policy as active.
- `state`: It can have value `active, draft,deny`.

Access lists for API and versions:

- `access_right_array`: The list of APIs security policy has access to.

Path-based permissions for API:

- `allowed_urls`: Restrict access per path and per method to specific portions of the API

Usage Quota fields:

- `quota_max`: The maximum number of allowed requests over a quota period.
- `quota_renewal_rate`: Time, in seconds, after which quota will be renewed.

Rate limiting fields:

- `rate`: The number of the requests to allow per period.
- `per`: Time in seconds.

Throttling fields:

- `throttle_interval`: Interval (in seconds) between each request retry.
- `throttle_retry_limit`: Total requests retry number.

Tags:

- `tags`: List of tags.

Meta data:

- `meta_data`: Metadata key and values.



### Quick Start Guides for Different API Types

Tyk Operator supports various API types, allowing you to automate the creation and management of diverse API architectures. Below, we'll explore how to set up HTTP, TCP, Universal Data Graph (UDG), and GraphQL APIs using Tyk Operator.

#### HTTP Proxy

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
#### HTTP Host-based Proxy
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

#### HTTPS Proxy

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

#### TCP APIs

TCP APIs are useful for non-HTTP protocols, such as database connections or custom TCP-based services.

To set up a TCP API:

1. Create a file named `tcp-api.yaml`:

```yaml {hl_lines=["8-11"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: redis-tcp
spec:
  name: redis-tcp
  active: true
  protocol: tcp
  listen_port: 6380
  proxy:
    target_url: tcp://localhost:6379
```

This configuration sets up a TCP proxy listening on port 27017.

2. Apply the YAML:

```bash
kubectl apply -f tcp-api.yaml
```

3. Verify the API:

```bash
kubectl get apidefiniton tcp-echo
```

4. Test using a TCP client like netcat:

```bash
echo "Hello, TCP!" | nc <gateway-host> 27017
```

Ensure your Kubernetes cluster allows TCP traffic on the specified port.

#### Universal Data Graph (UDG) APIs

UDG allows you to create a GraphQL API from multiple data sources, including REST APIs.

To create a UDG API:

1. Create a file named `udg-api.yaml`:

If you are on Tyk 3.2 and above, you can use the following manifest to create an UDG API. This example configures a Universal Data Graph from a GraphQL datasource and a REST Datasource.

```yaml {hl_lines=["20-39", "46-80"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph v2a
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }
      type Query {
        countries: [Country]
      }
      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: Int
      }
    version: "2"
    last_schema_update: "2022-10-12T14:27:55.511+03:00"
    type_field_configurations: []
    playground:
      enabled: true
      path: /playground
    engine:
      field_configs:
        - disable_default_mapping: false
          field_name: countries
          path:
            - "countries"
          type_name: Query
        - disable_default_mapping: true #very important for rest APIs
          field_name: restCountry
          path: []
          type_name: Country
      data_sources:
        - kind: "GraphQL"
          name: "countries"
          internal: false
          root_fields:
            - type: Query
              fields:
                - "countries"
          config:
            url: "https://countries.trevorblades.com/"
            method: "POST"
            headers: {}
            body: ""
        - kind: "REST"
          internal: false
          name: "restCountries"
          root_fields:
            - type: "Country"
              fields:
                - "restCountry"
          config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: "GET"
            body: ""
            headers: {}
```
##### UDG v1 (Tyk 3.1 or before)
If you are on Tyk 3.1, you can use the following manifest to create an UDG API. This example creates a Universal Data Graph with GraphQL datasource and HTTP JSON datasource.
```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph Example
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }
      type Query {
        countries: [Country]
      }
      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: String
      }
    type_field_configurations:
      - type_name: Query
        field_name: countries
        mapping:
          disabled: false
          path: countries
        data_source:
          kind: GraphQLDataSource
          data_source_config:
            url: "https://countries.trevorblades.com"
            method: POST
            status_code_type_name_mappings: []
      - type_name: Country
        field_name: restCountry
        mapping:
          disabled: true
          path: ""
        data_source:
          kind: HTTPJSONDataSource
          data_source_config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: GET
            default_type_name: RestCountry
            status_code_type_name_mappings:
              - status_code: 200
    playground:
      enabled: true
      path: /playground
```
This setup creates a simple UDG API that resolves the `hello` query using httpbin.org's `/get` endpoint.

2. Apply the YAML:

```bash
kubectl apply -f udg-api.yaml
```

3. Verify the API:

```bash
kubectl get apidefiniton udg-api
```

4. Test the GraphQL endpoint:

```bash
curl -X POST http://<gateway-host>:<port>/udg/graphql \
     -H "Content-Type: application/json" \
     -d '{"query": "{ hello }"}'
```

#### GraphQL APIs

For existing GraphQL services, Tyk can act as a proxy, adding authentication and rate limiting.

To set up a GraphQL API:

1. Create a file named `graphql-api.yaml`:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: graphql-api
spec:
  name: GraphQL API
  active: true
  protocol: http
  proxy:
    target_url: http://graphql-engine:8080
    listen_path: /graphql
  graphql:
    enabled: true
    execution_mode: proxyOnly
    schema: |
      type Query {
        hello: String!
      }
```

This configuration proxies requests to an existing GraphQL server.

2. Apply the YAML:

```bash
kubectl apply -f graphql-api.yaml
```

3. Verify the API:

```bash
kubectl get apidefiniton graphql-api
```

4. Test the GraphQL endpoint:

```bash
curl -X POST http://<gateway-host>:<port>/graphql \
     -H "Content-Type: application/json" \
     -d '{"query": "{ hello }"}'
```



## Synchronize Tyk Environment With GitHub Repository

Tyk Sync is a powerful tool for exporting and importing Tyk configurations, enabling you to synchronize settings across different environments.

### Set up Tyk Sync
#### Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

#### Docker

To install Tyk Sync using Docker, follow these steps:

##### Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v1.5.0, use the following command:

```bash
SYNC_VERSION=v1.5.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All docker images are available on the [Tyk Sync Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags) page.

##### Run Tyk Sync

```bash
SYNC_VERSION=v1.5.0
docker run tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```

If you want to dump your API configurations to the local file system or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```bash
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```
Replace [command] with the specific Tyk Sync command you want to execute.


#### Specifying target Tyk installation

##### Tyk Dashboard
For Dashboard users, you can provide the necessary connection details using the `--dashboard` and `--secret` options.

```bash
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to the API access key use to access your Dashboard API. For dashboard users, you can get it from the “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

##### Open Source Gateway
For open source Gateway users, you can provide the necessary connection details using the `--gateway` and `--secret` options.

```bash
tyk-sync --gateway <GATEWAY_URL> --secret <SECRET> [command] [flags]
```

GATEWAY_URL is the fully qualified gateway target URL (e.g. `http://localhost:8080`) and SECRET refers to the API secret (`secret` parameter in your tyk.conf file) used to access your Gateway API.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_GW_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_GW_SECRET=<SECRET>
tyk-sync --gateway <GATEWAY_URL> [command] [flags]
```

2. Export configurations from your development environment:

```bash
tyk-sync dump -d http://localhost:3000 -s <dashboard-secret> -t dev-backup
```

This command exports all configurations from your development Tyk Dashboard to a local directory named `dev-backup`.

3. Import configurations to your staging environment:

```bash
tyk-sync publish -d http://staging-dashboard:3000 -s <staging-secret> -p dev-backup
```

This command imports the configurations from the `dev-backup` directory to your staging Tyk Dashboard.


### Tyk Sync Commands

#### Dump Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync dump`                                                                                       |
| **Usage**     | ```tyk-sync dump -d DASHBOARD_URL [-s SECRET] [-t PATH]```                                                 |
| **Flags**     | `-d, --dashboard DASHBOARD_URL`: Tyk Dashboard URL (required)<br>                                    `-h, --help`: Help for the dump command<br>                                   `-t, --target PATH`: Target directory for output files (optional)<br>                                    `-s, --secret SECRET`: API secret for Dashboard access (optional)<br>                                    `--apis IDS`: Specific API IDs to dump<br>                                    `--oas-apis IDS`: Specific OAS API IDs to dump<br>                                    `--policies IDS`: Specific policy IDs to dump<br>                                    `--templates IDS`: Specific template IDs to dump |
| **Example**   | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret ```|
| **Example** | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret --target /path/to/backup --apis c2ltcGxlLWdyYXBoLWRldi90eWthcGktc2NoZW1h,baa5d2b65f1b45385dac3aeb658fa04c ``` |

#### Examples Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync examples`                                                                                   |
| **Usage**     | ```tyk-sync examples [flags]```<br>```tyk-sync examples [command]```                                           |
| **Subcommands**| `publish`: Publish a specific example<br> `show`: Show details of a specific example              |
| **Flags**     | `-h, --help`: Help for examples command                                                             |
| **Example**   | ```tyk-sync examples ```                                                                         |

#### Examples Show Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples show```                                                                              |
| **Usage**     | ```tyk-sync examples show [flags]```                                                                      |
| **Flags**     | `-h, --help`: Help for show command<br> `-l, --location string`: Location of the example           |
| **Example**   | ```tyk-sync examples show --location="udg/vat-checker" ```                                       |

#### Examples Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples publish```                                                                           |
| **Usage**     | ```tyk-sync examples publish [flags]```                                                                   |
| **Flags**     | `-b, --branch string`: Branch to use (default "refs/heads/main")<br> `-d, --dashboard string`: Dashboard target URL<br> `-g, --gateway string`: Gateway target URL<br> `-h, --help`: Help for publish command<br> `-k, --key string`: Key file location for auth<br> `-l, --location string`: Location of the example<br> `-s, --secret string`: API secret<br> `--test`: Use test publisher, output to stdio |
| **Example**   | ```tyk-sync examples publish -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -l="udg/vat-checker" ``` |

#### Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync publish```                                                                                    |
| **Usage**     | ```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     |  `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for publish command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to publish<br> `--oas-apis IDS`: Specific OAS API IDs to publish<br> `--policies IDS`: Specific policy IDs to publish<br> `--templates IDS`: Specific template IDs to publish |
| **Example**   | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23 ```|
| **Example** | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

#### Sync Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync sync`                                                                                       |
| **Usage**     | ```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for sync command<br> `-k, --key SSHKEY`: SSH key file location<br> `-o, --org ORG_ID`: Override organization ID<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to sync (to be deprecated)<br> `--policies IDS`: Specific policy IDs to sync (to be deprecated) |
| **Example**   | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo/your-apis ```|
| **Example** | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret -p /path/to/your/apis ``` |

#### Update Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync update`                                                                                     |
| **Usage**     | ```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for update command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to update<br> `--oas-apis IDS`: Specific OAS API IDs to update<br> `--policies IDS`: Specific policy IDs to update<br> `--templates IDS`: Specific template IDs to update |
| **Example**   | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23```|
| **Example** | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |



## Using Tyk APIs to Manage Resources

Tyk provides comprehensive APIs for programmatic management of resources. Here's an example of creating an API using the Dashboard API.

### Create an API using the Dashboard API

```bash
curl -H "Authorization: ${DASHBOARD_USER_API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "api_definition": {
      "name": "Test API",
      "slug": "test-api",
      "auth": {
        "auth_header_name": "Authorization"
      },
      "version_data": {
        "not_versioned": true,
        "versions": {
          "Default": {
            "name": "Default"
          }
        }
      },
      "proxy": {
        "listen_path": "/test-api/",
        "target_url": "http://httpbin.org/",
        "strip_listen_path": true
      },
      "active": true
    }
  }' https://admin.cloud.tyk.io/api/apis
```

This curl command sends a POST request to the Tyk Dashboard API to create a new API. The JSON payload defines the API's properties, including its name, authentication settings, and proxy configuration.

## Automate Multi-Environment Deployments

Automating deployments across multiple environments ensures consistency and reduces manual errors. Here's how to set up a basic CI/CD pipeline using GitHub Actions.

### Set up a CI/CD pipeline for API deployment

1. Create a `.github/workflows/deploy-apis.yml` file:

```yaml
name: Deploy APIs
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Install Tyk Sync
      run: |
        go install github.com/TykTechnologies/tyk-sync
    - name: Deploy to Tyk
      run: |
        tyk-sync sync -d ${{ secrets.TYK_DASHBOARD_URL }} -s ${{ secrets.TYK_DASHBOARD_SECRET }} -p ./
```

This GitHub Actions workflow file defines a job that runs on every push to the main branch. It installs Tyk Sync and uses it to synchronize your API configurations with your Tyk Dashboard.

2. Configure your GitHub repository secrets with your Tyk Dashboard URL and secret.

In your GitHub repository settings, add two secrets:
- `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard
- `TYK_DASHBOARD_SECRET`: Your Tyk Dashboard API secret


## Troubleshooting and FAQ

### Tyk Operator changes not applied

**Problem:** Changes made through Tyk Operator are not reflected in your Tyk installation.

**Solution:**

1. Check Kubernetes events:
   ```bash
   kubectl get events --sort-by=.metadata.creationTimestamp
   ```
   This command shows recent events in your cluster, which may provide clues about why the changes weren't applied.

2. Verify Operator logs:
   ```bash
   kubectl logs -l app=tyk-operator
   ```
   This command shows logs from the Tyk Operator pod, which may contain error messages or other useful information.

### How are Tyk configurations synchronized to Git?

Tyk Sync allows you to dump configurations to a local directory, which can then be committed to a Git repository. This enables version control and easy synchronization across environments.

For example:
1. Dump configurations: `tyk-sync dump -d http://dashboard:3000 -s secret -t ./configs`
2. Commit to Git: 
   ```
   cd configs
   git add .
   git commit -m "Update Tyk configurations"
   git push
   ```

### Can I sync multiple APIs to a single Git repository?

Yes, you can store multiple API definitions, policies, and other Tyk resources in a single Git repository. Tyk Sync and Tyk Operator can work with multiple resources in the same directory.

Your repository structure might look like this:
```
tyk-configs/
├── apis/
│   ├── api1.yaml
│   └── api2.yaml
├── policies/
│   ├── policy1.yaml
│   └── policy2.yaml
└── tyk-operator/
    └── operator-context.yaml
```

### How do I handle environment-specific configurations?

Use Tyk Operator's `OperatorContext` resource to define environment-specific variables. You can also use Kubernetes secrets and ConfigMaps to manage sensitive or environment-specific data.

Example `OperatorContext`:
```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: production-context
spec:
  env:
    TYK_DB_ORGID: "prod-org-id"
    TYK_DB_APIAUTH: "prod-api-secret"
```

This YAML defines environment-specific variables for a production context, which can be referenced in your API definitions and policies.


### Can I use Tyk Operator with multiple Tyk installations?

Yes, you can use Tyk Operator to manage multiple Tyk installations. You'll need to create separate `OperatorContext` resources for each installation:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: prod-context
spec:
  env:
    TYK_MODE: pro
    TYK_URL: http://tyk-gateway-prod:8080
    TYK_AUTH: prod-secret
---
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: staging-context
spec:
  env:
    TYK_MODE: pro
    TYK_URL: http://tyk-gateway-staging:8080
    TYK_AUTH: staging-secret
```

Then, you can specify which context to use in your API and Policy resources:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: my-api
spec:
  name: My API
  context: prod-context
  # ... other API configuration
```

### How do I roll back changes made with Tyk Sync?

To roll back changes made with Tyk Sync:

1. If you're using Git, check out the previous version of your configurations:
   ```bash
   git checkout <previous-commit-hash>
   ```

2. Use Tyk Sync to publish the previous version:
   ```bash
   tyk-sync sync -d http://dashboard:3000 -s <secret> -p ./
   ```

It's a good practice to maintain separate branches or tags for different environments to make rollbacks easier.

### Can I use Tyk Operator with non-Kubernetes Tyk installations?

While Tyk Operator is designed to work within a Kubernetes environment, you can still use it to manage non-Kubernetes Tyk installations. You'll need to:

1. Run Tyk Operator in a Kubernetes cluster.
2. Configure the `OperatorContext` to point to your external Tyk installation:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: external-tyk
spec:
  env:
    TYK_MODE: pro
    TYK_URL: http://external-tyk-gateway:8080
    TYK_AUTH: external-secret
```

This allows you to manage your external Tyk installation using Kubernetes resources.

### How do I migrate from Tyk Classic to Tyk OAS definitions?

To migrate from Tyk Classic to Tyk OAS definitions:

1. Export your existing API definitions using Tyk Sync:
   ```bash
   tyk-sync dump -d http://dashboard:3000 -s <secret> -t ./classic-apis
   ```

2. Use the Tyk OAS Converter tool (if available) or manually convert your Classic definitions to OAS format.

3. Update your CI/CD pipelines and Tyk Operator configurations to work with the new OAS definitions.

4. Gradually replace Classic definitions with OAS definitions in your Tyk installation.

