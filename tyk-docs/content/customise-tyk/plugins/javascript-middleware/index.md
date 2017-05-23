---
date: 2017-03-24T14:45:20Z
title: Javascript Middleware
menu:
  main:
    parent: "Plugins"
weight: 3
url: "/customise-tyk/plugins/javascript-middleware"
---

## Customise JS Middleware Overview

There are two types of customisations that can be scripted with Tyk:

1.  **Middleware components**: These execute either *pre* or *post* validation. A *pre* middleware component will execute before any session validation or token validation has taken place, while a *post* middleware component will execute after the request has been passed through all checks and is ready to be proxied upstream.

2.  **Dynamic event handlers**: These components fire on certain API events (see the event handlers section), these are fired Async and do not have a cooldown timer. These are documented [here][1].

All customisations have access to a limited system API (for access to resources outside of the JavaScript Virtual Machine sandbox), however the contexts of each plugin are different and have different constraints, this API gives access to the ability to make outbound HTTP requests as well as access to the key management REST API functions.

Middleware components receive extra data (depending on their context), but all have the capability to modify the request and the session object if it has been made available to the plugin. Usage of the Session object in a middleware component is expensive as the object needs to be retrieved, and de/re-encoded multiple times as it passes through the system.

 [1]: /report-monitor-trigger-events/configure-webhooks-api-definition/