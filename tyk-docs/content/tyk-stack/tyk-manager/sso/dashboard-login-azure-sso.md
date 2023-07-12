---
date: 2018-01-24T17:02:11Z
title: Login into the Dashboard using Azure AD - Guide
menu:
   main:
      parent: "Single Sign On"
weight: 1
aliases:
  - /advanced-configuration/integrate/sso/dashboard-login-azure-sso/
---

This is an end-to-end worked example of how you can use [AzureAD](https://azure.microsoft.com/en-gb/services/active-directory/) and our [Tyk Identity Broker (TIB)](https://tyk.io/docs/concepts/tyk-components/identity-broker/
) to log in to your Dashboard.
This guide assumes the following:

You already have authorised access to Tyk's Dashboard. If you haven't, get the authorisation key by following this [guide]({{< ref "basic-config-and-security/security/dashboard/create-users#create-a-dashboard-user-with-the-api">}}).

## Azures's side
1. Access your Azure Portal and navigate to the Azure Active Directory page.
2. Go to app registrations and create or access an application you want to use for Dashboard access.
  - If you are creating an application, give it a name and register it 
3. Add a redirect URL to your application as callback to TIB in your Azure application:
  - In your app, either via the Authentication menu or the redirect URL shortcut navigate to and add the redirect to TIB in the Web category i.e. `http://localhost:3000/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.

    {{< img src="/img/azureAD/redirect-URL-1.png" alt="Redirect URL" >}}
4. Go to Overview and add a secret in Client Credentials. Don't forget to copy the secret value, not the secretID. 

   {{< img src="/img/azureAD/overview-1.png" alt="Overview" >}}

Check Microsoft's [documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) for more detail.

## Dashboard's side 
1. Log in to your dashboard and select Identity Management, located under System Management
2. Create a profile and select OpenID Connect as the provider type
3. Under Profile Configuration, paste the secret value, clientID, and well-known endpoint URL from the Azure site. 
  - Profile Configuation may look something like this:

  {{< img src="/img/azureAD/profile-configuration-1.png" alt="Profile Configuration" >}}

  - The well-known endpoint URL is created by Azure and can be located by selecting Endpoints on their site

  {{< img src="/img/azureAD/endpoints-11.png" alt="Endpoints" >}}

4. Test that it works:
   From the browser call `http://localhost:3000/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
    - If it's working you'll be redirected to Azures's web page and will be asked to enter your Azure user name and password.
    - If you were successfully authenticated by Azure then you'll be redirected to the Tyk Dashboard and login into it without going through the login page. Job's done!

## Enhancements

Once it's working you can also add more enhancements such as automatic user group mapping from your AzureAD security groups or users groups to Tyk Dashboards groups.

### User group mapping
Group mapping can be managed in Advanced Settings by passing an identity provider and selecting a Tyk User Group which can be created in the the User Groups section of
the dashboard. When creating your User Group, one can also select and adjust the permissions for each group.

In the Advanced Settings of the Provider Configuration, you can select the scopes you would like your request to include. By default, Tyk will provide the connectid scope, anything additional must be requested. 

{{< img src="/img/azureAD/additional-options.png" alt="Profile Configuration - Additional Options" >}}

{{< img src="/img/azureAD/raw-editor.png" alt="Profile Configuration - Raw-editor" >}}

For debugging purposes, you can find an example we created using the OpenID Connect playground.
1. Add the redirect url found on the OpenID Connect site to the redirect urls found under the Web section

{{< img src="/img/azureAD/openid_connect/additional_redirect_url.png" alt="Additional URL Added" >}}
2. Copy the OpenID Connect endpoint
3. On the OpenID Connect site select Edit. In the Server Template dropdown menu select the Custom option and paste the endpoint in the Discovery Document URL. 
4. Press the Use Discovery Document button and this will autofill Authorization Token Endpoint, Token Endpoint, and Token Keys Endpoint
5. Copy and paste the Client ID and Client Secret. Scope is autofilled for you and save the configuration.

{{< img src="/img/azureAD/openid_connect/step-1.png" alt="OpenID Connect Step 1" >}}
6. Press start and if done correctly, this should prompt you to sign in to your Azure account.

{{< img src="/img/azureAD/openid_connect/step-2.png" alt="OpenID Connect Step 2" >}}
7. You should then be redirected back to OpenID Connect where you'll be shown the Exchange Code. This needs to be turned into an access token. Press the exchange button under the request and then press Next.

{{< img src="/img/azureAD/openid_connect/step-3.png" alt="OpenID Connect Step 3" >}}
{{< img src="/img/azureAD/openid_connect/step-4.png" alt="OpenID Connect Step 4" >}}
8. We can then verify this by pressing the verify button. We can also view the information or scope of what is being returned by heading to jwt.io and viewing the payload: data there.

{{< img src="/img/azureAD/openid_connect/step-5.png" alt="OpenID Connect Step 5" >}}
9. We are given an object with key, value pairs and we can pass in the key ie. name to our Custom User Group and the value of to our Identity Provider Role in our Tyk dashboard as shown in the example above. 

{{< img src="/img/azureAD/openid_connect/step-6.png" alt="OpenID Connect Step 6" >}}

To try this yourself, we have included the link: https://openidconnect.net/