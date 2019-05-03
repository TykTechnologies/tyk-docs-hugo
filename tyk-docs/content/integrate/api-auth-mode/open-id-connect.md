---
date: 2017-03-24T16:52:36Z
title: Integrate with OIDC
menu:
  main:
    parent: "API Authentication Mode"
weight: 0
---

Tyk comes with support for OpenID Connect (OIDC) Identity Tokens provided by any standards compliant OIDC provider.

### The OIDC Flow:

1.  User requests access to resource via a supported OIDC Provider (e.g. Google).
2.  User logs into resource provider and grants scope access to their data.
3.  Identity Provider generates OAuth token set and OIDC ID Token. ID Token is signed by provider with their public key.
4.  User's client utilises OIDC ID Token as access token for an API managed by Tyk Gateway.
5.  Tyk Gateway validates OIDC ID Token signature.
6.  Tyk Gateway checks the IDP is a recognised IDP (registered as approved).
7.  Tyk verifies the client ID as one that is trusted and pre-registered with the Tyk Gateway.
8.  If the client ID is valid, Tyk applies the policy ID matched with this client to the user session.
9.  Tyk then validates the users session according to the quotas, rate limits and access rules for the matching policy for **either** the bearer of the token across all clients they use from this IDP **or** validates the session on a per client / per identity basis, e.g. User Alice will have different Access Rules depending on whether they are using a mobile client or a web client.

With this flow, Tyk does not need to be aware of the user or the token in advance, it only needs to know about the approved IDPs, approved ClientIDs within those IDPs and which Policy to apply to those Client IDs.

### Auth0 example flow

![Tyk OpenID Connect with Auth0][1]

#### Behaviour - Internal Tokens

When an OIDC token is processed, Tyk generates an internal representation of the bearer, this ID is a hash of the organisation and user-id provided by the IDP for this user. Tyk uses this internal ID to hang policy rules off of during the lifetime of the users usage of the API.

It is useful for the downstream service to be able to query this data somehow in order to manage access (e.g. to invalidate the token at some point). To make this possible, Tyk adds the internal Token ID to the meta-data of the session object.

It is possible to inject this as a header into the request moving upstream to the underlying service using header injection and invoking the reserved metadata field: `$tyk_meta.TykJWTSessionID`.

### Aliases

In order to make OIDC Access tokens meaningful in analytics data, Tyk will also set an Alias for the internal token so the user can be easily identified in analytics. The OIDC Alias will always be the `ClientID + User ID` provided by the IDP. This can then be queried separately.

### Setting up OIDC

To set up an API Definition to use OIDC, add the following block to the definition, and ensure no other access methods are enabled:

```{.copyWrapper}
"use_openid": true,
"openid_options": {
  "providers": [
    {
      "issuer": "accounts.google.com",
      "client_ids": {
        "MTIzNDU2Nzc4OQ==": "5654566b30c55e3904000003"
      }
    }
  ],
    "segregate_by_client": false
}
```

*   `use_openid`: Set to true to enable the OpenID Connect check.
*   `openid_options.providers`: A list of authorised providers and their client IDs/Matched Policies.
*   `openid_options.providers.client_ids`: The list of client IDs and policy IDs to apply to users thereof. **Note:** Client IDs are Base64 encoded, so the map is `base64(clientid):policy_id` .When a valid user appears from a matching IDP/Client ID, the policy listed in this entry will be applied to their token across OIDC ID Tokens.
*   `openid_options.segregate_by_client`: Enable this to have the policy applied to the combination of the User ID AND the Client ID. For example:
    *   **If disabled**: When Alice uses the mobile app to log into the API, Tyk applies the same rate limit and access rules as if she had logged in via the web app or the desktop client.
    *   **If enabled**: When Alice uses the mobile app to log into the API, Tyk applies different rate limit and access rules than if she had logged in via the web app or the desktop client. In fact, each client and user combination will have its **own** internal representation.


## <a name="example"></a> Worked Example: API with OpenIDC Using Auth0

Prerequisites:

1. You must have a client set up in Auth0. Make sure you know the client ID
2. You must have a user set up in Auth0


###  Step 1: Log in

Point your browser at the Auth0 login URL, it will be something like the below. Make sure you are also including all the details needed for the first part of the OAuth leg:
```
https://{YOUR-ACCT}.auth0.com/authorize?client_id={CLIENT_ID}&scope=openid&response_type=code&redirect_uri=https://{YOUR-ACCT}.auth0.com/login&state=123456789
```

This will take you to the Auth0 login page.

###  Step 2: Log in as your fake user

The system will now redirect you to whatever URL you have set. We suggest a request bin so you can pull out authorization code.

Get the authorization code from the URL that you have been redirected to, it should just be a parameter in the URL.

### Step 3. Exchange the code for your id token

We are using standard OAuth information here, using the Auth0 data API:

```{.copyWrapper}
curl --request POST \
  --url 'https://{ACCT}.auth0.com/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "{CLEINT_ID}","client_secret": "{SECRET}","code": "{CODE}","redirect_uri": "https://tyk.auth0.com/login"}' | python -m json.tool
```

And you get:

```
{
  "access_token": "ee7c1X2gmN5f0VyGsRjuB_RJgKIAAU8u",
  "expires_in": 86400,
  "id_token": "your token",
  "token_type": "Bearer"
}
```

### Step 4: Set up an OIDC API in Tyk

> **NOTE**: Make sure you also create a policy for it.

You need to create the API, then a policy and then edit the APi again to add the Identity Providers (IDPs).

### Step 5. Re-open the api definition and add the appropriate data to allow your ID Token through.

Open your ID token up using `jwt.io` or something similar. You will need both the `iss` claim and the `aud` claim.

The `iss` will look something like `https://tyk.auth0.com/` and the `aud` will be the client ID that you created in step 1 of the pre-requisites.

Put the `iss` value into the IDP section of your authorised clients list in the API Designer, then add the client ID underneath that. Finally, bind it to the policy you created in Step 4.

Save the API.

### Step 6. Access the API:

```{.copyWrapper}
curl -X GET \
  https://yourthang.cloud.tyk.io/openid-1/get \
  -H 'authorization: Bearer your token'
That's it, it should just work - I just did this, and it works fine.
```


### Headers and responses:

If you take the auth header out, or malform it, you will get the following response:

```
{
  "error": "Key not authorised"
}
```

 [1]: /docs/img/diagrams/openid_connect.png
