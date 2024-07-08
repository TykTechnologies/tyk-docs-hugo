---
title: Troubleshooting and FAQs
description: Explains troubleshooting & FAQs
tags: [ "Troubleshooting", "FAQ", "FAQs" ]
---


This section provides guidance on troubleshooting common issues with Tyk Streams, best practices for configuring and managing async APIs, and answers to frequently asked questions.

## Common Issues and Resolutions

#### Issue 1: Failure to connect to the event broker

If Tyk Gateway is unable to establish a connection to the configured event broker (e.g., Kafka, MQTT), check the following:
- Verify that the broker connection details in the Tyk Dashboard are correct, including the hostname, port, and any required credentials.
- Ensure that the event broker is running and accessible from the Tyk Gateway instance.
- Check the network connectivity between the Tyk Gateway and the event broker. Use tools like telnet or nc to validate the connection.

#### Issue 2: Messages are not being published or consumed

If messages are not being successfully published to or consumed from the event broker, consider the following:
- Verify that the topic or queue names are correctly configured in the Tyk Dashboard and match the expected values in the event broker.
- Check the Tyk Gateway logs for any error messages related to message publishing or consumption. Adjust the log level to "debug" for more detailed information.
- Validate that the message format and schema match the expectations of the consumer or producer. Inspect the message payloads and ensure compatibility.

#### Issue 3: Async API performance is poor or connections are being throttled

If you observe performance issues or connection throttling with async APIs, consider the following:
- Review the configured rate limits and quotas for the async API. Adjust the limits if necessary to accommodate the expected traffic.
- Monitor the resource utilization of the Tyk Gateway instances and the event broker. Ensure that there is sufficient capacity to handle the load.
- Consider scaling the Tyk Gateway horizontally by adding more instances to distribute the traffic load.

## Best Practices

- Use meaningful and descriptive names for your async APIs, topics, and subscriptions to improve readability and maintainability.
- Implement proper security measures, such as authentication and authorization, to protect your async APIs and restrict access to authorized clients only.
- Set appropriate rate limits and quotas to prevent abuse and ensure fair usage of the async API resources.
- Monitor the performance and health of your async APIs using Tyk's built-in analytics and monitoring capabilities. Set up alerts and notifications for critical events.
- Version your async APIs to manage compatibility and enable seamless updates without disrupting existing clients.
- Provide comprehensive documentation for your async APIs, including details on message formats, schemas and example payloads, to assist developers in integrating with your APIs effectively.
