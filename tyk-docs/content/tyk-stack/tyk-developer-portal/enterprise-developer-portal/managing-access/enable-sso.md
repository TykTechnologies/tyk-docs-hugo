---
title: "Enable single sign on for admin users"
date: 2022-02-10
tags: [""]
description: ""
menu:
  main:
    parent: "Manage API Users"
weight: 4
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction
Single sign-on (SSO) enables users to access multiple applications using one set of login credentials,
reducing the burden of password management and improving security. SSO is relevant for businesses of all sizes,
streamlining access control and improving user experience. Regardless of your organization's size, implementing SSO can enhance security,
simplify access to enterprise resources, and strengthen user satisfaction.


In this section, you’ll learn how to enable single sign-on for admin users and developers in the Tyk Enterprise Developer portal with 3rd party identity providers (IDPs).

## Prerequisites
- A Tyk Enterprise portal installation
- [Supported](https://github.com/TykTechnologies/tyk-identity-broker#using-identity-providers) 3rd party identity provider up and running 

## Configure Tyk Identity Broker to work with Tyk Enterprise Developer Portal
The Tyk Enterprise Developer portal uses the [Tyk Identity Broker](https://tyk.io/docs/tyk-identity-broker/) to work with various Identity Management Systems, such as LDAP,
Social OAuth (e.g., GPlus, Twitter, GitHub), or Basic Authentication providers. Therefore, to configure Single Sign-On for the portal,
you need to install and configure Tyk Identity Broker first. Follow these steps to achieve this:
1. [Install Tyk Identity Broker]({{< ref "/content/tyk-identity-broker/getting-started.md" >}})
2. Create TIB configuration file to work with the Developer portal:
```.json
{
    "Secret":"test-secret",
    "HttpServerOptions":{
        "UseSSL":false,
        "CertFile":"./certs/server.pem",
        "KeyFile":"./certs/server.key"
    },
    "SSLInsecureSkipVerify": true,
	"BackEnd": {
		"Name": "in_memory",
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
    "TykAPISettings":{
        "DashboardConfig":{
            "Endpoint":"https://{your portal host}",
            "Port":"{your portal port}",
            "AdminSecret":"portal-api-secret"
        }
    }
}
```
Setting reference:
- **TykAPISettings.DashboardConfig.Endpoint** is the Developer portal url. Pay attention if any of the elements (TIB or Portal) is running on containers.
- **TykAPISettings.DashboardConfig.Port** is the Developer portal port.
- **TykAPISettings.DashboardConfig.AdminSecret** is `PortalAPISecret` in the configuration file of the Developer portal.

The full reference for the configuration file is in [the TIB section of the documentation]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}).

## Configure Single Sign-On for admin users and developers

### What is the Tyk Identity Broker profile
The Tyk Identity Broker (TIB )uses profile to define details related to the identity provider such as its type and access credentials, and instructs TIB on how to treat users that try log in with that provider.
In this guide, you will create two TIB profiles for admins users and developers. This allows you to have different identity providers for admins and developers as well as for internal and external users.
Here is an example of such profile: 
```.json
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "{ID of your TIB profile,}",
  "OrgID": "{portal organisation ID}",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{portal API secret}"
  },
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB host}:{TIB port}",
    "FailureRedirect": "http://{portal host}:{portal port}/?fail=true",
    "UseProviders": [
      {
        "Name": "openid-connect",
        "Key": "{oAuth2.0 key}",
        "Secret": "{oAuth2.0 secret}",
        "DiscoverURL": "{OIDC well-known endpoint}"
      }
    ]
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{portal host}:{portal port}/sso",
  "Type": "redirect"
}
```

Please refer to [the Tyk Identity Broker configuration](https://github.com/TykTechnologies/tyk-identity-broker#using-identity-providers) for all configuration options.

### Configure Single Sign-On for admin users
The Tyk Enterprise Developer portal has two audiences: developers and admins. This section provides guidance on implementing
Single Sign-On for admin users. The configuration is rather straightforward, and you need to take these three steps
to enable Single Sign-On for admin users in your portal instance:
1. Create a profile for the Tyk Identity Broker (TIB) to work on your identity provider. Make sure the ActionType is equal to "GenerateOrLoginUserProfile", and OrgID is equal to "0":
```.json
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "{ID of your TIB profile}",
  "OrgID": "0",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{portal API secret}"
  },
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB host}:{TIB port}",
    "FailureRedirect": "http://{portal host}:{portal port}/?fail=true",
    "UseProviders": [
      {
        "Name": "openid-connect",
        "Key": "{oAuth2.0 key}",
        "Secret": "{oAuth2.0 secret}",
        "DiscoverURL": "{OIDC well-known endpoint}"
      }
    ]
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{portal host}:{portal port}/sso",
  "Type": "redirect"
}
```
In the above example, you need to specify the following parameters:
- `OrgID` must be `"0"` for being accepted as a provider-admin or super-admin
- `ActionType` must be equal to `"GenerateOrLoginUserProfile"`
- `IdentityHandlerConfig.DashboardCredential` must be equal to the `PortalAPISecret` field in the configuration file of the portal
- Replace `{portal host}` and `{portal port}` with the actual host and port on which your portal instance is running. Also, replace `http` with `https` for the respective fields if you use https for your portal instance
- Replace `{TIB host}` and `{TIB port}` with the actual host and port on which your TIB instance is running. Also, replace `http` with `https` for the respective fields if you use https for your TIB instance
- In the `"ID"` field, specify an ID of this TIB profile. You can select any value for this field that consists of digits, letters, and special signs, no spaces allowed. It is better to pick a human-readable ID for your profile for better maintainability of the configuration

Please refer to the [TIB configuration section]({{< ref "advanced-configuration/integrate/sso" >}}) for step-by-step instructions for setting up the UseProviders section.
Any changes to the TIB profile will be effective after restarting you TIB instance.

2. Create a login page for admin users. We don't supply a login page for Single Sign-On out of the box, so you need to create one.
   Here is an example of such page that works with a profile for LDAP identity management system:
```.html
<html>
    <head>
      <title>Tyk Developer portal login</title>
    </head>
    <body>
      <b> Login to the Developer portal</b>
      <form method=“post” action=“http://{Tyk Identity Broker host}:{Tyk Identity Broker port}/auth/{profile ID}/ldap”>
        username: <input type=“text” name=“username”/> <br/>
        password: <input type=“text” name=“password”/> <br/>
        <input type=“submit” value=“login”>
      </form>
    </body>
</html>
```
3. Now you should be able to log in to the portal with your identity provider as an admin user

### Configure Single Sign-On for developers
This section relates to configuration and settings required to set up Single Sign-On for developers. Configuration for developers is also straight forward.
However, for developers there is one additional.

#### User group mapping
In order to land a developer into the right API Consumer organisation, it is necessary to configure the UserGroupMapping
in the TIB profile that creates a binding between user groups in your IDP and developer teams in the portal.

{{< img src="/img/dashboard/portal-management/enterprise-portal/user-group-mapping.png" alt="User group mapping" width="600">}}

The portal uses the following algorithm to determine if it should let a developer to login and to which team should the developer join,
{{< img src="/img/dashboard/portal-management/enterprise-portal/user-group-mapping-algorithm.png" alt="User group mapping algorithm" width="1000">}}

#### Configure profile to enable Single Sign-On for developers
Follow these steps to enable Single Sign-On for developers: 
1. Create a profile for the Tyk Identity Broker (TIB) to work on your identity provider. Make sure the ActionType is equal to "GenerateOrLoginUserProfile", and OrgID is equal to "0":
```.json
{
  "ActionType": "GenerateOrLoginDeveloperProfile",
  "ID": "{ID of your TIB profile}",
  "OrgID": "0",
  "IdentityHandlerConfig": {
    "DashboardCredential": "{ID of your TIB profile}"
  },
  "ProviderConfig": {
    "CallbackBaseURL": "http://{TIB host}:{TIB port}",
    "FailureRedirect": "http://{portal host}:{portal port}/?fail=true",
    "UseProviders": [
      {
        "Name": "openid-connect",
        "Key": "{oAuth2.0 key}",
        "Secret": "{oAuth2.0 secret}",
        "DiscoverURL": "{OIDC well-known endpoint}"
      }
    ]
  },
  "ProviderName": "SocialProvider",
  "ReturnURL": "http://{portal host}:{portal port}/sso",
  "Type": "redirect",
  "CustomUserGroupField": "{your group ID field}",
  "UserGroupMapping": {
    "{IDP group ID}": "{portal team ID}"
  },
  "DefaultUserGroupID": "{portal team ID}"
}
```
In the above example, you need to specify the following parameters:
- `OrgID` could be anything as its value is ignored;
- `ActionType` must be equal to `"GenerateOrLoginDeveloperProfile"`
- `IdentityHandlerConfig.DashboardCredential` must be equal to the `PortalAPISecret` field in the configuration file of the portal
- Replace `{portal host}` and `{portal port}` with the actual host and port on which your portal instance is running. Also, replace `http` with `https` for the respective fields if you use https for your portal instance
- Replace `{TIB host}` and `{TIB port}` with the actual host and port on which your TIB instance is running. Also, replace `http` with `https` for the respective fields if you use https for your TIB instance
- In the `"ID"` field, specify an ID of this TIB profile. You can select any value for this field that consists of digits, letters, and special signs, no spaces allowed. It is better to pick a human-readable ID for your profile for better maintainability of the configuration
- `CustomUserGroupField` must be equal to the JWT claim name that refers to the user group in your IDP
- `UserGroupMapping` an object that defines relationship between user groups in the IDP and teams in the portal. The optional parameter, if not specified, will cause the portal to rely on the `DefaultUserGroupID` field to determine which team a developer should log in to. Please refer to the [User group mapping section]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso#user-group-mapping" >}} ) for guidance
- `DefaultUserGroupID` is the default organization that the portal will use to determine which team a developer should be logged in to if it is not able to find a UserGroupMapping for that developer
2. Create a login page for developers. We don't supply a login page for Single Sign-On out of the box, so you need to create one.
   Here is an example of such page that works with a profile for LDAP identity management system:
```.html
<html>
    <head>
      <title>Tyk Developer portal login</title>
    </head>
    <body>
      <b> Login to the Developer portal</b>
      <form method=“post” action=“http://{Tyk Identity Broker host}:{Tyk Identity Broker port}/auth/{profile ID}/ldap”>
        username: <input type=“text” name=“username”/> <br/>
        password: <input type=“text” name=“password”/> <br/>
        <input type=“submit” value=“login”>
      </form>
    </body>
</html>
```
3. Now you should be able to log in to the portal with your identity provider as a developer