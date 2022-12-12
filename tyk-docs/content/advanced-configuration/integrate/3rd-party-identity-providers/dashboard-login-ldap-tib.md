---
date: 2017-03-24T17:02:11Z
title: Login into the Dashboard using LDAP - Guide
menu:
  main:
    parent: "Single Sign On"
weight: 2
url: /advanced-configuration/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib
aliases:
  - /advanced-configuration/integrate/sso/dashboard-login-ldap-tib/
---

This is an end to end worked example of how you can use LDAP and our Tyk Identity Broker (TIB) to log in to your Dashboard.

## Overview

The Tyk Dashboard is the command and control centre of your Tyk installation. It allows users to manage APIs, policies, keys, etc. All of this data is stored in the Dashboard's MonogDB database, including the user accounts. This works well in a lot of situations as it allows Tyk to be self-contained, but if you already have a centralised system for managing users then you may prefer to use that instead of a separate Tyk-specific database.

Good news, Tyk supports this!

## How it works

The Tyk Identity Broker (TIB) is an open-source project which can be used to integrate Tyk authentication with 3rd party identity providers (IDPs). You can use this to enable your Dashboard to authenticate users with your LDAP-powered identity providers such as Active Directory. TIB has been designed as a glue-code solution, so it can integrate with almost any identity provider (IDP). See [Tyk Identity Broker Configuration](/docs/tyk-configuration-reference/tyk-identity-broker-configuration/) for details on configuring the TIB.

### The High Level TIB Flow:

1. User makes an authentication request against the TIB endpoint, passing their credentials
2. TIB makes request against IDP using the credentials provided
3. TIB interprets the IDP response:

   * If successful then TIB creates a user session in the Dashboard and redirects the user to the Dashboard

   * If unsuccessful, TIB redirects the user to a failure URL

## Step-by-step implementation guide

This guide assumes you already have a Tyk environment set up, with a Gateway and Dashboard. If you don't, please follow the [Tyk On-Premises getting started guide](/docs/getting-started/installation/with-tyk-on-premises/).

The environment used for this guide is, for simplicity's sake, all contained on a single host running Ubuntu 14.04. The hostname `my-tyk-instance.com` has been set to point at `127.0.0.1`. For production environments it is recommended that each component is hosted separately and appropriate security measures are used such as HTTPS to secure connections.

All commands shown are run from inside the Tyk host environment.

### 1. Download TIB

You can download TIB from the [releases page of the TIB repository on GitHub](https://github.com/TykTechnologies/tyk-identity-broker/releases). The release names contain the architecture and version i.e. `tib-linux-<architecture>-<version>.tar.gz`. This example uses `amd64` and `0.2.1` for all the commands, but you should update them to use the latest version and relevant architecture for your platform.

First step is to download TIB onto the environment:

```{.copyWrapper}
wget https://github.com/TykTechnologies/tyk-identity-broker/releases/download/v0.2.1/tib-linux-amd64-0.2.1.tar.gz
```

### 2. Extract and store TIB

As the other Tyk components are installed in your `/opt` directory, we recommend you install TIB there too:

```{.copyWrapper}
tar -xvzf tib-linux-amd64-0.2.1.tar.gz
```

TIB will now be extracted to the directory `tib-0.2.1`, let's move this to `/opt` and change to that directory:

```{.copyWrapper}
sudo mv tib-0.2.1 /opt
cd /opt/tib-0.2.1
```

### 3. Conifgure TIB

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

### 4. Set up the LDAP profile

TIB ships with a default `profiles.json` file which contains many example configuration for different scenarios. This guide is focused on LDAP authentication for the Dashboard, so we will update `profiles.json` to contain a single profile for this purpose.

The key attributes for LDAP profile are:

* `ID`: The ID by which we will activate the profile by calling the appropriate TIB endpoint
* `OrgId`: The organisation id which the profile is connected to - make sure this is the correct id for your organisation (see the [Dashboard Admin API documentation](/docs/tyk-apis/tyk-dashboard-admin-api/organisations/) for details on how to retrieve this)
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

### 5. Start TIB

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

### 6. Create a login page

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

### 7. Update the Dashboard config

Update the Dashboard config so that any unauthenticated requests are redirected to your custom login page. We do this by updating the `sso_custom_login_url` property of the Dashboard's `tyk_analytics.conf` file, which by default is located in the `/opt/tyk-dashboard` directory. For example (ommitting all other lines in the config file and trailing comma):

```{.copyWrapper}
"sso_custom_login_url": "http://my-tyk-instance.com/login.html"
```

Since the Dashboard runs on port 3000 by default, this URL will use the default HTTP port of 80 which will be handled by Nginx.

### 8. Test that it works

Now that we have TIB installed and configured, Nginx installed and hosting our custom login page, and the Dashboard configured to redirect to that login page we can now test the solution. Remember that this example is using the LDAP provided at forumsys.com, so if you are using your own LDAP then substitute the username and password with appropriate values from your system.

1. Open a web browser (if you're already logged in to the Dashboard, logout now) and attempt to access the Dashboard - `http://my-tyk-instance.com:3000`
2. This should be redirected to the custom login page - `http://my-tyk-instance.com/login.html`
3. Enter `read-only-admin` as the username
4. Enter `password` as the password
5. Submit the form
6. You should now be logged in to the Dashboard

## Using the TIB REST API

When TIB is running you can use its REST API. See the [TIB REST API documentation](/docs/advanced-configuration/integrate/3rd-party-identity-providers/tib-rest-api/) for a full description of each endpoint.

For example, to retrieve the LDAP profile we have used in this example:

```{.copyWrapper}
GET /api/profiles/1 HTTP/1.1
Host: my-tyk-instance.com:3010
Authorization: 352d20ee67be67f6340b4c0605b044b7
```

The `Authorization` parameter is defined by the `Secret` property in the `tib.conf` file.

The request returns the data for profile 1, which for this example is:

```{.copyWrapper}
{
  "Status": "ok",
  "ID": "1",
  "Data": {
    "ID": "1",
    "OrgID": "59bfdf5b56c02c065d24638e",
    "ActionType": "GenerateOrLoginUserProfile",
    "MatchedPolicyID": "",
    "Type": "passthrough",
    "ProviderName": "ADProvider",
    "ProviderConfig": {
      "FailureRedirect": "http://my-tyk-instance.com:3000/?fail=true",
      "LDAPAttributes": [],
      "LDAPPort": "389",
      "LDAPServer": "ldap.forumsys.com",
      "LDAPUserDN": "cn=*USERNAME*,dc=example,dc=com"
    },
    "IdentityHandlerConfig": {
        "DashboardCredential": "bb5735026be4400e67ed9801c2f1e2f9"
    },
    "ProviderConstraints": {
      "Domain": "",
      "Group": ""
    },
    "ReturnURL": "http://my-tyk-instance.com:3000/tap"
  }
}
```
