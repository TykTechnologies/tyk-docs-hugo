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

### What are the TIB Profiles?

TIB takes as input one or many profiles that are stored in mongo or a file (it depends on the type of installation), a profile is a configuration that outlines of how to match a identity provider with a handler and what action to perform (Example: enable Dashboard SSO using OpenID and Microsoft Azure as IDP). The Dashboard adds a user interface to manage the profiles.

{{< img src="https://user-images.githubusercontent.com/4504205/105425983-58940c00-5c18-11eb-9c8c-ede3b8bae000.gif" alt="Identity Broker User Interface" >}}

### Anatomy of a Profile
Each profile is outlined by a series of attributes that will describe: action to perform, IDP to connect, URL's to redirect on success and failure, etc.
In order to know and understand each of the attributes, implications as well as configure your own profile please consult the profile structure below:

#### Fields that are common for all the providers

| Field                                     | Description                                                                                                                                                                                                                                   | Required |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| ID                                        | Id of the profile, is a string, use the name of the profile                                                                                                                                                                                   | Yes      |
| OrgID                                     | Organization ID                                                                                                                                                                                                                               | Yes      |
| ActionType                                | Which action is expected to be executed while using this profile, valid values are:<br><br>GenerateOrLoginDeveloperProfile: sso portal<br>GenerateOrLoginUserProfile: sso dashboard<br>GenerateOAuthTokenForClient: generate oauth tokens<br> | Yes      |
| Type                                      | Valid values are:<br>passthrough: for LDAP and ProxyProvider<br>redirect: for SAML and Social<br>                                                                                                                                             | Yes      |
| CustomEmailField                          | Name of the claim associated with the email value stored in the IDP (Identity Provider).                                                                                                                                                      | No       |
| CustomUserIDField                         | Name of the claim associated with the User ID value stored in the IDP (Identity Provider).                                                                                                                                                    | No       |
| IdentityHandlerConfig.DashboardCredential | Api Key that will be used to consume the dashboard api to issue nonce codes and validate user data                                                                                                                                            | yes      |
| ReturnURL                                 | Where to redirect and send the claims from the idp on login. For dashboard SSO it would be:<br>- http://dashboard-host/tap<br><br>For classic portal SSO:<br>http://{portal-host}/sso<br>                                                     | yes      |
| DefaultUserGroup                          | When mapping groups, if not found the group then to which one fallback                                                                                                                                                                        | No       |
| CustomUserGroupField                      | When mapping groups, if a group is not found, specify which group to fallback to.                                                                                                                                                             | No       |
| UserGroupMapping                          | Map that contains the matching between tyk groups and idp group.                                                                                                                                                                              | No       |
| UserGroupSeparator                        | The IDP might send the groups to which the user belongs to as a single string separated by any symbol or empty spaces, with this field you can set which symbol to use to split as an array                                                   | No       |
| SSOOnlyForRegisteredUsers                 | A boolean value to restrict the SSO only to users that already exists in the database. Users that do not exist in the database and successfully logins in the IDP will not have access to tyk                                                 | No       |


#### LDAP


### Examples

Depending on your authentication protocol you might find some working examples in the following links:

- [Social Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/Social-Identity-Provider)
- [LDAP Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/LDAP)
- [Proxy Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/Proxy-Identity-Provider)
- [SAML Provider](https://github.com/TykTechnologies/tyk-identity-broker/wiki/SAML)
