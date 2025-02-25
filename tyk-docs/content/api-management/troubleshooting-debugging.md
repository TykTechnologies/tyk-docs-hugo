---
title: "Troubleshooting and Debugging"
date: 2024-12-21
linkTitle: API Management
tags: ["troubleshooting", "debugging", "Open Source", "Self-Managed", "Tyk Cloud", "API Gateway"]
description: "Tyk troubleshooting and debugging gateway, streams, pump, dashboard"
aliases:
    - /api-management/troubleshotting-debugging
    - /debugging-series/debugging-series
    - /debugging-series/mongodb-debugging
    - /developer-support/debugging-series/.placehol
    - /developer-support/debugging-series/debugging-selfmanaged
    - /frequently-asked-questions/api-definition-url-case-sensitive
    - /frequently-asked-questions/dashboard-bootstrap-error
    - /frequently-asked-questions/find-policy-id-created-policy
    - /frequently-asked-questions/gateway-detected-0-apis
    - /frequently-asked-questions/how-to-connect-to-documentdb
    - /frequently-asked-questions/how-to-disable-an-api
    - /frequently-asked-questions/how-to-setup-cors
    - /frequently-asked-questions/import-existing-keys-tyk
    - /frequently-asked-questions/no-token-information-dashboard
    - /frequently-asked-questions/redis-persistence-using-containers
    - /frequently-asked-questions/rename-or-move-existing-headers
    - /frequently-asked-questions/run-dashboard-portal-different-ports
    - /frequently-asked-questions/two-gateways-with-docker-compose
    - /product-stack/tyk-streaming/troubleshooting
    - /troubleshooting/tyk-dashboard/cant-update-policy-please-ensure-least-one-access-rights-setting-set
    - /troubleshooting/tyk-dashboard/dashboard-not-showing-analytics-data
    - /troubleshooting/tyk-dashboard/fatal-dashboard-portal-domains-same
    - /troubleshooting/tyk-dashboard/internal-tib
    - /troubleshooting/tyk-dashboard/key-object-validation-failed-most-likely-malformed-input
    - /troubleshooting/tyk-dashboard/port-5000-errors
    - /troubleshooting/tyk-dashboard/problem-updating-cname-error-dashboard
    - /troubleshooting/tyk-dashboard/runtime-error-invalid-memory-address-nil-pointer-dereference
    - /troubleshooting/tyk-dashboard/value-error-no-json-object-decoded-running-dashboard-bootstrap-script
    - /troubleshooting/tyk-gateway/499-errors
    - /troubleshooting/tyk-gateway/502-error-tyk-gateway
    - /troubleshooting/tyk-gateway/context-canceled
    - /troubleshooting/tyk-gateway/drl-not-ready
    - /troubleshooting/tyk-gateway/index-range-error-logs
    - /troubleshooting/tyk-gateway/invalid-memory-address-nil-pointer-dereference-error
    - /troubleshooting/tyk-gateway/key-object-validation-failed-error-updating-key
    - /troubleshooting/tyk-gateway/problem-proxying-request
    - /troubleshooting/tyk-gateway/profiling
    - /troubleshooting/tyk-gateway/support-information
    - /troubleshooting/tyk-installation/payload-signature-invalid-error
    - /troubleshooting/tyk-pump/connection-dropped-connecting
    - /troubleshooting/tyk-pump/data-in-log-browser-no-reports
    - /troubleshooting/tyk-pump/no-elasticsearch-node-available
    - /troubleshooting/tyk-pump/panic-stack-exceeds-1000000000-byte-limit
    - /troubleshooting/tyk-pump/pump-overloaded
    - /tyk-configuration-reference/hot-restart-tyk-gateway-process
    - /tyk-stack/tyk-pump/useful-debug-modes
    - analytics-and-reporting/useful-debug-modes
    - debugging-series
    - troubleshooting/tyk-cloud
    - troubleshooting/tyk-dashboard
    - /troubleshooting/tyk-dashboard/fatal-dashboard-port...
    - troubleshooting/tyk-gateway
    - troubleshooting/tyk-installation
    - troubleshooting/tyk-multi-cloud
    - troubleshooting/tyk-pump
    - tyk-rest-api/hot-reload
    - tyk-stack/tyk-pump/tyk-pump-configuration/graceful-shutdowm
    - frequently-asked-questions/add-custom-certificates-to-docker-images
---

## Gateway

1. ##### Users receive 499 error in the Gateway

    **Cause**

    The Gateway receives closed client responses from the upstream client. There are number of different configuration settings that could bring about this issue.

    **Solution**

    For a standard web app, used by standard HTTP clients 499 errors are not a problem.
    ​

    However, in some specific cases, depending on the service you provide, your clients can have their own fixed constraints. 
    For example, if you are building an API used by IoT devices, and those devices internally have a strict  2 second timeout for HTTP calls and your service responding with > 2 seconds. In this case a lot of 499 errors may mean that a lot of clients are malfunctioning, and you should investigate this behavior.

    On the other hand, sometimes a client closing the connection before reading the server response is expected functionality. Taking the same example as above, you may have some IoT sensor, which just pushes data to your servers in "fire and forgot" mode, and does not care about the server response. In this case a 499 error is completely expected behavior.


2. ##### Users receive 502 error in the Gateway

    **Cause**

    The Gateway received an invalid response from the upstream server. There are number of different configuration settings that could bring about this issue.

    **Solution**

    Try using the following settings in your tyk.conf file:

    ```{.copyWrapper}
    enable_detailed_recording: false, 
    enable_jsvm: false,
    ```


    And the following key-value pairs should be set in the relevant API definition:

    ```{.copyWrapper}
    proxy.service_discovery.use_nested_query = false
    proxy.service_discovery.use_target_list = true
    proxy.service_discovery.endpoint_returns_list = true
    proxy.service_discovery.data_path = ""Address”
    proxy.service_discovery.port_data_path = “ServicePort""
    ```
        
    See [Tyk Gateway configuration]({{< ref "tyk-oss-gateway/configuration" >}}) and [Tyk Gateway API]({{< ref "api-management/gateway-config-tyk-classic" >}}) for further information regarding API definition settings.

3. ##### Gateway proxy error "context canceled"

    In some cases you can see "proxy error: context canceled" error message in the Gateway logs.
    The error itself means that the connection was closed unexpectedly. 
    It can happen for various reasons, and in some cases it is totally fine: for example client can have unstable mobile internet.

    When it happens on the high load, it can be a lot of different reasons.
    For example your OS is running out of system limits, like number of opened sockets, and to validate it, you need to try your system limits.
    See this guide https://tyk.io/docs/tyk-self-managed#resource-limits

    Additionally, it can be CPU bottleneck: you can't process more than your machine  can do.
    And note that it is not only about the actual utilization %, it is also about context switches it has to do. 
    E.g. having one job which consume 100% of your CPU/cores vs having a few thousands jobs, causing CPU constantly switch between them. 
    Such problems cause internal request processing queues, which cause latency growth (highly recommend measure it). 
    And in some cases latency can grow so big, that some clients can just disconnect/timeout because of it. 

    Additionally, highly recommend read the following blog post https://tyk.io/performance-tuning-your-tyk-api-gateway/.
    For example, you can trade memory for performance, and context switch reduction by tuning garbage collector to run less frequently: see `Tuning Tyk’s Garbage Collector` section.


    Also note that it is not Tyk or Golang specific.
    The problem described above will happen with any webserver on high scale. 
    So in general if you see a lot of "context" errors on high load, use it as a sign that the process is really struggling with the given load, and you need scale it up, either vertically or horizontally. 

4. ##### Invalid memory address or nil pointer dereference error

    **Cause**

    There are a number of reasons, most commonly, an API may have been configured incorrectly in some way (for instance, it may have been set up without an organization). The error itself is a specific to Go language which Tyk was written in and could also suggest that alterations made to the code by the user could also be the culprit.

    **Solution**

    Make sure that API definitions are set up correctly. Information on how to do this with the Tyk Gateway API can be found in the following links:

    *   [API Definition Object Details]({{< ref "api-management/gateway-config-tyk-classic" >}})
    *   [API Management]({{< ref "tyk-gateway-api" >}})

5. ##### Users receive this error message when attempting to make API calls to an existing key.

    **Cause**
    When the token was created, most probably it was configured without the `meta_data` key.

    **Solution**
    The user will need to add the key-value pair `meta_data: {}` to their key as per the [Tyk Gateway REST API Documentation]({{< ref "tyk-gateway-api" >}}).

6. ##### There was a problem proxying the request

    **Cause**

    The upstream server may have returned an empty response or cut the response off early so it was unable to complete the proxying process. A proxy error means actual connectivity issues between Tyk and the target host (i.e., a connection-level issue with the downstream server misbehaving for some reason).

    Expired TLS certificates may also cause issues.

    **Solution**

    Users are advised to upgrade to the latest versions of any Tyk packages at their earliest convenience as a patch was released to resolve this issue. Packages are available to download from [Packagecloud.io][1]. See [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/) for details on upgrading to the latest version. It may also be worth checking if any TLS certificates associated with the domain have expired.

    [1]: https://packagecloud.io/tyk

6. ##### Tyk Gateway Profiling

    In some cases, to identify tricky issues like concurrency or memory related issues, it may be required to get information about the Gateway process runtime. For example, memory or CPU usage details.
    The Tyk Gateway is built using Go, and inherits its powerful profiling tools, specifically Google's [`pprof`](https://github.com/google/pprof/).

    The Tyk Gateway can generate various profiles in the `pprof` supported format, which you can analyze by yourself, using the `go tool pprof` command, or you can send the profiles to our support team for analysis.

    There are two way to get profiles:

    1. Running the process with flags mentioned below which will gather information about the running process for the first 30 seconds, and will generate files containing profiling info:

        * `--memprofile` - memory profile, generates `tyk.mprof` file
        * `--cpuprofile` - CPU usage profile, generates `tyk.prof` file
        * `--blockprofile` - Blocking profile, generates `tyk.blockprof` file
        * `--mutexprofile` - Mutex profile, generates `tyk.mutexprof` file

    2. Running with the `--httpprofile` flag, or set `enable_http_profiler` to `true` in tyk.conf, which will run a special `/debug/pprof/` public web page, containing dynamic information about the running process, and where you can download various profiles:

        * goroutine    - stack traces of all current goroutines
        * heap         - a sampling of all heap allocations
        * threadcreate - stack traces that led to the creation of new OS threads
        * block        - stack traces that led to blocking on synchronisation primitives
        * mutex        - stack traces of holders of contended mutexes

7. ##### Support Information {#support-information}

    When contacting support, you may be asked to supply extra information and supply log files, etc, so we can quickly handle your request. Questions may include:

    * "Can you send us your log files"
    * "Can you change the logging detail level"
    * "What version of Tyk are you on"
    * "What profiling information can I get"


    This page will let you know how to get the above info to us.

    **Log Files**

    **Where do I find my log files?**

    The Gateway will log its output to `stderr` and `stdout`. In a typical installation, these will be handled or redirected by the service manager running the process, and depending on the Linux distribution, will either be output to `/var/log/` or `/var/log/upstart`.

    Tyk will try to output structured logs, and so will include context data around request errors where possible.

    **How do I increase Logging Verbosity?**

    You can set the logging verbosity in two ways:

    1. Via an Environment Variable to affect all Tyk components
    2. Just for the Gateway via your `tyk.conf` config file  

    **Setting via Environment Variable**

    The environment variable is `TYK_LOGLEVEL`.

    By default, the setting is `info`. You also have the following options:

    * `debug`
    * `warn`
    * `error`

    You will be advised by support which setting to change the logging level to.

    **For the Gateway**

    You can set the logging level in your `tyk.conf` by adding the following:

    ```{.copyWrapper}
    "log_level": "info",
    ```

    By default, the setting is `info`. You also have the following options:

    * `debug`
    * `warn`
    * `error`

    You will be advised by support which setting to change the logging level to.

    **Tyk Version**

    For support requests it is beneficial to provide more information about your Gateway build. These pinpoint the exact Gateway build that is in use.

    - Since Gateway version `5.0.8` or `5.2.3` you can inspect detailed build information by running `tyk version`. The information also includes the Go version it was built with, the operating system and architecture.

    - If you're running an an older version than the above, `tyk --version` prints out the release version for your Gateway binary.

    The binary is installed in `/opt/tyk-gateway/tyk` by default. If your binary is not available in your `PATH` environment, invoke it from there.

    **Profile Information**

    You can provide various profile information for us in [pprof format](https://github.com/google/pprof/). See [Gateway Profiling]({{< ref "#tyk-gateway-profiling" >}}) for more details.

8. ##### API definition URL case sensitive

    For security reasons Tyk lowercases the URL before performing any pattern matching.

9. ##### Gateway detected 0 APIs

    Tyk Gateway is not able to get API configs from the Tyk Portal.
    If you configured your Gateway to be segmented, you would also need to assign tags and you must also tag the APIs in the API Designer to make sure that they load.

    * In the Pro edition that is a connectivity or misconfiguration issue
    * In the Community edition, since you are not using the Dashboard we
    assume that you use file-based APIs , so in this case it's because
    API definition files are missing.

10. ##### How to import existing keys into Tyk CE

    You can use an API to import existing keys that were not created in Tyk into Tyk's Gateway.
    This doc explains how to do that with the Gateway's APIs directly.

    This example uses standard `authorization` header authentication, and assumes that the Gateway is located at `127.0.0.1:8080` and the Tyk secret is `352d20ee67be67f6340b4c0605b044b7` - update these as necessary to match your environment.

    To import a key called `mycustomkey`, save the JSON contents as `token.json` (see example below), then run the following Curl command:

    The Example `token.json` file

    ```{.json}
    {
    "allowance": 1000,
    "rate": 1000,
    "per": 60,
    "expires": -1,
    "quota_max": -1,
    "quota_renews": 1406121006,
    "quota_remaining": 0,
    "quota_renewal_rate": 60,
    "access_rights": {
        "3": {
        "api_name": "Tyk Test API",
        "api_id": "3"
        }
    },
    "org_id": "53ac07777cbb8c2d53000002",
    "basic_auth_data": {
        "password": "",
        "hash_type": ""
    },
    "hmac_enabled": false,
    "hmac_string": "",
    "is_inactive": false,
    "apply_policy_id": "",
    "apply_policies": [
        "59672779fa4387000129507d",
        "53222349fa4387004324324e",
        "543534s9fa4387004324324d"
        ],
    "monitor": {
        "trigger_limits": []
    }
    }
    ```

    The import of the key to Tyk:

    ```
    curl http://127.0.0.1:8080/tyk/keys/mycustomkey -H 'x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7' -H 'Content-Type: application/json'  -d @token.json
    ```

    Test the key after the import:

    ```
    curl http://127.0.0.1:8080/quickstart/headers -H 'Authorization: mycustomkey'
    ```

    See also the Keys section of the [Gateway API Swagger doc](https://tyk.io/docs/tyk-rest-api/).


10. ##### Redis persistence using containers

    Use case: Keep my data persistent at Docker container restart

    The Multi-Cloud Redis container is ephemeral, it isn't configured for persistence because it would very quickly get very large (Docker containers in general should really be considered as ephemeral).

    If using Redis with Multi-Cloud we strongly recommend using an external Redis database.

    There are no settings for Redis available via environment variable, you would need to mount a new `redis.conf` into the container to customize the configuration, but again, we don't recommend it.

11. ##### DRL not ready, skipping this notification

    **Description**

    You see the following `Log Warning:`

    `DRL not ready, skipping this notification`


    **Cause**

    There can be a couple of reasons for seeing this error about the [Distributed Rate Limiter]({{< ref "api-management/rate-limit#rate-limiting-layers" >}}):

    1. When you have more than one installation of the Gateway with one configured to use DRL, and others not.
    2. When the Gateway is started and the DRL receives an event before it has finished initialising.

    **Solution**

    For cause **1**, ensure that all instances of the Tyk Gateway are configured to use DRL.

    For cause **2**, the error will disappear when the DRL has initialised. 

12. ##### "Index out of range“ error in logs

    **Description**

    Redis cluster users receive the aforementioned error message in their logs. The log stack may resemble the following:

    ```
        2016/06/22 09:58:41 http: panic serving 10.0.0.1:37196: runtime error: index out of range
        2016/06/22 09:58:41 http: panic serving 10.0.0.1:37898: runtime error: index out of range
        2016/06/22 09:58:41 http: panic serving 10.0.0.1:38013: runtime error: index out of range
        2016/06/22 09:58:42 http: panic serving 10.0.0.1:39753: runtime error: index out of range
        2016/06/22 10:01:07 http: panic serving 10.0.0.1:34657: runtime error: invalid memory address or nil pointer dereference
        2016/06/22 10:01:07 http: panic serving 10.0.0.1:36801: runtime error: invalid memory address or nil pointer dereference
    ```

    **Cause**

    This is due to a bug that prevents the driver from picking up a random redis handle in single-instance connections such as pub/sub. The issue affects later patch releases of Tyk 2.2 and the first release of Tyk 2.3.

    **Solution**

    Users are advised to upgrade to the latest versions of any Tyk packages as a patch was released to resolve this issue. Packages are available to download from [Packagecloud.io](https://packagecloud.io/tyk) and further details on how to upgrade can be found [here]({{< ref "developer-support/upgrading" >}}).

13. ##### Hot restart a Tyk Gateway Process

    It is possible to hot-restart a Tyk Gateway process without dropping any connections. This can be useful if you need to load up a new configuration or change a configuration on a production server without losing any traffic.

    To hot-restart a Tyk Gateway process, you simply need to send a `SIGUSR2` signal to the process, for example:

    ```bash
    > sudo kill -SIGUSR2 {gateway-pid}
    ```

    This will fork and load a new process, passing all open handles to the new server and wait to drain the old ones.

14. ##### How to add Custom Certificates to Trusted Storage of Docker Images

    To add your custom Certificate Authority(CA) to your docker containers. You can mount your CA certificate directly into `/etc/ssl/certs` folder.

    Docker: 
    ```{.copyWrapper}
    docker run -it tykio/tyk-gateway:latest \
    -v $(pwd)/myCA.pem:/etc/ssl/certs/myCA.pem
    ```

    Kubernetes - using Helm Chart and secrets:
    ```yaml
    extraVolumes: 
        - name: self-signed-ca
        secret:
            secretName: self-signed-ca-secret
    extraVolumeMounts: 
        - name: self-signed-ca
        mountPath: "/etc/ssl/certs/myCA.pem"
        subPath: myCA.pem
    ```

## Dashboard

1. ##### Can't update policy. Please ensure at least one access rights setting is set

    **Description**

    Users receive this error when attempting to create a new Policy on the Dashboard.

    **Cause**

    The Access Rights field is a required setting for a policy.

    **Solution**

    Users should first [create a new API]({{< ref "getting-started/create-api" >}}) and then [create a new policy]({{< ref "getting-started/create-security-policy" >}}) with an existing API in the Access Rights.

2. ##### Dashboard not showing any analytics data

    **Description**

    The user is unable to see analytics data from a particular time period in the Dashboard

    **Cause**

    Missing analytics data could be caused by a number of different reasons:

    * Gateway incorrectly configured
    * Pump incorrectly configured
    * Pump service not running
    * Dashboard incorrectly configured
    * MDCB incorrectly configured
    * Browser caching stale data

    **Solution**

    **Gateway incorrectly configured**

    Ensure the Gateway `tyk.conf` has:

    * `enable_analytics` set to `true`. This sets the Gateway to record analytics data.
    * `analytics_config.storage_expiration_time` set to a value larger than the Pump's `purge_delay`. This allows the analytics data to exist long enough in Redis to be processed by the Pump.
    * `analytics_config.ignored_ips` set to `[]`. This ensures the Gateway will create analytics for requests from any IP address. 
    * `enforce_org_data_age` set to `false`. This prevents the data from being removed based on it reaching a certain age.

    **Pump incorrectly configured**

    Ensure the Pump `pump.conf` has:

    * `analytics_storage_type` set to `redis`.
    * `analytics_storage_config` settings are set to the same Redis instance that the Gateway is connected to.

    **Pump service not running**

    Ensure the Pump service is running.

    **Dashboard incorrectly configured**

    Ensure the Dashboard `tyk_analytics.conf` has:

    * `mongo_url` set to the same MongoDB instance that the Pump is connected to.

    **MDCB incorrectly configured**

    For scenarios where MDCB is used, ensure the `sink.conf` has:

    * `analytics.mongo_url` set to the same MongoDB instance that the Dashboard is connected to.
    * `forward_analytics_to_pump` set to the correct value for your solution. `false` if MDCB is directly recording the analytics itself, `true` if it is forwarding analytics data for the Pump to process. For the forwarding scenario, set the `storage` settings to the same Redis instance that the Pump is connected to.

    **Browser caching stale data**

    Try restarting your browser, or using a private session.

    You can also try restarting the Dashboard service.

    **Troubleshooting tip**

    Check if MongoDB contains analytics data by running the following query (but update the date parameter first):

    ```{.copyWrapper}
    db.getCollection('tyk_analytics_aggregates').find({timestamp: {$gte: new ISODate("2016-09-26T23:59:00Z")}})
    ```

    The query gets all aggregated analytics data from the date provided, so if you set it to yesterday you will get all data since yesterday. The data must be in the ISO format.

3. ##### Fatal - Dashboard and portal domains cannot be the same

    **Description**

    The Tyk Dashboard service will not start and displays a fatal error as follows:

    ```
    FATAL Dashboard and portal domains cannot be the same. 
    Dashboard domain: tyk-dashboard.com, Portal domain: tyk-dashboard.com
    ```

    **Cause**

    Tyk's developer portal UI needs to run on either a different subdomain or different domain name to the dashboard UI.

    Tyk's Dashboard service may be run in a multi-tenant configuration, and each tenant may have their own developer portals.

    The Dashboard service determines which portal to load based on the `Host` header in the request by the browser. If this
    conflicts with the hostname of the dashboard UI the dashboard service will not know whether to serve the dashboard or
    developer portal.

    **Solution**

    Firstly, we will need to disable hostnames from within the Dashboard configuration file in order to get the dashboard
    service started again.

    Change `host_config.enable_host_names` from `true` to `false`
    ```
    "host_config": {
    "enable_host_names": true,    <------ CHANGE TO false
    ...
    ...
    },
    ```

    You should now be able to start the Dashboard service.

    Navigate to the Dashboard via it's public IP address and log-in.

    Change your portal domain to something different - e.g. `portal.tyk-dashboard.com`

    Edit the Dashboard configuration file to re-enable host names.

    Restart the Dashboard service.

4. ##### Internal TIB SSO User unable to log in

    **Description**

    After creating an SSO Identity profile in the Tyk Dashboard, a user is unable to log in to the Dashboard or the Developer Portal

    **Cause**

    One potential cause is that the `DashboardCredential` setting has not been populated with the user's Tyk Dashboard API Access Credentials.
    You can check this from:

    1. From the Dashboard menu, select the Identity Management option
    2. Edit the profile you created
    3. Select the Raw Editor
    4. Check to see if the `DashboardCredential` setting is set

    {{< img src="/img/2.10/identity_profile2.png" alt="DashboardCredentials" >}}



    **Workaround Solution**

    If, as above, the `DashboardCredential` setting is empty (`"DashboardCredential": ""`), you can manually add the user's Tyk Dashboard API Access Credentials by performing the following:

    1. From the System Management > Users menu, select Actions > Edit from the user whose credentials you want to use
    2. Copy the **Tyk Dashboard API Access Credentials** value

    {{< img src="/img/2.10/user_api_credentials.png" alt="User API Access Credentials" >}}

    3. Paste this into the Raw editor for the `DashboardCredential` setting. For example - `"DashboardCredential": "887dad0de40b4ff05b6b50739b311099"`
    4. Click **Update**
    5. The user should now be able to log in to the Dashboard/Portal

    {{< note success >}}
    **Note**  

    This issue is due to be fixed in an up coming release
    {{< /note >}}

5. ##### Key object validation failed, most likely malformed input error

    **Description**

    The user is getting error as `Key object validation failed, most likely malformed input` when calling the Dashboard API.

    **Cause**

    Issue caused by invalid character passed in the JSON body of the request.

    **Solution**

    Validate the JSON using JSON validator.

    Further, please see [this community forum post](https://community.tyk.io/t/error-creating-new-api-through-dashboard-rest-api/1555/2) for additional guidance.

6. ##### Port 5000 Errors in the Browser Console

    > **NOTE**: Port 5000 is no longer required from v2.9.3.

    **Description**

    You see a lot of `net::ERR_CONNECTION_REFUSED` errors in the browser console.

    **Cause**

    The Dashboard is trying to connect to `https://<Your Dashboard URL>:5000/socket.io/?chan=ui_notifications` and you don't have port 5000 open.

    **Solution**

    Port 5000 is used for WebSocket connections for real-time Dashboard notifications. You can change the port by changing the default `notifications_listen_port` in your `tyk_analytics.conf`. Otherwise you can ignore the errors in the browser console.

    {{< note success >}}
    **Note**  

    Port 5000 is only required if you need to enable the Tyk Gateway log viewer.
    {{< /note >}}

7. ##### There was a problem updating your CNAME“ error in the Dashboard

    **Description**

    A user may find that they are unable to update a CNAME from within the Dashboard. The following error will appear in a pop-up:

    ```
    There was a problem updating your CNAME, please contact support
    ```

    **Cause**

    The UI for setting the domain name has a very strict validation, so it may just be rejecting this domain.

    **Solution**

    The best way to set the domain is to use the Tyk Dashboard Admin API, to obtain the organization object via a GET request and then update the object using a PUT request with the relevant CNAME added to the body of the request.<sup>[[1]({{<ref "api-management/dashboard-configuration#organizations-api">}})]</sup> Restarting the process will then set the domain.

8. ##### runtime error invalid memory address or nil pointer dereference

    **Description**

    When attempting to POST an OAuth Client to a newly generated API, user may receive the following stack trace:

    ```
    2016/12/08 08:06:16 http: panic serving 172.18.0.4:46304: runtime error: invalid memory address or nil pointer dereference
    goroutine 364279 [running]:
    net/http.(*conn).serve.func1(0xc420569500)
    panic(0xb0e780, 0xc420014040)
    /usr/local/go/src/runtime/panic.go:458 +0x243
    main.createOauthClient(0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /home/tyk/go/src/github.com/lonelycode/tyk/api.go:1526 +0x64a
    main.CheckIsAPIOwner.func1(0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /home/tyk/go/src/github.com/lonelycode/tyk/middleware_api_security_handler.go:24 +0x2ae
    net/http.HandlerFunc.ServeHTTP(0xc420533e50, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /usr/local/go/src/net/http/server.go:1726 +0x44
    github.com/gorilla/mux.(*Router).ServeHTTP(0xc42061cdc0, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /home/tyk/go/src/github.com/gorilla/mux/mux.go:98 +0x255
    net/http.(*ServeMux).ServeHTTP(0xc420667290, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /usr/local/go/src/net/http/server.go:2022 +0x7f
    net/http.serverHandler.ServeHTTP(0xc42000fc80, 0xf58260, 0xc4203a41a0, 0xc4206764b0)
    /usr/local/go/src/net/http/server.go:2202 +0x7d
    net/http.(*conn).serve(0xc420569500, 0xf58d20, 0xc42068bdc0)
    /usr/local/go/src/net/http/server.go:1579 +0x4b7
    created by net/http.(*Server).Serve
    /usr/local/go/src/net/http/server.go:2293 +0x44d
    ```

    **Cause**

    The API that the OAuth Client has been POSTed to either doesn't exist or hasn't had a chance to propagate throughout the system.

    **Solution**

    When creating a new OAuth Client, make sure that API it is created under exists. If the API was created recently, please wait a few minutes before attempting to create an OAuth Client under it.

9. ##### ValueError No JSON object could be decoded" when running Dashboard Bootstrap script

    **Description**

    Users receive the following error message when attempting to run the bootstrap script in their Tyk instance:

    ```
    Traceback (most recent call last):
    File ""<string>"", line 1, in <module>
    File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
    **kw)
    File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
    return _default_decoder.decode(s)
    File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
    File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
    raise ValueError(""No JSON object could be decoded"")
    ValueError: No JSON object could be decoded
    ORGID:
    Adding new user
    Traceback (most recent call last):
    File ""<string>"", line 1, in <module>
    File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
    **kw)
    File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
    return _default_decoder.decode(s)
    File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
    File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
    raise ValueError(""No JSON object could be decoded"")
    ValueError: No JSON object could be decoded
    USER AUTH:
    Traceback (most recent call last):
    File ""<string>"", line 1, in <module>
    File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
    **kw)
    File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
    return _default_decoder.decode(s)
    File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
    File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
    raise ValueError(""No JSON object could be decoded"")
    ValueError: No JSON object could be decoded
    NEW ID:
    Setting password
    DONE"
    ```

    **Cause**

    The bootstrap script requires a valid hostname and port number to generate a new login user.

    **Solution**

    Make sure that the correct hostname and port number used to run the bootstrap.sh script. An example command would be: `./bootstrap.sh new-tyk-instance.com:3000`

10. ##### Dashboard bootstrap error

    Make sure you:

    Target the correct domain with your `bootstrap.sh` as it is very specific once you set up a Dashboard service with hostname set

    ```{.copyWrapper}
    ./bootstrap.sh my-tyk-instance.com

    ```

    Have checked the firewall rules in your instance and VPC to allow
    port 3000 access.

11. ##### How to find the policy ID for a created policy

    Open the Active Policies page in the Dashboard (System Management > Policies) and click **Edit** next to the name of the policy you've created. The policy ID should appear in the URL of the edit page that opens up.

12. ##### How to Connect to DocumentDB with X.509 client cert

    As AWS DocumentDB runs with TLS enabled, we require a way to run it without disabling the TLS verification.
    DocumentDB uses self-signed certs for verification, and provides a bundle with root certificates for this purpose, so we need a way to load this bundle.

    Additionally DocumentDB can't be exposed to the local machine outside of the Amazon Virtual Private Cloud (VPC), which means that even if verification is turned on, it will always fail since if we use a SSH tunnel or a similar method, the domain will differ from the original. Also, it can have [Mutual TLS]({{< ref "api-management/client-authentication#use-mutual-tls" >}}) enabled.

    So, in order to support it, we provide the following variables for both our [Tyk Analytics Dashboard]({{< ref "tyk-dashboard/configuration" >}}) and [Tyk Pump]({{< ref "api-management/tyk-pump#tyk-pump-configuration" >}}):

    * `mongo_ssl_ca_file` - path to the PEM file with trusted root certificates
    * `mongo_ssl_pem_keyfile` - path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.
    * `mongo_ssl_allow_invalid_hostnames` - ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed.


    A working DocumentDB configuration looks like this (assuming that there is SSH tunnel, proxying to 27018 port).

    ```{.json}
    "mongo_url": "mongodb://testest:testtest@127.0.0.1:27018/tyk_analytics?connect=direct",
    "mongo_use_ssl": true,
    "mongo_ssl_insecure_skip_verify": false,
    "mongo_ssl_ca_file": "<path to>/rds-combined-ca-bundle.pem",
    "mongo_ssl_allow_invalid_hostnames": true,
    ```

    **Capped Collections**

    If you are using DocumentDB, [capped collections]({{< ref "api-management/tyk-pump#tyk-pump-capping-analytics-data-storage" >}}) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details.

13. ##### How to disable an API

    You will need to GET the API from the Dashboard, then set `active` property to `false`, then PUT it back.
    See [Dashboard API - API Definitions]({{< ref "api-management/dashboard-configuration#manage-apis---api-definition" >}}) for more details on how to GET and PUT an API definition.

14. ##### How to Setup CORS

    **Upstream service supports CORS**
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


    **Upstream does not handle CORS**
    If your upstream does not handle CORS, you should let Tyk manage all CORS related headers and responses. In order to do that you should **enable CORS** in Tyk and **NOT ENABLE** Options pass through.

    To learn more, look for `CORS.options_passthrough` [here]({{< ref "api-management/gateway-config-tyk-classic#cors" >}}).


    **CORS middleware is allowing headers which I did not allow**
    This may be the case when you enable CORS but don't provide any headers explicitly (basically providing an empty array). In this case the CORS middleware will use some sensible defaults. 
    To allow all headers, you will need to provide `*` (although this is not recommended).

    The same can happen with Allowed Origins and Allowed Methods. Read more about it [here]({{< ref "api-management/gateway-config-tyk-classic#cors" >}}).

    **CORS middleware is blocking my authenticated request**
    Please make sure that you did allow the authorization header name (e.g. `Authorization`) or else the request will be blocked by the CORS middleware. If you're having trouble on the developer portal with authenticated requests make sure to also allow the `Content-Type` header.

15. ##### No Key information on the Dashboard

    Information relating to a given key doesn't automatically appear in the Dashboard for users who have switched from a Self-Managed installation to a Multi-Cloud setup.

    The stats for a key will never update in the Cloud for a Multi-Cloud installation. The Dashboard in this mode only sets the initial “master” values for a key and those keys are then propagated across the Multi-Cloud instances that are using them (for example, you may have multiple zones with independent Redis DBs) at which point they diverge from each other.

    To see the up to date stats for a token, the key must be queried via the Gateway API.

16. ##### How to rename or move existing headers in a request

    To rename a header, or to move a value from one header to another (for example, moving an authentication token to a secondary place, or copying a value that gets replaced upstream) is easy with [context variables]({{< ref "api-management/traffic-transformation#request-context-variables" >}}). Here is an example where we move the value of `X-Custom-Header` to a new header called `X-New-Custom-Header` in all requests.

    We do this by setting the following in our API Definition Version section:
    ```{.copyWrapper}
    "global_headers": {
        "X-New-Custom-Header": "$tyk_context.headers_X_Custom_Header"
    },
    "global_headers_remove": ["X-Custom-Header"],
    ```

    You can test the header with the following command. This assumes your API Authentication mode is set to open(keyless):

    ```{.copyWrapper}
    curl -X GET \
    https://DOMAIN/LISTEN_PATH/get \
    -H 'content-type: application/json' \
    -H 'x-custom-header: Foo' \
    ```


    You can also do this via the Dashboard from the Endpoint Designer tab within the API Designer:

    {{< img src="/img/dashboard/system-management/rename_headers.png" alt="rename header" >}}

17. ##### How to run the Dashboard and portal on different ports

    Unfortunately its not possible to run the Dashboard and Portal on different ports, they must use the same port.

18. ##### How to run two Gateways with docker-compose

    Managing a second Tyk Gateway with our [Tyk Pro Docker Demo]({{< ref "tyk-self-managed#docker-compose-setup" >}}) is a case of mounting the `tyk.conf` file into a new volume and declaring a new Gateway service but exposed on a different port.
    You will need to make some minor modifications to `docker-compose.yml` and start your services as usual with `docker-compose up`.

    {{< note success >}}
    **Note**  

    This will only work with an appropriate license. The free license is for development purposes and would allow running Tyk's licensed platform with only one Gateway. If you want to test Tyk with more please contact us by email [info@tyk.io](mailto:info@tyk.io) and we will be happy to discuss your case and PoC requirements as well as providing a short period license.

    {{< /note >}}


    **Add the following to `docker-compose.yml` (after the `tyk-gateway` definition)**

    ```
    tyk-gateway2:
    image: tykio/tyk-gateway:latest
    ports:
    - "8081:8080"
    networks:
    - tyk
    depends_on:
    - tyk-redis
    volumes:
    ./confs/tyk.conf:/opt/tyk-gateway/tyk.conf
    ```

19. ##### “Payload signature is invalid!“ error

    **Description**

    Users receive the error "Payload signature is invalid!” in their logs.

    **Cause**

    Users may not have enabled payload signatures in their settings after an upgrade.

    **Solution**

    See [System Payloads]({{< ref "api-management/security-best-practices#sign-payloads" >}}) for more details.

## Pump

1. ##### Capturing detailed logs

    If you've seen the documentation for Tyk Dashboard's [log browser]({{< ref "api-management/dashboard-configuration#activity-logs" >}}), then you'll also be wondering how to set up your Tyk configuration to enable detailed request logging.

    **What is detailed request logging?**

    When [detailed request logging]({{< ref "api-management/logs-metrics#enable-detailed-recording" >}}) is enabled, Tyk will record the request and response in wire-format in the analytics database. This can be very useful when trying to debug API requests to see what went wrong for a user or client.

    This mode is configured in the gateway and can be enabled at the [system]({{< ref "api-management/logs-metrics#configure-at-gateway-level" >}}), [API]({{< ref "api-management/logs-metrics#configure-at-api-level" >}}) or [access key]({{< ref "api-management/logs-metrics#configure-at-key-level" >}}) level.

    You will also need your Tyk Pump configured to move data into your preferred data store.

    **Disabling detailed recording for a particular pump**

    In some cases, you don't want to send the detailed request and response to a particular data store. 
    In order to do that, you can set `omit_detailed_recording` in your Tyk Pump configuration file to `true`. This will disable the detailed logging for a specific pump.

    For example, if we have an ElasticSearch, Kafka and CSV stores, and you want to save the detailed recording in all of them except Kafka you can use the following configuration:

    Enable detailed analytics on the Gateway `tyk.conf` using:
    ```{.copyWrapper}
    "enable_analytics" : true,
    "analytics_config": {
    "enable_detailed_recording": true
    }
    ```
    - Configure each pump on `pump.conf`.
    - Add the `omit_detailed_recording` variable to the Kafka pump:
    ```{.copyWrapper}
    "pumps": {
    "kafka": {
        "type": "kafka",
        "omit_detailed_recording":"true"
        "meta": {
            ...
        }
    },
    ... 
    },
    ```

2. ##### Connection dropped, connecting...

    **Description**

    Users may notice the following message in their logs for the Tyk Pump:

    ```
    [Jun 3 22:48:02] INFO elasticsearch-pump: Elasticsearch Index: tyk_analytics
    [Jun 3 22:48:02] INFO main: Init Pump: Elasticsearch Pump
    [Jun 3 22:48:02] INFO main: Starting purge loop @10(s)
    [Jun 3 22:48:12] WARN redis: Connection dropped, connecting..
    [Jun 3 22:48:23] INFO elasticsearch-pump: Writing 1386 records
    [Jun 3 22:50:11] INFO elasticsearch-pump: Writing 13956 records
    ```

    **Cause**

    This is normal behavior for the Tyk Pump.

    **Solution**

    N/A

3. ##### Data Seen in Log Browser but No Reports

    **Description**

    You can see data in the log browser but the rest of the reports display nothing.

    **Solution**

    If your Pump is configured to use `mongo_selective_pump` (e.g. store data in a collection per organization), ensure that the [Dashboard configuration setting]({{< ref "tyk-dashboard/configuration" >}}) `use_sharded_analytics` is set to `true`. 

    The same applies in the reverse direction. If you are using `mongo-pump-aggregate` in your [pump configuration]({{< ref "api-management/tyk-pump#tyk-pump-configuration" >}}), set `use_sharded_analytics` to false.

    This is because you've enabled `use_sharded_analytics` as per above and you're using the `mongo-pump-aggregate`, but you now also have to add a `mongo-pump-selective` in order to save individual requests to Mongo, which the Dashboard can read into the Log Browser.

4. ##### No Elasticsearch node available

    **Description**

    Tyk Pump is configured to use Elasticsearch, but it does not work and shows `no Elasticsearch node available` message in log.

    ```
    tyk-pump[68354]: time="Aug 30 15:19:36" level=error msg="Elasticsearch connection failed: no Elasticsearch node available"
    ```

    **Cause**

    The `elasticsearch_url` configuration property in the `pump.conf` is missing the HTTP prefix e.g.

    ```
    "elasticsearch_url": "127.0.0.1:9200"
    ```

    **Solution**

    Ensure the HTTP prefix is present in the `elasticsearch_url` configuration property e.g.

    ```
    "elasticsearch_url": "http://127.0.0.1:9200"
    ```

5. ##### Tyk Pump Panic “stack exceeds 1000000000-byte limit“

    **Description**

    Users receive a the aforementioned error message in a stack trace in the Pump.

    **Cause**

    Users receive a the aforementioned error message in a stack trace in the Pump.

    **Solution**

    Users are advised to upgrade to the latest version of Tyk. They must also ensure that their Pump is configured with a `purge_delay` and an `optimisation_max_active` value that's greater than 0. Packages are available to download from [Packagecloud.io][1] and further details on how to upgrade can be found [here][2].

    [1]: https://packagecloud.io/tyk
    [2]: /upgrading-v2-3-v2-2/

6. ##### Pump overloaded

    **Description**

    The Tyk Pump cannot deal with amount of analytics data generated by the Gateway. This means the Pump is unable to process all the analytics data within the purge period.

    **Cause**

    If there is excessive analytics data, the pump may become overwhelmed and not able to move the data from Redis to the target data store.

    **Solution**

    There are many ways to approach solving this problem.

    **Scale the Pump**

    Scale the Pump by either increasing the CPU capacity of the Pump host or by adding more Pump instances.

    By adding more instances you are spreading the load of processing analytics records across multiple hosts, which will increase processing capacity.

    **Disable detailed analytics recording**

    Set `analytics_config.enable_detailed_recording` to `false` in the Gateway configuration file `tyk.conf`. Detailed analytics records contain much more data and are more expensive to process, by disabling detailed analytics recording the Pump will be able to process higher volumes of data.

    **Reduce the Pump purge delay**

    Set `purge_delay` to a low value e.g. `1` in the Pump configuration file `pump.conf`. This value is the number of seconds the Pump waits between checking for analytics data. Setting it to a low value will prevent the analytics data set from growing too large as the pump will purge the records more frequently.

    **Reduce analytics record expiry time**

    Set `analytics_config.storage_expiration_time` to a low value e.g. `5` in the Gateway configuration file `tyk.conf`. This value  is the number of seconds beyond which analytics records will be deleted from the database. The value must be higher than the `purge_delay` set for the Pump. This will allow for analytics records to be discarded in the scenario that the system is becoming overwhelmed. Note that this results in analytics record loss, but will help prevent degraded system performance.

7. ##### Tyk Pump Graceful Shutdown

    From version 1.5.0, Tyk Pump has a new mechanism which is called Pump’s Graceful Shutdown.

    **What does Pump’s Graceful Shutdown mean exactly?**

    That means that now, when Tyk Pump gets stopped or restarts, it is going to wait until the current purge cycle finishes, determined by `purge_delay` configuration. It is also going to flush all the data of the pumps that have an inner buffer.

    **Why are we doing that?**

    We are adding this mechanism since we were losing data on Kubernetes environments or ephemeral containers, whenever a pump instance finishes. Now, with this change, we aren't going to lose analytics records anymore.

    **When is it triggered?**

    This is triggered when Tyk Pump catches one of the following signals from the OS:

    - `os.Interrupt, syscall.SIGINT`
    - `syscall.SIGTERM`

    When the signal is `SIGKILL`, it will not gracefully stop its execution.

    **What pumps are affected?**

    The main affected pumps are:
    - `ElasticSearch`
    - `dogstatd`
    - `Influx2`

    As they all have some kind of in-memory buffering before sending the data to the storage. With this new mechanism, all those pumps are going to flush their data before finishing the Tyk Pump process.
    Furthermore, in a certain way, this new feature affects all the rest of the pumps since Tyk Pump is now going to wait to finish the purge cycle per se, like the writing of the records in all the configured storages.

## Streams

1. ##### Failure to connect to the event broker

    If Tyk Gateway is unable to establish a connection to the configured event broker (e.g., Kafka, MQTT), check the following:
    - Verify that the broker connection details in the Tyk Dashboard are correct, including the hostname, port, and any required credentials.
    - Ensure that the event broker is running and accessible from the Tyk Gateway instance.
    - Check the network connectivity between the Tyk Gateway and the event broker. Use tools like telnet or nc to validate the connection.

2. ##### Messages are not being published or consumed

    If messages are not being successfully published to or consumed from the event broker, consider the following:
    - Verify that the topic or queue names are correctly configured in the Tyk Dashboard and match the expected values in the event broker.
    - Check the Tyk Gateway logs for any error messages related to message publishing or consumption. Adjust the log level to "debug" for more detailed information.
    - Validate that the message format and schema match the expectations of the consumer or producer. Inspect the message payloads and ensure compatibility.

3. ##### Async API performance is poor or connections are being throttled

    If you observe performance issues or connection throttling with async APIs, consider the following:
    - Review the configured rate limits and quotas for the async API. Adjust the limits if necessary to accommodate the expected traffic.
    - Monitor the resource utilization of the Tyk Gateway instances and the event broker. Ensure that there is sufficient capacity to handle the load.
    - Consider scaling the Tyk Gateway horizontally by adding more instances to distribute the traffic load.

4. ##### What are best practices of using Tyk Streams

    - Use meaningful and descriptive names for your async APIs, topics, and subscriptions to improve readability and maintainability.
    - Implement proper security measures, such as authentication and authorization, to protect your async APIs and restrict access to authorized clients only.
    - Set appropriate rate limits and quotas to prevent abuse and ensure fair usage of the async API resources.
    - Monitor the performance and health of your async APIs using Tyk's built-in analytics and monitoring capabilities. Set up alerts and notifications for critical events.
    - Version your async APIs to manage compatibility and enable seamless updates without disrupting existing clients.
    - Provide comprehensive documentation for your async APIs, including details on message formats, schemas and example payloads, to assist developers in integrating with your APIs effectively.


## Debugging Series 

### MongoDB

Tyk uses Mongo as a database to store much of its analytical data. This means if you have a dashboard instance that is down, there’s a high chance that this is because of either Mongo being down or an issue with your dashboard connecting to Mongo.

Here, we'll outline the following:

 - How to isolate Mongo as the root of the error
 - The steps to take to help stop your system from going down.

1. ##### Isolating Mongo as the fault

    Here are a few ways to identify Mongo as the source of the problem:

    1. Analytics is not showing up on the dashboard
    2. When hitting the `/hello` endpoint, the dashboard is down
    3. The Mongo database size is hitting hardware resource limits.

2. ##### Mongo status

    Similarly to Tyk, Mongo has a health check that we can run to get the status of our Mongo instance. This should be a starting point for debugging Mongo (depending on which system):

    - `Sudo systemctl status mongod` or `sudo service mongodb status`
    - Logs under `/var/log/mongo/mongo.log` should also outline any outage

3. ##### Mongo version

    Does Tyk support the version of Mongo that you’re using? Read more about that [here]({{< ref "tyk-self-managed#mongodb" >}}).

4. ##### Capped collections

    Suppose a Mongo instance runs over a long period in addition to a lot of traffic in a Tyk system. In that case, the chances of the collections growing out of control are very real - especially the `tyk_analytics` collections.

    In some cases, `enable_detailed_logging: true` adds fuel to the fire, as this parameter should only be set temporarily during debugging. This configuration exists on the gateway and the API levels, so ensure this is off after debugging.

    We advise everyone to cap every collection in Mongo, as this prevents collections from growing out of control and bringing your dashboard down by hitting resource limits.

    You can determine each collection's cap size by visiting our [MongoDB sizing calculator]({{< ref "tyk-self-managed#mongodb-sizing-guidelines" >}}).

    Here’s more information on how and why you want to [cap your collections](https://www.mongodb.com/docs/manual/core/capped-collections/).

5. ##### Size caps versus TTL-capped collections

    Are you trying to decide between capping your collections or by size? It depends on a couple of factors. Ultimately, both settings will get rid of older data, so it’s based on how far back you need to view it.

    Assuming you only need data for a few days, then using a TTL will be the best route, as it will only allow your collections to grow that wild over a short period.

    Alternatively, if you care about how big the collections grow and want to see longer-lived data, then capping by size is your best direction. This will limit the collection to developing within a controlled resource limit. And in the context of aggregate analytics, this collection will hold data for long periods.

    One thing to note here is that if you head down the TTL route, and if your environment has A LOT of traffic, then your collections can grow wild and fast, while a size-capped collection will always stay within a known size limit.

6. ##### Handling overgrown, uncapped collections

    There are three ways to do this:

    1. The first method is to delete (drop) the collection and create a new collection with a cap (commands below).

    ```bash
    # This will drop a collection. When using this, cached data will not be deleted.
    db.<collection_name>.drop()
    ```

    ```bash
    #  Can use the below call. Drops the collection and removes any cache data
    db.<collection_name>.remove()
    ```

    2. The second method is to rename the collection to a random name and then create a new collection with a cap. Then restart Mongo with a larger size (we do this because the overgrown collections still exist). This is to confirm that the collection size grew too large and dropped the Mongo connection. The renaming also helps conserve the existing data if you still need it (but it will be useless in the background unless you attempt the third method).

    3. The third method is to delete (deleteMany() call below) the old data to trim down their collection size. Then, you can restart your instance to see if the connection goes up again.

    ```bash
    # Will delete data off a collection that does NOT have a cap. Otherwise, it will throw an error.
    db.<collection_name>.deleteMany()
    ```

7. ##### Secure Mongo connection

    You will use a secured connection to your Mongo instance in most production cases. Here are a few things to consider:

    - Verify there isn’t a network issue that stops your dashboard from connecting to Mongo. You can do this by hitting the dashboard server from your Mongo server (or vice versa)

    - Validate certificate and `.pem` files

    - Connect (command below) to Mongo with certificates

    ```bash
    # Replace the above files with the correct parameters (proper file paths and host).
    mongo --ssl --sslCAFile /opt/mongodb/ssl/ca.pem --sslPEMKeyFile /opt/mongodb/ssl/mongodb.pem --host 127.0.0.1
    ```
    - Verify Pump has the correct parameters to include your certificates

    - Verify your dashboard has the correct parameters relative to your environment:

    ```json
    "mongo_url": "mongodb://localhost/tyk_analytics",
    "mongo_use_ssl": true,
    "mongo_ssl_ca_file": "/opt/mongodb/ssl/ca.pem",
    "mongo_ssl_pem_keyfile": "/opt/mongodb/ssl/mongodb.pem",
    "mongo_ssl_insecure_skip_verify": true
    ```

### Tyk Self-Managed

This guide should help a user of Tyk Self-Managed in debugging common issues. A helpful way to go about this is by:

1. Isolating your components to see where the error is coming from
2. Enabling debug logs to ensure you get all the information you need

1. ##### Gateway `/hello` endpoint

    Querying the gateway's `/hello` health endpoint is the quickest way to determine the status of your Tyk instance. You can find more information in our docs about the [Gateway Liveness health check]({{< ref "tyk-self-managed#set-up-liveness-health-checks" >}}).

    This endpoint is important as it allows the user to isolate the problem's origin. At a glance, the `/hello` endpoint reports the Gateways connectivity to Redis, and the control plane components eg. Tyk Dashboard, Tyk Multi-Data Center Bridge (MDCB), and Tyk Cloud. 

    ```json
    {
        "status": "pass",
        "version": "v5.0",
        "description": "Tyk GW",
        "details":{
            "dashboard":{
                "status": "pass",
                "componentType": "system",
                "time": "2023-01-13T14:45:00Z"
                },
            "redis":{
                "status": "pass",
                "componentType": "datastore",
                "time": "2023-01-13T14:45:00Z"
                }
            },
            "rpc": {
                "status": "pass",
                "componentType": "system",
                "time": "2023-01-13T14:45:00Z"
            }
    }
    ```

    If the Dashboard or RPC connectivity fails (control plane components), the Gateway will still function based on the last received configurations from those components. However, if Redis fails, Gateway will go down since it is a hard dependency.

#### Debug Logs

Setting the log level to debug will allow for more descriptive logs that will give a better context around any issue you might be facing. For example, here are the different outputs you receive when calling an Open Keyless API with `info` and `debug` log-level modes.

Here is the output when using `info` as the log level:

```bash
tyk-pump       | time="Jan 24 14:39:19" level=info msg="Purged 1 records..." prefix=mongo-pump
tyk-pump       | time="Jan 24 14:39:19" level=info msg="Purged 1 records..." prefix=mongo-pump-selective
tyk-mongo      | 2023-01-24T14:39:19.228+0000 I  NETWORK  [listener] connection accepted from 172.20.0.2:51028 #19 (19 connections now open)
tyk-pump       | time="Jan 24 14:39:19" level=info msg="Completed upserting" collection="tyk_analytics_aggregates" prefix=mongo-pump-aggregate
tyk-pump       | time="Jan 24 14:39:19" level=info msg="Purged 1 records..." prefix=mongo-pump-aggregate
```

Here is a more detailed output of the same call when using `debug` as the log level:

```bash
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Started proxy"
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Stripping proxy listen path: /api1/"
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Upstream path is: /get"
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg=Started api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy org_id=63ca963f6888c7000191890e ts=1674570739659369736
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Upstream request URL: /get" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Outbound request URL: http://httpbin.org/get" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Creating new transport" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Out request url: http://httpbin.org/get" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Request is not cacheable" mw=ResponseCacheMiddleware
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg=Finished api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 mw=ReverseProxy ns=316559477 org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Upstream request took (ms): 316.639871"
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Checking: 63ca963f6888c7000191890e" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="no cached entry found, returning 7 days" api_id=63666619de884d0563ee3ccc67d57929 api_name=api1 org_id=63ca963f6888c7000191890e
tyk-gateway    | time="Jan 24 14:32:19" level=debug msg="Done proxy"
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Purged 0 records..." prefix=mongo-pump-aggregate
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Purged 1 records..." prefix=mongo-pump-selective
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Completed purging the records" collection="tyk_analytics" number of records=1 prefix=mongo-pump
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Purged 1 records..." prefix=mongo-pump
tyk-mongo      | 2023-01-24T14:32:20.398+0000 I  NETWORK  [listener] connection accepted from 172.20.0.3:54712 #19 (19 connections now open)
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Completed upserting" collection="tyk_analytics_aggregates" prefix=mongo-pump-aggregate
tyk-pump       | time="Jan 24 14:32:20" level=info msg="Purged 1 records..." prefix=mongo-pump-aggregate

```

As shown above, the `debug` log level mode provides more information which will help during your debugging stage, i.e when the API call was started, when it was finished, how long it took for the call to finish, the endpoint that was called, the upstream that was called, the organization that the API belongs to, and more.

1. ##### Gateway Debug Settings

    If you’re using a `*.conf` for your configuration parameters:

    ```json
    "log_level": "debug"
    ```

    If you’re using environment variables for your configuration:

    ```bash
    TYK_GW_LOGLEVEL=debug
    ```

    If you're using Tyk Helm Charts. Add the following items to your `values.yaml`:

    ```yaml
    extraEnvs:
    - name: TYK_LOGLEVEL
        value: debug
    ```

2. ##### Dashboard Debug Settings

    If you’re using a `*.conf` for your configuration parameters:

    ```json
    "log_level": "debug"
    ```

    If you’re using environment variables for your configuration:

    ```
    TYK_DB_LOGLEVEL=debug
    ```

    If you're using Tyk Helm Charts. Add the following items to your `values.yaml`:

    ```yaml
    extraEnvs:
    - name: TYK_LOGLEVEL
        value: debug
    ```

    You can find the full [log levels]({{< ref "api-management/logs-metrics#system-logs" >}}) in our documentation.

#### Versions

You can access all Tyk release information on the [release notes](https://tyk.io/docs/developer-support/tyk-release-summary/overview/) overview page.

We recommend always using the [Long-Term Support (LTS) release]({{< ref "developer-support/release-notes/special-releases#long-term-support-releases" >}}) for stability and long term support.

##### Non-LTS versions
Tyk is backwards compatible, upgrading to newer versions won't turn on new features or change the behavior of your existing environment.

For the best experience when experimenting with Tyk and exploring its latest capabilities, you can use our latest version. You can access all Tyk releases on the [release notes summary](https://tyk.io/docs/developer-support/tyk-release-summary/overview/) page. 

#### Dashboard

The Dashboard front-end (GUI included) uses [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) to retrieve data to display or update. This means you can use the [developer tools on your browser](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools) to access the API and its information. Looking into the API details, the URL, the headers, the payload and the response can help you investigate the source of the issue and replicate it with API calls using an HTTP client such as [cURL](https://curl.se/) or [Postman](https://www.postman.com/).
As a next step to this investigation, if that specific endpoint exists also in [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}), you can compare the responses from both gateway and dashboard requests. 

##### Isolating

As mentioned above, errors can happen in any of the components of your Tyk deployment, and as such, one of the critical things you'll pick up during your debugging phase is isolating these environments.

##### Dashboard Level

When debugging an issue, in order to isolate the gateway from the Dashboard, try to call the same API ednpoint on both Tyk Dashboard and Tyk Gateway 
If it works with the gateway API only, then the issue is likely to be in the Dashboard. It could be that you need to set in the Dashboard some [configuration parameters](https://tyk.io/docs/tyk-dashboard/configuration/) (using the config file or via environment variables).

##### Gateway or API level

Are you making calls against your gateway or API, and it's not working? Try isolating the gateway from everything else. Often you'll see that the gateway or API aren't at fault and that it's something else; it can be the load balancer you have in your environment blocking the call from ever reaching it.

In the case of the API error-ing out, you can also isolate it by:

- Creating a generic Httpbin API and calling it
    - If this works, then the API configuration or the backend is at fault
- Changing the target URL of the API
    - The upstream API can be at fault
- Assuming your API has a plugin, take away the plugin and test the API
    - The error most likely exists in the plugin
- If the error exists in your plugin, try taking out certain parts of the code and testing it with minimal logic
    - This means that part of your code with integrated logic is incorrect
- Is the target URL the same in another one of your APIs?
    - The gateway sees the API as duplicated and changes the new target URL causing the gateway to error.

You will eventually hit the point of error by further isolating parts of your API.

