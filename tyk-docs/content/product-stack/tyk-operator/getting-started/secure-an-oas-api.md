---
title: "Secure an OAS API with Tyk Operator"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Create an API"]
description: "Secure an OAS API"
---

In this guide, we'll walk you through adding authentication to an existing API managed by Tyk Operator `TykOasApiDefinition` custom resource. We'll assume you've completed the [previous tutorial on creating an OAS API with Tyk Operator]({{<ref "product-stack/tyk-operator/getting-started/create-an-oas-api">}}).

By the end of this tutorial, your API will require an API key for access, enhancing its security.

## Prerequisites

1. Completed previous tutorial on [creating an OAS API with Tyk Operator]({{<ref "product-stack/tyk-operator/getting-started/create-an-oas-api">}}).
2. A Kubernetes cluster with [kubectl](https://kubernetes.io/docs/reference/kubectl/) configured to interact with it.
3. [Tyk Operator v1.0+]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) installed in your Kubernetes cluster.
4. Basic knowledge of Kubernetes resources like [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap), [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables), and [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).
5. Basic knowledge of configuring [Authentication with Tyk OAS]({{<ref "getting-started/key-concepts/authentication">}}).

## Overview

In this tutorial, you'll:

1. [Update your Tyk OAS API Definition](#step-1) to include API key authentication.
2. [Update the ConfigMap](#step-2) containing your API definition.
3. [Verify the changes](#step-3) to ensure your API is updated at Tyk.
4. [Test the API Endpoint](#step-4) to ensure your API now requires an API key.

## Step 1: Update your Tyk OAS API Definition{#step-1}

First, you'll modify your existing Tyk OAS API Definition to include the API key authentication configuration.

In the previous tutorial, you stored your OAS definition in a file named `oas-api-definition.json` and created a ConfigMap named `tyk-oas-api-config` in the `tyk` namespace.

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

You can configure your API for any Tyk supported authentication method by following [Authentication with Tyk OAS]({{<ref "getting-started/key-concepts/authentication">}}) documentation.

Save your updated API definition in the same file, `oas-api-definition.json`.

## Step 2: Update the ConfigMap with the new Tyk OAS API Definition{#step-2}

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
      name: tyk-oas-api-config   # Metadata name of the ConfigMap resource that stores the OAS API Definition
      namespace: tyk             # Metadata namespace of the ConfigMap resource
      keyName: oas-api-definition.json # Key for retrieving OAS API Definition from the ConfigMap
```

Any changes in the ConfigMap would be detected by Tyk Operator. Tyk Operator will then automatically reconcile the changes and update the API configuration at Tyk.

## Step 3: Verify the changes{#step-3}

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

## Step 4: Test the API Endpoint{#step-4}
Now, test your API endpoint to confirm that it requires an API key.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl -v "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

Request should fail with a `401 Unauthorized` response now as an API key is required for access. Your API has been secured by Tyk Gateway.

## Conclusion
You have now secured your Tyk OAS APIs with authentication and authorization by modifying the Tyk OAS stored in the ConfigMap. 

If you plan to secure your API using Client mTLS, also review [Manage TLS certificates]({{<ref "product-stack/tyk-operator/advanced-configurations/tls-certificate">}}) documentation to see how to let Tyk Operator manage the TLS certificates stored in Kubernetes.

Next, you can [protect access to your APIs]({{<ref "tyk-stack/tyk-operator/secure-an-api">}}) by applying Security Policy.