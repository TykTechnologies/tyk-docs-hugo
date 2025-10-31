---
title: "Create and Secure an API with Tyk Operator"
tags: ["Tyk Operator", "Kubernetes", "API Management"]
description: "Learn how to create an API using Tyk Operator in Kubernetes"
---

## Introduction

Tyk Operator allows you to manage your Tyk APIs, policies, and other configurations using Kubernetes Custom Resource Definitions (CRDs). This page will help you create an API using Tyk Operator.

## Set Up Tyk OAS API
Setting up OpenAPI Specification (OAS) APIs with Tyk involves preparing an OAS-compliant API definition and configuring it within your Kubernetes cluster using Tyk Operator. This process allows you to streamline API management by storing the OAS definition in a Kubernetes ConfigMap and linking it to Tyk Gateway through a TykOasApiDefinition resource. 

### Create your Tyk OAS API
#### Prepare the Tyk OAS API Definition
First, you need to have a complete Tyk OAS API definition file ready. This file will contain all the necessary configuration details for your API in OpenAPI Specification (OAS) format.

Here is an example of what the Tyk OAS API definition might look like. Note that Tyk extension `x-tyk-api-gateway` section should be present.

```json {hl_lines=["9-25"],linenos=true}
{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}
```

Save this API definition file (e.g., `oas-api-definition.json`) locally.

{{< note success >}}
**Tips**  

You can create and configure your API easily using Tyk Dashboard in a developer environment, and then obtain the Tyk OAS API definition following these instructions:

1. Open the Tyk Dashboard
2. Navigate to the API you want to manage with the Tyk Operator
3. Click on the "Actions" menu button and select "View API Definition."
4. This will display the raw Tyk OAS API definition of your API, which you can then copy and save locally.
{{< /note >}}

#### Create a ConfigMap for the Tyk OAS API Definition

You need to create a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-object) in Kubernetes to store your Tyk OAS API definition. The Tyk Operator will reference this ConfigMap to retrieve the API configuration.

To create the ConfigMap, run the following command:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk
```

This command creates a ConfigMap named `tyk-oas-api-config` in the `tyk` namespace (replace `tyk` with your actual namespace if different).

{{< note success >}}
**Notes**

There is inherent size limit to a ConfigMap. The data stored in a ConfigMap cannot exceed 1 MiB. In case your OpenAPI document exceeds this size limit, it is recommended to split your API into smaller sub-APIs for easy management. For details, please consult [Best Practices for Describing Large APIs](https://learn.openapis.org/best-practices.html#describing-large-apis) from the OpenAPI initiative.
{{< /note >}}

{{< note success >}}
**Notes**

If you prefer to create ConfigMap with a manifest using `kubectl apply` command, you may get an error that the annotation metadata cannot exceed 256KB. It is because by using `kubectl apply`, `kubectl` automatically saves the whole configuration in the annotation [kubectl.kubernetes.io/last-applied-configuration](https://kubernetes.io/docs/reference/labels-annotations-taints/#kubectl-kubernetes-io-last-applied-configuration) for tracking changes. Your Tyk OAS API Definition may easily exceed the size limit of annotations (256KB). Therefore, `kubectl create` is used here to get around the problem.
{{< /note >}}

#### Create a TykOasApiDefinition Custom Resource

Now, create a `TykOasApiDefinition` resource to tell the Tyk Operator to use the Tyk OAS API definition stored in the ConfigMap.

Create a manifest file named `tyk-oas-api-definition.yaml` with the following content:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: tyk-oas-api-config   # Metadata name of the ConfigMap resource that stores the Tyk OAS API Definition
      namespace: tyk             # Metadata namespace of the ConfigMap resource
      keyName: oas-api-definition.json # Key for retrieving Tyk OAS API Definition from the ConfigMap
```

#### Apply the TykOasApiDefinition Manifest

Use `kubectl` to apply the `TykOasApiDefinition` manifest to your cluster:

```sh
kubectl apply -f tyk-oas-api-definition.yaml
```

This command creates a new `TykOasApiDefinition` resource in your cluster. The Tyk Operator will watch for this resource and configures Tyk Gateway or Tyk Dashboard with a new API using the provided Tyk OAS API definition.

#### Verify the Tyk OAS API Creation

To verify that the API has been successfully created, check the status of the TykOasApiDefinition resource:

```sh
kubectl get tykoasapidefinition petstore
```

You should see the status of the resource, which will indicate if the API creation was successful.

```bash
NAME       DOMAIN   LISTENPATH   PROXY.TARGETURL                  ENABLED   SYNCSTATUS   INGRESSTEMPLATE
petstore            /petstore/   https://petstore.swagger.io/v2   true      Successful
```

#### Test the Tyk OAS API
After the Tyk OAS API has been successfully created, you can test it by sending a request to the API endpoint defined in your OAS file.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

#### Manage and Update the Tyk OAS API
To make any changes to your API configuration, update the OAS file in your ConfigMap and then re-apply the ConfigMap using `kubectl replace`:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk --dry-run=client -o yaml | kubectl replace -f -
```

The Tyk Operator will automatically detect the change and update the API in the Tyk Gateway.

{{< note success >}}
**Notes**

`kubectl replace` without `--save-config` option is used here instead of `kubectl apply` because we do not want to save the Tyk OAS API definition in its annotation. If you want to enable `--save-config` option or use `kubectl apply`, the Tyk OAS API definition size would be further limited to at most 262144 bytes.
{{< /note >}}

#### Tyk OAS API Example
This example shows the minimum resources and fields required to define a Tyk OAS API using Tyk Operator. 

```yaml{hl_lines=["7-7", "41-44"],linenos=true}
apiVersion: v1
kind: ConfigMap
metadata:
  name: cm
  namespace: default
data:
  test_oas.json: |-
    {
        "info": {
          "title": "Petstore",
          "version": "1.0.0"
        },
        "openapi": "3.0.3",
        "components": {},
        "paths": {},
        "x-tyk-api-gateway": {
          "info": {
            "name": "Petstore",
            "state": {
              "active": true
            }
          },
          "upstream": {
            "url": "https://petstore.swagger.io/v2"
          },
          "server": {
            "listenPath": {
              "value": "/petstore/",
              "strip": true
            }
          }
        }
      }
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

Here, a `ConfigMap` is created that contains the Tyk OAS API Definition with the `data` field with key `test_oas.json`. This is linked to from a `TykOasApiDefinition` resource via `spec.tykOAS.configmapRef`.

To apply it, simply save the manifest into a file (e.g., `tyk-oas-api.yaml`) and use `kubectl apply -f tyk-oas-api.yaml` to create the required resources in your Kubernetes cluster. This command will create the necessary ConfigMap and TykOasApiDefinition resources in the `default` namespace.



### Secure your Tyk OAS API
#### Update your Tyk OAS API Definition

First, you'll modify your existing Tyk OAS API Definition to include the API key authentication configuration.

When creating the Tyk OAS API, you stored your OAS definition in a file named `oas-api-definition.json` and created a ConfigMap named `tyk-oas-api-config` in the `tyk` namespace.

Modify your Tyk OAS API Definition `oas-api-definition.json` as follow. 

```json {hl_lines=["8-14","16-20","33-40"],linenos=true}
{
  "info": {
    "title": "Petstore protected",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {
    "securitySchemes": {
      "petstore_auth": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "petstore_auth": []
    }
  ],
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "authentication": {
        "enabled": true,
        "securitySchemes": {
          "petstore_auth": {
            "enabled": true
          }
        }
      },
      "listenPath": {
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}
```

In this example, we added the following sections to configure key authentication for this API. 

- `components.securitySchemes` defines the authentication method (in this case, `apiKey` in the header).
- `security`: Applies the authentication globally to all endpoints.
- `x-tyk-api-gateway.server.authentication`: Tyk-specific extension to enable the authentication scheme.

You can configure your API for any Tyk supported authentication method by following the [Client Authentication]({{< ref "api-management/client-authentication">}}) documentation.

Save your updated API definition in the same file, `oas-api-definition.json`.

#### Update the ConfigMap with the new Tyk OAS API Definition

Update the existing ConfigMap that contains your Tyk OAS API Definition with the following command:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk --dry-run=client -o yaml | kubectl replace -f -
```

This command updates the existing ConfigMap named `tyk-oas-api-config` in the `tyk` namespace (replace `tyk` with your actual namespace if different) with the new Tyk OAS API Definition stored in `oas-api-definition.json`.

Since a `TykOasApiDefinition` resource has been created with reference to this ConfigMap in the previous tutorial:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  tykOAS:
    configmapRef:
      name: tyk-oas-api-config   # Metadata name of the ConfigMap resource that stores the Tyk OAS API Definition
      namespace: tyk             # Metadata namespace of the ConfigMap resource
      keyName: oas-api-definition.json # Key for retrieving Tyk OAS API Definition from the ConfigMap
```

Any changes in the ConfigMap would be detected by Tyk Operator. Tyk Operator will then automatically reconcile the changes and update the API configuration at Tyk.

#### Verify the changes

Verify that the `TykOasApiDefinition` has been updated successfully:

```sh
kubectl get tykoasapidefinition petstore -o yaml
```

Look for the `latestTransaction` field in `status`:

```yaml
status:
  latestTransaction:
    status: Successful
    time: "2024-09-16T11:48:20Z"
```

The **Successful** status shows that Tyk Operator has reconciled the API with Tyk successfully. The last update time is shown in the `time` field.

#### Test the API Endpoint
Now, test your API endpoint to confirm that it requires an API key.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl -v "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

Request should fail with a `401 Unauthorized` response now as an API key is required for access. Your API has been secured by Tyk Gateway.

## Set Up Tyk Classic API

### Create a Tyk Classic API
First, specify the details of your API using the [ApiDefinition CRD]({{< ref "api-management/automations/operator#apidefinition-crd" >}}), then deploy it to create the corresponding Kubernetes resource. Tyk Operator will take control of the CRD and create the actual API in the Tyk data plane.

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

You can also use other sample files from the following pages:

- [HTTP Proxy example]({{< ref "tyk-stack/tyk-operator/create-an-api#set-up-manifest-for-http" >}})
- [TCP Proxy example]({{< ref "#set-up-manifest-for-tcp" >}})
- [GraphQL Proxy example]({{< ref "#set-up-manifest-for-graphql" >}})
- [UDG example]({{< ref "#set-up-manifest-for-udg" >}})

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

#### Understanding the ApiDefinition CRD

We have an ApiDefinition called `httpbin`, as specified in `spec.name` field, which listens to path `/httpbin` and proxies requests to [http://httpbin.org](http://httpbin.org), as specified under `spec.proxy` field. Now, any requests coming to the `/httpbin` endpoint will be proxied to the target URL that we defined in `spec.proxy.target_url`, which is [http://httpbin.org](http://httpbin.org) in our example.

You can visit the [ApiDefinition CRD]({{< ref "api-management/automations/operator#apidefinition-crd" >}}) page to see all the latest API Definitions fields and features we support.

#### Configure Kubernetes service as an upstream target

Tyk Gateway deployed in your Kubernetes cluster can easily access other Kubernetes services as an upstream proxy target.
In the ApiDefinition manifest, set the `proxy.target_url` as a Kubernetes Service following [DNS for Services and Pods guideline](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/), so that the requests will be proxied to your service.
In general, Kubernetes Services have a `<service-name>.<namespace-name>`.svc.cluster.local DNS entry once they are created.
For example, if you have a service called `httpbin` in `default` namespace, you can contact `httpbin` service with `httpbin.default.svc` DNS record in the cluster, instead of IP addresses.
Please visit the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) for more details.
Suppose you want to create a Deployment of [httpbin](https://hub.docker.com/r/kennethreitz/httpbin/) service using [ci/upstreams/httpbin.yaml](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml) file. You are going to expose the application through port `8000` as described under the Service [specification](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml#L10).
You can create Service and Deployment by either applying the manifest defined in our repository:

```console
$ kubectl apply -f ci/upstreams/httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  ports:
    - name: http
      port: 8000
      targetPort: 80
  selector:
    app: httpbin
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
      version: v1
  template:
    metadata:
      labels:
        app: httpbin
        version: v1
    spec:
      containers:
        - image: docker.io/kennethreitz/httpbin
          imagePullPolicy: IfNotPresent
          name: httpbin
          ports:
            - containerPort: 80
EOF
```

You need to wait until all pods reach READY `1/1` and STATUS `Running` state.
Once the pod is ready, you can update your `httpbin` API's `target_url` field to proxy your requests to the Service that you created above.
You can check all services in the `<ns>` namespace as follows:

```console
$ kubectl get service -n <ns>
```

You can update your `httpbin` as follows:

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
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```

Pay attention to the value of the `spec.proxy.target_url` field.
It is set to `http://httpbin.default.svc:8000` by following the convention described above (`<service_name>.<namespace>.svc:<service_port>`).
Now, if you send your request to the `/httpbin` endpoint of the Tyk Gateway, the request will be proxied to the `httpbin Service`:

```curl
curl -sS http://localhost:8080/httpbin/headers
{
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.default.svc:8000", 
    "User-Agent": "curl/7.68.0"
  }
}
```

As you can see from the response, the host that your request should be proxied to is `httpbin.default.svc:8000`.

### Secure your Classic API
#### Update your API to Require a Key

You might already have realized that our `httpbin` API is keyless. If you check the APIDefinition's specification, the `use_keyless` field is set to `true`.
Tyk keyless access represents completely open access for your API and causes Tyk to bypass any session-based middleware (middleware that requires access to token-related metadata). Keyless access will enable all requests through.
You can disable keyless access by setting `use_keyless` to false. 

1. Update your `httpbin.yaml` file

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

2. Apply the changes

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
}
```

{{< note success >}}

**Note**  

Tyk Operator supported authentication types are listed in the [API Definition features]({{< ref "api-management/automations/operator#apidefinition-crd" >}}) section.

{{< /note >}}

#### Create an API key

You need to generate a key to access the `httpbin` API now. Follow [this guide]({{< ref "getting-started/configure-first-api#create-an-api-key" >}}) to see how to create an API key for your installation. 

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

- API-NAME: httpbin
- API-ID: ZGVmYXVsdC9odHRwYmlu

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
Since you have provided a valid key along with your request, you do not get a `HTTP 401 Unauthorized` response.


### Set Up Tyk Classic API Authentication
Client to Gateway Authentication in Tyk ensures secure communication between clients and the Tyk Gateway. Tyk supports various authentication methods to authenticate and authorize clients before they can access your APIs. These methods include API keys, Static Bearer Tokens, JWT, mTLS, Basic Authentication, and more. This document provides example manifests for each authentication method supported by Tyk.

#### Keyless (Open)

This configuration allows [keyless (open)]({{< ref "basic-config-and-security/security/authentication-authorization/open-keyless" >}}) access to the API without any authentication.

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

#### Auth Token (Bearer Token)

This setup requires a [bearer token]({{< ref "api-management/authentication/bearer-token" >}}) for access.

In the below example, the authentication token is set by default to the `Authorization` header of the request. You can customize this behavior by configuring the following fields:

- `use_cookie`: Set to true to use a cookie value for the token.
- `cookie_name`: Specify the name of the cookie if use_cookie is enabled.
- `use_param`: Set to true to allow the token to be passed as a query parameter.
- `param_name`: Specify the parameter name if use_param is enabled.
- `use_certificate`: Enable client certificate. This allows you to create dynamic keys based on certificates.
- `validate_signature`: Enable [signature validation]({{< ref "api-management/authentication/bearer-token#auth-token-with-signature" >}}).

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

#### JWT

This configuration uses [JWT tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens">}}) for authentication.

Users can configure JWT authentication by defining the following fields:

- `jwt_signing_method`: Specify the method used to sign the JWT. Refer to the documentation on [JWT Signatures]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#signature-validation">}}) for supported methods.
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

#### Basic Authentication

This configuration uses [Basic Authentication]({{< ref "api-management/authentication/basic-authentication" >}}), requiring a username and password for access.

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

#### Custom Plugin Auth (go)

This configuration uses a [Golang plugin]({{< ref "api-management/plugins/golang#" >}}) for custom authentication. The following example shows how to create an API definition with a Golang custom plugin for `httpbin-go-auth`.

For an example of Golang authentication middleware, see [Performing custom authentication with a Golang plugin]({{< ref "api-management/plugins/golang#performing-custom-authentication-with-a-golang-plugin" >}}).

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

#### Custom Plugin Auth (gRPC)

This configuration uses a [gRPC plugin]({{< ref "api-management/plugins/golang#" >}}) for custom authentication. The following example shows how to create an API definition with a gRPC custom plugin for `httpbin-grpc-auth`.

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

#### Multiple (Chained) Auth

This setup allows for [multiple authentication]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth" >}}) methods to be chained together, requiring clients to pass through each specified authentication provider.

To enable multiple (chained) auth, you should set `base_identity_provided_by` field to one of the supported chained enums. Consult the [Multi (Chained) Authentication]({{< ref "basic-config-and-security/security/authentication-authorization/multiple-auth" >}}) section for the supported auths.

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

#### IP Allowlist

To enable [IP Allowlist]({{< ref "api-management/gateway-config-tyk-classic#ip-access-control" >}}), set the following fields:

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

#### IP Blocklist

To enable [IP Blocklist]({{< ref "api-management/gateway-config-tyk-classic#ip-access-control" >}}), set the following fields:

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


### Set Up Manifest for GraphQL
In the example below we can see that the configuration is contained within the `graphql` configuration object. A GraphQL schema is specified within the `schema` field and the execution mode is set to `proxyOnly`. The [GraphQL public playground]({{< ref "api-management/graphql#enabling-public-graphql-playground" >}}) is enabled with the path set to `/playground`.

```yaml {hl_lines=["15-17", "18-92"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: trevorblades
spec:
  name: trevorblades
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: https://countries.trevorblades.com
    listen_path: /trevorblades
    strip_listen_path: true
  graphql:
    enabled: true
    version: "2"
    execution_mode: proxyOnly
    schema: |
      directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

      enum CacheControlScope {
        PUBLIC
        PRIVATE
      }

      type Continent {
        code: ID!
        name: String!
        countries: [Country!]!
      }

      input ContinentFilterInput {
        code: StringQueryOperatorInput
      }

      type Country {
        code: ID!
        name: String!
        native: String!
        phone: String!
        continent: Continent!
        capital: String
        currency: String
        languages: [Language!]!
        emoji: String!
        emojiU: String!
        states: [State!]!
      }

      input CountryFilterInput {
        code: StringQueryOperatorInput
        currency: StringQueryOperatorInput
        continent: StringQueryOperatorInput
      }

      type Language {
        code: ID!
        name: String
        native: String
        rtl: Boolean!
      }

      input LanguageFilterInput {
        code: StringQueryOperatorInput
      }

      type Query {
        continents(filter: ContinentFilterInput): [Continent!]!
        continent(code: ID!): Continent
        countries(filter: CountryFilterInput): [Country!]!
        country(code: ID!): Country
        languages(filter: LanguageFilterInput): [Language!]!
        language(code: ID!): Language
      }

      type State {
        code: String
        name: String!
        country: Country!
      }

      input StringQueryOperatorInput {
        eq: String
        ne: String
        in: [String]
        nin: [String]
        regex: String
        glob: String
      }

      """The `Upload` scalar type represents a file upload."""
      scalar Upload
    playground:
      enabled: true
      path: /playground
```

### Set Up Manifest for HTTP
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

### Set Up Manifest for TCP

This example creates a API definition that proxies request from TCP port `6380` to `tcp://localhost:6379`.

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

### Set Up Manifest for UDG
#### UDG v2 (Tyk 3.2 and above)

If you are on Tyk 3.2 and above, you can use the following manifest to create an UDG API. This example configures a Universal Data Graph from a [GraphQL datasource]({{< ref "api-management/data-graph#graphql" >}}) and a [REST Datasource]({{< ref "api-management/data-graph#rest" >}}).

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

#### UDG v1 (Tyk 3.1 or before)

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

## Set Up Tyk Streams API
Tyk Streams integrates natively with Tyk OpenAPI Specification (OAS), allowing you to manage APIs as code and automate processes in Kubernetes using Tyk Operator. Setting up Tyk Streams API is similar to configuring a standard Tyk OAS API. You can store the Tyk Streams OAS definition in a Kubernetes ConfigMap and connect it to Tyk Gateway through a `TykStreamsApiDefinition` resource.

### Create your Tyk Streams API
#### Prepare the Tyk Streams API Definition
To create a Tyk Streams API, start by preparing a complete Tyk Streams API definition in the OpenAPI Specification (OAS) format. This file must include:

- The `x-tyk-api-gateway` extension for Tyk-specific settings.
- The `x-tyk-streaming` extension for Tyk Streams configuration.

Here’s an example of a Tyk Streams API definition:

```json {hl_lines=["17-54"],linenos=true}
{
  "info": {
    "title": "Simple streaming demo",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://tyk-gw.local/streams/"
    }
  ],
  "security": [],
  "paths": {},
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-streaming": {
    "streams": {
      "example-publisher": {
        "input": {
          "http_server": {
            "allowed_verbs": [
              "POST"
            ],
            "path": "/pub",
            "timeout": "1s"
          }
        },
        "output": {
          "http_server": {
            "ws_path": "/ws"
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "Simple streaming demo",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/streams/"
      }
    },
    "upstream": {
      "url": "https://not-needed"
    }
  }
}
```

#### Create a TykStreamsApiDefinition Custom Resource
Once your Tyk Streams API definition is ready, use a Kubernetes ConfigMap to store the definition and link it to a `TykStreamsApiDefinition` custom resource.

Example manifest:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: TykStreamsApiDefinition
metadata:
  name: simple-stream
spec:
  tykStreams:
    configmapRef:
      name: simple-stream-cm            #k8s resource name of configmap
      namespace: default                #The k8s namespace of the resource being targeted. If Namespace is not provided,
                                        #we assume that the ConfigMap is in the same namespace as TykStreamsApiDefinition resource.
      keyName: test_stream.json
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: simple-stream-cm
data:
  test_stream.json: |-
    {
      "components": {},
      "info": {
        "title": "Simple streaming demo",
        "version": "1.0.0"
      },
      "openapi": "3.0.3",
      "paths": {},
      "x-tyk-api-gateway": {
        "info": {
          "name": "Simple streaming demo",
          "state": {
            "active": true
          }
        },
        "server": {
          "detailedTracing": {
            "enabled": true
          },
          "listenPath": {
            "strip": true,
            "value": "/streams/"
          }
        },
        "upstream": {
          "url": "https://not-needed"
        }
      },
      "x-tyk-streaming": {
        "streams": {
          "example-publisher": {
            "input": {
              "http_server": {
                "path": "/pub",
                "allowed_verbs": ["POST"],
                "timeout": "1s"
              }
            },
            "output": {
              "http_server": {
                "ws_path": "/ws"
              }
            }
          }
        }
      }
    }
```

#### Apply the TykStreamsApiDefinition Manifest

Use the `kubectl` command to apply the `TykStreamsApiDefinition` manifest to your Kubernetes cluster:

```sh
kubectl apply -f tyk-streams-api-definition.yaml
```

This will create a new `TykStreamsApiDefinition` resource. The Tyk Operator watches this resource and configures the Tyk Gateway or Tyk Dashboard with the new API.

#### Verify the Tyk Streams API Creation

Check the status of the `TykStreamsApiDefinition` resource to ensure that the API has been successfully created:

```sh
kubectl get tykstreamsapidefinitions simple-stream
```

You should see output similar to this:

```bash
NAME            DOMAIN   LISTENPATH   ENABLED   SYNCSTATUS
simple-stream            /streams/    true      Successful
```

#### Manage and Update the Tyk Streams API
To update your API configuration, modify the linked `ConfigMap`. The Tyk Operator will automatically detect changes and update the API in the Tyk Gateway.

### Secure your Tyk Streams API
To secure your Tyk Streams API, configure security fields in the OAS definition just as you would for a standard Tyk OAS API. For more details, refer to the [Secure your Tyk OAS API](#secure-your-tyk-oas-api) guide.

## Add a Security Policy to your API
To further protect access to your APIs, you will want to add a security policy. 
Below, we take you through how to define the security policy but you can also find [Security Policy Example]({{< ref "tyk-stack/tyk-operator/create-an-api#security-policy-example" >}}) below.

### Define the Security Policy manifest

To create a security policy, you must define a Kubernetes manifest using the `SecurityPolicy` CRD. The following example illustrates how to configure a default policy for trial users for a Tyk Classic API named `httpbin`, a Tyk OAS API named `petstore`, and a Tyk Streams API named `http-to-kafka`.

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: trial-policy                    # Unique Kubernetes name
spec:
  name: Default policy for trial users  # Descriptive name for the policy
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # Omit this field or use `ApiDefinition` if you are referencing Tyk Classic API
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` if you are referencing Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
    - name: http-to-kafka
      namespace: default
      kind: TykStreamsApiDefinition         # Use `TykStreamsApiDefinition` if you are referencing Tyk Streams API
      versions:
        - ""                            # The default version of Tyk Streams API is ""
  quota_max: 1000
  quota_renewal_rate: 3600
  rate: 120
  per: 60
  throttle_interval: -1
  throttle_retry_limit: -1
```

Save the manifest locally in a file, e.g. `trial-policy.yaml`

In this example, we have defined a security policy as described below:

**Define Security Policy status and metadata**

  - **`name`**: A descriptive name for the security policy.
  - **`active`**: Marks the policy as active (true or false).
  - **`state`**: The current state of the policy. It can have one of three values:
    - **`active`**: Keys connected to this policy are enabled and new keys can be created.
    - **`draft`**: Keys connected to this policy are disabled; no new keys can be created.
    - **`deny`**: Policy is not published to Gateway; no keys can be created.
  - **`tags`**: A list of tags to categorize or label the security policy, e.g.

    ```yaml
    tags:
      - Hello
      - World
    ```

  - **`meta_data`**: Key-value pairs for additional metadata related to the policy, e.g.

    ```yaml
    meta_data:
      key: value
      hello: world
    ```

**Define Access Lists for APIs**

  - **`access_rights_array`**: Defines the list of APIs that the security policy applies to and the versions of those APIs.
    - **`name`**: The Kubernetes metadata name of the API resource to which the policy grants access.
    - **`namespace`**: The Kubernetes namespace where the API resource is deployed.
    - **`kind`**: Tyk OAS APIs (`TykOasApiDefinition`), Tyk Streams (`TykStreamsApiDefinition`) and Tyk Classic APIs (`ApiDefinition`) can be referenced here. The API format can be specified by `kind` field. If omitted, `ApiDefinition` is assumed.
    - **`versions`**: Specifies the API versions the policy will cover. If the API is not versioned, include the default version here. The default version of a Classic API is "Default". The default version of a Tyk OAS API is "".

In this example, the security policy will apply to an `ApiDefinition` resource named `httpbin` in the `default` namespace, a `TykOasApiDefinition` resource named `petstore` in the `default` namespace, and a `TykStreamsApiDefinition` resource named `http-to-kafka` in the `default` namespace. Note that with Tyk Operator, you do not need to specify API ID as in the raw [Policy definition]({{< ref "api-management/policies#policies-guide" >}}). Tyk Operator will automatically retrieve the API ID of referenced API Definition resources for you.

**Define Rate Limits, Usage Quota, and Throttling**

- **`rate`**: The maximum number of requests allowed per time period (Set to `-1` to disable).
- **`per`**: The time period (in seconds) for the rate limit (Set to `-1` to disable).
- **`throttle_interval`**: The interval (in seconds) between each request retry  (Set to `-1` to disable).
- **`throttle_retry_limit`**: The maximum number of retry attempts allowed  (Set to `-1` to disable).
- **`quota_max`**: The maximum number of requests allowed over a quota period (Set to `-1` to disable).
- **`quota_renewal_rate`**: The time, in seconds, after which the quota is renewed.

In this example, trial users under this security policy can gain access to the `httpbin` API at a rate limit of maximum 120 times per 60 seconds (`"rate": 120, "per": 60`), with a usage quota of 1000 every hour (`"quota_max": 1000, "quota_renewal_rate": 3600`), without any request throttling (`throttle_interval: -1, throttle_retry_limit: -1`).

### Apply the Security Policy manifest
Once you have defined your security policy manifest, apply it to your Kubernetes cluster using the `kubectl apply` command:

```bash
kubectl apply -f trial-policy.yaml
```

### Verify the Security Policy

After applying the manifest, you can verify that the security policy has been created successfully by running:

```bash
kubectl describe securitypolicy trial-policy

...
Status:
  Latest CRD Spec Hash:  901732141095659136
  Latest Tyk Spec Hash:  5475428707334545086
  linked_apis:
    Kind:       ApiDefinition
    Name:       httpbin
    Namespace:  default
    Kind:       TykOasApiDefinition
    Name:       petstore
    Namespace:  default
    Kind:       TykStreamsApiDefinition
    Name:       http-to-kafka
    Namespace:  default
  pol_id:       66e9a27bfdd3040001af6246
Events:         <none>
```

From the `status` field, you can see that this security policy has been linked to `httpbin`, `petstore`, and `http-to-kafka` APIs.


### Security policy example {#security-policy-example}

#### Key-level per-API rate limits and quota

By configuring per-API limits, you can set specific rate limits, quotas, and throttling rules for each API in the access rights array. When these per-API settings are enabled, the API inherits the global limit settings unless specific limits and quotas are set in the `limit` field for that API.

The following manifest defines a security policy with per-API rate limits and quotas for two APIs: `httpbin` and `petstore`.

```yaml {hl_lines=["15-21", "27-33", "40-41"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-per-api-limits
spec:
  name: Policy with Per API Limits
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      limit:                            # APILimit stores quota and rate limit on ACL level
        rate: 10                        # Max 10 requests per 60 seconds
        per: 60                         # Time period for rate limit
        quota_max: 100                  # Max 100 requests allowed over the quota period
        quota_renewal_rate: 3600        # Quota renewal period in seconds (1 hour)
        throttle_interval: -1           # No throttling between retries
        throttle_retry_limit: -1        # No limit on request retries
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      limit:
        rate: 5                         # Max 5 requests per 60 seconds
        per: 60                         # Time period for rate limit
        quota_max: 100                  # Max 100 requests allowed over the quota period
        quota_renewal_rate: 3600        # Quota renewal period in seconds (1 hour)
        throttle_interval: -1           # No throttling between retries
        throttle_retry_limit: -1        # No limit on request retries
  rate: -1                              # Disable global rate limit
  per: -1                               # Disable global rate limit period
  throttle_interval: -1                 # Disable global throttling
  throttle_retry_limit: -1              # Disable global retry limit
  quota_max: -1                         # Disable global quota
  quota_renewal_rate: 60                # Quota renewal rate in seconds (1 minute)
```

With this security policy applied:

For the `httpbin` API:
- The rate limit allows a maximum of 10 requests per 60 seconds.
- The quota allows a maximum of 100 requests per hour (3600 seconds).
- There is no throttling or retry limit (throttle_interval and throttle_retry_limit are set to -1).

For the `petstore` API:
- The rate limit allows a maximum of 5 requests per 60 seconds.
- The quota allows a maximum of 100 requests per hour (3600 seconds).
- There is no throttling or retry limit (throttle_interval and throttle_retry_limit are set to -1).

Global Rate Limits and Quota:
- All global limits (rate, quota, and throttling) are disabled (-1), so they do not apply.

By setting per-API rate limits and quotas, you gain granular control over how each API is accessed and used, allowing you to apply different limits for different APIs as needed. This configuration is particularly useful when you want to ensure that critical APIs have stricter controls while allowing more flexibility for others. Use this example as a guideline to tailor your security policies to your specific requirements.

#### Key-level per-endpoint rate limits

By configuring key-level per-endpoint limits, you can restrict the request rate for specific API clients to a specific endpoint of an API.

The following manifest defines a security policy with per-endpoint rate limits for two APIs: `httpbin` and `petstore`.

```yaml {hl_lines=["15-29", "35-49"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-per-api-limits
spec:
  name: Policy with Per API Limits
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      endpoints:                        # Per-endpoint rate limits
        - path: /anything
          methods:
            - name: POST
              limit:
                rate: 5
                per: 60
            - name: PUT
              limit:
                rate: 5
                per: 60
            - name: GET
              limit:
                rate: 10
                per: 60
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      endpoints:                        # Per-endpoint rate limits
        - path: /pet
          methods:
            - name: POST
              limit:
                rate: 5
                per: 60
            - name: PUT
              limit:
                rate: 5
                per: 60
            - name: GET
              limit:
                rate: 10
                per: 60
  rate: -1                              # Disable global rate limit
  per: -1                               # Disable global rate limit period
  throttle_interval: -1                 # Disable global throttling
  throttle_retry_limit: -1              # Disable global retry limit
  quota_max: -1                         # Disable global quota
  quota_renewal_rate: 60                # Quota renewal rate in seconds (1 minute)
```

#### Path based permissions {#path-based-permissions}

You can secure your APIs by specifying [allowed URLs]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}) (methods and paths) for each API within a security policy. This is done using the `allowed_urls` field under `access_rights_array`.

The following manifest defines a security policy that allows access only to specific URLs and HTTP methods for two APIs: `httpbin`(a Tyk Classic API) and `petstore` (a Tyk OAS API).

```yaml {hl_lines=["15-18", "24-28"],linenos=true}
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: policy-with-allowed-urls
spec:
  name: Policy with allowed URLs
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
      allowed_urls:                     # Define allowed paths and methods
        - url: /get                     # Only allow access to the "/get" path
          methods:
            - GET                       # Only allow the GET method
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` for Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
      allowed_urls:                     # Define allowed paths and methods
        - url: "/pet/(.*)"              # Allow access to any path starting with "/pet/"
          methods:
            - GET                       # Allow GET method
            - POST                      # Allow POST method
```

With this security policy applied:

- Allowed access:
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/petstore/pet/10` returns a `200 OK` response.
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/httpbin/get` returns a `200 OK` response.

- Restricted access:
    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/petstore/pet` returns a `403 Forbidden` response with the message:
        
    ```json
        { "error": "Access to this resource has been disallowed" }
    ```

    - `curl -H "Authorization: Bearer $KEY_AUTH" http://tyk-gw.org/httpbin/anything` returns a `403 Forbidden` response with the message:

    ```json
        { "error": "Access to this resource has been disallowed" }
    ```

#### Partitioned policies {#partitioned-policies}

[Partitioned policies]({{< ref "api-management/policies#partitioned-policies" >}}) allow you to selectively enforce different segments of a security policy, such as quota, rate limiting, access control lists (ACL), and GraphQL complexity rules. This provides flexibility in applying different security controls as needed.

To configure a partitioned policy, set the segments you want to enable in the `partitions` field:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: partitioned-policy-example
spec:
  name: Partitioned Policy Example
  state: active
  active: true
  access_rights_array:
    - name: httpbin                     # Kubernetes name of referenced API
      namespace: default                # Kubernetes namespace of referenced API
      kind: ApiDefinition               # `ApiDefinition` (Default), `TykOasApiDefinition` or `TykStreamsApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` if you are referencing Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
  partitions:
    quota: false                        # Do not enforce quota rules
    rate_limit: false                   # Do not enforce rate limiting rules
    acl: true                           # Enforce access control rules
    complexity: false                   # Do not enforce GraphQL complexity rules
```

- **`quota`**: Set to true to enforce quota rules (limits the number of requests allowed over a period).
- **`rate_limit`**: Set to true to enforce rate limiting rules (limits the number of requests per second or minute).
- **`acl`**: Set to true to enforce access control rules (controls which APIs or paths can be accessed).
- **`complexity`**: Set to true to enforce GraphQL complexity rules (limits the complexity of GraphQL queries to prevent resource exhaustion).



## Migrate Existing APIs to Tyk Operator 

If you have existing APIs and Policies running on your Tyk platform, and you want to start using Tyk Operator to manage them, you probably would not want to re-create the APIs and Policies on the platform using Operator CRDs. It is because you will lose keys, policies, and analytics linked to the APIs. You can instead link existing APIs and Policies to a CRD by specifying the API ID or Policy ID in the CRD spec. This way, Operator will update the existing API or Policy according to the CRD spec. Any keys, policies and analytics linked to the API will continue to operate the same. This is great for idempotency.

### Export existing configurations to CRDs

Instead of creating the API and Policy CRDs from scratch, you can try exporting them from Dashboard using a snapshot tool. You can find the detail usage guide [here](https://github.com/TykTechnologies/tyk-operator/blob/master/pkg/snapshot/README.md). This is great if you want to have a quick start. However, this is still a PoC feature so we recommend you to double check the output files before applying them to your cluster.

### Migration of existing API

If there are existing APIs that you want to link to a CRD, it's very easy to do so. You need to simply add the `api_id` from your API Definition to the YAML of your `ApiDefinition` type. Then, the Operator will take care of the rest.

Example:

1. From the existing API Definition, grab the following field:

```json
"api_id": "5e0fac4845bb46c77543be28300fd9d7"
```

2. Simply add this value to your YAML, in the `spec.api_id`field:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: my-existing-api
spec:
  api_id: 5e0fac4845bb46c77543be28300fd9d7
  name: existing API
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

3. Then apply your changes:

```console
$ kubectl apply -f config/samples/httpbin_protected.yaml
apidefinition.tyk.tyk.io/my-existing-api created
```

{{< note success >}}
**Note**  

The source of truth for the API definition is now the CRD, meaning it will override any differences in your existing API definition.
{{< /note >}}

### Migration of existing Policy
If you have existing pre-Operator policies, you can easily link them to a CRD, which will allow you to modify them through the YAML moving forward.
Simply set the id field in the SecurityPolicy YAML to the _id field in the existing Policy's JSON. This will allow the Operator to make the link.
Note that the YAML becomes the source of truth and will overwrite any changes between it and the existing Policy.

**Example**:
1. Find out your existing Policy ID, e.g. `5f8f3933f56e1a5ffe2cd58c`

2. Stick the policy ID `5f8f3933f56e1a5ffe2cd58c` into the YAML's `spec.id` field like below

```yaml
my-security-policy.yaml:
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: new-httpbin-policy
spec:
  id: 5f8f3933f56e1a5ffe2cd58c
  name: My New HttpBin Policy
  state: active
  active: true
  access_rights_array:
    - name: new-httpbin-api # name of your ApiDefinition object.
      namespace: default    # namespace of your ApiDefinition object.
      versions:
        - Default
```

The `spec.access_rights_array` field of the YAML must refer to the ApiDefinition object that the policy identified by the id will affect.

To find available ApiDefinition objects:

```console
$ kubectl get tykapis -A
NAMESPACE   NAME               DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
default     new-httpbin-api             /httpbin     http://httpbin.org   true
```

3. And then apply this file:

```console
$ kubectl apply -f my-security-policy.yaml
securitypolicy.tyk.tyk.io/new-httpbin-policy created
```

Now the changes in the YAML were applied to the existing Policy. You can now manage this policy through the CRD moving forward.
Note, if this resource is unintentionally deleted, the Operator will recreate it with the same `id` field as above, allowing keys to continue to work as before the delete event.

### Idempotency

Because of the ability to declaratively define the `api_id`, this gives us the ability to preserve Keys that are tied to APIs or policies which are tied to APIs.
Imagine any use case where you have keys tied to policies, and policies tied to APIs.
Now imagine that these resources are unintentionally destroyed. Our database goes down, or our cluster, or something else.
Well, using the Tyk Operator, we can easily re-generate all our resources in a non-destructive fashion. That's because the operator intelligently constructs the unique ID using the unique namespaced name of our CRD resources. For that reason.
Alternatively, if you don't explicitly state it, it will be hard-coded for you by Base64 encoding the namespaced name of the CRD.

For example:

1. we have keys tied to policies tied to APIs in production.
2. Our production DB gets destroyed, all our Policies and APIs are wiped
3. The Tyk Operator can resync all the changes from our CRDs into a new environment, by explicitly defining the Policy IDs and API IDs as before.
4. This allows keys to continue to work normally as Tyk resources are generated idempotently through the Operator.


