---
date: 2017-03-23T16:58:50Z
title: Tyk and OWASP Top Ten Threats
menu:
  main:
    parent: "Security"
weight: 9 
---

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. The current version is 2017. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the 2017 top ten threats and how Tyk guards against them:

## 1 - Injection

Tyk does not validate incoming traffic for SQL injections or similar attacks, but you can use a 3rd party validator with a [plugin](https://tyk.io/docs/customise-tyk/plugins/), which will filter all requests. Additionally you can protect yourself against DNS attacks, where your upstream could be compromised by using [certificate pinning](https://tyk.io/docs/security/certificate-pinning/).

## 2 - Broken Authentication

One of Tyk's main functions is to handle authentication. So unless a configured policy or a created a key has not been setup correctly, Tyk will handle it.

## 3 - Sensitive Data Exposure

You can use the Tyk [whitelist](https://tyk.io/docs/transform-traffic/endpoint-designer/#whitelist) plugin to explicitly specify a list of allowed endpoints. you can also specify per [path access](https://tyk.io/docs/security/security-policies/secure-apis-method-path/) at a policy level in access rules. You also can use [Tyk Analytics](https://tyk.io/docs/analyse/redis-mongodb-sizing/#a-name-analytics-a-analytics) to check for anomalies.

## 4 - XML External Entities (XXE)

Tyk does not process XML, unless it explicitly specified with [body transforms](https://tyk.io/docs/transform-traffic/endpoint-designer/#body-transform). Even if such transforms are performed, our processor does not evaluate external entity references.

## 5 - Broken Access Control

See number 2 and 3

## 6 - Security Misconfiguration

Tyk can be configured with TLS with all the modern ciphers. Tyk does not expose sensitive data to logs or analytics unless specified by setting a [higher log level](https://tyk.io/docs/log-data/), enabling [key logging](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-enable-key-logging-a-enable-key-logging), or enabling detailed recording.

## 7 - Cross-Site Scripting (XSS)

Tyk does not work at this level, unless you write some custom logic in a [plugin](/docs/customise-tyk/plugins/).

## 8 - Insecure Deserialization

Tyk usually acts as a centralized service bus, which reduces the deserialization of services.

## 9 - Using Components with Known Vulnerabilities

Our patch release schedule is very agile, and in the case of security issues we close them as soon as possible. We try to upgrade components we have with any found vulnerabilities and try to compile Tyk with latest stable version of Go.

## 10 - Insufficient Logging and Monitoring

Based on [OWASP logging cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) Tyk provides information and feedback in various ways: 
- [Logs of multiple verbosity](/docs/advanced-configuration/log-data/), depending on your situation.
- Integration with [3rd party aggregated log and error tools](/docs/advanced-configuration/log-data/#integration-with-3rd-party-aggregated-log-and-error-tools) - Tyk logger supports multiple back-ends such as Sentry, Graylog and Logstash.
- System level [analytics](/docs/basic-config-and-security/report-monitor-trigger-events/instrumentation/) exposed via StatsD and various other loggers (instrumentation). 
- Request analytics with different ways of [detailed recording](/docs/analytics-and-reporting/useful-debug-modes/) on the request level and the key level. Data per data, including its content can be viewed in real-time in Tyk Dashboard. You can also choose to send the data to an [external services](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/#supported-backends) and used to analyze your logs.
- [OpenTracing](/docs/advanced-configuration/opentracing/) to allow services, which have distributed tracing enabled, for instrumentation to work seamless with Tyk gateway. 
- [Event handlers](/docs/basic-config-and-security/report-monitor-trigger-events/) - Tyk has the ability to configure APIs with event handlers to log data or fire webhooks when an event occurs. [Events](/docs/basic-config-and-security/report-monitor-trigger-events/event-types/) could represent an authentication failure, exceeded rate-limit, misuse of api version and more.
- [Monitors and events](/docs/basic-config-and-security/report-monitor-trigger-events/monitors/) - Active monitoring of both user & organisations. Provides simple means of notifying stakeholders in the case of traffic abnormalities.
- [Audit logs](/docs/release-notes/version-2.8/#dashboard-audit-log-improvements) for the management layer - to record all activity and changed done by the users of the API Management.
