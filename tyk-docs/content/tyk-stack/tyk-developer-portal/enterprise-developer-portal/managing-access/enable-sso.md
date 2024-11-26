---
title: "Enable single sign on for admin users and developers"
date: 2022-02-10
tags: ["Tyk Developer Portal","Enterprise Portal", "single sign on", "SSO"]
description: "How to enable single sign on for admin users and developers"
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

## Configure Tyk Enterprise Developer portal for SSO
Configuration on the portal side is quite straightforward. You need to specify the portal SSO API secret that acts as a credential for the APIs that are used by TIB for communication with the portal within Single Sign-On flow.
You can use any value for the portal SSO API secret, but it should be consistent with [TIB configuration]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso#configure-tyk-identity-broker-to-work-with-tyk-enterprise-developer-portal" >}}).

To specify the portal SSO API secret, add the `PORTAL_API_SECRET` variable to [the portal .env file]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#sample-env-file" >}}):
```.ini
PORTAL_API_SECRET=your-portal-api-secret
```

If you use [the Tyk helm chart]({{< ref "tyk-self-managed/tyk-helm-chart#installing-tyk-enterprise-developer-portal" >}}), it is required to add the `PORTAL_API_SECRET` to extraEnvs:
```.yaml
extraEnvs:
- name: PORTAL_API_SECRET
  value: "your-portal-api-secret"
```

## Configure Tyk Identity Broker to work with Tyk Enterprise Developer Portal
The Tyk Enterprise Developer portal uses the [Tyk Identity Broker](https://tyk.io/docs/tyk-identity-broker/) to work with various Identity Management Systems, such as LDAP,
Social OAuth (e.g., GPlus, Twitter, GitHub), or Basic Authentication providers. Therefore, to configure Single Sign-On for the portal,
you need to install and configure Tyk Identity Broker first. Follow these steps to achieve this:

### Install Tyk Identity Broker
Please refer to [the TIB installation guide documentation]({{< ref "tyk-identity-broker/getting-started#installing-tib-as-separate-application" >}}) for different installation options:
- [Docker](https://hub.docker.com/r/tykio/tyk-identity-broker/#the-tibconf-file)
- [packages](https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb)
- [Tyk helm chart]({{< ref "tyk-identity-broker/getting-started#via-helm-chart-for-kubernetes" >}})

### Specify TIB settings to work with the Tyk Enterprise Developer portal

#### Docker or packages

Create tib.conf file for [the Docker installation](https://hub.docker.com/r/tykio/tyk-identity-broker/#the-tibconf-file) or if you use [packages](https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb) to deploy TIB:
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
            "AdminSecret":"{portal-api-secret}"
        }
    }
}
```
Setting reference:
- **TykAPISettings.DashboardConfig.Endpoint** is the Developer portal url. Pay attention if any of the elements (TIB or Portal) is running on containers.
- **TykAPISettings.DashboardConfig.Port** is the Developer portal port.
- **TykAPISettings.DashboardConfig.AdminSecret** is `PortalAPISecret` in the configuration file of the Developer portal.

The full reference for the configuration file is in [the TIB section of the documentation]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}).
#### Helm charts
If you wish ot deploy TIB in Kubernetes via [Tyk helm chart]({{< ref "tyk-identity-broker/getting-started#via-helm-chart-for-kubernetes" >}}), you need to specify TIB config as extraVars:
```.yaml
extraEnvs:
  - name: TYK_IB_HTTPSERVEROPTIONS_CERTFILE
    value: "./certs/server.pem"
  - name: TYK_IB_HTTPSERVEROPTIONS_KEYFILE
    value: "./certs/server.key"
  - name: TYK_IB_SSLINSECURESKIPVERIFY
    value: "true"
  - name: TYK_IB_BACKEND_NAME
    value: "in_memory"
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_HOSTS
    value: "redis.tyk-cp:6379"
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_PASSWORD
    value: ""
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_DATABASE
    value: "0"
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_ENABLECLUSTER
    value: "false"
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_MAXIDLE
    value: "1000"
  - name: TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_MAXACTIVE
    value: "2000"
  - name: TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_ENDPOINT
    value: "https://{your portal host}"
  - name: TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_PORT
    value: "{your portal port}"
  - name: TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_ADMINSECRET
    value: "{portal-api-secret}"
```

The full reference for the configuration file is in [the TIB section of the documentation]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}).

## Configure Single Sign-On for admin users and developers

### What is the Tyk Identity Broker profile
The Tyk Identity Broker (TIB) uses [profiles]({{< ref "tyk-stack/tyk-identity-broker/about-profiles" >}}) to define details related to the identity provider such as its type and access credentials, and instructs TIB on how to treat users that try log in with that provider.
In this guide, you will create two TIB profiles for admins users and developers. This allows you to have different identity providers for admins and developers as well as for internal and external users.

Depending on your installation options for TIB, you need to specify profiles via a json file (for Docker or packages) or via a ConfigMap (for Tyk Helm Chart).

#### profiles.json for Docker or packages installation
Here is an example of profiles.json file for Docker or packages installation:
```.json
[
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
          "DiscoverURL": "OIDC well-known endpoint"
        }
      ]
    },
    "ProviderName": "SocialProvider",
    "ReturnURL": "http://{portal host}:{portal port}/sso",
    "Type": "redirect"
  },
  {
    "ActionType": "GenerateOrLoginDeveloperProfile",
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
          "DiscoverURL": "OIDC well-known endpoint"
        }
      ]
    },
    "ProviderName": "SocialProvider",
    "ReturnURL": "http://{portal host}:{portal port}/sso",
    "Type": "redirect",
    "DefaultUserGroupID": "1"
  }
]
```

#### ConfigMap for Tyk Helm chart installation
Here is an example of ConfigMap for the Tyk Helm chart installation:
```.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tyk-tib-profiles-conf
data:
  profiles.json: |
    [{
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
            "DiscoverURL": "OIDC well-known endpoint"
          }
        ]
      },
      "ProviderName": "SocialProvider",
      "ReturnURL": "http://{portal host}:{portal port}/sso",
      "Type": "redirect"
    },
    {
      "ActionType": "GenerateOrLoginDeveloperProfile",
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
            "DiscoverURL": "OIDC well-known endpoint"
          }
        ]
      },
      "ProviderName": "SocialProvider",
      "ReturnURL": "http://{portal host}:{portal port}/sso",
      "Type": "redirect",
      "DefaultUserGroupID": "1"
    }]
```

### Configure Single Sign-On for admin users
The Tyk Enterprise Developer portal has two audiences: developers and admins. This section provides guidance on implementing
Single Sign-On for admin users. The configuration is rather straightforward, and you need to take these three steps
to enable Single Sign-On for admin users in your portal instance:
1. Create a profile for the Tyk Identity Broker (TIB) to work on your identity provider. Make sure the ActionType is equal to "GenerateOrLoginUserProfile", and OrgID is equal to "0":
```.json
[{
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
}]
```
In the above example, you need to specify the following parameters:
- `OrgID` must be `"0"` for being accepted as a provider-admin or super-admin
- `ActionType` must be equal to `"GenerateOrLoginUserProfile"`
- `IdentityHandlerConfig.DashboardCredential` must be equal to the `PortalAPISecret` field in the configuration file of the portal
- Replace `{portal host}` and `{portal port}` with the actual host and port on which your portal instance is running. Also, replace `http` with `https` for the respective fields if you use https for your portal instance
- Replace `{TIB host}` and `{TIB port}` with the actual host and port on which your TIB instance is running. Also, replace `http` with `https` for the respective fields if you use https for your TIB instance
- In the `"ID"` field, specify an ID of this TIB profile. You can select any value for this field that consists of digits, letters, and special signs, no spaces allowed. It is better to pick a human-readable ID for your profile for better maintainability of the configuration

{{< note info >}}
**Nuances of OIDC configuration**

To ensure that the portal can log in a user with your OIDC Identity provider, you may need to either explicitly specify the email scopes in a profile
configuration or configure your IDP to include the email claim in the JWT. Failure to include the email scope in the JWT
would result in the portal not having access to the user's email.

As an example, for Okta, you can use the following configuration:
```yaml
"UseProviders": [
  {
    "Name": "openid-connect",
    "Key": "{oAuth2.0 key}",
    "Secret": "{oAuth2.0 secret}",
    "Scopes": ["openid", "email"],
    "DiscoverURL": "{OIDC well-known endpoint}"
  }
]
```

{{< /note >}}

Please refer to the [TIB configuration section]({{< ref "advanced-configuration/integrate/sso" >}}) for step-by-step instructions for setting up the UseProviders section.
Any changes to the TIB profile will be effective after restarting your TIB instance.

2. Create a login page for admin users. We don't supply a login page for Single Sign-On out of the box, so you need to create one.
Here is an example of such page that works with a profile for LDAP identity management system:
```.html
<html>
    <head>
      <title>Tyk Developer portal login</title>
    </head>
    <body>
      <b> Login to the Developer portal</b>
      <form method="post" action="http://{Tyk Identity Broker host}:{Tyk Identity Broker port}/auth/{profile ID}/ldap">
        username: <input type="text" name="username"/> <br/>
        password: <input type="text" name="password"/> <br/>
        <button type="submit">Login</button>
      </form>
    </body>
</html>
```
3. Now you should be able to log in to the portal with your identity provider as an admin user

### Configure Single Sign-On for developers
This section relates to configuration and settings required to set up Single Sign-On for developers. Configuration for developers is also straight forward.
However, for developers there is one additional.

#### User group mapping
In order to land a developer into the right API Consumer organization, it is necessary to configure the UserGroupMapping
in the TIB profile that creates a binding between user groups in your IDP and developer teams in the portal.

{{< img src="/img/dashboard/portal-management/enterprise-portal/user-group-mapping.png" alt="User group mapping" width="600">}}

To define the user group mapping for your developer audience, you need to add the UserGroupMapping object to the corresponding TIB profile:
```yaml
  "UserGroupMapping": {
    "{IDP groupA ID}": "{portal teamA ID}",
    "{IDP groupB ID}": "{portal teamB ID}",
    ...
  }
```

The `UserGroupMapping` object contains keys that refer to group IDs in your IDP, and the corresponding values are team IDs in the portal.
When the Tyk Identity Broker authorizes a user, it searches for a key that matches the user's group ID in the IDP.
If TIB can't find a matching group ID, it logs the user in to the team with an ID equal to `DefaultUserGroupID` in the portal (if `DefaultUserGroupID` is defined).
We recommend always defining `DefaultUserGroupID` and ensuring that it refers to a valid team ID in your portal instance. If `DefaultUserGroupID` is defined but refers to an invalid team ID, the portal will refuse login attempts.

If no matching group ID is found in the `UserGroupMapping` object and `DefaultUserGroupID` isn't defined, the portal logs in the user to the "Default organization | All users" team with an ID of 1.

To determine whether a developer should be allowed to log in and which team they should be logged into, the portal uses the following algorithm:
{{< img src="/img/dashboard/portal-management/enterprise-portal/user-group-mapping-algorithm.png" alt="User group mapping algorithm" width="1000">}}


#### Configure profile to enable Single Sign-On for developers
Follow these steps to enable Single Sign-On for developers: 
1. Create a profile for the Tyk Identity Broker (TIB) to work on your identity provider. Make sure the ActionType is equal to "GenerateOrLoginUserProfile", and OrgID is equal to "0":
```.json
[{
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
}]
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

{{< note info >}}
**Nuances of OIDC configuration**

To ensure that the portal can log in a user with your OIDC Identity provider, you may need to either explicitly specify the email scopes in a profile
configuration or configure your IDP to include the email claim in the JWT. Failure to include the email scope in the JWT
would result in the portal not having access to the user's email.

As an example, for Okta, you can use the following configuration:
```json
"UseProviders": [
  {
    "Name": "openid-connect",
    "Key": "{oAuth2.0 key}",
    "Secret": "{oAuth2.0 secret}",
    "Scopes": ["openid", "email"],
    "DiscoverURL": "{OIDC well-known endpoint}"
  }
]
```

{{< /note >}}

2. Create a login page for developers. We don't supply a login page for Single Sign-On out of the box, so you need to create one.
Here is an example of such page that works with a profile for LDAP identity management system:
```.html
<html>
    <head>
      <title>Tyk Developer portal login</title>
    </head>
    <body>
      <b> Login to the Developer portal</b>
      <form method="post" action="http://{Tyk Identity Broker host}:{Tyk Identity Broker port}/auth/{profile ID}/ldap">
        username: <input type="text" name="username"/> <br/>
        password: <input type="text" name="password"/> <br/>
        <button type="submit">Login</button>
      </form>
    </body>
</html>
```
3. Now you should be able to log in to the portal with your identity provider as a developer