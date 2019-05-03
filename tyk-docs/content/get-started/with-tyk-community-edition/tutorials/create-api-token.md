---
date: 2017-03-13T15:08:55Z
Title: Create an API Key - Community Edition
menu:
  main:
    parent: "/with-tyk-community-edition"
    identifier: community-edition-create-api-token
url: "/with-tyk-community-edition/tutorials/create-api-token"    
weight: 2
---

To create an API Key, we will need the API ID that we wish to grant the key access to, then creating the key is a very simple API call to the endpoint.

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