---
title: "Plugin Types"
menu:
  main:
    parent: "Custom Plugins"
weight: 10
---

Custom Plugins can be added and executed in several different phases of the API request lifecycle, and the correct phase to add it to depends on your use case.

What's a phase?

During an API request lifecycle, there are dozens of "middleware" that can be turned on and evaluated, such as rate limiting, quotas, analytics, authentication, and more.  You can familiarize yourself with them [here][0].


First, let's introduce the different types.

- Request Plugin: executed before the reverse proxy to the upstream API.  There are three sub-types, `pre`, `post`, and `post-auth`
- Authentication Plugin: Replaces Tyk's default auth system with a custom plugin you write
- Response Plugin: executed after the reverse proxy to the upstream API
- Analytics Plugin: executed before the API Analytics record is stored in Redis to be scraped by Tyk Pump


| Plugin Type              | When Executed            |  Common Use Cases     |  
|--------------------------|--------------|--------------------|---------
| Pre (Request) | The first thing to be executed, before any middleware.  | IP Rate Limit plugins,  API Request enrichment      |
| Authentication | Replace Tyk's built in Authentication with your own business logic.  |  Interfacing with legacy Auth database  |
| Post-Auth (Request) | Executed immediately after authentication middleware  | Additional authentication      |
| Post (Request) | The final middleware to be executed during the "request" phase  |       |
| Response | Executed immediately after the reverse proxy is returned from the upstream API to Tyk  |    |
| Analytics Plugin | The final middleware to be executed during the response phase  |  Obfuscating sensitive data   |


[0]:http://localhost:1313/docs/nightly/concepts/middleware-execution-order/