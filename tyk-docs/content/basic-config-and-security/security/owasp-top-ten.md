---
date: 2017-03-23T16:58:50Z
title: Tyk and OWASP Top Ten Threats
tags: ["OWASP", "Security", "Top Ten"]
description: "How Tyk guards agains the OWASP top ten threats"
menu:
  main:
    parent: "Security"
weight: 9
---

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. The current version is 2021. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the 2021 top ten threats and how Tyk guards against them:

## 1 - Broken Access Control

See number 2 and 7.

## 2 - Cryptographic Failures

You can use the Tyk [allowlist](https://tyk.io/docs/transform-traffic/endpoint-designer/#allowlist) plugin to explicitly specify a list of allowed endpoints. you can also specify per [path access](https://tyk.io/docs/security/security-policies/secure-apis-method-path/) at a policy level in access rules. You also can use [Tyk Analytics](https://tyk.io/docs/analyse/redis-mongodb-sizing/#a-name-analytics-a-analytics) to check for anomalies.

## 3 - Injection

- Tyk does not validate incoming traffic for SQL injections or similar attacks, but you can use a 3rd party validator with a [plugin](https://tyk.io/docs/customise-tyk/plugins/), which will filter all requests. Additionally you can protect yourself against DNS attacks, where your upstream could be compromised by using [certificate pinning](https://tyk.io/docs/security/certificate-pinning/).

- Tyk does not work at Cross-Site Scripting (XSS) level, unless you write some custom logic in a [plugin]({{< ref "plugins" >}}).

## 4 - Insecure Design


## 5 - Security Misconfiguration

Tyk can be configured with TLS with all the modern ciphers.

- Tyk does not expose sensitive data to logs or analytics unless specified by setting a [higher log level](https://tyk.io/docs/log-data/), enabling [key logging](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-enable-key-logging-a-enable-key-logging), or enabling detailed recording.

- Tyk does not process XML, unless it explicitly specified with [body transforms](https://tyk.io/docs/transform-traffic/endpoint-designer/#body-transform). Even if such transforms are performed, our processor does not evaluate external entity references (XML External Entities).

## 6 - Vulnerable and Outdated Components

Our patch release schedule is very agile, and in the case of security issues we close them as soon as possible. We try to upgrade components we have with any found vulnerabilities and try to compile Tyk with latest stable version of Go.

## 7 - Identification and Authentication Failures

One of Tyk's main functions is to handle authentication. So unless a configured policy or a created a key has not been setup correctly, Tyk will handle it.

## 8 - Software and Data Integrity failures

## 9 - Security Logging and Monitoring Failures

Based on [OWASP logging cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) Tyk provides information and feedback in various ways:
- [Logs of multiple verbosity]({{< ref "log-data" >}}), depending on your situation.
- Integration with [3rd party aggregated log and error tools]({{< ref "log-data#integration-with-3rd-party-aggregated-log-and-error-tools" >}}) - Tyk logger supports multiple back-ends such as Sentry, Graylog and Logstash.
- System level [analytics]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}}) exposed via StatsD and various other loggers (instrumentation).
- Request analytics with different ways of [detailed recording]({{< ref "tyk-stack/tyk-pump/useful-debug-modes" >}}) on the request level and the key level. Data per data, including its content can be viewed in real-time in Tyk Dashboard. You can also choose to send the data to an [external services]({{< ref "tyk-pump/configuration.md#supported-backends" >}}) and used to analyse your logs.
- [OpenTracing]({{< ref "advanced-configuration/opentracing" >}}) to allow services, which have distributed tracing enabled, for instrumentation to work seamless with Tyk gateway. 
- [Event handlers]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) - Tyk has the ability to configure APIs with event handlers to log data or fire webhooks when an event occurs. [Events]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) could represent an authentication failure, exceeded rate-limit, misuse of api version and more.
- [Monitors and events]({{< ref "basic-config-and-security/report-monitor-trigger-events/monitors" >}}) - Active monitoring of both user & organisations. Provides simple means of notifying stakeholders in the case of traffic abnormalities.
- [Audit logs]({{< ref "release-notes/version-2.8.md#dashboard-audit-log-improvements" >}}) for the management layer - to record all activity and changed done by the users of the API Management.

{{< note success >}}
**Note**  

Tyk usually acts as a centralised service bus, which reduces the insecure deserialisation of services.
{{< /note >}}

**Note:** 


## 10 - Server-Side Request Forgery
