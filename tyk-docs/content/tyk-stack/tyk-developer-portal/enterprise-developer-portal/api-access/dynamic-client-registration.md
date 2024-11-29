---
title: "Dynamic client registration"
date: 2022-02-11
tags: ["Tyk Developer Portal","Enterprise Portal", "Dynamic client registration", "DCR"]
description: "How to configure the Dynamic client registration flow with the Enterprise Portal"
menu:
  main:
    parent: "API Access"
weight: 5
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

**Why OAuth2.0 is important**

OAuth 2.0 is a crucial security mechanism for both public and internal APIs, as it provides a secure and standardized way to authenticate and authorize access to protected resources. It enables granular access control and revocation of access when necessary without exposing sensitive login credentials. In short, OAuth 2.0 offers a secure and flexible approach to managing access to APIs.


Implementing an OAuth2.0 provider can be a complex process that involves several technical and security considerations. As such, many API providers choose to use specialized identity providers instead of implementing OAuth2.0 provider themselves.


By using specialized identity providers, API providers can leverage the provider's expertise and infrastructure to manage access to APIs and ensure the security of the authentication process. This also allows API providers to focus on their core business logic and reduce the burden of managing user identities themselves.

**How does Tyk help**

Tyk offers a standard and reliable way to work with identity providers through the Dynamic Client Registration protocol (DCR), which is an [Internet Engineering Task Force](https://www.ietf.org/) protocol that establishes standards for dynamically registering clients with authorization servers.

Tyk Enterprise Developer portal allows API providers to set up a connection with identity providers that support DCR so that API Consumers can use the OAuth2.0 credentials issued by the identity provider to access APIs exposed on the portal.


<br/>

## Prerequisites for getting started
Before getting starting with configuring the portal, it's required to configure your Identity provider and the Dashboard beforehand.

### Create an initial access token
Before setting up Tyk Enterprise Developer Portal to work with DCR, you need to configure the identity provider. Please refer to the guides for popular providers to create the initial access token for DCR:
* [Gluu](https://gluu.org/docs/gluu-server/4.0/admin-guide/openid-connect/#dynamic-client-registration)
* [Curity](https://curity.io/docs/idsvr/latest/token-service-admin-guide/dcr.html)
* [Keycloak](https://github.com/keycloak/keycloak/blob/main/docs/documentation/securing_apps/topics/client-registration.adoc)
* [Okta](https://developer.okta.com/docs/reference/api/oauth-clients/)

{{< note success >}}
**Note**

Whilst many providers require initial access tokens, they are optional. Please refer to your provider documentation to confirm if required.
{{< /note >}}

### Create OAuth2.0 scopes to enforce access control and rate limit

Tyk uses OAuth2.0 scope to enforce access control and rate limit for API Products. Therefore, creating at least two scopes for an API Product and plan is required. The below example demonstrates how to achieve that with Keycloak:

**Step 1. Navigate to the Client scopes menu item**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-1-navigate-to-the-client-scopes-menu.png" alt="Navigate to the Client scopes menu item" >}}

**Step 2. Create a scope for an API Product**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-2-create-a-scope-for-an-api-product.png" alt="Create a scope for an API Product" >}}

**Step 3. Create a scope for a plan**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-3-create-a-scope-for-a-plan.png" alt="Create a scope for a plan" >}}

{{< note success >}}
**Note**

When using Keycloak, ensure that you set the type of the scope to be `Optional`. Default scopes are applied automatically, while optional scopes can be requested by clients on a case-by-case basis to extend the permissions granted by the user. In recent versions of Keycloak this should appear as a dropdown menu option, as shown in the images above. In older releases of Keycloak this may need to be set explicitly in a separate tab, as show on the image below.
{{< /note >}}

{{< img src="/img/dashboard/portal-management/enterprise-portal/old-keycloak-version-client-scope.png" alt="Client Scope Assigned Type" >}}

### Create Tyk policies for an API Product and plan

Navigate to the Tyk Dashboard and create two policies: one for a plan and one for an API Product. Both policies should include only the APIs with JWT authentication that you want to bundle as an API Product.

**Step 1.** Create a policy for an API product.
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-jwt-policy-for-product.png" alt="Create a policy for a product" >}}

**Step 2.** Create a policy for a plan.
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-jwt-policy-for-plan.png" alt="Create a policy for a plan" >}}


### Create the No Operation policy and API
Tyk requires any API that uses the scope to policy mapping to have [a default policy]({{< ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}} ). Access rights and rate limits defined in the default policy take priority over other policies, including policies for the API Product and plan.

To avoid that, you need to create the No Operation API and policy that won't grant access to the APIs included in the API Product but will satisfy the requirement for a default policy.

**Step 1.** Create the No Operation API.

Navigate to the `APIs` menu in the Tyk Dashboard:
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-api-menu-in-the-tyk-dashboard.png" alt="Navigate to the API menu in the Tyk Dashboard" >}}


Create a new HTTP API:
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-noop-api.png" alt="Create the No Operation API" >}}


Save it:
{{< img src="/img/dashboard/portal-management/enterprise-portal/save-the-noop-api.png" alt="Save the No Operation API" >}}

<br/>

**Step 2.** Create the No Operation policy.

Navigate to the `Policies` menu in the Tyk Dashboard:
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-policies-menu.png" alt="Navigate to the policies menu" >}}

Create a new policy and select the No Operation API in the `Add API Access Rights` section:
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-noop-policy.png" alt="Create the No Operation policy" >}}

Configure the No Operation policy and save it:
{{< img src="/img/dashboard/portal-management/enterprise-portal/save-the-noop-policy.png" alt="Save the No Operation policy" >}}

### Configure scope to policy mapping

To enforce policies for the API Product and plan, you need to configure the scope to policy mapping for each API included in the API Product.
To achieve that, perform the following steps for each API included in the API Product.

**Step 1.** Navigate to the API.
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-api.png" alt="Navigate to the API" >}}

**Step 2.** Select the required JWT signing method. In this example, we use RSA. Leave the `Public key` and `pol` fields blank, they will be filled automatically by the Enterprise portal.
{{< img src="/img/dashboard/portal-management/enterprise-portal/select-signing-method.png" alt="Select signing method for the API" >}}

**Step 3.** Select the No Operation policy as the default policy for this API.
{{< img src="/img/dashboard/portal-management/enterprise-portal/select-the-default-policy.png" alt="Select the default policy for the API" >}}

**Step 4.** Enable scope to policy mapping and specify the value of the JWT claim used to extract scopes in the `Scope name` field (the default value is "scope").
{{< img src="/img/dashboard/portal-management/enterprise-portal/enable-scope-to-policy-mapping.png" alt="Enable scope to policy mapping" >}}


**Step 5.** Add a scope to policy mapping for the product scope. Type the product scope in the `Claim field` and select the product policy.
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-scope-to-policy-mapping-for-the-product-scope.png" alt="Add scope to policy mapping for the product scope" >}}

**Step 6.** Add a scope to policy mapping for the plan scope. Type the plan scope in the `Claim field` and select the plan policy, then save the API.
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-scope-to-policy-mapping-for-the-plan-scope.png" alt="Add scope to policy mapping for the plan scope" >}}



## Configure Tyk Enterprise Developer Portal to work with an identity provider

Once policies for the plan and product are created, and the scope-to-policy mapping is configured for all APIs that are included in the product, it's time to set up the portal to work with your IdP.


### Configure the App registration settings

In the portal, navigate to the `OAuth2.0 Providers` menu section. In that section, you need to configure the connection settings to the IdP and define one or more types (configurations) of OAuth 2.0 clients. For instance, you can define two types of OAuth 2.0 clients:
* A confidential client that supports the Client credential grant type for backend integrations;
* A web client that supports the Authorization code grant type for integration with web applications that can't keep the client secret confidential.

Each configuration of OAuth 2.0 client could be associated with one or multiple API Products so that when an API Consumer requests access to an API Product, they can select a client type that is more suitable for their use case.


#### Specify connection setting to your IdP

To connect the portal to the IdP, you need to specify the following settings:
* OIDC well-known configuration URL.
* Initial access token.

First of all, select your IdP from the `Identity provider` dropdown list. Different IdPs have slightly different approaches to DCR implementation, so the portal will use a driver that is specific to your IdP. If your IdP is not present in the dropdown list, select the `Other` option. In that case, the portal will use the most standard implementation of the DCR driver, which implements the DCR flow as defined in the RFC.

Then you need to specify the connection settings: [the initial access token and the well-known endpoint]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration#create-an-initial-access-token" >}}). If your Identity Provider uses certificates that are not trusted, the portal will not work with it by default. To bypass certificate verification, you can select the `SSL secure skip verify` checkbox.
{{< img src="/img/dashboard/portal-management/enterprise-portal/specify-connection-setting-to-your-idp.png" alt="Specify connection setting to the IdP" >}}


#### Create client configurations
Once the connection settings are specified, you need to create one or multiple types of clients. You might have multiple types of clients that are suitable for different use cases, such as backend integration or web applications.

You need at least one type of client for the DCR flow to work. To add the first client type, scroll down to the `Client Types` section and click on the `Add client type` button.
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-the-first-client-type.png" alt="Add the first client type" >}}

To configure a client type, you need to specify the following settings:
* **Client type display name.** This name will be displayed to API consumers when they check out API products. Try to make it descriptive and short, so it's easier for API consumers to understand.
* **Description.** A more verbose description of a client type can be provided in this field. By default, we do not display this on the checkout page, but you can customize the respective template and make the description visible to API consumers. Please refer to [the customization section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation" >}}) for guidance.
* **Allowed response_types.** Response types associated with this type of client as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html).
* **Allowed grant_types.** Grant types that this type of client will support as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html).
* **Token endpoint auth methods.** The token endpoint that will be used by this type of client as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html).
* Additionally, there’s an additional field for Okta: **Okta application type** which defines which type of Okta client should be created. Ignored for all other IdPs.

Please note that your IdP might override some of these settings based on its configuration.

An example of configuration is demonstrated below. After configuring a client type, scroll to the top of the page to save it by clicking on the `SAVE CHANGES` button.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-type-of-client.png" alt="Configure a client type" >}}

### Configure API Products and plans for the DCR flow
Once the App registration settings are configured, it is time for the final step: to configure the API Products and plans to work with the DCR flow.

#### Configure API Products for the DCR flow
To configure API Products to work with the DCR flow, you need to:
* Enable the DCR flow for the products you want to work with the DCR flow.
* Associate each product with one or multiple types of clients that were created in the previous step.
* Specify scopes for this API Product. Note the portal uses the scope to policy mapping to enforce access control to API Products, so there should be at least one scope.

For achieving this, navigate to the `API Products` menu and select the particular API product you want to use for the DCR flow. Next, go to the ‘App registration configs’ section and enable the ‘Enable dynamic client registration’ checkbox.

After that, specify the scope for this API product. You should have at least one scope that was created in [the Prerequisites for getting started]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration#prerequisites-for-getting-started" >}}). If you need to specify more than one scope, you can separate them with spaces.

Finally, select one or multiple types of clients that were created in [the Create client configurations]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration#create-client-configurations" >}}) section of this guide to associate them with that product.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-api-products-for-the-dcr-flow.png" alt="Configure an API Product to work with the DCR flow" >}}


#### Configure plans for the DCR flow
The last step is to configure the plans you want to use with the DCR flow. To do this, go to the portal's `Plans` menu section and specify the OAuth2.0 scope to use with each plan. You should have at least one scope that was created in [the Prerequisites for getting started]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration#prerequisites-for-getting-started" >}}). If you need to specify more than one scope, you can separate them with spaces.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-plan-for-the-dcr-flow.png" alt="Configure a plan to work with the DCR flow" >}}

## Test the DCR flow
To test the DCR flow, you need to perform the following actions:
- Request access to the API product and plan you have selected for the DCR flow as a developer.
- Approve the access request as an admin.
- As a developer, copy the access credentials and obtain an access token.
- As a developer, make an API call to verify the flow's functionality.

### Request access to the API Product
To request access to the DCR enabled API Product:
- Log in as a developer and navigate to the catalog page.
- Select the DCR enabled API Product and add it to the shopping cart.
- Navigate to the checkout page.
- On the checkout page, select a plan to use with that product, select an existing application, or create a new one. If you plan to build an application that uses the Authorization code grant type, you also need to specify redirect URI of your application in the `Redirect URLs` field. If you have multiple redirect URI, you can separate them with commas.
- Select a client type which is more suitable for your use case in the `Select a client type` section.
- Finally, select the applicable type of client and click on the `Submit request` button. 
{{< img src="/img/dashboard/portal-management/enterprise-portal/request-access-to-the-dcr-enabled-product.png" alt="Request access to the DCR enabled product" width="600" >}}

### Approve the access request
To approve the access request, navigate to the `Access requests` menu in the portal, select the access request and approve it by clicking on the `Approve` button.
{{< img src="/img/dashboard/portal-management/enterprise-portal/approve-dcr-access-request.png" alt="Approve DCR access request" >}}

### Obtain an access token
Once the access request is approved, the developer should receive an email informing them of the approval. Please refer to [the email customization section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization.md" >}}) if you wish to change the email template.

As a developer, navigate to the `My Dashboard` section in the developer portal, select the application, and copy the OAuth 2.0 credentials. 

{{< img src="/img/dashboard/portal-management/enterprise-portal/copy-oauth-credentials.png" alt="Copy the OAuth2.0 credentials" >}}

Then use the credentials you have copied to obtain an access token. Make sure to include the scopes that are used to enforce access to the API product and plan. Otherwise, the gateway will not authorize the request. Here's an example of to achieve that with `curl`:
```curl
curl --location --request POST 'http://localhost:9999/realms/DCR/protocol/openid-connect/token' \
--header 'Authorization: Basic N2M2NGM2ZTQtM2I0Ny00NTMyLWFlMWEtODM1ZTMyMWY2ZjlkOjNwZGlJSXVxd004Ykp0M0toV0tLZHFIRkZMWkN3THQ0' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'scope=product_payments free_plan' \
--data-urlencode 'grant_type=client_credentials'
```
Since in this example we use the client_secret_basic token endpoint authentication method, the credentials must be supplied as a Base64-encoded string: {client_id}:{client_secret}.

As a result, you should receive a JWT access token containing the required scopes:
{{< img src="/img/dashboard/portal-management/enterprise-portal/jwt.png" alt="An example of a JWT" width="600" >}}

### Make an API Call
Finally, use the access token to make an API call and test the flow functionality:
```curl
curl --location --request GET 'http://localhost:8080/payment-api/get' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUR1ZQd25MWlduaWpNc2taU3lHeHFtYnFDNVlIcW9QUUJYZE4xTmJCRDZjIn0.eyJleHAiOjE2Nzg0NDA2ODksImlhdCI6MTY3ODQ0MDM4OSwianRpIjoiMGYwNTdlYjItODQ5My00ZmM2LTllMzQtZTk0OWUzYWQ2MmI2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5OTk5L3JlYWxtcy9EQ1IiLCJzdWIiOiJlNGE3YmFkNy04ZDA4LTQxOTAtODc1Ni1mNTU1ZWQ3Y2JhZjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI3YzY0YzZlNC0zYjQ3LTQ1MzItYWUxYS04MzVlMzIxZjZmOWQiLCJzY29wZSI6ImZyZWVfcGxhbiBwcm9kdWN0X3BheW1lbnRzIiwiY2xpZW50SWQiOiI3YzY0YzZlNC0zYjQ3LTQ1MzItYWUxYS04MzVlMzIxZjZmOWQiLCJjbGllbnRIb3N0IjoiMTcyLjE3LjAuMSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTcuMC4xIn0.WGp9UIqE7CjFhHdaM64b0G2HGP4adaDg3dgc0YVCV9rTDYmri32Djku7PcLiDKyNLCvlQXUm_O2YmwMCLLUHKPGlRmBMG2y-79-T8z5V-qBATbE6uzwPh38p-SYIIDBUZtlMEhnVp049ZqNolUW-n2uB4CTRb0kDosdRnqhiMUFpe-ORwnZB-4BHGRlwWKyjc5Da6CvVczM1a_c5akqurGMFaX9DC81SS-zMXXpQPDpAkvUJBfLYDHEvXWH8JISqYv7ZQSAbOyE4b-EkVAesyHIMDCQ_pzf5Yp2ivM0dOufN9kdG2w_9ToMqJieVyQILJPowEakmEealbNUFQvc5FA'
```

You should receive the following response:
```{.json}
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUR1ZQd25MWlduaWpNc2taU3lHeHFtYnFDNVlIcW9QUUJYZE4xTmJCRDZjIn0.eyJleHAiOjE2Nzg0NDA2ODksImlhdCI6MTY3ODQ0MDM4OSwianRpIjoiMGYwNTdlYjItODQ5My00ZmM2LTllMzQtZTk0OWUzYWQ2MmI2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5OTk5L3JlYWxtcy9EQ1IiLCJzdWIiOiJlNGE3YmFkNy04ZDA4LTQxOTAtODc1Ni1mNTU1ZWQ3Y2JhZjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI3YzY0YzZlNC0zYjQ3LTQ1MzItYWUxYS04MzVlMzIxZjZmOWQiLCJzY29wZSI6ImZyZWVfcGxhbiBwcm9kdWN0X3BheW1lbnRzIiwiY2xpZW50SWQiOiI3YzY0YzZlNC0zYjQ3LTQ1MzItYWUxYS04MzVlMzIxZjZmOWQiLCJjbGllbnRIb3N0IjoiMTcyLjE3LjAuMSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTcuMC4xIn0.WGp9UIqE7CjFhHdaM64b0G2HGP4adaDg3dgc0YVCV9rTDYmri32Djku7PcLiDKyNLCvlQXUm_O2YmwMCLLUHKPGlRmBMG2y-79-T8z5V-qBATbE6uzwPh38p-SYIIDBUZtlMEhnVp049ZqNolUW-n2uB4CTRb0kDosdRnqhiMUFpe-ORwnZB-4BHGRlwWKyjc5Da6CvVczM1a_c5akqurGMFaX9DC81SS-zMXXpQPDpAkvUJBfLYDHEvXWH8JISqYv7ZQSAbOyE4b-EkVAesyHIMDCQ_pzf5Yp2ivM0dOufN9kdG2w_9ToMqJieVyQILJPowEakmEealbNUFQvc5FA",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.85.0",
  },
  "origin": "XXX.XXX.XXX.XXX, XXX.XXX.XXX.XXX",
  "url": "http://httpbin.org/get"
}
```
