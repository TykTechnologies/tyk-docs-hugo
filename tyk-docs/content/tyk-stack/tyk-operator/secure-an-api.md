---
date: 2017-03-24T16:39:31Z
title: Protect an API with a Security Policy
---

### Introduction

A security policy encapsulates several options that can be applied to a key. It acts as a template that can override individual sections of an API key (or identity) in Tyk.

See [What is a Security Policy?](https://tyk.io/docs/getting-started/key-concepts/what-is-a-security-policy/)

### Tutorial: Create a Policy with Tyk Operator

#### Step 1: Create a SecurityPolicy resource in YAML format

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

#### Step 2: Deploy the SecurityPolicy resource
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

### SecurityPolicy CRD

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

You can visit the [Security Policy features]({{<ref "product-stack/tyk-operator/reference/security-policy">}}) page to see all the latest Security Policies fields and features Tyk Operator supports.
