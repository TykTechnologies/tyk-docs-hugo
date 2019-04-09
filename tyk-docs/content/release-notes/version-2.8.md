---
title: Tyk Gateway v2.8 and more
menu:
  main:
    parent: "Release Notes"
weight: 1
---

# Looping

You now can configure complex request pipelines, allowing you to specify different actions for the same path, depending on defined conditions. During URL rewrites, instead of rewriting to some HTTP endpoint, you now can tell Tyk to internally run its request pipeline one more time, but for another specified endpoint. In Tyk terms it called `looping` or adding a `loop`.  In order to specify a `loop`, in the target URL, you should specify string of the following format: `tyk://self/<path>`

Combined with advanced URL rewriter rules, it can be turned into a powerful logical block, replacing the need for writing middleware or virtual endpoints in a lot of cases.

## Example

You have an endpoint, which will perform different logic depending on the specific header. In our case, for simplicity, it can be the `/get` endpoint which by default returns XML and if `Accept` header in request equals to `application/json` it returns JSON response. With the new looping functionality you will need to define 2 endpoints: 
* /get - the endpoint the user hits, and which contains our logical block
* /get-json - the internal endpoint, where you will loop to if the condition is met. It contains a body transform logic to rewrite XML response to JSON.

Inside the `/get` endpoint you add a URL rewrite plugin, with an advanced rule, which looks to see if `Accept` header equals `application/json`, and rewrites it to `tyk://self/get-json` URL. We are done.

Another example will be conditionally processing SOAP requests based on content of the POST body. So you can define individual request pipeline for each SOAP request, based on conditions defined in URL rewriter rules. 

# Debugger

Now you can safely test all API changes, without publishing them, and visually see the whole request flow, including which plugins are running and even their individual logs.

We have added a new API designer tab called `Debugging`,  which provides a `postman` like interface to simulate HTTP queries for the current API definition being edited. 

You can even debug your virtual endpoints, by dynamically modifying the code, sending the request via `Debugger` and watching for the virtual endpoint plugin logs.

# Separate rate limits and quotas per API within the same Policy

If you set the `Limits and Quotas per API` flag while configuring policy,  you will be able to configure separate rate limits and quotas per API. 

Note that you can’t mix this functionality with [partitioned policies](https://tyk.io/docs/security/security-policies/partitioned-policies/).

# Ability to publish keyless APIs to the developer portal

You can now have the same Portal experience for your open APIs. All the functionality works the same, except for key generation, which is disabled.

# Dynamic Portal Customisation

Portal templates now have access to the Developer object, its subscriptions, and issued key meta-data, providing the ability to conditionally show or hide content inside the Portal based on attributes mentioned below.

The Current logged in Developer can be accessed using `.Profile` variable with the following fields:
* Id - Internal developer ID
* Email - Developer email
* OrgID - Tyk Organization ID
* Subscriptions  - Map containing subscriptions where key is a policy ID and value is an API key
* Fields - Map containing custom developer fields
* OauthClients - Map containing list of registered oAuth clients, where Key is the policy ID.

The Current logged in Developer detailed subscription object can be accessed using the `.APIS` variable, containing map, where the key is PolicyID and value of the following format: 
* APIDescription - API definition
    * ID - Internal API id
    * Name - API name
    * More fields: https://github.com/TykTechnologies/tyk/blob/master/apidef/api_definitions.go#L320
* APIKey - API key
* PolicyData - Policy object
    * ID - Internal Policy ID
    * Name - Policy Name
    * More fields: https://github.com/TykTechnologies/tyk/blob/master/user/policy.go#L5
* KeyMetaData - Key meta data of map type

## Example

You have different teams of developers, and for each team we want to show them a different list of APIs. In this case, for each developer, we need to set a custom  `team` field, and assert it in a template like this:
```
{{if eq .Profile.Fields.Team `internal`}}
    … Display internal APIs …
{{end}}
{{if eq .Profile.Fields.Team `public`}}
    … Display public set of APIs …
{{end}}
```

Similar functionality based on Key meta can look like:
```
{{range $pol, $subscription := .Data.APIS}}}}
   {{if eq $subscription.APIDescription.Name `test` }}
     {{if eq $subscription.KeyMetaData.Vip `1`}}
     …Show extended documentation for users having subscription with `vip` meta tag in token…
     {{end}}
   {{end}}
{{end}}
```

### Custom analytic storage engines for Multi-Cloud users

Multi-Cloud users can now leverage the power of Tyk Pump and send analytics to custom sources like ElasticSearch or InfluxDB. 

The main idea is that you disable sending the Tyk Gateway analytics to the Multi-Cloud layer by the Gateway itself, and by doing so, allow the Tyk Pump process to take care of it.

In order to do that, you need to 

1. Install Tyk Pump, with `hybrid` pump with the following configuration:

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

2. Enable Tyk Pump in the Tyk Gateway configuration, by changing `analytics_config.type` from `rpc` to empty value.

Now you can add additional pumps to the Tyk Pump config.

### Retrieval of API by it's external ID

It is now possible to make use of either the internal or external/public ID for requests that need to identify an API. The internal ID is the MongoDB ID which is a BSON object ID while the
external/public ID is the identifier that is also known as `api_id`.

For example, if you are trying to fetch the list of Oauth apps for an API, you can make use of either of the following endpoints:

- Making use of the internal ID: `/api/apis/oauth/5cac7ad816e579140e568c70`
- Making use of the external ID: `/api/apis/oauth/057a4e6941ef48c6672145240a6df1cb`

Note that this extends to any route that requires `api_id` in the path.

### Dashboard Audit Log improvements

There is a new section in dashboard config file where you can specify parameters for audit log (contains audit records for all requests made to all endpoints under `/api` route).

Config example:
```json
  "audit": {
    "enabled": true,
    "format": "json",
    "path": "/tmp/audit.log",
    "detailed_recording": false
  }
```

- `enabled` - enables audit logging, set to `false` by default. NOTE: setting value `security.audit_log_path` has the same effect as setting `enabled` to `true`
- `format` - specifies the format of audit log file, possible values are `json` and `text` (`text` is default value)
- `path` - specifies path to file with audit log, overwrites value `security.audit_log_path` if it was set
- `detailed_recording` - enables detailed records in audit log, by default set to `false`. If set to `true` then audit log records will contain http-request (without body) and full http-response including body`

Audit record fields for `json` format:

 *   `req_id` - unique request ID
 *   `org_id` - organization ID
 *   `date` - date in `RFC1123` format
 *   `timestamp` - unix timestamp
 *   `ip` - IP address the request was originating from
 *   `user` - dashboard user who performed the request
 *   `action` - description of action performed (`i.e. `Update User`)
 *   `method` - HTTP-method of the request
 *   `url` - URL of the request
 *   `status` - HTTP response status of the request
 *   `diff` - provides diff of changed fields (available only for PUT requests)
 *   `request_dump` - HTTP request copy (available if `detailed_recording` is set to `true`)
 *   `response_dump` - HTTP response copy (available if `detailed_recording` is set to `true`)
 
 If you specidy `text` format - all fields are in plain text separated with new line and provided in the same order as fields for `json` format.

### Plugin bundler CLI tools now built-in to Tyk binary

Previously you had to use a separate `tyk-cli` binary to build. 
The Command Behaviour remains the same, but instead of using `tyk-cli bundle` you now use `tyk bundle`.

### Detailed changelog

Tyk Gateway 2.8.0
- URL rewrite advanced rules extended with looping support, allowing you to build complex request pipelines.
- Added Admin Debugger API 
- SSL verification now can be disabled at the API level, in addition to the global level, using the new `proxy.transport.ssl_insecure_skip_verify` boolean variable.
- You can rename the default `/hello` healthcheck endpoint using the new gateway `health_check_endpoint_name` string variable. 
- Bundler CLI tools now built in to the Tyk binary

Tyk Dashboard 1.8.0
- Added API Debugger.
- Extended Portal templating functionality.
- Similar to the Gateway, you now can whitelist a list of acceptable TLS ciphers using the `http_server_options.cipher_suites` array option.
- Numerous UX and performance improvements
- Audit log improvements
- Allow for the retrieval of an API via it's external API

Tyk Pump 0.6
- Added `hybrid` pump, allowing Multi-Cloud users to use custom storage engines for analytics.

# Request Throttling

You can now enable automatic retrying the requests that fail due to rate limiting by setting two variables:

1. `throttle_interval`: Interval(seconds) between each request retry.
2. `throttle_retry_limit`: Total request retry number.
