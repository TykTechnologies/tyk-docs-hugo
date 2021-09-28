---
date: 2017-03-23T17:36:15Z
title: Looping
menu:
  main:
    parent: "URL Rewriting"
weight: 5 
---

## Overview

If you need to redirect your URL to *another endpoint* in the api or *another api in the gateway* using [URL Rewriting](../url-rewriting), you can run the request pipeline one more time, internally instead of redirect it to a HTTP endpoint through the network. This is called <b>looping</b>. This is very performant because Tyk will not do another network call when a loop is detected.

In order to specify a loop, in the target URL you specify a string in the protocol schema `tyk://` as shown below:

This syntax of `tyk` in the schema protocol and `self` in the domian will loop the request to another endpoint under the current api:
```
tyk://self/<path>. 
```

You can also loop to another API as by specifying the API name or id (instead of `self`): 
```
tyk://<API_ID>/<path>.
```

Combined with our advanced URL rewriter rules, it can be turned into a powerful logical block, replacing the need for writing middleware or virtual endpoints in many cases.


## Example Use Cases 

### Multiple Auth Types for a single API

Imagine you have a legacy API that has existing authentication strategies.  We can pretend it's using basic authentication.  You've decided to bring this API into your APIM ecosystem, and also begin to use OAuth2 for your API.  But also we need to support existing users who have basic auth credentials.  Finally, it's important that we expose a single ingress to our customers for that one API, instead of multiple listen paths for each authentication type.

We can use looping to achieve this.  We can set up triggers in URL Rewrite plugin, where based off a specific header, Tyk will loop the request to a specific API.

For example, let's see the following use case:
{{< img src="/img/diagrams/diagram_docs_looping-example-use-cases@2x.png" alt="Looping example" >}}

#### 1.  A request comes into the ingress API.  This has two rules:
-   If `Header == "Authorization: Bearer"`, loop to the OAuth API
-   If `Header == "Authorization: Basic"`, loop to the Basic Auth API

1. The ingress API is marked "keyless" as Tyk doesn't perform any authentication here.
2. We add rate limiting option to the loop via `?check_limits=true`

#### 2. The inner APIs perform authentication, and loop to the north-bound API

These APIs are marked internal, can only be accessed from within loop context.

#### 3. The north-bound API, marked open keyless, does transformations, etc, then reverse proxies to the backend API.

1. This API is marked internal, can only be accessed from within loop context.
2. This API is marked "keyless" as Tyk doesn't perform any authentication here.

## Advanced Configuration

You can add one or more of the following configurations as query parameters to your looping URL.

### Rate Limiting in looping

In looping context, rate limiting (quotas as well) is not checked except when explicitly turned on.  You need to add the following query param:
```
?check_limits=true
```

For example:

```
tyk://123/myendpoint?check_limits=true
```

### HTTP Method transformation in looping

You can tell Tyk to modify the HTTP verb during looping by adding the following query param:
```
?method=GET
```

For example:

```
tyk://123/myendpoint?method=GET
```

### Loop Limiting

In order to avoid endless recursion, there's a default limit loop level of 5 which is set in the request level (i.e. set per request).
In case the loop level has gone beiod the allowed limit the user will get the error `"Loop level too deep. Found more than %d loops in single request"`.
You can set the loop level limit with a query param as shown below. Please note that you can only set it once per request. After that, you can't overwrite with a new loop level limit.


Tell Tyk to limit the number of loops by adding the following query param:
```
?loop_limit={int}
```

For example:

```
tyk://123/myendpoint?loop_limit={int}
```



