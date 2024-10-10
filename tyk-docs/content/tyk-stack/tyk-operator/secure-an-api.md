---
title: "Protect an API with a Security Policy "
tags: ["Tyk Operator", "Kubernetes", "Security Policy"]
description: "Step by step guide on how to create Security Policy using Tyk Operator CRD to protect an API" 
---

A [Security Policy]({{<ref "basic-config-and-security/security/security-policies">}}) in Tyk defines the rules that control how an API can be accessed, protecting it from abuse. These rules include rate limits, quotas, throttling, and access restrictions. Using Tyk Operator, you can configure and manage security policies in a Kubernetes environment by defining them in custom resource definitions (CRDs). This guide will walk you through the process of creating a security policy that protect access to your APIs with rate limits and quota using Tyk Operator.

## Prerequisites
Before you begin, ensure you have the following:

1. A Kubernetes cluster with [kubectl](https://kubernetes.io/docs/reference/kubectl/) configured to interact with it.
2. [Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) installed in your Kubernetes cluster.
3. Basic knowledge of [creating an API using Tyk Operator]({{<ref "product-stack/tyk-operator/getting-started/create-an-api-overview">}}).

## Step 1: Define the Security Policy manifest{#security-policy-manifest}

To create a security policy, you must define a Kubernetes manifest using the `SecurityPolicy` CRD. The following example illustrates how to configure a default policy for trial users for a Tyk Classic API named `httpbin` and a Tyk OAS API named `petstore`.

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
      kind: ApiDefinition               # `ApiDefinition` (Default) or `TykOasApiDefinition`
      versions:
        - Default                       # The default version of Tyk Classic API is "Default"
    - name: petstore
      namespace: default
      kind: TykOasApiDefinition         # Use `TykOasApiDefinition` if you are referencing Tyk OAS API
      versions:
        - ""                            # The default version of Tyk OAS API is ""
  quota_max: 1000
  quota_renewal_rate: 3600
  rate: 120
  per: 60
  throttle_interval: -1
  throttle_retry_limit: -1
```

Save the manifest locally in a file, e.g. `trial-policy.yaml`

In this example, we have defined a security policy as described below:

### Defining Security Policy status and metadata

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

### Defining Access Lists for APIs

  - **`access_rights_array`**: Defines the list of APIs that the security policy applies to and the versions of those APIs.
    - **`name`**: The Kubernetes metadata name of the API resource to which the policy grants access.
    - **`namespace`**: The Kubernetes namespace where the API resource is deployed.
    - **`kind`**: Both Tyk OAS APIs (`TykOasApiDefinition`) and Tyk Classic APIs (`ApiDefinition`) can be referenced here. The API format can be specified by `kind` field. If omitted, `ApiDefinition` is assumed.
    - **`versions`**: Specifies the API versions the policy will cover. If the API is not versioned, include the default version here. The default version of a Classic API is "Default". The default version of an OAS API is "".

In this example, the security policy will apply to an `ApiDefinition` resource named `httpbin` in the `default` namespace and a `TykOasApiDefinition` resource named `petstore` in the `default` namespace. Note that with Tyk Operator, you do not need to specify API ID as in the raw [Policy definition]({{<ref "basic-config-and-security/security/security-policies/policies-guide">}}). Tyk Operator will automatically retrieve the API ID of referenced API Definition resources for you.

### Defining Rate Limits, Usage Quota, and Throttling

- **`rate`**: The maximum number of requests allowed per time period (Set to `-1` to disable).
- **`per`**: The time period (in seconds) for the rate limit (Set to `-1` to disable).
- **`throttle_interval`**: The interval (in seconds) between each request retry  (Set to `-1` to disable).
- **`throttle_retry_limit`**: The maximum number of retry attempts allowed  (Set to `-1` to disable).
- **`quota_max`**: The maximum number of requests allowed over a quota period (Set to `-1` to disable).
- **`quota_renewal_rate`**: The time, in seconds, after which the quota is renewed.

In this example, trial users under this security policy can gain access to the `httpbin` API at a rate limit of maximum 120 times per 60 seconds (`"rate": 120, "per": 60`), with a usage quota of 1000 every hour (`"quota_max": 1000, "quota_renewal_rate": 3600`), without any request throttling (`throttle_interval: -1, throttle_retry_limit: -1`).

## Step 2: Apply the Security Policy manifest
Once you have defined your security policy manifest, apply it to your Kubernetes cluster using the `kubectl apply` command:

```bash
kubectl apply -f trial-policy.yaml
```

## Step 3: Verify the Security Policy

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
  pol_id:       66e9a27bfdd3040001af6246
Events:         <none>
```

From the `status` field, you can see that this security policy has been linked to `httpbin` and `petstore` APIs.

## Conclusion
By following this guide, you can configure security policies in a Kubernetes environment using Tyk Operator to protect your APIs. This setup helps manage access, prevent abuse, and ensure fair usage by applying rate limits, quotas, and throttling rules. Use the example manifest as a starting point and customize it to fit your specific needs.

If you would like to configure more complex security polices, visit [Security Policy example]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example">}}) page for example on path based permissions, partitioned policy, per API limit, etc.

You can visit the [Security Policy CRD reference]({{<ref "product-stack/tyk-operator/reference/security-policy">}}) page to see all the Security Policies features Tyk Operator supports.
