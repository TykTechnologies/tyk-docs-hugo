---
title: Example custom Go plugins
date: 2024-03-01
description: "Example custom plugins in Golang"
tags: ["custom plugin", "golang", "go plugin", "middleware", "examples"]
---

This document provides a working example for providing specific functionality with a custom Go plugin.

For more resources for writing plugins, please visit our [Plugin Hub]({{< ref "plugins/plugin-hub">}}).

## Using a custom Go plugin as a virtual endpoint

It is possible to send a response from the Golang plugin custom middleware. In the case that the HTTP response was sent:

- The HTTP request processing is stopped and other middleware in the chain won't be used.
- The HTTP request round-trip to the upstream target won't happen
- Analytics records will still be created and sent to the analytics processing flow.

Let's look at an example of how to send an HTTP response from the Tyk Golang plugin. Imagine that we need middleware which would send JSON with the current time if the request contains the parameter `get_time=1` in the request query string:

```go
package main

import (
  "encoding/json"
  "net/http"
  "time"
)

func SendCurrentTime(rw http.ResponseWriter, r *http.Request) {
  // check if we don't need to send reply
  if r.URL.Query().Get("get_time") != "1" {
    // allow request to be processed and sent to upstream
        return
  }

  //Prepare data to send
  replyData := map[string]interface{}{
    "current_time": time.Now(),
  }

  jsonData, err := json.Marshal(replyData)
  if err != nil {
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }

  //Send HTTP response from the Golang plugin
  rw.Header().Set("Content-Type", "application/json")
  rw.WriteHeader(http.StatusOK)
  rw.Write(jsonData)
}

func main() {}
```

Let's build the plugin by running this command in the plugin project folder:

```bash
go build -trimpath -buildmode=plugin -o /tmp/SendCurrentTime.so
```

Then let's edit the API spec to use this custom middleware:

```json
"custom_middleware": {
  "pre": [
    {
       "name": "SendCurrentTime",
       "path": "/tmp/SendCurrentTime.so"
    }
  ],
  "post_key_auth": [],
  "auth_check": {},
  "post": [],
  "driver": "goplugin"
}
```

Let's check that we still perform a round trip to the upstream target if the request query string parameter `get_time` is not set:

```bash
# curl http://localhost:8181/my_api_name/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
```

Now let's check if our Golang plugin sends an HTTP 200 response (with JSON containing current time) when we set `get_time=1` query string parameter:

```bash
# curl http://localhost:8181/my_api_name/get?get_time=1
{"current_time":"2019-09-11T23:44:10.040878-04:00"}
```

Here we see that:

- We've got an HTTP 200 response code.
- The response body has a JSON payload with the current time.
- The upstream target was not reached. Our Tyk Golang plugin served this request and stopped processing after the response was sent.

## Performing custom authentication with a Golang plugin

You can implement your own authentication method, using a Golang plugin and custom `"auth_check"` middleware. Ensure you set the two fields in Post Authentication Hook.

Let's have a look at the code example. Imagine we need to implement a very trivial authentication method when only one key is supported (in the real world you would want to store your keys in some storage or have some more complex logic).

```go
package main

import (
  "net/http"

  "github.com/TykTechnologies/tyk/ctx"
  "github.com/TykTechnologies/tyk/headers"
  "github.com/TykTechnologies/tyk/user"
)

func getSessionByKey(key string) *user.SessionState {
  //Here goes our logic to check if the provided API key is valid and appropriate key session can be retrieved

  // perform auth (only one token "abc" is allowed)
  if key != "abc" {
    return nil
  }

  // return session
  return &user.SessionState{
    OrgID: "default",
    Alias: "abc-session",
  }
}

func MyPluginAuthCheck(rw http.ResponseWriter, r *http.Request) {
  //Try to get a session by API key
  key := r.Header.Get(headers.Authorization)
  session := getSessionByKey(key)
  if session == nil {
    // auth failed, reply with 403
    rw.WriteHeader(http.StatusForbidden)
    return
  }
  
  // auth was successful, add the session to the request's context so other middleware can use it
  ctx.SetSession(r, session, true)
  
  // if compiling on a version older than 4.0.1, use this instead
  // ctx.SetSession(r, session, key, true) 
}

func main() {}
```

A couple of notes about this code:

- the package `"github.com/TykTechnologies/tyk/ctx"` is used to set a session in the request context - this is something `"auth_check"`-type custom middleware is responsible for.
- the package `"github.com/TykTechnologies/tyk/user"` is used to operate with Tyk's key session structure.
- our Golang plugin sends a 403 HTTP response if authentication fails.
- our Golang plugin just adds a session to the request context and returns if authentication was successful.

Let's build the plugin by running the following command in the folder containing your plugin project:

```bash
go build -trimpath -buildmode=plugin -o /tmp/MyPluginAuthCheck.so
```

Now let's check if our custom authentication works as expected (only one key `"abc"` should work).

Authentication will fail with the wrong API key:

```bash
# curl -v -H "Authorization: xyz" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: xyz
>
< HTTP/1.1 403 Forbidden
< Date: Wed, 11 Sep 2019 04:31:34 GMT
< Content-Length: 0
<
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware replied with a 403 response and request processing was stopped at this point.

Authentication successful with the right API key:

```bash
# curl -v -H "Authorization: abc" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: abc
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 04:31:39 GMT
< Content-Length: 257
<
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "abc",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "url": "https://httpbin.org/get"
}
* Connection #0 to host localhost left intact
```

Here we see that our custom middleware successfully authenticated the request and we received a reply from the upstream target.