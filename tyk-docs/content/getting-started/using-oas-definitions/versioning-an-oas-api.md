---
title: "Versioning an OAS API"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Versioning an OAS API"]
description: "Exporting an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 7
---

{{< toc >}}

### Introduction

Tyk allows you to create versions of your APIs. This tutorial shows you how to do this with our Open Source Gateway.

### Open Source

All you need to create an API and make it live is your API key and to run one API call. 

### Tutorial: Add a new version for your API

{{< note success >}}
**Note**  

For the following tutorials, use your Tyk Gateway API secret stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API
{{< /note >}}

#### Create a base API

Firstly, you should create a new API that will be our Base API for the future versions, by sending a minimalistic Tyk OAS API Definition [https://bit.ly/39tnXgO](https://bit.ly/39tnXgO) to the Gateway API endpoint, that has the upstream set to https://petstore.swagger.io/v2

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas          |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw 
'{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/base-api/",
        "strip": true
      }
    }
  }
}'
```

#### Check request response

If the command succeeds, you will see the following response, where `key` contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Test your API

Try out your newly created API and check that it hits the Petstore upstream url as intended:

```
curl --location --request GET 'http://{GATEWAY_URL}/base-api/pet/123'
```

You should see the following response:

```.json
{
    "code": 1,
    "type": "error",
    "message": "Pet not found"
}
```
The above response shows that the request successfully reached the upstream URL, but there was no pet with id 123, which is the expected result.

#### Create a second API

Now create a second API, using the [Httpbin](https://httpbin.org/) service as the upstream URL. The purpose of this API will be to serve as a version of the Base API.

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas          |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "info": {
    "title": "Httpbin",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Httpbin",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "http://httpbin.org"
    },
    "server": {
      "listenPath": {
        "value": "/second-api/",
        "strip": true
      }
    }
  }
}'
```
#### Check request response

If the command succeeds, you will see the following response, where `key` contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Test your API

Try out the newly created API and check that it hits the Httpbin upstream URL as intended:

```
curl --location --request GET 'http://{GATEWAY_URL}/second-api/get'
```
You should get the following response:

```.json
{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "httpbin.org",
        "Postman-Token": "ecaa7dff-fe6a-4511-852d-d24b7b4f16e4",
        "User-Agent": "PostmanRuntime/7.29.0",
        "X-Amzn-Trace-Id": "Root=1-62b03888-6f3cf17131ac9e0b12779c3d"
    },
    "origin": "::1, 82.77.245.53",
    "url": "http://httpbin.org/get"
}
```

This demonstrates that the request successfully reached the Httpbin upstream.

#### Configure the second API to be a version of the Base API

In order to define the second API you created as being a version of the Base API, you need to add an extra section within the `x-tyk-api-gateway.info` section of the Base API, so that whenever we call the Base API URL with the version identifier, it knows where to route the request. See [Versioning]({{< ref "/content/getting-started/key-concepts/oas-versioning.md" >}}) for more details.


Update Base API versioning information:

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas/{api-id} |
| Method       | PUT                    |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | Path Param: api-id     |

```
curl --location --request PUT 'http://{your-tyk-host}:{port}/tyk/apis/oas/{base-api-id}' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "components": {},
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {},
  "servers": [
    {
      "url": "http://{GATEWAY_URL}/base-api/"
    }
  ],
  "x-tyk-api-gateway": {
    "info": {
      "id": "{base-api-id},
      "name": "Petstore",
      "state": {
        "active": true
      },
      "versioning": {
        "enabled": true,
        "name": "Default",
        "default": "self",
        "location": "header",
        "key": "x-tyk-version",
        "versions": [
          {
            "name": "v2",
            "id": "{second-api-id}"
          }
        ],
        "stripVersioningData": false
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/base-api/",
        "strip": true
      }
    }
  }
}'
```
#### Check request response

If the command succeeds, you will see the following response, where `key` contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Test your created version

As the new version has been added and configured, you can now call the Base API URL with the version header identifier, and you should be able to hit the upstream of the second API, proving that the Base API does the routing properly.

Request version:

```
curl --location --request GET 'http://{GATEWAY_URL}/base-api/get' \
--header 'x-tyk-version: v2'
```
Response:

```.json
{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "httpbin.org",
        "Postman-Token": "74eb591c-ea47-4ca2-9552-66b04460a5d3",
        "User-Agent": "PostmanRuntime/7.29.0",
        "X-Amzn-Trace-Id": "Root=1-62b03f06-670ed0ea44a1a48452d0238e",
        "X-Tyk-Version": "v2"
    },
    "origin": "::1, 82.77.245.53",
    "url": "http://httpbin.org/get"
}
```
You can see that you got the same response as in the second step we did, when we created the second API, but this time by calling the Base API with the version header.

#### What did you just do?

In this tutorial you created two separate APIs that were designed to describe two different versions of an API. You achieved this by delegating the responsibility of routing the requests to one of them, and configuring the second one to act as a secondary version. See [Versioning]({{< ref "/content/getting-started/key-concepts/oas-versioning.md" >}}) for more details.