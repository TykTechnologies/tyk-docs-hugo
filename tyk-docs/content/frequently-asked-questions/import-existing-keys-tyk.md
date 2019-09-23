---
date: 2017-03-27T16:37:57+01:00
title: How to import existing keys into Tyk
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

You can use an API to import existing keys into Tyk.

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

See also the Keys section of the [Gateway API Swagger/Open API doc](/docs/tyk-gateway-api/).


