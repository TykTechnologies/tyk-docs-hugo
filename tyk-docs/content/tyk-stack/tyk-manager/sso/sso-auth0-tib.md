---
title: "Login into the Dashboard using Auth0 - Guide"
date: 2022-10-13
menu:
   main:
      parent: "Single Sign On"
weight: 4
---

## Overview
This will walk you through securing access to your Tyk Dashboard using OpenID Connect (OIDC) identity tokens with Auth0. We also have the following video that will walk you through the process.

{{< youtube sqxXnAwhP-s >}}

## Prerequisites

* A free account with [Auth0](https://auth0.com/)
* A Tyk Self-Managed or Cloud installation

## Create a new user in Auth0

1. Log in to your Auth0 account.
2. Select **Users** from the **User Management** menu.

{{< img src="/img/sso-auth0/auth0-create-user.png" alt="Auth0 Create User" width="800px" height="400" >}}

3. Click Create User and complete the new user form, using the default **Username-Password-Authentication** Connection method.
4. Click Create to save your new user.
{{< img src="/img/sso-auth0/auth0-user-details.png" alt="Auth0 User profile" width="400px" height="400" >}}

## Create an Auth0 application

You will use settings from your Auth0 application within the Tyk Dashboard Identity profile you will create.

1. Select Applications from the Auth0 menu.
{{< img src="/img/sso-auth0/auth0-create-app.png" alt="Auth0 Applications" width="400px" height="300" >}}
2. Click **Create Application**.
3. Give your application a name and select **Regular Web Application** from the applications types.
{{< img src="/img/sso-auth0/auth0-app-type.png" alt="Auth0 Application information" width="400px" height="400" >}}
4. Click **Create**.
5. After you application has been created select the **Basic Information** tab.
{{< img src="/img/sso-auth0/auth0-app-basic-info.png" alt="Auth0 Application Basic information" width="400px" height="400" >}}
6. You will use the **Domain**, **Client Id** and **Client Secret** values in the Identity profile you create next in the Tyk Dashboard.

## Create an Identity Management profile in your Dashboard

1. Log in to your Tyk Dashboard as an Admin user.
2. Select **Identity Management** from the **System Management** menu.
{{< img src="/img/sso-auth0/tyk-create-profile.png" alt="Create Identity profile" width="800px" height="400" >}}
3. Click **Create Profile**.
4. In the **Profile action** section enter a name for your profile and make sure the **Login to Tyk Dashboard** option is selected.
{{< img src="/img/sso-auth0/tyk-new-profile.png" alt="Identity Profile action settings" width="400px" height="400" >}}
5. Click Next. In the **Provider type** section, select **OpenID Connect**.
{{< img src="/img/sso-auth0/tyk-openid.png" alt="Identity profile Provider type" width="400px" height="400" >}}
6. Click Next. Copy the **Client ID** value from your **Auth0 application** > **Basic Information** and paste it in the **Client ID / Key** field.
7. Copy the **Client Secret** value from your **Auth0 application** > **Basic Information** and paste it in the **Secret** field.
8. You need to add a **Discover URL (well known endpoint)**. Use the following URL, replacing `<<your-auth0-domain>>` with the **Domain** value from your **Auth0 application** > **Basic Information**. 

`https://<<your-auth0-domain>>/.well-known/openid-configuration`

{{< img src="/img/sso-auth0/tyk-new-profile-config.png" alt="Tyk new identity profile configuration" width="400px" height="400" >}}

1. Copy the **Callback URL** and paste it into the **Allowed Callback URLs** field in your **Auth0 application** > **Basic Information**.
{{< img src="/img/sso-auth0/auth0-tyk-callback-url.png" alt="Auth0 Allowed Callback URLs" width="400px" height="400" >}}
10. Click **Save Changes** to update your Auth0 Application.
11. Click **Create Profile** to save your Identity profile in your Tyk Dashboard.

## Test your Auth0 Login

1. From your **Identity Management Profiles** click the profile you created to open it.
{{< img src="/img/sso-auth0/tyk-profile-list.png" alt="Tyk Identity Profiles" width="800px" height="400" >}}
2. Click the **Login URL**.
{{< img src="/img/sso-auth0/tyk-id-profile-provider-config.png" alt="Tyk Identity Profile Config" width="800px" height="400" >}}
3. You will now see the Auth0 login form in a browser tab.
{{< img src="/img/sso-auth0/tyk-id-profile-provider-config.png" alt="Auth0 login form" width="400px" height="400" >}}
1. Enter the email address and password of your Auth0 user.
2. You may be asked to authorise your Auth0 application. 
{{< img src="/img/sso-auth0/auth0-accept.png" alt="Accept Auth0 application" width="400px" height="400" >}}
3. Click **Accept**.
4. You will now be taken to the Tyk Dashboard.
{{< img src="/img/sso-auth0/tyk-dash-success.png" alt="Tyk Dashboard from Auth0 SSO login" width="800px" height="400" >}}