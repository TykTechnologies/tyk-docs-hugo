---
date: 2017-03-24T12:42:33Z
title: Custom Handlers (JavaScript)
tags: ["Events", "Custom handlers", "JavaScript"]
description: "How to script custom JavaScript handlers for events with Tyk"
menu:
  main:
    parent: "Report, Monitor and Trigger Events"
weight: 4
url: "/basic-config-and-security/report-monitor-trigger-events/custom-handlers-javascript"
---

## Events: JavaScript Functions

### Overview

It is possible to script your own event handlers for the key Tyk events. You can add these events the same way you add other event handlers (e.g. the webhook), they are executed asynchronously so you don't need to worry about them blocking.

It is important to note that unlike Tyk JSVM middleware, Tyk JSVM event handlers execute in a *global* JavaScript environment, this means that if you have the same event handler name that contains slightly different code across two APIs, only one of them will execute, as the other will be overridden when loaded.

Tyk JSVM event handlers have access to the Tyk JSVM API, which gives access to the session object store, and enables the ability for making HTTP calls outside of the Tyk environment, this is particularly useful if you want to interface with another API with a complex request/response cycle.

### Creating an Event Handler

Creating an event handler is very similar to creating middleware, simply invoke the correct constructors with a closure in the TykJS namespace:

```
// ---- Sample middleware creation by end-user -----
var sampleHandler = new TykJS.TykEventHandlers.NewEventHandler({});

sampleHandler.NewHandler(function(event, context) {
  // You can log to Tyk console output by calling the built-in log() function:
  log("This handler does nothing, but this will appear in your terminal")

  return
});
```

A handler consists of a function that accepts two variables called `event` and `context`. The event object is the same as is used by other event handlers and has the following structure:

```
/* The Event object:
{
  "EventType": "Event Type Code",
  "EventMetaData": {
    "Message": "My Event Description",
    "Path": "/{{api_id}}/{{path}}",
    "Origin": "1.1.1.1:PORT",
    "Key": "{{Auth Key}}"
  },
  "TimeStamp": "2015-01-15 17:21:15.111157073 +0000 UTC"
}

*/
```

An event handler has no return value, however it can interact with the outside world in various ways, as is described in the Tyk JSVM API section. Event handlers like this can be very powerful for automating session, user and API-level functions.

### The `context` Variable

In order to provide more context around an event, Tyk injects a context object into your event handler, this gives more information around the Key, such as the Org and API ID of the request in order to interact better with the Tyk REST API functions:

```
type JSVMContextGlobal struct {
  APIID string
  OrgID string
}
```

This can be used as follows:

```
// Use the TykGetKeyData function to retrieve a session from the session store, use the context variable to give the APIID for the key.
var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
log("Expires: " + thisSession.expires)
```

### Hooking up a Dynamic Event Handler

Adding a dynamic event handler to your API is the same as adding a regular event handler, however there is now a new type: `eh_dynamic_handler`. It can be invoked and configured as follows:

```
/* test_app.json */
...
"event_handlers": {
  "events": {
    "KeyExpired": [
      {
        "handler_name":"eh_dynamic_handler",
        "handler_meta": {
          "name": "sessionHandler",
          "path": "event_handlers/session_editor.js"
        }
      }
    ]
  }
},
...
```

The key differentiators here are the `handler_meta` configuration section. There are two fields: `name` and `path`. Similarly to dynamic middleware, the name represents the unique name of your middleware object, and the path is the relative path to the file (it can be absolute).

The JavaScript files are loaded on API reload into the global JSVM. If a hot-reload event occurs, the global JSVM is re-set and files are re-loaded. This could cause event handlers that are currently executing to get abandoned. This is a measured risk and should not cause instability, however it should be noted that because of this, in an environment where reloads occur frequently, there is risk that event handler may not fire correctly.