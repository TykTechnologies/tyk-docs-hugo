## Tyk vendor extension reference

XTykAPIGateway contains custom Tyk API extensions for the OpenAPI definition.
The values for the extensions are stored inside the OpenAPI document, under
the key `x-tyk-api-gateway`.

**Field: `info` ([Info](#info))**
Info contains the main metadata for the API definition.

**Field: `upstream` ([Upstream](#upstream))**
Upstream contains the configurations related to the upstream.

**Field: `server` ([Server](#server))**
Server contains the configurations related to the server.

**Field: `middleware` ([Middleware](#middleware))**
Middleware contains the configurations related to the Tyk middleware.

### **Info**

Info contains the main metadata for the API definition.

**Field: `id` (`string`)**
ID is the unique identifier of the API within Tyk.

Tyk classic API definition: `api_id`.

**Field: `dbId` (`string`)**
DBID is the unique identifier of the API within the Tyk database.

Tyk classic API definition: `id`.

**Field: `orgId` (`string`)**
OrgID is the ID of the organisation which the API belongs to.

Tyk classic API definition: `org_id`.

**Field: `name` (`string`)**
Name is the name of the API.

Tyk classic API definition: `name`.

**Field: `expiration` (`string`)**
Expiration date.

Tyk classic API definition: `expiration`.

**Field: `state` ([State](#state))**
State holds configuration for API definition states (active, internal).

**Field: `versioning` ([Versioning](#versioning))**
Versioning holds configuration for API versioning.

### **Upstream**

Upstream holds configuration for the upstream server to which Tyk should proxy requests.

**Field: `url` (`string`)**
URL defines the upstream address (or target URL) to which requests should be proxied.

Tyk classic API definition: `proxy.target_url`.

**Field: `serviceDiscovery` ([ServiceDiscovery](#servicediscovery))**
ServiceDiscovery contains the configuration related to Service Discovery.

Tyk classic API definition: `proxy.service_discovery`.

**Field: `uptimeTests` ([UptimeTests](#uptimetests))**
UptimeTests contains the configuration related to uptime tests.

Tyk classic API definition: `uptime_tests` and `check_host_against_uptime_tests`.

**Field: `mutualTLS` ([MutualTLS](#mutualtls))**
MutualTLS contains the configuration for establishing a mutual TLS connection between Tyk and the upstream server.

Tyk classic API definition: `upstream_certificates_disabled` and `upstream_certificates`.

**Field: `certificatePinning` ([CertificatePinning](#certificatepinning))**
CertificatePinning contains the configuration related to certificate pinning.

Tyk classic API definition: `certificate_pinning_disabled` and `pinned_public_keys`.

**Field: `rateLimit` ([RateLimit](#ratelimit))**
RateLimit contains the configuration related to API level rate limit.

Tyk classic API definition: `global_rate_limit`.

**Field: `authentication` ([UpstreamAuth](#upstreamauth))**
Authentication contains the configuration related to upstream authentication.

Tyk classic API definition: `upstream_auth`.

**Field: `loadBalancing` ([LoadBalancing](#loadbalancing))**
LoadBalancing contains configuration for load balancing between multiple upstream targets.

Tyk classic API definition: `proxy.enable_load_balancing` and `proxy.targets`.

**Field: `preserveHostHeader` ([PreserveHostHeader](#preservehostheader))**
PreserveHostHeader contains the configuration for preserving the host header.

Tyk classic API definition: `proxy.preserve_host_header`.

**Field: `preserveTrailingSlash` ([PreserveTrailingSlash](#preservetrailingslash))**
PreserveTrailingSlash controls whether Tyk preserves trailing slashes in URLs when proxying
requests to upstream services. When enabled, URLs like "/users/" will retain the trailing slash.

Tyk classic API definition: `proxy.disable_strip_slash`.

**Field: `tlsTransport` ([TLSTransport](#tlstransport))**
TLSTransport contains the configuration for TLS transport settings.

Tyk classic API definition: `proxy.transport`.

**Field: `proxy` ([Proxy](#proxy))**
Proxy contains the configuration for an internal proxy.

Tyk classic API definition: `proxy.proxy_url`.

### **Server**

Server contains the configuration that sets Tyk up to receive requests from the client applications.

**Field: `listenPath` ([ListenPath](#listenpath))**
ListenPath is the base path on Tyk to which requests for this API should
be sent. Tyk listens for any requests coming into the host at this
path, on the port that Tyk is configured to run on and processes these
accordingly.

**Field: `authentication` ([Authentication](#authentication))**
Authentication contains the configurations that manage how clients can authenticate with Tyk to access the API.

**Field: `clientCertificates` ([ClientCertificates](#clientcertificates))**
ClientCertificates contains the configurations related to establishing static mutual TLS between the client and Tyk.

**Field: `gatewayTags` ([GatewayTags](#gatewaytags))**
GatewayTags contain segment tags to indicate which Gateways your upstream service is connected to (and hence where to deploy the API).

**Field: `customDomain` ([Domain](#domain))**
CustomDomain is the domain to bind this API to. This enforces domain matching for client requests.


Tyk classic API definition: `domain`.

**Field: `detailedActivityLogs` ([DetailedActivityLogs](#detailedactivitylogs))**
DetailedActivityLogs configures detailed analytics recording.

**Field: `detailedTracing` ([DetailedTracing](#detailedtracing))**
DetailedTracing enables OpenTelemetry's detailed tracing for this API.


Tyk classic API definition: `detailed_tracing`.

**Field: `eventHandlers` ([EventHandlers](#eventhandlers))**
EventHandlers contains the configuration related to Tyk Events.


Tyk classic API definition: `event_handlers`.

**Field: `ipAccessControl` ([IPAccessControl](#ipaccesscontrol))**
IPAccessControl configures IP access control for this API.


Tyk classic API definition: `allowed_ips` and `blacklisted_ips`.

**Field: `batchProcessing` ([BatchProcessing](#batchprocessing))**
BatchProcessing contains configuration settings to enable or disable batch request support for the API.


Tyk classic API definition: `enable_batch_request_support`.

**Field: `protocol` (`string`)**
Protocol configures the HTTP protocol used by the API.
Possible values are:
- "http": Standard HTTP/1.1 protocol
- "http2": HTTP/2 protocol with TLS
- "h2c": HTTP/2 protocol without TLS (cleartext).


Tyk classic API definition: `protocol`.

**Field: `port` (`int`)**
Port Setting this value will change the port that Tyk listens on. Default: 8080.


Tyk classic API definition: `listen_port`.

### **Middleware**

Middleware holds configuration for Tyk's native middleware.

**Field: `global` ([Global](#global))**
Global contains configuration for middleware that affects the whole API (all endpoints).

**Field: `operations` ([Operations](#operations))**
Operations contains configuration for middleware that can be applied to individual endpoints within the API (per-endpoint).

### **State**

State holds configuration for the status of the API within Tyk - if it is currently active and if it is exposed externally.

**Field: `active` (`boolean`)**
Active enables the API so that Tyk will listen for and process requests made to the listenPath.

Tyk classic API definition: `active`.

**Field: `internal` (`boolean`)**
This field controls the exposure of the API on the Gateway. When set to `true`, the API will not be made available for external access and will not be included in API listings returned by the Gateway's management APIs; it will be accessible only via [internal looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}) or as a [child API version]({{< ref "api-management/api-versioning#base-and-child-apis" >}}).

Tyk classic API definition: `internal`.

### **Versioning**

Versioning holds configuration for API versioning.

Tyk classic API definition: `version_data`.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag, if set to `true` it will enable versioning of the API.

**Field: `name` (`string`)**
Name contains the name of the version as entered by the user ("v1" or similar).

**Field: `default` (`string`)**
Default contains the default version name if a request is issued without a version.

**Field: `location` (`string`)**
Location contains versioning location information. It can be one of the following:

- `header`,
- `url-param`,
- `url`.

**Field: `key` (`string`)**
Key contains the name of the key to check for versioning information.

**Field: `versions` ([[]VersionToID](#versiontoid))**
Versions contains a list of versions that map to individual API IDs.

**Field: `stripVersioningData` (`boolean`)**
StripVersioningData is a boolean flag, if set to `true`, the API responses will be stripped of versioning data.

**Field: `urlVersioningPattern` (`string`)**
UrlVersioningPattern is a string that contains the pattern that if matched will remove the version from the URL.

**Field: `fallbackToDefault` (`boolean`)**
FallbackToDefault controls the behaviour of Tyk when a versioned API is called with a nonexistent version name.
If set to `true` then the default API version will be invoked; if set to `false` Tyk will return an HTTP 404
`This API version does not seem to exist` error in this scenario.

### **ServiceDiscovery**

ServiceDiscovery holds configuration required for service discovery.

**Field: `enabled` (`boolean`)**
Enabled activates Service Discovery.


Tyk classic API definition: `service_discovery.use_discovery_service`.

**Field: `queryEndpoint` (`string`)**
QueryEndpoint is the endpoint to call, this would usually be Consul, etcd or Eureka K/V store.

Tyk classic API definition: `service_discovery.query_endpoint`.

**Field: `dataPath` (`string`)**
DataPath is the namespace of the data path - where exactly in your service response the namespace can be found.
For example, if your service responds with:

```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "http://httpbin.org:6000",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```

then your namespace would be `node.value`.


Tyk classic API definition: `service_discovery.data_path`.

**Field: `useNestedQuery` (`boolean`)**
UseNestedQuery enables the use of a combination of `dataPath` and `parentDataPath`.
It is necessary when the data lives within this string-encoded JSON object.

```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "{"hostname": "http://httpbin.org", "port": "80"}",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```


Tyk classic API definition: `service_discovery.use_nested_query`.

**Field: `parentDataPath` (`string`)**
ParentDataPath is the namespace of the where to find the nested
value if `useNestedQuery` is `true`. In the above example, it
would be `node.value`. You would change the `dataPath` setting
to be `hostname`, since this is where the host name data
resides in the JSON string. Tyk automatically assumes that
`dataPath` in this case is in a string-encoded JSON object and
will try to deserialize it.


Tyk classic API definition: `service_discovery.parent_data_path`.

**Field: `portDataPath` (`string`)**
PortDataPath is the port of the data path. In the above nested example, we can see that there is a separate `port` value
for the service in the nested JSON. In this case, you can set the `portDataPath` value and Tyk will treat `dataPath` as
the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier
such as `/widgets/`). In the above example, the `portDataPath` would be `port`.


Tyk classic API definition: `service_discovery.port_data_path`.

**Field: `useTargetList` (`boolean`)**
UseTargetList should be set to `true` if you are using load balancing. Tyk will treat the data path as a list and
inject it into the target list of your API definition.


Tyk classic API definition: `service_discovery.use_target_list`.

**Field: `cacheTimeout` (`int64`)**
CacheTimeout is the timeout of a cache value when a new data is loaded from a discovery service.
Setting it too low will cause Tyk to call the SD service too often, setting it too high could mean that
failures are not recovered from quickly enough.

Deprecated: The field is deprecated. Use `service_discovery` to configure service discovery cache options.


Tyk classic API definition: `service_discovery.cache_timeout`.

**Field: `cache` ([ServiceDiscoveryCache](#servicediscoverycache))**
Cache holds cache related flags.


Tyk classic API definition:.
- `service_discovery.cache_disabled`
- `service_discovery.cache_timeout`

**Field: `targetPath` (`string`)**
TargetPath is used to set a target path that will be appended to the
discovered endpoint, since many service discovery services only provide
host and port data. It is important to be able to target a specific
resource on that host. Setting this value will enable that.


Tyk classic API definition: `service_discovery.target_path`.

**Field: `endpointReturnsList` (`boolean`)**
EndpointReturnsList is set `true` when the response type is a list instead of an object.


Tyk classic API definition: `service_discovery.endpoint_returns_list`.

### **UptimeTests**

UptimeTests configures uptime tests.

**Field: `enabled` (`boolean`)**
Enabled specifies whether the uptime tests are active or not.

Tyk classic API definition: `uptime_tests.disabled`.

**Field: `serviceDiscovery` ([ServiceDiscovery](#servicediscovery))**
ServiceDiscovery contains the configuration related to test Service Discovery.

Tyk classic API definition: `proxy.service_discovery`.

**Field: `tests` ([[]UptimeTest](#uptimetest))**
Tests contains individual connectivity tests defined for checking if a service is online.

**Field: `hostDownRetestPeriod` (`time.ReadableDuration`)**
HostDownRetestPeriod is the time to wait until rechecking a failed test.
If undefined, the default testing interval (10s) is in use.
Setting this to a lower value would result in quicker recovery on failed checks.

**Field: `logRetentionPeriod` (`time.ReadableDuration`)**
LogRetentionPeriod holds a time to live for the uptime test results.
If unset, a value of 100 years is the default.

### **MutualTLS**

MutualTLS contains the configuration for establishing a mutual TLS connection between Tyk and the upstream server.

**Field: `enabled` (`boolean`)**
Enabled activates upstream mutual TLS for the API.

Tyk classic API definition: `upstream_certificates_disabled`.

**Field: `domainToCertificateMapping` ([[]DomainToCertificate](#domaintocertificate))**
DomainToCertificates maintains the mapping of domain to certificate.

Tyk classic API definition: `upstream_certificates`.

### **CertificatePinning**

CertificatePinning holds the configuration about mapping of domains to pinned public keys.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag, if set to `true`, it enables certificate pinning for the API.


Tyk classic API definition: `certificate_pinning_disabled`.

**Field: `domainToPublicKeysMapping` ([PinnedPublicKeys](#pinnedpublickeys))**
DomainToPublicKeysMapping maintains the mapping of domain to pinned public keys.


Tyk classic API definition: `pinned_public_keys`.

### **RateLimit**

RateLimit holds the configurations related to rate limit.
The API-level rate limit applies a base-line limit on the frequency of requests to the upstream service for all endpoints. The frequency of requests is configured in two parts: the time interval and the number of requests that can be made during each interval.
Tyk classic API definition: `global_rate_limit`.

**Field: `enabled` (`boolean`)**
Enabled activates API level rate limiting for this API.


Tyk classic API definition: `!disable_rate_limit`.

**Field: `rate` (`int`)**
Rate specifies the number of requests that can be passed to the upstream in each time interval (`per`).
This field sets the limit on the frequency of requests to ensure controlled
resource access or to prevent abuse. The rate is defined as an integer value.

A higher value indicates a higher number of allowed requests in the given
time frame. For instance, if `Per` is set to `1m` (one minute), a Rate of `100`
means up to 100 requests can be made per minute.


Tyk classic API definition: `global_rate_limit.rate`.

**Field: `per` ([ReadableDuration](#readableduration))**
Per defines the time interval for rate limiting using shorthand notation.
The value of Per is a string that specifies the interval in a compact form,
where hours, minutes and seconds are denoted by 'h', 'm' and 's' respectively.
Multiple units can be combined to represent the duration.

Examples of valid shorthand notations:
- "1h"   : one hour
- "20m"  : twenty minutes
- "30s"  : thirty seconds
- "1m29s": one minute and twenty-nine seconds
- "1h30m" : one hour and thirty minutes

An empty value is interpreted as "0s", implying no rate limiting interval, which disables the API-level rate limit.
It's important to format the string correctly, as invalid formats will
be considered as 0s/empty.


Tyk classic API definition: `global_rate_limit.per`.

### **UpstreamAuth**

UpstreamAuth holds the configurations related to upstream API authentication.

**Field: `enabled` (`boolean`)**
Enabled enables upstream API authentication.

**Field: `basicAuth` ([UpstreamBasicAuth](#upstreambasicauth))**
BasicAuth holds the basic authentication configuration for upstream API authentication.

**Field: `oauth` ([UpstreamOAuth](#upstreamoauth))**
OAuth contains the configuration for OAuth2 Client Credentials flow.

**Field: `requestSigning` ([UpstreamRequestSigning](#upstreamrequestsigning))**
RequestSigning holds the configuration for generating signed requests to an upstream API.

### **LoadBalancing**

LoadBalancing represents the configuration for load balancing between multiple upstream targets.

**Field: `enabled` (`boolean`)**
Enabled determines if load balancing is active.

**Field: `skipUnavailableHosts` (`boolean`)**
SkipUnavailableHosts determines whether to skip unavailable hosts during load balancing based on uptime tests.
Tyk classic field: `proxy.check_host_against_uptime_tests`

**Field: `targets` ([[]LoadBalancingTarget](#loadbalancingtarget))**
Targets defines the list of targets with their respective weights for load balancing.

### **PreserveHostHeader**

PreserveHostHeader holds the configuration for preserving the host header.

**Field: `enabled` (`boolean`)**
Enabled activates preserving the host header.

### **PreserveTrailingSlash**

PreserveTrailingSlash holds the configuration for preserving the
trailing slash when routed to upstream services.

The default behaviour of Tyk is to strip any trailing slash (/) from
the target URL when proxying the request upstream. In some use cases the
upstream might expect the trailing slash - or might consider /users/ to
be a different endpoint from /users (for example).

**Field: `enabled` (`boolean`)**
Enabled activates preserving the trailing slash when routing requests.

### **TLSTransport**

TLSTransport contains the configuration for TLS transport settings.
This struct allows you to specify a custom proxy and set the minimum TLS versions and any SSL ciphers.

Example:

	```
	{
	  "proxy_url": "http(s)://proxy.url:1234",
	  "minVersion": "1.0",
	  "maxVersion": "1.0",
	  "ciphers": [
	    "TLS_RSA_WITH_AES_128_GCM_SHA256",
	    "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
	  ],
	  "insecureSkipVerify": true,
	  "forceCommonNameCheck": false
	}
	```

Tyk classic API definition: `proxy.transport`

**Field: `insecureSkipVerify` (`boolean`)**
InsecureSkipVerify controls whether a client verifies the server's certificate chain and host name.
If InsecureSkipVerify is true, crypto/tls accepts any certificate presented by the server and any host name in that certificate.
In this mode, TLS is susceptible to machine-in-the-middle attacks unless custom verification is used.
This should be used only for testing or in combination with VerifyConnection or VerifyPeerCertificate.


Tyk classic API definition: `proxy.transport.ssl_insecure_skip_verify`.

**Field: `ciphers` (`[]string`)**
Ciphers is a list of SSL ciphers to be used. If unset, the default ciphers will be used.


Tyk classic API definition: `proxy.transport.ssl_ciphers`.

**Field: `minVersion` (`string`)**
MinVersion is the minimum SSL/TLS version that is acceptable.

Tyk classic API definition: `proxy.transport.ssl_min_version`.

**Field: `maxVersion` (`string`)**
MaxVersion is the maximum SSL/TLS version that is acceptable.

**Field: `forceCommonNameCheck` (`boolean`)**
ForceCommonNameCheck forces the validation of the hostname against the certificate Common Name.


Tyk classic API definition: `proxy.transport.ssl_force_common_name_check`.

### **Proxy**

Proxy contains the configuration for an internal proxy.

Tyk classic API definition: `proxy.proxy_url`

**Field: `enabled` (`boolean`)**
Enabled determines if the proxy is active.

**Field: `url` (`string`)**
URL specifies the URL of the internal proxy.

### **ListenPath**

ListenPath is the base path on Tyk to which requests for this API
should be sent. Tyk listens out for any requests coming into the host at
this path, on the port that Tyk is configured to run on and processes
these accordingly.

**Field: `value` (`string`)**
Value is the value of the listen path e.g. `/api/` or `/` or `/httpbin/`.

Tyk classic API definition: `proxy.listen_path`.

**Field: `strip` (`boolean`)**
Strip removes the inbound listen path (as accessed by the client) when generating the outbound request for the upstream service.

For example, consider the scenario where the Tyk base address is `http://acme.com/`, the listen path is `example/` and the upstream URL is `http://httpbin.org/`:

- If the client application sends a request to `http://acme.com/example/get` then the request will be proxied to `http://httpbin.org/example/get`
- If stripListenPath is set to `true`, the `example` listen path is removed and the request would be proxied to `http://httpbin.org/get`.


Tyk classic API definition: `proxy.strip_listen_path`.

### **Authentication**

Authentication contains configuration about the authentication methods and security policies applied to requests.

**Field: `enabled` (`boolean`)**
Enabled makes the API protected when one of the authentication modes is enabled.


Tyk classic API definition: `!use_keyless`.

**Field: `stripAuthorizationData` (`boolean`)**
StripAuthorizationData ensures that any security tokens used for accessing APIs are stripped and not passed to the upstream.


Tyk classic API definition: `strip_auth_data`.

**Field: `baseIdentityProvider` (`string`)**
BaseIdentityProvider enables the use of multiple authentication mechanisms.
It provides the session object that determines access control, rate limits and usage quotas.

It should be set to one of the following:

- `auth_token`
- `hmac_key`
- `basic_auth_user`
- `jwt_claim`
- `oidc_user`
- `oauth_key`
- `custom_auth`


Tyk classic API definition: `base_identity_provided_by`.

**Field: `hmac` ([HMAC](#hmac))**
HMAC contains the configurations related to HMAC authentication mode.


Tyk classic API definition: `auth_configs["hmac"]`.

**Field: `oidc` ([OIDC](#oidc))**
OIDC contains the configurations related to OIDC authentication mode.


Tyk classic API definition: `auth_configs["oidc"]`.

**Field: `custom` ([CustomPluginAuthentication](#custompluginauthentication))**
Custom contains the configurations related to Custom authentication mode.


Tyk classic API definition: `auth_configs["coprocess"]`.

**Field: `securitySchemes` ([SecuritySchemes](#securityschemes))**
SecuritySchemes contains security schemes definitions.

**Field: `customKeyLifetime` ([CustomKeyLifetime](#customkeylifetime))**
CustomKeyLifetime contains configuration for the maximum retention period for access tokens.

### **ClientCertificates**

ClientCertificates contains the configurations related to establishing static mutual TLS between the client and Tyk.

**Field: `enabled` (`boolean`)**
Enabled activates static mTLS for the API.


Tyk classic API definition: `use_mutual_tls_auth`.

**Field: `allowlist` (`[]string`)**
Allowlist is the list of client certificates which are allowed.


Tyk classic API definition: `client_certificates`.

### **GatewayTags**

GatewayTags holds a list of segment tags that should apply for a gateway.

**Field: `enabled` (`boolean`)**
Enabled activates use of segment tags.


Tyk classic API definition: `tags_disabled` (negated).

**Field: `tags` (`[]string`)**
Tags contains a list of segment tags.


Tyk classic API definition: `tags`.

### **Domain**

Domain holds the configuration of the domain name the server should listen on.

**Field: `enabled` (`boolean`)**
Enabled allow/disallow the usage of the domain.


Tyk classic API definition: `domain_disabled` (negated).

**Field: `name` (`string`)**
Name is the name of the domain.


Tyk classic API definition: `domain`.

**Field: `certificates` (`[]string`)**
Certificates defines a field for specifying certificate IDs or file paths
that the Gateway can utilise to dynamically load certificates for your custom domain.


Tyk classic API definition: `certificates`.

### **DetailedActivityLogs**

DetailedActivityLogs holds the configuration related to recording detailed analytics.

**Field: `enabled` (`boolean`)**
Enabled activates detailed activity logs.


Tyk classic API definition: `enable_detailed_recording`.

### **DetailedTracing**

DetailedTracing holds the configuration of the detailed tracing.

**Field: `enabled` (`boolean`)**
Enabled activates detailed tracing.


Tyk classic API definition: `detailed_tracing`.

### **EventHandlers**

EventHandlers holds the list of events to be processed for the API.

Type defined as array of `EventHandler` values, see [EventHandler](#eventhandler) definition.

### **IPAccessControl**

IPAccessControl represents IP access control configuration.

**Field: `enabled` (`boolean`)**
Enabled indicates whether IP access control is enabled.


Tyk classic API definition: `ip_access_control_disabled` (negated).

**Field: `allow` (`[]string`)**
Allow is a list of allowed IP addresses or CIDR blocks (e.g. "192.168.1.0/24").
Note that if an IP address is present in both Allow and Block, the Block rule will take precedence.


Tyk classic API definition: `allowed_ips`.

**Field: `block` (`[]string`)**
Block is a list of blocked IP addresses or CIDR blocks (e.g. "192.168.1.100/32").
If an IP address is present in both Allow and Block, the Block rule will take precedence.


Tyk classic API definition: `blacklisted_ips`.

### **BatchProcessing**

BatchProcessing represents the configuration for enabling or disabling batch request support for an API.

**Field: `enabled` (`boolean`)**
Enabled determines whether batch request support is enabled or disabled for the API.


Tyk classic API definition: `enable_batch_request_support`.

### **Global**

Global contains configuration that affects the whole API (all endpoints).

**Field: `pluginConfig` ([PluginConfig](#pluginconfig))**
PluginConfig contains the common configuration for custom plugins.

**Field: `cors` ([CORS](#cors))**
CORS contains the configuration related to Cross Origin Resource Sharing.

Tyk classic API definition: `CORS`.

**Field: `prePlugin` ([PrePlugin](#preplugin))**
PrePlugin contains configuration related to the custom plugin that is run before authentication.
Deprecated: Use PrePlugins instead.

**Field: `prePlugins` ([CustomPlugins](#customplugins))**
PrePlugins contains configuration related to the custom plugin that is run before authentication.

Tyk classic API definition: `custom_middleware.pre`.

**Field: `postAuthenticationPlugin` ([PostAuthenticationPlugin](#postauthenticationplugin))**
PostAuthenticationPlugin contains configuration related to the custom plugin that is run immediately after authentication.
Deprecated: Use PostAuthenticationPlugins instead.

**Field: `postAuthenticationPlugins` ([CustomPlugins](#customplugins))**
PostAuthenticationPlugins contains configuration related to the custom plugin that is run immediately after authentication.

Tyk classic API definition: `custom_middleware.post_key_auth`.

**Field: `postPlugin` ([PostPlugin](#postplugin))**
PostPlugin contains configuration related to the custom plugin that is run immediately prior to proxying the request to the upstream.
Deprecated: Use PostPlugins instead.

**Field: `postPlugins` ([CustomPlugins](#customplugins))**
PostPlugins contains configuration related to the custom plugin that is run immediately prior to proxying the request to the upstream.

Tyk classic API definition: `custom_middleware.post`.

**Field: `responsePlugin` ([ResponsePlugin](#responseplugin))**
ResponsePlugin contains configuration related to the custom plugin that is run during processing of the response from the upstream service.
Deprecated: Use ResponsePlugins instead.

**Field: `responsePlugins` ([CustomPlugins](#customplugins))**
ResponsePlugins contains configuration related to the custom plugin that is run during processing of the response from the upstream service.


Tyk classic API definition: `custom_middleware.response`.

**Field: `cache` ([Cache](#cache))**
Cache contains the configurations related to caching.

Tyk classic API definition: `cache_options`.

**Field: `transformRequestHeaders` ([TransformHeaders](#transformheaders))**
TransformRequestHeaders contains the configurations related to API level request header transformation.

Tyk classic API definition: `global_headers`/`global_headers_remove`.

**Field: `transformResponseHeaders` ([TransformHeaders](#transformheaders))**
TransformResponseHeaders contains the configurations related to API level response header transformation.

Tyk classic API definition: `global_response_headers`/`global_response_headers_remove`.

**Field: `contextVariables` ([ContextVariables](#contextvariables))**
ContextVariables contains the configuration related to Tyk context variables.

**Field: `trafficLogs` ([TrafficLogs](#trafficlogs))**
TrafficLogs contains the configurations related to API level log analytics.

**Field: `requestSizeLimit` ([GlobalRequestSizeLimit](#globalrequestsizelimit))**
RequestSizeLimit contains the configuration related to limiting the global request size.

**Field: `ignoreCase` ([IgnoreCase](#ignorecase))**
IgnoreCase contains the configuration to treat routes as case-insensitive.

**Field: `skipRateLimit` (`boolean`)**
SkipRateLimit determines whether the rate-limiting middleware logic should be skipped.

Tyk classic API definition: `disable_rate_limit`.

**Field: `skipQuota` (`boolean`)**
SkipQuota determines whether quota enforcement should be bypassed.

Tyk classic API definition: `disable_quota`.

**Field: `skipQuotaReset` (`boolean`)**
SkipQuotaReset indicates if quota limits should not be reset when creating or updating quotas for the API.

Tyk classic API definition: `dont_set_quota_on_create`.

### **Operations**

Operations holds Operation definitions. The string key in this object is the `operationID`, which is a unique identifier for each API operation. 

Type defined as object of `Operation` values, see [Operation](#operation) definition.

### **VersionToID**

VersionToID contains a single mapping from a version name into an API ID.
Tyk classic API definition: Entry in `version_definition.versions` map.

**Field: `name` (`string`)**
Name contains the user chosen version name, e.g. `v1` or similar.

**Field: `id` (`string`)**
ID is the API ID for the version set in Name.

### **ServiceDiscoveryCache**

ServiceDiscoveryCache holds configuration for caching ServiceDiscovery data.

**Field: `enabled` (`boolean`)**
Enabled turns service discovery cache on or off.


Tyk classic API definition: `service_discovery.cache_disabled`.

**Field: `timeout` (`int64`)**
Timeout is the TTL for a cached object in seconds.


Tyk classic API definition: `service_discovery.cache_timeout`.

### **UptimeTest**

UptimeTest configures an uptime test check.

**Field: `url` (`string`)**
CheckURL is the URL for a request. If service discovery is in use,
the hostname will be resolved to a service host.

Examples:

- `http://database1.company.local`
- `https://webcluster.service/health`
- `tcp://127.0.0.1:6379` (for TCP checks).

**Field: `timeout` (`time.ReadableDuration`)**
Timeout declares a timeout for the request. If the test exceeds
this timeout, the check fails.

**Field: `method` (`string`)**
Method allows you to customize the HTTP method for the test (`GET`, `POST`,...).

**Field: `headers` (`map[string]string`)**
Headers contain any custom headers for the back end service.

**Field: `body` (`string`)**
Body is the body of the test request.

**Field: `commands` ([[]UptimeTestCommand](#uptimetestcommand))**
Commands are used for TCP checks.

**Field: `enableProxyProtocol` (`boolean`)**
EnableProxyProtocol enables proxy protocol support when making request.
The back end service needs to support this.

### **DomainToCertificate**

DomainToCertificate holds a single mapping of domain name into a certificate.

**Field: `domain` (`string`)**
Domain contains the domain name.

**Field: `certificate` (`string`)**
Certificate contains the certificate mapped to the domain.

### **PinnedPublicKeys**

PinnedPublicKeys is a list of domains and pinned public keys for them.

Type defined as array of `PinnedPublicKey` values, see [PinnedPublicKey](#pinnedpublickey) definition.

### **ReadableDuration**

ReadableDuration is an alias maintained to be used in imports.

### **UpstreamBasicAuth**

UpstreamBasicAuth holds upstream basic authentication configuration.

**Field: `enabled` (`boolean`)**
Enabled enables upstream basic authentication.

**Field: `header` ([AuthSource](#authsource))**
Header contains configurations for the header value.

**Field: `username` (`string`)**
Username is the username to be used for upstream basic authentication.

**Field: `password` (`string`)**
Password is the password to be used for upstream basic authentication.

### **UpstreamOAuth**

UpstreamOAuth holds the configuration for OAuth2 Client Credentials flow.

**Field: `enabled` (`boolean`)**
Enabled activates upstream OAuth2 authentication.

**Field: `allowedAuthorizeTypes` (`[]string`)**
AllowedAuthorizeTypes specifies the allowed authorization types for upstream OAuth2 authentication.

**Field: `clientCredentials` ([ClientCredentials](#clientcredentials))**
ClientCredentials holds the configuration for OAuth2 Client Credentials flow.

**Field: `password` ([PasswordAuthentication](#passwordauthentication))**
PasswordAuthentication holds the configuration for upstream OAauth password authentication flow.

### **UpstreamRequestSigning**

UpstreamRequestSigning represents configuration for generating signed requests to an upstream API.
Tyk classic API definition: `request_signing`.

**Field: `enabled` (`boolean`)**
Enabled determines if request signing is enabled or disabled.

**Field: `signatureHeader` (`string`)**
SignatureHeader specifies the HTTP header name for the signature.

**Field: `algorithm` (`string`)**
Algorithm represents the signing algorithm used (e.g., HMAC-SHA256).

**Field: `keyId` (`string`)**
KeyID identifies the key used for signing purposes.

**Field: `headers` (`[]string`)**
Headers contains a list of headers included in the signature calculation.

**Field: `secret` (`string`)**
Secret holds the secret used for signing when applicable.

**Field: `certificateId` (`string`)**
CertificateID specifies the certificate ID used in signing operations.

### **LoadBalancingTarget**

LoadBalancingTarget represents a single upstream target for load balancing with a URL and an associated weight.

**Field: `url` (`string`)**
URL specifies the upstream target URL for load balancing, represented as a string.

**Field: `weight` (`int`)**
Weight specifies the relative distribution factor for load balancing, determining the importance of this target.

### **HMAC**

HMAC holds the configuration for the HMAC authentication mode.

**Field: `enabled` (`boolean`)**
Enabled activates the HMAC authentication mode.


Tyk classic API definition: `enable_signature_checking`.

**Field: `allowedAlgorithms` (`[]string`)**
AllowedAlgorithms is the array of HMAC algorithms which are allowed.

Tyk supports the following HMAC algorithms:

- `hmac-sha1`
- `hmac-sha256`
- `hmac-sha384`
- `hmac-sha512`

and reads the value from the algorithm header.


Tyk classic API definition: `hmac_allowed_algorithms`.

**Field: `allowedClockSkew` (`float64`)**
AllowedClockSkew is the amount of milliseconds that will be tolerated for clock skew. It is used against replay attacks.
The default value is `0`, which deactivates clock skew checks.


Tyk classic API definition: `hmac_allowed_clock_skew`.

### **OIDC**

OIDC contains configuration for the OIDC authentication mode.
OIDC support will be deprecated starting from 5.7.0.
To avoid any disruptions, we recommend that you use JSON Web Token (JWT) instead,
as explained in https://tyk.io/docs/basic-config-and-security/security/authentication-authorization/openid-connect/.

**Field: `enabled` (`boolean`)**
Enabled activates the OIDC authentication mode.


Tyk classic API definition: `use_openid`.

**Field: `segregateByClientId` (`boolean`)**
SegregateByClientId is a boolean flag. If set to `true, the policies will be applied to a combination of Client ID and User ID.


Tyk classic API definition: `openid_options.segregate_by_client`.

**Field: `providers` ([[]Provider](#provider))**
Providers contains a list of authorized providers, their Client IDs and matched policies.


Tyk classic API definition: `openid_options.providers`.

**Field: `scopes` ([Scopes](#scopes))**
Scopes contains the defined scope claims.

### **CustomPluginAuthentication**

CustomPluginAuthentication holds configuration for custom plugins.

**Field: `enabled` (`boolean`)**
Enabled activates the CustomPluginAuthentication authentication mode.


Tyk classic API definition: `enable_coprocess_auth`/`use_go_plugin_auth`.

**Field: `config` ([AuthenticationPlugin](#authenticationplugin))**
Config contains configuration related to custom authentication plugin.


Tyk classic API definition: `custom_middleware.auth_check`.

### **SecuritySchemes**

SecuritySchemes holds security scheme values, filled with Import().

### **CustomKeyLifetime**

CustomKeyLifetime contains configuration for custom key retention.

**Field: `enabled` (`boolean`)**
Enabled enables custom maximum retention for keys for the API.

**Field: `value` ([ReadableDuration](#readableduration))**
Value configures the expiry interval for a Key.
The value is a string that specifies the interval in a compact form,
where hours, minutes and seconds are denoted by 'h', 'm' and 's' respectively.
Multiple units can be combined to represent the duration.

Examples of valid shorthand notations:
- "1h"   : one hour
- "20m"  : twenty minutes
- "30s"  : thirty seconds
- "1m29s": one minute and twenty-nine seconds
- "1h30m" : one hour and thirty minutes

An empty value is interpreted as "0s"


Tyk classic API definition: `session_lifetime`.

**Field: `respectValidity` (`boolean`)**
RespectValidity ensures that Tyk respects the expiry configured in the key when the API level configuration grants a shorter lifetime.
That is, Redis waits until the key has expired before deleting it.


Tyk classic API definition: `session_lifetime_respects_key_expiration`.

### **EventHandler**

EventHandler holds information about individual event to be configured on the API.

**Field: `enabled` (`boolean`)**
Enabled enables the event handler.


Tyk classic API definition: `event_handlers.events[].handler_meta.disabled` (negated).

**Field: `trigger` (`event.Event`)**
Trigger specifies the TykEvent that should trigger the event handler.


Tyk classic API definition: `event_handlers.events` key.

**Field: `type` ([Kind](#kind))**
Kind specifies the action to be taken on the event trigger.


Tyk classic API definition: `event_handlers.events[].handler`.

**Field: `id` (`string`)**
ID is the ID of event handler in storage.


Tyk classic API definition: `event_handlers.events[].handler_meta.id`.

**Field: `name` (`string`)**
Name is the name of event handler.


Tyk classic API definition: `event_handlers.events[].handler_meta.name`.

**Field: `` ([WebhookEvent](#webhookevent))**
Webhook contains WebhookEvent configs. Encoding and decoding is handled by the custom marshaller.

**Field: `` ([JSVMEvent](#jsvmevent))**
JSVMEvent holds information about JavaScript VM events.

**Field: `` ([LogEvent](#logevent))**
LogEvent represents the configuration for logging events tied to an event handler.

### **PluginConfig**

PluginConfig holds configuration for custom plugins.

**Field: `driver` (`string`)**
Driver configures which custom plugin driver to use.
The value should be set to one of the following:

- `otto`,
- `python`,
- `lua`,
- `grpc`,
- `goplugin`.


Tyk classic API definition: `custom_middleware.driver`.

**Field: `bundle` ([PluginBundle](#pluginbundle))**
Bundle configures custom plugin bundles.

**Field: `data` ([PluginConfigData](#pluginconfigdata))**
Data configures custom plugin data.

### **CORS**

CORS holds configuration for cross-origin resource sharing.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag, if set to `true`, this option enables CORS processing.


Tyk classic API definition: `CORS.enable`.

**Field: `maxAge` (`int`)**
MaxAge indicates how long (in seconds) the results of a preflight request can be cached. The default is 0 which stands for no max age.


Tyk classic API definition: `CORS.max_age`.

**Field: `allowCredentials` (`boolean`)**
AllowCredentials indicates if the request can include user credentials like cookies,
HTTP authentication or client side SSL certificates.


Tyk classic API definition: `CORS.allow_credentials`.

**Field: `exposedHeaders` (`[]string`)**
ExposedHeaders indicates which headers are safe to expose to the API of a CORS API specification.


Tyk classic API definition: `CORS.exposed_headers`.

**Field: `allowedHeaders` (`[]string`)**
AllowedHeaders holds a list of non simple headers the client is allowed to use with cross-domain requests.


Tyk classic API definition: `CORS.allowed_headers`.

**Field: `optionsPassthrough` (`boolean`)**
OptionsPassthrough is a boolean flag. If set to `true`, it will proxy the CORS OPTIONS pre-flight
request directly to upstream, without authentication and any CORS checks. This means that pre-flight
requests generated by web-clients such as SwaggerUI or the Tyk Portal documentation system
will be able to test the API using trial keys.

If your service handles CORS natively, then enable this option.


Tyk classic API definition: `CORS.options_passthrough`.

**Field: `debug` (`boolean`)**
Debug is a boolean flag, If set to `true`, this option produces log files for the CORS middleware.


Tyk classic API definition: `CORS.debug`.

**Field: `allowedOrigins` (`[]string`)**
AllowedOrigins holds a list of origin domains to allow access from. Wildcards are also supported, e.g. `http://*.foo.com`


Tyk classic API definition: `CORS.allowed_origins`.

**Field: `allowedMethods` (`[]string`)**
AllowedMethods holds a list of methods to allow access via.


Tyk classic API definition: `CORS.allowed_methods`.

### **PrePlugin**

PrePlugin configures pre-request plugins.

Pre-request plugins are executed before the request is sent to the
upstream target and before any authentication information is extracted
from the header or parameter list of the request.

**Field: `plugins` ([CustomPlugins](#customplugins))**
Plugins configures custom plugins to be run on pre authentication stage.
The plugins would be executed in the order of configuration in the list.

### **CustomPlugins**

CustomPlugins is a list of CustomPlugin objects.

Type defined as array of `CustomPlugin` values, see [CustomPlugin](#customplugin) definition.

### **PostAuthenticationPlugin**

PostAuthenticationPlugin configures post authentication plugins.

**Field: `plugins` ([CustomPlugins](#customplugins))**
Plugins configures custom plugins to be run on pre authentication stage.
The plugins would be executed in the order of configuration in the list.

### **CustomPlugins**

CustomPlugins is a list of CustomPlugin objects.

Type defined as array of `CustomPlugin` values, see [CustomPlugin](#customplugin) definition.

### **PostPlugin**

PostPlugin configures post plugins.

**Field: `plugins` ([CustomPlugins](#customplugins))**
Plugins configures custom plugins to be run on post stage.
The plugins would be executed in the order of configuration in the list.

### **CustomPlugins**

CustomPlugins is a list of CustomPlugin objects.

Type defined as array of `CustomPlugin` values, see [CustomPlugin](#customplugin) definition.

### **ResponsePlugin**

ResponsePlugin configures response plugins.

**Field: `plugins` ([CustomPlugins](#customplugins))**
Plugins configures custom plugins to be run on post stage.
The plugins would be executed in the order of configuration in the list.

### **CustomPlugins**

CustomPlugins is a list of CustomPlugin objects.

Type defined as array of `CustomPlugin` values, see [CustomPlugin](#customplugin) definition.

### **Cache**

Cache holds configuration for caching the requests.

**Field: `enabled` (`boolean`)**
Enabled turns global cache middleware on or off. It is still possible to enable caching on a per-path basis
by explicitly setting the endpoint cache middleware.


Tyk classic API definition: `cache_options.enable_cache`.

**Field: `timeout` (`int64`)**
Timeout is the TTL for a cached object in seconds.


Tyk classic API definition: `cache_options.cache_timeout`.

**Field: `cacheAllSafeRequests` (`boolean`)**
CacheAllSafeRequests caches responses to (`GET`, `HEAD`, `OPTIONS`) requests overrides per-path cache settings in versions,
applies across versions.


Tyk classic API definition: `cache_options.cache_all_safe_requests`.

**Field: `cacheResponseCodes` (`[]int`)**
CacheResponseCodes is an array of response codes which are safe to cache e.g. `404`.


Tyk classic API definition: `cache_options.cache_response_codes`.

**Field: `cacheByHeaders` (`[]string`)**
CacheByHeaders allows header values to be used as part of the cache key.


Tyk classic API definition: `cache_options.cache_by_headers`.

**Field: `enableUpstreamCacheControl` (`boolean`)**
EnableUpstreamCacheControl instructs Tyk Cache to respect upstream cache control headers.


Tyk classic API definition: `cache_options.enable_upstream_cache_control`.

**Field: `controlTTLHeaderName` (`string`)**
ControlTTLHeaderName is the response header which tells Tyk how long it is safe to cache the response for.


Tyk classic API definition: `cache_options.cache_control_ttl_header`.

### **TransformHeaders**

TransformHeaders holds configuration about request/response header transformations.

**Field: `enabled` (`boolean`)**
Enabled activates Header Transform for the given path and method.


Tyk classic API definition: `version_data.versions..extended_paths.transform_headers[].disabled` (negated).

**Field: `remove` (`[]string`)**
Remove specifies header names to be removed from the request/response.


Tyk classic API definition: `version_data.versions..extended_paths.transform_headers[].delete_headers`.

**Field: `add` ([Headers](#headers))**
Add specifies headers to be added to the request/response.


Tyk classic API definition: `version_data.versions..extended_paths.transform_headers[].add_headers`.

### **ContextVariables**

ContextVariables holds the configuration related to Tyk context variables.

**Field: `enabled` (`boolean`)**
Enabled provides access to context variables from specific Tyk middleware (URL rewrite, header and body transform).


Tyk classic API definition: `enable_context_vars`.

### **TrafficLogs**

TrafficLogs holds configuration about API log analytics.

**Field: `enabled` (`boolean`)**
Enabled enables traffic log analytics for the API.

Tyk classic API definition: `do_not_track`.

**Field: `tagHeaders` (`[]string`)**
TagHeaders is a string array of HTTP headers that can be extracted
and transformed into analytics tags (statistics aggregated by tag, per hour).

**Field: `customRetentionPeriod` ([ReadableDuration](#readableduration))**
CustomRetentionPeriod configures a custom value for how long the analytics is retained for,
defaults to 100 years.

**Field: `plugins` ([CustomAnalyticsPlugins](#customanalyticsplugins))**
Plugins configures custom plugins to allow for extensive modifications to analytics records
The plugins would be executed in the order of configuration in the list.

### **GlobalRequestSizeLimit**

GlobalRequestSizeLimit holds configuration about the global limits for request sizes.

**Field: `enabled` (`boolean`)**
Enabled activates the Request Size Limit.


Tyk classic API definition: `version_data.versions..global_size_limit_disabled` (negated).

**Field: `value` (`int64`)**
Value contains the value of the request size limit.


Tyk classic API definition: `version_data.versions..global_size_limit`.

### **IgnoreCase**

IgnoreCase will make route matching be case insensitive.
This accepts request to `/AAA` or `/aaa` if set to true.

**Field: `enabled` (`boolean`)**
Enabled activates case insensitive route matching.


Tyk classic API definition: `version_data.versions..ignore_endpoint_case`.

### **UptimeTestCommand**

UptimeTestCommand handles additional checks for tcp connections.

**Field: `name` (`string`)**
Name can be either `send` or `expect`, designating if the
message should be sent, or read from the connection.

**Field: `message` (`string`)**
Message contains the payload to send or expect.

### **PinnedPublicKey**

PinnedPublicKey contains a mapping from the domain name into a list of public keys.

**Field: `domain` (`string`)**
Domain contains the domain name.

**Field: `publicKeys` (`[]string`)**
PublicKeys contains a list of the public keys pinned to the domain name.

### **AuthSource**

AuthSource defines an authentication source.

**Field: `enabled` (`boolean`)**
Enabled activates the auth source.


Tyk classic API definition: `auth_configs[X].use_param/use_cookie`.

**Field: `name` (`string`)**
Name is the name of the auth source.


Tyk classic API definition: `auth_configs[X].param_name/cookie_name`.

### **ClientCredentials**

ClientCredentials holds the configuration for OAuth2 Client Credentials flow.

**Field: `header` ([AuthSource](#authsource))**
Header holds the configuration for the custom header to be used for OAuth authentication.

**Field: `tokenUrl` (`string`)**
TokenURL is the resource server's token endpoint
URL. This is a constant specific to each server.

**Field: `scopes` (`[]string`)**
Scopes specifies optional requested permissions.

**Field: `extraMetadata` (`[]string`)**
ExtraMetadata holds the keys that we want to extract from the token and pass to the upstream.

### **PasswordAuthentication**

PasswordAuthentication holds the configuration for upstream OAuth2 password authentication flow.

**Field: `header` ([AuthSource](#authsource))**
Header holds the configuration for the custom header to be used for OAuth authentication.

**Field: `username` (`string`)**
Username is the username to be used for upstream OAuth2 password authentication.

**Field: `password` (`string`)**
Password is the password to be used for upstream OAuth2 password authentication.

**Field: `tokenUrl` (`string`)**
TokenURL is the resource server's token endpoint
URL. This is a constant specific to each server.

**Field: `scopes` (`[]string`)**
Scopes specifies optional requested permissions.

**Field: `extraMetadata` (`[]string`)**
ExtraMetadata holds the keys that we want to extract from the token and pass to the upstream.

### **Provider**

Provider defines an issuer to validate and the Client ID to Policy ID mappings.

**Field: `issuer` (`string`)**
Issuer contains a validation value for the issuer claim, usually a domain name e.g. `accounts.google.com` or similar.


Tyk classic API definition: `openid_options.providers[].issuer`.

**Field: `clientToPolicyMapping` ([[]ClientToPolicy](#clienttopolicy))**
ClientToPolicyMapping contains mappings of Client IDs to Policy IDs.


Tyk classic API definition: `openid_options.providers[].client_ids`.

### **Scopes**

Scopes holds the scope to policy mappings for a claim name.
This struct is used for both JWT and OIDC authentication.

**Field: `claimName` (`string`)**
ClaimName contains the claim name.


Tyk classic API definition:.
- For OIDC: `scopes.oidc.scope_claim_name`
- For JWT: `scopes.jwt.scope_claim_name`

**Field: `scopeToPolicyMapping` ([[]ScopeToPolicy](#scopetopolicy))**
ScopeToPolicyMapping contains the mappings of scopes to policy IDs.


Tyk classic API definition:.
- For OIDC: `scopes.oidc.scope_to_policy`
- For JWT: `scopes.jwt.scope_to_policy`

### **AuthenticationPlugin**

AuthenticationPlugin holds the configuration for custom authentication plugin.

**Field: `enabled` (`boolean`)**
Enabled activates custom authentication plugin.


Tyk classic API definition: `custom_middleware.auth_check.disabled` (negated).

**Field: `functionName` (`string`)**
FunctionName is the name of authentication method.


Tyk classic API definition: `custom_middleware.auth_check.name`.

**Field: `path` (`string`)**
Path is the path to shared object file in case of goplugin mode or path to JS code in case of otto auth plugin.


Tyk classic API definition: `custom_middleware.auth_check.path`.

**Field: `rawBodyOnly` (`boolean`)**
RawBodyOnly if set to true, do not fill body in request or response object.


Tyk classic API definition: `custom_middleware.auth_check.raw_body_only`.

**Field: `requireSession` (`boolean`)**
RequireSession passes down the session information for plugins after authentication.


Tyk classic API definition: `custom_middleware.auth_check.require_session`.

**Field: `idExtractor` ([IDExtractor](#idextractor))**
IDExtractor configures ID extractor with coprocess custom authentication.


Tyk classic API definition: `custom_middleware.id_extractor`.

### **Kind**

Kind is an alias maintained to be used in imports.

### **WebhookEvent**

WebhookEvent stores the core information about a webhook event.

**Field: `url` (`string`)**
URL is the target URL for the webhook.


Tyk classic API definition: `event_handlers.events[].handler_meta.target_path`.

**Field: `method` (`string`)**
Method is the HTTP method for the webhook.


Tyk classic API definition: `event_handlers.events[].handler_meta.method`.

**Field: `cooldownPeriod` ([ReadableDuration](#readableduration))**
CoolDownPeriod defines cool-down for the event, so it does not trigger again.
It uses shorthand notation.
The value of CoolDownPeriod is a string that specifies the interval in a compact form,
where hours, minutes and seconds are denoted by 'h', 'm' and 's' respectively.
Multiple units can be combined to represent the duration.

Examples of valid shorthand notations:
- "1h"   : one hour
- "20m"  : twenty minutes
- "30s"  : thirty seconds
- "1m29s": one minute and twenty-nine seconds
- "1h30m" : one hour and thirty minutes

An empty value is interpreted as "0s", implying no cool-down.
It's important to format the string correctly, as invalid formats will
be considered as 0s/empty.


Tyk classic API definition: `event_handlers.events[].handler_meta.event_timeout`.

**Field: `bodyTemplate` (`string`)**
BodyTemplate is the template to be used for request payload.


Tyk classic API definition: `event_handlers.events[].handler_meta.template_path`.

**Field: `headers` ([Headers](#headers))**
Headers are the list of request headers to be used.


Tyk classic API definition: `event_handlers.events[].handler_meta.header_map`.

### **JSVMEvent**

JSVMEvent represents a JavaScript VM event configuration for event handlers.

**Field: `functionName` (`string`)**
FunctionName specifies the JavaScript function name to be executed.


Tyk classic API definition: `event_handlers.events[].handler_meta.method_name`.

**Field: `path` (`string`)**
Path specifies the path to the JavaScript file containing the function.


Tyk classic API definition: `event_handlers.events[].handler_meta.path`.

### **LogEvent**

LogEvent represents the configuration for logging events within an event handler.

**Field: `logPrefix` (`string`)**
LogPrefix defines the prefix used for log messages in the logging event.


Tyk classic API definition: `event_handlers.events[].handler_meta.prefix`.

### **PluginBundle**

PluginBundle holds configuration for custom plugins.

**Field: `enabled` (`boolean`)**
Enabled activates the custom plugin bundles.


Tyk classic API definition: `custom_middleware_bundle_disabled`.

**Field: `path` (`string`)**
Path is the path suffix to construct the URL to fetch plugin bundle from.
Path will be suffixed to `bundle_base_url` in gateway config.

### **PluginConfigData**

PluginConfigData configures config data for custom plugins.

**Field: `enabled` (`boolean`)**
Enabled activates custom plugin config data.


Tyk classic API definition: `config_data_disabled` (negated).

**Field: `value` (`any`)**
Value is the value of custom plugin config data.


Tyk classic API definition: `config_data`.

### **Headers**

Headers is an array of Header.

Type defined as array of `Header` values, see [Header](#header) definition.

### **CustomAnalyticsPlugins**

CustomAnalyticsPlugins is a list of CustomPlugin objects for analytics.

Type defined as array of `CustomPlugin` values, see [CustomPlugin](#customplugin) definition.

### **ClientToPolicy**

ClientToPolicy contains a 1-1 mapping between Client ID and Policy ID.

**Field: `clientId` (`string`)**
ClientID contains a Client ID.


Tyk classic API definition: Key in `openid_options.providers[].client_ids` map.

**Field: `policyId` (`string`)**
PolicyID contains a Policy ID.


Tyk classic API definition: Value in `openid_options.providers[].client_ids` map.

### **ScopeToPolicy**

ScopeToPolicy contains a single scope to policy ID mapping.
This struct is used for both JWT and OIDC authentication.

**Field: `scope` (`string`)**
Scope contains the scope name.


Tyk classic API definition:.
- For OIDC: Key in `scopes.oidc.scope_to_policy` map
- For JWT: Key in `scopes.jwt.scope_to_policy` map.

**Field: `policyId` (`string`)**
PolicyID contains the Policy ID.


Tyk classic API definition:.
- For OIDC: Value in `scopes.oidc.scope_to_policy` map
- For JWT: Value in `scopes.jwt.scope_to_policy` map.

### **IDExtractor**

IDExtractor configures ID Extractor.

**Field: `enabled` (`boolean`)**
Enabled activates ID extractor with coprocess authentication.


Tyk classic API definition: `custom_middleware.id_extractor.disabled` (negated).

**Field: `source` (`string`)**
Source is the source from which ID to be extracted from.
Valid values are:
- `header` - Extract ID from a header
- `form` - Extract ID from a form parameter
- `body` - Extract ID from the request body


Tyk classic API definition: `custom_middleware.id_extractor.extract_from`.

**Field: `with` (`string`)**
With is the type of ID extractor to be used.
Valid values are:
- `value` - Extract ID from a value
- `xpath` - Extract ID using an XPath expression
- `regex` - Extract ID using a regular expression


Tyk classic API definition: `custom_middleware.id_extractor.extract_with`.

**Field: `config` ([IDExtractorConfig](#idextractorconfig))**
Config holds the configuration specific to ID extractor type mentioned via With.


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config`.

### **Header**

Header holds a header name and value pair.

**Field: `name` (`string`)**
Name is the name of the header.

**Field: `value` (`string`)**
Value is the value of the header.

### **CustomPlugin**

CustomPlugin configures custom plugin.

**Field: `enabled` (`boolean`)**
Enabled activates the custom plugin.


Tyk classic API definition: `custom_middleware.pre[].disabled`, `custom_middleware.post_key_auth[].disabled`,.
`custom_middleware.post[].disabled`, `custom_middleware.response[].disabled` (negated).

**Field: `functionName` (`string`)**
FunctionName is the name of authentication method.


Tyk classic API definition: `custom_middleware.pre[].name`, `custom_middleware.post_key_auth[].name`,.
`custom_middleware.post[].name`, `custom_middleware.response[].name`.

**Field: `path` (`string`)**
Path is the path to shared object file in case of goplugin mode or path to JS code in case of otto auth plugin.


Tyk classic API definition: `custom_middleware.pre[].path`, `custom_middleware.post_key_auth[].path`,.
`custom_middleware.post[].path`, `custom_middleware.response[].path`.

**Field: `rawBodyOnly` (`boolean`)**
RawBodyOnly if set to true, do not fill body in request or response object.


Tyk classic API definition: `custom_middleware.pre[].raw_body_only`, `custom_middleware.post_key_auth[].raw_body_only`,.
`custom_middleware.post[].raw_body_only`, `custom_middleware.response[].raw_body_only`.

**Field: `requireSession` (`boolean`)**
RequireSession if set to true passes down the session information for plugins after authentication.
RequireSession is used only with JSVM custom middleware.


Tyk classic API definition: `custom_middleware.pre[].require_session`, `custom_middleware.post_key_auth[].require_session`,.
`custom_middleware.post[].require_session`, `custom_middleware.response[].require_session`.

### **IDExtractorConfig**

IDExtractorConfig specifies the configuration for ID extractor.

**Field: `headerName` (`string`)**
HeaderName is the header name to extract ID from.
Used when Source is set to "header" and With is set to "value".


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config.header_name`.

**Field: `formParamName` (`string`)**
FormParamName is the form parameter name to extract ID from.
Used when Source is set to "form" and With is set to "value".


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config.form_param_name`.

**Field: `regexp` (`string`)**
Regexp is the regular expression to match ID.
Used when With is set to "regex".


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config.regex_expression`.

**Field: `regexpMatchIndex` (`int`)**
RegexpMatchIndex is the index from which ID to be extracted after a match.
Default value is 0, ie if regexpMatchIndex is not provided ID is matched from index 0.
Used when With is set to "regex".


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config.regex_match_index`.

**Field: `xPathExp` (`string`)**
XPathExp is the xpath expression to match ID.
Used when With is set to "xpath".


Tyk classic API definition: `custom_middleware.id_extractor.extractor_config.xpath_expression`.

### **Allowance**

Allowance describes allowance actions and behaviour.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag, if set to `true`, then individual allowances (allow, block, ignore) will be enforced.

**Field: `ignoreCase` (`boolean`)**
IgnoreCase is a boolean flag, If set to `true`, checks for requests allowance will be case insensitive.

### **AllowanceType**

AllowanceType holds the valid allowance types values.

### **AuthSources**

AuthSources defines authentication source configuration: headers, cookies and query parameters.

Tyk classic API definition: `auth_configs{}`.

**Field: `header` ([AuthSource](#authsource))**
Header contains configurations for the header value auth source, it is enabled by default.


Tyk classic API definition: `auth_configs[x].header`.

**Field: `cookie` ([AuthSource](#authsource))**
Cookie contains configurations for the cookie value auth source.


Tyk classic API definition: `auth_configs[x].cookie`.

**Field: `query` ([AuthSource](#authsource))**
Query contains configurations for the query parameters auth source.


Tyk classic API definition: `auth_configs[x].query`.

### **Basic**

Basic type holds configuration values related to http basic authentication.

**Field: `enabled` (`boolean`)**
Enabled activates the basic authentication mode.

Tyk classic API definition: `use_basic_auth`.

**Field: `disableCaching` (`boolean`)**
DisableCaching disables the caching of basic authentication key.

Tyk classic API definition: `basic_auth.disable_caching`.

**Field: `cacheTTL` (`int`)**
CacheTTL is the TTL for a cached basic authentication key in seconds.

Tyk classic API definition: `basic_auth.cache_ttl`.

**Field: `extractCredentialsFromBody` ([ExtractCredentialsFromBody](#extractcredentialsfrombody))**
ExtractCredentialsFromBody helps to extract username and password from body. In some cases, like dealing with SOAP,
user credentials can be passed via request body.

### **CachePlugin**

CachePlugin holds the configuration for the cache plugins.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag. If set to `true`, the advanced caching plugin will be enabled.


Tyk classic API definition: `version_data.versions..extended_paths.advance_cache_config[].disabled` (negated).

**Field: `cacheByRegex` (`string`)**
CacheByRegex defines a regular expression used against the request body to produce a cache key.

Example value: `\"id\":[^,]*` (quoted json value).


Tyk classic API definition: `version_data.versions..extended_paths.advance_cache_config[].cache_key_regex`.

**Field: `cacheResponseCodes` (`[]int`)**
CacheResponseCodes contains a list of valid response codes for responses that are okay to add to the cache.


Tyk classic API definition: `version_data.versions..extended_paths.advance_cache_config[].cache_response_codes`.

**Field: `timeout` (`int64`)**
Timeout is the TTL for the endpoint level caching in seconds. 0 means no caching.


Tyk classic API definition: `version_data.versions..extended_paths.advance_cache_config[].timeout`.

### **CircuitBreaker**

CircuitBreaker holds configuration for the circuit breaker middleware.
Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*]`.

**Field: `enabled` (`boolean`)**
Enabled activates the Circuit Breaker functionality.


Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*].disabled` (negated).

**Field: `threshold` (`float64`)**
Threshold is the proportion from each `sampleSize` requests that must fail for the breaker to be tripped. This must be a value between 0.0 and 1.0. If `sampleSize` is 100 then a threshold of 0.4 means that the breaker will be tripped if 40 out of every 100 requests fails.


Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*].threshold_percent`.

**Field: `sampleSize` (`int`)**
SampleSize is the size of the circuit breaker sampling window. Combining this with `threshold` gives the failure rate required to trip the circuit breaker.


Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*].samples`.

**Field: `coolDownPeriod` (`int`)**
CoolDownPeriod is the period of time (in seconds) for which the circuit breaker will remain open before returning to service.


Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*].return_to_service_after`.

**Field: `halfOpenStateEnabled` (`boolean`)**
HalfOpenStateEnabled , if enabled, allows some requests to pass through the circuit breaker during the cool down period. If Tyk detects that the path is now working, the circuit breaker will be automatically reset and traffic will be resumed to the upstream.


Tyk classic API definition: `version_data.versions..extended_paths.circuit_breakers[*].disable_half_open_state` (negated).

### **ClientAuthData**

ClientAuthData holds the client ID and secret for OAuth2 authentication.

**Field: `clientId` (`string`)**
ClientID is the application's ID.

**Field: `clientSecret` (`string`)**
ClientSecret is the application's secret.

### **EndpointPostPlugin**

EndpointPostPlugin contains endpoint level post plugin configuration.

**Field: `enabled` (`boolean`)**
Enabled activates post plugin.


Tyk classic API definition: `version_data.versions..extended_paths.go_plugin.disabled`(negated).

**Field: `name` (`string`)**
Name is the name of plugin function to be executed.
Deprecated: Use FunctionName instead.

**Field: `functionName` (`string`)**
FunctionName is the name of plugin function to be executed.


Tyk classic API definition: `version_data.versions..extended_paths.go_plugin.symbol_name`(negated).

**Field: `path` (`string`)**
Path is the path to plugin.


Tyk classic API definition: `version_data.versions..extended_paths.go_plugin.plugin_path`(negated).

### **EndpointPostPlugins**

EndpointPostPlugins is a list of EndpointPostPlugins. It's used where multiple plugins can be run.

Type defined as array of `EndpointPostPlugin` values, see [EndpointPostPlugin](#endpointpostplugin) definition.

### **EnforceTimeout**

EnforceTimeout holds the configuration for enforcing request timeouts.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag. If set to `true`, requests will enforce a configured timeout.


Tyk classic API definition: `version_data.versions..extended_paths.hard_timeouts[].disabled` (negated).

**Field: `value` (`int`)**
Value is the configured timeout in seconds.


Tyk classic API definition: `version_data.versions..extended_paths.hard_timeouts[].timeout`.

### **ExternalOAuth**

ExternalOAuth holds configuration for an external OAuth provider.
Deprecated: ExternalOAuth support was deprecated in Tyk 5.7.0.
To avoid any disruptions, we recommend that you use JSON Web Token (JWT) instead,
as explained in https://tyk.io/docs/basic-config-and-security/security/authentication-authorization/ext-oauth-middleware/.

**Field: `enabled` (`boolean`)**
Enabled activates external oauth functionality.


Tyk classic API definition: `external_oauth.enabled`.

**Field: `providers` ([[]OAuthProvider](#oauthprovider))**
Providers is used to configure OAuth providers.


Tyk classic API definition: `external_oauth.providers`.

### **ExtractCredentialsFromBody**

ExtractCredentialsFromBody configures extracting credentials from the request body.

**Field: `enabled` (`boolean`)**
Enabled activates extracting credentials from body.

Tyk classic API definition: `basic_auth.extract_from_body`.

**Field: `userRegexp` (`string`)**
UserRegexp is the regex for username e.g. `<User>(.*)</User>`.

Tyk classic API definition: `basic_auth.userRegexp`.

**Field: `passwordRegexp` (`string`)**
PasswordRegexp is the regex for password e.g. `<Password>(.*)</Password>`.

Tyk classic API definition: `basic_auth.passwordRegexp`.

### **FromOASExamples**

FromOASExamples configures mock responses that should be returned from OAS example responses.

**Field: `enabled` (`boolean`)**
Enabled activates getting a mock response from OAS examples or schemas documented in OAS.

**Field: `code` (`int`)**
Code is the default HTTP response code that the gateway reads from the path responses documented in OAS.

**Field: `contentType` (`string`)**
ContentType is the default HTTP response body type that the gateway reads from the path responses documented in OAS.

**Field: `exampleName` (`string`)**
ExampleName is the default example name among multiple path response examples documented in OAS.

### **Internal**

Internal holds the endpoint configuration, configuring the endpoint for internal requests.
Tyk classic API definition: `version_data.versions...extended_paths.internal[*]`.

**Field: `enabled` (`boolean`)**
Enabled if set to true makes the endpoint available only for internal requests.

### **Introspection**

Introspection holds configuration for OAuth token introspection.

**Field: `enabled` (`boolean`)**
Enabled activates OAuth access token validation by introspection to a third party.


Tyk classic API definition: `external_oauth.providers[].introspection.enabled`.

**Field: `url` (`string`)**
URL is the URL of the third party provider's introspection endpoint.


Tyk classic API definition: `external_oauth.providers[].introspection.url`.

**Field: `clientId` (`string`)**
ClientID is the public identifier for the client, acquired from the third party.


Tyk classic API definition: `external_oauth.providers[].introspection.client_id`.

**Field: `clientSecret` (`string`)**
ClientSecret is a secret known only to the client and the authorisation server, acquired from the third party.


Tyk classic API definition: `external_oauth.providers[].introspection.client_secret`.

**Field: `identityBaseField` (`string`)**
IdentityBaseField is the key showing where to find the user id in the claims. If it is empty, the `sub` key is looked at.


Tyk classic API definition: `external_oauth.providers[].introspection.identity_base_field`.

**Field: `cache` ([IntrospectionCache](#introspectioncache))**
Cache is the caching mechanism for introspection responses.


Tyk classic API definition: `external_oauth.providers[].introspection.cache`.

### **IntrospectionCache**

IntrospectionCache holds configuration for caching introspection requests.

**Field: `enabled` (`boolean`)**
Enabled activates the caching mechanism for introspection responses.


Tyk classic API definition: `external_oauth.providers[].introspection.cache.enabled`.

**Field: `timeout` (`int64`)**
Timeout is the duration in seconds of how long the cached value stays.
For introspection caching, it is suggested to use a short interval.


Tyk classic API definition: `external_oauth.providers[].introspection.cache.timeout`.

### **JWT**

JWT holds the configuration for the JWT middleware.

**Field: `enabled` (`boolean`)**
Enabled activates the basic authentication mode.


Tyk classic API definition: `enable_jwt`.

**Field: `source` (`string`)**
Source contains the source for the JWT.


Tyk classic API definition: `jwt_source`.

**Field: `jwksURIs` (`[]apidef.JWK`)**
JwksURIs contains a list of JSON Web Key Sets (JWKS) endpoints from which Tyk will retrieve JWKS to validate JSON Web Tokens (JWTs).

**Field: `signingMethod` (`string`)**
SigningMethod contains the signing method to use for the JWT.


Tyk classic API definition: `jwt_signing_method`.

**Field: `identityBaseField` (`string`)**
IdentityBaseField specifies the claim name uniquely identifying the subject of the JWT.
The identity fields that are checked in order are: `kid`, IdentityBaseField, `sub`.


Tyk classic API definition: `jwt_identity_base_field`.

**Field: `skipKid` (`boolean`)**
SkipKid controls skipping using the `kid` claim from a JWT (default behaviour).
When this is true, the field configured in IdentityBaseField is checked first.


Tyk classic API definition: `jwt_skip_kid`.

**Field: `policyFieldName` (`string`)**
PolicyFieldName is a configurable claim name from which a policy ID is extracted.
The policy is applied to the session as a base policy.


Tyk classic API definition: `jwt_policy_field_name`.

**Field: `clientBaseField` (`string`)**
ClientBaseField is used when PolicyFieldName is not provided. It will get
a session key and use the policies from that. The field ensures that requests
use the same session.


Tyk classic API definition: `jwt_client_base_field`.

**Field: `scopes` ([Scopes](#scopes))**
Scopes holds the scope to policy mappings for a claim name.

**Field: `defaultPolicies` (`[]string`)**
DefaultPolicies is a list of policy IDs that apply to the session.


Tyk classic API definition: `jwt_default_policies`.

**Field: `issuedAtValidationSkew` (`uint64`)**
IssuedAtValidationSkew contains the duration in seconds for which token issuance can predate the current time during the request.


Tyk classic API definition: `jwt_issued_at_validation_skew`.

**Field: `notBeforeValidationSkew` (`uint64`)**
NotBeforeValidationSkew contains the duration in seconds for which token validity can predate the current time during the request.


Tyk classic API definition: `jwt_not_before_validation_skew`.

**Field: `expiresAtValidationSkew` (`uint64`)**
ExpiresAtValidationSkew contains the duration in seconds for which the token can be expired before we consider it expired.


Tyk classic API definition: `jwt_expires_at_validation_skew`.

**Field: `idpClientIdMappingDisabled` (`boolean`)**
IDPClientIDMappingDisabled prevents Tyk from automatically detecting the use of certain IDPs based on standard claims
that they include in the JWT: `client_id`, `cid`, `clientId`. Setting this flag to `true` disables the mapping and avoids
accidentally misidentifying the use of one of these IDPs if one of their standard values is configured in your JWT.


Tyk classic API definition: `idp_client_id_mapping_disabled`.

### **JWTValidation**

JWTValidation holds configuration for validating access tokens by inspecing them
against a third party API, usually one provided by the IDP.

**Field: `enabled` (`boolean`)**
Enabled activates OAuth access token validation.


Tyk classic API definition: `external_oauth.providers[].jwt.enabled`.

**Field: `signingMethod` (`string`)**
SigningMethod to verify signing method used in jwt - allowed values HMAC/RSA/ECDSA.


Tyk classic API definition: `external_oauth.providers[].jwt.signing_method`.

**Field: `source` (`string`)**
Source is the secret to verify signature. Valid values are:

- a base64 encoded static secret,
- a valid JWK URL in plain text,
- a valid JWK URL in base64 encoded format.


Tyk classic API definition: `external_oauth.providers[].jwt.source`.

**Field: `identityBaseField` (`string`)**
IdentityBaseField is the identity claim name.


Tyk classic API definition: `external_oauth.providers[].jwt.identity_base_field`.

**Field: `issuedAtValidationSkew` (`uint64`)**
IssuedAtValidationSkew is the clock skew to be considered while validating the iat claim.


Tyk classic API definition: `external_oauth.providers[].jwt.issued_at_validation_skew`.

**Field: `notBeforeValidationSkew` (`uint64`)**
NotBeforeValidationSkew is the clock skew to be considered while validating the nbf claim.


Tyk classic API definition: `external_oauth.providers[].jwt.not_before_validation_skew`.

**Field: `expiresAtValidationSkew` (`uint64`)**
ExpiresAtValidationSkew is the clock skew to be considered while validating the exp claim.


Tyk classic API definition: `external_oauth.providers[].jwt.expires_at_validation_skew`.

### **MockResponse**

MockResponse configures the mock responses.

**Field: `enabled` (`boolean`)**
Enabled activates the mock response middleware.

**Field: `code` (`int`)**
Code is the HTTP response code that will be returned.

**Field: `body` (`string`)**
Body is the HTTP response body that will be returned.

**Field: `headers` ([Headers](#headers))**
Headers are the HTTP response headers that will be returned.

**Field: `fromOASExamples` ([FromOASExamples](#fromoasexamples))**
FromOASExamples is the configuration to extract a mock response from OAS documentation.

### **Notifications**

Notifications holds configuration for updates to keys.

**Field: `sharedSecret` (`string`)**
SharedSecret is the shared secret used in the notification request.


Tyk classic API definition: `notifications.shared_secret`.

**Field: `onKeyChangeUrl` (`string`)**
OnKeyChangeURL is the URL a request will be triggered against.


Tyk classic API definition: `notifications.oauth_on_keychange_url`.

### **OAuth**

OAuth configures the OAuth middleware.

**Field: `enabled` (`boolean`)**
Enabled activates the OAuth middleware.


Tyk classic API definition: `use_oauth2`.

**Field: `allowedAuthorizeTypes` (`[]string`)**
AllowedAuthorizeTypes is an array of OAuth authorization types.


Tyk classic API definition: `oauth_meta.allowed_authorize_types`.

**Field: `refreshToken` (`boolean`)**
RefreshToken enables clients using a refresh token to get a new bearer access token.


Tyk classic API definition: `oauth_meta.allowed_access_types` (contains REFRESH_TOKEN).

**Field: `authLoginRedirect` (`string`)**
AuthLoginRedirect configures a URL to redirect to after a successful login.


Tyk classic API definition: `oauth_meta.auth_login_redirect`.

**Field: `notifications` ([Notifications](#notifications))**
Notifications configures a URL trigger on key changes.


Tyk classic API definition: `notifications`.

### **OAuthProvider**

OAuthProvider holds the configuration for validation and introspection of OAuth tokens.

**Field: `jwt` ([JWTValidation](#jwtvalidation))**
JWT configures JWT validation.


Tyk classic API definition: `external_oauth.providers[].jwt`.

**Field: `introspection` ([Introspection](#introspection))**
Introspection configures token introspection.


Tyk classic API definition: `external_oauth.providers[].introspection`.

### **Operation**

Operation holds a request operation configuration, allowances, tranformations, caching, timeouts and validation.

**Field: `allow` ([Allowance](#allowance))**
Allow request by allowance.

**Field: `block` ([Allowance](#allowance))**
Block request by allowance.

**Field: `ignoreAuthentication` ([Allowance](#allowance))**
IgnoreAuthentication ignores authentication on request by allowance.

Tyk classic API definition: version_data.versions..extended_paths.ignored[].

**Field: `internal` ([Internal](#internal))**
Internal makes the endpoint only respond to internal requests.

**Field: `transformRequestMethod` ([TransformRequestMethod](#transformrequestmethod))**
TransformRequestMethod allows you to transform the method of a request.

**Field: `transformRequestBody` ([TransformBody](#transformbody))**
TransformRequestBody allows you to transform request body.
When both `path` and `body` are provided, body would take precedence.

**Field: `transformResponseBody` ([TransformBody](#transformbody))**
TransformResponseBody allows you to transform response body.
When both `path` and `body` are provided, body would take precedence.

**Field: `transformRequestHeaders` ([TransformHeaders](#transformheaders))**
TransformRequestHeaders allows you to transform request headers.

**Field: `transformResponseHeaders` ([TransformHeaders](#transformheaders))**
TransformResponseHeaders allows you to transform response headers.

**Field: `urlRewrite` ([URLRewrite](#urlrewrite))**
URLRewrite contains the URL rewriting configuration.

**Field: `cache` ([CachePlugin](#cacheplugin))**
Cache contains the caching plugin configuration.

**Field: `enforceTimeout` ([EnforceTimeout](#enforcetimeout))**
EnforceTimeout contains the request timeout configuration.

**Field: `validateRequest` ([ValidateRequest](#validaterequest))**
ValidateRequest contains the request validation configuration.

**Field: `mockResponse` ([MockResponse](#mockresponse))**
MockResponse contains the mock response configuration.

**Field: `virtualEndpoint` ([VirtualEndpoint](#virtualendpoint))**
VirtualEndpoint contains virtual endpoint configuration.

**Field: `postPlugins` ([EndpointPostPlugins](#endpointpostplugins))**
PostPlugins contains endpoint level post plugins configuration.

**Field: `circuitBreaker` ([CircuitBreaker](#circuitbreaker))**
CircuitBreaker contains the configuration for the circuit breaker functionality.

**Field: `trackEndpoint` ([TrackEndpoint](#trackendpoint))**
TrackEndpoint contains the configuration for enabling analytics and logs.

**Field: `doNotTrackEndpoint` ([TrackEndpoint](#trackendpoint))**
DoNotTrackEndpoint contains the configuration for disabling analytics and logs.

**Field: `requestSizeLimit` ([RequestSizeLimit](#requestsizelimit))**
RequestSizeLimit limits the maximum allowed size of the request body in bytes.

**Field: `rateLimit` ([RateLimitEndpoint](#ratelimitendpoint))**
RateLimit contains endpoint level rate limit configuration.

### **Path**

Path holds plugin configurations for HTTP method verbs.

**Field: `DELETE` ([Plugins](#plugins))**
Delete holds plugin configuration for DELETE requests.

**Field: `GET` ([Plugins](#plugins))**
Get holds plugin configuration for GET requests.

**Field: `HEAD` ([Plugins](#plugins))**
Head holds plugin configuration for HEAD requests.

**Field: `OPTIONS` ([Plugins](#plugins))**
Options holds plugin configuration for OPTIONS requests.

**Field: `PATCH` ([Plugins](#plugins))**
Patch holds plugin configuration for PATCH requests.

**Field: `POST` ([Plugins](#plugins))**
Post holds plugin configuration for POST requests.

**Field: `PUT` ([Plugins](#plugins))**
Put holds plugin configuration for PUT requests.

**Field: `TRACE` ([Plugins](#plugins))**
Trace holds plugin configuration for TRACE requests.

**Field: `CONNECT` ([Plugins](#plugins))**
Connect holds plugin configuration for CONNECT requests.

### **Paths**

Paths is a mapping of API endpoints to Path plugin configurations. This field is part of the [Middleware](#middleware) structure and is used during the conversion between classic API definitions and OAS.

**Important Note:** While the Paths field may appear orphaned in the documentation, it is actually linked dynamically to the [Middleware](#middleware) struct in the code. In the implementation, Paths is populated and accessed through the Middleware struct during API definition processing.

The string keys in this object represent URL path patterns (e.g. `/users`, `/users/{id}`, `/api/*`) that match API endpoints.

Type defined as object of `Path` values, see [Path](#path) definition.

### **Plugins**

Plugins configures common settings for each plugin, allowances, transforms, caching and timeouts.

**Field: `allow` ([Allowance](#allowance))**
Allow request by allowance.

**Field: `block` ([Allowance](#allowance))**
Block request by allowance.

**Field: `ignoreAuthentication` ([Allowance](#allowance))**
IgnoreAuthentication ignores authentication on request by allowance.

Tyk Classic API definition: version_data.versions..extended_paths.ignored[].

**Field: `transformRequestMethod` ([TransformRequestMethod](#transformrequestmethod))**
TransformRequestMethod allows you to transform the method of a request.

**Field: `cache` ([CachePlugin](#cacheplugin))**
Cache allows you to cache the server side response.

**Field: `enforcedTimeout` ([EnforceTimeout](#enforcetimeout))**
EnforceTimeout allows you to configure a request timeout.

### **RateLimitEndpoint**

RateLimitEndpoint carries same settings as RateLimit but for endpoints.

Type defined as `RateLimit`, see [RateLimit](#ratelimit) definition.

### **RequestSizeLimit**

RequestSizeLimit limits the maximum allowed size of the request body in bytes.

**Field: `enabled` (`boolean`)**
Enabled activates the Request Size Limit functionality.


Tyk classic API definition: `version_data.versions..extended_paths.size_limits[].disabled` (negated).

**Field: `value` (`int64`)**
Value is the maximum allowed size of the request body in bytes.


Tyk classic API definition: `version_data.versions..extended_paths.size_limits[].size_limit`.

### **SecurityScheme**

SecurityScheme defines an Importer interface for security schemes.

### **Signature**

Signature holds the configuration for signature validation.

**Field: `enabled` (`boolean`)**
Enabled activates signature validation.


Tyk classic API definition: `auth_configs[X].validate_signature`.

**Field: `algorithm` (`string`)**
Algorithm is the signature method to use.


Tyk classic API definition: `auth_configs[X].signature.algorithm`.

**Field: `header` (`string`)**
Header is the name of the header to consume.


Tyk classic API definition: `auth_configs[X].signature.header`.

**Field: `query` ([AuthSource](#authsource))**
Query is the name of the query parameter to consume.


Tyk classic API definition: `auth_configs[X].signature.use_param/param_name`.

**Field: `secret` (`string`)**
Secret is the signing secret used for signature validation.


Tyk classic API definition: `auth_configs[X].signature.secret`.

**Field: `allowedClockSkew` (`int64`)**
AllowedClockSkew configures a grace period in seconds during which an expired token is still valid.


Tyk classic API definition: `auth_configs[X].signature.allowed_clock_skew`.

**Field: `errorCode` (`int`)**
ErrorCode configures the HTTP response code for a validation failure.
If unconfigured, a HTTP 401 Unauthorized status code will be emitted.


Tyk classic API definition: `auth_configs[X].signature.error_code`.

**Field: `errorMessage` (`string`)**
ErrorMessage configures the error message that is emitted on validation failure.
A default error message is emitted if unset.


Tyk classic API definition: `auth_configs[X].signature.error_message`.

### **Token**

Token holds the values related to authentication tokens.

**Field: `enabled` (`boolean`)**
Enabled activates the token based authentication mode.


Tyk classic API definition: `auth_configs["authToken"].use_standard_auth`.

**Field: `enableClientCertificate` (`boolean`)**
EnableClientCertificate allows to create dynamic keys based on certificates.


Tyk classic API definition: `auth_configs["authToken"].use_certificate`.

**Field: `signatureValidation` ([Signature](#signature))**
Signature holds the configuration for verifying the signature of the token.


Tyk classic API definition: `auth_configs["authToken"].use_certificate`.

### **TrackEndpoint**

TrackEndpoint configures Track or DoNotTrack behaviour for an endpoint.
Tyk classic API definition: `version_data.versions..extended_paths.track_endpoints`, `version_data.versions..extended_paths.do_not_track_endpoints`.

**Field: `enabled` (`boolean`)**
Enabled if set to true enables or disables tracking for an endpoint depending
if it's used in `trackEndpoint` or `doNotTrackEndpoint`.

### **TransformBody**

TransformBody holds configuration about request/response body transformations.

**Field: `enabled` (`boolean`)**
Enabled activates transform request/request body middleware.


Tyk classic API definition: `version_data.versions..extended_paths.transform[].disabled` (negated).

**Field: `format` (`string`)**
Format of the request/response body, xml or json.


Tyk classic API definition: `version_data.versions..extended_paths.transform[].template_data.input_type`.

**Field: `path` (`string`)**
Path file path for the template.


Tyk classic API definition: `version_data.versions..extended_paths.transform[].template_data.template_source` when `template_data.template_mode` is `file`.

**Field: `body` (`string`)**
Body base64 encoded representation of the template.


Tyk classic API definition: `version_data.versions..extended_paths.transform[].template_data.template_source` when `template_data.template_mode` is `blob`.

### **TransformRequestMethod**

TransformRequestMethod holds configuration for rewriting request methods.

**Field: `enabled` (`boolean`)**
Enabled activates Method Transform for the given path and method.

**Field: `toMethod` (`string`)**
ToMethod is the http method value to which the method of an incoming request will be transformed.

### **URLRewrite**

URLRewrite configures URL rewriting.
Tyk classic API definition: `version_data.versions..extended_paths.url_rewrite`.

**Field: `enabled` (`boolean`)**
Enabled activates URL rewriting if set to true.

**Field: `pattern` (`string`)**
Pattern is the regular expression against which the request URL is compared for the primary rewrite check.
If this matches the defined pattern, the primary URL rewrite is triggered.

**Field: `rewriteTo` (`string`)**
RewriteTo specifies the URL to which the request shall be rewritten if the primary URL rewrite is triggered.

**Field: `triggers` ([[]*URLRewriteTrigger](#urlrewritetrigger))**
Triggers contain advanced additional triggers for the URL rewrite.
The triggers are processed only if the requested URL matches the pattern above.

### **URLRewriteCondition**

URLRewriteCondition defines the matching mode for an URL rewrite rules.
Tyk classic API definition: Matching condition in `version_data.versions..extended_paths.url_rewrite[].triggers[].on`.

- Value `any` means any of the defined trigger rules may match.
- Value `all` means all the defined trigger rules must match.

### **URLRewriteInput**

URLRewriteInput defines the input for an URL rewrite rule.
Tyk classic API definition: Input source for URL rewrite rules in `version_data.versions..extended_paths.url_rewrite[].triggers[].options`.

The following values are valid:

- `url`, match pattern against URL
- `query`, match pattern against named query parameter value
- `path`, match pattern against named path parameter value
- `header`, match pattern against named header value
- `sessionMetadata`, match pattern against session metadata
- `requestBody`, match pattern against request body
- `requestContext`, match pattern against request context

The default `url` is used as the input source.

### **URLRewriteRule**

URLRewriteRule represents a rewrite matching rules.
Tyk classic API definition: `version_data.versions..extended_paths.url_rewrite[].triggers[].options`.

**Field: `in` ([URLRewriteInput](#urlrewriteinput))**
In specifies one of the valid inputs for URL rewriting.

**Field: `name` (`string`)**
Name is the index in the value declared inside `in`.

Example: for `in=query`, `name=q`, the parameter `q` would
be read from the request query parameters.

The value of name is unused when `in` is set to `requestBody`,
as the request body is a single value and not a set of values.

**Field: `pattern` (`string`)**
Pattern is the regular expression against which the `in` values are compared for this rule check.
If the value matches the defined `pattern`, the URL rewrite is triggered for this rule.

**Field: `negate` (`boolean`)**
Negate is a boolean negation operator. Setting it to true inverts the matching behaviour
such that the rewrite will be triggered if the value does not match the `pattern` for this rule.

### **URLRewriteTrigger**

URLRewriteTrigger represents a set of matching rules for a rewrite.
Tyk classic API definition: `version_data.versions..extended_paths.url_rewrite[].triggers`.

**Field: `condition` ([URLRewriteCondition](#urlrewritecondition))**
Condition indicates the logical combination that will be applied to the rules for an advanced trigger.

**Field: `rules` ([[]*URLRewriteRule](#urlrewriterule))**
Rules contain individual checks that are combined according to the
`condition` to determine if the URL rewrite will be triggered.
If empty, the trigger is ignored.

**Field: `rewriteTo` (`string`)**
RewriteTo specifies the URL to which the request shall be rewritten
if indicated by the combination of `condition` and `rules`.

### **ValidateRequest**

ValidateRequest holds configuration required for validating requests.

**Field: `enabled` (`boolean`)**
Enabled is a boolean flag, if set to `true`, it enables request validation.

**Field: `errorResponseCode` (`int`)**
ErrorResponseCode is the error code emitted when the request fails validation.
If unset or zero, the response will returned with http status 422 Unprocessable Entity.

### **VirtualEndpoint**

VirtualEndpoint contains virtual endpoint configuration.

**Field: `enabled` (`boolean`)**
Enabled activates virtual endpoint.


Tyk classic API definition: `virtual.disabled` (negated).

**Field: `name` (`string`)**
Name is the name of plugin function to be executed.
Deprecated: Use FunctionName instead.

**Field: `functionName` (`string`)**
FunctionName is the name of plugin function to be executed.


Tyk classic API definition: `virtual.response_function_name`.

**Field: `path` (`string`)**
Path is the path to JS file.


Tyk classic API definition: `virtual.function_source_uri` when `virtual.function_source_type` is `file`.

**Field: `body` (`string`)**
Body is the JS function to execute encoded in base64 format.


Tyk classic API definition: `virtual.function_source_uri` when `virtual.function_source_type` is `blob`.

**Field: `proxyOnError` (`boolean`)**
ProxyOnError proxies if virtual endpoint errors out.


Tyk classic API definition: `virtual.proxy_on_error`.

**Field: `requireSession` (`boolean`)**
RequireSession if enabled passes session to virtual endpoint.


Tyk classic API definition: `virtual.use_session`.

### **XTykStreaming**

XTykStreaming represents the structure for Tyk streaming configurations.

**Field: `streams` (`any`)**
Streams contains the configurations related to Tyk Streams.
