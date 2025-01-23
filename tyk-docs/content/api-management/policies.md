---
date: 2017-03-23T16:33:00Z
title: Security Policy and Access Keys
tags: ["Policies", "Security", "Security Policy", "Access Key", "API Key"]
description: "How to create and use policies and access keys in Tyk"
keywords: ["Policies", "Security", "Security Policy", "Access Key", "API Key"]
aliases:
  - /security/security-policies
  - /basic-config-and-security/security/security-policies
  - /security/security-policies/policies-guide
  - /basic-config-and-security/security/security-policies/partitioned-policies
  - /security/security-policies/partitioned-policies
  - /basic-config-and-security/security/security-policies/secure-apis-method-path
  - /basic-config-and-security/security/security-policies/policies-guide
  - /security/security-policies/secure-apis-method-path
  - /basic-config-and-security/security/security-policies/partitioned-policies
  - /getting-started/key-concepts/what-is-a-security-policy
  - /basic-config-and-security/control-limit-traffic/key-expiry
  - /basic-config-and-security/security/key-hashing
  - /basic-config-and-security/security/key-level-security
---

## Introduction

In Tyk, a security policy acts as a template for access control and rate limiting. It can be applied to multiple access keys, OAuth clients, or JWT tokens, allowing you to manage API access at scale.

Access keys, on the other hand, are the tokens that clients use to authenticate and access your APIs. These keys can either have their own individual settings or inherit settings from one or more security policies.

By leveraging security policies and access keys together, you can:

- Standardize access control across multiple users or applications.
- Easily update access rights for groups of users.
- Implement tiered access levels (e.g., basic, premium, enterprise).
- Manage and monitor API usage effectively.

In the following sections, we'll explore how to create and manage security policies and access keys using both the Tyk Dashboard and API.

## What is a Security Policy

A Tyk security policy incorporates several security options that can be applied to an API key. It acts as a template that can override individual sections of an API key (or identity) in Tyk. For example, if you had 10,000 API keys issued, how would you ensure that all 10,000 users received an upgraded quota or access a new API that you have published?

Using policies provides a more scalable and manageable way to control access compared to configuring each key separately, especially when dealing with large numbers of keys.
You could manually modify all 10,000 keys, or you could apply a policy to each of those keys when you create them, and then just modify the policy once. 

**Policies can set:**

* Access lists for API and versions
* Access lists for method and path (granular control)
* Rate limit for a user
* Quota for a user
* Add tags and metadata

Each of these can also be overridden in isolation using the partitioning options. When partitioning a policy, only one segment of the policy will be applied to the key. So, for example, if you need to set quotas and rate limits on the user level, but want to manage access control across all of your users, a partitioned policy with only the ACL enabled would achieve this.

## Relationship between Security Policy and Access Key

A security policy acts as a template that defines access rights, rate limits, quotas and other security settings whereas an access key (API key) is issued to a client/user to authenticate and access APIs.

When creating an access key, you can apply one or more security policies to it. This associates the policy settings with that specific key. The policy settings then override the individual settings on the key itself.

This allows you to manage access controls and limits for groups of keys by just modifying the policy, rather than updating each key individually. You can apply multiple policies to a single key, allowing for flexible combinations of access rights.

When a request comes in with an access key, Tyk will evaluate the associated policies to determine the permissions and limits for that key.

In essence, security policies provide a reusable template of settings that can be easily applied to many access keys, simplifying management and allowing for centralized control of API access and usage limits.

## Policies Guide

A Tyk policy looks just like the session object that is used when you create a new key:

```{.copyWrapper}
{
  org_id: "53ac07777cbb8c2d53000002",
  rate: 3,
  per: 1,
  quota_max: 1000,
  quota_renewal_rate: 90000,
  access_rights: {
    b605a6f03cc14f8b74665452c263bf19: {
      apiname: "Tyk Test API",
      apiid: "b605a6f03cc14f8b74665452c263bf19",
      versions: [
        "Default"
      ],
      allowed_urls: []
    },
    "3b7e73fd18794f146aab9c2e07b787bf": {
      apiname: "Second Test API",
      apiid: "3b7e73fd18794f146aab9c2e07b787bf",
      versions: [
        "Test"
      ],
      allowed_urls: []
    }
  },
  active: true,
  is_inactive: false,
  tags: [],
  key_expires_in: 0
}
```

Here you can see the various fields as they are applied to Tyk keys, these are all described in the Keys section of the [Gateway API]({{< ref "tyk-gateway-api" >}}).

The important differences here are two new additions:

- The `active` flag must be set to `true` for Tyk to load the policy into memory, this makes it easy to enable or disable policies without deleting them.

- Secondly, the `is_inactive` flag applies to the key itself. If you set this value to `true`, any key with this policy will be disabled, you can actually set this same value on a key object to make the single key inactive, but as part of a policy it makes it possible to deny access to a whole block of users with a single change.

### Trial keys

It is possible to have a policy create "Trial" keys, these are keys with a fixed expiry date set in the number of seconds from the time of the keys creations.

Although key expiry can be set in the session object on creation, when a key is created using the portal or a key request it will have a default expiry time.

To set a trial key expiry, simply add:

```{.copyWrapper}
`key_expires_in: 50000`
```

To the policy object, when the key is generated, the expiry will be forced.

### Configuring Pro Edition to use a policy list

Tyk Pro (The Dashboard) has policies enabled by default.

### Configuring the Open Source Edition to use a policy list

If your Tyk configuration is standalone and configuration is being managed via the Gateway API without the support of the dashboard, then you will need to set the `policies section` in your configuration file as follows:

```{.copyWrapper}
"policies": {
  "policy_source": "file",
  "policy_record_name": "./policies/policies.json"
},
```

Here the `policy_source` section is set to `file` and tells Tyk to look for policy record in the file specified in the `policy_record_name` field. An example file is shipped with Tyk, and it will look like this:

```{.copyWrapper}
{
  "default": {
      "rate": 1000,
      "per": 1,
      "quota_max": 100,
      "quota_renewal_rate": 60,
      "access_rights": {
        "41433797848f41a558c1573d3e55a410": {
          "api_name": "My API",
          "api_id": "41433797848f41a558c1573d3e55a410",
          "versions": [
            "Default"
          ]
        }
      },
      "org_id": "54de205930c55e15bd000001",
      "hmac_enabled": false
  }
}
```

The record is a single JSON object, with each named key representing the policy ID, so you can list multiple policies within the single JSON object. In the above example we have only defined a single policy called `default`.

### Applying a policy to a key

To apply the above policy to a key, we simply need to call the `/create` (or `/add`) endpoint in the Tyk REST API with a session object that has the `apply_policy_id` flag set to the name `default` (or whatever you named your policy).

{{< note success >}}
**Note**  

Although `apply_policy_id` is still supported, it is now deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **Multiple Policy** feature introduced in the **v2.4** release.
{{< /note >}}


```{.copyWrapper}
{
  "allowance": 2,
  "rate": 3,
  "per": 1,
  "expires": 0,
  "quota_max": 1000,
  "quota_renews": 1429804261,
  "quota_remaining": 1000,
  "quota_renewal_rate": 90000,
  "access_rights": {},
  "org_id": "53ac07777cbb8c2d53000002",
  "EnableHTTPSignatureValidation": false,
  "hmac_enabled": false,
  "hmac_string": "",
  "is_inactive": false,
  "apply_policy_id": "default",
  "apply_policies": [
    "59672779fa4387000129507d",
    "53222349fa4387004324324e",
    "543534s9fa4387004324324d"
    ]
}
```

Although we have set the main factors of the key, they will be overridden by the policy as soon as the key is loaded, this will happen each time the key appears, so modifying a policy will have an instant effect on the token.

### How You Can Create Policies

[With the Dashboard API]({{< ref "getting-started/create-security-policy#tutorial-create-a-security-policy-with-the-api" >}})

[With the Gateway API - Open Source tab]({{< ref "getting-started/create-security-policy" >}})

[With the Dashboard]({{< ref "getting-started/create-security-policy#tutorial-create-a-security-policy-with-the-dashboard" >}})

---
---
---

### Secure your APIs by Method and Path

Tyk already lets you set version access rights, allowed, and blocked paths to control how your users access your APIs, however what has not been easy to do is to restrict access based on specific paths, per key or policy.

Granular path control allows you to define which methods and paths a key is allowed to access on a per API-version basis. This can be done on a key-by-key basis, or, for even more power and control, through the Policies feature.

With this feature it is possible to set up tiered access policies for your users, so if you offer read only, free and extended access to your APIs and are charging for the higher levels, you can encode these tiers into policies, and use the granular path control feature to limit what paths and methods the keys with those access policies can access.

Or, alternatively, you could just upgrade a single key to have more access, both methods use the same, or similar areas of the configuration to make this possible.

{{< note success >}}
**Note**  

Granular permissions are applied *after* version-based (global) allowlist/blocklist rules.
{{< /note >}}


#### Setting granular paths on a per-key basis

Let's take a look at a key session definition:

```{.copyWrapper}
{
  "last_check": 0,
  "allowance": 2,
  "rate": 3,
  "per": 1,
  "expires": -1,
  "quota_max": 1000,
  "quota_renews": 1429804261,
  "quota_remaining": 994,
  "quota_renewal_rate": 90000,
  "access_rights": {
    "3b7e73fd18794f146aab9c2e07b787bf": {
      "api_name": "Second Test API",
      "api_id": "3b7e73fd18794f146aab9c2e07b787bf",
      "versions": [
          "Test"
      ],
      "allowed_urls": []
    },
      "b605a6f03cc14f8b74665452c263bf19": {
        "api_name": "Tyk Test API",
        "api_id": "b605a6f03cc14f8b74665452c263bf19",
        "versions": [
          "Default"
        ],
        "allowed_urls": []
      }
  },
  "org_id": "53ac07777cbb8c2d53000002",
  "oauth_client_id": "",
  "basic_auth_data": {},
  "hmac_enabled": false,
  "hmac_string": "",
  "is_inactive": false
}
```

Within the `access_rights` section, in each version definition, we can see an `allowed_urls` section, here we can define which URLs are enabled in this key as follows:

```{.copyWrapper}
    "allowed_urls": [
        {
            "url": "/resource/(.*)",
            "methods": ["GET", "POST"]
        }
    ]
```

Each entry must be a valid Regex pattern and use the [Go syntax](https://golang.org/pkg/regexp/syntax/) (unfortunately Tyk does not accept regular expressions written with the Perl syntax at this time). Methods are case sensitive. This is an allow list, and can be used to define exactly what kind of access a key can have to your API.

#### Using granular control with a key template

This feature is much more powerful when applied to key templates and the policies feature, within the policy definition you can add the same section:

```{.copyWrapper}
{
  "default": {
    "rate": 1000,
    "per": 1,
    "quota_max": 100,
    "quota_renewal_rate": 60,
    "access_rights": {
      "41433797848f41a558c1573d3e55a410": {
        "api_name": "My API",
        "api_id": "41433797848f41a558c1573d3e55a410",
        "versions": [
          "Default"
        ],
        "allowed_urls": [
          {
            "url": "/resource/(.*),
            "methods": ["GET", "POST"]
          }
        ]
      }
    },
    "org_id": "54de205930c55e15bd000001",
    "hmac_enabled": false
  }
}
```

These paths will be copied into the active key session the next time a key that is using this policy appears.

## Partitioned Policies

Creating a policy where access rights, usage quota and rate limit are set in stone may not suit your use case. Instead, you may wish to have only one or two segments of a token managed at policy level and the other segments managed at key level or by another policy.

### Example Use Case

You have different tiers of rate limiting as follows:
 
* Tier A has access to the API at a rate of 1000 per 60 seconds
* Tier B a rate of 500 per 60 seconds
* Tier C a rate of 250 per 60 seconds

You could create three separate policies that allow the same access rights and usage quota but have different rate limiting, or, you could create one policy and partition it by enforcing only access rights and usage quota, leaving rate limiting to be defined at key level or by another policy. 

Because the access rights and usage quota are enforced at policy level, you can only make changes to them within the policy. Any changes will then be inherited by all keys with that policy applied without affecting the rate limit defined at key level.

A partitioned policy can enforce any of these elements individually or together on a key:

*   The Access Control List (ACL), configured using the `access_rights` field
    *   When applying partitioned policies to a key, at least one of these policies needs to enforce ACL 
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

{{< img src="/img/2.10/partitioned_policy_settings.png" alt="Global Limits" >}}

### Partitioned Policy Functionality

In Gateway v2.4 and Dashboard v1.4 We extended support for partitioned policies, and you can now apply multiple when creating a key. We’ll cover all combinations and how you can expect the key to react.



#### Applying partitioned policies to a key with the same segments enforced

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

##### Use Case

You want to give access to the same API with the same usage quota but define separate rate limits for various developers.

#### Applying partitioned policies to a key with different segments enforced

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

##### Use Case

You have 20 developer keys that use a combination of Policy A, B, C, D, E and F and have decided that you’d now like to alter Policy D’s rate limit to 3000 per 60 seconds. All keys with Policy D applied will now inherit the new value instantly. If you had created each of the keys without using policies you would have to find and edit each key manually.

#### Applying both a partitioned policy and a non-partitioned policy to a key

If you apply both a partitioned policy and a non-partitioned policy to the same key, any segments that have not been enforced in the partitioned policy will inherit the values in the non-partitioned policy.

##### Example

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

##### Use Case

A developer already has a key that gives access to Policy A and now requires access to another API product. The developer is already paying for a specific rate and limit and just needs access to the additional API. Instead of editing Policy A to allow for the additional API access (which would then affect all keys with this policy applied), we can instead create Policy B and combine the two, allowing the additional API in Policy B to inherit the same rate and limit the developer requires.

{{< note success >}}
**Note**  

For v2.4 and 1.4 multiple policies are only supported only via the Add Key section and via the API.
Support oAuth, and Portal API Catalogs are planned for subsequent releases.
Support of multiple policies for JWT and OIDC is done through the API definition when using scopes.
{{< /note >}}

## Access Keys

### Access Key Expiry

Key Expiry allows you to set the lifetime of tokens, ensuring a regular re-cycling of API tokens. If a key has expired Tyk will no longer let requests through on a token, however this **does not mean** that Tyk will remove the key.

#### Token Expiry Behavior and Time-To-Live

If a key is expired, Tyk will return a warning that the token has expired to the end user. If a token has been deleted, then Tyk will return an access denied response to the client. This is an important difference. In some cases, API tokens are hard-coded (this is terrible practice, but it does happen far more often than you might think). In this case it is extremely expensive to replace the token if it has expired.

In the above case, if a token had been deleted because the **Time To Live** of the token matched it's expiry time, then the end user would need to replace the token with a new one. However, because we do not expire the key it is possible for an administrator to reset the expiry of the token to allow access and manage renewal in a more granular way.

#### Timestamp format on a session object

Tyk manages timestamps in the Unix timestamp format - this means that when a date is set for expiry it should be converted to a Unix timestamp (usually a large integer) which shows seconds since the epoch (Jan 1 1970). This format is used because it allows for faster processing and takes into account timezone differences without needing localisation.

Key sessions are created and updated using the Tyk Gateway API, in order to set the expiry date for a key, update the `expires` value with a Unix timestamp of when the key should expire.

<br>

{{< note success >}}
**Note**  

`expires` can only be a positive number, or `0` if you don't want the key to expire.
{{< /note >}}


#### How to delete expired tokens

In order to not clutter the database with expired tokens, Tyk provides a way to force a TTL on all keys, this is a maximum time to live and should always be significantly larger than your maximum expiry setting. This setting must be set on a per-API basis.

To enforce a TTL, set the `session_lifetime` value (in seconds) in your API Definition Object, this will need to be managed via the Dashboard REST API.

### Access Key Hashing

Tyk stores all API Tokens and their equivalent Session Objects in a Redis DB. Because of this, Tyk will, by default, obfuscate the tokens in Redis using a key hash.

#### Default Key Hash Algorithm

To find a balance between performance and security, the default algorithm used by Tyk to do the hashing is `murmur3`, and serves more to obfuscate than to cryptographically secure the tokens.

It is possible to disable key hashing in Tyk using `hash_keys` set to `false` in your `tyk.conf` and `tyk_analytics.conf`.

See the [Gateway Configuration Options]({{< ref "tyk-oss-gateway/configuration" >}}) for more details.

#### Custom Key Hash Algorithms

To set a custom algorithm, you need to set `hash_key_function` in your `tyk.conf` to one of the following options:

* `murmur32`
* `murmur64`
* `murmur128`
* `sha256`

MurMur non-cryptographic hash functions are considered as the industry fastest and conflict-prone algorithms up to date, which gives a nice balance between security and performance. With this change you now you can choose the different hash length, depending on your organization security policies. We have also introduced a new `sha256` cryptographic key hashing algorithm, for cases when you are willing to sacrifice some performance for additional security.

Performance wise, setting new key hashing algorithms can increase the key hash length, as well as key length itself, so expect that your analytics data size to grow (but not that much, up to about 10%). Additionally, if you set the `sha256` algorithm, it will significantly slowdown Tyk, because cryptographic functions are slow by design but very secure.

Technically wise, it is implemented by new key generation algorithms, which now embed additional metadata to the key itself, and if you are curious about the actual implementation details, feel free to check the following [pull request](https://github.com/TykTechnologies/tyk/pull/1753).

Changing hashing algorithm is entirely backward compatible. All your existing keys will continue working with the old `murmur32` hashing algorithm, and your new keys will use the algorithm specified in your `tyk.conf`. Moreover, changing algorithms is also backward compatible, and Tyk will maintain keys with multiple hashing algorithms without any issues.

A hashed installation imposes some constraints on how Tyk is used:

*   Listing tokens requires setting `enable_hashed_keys_listing` to `true` in your `tyk.conf` file
*   Tokens appear in Analytics in their hashed form

{{< warning success >}}
**Warning**  

Switching from a hashed installation to non-hashed means all existing tokens cannot be used (they will not be correctly validated).
{{< /warning >}}


#### Using Hashed Keys Endpoints

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return the field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes. You can disable this endpoint by using the new `tyk.conf` setting `enable_hashed_keys_listing` (set to `false` by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get a key by hash. You just need provide the key hash as a `keyName` 
and call it with the new optional query parameter `hashed=true`. So the new format is `GET /keys/{keyName}?hashed=true"`
- we also have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true` and call it with the optional query parameter `hashed=true`. So the format is `GET /keys/{keyName}?hashed=true"`
- The same optional parameter is available for the `DELETE /keys/{keyName}?hashed=true` endpoint

See the Keys section of [Tyk Gateway API Swagger page]({{< ref "tyk-gateway-api" >}}) for more details.

### Access Key Level Security

Tyk supports the concept of access control at the key level. Access control is managed via three important settings in a session object. In order to be fully clear on how Tyk handles access control, it's worth looking at the key settings that go into a user session object. A full description of each of the options can be found in the [Tyk Gateway API documentation]({{< ref "tyk-gateway-api" >}}).

Tyk will store each access key as a record in your Redis database, and this key will have certain metadata attached to it. The record takes this form:

```{.copyWrapper}
{
  "allowance": 1000,
  "rate": 1000,
  "per": 60,
  "expires": -1,
  "quota_max": -1,
  "quota_renews": 1406121006,
  "quota_remaining": 0,
  "quota_renewal_rate": 60,
  "access_rights": {
    "APIID1": {
      "api_name": "HMAC API",
      "api_id": "APIID1",
      "versions": [
        "Default"
      ]
    }
  },
  "org_id": "1",
  "hmac_enabled": false,
  "hmac_string": ""
}
```

The important elements that manage access control are the following fields:

*   `allowance` & `rate`: these should be set to the same value, these are the users allowance during a period as set by `per`.
*   `per`: The time in seconds where a rate limit is applied.
*   `expires`: The date when the key expires. **Note:** `expires` can only be a positive number, or -1 (unlimited).
*   `quota_max`: The usage quota for the user. **Note:** `quota_max` can only be a positive number, or -1 (unlimited).
*   `quota_renews`: the Unix timestamp when the quota is renewed.
*   `quota_renewal_rate`: The time, in seconds, of when the quota gets renewed (e.g. 86400 would represent 1 day).

These settings can be used exclusively or in conjunction with one another to create usage patterns and tiers of access for your users. Each time a request is processed by Tyk, the session will be updated with an updated quota (if used), and updated throttling rate depending on the time-frame specified.

Creating new keys is done by POSTing an object such as the above to the Tyk create key API endpoint. See the keys section of the [Tyk Gateway API OpenAPI/Swagger]({{< ref "tyk-gateway-api" >}}) page.

The three types of access control are:

#### Rate limiting

Also known as throttling, the API will actively only allow a key to make x requests per y time period. this is very useful if you want to ensure your API does not get flooded with requests.

In order to apply a rate limit:

1.  Ensure that `allowance` and `rate` are set to the same value, this should be number of requests to be allowed in a time period, so if you wanted 100 requests every second, set this value to 100.
2.  Ensure that `per` is set to the time limit. Again, as in the above example, if you wanted 100 requests per second, set this value to 1. If you wanted 100 per 5 seconds, set this value to 5 etc.

#### Quotas

A quota is similar to a rate limit, as it allows a certain number of requests through in a time period. However, traditionally these periods are much longer, so for example if you would like to limit a user to only 10,000 requests to the API per month, you can create a key that has no rate limiting but will disallow access once the quota is empty. Tyk will automatically reset the quota if the time limit on reset has been exceeded.

In order to set a quota for a user:

1.  Ensure that `quota_max` is set to the maximum amount of requests that a user is allowed to make in a time period.
2.  Ensure `quota_remaining` is set to the same value as `quota_max`, this is the value that will decrement on each request (failed or successful).
3.  Set the `quota_renewal_rate` to the value, in seconds, of when the quota should renew. For example, if you would like it to renew every 30 days, you would have `2592000` seconds (`((60*60) * 24) * 30 = 2592000`).

To set an unlimited quota, set `quota_max` to `-1`.

{{< note success >}}
**Note**  

`quota_max` can only be a positive number, or -1 (unlimited).
{{< /note >}}

#### Key Expiry

If you set a date in the key expiry field, when the key is created (or updated), the expiry time is also set as the keys deletion time from Redis. If a key has expired Tyk will no longer let requests through on this key.

Tyk manages timestamps in the Unix timestamp format - this means that when a date is set for expiry it should be converted to a Unix timestamp (usually a large integer) which shows seconds since the epoch (Jan 1 1970). This format is used because it allows for faster processing and takes into account timezone differences without needing localisation.

Key sessions are created and updated using the Tyk REST API, in order to set the expiry date for a key, update the `expires` value with the timestamp of when the key should expire.

Leave this field empty for it never to expire.
