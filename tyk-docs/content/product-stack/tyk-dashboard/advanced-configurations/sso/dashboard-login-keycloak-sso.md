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


This is a walk-through of how you can use [Keycloak](https://www.keycloak.org) and our (internal/embedded) Tyk Identity Broker (TIB) to log in to your Dashboard. This guide assumes you have existing Keycloak and Tyk Pro Environments.

## KeyCloak’s Side
1. In your desired Realm, create a client of OpenID Connect type, and set your desired Client ID.

   {{< img src="/img/keycloak-sso/create-client.png" alt="Create Client" width="900px" height="900">}}

   {{< img src="/img/keycloak-sso/create-client2.png" alt="Set Client Type and ID" width="900px" height="900">}}


2. Enable client authentication, then save the client.

   {{< img src="/img/keycloak-sso/enable-client-auth.png" alt="Enable Client Auth" width="900px" height="900">}}


3. Retrieve the Secret (from the credentials tab) of the Client you just created. You will need the Client ID and Secret in later steps.

   {{< img src="/img/keycloak-sso/retrieve-client-secret.png" alt="Retrieve Client Secret" width="900px" height="900">}}


4. Retrieve the discovery endpoint of the realm, `https://<your-keycloak-host-and-realm>/.well-known/openid-configuration`. 

   This is accessible from “Realm Settings” > “General” Tab > OpenID Endpoint Configuration. You will need it in later steps.

   {{< img src="/img/keycloak-sso/realm-discovery-endpoint.png" alt="Keycloak discovery endpoint" width="900px" height="600">}}


## Dashboard’s Side… (and a bit of Keycloak)

1. Log in to your Dashboard and select Identity Management, located under System Management

   {{< img src="/img/keycloak-sso/identity-management.png" alt="Select Identity Management" width="800px" height="400">}}


2. Create a profile, give it a name and select “Login to Tyk Dashboard”

   {{< img src="/img/keycloak-sso/create-profile.png" alt="Create a profile" width="800px" height="400">}}


3. Set the provider type as “OpenID Connect”

   {{< img src="/img/keycloak-sso/set-provider-type.png" alt="OpenID Connect provider type" width="800px" height="400">}}


4. Fill in the Client ID, Client Secret and Discovery URL/endpoint from Keycloak (from steps 3 and 4 in Keycloak's Side)

5. Copy the callback URL from Tyk and then you can click "Create Profile" to save the profile.

   {{< img src="/img/keycloak-sso/copy-callback-url.png" alt="Copy callback URL" width="800px" height="400">}}


6. Go to Keycloak, and paste the callback URL you just copied to “Valid redirect URIs” in the Keycloak Client, and then save the client.

   This can be accessed by selecting the "Settings" tab when viewing a Keycloak client.

   {{< img src="/img/keycloak-sso/add-redirectUrl-to-client.png" alt="Add Redirect URL to keycloak client" width="800px" height="400">}}



## Test your Keycloak Login
1. From your **Identity Management Profiles** click the profile you created to open it.

2. Copy the **Login URL** and paste it into a browser tab
   {{< img src="/img/keycloak-sso/login-url.png" alt="Copy login url" width="800px" height="400" >}}

3. You will now see the Keycloak login form.
   {{< img src="/img/keycloak-sso/keycloak-login.png" alt="Login to keycloak" width="400px" height="400" >}}

4. Enter the email address and password of your Keycloak user.

5. You should now be redirected to the Tyk Dashboard and logged in
   {{< img src="/img/keycloak-sso/logged-in.png" alt="Tyk Dashboard from Keycloak SSO login" width="800px" height="400" >}}
