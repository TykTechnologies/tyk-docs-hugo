---
title: "Security Policy example"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "Security Policy"]
description: "Various security policy settings examples"
---

## Key-Level Per-API Rate Limits and Quota{#per-api-limit}

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
      kind: ApiDefinition               # `ApiDefinition` (Default) or `TykOasApiDefinition`
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

## Key-Level Per-Endpoint Rate Limits{#per-endpoint-rate-limit}

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
      kind: ApiDefinition               # `ApiDefinition` (Default) or `TykOasApiDefinition`
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

## Path based permissions{#path-based-permissions}

You can secure your APIs by specifying [allowed URLs]({{<ref "security/security-policies/secure-apis-method-path">}}) (methods and paths) for each API within a security policy. This is done using the `allowed_urls` field under `access_rights_array`.

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
      kind: ApiDefinition               # `ApiDefinition` (Default) or `TykOasApiDefinition`
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

## Partitioned policies{#partitioned-policies}

[Partitioned policies]({{<ref "basic-config-and-security/security/security-policies/partitioned-policies">}}) allow you to selectively enforce different segments of a security policy, such as quota, rate limiting, access control lists (ACL), and GraphQL complexity rules. This provides flexibility in applying different security controls as needed.

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
      kind: ApiDefinition               # `ApiDefinition` (Default) or `TykOasApiDefinition`
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
