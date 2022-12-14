---
date: 2017-03-24T12:35:05Z
title: Instrumentation
tags: ["Monitoring", "StatsD", "NewRelic"]
description: "How to configure StatsD and NewRelic monitoring in Tyk"
menu:
  main:
    parent: "Report, Monitor and Trigger Events"
weight: 6 
aliases:
  - /report-monitor-trigger-events/instrumentation/
---

The Tyk Dashboard, Pump and Gateway use StatsD monitoring. StatsD is a network daemon that listens for statistics, like counters and timers, sent over UDP or TCP and sends aggregates to one or more pluggable backend services. See [StatsD](https://github.com/etsy/statsd) For more information.

Additionally, starting from Tyk Gateway v2.5, we support NewRelic instrumentation, see [NewRelic](#newrelic) for more details.

## Settings

Each Tyk component supports `statsd_connection_string`. Additionally you can set `statsd_prefix` to a custom prefix value. For example separate settings for production and staging. In order to enable instrumentation, you will need to set the environment variable: `TYK_INSTRUMENTATION=1`.

## Pump Specific Settings

The Pump also requires setting the following environment variable: `TYK_INSTRUMENTATION=1`

## StatsD Keys

There are plenty of StatsD keys available when you enable statsd, but these are the basics:

### Gateway

Tyk Gateway traffic itself: `gauges.<prefix>.Load.rps` (requests per second)
Tyk Gateway API: `counters.<prefix>.SystemAPICall.called.count` (calls count) and `timers.<prefix>.SystemAPICall.success` (response time)

### Dashboard

Dashboard: `counters.<prefix>.SystemAPICall.SystemCallComplete.count` (requests count), `counters.<prefix>.DashSystemAPIError.*` (api error reporting)

### Pump

Pump: `counters.<prefix>.record.count` (number of records processed by pump)


## NewRelic instrumentation

Supported only by the Tyk Gateway, starting from v2.5. Add the following config section to `tyk.conf` to make it work:
```
"newrelic": {
  "app_name": "<app-name>",
  "license_key": "<license_key>"
}
```
