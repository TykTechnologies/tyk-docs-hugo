---
title: Tyk Gateway v2.8 and more
menu:
  main:
    parent: "Release Notes"
weight: 1
---

# Looping

You now can configure complex request pipelines, allowing you to specify different actions for the same path, depending on defined conditions. During URL rewrites, instead of rewriting to some HTTP endpoint, you now can tell Tyk to internally run its request pipeline one more time, but for another specified endpoint. In Tyk terms it called a “looping” or adding a “loop”.  In order to specify a “loop”, in target url, you should specify string of the following format: “tyk://self/<path>”

Combined with advanced URL rewriter rules, it can be turned into a powerful logical block, replacing need for writing middleware or virtual endpoints in lot of the cases.

For example, you have an endpoint, which should do different logic depending on specific header. In our case, for simplicity, it can be “/get” endpoint which by default returns XML and if `Content-Type` equals to `application/json` it returns JSON response. With new looping functionality you will need to define 2 endpoints: 
* /get - endpoint which user hit, and which contains our logical block
* /get-json - internal endpoint, where you will loop to, if condition is met. Contains a body transform logic to rewrite XML response to JSON.

Inside `/get` endpoint you add URL rewrite plugin, with advanced rule, which looks if `Content-Type` header equals `application/json`, and rewrites to “tyk://self/get-json” URL. We are done.

Another example will be conditionally processing SOAP requests based on content of the POST body. So you can define individual request pipeline for each SOAP request, based on conditions defined in URL rewriter rules. 

# Debugger

Now you can safely test all API changes, without publishing them, and visually see whole request flow, including which plugins get running and event their individual logs.

We added a new API designer tab called “Debugging”,  which provides “postman” like interface to simulate HTTP queries for the currently editing API definition. 

You can even debug your virtual endpoints, by dynamically modifying the code, sending request via “Debugger” and watching for virtual endpoint plugin logs.

# Separate rate limits and quotas per API withing same Policy

If you set “Limits and Quotas per API” flag while configuring policy,  you will be able to configure separate rate limits and quotas per API. 

Note that if you can’t mix this functionality with partitioned policies.

# Ability to publish keyless APIs to the portal

Now you finally can have the same Portal experience for your open APIs. All the functionality will work the same, except key generation, which is disabled.
 

# Dynamic Portal customization

Portal templates now have access to Developer object, its subscriptions, and issued keys metadata, which gives you ability to conditionally show or hide content inside the Portal, based on attributes mentioned above.

Currently logged Developer can be accessed using `.Profile` variable with the following fields:
* Id - Internal developer ID
* Email - Developer email
* OrgID - Tyk Organization ID
* Subscriptions  - Map containing subscriptions where key is a policy ID and value is an API key
* Fields - Map containing custom developer fields
* OauthClients - Map containing list of registered oAuth clients, where Key is the policy ID.

Currently logged Developer detailed subscription object can be accessed using `.APIS` variable, containing map, where key is PolicyID and value of the following format: 
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


For example we have different team of developers, and for each team we want to show them different list of APIs. In this case, for each developer, we need to can set custom  “team” field, and assert it in template like this:
```
{{if .Profile.Fields.Team == “internal”}}
… Display internal APIs …
{{end}}
{{if .Profile.Fields.Team == “public”}}
… Display public set of APIs …
{{end}}
```

Similar functionality based on Key meta can look like:
```
{{range $pol, $subscription := .Data.APIS}}}}
   {{if eq $subscription.APIDescription.Name “test” }}
     {{if eq $subscription.KeyMetaData.Vip “1”}}
     …Show extended documentation for users having subscription with “vip” meta tag in token…
     {{end}}
   {{end}}
{{end}}
```


### Custom analytic storage engines for Hybrid users

Hybrid users now can leverage power of Tyk Pump and send analytic to custom sources like ElasticSearch or InfluxDB. 

The main idea that you disable sending Gateway analytic to Hybrid layer by Gateway itself, and by doing so, allow Tyk Pump process to take care of it.

In order to do that, you need to 

1. Install Tyk Pump, with “hybrid” pump with the following configuration:
      ```
       "hybrid": {
            "name": "hybrid",
            "meta": {
                "rpc_key": “<org-id>“,
                "api_key": “<api-key>”,
                "connection_string": “hybrid.cloud.tyk.io:9091”,
                "use_ssl": true,
                "ssl_insecure_skip_verify": false,
                "group_id": "",
                "call_timeout": 30,
                "ping_timeout": 60,
                "rpc_pool_size": 30
            }
        }```

     2. Enable Tyk Pump in Gateway configuration, by changing “analytics_config.type” from “rpc” to empty value.

Now you can add additional pumps to Tyk pump config.


### Plugin bundler CLI tools now built-in to Tyk binary

Previously you had to use separate `tyk-cli` binary to build. 
Command Behavior stayed the same, just instead of `tyk-cli bundle` you now should use `tyk bundle`.


### Detailed changelog

Tyk Gateway 2.8.0
- URL rewrite advanced rules extended with looping support, allowing you to build complex request pipelines. See above
- Added Admin Debugger API 
- SSL verification now can be disabled on API level, rather then on global level, using new `proxy.transport.ssl_insecure_skip_verify` boolean variable. 
- Now you can rename default “/hello” healthcheck endpoint using new gateway `health_check_endpoint_name` string variable. 
- Bundler CLI tools now builtin to Tyk binary

Tyk Dashboard 1.8.0
- Added API Debugger. See above.
- Extented Portal templating functionality
- Similar to Gateway, you now can whitelist list of acceptable TLS ciphers using `http_server_options.cipher_suites` array option. 
- Countless UX and performance improvements

Tyk Pump 0.6
- Added “hybrid” pump, allowing hybrid users to use custom storage engines for analytics. See above.
