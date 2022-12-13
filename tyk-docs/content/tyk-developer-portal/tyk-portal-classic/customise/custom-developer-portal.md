---
date: 2017-03-24T17:18:28Z
title: Creating a Custom Developer Portal
linktitle: Custom Portal
menu:
  main:
    parent: "Customise"
weight: 5 
url: /tyk-developer-portal/tyk-portal-classic/customise/custom-developer-portal/
aliases:
  - /tyk-developer-portal/customise/custom-developer-po...
  - /tyk-developer-portal/customise/custom-developer-portal/
---
{{< note success >}}
**Note**  

This functionality is available from v2.3.8
{{< /note >}}


## Why Build a Custom Developer Portal?

The Tyk Dashboard includes portal functionality by default, but in some cases it is required to use custom logic or, for example, embed the portal into an existing platform. Thankfully Tyk is flexible enough to provide an easy way of integrating the portal to any platform and language using a few API calls.

The source code is available from the following GitHub repo - [https://github.com/TykTechnologies/tyk-custom-portal](https://github.com/TykTechnologies/tyk-custom-portal) 

A video covering the process of building a custom portal is available to view here:

{{< youtube elrAEp1EZ_s >}}

## Building Blocks

Before starting work on implementing a custom developer portal, let's understand the basic building blocks.

### Obtaining a Dashboard API Key

To run queries against the Tyk Dashboard API you need to obtain credentials from the **Users** screen.

1.  Select **Users** from the **System Management** section.
2.  In the **Users** list, click **Edit** for your user.
3.  The API key is the **Tyk Dashboard API Access Credentials**, copy this somewhere you can refer to it.

### API Key Location
Let's save it to the environment variable to simplify code examples in this guide. All the commands should be run in your terminal.

{{< note success >}}
**Note**  

Don't forget to replace TYK_API_KEY=1efdefd6c93046bc4102f7bf77f17f4e with your own value
{{< /note >}}


### Creating a Developer

#### Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers \
  -X POST \
  -H "authorization: $TYK_API_KEY" \
  -d \
'{
  "email": "apidev@example.com",
  "password": "supersecret",
  "fields": {
      "Name": "John Snow"
  }
}'
```

#### Response

```
{"Status":"OK","Message":"598d4a33ac42130001c1257c","Meta":null}
```

Where `Message` contains the developer internal ID., You do not have to remember it, since you can find a developer by his email, using the API.

### Developer by Email

#### Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/email/apidev%40example.com \
  -X GET \
  -H "authorization: $TYK_API_KEY"
```

#### Response

```
{"id":"598d4a33ac42130001c1257c","email":"apidev@example.com","date_created":"2017-08-11T06:09:55.654Z","inactive":false,"org_id":"59368a6b5eeba30001786baf","api_keys":{},"subscriptions":{},"fields":{"Name":"John Snow","source":"google search"},"nonce":"","sso_key":""}
```

### Developer Validation

By default, the Tyk Developer portal automatically accepts all developer registrations, if they are not completely disabled in the portal configuration.

{{< note success >}}
**Note**  

Do not confuse developer registration with key access, if they are registered to the portal, it does not mean they automatically have access to your APIs.
{{< /note >}}

If you want to allow developer registration but add an additional layer of verification, you can use the developer `inactive` attribute to handle it. By default, it is `false`, and you can set it to `true` if additional verification is needed. To make this work, you need to add additional logic to your custom portal code.

### Updating a Developer. Example: Adding Custom Fields

Let's say we want to add new custom "field" to the developer, to store some internal meta information. Tyk so far does not support PATCH semantics, e.g. you cannot update only single field, you need to provide the full modified record.

Lets created an updated developer record, based on the example response provided in Developer by Email section. Let's add new "traffic_source" custom field.

#### Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/developers/598d4a33ac42130001c1257c \
  -X PUT \
  -H "authorization: $TYK_API_KEY" \
  -d \
  '{
    "id":"598d4a33ac42130001c1257c",
    "email":"apidev@example.com",
    "date_created":"2017-08-11T06:09:55.654Z",
    "inactive":false,
    "org_id":"59368a6b5eeba30001786baf",
    "api_keys":{},
    "subscriptions":{},
    "fields":{
      "Name":"John Snow",
      "traffic_source":"google search"
    }
  }'
```

#### Response

```
{"Status":"OK","Message":"Data updated","Meta":null}
```

Note that all non-empty custom fields are shown in the Tyk Dashboard Developer view. All the keys created for this developer inherit his custom fields, if they are specified in the Portal settings **Signup fields** list.


### Login Workflow: Checking User Credentials

If you need to implement own login workflow, you need be able to validate user password.

#### Request

```{.copyWrapper}
    curl https://admin.cloud.tyk.io/api/portal/developers/verify_credentials \
    -X POST \
    -H "authorization: $TYK_API_KEY" \
    -d \
    '{
        "username": "<developer-email>",
        "password": "<developer-password>"
    }'
```

If the user credentials are verified, the HTTP response code will be 200, otherwise credentials do match and a 401 error will be returned.

### Listing Available APIs

Inside the admin dashboard in the portal menu, you can define **catalogues** with the list of APIs available to developers. Each defined API is identified by its policy id field.

#### Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/catalogue \
-X GET \
-H "authorization: $TYK_API_KEY"
```

#### Response

```
{
 "id":"5940e3d29ba5330001647b21",
 "org_id":"59368a6b5eeba30001786baf",
 "apis":[
  {
   "name":"asdasd",
   "short_description":"",
   "long_description":"",
   "show":true,
   "api_id":"",
   "policy_id":"59527b8c375f1e000146556b",
   "documentation":"",
   "version":"v2"
  },
  {
   "name":"asdaszczxczx",
   "short_description":"",
   "long_description":"",
   "show":true,
   "api_id":"",
   "policy_id":"5944267f8b8e5500013082a5",
   "documentation":"",
   "version":"v2"
  }
 ]
}
```

### Issuing Keys

To generate a key for the developer, first he should send a request to the administrator of the API, and if needed provide details of the key usage. By default, all keys requests are approved automatically, and the user immediately receives his API key, but you can turn on the  **Review all key requests before approving them** option in the portal settings, to add additional verification step, and approve all keys manually. Once a key is issued, the user receives an email with the key details.

#### Request

```{.copyWrapper}
curl https://admin.cloud.tyk.io/api/portal/requests \
-X POST \
-H "authorization: $TYK_API_KEY" \
-d \
'{
  "by_user":"<developer-id>",
  "for_plan": "<api-policy-id>"
  "version": "v2",
  "fields":{
      "custom_field":"value",
  }
}'
```

#### Response

```
    {"Status":"OK","Message":"Data updated","Meta":null}
```

### Checking User Subscriptions and Keys

The Developer object contains the `subscriptions` field with information about user API keys, and associtated API's (policies). For Example:

#### Request

```{.copyWrapper}
"subscriptions":{"<policy-id-1>": "<api-key-1>", "<policy-id-2>": "<api-key-2>"},
```

{{% include "portal-developer-analytics" %}}


## <a name="building-portal"></a> Building a Portal

This guide includes the implementation of a full featured developer portal written in Ruby in just 250 lines of code. This portal implementation does not utilise any database and uses our Tyk Dashboard API to store and fetch all the data.

To run it, you need to have Ruby 2.3+ (latest version). Older versions may work but have not been tested.

First, you need to install dependencies by running `gem install sinatra excon --no-ri` in your terminal.

Then run it like this: `TYK_PORTAL_PORT=8080 TYK_API_KEY=<your-api-key-here> ruby portal.rb`

You can also specify the `TYK_DASHBOARD_URL` if you are trying this portal with an On-Premises installation. By default, it is configured to work with Cloud or Multi-Cloud.
