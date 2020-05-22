---
date: 2017-03-27T14:55:44+01:00
title: Tyk Dashboard Configuration Options
menu:
  main:
    parent: "Tyk Configuration Reference"
weight: 2 
---


The Tyk Dashboard has a separate configuration file, it is small and comes packaged with the tarball. It uses a separate configuration file as it may be installed on a different host to your Tyk Gateway nodes.

The Dashboard configuration file can be found in the `tyk-dashboard` folder and by default is called `tyk_analytics.conf`, though it can be renamed and specified using the `--conf` flag.

### Environment Variables

Environment variables can be used to override the settings defined in the configuration file. See [Environment Variables](/docs/tyk-configuration-reference/environment-variables/) for details. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

The file will look like the sample below, the various fields are explained in the following sections:

``` {.copyWrapper}
{
    "listen_port": 3000,
    "tyk_api_config": {
        "Host": "http://tyk-gateway",
        "Port": "8080",
        "Secret": "352d20ee67be67f6340b4c0605b044b7"
    },
    "enable_ownership": false,
    "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
    "mongo_use_ssl": false,
    "mongo_ssl_insecure_skip_verify": false,
    "mongo_session_consistency": "",
    "page_size": 10,
    "admin_secret": "12345",
    "shared_node_secret": "352d20ee67be67f6340b4c0605b044b7",
    "redis_port": 6379,
    "redis_host": "tyk-redis",
    "redis_password": "",
    "redis_master_name": "",
    "redis_timeout": 0,
    "redis_database": 0,
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false,
    "force_api_defaults": false,
    "notify_on_change": true,
    "license_key": "",
    "redis_hosts": null,
    "redis_addrs": null,
    "hash_keys": true,
    "email_backend": {
        "enable_email_notifications": false,
        "code": "sendgrid",
        "settings": {
            "ClientKey": ""
        },
        "default_from_email": "you@somewhere.com",
        "default_from_name": "Some Person",
        "dashboard_hostname": ""
    },
    "hide_listen_path": false,
    "sentry_code": "",
    "sentry_js_code": "",
    "use_sentry": false,
    "enable_master_keys": false,
    "enable_duplicate_slugs": true,
    "show_org_id": true,
    "host_config": {
        "enable_host_names": true,
        "disable_org_slug_prefix": true,
        "hostname": "www.tyk-test.com",
        "override_hostname": "www.tyk-test.com:8080",
        "portal_domains": {},
        "portal_root_path": "/portal",
        "generate_secure_paths": false,
        "secure_cookies": false,
        "use_strict_hostmatch": false
    },
    "http_server_options": {
        "use_ssl": false,
        "certificates": [],
        "min_version": 0,
        "ssl_ciphers": null,
        "ssl_insecure_skip_verify": false,
        "prefer_server_ciphers": false
    },
    "security": {
        "allow_admin_reset_password": false,
        "login_failure_username_limit": 0,
        "login_failure_ip_limit": 0,
        "login_failure_expiration": 0,
        "login_disallow_forward_proxy": false,
        "audit_log_path": "",
        "user_password_max_days": 0,
        "enforce_password_history": 0,
        "force_first_login_pw_reset": false,
        "enable_content_security_policy": false,
        "allowed_content_sources": ""
    },
    "ui": {
        "languages": {
            "Chinese": "cn",
            "English": "en",
            "Korean": "ko"
        },
        "hide_help": true,
        "default_lang": "en",
        "login_page": {},
        "nav": {
            "dont_show_admin_sockets": false,
            "hide_activity_by_api_section": false,
            "hide_geo": false,
            "hide_licenses_section": false,
            "hide_logs": false,
            "hide_tib_section": false
        },
        "uptime": {},
        "portal_section": null,
        "designer": {},
        "dont_show_admin_sockets": false,
        "dont_allow_license_management": false,
        "dont_allow_license_management_view": false,
        "cloud": false
    },
    "home_dir": "/opt/tyk-dashboard",
    "identity_broker": {
        "enabled": false,
        "host": {
            "connection_string": "",
            "secret": ""
        }
    },
    "tagging_options": {
        "tag_all_apis_by_org": false
    },
    "use_sharded_analytics": true,
    "enable_aggregate_lookups": true,
    "enable_analytics_cache": false,
    "aggregate_lookup_cutoff": "26/05/2016",
    "maintenance_mode": false,
    "allow_explicit_policy_id": true,
    "private_key_path": "",
    "node_schema_path": "",
    "oauth_redirect_uri_separator": ";",
    "statsd_connection_string": "",
    "statsd_prefix": "",
    "disable_parallel_sessions": false,
    "dashboard_session_lifetime": 0,
    "alternative_dashboard_url": "",
    "sso_permission_defaults": null,
    "sso_default_group_id": "",
    "sso_custom_login_url": "",
    "sso_custom_portal_login_url": "",
    "sso_enable_user_lookup": false,
    "notifications_listen_port": 5000,
    "portal_session_lifetime": 0,
    "enable_delete_key_by_hash": false,
    "enable_update_key_by_hash": false,
    "audit": {
        "enabled": false,
        "format": "",
        "path": "",
        "detailed_recording": false
    },
    "enable_multi_org_users": false,
    "version_check_url": ""
}
```
### <a name="listen_port"></a>listen_port

Setting this value will change the port that Tyk Dashboard listens on. By default Tyk will try to listen on port `3000`.

> **NOTE**: You may see `net::ERR_CONNECTION_REFUSED` errors in the browser console if you don't have port 5000 open. See [Port 5000 Errors in the Browser Console](/docs/troubleshooting/tyk-dashboard/port-5000-errors/). Port 5000 is no longer required from v2.9.3.

### <a name="tyk_api_config"></a>tyk_api_config

This section contains details for a Tyk Gateway node that the Tyk Dashboard can speak to. The Dashboard controls Tyk using the Gateway API and only requires visibility to one node, so long as all nodes are using the same API Definitions.
    
> **Important**: If the Dashboard cannot see a Tyk node, key management functions will not work properly.

> **Warning**: In a sharded environment, the Gateway node specified in `tyk_api_config` must not be sharded.

#### <a name="tyk_api_config.Host"></a>tyk_api_config.Host

This is the full URL of your Tyk node.

#### <a name="tyk_api_config.Port"></a>tyk_api_config.Port

he port that Tyk is running on. The default is `8080`.

#### <a name="tyk_api_config.Secret"></a>tyk_api_config.Secret

The secret set in your `tyk.conf` file. This is the key that Tyk Dashboard will use to speak to the Tyk node's Gateway API. Note that this value has to match the `secret` value in `tyk.conf`.

#### <a name="shared_node_secret"></a>shared_node_secret

As of Tyk Gateway **v2.0** and Tyk Dashboard **v1.0** all Tyk API Gateway nodes that are configured to use the Dashboard as a back-end API Definition service (i.e. are managed by a Dashboard) will register with the Dashboard service on load, and claim a node ID that is provided by the license for the Dashboard.

 > NOTE: This value should match with the [`node_secret`](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/#a-name-node-secret-a-node-secret) Gateway configuration option value.
    
Each node communicates with the Dashboard via a shared secret (this setting) and a nonce to ensure that out-of-band requests cannot be made. Nodes will send a heartbeat every few seconds to notify the Dashboard that they are running.

#### <a name="admin_secret"></a>admin_secret

This secret is to be used by a special set of endpoints that we call "Admin APIs". This API is part of the super-admin context and therefore has a separate endpoint prefix `/admin`. It also requires a special auth header called `admin-auth`.
This purpose of these endpoints is to allow functionality that regular Dashboard users should not have, such as create new organisations, create super users etc. See the [Admin API](/docs/dashboard-admin-api/) for more information on these endpoints.

### <a name="mongo_url"></a>mongo_url

The full URL to your MongoDB instance, this can be a clustered instance if necessary and should include the database and username / password data.
    
> **Important**: This should be the same as the credentials that your Tyk installation uses.

### <a name="mongo_ssl_insecure_skip_verify"></a>mongo_ssl_insecure_skip_verify

This setting allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### <a name="mongo_use_ssl"></a>mongo_use_ssl

A Boolean setting for Mongo SSL support. Set to `true` to enable SSL.

### <a name="page_size"></a>page_size

The page size that the dashboard should use. Defaults to `10`. This setting should not be edited.

### <a name="redis_port"></a>redis_port

The port that your Redis installation listens on.
    
> **Important**: The Tyk Dashboard uses Redis to store its session data and to communicate with your Tyk Gateway nodes occasionally. The Redis details used by the dashboard must be the same as those set for your Tyk installation.

### <a name="redis_host"></a>redis_host

The hostname for the Redis collection and can be an IP address.

### <a name="redis_password"></a>redis_password

If you have a set a password in your Redis configuration using its `requirepass` setting, enter it here. If this is set to empty, The Dashboard will not attempt to login to Redis.

### <a name="redis_database"></a>redis_database

Set this to the index of your Redis database if you are using more than one.

### <a name="redis_timeout"></a>redis_timeout

Set a custom Redis network timeout. Default value is 5 seconds.

### <a name="enable_cluster"></a>enable_cluster

Set this to `true` if you are using a Redis cluster.

### <a name="redis_hosts"></a>redis_hosts

> **Note**: From v1.9.3 `redis_hosts` has been deprecated and replaced by `redis_addrs`

You can also specify multiple Redis hosts here. Tyk will use this array if it is not empty, or it will use the individual legacy parameters above. You can specify multiple `host:port` combinations here.

### redis_addrs

This is new from v1.9.3 and replaces `redis_hosts` for configuring Redis clusters. See [Redis Cluster and Tyk Dashboard](/docs/tyk-configuration-reference/redis-cluster/#a-nameredis-cluster-dashboarda-redis-cluster--tyk-dashboard) for more info.

### <a name="force_api_defaults"></a>force_api_defaults

This setting forces the Dashboard to use certain defaults when generating API definitions. Set this to `false` if you wish to manually set `listen_paths`.

### <a name="notify_on_change"></a>notify_on_change

Licensed users can use this setting to enable/disable whether the Tyk Dashboard will notify all Tyk Gateway nodes to hot-reload when an API definition is changed.

### <a name="hash_keys"></a>hash_keys

If your Tyk Gateway is using hashed keys, set this value to `true` so it matches. The Dashboard will now operate in a mode that is compatible with key hashing.

### <a name="enable_delete_key_by_hash"></a>enable_delete_key_by_hash

To delete a key by its hash, set this option to `true`.

### <a name="enable_update_key_by_hash"></a>enable_update_key_by_hash

To update a key by its hash, set this option to `true`.

### <a name="enable_master_keys"></a>enable_master_keys

If this is set to true, session objects (key definitions) that do not have explicit access rights set will be allowed by Tyk. This means that keys that are created have access to ALL APIs, which in many cases is unwanted behaviour unless you are sure about what you are doing. To use this setting also requires the corresponding Gateway configuration setting [allow_master_keys](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/#a-name-allow-master-keys-a-allow-master-keys) to be set to `true`.

### <a name="email_backend"></a>email_backend

Tyk supports an interface-based email back-end system. We support `mandrill`, `sendgrid`, `amazonses` and `mailgun`. See [Outbound Email Configuration](/docs/tyk-configuration-reference/outbound-email-configuration/) for more details on configuring these different providers.

#### <a name="enable_email_notifications"></a>enable_email_notifications

Set to `true` to have Tyk send emails for things such as key approvals and portal sign ups.

#### <a name="code"></a>code

The code of the back-end to use, `mandrill`, `sendgrid`, `amazonses` and `mailgun` are supported. See [Outbound Email Configuration](/docs/tyk-configuration-reference/outbound-email-configuration/) for more details on configuring these different providers.

#### <a name="email_backend.settings"></a>email_backend.settings

The custom settings sections for the back end system.

#### <a name="settings.ClientKey"></a>settings.ClientKey

The client key that we can use to integrate with the Mandrill API.

#### <a name="default_from_email"></a>default_from_email

The address to send email from.

#### <a name="default_from_name"></a>default_from_name

The name to use when sending emails.

#### <a name="dashboard_domain"></a>dashboard_domain

Your public dashboard hostname.

> **Note**: `dashboard_domain` is available from v1.3.6 onwards.

### <a name="hide_listen_path"></a>hide_listen_path

If you set this option to `true`, then the listen path will not be editable or visible in the Dashboard.

### <a name="use_sentry"></a>use_sentry

The Tyk Dashboard has Sentry integration to externalise logging. Set this to `true` to enable the logger.

### <a name="sentry_code"></a>sentry_code

If you have a Sentry setup, or are using Getsentry, you can add the Sentry DSN here and Tyk will begin sending events.

### <a name="sentry_js_code"></a>sentry_js_code

The Angular application that powers the Dashboard also supports Sentry. To have the Dashboard report errors to you, add a seperate DSN here.

### <a name="show_org_id"></a>show_org_id

Determines whether the RPC ID will be shown in the Users -> Username detail page. This can be useful for quickly identifying your Org ID.

### <a name="enable_duplicate_slugs"></a>enable_duplicate_slugs

By default Tyk will try to stop you from using duplicate API slugs. However, from v1.9 Tyk supports per-API domain names, it is possible to have two APIs listen to the same path (e.g. root `/`), but on different domains.

Setting this option to `true` will cause the dashboard to not validate against other listen paths.

### <a name="host_config"></a>host_config

The host config section replaces the old `hostname` option in the `tyk_analytics.conf` as we have more options around managing host names and domains in this version.

#### <a name="host_config.override_hostname"></a>host_config.override_hostname

This is the equivalent of v1.8 `hostname` parameter, and will essentially stop Tyk from trying to guess which hostname to use when building URLs for the interface. Set this value to whatever hostname your Tyk Gateway is running on.

#### <a name="host_config.disable_org_slug_prefix"></a>host_config.disable_org_slug_prefix

Tyk will by default try to manage domain names based on the organisation slug, so domains are like this if using the Host Manager:

```
org-slug.hostname.com/api-slug
```
    
However, if you are not using the host manager, then domains are hard-coded per API, or at a Gateway level, and the org-slug moniker is not needed to construct demo URLs (e.g. for Swagger docs and the API pages). To stop this guessing behaviour, change this option to `true` and the Dashboard will stop trying to add an org-slug to the start of URLs.
    
For legacy installs or upgrades using the host manager, leave this value as `false`.

#### <a name="host_config.enable_host_names"></a>host_config.enable_host_names

The Tyk Dashboard can bind the Dashboard application to a specific domain name. Enable this option to have the Dashboard only allow access on a specific domain and 404 on any other host access (not recommended).

#### <a name="host_config.hostname"></a>host_config.hostname

The hostname to bind the Dashboard to. This must be a proper hostname and **not** `localhost`.

#### <a name="host_config.portal_domains"></a>host_config.portal_domains

It is possible to hard-code portal domains (these override settings set by the Dashboard for routing purposes). Set `Domainname:ORGID` here so that Tyk can route domain names for the portals of those organisations.

#### <a name="host_config.portal_root_path"></a>host_config.portal_root_path

The root path for the portal.

#### host_config.generate_secure_paths

If you prefer to have your URLs start with `https`, set this option to `true`.

#### <a name="host_config.secure_cookies"></a>host_config.secure_cookies

This enables HTTPS "secure" cookies.

> **NOTE:** This option is available from v1.3.5 onwards.

### <a name="http_server_options"></a>http_server_options

This section is reserved for settings relating to the HTTP server that powers the Dashboard.

#### <a name="http_server_options.use_ssl"></a>http_server_options.use_ssl

Enable to use SSL.

#### <a name="http_server_options.certificates"></a>http_server_options.certificates

Add a certificate block for each domain being covered by the application. For example:

```{.copyWrapper}
{
  "domain_name": "*.banana.com",
  "cert_file": "new.cert.cert",
  "key_file": "new.cert.key"
}
```
#### <a name="http_server_options.ssl_ciphers"></a>http_server_options.ssl_ciphers

Array of allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants

#### <a name="http_server_options.prefer_server_ciphers"></a>http_server_options.prefer_server_ciphers

A boolean value to control whether the server selects the preferred ciphersuite for the client, or the preferred ciphersuite for the server. If set to `true`, the server preferences in the order of the elements listed in `ssl_ciphers` is used.
    
For more information see [TLS and SSL](/docs/basic-config-and-security/security/tls-and-ssl/)

### <a name="security"></a>security

This section controls login limits for both the Dashboard and the Developer Portal. The path for you audit log is also set here.

> **NOTE:** This section is available from v1.3.5 onwards

#### <a name="security.login_failure_username_limit"></a>security.login_failure_username_limit

Controls how many time a user can attempt to log in before being denied access. The default is 0.

#### <a name="security.login_failure_ip_limit"></a>security.login_failure_ip_limit

Controls how many times an IP Address can be used to attempt to log in before being denied access. The default is 0.

#### <a name="security.login_failure_expiration"></a>security.login_failure_expiration

Controls how long before the failure limits are reset in seconds. The default is 900 seconds.

#### <a name="security.login_disallow_forward_proxy"></a>security.login_disallow_forward_proxy

Set to `true` to allow the Tyk Dashboard login to ignore the host from the `X-Forwarded-For` header when accessing the Dashboard via a proxy. This can be useful for limiting retry attempts.

#### <a name="security.audit_log_path"></a>security.audit_log_path

This sets the path to your audit log and enables audit with default settings. It will log all user actions and response statuses to it. Security information such as passwords are not logged.

#### <a name="security.allow_admin_reset_password"></a>security.allow_admin_reset_password

This allows an admin user to reset the password of other users. The default is false.

#### <a name="security.enable_content_security_policy"></a>security.enable_content_security_policy

Enable browser Content-Security-Policy, e.g. CSP. The default is false.

#### <a name="security.allowed_content_sources"></a>security.allowed_content_sources

If CSP enabled, specify space separated string, with list of allowed resources.

> **NOTE** From v1.8 we have included enhancements to password management in the Dashboard

#### <a name="security.user_password_max_days"></a>security.user_password_max_days

Set the maximum lifetime of a password for a user. They will be prompted to reset if password lifetime exceeds the configured expiry value. e.g. if value set to `30` any user password set over 30 days in past will be considered invalid and must be reset.

#### <a name="security.enforce_password_history"></a>security.enforce_password_history

Set a maximum number of previous passwords used by a user that cannot be reused. For example, If set to `5` the user upon setting their password cannot reuse any of their 5 most recently used password for that Tyk user account.

#### <a name="security.force_first_login_pw_reset"></a>security.force_first_login_pw_reset

A newly created user will be forced to reset their password upon first login. Defaults to `false`.

### <a name="ui"></a>ui

This section controls various settings for the look and feel of the Dashboard UI.

#### <a name="ui.languages"></a>ui.languages

This section lists the current languages the Dashboard UI supports.

#### <a name="ui.hide_help"></a>ui.hide_help

Set to `true` to hide the help tips.

#### <a name="ui.default_lang"></a>ui.default_lang

This settings sets the default language for the UI. Default setting is `en`. Can be set to any of the other languages listed under `ui.languages`.

### Tyk Internal Cloud Settings

The following settings are used internally by Tyk for our Cloud product, and cannot be configured.

```
"login_page": {},
        "nav": {
            "dont_show_admin_sockets": false,
            "hide_activity_by_api_section": false,
            "hide_geo": false,
            "hide_licenses_section": false,
            "hide_logs": false,
            "hide_tib_section": false
        },
        "uptime": {},
        "portal_section": null,
        "designer": {},
        "dont_show_admin_sockets": false,
        "dont_allow_license_management": false,
        "dont_allow_license_management_view": false,
        "cloud": false
```
Also

```
"version_check_url": ""
```

### <a name="home_dir"></a>home_dir

The path to the home directory of Tyk Dashboard, this must be set in order for Portal templates and other files to be loadable. By default this is `/opt/tyk-dashboard/`.

### <a name="dashboard_session_lifetime"></a>dashboard_session_lifetime

As of v1.3.6 you can set session timeout for a Dashboard in seconds. Defaults to 3600 (1 hour).

### <a name="portal_session_lifetime"></a>portal_session_lifetime

As of v1.5, you can set portal session life time in seconds.

### <a name="identity_broker"></a>identity_broker

Tyk Dashboard has some preset Tyk Identity Broker configurations set up, for this integration to work, the Dashboard must be able to see an Identity Broker instance. The settings in this section are to enable this integration.

#### <a name="identity_broker.enabled"></a>identity_broker.enabled

A boolean setting to enable the TIB integration (otherwise it will not appear in the UI).

#### <a name="identity_broker.host"></a>identity_broker.host

This section defines the host connection details for TIB.

#### <a name="identity_broker.host.connection_string"></a>iidentity_broker.host.connection_string

The URL to the host. It must be in the form: `http://domain:port`.

#### <a name="identity_broker.host.secret"></a>identity_broker.host.secret

The shared secret between TIB and the Dashboard. This ensures all API requests between Dashboard and TIB are valid.

### <a name="allow_explicit_policy_id"></a>allow_explicit_policy_id

By default in a Pro installation, Tyk will load Policy IDs and use the internal object-ID as the ID of the policy. This is not portable in cases where the data needs to be moved from installation to installation.
    
If you set this value to `true`, then the `id` parameter in a stored policy (or imported policy using the REST API of the Dashboard) will be used instead of the internal ID.
    
> **Note**: This option should only be used when transporting an installation to a new database.

### <a name="use_sharded_analytics"></a>use_sharded_analytics

If using the `mongo-pump-selective` pump, where data is written to org-id-specific collections in MongoDB, then enabling this option will switch querying for analytics over to the independent collection entries.

### <a name="enable_aggregate_lookups"></a>enable_aggregate_lookups

If using the new Aggregate Pump, Tyk Analytics can make use of the newer, faster Analytics lookup, to ensure that this can be made backwards compatible. This option must be set to `true`, in conjunction with the `aggregate_lookup_cutoff` value.

### <a name="aggregate_lookup_cutoff"></a>aggregate_lookup_cutoff

Set this to a date value of the form `DD/MM/YYYY`. Any analytics queries before this date will fall back to the raw base log data collection (slower). This is to ensure continuity of service and a smooth upgrade process with no loss of data.

### <a name="disable_parallel_sessions"></a>disable_parallel_sessions

If set to `true`, it restricts an account to a single session. When an account logs in, any other open sessions for that account are logged out.

### <a name="sso_permission_defaults"></a>sso_permission_defaults

Specify permissions of the user who logged in using Admin SSO API (for example Tyk Identity Broker). See [Dashboard Admin SSO API](/docs/dashboard-admin-api/sso/) for more details.

### <a name="sso_custom_login_url"></a>sso_custom_login_url

Specify a custom dashboard login URL if you are using 3rd party authentication like TIB.

### <a name="sso_custom_portal_login_url"></a>sso_custom_portal_login_url

Specify custom portal login URL if you are using 3rd party authentication like TIB.

### <a name="enable_multi_org_users"></a>enable_multi_org_users

As of v1.8, this setting enables the ability to share users across multiple organisations in a Tyk Dashboard Installation (Note: requires > 2 node licence).

### <a name="audit"></a>audit

This section specifies settings for audit logging. All Dashboard API requests with URI starting with `/api` will be logged in audit log.

> **NOTE:** `audit` is available from v1.8 onwards

#### <a name="audit.enabled"></a>audit.enabled

Enables audit logging, set to `false` by default. NOTE: setting value `security.audit_log_path` has the same effect as setting `enabled` to `true`.

#### <a name="audit.format"></a>audit.format

Specifies the format of audit log file, possible values are `json` and `text` (`text` is default value).

#### <a name="audit.path"></a>audit.path

Specifies the path to file for the audit log, and overwrites the `security.audit_log_path` value if it was set.

#### <a name="audit.detailed_recording"></a>audit.detailed_recording

Enables detailed records in audit log, by defaultt set to `false`. If set to `true` then audit log records will contain HTTP request (without body) and full HTTP response (including body).

Audit record fields for `json` format:

*   `req_id` - unique request ID

*   `org_id` - organization ID

*   `date` - date in `RFC1123` format

*   `timestamp` - unix timestamp

*   `ip` - IP address the request was originating from

*   `user` - dashboard user who performed the request

*   `action` - description of action performed (`i.e. `Update User`)

*   `method` - HTTP-method of the request

*   `url` - URL of the request

*   `status` - HTTP response status of the request

*   `diff` - provides diff of changed fields (available only for PUT requests)

*   `request_dump` - HTTP request copy (available if `audit.detailed_recording` is set to `true`)

*   `response_dump` - HTTP response copy (available if `audit.detailed_recording` is set to `true`)

Audit record fields for `text` format - all fields are in plain text separated with new line and provided in the same order as fields for `json` format.

### <a name="enable_multi_org_users"></a>enable_multi_org_users

Set to `true` to create users in different organisations, using the same email address. Users will then be able to select an organisation when logging in, and can easily switch between organisations via the navigation menu.

> **NOTE**: This is only available for clients with a two node or more Tyk Dashboard licence.

