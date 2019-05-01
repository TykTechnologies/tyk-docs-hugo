---
date: 2017-03-27T11:37:16+01:00
title: Key Management
menu:
  main:
    parent: "Tyk Rest API"
weight: 4 
---

### Create Keys

Create keys will generate a new key - Tyk will generate the access token based on the OrgID specified in the API Definition and a random UUID. This ensures that keys can be "owned" by different API Owners should segmentation be needed at an organisational level.

> **NOTE**: You need to prepend your keys with the `org_id` for the dashboard to list them.
> **NOTE**: `"apply_policy_id": "",` is supported, but has now been deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **Multiple Policy** feature introduced in the **Gateway v2.4 and Dashboard v1.4** release. 

API keys without access_rights data will be written to *all* APIs on the system (this also means that they will be created across all SessionHandlers and StorageHandlers, it is recommended to always embed `access_rights` data in a key to ensure that only targeted APIs and their back-ends are written to.

For smaller APIs and implementations using the default Redis back end will not be unduly affected by this.

| **Property** | **Description**    |
| ------------ | ------------------ |
| Resource URL | `/tyk/keys/create` |
| Method       | POST               |
| Type         | JSON               |
| Body         | Session Object     |

#### Options

Adding the `suppress_reset` parameter and setting it to `1`, will cause Tyk to *not* reset the quota limit that is in the current live quota manager. By default Tyk will reset the quota in the live quota manager (initialising it) when adding a key. Adding the `suppress_reset` flag to the URL parameters will avoid this behaviour.

#### Sample Request

```{.copyWrapper}
POST /tyk/keys/create HTTP/1.1
Host: localhost:8080
x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
Cache-Control: no-cache

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
    "234a71b4c2274e5a57610fe48cdedf40": {
      "api_name": "Versioned API",
      "api_id": "234a71b4c2274e5a57610fe48cdedf40",
      "versions": [
        "v1"
      ]
    }
  },
  "org_id": "53ac07777cbb8c2d53000002",
  "meta_data": {},
  "oauth_client_id": "",
  "oauth_keys": {},
  "basic_auth_data": {
    "password": "",
    "hash_type": ""
  },
  "jwt_data": {
    "secret": ""
  },
  "hmac_enabled": false,
  "hmac_string": "",
  "is_inactive": false,
  "apply_policy_id": "",
  "apply_policies": [
    "59672779fa4387000129507d",
    "53222349fa4387004324324e",
    "543534s9fa4387004324324d"
      ],
  "monitor": {
    "trigger_limits": []
  },
  "tags": []
}
```

#### Sample response

```
{
  "key": "53ac07777cbb8c2d53000002140b44ebc86f4e99644412a8ea8a344d",
  "status": "ok",
  "action": "create"
}
```

### Add/Update Keys

You can also manually add keys to Tyk using your own key-generation algorithm. It is recommended if using this approach to ensure that the `OrgID` being used in the API Definition and the key data is blank so that Tyk does not try to prepend or manage the key in any way.

When using in a hashed key environment, you should be aware of the following [Hashed Key Environment](/docs/security/#using-hashed-keys-endpoints) settings. 

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/tyk/keys/{access_token}` |
| Method       | POST or PUT                |
| Type         | JSON                       |
| Body         | Session Object             |

#### Options

Adding the `suppress_reset` parameter and setting it to `1`, will cause Tyk to *not* reset the quota limit that is in the current live quota manager. By default Tyk will reset the quota in the live quota manager (initialising it) when adding or updating a key. Adding the `suppress_reset` flag to the URL parameters will avoid this behaviour.

#### Sample Request

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
    "234a71b4c2274e5a57610fe48cdedf40": {
      "api_name": "Versioned API",
      "api_id": "234a71b4c2274e5a57610fe48cdedf40",
      "versions": [
        "v1"
      ]
    }
  },
  "org_id": "53ac07777cbb8c2d53000002",
  "meta_data": {},
  "oauth_client_id": "",
  "oauth_keys": {},
  "basic_auth_data": {
    "password": "",
    "hash_type": ""
  },
  "jwt_data": {
    "secret": ""
  },
  "hmac_enabled": false,
  "hmac_string": "",
  "is_inactive": false,
  "apply_policy_id": "",
  "apply_policies": [
    "59672779fa4387000129507d",
    "53222349fa4387004324324e",
    "543534s9fa4387004324324d"
      ],
  "monitor": {
    "trigger_limits": []
  },
  "tags": []
}
```

#### Sample response

```
{
  "key": "sample-key-b3da0730-1d5a-11e4-8c21-0800200c9a66",
  "status": "ok",
  "action": "modified"
}
```

#### Example: Importing Existing Keys into Tyk

You can use the APIs as defined above to import existing keys into Tyk.

This example uses standard `authorization` header authentication, and assumes that the Dashboard is located at `127.0.0.1:8080` and the Tyk secret is `352d20ee67be67f6340b4c0605b044b7` - update these as necessary to match your environment.

To import a key called `abc`, save the JSON contents as `token.json` (see example below), then run the following Curl command:

```
curl http://127.0.0.1:8080/tyk/keys/abc -H 'x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7' -H 'Content-Type: application/json'  -d @token.json
```

The following request will fail as the key doesn't exist:

```
curl http://127.0.0.1:8080/quickstart/headers -H 'Authorization: invalid123'
```

But this request will now work, using the imported key:

```
curl http://127.0.0.1:8080/quickstart/headers -H 'Authorization: abc'
```

#### Example token.json file

```{.json}
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
    "3": {
      "api_name": "Tyk Test API",
      "api_id": "3"
    }
  },
  "org_id": "53ac07777cbb8c2d53000002",
  "basic_auth_data": {
    "password": "",
    "hash_type": ""
  },
  "hmac_enabled": false,
  "hmac_string": "",
  "is_inactive": false,
  "apply_policy_id": "",
  "apply_policies": [
    "59672779fa4387000129507d",
    "53222349fa4387004324324e",
    "543534s9fa4387004324324d"
    ],
  "monitor": {
    "trigger_limits": []
  }
}
```

### Delete Key

Deleting a key will remove it permanently from the system, however analytics relating to that key will still be available.

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/tyk/keys/{access_token}` |
| Method       | DELETE                     |
| Type         | None                       |
| Body         | None                       |
| Params       | api_id={api_id}            |

#### Sample Request

```{.copyWrapper}
DELETE /tyk/keys/sample-key-b3da0730-1d5a-11e4-8c21-0800200c9a66?api_id=90d2416f4710453663bcc376265f886e HTTP/1.1
Host: localhost:8080
x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
Cache-Control: no-cache
```

#### Sample response

```
{
  "key": "sample-key-b3da0730-1d5a-11e4-8c21-0800200c9a66",
  "status": "ok",
  "action": "deleted"
}
```

### List Keys

You can retrieve all the keys in your Tyk instance.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/tyk/keys/`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Params       | api_id={api_id} |

#### Sample Request

```{.copyWrapper}
GET /tyk/keys/?api_id=90d2416f4710453663bcc376265f886e HTTP/1.1
Host: localhost:8080
x-tyk-authorization: 352d20ee67be67f6340b4c0605b044bc4
Cache-Control: no-cache
```

#### Sample Response

```
{
  "keys": [
    "53ac07777cbb8c2d53000002c29ebe0faf6540e0673d6af76b270088",
    "53ac07777cbb8c2d530000027776e9f910e94cd9552c22c908d2d081",
    "53ac07777cbb8c2d53000002d698728ce964432d7167596bc005c5fc",
    "53ac07777cbb8c2d530000028210d848c5854cb35917b2f013529d95"
  ]
}
```
