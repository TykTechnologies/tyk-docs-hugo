---
title: "Versioning an OAS API"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Versioning an OAS API"]
description: "Exporting an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 7
---

Tyk allows you to create versions of your APIs. When using Tyk OAS APIs versioning works slightly differently from with Tyk Classic APIs, to find out more please take a look at the dedicated [page]({{< ref "/getting-started/key-concepts/oas-versioning" >}}).

If you're ready to dive in, then this tutorial shows you how easy it is to create and manage versions of your Tyk OAS APIs using the open source Tyk Gateway API, Tyk Dashboard API and the Tyk Dashboard GUI.

### Tutorial 1: Create a versioned API using the Tyk Gateway API or Tyk Dashboard API

This tutorial takes you through the OAS API versioning process using the Tyk Gateway API.

You can perform the same steps using the Tyk Dashboard API.

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Differences between using the Tyk Dashboard API and Tyk Gateway API

This tutorial has been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

As explained in the section on [Creating an OAS API]({{< ref "/getting-started/using-oas-definitions/create-an-oas-api" >}}) remember that when using the Tyk Dashboard API you only need to issue one command to create the API and load it onto the Gateway; when using the Tyk Gateway API you must remember to restart or hot reload the Gateway after creating the API.

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "/tyk-dashboard/rbac.md" >}}) is enabled.
{{< /note >}}

#### Step 1: Create your base API

You need to create a new API that will be the [Base API]({{< ref "/getting-started/key-concepts/oas-versioning" >}}) for the future versions. You do this by sending a Tyk OAS API Definition to the Tyk Gateway API's `apis/oas` endpoint. Note that there is no special command required to create this new API as a Base API - i.e. any Tyk OAS API can be used as a Base API.

| Property     | Description            |
|--------------|------------------------|
| Resource URL | `/tyk/apis/oas`        |
| Method       | `POST`                 |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Parameters   | None                   |

We will use [this](https://bit.ly/39tnXgO) minimal API definition.

```curl
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw 
'{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/base-api/",
        "strip": true
      }
    }
  }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 2: Test your new API

Try out your newly created API to confirm that it hits the upstream Petstore service as intended.

You could issue this command to request the details of the pet with id 123:

```curl
curl --location --request GET 'http://{GATEWAY_URL}/base-api/pet/123'
```

You should see the following response:

```.json
{
    "code": 1,
    "type": "error",
    "message": "Pet not found"
}
```
The above response shows that, whilst the request successfully reached the upstream URL, there is no pet in the store with id 123. This is the expected result.

#### Step 3: Create a new version of your API

Now you will create a second API, this time using the [Httpbin](https://httpbin.org/) service as the upstream URL. We are going to register this as a new version of your Base API.

The following call runs atomically: it creates a new API as a version of the Base API, updating the Base API accordingly.


| Property     | Description                                                                    |
|--------------|--------------------------------------------------------------------------------|
| Resource URL | `/tyk/apis/oas`                                                                |
| Method       | `POST`                                                                         |
| Type         | None                                                                           |
| Body         | Tyk OAS API Definition                                                         |
| Parameters   | Query (options): <br>- `base_api_id`: The API ID of the Base API to which the new version will be linked.<br>- `base_api_version_name`: The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override the base API version name.<br>- `new_version_name`: The version name of the created version.<br>- `set_default`: If true, the new version is set as default version.|

```curl
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas?
base_api_id={BASE-API-ID}&base_api_version_name=v1&new_version_name=v2&set_default=false' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "info": {
    "title": "Httpbin",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Httpbin",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "http://httpbin.org"
    },
    "server": {
      "listenPath": {
        "value": "/second-api/",
        "strip": true
      }
    }
  }
}'
```
If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 4: Confirm that your new API is a Version API

In Step 3 we created a new API and automatically linked it to the Base API. You can verify that this new API is a Version API and not a Base API by inspecting the headers returned when you request the details of your API from Tyk.

Make a `GET` request to the `/apis/oas/` endpoint passing your new API's API-ID as a path parameter:

```curl
curl -v --location --request GET 'http://{your-tyk-host}:{port}/apis/oas/{API-ID}' --header 'x-tyk-authorization: {your-secret}'
```

You will see that the response includes a new header: `x-tyk-base-api-id`. This will be populated with the unique API-ID for the Base API:

```
Content-Type: application/json
x-tyk-base-api-id: {BASE-API-ID}
```

#### Step 5: Test your new API

Try out the newly created API by calling it directly and check that it hits the Httpbin service as intended:

```curl
curl --location --request GET 'http://{GATEWAY_URL}/second-api/get'
```
You should get the following response:

```.json
{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "httpbin.org",
        "Postman-Token": "ecaa7dff-fe6a-4511-852d-d24b7b4f16e4",
        "User-Agent": "PostmanRuntime/7.29.0",
        "X-Amzn-Trace-Id": "Root=1-62b03888-6f3cf17131ac9e0b12779c3d"
    },
    "origin": "::1, 82.77.245.53",
    "url": "http://httpbin.org/get"
}
```

This demonstrates that the request successfully reached the Httpbin upstream.

#### Step 6: Test your Version API

We confirmed in Step 4 that the new version is registered as a version of the original Base API. You can invoke a Version API by making a request to the Base API URL (`listen_path`) configuring the `x-tyk-version` header to select which version to address.

So, if you issue this request:

```curl
curl --location --request GET 'http://{GATEWAY_URL}/base-api/get' --header 'x-tyk-version: v2'
```

You should receive this response:

```.json
{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "httpbin.org",
        "Postman-Token": "74eb591c-ea47-4ca2-9552-66b04460a5d3",
        "User-Agent": "PostmanRuntime/7.29.0",
        "X-Amzn-Trace-Id": "Root=1-62b03f06-670ed0ea44a1a48452d0238e",
        "X-Tyk-Version": "v2"
    },
    "origin": "::1, 82.77.245.53",
    "url": "http://httpbin.org/get"
}
```
You can see that you got the same response as in step 5: this response has come from the Httpbin service rather than the Petstore service.

#### What did you just do?

In this tutorial you created two separate APIs that were designed to describe two different versions of an API. You delegated the responsibility of routing the requests to one of them (the Base API), and configured the second one to act as a secondary version (Version API).

</details>

### Tutorial 2: Create a versioned API with the Tyk Dashboard GUI

This tutorial takes you through the OAS API versioning process using your Tyk Dashboard.

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Step 1: Create your Base API

1. Select “APIs” from the “System Management” section


{{< img src="/img/oas/api-menu.png" alt="Add new API" >}}


2. Add a new API:

 - If you have a fresh Tyk installation with no other APIs added, click **Design new API**:

{{< img src="/img/oas/first-api.png" alt="First API screen" >}}

 - If you already have APIs in your Tyk installation, click **Add new API**:

{{< img src="/img/oas/add-new-api.png" alt="Add new API" >}}

3. Configure the API:

{{< img src="/img/oas/api-overview.png" alt="API Base Configuration" >}}

 - In the **Overview** section, provide a name for your API (**API Name**) and select the OAS HTTP type (**API Type**)
 - In the **Details** section, provide the URL for the upstream service your API should target (**Target URL**); for this tutorial you should use http://petstore.swagger.io/v2/
 - Click **Configure API** when you have finished

We will use this as your Base API but note that up to now you've not had to do anything different compared to creating any other Tyk OAS API via the Tyk Dashboard GUI.

#### Step 2: Create a new Version API

1. Within the Tyk Dashboard, go to the `APIs` menu and select your new API. You will create the new Version API from the **Actions** drop-down menu: select **Create a new version**.

{{< img src="/img/oas/create_new_version_action.png" alt="Create a new OAS API Version" >}}

2. The **Create new API version** dialog box will be displayed:

{{< img src="/img/oas/create_new_version_modal.png" alt="OAS Versioning settings dialog" >}}

3. Give your newly created Base API an **Exsisting Version Name** (v1 in the above example)
4. Enter a **New Version Name** for the new version you are creating (v2 in the above example)
5. Decide which of your two versions you want to set as your **Default Version**
6. Click **Create Version**

{{< note success >}}
**Note**  

After setting up a versioned API, when creating subsequent versions, the dialog box only asks you to add a new version name.
{{< /note >}}

#### Step 2.5: Additional step for Tyk Cloud and other Multi Gateway setups

For Tyk Cloud users, and other installations with multiple Gateways configured, the **Connect your Gateways** dialog box will be presented after you have completed Step 2.

{{< img src="/img/oas/connect-gateways-dialog.png" alt="Connect your Edge Gateways dialog" >}}

This step is where you can select to which Gateway(s) in your installation you want to deploy the versioned API. You can select one or more of your Gateways, or choose to deploy it later.

{{< img src="/img/oas/connect-gateways-drop-down.png" alt="Select your Edge Gateways" >}}

Click **Confirm** to continue.


#### Step 3: Save your APIs

Don't forget to click **Save** to confirm all the changes you've made to your Base API.

You now have a versioned API and have set one of the versions to be the default that is used if no version is indicated in a future API request.

{{< img src="/img/oas/created_new_version.png" alt="Versioned OAS API, set as Default" >}}

You can inspect the other versions of your API from the drop-down next to the API name:

{{< img src="/img/oas/version__dropdown.png" alt="Version drop-down" >}}

#### Step 4: Manage your Versions

After creating a version for your API, you are able to manage the versions.

1. From any of the versions of your API from the **Actions** drop-down menu

{{< img src="/img/oas/manage_versions_dropdown.png" alt="Manage versions Action menu" >}}

2. You will be taken to a **Manage Versions** page.

{{< img src="/img/oas/manage_versions_page.png" alt="Manage Versions page" >}}

From this screen you can:

 - Visualise all the versions

 - Create new versions

 - Perform search by version name

 - Set a specific version to be the default

 - Access a quick link to visit the API details page of a specific version

</details>