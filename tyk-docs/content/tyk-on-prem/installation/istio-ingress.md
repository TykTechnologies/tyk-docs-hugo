---
title: As an Ingress with Istio Service Mesh
tags: ["Tyk Stack", "Self-Managed", "Installation", "Istio"]
description: "How to install Tyk as an ingress with Istio service mesh on Kubernetes"
menu:
  main:
    parent: "Kubernetes "
weight: 2
url: "/tyk-self-managed/istio/"
---


## Introduction

Utilising Tyk for API Management at the edge ingress or egress of a service mesh is a common use case. You'll cover here how to set up Tyk as an Ingress alongside Istio acting as a service mesh for the upstream services. This opens up the ability to use the powerful API gateway and API management capabilities of Tyk, giving you the benefit of Istio for East-West traffic and Tyk for north-south traffic.

Each Tyk Ingress Gateway will have a sidecar that intercepts the traffic on the internal mesh side and so can offload responsibility for certificate management and mutual TLS to Istio.  

### Prerequisites

A Kubernetes cluster and Kubectl. 

Optional but recommended:
[Tyk Operator](https://github.com/TykTechnologies/tyk-operator) for managing our API management resources in the Gateway (API Definitions and Security Policies) and for managing Ingress and TLS Certifications for the Ingress using Certmanager if required. This guide includes declaratively deploying an API with the Operator once you have Tyk installed as our Istio Ingress.

Istioctl command line tool on your machine.

### Setup Istio

Install `istioctl` so you can deploy the Istio control plane, `IstioD`. 

You will not need to install the Istio ingress gateway instances since this will be managed by your Tyk Gateway.

For this example lets Install IstioD control plane with:

```
 istioctl install --set profile=minimal -y
 ```
 
or if you want to allow egress traffic to the internet for now from inside the mesh:

```
istioctl install --set profile=minimal -y --set meshConfig.outboundTrafficPolicy.mode=ALLOW_ANY
```

You should see 
```
✔ Istio core installed
✔ Istiod installed
✔ Installation complete
```

You can check IstioD is up and running with `kubectl -n istio-system get deploy` and should see something like: 
```
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
istiod   1/1     1            1           1m
```

## Install Tyk on Istio with Helm

Before you install Tyk add your Tyk namespace where your Tyk Gateway, API Dashboard and Pump are installed to the injected namespaces for Istio. (This demo will also inject sidecars on our Redis and MongoDB - these would normally be recommended to install outside your cluster).

```
kubectl create namespace tyk
```
followed by
```
kubectl label namespace tyk istio-injection=enabled
```

Install the Tyk setup of your choice from Tyk's Helm charts [on our GitHub pages]( https://github.com/TykTechnologies/tyk-helm-chart). This guide assumes the use of the quickstart Tyk Pro installation.

From the tyk-helm-chart repo folder:

Install Mongo:
```
kubectl apply -f deploy/dependencies/mongo.yaml -n tyk
```
Install Redis:

```
kubectl apply -f deploy/dependencies/redis.yaml -n tyk
```

Ensure that in the `values.yaml` file the top-level setting `gateway.enableIstioIngress: true `. This will enable you to reach the Dashboard API manager and the API Gateways from outside the cluster. Also input your Tyk license into the `values.yaml`.

Then run helm install:

```
helm install tyk-pro -f ./values.yaml ./tyk-pro -n tyk --wait
```

When up and running you should see the Tyk pods with their sidecars.

```
NAME                                 READY   STATUS    RESTARTS   AGE
dashboard-tyk-pro-78fdc5d8cb-88dqx   2/2     Running   0          70s
gateway-tyk-pro-m9kd8                2/2     Running   0          70s
mongo-7fb8b5459c-88k6z               2/2     Running   0          94s
pump-tyk-pro-67dc9f5695-gn9vz        2/2     Running   0          70s
redis-db9784c88-qwcdw                2/2     Running   0          89s
```

Get your login details for the dashboard by running the commands returned in the Helm notes file after successful Helm install:

Username:
```
kubectl get secret --namespace tyk tyk-login-details -o jsonpath="{.data.TYK_USER}" | base64 --decode
```
and password:

```
kubectl get secret --namespace tyk tyk-login-details -o jsonpath="{.data.TYK_PASS}" | base64 --decode
```



Navigate to your Tyk Dashboard endpoint to login. In this case on Minikube/Kind or Docker Desktop it would be on localhost along with a NodePort.

```
dashboard-svc-tyk-pro   NodePort    10.101.9.66     <none>        3000:30315/TCP   22s
```

You need a service inside our service mesh to proxy to and we include a sample `httpbin` service you can use. Of course any services will work such as the bookinfo demo used by Istio.


Deploy the httpbin service inside an injected namespace i.e. default with:

```
kubectl label namespace default istio-injection=enabled
```
then:
```
kubectl apply -f samples/httpbin.yaml
```


## Tyk on Istio: Deploy an API with The Dashboard UI

Once logged in to the dashboard follow one of our guides on the Tyk docs. 

https://www.tyk.io/docs/tyk-cloud/getting-started-tyk-cloud/first-api/

This Tyk Cloud guide works similarly for self-managed - remember to tag your API "ingress" so it will be loaded in the Ingress Gateway.

## Tyk on Istio: Deploy an API declaratively with the Tyk Operator

Our Tyk Pro install has helpfully seeded a secret for us to use to connect your Tyk Operator to the API Management Dashboard.

You can go and do this from the guides on the [Tyk Operator Docs](https://github.com/TykTechnologies/tyk-operator/blob/master/docs/installation/installation.md)

For this guide you will deploy the Operator in the same namespace as our existing components. The Tyk Operator can be deployed in another namespace if needed and be instructed to watch any namespaces.

You can view our populated Operator secret details with:

```
kubectl get secret/tyk-operator-conf -n tyk -o json | jq '.data'
{
  "TYK_AUTH": "OTY1MTZjODVmMGUyNGUyNjYwNGI4ZWJmMzZjOGYyMTg=",
  "TYK_MODE": "cHJv",
  "TYK_ORG": "NjAzYTBmZGI3MWE5ZjAwMDAxNTNjMzg1",
  "TYK_URL": "aHR0cDovL2Rhc2hib2FyZC1zdmMtdHlrLXByby50eWsuc3ZjLmNsdXN0ZXIubG9jYWw6MzAwMA=="
}
```

Now either clone or checkout the Tyk Operator repo as you'll be working from there for the rest of this guide.

Once in the Tyk Operator directory firstly install the CRDs you need:

```
kubectl apply -f ./helm/crds
customresourcedefinition.apiextensions.k8s.io/apidefinitions.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/securitypolicies.tyk.tyk.io configured
customresourcedefinition.apiextensions.k8s.io/webhooks.tyk.tyk.io configured
```

Next install certmanager for the Tyk Gateway server certs:

```
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager.yaml
```

And deploy the Operator itself:

```
helm install tyk-op -f ./config/samples/istio/values.yaml ./helm -n tyk
```

Now you can apply our API definition to create the proxy configuration for the Gateway in front of the httpbin service we deployed into our mesh:

```
cat <<EOF | kubectl create -n tyk -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  tags:
    - ingress
  protocol: https
  active: true
  proxy:
    target_url: http://httpbin.default.svc.cluster.local:8000
    listen_path: /httpbin
    strip_listen_path: true
EOF
```


You can now send a request to the httpbin service inside our mesh:

```
curl https://localhost:30598/httpbin/get -k
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Content-Length": "0",
    "Host": "httpbin.default.svc.cluster.local:8000",
    "User-Agent": "curl/7.54.0",
    "X-B3-Parentspanid": "eef815d5f368e0c1",
    "X-B3-Sampled": "0",
    "X-B3-Spanid": "0c65b076de84c027",
    "X-B3-Traceid": "ddf6ff2e7c053b61eef815d5f368e0c1",
    "X-Envoy-Attempt-Count": "1",
    "X-Envoy-Internal": "true",
    "X-Forwarded-Client-Cert": "By=spiffe://cluster.local/ns/default/sa/default;Hash=b2e9d4431e31dd6a54d6a21c9cbcd5f0aa55d45f2ddcd5e8aae3ac7ea73ee66b;Subject=\"\";URI=spiffe://cluster.local/ns/tyk/sa/default"
  },
  "origin": "192.168.65.3",
  "url": "http://httpbin.default.svc.cluster.local:8000/get"
}
```
