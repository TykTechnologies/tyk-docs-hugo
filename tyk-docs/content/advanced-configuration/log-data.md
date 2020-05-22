---
date: 2017-03-24T12:53:50Z
title: Log Data
weight: 7
menu: 
  main:
    parent: "Advanced Configuration"
url: "/advanced-configuration/log-data"
---

## <a name="logging"></a> Logging

Tyk will log its output to `stderr` and `stdout`. In a typical installation, these will be handled or redirected by the service manager running the process, and depending on the Linux distribution, will either be output to `/var/log/` or `/var/log/upstart`.

Tyk will try to output structured logs, and so will include context data around request errors where possible.

### <a name="logging-level"></a> Logging level

Log data is usually of the Error level and higher, though you can enable Debug mode reporting by adding the `--debug` flag to the process run command.

> **Warning**: Debug mode logging generates a lot of output and is not recommended.

From v2.4 you can set a logging level via the `tyk.conf` file. The following levels can be set:

* debug
* info
* warn
* error

If unset or left empty, it will default to `info`. See [log_level](/docs/configure/tyk-gateway-configuration-options/#a-name-log-level-a-log-level) for more details.

## <a name="aggregated-logs"></a> Integration with 3rd party aggregated log and error tools

### <a name="aggregated-logs-with-sentry"></a> Aggregated logs with Sentry

Tyk's logger supports multiple back-ends, the one that currently ships with Tyk is the Sentry hook. This makes it possible to send log data from multiple Tyk processes to a Sentry server in order to monitor the context around HTTP errors and other notifications created by Tyk.

To enable Sentry as a log aggregator, update these settings in both your `tyk.conf` and your `tyk_analytics.conf`:

*   `use_sentry`: Set this to `true` to enable the Sentry logger, you must specify a Sentry DSN under `sentry_code`.

*   `sentry_code`: The Sentry-assigned DSN (a kind of URL endpoint) that Tyk can send log data to.

### <a name="aggregated-logs-with-logstash"></a> Aggregated logs with Logstash

Tyk's logger supports multiple back-ends, as of v2.3 Logstash is a supported log aggregation back end.

To enable Logstash as a log aggregator, update these settings in your `tyk.conf`:

*   `use_logstash`: Set this to `true` to enable the Logstash logger.

*   `logstash_transport`: The Logstash transport to use, should be `"tcp"`.

*   `logstash_network_addr`: Set to the Logstash client network address, should be in the form of `hostname:port`.

### <a name="aggregated-logs-with-graylog"></a> Aggregated logs with Graylog

Tyk's logger supports multiple back-ends, as of v2.3 Graylog is a supported log aggregation back end.

To enable Graylog as a log aggregator, update these settings in your `tyk.conf`:

*   `use_graylog`: Set this to `true` to enable the Graylog logger.

*   `graylog_network_addr`: The Graylog client address in the form of `<graylog_ip>:<graylog_port>`.

### <a name="aggregated-logs-with-syslog"></a> Aggregated logs with Syslog

Tyk's logger supports multiple back-ends, as of v2.3 Syslog is a supported log aggregation back end.

To enable Syslog as a log aggregator, update these settings in your `tyk.conf`:

*   `use_syslog`: Set this to `true` to enable the Syslog logger.

*   `syslog_transport`: The Syslog transport to use, should be `"udp"` or empty.

*   `syslog_network_addr`: Set to the Syslog client network address, should be in the form of `hostname:port`







