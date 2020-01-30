---
date: 2017-03-24T11:25:23Z
title: Service Discovery Examples
menu:
  main:
    parent: "Service Discovery"
weight: 0 
---

## <a name="mesosphere"></a> Mesosphere Example

For integrating service discovery with Mesosphere, you can use the following configuration parameters:

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = false
  portSeperate = true
  dataPath = "host"
  parentPath = "tasks"
  portPath = "ports"
```

## <a name="eureka"></a> Eureka Example

For integrating service discovery with Eureka, you can use the following configuration parameters (this assumes that the endpoint will return JSON and not XML, this is achieved by creating an API Definition that injects the header that requests the data type and using this API Definition as the endpoint):

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = false
  portSeperate = true
  dataPath = "hostName"
  parentPath = "application.instance"
  portPath = "port.$"
```

## <a name="etcd"></a> Etcd Example

For integrating with etcd, you can use the following configurations:

```{.copyWrapper}
  isNested = false
  isTargetList = false
  endpointReturnsList = false
  portSeperate = false
  dataPath = "node.value"
  parentPath = ""
  portPath = ""
```

## <a name="etcd"></a> Zookeeper Example

For this, you need to spin up a REST server that communicates with the Zookeeper instance.
Here is one open source project, ZooREST, that does just that: https://github.com/Difrex/zoorest

With Zookeeper and ZooREST running, test the query endpoint. Don't forget the `+json`:
```{.copyWrapper}
$ curl http://zoorest:8889/v1/get/zk_tyk+json
{
  "data": {
      "path": "httpbin.org"
  },
  "error": "",
  "path": "/zk_tyk",
  "state": "OK",
  "zkstat": {}
}
```

Then, you can use the following Tyk SD configurations:
```{.copyWrapper}
  isNested = false
  isTargetList = false
  endpointReturnsList = false
  portSeperate = false
  dataPath = "data.path"
  parentPath = ""
  portPath = ""
```

## <a name="consul"></a> Consul Example

For integrating service discovery with Consul, you can use the following configuration parameters:

```{.copyWrapper}
  isNested = false
  isTargetList = true
  endpointReturnsList = true
  portSeperate = true
  dataPath = "Address"
  parentPath = ""
  portPath = "ServicePort"
```

## <a name="linkerd"></a> Linkerd Example

> **Note**: This configuration is a Tyk Community Contribution.

To integrate Tyk with Linkerd perform the following:

### Configure Linkerd

For integrating with Linkerd, you need to add the following configuration to your `linkerd.yaml` file, located in the `config/` directory:

```{.copyWrapper}
  routers:
  - protocol: http
    identifier:
      kind: io.l5d.header.token
      header: Custom-Header
```

Then, in your Tyk Dashboard:

1. Select your API from the **System Management > APIs** section and click **Edit**.

2. From the **Core Settings** tab, set the **Target URL** to the Linkerd http server `host:port` address.

3. From the **Endpoint Designer** tab click **Global Version Settings** enter `Custom-Header` in the **Add this header**: field and the value of the Linkerd `app-id` in the **Header value** field.

4. Click **Update** to save your changes.

This is needed since Tyk appends a "Host" header when proxying the request and the "Host" header is also the default header expected by Linkerd.

##### For further Linkerd information, see:

[Linkerd - HTTP proxy documentation](https://linkerd.io/features/http-proxy/ ) (Alternatives Section)

[Linkered - Header Token Identifier documentation](https://linkerd.io/config/0.9.1/linkerd/index.html#header-token-identifier)

[The original Community Contribution](https://community.tyk.io/t/using-tyk-gateway-with-linkerd/1568)