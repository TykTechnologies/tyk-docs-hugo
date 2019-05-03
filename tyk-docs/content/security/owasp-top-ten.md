---
date: 2017-03-23T16:58:50Z
title: Tyk and OWASP Top Ten Threats
menu:
  main:
    parent: "Security"
weight: 9 
---

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. The current version is 2017. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the 2017 top ten threats and how Tyk guards against them:

## <a name="1-injection"></a>1 - Injection

Tyk does not validate incoming traffic for SQL injections or similar attacks, but you can use a 3rd party validator with a [plugin](https://tyk.io/docs/customise-tyk/plugins/), which will filter all requests. Additionally you can protect yourself against DNS attacks, where your upstream could be compromised by using [certificate pinning](https://tyk.io/docs/security/certificate-pinning/).

## <a name="2-broken-authentication"></a>2 - Broken Authentication

One of Tyk's main functions is to handle authentication. So unless a configured policy or a created a key has not been setup correctly, Tyk will handle it.

## <a name="3-sensitive-data-exposure"></a>3 - Sensitive Data Exposure

You can use the Tyk [whitelist](https://tyk.io/docs/transform-traffic/endpoint-designer/#whitelist) plugin to explicitly specify a list of allowed endpoints. you can also specify per [path access](https://tyk.io/docs/security/security-policies/secure-apis-method-path/) at a policy level in access rules. You also can use [Tyk Analytics](https://tyk.io/docs/analyse/redis-mongodb-sizing/#a-name-analytics-a-analytics) to check for anomalies.

## <a name="4-xml-external-entities"></a>4 - XML External Entities (XXE)

Tyk does not process XML, unless it explicitly specified with [body transforms](https://tyk.io/docs/transform-traffic/endpoint-designer/#body-transform). Even if such transforms are performed, our processor does not evaluate external entity references.

## <a name="5-broken-access"></a>5 - Broken Access Control

See number 2 and 3

## <a name="6-security-misconfiguration"></a>6 - Security Misconfiguration

Tyk can be configured with TLS with all the modern ciphers. Tyk does not expose sensitive data to logs or analytics unless specified by setting a [higher log level](https://tyk.io/docs/log-data/), enabling [key logging](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-enable-key-logging-a-enable-key-logging), or enabling detailed recording.

## <a name="7-cross-site-scripting"></a>7 - Cross-Site Scripting (XSS)

Tyk does not work at this level, unless you write some custom logic in a [plugin](https://tyk.io/docs/customise-tyk/plugins/).

## <a name="8-insecure-deserialization"></a>8 - Insecure Deserialization

Tyk usually acts as a centralized service bus, which reduces the deserialization of services.

## <a name="9-known-vulnerabilities"></a> 9 - Using Components with Known Vulnerabilities

Our patch release schedule is very agile, and in the case of security issues we close them as soon as possible. We try to upgrade components we have with any found vulnerabilities and try to compile Tyk with latest stable version of Go.

## <a name="10-insufficient-logging-monitoring"></a>10 - Insufficient Logging and Monitoring

We provide [logs of multiple verbosity](https://tyk.io/docs/log-data/), depending on your situation. Tyk provides both system level [analytics](https://tyk.io/docs/analyse/redis-mongodb-sizing/#a-name-analytics-a-analytics), exposed via StatsD and various other loggers, as well as request analytics. These can be viewed in real-time in dashboard, or pumped to external services and used to analyze the logs.

