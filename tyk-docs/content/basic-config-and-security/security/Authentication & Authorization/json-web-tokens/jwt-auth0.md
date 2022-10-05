---
date: 2021-01-12T19:50:24Z
title: JWT and Auth0 with Tyk
tags: ["JWT", "JSON Web Token", "Security", "Auth0"]
description: "How to secure your APIs with JWT with Auth0"
menu:
  main:
    parent: "JSON Web Tokens"
weight: 2
---

## Overview
This will walk you through securing your APIs with JWTs via Auth0. We also have the following video that will walk you through the process.

{{< youtube jm4V7XzbrZw >}}

## Prerequisites

* A free account with [Auth0](https://auth0.com/)
* A Tyk Self-Managed or Cloud installation

## Create an application in Auth0

1. Log in to your Auth0 account.
2. Select APIs from the Applications menu.

{{< img src="/img/auth0/auth0-create-api.png" alt="Auth0 Create API" width="800" height="400">}}

3. Click **Create API** and enter a name and identifier for your API.

{{< img src="/img/auth0/api-details.png" alt="Auth0 API details" width="400" height="400">}}

4. From the Test tab, follow the instructions on how to get an access token.

{{< img src="/img/auth0/auth0-test-curl.png" alt="Auth0 Test with cURL" width="800" height="400">}}

   - From the cURL tab copy the token request command.

```.curl
curl --request POST \
  --url https://dev-yjd8e8u5.us.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":{CLIENT_ID},"client_secret":{CLIENT_SECRET},"audience":{AUDIENCE},"grant_type":"client_credentials"}'
```

6. Paste the command in a terminal window to generate your token. Save this token locally.

```.curl
{
  "access_token": "xxxxxxxxxxx",
  "token_type": "Bearer"
}
```
7. After creating your API, a new Auth0 Application will be created. Go to the Applications section to view it.

{{< img src="/img/auth0/new-application.png" alt="New Auth0 Application" width="800" height="400">}}

8. Copy the Domain from the Basic Information. You will use this when adding an API to Tyk.

{{< img src="/img/auth0/auth0-basic-info.png" alt="Auth0 Application Basic Information" width="400" height="400">}}

## Create your API in Tyk

1. Log in to your Tyk Dashboard
2. Create a new HTTP API (the default http://httpbin.org upstream URL is fine)

{{< img src="/img/auth0/tyk-create-api.png" alt="Tyk Create HTTP API" width="400" height="400">}}

3. From the Authentication section, select **JSON Web Token (JWT)** as your authentication mode.
4. Select RSA public Key as the JWT signing method.
5. Enter your Auth0 Application Domain from Step 8 above to complete the `jwks_uri` end point `https://<<your-auth0-domain>>/.well-known/jwks.json`
6. Copy your `jwks_uri` in to the **Public Key** field. 

{{< img src="/img/auth0/tyk-api-auth.png" alt="Tyk API Authentication" width="800" height="400">}}

7. Add an **Identity Source** and **Policy Field Name**. The defaults of `sub` and `pol` are fine.
8. Save your API.
9. From the System Management section, select Policies
10. Click Add Policy
11. Select your Auth0 API

{{< img src="/img/auth0/policy-access-rights.png" alt="Tyk Policy access rights" width="800" height="400">}}

12.  You can keep the rest of the access rights at the defaults.
13.  Click the **Configurations** tab and enter a **Policy Name** and a **Keys Expiry after** period.

{{< img src="/img/auth0/policy-configuration.png" alt="Tyk Policy Configuration" width="400" height="400">}}

14. Click **Create Policy**.
15. Edit your JWT Auth0 API and add the policy you created as the **Default Policy** from the Authentication section.

{{< img src="/img/auth0/api-default-policy.png" alt="Tyk API Default Policy Configuration" width="600" height="300">}}

16. From the top of the API copy the API URL
17. From a terminal window using the API URL and the Auth0 generated token.

```.curl
curl -X GET {API URL}  -H "Accept: application/json" -H "Authorization: Bearer {token}"
```
18. If using the [httpbin upstream URL](https://httpbin.org/) as in the example Tyk API, you should see the HTML returned for the httpbin service in your terminal.
19. If there is an error with the request, you will see the following error message.

```.bash
{
  "error": "Key not authorized:Unexpected signing method."
}
```