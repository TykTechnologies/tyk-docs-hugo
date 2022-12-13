---
date: 2017-03-23T13:01:30Z
title: Request Context Variables
menu:
  main:
    parent: "Key Concepts"
weight: 65 
url: /context-variables/
aliases:
  - /concepts/context-variables/
  - /getting-started/key-concepts/context-variables/
---

Context variables are extracted from the request at the start of the middleware chain, and must be explicitly enabled in order for them to be made available to your transforms. These values can be very useful for later transformation of request data, for example, in converting a Form-based POST into a JSON-based PUT or to capture an IP address as a header.

### Enable Context Variables
1. In the your Tyk Dashboard, select `APIs` from the `System Management` menu 
2. Open the API you want to add Context Variable to. 
3. Select the `Advanced Options` tab and select `Enable context variables`

![Context Variables](/img/2.10/context_variables.png)

If not using a Tyk Dashboard, add the field `enable_context_vars` to your API definition file at root level and set it to `true`.

### The available context variables are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object. For the header injector Tyk will format this data as `key:value1,value2,valueN;key:value1,value2` etc.
*   `path_parts`: The components of the path, split on `/`. These values should be in the format of a comma delimited list.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.
*   `request_id` Allows the injection of request correlation ID (for example X-Request-ID)
*   `jwt_claims_CLAIMNAME` - If JWT tokens are being used, then each claim in the JWT is available in this format to the context processor. `CLAIMNAME` is case sensitive so use the exact claim.
*   `cookies_COOKIENAME` - If there are cookies, then each cookie is available in context processor in this format. `COOKIENAME` is case sensitive so use the exact cookie name and replace any `-` in the cookie name with `_`.
*   `headers_HEADERNAME` - Headers are obviously exposed in context processor. You can access any header in the request using the following format: Convert the **first letter** in each word of an incoming header is to Capital Case. This is due to the way GoLang handles header parsing. You also need to replace any `-` in the `HEADERNAME` name with `_`.<br />
For example, to get the value stored in `test-header`, the syntax would be `$tyk_context.headers_Test_Header`.


### Plugins that can use context variables:
Context variables are exposed in three middleware plugins but are accessed differently depending on the caller as follows:

1.   URL Rewriter - Syntax is `$tyk_context.CONTEXTVARIABLES`. See [URL Rewriting](/transform-traffic/url-rewriting/) for more details.
2.   Modify Headers - Syntax is `$tyk_context.CONTEXTVARIABLES`. See [Request Headers](/transform-traffic/request-headers/) for more details.
3.   Body Transforms - Syntax is `{{ ._tyk_context.CONTEXTVARIABLES }}`. See [Body Transforms](/transform-traffic/request-body/#a-name-request-body-context-data-a-context-data) for more details.

### Example use of context variables

#### Examples of the syntax to use with all the available context varibles:
```
"x-remote-addr": "$tyk_context.remote_addr",
"x-token": "$tyk_context.token",
"x-jwt-sub": "$tyk_context.jwt_claims_sub",
"x-part-path": "$tyk_context.path_parts",
"x-jwt-pol": "$tyk_context.jwt_claims_pol",
"x-cookie": "$tyk_context.cookies_Cookie_Context_Var",
"x-cookie-sensitive": "$tyk_context.cookies_Cookie_Case_sensitive",
"x-my-header": "$tyk_context.headers_My_Header",
"x-path": "$tyk_context.path",
"x-request-data": "$tyk_context.request_data",
"x-req-id": "$tyk_context.request_id"
```
![Example of the syntax in the UI][2]

#### The context variable values in the response:
```
"My-Header": "this-is-my-header",
"User-Agent": "PostmanRuntime/7.4.0",
"X-Cookie": "this-is-my-cookie",
"X-Cookie-Sensitive": "case-sensitive",
"X-Jwt-Pol": "5bca6a739afe6a00017eb267",
"X-Jwt-Sub": "john.doe@test.com",
"X-My-Header": "this-is-my-header",
"X-Part-Path": "context-var-example,anything",
"X-Path": "/context-var-example/anything",
"X-Remote-Addr": "127.0.0.1",
"X-Req-Id": "e3e99350-b87a-4d7d-a75f-58c1f89b2bf3",
"X-Request-Data": "key1:val1;key2:val2",
"X-Token": "5bb2c2abfb6add0001d65f699dd51f52658ce2d3944d3d6cb69f07a2"
```

[1]: /img/dashboard/system-management/context_variables_2.5.png
[2]: /img/dashboard/system-management/context_variables_ui.jpg
