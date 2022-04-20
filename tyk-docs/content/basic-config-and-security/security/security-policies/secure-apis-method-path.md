---
date: 2017-03-23T16:55:49Z
title: Secure your APIs by Method and Path
menu:
  main:
    parent: "Security Policies"
weight: 3 
url: /security/security-policies/secure-apis-method-path/ 
aliases:
  - /basic-config-and-security/security/security-policies/secure-apis-method-path/
---

Tyk already lets you set version access rights, allowed, and blocked paths to control how your users access your APIs, however what has not been easy to do is to restrict access based on specific paths, per key or policy.

Granular path control allows you to define which methods and paths a key is allowed to access on a per API-version basis. This can be done on a key-by-key basis, or, for even more power and control, through the Policies feature.

With this feature it is possible to set up tiered access policies for your users, so if you offer read only, free and extended access to your APIs and are charging for the higher levels, you can encode these tiers into policies, and use the granular path control feature to limit what paths and methods the keys with those access policies can access.

Or, alternatively, you could just upgrade a single key to have more access, both methods use the same, or similar areas of the configuration to make this possible.

{{< note success >}}
**Note**  

Granular permissions are applied *after* version-based (global) allowlist/blocklist rules.
{{< /note >}}


### Setting granular paths on a per-key basis

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

### Using granular control with a key template

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
