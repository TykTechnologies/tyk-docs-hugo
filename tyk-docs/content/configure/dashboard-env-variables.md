---
title: Tyk Dashboard Environment Variables
menu:
  main:
    parent: "Configure"
weight: 13
---


| JSON Value                              | Environment Variable Name                    |
|-----------------------------------------|----------------------------------------------|
| listen_port                             | TYK_DB_LISTENPORT                            |
| tyk_api_config.Host                     | TYK_DB_TYKAPI_HOST                           |
| tyk_api_config.Port                     | TYK_DB_TYKAPI_PORT                           |
| tyk_api_config.Secret                   | TYK_DB_TYKAPI_SECRET                         |
| mongo_url                               | TYK_DB_MONGOURL                              |
| page_size                               | TYK_DB_PAGESIZE                              |
| admin_secret                            | TYK_DB_ADMINSECRET                           |
| shared_node_secret                      | TYK_DB_NODESECRET                            |
| redis_port                              | TYK_DB_REDISPORT                             |
| redis_host                              | TYK_DB_REDISHOST                             |
| redis_password                          | TYK_DB_REDISPASSWORD                         |
| enable_cluster                          | TYK_DB_ENABLECLUSTER                         |
| force_api_defaults                      | TYK_DB_FORCEAPIDEFAULTS                      |
| notify_on_change                        | TYK_DB_NOTIFYONCHANGE                        |
| license_key                             | TYK_DB_LICENSEKEY                            |
| redis_database                          | TYK_DB_REDISDATABASE                         |
| redis_hosts                             | TYK_DB_HOSTS                                 |
| hash_keys                               | TYK_DB_HASHKEYS                              |
| email_backend.enable_email_notifications| TYK_DB_EMAILBACKEND_ENABLEEMAILNOTIFICATIONS |
| email_backend.code                      | TYK_DB_EMAILBACKEND_CODE                     |
| email_backend.settings                  | TYK_DB_EMAILBACKEND_SETTINGS                 |
| email_backend.default_from_email        | TYK_DB_EMAILBACKEND_DEFAULTFROMEMAIL         |
| email_backend.default_from_name         | TYK_DB_EMAILBACKEND_DEFAULTFROMNAME          |
| hide_listen_path                        | TYK_DB_HIDELISTENPATH                        |
| sentry_code                             | TYK_DB_SENTRYCODE                            |
| sentry_js_code                          | TYK_DB_SENTRYJSCODE                          |
| use_sentry                              | TYK_DB_USESENTRY                             |
| enable_master_keys                      | TYK_DB_ENABLEMASTERKEYS                      |
| enable_duplicate_slugs                  | TYK_DB_ENABLEDUPLICATESLUGS                  |
| show_org_id                             | TYK_DB_SHOWORGID                             |
| host_config.enable_host_names           | TYK_DB_HOSTCONFIG_ENABLEHOSTNAMES            |
| host_config.disable_org_slug_prefix     | TYK_DB_HOSTCONFIG_DISABLEORGSLUGPREFIX       |
| host_config.hostname                    | TYK_DB_HOSTCONFIG_HOSTNAME                   |
| host_config.override_hostname           | TYK_DB_HOSTCONFIG_GATEWAYHOSTNAME            |
| host_config.portal_domains              | TYK_DB_HOSTCONFIG_PORTALDOMAINS              |
| host_config.portal_root_path            | TYK_DB_HOSTCONFIG_PORTALROOTPATH             |
| host_config.generate_secure_paths       | TYK_DB_HOSTCONFIG_GENERATEHTTPS              |
| host_config.use_strict_hostmatch        | TYK_DB_HOSTCONFIG_USESTRICT                  |
| http_server_options.use_ssl             | TYK_DB_HTTPSERVEROPTIONS_USESSL              |
| http_server_options.certificates        | TYK_DB_HTTPSERVEROPTIONS_CERTIFICATES        |
| http_server_options.min_version         | TYK_DB_HTTPSERVEROPTIONS_MINVERSION          |
| languages                               | TYK_DB_UI_LANGUAGES                          |
| hide_help                               | TYK_DB_UI_HIDEHELP                           |
| default_lang                            | TYK_DB_UI_DEFAULTLANG                        |
| login_page                              | TYK_DB_UI_LOGINPAGE                          |
| nav                                     | TYK_DB_UI_NAV                                |
| uptime                                  | TYK_DB_UI_UPTIME                             |
| portal_section                          | TYK_DB_UI_PORTALSECTION                      |
| designer                                | TYK_DB_UI_DESIGNER                           |
| dont_show_admin_sockets                 | TYK_DB_UI_DONTSHOWADMINSOCKETMESSAGES        |
| dont_allow_license_management           | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENT         |
| dont_allow_license_management_view      | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENTVIEW     |
| home_dir                                | TYK_DB_HOMEDIR                               |
| identity_broker.enabled                 | TYK_DB_TIB_ENABLED                           |
| identity_broker.host.connection_string  | TYK_DB_TIB_HOST_CONNECTIONSTRING             |
| identity_broker.host.secret             | TYK_DB_TIB_HOST_SECRET                       |
| tagging_options.tag_all_apis_by_org     | TYK_DB_TAGGINGOPTIONS_TAGALLAPISBYORG        |
| use_sharded_analytics                   | TYK_DB_USESHARDEDANLAYTICS                   |
| enable_aggregate_lookups                | TYK_DB_ENABLEAGGREGATELOOKUPS                |
| enable_analytics_cache                  | TYK_DB_ENABLEANALYTICSCACHE                  |
| aggregate_lookup_cutoff                 | TYK_DB_AGGREGATELOOKUPCUTOFF                 |
| maintenance_mode                        | TYK_DB_MAINTENANCEMODE                       |
| allow_explicit_policy_id                | TYK_DB_ALLOWEXPLICITPOLICYID                 |
| private_key_path                        | TYK_DB_PRIVATEKEYPATH                        |
| node_schema_path                        | TYK_DB_NODESCHEMADIR                         |
| oauth_redirect_uri_separator            | TYK_DB_OAUTHREDIRECTURISEPARATOR             |
