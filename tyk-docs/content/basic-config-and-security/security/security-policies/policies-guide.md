---
date: 2017-03-23T16:33:00Z
title: Policies Guide
tags: ["Policies", "Security"]
description: "How to create and use policies in Tyk"
menu:
  main:
    parent: "Security Policies"
weight: 1
aliases:
  - /docs/security/security-policies/policies-guide/
---

## Security Policy Example

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

Here you can see the various fields as they are applied to Tyk keys, these are all described in the Keys section of the [Gateway API](/docs/tyk-gateway-api/).

The important differences here are two new additions:

The `active` flag must be set to `true` for Tyk to load the policy into memory, this makes it easy to enable or disable policies without deleting them.

Secondly, the `is_inactive` flag applies to the key itself. If you set this value to `true`, any key with this policy will be disabled, you can actually set this same value on a key object to make the single key inactive, but as part of a policy it makes it possible to deny access to a whole block of users with a single change.

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

## How You Can Create Policies

[With the Dashboard API](/docs/getting-started/tutorials/create-security-policy/#tutorial-create-a-security-policy-with-the-api)

[With the Gateway API - Open Source tab](/docs/getting-started/tutorials/create-security-policy)

[With the Dashboard](/docs/getting-started/tutorials/create-security-policy/#tutorial-create-a-security-policy-with-the-dashboard)
