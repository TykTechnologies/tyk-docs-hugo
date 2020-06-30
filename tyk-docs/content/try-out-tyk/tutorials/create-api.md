---
date: 2017-03-09T11:10:21Z
Title: Create an API
menu:
  main:
    parent: "Tutorials"
weight: 2
---

How to create an API within Tyk, depending on your installation type:

{{< youtube qJOHn8BuMpw >}}

{{< tabs >}}
{{< tab "Cloud" >}}
{{< include "./static/include/create-api-include.md" >}}

You will see a 200 response with your new key:
```
{
  "api_model": {},
  "key_id": "59bf9159adbab8abcdefghijac9299a1271641b94fbaf9913e0e048c",
  "data": {...}
}
```

The value returned in the `key_id` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.

{{< /tab >}}
{{< tab "Multi-Cloud" >}}
{{< include "./static/include/create-api-include.md" >}}

If the command succeeds, you will see:
```
{
  "action": "added",
  "key": "1",
  "status": "ok"
}
```

**What did we just do?**

We just sent an API Definition to the Tyk `/apis` endpoint. API Definitions are described further [here][8]. These objects encapsulate all of the settings for an API within Tyk Multi-Cloud.

## <a name="test-new-api"></a> Test your new API

To access the proxied API via the Gateway on Tyk Cloud:
```{.copyWrapper}
curl -H "Authorization: null" https://your-organization.cloud.tyk.io/test-api/get
    
Output:
-------
{
  "error": "Key not authorised"
}
```

If you see the above output, then the API is loaded and is being protected by Tyk. You can now generate a token and try the same command in place of `null` to see if the request proxies.


## <a name="test-new-api"></a> Test your new API using your local Tyk Gateway

### To access the proxied API via the Gateway on your infrastructure ###
```{.copyWrapper}
curl -H "Authorization: null" https://your-gateway-hostname/test-api/get
    
Output:
-------
{
  "error": "Key not authorised"
}
```
If you see the above output, then the API is loaded and is being protected by Tyk. You can now generate a token and try the same command in place of `null` to see if the request proxies.

### To access localhost API via the Tyk-Hybrid containered Gateway on your infrastructure ###

In order for Docker to access your `localhost` you need to edit `start.sh` and add `-net=host` to the command that starts the container just before the image name.
This should look like this:

```{.copyWrapper}
docker run --restart always -v $cwd/confs:/etc/nginx/sites-enabled \
        -d --name tyk_hybrid \
        -p $PORT:$PORT \
        -p 80:80 \
        -e PORT=$PORT \
        -e SECRET=$SECRET \
        -e ORGID=$ORGID \
        -e APIKEY=$APIKEY \
        -e REDISHOST=$REDISHOST \
        -e REDISPW=$REDISPW \
        -e RPORT=$RPORT \
        -e BINDSLUG=1 \
        --net=host \
        $IMAGE
```
{{< /tab >}}
{{< tab "On-Premises" >}}
{{% include "./static/include/create-api-include.md" %}}

If the command succeeds, you will see:
```
{
  "action": "added",
  "key": "xxxxxxxxx",
  "status": "ok"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint, API definitions are discussed in detail in the [Tyk Gateway REST API documentation](/docs/tyk-rest-api/api-definition-objects/). These objects encapsulate all of the settings for an API within Tyk.
{{< /tab >}}
{{< tab "Community Edition" >}}
## <a name="prerequisites"></a>Prerequisites

In order to complete this tutorial, you need to have the [Tyk On-Premises Community Edition installed](https://tyk.io/docs/get-started/with-tyk-community-edition/).

## <a name="creation-methods"></a>Creation Methods

With Tyk On-Premises Community Edition, it is possible to create APIs using Tyk's REST API or to generate a file with the same object and store it in the `/apps` folder of the Tyk Gateway installation folder. This is demonstrated [here](#with-file-based-mode).


## <a name="with-gateway-rest-api"></a>Tutorial: Create an API with the Gateway REST API

In order to use the REST API you will need an API key for your Gateway and one command to create the API and make it live.

### Step 1: Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

### Step 2: Create an API

To create the API, lets send a definition to the admin endpoint. Change the `x-tyk-authorization` value and `curl` domain name and port to be the correct values for your environment.
```{.copyWrapper}
curl -v -H "x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "name": "Test API",
    "slug": "test-api",
    "api_id": "1",
    "org_id": "1",
    "auth": {
      "auth_header_name": "Authorization"
    },
    "definition": {
      "location": "header",
      "key": "x-api-version"
    },
    "version_data": {
      "not_versioned": true,
      "versions": {
        "Default": {
          "name": "Default",
          "use_extended_paths": true
        }
      }
    },
    "proxy": {
      "listen_path": "/test-api/",
      "target_url": "http://httpbin.org/",
      "strip_listen_path": true
    },
    "active": true
}' http://localhost:8080/tyk/apis/ | python -mjson.tool
```

If the command succeeds, you will see:
```
{
  "action": "added",
  "key": "1",
  "status": "ok"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. API definitions are discussed in detail in the API section of this documentation. These objects encapsulate all of the settings for an API within Tyk Gateway.

## Restart or hot reload

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```{.copyWrapper}
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

## <a name="with-file-based-mode"></a>Tutorial: Create an API in File-based Mode

To create a file-based API definition is very easy.

Create a file called `api1.json` and place it in the `/apps` folder of your Tyk Gateway installation (usually in `/var/tyk-gateway`), then add the following:
```{.copyWrapper}
{
  "name": "Test API",
  "slug": "test-api",
  "api_id": "1",
  "org_id": "1",
  "auth_configs": {
    "authToken": {
      "auth_header_name": "Authorization"
    }
  },
  "definition": {
    "location": "header",
    "key": "x-api-version"
  },
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "use_extended_paths": true
    }
   }
  },
  "proxy": {
    "listen_path": "/test-api/",
    "target_url": "http://httpbin.org/",
    "strip_listen_path": true
  },
  "active": true
}
```

## Restart or hot reload

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```{.copyWrapper}
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

Your API is now ready to use via the Gateway.
{{< /tab >}}
{{< /tabs >}}

