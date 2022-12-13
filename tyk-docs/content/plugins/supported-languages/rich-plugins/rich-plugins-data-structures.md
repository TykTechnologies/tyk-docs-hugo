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

## Introduction

This page describes the data structures used by Tyk rich plugins, and is used in the following plugin drivers:

*   Python (built-in)
*   Lua (built-in)
*   gRPC (external, compatible with any supported [gRPC language](https://grpc.io/docs/))


We keep our stable Protocol Buffer definitions in the following GitHub repository:
[https://github.com/TykTechnologies/tyk-protobuf/proto](https://github.com/TykTechnologies/tyk-protobuf/tree/master/proto).
This is intended for users to generate their own bindings using the appropriate gRPC tools for the language used.

### MiniRequestObject (coprocess_mini_request_object.proto)

The `Coprocess.MiniRequestObject` is the main request data structure used by rich plugins. It's used for middleware calls and contains important fields like headers, parameters, body and URL. A `MiniRequestObject` is part of a `Coprocess.Object`.

```{.copyWrapper}
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

#### Field Descriptions

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

### Object (coprocess_object.proto)

The `Coprocess.Object` data structure data structure wraps a `Coprocess.MiniRequestObject` It contains additional fields that are useful for users that implement their own request dispatchers, like the middleware hook type and name.
It also includes the session state object (`SessionState`), which holds information about the current key/user that's used for authentication.

```{.copyWrapper}
message Object {
 HookType hook_type = 1;

 string hook_name = 2;

 MiniRequestObject request = 3;

 SessionState session = 4;

 map<string, string> metadata = 5;

 map<string, string> spec = 6;
}
```

#### Field Descriptions

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

### ReturnOverrides (coprocess_return_overrides.proto)

The `ReturnOverrides` object, when returned as part of a `Coprocess.Object`, overrides the response of a given HTTP request. It also stops the request flow and the HTTP request isn't passed upstream. The fields specified in the `ReturnOverrides` object are used as the HTTP response.
A sample usage for `ReturnOverrides` is when a rich plugin needs to return a custom error to the user.

```{.copyWrapper}
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

#### Field Descriptions

`response_code`
This field overrides the HTTP response code and can be used for error codes (403, 500, etc.) or for overriding the response.

`response_error`
This field overrides the HTTP response body.

`headers`
This field overrides response HTTP headers.

`override_error`
This field allows higher customisation when returning custom errors. Should be used in combination with `response_body`.

`response_body`
This field is the alias for `response_error`. Contains the HTTP response body.


### SessionState (session_state.proto)

A `SessionState` data structure is created for every authenticated request and stored in Redis. It's used to track the activity of a given key in different ways, mainly by the built-in Tyk middleware like the quota middleware or the rate limiter.
A rich plugin is able to create a `SessionState` object and store it in the same way built-in authentication mechanisms do. This is what a custom authentication middleware does. This is also part of a `Coprocess.Object`.
Returning a null session object from a custom authentication middleware is considered a failed authentication and the appropriate HTTP 403 error is returned by the gateway (this is the default behaviour) and can be overridden by using `ReturnOverrides`.

`last_check`
No longer used.

`allowance`
No longer used, should be the same as `rate`.

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
The number of requests remaining for this user's quota (unrelated to rate limit).

`quota_renewal_rate`
The time in seconds during which the quota is valid. So for 1000 requests per hour, this value would be 3600 while `quota_max` and `quota_remaining` would be 1000.

`access_rights`
Access rights can be defined either by the Dashboard or via an API, depending on the version of Tyk you are using. See our [Tutorials]({{< ref "getting-started/installation" >}}) section for  for more details.

`org_id`
The organisation this user belongs to. This can be used in conjunction with the org_id setting in the API Definition object to have tokens "owned" by organisations.

`oauth_client_id`
This is set by Tyk if the token is generated by an OAuth client during an OAuth authorisation flow.

`basic_auth_data`
This section defines the basic auth password and hashing method.

`jwt_data`
This section contains a JWT shared secret if the ID matches a JWT ID.

`hmac_enabled`
If this token belongs to an HMAC user, this will set the token as a valid HMAC provider.

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
Rate monitor trigger settings, defined elsewhere in the documentation.

`metadata`
Meta data to be included as part of the session. This is a key/value string map that can be used in other middleware such as transforms and header injection to embed user-specific data into a request, or alternatively to query the providence of a key.

`tags`
Tags are embedded into analytics data when the request completes. If a policy has tags, those tags will supersede the ones carried by the token (they will be overwritten).

`alias`
As of v2.1, an Alias offers a way to identify a token in a more human-readable manner, add an Alias to a token in order to have the data transferred into Analytics later on so you can track both hashed and un-hashed tokens to a meaningful identifier that doesn't expose the security of the underlying token.

`id_extractor_deadline`
See [Auth Plugins]({{ ref "plugins/auth-plugins" >}}) for additional information.

`session_lifetime`
Overrides the global session lifetime, see [Physical Token Expiry]({{< ref "basic-config-and-security/security/authentication-authorization/physical-key-expiry" >}}) for additional information.

### ResponseObject (coprocess_response_object.proto)

The `ResponseObject` is used by response hooks, the fields are populated with the upstream HTTP response data.
All the field contents can be modified.

```{.copyWrapper}
syntax = "proto3";

package coprocess;

message ResponseObject {
  int32 status_code = 1;
  bytes raw_body = 2;
  string body = 3;
  map<string, string> headers = 4;
}
```

#### Field Descriptions

`status_code`
This fields indicates the HTTP status code that was sent by the upstream.

`raw_body`
This field contains the HTTP response body (bytes). It's always populated.

`body`
This field contains the HTTP response body in string format. It's not populated if the `raw_body` contains invalid UTF-8 characters.

`headers`
A map that contains the headers sent by the upstream.
