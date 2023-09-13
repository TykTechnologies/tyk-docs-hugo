---
date: 2023-08-29T13:32:12Z
title: OpenTelemetry With Dynatrace
tags: ["distributed tracing", "OpenTelemetry", "Dynatrace"]
description: "This guide explains how to setup Dynatrace to collect OpenTelemetry traces via the OpenTelemetry (OTel Collector) using Docker"
---

This documentation covers how to set up Dynatrace to ingest OpenTelemetry traces via the OpenTelemetry Collector (OTel Collector) using Docker.

### Prerequisites

- [Docker installed on your machine](https://docs.docker.com/get-docker/)
- [Dynatrace account](https://www.dynatrace.com/)
- Dynatrace Token
- Gateway v5.2.0 or higher
- OTel Collector [docker image](https://hub.docker.com/r/otel/opentelemetry-collector)

## Setting Up

### Step 1: Generate Dynatrace Token

1. In the Dynatrace console, navigate to access keys.
2. Click on _Create a new key_
3. You will be prompted to select a scope. Choose _Ingest OpenTelemetry_ traces.
4. Save the generated token securely; it cannot be retrieved once lost.

Example of generated token:

```bash
dt0c01.6S7TPXYTETMDKQK46HWDD7AI.FGH2Z5RMHFH4N4IUIOMPH4RVGQT3HVC5DSEY7ZGC4NYIXB63F5BGJKKTY9UT7VAM
```

### Step 2: Configuration Files

#### 1. OTel Collector Configuration File

Create a YAML file named `otel-collector-config.yml`. In this file replace `<YOUR-ENVIRONMENT-STRING>` with the string from the address bar when you log into Dynatrace. Replace `<YOUR-DYNATRACE-API-KEY>` with the token you generated earlier.

Here's a sample configuration file:

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
processors:
  batch:
exporters:
  otlphttp:
    endpoint: "https://<YOUR-ENVIRONMENT-STRING>.live.dynatrace.com/api/v2/otlp"
    headers:
      Authorization: "Api-Token <YOUR-DYNATRACE-API-KEY>" # You must keep 'Api-Token', just modify <YOUR-DYNATRACE-API-KEY>
extensions:
  health_check:
  pprof:
    endpoint: :1888
  zpages:
    endpoint: :55679
service:
  extensions: [pprof, zpages, health_check]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp]
```

#### 2. Docker Compose File

Create a file named docker-compose.yml.

Here is the sample Docker Compose file:

```yaml
version: "3.9"
services:
  otel-collector:
    image: otel/opentelemetry-collector:latest
    volumes:
      - ./configs/otel-collector-config.yml:/etc/otel-collector.yml
    command: ["--config=/etc/otel-collector.yml"]
    networks:
      - tyk
    ports:
      - "1888:1888" # pprof extension
      - "13133:13133" # health_check extension
      - "4317:4317" # OTLP gRPC receiver
      - "4318:4318" # OTLP http receiver
      - "55670:55679" # zpages extension
networks:
  tyk:
```

### Step 3: Testing and Viewing Traces

**1.** Launch the Docker containers: docker-compose up -d

**2.** Initialize your Tyk environment.

**3.** Configure a basic HTTP API on the Tyk Gateway or Dashboard.

**4.** Use cURL or Postman to send requests to the API gateway.

**5.** Navigate to Dynatrace -> Services -> Tyk-Gateway.

**6.** Wait for 5 minutes and refresh.

**7.** Traces, along with graphs, should appear. If they don't, click on the "Full Search" button.

### Step 4: Troubleshooting

- If traces are not appearing, try clicking on the "Full Search" button after waiting for 5 minutes.
  Make sure your Dynatrace token is correct in the configuration files.
- Validate the Docker Compose setup by checking the logs for any errors: `docker-compose logs`

And there you have it! You've successfully integrated Dynatrace with the OpenTelemetry Collector using Docker.
