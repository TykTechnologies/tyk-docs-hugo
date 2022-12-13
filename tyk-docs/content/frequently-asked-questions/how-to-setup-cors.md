---
title: How to Setup CORS
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

### Upstream service supports CORS
If your upstream service supports CORS already then Tyk should ignore **OPTIONS** methods as these are pre-flights sent by the browser. In order to do that you should select **Options passthrough**, and **NOT CHECK** CORS in Tyk.

- If you not do allow **OPTIONS** to pass through, it will cause Tyk to dump the options request upstream and reply with the service's response so you'll get an error similar to `no 'access-control-allow-origin' header is present on the requested resource`. 

- If you check **CORS** as well you'll get an error similar to this: 
```
Failed to load https://ORG_NAME.cloud.tyk.io/YOUR_API: The 'Access-Control-Allow-Origin' header 
contains multiple values 'http://UPSTREAM', but only one is allowed. Origin 'http://UPSTREAM' 
is therefore not allowed access. Have the server send the header with a valid value, or, if an 
opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with
CORS disabled
```
This is because you have enabled CORS on the Api Definition and the upstream **also** supports CORS and so both add the header.


### Upstream does not handle CORS
If your upstream does not handle CORS, you should let Tyk manage all CORS related headers and responses. In order to do that you should **enable CORS** in Tyk and **NOT ENABLE** Options pass through.

To learn more, look for `CORS.options_passthrough` [here]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors/" >}}).


### CORS middleware is allowing headers which I did not allow
This may be the case when you enable CORS but don't provide any headers explicitly (basically providing an empty array). In this case the CORS middleware will use some sensible defaults. 
To allow all headers, you will need to provide `*` (although this is not recommended).

The same can happen with Allowed Origins and Allowed Methods. Read more about it [here]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors/" >}}).

### CORS middleware is blocking my authenticated request
Please make sure that you did allow the authorization header name (e.g. `Authorization`) or else the request will be blocked by the CORS middleware. If you're having trouble on the developer portal with authenticated requests make sure to also allow the `Content-Type` header.

