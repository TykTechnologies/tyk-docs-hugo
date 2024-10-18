---
date: 2017-03-24T16:39:31Z
title: Create Tyk Classic APIs with Tyk Operator
weight: 2
menu:
    main:
        parent: "Getting started with Tyk Operator"
---

### Tutorial: Create a Tyk Classic API with Tyk Operator
First, specify the details of your API using the [ApiDefinition CRD]({{<ref "product-stack/tyk-operator/reference/api-definition">}}), then deploy it to create the corresponding Kubernetes resource. Tyk Operator will take control of the CRD and create the actual API in the Tyk data plane.

#### Step 1: Create an ApiDefinition resource in YAML format
Create a file called `httpbin.yaml`, then add the following:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
 name: httpbin
spec:
 name: httpbin
 use_keyless: true
 protocol: http
 active: true
 proxy:
   target_url: http://httpbin.org
   listen_path: /httpbin
   strip_listen_path: true
```

You can also use other sample files from the following pages:

- [HTTP Proxy example]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http">}})
- [TCP Proxy example]({{<ref "product-stack/tyk-operator/getting-started/quick-start-tcp">}})
- [GraphQL Proxy example]({{<ref "product-stack/tyk-operator/getting-started/quick-start-graphql">}})
- [UDG example]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg">}})

#### Step 2: Deploy the ApiDefinition resource
We are going to create an ApiDefinition from the httpbin.yaml file, by running the  following command:

```console
$ kubectl apply -f httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
    name: httpbin
spec:
    name: httpbin
    use_keyless: true
    protocol: http
    active: true
    proxy:
        target_url: http://httpbin.org
        listen_path: /httpbin
        strip_listen_path: true
EOF
```

The ApiDefinition resource is created. You can verify by the following command:

```console
$ kubectl get tykapis
NAME      DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
httpbin            /httpbin     http://httpbin.org   true
```

You can make a request to verify that your API is working:

```bash
$ curl -i localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-62161e8c-2a1ece436633f2e42129be2a"
  },
  "origin": "127.0.0.1, 176.88.45.17",
  "url": "http://httpbin.org/get"
}
```

### ApiDefinition CRD

We can walk you through the ApiDefinition that we created. We have an ApiDefinition called `httpbin`, as specified in `spec.name` field, which listens to path `/httpbin` and proxies requests to [http://httpbin.org](http://httpbin.org), as specified under `spec.proxy` field. Now, any requests coming to the `/httpbin` endpoint will be proxied to the target URL that we defined in `spec.proxy.target_url`, which is [http://httpbin.org](http://httpbin.org) in our example.

You can visit the [ApiDefinition CRD]({{<ref "product-stack/tyk-operator/reference/api-definition">}}) page to see all the latest API Definitions fields and features we support.

### Configure Kubernetes service as an upstream target

Tyk Gateway deployed in your Kubernetes cluster can easily access other Kubernetes services as an upstream proxy target.
In the ApiDefinition manifest, set the `proxy.target_url` as a Kubernetes Service following [DNS for Services and Pods guideline](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/), so that the requests will be proxied to your service.
In general, Kubernetes Services have a `<service-name>.<namespace-name>`.svc.cluster.local DNS entry once they are created.
For example, if you have a service called `httpbin` in `default` namespace, you can contact `httpbin` service with `httpbin.default.svc` DNS record in the cluster, instead of IP addresses.
Please visit the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) for more details.
Suppose you want to create a Deployment of [httpbin](https://hub.docker.com/r/kennethreitz/httpbin/) service using [ci/upstreams/httpbin.yaml](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml) file. You are going to expose the application through port `8000` as described under the Service [specification](https://github.com/TykTechnologies/tyk-operator/blob/master/ci/upstreams/httpbin.yaml#L10).
You can create Service and Deployment by either applying the manifest defined in our repository:

```console
$ kubectl apply -f ci/upstreams/httpbin.yaml
```

Or, if you don’t have the manifest with you, you can run the following command:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  ports:
    - name: http
      port: 8000
      targetPort: 80
  selector:
    app: httpbin
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
      version: v1
  template:
    metadata:
      labels:
        app: httpbin
        version: v1
    spec:
      containers:
        - image: docker.io/kennethreitz/httpbin
          imagePullPolicy: IfNotPresent
          name: httpbin
          ports:
            - containerPort: 80
EOF
```

You need to wait until all pods reach READY `1/1` and STATUS `Running` state.
Once the pod is ready, you can update your `httpbin` API's `target_url` field to proxy your requests to the Service that you created above.
You can check all services in the `<ns>` namespace as follows:

```console
$ kubectl get service -n <ns>
```

You can update your `httpbin` as follows:

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /httpbin
    strip_listen_path: true
```

Pay attention to the value of the `spec.proxy.target_url` field.
It is set to `http://httpbin.default.svc:8000` by following the convention described above (`<service_name>.<namespace>.svc:<service_port>`).
Now, if you send your request to the `/httpbin` endpoint of the Tyk Gateway, the request will be proxied to the `httpbin Service`:

```curl
curl -sS http://localhost:8080/httpbin/headers
{
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.default.svc:8000", 
    "User-Agent": "curl/7.68.0"
  }
}
```

As you can see from the response, the host that your request should be proxied to is `httpbin.default.svc:8000`.


