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

{{< include "api-def-custom-analytics" >}}
### Configuration:

In the Dashboard, with an API configured, click in to your newly created API and head to Advanced Options. 

Navigate down to the Tag Headers section and pass in `X-Request-Id` to the Header Tag array. 

{{< img src="/img/custom-analytics-tags/tag-headers.png" alt="Tag Headers" >}}

Using your preferred HTTP client, pass the `X-Request-Id` header and make a request to test out your work.

{{< img src="/img/custom-analytics-tags/curl-request.png" alt="Request" >}}

Navigate back to the Dashboard and select the Log Browser to view detailed logging. Under Gateway Metadata, we can find the Tags attached to our request and should be able to see the header and value was injected as a tag.

{{< img src="/img/custom-analytics-tags/log-browser.png" alt="Log Browser" >}}

This is useful if you wish to track aggregate API requests.  For example
- Show me all API requests where `tenant-id=123` 
- Show me all API requests where `user-id=abc`

And so-on.  We can now have Tyk track API requests which contain our business logic.