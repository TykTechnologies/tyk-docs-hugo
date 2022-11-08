---
date: 2017-03-24T16:52:36Z
title: Worked Example - API with OpenIDC Using Auth0
menu:
  main:
    parent: "API Authentication Mode"
weight: 0
---
### Prerequisites

1. You must have a client set up in Auth0. Make sure you know the client ID
2. You must have a user set up in Auth0


###  Step 1: Log in

Point your browser at the Auth0 login URL, it will be something like the below. Make sure you are also including all the details needed for the first part of the OAuth leg:
```
https://{YOUR-ACCT}.auth0.com/authorize?client_id={CLIENT_ID}&scope=openid&response_type=code&redirect_uri=https://{YOUR-ACCT}.auth0.com/login&state=123456789
```

This will take you to the Auth0 login page.

###  Step 2: Log in as your fake user

The system will now redirect you to whatever URL you have set. We suggest a request bin so you can pull out the `authorization` code.

Get the `authorization` code from the URL that you have been redirected to, it should just be a parameter in the URL.

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

### Step 5. Re-open the policy and add the appropriate data to allow your ID Token through.

Open your ID token up using `jwt.io` or something similar. You will need both the `iss` claim and the `aud` claim.

The `iss` will look something like `https://tyk.auth0.com/` and the `aud` will be the client ID that you created in step 1 of the pre-requisites.

Put the `iss` value into the IDP section of your authorised clients list in the API Designer, then add the client ID underneath that. Finally, bind it to the policy you created in Step 4.

Save the API.

### Step 6. Access the API:

```{.copyWrapper}
curl -X GET \
  https://yourthang.cloud.tyk.io/openid-1/get \
  -H 'authorization: Bearer your token'
```
That's it!


### Headers and Responses:

If you take the auth header out, or malform it, you will get the following response:

```
{
  "error": "Key not authorised"
}
```

 [1]: /docs/img/diagrams/openid_connect.png
