---
date: 2017-03-24T09:58:52Z
title: Caching
menu:
  main:
    parent: "Reduce Latency"
weight: 0 
---

## <a name="overview"></a> Overview

Tyk supports various ways of caching requests. At its simplest level, Tyk can cache all safe requests, however you can also manually set exactly which endpoint patterns to cache, and if that doesn't suffice, or you require more granular control, then you can enable upstream control and have your application tell Tyk whether to cache a request or not and for how long.


## <a name="global"></a> Global

### Enabling Caching via the API Definition

To enable caching in your API, within your API definition you will need to set the `cache_options` flags in the main body of the definition:

```{.copyWrapper}
cache_options: {
  cache_timeout: 10,
  enable_cache: true,
  cache_all_safe_requests: false,
  enable_upstream_cache_control: false,
  cache_response_codes: [200]
}
```

> **Note**: If you set `cache_all_safe_requests` to true, then the cache will be global and *all* inbound requests will be evaluated by the caching middleware. This is great for simple APIs, but for most a finer-grained control is required.

### Enabling Caching via the Dashboard

Follow these steps to enable caching via the dashboard.

#### Step 1: Go to the Advanced Options

From the API Designer, select the **Advanced Options** tab:

![Advanced options tab location](/docs/img/dashboard/system-management/api_designer_advanced_2.5.png)

#### Step 2: Set the Cache Options for the Global Cache

![Cache settings](/docs/img/dashboard/system-management/cache_options_2.5.png)

Here you must set:

1.  **Enable caching**: To enable the cache middleware.
2.  **Cache timeout**: To set the timeout (in seconds) for cached requests.
3.  **Cache only these status codes**: To set which response codes to cache (remember to click **Add** after entering a response code).
4.  **Global cache**: Enable the global cache.


## <a name="per-path"></a> Per-Path

To cache only specific endpoints, within the version data under the `extended_paths` section, you will need to define the paths to cache in the `cache` list:

```
extended_paths: {
  ignored: [],
  white_list: [],
  black_list: [],
  cache: [
      "widget",
      "badger",
      "fish"
  ],
  transform: [],
  transform_headers: []
}
```

Now Tyk will only cache the `/widget`, `/badger`, and `/fish` endpoints. Tyk will only cache safe requests, so currently `GET` and `HEAD` requests are the only supported HTTP methods. For many this will suffice with regards to caching requests; however in some cases you may wish to have full control over when to cache and be reactive about the time to live of the cached response.

You will still need to set the timeout and the response codes to validate in the cache configuration section.

### Setting Up a Per-Path Cache in the Dashboard

#### Step 1: Disable Global Cache

Ensure that the global cache is disabled (**Cache all safe requests** is not selected).

![Cache options form](/docs/img/dashboard/system-management/api_designer_advanced_2.5.png)

You must also set:

1.  **Caching middleware**: To enable the cache middleware.
2.  **Cache timeout**: To set the timeout (in seconds) for cached requests.
3.  **Cache only these status codes**: To set which status codes to cache (click **Add** after entering a code).

#### Step 2: Select the Cache Plugin

Go to Endpoint Designer tab. From the path you want to cache, select the **Cache** plugin option from the drop-down list.

![Plugin dropdown list](/docs/img/dashboard/system-management/cache_plugin_2.5.png)

 
## <a name="upstream-control"></a> Upstream Control

Upstream cache control enables you to set whether a response should be cached, and for how long. To enable this, you will need to set `enable_cache` to and `enable_upstream_cache_control` to `true`.

Now you will also need to set on which paths to act, add thses paths as shown in the screengrab above or manually add these paths to the `cache` list in the `extended_paths` section of your API version as you can see below:
``` json
"extended_paths": {
            "cache": [
              "ip"
            ]
          }
 ```          

Tyk will evaluate the response headers sent from your application for these paths and based on the data in the response, activate and set the cache values.

The two response headers that Tyk looks for are:

1.  `x-tyk-cache-action-set`: If Tyk finds this header set to `1`, the request will be cached.
2.  `x-tyk-cache-action-set-ttl`: If Tyk finds this header, it will override the TTL of the cached response, otherwise it will default to `cache_options.cache_timeout`.

Utilising this approach gives the most control as it will also only cache responses based on request method. So if you only want `OPTIONS` requests to be cached, and return cache control headers only for this method, then only that method/URL combination will be cached, ignoring other methods for the same path.


### Configuration via the Dashboard

Under the advanced settings, ensure that **Enable upstream cache control** is selected and **Global cache** is not selected, then follow the steps for per-path caching.

## <a name="separate-redis-cache"></a> Configuring a Separate Redis Cache

For high-traffic systems that make heavy use of caching as well as rate limiting, it makes sense to separate out the Redis cache server from the Redis configuration server that supplies auth tokens and handles rate limiting configuration.

To enable a separate cache server, update your `tyk.conf` with the following section:

```{.copyWrapper}
"enable_separate_cache_store": false,
"cache_storage": {
  "type": "redis",
  "host": "",
  "port": 0,
  "hosts": {
      "localhost": "6379"
  },
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 3000,
  "optimisation_max_active": 5000,
  "enable_cluster": false
},
```

The configuration is the same (and uses the same underlying driver) as the regular configuration, so Redis Cluster is fully supported.