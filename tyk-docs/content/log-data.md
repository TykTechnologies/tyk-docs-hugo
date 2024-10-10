---
date: 2017-03-24T12:53:50Z
title: Logging system and API events
tags: ["logging", "observability", "system events", "logs", "log format"]
aliases:
  - "/advanced-configuration/log-data"
---

Tyk will log **system events** to `stderr` and `stdout`.

In a typical installation, these will be handled or redirected by the service manager running the process, and depending on the Linux distribution, will either be output to `/var/log/` or `/var/log/upstart`.

Tyk will try to output structured logs, and so will include context data around request errors where possible.

If configured, then a [logging event handler]({{< ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/log-handlers" >}}) will also report **API events** to the configured log output.

When contacting support, you may be asked to change the logging level as part of the support handling process. See [Support Information]({{< ref "troubleshooting/tyk-gateway/support-information" >}}) for more details.

## Configuring Tyk logs

Log data is usually of the Error level and higher, though you can enable Debug mode reporting by adding the `--debug` flag to the process run command.

There are four levels of verbosity of logging that Tyk can generate:
- `debug` which generates a high volume of logs and is not recommended for live
- `info` is the default logging level
- `warn` will log only warnings and errrors
- `error` is the most minimal level of logging, reporting only errors

You can set the logging verbosity in two ways:
1. Via an Environment Variable to affect [all Tyk components]({{< ref "log-data#setting-log-verbosity-for-all-tyk-components" >}})
2. Just for the [Gateway]({{< ref "log-data#setting-log-verbosity-for-the-gateway-only" >}}) via your `tyk.conf` config file 

{{< warning success >}}
**Warning**  

Debug mode generates a lot of output and is not recommended except when debugging.
{{< /warning >}}

### Setting log verbosity for all Tyk components

You can control the log verbosity across all installed Tyk components using the `TYK_LOGLEVEL` environment variable.

Tyk support can advise you which verbosity setting to use.

### Setting log verbosity for the Gateway Only

Sometimes you will want to have more detailed logging for the Tyk Gateway than for the other components, so there is an individual control for you to set the logging level in your `tyk.conf`:

```json
{
  "log_level": "info"
}
```

If unset or left empty, it will default to `info`. 

### Setting log format (only available for the Gateway)

As of Tyk Gateway versions LTS `v5.3.6` and `v5.6.0`, you can control log format using the `TYK_LOGFORMAT` environment variable. By default, logs are in `default` format, but setting `TYK_LOGFORMAT` to `json` will output logs in JSON format.

##### Default logging format
```
time="Sep 05 09:04:12" level=info msg="Tyk API Gateway v5.6.0" prefix=main
```

##### JSON logging format
```json
{"level":"info","msg":"Tyk API Gateway v5.6.0","prefix":"main","time":"2024-09-05T09:01:23-04:00"}
```
{{< note >}}
**Note**  
As a general performance tip, the `json` output format incurs less memory allocation overhead than the default logger. For optimal performance, it's recommended to configure logging in the JSON format.
{{< /note >}}

## Integration with 3rd party aggregated log and error tools

Tyk can be configured to send log data from multiple Tyk processes to a 3rd party server for aggregation and analysis.

The following servers are supported:
- [Sentry](#aggregated-logs-with-sentry)
- [Logstash](#aggregated-logs-with-logstash)
- [Graylog](#aggregated-logs-with-graylog)
- [Syslog](#aggregated-logs-with-syslog)

### Aggregated logs with Sentry

To enable Sentry as a log aggregator, update these settings in both your `tyk.conf` and your `tyk_analytics.conf`:

*   `use_sentry`: Set this to `true` to enable the Sentry logger, you must specify a Sentry DSN under `sentry_code`.

*   `sentry_code`: The Sentry-assigned DSN (a kind of URL endpoint) that Tyk can send log data to.

### Aggregated logs with Logstash

To enable Logstash as a log aggregator, update these settings in your `tyk.conf`:

*   `use_logstash`: Set this to `true` to enable the Logstash logger.

*   `logstash_transport`: The Logstash transport to use, should be `"tcp"`.

*   `logstash_network_addr`: Set to the Logstash client network address, should be in the form of `hostname:port`.

### Aggregated logs with Graylog

To enable Graylog as a log aggregator, update these settings in your `tyk.conf`:

*   `use_graylog`: Set this to `true` to enable the Graylog logger.

*   `graylog_network_addr`: The Graylog client address in the form of `<graylog_ip>:<graylog_port>`.

### Aggregated logs with Syslog

To enable Syslog as a log aggregator, update these settings in your `tyk.conf`:

*   `use_syslog`: Set this to `true` to enable the Syslog logger.

*   `syslog_transport`: The Syslog transport to use, should be `"udp"` or empty.

*   `syslog_network_addr`: Set to the Syslog client network address, should be in the form of `hostname:port`
