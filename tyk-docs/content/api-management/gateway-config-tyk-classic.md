---
title: "Tyk Classic API Definition"
date: 2025-01-10
tags: ["Gateway", "Configuration", "Tyk Classic", "Tyk Classic API Definition", "Tyk Classic API Definition Object",]
description: "How to configure Tyk Classic API Definition"
keywords: ["Gateway", "Configuration", "Tyk Classic", "Tyk Classic API Definition", "Tyk Classic API Definition Object",]
aliases:
  - /tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting
  - /tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting
  - /tyk-apis/tyk-gateway-api/api-definition-objects/authentication
  - /tyk-apis/tyk-gateway-api/api-definition-objects/cors
  - /tyk-rest-api/api-definition-objects/custom-analytics
  - /tyk-apis/tyk-gateway-api/api-definition-objects/custom-analytics
  - /tyk-apis/tyk-gateway-api/api-definition-objects/events
  - /tyk-apis/tyk-gateway-api/api-definition-objects/graphql
  - /tyk-apis/tyk-gateway-api/api-definition-objects/jwt
  - /tyk-apis/tyk-gateway-api/api-definition-objects/other-root-objects
  - /tyk-apis/tyk-gateway-api/api-definition-objects/proxy-settings
  - /tyk-apis/tyk-gateway-api/api-definition-objects/rate-limits
  - /tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests
  - /tyk-gateway-api/api-definition-objects
  - /tyk-dashboard-v1-0/api-management
  - /tyk-rest-api/api-management
  - /tyk-rest-api/api-definition-object-details
  - /tyk-rest-api/api-definition-objects
  - /tyk-apis/tyk-gateway-api/api-definition-objects
---

## Introduction to Tyk Classic

Tyk's legacy API definition is now called Tyk Classic and is used for GraphQL, XML/SOAP and TCP services.

From Tyk 5.8 we recommend that any REST APIs are migrated to the newer [Tyk OAS API]({{< ref "api-management/gateway-config-tyk-oas" >}}) style, in order that they can benefit from simpler configuration and future enhancements.

For Tyk Dashboard users with an existing portfolio of Tyk Classic API definitions, we provide a [migration tool]({{< ref "api-management/migrate-from-tyk-classic" >}}), available via the Dashboard API and UI.

{{< note success >}}
**Note**  

For versions of Tyk prior to 5.8 not all Gateway features can be configured using the Tyk OAS API definition, for edge cases you might need to use Tyk Classic for REST APIs, though we recommend updating to Tyk 5.8 and adopting Tyk OAS.
{{< /note >}}

The Tyk Classic API definition has a flat structure that does not use the `omitempty` style, requiring all fields to be present even if set to null, resulting in a larger object than that for an equivalent Tyk OAS API definition.

Note that there are some specific differences between Tyk Classic and Tyk OAS APIs, in particular with respect to [default authentication method](#configuring-authentication-for-tyk-classic-apis) and [API versioning](#tyk-classic-api-versioning).

## Tyk Classic API versioning

When multiple versions of a Tyk Classic API are created, the details are stored in a single API definition - unlike with Tyk OAS where a separate API definition is created for each version. The common configuration is stored in the root, whereas the details of the different versions are stored in a dedicated `version_data` object, within the API definition.

Whilst this allows for easy management of all the API versions, it limits the number of features that can be configured differently between versions, as not all Gateway configuration options are duplicated in `version_data`.

Tyk enforces strict access control to specific versions of APIs if these are specified in the access token (key). If, once Tyk has identified the API to load, and has allowed the access key through, it will check the access token's session data for access permissions. If it finds none, it will let the token through. However, if there are permissions and versions defined, it will be strict in **only** allowing access to that version.

Key things to note when configuring versioning for a Tyk Classic API:

- you must set `version_data.not_versioned` to `false` for Tyk to treat the API as versioned
- `version_data.default_version` must contain the `name` of the version that shall be treated as default (for access control and default fallback)
- you can use `version_data.paths` to configure endpoint-level ignore, allow and block lists (which can be used to configure a mock response)
- you must use `version_data.extended_paths` to configure other endpoint-level middleware
- common versioning configuration is mostly contained within the [definition]({{< ref "api-management/gateway-config-tyk-classic#common-versioning-configuration" >}}) object
- configuration for the different versions is contained within the [version_data]({{< ref "api-management/gateway-config-tyk-classic#version-specific-configuration" >}}) object
  - this also contains some common configuration (`not_versioned` and `default_version`)

When you first create an API, it will not be "versioned" (i.e. `not_versioned` will be set to `true`) and there will be a single version with the name `Default` created in the `version_data` section.

### Common versioning configuration

**Field: `definition`**
This object in the root of the Tyk Classic API definition handles information related to how Tyk should handle requests to the versioned API

**Field: `definition.location`**
Used to configure where the versioning identifier should be provided, one of:`header`, `url`, `url-param`.

**Field: `definition.key`**
The name of the key that contains the versioning identifier if `definition.location` is set to `header` or `url-param`.

**Field: `definition.strip_versioning_data`**
Set this to `true` to remove the versioning identifier when creating the upstream (target) URL.

**Field: `definition.fallback_to_default`**
Set this to `true` to invoke the default version if an invalid version is specified in the request.

**Field: `definition.url_versioning_pattern`**
Available from Tyk 5.5.0, if you are have set both `definition.strip_versioning_data` and `definition.fallback_to_default` to `true` and are using `definition.location=url` you can configure this with a regex that matches the format that you use for the versioning identifier (`versions.{version-name}.name`)

The following fields are either deprecated or otherwise not used for Tyk Classic API versioning and should be left with their default values:

- `definition.default`: defaults to an empty string `""`
- `definition.enabled`: defaults to `false`
- `definition.name`: defaults to an empty string `""`
- `definition.strip_path`: deprecated field; defaults to `false`
- `definition.versions`: defaults to an empty array `{}`

### Version specific configuration

**Field: `version_data`**
This object contains the version status and configuration for  your API

**Field: `version_data.not_versioned`**
Set this to `false` to treat this as a versioned API. If you are not using versioning for this API you must have a single `Default` entry in the `version_data.versions` map.

**Field: `version_data.default_version`**
Used to configure where the versioning identifier should be provided, one of:`header`, `url`, `url-param`.

**Field: `version_data.versions`**
A list of objects that describe the versions of the API; there must be at least one (`Default`) version defined for any API (even non-versioned APIs). Each version of your API should be defined here with a unique `name`.

**Field: `version_data.versions.{version-name}.name`**
An identifier for this version of the API, for example `Default` or `v1`. The value given here is what will Tyk will match against the value in the `definition.key`.

**Field: `version_data.versions.{version-name}.expires`**
If a value is set then Tyk will automatically deprecate access to the API after the specified timestamp. The entry here takes the form of: `"YYYY-MM-DD HH:MM"`. If this is not set the version will never expire.

**Field: `version_data.versions.{version-name}.paths`**
This object enables configuration of the basic allow list, block list and ignore authentication middleware for specific endpoints in the API version. You can also configure these and many other per-endpoint middleware using the `extended_paths` field.

**Field: `version_data.versions.{version-name}.override_target`**
You can configure a different target URL here which will be used instead of the value stored in `proxy.target_url`, redirecting requests to a different hostname or domain. Note that this will also override (and so is not compatible with) upstream load balancing and Service Discovery, if configured for this API.

**Field: `version_data.versions.{version-name}.global_headers`**
A `key:value` map of HTML headers to inject to the request.

**Field: `version_data.versions.{version-name}.global_headers_remove`**
A list of HTML headers to remove from the request.

**Field: `version_data.versions.{version-name}.global_size_limit`**
Apply a maximum size to the request body (payload) - in bytes.

**Field: `version_data.versions.{version-name}.ignore_endpoint_case`**
If this boolean flag is set to `false`, Tyk will apply case sensitive matching of requests to endpoints defined in the API definition. 

**Field: `version_data.versions.{version-name}.use_extended_paths`**
Set this value to `true` if you want Tyk to apply specific middleware to endpoints in this version, configured using `version_data.versions.{version-name}.extended_paths`.

**Field: `version_data.versions.{version-name}.extended_paths`**
This field contains a list of middleware configurations and to which paths they should be applied. The available middleware are:

```
{
  black_list[],
  white_list[],
  ignore[],
  track_endpoints[],
  do_not_track_endpoints[],
  internal[],
  method_transforms[],
  transform[],
  transform_headers[],
  transform_response[],
  transform_response_headers[],
  size_limits[],
  validate_json[],
  url_rewrites[],
  virtual[],
  transform_jq[],
  cache[],
  hard_timeouts[],
  circuit_breakers[]
}
```

Each entry must include the method and path (identifying the endpoint) where the middleware runs. You can find the other options for each middleware on its respective [Traffic Transformation]({{< ref "api-management/traffic-transformation" >}}) page under the [Classic API Definition]({{< ref "api-management/traffic-transformation/allow-list#api-definition-1" >}}) section. The black_list[], white_list[], and ignore[] middleware provide mock response functionality.


## Configuring authentication for Tyk Classic APIs

Tyk Classic APIs *default to the auth token method* for authenticating requests. Flags in the API definition can be configured to enforce an alternative method:

- keyless (no authentication of the client)
- basic authentication
- HMAC request signing
- Tyk as the OAuth 2.0 authorization server
- JWT authentication

**Field: `use_keyless`**
This will switch off all key checking and open the API definition up, some analytics will still be recorded, but rate-limiting, quotas and security policies will not be possible (there is no session to attach requests to). This is a good setting for checking if Tyk works and is proxying traffic correctly.

**Field: `auth`**
This object contains the basic configuration for the Auth (Bearer) Token method.

**Field: `auth.auth_header_name`**
The header name (key) where Tyk should look for the token.

**Field: `auth.use_param`**
Set this to true to instruct Tyk to expect the token in the URL parameter with key `auth.param_name`.

**Field: `auth.param_name`**
The name of the URL parameter key containing the auth token. Note that this is case sensitive.

**Field: `auth.use_cookie`**
Set this to true to instruct Tyk to expect the token in the URL parameter with key `auth.cookie_name`.

**Field: `auth.cookie_name`**
The name of the cookie containing the auth token. Note that this is case sensitive.

**Field: `auth.use_certificate`**


**Field: `auth.validate_signature`**
Boolean value set to `true` to enable Auth Token Signature Validation

**Field: `auth.signature`**
Configuration for Auth Token Signature Validation

**Field: `auth.signature.algorithm`**
The algorithm you wish to validate the signature against. Options are:
- `MasherySHA256`
- `MasheryMD5`
 
**Field: `auth.signature.header`**
Header key for attempted signature

**Field: `auth.signature.secret`**
The shared secret which was used to sign the request
- this can hold a dynamic value, by referencing `$tyk_meta` or `$tyk_context` variables.
- for example: if you have stored the shared secret in the field `individual_secret` of the session token's meta-data you would use the value `"secret": "$tyk_meta.individual_secret"`.

**Field: `auth.signature.allowed_clock_skew`**
Maximum permitted deviation in seconds between UNIX timestamp of Tyk & UNIX timestamp used to generate the signed request

**Field: `use_basic_auth`**
This method will enable basic auth as specified by the HTTP spec, an API with this flag set will request for a username and password and require a standard base64 Authentication header to be let through. 

**Field: `basic_auth.disable_caching`**
This disables the caching of basic authentication keys.

**Field: `basic_auth.cache_ttl`**
This is the refresh period for the basic authentication key cache (in seconds).

**Field: `enable_signature_checking`**
If this option is set to `true`, Tyk will implement the HMAC signing standard as proposed in the [HTTP Signatures Spec](https://web-payments.org/specs/ED/http-signatures/2014-02-01/#page-3). In particular the structure of the Authorization header and the encoding method need to be taken into account.
- this method will use a session key to identify a user and a user secret that should be used by the client to sign each request's `date` header
- it will also introduce clock skew checks, requests outside of 300ms of the system time will be rejected
- it is not recommended for Single-Page-Webapps (SPA) or Mobile apps due to the fact that secrets need to be distributed

**Field: `hmac_allowed_algorithms`**
Tyk supports the following HMAC algorithms: “hmac-sha1", "hmac-sha256", "hmac-sha384", "hmac-sha512”. You can limit which ones you want to support with this option. For example, [“hmac-sha256”]

**Field: `hmac_allowed_clock_skew`**
Set this value to anything larger than `0` to set the number of milliseconds that will be tolerated for clock skew. Set to `0` to prevent clock skew checks on requests (only in HMAC mode, i.e. when `enable_signature_checking` is set to `true`).

**Field: `use_oauth2`**
This authentication method will use Tyk as the OAuth 2.0 Authorization Server. Enabling this option will cause Tyk to add OAuth2-standard endpoints to the API for `/authorize` and `/token`, these will supersede any other requests to your proxied system in order to enable the flow. 

**Field: `oauth_meta.allowed_access_types`**
This is a string array of OAuth access options depending on the OAuth grant types to be supported. Valid options are:
- `authorization_code` - client has an authorization code to request a new access token.
- `refresh_token` - client can use a refresh token to refresh expired bearer access token.

**Field: `oauth_meta.allowed_authorize_types`**
This is a string array of OAuth authorization types. Valid options are:
- `code` - Client can request an authorization code which can be used to request an access code via a server request (traditionally reserved for server-side apps).
- `token` - Client can request an access token directly, this will not enable refresh tokens and all tokens have a 12 hour validity. Recommended for mobile apps and single-page webapps.

**Field: `oauth_meta.auth_login_redirect`**
The Tyk OAuth flow has a dummy (intercept) `/authorize` endpoint which basically redirects the user to your login and authentication page, it will also send along all OAuth data as part of the request (so as to mimic a regular app flow). This is the URL that the user will be sent to (via `POST`).

**Field: `notifications`**
When Tyk is used as the OAuth 2.0 Authorization Server, because it will handle access requests on your behalf once authorization codes have been issued, it will need to notify your system that these have occurred. It will `POST` key data to the URL set in these options to ensure that your system is synchronised with Tyk.

**Field: `notifications.shared_secret`**
Posted data to your service will use this shared secret as an authorization header. This is to ensure that messages being received are from Tyk and not from another system.

**Field: `notifications.oauth_on_keychange_url`**
The URL that will be sent the updated information - the URL will be polled up to 3 times if there is a communications failure. On a `200 OK` response it stops.

**Field: `auth_configs`**
This section allows definition of multiple chained authentication mechanisms that will be applied to requests to the API, with distinct authentication headers identified for the different auth modes.

For example:

```json
{
  "auth_configs": {
    "authToken": { "auth_header_name": "My-Auth-Header-Key" },
    "basic": { "auth_header_name": "My-Basic-Auth-Header-Key" }
  }
}
```

**Field: `base_identity_provided_by`**
This enables multiple authentication and indicates which authentication method provides the session object that determines access control, rate limits and usage quotas.

It should be set to one of the following:

- `auth_token`
- `hmac_key`
- `basic_auth_user`
- `jwt_claim`
- `oidc_user`
- `oauth_key`
- `custom_auth`

**Field: `enable_jwt`**
Set JWT as the authentication method for this API.

**Field: `jwt_signing_method`**
Either HMAC or RSA - HMAC requires a shared secret while RSA requires a public key to use to verify against. Please see the section on JSON web tokens for more details on how to generate these.

**Field: `jwt_source`**
Must be a base64 encoded valid RSA, ECDSA or HMAC key or the full address of a JSON Web Key Set (JWKS) endpoint. This key (or the JWKS retrieved from the endpoint) will be used to validate inbound JWT and throttle them according to the centralised JWT options and fields set in the configuration. See [JWT signature validation]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens#remotely-stored-keys-jwks-endpoint" >}}) for more details on using a JWKS endpoint.

**Field: `jwt_identity_base_field`**
Identifies the user or identity to be used in the Claims of the JWT. This will fallback to `sub` if not found. This field forms the basis of a new "virtual" token that gets used after validation. It means policy attributes are carried forward through Tyk for attribution purposes.
    
Centralised JWTs add a `TykJWTSessionID` to the session metadata on create to enable upstream hosts to work with the internalised token should things need changing.

**Field: `jwt_policy_field_name`**
The policy ID to apply to the virtual token generated for a JWT.

**Field: `jwt_issued_at_validation_skew`**
Prevent token rejection due to clock skew between servers for Issued At claim (seconds, default: 0)

**Field: `jwt_expires_at_validation_skew`**
Prevent token rejection due to clock skew between servers for Expires At claim (seconds, default: 0)

**Field: `jwt_not_before_validation_skew`**
Prevent token rejection due to clock skew between servers for Not Before claim (seconds, default: 0)

## GraphQL specific fields 

{{< include "api-def-graphql" >}}

## General features

### API identification

**Field: `api_id`**
The identifier for the API This should be unique, but can actually be any kind of string. For single-instance setups this can probably be set to `1`. It is recommended to make this a UUID. The `api_id` is used to identify the API in queries to the Tyk Gateway API or Tyk Dashboard API.

**Field: `name`**
Human readable name of the API. It is used for identification purposes but does not act as an index.

**Field: `org_id`**
This is an identifier that can be set to indicate ownership of an API key or of an individual API. If the Org ID is set (recommended), it is prepended to any keys generated by Tyk - this enables lookups by prefixes from Redis of keys that are in the system.

**Field: `domain`**
The domain to bind this API to. Multiple APIs can share the same domain, so long as their listen paths are unique.
This domain will affect your API only. To set up the portal domain for your organization, please register it in the main Tyk Dashboard settings file. 
Your Tyk Gateway can listen on multiple domains/subdomains through the use of regular expressions, more precisely the RE2 Syntax. They are defined using the format `{name}` or `{name:pattern}`. 
  * `www.example.com` Matches only if domain is www.example.com
  * `{subdomain:[a-z]+}.example.com` Matches dynamic subdomain
  * `{subdomain:foo|bar}.example.com` will listen on foo.example.com and bar.example.com"

**Field: `ignore_endpoint_case`**
If set to `true` when matching the URL path for requests to this API, the case of the endpoint path will be ignored. So for an API `my-api` and the endpoint `getuser`, requests to all of the following will be matched:
 
  * `/my-api/getuser`
  * `/my-api/getUser`
  * `/my-api/GetUser`

If set to true, this will override the endpoint level settings in [Ignore]({{< ref "api-management/traffic-transformation/ignore-authentication#case-sensitivity" >}}), [Allowlist]({{< ref "api-management/traffic-transformation/allow-list#case-sensitivity" >}}) and [Blocklist]({{< ref "api-management/traffic-transformation/block-list#case-sensitivity" >}}) middleware. This setting can be overriden at the Tyk Gateway level, and so applied to all APIs, by setting `ignore_endpoint_case` to `true` in your `tyk.conf` file. See [ignore_endpoint_case]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) for details.

**Field: `enable_batch_request_support`**
Set to true to enable batch support

**Field: `id`**
This is allocated by Tyk to locate the API definition in the Dashboard main storage and bears no actual relation to the identity of the API.

**Field: `active`**
This field is used by Tyk Dashboard to control whether the API will serve traffic. If set to `false` then on Gateway start, restart or reload, the API will be ignored and all paths and routes for that API will cease to be proxied. Any keys assigned to it will still exist, though they will not be let through for that particular API.

**Field: `internal`**
This field makes the API accessible only internally within Tyk. When set to `true`, the API will not be loaded by the Gateway for external access and will not be included in API listings returned by the Gateway's management APIs.

### Access token management

**Field: `session_lifetime`**
The session (API access key/token) lifetime will override the expiry date if it has been set on a key (in seconds). for example, if a key has been created that never expires, then it will remain in the session cache forever unless manually deleted. If a re-auth needs to be forced or a default expiry needs to be applied to all keys, then use this feature to set the session expiry for an entire API.

**Field: `session_lifetime_respects_key_expiration`**
If this is set to `true` and the key expiration date is less than the `session_lifetime`, the key expiration value will be set to `session_lifetime`. Don't forget that the key expiration is set in unix timestamp but `session_lifetime` is set in seconds. Also, `session_lifetime_respects_key_expiration` exists in the global config too. When the global one is set to `true`, the one set at the API level will be ignored.

**Field: `dont_set_quota_on_create`**
If set to true, when the keys are created, edited or added for this API, the quota cache in Redis will not be reset.

### Traffic logs

**Field: `enable_detailed_recording`**
If this value is set to `true`, the Gateway will record the request and response payloads in traffic logs.

**Field: `do_not_track`**
If this value is set to `true`, the Gateway will not generate traffic logs for requests to the API.

**Field: `tag_headers`**
This specifies a string array of HTTP headers values which turned into tags. For example, if you include the `X-Request-ID` header to `tag_headers`, for each incoming request it will include an `x-request-id-<header_value>` tag to request an analytic record. This functionality can be useful if you need analytics for request headers without the body content (Enabling detailed logging is another option, but it records the full request and response objects and consumes a lot more space). 

**Field: `expire_analytics_after`**
This value (in seconds) will be used to indicate a TTL (ExpireAt) for the retention of analytics created from traffic logs generated for this API that are stored in MongoDB. If using an alternative analytics storage solution that does not respect ExpireAt then you must manage the record TTL separately.

### OpenTelemetry

**Field: `detailed_tracing`**
If this value is set to `true`, the Gateway will generate detailed OpenTelemetry spans for requests to the API.

### API Level Rate Limits

**Field: `global_rate_limit`**
The [API-level rate limit]({{< ref "api-management/rate-limit#rate-limiting-layers" >}}) aggregates the traffic coming into an API from all sources and ensures that the overall rate limit is not exceeded. It is composed of a `rate` (number of requests) and `per` (interval). If either is set to `0` then no API-level limit is applied.

**Field: `disable_rate_limit`**
If set to `true`, all rate limits are disabled for the specified API (both API-level and key-level)

### Event handlers

**Field: `event_handlers`**
This adds the ability to configure an API with event handlers to perform specific actions when an event occurs.

**Field: `events`**
Each event handler that is added to the event_handlers.events section, is mapped by the event type, and then a list of each handler configuration, defined by the handler name and the handler metadata (usually some kind of configurable options for the specific handler)

### Custom data

**Field: `enable_context_vars`**
Context variables are extracted from the request at the start of the middleware chain, and must be explicitly enabled in order for them to be made available to your transforms. These values can be very useful for later transformation of request data, for example, in converting a Form-based POST into a JSON-based PUT or to capture an IP address as a header.

**Field: `config_data`**
You can use this field to pass custom attributes to the virtual endpoint middleware. It is a list of key:value pairs.

### IP Access Control

**Field: `enable_ip_whitelisting`**
This works with the associated `allowed_ips` list and, when set to `true`, accepts only requests coming from the defined list of allowed IP addresses.

**Field: `allowed_ips`**
A list of strings that defines the IP addresses (in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)) that are allowed access via Tyk. This list is explicit and wildcards are not supported.

**Field: `enable_ip_blacklisting`**
This works with the associated `blacklisted_ips` list and, when set to `true`, rejects and requests coming from the defined list of blocked IP addresses.

**Field: `blacklisted_ips`**
A list of strings that defines the IP addresses (in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)) that are blocked access via Tyk. This list is explicit and wildcards are not supported.

### Cross-Origin Resource Sharing (CORS)

**Field: `CORS.enable`**
Enable CORS for the API

**Field: `CORS.allowed_origin`**
A list of origin domains to allow access from. Wildcards are also supported, e.g. http://*.foo.com

**Field: `CORS.allowed_methods`**
A list of HTTP methods to allow access via.

**Field: `CORS.allowed_headers`**
Headers that are allowed within a request.

**Field: `CORS.exposed_headers`**
Headers that are exposed back in the response.

**Field: `CORS.allow_credentials`**
Whether credentials (cookies) should be allowed.

**Field: `CORS.max_age`**
Maximum age of credentials.

**Field: `CORS.options_passthrough`**
Allow CORS OPTIONS preflight request to be proxied directly to upstream, without authentication and the rest of the checks. This means that pre-flight requests generated by web-clients such as SwaggerUI will be able to test the API using trial keys. If your service handles CORS natively, then enable this option.

### Proxy Transport Settings

**Field: `proxy.preserve_host_header`**
Set to `true` to preserve the host header. If `proxy.preserve_host_header` is set to `true` in an API definition then the host header in the outbound request is retained to be the inbound hostname of the proxy.

**Field: `proxy.listen_path`**
The path to listen on, e.g. `/api` or `/`. Any requests coming into the host, on the port that Tyk is configured to run on, that go to this path will have the rules defined in the API Definition applied. Versioning assumes that different versions of an API will live on the same URL structure. If you are using URL-based versioning (e.g. `/v1/function`, `/v2/function/`) then it is recommended to set up a separate non-versioned definition for each version as they are essentially separate APIs.
    
Proxied requests are literal, no re-writing takes place, for example, if a request is sent to the listen path of: `/listen-path/widgets/new` and the URL to proxy to is `http://your.api.com/api/` then the *actual* request that will land at your service will be: `http://your.api.com/api/listen-path/widgets/new`.
    
This behavior can be circumvented so that the `listen_path` is stripped from the outgoing request. See the section on `strip_listen_path` below.

**Field: `proxy.strip_listen_path`**
By setting this to `true`, Tyk will attempt to replace the `listen-path` in the outgoing request with an empty string. This means that in the above scenario where `/listen-path/widgets/new` and the URL to proxy to is `http://your.api.com/api/` becomes `http://your.api.com/api/listen-path/widgets/new`, actually changes the outgoing request to be: `http://your.api.com/api/widgets/new`.

**Field: `proxy.target_url`**
This defines the target URL that the request should be proxied to if it passes all checks in Tyk.

**Field: `proxy.disable_strip_slash`**
This boolean option allows you to add a way to disable the stripping of the slash suffix from a URL.

**Field: `proxy.enable_load_balancing`**
Set this value to `true` to have a Tyk node distribute traffic across a list of servers. **Required: ** You must fill in the `target_list` section.

**Field: `proxy.target_list`**
A list of upstream targets for load balancing (can be one or many hosts).

**Field: `proxy.check_host_against_uptime_tests`**
If uptime tests are enabled, Tyk will check the hostname of the outbound request against the downtime list generated by the host checker. If the host is found, then it is skipped.

**Field: `proxy.service_discovery`**
The service discovery section tells Tyk where to find information about the host to proxy to. In a clustered environment this is useful if servers are coming online and offline dynamically with new IP addresses. The service discovery module can pull out the required host data from any service discovery tool that exposes a RESTful endpoint that outputs a JSON object.

```json
{
  "enable_load_balancing": true,
  "service_discovery": {
    "use_discovery_service": true,
    "query_endpoint": "http://127.0.0.1:4001/v2/keys/services/multiobj",
    "use_nested_query": true,
    "parent_data_path": "node.value",
    "data_path": "array.hostname",
    "port_data_path": "array.port",
    "use_target_list": true,
    "cache_timeout": 10
  },
}
```

**Field: `proxy.service_discovery.use_discovery_service`**
Set this to `true` to enable the discovery module.

**Field: `proxy.service_discovery.query_endpoint`**
The endpoint to call.

**Field: `proxy.service_discovery.data_path`**
The namespace of the data path. For example, if your service responds with:

```json
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

Then your name space would be `node.value`.

**Field: `proxy.service_discovery.use_nested_query`**
Sometimes the data you are retrieving is nested in another JSON object. For example, this is how Etcd responds with a JSON object as a value key:

```json
{
  "action": "get",
  "node": {
    "key": "/services/single",
    "value": "{\"hostname\": \"http://httpbin.org\", \"port\": \"80\"}",
    "modifiedIndex": 6,
    "createdIndex": 6
  }
}
```

In this case, the data actually lives within this string-encoded JSON object. So in this case, you set the `use_nested_query` to `true`, and use a combination of the `data_path` and `parent_data_path` (below)

**Field: `proxy.service_discovery.parent_data_path`**
This is the namespace of where to find the nested value. In the above example, it would be `node.value`. You would then change the `data_path` setting to be `hostname`. Tyk will decode the JSON string and then apply the `data_path` namespace to that object in order to find the value.

**Field: `proxy.service_discovery.port_data_path`**
In the above nested example, we can see that there is a separate PORT value for the service in the nested JSON. In this case you can set the `port_data_path` value and Tyk will treat `data_path` as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier such as `/widgets/`). In the example, the `port_data_path` would be `port`.

**Field: `proxy.service_discovery.target_path`**
The target path to append to the host:port combination provided by the service discovery engine.

**Field: `proxy.service_discovery.use_target_list`**
If you are using load_balancing, set this value to `true` and Tyk will treat the data path as a list and inject it into the target list of your API definition.

**Field: `proxy.service_discovery.cache_timeout`**
Tyk caches target data from a discovery service. In order to make this dynamic you can set a cache value when the data expires and new data is loaded.

**Field: `proxy.transport`**
The transport section allows you to specify a custom proxy and set the minimum TLS versions and any SSL ciphers.

This is an example of `proxy.transport` definition followed by explanations for every field.
```json
{
  "transport": {
    "proxy_url": "http(s)://proxy.url:1234",
    "ssl_min_version": 771,
    "ssl_ciphers": [
      "TLS_RSA_WITH_AES_128_GCM_SHA256", 
      "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
    ],
    "ssl_insecure_skip_verify": true,
    "ssl_force_common_name_check": false
  }
}
```

**Field: `proxy.transport.proxy_url`**
Use this setting to specify your custom forward proxy and port.

**Field: `proxy.transport.ssl_min_version`**
Use this setting to specify your minimum TLS version; note that this is limited by the version of Tyk due to underlying Golang support for legacy TLS versions.

**Field: `proxy.transport.ssl_ciphers`**
You can add `ssl_ciphers` which takes an array of strings as its value. Each string must be one of the allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants. This is not applicable from TLS 1.3.

**Field: `proxy.transport.ssl_insecure_skip_verify`**
Boolean flag to control at the API definition whether it is possible to use self-signed certs for some APIs, and actual certs for others. This also works for `TykMakeHttpRequest` & `TykMakeBatchRequest` in virtual endpoints.

**Field: `proxy.transport.ssl_force_common_name_check`**
Use this setting to force the validation of a hostname against the certificate Common Name.

### Upstream Authentication

**Field: `strip_auth_data`**
When set to `true`, auth related headers will be stripped from requests proxied through the gateway.

**Field: `request_signing`**
Configuration for Upstream Request Signing using HMAC or RSA algorithms.

**Field: `request_signing.secret`**
The secret used for signing (not shared with the upstream).

**Field: `request_signing.key_id`**
An identifier allocated by the upstream used to identify Tyk as the requesting client.

**Field: `request_signing.algorithm`**
The signing algorithm to be used - one from `hmac-sha1`, `hmac-sha256`, `hmac-sha384`, `hmac-sha512`, `hmac-rsa256`

**Field: `request_signing.header_list`**
A list of headers to be included in the signature calculation.

**Field: `request_signing.certificate_id`**
The certificate ID used in the RSA signing operation.

**Field: `request_signing.signature_header`**
The HTTP header to be used to pass the signature to the upstream.

### Uptime Tests

**Field: `uptime_tests`**
This section defines the uptime tests to run for this API.

**Field: `uptime_tests.check_list`**
A list of tests to run, which can be either short form:

```json
{
  "uptime_tests": {
    "check_list": [
      {
        "url": "http://google.com/"
      }
    ]
  }
}
```

or long form:

```json
{
  "uptime_tests": {
    "check_list": [
      {
        "url": "http://posttestserver.com/post.php?dir=uptime-checker",
        "method": "POST",
        "headers": {
            "this": "that",
            "more": "beans"
        },
        "body": "VEhJUyBJUyBBIEJPRFkgT0JKRUNUIFRFWFQNCg0KTW9yZSBzdHVmZiBoZXJl",
        "timeout": 1000
      }
    ]
  }
}
```

**Field: `uptime_tests.check_list.url`**
The URL to be used for the uptime test.

**Field: `uptime_tests.check_list.method`**
The HTML method to be used for the request to the `check_list.url` (required for long form tests).

**Field: `uptime_tests.check_list.headers`**
A list of headers to be applied to the request to the `check_list.url` as key:value pairs (only for long form tests).

**Field: `uptime_tests.check_list.body`**
The body of the request to be sent to the `check_list.url`, this is Base64 encoded (only for long form tests).

**Field: `uptime_tests.check_list.timeout`**
The timeout in milliseconds for the uptime check (only for long form tests).

