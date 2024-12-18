---
date: 2017-03-24T15:45:13Z
title: WAF (OSS) ModSecurity Plugin example
menu:
  main:
    parent: "JavaScript Middleware"
weight: 10
---

### Use Case

Traditionally, a Web Application Firewall (WAF) would be the first layer requests would hit, before reaching the API  gateway.  This is not possible if the Gateway has to terminate SSL, for things such as mTLS.

So what do you do if you still want to run your requests through a WAF to automatically scan for malicious action?  We incorporate a WAF as part of the request lifecycle by using Tyk's plugin architecture.

### Prerequisites

* Already running Tyk -  Community Edition or Pro
* Docker, to run the WAF

### Disclaimer

This is NOT a production ready plugin because 

* The JavaScript plugin creates a new connection with the WAF for every request
* The request is not sent over SSL
* The WAF is only sent the query params for inspection.

For higher performance, the plugin could be written in Golang, and a connection pool would be opened and maintained over SSL

## Install Steps

### 1. Turn JSVM on your `tyk.conf` at the root level:

Turn on JSVM interpreter to allow Tyk to run JavaScript plugins.

```
"enable_jsvm": true
```

### 2. Place the JavaScript plugin on Tyk file system
Copy the JS Plugin as a local .js file to the Gateway's file system.  

From the Gateway root, this will download the plugin called `waf.js` into the `middleware` directory:
```
curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js
```

(Instructions)
If you are running Tyk in Docker, you can get into Tyk Gateway with `docker exec`
```
$ docker ps | grep gateway
670039a3e0b8        tykio/tyk-gateway:latest           "./entrypoint.sh"        14 minutes ago      Up 14 minutes       0.0.0.0:8080->8080/tcp             tyk-demo_tyk-gateway_1

## copy container name or ID 
$ docker exec -it 670039a3e0b8 bash

## Now SSH'd into Tyk Gateway container and can perform curl
root@670039a3e0b8:/opt/tyk-gateway# ls

apps	   entrypoint.sh   install  middleware	templates  tyk-gateway.pid  tyk.conf.example
coprocess  event_handlers  js	    policies	tyk	   tyk.conf	    utils

## Download the plugin
root@670039a3e0b8:/opt/tyk-gateway# curl https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js | cat > middleware/waf.js

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1125  100  1125    0     0   3906      0 --:--:-- --:--:-- --:--:--  3975

```

[waf.js source](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/waf.js)

### 3. Import API definition into Tyk
Copy the following Tyk API definition and import it into your environment.

[API Definition JSON](https://raw.githubusercontent.com/TykTechnologies/custom-plugins/master/plugins/js-pre-post-waf/apidef.json)

Here's the important section which adds the plugin to the request lifecycle for this API:
```{.json}
"custom_middleware": {
      "pre": [
        {
          "name": "Waf",
          "path": "./middleware/waf.js"
        }
      ],
```

##### How to Import?
[Tyk Pro](https://tyk.io/docs/tyk-configuration-reference/import-apis/#import-apis-via-the-dashboard)

[Tyk CE](https://tyk.io/docs/try-out-tyk/tutorials/create-api/)

### 4. Run WAF ModSecurity Using Docker

First run ModSecurity with the popular [Core RuleSet](https://coreruleset.org/) in Docker
```
$ docker run -ti -p 80:80 -e PARANOIA=1 --rm owasp/modsecurity-crs:v3.0
```

Open a second terminal and curl it
```
$ curl localhost

hello world
```

We should see the request show in the WAF server:

```
172.17.0.1 - - [30/Jun/2020:00:56:42 +0000] "GET / HTTP/1.1" 200 12
```

Now try a dirty payload:
```
$ curl 'localhost/?param="><script>alert(1);</script>'

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body>
<h1>Forbidden</h1>
<p>You don't have permission to access /
on this server.<br />
</p>
</body></html>
```

Our WAF catches the response and returns a `403`.


Now we try through Tyk.

```
## Clean requests, should get response from upstream's IP endpoint
$ curl localhost:8080/waf/ip

{
  "origin": "172.30.0.1, 147.253.129.30"
}

## WAF will detect malicious payload and instruct Tyk to deny
$ curl 'localhost:8080/waf/ip?param="><script>alert(1);</script>
{
    "error": "Bad request!"
}
```
