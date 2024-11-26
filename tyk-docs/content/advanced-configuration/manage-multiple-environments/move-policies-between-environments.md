  ---
date: 2017-03-24T12:27:47Z
title: Move Policies Between Environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 6 
---

Moving policies between two (Dashboard) environments is not as easy as moving API definitions and requires working with the Dashboard API to first retrieve the policies, and then modifying the document to reinsert them in your new environment:

### Preparation

First you must set up your new environment to respect explicit policy IDs. To do so, edit the `tyk.conf` and `tyk_analytics.conf` files in your new environment and set the `policies. allow_explicit_policy_id` setting to `true` (the setting is just `allow_explicit_policy_id` at the root level of the Dashboard configuration). In order to retain your `api_id` when moving between environments then set `enable_duplicate_slugs` to `true` in your target `tyk_analytics.conf`.

### Step 1: Get your Policy

```{.copyWrapper}
curl -X GET -H "authorization: {YOUR TOKEN}" \
  -s \
  -H "Content-Type: application/json" \
  https://admin.cloud.tyk.io/api/portal/policies/{POLICY-ID} | python -mjson.tool > policy.json
```

### Step 2: Edit the file we just created

The original file will look something like this, notice the two ID fields:

```{.json}
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

```{.json}
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

```{.copyWrapper}
curl -X POST -H "authorization: {API-TOKEN}" \
  -s \
  -H "Content-Type: application/json" \
  -d @policies.json \
  https://{YOUR-NEW-ENV}/api/portal/policies | python -mjson.tool
```

That's it, Tyk will now load this policy, and you will be able to manage and edit it the same way in your new environment, if you are re-creating tokens in your new environment, then those tokens' ACL does not need to be changed to a new policy ID since the legacy one will always be used as the reference for the policy.

#### Policy IDs in the Dashboard

After migrating a Policy from one environment to another, it is important to note that the **displayed** Policy ID is not going to match.  **That is okay**.  It happens because Tyk Dashboard displays the [`Mongo ObjectId`](https://docs.mongodb.com/manual/reference/glossary/#term-id), which is the `_id` field, but the `id` is the important part.

**For example:**

Policies in source environment
{{< img src="/img/2.10/policy_id_before.png" alt="Policy ID Before" >}}

Policies in target environment after migration
{{< img src="/img/2.10/policy_id_after.png" alt="Policy ID After" >}}

Notice that the IDs appear to be different.  These are the BSON IDs and are expected to be different.  But if we look for the underlying GUID `id`, you can see it's been mapped properly in the target environment.

```
$ curl dash-host-source/api/portal/policies/

    ....
    "_id": "5eb1b133e7644400013e54ec",
    "id": "",
    "name": "credit score",

$ curl dash-host-target/api/portal/policies/

    ....
    "_id": "5f03be2ce043fe000177b047",
    "id": "5eb1b133e7644400013e54ec",
    "name": "credit score",
```

As you can see, under the hood, the policy has been migrated correctly with target Tyk Dashboard saving the proper ID inside `id`.   That is the value that will be referred to inside Key Creation, etc.

## Use Tyk-Sync

You can also use our new Tyk-Sync tool which allows you to sync your Policies (and APIs) with a Version Control System (VCS). You can then move your Policies between environments. See [Tyk-Sync]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) for more details.
