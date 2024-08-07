---
date: 2017-03-24T12:42:33Z
title: Custom API event handlers
tags: ["API events", "Custom handlers", "JavaScript", "event handling"]
description: "How to create your own custom event handlers in JavaScript"
---

Tyk supports you to script your own custom code in JavaScript (JS) that will be invoked in response to API events. This is executed asynchronously so you don't need to worry about it blocking the Gateway handling requests. Event handlers like this can be very powerful for automating session, user and API-level functions.

It is important to note that unlike custom JavaScript [plugins]({{< ref "plugins/supported-languages/javascript-middleware" >}}), custom event handlers execute in a *global* JavaScript environment. This means that you need to be careful when naming the event handlers: if you use the same event handler name for different event handling code across two APIs, only one of them will execute, as the other will be overridden when loaded.

Custom event handlers have access to the [JavaScript API]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api" >}}) which gives access to the session object and enables your code to make HTTP calls. This is particularly useful if you want to interface with another API with a complex request/response cycle.

<br>
{{< note success >}}
**Note**  

Custom event handlers are currently only supported by Tyk Classic APIs.
{{< /note >}}

### Creating a custom event handler

A custom event handler consists of a function that accepts two variables (`event` and `context`) and has no return value.

Creating an event handler is very similar to [creating custom JS plugins]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}}), simply invoke the correct constructors with a closure in the TykJS namespace:

```js
// ---- Sample custom event handler -----
var sampleHandler = new TykJS.TykEventHandlers.NewEventHandler({});

sampleHandler.NewHandler(function(event, context) {
  // You can log to Tyk console output by calling the built-in log() function:
  log("This handler does nothing, but this will appear in your terminal")

  return
});
```

#### The `event` object

This contains the [event metadata]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-data" >}}) in the following structure:

```json
{
  "EventType": "Event Type Code",
  "EventMetaData": {
    "Message": "My Event Description",
    "Path": "/{{api_id}}/{{path}}",
    "Origin": "1.1.1.1:PORT",
    "Key": "{{Auth Key}}"
  },
  "TimeStamp": "2024-01-01 23:59:59.111157073 +0000 UTC"
}
```

#### The `context` Variable

Tyk injects a `context` object into your event handler giving access to more information about the request. This object has the following structure:

```js
type JSVMContextGlobal struct {
  APIID string
  OrgID string
}
```

It is populated with the API ID and Org ID of the request that your custom function can use together with the `event` metadata to interact with the Tyk REST API functions, for example:

```js
// Use the TykGetKeyData function to retrieve a session from the session store, use the context variable to give the APIID for the key.
var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
log("Expires: " + thisSession.expires)
```

### Registering a custom event handler

Registering a custom event handler to your Tyk Classic API is the same as adding any other event handler, within the `event_handlers` section of the API definition.

The `handler_name` for a custom event handler should be set to: `eh_dynamic_handler`.

The `handler_meta` for a custom event handler consists of two fields:
- `name` is the unique name of your middleware object
- `path` is the relative path to the file (it can be absolute)

For example, to register a custom event handler with the name `sessionHandler` to be invoked in response to the `KeyExpired` event you would add the following to your API definition:

```json
{
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
  }
}
```

### Loading custom event handlers

The JavaScript files are loaded on API reload into the global JSVM. If a hot-reload event occurs, the global JSVM is re-set and files are re-loaded. This could cause event handlers that are currently executing to get abandoned. This is a measured risk and should not cause instability, however it should be noted that because of this, in an environment where reloads occur frequently, there is risk that event handler may not fire correctly.