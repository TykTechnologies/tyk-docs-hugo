---
date: 2017-03-27T15:00:50+01:00
title: Tyk Identity Broker Configuration Options
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 3 
url: /tyk-configuration-reference/tyk-identity-broker-configuration/
aliases:
  - /tyk-stack/tyk-manager/sso/dashboard-login-ldap-tib/
---


The Tyk Identity Broker (TIB) is configured through two files: The configuration file `tib.conf` and the profiles file `profiles.json`. TIB can also be managed via the [TIB REST API]({{< ref "tyk-identity-broker/tib-rest-api" >}}) for automated configurations.

#### The `tib.conf` file

```{.copyWrapper}
{
 "Secret": "test-secret",
 "ProfileDir": "path-to-backup-directory",
 "HttpServerOptions": {
   "UseSSL": true,
   "CertFile": "./certs/server.pem",
   "KeyFile": "./certs/server.key"
 },
 "BackEnd": {
   "Name": "in_memory",
   "IdentityBackendSettings": {
     "Hosts" : {
         "localhost": "6379"
     },
     "Username": "",
     "Password": "",
     "Database": 0,
     "EnableCluster": false,
     "MaxIdle": 1000,
     "MaxActive": 2000,
 "UseSSL": false,
 "SSLInsecureSkipVerify": false
   }
 },
 "TykAPISettings": {
   "GatewayConfig": {
     "Endpoint": "http://{GATEWAY-DOMAIN}",
     "Port": "8080",
     "AdminSecret": "352d20ee67be67f6340b4c0605b044b7"
   },
     "DashboardConfig": {
       "Endpoint": "http://{DASHBOARD-DOMAIN}",
       "Port": "3000",
       "AdminSecret": "12345"
   }
 }
}
```

### Omitting the configuration file

From TIB v1.3.1, the environment variable `TYK_IB_OMITCONFIGFILE` is provided to allow the configuration file to be omitted (ignored) when configuring TIB.

If set to TRUE, then TIB will ignore any provided configuration file and set its parameters according to environment variables. TIB will fall back to the default value for any parameters not set in an environment variable.
This is particularly useful when using Docker, as this option will ensure that TIB will load the configuration via env vars and not expect a configuration file.

The various options for `tib.conf` file are:

### secret

The REST API secret to configure the Tyk Identity Broker remotely.

(env var:**TYK_IB_SECRET**)

### ProfileDir

Directory where the backup files will be stored. Backups files are created each time that a create, update or delete action is performed over any profile (and profiles are being read from a file not from mongo, in which case it will create a new document in the `profiles_backup` collection).

(env var:**TYK_IB_PROFILEDIR**)

### HttpServerOptions.UseSSL

Set this to `true` to turn on SSL for the server, this is **highly recommended**.

(env var:**TYK_IB_HTTPSERVEROPTIONS_USESSL**)

### HttpServerOptions.KeyFile

The path to the key file for this server, required for SSL.

(env var:**TYK_IB_HTTPSERVEROPTIONS_KEYFILE**)

### HttpServerOptions.CertFile

The path to the certificate file for this server, required for SSL.

(env var:**TYK_IB_HTTPSERVEROPTIONS_CERTFILE**)

### BackEnd

TIB is quite modular and different back-ends can be generated quite easily. By default, TIB will store profile configurations in memory, which does not require any new configuration.

For Identity Handlers that provide token-based access, it is possible to enforce a "One token per provider, per user" policy, which keeps a cache of tokens assigned to identities in Redis, this is so that the broker can be scaled and share the cache across instances.

Since profiles are unlikely to change often, profiles are kept in-memory, but can be added, removed and modified using an API for automated setups if required.

### BackEnd.IdentityBackendSettings.Database

If you are using multiple databases (not supported in Redis cluster), let TIB know which DB to use for Identity caching.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_DATABASE**)

### BackEnd.IdentityBackendSettings.Username

The username for Redis AUTH, if used (recommended).

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_USERNAME**)

### BackEnd.IdentityBackendSettings.Password

The password for your Redis AUTH Username.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_PASSWORD**)

### BackEnd.IdentityBackendSettings.Hosts

Add your Redis hosts here as a map of hostname:port. Since TIB uses the same cluster driver as Tyk, it is possible to have TIB interact with your existing Redis cluster if you enable it.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_HOSTS**)

{{< note success >}}
**Note**  

To set this value via env var you must follow the declaration syntax `export TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_HOSTS="host1:port,host2:port"`

{{< /note >}}

### BackEnd.IdentityBackendSettings.MaxIdle

Max idle connections to Redis.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_MAXIDLE**)

### BackEnd.IdentityBackendSettings.MaxActive

Max active Redis connections.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_MAXACTIVE**)

### BackEnd.IdentityBackendSettings.EnableCluster

If you are using Redis cluster, enable it here to enable the slots mode.

(env var:**BackEnd.IdentityBackendSettings.EnableCluster**)

### BackEnd.IdentityBackendSettings.UseSSL

If you are using a TLS protected Redis enable to connect.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_USESSL**)

{{< note success >}}
**Note**  

This option is available from TIB v0.4.0
{{< /note >}}

### BackEnd.IdentityBackendSettings.SSLInsecureSkipVerify

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

(env var:**TYK_IB_BACKEND_IDENTITYBACKENDSETTINGS_SSLINSECURESKIPVERIFY**)

{{< note success >}}
**Note**  

This option is available from TIB v0.4.0
{{< /note >}}


### TykAPISettings

This section enables you to configure the API credentials for the various Tyk Components TIB is interacting with.

(env var:**TYK_IB_TYKAPISETTINGS**)

### TykAPISettings.GatewayConfig.Endpoint

The hostname of the Tyk Gateway (this is for token generation purposes).

(env var:**TYK_IB_TYKAPISETTINGS_GATEWAYCONFIG_ENDPOINT**)

### TykAPISettings.GatewayConfig.Port

The port to use on the Tyk Gateway host.

(env var:**TYK_IB_TYKAPISETTINGS_GATEWAYCONFIG_PORT**)

{{< note success >}}
**Note**  

For HTTP or HTTPS endpoints, you do need need to specify the default ports (80 and 443) for this setting. These two ports are handled automatically.
{{< /note >}}


### TykAPISettings.GatewayConfig.AdminSecret

The API secret for the Tyk Gateway REST API.

(env var:**TYK_IB_TYKAPISETTINGS_GATEWAYCONFIG_ADMINSECRET**)

### TykAPISettings.DashboardConfig.Endpoint

The hostname of your Dashboard (Advanced API).

(env var:**TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_ENDPOINT**)

### TykAPISettings.DashboardConfig.Port

The port of your Advanced API.

(env var:**TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_PORT**)

### TykAPISettings.DashboardConfig.AdminSecret

The high-level secret for the Advanced API. This is required because of the SSO-nature of some of the actions provided by TIB, it requires the capability to access a special SSO endpoint in the Advanced API to create one-time tokens for access.

(env var:**TYK_IB_TYKAPISETTINGS_DASHBOARDCONFIG_ADMINSECRET**)


