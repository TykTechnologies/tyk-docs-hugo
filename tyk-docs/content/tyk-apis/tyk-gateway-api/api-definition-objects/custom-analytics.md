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

`tag_headers` is a string array of HTTP headers that can be extracted and transformed into tags.

For example if you include `X-test-header` header in the `tag_headers` array, then, for each incoming request Tyk will add a `x-test-header-<header_value>` tag to the list of tags in the request analytic record.


## When is it useful?
Example use cases are:

If you need to record additional information from the request into the analytics, without enabling [detailed logging]({{<ref "tyk-oss-gateway/configuration#analytics_configenable_detailed_recording">}}), (which isn't always useful since consumes a lot of space when it records the full request and response objects).

- If you wish to track a group of API requests. For example:

- Show me all API requests where `tenant-id=123` 
- Show me all API requests where `user-group=abc`


## Tags and Aggregated analytics

Tag, by default, creates aggregations for the tags it records. Since we are making the header name that is recored part of the tag value, Tyk, will also add an aggregation point for that tag value in the aggregated analytics.

### How to specify which tags are ignored for aggregated analytics?
If you don't want to have aggregation for these tags you can add them or their prefixes to `ignore_tag_prefix_list` in `pump.conf` in case the pump is writing the aggregated analytics to MongoDB. Alternatively, in case MDCB is doing the writing to mongoDB, set the same field in `tyk_sink.conf` at root level (please note that this field is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated).

{{< warning success >}}
**Warning**

If you add to the tags list headers that are **unique** per request, like timestamp or [X-Request-Id]({{<ref "context-variables#the-available-context-variables-are" >}}), then Tyk Gateway will essentially create an aggregation point **per request*, and the number of these tags in an hour will be equal to the number of requests.
<br/>
Since there's no real value in aggregating something that has a total of 1 and also the hourly aggregation documents can grow very quickly, we recommend to always add the header name to the ignore list as follows:

    "ignore_tag_prefix_list": [ "x-request-id" ]

{{< /warning >}}


## Guide to set up and test tag headers in the dashboard

1. In the Dashboard, with an API configured, open your API and head to "Advanced Options".
2. Set up: Navigate down to the Tag Headers section and add `X-Team-Name` to the list.

{{< img src="/img/custom-analytics-tags/tag-headers.png" alt="Tag Headers" >}}

3. Test: Using your preferred HTTP client, pass the `X-Team-Name` header and make a request to test out your work. For example, with curl run the following
```curl
curl http://tyk-gateway.localhost:8080/basic-open-api/get -H "X-Team-Name: devops-us-1" -vv
```

4. Check: Navigate back to the Dashboard and select the "Log Browser" to view the logged requests. Open the request record and in the "Gateway Metadata" section (on theright), you can find the "Tags" attached to our request. There you should see the header and value you sent to in the reuquest and that Tyk Gateway recorded as a `tag`.

{{< img src="/img/custom-analytics-tags/log-browser.png" alt="Log Browser" >}}

We can now have Tyk track API requests which contain our business logic.