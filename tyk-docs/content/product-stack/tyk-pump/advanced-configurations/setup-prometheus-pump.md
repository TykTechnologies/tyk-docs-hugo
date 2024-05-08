---
title: "Setup Prometheus Pump"
date: 2023-08-01
tags: ["OSS", "Gateways", "Kubernetes"]
description: "Setup Prometheus Pump"
menu:
  main:
    parent: "Tyk Helm Chart"
weight: 2
---

## Introduction

We'll show you how to setup Tyk Pump for Prometheus Service Discovery.

{{< img src="/img/diagrams/pump-prometheus.png" alt="pump-prometheus" >}}

## Example: Integrate with Prometheus using Prometheus Operator

### 1. Setup Prometheus

*Using the prometheus-community/kube-prometheus-stack chart*

In this example, we use [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack), which installs a collection of Kubernetes manifests, [Grafana](http://grafana.com/) dashboards, and [Prometheus rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with [Prometheus](https://prometheus.io/) using the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator).

```bash
helm install prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

This is a useful stack where you can get Prometheus, the Prometheus Operator, and Grafana all deployed and configured in one go.

### 2. Install Tyk Pump with PodMonitor

If you have Prometheus Operator enabled on the cluster, it would look for “PodMonitor” or “ServiceMonitor” resources and scrap from specified port. The only thing you would need to modify here is the helm release name for Prometheus Operator.

Also you can customise Prometheus Custom Metrics based on your analytics needs. We are using `tyk_http_requests_total` and `tyk_http_latency` described [here]({{<ref "/tyk-stack/tyk-pump/other-data-stores/monitor-apis-prometheus">}}) for illustration:

```bash
NAMESPACE=tyk-oss
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2
PromOperator_Release=prometheus-stack
Prometheus_Custom_Metrics='[{"name":"tyk_http_requests_total"\,"description":"Total of API requests"\,"metric_type":"counter"\,"labels":["response_code"\,"api_name"\,"method"\,"api_key"\,"alias"\,"path"]}\,          {              "name":"tyk_http_latency"\,              "description":"Latency of API requests"\,              "metric_type":"histogram"\,              "labels":["type"\,"response_code"\,"api_name"\,"method"\,"api_key"\,"alias"\,"path"]          }]'

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade tyk-oss tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.components.pump=true \
  --set "tyk-pump.pump.backend={prometheus}" \
  --set tyk-pump.pump.prometheusPump.customMetrics=$Prometheus_Custom_Metrics \
  --set tyk-pump.pump.prometheusPump.prometheusOperator.enabled=true \
  --set tyk-pump.pump.prometheusPump.prometheusOperator.podMonitorSelector.release=$PromOperator_Release
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

{{< note success >}}
**Note**

For Custom Metrics, commas are escaped to be used in helm --set command. You can remove the backslashes in front of the commas if you are to set it in values.yaml. We have included an example in the default values.yaml comments section.
{{< /note >}}

### 3. Verification

When successfully configured, you could see the following messages in pump log:

```console
│ time="Jun 26 13:11:01" level=info msg="Starting prometheus listener on::9090" prefix=prometheus-pump                                                  │
│ time="Jun 26 13:11:01" level=info msg="Prometheus Pump Initialized" prefix=prometheus-pump                                                            │
│ time="Jun 26 13:11:01" level=info msg="Init Pump: PROMETHEUS" prefix=main
```

On Prometheus Dashboard, you can see the Pump is listed as one of the target and Prometheus is successfully scrapped from it.

{{< img src="/img/diagrams/pump-prometheus-1.png" alt="pump-prometheus" >}}

You can check our [Guide on Monitoring API with Prometheus]({{<ref "/tyk-stack/tyk-pump/other-data-stores/monitor-apis-prometheus#useful-queries">}}) for a list of useful queries you can setup and use.

e.g. The custom metrics tyk_http_requests_total can be retrieved:

{{< img src="/img/diagrams/pump-prometheus-2.png" alt="pump-prometheus" >}}

{{< img src="/img/diagrams/pump-prometheus-3.png" alt="pump-prometheus" >}}


## Example: Integrate with Prometheus using annotations

### 1. Setup Prometheus

*Using the prometheus-community/prometheus chart*

Alternatively, if you are not using Prometheus Operator, please check how your Prometheus can support service discovery. Let say you’re using the [prometheus-community/prometheus](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus#scraping-pod-metrics-via-annotations) chart, which configures Prometheus to scrape from any Pods with following annotations:

```yaml
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/path: /metrics
    prometheus.io/port: "9090"
```

To install Prometheus, run

```bash
helm install prometheus prometheus-community/prometheus -n monitoring --create-namespace
```

### 2. Install Tyk Pump with prometheus annotations

```bash
NAMESPACE=tyk-oss
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2
PromOperator_Release=prometheus-stack
Prometheus_Custom_Metrics='[{"name":"tyk_http_requests_total"\,"description":"Total of API requests"\,"metric_type":"counter"\,"labels":["response_code"\,"api_name"\,"method"\,"api_key"\,"alias"\,"path"]}\,          {              "name":"tyk_http_latency"\,              "description":"Latency of API requests"\,              "metric_type":"histogram"\,              "labels":["type"\,"response_code"\,"api_name"\,"method"\,"api_key"\,"alias"\,"path"]          }]'

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade tyk-oss tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password \
  --set global.components.pump=true \
  --set "tyk-pump.pump.backend={prometheus}" \
  --set tyk-pump.pump.prometheusPump.customMetrics=$Prometheus_Custom_Metrics \
  --set-string tyk-pump.pump.podAnnotations."prometheus\.io/scrape"=true \
  --set-string tyk-pump.pump.podAnnotations."prometheus\.io/port"=9090 \
  --set-string tyk-pump.pump.podAnnotations."prometheus\.io/path"=/metrics
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}

### 3. Verification

After some time, you can see that Prometheus is successfully scraping from Tyk Pump:

{{< img src="/img/diagrams/pump-prometheus-4.png" alt="pump-prometheus" >}}

## Example: Expose a service for Prometheus to scrape

You can expose Pump as a service so that Prometheus can access the `/metrics` endpoint for scraping. Just enable service in `tyk-pump.pump.service`:

```yaml
    service:
      # Tyk Pump svc is disabled by default. Set it to true to enable it.
      enabled: true
```