---
date: 2021-08-23T10:00:00Z
title: Step by step guide using Curity
menu:
  main:
    parent: "Dynamic Client Registration"
weight: 4 
url: /tyk-developer-portal/curity-dcr
---

This guide describes how to integrate [The Curity Identity Server](https://curity.io/) with the Tyk Developer Portal using [OpenID Connect Dynamic Client Registration protocol](https://tools.ietf.org/html/rfc7591).

Use case outline:

1. A developer registers an account with the Tyk Developer Portal and uses the portal to create a new client.

2. Tyk sends a {{< tooltip >}}DCR{{< definition >}}Dynamic Client Registration{{< /definition >}}{{< /tooltip >}} request to the {{< tooltip >}}IDP{{< definition >}}Identity Provider{{< /definition >}}{{< /tooltip >}}, in this case The Curity Identity Server. The IDP replies with the Client ID and Secret.

3. Using the provided Client ID and Secret, the developer (or an application) can initiate an Authorization flow to obtain an Access Token from The Curity Identity Server.

4. The developer (or the application) can then use the Access Token when calling an API exposed by Tyk. Tyk validates the token using the {{< tooltip >}}JWKS{{< definition >}}JSON Web Key Sets{{< /definition >}}{{< /tooltip >}} provided by The Curity Identity Server.

### Requirements

- An installation of The Curity Identity Server. Follow the [Getting Started Guide](https://curity.io/resources/getting-started/) if an installation is not already available.
- A [Tyk Self Managed installation](/docs/tyk-on-premises/) (Gateway + Dashboard).

### Enable DCR in The Curity Identity Server

By default, DCR is not enabled in The Curity Identity Server. In the Admin UI, go to **Profiles** &rarr; **Token Service** &rarr; **General** &rarr; **Dynamic Registration**. Set both **Enable DCR** and **Non-templatized** to enabled, and set the **Authentication Method** to `no-authentication`

<!-- ![Step 1](/docs/img/dcr/curity/1-curity-admin-ui-dcr.png) -->
![Enable DCR](/docs/nightly/img/dcr/curity/1-curity-admin-ui-dcr.png)

Navigate to **Profiles** &rarr; **Token Service** &rarr; **Endpoints** and locate the path of the DCR endpoint. The path is needed later when configuring DCR in Tyk.

<!-- ![DCR Endpoint](/docs/img/dcr/curity/2-curity-dcr-endpoint.png) -->
![DCR Endpoint](/docs/nightly/img/dcr/curity/2-curity-dcr-endpoint.png)

{{< note success >}}
**Commit the changes**

Remember to **Commit** the changes by going to **Changes** &rarr; **Commit**.

{{< /note >}}

### Setting up Tyk

First check `tyk_analytics.conf` and make sure that a proper `oauth_redirect_uri_separator` parameter is set. This sets the character that separates multiple redirect uri's to `;`.

```json
    "oauth_redirect_uri_separator": ";",
```

If a change is needed in `tyk_analytics.conf`, remember to restart the service to apply the change.

#### Create an API

Now open the Tyk Dashboard and navigate to **System Management** &rarr; **APIs**. Create a new API and give it the name `curity-api`:

<!-- ![Create API](/docs/img/dcr/curity/3-curity-create-api.png) -->
![Create API](/docs/nightly/img/dcr/curity/3-curity-create-api.png)

Click **Configure API** and scroll down to the Authentication section. Configure as follows:

<!-- ![Configure API](/docs/img/dcr/curity/4-curity-configure-api.png) -->
![Configure API](/docs/nightly/img/dcr/curity/4-curity-configure-api.png)

{{< note success >}}
**Obtaining the JWKS URI**  

The JWKS URI can be obtained via the `.well-known/openid-configuration` endpoint as it's a required value. The below cURL command can get the `"jwks_uri"` value directly. 

```shell
curl -sS https://idsvr.example.com/oauth/v2/oauth-anonymous/.well-known/openid-configuration | grep -o '"jwks_uri":"[^"]*' | cut -d'"' -f4
```

{{< /note >}}

Click **Save** to save the API.

#### Create and assign a policy

Switch to **System Management** &rarr; **Policies**. Click **Add Policy** and select the API created previously (`curity-api`) from the list. Then switch to the **Configurations** tab. Name the policy `Curity Policy`. Select an expiry and click `Create Policy`.

Navigate to **System Management** &rarr; **APIs**, click `curity-api`, scroll down to the **Authentication** section and select the newly created policy in the **Default Policy** setting.

<!-- ![Configure policy](/docs/img/dcr/curity/5-curity-configure-policy.png) -->
![Configure policy](/docs/nightly/img/dcr/curity/5-curity-configure-policy.png)

#### Publish the API to the Developer Portal

The API is now configured and can be published to the Tyk Developer Portal. Navigate to **Portal Management** &rarr; **Catalogue**, then click **Add New API**. Give it a public name, ex. `Curity Demo API` and select the `Curity Policy`. 

<!-- ![Publish API](/docs/img/dcr/curity/6-curity-publish-api.png) -->
![Publish API](/docs/nightly/img/dcr/curity/6-curity-publish-api.png)

Navigate to the **Settings** tab and check the box `Override global settings`. Then scroll down to the **Dynamic Client Registration for portal APIs** section and toggle the switch to enable. Configure as pictured below:

<!-- ![Configure DCR](/docs/img/dcr/curity/7-curity-configure-dcr.png) -->
![Configure DCR](/docs/nightly/img/dcr/curity/7-curity-configure-dcr.png)

Config parameter                  | Description                         | Value
----------------------------------|-------------------------------------|-----
Providers                         | The IDP vendor                      | `Other`                              
Grant Types                       | What grant types the DCR client will support | `Authorization Code`, `Client Credentials`
Token Endpoint Auth Method        | How the client authenticates against the IDPs token endpoint | `Client Secret - Post`
Response Types                    | OAuth 2.0 response types that will be used by the client. | `Authorization Code`, `Token` 
Identity Provider Host            | The Base URL of the IDP            | Ex. `https://idsvr.example.com`
Client Registration Endpoint      | The OpenID Connect client registration endpoint. | Ex. `https://idsvr.example.com/token-service/oauth-registration`
Initial Registration Access Token | Token to authenticate the DCR endpoint | Not needed. Authentication method in Curity set to `no-authentication`

### Testing the flow

Tyk and The Curity Identity Server should now be configured and the flow to register an OAuth client using the Tyk Developer Portal can be tested.

#### Create an OAuth Client
Start by registering a developer by navigating to **Portal Management** &rarr; **Developers** and add a developer. Then open the Tyk Developer Portal (ex. http://<host>:3000/portal) and open the **OAuth clients** page. Start the wizard by clicking **Create first Oauth Client**.

<!-- ![Create OAuth client wizard](/docs/img/dcr/curity/8-curity-create-oauth-client-wizard.png) -->
![Create OAuth client wizard](/docs/nightly/img/dcr/curity/8-curity-create-oauth-client-wizard.png)

Select the API previously published named **Curity API** and then click **Save and continue**.

Enter a Client name and add at least one redirect URL, then click **Create**.

<!-- ![Application details](/docs/img/dcr/curity/9-curity-application-details.png) -->
![Application details](/docs/nightly/img/dcr/curity/9-curity-application-details.png)

{{< note success >}}
**OAuth.Tools**

If using [OAuth.tools](https://oauth.tools/) to obtain a token, make sure to add the appropriate redirect URL. Ex:

```
http://localhost:7777;https://oauth.tools/callback/code;app://oauth.tools/callback/code
```

The web-based version of [OAuth.tools](https://oauth.tools/) using the Code Flow would require `https://oauth.tools/callback/code` and the [App version of OAuth.tools](https://developer.curity.io/oauth-tools) requires `app://oauth.tools/callback/code`.

{{< /note >}}

Tyk will make a call to The Curity Identity Server and the DCR endpoint to register a dynamic client. The details of the dynamically registered client will be displayed.

<!-- ![DCR client details](/docs/img/dcr/curity/10-curity-dcr-client-details.png) -->
![DCR client details](/docs/nightly/img/dcr/curity/10-curity-dcr-client-details.png)

#### Obtain a token using DCR client

[OAuth.tools](https://oauth.tools/) can be used to obtain an access token from The Curity Identity Server using the DCR information. 

Start a Code or Client Credentials Flow. Copy the **Client ID** and the **Client Secret** to the appropriate fields in [OAuth.tools](https://oauth.tools/). Run the flow to obtain a token.

<!-- ![OAuth.tools](/docs/img/dcr/curity/11-curity-oauth-tools.png) -->
![OAuth.tools](/docs/nightly/img/dcr/curity/11-curity-oauth-tools.png)

#### Use access token in request to API
The token can now be used in an **External API** flow in [OAuth.tools](https://oauth.tools/) to call the API that Tyk is proxying. Tyk will validate the JWT and allow the call to the upstream API (httpbin.org in this example). The response from the API is displayed in the right panel in [OAuth.tools](https://oauth.tools/). Httpbin.org echoes back what it receives in the request from Tyk. Note that the JWT is forwarded.

<!-- ![Call API](/docs/img/dcr/curity/12-curity-external-api-flow.png) -->
![Call API](/docs/nightly/img/dcr/curity/12-curity-external-api-flow.png)