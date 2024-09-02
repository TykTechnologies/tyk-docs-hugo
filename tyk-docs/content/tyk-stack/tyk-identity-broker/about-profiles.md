--- 
date: 2021-19-01T23:42:00+13:00
title: About TIB Profiles
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 2
aliases:
  - "/getting-started/tyk-components/tyk-identity-broker/profiles"
---

## What are the TIB Profiles?

TIB takes as input one or many profiles that are stored in mongo or a file (it depends on the type of installation), a profile is a configuration that outlines of how to match a identity provider with a handler and what action to perform (Example: enable Dashboard SSO using OpenID and Microsoft Azure as IDP). The Dashboard adds a user interface to manage the profiles.

{{< img src="https://user-images.githubusercontent.com/4504205/105425983-58940c00-5c18-11eb-9c8c-ede3b8bae000.gif" alt="Identity Broker User Interface" >}}

## Anatomy of a Profile
Each profile is outlined by a series of attributes that will describe: action to perform, IDP to connect, URL's to redirect on success and failure, etc.
In order to know and understand each of the attributes, implications as well as configure your own profile please consult the profile structure below:

### Fields that are common for all the providers

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


### LDAP profile fields

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
| GetAuthFromBAHeader    | On handle the request, wether to gather the user and password from the Authorization header in the request. Its a boolean value | No                            |
| SlugifyUserName        | If its required to make the username url friendly.This is a boolean value                                                       | No                            |

### ProxyProvider profile fields

| Field                              | Description                                                                                                                                                                                                                                                                                                                           | Required                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| TargetHost                         | URL of the server                                                                                                                                                                                                                                                                                                                     | Yes                                          |
| OKCode                             | Is used to determine if the response from the target service was successful. If the response code matches this value, the identity broker treats it as a successful interaction.                                                                                                                                                      | No. But one of the OkFields should be filled |
| OKResponse                         | This field specifies a particular string that should match with the  response body to be considered successful.                                                                                                                                                                                                                       | No. But one of the OkFields should be filled |
| OKRegex                            | Is used to validate the content of the response beyond just the HTTP status code. If the response body contains data that matches this regular expression, it is considered a successful response.                                                                                                                                    | No. But one of the OkFields should be filled |
| ResponseIsJson                     | This parameter helps the identity broker understand how to interpret the response body from the target service. If ResponseIsJson is set to true, the broker will expect the response to be in JSON format and will process it accordingly. This includes parsing JSON data to extract relevant information. This is a boolean field. | No                                           |
| AccessTokenField                   | Field where the access token comes                                                                                                                                                                                                                                                                                                    | No                                           |
| UsernameField                      | Name of the field in which the username comes                                                                                                                                                                                                                                                                                         | No                                           |
| ExrtactUserNameFromBasicAuthHeader | On handle the request, wether to gather the user and password from the Authorization header in the request. Its a boolean value                                                                                                                                                                                                       | No                                           |
### Social profile fields

| Field                            | Description                                                                                                                                                                   | Required                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| CallbackBaseURL                  | URL to be redirected on success login                                                                                                                                         | Yes                                                              |
| FailureRedirect                  | URL to be redirected on failure                                                                                                                                               | Yes                                                              |
| UseProviders.Name                | Name of the provider to be used. Valid values: `gplus`, `github`, `twitter`, `linkedin`, `dropbox`, `digitalocean`, `bitbucket`, `salesforce`, `openid-connect`                                 | Yes                                                              |
| UseProviders.Key                 | Oauth Client key                                                                                                                                                              | yes                                                              |
| UseProviders.Secret              | Oauth Client Secret                                                                                                                                                           | yes                                                              |
| UseProviders.DiscoverURL         | used to dynamically retrieve the OpenID Provider's configuration metadata, including endpoints and supported features, in JSON format from /.well-known/openid-configuration. | Only required when using openid-connect                          |
| UseProviders.Scopes              | Specifies the level of access or permissions a client is requesting from the user and the authorization server, for example ["openid","email"].                                                   | No, however when using openID the scope ‘openid’ should be added |
| UseProviders.SkipUserInfoRequest | Determines whether to bypass the *UserInfo* endpoint request, improving performance by relying on the ID token alone for user details.                                          | No                                                               |


## Examples

Depending on your authentication protocol you might find some working examples in the following links:

- [Social Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/Social-Identity-Provider)
- [LDAP Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/LDAP)
- [Proxy Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/Proxy-Identity-Provider)
- [SAML Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/SAML)
