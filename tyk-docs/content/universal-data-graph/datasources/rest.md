---
title: "REST Datasource"
date: 2020-06-03
menu:
  main:
    parent: "UDG DataSources"
weight: 1
aliases:
    - /universal-data-graph/data-sources/rest
---

The REST Datasource is a base component of UDG to help you add existing REST APIs to your data graph. By attaching a REST datasource to a field the engine will use the REST resource for resolving.

We have a video which demoes this functionality for you.

{{< youtube PEwG8F8PxUs >}}

## Using external REST API as a Datasource

In order to use an external REST API as a Datasource you need to first navigate to the field which that Datasource should be attached to. 

1. Click on the field which should have a datasource attached
2. From the right-hand side *Configure data source* panel choose REST at the bottom in the *Add a new external data source* section

{{< img src="/img/dashboard/udg/datasources/external-rest-config.png" alt="ExternalREST" >}}

3. Provide data source name, URL, method to be used. Optionally you can add headers information and configure field mapping 

{{< img src="/img/dashboard/udg/datasources/external-rest-fields.png" alt="ExternalRESTdetail" >}}

4. Click *SAVE* button to persist the configuration and generate a REST resolver, which will resolve this field at runtime.

## Using Tyk REST API as a Datasource

1. Click on the field which should have a datasource attached
2. From the right-hand side *Configure data source* panel choose *REST | Tyk* dropdown to see all available APIs

{{< img src="/img/dashboard/udg/datasources/rest-internal-config.png" alt="InternalREST" >}}

3. Choose which Tyk REST API you want to attach
4. Provide data source name, endpoint and method to be used. Optionally you can add headers information and configure field mapping

{{< img src="/img/dashboard/udg/datasources/rest-internal-fields.png" alt="InternalRESTdetail" >}}

5. Click *SAVE* button to persist the configuration and generate a REST resolver, which will resolve this field at runtime.

Once done the field you just configured will show information about data source type and name:

{{< img src="/img/dashboard/udg/datasources/datasources-list.png" alt="datasourcesList" >}}

## Automatically creating REST UDG configuration based on OAS specification

Tyk Dashboard users have an option to use Tyk Dashboard API and quickly transform REST API OAS specification into a UDG config and have it published in the Dasboard within seconds.

See our [Postman collections](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) and fork `Tyk Dashboard API v5.1`.

The endpoint you need to use is:

```bash
POST /api/data-graphs/data-sources/import
```

Request body:

```json
{
    "type": "string",
    "data": "string"
}
```

`type` is an enum with the following possible values:

- openapi
- asyncapi

To import an OAS specification you need to choose `openapi`.

If you are using Postman and your OAS document is in `yaml` format you can use a simple pre-request script to transform it into a `string`.

```bash
pm.environment.set("oas_document", JSON.stringify(`<your_yaml_goes_here>`))
```

Then your request body will look like this:

```json
{
    "type": "openapi",
    "data": {{oas_document}}
}
```