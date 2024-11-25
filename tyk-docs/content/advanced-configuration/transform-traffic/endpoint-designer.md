---
date: 2017-03-22T16:47:24Z
Title: Tyk Classic API Endpoint Designer
tags: ["Tyk Classic", "endpoint designer", "API debugging", "Tyk Dashboard"]
description: "An overview of Tyk Dashboard's Endpoint Designer for Tyk Classic APIs"
aliases:
  - /transform-traffic/endpoint-designer/
---

Tyk Dashboard's Endpoint Designer provides a graphical environment for the creation and update of your Tyk Classic APIs.

The Endpoint Designer allows to configure all elements of your Tyk Classic API and consists of several tabs, plus a **Raw Definition** view which allows you to directly edit the Tyk Classic API Definition (in JSON format). Note that 

## Core Settings

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-core.png" alt="The Tyk Classic Endpoint Designer - Core Settings tab" >}}

The **Core Settings** tab provides access to configure basic settings for the API:
- [Detailed logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#detailed-recording-with-tyk-classic-apis" >}})
- API Settings including
   - Listen path
   - [API Categories]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories" >}})
- Upstream settings including
   - Upstream service (target) URL
   - [Service Discovery]({{< ref "planning-for-production/ensure-high-availability/service-discovery" >}})
- [API Ownership]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership" >}})
- [API level rate limiting]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting#configuring-the-rate-limiter-at-the-api-level" >}})
- [Authentication]({{< ref "/api-management/authentication-authorization" >}})

## Versions

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-versions.png" alt="The Tyk Classic Endpoint Designer - Versions tab" >}}

The **Versions** tab allows you to create and manage [API versioning]({{< ref "getting-started/key-concepts/versioning" >}}) for the API.

At the top of the Endpoint Designer, you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load its endpoint configuration into the editor.

## Endpoint Designer

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-endpoint.png" alt="The Tyk Classic Endpoint Designer - Endpoint Designer tab" >}}

The **Endpoint Designer** is where you can define endpoints for your API so that you can enable and configure Tyk middleware to [perform checks and transformations]({{< ref "advanced-configuration/transform-traffic" >}}) on the API traffic.

In some cases, you will want to set global settings that affect all paths that are managed by Tyk. The **Global Version Settings** section will enable you to configure API-level [request]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#api-level-transform-1" >}}) and [response]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#api-level-transform-1" >}}) header transformation.

## Advanced Options

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-advanced.png" alt="The Tyk Classic Endpoint Designer - Advanced Options tab" >}}

The **Advanced Options** tab is where you can configure Tyk's other powerful features including:
- Upstream certificate management
- [API-level caching]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache#configuring-the-cache-via-the-dashboard" >}}) including a button to invalidate (flush) the cache for the API
- [CORS]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}})
- Add custom attributes to the API definition as *config data* that can be accessed by middleware
- Enable [context variables]({{< ref "context-variables" >}}) so that they are extracted from requests and made available to middleware
- Manage *segment tags* if you are working with [sharded gateways]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud" >}})
- Manage client IP address [allow]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting" >}}) and [block]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting" >}}) lists
- Attach [webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will be triggered for different events

## Uptime Tests

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-uptime.png" alt="The Tyk Classic Endpoint Designer - Uptime Tests tab" >}}

In the **Uptime Tests** tab you can configure Tyk's [Uptime Test]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests" >}}) functionality

## Debugging

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-debugging.png" alt="The Tyk Classic Endpoint Designer - Debugging tab" >}}

The **Debugging** tab allows you to test your endpoints before you publish or update them. You can also use it for testing any middleware plugins you have implemented. Any debugging you create will persist while still in the current API, enabling you to make changes in the rest of the API settings without losing the debugging scenario.

The Debugging tab consists of the following sections:

- Request
- Response
- Logs

#### Request

{{< img src="/img/2.10/debugging_request.png" alt="Debugging Request" >}}

In this section, you can enter the following information:

- Method - select the method for your test from the drop-down list
- Path - your endpoint to test
- Headers/Body - enter any header information, such as Authorization, etc. Enter any body information. For example, entering user information if creating/updating a user.

Once you have entered all the requested information, click **Run**. Debugging Response and Log information will be displayed:

#### Response

{{< img src="/img/2.10/debugging_results.png" alt="Debugging Response" >}}

The Response section shows the JSON response to your request.

#### Logs

{{< img src="/img/2.10/debugging_logs.png" alt="Debugging Logs" >}}

The debugging level is set to **debug** for the request. This outputs all logging information in the Endpoint Designer. In the Tyk Gateway logs you will see a single request. Any Error messages will be displayed at the bottom of the Logs output.
