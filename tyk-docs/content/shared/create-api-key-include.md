---
---

## Tutorial: Create an API Key with the Dashboard

The Tyk Dashboard is the simplest way to generate a new Key.

We have a video walkthrough for creating an API Key.

{{< youtube sydrO2qv88Y >}}


### Step 1: Select "Keys" from the "System Management" section

![Keys menu]({{< ref "img/2.10/keys_menu.png" >}})

### Step 2: Click CREATE

![Add key]({{< ref "img/2.10/add_key.png" >}})

### Step 3: Add a Policy or API to your Key

You have the option to add your new key to either an existing Policy or an existing individual API. For this Tutorial we are going to use an API. 


#### Add an API to your Key

To select an API, you can either:

* Scroll through your API Name list
* Use the Search field
* You can also Group by Authentication Type to filter your APIs
* You can also Group by Category 

You can leave all other options at their default settings.

### Step 4: Add Configuration Details

You use the Configuration section to set the following:

1. Enable Detailed Logging. This is disabled by default and isn't required for this tutorial
2. Give your Key an Alias. This makes your key easier 
3. Set an Expiry time after which the key will expire. Select a value from the drop-down list. This is a required setting. See [Key Expiry]({{< ref "basic-config-and-security/security/key-level-security/#key-expiry" >}}) for more details.
4. Add Tags to your policy. Any tags you add can be used when filtering Analytics Data. Tags are case sensitive.
5. Add Metadata to your policy. Adding metadata such as User IDs can be used by middleware components. See [Session Metadata]({{< ref "getting-started/key-concepts/session-meta-data/" >}}) for more details.

### Step 4: Click CREATE

![Create button]({{< ref "img/2.10/create_key.png" >}})

A **Key successfully generated** pop-up will be displayed with the key shown. You **must** save this somewhere for future reference as it will not be displayed again. Click **Copy to clipboard** and paste into a text document.

![Key success message location]({{< ref "img/2.10/key_success.png" >}})

That's it, you've created a key - now you can try and use it.

## Tutorial: Create an API Key with the API

To create an API key, you will need the API ID that we wish to grant the key access to. Creating the token is then an API call to the endpoint.

You will also need your own API Key, to get these values:

1.  Select **Users** from the **System Management** section.
2.  In the users list, click **Edit** for your user.
3.  The API key is the **Tyk Dashboard API Access Credentials**, copy this somewhere you can reference it. ![API key location]({{< ref "img/2.10/user_api_id.png" >}})
4.  Select **APIs** from the **System Management** section.
5.  From the **Actions** menu for your API, select Copy API ID 

![API ID location]({{< ref "img/2.10/api_id.png" >}})

Once you have these values, you can use them to access the Dashboard API, the below `curl` command will generate a key for one of your APIs:

{{< note success >}}
**Note**

  1. Replace the `authorization` header value with your Tyk Dashboard API Access Credentials
  2. Replace the API ID (`ad5004d961a147d4649fd3216694ebe2`) with your API ID
  3. It's recommended to validate the JSON using JSON validator to avoid any `malformed input` error
{{< /note >}}
  


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
  }' https://admin.cloud.tyk.io/api/keys | python -mjson.tool
```
