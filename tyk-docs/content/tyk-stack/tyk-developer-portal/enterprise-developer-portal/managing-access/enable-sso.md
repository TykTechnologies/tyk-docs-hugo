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

In this section, you’ll learn how to enable single sign-on for admin users with 3rd party identity providers.

## Prerequisites

- A Tyk Enterprise portal installation.

## Step by step instructions

1. [Install Tyk Identity Broker]({{< ref "/content/tyk-identity-broker/getting-started.md" >}}).
2. Create TIB configuration file to work with the Developer portal:
```.json
{
"Secret":"test-secret",
"HttpServerOptions":{
"UseSSL":false,
"CertFile":"./certs/server.pem",
"KeyFile":"./certs/server.key"
},
"BackEnd":{
"Name":"in_memory",
"ProfileBackendSettings":{

        },
        "IdentityBackendSettings":{
            "Hosts":{
                "localhost":"6379"
            },
            "Password":"",
            "Database":0,
            "EnableCluster":false,
            "MaxIdle":1000,
            "MaxActive":2000
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
**TykAPISettings.DashboardConfig.Endpoint** is the Developer portal url. Pay attention if any of the elements (TIB or Portal) is running on containers.
**TykAPISettings.DashboardConfig.Port** is the Developer portal port.
**TykAPISettings.DashboardConfig.AdminSecret** is `PortalAPISecret` in the configuration file of the Developer portal.
The full reference for the configuration file is in [the TIB section of the documentation]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}}).

3. Create a TIB profile to work on your identity provider. Navigate to the [TIB configuration section]({{< ref "advanced-configuration/integrate/sso/" >}}) for step-by-step instructions.
4. Once TIB profile is created, you need to change the following parameter:
- **OrgID** must be 0 for being accepted as a provider-admin or super-admin.
- **IdentityHandlerConfig.DashboardCredential** is `PortalAPISecret` in the configuration file of the Developer portal.
- **ReturnURL** should be "http://{portal host}:{portal port}/sso".
- **ProviderConfig.FailureRedirect** should be "http://{portal host}:{portal port}/?fail=true".
5. Create a login page for admin users. We don't supply a login page for single sign-on out of the box so you need to create one.
   Here is an example of such page:
```html
<html>
    <head>
      <title>Tyk Developer portal login</title>
    </head>
    <body>
      <b> Login to the Developer portal</b>
      <form method=“post” action=“http://localhost:3010/auth/1/ldap”>
        username: <input type=“text” name=“username”/> <br/>
        password: <input type=“text” name=“password”/> <br/>
        <input type=“submit” value=“login”>
      </form>
    </body>
</html>
```

6. Now you should be able to login with your identity provider.