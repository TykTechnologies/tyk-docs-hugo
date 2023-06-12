---
title: "Plugin Types"
menu:
  main:
    parent: "Custom Plugins"
weight: 10
---

Custom Plugin is a code users care write to exceute a certain task that is specific for them or their use case and that is not part of the middleware options, that Tyk provides out-of-the-box. Tyk has a [pre-defined execution order]({{< ref "/concepts/middleware-execution-order" >}}) for the middleware which also includes 7 hooks for the custom plugins. As such users can "hook" their plugin for execution in these phases of the API request lifecycle and the phase to add it to depends on your specific use case.

## Plugin and hook types
This table includes all the plugin types with the relevant hooks, place in the execution, description and examples:

| Hook Type (in their execution order) | Plugin Type | HTTP Request/Responst phase | Executred before/After reverse proxy to the upstream API | Details | Common Use Cases |  
|--------------------------|----|---|--------------|--------------------|---------
| Pre (Request) | Request Plugin |  HTTP request | Before | The first thing to be executed, before any middleware.  | IP Rate Limit plugins,  API Request enrichment      |
| Authentication| Authnetication Plugin |  HTTP request | Before | Replaces Tyk's authentication & authorization middleware with your own business logic |  When you need your a custom flow, for example, interfacing with legacy Auth database |
| Post-Auth (Request)| Authnetication Plugin |  HTTP request | Before | Executed immediately after authentication middleware  | Additional special custom authentication is needed |
| Post (Request)| Request Plugin  |  HTTP request| Before | The final middleware to be executed during the *HTTP request* phase  | Update the request before it gots to the upstream, for example, adding a header that might override another header, so we add it at the end to ensure it doesn't get overriden |
| Response Plugin| Response Plugin |  HTTP Response | After | executed after the reverse proxy to the upstream API | Executed straight after the reverse proxy returns from the upstream API to Tyk  |  Change the response before the user gets it, for example, change `Location` header from internal to an extenal URL |
| Analytics Plugin (Request+Response)| Analytics Plugin | HTTP request | After | The final middleware to be executed during the *HTTP response* phase  | Change analytics records, for example, obfuscating sensitive data such as the `Authorization` header |
