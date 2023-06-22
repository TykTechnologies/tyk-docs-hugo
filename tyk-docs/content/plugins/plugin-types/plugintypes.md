---
title: "Plugin Types"
menu:
  main:
    parent: "Custom Plugins"
weight: 10
---

Custom Plugins enable users to execute custom code to complete tasks specific to their particular use case. This allows users to complete tasks that would not otherwise be possible using Tyk's standard middleware options. Tyk has a [pre-defined execution order]({{< ref "/concepts/middleware-execution-order" >}}) for the middleware which also includes seven hooks for the custom plugins. As such, users can execute, or "hook", their plugin in these phases of the API request/response lifecycle based on their specific use case.

## Plugin and hook types
This table includes all the plugin types with the relevant hooks, place in the execution, description and examples:

| Hook Type (in their execution order) | Plugin Type | HTTP Request/Response phase | Executed before/after reverse proxy to the upstream API | Details | Common Use Cases |  
|--------------------------|----|---|--------------|--------------------|---------
| Pre (Request) | Request Plugin |  HTTP request | Before | The first thing to be executed, before any middleware  | IP Rate Limit plugins,  API Request enrichment      |
| Authentication| Authentication Plugin |  HTTP request | Before | Replaces Tyk's authentication & authorization middleware with your own business logic |  When you need your a custom flow, for example, interfacing with legacy Auth database |
| Post-Auth (Request)| Authentication Plugin |  HTTP request | Before | Executed immediately after authentication middleware  | Additional special custom authentication is needed |
| Post (Request)| Request Plugin  |  HTTP request| Before | The final middleware to be executed during the *HTTP request* phase  | Update the request before it gets to the upstream, for example, adding a header that might override another header, so we add it at the end to ensure it doesn't get overridden |
| Response Plugin| Response Plugin |  HTTP Response | After | Executed after the reverse proxy to the upstream API | Executed straight after the reverse proxy returns from the upstream API to Tyk  |  Change the response before the user gets it, for example, change `Location` header from internal to an external URL |
| Analytics Plugin (Request+Response)| Analytics Plugin | HTTP request | After | The final middleware to be executed during the *HTTP response* phase  | Change analytics records, for example, obfuscating sensitive data such as the `Authorization` header |
