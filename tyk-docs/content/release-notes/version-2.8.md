---
title: Tyk Gateway v2.8
menu:
  main:
    parent: "Release Notes"
weight: 9
---

## Looping

You now can configure complex request pipelines, allowing you to specify different actions for the same path, depending 
on defined conditions.

Visit the [looping section]({{< ref "advanced-configuration/transform-traffic/looping" >}}) for more information.

---

## Debugger

You can now safely test all API changes without publishing them, and visually see the whole request flow, including which plugins are running and even their individual logs.

We have added a new `Debugging` tab in the API designer which provides a "Postman" like HTTP client interface to simulate queries for the current API definition being edited.

You can even debug your virtual endpoints by dynamically modifying the code, sending the request via `Debugger` and watching the virtual endpoint plugin logs.

See [Debugging Tab]({{< ref "advanced-configuration/transform-traffic/endpoint-designer/#debugging" >}}) for more information.

---

## Separate rate limits and quotas per API within the same Policy

If you set the `Limits and Quotas per API` flag while configuring a policy, you will be able to configure separate rate limits and quotas per API.  

Note that you can’t mix this functionality with 
[partitioned policies]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies" >}}).

---

## Developer portal oAuth support

The Developer portal now fully supports exposing oAuth2 APIs:

*  Developers can register their oAuth clients and see analytics
*  Administrators can see list of oAuth clients from a developer screen

---

## Multi-organisation users

NOTE: Currently only available with >2 node Dashboard licence.

You can now create users with the same email address in different organisations. Users will then be able to select an organisation 
when logging in, and can easily switch between organisations via the navigation menu. To enable set 
`"enable_multi_org_users": true`.

---

## Request throttling

When hitting quota or rate limits, the Gateway now can now automatically queue and auto-retry client requests. Throttling can be configured at a key or policy level via two new fields: `throttle_interval` and `throttle_retry_limit`. 

1. `throttle_interval`: Interval(seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.

---

## Password policy improvements

* `security.user_password_max_days` Set the maximum lifetime of a password in days for a user. 
  They will be prompted to reset their password if the lifetime exceeds the configured expiry value. 
  e.g. If the value is set to `30` any user password used over 30 days is considered invalid and must be reset.
* `security.enforce_password_history` Set a maximum number of previous passwords used by a user that cannot be reused. 
  e.g. If set to `5` the user cannot reuse any of their 5 most recently used passwords.
* `security.force_first_login_pw_reset` A newly created user will be forced to reset their password on their first login. By default this is set to `false`.

---

## Developer management improvements
* You can now manually create developer subscriptions from the developer screen.
* We've added a quick way to change a subscription policy and reset a quota
* All actions on the developer screen now only require developer permissions 

---

## Key hashing improvements

You can now update keys by only having its hash. This is controlled via the `enable_update_key_by_hash` dashboard configuration variable.


## Ability to publish keyless APIs to the developer portal

You can now add open (keyless) APIs to the developer portal. You have the same functionality as for closed APIs, except for key generation, which is disabled.

---

## Dynamic Portal Customisation

Portal templates now have access to the Developer object, its subscriptions, and issued key metadata, providing the ability to conditionally show or hide content inside the Portal based on the attributes below:

The Current logged in Developer can be accessed using the `.Profile` variable with the following fields:

* `Id` - Internal developer ID
* `Email` - Developer email
* `OrgID` - Tyk Organisation ID
* `Subscriptions`  - A map containing subscriptions where the key is a policy ID and the value is an API key
* `Fields` - A map containing custom developer fields
* `OauthClients` - A map containing list of registered oAuth clients, where the key is the policy ID.

The Current logged in Developer detailed subscription object can be accessed using the `.APIS` variable, containing a map, where the key is a policy ID and the values are in the following format: 

* `APIDescription` - API definition
    * `ID` - Internal API id
    * `Name` - API name
    * More fields: https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L320
* `APIKey` - API key
* `PolicyData` - Policy object
    * `ID` - Internal Policy ID
    * `Name` - Policy Name
    * More fields: https://github.com/TykTechnologies/tyk/blob/master/user/policy.go#L5
* `KeyMetaData` - Key metadata of the specified map type

### Example

You have different teams of developers, and for each team we want to show them a different list of APIs. 
In this case, for each developer, we need to set a custom `Team` field, and add it to a template like this:

```
{{if eq .Profile.Fields.Team `internal`}}
    … Display internal set of APIs …
{{end}}
{{if eq .Profile.Fields.Team `public`}}
    … Display public set of APIs …
{{end}}
```

Similar functionality based on Key metadata can look like this:

```
{{range $pol, $subscription := .Data.APIS}}}}
   {{if eq $subscription.APIDescription.Name `test` }}
     {{if eq $subscription.KeyMetaData.Vip `1`}}
     …Show extended documentation for users having subscription with `vip` meta tag in token…
     {{end}}
   {{end}}
{{end}}
```

---

## Custom analytics storage engines for Multi-Cloud & Enterprise MDCB users

Multi-Cloud & Enterprise MDCB installations can now leverage the power of the Tyk Pump and send analytics to custom sources like ElasticSearch or InfluxDB from within their local Data Centers. 

This allows you disable sending the Tyk Gateway analytics to the Multi-Cloud / Master layer from the Gateway itself, allowing the Tyk Pump process to take care of it.

In order to do that, you need to: 

* Install Tyk Pump, with a `hybrid` pump section with the following configuration:

```
"hybrid": {
  "name": "hybrid",
  "meta": {
    "rpc_key": `<org-id>`,
    "api_key": `<api-key>`,
    "connection_string": `hybrid.cloud.tyk.io:9091`,
    "use_ssl": true,
    "ssl_insecure_skip_verify": false,
    "group_id": "",
    "call_timeout": 30,
    "ping_timeout": 60,
    "rpc_pool_size": 30
  }
}
```

* Enable Tyk Pump in the Tyk Gateway configuration, by changing `analytics_config.type` from `rpc` to an empty value.

Now you can add additional pumps to the Tyk Pump config.

---

## Dashboard Audit Log improvements

There is a new section in the Tyk Dashboard config file where you can specify parameters for the audit log (containing audit records for all requests made to all endpoints under the `/api` route).

```
  ...
  "audit": {
    "enabled": true,
    "format": "json",
    "path": "/tmp/audit.log",
    "detailed_recording": false
  },
  ...
```

- `enabled` - enables audit logging, set to `false` by default. NOTE: setting `security.audit_log_path` has the same effect as setting `enabled` to `true`
- `format` - specifies the format of audit log file. Possible values are `json` and `text` (`text` is default value)
- `path` - specifies path to the audit log and overwrites `security.audit_log_path` if it was set
- `detailed_recording` - enables detailed records in the audit log. Set to `false` by default. If set to `true` then audit log records will contain the http-request (without body) and full http-response including the body`

Audit records the following fields for `json` format:

 *   `req_id` - unique request ID
 *   `org_id` - organisation ID
 *   `date` - date in `RFC1123` format
 *   `timestamp` - unix timestamp
 *   `ip` - IP address the request originated from
 *   `user` - Dashboard user who performed the request
 *   `action` - description of the action performed (`i.e. `Update User`)
 *   `method` - HTTP-method of the request
 *   `url` - URL of the request
 *   `status` - HTTP response status of the request
 *   `diff` - provides a diff of changed fields (available only for PUT requests)
 *   `request_dump` - HTTP request copy (available if `detailed_recording` is set to `true`)
 *   `response_dump` - HTTP response copy (available if `detailed_recording` is set to `true`)
 
 If you specify `text` format - all fields are in plain text separated with a new line and provided in the same order as for `json` format.

---

## Plugin bundler CLI tools now built-in to Tyk binary

Previously you had to use a separate `tyk-cli` binary to build bundles. 
The build command remains the same, but instead of using `tyk-cli bundle` you now use `tyk bundle`.

---

## Basic Auth - Extract Credentials from Body

It is now possible to extract BasicAuth credentials from the request body. This is particularly useful in SOAP requests.

```text
<soapenv:Envelope
  ...
  <soapenv:Header>
    <aut:AuthenticationHeader>
      <aut:User>prova1234</aut:User>
      <aut:Pass>prova1234</aut:Pass>
    </aut:AuthenticationHeader>
  ...
```

You can modify your API definition to let Tyk know how to get the credentials:

```
...
"basic_auth": {
  "extract_from_body": true,
  "body_user_regexp": "<aut:User>(.*)</aut:User>",
  "body_password_regexp": "<aut:Pass>(.*)</aut:Pass>"
},
...
```

---

## Insecure Skip Verify on a per API basis

Previously, it was possible to get Tyk Gateway to skip TLS verification globally (for ALL apis), but it was not possible to enable this on a per API basis. This meant that it was not previously possible to use self-signed certificates for some APIs, and actual certs for others.
  
It is now possible to control which APIs use skip secure verification as follows within the API Definition object:

`api_definition.proxy.transport.ssl_insecure_skip_verify: bool` - Defaults to `false`.

Tyk's JSVM `TykMakeHttpRequest` function will also respect the above configuration value.

---

## Detailed changelog

### Tyk Gateway 2.8.0
- URL rewrite advanced rules extended with looping support, allowing you to build complex request pipelines.
- Added an Admin Debugger API 
- SSL verification now can be disabled at the API level in addition to the global level, using the new `proxy.transport.ssl_insecure_skip_verify` boolean variable.
- You can rename the default `/hello` healthcheck endpoint using the new gateway `health_check_endpoint_name` string variable. 
- Basic auth plugin now can extract credentials from the request body
- Bundler CLI tools now built in to the Tyk binary
- Allow updating keys by hash

### Tyk Dashboard 1.8.0

- Added API Debugger tab to the API Designer.
- Extended the Portal templating functionality.
- Similar to the Gateway, you now can specify a list of acceptable TLS ciphers using the  
  `http_server_options.cipher_suites` array option.
- Audit log improvements
- Exposing oAuth2 APIs to developer portal
- Allow for the retrieval of an API via it's external API
- Allow updating keys by hash
- Added support for `SMTP` noauth.

### Tyk Pump 0.6

- Added `hybrid` pump configuration, allowing Multi-Cloud users to use custom storage engines for analytics.
