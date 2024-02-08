---
title: "Login into the Dashboard using Keycloak - Guide"
description: "Setup SSO login into Tyk Dashboard with Keycloak"
date: 2024-02-08
menu:
   main:
      parent: "Single Sign On"
weight: 5
aliases:
  - /advanced-configuration/integrate/sso/dashboard-login-keycloak-sso/
---


This is a walk-through of how you can use [Keycloak](https://www.keycloak.org) and our (internal/embedded) TIB to log in to your Dashboard. This guide assumes you have existing Keycloak and Tyk Pro Environments.

## KeyCloak’s Side
1. In your desired Realm, create a client of OpenID Connect type, and set your desired Client ID.

   {{< img src="/img/keycloak-sso/create-client.png" alt="Create Client" >}}

   {{< img src="/img/keycloak-sso/create-client2.png" alt="Set Client Type and ID" >}}


3. Enable client authentication, then save the client.

   {{< img src="/img/keycloak-sso/enable-client-auth.png" alt="Enable Client Auth" >}}


4. Retrieve the Secret (from the credentials tab) of the Client you just created. You will need the Client ID and Secret in later steps.

   {{< img src="/img/keycloak-sso/retrieve-client-secret.png" alt="Retrieve Client Secret" >}}



## Dashboard’s Side… (and a bit of Keycloak)

1. Log in to your Dashboard and select Identity Management, located under System Management

2. Create a profile, give it a name, and select “Login to Tyk Dashboard”

3. Set the provider type as “OpenID connect”

4. Fill in the Client ID and Secret of the Keycloak Client (from step 3 in Keycloak's Side)

5. Fill in the Discovery URL/endpoint of the Keycloak realm. `https://<your-keycloak-host-and-realm>/.well-known/openid-configuration`

Tip: Retrieve the discovery endpoint of the realm from “Realm Settings” > “General” Tab > OpenID Endpoint Configuration

   {{< img src="/img/keycloak-sso/realm-discovery-endpoint.png" alt="Overview" >}}

6. Copy the callback URL from Tyk and add it to “Valid redirect URIs” in the Keycloak Client

   {{< img src="/img/keycloak-sso/copy-callback-url.png" alt="Copy callback URL" >}}

Clients > The Client > “Settings” Tab

   {{< img src="/img/keycloak-sso/add-redirectUrl-to-client.png" alt="Add Redirect URL to keycloak client" >}}


7. Save changes to the Keycloak Client and Save the Identity Profile in Tyk.


## Test your Keycloak Login
1. From your **Identity Management Profiles** click the profile you created to open it.

2. Copy the **Login URL** and paste it into a browser tab
   {{< img src="/img/keycloak-sso/login-url.png" alt="Copy login url" width="800px" height="400" >}}

3. You will now see the Keycloak login form.
   {{< img src="/img/keycloak-sso/keycloak-login.png" alt="Login to keycloak" width="400px" height="400" >}}

4. Enter the email address and password of your Keycloak user.

5. You should now be redirected to the Tyk Dashboard and logged in
   {{< img src="/img/keycloak-sso/logged-in.png" alt="Tyk Dashboard from Keycloak SSO login" width="800px" height="400" >}}
