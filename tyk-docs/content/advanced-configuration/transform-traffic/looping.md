---
date: 2017-03-23T17:36:15Z
title: Looping
menu:
  main:
    parent: "URL Rewriting"
weight: 5 
---

## Overview

Instead of rewriting to a HTTP endpoint using [URL Rewriting](../url-rewriting), you now can tell Tyk to internally run its request pipeline one more time, but for another specified endpoint. This is called <b>looping</b>.

In order to specify a loop, in the target URL you specify a string in the following format: 

```
tyk://self/<path>. 
```

You can also loop to another API as by specifying the API name or id instead of self: 
```
tyk://<API_ID>/<path>.
```

Combined with our advanced URL rewriter rules, it can be turned into a powerful logical block, replacing the need for writing middleware or virtual endpoints in many cases.

This is very performant because Tyk will not do another network call when detecting a loop.

## Example Use Cases 

### Multiple Auth Types for a single API

Imagine you have a legacy API that has existing authentication strategies.  We can pretend it's using basic authentication.  You've decided to bring this API into your APIM ecosystem, and also begin to use OAuth2 for your API.  But also we need to support existing users who have basic auth credentials.  Finally, it's important that we expose a single ingress to our customers for that one API, instead of multiple listen paths for each authentication type.

We can use looping to achieve this.  We can set up triggers in URL Rewrite plugin, where based off a specific header, Tyk will loop the request to a specific API.

For example, let's see the following use case:
![!](../looping.png)

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

In looping context, rate limiting (quotas as well) is not checked except when explicitly turned on.  You need to add the following flag:
```
?check_limits=true
```

For example:

```
tyk://123/myendpoint?check_limits=true
```

### HTTP Method transformation in looping

You can tell Tyk to modify the HTTP verb during looping by adding the following flag:
```
?method=GET
```

For example:

```
tyk://123/myendpoint?method=GET
```

### Loop Limiting

You can tell Tyk to limit the number of loops by adding the following flag
```
?loop_limit={int}
```

For example:

```
tyk://123/myendpoint?loop_limit={int}
```



