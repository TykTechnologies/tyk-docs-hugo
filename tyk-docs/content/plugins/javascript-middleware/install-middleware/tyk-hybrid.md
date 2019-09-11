---
date: 2017-03-24T15:41:38Z
title: Install Middleware on Tyk Multi-Cloud
menu:
  main:
    parent: "Install Middleware"
weight: 0 
---

In some cases middleware references can't be directly embedded in API Definitions (for example, when using the dashboard in a Multi-Cloud install). However, there is an easy way to distribute and enable custom middleware for an API on a Tyk node.

A second method of loading API Definitions in Tyk nodes is to add them as a directory structure in the Tyk node. Tyk will load the middleware plugins dynamically on host-reload without needing a direct reference to them in the API Definition.

The directory structure looks as follows:

```{.copyWrapper}
middleware
  / {API Id}
    / pre
    / {middlewareObject1Name}.js
    /  {middlewareObject2Name}.js
    / post
      / {middlewareObject1Name}_with_session.js
      / {middlewareObject2Name}.js
```

Tyk will check for a folder that matches the `{API Id}` being loaded, and then load the `pre` and `post` middleware from the respective folders.
 
> **NOTE**:The filename **must** match the object to be loaded exactly.

If your middleware requires session injection, then append `_with_session` to the filename.

### Enable the JSVM

Before you can use Javascript Middleware you will need to enable the JSVM

You can do this by setting `enable_jsvm` to `true` in your `tyk.conf` file.
