---
title: "Tyk Identiy Broker - Integrate Social Logins, IDPs, LDAP and Custom Authentication"
date: 2025-01-10
tags: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
description: ""
keywords: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
aliases:
  - /integrate/3rd-party-identity-providers
  - /getting-started/tyk-components/identity-broker
  - /getting-started/tutorials/auth-user-for-api-access-github-oauth
  - /advanced-configuration/integrate/sso/dashboard-login-ldap-tib
  - /integrate/3rd-party-identity-providers/dashboard-login-ldap-tib
  - /integrate/3rd-party-identity-providers/openldap
  - /integrate/3rd-party-identity-providers/social/dashboard-login-with-gplus
  - /integrate/3rd-party-identity-providers
  - /advanced-configuration/integrate/sso/dashboard-login-azure-sso
  - /integrate/sso/dashboard-login-okta-tib
  - /advanced-configuration/integrate/sso/dashboard-login-okta-tib
  - /advanced-configuration/integrate/sso/dashboard-login-keycloak-sso
  - /concepts/tyk-components/identity-broker/rel=
  - /getting-started/tyk-components/identity-broke
  - /getting-started/key-concepts/tyk-components/identity-broker
  - /concepts/tyk-components/identity-broker
  - /getting-started/tyk-components/tyk-identity-broker/getting-started
  - /getting-started/tyk-components/tyk-identity-broker/profiles
  - /advanced-configuration/integrate/sso/dashboard-login-azure-sso
  - /security/security-policies/secure-apis-method-path
  - /advanced-configuration/integrate/3rd-party-identity-providers
  - /advanced-configuration/integrate/3rd-party-identity-providers/custom
  - /advanced-configuration/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib
  - /advanced-configuration/integrate/3rd-party-identity-providers/ldap
  - /advanced-configuration/integrate/3rd-party-identity-providers/social
  - /advanced-configuration/integrate/3rd-party-identity-providers/social/app-login-with-gplus
  - /advanced-configuration/integrate/3rd-party-identity-providers/social/dashboard-login-with-gplus
  - /advanced-configuration/integrate/sso
  - /product-stack/tyk-dashboard/advanced-configurations/sso/dashboard-login-keycloak-sso
  - /tyk-identity-broker
  - /tyk-identity-broker/getting-started
  - /tyk-stack/tyk-identity-broker/about-profiles
  - /tyk-stack/tyk-identity-broker/auth-user-for-api-access-github-oauth
  - /tyk-stack/tyk-manager/sso/dashboard-login-azure-sso
  - /tyk-stack/tyk-manager/sso/dashboard-login-okta-tib
  - /tyk-stack/tyk-manager/sso/sso-auth0-tib
---

## Introduction

Tyk Identity Broker (TIB) is a solution for integrating various **Identity Management Systems (such as LDAP, Social OAuth, Okta)** with your Tyk installation.

With TIB, you gain the flexibility to connect your existing user directories to Tyk Dashboard or Developer Portal, streamlining access management and enhancing security. Whether you're looking to implement SSO, leverage social logins, or integrate with enterprise identity providers, TIB provides the tools and configurations to make it happen.

This page introduces general features of Tyk Identity Broker (TIB) and how to configure them. If you are looking for global configurations of the TIB deployment refer this [config file]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}).

We will delve into the following key topics:

1. **[Introduction to Tyk Identity Broker]({{< ref "#what-is-tyk-identity-broker-tib" >}})**: Explore key concepts, configuration options, and implementation steps for TIB. You'll learn how to set up profiles for different identity providers, understand the flow of authentication requests, and customize the integration to fit your specific needs.

2. **[Single Sign On with Tyk]({{< ref "#single-sign-on-sso" >}})**: We will learn how to implement seamless SSO experiences for Tyk Dashboard and Developer Portal.

3. **[SSO with different Protocols and Systems]({{< ref "#sso-in-tyk" >}})**: We will explore SSO integrations with LDAP, Social OAuth, SAML, and OpenID Connect.

4. **[Handling Custom Authentication]({{< ref "#custom-proxy-identify-provider" >}})**: We will learn how to configure TIB for unique authentication scenarios using the Proxy Provider.

## What is Tyk Identity Broker (TIB)?

Tyk Identity Broker (TIB) is a component providing a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub) or Basic Authentication providers, to your Tyk installation.

TIB can act as a bridge between the API Gateway, Tyk Portal or even the Tyk Dashboard, and makes it easy to integrate custom IDMs to your system.

Starting from Tyk v3.0 TIB has been added as a built-in feature of the Tyk Dashboard. You no longer have to setup a separated instance of the service to make it work with the Dashboard. You now have two options: 
1. Internal TIB: Embedded in dashboard. Easy configuration and set up. Share the same port as the dashboard
2. External TIB: Installation of TIB as a different component for advanced use cases. Requires changes to the config files and separate port.  


**What can you do with the Tyk Identity Broker (TIB)?**

By using the identity broker in conjunction with an IDP you have the ability to perform actions such as:

- Enabling easy access via social logins to the developer portal (e.g. GitHub login)
- Enabling internal access to the dashboard (e.g. via LDAP/ActiveDirectory)
- Enabling easy token generation from a third party for things such as mobile apps and webapps without complex configuration

## Working of Tyk Identity Broker (TIB)

TIB provides a simple API through which traffic can be sent. The API will match the request to a profile which then exposes two things:

1. An **Identity Provider** that will authorize a user and validate their identity
2. An **Identity Handler** that will authenticate a user with a delegated service (in this case, Tyk)

### Identity Providers

Identity providers can be anything, as long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have four provider types:

1. **Social** - this provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2. **LDAP** - a simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
3. **Proxy** - a generic proxy handler that will forward a request to a third party and provides multiple "validators" to identify whether a response is successful or not (e.g. status code, content match and regex)
4. **SAML** - provides a way to authenticate against a SAML IDP.

### Identity Handlers

An identity handler will perform a predefined set of actions once a provider has validated an identity. These actions are defined as a set of action types:

1. `GenerateOrLoginUserProfile` - this will log a user into the Tyk Dashboard (this does not create a user, it only creates a temporary session for the user to have access). This flow is defined as next:

{{< img src="/img/diagrams/generate-or-login-user-profile.png" alt="Generate Or Login User Profile flow" >}}

2. `GenerateOrLoginDeveloperProfile` - this will create or login a user to the Tyk Developer Portal. The flow is similar to _GenerateOrLoginUserProfile_ but in this case if the developer doesn't exist then it will be created.

3. `GenerateOAuthTokenForClient` - this will act as a client ID delegate and grant an Tyk provided OAuth token for a user using a fragment in the redirect URL (standard flow). The flow is defined as:

{{< img src="/img/diagrams/generate-oauth-token-for-client.png" alt="Generate Oauth token for client" >}}

### Exploring TIB Profiles

TIB takes as input one or many profiles that are stored in mongo or a file (it depends on the type of installation), a profile is a configuration that outlines of how to match a identity provider with a handler and what action to perform (Example: enable Dashboard SSO using OpenID and Microsoft Azure as IDP). The Dashboard adds a user interface to manage the profiles.

{{< img src="https://user-images.githubusercontent.com/4504205/105425983-58940c00-5c18-11eb-9c8c-ede3b8bae000.gif" alt="Identity Broker User Interface" >}}

### Anatomy of a Profile
Each profile is outlined by a series of attributes that will describe: action to perform, IDP to connect, URL's to redirect on success and failure, etc.
In order to know and understand each of the attributes, implications as well as configure your own profile please consult the profile structure below:

#### Fields that are common for all the providers

| Field                                     | Description                                                                                                                                                                                                                                   | Required |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| ID                                        | ID of the profile, is a string, use the name of the profile  
| OrgID                                     | Organization ID                                                                                                                                                                                                                               | Yes      |
| ActionType                                | Which action is expected to be executed while using this profile, valid values are:<ul><li>`GenerateOrLoginDeveloperProfile`: SSO portal</li><li>`GenerateOrLoginUserProfile`: SSO dashboard</li><li>`GenerateOAuthTokenForClient`: generate OAuth tokens</li></ul> | Yes      |
| Type                                      | Valid values are:<ul><li>`passthrough`: for LDAP and ProxyProvider</li><li>`redirect`: for SAML and Social</li></ul>                                                                                                                                             | Yes      |
| CustomEmailField                          | Name of the claim associated with the email value stored in the IDP (Identity Provider).                                                                                                                                                      | No       |
| CustomUserIDField                         | Name of the claim associated with the User ID value stored in the IDP (Identity Provider).                                                                                                                                                    | No       |
| IdentityHandlerConfig.DashboardCredential | API Key that will be used to consume the dashboard API to issue nonce codes and validate user data                                                                                                                                            | yes      |
| ReturnURL                                 | Where to redirect and send the claims from the IDP on login. For dashboard SSO it would be `http://dashboard-host/tap`. For classic portal SSO it would be `http://{portal-host}/sso`                                                     | yes      |
| DefaultUserGroup                          | When mapping groups, if not found the group then to which one fallback                                                                                                                                                                        | No       |
| CustomUserGroupField                      | When mapping groups, if a group is not found, specify which group to fallback to.                                                                                                                                                             | No       |
| UserGroupMapping                          | Map that contains the matching between Tyk groups and IDP group.                                                                                                                                                                              | No       |
| UserGroupSeparator                        | The IDP might send the groups to which the user belongs to as a single string separated by any symbol or empty spaces, with this field you can set which symbol to use to split as an array                                                   | No       |
| SSOOnlyForRegisteredUsers                 | A boolean value to restrict the SSO only to users that already exists in the database. Users that do not exist in the database and successfully logins in the IDP will not have access to tyk                                                 | No       |


#### LDAP profile fields

| Field                  | Description                                                                                                                     | Required                      |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| LDAPUseSSL             | Whether to connect with the LDAP server via TLS, e.g. *true* or *false*                                                                                 | No                            |
| LDAPServer             | LDAP Server  address, e.g. *ldap://hostname*.                                                                                                              | Yes                           |
| LDAPPort               | LDAP  Port, e.g. *389* or *636*.                                                                                                                  | Yes                           |
| LDAPUserDN             | Required to uniquely identify and locate a user's entry in the LDAP directory                                                   | Yes                           |
| LDAPBaseDN             | Distinguished Name from where the search will start                                                                              | No                            |
| LDAPFilter             | Used for filtering in the LDAP server                                                                                           | No                            |
| LDAPEmailAttribute     | The name of the field in the LDAP schema that represents the user's email. Defaults to *mail*.                                                                                                       | No                            |
| LDAPFirstNameAttribute | The name of the field in the LDAP schema that represents the user's first name. Defaults to *givenName*                                                                                                      | No                            |
| LDAPLastNameAttribute  | The name of the field in the LDAP schema that represents the user's last name. Defaults to *sn*.                                                                                    | No                            |
| LDAPAdminUser          | Admin user name                                                                                                                 | No                            |
| LDAPAdminPassword      | Admin password                                                                                                                  | No                            |
| LDAPAttributes         | List of attributes to return when a matching LDAP record is found, for example ['cn', 'mail', 'ou']                                                       | Yes. It can be an empty list |
| LDAPSearchScope        | The scope is an integer value that determines the depth of the search in the directory hierarchy                            | No                            |
| FailureRedirect        | In the event of a login failure this is the URL that the user will be redirected to.                                                                                 | Yes                           |
| DefaultDomain          | Domain in which the LDAP is running. Used to build the username but not to perform the requests.                                | No                            |
| GetAuthFromBAHeader    | A boolean value that, when set to *true*, instructs TIB to gather the user and password from the Authorization header when handling the request. | No                            |
| SlugifyUserName        | When set to *true* enhance the username so that is URL friendly.                                                       | No                            |

#### ProxyProvider profile fields

| Field                              | Description                                                                                                                                                                                                                                                                                                                           | Required                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| TargetHost                         | URL of the server                                                                                                                                                                                                                                                                                                                     | Yes                                          |
| OKCode                             | This is an integer represents the HTTP status code that represents a successful response from the target service. If the response code matches this value the identity broker treats it as a successful interaction.                                                                                                                                                      | No. But one of OKCode, OKResponse, or OKRegex should be filled |
| OKResponse                         | This field specifies a particular string that should match with the response body to be considered successful.                                                                                                                                                                                                                       | No. But one of OKCode, OKResponse, or OKRegex should be filled |
| OKRegex                            | Is used to validate the content of the response beyond just the HTTP status code. If the response body contains data that matches this regular expression, it is considered a successful response.                                                                                                                                    | No. But one of OKCode, OKResponse, or OKRegex should be filled |
| ResponseIsJson                     | This parameter helps the identity broker understand how to interpret the response body from the target service. If ResponseIsJson is set to true, the broker will expect the response to be in JSON format and will process it accordingly. This includes parsing JSON data to extract relevant information. This is a boolean field. | No                                           |
| AccessTokenField                   | The name of the field that contains the access token.                                                                                                                                                                                                                                                                                                   | No                                           |
| UsernameField                      | The name of the field that contains the username.                                                                                                                                                                                                                                                                                         | No                                           |
| ExrtactUserNameFromBasicAuthHeader | A boolean value that, when set to true, instructs TIB to gather the user and password from the Authorization header when handling the request.                                                                                                                                                                                                       | No                                           |
#### Social profile fields

| Field                            | Description                                                                                                                                                                                                                                       | Required                                                         |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| CallbackBaseURL                  | URL to be redirected on success login                                                                                                                                                                                                             | Yes                                                              |
| FailureRedirect                  | URL to be redirected on failure                                                                                                                                                                                                                   | Yes                                                              |
| UseProviders.Name                | Name of the provider to be used. Valid values: `gplus`, `github`, `twitter`, `linkedin`, `dropbox`, `digitalocean`, `bitbucket`, `salesforce`, `openid-connect`                                                                                   | Yes                                                              |
| UseProviders.Key                 | Oauth Client key                                                                                                                                                                                                                                  | yes                                                              |
| UseProviders.Secret              | Oauth Client Secret                                                                                                                                                                                                                               | yes                                                              |
| UseProviders.DiscoverURL         | used to dynamically retrieve the OpenID Provider's configuration metadata, including endpoints and supported features, in JSON format from /.well-known/openid-configuration.                                                                     | Only required when using openid-connect                          |
| UseProviders.Scopes              | Specifies the level of access or permissions a client is requesting from the user and the authorization server, for example ["openid","email"].                                                                                                   | No, however when using openID the scope ‘openid’ should be added |
| UseProviders.SkipUserInfoRequest | Determines whether to bypass the *UserInfo* endpoint request, improving performance by relying on the ID token alone for user details.                                                                                                            | No                                                               |
| JWE.Enabled                      | When set to true, JWE will be enabled, allowing Tyk to decrypt the ID token received from the IdP. If set to false, the ID token will not be decrypted.                                                                                           | No                                                               |
| JWE.PrivateKeyLocation           | Specifies the path or identifier (certid) for the certificate that contains the private key used to decrypt the ID token when JWE is enabled. This certificate must be in PEM format and include both the public certificate and the private key. | Is only required if JWE is enabled                               |

#### SAML profile fields

| Field                            | Description                                                                                                                                                                   | Required                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| IDPMetadataURL      | This is a URL, e.g. `https://login.microsoftonline.com/your-tenant-id/federationmetadata/2007-06/federationmetadata.xml`, that links to [XML metadata](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf) containing information necessary for interaction with SAML-enabled identity or service providers. The document contains example URLs of endpoints, information about supported bindings, identifiers and public keys. Once you create your TIB profile you can find the SP metadata file under *{Dashboard HOST}/auth/{TIB Profile Name}/saml/metadata* | Yes |
| CertLocation        | An X.509 certificate and the private key for signing your requests to the IDP. The value for `CertLocation` should be the path to a single file with the cert and key concatenated, e.g. `/etc/ssl/certs/example_cert.pem`. When used in an [embedded TIB instance in the dashboard]({{<ref "#installing-tyk-identity-broker-tib">}}) then the `CertLocation` value can be the *certId* from the certificate manager. For further details please refer to [SSO with SAML]({{< ref "#sso-with-saml" >}})                                                                                                           | Yes |
| SAMLBaseURL         | The host of TIB, e.g. `http://tyk-dashboard:3000/`, that will be used in the metadata document for the Service Provider. This will form part of the metadata URL used as the Entity ID by the IDP. The redirects configured in the IDP must match the expected Host and URI configured in the metadata document made available by Tyk Identity Broker.                                                                 | Yes |
| ForceAuthentication | Ignore any session held by the IDP and force re-login every request. Defaults to false                                                                                                                                                                                                                                                                                             | No  |
| SAMLBinding         | Key for looking up the email claim in the SAML assertion form the IDP. Defaults to: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress                                                                                                                                                                                                                             | No  |
| SAMLEmailClaim      | Key for looking up the email claim in the SAML assertion form the IDP. Defaults to: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress                                                                                                                                                                                                                             | No  |
| SAMLForenameClaim   | Key for looking up the forename claim in the SAML assertion form the IDP. Defaults to: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/forename                                                                                                                                                                                                                              | No  |
| SAMLSurnameClaim    | Key for looking up the surname claim in the SAML assertion form the IDP. Defaults to: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname                                                                                                                                                                                                                                | No  |
| FailureRedirect     | URL to redirect the user if the login is not successful                                                                                                                                                                                                                                                                                                                            | Yes |
| EntityId            | It is used to distinguish between different entities (IDP & SP) and ensure proper routing and validation of SAML assertions and requests. Defaults to the value set in the field `IDPMetadataURL`                                                                                                                                                                                                                  | No  |

## Installing Tyk Identity Broker (TIB)

There are two ways to install TIB:

1. **Embedded TIB**: Starting from Tyk Dashboard v3.0 TIB is built-in to the dashboard, in this case TIB will store the profiles in the same mongo database configured for dashboard

2. **Standalone TIB**: Deployed as a seperate entity. In the standalone TIB, the profiles will be stored in file indicated when the app is started

**Pre-requisites**

Below are the prerequisites of TIB:

- Tyk Gateway v1.9.1+
- Redis
- Tyk Dashboard v0.9.7.1+ (Only if you want to do SSO to Tyk Dashboard UI or Tyk Developer Portal)

### Enable Embedded TIB 

For the embedded TIB you don't have to do anything, only ensure that in the Dashboard's config file `identity_broker` is not pointing to an external service, and `identity_broker.enabled` is set to `true`. For example:

```json
"identity_broker": {
    "enabled": true,
},
```

This settings behaves as follows:

* If `enabled` = `false` then neither the external or internal TIB will be loaded
* If `enabled` = `true` and the tib host is not present the internal TIB will be loaded
* If `enabled` = `true` and the tib host is set, then external TIB will be loaded

### Install Standalone TIB

Below are the three deployment options to install TIB as a standalone application:

1. **Docker:**

    You can install via [Docker](https://hub.docker.com/r/tykio/tyk-identity-broker/).

2. **Linux Packages:**

    You can install via [packages](https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb) (deb or rpm).

3. **Helm Chart for Kubernetes:**

    [Tyk Helm Chart]({{<ref "product-stack/tyk-charts/overview">}}) does not support installing TIB as separate application. If you want to enable embedded TIB in Dashboard, you can do so by updating `tib.enabled` to `true` in `tyk-dashboard` chart. If you are using an umbrella chart from us (e.g. `tyk-stack` and `tyk-control-plane`), you can do so by updating `tyk-dashboard.tib.enabled` to `true`.

### Important TIB Configurations

#### Configure secret for hashing session cookies

To secure session cookies within Tyk Identity Broker (TIB) when integrating with social providers, setting the `TYK_IB_SESSION_SECRET` environment variable is crucial. This variable plays a pivotal role in hashing session cookies, thereby enhancing security. By default, if this variable isn't explicitly set, TIB falls back to using the Tyk Dashboard's admin_secret when it's embedded in the dashboard.

For a seamless and secure setup, start by generating a strong, unique secret string. It is recommended to use a string with 32 or 64 bytes to ensure optimal security, this string will be your session secret. In a Linux, Unix, or MacOS environment, you can set this variable by running the command `export TYK_IB_SESSION_SECRET='your_secret'`.

#### Setting Absolute Paths

No command line arguments are needed, but if you are running TIB from another directory or during startup, you will need to set the absolute paths to the profile and config files:

```bash
Usage of ./tyk-auth-proxy:
  -c=string
        Path to the config file (default "tib.conf")
  -p#=string
        Path to the profiles file (default "profiles.json")
```

See [how to configure TIB](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib) 


## Exploring Tyk Identity Broker REST API

Refer to this [document]({{< ref "tyk-identity-broker/tib-rest-api" >}})

## Single Sign On (SSO)

SSO gives users the ability to log in to multiple applications without the need to enter their password more than once.
Authentication protocols such as OpenID Connect and SAML enable an application to verify the identity of users from an organization without the need to self store and manage them, and without doing the identification process and exposing their passwords to that application. Their lists of users and passwords are kept safe in one single place, in the IDP that the organization has chosen to use. The Authorization server of the IdP identify the users for a pre-registered and approved application (`client` in OAuth and OIDC terminology).

### SSO in Tyk

SSO is sometimes complicated to understand or set up but can be easily accomplished by using the built-in [Tyk Identity Broker (TIB)]({{< ref "#what-is-tyk-identity-broker-tib" >}}).

Using our Tyk-Identity-Broker (TIB), you can do both - use your existing users directory to login to the **Dashboard** or **Developer Portal** and have an SSO. TIB, among other options, supports four methods for login to Tyk's UI:

1. [Login with 3rd party social providers]({{< ref "#sso-with-social-identity-providers" >}})
2. [Login with any IdP that supports OIDC]({{< ref "#sso-with-openid-connect-oidc" >}})
3. [Login with any IdP that supports SAML]({{< ref "#sso-with-saml" >}})
3. [Login with LDAP]({{< ref "#sso-with-ldap" >}})

#### SSO with Open ID Connect or Social Providers

SSO is sometimes complicated to understand or set up but once you get it and learn to use our Tyk-Identity-Broker it becomes an easy task.

In short, all you need is as follow:

1. Access the Identity Manager under System Management in the Tyk Dashboard
2. Create a profile for your preferred IDP
3. Get the `client_id` + `secret` that are defined on your IDP
4. Set the `Callback URL` generated by Tyk on your IDP
5. Provide your SSO profile in Tyk with the `Discover URL (well known endpoint)`
6. Visit the Login URL after saving your profile to initialize the login
7. More Docs for the flow can be found on our [GitHub TIB repo README](https://github.com/TykTechnologies/tyk-identity-broker) and our [3rd Party integration docs]({{< ref "api-management/external-service-integration" >}})

### Tyk's REST API for SSO

The SSO API allows you to implement custom authentication schemes for the Dashboard and Portal. You can access the API by both admin and dashboard APIs.
Our Tyk Identity Broker (TIB) internally also uses these APIs.

#### Generate authentication token

The Dashboard exposes two APIs:

- `/admin/sso` - See [Dashboard Admin API SSO]({{< ref "api-management/dashboard-configuration#single-sign-on-api-1" >}}) for more details.
- `/api/sso` -  See [Dashboard API SSO]({{< ref "api-management/dashboard-configuration#single-sign-on-api" >}}) for more details.

which allow you to generate a temporary authentication token, valid for 60 seconds. They make same thing you can select one of them and use it.
However, the admin API requires `admin-auth` header which should be same with `admin-secret` parameter in `tyk_analytics.conf`, the regular API requires `authorization` header which should be same with the user authentication token.  

#### Using the Token

Once you have issued a token you can login to the dashboard using the `/tap` url, or to the portal using the `<portal-url>/sso` URL, and provide an authentication token via the `nonce` query param.
If `nonce` is valid, Tyk will create a temporary user and log them in. 

If you want to re-use existing dashboard users, instead of creating temporary ones, you can set `"sso_enable_user_lookup": true` variable in the Dashboard config file (`tyk_analytics.conf`). This way you can set individual permissions for users logged via SSO.

##### Set up default permissions for the dashboard

If you use the token with `dashboard` scope, and would like to avoid login in as admin user (which is the default permissions), you can add the `sso_permission_defaults` configuration option to the Dashboard config file (`tyk_analytics.conf`) to specify SSO user permissions in the following format:

```
"sso_permission_defaults": {
  "analytics": "read",
  "apis": "write",
  "hooks": "write",
  "idm": "write",
  "keys": "write",
  "policies": "write",
  "portal": "write",
  "system": "write",
  "users": "write",
  "user_groups": "write"
}
```

As alternative, you can set `sso_default_group_id` to specify User Group ID assigned to SSO users.

In order to set individual user permissions, you should first create this users in the dashboard first, set needed permissions, enable `sso_enable_user_lookup` to `true` inside dashboard config. If SSO user with the same email will be found in Dashboard users, it will re-use his permissions. 

##### Sample Login Request

```{.copyWrapper}
GET /tap?nonce=YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw HTTP/1.1
Host: localhost:3000    
```

## SSO with Social Identity Providers

The social provider for the Tyk Identity Broker is a thin wrapper around the excellent `goth` social auth library, modified slightly to work with a multi-tenant structure. The social provider should provide seamless integration with:

*   Bitbucket
*   Digital Ocean
*   Dropbox
*   GitHub
*   Google+
*   Linkedin
*   Twitter
*   Salesforce

The social provider is ideal for SSO-style logins for the Dashboard or for the Portal. For certain providers (mainly Google+), where email addresses are returned as part of the user data, a constraint can be added to validate the users domain. This is useful for Google For Business Apps users that want to grant access to their domain users for the Dashboard.

For more social provider examples see the Tyk Identity Broker (TIB) v0.2 Repo [Readme](https://github.com/TykTechnologies/tyk-identity-broker/blob/master/README.md#social).

### Log into an APP with Github OAuth

{{< youtube gqUaDM4aJTw >}}

### Log into an APP with Google (Oauth)

A common use case for Tyk Gateway users is to enable users to log into a web app or mobile app using a social provider such as Google, but have that user use a token in the app that is time-delimited and issued by their own API (or in this case, Tyk).

Tyk can act as an OAuth provider, but requires some glue code to work, in particular, generating a token based on the authentication of a third party, which needs to run on a server hosted by the owner of the application. This is not ideal in many scenarios where authentication has been delegated to a third-party provider (such as Google or Github).

In this case, we can enable this flow with Tyk Gateway by Using TIB.

What the broker will do is essentially the final leg of the authentication process without any new code, simply sending the user via TIB to the provider will suffice for them to be granted an OAuth token once they have authenticated in a standard, expected OAuth pattern.

Assuming we have created a client ID and secret in Google Apps to grant ourselves access to the users data, we need those details, and some additional ones from Tyk itself.

#### To Set up an OAuth client with Google Apps

1. Go to the [Google Developer Console](https://console.developers.google.com/) and create a new app
2. Register a new OAuth client. Let's call it WebApp 1 (Select "New Credentials -> OAuth Client ID")
3. Select Web App
4. Add the following URL (modify for your domain) to the "Authorized redirect URIs" section: `http://tib-hostname:TIB-PORT/auth/{PROFILE-ID}/gplus/callback`

#### Create an OAuth Client in Tyk Dashboard

TIB will use the OAuth credentials for GPlus to access and authenticate the user, it will then use another set of client credentials to make the request to Tyk to generate a token response and redirect the user, this means we need to create an OAuth client in Tyk Dashboard before we can proceed.

One quirk with the Tyk API is that requests for tokens go via the base APIs listen path (`{listen_path}/toauth/authorize`), so we will need to know the listen path and ID of this API so TIB can make the correct API calls on your behalf.

```{.copyWrapper}
{
  "ActionType": "GenerateOAuthTokenForClient",
  "ID": "3",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{DASHBOARD-API-ID}",
    "DisableOneTokenPerAPI": false,
    "OAuth": {
      "APIListenPath": "{API-LISTEN-PATH}",
      "BaseAPIID": "{BASE-API-ID}",
      "ClientId": "{TYK-OAUTH-CLIENT-ID}",
      "RedirectURI": "http://{APP-DOMAIN}:{PORT}/{AUTH-SUCCESS-PATH}",
      "ResponseType": "token",
      "Secret": "{TYK-OAUTH-CLIENT-SECRET}"
    }
  },
  "MatchedPolicyID": "567a86f630c55e3256000003",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB-DOMAIN}:{TIB-PORT}",
    "FailureRedirect": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/login/?fail=true",
    "UseProviders": [{
      "Key": "GOOGLE-OAUTH-CLIENT-KEY",
      "Name": "gplus",
      "Secret": "GOOGLE-OAUTH-CLIENT-SECRET"
    }]
  },
  "ProviderConstraints": {
    "Domain": "",
    "Group": ""
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "",
  "Type": "redirect"
}
```

There's a few new things here we need to take into account:

*   `APIListenPath`: This is the listen path of your API, TIB uses this to generate the OAuth token.
*   `BaseAPIID`: The base API ID for the listen path mentioned earlier, this forms the basic access grant for the token (this will be superseded by the `MatchedPolicyID`, but is required for token generation).
*   `ClientId`: The client ID for this profile within Tyk Gateway.
*   `Secret`: The client secret for this profile in Tyk Gateway.
*   `RedirectURI`: The Redirect URL set for this profile in the Tyk Gateway.
*   `ResponseType`: This can be `token` or `authorization_code`, the first will generate a token directly, the second will generate an auth code for follow up access. For SPWA and Mobile Apps it is recommended to just use `token`.

When TIB successfully authorizes the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.

### Log into Dashboard with Google 

Similarly to logging into an app using Tyk, OAuth and Google Plus, if we have our callback URL and client IDs set up with Google, we can use the following profile setup to access our Dashboard using a social provider:

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "2",
  "IdentityHandlerConfig": null,
  "MatchedPolicyID": "1C",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "CallbackBaseURL": "http://:{TIB-PORT}",
    "FailureRedirect": "http://{DASH-DOMAIN}:{DASH-PORT}/?fail=true",
    "UseProviders": [{
      "Name": "gplus",
      "Key": "GOOGLE-OAUTH-CLIENT-KEY",
      "Secret": "GOOGLE-OAUTH-CLIENT-SECRET"
    }]
  },
  "ProviderConstraints": {
    "Domain": "yourdomain.com",
    "Group": ""
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
  "Type": "redirect"
}
```

The login to the Dashboard makes use of a one-time nonce to log the user in to the session. The nonce is only accessible for a few seconds. It is recommended that in production use, all of these transactions happen over SSL connections to avoid MITM snooping.

`Domain` constraint ensures that only users from `yourdomain.com` domain-based email accounts are allowed to login. 
 Replace it with correct domain or remove this section if you don't want to set this constraint.


When TIB successfully authorizes the user, and generates the token using the relevant OAuth credentials, it will redirect the user to the relevant redirect with their token or auth code as a fragment in the URL for the app to decode and use as needed.

There is a simplified flow, which does not require a corresponding OAuth client in Tyk Gateway, and can just generate a standard token with the same flow.


## SSO with OpenID Connect (OIDC)

- Instruction on setting [SSO with Okta]({{< ref "" >}})
- Instructions on setting [SSO with Auth0]({{< ref "" >}})
- Instructions on setting [SSO with Keycloak]({{< ref "" >}})
- Instructions on setting [SSO with AzureAD]({{< ref "" >}})

### OIDC with Azure AD

This is an end-to-end worked example of how you can use [AzureAD](https://azure.microsoft.com/en-gb/services/active-directory/) and our [Tyk Identity Broker (TIB)](https://tyk.io/docs/concepts/tyk-components/identity-broker/
) to log in to your Dashboard.
This guide assumes the following:

You already have authorized access to Tyk's Dashboard. If you haven't, get the authorization key by following this [guide]({{< ref "api-management/user-management#using-dashboard-api">}}).

#### Configuration at Azure

1. Access your Azure Portal and navigate to the Azure Active Directory page.

2. Go to app registrations and create or access an application you want to use for Dashboard access.
    
    - If you are creating an application, give it a name and register it 

3. Add a redirect URL to your application as callback to TIB in your Azure application:

    - In your app, either via the Authentication menu or the redirect URL shortcut navigate to and add the redirect to TIB in the Web category i.e. `http://localhost:3000/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.

    {{< img src="/img/azureAD/redirect-URL-1.png" alt="Redirect URL" >}}

4. Go to Overview and add a secret in Client Credentials. Don't forget to copy the secret value, not the secretID. 

    {{< img src="/img/azureAD/overview-1.png" alt="Overview" >}}

Check Microsoft's [documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) for more detail.

#### Configuration at Dashbaord

1. Log in to your dashboard and select Identity Management, located under System Management
2. Create a profile and select OpenID Connect as the provider type
3. Under Profile Configuration, paste the secret value, clientID, and well-known endpoint URL from the Azure site. 
    - Profile Configuation may look something like this:

    {{< img src="/img/azureAD/profile-configuration-1.png" alt="Profile Configuration" >}}

    - The well-known endpoint URL is created by Azure and can be located by selecting Endpoints on their site

    {{< img src="/img/azureAD/endpoints-11.png" alt="Endpoints" >}}

#### Test your Azure Login:

From the browser call `http://localhost:3000/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
- If it's working you'll be redirected to Azures's web page and asked for your username and password.

    {{< img src="/img/azureAD/username.png" alt="Username" >}}

    {{< img src="/img/azureAD/password.png" alt="Password" >}}
  
- If it's working you'll be redirected to Azures's web page and asked for your username and password.

    {{< img src="/img/azureAD/dashboard.png" alt="Dashboard" >}}

#### Enhancements

Once it's working you can also add more enhancements such as automatic user group mapping from your AzureAD security groups or users groups to Tyk Dashboards groups.

##### User group mapping

Group mapping can be managed from Advanced Settings section of the Profile Configuration screen.

{{< img src="/img/azureAD/additional-options.png" alt="Profile Configuration - Additional Options" >}}

As illustrated in the screen below the following information must be provided:

- Identity provider role
- Tyk User Group: This can be created from the User Groups section of the dashboard (reference a link to a page in tyk docs here to show how to create a user group). When creating your User Group, one can also select and adjust the permissions for each group. 

For more information on how to set and change user permissions, head to this [guide]({{< ref "api-management/user-management#using-dashboard-ui-1">}})

{{< img src="/img/azureAD/raw-editor.png" alt="Profile Configuration - Raw-editor" >}}

You can select the scopes you would like your request to include. By default, Tyk will provide the connectid scope, anything additional must be requested.

#### OpenID Connect Example

For debugging purposes, you can find an example we created using the OpenID Connect playground.
1. Add the redirect url found on the OpenID Connect site to the redirect urls found under the Web section

    {{< img src="/img/azureAD/openid_connect/access_redirect_urls.png" alt="Access redirect urls" >}}

    {{< img src="/img/azureAD/openid_connect/additional_redirect_url.png" alt="Additional URL Added" >}}

2. Copy the OpenID Connect endpoint from the Azure site
3. On the OpenID Connect site select Edit. In the Server Template dropdown menu select the Custom option and paste the endpoint in the Discovery Document URL. 

    {{< img src="/img/azureAD/openid_connect/edit_button.png" alt="Edit Button" >}}

    {{< img src="/img/azureAD/openid_connect/custom_dropdown.png" alt="Custom Dropdown" >}}

4. Press the Use Discovery Document button and this will autofill Authorization Token Endpoint, Token Endpoint, and Token Keys Endpoint

    {{< img src="/img/azureAD/openid_connect/discovery_document.png" alt="Discovery Document" >}}

5. Copy and paste the Client ID and Client Secret from the Azure site to your ConnectID. Scope is autofilled for you and save the configuration.

    {{< img src="/img/azureAD/openid_connect/client_id_client_secret.png" alt="Client ID and Secret" >}}
6. Press start at the bottom of the Request window and if done correctly, this should prompt you to sign in to your Azure account.

    {{< img src="/img/azureAD/openid_connect/step-2.png" alt="OpenID Connect Step 2" >}}
7. You should then be redirected back to OpenID Connect where you'll be shown the Exchange Code. This needs to be turned into an access token. Press the exchange button under the request and then press Next.

    {{< img src="/img/azureAD/openid_connect/step-3.png" alt="OpenID Connect Step 3" >}}
    {{< img src="/img/azureAD/openid_connect/step-4.png" alt="OpenID Connect Step 4" >}}
8. We can then verify this by pressing the verify button. We can also view the information or scope of what is being returned by heading to jwt.io and viewing the payload: data there.

    {{< img src="/img/azureAD/openid_connect/step-5.png" alt="OpenID Connect Step 5" >}}
9. We are given an object with key, value pairs and we can pass in the key ie. name to our Custom User Group and the value of to our Identity Provider Role in our Tyk dashboard as shown in the example above. 

    {{< img src="/img/azureAD/openid_connect/step-6.png" alt="OpenID Connect Step 6" >}}

To try this yourself, we have included the link: https://openidconnect.net/

### OIDC with Okta

This is an end-to-end worked example of how you can use [Okta](https://www.okta.com/) and our [Tyk Identity Broker (TIB)](https://tyk.io/docs/concepts/tyk-components/identity-broker/
) to log in to your Dashboard.
This guide assumes the following:

* You already have authorized access to Tyk's Dashboard. If you haven't, [get the authorization key by following this doc]({{< ref "api-management/user-management#using-dashboard-api" >}}).
* For simplicity, you are running TIB locally on port 3010
* You are able to edit TIB's configuration file.


#### Configuration at Okta

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

#### Configuration at TIB

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
   See [Install TIB]({{< ref "api-management/external-service-integration" >}}) for detailed instructions on how to install TIB
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

#### Understanding the flow
 1. The initial call to the endpoint on TIB was redirected to Okta
 2. Okta identified the user
 3. Okta redirected the call back to TIB endpoint (according to the callback you set up on the client earlier in step 3) and from TIB
 4. TIB, via REST API call to the dashboard, created a nonce and a special session attached to it.
 5. TIB redirected the call to the dashboard to a special endpoint `/tap` ( it was defined on the profile under `ReturnURL`) with the nonce that was created.
 6. The Dashboard on the `/tap` endpoint finds the session that is attached to the `nonce`, login the user and redirect to the dashboard first page

#### Enabling MFA and SSO

Once it's working you can also add two more enhancements - SSO and MFA

##### SSO login into the Dashboard via a login page
   You will need to:
	- set up a web server with a login page and a form for `user` and `password`
	- Update `tyk_analytics.conf` to redirect logins to that url
    Explicit details are in [steps 6-7]({{< ref "#create-login-page" >}})

##### Multi-Factor-Authentication (MFA) Support
   MFA works out-of-the-box in Tyk since luckily Okta supports it. you would need to add it to the configuration of the account holder. Under `Security --> Multifactor --> Factor types` you can choose the types you want. For instance I chose Google Authenticator.

   1. While trying to login to the Dashboard, Okta enforced the MFA and asked me to use the Google Authenticator:
   {{< img src="/img/okta-sso/okta-mfa-setup-1.png" alt="okta-mfa-setup-1" >}}

   2. I had to download the Google Authenticator and identify with the generated code
   {{< img src="/img/okta-sso/okta-mfa-download-google-authenticator-2.png" alt="okta-mfa-download-google-authenticator-2" >}}
   3. I successfully authenticated with Google Authenticator
   {{< img src="/img/okta-sso/okta-mfa-google-auth-approved-3.png" alt="okta-mfa-google-auth-approved-3" >}}

#### Common Error
If you get a `400 Bad Request` it means the profile name in the login endpoint is not identical to the profile name in the callback that you set up on Okta's app:

- On Okta's app - `Login redirect URIs:` `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
- The endpoint to test - `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`

{{< img src="/img/okta-sso/okta-bad-request-wrong-callback.png" alt="okta-bad-request-wrong-callback" >}}

### OIDC with Auth0

This will walk you through securing access to your Tyk Dashboard using OpenID Connect (OIDC) identity tokens with Auth0. We also have the following video that will walk you through the process.

{{< youtube sqxXnAwhP-s >}}

**Prerequisites**

* A free account with [Auth0](https://auth0.com/)
* A Tyk Self-Managed or Cloud installation
* Our Tyk Identity Broker (TIB). You can use the internal version included with a Tyk Self-Managed installation and Tyk Cloud, or an external version. See [Tyk Identity Broker]({{< ref "#what-is-tyk-identity-broker-tib" >}}) for more details.

#### Create a new user in Auth0

1. Log in to your Auth0 account.
2. Select **Users** from the **User Management** menu.

{{< img src="/img/sso-auth0/auth0-create-user.png" alt="Auth0 Create User" width="800px" height="400" >}}

3. Click Create User and complete the new user form, using the default **Username-Password-Authentication** Connection method.
4. Click Create to save your new user.
{{< img src="/img/sso-auth0/auth0-user-details.png" alt="Auth0 User profile" width="400px" height="400" >}}

#### Create an Auth0 application

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

#### Create an Identity Management profile in your Dashboard

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

9. Copy the **Callback URL** and paste it into the **Allowed Callback URLs** field in your **Auth0 application** > **Basic Information**.
{{< img src="/img/sso-auth0/auth0-tyk-callback-url.png" alt="Auth0 Allowed Callback URLs" width="400px" height="400" >}}
10. Click **Save Changes** to update your Auth0 Application.
11. Click **Create Profile** to save your Identity profile in your Tyk Dashboard.

#### Test your Auth0 Login

1. From your **Identity Management Profiles** click the profile you created to open it.
{{< img src="/img/sso-auth0/tyk-profile-list.png" alt="Tyk Identity Profiles" width="800px" height="400" >}}
2. Click the **Login URL**.
{{< img src="/img/sso-auth0/tyk-id-profile-provider-config.png" alt="Tyk Identity Profile Config" width="800px" height="400" >}}
3. You will now see the Auth0 login form in a browser tab.
{{< img src="/img/sso-auth0/auth0-login.png" alt="Auth0 login form" width="400px" height="400" >}}
4. Enter the email address and password of your Auth0 user.
5. You may be asked to authorize your Auth0 application. 
{{< img src="/img/sso-auth0/auth0-accept.png" alt="Accept Auth0 application" width="400px" height="400" >}}
6. Click **Accept**.
7. You will now be taken to the Tyk Dashboard.
{{< img src="/img/sso-auth0/tyk-dash-success.png" alt="Tyk Dashboard from Auth0 SSO login" width="800px" height="400" >}}

### OIDC with Keycloak

This is a walk-through of how you can use [Keycloak](https://www.keycloak.org) and our (internal/embedded) Tyk Identity Broker (TIB) to log in to your Dashboard. This guide assumes you have existing Keycloak and Tyk Pro Environments.

#### Configuration at KeyCloak

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


#### Configuration at Dashboard

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


#### Test Keycloak Login

1. From your **Identity Management Profiles** click the profile you created to open it.

2. Copy the **Login URL** and paste it into a browser tab
   {{< img src="/img/keycloak-sso/login-url.png" alt="Copy login url" width="800px" height="400" >}}

3. You will now see the Keycloak login form.
   {{< img src="/img/keycloak-sso/keycloak-login.png" alt="Login to keycloak" width="400px" height="400" >}}

4. Enter the email address and password of your Keycloak user.

5. You should now be redirected to the Tyk Dashboard and logged in
   {{< img src="/img/keycloak-sso/logged-in.png" alt="Tyk Dashboard from Keycloak SSO login" width="800px" height="400" >}}


## SSO with SAML

SAML authentication is a way for a service provider, such as the Tyk Dashboard or Portal, to assert the Identity of a User via a third party.

Tyk Identity Broker can act as the go-between for the Tyk Dashboard and Portal and a third party identity provider. Tyk Identity broker can also interpret and pass along information about the user who is logging in such as Name, Email and group or role metadata for enforcing role based access control in the Tyk Dashboard.

The provider config for SAML has the following values that can be configured in a Profile:

`SAMLBaseURL` - The host of TIB that will be used in the metadata document for the Service Provider. This will form part of the metadata URL used as the Entity ID by the IDP. The redirects configured in the IDP must match the expected Host and URI configured in the metadata document made available by Tyk Identity Broker.

`FailureRedirect` - Where to redirect failed login requests.

`IDPMetaDataURL` - The metadata URL of your IDP which will provide Tyk Identity Broker with information about the IDP such as EntityID, Endpoints (Single Sign On Service Endpoint, Single Logout Service Endpoint), its public X.509 cert, NameId Format, Organization info and Contact info.

This metadata XML can be signed providing a public X.509 cert and the private key.     

`CertLocation`: An X.509 certificate and the private key for signing your requests to the IDP, this should be one single file with the cert and key concatenated. When using internal identity broker, this value should be the id of the certificate uploaded via certificate manager in dashboard, otherwise it should be a path where the certificate is placed.

`ForceAuthentication` - Ignore any session held by the IDP and force re-login every request.

`SAMLEmailClaim` - Key for looking up the email claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`

`SAMLForenameClaim` - Key for looking up the forename claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/forename`

`SAMLSurnameClaim` - Key for looking up the surname claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`

Example profile configuration:

```
{
    "ActionType": "GenerateOrLoginUserProfile",
    "ID": "saml-sso-login",
    "OrgID": "{YOUR_ORGANIZATION_ID}",
    "CustomEmailField": "",
    "IdentityHandlerConfig": {
        "DashboardCredential": "{DASHBOARD_USER_API_KEY}"
    },
    "ProviderConfig": {
        "SAMLBaseURL": "https://{HOST}",
        "FailureRedirect": "http://{DASHBOARD_HOST}:{PORT}/?fail=true",
        "IDPMetaDataURL": "{IDP_METADATA_URL}",
        "CertLocation":"myservice.cert",
        "ForceAuthentication": false,
        "SAMLEmailClaim": "",
        "SAMLForenameClaim": "",
        "SAMLSurnameClaim": ""
    },
    "ProviderName": "SAMLProvider",
    "ReturnURL": "http://{DASHBOARD_URL}:{PORT}/tap",
    "Type": "redirect"
}
```
### Video Demonstration

We have a video that walks you through getting Tyk Dashboard SSO Access via SAML using Microsoft Azure as IDP and our internal Dashboard TIB.

{{< youtube 4L9aetRrHqI >}}

## SSO with LDAP

This is an end to end worked example of how you can use LDAP and our Tyk Identity Broker (TIB) to log in to your Dashboard.

The Tyk Dashboard is the command and control center of your Tyk installation. It allows users to manage APIs, policies, keys, etc. All of this data is stored in the Dashboard's MonogDB database, including the user accounts. This works well in a lot of situations as it allows Tyk to be self-contained, but if you already have a centralised system for managing users then you may prefer to use that instead of a separate Tyk-specific database.

The Tyk Identity Broker (TIB) is an open-source project which can be used to integrate Tyk authentication with 3rd party identity providers (IDPs). You can use this to enable your Dashboard to authenticate users with your LDAP-powered identity providers such as Active Directory. TIB has been designed as a glue-code solution, so it can integrate with almost any identity provider (IDP). See [Tyk Identity Broker Configuration]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}) for details on configuring the TIB.

### The High Level TIB Flow:

1. User makes an authentication request against the TIB endpoint, passing their credentials
2. TIB makes request against IDP using the credentials provided
3. TIB interprets the IDP response:

   * If successful then TIB creates a user session in the Dashboard and redirects the user to the Dashboard

   * If unsuccessful, TIB redirects the user to a failure URL

### Steps for Configuration

This guide assumes you already have a Tyk environment set up, with a Gateway and Dashboard. If you don't, please follow the [Tyk Self-Managed getting started guide]({{< ref "tyk-self-managed#installation-options-for-tyk-self-managed" >}}).

The environment used for this guide is, for simplicity's sake, all contained on a single host running Ubuntu 14.04. The hostname `my-tyk-instance.com` has been set to point at `127.0.0.1`. For production environments it is recommended that each component is hosted separately and appropriate security measures are used such as HTTPS to secure connections.

All commands shown are run from inside the Tyk host environment.

1. **Download TIB**

    You can download TIB from the [releases page of the TIB repository on GitHub](https://github.com/TykTechnologies/tyk-identity-broker/releases). The release names contain the architecture and version i.e. `tib-linux-<architecture>-<version>.tar.gz`. This example uses `amd64` and `0.2.1` for all the commands, but you should update them to use the latest version and relevant architecture for your platform.

    First step is to download TIB onto the environment:

    ```{.copyWrapper}
    wget https://github.com/TykTechnologies/tyk-identity-broker/releases/download/v0.2.1/tib-linux-amd64-0.2.1.tar.gz
    ```

2. **Extract and store TIB**

    As the other Tyk components are installed in your `/opt` directory, we recommend you install TIB there too:

    ```{.copyWrapper}
    tar -xvzf tib-linux-amd64-0.2.1.tar.gz
    ```

    TIB will now be extracted to the directory `tib-0.2.1`, let's move this to `/opt` and change to that directory:

    ```{.copyWrapper}
    sudo mv tib-0.2.1 /opt
    cd /opt/tib-0.2.1
    ```

3. **Configure TIB**

    There are two configuration files for TIB:

    1. `tib.conf` for the main application configuration settings
    2. `profiles.json` to configure the profiles which TIB will attempt to authenticate against

    Out of the box you don't need to change much, but there are several attributes you should check to make sure they are correct for your environment:

    * `Secret`: The REST API secret used when configuring TIB remotely
    * `TykAPISettings.GatewayConfig.Endpoint`: The URL through which TIB can communicate with your Tyk Gateway
    * `TykAPISettings.GatewayConfig.Port`: The port through which TIB can communicate with your Tyk Gateway
    * `TykAPISettings.GatewayConfig.AdminSecret`: The secret required for TIB to communicate with your Tyk Gateway REST API - must match the `secret` property in your Gateway's `tyk.conf`
    * `TykAPISettings.DashboardConfig.Endpoint`: The URL through which TIB can communicate with your Tyk Dashboard
    * `TykAPISettings.DashboardConfig.Port`: The port through which TIB can communicate with your Tyk Dashboard
    * `TykAPISettings.DashboardConfig.AdminSecret`: The secret required for TIB to communicate with your Tyk Dashboard Admin REST API - must match the `admin_secret` property in your Dashboard's `tyk_analytics.conf`

    The `tib.conf` for this example is as follows (yours might require different values):

    ```{.copyWrapper}
    {
      "Secret": "352d20ee67be67f6340b4c0605b044b7",
      "HttpServerOptions": {
        "UseSSL": false,
        "CertFile": "./certs/server.pem",
        "KeyFile": "./certs/server.key"
      },
      "BackEnd": {
        "Name": "in_memory",
        "ProfileBackendSettings": {},
        "IdentityBackendSettings": {
          "Hosts" : {
              "localhost": "6379"
          },
          "Password": "",
          "Database": 0,
          "EnableCluster": false,
          "MaxIdle": 1000,
          "MaxActive": 2000
        }
      },
      "TykAPISettings": {
        "GatewayConfig": {
          "Endpoint": "http://localhost",
          "Port": "8080",
          "AdminSecret": "352d20ee67be67f6340b4c0605b044b7"
        },
          "DashboardConfig": {
            "Endpoint": "http://localhost",
            "Port": "3000",
            "AdminSecret": "12345"
          }
      }
    }
    ```

4. **Set up the LDAP profile**

    TIB ships with a default `profiles.json` file which contains many example configuration for different scenarios. This guide is focused on LDAP authentication for the Dashboard, so we will update `profiles.json` to contain a single profile for this purpose.

    The key attributes for LDAP profile are:

    * `ID`: The ID by which we will activate the profile by calling the appropriate TIB endpoint
    * `OrgId`: The organization id which the profile is connected to - make sure this is the correct id for your organization (see the [Dashboard Admin API documentation]({{< ref "api-management/dashboard-configuration#organizations-api" >}}) for details on how to retrieve this)
    * `IdentityHandlerConfig.DashboardCredential`: The Dashboard API Access credential which is used as authorization header
    * `ProviderConfig.FailureRedirect`: The URL which TIB will redirect to if the authentication fails
    * `ProviderConfig.LDAPPort`: The port through which TIB can communicate with your LDAP server
    * `ProviderConfig.LDAPServer`: The URL through which TIB can communicate with your LDAP server
    * `ProviderConfig.LDAPUserDN`: The distinguished name which TIB will use to identify the user - this should be updated to match your LDAP installation and must retain the `*USERNAME*` token as this is replaced by the actual username at runtime
    * `ReturnURL`: The URL which TIB will redirect to if the authentication succeeds - this should be the `/tap` endpoint of your Tyk Dashboard

    The `profiles.json` for this example is as follows (again, update values for your environment):

    ```{.copyWrapper}
    [
      {
        "ActionType": "GenerateOrLoginUserProfile",
        "ID": "1",
        "OrgID": "59bfdf5b56c02c065d24638e",
        "IdentityHandlerConfig": {
            "DashboardCredential": "bb5735026be4400e67ed9801c2f1e2f9"
        },
        "ProviderConfig": {
          "FailureRedirect": "http://my-tyk-instance.com:3000/?fail=true",
          "LDAPAttributes": [],
          "LDAPPort": "389",
          "LDAPServer": "ldap.forumsys.com",
          "LDAPUserDN": "cn=*USERNAME*,dc=example,dc=com"
        },
        "ProviderName": "ADProvider",
        "ReturnURL": "http://my-tyk-instance.com:3000/tap",
        "Type": "passthrough"
      }
    ]
    ```

    Notice that this is a JSON array object with a single element; an LDAP profile. The LDAP server referenced by this profile is the freely-available service provided forumsys.com. See [their documentation](https://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/) for more information. You can use any OpenLDAP compatible server.

5. **Start TIB**

    Start TIB by executing the TIB binary. This will produce an output log into the console which you can use to watch TIB process requests. Since TIB looks for the config file in the local directory, you should execute the application from there too.

    ```{.copyWrapper}
    cd /opt/tib-0.2.1
    ./tib
    ```

    If all is well you should see TIB output a few messages when it starts:

    ```
    toth/tothic: no SESSION_SECRET environment variable is set. The default cookie store is not available and any calls will fail. Ignore this warning if you are using a different store.
    INFO[0000] Tyk Identity Broker v0.2
    INFO[0000] Copyright Martin Buhr 2016

    DEBU[0000] [MAIN] Settings Struct: {{http://localhost 8080 352d20ee67be67f6340b4c0605b044b7} {http://localhost 3000 12345}}
    INFO[0000] [MAIN] Initialising Profile Configuration Store
    INFO[0000] [IN-MEMORY STORE] Initialised
    INFO[0000] [MAIN] Initialising Identity Cache
    INFO[0000] [REDIS STORE] Initialised
    INFO[0000] [FILE LOADER] Loaded: 1 profiles from profiles.json
    INFO[0000] [MAIN] Broker Listening on :3010
    ```

    Start a new shell session to carry on with the remaining process.

<a id="create-login-page"></a>

6. **Create a login page**

    TIB works by having credentials sent to it, so a login page must be made in order to fulfill this requirement. For this example we will create a basic login form hosted by Nginx. We can't just place the login page in our Dashboard directory as the Dashboard is not a standard web server, it only serves the pages which it has been compiled to serve. Any non-compiled page will produce a 404 response.

    Install Nginx and start it:

    ```{.copyWrapper}
    sudo apt-get install nginx
    sudo service nginx start
    ```

    Nginx will now serve pages out of the default web root directory `/usr/share/nginx/www`. We now need to create a web page there. This command will pipe the echoed text into a file called `login.html` which is stored in the web root:

    ```{.copyWrapper}
    echo \
    "<html> \
        <head> \
          <title>Tyk Dashboard LDAP login</title> \
        </head> \
        <body> \
          <form method="post" action="http://my-tyk-instance.com:3010/auth/1/ldap"> \
            username: <input type="text" name="username"/> <br/> \
            password: <input type="text" name="password"/> <br/> \
            <input type="submit" value="login"> \
          </form> \
        </body> \
    </html>" \
    | sudo tee /usr/share/nginx/www/login.html > /dev/null
    ```

    The login form contains two inputs named `username` and `password`. TIB looks for these exact parameter names when processing the request, so if you are creating your own login page you must use these input names.

    Please make sure you are using `POST` method in the form, to avoid browser caching.

    The form action `http://my-tyk-instance.com:3010/auth/1/ldap` is the TIB endpoint which will start the authentication process. The URL can be broken down as follows:

    * `http://my-tyk-instance.com`: The method and hostname used to connect to TIB - you should use HTTPS to prevent confidential data from being exposed
    * `3010`: The default port for TIB
    * `auth`: The special TIB endpoint which accepts authentication requests
    * `1`: The number of the profile which we are using - matches against the `ID` property of the profile in `profiles.json`
    * `ldap`: We need to add a string to the end of the request, so we have used `ldap` here

7. **Update the Dashboard config**

    Update the Dashboard config so that any unauthenticated requests are redirected to your custom login page. We do this by updating the `sso_custom_login_url` property of the Dashboard's `tyk_analytics.conf` file, which by default is located in the `/opt/tyk-dashboard` directory. For example (ommitting all other lines in the config file and trailing comma):

    ```{.copyWrapper}
    "sso_custom_login_url": "http://my-tyk-instance.com/login.html"
    ```

    Since the Dashboard runs on port 3000 by default, this URL will use the default HTTP port of 80 which will be handled by Nginx.

8. **Test that it works**

    Now that we have TIB installed and configured, Nginx installed and hosting our custom login page, and the Dashboard configured to redirect to that login page we can now test the solution. Remember that this example is using the LDAP provided at forumsys.com, so if you are using your own LDAP then substitute the username and password with appropriate values from your system.

    1. Open a web browser (if you're already logged in to the Dashboard, logout now) and attempt to access the Dashboard - `http://my-tyk-instance.com:3000`
    2. This should be redirected to the custom login page - `http://my-tyk-instance.com/login.html`
    3. Enter `read-only-admin` as the username
    4. Enter `password` as the password
    5. Submit the form
    6. You should now be logged in to the Dashboard


## Advance LDAP Configuration

The LDAP Identity Provider gives you functionality to bind a user to an LDAP server based on a username and password configuration. The LDAP provider currently does not extract user data from the server to populate a user object, but will provide enough defaults to work with all handlers.

### Log into the Dashboard using LDAP


Below is a sample TIB profile that can be used to log a user into the Dashboard using an LDAP pass-through provider:

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "4",
  "OrgID": "{YOUR-ORG-ID}",
  "IdentityHandlerConfig": {
		"DashboardCredential": "ADVANCED-API-USER-API-TOKEN"
  },
  "ProviderConfig": {
    "FailureRedirect": "http://{DASH-DOMAIN}:{DASH-PORT}/?fail=true",
    "LDAPAttributes": [],
    "LDAPPort": "389",
    "LDAPServer": "localhost",
    "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=test-ldap,dc=tyk,dc=io"
  },
  "ProviderName": "ADProvider",
  "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
  "Type": "passthrough" 
}

```

The only step necessary to perform this is to send a POST request to the LDAP URL.

TIB can pull a username and password out of a request in two ways:

1.  Two form fields called "username" and "password"
2.  A basic auth header using the Basic Authentication standard form

By default, TIB will look for the two form fields. To enable Basic Auth header extraction, add `"GetAuthFromBAHeader": true` to the `ProviderConfig` section.

The request should be a `POST`.

If you make this request with a valid user that can bind to the LDAP server, Tyk will redirect the user to the dashboard with a valid session. There's no more to it, this mechanism is pass-through and is transparent to the user, with TIB acting as a direct client to the LDAP provider.

{{< note success >}}
**Note**  

The `LDAPUserDN` field MUST contain the special `*USERNAME*` marker in order to construct the users DN properly.
{{< /note >}}


### Generate an OAuth token using LDAP


The configuration below will take a request that is posted to TIB, authenticate it against LDAP, if the request is valid, it will redirect to the Tyk Gateway OAuth clients' `Redirect URI` with the token as a URL fragment:

```{.copyWrapper}
{
  "ActionType": "GenerateOAuthTokenForClient",
  "ID": "6",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{DASHBAORD-API-ID}",
    "DisableOneTokenPerAPI": false,
    "OAuth": {
      "APIListenPath": "{API-LISTEN-PATH}",
      "BaseAPIID": "{BASE-API-ID}",
      "ClientId": "{TYK-OAUTH-CLIENT-ID}",
      "RedirectURI": "http://{APP-DOMAIN}:{PORT}/{AUTH-SUCCESS-PATH}",
      "ResponseType": "token",
      "Secret": "{TYK-OAUTH-CLIENT-SECRET}"
    }
  },
  "MatchedPolicyID": "POLICY-ID",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "FailureRedirect": "http://{APP-DOMAIN}:{PORT}/failure",
    "LDAPAttributes": [],
    "LDAPPort": "389",
    "LDAPServer": "localhost",
    "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=ldap,dc=tyk-ldap-test,dc=com"
  }
  "ProviderName": "ADProvider",
  "ReturnURL": "",
  "Type": "passthrough"
}
```

This configuration is useful for internal APIs that require valid OAuth tokens (e.g.a webapp or mobile app) but needs validation by an LDAP provider.

### Log into the Developer Portal using LDAP


LDAP requires little configuration, we can use the same provider configuration that we used to log into the Dashboard to target the Portal instead - notice the change in the handler configuration and the return URL:

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginDeveloperProfile",
  "ID": "5",
  "IdentityHandlerConfig": {
    "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a"
  },
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "FailureRedirect": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/login/",
    "LDAPAttributes": [],
    "LDAPPort": "389",
    "LDAPServer": "localhost",
    "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=test-ldap,dc=tyk,dc=io"
  },
  "ProviderConstraints": {
    "Domain": "",
    "Group": ""
  },
  "ProviderName": "ADProvider",
  "ReturnURL": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/sso/",
  "Type": "passthrough"
}
```

Once again, a simple `POST` request is all that is needed to validate a user via an LDAP provider.

### Using advanced LDAP search

In some cases validation of a user CN is not enough, and it requires verifying if a user match some specific rules, like internal team ID. In this case TIB provides support for doing additional LDAP search check, and if result of this search returns only 1 record, it will pass the user.

To make it work you need to specify 3 additional attributes in profile configuration file:

* `LDAPBaseDN` - base DN used for doing LDAP search, for example `cn=dashboard,ou=Group`
* `LDAPFilter` - filter applied to the search, should include the `*USERNAME*`variable. For example: `((objectCategory=person)(objectClass=user)(cn=*USERNAME*))`
* `LDAPSearchScope` - This specifies the portion of the target subtree that should be considered. Supported search scope values include: 0 - baseObject (often referred to as "base"), 1 - singleLevel (often referred to as "one"), 2 - wholeSubtree (often referred to as "sub")

For additional information about [LDAP search protocol](https://www.ldap.com/the-ldap-search-operation)

Example profile using LDAP search filters:
```{.copyWrapper}
{
	"ActionType": "GenerateOAuthTokenForClient",
	"ID": "2",
	"IdentityHandlerConfig": {
		"DashboardCredential": "ADVANCED-API-USER-API-TOKEN",
		"DisableOneTokenPerAPI": false,
		"OAuth": {
			"APIListenPath": "oauth-1",
			"BaseAPIID": "API-To-GRANT-ACCESS-TO",
			"ClientId": "TYK-OAUTH-CLIENT-ID",
			"RedirectURI": "http://your-app-domain.com/target-for-fragment",
			"ResponseType": "token",
			"Secret": "TYK-OAUTH-CLIENT-SECRET"
		}
	},
	"MatchedPolicyID": "POLICY-TO-ATTACH-TO-KEY",
	"OrgID": "53ac07777cbb8c2d53000002",
	"ProviderConfig": {
		"FailureRedirect": "http://yourdomain.com/failure-url",
		"LDAPAttributes": [],
		"LDAPBaseDN": "cn=dashboard,ou=Group,dc=ldap,dc=tyk-test,dc=com",
		"LDAPEmailAttribute": "mail",
		"LDAPSearchScope": 2,
		"LDAPFilter": "(&(objectcategory=user)(sAMAccountName=*USERNAME*)(memberOf=CN=RL - PAT - T1-00002,OU=Role,OU=Security Roles,DC=company,DC=net))",
		"LDAPPort": "389",
		"LDAPServer": "ldap.company.com",
		"LDAPUserDN": "*USERNAME*@company.com"
	},
	"ProviderName": "ADProvider",
	"ReturnURL": "",
	"Type": "passthrough"
}
```


## Custom Proxy Identify Provider

The proxy identity provider is a generic solution to more legacy problems, as well as a way to handle flows such as basic auth access with third party providers or OAuth password grants where the request can just be passed through to the providing endpoint to return a direct response.

The proxy provider will take a request, proxy it to an upstream host, capture the response, and analyze it for triggers of "success", if the triggers come out as true, then the provider will treat the request as authenticated and hand over to the Identity Handler to perform whatever action is required with the user data.

Success can be triggered using three methods:

1.  Response code: e.g. if this is an API request, a simple `200` response would suffice to act as a successful authentication.
2.  Response body exact match: You can have a base64 encoded body that you would expect as a successful match, if the two bodies are the same, then the request will be deemed successful.
3.  Regex: Most likely, the response might be dynamic (and return a response code, timestamp or other often changing parameter), in which case you may want to just match the response to a regex.

These can be used in conjunction as gates, e.g. a response must be `200 OK` and match the regex in order to be marked as successful.

### JSON Data and User names

The Proxy provider can do some clever things, such as extract JSON data from the response and decode it, as well as pull username data from the Basic Auth header (for example, if your identity provider supports dynamic basic auth).

### Log into the Dashboard with the Proxy Provider

The configuration below will proxy a request to `http://{TARGET-HOSTNAME}:{PORT}/` and evaluate the response status code, if the status code returned is `200` then TIB will assume the response is JSON (`"ResponseIsJson": true`) to extract an access token (e.g. if this is an OAuth pass-through request) and try and find an identity to bind the Dashboard user to in the `user_name` JSON field of the response object (`"UsernameField": "user_name"`):

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "7",
  "OrgID": "{YOUR-ORG-ID}",
  "ProviderConfig": {
    "AccessTokenField": "access_token",
    "ExtractUserNameFromBasicAuthHeader": false,
    "OKCode": 200,
    "OKRegex": "",
    "OKResponse": "",
    "ResponseIsJson": true,
    "TargetHost": "http://{TARGET-HOSTNAME}:{PORT}/",
    "UsernameField": "user_name"
  },
  "ProviderName": "ProxyProvider",
  "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
  "Type": "redirect"
}
```


## JSON Web Encryption with OIDC

**Prerequisites**

- Tyk Identity Broker v1.6.1+ or Tyk Dashboard v5.7.0+ (JWE feature is available from these versions and in all subsequent releases).
- An Identity Provider (IdP) that supports JSON Web Encryption (JWE)
- A certificate with a private key for Tyk (used to decrypt the ID token)
- A public key file for the IdP (used to encrypt the ID token)

### Steps for Configuration

1. **Prepare Encryption Keys**
  
  - Load the certificate with the private key into Tyk:
    - **For embedded TIB in Dashboard:** Use Tyk Dashboard's certificate manager. In the below image you can see the module in dashboard that allows to upload certificates:
      {{< img src="/img/dashboard/certificate-manager/adding-certificate.gif" alt="Certificate manager" >}}
    - **For standalone TIB:** Store the certificate as a file accessible to Tyk

  - Load the public key into your IdP for ID token encryption (process varies by IdP)

2. **Configure the Identity Provider**
- Create a new client in your IdP for Tyk Identity Broker

3. **Setup OIDC Profile**
  - Create a new [TIB profile]({{< ref "#exploring-tib-profiles" >}}):
    - Select Social > OIDC as the provider
    - Enter the client key and client secret from the IdP
    - Copy the callback URL from TIB and add it to the IdP client's allowed redirect URLs
    {{< img src="/img/tib/profiles/tib-profile-creation.gif" alt="Profile creation" >}}
  - Test the basic SSO flow to ensure it's working correctly

4. **Enable JWE**
  - [Updated the TIB profile via API]{{{< ref "tyk-identity-broker/tib-rest-api#a-nameupdate-profilea-update-profile" >}}}
    - Add the following fields to the `ProviderConfig` section:

      ```json
      ...
      "ProviderConfig": {
        "JWE": {
          "Enabled": true,
          "PrivateKeyLocation": "CERT-ID"
        },
      ...
      ```

    - Set `PrivateKeyLocation` to either:
      - The certificate ID from the certificate manager, or
      - The file path where the certificate and private key are stored
    
  - Update the IdP client configuration
    - Enable JWE for the client
    - Provide the public key for encryption

5. **Verification**
  - Test the complete flow with JWE enabled to ensure proper functionality.

### Troubleshooting
While setting up JWE with Tyk Identity Broker, you may encounter some challenges. This section outlines common issues and their solutions to help you navigate the implementation process smoothly. 

1. **oauth2: error decoding JWT token: jws: invalid token received, not all parts available** it means that JWE is not enabled in the profile and the IDP is already using JWE.
2. **JWE Private Key not loaded** Tyk encountered some issues while loading the certificate with the private key. Ensure that the path or certId are correct.