---
date: 2017-03-23T16:54:24Z
title: Partitioned Policies
menu:
  main:
    parent: "Security Policies"
weight: 2 
---

## <a name="partion"></a>Partitioned Policies

In some cases, the all-or-nothing approach of policies, where all components of access control, quota and rate limit are set together isn't ideal, and instead you may wish to have only one or two segments of a token managed at a policy level and other segments in another policy or on the key itself. 
A good example for using a partitioned policy is a scenario in which you are providing access keys across a sliding scale of quota's that vary from user to user, here having many policies per quota level is inefficient (i.e policy Quota100 for 100 per hour, Quota200 for 200 request per hour and so on), you might as well set those values on the token level directly. However you do not want to manage `access control lists` and `rate limit` on a per-key level.

A partitioned policy can enforce any of these elements individually or together on a key:

*   The Access Control Limit (ACL)
*   The Rate limit
*   The Quota limit

### Set up a partition

Set up a policy to be partitioned by adding a new field to your policy object:

```{.json}
"partitions": {
  "quota": false,
  "rate_limit": false,
  "acl": false
}
```

*   `quota`: If set to `true`, enforce the quota element of this policy
*   `rate_limit`: If set to `true`, enforce the rate limit of this policy
*   `acl`: If set to `true`, enforce the access control rules of this policy

Partitions can be applied together, if you select all of them then essentially the whole policy will be enforced.

## <a name="multiple"></a>Multiple Policies

In Gateway v2.4 and Dashboard v1.4 We have extended support for partitioned policies, and you can now mix them up when creating a key (i.e. not just mix partioned policy and definition in the key level directly). Each policy should have *own partition*, and *will not intersect*, to avoid conflicts while merging their rules (i.e. you cannot apply two partitioned policy which enforce `quota` limit). 
 
Using this approach could be useful when you have lot of APIs and multiple subscription options. Before, you had to create a separate policy per API and subscription option. 
 
Using multiple partitioned policies you can create basic building blocks separately for accessing rules, rate limits and policies, and then mix them for the key, to creating unique combination that fit your needs. 
 
We have added a new `apply_policies` field to the Key definition, which is a string array of Policy IDs. The old `apply_policy_id` field is still supported, but is now deprecated.

In the Dashboard, in the **Keys** sceen, when clicking **Add key**, you can choose multiple policies in the **Apply Policies** section.

![Apply Policies](/docs/img/dashboard/system-management/add_key_apply_policies.png)


> **NOTE**: For v2.4 and 1.4 multiple policies are only supported only via the Add Key section and via the API. 
Support oAuth, and Portal API Catalogues are planned for subsequent releases.
Support of multiple policies for JWT and OIDC is done through the API definition when using scopes.
