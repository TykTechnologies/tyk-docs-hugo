---
date: 2017-03-24T16:39:31Z
title: Secure an API with Auth token
weight: 3
---

### Tutorial: Update an API to require a key

You might already have realized that our `httpbin` API is keyless. If you check the APIDefinition's specification, the `use_keyless` field is set to `true`.
Tyk keyless access represents completely open access for your API and causes Tyk to bypass any session-based middleware (middleware that requires access to token-related metadata). Keyless access will enable all requests through.
You can disable keyless access by setting `use_keyless` to false. 

#### Step 1: Update your `httpbin.yaml` file as follows:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: false
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

#### Step 2: Apply the changes:

```bash
kubectl apply -f httpbin.yaml
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
    use_keyless: false
    protocol: http
    active: true
    proxy:
        target_url: http://httpbin.org
        listen_path: /httpbin
        strip_listen_path: true
EOF
```

If you have set `use_keyless` to false, the default authentication mode is Authentication token.

Now, to access `httpbin` API, you need to include a key to the header. Otherwise, you will get a `HTTP 401 Unauthorized` response.


```curl
curl -i localhost:8080/httpbin/get
HTTP/1.1 401 Unauthorized
Content-Type: application/json
X-Generator: tyk.io
Date: Thu, 03 Mar 2022 15:47:30 GMT
Content-Length: 46

{
    "error": "Authorization field missing"
}%
```

{{< note success >}}

**Note**  

 

Tyk Operator supported authentication types are listed in the [API Definition features]({{<ref "product-stack/tyk-operator/reference/api-definition">}}) page.

{{< /note >}}

### Tutorial: Create an API key

You need to generate a key to access the `httpbin` API now. Follow [this guide](https://tyk.io/docs/getting-started/create-api-key/) to see how to create an API key for your installation. 

You can obtain the API name and API ID of our example `httpbin` API by following command:

```yaml
kubectl describe tykapis httpbin
Name:         httpbin
Namespace:    default
Labels:       <none>
Annotations:  <none>
API Version:  tyk.tyk.io/v1alpha1
Kind:         ApiDefinition
Metadata:
  ...
Spec:
  ...
  Name: httpbin
  ...
Status:
  api_id:  ZGVmYXVsdC9odHRwYmlu
Events:    <none>
```

You can obtain the API name and API ID from `name` and `status.api_id` field.

In our example, it is as follows:

- {API-NAME}: httpbin
- {API-ID}: ZGVmYXVsdC9odHRwYmlu

When you have successfully created a key, you can use it to access the `httpbin` API.

```curl
curl -H "Authorization: Bearer {Key ID}" localhost:8080/httpbin/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "Bearer {Key ID}",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.77.0",
    "X-Amzn-Trace-Id": "Root=1-6221de2a-01aa10dd56f6f13f420ba313"
  },
  "origin": "127.0.0.1, 176.42.143.200",
  "url": "http://httpbin.org/get"
}
```

Since you have provided a valid key along with your request, you do not get a `HTTP 401 Unauthorized` response.
