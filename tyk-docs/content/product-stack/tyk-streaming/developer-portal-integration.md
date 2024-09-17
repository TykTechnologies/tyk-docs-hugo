---
title: Developer Portal Integration
description: Explains how to integrate developer portal with Tyk streams
tags: [ "Developer Portal Integration", "Developer Portal", "EDP" ]
publishdate: 2024-06-07
---


Tyk Streams seamlessly integrates with the Tyk Developer Portal, enabling developers to easily discover, subscribe to, and consume async APIs and event streams. This section covers how to publish async APIs to the developer portal, provide documentation and enable developers to subscribe to events and streams.

---

## Publishing Async APIs to the Developer Portal

Publishing async APIs to the Tyk Developer Portal follows a similar process to publishing traditional synchronous APIs. API publishers can create API products that include async APIs and make them available to developers through the portal.

To publish an async API:
- In the Tyk Dashboard, create a new API and define the async API endpoints and configuration.
- Associate the async API with an API product.
- Publish the API product to the Developer Portal.
- Copy code

<!-- [Placeholder for screenshot or GIF demonstrating the process of publishing an async API to the Developer Portal] -->

---

## Async API Documentation

Providing clear and comprehensive documentation is crucial for developers to understand and effectively use async APIs. While Tyk Streams does not currently support the AsyncAPI specification format, it allows API publishers to include detailed documentation for each async API.

When publishing an async API to the Developer Portal, consider including the following information in the documentation:
- Overview and purpose of the async API
- Supported protocols and endpoints (e.g., WebSocket, Webhook)
- Event types and payloads
- Subscription and connection details
- Example code snippets for consuming the async API
- Error handling and troubleshooting guidelines

<!-- [Placeholder for screenshot showcasing async API documentation in the Developer Portal] -->

---

## Enabling Developers to Subscribe to Events and Streams

Tyk Streams provides a seamless way for developers to subscribe to events and streams directly from the Developer Portal. API publishers can enable webhook subscriptions for specific API products, allowing developers to receive real-time updates and notifications.
To enable webhook subscriptions for an API product:
1. In the Tyk Developer Portal, navigate to the API product settings.
2. Enable the "Webhooks" option and specify the available events for subscription.
3. Save the API product settings.

{{< img src="/img/streams/enable-portal-webhooks.png" alt="Enable Portal Webhooks" width="1000" >}}

<!-- [Placeholder for screenshot showing the API product settings with webhook configuration] -->

Once webhook subscriptions are enabled, developers can subscribe to events and streams by following these steps:
- In the Developer Portal, navigate to the My Apps page.
- Select the desired app.
- In the "Webhooks" section, click on "Subscribe".
- Provide the necessary details:
    - *Webhook URL*: The URL where the event notifications will be sent.
    - *HMAC Secret*: Provide a secret key used to sign the webhook messages for authentication.
    - *Events*: Select the specific events to subscribe to.
- Save the subscription settings.
- Copy code
<!-- [Placeholder for screenshot illustrating the developer's view of subscribing to webhooks] -->

{{< img src="/img/streams/subscribe-webhooks.png" alt="subscribe to webhooks from portal" width="1000" >}}

To configure the async API stream for webhook subscriptions, use the following output configuration in your API definition:

```yaml
outputs:
  - portal_webhook:
      event_type: bar
      portal_url: http://localhost:3001
      secret: <portal-api-secret>
```

Replace *<portal-api-secret>* with the actual secret key used for signing the webhook messages.

By enabling webhook subscriptions, developers can easily integrate real-time updates and notifications from async APIs into their applications, enhancing the overall developer experience and facilitating seamless communication between systems.
<!-- [Placeholder for a diagram illustrating the flow of webhook subscriptions and event notifications] -->

With Tyk Streams and the Developer Portal integration, API publishers can effectively manage and expose async APIs, while developers can discover, subscribe to, and consume event streams effortlessly, enabling powerful real-time functionality in their applications.
