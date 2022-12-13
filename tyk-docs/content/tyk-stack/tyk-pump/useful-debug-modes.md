---
date: 2017-03-24T16:14:31Z
title: Useful Debug Modes
menu:
  main:
    parent: Tyk Pump
weight: 8
aliases:
  - /analytics-and-reporting/useful-debug-modes
---

If you've seen the documentation for the log viewer, then you'll also be wondering how to set up your Tyk configuration to enable detail request logging.

### What is detailed request logging?

When this mode is enabled, Tyk will record the request and response in wire-format in the analytics DB. This can be very useful when trying to debug API requests to see what went wrong for a user or client.

### Enabling Detailed Logging

{{< note success >}}
**Note**  

Detailed logging is not available for Tyk Cloud Classic customers.
{{< /note >}}


Enabling detailed logging is very simple and it can be done with either of the following methods:

Enable detailed analytics at the global configuration level. You will need to update your `tyk.conf` file as follows:

```{.copyWrapper}
"enable_analytics" : true,
"analytics_config": {
  "enable_detailed_recording": true
}
```
{{< note success >}}
**Note**  

This will enable detailed recording for all APIs and it also requires the Gateway to be restarted.
{{< /note >}}


Enable detailed analytics at the API level. This involves updating your [API definition]({{< ref "tyk-gateway-api/api-definition-objects" >}}) to include this at the root level:

```{.copyWrapper}
"enable_detailed_recording": true
```
{{< note success >}}
**Note**  

This will enable detailed recording for this API only.
{{< /note >}}


Enable detailed analytics at the key level. You will need to update your key with the following setting. This should also come in at the root level:


```{.copyWrapper}
"enable_detailed_recording": true
```
{{< note success >}}
**Note**  

This will enable detailed recording only for APIs the key is used to access.
{{< /note >}}


Please note that each of these methods have different level of priorities. The
order below describes how the Gateway determines if detailed recording needs to
be enabled:

- API level is checked. If enabled, record detailed logs else go to the next
  step.
- Key level. If enabled, record detailed logs else go to the next
  step.
- Global configuration.

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
