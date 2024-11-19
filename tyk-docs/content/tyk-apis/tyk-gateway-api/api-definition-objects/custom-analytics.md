---
date: 2017-03-13T15:08:55Z
Title: Custom Analytics Tags using HTTP Headers
menu:
  main:
    parent: "API Definition Objects"
weight: 9
aliases:
  - /tyk-rest-api/api-definition-objects/custom-analytics/
---

`tag_headers` is a string array of HTTP headers that can be extracted and transformed into [analytic tags]({{< ref "tyk-dashboard-analytics" >}})(statistics aggregated by tag, per hour).

For example if you include `X-test-header` header in the `tag_headers` array, then, for each incoming request Tyk will add a `x-test-header-<header_value>` tag to the list of tags in the request analytic record.

If you are using Tyk Operator please refer to [how to setup tag headers with Tyk Operator](#tyk-operator).

## When is it useful?

Example use cases are:

- You need to record additional information from the request into the analytics. When enabling [detailed logging]({{<ref "tyk-oss-gateway/configuration#analytics_configenable_detailed_recording">}}), Tyk Gateway records the full request and response objects which consumes a lot of space. Using this config will save you this space and only record this header.

- You wish to track a group of API requests. For example:

  - Show me all API requests where `tenant-id=123`
  - Show me all API requests where `user-group=abc`

## Tags and aggregated analytics

Tyk Gateway, by default, creates aggregations points for all the tags it records. Since we are making the header name that is recorded part of the tag value, Tyk, will also add an aggregation point for that tag value in the aggregated analytics, i.e. `x-test-header-<header_value>`.

### How to avoid the creation of aggregation analytics?

If you don't want or need aggregated analytics for the headers you record with `tag_headers`, it is possible to set Tyk to ignore them, by creating a list of tags to ignore.
This is done while writing the recorded *aggregated analytics* to the data stores. Configure a list of tags that are ignored when writing *aggregated analytics* to MongoDB. This can be configured for Tyk Pump and MDCB.

#### Ignore list in Tyk pump
In Tyk Pump config field (`tyk_sink.conf` or whatever name you chose to use), add the tags you want to ignore, or their prefixes to the `ignore_tag_prefix_list` field, (root level).

#### Ignore list in Tyk MDCB
In MDCB deployment, if you use the MDCB component to write the *aggregated analytics* to the data stores, you need to define the ignore list of headers or their prefixes, in MDCB config field (`tyk_sink.conf` or whatever name you chose to use), under `ignore_tag_prefix_list` field, (root level).

Note: the field above is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated.

{{< warning success >}}
**Warning**

If you add to the tags list headers that are **unique** per request, like timestamp or [X-Request-Id]({{<ref "context-variables#available-context-variables" >}}), then Tyk Gateway will essentially create an aggregation point _per request_ and the number of these tags in an hour will be equal to the number of requests.
<br/>
Since there's no real value in aggregating something that has a total of 1 and also the hourly aggregation documents can grow very quickly, we recommend to always add the header name to the ignore list as follows:

    "ignore_tag_prefix_list": [ "x-request-id" ]

{{< /warning >}}

## How to set up and test tag headers in the dashboard?

1. Open: In the Dashboard, with an API configured, open your API and click on "Advanced Options".
2. Set up: Navigate down to the Tag Headers section and add `X-Team-Name` to the list.

{{< img src="/img/custom-analytics-tags/tag-headers.png" alt="Tag Headers" >}}

3. Test: Using your preferred HTTP client, make a request that includes the `X-Team-Name` header. For example, with curl run the following:

```bash
curl http://tyk-gateway.localhost:8080/basic-open-api/get -H "X-Team-Name: devops-us-1" -vv
```

4. Check: Navigate back to the Dashboard and select the "Log Browser" option to view the logged requests. Open the request record and in the "Gateway Metadata" section (on the right), you can find the "Tags" attached to our request. There you should see the header and value you sent in the request. You should also see that Tyk Gateway recorded it as a `tag`.

{{< img src="/img/custom-analytics-tags/log-browser.png" alt="Log Browser" >}}

### We can now have Tyk track API requests which contain our business logic!!!


## How to setup tag headers with Tyk Operator {#tyk-operator}

To setup tag headers with Tyk Operator add the list of headers to tag to the `tag_headers` object within the `spec` field of the API definition resource. An example is given below:

```yaml {linenos=true, linenostart=1, hl_lines=["10-12"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-tag-headers
spec:
  name: httpbin-tag-headers
  use_keyless: true
  protocol: http
  active: true
  tag_headers:
  - Host
  - User-Agent
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-tag-headers
    strip_listen_path: true
```

In this example we can see that the `Host` and `User-Agent` headers exist within the `tag_headers` array. For each incoming request Tyk will add a `host-<header_value>` and `user-agent-<header_value>` tags to the list of tags in the request analytic record.
