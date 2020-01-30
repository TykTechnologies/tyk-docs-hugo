---
date: 2017-03-24T16:40:31Z
title: Single Sign On
menu:
  main:
     parent: "Integration Options"
weight: 0
url: "/advanced-configuration/integrate/sso"
---


## <a name="intro"></a>Introduction to Single Sign On (SSO)

### SSO - The generic use case
SSO gives users the ability to log in to multiple applications without the need to enter their password more than once.
[OIDC](/docs/advanced-configuration/integrate/api-auth-mode/open-id-connect/) enables an application to verify the identity of users from an organisation without the need to self store and manage them, and without doing the identification process and exposing their passwords to that application. Their lists of users and passwords are kept safe in one single place, in the IdP that the organisation has chosen to use. The Authorisation server of the IdP identify the users for a pre-registered and approved application (`client` in OAuth and OIDC terminology).


### SSO in Tyk
SSO is sometimes complicated to understand or set up but once you get the basics and learn to set up our [TIB - Tyk-Identity-Broker](/docs/advanced-configuration/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) it becomes an easy task.

Using our Tyk-Identity-Broker (TIB), you can do both - use your existing users directory to login to the **Dashboard** or **Developer Portal** and have a SSO. TIB, among other options, supports three methods for login to Tyk's UI:

1. Login with 3rd party social providers
2. Login with any IdP that supports ODIC
3. Login with LDAP (not using OIDC)

#### Tyk Identity Broker (TIB)
TIB is an open-source project which can be used to integrate Tyk authentication with 3rd party identity providers (IDPs). TIB has been designed as a glue-code solution, so it can integrate with almost any identity provider (IDP) including all the known Social providers.
See our [TIB detailed overview](/docs/advanced-configuration/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) for further information.


#### <a name="oidc"></a> SSO with Open ID Connect or Social Providers
SSO is sometimes complicated to understand or set up but once you get it and learn to use our Tyk-Identity-Broker it becomes an easy task.

In short, all you need is as follow:

1. Get TIB from its [repo](https://github.com/TykTechnologies/tyk-identity-broker)
2. Create a profile for your preferred IDP
3. Get the `client_id` + `secret` that are defined on your IDP
4. Set the `callback endpoint of TIB` on your IdP account under the `client_id` you used.
5. Call TIB endpoint to start the login
5. More Docs for the flow can be found on our [GitHub TIB repo README](https://github.com/TykTechnologies/tyk-identity-broker) and our [3rd Party integration docs](/docs/advanced-configuration/integrate/3rd-party-identity-providers/)


### <a name="identity-providers"></a>SSO with Social Identity Providers
See [using a Social Identity Provider](/docs/advanced-configuration/integrate/3rd-party-identity-providers/social/) for details of using SSO with Social Identity Providers.
Instructions on setting SSO with Google+ will be added soon.

### <a name="openid-connect"></a> SSO with OpenID Connect (OIDC)
- Instruction on setting [SSO with Okta](/docs/advanced-configuration/integrate/sso/dashboard-login-okta-tib/)
- Instructions on setting SSO with PingID   - will be added soon
- Instructions on setting SSO with Auth0    - will be added soon
- Instructions on setting SSO with keycloak - will be added soon

## <a name="tyk-dashboard"></a> Tyk's REST API for SSO

The SSO API allows you to implement custom authentication schemes for the Dashboard and Portal. You can access the API by both admin and dashboard APIs.
Our Tyk Identity Broker (TIB) internally also uses these APIs.

### Generate authentication token

The Dashboard exposes two APIs:

- `/admin/sso` - See [Dashboard Admin API SSO](/docs/dashboard-admin-api/sso/) for more details.
- `/api/sso` -  See [Dashboard API SSO](/docs/tyk-dashboard-api/sso/) for more details.

which allow you to generate a temporary authentication token, valid for 60 seconds. They make same thing you can select one of them and use it.
However, the admin API requires `admin-auth` header which should be same with `admin-secret` parameter in `tyk_analytics.conf`, the regular API requires `authorization` header which should be same with the user authentication token.  

### Using the Token

Once you have issued a token you can login to the dashboard using the `/tap` url, or to the portal using the `<portal-url>/sso` URL, and provide an authentication token via the `nonce` query param.
If `nonce` is valid, Tyk will create a temporary user and log them in. 

If you want to re-use existing dashboard users, instead of creating temporary ones, you can set `"sso_enable_user_lookup": true` variable in the Dashboard config file (`tyk_analytics.conf`). This way you can set individual permissions for users logged via SSO.

#### Set up default permissions for the dashboard
If you use the token with `dashboard` scope, and would like to avoid login in as admin user (which is the default permissions), you can add the `sso_permission_defaults` configuration option to the Dashboard config file (`tyk_analytics.conf`) to specify SSO user permissions in the following format:

```
"sso_permission_defaults": {
  "analytics": "read",
  "apis": "write",
  "hooks": "write",
  "idm": "write",
  "keys": "write",
  "policy": "write",
  "portal": "write",
  "system": "write",
  "users": "write",
  "user_groups": "write"
}
```

As alternative, you can set `sso_default_group_id` to specify User Group ID assigned to SSO users.

In order to set individual user permissions, you should first create this users in the dashboard first, set needed permissions, enable `sso_enable_user_lookup` to `true` inside dashboard config. If SSO user with the same email will be found in Dashboard users, it will re-use his permissions. 

#### Sample Login Request

```{.copyWrapper}
GET /tap?nonce=YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw HTTP/1.1
Host: localhost:3000    
```


## <a name="ldap"></a>SSO with LDAP Integration
Detailed instruction on setting [SSO with LDAP](/docs/advanced-configuration/integrate/sso/dashboard-login-ldap-tib/).

See [apply search filters](/docs/advanced-configuration/integrate/3rd-party-identity-providers/ldap/#a-name-ldap-search-a-using-advanced-ldap-search) to add advanced search to your LDAP authentication.
