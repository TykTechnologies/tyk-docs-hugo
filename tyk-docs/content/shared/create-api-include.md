---
---

<!-- START OMIT -->

## Prerequisites

In order to complete this tutorial, you need to have [Tyk Self Managed installed]({{< ref "tyk-self-managed/install/" >}}).

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Try it free" >}}

## Tutorial: Create an API with the Dashboard

We have a video walkthrough for creating an API and testing an endpoint via Postman.

{{< youtube qJOHn8BuMpw >}}

We will use the Tyk Dashboard to create a very simple API that has no special elements set up.

### Step 1: Select "APIs" from the "System Management" section

![API Menu](img/2.10/apis_menu.png)

### Step 2: Click "ADD NEW API"

![Add API button location](img/2.10/add_api.png)


### Step 3: Set up the Base Configuration for your API


{{< img src="/img/dashboard/4.1-updates/create-api.png" alt="Create API" >}}



- From the **Overview** section, add your **API Name** and your API **Type** (We will use HTTP for this tutorial). 
- From the **Details** section, add your **Target URL**. This will set the upstream origin that hosts the service you want to proxy to. For this tutorial you can use [http://httpbin.org](http://httpbin.org). If you wish to use more than one target URL you can select **Enable round-robin load balancing**. For this tutorial, we will just use a single upstream target. See [Load Balancing]({{< ref "planning-for-production/ensure-high-availability/load-balancing" >}}) for more details. 
- Click **Configure API** when you have finished

### Step 4: Set up the Authentication for your API

From the **Authentication** section:

![Authentication](img/2.10/authentication.png)

You have the following options:

- **Authentication mode**: This is the security method to use with your API.  For this tutorial, set it to `Open (Keyless)`. See [Authentication and Authorization]({{< ref "basic-config-and-security/security/authentication-authorization/" >}}) for more details on securing your API.
- **Strip Authorization Data**: Select this option to strip any authorization data from your API requests.
- **Auth Key Header Name**: The header name that will hold the token on inbound requests. The default for this is `Authorization`.
- **Allow Query Parameter As Well As Header**: Set this option to enable checking the query parameter as well as the header for an auth token. For this tutorial, leave this `unchecked`.
- **Use Cookie Value**: It is possible to use a cookie value as well as the other two token locations. Set this as `unchecked`.
- **Enable client certificate**: Select this to use Mutual TLS. See [Mutual TLS]({{< ref "basic-config-and-security/security/tls-and-ssl/mutual-tls/" >}}) for details on implementing mutual TLS.

### Step 5: Save the API

Click **SAVE**

![Save button](img/2.10/save.png)

Once saved, you will be taken back to the API list, where the new API will be displayed.

To see the URL given to your API, select the API from the list to open it again. The API URL will be displayed in the top of the editor:

![API URL location](img/2.10/api_url.png)

## Tutorial: Create an API with the Dashboard API

It is possible to create APIs using Tyk Dashboard's REST API.
You will need an API key for your organisation and one command to create the API and make it live.

### Obtain your Tyk Dashboard API Access Credentials key & Dashboard URL

From the Tyk Dashboard, select "Users" from the "System Management" section.
Click **Edit** for your user, then scroll to the bottom of the page. Your **Tyk Dashboard API Access Credentials** key is the first entry:

![API key location](img/2.10/user_api_id.png)

Store your Dashboard Key, Dashboard URL & Gateway URL as environment variables so you don't need to keep typing them in:

```
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

```
curl -H "Authorization: ${DASH_KEY}" ${DASH_URL}/apis
{"apis":[],"pages":1}
```

For a fresh install, you will see that no APIs currently exist

### Create your first API

This example API definition configures the Tyk Gateway to reverse proxy to the [http://httpbin.org](http://httpbin.org)
request/response service.

To view the raw API definition object, you may visit: https://bit.ly/2PdEHuv

```{.copyWrapper}
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis \
  -d "$(wget -qO- https://bit.ly/2PdEHuv)"
{"Status":"OK","Message":"API created","Meta":"5de83a40767e0271d024661a"}
```

Take note of the API ID returned in the meta above - you will need it later.

```
export API_ID=5de83a40767e0271d024661a
```

### Test your new API

```
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

We sent a request to the gateway on the listen path `/httpbin`. Using this path-based-routing, the gateway was able
to identify the API the client intended to target.

The gateway stripped the listen path, and reverse proxied the request to http://httpbin.org/get

### Protect your API

Let's grab the API definition we created before and store the output to a file locally.

```
curl -s -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} | python -mjson.tool > api.httpbin.json
```

We can now edit the `api.httpbin.json` file we just created, and modify a couple of fields to enable authentication.

Change `use_keyless` from `true` to `false`.

Change `auth.auth_header_name` to `apikey`. **Note** from **v2.9.2** `auth.auth_header_name` has been deprecated and you should use `auth_configs.authToken.auth_header_name` instead.

Then send a `PUT` request back to Tyk Dashboard to update it's configurations.

```
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/${API_ID} -X PUT -d "@api.httpbin.json"
{"Status":"OK","Message":"Api updated","Meta":null}
```

### Test protected API

Send request without any credentials

```
curl -I ${GATEWAY_URL}/httpbin/get
HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:35:34 GMT
Content-Length: 46
```

Send request with incorrect credentials

```
curl -I ${GATEWAY_URL}/httpbin/get -H 'apikey: somejunk'
HTTP/1.1 403 Forbidden
Content-Type: application/json
X-Generator: tyk.io
Date: Wed, 04 Dec 2019 23:36:16 GMT
Content-Length: 57
```

Congratulations - You have just created your first keyless API, then protected it using Tyk!

<!-- END OMIT -->
