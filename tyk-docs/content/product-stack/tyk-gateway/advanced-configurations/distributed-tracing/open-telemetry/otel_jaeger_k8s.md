---
date: 2023-08-29T13:32:12Z
title: How to integrate with Jaeger on Kubernetes
tags: ["distributed tracing", "OpenTelemetry", "Jaeger", "Kubernetes"]
description: "This guide explains how to integrate Tyk Gateway with OpenTelemetry and Jager on Kubernetes to enhance API Observability"
---

This quick start guide offers a detailed, step-by-step walkthrough for configuring Tyk Gateway OSS with OpenTelemetry and [Jaeger](https://www.jaegertracing.io/) on Kubernetes to significantly improve API observability. We will cover the installation of essential components, their configuration, and the process of ensuring seamless integration.

For Docker instructions, please refer to [How to integrate with Jaeger on Docker]({{< ref "otel_jaeger" >}}).


## Prerequisites

Ensure the following prerequisites are in place before proceeding:

- A functional Kubernetes cluster
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) and [helm](https://helm.sh/docs/intro/install/) CLI tools installed

## Step 1: Install Jaeger Operator

For the purpose of this tutorial, we will use jaeger-all-in-one, which includes the Jaeger agent, collector, query, and UI in a single pod with in-memory storage. This deployment is intended for development, testing, and demo purposes. Other deployment patterns can be found in the [Jaeger Operator documentation](https://www.jaegertracing.io/docs/1.51/operator/#deployment-strategies).


1. Install the cert-manager release manifest (required by Jaeger)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.2/cert-manager.yaml
```

2. Install [Jaeger Operator](https://www.jaegertracing.io/docs/latest/operator/)).

```bash
kubectl create namespace observability
kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.51.0/jaeger-operator.yaml -n observability

```

3. After the Jaeger Operator is deployed to the `observability` namespace, create a Jaeger instance:

```bash
kubectl apply -n observability -f - <<EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger-all-in-one
EOF
```


## Step 2: Deploy Tyk Gateway with OpenTelemetry Enabled using Helm

To install or upgrade [Tyk Gateway OSS using Helm](https://github.com/TykTechnologies/tyk-charts/tree/main/tyk-oss), execute the following commands:

```bash
NAMESPACE=tyk
APISecret=foo
TykVersion=v5.3.0
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION
helm upgrade tyk-otel tyk-helm/tyk-oss -n $NAMESPACE --create-namespace \
  --install \
  --set global.secrets.APISecret="$APISecret" \
  --set tyk-gateway.gateway.image.tag=$TykVersion \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.pass="$(kubectl get secret --namespace $NAMESPACE tyk-redis -o jsonpath='{.data.redis-password}' | base64 -d)" \
  --set tyk-gateway.gateway.opentelemetry.enabled=true \
  --set tyk-gateway.gateway.opentelemetry.exporter="grpc" \
  --set tyk-gateway.gateway.opentelemetry.endpoint="jaeger-all-in-one-collector.observability.svc:4317"
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "planning-for-production/redis" >}}).
{{< /note >}}


Tyk Gateway is now accessible through service gateway-svc-tyk-oss-tyk-gateway at port 8080 and exports the OpenTelemetry traces to the `jaeger-all-in-one-collector` service.

## Step 3: Deploy Tyk Operator

Deploy Tyk Operator to manage APIs in your cluster:

```bash
kubectl create namespace tyk-operator-system
kubectl create secret -n tyk-operator-system generic tyk-operator-conf \
  --from-literal "TYK_AUTH=$APISecret" \
  --from-literal "TYK_ORG=org" \
  --from-literal "TYK_MODE=ce" \
  --from-literal "TYK_URL=http://gateway-svc-tyk-otel-tyk-gateway.tyk.svc:8080" \
  --from-literal "TYK_TLS_INSECURE_SKIP_VERIFY=true"
helm install tyk-operator tyk-helm/tyk-operator -n tyk-operator-system

```

## Step 4: Deploy a Test API Definition

Save the following API definition as `apidef-hello-world.yaml`:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
 name: hello-world
spec:
 name: hello-world
 use_keyless: true
 protocol: http
 active: true
 proxy:
   target_url: http://echo.tyk-demo.com:8080/
   listen_path: /hello-world
   strip_listen_path: true
```

To apply this API definition, run the following command:

```bash
kubectl apply -f apidef-hello-world.yaml 
```

This step deploys an API definition named hello-world using the provided configuration. It enables a keyless HTTP API proxying requests to http://echo.tyk-demo.com:8080/ and accessible via the path /hello-world.

## Step 5: Explore OpenTelemetry traces in Jaeger

You can use the kubectl `port-forward command` to access Tyk and Jaeger services running in the cluster from your local machine's localhost:

For Tyk API Gateway:

```bash
kubectl port-forward service/gateway-svc-tyk-otel-tyk-gateway 8080:8080 -n tyk
```

For Jaeger:

```bash
kubectl port-forward service/jaeger-all-in-one-query 16686 -n observability
```

Begin by sending a few requests to the API endpoint configured in step 2: 

```bash
curl http://localhost:8080/hello-world/ -i
```

Next, navigate to Jaeger on `http://localhost:16686`, select the ´service´ called ´tyk-gateway´ and click on the button ´Find traces´. You should see traces generated by Tyk:

{{< img src="/img/distributed-tracing/opentelemetry/api-gateway-trace-tyk-jaeger.png" alt="Tyk API Gateway distributed trace in Jaeger" >}}

Click on a trace to view all its internal spans:

{{< img src="/img/distributed-tracing/opentelemetry/api-gateway-trace-tyk-jaeger-spans.png" alt="Tyk API Gateway spans in Jaeger" >}}

