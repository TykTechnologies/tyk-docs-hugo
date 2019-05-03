---
date: 2017-03-23T10:39:14Z
Title: Create a security policy - Community Edition
menu:
  main:
    parent: "/with-tyk-community-edition"
    identifier: community-edition-create-security-policy
weight: 3
url: "/with-tyk-community-edition/tutorials/create-security-policy"
---

## <a name="what-is-a-security-policy"></a>What is a Security Policy?

A policy encapsulates several security options that can be applied to a token. It acts as a template that can override individual sections of an API token (or identity) in Tyk. A good example is if you had 10,000 API tokens issued, how would you ensure that all 10,000 users received an upgraded quota, or access to a new API that you have published?

You could manually modify all 10,000 tokens, or you could apply a policy to each of those tokens when you create them, and then just modify the policy once.

Policies can set:

*   Access lists for API and versions
*   Access lists for method and path (granular control)
*   Rate limit for a user
*   Quota for a user

Each of these can also be overridden in isolation using the partitioning options. When partitioning a policy, only one segment of the policy will be applied to the token. So, for example, if you need to set quotas and rate limits on a per client basis, but want to manage access control across all of your clients, a partitioned policy with only the ACL enabled would achieve this.

## <a name="create-a-file-based-policy"></a>Tutorial: Create a Policy with the Gateway API

Adding a policy to a file-based (Community Edition) Tyk Gateway is very easy. Polices are loaded into memory on load and so need to be specified in advanced in a file called `policies.json`. To add a policy, simply create or edit the `/policies/policies.json` file and add the policy object to the object array:

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
  "tags": ["Startup Users"]
  }
}
```

The above creates a new policy with a policy ID that you can define, with the rate limits, and security profile that grants access to the APIs listed in the `access_rights` section.



