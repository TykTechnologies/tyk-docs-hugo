---
title: "Creating a GraphQL API"
date: 2023-03-31
menu:
  main:
    parent: "GraphQL"
weight: 1
---
GraphQL API can be created in Tyk using:
* Tyk Dashboard
* Tyk Dashboard API
* Tyk Gateway API - for OSS users

The process is very similar to [HTTP API creation]({{< ref getting-started/create-api.md >}}) with a few additional steps to cover GraphQL specific functionalities.

{{< tabs_start >}}
{{< tab_start “GQL API via Tyk Dahsboard” >}}

In order to complete next steps, you need to have [Tyk Self Managed installed]({{< ref "tyk-self-managed/install" >}}).

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Try it free" >}}

### Step 1: Select "APIs" from the "System Management" section

{{< img src="/img/2.10/apis_menu.png" alt="API Menu" >}}

### Step 2: Click "ADD NEW API"

{{< img src="/img/2.10/add_api.png" alt="Add API button location" >}}

### Step 3: Set up the Base Configuration for your API

{{< img src="/img/dashboard/graphql/choose-gql-api.png" alt="Create GQL API" >}}

- From the **Overview** section, add your **API Name** and your API **Type** (In this case it's GraphQL). 
- From the **Details** section, add your **Target URL**. This will set the upstream origin that hosts the service you want to proxy to. As an example you can use [https://countries.trevorblades.com/]({{< ref https://countries.trevorblades.com/>}}).
- In case your upstream GQL service is protected tick the box next to **Upstream Protected** and provide authorization details, so that Tyk can introspect the GraphQL service. You can provide authorization details as a ser of headers or a certificate. [Introspection]({{< ref /graphql/introspection>}}) of your upstream service is important for Tyk to correctly work with your GraphQL.
- If you would like to persist authorization information for future use you can tick the **Persist headers for future use** box. That way, if upstream GQL schema changes in the future, you will be able to update it easily in Tyk.
- Click **Configure API** when you have finished

### Step 4: Set up the Authentication for your API

From the **Authentication** section:

{{< img src="/img/2.10/authentication.png" alt="Authentication" >}}

You have the following options:

- **Authentication mode**: This is the security method to use with your API. First you can set it to `Open(Keyless)`, but that option is not advised for production APIs. See [Authentication and Authorization]({{< ref "basic-config-and-security/security/authentication-&-authorization" >}}) for more details on securing your API.
- **Strip Authorization Data**: Select this option to strip any authorization data from your API requests.
- **Auth Key Header Name**: The header name that will hold the token on inbound requests. The default for this is `Authorization`.
- **Allow Query Parameter As Well As Header**: Set this option to enable checking the query parameter as well as the header for an auth token. **This is a setting that might be important if your GQL includes subscription operations**.
- **Use Cookie Value**: It is possible to use a cookie value as well as the other two token locations. 
- **Enable client certificate**: Select this to use Mutual TLS. See [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) for details on implementing mutual TLS.

### Step 5: Save the API

Click **SAVE**

{{< img src="/img/2.10/save.png" alt="Save button" >}}

Once saved, you will be taken back to the API list, where the new API will be displayed.

To see the URL given to your API, select the API from the list to open it again. The API URL will be displayed in the top of the editor:

{{< img src="/img/2.10/api_url.png" alt="API URL location" >}}

{{< tab_end >}}
{{< tab_start “GQL API via Tyk Dashboard API ” >}}



{{< tab_end >}}
{{< tab_start “GQL API via Tyk Gateway API ” >}}

{{< tab_end >}}
{{< tabs_end >}}