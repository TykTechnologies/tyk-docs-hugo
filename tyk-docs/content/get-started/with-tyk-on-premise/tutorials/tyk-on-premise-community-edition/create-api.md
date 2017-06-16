---
date: 2017-03-23T10:16:44Z
Title: Create an API
menu:
  main:
    parent: Community Edition
    identifier: community-edition-create-api
weight: 1
---

## <a name="creation-methods"></a>Creation Methods

With Tyk On-Premises Community Edition, it is possible to create APIs using Tyk’s REST API or to generate a file with the same object and store it in the `/apps` folder of the Tyk Gateway installation folder, this is discussed later.


## <a name="with-gateway-rest-api"></a>Tutorial: Create an API with the Gateway REST API

In order to use the REST API you will need an API key for your Gateway and one command to create the API and make it live.

### Step 1: Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

### Step 2: Create an API

To create the API, lets send a definition to the admin endpoint. Change the `x-tyk-authorization` value and `curl` domain name and port to be the correct values for your environment.
```
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

## <a name="with-file-based-mode"></a>Tutorial: Create an API in File-based Mode

To create a file-based API definition is very easy.

Create a file called `api1.json` and place it in the `/apps` folder of your Tyk Gateway installation (usually in `/var/tyk-gateway`), then add the following:
```
  {
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
  }
```

Once you have created the file, you will need to restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```
  curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

Your API is now ready to use via the Gateway.