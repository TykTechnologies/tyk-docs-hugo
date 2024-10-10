---
title: "Manage API Ownership with OperatorContext"
date: 2024-06-25
tags: ["Tyk Operator", "Organizations", "Kubernetes"]
description: "Explains the key concepts for Tyk Operator"
---

This guide explains how to efficiently manage API Ownerships within Tyk using Tyk Operator Custom Resources (CRs).

Please consult the [API Ownership]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership">}}) documentation for the fundamental concepts of API Ownership in Tyk and [Operator Context]({{< ref "/product-stack/tyk-operator/key-concepts/operator-context" >}}) documentation for an overview of the use of OperatorContext to manage resources for different teams effectively.

The guide includes practical examples for managing API ownership via OperatorContext. Key topics include defining user owners and user group owners in OperatorContext for connecting and authenticating with a Tyk Dashboard, and using `contextRef` in `TykOasApiDefinition` or `ApiDefinition` objects to ensure configurations are applied within specific organizations. The provided YAML examples illustrate how to set up these configurations.

## How API Ownership works in Tyk Operator

In Tyk Dashboard, API Ownership ensures that only designated 'users' who own an API can modify it. This security model is crucial for maintaining control over API configurations, especially in a multi-tenant environment where multiple teams or departments may have different responsibilities and permissions.

Tyk Operator is designed to interact with Tyk Dashboard as a system user. For the Tyk Dashboard, Tyk Operator is just another user that must adhere to the same access controls and permissions as any other user. This means:

- Tyk Operator needs the correct access rights to modify any APIs.
- It must be capable of managing APIs according to the ownership rules set in Tyk Dashboard.

To facilitate API ownership and ensure secure operations, Tyk Operator must be able to 'impersonate' different users for API operations. This is where `OperatorContext` comes into play. Users can define different `OperatorContext` objects that act as different agents to connect to Tyk Dashboard. Each `OperatorContext` can specify different access parameters, including the user access key and organization it belongs to. Within `OperatorContext`, users can specify the IDs of owner users or owner user groups. All APIs managed through that `OperatorContext` will be owned by the specified users and user groups, ensuring compliance with Tyk Dashboard's API ownership model.

{{< img src="/img/operator/tyk-api-ownership.svg" alt="Enabling API ownership with OperatorContext" width="600" >}}

## OperatorContext

Here's how `OperatorContext` allows Tyk Operator to manage APIs under different ownerships:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: OperatorContext
metadata:
  name: team-alpha
  namespace: default
spec:
  env:
    # The mode of the admin api
    # ce - community edition (open source gateway)
    # pro - dashboard (requires a license)
    mode: pro
    # Org ID to use
    org: *YOUR_ORGANIZATION_ID*
    # The authorization token this will be set in x-tyk-authorization header on the
    # client while talking to the admin api
    auth: *YOUR_API_ACCESS_KEY*
    # The url to the Tyk Dashboard API
    url: http://dashboard.tyk.svc.cluster.local:3000
    # Set this to true if you want to skip tls certificate and host name verification
    # this should only be used in testing
    insecureSkipVerify: true
    # For ingress the operator creates and manages ApiDefinition resources, use this to configure
    # which ports the ApiDefinition resources managed by the ingress controller binds to.
    # Use this to override default ingress http and https port
    ingress:
      httpPort: 8000
      httpsPort: 8443
    # Optional - The list of users who are authorized to update/delete the API.
    # The user pointed by auth needs to be in this list, if not empty.
    user_owners:
    - a1b2c3d4e5f6
    # Optional - The list of groups of users who are authorized to update/delete the API.
    # The user pointed by auth needs to be a member of one of the groups in this list, if not empty.
    user_group_owners:
    - 1a2b3c4d5e6f
```

## Tyk OAS API

Once an `OperatorContext` is defined, you can reference it in your Tyk OAS API Definition objects using `contextRef`. Below is an example:

```yaml {hl_lines=["40-43"],linenos=true}
apiVersion: v1
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
kind: ConfigMap
metadata:
  name: cm
  namespace: default
---
apiVersion: tyk.tyk.io/v1alpha1
kind: TykOasApiDefinition
metadata:
  name: petstore
spec:
  contextRef:
    name: team-alpha
    namespace: default
  tykOAS:
    configmapRef:
      name: cm
      namespace: default
      keyName: test_oas.json
```

In this example, the `TykOasApiDefinition` object references the `team-alpha` context, ensuring that it is managed under the ownership of the specified users and user groups.

## Tyk Classic API

Similarly, if you are using Tyk Classic API, you can reference it in your API Definition objects using `contextRef`. Below is an example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
  namespace: alpha
spec:
  contextRef:
    name: team-alpha
    namespace: default
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

In this example, the `ApiDefinition` object references the `team-alpha` context, ensuring that it is managed under the ownership of the specified users and user groups.