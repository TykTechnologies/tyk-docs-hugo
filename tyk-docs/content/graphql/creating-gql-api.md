---
title: "Create a GraphQL API"
date: 2023-03-31
menu:
  main:
    parent: "GraphQL"
weight: 1
---
GraphQL API can be created in Tyk using:
* Tyk Dashboard UI
* Tyk Dashboard API
* Tyk Gateway API - for OSS users

The process is very similar to [HTTP API creation]({{< ref "/getting-started/create-api" >}}) with a few additional steps to cover GraphQL specific functionalities.

{{< tabs_start >}}
{{< tab_start "Via Tyk Dahsboard UI" >}}

## Prerequisites

In order to complete the next steps, you need to have [Tyk Self Managed installed]({{< ref "tyk-self-managed/install" >}}). You can also create a 5-week trial account in Tyk Cloud.

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Try it free" >}}

### Step 1: Select "APIs" from the "System Management" section

{{< img src="/img/2.10/apis_menu.png" alt="API Menu" >}}

### Step 2: Click "ADD NEW API"

{{< img src="/img/2.10/add_api.png" alt="Add API button location" >}}

### Step 3: Set up the Base Configuration for your API

{{< img src="/img/dashboard/graphql/choose-gql-api.png" alt="Create GQL API" >}}

- From the **Overview** section, add your **API Name** and your API **Type** (In this case it's GraphQL). 
- From the **Details** section, add your **Target URL**. This will set the upstream origin that hosts the service you want to proxy to. As an example, you can use [https://countries.trevorblades.com/](https://countries.trevorblades.com/).
- In case your upstream GQL service is protected, tick the box next to **Upstream Protected** and provide authorization details, so that Tyk can introspect the GraphQL service. You can provide authorization details as a set of headers or a certificate. [Introspection]({{< ref "graphql/introspection" >}}) of your upstream service is important for Tyk to correctly work with your GraphQL.
- If you would like to persist authorization information for future use you can tick the **Persist headers for future use** box. That way, if the upstream GQL schema changes in the future, you will be able to update it easily in Tyk.
- Click **Configure API** when you have finished

### Step 4: Set up the Authentication for your API

From the **Authentication** section:

{{< img src="/img/2.10/authentication.png" alt="Authentication" >}}

You have the following options:

- **Authentication mode**: This is the security method to use with your API. First, you can set it to `Open(Keyless)`, but that option is not advised for production APIs. See [Authentication and Authorization]({{< ref "basic-config-and-security/security/authentication-&-authorization" >}}) for more details on securing your API.
- **Strip Authorization Data**: Select this option to strip any authorization data from your API requests.
- **Auth Key Header Name**: The header name that will hold the token on inbound requests. The default for this is `Authorization`.
- **Allow Query Parameter As Well As Header**: Set this option to enable checking the query parameter as well as the header for an auth token. **This is a setting that might be important if your GQL includes subscription operations**.
- **Use Cookie Value**: It is possible to use a cookie value as well as the other two token locations. 
- **Enable client certificate**: Select this to use Mutual TLS. See [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) for details on implementing mutual TLS.

### Step 5: Save the API

Click **SAVE**

{{< img src="/img/2.10/save.png" alt="Save button" >}}

Once saved, you will be taken back to the API list, where the new API will be displayed.

To see the URL given to your API, select the API from the list to open it again. The API URL will be displayed at the top of the editor:

{{< img src="/img/2.10/api_url.png" alt="API URL location" >}}

Your GQL API is now secured and ready to use.

{{< tab_end >}}
{{< tab_start "Via Tyk Dashboard API" >}}

## Prerequisites

It is possible to create GQL APIs using [Tyk Dashboard APIs]({{< ref "/tyk-apis/tyk-dashboard-api/api-definitions">}}). To make things easier you can use our [Postman collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview).

You will need an API key for your organization and one command to create a GQL API and make it live.
### Obtain your Tyk Dashboard API Access Credentials key & Dashboard URL

From the Tyk Dashboard, select "Users" from the "System Management" section.
Click **Edit** for your user, then scroll to the bottom of the page. Your **Tyk Dashboard API Access Credentials** key is the first entry:

{{< img src="/img/2.10/user_api_id.png" alt="API key location" >}}

Store your Dashboard Key, Dashboard URL & Gateway URL as environment variables so you don't need to keep typing them in:

```bash
export DASH_KEY=db8adec7615d40db6419a2e4688678e0

# Locally installed dashboard
export DASH_URL=http://localhost:3000/api

# Tyk's Cloud Dashboard
export DASH_URL=https://admin.cloud.tyk.io/api

# Locally installed gateway
export GATEWAY_URL=http://localhost:8080

# Your Cloud Gateway
export GATEWAY_URL=https://YOUR_SUBDOMAIN.cloud.tyk.io
```

### Query the `/api/apis` endpoint to see what APIs are loaded

```curl
curl -H "Authorization: ${DASH_KEY}" ${DASH_URL}/apis
{"apis":[],"pages":1}
```

For a fresh install, you will see that no APIs currently exist.

### Create your first GQL API

This example API definition configures the Tyk Gateway to reverse proxy to the [https://countries.trevorblades.com/](https://countries.trevorblades.com/) public GraphQL service.

To view the raw API definition object, you may visit: https://bit.ly/3zmviZ3

```curl
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis \
  -d "$(wget -qO- https://bit.ly/3zmviZ3)"
{"Status":"OK","Message":"API created","Meta":"64270eccb1821e3a5c203d98"}
```

Take note of the API ID returned in the meta above - you will need it later.

```
export API_ID=64270eccb1821e3a5c203d98
```

### Test your new GQL API

```curl
curl --location ${GATEWAY_URL}/trevorblades/
--header 'Content-Type: application/json'
--data '{"query":"query {\n    countries {\n        name\n        capital\n        awsRegion\n    }\n}","variables":{}}'
```

You just sent a request to the gateway on the listen path `/trevorblades`. Using this path-based-routing, the gateway was able to identify the API the client intended to target.

The gateway stripped the listen path and reverse-proxied the request to https://countries.trevorblades.com/

### Protect your API

Let's grab the API definition we created before and store the output in a file locally.

```curl
curl -s -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} | python -mjson.tool > api.trevorblades.json
```

We can now edit the `api.trevorblades.json` file we just created, and modify a couple of fields to enable authentication.

Change `use_keyless` from `true` to `false`.

Change `auth_configs.authToken.auth_header_name` to `apikey`. 

Then send a `PUT` request back to Tyk Dashboard to update its configurations.

```curl
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} -X PUT -d "@api.trevorblades.json"
{"Status":"OK","Message":"Api updated","Meta":null}
```
### Test protected API

Send request without any credentials

```curl
curl -I ${GATEWAY_URL}/trevorblades/ \
--header 'Content-Type: application/json' \
--data '{"query":"query {\n    countries {\n        name\n        capital\n        awsRegion\n    }\n}","variables":{}}'

HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:35:34 GMT
Content-Length: 46
```

Send a request with incorrect credentials

```curl
curl -I ${GATEWAY_URL}/trevorblades/ \
--header 'Content-Type: application/json' \
--data '{"query":"query {\n    countries {\n        name\n        capital\n        awsRegion\n    }\n}","variables":{}}' \
-H 'apikey: somekey'

HTTP/1.1 403 Forbidden
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:36:16 GMT
Content-Length: 57
```

Congratulations - You have just created your first keyless GQL API, and then protected it using Tyk!

{{< tab_end >}}
{{< tab_start "Via Tyk Gateway API" >}}

## Prerequisites

In order to complete the next steps, you need to have the [Tyk OSS]({{< ref "tyk-oss-gateway" >}}) installed.

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Try it out" >}}
## Creation Methods

With Tyk OSS, it is possible to create GQL APIs using Tyk's Gateway API or to generate a file with the same object and store it in the `/apps` folder of the Tyk Gateway installation folder. This is demonstrated [here]({{<ref "api-management/manage-apis/deploy-apis/deploy-apis-overview#file-based-configurations" >}}).


## Tutorial: Create a GQL API with the Tyk Gateway API

{{< note success >}}
**Note**

A generated API ID will be added to the Tyk API definition if it's not provided while creating a GQL API with Tyk Gateway API.
{{< /note >}}

See our video for adding an API to the Open Source Gateway via the Gateway API and Postman:

{{< youtube UWM2ZQoGhQA >}}

You can also use our [Postman collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) to make things easier.

In order to use the Gateway API you will need an API key for your Gateway and one command to create the API and make it live.

### Step 1: Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

### Step 2: Create a GQL API


To create a GQL API, let's send a definition to the `apis` endpoint, which will return the status and version of your Gateway. Change the `x-tyk-authorization` value and `curl` domain name and port to be the correct values for your environment.

This example API definition configures the Tyk Gateway to reverse proxy to the [https://countries.trevorblades.com/](https://countries.trevorblades.com/) public GraphQL service.

To view the raw API definition object, you may visit: https://bit.ly/3nt8KDa

```curl
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'X-Tyk-Authorization: {your-secret}' \
--data "$(wget -qO- https://bit.ly/3nt8KDa)"
```

If the command succeeds, you will see:
```json
{
  "key": "trevorblades",
  "status": "ok",
  "action": "added"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. API definitions are discussed in detail in the API section of this documentation. These objects encapsulate all of the settings for an API within Tyk Gateway.

{{< note success >}}
**Note**

Notice that  when creating a GQL API you need to include your GQL service schema in the API definition. Tyk Gateway doesn't have the capacity to introspect your GQL service on its own.

Including the correct schema allows Tyk Gateway to validate incoming requests against it. More on validation can be found [here]({{< ref "/graphql/validation">}})

{{< /note >}}

## Restart or hot reload

After generating the file, you must either restart the Gateway or initiate a hot reload through an API call to the gateway, as outlined below:
```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

This command will hot-reload your API Gateway(s) and the new GQL API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded [Trevorblades API](https://countries.trevorblades.com/) on `/trevorblades/`.

Your GQL API is now ready to use. We recommend that you secure any GQL API that you want to publish.
{{< tab_end >}}
{{< tabs_end >}}

Check the following docs for more on GraphQL-specific security options:
* [Field based permissions]({{< ref "/graphql/field-based-permissions">}})
* [Complexity limiting]({{< ref "/graphql/complexity-limiting">}})
* [Introspection]({{< ref "/graphql/introspection">}})

