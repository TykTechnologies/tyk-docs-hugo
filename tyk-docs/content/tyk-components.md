---
date: 2017-03-08T18:15:30+13:00
title: Tyk Components
tags: ["Tyk API Management", "Getting Started", "Tutorials"]
description: "Explaining Tyk Components"
weight: 5
menu: "main"
---

# Understanding Tyk’s API Management Components

Tyk offers a full ecosystem of API management tools, supporting every stage of the API lifecycle—from development and deployment to monitoring and scaling. With Tyk’s components, teams can seamlessly integrate, secure, and scale APIs across different environments, facilitating robust and reliable API operations.

---

## Tyk’s API Management Components Overview

Below is a detailed introduction to each of Tyk’s components and their individual roles within an API management strategy. For more information, follow the links provided to explore specific documentation on each component.


{{< grid >}}

{{< badge title="Tyk Gateway" href="tyk-components#tyk-gateway" >}} The open-source core of Tyk that handles request routing, rate-limiting, and caching. {{< /badge >}}

{{< badge title="Tyk Dashboard" href="tyk-components#tyk-dashboard" >}} A powerful interface for managing and monitoring APIs, users, and permissions. {{< /badge >}}

{{< badge title="Tyk Enterprise Developer Portal" href="tyk-components#tyk-enterprise-developer-portal" >}} A customizable portal for enabling API discovery and user self-service. {{< /badge >}}

{{< badge title="Tyk Multi Data Centre Bridge" href="tyk-components#tyk-multi-data-centre-bridge-mdcb" >}} Enables centralized API management across distributed data centers for global reach and compliance. {{< /badge >}}

{{< badge title="Tyk Pump" href="tyk-components#tyk-pump" >}} Aggregates and exports API analytics from Gateway to enable insights and advanced monitoring. {{< /badge >}}

{{< badge title="Tyk Operator" href="tyk-components#tyk-operator" >}} Integrates with Kubernetes for seamless API management within containerized environments. {{< /badge >}}

{{< badge title="Tyk Streams" href="tyk-components#tyk-streams" >}} Enables real-time event streaming for APIs, ideal for push notifications and live data. {{< /badge >}}

{{< badge title="Tyk Sync" href="tyk-components#tyk-sync" >}} Synchronizes API configurations across environments for consistency and streamlined deployments. {{< /badge >}}

{{< badge title="Tyk Identity Broker" href="tyk-components#tyk-identity-broker" >}} Facilitates single sign-on (SSO) and integrates external identity providers with APIs. {{< /badge >}}

{{< badge title="Tyk Helm Charts" href="tyk-components#tyk-helm-charts" >}} Provides templated configurations to simplify deploying Tyk in Kubernetes. {{< /badge >}}

{{< badge title="Universal Data Graph" href="tyk-components#universal-data-graph-udg" >}} Combines multiple data sources into a unified API, supporting GraphQL and REST. {{< /badge >}}

{{< /grid >}}

---

### Tyk Gateway

The **[Tyk Gateway]({{< ref "tyk-oss-gateway" >}})** is the core of Tyk’s API management platform. This open-source, high-performance API gateway handles crucial API tasks:

- **Traffic Management**: Routes requests to backend services, balancing loads and ensuring high availability.
- **Security and Authentication**: Supports OAuth2, JWT, OpenID Connect, and other protocols to secure APIs.
- **Rate Limiting and Quotas**: Controls traffic volume to prevent abuse and ensure fair usage.
- **Analytics**: Tracks API usage patterns and provides insights into performance and engagement.

The Gateway is the primary component managing and securing all API interactions, making it an essential part of any API management strategy.

---

### Tyk Dashboard

The **[Tyk Dashboard]({{< ref "tyk-dashboard" >}})** is a GUI interface for managing, monitoring, and configuring APIs. It integrates with the Tyk Gateway and offers centralized control for all API operations:

- **Design APIs**: Set up endpoints, security policies, and access controls.
- **Monitor API Usage**: View real-time analytics to track API performance and identify trends.
- **User and Team Management**: Configure multi-tenancy and manage team-based access control.

The Tyk Dashboard simplifies API management, enabling teams to effectively administer API policies and monitor activity.

---

### Tyk Enterprise Developer Portal

The **[Tyk Developer Portal]({{< ref "tyk-developer-portal" >}})** provides a self-service interface for developers to access and interact with APIs. Key functionalities include:

- **API Documentation**: Supplies developers with detailed API documentation, making integration easier.
- **Self-Service Access**: Developers can register, request API keys, and manage subscriptions independently.
- **Community Engagement**: Features like FAQs and forums foster a collaborative developer community.

The Developer Portal streamlines API adoption by offering developers a comprehensive platform for API discovery and self-service.

---

### Tyk Multi Data Centre Bridge (MDCB)

The **[Tyk Multi Data Centre Bridge (MDCB)]({{< ref "tyk-multi-data-centre" >}})** enables centralized control over API configurations across distributed regions or data centers. It’s ideal for global API infrastructure, offering:

- **Centralized Management**: Controls API configurations across different regions from a single interface.
- **Data Isolation**: Supports regulatory compliance by keeping data within specified regions.
- **Enhanced Resilience**: Ensures high availability for distributed API deployments.

MDCB is designed for organizations with extensive geographic reach, supporting both global distribution and local compliance.

---

### Tyk Pump

**[Tyk Pump]({{< ref "tyk-pump" >}})** is a lightweight tool that aggregates API analytics from the Tyk Gateway and exports them to various storage systems for analysis:

- **Data Collection**: Continuously gathers real-time API analytics.
- **Data Export**: Integrates with multiple backends like Splunk, Prometheus, ElasticSearch, and others.
- **Actionable Insights**: Enables advanced monitoring and analysis for data-driven decision-making.

With Tyk Pump, you can leverage powerful insights into API usage, helping teams optimize API performance and improve user experience.

---

### Tyk Operator

The **[Tyk Operator]({{< ref "api-management/automations/operator#what-is-tyk-operator" >}})** is a Kubernetes-native API management solution, allowing teams to deploy and manage APIs as Kubernetes resources:

- **Kubernetes Integration**: Simplifies API management within Kubernetes environments.
- **Declarative Configuration**: Supports automated, scalable, and resilient API deployments.
- **CI/CD Integration**: Ideal for development teams with continuous integration and deployment workflows.

For teams operating within Kubernetes, Tyk Operator integrates seamlessly, providing a consistent way to manage API resources.

---

### Tyk Streams

**[Tyk Streams]({{< ref "product-stack/tyk-streaming/overview" >}})** is Tyk’s real-time data streaming tool for APIs, enabling applications to receive data as events happen:

- **Real-Time Data**: Pushes live data to clients in real time.
- **Event-Driven Architecture**: Triggers immediate responses to data changes.
- **Scalability**: Manages high-frequency data flows, scaling to meet demand.

Tyk Streams is ideal for use cases like financial services, IoT, and live applications requiring rapid data updates.

---

### Tyk Sync

**[Tyk Sync]({{< ref "api-management/automations/sync" >}})** facilitates configuration synchronization, helping teams manage API configurations across different environments:

- **Configuration Consistency**: Synchronizes API settings across development, staging, and production.
- **DevOps Compatibility**: Integrates with CI/CD pipelines for seamless deployment.
- **Backup and Restore**: Maintains backups of API configurations to prevent data loss.

Tyk Sync ensures that API configurations are consistent and reliable across environments, supporting streamlined operations and effective change management.

---

### Tyk Identity Broker

The **[Tyk Identity Broker]({{< ref "api-management/external-service-integration#what-is-tyk-identity-broker-tib" >}})** simplifies authentication by connecting APIs with external identity providers (IDPs), supporting single sign-on (SSO) capabilities:

- **Authentication Integration**: Works with IDPs like Google, Microsoft, and LDAP.
- **Secure Access Control**: Manages API access for verified users.
- **Token-Based Access**: Issues tokens for authenticated users, enabling controlled API access.

The Identity Broker centralizes identity and access management, making it easier to secure APIs and manage user authentication across multiple systems.

---

### Tyk Helm Charts

**[Tyk Helm Charts]({{< ref "product-stack/tyk-charts/overview" >}})** provide templated configurations for deploying Tyk components in Kubernetes, enabling efficient setup and management:

- **Efficient Deployment**: Simplifies installation and configuration within Kubernetes clusters.
- **Version Control**: Manages versioning and consistency across deployments.
- **Standardization**: Ensures uniform setups across environments, improving reliability.

Tyk Helm Charts are particularly useful for teams deploying Tyk in Kubernetes, streamlining installation and ensuring consistent configurations.

---

### Universal Data Graph (UDG)

The **[Universal Data Graph (UDG)]({{< ref "api-management/data-graph#overview" >}})** provides a single API endpoint for accessing data from multiple sources using GraphQL, offering:

- **Data Aggregation**: Combines data from disparate sources into a unified API.
- **Customizable Data Access**: Clients can query only the data they need.
- **Secure Data Management**: Implements access controls to manage data permissions.

The UDG simplifies complex data interactions, enabling developers to work with a unified GraphQL endpoint for various backend services.

---

## How Tyk’s Components Work Together

Tyk’s components create a unified API management ecosystem, covering all aspects of API lifecycle management:

- **Traffic and Security**: The Tyk Gateway acts as the first line of defense, handling traffic and enforcing security protocols.
- **Configuration and Deployment**: Tyk Dashboard, Tyk Operator, and Tyk Sync provide tools for managing, deploying, and scaling APIs.
- **Developer Experience**: The Tyk Developer Portal and Identity Broker enhances the developer experience, promoting API discovery and user engagement.
- **Global Reach and Resilience**: MDCB ensures consistent API configurations and high availability across regions.
- **Data and Insights**: Tyk Gateway's native support for OpenTelemetry, combined with Tyk Pump, enables real-time monitoring and analytics.
- **Unified Access**: UDG and Tyk Streams unify API Management by enabling seamless, multi-protocol data integration and delivery.
- **Kubernetes Deployment**: Tyk Helm Charts simplifies deployment of Tyk on Kubernetes.

# Conclusion

Now that you’ve been introduced to the Tyk suite, you have a strong foundation in understanding how each component fits into a complete API management ecosystem. Whether you’re ready to start deploying APIs, securing them, or scaling across multiple environments, Tyk provides the tools and flexibility to bring your API projects to life.

## Where to Go Next

1. **[Getting Started with Tyk Gateway]({{< ref "tyk-oss-gateway/" >}})**  
   Start by setting up the Tyk Gateway, where you’ll configure your first API and explore the foundational capabilities of traffic management, security, and monitoring.

2. **[Set Up and Configure the Tyk Dashboard]({{< ref "tyk-dashboard" >}})**  
   Dive into the Tyk Dashboard to manage your API lifecycle from a user-friendly interface, allowing you to monitor, configure, and scale your APIs with ease.

3. **[Explore API Security]({{< ref "api-management/client-authentication" >}})**  
   Secure your APIs with Tyk’s robust authentication options like OAuth2, JWT, and HMAC, and learn how to apply rate limiting and quota policies to protect your resources.

4. **[Implement Multi-Region Deployments with MDCB]({{< ref "tyk-multi-data-centre" >}})**  
   If your infrastructure requires high availability and global reach, explore Tyk’s Multi Data Centre Bridge to deploy and manage APIs across different regions.

5. **[Use Tyk Sync for Consistent Configuration Management]({{< ref "api-management/automations/sync" >}})**  
   For development teams working across environments, Tyk Sync offers a way to manage API configurations consistently, supporting CI/CD workflows and minimizing deployment errors.

6. **[Explore Tyk Developer Portal for Enhanced Developer Experience]({{< ref "tyk-developer-portal" >}})**  
   Provide external and internal developers with easy access to your APIs by setting up the Developer Portal, where they can find documentation, request access, and get started quickly.

