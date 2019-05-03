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

### Configure Tyk

1. Select your API from the **System Management > APIs** section and click **Edit**.

2. From the **Core Settings** tab, set the **Target URL** to the Linkerd http server `host:port` address.

3. From the **Endpoint Designer** tab click **Global Version Settings** enter `Custom-Header` in the **Add this header**: field and the value of the Linkerd `app-id` in the **Header value** field.

4. Click **Update** to save your changes.

This is needed since Tyk appends a "Host" header when proxying the request and the "Host" header is also the default header expected by Linkerd.

#### For further Linkerd information, see:

[Linkerd - HTTP proxy documentation][1] (Alternatives Section)

[Linkered - Header Token Identifier documentation][3]

[The original Community Contribution][2]


[1]: https://linkerd.io/features/http-proxy/ 

[2]: https://community.tyk.io/t/using-tyk-gateway-with-linkerd/1568

[3]: https://linkerd.io/config/0.9.1/linkerd/index.html#header-token-identifier

