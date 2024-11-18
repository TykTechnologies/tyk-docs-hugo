---
---

<!-- START OMIT -->

{{< note success >}}

**Note: Integration with your OpenAPI documentation**

In Tyk v4.1 we introduced support for APIs defined according to the [OpenAPI Specification v3.0.3](https://spec.openapis.org/oas/v3.0.3) (OAS).  
This introduces a standard way to describe the vendor-agnostic elements of an API (the OpenAPI Definition, stored as an OpenAPI Document); we take this and add Tyk-specific configuration options to create the *Tyk OAS API Definition*. You can import your own OpenAPI document and Tyk will use this to generate the Tyk OAS API Definition.  
For a detailed tutorial on using OAS with Tyk Gateway, check out our guide to [creating a Tyk OAS API Definition]({{< ref "getting-started/using-oas-definitions/create-an-oas-api#tutorial-1-create-a-tyk-oas-api-using-the-tyk-gateway-api" >}}).

{{< /note >}}

## Prerequisites

In order to complete this tutorial, you need to have [Tyk Self Managed installed]({{< ref "tyk-self-managed/install" >}}).

{{< button_left href="https://tyk.io/sign-up/#self" color="green" content="Try it free" >}}

## Tutorial: Create an API with the Dashboard

We have a video walkthrough for creating an API and testing an endpoint via Postman.

{{< youtube qJOHn8BuMpw >}}

We will use the Tyk Dashboard to create a very simple API that has no special elements set up.

### Step 1: Select "APIs" from the "System Management" section

{{< img src="/img/2.10/apis_menu.png" alt="API Menu" >}}

### Step 2: Click "ADD NEW API"

{{< img src="/img/2.10/add_api.png" alt="Add API button location" >}}


### Step 3: Set up the basic configuration of your API


{{< img src="/img/dashboard/4.1-updates/create-api.png" alt="Create API" >}}



- In the **Overview** section, add a **Name** for your API and select the **Type** of API you wish to create. We will use HTTP for this tutorial. 
- In the **Details** section, add the **Upstream URL**. This is the Target URL that hosts the service to which you want to proxy incoming requests. You can configure Tyk to perform round-robin load balancing between multiple upstream servers (Target URLs) by selecting **Enable round-robin load balancing**; see [Load Balancing]({{< ref "planning-for-production/ensure-high-availability/load-balancing" >}}) for more details. For this tutorial, we will use a single upstream target: [http://httpbin.org](http://httpbin.org).
- Click **Configure API** when you have finished.

### Step 4: Set up authentication for your API

Take a look at the **Authentication** section:

{{< img src="/img/2.10/authentication.png" alt="Authentication" >}}

You have the following options:

- **Authentication mode**: This is the method that Tyk should use to authenticate requests to call your API. Tyk supports several different authentication modes - see [Authentication and Authorization]({{< ref "basic-config-and-security/security/authentication-&-authorization" >}}) for more details on securing your API. For this tutorial, you should select `Open (Keyless)`. 
- **Strip Authorization Data**: Select this option to ensure that any security (authentication) tokens provided to authorize requests to your API on Tyk are not leaked to the upstream. You can leave this unchecked for this tutorial.
- **Auth Key Header Name**: The header parameter that will hold the authentication token (or key) for requests to this API; the default for this is `Authorization`.
- **Allow query parameter as well as header**: This option allows the authentication token to be set in the query parameter, not just in the Request Header. For this tutorial, leave this unchecked.
- **Use Cookie Value**: Tyk also supports the use of a cookie value as an alternative authentication token location. For this tutorial, leave this unchecked.
- **Enable client certificate**: Tyk supports the use of Mutual TLS to authenticate requests to your API; you would use this checkbox to enable this mode. See [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) for details on implementing this feature. For this tutorial, leave this unchecked.

### Step 5: Save the API

Click **SAVE**

{{< img src="/img/2.10/save.png" alt="Save button" >}}

Once saved, you will be taken back to the API list, where your new API will be displayed.

If you select the API from the list to open it again, the API URL will be displayed in the top of the editor. This is the URL that your consumers will need to call to invoke your API. 

{{< img src="/img/2.10/api_url.png" alt="API URL location" >}}

## Tutorial: Create an API with the Dashboard API

It is easy to create APIs using Tyk Dashboard's own REST API.  
You will need an API key for your organization (to authenticate with the Dashboard API) and issue a request using these credentials to create your new API and make it live.

### Step 1: Obtain your Tyk Dashboard API access credentials key & Dashboard URL

- From the Tyk Dashboard, select "Users" in the "System Management" section.  
- Click **Edit** for your username, then scroll to the bottom of the page.  
- Your personal API key, granting you access to the Dashboard API, is labeled **Tyk Dashboard API Access Credentials** key

{{< img src="/img/2.10/user_api_id.png" alt="API key location" >}}

- Store your Dashboard Key, Dashboard URL & Gateway URL as environment variables so you don't need to keep typing them in

```bash
export DASH_KEY=db8adec7615d40db6419a2e4688678e0

# Locally installed dashboard
export DASH_URL=http://localhost:3000/api

# Locally installed gateway
export GATEWAY_URL=http://localhost:8080


### Step 2: Query the `/api/apis` endpoint to see what APIs are loaded on the Gateway

```curl
curl -H "Authorization: ${DASH_KEY}" ${DASH_URL}/apis
{"apis":[],"pages":1}
```

As you've got a fresh install, you will see that no APIs currently exist

### Step 2: Create your first API

We've created a simple Tyk Classic API definition that configures the Tyk Gateway to reverse proxy to the [http://httpbin.org](http://httpbin.org)
request/response service. The API definition object is stored here: https://bit.ly/2PdEHuv.

To load the API definition to the Gateway via the Dashboard API you issue this command:

```curl
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis \
  -d "$(wget -qO- https://bit.ly/2PdEHuv)"
{"Status":"OK","Message":"API created","Meta":"5de83a40767e0271d024661a"}
```

**Important** Take note of the API ID returned in the `Meta` field - you will need it later as this is the Tyk Gateway's internal identifier for the new API.

```
export API_ID=5de83a40767e0271d024661a
```

### Step 3: Test your new API

You can now make a call to your new API as follows:

```curl
curl ${GATEWAY_URL}/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "127.0.0.1, 188.220.131.154, 127.0.0.1",
  "url": "https://httpbin.org/get"
}
```

We sent a request to the gateway on the listen path `/httpbin`. Using this path-based-routing, the gateway was able to identify the API the client intended to target.

The gateway stripped the listen path and reverse proxied the request to http://httpbin.org/get

### Step 4: Protect your API

Let's grab the API definition we created before and store the output to a file locally.

```curl
curl -s -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} | python -mjson.tool > api.httpbin.json
```

We can now edit the `api.httpbin.json` file we just created, and modify a couple of fields to enable authentication.

Change `use_keyless` from `true` to `false`.

Change `auth_configs.authToken.auth_header_name` to `apikey`.

**Note** Prior to ** Tyk v2.9.2** `auth_configs.authToken.auth_header_name` was called `auth.auth_header_name`

Then send a `PUT` request back to Tyk Dashboard to update its configuration.

```curl
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} -X PUT -d "@api.httpbin.json"
{"Status":"OK","Message":"Api updated","Meta":null}
```

### Step 5: Test your protected API

First try sending a request without any credentials, as before:

```curl
curl -I ${GATEWAY_URL}/httpbin/get
HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:35:34 GMT
Content-Length: 46
```

As you can see, you received an `HTTP 401 Unauthorized` response.

Now send a request with incorrect credentials:

```curl
curl -I ${GATEWAY_URL}/httpbin/get -H 'apikey: somejunk'
HTTP/1.1 403 Forbidden
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:36:16 GMT
Content-Length: 57
```

As you can see, you received an `HTTP 403 Forbidden` response.

Try sending another request, this time with a valid API key.

Congratulations - You have just created your first keyless API, then protected it using Tyk!

<!-- END OMIT -->
