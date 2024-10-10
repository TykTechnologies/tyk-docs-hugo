---
title: "Create an OAS API with Tyk Operator"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Create an API"]
description: "Create an OAS API"
---

This step-by-step tutorial will guide you through the process of creating a Tyk OAS API using Tyk Operator in your Kubernetes environment. Tyk Operator allows you to manage your APIs declaratively, utilizing the `TykOasApiDefinition` custom resource.

## Prerequisites
Before you begin, ensure you have the following:

1. A Kubernetes cluster with [kubectl](https://kubernetes.io/docs/reference/kubectl/) configured to interact with it.
2. [Tyk Operator v1.0+]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) installed in your Kubernetes cluster.
3. Basic knowledge of Kubernetes resources like [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap) and [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).
4. A valid Tyk OAS API definition in JSON format.

## Step 1: Prepare the Tyk OAS API Definition
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

You can create and configure your API easily using Tyk Dashboard in a developer environment, and then obtain the OAS API definition following these instructions:

1. Open the Tyk Dashboard
2. Navigate to the API you want to manage with the Tyk Operator
3. Click on the "Actions" menu button and select "View Raw Definition."
4. This will display the raw OAS API definition of your API, which you can then copy and save locally.
{{< /note >}}

## Step 2: Create a ConfigMap for the Tyk OAS API Definition

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

If you prefer to create ConfigMap with a manifest using `kubectl apply` command, you may get an error that the annotation metadata cannot exceed 256KB. It is because by using `kubectl apply`, `kubectl` automatically saves the whole configuration in the annotation [kubectl.kubernetes.io/last-applied-configuration](https://kubernetes.io/docs/reference/labels-annotations-taints/#kubectl-kubernetes-io-last-applied-configuration) for tracking changes. Your OAS API Definition may easily exceed the size limit of annotations (256KB). Therefore, `kubectl create` is used here to get around the problem.
{{< /note >}}

## Step 3: Create a TykOasApiDefinition Custom Resource

Now, create a `TykOasApiDefinition` resource to tell the Tyk Operator to use the OAS API definition stored in the ConfigMap.

Create a manifest file named `tyk-oas-api-definition.yaml` with the following content:

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

## Step 4: Apply the TykOasApiDefinition Manifest

Use `kubectl` to apply the `TykOasApiDefinition` manifest to your cluster:

```sh
kubectl apply -f tyk-oas-api-definition.yaml
```

This command creates a new `TykOasApiDefinition` resource in your cluster. The Tyk Operator will watch for this resource and configures Tyk Gateway or Tyk Dashboard with a new API using the provided OAS API definition.

## Step 5: Verify the Tyk OAS API Creation

To verify that the API has been successfully created, check the status of the TykOasApiDefinition resource:

```sh
kubectl get tykoasapidefinition petstore
```

You should see the status of the resource, which will indicate if the API creation was successful.

```bash
NAME       DOMAIN   LISTENPATH   PROXY.TARGETURL                  ENABLED   SYNCSTATUS   INGRESSTEMPLATE
petstore            /petstore/   https://petstore.swagger.io/v2   true      Successful
```

## Step 6: Test the Tyk OAS API
After the Tyk OAS API has been successfully created, you can test it by sending a request to the API endpoint defined in your OAS file.

For example, if your API endpoint is `/store/inventory"`, you can use `curl` or any API client to test it:

```sh
curl "TYK_GATEWAY_URL/petstore/store/inventory"
```

Replace TYK_GATEWAY_URL with a URL of Tyk Gateway.

## Step 7: Manage and Update the Tyk OAS API
To make any changes to your API configuration, update the OAS file in your ConfigMap and then re-apply the ConfigMap using `kubectl replace`:

```sh
kubectl create configmap tyk-oas-api-config --from-file=oas-api-definition.json -n tyk --dry-run=client -o yaml | kubectl replace -f -
```

The Tyk Operator will automatically detect the change and update the API in the Tyk Gateway.

{{< note success >}}
**Notes**

`kubectl replace` without `--save-config` option is used here instead of `kubectl apply` because we do not want to save the OAS API definition in its annotation. If you want to enable `--save-config` option or use `kubectl apply`, the OAS API definition size would be further limited to at most 262144 bytes.
{{< /note >}}

## Conclusion
By following these steps, you can easily create and manage Tyk OAS APIs using the Tyk Operator in your Kubernetes environment. The Tyk Operator allows for a declarative approach to API management, integrating seamlessly with Kubernetes-native tools and workflows.

Next, you may want to [secure your OAS API]({{<ref "product-stack/tyk-operator/getting-started/secure-an-oas-api">}}) with authentication and authorization.