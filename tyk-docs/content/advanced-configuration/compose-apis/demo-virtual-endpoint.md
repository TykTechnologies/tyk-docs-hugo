---
title: Virtual Endpoint examples
tags:
    - JavaScript
    - JS
    - middleware
    - scripting
    - JSVM
    - examples
    - virtual endpoint
description: Examples of Virtual Endpoints
date: "2017-03-23T18:08:16Z"
aliases:
    - /advanced-configuration/compose-apis/sample-batch-funtion/
---

Here we offer some examples to demonstrate valid use of JavaScript within Virtual Endpoints. You can either copy and paste the JavaScript code into the code editor in the Tyk Dashboard API Designer, or create a file and place it in a subdirectory of the Tyk configuration environment (for example under the `middleware` folder in your Tyk installation).

For instruction on how to configure the Virtual Endpoint middleware for your APIs, please see the appropriate documentation for the format of API that you are using:
- [Tyk OAS API]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-oas" >}})
- [Tyk Classic API]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}})

## Example 1: Accessing Tyk data objects

In this example, we demonstrate how you can access different [external Tyk objects]({{< ref "api-management/plugins/javascript#accessing-external-and-dynamic-data" >}}) (API request, session key, API definition).

1. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```javascript
function myFirstVirtualHandler (request, session, config) {
  log("Virtual Test running")
  
  log("Request Body: " + request.Body)
  log("Session: " + JSON.stringify(session.allowance))
  log("Config: " + JSON.stringify(config.APIID))
  log("param-1: " + request.Params["param1"]) // case sensitive
  log("auth Header: " + request.Headers["Authorization"]) // case sensitive
  
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #1",
    Headers: {
      "x-test": "virtual-header",
      "x-test-2": "virtual-header-2"
    },
    Code: 200
  }
  
  return TykJsResponse(responseObject, session.meta_data)   
}
log("Virtual Test initialised")
```

2. Make a call to your API endpoint passing a request body, a value in the `Authorization` header and a query parameter `param1`.

3. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:39:00 GMT
Server: tyk
X-Test: virtual-header
X-Test-2: virtual-header-2
Content-Length: 27
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #1
```

4. The gateway logs will include:

```text
time="" level=info msg="Virtual Test running" prefix=jsvm type=log-msg
time="" level=info msg="Request Body: <your-request-body>" prefix=jsvm type=log-msg
time="" level=info msg="Session: <allowance-from-your-session-key>" prefix=jsvm type=log-msg
time="" level=info msg="Config: <your-APIID>" prefix=jsvm type=log-msg
time="" level=info msg="param-1: <your_query_parameter>" prefix=jsvm type=log-msg
time="" level=info msg="auth Header: <your-auth-header>" prefix=jsvm type=log-msg
```

## Example 2: Accessing custom attributes in the API Definition

You can add [custom attributes]({{< ref "api-management/plugins/javascript#adding-custom-attributes-to-the-api-definition" >}}) to the API definition and access these from within your Virtual Endpoint.

1. Add the following custom attributes to your API definition:

```json
{
  "string": "string",
  "map": {
    " key": 3
  },
  "num": 4
}
```

2. Enable the Virtual Endpoint middleware on an endpoint of your API and paste this JavaScript into the API Designer (or save in a file and reference it from the middleware config):

```js
function mySecondVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "VIRTUAL ENDPOINT EXAMPLE #2",
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
      Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

3. Make a call to your API endpoint.

4. The virtual endpoint will terminate the request and return this response:

```bash
HTTP/1.1 200 OK
Date: Thu, 29 Feb 2024 17:29:12 GMT
Foo-Header: bar
Map-Header: {" key":3}
Num-Header: 4
Server: tyk
String-Header: string
Content-Length: 26
Content-Type: text/plain; charset=utf-8
 
VIRTUAL ENDPOINT EXAMPLE #2
```

## Example 3: Advanced example

In this example, every line in the script gives an example of a functionality usage, including:

- how to get form param
- how to get to a specific key inside a JSON variable
- the structure of the request object
- using `TykMakeHttpRequest` to make an HTTP request from within the virtual endpoint, and the json it returns - `.Code` and `.Body`.

```js
function myVirtualHandlerGetHeaders (request, session, config) {
  rawlog("Virtual Test running")
    
  //Usage examples:
  log("Request Session: " + JSON.stringify(session))
  log("API Config:" + JSON.stringify(config))
 
  log("Request object: " + JSON.stringify(request))   
  log("Request Body: " + JSON.stringify(request.Body))
  log("Request Headers:" + JSON.stringify(request.Headers))
  log("param-1:" + request.Params["param1"])
    
  log("Request header type:" + typeof JSON.stringify(request.Headers))
  log("Request header:" + JSON.stringify(request.Headers.Location))
    

  //Make api call to upstream target
  newRequest = {
    "Method": "GET",
    "Body": "",
    "Headers": {"location":JSON.stringify(request.Headers.Location)},
    "Domain": "http://httpbin.org",
    "Resource": "/headers",
    "FormData": {}
  };
  rawlog("--- before get to upstream ---")
  response = TykMakeHttpRequest(JSON.stringify(newRequest));
  rawlog("--- After get to upstream ---")
  log("response type: " + typeof response);
  log("response: " + response);
  usableResponse = JSON.parse(response);
  var bodyObject = JSON.parse(usableResponse.Body);
    
  var responseObject = {
    //Body: "THIS IS A VIRTUAL RESPONSE",
    Body: "yo yo",
    Headers: {
      "test": "virtual",
      "test-2": "virtual",
      "location" : bodyObject.headers.Location
    },
    Code: usableResponse.Code
  }
    
  rawlog("Virtual Test ended")
  return TykJsResponse(responseObject, session.meta_data)   
}
```

#### Running the Advanced example

You can find a Tyk Classic API definition [here](https://gist.github.com/letzya/5b5edb3f9f59ab8e0c3c614219c40747) that includes the advanced example, with the JS encoded `inline` within the middleware config for the `GET /headers` endpoint.

Create a new Tyk Classic API using that API definition and then run the following command to send a request to the API endpoint:

```bash
curl http://tyk-gateway:8080/testvirtualendpoint2/headers -H "location: /get" -v
```

This should return the following:

```bash
Trying 127.0.0.1...
TCP_NODELAY set
Connected to tyk-gateway (127.0.0.1) port 8080 (#0)
GET /testvirtualendpoint2/headers HTTP/1.1
Host: tyk-gateway:8080
User-Agent: curl/7.54.0
Accept: */*
location: /get

HTTP/1.1 200 OK
Date: Fri, 08 Jun 2018 21:53:57 GMT
**Location: /get**
Server: tyk
Test: virtual
Test-2: virtual
Content-Length: 5
Content-Type: text/plain; charset=utf-8

Connection #0 to host tyk-gateway left intact
yo yo
```

#### Checking the Tyk Gateway Logs

The `log` and `rawlog` commands in the JS function write to the Tyk Gateway logs. If you check the logs you should see the following:

```text
[Jun 13 14:45:21] DEBUG jsvm: Running: myVirtualHandlerGetHeaders
Virtual Test running
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Session: {"access_rights":null,"alias":"","allowance":0,"apply_policies":null,"apply_policy_id":"","basic_auth_data":{"hash_type":"","password":""},"certificate":"","data_expires":0,"enable_detail_recording":false,"expires":0,"hmac_enabled":false,"hmac_string":"","id_extractor_deadline":0,"is_inactive":false,"jwt_data":{"secret":""},"last_check":0,"last_updated":"","meta_data":null,"monitor":{"trigger_limits":null},"oauth_client_id":"","oauth_keys":null,"org_id":"","per":0,"quota_max":0,"quota_remaining":0,"quota_renewal_rate":0,"quota_renews":0,"rate":0,"session_lifetime":0,"tags":null} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: API Config:{"APIID":"57d72796c5de45e649f22da390d7df43","OrgID":"5afad3a0de0dc60001ffdd07","config_data":{"bar":{"y":3},"foo":4}} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request object: {"Body":"","Headers":{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]},"Params":{"param1":["I-am-param-1"]},"URL":"/testvirtualendpoint2/headers"} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Body: "" type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request Headers:{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]} type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: param-1:I-am-param-1 type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header type:[object Object] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request header: ["/get"] type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: object type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location type: string type=log-msg
[Jun 13 14:45:21]  INFO jsvm-logmsg: Request location: /get type=log-msg
--- before get to upstream ---
--- After get to upstream ---
[Jun 13 14:45:22]  INFO jsvm-logmsg: response type: string type=log-msg
[Jun 13 14:45:22]  INFO jsvm-logmsg: response: {"Code":200,"Body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","Headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]},"code":200,"body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Wed, 13 Jun 2018 13:45:21 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]}} type=log-msg
Virtual Test ended
[Jun 13 14:45:22] DEBUG JSVM Virtual Endpoint execution took: (ns) 191031553
```

## Example 4: Aggregating upstream calls using batch processing

One of the most common use cases for virtual endpoints is to provide some form of aggregate data to your users, combining the responses from multiple upstream service calls. This virtual endpoint function will do just that using the batch processing function from the [JavaScript API]({{< ref "api-management/plugins/javascript#javascript-api" >}})

```js
function batchTest(request, session, config) {
  // Set up a response object
  var response = {
    Body: "",
    Headers: {
      "test": "virtual-header-1",
      "test-2": "virtual-header-2",
      "content-type": "application/json"
    },
    Code: 200
  }
    
  // Batch request
  var batch = {
    "requests": [
      {
        "method": "GET",
        "headers": {
          "x-tyk-test": "1",
          "x-tyk-version": "1.2",
          "authorization": "1dbc83b9c431649d7698faa9797e2900f"
        },
        "body": "",
        "relative_url": "http://httpbin.org/get"
      },
      {
        "method": "GET",
        "headers": {},
        "body": "",
        "relative_url": "http://httpbin.org/user-agent"
      }
    ],
    "suppress_parallel_execution": false
  }
    
  log("[Virtual Test] Making Upstream Batch Request")
  var newBody = TykBatchRequest(JSON.stringify(batch))
    
  // We know that the requests return JSON in their body, lets flatten it
  var asJS = JSON.parse(newBody)
  for (var i in asJS) {
    asJS[i].body = JSON.parse(asJS[i].body)
  }
    
  // We need to send a string object back to Tyk to embed in the response
  response.Body = JSON.stringify(asJS)
    
  return TykJsResponse(response, session.meta_data)
    
}
log("Batch Test initialised")                
```
