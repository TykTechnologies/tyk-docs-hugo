---
title: "Developing APIs with Tyk Self-Managed"
date: 2025-02-10
keywords: ["quick start", "tyk self-managed", "tyk gateway", "tyk dashboard", "tyk pump", "tyk analytics"]
description: "Quickly set up Tyk Self-Managed with our comprehensive guide, including installation options and demo environments."
aliases:
---

## Introduction

Tyk Self-Managed is a comprehensive API Management platform that you can deploy and control within your own infrastructure. This page will help you set up and explore your Tyk Self-Managed environment.

### What's included in your trial

Your Tyk Self-Managed trial includes:

- **Tyk Gateway**: The core API Gateway that handles all your API traffic
- **Tyk Dashboard**: A web interface for managing your APIs, policies, and analytics
- **Enterprise Developer Portal**: A customizable portal for API consumers
- **Analytics**: Detailed insights into API usage and performance
- **Sample APIs**: Pre-configured APIs to help you explore Tyk's capabilities

### System Requirements

- **Docker**: Docker Engine 20.10.0 or newer
- **CPU & Memory**: Minimum 2 GB RAM and 2 CPU cores
- **License Key**: A valid Tyk Self-Managed license key. 
    
    You can instantly obtain a self managed trial license by registering on this [form](https://share.hsforms.com/13h7zZ8k6Tt2FCbIbYs39mA3ifmg). After registraion, you will receive an email with your license key.

    If you prefer guided support, we recommend exploring our [Tyk Technical PoC Guide](https://tyk.io/customer-engineering/poc/technical-guide/).

### Trial Duration and Limitations

Your trial license is valid for 14 days from activation. During this period, you have access to all Enterprise features. After the trial period, you'll need to purchase a license to continue using Tyk Self-Managed.

To continue using Tyk Self-Managed after your trial, please contact our [support team](https://tyk.io/contact/) to obtain a license.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

<br>
<br>

## Quick Setup

This section provides a step-by-step guide to quickly set up Tyk Self-Managed using Docker. 

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/) on your system
2. Ensure you have your Tyk Self-Managed license key from your trial email

### Installation

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
   docker compose up -d
   ```

   This command will download and start all the necessary containers:
   - Tyk Gateway
   - Tyk Dashboard
   - Enterprise Developer Portal
   - Redis (Gateway dependency for caching)
   - PostgreSQL (Dashboard and Portal dependency for data storage)
   - Tyk Pump (for analytics)
   - Sample API service (httpbin)

    **Wait for the containers to initialize. This may take a few minutes depending on your system.**

5. Once all containers are running, you can verify their status with:
   ```
   docker compose ps
   ```

   You should see all services listed as "Up".

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

1. **Verify Dashboard Access**:
    1. Open your browser and navigate to `http://localhost:3000`
    2. Log in with the default credentials (developer@tyk.io / specialpassword)
    3. You should see the Tyk Dashboard with pre-configured APIs and analytics
2. **Verify Gateway Access**:
    1. Open a terminal and run:
       ```
       curl http://localhost:8080/hello
       ```
    2. You should receive a JSON response from API, confirming that the Tyk Gateway is functioning correctly. 
3. **Verify Developer Portal Access**:
    1. Open your browser and navigate to `http://localhost:3001`
    2. Log in with the default credentials (portal@tyk.io / specialpassword)
    3. You should see the `Overview` section of the Developer Portal.

## Exploring Your Pre-Configured Environment (TODO)

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

## Core API Management Capabilities

In this section, we will explore the core API management capabilities of Tyk Self-Managed using the pre-configured httpbingo API.

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

## Next Steps

[Developing APIs with Tyk Self-Managed]({{< ref "deployment-and-operations/tyk-self-managed/value-addons" >}}) - Learn how to create new APIs, publish them to the Developer Portal, and integrate advanced middleware.