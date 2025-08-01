---
title: "Getting Started with Tyk Self-Managed"
date: 2025-02-10
keywords: ["quick start", "tyk self-managed", "tyk gateway", "tyk dashboard", "tyk pump", "tyk analytics"]
description: "Quickly set up Tyk Self-Managed with our comprehensive guide, including installation options and demo environments."
aliases:
---

## Introduction to Tyk Self-Managed Trial

Tyk Self-Managed is a comprehensive API Management platform that you can deploy and control within your own infrastructure. This guide will help you set up and explore your Tyk Self-Managed trial environment.

### What's included in your trial

Your Tyk Self-Managed trial includes:

- **Tyk Gateway**: The core API Gateway that handles all your API traffic
- **Tyk Dashboard**: A web interface for managing your APIs, policies, and analytics
- **Enterprise Developer Portal**: A customizable portal for API consumers
- **Analytics**: Detailed insights into API usage and performance
- **Sample APIs**: Pre-configured APIs to help you explore Tyk's capabilities

### System Requirements

- **Docker**: Docker Engine 20.10.0 or newer
- **Docker Compose**: Version 2.0.0 or newer
- **Memory**: Minimum 4GB RAM
- **Storage**: At least 10GB of free disk space
- **CPU**: 2 cores minimum (4+ recommended for production)
- **License Key**: A valid Tyk Self-Managed license key (provided in your trial email)

### Trial Duration and Limitations

Your trial license is valid for 14 days from activation. During this period, you have access to all Enterprise features. After the trial period, you'll need to purchase a license to continue using Tyk Self-Managed.

## Quick Setup

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/) on your system
2. Ensure you have your Tyk Self-Managed license key from your trial email

### One-command Installation using Docker Compose

1. Clone the repository:
   ```
   git clone https://github.com/munkiat/tyk-poc && cd tyk-poc
   ```

2. Create a `.env` file with your license key:
   ```
   DASH_LICENSE=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   You can use the `.env.example` file as a template.

3. Start the Tyk stack:
   ```
   docker-compose up -d
   ```

   This command will download and start all the necessary containers:
   - Tyk Gateway
   - Tyk Dashboard
   - Enterprise Developer Portal
   - Redis
   - PostgreSQL
   - Tyk Pump (for analytics)
   - Sample API service (httpbin)

### Default Credentials and Access Points

Once the installation is complete, you can access the following components:

```
---------------------------
Your Tyk Dashboard URL is http://localhost:3000

user: developer@tyk.io
pw: specialpassword
---------------------------
Your Tyk Gateway URL is http://localhost:8080
---------------------------
Your Developer Portal URL is http://localhost:3001

admin user: portaladmin@tyk.io
admin pw: specialpassword
---------------------------
```

### Verifying Your Installation

1. Open your browser and navigate to `http://localhost:3000`
2. Log in with the default credentials (developer@tyk.io / specialpassword)
3. You should see the Tyk Dashboard with pre-configured APIs and analytics

## 3. Exploring Your Pre-Configured Environment

### Dashboard Tour

#### Navigating the Tyk Dashboard

The Tyk Dashboard is organized into several key sections:

- **APIs**: Manage your API definitions, versions, and configurations
- **Keys**: Create and manage authentication keys for API access
- **Policies**: Define access rules and rate limits for groups of APIs
- **Analytics**: View detailed usage statistics and performance metrics
- **System Management**: Configure system-wide settings and users

#### Understanding the Pre-loaded APIs

The trial environment comes with a pre-configured sample API:

- **httpbingo API**: A test API with various endpoints for exploring API management features
  - Accessible at: `http://localhost:8080/httpbingo`
  - Includes endpoints for testing authentication, transformations, and other features

#### Key Metrics and Analytics Overview

The Analytics section provides insights into:

- API usage and traffic patterns
- Error rates and response times
- Geographic distribution of API requests
- User and key activity

### Enterprise Developer Portal Preview

#### Accessing the Pre-configured Portal

1. Navigate to `http://localhost:3001` in your browser
2. Log in with the admin credentials (portaladmin@tyk.io / specialpassword)

#### Exploring Available API Products and Catalogs

The Developer Portal includes:

- A pre-configured API product (httpbingo API)
- Two sample plans:
  - Sandbox Plan: Limited rate (3 requests per 10 seconds)
  - Production Plan: Higher capacity (100 requests per 60 seconds)
- A public catalog making these APIs discoverable

## 4. Quick Wins: Core API Management Capabilities

### API Security in Action

#### Exploring Authentication Methods

The httpbingo API is configured with API key authentication:

1. In the Dashboard, go to "Keys" and create a new key
2. Assign it to the httpbingo API
3. Test API access using the key:
   ```
   curl -H "Authorization: <your-api-key>" http://localhost:8080/httpbingo/get
   ```

#### Testing Rate Limiting and Quota Management

To test rate limiting:

1. Create a key with the "Sandbox Plan" policy
2. Make multiple rapid requests to observe rate limiting in action
3. After 3 requests within 10 seconds, you should receive rate limit errors

### Traffic Control & Transformation

#### Testing Request/Response Transformations

The httpbingo API includes a transformation example on the `/xml` endpoint that converts XML to JSON.

#### Exploring Caching Configurations

TODO: Caching features are not yet implemented in the tyk-poc repository.

### API Monitoring & Analytics

#### Generating Test Traffic

Use tools like Apache Bench or Postman to send multiple requests to generate analytics data.

#### Exploring Real-time Analytics

The Dashboard's Analytics section provides real-time insights into API usage patterns.

#### Setting up Alerts and Notifications

TODO: Alerting features are not yet implemented in the tyk-poc repository.


Tyk Self-Managed consists of multiple components, [as described]({{< ref "tyk-self-managed" >}}). While the OSS Gateway and Pump are available without a license, the remaining components require one. To experience the full capabilities of our Full Lifecycle API Management solution within your own infrastructure, please obtain a license by contacting our support team.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

If you prefer guided support, we recommend exploring our [Tyk Technical PoC Guide](https://tyk.io/customer-engineering/poc/technical-guide/).

Once you have obtained your license, you can proceed with the installation options provided below.

## Tyk Demo 

Head over to our **Tyk Demo** guides in [Kubernetes]({{< ref "deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview#kubernetes-demo" >}}) or [Docker]({{< ref "deployment-and-operations/tyk-self-managed/tyk-demos-and-pocs/overview#docker-demo" >}}). These guides, with zero to none effort, will spin up the full Tyk infrastructure (Tyk stack) with examples of Tyk's capabilities and integrations out-of-the-box.

