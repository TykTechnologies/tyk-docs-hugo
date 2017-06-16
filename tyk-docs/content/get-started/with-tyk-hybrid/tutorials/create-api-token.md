---
date: 2017-03-22T15:03:39Z
Title: Create an API Key with Hybrid
menu:
  main:
    parent: /with-tyk-hybrid
weight: 3
---

Creating an API Key with Tyk Hybrid is the same process as with Tyk Cloud. The only difference is that when you use the API token, you can use it either against your Cloud endpoints or against your Hybrid Gateway, both are valid.

## <a name="with-dashboard"></a>Tutorial: Create an API Key with the Dashboard

The Tyk Dashboard is the simplest way to generate a new token.

### Step 1: Select "Keys" from the "System Management" section

![Keys menu link location][1]

### Step 2: Click Add key

![Add key button location][2]

### Step 3: Set Access Rights

Select the API you created in the **Create an API** tutorial from the Access Rights drop-down list, then click **Add**. This sets an access rule to the API Key for your API. You **must** set an access rule for an API key.

You can leave all other options at their default settings.

![Access rights location][3]

### Step 4: Click Create

![Create button location][4]

The page should scroll to the top and you will see the new key on the right-hand side in a green box.
**NOTE:** You need to copy and save this key for later reference when it is displayed as it is cannot be retrieved later.

![Key success message location][5]

That's it, you've created a key - now we can try and use it.

##  <a name="with-api"></a>Tutorial: Create an API Key with the API

 To create an API key, we will need the API ID that we wish to grant the key access to. Creating the token is then a simple API call to the endpoint.

You will also need your own API Key, to get these values:

1.  Select "Users" from the "System Management" section.
2.  In the users list, click "Edit" for your user.
3.  The API key is the **Tyk Dashboard API Access Credentials**, copy this somewhere you can reference it. ![API key location][6]
4.  Select "APIs" from the "System Management" section.
5.  The API ID is next to your API name, copy this somewhere for reference too. 

![API ID location][7]

Once you have these values, you can use them to access the dashboard API, the below `curl` command will generate a token for one of your APIs:
```
    curl -X POST -H "authorization: 1238b7e0e2ff4c2957321724409ee2eb" \
     -s \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{
        "allowance": 1000,
        "rate": 1000,
        "per": 1,
        "expires": -1,
        "quota_max": -1,
        "quota_renews": 1449051461,
        "quota_remaining": -1,
        "quota_renewal_rate": 60,
        "access_rights": {
            "ad5004d961a147d4649fd3216694ebe2": {
                "api_id": "ad5004d961a147d4649fd3216694ebe2",
                "api_name": "test-api",
                "versions": ["Default"]
            }
        },
        "meta_data": {}
     }' http://admin.cloud.tyk.io/api/keys | python -mjson.tool
```

You will see a response with your new token:
```
    {
        "action": "create",
        "key": "c2cb92a78f944e9a46de793fe28e847e",
        "status": "ok"
    }
```

The value returned in the `key` parameter of the response is the access token you can now use to access the API that was specified in the `access_rights` section of the call.

[1]: /docs/img/dashboard/system-management/NavKeys.png
[2]: /docs/img/dashboard/system-management/addKeyButton.png
[3]: /docs/img/dashboard/system-management/accessRights.png
[4]: /docs/img/dashboard/system-management/createKeyButton.png
[5]: /docs/img/dashboard/system-management/keyAdded.png
[6]: /docs/img/dashboard/system-management/APIKey.png
[7]: /docs/img/dashboard/system-management/APIId.png
