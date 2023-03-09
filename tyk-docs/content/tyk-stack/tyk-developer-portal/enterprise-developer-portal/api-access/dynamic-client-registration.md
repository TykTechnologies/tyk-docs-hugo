---
title: "Dynamic client registration"
date: 2022-02-11
tags: [""]
description: ""
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

**Why oAuth2.0 is important**

OAuth 2.0 is a crucial security mechanism for both public and internal APIs, as it provides a secure and standardized way to authenticate and authorize access to protected resources. It enables granular access control and revocation of access when necessary without exposing sensitive login credentials. In short, OAuth 2.0 offers a secure and flexible approach to managing access to APIs.


Implementing an OAuth2.0 provider can be a complex process that involves several technical and security considerations. As such, many API providers choose to use specialized identity providers instead of implementing oAuth2.0 provider themselves.


By using specialized identity providers, API providers can leverage the provider's expertise and infrastructure to manage access to APIs and ensure the security of the authentication process. This also allows API providers to focus on their core business logic and reduce the burden of managing user identities themselves.

**How does Tyk help**

Tyk offers a standard and reliable way to work with identity providers through the Dynamic Client Registration protocol (DCR), which is an Internet Engineering Task Force protocol that establishes standards for dynamically registering clients with authorization servers.

Tyk Enterprise Developer portal allows API providers to set up a connection with identity providers that support DCR so that API Consumers can use the oAuth2.0 credentials issued by the identity provider to access APIs exposed on the portal.


<br/>

## Prerequisites for getting started
Before getting starting with configuring the portal, it's required to configure your Identity provider and the Dashboard beforehand.

### Create an initial access token
Before setting up Tyk Enterprise Developer Portal to work with DCR, you need to configure the identity provider. Please refer to the guides for popular providers to create the initial access token for DCR:
* Keycloak;
* Okta;
* Gluu;
* Curity.

### Create oAuth2.0 scopes to enforce access control and rate limit

Tyk uses oAuth2.0 scope to enforce access control and rate limit for API Products. Therefore, creating at least two scopes for an API Product and plan is required. The below example demonstrates how to achieve that with Keycloak:

**Step 1. Navigate to the Client scopes menu item**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-1-navigate-to-the-client-scopes-menu.png" alt="Navigate to the Client scopes menu item" >}}

**Step 2. Create a scope for an API Product**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-2-create-a-scope-for-an-api-product.png" alt="Create a scope for an API Product" >}}

**Step 3. Create a scope for a plan**
{{< img src="/img/dashboard/portal-management/enterprise-portal/step-3-create-a-scope-for-a-plan.png" alt="Create a scope for a plan" >}}


### Create Tyk policies for an API Product and plan

Navigate to the Tyk Dashboard and create two policies: one for the plan and one for the API Product. Both policies should include the APIs with JWT authentication.

Step 1. Create a policy for a product.
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-jwt-policy-for-product.png" alt="Create a policy for a product" >}}

Step 2. Create a policy for a plan.
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-jwt-policy-for-plan.png" alt="Create a policy for a plan" >}}


### Create the NoOp policy and API

Tyk requires any API that uses the scope to policy mapping to have a default policy &lt;link to the default policy>. Access rights and rate limits defined in the default policy take priority over other policies, including policies for the API Product and plan.

To avoid that, you need to create the NoOp API and policy that won't grant access to the APIs included in the API Product but will satisfy the requirement for a default policy.

**Step 1.** Create the NoOp API

For that, navigate to the API menu in the Tyk Dashboard:
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-api-menu-in-the-tyk-dashboard.png" alt="Navigate to the API menu in the Tyk Dashboard" >}}


Create a new HTTP API:
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-noop-api.png" alt="Create the NoOp API" >}}


And save it:
{{< img src="/img/dashboard/portal-management/enterprise-portal/save-the-noop-api.png" alt="Save the NoOp API" >}}

<br/>

**Step 2.** Create the NoOp policy

To achieve that, navigate to the Policies menu in the Tyk Dashboard:
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-policies-menu.png" alt="Navigate to the policies menu" >}}

Create a new policy and select the NoOp API in the "Add API Access Rights":
{{< img src="/img/dashboard/portal-management/enterprise-portal/create-noop-policy.png" alt="Create the NoOp policy" >}}

Configure the NoOp policy and save the policy:
{{< img src="/img/dashboard/portal-management/enterprise-portal/save-the-noop-policy.png" alt="Save the NoOp policy" >}}

### Configure scope to policy mapping

To enforce policies for the API Product and plan, you need to configure the scope to policy mapping for each API.

**Step 1.** Navigate to the API:
{{< img src="/img/dashboard/portal-management/enterprise-portal/navigate-to-the-api.png" alt="Navigate to the API" >}}

**Step 2.** Select the required JWT signing method. In this example, we use RSA:
{{< img src="/img/dashboard/portal-management/enterprise-portal/select-signing-method.png" alt="Select signing method for the API" >}}

**Step 3.** Select the NoOp policy as the default policy for this API:
{{< img src="/img/dashboard/portal-management/enterprise-portal/select-the-default-policy.png" alt="Select the default policy for the API" >}}

**Step 4.** Enable scope to policy mapping and specify the value of the JWT claim used to extract scopes (the default value is "scope""):
{{< img src="/img/dashboard/portal-management/enterprise-portal/enable-scope-to-policy-mapping.png" alt="Enable scope to policy mapping" >}}


**Step 5.** Add a scope to policy mapping for the product scope. Type the product scope in the Claim field and select the product policy:
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-scope-to-policy-mapping-for-the-product-scope.png" alt="Add scope to policy mapping for the product scope" >}}

**Step 6.** Add a scope to policy mapping for the plan scope. Type the plan scope in the Claim field and select the plan policy, then save the API:
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-a-scope-to-policy-mapping-for-the-plan-scope.png" alt="Add scope to policy mapping for the plan scope" >}}



## Configure Tyk Enterprise Developer Portal to work with an identity provider

Once policies for the plan and product are created, and the scope-to-policy mapping is configured in all APIs that are included in the product, it's time to set up the portal to work with your IdP.


### Configure the App registration settings

In the portal, navigate to the "App registration" menu section. In that section, you need to configure the connection settings to the IdP and define one or more types (configurations) of OAuth 2.0 clients. For instance, you can define two types of OAuth 2.0 clients:
* A confidential client that supports the Client credential grant type for backend integrations;
* A web client that supports the Authorization code grant type for integration with web applications that can't keep the client's secret safe.

Each configuration of OAuth 2.0 clients could be associated with one or multiple API Products so that when an API Consumer requests access to an API Product, they can select a client type that is more suitable for their use case.


#### Specify connection setting to your IdP

To connect the portal to the IdP, you need to specify the following settings:
* OIDC well-known configuration URL;
* Initial access token.

First of all, select your IdP from the dropdown list. Different IdPs have slightly different approaches to DCR implementation, so the portal will use a driver that is specific to your IdP. If your IdP is not present in the dropdown list, select the 'Other' option. In that case, the portal will use the most standard implementation of the DCR driver, which implements the DCR flow as defined in the RFC.
Then you need to specify the connection settings: the initial access token &lt;link to the prerequisites> and the well-known endpoint. If your Identity Provider uses certificates that are not trusted, the portal will not work with it by default. To bypass certificate verification, you can select the 'SSL secure skip verify' checkbox.
{{< img src="/img/dashboard/portal-management/enterprise-portal/specify-connection-setting-to-your-idp.png" alt="Specify connection setting to the IdP" >}}


#### Create client configurations
Once the connection settings are specified, you need to create one or multiple types of clients. You might have multiple types of clients that are suitable for different use cases, such as backend integration or web applications.
You need at least one type of client for the DCR flow to work. To add the first client type, scroll down to the 'Client Types' section and click on the “Add client type” button.
{{< img src="/img/dashboard/portal-management/enterprise-portal/add-the-first-client-type.png" alt="Add the first client type" >}}

To configure a client type, you need to specify the following settings:
* **Client type display name.** This name will be displayed to API consumers when they check out API products. Try to make it descriptive and short, so it's easier for API consumers to understand;
* **Description.** A more verbose description of a client type can be provided in this field. By default, we do not display this on the checkout page, but you can customize the respective template and make the description visible to API consumers. Please refer to the customization section for guidance. &lt;link>;
* **Allowed response_types.** Response types associated with this type of client as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html);
* **Allowed grant_types.** Grant types that this type of client will support as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html);
* **Token endpoint auth methods.** The token endpoint that will be used by this type of client as per [the OIDC spec](https://openid.net/specs/openid-connect-core-1_0-17.html);
* Additionally, there’s an additional field for Okta: **Okta application type** which defines which type of Okta client should be created. Ignored for all other IdPs.

Please note that your IdP might override some of these settings based on its configuration.
An example of configuration is demonstrated below. After configuring a client type, scroll to the top of the page to save it.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-type-of-client.png" alt="Configure a client type" >}}

### Configure API Products and plans for the DCR flow
Once the App registration settings are configured, it is time for the final stride: to configure API Products and plans to work with the DCR flow.

#### Configure API Products for the DCR flow
To configure API Products to work with the DCR flow, you need to:
* Enable the DCR flow for the products you want to work with the DCR flow;
* Associate each product with one or multiple types of clients that were created in the previous step;
* Specify scopes for this API Product. Note the portal uses the scope to policy mapping to enforce access control to API Products, so there should be at least one scope.

For achieving this, navigate to the 'API Products' menu and select the particular API product you want to use for the DCR flow. Next, go to the ‘App registration configs’ section and enable the ‘Enable dynamic client registration’ checkbox.

After that, specify the scope for this API product. You should have at least one scope that was created in the ‘Prerequisites for getting started.' If you need to specify more than one scope, you can separate them with spaces.

Finally, select one or multiple types of clients that were created in the ‘Create client configurations’ section of this guide &lt;link> to associate them with that product.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-api-products-for-the-dcr-flow.png" alt="Configure an API Product to work with the DCR flow" >}}


#### Configure plans for the DCR flow
The last step is to configure the plans you want to use with the DCR flow. To do this, go to the portal's ‘Plans’ menu section and specify the oAuth2.0 scope to use with each plan. You should have at least one scope that was created in the ‘Prerequisites for getting started.’ &lt;link> If you need to specify more than one scope, you can separate them with spaces.
{{< img src="/img/dashboard/portal-management/enterprise-portal/configure-plan-for-the-dcr-flow.png" alt="Configure a plan to work with the DCR flow" >}}