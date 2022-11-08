---
date: 2017-03-13T15:08:55Z
Title: Access an API
tags: ["Tyk Tutorials", "Getting Started", "API Key", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating an API access key using Tyk"
menu:
  main:
    parent: "Getting Started"
weight: 3
url: /getting-started/create-api-key/
aliases:
  - /try-out-tyk/tutorials/create-api-key/
  - /try-out-tyk/create-api-key/
  - /getting-started/tutorials/create-api-key/
---

{{< tabs_start >}}
{{< tab_start "Cloud" >}}

{{< include "create-api-key-include" >}}

You will see a 200 response with your new key:
```
{
  "api_model": {},
  "key_id": "59bf9159adbab8abcdefghijac9299a1271641b94fbaf9913e0e048c",
  "data": {...}
}
```

The value returned in the `key_id` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.

{{< tab_end >}}
{{< tab_start "Self-Managed" >}}

{{< include "create-api-key-include" >}}

You will see a response with your new key:
```
{
  "action": "create",
  "key": "c2cb92a78f944e9a46de793fe28e847e",
  "status": "ok"
}
```

The value returned in the `key` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call
{{< tab_end >}}
{{< tab_start "Open Source" >}}

To create an API Key, you will need the API ID that we wish to grant the key access to, then creating the key is an API call to the endpoint.

**Prerequisite**

*   You will need your API secret, this is the `secret` property of the `tyk.conf` file.

Once you have this value, you can use them to access the Gateway API, the below `curl` command will generate a key for one of your APIs, remember to replace `{API-SECRET}`, `{API-ID}` and `{API-NAME}` with the real values as well as the `curl` domain name and port to be the correct values for your environment.

```{.copyWrapper}
curl -X POST -H "x-tyk-authorization: {API-SECRET}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "allowance": 1000,
    "rate": 1000,
    "per": 1,
    "expires": -1,
    "quota_max": -1,
    "org_id": "1",
    "quota_renews": 1449051461,
    "quota_remaining": -1,
    "quota_renewal_rate": 60,
    "access_rights": {
      "{API-ID}": {
        "api_id": "{API-ID}",
        "api_name": "{API-NAME}",
        "versions": ["Default"]
      }
    },
    "meta_data": {}
  }' http://localhost:8080/tyk/keys/create | python -mjson.tool
```

You will see a response with your new key:

```
{
  "action": "create",
  "key": "c2cb92a78f944e9a46de793fe28e847e",
  "status": "ok"
}
```

The value returned in the `key` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.
{{< tab_end >}}
{{< tabs_end >}}
