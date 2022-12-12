---
date: 2017-03-24T17:42:45Z
title: Portal OAuth Clients
menu:
  main:
    parent: "Tyk Portal Classic"
weight: 10
url: /tyk-developer-portal/tyk-portal-classic/portal-oauth-clients/
aliases:
  - /docs/tyk-stack/tyk-developer-portal/portal-oauth-clients/
  - /tyk-developer-portal/portal-oauth-clients/
---

From Tyk Dashboard v1.8, you can now create and manage OAuth clients from the Developer Portal.

## Prerequisites

1. An API created in your Dashboard using Tyk's ability to act as a OAuth provider. You need to have [OAuth 2.0](/docs/basic-config-and-security/security/authentication-authorization/oauth-2-0/#option-2---use-the-tyk-oauth-flow) selected as the Authentication mode. See [Create an API](/docs/getting-started/tutorials/create-api/) for more details. 
2. A Policy created in your Dashboard with the API created above selected in the **Access Rights > Add access rule** drop-down. See [Create a Security Policy](/docs/getting-started/tutorials/create-security-policy/) for more details.
3. A Portal Catalogue entry for the API created above with the Policy you created selected from the **Available policies** drop-down. See [Create a Portal Entry](/docs/getting-started/tutorials/create-portal-entry/) for more details.
4. A developer account created in your Developer Portal.

## Create the OAuth Client from the Portal

1. Login to your Portal:
    
![Developer Portal Home Screen](/docs/img/dashboard/portal-management/dev_portal_homev1.8.png)

2. Select **OAuth Clients** from the top menu
3. If this is the first OAuth Client you are creating, the screen will be as below:

![Developer OAuth Home Screen](/docs/img/dashboard/portal-management/portal_first-oauth_client.png)

4. Click **Create first OAuth Client**
5. Hover over the API you added to the Catalogue with OAuth Authentication mode from the drop-down list:

![Select API Screen](/docs/img/dashboard/portal-management/portal_oauth_select_api2.png)

6. Click **Select API**
7. Then click **Save and continue**:

![Save](/docs/img/dashboard/portal-management/portal_oauth_connected_api2.png)

8. You can now add details about your application, and set the redirect URL to the application. If you want to use this client for more than one application, you can add other redirect URLs as necessary.
9. Click **Create**

![Create](/docs/img/dashboard/portal-management/create_portal_oauth_client.png)

10. You need to copy and save the displayed Client Secret, as you will not be able to view it from the Portal again. The secret is stored on the Dashboard and are listed for each developer under the **Portal Management > Developers** menu.

![secret](/docs/img/dashboard/portal-management/oauth_client_secrets.png)


## Revoke OAuth Client Tokens

See [Revoke OAuth Tokens]({{< ref "/content/basic-config-and-security/security/your-apis/oauth20/revoke-oauth-tokens.md" >}}) for more details.
