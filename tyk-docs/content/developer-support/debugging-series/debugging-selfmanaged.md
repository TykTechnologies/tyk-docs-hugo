---
title: "Tyk Self-Managed Debugging"
date: 2023-01-06
tags: ["Debugging", "On-Prem Debugging", "Debugging Guide", "Debugging Tips", "Tyk Self-Managed", "Tyk debugging", "Tyk debugging series" ]
description: "Debugging Tips and Tricks on how-to debug a Tyk Instance"
---

This guide should help a user of Tyk Self-Managed in debugging common issues. A helpful way to go about this is by:

1. Isolating your components to see where the error is coming from
2. Enabling debug logs to ensure you get all the information you need

## Gateway `/hello` endpoint

Querying the gateway's `/hello` health endpoint is the quickest way to determine the status of your Tyk instance. You can find more information in our docs about the [Gateway Liveness health check]({{< ref "planning-for-production/ensure-high-availability/health-check" >}}).

This endpoint is important as it allows the user to isolate the problem's origin. At a glance, the `/hello` endpoint reports the Gateways connectivity to Redis, and the control plane components eg. Tyk Dashboard, Tyk Multi-Data Centre Bridge (MDCB), and Tyk Cloud. 

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

## Debug Logs

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

### Gateway Debug Settings

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

### Dashboard Debug Settings

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

You can find the full [log levels]({{< ref "log-data" >}}) in our documentation.

## Versions

You can access all Tyk release information on the [release notes](https://tyk.io/docs/developer-support/tyk-release-summary/overview/) overview page.

We recommend always using the [Long-Term Support (LTS) release]({{<ref "frequently-asked-questions/long-term-support-releases#what-is-a-tyk-long-term-support-lts-release" >}}) for stability and long term support.

### Non-LTS versions
Tyk is backwards compatible, upgrading to newer versions won't turn on new features or change the behaviour of your existing environment.

For the best experience when experimenting with Tyk and exploring its latest capabilities, you can use our latest version. You can access all Tyk releases on the [release notes summary](https://tyk.io/docs/developer-support/tyk-release-summary/overview/) page. 

## Dashboard

The Dashboard front-end (GUI included) uses [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) to retrieve data to display or update. This means you can use the [developer tools on your browser](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools) to access the API and its information. Looking into the API details, the URL, the headers, the payload and the response can help you investigate the source of the issue and replicate it with API calls using an HTTP client such as [cURL](https://curl.se/) or [Postman](https://www.postman.com/).
As a next step to this investigation, if that specific endpoint exists also in [Tyk Gateway API]({{< ref "tyk-gateway-api" >}}), you can compare the responses from both gateway and dashboard requests. 

### Isolating

As mentioned above, errors can happen in any of the components of your Tyk deployment, and as such, one of the critical things you'll pick up during your debugging phase is isolating these environments.

### Dashboard Level

When debugging an issue, in order to isolate the gateway from the Dashboard, try to call the same API ednpoint on both Tyk Dashboard and Tyk Gateway 
If it works with the gateway API only, then the issue is likely to be in the Dashboard. It could be that you need to set in the Dashboard some [configuration parameters](https://tyk.io/docs/tyk-dashboard/configuration/) (using the config file or via environment variables).

### Gateway or API level

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

## What do you do when you can’t fix the error?
You're probably not the first to encounter this error. Visit these relevant Tyk resources for additional help or guidance:

1. Search the rest of documentation including [Tyk FAQ Section]({{< ref "frequently-asked-questions" >}})
2. [Tyk Community Forums](https://community.tyk.io/)
3. For paying users - Contact us via our Tyk Support portal(Click on the link above *24/7 Support*)
