---
date: 2017-03-27T17:23:51+01:00
title: 499 Errors
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 8 
---

### Description

Users receive 499 errors in the Gateway.

### Cause

The Gateway receives closed client responses from the upstream client. There are number of different configuration settings that could bring about this issue.

### Solution

For a standard web app, used by standard HTTP clients 499 errors are not a problem.
​

However, in some specific cases, depending on the service you provide, your clients can have their own fixed constraints. 
For example, if you are building an API used by IoT devices, and those devices internally have a strict  2 second timeout for HTTP calls and your service responding with > 2 seconds. In this case a lot of 499 errors may mean that a lot of clients are malfunctioning, and you should investigate this behavior.

On the other hand, sometimes a client closing the connection before reading the server response is expected functionality. Taking the same example as above, you may have some IoT sensor, which just pushes data to your servers in "fire and forgot" mode, and does not care about the server response. In this case a 499 error is completely expected behavior. 