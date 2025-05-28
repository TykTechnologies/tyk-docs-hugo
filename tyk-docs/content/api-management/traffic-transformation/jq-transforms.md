---
title: "JQ Transforms"
date: 2025-01-10
description: "How to configure JQ Transforms traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "JQ Transforms"]
keywords: ["Traffic Transformation", "JQ Transforms"]
aliases:
  - /advanced-configuration/transform-traffic/jq-transformations
---



{{< note success >}}
**Note**  

This feature is experimental and can be used only if you compile Tyk yourself own using `jq` tag: `go build --tags 'jq'`
{{< /note >}}


If you work with JSON you are probably aware of the popular `jq` command line JSON processor. For more details, see https://stedolan.github.io/jq/.

Now you can use the full power of its queries and transformations to transform requests, responses, headers and even context variables.

We have added two new plugins: 

* `transform_jq` - for request transforms.
* `transform_jq_response` - for response transforms
 
Both have the same structure, similar to the rest of our plugins: 
`{ "path": "<path>", "method": "<method>", "filter": "<content>" }`

## Request Transforms
Inside a request transform you can use following variables:

* `.body` - your current request body
* `._tyk_context` - Tyk context variables. You can use it to access request headers as well.

Your JQ request transform should return an object in the following format: 
`{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>, "tyk_context": <set-or-add-context-vars> }`. 

`body` is required, while `rewrite_headers` and `tyk_context` are optional.

## Response Transforms
Inside a response transform you can use following variables:

* `.body` - your current response body
* `._tyk_context` - Tyk context variables. You can use it to access request headers as well.
* `._tyk_response_headers` - Access to response headers

Your JQ response transform should return an object in the following format: 
`{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>}`. 

`body` is required, while `rewrite_headers` is optional.

## Example
```{.json}
"extended_paths": {
  "transform_jq": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-REQUEST-BY-JQ\": true, path: ._tyk_context.path, user_agent: ._tyk_context.headers_User_Agent}), \"rewrite_headers\": {\"X-added-rewrite-headers\": \"test\"}, \"tyk_context\": {\"m2m_origin\": \"CSE3219/C9886\", \"deviceid\": .body.DEVICEID}}"
   }],
  "transform_jq_response": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-RESPONSE-BY-JQ\": true, \"HEADERS-OF-RESPONSE\": ._tyk_response_headers}), \"rewrite_headers\": {\"JQ-Response-header\": .body.origin}}"
  }]
}
```

