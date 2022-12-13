---
date: 2017-03-13T14:32:26Z
title: Secure an API
tags: ["Tyk Tutorials", "Getting Started", "Security Policy", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating a first security policy for your API using Tyk"
weight: 3
menu:
    main: 
      parent: "Getting Started"
url: /getting-started/create-security-policy/
aliases:
  - /getting-started/installation/tutorials/create-security-policy/
  - /try-out-tyk/tutorials/create-security-policy/
  - /getting-started/tutorials/create-security-policy/
  - /try-out-tyk/tutorials/create-security-policy/
---


A security policy encapsulates several options that can be applied to a key. It acts as a template that can override individual sections of an API key (or identity) in Tyk.

See [What is a Security Policy?]({{ ref "getting-started/key-concepts/what-is-a-security-policy" >}}) for more details.

{{< tabs_start >}}
{{< tab_start "Cloud" >}}
<br>

{{< include "create-security-policy-include" >}}

{{< tab_end >}}
{{< tab_start "Self-Managed" >}}
<br>

{{< include "create-security-policy-include" >}}
{{< tab_end >}}
{{< tab_start "Open Source" >}}
## Tutorial: Create a Policy with the Gateway

Adding a policy to the Tyk Gateway is very easy. Polices are loaded into memory on load and so need to be specified in advanced in a file called `policies.json`. To add a policy, simply create or edit the `/policies/policies.json` file and add the policy object to the object array:

```{.copyWrapper}
{
  "POLICYID": {
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
  }
}
```

The above creates a new policy with a policy ID that you can define, with the rate limits, and security profile that grants access to the APIs listed in the `access_rights` section.

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
{{< tab_end >}}
{{< tabs_end >}}

