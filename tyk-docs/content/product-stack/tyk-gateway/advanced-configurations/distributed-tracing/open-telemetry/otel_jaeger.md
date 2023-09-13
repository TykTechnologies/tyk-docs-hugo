---
date: 2023-08-29T13:32:12Z
title: OpenTelemetry With Jaeger
tags: ["distributed tracing", "OpenTelemetry", "Jaeger"]
description: "This guide explains how to setup Tyk Gateway with OpenTelemetry and Jager to enhance API Observability"
---

This comprehensive guide provides a step-by-step walkthrough on setting up Tyk Gateway with OpenTelemetry and Jaeger to enhance API observability. We will go through installing necessary components, configuring them, and ensuring they work in unison.

## Prerequisites

- [Docker installed on your machine](https://docs.docker.com/get-docker/)
- Gateway v5.2.0 or higher
- OTel Collector [docker image](https://hub.docker.com/r/otel/opentelemetry-collector)

### Step 1: Tyk Gateway Configuration

For Tyk Gateway to work with OpenTelemetry, modify the default Tyk configuration to include the following OpenTelemetry settings:

```json
{
  "opentelemetry": {
    "enabled": true,
    "exporter": "grpc",
    "endpoint": "localhost:4317"
  }
}
```

Note that the `endpoint` value is the address of the OpenTelemetry Collector. We will set this up in the next step.

Also, you can modify the `exporter` value to `http` if you want to use the HTTP protocol instead of gRPC.

### Step 2: Create the Docker-Compose File for Jaeger and OpenTelemetry Collector

#### Option 1: Using Docker Compose

Save the following YAML configuration to a file named `docker-compose.yml`.

```yaml
version: "2"
services:
  # Jaeger: Distributed Tracing System
  jaeger-all-in-one:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686" # Jaeger UI
      - "14268:14268" # Collector port
      - "14250:14250" # gRPC port

  # OpenTelemetry Collector
  collector-gateway:
    image: otel/opentelemetry-collector:latest
    volumes:
      - ./configs/otel-collector.yml:/etc/otel-collector.yml
    command: ["--config=/etc/otel-collector.yml"]
    ports:
      - "1888:1888" # pprof extension
      - "13133:13133" # Health check extension
      - "4317:4317" # OTLP gRPC receiver
      - "4318:4318" # OTLP HTTP receiver
      - "55679:55679" # zPages extension
    depends_on:
      - jaeger-all-in-one
```

Run the services by navigating to the directory containing the docker-compose.yml file and executing:

```bash
docker-compose up
```

#### Option 2: Running Individual Docker Containers

Alternatively, you can run the individual Docker containers as follows:

```bash
docker run --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  jaegertracing/all-in-one:1.35
```

### Step 3: Configure the OpenTelemetry Collector

Create a new YAML configuration file named otel-collector.yml with the following content:

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
  jaeger:
    endpoint: jaeger-all-in-one:14250
    tls:
      insecure: true
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
      exporters: [jaeger]
```

### Step 4: Run OSS Tyk Gateway with OpenTelemetry and Jaeger

To run Tyk Gateway, you can extend the previous Docker Compose file to include Tyk Gateway and Redis services. Make sure to include the environment variables to configure OpenTelemetry in Tyk Gateway.

```yaml
# ... Existing docker-compose.yml content for jaeger and otel-collector

tyk:
  image: tykio/tyk-gateway:v5.2.0
  ports:
    - 8080:8080
  environment:
    - TYK_GW_OPENTELEMETRY_ENABLED=true
    - TYK_GW_OPENTELEMETRY_EXPORTER=grpc
    - TYK_GW_OPENTELEMETRY_ENDPOINT=otel-collector:4317
  volumes:
    - ${TYK_APPS:-./apps}:/opt/tyk-gateway/apps
  depends_on:
    - redis

redis:
  image: redis:4.0-alpine
  ports:
    - 6379:6379
  command: redis-server --appendonly yes
```

{{< note success >}}
**Note**

Indicate the folder containing your APIs by setting the [TYK_GW_APPPATH](https://tyk.io/docs/tyk-oss-gateway/configuration/#app_path) environment variable. By default, the apps folder in the Docker Compose file's location will be used for loading the APIs.
{{< /note >}}

To run all services, execute:

```bash
docker-compose up
```

By following this guide, you should now have a Tyk Gateway setup integrated with OpenTelemetry and Jaeger, providing a powerful observability solution for your APIs.

{{< img src="/img/distributed-tracing/opentelemetry/jaeger-metrics.png" alt="Jaeger Metrics" >}}

</br>
</br>


# Deploying Tyk Gateway with OpenTelemetry and Jaeger on Kubernetes

## Prerequisites

- A running Kubernetes cluster
- kubectl and helm CLI tools installed

### Step 1: Install Jaeger Operator

For the purpose of POC/demo, we can use jaeger-all-in-one, which includes the Jaeger agent, collector, query, and UI in a single pod with in-memory storage.

#### Installation via Jaeger Operator

1. Follow the Jaeger Operator installation guide: [Jaeger Operator Documentation](https://www.jaegertracing.io/docs/1.48/operator/).

2. After the Jaeger Operator is deployed to the `observability` namespace, create a Jaeger instance:

```bash

kubectl apply -n observability -f - <<EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger-all-in-one
EOF
```

{{< note success >}}
**Note**

The Jaeger UI will be available at `jaeger-all-in-one-query:16686`.
{{< /note >}}

### Step 2: Configure OpenTelemetry Collector

#### 1. Create a configuration YAML file, `otel-collector-config.yaml`:

```yaml
mode: deployment
config:
  receivers:
    otlp:
      protocols:
        http:
          endpoint: ${env:MY_POD_IP}:4318
        grpc:
          endpoint: ${env:MY_POD_IP}:4317
  processors:
    batch: {}
  exporters:
    jaeger:
      endpoint: "jaeger-all-in-one-collector.observability.svc.cluster.local:14250"
      tls:
        insecure: true
  extensions:
    health_check: {}
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
        exporters: [jaeger]
```

#### 2. Install the OpenTelemetry Collector via Helm:

```bash
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm install tyk-otel-collector open-telemetry/opentelemetry-collector -n tyk --version 0.62.0 -f otel-collector-config.yaml
```

### Step 3: Configure Tyk Gateway

#### 1. Configure OpenTelemetry in Tyk by setting environment variables:

You can enable OpenTelemetry in Tyk by modifying its configuration as follows:

```json
{
  "opentelemetry": {
    "enabled": true,
    "exporter": "grpc",
    "endpoint": "tyk-otel-collector-opentelemetry-collector:4317"
  }
}
```

Alternatively, set the environment variables in your deployment:

```bash
TYK_GW_OPENTELEMETRY_ENABLED=true
TYK_GW_OPENTELEMETRY_EXPORTER=grpc
TYK_GW_OPENTELEMETRY_ENDPOINT=tyk-otel-collector-opentelemetry-collector:4317
```

#### 2. Install/Upgrade Tyk using Helm:

To install or upgrade Tyk using Helm, execute the following commands:

```bash
NAMESPACE=tyk
APISecret=foo
TykVersion=v5.2.0

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install
helm upgrade tyk-otel tyk-helm/tyk-oss -n $NAMESPACE --create-namespace --devel \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.pass="$(kubectl get secret --namespace $NAMESPACE tyk-redis -o jsonpath='{.data.redis-password}' | base64 -d)" \
  --set tyk-gateway.gateway.image.tag=$TykVersion \
  --set "tyk-gateway.gateway.extraEnvs[0].name=TYK_GW_OPENTELEMETRY_ENABLED" \
  --set-string "tyk-gateway.gateway.extraEnvs[0].value=true" \
  --set "tyk-gateway.gateway
```
