### listen_port
EV: <b>TYK_MDCB_LISTENPORT</b><br />
Type: `int`<br />

The rpc port which worker gateways will connect to. Open this port to accept connections via your firewall.<br>If this value is not set, the MDCB application will apply a default value of 9091.

### healthcheck_port
EV: <b>TYK_MDCB_HEALTHCHECKPORT</b><br />
Type: `int`<br />

This port lets MDCB allow standard health checks.<br>If this value is not set, the MDCB component will apply a default value of 8181.

### enable_http_profiler
EV: <b>TYK_MDCB_HTTPPROFILE</b><br />
Type: `bool`<br />

Enable debugging of your Tyk MDCB by exposing profiling information.

### server_options
MDCB HTTP server configuration

### server_options.use_ssl
EV: <b>TYK_MDCB_SERVEROPTIONS_USESSL</b><br />
Type: `bool`<br />

If use_ssl is set to true, you need to enter the cert_file and key_file path names for certificate.

### server_options.certificate
cert data to expose the http server

### server_options.certificate.cert_file
EV: <b>TYK_MDCB_SERVEROPTIONS_CERTIFICATE_CERTFILE</b><br />
Type: `string`<br />

Filesystem location for pem encoded certificate

### server_options.certificate.key_file
EV: <b>TYK_MDCB_SERVEROPTIONS_CERTIFICATE_KEYFILE</b><br />
Type: `string`<br />

Filesystem location for pem encoded private key

### server_options.min_version
EV: <b>TYK_MDCB_SERVEROPTIONS_MINVERSION</b><br />
Type: `uint16`<br />

The `min_version` setting should be the minimum TLS protocol version required from the client.<br> For TLS 1.0 use 769<br>For TLS 1.1 use 770<br>For TLS 1.2 use 771<br>For TLS 1.3 use 772

### server_options.ssl_ciphers
EV: <b>TYK_MDCB_SERVEROPTIONS_CIPHERS</b><br />
Type: `[]string`<br />

Is the list of names supported cipher suites (IANA) for TLS versions up to TLS 1.2. This defaults to a list of secure cipher suites.

### server_options.ssl_certificates
EV: <b>TYK_MDCB_SERVEROPTIONS_SSLCERTIFICATES</b><br />
Type: `[]string`<br />

SSL certificates used by your MDCB server. A list of certificate IDs or path to files.

### security.private_certificate_encoding_secret
EV: <b>TYK_MDCB_SECURITY.PRIVATECERTIFICATEENCODINGSECRET</b><br />
Type: `string`<br />

Allows MDCB to use Mutual TLS. This requires that `server_options.use_ssl` is set to true. See [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls#a-name-mdcb-a-mdcb" >}}) for more details.

### storage
This section describes your centralised Redis DB. This will act as your master key store for all of your clusters.

### storage.type
EV: <b>TYK_MDCB_STORAGE_TYPE</b><br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### storage.host
EV: <b>TYK_MDCB_STORAGE_HOST</b><br />
Type: `string`<br />

Hostname of your Redis server

### storage.port
EV: <b>TYK_MDCB_STORAGE_PORT</b><br />
Type: `int`<br />

The port the Redis server is listening on.

### storage.master_name
EV: <b>TYK_MDCB_STORAGE_MASTERNAME</b><br />
Type: `string`<br />

It defines the sentinel master name

### storage.sentinel_password
EV: <b>TYK_MDCB_STORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

If set, redis sentinel will authenticate using this password.

### storage.username
EV: <b>TYK_MDCB_STORAGE_USERNAME</b><br />
Type: `string`<br />

If set, a redis connection will be established with this user. If not set then it will defaults to the default redis user

### storage.password
EV: <b>TYK_MDCB_STORAGE_PASSWORD</b><br />
Type: `string`<br />

Optional auth password for Redis db

### storage.database
EV: <b>TYK_MDCB_STORAGE_DATABASE</b><br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### storage.optimisation_max_idle
EV: <b>TYK_MDCB_STORAGE_MAXIDLE</b><br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### storage.optimisation_max_active
EV: <b>TYK_MDCB_STORAGE_MAXACTIVE</b><br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### storage.enable_cluster
EV: <b>TYK_MDCB_STORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### storage.hosts
EV: <b>TYK_MDCB_STORAGE_HOSTS</b><br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### storage.addrs
EV: <b>TYK_MDCB_STORAGE_ADDRS</b><br />
Type: `[]string`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### storage.redis_use_ssl
EV: <b>TYK_MDCB_STORAGE_REDISUSESSL</b><br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### storage.redis_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_STORAGE_REDISSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### analytics
configuration of the store of analytics

### analytics.type
EV: <b>TYK_MDCB_ANALYTICSCONFIG_TYPE</b><br />
Type: `DBType`<br />

Determines the storage type. It could be `mongo`, `postgres` or `sqlite`. By default, the value is `mongo`.

### analytics.connection_string
EV: <b>TYK_MDCB_ANALYTICSCONFIG_CONNECTIONSTRING</b><br />
Type: `string`<br />

This is used to configure the conenction string for the storage.

### analytics.table_sharding
EV: <b>TYK_MDCB_ANALYTICSCONFIG_TABLESHARDING</b><br />
Type: `bool`<br />

Enable table sharding for SQL Analytics

### analytics.batch_size
EV: <b>TYK_MDCB_ANALYTICSCONFIG_BATCHSIZE</b><br />
Type: `int`<br />

Max Batch size for SQL Analytics

### analytics.postgres.prefer_simple_protocol
EV: <b>TYK_MDCB_ANALYTICSCONFIG_POSTGRES_PREFERSIMPLEPROTOCOL</b><br />
Type: `bool`<br />

disables implicit prepared statement usage

### analytics.mysql.default_string_size
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MYSQL_DEFAULTSTRINGSIZE</b><br />
Type: `uint`<br />

default size for string fields. By default set to: 256

### analytics.mysql.disable_datetime_precision
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MYSQL_DISABLEDATETIMEPRECISION</b><br />
Type: `bool`<br />

disable datetime precision, which not supported before MySQL 5.6

### analytics.mysql.dont_support_rename_index
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MYSQL_DONTSUPPORTRENAMEINDEX</b><br />
Type: `bool`<br />

drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB

### analytics.mysql.dont_support_rename_column
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MYSQL_DONTSUPPORTRENAMECOLUMN</b><br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB

### analytics.mysql.skip_initialize_with_version
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MYSQL_SKIPINITIALIZEWITHVERSION</b><br />
Type: `bool`<br />

auto configure based on currently MySQL version

### analytics.mongo_url
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOURL</b><br />
Type: `string`<br />

Connection string for MongoDB.

### analytics.mongo_use_ssl
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOUSESSL</b><br />
Type: `bool`<br />

A Boolean setting for Mongo SSL support. Set to true to enable SSL.

### analytics.mongo_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

This setting allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### analytics.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed

### analytics.mongo_ssl_ca_file
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### analytics.mongo_ssl_pem_keyfile
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.

### analytics.mongo_session_consistency
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are:
* eventual
monotonic

### analytics.mongo_batch_size
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOBATCHSIZE</b><br />
Type: `int`<br />

Sets the batch size for mongo results.

### hash_keys
EV: <b>TYK_MDCB_HASHKEYS</b><br />
Type: `bool`<br />

Set to true if you are using a hashed configuration installation of Tyk, otherwise set to false.

### session_timeout
EV: <b>TYK_MDCB_SESSIONTIMEOUT</b><br />
Type: `int64`<br />

Number of seconds before the gateways are forced to re-login. Default is 86400 (24 hours).

### forward_analytics_to_pump
EV: <b>TYK_MDCB_FORWARDANALYTICSTOPUMP</b><br />
Type: `bool`<br />

Instead of sending analytics directly to MongoDB, MDCB can send analytics to Redis. This will allow [tyk-pump] (https://github.com/TykTechnologies/tyk-pump) to pull analytics from Redis and send to your own data sinks.

### enable_multiple_analytics_keys
EV: <b>TYK_MDCB_ENABLEMULTIPLEANALYTICSKEYS</b><br />
Type: `bool`<br />

Instead of saving all the analytics in one key, this will enable to save the analytics in multiple keys. It's specially useful when you are using Redis cluster. This will work only if `forward_analytics_to_pump` is true and tyk-pump is v1.2.1+ .

### dont_store_selective
EV: <b>TYK_MDCB_DONTSTORESELECTIVE</b><br />
Type: `bool`<br />

set to true if you don't want to store selective analytics

### dont_store_aggregate
EV: <b>TYK_MDCB_DONTSTOREAGGREGATES</b><br />
Type: `bool`<br />

Set to true to don't store aggregate analytics

### org_session_expiration
EV: <b>TYK_MDCB_ORGCACHEEXPIRATION</b><br />
Type: `int`<br />

Sets the organization cache expiration in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+

### org_session_cleanup
EV: <b>TYK_MDCB_ORGCACHECLEANUP</b><br />
Type: `int`<br />

Sets the organization cache cleanup interval in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+.

### license
EV: <b>TYK_MDCB_LICENSE</b><br />
Type: `string`<br />

Enter your license in this section so MDCB can start.

### track_all_paths
EV: <b>TYK_MDCB_TRACKALLPATHS</b><br />
Type: `bool`<br />

Currently, analytics for an endpoint is stored only if Track Endpoint plugin is enabled on that endpoint. If `track_all_paths` is enabled, it will store analytics for all the endpoints, irrespective of Track Endpoint plugin.

### store_analytics_per_minute
EV: <b>TYK_MDCB_STOREANALYTICSPERMINUTE</b><br />
Type: `bool`<br />

Enable to generate aggregated per minute. By default it will generate aggregate data per hour. If this option is enabled, aggregate data will be generated per minute.

### ignore_tag_prefix_list
EV: <b>TYK_MDCB_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

if set to true then it will not store analytics for tags having prefix specified in the list. **Note**: Prefix “key-” is added in the list by default. This tag is added by gateway for keys.

### threshold_len_tag_list
EV: <b>TYK_MDCB_THRESHOLDLENTAGLIST</b><br />
Type: `int`<br />

 If number of tags in a document grows beyond `threshold_len_tag_list`, pump will throw a warning, it works for mongo aggregate pump. The warning will print top 5 common tag prefix. Default value is 1000. To disable alerts set it to -1.

### omit_analytics_index_creation
EV: <b>TYK_MDCB_OMITANALYTICSINDEXCREATION</b><br />
Type: `bool`<br />

Set to true to disable the Mongo storages default index creation. More detailed behaviour explained at https://tyk.io/docs/tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config/#omitting-indexes.

### enable_separate_analytics_store
EV: <b>TYK_MDCB_ENABLESEPERATEANALYTICSSTORE</b><br />
Type: `bool`<br />

Set it to true if you are using a separated analytic storage in the master gateway. If `forward_analytics_to_pump` is true, it will forward the analytics to the separated storage specified in `analytics_storage`.

### analytics_storage
This section describes your separated analytic Redis DB. It has the same fields as `storage`. It requires `enable_separate_analytics_store` set to true.

### analytics_storage.type
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_TYPE</b><br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### analytics_storage.host
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_HOST</b><br />
Type: `string`<br />

Hostname of your Redis server

### analytics_storage.port
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_PORT</b><br />
Type: `int`<br />

The port the Redis server is listening on.

### analytics_storage.master_name
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MASTERNAME</b><br />
Type: `string`<br />

It defines the sentinel master name

### analytics_storage.sentinel_password
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

If set, redis sentinel will authenticate using this password.

### analytics_storage.username
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_USERNAME</b><br />
Type: `string`<br />

If set, a redis connection will be established with this user. If not set then it will defaults to the default redis user

### analytics_storage.password
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_PASSWORD</b><br />
Type: `string`<br />

Optional auth password for Redis db

### analytics_storage.database
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_DATABASE</b><br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### analytics_storage.optimisation_max_idle
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MAXIDLE</b><br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### analytics_storage.optimisation_max_active
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MAXACTIVE</b><br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### analytics_storage.enable_cluster
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### analytics_storage.hosts
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_HOSTS</b><br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### analytics_storage.addrs
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_ADDRS</b><br />
Type: `[]string`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### analytics_storage.redis_use_ssl
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_REDISUSESSL</b><br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### analytics_storage.redis_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_REDISSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### log_level
EV: <b>TYK_MDCB_LOGLEVEL</b><br />
Type: `string`<br />

You can now set a logging level (log_level). The following levels can be set: debug, info, warn, error.
If not set or left empty, it will default to `info`.

### enable_key_logging
EV: <b>TYK_MDCB_ENABLEKEYLOGGING</b><br />
Type: `bool`<br />

EnableKeyLogging prints the unhashed keys without obfuscating them in the logs

### sync_worker_config
Configuration of the MDCB Synchroniser functionality introduced in MDCB v2.0.0

### sync_worker_config.enabled
EV: <b>TYK_MDCB_SYNCWORKER_ENABLED</b><br />
Type: `bool`<br />

Enable the MDCB Synchroniser

### sync_worker_config.hash_keys
EV: <b>TYK_MDCB_SYNCWORKER_HASHKEYS</b><br />
Type: `bool`<br />

Allows the worker to synchronize hashed API keys. Set this to true if `hash_keys` is true in dashboard and gateway configuration.

### sync_worker_config.max_batch_size
EV: <b>TYK_MDCB_SYNCWORKER_MAXBATCHSIZE</b><br />
Type: `int`<br />

The maximum number of keys that we can fetch per batch. Default value: 1000 keys per batch.

### sync_worker_config.time_between_batches
EV: <b>TYK_MDCB_SYNCWORKER_TIMEBETWEENBATCHES</b><br />
Type: `int`<br />

Specifies a cooldown time between batches in seconds. 0 / disabled by default.

### sync_worker_config.max_workers
EV: <b>TYK_MDCB_SYNCWORKER_MAXWORKERS</b><br />
Type: `int`<br />

Specifies the maximum number of Groups (worker GW clusters) that can be synchronised by MDCB at the same time. Increasing this value can affect the operation of MDCB so it is recommended that you only modify this value if you need to synchronise a higher number of datacenters. Default value: 1000.

### sync_worker_config.warmup_time
EV: <b>TYK_MDCB_SYNCWORKER_WARMUPTIME</b><br />
Type: `int`<br />

Specifies the time (in seconds) that MDCB should wait before starting to synchronise workers with the controller. This is to allow the worker nodes to load APIs and policies from local Redis before synchronising the other resources. Default value: 2 seconds.

