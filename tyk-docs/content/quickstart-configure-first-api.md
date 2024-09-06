---
aliases:
- /quickstart-configure-first-api
date: 2020-06-24
description: How to decide on which Tyk deployment option is best for you
linkTitle: Getting Started
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Tyk QuickStart Configure Your First API
---


This guide will walk you through setting up your first API, applying security measures, and utilizing Tyk’s key features such as monitoring and automation. By the end, your API will be live, secured, and ready for traffic.



## Prerequisites

Before you begin, make sure you have:
- A Tyk Cloud account.
- Admin access to the Tyk Cloud dashboard.
- A backend service that your API will proxy (e.g., a RESTful API).


## Create a Project (Set Up Your API)

Start by creating a new API in Tyk Cloud:

1. **Log in to the Tyk Cloud Dashboard**.
2. **Navigate to APIs** and click **Create New API**.
3. **Configure API Details**:
   - **API Name**: Name your API (e.g., `My First API`).
   - **Target URL**: Provide the URL of your backend service (e.g., `https://my-backend-service.com`).
   - **API Slug**: Define the path through which your API will be accessible (e.g., `/my-first-api/`).
4. **Authentication**: Choose the desired authentication method (e.g., **API Key**).

#### Example API Creation Payload

```json
{
  "name": "My First API",
  "slug": "my-first-api",
  "protocol": "https",
  "target_url": "https://my-backend-service.com",
  "listen_path": "/my-first-api/",
  "strip_listen_path": true
}
```

Save your API configuration once complete.


## Create an API Key

### Create an API Key Using the Tyk Dashboard

The Tyk Dashboard provides the simplest way to generate a new API key. Follow these steps:

1. **Select "Keys"** from the **System Management** section.
   
   {{< img src="/img/2.10/keys_menu.png" alt="Keys Menu" >}}

2. **Click "CREATE"** to generate a new key.

   {{< img src="/img/2.10/add_key.png" alt="Add Key" >}}

3. **Add a Policy or API to Your Key**:
   - You can either add your key to an existing **Policy** or assign it to an individual **API**.
   - For this guide, we will assign the key to an API. You can:
     - Scroll through your **API Name list**,
     - Use the **Search field**,
     - Or **Group by Authentication Type** or **Category** to filter APIs.
   - Leave all other options at their default settings.

4. **Add Configuration Details**:
   - **Enable Detailed Logging**: This is optional and disabled by default.
   - **Key Alias**: Assign an alias to your key for easier identification.
   - **Key Expiry**: Set an expiry time from the drop-down list. This is required.
   - **Tags**: Add tags for filtering data in Analytics. Tags are case-sensitive.
   - **Metadata**: Add metadata such as user IDs, which can be used by middleware components.

5. **Click "CREATE"**:
   - Once the key is created, a **Key successfully generated** pop-up will be displayed showing your key. **Copy the key** to your clipboard and save it for future reference as it will not be shown again.

   {{< img src="/img/2.10/create_key.png" alt="Create Key" >}}
   

   {{< img src="/img/2.10/key_success.png" alt="Key Success" >}}
   



### Create an API Key Using the Tyk API

You can also create an API key programmatically using the Tyk Dashboard API.

To create an API key, you will need:
- The **API ID** for the API the key will access.
- Your **API Key** for the Tyk Dashboard API.

#### Get Your API Key and API ID

1. **API Key**: Select **Users** from the System Management section, then click **Edit** for your user. Your **API Key** is displayed under **Tyk Dashboard API Access Credentials**.
   
   {{< img src="/img/2.10/user_api_id.png" alt="API Key Location" >}}

2. **API ID**: Select **APIs** from the System Management section, then click **Copy API ID** from the Actions menu for the API you want the key to access.
   
   {{< img src="/img/2.10/api_id.png" alt="API ID Location" >}}

Once you have these values, you can create the API key using the following `curl` command:

```bash
curl -X POST -H "authorization: {API-TOKEN}" \
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
      "{API-ID}": {
        "api_id": "{API-ID}",
        "api_name": "test-api",
        "versions": ["Default"]
      }
    },
    "meta_data": {}
  }' https://admin.cloud.tyk.io/api/keys | python -mjson.tool
```

#### Replace the following values

- **`{API-TOKEN}`**: Your Tyk Dashboard API Access Credentials.
- **`{API-ID}`**: The API ID of the API you want this key to access.

#### Key Elements Explained

- **`allowance`**: Number of allowed requests per quota period.
- **`rate` and `per`**: Define the rate limit (requests per second).
- **`expires`**: Expiry time for the key (`-1` means the key does not expire).
- **`quota_max`**: Maximum allowed requests in the quota period.
- **`quota_renewal_rate`**: How often the quota resets, in seconds.
- **`access_rights`**: Defines which APIs this key can access.

#### Example Response

```json
{
  "api_model": {},
  "key_id": "59bf9159adbab8abcdefghijac9299a1271641b94fbaf9913e0e048c",
  "data": {...}
}
```

The value returned in the `key_id` parameter is your new API key, which you can now use to access the specified API.


## Create a Security Policy

A security policy encapsulates several options that can be applied to an API key, acting as a template that defines rate limits, quotas, and access rights for keys. Here’s how to create one:

### Create a Security Policy Using the Tyk Dashboard

1. **Select "Policies"** from the **System Management** section of the Tyk Dashboard.
   
   {{< img src="/img/2.10/policies_menu.png" alt="Policies Menu" >}}

2. **Click "Add Policy"** to create a new policy.

   {{< img src="/img/2.10/add_policy.png" alt="Add Policy Button" >}}

3. **Select the API** to which the policy should apply:
   - Scroll through your API list or use the **Search field**.
   - You can also group by **Authentication Type** or **Category**.


   {{< img src="/img/2.10/select_api_policy.png" alt="Select API Key" >}}



4. **Set Global Rate Limits and Quota**:
   - **Rate Limiting**: Define the number of requests per second allowed for a key using this policy.
   - **Usage Quotas**: Set the maximum number of requests allowed over a specific period (e.g., a day, week, or month).
   - **Throttling**: Configure throttling to queue and retry requests if limits are exceeded.

   {{< img src="/img/2.10/global_limits_policies.png" alt="Global Limits Policies" >}}

5. **Path-Based Permissions**: Restrict access to specific paths or methods within an API. You can define which HTTP methods and paths a key is allowed to access.

   {{< img src="/img/2.10/path_and_method.png" alt="Path And Method" >}}


6. **Add Configuration Details**:
   - **Policy Name**: Give the policy a descriptive name.
   - **Policy State**: Choose whether the policy is active, in draft, or denies access.
   - **Key Expiry**: Set the expiration period for keys assigned to this policy.
   - **Tags**: Add tags to categorize and filter policies in Analytics.
   - **Metadata**: Add metadata such as user IDs to the policy for use by middleware components.

7. **Save the Policy** by clicking **CREATE**. Your policy is now ready to be applied to keys, OAuth clients, or JWT tokens.


### Create a Security Policy Using the Tyk API

You can also create security policies directly using the Tyk Dashboard API. Below is a simple example using `curl`:

```bash
curl -X POST -H "authorization: {API-TOKEN}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "access_rights": {
      "{API-ID}": {
        "allowed_urls": [],
        "api_id": "{API-ID}",
        "api_name": "{API-NAME}",
        "versions": [
          "Default"
        ]
      }
    },
    "active": true,
    "name": "POLICY NAME",
    "rate": 100,
    "per": 1,
    "quota_max": 10000,
    "quota_renewal_rate": 3600,
    "state": "active",
    "tags": ["Startup Users"]
  }' https://admin.cloud.tyk.io/api/portal/policies | python -mjson.tool
```

#### Explanation of Key Elements

- **`access_rights`**: List of APIs the policy grants access to, with `API-ID` and `API-NAME`.
- **`rate` and `per`**: Define the number of requests per second allowed by the policy.
- **`quota_max`**: The total number of allowed requests over a quota period.
- **`quota_renewal_rate`**: The frequency at which the quota resets, defined in seconds (e.g., 3600 seconds = 1 hour).
- **`state`**: Can be `active`, `draft`, or `deny` depending on the policy status.

#### Example API Response

```json
{
  "Message": "577a8589428a6b0001000017",
  "Meta": null,
  "Status": "OK"
}
```

Once the policy is created, you can use the returned `Policy ID` to apply it to API keys or tokens.


## Import APIs

Tyk supports importing both **API Blueprint** and **Swagger (OpenAPI)** JSON definitions via the Gateway or Dashboard. You can use these methods to create new API definitions or add versions to existing APIs. Below are the details and commands for each method.


### Import APIs via the Gateway

#### Using API Blueprint

**Note:** Support for API Blueprint is being deprecated. While Tyk has been packaging **aglio** in Docker images to render API Blueprints, this module is no longer maintained. If you wish to continue using API Blueprint, you will need to install it manually in your Dockerfile.

#### API Blueprint Deprecation Workaround

- **Create API Blueprint** in JSON format using the **Apiary Drafter** tool.
- **Convert API Blueprint** to OpenAPI (Swagger) using the **Apiary API Elements** CLI tool.

**Importing API Blueprints in JSON format** can still be done via the command line. Tyk supports importing Blueprints as standalone API definitions or as new versions into existing APIs. You can also use Blueprints to generate mocks or allow lists for upstream URL pass-through.

- **To Import an API Blueprint as a new API**:

```bash
./tyk --import-blueprint=blueprint.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```

- **To Import a Blueprint as a new version in an existing API**:

```bash
./tyk --import-blueprint=blueprint.json --for-api=<path> --as-version="version_number"
```

- **To Create API Versions as a Mock**:

You can import API Blueprint definitions as mocks using example responses embedded in the Blueprint. To enable this, add the `--as-mock` parameter:

```bash
./tyk --import-blueprint=blueprint.json --create-api --as-mock --org-id=<id>
```

#### Using Swagger (OpenAPI)

Swagger documents can be imported to create API definitions or add versions to existing APIs.

- **To Import a Swagger document as a new API**:

```bash
./tyk --import-swagger=petstore.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```

**Note:** When importing an OpenAPI 3.0 spec, you must manually add the listen path after the API is created.

- **To Import a Swagger document as a version in an existing API**:

```bash
./tyk --import-swagger=petstore.json --for-api=<path> --as-version="version_number"
```

#### Mocks

Tyk supports API mocking using the `use_extended_paths` setup and by adding mocked URL data to the list types (`white_list`, `black_list`, or `ignored`). To handle a mocked path, add an entry that has `action` set to **reply**:

```json
"ignored": [
  {
    "path": "/v1/ignored/with_id/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Hello World",
        "headers": {
          "x-tyk-override": "tyk-override"
        }
      }
    }
  }
]
```


### Import APIs via the Dashboard API

#### Import API - Swagger

You can import Swagger (OpenAPI) definitions using the Dashboard API.

- **Resource URL**: `/api/import/swagger/`
- **Method**: `POST`

**Sample Request**:

```bash
POST /api/import/swagger/
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "swagger": "{swagger data...}",
  "insert_into_api": false,
  "api_id": "internal API id",
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

**Parameters**:
- **insert_into_api**: If `true`, the import will replace an existing API. If `false`, it will import into a new API.
- **api_id**: The internal MongoDB object ID for your API.
- **version_name**: The versioning convention name for the imported API.
- **upstream_url**: The URL that serves the API.

**Sample Response**:

```json
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}
```

#### Import API - Blueprint

- **Resource URL**: `/api/import/blueprint/`
- **Method**: `POST`

**Sample Request**:

```bash
POST /api/import/blueprint/
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "blueprint": "{blueprint data...}",
  "insert_into_api": false,
  "api_id": "internal API id",
  "as_mock": false,
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

**Parameters**:
- **insert_into_api**: If `true`, the import will replace an existing API. If `false`, it will import into a new API.
- **api_id**: The internal MongoDB object ID for your API.
- **as_mock**: If `true`, enables mocking support for the imported Blueprint API.
- **version_name**: The versioning convention name for the imported API.
- **upstream_url**: The URL that serves the API.

**Sample Response**:

```json
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}
```

### Import APIs via the Dashboard UI

Tyk allows you to import APIs directly from the Dashboard UI. The following options are supported:

- From an existing **Tyk API Definition**.
- From an **Apiary Blueprint (JSON)** file.
- From a **Swagger/OpenAPI (JSON)** file.
- From a **SOAP WSDL** definition file.

#### Step-by-Step Guide

1. **Select "APIs"** from the **System Management** section.
   
   {{< img src="/img/2.10/apis_menu.png" alt="API Listing" >}}

2. **Click "IMPORT API"**:
   - You can import from a **Tyk API Definition**, **Swagger (JSON)**, **API Blueprint**, or **WSDL** file.

   {{< img src="/img/2.10/import_api_button.png" alt="Add API Button" >}}

3. **Enter API Information**:
   - Provide your **Upstream Target** URL.
   - Enter a **Version Name** (optional).
   - For WSDL, provide the **Service Name** and **Port** (optional).

4. **Copy Code into the Editor**:
   - Paste the API definition code into the editor.

5. **Click "Generate API"**:
   - Once the API is generated, it will appear in your list of APIs. You can now view the endpoints and manage the API via the Endpoint Designer.

#### Importing a New API Version via Tyk Dashboard

To create a new version for an existing API:

1. Open the **API Designer** for the API and select **Import Version** from the drop-down options.

   {{< img src="/img/2.10/import_api_json.png" alt="Import API Version" >}}

2. Select either **OpenAPI** (v2.0 or 3.0) or **WSDL/XML** as the source format.
3. Enter a new **API Version Name**. The upstream URL is optional.
4. Click **Import API**.

You can now manage the new API version via the **Versions** tab, and all the endpoints will be available under the **Endpoint Designer**.


## Monitor Traffic and Analyze API Performance

With your API live, monitor its traffic and analyze performance:

### View Traffic Analytics

1. **Navigate to the Analytics Section** in the dashboard.
2. **View Traffic Metrics**: Review metrics such as request count, response times, and error rates.
3. **Analyze Data**: Use traffic trends to identify performance issues or optimize API behavior.

#### Example Traffic Analytics Response

```json
{
  "requests": 1500,
  "errors": 5,
  "latency": {
    "average": 120,
    "p95": 180
  }
}
```

### View Log Data

1. **Go to the Logs Section** of your API.
2. **Search and Filter Logs**: Use filters to drill down by response status, endpoint, or client IP.
3. **Review Detailed Logs**: View full request and response data to troubleshoot issues.

#### Example Log Entry

```json
{
  "timestamp": "2024-09-05T12:00:00Z",
  "method": "GET",
  "path": "/my-api/users",
  "status": 200,
  "response_time": 95
}
```


## Explore the Tyk Developer Portal (Enterprise Only)

The Tyk Developer Portal allows you to expose your APIs to external developers, enabling them to view, test, and interact with your APIs. You can add APIs to your portal catalog, create plans, and attach documentation to guide developers on how to use the APIs.

### Prerequisites for Creating a Portal Catalog Entry

Before adding an API to your portal catalog, ensure that:

- An API is configured and live on your Tyk Gateway.
- The API must be **Closed** (i.e., it must use either **Auth Token** or **Basic Auth** security mechanisms).
- A security policy is configured to grant access to the API.

**Important**: The developer portal must be configured with a different hostname than your Tyk Dashboard, and it cannot be accessed via an IP address. Without these prerequisites, you may encounter a 404 error when trying to access the portal.

### Add an API and Swagger-Based Documentation to a Portal Catalog

Follow these steps to add an API and its documentation to your Developer Portal Catalog:

1. **Select "Catalog"** from the **Portal Management** section.
   
   {{< img src="/img/2.10/catalogue_menu.png" alt="Catalog Menu" >}}

2. **Click "ADD NEW API"**:
   - This page displays all the catalog entries you have defined, along with their documentation status and whether they are active on the portal.
   
   {{< img src="/img/2.10/add_catalogue_entry.png" alt="Add New API Button" >}}

3. **Show the API**:
   - By default, the entry will be published automatically to your portal catalog. Deselect this option if you don't want the API published immediately.

4. **Set a Public API Name and Associate a Security Policy**:
   - In Tyk, when you publish an API, you are granting access to a **group of APIs** managed by Tyk. You’re not just publishing a single API, but rather the access policy for a bundle of APIs.
   - Select the **Public API Name** and associate it with a **security policy** from the drop-down list.
   
   {{< img src="/img/2.10/public_name_catalogue.png" alt="Public API Name and Security Policy" >}}

   **Note**:
   - Only valid APIs with a security policy will appear in the Public API Name drop-down.
   - The available policies must be **Closed** (as per the prerequisites).

5. **Add a Description**:
   - Add a description for the API using **Markdown** formatting. You can also provide an email address for notifications when an API subscription is submitted or granted.
   
   {{< img src="/img/2.10/catalogue_description.png" alt="Description" >}}

6. **Attach Documentation**:
   - Import documentation in the following formats:
     - **Swagger JSON** file (supports OpenAPI 2.0 and 3.0).
     - **Swagger URL**.
     - **API Blueprint** (deprecated).
   - You can add documentation before or after saving the API.

7. **Save the API**:
   - Click **SAVE** to finalize your API entry.

8. **Take a Look**:
   - Visit your developer portal to see the new API catalog entry. You can access it by selecting **Open Your Portal** from the **Your Developer Portal** menu.

### Examples of how clients have used our portal
* https://developer.hotelbeds.com/
* https://developer.ft.com/portal
* https://developer.geops.io/
* https://opentransportdata.swiss/en/


## Next Steps

Congratulations! You've successfully created, secured, and deployed your first API in Tyk Cloud. Next, explore more advanced features like rate-limiting, OAuth2, or integration with external services.

Explore more features in your dashboard to optimize and scale your API offerings.
