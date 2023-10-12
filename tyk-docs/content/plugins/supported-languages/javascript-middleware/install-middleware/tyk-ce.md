---
date: 2017-03-24T15:38:11Z
title: Install Middleware on Tyk Community Edition
menu:
  main:
    parent: "Install Middleware"
weight: 0 
aliases:
  - /plugins/javascript-middleware/install-middleware/tyk-ce
---

In order to activate middleware in a Tyk Community Edition edition or when using a file-based setup, the middleware needs to be registered as part of your API Definition. Registration of middleware components is relatively simple.
{{< note success >}}
**Note**  

It is important that your object names are unique.
{{< /note >}}{{< note success >}}
**Note**  

This functionality may change in subsequent releases.
{{< /note >}}

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.

Adding the middleware plugin is as simple as adding it to your definition file in the middleware sections:

```{.copyWrapper}
// sample_api.conf

...
"event_handlers": {},
"custom_middleware": {
  "pre": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ],
  "post": [
    {
      "name": "sampleMiddleware",
      "path": "middleware/sample.js",
      "require_session": false
    }
  ]
},
"enable_batch_request_support": false,
...
```

As you can see, the parameters are all dynamic, so you will need to ensure that the path to your middleware is correct. The configuration sections are as follows:

*   `pre`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *before* any authentication information is extracted from the header or parameter list of the request. Use middleware in this section to pre-process a request before feeding it through the Tyk middleware.

*   `pre[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:
    
    `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

*   `pre[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

*   `pre[].require_session`: Irrelevant for pre-processor middleware, since no auth data has been extracted by the authentication middleware, it cannot be made available to the middleware.

*   `post`: Defines a list of custom middleware objects to run *in order* from top to bottom. That will be executed *after* the authentication, validation, throttling, and quota-limiting middleware has been executed, just before the request is proxied upstream. Use middleware in this section to post-process a request before sending it to your upstream API.

*   `post[].name`: The name of the middleware object to call. This is case sensitive, and **must** match the name of the middleware object that was created, so in our example - we created `sampleMiddleware` by calling:
    
    `var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});`

*   `post[].path`: The path to the middleware component, this will be loaded into the JSVM when the API is initialised. This means that if you reload an API configuration, the middleware will also be re-loaded. You can hot-swap middleware on reload with no service interruption.

*   `post[].require_session`: Defaults to `false`, if you require access to the session object, it will be supplied as a `session` variable to your middleware processor function.