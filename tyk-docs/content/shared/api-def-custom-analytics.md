---
---

`tag_headers` is a string array of HTTP headers which can be extracted and turned to tags.

For example if you include `X-test-header` header in the `tag_headers` array, then, for each incoming request Tyk will add a `x-test-header-<header_value>` tag to the list of tags in the request analytic record.

This functionality is useful if you need to record additional information from the request in the analytics, without enabling detailed logging, which records the full request and response objects and as such consumes a lot of space.

**Important considerations**
- Since we are declaring headers' prefix as tags, Tyk, will `also` add an aggregation point per tag in the aggregated analytics.
If you don't want to have aggregation for these tags you can add them or their prefixes to `ignore_tag_prefix_list` in `pump.conf` in case the pump is writing the aggregated analytics to MongoDB. Alternatively, in case MDCB is doing the writing to mongoDB, set the same field in `tyk_sink.conf` at root level (please note that this field is replacing `aggregates_ignore_tags` which is still working but will eventually be deprecated).
- If you add headers that is unique per request, for example `X-Request-Id`, then Tyk will create an aggregation point per request, i.e. the number of these tags in a document of a single hour will be equal to the number of requests. 
Since there's no real value in aggregating something that has a total of 1 and also the hourly aggregation documents can grow very quickly, we recommend to add this prefix to `ignore_tag_prefix_list` as follows:

    `"ignore_tag_prefix_list": [ "x-request-id" ],`
