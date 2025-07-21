---
title: "Single Sign On (SS0) with LDAP"
date: 2025-01-10
tags: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
description: "Learn how to integrate external services with Tyk API Gateway. Discover how to use middleware plugins, webhooks, and service discovery to extend your API functionality and connect with third-party systems."
keywords: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
---

## Dashboard SSO with LDAP

The Tyk Dashboard is the command and control center of your Tyk installation. It allows users to manage APIs, policies, keys, etc. All of this data is stored in the Dashboard's MonogDB database, including the user accounts. 

This works well in a lot of situations as it allows Tyk to be self-contained, but if you already have a centralised system for managing users then you may prefer to use that instead of a separate Tyk-specific database.

Tyk Dashboard uses the [Tyk Identity Broker (TIB)]({{< ref "api-management/external-service-integration#what-is-tyk-identity-broker-tib" >}}) to integrate Tyk authentication with 3rd party identity providers (IDPs). You can use this to enable your Dashboard to authenticate users with your LDAP-powered identity providers such as Active Directory.

<br>

{{< note success >}}
**Note**

To activate SSO on the Dashboard or Developer portal, there’s no requirement to install TIB separately; it is integrated into the Dashboard and Developer Portal. You have two configurations for SSO within the dashboard:
1. **Using Embedded TIB**: No need to install it separately.
2. **Using External TIB**: If you are using a previous version of the Dashboard or Portal, you can still use SSO with TIB installed as a separate application.
{{< /note >}}

### Dashboard SSO with Embedded TIB

Configuring SSO with Embedded TIB is a two-step process:

1. **[Creating a Profile in Dashboard]({{< ref "#create-profile" >}})**
2. **[Testing the SSO Flow]({{< ref "#testing-the-sso-flow" >}})**

#### Create Profile

{{< img src="/img/dashboard/user-management/create-ldap-profile.png" alt="Create LDAP Profile" >}}

1.  Log in to your Tyk Dashboard.
1.  Navigate to **User management > User Settings** in the Tyk Dashboard sidebar.
2.  Click the **Create Profile** button.
3.  Under the **1. Profile action** section:
    *   In the **Name** field, enter a descriptive name for your profile (e.g., `login-with-ldap`).
    *   For **Users in this profile can:**, ensure `Login to Tyk Dashboard` is selected.
    *   In the **Redirect URL on Success** field, enter the URL where users will be redirected after a successful login (e.g., `http://localhost:3000/tap`).
    *   In the **Redirect URL on failure** field, enter the URL where users will be redirected after a failed login (e.g., `http://localhost:3000/?fail=true`).
    *   Click the **Next** button.
4.  Under the **2. Provider type** section:
    *   Select `LDAP`.
    *   Click the **Next** button.
5.  Under the **3. Profile Configuration** section (this will become active/focused after the previous step):
    *   In the **Server** field, enter the hostname or IP address of your LDAP server (e.g., `ldap.forumsys.com`).
    *   In the **Port** field, enter the port number for your LDAP server (e.g., `389`).
    *   In the **User DN** field, the distinguished name which TIB will use to identify the user - this should be updated to match your LDAP installation and must retain the `*USERNAME*` token as this is replaced by the actual username at runtime (e.g., `cn=*USERNAME*,dc=example,dc=com`).
    *   (Optional) Click **+ Advanced Settings (optional)** to configure further LDAP settings if needed.
6.  Click the **Create Profile** button.
7.  Open the created profile and copy the login URL displayed. Save it, as it will be used later in testing. (e.g., `http://localhost:3000/auth/login-with-ldap/ADProvider`)

#### Testing the SSO Flow

<a id="create-login-page"></a>

1. **Create a login page**

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
          <form method="post" action="http://localhost:3000/auth/login-with-ldap/ADProvider"> \
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

    The form action `http://localhost:3000/auth/login-with-ldap/ADProvider` is the dashboard (embedded TIB) endpoint which will start the authentication process.

    

2. **Update the Dashboard config**

    Update the Dashboard config so that any unauthenticated requests are redirected to your custom login page. We do this by updating the `sso_custom_login_url` property of the Dashboard's `tyk_analytics.conf` file, which by default is located in the `/opt/tyk-dashboard` directory. For example (ommitting all other lines in the config file and trailing comma):

    ```{.copyWrapper}
    "sso_custom_login_url": "http://localhost/login.html"
    ```

    Since the Dashboard runs on port 3000 by default, this URL will use the default HTTP port of 80 which will be handled by Nginx.

3. **Test that it works**

    1. Open a web browser (if you're already logged in to the Dashboard, logout now) and attempt to access the Dashboard - `http://localhost:3000`
    2. This should be redirected to the custom login page - `http://localhost/login.html`
    3. Enter `read-only-admin` as the username
    4. Enter `password` as the password
    5. Submit the form
    6. You should now be logged in to the Dashboard

### Dashboard SSO with External TIB

This guide assumes you already have a Tyk environment set up, with a Gateway and Dashboard. If you don't, please follow the [Tyk Self-Managed getting started guide]({{< ref "tyk-self-managed/install" >}}).

The environment used for this guide is, for simplicity's sake, all contained on a single host running Ubuntu 14.04. The hostname `my-tyk-instance.com` has been set to point at `127.0.0.1`. For production environments it is recommended that each component is hosted separately and appropriate security measures are used such as HTTPS to secure connections.

All commands shown are run from inside the Tyk host environment.

#### Setup TIB

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

#### Create Profile

1. **Set up the LDAP profile**

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

2. **Start TIB**

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


#### Test the SSO Flow

<a id="create-login-page"></a>

1. **Create a login page**

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

2. **Update the Dashboard config**

    Update the Dashboard config so that any unauthenticated requests are redirected to your custom login page. We do this by updating the `sso_custom_login_url` property of the Dashboard's `tyk_analytics.conf` file, which by default is located in the `/opt/tyk-dashboard` directory. For example (ommitting all other lines in the config file and trailing comma):

    ```{.copyWrapper}
    "sso_custom_login_url": "http://my-tyk-instance.com/login.html"
    ```

    Since the Dashboard runs on port 3000 by default, this URL will use the default HTTP port of 80 which will be handled by Nginx.

3. **Test that it works**

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


