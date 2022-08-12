---
date: 2017-03-27T19:28:52+01:00
title: “runtime error invalid memory address or nil pointer dereference“
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

When attempting to POST an OAuth Client to a newly generated API, user may receive the following stack trace:

```
2016/12/08 08:06:16 http: panic serving 172.18.0.4:46304: runtime error: invalid memory address or nil pointer dereference
goroutine 364279 [running]:
net/http.(*conn).serve.func1(0xc420569500)
panic(0xb0e780, 0xc420014040)
/usr/local/go/src/runtime/panic.go:458 +0x243
main.createOauthClient(0xf58260, 0xc4203a41a0, 0xc4206764b0)
/home/tyk/go/src/github.com/lonelycode/tyk/api.go:1526 +0x64a
main.CheckIsAPIOwner.func1(0xf58260, 0xc4203a41a0, 0xc4206764b0)
/home/tyk/go/src/github.com/lonelycode/tyk/middleware_api_security_handler.go:24 +0x2ae
net/http.HandlerFunc.ServeHTTP(0xc420533e50, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
/usr/local/go/src/net/http/server.go:1726 +0x44
github.com/gorilla/mux.(*Router).ServeHTTP(0xc42061cdc0, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
/home/tyk/go/src/github.com/gorilla/mux/mux.go:98 +0x255
net/http.(*ServeMux).ServeHTTP(0xc420667290, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
/usr/local/go/src/net/http/server.go:2022 +0x7f
net/http.serverHandler.ServeHTTP(0xc42000fc80, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
/usr/local/go/src/net/http/server.go:2202 +0x7d
net/http.(*conn).serve(0xc420569500, 0xf58d20, 0xc42068bdc0)
/usr/local/go/src/net/http/server.go:1579 +0x4b7
created by net/http.(*Server).Serve
/usr/local/go/src/net/http/server.go:2293 +0x44d
```

### Cause

The API that the OAuth Client has been POSTed to either doesn't exist or hasn't had a chance to propagate throughout the system.

### Solution

When creating a new OAuth Client, make sure that API it is created under exists. If the API was created recently, please wait a few minutes before attempting to create an OAuth Client under it.