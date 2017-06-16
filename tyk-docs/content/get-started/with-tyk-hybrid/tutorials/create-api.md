---
date: 2017-03-22T14:39:43Z
Title: Create an API with Hybrid
menu:
  main:
    parent: /with-tyk-hybrid
weight: 2
---

## <a name="with-dashboard"></a>Tutorial: Create an API with the Dashboard

We will use the Tyk Dashboard to create a very simple API that has no special elements set up.

### Step 1: Select "APIs" from the "System Management" section

![API listing page link location][1]

### Step 2: Click "Add new API"

![Add API button location][2]

### Step 3: Set up the Base Configuration for your API

![API Designer][3]

In this section:

*   **API Name**: The name you want to give this group of endpoints, this will represent the API.
*   **API Slug**: The URL segment that will map to this API, e.g. if set to `widgets` then the full API URL will be `https://your-organisation.cloud.tyk.io/widgets`.
*   **Target URL**: The upstream origin that hosts the service you want to proxy to.
*   **Enable round-robin load balancing**: This allows you to enter more than one target URL, we will ignore this for now.

#### Step 4: Set up the security option for your API

From the Target Details section:

![Target details form][4]

You have the following options:

*   **Authentication mode**: This is the security method to use with your API, there can be only one per API. In this case, set it to `Auth Token`, this is the simplest security mechanism to use.
*   **Auth Key Header Name**: The header name that will hold the token on inbound requests. The default for this is `Authorization`.
*   **Allow Query Parameter As Well As Header**: Set this option to enable checking the query parameter as well as the header for an auth token, for this guide, leave this `unchecked`.
*   **Use Cookie Value**: It is possible to use a cookie value as well as the other two token locations. Set this as `unchecked`.

### Step 5: Save the API

Click **Save**

![Save button location][5]

Once saved, you will be taken back to the API list, where the new API will be displayed.

To see the URL given to your API, select the API from the list to open it again. The API URL will be displayed in the top of the editor:

![API URL location][6]

## <a name="with-api"></a>Tutorial: Create an API with the API

With Tyk Cloud, it is also possible to create APIs using Tyk's REST API. You will need an API key for your organisation and one command to create the API and make it live.

### Step 1: Get an API key for Tyk Cloud

Select "Users" from the "System Management" section. Click **Edit** for your user, then scroll to the bottom of the page. Your API Key is the first entry:

![API key location][7]

### Step 2: Create an API

To create the API, let's send a definition to the admin endpoint:
```
    curl -H "Authorization: 1238b7e0e2ff4c2957321724409ee2eb" \
     -s \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{
        "api_definition": {
            "name": "Test API",
            "slug": "test-api",
            "auth": {
                "auth_header_name": "Authorization"
            },
            "definition": {
                "location": "header",
                "key": "x-api-version"
            },
            "version_data": {
                "not_versioned": true,
                "versions": {
                    "Default": {
                        "name": "Default",
                        "use_extended_paths": true
                    }
                }
            },
            "proxy": {
                "listen_path": "/test-api/",
                "target_url": "http://httpbin.org/",
                "strip_listen_path": true
            },
            "active": true
        }
     }' https://admin.cloud.tyk.io/api/apis/ | python -mjson.tool
```

If the command succeeds, you will see:
```
    {
        "action": "added",
        "key": "1",
        "status": "ok"
    }
```

**What did we just do?**

We just sent an API Definition to the Tyk `/apis` endpoint. API Definitions are described further [here][8]. These objects encapsulate all of the settings for an API within Tyk Cloud.

## <a name="test-new-api"></a> Test your new API

To access the proxied API via the gateway on Tyk Cloud:
```
    curl -H "Authorization: null" https://your-organization.cloud.tyk.io/test-api/get
    
    Output:
    -------
    {
        "error": "Key not authorised"
    }
```

If you see the above output, then the API is loaded and is being protected by Tyk. You can now generate a token and try the same command in place of `null` to see if the request proxies.

[1]: /docs/img/dashboard/system-management/nav_apis.png
[2]: /docs/img/dashboard/system-management/addAPIbutton.png
[3]: /docs/img/dashboard/system-management/APIDesigner.png
[4]: /docs/img/dashboard/system-management/targetDetails.png
[5]: /docs/img/dashboard/system-management/saveAPI.png
[6]: /docs/img/dashboard/system-management/APIURLLocation.png
[7]: /docs/img/dashboard/system-management/APIKey.png
[8]: /docs/tyk-rest-api/api-definition-object-details/
