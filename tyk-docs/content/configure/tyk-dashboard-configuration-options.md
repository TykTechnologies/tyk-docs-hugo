---
date: 2017-03-27T14:55:44+01:00
title: Tyk Dashboard Configuration Options
menu:
  main:
    parent: "Configure"
weight: 2 
---

The Tyk Dashboard has a separate configuration file, it is small and comes packaged with the tarball. Tyk Dashboard uses a separate configuration file as it may be installed on a different host to your Tyk nodes.

The dashboard configuration file can be found in the `tyk-dashboard` folder and by default is called `tyk_analytics.conf`, though it can be renamed and specified using the `--conf` flag.

The file will look like the sample below, the various fields are explained in the following sections:

```
    {
        "listen_port": 3000,
        "tyk_api_config": {
            "Host": "http://localhost",
            "Port": "80",
            "Secret": "352d20ee67be67f6240c4c0605b045b7"
        },
        "mongo_url": "mongodb://localhost/tyk_analytics",
        "page_size": 10,
        "shared_node_secret": "abcdefg",
        "admin_secret": "12345",
        "redis_port": 6379,
        "redis_host": "localhost",
        "redis_password": "",
        "redis_hosts": {
            "server1": "6379",
            "server2": "6380",
            "server23: "6381",
        },
        "enable_cluster": false
        "force_api_defaults": false,
        "notify_on_change": true,
        "license_key": "..."
        "hash_keys": true,
        "email_backend": {
            "enable_email_notifications": true,
            "code": "mandrill",
            "settings": {
                "ClientKey": "YOUR_MANDRILL_KEY"
            },
            "default_from_email": "you@domain.com",
            "default_from_name": "The Dude at Domain.com"
        },
        "hide_listen_path": false,
        "use_sentry": false,
        "sentry_code": "YOUR_SENTRY_URL",
        "sentry_js_code": "YOUR_SENTRY_URL",
        "show_org_id": true,
        "enable_duplicate_slugs": true,
        "host_config" : {
            "override_hostname": "",
            "disable_org_slug_prefix": true,
            "enable_host_names": false,
            "hostname": "",
            "portal_domains": {},
            "portal_root_path": "/portal",
            "generate_secure_paths": true,
            "secure_cookie": false
        },
        "http_server_options": {
            "use_ssl": false,
            "certificates": []
        },
        "security": {
            "login_failure_username_limit": 3,
            "login_failure_ip_limit": 10,
            "login_failure_expiration": 900,
            "audit_log_path" : "/tmp/audit.log"
        }
    }
```

* `listen_port`: Setting this value will change the port that Tyk Dashboard listens on, by default Tyk will try to listen on port `3000`.

* `tyk_api_config`: This section details a node that Tyk Dashboard can speak to, Tyk Dashboard controls Tyk using the REST API, it only requires visibility to one node, so long as all nodes are using the same API Definitions.
    
> **Important**: If the Dashboard cannot see a Tyk node, key management functions will not work properly.

*   `tyk_api_config.Host`: This is the full URL of your Tyk node.

*   `tyk_api_config.Port`: The port that Tyk is running on, defaults to `5000`.

*   `tyk_api_config.Secret`: The secret that you have set in the `tyk.conf` file, this is the key that Tyk Dashboard will use to speak to the Tyk node's REST API. Please note that this value should match with the `secret` value in `tyk.conf`.

*   `tyk_api_config.shared_node_secret`: As of Tyk v2.0 and Tyk Dashboard 1.0 all Tyk API Gateway nodes that are configured to use the Dashboard as a back-end API Definition service (i.e. are managed by a Dashboard) will register with the Dashboard service on load, and claim a node ID that is provided by the license for the Dashboard. Please note that this value should match with [node_secret][3] Gateway configuration option value.
    
Each node communicates with the Dashboard via a shared secret (this setting) and a nonce to ensure that out-of-band requests cannot be made. Nodes will send a heartbeat every few seconds to notify the Dashboard that they are running.

*   `mongo_url`: The full URL to your MongoDB instance, this can be a clustered instance if necessary and should include the database and username / password data.
    
> **Important**: This should be the same as the credentials that your Tyk installation uses.

*   `page_size`: The page size that the dashboard should use, defaults to `10`. Should not be edited.

*   `redis_port`: The port that your Redis installation is on.
    
> **Important**: Tyk Dashboard uses Redis to store its session data and to communicate with your Tyk nodes occasionally. The Redis details used by the dashboard must be the same as those set for your Tyk installation.

*   `redis_host`: The hostname for the Redis collection, can be an IP address.

*   `redis_password`: If you have a set a password in your Redis configuration using its `requirepass` setting, enter it here. If this is set to empty, Tyk Dashboard will not attempt to login to Redis.

*   `redis_database`: Set this to the index of your Redis database if you are using more than one.

*   `enable_cluster`: Set this to `true` if you are using a Redis cluster, then fill in the `redis_hosts` field.

*   `redis_hosts`: You can also specify multiple Redis hosts here, Tyk will use this array if it is not empty, or it will use the individual legacy parameters above. You can specify multiple `host:port` combinations here

*   `force_api_defaults`: Forces the Dashboard to use certain defaults when generating API definitions. Set this to `false` if you wish to manually set `listen_paths`.

*   `notify_on_change`: Licensed users can use this setting to enable/disable whether Tyk Dashboard will notify all tyk nodes to hot-reload when an API definition is changed.

*   `license_owner`: Deprecated, licenses are no long required to use the Dashboard.

*   `hash_keys`: If your Tyk Gateway is using hashed tokens, set this value here to `true` so it matches, the Dashboard will now operate in a mode that is compatible with key hashing.

*   `email_backend`: Tyk supports an interface-based email back-end system, currently only Mandrill is supported out of the box. If you have a Mandrill account, you can have Tyk send emails on your behalf by filling in this configuration section.

*   `enable_email_notifications`: Set to `true` to have Tyk send emails for things such as key approvals, and portal sign ups.

*   `code`: The code of the back-end to use, `mandrill`, `sendgrid`, `amazonses` and `mailgun` are supported, please see the "Sending emails" section for more details on configuring these different providers.

*   `email_backend.settings`: The custom settings sections for the back end.

*   `settings.ClientKey`: The client key that we can use to integrate with the Mandrill API.

*   `default_from_email`: The address to send email from.

*   `default_from_name`: The name to use when sending emails.

*   `hide_listen_path`: If you set this option to `true`, then the listen path will not be editable or visible in the Dashboard.

*   `use_sentry`: Tyk Dashboard has Sentry integration to externalise logging, set this to `true` to enable the logger.

*   `sentry_code`: If you have a Sentry setup, or are using Getsentry, you can add the Sentry DSN here and Tyk will begin sending events.

*   `sentry_js_code`: The Angular application that powers the Dashboard also supports Sentry. To have the Dashboard report errors to you, add a seperate DSN here.

*   `show_org_id`: Determines whether the RPC ID will be shown in the Users -> Username detail page, can be useful for quickly identifying your Org ID.

*   `enable_duplicate_slugs`: By default Tyk will try to stop you from using duplicate API slugs, however since Tyk v1.9 supports per-API domain names, it would be possible to have two APIs both listen to the same path (e.g. root `/`), but on different domains.

Setting this option to `true` will cause the dashboard to not validate against other listen paths.

*   `[host_config]`: The host config section replaces the old `hostname` option in the `tyk_analytics.conf` as we have more options around managing host names and domains in this version.

*   `override_hostname`: This is the equivalent of v1.8 `hostname` parameter, it will essentially stop Tyk from trying to guess which hostname to use when building URLs for the interface, set this value to whatever hostname your Tyk Gateway is running on.

*   `disable_org_slug_prefix`: Tyk will by default try to manage domain names based on the organisation slug, so domains are like this if using the Host Manager:

```
        org-slug.hostname.com/api-slug
```
    
However, if you are not using the host manager, then domains are hard-coded per api, or at a gateway level, and the org-slug moniker is not needed to construct demo URLs (e.g. for Swagger docs and the API pages). To stop this guessing behaviour, switch this option to `true` and Tyk Dashboard will stop trying to add an org-slug to the start of URL's.
    
For legacy installs or upgrades using the host manager, leave this value as `false`.

*   `enable_host_names`: Tyk Dashboard can bind the Dashboard application to a specific domain name, enable this option to have Tyk Dashboard only allow access on a specific domain and 404 on any other host access (not recommended).

*   `hostname`: The hostname to bind the dashboard to. This must be a proper hostname and **not** `localhost`.

*   `portal_domains`: It is possible to hard-code portal domains (these override settings set by the dashboard for routing purposes). Set `ORGID:Domainname` here so that Tyk can route domain names for the portals of those organisations.

*   `portal_root_path`: The root path for the portal.

*   `generate_secure_paths`: As of v2.1, Tyk Dashboard tries to generate URLs for you that can be used straight from the Dashboard, if you prefer to have the URLs start with `https`, set this option to `true`. This is a purely aesthetic change.

*   `secure_cookie`: This enables HTTPS “secure” cookies.

> **NOTE:** This option is available from v1.3.5 onwards.

*   `[http_server_options]`: This section is reserved for settings relating to the HTTP server that powers the Dashboard.

*   `use_ssl`: Enable to use SSL.

*   `certificates`: Add a certificate block for each domain being covered by the application:

```
        {
            "domain_name": "*.banana.com",
            "cert_file": "new.cert.cert",
            "key_file": "new.cert.key"
        }
```
    
For more information see the [SSL section in the documentation][1]

*   `[security]`: This section controls login limits for both the Dashboard and the Developer Portal. The path for you audit log is also set here.

> **NOTE:** This section is available from v1.3.5 onwards

*   `login_failure_username_limit`: Controls how many time a user can attempt to log in before being denied access. The default is 0.

*   `login_failure_ip_limit`: Controls how many times an IP Address can be used to attempt to log in before being denied access. The default is 0.

*   `login_failure_expiration`: Controls how long before the failure limits are reset in seconds. The default is 900 seconds.

*   `audit_log_path`: This sets the path to your audit log. It will log all user actions and response statuses to it. Security information such as passwords are not logged.

*   `home_dir`: The path to the home directory of Tyk Dashboard, this must be set in order for Portal templates and other files to be loadable. By default this is `/opt/tyk-dashboard/`.

*   `[identity_broker]`: Tyk Dashboard 1.0 has some preset Tyk Identity Broker configurations set up, for this integration to work, Tyk Dashboard must be able to see an Identity Broker instance. The settings in this section are to enable this integration.

*   `identity_broker.enabled`: Enable the TIB integration (otherwise it will not appear in the UI).

*   `[identity_broker.host]`: This section defines the host connection details for TIB.

*   `identity_broker.connection_string`: The URL to the host, must be in the form: `http://domain:port`.

*   `identity_broker.secret`: The shared secret between TIB and the Dashboard, this ensures all API requests between Dashboard and TIB are valid.

*   `allow_explicit_policy_id`: As of v1.1, by default in a Pro installation, Tyk will load Policy IDs and use the internal object-ID as the ID of the policy. This is not portable in cases where the data needs to be moved from installation to installation.
    
If you set this value to `true`, then the `id` parameter in a stored policy (or imported policy using the REST API of the Dashboard), will be used instead of the internal ID.
    
> **Note**: This options should only be used when transporting an installation to a new database.

*   `use_sharded_analytics`: If using the `mongo-pump-selective` pump, where data is written to org-id-specific collections in MongoDB, then enabling this option will switch querying for analytics over to the independent collection entries.

*   `enable_aggregate_lookups`: As of v1.2, if using the new Aggregate Pump, Tyk Analytics can make use of the newer, faster Analytics lookup, to ensure that this can be made backwards compatible, this option must be set to `true`, in conjunction with the `aggregate_lookup_cutoff` value.

*   `aggregate_lookup_cutoff`: As of v1.2, set this to a date value of the form `DD/MM/YYYY`. Any analytics queries before this date will fall back to the raw base log data collection (slower), this is to ensure continuity of service and a smooth upgrade process with no loss of data.

*   `disable_parallel_sessions`: As of v1.3.4, if set to `true`, it restricts an account to a single session. When an account logs in, any other open sessions for that account are logged out.


### Environment variables

Environment variables can be used to override settings defined in the configuration file. The [Tyk Dashboard environment variable mappings][2] spreadsheet shows how the JSON member keys map to the environment variables. Where an environment variable is specified, its value will take precendence over the value in the configuration file.

 [1]: /security/concepts/tls-and-ssl/
 [2]: /docs/others/Gateway-Environment-Vars.xlsx
 [3]: /configure/tyk-gateway-configuration-options/#node_secret
