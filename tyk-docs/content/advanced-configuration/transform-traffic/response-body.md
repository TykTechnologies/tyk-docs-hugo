---
title: Response Body Transformation
date: 2017-03-23T17:30:44Z
description: "How to transform the body for an API response"
tags: ["response transform", "body transform", "transform", "middleware", "per-endpoint"]
---

Tyk enables you to modify the payload of API responses received from your upstream services before they are passed on to the client that originated the request. This makes it easy to transform between payload data formats or to expose legacy APIs using newer schema models without having to change any client implementations. This middleware is only applicable to endpoints that return a body with the response.

With the body transform middleware you can modify XML or JSON formatted payloads to ensure that the response contains the information required by your upstream service. You can enrich the response by adding contextual data that is held by Tyk but not included in the original response from the upstream.

This middleware changes only the payload and not the headers. You can, however, combine this with the [Response Header Transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) to apply more complex transformation to responses.

There is a closely related [Request Body Transform]({{< ref "transform-traffic/request-body" >}}) middleware that provides the same functionality on the request sent by the client prior to it being proxied to the upstream.

## When to use the Response Body Transformation middleware

#### Maintaining compatibility with legacy clients

Sometimes you might have a legacy API and need to migrate the transactions to a new upstream service but do not want to upgrade all the existing clients to the newer upstream API. Using response body transformation, you can convert the new format that your upstream services provide into legacy XML or JSON expected by the clients.

#### Shaping responses for different devices

You can detect the client device types via headers or context variables and transform the response payload to optimise it for that particular device. For example, you might optimise the response content for mobile apps.

#### SOAP to REST translation

A common use of the response body transform middleware is when surfacing a legacy SOAP service with a REST API. Full details of how to perform this conversion using Tyk are provided [here]({{< ref "advanced-configuration/transform-traffic/soap-rest" >}}).

## How body transformation works

Tyk's body transform middleware uses the [Go template language](https://golang.org/pkg/text/template/) to parse and modify the provided input. We have bundled the [Sprig Library (v3)](http://masterminds.github.io/sprig/) which provides over 70 pre-written functions for transformations to assist the creation of powerful Go templates to transform your API responses. 

The Go template can be defined within the API Definition or can be read from a file that is accessible to Tyk, for example alongside your [error templates]({{< ref "advanced-configuration/error-templates" >}}).

We have provided more detail, links to reference material and some examples of the use of Go templating [here]({{< ref "product-stack/tyk-gateway/references/go-templates" >}}).

{{< note success >}}
**Note**  

Tyk evaluates templates stored in files on startup, so if you make changes to a template you must remember to restart the gateway. 
{{< /note >}}

### Supported response body formats

The body transformation middleware can modify response payloads in the following formats:
- JSON
- XML

When working with JSON format data, the middleware will unmarshal the data into a data structure, and then make that data available to the template in dot-notation.

### Data accessible to the middleware

The middleware has direct access to the response body and also to dynamic data as follows:
- [Context variables]({{< ref "context-variables" >}}), extracted from the request at the start of the middleware chain, can be injected into the template using the `._tyk_context.KEYNAME` namespace
- [Session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into the template using the `._tyk_meta.KEYNAME` namespace 
- Inbound form or query data can be accessed through the `._tyk_context.request_data` namespace where it will be available in as a `key:[]value` map
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into the template using the notation appropriate to the location of the KV store
 
The response body transform middleware can iterate through list indices in dynamic data so, for example, calling `{{ index ._tyk_context.request_data.variablename 0 }}` in a template will expose the first entry in the `request_data.variablename` key/value array.

{{< note success >}}
**Note**  

As explained in the [documentation](https://pkg.go.dev/text/template), templates are executed by applying them to a data structure. The template receives the decoded JSON or XML of the response body. If session variables or meta data are enabled, additional fields will be provided: `_tyk_context` and `_tyk_meta` respectively.
 {{< /note >}}

### Automatic XML <-> JSON Transformation

A very common transformation that is applied in the API Gateway is to convert between XML and JSON formatted body content.

The Response Body Transform supports two helper functions that you can use in your Go templates to facilitate this:
- `jsonMarshal` performs JSON style character escaping on an XML field and, for complex objects, serialises them to a JSON string ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}))
- `xmlMarshal` performs the equivalent conversion from JSON to XML ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}))

<hr>

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the response body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the response body transformation middleware [here]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page
 ## Response Body Transform middleware summary
  - The Response Body Transform middleware is an optional stage in Tyk's API Response processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Response Body Transform middleware can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
  - Response Body Transform can access both [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}) and [request context variables]({{< ref "context-variables" >}}).
 -->
