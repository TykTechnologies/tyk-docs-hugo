---
title: Detailed recording of traffic analytics
date: 2024-01-24
description: "Recording full detail in traffic analytics"
tags: ["detailed recording", "traffic analytics", "analytics", "transaction logs", "traffic monitoring", "configuration"]
---

When [traffic analytics]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic" >}}) are enabled the Gateway will not, by default, include the request and response payloads in these transaction records. This minimizes the size of the records and also avoids logging any sensitive content.

You can, however, configure Tyk to capture the payloads in the transaction records if required. This can be particularly useful during development and testing phases or when debugging an issue with an API.

This is referred to as detailed recording and can be enabled at different levels of granularity. The order of precedence is:
1. [API level]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-api-level" >}})
2. [Key level]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-key-level" >}})
3. [Gateway level]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#configuration-at-the-gateway-level" >}})

Consequently, Tyk will first check whether the API definition has detailed recording enabled to determine whether to log the request and response bodies. If it does not, then it will check the key being used in the request and finally it will check the Gateway configuration.

{{< note success >}}
**Note**  

Be aware that enabling detailed recording greatly increases the size of the records and will require significantly more storage space as Tyk will store the entire request and response in wire format.
<br>
<br>
Tyk Cloud users can enable detailed recording per-API following the instructions on this page or, if required at the Gateway level, via a support request. The traffic analytics are subject to the subscription's storage quota and so we recommend that detailed logging only be enabled if absolutely necessary to avoid unnecessary costs.
{{< /note >}}

### Configuration at the API level

You can enable detailed recording at a granular level (only for specific APIs) using configuration within the API definition.

#### Detailed recording with Tyk OAS APIs

When working with Tyk OAS APIs, you should configure `detailedActivityLogs: "true"` in the `x-tyk-api-gateway.server` object, for example:

```json {hl_lines=["31-33"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-detailed-recording",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/xml": {
            "get": {
                "operationId": "xmlget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-detailed-recording",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "detailedActivityLogs": {
                "enabled": true
            },
            "listenPath": {
                "value": "/example-detailed-recording/",
                "strip": true
            }
        }
    }
}
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out detailed recording. It will generate detailed transaction records for all calls made to the `/example-detailed-recording` API.

In the Dashboard UI, you can configure detailed recording using the Enable Detailed Activity Logs option in the API Designer.

{{< img src="/img/dashboard/api-designer/tyk-oas-detailed-logs.png" alt="Enabling detailed activity logs for a Tyk OAS API" >}}

#### Detailed recording with Tyk Classic APIs

When working with Tyk Classic APIs, you should configure `enable_detailed_recording: "true"` in the root of the API definition:

```
"enable_detailed_recording": true
```

In the Dashboard UI, you can configure detailed recording using the Enable Detailed Logging option in Core Settings.

{{< img src="/img/dashboard/endpoint-designer/classic-detailed-logging.png" alt="Enabling detailed activity logs for a Tyk Classic API" >}}

### Configuration at the key level
An alternative approach to controlling detailed recording is to enable it only for specific [access keys]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}). This is particularly useful for debugging purposes where you can configure detailed recording only for the key(s) that are reporting issues.

You can enable detailed recording for a key simply by adding the following to the root of the key's JSON file:

```
"enable_detailed_recording": true
```
{{< note success >}}
**Note**  

This will enable detailed recording only for API transactions where the key is used in the request.
{{< /note >}}

### Configuration at the gateway level
Detailed recording can be configured at the system level, affecting all APIs deployed on the Gateway, by enabling the [detailed recording]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_detailed_recording" >}}) option in `tyk.conf`.

```.json
{
    "enable_analytics" : true,
    "analytics_config": {
        "enable_detailed_recording": true
    }
}
```
