---
date: 2017-03-24T12:35:05Z
title: Instrumentation
menu:
  main:
    parent: "Report , Monitor and Trigger Events"
weight: 6 
---

The Tyk Dashboard, Pump and Gateway use StatsD monitoring. StatsD is a network daemon that listens for statistics, like counters and timers, sent over UDP or TCP and sends aggregates to one or more pluggable backend services. For more information on StatsD see [here][1].

Additionally, starting from 1.5, Gateway support NewRelic instrumentation, see below.

## <a name="settings"></a>Settings

Each Tyk component supports `statsd_connection_string`. Additionally you can set `statsd_prefix` to a custom prefix value. For example separate settings for production and staging. In order to enable instrumentation, you will need to set the environment variable: `TYK_INSTRUMENTATION=1`.

## <a name="pump-specific"></a>Pump Specific Settings

The Pump also requires setting the following environment variable: `TYK_INSTRUMENTATION=1`

## <a name="statsd-keys"></a>StatsD Keys

There are plenty of StatsD keys available when you enable statsd, but these are the basics:

### Gateway

Tyk Gateway traffic itself: `gauges.<prefix>.Load.rps` (requests per second)
Tyk Gateway API: `counters.<prefix>.SystemAPICall.called.count` (calls count) and `timers.<prefix>.SystemAPICall.success` (response time)

### Dashboard

Dashboard: `counters.<prefix>.SystemAPICall.SystemCallComplete.count` (requests count), `counters.<prefix>.DashSystemAPIError.*` (api error reporting)

### Pump

Pump: `counters.<prefix>.record.count` (number of records processed by pump)


## <a name="newrelic"></a>NewRelic instrumentation

Supported only by Tyk Gateway, starting from 2.5. Add the following config section to `tyk.conf` to make it work:
```
"newrelic": {
  "app_name": "<app-name>",
  "license_key": "<license_key>"
}
```


[1]: https://github.com/etsy/statsd
