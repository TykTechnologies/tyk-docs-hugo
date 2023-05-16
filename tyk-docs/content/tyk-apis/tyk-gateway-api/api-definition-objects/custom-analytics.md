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

## When is it useful?

Example use cases are:

- If you need to record additional information from the request into the analytics, without enabling [detailed logging]({{<ref "tyk-oss-gateway/configuration#analytics_configenable_detailed_recording">}}). Detailed logging records the full request and response objects which consumes a lot of space.

- You wish to track a group of API requests. For example:

  - Show me all API requests where `tenant-id=123`
  - Show me all API requests where `user-group=abc`

## Tags and aggregated analytics

Tyk Gateway, by default, creates aggregations points for all the tags it records. Since we are making the header name that is recorded part of the tag value, Tyk, will also add an aggregation point for that tag value in the aggregated analytics, i.e. `x-test-header-<header_value>`.

### How to avoid the creation of aggregation analytics?

It is possible to configure a list of tags that are ignored when writing aggregated analytics to MongoDB. This can be configured for Tyk Pump and MDCB.

- **Tyk Pump**: Add the tags to ignore, or their prefixes, to `ignore_tag_prefix_list` in `pump.conf`.
- **MDCB**: Add tags to ignore, or their prefixes, to `ignore_tag_prefix_list` in `tyk_sink.conf` at root level. (Please note that this field is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated).
  If you don't want to have aggregation for these tags you can add them or their prefixes to `ignore_tag_prefix_list` in `pump.conf` in case the pump is writing the aggregated analytics to MongoDB. Alternatively, in case MDCB is doing the writing to mongoDB, set the same field in `tyk_sink.conf` at root level (please note that this field is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated).

{{< warning success >}}
**Warning**

If you add to the tags list headers that are **unique** per request, like timestamp or [X-Request-Id]({{<ref "context-variables#the-available-context-variables-are" >}}), then Tyk Gateway will essentially create an aggregation point _per request_ and the number of these tags in an hour will be equal to the number of requests.
<br/>
Since there's no real value in aggregating something that has a total of 1 and also the hourly aggregation documents can grow very quickly, we recommend to always add the header name to the ignore list as follows:

    "ignore_tag_prefix_list": [ "x-request-id" ]

{{< /warning >}}

## How to set up and test tag headers in the dashboard?

1. In the Dashboard, with an API configured, open your API and click on "Advanced Options".
2. Set up: Navigate down to the Tag Headers section and add `X-Team-Name` to the list.

{{< img src="/img/custom-analytics-tags/tag-headers.png" alt="Tag Headers" >}}

3. Test: Using your preferred HTTP client, make a request that includes the `X-Team-Name` header. For example, with curl run the following:

```curl
curl http://tyk-gateway.localhost:8080/basic-open-api/get -H "X-Team-Name: devops-us-1" -vv
```

4. Check: Navigate back to the Dashboard and select the "Log Browser" option to view the logged requests. Open the request record and in the "Gateway Metadata" section (on the right), you can find the "Tags" attached to our request. There you should see the header and value you sent in the request. You should also see that Tyk Gateway recorded it as a `tag`.

{{< img src="/img/custom-analytics-tags/log-browser.png" alt="Log Browser" >}}

We can now have Tyk track API requests which contain our business logic.
