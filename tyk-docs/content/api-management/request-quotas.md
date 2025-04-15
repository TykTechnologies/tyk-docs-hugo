---
title: "Rate Limiting"
date: 2025-01-10
tags: [""]
description: Overview of Rate Limiting with the Tyk Gateway
keywords: [""]
aliases:
  - /control-limit-traffic/request-quotas
  - /basic-config-and-security/control-limit-traffic/request-quotas
---

## Introduction

Request Quotas in Tyk Gateway allow you to set a maximum total number of API requests allowed for a specific API key or policy over longer, defined periods (e.g., day, week, month). This feature is distinct from rate limiting (which controls requests per second) and is essential for managing API consumption, enforcing service tiers, and protecting your backend services from sustained overuse over time.

```mermaid
graph LR
    A[API Request Received] --> B(Check Key/Policy Quota);
    B --> C{Quota Remaining > 0?};
    C -- Yes --> D[Decrement Quota Counter];
    D --> E[Allow Request to Backend];
    C -- No --> F[Reject Request (403 Quota Exceeded)];

    subgraph Quota Reset Logic (Event-Driven)
        direction LR
        G{Period Expired?} -- Yes --> H[Reset Counter on Next Request];
    end
    %% Note: Reset happens when period expires AND the key is used again.
```

### Key Benefits

*   **Enforce Usage Limits:** Cap the total number of requests allowed over extended periods (days, weeks, months) per consumer.
*   **Implement Tiered Access:** Easily define different usage allowances for various subscription plans (e.g., Free, Basic, Pro).
*   **Protect Backend Services:** Prevent individual consumers from overwhelming upstream services with consistently high volume over long durations.
*   **Enable Usage-Based Monetization:** Provide a clear mechanism for charging based on consumption tiers.

## Quick Start

## Configuration Options

Request Quotas are primarily configured in two places within Tyk:

1.  **Security Policy:** Applying a quota limit to a policy enforces that limit on *all* API keys associated with that policy. This is the recommended approach for managing quotas across groups of users or tiers.
2.  **API Key:** Setting a quota directly on an individual API key overrides any quota set by policies associated with that key. This allows for specific exceptions or custom limits for individual consumers.

Additionally, you can disable quota enforcement entirely for a specific API via its API Definition.

Let's explore the configuration methods:

{{< tabs_start >}}

{{< tab_start "Dashboard UI" >}}

The Tyk Dashboard provides the most straightforward way to configure quotas, either on a Security Policy or an individual API Key.

**Configuring on a Security Policy:**

1.  Navigate to **System Management > Policies**.
2.  Create a new Policy or **Edit** an existing one.
3.  Locate the **Usage Quotas** section (or similar, depending on UI version - often grouped with Rate Limiting).
4.  Set **Max Requests per period**: Define the maximum number of requests allowed during the reset period (e.g., `10000`). Use `-1` for unlimited.
5.  Set **Quota resets every**: Choose the duration after which the quota allowance replenishes (e.g., `Month`, `Week`, `Day`, or a custom duration in seconds).
6.  Optionally, enable **Set per API Limits and Quota** if you want this policy to define different quotas for specific APIs it grants access to.
7.  **Save** or **Update** the Policy. Keys using this policy will now be subject to this quota.

**Configuring on an API Key:**

1.  Navigate to **System Management > Keys**.
2.  Create a new Key or **Edit** an existing one.
3.  In the **API Access Rights** section, ensure the key has access to the desired API(s).
4.  Enable the **Set per API Limits and Quota** toggle for the specific API you want to apply a key-level quota to.
5.  Configure the **Usage Quotas** for that API within the key's settings:
    *   **Max Requests per period**: Set the limit (e.g., `5000`). Use `-1` for unlimited. This overrides the policy quota for this specific key *for this specific API*.
    *   **Quota resets every**: Select the reset period.
    *   The **Remaining requests for period** field will display the current count (initially equal to Max Requests).
    {{< img src="/img/2.10/api_rate_limits_keys.png" alt="Tyk API Gateway Quotas on an API Key" >}} 
    *(Image depicts setting Per API Quotas on a Key)*
6.  **Save** or **Update** the Key.

**Note:** If "Set per API Limits and Quota" is *not* enabled on the key for a specific API, the quota settings from the applied Security Policy (if any) will be used.

Refer to the Dashboard documentation for [Policies]({{< ref "#link-to-policy-docs" >}}) and [Keys]({{< ref "#link-to-key-docs" >}}) for more UI details.

{{< tab_end >}}

{{< tab_start "Session Object (API)" >}}

You can configure quotas programmatically by manipulating a key's **Session Object** via the Tyk Gateway API. This is useful for automation or integration with external systems. The session object is a JSON structure associated with each API key.

Key quota parameters within the session object:

*   `quota_max` (Integer): The maximum number of requests allowed in the period. Set to `-1` for unlimited.
*   `quota_remaining` (Integer): The current number of requests left. Typically initialized to the same value as `quota_max`. Tyk decrements this counter.
*   `quota_renewal_rate` (Integer): The duration of the quota period in seconds. The quota will reset *after* this duration has passed, upon the next request using the key.

**Example Session Object Snippet:**

```json
{
  // ... other session object fields like access_rights, org_id etc.
  "quota_max": 10000,
  "quota_remaining": 10000,
  "quota_renewal_rate": 2592000, // 30 days (60*60*24*30)
  "allowance": 1000, // Example rate limit setting (separate from quota)
  "rate": 1000,      // Example rate limit setting
  "per": 60          // Example rate limit setting
  // ...
}
```

**Explanation:**

This snippet configures the key to allow a maximum (`quota_max`) of 10,000 requests. The counter (`quota_remaining`) starts at 10,000. The quota period lasts for 2,592,000 seconds (`quota_renewal_rate`), which is 30 days. After 30 days have elapsed, the *next* request made with this key will trigger a reset of `quota_remaining` back to `quota_max`.

**Note:** Modifying the session object requires using the [Tyk Gateway API endpoint for Keys]({{< ref "#link-to-gateway-api-key-mgmt" >}}). Be careful when updating session objects to preserve other necessary fields.

{{< tab_end >}}

{{< tab_start "API Definition (Disabling)" >}}

You cannot *set* quota values within an API Definition, but you can *disable* quota checking entirely for all requests proxied through that specific API, regardless of Key or Policy settings. This is useful if an API should never have quota limits applied.

This is configured within the API Definition file itself.

{{< tabs_start nested="true" >}}
{{< tab_start "Tyk OAS" >}}

In a Tyk OAS API Definition (JSON or YAML), set the `disableQuota` field within the `x-tyk-api-gateway` extension object.

```yaml
# Tyk OAS API Definition (YAML Example)
...
x-tyk-api-gateway:
  info:
    name: "My API - No Quotas"
    ...
  middleware:
    disableQuota: true # Set to true to disable quota checks
  ...
upstream:
  url: http://my-backend.com
...

```

Refer to the [Tyk OAS API Definition reference (`disableQuota`)]({{< ref "api-management/gateway-config-tyk-oas#disablequota" >}}) for details.

{{< tab_end >}}
{{< tab_start "Tyk Classic" >}}

In a Tyk Classic API Definition (JSON), set the `disable_quota` field to `true`.

```json
// Tyk Classic API Definition (JSON Example)
{
  "name": "My API - No Quotas",
  "api_id": "my-api-no-quotas",
  "use_keyless": false,
  "auth": {
    "auth_header_name": "authorization"
  },
  "definition": {
    "location": "header",
    "key": "x-api-version"
  },
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "use_extended_paths": true
      }
    }
  },
  "proxy": {
    "listen_path": "/my-api-no-quotas/",
    "target_url": "http://my-backend.com",
    "strip_listen_path": true
  },
  "disable_quota": true // Set to true to disable quota checks
}

```

Refer to the [Tyk Classic API Definition reference (`disable_quota`)]({{< ref "#link-to-classic-api-def-disable-quota" >}}) for details.

{{< tab_end >}}
{{< tabs_end >}}

{{< tab_end >}}

{{< tabs_end >}}

### Important Considerations

*   **Policy Precedence:** Quotas set on a Security Policy apply to all keys using that policy *unless* overridden by a specific quota set directly on the key (using the "Set per API Limits and Quota" option).
*   **Unlimited Quota:** Setting `quota_max` to `-1` grants unlimited requests for the quota period.
*   **Event-Driven Resets:** Quotas reset *after* the `quota_renewal_rate` (in seconds) has passed *and* upon the next request using the key. They do not reset automatically on a fixed schedule (e.g., precisely at midnight or the 1st of the month) unless external automation is used to update the session object.
*   **Response Headers:** When quotas are active, Tyk typically adds `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers to responses, allowing clients to track their usage. (Note: Header names might be configurable).

## How It Works

## FAQs
