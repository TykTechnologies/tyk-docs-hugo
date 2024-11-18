---
date: 2018-01-24T17:02:11Z
title: Login into the Dashboard using Okta - Guide
menu:
   main:
      parent: "Single Sign On"
weight: 3
aliases:
  - /integrate/sso/dashboard-login-okta-tib/
  - /advanced-configuration/integrate/sso/dashboard-login-okta-tib/
---


This is an end-to-end worked example of how you can use [Okta](https://www.okta.com/) and our [Tyk Identity Broker (TIB)](https://tyk.io/docs/concepts/tyk-components/identity-broker/
) to log in to your Dashboard.
This guide assumes the following:

* You already have authorized access to Tyk's Dashboard. If you haven't, [get the authorization key by following this doc]({{< ref "basic-config-and-security/security/dashboard/create-users#creating-a-dashboard-user-using-the-dashboard-api" >}}).
* For simplicity, you are running TIB locally on port 3010
* You are able to edit TIB's configuration file.


## Okta's side
1. Create a developer account on the [Okta Developer site](https://developer.okta.com/).
   You'll get a domain such as `https://<okta-org>.okta.com/.well-known/openid-configuration`
2. Login and create a Web Application as follows:
   - Under `Application`, click `Add Application`
   - Choose `Web`
   - Change the name of the app
   - Tick `Authorization Code`
   - Click `Done`

    Note: These instruction are for the new Okta's `Developer Console`, for the `Classic UI` instructions are slightly different.


3. Add a callback to TIB in your application:
   - Under `General`, click `Edit` and update the `Login redirect URIs` field with the endpoint on TIB `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
   - `{PROFILE-NAME-IN-TIB}` - this can be any string you choose, as long as you use the same one for the profile in TIB.

4. Permissions to login via Okta:
   Under the `Assignments` tab, make sure group assignments is set to *everyone* (for now, you will change this later!).

5. This is how it should look like after step #4
{{< img src="/img/okta-sso/Okta-create-app.png" alt="okta-create-app" >}}
## TIB's Side
6. Set the profile in `profiles.json` as follows:
   - Copy from your Okta client the `cliend ID`     to `ProviderConfig.UseProviders[].key`
   - Copy from your Okta client the `Client secret` to `ProviderConfig.UseProviders[].secret`
   - Add Okta's discovery url `"https://<okta-org>.okta.com/.well-known/openid-configuration"` to `ProviderConfig.UseProviders[].DiscoverURL`

   Example of a `profiles.json` file:
```{.json}
[{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "{PROFILE-NAME-IN-TIB}",
  "OrgID": "5a54a74550200d0001975584",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{DASHBOARD-SECRET}"
  },
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB-DOMAIN}:{TIB-PORT}",
    "FailureRedirect": "http://{DASHBOARD-DOMAIN}:{DASHBOARD-PORT}/?fail=true",
    "UseProviders": [
    {
      "Key": "{Okta-App-Client-ID}",
      "Secret": "{Okta-App-Client-SECRET}",
      "Scopes": ["openid", "email"],
      "DiscoverURL": "https://<okta-org>.okta.com/.well-known/openid-configuration",
      "Name": "openid-connect"
    }
  ]
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{DASHBOARD-DOMAIN}:{DASHBOARD-PORT}/tap",
  "Type": "redirect"
}]
```


7. Start TIB by running the binary (`profiles.json` is in the same CWD)
   See [Install TIB]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers#tyk-identity-broker-tib-overview" >}}) for detailed instructions on how to install TIB
8. Test that it works:
   From the broswer call `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
    - If it's working you'll be redirected to Okta's web page and will be asked to enter your Okta user name and password.
    - If you were successfully authenticated by Okta then you'll be redirected to the Tyk Dashboard and login into it without going through the login page. Job's done!
9. If you need to update your profile then you can use TIB's REST API as follows:

```{.copyWrapper} 
curl http://{TIB-DOMAIN}:{TIB-PORT}/api/profiles/{PROFILE-NAME-IN-TIB} -H "Authorization: {MY-SECRET}" -H "Content-type: application/json" -X PUT --data "@./my-new-dashboard-profile.json" | prettyjson
```

  - POST and DELETE calls apply as normal
  - You can post a few profiles to TIB.
  - See [TIB REST API]({{< ref "tyk-identity-broker/tib-rest-api" >}}) for more details.

## The magic - The flow behind the scenes:
 1. The initial call to the endpoint on TIB was redirected to Okta
 2. Okta identified the user
 3. Okta redirected the call back to TIB endpoint (according to the callback you set up on the client earlier in step 3) and from TIB
 4. TIB, via REST API call to the dashboard, created a nonce and a special session attached to it.
 5. TIB redirected the call to the dashboard to a special endpoint `/tap` ( it was defined on the profile under `ReturnURL`) with the nonce that was created.
 6. The Dashboard on the `/tap` endpoint finds the session that is attached to the `nonce`, login the user and redirect to the dashboard first page


## Enhancements

Once it's working you can also add two more enhancements - SSO and MFA

### SSO login into the Dashboard via a login page
   You will need to:
	- set up a web server with a login page and a form for `user` and `password`
	- Update `tyk_analytics.conf` to redirect logins to that url
    Explicit details are in [steps 6-7]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib#6-create-a-login-page" >}})

### Multi-Factor-Authentication (MFA) Support
   MFA works out-of-the-box in Tyk since luckily Okta supports it. you would need to add it to the configuration of the account holder. Under `Security --> Multifactor --> Factor types` you can choose the types you want. For instance I chose Google Authenticator.

   1. While trying to login to the Dashboard, Okta enforced the MFA and asked me to use the Google Authenticator:
   {{< img src="/img/okta-sso/okta-mfa-setup-1.png" alt="okta-mfa-setup-1" >}}

   2. I had to download the Google Authenticator and identify with the generated code
   {{< img src="/img/okta-sso/okta-mfa-download-google-authenticator-2.png" alt="okta-mfa-download-google-authenticator-2" >}}
   3. I successfully authenticated with Google Authenticator
   {{< img src="/img/okta-sso/okta-mfa-google-auth-approved-3.png" alt="okta-mfa-google-auth-approved-3" >}}

## Common Error
If you get a `400 Bad Request` it means the profile name in the login endpoint is not identical to the profile name in the callback that you set up on Okta's app:

- On Okta's app - `Login redirect URIs:` `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
- The endpoint to test - `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`

{{< img src="/img/okta-sso/okta-bad-request-wrong-callback.png" alt="okta-bad-request-wrong-callback" >}}
