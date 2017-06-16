---
date: 2017-03-23T10:53:11Z
title: Create an API
menu:
  main:
    parent: "Pro Edition"
    identifier: pro-edition-creat-api
weight: 1
---


## <a name="with-dashboard"></a>Create an API with the Dashboard

To create an API with the GUI is very straightforward, in this section we will create a very simple API that has no special elements set up.

### Step 1: Select "APIs" from the "System Management" section

![API menu item location][1]

#### Step 2: Click "Add new API"

![Add API button location][2]

### Step 3: Set up the Base Configuration for your API

![API settings form][3]

In this section:

*   **API Name**: The name you want to give this group of endpoints, this will represent the API.
*   **API Listen Path**: The URL segment that will map to this API, e.g., if set to `widgets` then the full API URL will be `https://your-gateway-domain/widgets`. (**What about the API Slug?** This is not used in a Tyk Pro On-Premises installation. You can set the listen path directly.)
*   **Target URL**: The upstream origin that hosts the service you want to proxy to.
*   **Enable Round Robin Load Balancing**: This allows you to enter more than one target URL, we will ignore this for now.

### Step 4: Set up the security option for your API

From the **Target Details** section:

![Security options form][4]

You have the following options:

*   `Authentication mode` This is the security method to use with your API, there can be only one per API. In this case, set it to Auth Token, this is the simplest security mechanism to use.
*   `Auth Key Header Name` The header name that will hold the token on inbound requests. The default for this is `Authorization`.
*   `Allow Query Parameter As Well As Header` Set this option to enable checking the query parameter as well as the header for an auth token, for this guide, leave this `unchecked`.
*   `Use Cookie Value` It is possible to use a cookie value as well as the other two token locations. Set this as `unchecked`.

### Step 5: Save the API

Click **Save**

![Save button location][5]

Once saved, you will be taken back to the API list, where the new API will be displayed.

To see the URL given to your API, select the API from the list to open it again. The API URL will be displayed in the top of the editor:

![API URL location][6]

## <a name="with-api"></a>Create an API with the Dashboard REST API

With Tyk Pro (On-Premises), it is possible to create APIs using Tyk's Dashboard REST API. You will need an API key for your organisation and one command to create the API and make it live.

### Step 1: Get an API Key

Select "Users" from the "System Management" section. Click **Edit** for your user, then scroll to the bottom of the page. Your API Key is the first entry:

![Access credentials location][7]

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
     }' https://localhost:3000/api/apis/ | python -mjson.tool
```

If the command succeeds, you will see:
```
    {
        "action": "added",
        "key": "xxxxxxxxx",
        "status": "ok"
    }
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint, API definitions are discussed in detail in the API section of this documentation. These objects encapsulate all of the settings for an API within Tyk Cloud.

[1]: /docs/img/dashboard/system-management/nav_apis.png
[2]: /docs/img/dashboard/system-management/addAPIbutton.png
[3]: /docs/img/dashboard/system-management/apiBaseSettings.png
[4]: /docs/img/dashboard/system-management/targetDetails.png
[5]: /docs/img/dashboard/system-management/saveAPI.png
[6]: /docs/img/dashboard/system-management/APIURLLocation.png
[7]: /docs/img/dashboard/system-management/APIKey.png