---
date: 2024-02-14T13:32:12Z
title: How to integrate with Elasticsearch
tags: ["distributed tracing", "OpenTelemetry", "Elastic", "Elasticsearch", "ELK", "API Observability", "Observability"]
description: "This guide explains how to integrate Tyk Gateway with OpenTelemetry and Elasticsearch to enhance API Observability"
---

This quick start explains how to configure Tyk API Gateway (OSS, self-managed or hybrid gateway connected to Tyk Cloud) with the OpenTelemetry Collector to export distributed traces to [Elasticsearch](https://www.elastic.co/observability).

## Prerequisites

Ensure the following prerequisites are met before proceeding:

- Tyk Gateway v5.2 or higher
- OpenTelemetry Collector deployed locally
- Elasticsearch deployed locally or an account on Elastic Cloud

Elastic Observability natively supports OpenTelemetry and its OpenTelemetry protocol (OTLP) to ingest traces, metrics, and logs. 

{{< img src="/img/distributed-tracing/opentelemetry/elastic-otel.png" alt="OpenTelemetry support in Elasticsearch" >}}
Credit: Elasticsearch, [OpenTelemetry on Elastic](https://www.elastic.co/blog/opentelemetry-observability)

## Step 1: Configure Tyk API Gateway

To enable OpenTelemetry in Tyk API Gateway, follow these steps:

For Tyk Helm Charts:
* Add the following configuration to the Tyk Gateway section:

```yaml
tyk-gateway:
  gateway:
    opentelemetry:
      enabled: true
      endpoint: {{Add your endpoint here}}
      exporter: grpc
```

For Docker Compose:
* In your docker-compose.yml file for Tyk Gateway, add the following environment variables:

```yaml
environment:
  - TYK_GW_OPENTELEMETRY_ENABLED=true
  - TYK_GW_OPENTELEMETRY_EXPORTER=grpc
  - TYK_GW_OPENTELEMETRY_ENDPOINT={{Add your endpoint here}}
```

Make sure to replace {{Add your endpoint here}} with the appropriate endpoint from your OpenTelemetry collector.

After enabling OpenTelemetry at the Gateway level, you can activate detailed tracing for specific APIs by editing their respective API definitions. Set the `detailed_tracing` option to either true or false. By default, this setting is false.

## Step 2: Configure the OpenTelemetry Collector to Export to Elasticsearch

To configure the OTel Collector with Elasticsearch Cloud, follow these steps:

* Sign up for an Elastic account if you haven't already
* Once logged in to your Elastic account, select "Observability" and click on the option "Monitor my application performance"

{{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-01.png" alt="Configure Elasticsearch" >}}

* Scroll down to the APM Agents section and click on the OpenTelemetry tab

{{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-02.png" alt="Configure Elasticsearch" >}}

* Search for the section "Configure OpenTelemetry in your application". You will need to copy the value of "OTEL_EXPORTER_OTLP_ENDPOINT" and "OTEL_EXPORTER_OTLP_HEADERS" in your OpenTelemetry Collector configuration file.

{{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-03.png" alt="Configure Elasticsearch" >}}

* Update your OpenTelemetry Collector configuration, here's a simple example:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317 # OpenTelemetry receiver endpoint
processors:
  batch:
exporters:
 otlp/elastic:
    endpoint: "ELASTIC_APM_SERVER_ENDPOINT_GOES_HERE" #without HTTPS://  
    headers:
      # Elastic APM Server secret token
      Authorization: "Bearer ELASTIC_APM_SECRET_TOKEN_GOES_HERE"
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [otlp/elastic]
```

If are running Elasticsearch locally, you will need to use your APM Server endpoint (elastic-apm-server:8200) and set-up [a secret token authorization in ElasticSearch](https://www.elastic.co/guide/en/observability/current/secret-token.html).

You can refer to the [example configuration provided by Elastic](https://www.elastic.co/guide/en/observability/current/open-telemetry-direct.html#connect-open-telemetry-collector) for more guidance on the OpenTelemetry Collector configuration.

## Step 3: Explore OpenTelemetry Traces in Elasticsearch

- Explore OpenTelemetry Traces in Elasticsearch
- In Elasticsearch Cloud:
  - Go to "Home" and select "Observability."
  {{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-04.png" alt="Configure Elasticsearch" >}}
  - On the right menu, click on "APM / Services."
  - Click on "tyk-gateway."

You will see a dashboard automatically generated based on the distributed traces sent by Tyk API Gateway to Elasticsearch.

{{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-05.png" alt="Configure Elasticsearch" >}}

Select a transaction to view more details, including the distributed traces:

{{< img src="/img/distributed-tracing/opentelemetry/elastic-configure-otel-06.png" alt="Configure Elasticsearch" >}}


