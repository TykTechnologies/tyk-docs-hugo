---
date: 2017-03-23T16:54:24Z
title: Partitioned Policies
tags: ["Policies", "Partitioning"]
description: "How to create a partitioned policy"
menu:
  main:
    parent: "Security Policies"
weight: 2 
aliases:
  - /basic-config-and-security/security/security-policies/partitioned-policies/
  - /security/security-policies/partitioned-policies/
---

## Partitioned Policies

creating a policy where access rights, usage quota and rate limit are set in stone may not suit your use case. Instead, you may wish to have only one or two segments of a token managed at policy level and the other segments managed at key level or by another policy.

### Example Use Case

You have different tiers of rate limiting as follows:
 
* Tier A has access to the API at a rate of 1000 per 60 seconds
* Tier B a rate of 500 per 60 seconds
* Tier C a rate of 250 per 60 seconds

You could create three separate policies that allow the same access rights and usage quota but have different rate limiting, or, you could create one policy and partition it by enforcing only access rights and usage quota, leaving rate limiting to be defined at key level or by another policy. 

Because the access rights and usage quota are enforced at policy level, you can only make changes to them within the policy. Any changes will then be inherited by all keys with that policy applied without affecting the rate limit defined at key level.

A partitioned policy can enforce any of these elements individually or together on a key:

*   The Access Control Limit (ACL)
*   The Rate limit
*   The Quota limit
*   The GraphQL complexity (currently only query-depth limit is supported)

### Set up a partition in an API

You can partition your policy by adding a `partitions` section to your policy object:

```{.json}
"partitions": {
  "quota": false,
  "rate_limit": false,
  "acl": false,
  "complexity": false
}
```

*   `quota`: If set to `true`, enforce the quota element of this policy
*   `rate_limit`: If set to `true`, enforce the rate limit of this policy
*   `acl`: If set to `true`, enforce the access control rules of this policy
*   `complexity`: If set to `true`, enforce the GraphQL complexity rules of this policy

Partitions can be applied together, if you select all of them then essentially the whole policy will be enforced.

### Set up a partition in the Tyk Dashboard

Once you have added access rights to your policy, open the Global Limits and Quota panel. You’ll see the Policy Partitioning section where you can uncheck Access Rights, Usage Quota or Rate Limiting to enable their value to be defined at key level.

For example, the screenshot below shows that rate limit has not been enforced and therefore can be defined at key level when this policy is applied to a key.

![Global Limits](/img/2.10/partitioned_policy_settings.png)

## Partitioned Policy Functionality

In Gateway v2.4 and Dashboard v1.4 We extended support for partitioned policies, and you can now apply multiple when creating a key. We’ll cover all combinations and how you can expect the key to react.



### Applying partitioned policies to a key with the same segments enforced

If you apply partitioned policies to a key with the same segments enforced, you will be able to override any segment that has not been enforced and define new rules specific to that key. 

**Example One** - Single Policy: Policy A has access rights and usage quota enforced meaning the rate limiting can be defined at key level.

**Example Two** - Multiple Policies: Policy A and Policy B have access rights and usage quota enforced meaning the rate limiting defined at key level will be inherited by both policies.

```{.json}
{
	"policy_a": {
		"access_rights": {
			"1": {
				"api_name": "API One",
				"api_id": "1",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"id": "policy_a",
		"name": "policy_a",
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": true,
			"rate_limit": false
		},
		"quota_max": 100,
		"quota_renewal_rate": 3600,
		"state": "active",
		"tags": []
	},
	"policy_b": {
		"access_rights": {
			"2": {
				"api_name": "API Two",
				"api_id": "2",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"id": "policy_b",
		"name": "policy_b",
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": true,
			"rate_limit": false
		},
		"quota_max": 50,
		"quota_renewal_rate": 3600,
		"state": "active",
		"tags": []
	}
}
```

#### Use Case

You want to give access to the same API with the same usage quota but define separate rate limits for various developers.

### Applying partitioned policies to a key with different segments enforced

For ultimate flexibility, you can create policies that each have only one segment enforced. Instead of creating multiple policies that cover a variety of scenarios you can create a few as building blocks to create unique combinations that suit your needs. 

**Example:**

Policy A has API 1 enforced 
Policy B has API 2 enforced
Policy C has a rate limit of 1000 per 60 seconds enforced 
Policy D has a rate limit of 2000 per 60 seconds enforced
Policy E has an unlimited request usage quota enforced
Policy F has 10,000 requests per hour usage quota enforced

If Policy A, C and E is applied to a key it will give access to API 1 at a rate of 1000 per 60 seconds with unlimited requests. 

If Policy A, D and E is applied to a key it will give access to API 1 at a rate of 2000 per 60 seconds with unlimited requests. 

```{.json}
{
	"policy_a": {
		"access_rights": {
			"1": {
				"api_name": "API 1",
				"api_id": "1",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"id": "policy_a",
		"name": "policy_a",
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": false,
			"rate_limit": false
		},
		"state": "active",
		"tags": []
	},
	"policy_b": {
		"access_rights": {
			"2": {
				"api_name": "API 2",
				"api_id": "2",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"id": "policy_b",
		"name": "policy_b",
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": false,
			"rate_limit": false
		},
		"state": "active",
		"tags": []
	},
	"policy_c": {
		"access_rights": {},
		"active": true,
		"id": "policy_c",
		"name": "policy_c",
		"partitions": {
			"acl": false,
			"complexity": false,
			"per_api": false,
			"quota": false,
			"rate_limit": true
		},
		"per": 60,
		"rate": 1000,
		"state": "active",
		"tags": [],
		"throttle_interval": -1,
		"throttle_retry_limit": -1
	},
	"policy_d": {
		"access_rights": {},
		"active": true,
		"id": "policy_d",
		"name": "policy_d",
		"partitions": {
			"acl": false,
			"complexity": false,
			"per_api": false,
			"quota": false,
			"rate_limit": true
		},
		"per": 60,
		"rate": 2000,
		"state": "active",
		"tags": [],
		"throttle_interval": -1,
		"throttle_retry_limit": -1
	},
	"policy_e": {
		"access_rights": {},
		"active": true,
		"id": "policy_e",
		"name": "policy_e",
		"partitions": {
			"acl": false,
			"complexity": false,
			"per_api": false,
			"quota": true,
			"rate_limit": false
		},
		"quota_max": -1,
		"quota_renewal_rate": -1,
		"state": "active",
		"tags": [],
		"throttle_interval": -1,
		"throttle_retry_limit": -1
	},
	"policy_f": {
		"access_rights": {},
		"active": true,
		"id": "policy_f",
		"name": "policy_f",
		"partitions": {
			"acl": false,
			"complexity": false,
			"per_api": false,
			"quota": true,
			"rate_limit": false
		},
		"quota_max": 10000,
		"quota_renewal_rate": 3600,
		"state": "active",
		"tags": [],
		"throttle_interval": -1,
		"throttle_retry_limit": -1
	}
}
```

#### Use Case

You have 20 developer keys that use a combination of Policy A, B, C, D, E and F and have decided that you’d now like to alter Policy D’s rate limit to 3000 per 60 seconds. All keys with Policy D applied will now inherit the new value instantly. If you had created each of the keys without using policies you would have to find and edit each key manually.

### Applying both a partitioned policy and a non-partitioned policy to a key

If you apply both a partitioned policy and a non-partitioned policy to the same key, any segments that have not been enforced in the partitioned policy will inherit the values in the non-partitioned policy.

#### Example

Policy A has enforced access to API 1 with a rate limit of 1000 per 60 seconds and unlimited requests for the usage quota. 
Policy B only has enforced access to API 2

If both policies were applied to a key, Policy B would automatically inherit Policy A’s rate limit and usage quota because Policy B did not have rate limit or usage quota enforced.

```{.json}
{
	"policy_a": {
		"access_rights": {
			"1": {
				"api_name": "API One",
				"api_id": "1",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": true,
			"rate_limit": true
		},
		"per": 60,
		"quota_max": -1,
		"quota_renewal_rate": -1,
		"rate": 1000,
		"state": "active",
		"tags": [],
		"throttle_interval": -1,
		"throttle_retry_limit": -1
	},
	"policy_b": {
		"access_rights": {
			"2": {
				"api_name": "API Two",
				"api_id": "2",
				"versions": [
					"Default"
				]
			}
		},
		"active": true,
		"partitions": {
			"acl": true,
			"complexity": false,
			"per_api": false,
			"quota": false,
			"rate_limit": false
		},
		"state": "active",
		"tags": []
	}
}
```

#### Use Case

A developer already has a key that gives access to Policy A and now requires access to another API product. The developer is already paying for a specific rate and limit and just needs access to the additional API. Instead of editing Policy A to allow for the additional API access (which would then affect all keys with this policy applied), we can instead create Policy B and combine the two, allowing the additional API in Policy B to inherit the same rate and limit the developer requires.

{{< note success >}}
**Note**  

For v2.4 and 1.4 multiple policies are only supported only via the Add Key section and via the API.
Support oAuth, and Portal API Catalogues are planned for subsequent releases.
Support of multiple policies for JWT and OIDC is done through the API definition when using scopes.
{{< /note >}}
