---
date: 2017-03-22T16:47:24Z
Title: Endpoint Designer
tags: ["internal apis", "endpoint designer"]
menu:
  main:
    parent: "Transform Traffic"
weight: 10
aliases:
  - /transform-traffic/endpoint-designer/
---

The Endpoint Designer is a powerful and versatile way for you to add specific behaviours to your API. By Default, Tyk will proxy all traffic through the listen path that you have defined.

If you want to have specific behaviours applied to a path (for example, a header injection), then you can enable the middleware on a path-by-path basis by using matching patterns in the Endpoint Designer.

{{< note success >}}
**Note**  

You do not need to define your whole API in the editor, only those paths you want to manage. The exception to this is if you are using an [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}), in which case you will need to specify every endpoint as all others will be blocked. 
{{< /note >}}

By default, importing an API using Swagger/OpenAPI or API Blueprint JSON definitions will enable the allow list for the endpoints defined in the imported document.

To get started, click **Add Endpoint**, this will give you an empty path definition:

In a new path definition, you can set multiple options, and if you do not specify a specific action for that list (from the plugins drop-down), then saving the path will do nothing (and it will vanish).

Your options are:

- **Method**: The method you are targeting, can be any valid HTTP method, simply pick one from the drop-down menu.
- **Relative Path**: The relative path to the target. For example, if your API is listening on an `/api` listen path, and you want to match the `/api/get` URL, in the Endpoint Designer you should match for the `/get` endpoint. It is important to exclude aberrant slashes (`/`) from your path matching, as otherwise the gateway may not match the path correctly. A path can contain wild cards, such as `{id}`, the actual value in the wildcard is not used (it is translated into a regex), however, it is useful to make the path more human-readable when editing.
- **Plugin**: A path can belong to multiple plug-ins, these plug-ins define the behaviour you want to impose on the matched request.

{{< note success >}}
**Note**  

**Endpoint parsing**
The following plugins (Mock Response, {{<fn>}}Blocklist{{</fn>}} and {{<fn>}}Allowlist{{</fn>}}) require a `$` added at the end of your URL. This ensures that regular expression matching is exact, avoiding endpoints with characters following the specified endpoint.
<br/>
Here's an example to illustrate its impact: When you define an `/anything` endpoint, it also implies a potential match for `/anything/somepath`. However, employing `/anything$` in your definition specifically prevents the matching of `/somepath`. This distinction is interpreted as follows:
- In an Allowlist setup, only `/anything` is permitted, and `/anything/somepath` remains blocked unless explicitly added.
- In a Blocklist setup, only `/anything` is blocked, permitting `/anything/somepath` unless you add it specifically or remove the `$`, which would then block anything following `/anything`.
- In a Mock setup, only `/anything` is subject to mocking, while `/anything/somepath` is excluded from this behaviour.
{{< /note >}}


## Available Tyk Middleware

### Allow list
The [Allow List]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) middleware is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorised access to endpoints that are not explicitly permitted.

Adding an endpoint to the allow list will cause the entire API to become blocked except for endpoints on the allow list. Any non-specified routes will be blocked, and only those with the _allow list_ middleware in the Endpoint Designer will be allowed through. This is great if you wish to have very strict access rules for your services, limiting access to specific published endpoints.

### Block list
The [Block List]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}})  middleware is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

### Body Transform

The Body Transform plugin allows Body Transforms for both the Request and the Response. See [Request Body]({{< ref "transform-traffic/request-body" >}}) and [Response Body]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) for more details.

### Cache

If you specify a path to be in the cache list, then the path will be cached by Tyk. Tyk will only ever cache safe requests, so adding a `POST/PUT/DELETE` request to the cache list will not work.

### Circuit Breaker

Our circuit breaker is rate-based, so if x% of requests are failing then the circuit is tripped. When the circuit is tripped, the gateway stops all inbound requests to that service for a pre-defined period (a recovery time period).

The circuit breaker will also emit an event that you can hook into to perform some corrective or logging action. See [Circuit Breaker]({{< ref "planning-for-production/ensure-high-availability/circuit-breakers" >}}) for more details.

### Do Not Track Endpoint

This plugin prevents any analytics, including log browser, API activity and endpoint popularity from being generated. See [Do-Not-Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-middleware" >}}) for more details.

### Enforced Timeout

This plugin allows you to ensure that your service always responds within a given amount of time. See [Enforced Timeouts]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) for more details.

### Ignore Authentication

Adding the [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware means that Tyk Gateway will not perform authentication checks on requests to that endpoint. This plugin can be very useful if you have a non-secure endpoint (such as a ping) that you don't need to secure.

### Internal

The [Internal Endpoint]({{< ref "product-stack/tyk-gateway/middleware/internal-endpoint-middleware" >}}) middleware instructs Tyk Gateway to ignore external requests to the endpoint (which is a combination of HTTP method and path). Internal requests from other APIs will be processed.

### Method Transforms

This plugin allows you to change the method of a request. See [Method Transforms]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) for more details.

### Mock Response

This plugin allows you to configure Tyk Gateway to respond to requests made to an API endpoint, providing a realistic "mocked" response without making a call to the upstream service. This can be useful when creating a new API, or when making a development API available to an external team. See [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) for more details.

### Modify Headers

This plugin allows you to modify header information before it leaves the proxy and is passed to your upstream API or when a response is proxied back to the client. See [Request Headers]({{< ref "transform-traffic/request-headers" >}}) for more details.

### Request Size Limit

This plugin will ensure that requests are only accepted if they are under a certain size. To use this plugin, select a path that matches your required URL, then set the size, in bytes, that is the maximum allowed. See [Request Size Limits]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) for more details.

### Track Endpoint

This plugin allows you to manually select each endpoint for inclusion in the [Activity by Endpoint]({{< ref "product-stack/tyk-dashboard/advanced-configurations/analytics/activity-by-endpoint" >}}) statistics in Tyk Dashboard.

### URL Rewrite

This plugin allows you to translate an outbound API interface to the internal structure of your services. See [URL Rewriting]({{< ref "transform-traffic/url-rewriting" >}}) for more details.

### Validate JSON

This plugin allows you to verify user requests against a specified JSON schema and check that the data sent to your API by a consumer is in the right format. This means you can offload data validation from your application onto us.

If it's not in the right format, then the request will be rejected. And you can set a custom error code. The default is "422 Unprocessable Entity". See [Validate JSON]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) for more details.

### Virtual Endpoint

This plugin allows you to create small code snippets that run on your set path. These snippets can be written in JavaScript and offer an easy way to create dynamic, flexible endpoints that perform complex interactions with your underlying services. See [Virtual Endpoints]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) for more details.


## Global Settings

In some cases, you will want to set global settings that happen to all paths that are managed by Tyk. The **Global Version Settings** section will enable you to perform a common API management task of injecting custom headers into request data.

These headers can also include **metadata that is part of the session object** to better qualify the inbound request.

### Versions

At the top of the Endpoint Designer, you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load its endpoint configuration into the editor.

## Debugging

The API screen has a Debugging tab that allows you to test your endpoints before you publish or update them. You can also use it for testing any middleware plugins you have implemented. Any debugging you create will persist while still in the current API, enabling you to make changes in the rest of the API settings without losing the debugging scenario.

The Debugging tab consists of the following sections:

- Request
- Response
- Logs

### Request

{{< img src="/img/2.10/debugging_request.png" alt="Debugging Request" >}}

In this section, you can enter the following information:

- Method - select the method for your test from the drop-down list
- Path - your endpoint to test
- Headers/Body - enter any header information, such as Authorization, etc. Enter any body information. For example, entering user information if creating/updating a user.

Once you have entered all the requested information, click **Run**. Debugging Response and Log information will be displayed:

### Response

{{< img src="/img/2.10/debugging_results.png" alt="Debugging Response" >}}

The Response section shows the JSON response to your request.

### Logs

{{< img src="/img/2.10/debugging_logs.png" alt="Debugging Logs" >}}

The debugging level is set to **debug** for the request. This outputs all logging information in the Endpoint Designer. In the Tyk Gateway logs you will see a single request. Any Error messages will be displayed at the bottom of the Logs output.
