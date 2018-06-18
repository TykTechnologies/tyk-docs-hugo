---
date: 2017-03-23T18:08:16Z
title: Virtual Endpoint Demonstration
menu:
  main:
    parent: "Compose APIs"
weight: 2 
---

> **NOTE**: Virtual endpoints are not available in the Tyk Cloud Edition.

## <a name="set-up-virtual-endpoint"></a>Set up the Virtual Endpoint

1. From the Endpoint Designer, Add a new Endpoint.
2. From the Plugins drop-down list, select **Virtual Endpoint**.
3. From the Vrtual Endpoint settings, add a unique name in the **JS function to call** option. You should also use the same name inside the function code. For this demo, we will use `myVirtualHandlerGetHeaders`.
4. Paste the following code in the **Code editor**.

```{.json}
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
    //Body: "THIS IS A  VIRTUAL RESPONSE",
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

> **NOTE**: Another option, instead of the steps above, you can use this link to import the api definition:
[https://gist.github.com/letzya/5b5edb3f9f59ab8e0c3c614219c40747](https://gist.github.com/letzya/5b5edb3f9f59ab8e0c3c614219c40747)
The virtual function is `base64` encoded in the `function_source_uri` field.

## <a name="demonstrate-the-virtual-endpoint"></a>Demonstrating the Virtual Endpoint

Run the following command:
`curl http://tyk-gateway:8080/testvirtualendpoint2/headers -H "location: /get" -v`

This should return the following:

```
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
X-Ratelimit-Limit: 0
X-Ratelimit-Remaining: 0
X-Ratelimit-Reset: 0
Content-Length: 5
Content-Type: text/plain; charset=utf-8

Connection #0 to host tyk-gateway left intact
yo yo
```

## <a name="check-logs"></a>Checking the Tyk Gateway Logs

```
Virtual Test running
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request Session: {"access_rights":null,"alias":"","allowance":0,"apply_policies":null,"apply_policy_id":"","basic_auth_data":{"hash_type":"","password":""},"certificate":"","data_expires":0,"enable_detail_recording":false,"expires":0,"hmac_enabled":false,"hmac_string":"","id_extractor_deadline":0,"is_inactive":false,"jwt_data":{"secret":""},"last_check":0,"last_updated":"","meta_data":null,"monitor":{"trigger_limits":null},"oauth_client_id":"","oauth_keys":null,"org_id":"","per":0,"quota_max":0,"quota_remaining":0,"quota_renewal_rate":0,"quota_renews":0,"rate":0,"session_lifetime":0,"tags":null} type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: API Config:{"APIID":"57d72796c5de45e649f22da390d7df43","OrgID":"5afad3a0de0dc60001ffdd07","config_data":{"bar":{"y":3},"foo":4}} type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request object: {"Body":"","Headers":{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]},"Params":{},"URL":"/testvirtualendpoint2/headers"} type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request Body: "" type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request Headers:{"Accept":["*/*"],"Location":["/get"],"User-Agent":["curl/7.54.0"]} type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: param-1:undefined type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request header type:[object Object] type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request header: ["/get"] type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request location type: object type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request location type: string type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: Request location: /get type=log-msg
--- before get to upstream ---
--- After get to upstream ---
[Jun  8 22:53:57]  INFO jsvm-logmsg: response type: string type=log-msg
[Jun  8 22:53:57]  INFO jsvm-logmsg: response: {"Code":200,"Body":"{\"headers\":{\"Accept-Encoding\":\"gzip\",\"Connection\":\"close\",\"Host\":\"httpbin.org\",\"Location\":\"/get\",\"User-Agent\":\"Go-http-client/1.1\"}}\n","Headers":{"Access-Control-Allow-Credentials":["true"],"Access-Control-Allow-Origin":["*"],"Content-Length":["133"],"Content-Type":["application/json"],"Date":["Fri, 08 Jun 2018 21:53:57 GMT"],"Server":["gunicorn/19.8.1"],"Via":["1.1 vegur"]}} type=log-msg
Virtual Test ended
```

