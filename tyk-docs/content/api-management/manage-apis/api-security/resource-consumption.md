---
title: "Resource consumption"
date: 2023-09-04
tags: ["API Security", "Resource consumption"]
description: "Protecting resources against excessive consumption"
---

Excessive resource consumption poses a risk to APIs. As the number of concurrent requests handled by a server increases, so too does its consumption of CPU, RAM and storage resources. Should any of these become depleted, then the quality of service offered by applications running on the server will rapidly decline, and may even lead to their complete failure.

This issue can be caused by both legitimate consumers and malicious attackers, but they are different situations that require different solutions. For legitimate consumers, solutions should be focused on controlling API utilisation through the gateway, to keep usage within agreed or desired limits. But malicious attackers require a different approach, as denial of service attacks must be blocked as far as possible from the core API infrastructure.

Restrict Request Flows: Use rate limits and quotas to prevent excessive API usage. Rate limits are best used for short term control, in the range of seconds. Whereas quotas are more suited to longer terms, in the range of days, weeks or beyond. Throttling can also be used as a type of enhanced rate limiter that queues and retries requests on the clients behalf, rather than immediately rejecting them.

Block Excessively Large Requests: Place reasonable limitations on payload sizes to prevent oversized requests from reaching upstream servers, thereby avoiding the unnecessary consumption of resources.

Avoid Unnecessary Resource Usage: Appropriate use of caching can reduce server resource consumption by simply returning cached responses instead of generating new ones. The extent to which caching can be used depends on the purpose of the endpoint, as it’s generally unsuitable for requests that modify data or responses that frequently change. Caching can be applied to particular requests or enabled for an entire API, and can also be controlled by the upstream API or invalidated programmatically.

Limit Complex Long-Running Tasks: Use GraphQL complexity limiting to prevent convoluted queries from being processed. Alternatively, timeouts can be used to terminate long-running requests that exceed a given time limit.

Protect Failing Services: Defend struggling endpoints by using a circuit breaker. This feature protects endpoints by detecting error responses, then blocking requests for a short duration to allow them to recover. The same principle can be applied in a wider sense by using uptime tests, though this works on a host level instead, by removing failed hosts from the gateway load balancer.

Enforce Network-Level Security: Problematic clients can be prevented from accessing the API by blocking their address. Conversely, for APIs with a known set of clients, allow lists can be used to create a list of allow addresses, thereby implicitly blocking every other address from the API.

Mitigate DoS Attacks: Increase the chance of maintaining API availability during a denial of service attack by using specialist mitigation services. These have the infrastructure capacity needed to handle large scale distributed attacks, with the purpose of preventing attacks from reaching the API infrastructure, thereby enabling the API to continue operating normally.