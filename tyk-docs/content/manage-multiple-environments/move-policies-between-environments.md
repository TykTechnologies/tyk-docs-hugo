---
date: 2017-03-24T12:27:47Z
title: Move policies between environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 0 
---

Moving policies between two (Dashboard) environments is not as easy as moving API definitions and requires working with the Dashboard API to first retrieve the policies, and then modifying the document to reinsert them in your new environment:

### Preparation

First you must set up your new environment to respect explicit policy IDs. To do so, edit the `tyk.conf` and `tyk_analytics.conf` files in your new environment and set the `policies. allow_explicit_policy_id` setting to `true` (the setting is just `allow_explicit_policy_id` at the root level of the Dashboard configuration).

### Step 1: Get your Policy

```
    curl -X GET -H "authorization: {YOUR TOKEN}" \
     -s \
     -H "Content-Type: application/json" 
     https://admin.cloud.tyk.io/api/portal/policies/{POLICY-ID} | python -mjson.tool > policy.json
```

### Step 2: Edit the file we just created

The original file will look something like this, notice the two ID fields:

```
    {
        "_id": "5777ecdb0a91ff0001000003",
        "access_rights": {
            "xxxxx": {
                "allowed_urls": [],
                "api_id": "xxxxx",
                "api_name": "Test",
                "versions": [
                    "Default"
                ]
            }
        },
        "active": true,
        "date_created": "0001-01-01T00:00:00Z",
        "hmac_enabled": false,
        "id": "",
        "is_inactive": false,
        "key_expires_in": 0,
        "name": "Test Policy",
        "org_id": "xxxxx",
        "partitions": {
            "acl": false,
            "quota": false,
            "rate_limit": false
        },
        "per": 60,
        "quota_max": -1,
        "quota_renewal_rate": 60,
        "rate": 1000,
        "tags": []
    }
```

### Step 3: Move the id field value

Remove the `_id` field and put the value of the `_id` field into the `id` field, so `policy.json` should look like this:

```
    {
        "access_rights": {
            "xxxxx": {
                "allowed_urls": [],
                "api_id": "xxxxx",
                "api_name": "Test",
                "versions": [
                    "Default"
                ]
            }
        },
        "active": true,
        "date_created": "0001-01-01T00:00:00Z",
        "hmac_enabled": false,
        "id": "5777ecdb0a91ff0001000003", <------ NEW ID FIELD
        "is_inactive": false,
        "key_expires_in": 0,
        "name": "Test Policy",
        "org_id": "xxxxx",
        "partitions": {
            "acl": false,
            "quota": false,
            "rate_limit": false
        },
        "per": 60,
        "quota_max": -1,
        "quota_renewal_rate": 60,
        "rate": 1000,
        "tags": []
    }
```

### Step 4: Update the policy via the API

Save the new `policies.json` file and then let's POST it back to the new environment:

```
    curl -X POST -H "authorization: {API-TOKEN}" \
     -s \
     -H "Content-Type: application/json" \
     -d @policies.json 
     https://{YOUR-NEW-ENV}/api/portal/policies | python -mjson.tool
```

That's it, Tyk will now load this policy, and you will be able to manage and edit it the same way in your new environment, if you are re-creating tokens in your new environment, then those tokens' ACL does not need to be changed to a new policy ID since the legacy one will always be used as the reference for the policy.

