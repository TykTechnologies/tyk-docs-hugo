---
date: 2017-03-24T16:39:31Z
title: Publish an API to Dev Portal
---

### Introduction

For Tyk Self Managed or Tyk Cloud, you can set up a Developer Portal to expose a facade of your APIs and then allow third-party developers to register and use your APIs.
You can make use of Tyk Operator CRDs to publish the APIs as part of your CI/CD workflow. If you have followed this Getting Started guide to create the httpbin example API, you can publish it to your Tyk Classic Developer Portal in a few steps.

{{< note success >}}

**Note**  



Currently Operator only supports publishing Tyk Classic API to the Tyk Classic Portal.

{{< /note >}}

### Tutorial: Publish an API with Tyk Operator
#### Step 1: Creating a security policy

When you publish an API to the Portal, Tyk actually publishes a way for developers to enroll in a policy, not into the API directly. Therefore, you should first set up a security policy for the developers, before proceeding with the publishing.

To do that, you can use the following command:

```yml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
 name: standard-pol
spec:
 name: standard-pol
 active: true
 state: active
 access_rights_array:
 - name: httpbin
   namespace: default
   versions:
     - Default
EOF
```

The above command will create a basic security policy and attribute it to the `httpbin` API that was previously created.

#### Step 2: Creating an API description

The Tyk Classic Developer Portal enables you to host your API documentation in Swagger/OpenAPI or API Blueprint for developers to use. In the case of Swagger/OpenAPI, you can either paste your Swagger content (JSON or YAML) in the CRD, or via a link to a public Swagger hosted URL, which can then be rendered by using Swagger UI.

Create a file called `apidesc.yaml`, then add the following;

```yml
apiVersion: tyk.tyk.io/v1alpha1
kind: APIDescription
metadata:
 name: standard-desc
spec:
 name: HTTPBIN API
 policyRef:
  name: standard-pol
  namespace: default
 docs:
  doc_type: swagger_custom_url
  documentation: "https://httpbin.org/spec.json"
 show: true
 version: v2
```

#### Step 3: Apply the changes

```console
kubectl apply -f apidesc.yaml
```
Or, if you don’t have the manifest with you, you can run the following command:

```yml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: APIDescription
metadata:
 name: standard-desc
spec:
 name: HTTPBIN API
 policyRef:
  name: standard-pol
  namespace: default
 docs:
  doc_type: swagger_custom_url
  documentation: "https://httpbin.org/spec.json"
 show: true
 version: v2
EOF
```

#### Step 4: Creating a PortalAPICatalog resource

Unlike other platforms, Tyk will not auto-publish your APIs to the Portal, instead they are presented as a facade, you choose what APIs and what Policies to expose to the Portal. You can configure what APIs and what Policies to expose to the Portal via Tyk Operator by creating a PortalAPICatalog resource.

Create a file called `api_portal.yaml`, then add the following:

```yml
apiVersion: tyk.tyk.io/v1alpha1
kind: PortalAPICatalogue
metadata:
 name: test-httpbin-api
spec:
 apis:
 - apiDescriptionRef:
    name: standard-desc
    namespace: default
```

You have added your API Descriptions under `apis`.

#### Step 5: Apply the changes

```console
kubectl apply -f api_portal.yaml
```

Now your new API and its documentation is loaded to the Developer Portal.

### APIDescription CRD

Different types of documents are supported:

Swagger Documents:

- `doc_type: swagger`
- `documentation`: Base64 encoded swagger doc

Swagger Hosted URL:

- `doc_type: swagger_custom_url`
- `documentation`: The URL to the swagger documentation, for example *"https://httpbin.org/spec.json"*

GraphQL:

- `doc_type: graphql`
