---
date: 2017-03-27T15:00:50+01:00
title: Tyk Identity Broker Configuration Options
menu:
  main:
    parent: "Configure"
weight: 3 
---


The Tyk Identity Broker (TIB) is configured through two files: The configuration file `tib.conf` and the profiles file `profiles.json`. TIB can also be managed via the [TIB REST API](/docs/integrate/3rd-party-identity-providers/tib-rest-api/) for automated configurations.

#### The `tib.conf` file

```{.copyWrapper}
{
 "Secret": "test-secret",
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

The various options for `tib.conf` file are:

### <a name="secret"></a> secret

The REST API secret to configure the Tyk Identity Broker remotely.

### <a name="httpserveroptions-usessl"></a> HttpServerOptions.UseSSL

Set this to `true` to turn on SSL for the server, this is *highly recommended*.

### <a name="httpserveroptions-keyfile"></a> HttpServerOptions.KeyFile

The path to the key file for this server, required for SSL.

### <a name="httpserveroptions-certfile"></a> HttpServerOptions.CertFile

The path to the certificate file for this server, required for SSL.

### <a name="backend"></a> BackEnd

TIB is quite modular and different back-ends can be generated quite easily. By default, TIB will store profile configurations in memory, which does not require any new configuration.

For Identity Handlers that provide token-based access, it is possible to enforce a "One token per provider, per user" policy, which keeps a cache of tokens assigned to identities in Redis, this is so that the broker can be scaled and share the cache across instances.

Since profiles are unlikely to change often, profiles are kept in-memory, but can be added, removed and modified using an API for automated setups if required.

### <a name="backend-database"></a> BackEnd.Database

If you are using multiple databases (not supported in Redis cluster), let TIB know which DB to use for Identity caching.

### <a name="backend-password"></a> BackEnd.Password

The password for your Redis DB (recommended).

### <a name="backend-hosts"></a> BackEnd.Hosts

Add your Redis hosts here as a map of hostname:port. Since TIB uses the same cluster driver as Tyk, it is possible to have TIB interact with your existing Redis cluster if you enable it.

### <a name="backend-maxidle"></a> BackEnd.MaxIdle

Max idle connections to Redis.

### <a name="backend-maxactive"></a> BackEnd.MaxActive

Max active Redis connections.

### <a name="backend-enablecluster"></a> BackEnd.EnableCluster

If you are using Redis cluster, enable it here to enable the slots mode.

### <a name="backend-usessl"></a> BackEnd.UseSSL

If you are using a TLS protected Redis enable to connect.

> **NOTE**: This option is available from TIB v0.4.0

### <a name="backend-sslinsecureskipverify"></a> BackEnd.SSLInsecureSkipVerify

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

> **NOTE**: This option is available from TIB v0.4.0

### <a name="tykapisettings"></a> TykAPISettings

This section enables you to configure the API credentials for the various Tyk Components TIB is interacting with.

### <a name="tykapisettings-gatewayconfig-endpoint"></a> TykAPISettings.GatewayConfig.Endpoint

The hostname of the Tyk Gateway (this is for token generation purposes).

### <a name="tykapisettings-gatewayconfig-port"></a> TykAPISettings.GatewayConfig.Port

The port to use on the Tyk Gateway host.

> **NOTE**: For HTTP or HTTPS endpoints, you do need need to specify the default ports (80 and 443) for this setting. These two ports are handled automatically.

### <a name="tykapisettings-gatewayconfig-adminsecret"></a> TykAPISettings.GatewayConfig.AdminSecret

The API secret for the Tyk Gateway REST API.

### <a name="tykapisettings-dashboardconfig-endpoint"></a> TykAPISettings.DashboardConfig.Endpoint

The hostname of your Dashboard (Advanced API).

### <a name="tykapisettings-dashboardconfig-port"></a> TykAPISettings.DashboardConfig.Port

The port of your Advanced API.

### <a name="tykapisettings-dashboardconfig-adminsecret"></a> TykAPISettings.DashboardConfig.AdminSecret

The high-level secret for the Advanced API. This is required because of the SSO-nature of some of the actions provided by TIB, it requires the capability to access a special SSO endpoint in the Advanced API to create one-time tokens for access.
