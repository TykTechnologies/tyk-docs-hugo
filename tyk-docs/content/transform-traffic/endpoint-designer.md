---
date: 2017-03-22T16:47:24Z
Title: Endpoint Designer
menu:
  main:
    parent: "Transform Traffic"
weight: 9 
---



The Endpoint Designer is a powerful and versatile way for you to add specific behaviours to your API. By Default, Tyk will proxy all traffic through the listen path that you have defined.

If you want to have specific behaviours applied to a path (for example, a header injection), then you can enable the middleware on a path-by-path basis by using matching patterns in the Endpoint Designer.

> **Note**: you do not need to define your whole API in the editor, only those paths you want to manage. The exception to this is if you are using a white-list, in which case you will need to specify every endpoint as all others will be blocked.

By default, importing an API using Swagger or API Blueprint definitions will generate a white-list.

To get started, click **Add Endpoint**, this will give you an empty path definition:

In a new path definition, you can set multiple options, and if you do not specify a specific action for that list (from the plugins drop-down), then saving the path will actually do nothing (and it will vanish).

Your options are:

* **Method**: The method you are targeting, can be any valid HTTP method, simply pick one from the drop-down menu.
* **Path**: The path to target - it is important to exclude aberrant slashes (`/`) from your path matching, as otherwise the gateway may not match the path correctly. A path can contain wild cards, such as `{id}`, the actual value in the wildcard is not used (it is translated into a regex), however it is useful to make the path more human readable when editing.
* **Plugin**: A path can belong to multiple plug-ins, these plug-ins define the behaviour you want to impose on the matched request.

## <a name="plugins"></a>Available Plugins

### Blacklist

Adding a path to a blacklist will force it to be blocked. This can be useful if you are versioning your API and are deprecating a resource. Instead of just making the path vanish you can block access to it.

### Body Transform

The Body Transform plugin  allows Body Transforms for both the Request and the Response. See [Request Body](/docs/transform-traffic/request-body/) and [Response Body](/docs/transform-traffic/response-body/) for more details.

### Cache

If you specify a a path to be in the cache list, then the path will be cached by Tyk. Tyk will only ever cache safe requests, so adding a `POST/PUT/DELETE` request to the cache list will not work.

### Circuit Breaker

Our circuit breaker is threshold-based, so if x% of requests are failing then the circuit is tripped. When the circuit is tripped, the gateway stops all inbound requests to that service for a pre-defined period of time (a recovery time-period).

The circuit breaker will also emit an event which you can hook into to perform some corrective or logging action. See [Circuit Breaker](/docs/ensure-high-availability/circuit-breakers/) for more details.

### Do Not Track Endpoint

This plugin allows you to have all traffic including analytics for an endpoint completely ignored.

### Enforced Timeout

This plugin allows you to ensure that your service always responds within a given amount of time. See [Enforced Timeouts](/docs/ensure-high-availability/enforced-timeouts/) for more details.

### Ignore

Adding a path to an ignored list means that the path will not be processed for authentication data. This plugin can be very useful if you have a non-secure endpoint (such as a ping) that you don't need secured.

> **NOTE**: Adding a path to an ignore list will bypass all other configuration settings.

### Method Transforms

This plugin allows you to change the method of a request. See [Method Transforms](/docs/transform-traffic/request-method-transform/) for more details.

### Mock Response

This plugin allows you to mock responses for an API endpoint. This can be useful when creating a new API, or when making a development API available to an external team.

> **Note**: In order for mocks to be enabled, the path must also be in a list. We recommend adding the path to a whitelist. If this isn't done, then the mock will not be saved on an update.

**API Blueprint**: If you have imported an API Blueprint definition, and selected the mocks option in the importer, then your whole API will be a white list.

The options are for a mock:

**Code**: the status code to respond with
**Response body**: The response body
**Headers**: The headers to inject with the response

### Modify Headers

This plugin allows you to modify header information before it leaves the proxy and is passed to your upstream API or when a response is proxied back to the client. See [Request Headers](/docs/transform-traffic/request-headers/) for more details.

### Request Size Limit

This plugin will ensure that requests are only accepted if they are under a certain size. To use this plugin, select a path that matches your required URL, then set the size, in bytes, that is the maximum allowed. See [Request Size Limits](/docs/control-limit-traffic/request-size-limits/) for more details.

### Track Endpoint

This plugin allows you to manually select each endpoint for tracking. 

### URL Rewrite

This plugin allows you to translate an outbound API interface to your internal structure of your services. See [URL Rewriting](/docs/transform-traffic/url-rewriting/) for more details.

### Virtual Endpoint

This plugin allows you to create small code snippets that run on your set path. These snippets can be written in JavaScript and offer an easy way to create dynamic, flexible endpoints that perform complex interactions with your underlying services. See [Virtual Endpoints](/docs/compose-apis/virtual-endpoints/) for more details.

### Validate JSON

This plugin allows you to verify user requests against a specified JSON schema and check that the data sent to your API by a consumer is in the right format. This means you can offload data validation from your application onto us.

If it's not in the right format, then the request will be rejected. And you can set a custom error code. The default is "422 Unprocessable Entity".

### Whitelist

Adding a path to a  whitelist will cause the entire API to become whitelisted. This means any non-specified routes will be blocked, and only those listed in the Endpoint Designer will be allowed through. This is great if you wish to have very select access rules for your services.



## <a name="global"></a> Global Settings

In some cases you will want to set global settings that happen to all paths that are managed by Tyk. The **Global Version Settings** section will enable you to perform a common API management task of injecting custom headers into request data.

These headers can also include **meta-data that is part of the session object** to better qualify the inbound request.

### Versions

At the top of the Endpoint Designer you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load it's endpoint configuration into the editor.