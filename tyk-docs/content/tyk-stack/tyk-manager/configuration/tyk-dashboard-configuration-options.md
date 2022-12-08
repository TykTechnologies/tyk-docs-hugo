---
date: 2017-03-27T14:55:44+01:00
title: Tyk Dashboard Configuration Options
menu:
  main:
    parent: "Tyk Dashboard"
weight: 2 
url: /tyk-dashboard/configuration
aliases:
    - /tyk-configuration-reference/tyk-dashboard-configuration-options/
    - /configure/tyk-dashboard-configuration-options/
---

You can use environment variables to override the config file for the Tyk Dashboard. The Dashboard configuration file can be found in the `tyk-dashboard` folder and by default is called `tyk_analytics.conf`, though it can be renamed and specified using the `--conf` flag. Environment variables are created from the dot notation versions of the JSON objects contained with the config files.
To understand how the environment variables notation works, see [Environment Variables](/docs/tyk-configuration-reference/environment-variables/).

The Tyk Dashboard has a separate configuration file, it is small and comes packaged with the tarball. It uses a separate configuration file as it may be installed on a different host to your Tyk Gateway nodes.

The Dashboard configuration file can be found in the `tyk-dashboard` folder and by default is called `tyk_analytics.conf`, though it can be renamed and specified using the `--conf` flag.

### Environment Variables

All the Dashboard environment variables have the prefix `TYK_DB_`. The environment variables will take precedence over the values in the configuration file.

Environment variables (env var) can be used to override the settings defined in the configuration file. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

The file will look like the sample below, the various fields are explained in the following sections:

``` {.copyWrapper}
{
  "listen_port": 3000,
  "tyk_api_config": {
    "Host": "http://tyk-gateway",
    "Port": "8080",
    "Secret": "352d20ee67be67f6340b4c0605b044b7"
  },
  "enable_aggregate_lookups": true,
  "storage": {
    "main": {
      "type": "postgres",
      "connection_string": "user=laurentiughiur password=test123 database='tyk-test' host=127.0.0.1 port=5432",
      "table_sharding": true
    },
    "analytics": {
      "type": "postgres",
      "connection_string": "user=laurentiughiur password=test123 database='tyk-test' host=127.0.0.1 port=5432",
      "table_sharding": true
    },
    "logs": {
      "type": "postgres",
      "connection_string": "user=laurentiughiur password=test123 database='tyk-test' host=127.0.0.1 port=5432",
      "table_sharding": true
    },
    "uptime": {
      "type": "postgres",
      "connection_string": "user=laurentiughiur password=test123 database='tyk-test' host=127.0.0.1 port=5432",
      "table_sharding": true
    }
  },
  "enable_ownership": false,
  "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
  "mongo_use_ssl": false,
  "mongo_ssl_insecure_skip_verify": false,
  "mongo_session_consistency": "",
  "mongo_batch_size": 2000,
  "page_size": 10,
  "admin_secret": "12345",
  "shared_node_secret": "352d20ee67be67f6340b4c0605b044b7",
  "redis_port": 6379,
  "redis_host": "tyk-redis",
  "redis_username": "",
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
    "enable_hashed_keys_listing": false,
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
    "allowed_content_sources": "",
    "private_certificate_encoding_secret": "some-secret",
    "open_policy":{
      "enabled": true,
      "debug": true,
      "enable_api": true
      },
    "additional_permissions": {
      "api_manager": "API Manager"
      }
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
  "health_check_endpoint_name": ""
}
```

{{< include "dashboard-config.md" >}}
