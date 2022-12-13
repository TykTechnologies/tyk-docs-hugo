---
---

## Introduction

A security policy encapsulates several options that can be applied to a key. It acts as a template that can override individual sections of an API key (or identity) in Tyk.

See [What is a Security Policy?]({{< ref "getting-started/key-concepts/what-is-a-security-policy/" >}})


## Tutorial: Create a security policy with the Dashboard

We have a video walkthrough for creating an security policy with the Dashboard.

{{< youtube y4xVUvUvFRE >}}


To create a security policy with the Dashboard, follow these steps:

### Step 1: Select "Policies" from the "System Management" section

![Policies menu link location]({{< ref "img/2.10/policies_menu.png" >}})

Your current policies will be displayed

![Current Policies]({{< ref "img/2.10/policy_list.png" >}})

### Step 2: Click ADD POLICY

![Add policy button]({{< ref "img/2.10/add_policy.png" >}})


### Step 3: Select an API to apply the policy Access Rights to

![Policy name form]({{< ref "img/2.10/select_api_policy.png" >}})

To select an API, you can either:

* Scroll through your API Name list
* Use the Search field
* You can also Group by Authentication Type to filter your APIs
* You can also Group by Category 

All policies require a descriptive name, this helps you to reference it later, and it will appear in drop-down options where you can attach policies to objects such as Keys or OAuth client IDs.

### Step 4: Setting Global Rate Limits and Quota

![Global Rates]({{< ref "img/2.10/global_limits_policies.png" >}})

These settings will be applied to all APIs that the policy is applied to. You can override these settings by turning **Set per API Rate Limits and Quota** on for the API you selected in Step 3. We will leave these settings at their default for this tutorial.

#### Rate Limiting

A rate limit is enforced on all keys, set the number of requests per second that a user of a key with this policy is allowed to use. See [Rate Limiting]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting/" >}}) for more details.

{{< note success >}}
**Note**  

The Rate Limit set by a policy will override the limits applied to an individual key.
{{< /note >}}

#### Throttling

When hitting quota or rate limits, you can automatically queue and auto-retry client requests. Throttling can be configured at a key or policy level. See [Request Throttling]({{< ref "basic-config-and-security/control-limit-traffic/request-throttling/" >}}) for more details.

#### Usage Quotas

Usage quotas limit the number of total requests a user is allowed to have over a longer period of time. So while a rate limit is a rolling window, a quota is an absolute maximum that a user is allowed to have over a week, a day or a month. See [Request Quotas]({{< ref "basic-config-and-security/control-limit-traffic/request-quotas/" >}}) for more details.

Usage quotas can only be a positive number, or -1 (unlimited).

{{< note success >}}
**Note**  

The Usage Quota set by a policy will override a quota applied to an individual key.
{{< /note >}}


### Policy Partitioning

In some cases, the all-or-nothing approach of policies, where all the components of access control, quota and rate limit are set together isn’t ideal, and instead you may wish to have only one or two segments of a token managed at a policy level and other segments in another policy or on the key itself. We call this [Policy Partitioning]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies/" >}}).


#### Path Based Permissions

You can also use a security policy to apply restrictions on a particular path and method. Granular path control allows you to define which methods and paths a key is allowed to access on a per API-version basis. See [Secure your APIs by Method and Path]({{< ref "basic-config-and-security/security/security-policies/secure-apis-method-path/" >}}) for more details

![Path and Method]({{< ref "img/2.10/path_and_method.png" >}})


## Step 5: Add Configuration Details

You use the Configuration section to set the following:

1. Give your policy a name. This is a required setting
2. Set the policy state. You can set your policy to one of the following states:
   * Active (the default)
   * Draft
   * Access Denied 
3. Set a time after which any Keys subscribed to your policy expire. Select a value from the drop-down list. This is a required setting. See [Key Expiry]({{< ref "basic-config-and-security/security/key-level-security/#key-expiry" >}}) for more details.
4. Add Tags to your policy. Any tags you add can be used when filtering Analytics Data. Tags are case sensitive.
5. Add Metadata to your policy. Adding metadata such as User IDs can be used by middleware components. See [Session Metadata]({{< ref "getting-started/key-concepts/session-meta-data/" >}}) for more details.

### Step 6: Save the policy

Click **CREATE** . Once the policy is saved, you will be able to use it when creating keys, OAuth clients and custom JWT tokens.

## Tutorial: Create a security policy with the API

Security Policies can be created with a single call to the API. It is very similar to the token creation process. To generate a simple security policy using the Tyk Dashboard API you can use the following curl command:
```{.copyWrapper}
curl -X POST -H "authorization: {API-TOKEN}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "access_rights": {
      "{API-ID}": {
        "allowed_urls": [],
        "api_id": "{API-ID}",
        "api_name": "{API-NAME}",
        "versions": [
          "Default"
        ]
      }
    },
    "active": true,
    "name": "POLICY NAME",
    "rate": 100,
    "per": 1,
    "quota_max": 10000,
    "quota_renewal_rate": 3600,
    "state": "active",
    "tags": ["Startup Users"]
  }' https://admin.cloud.tyk.io/api/portal/policies | python -mjson.tool
```

You must replace:

*   `{API-TOKEN}`: Your API Token for the Dashboard API.
*   `{API-ID}`: The API ID you wish this policy to grant access to, there can be more than one of these entries.
*   `{API-NAME}`: The name of the API that is being granted access to (this is not required, but helps when debugging or auditing).
*   `POLICY NAME`: The name of this security policy.

The important elements:

*   `access_rights`: A list of objects representing which APIs that you have configured to grant access to.
*   `rate` and `per`: The number of requests to allow per period.
*   `quota_max`: The maximum number of allowed requests over a quota period.
*   `quota_renewal_rate`: how often the quota resets, in seconds. In this case we have set it to renew every hour.
*   `state`: New from **v3.0**, this can be used instead of `active` and `is_inactive`. You can use the following values:
    *   `active` - all keys connected to the policy are active and new keys can be created
    *   `draft` - all keys connected to the policy are active but new keys cannot be created
    *   `deny` - all keys are deactivated and no keys can be created.

{{< note success >}}
**Note**  

Setting a `state` value will automatically override the `active` or `is_inactive` setting.
{{< /note >}}

When you send this request, you should see the following reply with your Policy ID:
```
{
  "Message": "577a8589428a6b0001000017",
  "Meta": null,
  "Status": "OK"
}
```

You can then use this policy ID in the `apply_policy_id` field of an API token. Please see the relevant documentation on session objects for more information about how tokens are attached to policies.

{{< note success >}}
**Note**  

`apply_policy_id` is supported, but has now been deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **Multiple Policy** feature introduced in the **v2.4/1.4** release.
{{< /note >}}



For more information on how policies are constructed and a detailed explanation of their properties, please see the [Security Policies]({{< ref "basic-config-and-security/security/security-policies" >}}) section.
