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

* You already have authorised access to Tyk's Dashboard. If you haven't, [get the authorisation key by following this doc]({{< ref "basic-config-and-security/security/dashboard/create-users/#a-name-with-api-a-create-a-dashboard-user-with-the-api" >}}).
* For simplicity, you are running TIB locally on port 3010
* You are able to edit TIB's configuration file.


## Azures's side
1. Access your Azure Portal and navigate to the Azure Active Directory page.
2. Go to app registrations and create or access an application you want to use for Dashboard access.

3. Add a redirect URL to you application as callback to TIB in your Azure application:
   - In your app, either via the Authenitcation menu or the redirect URL shortcut navigate to and add the redirect to TIB in the Web category i.e. `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
   - `{PROFILE-NAME-IN-TIB}` - this can be any string you choose, as long as you use the same one for the profile in TIB.

4. Configure the users and groups for the app in the relevant sections of the Azure menus. See their documentation for more detail: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app


## TIB's Side
6. Set the profile in `profiles.json` as follows:
   - Copy from your Azure AD client the `client ID`     to `ProviderConfig.UseProviders[].key`
   - Create a new client secret for you app and copy from your Azure AD client the `Client secret` to `ProviderConfig.UseProviders[].secret`
   - Add your Azure AD tenants discovery url `"https://login.microsoftonline.com/{azure-tenant-id}/v2.0/.well-known/openid-configuration"` to `ProviderConfig.UseProviders[].DiscoverURL`

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
      "Key": "{Azure-App-Client-ID}",
      "Secret": "{Azure-App-Client-SECRET}",
      "Scopes": ["openid", "email"],
      "DiscoverURL": "https://login.microsoftonline.com/{AZURE-TENANT-ID}/v2.0/.well-known/openid-configuration",
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
   See [Install TIB]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/#tib" >}}) for detailed instructions on how to install TIB
8. Test that it works:
   From the broswer call `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
    - If it's working you'll be redirected to Azures's web page and will be asked to enter your Azure user name and password.
    - If you were successfully authenticated by Azure then you'll be redirected to the Tyk Dashboard and login into it without going through the login page. Job's done!
9. If you need to update your profile then you can use TIB's REST API as follows:

```{.copyWrapper} 
curl http://{TIB-DOMAIN}:{TIB-PORT}/api/profiles/{PROFILE-NAME-IN-TIB} -H "Authorization: {MY-SECRET}" -H "Content-type: application/json" -X PUT --data "@./my-new-dashboard-profile.json" | prettyjson
```

  - POST and DELETE calls apply as normal
  - You can post a few profiles to TIB.
  - See [TIB REST API]({{< ref "tyk-identity-broker/tib-rest-api" >}}) for more details.

## The magic - The flow behind the scenes:
 1. The initial call to the endpoint on TIB was redirected to Azure
 2. Azure AD identified the user
 3. Azure redirected the call back to TIB endpoint (according to the callback you set up on the client earlier in step 3) and from TIB
 4. TIB, via REST API call to the dashboard, created a nonce and a special session attached to it.
 5. TIB redirected the call to the dashboard to a special endpoint `/tap` ( it was defined on the profile under `ReturnURL`) with the nonce that was created.
 6. The Dashboard on the `/tap` endpoint finds the session that is attached to the `nonce`, login the user and redirect to the dashboard first page

![Generate Or Login User Profile flow](img/diagrams/generate-or-login-user-profile.png)

## Enhancements

Once it's working you can also add two more enhancements - SSO login page for the dashboard and automatic user group mapping from your AzureAD security groups or users groups to Tyk Dashboards RBAC groups

### SSO login into the dashboard via a login page
   You will need to:
	- set up a web server with a login page and a form for `user` and `password`
	- Update `tyk_analytics.conf` to redirect logins to that url
    Explicit details are in [steps 6-7]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/#6-create-a-login-page" >}})

### User group mapping
You can specify User Groups within a TIB Profile. This can either be a static or dynamic setting.

```.json
{
  "DefaultUserGroupID": "{DEFAULT-TYK-USER-GROUP-ID}",
  "CustomUserGroupField": "{SCOPE}",
  "UserGroupMapping": {
    "{AZURE-GROUP-ID-ADMIN}": "{TYK-USER-GROUP-ID-ADMIN}",
    "{AZURE-GROUP-ID-READ-ONLY}": "{TYK-USER-GROUP-ID-READ-ONLY}",
  }
}
```
For a static setting, use DefaultUserGroupID
For a dynamic setting based on claims configured in Azure AD, use CustomUserGroupField with UserGroupMapping listing your User Groups and ID.

