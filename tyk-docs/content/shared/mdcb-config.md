---
---
### listen_port
EV: **TYK_MDCB_LISTENPORT**<br />
Type: `int`<br />

The rpc port which worker gateways will connect to. Open this port to accept connections via your firewall.<br>If this value is not set, the MDCB application will apply a default value of 9091.

### healthcheck_port
EV: **TYK_MDCB_HEALTHCHECKPORT**<br />
Type: `int`<br />

This port lets MDCB allow standard health checks.<br>If this value is not set, the MDCB component will apply a default value of 8181.

### enable_http_profiler
EV: **TYK_MDCB_HTTPPROFILE**<br />
Type: `bool`<br />

Enable debugging of your Tyk MDCB by exposing profiling information.

### server_options.use_ssl
EV: **TYK_MDCB_SERVEROPTIONS_USESSL**<br />
Type: `bool`<br />

If use_ssl is set to true, you need to enter the cert_file and key_file path names for certificate.

### server_options.certificate
cert data to expose the http server

### server_options.certificate.cert_file
EV: **TYK_MDCB_SERVEROPTIONS_CERTIFICATE_CERTFILE**<br />
Type: `string`<br />

Filesystem location for pem encoded certificate

### server_options.certificate.key_file
EV: **TYK_MDCB_SERVEROPTIONS_CERTIFICATE_KEYFILE**<br />
Type: `string`<br />

Filesystem location for pem encoded private key

### server_options.min_version
EV: **TYK_MDCB_SERVEROPTIONS_MINVERSION**<br />
Type: `uint16`<br />

The `min_version` setting should be the minimum TLS protocol version required from the client.<br> For TLS 1.0 use 769<br>For TLS 1.1 use 770<br>For TLS 1.2 use 771<br>For TLS 1.3 use 772

### server_options.ssl_ciphers
EV: **TYK_MDCB_SERVEROPTIONS_CIPHERS**<br />
Type: `[]string`<br />

Is the list of names supported cipher suites (IANA) for TLS versions up to TLS 1.2. This defaults to a list of secure cipher suites.

### security.private_certificate_encoding_secret
EV: **TYK_MDCB_SECURITY_PRIVATECERTIFICATEENCODINGSECRET**<br />
Type: `string`<br />

Allows MDCB to use Mutual TLS. This requires that `server_options.use_ssl` is set to true. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/#a-name-mdcb-a-mdcb) for more details.

### storage
This section describes your centralised Redis DB. This will act as your master key store for all of your clusters.

### storage.type
EV: **TYK_MDCB_STORAGE_TYPE**<br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### storage.host
EV: **TYK_MDCB_STORAGE_HOST**<br />
Type: `string`<br />

Hostname of your Redis server

### storage.port
EV: **TYK_MDCB_STORAGE_PORT**<br />
Type: `int`<br />

The port the Redis server is listening on.

### storage.master_name
EV: **TYK_MDCB_STORAGE_MASTERNAME**<br />
Type: `string`<br />

It defines the sentinel master name

### storage.sentinel_password
EV: **TYK_MDCB_STORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

If set, redis sentinel will authenticate using this password.

### storage.username
EV: **TYK_MDCB_STORAGE_USERNAME**<br />
Type: `string`<br />

If set, a redis connection will be established with this user. If not set then it will defaults to the default redis user

### storage.password
EV: **TYK_MDCB_STORAGE_PASSWORD**<br />
Type: `string`<br />

Optional auth password for Redis db

### storage.database
EV: **TYK_MDCB_STORAGE_DATABASE**<br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### storage.optimisation_max_idle
EV: **TYK_MDCB_STORAGE_MAXIDLE**<br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### storage.optimisation_max_active
EV: **TYK_MDCB_STORAGE_MAXACTIVE**<br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### storage.enable_cluster
EV: **TYK_MDCB_STORAGE_ENABLECLUSTER**<br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### storage.hosts
EV: **TYK_MDCB_STORAGE_HOSTS**<br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### storage.addrs
EV: **TYK_MDCB_STORAGE_ADDRS**<br />
Type: `[]string`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### storage.redis_use_ssl
EV: **TYK_MDCB_STORAGE_REDISUSESSL**<br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### storage.redis_ssl_insecure_skip_verify
EV: **TYK_MDCB_STORAGE_REDISSSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### analytics
configuration of the store of analytics

### analytics.mongo_url
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOURL**<br />
Type: `string`<br />

Connection string for MongoDB.

### analytics.mongo_use_ssl
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOUSESSL**<br />
Type: `bool`<br />

A Boolean setting for Mongo SSL support. Set to true to enable SSL.

### analytics.mongo_ssl_insecure_skip_verify
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

This setting allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### analytics.mongo_ssl_allow_invalid_hostnames
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLALLOWINVALIDHOSTNAMES**<br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed

### analytics.mongo_ssl_ca_file
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLCAFILE**<br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### analytics.mongo_ssl_pem_keyfile
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLPEMKEYFILE**<br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.

### analytics.mongo_session_consistency
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSESSIONCONSISTENCY**<br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are:
* eventual
monotonic

### analytics.mongo_batch_size
EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOBATCHSIZE**<br />
Type: `int`<br />

Sets the batch size for mongo results.

### hash_keys
EV: **TYK_MDCB_HASHKEYS**<br />
Type: `bool`<br />

Set to true if you are using a hashed configuration installation of Tyk, otherwise set to false.

### session_timeout
EV: **TYK_MDCB_SESSIONTIMEOUT**<br />
Type: `int64`<br />

Number of seconds before the gateways are forced to re-login. Default is 86400 (24 hours).

### forward_analytics_to_pump
EV: **TYK_MDCB_FORWARDANALYTICSTOPUMP**<br />
Type: `bool`<br />

Instead of sending analytics directly to MongoDB, MDCB can send analytics to Redis. This will allow [tyk-pump] (https://github.com/TykTechnologies/tyk-pump) to pull analytics from Redis and send to your own data sinks.

### enable_multiple_analytics_keys
EV: **TYK_MDCB_ENABLEMULTIPLEANALYTICSKEYS**<br />
Type: `bool`<br />

Instead of saving all the analytics in one key, this will enable to save the analytics in multiple keys. It's specially useful when you are using Redis cluster. This will work only if `forward_analytics_to_pump` is true and tyk-pump is v1.2.1+ .

### dont_store_selective
EV: **TYK_MDCB_DONTSTORESELECTIVE**<br />
Type: `bool`<br />

set to true if you don't want to store selective analytics

### dont_store_aggregate
EV: **TYK_MDCB_DONTSTOREAGGREGATES**<br />
Type: `bool`<br />

Set to true to don't store aggregate analytics

### org_session_expiration
EV: **TYK_MDCB_ORGCACHEEXPIRATION**<br />
Type: `int`<br />

Sets the organization cache expiration in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+

### org_session_cleanup
EV: **TYK_MDCB_ORGCACHECLEANUP**<br />
Type: `int`<br />

Sets the organization cache cleanup interval in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+.

### license
EV: **TYK_MDCB_LICENSE**<br />
Type: `string`<br />

Enter your license in this section so MDCB can start.

### track_all_paths
EV: **TYK_MDCB_TRACKALLPATHS**<br />
Type: `bool`<br />

Currently, analytics for an endpoint is stored only if Track Endpoint plugin is enabled on that endpoint. If `track_all_paths` is enabled, it will store analytics for all the endpoints, irrespective of Track Endpoint plugin.

### store_analytics_per_minute
EV: **TYK_MDCB_STOREANALYTICSPERMINUTE**<br />
Type: `bool`<br />

Enable to generate aggregated per minute. By default it will generate aggregate data per hour. If this option is enabled, aggregate data will be generated per minute.

### threshold_len_tag_list
EV: **TYK_MDCB_THRESHOLDLENTAGLIST**<br />
Type: `int`<br />

 If number of tags in a document grows beyond `threshold_len_tag_list`, pump will throw a warning, it works for mongo aggregate pump. The warning will print top 5 common tag prefix. Default value is 1000. To disable alerts set it to -1.

### enable_separate_analytics_store
EV: **TYK_MDCB_ENABLESEPERATEANALYTICSSTORE**<br />
Type: `bool`<br />

Set it to true if you are using a separated analytic storage in the master gateway. If `forward_analytics_to_pump` is true, it will forward the analytics to the separated storage specified in `analytics_storage`.

### analytics_storage
This section describes your separated analytic Redis DB. It has the same fields as `storage`. It requires `enable_separate_analytics_store` set to true.

### analytics_storage.type
EV: **TYK_MDCB_ANALYTICSSTORAGE_TYPE**<br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### analytics_storage.host
EV: **TYK_MDCB_ANALYTICSSTORAGE_HOST**<br />
Type: `string`<br />

Hostname of your Redis server

### analytics_storage.port
EV: **TYK_MDCB_ANALYTICSSTORAGE_PORT**<br />
Type: `int`<br />

The port the Redis server is listening on.

### analytics_storage.master_name
EV: **TYK_MDCB_ANALYTICSSTORAGE_MASTERNAME**<br />
Type: `string`<br />

It defines the sentinel master name

### analytics_storage.sentinel_password
EV: **TYK_MDCB_ANALYTICSSTORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

If set, redis sentinel will authenticate using this password.

### analytics_storage.username
EV: **TYK_MDCB_ANALYTICSSTORAGE_USERNAME**<br />
Type: `string`<br />

If set, a redis connection will be established with this user. If not set then it will defaults to the default redis user

### analytics_storage.password
EV: **TYK_MDCB_ANALYTICSSTORAGE_PASSWORD**<br />
Type: `string`<br />

Optional auth password for Redis db

### analytics_storage.database
EV: **TYK_MDCB_ANALYTICSSTORAGE_DATABASE**<br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### analytics_storage.optimisation_max_idle
EV: **TYK_MDCB_ANALYTICSSTORAGE_MAXIDLE**<br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### analytics_storage.optimisation_max_active
EV: **TYK_MDCB_ANALYTICSSTORAGE_MAXACTIVE**<br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### analytics_storage.enable_cluster
EV: **TYK_MDCB_ANALYTICSSTORAGE_ENABLECLUSTER**<br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### analytics_storage.hosts
EV: **TYK_MDCB_ANALYTICSSTORAGE_HOSTS**<br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### analytics_storage.addrs
EV: **TYK_MDCB_ANALYTICSSTORAGE_ADDRS**<br />
Type: `[]string`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### analytics_storage.redis_use_ssl
EV: **TYK_MDCB_ANALYTICSSTORAGE_REDISUSESSL**<br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### analytics_storage.redis_ssl_insecure_skip_verify
EV: **TYK_MDCB_ANALYTICSSTORAGE_REDISSSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### log_level
EV: **TYK_MDCB_LOGLEVEL**<br />
Type: `string`<br />

You can now set a logging level (log_level). The following levels can be set: debug, info, warn, error.
If not set or left empty, it will default to `info`.

