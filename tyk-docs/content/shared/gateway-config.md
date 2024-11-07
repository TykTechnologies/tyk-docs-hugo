### hostname
ENV: <b>TYK_GW_HOSTNAME</b><br />
Type: `string`<br />

Force your Gateway to work only on a specific domain name. Can be overridden by API custom domain.

### listen_address
ENV: <b>TYK_GW_LISTENADDRESS</b><br />
Type: `string`<br />

If your machine has multiple network devices or IPs you can force the Gateway to use the IP address you want.

### listen_port
ENV: <b>TYK_GW_LISTENPORT</b><br />
Type: `int`<br />

Setting this value will change the port that Tyk listens on. Default: 8080.

### control_api_hostname
ENV: <b>TYK_GW_CONTROLAPIHOSTNAME</b><br />
Type: `string`<br />

Custom hostname for the Control API

### control_api_port
ENV: <b>TYK_GW_CONTROLAPIPORT</b><br />
Type: `int`<br />

Set to run your Gateway Control API on a separate port, and protect it behind a firewall if needed. Please make sure you follow this guide when setting the control port https://tyk.io/docs/planning-for-production/#change-your-control-port.

### secret
ENV: <b>TYK_GW_SECRET</b><br />
Type: `string`<br />

This should be changed as soon as Tyk is installed on your system.
This value is used in every interaction with the Tyk Gateway API. It should be passed along as the X-Tyk-Authorization header in any requests made.
Tyk assumes that you are sensible enough not to expose the management endpoints publicly and to keep this configuration value to yourself.

### node_secret
ENV: <b>TYK_GW_NODESECRET</b><br />
Type: `string`<br />

The shared secret between the Gateway and the Dashboard to ensure that API Definition downloads, heartbeat and Policy loads are from a valid source.

### pid_file_location
ENV: <b>TYK_GW_PIDFILELOCATION</b><br />
Type: `string`<br />

Linux PID file location. Do not change unless you know what you are doing. Default: /var/run/tyk/tyk-gateway.pid

### allow_insecure_configs
ENV: <b>TYK_GW_ALLOWINSECURECONFIGS</b><br />
Type: `bool`<br />

Can be set to disable Dashboard message signature verification. When set to `true`, `public_key_path` can be ignored.

### public_key_path
ENV: <b>TYK_GW_PUBLICKEYPATH</b><br />
Type: `string`<br />

While communicating with the Dashboard. By default, all messages are signed by a private/public key pair. Set path to public key.

### allow_remote_config
ENV: <b>TYK_GW_ALLOWREMOTECONFIG</b><br />
Type: `bool`<br />

Allow your Dashboard to remotely set Gateway configuration via the Nodes screen.

### security
Global Certificate configuration

### security.private_certificate_encoding_secret
ENV: <b>TYK_GW_SECURITY_PRIVATECERTIFICATEENCODINGSECRET</b><br />
Type: `string`<br />

Set the AES256 secret which is used to encode certificate private keys when they uploaded via certificate storage

### security.control_api_use_mutual_tls
ENV: <b>TYK_GW_SECURITY_CONTROLAPIUSEMUTUALTLS</b><br />
Type: `bool`<br />

Enable Gateway Control API to use Mutual TLS. Certificates can be set via `security.certificates.control_api` section

### security.pinned_public_keys
ENV: <b>TYK_GW_SECURITY_PINNEDPUBLICKEYS</b><br />
Type: `map[string]string`<br />

Specify public keys used for Certificate Pinning on global level.

### security.certificates.upstream
ENV: <b>TYK_GW_SECURITY_CERTIFICATES_UPSTREAM</b><br />
Type: `map[string]string`<br />

Specify upstream mutual TLS certificates at a global level in the following format: `{ "<host>": "<cert>" }``

### security.certificates.control_api
ENV: <b>TYK_GW_SECURITY_CERTIFICATES_CONTROLAPI</b><br />
Type: `[]string`<br />

Certificates used for Control API Mutual TLS

### security.certificates.dashboard_api
ENV: <b>TYK_GW_SECURITY_CERTIFICATES_DASHBOARD</b><br />
Type: `[]string`<br />

Used for communicating with the Dashboard if it is configured to use Mutual TLS

### security.certificates.mdcb_api
ENV: <b>TYK_GW_SECURITY_CERTIFICATES_MDCB</b><br />
Type: `[]string`<br />

Certificates used for MDCB Mutual TLS

### http_server_options
Gateway HTTP server configuration

### http_server_options.read_timeout
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_READTIMEOUT</b><br />
Type: `int`<br />

API Consumer -> Gateway network read timeout. Not setting this config, or setting this to 0, defaults to 120 seconds

### http_server_options.write_timeout
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_WRITETIMEOUT</b><br />
Type: `int`<br />

API Consumer -> Gateway network write timeout. Not setting this config, or setting this to 0, defaults to 120 seconds

### http_server_options.use_ssl
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_USESSL</b><br />
Type: `bool`<br />

Set to true to enable SSL connections

### http_server_options.enable_http2
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_ENABLEHTTP2</b><br />
Type: `bool`<br />

Enable HTTP2 protocol handling

### http_server_options.enable_strict_routes
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_ENABLESTRICTROUTES</b><br />
Type: `bool`<br />

EnableStrictRoutes changes the routing to avoid nearest-neighbour requests on overlapping routes

- if disabled, `/apple` will route to `/app`, the current default behavior,
- if enabled, `/app` only responds to `/app`, `/app/` and `/app/*` but not `/apple`

Regular expressions and parameterized routes will be left alone regardless of this setting.

### http_server_options.enable_path_prefix_matching
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHPREFIXMATCHING</b><br />
Type: `bool`<br />

EnablePathPrefixMatching changes how the gateway matches incoming URL paths against routes (patterns) defined in the API definition.
By default, the gateway uses wildcard matching. When EnablePathPrefixMatching is enabled, it switches to prefix matching. For example, a defined path such as `/json` will only match request URLs that begin with `/json`, rather than matching any URL containing `/json`.

The gateway checks the request URL against several variations depending on whether path versioning is enabled:
- Full path (listen path + version + endpoint): `/listen-path/v4/json`
- Non-versioned full path (listen path + endpoint): `/listen-path/json`
- Path without version (endpoint only): `/json`

For patterns that start with `/`, the gateway prepends `^` before performing the check, ensuring a true prefix match.
For patterns that start with `^`, the gateway will already perform prefix matching so EnablePathPrefixMatching will have no impact.
This option allows for more specific and controlled routing of API requests, potentially reducing unintended matches. Note that you may need to adjust existing route definitions when enabling this option.

Example:

With wildcard matching, `/json` might match `/api/v1/data/json`.
With prefix matching, `/json` would not match `/api/v1/data/json`, but would match `/json/data`.

Combining EnablePathPrefixMatching with EnablePathSuffixMatching will result in exact URL matching, with `/json` being evaluated as `^/json$`.

### http_server_options.enable_path_suffix_matching
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_ENABLEPATHSUFFIXMATCHING</b><br />
Type: `bool`<br />

EnablePathSuffixMatching changes how the gateway matches incoming URL paths against routes (patterns) defined in the API definition.
By default, the gateway uses wildcard matching. When EnablePathSuffixMatching is enabled, it switches to suffix matching. For example, a defined path such as `/json` will only match request URLs that end with `/json`, rather than matching any URL containing `/json`.

The gateway checks the request URL against several variations depending on whether path versioning is enabled:
- Full path (listen path + version + endpoint): `/listen-path/v4/json`
- Non-versioned full path (listen path + endpoint): `/listen-path/json`
- Path without version (endpoint only): `/json`

For patterns that already end with `$`, the gateway will already perform suffix matching so EnablePathSuffixMatching will have no impact. For all other patterns, the gateway appends `$` before performing the check, ensuring a true suffix match.
This option allows for more specific and controlled routing of API requests, potentially reducing unintended matches. Note that you may need to adjust existing route definitions when enabling this option.

Example:

With wildcard matching, `/json` might match `/api/v1/json/data`.
With suffix matching, `/json` would not match `/api/v1/json/data`, but would match `/api/v1/json`.

Combining EnablePathSuffixMatching with EnablePathPrefixMatching will result in exact URL matching, with `/json` being evaluated as `^/json$`.

### http_server_options.ssl_insecure_skip_verify
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS verification. Required if you are using self-signed certificates.

### http_server_options.enable_websockets
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_ENABLEWEBSOCKETS</b><br />
Type: `bool`<br />

Enabled WebSockets and server side events support

### http_server_options.certificates
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_CERTIFICATES</b><br />
Type: `CertsData`<br />

Deprecated. SSL certificates used by Gateway server.

### http_server_options.ssl_certificates
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SSLCERTIFICATES</b><br />
Type: `[]string`<br />

SSL certificates used by your Gateway server. A list of certificate IDs or path to files.

### http_server_options.server_name
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SERVERNAME</b><br />
Type: `string`<br />

Start your Gateway HTTP server on specific server name

### http_server_options.min_version
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_MINVERSION</b><br />
Type: `uint16`<br />

Minimum TLS version. Possible values: https://tyk.io/docs/basic-config-and-security/security/tls-and-ssl/#values-for-tls-versions

### http_server_options.max_version
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_MAXVERSION</b><br />
Type: `uint16`<br />

Maximum TLS version.

### http_server_options.skip_client_ca_announcement
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SKIPCLIENTCAANNOUNCEMENT</b><br />
Type: `bool`<br />

When mTLS enabled, this option allows to skip client CA announcement in the TLS handshake.
This option is useful when you have a lot of ClientCAs and you want to reduce the handshake overhead, as some clients can hit TLS handshake limits.
This option does not give any hints to the client, on which certificate to pick (but this is very rare situation when it is required)

### http_server_options.flush_interval
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_FLUSHINTERVAL</b><br />
Type: `int`<br />

Set this to the number of seconds that Tyk uses to flush content from the proxied upstream connection to the open downstream connection.
This option needed be set for streaming protocols like Server Side Events, or gRPC streaming.

### http_server_options.skip_url_cleaning
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SKIPURLCLEANING</b><br />
Type: `bool`<br />

Allow the use of a double slash in a URL path. This can be useful if you need to pass raw URLs to your API endpoints.
For example: `http://myapi.com/get/http://example.com`.

### http_server_options.skip_target_path_escaping
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_SKIPTARGETPATHESCAPING</b><br />
Type: `bool`<br />

Disable automatic character escaping, allowing to path original URL data to the upstream.

### http_server_options.ssl_ciphers
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_CIPHERS</b><br />
Type: `[]string`<br />

Custom SSL ciphers. See list of ciphers here https://tyk.io/docs/basic-config-and-security/security/tls-and-ssl/#specify-tls-cipher-suites-for-tyk-gateway--tyk-dashboard

### http_server_options.max_request_body_size
ENV: <b>TYK_GW_HTTPSERVEROPTIONS_MAXREQUESTBODYSIZE</b><br />
Type: `int64`<br />

MaxRequestBodySize configures a maximum size limit for request body size (in bytes) for all APIs on the Gateway.

Tyk Gateway will evaluate all API requests against this size limit and will respond with HTTP 413 status code if the body of the request is larger.

Two methods are used to perform the comparison:
 - If the API Request contains the `Content-Length` header, this is directly compared against `MaxRequestBodySize`.
 - If the `Content-Length` header is not provided, the Request body is read in chunks to compare total size against `MaxRequestBodySize`.

A value of zero (default) means that no maximum is set and API requests will not be tested.

See more information about setting request size limits here:
https://tyk.io/docs/basic-config-and-security/control-limit-traffic/request-size-limits/#maximum-request-sizes

### version_header
ENV: <b>TYK_GW_VERSIONHEADER</b><br />
Type: `string`<br />

Expose version header with a given name. Works only for versioned APIs.

### suppress_redis_signal_reload
ENV: <b>TYK_GW_SUPPRESSREDISSIGNALRELOAD</b><br />
Type: `bool`<br />

Disable dynamic API and Policy reloads, e.g. it will load new changes only on procecss start.

### reload_interval
ENV: <b>TYK_GW_RELOADINTERVAL</b><br />
Type: `int64`<br />

ReloadInterval defines a duration in seconds within which the gateway responds to a reload event.
The value defaults to 1, values lower than 1 are ignored.

### hash_keys
ENV: <b>TYK_GW_HASHKEYS</b><br />
Type: `bool`<br />

Enable Key hashing

### disable_key_actions_by_username
ENV: <b>TYK_GW_DISABLEKEYACTIONSBYUSERNAME</b><br />
Type: `bool`<br />

DisableKeyActionsByUsername disables key search by username.
When this is set to `true` you are able to search for keys only by keyID or key hash (if `hash_keys` is also set to `true`)
Note that if `hash_keys` is also set to `true` then the keyID will not be provided for APIs secured using basic auth. In this scenario the only search option would be to use key hash
If you are using the Tyk Dashboard, you must configure this setting with the same value in both Gateway and Dashboard

### hash_key_function
ENV: <b>TYK_GW_HASHKEYFUNCTION</b><br />
Type: `string`<br />

Specify the Key hashing algorithm. Possible values: murmur64, murmur128, sha256.

### basic_auth_hash_key_function
ENV: <b>TYK_GW_BASICAUTHHASHKEYFUNCTION</b><br />
Type: `string`<br />

Specify the Key hashing algorithm for "basic auth". Possible values: murmur64, murmur128, sha256, bcrypt.
Will default to "bcrypt" if not set.

### hash_key_function_fallback
ENV: <b>TYK_GW_HASHKEYFUNCTIONFALLBACK</b><br />
Type: `[]string`<br />

Specify your previous key hashing algorithm if you migrated from one algorithm to another.

### enable_hashed_keys_listing
ENV: <b>TYK_GW_ENABLEHASHEDKEYSLISTING</b><br />
Type: `bool`<br />

Allows the listing of hashed API keys

### min_token_length
ENV: <b>TYK_GW_MINTOKENLENGTH</b><br />
Type: `int`<br />

Minimum API token length

### template_path
ENV: <b>TYK_GW_TEMPLATEPATH</b><br />
Type: `string`<br />

Path to error and webhook templates. Defaults to the current binary path.

### policies
The policies section allows you to define where Tyk can find its policy templates. Policy templates are similar to key definitions in that they allow you to set quotas, access rights and rate limits for keys.
Policies are loaded when Tyk starts and if changed require a hot-reload so they are loaded into memory.
A policy can be defined in a file (Open Source installations) or from the same database as the Dashboard.

### policies.policy_source
ENV: <b>TYK_GW_POLICIES_POLICYSOURCE</b><br />
Type: `string`<br />

Set this value to `file` to look in the file system for a definition file. Set to `service` to use the Dashboard service.

### policies.policy_connection_string
ENV: <b>TYK_GW_POLICIES_POLICYCONNECTIONSTRING</b><br />
Type: `string`<br />

This option is required if `policies.policy_source` is set to `service`.
Set this to the URL of your Tyk Dashboard installation. The URL needs to be formatted as: http://dashboard_host:port.

### policies.policy_record_name
ENV: <b>TYK_GW_POLICIES_POLICYRECORDNAME</b><br />
Type: `string`<br />

This option only applies in OSS deployment when the `policies.policy_source` is either set
to `file` or an empty string. If `policies.policy_path` is not set, then Tyk will load policies
from the JSON file specified by `policies.policy_record_name`.

### policies.allow_explicit_policy_id
ENV: <b>TYK_GW_POLICIES_ALLOWEXPLICITPOLICYID</b><br />
Type: `bool`<br />

In a Pro installation, Tyk will load Policy IDs and use the internal object-ID as the ID of the policy.
This is not portable in cases where the data needs to be moved from installation to installation.

If you set this value to `true`, then the id parameter in a stored policy (or imported policy using the Dashboard API), will be used instead of the internal ID.

This option should only be used when moving an installation to a new database.

### policies.policy_path
ENV: <b>TYK_GW_POLICIES_POLICYPATH</b><br />
Type: `string`<br />

This option only applies in OSS deployment when the `policies.policy_source` is either set
to `file` or an empty string. If `policies.policy_path` is set, then Tyk will load policies
from all the JSON files under the directory specified by the `policies.policy_path` option.
In this configuration, Tyk Gateway will allow policy management through the Gateway API.

### ports_whitelist
ENV: <b>TYK_GW_PORTWHITELIST</b><br />
Type: `PortsWhiteList`<br />

Defines the ports that will be available for the API services to bind to in the format
documented here https://tyk.io/docs/key-concepts/tcp-proxy/#allowing-specific-ports.
Ports can be configured per protocol, e.g. https, tls etc.
If configuring via environment variable `TYK_GW_PORTWHITELIST` then remember to escape
JSON strings.

### disable_ports_whitelist
ENV: <b>TYK_GW_DISABLEPORTWHITELIST</b><br />
Type: `bool`<br />

Disable port whilisting, essentially allowing you to use any port for your API.

### app_path
ENV: <b>TYK_GW_APPPATH</b><br />
Type: `string`<br />

If Tyk is being used in its standard configuration (Open Source installations), then API definitions are stored in the apps folder (by default in /opt/tyk-gateway/apps).
This location is scanned for .json files and re-scanned at startup or reload.
See the API section of the Tyk Gateway API for more details.

### use_db_app_configs
ENV: <b>TYK_GW_USEDBAPPCONFIGS</b><br />
Type: `bool`<br />

If you are a Tyk Pro user, this option will enable polling the Dashboard service for API definitions.
On startup Tyk will attempt to connect and download any relevant application configurations from from your Dashboard instance.
The files are exactly the same as the JSON files on disk with the exception of a BSON ID supplied by the Dashboard service.

### db_app_conf_options
This section defines API loading and shard options. Enable these settings to selectively load API definitions on a node from your Dashboard service.

### db_app_conf_options.connection_string
ENV: <b>TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING</b><br />
Type: `string`<br />

Set the URL to your Dashboard instance (or a load balanced instance). The URL needs to be formatted as: `http://dashboard_host:port`

### db_app_conf_options.connection_timeout
ENV: <b>TYK_GW_DBAPPCONFOPTIONS_CONNECTIONTIMEOUT</b><br />
Type: `int`<br />

Set a timeout value, in seconds, for your Dashboard connection. Default value is 30.

### db_app_conf_options.node_is_segmented
ENV: <b>TYK_GW_DBAPPCONFOPTIONS_NODEISSEGMENTED</b><br />
Type: `bool`<br />

Set to `true` to enable filtering (sharding) of APIs.

### db_app_conf_options.tags
ENV: <b>TYK_GW_DBAPPCONFOPTIONS_TAGS</b><br />
Type: `[]string`<br />

The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as `OR` operations.
If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics).

### storage
This section defines your Redis configuration.

### storage.type
ENV: <b>TYK_GW_STORAGE_TYPE</b><br />
Type: `string`<br />

This should be set to `redis` (lowercase)

### storage.host
ENV: <b>TYK_GW_STORAGE_HOST</b><br />
Type: `string`<br />

The Redis host, by default this is set to `localhost`, but for production this should be set to a cluster.

### storage.port
ENV: <b>TYK_GW_STORAGE_PORT</b><br />
Type: `int`<br />

The Redis instance port.

### storage.addrs
ENV: <b>TYK_GW_STORAGE_ADDRS</b><br />
Type: `[]string`<br />

If you have multi-node setup, you should use this field instead. For example: ["host1:port1", "host2:port2"].

### storage.master_name
ENV: <b>TYK_GW_STORAGE_MASTERNAME</b><br />
Type: `string`<br />

Redis sentinel master name

### storage.sentinel_password
ENV: <b>TYK_GW_STORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

Redis sentinel password

### storage.username
ENV: <b>TYK_GW_STORAGE_USERNAME</b><br />
Type: `string`<br />

Redis user name

### storage.password
ENV: <b>TYK_GW_STORAGE_PASSWORD</b><br />
Type: `string`<br />

If your Redis instance has a password set for access, you can set it here.

### storage.database
ENV: <b>TYK_GW_STORAGE_DATABASE</b><br />
Type: `int`<br />

Redis database

### storage.optimisation_max_idle
ENV: <b>TYK_GW_STORAGE_MAXIDLE</b><br />
Type: `int`<br />

Set the number of maximum idle connections in the Redis connection pool, which defaults to 100. Set to a higher value if you are expecting more traffic.

### storage.optimisation_max_active
ENV: <b>TYK_GW_STORAGE_MAXACTIVE</b><br />
Type: `int`<br />

Set the number of maximum connections in the Redis connection pool, which defaults to 500. Set to a higher value if you are expecting more traffic.

### storage.timeout
ENV: <b>TYK_GW_STORAGE_TIMEOUT</b><br />
Type: `int`<br />

Set a custom timeout for Redis network operations. Default value 5 seconds.

### storage.enable_cluster
ENV: <b>TYK_GW_STORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

Enable Redis Cluster support

### storage.use_ssl
ENV: <b>TYK_GW_STORAGE_USESSL</b><br />
Type: `bool`<br />

Enable SSL/TLS connection between your Tyk Gateway & Redis.

### storage.ssl_insecure_skip_verify
ENV: <b>TYK_GW_STORAGE_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS verification

### storage.ca_file
ENV: <b>TYK_GW_STORAGE_CAFILE</b><br />
Type: `string`<br />

Path to the CA file.

### storage.cert_file
ENV: <b>TYK_GW_STORAGE_CERTFILE</b><br />
Type: `string`<br />

Path to the cert file.

### storage.key_file
ENV: <b>TYK_GW_STORAGE_KEYFILE</b><br />
Type: `string`<br />

Path to the key file.

### storage.tls_max_version
ENV: <b>TYK_GW_STORAGE_TLSMAXVERSION</b><br />
Type: `string`<br />

Maximum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.3".

### storage.tls_min_version
ENV: <b>TYK_GW_STORAGE_TLSMINVERSION</b><br />
Type: `string`<br />

Minimum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.2".

### disable_dashboard_zeroconf
ENV: <b>TYK_GW_DISABLEDASHBOARDZEROCONF</b><br />
Type: `bool`<br />

Disable the capability of the Gateway to `autodiscover` the Dashboard through heartbeat messages via Redis.
The goal of zeroconf is auto-discovery, so you do not have to specify the Tyk Dashboard address in your Gateway`tyk.conf` file.
In some specific cases, for example, when the Dashboard is bound to a public domain, not accessible inside an internal network, or similar, `disable_dashboard_zeroconf` can be set to `true`, in favor of directly specifying a Tyk Dashboard address.

### slave_options
The `slave_options` allow you to configure the RPC slave connection required for MDCB installations.
These settings must be configured for every RPC slave/worker node.

### slave_options.use_rpc
ENV: <b>TYK_GW_SLAVEOPTIONS_USERPC</b><br />
Type: `bool`<br />

Set to `true` to connect a worker Gateway using RPC.

### slave_options.use_ssl
ENV: <b>TYK_GW_SLAVEOPTIONS_USESSL</b><br />
Type: `bool`<br />

Set this option to `true` to use an SSL RPC connection.

### slave_options.ssl_insecure_skip_verify
ENV: <b>TYK_GW_SLAVEOPTIONS_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped.
This can be useful if you use a self-signed certificate.

### slave_options.connection_string
ENV: <b>TYK_GW_SLAVEOPTIONS_CONNECTIONSTRING</b><br />
Type: `string`<br />

Use this setting to add the URL for your MDCB or load balancer host.

### slave_options.rpc_key
ENV: <b>TYK_GW_SLAVEOPTIONS_RPCKEY</b><br />
Type: `string`<br />

Your organization ID to connect to the MDCB installation.

### slave_options.api_key
ENV: <b>TYK_GW_SLAVEOPTIONS_APIKEY</b><br />
Type: `string`<br />

This the API key of a user used to authenticate and authorise the Gateway’s access through MDCB.
The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised.
The suggested security settings are read for Real-time notifications and the remaining options set to deny.

### slave_options.enable_rpc_cache
ENV: <b>TYK_GW_SLAVEOPTIONS_ENABLERPCCACHE</b><br />
Type: `bool`<br />

Set this option to `true` to enable RPC caching for keys.

### slave_options.bind_to_slugs
ENV: <b>TYK_GW_SLAVEOPTIONS_BINDTOSLUGSINSTEADOFLISTENPATHS</b><br />
Type: `bool`<br />

For an Self-Managed installation this can be left at `false` (the default setting). For Legacy Cloud Gateways it must be set to ‘true’.

### slave_options.disable_keyspace_sync
ENV: <b>TYK_GW_SLAVEOPTIONS_DISABLEKEYSPACESYNC</b><br />
Type: `bool`<br />

Set this option to `true` if you don’t want to monitor changes in the keys from a primary Gateway.

### slave_options.group_id
ENV: <b>TYK_GW_SLAVEOPTIONS_GROUPID</b><br />
Type: `string`<br />

This is the `zone` that this instance inhabits, e.g. the cluster/data-center the Gateway lives in.
The group ID must be the same across all the Gateways of a data-center/cluster which are also sharing the same Redis instance.
This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates).

### slave_options.call_timeout
ENV: <b>TYK_GW_SLAVEOPTIONS_CALLTIMEOUT</b><br />
Type: `int`<br />

Call Timeout allows to specify a time in seconds for the maximum allowed duration of a RPC call.

### slave_options.ping_timeout
ENV: <b>TYK_GW_SLAVEOPTIONS_PINGTIMEOUT</b><br />
Type: `int`<br />

The maximum time in seconds that a RPC ping can last.

### slave_options.rpc_pool_size
ENV: <b>TYK_GW_SLAVEOPTIONS_RPCPOOLSIZE</b><br />
Type: `int`<br />

The number of RPC connections in the pool. Basically it creates a set of connections that you can re-use as needed. Defaults to 5.

### slave_options.key_space_sync_interval
ENV: <b>TYK_GW_SLAVEOPTIONS_KEYSPACESYNCINTERVAL</b><br />
Type: `float32`<br />

You can use this to set a period for which the Gateway will check if there are changes in keys that must be synchronized. If this value is not set then it will default to 10 seconds.

### slave_options.rpc_cert_cache_expiration
ENV: <b>TYK_GW_SLAVEOPTIONS_RPCCERTCACHEEXPIRATION</b><br />
Type: `float32`<br />

RPCCertCacheExpiration defines the expiration time of the rpc cache that stores the certificates, defined in seconds

### slave_options.rpc_global_cache_expiration
ENV: <b>TYK_GW_SLAVEOPTIONS_RPCGLOBALCACHEEXPIRATION</b><br />
Type: `float32`<br />

RPCKeysCacheExpiration defines the expiration time of the rpc cache that stores the keys, defined in seconds

### slave_options.synchroniser_enabled
ENV: <b>TYK_GW_SLAVEOPTIONS_SYNCHRONISERENABLED</b><br />
Type: `bool`<br />

SynchroniserEnabled enable this config if MDCB has enabled the synchoniser. If disabled then it will ignore signals to synchonise recources

### management_node
ENV: <b>TYK_GW_MANAGEMENTNODE</b><br />
Type: `bool`<br />

If set to `true`, distributed rate limiter will be disabled for this node, and it will be excluded from any rate limit calculation.

{{< note success >}}
**Note**

If you set `db_app_conf_options.node_is_segmented` to `true` for multiple Gateway nodes, you should ensure that `management_node` is set to `false`.
This is to ensure visibility for the management node across all APIs.
{{< /note >}}

### auth_override
This is used as part of the RPC / Hybrid back-end configuration in a Tyk Enterprise installation and isn’t used anywhere else.

### enable_redis_rolling_limiter
ENV: <b>TYK_GW_ENABLEREDISROLLINGLIMITER</b><br />
Type: `bool`<br />

Redis based rate limiter with fixed window. Provides 100% rate limiting accuracy, but require two additional Redis roundtrip for each request.

### enable_sentinel_rate_limiter
ENV: <b>TYK_GW_ENABLESENTINELRATELIMITER</b><br />
Type: `bool`<br />

To enable, set to `true`. The sentinel-based rate limiter delivers a smoother performance curve as rate-limit calculations happen off-thread, but a stricter time-out based cool-down for clients. For example, when a throttling action is triggered, they are required to cool-down for the period of the rate limit.
Disabling the sentinel based rate limiter will make rate-limit calculations happen on-thread and therefore offers a staggered cool-down and a smoother rate-limit experience for the client.
For example, you can slow your connection throughput to regain entry into your rate limit. This is more of a “throttle” than a “block”.
The standard rate limiter offers similar performance as the sentinel-based limiter. This is disabled by default.

### enable_non_transactional_rate_limiter
ENV: <b>TYK_GW_ENABLENONTRANSACTIONALRATELIMITER</b><br />
Type: `bool`<br />

An enhancement for the Redis and Sentinel rate limiters, that offers a significant improvement in performance by not using transactions on Redis rate-limit buckets.

### drl_notification_frequency
ENV: <b>TYK_GW_DRLNOTIFICATIONFREQUENCY</b><br />
Type: `int`<br />

How frequently a distributed rate limiter synchronises information between the Gateway nodes. Default: 2 seconds.

### drl_threshold
ENV: <b>TYK_GW_DRLTHRESHOLD</b><br />
Type: `float64`<br />

A distributed rate limiter is inaccurate on small rate limits, and it will fallback to a Redis or Sentinel rate limiter on an individual user basis, if its rate limiter lower then threshold.
A Rate limiter threshold calculated using the following formula: `rate_threshold = drl_threshold * number_of_gateways`.
So you have 2 Gateways, and your threshold is set to 5, if a user rate limit is larger than 10, it will use the distributed rate limiter algorithm.
Default: 5

### drl_enable_sentinel_rate_limiter
ENV: <b>TYK_GW_DRLENABLESENTINELRATELIMITER</b><br />
Type: `bool`<br />

Controls which algorthm to use as a fallback when your distributed rate limiter can't be used.

### enforce_org_data_age
ENV: <b>TYK_GW_ENFORCEORGDATAAGE</b><br />
Type: `bool`<br />

Allows you to dynamically configure analytics expiration on a per organization level

### enforce_org_data_detail_logging
ENV: <b>TYK_GW_ENFORCEORGDATADETAILLOGGING</b><br />
Type: `bool`<br />

Allows you to dynamically configure detailed logging on a per organization level

### enforce_org_quotas
ENV: <b>TYK_GW_ENFORCEORGQUOTAS</b><br />
Type: `bool`<br />

Allows you to dynamically configure organization quotas on a per organization level

### monitor
The monitor section is useful if you wish to enforce a global trigger limit on organization and user quotas.
This feature will trigger a webhook event to fire when specific triggers are reached.
Triggers can be global (set in the node), by organization (set in the organization session object) or by key (set in the key session object)

While Organization-level and Key-level triggers can be tiered (e.g. trigger at 10%, trigger at 20%, trigger at 80%), in the node-level configuration only a global value can be set.
If a global value and specific trigger level are the same the trigger will only fire once:

```
"monitor": {
  "enable_trigger_monitors": true,
  "configuration": {
   "method": "POST",
   "target_path": "http://domain.com/notify/quota-trigger",
   "template_path": "templates/monitor_template.json",
   "header_map": {
     "some-secret": "89787855"
   },
   "event_timeout": 10
 },
 "global_trigger_limit": 80.0,
 "monitor_user_keys": false,
 "monitor_org_keys": true
},
```

### monitor.enable_trigger_monitors
ENV: <b>TYK_GW_MONITOR_ENABLETRIGGERMONITORS</b><br />
Type: `bool`<br />

Set this to `true` to have monitors enabled in your configuration for the node.

### monitor.configuration.method
ENV: <b>TYK_GW_MONITOR_CONFIG_METHOD</b><br />
Type: `string`<br />

The method to use for the webhook.

### monitor.configuration.target_path
ENV: <b>TYK_GW_MONITOR_CONFIG_TARGETPATH</b><br />
Type: `string`<br />

The target path on which to send the request.

### monitor.configuration.template_path
ENV: <b>TYK_GW_MONITOR_CONFIG_TEMPLATEPATH</b><br />
Type: `string`<br />

The template to load in order to format the request.

### monitor.configuration.header_map
ENV: <b>TYK_GW_MONITOR_CONFIG_HEADERLIST</b><br />
Type: `map[string]string`<br />

Headers to set when firing the webhook.

### monitor.configuration.event_timeout
ENV: <b>TYK_GW_MONITOR_CONFIG_EVENTTIMEOUT</b><br />
Type: `int64`<br />

The cool-down for the event so it does not trigger again (in seconds).

### monitor.global_trigger_limit
ENV: <b>TYK_GW_MONITOR_GLOBALTRIGGERLIMIT</b><br />
Type: `float64`<br />

The trigger limit, as a percentage of the quota that must be reached in order to trigger the event, any time the quota percentage is increased the event will trigger.

### monitor.monitor_user_keys
ENV: <b>TYK_GW_MONITOR_MONITORUSERKEYS</b><br />
Type: `bool`<br />

Apply the monitoring subsystem to user keys.

### monitor.monitor_org_keys
ENV: <b>TYK_GW_MONITOR_MONITORORGKEYS</b><br />
Type: `bool`<br />

Apply the monitoring subsystem to organization keys.

### max_idle_connections
ENV: <b>TYK_GW_MAXIDLECONNS</b><br />
Type: `int`<br />

Maximum idle connections, per API, between Tyk and Upstream. By default not limited.

### max_idle_connections_per_host
ENV: <b>TYK_GW_MAXIDLECONNSPERHOST</b><br />
Type: `int`<br />

Maximum idle connections, per API, per upstream, between Tyk and Upstream. Default:100

### max_conn_time
ENV: <b>TYK_GW_MAXCONNTIME</b><br />
Type: `int64`<br />

Maximum connection time. If set it will force gateway reconnect to the upstream.

### close_connections
ENV: <b>TYK_GW_CLOSECONNECTIONS</b><br />
Type: `bool`<br />

If set, disable keepalive between User and Tyk

### enable_custom_domains
ENV: <b>TYK_GW_ENABLECUSTOMDOMAINS</b><br />
Type: `bool`<br />

Allows you to use custom domains

### allow_master_keys
ENV: <b>TYK_GW_ALLOWMASTERKEYS</b><br />
Type: `bool`<br />

If AllowMasterKeys is set to true, session objects (key definitions) that do not have explicit access rights set
will be allowed by Tyk. This means that keys that are created have access to ALL APIs, which in many cases is
unwanted behavior unless you are sure about what you are doing.

### service_discovery.default_cache_timeout
ENV: <b>TYK_GW_SERVICEDISCOVERY_DEFAULTCACHETIMEOUT</b><br />
Type: `int`<br />

Service discovery cache timeout

### proxy_ssl_insecure_skip_verify
ENV: <b>TYK_GW_PROXYSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Globally ignore TLS verification between Tyk and your Upstream services

### proxy_enable_http2
ENV: <b>TYK_GW_PROXYENABLEHTTP2</b><br />
Type: `bool`<br />

Enable HTTP2 support between Tyk and your upstream service. Required for gRPC.

### proxy_ssl_min_version
ENV: <b>TYK_GW_PROXYSSLMINVERSION</b><br />
Type: `uint16`<br />

Minimum TLS version for connection between Tyk and your upstream service.

### proxy_ssl_max_version
ENV: <b>TYK_GW_PROXYSSLMAXVERSION</b><br />
Type: `uint16`<br />

Maximum TLS version for connection between Tyk and your upstream service.

### proxy_ssl_ciphers
ENV: <b>TYK_GW_PROXYSSLCIPHERSUITES</b><br />
Type: `[]string`<br />

Allow list of ciphers for connection between Tyk and your upstream service.

### proxy_default_timeout
ENV: <b>TYK_GW_PROXYDEFAULTTIMEOUT</b><br />
Type: `float64`<br />

This can specify a default timeout in seconds for upstream API requests.
Default: 30 seconds

### proxy_ssl_disable_renegotiation
ENV: <b>TYK_GW_PROXYSSLDISABLERENEGOTIATION</b><br />
Type: `bool`<br />

Disable TLS renegotiation.

### proxy_close_connections
ENV: <b>TYK_GW_PROXYCLOSECONNECTIONS</b><br />
Type: `bool`<br />

Disable keepalives between Tyk and your upstream service.
Set this value to `true` to force Tyk to close the connection with the server, otherwise the connections will remain open for as long as your OS keeps TCP connections open.
This can cause a file-handler limit to be exceeded. Setting to false can have performance benefits as the connection can be reused.

### uptime_tests
Tyk nodes can provide uptime awareness, uptime testing and analytics for your underlying APIs uptime and availability.
Tyk can also notify you when a service goes down.

### uptime_tests.disable
ENV: <b>TYK_GW_UPTIMETESTS_DISABLE</b><br />
Type: `bool`<br />

To disable uptime tests on this node, set this value to `true`.

### uptime_tests.poller_group
ENV: <b>TYK_GW_UPTIMETESTS_POLLERGROUP</b><br />
Type: `string`<br />

If you have multiple Gateway clusters connected to the same Redis instance, you need to set a unique poller group for each cluster.

### uptime_tests.config.failure_trigger_sample_size
ENV: <b>TYK_GW_UPTIMETESTS_CONFIG_FAILURETRIGGERSAMPLESIZE</b><br />
Type: `int`<br />

The sample size to trigger a `HostUp` or `HostDown` event. For example, a setting of 3 will require at least three failures to occur before the uptime test is triggered.

### uptime_tests.config.time_wait
ENV: <b>TYK_GW_UPTIMETESTS_CONFIG_TIMEWAIT</b><br />
Type: `int`<br />

The value in seconds between tests runs. All tests will run simultaneously. This value will set the time between those tests. So a value of 60 will run all uptime tests every 60 seconds.

### uptime_tests.config.checker_pool_size
ENV: <b>TYK_GW_UPTIMETESTS_CONFIG_CHECKERPOOLSIZE</b><br />
Type: `int`<br />

The goroutine pool size to keep idle for uptime tests. If you have many uptime tests running at a high time period, then increase this value.

### uptime_tests.config.enable_uptime_analytics
ENV: <b>TYK_GW_UPTIMETESTS_CONFIG_ENABLEUPTIMEANALYTICS</b><br />
Type: `bool`<br />

Set this value to `true` to have the node capture and record analytics data regarding the uptime tests.

### health_check
This section enables the configuration of the health-check API endpoint and the size of the sample data cache (in seconds).

### health_check.enable_health_checks
ENV: <b>TYK_GW_HEALTHCHECK_ENABLEHEALTHCHECKS</b><br />
Type: `bool`<br />

Setting this value to `true` will enable the health-check endpoint on /Tyk/health.

### health_check.health_check_value_timeouts
ENV: <b>TYK_GW_HEALTHCHECK_HEALTHCHECKVALUETIMEOUT</b><br />
Type: `int64`<br />

This setting defaults to 60 seconds. This is the time window that Tyk uses to sample health-check data.
You can set a higher value for more accurate data (a larger sample period), or a lower value for less accurate data.
The reason this value is configurable is because sample data takes up space in your Redis DB to store the data to calculate samples. On high-availability systems this may not be desirable and smaller values may be preferred.

### health_check_endpoint_name
ENV: <b>TYK_GW_HEALTHCHECKENDPOINTNAME</b><br />
Type: `string`<br />

Enables you to rename the /hello endpoint

### oauth_refresh_token_expire
ENV: <b>TYK_GW_OAUTHREFRESHEXPIRE</b><br />
Type: `int64`<br />

Change the expiry time of a refresh token. By default 14 days (in seconds).

### oauth_token_expire
ENV: <b>TYK_GW_OAUTHTOKENEXPIRE</b><br />
Type: `int32`<br />

Change the expiry time of OAuth tokens (in seconds).

### oauth_token_expired_retain_period
ENV: <b>TYK_GW_OAUTHTOKENEXPIREDRETAINPERIOD</b><br />
Type: `int32`<br />

Specifies how long expired tokens are stored in Redis. The value is in seconds and the default is 0. Using the default means expired tokens are never removed from Redis.

### oauth_redirect_uri_separator
ENV: <b>TYK_GW_OAUTHREDIRECTURISEPARATOR</b><br />
Type: `string`<br />

Character which should be used as a separator for OAuth redirect URI URLs. Default: ;.

### oauth_error_status_code
ENV: <b>TYK_GW_OAUTHERRORSTATUSCODE</b><br />
Type: `int`<br />

Configures the OAuth error status code returned. If not set, it defaults to a 403 error.

### enable_key_logging
ENV: <b>TYK_GW_ENABLEKEYLOGGING</b><br />
Type: `bool`<br />

By default all key IDs in logs are hidden. Set to `true` if you want to see them for debugging reasons.

### ssl_force_common_name_check
ENV: <b>TYK_GW_SSLFORCECOMMONNAMECHECK</b><br />
Type: `bool`<br />

Force the validation of the hostname against the common name, even if TLS verification is disabled.

### enable_analytics
ENV: <b>TYK_GW_ENABLEANALYTICS</b><br />
Type: `bool`<br />

Tyk is capable of recording every hit to your API to a database with various filtering parameters. Set this value to `true` and fill in the sub-section below to enable logging.

{{< note success >}}
**Note**

For performance reasons, Tyk will store traffic data to Redis initially and then purge the data from Redis to MongoDB or other data stores on a regular basis as determined by the purge_delay setting in your Tyk Pump configuration.
{{< /note >}}

### analytics_config
This section defines options on what analytics data to store.

### analytics_config.type
ENV: <b>TYK_GW_ANALYTICSCONFIG_TYPE</b><br />
Type: `string`<br />

Set empty for a Self-Managed installation or `rpc` for multi-cloud.

### analytics_config.ignored_ips
ENV: <b>TYK_GW_ANALYTICSCONFIG_IGNOREDIPS</b><br />
Type: `[]string`<br />

Adding IP addresses to this list will cause Tyk to ignore these IPs in the analytics data. These IP addresses will not produce an analytics log record.
This is useful for health checks and other samplers that might skew usage data.
The IP addresses must be provided as a JSON array, with the values being single IPs. CIDR values are not supported.

### analytics_config.enable_detailed_recording
ENV: <b>TYK_GW_ANALYTICSCONFIG_ENABLEDETAILEDRECORDING</b><br />
Type: `bool`<br />

Set this value to `true` to have Tyk store the inbound request and outbound response data in HTTP Wire format as part of the Analytics data.
Please note, this will greatly increase your analytics DB size and can cause performance degradation on analytics processing by the Dashboard.
This setting can be overridden with an organization flag, enabed at an API level, or on individual Key level.

### analytics_config.enable_geo_ip
ENV: <b>TYK_GW_ANALYTICSCONFIG_ENABLEGEOIP</b><br />
Type: `bool`<br />

Tyk can store GeoIP information based on MaxMind DB’s to enable GeoIP tracking on inbound request analytics. Set this value to `true` and assign a DB using the `geo_ip_db_path` setting.

### analytics_config.geo_ip_db_path
ENV: <b>TYK_GW_ANALYTICSCONFIG_GEOIPDBLOCATION</b><br />
Type: `string`<br />

Path to a MaxMind GeoIP database
The analytics GeoIP DB can be replaced on disk. It will cleanly auto-reload every hour.

### analytics_config.normalise_urls
This section describes methods that enable you to normalise inbound URLs in your analytics to have more meaningful per-path data.

### analytics_config.normalise_urls.enabled
ENV: <b>TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_ENABLED</b><br />
Type: `bool`<br />

Set this to `true` to enable normalisation.

### analytics_config.normalise_urls.normalise_uuids
ENV: <b>TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_NORMALISEUUIDS</b><br />
Type: `bool`<br />

Each UUID will be replaced with a placeholder {uuid}

### analytics_config.normalise_urls.normalise_ulids
ENV: <b>TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_NORMALISEULIDS</b><br />
Type: `bool`<br />

Each ULID will be replaced with a placeholder {ulid}

### analytics_config.normalise_urls.normalise_numbers
ENV: <b>TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_NORMALISENUMBERS</b><br />
Type: `bool`<br />

Set this to true to have Tyk automatically match for numeric IDs, it will match with a preceding slash so as not to capture actual numbers:

### analytics_config.normalise_urls.custom_patterns
ENV: <b>TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_CUSTOM</b><br />
Type: `[]string`<br />

This is a list of custom patterns you can add. These must be valid regex strings. Tyk will replace these values with a {var} placeholder.

### analytics_config.pool_size
ENV: <b>TYK_GW_ANALYTICSCONFIG_POOLSIZE</b><br />
Type: `int`<br />

Number of workers used to process analytics. Defaults to number of CPU cores.

### analytics_config.records_buffer_size
ENV: <b>TYK_GW_ANALYTICSCONFIG_RECORDSBUFFERSIZE</b><br />
Type: `uint64`<br />

Number of records in analytics queue, per worker. Default: 1000.

### analytics_config.storage_expiration_time
ENV: <b>TYK_GW_ANALYTICSCONFIG_STORAGEEXPIRATIONTIME</b><br />
Type: `int`<br />

You can set a time (in seconds) to configure how long analytics are kept if they are not processed. The default is 60 seconds.
This is used to prevent the potential infinite growth of Redis analytics storage.

### analytics_config.enable_multiple_analytics_keys
ENV: <b>TYK_GW_ANALYTICSCONFIG_ENABLEMULTIPLEANALYTICSKEYS</b><br />
Type: `bool`<br />

Set this to `true` to have Tyk automatically divide the analytics records in multiple analytics keys.
This is especially useful when `storage.enable_cluster` is set to `true` since it will distribute the analytic keys across all the cluster nodes.

### analytics_config.purge_interval
ENV: <b>TYK_GW_ANALYTICSCONFIG_PURGEINTERVAL</b><br />
Type: `float32`<br />

You can set the interval length on how often the tyk Gateway will purge analytics data. This value is in seconds and defaults to 10 seconds.

### analytics_config.serializer_type
ENV: <b>TYK_GW_ANALYTICSCONFIG_SERIALIZERTYPE</b><br />
Type: `string`<br />

Determines the serialization engine for analytics. Available options: msgpack, and protobuf. By default, msgpack.

### enable_separate_analytics_store
ENV: <b>TYK_GW_ENABLESEPERATEANALYTICSSTORE</b><br />
Type: `bool`<br />

Enable separate analytics storage. Used together with `analytics_storage`.

### analytics_storage.type
ENV: <b>TYK_GW_ANALYTICSSTORAGE_TYPE</b><br />
Type: `string`<br />

This should be set to `redis` (lowercase)

### analytics_storage.host
ENV: <b>TYK_GW_ANALYTICSSTORAGE_HOST</b><br />
Type: `string`<br />

The Redis host, by default this is set to `localhost`, but for production this should be set to a cluster.

### analytics_storage.port
ENV: <b>TYK_GW_ANALYTICSSTORAGE_PORT</b><br />
Type: `int`<br />

The Redis instance port.

### analytics_storage.addrs
ENV: <b>TYK_GW_ANALYTICSSTORAGE_ADDRS</b><br />
Type: `[]string`<br />

If you have multi-node setup, you should use this field instead. For example: ["host1:port1", "host2:port2"].

### analytics_storage.master_name
ENV: <b>TYK_GW_ANALYTICSSTORAGE_MASTERNAME</b><br />
Type: `string`<br />

Redis sentinel master name

### analytics_storage.sentinel_password
ENV: <b>TYK_GW_ANALYTICSSTORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

Redis sentinel password

### analytics_storage.username
ENV: <b>TYK_GW_ANALYTICSSTORAGE_USERNAME</b><br />
Type: `string`<br />

Redis user name

### analytics_storage.password
ENV: <b>TYK_GW_ANALYTICSSTORAGE_PASSWORD</b><br />
Type: `string`<br />

If your Redis instance has a password set for access, you can set it here.

### analytics_storage.database
ENV: <b>TYK_GW_ANALYTICSSTORAGE_DATABASE</b><br />
Type: `int`<br />

Redis database

### analytics_storage.optimisation_max_idle
ENV: <b>TYK_GW_ANALYTICSSTORAGE_MAXIDLE</b><br />
Type: `int`<br />

Set the number of maximum idle connections in the Redis connection pool, which defaults to 100. Set to a higher value if you are expecting more traffic.

### analytics_storage.optimisation_max_active
ENV: <b>TYK_GW_ANALYTICSSTORAGE_MAXACTIVE</b><br />
Type: `int`<br />

Set the number of maximum connections in the Redis connection pool, which defaults to 500. Set to a higher value if you are expecting more traffic.

### analytics_storage.timeout
ENV: <b>TYK_GW_ANALYTICSSTORAGE_TIMEOUT</b><br />
Type: `int`<br />

Set a custom timeout for Redis network operations. Default value 5 seconds.

### analytics_storage.enable_cluster
ENV: <b>TYK_GW_ANALYTICSSTORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

Enable Redis Cluster support

### analytics_storage.use_ssl
ENV: <b>TYK_GW_ANALYTICSSTORAGE_USESSL</b><br />
Type: `bool`<br />

Enable SSL/TLS connection between your Tyk Gateway & Redis.

### analytics_storage.ssl_insecure_skip_verify
ENV: <b>TYK_GW_ANALYTICSSTORAGE_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS verification

### analytics_storage.ca_file
ENV: <b>TYK_GW_ANALYTICSSTORAGE_CAFILE</b><br />
Type: `string`<br />

Path to the CA file.

### analytics_storage.cert_file
ENV: <b>TYK_GW_ANALYTICSSTORAGE_CERTFILE</b><br />
Type: `string`<br />

Path to the cert file.

### analytics_storage.key_file
ENV: <b>TYK_GW_ANALYTICSSTORAGE_KEYFILE</b><br />
Type: `string`<br />

Path to the key file.

### analytics_storage.tls_max_version
ENV: <b>TYK_GW_ANALYTICSSTORAGE_TLSMAXVERSION</b><br />
Type: `string`<br />

Maximum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.3".

### analytics_storage.tls_min_version
ENV: <b>TYK_GW_ANALYTICSSTORAGE_TLSMINVERSION</b><br />
Type: `string`<br />

Minimum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.2".

### liveness_check.check_duration
ENV: <b>TYK_GW_LIVENESSCHECK_CHECKDURATION</b><br />
Type: `time.Duration`<br />

Frequencies of performing interval healthchecks for Redis, Dashboard, and RPC layer. Default: 10 seconds.

### dns_cache
This section enables the global configuration of the expireable DNS records caching for your Gateway API endpoints.
By design caching affects only http(s), ws(s) protocols APIs and doesn’t affect any plugin/middleware DNS queries.

```
"dns_cache": {
  "enabled": true, //Turned off by default
  "ttl": 60, //Time in seconds before the record will be removed from cache
  "multiple_ips_handle_strategy": "random" //A strategy, which will be used when dns query will reply with more than 1 ip address per single host.
}
```

### dns_cache.enabled
ENV: <b>TYK_GW_DNSCACHE_ENABLED</b><br />
Type: `bool`<br />

Setting this value to `true` will enable caching of DNS queries responses used for API endpoint’s host names. By default caching is disabled.

### dns_cache.ttl
ENV: <b>TYK_GW_DNSCACHE_TTL</b><br />
Type: `int64`<br />

This setting allows you to specify a duration in seconds before the record will be removed from cache after being added to it on the first DNS query resolution of API endpoints.
Setting `ttl` to `-1` prevents record from being expired and removed from cache on next check interval.

### dns_cache.multiple_ips_handle_strategy
ENV: <b>TYK_GW_DNSCACHE_MULTIPLEIPSHANDLESTRATEGY</b><br />
Type: `string`<br />

A strategy which will be used when a DNS query will reply with more than 1 IP Address per single host.
As a DNS query response IP Addresses can have a changing order depending on DNS server balancing strategy (eg: round robin, geographically dependent origin-ip ordering, etc) this option allows you to not to limit the connection to the first host in a cached response list or prevent response caching.

* `pick_first` will instruct your Tyk Gateway to connect to the first IP in a returned IP list and cache the response.
* `random` will instruct your Tyk Gateway to connect to a random IP in a returned IP list and cache the response.
* `no_cache` will instruct your Tyk Gateway to connect to the first IP in a returned IP list and fetch each addresses list without caching on each API endpoint DNS query.

### disable_regexp_cache
ENV: <b>TYK_GW_DISABLEREGEXPCACHE</b><br />
Type: `bool`<br />

If set to `true` this allows you to disable the regular expression cache. The default setting is `false`.

### regexp_cache_expire
ENV: <b>TYK_GW_REGEXPCACHEEXPIRE</b><br />
Type: `int32`<br />

If you set `disable_regexp_cache` to `false`, you can use this setting to limit how long the regular expression cache is kept for in seconds.
The default is 60 seconds. This must be a positive value. If you set to 0 this uses the default value.

### local_session_cache
Tyk can cache some data locally, this can speed up lookup times on a single node and lower the number of connections and operations being done on Redis. It will however introduce a slight delay when updating or modifying keys as the cache must expire.
This does not affect rate limiting.

### local_session_cache.disable_cached_session_state
ENV: <b>TYK_GW_LOCALSESSIONCACHE_DISABLECACHESESSIONSTATE</b><br />
Type: `bool`<br />

By default sessions are set to cache. Set this to `true` to stop Tyk from caching keys locally on the node.

### enable_separate_cache_store
ENV: <b>TYK_GW_ENABLESEPERATECACHESTORE</b><br />
Type: `bool`<br />

Enable to use a separate Redis for cache storage

### cache_storage.type
ENV: <b>TYK_GW_CACHESTORAGE_TYPE</b><br />
Type: `string`<br />

This should be set to `redis` (lowercase)

### cache_storage.host
ENV: <b>TYK_GW_CACHESTORAGE_HOST</b><br />
Type: `string`<br />

The Redis host, by default this is set to `localhost`, but for production this should be set to a cluster.

### cache_storage.port
ENV: <b>TYK_GW_CACHESTORAGE_PORT</b><br />
Type: `int`<br />

The Redis instance port.

### cache_storage.addrs
ENV: <b>TYK_GW_CACHESTORAGE_ADDRS</b><br />
Type: `[]string`<br />

If you have multi-node setup, you should use this field instead. For example: ["host1:port1", "host2:port2"].

### cache_storage.master_name
ENV: <b>TYK_GW_CACHESTORAGE_MASTERNAME</b><br />
Type: `string`<br />

Redis sentinel master name

### cache_storage.sentinel_password
ENV: <b>TYK_GW_CACHESTORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

Redis sentinel password

### cache_storage.username
ENV: <b>TYK_GW_CACHESTORAGE_USERNAME</b><br />
Type: `string`<br />

Redis user name

### cache_storage.password
ENV: <b>TYK_GW_CACHESTORAGE_PASSWORD</b><br />
Type: `string`<br />

If your Redis instance has a password set for access, you can set it here.

### cache_storage.database
ENV: <b>TYK_GW_CACHESTORAGE_DATABASE</b><br />
Type: `int`<br />

Redis database

### cache_storage.optimisation_max_idle
ENV: <b>TYK_GW_CACHESTORAGE_MAXIDLE</b><br />
Type: `int`<br />

Set the number of maximum idle connections in the Redis connection pool, which defaults to 100. Set to a higher value if you are expecting more traffic.

### cache_storage.optimisation_max_active
ENV: <b>TYK_GW_CACHESTORAGE_MAXACTIVE</b><br />
Type: `int`<br />

Set the number of maximum connections in the Redis connection pool, which defaults to 500. Set to a higher value if you are expecting more traffic.

### cache_storage.timeout
ENV: <b>TYK_GW_CACHESTORAGE_TIMEOUT</b><br />
Type: `int`<br />

Set a custom timeout for Redis network operations. Default value 5 seconds.

### cache_storage.enable_cluster
ENV: <b>TYK_GW_CACHESTORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

Enable Redis Cluster support

### cache_storage.use_ssl
ENV: <b>TYK_GW_CACHESTORAGE_USESSL</b><br />
Type: `bool`<br />

Enable SSL/TLS connection between your Tyk Gateway & Redis.

### cache_storage.ssl_insecure_skip_verify
ENV: <b>TYK_GW_CACHESTORAGE_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS verification

### cache_storage.ca_file
ENV: <b>TYK_GW_CACHESTORAGE_CAFILE</b><br />
Type: `string`<br />

Path to the CA file.

### cache_storage.cert_file
ENV: <b>TYK_GW_CACHESTORAGE_CERTFILE</b><br />
Type: `string`<br />

Path to the cert file.

### cache_storage.key_file
ENV: <b>TYK_GW_CACHESTORAGE_KEYFILE</b><br />
Type: `string`<br />

Path to the key file.

### cache_storage.tls_max_version
ENV: <b>TYK_GW_CACHESTORAGE_TLSMAXVERSION</b><br />
Type: `string`<br />

Maximum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.3".

### cache_storage.tls_min_version
ENV: <b>TYK_GW_CACHESTORAGE_TLSMINVERSION</b><br />
Type: `string`<br />

Minimum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.2".

### enable_bundle_downloader
ENV: <b>TYK_GW_ENABLEBUNDLEDOWNLOADER</b><br />
Type: `bool`<br />

Enable downloading Plugin bundles
Example:
```
"enable_bundle_downloader": true,
"bundle_base_url": "http://my-bundle-server.com/bundles/",
"public_key_path": "/path/to/my/pubkey",
```

### bundle_base_url
ENV: <b>TYK_GW_BUNDLEBASEURL</b><br />
Type: `string`<br />

Is a base URL that will be used to download the bundle. In this example we have `bundle-latest.zip` specified in the API settings, Tyk will fetch the following URL: http://my-bundle-server.com/bundles/bundle-latest.zip (see the next section for details).

### bundle_insecure_skip_verify
ENV: <b>TYK_GW_BUNDLEINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS validation for bundle URLs

### enable_jsvm
ENV: <b>TYK_GW_ENABLEJSVM</b><br />
Type: `bool`<br />

Set to true if you are using JSVM custom middleware or virtual endpoints.

### jsvm_timeout
ENV: <b>TYK_GW_JSVMTIMEOUT</b><br />
Type: `int`<br />

Set the execution timeout for JSVM plugins and virtal endpoints

### disable_virtual_path_blobs
ENV: <b>TYK_GW_DISABLEVIRTUALPATHBLOBS</b><br />
Type: `bool`<br />

Disable virtual endpoints and the code will not be loaded into the VM when the API definition initialises.
This is useful for systems where you want to avoid having third-party code run.

### tyk_js_path
ENV: <b>TYK_GW_TYKJSPATH</b><br />
Type: `string`<br />

Path to the JavaScript file which will be pre-loaded for any JSVM middleware or virtual endpoint. Useful for defining global shared functions.

### middleware_path
ENV: <b>TYK_GW_MIDDLEWAREPATH</b><br />
Type: `string`<br />

Path to the plugins dirrectory. By default is ``./middleware`.

### coprocess_options
Configuration options for Python and gRPC plugins.

### coprocess_options.enable_coprocess
ENV: <b>TYK_GW_COPROCESSOPTIONS_ENABLECOPROCESS</b><br />
Type: `bool`<br />

Enable gRPC and Python plugins

### coprocess_options.coprocess_grpc_server
ENV: <b>TYK_GW_COPROCESSOPTIONS_COPROCESSGRPCSERVER</b><br />
Type: `string`<br />

Address of gRPC user

### coprocess_options.grpc_recv_max_size
ENV: <b>TYK_GW_COPROCESSOPTIONS_GRPCRECVMAXSIZE</b><br />
Type: `int`<br />

Maximum message which can be received from a gRPC server

### coprocess_options.grpc_send_max_size
ENV: <b>TYK_GW_COPROCESSOPTIONS_GRPCSENDMAXSIZE</b><br />
Type: `int`<br />

Maximum message which can be sent to gRPC server

### coprocess_options.grpc_authority
ENV: <b>TYK_GW_COPROCESSOPTIONS_GRPCAUTHORITY</b><br />
Type: `string`<br />

Authority used in GRPC connection

### coprocess_options.python_path_prefix
ENV: <b>TYK_GW_COPROCESSOPTIONS_PYTHONPATHPREFIX</b><br />
Type: `string`<br />

Sets the path to built-in Tyk modules. This will be part of the Python module lookup path. The value used here is the default one for most installations.

### coprocess_options.python_version
ENV: <b>TYK_GW_COPROCESSOPTIONS_PYTHONVERSION</b><br />
Type: `string`<br />

If you have multiple Python versions installed you can specify your version.

### ignore_endpoint_case
ENV: <b>TYK_GW_IGNOREENDPOINTCASE</b><br />
Type: `bool`<br />

Ignore the case of any endpoints for APIs managed by Tyk. Setting this to `true` will override any individual API and Ignore, Blacklist and Whitelist plugin endpoint settings.

### ignore_canonical_mime_header_key
ENV: <b>TYK_GW_IGNORECANONICALMIMEHEADERKEY</b><br />
Type: `bool`<br />

When enabled Tyk ignores the canonical format of the MIME header keys.

For example when a request header with a “my-header” key is injected using “global_headers”, the upstream would typically get it as “My-Header”. When this flag is enabled it will be sent as “my-header” instead.

Current support is limited to JavaScript plugins, global header injection, virtual endpoint and JQ transform header rewrites.
This functionality doesn’t affect headers that are sent by the HTTP client and the default formatting will apply in this case.

For technical details refer to the [CanonicalMIMEHeaderKey](https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey) functionality in the Go documentation.

### log_level
ENV: <b>TYK_GW_LOGLEVEL</b><br />
Type: `string`<br />

You can now set a logging level (log_level). The following levels can be set: debug, info, warn, error.
If not set or left empty, it will default to `info`.

### tracing
Section for configuring OpenTracing support
Deprecated: use OpenTelemetry instead.

### tracing.name
ENV: <b>TYK_GW_TRACER_NAME</b><br />
Type: `string`<br />

The name of the tracer to initialize. For instance appdash, to use appdash tracer

### tracing.enabled
ENV: <b>TYK_GW_TRACER_ENABLED</b><br />
Type: `bool`<br />

Enable tracing

### tracing.options
ENV: <b>TYK_GW_TRACER_OPTIONS</b><br />
Type: `map[string]interface{}`<br />

Tracing configuration. Refer to the Tracing Docs for the full list of options.

### opentelemetry
Section for configuring OpenTelemetry.

### opentelemetry.enabled
ENV: <b>TYK_GW_OPENTELEMETRY_ENABLED</b><br />
Type: `bool`<br />

A flag that can be used to enable or disable the trace exporter.

### opentelemetry.exporter
ENV: <b>TYK_GW_OPENTELEMETRY_EXPORTER</b><br />
Type: `string`<br />

The type of the exporter to sending data in OTLP protocol.
This should be set to the same type of the OpenTelemetry collector.
Valid values are "grpc", or "http".
Defaults to "grpc".

### opentelemetry.endpoint
ENV: <b>TYK_GW_OPENTELEMETRY_ENDPOINT</b><br />
Type: `string`<br />

OpenTelemetry collector endpoint to connect to.
Defaults to "localhost:4317".

### opentelemetry.headers
ENV: <b>TYK_GW_OPENTELEMETRY_HEADERS</b><br />
Type: `map[string]string`<br />

A map of headers that will be sent with HTTP requests to the collector.

### opentelemetry.connection_timeout
ENV: <b>TYK_GW_OPENTELEMETRY_CONNECTIONTIMEOUT</b><br />
Type: `int`<br />

Timeout for establishing a connection to the collector.
Defaults to 1 second.

### opentelemetry.resource_name
ENV: <b>TYK_GW_OPENTELEMETRY_RESOURCENAME</b><br />
Type: `string`<br />

Name of the resource that will be used to identify the resource.
Defaults to "tyk".

### opentelemetry.span_processor_type
ENV: <b>TYK_GW_OPENTELEMETRY_SPANPROCESSORTYPE</b><br />
Type: `string`<br />

Type of the span processor to use. Valid values are "simple" or "batch".
Defaults to "batch".

### opentelemetry.context_propagation
ENV: <b>TYK_GW_OPENTELEMETRY_CONTEXTPROPAGATION</b><br />
Type: `string`<br />

Type of the context propagator to use. Valid values are:
- "tracecontext": tracecontext is a propagator that supports the W3C
Trace Context format (https://www.w3.org/TR/trace-context/).
- "b3": b3 is a propagator serializes SpanContext to/from B3 multi Headers format.
Defaults to "tracecontext".

### opentelemetry.tls
TLS configuration for the exporter.

### opentelemetry.tls.enable
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_ENABLE</b><br />
Type: `bool`<br />

Flag that can be used to enable TLS. Defaults to false (disabled).

### opentelemetry.tls.insecure_skip_verify
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_INSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Flag that can be used to skip TLS verification if TLS is enabled.
Defaults to false.

### opentelemetry.tls.ca_file
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_CAFILE</b><br />
Type: `string`<br />

Path to the CA file.

### opentelemetry.tls.cert_file
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_CERTFILE</b><br />
Type: `string`<br />

Path to the cert file.

### opentelemetry.tls.key_file
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_KEYFILE</b><br />
Type: `string`<br />

Path to the key file.

### opentelemetry.tls.max_version
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_MAXVERSION</b><br />
Type: `string`<br />

Maximum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.3".

### opentelemetry.tls.min_version
ENV: <b>TYK_GW_OPENTELEMETRY_TLS_MINVERSION</b><br />
Type: `string`<br />

Minimum TLS version that is supported.
Options: ["1.0", "1.1", "1.2", "1.3"].
Defaults to "1.2".

### opentelemetry.sampling
Defines the configurations to use in the sampler.

### opentelemetry.sampling.type
ENV: <b>TYK_GW_OPENTELEMETRY_SAMPLING_TYPE</b><br />
Type: `string`<br />

Refers to the policy used by OpenTelemetry to determine
whether a particular trace should be sampled or not. It's determined at the
start of a trace and the decision is propagated down the trace. Valid Values are:
AlwaysOn, AlwaysOff and TraceIDRatioBased. It defaults to AlwaysOn.

### opentelemetry.sampling.rate
ENV: <b>TYK_GW_OPENTELEMETRY_SAMPLING_RATE</b><br />
Type: `float64`<br />

Parameter for the TraceIDRatioBased sampler type and represents the percentage
of traces to be sampled. The value should fall between 0.0 (0%) and 1.0 (100%). For instance, if
the sampling rate is set to 0.5, the sampler will aim to sample approximately 50% of the traces.
By default, it's set to 0.5.

### opentelemetry.sampling.parent_based
ENV: <b>TYK_GW_OPENTELEMETRY_SAMPLING_PARENTBASED</b><br />
Type: `bool`<br />

Rule that ensures that if we decide to record data for a particular operation,
we'll also record data for all the subsequent work that operation causes (its "child spans").
This approach helps in keeping the entire story of a transaction together. Typically, ParentBased
is used in conjunction with TraceIDRatioBased. Using it with AlwaysOn or AlwaysOff might not be as
effective since, in those cases, you're either recording everything or nothing, and there are no
intermediary decisions to consider. The default value for this option is false.

### newrelic.app_name
ENV: <b>TYK_GW_NEWRELIC_APPNAME</b><br />
Type: `string`<br />

New Relic Application name

### newrelic.license_key
ENV: <b>TYK_GW_NEWRELIC_LICENSEKEY</b><br />
Type: `string`<br />

New Relic License key

### newrelic.enable_distributed_tracing
ENV: <b>TYK_GW_NEWRELIC_ENABLEDISTRIBUTEDTRACING</b><br />
Type: `bool`<br />

Enable distributed tracing

### enable_http_profiler
ENV: <b>TYK_GW_HTTPPROFILE</b><br />
Type: `bool`<br />

Enable debugging of your Tyk Gateway by exposing profiling information through https://tyk.io/docs/troubleshooting/tyk-gateway/profiling/

### use_redis_log
ENV: <b>TYK_GW_USEREDISLOG</b><br />
Type: `bool`<br />

Enables the real-time Gateway log view in the Dashboard.

### use_sentry
ENV: <b>TYK_GW_USESENTRY</b><br />
Type: `bool`<br />

Enable Sentry logging

### sentry_code
ENV: <b>TYK_GW_SENTRYCODE</b><br />
Type: `string`<br />

Sentry API code

### sentry_log_level
ENV: <b>TYK_GW_SENTRYLOGLEVEL</b><br />
Type: `string`<br />

Log verbosity for Sentry logging

### use_syslog
ENV: <b>TYK_GW_USESYSLOG</b><br />
Type: `bool`<br />

Enable Syslog log output

### syslog_transport
ENV: <b>TYK_GW_SYSLOGTRANSPORT</b><br />
Type: `string`<br />

Syslong transport to use. Values: tcp or udp.

### syslog_network_addr
ENV: <b>TYK_GW_SYSLOGNETWORKADDR</b><br />
Type: `string`<br />

Graylog server address

### use_graylog
ENV: <b>TYK_GW_USEGRAYLOG</b><br />
Type: `bool`<br />

Use Graylog log output

### graylog_network_addr
ENV: <b>TYK_GW_GRAYLOGNETWORKADDR</b><br />
Type: `string`<br />

Graylog server address

### use_logstash
ENV: <b>TYK_GW_USELOGSTASH</b><br />
Type: `bool`<br />

Use logstash log output

### logstash_transport
ENV: <b>TYK_GW_LOGSTASHTRANSPORT</b><br />
Type: `string`<br />

Logstash network transport. Values: tcp or udp.

### logstash_network_addr
ENV: <b>TYK_GW_LOGSTASHNETWORKADDR</b><br />
Type: `string`<br />

Logstash server address

### track_404_logs
ENV: <b>TYK_GW_TRACK404LOGS</b><br />
Type: `bool`<br />

Show 404 HTTP errors in your Gateway application logs

### statsd_connection_string
ENV: <b>TYK_GW_STATSDCONNECTIONSTRING</b><br />
Type: `string`<br />

Address of StatsD server. If set enable statsd monitoring.

### statsd_prefix
ENV: <b>TYK_GW_STATSDPREFIX</b><br />
Type: `string`<br />

StatsD prefix

### event_handlers
ENV: <b>TYK_GW_EVENTHANDLERS</b><br />
Type: `apidef.EventHandlerMetaConfig`<br />

Event System

### hide_generator_header
ENV: <b>TYK_GW_HIDEGENERATORHEADER</b><br />
Type: `bool`<br />

HideGeneratorHeader will mask the 'X-Generator' and 'X-Mascot-...' headers, if set to true.

### force_global_session_lifetime
ENV: <b>TYK_GW_FORCEGLOBALSESSIONLIFETIME</b><br />
Type: `bool`<br />

Enable global API token expiration. Can be needed if all your APIs using JWT or oAuth 2.0 auth methods with dynamically generated keys.

### session_lifetime_respects_key_expiration
ENV: <b>TYK_GW_SESSIONLIFETIMERESPECTSKEYEXPIRATION</b><br />
Type: `bool`<br />

SessionLifetimeRespectsKeyExpiration respects the key expiration time when the session lifetime is less than the key expiration. That is, Redis waits the key expiration for physical removal.

### global_session_lifetime
ENV: <b>TYK_GW_GLOBALSESSIONLIFETIME</b><br />
Type: `int64`<br />

global session lifetime, in seconds.

### kv.KV
ENV: <b>TYK_GW_KV_KV</b><br />
Type: `struct`<br />

See more details https://tyk.io/docs/tyk-configuration-reference/kv-store/

### kv.consul.address
ENV: <b>TYK_GW_KV_CONSUL_ADDRESS</b><br />
Type: `string`<br />

Address is the address of the Consul server

### kv.consul.scheme
ENV: <b>TYK_GW_KV_CONSUL_SCHEME</b><br />
Type: `string`<br />

Scheme is the URI scheme for the Consul server

### kv.consul.datacenter
ENV: <b>TYK_GW_KV_CONSUL_DATACENTER</b><br />
Type: `string`<br />

The datacenter to use. If not provided, the default agent datacenter is used.

### kv.consul.http_auth.username
ENV: <b>TYK_GW_KV_CONSUL_HTTPAUTH_USERNAME</b><br />
Type: `string`<br />

Username to use for HTTP Basic Authentication

### kv.consul.http_auth.password
ENV: <b>TYK_GW_KV_CONSUL_HTTPAUTH_PASSWORD</b><br />
Type: `string`<br />

Password to use for HTTP Basic Authentication

### kv.consul.tls_config.address
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_ADDRESS</b><br />
Type: `string`<br />

Address

### kv.consul.tls_config.ca_file
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_CAFILE</b><br />
Type: `string`<br />

CA file

### kv.consul.tls_config.ca_path
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_CAPATH</b><br />
Type: `string`<br />

CA Path

### kv.consul.tls_config.cert_file
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_CERTFILE</b><br />
Type: `string`<br />

Cert file

### kv.consul.tls_config.key_file
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_KEYFILE</b><br />
Type: `string`<br />

Key file

### kv.consul.tls_config.insecure_skip_verify
ENV: <b>TYK_GW_KV_CONSUL_TLSCONFIG_INSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Disable TLS validation

### kv.vault.token
ENV: <b>TYK_GW_KV_VAULT_TOKEN</b><br />
Type: `string`<br />

Token is the vault root token

### kv.vault.kv_version
ENV: <b>TYK_GW_KV_VAULT_KVVERSION</b><br />
Type: `int`<br />

KVVersion is the version number of Vault. Usually defaults to 2

### secrets
ENV: <b>TYK_GW_SECRETS</b><br />
Type: `map[string]string`<br />

Secrets are key-value pairs that can be accessed in the dashboard via "secrets://"

### override_messages
Override the default error code and or message returned by middleware.
The following message IDs can be used to override the message and error codes:

AuthToken message IDs
* `auth.auth_field_missing`
* `auth.key_not_found`

OIDC message IDs
* `oauth.auth_field_missing`
* `oauth.auth_field_malformed`
* `oauth.key_not_found`
* `oauth.client_deleted`

Sample Override Message Setting
```
"override_messages": {
  "oauth.auth_field_missing" : {
   "code": 401,
   "message": "Token is not authorised"
 }
}
```

### cloud
ENV: <b>TYK_GW_CLOUD</b><br />
Type: `bool`<br />

Cloud flag shows the Gateway runs in Tyk-cloud.

### jwt_ssl_insecure_skip_verify
ENV: <b>TYK_GW_JWTSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Skip TLS verification for JWT JWKs url validation

### resource_sync
ResourceSync configures mitigation strategy in case sync fails.

### resource_sync.retry_attempts
ENV: <b>TYK_GW_RESOURCESYNC_RETRYATTEMPTS</b><br />
Type: `int`<br />

RetryAttempts defines the number of retries that the Gateway
should perform during a resource sync (APIs or policies), defaulting
to zero which means no retries are attempted.

### resource_sync.interval
ENV: <b>TYK_GW_RESOURCESYNC_INTERVAL</b><br />
Type: `int`<br />

Interval configures the interval in seconds between each retry on a resource sync error.

### oas_config
OAS holds the configuration for various OpenAPI-specific functionalities

### oas_config.validate_examples
ENV: <b>TYK_GW_OAS_VALIDATEEXAMPLES</b><br />
Type: `bool`<br />

ValidateExamples enables validation of values provided in `example` and `examples` fields against the declared schemas in the OpenAPI Document. Defaults to false.

### oas_config.validate_schema_defaults
ENV: <b>TYK_GW_OAS_VALIDATESCHEMADEFAULTS</b><br />
Type: `bool`<br />

ValidateSchemaDefaults enables validation of values provided in `default` fields against the declared schemas in the OpenAPI Document. Defaults to false.

