---
title: Tyk Dashboard Environment Variables
menu:
  main:
    parent: "Configure"
weight: 13
---


| JSON Value                               | Environment Variable Name                    |
|------------------------------------------|----------------------------------------------|
| admin_secret                             | TYK_DB_ADMINSECRET                           |
| aggregate_lookup_cutoff                  | TYK_DB_AGGREGATELOOKUPCUTOFF                 |
| allow_explicit_policy_id                 | TYK_DB_ALLOWEXPLICITPOLICYID                 |
| email_backend.code                       | TYK_DB_EMAILBACKEND_CODE                     |
| email_backend.default_from_email         | TYK_DB_EMAILBACKEND_DEFAULTFROMEMAIL         |
| email_backend.default_from_name          | TYK_DB_EMAILBACKEND_DEFAULTFROMNAME          |
| email_backend.enable_email_notifications | TYK_DB_EMAILBACKEND_ENABLEEMAILNOTIFICATIONS |
| email_backend.settings                   | TYK_DB_EMAILBACKEND_SETTINGS                 |
| enable_aggregate_lookups                 | TYK_DB_ENABLEAGGREGATELOOKUPS                |
| enable_analytics_cache                   | TYK_DB_ENABLEANALYTICSCACHE                  |
| enable_cluster                           | TYK_DB_ENABLECLUSTER                         |
| enable_delete_key_by_hash                | TYK_DB_ENABLEDELETEKEYBYHASH                 |
| enable_duplicate_slugs                   | TYK_DB_ENABLEDUPLICATESLUGS                  |
| enable_master_keys                       | TYK_DB_ENABLEMASTERKEYS                      |
| force_api_defaults                       | TYK_DB_FORCEAPIDEFAULTS                      |
| hash_keys                                | TYK_DB_HASHKEYS                              |
| hide_listen_path                         | TYK_DB_HIDELISTENPATH                        |
| home_dir                                 | TYK_DB_HOMEDIR                               |
| host_config.disable_org_slug_prefix      | TYK_DB_HOSTCONFIG_DISABLEORGSLUGPREFIX       |
| host_config.enable_host_names            | TYK_DB_HOSTCONFIG_ENABLEHOSTNAMES            |
| host_config.override_hostname            | TYK_DB_HOSTCONFIG_GATEWAYHOSTNAME            |
| host_config.generate_secure_paths        | TYK_DB_HOSTCONFIG_GENERATEHTTPS              |
| host_config.hostname                     | TYK_DB_HOSTCONFIG_HOSTNAME                   |
| host_config.portal_domains               | TYK_DB_HOSTCONFIG_PORTALDOMAINS              |
| host_config.portal_root_path             | TYK_DB_HOSTCONFIG_PORTALROOTPATH             |
| host_config.use_strict_hostmatch         | TYK_DB_HOSTCONFIG_USESTRICT                  |
| redis_hosts                              | TYK_DB_HOSTS                                 |
| http_server_options.certificates         | TYK_DB_HTTPSERVEROPTIONS_CERTIFICATES        |
| http_server_options.min_version          | TYK_DB_HTTPSERVEROPTIONS_MINVERSION          |
| http_server_options.use_ssl              | TYK_DB_HTTPSERVEROPTIONS_USESSL              |
| http_server_options.ssl_ciphers          | TYK_DB_HTTPSERVEROPTIONS_SSLCIPHERS          |
| http_server_options.prefer_server_ciphers| TYK_DB_HTTPSERVEROPTIONS_PREFERSERVERCIPHERS |
| license_key                              | TYK_DB_LICENSEKEY                            |
| listen_port                              | TYK_DB_LISTENPORT                            |
| maintenance_mode                         | TYK_DB_MAINTENANCEMODE                       |
| mongo_url                                | TYK_DB_MONGOURL                              |
| mongo_use_ssl                            | TYK_DB_MONGOUSESSL                           |
| node_schema_path                         | TYK_DB_NODESCHEMADIR                         |
| shared_node_secret                       | TYK_DB_NODESECRET                            |
| notify_on_change                         | TYK_DB_NOTIFYONCHANGE                        |
| oauth_redirect_uri_separator             | TYK_DB_OAUTHREDIRECTURISEPARATOR             |
| page_size                                | TYK_DB_PAGESIZE                              |
| private_key_path                         | TYK_DB_PRIVATEKEYPATH                        |
| redis_database                           | TYK_DB_REDISDATABASE                         |
| redis_host                               | TYK_DB_REDISHOST                             |
| redis_password                           | TYK_DB_REDISPASSWORD                         |
| redis_port                               | TYK_DB_REDISPORT                             |
| sentry_code                              | TYK_DB_SENTRYCODE                            |
| sentry_js_code                           | TYK_DB_SENTRYJSCODE                          |
| show_org_id                              | TYK_DB_SHOWORGID                             |
| sso_custom_login_url                     | TYK_DB_SSOCUSTOMLOGINURL                     |
| storage.optimisations_max_active         | TYK_DB_STORAGE_MAXACTIVE                     |
| storage.optimisations_max_idle           | TYK_DB_STORAGE_MAXIDLE                       |
| tagging_options.tag_all_apis_by_org      | TYK_DB_TAGGINGOPTIONS_TAGALLAPISBYORG        |
| identity_broker.enabled                  | TYK_DB_TIB_ENABLED                           |
| identity_broker.host.connection_string   | TYK_DB_TIB_HOST_CONNECTIONSTRING             |
| identity_broker.host.secret              | TYK_DB_TIB_HOST_SECRET                       |
| tyk_api_config.Host                      | TYK_DB_TYKAPI_HOST                           |
| tyk_api_config.Port                      | TYK_DB_TYKAPI_PORT                           |
| tyk_api_config.Secret                    | TYK_DB_TYKAPI_SECRET                         |
| default_lang                             | TYK_DB_UI_DEFAULTLANG                        |
| designer                                 | TYK_DB_UI_DESIGNER                           |
| dont_allow_license_management            | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENT         |
| dont_allow_license_management_view       | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENTVIEW     |
| dont_show_admin_sockets                  | TYK_DB_UI_DONTSHOWADMINSOCKETMESSAGES        |
| hide_help                                | TYK_DB_UI_HIDEHELP                           |
| languages                                | TYK_DB_UI_LANGUAGES                          |
| login_page                               | TYK_DB_UI_LOGINPAGE                          |
| nav                                      | TYK_DB_UI_NAV                                |
| portal_section                           | TYK_DB_UI_PORTALSECTION                      |
| uptime                                   | TYK_DB_UI_UPTIME                             |
| use_sentry                               | TYK_DB_USESENTRY                             |
| use_sharded_analytics                    | TYK_DB_USESHARDEDANLAYTICS                   |