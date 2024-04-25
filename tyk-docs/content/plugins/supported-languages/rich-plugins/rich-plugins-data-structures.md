---
date: 2017-03-24T13:04:21Z
title: Rich Plugins Data Structures
menu:
  main:
    parent: "Rich Plugins"
weight: 3
aliases:
  - /plugins/rich-plugins/rich-plugins-data-structures
---

This page describes the data structures used by Tyk rich plugins, and is used in the following plugin drivers:

-   Python (built-in)
-   Lua (built-in)
-   gRPC (external, compatible with any supported [gRPC language](https://grpc.io/docs/))


The Tyk [Protocol Buffer definitions]((https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) are intended for users to generate their own bindings using the appropriate gRPC tools for the required target language.

The class diagram below illustrates the structure of the [Object](#object) message, dispatched by Tyk to a gRPC server that handles custom plugins.

{{< img src="/img/grpc/grpc-class-diagram.svg" width="600" >}}

The remainder of this document explains the attributes of the protobuf messages.

---

## MiniRequestObject (coprocess_mini_request_object.proto)

The `Coprocess.MiniRequestObject` is the main request data structure used by rich plugins. It's used for middleware calls and contains important fields like headers, parameters, body and URL. A `MiniRequestObject` is part of a `Coprocess.Object`.

```protobuf
message MiniRequestObject {
   map<string, string> headers = 1;
   map<string, string> set_headers = 2;
   repeated string delete_headers = 3;
   string body = 4;
   string url = 5;
   map<string, string> params = 6;
   map<string, string> add_params = 7;
   map<string, string> extended_params = 8;
   repeated string delete_params = 9;
   ReturnOverrides return_overrides = 10;
   string method = 11;
   string request_uri = 12;
   string scheme = 13;
   bytes raw_body = 14;
}
```

### Field Descriptions

`headers`
A read-only field for reading headers injected by previous middleware. Modifying this field won't alter the request headers See `set_headers` and `delete_headers` for this.

`set_headers`
This field appends the given headers (keys and values) to the request.

`delete_headers`
This field contains an array of header names to be removed from the request.

`body`
Contains the request body. See `ReturnOverrides` for response body modifications.

`raw_body`
Contains the raw request body (bytes).

`url`
The request URL.

`params`
A read-only field that contains the request params. Modifying this value won't affect the request params.

`add_params`
Add paramaters to the request.

`delete_params`
This field contains an array of parameter keys to be removed from the request.

`return_overrides`
See `ReturnOverrides` for more information.

`method`
The request method, e.g. GET, POST, etc.

`request_uri`
Raw unprocessed URL which includes query string and fragments.

`scheme`
Contains the URL scheme, e.g. `http`, `https`.

## Object (coprocess_object.proto) {#object}

The `Coprocess.Object` data structure wraps a `Coprocess.MiniRequestObject` and `Coprocess.ResponseObject` It contains additional fields that are useful for users that implement their own request dispatchers, like the middleware hook type and name.
It also includes the session state object (`SessionState`), which holds information about the current key/user that's used for authentication.

```protobuf
message Object {
  HookType hook_type = 1;
  string hook_name = 2;
  MiniRequestObject request = 3;
  SessionState session = 4;
  map<string, string> metadata = 5;
  map<string, string> spec = 6;
  ResponseObject response = 7;
}
```

### Field Descriptions

`hook_type`
Contains the middleware hook type: pre, post, custom auth.

`hook_name`
Contains the hook name.

`request`
Contains the request object, see `MiniRequestObject` for more details.

`session`
Contains the session object, see `SessionState` for more details.

`metadata`
Contains the metadata. This is a dynamic field.

`spec`
Contains information about API definition, including `APIID`, `OrgID` and `config_data`.

`response`
Contains information populated from the upstream HTTP response data, for response hooks. See [ResponseObject](#responseobject-coprocess_response_objectproto) for more details. All the field contents can be modified.


## ReturnOverrides (coprocess_return_overrides.proto)

The `ReturnOverrides` object, when returned as part of a `Coprocess.Object`, overrides the response of a given HTTP request. It also stops the request flow and the HTTP request isn't passed upstream. The fields specified in the `ReturnOverrides` object are used as the HTTP response.
A sample usage for `ReturnOverrides` is when a rich plugin needs to return a custom error to the user.

```protobuf
syntax = "proto3";

package coprocess;

message ReturnOverrides {
  int32 response_code = 1;
  string response_error = 2;
  map<string, string> headers = 3;
  bool override_error = 4;
  string response_body = 5;
}
```

### Field Descriptions

`response_code`
This field overrides the HTTP response code and can be used for error codes (403, 500, etc.) or for overriding the response.

`response_error`
This field overrides the HTTP response body.

`headers`
This field overrides response HTTP headers.

`override_error`
This setting provides enhanced customization for returning custom errors. It should be utilised alongside `response_body` for optimal effect.

`response_body`
This field serves as an alias for `response_erro`r and holds the HTTP response body.


## SessionState (coprocess_session_state.proto) {#session-state}

A `SessionState` data structure is created for every authenticated request and stored in Redis. It's used to track the activity of a given key in different ways, mainly by the built-in Tyk middleware like the quota middleware or the rate limiter.
A rich plugin can create a `SessionState` object and store it in the same way built-in authentication mechanisms do. This is what a custom authentication middleware does. This is also part of a `Coprocess.Object`.
Returning a null session object from a custom authentication middleware is considered a failed authentication and the appropriate HTTP 403 error is returned by the gateway (this is the default behaviour) and can be overridden by using `ReturnOverrides`.

### Field Descriptions

`last_check`
No longer used.

`allowance`
No longer in use, should be the same as `rate`.

`rate` 
The number of requests that are allowed in the specified rate limiting window.

`per`
The number of seconds that the rate window should encompass.

`expires`
An epoch that defines when the key should expire.

`quota_max`
The maximum number of requests allowed during the quota period.

`quota_renews`
An epoch that defines when the quota renews.

`quota_remaining`
Indicates the remaining number of requests within the user's quota, which is independent of the rate limit.

`quota_renewal_rate`
The time in seconds during which the quota is valid. So for 1000 requests per hour, this value would be 3600 while `quota_max` and `quota_remaining` would be 1000.

`access_rights`
Defined as a `map<string, APIDefinition>` instance, that maps the session's API ID to an [AccessDefinition](#access-definition). The AccessDefinition defines the [access rights]({{< ref "security/security-policies/secure-apis-method-path#setting-granular-paths-on-a-per-key-basis" >}}) for the API in terms of allowed: versions and URLs(endpoints). Each URL (endpoint) has a list of allowed methods. For further details consult the tutorials for how to create a [security policy]({{< ref "getting-started/create-security-policy" >}}) for Tyk Cloud, Tyk Self Managed and Tyk OSS platforms.

`org_id`
The organisation this user belongs to. This can be used in conjunction with the org_id setting in the API Definition object to have tokens "owned" by organisations.

`oauth_client_id`
This is set by Tyk if the token is generated by an OAuth client during an OAuth authorisation flow.

`basic_auth_data`
This section contains a hashed representation of the basic auth password and the hashing method used.
For further details see [BasicAuthData](#basicauthdata-coprocess_session_stateproto).

`jwt_data`
Added to sessions where a Tyk key (embedding a shared secret) is used as the public key for signing the JWT. The JWT token's KID header value references the ID of a Tyk key. See [JWTData](#jwtdata-session_stateproto) for an example.

`hmac_enabled`
When set to `true` this indicates generation of a [HMAC signature]({{< ref "basic-config-and-security/security/authentication-authorization/hmac-signatures#a-sample-signature-generation-snippet" >}}) using the secret provided in `hmac_secret`. If the generated signature matches the signature provided in the *Authorization* header then authentication of the request has passed.

`hmac_secret`
The value of the HMAC shared secret.

`is_inactive`
Set this value to true to deny access.

`apply_policy_id`
The policy ID that is bound to this token.

{{< note success >}}
**Note**  

Although `apply_policy_id` is still supported, it is now deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **[Multiple Policy]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies#a-name-multiple-a-multiple-policies" >}})** feature introduced in the  **v2.4 - 1.4** release.
{{< /note >}}

`data_expires`
A value, in seconds, that defines when data generated by this token expires in the analytics DB (must be using Pro edition and MongoDB).

`monitor`
Defines a [quota monitor]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) containing a list of percentage threshold limits in descending order. These limits determine when webhook notifications are triggered for API users or an organisation. Each threshold represents a percentage of the quota that, when reached, triggers a notification. See [Monitor](#monitor) for further details and an example.

`enable_detailed_recording`
Set this value to true to have Tyk store the inbound request and outbound response data in HTTP Wire format as part of the analytics data.

`metadata`
Metadata to be included as part of the session. This is a key/value string map that can be used in other middleware such as transforms and header injection to embed user-specific data into a request, or alternatively to query the providence of a key.

`tags`
Tags are embedded into analytics data when the request completes. If a policy has tags, those tags will supersede the ones carried by the token (they will be overwritten).

`alias`
As of v2.1, an Alias offers a way to identify a token in a more human-readable manner, add an Alias to a token in order to have the data transferred into Analytics later on so you can track both hashed and un-hashed tokens to a meaningful identifier that doesn't expose the security of the underlying token.

`last_updated`
A UNIX timestamp that represents the time the session was last updated. Applicable to *Post*, *PostAuth* and *Response* plugins. When developing *CustomAuth* plugins this should also be added to the SessionState instance.

`id_extractor_deadline`
This is a UNIX timestamp that signifies when a cached key or ID will expire. This relates to custom authentication, where authenticated keys can be cached to save repeated requests to the gRPC server. See [id_extractor]({{< ref "plugins/plugin-types/auth-plugins/id-extractor" >}}) and [Auth Plugins]({{< ref "plugins/plugin-types/auth-plugins/auth-plugins" >}}) for additional information.

`session_lifetime`
UNIX timestamp that denotes when the key will automatically expire. Any·subsequent API request made using the key will be rejected. Overrides the global session lifetime. See [Key Expiry and Deletion]({{< ref "basic-config-and-security/security/authentication-authorization/physical-key-expiry" >}}) for more information.


## AccessDefinition (coprocess_session_state.proto) {#access-definition}

```protobuf
message AccessDefinition {
  string api_name = 1;
  string api_id = 2;
  repeated string versions = 3;
  repeated AccessSpec allowed_urls = 4;
}
```

Defined as an attribute within a [SessionState](#session-state) instance. Contains the allowed versions and URLs (endpoints) for the API that the session request relates to. Each URL (endpoint) specifies an associated list of allowed methods. See also [AccessSpec](#access-spec).

### Field Descriptions

`api_name`
The name of the API that the session request relates to.

`api_id`
The ID of the API that the session request relates to.

`versions`
List of allowed API versions, e.g.  `"versions": [ "Default" ]`.

`allowed_urls` List of [AccessSpec](#access-spec) instances. Each instance defines a URL (endpoint) with an associated allowed list of methods. If all URLs (endpoints) are allowed then the attribute is not set.


## AccessSpec (coprocess_session_state.proto) {#access-spec}

Defines an API's URL (endpoint) and associated list of allowed methods

```protobuf
message AccessSpec {
  string url = 1;
  repeated string methods = 2;
}
```

### Field Descriptions 

`url`
A URL (endpoint) belonging to the API associated with the request session.

`methods`
List of allowed methods for the URL (endpoint), e.g. `"methods": [ "GET". "POST", "PUT", "PATCH" ]`.


## ResponseObject (coprocess_response_object.proto)

The `ResponseObject` exists within an [object](#object-coprocess_objectproto) for response hooks. The fields are populated with the upstream HTTP response data. All the field contents can be modified.

```protobuf
syntax = "proto3";

package coprocess;

message ResponseObject {
  int32 status_code = 1;
  bytes raw_body = 2;
  string body = 3;
  map<string, string> headers = 4;
  repeated Header multivalue_headers = 5;
}

message Header {
  string key = 1;
  repeated string values = 2;
}
```

### Field Descriptions

`status_code`
This field indicates the HTTP status code that was sent by the upstream.

`raw_body`
This field contains the HTTP response body (bytes). It's always populated.

`body`
This field contains the HTTP response body in string format. It's not populated if the `raw_body` contains invalid UTF-8 characters.

`headers`
A map that contains the headers sent by the upstream.

`multivalue_headers`
A list of headers, each header in this list is a structure that consists of two parts: a key and its corresponding values.
The key is a string that denotes the name of the header, the values are a list of strings that hold the content of the header, this is useful when the header has multiple associated values.
This field is available for Go, Python and Ruby since tyk v5.0.4 and  5.1.1+.


## BasicAuthData (coprocess_session_state.proto)

The `BasicAuthData` contains a hashed password and the name of the hashing algorithm used. This is represented by the `basic_auth_data` attribute in [SessionState](#session-state) message.

```yaml
"basicAuthData": {
    "password": <a_hashed_password_presentation>,
    "hash": <the_hashing_algorithm_used_to_hash_the_password>
}
```

### Field Descriptions

`password`
A hashed password.

`hash`
Name of the [hashing algorithm]({{< ref "basic-config-and-security/security/key-hashing" >}}) used to hash the password.


## JWTData (coprocess_session_state.proto)

Added to [sessions](#sessionstate-session_stateproto) where a Tyk key (embedding a shared secret) is used as the public key for signing the JWT. This message contains the shared secret.

```yaml
"jwtData": {
  "secret": "the_secret"
}
```

### Field Descriptions

`secret`
The shared secret.


## Monitor (coprocess_session_state.proto) {#monitor}
Added to a [session](#session-state) when [monitor quota thresholds]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) are defined within the Tyk key. This message contains the quota percentage threshold limits, defined in descending order, that trigger webhook notification.

```yaml
message Monitor {
  repeated double trigger_limits = 1;
}
```

### Field Descriptions

`trigger_limits`
List of trigger limits defined in descending order. Each limit represents the percentage of the quota that must be reached in order for the webhook notification to be triggered.

```yaml
"monitor": {
  "trigger_limits": [80.0, 60.0, 50.0]
}
```

