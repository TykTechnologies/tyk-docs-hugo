---
date: 2017-03-24T14:54:24Z
title: JavaScript API
menu:
  main:
    parent: "JavaScript Middleware"
weight: 1 
aliases:
  - /customise-tyk/plugins/javascript-middleware/javascript-api/
  - /plugins/javascript-middleware/javascript-api
---

## Overview

Embedded JavaScript interpreters offer the bare bones of a scripting language, but not necessarily the functions that you would expect, especially with JavaScript, where objects such as `XMLHttpRequest()` are a given. However, those interfaces are actually provided by the browser / DOM that the script engine are executing in. In a similar vein, we have included a series of functions to the JSVM for convenience and give the interpreter more capability.

This list is regularly revised and any new suggestions should be made in our [Github issue tracker](https://github.com/TykTechnologies/tyk/issues).

Below is the list of functions currently provided by Tyk.

*   `log(string)`: Calling `log("this message")` will cause Tyk to log the string to Tyk's default logger output in the form `JSVM Log: this message` as an INFO statement. This function is especially useful for debugging your scripts. It is recommended to put a `log()` call at the end of your middleware and event handler module definitions to indicate on load that they have been loaded successfully - see the [example scripts](https://github.com/TykTechnologies/tyk/tree/master/middleware) in your Tyk installation `middleware` directory for more details.
*   `rawlog(string)`: Calling `rawlog("this message")` will cause Tyk to log the string to Tyk's default logger output without any additional formatting, like adding prefix or date. This function can be used if you want to have own log format, and parse it later with custom tooling.
*   `b64enc` - Encode string to base64
*   `b64dec` - Decode base64 string
*   `TykBatchRequest` this function is similar to `TykMakeHttpRequest` but makes use of the Tyk Batch API. See the Batch Requests section of the [Tyk Gateway API]({{ ref "tyk-gateway-api" >}}) for more details.
*   `TykMakeHttpRequest(JSON.stringify(requestObject))`: This method is used to make an HTTP request, requests are encoded as JSON for deserialisation in the min binary and translation to a system HTTP call. The request object has the following structure:

```{.javascript}
newRequest = {
  "Method": "POST",
  "Body": JSON.stringify(event),
  "Headers": {},
  "Domain": "http://foo.com",
  "Resource": "/event/quotas",
  "FormData": {"field": "value"}
};
```
{{< note success >}}
**Note**  

If you want to include querystring values, add them as part of the `Domain` property.
{{< /note >}}
    
Tyk passes a simplified response back which looks like this:

```{.copyWrapper}
type TykJSHttpResponse struct {
  Code int
  Body string
  Headers map[string][]string
}
```
    
The response is JSON string encoded, and so will need to be decoded again before it is usable:
    
```{.copyWrapper}
usableResponse = JSON.parse(response);
log("Response code: " + usableResponse.Code);
log("Response body: " + usableResponse.Body);
```
    
This method does not execute asynchronously, so execution will block until a response is received.

* `TykGetKeyData(api_key, api_id)`: Use this method to retrieve a session object for the key and the API provided:

```{.copyWrapper}
// In an event handler, we can get the key idea from the event, and the API ID from the context variable.
var thisSession = JSON.parse(TykGetKeyData(event.EventMetaData.Key, context.APIID))
log("Expires: " + thisSession.expires)
```

* `TykSetKeyData(api_key, api_id)`: Use this method to write data back into the Tyk session store:

```{.copyWrapper}
// You can modify the object just like with the REST API
thisSession.expires = thisSession.expires + 1000;
        
// Use TykSetKeyData to set the key data back in the session store
TykSetKeyData(event.EventMetaData.Key, JSON.stringify(thisSession));
```
    
All of these methods are described in functional examples in the Tyk `middleware/` and `event_handlers/` folders.
