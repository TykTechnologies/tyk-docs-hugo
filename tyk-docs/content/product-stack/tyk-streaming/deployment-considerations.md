---
title: Deployment Considerations
description: Explains deployment considerations for APIs
tags: [ "Deployment", "Async APIs" ]
---

When deploying Tyk Streams, understanding its scaling and performance capabilities, as well as its high availability features, is crucial for ensuring a robust and efficient API infrastructure.

## Scaling and Performance

Tyk Streams is fully embedded within the Tyk Gateway, enabling seamless scaling and high performance. As your API traffic grows, Tyk Streams scales effortlessly alongside your Tyk Gateway instances. No additional configuration or separate infrastructure is required.

Key benefits of this embedded architecture include:

- **Unified scaling**: Tyk Streams inherits the scaling capabilities of Tyk Gateway, ensuring optimal performance as your API workload increases.
- **Efficient resource utilization**: By leveraging the same infrastructure as Tyk Gateway, Tyk Streams minimizes resource overhead and simplifies deployment.
- **Seamless integration**: Tyk Streams works seamlessly with existing Tyk Gateway deployments, requiring no changes to your current architecture.

## High Availability

Tyk Streams ensures reliable message delivery across a cluster of Tyk Gateway instances. Whether clients connect through a load balancer or directly to individual gateway nodes, Tyk Streams guarantees that messages are delivered to each connected consumer.

Under the hood, Tyk Streams utilizes [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/) for efficient and reliable message distribution within the Tyk Gateway cluster. This enables:

- **Fault tolerance**: If a gateway node fails, clients connected to other nodes continue to receive messages uninterrupted.
- **Load balancing**: Messages are evenly distributed across the gateway cluster, ensuring optimal performance and resource utilization.
- **Message persistence**: Redis Streams provides durability, allowing messages to be persisted and replayed if necessary.

By leveraging the high availability features of Tyk Gateway and Redis Streams, Tyk Streams delivers a robust and resilient solution for managing and distributing async API messages in production environments.

With Tyk Streams, you can confidently deploy and scale your async APIs, knowing that messages will be reliably delivered to consumers across your Tyk Gateway cluster.

