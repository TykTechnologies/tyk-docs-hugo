---
date: 2017-03-24T16:40:31Z
title: Single Sign On
menu:
  main:
     parent: "Integration Options"
weight: 0
url: "/integrate/sso"
---


## <a name="intro"></a>Introduction to Single Sign On (SSO)

### SSO - The generic use case
SSO gives users the ability to log in to multiple applications without the need to enter their password more than once.
[OIDC](https://tyk.io/docs/integrate/open-id-connect/) enables an application to verify the identity of users from an organisation without the need to self store and manage them, and without doing the identification process and exposing their passwords to that application. Their lists of users and passwords are kept safe in one single place, in the IdP that the organisation has chosen to use. The Authorisation server of the IdP identify the users for a pre-registered and approved application (`client` in OAuth and OIDC terminology).


### SSO in Tyk
SSO is sometimes complicated to understand or set up but once you get the basics and learn to set up our [TIB - Tyk-Identity-Broker](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) it becomes an easy task.

Using our Tyk-Identity-Broker (TIB), you can do both - use your existing users directory to login to the **Dashboard** or **Developer Portal** and have a SSO. TIB, among other options, supports three methods for login to Tyk's UI:

1. Login with 3rd party social providers
2. Login with any IdP that supports ODIC
3. Login with LDAP (not using OIDC)

#### Tyk Identity Broker (TIB)
TIB is an open-source project which can be used to integrate Tyk authentication with 3rd party identity providers (IDPs). TIB has been designed as a glue-code solution, so it can integrate with almost any identity provider (IDP) including all the known Social providers.
See our [TIB detailed overview](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) for further information.


#### <a name="oidc"></a> SSO with Open ID Connect or Social Providers
SSO is sometimes complicated to understand or set up but once you get it and learn to use our Tyk-Identity-Broker it becomes an easy task.

In short, all you need is as follow:

1. Get TIB from its [repo](https://github.com/TykTechnologies/tyk-identity-broker)
2. Create a profile for your preferred IDP
3. Get the `client_id` + `secret` that are defined on your IDP
4. Set the `callback endpoint of TIB` on your IdP account under the `client_id` you used.
5. Call TIB endpoint to start the login
5. More Docs for the flow can be found on our [GitHub TIB repo README](https://github.com/TykTechnologies/tyk-identity-broker) and our [3rd Party integration docs](https://tyk.io/docs/integrate/3rd-party-identity-providers)


### <a name="identity-providers"></a>SSO with Social Identity Providers
See [using a Social Identity Provider](https://tyk.io/docs/integrate/3rd-party-identity-providers/social-oauth/) for details of using SSO with Social Identity Providers.
Instructions on setting SSO with Google+ will be added soon.

### <a name="openid-connect"></a> SSO with OpenID Connect (OIDC)
- Instruction on setting [SSO with Okta](https://tyk.io/docs/integrate/sso/dashboard-login-okta-tib/)
- Instructions on setting SSO with PingID   - will be added soon
- Instructions on setting SSO with Auth0    - will be added soon
- Instructions on setting SSO with keycloak - will be added soon

## <a name="tyk-dashboard"></a> Tyk's Dashboard Admin REST API for SSO
Our SSO REST API allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [Dashboard Admin API SSO](https://tyk.io/docs/dashboard-admin-api/sso/) for more details.

## <a name="ldap"></a>SSO with LDAP Integration
Detailed instruction on setting [SSO with LDAP](/docs/integrate/3rd-party-identity-providers/ldap/).

See [apply search filters](https://tyk.io/docs/integrate/3rd-party-identity-providers/openldap/#a-name-ldap-search-filters-a-using-advanced-ldap-search) to add advanced search to your LDAP authentication.
