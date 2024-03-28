---
date: 2017-03-24T16:14:31Z
title: Capturing detailed logs
menu:
  main:
    parent: Tyk Pump
weight: 8
aliases:
  - /analytics-and-reporting/useful-debug-modes
---

If you've seen the documentation for Tyk Dashboard's [log browser]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}}), then you'll also be wondering how to set up your Tyk configuration to enable detailed request logging.

### What is detailed request logging?
When [detailed request logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording" >}}) is enabled, Tyk will record the request and response in wire-format in the analytics database. This can be very useful when trying to debug API requests to see what went wrong for a user or client.

This mode is configured in the gateway and can be enabled at the [system]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-gateway-level" >}}), [API]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-api-level" >}}) or [access key]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-key-level" >}}) level.

You will also need your Tyk Pump configured to move data into your preferred data store.

#### Disabling detailed recording for a particular pump
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
