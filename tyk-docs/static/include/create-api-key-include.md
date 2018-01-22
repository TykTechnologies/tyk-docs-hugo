## <a name="with-dashboard"></a>Tutorial: Create an API Key with the Dashboard

The Tyk Dashboard is the simplest way to generate a new Key.

We have a video walkthrough for creating an API Key.

<iframe width="870" height="480" src="https://www.youtube.com/embed/eAKLVwXyuaM" frameborder="0" gesture="media" allowfullscreen></iframe>

### Step 1: Select "Keys" from the "System Management" section

![Keys menu link location][1]

### Step 2: Click CREATE

![Add key button location][2]

### Step 3: Set Access Rights

Select the API you created in the **Create an API** tutorial from the Access Rights drop-down list, then click **Add**. This sets an access rule to the API Key for your API. You **must** set an access rule for an API key.

You can leave all other options at their default settings.

![Access rights location][3]

### Step 4: Click CREATE

![Create button location][4]

A **Key successfully generated** pop-up will be displayed with the key shown. You **must** save this somewhere for future reference as it will not be displayed again. Click **Copy to clipboard** and paste into a text document.

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
```{.copyWrapper}
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



[1]: /docs/img/dashboard/system-management/api_keys_2.5.png
[2]: /docs/img/dashboard/system-management/keys_create_2.5.png
[3]: /docs/img/dashboard/system-management/access_rights_2.5.png
[4]: /docs/img/dashboard/system-management/keys_create_2.5.png
[5]: /docs/img/dashboard/system-management/key_success_popup_2.5.png
[6]: /docs/img/dashboard/system-management/api_access_cred_2.5.png
[7]: /docs/img/dashboard/system-management/created_api_id_2.5.png