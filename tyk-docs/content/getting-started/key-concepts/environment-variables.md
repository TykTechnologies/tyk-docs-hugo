---
title: Tyk Environment Variables
menu:
  main:
    parent: "Key Concepts"
weight: 12 
url: /tyk-environment-variables
aliases:
  - /tyk-configuration-reference/environment-variables/
  - /configure/environment-variables/
---

You can use environment variables to override the config file settings for the Gateway, Dashboard and Pump. Environment variables are created from the dot notation versions of the JSON objects contained with the config files. However, there are some exceptions to the mentioned rules. For more information, you can see all the available env vars: 
[Tyk Dashboard]({{< ref "/content/tyk-stack/tyk-manager/configuration/tyk-dashboard-configuration-options.md" >}})
[Tyk Gateway]({{< ref "/content/tyk-stack/tyk-gateway/configuration/tyk-gateway-configuration-options.md" >}})
[Tyk Pump]({{< ref "/content/tyk-stack/tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables.md" >}})


## How to configure an Environment Variable

{{< note success >}}
**Note**  

The following example uses a section from the Gateway config file `tyk.conf`, but the same applies to the Dashboard and the Pump configs.
{{< /note >}}


### Step One - Convert the JSON to dot notation

```
"policies": {
    "policy_source": "service",
    "policy_connection_string": "http://tyk-dashboard:3000",
    "policy_record_name": "tyk_policies",
    "allow_explicit_policy_id": true
  }
```

When targeting the various keys, you need to use dot notation, so the above policies settings become:

```
policies.policy_source
policies.policy_connection_string
policies.policy_record_name
policies.allow_explicit_policy_id
```

### Step Two - Convert the dot notation to environment variables

* Remember this is for the Gateway, so we have to add the `TYK_GW_` prefix.
* Any underscores are removed.
* The dot notation is converted to underscores. 
* The Environment variables are written in uppercase.

So:

```
policies.policy_source
policies.policy_connection_string
policies.policy_record_name
policies.allow_explicit_policy_id
```

Becomes:

```
TYK_GW_POLICIES_POLICYSOURCE
TYK_GW_POLICIES_POLICYCONNECTIONSTRING
TYK_GW_POLICIES_POLICYRECORDNAME
TYK_GW_POLICIES_ALLOWEXPLICITPOLICYID
```

## Prefixes

* As above, Gateway environment variables require a `TYK_GW_` prefix
* Dashboard environment variables require a `TYK_DB_` prefix
* Pump environment variables require a `TYK_PMP_` prefix
* MDCB environment variables require a `TYK_MDCB_` prefix

### 
