---
title: Rate Limits Overview
description: Explains an overview of rate limits
tags: [ "Tyk Streams", "Rate Limits" ]
---

A rate limit is a strategy for limiting the usage of a shared resource across parallel components in a Tyk Streams instance, or potentially across multiple instances. They are configured as a resource:

```yaml
rate_limit_resources:
  - label: foobar
    local:
      count: 500
      interval: 1s
```

And most components that hit external services have a field `rate_limit` for specifying a rate limit resource to use. For example, if we wanted to use our `foobar` rate limit with a HTTP request:

```yaml
input:
  http_client:
    url: TODO
    verb: GET
    rate_limit: foobar
```

By using a rate limit in this way we can guarantee that our input will only poll our HTTP source at the rate of 500 requests per second.

<!-- TODO: when rate-limit processor supported:
Some components don't have a `rate_limit` field but we might still wish to throttle them by a rate limit, in which case we can use the rate_limit processor that applies back pressure to a processing pipeline when the limit is reached. For example:

```yaml
input:
  http_server:
    path: /post
output:
  http_server:
    ws_path: /subscribe
pipeline:
  processors:
    - rate_limit:
        resource: example_rate_limit
rate_limit_resources:
  - label: example_rate_limit
    local:
      count: 3
      interval: 20s
```
-->
