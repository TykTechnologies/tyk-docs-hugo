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

Configuration:

In the Dashboard, with an API configured, click in to your newly created API and head to Advanced Options. 

Navigate down to the Tag Headers section and pass in `X-Request-Id` to the Header Tag array. 

![Tag Headers](/docs/img/custom-analytics-tags/header-tags-1.png)

In Postman, pass in the header and provide a value for it and make some requests. 

![Postman](/docs/img/custom-analytics-tags/postman-1.png)

Navigate back to the Dashboard and select the Log Browser to view detailed logging. Under Gateway Metadata, we can find the Tags attached to our request and should be able to see the header and value was injected as a tag.

![Headers Injected](/docs/img/custom-analytics-tags/headers-injected-as-tags-1.png)

This can be useful as you filter tags to gain additional information about how your API is being consumed.